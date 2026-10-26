#!/usr/bin/env python3
# Compone la música de fondo de los videos: un loop lo-fi tranquilo (84 BPM, Do mayor) con piano eléctrico,
# colchón, bajo y una batería muy suave. Queda en audio/musica.js como base64 para poder repetirlo sin cortes
# con Web Audio (también funciona abriendo la app desde file://).
# Uso: python3 tools/musica.py
import base64, os, subprocess
import numpy as np

SR = 32000
BPM = 84
BEAT = 60 / BPM
BAR = 4 * BEAT
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rng = np.random.default_rng(7)


def hz(n):
    """Nombre de nota (C4, A#3...) a frecuencia."""
    names = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
    k = names[n[0]] + (1 if '#' in n else 0)
    o = int(n[-1])
    return 440 * 2 ** ((k + 12 * (o + 1) - 69) / 12)


def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / d)


def epiano(f, dur, vel):
    """Piano eléctrico por FM: ataque con brillo que se apaga, cola larga y un trémolo leve."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    idx = 1.4 * np.exp(-t / .35) + .15
    y = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * t))
    y += .18 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / .5)
    y *= env(n, .004, 1.1) * (1 + .08 * np.sin(2 * np.pi * 4.3 * t))
    return y * vel


def pad(fs, dur, vel):
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = np.zeros(n)
    for f in fs:
        for det in (-.0035, .0035):
            for h in range(1, 6):
                y += np.sin(2 * np.pi * f * (1 + det) * h * t + rng.uniform(0, 6.28)) / (h ** 1.6)
    a = np.minimum(1, t / .9) * np.minimum(1, (dur - t) / .9)
    return y * a * vel / len(fs)


def bass(f, dur, vel):
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * 2 * f * t) + .1 * np.sin(2 * np.pi * 3 * f * t)
    return y * env(n, .008, .55) * vel


def kick(vel):
    n = int(.32 * SR)
    t = np.arange(n) / SR
    f = 45 + 75 * np.exp(-t / .045)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .12) * vel


def noise_hit(dur, lo, hi, d, vel):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    X = np.fft.rfft(x)
    fr = np.fft.rfftfreq(n, 1 / SR)
    X[(fr < lo) | (fr > hi)] = 0
    x = np.fft.irfft(X, n)
    x /= np.abs(x).max() + 1e-9
    return x * np.exp(-np.arange(n) / SR / d) * vel


def place(buf, y, t):
    i = int(round(t * SR))
    j = min(len(buf), i + len(y))
    if i < len(buf):
        buf[i:j] += y[:j - i]


CHORDS = [  # (bajo, notas del piano, notas del colchón)
    ('C3', ['E4', 'G4', 'B4', 'D5'], ['C3', 'G3', 'E4']),
    ('A2', ['C4', 'E4', 'G4', 'B4'], ['A2', 'E3', 'C4']),
    ('F2', ['A3', 'C4', 'E4', 'G4'], ['F2', 'C3', 'A3']),
    ('G2', ['B3', 'D4', 'E4', 'A4'], ['G2', 'D3', 'B3']),
]
MELODY = [  # (compás dentro del ciclo, tiempo, nota, duración en tiempos)
    (0, 0, 'G5', 1), (0, 1.5, 'E5', .5), (0, 2, 'D5', 1), (0, 3, 'C5', 1),
    (1, 0, 'E5', 1.5), (1, 2, 'D5', .5), (1, 2.5, 'C5', 1.5),
    (2, 0, 'A4', 1), (2, 1, 'C5', 1), (2, 2, 'D5', 1), (2, 3, 'E5', 1),
    (3, 0, 'D5', 2), (3, 2.5, 'B4', 1.5),
]
CYCLES = 8
total = CYCLES * 4 * BAR
tail = 3.0
mix = {k: np.zeros(int((total + tail) * SR)) for k in ('ep', 'pad', 'bass', 'drums', 'mel')}

for c in range(CYCLES):
    for b, (bn, ep, pd) in enumerate(CHORDS):
        t0 = (c * 4 + b) * BAR
        # Piano: acorde arpegiado suave en el 1 y un eco en el "y" del 2.
        for k, n in enumerate(ep):
            place(mix['ep'], epiano(hz(n), 2.6, .16 * rng.uniform(.85, 1)), t0 + k * .022)
            if c % 2 == 1:
                place(mix['ep'], epiano(hz(n), 1.6, .07 * rng.uniform(.8, 1)), t0 + 2.5 * BEAT + k * .018)
        place(mix['pad'], pad([hz(n) for n in pd], BAR + .9, .06), t0)
        if c >= 1:
            place(mix['bass'], bass(hz(bn), BEAT * 1.6, .32), t0)
            place(mix['bass'], bass(hz(bn), BEAT * .9, .2), t0 + 2.5 * BEAT)
        # Batería muy suave desde el segundo ciclo; el último ciclo se aliviana para empalmar con el inicio.
        if 1 <= c:
            for beat in range(4):
                tb = t0 + beat * BEAT
                if beat in (0, 2):
                    place(mix['drums'], kick(.42 if beat == 0 else .3), tb)
                if beat in (1, 3):
                    place(mix['drums'], noise_hit(.16, 900, 6000, .045, .07), tb)
                for e8 in (0, 1):
                    swing = .58 if e8 else 0
                    place(mix['drums'], noise_hit(.05, 6500, 13000, .012, .035 if e8 else .05), tb + swing * BEAT)
        if c in (2, 3, 5, 6):
            for mb, mt, mn, md in MELODY:
                if mb == b:
                    place(mix['mel'], epiano(hz(mn), md * BEAT + .6, .09), t0 + mt * BEAT)

y = .95 * mix['ep'] + mix['pad'] + mix['bass'] + mix['drums'] + mix['mel']
# Lo que suena después del final (colas) se suma al comienzo para que el loop no tenga corte.
n = int(total * SR)
y[:len(y) - n] += y[n:]
y = y[:n]
# Filtro paso bajo suave (6 kHz) y un poco de "aire" de sala con ecos cortos.
Y = np.fft.rfft(y)
fr = np.fft.rfftfreq(len(y), 1 / SR)
Y *= 1 / np.sqrt(1 + (fr / 6000) ** 4)
y = np.fft.irfft(Y, len(y))
for dly, g in ((.031, .22), (.047, .16), (.083, .11), (.127, .07)):
    k = int(dly * SR)
    y = y + g * np.roll(y, k)
rms = np.sqrt((y ** 2).mean())
y = y * (10 ** (-20 / 20) / rms)
peak = np.abs(y).max()
if peak > .7:
    y = y * (.7 / peak)
print(f'{len(y) / SR:.1f} s · rms {20 * np.log10(np.sqrt((y ** 2).mean())):.1f} dBFS · peak {20 * np.log10(np.abs(y).max()):.1f} dBFS')

out = os.path.join(ROOT, 'audio', 'musica.webm')
p = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', 'pipe:0',
                    '-c:a', 'libopus', '-b:a', '24k', '-vbr', 'on', '-application', 'audio', out],
                   input=y.astype(np.float32).tobytes(), capture_output=True)
if p.returncode:
    raise SystemExit(p.stderr.decode())
b64 = base64.b64encode(open(out, 'rb').read()).decode()
with open(os.path.join(ROOT, 'audio', 'musica.js'), 'w') as fh:
    fh.write('RB.music = "data:audio/webm;base64,%s";\n' % b64)
os.remove(out)
print('audio/musica.js', len(b64) // 1024, 'KB')
