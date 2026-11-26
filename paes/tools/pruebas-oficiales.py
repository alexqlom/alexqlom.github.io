#!/usr/bin/env python3
# Convierte una prueba oficial de la PAES (PDF del DEMRE) y su clavijero en el archivo que importa la app
# (Practicar → Pruebas oficiales). Las pruebas son del DEMRE (Universidad de Chile, derechos reservados): el archivo
# que sale es para estudiar en el propio teléfono; no se sube al repositorio ni va dentro de la app.
#
#   pip install pymupdf pillow
#   python3 tools/pruebas-oficiales.py --prueba prueba.pdf --claves clavijero.pdf --id his-inv-2026 \
#       --nombre "PAES Invierno · Admisión 2026" --anio 2026 --proceso Invierno --salida pruebas-historia.json
#
# Si el archivo de salida ya existe, la prueba se agrega o se reemplaza dentro de él (así un solo archivo junta todas).
# Cada pregunta queda con su enunciado como texto (las citas en recuadro, como cita; las referencias, aparte), las
# tablas, gráficos e imágenes recortados del PDF como imagen, las cuatro alternativas como texto, la clave y el eje.
# Las preguntas que el clavijero marca con * (no cuentan para el puntaje) quedan con "nc": 1.
import argparse, base64, io, json, os, re, subprocess, sys, unicodedata

import pymupdf
from PIL import Image

ESCALA = 2.2          # resolución de los recortes (2,2 × 72 ppp ≈ 160 ppp)
CALIDAD = 82          # WebP


def limpio(s):
    s = unicodedata.normalize('NFKC', s).replace(' ', ' ').replace('‐', '-').replace('­', '')
    return re.sub(r'\s+', ' ', s).strip()


# ---------- Letras dañadas (prueba de 2023) ----------
# Algunas letras vienen sin su código de texto (se ven bien, pero se leen como espacio). Se recuperan comparando con
# las palabras de la propia prueba y de los guiones de la app: solo si hay una única palabra conocida que calce.
# Si no, la pregunta va como imagen del folleto.
VOCAB = set()
CORR = {}   # correcciones revisadas a mano para la prueba que se convierte (tools/pruebas-oficiales-correcciones.json)
PAL = re.compile(r'[A-Za-zÁÉÍÓÚÑÜáéíóúñü]+')


def vocabulario(doc, otros=()):
    for d in [doc] + [pymupdf.open(x) for x in otros]:
        for page in d:
            VOCAB.update(w.lower() for w in PAL.findall(page.get_text()))
    datos = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data')
    if os.path.isdir(datos):
        for f in sorted(os.listdir(datos)):
            if f.endswith('.js'):
                VOCAB.update(w.lower() for w in PAL.findall(open(os.path.join(datos, f), encoding='utf-8').read()))


def reparar(t):
    """Devuelve el texto con las letras dañadas recuperadas, o None si alguna palabra queda en duda."""
    import itertools
    ok = True

    def una(m):
        nonlocal ok
        w = m.group(0)
        if w.replace(DAÑO, '_') in CORR:
            return CORR[w.replace(DAÑO, '_')]
        pos = [i for i, c in enumerate(w) if c == DAÑO]
        if len(pos) > 3:
            ok = False
            return w
        # Terminaciones seguras: -ción, -sión, -xión, -gión.
        if len(pos) == 1 and re.search('[csxg]i' + DAÑO + 'n$', w):
            return w.replace(DAÑO, 'ó')
        romano = w.strip(DAÑO + 'IVXLCDM') == ''
        if not romano and any(i == 0 or w[i - 1].isupper() for i in pos):
            ok = False  # una mayúscula dañada (C/S, D/O…): mejor la imagen que arriesgar una palabra equivocada
            return w
        opciones = []
        for i in pos:
            if romano:
                letras = 'IVXLCDM'
            else:
                letras = 'áéíóúñü'
            opciones.append(sorted(set(letras)))
        hits = set()
        for combo in itertools.product(*opciones):
            c = list(w)
            for i, ch in zip(pos, combo):
                c[i] = ch
            c = ''.join(c)
            if c.lower() in VOCAB:
                hits.add(c)
        if len(hits) == 1:
            return hits.pop()
        ok = False
        return w

    out = re.sub('[A-Za-zÁÉÍÓÚÑÜáéíóúñü' + DAÑO + ']*' + DAÑO + '[A-Za-zÁÉÍÓÚÑÜáéíóúñü' + DAÑO + ']*', una, t)
    return re.sub(r'  +', ' ', out) if ok else None


# ---------- Clavijero ----------

def claves(pdf):
    txt = subprocess.run(['pdftotext', '-layout', pdf, '-'], capture_output=True, text=True, check=True).stdout
    ini = txt.find('CLAVES')
    fin = txt.find('TABLA DE TRANSFORMACI')
    key = {}
    for n, ast, k in re.findall(r'(?<!\d)(\d{1,2})\s*(\*?)\s+([A-E])\b', txt[ini:fin if fin > ini else None]):
        key[int(n)] = ('ABCDE'.index(k), bool(ast))
    tabla = {}
    if fin >= 0:
        for p, pts in re.findall(r'(?<!\d)(\d{1,2})\s+(\d{3,4})(?!\d)', txt[fin:]):
            if int(pts) <= 1000:
                tabla[int(p)] = int(pts)
    tab = [tabla[i] for i in range(max(tabla) + 1)] if tabla and all(i in tabla for i in range(max(tabla) + 1)) else None
    return key, tab


# ---------- Prueba ----------

DAÑO = '\u25af'  # una letra que el PDF trae como espacio (le falta su código de texto); se ve bien, pero no se lee


def texto_trozo(s):
    # Un espacio con el ancho de una letra es una letra dañada (pasa en la prueba de 2023: tildes, C, D, X).
    return ''.join(DAÑO if c['c'] == ' ' and (c['bbox'][2] - c['bbox'][0]) > s['size'] * .42 else c['c'] for c in s['chars'])


def lineas(page):
    """Líneas de texto de la página (sin el encabezado ni el número de página), con su caja y tamaño de letra."""
    H = page.rect.height
    out = []
    for b in page.get_text('rawdict')['blocks']:
        if b['type'] != 0:
            continue
        for l in b['lines']:
            for s in l['spans']:
                s['text'] = texto_trozo(s)
            t = limpio(''.join(s['text'] for s in l['spans']))
            x0, y0, x1, y1 = l['bbox']
            if not t or y0 < 50 or y0 > H - 70:
                continue
            size = max(s['size'] for s in l['spans'] if s['text'].strip()) if any(s['text'].strip() for s in l['spans']) else 0
            ital = any(s['flags'] & 2 for s in l['spans'] if s['text'].strip())
            out.append(dict(t=t, x0=x0, y0=y0, x1=x1, y1=y1, size=size, ital=ital))
    out.sort(key=lambda l: (round(l['y0']), l['x0']))
    # El texto justificado viene palabra por palabra: se juntan los trozos de una misma línea (misma altura).
    juntas = []
    for l in out:
        j = next((k for k in juntas if abs(k['y0'] - l['y0']) < 2.5 and k['size'] == l['size'] and l['x0'] >= k['x1'] - 1 and l['x0'] - k['x1'] < 40), None)
        if j:
            j['t'] += ' ' + l['t']
            j['x1'], j['y1'] = l['x1'], max(j['y1'], l['y1'])
            j['ital'] = j['ital'] and l['ital']
        else:
            juntas.append(dict(l))
    juntas.sort(key=lambda l: (round(l['y0']), l['x0']))
    return juntas


def inicios(doc):
    """Dónde empieza cada pregunta: número grande (18 pt) en el margen izquierdo. Los números van creciendo, pero
    pueden saltarse algunos: en las «selecciones de preguntas» el DEMRE publica solo una parte de la prueba."""
    out, last = [], 0
    for pno, page in enumerate(doc):
        for l in lineas(page):
            m = re.match(r'^(\d{1,2})\.(\s|$)', l['t'])
            if m and l['size'] >= 15 and l['x0'] < 130 and int(m.group(1)) > last and (last or int(m.group(1)) == 1 or pno > 1):
                out.append((int(m.group(1)), pno, l['y0']))
                last = int(m.group(1))
    return out


def secciones(doc):
    """Ejes de la prueba: títulos en mayúsculas que aparecen antes de un grupo de preguntas."""
    res = []
    for pno, page in enumerate(doc):
        for l in lineas(page):
            t = l['t']
            if t.isupper() and len(t) >= 8 and not re.match(r'^FORMA \d', t) and not re.match(r'^[A-E]\)', t) and l['x0'] > 100 and pno > 1:
                res.append((pno, l['y0'], t))
    return res


EJES = {'FORMACI': 'Formación ciudadana', 'HISTORIA': 'Historia: mundo, América y Chile', 'ECONOM': 'Economía y sociedad',
        'SISTEMA': 'Sistema económico', 'PENSAMIENTO': 'Pensamiento geográfico', 'GEOGRAF': 'Geografía'}


def nombre_eje(t):
    if DAÑO in t:
        return next((v for k, v in EJES.items() if t.startswith(k)), t.replace(DAÑO, '').capitalize())
    t = t.capitalize()
    for w in ('América', 'Chile', 'Europa', 'Latinoamérica'):
        t = re.sub(r'\b' + w.lower() + r'\b', w, t)
    return t


def figuras(page, y0, y1):
    """Lo que no es texto entre y0 e y1: las imágenes y los grupos de trazos (con cuántos trazos tiene cada uno)."""
    cajas = []
    for b in page.get_text('dict')['blocks']:
        if b['type'] == 1:
            r = pymupdf.Rect(b['bbox'])
            if r.y1 > y0 and r.y0 < y1 and r.width > 20 and r.height > 20:
                cajas.append(['img', r, 1])
    trazos = []
    for d in page.get_drawings():
        r = d['rect']
        if r.y1 <= y0 or r.y0 >= y1:
            continue
        fill = d.get('fill')
        if fill and all(c > .97 for c in fill) and not d.get('color'):
            continue  # rectángulos blancos de fondo
        trazos.append(pymupdf.Rect(r))
    # Agrupa trazos que se tocan (con 6 pt de holgura).
    grupos = []
    for r in trazos:
        rr = pymupdf.Rect(r.x0 - 6, r.y0 - 6, r.x1 + 6, r.y1 + 6)
        hit = [g for g in grupos if g[0].intersects(rr)]
        if hit:
            base = hit[0]
            base[0] |= r
            base[1] += 1
            for g in hit[1:]:
                base[0] |= g[0]
                base[1] += g[1]
                grupos.remove(g)
        else:
            grupos.append([pymupdf.Rect(r), 1])
    return cajas, grupos


def recorte(page, r):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(ESCALA, ESCALA), clip=r, alpha=False)
    im = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=CALIDAD, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()


def parrafos(ls, citas):
    """Junta las líneas en párrafos: '> ' para las citas en recuadro, '^ ' para las referencias de las fuentes."""
    def tipo(l):
        if l['size'] and l['size'] <= 10.6 and l['x0'] > 150:
            return 'ref'
        if any(c.x0 - 2 <= l['x0'] and l['x1'] <= c.x1 + 2 and c.y0 - 2 <= l['y0'] and l['y1'] <= c.y1 + 2 for c in citas):
            return 'cita'
        return 'txt'
    out, prev = [], None
    for l in ls:
        k = tipo(l)
        nuevo = (prev is None or k != prev[0] or l['y0'] - prev[1] > 1.65 * max(10, l['y1'] - l['y0']) or
                 (k == 'txt' and re.match(r'^(I|II|III|IV|V|VI)\.\s', l['t'])))
        if nuevo:
            if out and k == 'txt' and prev and prev[0] == 'txt' and re.match(r'^(I|II|III|IV|V|VI)\.\s', l['t']) and l['y0'] - prev[1] <= 1.65 * max(10, l['y1'] - l['y0']):
                out[-1][1] += '\n' + l['t']
            else:
                out.append([k, l['t']])
        else:
            out[-1][1] += ' ' + l['t']
        prev = (k, l['y0'], l['x0'])
    pre = {'cita': '> ', 'ref': '^ ', 'txt': ''}
    return '\n\n'.join(pre[k] + t.strip() for k, t in out if t.strip())


def pregunta(doc, n, pno, y0, sig):
    """Una pregunta: desde su número hasta el número de la siguiente (o el fin de la página)."""
    page = doc[pno]
    y1 = sig[2] - 2 if sig and sig[1] == pno else page.rect.height - 70
    ls = [l for l in lineas(page) if y0 - 2 <= l['y0'] < y1]
    # El número de la pregunta (y el texto que comparte su línea).
    first = ls[0]
    first['t'] = re.sub(r'^\d{1,2}\.\s*', '', first['t'])
    if not first['t']:
        ls = ls[1:]
    # Letras dañadas: se recuperan si no hay duda (si queda alguna, esa parte va como imagen más abajo).
    for l in ls:
        if DAÑO in l['t']:
            t = reparar(l['t'])
            if t is not None:
                l['t'] = t
    # Alternativas: la letra en el margen y su texto a la derecha.
    letras = [l for l in ls if re.match(r'^[A-E]\)(\s|$)', l['t']) and l['x0'] < 125]
    if len(letras) < 2 or [l['t'][0] for l in letras] != list('ABCDE'[:len(letras)]):
        raise ValueError(f'pregunta {n}: no encuentro las alternativas')
    ya = letras[0]['y0']
    opts = []
    for i, L in enumerate(letras):
        yb = letras[i + 1]['y0'] if i + 1 < len(letras) else y1
        parte = [l for l in ls if L['y0'] - 1 <= l['y0'] < yb - 1]
        opts.append(limpio(re.sub(r'^[A-E]\)\s*', '', ' '.join(l['t'] for l in parte))))
    stem = [l for l in ls if l['y0'] < ya - 1]
    cajas, grupos = figuras(page, y0, ya - 1)
    cajas_o, grupos_o = figuras(page, ya - 1, y1)
    q = dict(n=n)
    if cajas_o or any(m >= 3 and r.width > 30 and r.height > 20 for r, m in grupos_o) or any(not o for o in opts) or any(DAÑO in o for o in opts):
        # Alternativas con imágenes: toda la pregunta va como imagen y se responde con la letra.
        r = pymupdf.Rect(page.rect.x0 + 50, y0 - 4, page.rect.x1 - 50, max(l['y1'] for l in ls) + 6)
        q['img'] = recorte(page, r)
        q['k'] = len(letras)
        return q
    if any(DAÑO in l['t'] for l in stem):
        # Letras dañadas en el enunciado: va como imagen del folleto (sin el número), y las alternativas como texto.
        izq = min(l['x0'] for l in stem[1:] or stem) - 6
        r = pymupdf.Rect(max(izq, page.rect.x0 + 20), y0 - 2, page.rect.x1 - 40, min(ya - 3, max(l['y1'] for l in stem) + 6))
        q['img'] = recorte(page, r)
        q['o'] = opts
        return q
    # Margen de los párrafos normales del enunciado (la línea más común a la izquierda).
    xs = [round(l['x0']) for l in stem if l['x1'] - l['x0'] >= 200 and l['y0'] > y0 + 8] or [round(min(l['x0'] for l in stem))]
    xm = max(set(xs), key=xs.count)
    dentro = lambda l, r: r.x0 - 3 <= l['x0'] and l['x1'] <= r.x1 + 3 and r.y0 - 3 <= l['y0'] and l['y1'] <= r.y1 + 3
    citas, figs = [], [c[1] for c in cajas]
    for r, m in grupos:
        if r.width < 30 or r.height < 15:
            continue
        adentro = [l for l in stem if dentro(l, r)]
        if m <= 16 and r.width >= 300 and adentro and max(l['x1'] - l['x0'] for l in adentro) > .55 * r.width:
            citas.append(r)          # recuadro ancho con párrafos: una cita, va como texto
        elif m >= 3 or adentro:
            figs.append(r)           # tabla, gráfico, esquema, globo de diálogo
    if figs:
        F = pymupdf.Rect(figs[0])
        for f in figs[1:]:
            F |= f
        normal = lambda l: abs(l['x0'] - xm) <= 3 and 11 <= (l['size'] or 12) <= 13.5 and not l['ital']
        cambio = True
        while cambio:
            cambio = False
            for l in stem:
                if l['y0'] <= y0 + 8:
                    continue  # la primera línea, la del número de la pregunta
                if dentro(l, F) or any(dentro(l, c) for c in citas):
                    continue
                cerca = l['y1'] >= F.y0 - 26 and l['y0'] <= F.y1 + 26
                if cerca and (not normal(l) or (F.y0 - 2 <= l['y0'] <= F.y1 + 2)):
                    F |= pymupdf.Rect(l['x0'], l['y0'], l['x1'], l['y1'])
                    cambio = True
        antes = [l for l in stem if l['y1'] <= F.y0 + 2 and not dentro(l, F)]
        despues = [l for l in stem if l['y0'] >= F.y1 - 2 and not dentro(l, F)]
        izq = min([F.x0] + [l['x0'] for l in stem]) - 6
        der = max([F.x1] + [l['x1'] for l in stem]) + 6
        q['q'] = parrafos(antes, citas)
        # El recorte no toca el texto que va antes ni después (que queda como texto).
        arr = max([F.y0 - 6] + [l['y1'] + 1 for l in antes])
        aba = min([F.y1 + 6] + [l['y0'] - 1 for l in despues])
        q['img'] = recorte(page, pymupdf.Rect(izq, arr, der, aba))
        if despues:
            q['q2'] = parrafos(despues, citas)
    else:
        q['q'] = parrafos(stem, citas)
    q['o'] = opts
    return q


def convertir(prueba_pdf, claves_pdf, otros=()):
    doc = pymupdf.open(prueba_pdf)
    vocabulario(doc, otros)
    key, tabla = claves(claves_pdf)
    ini = inicios(doc)
    secs = secciones(doc)
    out = []
    for i, (n, pno, y) in enumerate(ini):
        sig = ini[i + 1] if i + 1 < len(ini) else None
        q = pregunta(doc, n, pno, y, sig)
        eje = [t for (sp, sy, t) in secs if (sp, sy) < (pno, y)]
        if eje:
            q['eje'] = nombre_eje(eje[-1])
        if n in key and key[n][0] < len(q.get('o') or []) + (q.get('k') or 0):
            q['a'], nc = key[n]
            if nc:
                q['nc'] = 1
        else:
            # Sin clave, o con una clave que no calza con las alternativas: no cuenta (se avisa al convertir).
            q['a'] = None
        out.append(q)
    return out, tabla


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--prueba', required=True)
    ap.add_argument('--claves', required=True)
    ap.add_argument('--id', required=True)
    ap.add_argument('--nombre', required=True)
    ap.add_argument('--anio', type=int, required=True)
    ap.add_argument('--proceso', default='Regular')
    ap.add_argument('--detalle', default='', help='por ejemplo: "Rendida en junio de 2025 · Forma 121"')
    ap.add_argument('--test', default='his')
    ap.add_argument('--min', type=int, default=0, help='minutos de la prueba (por defecto, los de la app)')
    ap.add_argument('--salida', required=True)
    ap.add_argument('--vocab', nargs='*', default=[], help='otros PDF cuyas palabras ayudan a recuperar letras dañadas')
    a = ap.parse_args()
    fc = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pruebas-oficiales-correcciones.json')
    if os.path.exists(fc):
        CORR.update(json.load(open(fc, encoding='utf-8')).get(a.id, {}))
    preguntas, tabla = convertir(a.prueba, a.claves, [x for x in a.vocab if os.path.abspath(x) != os.path.abspath(a.prueba)])
    forma = re.search(r'FORMA\s+(\d+)', pymupdf.open(a.prueba)[0].get_text(), re.I)
    detalle = a.detalle + (f' · Forma {forma.group(1)}' if forma and 'Forma' not in a.detalle else '')
    p = dict(id=a.id, test=a.test, nombre=a.nombre, detalle=detalle, anio=a.anio, proceso=a.proceso, fuente='DEMRE, Universidad de Chile',
             preguntas=preguntas)
    if a.min:
        p['min'] = a.min
    if tabla:
        p['tabla'] = tabla
    sel = re.search(r'selecci[oó]n de (\d+) preguntas', pymupdf.open(a.prueba)[0].get_text(), re.I)
    if sel or len(preguntas) < 60:
        p['seleccion'] = 1  # el DEMRE publicó solo una parte de la prueba: el puntaje oficial no se puede calcular
    base = {'formato': 'paes-oficiales', 'v': 1, 'pruebas': []}
    if os.path.exists(a.salida):
        base = json.load(open(a.salida, encoding='utf-8'))
    base['pruebas'] = [x for x in base['pruebas'] if x['id'] != a.id] + [p]
    base['pruebas'].sort(key=lambda x: (x['test'], -x['anio'], x['proceso']))
    with open(a.salida, 'w', encoding='utf-8') as fh:
        json.dump(base, fh, ensure_ascii=False, separators=(',', ':'))
    sin = [q['n'] for q in preguntas if q.get('a') is None]
    img = [q['n'] for q in preguntas if q.get('img')]
    print(f"{a.id}: {len(preguntas)} preguntas · {len(img)} con imagen {img} · sin clave {sin} · no cuentan {[q['n'] for q in preguntas if q.get('nc')]}"
          f" · tabla de puntaje {'sí' if tabla else 'no'} · {os.path.getsize(a.salida) // 1024} KB")


if __name__ == '__main__':
    main()
