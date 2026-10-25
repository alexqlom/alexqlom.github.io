package io.github.alexqlom.paes;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;

/**
 * PAES: muestra la app web empaquetada en assets/www (funciona sin conexión) y le entrega voz del sistema
 * (con aviso de fin de cada frase para sincronizar los videos), vibración, compartir, selector de archivos
 * y pantalla siempre encendida durante los videos, a través de window.PaesNative.
 */
public class MainActivity extends Activity {
    private static final String HOME = "file:///android_asset/www/index.html";
    private static final int PICK_FILE = 7;

    private WebView web;
    private TextToSpeech tts;
    private volatile boolean ttsReady;
    private String wantVoice = "";
    private ValueCallback<Uri[]> pendingFile;
    private final Handler ui = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle saved) {
        super.onCreate(saved);
        Window w = getWindow();
        w.setStatusBarColor(Color.BLACK);
        w.setNavigationBarColor(Color.BLACK);

        web = new WebView(this);
        web.setBackgroundColor(Color.BLACK);
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
        web.setLongClickable(false);
        web.setHapticFeedbackEnabled(false);
        web.addJavascriptInterface(new Bridge(), "PaesNative");

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
        web.loadUrl(HOME);

        SharedPreferences p = getSharedPreferences("paes", MODE_PRIVATE);
        wantVoice = p.getString("voice", "");
        tts = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if (status != TextToSpeech.SUCCESS) return;
                tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                    @Override
                    public void onStart(String id) { }

                    @Override
                    public void onDone(String id) { spoke(id); }

                    @Override
                    public void onError(String id) { spoke(id); }

                    @Override
                    public void onError(String id, int code) { spoke(id); }
                });
                ttsReady = true;
                applyVoice();
            }
        });
    }

    // ---------- Voz ----------

    /** Puntaje de una voz: español instalado, mejor calidad y acento latinoamericano primero. */
    private static int score(Voice v) {
        Locale l = v.getLocale();
        if (l == null || !"es".equals(l.getLanguage())) return -1;
        Set<String> f = v.getFeatures();
        if (f != null && f.contains(TextToSpeech.Engine.KEY_FEATURE_NOT_INSTALLED)) return -1;
        int s = v.getQuality() / 10;
        String c = l.getCountry();
        if ("CL".equals(c)) s += 14;
        else if ("US".equals(c) || "MX".equals(c) || "419".equals(c) || "AR".equals(c) || "CO".equals(c) || "PE".equals(c)) s += 9;
        else if ("ES".equals(c)) s += 3;
        if (v.isNetworkConnectionRequired()) s -= 4;
        return s;
    }

    private List<Voice> spanishVoices() {
        List<Voice> out = new ArrayList<Voice>();
        if (tts == null || !ttsReady) return out;
        Set<Voice> all = null;
        try {
            all = tts.getVoices();
        } catch (Exception e) {
            // algunos motores fallan al listar
        }
        if (all == null) return out;
        for (Voice v : all) if (score(v) >= 0) out.add(v);
        Collections.sort(out, new Comparator<Voice>() {
            @Override
            public int compare(Voice a, Voice b) {
                int d = score(b) - score(a);
                return d != 0 ? d : a.getName().compareTo(b.getName());
            }
        });
        return out;
    }

    /** Usa la voz elegida por la persona; si no hay, la mejor voz en español del teléfono. */
    private void applyVoice() {
        if (tts == null || !ttsReady) return;
        List<Voice> list = spanishVoices();
        Voice pick = null;
        for (Voice v : list) if (v.getName().equals(wantVoice)) pick = v;
        if (pick == null && !list.isEmpty()) pick = list.get(0);
        if (pick != null) {
            tts.setVoice(pick);
        } else {
            int r = tts.setLanguage(new Locale("es", "CL"));
            if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) r = tts.setLanguage(new Locale("es", "US"));
            if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) tts.setLanguage(new Locale("es"));
        }
    }

    /** Avisa a la página que terminó una frase, para que el video pase a la siguiente. */
    private void spoke(String id) {
        if (id == null || !id.matches("[A-Za-z0-9_-]{1,40}")) return;
        final String js = "window.RB&&RB.ttsDone&&RB.ttsDone('" + id + "')";
        ui.post(new Runnable() {
            @Override
            public void run() {
                if (web != null) web.evaluateJavascript(js, null);
            }
        });
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
        web.evaluateJavascript("window.PaesBack ? PaesBack() : 'exit'", new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String value) {
                if (value == null || !value.contains("handled")) MainActivity.super.onBackPressed();
            }
        });
    }

    @Override
    protected void onPause() {
        if (web != null) web.evaluateJavascript("window.PaesPause&&PaesPause()", null);
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

    /** Lo que la página llama como window.PaesNative. */
    private class Bridge {
        /** Dice una frase. Devuelve false si la voz aún no está lista (la página sigue con su reloj). */
        @JavascriptInterface
        public boolean speak(String text, String id, float rate) {
            if (tts == null || !ttsReady || text == null) return false;
            tts.setSpeechRate(Math.max(.5f, Math.min(rate, 2f)));
            int r = tts.speak(text, TextToSpeech.QUEUE_FLUSH, new Bundle(), id);
            return r == TextToSpeech.SUCCESS;
        }

        @JavascriptInterface
        public void stop() {
            if (tts != null) tts.stop();
        }

        @JavascriptInterface
        public boolean ttsReady() {
            return ttsReady;
        }

        /** Voces en español del teléfono, de mejor a peor, como JSON. */
        @JavascriptInterface
        public String voices() {
            JSONArray arr = new JSONArray();
            try {
                for (Voice v : spanishVoices()) {
                    JSONObject o = new JSONObject();
                    o.put("n", v.getName());
                    o.put("l", v.getLocale().toLanguageTag());
                    o.put("q", score(v));
                    o.put("net", v.isNetworkConnectionRequired());
                    arr.put(o);
                }
            } catch (Exception e) {
                // lista parcial
            }
            return arr.toString();
        }

        @JavascriptInterface
        public void setVoice(String name) {
            wantVoice = name == null ? "" : name;
            getSharedPreferences("paes", MODE_PRIVATE).edit().putString("voice", wantVoice).apply();
            applyVoice();
        }

        @JavascriptInterface
        public String voiceName() {
            try {
                Voice v = tts != null && ttsReady ? tts.getVoice() : null;
                return v != null ? v.getName() : "";
            } catch (Exception e) {
                return "";
            }
        }

        /** Abre los ajustes de texto a voz del teléfono (para instalar o descargar voces mejores). */
        @JavascriptInterface
        public void ttsSettings() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        startActivity(new Intent("com.android.settings.TTS_SETTINGS"));
                    } catch (ActivityNotFoundException e) {
                        // sin ajustes de voz
                    }
                }
            });
        }

        @JavascriptInterface
        public void vibrate(int ms) {
            Vibrator v = (Vibrator) getSystemService(VIBRATOR_SERVICE);
            if (v == null || !v.hasVibrator()) return;
            int d = Math.max(1, Math.min(ms, 1000));
            if (Build.VERSION.SDK_INT >= 26) v.vibrate(VibrationEffect.createOneShot(d, VibrationEffect.DEFAULT_AMPLITUDE));
            else v.vibrate(d);
        }

        /** Mantiene la pantalla encendida mientras corre un video. */
        @JavascriptInterface
        public void keepAwake(final boolean on) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (on) getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                    else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                }
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
