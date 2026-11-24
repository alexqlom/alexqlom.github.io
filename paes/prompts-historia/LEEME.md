# Prompts para rehacer los videos de Historia con Remotion

56 prompts, uno por video, más la guía común. Los genera `tools/prompts-historia.py` a partir de los guiones
de la app (`data/toon-h*.js`): si cambia un guion, se vuelven a generar.

## Cómo usarlos

1. En la sesión que tiene Remotion, pásale primero `GUIA.md` (una sola vez).
2. Después, un prompt por vez y en orden (ver `INDICE.md`): «Haz el video del prompt `h1-1.md`».
   Si esa sesión puede leer el repositorio `alexqlom/paes`, basta con decirle:
   «Lee `prompts-historia/GUIA.md` y haz el video de `prompts-historia/h1-1.md`».
3. Revisa el primer video completo antes de pedir los siguientes.

## La voz de Fernando Martínez

- Es una voz de la biblioteca de ElevenLabs: por la API solo funciona con un plan pagado. Con el plan gratis,
  genera el audio en elevenlabs.io con el texto de la sección 5 de cada prompt (voz Fernando Martínez) y pásale
  el MP3 a la sesión de Remotion.
- Créditos: los 56 videos suman 146.622 caracteres, unos 188 minutos de voz. El plan gratis da 10.000 al mes
  (unos 3 videos). Generar una escena de nuevo vuelve a gastar créditos.

## Qué entrega cada video

`out/<id>.mp4` (1080×1920), `out/<id>-720.mp4` (para la app), `out/<id>.jpg`, `out/<id>-creditos.txt` y
`out/<id>.json` con los tiempos de las escenas, las preguntas y las palabras, para integrarlo a la app.
