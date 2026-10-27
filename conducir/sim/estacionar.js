// Simulador de estacionamiento (licencia B): volante, marchas y pedales en un estacionamiento visto desde arriba.
(function () {
  const RB = window.RB, U = RB.simU, Dr = RB.simDraw;
  const { clamp, kmh, flow } = U;
  const LW = 2.6, CL = 4.4, CW = 1.8, REAR = 0.9; // distancia entre ejes, largo, ancho y voladizo trasero (m)

  // Lugares en batería: fila de recuadros de 2,6 × 5 m. Devuelve [x, y, ancho, largo] por recuadro.
  const row = (x0, y0, n) => Array.from({ length: n }, (_, i) => [x0 + i * 2.6, y0, 2.6, 5]);
  const LOTS = [
    { // de frente
      spots: row(1.2, 1, 7), target: 3, parked: [0, 2, 5, 6], start: { x: 2.5, y: 9.6, h: Math.PI / 2 }, head: 0, need: 0,
    },
    { // en reversa
      spots: row(1.2, 1, 7), target: 2, parked: [0, 1, 3, 5, 6], start: { x: 2.5, y: 9.6, h: Math.PI / 2 }, head: Math.PI, need: 1,
    },
    { // en paralelo junto a la vereda
      curb: 19.2, lane: [17.0, 19.2], cars: [[18.1, 3.6, 0], [18.1, 15.2, 0]], box: [17.0, 6.2, 2.2, 6.6], start: { x: 14.6, y: 21.5, h: 0 }, head: 0, need: 1,
    },
    { // slalom de conos: pista larga, la cámara sigue al auto
      cones: [[11, 14], [11, 3.5], [11, -7], [11, -17.5]], start: { x: 11, y: 23, h: 0 }, finish: -27, wall: -36, scroll: true,
    },
  ];

  function create(api, mi) {
    const L = LOTS[mi], ui = api.ui, mk = ui.mk, P = api.panel;
    const c = { x: L.start.x, y: L.start.y, h: L.start.h, v: 0, gear: 'D', man: 0, last: 'D', hits: 0 };
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    const gear = ui.gears(main, ['P', 'R', 'D'], {
      value: 'D', keys: { p: 'P', r: 'R', d: 'D' },
      onTry: to => {
        if (Math.abs(c.v) > 0.15) { api.say('Detén el auto antes de cambiar de marcha.', 'bad'); return false; }
        if ((to === 'R' && c.last === 'D') || (to === 'D' && c.last === 'R')) { c.man++; c.last = to; if (c.man > (L.need || 0) + 2) api.penalty('man' + c.man, `Maniobra extra (${c.man} cambios de dirección).`, 5); }
        c.gear = to; api.snd.tone(300, 0.04, 'square', 0.03); return true;
      },
    });
    const wh = ui.wheel(main, 'Volante', { keys: { left: 'ArrowLeft', right: 'ArrowRight' } });
    const brk = ui.pedal(main, 'Freno', { cls: 'brake', key: 'ArrowDown', kv: 0.9 });
    const gas = ui.pedal(main, 'Acelerador', { cls: 'gas', key: 'ArrowUp', kv: 0.6 });
    ui.btn(top, 'Centrar volante', { ic: 'wheel', onPress: () => { wh.v = 0; } });
    const cam = ui.btn(top, 'Cámara de retroceso', { ic: 'eye', toggle: true, on: true });
    // Formas para los choques
    const obs = [];
    (L.spots ? L.parked.map(i => { const [x, y, w, h] = L.spots[i]; return [x + w / 2, y + h / 2, 0]; }) : L.cars || []).forEach(([x, y, a], i) => obs.push({ id: 'auto' + i, name: 'un auto estacionado', P: Dr.box(x, y, a, CL, CW), car: [x, y, a] }));
    (L.cones || []).forEach(([x, y], i) => obs.push({ id: 'cono' + i, name: 'un cono', P: Dr.box(x, y, 0, 0.55, 0.55), cone: [x, y] }));
    if (L.curb) obs.push({ id: 'vereda', name: 'la solera', P: [[L.curb, -5], [L.curb + 3, -5], [L.curb + 3, 40], [L.curb, 40]] });
    const WALL = L.wall != null ? L.wall : 0.4;
    obs.push({ id: 'muro', name: 'el muro', P: [[-5, WALL - 5], [40, WALL - 5], [40, WALL], [-5, WALL]] });
    const center = () => [c.x + Math.sin(c.h) * (CL / 2 - REAR), c.y - Math.cos(c.h) * (CL / 2 - REAR)];
    const body = () => { const [x, y] = center(); return Dr.box(x, y, c.h, CL, CW); };
    const tgt = L.spots ? (() => { const [x, y, w, h] = L.spots[L.target]; return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; })()
      : L.box ? (() => { const [x, y, w, h] = L.box; return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; })() : null;
    const grow = (Q, d) => { const cx = Q.reduce((a, p) => a + p[0], 0) / 4, cy = Q.reduce((a, p) => a + p[1], 0) / 4; return Q.map(([x, y]) => [x + Math.sign(x - cx) * d, y + Math.sign(y - cy) * d]); };
    const inSpot = () => { if (!tgt) return false; const G = grow(tgt, 0.12); return body().every(p => Dr.inside(p, G)); };
    const angOk = () => { const d = Math.abs(((c.h - L.head) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI); return d < 0.14; };
    const side = [];
    const steps = flow(api, mi === 3 ? [
      { t: 'Zigzaguea entre los conos: el primero por la izquierda, el segundo por la derecha, y así.', ok: () => center()[1] < L.cones[L.cones.length - 1][1] - 2 },
      { t: 'Sigue derecho hasta la meta.', ok: () => center()[1] < L.finish },
    ] : [
      { t: mi === 0 ? 'Avanza por el pasillo y entra de frente al recuadro rojo.' : mi === 1 ? 'Pasa el recuadro rojo, detente, pon R y entra en reversa.' : 'Avanza hasta quedar al lado del auto de adelante, pon R y entra en reversa al espacio.', ok: () => inSpot() && angOk() && Math.abs(c.v) < 0.05, keep: () => inSpot() },
      { t: 'Bien estacionado: pon la palanca en P.', ok: () => gear.v === 'P' },
    ]);
    function collide(prev) {
      const B = body();
      for (const o of obs) {
        if (Dr.hit(B, o.P)) {
          Object.assign(c, prev); c.v = 0;
          // un topón nuevo solo si no venía tocando ya
          if (api.t - (c.lastHit != null ? c.lastHit : -9) > 0.6) { c.hits++; api.buzz(120); api.snd.tone(120, 0.15, 'square', 0.06); }
          c.lastHit = api.t;
          api.penalty('hit-' + o.id, `Tocaste ${o.name}.`, mi === 3 ? 10 : 15);
          return;
        }
      }
    }
    return {
      ctl: { gas, brk, wh, gear }, c,
      start() { api.snd.engine(800, 0, true); },
      update(dt) {
        const dir = gear.v === 'D' ? 1 : gear.v === 'R' ? -1 : 0;
        const vmax = dir > 0 ? 2.6 : 1.6, creep = 0.7;
        let target = dir ? dir * Math.max(creep, gas.v * vmax) : 0;
        if (brk.v > 0.05) target = 0;
        const acc = brk.v > 0.05 ? 3 + brk.v * 6 : 1.6;
        if (gear.v === 'P') c.v = 0;
        else c.v += clamp(target - c.v, -acc * dt, acc * dt);
        const prev = { x: c.x, y: c.y, h: c.h };
        const d = wh.v * 0.6;
        c.x += c.v * Math.sin(c.h) * dt; c.y -= c.v * Math.cos(c.h) * dt; c.h += c.v / LW * Math.tan(d) * dt;
        collide(prev);
        if (mi === 3) {
          L.cones.forEach(([x, y], i) => {
            if (side[i] == null && center()[1] < y) {
              side[i] = center()[0] < x ? 'L' : 'R';
              if (side[i] !== (i % 2 ? 'R' : 'L')) api.penalty('lado' + i, `Pasaste el cono ${i + 1} por el lado equivocado.`, 10);
            }
          });
        }
        if (c.x < -3 || c.x > 25 || c.y < WALL - 3 || c.y > 30) api.fail('Te saliste del estacionamiento.');
        api.snd.engine(800 + gas.v * 1200, gas.v, true);
        if (steps.update()) api.win({ notes: [c.hits ? `Topones: ${c.hits}.` : 'Sin topones.', `Cambios de dirección: ${c.man}.`] });
      },
      draw(g, W, H) {
        const K = Math.min(W / 22, H / 24.5), ox = (W - 22 * K) / 2, oy = L.scroll ? clamp(H * 0.62 - center()[1] * K, -24.5 * K + H, -WALL * K) : 0;
        const X = x => ox + x * K, Y = y => oy + y * K;
        g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#202020'; g.fillRect(X(0), Y(WALL), 22 * K, (24.4 - WALL) * K);
        g.fillStyle = '#151515'; g.fillRect(X(0), 0, 22 * K, Math.max(0, Y(WALL)));
        if (L.scroll) { g.fillStyle = 'rgba(255,255,255,.35)'; for (let y = Math.floor(WALL); y < 25; y += 3) { g.fillRect(X(6.5) - 1, Y(y), 2, 1.5 * K); g.fillRect(X(15.5) - 1, Y(y), 2, 1.5 * K); } }
        if (L.spots) {
          g.strokeStyle = '#e6e6e6'; g.lineWidth = 2;
          L.spots.forEach(([x, y, w, h]) => { g.beginPath(); g.moveTo(X(x), Y(y)); g.lineTo(X(x), Y(y + h)); g.moveTo(X(x + w), Y(y)); g.lineTo(X(x + w), Y(y + h)); g.stroke(); });
          g.globalAlpha = 0.4; for (let x = 0; x < 22; x += 3) g.fillRect(X(x), Y(11.6), 1.4 * K, 2); g.globalAlpha = 1;
        }
        if (L.curb) {
          g.fillStyle = '#151515'; g.fillRect(X(L.curb), 0, W - X(L.curb), H);
          g.fillStyle = '#5a5a5a'; g.fillRect(X(L.curb) - 2, 0, 4, H);
          g.fillStyle = '#e6e6e6'; for (let y = 0; y < 25; y += 3) g.fillRect(X(11.6) - 1, Y(y), 2, 1.5 * K);
        }
        if (tgt) {
          g.fillStyle = 'rgba(225,6,0,.16)'; g.beginPath(); tgt.forEach(([x, y], i) => (i ? g.lineTo : g.moveTo).call(g, X(x), Y(y))); g.closePath(); g.fill();
          g.setLineDash([7, 5]); g.strokeStyle = '#ff4136'; g.lineWidth = 2.5; g.stroke(); g.setLineDash([]);
        }
        if (L.finish) { for (let i = 0; i < 22; i++) { g.fillStyle = i % 2 ? '#fff' : '#000'; g.fillRect(X(i), Y(L.finish) - 4, K, 8); } }
        obs.forEach(o => {
          if (o.car) Dr.car(g, X(o.car[0]), Y(o.car[1]), o.car[2], CL * K, CW * K, '#3f3f3f');
          if (o.cone) { const [x, y] = o.cone; g.fillStyle = '#ff7a00'; g.beginPath(); g.arc(X(x), Y(y), 0.32 * K, 0, 7); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(X(x), Y(y), 0.13 * K, 0, 7); g.fill(); }
        });
        const [cx, cy] = center();
        // trayectoria que seguirían las ruedas traseras con el volante en esta posición
        if (cam.on && Math.abs(wh.v) > 0.02) {
          const R = LW / Math.tan(wh.v * 0.6), dir = gear.v === 'R' ? -1 : 1;
          g.strokeStyle = gear.v === 'R' ? 'rgba(255,176,0,.6)' : 'rgba(255,255,255,.35)'; g.lineWidth = 2; g.setLineDash([4, 5]);
          [-CW / 2, CW / 2].forEach(off => {
            g.beginPath();
            for (let k = 0; k <= 24; k++) {
              const sArc = dir * k * 0.35, th = c.h + sArc / R;
              const px = c.x + R * (Math.cos(c.h) - Math.cos(th)) + Math.cos(th) * off, py = c.y + R * (Math.sin(c.h) - Math.sin(th)) + Math.sin(th) * off;
              (k ? g.lineTo : g.moveTo).call(g, X(px), Y(py));
            }
            g.stroke();
          });
          g.setLineDash([]);
        }
        Dr.car(g, X(cx), Y(cy), c.h, CL * K, CW * K, Dr.C.ego, { brake: brk.v > 0.05, rev: gear.v === 'R' });
        g.fillStyle = 'rgba(0,0,0,.75)'; Dr.rr(g, 10, H - 46, 108, 36, 9); g.fill();
        Dr.text(g, `${gear.v} · ${kmh(c.v)} km/h`, 64, H - 28, 14, '#fff');
      },
    };
  }

  RB.sim({
    id: 'estacionar', name: 'Estacionar', short: 'Batería, reversa, paralelo y conos.', ic: 'car', lic: ['B', 'F', 'A1', 'A2'], panel: 'park',
    desc: 'Practica las maniobras del examen práctico: estacionar de frente y en reversa, en paralelo junto a la vereda y un slalom de conos.',
    tips: ['Arrastra el volante hacia los lados: se queda donde lo dejas.', 'Las líneas punteadas muestran por dónde pasarán las ruedas traseras.', 'Avanza despacio: sin acelerar, el auto se mueve solo a paso de hombre.'],
    missions: [
      { n: 'En batería, de frente', goal: 'Entra de frente al recuadro rojo sin tocar los autos de los lados.', how: ['Avanza por el pasillo y gira el volante a la izquierda al llegar al espacio.', 'Endereza antes de terminar de entrar.', 'Al quedar dentro, pon P.'] },
      { n: 'En batería, en reversa', goal: 'Estaciona en reversa, quedando con el frente hacia el pasillo.', how: ['Pasa un poco más allá del espacio y detente.', 'Pon R y gira el volante hacia el espacio mientras retrocedes.', 'Endereza al quedar alineado y pon P.'] },
      { n: 'En paralelo', goal: 'Estaciona en el espacio junto a la vereda, entre dos autos.', how: ['Ponte al lado del auto de adelante, a un metro de distancia.', 'Pon R y retrocede con el volante a la derecha.', 'Cuando el auto quede inclinado, gira el volante a la izquierda.', 'Endereza, acomódate y pon P.'] },
      { n: 'Slalom de conos', goal: 'Zigzaguea entre los conos sin tocarlos y llega a la meta.', how: ['Pasa el primer cono por la izquierda, el segundo por la derecha, y así.', 'Ve despacio y anticipa el giro.'] },
    ],
    create,
  });
})();
