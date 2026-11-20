#!/usr/bin/env python3
# Pone como voz de un video en dibujos una narración hecha afuera, por ejemplo en la web de ElevenLabs.
#   python3 tools/voz-mp3.py --texto h2-1                  el texto para pegar en la web (en partes, si es largo)
#   venv/bin/python tools/voz-mp3.py h2-1 a.mp3 [b.mp3 ...]  la grabación (las partes en orden)
# El reconocedor de voz (Parakeet) escucha la grabación y ubica cada palabra del guion: con eso salen los tiempos
# de las escenas, los subtítulos palabra a palabra y la boca, igual que con tools/voz.py. Se conservan las pausas
# de la grabación y solo se agregan las que el video necesita (el tiempo para pensar la respuesta de una pregunta).
# Escribe audio/<id>.webm y audio/<id>.js, y avisa qué frases no se oyeron (un trozo saltado o cambiado).
import argparse, difflib, json, math, os, re, subprocess, sys
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import habla
import voz

MAXC = 2400  # caracteres por generación en la web (el plan gratis tiene un tope por vez)
HOP = .01    # cuadros de 10 ms para medir la energía


def guion(vid):
    p = subprocess.run(['node', os.path.join(voz.ROOT, 'tools', 'guion.js')], capture_output=True, check=True)
    for v in json.loads(p.stdout):
        if v['id'] == vid:
            return v
    sys.exit(f'No hay un video {vid!r} en data/.')


# ---------- El texto para la web ----------

def para_narrador(text):
    """El texto como se escribe (una voz como la de ElevenLabs lee bien los números y los nombres), salvo lo que
    podría leer mal: las siglas que se deletrean, los pesos, los rangos de años y los signos van como se dicen."""
    out = []
    for t, sp in habla.speak_tokens(text):
        pre, core, post = habla.PUNCT.match(t).groups()
        if ((core in habla.ACRO and ' ' in habla.ACRO[core]) or core.startswith('$') or habla.YEARS_RANGE.match(core + post)
                or (core in habla.SYMBOL and habla.SYMBOL[core])):
            out.append(sp)
        else:
            out.append(t)
    return re.sub(r'\s+', ' ', ' '.join(x for x in out if x)).strip()


def parrafos(v):
    """Un párrafo por plano; la respuesta de una pregunta, en un párrafo aparte."""
    pars = []
    for sc in v['sc']:
        cur = []
        for c in sc['cues']:
            if c['kind'] == 'e' and cur:
                pars.append(' '.join(cur))
                cur = []
            cur.append(para_narrador(c['text']))
        if cur:
            pars.append(' '.join(cur))
    return pars


def partes(pars, maxc=MAXC):
    """Partes parejas de hasta maxc caracteres, cortadas entre párrafos."""
    total = len('\n\n'.join(pars))
    n = max(1, math.ceil(total / maxc))
    meta = total / n
    out, cur = [], ''
    for p in pars:
        nuevo = f'{cur}\n\n{p}' if cur else p
        if cur and (len(nuevo) > maxc or (len(out) < n - 1 and len(cur) >= meta)):
            out.append(cur)
            cur = p
        else:
            cur = nuevo
    return out + ([cur] if cur else [])


# ---------- Escuchar la grabación ----------

class Oido:
    """El reconocedor de tools/voz.py, sin la voz sintética."""

    def __init__(self, models, hilos):
        import sherpa_onnx, librosa
        p = os.path.join(models, 'sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8')
        self.asr = sherpa_onnx.OfflineRecognizer.from_transducer(
            encoder=f'{p}/encoder.int8.onnx', decoder=f'{p}/decoder.int8.onnx', joiner=f'{p}/joiner.int8.onnx',
            tokens=f'{p}/tokens.txt', model_type='nemo_transducer', num_threads=hilos)
        self.librosa = librosa

    def palabras(self, y):
        return voz.Voice._listen(self, y)


def leer(paths):
    """Las partes de la grabación, una tras otra (con medio segundo entre ellas), a la frecuencia del perfil."""
    ys = []
    for i, f in enumerate(paths):
        p = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', str(voz.SR), '-f', 'f32le', 'pipe:1'], capture_output=True)
        if p.returncode:
            sys.exit(f'No pude leer {f}: {p.stderr.decode()[:300]}')
        y = np.frombuffer(p.stdout, dtype=np.float32).copy()
        if i:
            ys.append(np.zeros(int(.5 * voz.SR), dtype=np.float32))
        ys.append(y)
    return np.concatenate(ys)


def energia(y):
    fr = int(voz.SR * HOP)
    n = len(y) // fr
    return 20 * np.log10(np.sqrt((y[:n * fr].reshape(n, fr) ** 2).mean(1)) + 1e-9)


def silencios(e, thr, a=0, b=None, min_fr=8):
    """Tramos de silencio [i, j) (en cuadros) entre los cuadros a y b."""
    b = len(e) if b is None else min(b, len(e))
    out, i = [], max(0, a)
    while i < b:
        if e[i] < thr:
            j = i
            while j < b and e[j] < thr:
                j += 1
            if j - i >= min_fr:
                out.append((i, j))
            i = j
        else:
            i += 1
    return out


def trozos(dur, pausas, lo=6., hi=18.):
    """Corta la grabación en trozos de hasta hi segundos, en medio de las pausas más largas (el reconocedor
    trabaja mejor así que con minutos seguidos)."""
    mids = [((i + j) / 2 * HOP, (j - i) * HOP) for i, j in pausas]
    cuts, s = [0.], 0.
    while dur - s > hi:
        cand = [c for c in mids if s + lo < c[0] <= s + hi]
        tarde = [c for c in cand if c[0] > s + (lo + hi) / 2]
        m = max(tarde or cand, key=lambda c: c[1])[0] if cand else s + hi
        cuts.append(m)
        s = m
    return list(zip(cuts, cuts[1:] + [dur]))


def escuchar(oido, y, e, thr):
    hyp, txt = [], []
    for a, b in trozos(len(y) / voz.SR, silencios(e, thr, min_fr=15)):
        text, ws = oido.palabras(y[int(a * voz.SR):int(b * voz.SR)])
        txt.append(text)
        hyp += [(voz.canon(k), a + t) for k, t in ws]
    return hyp, ' '.join(txt)


# ---------- Lo que debía decirse ----------

def referencia(v):
    """Los trozos de subtítulo del guion (como en tools/voz.py) con sus palabras habladas. Cada palabra trae otras
    formas en que el reconocedor puede escribirla: los nombres extranjeros que la voz sintética necesitaba
    escritos como suenan (O'Higgins → Ojíguins) aquí se oyen dichos de verdad."""
    trozos_, words = [], []
    for si, sc in enumerate(v['sc']):
        for ci, c in enumerate(sc['cues']):
            parts, fixed = voz.cue_parts(c['text'])
            for pi, (disp, sp, linked) in enumerate(parts):
                ref = [w for w in (habla.word_key(x) for x in sp.split()) if w]
                alts = [set() for _ in ref]
                if linked:
                    tk = []
                    for t, s in habla.speak_tokens(disp):
                        core = habla.PUNCT.match(t).group(2)
                        otra = {habla.word_key(x) for x in re.split(r'[-’\']', core) + [core]} if core in habla.RESPELL else set()
                        tk += [(habla.word_key(x), otra) for x in s.split() if habla.word_key(x)]
                    if [k for k, _ in tk] == ref:
                        alts = [o for _, o in tk]
                a = len(words)
                words += [(voz.canon(k), {voz.canon(x) for x in o if x}) for k, o in zip(ref, alts)]
                trozos_.append(dict(si=si, ci=ci, pi=pi, c=c, fixed=fixed, disp=disp, linked=linked, a=a, b=len(words)))
    return trozos_, words


def alinear(ref, hyp):
    """Alineación global (como voz.align, pero de todo el video a la vez): para cada palabra del guion, la palabra
    reconocida que le corresponde o None. Costo 0 si es la misma, 0,5 si se parece, 1 si no."""
    n, m = len(ref), len(hyp)
    memo = {}

    def sim(r, h):
        k, otras = r
        if h == k or h in otras:
            return 0.
        q = memo.get((k, h))
        if q is None:
            q = max(difflib.SequenceMatcher(None, x, h).ratio() for x in [k, *otras])
            q = memo[(k, h)] = .5 if q >= .7 else 1.
        return q

    S = np.array([[sim(r, h[0]) for h in hyp] for r in ref]).reshape(n, m)
    D = np.empty((n + 1, m + 1))
    D[0] = np.arange(m + 1)
    idx = np.arange(m + 1, dtype=float)
    for i in range(1, n + 1):
        A = np.empty(m + 1)
        A[0] = D[i - 1, 0] + 1
        A[1:] = np.minimum(D[i - 1, 1:] + 1, D[i - 1, :-1] + S[i - 1])
        D[i] = idx + np.minimum.accumulate(A - idx)
    out = [None] * n
    i, j = n, m
    while i > 0 and j > 0:
        if D[i, j] == D[i - 1, j - 1] + S[i - 1, j - 1]:
            if S[i - 1, j - 1] < 1:
                out[i - 1] = j - 1
            i, j = i - 1, j - 1
        elif D[i, j] == D[i - 1, j] + 1:
            i -= 1
        else:
            j -= 1
    return out, S


# ---------- Armar el audio y los tiempos ----------

def armar(v, paths, oido, label):
    y = leer(paths)
    dur = len(y) / voz.SR
    e = energia(y)
    nivel = np.percentile(e, 95)
    thr = max(nivel - 30, -62)
    hyp, texto = escuchar(oido, y, e, thr)
    tz, ref = referencia(v)
    m, S = alinear(ref, hyp)
    oidas = [hyp[j][1] if j is not None else None for j in m]
    t = voz.fill_times(oidas, dur)

    # Dónde termina la voz de cada trozo y dónde empieza la del siguiente: el silencio más largo entre la última
    # palabra de uno y la primera del otro.
    def corte(t_a, t_b):
        a, b = int(t_a / HOP) + 8, int(t_b / HOP) + 3
        sil = silencios(e, thr, a, b, min_fr=3)
        if sil:
            i, j = max(sil, key=lambda s: s[1] - s[0])
            return i * HOP + .03, max(i * HOP + .03, j * HOP - .05)
        if b - a >= 2:
            k = (a + int(np.argmin(e[a:b]))) * HOP
            return k, k
        k = (t_a + t_b) / 2
        return k, k

    # Para buscar los silencios valen las palabras que sí se oyeron (las interpoladas pueden caer antes de tiempo).
    last = 0.
    for z in tz:
        k = [x for x in oidas[z['a']:z['b']] if x is not None]
        z['tf'], z['tl'] = (k[0], k[-1]) if k else (t[z['a']], t[z['b'] - 1]) if z['b'] > z['a'] else (last, last)
        last = z['tl']
    sil0 = silencios(e, thr, 0, int(tz[0]['tf'] / HOP) + 3, min_fr=3)
    tz[0]['s0'] = max(0., sil0[-1][1] * HOP - .05) if sil0 else 0.
    for p, q in zip(tz, tz[1:]):
        p['s1'], q['s0'] = corte(p['tl'], q['tf'])
    sil1 = silencios(e, thr, int(tz[-1]['tl'] / HOP) + 8, None, min_fr=12)
    tz[-1]['s1'] = min(dur, sil1[0][0] * HOP + .03) if sil1 else dur

    # Pausas que el video necesita: el tiempo para pensar antes de la respuesta de una pregunta y un mínimo entre
    # escenas. Se agregan en medio del silencio que ya hay; las demás pausas quedan como en la grabación.
    GAP = voz.GAP
    extra = []
    for p, q in zip(tz, tz[1:]):
        if q['pi'] or (p['si'], p['ci']) == (q['si'], q['ci']):
            continue
        c = q['c']
        if q['si'] != p['si']:
            need = .35
        elif c.get('gap') is not None:
            need = c['gap']
        else:
            need = GAP['quiz'] if c['kind'] == 'e' else 0
        nat = q['s0'] - p['s1'] + .08  # el silencio que hay (s1 y s0 se toman un poco hacia adentro)
        if need > nat + .02:
            extra.append(((p['s1'] + q['s0']) / 2, need - nat))
    ini = max(0., tz[0]['s0'] - GAP['start'])
    pre = GAP['start'] - (tz[0]['s0'] - ini)
    fin = min(dur, tz[-1]['s1'] + GAP['end'])
    post = tz[-1]['s1'] + GAP['end'] - fin

    def mapa(x):
        return pre + (x - ini) + sum(d for c, d in extra if c <= x)

    sil = lambda s: np.zeros(int(round(s * voz.SR)), dtype=np.float32)
    piezas, a = [sil(pre)], ini
    for c, d in extra:
        piezas += [y[int(a * voz.SR):int(c * voz.SR)], sil(d)]
        a = c
    piezas += [y[int(a * voz.SR):int(fin * voz.SR)], sil(post)]
    out = voz.norma(np.concatenate(piezas))

    # Escenas, indicaciones y subtítulos, en el formato de tools/voz.py.
    scs, cues, prev_end = [], [], 0.
    for si in range(len(v['sc'])):
        zs = [z for z in tz if z['si'] == si]
        if si == 0 or not zs:
            scs.append(round(prev_end, 2) if si else 0.)
        else:
            s0 = mapa(zs[0]['s0'])
            scs.append(round(max(prev_end, s0 - min(.27, .6 * (s0 - prev_end))), 2))
        for z in zs:
            s0, s1 = mapa(z['s0']), mapa(z['s1'])
            if z['pi'] == 0:
                cues.append([z['si'], z['c']['k'], z['c']['kind'], round(s0, 2), None, []])
            lines = cues[-1][5]
            if z['linked']:
                d = max(.05, s1 - s0)
                rel = [min(d, max(0., mapa(x) - s0)) for x in t[z['a']:z['b']]]
                dwt = voz.display_word_times(z['disp'], rel, d)
                lines.append([round(s0, 2), round(s1, 2), z['disp'], [int(round(x * 100)) for x in dwt]])
            else:
                lines.append([round(s0, 2), round(s1, 2), None, None])
            cues[-1][4] = round(s1, 2)
            prev_end = s1
    for c in cues:
        z = next(z for z in tz if (z['si'], z['c']['k']) == (c[0], c[1]))
        if z['fixed']:
            c[5] = [[c[5][0][0], c[5][-1][1], z['c']['text'], None]]

    # Qué tan bien se oyó cada trozo del guion.
    dudosos = []
    for z in tz:
        n = z['b'] - z['a']
        ok = sum(1 for i in range(z['a'], z['b']) if m[i] is not None and S[i, m[i]] == 0)
        if n and ok / n < .6:
            dudosos.append((ok / n, z['disp']))
    usados = {j for j in m if j is not None}
    sobra = [hyp[j][0] for j in range(len(hyp)) if j not in usados]
    data = dict(d=round(len(out) / voz.SR, 2), h=voz.huella(v), sc=scs, c=cues, e=voz.envelope(out), st='relato', v='mp3:' + label)
    exactas = sum(1 for i, j in enumerate(m) if j is not None and S[i, j] == 0)
    return out, data, dict(palabras=len(ref), exactas=exactas, oidas=len(hyp), sobran=len(sobra), dudosos=dudosos,
                           pausas=[(round(mapa(c), 1), round(d, 1)) for c, d in extra], texto=texto)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('id')
    ap.add_argument('mp3', nargs='*')
    ap.add_argument('--texto', action='store_true', help='escribe el texto para pegar en la web y termina')
    ap.add_argument('--max', type=int, default=MAXC, help='caracteres por parte del texto')
    ap.add_argument('--voz', default='web', help='nombre de la voz, para el registro (p. ej. el-fernando)')
    ap.add_argument('--modelos', default=os.environ.get('PAES_MODELOS', '/tmp/claude-0/tts/models'))
    ap.add_argument('--salida', default=os.path.join(voz.ROOT, 'audio'))
    ap.add_argument('--hilos', type=int, default=int(os.environ.get('PAES_HILOS', '4')))
    a = ap.parse_args()
    voz.usar('eleven')
    voz.ESTILO = 'relato'  # los subtítulos se cortan en las comas, como en el estilo relato
    v = guion(a.id)
    if a.texto:
        ps = partes(parrafos(v), a.max)
        for i, p in enumerate(ps):
            if len(ps) > 1:
                print(f'===== Parte {i + 1} de {len(ps)} ({len(p)} caracteres) =====\n')
            print(p + '\n')
        return
    if not a.mp3:
        sys.exit('Falta la grabación (uno o más MP3, en orden).')
    out, data, info = armar(v, a.mp3, Oido(a.modelos, a.hilos), a.voz)
    os.makedirs(a.salida, exist_ok=True)
    base = os.path.join(a.salida, a.id)
    voz.encode(out, base + '.webm')
    with open(base + '.js', 'w', encoding='utf-8') as fh:
        fh.write('RB.vaudio(%s,%s);\n' % (json.dumps(a.id), json.dumps(data, ensure_ascii=False, separators=(',', ':'))))
    voz.log(f"{a.id}: {data['d'] / 60:.1f} min · {info['exactas']}/{info['palabras']} palabras del guion oídas tal cual, "
            f"{info['sobran']} palabras de más · pausas agregadas {info['pausas']}")
    for q, d in info['dudosos']:
        voz.log(f'   no se oyó bien ({q:.0%}): {d}')


if __name__ == '__main__':
    main()
