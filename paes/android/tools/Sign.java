import com.android.apksig.ApkSigner;

import java.io.File;
import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;
import java.util.Collections;

/** Firma un APK con el esquema v2 (Android 7.0 o superior, igual que minSdk 24) usando apksig. Uso: Sign entrada.apk salida.apk llave.p12 clave alias */
public class Sign {
    public static void main(String[] a) throws Exception {
        KeyStore ks = KeyStore.getInstance("PKCS12");
        try (FileInputStream in = new FileInputStream(a[2])) {
            ks.load(in, a[3].toCharArray());
        }
        PrivateKey key = (PrivateKey) ks.getKey(a[4], a[3].toCharArray());
        X509Certificate cert = (X509Certificate) ks.getCertificate(a[4]);
        ApkSigner.SignerConfig cfg = new ApkSigner.SignerConfig.Builder("PAES", key, Collections.singletonList(cert)).build();
        new ApkSigner.Builder(Collections.singletonList(cfg))
            .setInputApk(new File(a[0]))
            .setOutputApk(new File(a[1]))
            .setMinSdkVersion(24)
            .setV1SigningEnabled(false)
            .setV2SigningEnabled(true)
            .build()
            .sign();
    }
}
