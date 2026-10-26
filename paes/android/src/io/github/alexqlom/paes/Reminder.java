package io.github.alexqlom.paes;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * Recordatorio diario del plan de estudio. Se programa a la hora elegida y, al sonar, avisa solo si el plan de
 * ese día no está completo; luego se vuelve a programar para el día siguiente (también después de reiniciar).
 */
public class Reminder extends BroadcastReceiver {
    static final String PREFS = "paes";
    private static final String CHANNEL = "plan";

    static SharedPreferences prefs(Context c) {
        return c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    static String today() {
        return new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(new Date());
    }

    /** Programa (o cancela) el próximo aviso según lo guardado. */
    static void schedule(Context c) {
        SharedPreferences p = prefs(c);
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        PendingIntent pi = PendingIntent.getBroadcast(c, 1, new Intent(c, Reminder.class),
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        am.cancel(pi);
        if (!p.getBoolean("remind", false)) return;
        Calendar at = Calendar.getInstance();
        at.set(Calendar.HOUR_OF_DAY, p.getInt("rh", 19));
        at.set(Calendar.MINUTE, p.getInt("rm", 0));
        at.set(Calendar.SECOND, 0);
        at.set(Calendar.MILLISECOND, 0);
        if (at.getTimeInMillis() <= System.currentTimeMillis() + 30000) at.add(Calendar.DAY_OF_YEAR, 1);
        am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at.getTimeInMillis(), pi);
    }

    @Override
    public void onReceive(Context c, Intent intent) {
        String action = intent.getAction();
        if (Intent.ACTION_BOOT_COMPLETED.equals(action) || Intent.ACTION_MY_PACKAGE_REPLACED.equals(action)) {
            schedule(c);
            return;
        }
        SharedPreferences p = prefs(c);
        if (p.getBoolean("remind", false) && !today().equals(p.getString("doneDay", "")) && isStudyDay(p)) notify(c, p);
        schedule(c);
    }

    /** Días de estudio del plan, como "1,2,3,4,5,6" (domingo = 0). Sin plan, todos los días. */
    private static boolean isStudyDay(SharedPreferences p) {
        String days = p.getString("days", "");
        if (days.isEmpty()) return true;
        int wd = Calendar.getInstance().get(Calendar.DAY_OF_WEEK) - 1;
        for (String d : days.split(",")) if (d.trim().equals(String.valueOf(wd))) return true;
        return false;
    }

    private static void notify(Context c, SharedPreferences p) {
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel ch = new NotificationChannel(CHANNEL, "Plan de estudio", NotificationManager.IMPORTANCE_DEFAULT);
            ch.setDescription("Recordatorio diario para estudiar");
            nm.createNotificationChannel(ch);
        }
        Intent open = new Intent(c, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pi = PendingIntent.getActivity(c, 2, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(c, CHANNEL) : new Notification.Builder(c);
        // El proyecto no genera la clase R: el ícono se busca por nombre.
        int icon = c.getResources().getIdentifier("ic_stat", "drawable", c.getPackageName());
        b.setSmallIcon(icon != 0 ? icon : android.R.drawable.ic_popup_reminder)
            .setColor(0xFFC6FF00)
            .setContentTitle(p.getString("rtitle", "¡Hora de estudiar!"))
            .setContentText(p.getString("rtext", "Tu plan de hoy te espera."))
            .setAutoCancel(true)
            .setContentIntent(pi);
        try {
            nm.notify(1, b.build());
        } catch (SecurityException e) {
            // sin permiso de notificaciones
        }
    }
}
