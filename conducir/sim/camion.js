// Simulador de camión articulado (licencias A4 y A5): frenos de aire, retroceso al andén y bajada con retardador.
(function () {
  const RB = window.RB, U = RB.simU, Dr = RB.simDraw;
  const { clamp, kmh, flow } = U;
  const L1 = 3.8, HOFF = 0.3, L2 = 10.5, TRL = 13.6, KING = 1.2, TW = 2.5; // tracto, enganche y semirremolque (m)
  const fwd = a => [Math.sin(a), -Math.cos(a)], nrm = a => [Math.cos(a), Math.sin(a)];

  // Tracto + semirremolque visto desde arriba. P = eje trasero del tracto, a1 = rumbo del tracto, a2 = del remolque.
  function rig(x, y, a1, a2) {
    const f1 = fwd(a1), f2 = fwd(a2);
    const hx = x + f1[0] * HOFF, hy = y + f1[1] * HOFF;
    const tcx = hx + f2[0] * (KING - TRL / 2), tcy = hy + f2[1] * (KING - TRL / 2); // centro del remolque
    const ccx = x + f1[0] * 1.9, ccy = y + f1[1] * 1.9; // centro del tracto
    const rear = [hx + f2[0] * (KING - TRL), hy + f2[1] * (KING - TRL)];
    return { hx, hy, tcx, tcy, ccx, ccy, rear, cab: Dr.box(ccx, ccy, a1, 6.4, TW), trailer: Dr.box(tcx, tcy, a2, TRL, TW + 0.05) };
  }
  function drawRig(g, X, Y, K, r, a1, a2, o = {}) {
    g.save(); g.translate(X(r.tcx), Y(r.tcy)); g.rotate(a2);
    g.fillStyle = '#d6d6d6'; Dr.rr(g, -TW / 2 * K, -TRL / 2 * K, TW * K, TRL * K, 3); g.fill();
    g.strokeStyle = '#8a8a8a'; g.lineWidth = 1; for (let k = 1; k < 6; k++) { g.beginPath(); g.moveTo(-TW / 2 * K, (-TRL / 2 + k * TRL / 6) * K); g.lineTo(TW / 2 * K, (-TRL / 2 + k * TRL / 6) * K); g.stroke(); }
    g.fillStyle = o.rev ? '#fff' : o.brake ? '#ff2a1f' : '#6b0f0b'; g.fillRect(-TW / 2 * K, TRL / 2 * K - 3, 6, 3); g.fillRect(TW / 2 * K - 6, TRL / 2 * K - 3, 6, 3);
    g.restore();
    g.save(); g.translate(X(r.ccx), Y(r.ccy)); g.rotate(a1);
    g.fillStyle = '#3a3a3a'; g.fillRect(-TW / 2 * K + 2, -1 * K, TW * K - 4, 4.2 * K);
    g.fillStyle = Dr.C.ego; Dr.rr(g, -TW / 2 * K, -3.2 * K, TW * K, 2.4 * K, 5); g.fill();
    g.fillStyle = 'rgba(0,0,0,.45)'; Dr.rr(g, -TW / 2 * K + 3, -3.0 * K, TW * K - 6, 0.7 * K, 3); g.fill();
    g.fillStyle = '#fff'; g.fillRect(-TW / 2 * K + 2, -3.2 * K, 6, 2.5); g.fillRect(TW / 2 * K - 8, -3.2 * K, 6, 2.5);
    g.restore();
  }

  // ---------- Misión 1: frenos de aire ----------
  function air(api) {
    const ui = api.ui, mk = ui.mk, P = api.panel;
    const c = { s: 0, v: 0, on: false, psi: 24, pb: true, belt: false, gear: 'N', leak: 0, test: 0, buzzT: 0 };
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    ui.btn(top, 'Cinturón', { ic: 'shield', toggle: true, key: 'b', onPress: o => { c.belt = o.on; } });
    const eng = ui.btn(top, 'Encender', { ic: 'bolt', toggle: true, key: 'e', onPress: o => { if (o.on && c.gear !== 'N') { o.setOn(false); api.say('Pon neutro (N) para encender.', 'bad'); return; } c.on = o.on; if (o.on) api.snd.tone(110, 0.5, 'sawtooth', 0.06); } });
    const pb = ui.btn(top, 'Freno de estacionamiento', { ic: 'stop', toggle: true, on: true, key: 'h', cls: 'yellow', onPress: o => {
      if (!o.on && c.psi < 90) { o.setOn(true); api.say(`Presión muy baja (${Math.round(c.psi)} psi): espera al menos 90 psi para soltar los frenos de resorte.`, 'bad'); return; }
      c.pb = o.on;
    } });
    const gear = ui.gears(main, ['D', 'N', 'R'], { value: 'N', keys: { d: 'D', n: 'N', r: 'R' }, onTry: to => { if (Math.abs(c.v) > 0.2) { api.say('Detén el camión antes de cambiar.', 'bad'); return false; } c.gear = to; return true; } });
    main.appendChild(mk('div', 'sp-sp'));
    const brk = ui.pedal(main, 'Freno', { cls: 'brake', key: 'ArrowDown', kv: 0.9 });
    const gas = ui.pedal(main, 'Acelerador', { cls: 'gas', key: 'ArrowUp', kv: 0.5 });
    let pressed = false;
    const steps = flow(api, [
      { t: 'Ponte el cinturón.', ok: () => c.belt, keep: () => c.belt },
      { t: 'Con la palanca en N, enciende el motor.', ok: () => c.on, keep: () => c.on },
      { t: 'Espera a que la presión de aire llegue a 100 psi (la alarma suena bajo 60).', ok: () => c.psi >= 100 },
      { t: 'Prueba el freno de servicio: písalo a fondo y suéltalo.', ok: () => c.test >= 2 },
      { t: 'Quita el freno de estacionamiento (botón amarillo).', ok: () => !c.pb, keep: () => !c.pb || c.leak },
      { t: 'Pon D y avanza despacio hacia el portón.', ok: () => c.s > 22 },
      { t: '¡Alarma de baja presión! Detente y pon el freno de estacionamiento.', ok: () => Math.abs(c.v) < 0.1 && c.pb },
    ]);
    return {
      ctl: { gas, brk, gear, pb, eng }, c,
      update(dt) {
        if (c.on) c.psi = Math.min(125, c.psi + 11 * dt);
        if (brk.v > 0.6 && !pressed) { pressed = true; c.psi -= 5; if (c.test === 0) c.test = 1; }
        if (brk.v < 0.1 && pressed) { pressed = false; if (c.test === 1) c.test = 2; }
        if (steps.i >= 6 && !c.leak) { c.leak = 1; api.snd.tone(300, 0.4, 'square', 0.06); }
        if (c.leak) c.psi = Math.max(0, c.psi - 19 * dt);
        if (c.psi < 60 && c.on) { c.buzzT -= dt; if (c.buzzT <= 0) { c.buzzT = 0.5; api.snd.tone(1200, 0.15, 'square', 0.04); } }
        const spring = c.psi < 40;
        if (spring && Math.abs(c.v) > 0.5) { api.penalty('spring', 'Los frenos de resorte se aplicaron solos por falta de aire: debiste detenerte antes.', 25); }
        const m = 15000, F = c.on && c.gear === 'D' ? gas.v * 60000 + (c.v < 1 ? 6000 : 0) : c.on && c.gear === 'R' ? -(gas.v * 30000 + 4000) : 0;
        const Fb = brk.v * 110000 * (c.psi > 20 ? 1 : 0.2) + (c.pb || spring ? 200000 : 0), roll = 2500;
        if (Math.abs(c.v) > 0.05) { const nv = c.v + (F - Math.sign(c.v) * (Fb + roll)) / m * dt; c.v = Math.sign(nv) !== Math.sign(c.v) ? 0 : nv; } else if (Math.abs(F) > Fb + roll) c.v += (F - Math.sign(F) * (Fb + roll)) / m * dt; else c.v = 0;
        c.s += c.v * dt;
        if (Math.abs(c.v) > 0.5 && !c.belt) api.penalty('belt', 'Conducir sin cinturón.', 15);
        if (kmh(c.v) > 20) api.penalty('speed', 'En el patio, la velocidad máxima es 20 km/h.', 10);
        api.snd.engine(c.on ? 650 + gas.v * 1200 : 0, gas.v, c.on, 40);
        if (steps.update()) api.win({ notes: ['Con una fuga de aire, detente y pide ayuda: no sigas manejando.'] });
      },
      draw(g, W, H) {
        const K = W / 26, X = x => W / 2 + x * K, Y = y => H * 0.5 + (y + c.s) * K;
        g.fillStyle = '#121212'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#1b1b1b'; for (let s = Math.floor((c.s - 30) / 8) * 8; s < c.s + 40; s += 8) g.fillRect(X(-13), Y(-s), 26 * K, 1);
        g.fillStyle = '#2b2b2b'; g.fillRect(X(-13), Y(-44), 9 * K, 2 * K); g.fillRect(X(4), Y(-44), 9 * K, 2 * K);
        Dr.text(g, 'PORTÓN', X(0), Y(-43), K * 0.9, '#bdbdbd');
        const r = rig(0, -c.s, 0, 0);
        drawRig(g, X, Y, K, r, 0, 0, { brake: brk.v > 0.05, rev: c.gear === 'R' });
        const R = Math.min(52, W * 0.13);
        Dr.gauge(g, R + 14, H - R - 14, R, c.psi, 0, 150, 'psi de aire', { zones: [[0, 60, '#E10600'], [100, 125, '#f5f5f5']] });
        Dr.gauge(g, W - 46, H - 46, 34, kmh(c.v), 0, 40, 'km/h');
        if (c.psi < 60 && c.on) Dr.text(g, '¡PRESIÓN BAJA!', W / 2, H - 30, 14, Math.floor(performance.now() / 300) % 2 ? '#ff4136' : '#fff');
        if (c.pb) Dr.text(g, 'FRENO DE ESTACIONAMIENTO', W / 2, H - 52, 10, '#ffb000');
      },
    };
  }

  // ---------- Misiones 2 y 3: retroceso al andén ----------
  function dock(api, ninety) {
    const ui = api.ui, mk = ui.mk, P = api.panel;
    // Patio: ancho visible, andenes, andén objetivo, camiones estacionados y dónde parte la parte trasera del remolque.
    const Y0 = ninety ? { w: 48, h: 26, docks: [8, 11.5, 15, 18.5, 22], target: 15, parked: [8, 22], rear: [28.6, 22], a: Math.PI / 2 }
      : { w: 27, h: 38, docks: [6.5, 10, 13.5, 17, 20.5], target: 13.5, parked: [10, 17], rear: [14.0, 18.0], a: Math.PI + 0.035 };
    const c = { x: 0, y: 0, a1: Y0.a, a2: Y0.a, v: 0, gear: 'D', pb: false, honk: false, hits: 0 };
    { const f = fwd(Y0.a), hx = Y0.rear[0] + f[0] * (TRL - KING), hy = Y0.rear[1] + f[1] * (TRL - KING); c.x = hx - f[0] * HOFF; c.y = hy - f[1] * HOFF; }
    const docks = Y0.docks, target = Y0.target, DW = 3.3, parked = Y0.parked;
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    ui.btn(top, 'Bocina', { ic: 'vol', key: 'v', onPress: () => { c.honk = true; api.snd.tone(420, 0.35, 'square', 0.06); api.snd.tone(520, 0.35, 'square', 0.05); } });
    const guide = ui.btn(top, 'Guía de trayectoria', { ic: 'eye', toggle: true, on: true });
    const pb = ui.btn(top, 'Freno de estacionamiento', { ic: 'stop', toggle: true, key: 'h', cls: 'yellow', onPress: o => { if (o.on && Math.abs(c.v) > 0.1) { o.setOn(false); api.say('Detén el camión antes.', 'bad'); return; } c.pb = o.on; } });
    const gear = ui.gears(main, ['D', 'R'], { value: 'D', keys: { d: 'D', r: 'R' }, onTry: to => { if (Math.abs(c.v) > 0.1) { api.say('Detén el camión antes de cambiar.', 'bad'); return false; } c.gear = to; return true; } });
    const wh = ui.wheel(main, 'Volante', { keys: { left: 'ArrowLeft', right: 'ArrowRight' } });
    const brk = ui.pedal(main, 'Freno', { cls: 'brake', key: 'ArrowDown', kv: 0.9 });
    const gas = ui.pedal(main, 'Acelerador', { cls: 'gas', key: 'ArrowUp', kv: 0.6 });
    const walls = [{ id: 'muro', name: 'el muro del andén', P: [[-5, -5], [40, -5], [40, 1], [-5, 1]] }];
    docks.forEach((x, i) => { if (x !== target) walls.push({ id: 'sep' + i, name: 'la separación del andén', P: [[x + DW / 2 - 0.15, 1], [x + DW / 2 + 0.15, 1], [x + DW / 2 + 0.15, 4], [x + DW / 2 - 0.15, 4]] }); });
    [target].forEach(x => { [-1, 1].forEach(sx => walls.push({ id: 'pared' + sx, name: 'la separación del andén', P: [[x + sx * DW / 2 - 0.15, 1], [x + sx * DW / 2 + 0.15, 1], [x + sx * DW / 2 + 0.15, 4], [x + sx * DW / 2 - 0.15, 4]] })); });
    parked.forEach((x, i) => walls.push({ id: 'camion' + i, name: 'un camión estacionado', P: Dr.box(x, 1 + TRL / 2, 0, TRL, TW) }));
    const box = [[target - DW / 2, 1], [target + DW / 2, 1], [target + DW / 2, 1 + TRL + 0.6], [target - DW / 2, 1 + TRL + 0.6]];
    const inDock = () => { const r = rig(c.x, c.y, c.a1, c.a2); return Math.abs(r.rear[0] - target) < 0.6 && r.rear[1] < 2.4; };
    const angOk = () => Math.abs(((c.a2 % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) - Math.PI) < 0.07;
    const steps = flow(api, [
      { t: 'Antes de retroceder, toca la bocina para avisar.', ok: () => c.honk },
      { t: 'Pon R: la alarma de retroceso avisa a los demás.', ok: () => gear.v === 'R' || inDock() },
      { t: ninety ? 'Retrocede girando: el remolque va hacia el lado CONTRARIO al que giras el volante.' : 'Retrocede derecho al andén marcado. Para corregir el remolque, gira el volante al lado contrario.', ok: () => inDock() && angOk() && Math.abs(c.v) < 0.05, keep: inDock },
      { t: 'Pon el freno de estacionamiento.', ok: () => c.pb },
    ]);
    const kin = (s, dt, v, d) => {
      const w1 = v / L1 * Math.tan(d), f1 = fwd(s.a1), n1 = nrm(s.a1);
      const vh = [v * f1[0] + HOFF * w1 * n1[0], v * f1[1] + HOFF * w1 * n1[1]];
      const w2 = (vh[0] * Math.cos(s.a2) + vh[1] * Math.sin(s.a2)) / L2;
      s.x += v * f1[0] * dt; s.y += v * f1[1] * dt; s.a1 += w1 * dt; s.a2 += w2 * dt;
    };
    let beep = 0;
    return {
      ctl: { gas, brk, wh, gear, pb }, c,
      update(dt) {
        const dir = gear.v === 'D' ? 1 : -1, vmax = dir > 0 ? 2.2 : 1.4;
        let target = c.pb ? 0 : dir * Math.max(0.5, gas.v * vmax);
        if (brk.v > 0.05) target = 0;
        c.v += clamp(target - c.v, -(brk.v > 0.05 ? 3 : 1.2) * dt, (brk.v > 0.05 ? 3 : 1.2) * dt);
        const prev = { x: c.x, y: c.y, a1: c.a1, a2: c.a2 };
        kin(c, dt, c.v, wh.v * 0.55);
        const r = rig(c.x, c.y, c.a1, c.a2);
        for (const o of walls) if (Dr.hit(r.trailer, o.P) || Dr.hit(r.cab, o.P)) { Object.assign(c, prev); c.v = 0; if (api.t - (c.lastHit != null ? c.lastHit : -9) > 0.6) { c.hits++; api.buzz(120); } c.lastHit = api.t; api.penalty('hit-' + o.id, `Tocaste ${o.name}.`, 15); break; }
        const bend = Math.abs(((c.a1 - c.a2 + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI);
        if (bend > 1.25) api.fail('El remolque se dobló contra el tracto.', 'En reversa, corrige con pequeños giros y adelanta para enderezar cuando el ángulo crezca.');
        if (gear.v === 'R' && Math.abs(c.v) > 0.05) { beep -= dt; if (beep <= 0) { beep = 0.8; api.snd.tone(1100, 0.25, 'square', 0.03); } }
        if (gear.v === 'R' && c.v < -0.2 && !c.honk) api.penalty('nohonk', 'Retrocediste sin tocar la bocina.', 10);
        api.snd.engine(650 + gas.v * 900, gas.v, true, 40);
        if (steps.update()) api.win({ notes: [c.hits ? `Topones: ${c.hits}.` : 'Sin topones.'] });
      },
      draw(g, W, H) {
        const K = Math.min(W / Y0.w, H / Y0.h), ox = (W - Y0.w * K) / 2, X = x => ox + x * K, Y = y => y * K;
        g.fillStyle = '#1d1d1d'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#101010'; g.fillRect(0, 0, W, Y(1));
        docks.forEach((x, i) => {
          g.fillStyle = x === target ? 'rgba(225,6,0,.18)' : '#242424'; g.fillRect(X(x - DW / 2), Y(1), DW * K, (TRL + 0.6) * K);
          g.fillStyle = '#e6e6e6'; g.fillRect(X(x - DW / 2) - 1, Y(1), 2, 3 * K); g.fillRect(X(x + DW / 2) - 1, Y(1), 2, 3 * K);
          g.fillStyle = x === target ? '#ff4136' : '#555'; g.fillRect(X(x - 1.2), 0, 2.4 * K, Y(1) - 2);
          Dr.text(g, String(i + 1), X(x), Y(0.5), K * 0.7, '#000');
        });
        if (true) { g.setLineDash([7, 5]); g.strokeStyle = '#ff4136'; g.lineWidth = 2; g.strokeRect(X(target - DW / 2), Y(1), DW * K, (TRL + 0.6) * K); g.setLineDash([]); }
        parked.forEach(x => { g.fillStyle = '#9a9a9a'; Dr.rr(g, X(x - TW / 2), Y(1), TW * K, TRL * K, 3); g.fill(); });
        if (guide.on && Math.abs(c.v) >= 0) {
          const s = { x: c.x, y: c.y, a1: c.a1, a2: c.a2 }, v = gear.v === 'R' ? -1 : 1;
          g.strokeStyle = gear.v === 'R' ? 'rgba(255,176,0,.7)' : 'rgba(255,255,255,.35)'; g.setLineDash([4, 5]); g.lineWidth = 2; g.beginPath();
          for (let k = 0; k < 60; k++) { kin(s, 0.1, v, wh.v * 0.55); const rr = rig(s.x, s.y, s.a1, s.a2); (k ? g.lineTo : g.moveTo).call(g, X(rr.rear[0]), Y(rr.rear[1])); }
          g.stroke(); g.setLineDash([]);
        }
        const r = rig(c.x, c.y, c.a1, c.a2);
        drawRig(g, X, Y, K, r, c.a1, c.a2, { brake: brk.v > 0.05, rev: gear.v === 'R' });
        const bend = ((c.a1 - c.a2 + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
        g.fillStyle = 'rgba(0,0,0,.75)'; Dr.rr(g, 10, H - 46, 150, 36, 9); g.fill();
        Dr.text(g, `${gear.v} · ángulo ${Math.round(Math.abs(bend) * 57.3)}°`, 85, H - 28, 13, Math.abs(bend) > 0.9 ? '#ff4136' : '#fff');
      },
    };
  }

  // ---------- Misión 4: bajada larga con retardador ----------
  function downhill(api) {
    const ui = api.ui, mk = ui.mk, P = api.panel;
    const END = 900, GRADE = 0.07;
    const c = { s: 0, v: 11, temp: 70, ret: 0, gear: 'D', maxT: 70, maxV: 40 };
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    const lvl = mk('div', 'sp-info');
    ui.btn(top, 'Retardador −', { ic: 'down', key: 'a', onPress: () => { c.ret = Math.max(0, c.ret - 1); } });
    ui.btn(top, 'Retardador +', { ic: 'up', key: 's', onPress: () => { c.ret = Math.min(3, c.ret + 1); api.snd.tone(200 + c.ret * 60, 0.08, 'square', 0.04); } });
    const gear = ui.gears(main, ['D', 'L'], { value: 'D', keys: { d: 'D', l: 'L' }, onTry: (to) => { if (to === 'L' && c.v > 17) { api.say('Muy rápido para bajar de marcha: frena primero.', 'bad'); return false; } c.gear = to; return true; } });
    main.appendChild(lvl);
    const brk = ui.pedal(main, 'Freno', { cls: 'brake', key: 'ArrowDown', kv: 0.5 });
    const gas = ui.pedal(main, 'Acelerador', { cls: 'gas', key: 'ArrowUp', kv: 0.4 });
    const steps = flow(api, [
      { t: 'Antes de la bajada, pasa a la marcha baja (L).', ok: () => c.gear === 'L' || c.s > 80 },
      { t: 'Sube el retardador a nivel 2 o 3 y mantén entre 40 y 50 km/h, usando poco el freno.', ok: () => c.s >= END },
    ]);
    return {
      ctl: { gas, brk, gear }, c,
      update(dt) {
        const m = 30000, g0 = m * 9.81;
        if (c.s < 60 && c.gear === 'D' && c.s > 40 && !c.warned) { c.warned = true; api.say('La bajada empieza en 60 m: pon la marcha baja antes.', 'bad'); }
        if (c.s > 60 && c.gear === 'D') api.penalty('gearD', 'Bajaste la pendiente en marcha alta: no aprovechaste el freno motor.', 10);
        const slope = c.s > 60 ? GRADE : 0;
        const fade = 1 - clamp((c.temp - 420) / 300, 0, 0.75);
        const Fret = c.ret * 6000 * clamp(c.v / 6, 0, 1) + (c.gear === 'L' ? 7000 * clamp(c.v / 6, 0, 1) : 0);
        const Fsvc = brk.v * 160000 * fade;
        const F = gas.v * 50000 + g0 * slope - Fret - Fsvc - 3000 - 4 * c.v * c.v;
        c.v = Math.max(0, c.v + F / m * dt);
        c.s += c.v * dt;
        c.temp += (Fsvc * c.v / 25000 - (c.temp - 60) * 0.012) * dt;
        c.maxT = Math.max(c.maxT, c.temp); c.maxV = Math.max(c.maxV, kmh(c.v));
        if (c.temp > 420) api.penalty('temp', 'Recalentaste los frenos: pierden fuerza (fading).', 20);
        if (kmh(c.v) > 55) api.penalty('speed', 'Superaste los 50 km/h en la bajada.', 15);
        if (kmh(c.v) > 85) api.fail('Perdiste el control del camión en la bajada.', 'Usa la marcha baja y el retardador desde el comienzo, y el freno de servicio solo para ayudar.');
        lvl.innerHTML = `<b>${c.ret}</b><small>retardador</small><b>${Math.round(c.temp)}°</b><small>frenos</small>`;
        api.snd.engine(c.gear === 'L' ? 1600 + c.v * 40 : 900 + c.v * 30, gas.v + c.ret * 0.15, true, 40);
        if (steps.update()) {
          if (kmh(c.v) > 52) api.penalty('end', 'Llegaste al final de la bajada demasiado rápido.', 10);
          api.win({ notes: [`Temperatura máxima de los frenos: ${Math.round(c.maxT)} °C.`, `Velocidad máxima: ${c.maxV} km/h.`] });
        }
      },
      draw(g, W, H) {
        const K = W / 34, base = H * 0.62, mx = W * 0.32;
        const hAt = s => (s > 60 ? (s - 60) * GRADE : 0);
        const Y = s => base + (hAt(s) - hAt(c.s)) * K, X = s => mx + (s - c.s) * K;
        g.fillStyle = '#080a0d'; g.fillRect(0, 0, W, H);
        for (let i = 0; i < 6; i++) { const x = ((i * 130 - c.s * K * 0.1) % (W + 200) + W + 200) % (W + 200) - 100; g.fillStyle = '#12161b'; g.beginPath(); g.moveTo(x - 120, base); g.lineTo(x, base - 120 - (i % 3) * 30); g.lineTo(x + 120, base); g.fill(); }
        g.fillStyle = '#1f1f1f'; g.beginPath(); g.moveTo(0, Y(c.s - mx / K)); for (let s = c.s - mx / K; s < c.s + (W - mx) / K + 2; s += 2) g.lineTo(X(s), Y(s)); g.lineTo(W, H); g.lineTo(0, H); g.fill();
        g.strokeStyle = '#e6e6e6'; g.lineWidth = 2; g.setLineDash([12, 14]); g.beginPath(); for (let s = c.s - mx / K; s < c.s + (W - mx) / K + 2; s += 2) (s === c.s - mx / K ? g.moveTo : g.lineTo).call(g, X(s), Y(s) + 10); g.stroke(); g.setLineDash([]);
        [[50, '7%'], [300, '50'], [620, 'RAMPA'], [END, 'FIN']].forEach(([s, t]) => { const x = X(s); if (x < -20 || x > W + 20) return; g.fillStyle = '#555'; g.fillRect(x, Y(s) - 40, 3, 40); g.fillStyle = t === '50' ? '#fff' : '#ffb000'; Dr.rr(g, x - 20, Y(s) - 62, 44, 22, 4); g.fill(); Dr.text(g, t, x + 2, Y(s) - 51, 11, '#000'); });
        // camión de perfil
        g.save(); g.translate(mx, Y(c.s)); g.rotate(c.s > 60 ? Math.atan(GRADE) : 0);
        g.fillStyle = '#d6d6d6'; g.fillRect(-13.6 * K, -3.6 * K, 13.2 * K, 2.6 * K);
        g.fillStyle = Dr.C.ego; Dr.rr(g, 0.2 * K, -3.3 * K, 2.4 * K, 2.6 * K, 4); g.fill();
        g.fillStyle = 'rgba(0,0,0,.5)'; g.fillRect(1.6 * K, -3.0 * K, 0.8 * K, 0.9 * K);
        g.fillStyle = '#111'; [-12, -10.8, -2, 1.6].forEach(x => { g.beginPath(); g.arc(x * K, -0.5 * K, 0.5 * K, 0, 7); g.fill(); });
        if (brk.v > 0.05) { g.fillStyle = '#ff2a1f'; g.fillRect(-13.8 * K, -1.6 * K, 4, 6); }
        if (c.temp > 300) { g.fillStyle = `rgba(255,${Math.round(200 - c.temp / 3)},0,.8)`; [-12, -10.8].forEach(x => { g.beginPath(); g.arc(x * K, -0.5 * K, 0.25 * K, 0, 7); g.fill(); }); }
        g.restore();
        const R = Math.min(40, W * 0.1);
        Dr.gauge(g, R + 12, H - R - 10, R, kmh(c.v), 0, 100, 'km/h', { zones: [[40, 50, '#f5f5f5'], [55, 100, '#E10600']] });
        Dr.gauge(g, W - R - 12, H - R - 10, R, c.temp, 0, 700, 'frenos °C', { zones: [[420, 700, '#E10600']] });
        Dr.text(g, `Retardador ${c.ret} · marcha ${c.gear}`, W / 2, H - 22, 12, '#fff');
      },
    };
  }

  RB.sim({
    id: 'camion', name: 'Camión articulado', short: 'Frenos de aire, andén y bajadas largas.', ic: 'truck', lic: ['A4', 'A5'],
    desc: 'Conduce un tracto camión con semirremolque: revisa los frenos de aire, retrocede hasta el andén y baja una pendiente larga sin recalentar los frenos.',
    tips: ['En reversa, el remolque se mueve hacia el lado contrario al que giras el volante.', 'Corrige con giros pequeños; si el ángulo crece mucho, avanza para enderezar.', 'En bajadas largas, usa la marcha baja y el retardador, y el freno de servicio solo para ayudar.'],
    missions: [
      { n: 'Frenos de aire', goal: 'Carga la presión de aire, prueba los frenos y reacciona ante una fuga.', how: ['Enciende con la palanca en N.', 'No sueltes el freno de estacionamiento hasta tener al menos 90 psi.', 'Si suena la alarma de baja presión, detente de inmediato.'] },
      { n: 'Retroceso recto al andén', goal: 'Retrocede en línea recta hasta dejar el remolque dentro del andén rojo.', how: ['Toca la bocina y pon R.', 'Mira el remolque: si se desvía, gira el volante hacia el lado contrario un poco.', 'Detente junto al andén y pon el freno de estacionamiento.'] },
      { n: 'Retroceso en 90°', goal: 'Desde el patio, retrocede girando hasta dejar el remolque dentro del andén rojo.', how: ['Ya estás pasado del andén: toca la bocina y pon R.', 'Gira el volante a la izquierda para que el remolque doble hacia la derecha, hacia el andén.', 'Cuando el remolque apunte al andén, endereza siguiendo al remolque.'] },
      { n: 'Bajada con retardador', goal: 'Baja una pendiente de 7% de casi un kilómetro sin pasar los 50 km/h ni recalentar los frenos.', how: ['Pon la marcha baja (L) antes de que empiece la bajada.', 'Usa el retardador a nivel 2 o 3.', 'El freno de servicio se calienta: úsalo poco.'] },
    ],
    create: (api, i) => (i === 0 ? air(api) : i === 3 ? downhill(api) : dock(api, i === 2)),
  });
})();
