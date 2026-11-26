# PAES

App para preparar la PAES al estilo Duolingo: lecciones cortas, preguntas, rachas y un video animado
(“en dibujos”, con narración) al entrar a cada lección. Funciona como página web y como APK de Android.
Estilo negro con lima.

**Descargar la app:** [`PAES.apk`](PAES.apk)

## Pruebas que cubre

| Prueba | Datos | Videos en dibujos |
| --- | --- | --- |
| Competencia Lectora | `data/lec-*.js` | `data/toon-lec*.js` |
| Matemática M1 | `data/m1-*.js` | `data/toon-m1*.js` |
| Matemática M2 | `data/m2-*.js` | `data/toon-m2*.js` |
| Historia y Ciencias Sociales | `data/his-*.js` | `data/toon-h*.js` |
| Ciencias: Física, Química y Biología | `data/fis-*.js`, `data/qui-*.js`, `data/bio-*.js` | `data/toon-f*.js`, `toon-q*.js`, `toon-b*.js` |

## Estructura

- `index.html`, `app.js`, `app.css`: la app (rutas, lecciones, encuesta inicial, plan de estudio).
- `data/`: el contenido. `tests.js` define las pruebas; cada archivo agrega unidades, lecciones y preguntas.
- `toon.js`, `toon-arte.js`, `toon-escenas.js`, `toon-mapas.js`, `toon-motor.js`: motor de los videos en dibujos
  (personajes, objetos, escenarios, mapas y plantillas como gráficos, tablas, cadenas y comparaciones).
  Cada video es una lista de planos con la narración (`s`) y órdenes de animación ancladas a sus palabras.
  `toon-escenas.js` tiene los escenarios con más detalle (calle colonial, Plaza de Armas, cabildo, puerto,
  hacienda, palacio, parlamento…). Un plano puede pedir bandera con `flag: 'cl'`; sin eso no se dibuja ninguna.
- `video.js`: reproductor de video.
- `audio/`: narración de cada video (`<id>.webm`) y sus tiempos por palabra (`<id>.js`).
- `android/`: envoltorio nativo y `build.sh`, que arma y firma el APK sin Android Studio.
- `tools/`: utilidades.
  - `node tools/check.js`: revisa el contenido (preguntas, videos, anclas de animación).
  - `node tools/sync.js`: actualiza la lista de archivos de datos en `index.html` y `sw.js`.
  - `node tools/guion.js`: exporta el guion hablado de los videos.
  - `tools/voz.py`: graba la narración con una voz neuronal local; `tools/habla.py` normaliza el texto
    (números, siglas y pronunciación). Historia usa el perfil «relato» (voz masculina Marco, velocidad natural
    y una pausa por cada coma, dos puntos, punto y signo): `PAES_PERFIL=relato PAES_VOZ=5 venv/bin/python tools/voz.py --solo h1-1`.
    Con `PAES_PERFIL=eleven` la voz la pone la API de ElevenLabs (`PAES_EL_VOZ`, `PAES_EL_MODELO`; la clave va
    en la cabecera `xi-api-key`, que inyecta el proxy de la sesión).
  - `tools/voz-mp3.py`: usa una narración hecha afuera, por ejemplo en la web de ElevenLabs.
    `--texto h2-1` da el texto para pegar en la web (en partes de hasta 2400 caracteres); después
    `venv/bin/python tools/voz-mp3.py h2-1 parte1.mp3 parte2.mp3` reconoce cada palabra de la grabación,
    la ubica en el guion y escribe `audio/h2-1.webm` y `.js` (escenas, subtítulos, boca y la pausa para
    pensar antes de cada respuesta). Avisa las frases que no se oyeron bien.
  - `tools/pruebas-oficiales.py`: convierte una PAES oficial del DEMRE (el PDF de la prueba y su clavijero) en
    el archivo que importa la app en **Practicar → Pruebas oficiales DEMRE** (aparece en Historia): las preguntas
    reales en su orden, con sus alternativas, la clave, las que no cuentan, el eje y la tabla oficial de puntaje;
    tablas, gráficos e imágenes van recortados del folleto. Las pruebas son del DEMRE (derechos reservados): el
    archivo no se sube a este repositorio ni va dentro del APK; se importa en el teléfono y queda guardado ahí.
    Se rinden como la prueba real (con tiempo y puntaje según la tabla oficial) o en práctica (corrección al tiro),
    se pueden pausar y repetir solo los errores. `tools/pruebas-oficiales-correcciones.json` guarda las letras que
    algún PDF trae dañadas, revisadas a mano.
  - `python3 tools/prompts-historia.py`: escribe en `prompts-historia/` un prompt por video de Historia para
    rehacerlo con Remotion y la voz de Fernando Martínez (ElevenLabs), más la guía común (`GUIA.md`) y el
    índice. Se arma desde los guiones de `data/toon-h*.js`.

## Probar y compilar

```sh
python3 -m http.server 8765        # y abrir http://localhost:8765
node tools/check.js                # revisar el contenido
cd android && VERSION_CODE=8 VERSION_NAME=1.5 ./build.sh   # crea build/PAES.apk
```
