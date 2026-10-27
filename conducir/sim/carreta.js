// Simulador de carreta (licencia E): riendas, ritmo del caballo, señales con el brazo, cansancio, agua y normas del camino.
(function () {
  const RB = window.RB, U = RB.simU, Dr = RB.simDraw;
  const { clamp, flow } = U;
  const SPEED = [0, 1.5, 3.4], PACE = ['Detenido', 'Al paso', 'Al trote'];
  const FRONT = 3.3, BACK = 2.9, HALF = 1.0; // nariz del caballo y fondo de la carreta respecto de c.s, y media anchura
  const DRAIN = [-0.012, 0.004, 0.015]; // energía por segundo según el ritmo (negativo: descansa)
  const SIG = { L: 'Señal: viro a la izquierda (brazo extendido)', R: 'Señal: viro a la derecha (brazo hacia arriba)', S: 'Señal: me detengo (brazo hacia abajo)' };
  const LANE_X = 1.6, BERM = 3.65; // auto en la pista derecha; desde BERM la carreta deja pasar

  function create(api, mi) {
    const MS = MISSIONS[mi], ui = api.ui, mk = ui.mk, P = api.panel;
    const c = { s: 0, x: 2.5, v: 0, ang: 0, lvl: 0, energy: MS.energy || 1, lamp: false, arm: null, armT: 0, drank: false, leftT: 0, beat: 0, berm: false };
    const T = { cars: [], on: [], xc: [], onT: 3, xT: 0, xs: 0, sig: { L: -99, R: -99, S: -99 }, qT: 0, waitT: 0 };
    const nose = () => c.s + FRONT;
    const top = mk('div', 'sp-top'), main = mk('div', 'sp-main');
    P.append(top, main);
    ui.btn(top, 'Farol', { ic: 'sun', toggle: true, key: 'f', onPress: o => { c.lamp = o.on; } });
    ui.btn(top, 'Dar agua', { ic: 'heart', key: 'g', onPress: () => water() });
    const arms = {};
    const setArm = k => {
      c.arm = k; c.armT = 0;
      Object.keys(arms).forEach(n => arms[n].setOn(n === k));
      if (k) { T.sig[k] = api.t; api.say(SIG[k], 'ok', 1.8); }
    };
    [['L', 'Señal izq.', 'left', 'q'], ['R', 'Señal der.', 'right', 'e'], ['S', 'Señal parar', 'down', 's']].forEach(([k, label, ic, key]) => {
      arms[k] = ui.btn(top, label, { ic, toggle: true, key, onPress: o => setArm(o.on ? k : null) });
    });
    const water = () => {
      if (Math.abs(c.v) > 0.05) { api.say('Detén la carreta para darle agua al caballo.', 'bad'); return; }
      if (MS.trough == null || Math.abs(c.s - MS.trough) > 6 || c.x < 3.3) { api.say('Oríllate y detente junto al bebedero.', 'bad'); return; }
      c.energy = 1; c.drank = true; api.say('El caballo tomó agua y descansó.', 'ok');
    };
    const rl = ui.pedal(main, 'Rienda izq.', { cls: 'clutch', key: 'ArrowLeft', kv: 0.8, hint: 'mantén' });
    const col = mk('div', 'sp-col sp-voice');
    main.appendChild(col);
    const arre = ui.btn(col, '¡Arre!', { key: 'ArrowUp', onPress: () => {
      if (c.energy < 0.06) { api.say('El caballo está agotado: déjalo descansar y dale agua.', 'bad'); return; }
      if (c.lvl < 2) { c.lvl++; api.snd.tone(760, 0.07, 'sine', 0.05); }
    } });
    const so = ui.btn(col, '¡So!', { key: 'ArrowDown', onPress: () => { if (c.lvl > 0) { c.lvl--; api.snd.tone(380, 0.09, 'sine', 0.05); } } });
    const info = mk('div', 'sp-sp sp-info');
    main.appendChild(info);
    const rr = ui.pedal(main, 'Rienda der.', { cls: 'clutch', key: 'ArrowRight', kv: 0.8, hint: 'mantén' });
    // ¿Toca la carreta (con el caballo) a un auto centrado en (x, s) con medias medidas hx, hs?
    const hitCart = (x, s, hx, hs) => Math.abs(x - c.x) < hx + HALF && Math.abs(s - (c.s + (FRONT - BACK) / 2)) < hs + (FRONT + BACK) / 2;
    const steps = flow(api, MS.steps(c, T));

    function pare(dt) {
      const atLine = Math.abs(c.v) < 0.05 && nose() > MS.pare - 4 && nose() < MS.pare + 0.3;
      if (!T.pareDone) {
        if (atLine) {
          T.pareDone = true;
          if (api.t - T.sig.S > 6) api.penalty('senalS', 'Al detenerte, haz la señal con el brazo hacia abajo (Señal parar).', 10);
          else api.say('Bien: te detuviste y señalizaste.', 'ok');
        } else if (nose() > MS.pare + 0.5) { T.pareDone = true; api.penalty('pare', 'No te detuviste en el PARE.', 25); }
      }
      if (atLine) T.waitT += dt;
      if (nose() > MS.pare + 9) T.pastPare = true;
      // tránsito por la otra vía: pasa mientras te acercas y deja de venir cuando llevas un rato detenido
      if (!T.pastPare && nose() > MS.pare - 30 && T.waitT < 2.5) {
        T.xT -= dt;
        if (T.xT <= 0) { T.xT = 3.2; T.xs = 1 - T.xs; const dir = T.xs ? 1 : -1; T.xc.push({ dir, x: dir > 0 ? -34 : 34, sy: MS.pare + (dir > 0 ? 3 : 7), v: 9 }); }
      }
      T.xc.forEach(o => {
        o.x += o.v * o.dir * dt;
        if (hitCart(o.x, o.sy, 2.2, 0.9)) api.fail('Chocaste con un auto en el cruce.', 'En un PARE te detienes, miras a ambos lados y cedes el paso antes de avanzar.');
      });
      T.xc = T.xc.filter(o => Math.abs(o.x) < 36);
    }

    function zebra(dt) {
      if (!T.ped) T.ped = { x: 5.8, go: false };
      const p = T.ped;
      if (!p.go && nose() > MS.cross - 12) p.go = true;
      if (p.go && p.x > -6) p.x -= 0.8 * dt;
      const crossing = p.go && p.x > -0.8 && p.x < 5.6;
      if (crossing && c.v > 0.1 && nose() > MS.cross - 0.3 && c.s - BACK < MS.cross + 3) api.fail('No le cediste el paso a la persona en el paso de cebra.', 'En un paso de cebra, el peatón tiene preferencia: detente y espera a que cruce.');
      if (p.go && !p.told && c.s - BACK > MS.cross + 3) { p.told = true; api.say('Bien: cediste el paso en el paso de cebra.', 'ok'); }
    }

    // Autos que alcanzan a la carreta: se forma una fila hasta que te orillas a la berma.
    function queue(dt) {
      if (!T.cars.length && !T.carsGone && c.s > MS.cars) T.cars = [{ s: c.s - 35, x: LANE_X, v: 9 }, { s: c.s - 47, x: LANE_X, v: 9 }];
      if (!T.cars.length) return;
      const free = c.x > BERM;
      T.cars.forEach((o, i) => {
        const lead = T.cars[i - 1];
        let gap = lead ? lead.s - o.s - 4.4 : Infinity, vmax = 9;
        if (o.ovt) {
          // adelantamiento por la pista contraria: primero sale de la fila, después acelera
          o.x += clamp((o.s > c.s + 12 ? LANE_X : -1.75) - o.x, -3 * dt, 3 * dt);
          vmax = o.x > 0.2 && o.s < c.s ? Math.max(c.v, 1) : 12;
          if (o.x < 0.2) gap = Infinity;
        } else if (!free && o.s < c.s) gap = Math.min(gap, c.s - BACK - (o.s + 2.2));
        const target = clamp((gap - 3) * 0.8, 0, vmax);
        o.v += clamp(target - o.v, -6 * dt, 2.5 * dt);
        o.s += o.v * dt;
        if (hitCart(o.x, o.s, 0.9, 2.2)) api.fail('Chocaste con un auto.', 'Antes de volver a la pista, haz la señal y mira que no venga nadie.');
      });
      const first = T.cars[0], waiting = !free && !first.ovt && first.s < c.s && c.s - BACK - (first.s + 2.2) < 12;
      T.queued = waiting;
      if (waiting) {
        T.qT += dt;
        if (T.qT > 20 && !T.on.some(o => o.s > c.s - 10 && o.s < c.s + 90)) {
          api.penalty('fila', 'No dejaste pasar a la fila de autos: oríllate a la berma para facilitar el adelantamiento.', 15);
          T.cars.forEach(o => { o.ovt = true; }); T.onT = 15;
        }
      }
      if (!T.carsGone && T.cars.every(o => o.s - 2.2 > nose() + 6)) T.carsGone = true;
      T.cars = T.cars.filter(o => o.s < c.s + 80);
    }

    function oncoming(dt) {
      T.onT -= dt;
      if (T.onT <= 0 && !T.cars.some(o => o.ovt && o.s < c.s + 12)) { T.onT = 6 + (T.on.length % 3) * 1.5; T.on.push({ s: c.s + 75, x: -1.75, v: 12 }); }
      T.on.forEach(o => { o.s -= o.v * dt; });
      T.on = T.on.filter(o => o.s > c.s - 40);
    }

    return {
      ctl: { rl, rr, arre, so }, c, T, water, setArm,
      update(dt) {
        // el caballo responde con suavidad al ritmo pedido
        c.v += clamp(SPEED[c.lvl] - c.v, -1.6 * dt, 0.9 * dt);
        c.s += c.v * dt;
        const steer = (rr.v - rl.v) * 1.1, k = Math.min(1, c.v / 1.5);
        c.x = clamp(c.x + steer * k * dt, -2.8, 4.6);
        c.ang = steer * k * 0.25;
        if (c.v > 0.2) { c.beat += c.v * dt; if (c.beat > (c.lvl === 2 ? 0.85 : 0.75)) { c.beat = 0; api.snd.tone(c.lvl === 2 ? 520 : 430, 0.03, 'square', 0.02); } }
        // la señal con el brazo se mantiene unos segundos y se baja sola
        if (c.arm) { c.armT += dt; T.sig[c.arm] = api.t; if (c.armT > 5) setArm(null); }
        // energía del caballo
        c.energy = clamp(c.energy - DRAIN[c.lvl] * dt * (c.lvl ? MS.tire || 1 : 1), 0, 1);
        if (c.energy < 0.3 && !T.tired) { T.tired = true; api.say('El caballo está cansado: llévalo al paso y busca agua.', 'bad', 3.2); }
        if (c.energy > 0.5) T.tired = false;
        if (c.energy <= 0 && c.lvl > 0) { c.lvl = 0; api.penalty('agotado', 'Forzaste al caballo hasta agotarlo.', 15); }
        // normas del camino
        if (c.v > 0.3 && c.x < 1.6) { c.leftT += dt; if (c.leftT > 2.5) api.penalty('izq', 'Te alejaste de la derecha: la carreta circula por el costado derecho del camino.', 15); } else c.leftT = 0;
        if (c.x < -0.4 && c.v > 0.3) api.fail('Te fuiste a la pista contraria.', 'La carreta circula siempre por la derecha del camino.');
        if (!c.berm && c.x > BERM) {
          c.berm = true;
          if (T.cars.length && !T.carsGone && api.t - T.sig.R > 5) api.penalty('senalR', 'Antes de orillarte, haz la señal a la derecha (brazo hacia arriba).', 10);
        } else if (c.berm && c.x < 3.0) {
          c.berm = false;
          if (api.t - T.sig.L > 5) api.penalty('senalL', 'Antes de volver a la pista, haz la señal a la izquierda (brazo extendido).', 10);
        }
        if (MS.pare != null) pare(dt);
        if (MS.cross != null) zebra(dt);
        if (MS.cars != null) { queue(dt); oncoming(dt); }
        if (MS.trough != null && !c.drank && !T.noWater && c.s > MS.trough + 12) { T.noWater = true; api.penalty('agua', 'No le diste agua al caballo cansado.', 15); }
        if (MS.night != null && c.s > MS.night && !c.lamp) api.penalty('farol', 'De noche, la carreta debe llevar luces o elementos reflectantes.', 20);
        info.innerHTML = `<b>${PACE[c.lvl]}</b><small>ritmo</small><b>${Math.round(c.energy * 100)}%</b><small>energía</small>`;
        if (steps.update()) api.win({ notes: [`Energía del caballo al llegar: ${Math.round(c.energy * 100)}%.`] });
      },
      draw(g, W, H) {
        const K = W / 22, ox = W / 2 - 1.2 * K, oy = H * 0.66;
        const X = x => ox + x * K, Y = s => oy - (s - c.s) * K, topS = c.s + oy / K + 3, botS = c.s - (H - oy) / K - 3;
        const dot = (x, y, r) => { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); };
        g.fillStyle = '#0b100b'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#152215';
        for (let s = Math.floor(botS / 9) * 9; s < topS; s += 9) {
          const h = Math.abs(Math.sin(s * 12.9898) * 43758.5453) % 1;
          dot(X(-7.2 - h * 2), Y(s), (0.9 + h * 0.6) * K); dot(X(7.6 + h * 2), Y(s + 4), (0.8 + h * 0.5) * K);
        }
        g.fillStyle = '#3a3428'; g.fillRect(X(-5.3), 0, 1.8 * K, H); g.fillRect(X(3.5), 0, 1.8 * K, H);
        g.fillStyle = '#2a2a26'; g.fillRect(X(-3.5), 0, 7 * K, H);
        g.fillStyle = '#e6e6e6';
        for (let s = Math.floor(botS / 6) * 6; s < topS; s += 6) g.fillRect(X(0) - 1, Y(s + 3), 2, 3 * K);
        g.globalAlpha = 0.5; g.fillRect(X(3.5) - 1, 0, 2, H); g.fillRect(X(-3.5) - 1, 0, 2, H); g.globalAlpha = 1;
        if (MS.pare != null) {
          g.fillStyle = '#2a2a26'; g.fillRect(0, Y(MS.pare + 9), W, 8 * K);
          g.fillStyle = '#e6e6e6'; g.fillRect(X(0), Y(MS.pare) - 2, 3.5 * K, 4);
          const x = X(4.6), y = Y(MS.pare - 0.6);
          g.fillStyle = '#c4161c'; g.beginPath();
          for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; g.lineTo(x + Math.cos(a) * K * 0.8, y + Math.sin(a) * K * 0.8); }
          g.fill(); Dr.text(g, 'PARE', x, y, K * 0.45, '#fff');
          T.xc.forEach(o => Dr.car(g, X(o.x), Y(o.sy), o.dir > 0 ? Math.PI / 2 : -Math.PI / 2, 4.4 * K, 1.8 * K, '#9a9a9a'));
          // aviso en el borde de la pantalla: autos que se acercan por la otra vía
          T.xc.forEach(o => {
            const sx = X(o.x);
            if (sx > -2 && sx < W + 2) return;
            const left = sx < 0, ex = left ? 8 : W - 8, ey = Y(o.sy);
            g.fillStyle = '#ffb000'; g.beginPath(); g.moveTo(ex + (left ? -4 : 4), ey); g.lineTo(ex + (left ? 8 : -8), ey - 7); g.lineTo(ex + (left ? 8 : -8), ey + 7); g.fill();
            Dr.text(g, 'AUTO', ex + (left ? 26 : -26), ey, 10, '#ffb000');
          });
        }
        if (MS.cross != null) {
          g.fillStyle = '#e6e6e6';
          for (let x = -3.2; x < 3.4; x += 0.9) g.fillRect(X(x), Y(MS.cross + 3), 0.45 * K, 3 * K);
          if (T.ped && T.ped.x > -6) { g.fillStyle = '#ffd7a8'; dot(X(T.ped.x), Y(MS.cross + 1.5), 0.36 * K); g.fillStyle = '#4a6fa5'; dot(X(T.ped.x), Y(MS.cross + 1.5) + 0.12 * K, 0.22 * K); }
        }
        if (MS.trough != null) { g.fillStyle = '#2f6bff'; Dr.rr(g, X(5.6), Y(MS.trough + 1.5), 1.2 * K, 3 * K, 4); g.fill(); Dr.text(g, 'AGUA', X(6.2), Y(MS.trough), K * 0.42, '#fff'); }
        if (MS.finish != null) for (let i = 0; i < 12; i++) { g.fillStyle = i % 2 ? '#fff' : '#000'; g.fillRect(X(-3.5) + i * (7 / 12) * K, Y(MS.finish) - 3, (7 / 12) * K + 0.5, 6); }
        T.on.forEach(o => Dr.car(g, X(o.x), Y(o.s), Math.PI, 4.4 * K, 1.8 * K, '#d9d9d9'));
        T.cars.forEach(o => Dr.car(g, X(o.x), Y(o.s), 0, 4.4 * K, 1.8 * K, '#8f8f8f', { brake: o.v < 8.5 }));
        // caballo y carreta
        g.save(); g.translate(X(c.x), Y(c.s)); g.rotate(c.ang);
        const step = c.v > 0.1 ? Math.sin(c.s * 4) : 0;
        g.fillStyle = '#5a4329'; Dr.rr(g, -HALF * K, 0.3 * K, 2 * HALF * K, 2.6 * K, 4); g.fill();
        g.fillStyle = '#2a1f14'; g.fillRect(-1.15 * K, 0.9 * K, 0.18 * K, K); g.fillRect(0.97 * K, 0.9 * K, 0.18 * K, K);
        g.strokeStyle = '#a0835a'; g.lineWidth = 2; g.beginPath(); g.moveTo(-0.4 * K, 0.3 * K); g.lineTo(-0.3 * K, -K); g.moveTo(0.4 * K, 0.3 * K); g.lineTo(0.3 * K, -K); g.stroke();
        g.fillStyle = '#7b5a3c'; Dr.rr(g, -0.32 * K, -2.6 * K, 0.64 * K, 1.9 * K, 0.3 * K); g.fill();
        g.fillStyle = '#6a4c32'; g.beginPath(); g.ellipse(0, -2.85 * K, 0.22 * K, 0.42 * K, 0, 0, 7); g.fill();
        g.strokeStyle = '#3d2c1d'; g.lineWidth = 3;
        [-1, 1].forEach(sx => {
          g.beginPath(); g.moveTo(sx * 0.25 * K, -2.3 * K); g.lineTo(sx * 0.33 * K, (-2.3 + 0.35 * step * sx) * K); g.stroke();
          g.beginPath(); g.moveTo(sx * 0.25 * K, -0.9 * K); g.lineTo(sx * 0.33 * K, (-0.9 - 0.35 * step * sx) * K); g.stroke();
        });
        g.fillStyle = '#d9c3a0'; dot(-0.45 * K, 0.75 * K, 0.28 * K); // quien conduce, sentado a la izquierda
        if (c.arm) {
          g.strokeStyle = '#d9c3a0'; g.lineWidth = Math.max(2.5, 0.16 * K); g.lineCap = 'round'; g.beginPath(); g.moveTo(-0.7 * K, 0.75 * K);
          if (c.arm === 'L') g.lineTo(-2.1 * K, 0.75 * K);
          else if (c.arm === 'R') { g.lineTo(-1.5 * K, 0.75 * K); g.lineTo(-1.5 * K, -0.1 * K); }
          else g.lineTo(-1.5 * K, 1.6 * K);
          g.stroke(); g.lineCap = 'butt';
        }
        if (c.lamp) { g.fillStyle = '#ffe9a8'; dot(0.9 * K, 0.4 * K, 0.16 * K); }
        g.restore();
        if (MS.night != null && c.s > MS.night - 20) {
          const a = clamp((c.s - (MS.night - 20)) / 20, 0, 0.82);
          g.fillStyle = `rgba(0,0,6,${a})`; g.fillRect(0, 0, W, H);
          if (c.lamp) {
            const gr = g.createRadialGradient(X(c.x), Y(c.s + 1), 4, X(c.x), Y(c.s + 1), 7 * K);
            gr.addColorStop(0, `rgba(255,233,168,${a * 0.55})`); gr.addColorStop(1, 'rgba(255,233,168,0)');
            g.fillStyle = gr; g.fillRect(0, 0, W, H);
          }
        }
        if (T.queued) Dr.text(g, 'FILA DE AUTOS DETRÁS', W / 2, H - 16, 11, '#ffb000');
        Dr.bar(g, W - 92, H - 40, 80, 7, c.energy, 'ENERGÍA', c.energy < 0.3 ? '#ff4136' : '#fff');
      },
    };
  }

  const MISSIONS = [
    {
      n: 'Al pueblo', goal: 'Llega al pueblo por la derecha: detente en el PARE, cede el paso y respeta el paso de cebra.',
      how: ['¡Arre! sube el ritmo y ¡So! lo baja hasta detenerte.', 'Mantén una rienda para doblar hacia ese lado.', 'Las señales se hacen con el brazo izquierdo: extendido para virar a la izquierda, hacia arriba para la derecha y hacia abajo para detenerte.'],
      pare: 45, cross: 110, finish: 150, tire: 0.6,
      steps: (c, T) => [
        { t: 'Pide ¡Arre! para avanzar y mantente a la derecha.', ok: () => c.s > 15 },
        { t: 'Haz la señal para detenerte (Señal parar) y detente antes de la línea del PARE.', ok: () => T.pareDone },
        { t: 'Mira a ambos lados: avanza cuando no vengan autos.', ok: () => T.pastPare },
        { t: 'Más adelante hay un paso de cebra: cede el paso a quien cruce.', ok: () => c.s - BACK > 113 },
        { t: 'Llega a la meta.', ok: () => c.s + FRONT >= 150 },
      ],
    },
    {
      n: 'Camino rural', goal: 'Deja pasar a los autos, cuida al caballo y enciende el farol al anochecer.',
      how: ['Si se forma una fila detrás, haz la señal a la derecha y oríllate a la berma.', 'Al trote el caballo se cansa: detente junto al bebedero y dale agua.', 'De noche, enciende el farol para que te vean.'],
      cars: 18, trough: 120, night: 170, finish: 230, energy: 0.7, tire: 1,
      steps: (c, T) => [
        { t: 'Pide ¡Arre! dos veces para ir al trote por la derecha.', ok: () => c.s > 18 },
        { t: 'Se formó una fila detrás: haz la señal a la derecha y oríllate a la berma hasta que pasen.', ok: () => T.carsGone },
        { t: 'Los autos pasaron. Más adelante, detente junto al bebedero y dale agua al caballo.', ok: () => c.drank || T.noWater },
        { t: 'Está anocheciendo: enciende el farol.', ok: () => c.lamp },
        { t: 'Llega a la meta por la derecha.', ok: () => c.s + FRONT >= 230 },
      ],
    },
  ];

  RB.sim({
    id: 'carreta', name: 'Carreta', short: 'Riendas, señales con el brazo y cuidado del caballo.', ic: 'horse', lic: ['E'],
    desc: 'Conduce una carreta: mantente a la derecha, respeta el PARE y los pasos de cebra, señaliza con el brazo, deja pasar a los autos y cuida al caballo.',
    tips: ['¡Arre! sube el ritmo (al paso, al trote) y ¡So! lo baja hasta detenerte.', 'Mantén presionada una rienda para doblar hacia ese lado.', 'Un caballo cansado no se fuerza: dale agua y descanso.'],
    missions: MISSIONS, create,
  });
})();
