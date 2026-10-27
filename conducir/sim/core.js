// Simuladores: motor común. Cada juego se registra con RB.sim({ id, name, lic, ic, desc, missions, create }).
// create(api, i) arma la misión i y devuelve { update(dt), draw(g, W, H) }; la misión termina con api.win() o api.fail().
(function () {
  const RB = window.RB = window.RB || {};
  const D = document;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const mk = (tag, cls, html) => { const e = D.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const kmh = v => Math.round(Math.abs(v) * 3.6);
  RB.sims = [];
  RB.sim = def => { RB.sims.push(def); };
  // Pasos de una misión: se cumplen en orden. Si un paso ya cumplido deja de cumplirse (keep), se vuelve a él.
  const flow = (api, steps) => {
    let i = 0;
    return {
      get i() { return i; },
      get done() { return i >= steps.length; },
      update(prefix = '') {
        for (let k = 0; k < i; k++) if (steps[k].keep && !steps[k].keep()) { i = k; break; }
        while (i < steps.length && steps[i].ok()) { i++; if (i < steps.length) api.snd.tone(880, 0.08, 'sine', 0.05); }
        if (i < steps.length) api.say(prefix || `${i + 1}/${steps.length} · ${steps[i].t}`);
        return i >= steps.length;
      },
    };
  };
  const U = RB.simU = { clamp, lerp, sstep, esc, mk, kmh, flow };

  // ---------- Controles táctiles (funcionan con varios dedos a la vez) ----------
  // Cada control se registra en la misión activa para animarse y responder al teclado.
  let CUR = null;
  const reg = o => { if (CUR) CUR.ctl.push(o); return o; };
  const grab = (el, o, move, end) => {
    el.addEventListener('pointerdown', e => {
      if (o.id != null) return;
      o.id = e.pointerId; el.setPointerCapture(o.id); el.classList.add('on'); move(e, true); e.preventDefault();
    });
    el.addEventListener('pointermove', e => { if (e.pointerId === o.id) move(e, false); });
    const up = e => { if (e.pointerId !== o.id) return; o.id = null; el.classList.remove('on'); end(); };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('lostpointercapture', up);
  };
  // Pedal o palanca analógica: más abajo en el pedal = más presión. Al soltar vuelve a cero.
  function pedal(host, label, opt = {}) {
    const el = mk('div', 'sp-pedal ' + (opt.cls || ''), `<i class="sp-fill"></i><b>${esc(label)}</b>${opt.hint ? `<small>${esc(opt.hint)}</small>` : ''}`);
    host.appendChild(el);
    const o = reg({ el, v: 0, t: 0, id: null, key: opt.key, kv: opt.kv || 0.8, rel: opt.rel || 7 });
    grab(el, o, e => { const r = el.getBoundingClientRect(); o.t = clamp((e.clientY - r.top) / r.height * 1.12, 0.06, 1); }, () => { o.t = 0; });
    o.tick = dt => {
      const t = o.kb ? o.kv : o.t;
      o.v = t > o.v ? Math.min(t, o.v + dt * 8) : Math.max(t, o.v - dt * o.rel);
      el.style.setProperty('--p', o.v.toFixed(3));
    };
    o.set = x => { o.t = o.v = x; };
    return o;
  }
  // Palanca de mando de dos ejes (vuelve al centro al soltar).
  function stick(host, label, opt = {}) {
    const L = opt.labels || {};
    const el = mk('div', 'sp-stick ' + (opt.only ? 'only-' + opt.only : ''), `<span class="u">${esc(L.up || '')}</span><span class="d">${esc(L.down || '')}</span><span class="l">${esc(L.left || '')}</span><span class="r">${esc(L.right || '')}</span><i class="knob"></i><b>${esc(label)}</b>`);
    host.appendChild(el);
    const knob = el.querySelector('.knob');
    const o = reg({ el, x: 0, y: 0, tx: 0, ty: 0, id: null, keys: opt.keys || {} });
    grab(el, o, e => {
      const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, R = r.width * 0.36;
      let dx = (e.clientX - cx) / R, dy = (e.clientY - cy) / R;
      const m = Math.hypot(dx, dy); if (m > 1) { dx /= m; dy /= m; }
      o.tx = opt.only === 'y' ? 0 : dx; o.ty = opt.only === 'x' ? 0 : dy;
    }, () => { o.tx = o.ty = 0; });
    o.tick = dt => {
      const K = o.keys, kx = (CUR.keys.has(K.right) ? 1 : 0) - (CUR.keys.has(K.left) ? 1 : 0), ky = (CUR.keys.has(K.down) ? 1 : 0) - (CUR.keys.has(K.up) ? 1 : 0);
      const tx = o.id != null ? o.tx : kx, ty = o.id != null ? o.ty : ky, k = Math.min(1, dt * 14);
      o.x += (tx - o.x) * k; o.y += (ty - o.y) * k;
      knob.style.transform = `translate(${(o.x * 36).toFixed(1)}%, ${(o.y * 36).toFixed(1)}%)`;
    };
    o.set = (x, y) => { o.tx = o.x = x; o.ty = o.y = y; };
    return o;
  }
  // Volante: se arrastra hacia los lados y se queda donde lo dejas.
  function wheel(host, label, opt = {}) {
    const el = mk('div', 'sp-wheel', `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="9"/><circle cx="50" cy="50" r="10" fill="currentColor"/><path d="M10 46h30M60 46h30M50 60v32" stroke="currentColor" stroke-width="9"/><rect x="45" y="3" width="10" height="12" rx="3" fill="#E10600"/></svg><b>${esc(label)}</b>`);
    host.appendChild(el);
    const svg = el.querySelector('svg');
    const o = reg({ el, v: 0, id: null, x0: 0, v0: 0, keys: opt.keys || {} });
    grab(el, o, (e, first) => { if (first) { o.x0 = e.clientX; o.v0 = o.v; } o.v = clamp(o.v0 + (e.clientX - o.x0) / 110, -1, 1); }, () => {});
    el.addEventListener('dblclick', () => { o.v = 0; });
    o.tick = dt => {
      if (CUR.keys.has(o.keys.left)) o.v = clamp(o.v - dt * 1.4, -1, 1);
      if (CUR.keys.has(o.keys.right)) o.v = clamp(o.v + dt * 1.4, -1, 1);
      if (opt.center && o.id == null && !CUR.keys.has(o.keys.left) && !CUR.keys.has(o.keys.right)) o.v *= Math.max(0, 1 - dt * opt.center);
      svg.style.transform = `rotate(${(o.v * 200).toFixed(1)}deg)`;
    };
    return o;
  }
  // Botón: momentáneo o con estado (encendido/apagado). Actúa al apoyar el dedo: con otro dedo ya en la pantalla
  // (por ejemplo, pisando el freno) el navegador no genera "click", así que no se puede depender de él.
  function btn(host, label, opt = {}) {
    const el = mk('button', 'sp-btn ' + (opt.cls || ''), `${opt.ic ? RB.icon(opt.ic) : ''}<span>${esc(label)}</span>`);
    el.type = 'button';
    host.appendChild(el);
    const o = reg({ el, on: !!opt.on, key: opt.key, hold: false });
    const paint = () => { el.classList.toggle('act', !!o.on); el.setAttribute('aria-pressed', !!o.on); };
    o.press = () => { if (opt.toggle) o.on = !o.on; paint(); if (opt.onPress) opt.onPress(o); };
    o.setOn = v => { o.on = !!v; paint(); };
    o.label = t => { el.querySelector('span').textContent = t; };
    if (opt.holdKey) o.holdKey = true;
    el.addEventListener('pointerdown', e => { if (e.button > 0) return; e.preventDefault(); o.hold = true; if (opt.onDown) opt.onDown(o); o.press(); });
    const up = () => { o.hold = false; };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('pointerleave', up);
    el.addEventListener('click', e => { if (e.detail === 0) o.press(); }); // teclado o lector de pantalla
    paint();
    return o;
  }
  // Selector de marchas: 'col' (P R N D) o 'h' (patrón en H con N al centro).
  function gears(host, list, opt = {}) {
    const el = mk('div', 'sp-gears ' + (opt.layout || 'col'));
    host.appendChild(el);
    const o = reg({ el, v: opt.value || list[0] });
    const pos = { 1: [1, 1], 2: [1, 3], 3: [2, 1], 4: [2, 3], 5: [3, 1], R: [3, 3], N: [2, 2] };
    list.forEach(g => {
      const b = mk('button', 'sp-g', esc(g));
      b.type = 'button'; b.dataset.g = g;
      if (opt.layout === 'h') { b.style.gridColumn = pos[g][0]; b.style.gridRow = pos[g][1]; }
      el.appendChild(b);
    });
    if (opt.layout === 'h') el.insertAdjacentHTML('afterbegin', '<i class="sp-gate" aria-hidden="true"></i>');
    const paint = () => el.querySelectorAll('.sp-g').forEach(b => b.classList.toggle('act', b.dataset.g === o.v));
    o.go = g => { if (g === o.v) return; if (!opt.onTry || opt.onTry(g, o.v) !== false) { o.v = g; paint(); } };
    o.force = g => { o.v = g; paint(); };
    el.addEventListener('pointerdown', e => { const b = e.target.closest('.sp-g'); if (!b || e.button > 0) return; e.preventDefault(); o.go(b.dataset.g); });
    el.addEventListener('click', e => { const b = e.target.closest('.sp-g'); if (b && e.detail === 0) o.go(b.dataset.g); });
    o.keymap = opt.keys || {};
    paint();
    return o;
  }

  // ---------- Sonido: motor, intermitente, bocina y sirena ----------
  function audio() {
    const ui = RB.app.ui, AC = window.AudioContext || window.webkitAudioContext;
    const off = { engine() { }, tick() { }, tone() { }, siren() { }, stop() { } };
    if (!AC || !ui.state().set.sound) return off;
    let ac;
    try { ac = new AC(); } catch (e) { return off; }
    const out = ac.createGain(); out.gain.value = 0.9; out.connect(ac.destination);
    const o1 = ac.createOscillator(), o2 = ac.createOscillator(), f = ac.createBiquadFilter(), gn = ac.createGain();
    o1.type = 'sawtooth'; o2.type = 'square'; f.type = 'lowpass'; f.frequency.value = 300; gn.gain.value = 0;
    o1.connect(f); o2.connect(f); f.connect(gn); gn.connect(out); o1.start(); o2.start();
    let sir = null;
    const tone = (fr, dur, type = 'square', vol = 0.06) => {
      const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
      o.type = type; o.frequency.value = fr; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + 0.02);
    };
    return {
      // rpm del motor, carga 0..1 y si está encendido; div ajusta el tono (motos más agudas).
      engine(rpm, load, on, div = 30) {
        const t = ac.currentTime, fr = Math.max(18, clamp(rpm, 0, 11000) / div);
        o1.frequency.setTargetAtTime(fr, t, 0.04); o2.frequency.setTargetAtTime(fr / 2, t, 0.04);
        f.frequency.setTargetAtTime(220 + fr * 3 + load * 500, t, 0.06);
        gn.gain.setTargetAtTime(on ? 0.03 + load * 0.04 : 0, t, 0.06);
      },
      tick() { tone(1800, 0.03, 'square', 0.025); },
      tone,
      siren(on) {
        if (on && !sir) {
          const o = ac.createOscillator(), lfo = ac.createOscillator(), lg = ac.createGain(), g = ac.createGain();
          o.type = 'triangle'; o.frequency.value = 900; lfo.frequency.value = 0.9; lg.gain.value = 300; g.gain.value = 0.035;
          lfo.connect(lg); lg.connect(o.frequency); o.connect(g); g.connect(out); o.start(); lfo.start();
          sir = { o, lfo };
        } else if (!on && sir) { try { sir.o.stop(); sir.lfo.stop(); } catch (e) { /* nada */ } sir = null; }
      },
      stop() { try { this.siren(false); gn.gain.value = 0; o1.stop(); o2.stop(); ac.close(); } catch (e) { /* nada */ } },
    };
  }

  // ---------- Dibujo ----------
  const C = { bg: '#0a0a0a', walk: '#171717', asph: '#232323', mark: '#e6e6e6', ego: '#E10600', car: '#d9d9d9', dk: '#4a4a4a', gr: '#8f8f8f', grass: '#0d120d' };
  function rr(g, x, y, w, h, r) {
    g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }
  // Auto visto desde arriba, centrado en (x, y), mirando en el ángulo a (0 = hacia arriba). L y Wd en píxeles.
  function car(g, x, y, a, L, Wd, col, o = {}) {
    g.save(); g.translate(x, y); g.rotate(a);
    rr(g, -Wd / 2, -L / 2, Wd, L, Math.min(Wd, L) * 0.28); g.fillStyle = col; g.fill();
    g.fillStyle = 'rgba(0,0,0,.45)'; rr(g, -Wd * 0.38, -L * 0.26, Wd * 0.76, L * 0.2, 3); g.fill();
    g.fillStyle = 'rgba(0,0,0,.35)'; rr(g, -Wd * 0.36, L * 0.22, Wd * 0.72, L * 0.13, 3); g.fill();
    g.fillStyle = '#fff'; g.fillRect(-Wd * 0.42, -L / 2, Wd * 0.22, 2.5); g.fillRect(Wd * 0.2, -L / 2, Wd * 0.22, 2.5);
    g.fillStyle = o.brake ? '#ff2a1f' : '#6b0f0b'; g.fillRect(-Wd * 0.44, L / 2 - 2.5, Wd * 0.24, 2.5); g.fillRect(Wd * 0.2, L / 2 - 2.5, Wd * 0.24, 2.5);
    if (o.rev) { g.fillStyle = '#fff'; g.fillRect(-Wd * 0.12, L / 2 - 2, Wd * 0.24, 2); }
    if (o.blink) {
      g.fillStyle = '#ffb000';
      const sx = o.blink === 'L' ? -1 : 1;
      g.beginPath(); g.arc(sx * Wd * 0.45, -L * 0.44, 2.6, 0, 7); g.arc(sx * Wd * 0.45, L * 0.44, 2.6, 0, 7); g.fill();
    }
    if (o.beacon) { g.fillStyle = o.beacon; g.fillRect(-Wd * 0.3, -L * 0.04, Wd * 0.6, 4); }
    g.restore();
  }
  function text(g, s, x, y, size = 13, col = '#fff', align = 'center', weight = 800) {
    g.font = `${weight} ${size}px system-ui,-apple-system,Segoe UI,Roboto,sans-serif`; g.textAlign = align; g.textBaseline = 'middle';
    g.lineWidth = 3; g.strokeStyle = 'rgba(0,0,0,.85)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y);
  }
  // Indicador circular (velocímetro, tacómetro, presión...). zones: [[desde, hasta, color]].
  function gauge(g, cx, cy, r, val, min, max, label, opt = {}) {
    const a0 = Math.PI * 0.75, a1 = Math.PI * 2.25, ang = v => a0 + (a1 - a0) * clamp((v - min) / (max - min), 0, 1);
    g.save();
    g.fillStyle = 'rgba(0,0,0,.72)'; g.beginPath(); g.arc(cx, cy, r + 5, 0, 7); g.fill();
    g.lineWidth = 4; g.strokeStyle = '#333'; g.beginPath(); g.arc(cx, cy, r, a0, a1); g.stroke();
    (opt.zones || []).forEach(([a, b, col]) => { g.strokeStyle = col; g.beginPath(); g.arc(cx, cy, r, ang(a), ang(b)); g.stroke(); });
    g.strokeStyle = '#fff'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(ang(val)) * (r - 4), cy + Math.sin(ang(val)) * (r - 4)); g.stroke();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(cx, cy, 3, 0, 7); g.fill();
    text(g, opt.show != null ? opt.show : String(Math.round(val)), cx, cy + r * 0.48, r * 0.42, '#fff');
    text(g, label, cx, cy + r * 0.88, Math.max(8, r * 0.24), '#bdbdbd', 'center', 700);
    g.restore();
  }
  function bar(g, x, y, w, h, p, label, col = '#fff') {
    g.fillStyle = 'rgba(0,0,0,.72)'; rr(g, x - 3, y - 3, w + 6, h + 18, 6); g.fill();
    g.fillStyle = '#333'; g.fillRect(x, y, w, h); g.fillStyle = col; g.fillRect(x, y, w * clamp(p, 0, 1), h);
    text(g, label, x + w / 2, y + h + 8, 9, '#bdbdbd', 'center', 700);
  }
  // Polígonos para choques: esquinas de un rectángulo girado y prueba de separación de ejes.
  function box(x, y, a, L, Wd) {
    const c = Math.cos(a), s = Math.sin(a), hw = Wd / 2, hl = L / 2;
    return [[-hw, -hl], [hw, -hl], [hw, hl], [-hw, hl]].map(([px, py]) => [x + px * c - py * s, y + px * s + py * c]);
  }
  function hit(A, B) {
    for (const P of [A, B]) for (let i = 0; i < P.length; i++) {
      const [x1, y1] = P[i], [x2, y2] = P[(i + 1) % P.length], nx = y2 - y1, ny = x1 - x2;
      let a0 = Infinity, a1 = -Infinity, b0 = Infinity, b1 = -Infinity;
      A.forEach(([x, y]) => { const d = x * nx + y * ny; a0 = Math.min(a0, d); a1 = Math.max(a1, d); });
      B.forEach(([x, y]) => { const d = x * nx + y * ny; b0 = Math.min(b0, d); b1 = Math.max(b1, d); });
      if (a1 < b0 || b1 < a0) return false;
    }
    return true;
  }
  const inside = (pt, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c; } return c; };
  RB.simDraw = { C, rr, car, text, gauge, bar, box, hit, inside };

  // ---------- Pantalla de un simulador: lista de misiones ----------
  const starsOf = (id, i) => ((RB.app.ui.state().sim || {})[id] || {})[i] || 0;
  const starHtml = n => [1, 2, 3].map(k => RB.icon('star', k <= n ? 'on' : '')).join('');
  RB.simOpen = id => {
    const ui = RB.app.ui, def = RB.sims.find(s => s.id === id);
    const ent = ui.openLayer('pl simg', `<header class="lh"><button class="ib" type="button" data-x aria-label="Cerrar">${RB.icon('x')}</button><b>${esc(def.name)}</b></header><div class="lbody"></div>`);
    const draw = () => {
      $b.innerHTML = `<div class="simg-h">${RB.icon(def.ic)}<p class="muted">${esc(def.desc)}</p></div>` +
        `<h3 class="st">Misiones</h3><div class="simm">${def.missions.map((m, i) => `<button class="simm-b" type="button" data-m="${i}"><span class="simm-n">${i + 1}</span><span class="simm-t"><b>${esc(m.n)}</b><small>${esc(m.goal)}</small></span><span class="stars">${starHtml(starsOf(id, i))}</span></button>`).join('')}</div>` +
        (def.tips ? `<h3 class="st">Antes de jugar</h3><ul class="keys">${def.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '');
    };
    const $b = ent.el.querySelector('.lbody');
    draw();
    ent.el.querySelector('[data-x]').onclick = () => ui.closeLayer();
    $b.onclick = e => { const b = e.target.closest('[data-m]'); if (b) play(def, +b.dataset.m, draw); };
  };

  // ---------- Partida ----------
  function play(def, mi, redraw) {
    const ui = RB.app.ui, m = def.missions[mi];
    const ent = ui.openLayer('ses simp', `<header class="ses-h"><button class="ib" type="button" data-x aria-label="Salir">${RB.icon('x')}</button><div class="simp-t"><small>${esc(def.name)} · Misión ${mi + 1}</small><b>${esc(m.n)}</b></div><span class="simp-sc" aria-live="polite"></span></header>` +
      `<div class="sp-stage"><canvas></canvas><div class="sp-say empty" aria-live="polite"></div></div><div class="sp-panel ${esc(def.panel || '')}"></div>`,
      () => { st.dead = true; cancelAnimationFrame(st.raf); D.removeEventListener('keydown', kd); D.removeEventListener('keyup', ku); snd.stop(); if (CUR === st) CUR = null; RB.simNow = null; if (redraw) redraw(); });
    const el = ent.el, stage = el.querySelector('.sp-stage'), cv = el.querySelector('canvas'), g = cv.getContext('2d');
    const say = el.querySelector('.sp-say'), panel = el.querySelector('.sp-panel'), sc = el.querySelector('.simp-sc');
    const intro = mk('div', 'sp-intro');
    el.appendChild(intro);
    const st = { ctl: [], keys: new Set(), dead: false, run: false, over: false, paused: false, t: 0, pen: [], W: 0, H: 0, raf: 0 };
    CUR = st;
    // Mientras se pregunta si quieres salir, el juego queda en pausa.
    ent.guard = () => { if (st.over || !st.run) return true; st.paused = true; return false; };
    ent.onStay = () => { st.paused = false; st.last = 0; };
    ent.ask = { title: '¿Salir de la misión?', text: 'Perderás el avance de esta misión.', ok: 'Salir', cancel: 'Seguir jugando' };
    el.querySelector('[data-x]').onclick = () => history.back();
    const snd = audio();
    const kd = e => {
      if (e.repeat) return;
      st.keys.add(e.key);
      st.ctl.forEach(o => {
        if (o.key && o.key === e.key) { if (o.kv != null) o.kb = true; else if (o.press) o.press(); }
        if (o.keymap && o.keymap[e.key]) o.go(o.keymap[e.key]);
      });
    };
    const ku = e => { st.keys.delete(e.key); st.ctl.forEach(o => { if (o.key === e.key && o.kv != null) o.kb = false; }); };
    D.addEventListener('keydown', kd); D.addEventListener('keyup', ku);
    let info = '', alertTxt = '', alertKind = '', alertT = 0;
    const paintSay = () => {
      const on = alertT > 0, t = on ? alertTxt : info, k = on ? alertKind : 'info';
      if (say.textContent === t && say.dataset.k === k) return;
      say.textContent = t; say.dataset.k = k; say.className = 'sp-say ' + k + (t ? '' : ' empty');
    };
    const api = {
      g, panel, stage, snd, keys: st.keys, ui: { pedal, stick, wheel, btn, gears, mk }, draw: RB.simDraw,
      get W() { return st.W; }, get H() { return st.H; }, get t() { return st.t; },
      // Mensaje del instructor: 'info' (pasos), 'ok' o 'bad' (errores, se muestran unos segundos).
      say(txt, kind = 'info', secs = 2.6) {
        if (kind === 'info') info = txt; else { alertTxt = txt; alertKind = kind; alertT = secs; }
        paintSay();
      },
      // Falta: se descuenta del puntaje (una vez por motivo) y se avisa.
      penalty(key, txt, pts = 15) {
        if (st.pen.some(p => p.key === key)) return;
        st.pen.push({ key, txt, pts }); api.say(txt, 'bad'); ui.buzz(120); ui.SFX.bad(); score();
      },
      score: n => { st.extra = n; score(); },
      win(res = {}) { finish(true, res); },
      fail(txt, tip) { finish(false, { txt, tip }); },
      buzz: ms => ui.buzz(ms),
    };
    const score = () => { const p = 100 - st.pen.reduce((a, x) => a + x.pts, 0); sc.textContent = `${Math.max(0, p)} pts`; };
    score();
    const resize = () => {
      const r = stage.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      st.W = r.width; st.H = r.height; cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const game = def.create(api, mi);
    RB.simNow = { st, game, api, def, mi };
    const frame = now => {
      if (st.dead) { window.removeEventListener('resize', resize); return; }
      const dt = Math.min(0.05, (now - (st.last || now)) / 1000); st.last = now;
      st.ctl.forEach(o => o.tick && o.tick(dt));
      if (st.run && !st.over && !st.paused && dt > 0) {
        const n = Math.max(1, Math.ceil(dt / (1 / 120)));
        for (let k = 0; k < n && !st.over; k++) { st.t += dt / n; game.update(dt / n); }
        if (alertT > 0) { alertT -= dt; if (alertT <= 0) paintSay(); }
      }
      g.clearRect(0, 0, st.W, st.H);
      game.draw(g, st.W, st.H);
      st.raf = requestAnimationFrame(frame);
    };
    st.raf = requestAnimationFrame(frame);
    // Presentación de la misión antes de empezar.
    intro.innerHTML = `<div class="sp-card"><small class="kick">Misión ${mi + 1}</small><h3>${esc(m.n)}</h3><p>${esc(m.goal)}</p>${m.how ? `<ul>${m.how.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}<button class="btn" type="button" data-start>${RB.icon('play')}Comenzar</button></div>`;
    intro.querySelector('[data-start]').onclick = () => { intro.remove(); st.run = true; st.last = 0; if (game.start) game.start(); };
    function finish(ok, res) {
      if (st.over) return;
      st.over = true;
      snd.engine(0, 0, false); snd.siren(false);
      const pts = Math.max(0, Math.min(100, (res.pts != null ? res.pts : 100) - st.pen.reduce((a, x) => a + x.pts, 0)));
      const stars = ok ? (pts >= 90 ? 3 : pts >= 70 ? 2 : 1) : 0;
      let xp = 0, first = false;
      if (ok) {
        const S = ui.state(); S.sim = S.sim || {}; const rec = S.sim[def.id] = S.sim[def.id] || {};
        first = !rec[mi]; rec[mi] = Math.max(rec[mi] || 0, stars);
        xp = (first ? 8 : 3) + stars * 2;
        ui.award(xp);
        ui.SFX.done();
      } else { ui.SFX.bad(); ui.buzz(200); }
      const notes = st.pen.map(p => `<li class="bad">${esc(p.txt)} <b>−${p.pts}</b></li>`).join('') + (res.notes || []).map(t => `<li>${esc(t)}</li>`).join('');
      const box = mk('div', 'sp-res', `<div class="sp-card"><div class="res-ic">${RB.icon(ok ? 'trophy' : 'x')}</div><h3>${ok ? '¡Misión cumplida!' : 'Misión fallida'}</h3>` +
        (ok ? `<div class="bigstars">${starHtml(stars)}</div><div class="tiles"><div class="tile"><small>Puntaje</small><b>${pts}</b></div><div class="tile"><small>XP</small><b>+${xp}</b></div><div class="tile"><small>Tiempo</small><b>${Math.floor(st.t / 60)}:${String(Math.floor(st.t % 60)).padStart(2, '0')}</b></div></div>`
          : `<p class="sp-why">${esc(res.txt || '')}</p>${res.tip ? `<p class="muted">${esc(res.tip)}</p>` : ''}`) +
        (notes ? `<ul class="sp-notes">${notes}</ul>` : '') +
        `<div class="sp-res-b"><button class="btn" type="button" data-again>${RB.icon('replay')}${ok ? 'Repetir' : 'Intentar de nuevo'}</button>` +
        (ok && mi < def.missions.length - 1 ? `<button class="btn ghost" type="button" data-next>Siguiente misión</button>` : '') +
        `<button class="btn ghost" type="button" data-back>Volver a las misiones</button></div></div>`);
      el.appendChild(box);
      box.querySelector('[data-again]').onclick = () => ui.closeLayer(() => play(def, mi, redraw));
      const nx = box.querySelector('[data-next]'); if (nx) nx.onclick = () => ui.closeLayer(() => play(def, mi + 1, redraw));
      box.querySelector('[data-back]').onclick = () => ui.closeLayer();
    }
  }

  // ---------- Pestaña Simular ----------
  RB.simView = v => {
    const ui = RB.app.ui, S = ui.state(), lic = S.lic, I = RB.icon;
    const mine = RB.sims.filter(s => s.lic.includes(lic)), rest = RB.sims.filter(s => !s.lic.includes(lic));
    const card = s => {
      const got = s.missions.reduce((a, m, i) => a + starsOf(s.id, i), 0), max = s.missions.length * 3;
      return `<button class="simc" type="button" data-sim="${s.id}"><span class="simc-ic">${I(s.ic)}</span><span class="simc-t"><b>${esc(s.name)}</b><small>${esc(s.short || s.desc)}</small><em>${I('star', got ? 'on' : '')}${got} / ${max} · ${s.missions.length} misiones</em></span></button>`;
    };
    v.innerHTML = `<h1 class="vt">Simular</h1><p class="muted">Juegos para practicar con los controles de cada vehículo: pedales, cambios, palancas y maniobras.</p>` +
      `<h2 class="st">Para tu licencia ${esc(lic)}</h2><div class="simcs">${mine.map(card).join('')}</div>` +
      (rest.length ? `<h2 class="st">Otros simuladores</h2><div class="simcs">${rest.map(card).join('')}</div>` : '') +
      `<p class="foot">Los simuladores son juegos de práctica: te ayudan a entender los controles y las maniobras, pero no reemplazan las clases con un instructor.</p>`;
    v.onclick = e => { const b = e.target.closest('[data-sim]'); if (b) RB.simOpen(b.dataset.sim); };
  };
})();
