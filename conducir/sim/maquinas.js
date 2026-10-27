// Simuladores de maquinaria (licencia D): excavadora con dos palancas de mando y grúa horquilla.
(function () {
  const RB = window.RB, U = RB.simU, Dr = RB.simDraw;
  const { clamp, flow } = U;
  const tag = (g, W, H, list) => list.forEach((t, i) => { const y = H - 18 - i * 19; g.font = '800 10px system-ui,sans-serif'; const w = g.measureText(t).width + 14; g.fillStyle = 'rgba(0,0,0,.8)'; Dr.rr(g, W / 2 - w / 2, y - 8, w, 16, 5); g.fill(); Dr.text(g, t, W / 2, y, 10, '#ffb000'); });

  // ---------- Excavadora ----------
  // Vista lateral. Ángulos en radianes: pluma (b), brazo relativo (a) y balde relativo (k). El giro (sw) va en grados:
  // el cerro de tierra está a 0° y el camión a 90°; lo que está "al frente" depende del giro.
  const L1 = 5.2, L2 = 2.6, L3 = 1.25, P0 = [0.6, 1.9], PILE = 6.6, BED = [4.6, 8.6], BEDY = 1.5, WALL = 2.6;
  function excavator(api, mi) {
    const ui = api.ui, mk = ui.mk, P = api.panel;
    const c = { on: false, belt: false, lock: true, b: 0.15, a: -1.75, k: -1.2, sw: 0, fill: 0, pile: 1.7, load: 0, cur: 0, dumps: 0, spill: 0, hits: 0, honk: 0, done: {} };
    const W0 = { phase: 0, x: 0, show: false, gone: false, honkT: 0 };
    const newHit = () => { const n = api.t - (c.lastHit != null ? c.lastHit : -9) > 0.8; c.lastHit = api.t; return n; };
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    ui.btn(top, 'Cinturón', { ic: 'shield', toggle: true, key: 'b', onPress: o => { c.belt = o.on; } });
    const eng = ui.btn(top, 'Encender', { ic: 'bolt', toggle: true, key: 'e', onPress: o => { if (o.on && !c.lock) { o.setOn(false); api.say('Antes de encender, sube la palanca de seguridad (traba hidráulica).', 'bad'); return; } c.on = o.on; if (o.on) api.snd.tone(110, 0.5, 'sawtooth', 0.06); } });
    const lockB = ui.btn(top, 'Traba hidráulica', { ic: 'lock', toggle: true, on: true, key: 't', onPress: o => { c.lock = o.on; } });
    ui.btn(top, 'Bocina', { ic: 'vol', key: 'v', onPress: () => { c.honk++; W0.honkT = 2; api.snd.tone(420, 0.4, 'square', 0.06); api.snd.tone(530, 0.4, 'square', 0.05); } });
    const ls = ui.stick(main, 'Palanca izquierda', { labels: { up: 'Brazo afuera', down: 'Brazo adentro', left: 'Girar ◀', right: 'Girar ▶' }, keys: { up: 'w', down: 's', left: 'a', right: 'd' } });
    main.appendChild(mk('div', 'sp-sp'));
    const rs = ui.stick(main, 'Palanca derecha', { labels: { up: 'Pluma abajo', down: 'Pluma arriba', left: 'Cerrar balde', right: 'Abrir balde' }, keys: { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' } });
    const pts = () => {
      const t1 = c.b, t2 = c.b + c.a, t3 = c.b + c.a + c.k;
      const p1 = [P0[0] + L1 * Math.cos(t1), P0[1] + L1 * Math.sin(t1)], p2 = [p1[0] + L2 * Math.cos(t2), p1[1] + L2 * Math.sin(t2)];
      return { p1, p2, tip: [p2[0] + L3 * Math.cos(t3), p2[1] + L3 * Math.sin(t3)], t3 };
    };
    const atPile = () => Math.abs(c.sw) < 9, atTruck = () => Math.abs(c.sw - 90) < 9;
    const surf = x => Math.max(0, c.pile - 0.75 * Math.abs(x - PILE));
    const base = mi === 0 ? null : mi === 1 ? 3 : 2;
    const steps = flow(api, mi === 0 ? [
      { t: 'Ponte el cinturón.', ok: () => c.belt, keep: () => c.belt },
      { t: 'Con la traba hidráulica puesta, enciende el motor.', ok: () => c.on, keep: () => c.on },
      { t: 'Toca la bocina para avisar que vas a operar.', ok: () => c.honk > 0 },
      { t: 'Quita la traba hidráulica para activar las palancas.', ok: () => !c.lock, keep: () => !c.lock || steps.i >= 9 },
      { t: 'Palanca derecha hacia atrás (abajo): sube la pluma.', ok: () => c.done.boomUp },
      { t: 'Palanca izquierda hacia adelante (arriba): extiende el brazo.', ok: () => c.done.armOut },
      { t: 'Palanca derecha hacia la izquierda: cierra el balde.', ok: () => c.done.curl },
      { t: 'Palanca izquierda hacia la derecha: gira la cabina hacia el camión.', ok: () => c.sw > 60 },
      { t: 'Gira de vuelta hacia el cerro de tierra.', ok: () => c.sw < 8 },
      { t: 'Al terminar, pon la traba hidráulica.', ok: () => c.lock },
    ] : [
      { t: 'Ponte el cinturón y enciende el motor (con la traba puesta).', ok: () => c.belt && c.on, keep: () => c.on },
      { t: 'Toca la bocina y quita la traba hidráulica.', ok: () => c.honk > 0 && !c.lock, keep: () => !c.lock || c.dumps >= base },
      ...Array.from({ length: base }, (_, i) => [
        { t: `Carga ${i + 1} de ${base}: baja el balde al cerro y ciérralo para llenarlo.`, ok: () => c.dumps > i || c.fill >= 0.75 },
        { t: 'Sube la pluma por sobre la tolva y gira hacia el camión.', ok: () => c.dumps > i || (atTruck() && pts().tip[1] > WALL) },
        { t: 'Abre el balde sobre la tolva para vaciarlo.', ok: () => c.dumps > i },
      ]).flat(),
      { t: 'Listo: vuelve al frente y pon la traba hidráulica.', ok: () => c.lock },
    ]);
    // Persona que entra al radio de giro (misión 3)
    function worker(dt) {
      if (mi !== 2) return;
      if (!W0.show && !W0.gone && c.dumps >= 1) { W0.show = true; W0.x = 0; api.say('¡Una persona entró en el radio de giro! Suelta las palancas y toca la bocina.', 'bad', 5); }
      if (W0.show) {
        W0.x = Math.min(1, W0.x + dt * 0.5); W0.t = (W0.t || 0) + dt;
        if (W0.t > 1.2 && Math.abs(ls.x) > 0.15) api.fail('Giraste la cabina con una persona en el radio de giro.', 'Si alguien entra a la zona de trabajo, detén todo y avísale con la bocina.');
        if (W0.honkT > 0) W0.leaving = true;
        if (W0.leaving) { W0.leave = (W0.leave || 0) + dt; if (W0.leave > 2) { W0.show = false; W0.gone = true; api.say('La persona salió de la zona. Puedes seguir.', 'ok'); } }
      }
      if (W0.honkT > 0) W0.honkT -= dt;
    }
    return {
      ctl: { ls, rs, eng, lockB }, c, w: W0,
      update(dt) {
        const act = c.on && !c.lock;
        if (!c.on && (Math.abs(ls.x) + Math.abs(ls.y) + Math.abs(rs.x) + Math.abs(rs.y) > 0.4) && steps.i > 1) api.say('El motor está apagado.', 'bad', 1.2);
        if (act) {
          const prev = { b: c.b, a: c.a, k: c.k, sw: c.sw };
          const dz = v => (Math.abs(v) < 0.12 ? 0 : v);
          c.b = clamp(c.b + dz(rs.y) * 0.45 * dt, -0.45, 1.0);
          c.a = clamp(c.a - dz(ls.y) * 0.6 * dt, -2.55, -0.45);
          c.k = clamp(c.k + dz(rs.x) * 1.0 * dt, -2.3, 0.75);
          c.sw = clamp(c.sw + dz(ls.x) * 32 * dt, -20, 110);
          if (dz(rs.y) > 0) c.done.boomUp = (c.done.boomUp || 0) + dt > 0.6 ? true : (c.done.boomUp || 0) + dt;
          if (dz(ls.y) < 0) c.done.armOut = (c.done.armOut || 0) + dt > 0.6 ? true : (c.done.armOut || 0) + dt;
          if (dz(rs.x) < 0) c.done.curl = (c.done.curl || 0) + dt > 0.5 ? true : (c.done.curl || 0) + dt;
          const { tip } = pts();
          // el balde no atraviesa el suelo ni el camión
          if (tip[1] < -0.5) Object.assign(c, prev);
          const inTruckX = tip[0] > BED[0] - 0.4 && tip[0] < BED[1] + 0.4;
          if (Math.abs(c.sw - 90) < 16 && inTruckX && tip[1] < WALL && !(tip[0] > BED[0] + 0.2 && tip[0] < BED[1] - 0.2 && tip[1] > BEDY)) {
            Object.assign(c, prev); if (newHit()) { c.hits++; api.penalty('hit' + c.hits, 'El balde golpeó el camión: súbelo por sobre la tolva antes de girar.', 10); api.buzz(120); }
          }
          // cavar: balde dentro del cerro, cerrándose
          if (atPile() && tip[1] < surf(tip[0]) && dz(rs.x) < 0 && c.fill < 1) { c.fill = Math.min(1, c.fill + dt * 0.7); c.pile = Math.max(0.5, c.pile - dt * 0.03); }
          // vaciar: balde que se abre con tierra adentro
          if (c.fill > 0 && c.k > -0.35) {
            const out = Math.min(c.fill, dt * 1.6);
            c.fill -= out;
            if (atTruck() && tip[0] > BED[0] && tip[0] < BED[1] && tip[1] > BEDY) { c.load += out; c.cur += out; if (c.fill <= 0.02 && c.cur > 0.4) { c.load += c.fill; c.fill = 0; c.dumps++; c.cur = 0; api.snd.tone(660, 0.15, 'sine', 0.05); } }
            else if (atPile()) c.pile = Math.min(1.9, c.pile + out * 0.03);
            else { c.spill += out; if (out > 0) api.penalty('spill' + Math.floor(c.spill * 3), 'Se derramó tierra fuera de la tolva.', 5); }
          }
          if (Math.abs(c.sw - prev.sw) > 0 && c.fill > 0.2 && !atTruck() && !atPile() && pts().tip[1] < 1.2) api.say('Levanta el balde antes de girar.', 'bad', 1.4);
        }
        worker(dt);
        const work = Math.abs(ls.x) + Math.abs(ls.y) + Math.abs(rs.x) + Math.abs(rs.y);
        api.snd.engine(c.on ? 900 + work * 500 : 0, work * 0.4, c.on, 30);
        if (steps.update()) api.win({ notes: mi === 0 ? ['Ya conoces las dos palancas.'] : [`Tierra cargada: ${Math.round(c.load * 100) / 100} baldes.`, c.spill > 0.05 ? `Tierra derramada: ${Math.round(c.spill * 100)}% de un balde.` : 'Sin derrames.'] });
      },
      draw(g, W, H) {
        const K = Math.min(W / 13, H / 9), gx = W * 0.2, gy = H * 0.8, X = x => gx + x * K, Y = y => gy - y * K;
        g.fillStyle = '#090b0e'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#2a1f17'; g.fillRect(0, gy, W, H - gy);
        const off = az => (az - c.sw) * K * 0.11; // desplazamiento por el giro
        // cerro de tierra
        const op = Math.abs(c.sw) < 40;
        if (op) {
          g.save(); g.translate(-off(0) * K, 0); g.globalAlpha = clamp(1 - Math.abs(c.sw) / 40, 0.15, 1);
          g.fillStyle = '#5b4330'; g.beginPath(); g.moveTo(X(PILE - 3), gy);
          for (let x = PILE - 3; x <= PILE + 3; x += 0.25) g.lineTo(X(x), Y(surf(x)));
          g.lineTo(X(PILE + 3), gy); g.fill(); g.restore(); g.globalAlpha = 1;
        }
        // camión
        if (Math.abs(c.sw - 90) < 45) {
          g.save(); g.translate(-off(90) * K, 0); g.globalAlpha = clamp(1 - Math.abs(c.sw - 90) / 45, 0.15, 1);
          g.fillStyle = '#9a9a9a'; g.fillRect(X(BED[0]), Y(WALL), (BED[1] - BED[0]) * K, (WALL - BEDY) * K);
          g.fillStyle = '#5b4330'; const lh = Math.min(1, c.load / 3) * (WALL - BEDY - 0.1); g.fillRect(X(BED[0]) + 3, Y(BEDY + lh), (BED[1] - BED[0]) * K - 6, lh * K);
          g.fillStyle = '#444'; g.fillRect(X(BED[0] - 0.2), Y(BEDY), (BED[1] - BED[0] + 2.6) * K, 0.4 * K);
          g.fillStyle = '#cfcfcf'; Dr.rr(g, X(BED[1] + 0.3), Y(2.8), 2.0 * K, 1.3 * K, 6); g.fill();
          g.fillStyle = '#111'; [BED[0] + 0.6, BED[1] - 0.6, BED[1] + 1.4].forEach(x => { g.beginPath(); g.arc(X(x), Y(0.5), 0.5 * K, 0, 7); g.fill(); });
          g.restore(); g.globalAlpha = 1;
        }
        if (W0.show) { const x = X(3.5 - W0.x * 0.5); g.fillStyle = '#ffb000'; g.fillRect(x - 0.18 * K, Y(1.5), 0.36 * K, 0.9 * K); g.fillStyle = '#f2f2f2'; g.beginPath(); g.arc(x, Y(1.75), 0.2 * K, 0, 7); g.fill(); Dr.text(g, '¡PERSONA!', x, Y(2.3), 11, '#ffb000'); }
        // máquina
        g.fillStyle = '#1b1b1b'; Dr.rr(g, X(-2.3), Y(0.9), 4.6 * K, 0.9 * K, 0.45 * K); g.fill();
        g.strokeStyle = '#3a3a3a'; g.lineWidth = 2; for (let x = -2; x <= 2; x += 0.5) { g.beginPath(); g.arc(X(x), Y(0.45), 0.25 * K, 0, 7); g.stroke(); }
        g.fillStyle = Dr.C.ego; Dr.rr(g, X(-2.1), Y(1.95), 3.2 * K, 1.0 * K, 6); g.fill();
        g.fillStyle = '#2b2b2b'; Dr.rr(g, X(-0.4), Y(3.1), 1.3 * K, 1.2 * K, 5); g.fill();
        g.fillStyle = 'rgba(120,170,220,.35)'; g.fillRect(X(-0.25), Y(2.95), 0.95 * K, 0.85 * K);
        const { p1, p2, tip, t3 } = pts();
        g.lineCap = 'round';
        g.strokeStyle = '#d9d9d9'; g.lineWidth = 0.42 * K; g.beginPath(); g.moveTo(X(P0[0]), Y(P0[1])); g.lineTo(X(p1[0]), Y(p1[1])); g.stroke();
        g.strokeStyle = '#bdbdbd'; g.lineWidth = 0.3 * K; g.beginPath(); g.moveTo(X(p1[0]), Y(p1[1])); g.lineTo(X(p2[0]), Y(p2[1])); g.stroke();
        g.lineCap = 'butt';
        // balde
        const n = [Math.cos(t3 + Math.PI / 2), Math.sin(t3 + Math.PI / 2)];
        const bk = [p2, tip, [tip[0] + n[0] * 0.55, tip[1] + n[1] * 0.55], [p2[0] + n[0] * 0.75, p2[1] + n[1] * 0.75]];
        g.fillStyle = '#7a7a7a'; g.beginPath(); bk.forEach(([x, y], i) => (i ? g.lineTo : g.moveTo).call(g, X(x), Y(y))); g.closePath(); g.fill();
        if (c.fill > 0.02) { g.fillStyle = '#5b4330'; g.beginPath(); g.arc(X((p2[0] + tip[0]) / 2 + n[0] * 0.3), Y((p2[1] + tip[1]) / 2 + n[1] * 0.3), 0.32 * K * Math.sqrt(c.fill), 0, 7); g.fill(); }
        if (c.fill > 0 && c.k > -0.35) { g.fillStyle = '#5b4330'; for (let i = 0; i < 6; i++) { g.beginPath(); g.arc(X(tip[0]) + (i % 3 - 1) * 4, Y(tip[1]) + i * 7, 2.5, 0, 7); g.fill(); } }
        // vista desde arriba: giro, cerro y camión
        const rx = W - 44, ry = H - 46, rr = 32;
        g.fillStyle = 'rgba(0,0,0,.75)'; g.beginPath(); g.arc(rx, ry, rr + 6, 0, 7); g.fill();
        const pol = (az, d) => [rx + Math.sin(az / 57.3) * d, ry - Math.cos(az / 57.3) * d];
        g.fillStyle = '#5b4330'; g.beginPath(); g.arc(...pol(0, rr * 0.8), 6, 0, 7); g.fill();
        g.fillStyle = '#9a9a9a'; const tp = pol(90, rr * 0.8); g.fillRect(tp[0] - 6, tp[1] - 4, 12, 8);
        if (W0.show) { g.fillStyle = '#ffb000'; g.beginPath(); g.arc(...pol(45, rr * 0.55), 4, 0, 7); g.fill(); }
        g.strokeStyle = Dr.C.ego; g.lineWidth = 3; g.beginPath(); g.moveTo(rx, ry); g.lineTo(...pol(c.sw, rr)); g.stroke();
        g.fillStyle = '#fff'; g.beginPath(); g.arc(rx, ry, 3, 0, 7); g.fill();
        Dr.text(g, `giro ${Math.round(c.sw)}°`, rx, ry + rr + 14, 9, '#bdbdbd', 'center', 700);
        Dr.bar(g, 14, H - 36, 90, 8, c.fill, 'balde');
        if (mi) Dr.bar(g, 14, H - 70, 90, 8, c.dumps / base, `cargas ${Math.min(base, c.dumps)}/${base}`);
        const tags = []; if (!c.on) tags.push('MOTOR APAGADO'); if (c.lock) tags.push('TRABA HIDRÁULICA PUESTA'); tag(g, W, H, tags);
      },
    };
  }

  // ---------- Grúa horquilla ----------
  // Vista lateral. x = posición de la punta de las horquillas cuando están retraídas; h = altura de las horquillas.
  const PAL = 1.2, SLOT = [0.03, 0.11], RACK = 9, BEAM = [1.5, 3.0], LEN = 1.15;
  function forklift(api, mi) {
    const ui = api.ui, mk = ui.mk, P = api.panel;
    const c = { x: mi === 0 ? 1.5 : 4.5, v: 0, h: mi === 0 ? 0.5 : 0.2, tilt: 0, on: mi > 0, belt: mi > 0, dir: 'N', hold: mi > 0, pal: mi === 0 ? 5.2 : null, placed: false, hits: 0, rev: 0 };
    const newHit = () => { const n = api.t - (c.lastHit != null ? c.lastHit : -9) > 0.8; c.lastHit = api.t; return n; };
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    ui.btn(top, 'Cinturón', { ic: 'shield', toggle: true, on: c.belt, key: 'b', onPress: o => { c.belt = o.on; } });
    const eng = ui.btn(top, 'Encender', { ic: 'bolt', toggle: true, on: c.on, key: 'e', onPress: o => { c.on = o.on; if (o.on) api.snd.tone(150, 0.4, 'sawtooth', 0.05); } });
    ui.btn(top, 'Bocina', { ic: 'vol', key: 'v', onPress: () => { api.snd.tone(470, 0.3, 'square', 0.06); } });
    const gear = ui.gears(main, ['F', 'N', 'R'], { value: 'N', keys: { f: 'F', n: 'N', r: 'R' }, onTry: to => { if (Math.abs(c.v) > 0.1) { api.say('Detén la grúa antes de cambiar de sentido.', 'bad'); return false; } c.dir = to; if (to === 'R') c.rev++; return true; } });
    const lift = ui.stick(main, 'Elevar', { only: 'y', labels: { up: 'Subir', down: 'Bajar' }, keys: { up: 'w', down: 's' } });
    const tilt = ui.stick(main, 'Inclinar', { only: 'y', labels: { up: 'Adelante', down: 'Atrás' }, keys: { up: 'i', down: 'k' } });
    const brk = ui.pedal(main, 'Freno', { cls: 'brake', key: 'ArrowDown', kv: 0.9 });
    const gas = ui.pedal(main, 'Acelerador', { cls: 'gas', key: 'ArrowUp', kv: 0.5 });
    const tipX = () => c.x; // punta de las horquillas
    const inserted = () => c.pal != null && !c.hold ? tipX() - c.pal : 0; // cuánto entraron las horquillas al pallet (m)
    const steps = flow(api, mi === 0 ? [
      { t: 'Ponte el cinturón y enciende.', ok: () => c.belt && c.on, keep: () => c.on },
      { t: 'Baja las horquillas casi hasta el piso (palanca Elevar hacia abajo).', ok: () => c.h <= 0.11 || c.hold },
      { t: 'Pon F y avanza despacio hasta meter las horquillas completas en el pallet.', ok: () => c.hold || inserted() >= LEN - 0.1 },
      { t: 'Inclina el mástil un poco hacia atrás (palanca Inclinar hacia abajo).', ok: () => c.hold || c.tilt >= 2 },
      { t: 'Sube la carga a unos 20 cm del piso.', ok: () => c.hold && c.h >= 0.18 },
      { t: 'Pon R, mira hacia atrás y retrocede 3 metros con la carga baja.', ok: () => c.hold && c.x <= c.grab - 3 },
    ] : [
      { t: 'Acércate despacio al rack y detente antes de él.', ok: () => c.x > RACK - 2.2 && Math.abs(c.v) < 0.05 || c.placed },
      { t: 'Con la grúa detenida, sube la carga por sobre la viga del nivel 2.', ok: () => c.placed || (c.h - 0.03 > BEAM[1] + 0.12 && c.hold) },
      { t: 'Avanza despacio hasta dejar la carga sobre el rack.', ok: () => c.placed || (tipX() > RACK + 0.9 && c.hold) },
      { t: 'Baja con cuidado hasta apoyar el pallet en la viga.', ok: () => c.placed },
      { t: 'Pon R y retrocede para sacar las horquillas.', ok: () => c.placed && tipX() < RACK - 0.3 },
      { t: 'Baja las horquillas a la altura de transporte (cerca del piso).', ok: () => c.placed && c.h < 0.3 },
    ]);
    return {
      ctl: { gas, brk, gear, lift, tilt, eng }, c,
      update(dt) {
        const dz = v => (Math.abs(v) < 0.12 ? 0 : v);
        if (c.on) {
          c.h = clamp(c.h - dz(lift.y) * 0.45 * dt, 0.02, 4.2);
          c.tilt = clamp(c.tilt + dz(tilt.y) * 4 * dt, -5, 8);
        }
        const dir = c.dir === 'F' ? 1 : c.dir === 'R' ? -1 : 0, high = c.hold && c.h > 0.6;
        let target = c.on ? dir * gas.v * (high ? 0.8 : 2.4) : 0;
        if (brk.v > 0.05) target = 0;
        c.v += clamp(target - c.v, -(brk.v > 0.05 ? 3 : 1.4) * dt, 1.4 * dt);
        const prevX = c.x;
        c.x += c.v * dt;
        if (Math.abs(c.v) > 0.3 && !c.belt) api.penalty('belt', 'Operar sin cinturón.', 10);
        // pallet en el piso (misión 1)
        if (c.pal != null && !c.hold) {
          if (tipX() > c.pal && tipX() < c.pal + PAL) {
            const ok = c.h >= SLOT[0] && c.h <= SLOT[1] && Math.abs(c.tilt) <= 4;
            if (!ok && c.v > 0) { c.x = prevX; c.v = 0; if (newHit()) { c.hits++; api.penalty('pal' + c.hits, c.h > SLOT[1] ? 'Las horquillas chocaron el pallet: estaban muy altas.' : 'Las horquillas chocaron el pallet.', 10); api.buzz(100); } }
          }
          if (tipX() > c.pal + LEN + 0.05) { c.x = prevX; c.v = 0; }
          if (inserted() >= LEN - 0.1 && c.h > SLOT[1] + 0.02) { c.hold = true; c.grab = c.x; }
        }
        // con carga: cuidado al moverse
        if (c.hold && !c.placed) {
          if (Math.abs(c.v) > 0.3 && c.tilt < -1) api.fail('La carga se cayó de las horquillas.', 'Transporta la carga con el mástil inclinado hacia atrás.');
          if (Math.abs(c.v) > 0.9 && c.h > 0.6) api.penalty('high', 'Manejaste con la carga en alto: la grúa puede volcar.', 15);
          if (mi === 1) {
            const pb = c.h - 0.03, front = tipX(), back = front - PAL;
            if (front > RACK && pb < BEAM[1] + 0.1 && pb > BEAM[0] - 1.1 && back < RACK + 0.05 && c.v > 0 && !c.placed) { c.x = prevX; c.v = 0; if (newHit()) { c.hits++; api.penalty('rack' + c.hits, 'La carga chocó con la viga del rack.', 10); } }
            if (front > RACK + 0.9 && pb <= BEAM[1] + 0.1 && pb >= BEAM[1] - 0.05) { c.placed = true; c.hold = false; c.pal = front - PAL; c.palY = BEAM[1] + 0.1; api.snd.tone(660, 0.12, 'sine', 0.05); }
            if (front > RACK + 1.3) { c.x = prevX; c.v = 0; }
          }
        }
        if (mi === 1 && c.placed && c.h > BEAM[1] + 0.25 && tipX() > RACK) api.say('Baja un poco más las horquillas para sacarlas sin arrastrar el pallet.', 'bad', 1.2);
        if (c.x > RACK + 2 || c.x < -3) { c.x = prevX; c.v = 0; }
        if (c.dir === 'R' && Math.abs(c.v) > 0.05) { c.bp = (c.bp || 0) - dt; if (c.bp <= 0) { c.bp = 0.8; api.snd.tone(1000, 0.2, 'square', 0.03); } }
        api.snd.engine(c.on ? 900 + gas.v * 1300 + Math.abs(lift.y) * 400 : 0, gas.v, c.on, 30);
        if (steps.update()) api.win({ notes: [c.hits ? `Choques: ${c.hits}.` : 'Sin choques.'] });
      },
      draw(g, W, H) {
        const K = Math.min(W / 11.5, H / 6.4), gy = H * 0.86, cam = clamp(c.x - 3.5, -1, RACK - 6), X = x => (x - cam) * K, Y = y => gy - y * K;
        g.fillStyle = '#0b0c0e'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#202020'; g.fillRect(0, gy, W, H - gy);
        // rack
        g.fillStyle = '#c4161c'; g.fillRect(X(RACK), Y(4.2), 0.12 * K, 4.2 * K); g.fillRect(X(RACK + 1.5), Y(4.2), 0.12 * K, 4.2 * K);
        g.fillStyle = '#ffb000'; BEAM.forEach(y => g.fillRect(X(RACK), Y(y + 0.1), 1.62 * K, 0.1 * K));
        Dr.text(g, 'NIVEL 2', X(RACK + 0.8), Y(BEAM[1] + 0.35), 10, '#bdbdbd');
        // pallet y carga
        const palX = c.hold ? tipX() - PAL : c.pal, palY = c.hold ? c.h - 0.03 : c.placed ? c.palY : 0;
        if (palX != null) {
          g.save(); if (c.hold) { g.translate(X(tipX()), Y(c.h)); g.rotate(-c.tilt / 57.3); g.translate(-X(tipX()), -Y(c.h)); }
          g.fillStyle = '#8a6a43'; g.fillRect(X(palX), Y(palY + 0.14), PAL * K, 0.14 * K);
          g.fillStyle = '#5a4329'; [0.05, 0.55, 1.05].forEach(o => g.fillRect(X(palX + o), Y(palY + 0.14), 0.1 * K, 0.14 * K));
          g.fillStyle = '#cfcfcf'; g.fillRect(X(palX + 0.05), Y(palY + 1.1), (PAL - 0.1) * K, 0.96 * K);
          g.strokeStyle = '#888'; g.strokeRect(X(palX + 0.05), Y(palY + 1.1), (PAL - 0.1) * K, 0.96 * K);
          g.restore();
        }
        // grúa: cuerpo detrás del mástil
        const mx = c.x - LEN - 0.1;
        g.fillStyle = Dr.C.ego; Dr.rr(g, X(mx - 2.0), Y(1.3), 2.1 * K, 1.0 * K, 8); g.fill();
        g.fillStyle = '#2b2b2b'; g.fillRect(X(mx - 2.25), Y(1.2), 0.45 * K, 0.85 * K);
        g.strokeStyle = '#777'; g.lineWidth = 3; g.beginPath(); g.moveTo(X(mx - 1.6), Y(1.3)); g.lineTo(X(mx - 1.4), Y(2.2)); g.lineTo(X(mx - 0.2), Y(2.2)); g.lineTo(X(mx - 0.1), Y(1.3)); g.stroke();
        g.fillStyle = '#111'; [mx - 1.6, mx - 0.4].forEach(x => { g.beginPath(); g.arc(X(x), Y(0.3), 0.3 * K, 0, 7); g.fill(); });
        g.save(); g.translate(X(mx), Y(0)); g.rotate(-c.tilt / 57.3 * 0.6);
        g.fillStyle = '#555'; g.fillRect(-0.08 * K, -2.3 * K - Math.max(0, c.h - 2) * K, 0.16 * K, (2.3 + Math.max(0, c.h - 2)) * K);
        g.restore();
        g.save(); g.translate(X(mx + 0.1), Y(c.h)); g.rotate(-c.tilt / 57.3);
        g.fillStyle = '#bdbdbd'; g.fillRect(0, -0.6 * K, 0.06 * K, 0.6 * K); g.fillRect(0, -0.05 * K, (LEN + 0.05) * K, 0.06 * K);
        g.restore();
        Dr.text(g, `Altura ${Math.round(c.h * 100)} cm · inclinación ${c.tilt > 0 ? 'atrás' : c.tilt < 0 ? 'adelante' : '0'} ${Math.abs(Math.round(c.tilt))}°`, W / 2, H - 14, 11, '#fff');
        if (mi === 0 && c.pal != null && !c.hold) Dr.text(g, `Ranura del pallet: ${Math.round(SLOT[0] * 100)}–${Math.round(SLOT[1] * 100)} cm`, W / 2, H - 32, 10, c.h >= SLOT[0] && c.h <= SLOT[1] ? '#2fd16b' : '#bdbdbd');
        const tags = []; if (!c.on) tags.push('MOTOR APAGADO'); tag(g, W, H - 40, tags);
      },
    };
  }

  RB.sim({
    id: 'excavadora', name: 'Excavadora', short: 'Dos palancas: pluma, brazo, balde y giro.', ic: 'dig', lic: ['D'],
    desc: 'Opera una excavadora con las dos palancas de mando, como en una máquina real: carga tierra en un camión sin derramar ni golpear, y detén todo si alguien entra a la zona de trabajo.',
    tips: ['Palanca izquierda: adelante y atrás mueve el brazo; a los lados gira la cabina.', 'Palanca derecha: adelante baja la pluma y atrás la sube; a los lados cierra o abre el balde.', 'Antes de girar hacia el camión, sube el balde por sobre la tolva.'],
    missions: [
      { n: 'Conoce las palancas', goal: 'Aprende qué mueve cada palanca de mando.', how: ['Usa los dos pulgares: cada palanca se mueve en cuatro direcciones.', 'La traba hidráulica bloquea las palancas: quítala para operar y ponla al terminar.'] },
      { n: 'Cargar el camión', goal: 'Llena el balde en el cerro y vacíalo tres veces en la tolva del camión.', how: ['Baja el balde al cerro y ciérralo para llenarlo.', 'Sube la pluma, gira hacia el camión y abre el balde sobre la tolva.', 'No derrames tierra ni golpees el camión.'] },
      { n: 'Persona en la zona', goal: 'Carga dos baldes y reacciona si alguien entra al radio de giro.', how: ['Si una persona entra a la zona, suelta las palancas.', 'Avísale con la bocina y espera a que salga.'] },
    ],
    create: excavator,
  });
  RB.sim({
    id: 'horquilla', name: 'Grúa horquilla', short: 'Elevar, inclinar y apilar pallets.', ic: 'fork', lic: ['D'],
    desc: 'Usa las palancas de elevación e inclinación para tomar un pallet y dejarlo en un rack, con la carga siempre baja e inclinada hacia atrás al moverte.',
    tips: ['La palanca Elevar sube y baja las horquillas; la palanca Inclinar mueve el mástil.', 'Mete las horquillas por las ranuras del pallet, a pocos centímetros del piso.', 'Muévete con la carga baja y el mástil inclinado hacia atrás.'],
    missions: [
      { n: 'Tomar un pallet', goal: 'Mete las horquillas en el pallet, levántalo y retrocede con la carga baja.', how: ['Baja las horquillas a la altura de las ranuras.', 'Avanza despacio hasta meterlas completas.', 'Inclina hacia atrás, sube unos 20 cm y retrocede.'] },
      { n: 'Dejar en el rack', goal: 'Deja el pallet en el nivel 2 del rack sin chocar la viga.', how: ['Acércate con la carga baja y detente antes del rack.', 'Detenido, sube la carga por sobre la viga.', 'Avanza despacio, baja hasta apoyar y retrocede.'] },
    ],
    create: forklift,
  });
})();
