# PAES para Android

Envoltorio nativo mínimo para instalar la app PAES como APK. Muestra la misma app web de `paes/`,
empaquetada dentro del APK, así que funciona sin conexión. Además le entrega a la página:

- **Videos con narradora**: el audio de cada video (`paes/audio/*.webm`, Opus) va dentro del APK sin
  comprimir, para poder adelantar y retroceder al instante. La página lo lee como archivo
  (`setAllowFileAccessFromFileURLs`) y la animación sigue al tiempo del audio.
- **Voz del teléfono** para leer las preguntas en voz alta (y como respaldo si faltara el audio de un video).
  Elige sola la mejor voz en español instalada; se cambia en *Perfil → Voz para leer las preguntas*.
- **Pantalla encendida** mientras corre un video y **botones de volumen** que controlan el sonido de los videos.
- **Recordatorio diario** opcional (*Perfil → Recordatorio diario*): a la hora elegida avisa si el plan de hoy
  no está completo. En Android 13 o superior pide permiso de notificaciones al activarlo.
- **Vibración** al responder, **compartir** para exportar el progreso y **selector de archivos** para importarlo.
- **Botón Atrás de app**: cierra la pantalla abierta (pidiendo confirmación si hay una lección o un ensayo en
  curso), retrocede un paso en la encuesta, vuelve a Aprender desde las otras pestañas y, en Aprender, pide
  tocar Atrás otra vez; entonces la app pasa a segundo plano (como cualquier app) y al volver sigue donde estaba.
- **Comportamiento de app**: pantalla de arranque con el ícono, sin zoom, sin selección de texto, sin menú al
  mantener presionado, sin rebote, orientación vertical y barras del sistema en negro.

Paquete `io.github.alexqlom.paes`, Android 7.0 o superior (API 24), objetivo API 34.

## Construir el APK

`build.sh` lo construye sin Gradle ni Android Studio. Solo necesita JDK 17 o superior, Python 3 y acceso a
Maven Central, desde donde descarga las herramientas la primera vez (quedan en `android/.sdk/`):

| Herramienta | Artefacto de Maven Central |
| --- | --- |
| `aapt2` y recursos del sistema | `org.apktool:apktool-lib` (carpeta `prebuilt/`) |
| Clases de Android para compilar | `org.robolectric:android-all` (API 34) |
| Conversión a `classes.dex` | `com.jakewharton.android.repackaged:dalvik-dx` |
| Firma v2 | `com.android.tools.build:apksig` |

```bash
cd paes && node tools/sync.js && node tools/check.js && cd android && VERSION_CODE=3 VERSION_NAME=1.1 ./build.sh
```

El resultado queda en `android/build/PAES.apk`. La llave de firma `paes.p12` se guarda en el repositorio a
propósito: es una app personal y, para instalar una versión nueva encima de la anterior sin perder el
progreso, el APK debe firmarse siempre con la misma llave. Sube `VERSION_CODE` en cada versión nueva.

## Narración de los videos

La graba `tools/voz.py` en este computador, sin internet ni servicios externos:

- Voz: **Supertonic 3** (voz femenina F3, español con seseo) mediante `sherpa-onnx`.
- Control de calidad: cada frase se escucha de vuelta con **Parakeet TDT 0.6B v3** (reconocimiento de voz);
  si no se entiende lo que debía decir, se vuelve a grabar. Los tiempos de cada palabra salen de ahí y se
  usan para los subtítulos y la boca de la mascota.
- `tools/habla.py` y `tools/habla_fijo.py` pasan números, unidades, siglas, fórmulas y nombres extranjeros a
  español hablado; `tools/guion.js` exporta lo que dice la narradora en cada video.

```bash
python3 -m venv venv && venv/bin/pip install sherpa-onnx soundfile librosa numpy
# Modelos (releases de k2-fsa/sherpa-onnx en GitHub) en la carpeta de PAES_MODELOS:
#   tts-models/sherpa-onnx-supertonic-3-tts-int8-2026-05-11.tar.bz2
#   asr-models/sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8.tar.bz2
PAES_MODELOS=/ruta/modelos venv/bin/python tools/voz.py          # todos los videos (hay caché por frase)
venv/bin/python tools/voz.py --solo v-h1,v-m1a                  # solo algunos
python3 tools/musica.py                                          # música de fondo (audio/musica.js)
```

Si cambia el texto de un video, `tools/check.js` avisa que su narración quedó desactualizada.

## Instalar en el teléfono

1. Descarga `PAES.apk` en el teléfono.
2. Ábrelo y permite instalar apps de origen desconocido cuando Android lo pida.
3. Si ya tenías la app, la versión nueva se instala encima y conserva todo tu progreso.
