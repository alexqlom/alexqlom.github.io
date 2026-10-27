package io.github.alexqlom.ruta;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.view.Window;
import android.view.WindowInsetsController;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.Locale;

/**
 * Ruta: muestra la app web empaquetada en assets/www (funciona sin conexión) y le entrega
 * voz, vibración, compartir, selector de archivos y colores de sistema a través de window.RutaNative.
 */
public class MainActivity extends Activity {
    private static final String HOME = "file:///android_asset/www/index.html";
    private static final int PICK_FILE = 7;

    private WebView web;
    private TextToSpeech tts;
    private volatile boolean ttsReady;
    private ValueCallback<Uri[]> pendingFile;

    @Override
    protected void onCreate(Bundle saved) {
        super.onCreate(saved);

        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        // Como app: sin zoom, sin rebote al llegar al borde y sin barras de desplazamiento.
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        int zoom = Math.round(getResources().getConfiguration().fontScale * 100);
        s.setTextZoom(Math.max(100, Math.min(zoom, 115)));
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        web.setVerticalScrollBarEnabled(false);
        web.setHorizontalScrollBarEnabled(false);
        web.addJavascriptInterface(new Bridge(), "RutaNative");

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
                Uri url = req.getUrl();
                if ("file".equals(url.getScheme())) return false;
                // Los enlaces externos se abren en el navegador.
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, url));
                } catch (ActivityNotFoundException e) {
                    // sin navegador: se ignora
                }
                return true;
            }
        });

        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (pendingFile != null) pendingFile.onReceiveValue(null);
                pendingFile = callback;
                Intent pick = new Intent(Intent.ACTION_GET_CONTENT);
                pick.addCategory(Intent.CATEGORY_OPENABLE);
                pick.setType("*/*");
                try {
                    startActivityForResult(Intent.createChooser(pick, "Importar progreso"), PICK_FILE);
                    return true;
                } catch (ActivityNotFoundException e) {
                    pendingFile = null;
                    return false;
                }
            }

            // Respaldo: si la página usa un aviso del navegador, se muestra sin la dirección de la página.
            @Override
            public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
                new AlertDialog.Builder(MainActivity.this)
                    .setMessage(message)
                    .setPositiveButton("Aceptar", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface d, int which) { result.confirm(); }
                    })
                    .setOnCancelListener(new DialogInterface.OnCancelListener() {
                        @Override
                        public void onCancel(DialogInterface d) { result.cancel(); }
                    })
                    .show();
                return true;
            }

            @Override
            public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) {
                new AlertDialog.Builder(MainActivity.this)
                    .setMessage(message)
                    .setPositiveButton("Aceptar", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface d, int which) { result.confirm(); }
                    })
                    .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface d, int which) { result.cancel(); }
                    })
                    .setOnCancelListener(new DialogInterface.OnCancelListener() {
                        @Override
                        public void onCancel(DialogInterface d) { result.cancel(); }
                    })
                    .show();
                return true;
            }
        });

        setContentView(web);
        applyBars(false);
        web.loadUrl(HOME);

        tts = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if (status != TextToSpeech.SUCCESS) return;
                int r = tts.setLanguage(new Locale("es", "CL"));
                if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) tts.setLanguage(new Locale("es"));
                ttsReady = true;
            }
        });
    }

    /** Pinta la barra de estado y la de navegación del color del tema de la app. */
    private void applyBars(boolean light) {
        Window w = getWindow();
        int bg = light ? Color.WHITE : Color.BLACK;
        w.setStatusBarColor(bg);
        w.setNavigationBarColor(bg);
        if (web != null) web.setBackgroundColor(bg);
        if (Build.VERSION.SDK_INT >= 30) {
            WindowInsetsController c = w.getInsetsController();
            int both = WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS | WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS;
            if (c != null) c.setSystemBarsAppearance(light ? both : 0, both);
        } else {
            View decor = w.getDecorView();
            int f = decor.getSystemUiVisibility();
            f = light ? f | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR : f & ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            if (Build.VERSION.SDK_INT >= 26) f = light ? f | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR : f & ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            decor.setSystemUiVisibility(f);
        }
    }

    @Override
    protected void onActivityResult(int request, int result, Intent data) {
        if (request == PICK_FILE && pendingFile != null) {
            Uri[] picked = null;
            if (result == RESULT_OK && data != null && data.getData() != null) picked = new Uri[]{data.getData()};
            pendingFile.onReceiveValue(picked);
            pendingFile = null;
            return;
        }
        super.onActivityResult(request, result, data);
    }

    // El botón Atrás lo decide la app: cierra la pantalla abierta, vuelve a Aprender o sale.
    @Override
    public void onBackPressed() {
        if (web == null) {
            super.onBackPressed();
            return;
        }
        web.evaluateJavascript("window.RutaBack ? RutaBack() : 'exit'", new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String value) {
                if (value == null || !value.contains("handled")) MainActivity.super.onBackPressed();
            }
        });
    }

    @Override
    protected void onPause() {
        if (tts != null) tts.stop();
        if (web != null) web.onPause();
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null) web.onResume();
    }

    @Override
    protected void onDestroy() {
        if (tts != null) tts.shutdown();
        if (web != null) web.destroy();
        super.onDestroy();
    }

    /** Lo que la página llama como window.RutaNative. */
    private class Bridge {
        @JavascriptInterface
        public void speak(String text) {
            if (tts != null && ttsReady && text != null) tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "ruta");
        }

        @JavascriptInterface
        public void stop() {
            if (tts != null) tts.stop();
        }

        @JavascriptInterface
        public boolean ttsReady() {
            return ttsReady;
        }

        @JavascriptInterface
        public void vibrate(int ms) {
            Vibrator v = (Vibrator) getSystemService(VIBRATOR_SERVICE);
            if (v == null || !v.hasVibrator()) return;
            int d = Math.max(1, Math.min(ms, 1000));
            if (Build.VERSION.SDK_INT >= 26) v.vibrate(VibrationEffect.createOneShot(d, VibrationEffect.DEFAULT_AMPLITUDE));
            else v.vibrate(d);
        }

        @JavascriptInterface
        public void theme(final String mode) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() { applyBars("light".equals(mode)); }
            });
        }

        @JavascriptInterface
        public void share(final String name, final String json) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Intent send = new Intent(Intent.ACTION_SEND);
                    send.setType("text/plain");
                    send.putExtra(Intent.EXTRA_SUBJECT, name);
                    send.putExtra(Intent.EXTRA_TEXT, json);
                    try {
                        startActivity(Intent.createChooser(send, "Guardar progreso"));
                    } catch (ActivityNotFoundException e) {
                        // sin apps para compartir
                    }
                }
            });
        }
    }
}
