#!/usr/bin/env bash
# Construye PAES.apk sin Gradle ni Android Studio: copia la app web a assets/www, compila recursos y código,
# convierte a formato Android y firma el APK. Todas las herramientas vienen de Maven Central:
#   aapt2 y android-framework.jar  → dentro de org.apktool:apktool-lib (carpeta prebuilt/)
#   android-all.jar (API 34)       → org.robolectric:android-all, para compilar el código Java
#   dalvik-dx.jar                  → com.jakewharton.android.repackaged:dalvik-dx, convierte a classes.dex
#   apksig.jar                     → com.android.tools.build:apksig, firma v2
# Uso: SDK=/carpeta/con/herramientas ./build.sh   (o ./build.sh --descargar para bajarlas a $SDK)
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
WEB="$(dirname "$HERE")"
SDK="${SDK:-$HERE/.sdk}"
OUT="${OUT:-$HERE/build}"
VERSION_CODE="${VERSION_CODE:-1}"
VERSION_NAME="${VERSION_NAME:-1.0}"
M=https://repo1.maven.org/maven2

if [ "${1:-}" = "--descargar" ] || [ ! -f "$SDK/aapt2" ]; then
  mkdir -p "$SDK"
  get() { [ -f "$SDK/$2" ] || { curl -fsSL -o "$SDK/$2" "$M/$1"; sleep 2; }; }
  get org/apktool/apktool-lib/3.0.3/apktool-lib-3.0.3.jar apktool-lib.jar
  get org/robolectric/android-all/14-robolectric-10818077/android-all-14-robolectric-10818077.jar android-all.jar
  get com/jakewharton/android/repackaged/dalvik-dx/16.0.1/dalvik-dx-16.0.1.jar dalvik-dx.jar
  get com/android/tools/build/apksig/2.3.0/apksig-2.3.0.jar apksig.jar
  (cd "$SDK" && unzip -o -q -j apktool-lib.jar prebuilt/linux/aapt2 prebuilt/android-framework.jar && chmod +x aapt2)
fi

rm -rf "$OUT"
mkdir -p "$OUT/res/mipmap-xxxhdpi" "$OUT/assets/www" "$OUT/classes" "$OUT/dex" "$OUT/signer"
cp -R "$HERE/res/." "$OUT/res/"
cp "$WEB/icons/icon-192.png" "$OUT/res/mipmap-xxxhdpi/ic_launcher.png"

# App web completa, sin herramientas, sin la carpeta android ni el service worker (no se usa dentro del APK).
for f in index.html app.css manifest.webmanifest; do cp "$WEB/$f" "$OUT/assets/www/"; done
cp "$WEB"/*.js "$OUT/assets/www/" && rm -f "$OUT/assets/www/sw.js"
cp -R "$WEB/data" "$WEB/icons" "$OUT/assets/www/"
# Narración de los videos (Opus) y sus tiempos; el audio va sin comprimir en el APK para leerlo y saltar rápido.
mkdir -p "$OUT/assets/www/audio"
cp "$WEB"/audio/*.webm "$WEB"/audio/*.js "$OUT/assets/www/audio/"

"$SDK/aapt2" compile --dir "$OUT/res" -o "$OUT/res.zip"
"$SDK/aapt2" link -o "$OUT/base.apk" -I "$SDK/android-framework.jar" --manifest "$HERE/AndroidManifest.xml" -A "$OUT/assets" \
  --min-sdk-version 24 --target-sdk-version 34 --version-code "$VERSION_CODE" --version-name "$VERSION_NAME" -0 webm "$OUT/res.zip"

javac -nowarn -proc:none --release 8 -cp "$SDK/android-all.jar" -d "$OUT/classes" $(find "$HERE/src" -name '*.java')
java -cp "$SDK/dalvik-dx.jar" com.android.dx.command.Main --dex --min-sdk-version=24 --output="$OUT/dex/classes.dex" "$OUT/classes"

cp "$OUT/base.apk" "$OUT/joined.apk"
(cd "$OUT/dex" && zip -q "$OUT/joined.apk" classes.dex)
python3 "$HERE/tools/zipalign.py" "$OUT/joined.apk" "$OUT/unsigned.apk"

# Firma. La llave se guarda junto al proyecto: para instalar una versión nueva encima de la anterior
# (sin perder el progreso) el APK debe firmarse siempre con la misma llave.
KS="${KS:-$HERE/paes.p12}"
KS_PASS="${KS_PASS:-paes-personal}"
if [ ! -f "$KS" ]; then
  keytool -genkeypair -storetype PKCS12 -keystore "$KS" -storepass "$KS_PASS" -keypass "$KS_PASS" -alias paes \
    -keyalg RSA -keysize 2048 -validity 12000 -dname "CN=PAES personal"
fi
javac -nowarn -cp "$SDK/apksig.jar" -d "$OUT/signer" "$HERE/tools/Sign.java"
# apksig 2.3.0 usa clases internas de Java al preparar la firma.
OPENS="--add-exports=java.base/sun.security.x509=ALL-UNNAMED --add-exports=java.base/sun.security.pkcs=ALL-UNNAMED --add-exports=java.base/sun.security.util=ALL-UNNAMED"
java $OPENS -cp "$SDK/apksig.jar:$OUT/signer" Sign "$OUT/unsigned.apk" "$OUT/PAES.apk" "$KS" "$KS_PASS" paes
echo "Listo: $OUT/PAES.apk ($(du -h "$OUT/PAES.apk" | cut -f1))"
