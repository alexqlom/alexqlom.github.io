#!/usr/bin/env bash
# Construye Ruta.apk sin Gradle: copia la app web a assets/www, compila recursos y código, y firma el APK.
# Requiere JDK 17 o superior y, en la carpeta $SDK:
#   android.jar (plataforma 34), aapt2, r8.jar (trae d8) y uber-apk-signer.jar (alinea y firma).
# Uso: SDK=/ruta/a/herramientas ./build.sh   → deja build/Ruta.apk
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
WEB="$(dirname "$HERE")"
SDK="${SDK:?Define SDK con la carpeta de las herramientas}"
OUT="${OUT:-$HERE/build}"
AAPT2="${AAPT2:-$SDK/aapt2}"
JAR="$SDK/android.jar"
VERSION_CODE="${VERSION_CODE:-1}"
VERSION_NAME="${VERSION_NAME:-1.0}"

rm -rf "$OUT"
mkdir -p "$OUT/res/mipmap-xxxhdpi" "$OUT/assets/www" "$OUT/classes" "$OUT/dex"
cp -R "$HERE/res/." "$OUT/res/"
cp "$WEB/icons/icon-192.png" "$OUT/res/mipmap-xxxhdpi/ic_launcher.png"

# App web completa, sin la carpeta android ni el service worker (no se usa dentro del APK).
for f in index.html app.css app.js signs.js scenes.js manifest.webmanifest; do cp "$WEB/$f" "$OUT/assets/www/"; done
cp -R "$WEB/data" "$WEB/icons" "$WEB/sim" "$OUT/assets/www/"

"$AAPT2" compile --dir "$OUT/res" -o "$OUT/res.zip"
"$AAPT2" link -o "$OUT/base.apk" -I "$JAR" --manifest "$HERE/AndroidManifest.xml" -A "$OUT/assets" \
  --min-sdk-version 24 --target-sdk-version 34 --version-code "$VERSION_CODE" --version-name "$VERSION_NAME" "$OUT/res.zip"

javac -proc:none -source 8 -target 8 -Xlint:-options -bootclasspath "$JAR" -d "$OUT/classes" $(find "$HERE/src" -name '*.java')
java -cp "$SDK/r8.jar" com.android.tools.r8.D8 --release --min-api 24 --lib "$JAR" --output "$OUT/dex" $(find "$OUT/classes" -name '*.class')

cp "$OUT/base.apk" "$OUT/unsigned.apk"
(cd "$OUT/dex" && zip -q "$OUT/unsigned.apk" classes.dex)

# Firma con una llave propia. Guárdala: para instalar actualizaciones encima se necesita la misma llave.
KS="${KS:-$HERE/ruta.keystore}"
KS_PASS="${KS_PASS:-cambiar-esta-clave}"
if [ ! -f "$KS" ]; then
  keytool -genkeypair -keystore "$KS" -storepass "$KS_PASS" -keypass "$KS_PASS" -alias ruta \
    -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Ruta"
fi
java -jar "$SDK/uber-apk-signer.jar" --apks "$OUT/unsigned.apk" --ks "$KS" --ksAlias ruta \
  --ksPass "$KS_PASS" --ksKeyPass "$KS_PASS" --out "$OUT/signed"
mv "$OUT/signed/"*.apk "$OUT/Ruta.apk"
echo "Listo: $OUT/Ruta.apk"
