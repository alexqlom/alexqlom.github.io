// Simulador de moto (licencia C): vista lateral, embrague de mano, cambios secuenciales 1-N-2-3-4-5 y dos frenos.
(function () {
  const RB = window.RB, U = RB.simU, Dr = RB.simDraw;
  const { clamp, sstep, kmh, flow } = U;
  const K60 = 30 / Math.PI;
  const M = { m: 200, r: 0.31, G: { 1: 23.4, 2: 15.6, 3: 12.3, 4: 10.2, 5: 8.7, N: 0 }, Ie: 0.05, Kc: 6, TcMax: 90 };
  const SEQ = ['1', 'N', '2', '3', '4', '5'];
  const engT = (rpm, thr) => thr * (rpm < 3000 ? 22 + rpm * 0.005 : rpm < 8500 ? 37 + (rpm - 3000) * 0.0015 : 45 - (rpm - 8500) * 0.006) - (2.5 + rpm * 0.0011);

  function step(c, inp, dt) {
    const G = M.G[c.gear];
    let thr = c.on ? inp.gas : 0;
    if (c.on && c.rpm < 1400 && thr < 0.25) thr = Math.max(thr, clamp((1400 - c.rpm) / 500, 0, 0.25));
    if (c.rpm > 10500) thr = 0;
    const e = G ? sstep(0.3, 0.85, 1 - inp.clu) : 0;
    const wE = c.rpm / K60, wW = c.v * G / M.r;
    const Te = c.on ? engT(c.rpm, thr) : -(2 + c.rpm * 0.0012);
    const Tc = e ? clamp(M.Kc * (wE - wW), -e * M.TcMax, e * M.TcMax) : 0;
    c.rpm = Math.max(0, wE + (Te - Tc) / M.Ie * dt) * K60;
    if (c.on && c.rpm < 500) { c.on = false; c.stalled = true; }
    // Frenos: el delantero frena más; si se bloquea una rueda, pierde adherencia.
    const grip = c.wet ? 0.55 : 1;
    let Fb = inp.front * 1700 * (c.lockF ? 0.4 : 1) + inp.rear * 700 * (c.lockR ? 0.6 : 1);
    const Fd = G ? Tc * G / M.r : 0, roll = 40 + 0.3 * c.v * c.v;
    if (c.v > 0.05) { c.v = Math.max(0, c.v + (Fd - Fb - roll) / M.m * dt); } else if (Fd > Fb + roll) c.v += (Fd - Fb - roll) / M.m * dt; else c.v = 0;
    c.s += c.v * dt;
    // Bloqueo: frenar de golpe y muy fuerte (más fácil con lluvia).
    c.fT = inp.front > 0.88 * grip && c.v > 3 ? (c.fT || 0) + dt : 0;
    c.rT = inp.rear > 0.8 * grip && c.v > 3 ? (c.rT || 0) + dt : 0;
    if (c.fT > 0.18) c.lockF = true;
    c.lockR = c.rT > 0.12;
    c.wheel += c.v * dt / M.r * (c.lockF ? 0 : 1);
    c.wheelR = (c.wheelR || 0) + c.v * dt / M.r * (c.lockR ? 0 : 1);
  }

  function create(api, mi) {
    const MS = MISSIONS[mi], ui = api.ui, mk = ui.mk, P = api.panel;
    const c = Object.assign({ s: 0, v: 0, on: false, gear: 'N', rpm: 0, helmet: false, stand: true, sig: null, wheel: 0, stalls: 0, grind: 0, wet: !!MS.wet }, MS.start || {});
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    const helmet = ui.btn(top, 'Casco', { ic: 'shield', toggle: true, on: c.helmet, key: 'b', onPress: o => { if (c.v > 0.5) { o.setOn(c.helmet); api.say('Ponte el casco antes de partir, con la moto detenida.', 'bad'); return; } c.helmet = o.on; } });
    const stand = ui.btn(top, 'Pata lateral', { ic: 'down', toggle: true, on: c.stand, key: 'k', onPress: o => { c.stand = o.on; if (o.on && c.on && c.gear !== 'N') { c.on = false; c.stalled = true; api.say('Con la pata abajo y una marcha puesta, el motor se corta por seguridad.', 'bad'); } } });
    const eng = ui.btn(top, 'Encender', { ic: 'bolt', toggle: true, on: c.on, key: 'e', onPress: o => {
      if (o.on) {
        if (c.gear !== 'N' && clu.v < 0.75) { o.setOn(false); api.say('Aprieta el embrague (o pon neutro) para encender.', 'bad'); return; }
        c.on = true; c.rpm = 1400; api.snd.tone(200, 0.3, 'sawtooth', 0.05);
      } else c.on = false;
    } });
    const sL = ui.btn(top, 'Señal izq.', { ic: 'left', toggle: true, key: 'q', onPress: o => { if (o.on) sR.setOn(false); c.sig = o.on ? 'L' : null; } });
    const sR = ui.btn(top, 'Señal der.', { ic: 'right', toggle: true, key: 'w', onPress: o => { if (o.on) sL.setOn(false); c.sig = o.on ? 'R' : null; } });
    const clu = ui.pedal(main, 'Embrague', { cls: 'clutch', key: 'c', kv: 1, rel: 6, hint: 'mano izquierda' });
    const gcol = mk('div', 'sp-col sp-seq');
    main.appendChild(gcol);
    const shift = dir => {
      if (c.on && clu.v < 0.7) {
        c.grind++; api.snd.tone(95, 0.25, 'sawtooth', 0.08);
        if (c.grind >= 2) api.penalty('grind', 'Cambiaste sin apretar el embrague.', 10); else api.say('Aprieta el embrague para cambiar de marcha.', 'bad');
        return;
      }
      let i = SEQ.indexOf(c.gear);
      if (dir > 0) i = c.gear === '1' ? 2 : Math.min(5, i + 1); else if (dir < 0) i = c.gear === '2' ? 0 : Math.max(0, i - 1); else i = c.gear === '1' || c.gear === '2' ? 1 : i;
      if (dir === 0 && c.v > 3) { api.say('El neutro se busca con la moto casi detenida.', 'bad'); return; }
      const to = SEQ[i];
      if (to !== c.gear) {
        if (T.up && dir > 0) T.up(to);
        c.gear = to; api.snd.tone(260, 0.05, 'square', 0.03);
        if (c.stand && c.on && to !== 'N') { c.on = false; c.stalled = true; api.say('Sube la pata lateral: con la pata abajo el motor se corta.', 'bad'); }
      }
    };
    const T = { obs: null };
    const up = ui.btn(gcol, 'Subir', { ic: 'up', key: 'ArrowRight', onPress: () => shift(1) });
    const nb = ui.btn(gcol, 'N', { key: 'n', cls: 'sp-n', onPress: () => shift(0) });
    const dn = ui.btn(gcol, 'Bajar', { ic: 'down', key: 'ArrowLeft', onPress: () => shift(-1) });
    const rear = ui.pedal(main, 'Freno trasero', { cls: 'brake', key: 'z', kv: 0.6, hint: 'pie derecho' });
    const front = ui.pedal(main, 'Freno delantero', { cls: 'brake', key: 'ArrowDown', kv: 0.7, hint: 'mano derecha' });
    const gas = ui.pedal(main, 'Acelerador', { cls: 'gas', key: 'ArrowUp', kv: 0.4, hint: 'puño' });
    const sync = () => { if (eng.on !== c.on) eng.setOn(c.on); };
    if (MS.setup) MS.setup(c, T, api);
    const steps = flow(api, MS.steps(c, T, { clu, gas, front, rear }));
    let stallMsg = 0;
    return {
      ctl: { gas, clu, front, rear, helmet, stand, eng, up, dn, nb }, c, T,
      start() { if (c.on) api.snd.engine(c.rpm, 0, true, 22); },
      update(dt) {
        for (let k = 0; k < 3; k++) step(c, { gas: gas.v, clu: clu.v, front: front.v, rear: rear.v }, dt / 3);
        if (c.stalled) {
          c.stalled = false; c.stalls++; sync(); api.buzz(150);
          if (c.stalls > 1) api.penalty('stall' + c.stalls, `Se te apagó el motor (${c.stalls}.ª vez).`, 8);
          if (!T.msg) api.say('Se apagó el motor. Aprieta el embrague y presiona Encender.', 'bad', 3.5);
          stallMsg = 3.5;
        }
        if (c.lockF && c.v > 0.5) api.fail('Bloqueaste la rueda delantera y la moto se cayó.', 'Aprieta el freno delantero de forma progresiva, sobre todo con el piso mojado.');
        if (c.lockR && c.v > 2) api.penalty('skid', 'Bloqueaste la rueda trasera: la moto patinó.', 10);
        if (c.v > 1 && !c.helmet) api.penalty('helmet', 'Andar sin casco: es obligatorio para conductor y pasajero.', 20);
        if (c.v > 1 && c.stand) { c.on = false; c.stalled = true; }
        if (MS.limit && kmh(c.v) > MS.limit + 4) api.penalty('speed', `Superaste los ${MS.limit} km/h.`, 15);
        if (T.obs != null && c.s + 1.1 > T.obs - 2.2) api.fail('Chocaste con el auto que salió adelante.', 'Mantén distancia y usa ambos frenos de forma progresiva.');
        if (c.sig) { T.sigT = (T.sigT || 0) + dt; if (T.sigT > 0.4) { T.sigT = 0; api.snd.tick(); } }
        if (MS.tick) MS.tick(c, T, api, dt, { clu, gas, front, rear });
        api.snd.engine(c.rpm, gas.v, c.on, 22);
        const off = !c.on && stallMsg <= 0 && T.started && MS.engine !== false;
        if (steps.update(off ? 'El motor está apagado: aprieta el embrague y presiona Encender.' : '')) api.win({ notes: MS.notes ? MS.notes(c, T) : [] });
        if (stallMsg > 0) stallMsg -= dt;
        if (c.on) T.started = true;
      },
      draw(g, W, H) {
        const K = W / 16, gy = H * 0.72, mx = W * 0.3;
        const X = s => mx + (s - c.s) * K;
        g.fillStyle = '#07090c'; g.fillRect(0, 0, W, H);
        // edificios lejanos (se mueven más lento)
        for (let i = -1; i < 9; i++) {
          const bx = ((i * 70 - c.s * K * 0.25) % (W + 140) + W + 140) % (W + 140) - 70, bh = 40 + (i * 37 % 60);
          g.fillStyle = '#101317'; g.fillRect(bx, gy - 30 - bh, 52, bh + 30);
        }
        // postes
        for (let s = Math.floor((c.s - 6) / 12) * 12; s < c.s + 16; s += 12) { g.fillStyle = '#2a2a2a'; g.fillRect(X(s), gy - 4.2 * K, 3, 4.2 * K); g.fillStyle = '#ffe9a8'; g.fillRect(X(s) - 6, gy - 4.2 * K, 12, 3); }
        g.fillStyle = '#1e1e1e'; g.fillRect(0, gy, W, H - gy);
        g.fillStyle = '#e6e6e6'; for (let s = Math.floor((c.s - 8) / 4) * 4; s < c.s + 16; s += 4) g.fillRect(X(s), gy + (H - gy) * 0.5, 2 * K, 3);
        if (c.wet) { g.fillStyle = 'rgba(120,150,190,.10)'; g.fillRect(0, gy, W, H - gy); g.strokeStyle = 'rgba(180,200,230,.35)'; g.lineWidth = 1; g.beginPath(); for (let i = 0; i < 60; i++) { const x = (i * 53 + api.t * 400) % W, y = (i * 97 + api.t * 900) % gy; g.moveTo(x, y); g.lineTo(x - 3, y + 10); } g.stroke(); }
        if (T.obs != null) { // auto que se cruzó
          const ox = X(T.obs);
          g.fillStyle = '#9a9a9a'; Dr.rr(g, ox - 2.2 * K, gy - 1.35 * K, 4.4 * K, 0.9 * K, 6); g.fill(); Dr.rr(g, ox - 1.2 * K, gy - 1.85 * K, 2.4 * K, 0.7 * K, 6); g.fill();
          g.fillStyle = '#111'; [-1.4, 1.4].forEach(d => { g.beginPath(); g.arc(ox + d * K, gy - 0.35 * K, 0.35 * K, 0, 7); g.fill(); });
        }
        if (MS.cone) { const cx = X(MS.cone); g.fillStyle = '#ff7a00'; g.beginPath(); g.moveTo(cx, gy - 0.8 * K); g.lineTo(cx + 0.3 * K, gy); g.lineTo(cx - 0.3 * K, gy); g.fill(); }
        drawMoto(g, mx, gy, K, c, front.v > 0.05 || rear.v > 0.05);
        const r = Math.min(38, W * 0.095);
        Dr.gauge(g, r + 12, H - r - 10, r, kmh(c.v), 0, 160, 'km/h');
        Dr.gauge(g, W - r - 12, H - r - 10, r, c.rpm / 1000, 0, 12, 'rpm ×1000', { show: (c.rpm / 1000).toFixed(1), zones: [[4, 7, '#bdbdbd'], [10, 12, '#E10600']] });
        g.fillStyle = 'rgba(0,0,0,.75)'; Dr.rr(g, W / 2 - 24, H - 52, 48, 42, 10); g.fill();
        Dr.text(g, c.gear, W / 2, H - 34, 22, c.gear === 'N' ? '#2fd16b' : '#fff');
        Dr.text(g, 'marcha', W / 2, H - 17, 8, '#9a9a9a', 'center', 700);
        const tags = []; if (!c.helmet) tags.push('SIN CASCO'); if (c.stand) tags.push('PATA ABAJO'); if (!c.on) tags.push('MOTOR APAGADO');
        tags.forEach((t, i) => { const y = H - 66 - i * 18; g.font = '800 10px system-ui,sans-serif'; const w = g.measureText(t).width + 14; g.fillStyle = 'rgba(0,0,0,.8)'; Dr.rr(g, W / 2 - w / 2, y - 8, w, 16, 5); g.fill(); Dr.text(g, t, W / 2, y, 10, '#ff4136'); });
        if (c.sig && Math.floor(performance.now() / 400) % 2) Dr.text(g, c.sig === 'L' ? '◀' : '▶', W / 2 + (c.sig === 'L' ? -42 : 42), H - 34, 18, '#2fd16b');
      },
    };
  }
  // Moto y conductor de perfil, mirando a la derecha. (x, y) = punto de contacto de la rueda trasera… aprox.
  function drawMoto(g, x, gy, K, c, braking) {
    const r = 0.31 * K, wb = 1.42 * K, rx = x - wb / 2, fx = x + wb / 2, wy = gy - r;
    const wheel = (cx, ang, lock) => {
      g.fillStyle = '#0d0d0d'; g.beginPath(); g.arc(cx, wy, r, 0, 7); g.fill();
      g.strokeStyle = '#3b3b3b'; g.lineWidth = r * 0.28; g.beginPath(); g.arc(cx, wy, r * 0.86, 0, 7); g.stroke();
      g.strokeStyle = lock ? '#ff4136' : '#888'; g.lineWidth = 1.5;
      for (let k = 0; k < 5; k++) { const a = ang + k * Math.PI * 2 / 5; g.beginPath(); g.moveTo(cx, wy); g.lineTo(cx + Math.cos(a) * r * 0.7, wy + Math.sin(a) * r * 0.7); g.stroke(); }
    };
    wheel(rx, c.wheelR || 0, c.lockR); wheel(fx, c.wheel, c.lockF);
    if (c.stand) { g.strokeStyle = '#777'; g.lineWidth = 3; g.beginPath(); g.moveTo(x - 0.1 * K, wy); g.lineTo(x - 0.45 * K, gy); g.stroke(); }
    g.strokeStyle = '#9a9a9a'; g.lineWidth = 3; g.beginPath(); g.moveTo(fx, wy); g.lineTo(fx - 0.28 * K, wy - 0.78 * K); g.stroke();
    g.fillStyle = Dr.C.ego; Dr.rr(g, rx + 0.1 * K, wy - 0.62 * K, wb * 0.78, 0.42 * K, 8); g.fill();
    g.fillStyle = '#1a1a1a'; Dr.rr(g, rx - 0.05 * K, wy - 0.72 * K, 0.62 * K, 0.16 * K, 4); g.fill();
    g.fillStyle = '#d9d9d9'; g.beginPath(); g.arc(fx - 0.18 * K, wy - 0.62 * K, 0.08 * K, 0, 7); g.fill();
    if (braking) { g.fillStyle = '#ff2a1f'; g.fillRect(rx - 0.18 * K, wy - 0.62 * K, 0.08 * K, 0.08 * K); }
    // conductor
    const hipX = rx + 0.32 * K, hipY = wy - 0.78 * K, shX = hipX + 0.28 * K, shY = hipY - 0.55 * K;
    g.strokeStyle = '#cfcfcf'; g.lineCap = 'round'; g.lineWidth = 0.2 * K;
    g.beginPath(); g.moveTo(hipX, hipY); g.lineTo(shX, shY); g.stroke();
    g.lineWidth = 0.11 * K; g.beginPath(); g.moveTo(shX, shY + 0.05 * K); g.lineTo(fx - 0.3 * K, wy - 0.78 * K); g.stroke();
    g.lineWidth = 0.14 * K; g.beginPath(); g.moveTo(hipX, hipY); g.lineTo(hipX + 0.32 * K, wy - 0.36 * K); g.lineTo(hipX + 0.18 * K, wy - 0.05 * K); g.stroke();
    g.lineCap = 'butt';
    g.fillStyle = c.helmet ? '#f2f2f2' : '#c99a7a'; g.beginPath(); g.arc(shX + 0.08 * K, shY - 0.2 * K, 0.17 * K, 0, 7); g.fill();
    if (c.helmet) { g.fillStyle = '#111'; g.fillRect(shX + 0.1 * K, shY - 0.24 * K, 0.15 * K, 0.07 * K); }
  }

  const sp = c => kmh(c.v);
  const MISSIONS = [
    {
      n: 'Partir en primera', goal: 'Prepárate y parte en primera sin que se apague el motor.',
      how: ['Ponte el casco y sube la pata lateral.', 'Aprieta el embrague y enciende.', 'Baja a primera con el botón Bajar.', 'Acelera un poco y suelta el embrague despacio.'],
      steps: c => [
        { t: 'Ponte el casco.', ok: () => c.helmet, keep: () => c.helmet },
        { t: 'Sube la pata lateral.', ok: () => !c.stand, keep: () => !c.stand },
        { t: 'Aprieta el embrague (desliza hasta abajo) y presiona Encender.', ok: () => c.on, keep: () => c.on },
        { t: 'Con el embrague apretado, baja a primera (botón Bajar).', ok: () => c.gear === '1', keep: () => c.gear !== 'N' },
        { t: 'Pon el intermitente izquierdo para salir.', ok: () => c.sig === 'L' || c.s > 1 },
        { t: 'Acelera un poco y suelta el embrague despacio hasta 15 km/h.', ok: () => sp(c) >= 15 },
        { t: 'Apaga el intermitente.', ok: () => !c.sig },
      ],
      notes: c => [c.stalls ? `Se te apagó el motor ${c.stalls} ${c.stalls === 1 ? 'vez' : 'veces'}.` : 'Partiste sin que se apagara el motor.'],
    },
    {
      n: 'Cambios en marcha', goal: 'Sube hasta cuarta cambiando en el momento justo y mantén entre 55 y 65 km/h.',
      how: ['Para subir: embrague, botón Subir y suelta el embrague.', 'Cambia entre 4.000 y 7.000 rpm (zona gris).', 'No llegues a la zona roja.'],
      start: { helmet: true, stand: false, on: true, gear: '1', v: 4.2, rpm: 3020 }, limit: 70,
      setup: (c, T, api) => { T.up = to => { if (T.rpm < 3500) api.say('Cambiaste muy pronto: la moto queda sin fuerza.', 'bad'); else if (T.rpm > 8500) api.penalty('late' + to, `Cambiaste a ${to}.ª muy arriba de vueltas.`, 5); else api.say('¡Buen cambio!', 'ok', 1.3); }; },
      tick: (c, T, api, dt, k) => { if (k.clu.v < 0.3) T.rpm = c.rpm; if (c.rpm > 10200) api.penalty('rev', 'Llevaste el motor a la zona roja.', 10); T.hold = c.gear === '4' && sp(c) >= 55 && sp(c) <= 65 && k.clu.v < 0.3 ? (T.hold || 0) + dt : 0; },
      steps: (c, T, k) => [
        { t: 'Acelera y sube a segunda: embrague, Subir y suelta.', ok: () => c.gear === '2' && k.clu.v < 0.3 },
        { t: 'Sube a tercera.', ok: () => c.gear === '3' && k.clu.v < 0.3 },
        { t: 'Sube a cuarta.', ok: () => c.gear === '4' && k.clu.v < 0.3 },
        { t: 'Mantén entre 55 y 65 km/h en cuarta por 3 segundos.', ok: () => T.hold >= 3 },
      ],
    },
    {
      n: 'Frenada de emergencia', goal: 'Un auto se cruza adelante: detente a tiempo usando ambos frenos sin bloquear las ruedas.',
      how: ['Usa el freno delantero y el trasero a la vez.', 'Aprieta de forma progresiva: si frenas de golpe y a fondo, la rueda se bloquea.', 'Al detenerte, aprieta el embrague para que no se apague.'],
      start: { helmet: true, stand: false, on: true, gear: '3', v: 13.9, rpm: 5270 }, engine: false,
      setup: (c, T) => { T.at = 2.2; },
      tick: (c, T, api, dt) => { if (T.at != null) { T.at -= dt; if (T.at <= 0) { T.at = null; T.obs = c.s + 34; api.say('¡Un auto se cruzó adelante! Frena con ambos frenos.', 'bad', 2.5); } } },
      steps: (c, T) => [
        { t: 'Mantén la velocidad y atento al camino…', ok: () => T.obs != null },
        { t: 'Detén la moto antes del auto.', ok: () => c.v < 0.05 },
      ],
      notes: (c, T) => [`Te detuviste a ${Math.max(0, T.obs - 2.2 - c.s - 1.1).toFixed(1)} m del auto.`],
    },
    {
      n: 'Frenar con lluvia', goal: 'Con el pavimento mojado, detente antes del cono sin que se bloqueen las ruedas.',
      how: ['Con lluvia la rueda se bloquea con mucha menos fuerza.', 'Frena antes, más suave y con ambos frenos.'],
      start: { helmet: true, stand: false, on: true, gear: '3', v: 11.1, rpm: 4210 }, wet: true, cone: 60, engine: false,
      steps: c => [
        { t: 'Detente antes del cono naranjo, frenando suave con ambos frenos.', ok: () => c.v < 0.05 },
      ],
      tick: (c, T, api) => { if (c.s + 1.1 > 60) api.fail('Pasaste el cono: frenaste tarde.', 'Con lluvia, aumenta la distancia y frena antes.'); },
      notes: c => [`Te detuviste a ${Math.max(0, 60 - c.s - 1.1).toFixed(1)} m del cono.`],
    },
  ];

  RB.sim({
    id: 'moto', name: 'Moto', short: 'Embrague, cambios secuenciales y frenada segura.', ic: 'moto', lic: ['C'],
    desc: 'Aprende a manejar una moto con cambios: casco, pata lateral, embrague de mano, la secuencia 1-N-2-3-4-5 y cómo frenar con ambos frenos sin bloquear las ruedas.',
    tips: ['Los cambios de una moto van en secuencia: 1 abajo, neutro, y 2-3-4-5 hacia arriba.', 'El freno delantero frena más, pero si lo aprietas de golpe y a fondo la rueda se bloquea.', 'Con la pata lateral abajo y una marcha puesta, el motor se corta.'],
    missions: MISSIONS, create,
  });
})();
