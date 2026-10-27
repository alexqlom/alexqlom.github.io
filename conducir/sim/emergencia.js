// Simulador de vehículo de emergencia (licencia F): sirena, balizas, adelantar, cruces con luz roja, taco y vuelta a las normas.
(function () {
  const RB = window.RB, U = RB.simU, Dr = RB.simDraw;
  const { clamp, kmh, flow } = U;
  const CL = 4.8, CW = 1.9, HL = 2.2, HW = 0.9; // ambulancia y autos (medias medidas de los autos)
  const RL = [1.75, 5.25], PULL = 5.75; // pistas de la calzada y posición de un auto orillado

  function create(api, mi) {
    const MS = MISSIONS[mi], ui = api.ui, mk = ui.mk, P = api.panel;
    const LN = MS.lanes || RL, lights = MS.lights || [];
    const c = { s: 0, lane: LN.length - 1, v: 0, ang: 0, siren: !!MS.sirenOn, lights: !!MS.sirenOn, late: 0 };
    c.x = LN[c.lane];
    const T = { cars: MS.cars.map(([s, lane]) => ({ s, lane, x: RL[lane], v: MS.cv, vmax: MS.cv })), cross: [], on: [], lt: {}, onT: 1.5, zoom: 24 };
    lights.forEach(L => { T.lt[L] = { st: 'g', t: 0, stopT: 0, cross: 0, side: 0 }; });
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    const sir = ui.btn(top, 'Sirena', { ic: 'siren', toggle: true, on: c.siren, key: 'x', onPress: o => { c.siren = o.on; api.snd.siren(o.on); } });
    const bal = ui.btn(top, 'Balizas', { ic: 'light', toggle: true, on: c.lights, key: 'z', onPress: o => { c.lights = o.on; } });
    ui.btn(top, 'Pista izq.', { ic: 'left', key: 'ArrowLeft', onPress: () => { c.lane = Math.max(0, c.lane - 1); } });
    ui.btn(top, 'Pista der.', { ic: 'right', key: 'ArrowRight', onPress: () => { c.lane = Math.min(LN.length - 1, c.lane + 1); } });
    const info = mk('div', 'sp-sp sp-info');
    main.appendChild(info);
    const brk = ui.pedal(main, 'Freno', { cls: 'brake', key: 'ArrowDown', kv: 0.8 });
    const gas = ui.pedal(main, 'Acelerador', { cls: 'gas', key: 'ArrowUp', kv: 0.6 });
    const emergency = () => c.siren && c.lights;
    const yielding = () => emergency() && !MS.normal;
    const front = () => c.s + CL / 2;
    const hitUs = (x, s, hx, hs) => Math.abs(x - c.x) < hx + CW / 2 && Math.abs(s - c.s) < hs + CL / 2;
    const steps = flow(api, MS.steps(c, T, front));

    // Semáforos de tu calle: cambian a rojo cuando te acercas.
    function lightsUpdate(dt) {
      lights.forEach(L => {
        const lt = T.lt[L], f = front();
        lt.t += dt;
        if (lt.st === 'g' && !lt.done && f > L - (MS.normal ? 45 : 75)) { lt.st = 'y'; lt.t = 0; }
        else if (lt.st === 'y' && lt.t > (MS.normal ? 2.5 : 2)) { lt.st = 'r'; lt.t = 0; }
        else if (lt.st === 'r') {
          if (MS.normal) {
            if (c.v < 0.3 && f > L - 45 && f < L + 0.5) lt.stopT += dt;
            if (lt.stopT > 3 && !lt.allRed) { lt.allRed = true; lt.t = 0; }
            if (lt.allRed && lt.t > 2) { lt.st = 'g'; lt.done = true; lt.allRed = false; }
          } else if (c.s - CL / 2 > L + 25) { lt.st = 'g'; lt.done = true; }
        }
        if (!lt.crossed && f > L + 0.5) {
          lt.crossed = true;
          const sp = kmh(c.v);
          if (lt.st === 'r') {
            if (MS.normal) api.fail('Cruzaste con luz roja.', 'Sin emergencia, rigen las mismas normas que para todos: con luz roja te detienes.');
            else if (!emergency()) api.fail('Cruzaste con luz roja sin sirena ni balizas.', 'Solo en una emergencia, con sirena y balizas encendidas, puedes pasar con luz roja y con precaución.');
            else if (sp > 25) api.penalty('rojo' + L, `Cruzaste con luz roja a ${sp} km/h: en emergencia, reduce casi hasta detenerte y mira.`, 20);
            else api.say('Bien: cruzaste despacio y mirando.', 'ok');
          }
        }
      });
    }

    // Tránsito de las calles que cruzan: pasa con su luz verde y se detiene al ver la sirena (casi siempre).
    function crossUpdate(dt) {
      lights.forEach(L => {
        const lt = T.lt[L], f = front();
        if (lt.st === 'r' && !lt.allRed && f > L - 120 && f < L + 5) {
          lt.cross -= dt;
          if (lt.cross <= 0) {
            lt.cross = 2.6; lt.side = 1 - lt.side;
            const dir = lt.side ? -1 : 1;
            if (!(dir > 0 && MS.deaf === L)) T.cross.push({ L, dir, x: dir > 0 ? -46 : 49, v: 11, vmax: 11, sy: L + (dir > 0 ? 3 : 7) });
          }
        }
        if (MS.deaf === L && !lt.deafGo && f > L - 38) { lt.deafGo = true; T.cross.push({ L, dir: 1, x: -40, v: 12, vmax: 12, sy: L + 3, deaf: true }); }
      });
      T.cross.forEach(o => {
        const lt = T.lt[o.L], p = o.x * o.dir, fr = p + HL;
        let gap = Infinity;
        T.cross.forEach(q => { if (q !== o && q.L === o.L && q.dir === o.dir && q.x * q.dir > p) gap = Math.min(gap, q.x * q.dir - HL - fr); });
        const seeUs = yielding() && front() > o.L - 60 && c.s - CL / 2 < o.L + 9;
        const mustStop = !o.deaf && (lt.st !== 'r' || lt.allRed || seeUs);
        const line = o.dir > 0 ? -4 : -7.5;
        if (mustStop && fr < line + 0.3) gap = Math.min(gap, line - fr + 2.5);
        const target = clamp((gap - 2.5) * 1.1, 0, o.vmax);
        o.v += clamp(target - o.v, -8 * dt, 3 * dt);
        o.x += o.v * o.dir * dt;
        if (hitUs(o.x, o.sy, HL, HW)) api.fail('Chocaste en el cruce.', 'Aunque tengas sirena y balizas, los demás pueden no verte ni oírte: reduce casi hasta detenerte y mira antes de cruzar.');
        if (o.deaf && !o.told && o.x > 10) { o.told = true; api.say('Ese conductor no escuchó la sirena: por eso hay que mirar antes de cruzar.', 'ok', 3.5); }
      });
      T.cross = T.cross.filter(o => Math.abs(o.x) < 52);
    }

    // Autos de tu sentido: con sirena y balizas se orillan a la derecha y se detienen; en el taco abren un corredor.
    function carsUpdate(dt) {
      const busy = (o, x, ds) => T.cars.some(q => q !== o && Math.abs(q.x - x) < 2 && Math.abs(q.s - o.s) < ds) || (Math.abs(c.x - x) < 2.2 && Math.abs(c.s - o.s) < ds + 1);
      T.cars.forEach(o => {
        const ahead = o.s - c.s, yieldNow = yielding() && ahead > 0 && ahead < (MS.jam ? 40 : 70);
        let tx;
        if (MS.jam) {
          if (yieldNow) o.aside = true; else if (ahead < -6) o.aside = false;
          tx = o.aside ? (o.lane ? 6.1 : 0.95) : RL[o.lane];
        } else {
          if (yieldNow && !o.pull && (o.lane === 1 || !busy(o, PULL, 7))) { o.pull = true; o.lane = 1; }
          if (o.pull && ahead < -8) o.pull = false;
          tx = o.pull ? PULL : RL[o.lane];
        }
        o.x += clamp(tx - o.x, -1.6 * dt, 1.6 * dt);
        const stop = MS.jam ? o.aside : o.pull, vmax = stop ? 0 : yieldNow ? 4 : o.vmax, fr = o.s + HL;
        let gap = Infinity;
        T.cars.forEach(q => { if (q !== o && q.s > o.s && Math.abs(q.x - o.x) < 2) gap = Math.min(gap, q.s - HL - fr); });
        if (c.s > o.s && Math.abs(c.x - o.x) < 2.1) gap = Math.min(gap, c.s - CL / 2 - fr);
        if (MS.jam) gap = Math.min(gap, MS.jamEnd - fr);
        if (!yieldNow) lights.forEach(L => {
          const lt = T.lt[L];
          if (lt.st !== 'g' && fr < L) { const d = L - 0.5 - fr; if (!(lt.st === 'y' && d < 7)) gap = Math.min(gap, d + 2.5); }
        });
        const target = clamp(gap - 2.5, 0, vmax);
        o.v += clamp(target - o.v, -7 * dt, 2.5 * dt);
        o.s += o.v * dt;
        if (hitUs(o.x, o.s, HW, HL)) api.fail('Chocaste con un vehículo.', MS.jam ? 'En un taco, avanza despacio solo por el espacio que te abren.' : 'Adelanta por la izquierda y solo cuando los demás te hayan dado espacio.');
      });
      T.cars = T.cars.filter(o => o.s < c.s + 260 && o.s > c.s - 90);
    }

    // Autos que vienen de frente por la otra pista (respetan su semáforo, que cambia junto con el tuyo).
    function oncomingUpdate(dt) {
      T.onT -= dt;
      if (T.onT <= 0) { T.onT = 4 + (T.on.length % 3) * 1.4; const s = c.s + 150; if (!T.on.some(o => Math.abs(o.s - s) < 15)) T.on.push({ s, x: -1.75, v: 9 }); }
      T.on.forEach(o => {
        const p = -o.s, fr = p + HL;
        let gap = Infinity;
        T.on.forEach(q => { if (q !== o && -q.s > p) gap = Math.min(gap, -q.s - HL - fr); });
        lights.forEach(L => {
          const lt = T.lt[L], line = -(L + 9.5);
          if (lt.st !== 'g' && fr < line) { const d = line - fr; if (!(lt.st === 'y' && d < 7)) gap = Math.min(gap, d + 2.5); }
        });
        const em = yielding() && o.s > c.s && o.s - c.s < 70;
        o.x += clamp((em ? -2.6 : -1.75) - o.x, -1.2 * dt, 1.2 * dt);
        o.v += clamp(clamp(gap - 2.5, 0, em ? 3 : 9) - o.v, -7 * dt, 2.5 * dt);
        o.s -= o.v * dt;
      });
      T.on = T.on.filter(o => o.s > c.s - 70);
    }

    function pedUpdate(dt) {
      const f = front();
      if (!T.ped) T.ped = { x: 8, go: false };
      const p = T.ped;
      if (!p.go && f < MS.ped && f > MS.ped - 70 && (MS.ped - f) / Math.max(c.v, 1) < 4.5) p.go = true;
      if (p.go && p.x > -6) p.x -= 1.3 * dt;
      if (p.x > -5 && hitUs(p.x, MS.ped + 1.5, 0.35, 0.35)) api.fail('Atropellaste a un peatón.', 'Las personas pueden no oír la sirena: atento a los pasos de cebra, sobre todo si hay vehículos detenidos que las tapan.');
      if (p.go && !p.told && c.s - CL / 2 > MS.ped + 3) { p.told = true; api.say('Bien: las personas pueden no oír la sirena.', 'ok'); }
    }

    return {
      ctl: { gas, brk, sir, bal }, c, T,
      start() { if (c.siren) api.snd.siren(true); },
      update(dt) {
        const m = 2600, F = gas.v * 9500 * Math.max(0.12, 1 - c.v / 36), Fb = brk.v * 22000;
        c.v = Math.max(0, c.v + (F - Fb - (c.v > 0.05 ? 250 : 0) - 0.9 * c.v * c.v) / m * dt);
        c.s += c.v * dt;
        const tx = LN[c.lane], lat = 2 * Math.min(1, c.v / 3 + 0.25);
        c.x += clamp(tx - c.x, -lat * dt, lat * dt);
        c.ang = clamp((tx - c.x) * 0.15, -0.3, 0.3) * Math.min(1, c.v / 4);
        T.zoom += (24 + c.v * 0.8 - T.zoom) * Math.min(1, dt * 1.2);
        lightsUpdate(dt);
        crossUpdate(dt);
        carsUpdate(dt);
        oncomingUpdate(dt);
        if (MS.ped != null) pedUpdate(dt);
        const sp = kmh(c.v);
        if (MS.normal) {
          if (sp > MS.limit + 4) api.penalty('speed', `Sin emergencia, el máximo aquí es ${MS.limit} km/h.`, 15);
          if (c.s > 15 && (c.siren || c.lights)) api.penalty('sirena', 'Seguiste con sirena o balizas cuando ya no había emergencia.', 15);
        } else {
          if (sp > 90) api.penalty('veloz', 'Manejaste a más de 90 km/h en la ciudad: el riesgo es muy alto.', 15);
          if (MS.jam && sp > 30 && c.s > 20 && front() < MS.jamEnd) api.penalty('taco', 'En un taco, avanza despacio por el espacio que te abren, sin presionar a nadie.', 15);
          if (c.s > 10 && !emergency()) { c.late += dt; if (c.late > 3) api.penalty('nosir', 'En una emergencia, usa sirena y balizas para que te vean y te escuchen.', 15); }
        }
        if (MS.jam && front() > MS.cones + 0.2) api.fail('Chocaste los conos del accidente.', 'Detente antes de la zona señalizada.');
        if (MS.over != null && front() > MS.over) api.fail(MS.normal ? 'Te pasaste de la base.' : 'Te pasaste del lugar de la emergencia.', 'Reduce con tiempo para detenerte en el lugar indicado.');
        api.snd.engine(800 + gas.v * 2200 + c.v * 40, gas.v, true, 30);
        const d = Math.max(0, Math.round(MS.goal - front()));
        info.innerHTML = `<b>${d} m</b><small>${MS.to}</small>${MS.target ? `<b>${Math.floor(api.t)} s</b><small>tiempo</small>` : ''}`;
        if (steps.update()) {
          const late = MS.target ? Math.max(0, Math.round(api.t - MS.target)) : 0;
          api.win({ pts: Math.max(60, 100 - late), notes: MS.target ? [`Llegaste en ${Math.round(api.t)} s${late ? ` (${late} s más de lo ideal)` : ''}.`] : [] });
        }
      },
      draw(g, W, H) {
        const K = W / T.zoom, ox = W / 2 - 1.75 * K, oy = H * 0.74;
        const X = x => ox + x * K, Y = s => oy - (s - c.s) * K, topS = c.s + oy / K + 3, botS = c.s - (H - oy) / K - 3;
        const vis = s => s > botS - 10 && s < topS + 10;
        g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#121212'; g.fillRect(0, 0, X(-6.5), H); g.fillRect(X(10), 0, W - X(10), H);
        g.fillStyle = '#191919'; g.fillRect(X(-6.5), 0, 3 * K, H); g.fillRect(X(7), 0, 3 * K, H);
        g.fillStyle = '#232323'; g.fillRect(X(-3.5), 0, 10.5 * K, H);
        g.fillStyle = '#e6e6e6';
        for (let s = Math.floor(botS / 6) * 6; s < topS; s += 6) g.fillRect(X(3.5) - 1, Y(s + 3), 2, 3 * K);
        g.fillRect(X(0) - 3, 0, 2, H); g.fillRect(X(0) + 1, 0, 2, H);
        lights.forEach(L => {
          if (!vis(L)) return;
          g.fillStyle = '#232323'; g.fillRect(0, Y(L + 9), W, 8 * K);
          g.fillStyle = '#e6e6e6'; g.fillRect(X(0), Y(L) - 2, 7 * K, 4); g.fillRect(X(-3.5), Y(L + 10) - 2, 3.5 * K, 4);
          g.fillRect(X(-4) - 2, Y(L + 5), 4, 4 * K); g.fillRect(X(7.5) - 2, Y(L + 9), 4, 4 * K);
          const lt = T.lt[L], x = X(7.9), y = Y(L - 0.6);
          g.fillStyle = '#000'; Dr.rr(g, x - K * 0.45, y - K * 1.3, K * 0.9, K * 2.6, 4); g.fill();
          [['r', '#ff2a1f', -0.8], ['y', '#ffb000', 0], ['g', '#2fd16b', 0.8]].forEach(([k, col, dy]) => { g.fillStyle = lt.st === k ? col : '#262626'; g.beginPath(); g.arc(x, y + dy * K, K * 0.3, 0, 7); g.fill(); });
        });
        if (MS.ped != null && vis(MS.ped)) {
          g.fillStyle = '#e6e6e6';
          for (let x = -3.2; x < 6.8; x += 0.9) g.fillRect(X(x), Y(MS.ped + 3), 0.45 * K, 3 * K);
          if (T.ped && T.ped.x > -6) { g.fillStyle = '#ffd7a8'; g.beginPath(); g.arc(X(T.ped.x), Y(MS.ped + 1.5), Math.max(3, 0.36 * K), 0, 7); g.fill(); }
        }
        if (MS.jam && vis(MS.cones)) {
          for (let x = 2.4; x < 7; x += 1.1) { g.fillStyle = '#ff7a00'; g.beginPath(); g.moveTo(X(x), Y(MS.cones + 0.5)); g.lineTo(X(x) - 0.3 * K, Y(MS.cones - 0.2)); g.lineTo(X(x) + 0.3 * K, Y(MS.cones - 0.2)); g.fill(); }
          Dr.car(g, X(5.0), Y(MS.cones + 6), 0.5, 4.4 * K, 1.8 * K, '#6b6b6b'); Dr.car(g, X(3.2), Y(MS.cones + 10), -0.9, 4.4 * K, 1.8 * K, '#8a8a8a');
          Dr.text(g, 'ACCIDENTE', X(4.6), Y(MS.cones + 2.6), Math.max(10, K * 0.6), '#ffb000');
        }
        if (MS.zone && vis(MS.zone[0])) {
          const [s0, s1, x0, x1, label] = MS.zone;
          g.strokeStyle = '#E10600'; g.lineWidth = 2; g.setLineDash([6, 5]); g.strokeRect(X(x0), Y(s1), (x1 - x0) * K, (s1 - s0) * K); g.setLineDash([]);
          Dr.text(g, label, X((x0 + x1) / 2), Y((s0 + s1) / 2), Math.max(10, K * 0.55), '#ff6b63');
        }
        T.on.forEach(o => { if (vis(o.s)) Dr.car(g, X(o.x), Y(o.s), Math.PI, 4.4 * K, 1.8 * K, '#cfcfcf'); });
        T.cars.forEach(o => { if (vis(o.s)) Dr.car(g, X(o.x), Y(o.s), 0, 4.4 * K, 1.8 * K, '#8f8f8f', { brake: o.v < o.vmax - 0.5 }); });
        T.cross.forEach(o => { if (vis(o.sy)) Dr.car(g, X(o.x), Y(o.sy), o.dir > 0 ? Math.PI / 2 : -Math.PI / 2, 4.4 * K, 1.8 * K, o.deaf ? '#d9d9d9' : '#a6a6a6'); });
        const flash = c.lights && Math.floor(performance.now() / 180) % 2;
        if (c.lights) { g.fillStyle = flash ? 'rgba(255,42,31,.13)' : 'rgba(47,107,255,.13)'; g.beginPath(); g.arc(X(c.x), Y(c.s), 6 * K, 0, 7); g.fill(); }
        Dr.car(g, X(c.x), Y(c.s), c.ang, CL * K, CW * K, '#f2f2f2', { brake: brk.v > 0.05, beacon: c.lights ? (flash ? '#ff2a1f' : '#2f6bff') : '#5a5a5a' });
        g.save(); g.translate(X(c.x), Y(c.s)); g.rotate(c.ang); g.fillStyle = '#E10600';
        g.fillRect(-0.12 * K, 0.35 * K, 0.24 * K, 0.8 * K); g.fillRect(-0.4 * K, 0.63 * K, 0.8 * K, 0.24 * K);
        g.restore();
        const r = Math.min(38, W * 0.095);
        Dr.gauge(g, r + 12, H - r - 10, r, kmh(c.v), 0, 120, 'km/h');
      },
    };
  }

  const MISSIONS = [
    {
      n: 'Llamado urgente', goal: 'Llega a la emergencia con sirena y balizas: adelanta con cuidado y cruza los semáforos en rojo con precaución.',
      how: ['Enciende la sirena y las balizas.', 'Los autos se orillarán a la derecha: adelántalos por la pista izquierda.', 'Con luz roja, reduce casi hasta detenerte y mira a ambos lados antes de pasar.'],
      cars: [[35, 1], [62, 0], [98, 1], [140, 1], [168, 0], [235, 1], [268, 0], [340, 1], [372, 0], [455, 1]], cv: 8,
      lights: [180, 420], deaf: 180, ped: 300, goal: 520, to: 'a la emergencia', target: 75, over: 560,
      zone: [520, 532, 0.2, 7, 'EMERGENCIA'],
      steps: (c, T, front) => [
        { t: 'Enciende la sirena y las balizas.', ok: () => c.siren && c.lights },
        { t: 'Avanza: adelanta por la pista izquierda a los autos que se orillan.', ok: () => c.s > 110 },
        { t: 'Semáforo en rojo: reduce bajo 25 km/h, mira a ambos lados y cruza con precaución.', ok: () => front() > 192 },
        { t: 'Atento: más adelante hay un paso de cebra.', ok: () => c.s > 306 },
        { t: 'Otro cruce en rojo: reduce y mira antes de pasar.', ok: () => front() > 432 },
        { t: 'Llega al lugar de la emergencia y detente dentro del recuadro.', ok: () => front() > 521 && front() < 532 && c.v < 0.2 },
      ],
    },
    {
      n: 'Tránsito pesado', goal: 'Cruza un taco hasta un accidente: los autos te abren un corredor al centro.',
      how: ['Enciende la sirena y las balizas.', 'Los autos se mueven hacia los costados: ubícate al centro y avanza despacio.', 'En un taco, no pases de 30 km/h ni presiones a nadie.'],
      lanes: [1.75, 3.5, 5.25], jam: true, jamEnd: 236, cones: 240, goal: 236, to: 'al accidente', over: 999,
      cars: [...Array(23)].flatMap((_, k) => [[26 + 9 * k, 0], [30.5 + 9 * k, 1]]), cv: 0.8,
      zone: [226, 239, 2.3, 4.7, 'DETENTE'],
      steps: (c, T, front) => [
        { t: 'Enciende la sirena y las balizas.', ok: () => c.siren && c.lights },
        { t: 'Los autos se abren hacia los costados: ponte al centro (Pista izq.) y avanza despacio.', ok: () => c.lane === 1 && c.s > 40 },
        { t: 'Sigue por el corredor, bajo 30 km/h.', ok: () => c.s > 190 },
        { t: 'Detente antes de los conos del accidente.', ok: () => front() > 226 && c.v < 0.2 },
      ],
    },
    {
      n: 'Fin de la emergencia', goal: 'La emergencia terminó: apaga la sirena y las balizas y vuelve a la base respetando todas las normas.',
      how: ['Sin emergencia, rigen las mismas normas que para todos.', 'La velocidad máxima es 50 km/h.', 'Con luz roja te detienes y esperas la verde.'],
      cars: [[30, 1], [58, 0], [96, 1], [128, 0], [170, 1], [205, 0]], cv: 10,
      lights: [160], normal: true, limit: 50, sirenOn: true, goal: 292, to: 'a la base', over: 330,
      zone: [292, 301, 3.6, 6.9, 'BASE'],
      steps: (c, T, front) => [
        { t: 'La emergencia terminó: apaga la sirena y las balizas.', ok: () => !c.siren && !c.lights },
        { t: 'Vuelve a la base: máximo 50 km/h y respeta el semáforo.', ok: () => c.s > 172 },
        { t: 'Ponte en la pista derecha y detente en el recuadro de la base.', ok: () => c.lane === 1 && Math.abs(c.x - 5.25) < 0.3 && front() > 293 && front() < 301 && c.v < 0.2 },
      ],
    },
  ];

  RB.sim({
    id: 'emergencia', name: 'Vehículo de emergencia', short: 'Sirena, balizas, cruces y tacos.', ic: 'siren', lic: ['F', 'A2', 'A3'],
    desc: 'Conduce un vehículo de emergencia: usa sirena y balizas, adelanta cuando te dan espacio, cruza los semáforos con precaución, avanza por un taco y vuelve a las normas al terminar.',
    tips: ['La sirena y las balizas piden el paso, pero no lo garantizan.', 'Con luz roja, reduce casi hasta detenerte y mira a ambos lados.', 'Cuando termina la emergencia, apágalas y respeta todas las normas.'],
    missions: MISSIONS, create,
  });
})();
