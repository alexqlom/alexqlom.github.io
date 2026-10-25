// Videos animados: cada situación de tránsito se dibuja y anima en SVG. Pesan poco, funcionan sin
// conexión y permiten pausar en el momento justo para hacer una pregunta.
(function () {
  const RB = window.RB = window.RB || {};
  const NS = 'http://www.w3.org/2000/svg';
  const SC = RB.scenes = {};
  RB.scene = (id, d) => { d.id = id; SC[id] = d; };

  const C = { bg: '#0a0a0a', walk: '#171717', park: '#1b1b1b', asph: '#252525', mark: '#e6e6e6', bld: '#101010', bldE: '#1e1e1e', tree: '#131313', treeE: '#272727' };
  const EGO = '#E10600', WH = '#e8e8e8', GR = '#9a9a9a', DK = '#5d5d5d';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- Dibujo de mapas ----------
  const rect = (x, y, w, h, f, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" ${ex}/>`;
  const dashH = (y, x0, x1) => { let s = ''; for (let x = x0; x < x1 - 2; x += 26) s += rect(x, y - 1, Math.min(14, x1 - x), 2, C.mark, 'opacity=".75"'); return s; };
  const dashV = (x, y0, y1) => { let s = ''; for (let y = y0; y < y1 - 2; y += 26) s += rect(x - 1, y, 2, Math.min(14, y1 - y), C.mark, 'opacity=".75"'); return s; };
  const blds = list => list.map(([x, y, w, h]) => rect(x, y, w, h, C.bld, `stroke="${C.bldE}" rx="3"`)).join('');
  const tree = (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="${C.tree}" stroke="${C.treeE}" stroke-width="2"/>`;

  const maps = {};
  maps.cross = o => {
    let s = rect(0, 0, 640, 360, C.bg);
    s += blds([[14, 12, 112, 104], [140, 12, 112, 104], [388, 12, 120, 104], [522, 12, 106, 104], [14, 244, 238, 104], [388, 244, 110, 104], [512, 244, 116, 104]]);
    s += rect(0, 128, 640, 104, C.walk) + rect(268, 0, 104, 360, C.walk);
    s += rect(0, 140, 640, 80, C.asph) + rect(280, 0, 80, 360, C.asph);
    s += dashH(180, 0, 244) + dashH(180, 396, 640) + dashV(320, 0, 104) + dashV(320, 256, 360);
    for (let k = 0; k < 7; k++) {
      s += rect(284 + k * 11, 228, 6, 18, C.mark, 'opacity=".8"') + rect(284 + k * 11, 114, 6, 18, C.mark, 'opacity=".8"');
      s += rect(254, 144 + k * 11, 18, 6, C.mark, 'opacity=".8"') + rect(368, 144 + k * 11, 18, 6, C.mark, 'opacity=".8"');
    }
    const lines = o.lines || {};
    const L = { s: [322, 250, 36, 4], n: [282, 106, 36, 4], w: [246, 182, 4, 36], e: [390, 142, 4, 36] };
    for (const k in L) {
      const [x, y, w, h] = L[k];
      if (lines[k] === 'yield') {
        for (let i = 0; i < 6; i++) s += w > h ? rect(x + i * 6.5, y, 4, h, C.mark) : rect(x, y + i * 6.5, w, 4, C.mark);
      } else s += rect(x, y, w, h, C.mark);
    }
    const SP = { s: [376, 262], n: [264, 98], w: [236, 238], e: [404, 122] };
    for (const k in (o.signs || {})) s += RB.sign(o.signs[k], 22, SP[k][0], SP[k][1]);
    return s;
  };

  maps.road = o => {
    const L = o.L || 640;
    let s = rect(0, 0, L, 360, o.rural ? '#090c09' : C.bg);
    if (o.rural) {
      s += rect(0, 92, L, 48, '#0e130e') + rect(0, 220, L, 48, '#0e130e');
      for (let x = 20; x < L; x += 46) s += rect(x, 98, 3, 6, '#3a3a3a') + rect(x + 20, 256, 3, 6, '#3a3a3a');
      s += rect(0, 100, L, 1, '#2c2c2c') + rect(0, 258, L, 1, '#2c2c2c');
      for (let x = 60, i = 0; x < L; x += 110 + (i++ % 3) * 30) s += tree(x, 60 + (i % 2) * 14) + tree(x + 50, 300 - (i % 2) * 12);
    } else {
      for (let x = 12, i = 0; x < L; i++) { const w = 86 + (i * 37) % 64; s += blds([[x, 12, w, 70]]); x += w + 16 + (i % 3) * 9; }
      for (let x = 40, i = 0; x < L; i++) { const w = 90 + (i * 53) % 58; s += blds([[x, 278, w, 70]]); x += w + 14 + (i % 2) * 12; }
      s += rect(0, 92, L, 24, C.walk) + rect(0, 244, L, 24, C.walk);
      s += rect(0, 116, L, 24, C.park) + rect(0, 220, L, 24, C.park);
    }
    (o.drive || []).forEach(x => { s += rect(x - 20, 244, 40, 24, '#222') + rect(x - 24, 276, 48, 8, '#2b2b2b', 'stroke="#444"'); });
    (o.side || []).forEach(sd => {
      s += rect(sd.x - 52, 0, 104, 360, C.walk) + rect(sd.x - 40, 0, 80, 360, C.asph);
      s += dashV(sd.x, 0, 104) + dashV(sd.x, 258, 360) + rect(sd.x + 2, 250, 36, 4, C.mark);
      if (sd.pare) s += RB.sign('pare', 20, sd.x + 54, 262);
    });
    s += rect(0, 140, L, 80, C.asph);
    s += rect(0, 139, L, 1.5, C.mark, 'opacity=".3"') + rect(0, 219.5, L, 1.5, C.mark, 'opacity=".3"');
    (o.center || [[0, L, 'dash']]).forEach(([a, b, t]) => { s += t === 'solid' ? rect(a, 179, b - a, 2, C.mark, 'opacity=".85"') : dashH(180, a, b); });
    (o.cw || []).forEach(x => {
      const y0 = o.cwFull ? 118 : 142, n = o.cwFull ? 13 : 8;
      for (let k = 0; k < n; k++) s += rect(x - 20, y0 + k * 10, 40, 5, C.mark, 'opacity=".8"');
    });
    if (!o.rural) for (let x = 70; x < L; x += 140) s += tree(x, 104) + tree(x + 70, 256);
    (o.hydrant || []).forEach(x => { s += `<circle cx="${x}" cy="250" r="6" fill="#c4161c" stroke="#ff7a70" stroke-width="1.5"/><circle cx="${x}" cy="250" r="2" fill="#7a0d10"/>`; });
    (o.posts || []).forEach(x => { s += `<circle cx="${x}" cy="252" r="5" fill="#fff" stroke="${EGO}" stroke-width="2"/>`; });
    (o.stop || []).forEach(x => { s += rect(x - 26, 252, 52, 12, '#1f1f1f', 'stroke="#3d3d3d" rx="2"') + RB.sign('paradero', 16, x + 38, 258); });
    (o.holes || []).forEach(([x, y]) => { s += `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#070707" stroke="#3a3a3a"/>`; });
    (o.signs || []).forEach(([k, x, y, z]) => { s += RB.sign(k, z || 20, x, y); });
    return s;
  };

  maps.round = () => {
    let s = rect(0, 0, 640, 360, C.bg);
    s += blds([[14, 12, 200, 104], [430, 12, 196, 104], [14, 244, 200, 104], [430, 244, 196, 104]]);
    s += rect(0, 128, 640, 104, C.walk) + rect(268, 0, 104, 360, C.walk) + `<circle cx="320" cy="180" r="134" fill="${C.walk}"/>`;
    s += rect(0, 140, 640, 80, C.asph) + rect(280, 0, 80, 360, C.asph) + `<circle cx="320" cy="180" r="120" fill="${C.asph}"/>`;
    s += `<circle cx="320" cy="180" r="70" fill="#121212" stroke="#333" stroke-width="2"/><circle cx="320" cy="180" r="56" fill="#0f0f0f" stroke="#1d1d1d"/>`;
    s += dashH(180, 0, 190) + dashH(180, 452, 640) + dashV(320, 0, 52) + dashV(320, 310, 360);
    for (let i = 0; i < 6; i++) {
      s += rect(322 + i * 6.5, 304, 4, 4, C.mark) + rect(282 + i * 6.5, 52, 4, 4, C.mark);
      s += rect(196, 182 + i * 6.5, 4, 4, C.mark) + rect(440, 142 + i * 6.5, 4, 4, C.mark);
    }
    return s;
  };

  maps.rail = () => {
    let s = maps.road({ L: 640, center: [[0, 380, 'solid'], [480, 640, 'solid']] });
    for (let y = 0; y < 360; y += 12) s += rect(412, y, 36, 4, '#3b3b3b');
    s += rect(419, 0, 2.5, 360, '#9a9a9a') + rect(439, 0, 2.5, 360, '#9a9a9a');
    s += rect(378, 182, 4, 36, C.mark) + rect(478, 142, 4, 36, C.mark);
    s += RB.sign('cruzSanAndres', 20, 372, 238) + RB.sign('cruzSanAndres', 20, 488, 122);
    return s;
  };

  maps.hwy = o => {
    const L = o.L || 640;
    let s = rect(0, 0, L, 360, C.bg);
    s += rect(0, 30, L, 80, C.asph) + dashH(70, 0, L) + rect(0, 30, L, 1.5, C.mark, 'opacity=".5"') + rect(0, 108.5, L, 1.5, C.mark, 'opacity=".5"');
    s += rect(0, 110, L, 30, '#141414') + rect(0, 124, L, 2, '#5a5a5a');
    s += rect(0, 140, L, 80, C.asph) + rect(0, 220, L, 18, '#1d1d1d');
    if (o.ramp) {
      const e = o.ramp;
      s += rect(0, 220, e, 38, C.asph) + `<path d="M${e} 220 L${e + 160} 220 L${e} 258Z" fill="${C.asph}"/>`;
      s += `<path d="M0 257 H${e} L${e + 160} 221" fill="none" stroke="${C.mark}" stroke-width="2" opacity=".8"/>`;
      s += rect(0, 140, L, 2, C.mark, 'opacity=".8"') + dashH(180, 0, L) + dashH(220, 0, e + 120) + rect(e + 120, 219, L - e - 120, 2, C.mark, 'opacity=".8"');
    } else s += rect(0, 140, L, 2, C.mark, 'opacity=".8"') + dashH(180, 0, L) + rect(0, 219, L, 2, C.mark, 'opacity=".8"');
    for (let x = 60; x < L; x += 120) s += tree(x, 270) + `<rect x="${x + 50}" y="244" width="3" height="10" fill="#555"/>`;
    return s;
  };

  maps.curve = () => {
    const P = 'M200 380 V200 A100 100 0 0 1 300 100 H680';
    let s = rect(0, 0, 640, 360, C.bg);
    [[60, 60], [90, 300], [120, 180], [420, 230], [520, 260], [600, 210], [460, 30], [360, 40], [80, 120]].forEach(([x, y]) => { s += tree(x, y); });
    s += `<path d="${P}" fill="none" stroke="#bdbdbd" stroke-width="84"/><path d="${P}" fill="none" stroke="${C.asph}" stroke-width="79"/>`;
    s += `<path d="${P}" fill="none" stroke="${C.mark}" stroke-width="2" stroke-dasharray="14 12" opacity=".75"/>`;
    s += RB.sign('curvaDer', 24, 264, 300);
    return s;
  };

  // ---------- Vehículos y personas (dibujados mirando hacia +x) ----------
  const blink = (x, y) => [[x, -y, 'bl'], [-x, -y, 'bl'], [x, y, 'br'], [-x, y, 'br']]
    .map(([cx, cy, c]) => `<circle class="${c}" cx="${cx}" cy="${cy}" r="2.3" fill="#ffb000" opacity="0"/>`).join('');
  const lamps = (front, rear, y) =>
    `<rect class="brk" x="${rear - .6}" y="${-y}" width="2.6" height="4" rx="1" fill="#ff2a1f" opacity=".3"/><rect class="brk" x="${rear - .6}" y="${y - 4}" width="2.6" height="4" rx="1" fill="#ff2a1f" opacity=".3"/>` +
    `<rect x="${front - 2.4}" y="${-y}" width="2.4" height="3.5" rx="1" fill="#fff" opacity=".85"/><rect x="${front - 2.4}" y="${y - 3.5}" width="2.4" height="3.5" rx="1" fill="#fff" opacity=".85"/>`;
  const DRAW = {
    car: a => {
      const c = a.c || WH;
      return `<rect x="-18" y="-9" width="36" height="18" rx="5" fill="${c}"/><rect x="3" y="-7.5" width="7" height="15" rx="2" fill="#000" opacity=".5"/><rect x="-14" y="-7" width="4.5" height="14" rx="1.5" fill="#000" opacity=".4"/>` +
        (a.occ ? `<circle cx="-1" cy="-4" r="3.2" fill="#d0d0d0"/>` : '') + lamps(18.4, -18, 8) + blink(16, 9) +
        (a.rvl ? `<rect class="rvl" x="-19" y="-2.5" width="2.4" height="5" rx="1" fill="#fff" opacity="0"/>` : '') +
        (a.door ? `<rect class="door" x="-2" y="-10" width="12" height="2.6" rx="1" fill="${c}" stroke="#000" stroke-width=".6" opacity="0"/>` : '');
    },
    bus: a => {
      const c = a.c || '#d8d8d8';
      return `<rect x="-35" y="-11" width="70" height="22" rx="4" fill="${c}"/><rect x="-31" y="-8" width="60" height="16" rx="3" fill="#000" opacity=".12"/><rect x="-12" y="-5" width="14" height="10" rx="2" fill="#000" opacity=".16"/><rect x="30" y="-9" width="4" height="18" rx="1.5" fill="#000" opacity=".5"/>` +
        `<rect class="dr" x="18" y="9" width="10" height="2.4" fill="#000" opacity="0"/><rect class="dr" x="-6" y="9" width="10" height="2.4" fill="#000" opacity="0"/>` + lamps(35.4, -35, 9) + blink(33, 11);
    },
    truck: a => `<rect x="-42" y="-11" width="62" height="22" rx="2" fill="#cfcfcf"/><rect x="20" y="-4" width="4" height="8" fill="#444"/><rect x="24" y="-11" width="18" height="22" rx="3" fill="${a.c || '#8f8f8f'}"/><rect x="37" y="-9" width="4" height="18" rx="1.5" fill="#000" opacity=".5"/>` + lamps(42.4, -42, 9) + blink(40, 11),
    moto: a => `<rect x="-9" y="-3" width="18" height="6" rx="3" fill="${a.c || WH}"/><path d="M5 -6 V6" stroke="#888" stroke-width="2"/><circle cx="-1" cy="0" r="4" fill="#d9d9d9" stroke="#000" stroke-width=".8"/><circle cx="9.5" cy="0" r="1.6" fill="#fff"/><rect class="brk" x="-9.8" y="-1.2" width="1.6" height="2.4" fill="#ff2a1f" opacity=".3"/>`,
    bike: a => `<rect x="-8" y="-1.5" width="16" height="3" rx="1.5" fill="#8a8a8a"/><path d="M5 -4.5 V4.5" stroke="#8a8a8a" stroke-width="1.6"/><ellipse cx="-1" cy="0" rx="3" ry="6" fill="${a.c || '#bdbdbd'}"/><circle cx="-1" cy="0" r="3.4" fill="#e0e0e0"/>`,
    ped: a => `<ellipse cx="0" cy="0" rx="3.6" ry="6.4" fill="${a.c || '#8f8f8f'}"/><circle cx=".5" cy="0" r="3.8" fill="#e6e6e6"/>`,
    child: a => `<g transform="scale(.72)">${DRAW.ped(a)}</g>`,
    dog: a => `<ellipse cx="0" cy="0" rx="9" ry="4.2" fill="${a.c || '#8a7560'}"/><circle cx="9.6" cy="0" r="3.8" fill="${a.c || '#8a7560'}"/><path d="M-8.5 0 L-14 -2.5" stroke="${a.c || '#8a7560'}" stroke-width="2.2" stroke-linecap="round"/>`,
    ball: () => `<circle r="4.4" fill="#fff"/><path d="M-3 -3 Q0 0 -3 3 M3 -3 Q0 0 3 3" stroke="${EGO}" stroke-width="1.4" fill="none"/>`,
    train: () => `<rect x="41" y="-13" width="80" height="26" rx="8" fill="#d6d6d6"/><rect x="110" y="-10" width="7" height="20" rx="2" fill="#000" opacity=".5"/><rect x="-38" y="-13" width="76" height="26" rx="3" fill="#7a7a7a"/><rect x="-121" y="-13" width="80" height="26" rx="3" fill="#7a7a7a"/><rect x="-121" y="-2" width="242" height="4" fill="${EGO}" opacity=".75"/>`,
    amb: () => `<circle class="wave" r="20" fill="none" stroke="#ff2a1f" stroke-width="2" opacity="0"/><rect x="-22" y="-10" width="44" height="20" rx="4" fill="#f2f2f2"/><rect x="10" y="-8" width="6" height="16" rx="2" fill="#000" opacity=".5"/><rect x="-10" y="-2" width="12" height="4" fill="${EGO}"/><rect x="-6" y="-6" width="4" height="12" fill="${EGO}"/>` +
      `<rect class="sir1" x="2" y="-9" width="5" height="8" rx="1" fill="#ff2a1f" opacity=".15"/><rect class="sir2" x="2" y="1" width="5" height="8" rx="1" fill="#2f6bff" opacity=".15"/>` + lamps(22.4, -22, 8) + blink(20, 10),
    tractor: () => `<rect x="-16" y="-14" width="14" height="6" rx="2" fill="#0d0d0d" stroke="#4a4a4a"/><rect x="-16" y="8" width="14" height="6" rx="2" fill="#0d0d0d" stroke="#4a4a4a"/><rect x="10" y="-10" width="8" height="3.5" rx="1" fill="#0d0d0d" stroke="#4a4a4a"/><rect x="10" y="6.5" width="8" height="3.5" rx="1" fill="#0d0d0d" stroke="#4a4a4a"/>` +
      `<rect x="-4" y="-6" width="22" height="12" rx="3" fill="#a8a8a8"/><rect x="-12" y="-8" width="12" height="16" rx="2" fill="#7d7d7d"/><circle class="bcn" cx="-6" cy="0" r="3.2" fill="#ffb000"/>`,
  };

  // ---------- Movimiento ----------
  const EZ = { o: u => 1 - (1 - u) * (1 - u), i: u => u * u, io: u => u < .5 ? 2 * u * u : 1 - 2 * (1 - u) * (1 - u) };
  const arc = (cx, cy, r, a0, a1, t0, t1, n = 14) => {
    const out = [];
    for (let i = 1; i <= n; i++) { const u = i / n, a = (a0 + (a1 - a0) * u) * Math.PI / 180; out.push([t0 + (t1 - t0) * u, cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return out;
  };
  // Interpola tablas [t, v1, v2...] con transición suave entre puntos.
  const track = keys => t => {
    if (t <= keys[0][0]) return keys[0].slice(1);
    for (let i = 1; i < keys.length; i++) {
      if (t < keys[i][0]) { const a = keys[i - 1], b = keys[i], u = EZ.io((t - a[0]) / (b[0] - a[0])); return a.slice(1).map((v, j) => v + (b[j + 1] - v) * u); }
    }
    return keys[keys.length - 1].slice(1);
  };

  function prep(sc) {
    if (sc._prep) return;
    sc._prep = true;
    sc.actors.forEach(a => {
      if (!a.path) return;
      const p = a.path, sa = [];
      for (let i = 1; i < p.length; i++) { const dx = p[i][1] - p[i - 1][1], dy = p[i][2] - p[i - 1][2]; sa[i] = dx * dx + dy * dy > .25 ? Math.atan2(dy, dx) : null; }
      let last = null;
      for (let i = 1; i < p.length; i++) { if (sa[i] == null) sa[i] = last; else last = sa[i]; }
      let first = sa.find(v => v != null);
      if (first == null) first = (a.ang || 0) * Math.PI / 180;
      for (let i = 1; i < p.length; i++) if (sa[i] == null) sa[i] = first;
      sa[0] = a.ang != null ? a.ang * Math.PI / 180 : first;
      a.sa = sa;
    });
  }
  function posAt(a, t) {
    if (a.fn) return a.fn(t);
    const p = a.path;
    if (t <= p[0][0]) return { x: p[0][1], y: p[0][2], i: 0 };
    for (let i = 1; i < p.length; i++) {
      if (t < p[i][0]) {
        const [t0, x0, y0] = p[i - 1], [t1, x1, y1, ez] = p[i];
        let u = (t - t0) / (t1 - t0);
        if (EZ[ez]) u = EZ[ez](u);
        return { x: x0 + (x1 - x0) * u, y: y0 + (y1 - y0) * u, i };
      }
    }
    const l = p[p.length - 1];
    return { x: l[1], y: l[2], i: p.length - 1 };
  }
  function pose(a, t) {
    const c = Object.assign({}, posAt(a, t));
    if (a.fix != null) c.g = a.fix * Math.PI / 180;
    if (c.g != null) return c;
    const p1 = posAt(a, t - .12), p2 = posAt(a, t + .12), dx = p2.x - p1.x, dy = p2.y - p1.y;
    c.g = dx * dx + dy * dy > .36 ? Math.atan2(dy, dx) : (a.sa ? a.sa[c.i] : (a.ang || 0) * Math.PI / 180);
    return c;
  }
  const inR = (r, t) => !!r && r.some(([a, b]) => t >= a && t <= b);

  // ---------- Escenario: dibuja una escena en un instante t ----------
  class Stage {
    constructor(svg, id) {
      const sc = this.sc = SC[id];
      prep(sc);
      if (!sc._map) sc._map = maps[sc.map](sc.mo || {});
      svg.setAttribute('viewBox', '0 0 640 360');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      svg.innerHTML = `<g class="sw">${sc._map}<g class="sdyn"></g><g class="sact"></g><g class="sovw"></g></g><g class="shud"></g>`;
      this.svg = svg;
      this.w = svg.querySelector('.sw');
      this.ovw = svg.querySelector('.sovw');
      this.hud = svg.querySelector('.shud');
      const dyn = svg.querySelector('.sdyn'), act = svg.querySelector('.sact');
      this.marks = {};
      this.A = sc.actors.map(a => {
        const g = document.createElementNS(NS, 'g');
        g.setAttribute('class', 'sa');
        g.setAttribute('data-id', a.id || '');
        g.innerHTML = DRAW[a.k](a);
        act.appendChild(g);
        const q = s => g.querySelectorAll(s);
        return { a, g, brk: q('.brk'), bl: q('.bl'), br: q('.br'), door: g.querySelector('.door'), dr: q('.dr'), s1: g.querySelector('.sir1'), s2: g.querySelector('.sir2'), wave: g.querySelector('.wave'), bcn: g.querySelector('.bcn'), rvl: g.querySelector('.rvl') };
      });
      const mk = html => { const g = document.createElementNS(NS, 'g'); g.innerHTML = html; dyn.appendChild(g); return g; };
      this.lights = (sc.lights || []).map(L => {
        const g = mk(`<rect x="${L.x - 6}" y="${L.y - 17}" width="12" height="34" rx="3" fill="#050505" stroke="#444"/>` +
          ['#ff2a1f', '#ffb000', '#2fd158'].map((c, i) => `<circle cx="${L.x}" cy="${L.y - 10 + i * 10}" r="3.8" fill="${c}" opacity=".15"/>`).join(''));
        return { L, c: g.querySelectorAll('circle') };
      });
      this.bars = (sc.bars || []).map(B => ({ B, g: mk('') }));
      this.flash = (sc.flash || []).map(F => {
        const g = mk(`<circle cx="${F.x - 5}" cy="${F.y}" r="3.4" fill="#ff2a1f" opacity=".15"/><circle cx="${F.x + 5}" cy="${F.y}" r="3.4" fill="#ff2a1f" opacity=".15"/>`);
        return { F, c: g.querySelectorAll('circle') };
      });
    }
    set(t) {
      const sc = this.sc, P = {};
      this.t = t;
      for (const o of this.A) {
        const a = o.a, p = pose(a, t);
        P[a.id] = p;
        o.g.style.display = !a.show || (t >= a.show[0] && t <= a.show[1]) ? '' : 'none';
        o.g.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(p.g * 180 / Math.PI).toFixed(1)})`);
        if (o.brk.length) { const on = inR(a.brake, t); o.brk.forEach(e => e.setAttribute('opacity', on ? 1 : .3)); }
        const ph = Math.floor(t * 3) % 2 === 0;
        if (o.bl.length) { const on = inR(a.bL, t) && ph; o.bl.forEach(e => e.setAttribute('opacity', on ? 1 : 0)); }
        if (o.br.length) { const on = inR(a.bR, t) && ph; o.br.forEach(e => e.setAttribute('opacity', on ? 1 : 0)); }
        if (o.door) {
          const f = t < a.door[0] ? 0 : clamp((t - a.door[0]) / .35, 0, 1);
          o.door.setAttribute('opacity', f > 0 ? 1 : 0);
          o.door.setAttribute('transform', `rotate(${(f * 62).toFixed(1)} 10 -9)`);
        }
        if (o.dr.length) { const on = inR(a.doors, t); o.dr.forEach(e => e.setAttribute('opacity', on ? .9 : 0)); }
        if (o.s1) {
          const on = a.siren === true || inR(a.siren, t), f = Math.floor(t * 6) % 2;
          o.s1.setAttribute('opacity', on && f ? 1 : .15);
          o.s2.setAttribute('opacity', on && !f ? 1 : .15);
          const w = (t * 1.6) % 1;
          o.wave.setAttribute('r', (20 + w * 40).toFixed(1));
          o.wave.setAttribute('opacity', on ? (.55 * (1 - w)).toFixed(2) : 0);
        }
        if (o.bcn) o.bcn.setAttribute('opacity', Math.floor(t * 3) % 2 ? 1 : .2);
        if (o.rvl) o.rvl.setAttribute('opacity', inR(a.rvl, t) ? 1 : 0);
      }
      for (const { L, c } of this.lights) {
        let st = 'off';
        for (const [tt, s] of L.seq) if (t >= tt) st = s;
        const fl = Math.floor(t * 2) % 2 === 0;
        const on = [st === 'r' || (st === 'fr' && fl), st === 'y' || (st === 'fy' && fl), st === 'g'];
        c.forEach((e, i) => e.setAttribute('opacity', on[i] ? 1 : .15));
      }
      for (const { B, g } of this.bars) {
        const [t0, t1, t2, t3] = B.mv;
        const f = t < t0 ? 0 : t < t1 ? (t - t0) / (t1 - t0) : t < t2 ? 1 : t < t3 ? 1 - (t - t2) / (t3 - t2) : 0;
        const len = 8 + (B.len - 8) * f, r = B.dir * Math.PI / 180;
        const x2 = (B.x + Math.cos(r) * len).toFixed(1), y2 = (B.y + Math.sin(r) * len).toFixed(1);
        g.innerHTML = `<line x1="${B.x}" y1="${B.y}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-width="4" stroke-linecap="round"/><line x1="${B.x}" y1="${B.y}" x2="${x2}" y2="${y2}" stroke="${EGO}" stroke-width="4" stroke-dasharray="6 6"/><circle cx="${B.x}" cy="${B.y}" r="4" fill="#666"/>`;
      }
      for (const { F, c } of this.flash) {
        const on = t >= F.on[0] && t <= F.on[1], f = Math.floor(t * 2.5) % 2;
        c[0].setAttribute('opacity', on && f ? 1 : .15);
        c[1].setAttribute('opacity', on && !f ? 1 : .15);
      }
      let cx = 0;
      if (sc.cam) { const tg = P[sc.cam.f]; cx = clamp(tg.x - sc.cam.x, 0, sc.cam.L - 640); }
      this.cx = cx;
      this.w.setAttribute('transform', `translate(${(-cx).toFixed(1)} 0)`);
      let ov = sc.night ? night(t, P, sc, cx) : '';
      ov += sc.ovw ? sc.ovw(t, P) : '';
      if (this.extra) ov += this.extra;
      for (const id in this.marks) {
        const p = P[id], m = this.marks[id];
        if (!p) continue;
        const col = m === 'bad' ? EGO : '#fff';
        ov += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="27" fill="none" stroke="${col}" stroke-width="3"/>` +
          (m === 'ok' || m === 'bad' ? `<circle cx="${(p.x + 20).toFixed(1)}" cy="${(p.y - 20).toFixed(1)}" r="9" fill="${col}"/><path d="${m === 'ok' ? 'M-4 0l3 3 5-6' : 'M-3.5-3.5l7 7M3.5-3.5l-7 7'}" transform="translate(${(p.x + 20).toFixed(1)} ${(p.y - 20).toFixed(1)})" stroke="${m === 'ok' ? '#000' : '#fff'}" stroke-width="2.2" fill="none" stroke-linecap="round"/>` : '');
      }
      this.ovw.innerHTML = ov;
      this.hud.innerHTML = (sc.hud ? sc.hud(t, P) : '') + (sc.rain && t >= sc.rain[0] && t <= sc.rain[1] ? rain(t, clamp((t - sc.rain[0]) / .8, 0, 1)) : '');
      return P;
    }
    caption(t) { const c = (this.sc.cap || []).find(c => t >= c[0] && t < c[1]); return c ? c[2] : ''; }
  }
  // De noche se oscurece la escena y se dibujan los haces de luz (altas largas, bajas cortas).
  function night(t, P, sc, cx) {
    let s = `<rect x="${cx - 10}" y="0" width="660" height="360" fill="#000" opacity=".74"/>`;
    sc.actors.forEach(a => {
      if (!a.beam) return;
      const b = a.beam.find(([t0, t1]) => t >= t0 && t <= t1);
      if (!b) return;
      const p = P[a.id], hi = b[2] === 'high', dx = Math.cos(p.g), dy = Math.sin(p.g), px = -dy, py = dx;
      const ox = p.x + dx * 18, oy = p.y + dy * 18, Lb = hi ? 330 : 130, Wb = hi ? 72 : 40;
      const pt = (u, v) => `${(ox + dx * u + px * v).toFixed(1)},${(oy + dy * u + py * v).toFixed(1)}`;
      s += `<polygon points="${pt(0, -7)} ${pt(0, 7)} ${pt(Lb, Wb)} ${pt(Lb, -Wb)}" fill="#fff4c4" opacity="${hi ? .2 : .26}"/>`;
    });
    return s;
  }
  function rain(t, k) {
    let s = '';
    for (let i = 0; i < 46; i++) {
      const x = ((i * 137.5 + t * 60) % 680) - 20, y = ((i * 91.7 + t * 520) % 400) - 20;
      s += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x - 5).toFixed(1)}" y2="${(y + 14).toFixed(1)}" stroke="#a9bfd4" stroke-width="1.2" opacity="${(.4 * k).toFixed(2)}"/>`;
    }
    return s;
  }
  RB.Stage = Stage;
  RB.thumb = (id, t) => {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'th-svg');
    svg.setAttribute('aria-hidden', 'true');
    new Stage(svg, id).set(t != null ? t : (SC[id].thumb != null ? SC[id].thumb : SC[id].dur * .4));
    return svg;
  };

  // ---------- Voz ----------
  RB.canSpeak = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  let voice = null;
  const pickVoice = () => {
    const vs = speechSynthesis.getVoices();
    voice = vs.find(v => /^es[-_]CL/i.test(v.lang)) || vs.find(v => /^es[-_](419|MX|US|AR|CO|PE)/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null;
  };
  if (RB.canSpeak) { try { pickVoice(); speechSynthesis.addEventListener('voiceschanged', pickVoice); } catch (e) { /* sin voces */ } }
  // En la app Android la voz la entrega el sistema (RutaNative).
  if (window.RutaNative) RB.canSpeak = true;
  RB.say = txt => {
    if (!RB.canSpeak || !txt) return;
    if (window.RutaNative) { try { window.RutaNative.speak(txt); } catch (e) { /* sin voz */ } return; }
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(txt);
      u.lang = voice ? voice.lang : 'es-CL';
      if (voice) u.voice = voice;
      u.rate = 1.03;
      speechSynthesis.speak(u);
    } catch (e) { /* sin voz */ }
  };
  RB.hush = () => {
    try { if (window.RutaNative) window.RutaNative.stop(); else if (RB.canSpeak) speechSynthesis.cancel(); } catch (e) { /* nada */ }
  };

  // ---------- Reproductor ----------
  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  class Player {
    // o: { controls, captions, voice, hazard, autoplay, onEnd, onVoice }
    constructor(host, id, o = {}) {
      const sc = this.sc = SC[id];
      this.id = id; this.o = o; this.t = 0; this.playing = false; this.until = null; this.taps = [];
      this.capOn = o.captions !== false; this.voice = !!o.voice && RB.canSpeak; this.lastCap = '';
      host.innerHTML = `<div class="vp${o.hazard ? ' vp-haz' : ''}${this.capOn ? ' cc' : ''}">
        <div class="vp-frame"><svg class="vp-svg" role="img" aria-label="${esc(sc.title)}"></svg>
          <button class="vp-big" type="button" aria-label="Reproducir">${RB.icon(o.hazard ? 'eye' : 'play')}</button>
        </div>
        <div class="vp-cap" aria-live="polite"></div>
        ${o.controls ? `<div class="vp-ctl"><button class="ib vp-pp" type="button" aria-label="Reproducir">${RB.icon('play')}</button>
          <input class="vp-rg" type="range" min="0" max="${Math.round(sc.dur * 100)}" value="0" step="1" aria-label="Avanzar o retroceder el video">
          <span class="vp-tm">0:00 / ${fmt(sc.dur)}</span>
          ${RB.canSpeak ? `<button class="ib vp-vo" type="button" aria-pressed="${this.voice}" aria-label="Narración por voz" title="Narración por voz">${RB.icon(this.voice ? 'vol' : 'mute')}</button>` : ''}</div>` : ''}
        ${o.hazard ? `<div class="vp-tl" aria-hidden="true"><i class="vp-tlp"></i></div>` : ''}
      </div>`;
      this.root = host.firstElementChild;
      this.svg = this.root.querySelector('.vp-svg');
      this.cap = this.root.querySelector('.vp-cap');
      this.big = this.root.querySelector('.vp-big');
      this.stage = new Stage(this.svg, id);
      this.pp = this.root.querySelector('.vp-pp');
      this.rg = this.root.querySelector('.vp-rg');
      this.tm = this.root.querySelector('.vp-tm');
      this.vo = this.root.querySelector('.vp-vo');
      this.tl = this.root.querySelector('.vp-tl');
      this.big.addEventListener('click', e => { e.stopPropagation(); this.ended ? this.restart() : this.play(); });
      if (this.pp) this.pp.addEventListener('click', () => this.playing ? this.pause() : (this.ended ? this.restart() : this.play()));
      if (this.rg) this.rg.addEventListener('input', () => { this.ended = false; this.seek(this.rg.value / 100); });
      if (this.vo) this.vo.addEventListener('click', () => {
        this.voice = !this.voice;
        this.vo.setAttribute('aria-pressed', this.voice);
        this.vo.innerHTML = RB.icon(this.voice ? 'vol' : 'mute');
        if (!this.voice) RB.hush(); else if (this.lastCap) RB.say(this.lastCap);
        if (o.onVoice) o.onVoice(this.voice);
      });
      if (o.hazard) {
        this.big.classList.add('hide');
        this.root.querySelector('.vp-frame').addEventListener('pointerdown', e => {
          if (!this.playing) return;
          e.preventDefault();
          this.taps.push(this.t);
          const fl = document.createElement('i');
          fl.className = 'vp-flag';
          fl.style.left = (100 * this.t / sc.dur) + '%';
          this.tl.appendChild(fl);
          const r = this.root.querySelector('.vp-frame').getBoundingClientRect();
          const pu = document.createElement('i');
          pu.className = 'vp-pulse';
          pu.style.left = (e.clientX - r.left) + 'px';
          pu.style.top = (e.clientY - r.top) + 'px';
          this.root.querySelector('.vp-frame').appendChild(pu);
          setTimeout(() => pu.remove(), 600);
          if (o.onTap) o.onTap(this.t);
        });
      }
      this._tick = this._tick.bind(this);
      this.render();
      this.setPlayIcon();
      if (o.autoplay) this.play();
    }
    render() {
      this.stage.set(this.t);
      const c = this.capOn ? this.stage.caption(this.t) : '';
      if (c !== this.lastCap) {
        this.lastCap = c;
        this.cap.innerHTML = c ? `<span>${esc(c)}</span>` : '';
        if (c && this.voice && this.playing) RB.say(c);
      }
      if (this.rg) this.rg.value = Math.round(this.t * 100);
      if (this.tm) this.tm.textContent = `${fmt(this.t)} / ${fmt(this.sc.dur)}`;
      if (this.tl) this.tl.querySelector('.vp-tlp').style.width = (100 * this.t / this.sc.dur) + '%';
    }
    setPlayIcon() {
      const ic = RB.icon(this.playing ? 'pause' : (this.ended ? 'replay' : 'play'));
      if (this.pp) { this.pp.innerHTML = ic; this.pp.setAttribute('aria-label', this.playing ? 'Pausar' : 'Reproducir'); }
      if (!this.o.hazard) {
        this.big.innerHTML = RB.icon(this.ended ? 'replay' : 'play');
        this.big.classList.toggle('hide', this.playing || this.o.noBig);
      }
    }
    play(until) {
      if (until != null) this.until = until;
      if (this.playing) return;
      this.playing = true; this.ended = false; this.last = performance.now();
      this.setPlayIcon();
      if (this.voice && this.lastCap) RB.say(this.lastCap);
      requestAnimationFrame(this._tick);
    }
    playUntil(t, cb) { this.onUntil = cb; this.play(t); }
    pause() { this.playing = false; RB.hush(); this.setPlayIcon(); }
    restart() { this.t = 0; this.ended = false; this.lastCap = ''; this.render(); this.play(); }
    seek(t) { this.t = clamp(t, 0, this.sc.dur); this.render(); }
    showCaptions(on) { this.capOn = on; this.root.classList.toggle('cc', on); this.lastCap = null; this.render(); }
    _tick(now) {
      if (!this.playing || this.dead) return;
      const dt = Math.min(.1, (now - this.last) / 1000);
      this.last = now;
      this.t += dt;
      if (this.until != null && this.t >= this.until) {
        this.t = this.until; this.until = null;
        this.render(); this.playing = false; this.setPlayIcon();
        const cb = this.onUntil; this.onUntil = null;
        if (cb) cb();
        return;
      }
      if (this.t >= this.sc.dur) {
        this.t = this.sc.dur; this.render(); this.playing = false; this.ended = true; this.setPlayIcon();
        if (this.o.onEnd) this.o.onEnd(this.taps);
        return;
      }
      this.render();
      requestAnimationFrame(this._tick);
    }
    // Para preguntas "toca el vehículo": hace clicables los actores indicados.
    pickable(ids, onPick) {
      this.stage.A.forEach(o => {
        if (!ids.includes(o.a.id)) return;
        const hit = document.createElementNS(NS, 'circle');
        hit.setAttribute('r', '30'); hit.setAttribute('fill', 'transparent'); hit.setAttribute('class', 'hit');
        o.g.insertBefore(hit, o.g.firstChild);
        o.g.classList.add('pick');
        o.g.addEventListener('click', () => onPick(o.a.id));
      });
    }
    mark(m) { this.stage.marks = m; this.render(); }
    // Para preguntas "toca el lugar": entrega la coordenada tocada en el mundo de la escena.
    pickSpot(onPick) {
      const fr = this.root.querySelector('.vp-frame');
      fr.classList.add('spot');
      fr.addEventListener('click', e => {
        const r = this.svg.getBoundingClientRect();
        onPick((e.clientX - r.left) / r.width * 640 + (this.stage.cx || 0), (e.clientY - r.top) / r.height * 360);
      });
    }
    setExtra(svg) { this.stage.extra = svg; this.render(); }
    destroy() { this.dead = true; this.playing = false; RB.hush(); }
  }
  RB.Player = Player;
  RB.hazScore = (id, taps) => {
    const [a, b] = SC[id].hz.w;
    if (taps.length > 6) return { score: 0, spam: true };
    let best = 0;
    taps.forEach(t => { if (t >= a && t <= b) best = Math.max(best, 5 - Math.floor(4.999 * (t - a) / (b - a))); });
    return { score: best };
  };

  // ---------- Escenas ----------
  const parked = (xs, y, ang, cols = ['#3a3a3a', '#4b4b4b', '#2f2f2f', '#575757']) =>
    xs.map((x, i) => ({ id: 'p' + y + '_' + i, k: 'car', c: cols[i % cols.length], path: [[0, x, y]], ang }));
  const label = (x, y, txt, size = 13, fill = '#fff') =>
    `<text x="${x}" y="${y}" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-weight="700" font-size="${size}" fill="${fill}" text-anchor="middle" paint-order="stroke" stroke="#000" stroke-width="3">${esc(txt)}</text>`;

  RB.scene('pare', {
    title: 'Señal PARE', cat: 'Normas y preferencias', dur: 12, map: 'cross', mo: { signs: { s: 'pare' } }, thumb: 4.6,
    desc: 'Detención total antes de la línea, aunque no venga nadie.',
    actors: [
      { id: 'ego', k: 'car', c: EGO, path: [[0, 340, 430], [4, 340, 282, 'o'], [6.6, 340, 282], [9.4, 340, 60, 'i'], [12, 340, -260]], brake: [[2.4, 6.6]] },
      { id: 'b', k: 'car', c: WH, path: [[0, 760, 160], [3, 760, 160], [7, -80, 160]] },
    ],
    cap: [[0, 3, 'Te acercas a un cruce con señal PARE.'], [3, 5.6, 'Detente por completo antes de la línea, aunque no venga nadie.'], [5.6, 8.4, 'Mira a ambos lados y cede el paso a quienes circulan por la otra vía.'], [8.4, 12.1, 'Cuando el cruce esté despejado, continúa con precaución.']],
    ovw: t => t > 3 && t < 5.6 ? `<rect x="318" y="246" width="44" height="12" rx="3" fill="none" stroke="${EGO}" stroke-width="2.5" opacity="${(.55 + .45 * Math.sin(t * 8)).toFixed(2)}"/>` : '',
  });

  RB.scene('ceda', {
    title: 'Ceda el paso', cat: 'Normas y preferencias', dur: 11, map: 'cross', mo: { signs: { s: 'ceda' }, lines: { s: 'yield' } }, thumb: 3.9,
    desc: 'Reduce la velocidad y detente solo si viene alguien por la otra vía.',
    actors: [
      { id: 'ego', k: 'car', c: EGO, path: [[0, 340, 430], [4.4, 340, 284, 'o'], [6.4, 340, 284], [9, 340, 40, 'i'], [11, 340, -240]], brake: [[2.4, 6.4]] },
      { id: 'b', k: 'car', c: WH, path: [[0, -80, 200], [1.6, -80, 200], [6, 720, 200]] },
      { id: 'c', k: 'car', c: GR, path: [[0, -80, 200], [3.4, -80, 200], [7.4, 720, 200]] },
    ],
    cap: [[0, 2.6, 'Señal CEDA EL PASO: reduce la velocidad al acercarte.'], [2.6, 5.8, 'Vienen vehículos por la otra vía: detente y espera.'], [5.8, 8.2, 'Si no viene nadie, puedes continuar sin detenerte por completo.'], [8.2, 11.1, 'Ceder el paso es dejar pasar primero a los demás.']],
  });

  RB.scene('derecha', {
    title: 'Cruce sin señales', cat: 'Normas y preferencias', dur: 10, map: 'cross', thumb: 3.7,
    desc: 'Si dos vehículos llegan a la vez, pasa primero el que viene por la derecha.',
    actors: [
      { id: 'ego', k: 'car', c: EGO, path: [[0, 340, 430], [3.5, 340, 284, 'o'], [6.4, 340, 284], [8.6, 340, 90, 'i'], [10, 340, -130]], brake: [[2.2, 6.4]] },
      { id: 'b', k: 'car', c: WH, path: [[0, 720, 160], [3.4, 412, 160, 'o'], [3.9, 412, 160], [6.2, 120, 160, 'i'], [7.4, -80, 160]], brake: [[2.2, 3.9]] },
    ],
    cap: [[0, 3.4, 'Cruce sin señales ni semáforo: ambos llegan al mismo tiempo.'], [3.4, 6.4, 'Tiene preferencia el vehículo que viene por la derecha.'], [6.4, 10.1, 'El auto blanco viene por tu derecha: pasa primero. Luego sigues tú.']],
  });

  RB.scene('rotonda', {
    title: 'Rotonda', cat: 'Normas y preferencias', dur: 14, map: 'round', thumb: 3.6,
    desc: 'Tienen preferencia los vehículos que ya circulan dentro de la rotonda.',
    actors: [
      { id: 'ego', k: 'car', c: EGO, path: [[0, 340, 440], [3.2, 340, 322, 'o'], [4.4, 340, 322], [5.6, 340, 273, 'i'], ...arc(320, 180, 95, 77.8, -77.8, 5.6, 9, 18), [10.6, 340, -40], [14, 340, -400]], brake: [[2, 4.4]], bR: [[8, 9.6]] },
      { id: 'w1', k: 'car', c: WH, path: [[0, 40, 200], [1.6, 227, 200], ...arc(320, 180, 95, 167.8, 12.2, 1.6, 5.4, 18), [7.6, 520, 200], [10, 760, 200]] },
      { id: 'w2', k: 'car', c: GR, path: [[0, 300, -60], [5.8, 300, -60], [7.2, 300, 87], ...arc(320, 180, 95, -102.2, -257.8, 7.2, 10.6, 18), [12, 300, 420]] },
    ],
    cap: [[0, 3, 'Te acercas a una rotonda.'], [3, 5.6, 'Tienen preferencia los vehículos que ya circulan dentro: espera un espacio.'], [5.6, 8.2, 'Circula en sentido contrario a los punteros del reloj.'], [8.2, 10.8, 'Antes de salir, señaliza a la derecha.'], [10.8, 14.1, 'Sal por tu pista, atento a los peatones.']],
  });

  RB.scene('cebra', {
    title: 'Paso de cebra', cat: 'Normas y preferencias', dur: 11, map: 'road', mo: { cw: [420] }, thumb: 4.2,
    desc: 'El peatón tiene preferencia: detente antes de la franja.',
    actors: [
      { id: 'ped', k: 'ped', path: [[0, 420, 262], [1.6, 420, 262], [8, 420, 98]] },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 100, 200], [3.6, 374, 200, 'o'], [7.4, 374, 200], [9.6, 600, 200, 'i'], [11, 800, 200]], brake: [[2.2, 7.4]] },
      { id: 'w', k: 'car', c: WH, path: [[0, 700, 160], [3.8, 466, 160, 'o'], [7, 466, 160], [9.4, -80, 160, 'i']], brake: [[2.4, 7]] },
    ],
    cap: [[0, 2.6, 'Paso de cebra: los peatones tienen preferencia.'], [2.6, 6, 'Detente antes de la franja y espera a que el peatón cruce.'], [6, 8.6, 'Nunca adelantes a un vehículo detenido ante un paso peatonal.'], [8.6, 11.1, 'Continúa solo cuando el paso esté despejado.']],
  });

  RB.scene('amarilla', {
    title: 'Luz amarilla', cat: 'Normas y preferencias', dur: 9, map: 'cross', thumb: 2.3,
    desc: 'Con luz amarilla, detente si puedes hacerlo con seguridad.',
    lights: [{ x: 374, y: 262, seq: [[0, 'g'], [2, 'y'], [3.6, 'r'], [6.2, 'g']] }, { x: 404, y: 120, seq: [[0, 'r'], [3.9, 'g'], [5.6, 'y'], [6.2, 'r']] }],
    actors: [
      { id: 'ego', k: 'car', c: EGO, path: [[0, 340, 520], [2.2, 340, 340], [3.8, 340, 284, 'o'], [6.4, 340, 284], [8.2, 340, 100, 'i'], [9, 340, -30]], brake: [[2.2, 6.4]] },
      { id: 'w', k: 'car', c: WH, path: [[0, 760, 160], [4, 700, 160], [6.2, -80, 160]] },
    ],
    cap: [[0, 2, 'Luz verde: puedes avanzar con precaución.'], [2, 3.6, 'Luz amarilla: detente, salvo que estés tan cerca que no puedas hacerlo con seguridad.'], [3.6, 6.2, 'Luz roja: detención obligatoria antes de la línea.'], [6.2, 9.1, 'Con luz verde, avanza solo si el cruce está despejado.']],
  });

  RB.scene('adelantar', {
    title: 'Adelantar', cat: 'Adelantar y distancia', dur: 13, map: 'road', mo: { L: 2400, center: [[0, 1000, 'solid'], [1000, 2400, 'dash']] }, cam: { f: 'ego', x: 200, L: 2400 }, thumb: 4.4,
    desc: 'Solo con línea discontinua, buena visibilidad y la pista contraria despejada.',
    actors: [
      { id: 'slow', k: 'car', c: GR, fn: t => ({ x: 520 + 90 * t, y: 200 }) },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 300, 200], [3.4, 706, 200], [6.4, 976, 200], [7.2, 1080, 170], [8.4, 1300, 166], [9.2, 1440, 170], [10, 1560, 200], [13, 1950, 200]], bL: [[6.4, 7.4]], bR: [[9.2, 10.2]] },
      { id: 'o1', k: 'car', c: WH, fn: t => ({ x: 1900 - 250 * t, y: 160 }) },
    ],
    cap: [[0, 3.4, 'Vas detrás de un vehículo lento.'], [3.4, 6.4, 'Línea continua y un vehículo de frente: no se puede adelantar.'], [6.4, 7.4, 'Línea discontinua y pista despejada: mira el espejo y señaliza.'], [7.4, 10, 'Adelanta con decisión, sin exceder la velocidad máxima.'], [10, 13.1, 'Vuelve a tu pista cuando veas al vehículo adelantado por el retrovisor.']],
  });

  RB.scene('ciclista', {
    title: 'Adelantar a un ciclista', cat: 'Adelantar y distancia', dur: 11, map: 'road', mo: { L: 1700 }, cam: { f: 'ego', x: 200, L: 1700 }, thumb: 5,
    desc: 'Deja al menos 1,5 metros de distancia lateral.',
    actors: [
      { id: 'bike', k: 'bike', c: '#bdbdbd', fn: t => ({ x: 420 + 70 * t, y: 212 }) },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [2.4, 420, 200], [3.4, 560, 186], [4, 640, 170], [6, 900, 170], [6.8, 1010, 186], [7.6, 1120, 200], [11, 1600, 200]], bL: [[2.2, 3.6]], bR: [[6.2, 7.4]] },
      { id: 'o1', k: 'car', c: GR, fn: t => ({ x: 1100 - 300 * t, y: 160 }) },
    ],
    cap: [[0, 2.6, 'Ciclista adelante: espera a que la pista contraria esté despejada.'], [2.6, 4.2, 'Señaliza y comienza el adelantamiento.'], [4.2, 6.4, 'Deja al menos 1,5 metros de distancia lateral.'], [6.4, 11.1, 'Vuelve a tu pista cuando veas al ciclista por el espejo.']],
    ovw: (t, P) => {
      const e = P.ego, b = P.bike;
      if (Math.abs(e.x - b.x) > 46 || e.y > 180) return '';
      const x = b.x + 4, y1 = e.y + 9, y2 = b.y - 6;
      return `<path d="M${x} ${y1} V${y2} M${x - 5} ${y1} H${x + 5} M${x - 5} ${y2} H${x + 5}" stroke="#fff" stroke-width="2"/>` + label(x + 34, (y1 + y2) / 2 + 5, '1,5 m');
    },
  });

  RB.scene('distancia', {
    title: 'Distancia de seguimiento', cat: 'Adelantar y distancia', dur: 12, map: 'road', mo: { L: 2300, posts: [900, 1700] }, cam: { f: 'ego', x: 120, L: 2300 }, rain: [8.4, 12], thumb: 5,
    desc: 'La regla de los segundos para no ir pegado al de adelante.',
    actors: [
      { id: 'lead', k: 'car', c: WH, fn: t => ({ x: 460 + 140 * t, y: 200 }) },
      { id: 'ego', k: 'car', c: EGO, fn: t => ({ x: 40 + 140 * t, y: 200 }) },
      { id: 'o1', k: 'car', c: DK, fn: t => ({ x: 1500 - 220 * t, y: 160 }) },
      { id: 'o2', k: 'car', c: GR, fn: t => ({ x: 2500 - 230 * t, y: 160 }) },
    ],
    cap: [[0, 3, 'Elige un punto fijo, como un poste.'], [3, 6.3, 'Cuando el auto de adelante lo pase, cuenta los segundos hasta que tú lo pases.'], [6.3, 8.6, 'Deja al menos 2 a 3 segundos de separación.'], [8.6, 12.1, 'Con lluvia, neblina o de noche, aumenta la distancia.']],
    ovw: t => t > 2.6 && t < 6.8 ? `<circle cx="900" cy="252" r="14" fill="none" stroke="${EGO}" stroke-width="2.5" opacity="${(.6 + .4 * Math.sin(t * 7)).toFixed(2)}"/>` : '',
    hud: t => {
      const t1 = (900 - 460) / 140;
      if (t < t1 || t > t1 + 3.9) return '';
      const n = Math.min(3, Math.floor(t - t1) + 1);
      return `<rect x="250" y="22" width="140" height="44" rx="10" fill="#000" opacity=".72"/>` + label(320, 53, `${n} segundo${n > 1 ? 's' : ''}`, 22);
    },
  });

  // Física aproximada: tiempo de reacción 1 s y desaceleración de 6,9 m/s² (pavimento seco). 10 px = 1 m.
  const DEC = 6.87;
  const brakeFn = (v, y) => t => {
    const ts = 1.5;
    let s;
    if (t < ts) s = -v * (ts - t);
    else if (t < ts + 1) s = v * (t - ts);
    else { const tb = Math.min(t - ts - 1, v / DEC); s = v + v * tb - DEC * tb * tb / 2; }
    return { x: 30 + s * 10, y, g: 0 };
  };
  RB.scene('frenado', {
    title: 'Distancia de detención', cat: 'Adelantar y distancia', dur: 10, map: 'hwy', thumb: 3.1,
    desc: 'Qué pasa al frenar a 50 km/h y a 80 km/h ante el mismo obstáculo.',
    actors: [
      { id: 'a', k: 'car', c: WH, fn: brakeFn(50 / 3.6, 160) },
      { id: 'b', k: 'car', c: EGO, fn: brakeFn(80 / 3.6, 200) },
    ],
    cap: [[0, 1.5, 'Dos autos: uno a 50 km/h y otro a 80 km/h.'], [1.5, 2.5, 'Aparece un obstáculo. Reaccionar toma cerca de 1 segundo.'], [2.5, 4.6, 'Durante la reacción el auto sigue a la misma velocidad. Recién entonces frena.'], [4.6, 7.6, 'A 50 km/h se detiene a tiempo. A 80 km/h choca a unos 64 km/h.'], [7.6, 10.1, 'La distancia de frenado crece con el cuadrado de la velocidad.']],
    ovw: (t, P) => {
      let s = '';
      if (t >= 1.5) {
        const hit = t > 3.15;
        s += `<rect x="392" y="146" width="16" height="68" rx="3" fill="${hit ? 'none' : '#2a0605'}" stroke="${EGO}" stroke-width="2" stroke-dasharray="${hit ? '4 4' : '0'}"/>` + label(400, 136, 'obstáculo', 11);
      }
      [['a', 50, 160], ['b', 80, 200]].forEach(([id, v, y]) => {
        const p = P[id], vm = v / 3.6, re = 30 + vm * 10, end = 30 + (vm + vm * vm / (2 * DEC)) * 10;
        if (t >= 1.5) {
          const x = Math.min(p.x, re);
          s += `<rect x="30" y="${y + 12}" width="${Math.max(0, x - 30).toFixed(1)}" height="4" fill="#8a8a8a"/>`;
          if (p.x > re) s += `<rect x="${re.toFixed(1)}" y="${y + 12}" width="${(p.x - re).toFixed(1)}" height="4" fill="${EGO}"/>`;
        }
        s += label(p.x, y - 13, `${v} km/h`, 11);
        if (t > 6) s += label((30 + end) / 2, y + 30, `reacción ${(vm).toFixed(1).replace('.', ',')} m + frenado ${(vm * vm / (2 * DEC)).toFixed(1).replace('.', ',')} m`, 10, '#cfcfcf');
      });
      if (t > 3.15 && t < 7.6) s += label(470, 252, '¡Impacto a ~64 km/h!', 15, '#ff4d43');
      return s;
    },
  });

  RB.scene('puntociego', {
    title: 'Zonas ciegas de un camión', cat: 'Vehículos grandes y especiales', dur: 12, map: 'hwy', mo: { L: 2600 }, cam: { f: 'trk', x: 300, L: 2600 }, thumb: 5.5,
    desc: 'Si no ves los espejos del camión, su conductor no te ve.',
    actors: (() => {
      const rel = track([[0, -118, 200], [3, -118, 200], [4.2, -100, 160], [7, 0, 160], [9.2, 130, 160], [10.4, 160, 200], [12, 175, 200]]);
      const trk = t => ({ x: 420 + 110 * t, y: 200 });
      return [
        { id: 'trk', k: 'truck', fn: trk },
        { id: 'ego', k: 'car', c: EGO, fn: t => { const [r, y] = rel(t); return { x: trk(t).x + r, y }; }, bL: [[3, 4.4]], bR: [[9.4, 10.6]] },
        { id: 'o1', k: 'car', c: GR, fn: t => ({ x: 2300 - 210 * t, y: 50 }) },
        { id: 'o2', k: 'car', c: DK, fn: t => ({ x: 2900 - 190 * t, y: 90 }) },
      ];
    })(),
    cap: [[0, 3, 'Los vehículos grandes tienen zonas ciegas alrededor.'], [3, 4.4, 'Si vas pegado atrás, el conductor no te ve y tú no ves el camino.'], [4.4, 7, 'A los costados también hay zonas ciegas; la más grande está a la derecha.'], [7, 9.6, 'Adelanta con decisión, sin quedarte al lado.'], [9.6, 12.1, 'Si no ves los espejos del camión, su conductor no te ve.']],
    ovw: (t, P) => {
      const x = P.trk.x, e = P.ego;
      const Z = [[x + 42, 182, 36, 36], [x - 112, 182, 70, 36], [x - 46, 142, 52, 36], [x - 40, 221, 100, 18]];
      let s = '';
      Z.forEach(([zx, zy, w, h]) => {
        const inside = e.x > zx - 8 && e.x < zx + w + 8 && e.y > zy - 4 && e.y < zy + h + 4;
        s += `<rect x="${zx.toFixed(1)}" y="${zy}" width="${w}" height="${h}" rx="4" fill="${EGO}" opacity="${inside ? .38 : .14}"/>`;
      });
      if (t < 3.2) s += label(x - 77, 205, 'zona ciega', 10);
      return s;
    },
  });

  RB.scene('emergencia', {
    title: 'Vehículo de emergencia', cat: 'Vehículos grandes y especiales', dur: 11, map: 'road', thumb: 4,
    desc: 'Oríllate a la derecha y deja pasar a la ambulancia.',
    actors: [
      { id: 'ego', k: 'car', c: EGO, path: [[0, 40, 200], [2.2, 230, 201], [3.1, 294, 220], [3.9, 328, 226, 'o'], [6.4, 328, 226], [7.4, 380, 218, 'i'], [8.2, 440, 202], [11, 800, 200]], brake: [[2.6, 6.4]], bR: [[1.8, 3.6]] },
      { id: 'c1', k: 'car', c: GR, path: [[0, 200, 200], [2.2, 390, 201], [3.1, 454, 220], [3.9, 488, 226, 'o'], [6, 488, 226], [7, 540, 218, 'i'], [7.8, 600, 202], [9.5, 800, 200]], brake: [[2.6, 6]], bR: [[1.8, 3.6]] },
      { id: 'amb', k: 'amb', path: [[0, -300, 200], [2, -80, 200], [6.4, 760, 200]], siren: true },
      { id: 'w', k: 'car', c: DK, path: [[0, 700, 160], [2.8, 520, 159], [3.6, 470, 140], [4.3, 446, 136, 'o'], [6.4, 446, 136], [7.4, 400, 142, 'i'], [8.2, 340, 158], [10, -80, 160]], brake: [[3, 6.4]], bR: [[2.4, 3.8]] },
    ],
    cap: [[0, 2.2, 'Escuchas una sirena: se acerca un vehículo de emergencia.'], [2.2, 4.4, 'Señaliza, oríllate a la derecha y reduce la velocidad o detente.'], [4.4, 6.6, 'Déjalo pasar. No lo sigas ni lo adelantes.'], [6.6, 11.1, 'Retoma la marcha con precaución cuando haya pasado.']],
  });

  RB.scene('tren', {
    title: 'Cruce ferroviario', cat: 'Vehículos grandes y especiales', dur: 14, map: 'rail', thumb: 5.6,
    desc: 'El tren siempre tiene preferencia: espera a que suban las barreras.',
    bars: [{ x: 392, y: 228, dir: -90, len: 46, mv: [2, 3, 9.6, 10.4] }, { x: 468, y: 132, dir: 90, len: 46, mv: [2, 3, 9.6, 10.4] }],
    flash: [{ x: 386, y: 240, on: [1.6, 10] }, { x: 474, y: 120, on: [1.6, 10] }],
    actors: [
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [3.4, 356, 200, 'o'], [10.4, 356, 200], [12.4, 560, 200, 'i'], [14, 800, 200]], brake: [[2, 10.4]] },
      { id: 'w', k: 'car', c: WH, path: [[0, 700, 160], [3.6, 504, 160, 'o'], [10.6, 504, 160], [12.6, 300, 160, 'i'], [14, 60, 160]], brake: [[2, 10.6]] },
      { id: 'train', k: 'train', path: [[0, 430, -630], [14, 430, 1330]] },
    ],
    cap: [[0, 1.6, 'Te acercas a un paso a nivel.'], [1.6, 3.4, 'Las luces destellan y las barreras bajan: detente antes de la línea.'], [3.4, 7.4, 'El tren siempre tiene preferencia: no puede frenar a tiempo.'], [7.4, 10.4, 'Espera a que las barreras suban por completo.'], [10.4, 14.1, 'Cruza sin detenerte sobre la vía y solo si hay espacio al otro lado.']],
  });

  RB.scene('bus', {
    title: 'Bus en el paradero', cat: 'Vehículos grandes y especiales', dur: 13, map: 'road', mo: { stop: [420] }, thumb: 5.6,
    desc: 'Detención junto a la acera, puertas y reincorporación segura.',
    actors: [
      { id: 'p1', k: 'ped', c: '#7a7a7a', path: [[0, 410, 258], [5.2, 410, 258], [6, 410, 244]], show: [0, 6] },
      { id: 'p2', k: 'ped', path: [[0, 446, 258], [5.6, 446, 258], [6.1, 438, 252], [6.8, 434, 244]], show: [0, 6.8] },
      { id: 'bus', k: 'bus', path: [[0, -80, 200], [3, 300, 204], [3.9, 372, 227], [4.6, 412, 232, 'o'], [8.2, 412, 232], [9.1, 450, 226, 'i'], [9.9, 500, 208], [13, 820, 200]], brake: [[3.4, 8.2]], bR: [[2.4, 4.6]], bL: [[7.4, 9.6]], doors: [[5, 7.4]] },
      { id: 'c1', k: 'car', c: GR, path: [[0, -200, 200], [13, 900, 200]] },
    ],
    cap: [[0, 2.4, 'El bus se acerca al paradero.'], [2.4, 4.6, 'Señaliza y detente junto a la acera, solo en paraderos autorizados.'], [4.6, 7.6, 'Abre las puertas solo con el bus completamente detenido.'], [7.6, 9.6, 'Cierra las puertas antes de partir, señaliza y revisa los espejos.'], [9.6, 13.1, 'Reincorpórate con suavidad: hay pasajeros de pie.']],
  });

  RB.scene('tractor', {
    title: 'Maquinaria en la carretera', cat: 'Vehículos grandes y especiales', dur: 12, map: 'road', mo: { L: 1800, center: [[0, 600, 'solid'], [600, 1800, 'dash']] }, cam: { f: 'ego', x: 200, L: 1800 }, thumb: 4,
    desc: 'Paciencia detrás de la maquinaria lenta y adelantamiento seguro.',
    actors: [
      { id: 'trac', k: 'tractor', fn: t => ({ x: 420 + 50 * t, y: 208 }) },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 140, 200], [3, 460, 200], [6.2, 620, 200], [7, 700, 170], [8.2, 880, 166], [9.2, 1010, 200], [12, 1400, 200]], bL: [[6, 7]], bR: [[8.6, 9.4]] },
      { id: 'o1', k: 'car', c: WH, fn: t => ({ x: 1500 - 260 * t, y: 160 }) },
    ],
    cap: [[0, 3, 'Maquinaria en la vía: es lenta y ocupa espacio.'], [3, 6.2, 'Con línea continua no se adelanta: espera con paciencia.'], [6.2, 9.4, 'Línea discontinua y pista contraria despejada: adelanta con decisión.'], [9.4, 12.1, 'Si conduces la maquinaria, usa luces y balizas y facilita el adelantamiento.']],
  });

  RB.scene('moto-curva', {
    title: 'Moto en una curva', cat: 'Vehículos grandes y especiales', dur: 9, map: 'curve', thumb: 3,
    desc: 'Frena antes de la curva y mira hacia la salida.',
    actors: [
      { id: 'moto', k: 'moto', c: EGO, path: [[0, 220, 480], [1.4, 220, 300], [2.4, 220, 210], ...arc(300, 200, 80, 180, 270, 2.4, 4.2, 12), [5.4, 380, 120], [6.6, 520, 120], [9, 760, 120]], brake: [[1.4, 2.4]] },
    ],
    cap: [[0, 1.4, 'Te acercas a una curva.'], [1.4, 2.6, 'Frena antes de entrar, con la moto recta.'], [2.6, 4.6, 'Dentro de la curva, acelerador suave y constante. Mira hacia la salida.'], [4.6, 9.1, 'Al salir de la curva, acelera de forma progresiva.']],
  });

  // ---------- Percepción de riesgos ----------
  RB.scene('h-pelota', {
    title: 'Riesgo: entre autos estacionados', cat: 'Percepción de riesgos', dur: 9, map: 'road', mo: { L: 1800 }, cam: { f: 'ego', x: 200, L: 1800 }, thumb: 2,
    hz: { w: [3, 4.6], txt: 'La pelota que sale entre los autos estacionados anuncia que un niño puede aparecer detrás. Debías reaccionar apenas apareció la pelota.' },
    actors: [
      ...parked([360, 420, 480, 540, 600, 720, 780, 840, 900, 960], 232, 0),
      ...parked([400, 470, 700, 800, 1000], 128, 180),
      { id: 'ball', k: 'ball', path: [[0, 660, 240], [3, 660, 240], [4.4, 660, 150, 'o'], [9, 660, 150]], show: [2.95, 9] },
      { id: 'kid', k: 'child', path: [[0, 660, 252], [3.9, 660, 252], [4.7, 660, 218, 'o'], [6.4, 660, 218], [7.6, 660, 252]], show: [3.85, 7.7] },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [3.5, 550, 200], [4.6, 627, 200, 'o'], [7.2, 627, 200], [9, 780, 200, 'i']], brake: [[3.5, 7.2]] },
    ],
  });

  RB.scene('h-frenazo', {
    title: 'Riesgo: frenazo adelante', cat: 'Percepción de riesgos', dur: 9, map: 'road', mo: { L: 1800, cw: [900] }, cam: { f: 'ego', x: 200, L: 1800 }, thumb: 2,
    hz: { w: [3, 5], txt: 'El peatón que empezaba a cruzar obligó al auto de adelante a frenar. Si anticipas y mantienes la distancia, frenas con suavidad.' },
    actors: [
      ...parked([300, 560, 640, 1100], 128, 180),
      { id: 'ped', k: 'ped', path: [[0, 900, 104], [3, 900, 104], [6.6, 900, 256]] },
      { id: 'lead', k: 'car', c: WH, path: [[0, 200, 200], [3.6, 740, 200], [4.8, 830, 200, 'o'], [7.2, 830, 200], [9, 1000, 200, 'i']], brake: [[3.6, 7.2]] },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 40, 200], [4.2, 670, 200], [5.6, 775, 200, 'o'], [7.6, 775, 200], [9, 900, 200, 'i']], brake: [[4.2, 7.6]] },
    ],
  });

  RB.scene('h-puerta', {
    title: 'Riesgo: puerta que se abre', cat: 'Percepción de riesgos', dur: 8, map: 'road', mo: { L: 1800 }, cam: { f: 'ego', x: 200, L: 1800 }, thumb: 2,
    hz: { w: [3.2, 4.8], txt: 'Había una persona dentro del auto estacionado y se encendieron sus luces de freno: señales de que podía abrir la puerta. Pasa con distancia lateral y a velocidad moderada.' },
    actors: [
      ...parked([420, 480, 540, 620, 780, 860, 940], 232, 0),
      { id: 'pd', k: 'car', c: '#4a4a4a', path: [[0, 700, 232]], ang: 0, occ: true, door: [3.6], brake: [[2.6, 3.3]] },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [3.9, 606, 200], [4.8, 700, 186], [5.8, 800, 184], [6.6, 900, 200], [8, 1100, 200]], brake: [[3.9, 4.7]] },
    ],
  });

  RB.scene('h-cruce', {
    title: 'Riesgo: auto que no respeta el PARE', cat: 'Percepción de riesgos', dur: 8, map: 'road', mo: { L: 1800, side: [{ x: 800, pare: true }] }, cam: { f: 'ego', x: 200, L: 1800 }, thumb: 2,
    hz: { w: [3.1, 4.6], txt: 'El auto de la calle lateral se acercaba rápido al PARE y no frenó. Al verlo, debías soltar el acelerador y prepararte para frenar.' },
    actors: [
      ...parked([400, 470, 540, 1000, 1070], 232, 0),
      { id: 'sc', k: 'car', c: WH, path: [[0, 820, 936], [6, 820, -144]] },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [3.8, 592, 200], [5, 676, 200, 'o'], [6.4, 676, 200], [8, 860, 200, 'i']], brake: [[3.8, 6.4]] },
    ],
  });

  RB.scene('h-bus', {
    title: 'Riesgo: peatón tras un bus', cat: 'Percepción de riesgos', dur: 8, map: 'road', mo: { L: 1800, stop: [676] }, cam: { f: 'ego', x: 200, L: 1800 }, thumb: 2,
    hz: { w: [3.2, 4.8], txt: 'El bus detenido tapaba la visión y un peatón cruzó por delante de él. Al pasar junto a un bus en el paradero, reduce la velocidad.' },
    actors: [
      ...parked([300, 360, 420, 900, 960], 232, 0),
      { id: 'bus', k: 'bus', path: [[0, 676, 232]], ang: 0 },
      { id: 'w1', k: 'ped', c: '#6f6f6f', path: [[0, 650, 258]] },
      { id: 'ped', k: 'ped', path: [[0, 722, 236], [3.4, 722, 236], [5, 722, 170], [7, 722, 104]], show: [3.3, 8] },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [3.7, 541, 200], [4.9, 619, 200, 'o'], [6.8, 619, 200], [8, 760, 200, 'i']], brake: [[3.7, 6.8]] },
    ],
  });

  RB.scene('h-ciclista', {
    title: 'Riesgo: ciclista que esquiva', cat: 'Percepción de riesgos', dur: 8, map: 'road', mo: { L: 1800, holes: [[820, 214]] }, cam: { f: 'ego', x: 200, L: 1800 }, thumb: 2,
    hz: { w: [3.6, 5], txt: 'El ciclista tenía que esquivar un hoyo y se desvió hacia tu pista. Si ves un obstáculo delante de un ciclista, anticipa que se moverá.' },
    actors: [
      ...parked([1000, 1080], 232, 0),
      ...parked([500, 600, 900], 128, 180),
      { id: 'bike', k: 'bike', c: '#bdbdbd', path: [[0, 560, 214], [3.8, 788, 214], [4.4, 824, 198], [5.2, 872, 198], [5.8, 908, 212], [8, 1040, 212]] },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [4.1, 634, 200], [4.6, 690, 200], [5.1, 728, 200], [5.6, 760, 200], [8, 904, 200]], brake: [[4.1, 5.6]] },
    ],
  });
  // ---------- Escenas agregadas ----------
  const ring = (p, txt) => p ? `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="26" fill="none" stroke="${EGO}" stroke-width="3"/>` + (txt ? label(p.x, p.y - 32, txt, 12) : '') : '';
  RB.scene('estacionar', {
    title: 'Dónde no estacionar', cat: 'Normas y preferencias', dur: 14, map: 'road', thumb: 1,
    mo: { cw: [440], cwFull: true, hydrant: [110], drive: [230], side: [{ x: 600 }], center: [[0, 550, 'dash']] },
    desc: 'Grifos, garajes, doble fila, pasos peatonales, veredas y esquinas.',
    actors: [
      { id: 'A', k: 'car', c: '#4b4b4b', path: [[0, 110, 232]], ang: 0 },
      { id: 'B', k: 'car', c: '#3a3a3a', path: [[0, 230, 232]], ang: 0 },
      { id: 'C', k: 'car', c: '#575757', path: [[0, 330, 232]], ang: 0 },
      { id: 'D', k: 'car', c: '#8f8f8f', path: [[0, 330, 200]], ang: 0 },
      { id: 'E', k: 'car', c: '#4b4b4b', path: [[0, 440, 232]], ang: 0 },
      { id: 'I', k: 'car', c: '#3a3a3a', path: [[0, 528, 232]], ang: 0 },
      { id: 'G', k: 'car', c: '#575757', path: [[0, 200, 128]], ang: 180 },
      { id: 'H', k: 'car', c: '#6a6a6a', path: [[0, 380, 104]], ang: 0 },
    ],
    cap: [[0, 2.5, '¿Dónde no se puede estacionar?'], [2.5, 4.5, 'A menos de 5 metros de un grifo.'], [4.5, 6.5, 'Frente a la entrada de un garaje.'], [6.5, 8.5, 'En doble fila.'], [8.5, 10.5, 'Sobre un paso peatonal o sobre la vereda.'], [10.5, 12.5, 'A menos de 10 metros de una esquina.'], [12.5, 14.1, 'Estaciona solo donde esté permitido.']],
    ovw: (t, P) => t < 2.5 ? '' : t < 4.5 ? ring(P.A, 'grifo') : t < 6.5 ? ring(P.B, 'garaje') : t < 8.5 ? ring(P.D, 'doble fila') : t < 10.5 ? ring(P.E, 'paso peatonal') + ring(P.H, 'vereda') : t < 12.5 ? ring(P.I, 'esquina') : ring(P.C, 'bien') + ring(P.G, 'bien'),
  });

  RB.scene('giro', {
    title: 'Virar a la izquierda', cat: 'Normas y preferencias', dur: 10, map: 'cross', thumb: 4.6,
    desc: 'Con luz verde, cede el paso a quienes vienen de frente y a los peatones.',
    lights: [{ x: 376, y: 262, seq: [[0, 'g']] }, { x: 264, y: 98, seq: [[0, 'g']] }, { x: 404, y: 122, seq: [[0, 'r']] }, { x: 236, y: 238, seq: [[0, 'r']] }],
    actors: [
      { id: 'ego', k: 'car', c: EGO, path: [[0, 340, 430], [3.2, 340, 270], [4.2, 334, 206, 'o'], [6.6, 334, 206], ...arc(294, 206, 40, 0, -90, 6.6, 8, 10), [10, -60, 166]], bL: [[2.2, 8]], brake: [[3.4, 6.6]] },
      { id: 'o', k: 'car', c: WH, path: [[0, 300, -60], [2.6, 300, -40], [6.2, 300, 420]] },
      { id: 'ped', k: 'ped', path: [[0, 263, 240], [3, 263, 240], [8, 263, 122]] },
    ],
    cap: [[0, 3, 'Luz verde: quieres virar a la izquierda.'], [3, 5.6, 'Avanza al centro del cruce y espera: quienes vienen de frente tienen preferencia.'], [5.6, 7.8, 'Cede el paso también a los peatones que cruzan la calle a la que entras.'], [7.8, 10.1, 'Cuando esté despejado, completa el viraje.']],
  });

  RB.scene('noche', {
    title: 'Luces de noche', cat: 'Adelantar y distancia', dur: 11, map: 'road', mo: { L: 1800, rural: true }, cam: { f: 'ego', x: 160, L: 1800 }, night: true, thumb: 3,
    desc: 'Cuándo usar luces altas y cuándo cambiar a bajas.',
    actors: [
      { id: 'ego', k: 'car', c: EGO, fn: t => ({ x: 80 + 120 * t, y: 200 }), beam: [[0, 3.2, 'high'], [3.2, 6, 'low'], [6, 12, 'high']] },
      { id: 'o', k: 'car', c: WH, fn: t => ({ x: 1500 - 140 * t, y: 160 }), beam: [[0, 3.4, 'high'], [3.4, 12, 'low']] },
      { id: 'ped', k: 'ped', c: '#2a2a2a', path: [[0, 1300, 230]], ang: 0 },
    ],
    cap: [[0, 3, 'De noche en carretera puedes usar luces altas si no hay nadie adelante.'], [3, 5.8, 'Viene un vehículo de frente: cambia a luces bajas para no encandilarlo.'], [5.8, 8, 'Cuando se cruzan, puedes volver a las luces altas.'], [8, 11.1, 'Un peatón con ropa oscura casi no se ve: modera la velocidad.']],
  });

  RB.scene('autopista', {
    title: 'Entrar a una autopista', cat: 'Adelantar y distancia', dur: 9, map: 'hwy', mo: { L: 2200, ramp: 1000 }, cam: { f: 'ego', x: 220, L: 2200 }, thumb: 3.6,
    desc: 'Usa la vía de aceleración y busca un espacio seguro.',
    actors: [
      { id: 'A', k: 'car', c: WH, fn: t => ({ x: 520 + 150 * t, y: 200 }) },
      { id: 'B', k: 'car', c: GR, fn: t => ({ x: -260 + 150 * t, y: 200 }) },
      { id: 'C', k: 'car', c: DK, fn: t => ({ x: -100 + 190 * t, y: 160 }) },
      { id: 'o1', k: 'car', c: GR, fn: t => ({ x: 2000 - 200 * t, y: 50 }) },
      { id: 'o2', k: 'car', c: DK, fn: t => ({ x: 2600 - 210 * t, y: 90 }) },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 240], [2, 240, 240], [3.6, 480, 240], [5, 720, 234], [6, 880, 214], [6.8, 1000, 201], [9, 1340, 200]], bL: [[2.4, 6.6]] },
    ],
    cap: [[0, 2.4, 'Usa la vía de aceleración para alcanzar la velocidad del tránsito.'], [2.4, 5, 'Mira el espejo y el punto ciego, y señaliza a la izquierda.'], [5, 7, 'Ingresa en un espacio seguro, cediendo el paso a quienes ya circulan.'], [7, 9.1, 'No te detengas al final de la vía de aceleración si no es necesario.']],
  });

  RB.scene('adelantado', {
    title: 'Cuando te adelantan', cat: 'Adelantar y distancia', dur: 9, map: 'road', mo: { L: 1800 }, cam: { f: 'ego', x: 260, L: 1800 }, thumb: 3.6,
    desc: 'No aceleres y facilita la maniobra del otro vehículo.',
    actors: [
      { id: 'ego', k: 'car', c: EGO, fn: t => ({ x: 200 + 120 * t, y: 204 }) },
      { id: 'ov', k: 'car', c: WH, path: [[0, -200, 200], [2.2, 240, 200], [3, 400, 172], [5, 840, 168], [5.8, 1010, 196], [9, 1600, 200]], bL: [[1.8, 3.2]], bR: [[5.2, 6.2]] },
      { id: 'o1', k: 'car', c: GR, fn: t => ({ x: 2400 - 200 * t, y: 160 }) },
    ],
    cap: [[0, 2.2, 'Un vehículo más rápido se acerca por detrás.'], [2.2, 5.2, 'Te está adelantando: no aumentes la velocidad y mantente a la derecha.'], [5.2, 7.4, 'Facilita que vuelva a su pista con seguridad.'], [7.4, 9.1, 'Si es necesario, reduce un poco la velocidad.']],
  });

  RB.scene('emergencia-cruce', {
    title: 'Ambulancia en un cruce', cat: 'Vehículos grandes y especiales', dur: 10, map: 'cross', thumb: 3.4,
    desc: 'Aunque tengas luz verde, cede el paso al vehículo de emergencia.',
    lights: [{ x: 376, y: 262, seq: [[0, 'g']] }, { x: 264, y: 98, seq: [[0, 'g']] }, { x: 404, y: 122, seq: [[0, 'r']] }, { x: 236, y: 238, seq: [[0, 'r']] }],
    actors: [
      { id: 'ego', k: 'car', c: EGO, path: [[0, 340, 440], [2.4, 340, 330], [3.6, 340, 284, 'o'], [6.4, 340, 284], [8.6, 340, 60, 'i'], [10, 340, -140]], brake: [[2.6, 6.4]] },
      { id: 'n', k: 'car', c: GR, path: [[0, 300, -80], [2.4, 300, 40], [3.6, 300, 78, 'o'], [6.2, 300, 78], [8.4, 300, 420, 'i']], brake: [[2.6, 6.2]] },
      { id: 'amb', k: 'amb', path: [[0, 760, 160], [2.6, 700, 160], [5.6, -120, 160]], siren: true },
    ],
    cap: [[0, 2.4, 'Tienes luz verde, pero se acerca una ambulancia con sirena.'], [2.4, 5, 'Los vehículos de emergencia tienen preferencia: detente y déjala pasar.'], [5, 7.4, 'Asegúrate de que no venga otro vehículo de emergencia.'], [7.4, 10.1, 'Luego continúa con precaución.']],
  });

  RB.scene('escolar', {
    title: 'Zona escolar', cat: 'Normas y preferencias', dur: 16, map: 'road', mo: { L: 1600, cw: [760], signs: [['escolares', 300, 256, 22], ['vel30', 336, 256, 20]] }, cam: { f: 'ego', x: 220, L: 1600 }, thumb: 9.5,
    desc: 'Velocidad máxima de 30 km/h en horario de entrada y salida de alumnos.',
    actors: [
      { id: 'c1', k: 'child', c: '#9a9a9a', path: [[0, 752, 262], [8, 752, 262], [12, 752, 100]] },
      { id: 'c2', k: 'child', c: '#7a7a7a', path: [[0, 763, 264], [8.3, 763, 264], [12.3, 763, 100]] },
      { id: 'g', k: 'ped', c: '#bdbdbd', path: [[0, 774, 262], [8, 774, 262], [12.4, 774, 100]] },
      { id: 'w', k: 'car', c: WH, path: [[0, 1100, 160], [7, 860, 160], [8.6, 800, 160, 'o'], [12.6, 800, 160], [14.6, 400, 160, 'i'], [16, 100, 160]], brake: [[7.4, 12.6]] },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [2, 340, 200], [3.4, 460, 200], [6.4, 640, 200], [9, 718, 200, 'o'], [12.2, 718, 200], [14, 900, 200, 'i'], [16, 1200, 200]], brake: [[2, 3.4], [8, 12.2]] },
    ],
    cap: [[0, 2.2, 'Zona escolar: atento a la señal.'], [2.2, 6.4, 'En horario de entrada y salida de alumnos, la velocidad máxima es 30 km/h.'], [6.4, 10, 'Detente y deja cruzar a los niños.'], [10, 13, 'Los niños pueden correr o cambiar de dirección de improviso.'], [13, 16.1, 'Retoma la marcha con precaución.']],
  });

  // ---------- Percepción de riesgos agregada ----------
  RB.scene('h-moto', {
    title: 'Riesgo: moto en el punto ciego', cat: 'Percepción de riesgos', dur: 9, map: 'hwy', mo: { L: 2000 }, cam: { f: 'ego', x: 220, L: 2000 }, thumb: 2,
    hz: { w: [2.8, 4.4], txt: 'Al empezar a cambiarte de pista, una moto se acercaba rápido por la izquierda. Antes de cambiarte, revisa el espejo y gira la cabeza para ver el punto ciego.' },
    actors: (() => {
      const yk = track([[0, 200], [2.6, 200], [3.5, 189], [4.4, 200], [5.8, 200], [7.2, 162], [9, 160]]);
      return [
        { id: 'trk', k: 'truck', fn: t => ({ x: 560 + 90 * t, y: 200 }) },
        { id: 'moto', k: 'moto', c: WH, fn: t => ({ x: -400 + 260 * t, y: 160 }) },
        { id: 'o1', k: 'car', c: GR, fn: t => ({ x: 2000 - 200 * t, y: 50 }) },
        { id: 'ego', k: 'car', c: EGO, fn: t => ({ x: 200 + 130 * t, y: yk(t)[0] }), bL: [[2.2, 3.6], [5.4, 7.2]] },
      ];
    })(),
  });

  RB.scene('h-giro', {
    title: 'Riesgo: auto que vira delante', cat: 'Percepción de riesgos', dur: 8, map: 'road', mo: { L: 1800, side: [{ x: 930 }] }, cam: { f: 'ego', x: 200, L: 1800 }, thumb: 2,
    hz: { w: [2.6, 4.2], txt: 'El auto que venía de frente puso el intermitente y empezó a virar a la izquierda, cruzando tu camino. Al ver su señal debías soltar el acelerador y prepararte para frenar.' },
    actors: [
      ...parked([420, 480, 1100], 232, 0),
      { id: 'oc', k: 'car', c: WH, path: [[0, 1500, 160], [2.6, 1100, 160], [3.6, 960, 160], ...arc(960, 200, 40, -90, -180, 3.6, 4.4, 8), [6, 920, 440]], bL: [[1.8, 4.4]], brake: [[2.8, 3.6]] },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [3.9, 606, 200], [5.1, 690, 200, 'o'], [6.4, 690, 200], [8, 900, 200, 'i']], brake: [[3.9, 6.4]] },
    ],
  });

  RB.scene('h-retroceso', {
    title: 'Riesgo: auto saliendo de reversa', cat: 'Percepción de riesgos', dur: 8, map: 'road', mo: { L: 1800, drive: [820] }, cam: { f: 'ego', x: 200, L: 1800 }, thumb: 2,
    hz: { w: [2.4, 4.2], txt: 'Las luces de freno y de retroceso del auto en el garaje anunciaban que iba a salir de reversa. Debías reducir la velocidad y prepararte para detenerte.' },
    actors: [
      ...parked([400, 470, 1000, 1070], 232, 0),
      { id: 'R', k: 'car', c: '#5a5a5a', path: [[0, 820, 298], [3, 820, 298], [4.6, 820, 242, 'io'], [8, 820, 242]], fix: 90, brake: [[2.4, 3], [4.6, 5.2]], rvl: [[2.6, 4.8]] },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [3.7, 578, 200], [4.9, 662, 200, 'o'], [6.6, 662, 200], [8, 860, 200, 'i']], brake: [[3.7, 6.6]] },
    ],
  });

  RB.scene('h-perro', {
    title: 'Riesgo: animal en el camino', cat: 'Percepción de riesgos', dur: 8, map: 'road', mo: { L: 1800, rural: true }, cam: { f: 'ego', x: 200, L: 1800 }, thumb: 2,
    hz: { w: [2.6, 4.4], txt: 'Un animal junto a la vía puede cruzar en cualquier momento. Apenas lo viste, debías reducir la velocidad.' },
    actors: [
      { id: 'dog', k: 'dog', path: [[0, 900, 262], [3.2, 900, 262], [4.6, 900, 150, 'io'], [9, 900, 118]] },
      { id: 'o1', k: 'car', c: GR, fn: t => ({ x: 1700 - 120 * t, y: 160 }) },
      { id: 'ego', k: 'car', c: EGO, path: [[0, 60, 200], [3.8, 592, 200], [5, 676, 200, 'o'], [6.6, 676, 200], [8, 860, 200, 'i']], brake: [[3.8, 6.6]] },
    ],
  });
})();
