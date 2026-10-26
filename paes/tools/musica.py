#!/usr/bin/env python3
# Compone la música de fondo de los videos: un loop alegre y brillante (112 BPM, Re mayor, I–V–vi–IV) con
# guitarra pulsada (Karplus-Strong), marimba, campanitas, bajo saltarín, palmas y batería liviana. Tiene
# cuatro partes que se van turnando para que no canse, y empalma sin corte al repetirse. Queda en
# audio/musica.js como base64 para repetirla con Web Audio (también funciona abriendo la app desde file://).
# Uso: python3 tools/musica.py
import base64, os, subprocess
import numpy as np
from scipy.signal import resample_poly

SR = 32000
BPM = 112
BEAT = 60 / BPM
BAR = 4 * BEAT
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rng = np.random.default_rng(11)


def hz(n):
    """Nombre de nota (C4, F#3...) a frecuencia."""
    names = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
    k = names[n[0]] + (1 if '#' in n else -1 if n[1] == 'b' else 0)
    o = int(n[-1])
    return 440 * 2 ** ((k + 12 * (o + 1) - 69) / 12)


def pluck(f, dur, vel, bright=.5):
    """Cuerda pulsada (Karplus-Strong). Se calcula a 4× la frecuencia de muestreo para que la afinación quede
    exacta (el período de la cuerda tiene que ser un número entero de muestras) y después se baja a SR."""
    OS = 4
    n = int(dur * SR) * OS
    p = max(2, int(round(SR * OS / f - .5)))   # el promedio de dos muestras agrega media muestra de retardo
    buf = rng.uniform(-1, 1, p)
    # Ataque más o menos brillante: se suaviza el ruido inicial.
    for _ in range(int((1 - bright) * 3)):
        buf = .5 * (buf + np.roll(buf, 1))
    # y[k] = d·(y[k−p] + y[k−p+1]) / 2, calculado de a un período completo.
    d = .996 if f < 300 else .993
    blocks, prev = [buf], buf
    while len(blocks) * p < n:
        cur = np.empty(p)
        cur[:-1] = d * .5 * (prev[:-1] + prev[1:])
        cur[-1] = d * .5 * (prev[-1] + cur[0])
        blocks.append(cur)
        prev = cur
    y = resample_poly(np.concatenate(blocks)[:n], 1, OS)
    n = len(y)
    t = np.arange(n) / SR
    y *= np.minimum(1, t / .002) * np.minimum(1, (dur - t) / .03)
    return y * vel


def marimba(f, dur, vel):
    """Barra de marimba: fundamental, sobretono afinado a 4× y 10×, y el golpe de la baqueta."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = np.sin(2 * np.pi * f * t) * np.exp(-t / .42)
    y += .35 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t / .09)
    y += .08 * np.sin(2 * np.pi * 9.9 * f * t) * np.exp(-t / .025)
    y += .25 * rng.standard_normal(n) * np.exp(-t / .004)
    return y * np.minimum(1, t / .001) * vel


def bell(f, dur, vel):
    """Campanita (glockenspiel): parciales inarmónicos que se apagan a distinto ritmo."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = np.zeros(n)
    for r, a, d in ((1, 1, .9), (2.76, .5, .35), (5.4, .25, .16), (8.93, .12, .07)):
        y += a * np.sin(2 * np.pi * f * r * t) * np.exp(-t / d)
    return y * np.minimum(1, t / .0015) * vel


def bass(f, dur, vel):
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = np.sin(2 * np.pi * f * t) + .45 * np.sin(2 * np.pi * 2 * f * t + .3) + .15 * np.sin(2 * np.pi * 3 * f * t)
    y = np.tanh(1.6 * y) / 1.2
    return y * np.minimum(1, t / .006) * np.exp(-t / .38) * np.minimum(1, (dur - t) / .02) * vel


def kick(vel):
    n = int(.3 * SR)
    t = np.arange(n) / SR
    f = 48 + 110 * np.exp(-t / .03)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .13)
    y += .3 * rng.standard_normal(n) * np.exp(-t / .002)
    return np.tanh(1.5 * y) * vel


def noise(dur, lo, hi, d, vel):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    X = np.fft.rfft(x)
    fr = np.fft.rfftfreq(n, 1 / SR)
    X[(fr < lo) | (fr > hi)] = 0
    x = np.fft.irfft(X, n)
    x /= np.abs(x).max() + 1e-9
    return x * np.exp(-np.arange(n) / SR / d) * vel


def snare(vel):
    n = int(.22 * SR)
    t = np.arange(n) / SR
    y = noise(.22, 1200, 9000, .06, 1) + .5 * np.sin(2 * np.pi * 190 * t) * np.exp(-t / .05)
    return y * vel


def clap(vel):
    y = np.zeros(int(.25 * SR))
    for k, dt in enumerate((0, .009, .018, .03)):
        h = noise(.2, 900, 7000, .02 if k < 3 else .09, 1)
        i = int(dt * SR)
        y[i:i + len(h)] += h[:len(y) - i]
    return y * vel


def place(buf, y, t):
    i = int(round(t * SR))
    if i >= len(buf):
        return
    j = min(len(buf), i + len(y))
    buf[i:j] += y[:j - i]


# I–V–vi–IV en Re mayor: (bajo, acorde para la guitarra, notas del arpegio de marimba)
CH = [
    ('D2', ['D3', 'A3', 'D4', 'F#4', 'A4'], ['D5', 'F#5', 'A5', 'F#5']),
    ('A1', ['A2', 'E3', 'A3', 'C#4', 'E4'], ['C#5', 'E5', 'A5', 'E5']),
    ('B1', ['B2', 'F#3', 'B3', 'D4', 'F#4'], ['B4', 'D5', 'F#5', 'D5']),
    ('G1', ['G2', 'D3', 'G3', 'B3', 'D4'], ['B4', 'D5', 'G5', 'D5']),
]
# Melodía de campanitas (compás del ciclo, tiempo, nota, duración en tiempos).
MEL = [
    (0, 0, 'F#5', .5), (0, .5, 'A5', .5), (0, 1.5, 'A5', .5), (0, 2, 'B5', 1), (0, 3, 'A5', 1),
    (1, 0, 'E5', .5), (1, .5, 'C#5', .5), (1, 1.5, 'E5', .5), (1, 2, 'A5', 2),
    (2, 0, 'F#5', .5), (2, .5, 'B5', .5), (2, 1.5, 'A5', .5), (2, 2, 'F#5', 1), (2, 3, 'D5', 1),
    (3, 0, 'G5', .5), (3, .5, 'F#5', .5), (3, 1, 'E5', 1), (3, 2.5, 'D5', 1.5),
]
# Partes del loop (cada una dura un ciclo de 4 compases): qué instrumentos suenan.
PARTS = [
    dict(gtr=1, bass=1, kick=1, hat=1, clap=0, mar=0, mel=0, snare=0),   # A: entra el ritmo
    dict(gtr=1, bass=1, kick=1, hat=1, clap=1, mar=1, mel=0, snare=1),   # B: completo
    dict(gtr=1, bass=1, kick=1, hat=1, clap=1, mar=0, mel=1, snare=1),   # C: con melodía
    dict(gtr=1, bass=1, kick=0, hat=1, clap=1, mar=1, mel=0, snare=0),   # D: quiebre liviano con palmas
    dict(gtr=1, bass=1, kick=1, hat=1, clap=1, mar=1, mel=1, snare=1),   # E: todo
    dict(gtr=1, bass=1, kick=1, hat=1, clap=0, mar=1, mel=0, snare=1),   # F: vuelve a empezar
]
total = len(PARTS) * 4 * BAR
tail = 3.0
tr = {k: np.zeros(int((total + tail) * SR)) for k in ('gtr', 'mar', 'mel', 'bass', 'drums')}
# Rasgueo: abajo en los tiempos, arriba en los contratiempos, con acentos en 1 y 3.
STRUM = [(0, 1, 1.0), (.5, -1, .45), (1, 1, .7), (1.5, -1, .5), (2, 1, .9), (2.5, -1, .45), (3, 1, .65), (3.5, -1, .55)]
for c, P in enumerate(PARTS):
    for b, (bn, gt, ar) in enumerate(CH):
        t0 = (c * 4 + b) * BAR
        if P['gtr']:
            for tb, dirn, acc in STRUM:
                notes = gt if dirn > 0 else gt[::-1][:3]
                for k, nm in enumerate(notes):
                    place(tr['gtr'], pluck(hz(nm), .55 if dirn > 0 else .3, .16 * acc * rng.uniform(.85, 1), .7), t0 + tb * BEAT + k * .011)
        if P['mar']:
            for k in range(8):
                place(tr['mar'], marimba(hz(ar[k % 4]), .5, (.2 if k % 2 == 0 else .13) * rng.uniform(.9, 1)), t0 + k * .5 * BEAT)
        if P['bass']:
            for tb, ln, v in ((0, 1.2, .5), (1.5, .45, .32), (2, .9, .42), (3.5, .45, .3)):
                f = hz(bn) * (2 if tb == 3.5 else 1)
                place(tr['bass'], bass(f, ln * BEAT, v), t0 + tb * BEAT)
        for beat in range(4):
            tb = t0 + beat * BEAT
            if P['kick'] and beat in (0, 2):
                place(tr['drums'], kick(.55), tb)
            if P['kick'] and beat == 2 and b == 3:
                place(tr['drums'], kick(.35), tb + .5 * BEAT)
            if P['snare'] and beat in (1, 3):
                place(tr['drums'], snare(.22), tb)
            if P['clap'] and beat in (1, 3):
                place(tr['drums'], clap(.2), tb + .008)
            if P['hat']:
                for s16 in range(4):
                    v = (.05, .025, .04, .025)[s16]
                    place(tr['drums'], noise(.04, 7000, 14000, .01, v), tb + s16 * BEAT / 4 + (.012 if s16 % 2 else 0))
        if P['mel']:
            for mb, mt, mn, md in MEL:
                if mb == b:
                    place(tr['mel'], bell(hz(mn), md * BEAT + .9, .13), t0 + mt * BEAT)
    # Redoble corto al final de cada parte para anunciar la siguiente.
    tend = (c * 4 + 4) * BAR
    for k in range(4):
        place(tr['drums'], snare(.08 + .03 * k), tend - BEAT + k * BEAT / 4)

y = .9 * tr['gtr'] + .8 * tr['mar'] + tr['mel'] + .9 * tr['bass'] + tr['drums']
# Lo que suena después del final (colas) se suma al comienzo para que el loop no tenga corte.
n = int(total * SR)
y[:len(y) - n] += y[n:]
y = y[:n]
# Un poco de sala con ecos cortos (sin apagar los agudos).
for dly, g in ((.023, .12), (.041, .08), (.067, .05)):
    y = y + g * np.roll(y, int(dly * SR))
rms = np.sqrt((y ** 2).mean())
y = y * (10 ** (-17 / 20) / rms)
y = np.tanh(y * 1.3) / 1.3       # limitador suave
print(f'{len(y) / SR:.1f} s · rms {20 * np.log10(np.sqrt((y ** 2).mean())):.1f} dBFS · peak {20 * np.log10(np.abs(y).max()):.1f} dBFS')

out = os.path.join(ROOT, 'audio', 'musica.webm')
p = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', 'pipe:0',
                    '-c:a', 'libopus', '-b:a', '40k', '-vbr', 'on', '-application', 'audio', '-fflags', '+bitexact', '-flags:a', '+bitexact', out],
                   input=y.astype(np.float32).tobytes(), capture_output=True)
if p.returncode:
    raise SystemExit(p.stderr.decode())
b64 = base64.b64encode(open(out, 'rb').read()).decode()
with open(os.path.join(ROOT, 'audio', 'musica.js'), 'w') as fh:
    fh.write('RB.music = "data:audio/webm;base64,%s";\n' % b64)
if os.environ.get('PAES_MUSICA_WAV'):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', out, os.environ['PAES_MUSICA_WAV']])
os.remove(out)
print('audio/musica.js', len(b64) // 1024, 'KB')
