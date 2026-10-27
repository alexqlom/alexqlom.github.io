// Simuladores de auto (licencia B): automático y mecánico. Calle vista desde arriba, pedales, palanca y tablero.
(function () {
  const RB = window.RB, U = RB.simU, Dr = RB.simDraw;
  const { clamp, sstep, kmh, flow } = U;
  const LANE = 1.75, PARK = 4.75, CL = 4.4, CW = 1.8;

  // ---------- Física ----------
  // Mecánico: motor, embrague que patina y caja de 5 marchas. Unidades: rpm, m/s, N y N·m.
  const MAN = { m: 1250, r: 0.3, fd: 4.1, ratio: { 1: 3.6, 2: 2.1, 3: 1.4, 4: 1.0, 5: 0.8, R: -3.4, N: 0 }, Ie: 0.22, Kc: 40, TcMax: 320 };
  const K60 = 30 / Math.PI;
  const engT = (rpm, thr) => thr * (rpm < 1000 ? 95 + Math.max(0, rpm - 800) * 0.27 : rpm < 4500 ? 150 : Math.max(60, 150 - (rpm - 4500) * 0.035)) - (12 + rpm * 0.0035);
  // Mueve el auto con una fuerza de tracción, frenos y pendiente; los frenos sostienen el auto detenido.
  function move(c, m, Fpush, Fb, dt) {
    const roll = 160 + 0.42 * c.v * c.v;
    if (Math.abs(c.v) > 0.05) {
      const nv = c.v + (Fpush - Math.sign(c.v) * (Fb + roll)) / m * dt;
      c.v = Math.sign(nv) !== Math.sign(c.v) && Math.abs(Fpush) <= Fb + roll ? 0 : nv;
    } else if (Math.abs(Fpush) > Fb + roll) c.v += (Fpush - Math.sign(Fpush) * (Fb + roll)) / m * dt;
    else c.v = 0;
    c.s += c.v * dt;
  }
  function stepManual(c, inp, dt) {
    const P = MAN, ratio = P.ratio[c.gear], G = P.fd * ratio;
    let thr = c.on ? inp.gas : 0;
    if (c.on && c.rpm < 900 && thr < 0.3) thr = Math.max(thr, clamp((900 - c.rpm) / 350, 0, 0.3)); // ralentí
    if (c.rpm > 6500) thr = 0; // corte de inyección
    const e = ratio ? sstep(0.3, 0.85, 1 - inp.clu) : 0;
    const wE = c.rpm / K60, wW = c.v * G / P.r;
    const Te = c.on ? engT(c.rpm, thr) : -(8 + c.rpm * 0.004);
    const Tc = e ? clamp(P.Kc * (wE - wW), -e * P.TcMax, e * P.TcMax) : 0;
    c.tc = Tc; c.e = e;
    c.rpm = Math.max(0, wE + (Te - Tc) / P.Ie * dt) * K60;
    if (c.on && c.rpm < 320) { c.on = false; c.stalled = true; }
    move(c, P.m, (ratio ? Tc * G / P.r : 0) - P.m * 9.81 * Math.sin(c.slope), inp.brk * 9500 + (c.pb ? 6000 : 0), dt);
  }
  // Automático: convertidor de par simplificado (el auto avanza solo en D aunque no aceleres).
  function stepAuto(c, inp, dt) {
    const m = 1300, av = Math.abs(c.v);
    let F = 0;
    if (c.on && (c.gear === 'D' || c.gear === 'R')) {
      const dir = c.gear === 'D' ? 1 : -1, vmax = dir > 0 ? 45 : 8;
      F = dir * (inp.gas * 5600 * Math.max(0.12, 1 - av / vmax) + (av < 2.5 ? 700 * (1 - av / 2.5) : 0));
    }
    move(c, m, F - m * 9.81 * Math.sin(c.slope), inp.brk * 10000 + (c.pb ? 4500 : 0) + (c.gear === 'P' ? 1e6 : 0), dt);
    const g = av < 4.5 ? 1 : av < 9 ? 2 : av < 14 ? 3 : av < 19 ? 4 : 5;
    c.ag = g;
    c.rpm = c.on ? 750 + inp.gas * 1700 + (c.gear === 'D' ? (av - [0, 0, 4.5, 9, 14, 19][g]) * 230 : 0) : 0;
  }

  // ---------- Dibujo de la calle ----------
  function sPare(g, x, y, r) {
    g.save(); g.translate(x, y); g.fillStyle = '#c4161c'; g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.beginPath();
    for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    g.closePath(); g.fill(); g.stroke(); Dr.text(g, 'PARE', 0, 0.5, r * 0.62, '#fff'); g.restore();
  }
  function sLimit(g, x, y, r, n) {
    g.fillStyle = '#fff'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
    g.strokeStyle = '#c4161c'; g.lineWidth = r * 0.22; g.beginPath(); g.arc(x, y, r * 0.86, 0, 7); g.stroke();
    g.fillStyle = '#000'; g.font = `800 ${r * 0.9}px system-ui,sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(n, x, y + 1);
  }
  function drawRoad(g, W, H, c, cfg, T) {
    const K = W / 24, ox = W / 2 - 1.4 * K, oy = H * 0.66;
    const X = x => ox + x * K, Y = s => oy - (s - c.s) * K, top = c.s + oy / K + 2, bot = c.s - (H - oy) / K - 2;
    g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#151515'; g.fillRect(X(-6.5), 0, 3 * K, H); g.fillRect(X(6), 0, 3 * K, H);
    for (let s = Math.floor(bot / 16) * 16; s < top; s += 16) {
      g.fillStyle = '#0f0f0f'; g.strokeStyle = '#1d1d1d'; g.lineWidth = 1;
      g.fillRect(X(-14), Y(s + 13), 7 * K, 12 * K); g.strokeRect(X(-14), Y(s + 13), 7 * K, 12 * K);
      g.fillRect(X(9.5), Y(s + 7), 7 * K, 12 * K); g.strokeRect(X(9.5), Y(s + 7), 7 * K, 12 * K);
    }
    g.fillStyle = '#232323'; g.fillRect(X(-3.5), 0, 9.5 * K, H);
    g.fillStyle = '#272727'; g.fillRect(X(3.5), 0, 2.5 * K, H);
    g.fillStyle = '#e6e6e6';
    for (let s = Math.floor(bot / 6) * 6; s < top; s += 6) g.fillRect(X(0) - 1, Y(s + 3), 2, 3 * K);
    g.globalAlpha = 0.5; g.fillRect(X(3.5) - 0.75, 0, 1.5, H); g.fillRect(X(-3.5), 0, 1.5, H); g.fillRect(X(6) - 1.5, 0, 1.5, H); g.globalAlpha = 1;
    // cruces con calle transversal
    (cfg.cross || []).forEach(L => {
      g.fillStyle = '#232323'; g.fillRect(0, Y(L + 10.5), W, 9 * K);
      g.fillStyle = '#e6e6e6'; g.globalAlpha = 0.85;
      for (let x = -3.2; x < 5.8; x += 0.9) g.fillRect(X(x), Y(L + 1.5), 0.45 * K, 1.2 * K);
      for (let x = -3.2; x < 5.8; x += 0.9) g.fillRect(X(x), Y(L + 11.7), 0.45 * K, 1.2 * K);
      g.globalAlpha = 1;
      g.fillRect(X(0), Y(L) - 2, 3.5 * K, 4);
      for (let x = -14; x < 18; x += 5) if (x < -4 || x > 6.5) g.fillRect(X(x), Y(L + 6) - 1, 2.5 * K, 2);
    });
    if (cfg.pare != null) sPare(g, X(7.1), Y(cfg.pare + 0.6), K * 0.85);
    if (cfg.light != null) {
      const x = X(6.9), y = Y(cfg.light + 0.4);
      g.fillStyle = '#000'; Dr.rr(g, x - K * 0.45, y - K * 1.3, K * 0.9, K * 2.6, 4); g.fill(); g.strokeStyle = '#444'; g.stroke();
      [['r', '#ff2a1f', -0.8], ['y', '#ffb000', 0], ['g', '#2fd16b', 0.8]].forEach(([k, col, dy]) => {
        g.fillStyle = T.light === k ? col : '#262626'; g.beginPath(); g.arc(x, y + dy * K, K * 0.3, 0, 7); g.fill();
      });
    }
    if (cfg.limit) sLimit(g, X(7.2), Y(cfg.limitAt || 6), K * 0.75, cfg.limit);
    if (cfg.hill) {
      const x = X(7.4), y = Y(8);
      g.fillStyle = '#ffb000'; g.beginPath(); g.moveTo(x, y - K); g.lineTo(x + K, y); g.lineTo(x, y + K); g.lineTo(x - K, y); g.closePath(); g.fill();
      Dr.text(g, '10%', x, y, K * 0.55, '#000', 'center', 900);
    }
    if (cfg.box) {
      const [a, b] = cfg.box;
      g.setLineDash([6, 5]); g.strokeStyle = '#fff'; g.lineWidth = 2; g.strokeRect(X(3.65), Y(b), 2.2 * K, (b - a) * K); g.setLineDash([]);
      Dr.text(g, 'P', X(PARK), Y((a + b) / 2), K * 1.1, 'rgba(255,255,255,.35)');
    }
    (cfg.parked || []).forEach(s => Dr.car(g, X(PARK), Y(s), 0, CL * K, CW * K, '#3c3c3c'));
    if (cfg.finish != null) {
      for (let i = 0; i < 14; i++) for (let j = 0; j < 2; j++) { g.fillStyle = (i + j) % 2 ? '#fff' : '#000'; g.fillRect(X(-3.5) + i * 0.68 * K, Y(cfg.finish) - j * 0.6 * K, 0.68 * K, 0.6 * K); }
    }
    T.others.forEach(o => Dr.car(g, X(o.x), Y(o.s), o.a || 0, CL * K, CW * K, o.col || '#cfcfcf', { brake: o.brk }));
    return { X, Y, K };
  }
  // Tablero: velocímetro, tacómetro y testigos.
  function drawDash(g, W, H, c, manual, cfg) {
    const r = Math.min(40, W * 0.1);
    Dr.gauge(g, r + 12, H - r - 12, r, kmh(c.v), 0, 140, 'km/h');
    if (manual) Dr.gauge(g, W - r - 12, H - r - 12, r, c.rpm / 1000, 0, 7, 'rpm ×1000', { show: (c.rpm / 1000).toFixed(1), zones: [[2, 3, '#bdbdbd'], [6, 7, '#E10600']] });
    const gx = manual ? W - 2 * r - 46 : W - 44, gy = H - 34;
    g.fillStyle = 'rgba(0,0,0,.75)'; Dr.rr(g, gx - 22, gy - 22, 44, 44, 10); g.fill();
    Dr.text(g, manual ? (c.gear === 'N' ? 'N' : c.gear) : (c.gear === 'D' && c.on ? 'D' + (c.ag || 1) : c.gear), gx, gy - 2, 22, '#fff');
    Dr.text(g, 'marcha', gx, gy + 15, 8, '#9a9a9a', 'center', 700);
    const tags = [];
    if (c.pb) tags.push(['FRENO DE MANO', '#E10600']);
    if (!c.belt) tags.push(['CINTURÓN', '#E10600']);
    if (!c.on) tags.push(['MOTOR APAGADO', '#ffb000']);
    tags.forEach(([t, col], i) => {
      const x = W / 2 + (manual ? -10 : 0), y = H - 18 - i * 20;
      g.font = '800 10px system-ui,sans-serif'; const w = g.measureText(t).width + 14;
      g.fillStyle = 'rgba(0,0,0,.8)'; Dr.rr(g, x - w / 2, y - 8, w, 16, 5); g.fill(); g.strokeStyle = col; g.lineWidth = 1.3; g.stroke();
      Dr.text(g, t, x, y, 10, col);
    });
    if (c.sig && Math.floor(performance.now() / 400) % 2) Dr.text(g, c.sig === 'L' ? '◀' : '▶', W / 2 + (c.sig === 'L' ? -60 : 60), H - 60, 22, '#2fd16b');
    if (cfg.hill && c.back > 0.05) Dr.text(g, `↓ ${c.back.toFixed(1)} m hacia atrás`, W / 2, H - 70 - tags.length * 20, 12, '#ff4136');
  }

  // ---------- Juego ----------
  function create(api, mi, manual) {
    const M = (manual ? MAN_M : AUTO_M)[mi], cfg = M.cfg;
    const c = Object.assign({ s: 0, x: PARK, v: 0, on: false, gear: manual ? 'N' : 'P', pb: true, belt: false, sig: null, rpm: 0, slope: 0, back: 0, e: 0, tc: 0, stalls: 0, grind: 0 }, M.start || {});
    if (!c.on) c.rpm = 0; else if (!c.rpm) c.rpm = 800;
    c.slope = cfg.hill ? Math.atan(0.1) : 0;
    const T = { others: [], light: cfg.light != null ? 'g' : null, lt: 0, spawn: 2, sigT: 0, ctl: null, st: {} };
    const ui = api.ui, P = api.panel, mk = ui.mk;
    // Controles
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    let clu = null;
    if (manual) clu = ui.pedal(main, 'Embrague', { cls: 'clutch', key: 'c', kv: 1, rel: 6, hint: 'abajo = a fondo' });
    const tryShift = manual ? to => {
      if (c.on && clu.v < 0.75) {
        c.grind++; api.snd.tone(95, 0.3, 'sawtooth', 0.09); api.buzz(80);
        if (c.grind >= 2) api.penalty('grind', 'Pasaste marchas sin pisar el embrague a fondo.', 10);
        else api.say('¡Crrr! Pisa el embrague a fondo para cambiar de marcha.', 'bad');
        return false;
      }
      if (to === 'R' && c.v > 0.4) { api.say('Detén el auto antes de poner reversa.', 'bad'); return false; }
      if (to !== 'N' && to !== 'R' && c.v < -0.4) { api.say('Detén el auto antes de poner una marcha hacia adelante.', 'bad'); return false; }
      if (T.st.up) T.st.up(to);
      c.gear = to; api.snd.tone(300, 0.04, 'square', 0.03); return true;
    } : (to, from) => {
      if (!c.on && from === 'P') { api.say('Primero enciende el motor.', 'bad'); return false; }
      if (from === 'P' && brk.v < 0.3) { api.say('Pisa el freno para sacar la palanca de P.', 'bad'); return false; }
      if (to === 'P' && Math.abs(c.v) > 0.6) { api.penalty('pmov', 'Pusiste P con el auto en movimiento: eso daña la caja.', 15); return false; }
      if ((to === 'R' && c.v > 0.6) || (to === 'D' && c.v < -0.6)) { api.penalty('rmov', 'Cambiaste entre D y R sin detenerte por completo.', 10); return false; }
      c.gear = to; api.snd.tone(300, 0.04, 'square', 0.03); return true;
    };
    const gear = manual
      ? ui.gears(main, ['1', '2', '3', '4', '5', 'R', 'N'], { layout: 'h', value: c.gear, onTry: tryShift, keys: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', r: 'R', n: 'N' } })
      : ui.gears(main, ['P', 'R', 'N', 'D'], { value: c.gear, onTry: tryShift, keys: { p: 'P', r: 'R', n: 'N', d: 'D' } });
    if (!manual) main.appendChild(mk('div', 'sp-sp'));
    const btns = top;
    const eng = ui.btn(btns, 'Encender', { ic: 'bolt', toggle: true, on: c.on, key: 'e', onPress: o => {
      if (o.on) {
        if (manual && clu.v < 0.75 && c.gear !== 'N') { o.setOn(false); api.say('Pisa el embrague a fondo para encender.', 'bad'); return; }
        if (!manual && (c.gear !== 'P' && c.gear !== 'N')) { o.setOn(false); api.say('Pon la palanca en P para encender.', 'bad'); return; }
        if (!manual && brk.v < 0.3) { o.setOn(false); api.say('Pisa el freno para encender.', 'bad'); return; }
        c.on = true; c.stalled = false; c.rpm = 850; api.snd.tone(160, 0.35, 'sawtooth', 0.05);
      } else {
        if (!manual && c.gear !== 'P' && Math.abs(c.v) < 0.3) api.say('Antes de apagar, pon la palanca en P.', 'bad');
        c.on = false;
      }
    } });
    const belt = ui.btn(btns, 'Cinturón', { ic: 'shield', toggle: true, on: c.belt, key: 'b', onPress: o => { c.belt = o.on; } });
    const sL = ui.btn(btns, 'Señal izq.', { ic: 'left', toggle: true, key: 'q', onPress: o => { if (o.on) sR.setOn(false); c.sig = o.on ? 'L' : null; } });
    const sR = ui.btn(btns, 'Señal der.', { ic: 'right', toggle: true, key: 'w', onPress: o => { if (o.on) sL.setOn(false); c.sig = o.on ? 'R' : null; } });
    const pb = ui.btn(btns, 'Freno de mano', { ic: 'stop', toggle: true, on: c.pb, key: 'h', onPress: o => { c.pb = o.on; } });
    const brk = ui.pedal(main, 'Freno', { cls: 'brake', key: 'ArrowDown', kv: 0.9 });
    const gas = ui.pedal(main, 'Acelerador', { cls: 'gas', key: 'ArrowUp', kv: manual ? 0.35 : 0.5 });
    if (c.sig === 'L') sL.setOn(true);
    T.ctl = { gas, brk, clu, gear, eng, belt, sL, sR, pb };
    const sync = () => { if (eng.on !== c.on) eng.setOn(c.on); };

    // Autos que vienen de frente y, en algunas misiones, uno que viene por tu pista desde atrás.
    const crashBox = (o, ax) => Math.abs(o.x - c.x) < (ax ? 2.2 + 0.9 : 1.8) && Math.abs(o.s - c.s) < (ax ? 0.9 + 2.2 : 4.4);
    function traffic(dt) {
      if (cfg.behind && !T.bspawn && c.gear === 'D') { T.bspawn = true; T.others.push({ x: LANE, s: c.s - 45, v: 11, col: '#bdbdbd', behind: true }); }
      T.spawn -= dt;
      if (T.spawn <= 0) { T.spawn = 5 + Math.random() * 5; T.others.push({ x: -LANE, s: c.s + 45, v: -11, a: Math.PI, col: ['#8f8f8f', '#cfcfcf', '#5a5a5a'][Math.floor(Math.random() * 3)] }); }
      (cfg.cross || []).forEach(L => {
        const k = 'x' + L;
        T[k] = (T[k] == null ? (cfg.crossAt != null ? cfg.crossAt : 1.5) : T[k]) - dt;
        const near = c.s > L - 60 && c.s < L + 20, redOnly = cfg.light === L;
        if (T[k] <= 0 && near && (!redOnly || T.light === 'r')) { T[k] = 6.5; T.others.push({ x: -30, s: L + 4, v: 0, vx: 10, a: Math.PI / 2, cross: true, col: '#cfcfcf' }); }
      });
      T.others.forEach(o => {
        if (o.cross) { o.x += o.vx * dt; if (crashBox(o, true)) api.fail('Chocaste con un auto que cruzaba.', 'En un PARE o un semáforo, detente y mira a ambos lados antes de cruzar.'); return; }
        if (o.behind) {
          const gap = c.s - o.s - CL;
          if (c.x < 3.4 && gap > -3 && gap < 18) { o.v = Math.max(Math.min(o.v, c.v), o.v - 6 * dt); o.brk = true; } else { o.v = Math.min(11, o.v + 2 * dt); o.brk = false; }
          if (c.x < 3.3 && Math.abs(o.s - c.s) < 4.3) api.fail('Te chocó el auto que venía por la pista.', 'Antes de salir, mira el espejo y el punto ciego, y espera que pase.');
        }
        o.s += o.v * dt;
      });
      T.others = T.others.filter(o => o.cross ? o.x < 40 : o.s > c.s - 60 && o.s < c.s + 120);
    }
    // Salida desde el estacionamiento y llegada al espacio: el auto cambia de pista solo, si avanzas.
    function lateral(dt) {
      let target = c.x;
      if (cfg.pullOut && c.s > 0.8 && c.v > 0.3) {
        if (c.x > PARK - 0.1 && c.sig !== 'L') api.penalty('nosig', 'Saliste sin señalizar con el intermitente izquierdo.', 15);
        const car = T.others.find(o => o.behind);
        if (car && c.x > PARK - 0.1 && c.s - car.s < 28 && c.s - car.s > -2) api.penalty('mirror', 'Saliste cuando venía un auto: mira el espejo y espera.', 20);
        target = LANE;
      }
      if (cfg.box && c.sig === 'R' && c.s > cfg.box[0] - 0.6 && c.s < cfg.box[1] && c.v > 0.3) {
        if (c.v > 5.6) { if (c.x < 2.2) api.say('Reduce la velocidad para estacionar.', 'bad', 1.5); } else target = PARK;
      }
      if (target !== c.x && c.v > 0.2) {
        const k = Math.min(1, c.v * dt * (target === PARK && cfg.box ? 0.6 : 0.32));
        const nx = c.x + (target - c.x) * k;
        c.a = clamp(Math.atan2(nx - c.x, c.v * dt) * 0.8, -0.5, 0.5);
        c.x = Math.abs(nx - target) < 0.02 ? target : nx;
      } else c.a = (c.a || 0) * 0.9;
    }
    // Normas que se revisan siempre.
    function rules() {
      const sp = kmh(c.v);
      if (Math.abs(c.v) > 1 && !c.belt) api.penalty('belt', 'Conducir sin cinturón de seguridad.', 15);
      if (Math.abs(c.v) > 1.5 && c.pb) api.penalty('pb', 'Avanzaste con el freno de mano puesto.', 10);
      if (cfg.limit && sp > cfg.limit + 4) api.penalty('speed', `Superaste la velocidad máxima de ${cfg.limit} km/h.`, 15);
      if (cfg.pare != null) {
        const front = c.s + CL / 2;
        if (Math.abs(c.v) < 0.2 && front > cfg.pare - 4.5 && front < cfg.pare + 0.4) T.stopped = true;
        if (front > cfg.pare + 0.5 && !T.stopped && !T.pareFail) { T.pareFail = true; api.penalty('pare', 'No te detuviste por completo en el PARE.', 25); }
      }
      if (cfg.light != null) {
        const front = c.s + CL / 2;
        if (front > cfg.light + 0.5 && !T.passed) { T.passed = true; if (T.light === 'r') api.fail('Pasaste con luz roja.', 'Es una infracción gravísima. Con luz amarilla, detente si puedes hacerlo con seguridad.'); }
      }
      if (cfg.box) (cfg.parked || []).forEach(s => { if (c.x > 3.3 && Math.abs(s - c.s) < CL - 0.2) { api.penalty('bump', 'Tocaste un auto estacionado.', 20); c.v = 0; c.s += s > c.s ? -0.3 : 0.3; } });
    }
    function lightCycle(dt) {
      if (cfg.light == null) return;
      const d = cfg.light - (c.s + CL / 2);
      T.lt += dt;
      if (T.light === 'g' && d < 55 && d > 0 && c.v > 2) { T.light = 'y'; T.lt = 0; }
      else if (T.light === 'y' && T.lt > 3) { T.light = 'r'; T.lt = 0; }
      else if (T.light === 'r' && ((Math.abs(c.v) < 0.2 && T.lt > 5) || T.lt > 12)) { T.light = 'g'; T.lt = 0; }
    }
    const steps = flow(api, M.steps(c, T, cfg));
    if (M.setup) M.setup(c, T, api);
    let stallMsg = 0;
    return {
      ctl: T.ctl, c, T,
      start() { if (c.on) api.snd.engine(c.rpm, 0, true); },
      update(dt) {
        const inp = { gas: gas.v, brk: brk.v, clu: clu ? clu.v : 0 };
        if (manual) { for (let k = 0; k < 3; k++) stepManual(c, inp, dt / 3); } else stepAuto(c, inp, dt);
        if (c.stalled) {
          c.stalled = false; c.stalls++; sync(); api.buzz(150); api.snd.tone(70, 0.4, 'sawtooth', 0.08);
          if (c.stalls > 1) api.penalty('stall' + c.stalls, `Se te apagó el motor (${c.stalls}.ª vez).`, 8);
          api.say('Se apagó el motor: soltaste el embrague muy rápido o sin acelerar. Pisa el embrague y vuelve a encender.', 'bad', 4);
          stallMsg = 4;
        }
        if (cfg.hill) { T.max = Math.max(T.max || 0, c.s); c.back = Math.max(c.back, (T.max || 0) - c.s); if (c.back > 2.5) api.fail('El auto se fue demasiado hacia atrás.', 'En una pendiente, encuentra el punto de roce con el embrague antes de bajar el freno de mano.'); else if (c.back > 0.4) api.penalty('roll', 'El auto retrocedió en la pendiente.', 15); }
        lateral(dt); traffic(dt); lightCycle(dt); rules();
        if (c.sig) { T.sigT += dt; if (T.sigT > 0.4) { T.sigT = 0; api.snd.tick(); } }
        api.snd.engine(c.rpm, gas.v, c.on);
        if (M.tick) M.tick(c, T, api, dt);
        const off = !c.on && stallMsg <= 0 && M.engineNeeded !== false && T.started;
        if (steps.update(off ? (manual ? 'El motor está apagado: pisa el embrague a fondo y presiona Encender.' : 'El motor está apagado: palanca en P, pie en el freno y Encender.') : '')) api.win({ notes: M.notes ? M.notes(c, T) : [] });
        if (stallMsg > 0) stallMsg -= dt;
        if (c.on) T.started = true;
      },
      draw(g, W, H) {
        const v = drawRoad(g, W, H, c, cfg, T);
        Dr.car(g, v.X(c.x), v.Y(c.s), c.a || 0, CL * v.K, CW * v.K, Dr.C.ego, { brake: brk.v > 0.05, rev: c.gear === 'R', blink: c.sig && Math.floor(performance.now() / 400) % 2 ? c.sig : null });
        drawDash(g, W, H, c, manual, cfg);
      },
    };
  }

  // ---------- Misiones ----------
  const done = c => kmh(c.v);
  const AUTO_M = [
    {
      n: 'Encender y partir', goal: 'Prepara el auto, enciéndelo y sal del estacionamiento con seguridad.',
      how: ['Cinturón, pie en el freno y Encender.', 'Con el freno pisado, pasa de P a D.', 'Baja el freno de mano y señaliza.', 'Mira el espejo: si viene un auto, espera que pase.'],
      cfg: { pullOut: true, behind: true, parked: [-7, 8], limit: 50, limitAt: 30 },
      steps: c => [
        { t: 'Ponte el cinturón de seguridad.', ok: () => c.belt, keep: () => c.belt },
        { t: 'Pisa el freno y presiona Encender.', ok: () => c.on, keep: () => c.on },
        { t: 'Con el freno pisado, pasa la palanca de P a D.', ok: () => c.gear === 'D', keep: () => c.gear === 'D' },
        { t: 'Baja el freno de mano.', ok: () => !c.pb, keep: () => !c.pb },
        { t: 'Pon el intermitente izquierdo y mira el espejo.', ok: () => c.sig === 'L' || c.x < PARK - 0.2 },
        { t: 'Cuando no venga nadie, suelta el freno y acelera suave hasta 30 km/h.', ok: () => done(c) >= 29 && c.x < LANE + 0.3 },
        { t: 'Ya estás en tu pista: apaga el intermitente.', ok: () => !c.sig },
      ],
    },
    {
      n: 'PARE y semáforo', goal: 'Detente por completo en el PARE y respeta el semáforo hasta llegar a la meta.',
      how: ['En el PARE, detente antes de la línea aunque no venga nadie.', 'Con luz amarilla, detente si puedes hacerlo con seguridad.', 'Velocidad máxima: 50 km/h.'],
      cfg: { pare: 70, light: 175, cross: [70, 175], finish: 270, limit: 50, limitAt: 20, crossAt: 0 },
      start: { x: LANE, on: true, gear: 'D', pb: false, belt: true, rpm: 750 },
      steps: (c, T, cfg) => [
        { t: 'Avanza y detente por completo antes de la línea del PARE.', ok: () => T.stopped || c.s + CL / 2 > cfg.pare + 0.5 },
        { t: 'Mira a ambos lados y cruza cuando no venga nadie.', ok: () => c.s > cfg.pare + 13 },
        { t: 'Atento al semáforo: si cambia a amarillo o rojo, detente antes de la línea.', ok: () => c.s > cfg.light + 13 },
        { t: 'Sigue hasta la meta.', ok: () => c.s >= cfg.finish },
      ],
    },
    {
      n: 'Estacionar y apagar', goal: 'Estaciona en el espacio libre junto a la vereda y deja el auto seguro.',
      how: ['Señaliza a la derecha antes de llegar al espacio.', 'Detente dentro del recuadro (puedes usar R para retroceder).', 'P, freno de mano y apagar el motor.'],
      cfg: { box: [106, 114.5], parked: [101, 121, 128, 94], limit: 50, limitAt: 20 },
      start: { x: LANE, on: true, gear: 'D', pb: false, belt: true, rpm: 750 },
      steps: (c, T, cfg) => {
        const inBox = () => c.x > PARK - 0.25 && c.s - CL / 2 >= cfg.box[0] - 0.1 && c.s + CL / 2 <= cfg.box[1] + 0.1;
        return [
          { t: 'Pon el intermitente derecho antes de llegar al espacio libre.', ok: () => c.sig === 'R' || c.x > PARK - 0.3 },
          { t: 'Reduce la velocidad y detente dentro del recuadro.', ok: () => inBox() && Math.abs(c.v) < 0.15, keep: inBox },
          { t: 'Pon la palanca en P.', ok: () => c.gear === 'P', keep: () => c.gear === 'P' },
          { t: 'Pon el freno de mano.', ok: () => c.pb, keep: () => c.pb },
          { t: 'Apaga el motor.', ok: () => !c.on },
          { t: 'Apaga el intermitente.', ok: () => !c.sig },
        ];
      },
      engineNeeded: false,
      tick: (c, T, api) => { if (c.s > 121 && c.x < 3 && !T.hint) { T.hint = true; api.say(c.sig === 'R' ? 'Te pasaste: detente, pon R y retrocede despacio.' : 'Te pasaste: detente, retrocede con R y señaliza a la derecha antes del espacio.', 'bad', 4); } },
    },
  ];
  const MAN_M = [
    {
      n: 'Partir sin que se apague', goal: 'Enciende un auto mecánico y parte en primera sin que se te apague el motor.',
      how: ['Pisa el embrague a fondo (desliza el dedo hasta abajo) y enciende.', 'Pon primera con el embrague pisado.', 'Acelera un poco y sube el dedo en el embrague despacio.', 'Si lo sueltas de golpe, el motor se apaga.'],
      cfg: { pullOut: true, parked: [-7, 8], limit: 50, limitAt: 30 },
      steps: c => [
        { t: 'Ponte el cinturón de seguridad.', ok: () => c.belt, keep: () => c.belt },
        { t: 'Pisa el embrague a fondo y presiona Encender.', ok: () => c.on, keep: () => c.on },
        { t: 'Con el embrague a fondo, pon primera (1).', ok: () => c.gear === '1', keep: () => c.gear !== 'N' },
        { t: 'Baja el freno de mano.', ok: () => !c.pb, keep: () => !c.pb },
        { t: 'Pon el intermitente izquierdo.', ok: () => c.sig === 'L' || c.x < PARK - 0.2 },
        { t: 'Acelera un poco y suelta el embrague despacio hasta llegar a 12 km/h.', ok: () => done(c) >= 12 && c.x < LANE + 0.4 },
        { t: 'Ya estás en tu pista: apaga el intermitente.', ok: () => !c.sig },
      ],
      notes: c => [c.stalls ? `Se te apagó el motor ${c.stalls} ${c.stalls === 1 ? 'vez' : 'veces'}.` : 'Partiste sin que se apagara el motor.'],
    },
    {
      n: 'Cambios de marcha', goal: 'Sube de primera a cuarta cambiando en el momento justo y mantén entre 50 y 60 km/h.',
      how: ['Para cambiar: embrague a fondo, mueve la palanca y suelta el embrague.', 'Cambia cerca de 2.500 rpm (la zona gris del tacómetro).', 'No llegues a la zona roja.'],
      cfg: { limit: 60, limitAt: 25 },
      start: { x: LANE, on: true, gear: '1', pb: false, belt: true, v: 4.2, rpm: 1980 },
      setup: (c, T, api) => {
        T.st.up = to => {
          const order = ['1', '2', '3', '4', '5'], a = order.indexOf(c.gear), b = order.indexOf(to);
          if (b === a + 1) {
            if (T.lastRpm < 1700) api.say('Cambiaste muy pronto: el motor queda sin fuerza.', 'bad');
            else if (T.lastRpm > 4200) api.penalty('late' + to, `Cambiaste a ${to}.ª muy tarde (sobre 4.000 rpm): gastas más combustible.`, 5);
            else api.say('¡Buen cambio!', 'ok', 1.4);
          }
        };
      },
      tick: (c, T, api, dt) => {
        if (T.ctl.clu.v < 0.3) T.lastRpm = c.rpm;
        if (c.rpm > 6200) api.penalty('rev', 'Llevaste el motor a la zona roja.', 10);
        const sp = done(c);
        T.hold = c.gear === '4' && sp >= 50 && sp <= 60 && T.ctl.clu.v < 0.3 ? (T.hold || 0) + dt : 0;
      },
      steps: (c, T) => [
        { t: 'Acelera y pasa a segunda: embrague a fondo, palanca a 2 y suelta.', ok: () => c.gear === '2' && T.ctl.clu.v < 0.3 },
        { t: 'Acelera y pasa a tercera.', ok: () => c.gear === '3' && T.ctl.clu.v < 0.3 },
        { t: 'Pasa a cuarta.', ok: () => c.gear === '4' && T.ctl.clu.v < 0.3 },
        { t: 'Mantén entre 50 y 60 km/h en cuarta por 4 segundos.', ok: () => T.hold >= 4 },
      ],
    },
    {
      n: 'Reducir y detenerse', goal: 'Frena reduciendo marchas, detente en el PARE sin que se apague el motor y vuelve a partir.',
      how: ['Frena y baja a tercera y luego a segunda.', 'Antes de detenerte, pisa el embrague a fondo.', 'Detente antes de la línea y parte en primera.'],
      cfg: { pare: 150, cross: [150], limit: 60, limitAt: 10, crossAt: 3 },
      start: { x: LANE, on: true, gear: '4', pb: false, belt: true, v: 13.9, rpm: 1815 },
      steps: (c, T, cfg) => [
        { t: 'Frena y reduce a tercera (embrague, palanca a 3, suelta).', ok: () => c.gear === '3' && T.ctl.clu.v < 0.4 },
        { t: 'Sigue frenando y reduce a segunda.', ok: () => c.gear === '2' && T.ctl.clu.v < 0.4 },
        { t: 'Antes de detenerte, pisa el embrague a fondo.', ok: () => T.ctl.clu.v > 0.8 && c.v < 4 },
        { t: 'Detente antes de la línea del PARE.', ok: () => T.stopped || c.s + CL / 2 > cfg.pare + 0.5 },
        { t: 'Pon primera y cruza cuando no venga nadie.', ok: () => c.s > cfg.pare + 13 },
      ],
      notes: c => [c.stalls ? `Se te apagó el motor ${c.stalls} ${c.stalls === 1 ? 'vez' : 'veces'}.` : 'Te detuviste sin que se apagara el motor.'],
    },
    {
      n: 'Partida en pendiente', goal: 'Parte en una subida del 10% sin irte hacia atrás.',
      how: ['Embrague a fondo y primera.', 'Acelera a unas 2.000 rpm.', 'Sube el embrague hasta el punto de roce: las rpm bajan un poco.', 'Recién ahí baja el freno de mano.'],
      cfg: { hill: true },
      start: { x: LANE, on: true, gear: 'N', pb: true, belt: true, rpm: 800 },
      steps: (c, T) => [
        { t: 'Pisa el embrague a fondo y pon primera.', ok: () => c.gear === '1', keep: () => c.gear === '1' },
        { t: 'Acelera hasta unas 2.000 rpm, con el embrague pisado.', ok: () => c.rpm > 1500 && c.rpm < 3200 },
        { t: 'Sube el embrague hasta el punto de roce (las rpm bajan un poco).', ok: () => c.tc > 24 },
        { t: 'Ahora baja el freno de mano, sin soltar el acelerador.', ok: () => !c.pb },
        { t: 'Suelta el embrague por completo y sube hasta 10 km/h.', ok: () => done(c) >= 10 },
      ],
      notes: c => [c.back > 0.05 ? `Retrocediste ${c.back.toFixed(1)} m.` : 'No retrocediste nada.'],
    },
  ];

  RB.sim({
    id: 'auto', name: 'Auto automático', short: 'Palanca P R N D, freno y acelerador.', ic: 'car', lic: ['B', 'F', 'A1', 'A2'],
    desc: 'Aprende a usar un auto automático: encenderlo con el freno pisado, la palanca P R N D, el PARE, el semáforo y cómo estacionar.',
    tips: ['Toca los pedales más abajo para pisarlos más fuerte.', 'En un automático no hay embrague: solo freno y acelerador, ambos con el pie derecho.', 'Con la palanca en D el auto avanza solo, aunque no aceleres.'],
    missions: AUTO_M, create: (api, i) => create(api, i, false),
  });
  RB.sim({
    id: 'manual', name: 'Auto mecánico', short: 'Embrague, caja de cambios y partida en pendiente.', ic: 'gear', lic: ['B', 'F', 'A1', 'A2'],
    desc: 'Domina el embrague y la caja de cambios: partir sin que se apague el motor, cambiar en el momento justo, reducir y partir en pendiente.',
    tips: ['El embrague se pisa a fondo deslizando el dedo hasta abajo del pedal; al subir el dedo lo vas soltando.', 'Usa dos dedos: uno en el embrague y otro en el acelerador o el freno.', 'Si sueltas el embrague de golpe sin acelerar, el motor se apaga.'],
    missions: MAN_M, create: (api, i) => create(api, i, true),
  });
  RB.simAutoPhys = { stepManual, stepAuto, MAN };
})();
