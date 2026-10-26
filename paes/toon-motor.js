// Motor de los videos en dibujos. Lee las órdenes de cada plano, arma el escenario con personajes, objetos y
// textos, y crea sus animaciones amarradas a las palabras que dice la narradora.
//
// Guía de órdenes (cada orden es un texto; @palabra = cuando la narradora dice esa palabra):
//   rey=rey c @rey              crea el personaje "rey" (elenco de toon.js) al centro, cuando dice "rey"
//   pp=+crown hi l drop @corona  crea un objeto (utilería de toon-arte.js) arriba a la izquierda, cae
//   juan=obrero/hold=sign:8_horas r walkl "Juan"   modifica el personaje; entra caminando; con nombre
//   rey say "¡El Estado soy yo!" @estado    globo de diálogo     ·  rey mood angry @furioso   ánimo
//   rey pose point @mira  ·  rey jump  ·  rey walk x220  ·  rey exit r  ·  rey emote !  ·  rey nod
//   T "ABSOLUTISMO" @absolutismo   palabra clave grande   ·   Y 1789 @mil   año   ·   N 97 % "del pueblo"
//   L "texto" x120 y300   rótulo  ·  arrow a b "rótulo"  flecha  ·  fx confetti  ·  cam zoom 1.4 x180 y300
// Posiciones: ll l lc c rc r rr (x) · top hi mid low g (y) · x123 y456 · tamaños tiny small mid big huge
// Entradas: pop hop drop rise zoom spin fade walk walkl walkr slidel slider grow none
// Anclas: @palabra · @palabra#2 (segunda vez) · @dos_palabras · @palabra+0.3 · @1.5 (s) · @40% · @end · @+0.5
(function () {
  const RB = window.RB = window.RB || {};
  const T = RB.toonKit = RB.toonKit || {};
  const D = typeof document !== 'undefined' ? document : null;
  const W0 = 360, H0 = 640, GROUND = 500;
  const XP = { ll: 50, l: 84, lc: 130, c: 180, rc: 230, r: 276, rr: 310 };
  const YP = { top: 150, hi: 205, mid: 300, low: 410, g: GROUND };
  const ENTERS = new Set(['pop', 'hop', 'drop', 'rise', 'zoom', 'spin', 'fade', 'walk', 'walkl', 'walkr', 'slidel', 'slider', 'none', 'grow']);
  const SIZES = { tiny: .5, small: .72, mid: .86, big: 1.22, huge: 1.55, giant: 2 };
  const ACTS = new Set(['say', 'think', 'mood', 'pose', 'jump', 'shake', 'nod', 'no', 'spin', 'walk', 'run', 'exit', 'emote', 'look', 'grow', 'shrink', 'fall', 'up', 'dance', 'tremble', 'hl', 'fire', 'drop', 'tilt', 'to', 'flip', 'hide', 'show', 'bounce', 'talk', 'pulse']);
  const GAP = { start: .35, sentence: .12, cue: .18, scene: .32, end: .9, quiz: 2.6 };
  const MAPOPS = new Set(['hl', 'dim', 'lab', 'pin', 'go', 'tok', 'zoom', 'reg']);
  T.GAP = GAP;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const key = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
  const hashN = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = seed => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const plain = s => String(s == null ? '' : s).replace(/\*\*|==/g, '').replace(/\s+/g, ' ').trim();
  const r1 = n => Math.round(n * 10) / 10;

  // ---------- Definición de un video ----------
  // RB.toon(id, { u: 'h1', l: 0, title, desc, shots: [{ ch, set, s, c: [...], k, ... }] })
  RB.toon = (id, def) => {
    let ch = def.title;
    const sc = def.shots.map((sh, i) => {
      if (sh.ch) ch = sh.ch;
      return Object.assign({}, sh, { h: ch, chs: !!sh.ch || i === 0, set: sh.set || (sh.k === 'map' ? 'chile' : sh.k === 'quiz' ? 'stage' : 'plain') });
    });
    RB.video(id, { kind: 'toon', u: def.u, l: def.l, title: def.title, desc: def.desc || '', ic: def.ic, sc });
  };
  // Lo que dice la narradora en cada plano, en el mismo orden que tools/guion.js y tools/voz.py.
  T.cuesOf = sc => sc.k === 'quiz'
    ? [{ k: 0, kind: 'q', text: plain(sc.s) }, { k: 1, kind: 'e', text: plain(sc.e), gap: GAP.quiz }]
    : [{ k: 0, kind: 'intro', text: plain(sc.s) }];

  // ---------- Línea de tiempo ----------
  T.timeline = (v, data) => {
    const { sentences, estSecs } = RB.vkit;
    const TT = { d: 0, rec: !!data, sc: [], cues: [], lines: [], quiz: [], env: (data && data.e) || '', toon: true, tq: [], chs: [] };
    let starts = [];
    if (data) {
      TT.d = data.d;
      starts = data.sc.slice();
      data.c.forEach(([si, k, kind, t0, t1, lines]) => TT.cues.push({ si, k, kind, t0, t1, lines: lines.map(([a, b, text, w]) => ({ t0: a, t1: b, text, w: w ? w.map(x => a + x / 100) : null })) }));
    } else {
      let t = GAP.start;
      v.sc.forEach((sc, si) => {
        if (si) t += GAP.scene;
        starts.push(si ? t - GAP.scene * .6 : 0);
        T.cuesOf(sc).forEach((c, ci) => {
          if (!c.text) return;
          if (ci) t += c.gap != null ? c.gap : GAP.cue;
          const c0 = t, lines = [];
          sentences(c.text).forEach((p, i) => {
            if (i) t += GAP.sentence;
            const d = Math.max(.8, estSecs(p) * .9 - .25), ws = p.split(/\s+/), tot = ws.reduce((n, w) => n + w.length + 2, 0);
            let acc = 0;
            lines.push({ t0: t, t1: t + d, text: p, w: ws.map(w => { const x = t + d * acc / tot; acc += w.length + 2; return x; }) });
            t += d;
          });
          TT.cues.push({ si, k: c.k, kind: c.kind, t0: c0, t1: t, lines, text: c.text });
        });
      });
      TT.d = t + GAP.end;
    }
    TT.cues.forEach(c => c.lines.forEach(l => { l.cue = c; TT.lines.push(l); }));
    TT.lines.sort((a, b) => a.t0 - b.t0);
    v.sc.forEach((sc, si) => {
      const t0 = starts[si] != null ? starts[si] : (si ? TT.sc[si - 1].t1 : 0);
      const t1 = si + 1 < v.sc.length ? (starts[si + 1] != null ? starts[si + 1] : TT.d) : TT.d;
      const cues = TT.cues.filter(c => c.si === si);
      const W = [];
      cues.forEach(c => c.lines.forEach(l => { if (l.text) l.text.split(/\s+/).forEach((w, j) => { const k = key(w); if (k) W.push([k, l.w && l.w[j] != null ? l.w[j] : l.t0]); }); }));
      TT.sc.push({ si, t0, t1, cues, W, k: sc.k || '', blockT: [], title: false, intro: null });
      if (sc.k === 'quiz') {
        const q = cues.find(c => c.kind === 'q'), e = cues.find(c => c.kind === 'e');
        TT.tq.push({ si, t0: q ? q.t0 : t0, tq: q ? q.t1 + .08 : t0 + 2, te: e ? e.t0 : t1 - 2, a: sc.a || 0, n: (sc.o || []).length, answered: null });
      }
      if (sc.chs) TT.chs.push({ si, t0, h: sc.h });
    });
    return TT;
  };

  // ---------- Anclas: el momento en que la narradora dice una palabra ----------
  const wmatch = (w, k) => w === k || (k.length >= 3 && w.startsWith(k));
  function anchorT(S, a, prev) {
    if (a == null || a === '') return null;
    let off = 0;
    const m = /^(.*?[^+-])([+-]\d+(?:\.\d+)?)$/.exec(a);
    if (m && !/^[+-]?\d+(\.\d+)?%?$/.test(a)) { a = m[1]; off = +m[2]; }
    if (/^\+\d/.test(a)) return prev + parseFloat(a);
    if (/^\d+(\.\d+)?$/.test(a)) return S.t0 + parseFloat(a) + off;
    if (/^\d+(\.\d+)?%$/.test(a)) return S.t0 + (S.t1 - S.t0) * parseFloat(a) / 100 + off;
    if (a === 'end') return S.t1 - .7 + off;
    if (a === 'start') return S.t0 + .15 + off;
    let nth = 1;
    const h = /^(.*)#(\d+)$/.exec(a);
    if (h) { a = h[1]; nth = +h[2]; }
    const ws = a.split('_').map(key).filter(Boolean);
    if (!ws.length) return null;
    let found = 0;
    for (let i = 0; i < S.W.length; i++) {
      if (ws.every((w, j) => S.W[i + j] && wmatch(S.W[i + j][0], w)) && ++found === nth) return S.W[i][1] + off;
    }
    return null;
  }
  T.anchorT = anchorT;

  // ---------- Órdenes ----------
  const TOK = s => (String(s).match(/"[^"]*"|\S+/g) || []).map(x => x[0] === '"' ? { q: x.slice(1, -1) } : x);
  function parse(sh) {
    const out = { act: {}, order: [], ev: [], err: [] };
    (sh.c || []).forEach((line, li) => {
      const tk = TOK(line);
      if (!tk.length || typeof tk[0] !== 'string') return out.err.push(`orden ${li + 1}: "${line}"`);
      const a = tk[0], words = [], quotes = [], kv = {};
      let at = null;
      tk.slice(1).forEach(x => {
        if (typeof x !== 'string') quotes.push(x.q);
        else if (x[0] === '@') at = x.slice(1);
        else if (/^[a-z]+=/.test(x)) { const i = x.indexOf('='); kv[x.slice(0, i)] = x.slice(i + 1).replace(/_/g, ' '); }
        else words.push(x);
      });
      if (a.includes('=')) {
        const i = a.indexOf('='), id = a.slice(0, i), type = a.slice(i + 1);
        const isProp = type[0] === '+';
        const it = { id, prop: isProp ? type.slice(1) : null, sp: isProp ? null : type.replace(/\//g, ' '), li, at, enter: null, x: null, y: null, s: 1, flip: false, kv, text: quotes[0], words };
        words.forEach(w => {
          if (XP[w] != null) it.x = XP[w];
          else if (YP[w] != null) it.y = YP[w];
          else if (ENTERS.has(w)) it.enter = w;
          else if (SIZES[w]) it.s *= SIZES[w];
          else if (w === '<') it.flip = true;
          else if (/^x-?\d+(\.\d+)?$/.test(w)) it.x = +w.slice(1);
          else if (/^y-?\d+(\.\d+)?$/.test(w)) it.y = +w.slice(1);
          else if (/^s(\d+\.?\d*|\.\d+)$/.test(w)) it.s *= +w.slice(1);
          else out.err.push(`${id}: no entiendo "${w}"`);
        });
        if (isProp && T.PROPS && !T.PROPS[it.prop]) out.err.push(`${id}: no existe el objeto ${it.prop}`);
        if (!isProp && T.CAST && !T.CAST[it.sp.split(' ')[0]]) out.err.push(`${id}: no existe el personaje ${it.sp}`);
        if (out.act[id]) out.err.push(`${id}: repetido`);
        out.act[id] = it; out.order.push(id);
        return;
      }
      const ev = { li, at, a, words, quotes, kv, text: quotes[0] };
      if (MAPOPS.has(a)) ev.type = 'map';
      else if (/^(T|Y|L|N|S)$/.test(a)) ev.type = 'hud';
      else if (/^(cam|fx|sfx|arrow|lima)$/.test(a)) ev.type = a;
      else {
        ev.type = 'do'; ev.id = a; ev.what = words[0]; ev.args = words.slice(1);
        if (!out.act[a]) out.err.push(`orden ${li + 1}: no existe "${a}"`);
        else if (!ACTS.has(ev.what)) out.err.push(`orden ${li + 1}: acción desconocida "${ev.what}"`);
      }
      out.ev.push(ev);
    });
    return out;
  }
  T.parse = parse;

  // Palabras de un plano sin audio (para revisar las anclas al escribir los videos).
  T.textWords = sc => T.cuesOf(sc).map(c => c.text).join(' ').split(/\s+/).map(key).filter(Boolean);
  T.check = (sc) => {
    const p = parse(sc), errs = p.err.slice();
    const S = { t0: 0, t1: 10, W: T.textWords(sc).map((w, i) => [w, i]) };
    const chk = (a, who) => { if (a && !/^[+]?\d|%$|^end$|^start$/.test(a) && anchorT(S, a, 0) == null) errs.push(`${who}: la narración no dice "@${a}"`); };
    p.order.forEach(id => chk(p.act[id].at, id));
    p.ev.forEach(e => chk(e.at, e.id || e.a));
    (sc.it || []).forEach(x => { const a = (x.find(y => typeof y === 'string' && y[0] === '@') || '').slice(1); chk(a, 'item'); });
    return errs;
  };

  // ---------- Pistas de animación ----------
  // Una pista junta todos los cambios de una propiedad de un elemento en una sola animación (sin choques).
  class Track {
    constructor(el, prop, v0) { this.el = el; this.p = prop; this.v0 = v0; this.v = v0; this.k = []; }
    to(t, v, d = .25, e = 'ease-out') { this.k.push([t, this.v, e], [t + Math.max(.001, d), v, 'linear']); this.v = v; return this; }
    hit(t, frames, e = 'ease-in-out', back = .14) {
      this.k.push([t, this.v, e]);
      frames.forEach(([dt, v]) => this.k.push([t + dt, v, e]));
      this.k.push([t + (frames.length ? frames[frames.length - 1][0] : 0) + back, this.v, 'linear']);
      return this;
    }
    // Cambios escalonados (sin interpolar) — para la boca al hablar.
    steps(t, vals, dt) { vals.forEach((v, i) => this.k.push([t + i * dt, v, 'steps(1, end)'])); this.k.push([t + vals.length * dt, this.v, 'linear']); return this; }
    build(A, t0, t1) {
      if (!this.el) return;
      const val = v => typeof v === 'object' ? v : { [this.p]: v };
      if (!this.k.length) {
        if (this.v0 == null) return;
        const v = val(this.v0);
        for (const p in v) { if (p.startsWith('--')) this.el.style.setProperty(p, v[p]); else this.el.style[p] = v[p]; }
        return;
      }
      const k = this.k.map((x, i) => x.concat(i)).sort((a, b) => a[0] - b[0] || a[3] - b[3]);
      const span = Math.max(.1, t1 - t0);
      const kf = [Object.assign({ offset: 0, easing: 'linear' }, val(this.v0))];
      k.forEach(([t, v, e]) => kf.push(Object.assign({ offset: Math.max(clamp((t - t0) / span, 0, 1), kf[kf.length - 1].offset), easing: e }, val(v))));
      kf.push(Object.assign({ offset: 1 }, val(k[k.length - 1][1])));
      A.add(this.el, kf, t0, span, 'linear');
    }
  }
  T.Track = Track;

  // ---------- Personajes en escena ----------
  const CH = { w: 160 * 1.15, h: 210 * 1.15, ax: .5, ay: 200 / 210, head: 46 / 210 };
  const rot = d => `rotate(${r1(d)}deg)`;
  function charParts(svg) {
    const q = s => svg.querySelector(s);
    return {
      aL: q('.aL'), fL: q('.fL'), aR: q('.aR'), fR: q('.fR'), lL: q('.lL'), lR: q('.lR'), all: q('.all'), bob: q('.bob'), hd: q('.hd'), sw: q('.sw'), ht: q('.ht'),
      eyes: q('.eyes'), eo: q('.eo'), ec: q('.ec'), bL: q('.bL'), bR: q('.bR'), ck: q('.ck'), mm: q('.mm'), mt: q('.mt'),
      m: { n: q('.m-n'), h: q('.m-h'), s: q('.m-s'), o: q('.m-o'), a: q('.m-a'), f: q('.m-f') },
    };
  }
  const MOUTHS = ['n', 'h', 's', 'o', 'a', 'f'];
  function charTracks(p, mood, pose) {
    const M = T.MOOD[mood] || T.MOOD.neutral, PO = T.POSE[pose] || T.POSE.idle;
    const tr = {
      aL: new Track(p.aL, 'transform', rot(PO[0])), fL: new Track(p.fL, 'transform', rot(PO[1])),
      aR: new Track(p.aR, 'transform', rot(PO[2])), fR: new Track(p.fR, 'transform', rot(PO[3])),
      lL: new Track(p.lL, 'transform', 'rotate(0deg)'), lR: new Track(p.lR, 'transform', 'rotate(0deg)'),
      all: new Track(p.all, 'transform', 'translateY(0px)'), hd: new Track(p.hd, 'transform', 'rotate(0deg)'),
      bL: new Track(p.bL, 'transform', `rotate(${M.b[0][0]}deg) translateY(${M.b[0][1]}px)`), bR: new Track(p.bR, 'transform', `rotate(${M.b[1][0]}deg) translateY(${M.b[1][1]}px)`),
      eo: new Track(p.eo, 'transform', `scale(${M.e || 1})`), eoo: new Track(p.eo, 'opacity', M.e ? '1' : '0'),
      ec: new Track(p.ec, 'opacity', M.e ? '0' : '1'), ck: new Track(p.ck, 'opacity', String(M.c)),
      mm: new Track(p.mm, 'opacity', '1'), mt: new Track(p.mt, 'opacity', '0'),
      m: {},
    };
    MOUTHS.forEach(k => { tr.m[k] = new Track(p.m[k], 'opacity', M.m === k ? '1' : '0'); });
    tr.mood = mood; tr.pose = pose;
    return tr;
  }
  function setMood(tr, t, mood) {
    const M = T.MOOD[mood] || T.MOOD.neutral;
    MOUTHS.forEach(k => tr.m[k].to(t, M.m === k ? '1' : '0', .1));
    tr.bL.to(t, `rotate(${M.b[0][0]}deg) translateY(${M.b[0][1]}px)`, .2);
    tr.bR.to(t, `rotate(${M.b[1][0]}deg) translateY(${M.b[1][1]}px)`, .2);
    tr.eo.to(t, `scale(${M.e || 1})`, .16);
    tr.eoo.to(t, M.e ? '1' : '0', .06);
    tr.ec.to(t, M.e ? '0' : '1', .06);
    tr.ck.to(t, String(M.c), .3);
    tr.mood = mood;
  }
  function setPose(tr, t, pose, d = .34) {
    const PO = T.POSE[pose] || T.POSE.idle;
    tr.aL.to(t, rot(PO[0]), d, RB.vkit.EASE.back); tr.fL.to(t, rot(PO[1]), d, RB.vkit.EASE.back);
    tr.aR.to(t, rot(PO[2]), d, RB.vkit.EASE.back); tr.fR.to(t, rot(PO[3]), d, RB.vkit.EASE.back);
    if (pose === 'wave') { const fr = []; for (let i = 0; i < 7; i++) fr.push([d + .2 + i * .2, rot(PO[3] + (i % 2 ? 26 : -18))]); tr.fR.hit(t, fr, 'ease-in-out', .2); }
    if (pose === 'cheer') { tr.all.hit(t + .05, [[.16, 'translateY(-22px)'], [.34, 'translateY(0px)'], [.5, 'translateY(-14px)'], [.66, 'translateY(0px)']], 'ease-out'); }
    tr.pose = pose;
  }
  function talk(tr, t, d) {
    const n = Math.max(2, Math.round(d / .13));
    const a = [], b = [];
    for (let i = 0; i < n; i++) { a.push(i % 2 ? '0' : '1'); b.push(i % 2 ? '1' : '0'); }
    tr.mt.steps(t, a, .13); tr.mm.steps(t, b, .13);
  }
  function walkLegs(tr, t, d) {
    const fr = [], fa = [], fb = [];
    for (let s = .0; s < d - .05; s += .16) { const i = Math.round(s / .16); fr.push([s + .16, rot(i % 2 ? -17 : 17)]); fa.push([s + .16, rot(i % 2 ? 17 : -17)]); fb.push([s + .08, 'translateY(-3px)'], [s + .16, 'translateY(0px)']); }
    tr.lL.hit(t, fr, 'ease-in-out', .1); tr.lR.hit(t, fa, 'ease-in-out', .1); tr.all.hit(t, fb, 'ease-in-out', .05);
  }

  // ---------- Construcción de un plano ----------
  const EMOTE = {
    '!': '<b class="em-t" style="color:#ffd23f">!</b>', '?': '<b class="em-t" style="color:#c6ff00">?</b>', '!?': '<b class="em-t" style="color:#ffd23f">!?</b>',
    heart: '<svg viewBox="0 0 60 54"><path d="M30 52 C30 52 4 36 4 18 C4 8 12 2 20 2 C25 2 28 5 30 9 C32 5 35 2 40 2 C48 2 56 8 56 18 C56 36 30 52 30 52Z" fill="#ff5a5f"/></svg>',
    angry: '<svg viewBox="0 0 40 40"><path d="M14 4 L16 14 L6 12 M26 4 L24 14 L34 12 M14 36 L16 26 L6 28 M26 36 L24 26 L34 28" stroke="#ff4d4d" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    sweat: '<svg viewBox="0 0 30 40"><path d="M15 2 C22 14 26 20 26 27 C26 34 21 38 15 38 C9 38 4 34 4 27 C4 20 8 14 15 2Z" fill="#7ec8ff"/></svg>',
    idea: '<svg viewBox="0 0 64 84"><circle cx="32" cy="32" r="31" fill="#ffd23f" opacity=".25"/><path d="M32 6 C46 6 55 16 55 29 C55 39 49 44 45 50 C43 53 43 57 43 60 L21 60 C21 57 21 53 19 50 C15 44 9 39 9 29 C9 16 18 6 32 6Z" fill="#ffd23f"/><rect x="21" y="60" width="22" height="13" rx="3" fill="#9aa3ad"/></svg>',
    zzz: '<b class="em-t" style="color:#9fd0ff;font-size:22px">z<small>z</small><small>z</small></b>',
    music: '<b class="em-t" style="color:#c6ff00">♪</b>', star: '<b class="em-t" style="color:#ffd23f">★</b>', money: '<b class="em-t" style="color:#7ccf7a">$</b>',
    check: '<b class="em-t" style="color:#3ecf6e">✓</b>', cross: '<b class="em-t" style="color:#ff5a5f">✗</b>', tear: '<svg viewBox="0 0 30 40"><path d="M15 2 C22 14 26 20 26 27 C26 34 21 38 15 38 C9 38 4 34 4 27 C4 20 8 14 15 2Z" fill="#7ec8ff"/></svg>',
  };
  const TRANS = ['iris', 'slide', 'zoom', 'slideup', 'iris', 'slide', 'pop', 'slideup'];
  const transOf = (v, si) => { const sc = v.sc[si]; if (!sc) return 'cut'; if (sc.tr) return sc.tr; if (si === 0) return 'fade'; return TRANS[(hashN(v.id + ':' + si) >>> 3) % TRANS.length]; };

  // Posición base y caja de cada actor.
  function geom(it) {
    if (it.prop) {
      const fn = T.PROPS[it.prop] || T.PROPS.question2;
      const o = Object.assign({ t: it.text || it.kv.t }, it.kv);
      if (it.kv.v) o.v = it.kv.v.split(',').map(Number);
      if (it.kv.f) o.f = it.kv.f;
      const [w, h, svg, opt] = fn(o);
      const g = (opt && opt.g) || it.y === GROUND;
      const s = it.s;
      const x = it.x != null ? it.x : XP.c, y = it.y != null ? it.y : (g ? GROUND : YP.mid);
      return { w: w * s, h: h * s, ax: .5, ay: g ? 1 : .5, x, y, svg: `<svg class="tp" viewBox="0 0 ${w} ${h}" aria-hidden="true">${svg}</svg>`, ground: g };
    }
    const sp = T.spec(it.sp);
    const s = it.s * (sp.k ? +sp.k : 1);
    const x = it.x != null ? it.x : XP.c, y = it.y != null ? it.y : GROUND;
    return { w: CH.w * s, h: CH.h * s, ax: CH.ax, ay: CH.ay, x, y, svg: T.charSVG(sp), sp, char: true };
  }

  T.build = (P, si) => {
    const { Anims, EASE } = RB.vkit;
    const v = P.v, sh = v.sc[si], S = P.T.sc[si];
    const A = new Anims();
    const el = D.createElement('div');
    el.className = 'ts';
    el.style.zIndex = String(10 + si);
    const stW = P.stage.clientWidth || W0, stH = P.stage.clientHeight || H0;
    const k = Math.min(stW / W0, stH / H0);
    const ox = (stW - W0 * k) / 2, oy = Math.max(0, (stH - H0 * k) / 2 - (stH - H0 * k) * .08);
    const set = (T.SETS[sh.set] || T.SETS.plain)();
    el.innerHTML = `<div class="ts-w" style="transform:translate(${r1(ox)}px,${r1(oy)}px) scale(${k.toFixed(4)})"><div class="ts-shk"><div class="ts-cam"><svg class="ts-set" viewBox="-200 -260 760 1160" preserveAspectRatio="none" aria-hidden="true">${set}</svg><div class="ts-act"></div><svg class="ts-ov" viewBox="0 0 ${W0} ${H0}" aria-hidden="true"></svg></div></div><div class="ts-hud"></div></div>`;
    P.scenesEl.appendChild(el);
    const setSvg = el.querySelector('.ts-set');
    const wEl = el.firstElementChild, cam = wEl.querySelector('.ts-cam'), shk = wEl.querySelector('.ts-shk'), act = wEl.querySelector('.ts-act'), hud = wEl.querySelector('.ts-hud'), ov = wEl.querySelector('.ts-ov');
    const T0 = S.t0 - .6, T1 = S.t1 + .6;
    const ctx = { P, v, sh, S, A, el, act, hud, ov, cam, shk, T0, T1, tracks: [], actors: {}, fx: [], rnd: rng(hashN(v.id + '#' + si)), lima: [] };
    const sfx = (t, n) => ctx.fx.push([t, n]);
    ctx.sfx = sfx;
    // Transición de entrada del plano y salida hacia el siguiente.
    const tr = transOf(v, si), trN = transOf(v, si + 1);
    const tIn = S.t0 - .2;
    const root = new Track(el, 'transform', 'none'), rootO = new Track(el, 'opacity', '1'), clip = new Track(el, 'clipPath', 'circle(150% at 50% 45%)');
    if (tr === 'fade') { rootO.v0 = rootO.v = '0'; rootO.to(Math.max(0, tIn), '1', .45); }
    else if (tr === 'iris') { clip.v0 = clip.v = 'circle(0% at 50% 45%)'; clip.to(tIn, 'circle(150% at 50% 45%)', .5, EASE.inout); }
    else if (tr === 'slide') { root.v0 = root.v = 'translateX(100%)'; root.to(tIn, 'translateX(0%)', .45, EASE.inout); }
    else if (tr === 'slideup') { root.v0 = root.v = 'translateY(100%)'; root.to(tIn, 'translateY(0%)', .45, EASE.inout); }
    else if (tr === 'zoom') { root.v0 = root.v = 'scale(1.35)'; rootO.v0 = rootO.v = '0'; root.to(tIn, 'scale(1)', .42, EASE.out); rootO.to(tIn, '1', .25); }
    else if (tr === 'pop') { root.v0 = root.v = 'scale(.6)'; rootO.v0 = rootO.v = '0'; root.to(tIn, 'scale(1)', .42, EASE.back); rootO.to(tIn, '1', .2); }
    if (si + 1 < v.sc.length) {
      const tOut = S.t1 - .2;
      if (trN === 'slide') root.to(tOut, 'translateX(-35%)', .45, EASE.inout);
      else if (trN === 'slideup') root.to(tOut, 'translateY(-30%)', .45, EASE.inout);
      else if (trN === 'zoom' || trN === 'pop') { root.to(tOut, 'scale(.92)', .45, EASE.inout); rootO.to(tOut + .1, '.3', .35); }
    }
    if (tr !== 'cut' && si > 0) sfx(tIn, 'whoosh');
    ctx.tracks.push(root, rootO, clip);
    // Cámara: acercamiento lento por defecto, o los movimientos que pida el plano.
    const camT = new Track(cam, 'transform', 'translate(0px,0px) scale(1)');
    const shkT = new Track(shk, 'transform', 'translate(0px,0px)');
    ctx.camT = camT; ctx.shkT = shkT;
    ctx.tracks.push(camT, shkT);
    propIdle(ctx, { te: S.t0 }, setSvg);
    // Plantillas.
    if (sh.k && T.TPL[sh.k]) T.TPL[sh.k](ctx);
    // Actores y órdenes.
    const pr = parse(sh);
    let prevT = S.t0 + .1, stagger = 0;
    const tOf = (a, def) => { const t = anchorT(S, a, prevT); const r = t != null ? t : def; prevT = r; return r; };
    const tes = pr.order.map(id => { const it = pr.act[id]; return it.at ? tOf(it.at, prevT + .3) : S.t0 + .15 + (stagger++) * .14; });
    if (!sh.k && tes.length && Math.min(...tes) > S.t0 + 1.5) { const i = tes.indexOf(Math.min(...tes)); tes[i] = S.t0 + .25; }
    pr.order.forEach((id, i) => { ctx.actors[id] = makeActor(ctx, pr.act[id], tes[i]); });
    const evs = pr.ev.map(e => Object.assign(e, { t: e.at ? tOf(e.at, prevT + .4) : null }));
    // Sin ancla: en orden, repartidas después de la última con ancla.
    let lastT = S.t0 + .4;
    evs.forEach(e => { if (e.t == null) e.t = lastT + .35; lastT = e.t; });
    evs.slice().sort((a, b) => a.t - b.t).forEach(e => runEvent(ctx, e));
    if ((!sh.k || sh.k === 'map') && !ctx.camUsed && !evs.some(e => e.type === 'cam' || (e.type === 'map' && e.a === 'zoom'))) camT.to(S.t0, 'translate(0px,0px) scale(1)', .01).to(S.t0 + .02, 'translate(-7.2px,-13.6px) scale(1.04)', Math.max(.5, S.t1 - S.t0), 'ease-in-out');
    // Todo listo: se crean las animaciones.
    Object.values(ctx.actors).forEach(a => { closeBubbles(ctx, a); autoGestures(ctx, a); });
    ctx.tracks.forEach(t => t.build(A, T0, T1));
    return { el, A, si, fx: ctx.fx, lima: ctx.lima, ctx };
  };

  function makeActor(ctx, it, te) {
    const { A, act, S, T0, T1 } = ctx;
    const { EASE } = RB.vkit;
    const g = geom(it);
    const box = D.createElement('div');
    box.className = 'ta';
    const L = g.x - g.w * g.ax, Tt = g.y - g.h * g.ay, ox = g.w * g.ax, oy = g.h * g.ay;
    box.style.cssText = `left:${r1(L)}px;top:${r1(Tt)}px;width:${r1(g.w)}px;height:${r1(g.h)}px;z-index:${it.kv.z || Math.round(g.y)}`;
    box.innerHTML = `<div class="ta-m" style="transform-origin:${r1(ox)}px ${r1(oy)}px"><div class="ta-j" style="transform-origin:${r1(ox)}px ${r1(oy)}px"><div class="ta-e" style="transform-origin:${r1(ox)}px ${r1(oy)}px"><div class="ta-f"${it.flip ? ' style="transform:scaleX(-1)"' : ''}>${g.svg}</div></div></div></div>`;
    act.appendChild(box);
    const m = box.firstElementChild, j = m.firstElementChild, e = j.firstElementChild;
    const a = { it, g, box, m, j, e, x: g.x, y: g.y, dx: 0, dy: 0, te, mood: it.kv.mood || (g.char ? 'happy' : null), pose: it.kv.pose || 'idle' };
    a.tm = new Track(m, 'transform', 'translate(0px,0px)');
    a.tj = new Track(j, 'transform', 'none');
    a.tE = new Track(e, 'transform', 'none');
    a.tO = new Track(e, 'opacity', '1');
    ctx.tracks.push(a.tm, a.tj, a.tE, a.tO);
    if (g.char) {
      a.parts = charParts(e.querySelector('svg'));
      a.ct = charTracks(a.parts, a.mood, a.pose);
      const c = a.ct;
      ctx.tracks.push(c.aL, c.fL, c.aR, c.fR, c.lL, c.lR, c.all, c.hd, c.bL, c.bR, c.eo, c.eoo, c.ec, c.ck, c.mm, c.mt, ...MOUTHS.map(k => c.m[k]));
      // Respira y parpadea solo.
      const r = ctx.rnd();
      if (a.parts.bob) A.add(a.parts.bob, [{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.6px)' }], T0 - r * 3, 1.3 + r * .5, 'ease-in-out', { iterations: Infinity, direction: 'alternate' });
      if (a.parts.eyes) A.add(a.parts.eyes, [{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1)', offset: .93 }, { transform: 'scaleY(.1)', offset: .965 }, { transform: 'scaleY(1)', offset: 1 }], T0 - r * 4, 3.2 + r * 1.6, 'linear', { iterations: Infinity });
    } else {
      propIdle(ctx, a, e.querySelector('svg'));
    }
    if (it.kv.label || (it.text && g.char)) label(ctx, a, it.kv.label || it.text);
    enter(ctx, a, it.enter || (g.char ? 'hop' : 'pop'), te);
    return a;
  }

  function enter(ctx, a, kind, t) {
    const { EASE } = RB.vkit;
    const { tE, tO } = a;
    const hide = (tr, v) => { tr.v0 = tr.v = v; };
    const sx = ctx.S;
    switch (kind) {
      case 'none': break;
      case 'pop': hide(tE, 'scale(0)'); hide(tO, '0'); tE.to(t, 'scale(1.14)', .24, 'ease-out').to(t + .24, 'scale(1)', .18, 'ease-in-out'); tO.to(t, '1', .12); ctx.sfx(t, 'pop'); break;
      case 'hop': hide(tE, 'translateY(34px) scale(.7)'); hide(tO, '0'); tE.to(t, 'translateY(-12px) scale(1.04)', .26, 'ease-out').to(t + .26, 'translateY(0px) scale(1)', .2, 'ease-in'); tO.to(t, '1', .12); ctx.sfx(t, 'pop'); break;
      case 'drop': hide(tE, 'translateY(-620px)'); hide(tO, '1'); tE.to(t, 'translateY(0px) scaleY(.84)', .42, 'cubic-bezier(.5,0,1,1)').to(t + .42, 'translateY(-16px) scaleY(1.04)', .14, 'ease-out').to(t + .56, 'translateY(0px) scaleY(1)', .14, 'ease-in'); ctx.sfx(t + .4, 'thud'); break;
      case 'rise': hide(tE, 'translateY(300px)'); hide(tO, '0'); tE.to(t, 'translateY(-10px)', .4, EASE.out).to(t + .4, 'translateY(0px)', .15); tO.to(t, '1', .2); ctx.sfx(t, 'swish'); break;
      case 'zoom': hide(tE, 'scale(2.8)'); hide(tO, '0'); tE.to(t, 'scale(.94)', .3, 'ease-out').to(t + .3, 'scale(1)', .14); tO.to(t, '1', .2); ctx.sfx(t, 'swish'); break;
      case 'spin': hide(tE, 'rotate(-220deg) scale(0)'); hide(tO, '0'); tE.to(t, 'rotate(12deg) scale(1.08)', .42, 'ease-out').to(t + .42, 'rotate(0deg) scale(1)', .16); tO.to(t, '1', .15); ctx.sfx(t, 'swish'); break;
      case 'fade': hide(tO, '0'); tO.to(t, '1', .45); break;
      case 'grow': hide(tE, 'scale(.15)'); hide(tO, '0'); tE.to(t, 'scale(1)', .9, 'ease-out'); tO.to(t, '1', .3); break;
      case 'slidel': case 'slider': { const d = kind === 'slidel' ? -1 : 1; hide(tE, `translateX(${d * 320}px)`); tE.to(t, `translateX(${-d * 10}px)`, .36, 'ease-out').to(t + .36, 'translateX(0px)', .12); ctx.sfx(t, 'swish'); break; }
      case 'walk': case 'walkl': case 'walkr': {
        const from = kind === 'walkl' ? -1 : kind === 'walkr' ? 1 : (a.x > W0 / 2 ? 1 : -1);
        const dist = from < 0 ? a.x + a.g.w : W0 - a.x + a.g.w;
        const d = clamp(dist / 170, .7, 2.2);
        a.tm.v0 = a.tm.v = `translate(${r1(from * dist)}px,0px)`;
        a.tm.to(t, 'translate(0px,0px)', d, 'linear');
        if (a.ct) walkLegs(a.ct, t, d);
        a.walkUntil = t + d;
        break;
      }
      default: hide(tO, '0'); tO.to(t, '1', .3);
    }
  }

  function label(ctx, a, text) {
    const d = D.createElement('div');
    d.className = 'tlbl';
    d.textContent = text;
    d.style.cssText = `left:${r1(a.g.w * a.g.ax)}px;top:${r1(a.g.h * (a.g.char ? a.g.ay : 1) + 6)}px`;
    a.m.appendChild(d);
    const t = a.te + .25;
    ctx.A.add(d, [{ opacity: 0, transform: 'translate(-50%,6px)' }, { opacity: 1, transform: 'translate(-50%,0px)' }], t, .3, 'ease-out');
  }

  // Animaciones propias de cada objeto (humo, llamas, ruedas, banderas...).
  function propIdle(ctx, a, svg) {
    const { A, T0 } = ctx;
    const r = ctx.rnd();
    const loop = (sel, kf, d, ex) => svg.querySelectorAll(sel).forEach((n, i) => A.add(n, kf, T0 - r * d - i * .37, d, 'ease-in-out', Object.assign({ iterations: Infinity }, ex || {})));
    loop('.smoke', [{ transform: 'translateY(0px) scale(.8)', opacity: .9 }, { transform: 'translateY(-26px) scale(1.25)', opacity: 0 }], 2.6);
    loop('.flame', [{ transform: 'scale(1,1)' }, { transform: 'scale(.94,1.08)' }], .32, { direction: 'alternate' });
    loop('.wheel', [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], 1.6, { easing: 'linear' });
    loop('.spin', [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], 9, { easing: 'linear' });
    loop('.prop', [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], .25, { easing: 'linear' });
    loop('.glow', [{ opacity: .12 }, { opacity: .32 }], 1.1, { direction: 'alternate' });
    loop('.flagw', [{ transform: 'skewY(0deg) scaleX(1)' }, { transform: 'skewY(4deg) scaleX(.96)' }], .7, { direction: 'alternate' });
    loop('.rock', [{ transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }], 1.8, { direction: 'alternate' });
    loop('.sea', [{ transform: 'translateX(0px)' }, { transform: 'translateX(-60px)' }], 3.5, { direction: 'alternate' });
    loop('.drops', [{ transform: 'translateY(-6px)', opacity: 1 }, { transform: 'translateY(8px)', opacity: .3 }], .5, { easing: 'linear' });
    loop('.mh', [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], 3, { easing: 'linear' });
    loop('.hh', [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], 36, { easing: 'linear' });
    loop('.piston', [{ transform: 'translateX(0px)' }, { transform: 'translateX(-18px)' }], .4, { direction: 'alternate' });
    loop('.shuttle', [{ transform: 'translateX(0px)' }, { transform: 'translateX(60px)' }], .6, { direction: 'alternate' });
    loop('.cw', [{ transform: 'translateY(0px)' }, { transform: 'translateY(-4px)' }], .5, { direction: 'alternate' });
    loop('.tw', [{ opacity: .15 }, { opacity: .95 }], 1.7, { direction: 'alternate' });
    loop('.spark', [{ opacity: 1, transform: 'scale(1)' }, { opacity: .4, transform: 'scale(1.5)' }], .18, { direction: 'alternate' });
    loop('.vote', [{ transform: 'translateY(-10px)', opacity: 0 }, { transform: 'translateY(0px)', opacity: 1, offset: .3 }, { transform: 'translateY(26px)', opacity: 1, offset: .8 }, { transform: 'translateY(30px)', opacity: 0 }], 1.6, { easing: 'linear' });
    svg.querySelectorAll('.bar').forEach((n, i) => A.add(n, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], a.te + .2 + i * .12, .45, RB.vkit.EASE.back));
    svg.querySelectorAll('.line').forEach(n => A.add(n, [{ strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDasharray: '1 1', strokeDashoffset: 0 }], a.te + .2, 1.1, 'ease-in-out'));
  }

  function bubble(ctx, a, t, text, kind, dur) {
    const d = D.createElement('div');
    d.className = 'tb' + (kind === 'think' ? ' think' : '');
    const len = text.length, w = clamp(len * 8.6 + 26, 70, 196);
    // Centrado sobre la cabeza, sin salirse del escenario.
    const cx = a.x + a.dx, leftW = clamp(cx - w / 2, 8, W0 - 8 - w) - (cx - w / 2);
    const top = a.g.char ? a.g.h * .215 : 0;
    d.style.cssText = `width:${r1(w)}px;left:${r1(a.g.w * a.g.ax - w / 2 + leftW)}px;bottom:${r1(a.g.h - top + 10)}px;--tail:${r1(w / 2 - leftW)}px`;
    d.innerHTML = `<span>${esc(text)}</span>`;
    a.m.appendChild(d);
    const { A } = ctx;
    A.add(d, [{ opacity: 0, transform: 'scale(.3) translateY(14px)' }, { opacity: 1, transform: 'scale(1.06)', offset: .7 }, { opacity: 1, transform: 'scale(1)' }], t, .32, 'ease-out');
    // El cierre se calcula al final: si el mismo personaje dice otra cosa antes, este globo se va en ese momento.
    (a.bubbles = a.bubbles || []).push({ d, t, end: t + dur });
    if (a.ct && kind !== 'think') talk(a.ct, t + .05, Math.min(dur, 1.4));
    ctx.sfx(t, 'blip');
  }
  function autoGestures(ctx, a) {
    if (!a.ct || !a.parts.sw) return;
    const { S } = ctx, r = ctx.rnd;
    const busy = (a.busy || []).concat([a.te]).sort((x, y) => x - y);
    const sw = new Track(a.parts.sw, 'transform', 'rotate(0deg)'), ht = new Track(a.parts.ht, 'transform', 'rotate(0deg)');
    ctx.tracks.push(sw, ht);
    let t = a.te + .9 + r() * .8;
    while (t < S.t1 - 1) {
      if (!busy.some(b => Math.abs(b - t) < .9)) {
        const k = r();
        if (k < .45) ht.hit(t, [[.35, `rotate(${r1((r() < .5 ? -1 : 1) * (4 + r() * 4))}deg)`], [1.1, `rotate(${r1((r() - .5) * 3)}deg)`]], 'ease-in-out', .35);
        else if (k < .8) sw.hit(t, [[.5, `rotate(${r1((r() < .5 ? -1 : 1) * (1.5 + r() * 1.5))}deg)`], [1.3, 'rotate(0deg)']], 'ease-in-out', .1);
        else ht.hit(t, [[.15, 'rotate(0deg) translateY(2px)'], [.3, 'rotate(0deg) translateY(0px)']], 'ease-in-out', .05);
      }
      t += 1.7 + r() * 1.3;
    }
  }
  function closeBubbles(ctx, a) {
    (a.bubbles || []).sort((x, y) => x.t - y.t).forEach((b, i, arr) => {
      const nx = arr[i + 1], end = nx ? Math.min(b.end, nx.t - .05) : b.end;
      ctx.A.add(b.d, [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.6) translateY(6px)' }], end, .2, 'ease-in', { fill: 'forwards' });
    });
  }

  function emote(ctx, a, t, kind) {
    const d = D.createElement('div');
    d.className = 'tem';
    d.innerHTML = EMOTE[kind] || EMOTE['!'];
    const top = a.g.char ? a.g.h * .18 : -6;
    d.style.cssText = `left:${r1(a.g.w * a.g.ax + (a.g.char ? 26 : 0))}px;top:${r1(top)}px`;
    a.m.appendChild(d);
    const { A } = ctx;
    if (kind === 'tear') {
      d.style.left = r1(a.g.w * a.g.ax - 10) + 'px'; d.style.top = r1(a.g.h * .27) + 'px';
      A.add(d, [{ opacity: 0, transform: 'translate(-50%,0px) scale(.6)' }, { opacity: 1, transform: 'translate(-50%,6px) scale(1)', offset: .3 }, { opacity: 0, transform: 'translate(-50%,40px) scale(.8)' }], t, 1.2, 'ease-in', { iterations: 2 });
      return;
    }
    A.add(d, [{ opacity: 0, transform: 'translate(-50%,10px) scale(0)' }, { opacity: 1, transform: 'translate(-50%,-6px) scale(1.25)', offset: .25 }, { opacity: 1, transform: 'translate(-50%,-10px) scale(1)', offset: .8 }, { opacity: 0, transform: 'translate(-50%,-24px) scale(.9)' }], t, 1.7, 'ease-out');
    ctx.sfx(t, kind === '!' || kind === '!?' ? 'boing' : kind === 'idea' ? 'ding' : kind === 'heart' ? 'pop' : 'pop');
  }

  function runEvent(ctx, e) {
    const { S, A } = ctx;
    const t = e.t;
    if (e.type === 'hud') return hudEvent(ctx, e);
    if (e.type === 'map') return mapEvent(ctx, e);
    if (e.type === 'cam') return camEvent(ctx, e);
    if (e.type === 'fx') return T.FX(ctx, e.words[0], t, e);
    if (e.type === 'sfx') return ctx.sfx(t, e.words[0]);
    if (e.type === 'arrow') return arrow(ctx, e);
    if (e.type === 'lima') return ctx.lima.push([t, e.words[0] || 'lb']);
    const a = ctx.actors[e.id];
    if (!a) return;
    (a.busy = a.busy || []).push(t);
    const c = a.ct, arg = e.args[0];
    const nextSay = () => { const n = ctx.sayEnds && ctx.sayEnds[e.id]; return n; };
    switch (e.what) {
      case 'say': case 'think': {
        const dur = e.kv.d ? +e.kv.d : clamp((e.text || '').length * .07 + 1.3, 1.8, 3.4);
        const end = Math.min(t + dur, S.t1 - .25);
        bubble(ctx, a, t, e.text || '', e.what, Math.max(.6, end - t));
        break;
      }
      case 'talk': if (c) talk(c, t, +(arg || 1.2)); break;
      case 'mood': if (c) setMood(c, t, arg); break;
      case 'pose': if (c) setPose(c, t, arg); break;
      case 'jump': a.tj.hit(t, [[.16, 'translateY(-34px)'], [.34, 'translateY(0px) scaleY(.9)'], [.44, 'translateY(0px) scaleY(1)']], 'ease-out', .05); ctx.sfx(t, 'boing'); break;
      case 'bounce': a.tj.hit(t, [[.12, 'translateY(-14px)'], [.24, 'translateY(0px)'], [.36, 'translateY(-8px)'], [.48, 'translateY(0px)']], 'ease-out', .05); break;
      case 'shake': a.tj.hit(t, [[.06, 'translateX(-7px)'], [.12, 'translateX(7px)'], [.18, 'translateX(-6px)'], [.24, 'translateX(5px)'], [.3, 'translateX(-3px)'], [.36, 'translateX(0px)']], 'linear', .02); break;
      case 'tremble': { const fr = []; for (let i = 1; i <= 16; i++) fr.push([i * .05, `translateX(${i % 2 ? -2.5 : 2.5}px)`]); a.tj.hit(t, fr, 'linear', .02); break; }
      case 'dance': { const fr = []; for (let i = 1; i <= 8; i++) fr.push([i * .25, `rotate(${i % 2 ? -8 : 8}deg) translateY(${i % 2 ? -6 : 0}px)`]); a.tj.hit(t, fr, 'ease-in-out', .2); break; }
      case 'spin': a.tj.hit(t, [[.5, 'rotate(360deg)']], 'ease-in-out', .01); ctx.sfx(t, 'swish'); break;
      case 'nod': if (c) c.hd.hit(t, [[.12, 'rotate(0deg) translateY(3px)'], [.24, 'translateY(0px)'], [.36, 'translateY(3px)'], [.48, 'translateY(0px)']], 'ease-in-out', .05); break;
      case 'no': if (c) c.hd.hit(t, [[.1, 'rotate(-9deg)'], [.22, 'rotate(9deg)'], [.34, 'rotate(-7deg)'], [.46, 'rotate(5deg)'], [.56, 'rotate(0deg)']], 'ease-in-out', .05); break;
      case 'look': if (c) c.eo.to(t, `scale(${(T.MOOD[c.mood] || T.MOOD.neutral).e || 1}) translateX(${arg === 'l' ? -2.4 : arg === 'r' ? 2.4 : 0}px)`, .15); break;
      case 'walk': case 'run': case 'to': {
        const tx = XP[arg] != null ? XP[arg] : /^x/.test(arg || '') ? +arg.slice(1) : a.x + a.dx;
        const ty = e.args[1] && YP[e.args[1]] != null ? YP[e.args[1]] : e.args[1] && /^y/.test(e.args[1]) ? +e.args[1].slice(1) : a.y + a.dy;
        const dist = Math.hypot(tx - a.x - a.dx, ty - a.y - a.dy);
        const d = e.kv.d ? +e.kv.d : e.what === 'to' ? clamp(dist / 300, .35, 1.2) : clamp(dist / (e.what === 'run' ? 300 : 150), .4, 2.4);
        a.dx = tx - a.x; a.dy = ty - a.y;
        a.tm.to(t, `translate(${r1(a.dx)}px,${r1(a.dy)}px)`, d, e.what === 'to' ? RB.vkit.EASE.inout : 'linear');
        if (c && e.what !== 'to') walkLegs(c, t, d);
        break;
      }
      case 'exit': {
        const dir = arg || 'pop';
        if (dir === 'l' || dir === 'r') {
          const tx = dir === 'l' ? -a.g.w : W0 + a.g.w, dist = Math.abs(tx - a.x - a.dx), d = clamp(dist / 190, .6, 2);
          a.dx = tx - a.x; a.tm.to(t, `translate(${r1(a.dx)}px,${r1(a.dy)}px)`, d, 'linear');
          if (c) walkLegs(c, t, d);
        } else if (dir === 'up') { a.tE.to(t, 'translateY(-700px)', .5, 'ease-in'); ctx.sfx(t, 'swish'); }
        else if (dir === 'down') { a.tE.to(t, 'translateY(420px)', .45, 'ease-in'); ctx.sfx(t, 'swish'); }
        else if (dir === 'fade') a.tO.to(t, '0', .4);
        else { a.tE.to(t, 'scale(1.1)', .1).to(t + .1, 'scale(0)', .2, 'ease-in'); a.tO.to(t + .2, '0', .1); ctx.sfx(t, 'pop'); }
        break;
      }
      case 'emote': emote(ctx, a, t, arg || '!'); break;
      case 'grow': a.tE.to(t, `scale(${arg || 1.3})`, .4, RB.vkit.EASE.back); break;
      case 'shrink': a.tE.to(t, `scale(${arg || .6})`, .4, RB.vkit.EASE.back); break;
      case 'pulse': a.tj.hit(t, [[.15, 'scale(1.15)'], [.3, 'scale(1)'], [.45, 'scale(1.1)'], [.6, 'scale(1)']], 'ease-in-out', .02); break;
      case 'fall': a.tE.to(t, `rotate(${arg === 'l' ? -82 : 82}deg) translateY(-10px)`, .45, 'ease-in'); ctx.sfx(t + .4, 'thud'); break;
      case 'up': a.tE.to(t, 'rotate(0deg)', .4, RB.vkit.EASE.back); break;
      case 'flip': a.tE.to(t, 'scaleX(-1)', .25); break;
      case 'hide': a.tO.to(t, '0', .25); break;
      case 'show': a.tO.to(t, '1', .25); break;
      case 'hl': {
        const d = D.createElement('div');
        d.className = 'thl';
        d.style.cssText = `left:${r1(a.g.w * a.g.ax)}px;top:${r1(a.g.h * (a.g.char ? .55 : .5))}px;width:${r1(Math.max(a.g.w, a.g.h) * .95)}px;height:${r1(Math.max(a.g.w, a.g.h) * .95)}px`;
        a.m.insertBefore(d, a.m.firstChild);
        ctx.A.add(d, [{ opacity: 0, transform: 'translate(-50%,-50%) scale(.6)' }, { opacity: .9, transform: 'translate(-50%,-50%) scale(1)' }], t, .35, 'ease-out');
        ctx.A.add(d, [{ transform: 'translate(-50%,-50%) scale(1)' }, { transform: 'translate(-50%,-50%) scale(1.08)' }], t + .35, .6, 'ease-in-out', { iterations: Infinity, direction: 'alternate' });
        ctx.sfx(t, 'ding');
        break;
      }
      case 'fire': {
        const s = a.e.querySelector('svg');
        const fl = s.querySelector('.flash'), rc = s.querySelector('.recoil');
        if (fl) ctx.A.add(fl, [{ opacity: 0 }, { opacity: 1, offset: .2 }, { opacity: 0 }], t, .4, 'linear');
        if (rc) ctx.A.add(rc, [{ transform: 'translateX(0px)' }, { transform: 'translateX(-10px)', offset: .2 }, { transform: 'translateX(0px)' }], t, .5, 'ease-out');
        T.FX(ctx, 'smoke', t + .05, { kv: { x: a.x + a.g.w * .45, y: a.y - a.g.h * .7 } });
        ctx.shkT.hit(t, [[.05, 'translate(-5px,3px)'], [.1, 'translate(5px,-3px)'], [.16, 'translate(-3px,2px)'], [.22, 'translate(0px,0px)']], 'linear', .02);
        ctx.sfx(t, 'boom');
        break;
      }
      case 'drop': {
        const s = a.e.querySelector('svg'), bl = s.querySelector('.blade');
        if (bl) { ctx.A.add(bl, [{ transform: 'translateY(0px)' }, { transform: 'translateY(64px)' }], t, .22, 'cubic-bezier(.6,0,1,1)', { fill: 'forwards' }); ctx.sfx(t, 'swish'); ctx.sfx(t + .22, 'thud'); }
        break;
      }
      case 'tilt': {
        const s = a.e.querySelector('svg'), bm = s.querySelector('.beam');
        if (bm) {
          const ang = arg === 'l' ? -13 : arg === 'r' ? 13 : 0;
          if (!a.beam) { a.beam = new Track(bm, 'transform', 'rotate(0deg)'); ctx.tracks.push(a.beam); }
          a.beam.to(t, `rotate(${ang}deg)`, .6, RB.vkit.EASE.back);
          const pans = [s.querySelector('.panl'), s.querySelector('.panr')];
          if (!a.pans) { a.pans = pans.map(p => new Track(p, 'transform', 'rotate(0deg)')); ctx.tracks.push(...a.pans); }
          a.pans.forEach(p => p.to(t, `rotate(${-ang}deg)`, .6, RB.vkit.EASE.back));
          ctx.sfx(t, 'swish');
        }
        break;
      }
    }
  }

  function hudEvent(ctx, e) {
    const { hud, A, S } = ctx;
    const t = e.t, kind = e.a, text = e.text != null ? e.text : e.words.join(' ');
    const d = D.createElement('div');
    if (kind === 'T') {
      const n = text.length, fs = n <= 7 ? 46 : n <= 11 ? 38 : n <= 16 ? 30 : n <= 22 ? 25 : 21;
      d.className = 'tth' + (e.words.includes('w') ? ' w' : e.words.includes('r') ? ' r' : e.words.includes('box') ? ' box' : '');
      d.style.fontSize = fs + 'px';
      if (e.kv.y) d.style.top = e.kv.y + 'px';
      d.innerHTML = text.split(/\s+/).map(w => `<span>${esc(w)}</span>`).join(' ');
      hud.appendChild(d);
      [...d.children].forEach((s, i) => A.add(s, [{ opacity: 0, transform: 'translateY(60%) scale(.5) rotate(-6deg)' }, { opacity: 1, transform: 'translateY(-8%) scale(1.12) rotate(2deg)', offset: .65 }, { opacity: 1, transform: 'none' }], t + i * .07, .42, 'ease-out'));
      (ctx.lastT || []).forEach(o => A.add(o, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-20px) scale(.9)' }], t - .05, .2, 'ease-in', { fill: 'forwards' }));
      ctx.lastT = [d];
      ctx.sfx(t, 'ding');
    } else if (kind === 'Y') {
      d.className = 'tty';
      d.innerHTML = `<b>${esc(text)}</b>`;
      hud.appendChild(d);
      A.add(d, [{ opacity: 0, transform: 'translateX(-40px) scale(.8)' }, { opacity: 1, transform: 'none' }], t, .38, RB.vkit.EASE.back);
      (ctx.lastY || []).forEach(o => A.add(o, [{ opacity: 1 }, { opacity: 0, transform: 'translateX(-30px)' }], t - .02, .2, 'ease-in', { fill: 'forwards' }));
      ctx.lastY = [d];
      ctx.sfx(t, 'tick');
    } else if (kind === 'N') {
      const num = parseFloat(String(e.words[0]).replace(',', '.')), suf = e.words.slice(1).find(w => !/^[xy]\d/.test(w)) || '';
      d.className = 'ttn';
      if (e.kv.y) d.style.top = e.kv.y + 'px';
      const big = Number.isInteger(num) && num < 100000;
      d.innerHTML = `<b class="ttn-v${big ? '' : ' st'}" style="--n:${big ? 0 : num}">${big ? '' : esc(e.words[0])}</b><i>${esc(suf)}</i>${e.text ? `<small>${esc(e.text)}</small>` : ''}`;
      hud.appendChild(d);
      A.add(d, [{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1.08)', offset: .7 }, { opacity: 1, transform: 'scale(1)' }], t, .4, 'ease-out');
      if (big) A.add(d.firstElementChild, [{ '--n': e.kv.from ? +e.kv.from : 0 }, { '--n': num }], t, clamp(num / 60, .7, 1.6), 'ease-out');
      ctx.sfx(t, 'count');
    } else if (kind === 'L') {
      d.className = 'ttl';
      const x = e.words.find(w => /^x/.test(w)), y = e.words.find(w => /^y/.test(w));
      d.style.cssText = `left:${x ? +x.slice(1) : 180}px;top:${y ? +y.slice(1) : 300}px`;
      d.textContent = text;
      hud.appendChild(d);
      A.add(d, [{ opacity: 0, transform: 'translate(-50%,-50%) scale(.6)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], t, .3, RB.vkit.EASE.back);
      if (e.kv.until) A.add(d, [{ opacity: 1 }, { opacity: 0 }], anchorT(S, e.kv.until, t) || t + 3, .25, 'ease-in', { fill: 'forwards' });
    } else if (kind === 'S') {
      d.className = 'tts';
      if (e.kv.y) d.style.top = e.kv.y + 'px';
      d.textContent = text;
      hud.appendChild(d);
      A.add(d, [{ opacity: 0, transform: 'translate(-50%,0) scale(2.2) rotate(-8deg)' }, { opacity: 1, transform: 'translate(-50%,0) scale(.96) rotate(-4deg)', offset: .7 }, { opacity: 1, transform: 'translate(-50%,0) scale(1) rotate(-4deg)' }], t, .34, 'ease-out');
      ctx.shkT.hit(t + .24, [[.05, 'translate(-4px,2px)'], [.1, 'translate(3px,-2px)'], [.15, 'translate(0px,0px)']], 'linear', .02);
      ctx.sfx(t + .2, 'thud');
    }
  }

  function camEvent(ctx, e) {
    const w = e.words, t = e.t, kind = w[0];
    const num = (p, d) => { const x = w.find(s => s[0] === p && /\d/.test(s)); return x ? +x.slice(1) : d; };
    if (kind === 'zoom') {
      const z = parseFloat(w[1]) || 1.4, x = num('x', 180), y = num('y', 320), d = e.kv.d ? +e.kv.d : .8;
      ctx.camT.to(t, `translate(${r1(180 - z * x)}px,${r1(330 - z * y)}px) scale(${z})`, d, RB.vkit.EASE.inout);
    } else if (kind === 'reset') ctx.camT.to(t, 'translate(0px,0px) scale(1)', e.kv.d ? +e.kv.d : .7, RB.vkit.EASE.inout);
    else if (kind === 'pan') { const dx = parseFloat(w[1]) || 0; ctx.camT.to(t, `translate(${-dx}px,0px) scale(1)`, e.kv.d ? +e.kv.d : 1.2, RB.vkit.EASE.inout); }
    else if (kind === 'shake') ctx.shkT.hit(t, [[.05, 'translate(-6px,3px)'], [.1, 'translate(6px,-3px)'], [.15, 'translate(-4px,2px)'], [.2, 'translate(3px,-1px)'], [.26, 'translate(0px,0px)']], 'linear', .02);
  }

  function arrow(ctx, e) {
    const [fa, tb] = e.words;
    const P = id => { const a = ctx.actors[id]; if (a) return [a.x + a.dx, a.y + a.dy - (a.g.char ? a.g.h * .45 : a.g.ground ? a.g.h * .5 : 0)]; const m = /^(\d+),(\d+)$/.exec(id || ''); return m ? [+m[1], +m[2]] : [180, 300]; };
    const [x1, y1] = P(fa), [x2, y2] = P(tb);
    const ang = Math.atan2(y2 - y1, x2 - x1), sh = 34;
    const sx = x1 + Math.cos(ang) * sh, sy = y1 + Math.sin(ang) * sh, ex = x2 - Math.cos(ang) * sh, ey = y2 - Math.sin(ang) * sh;
    const bend = e.kv.bend ? +e.kv.bend : -.25, mx = (sx + ex) / 2 - (ey - sy) * bend, my = (sy + ey) / 2 + (ex - sx) * bend;
    const g = D.createElementNS('http://www.w3.org/2000/svg', 'g');
    const c = e.kv.c || '#c6ff00';
    const ha = Math.atan2(ey - my, ex - mx), hx1 = ex - 13 * Math.cos(ha - .5), hy1 = ey - 13 * Math.sin(ha - .5), hx2 = ex - 13 * Math.cos(ha + .5), hy2 = ey - 13 * Math.sin(ha + .5);
    g.innerHTML = `<path d="M${r1(sx)} ${r1(sy)} Q${r1(mx)} ${r1(my)} ${r1(ex)} ${r1(ey)}" pathLength="1" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/><path class="ah" d="M${r1(hx1)} ${r1(hy1)} L${r1(ex)} ${r1(ey)} L${r1(hx2)} ${r1(hy2)}" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      (e.text ? `<g class="al"><rect x="${r1(mx - e.text.length * 4.3 - 10)}" y="${r1(my - 15)}" width="${r1(e.text.length * 8.6 + 20)}" height="26" rx="13" fill="#111" stroke="${c}" stroke-width="2"/><text x="${r1(mx)}" y="${r1(my + 3.5)}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">${esc(e.text)}</text></g>` : '');
    ctx.ov.appendChild(g);
    const [line, head, lab] = g.children;
    ctx.A.add(line, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], e.t, .55, 'ease-in-out');
    ctx.A.add(head, [{ opacity: 0 }, { opacity: 1 }], e.t + .45, .12, 'linear');
    if (lab) ctx.A.add(lab, [{ opacity: 0 }, { opacity: 1 }], e.t + .3, .25, 'linear');
    ctx.sfx(e.t, 'swish');
  }

  // ---------- Mapas ----------
  const MCOL = { lime: '#c6ff00', red: '#ff5a5f', blue: '#4d8cff', yel: '#ffd23f', org: '#ff9f43', pur: '#9b6bff', teal: '#2ec4b6', pink: '#ff7eb6', gry: '#6b7486', wht: '#e8e8e8', grn: '#3ecf6e', brn: '#a0714f' };
  const mcol = c => MCOL[c] || c || MCOL.lime;
  const LAND = '#2b3446', EDGE = '#4a5670';
  // Grupos de países para épocas en que las fronteras eran otras.
  const MGROUP = {
    URSS: ['RUS', 'UKR', 'BLR', 'KAZ', 'UZB', 'TKM', 'KGZ', 'TJK', 'GEO', 'ARM', 'AZE', 'MDA', 'LTU', 'LVA', 'EST'],
    AUH: ['AUT', 'HUN', 'CZE', 'SVK', 'SVN', 'HRV', 'BIH'], YUG: ['SRB', 'HRV', 'BIH', 'SVN', 'MNE', 'MKD'],
    OTOMANO: ['TUR', 'SYR', 'IRQ', 'JOR', 'LBN', 'ISR', 'SAU'], ESCANDINAVIA: ['NOR', 'SWE', 'DNK', 'FIN'],
    EJE: ['DEU', 'ITA', 'JPN'], CENTROAMERICA: ['GTM', 'HND', 'SLV', 'NIC', 'CRI', 'PAN', 'BLZ'],
    BLOQUE_ESTE: ['POL', 'CZE', 'SVK', 'HUN', 'ROU', 'BGR'], OTAN49: ['USA', 'CAN', 'GBR', 'FRA', 'BEL', 'NLD', 'LUX', 'NOR', 'DNK', 'ISL', 'ITA', 'PRT'],
  };
  const codes = s => String(s || '').split(',').flatMap(c => MGROUP[c] || [c]);
  function mapPt(ctx, k) {
    const M = ctx.map;
    if (!M) return [180, 320];
    if (M.places[k]) return M.places[k];
    if (M.cen[k]) return M.cen[k];
    if (M.regions[k]) return M.regions[k].c;
    if (ctx.actors[k]) { const a = ctx.actors[k]; return [a.x + a.dx, a.y + a.dy]; }
    const m = /^(\d+),(\d+)$/.exec(k || '');
    return m ? [+m[1], +m[2]] : [180, 320];
  }
  function mapTag(ctx, x, y, text, t, cls) {
    const d = div('tmt' + (cls ? ' ' + cls : ''), esc(text), `left:${r1(x)}px;top:${r1(y)}px`);
    ctx.mapL.appendChild(d);
    ctx.A.add(d, [{ opacity: 0, transform: 'translate(-50%,-50%) scale(.5)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], t, .32, RB.vkit.EASE.back);
    return d;
  }
  function mapEvent(ctx, e) {
    if (!ctx.map) return;
    const { A } = ctx, t = e.t, w = e.words, M = ctx.map;
    if (e.a === 'hl' || e.a === 'dim') {
      const col = e.a === 'dim' ? LAND : mcol(w[1]);
      codes(w[0]).forEach(c => {
        const p = ctx.mapP[c];
        if (!p) return;
        if (!p.tr) { p.tr = new Track(p.el, 'fill', LAND); ctx.tracks.push(p.tr); }
        p.tr.to(t, e.a === 'dim' ? LAND : '#ffffff', .12).to(t + .12, col, .35);
      });
      if (e.text) { const [x, y] = mapPt(ctx, codes(w[0])[0]); mapTag(ctx, x, y, e.text, t + .2); }
      ctx.sfx(t, 'pop');
    } else if (e.a === 'lab') {
      const [x, y] = mapPt(ctx, w[0]);
      mapTag(ctx, x + (+e.kv.dx || 0), y + (+e.kv.dy || 0), e.text || w[0], t, e.kv.big ? 'big' : '');
    } else if (e.a === 'reg') {
      const R = M.regions[w[0]];
      if (!R) return;
      const p = D.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', R.d); p.setAttribute('fill', mcol(w[1])); p.setAttribute('stroke', '#0b0b0b'); p.setAttribute('stroke-width', '.6');
      ctx.mapSvg.appendChild(p);
      A.add(p, [{ opacity: 0 }, { opacity: 1, offset: .5 }, { opacity: .55, offset: .75 }, { opacity: 1 }], t, .7, 'ease-out');
      if (e.text) mapTag(ctx, R.c[0] + (+e.kv.dx || 0), R.c[1] + (+e.kv.dy || 0), e.text, t + .25);
      ctx.sfx(t, 'pop');
    } else if (e.a === 'pin') {
      const [x, y] = mapPt(ctx, w[0]);
      const pin = div('tmp', '<svg viewBox="0 0 44 60"><path d="M22 58 C22 58 4 34 4 22 C4 11 12 4 22 4 C32 4 40 11 40 22 C40 34 22 58 22 58Z" fill="' + mcol(e.kv.c || 'red') + '"/><circle cx="22" cy="22" r="7" fill="#fff"/></svg>', `left:${r1(x)}px;top:${r1(y)}px`);
      ctx.mapL.appendChild(pin);
      A.add(pin, [{ opacity: 0, transform: 'translate(-50%,-140%) scale(.6)' }, { opacity: 1, transform: 'translate(-50%,-100%) scale(1.1)', offset: .7 }, { opacity: 1, transform: 'translate(-50%,-100%) scale(1)' }], t, .4, 'ease-out');
      if (e.text) mapTag(ctx, x + (+e.kv.dx || 0), y + (e.kv.dy != null ? +e.kv.dy : 14), e.text, t + .15);
      ctx.sfx(t, 'pop');
    } else if (e.a === 'go') {
      const [x1, y1] = mapPt(ctx, w[0]), [x2, y2] = mapPt(ctx, w[1]);
      const bend = e.kv.bend != null ? +e.kv.bend : .22, mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend;
      const c = mcol(e.kv.c || 'lime'), dur = e.kv.d ? +e.kv.d : 1.2;
      const g = D.createElementNS('http://www.w3.org/2000/svg', 'g');
      const ha = Math.atan2(y2 - my, x2 - mx);
      g.innerHTML = `<path d="M${r1(x1)} ${r1(y1)} Q${r1(mx)} ${r1(my)} ${r1(x2)} ${r1(y2)}" pathLength="1" stroke="${c}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/><path d="M${r1(x2 - 12 * Math.cos(ha - .5))} ${r1(y2 - 12 * Math.sin(ha - .5))} L${r1(x2)} ${r1(y2)} L${r1(x2 - 12 * Math.cos(ha + .5))} ${r1(y2 - 12 * Math.sin(ha + .5))}" stroke="${c}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
      ctx.mapSvg.appendChild(g);
      A.add(g.firstChild, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], t, dur, 'ease-in-out');
      A.add(g.lastChild, [{ opacity: 0 }, { opacity: 1 }], t + dur - .1, .12, 'linear');
      if (e.text) mapTag(ctx, mx, my, e.text, t + dur * .5);
      ctx.sfx(t, 'swish');
    } else if (e.a === 'tok') {
      // tok id +objeto desde hasta: un objeto (o personaje) que viaja por el mapa.
      const [id, type, from, to] = w;
      const [x1, y1] = mapPt(ctx, from), [x2, y2] = mapPt(ctx, to);
      const a = synth(ctx, id, type, x1, y1, +(e.kv.s || .5), 'pop', t, { kv: { z: 950 } });
      const dur = e.kv.d ? +e.kv.d : 1.6;
      a.dx = x2 - x1; a.dy = y2 - y1;
      a.tm.to(t + .3, `translate(${r1(a.dx)}px,${r1(a.dy)}px)`, dur, RB.vkit.EASE.inout);
    } else if (e.a === 'zoom') {
      const [x, y] = mapPt(ctx, w[0]), z = parseFloat(w[1]) || 1.8;
      ctx.camT.to(t, `translate(${r1(180 - z * x)}px,${r1(330 - z * y)}px) scale(${z})`, e.kv.d ? +e.kv.d : .9, RB.vkit.EASE.inout);
      ctx.camUsed = true;
    }
  }

  // ---------- Efectos ----------
  T.FX = (ctx, kind, t, e = { kv: {} }) => {
    const { hud, A } = ctx;
    const kv = e.kv || {};
    const x = kv.x != null ? +kv.x : (e.words && e.words.find(w => /^x\d/.test(w)) ? +e.words.find(w => /^x\d/.test(w)).slice(1) : 180);
    const y = kv.y != null ? +kv.y : (e.words && e.words.find(w => /^y\d/.test(w)) ? +e.words.find(w => /^y\d/.test(w)).slice(1) : 300);
    const r = ctx.rnd;
    const box = D.createElement('div');
    box.className = 'tfx';
    hud.appendChild(box);
    const add = (html, kf, t0, d, ease, ex) => { const n = D.createElement('div'); n.className = 'tfx-p'; n.innerHTML = html; box.appendChild(n); A.add(n, kf, t0, d, ease || 'ease-out', ex); return n; };
    const COLS = ['#c6ff00', '#ffd23f', '#ff5a5f', '#4d8cff', '#2ec4b6', '#ff7eb6', '#ff9f43'];
    if (kind === 'confetti') {
      for (let i = 0; i < 34; i++) {
        const sx = r() * W0, dx = (r() - .5) * 80, rr = (r() - .5) * 900, c = COLS[i % COLS.length], dl = r() * .5, w = 6 + r() * 6;
        add(`<i style="width:${r1(w)}px;height:${r1(w * .5)}px;background:${c}"></i>`, [{ transform: `translate(${r1(sx)}px,-40px) rotate(0deg)`, opacity: 1 }, { transform: `translate(${r1(sx + dx)}px,${r1(H0 * .9)}px) rotate(${r1(rr)}deg)`, opacity: 1, offset: .85 }, { transform: `translate(${r1(sx + dx)}px,${r1(H0)}px) rotate(${r1(rr)}deg)`, opacity: 0 }], t + dl, 2.2 + r(), 'cubic-bezier(.3,.1,.6,1)');
      }
      ctx.sfx(t, 'yay');
    } else if (kind === 'sparks' || kind === 'stars') {
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * Math.PI * 2 + r() * .3, d = 50 + r() * 50, c = COLS[i % 3];
        add(`<b style="color:${c}">✦</b>`, [{ transform: `translate(${x}px,${y}px) scale(.3)`, opacity: 1 }, { transform: `translate(${r1(x + Math.cos(a) * d)}px,${r1(y + Math.sin(a) * d)}px) scale(1.1)`, opacity: 1, offset: .6 }, { transform: `translate(${r1(x + Math.cos(a) * d * 1.2)}px,${r1(y + Math.sin(a) * d * 1.2)}px) scale(.4)`, opacity: 0 }], t, .9, 'ease-out');
      }
      ctx.sfx(t, 'sparkle');
    } else if (kind === 'smoke') {
      for (let i = 0; i < 5; i++) add(`<i class="puff"></i>`, [{ transform: `translate(${r1(x + (r() - .5) * 20)}px,${y}px) scale(.3)`, opacity: .8 }, { transform: `translate(${r1(x + (r() - .5) * 70)}px,${r1(y - 30 - r() * 40)}px) scale(${r1(1 + r())})`, opacity: 0 }], t + i * .06, 1.2, 'ease-out');
    } else if (kind === 'boom') {
      add(`<svg viewBox="0 0 110 100" width="150" height="136"><path d="M55 2 L64 30 L92 14 L80 42 L108 50 L80 60 L94 88 L64 72 L55 98 L46 72 L16 88 L30 60 L2 50 L30 42 L18 14 L46 30Z" fill="#ffd23f"/><path d="M55 20 L61 38 L80 30 L72 48 L90 52 L72 58 L80 76 L61 66 L55 82 L49 66 L30 76 L38 58 L20 52 L38 48 L30 30 L49 38Z" fill="#ff9f43"/></svg>`, [{ transform: `translate(${x - 75}px,${y - 68}px) scale(.2)`, opacity: 1 }, { transform: `translate(${x - 75}px,${y - 68}px) scale(1.15)`, opacity: 1, offset: .4 }, { transform: `translate(${x - 75}px,${y - 68}px) scale(1.3)`, opacity: 0 }], t, .7, 'ease-out');
      ctx.shkT.hit(t, [[.05, 'translate(-8px,4px)'], [.1, 'translate(8px,-4px)'], [.16, 'translate(-5px,3px)'], [.22, 'translate(3px,-2px)'], [.3, 'translate(0px,0px)']], 'linear', .02);
      ctx.sfx(t, 'boom');
    } else if (kind === 'hearts' || kind === 'money' || kind === 'notes' || kind === 'question') {
      const g = { hearts: ['❤', '#ff5a5f'], money: ['$', '#7ccf7a'], notes: ['♪', '#c6ff00'], question: ['?', '#c6ff00'] }[kind];
      for (let i = 0; i < 7; i++) { const sx = x + (r() - .5) * 120; add(`<b style="color:${g[1]};font-size:${r1(20 + r() * 14)}px">${g[0]}</b>`, [{ transform: `translate(${r1(sx)}px,${y + 20}px) scale(.5)`, opacity: 0 }, { transform: `translate(${r1(sx + (r() - .5) * 30)}px,${y - 30}px) scale(1)`, opacity: 1, offset: .3 }, { transform: `translate(${r1(sx + (r() - .5) * 50)}px,${y - 120}px) scale(.8)`, opacity: 0 }], t + i * .1, 1.5, 'ease-out'); }
      ctx.sfx(t, kind === 'money' ? 'cash' : 'sparkle');
    } else if (kind === 'snow') {
      for (let i = 0; i < 26; i++) { const sx = r() * W0; add(`<b style="color:#eef6ff;font-size:${r1(10 + r() * 10)}px">❄</b>`, [{ transform: `translate(${r1(sx)}px,-20px)` }, { transform: `translate(${r1(sx + (r() - .5) * 60)}px,${H0}px)` }], t + r() * 1.5, 2.6 + r() * 1.5, 'linear', { iterations: 2 }); }
    } else if (kind === 'rain') {
      for (let i = 0; i < 24; i++) { const sx = r() * W0; add(`<i class="drop"></i>`, [{ transform: `translate(${r1(sx)}px,-30px)` }, { transform: `translate(${r1(sx - 30)}px,${H0}px)` }], t + r() * 1, .7, 'linear', { iterations: 3 }); }
    } else if (kind === 'flash') {
      const n = add('<i class="flash"></i>', [{ opacity: 0 }, { opacity: .85, offset: .15 }, { opacity: 0 }], t, .5, 'ease-out');
      n.style.inset = '0';
      ctx.sfx(t, 'swish');
    } else if (kind === 'rays') {
      const n = add('<i class="rays"></i>', [{ opacity: 0, transform: `translate(${x}px,${y}px) rotate(0deg) scale(.4)` }, { opacity: .9, transform: `translate(${x}px,${y}px) rotate(40deg) scale(1)` }], t, .7, 'ease-out');
      box.style.zIndex = '-1';
      A.add(n.firstChild, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], t, 18, 'linear', { iterations: Infinity });
    } else if (kind === 'speed') {
      for (let i = 0; i < 9; i++) { const yy = 120 + r() * 360, w = 40 + r() * 90; add(`<i class="spd" style="width:${r1(w)}px"></i>`, [{ transform: `translate(${W0 + 20}px,${r1(yy)}px)`, opacity: .8 }, { transform: `translate(-140px,${r1(yy)}px)`, opacity: .8 }], t + r() * .4, .45, 'linear', { iterations: 3 }); }
      ctx.sfx(t, 'swish');
    } else if (kind === 'dust') {
      for (let i = 0; i < 6; i++) add(`<i class="puff s"></i>`, [{ transform: `translate(${r1(x + (i - 3) * 12)}px,${y}px) scale(.4)`, opacity: .7 }, { transform: `translate(${r1(x + (i - 3) * 26)}px,${y - 14}px) scale(1.1)`, opacity: 0 }], t, .7, 'ease-out');
    } else if (kind === 'fire') {
      for (let i = 0; i < 3; i++) { const n = add(`<svg viewBox="0 0 70 90" width="${70 - i * 10}" height="${90 - i * 12}"><path d="M35 4 C46 22 64 34 64 58 C64 76 51 88 35 88 C19 88 6 76 6 58 C6 44 14 36 20 28 C22 40 26 44 30 46 C28 30 30 16 35 4Z" fill="#ff9f43"/><path d="M35 34 C42 46 52 54 52 66 C52 78 44 86 35 86 C26 86 18 78 18 66 C18 58 24 52 28 48 C30 56 32 58 34 58 C33 50 33 42 35 34Z" fill="#ffd23f"/></svg>`, [{ transform: `translate(${x - 35 + (i - 1) * 40}px,${y - 80}px) scale(0)`, opacity: 0 }, { transform: `translate(${x - 35 + (i - 1) * 40}px,${y - 80}px) scale(1)`, opacity: 1 }], t + i * .1, .4, 'ease-out'); A.add(n.firstChild, [{ transform: 'scale(1,1)' }, { transform: 'scale(.92,1.1)' }], t, .3, 'ease-in-out', { iterations: Infinity, direction: 'alternate' }); }
    }
  };

  // ---------- Lima en los videos en dibujos ----------
  // Dónde está la mascota en cada momento: presenta las portadas, piensa en las preguntas y celebra al final.
  T.petAt = (P, S, t) => {
    const sh = P.v.sc[S.si];
    const W = P.stage.clientWidth, H = P.stage.clientHeight;
    const POS = { c: { x: W / 2 - 66, y: H - 300, s: 1.3 }, lb: { x: 4, y: H - 190, s: .8 }, rb: { x: W - 136, y: H - 190, s: .8 }, low: { x: W / 2 - 66, y: H - 230, s: 1.05 } };
    let where = sh.k === 'title' ? 'c' : sh.k === 'quiz' ? 'lb' : sh.k === 'recap' ? 'low' : null;
    const rec = P.built[S.si];
    if (rec && rec.lima) rec.lima.forEach(([tt, w]) => { if (t >= tt) where = w === 'off' ? null : w; });
    if (sh.lima) where = sh.lima;
    const p = POS[where] || POS.lb;
    return { x: p.x, y: p.y, s: p.s, show: !!where && t >= S.t0 - .1 && t < S.t1 + .05 };
  };
  // ---------- Plantillas de planos ----------
  // Actor sintético (para las plantillas): mismo motor que los creados con órdenes.
  const synth = (ctx, id, type, x, y, s, enter, t, extra) => {
    const it = Object.assign({ id, prop: type[0] === '+' ? type.slice(1) : null, sp: type[0] === '+' ? null : type, at: null, enter, x, y, s, flip: false, kv: {}, text: null, words: [] }, extra || {});
    const a = makeActor(ctx, it, t);
    ctx.actors[id] = a;
    return a;
  };
  const atOf = (S, arr, prev) => { const a = (arr.find(y => typeof y === 'string' && y[0] === '@') || '').slice(1); return a ? anchorT(S, a, prev) : null; };
  const noAt = arr => arr.filter(y => !(typeof y === 'string' && y[0] === '@'));
  const div = (cls, html, css) => { const d = D.createElement('div'); d.className = cls; if (html != null) d.innerHTML = html; if (css) d.style.cssText = css; return d; };
  T.TPL = {
    // Portada: título grande, emblema y Lima presentando.
    title(ctx) {
      const { sh, S, A, hud } = ctx;
      T.FX(ctx, 'rays', S.t0, { kv: { x: 180, y: 300 } });
      const em = [].concat(sh.em || 'star');
      em.forEach((p, i) => synth(ctx, 'em' + i, p.startsWith('+') ? p : '+' + p, em.length === 1 ? 180 : 110 + i * (140 / Math.max(1, em.length - 1)), 300 + (i % 2) * 14, em.length === 1 ? 1.5 : 1.05, i ? 'pop' : 'zoom', S.t0 + .2 + i * .2));
      if (sh.sub) { const d = div('tsub', esc(sh.sub)); hud.appendChild(d); A.add(d, [{ opacity: 0, transform: 'translate(-50%,-10px)' }, { opacity: 1, transform: 'translate(-50%,0)' }], S.t0 + .1, .4, 'ease-out'); }
      const d = div('ttitle', String(sh.t || '').split(/\s+/).map(w => `<span>${esc(w)}</span>`).join(' '));
      const n = String(sh.t || '').length;
      d.style.fontSize = (n <= 12 ? 44 : n <= 20 ? 36 : n <= 30 ? 30 : 25) + 'px';
      hud.appendChild(d);
      [...d.children].forEach((w, i) => A.add(w, [{ opacity: 0, transform: 'translateY(70%) scale(.4) rotate(-8deg)' }, { opacity: 1, transform: 'translateY(-10%) scale(1.12)', offset: .7 }, { opacity: 1, transform: 'none' }], S.t0 + .3 + i * .1, .5, 'ease-out'));
      ctx.sfx(S.t0 + .3, 'yay');
    },
    // Pregunta rápida: se lee, cuenta regresiva de 3 segundos (sin pausar) y se revela la respuesta.
    quiz(ctx) {
      const { sh, S, A, hud, P } = ctx;
      const q = P.T.tq.find(x => x.si === S.si);
      if (!q) return;
      const card = div('tq', `<small class="tq-k">¿Tú qué dices?</small><p>${esc(sh.q || '')}</p>`);
      hud.appendChild(card);
      A.add(card, [{ opacity: 0, transform: 'translateY(-20px) scale(.9)' }, { opacity: 1, transform: 'none' }], S.t0 + .05, .4, RB.vkit.EASE.back);
      const box = div('tq-o');
      hud.appendChild(box);
      const opts = (sh.o || []).map((o, i) => {
        const b = D.createElement('button');
        b.type = 'button'; b.className = 'tq-b'; b.dataset.i = i;
        b.innerHTML = `<span class="k">${'ABCD'[i]}</span><span class="ot">${esc(o)}</span><span class="mk"></span>`;
        box.appendChild(b);
        const tb = Math.min(q.tq - .3, S.t0 + .7 + i * Math.max(.35, (q.tq - S.t0 - 1.2) / Math.max(1, sh.o.length)));
        A.add(b, [{ opacity: 0, transform: 'translateX(40px)' }, { opacity: 1, transform: 'none' }], tb, .35, RB.vkit.EASE.back);
        if (i !== q.a) A.add(b, [{ opacity: 1 }, { opacity: .32 }], q.te, .3, 'ease-out', { fill: 'forwards' });
        else A.add(b, [{ background: 'rgba(255,255,255,.06)', borderColor: '#3a3a3a', color: '#f2f2f2' }, { background: '#c6ff00', borderColor: '#c6ff00', color: '#000' }], q.te, .25, 'ease-out', { fill: 'forwards' });
        if (i === q.a) A.add(b, [{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], q.te + .1, .4, 'ease-in-out', { fill: 'forwards' });
        b.addEventListener('click', ev => { ev.stopPropagation(); if (P.toonAnswer(q, i)) { b.classList.add('sel'); if (RB.vkit.SFX) RB.vkit.SFX.pop(); } });
        return b;
      });
      if (q.answered != null && opts[q.answered]) opts[q.answered].classList.add('sel');
      // Cuenta regresiva.
      const ring = div('tq-c', `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" class="bg"/><circle cx="40" cy="40" r="34" class="fg" pathLength="1"/></svg><b>3</b><b>2</b><b>1</b>`);
      hud.appendChild(ring);
      const span = Math.max(1, q.te - q.tq);
      A.add(ring, [{ opacity: 0, transform: 'translateX(-50%) scale(.5)' }, { opacity: 1, transform: 'translateX(-50%) scale(1)', offset: .12 }, { opacity: 1, transform: 'translateX(-50%) scale(1)', offset: .9 }, { opacity: 0, transform: 'translateX(-50%) scale(.6)' }], q.tq - .1, span + .25, 'linear');
      A.add(ring.querySelector('.fg'), [{ strokeDashoffset: 0 }, { strokeDashoffset: 1 }], q.tq, span, 'linear');
      [...ring.querySelectorAll('b')].forEach((n, i) => { const t0 = q.tq + i * span / 3; A.add(n, [{ opacity: 0, transform: 'scale(1.8)' }, { opacity: 1, transform: 'scale(1)', offset: .25 }, { opacity: 1, transform: 'scale(1)', offset: .85 }, { opacity: 0, transform: 'scale(.6)' }], t0, span / 3, 'ease-out'); ctx.sfx(t0, 'tick'); });
      ctx.sfx(q.te, 'ding');
      T.FX(ctx, 'sparks', q.te + .05, { kv: { x: 180, y: 300 + q.a * 62 } });
      ctx.quizUI = qq => { opts.forEach((b, i) => { b.classList.toggle('mine', i === qq.answered); b.querySelector('.mk').textContent = i === qq.answered ? (i === qq.a ? '✓' : '✗') : ''; }); };
    },
    // Para recordar: tarjetas con ícono y pocas palabras, cuando la narradora las nombra.
    recap(ctx) {
      const { sh, S, A, hud } = ctx;
      const h = div('tth', '<span>Para</span> <span>recordar</span>');
      h.style.fontSize = '34px'; h.style.top = '58px';
      hud.appendChild(h);
      [...h.children].forEach((w, i) => A.add(w, [{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1.1)', offset: .7 }, { opacity: 1, transform: 'none' }], S.t0 + .1 + i * .08, .4, 'ease-out'));
      const its = sh.it || [];
      const grid = div('trc' + (its.length > 4 ? ' many' : ''));
      hud.appendChild(grid);
      let prev = S.t0 + .4;
      its.forEach((x, i) => {
        const [ic, text] = noAt(x);
        const t = atOf(S, x, prev);
        const tt = t != null ? t : prev + Math.max(.6, (S.t1 - S.t0 - 2) / its.length);
        prev = tt;
        const fn = T.PROPS[String(ic).replace('+', '')] || T.PROPS.star;
        const [w, hh, svg] = fn({});
        const c = div('trc-i', `<span class="ic"><svg viewBox="0 0 ${w} ${hh}">${svg}</svg></span><b>${esc(text)}</b>`);
        grid.appendChild(c);
        A.add(c, [{ opacity: 0, transform: 'translateY(26px) scale(.8) rotate(-3deg)' }, { opacity: 1, transform: 'translateY(-4px) scale(1.04)', offset: .7 }, { opacity: 1, transform: 'none' }], tt, .42, 'ease-out');
        ctx.sfx(tt, 'pop');
      });
      const end = div('tts', '¡A practicar!');
      end.style.top = '520px';
      hud.appendChild(end);
      const te = S.t1 - 1.6;
      A.add(end, [{ opacity: 0, transform: 'translate(-50%,0) scale(2) rotate(-8deg)' }, { opacity: 1, transform: 'translate(-50%,0) scale(1) rotate(-4deg)' }], te, .35, 'ease-out');
      T.FX(ctx, 'confetti', te + .1, {});
    },
    // Línea de tiempo vertical: el año, el hecho y un ícono, a medida que se nombran.
    tl(ctx) {
      const { sh, S, A, hud } = ctx;
      const its = sh.it || [];
      const n = its.length, top = 150, gap = Math.min(92, 380 / Math.max(1, n - 1));
      const line = div('ttl-line', null, `top:${top}px;height:${r1(gap * (n - 1) + 10)}px`);
      hud.appendChild(line);
      A.add(line, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], S.t0 + .1, Math.min(1.6, S.t1 - S.t0 - .5), 'ease-out');
      let prev = S.t0 + .3;
      its.forEach((x, i) => {
        const [yr, text, ic] = noAt(x);
        const t = atOf(S, x, prev);
        const tt = t != null ? t : prev + Math.max(.8, (S.t1 - S.t0 - 1.5) / n);
        prev = tt;
        const fn = ic && T.PROPS[String(ic).replace('+', '')];
        const icon = fn ? (() => { const [w, hh, svg] = fn({}); return `<span class="ic"><svg viewBox="0 0 ${w} ${hh}">${svg}</svg></span>`; })() : '';
        const row = div('ttl-i', `<i class="dot"></i><b class="yr">${esc(yr)}</b><span class="tx">${esc(text || '')}</span>${icon}`, `top:${r1(top + i * gap - 18)}px`);
        hud.appendChild(row);
        A.add(row.querySelector('.dot'), [{ transform: 'scale(0)' }, { transform: 'scale(1.5)', offset: .6 }, { transform: 'scale(1)' }], tt, .35, 'ease-out');
        A.add(row.querySelector('.yr'), [{ opacity: 0, transform: 'translateX(-20px)' }, { opacity: 1, transform: 'none' }], tt + .05, .35, RB.vkit.EASE.back);
        A.add(row.querySelector('.tx'), [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], tt + .15, .35, 'ease-out');
        if (icon) A.add(row.querySelector('.ic'), [{ opacity: 0, transform: 'scale(0) rotate(-30deg)' }, { opacity: 1, transform: 'scale(1) rotate(0deg)' }], tt + .25, .4, RB.vkit.EASE.back);
        ctx.sfx(tt, 'tick');
      });
    },
    // Versus: dos columnas, cada una con su personaje y sus ideas.
    vs(ctx) {
      const { sh, S, A, hud } = ctx;
      const sides = [sh.l || [], sh.r || []];
      let prev = S.t0 + .2;
      const vsb = div('tvs-v', 'VS');
      hud.appendChild(vsb);
      A.add(vsb, [{ opacity: 0, transform: 'translate(-50%,-50%) scale(3) rotate(-20deg)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1) rotate(-8deg)' }], S.t0 + .5, .35, 'ease-out');
      sides.forEach((side, k) => {
        const [title, who, ...items] = side;
        const x = k ? 270 : 90;
        const tt = atOf(S, [title], prev);
        const t0 = tt != null ? tt : S.t0 + .2 + k * 1.2;
        const h = div('tvs-h' + (k ? ' r' : ''), esc(String(title).replace(/\s*@\S+/, '')), `left:${x}px`);
        hud.appendChild(h);
        A.add(h, [{ opacity: 0, transform: `translate(-50%,0) translateX(${k ? 40 : -40}px)` }, { opacity: 1, transform: 'translate(-50%,0)' }], t0, .4, RB.vkit.EASE.back);
        if (who) synth(ctx, 'vs' + k, String(who), x, 330, .8, 'hop', t0 + .1);
        let p2 = t0 + .5;
        items.forEach((it, i) => {
          const m = /\s*@(\S+)$/.exec(it);
          const txt = m ? it.slice(0, m.index) : it;
          const ta = m ? anchorT(S, m[1], p2) : null;
          const ti = ta != null ? ta : p2 + .6;
          p2 = ti;
          const d = div('tvs-i' + (k ? ' r' : ''), esc(txt), `left:${x}px;top:${360 + i * 50}px`);
          hud.appendChild(d);
          A.add(d, [{ opacity: 0, transform: 'translate(-50%,10px) scale(.8)' }, { opacity: 1, transform: 'translate(-50%,0) scale(1)' }], ti, .35, RB.vkit.EASE.back);
          ctx.sfx(ti, 'pop');
        });
        prev = p2;
      });
    },
    // Cadena de causas y consecuencias, de arriba hacia abajo.
    chain(ctx) {
      const { sh, S, A, hud } = ctx;
      const its = sh.it || [], n = its.length;
      const top = sh.top || 150, gap = Math.min(110, 400 / Math.max(1, n));
      let prev = S.t0 + .3;
      its.forEach((x, i) => {
        const [ic, text] = noAt(x);
        const t = atOf(S, x, prev);
        const tt = t != null ? t : prev + Math.max(.8, (S.t1 - S.t0 - 1) / n);
        prev = tt;
        const fn = T.PROPS[String(ic).replace('+', '')] || T.PROPS.star;
        const [w, hh, svg] = fn({});
        const c = div('tch-i', `<span class="ic"><svg viewBox="0 0 ${w} ${hh}">${svg}</svg></span><b>${esc(text)}</b>`, `top:${r1(top + i * gap)}px`);
        hud.appendChild(c);
        A.add(c, [{ opacity: 0, transform: 'translate(-50%,20px) scale(.85)' }, { opacity: 1, transform: 'translate(-50%,0) scale(1)' }], tt, .4, RB.vkit.EASE.back);
        if (i) {
          const ar = div('tch-a', '<svg viewBox="0 0 30 40"><path d="M15 2 L15 30 M5 22 L15 34 L25 22" stroke="#c6ff00" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>', `top:${r1(top + i * gap - gap * .42)}px`);
          hud.appendChild(ar);
          A.add(ar, [{ opacity: 0, transform: 'translate(-50%,-10px)' }, { opacity: 1, transform: 'translate(-50%,0)' }], tt - .25, .3, 'ease-out');
        }
        ctx.sfx(tt, 'pop');
      });
    },
    // Mapa real (toon-mapas.js): países, regiones, alfileres, rutas y acercamientos con las órdenes hl, reg, pin, go, tok, zoom.
    map(ctx) {
      const { sh, act } = ctx;
      const M = T.MAPS && T.MAPS[sh.view || 'chile'];
      if (!M) return;
      ctx.map = M;
      const svg = D.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'tmap'); svg.setAttribute('viewBox', '0 0 360 640'); svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = Object.entries(M.shapes).map(([c, d]) => `<path data-c="${c}" d="${d}" fill="${LAND}" stroke="${EDGE}" stroke-width=".8" stroke-linejoin="round"/>`).join('');
      act.appendChild(svg);
      ctx.mapSvg = svg;
      ctx.mapP = {};
      svg.querySelectorAll('path').forEach(p => { ctx.mapP[p.dataset.c] = { el: p }; });
      ctx.mapL = div('tml');
      act.appendChild(ctx.mapL);
      ctx.A.add(svg, [{ opacity: 0, transform: 'scale(1.08)' }, { opacity: 1, transform: 'scale(1)' }], ctx.S.t0 - .1, .6, 'ease-out');
    },
    // Pirámide social: peldaños de arriba hacia abajo, cada uno con su gente encima y su nombre.
    pyr(ctx) {
      const { sh, S, A, hud } = ctx;
      const its = sh.it || [];
      const n = its.length, top = sh.top || 150, h = Math.min(125, 375 / n);
      let prev = S.t0 + .3;
      its.forEach((x, i) => {
        const [title, who, sub] = noAt(x);
        const t = atOf(S, x, prev);
        const tt = t != null ? t : prev + 1;
        prev = tt;
        const w = 120 + i * (210 / Math.max(1, n - 1)), y = top + (i + 1) * h - 28;
        const slab = div('tpy-s', `<b>${esc(title)}</b>${sub ? `<i>${esc(sub)}</i>` : ''}`, `left:${r1(180 - w / 2)}px;top:${r1(y)}px;width:${r1(w)}px;background:${['#f2c14e', '#9b6bff', '#8a6a4a', '#4d8cff'][i % 4]}`);
        hud.appendChild(slab);
        A.add(slab, [{ opacity: 0, transform: 'translateY(24px) scaleX(.6)' }, { opacity: 1, transform: 'none' }], tt, .4, RB.vkit.EASE.back);
        const ws = String(who || '').split(',').filter(Boolean);
        const sp = Math.min(62, (w - 30) / Math.max(1, ws.length));
        ws.forEach((wh, j) => synth(ctx, `py${i}_${j}`, wh, 180 + (j - (ws.length - 1) / 2) * sp, y + 2, .52, 'hop', tt + .12 + j * .09));
        ctx.sfx(tt, 'pop');
      });
    },
  };
  T.version = 1;
})();
