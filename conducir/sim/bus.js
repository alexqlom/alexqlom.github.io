// Simulador de bus (licencias A1 a A3): paraderos, puertas, intermitentes y comodidad de los pasajeros de pie.
(function () {
  const RB = window.RB, U = RB.simU, Dr = RB.simDraw;
  const { clamp, kmh, flow } = U;
  const LANE = 1.75, BAY = 4.9, BL = 12, BW = 2.55;

  function create(api, mi) {
    const MS = MISSIONS[mi], ui = api.ui, mk = ui.mk, P = api.panel;
    const c = { s: 0, x: LANE, v: 0, a: 0, door: false, sig: null, comfort: 100, pax: 14, stand: 6, ramp: false, falls: 0 };
    const T = { stops: MS.stops.map(s => ({ s, done: false, wait: MS.wait || 4, board: 0, chair: !!MS.chair && s === MS.stops[0] })), si: 0, light: MS.light != null ? 'g' : null, lt: 0, others: [], spawn: 3 };
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    const door = ui.btn(top, 'Puertas', { ic: 'bus', toggle: true, key: 'o', onPress: o => {
      if (o.on && Math.abs(c.v) > 0.15) { o.setOn(false); api.penalty('doormove', 'Intentaste abrir las puertas con el bus en movimiento.', 20); return; }
      if (!o.on && T.chairIn > 0 && T.chairIn < 1) { o.setOn(true); api.say('Espera a que la pasajera termine de subir.', 'bad'); return; }
      c.door = o.on; api.snd.tone(o.on ? 500 : 380, 0.2, 'sine', 0.05);
    } });
    const sL = ui.btn(top, 'Señal izq.', { ic: 'left', toggle: true, key: 'q', onPress: o => { if (o.on) sR.setOn(false); c.sig = o.on ? 'L' : null; } });
    const sR = ui.btn(top, 'Señal der.', { ic: 'right', toggle: true, key: 'w', onPress: o => { if (o.on) sL.setOn(false); c.sig = o.on ? 'R' : null; } });
    let ramp = null;
    if (MS.chair) ramp = ui.btn(top, 'Rampa', { ic: 'down', toggle: true, key: 'm', onPress: o => {
      if (o.on && !c.door) { o.setOn(false); api.say('Primero abre las puertas.', 'bad'); return; }
      if (!o.on && T.chairIn > 0 && T.chairIn < 1) { o.setOn(true); api.say('La pasajera todavía está subiendo.', 'bad'); return; }
      c.ramp = o.on;
    } });
    const info = mk('div', 'sp-sp sp-info');
    main.appendChild(info);
    const brk = ui.pedal(main, 'Freno', { cls: 'brake', key: 'ArrowDown', kv: 0.5 });
    const gas = ui.pedal(main, 'Acelerador', { cls: 'gas', key: 'ArrowUp', kv: 0.5 });
    const stopNow = () => T.stops[T.si];
    const doorPos = () => c.s + BL / 2 - 1.6;
    const atStop = st => st && Math.abs(doorPos() - st.s) < 3 && c.x > BAY - 0.3;
    const steps = flow(api, [
      ...T.stops.flatMap((st, i) => [
        { t: `Paradero ${i + 1}: pon el intermitente derecho al acercarte.`, ok: () => c.sig === 'R' || c.x > BAY - 0.3 || st.done },
        { t: `Detente con la puerta delantera junto al letrero del paradero ${i + 1}.`, ok: () => st.done || (atStop(st) && Math.abs(c.v) < 0.1), keep: () => st.done || st.board >= 1 || atStop(st) },
        { t: 'Con el bus detenido, abre las puertas.', ok: () => st.done || c.door },
        ...(st.chair ? [
          { t: 'Una pasajera en silla de ruedas quiere subir: baja la rampa.', ok: () => st.done || c.ramp },
          { t: 'Espera a que suba y quede asegurada.', ok: () => st.done || T.chairIn >= 1 },
          { t: 'Sube la rampa.', ok: () => st.done || !c.ramp },
        ] : [{ t: 'Espera a que suban los pasajeros.', ok: () => st.done || st.board >= 1 }]),
        { t: 'Cierra las puertas.', ok: () => st.done || !c.door },
        { t: 'Pon el intermitente izquierdo, mira el espejo y sal con suavidad.', ok: () => { if (!st.done && c.x < BAY - 0.5) { st.done = true; T.si++; T.back = true; } return st.done; } },
      ]),
      { t: 'Apaga el intermitente y sigue hasta la meta.', ok: () => !c.sig && c.s >= MS.finish },
    ]);
    let prevV = 0;
    return {
      ctl: { gas, brk, door, sL, sR, ramp }, c, T,
      start() { api.snd.engine(700, 0, true, 40); },
      update(dt) {
        // Bus automático, pesado: acelera y frena con calma.
        const m = 12000, av = Math.abs(c.v);
        let F = gas.v * 42000 * Math.max(0.15, 1 - av / 22) + (av < 1.5 ? 4000 * (1 - av / 1.5) : 0);
        if (c.door) F = 0;
        const Fb = brk.v * 72000 + (c.door ? 60000 : 0), roll = 1500 + 3 * c.v * c.v;
        if (c.v > 0.05) c.v = Math.max(0, c.v + (F - Fb - roll) / m * dt); else if (F > Fb + roll) c.v += (F - Fb - roll) / m * dt; else c.v = 0;
        c.s += c.v * dt;
        // comodidad: los pasajeros de pie sienten los tirones
        if (dt > 0) c.a += ((c.v - prevV) / dt - c.a) * Math.min(1, dt * 8); prevV = c.v;
        if (Math.abs(c.a) > 1.6) c.comfort = Math.max(0, c.comfort - (Math.abs(c.a) - 1.6) * dt * 22);
        if (Math.abs(c.a) > 3.3 && c.stand > 0 && !T.fallT) { c.falls++; T.fallT = 2; api.penalty('fall' + c.falls, c.a < 0 ? 'Frenaste brusco: un pasajero de pie se cayó.' : 'Aceleraste brusco: un pasajero de pie se cayó.', 12); }
        if (T.fallT) T.fallT = Math.max(0, T.fallT - dt);
        if (c.door && c.v > 0.3) api.fail('El bus se movió con las puertas abiertas.', 'Nunca avances con las puertas abiertas: alguien podría caer.');
        // cambio de pista hacia el paradero y de vuelta
        const st = stopNow();
        let target = c.x;
        if (st && c.sig === 'R' && st.s - doorPos() < 45 && st.s - doorPos() > -4) target = BAY;
        if (st && st.board >= 1 && !c.door && c.sig === 'L') target = LANE;
        if (st && st.board >= 1 && !c.door && c.v > 0.5 && c.sig !== 'L' && c.x > BAY - 0.3) { api.penalty('nosig' + T.si, 'Saliste del paradero sin señalizar.', 10); target = LANE; }
        if (T.back) { if (c.x > LANE + 0.02) target = LANE; else T.back = false; }
        if (c.x !== target && c.v > 0.3) { const nx = c.x + (target - c.x) * Math.min(1, c.v * dt * 0.22); c.ang = clamp(Math.atan2(nx - c.x, c.v * dt) * 0.7, -0.35, 0.35); c.x = Math.abs(nx - target) < 0.02 ? target : nx; } else c.ang = (c.ang || 0) * 0.9;
        if (st && !st.done && doorPos() > st.s + 6 && !st.missed) { st.missed = true; api.penalty('miss' + T.si, `Te pasaste del paradero ${T.si + 1}: los pasajeros se quedaron esperando.`, 25); st.done = true; st.board = 1; T.si++; }
        // subida de pasajeros
        if (st && c.door && atStop(st) && !st.chair) { st.board = Math.min(1, st.board + dt / st.wait); if (st.board >= 1 && !st.added) { st.added = true; c.pax += 5; c.stand += 3; } }
        if (st && st.chair && c.ramp) { T.chairIn = Math.min(1, (T.chairIn || 0) + dt / 6); if (T.chairIn >= 1) st.board = 1; }
        if (st && st.board >= 1 && !c.door && c.v > 0.3 && st.chair && c.ramp) api.fail('Avanzaste con la rampa abajo.');
        // semáforo
        if (MS.light != null) {
          const d = MS.light - (c.s + BL / 2); T.lt += dt;
          if (T.light === 'g' && d < 60 && d > 0 && c.v > 2) { T.light = 'y'; T.lt = 0; } else if (T.light === 'y' && T.lt > 3.5) { T.light = 'r'; T.lt = 0; } else if (T.light === 'r' && ((c.v < 0.1 && T.lt > 5) || T.lt > 14)) { T.light = 'g'; T.lt = 0; }
          if (d < -0.5 && !T.passed) { T.passed = true; if (T.light === 'r') api.fail('Pasaste con luz roja.', 'Con un bus, frena con anticipación: necesitas más distancia.'); }
        }
        if (MS.limit && kmh(c.v) > MS.limit + 4) api.penalty('speed', `Superaste los ${MS.limit} km/h.`, 15);
        T.spawn -= dt; if (T.spawn <= 0) { T.spawn = 6 + Math.random() * 4; T.others.push({ x: -LANE, s: c.s + 60, v: -10 }); }
        T.others.forEach(o => { o.s += o.v * dt; }); T.others = T.others.filter(o => o.s > c.s - 40);
        if (c.sig) { T.sigT = (T.sigT || 0) + dt; if (T.sigT > 0.4) { T.sigT = 0; api.snd.tick(); } }
        api.snd.engine(700 + gas.v * 1300 + c.v * 30, gas.v, true, 40);
        info.innerHTML = `<b>${Math.round(c.comfort)}%</b><small>comodidad</small><b>${c.pax}</b><small>pasajeros</small>`;
        if (steps.update()) api.win({ pts: Math.round(60 + c.comfort * 0.4), notes: [`Comodidad de los pasajeros: ${Math.round(c.comfort)}%.`, c.falls ? `Pasajeros caídos: ${c.falls}.` : 'Nadie se cayó.'] });
      },
      draw(g, W, H) {
        const K = W / 26, ox = W / 2 - 1.8 * K, oy = H * 0.72;
        const X = x => ox + x * K, Y = s => oy - (s - c.s) * K, topS = c.s + oy / K + 2, botS = c.s - (H - oy) / K - BL;
        g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#151515'; g.fillRect(X(-6.5), 0, 3 * K, H); g.fillRect(X(6.5), 0, 3 * K, H);
        g.fillStyle = '#232323'; g.fillRect(X(-3.5), 0, 10 * K, H);
        g.fillStyle = '#e6e6e6';
        for (let s = Math.floor(botS / 6) * 6; s < topS; s += 6) g.fillRect(X(0) - 1, Y(s + 3), 2, 3 * K);
        g.globalAlpha = 0.5; g.fillRect(X(3.5) - 1, 0, 2, H); g.globalAlpha = 1;
        T.stops.forEach((st, i) => {
          const y = Y(st.s);
          g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(X(3.5), y - 14 * K, 3 * K, 18 * K);
          g.fillStyle = '#e6e6e6'; g.font = `800 ${K * 0.9}px system-ui,sans-serif`; g.textAlign = 'center';
          g.save(); g.translate(X(BAY), y - 5 * K); g.fillText('BUS', 0, 0); g.restore();
          g.fillStyle = '#1d1d1d'; g.fillRect(X(6.7), y - 2 * K, 1.4 * K, 4 * K); g.strokeStyle = '#444'; g.strokeRect(X(6.7), y - 2 * K, 1.4 * K, 4 * K);
          g.fillStyle = '#2f6bff'; Dr.rr(g, X(6.6) - 0.5 * K, y - 0.5 * K, K, K, 3); g.fill(); Dr.text(g, 'P', X(6.6), y, K * 0.7, '#fff');
          const waiting = st.done ? 0 : Math.round((1 - st.board) * 5);
          for (let k = 0; k < waiting; k++) { g.fillStyle = '#bdbdbd'; g.beginPath(); g.arc(X(7.6 + (k % 2) * 0.7), y - 1.5 * K + Math.floor(k / 2) * 0.8 * K, 0.28 * K, 0, 7); g.fill(); }
          if (st.chair && !(T.chairIn >= 1)) { const p = T.chairIn || 0; g.fillStyle = '#2f6bff'; g.beginPath(); g.arc(X(7.4 - p * 2.5), y + 1.2 * K, 0.42 * K, 0, 7); g.fill(); }
        });
        if (MS.light != null) {
          const y = Y(MS.light); g.fillStyle = '#e6e6e6'; g.fillRect(X(0), y - 2, 3.5 * K, 4);
          const x = X(7.2); g.fillStyle = '#000'; Dr.rr(g, x - K * 0.45, y - K * 1.3, K * 0.9, K * 2.6, 4); g.fill();
          [['r', '#ff2a1f', -0.8], ['y', '#ffb000', 0], ['g', '#2fd16b', 0.8]].forEach(([k, col, dy]) => { g.fillStyle = T.light === k ? col : '#262626'; g.beginPath(); g.arc(x, y + dy * K, K * 0.3, 0, 7); g.fill(); });
        }
        if (MS.finish) for (let i = 0; i < 14; i++) { g.fillStyle = i % 2 ? '#fff' : '#000'; g.fillRect(X(-3.5) + i * 0.68 * K, Y(MS.finish) - 3, 0.68 * K, 6); }
        T.others.forEach(o => Dr.car(g, X(o.x), Y(o.s), Math.PI, 4.4 * K, 1.8 * K, '#8f8f8f'));
        // bus
        g.save(); g.translate(X(c.x), Y(c.s)); g.rotate(c.ang || 0);
        g.fillStyle = Dr.C.ego; Dr.rr(g, -BW / 2 * K, -BL / 2 * K, BW * K, BL * K, 5); g.fill();
        g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-BW / 2 * K + 3, -BL / 2 * K + 6, BW * K - 6, BL * K - 12);
        g.fillStyle = 'rgba(255,255,255,.85)'; g.fillRect(-BW / 2 * K + 3, -BL / 2 * K + 2, BW * K - 6, 3);
        g.fillStyle = c.door ? '#2fd16b' : '#222'; g.fillRect(BW / 2 * K - 3, (-BL / 2 + 1) * K, 3, 1.2 * K); g.fillRect(BW / 2 * K - 3, 0.5 * K, 3, 1.2 * K);
        if (brk.v > 0.05) { g.fillStyle = '#ff2a1f'; g.fillRect(-BW / 2 * K + 2, BL / 2 * K - 3, 6, 3); g.fillRect(BW / 2 * K - 8, BL / 2 * K - 3, 6, 3); }
        if (c.sig && Math.floor(performance.now() / 400) % 2) { g.fillStyle = '#ffb000'; const sx = c.sig === 'L' ? -1 : 1; g.beginPath(); g.arc(sx * BW / 2 * K, -BL / 2 * K + 4, 3, 0, 7); g.arc(sx * BW / 2 * K, BL / 2 * K - 4, 3, 0, 7); g.fill(); }
        if (c.ramp) { g.fillStyle = '#9a9a9a'; g.fillRect(BW / 2 * K, (-BL / 2 + 1) * K, 1.4 * K, 1.2 * K); }
        g.restore();
        const r = Math.min(38, W * 0.095);
        Dr.gauge(g, r + 12, H - r - 10, r, kmh(c.v), 0, 100, 'km/h');
        Dr.bar(g, W - 110, H - 40, 96, 8, c.comfort / 100, 'comodidad de pie', c.comfort > 60 ? '#f5f5f5' : '#ff4136');
        if (c.door) Dr.text(g, 'PUERTAS ABIERTAS', W / 2, H - 22, 11, '#2fd16b');
      },
    };
  }

  const MISSIONS = [
    { n: 'Primer paradero', goal: 'Detente en el paradero, deja subir a los pasajeros y vuelve a salir con suavidad.', how: ['Señaliza a la derecha antes del paradero.', 'Detente con la puerta junto al letrero azul.', 'Abre y cierra las puertas solo con el bus detenido.', 'Frena y acelera suave: hay pasajeros de pie.'], stops: [130], finish: 230, limit: 50 },
    { n: 'Recorrido urbano', goal: 'Completa el recorrido con tres paraderos y un semáforo, cuidando a los pasajeros de pie.', how: ['Velocidad máxima: 50 km/h.', 'Frena con anticipación ante el semáforo.', 'Tirones fuertes bajan la comodidad y pueden hacer caer a alguien.'], stops: [120, 300, 470], light: 215, finish: 560, limit: 50 },
    { n: 'Pasajera en silla de ruedas', goal: 'Usa la rampa y espera a que la pasajera quede asegurada antes de partir.', how: ['Detente en el paradero y abre las puertas.', 'Baja la rampa y espera con paciencia.', 'Sube la rampa, cierra las puertas y sal con suavidad.'], stops: [110], finish: 200, chair: true, limit: 50 },
  ];

  RB.sim({
    id: 'bus', name: 'Bus urbano', short: 'Paraderos, puertas y pasajeros de pie.', ic: 'bus', lic: ['A2', 'A3'],
    desc: 'Maneja un bus con pasajeros: detente bien en los paraderos, abre las puertas solo con el bus detenido y conduce con suavidad para que nadie se caiga.',
    tips: ['Un bus pesa como diez autos: frena con mucha anticipación.', 'La barra de comodidad baja con cada frenada o aceleración brusca.', 'Nunca muevas el bus con las puertas abiertas.'],
    missions: MISSIONS, create,
  });
})();
