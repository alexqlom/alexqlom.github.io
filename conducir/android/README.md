# Ruta para Android

Envoltorio nativo mínimo para instalar Ruta como app (APK). Muestra la misma app web de `conducir/`,
empaquetada dentro del APK, así que funciona sin conexión. Además le entrega a la página:

- **Voz** con el motor de texto a voz del teléfono (español de Chile si está disponible).
- **Vibración** al responder.
- **Compartir** para exportar el progreso.
- **Selector de archivos** para importar el progreso.
- **Botón Atrás** manejado por la app: cierra la pantalla abierta (pidiendo confirmación si hay una lección en curso), vuelve a Aprender desde las otras pestañas y, desde Aprender, sale.
- **Comportamiento de app**: sin zoom, sin selección de texto, sin rebote de página, orientación vertical y barras del sistema del color del tema.

Paquete `io.github.alexqlom.ruta`, Android 7.0 o superior (API 24), objetivo API 34.

## Construir el APK

Se construye sin Gradle con `build.sh`. Necesitas JDK 17 o superior y una carpeta con estas herramientas
del SDK de Android:

| Archivo | Para qué sirve |
| --- | --- |
| `android.jar` | API de Android 34 para compilar |
| `aapt2` | Compila el manifiesto y los recursos |
| `r8.jar` | Trae `d8`, que convierte el código a formato Android |
| `uber-apk-signer.jar` | Alinea y firma el APK |

```bash
SDK=/ruta/a/herramientas ./build.sh
```

El resultado queda en `build/Ruta.apk`. La primera vez se crea una llave de firma `ruta.keystore`
(no se sube al repositorio). Guárdala bien: para instalar una versión nueva encima de la anterior,
el APK debe firmarse con la misma llave. Usa `KS_PASS` para elegir la clave de la llave y
`VERSION_CODE` y `VERSION_NAME` para numerar cada versión nueva.

## Instalar en el teléfono

1. Copia `Ruta.apk` al teléfono o descárgalo desde donde lo publiques.
2. Ábrelo y permite instalar apps de origen desconocido cuando Android lo pida.
3. El progreso se guarda en el teléfono. Para pasarlo a otro dispositivo, usa *Perfil → Exportar progreso*.
