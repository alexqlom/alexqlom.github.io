# PAES para Android

Envoltorio nativo mínimo para instalar la app PAES como APK. Muestra la misma app web de `paes/`,
empaquetada dentro del APK, así que funciona sin conexión. Además le entrega a la página:

- **Voz del narrador** con el motor de texto a voz del teléfono. Elige sola la mejor voz en español
  instalada (prefiere acento latinoamericano y voces de alta calidad) y la persona puede cambiarla en
  *Perfil → Voz del narrador*. Avisa a la página cuando termina cada frase, para que las animaciones
  de los videos avancen al ritmo de la voz.
- **Pantalla encendida** mientras corre un video.
- **Vibración** al responder, **compartir** para exportar el progreso y **selector de archivos** para importarlo.
- **Botón Atrás** manejado por la app: cierra la pantalla abierta (pidiendo confirmación si hay una lección o
  un ensayo en curso), vuelve a Aprender desde las otras pestañas y, desde Aprender, sale.
- **Comportamiento de app**: sin zoom, sin selección de texto, sin menú al mantener presionado, sin rebote,
  orientación vertical y barras del sistema en negro.

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
cd paes && node tools/sync.js && cd android && VERSION_CODE=2 VERSION_NAME=1.1 ./build.sh
```

El resultado queda en `android/build/PAES.apk`. La llave de firma `paes.p12` se guarda en el repositorio a
propósito: es una app personal y, para instalar una versión nueva encima de la anterior sin perder el
progreso, el APK debe firmarse siempre con la misma llave. Sube `VERSION_CODE` en cada versión nueva.

## Instalar en el teléfono

1. Descarga `PAES.apk` en el teléfono.
2. Ábrelo y permite instalar apps de origen desconocido cuando Android lo pida.
3. Para una voz más natural, instala o actualiza **Servicios de voz de Google** y descarga la voz en español
   desde *Ajustes → Texto a voz*. Luego elígela en *Perfil → Voz del narrador*.
