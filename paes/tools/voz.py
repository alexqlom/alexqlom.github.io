#!/usr/bin/env python3
# Graba la narración de los videos con una voz neuronal que corre en este computador (Supertonic 3, voz
# femenina F3, español con seseo). Cada frase se escucha de vuelta con un reconocedor de voz (Parakeet):
# si no se entiende lo que debía decir, se vuelve a grabar. El resultado por video es:
#   audio/<id>.webm  narración en Opus
#   audio/<id>.js    tiempos de cada escena, frase y palabra (subtítulos) y la apertura de boca de la mascota
# Uso: venv/bin/python tools/voz.py [--solo v-h1,v-m1a] [--modelos DIR] [--cache DIR]
# Los modelos se bajan de los releases de GitHub de k2-fsa/sherpa-onnx (ver tools/README-voz.md).
import argparse, difflib, hashlib, io, json, os, re, subprocess, sys, time
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import habla
from habla_fijo import FIJO

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 24000            # así se guarda y se codifica
HILOS = int(os.environ.get('PAES_HILOS', '4'))
REPAIR = False
VOICE, STEPS, SPEED = 2, 10, 1.0
TEMPO = 1.07          # la voz se acelera un poco al armar cada video (rubberband conserva el tono)
GAP = dict(start=.9, sentence=.28, cue=.5, quiz=.6, scene=1.0, end=1.6)
FEEDBACK = ['¡Correcto!', '¡Muy bien!', '¡Exacto!', '¡Eso es!', 'No era esa.', 'Casi, pero no.', 'Ups, no era esa.']
# Lo que dice Lima en la encuesta inicial (app.js usa estas claves).
APP = [
    ('hola', '¡Hola! Soy Lima, tu profe para la PAES. Te haré unas preguntas rápidas para armar tu plan de estudio.'),
    ('pruebas', '¿Qué pruebas vas a rendir? Marca todas las que darás.'),
    ('fecha', '¿Cuándo das la PAES?'),
    ('tiempo', '¿Cuánto tiempo puedes estudiar al día?'),
    ('nivel', '¿Cómo te va en cada prueba? Sé honesto: así el plan te da más tiempo donde más lo necesitas.'),
    ('meta', '¿Qué puntaje quieres lograr? Si ya sabes qué carrera quieres, cuéntame.'),
    ('estilo', '¿Cómo prefieres estudiar cada tema?'),
    ('diag', '¿Hacemos un diagnóstico? Así ajusto el plan a lo que ya sabes.'),
    ('plan', '¡Listo! Este es tu plan. Vamos paso a paso, un poco todos los días.'),
]


def log(*a):
    print(time.strftime('%H:%M:%S'), *a, flush=True)


class Voice:
    def __init__(self, models, cache):
        import sherpa_onnx, librosa
        self.librosa = librosa
        d = os.path.join(models, 'sherpa-onnx-supertonic-3-tts-int8-2026-05-11')
        self.tts = sherpa_onnx.OfflineTts(sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(
            supertonic=sherpa_onnx.OfflineTtsSupertonicModelConfig(
                duration_predictor=f'{d}/duration_predictor.int8.onnx', text_encoder=f'{d}/text_encoder.int8.onnx',
                vector_estimator=f'{d}/vector_estimator.int8.onnx', vocoder=f'{d}/vocoder.int8.onnx',
                tts_json=f'{d}/tts.json', unicode_indexer=f'{d}/unicode_indexer.bin', voice_style=f'{d}/voice.bin'),
            num_threads=HILOS)))
        p = os.path.join(models, 'sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8')
        self.asr = sherpa_onnx.OfflineRecognizer.from_transducer(
            encoder=f'{p}/encoder.int8.onnx', decoder=f'{p}/decoder.int8.onnx', joiner=f'{p}/joiner.int8.onnx',
            tokens=f'{p}/tokens.txt', model_type='nemo_transducer', num_threads=HILOS)
        self.sherpa = sherpa_onnx
        self.cache = cache
        os.makedirs(cache, exist_ok=True)
        self.stats = dict(new=0, cached=0, retries=0)

    def _synth(self, text):
        g = self.sherpa.GenerationConfig()
        g.sid, g.num_steps, g.speed, g.extra = VOICE, STEPS, SPEED, {'lang': 'es'}
        a = self.tts.generate(text, g)
        y = np.asarray(a.samples, dtype=np.float32)
        y = self.librosa.resample(y, orig_sr=a.sample_rate, target_sr=SR)
        return trim(y)

    def _listen(self, y):
        y16 = self.librosa.resample(y, orig_sr=SR, target_sr=16000)
        s = self.asr.create_stream()
        s.accept_waveform(16000, y16)
        self.asr.decode_stream(s)
        r = s.result
        words = []
        for tok, ts in zip(r.tokens, r.timestamps):
            if tok.startswith(' ') or not words:
                words.append([tok.strip(), float(ts)])
            else:
                words[-1][0] += tok
        out = []
        for w, ts in words:
            w = w.strip('.,;:¿?¡!')
            sp = asr_spoken(w)
            if sp is not None:
                for j, ww in enumerate(sp.split()):
                    out.append([habla.word_key(ww), ts + .1 * j])
                continue
            if w in habla.ACRO or w.upper() in habla.ACRO:
                for j, ww in enumerate(habla.ACRO.get(w, habla.ACRO.get(w.upper())).split()):
                    out.append([habla.word_key(ww), ts + .1 * j])
                continue
            k = habla.word_key(w)
            if not k:
                continue
            if k.isdigit():
                for j, ww in enumerate(habla.num(int(k)).split()):
                    out.append([habla.word_key(ww), ts + .12 * j])
            else:
                out.append([k, ts])
        return r.text, out

    def say(self, spoken, repair=False):
        """Audio de una frase hablada + palabras reconocidas con su tiempo. Reintenta si no se entiende o si
        parece faltar una palabra importante. Con repair=True vuelve a intentar las guardadas que quedaron dudosas."""
        key = hashlib.sha1(f'supertonic3|{VOICE}|{STEPS}|{SPEED}|{spoken}'.encode()).hexdigest()
        f = os.path.join(self.cache, key[:2], key + '.npz')
        ref = [habla.word_key(w) for w in spoken.split()]
        ref = [w for w in ref if w]
        old = None
        cmp_ref = [canon(w) for w in ref]
        if os.path.exists(f):
            z = np.load(f, allow_pickle=False)
            old = (z['audio'].astype(np.float32) / 32767, json.loads(str(z['meta'])))
            if repair and not old[1].get('rep') and any(t is None for t in old[1]['t']):
                # Se vuelve a escuchar con la comparación actual: muchas "faltas" eran cifras o siglas mal comparadas.
                text, hyp = self._listen(old[0])
                err, times = align(cmp_ref, [[canon(w), ts] for w, ts in hyp])
                old[1].update(asr=text, wer=round(err / max(1, len(ref)), 3), t=times)
                if missing(ref, times) == 0:
                    old[1]['rep'] = 1
                    np.savez_compressed(f, audio=np.round(old[0] * 32767).astype(np.int16), meta=json.dumps(old[1], ensure_ascii=False))
            if not repair or missing(ref, old[1]['t']) == 0 or old[1].get('rep'):
                self.stats['cached'] += 1
                return old
        best = None
        if old:
            best = ((missing(ref, old[1]['t']), old[1]['wer']), old[0], old[1])
        for attempt in range(4 if repair else 3):
            y = self._synth(spoken)
            text, hyp = self._listen(y)
            err, times = align(cmp_ref, [[canon(w), ts] for w, ts in hyp])
            # Se tolera algún error: el reconocedor también se equivoca, sobre todo con nombres propios.
            score = err / max(1, len(ref))
            ml = missing(ref, times)
            cand = ((ml, round(score, 3)), y, dict(asr=text, wer=round(score, 3), t=times, n=attempt + 1))
            if best is None or cand[0] < best[0]:
                best = cand
            if ml == 0 and score <= .25 and not (err >= 3 and score > .15):
                break
            self.stats['retries'] += 1
        _, y, meta = best
        if repair:
            meta['rep'] = 1
        os.makedirs(os.path.dirname(f), exist_ok=True)
        np.savez_compressed(f, audio=np.round(y * 32767).astype(np.int16), meta=json.dumps(meta, ensure_ascii=False))
        self.stats['new'] += 1
        return y, meta


LETTERS = dict(A='a', B='be', C='ce', D='de', E='e', F='efe', G='ge', H='hache', I='i', J='jota', K='ka', L='ele', M='eme',
               N='ene', Ñ='eñe', O='o', P='pe', Q='cu', R='erre', S='ese', T='te', U='u', V='ve', W='doble ve', X='equis',
               Y='i griega', Z='zeta')
ORD = dict(primero='uno', primer='uno', segundo='dos', tercero='tres', tercer='tres', cuarto='cuatro', quinto='cinco',
           sexto='seis', septimo='siete', octavo='ocho', noveno='nueve', decimo='diez')


def canon(k):
    return ORD.get(k, k)


def roman(s):
    v = dict(I=1, V=5, X=10, L=50, C=100)
    n = 0
    for a, b in zip(s, s[1:] + ' '):
        n += -v[a] if b != ' ' and v[b] > v[a] else v[a]
    return n if 0 < n < 400 else 0


# El reconocedor escribe cifras, siglas, fórmulas y unidades (18,5 · 20% · ADN · CO2 · 1s2 · 2000W · kWh):
# se pasan a la forma hablada para compararlas con lo que debía decir la narradora.
ASR_UNITS = {'w': 'watts', 'kw': 'kilowatts', 'kwh': 'kilowatts hora', 'v': 'volts', 'hz': 'hertz', 'km': 'kilómetros',
             'kg': 'kilos', 'cm': 'centímetros', 'mm': 'milímetros', 'ml': 'mililitros', 'kcal': 'kilocalorías'}
ASR_ALIAS = {'PAE': 'paes', 'PAES': 'paes'}


def dec_words(i, d):
    z = len(d) - len(d.lstrip('0'))
    return ' '.join([habla.num(int(i)), 'coma'] + ['cero'] * z + ([habla.num(int(d))] if d.strip('0') else []))


def asr_spoken(w):
    if not w:
        return None
    if w in ASR_ALIAS:
        return ASR_ALIAS[w]
    if re.fullmatch(r'[IVXLC]{2,}', w) and roman(w):
        return habla.num(roman(w))
    if re.fullmatch(r'[A-ZÑ]', w):
        return LETTERS.get(w, w)
    m = re.fullmatch(r'(\d+),(\d+)(%?)', w)
    if m:
        return dec_words(m.group(1), m.group(2)) + (' por ciento' if m.group(3) else '')
    m = re.fullmatch(r'(\d{1,3}(?:\.\d{3})+|\d+)(%?)', w)
    if m:
        return habla.num(int(m.group(1).replace('.', ''))) + (' por ciento' if m.group(2) else '')
    if w in habla.ACRO or w.upper() in habla.ACRO:
        return habla.ACRO.get(w, habla.ACRO.get(w.upper()))
    m = re.fullmatch(r'(\d+)([A-Za-z]{1,4})', w)
    if m and m.group(2).lower() in ASR_UNITS:
        return habla.num(int(m.group(1))) + ' ' + ASR_UNITS[m.group(2).lower()]
    if w.lower() in ASR_UNITS and len(w) > 1 and not w.islower():
        return ASR_UNITS[w.lower()]
    # Mezclas de letras y cifras (1s2, 2P6, C1, KX) o siglas cortas (XY, AT): letra por letra.
    if re.fullmatch(r'(?=.*\d)[A-Za-zÑñ\d]{2,8}', w) or re.fullmatch(r'[A-ZÑ]{2,4}', w):
        parts = re.findall(r'\d+|[A-Za-zÑñ]', w)
        return ' '.join(habla.num(int(x)) if x.isdigit() else LETTERS.get(x.upper(), x) for x in parts)
    return None


# Palabras largas que el reconocedor no oyó: señal de que la voz pudo saltarse algo (los nombres propios no cuentan).
NAMES = {habla.word_key(w) for v in habla.RESPELL.values() for w in v.split()}


def missing(ref, times):
    return sum(1 for w, t in zip(ref, times) if t is None and len(w) >= 6 and w not in NAMES)


def trim(y, thr_db=-42, pad=.04):
    fr = int(SR * .01)
    n = len(y) // fr
    if n < 3:
        return y
    e = 20 * np.log10(np.sqrt((y[:n * fr].reshape(n, fr) ** 2).mean(1)) + 1e-9)
    on = np.where(e > thr_db)[0]
    if not len(on):
        return y
    a = max(0, on[0] * fr - int(pad * SR))
    b = min(len(y), (on[-1] + 1) * fr + int(pad * SR))
    return y[a:b]


def align(ref, hyp):
    """Alinea las palabras que debían decirse con las reconocidas. Devuelve (errores, tiempo de cada palabra)."""
    n, m = len(ref), len(hyp)
    sim = lambda a, b: 0 if a == b else (.5 if difflib.SequenceMatcher(None, a, b).ratio() >= .7 else 1)
    D = np.zeros((n + 1, m + 1))
    D[:, 0] = np.arange(n + 1)
    D[0, :] = np.arange(m + 1)
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            D[i, j] = min(D[i - 1, j] + 1, D[i, j - 1] + 1, D[i - 1, j - 1] + sim(ref[i - 1], hyp[j - 1][0]))
    times = [None] * n
    i, j = n, m
    while i > 0 and j > 0:
        c = sim(ref[i - 1], hyp[j - 1][0])
        if D[i, j] == D[i - 1, j - 1] + c:
            if c < 1:
                times[i - 1] = hyp[j - 1][1]
            i, j = i - 1, j - 1
        elif D[i, j] == D[i - 1, j] + 1:
            i -= 1
        else:
            j -= 1
    return float(D[n, m]), times


def fill_times(times, total):
    """Completa los tiempos que faltan interpolando, y los deja crecientes."""
    n = len(times)
    t = list(times)
    known = [i for i, v in enumerate(t) if v is not None]
    if not known:
        return [total * i / max(1, n) for i in range(n)]
    for i in range(n):
        if t[i] is None:
            a = max([k for k in known if k < i], default=None)
            b = min([k for k in known if k > i], default=None)
            ta = t[a] if a is not None else 0
            tb = t[b] if b is not None else total
            ia = a if a is not None else -1
            ib = b if b is not None else n
            t[i] = ta + (tb - ta) * (i - ia) / (ib - ia)
    for i in range(1, n):
        t[i] = max(t[i], t[i - 1] + .04)
    return [min(total, max(0, v)) for v in t]


def display_word_times(display, word_times, total):
    """Tiempo de inicio de cada palabra escrita a partir de los tiempos de las palabras habladas."""
    toks = habla.speak_tokens(display)
    out, k = [], 0
    pending = 0
    for t, sp in toks:
        nw = len([w for w in sp.split() if habla.word_key(w)])
        if nw == 0:
            out.append(None)
            pending += 1
            continue
        out.append(word_times[k] if k < len(word_times) else total)
        k += nw
    # Los signos sueltos toman el tiempo de la palabra siguiente.
    for i in range(len(out) - 1, -1, -1):
        if out[i] is None:
            out[i] = out[i + 1] if i + 1 < len(out) else total
    return out


def cue_parts(text):
    """Frases de una indicación: [(texto que se ve, texto hablado, ligado palabra a palabra)]."""
    if text in FIJO:
        sp = FIJO[text]
        return [(text, s, False) for s in habla.sentences(sp)], True
    parts = []
    for s in habla.sentences(text):
        parts.append((s, habla.spoken(s), True))
    return parts, False


def huella(v):
    """Huella del guion hablado: tools/check.js avisa si el texto cambió y hay que volver a grabar."""
    return hashlib.sha1(json.dumps(v['sc'], ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:12]


def build_video(v, voice, outdir):
    chunks, cues, scs, t = [], [], [], 0.0
    sil = lambda s: np.zeros(int(round(s * SR)), dtype=np.float32)
    worst = []

    def push(y):
        nonlocal t
        chunks.append(y)
        t += len(y) / SR

    push(sil(GAP['start']))
    for si, sc in enumerate(v['sc']):
        if si:
            push(sil(GAP['scene']))
        scs.append(round(max(0, t - (GAP['start'] if si == 0 else GAP['scene'] * .6)), 2))
        for ci, c in enumerate(sc['cues']):
            if ci:
                push(sil(GAP['quiz'] if c['kind'] == 'e' else GAP['cue']))
            parts, fixed = cue_parts(c['text'])
            c0 = t
            lines = []
            for pi, (disp, sp, linked) in enumerate(parts):
                if pi:
                    push(sil(GAP['sentence']))
                probs = habla.problems(sp)
                if probs:
                    log('  ojo, signos en la voz', v['id'], probs, sp)
                y, meta = voice.say(sp, REPAIR)
                dur = len(y) / SR
                s0 = t
                push(y)
                worst.append((meta['wer'], sp, meta['asr']))
                if linked:
                    ref = [w for w in (habla.word_key(x) for x in sp.split()) if w]
                    wt = fill_times(meta['t'], dur)
                    if len(wt) != len(ref):
                        wt = fill_times([None] * len(ref), dur)
                    dwt = display_word_times(disp, wt, dur)
                    lines.append([round(s0, 2), round(t, 2), disp, [int(round(x * 100)) for x in dwt]])
                else:
                    lines.append([round(s0, 2), round(t, 2), None, None])
            if fixed:
                # Las fórmulas se muestran como se escriben, durante toda la lectura.
                lines = [[lines[0][0], lines[-1][1], c['text'], None]]
            cues.append([si, c['k'], c['kind'], round(c0, 2), round(t, 2), lines])
    push(sil(GAP['end']))
    y = np.concatenate(chunks)
    if TEMPO != 1:
        y = stretch(y, TEMPO)
        k = 1 / TEMPO
        scs = [round(s * k, 2) for s in scs]
        for c in cues:
            c[3], c[4] = round(c[3] * k, 2), round(c[4] * k, 2)
            for ln in c[5]:
                ln[0], ln[1] = round(ln[0] * k, 2), round(ln[1] * k, 2)
                if ln[3]:
                    ln[3] = [int(round(x * k)) for x in ln[3]]
    y = loudness(y)
    env = envelope(y)
    base = os.path.join(outdir, v['id'])
    encode(y, base + '.webm')
    data = dict(d=round(len(y) / SR, 2), h=huella(v), sc=scs, c=cues, e=env)
    with open(base + '.js', 'w', encoding='utf-8') as fh:
        fh.write('RB.vaudio(%s,%s);\n' % (json.dumps(v['id']), json.dumps(data, ensure_ascii=False, separators=(',', ':'))))
    worst.sort(key=lambda x: -x[0])
    return len(y) / SR, worst[:3]


def stretch(y, tempo):
    p = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', 'pipe:0',
                        '-af', f'rubberband=tempo={tempo}', '-f', 'f32le', '-ar', str(SR), '-ac', '1', 'pipe:1'],
                       input=y.astype(np.float32).tobytes(), capture_output=True)
    if p.returncode:
        raise RuntimeError(p.stderr.decode())
    return np.frombuffer(p.stdout, dtype=np.float32).copy()


def loudness(y, target_db=-19.0):
    fr = int(SR * .02)
    n = len(y) // fr
    e = np.sqrt((y[:n * fr].reshape(n, fr) ** 2).mean(1))
    act = e[e > 10 ** (-45 / 20)]
    rms = np.sqrt((act ** 2).mean()) if len(act) else 1e-3
    y = y * (10 ** (target_db / 20) / rms)
    # Limitador suave para los peaks.
    lim = .85
    over = np.abs(y) > lim
    y[over] = np.sign(y[over]) * (lim + (1 - lim) * np.tanh((np.abs(y[over]) - lim) / (1 - lim)))
    return y.astype(np.float32)


def envelope(y, fps=25):
    """Apertura de la boca de la mascota, de 0 a 9, 25 veces por segundo."""
    fr = SR // fps
    n = len(y) // fr
    e = 20 * np.log10(np.sqrt((y[:n * fr].reshape(n, fr) ** 2).mean(1)) + 1e-9)
    lv = np.clip((e + 48) / 30 * 9, 0, 9)
    lv = np.where(e < -46, 0, lv)
    return ''.join(str(int(round(v))) for v in lv)


def encode(y, path):
    p = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1',
                        '-i', 'pipe:0', '-c:a', 'libopus', '-b:a', '20k', '-vbr', 'on', '-compression_level', '10',
                        '-application', 'audio', '-fflags', '+bitexact', '-flags:a', '+bitexact', path], input=y.astype(np.float32).tobytes(), capture_output=True)
    if p.returncode:
        raise RuntimeError(p.stderr.decode())


def build_feedback(voice, outdir):
    chunks, items, t = [], [], 0.0
    for s in FEEDBACK:
        y, _ = voice.say(habla.spoken(s))
        items.append([s, round(t, 2), round(t + len(y) / SR, 2)])
        chunks += [y, np.zeros(int(.4 * SR), dtype=np.float32)]
        t += len(y) / SR + .4
    y = loudness(np.concatenate(chunks))
    encode(y, os.path.join(outdir, 'fb.webm'))
    with open(os.path.join(outdir, 'fb.js'), 'w', encoding='utf-8') as fh:
        fh.write('RB.vaudio("fb",%s);\n' % json.dumps(dict(d=round(len(y) / SR, 2), fb=items), ensure_ascii=False, separators=(',', ':')))


def build_app(voice, outdir):
    chunks, clips, t = [np.zeros(int(.15 * SR), dtype=np.float32)], {}, .15
    for k, s in APP:
        y, _ = voice.say(habla.spoken(s))
        if TEMPO != 1:
            y = stretch(y, TEMPO)
        clips[k] = [round(t, 2), round(t + len(y) / SR, 2)]
        chunks += [y, np.zeros(int(.5 * SR), dtype=np.float32)]
        t += len(y) / SR + .5
    y = loudness(np.concatenate(chunks))
    encode(y, os.path.join(outdir, 'app.webm'))
    with open(os.path.join(outdir, 'app.js'), 'w', encoding='utf-8') as fh:
        fh.write('RB.vaudio("app",%s);\n' % json.dumps(dict(d=round(len(y) / SR, 2), clips=clips, e=envelope(y)), ensure_ascii=False, separators=(',', ':')))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--solo', default='')
    ap.add_argument('--modelos', default=os.environ.get('PAES_MODELOS', '/tmp/claude-0/tts/models'))
    ap.add_argument('--cache', default=os.environ.get('PAES_CACHE_VOZ', os.path.expanduser('~/.cache/paes-voz')))
    ap.add_argument('--salida', default=os.path.join(ROOT, 'audio'))
    ap.add_argument('--app', action='store_true', help='solo las frases de la app (encuesta y respuestas)')
    ap.add_argument('--reverso', action='store_true', help='recorre los videos desde el último (para correr dos procesos)')
    ap.add_argument('--reparar', action='store_true', help='vuelve a grabar las frases guardadas donde pudo faltar una palabra')
    a = ap.parse_args()
    global REPAIR
    REPAIR = a.reparar
    g = json.loads(subprocess.run(['node', os.path.join(ROOT, 'tools', 'guion.js')], capture_output=True, check=True).stdout)
    only = set(x for x in a.solo.split(',') if x)
    os.makedirs(a.salida, exist_ok=True)
    voice = Voice(a.modelos, a.cache)
    build_feedback(voice, a.salida)
    build_app(voice, a.salida)
    if a.app:
        return
    total = 0
    for v in (g[::-1] if a.reverso else g):
        if only and v['id'] not in only:
            continue
        t0 = time.time()
        d, worst = build_video(v, voice, a.salida)
        total += d
        log(f"{v['id']}: {d / 60:.1f} min en {time.time() - t0:.0f} s · {voice.stats}")
        for w in worst:
            if w[0] > .1:
                log(f"   revisar ({w[0]:.2f}): {w[1]}  ⇢  {w[2]}")
    log(f'listo: {total / 60:.1f} min de narración')


if __name__ == '__main__':
    main()
