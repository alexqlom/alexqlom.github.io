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
| Ciencias: Física, Química y Biología | `data/fis-*.js`, `data/qui-*.js`, `data/bio-*.js` | `data/toon-f*.js` (en curso) |

## Estructura

- `index.html`, `app.js`, `app.css`: la app (rutas, lecciones, encuesta inicial, plan de estudio).
- `data/`: el contenido. `tests.js` define las pruebas; cada archivo agrega unidades, lecciones y preguntas.
- `toon.js`, `toon-arte.js`, `toon-mapas.js`, `toon-motor.js`: motor de los videos en dibujos
  (personajes, objetos, escenarios, mapas y plantillas como gráficos, tablas, cadenas y comparaciones).
  Cada video es una lista de planos con la narración (`s`) y órdenes de animación ancladas a sus palabras.
- `video.js`: reproductor de video.
- `audio/`: narración de cada video (`<id>.webm`) y sus tiempos por palabra (`<id>.js`).
- `android/`: envoltorio nativo y `build.sh`, que arma y firma el APK sin Android Studio.
- `tools/`: utilidades.
  - `node tools/check.js`: revisa el contenido (preguntas, videos, anclas de animación).
  - `node tools/sync.js`: actualiza la lista de archivos de datos en `index.html` y `sw.js`.
  - `node tools/guion.js`: exporta el guion hablado de los videos.
  - `tools/voz.py`: graba la narración con una voz neuronal local; `tools/habla.py` normaliza el texto
    (números, siglas y pronunciación).

## Probar y compilar

```sh
python3 -m http.server 8765        # y abrir http://localhost:8765
node tools/check.js                # revisar el contenido
cd android && VERSION_CODE=5 VERSION_NAME=1.3 ./build.sh   # crea build/PAES.apk
```
