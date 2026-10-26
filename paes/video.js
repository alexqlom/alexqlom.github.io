// Videos animados. Cada tema es una animación continua —la mascota Lima que habla, textos que entran palabra
// por palabra, íconos que se dibujan, diagramas, cámara y transiciones— sincronizada con la narración grabada
// con voz neuronal (audio/<id>.webm y sus tiempos en audio/<id>.js). Todo lo que se ve es una función del
// tiempo del audio, así que se puede pausar, adelantar, retroceder y cambiar la velocidad como un video real.
// Si falta el audio, el mismo video corre con un reloj propio y la voz del teléfono.
(function () {
  const RB = window.RB = window.RB || {};
  const D = document;
  RB.videos = RB.videos || {};
  RB.video = (id, v) => { v.id = id; RB.videos[id] = v; };
  const NAT = () => window.PaesNative;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/==(.+?)==/g, '<mark>$1</mark>');
  const plain = s => String(s == null ? '' : s).replace(/\*\*|==/g, '');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, p) => a + (b - a) * p;
  const ease = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  const key = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
  const hashN = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = seed => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const shuffleSeed = (a, seed) => { const r = rng(seed); a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nWords = t => (String(t).match(/\S+/g) || []).length;
  const fmt = s => { s = Math.max(0, Math.floor(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  // Frases cortas: los motores de voz se cortan con textos largos y así el subtítulo sigue a la voz.
  const sentences = t => {
    const out = [];
    String(t || '').replace(/\s+/g, ' ').trim().split(/(?<=[.!?…:;])\s+(?=[A-ZÁÉÍÓÚÑ¿¡0-9«"])/).forEach(p => {
      if (p.length <= 220) { if (p) out.push(p); return; }
      let cur = '';
      p.split(/,\s+/).forEach(c => { if ((cur + ', ' + c).length > 200 && cur) { out.push(cur + ','); cur = c; } else cur = cur ? cur + ', ' + c : c; });
      if (cur) out.push(cur);
    });
    return out;
  };
  const estSecs = (t, rate = 1) => Math.max(1.2, nWords(t) / (2.45 * rate)) + .25;
  const I = (n, c) => RB.icon(n, c);
  // Ícono con trazos que se pueden "dibujar" (cada figura mide 1 de largo).
  const drawIcon = (n, c = '') => I(n, c).replace(/<(path|circle|rect|line|polyline|ellipse|polygon)\b/g, '<$1 pathLength="1"');

  // ---------- Voz del teléfono: lectura de preguntas y respaldo de los videos ----------
  const TTS = RB.tts = { voice: null, list: [], pref: null, rate: 1, seq: 0, cbs: {}, live: [] };
  TTS.webOk = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  RB.canSpeak = TTS.webOk || !!NAT();
  const score = v => {
    const n = v.name || '', l = (v.lang || '').replace('_', '-');
    if (!/^es/i.test(l)) return -1;
    let s = 0;
    if (/catalina/i.test(n)) s += 60;
    if (/natural|neural|online|premium|enhanced|wavenet/i.test(n)) s += 40;
    if (/google/i.test(n)) s += 15;
    if (/^es-CL/i.test(l)) s += 20; else if (/^es-(419|US|MX|AR|CO|PE)/i.test(l)) s += 10;
    return s;
  };
  TTS.refresh = () => {
    if (NAT()) {
      try { TTS.list = JSON.parse(NAT().voices() || '[]'); } catch (e) { TTS.list = []; }
      return TTS.list;
    }
    if (!TTS.webOk) return [];
    const vs = speechSynthesis.getVoices().filter(v => score(v) >= 0).sort((a, b) => score(b) - score(a));
    TTS.list = vs.map(v => ({ n: v.name, l: v.lang, q: score(v) }));
    TTS.voice = (TTS.pref && vs.find(v => v.name === TTS.pref)) || vs[0] || null;
    return TTS.list;
  };
  TTS.setPref = name => {
    TTS.pref = name || null;
    if (NAT()) { try { NAT().setVoice(name || ''); } catch (e) { /* app antigua */ } } else TTS.refresh();
  };
  TTS.current = () => NAT() ? (() => { try { return NAT().voiceName(); } catch (e) { return ''; } })() : (TTS.voice ? TTS.voice.name : '');
  if (TTS.webOk && !NAT()) { try { TTS.refresh(); speechSynthesis.addEventListener('voiceschanged', TTS.refresh); } catch (e) { /* sin voces */ } }
  RB.ttsDone = id => { const cb = TTS.cbs[id]; delete TTS.cbs[id]; if (cb) cb(); };
  TTS.speak = (text, onEnd, rate = TTS.rate) => {
    const id = 'u' + (++TTS.seq);
    let done = false;
    const fin = () => { if (done) return; done = true; clearTimeout(guard); delete TTS.cbs[id]; if (onEnd) onEnd(); };
    const guard = setTimeout(fin, estSecs(text, rate) * 1900 + 2500);
    TTS.cbs[id] = fin;
    try {
      if (NAT()) {
        if (NAT().speak(text, id, rate) === false) { clearTimeout(guard); setTimeout(fin, estSecs(text, rate) * 1000); }
        return id;
      }
      if (!TTS.webOk) { clearTimeout(guard); setTimeout(fin, estSecs(text, rate) * 1000); return id; }
      const u = new SpeechSynthesisUtterance(text);
      u.lang = TTS.voice ? TTS.voice.lang : 'es-CL';
      if (TTS.voice) u.voice = TTS.voice;
      u.rate = rate;
      u.onend = fin; u.onerror = fin;
      TTS.live.push(u); if (TTS.live.length > 6) TTS.live.shift();
      speechSynthesis.speak(u);
    } catch (e) { fin(); }
    return id;
  };
  TTS.stop = () => {
    TTS.cbs = {};
    try { if (NAT()) NAT().stop(); else if (TTS.webOk) speechSynthesis.cancel(); } catch (e) { /* nada */ }
  };
  RB.say = txt => { if (!RB.canSpeak || !txt) return; TTS.stop(); const parts = sentences(txt); const step = () => { const p = parts.shift(); if (p) TTS.speak(p, step); }; step(); };
  RB.hush = () => TTS.stop();

  // ---------- Narración grabada ----------
  RB.vtimes = RB.vtimes || {};
  const waiting = {};
  RB.vaudio = (id, d) => { RB.vtimes[id] = d; (waiting[id] || []).forEach(f => f()); delete waiting[id]; };
  const loadScript = src => new Promise(res => {
    const s = D.createElement('script');
    s.src = src; s.async = true;
    s.onload = () => res(true); s.onerror = () => { s.remove(); res(false); };
    D.head.appendChild(s);
  });
  RB.loadTimes = id => {
    if (RB.vtimes[id]) return Promise.resolve(RB.vtimes[id]);
    return new Promise(res => {
      let done = false;
      const fin = () => { if (!done) { done = true; res(RB.vtimes[id] || null); } };
      (waiting[id] = waiting[id] || []).push(fin);
      loadScript(`audio/${id}.js`).then(ok => { if (!ok) fin(); });
      setTimeout(fin, 6000);
    });
  };
  // Lee el audio completo en memoria (si se puede) para que saltar a cualquier punto sea instantáneo; si no, se
  // usa la dirección del archivo tal cual.
  const srcFor = url => new Promise(res => {
    let done = false;
    const fin = v => { if (!done) { done = true; res(v); } };
    try {
      const x = new XMLHttpRequest();
      x.open('GET', url);
      x.responseType = 'blob';
      x.onload = () => fin(x.response && x.response.size > 1000 ? URL.createObjectURL(new Blob([x.response], { type: 'audio/webm' })) : url);
      x.onerror = () => fin(url);
      x.send();
    } catch (e) { fin(url); }
    setTimeout(() => fin(url), 8000);
  });
  let feedbackP = null;
  let fbSrc = null;
  const loadFeedback = () => feedbackP || (feedbackP = RB.loadTimes('fb').then(d => srcFor('audio/fb.webm').then(s => { fbSrc = s; return d; })));
  let musicP = null;
  const loadMusic = () => musicP || (musicP = RB.music ? Promise.resolve(RB.music) : loadScript('audio/musica.js').then(() => RB.music || null));

  // Duración del video: la grabada (audio/indice.js) o una estimación por cantidad de palabras.
  RB.videoSecs = id => {
    if (RB.vdur && RB.vdur[id]) return RB.vdur[id];
    if (RB.vtimes[id]) return RB.vtimes[id].d;
    const v = RB.videos[id];
    if (!v) return 0;
    if (v.kind === 'toon') return Math.round(RB.toonKit.timeline(v, null).d);
    let s = .9;
    v.sc.forEach((sc, si) => {
      if (si) s += 1.1;
      (sc.s || []).forEach(t => sentences(t).forEach(p => { s += estSecs(p) + .3; }));
      (sc.b || []).forEach(b => { if (b && b.q) s += estSecs(b.q) + (b.e ? estSecs(b.e) : 0) + 1.2; });
    });
    return Math.round(s + 1.6);
  };

  // ---------- Línea de tiempo ----------
  // Con la narración grabada usa sus tiempos; sin ella, los estima con el mismo orden que tools/guion.js.
  function timeline(v, data) {
    const T = { d: 0, rec: !!data, sc: [], cues: [], lines: [], quiz: [], env: (data && data.e) || '' };
    let starts = [];
    if (data) {
      T.d = data.d;
      starts = data.sc.slice();
      data.c.forEach(([si, k, kind, t0, t1, lines]) => {
        T.cues.push({ si, k, kind, t0, t1, lines: lines.map(([a, b, text, w]) => ({ t0: a, t1: b, text, w: w ? w.map(x => a + x / 100) : null })) });
      });
    } else {
      let t = .9;
      v.sc.forEach((sc, si) => {
        if (si) t += 1.1;
        starts.push(si ? t - .66 : 0);
        const add = (k, kind, text) => {
          text = plain(text).replace(/\s+/g, ' ').trim();
          if (!text) return;
          if (T.cues.some(c => c.si === si)) t += kind === 'e' ? .7 : .55;
          const c0 = t, lines = [];
          sentences(text).forEach((p, i) => {
            if (i) t += .32;
            const d = estSecs(p) - .25, ws = p.split(/\s+/), tot = ws.reduce((n, w) => n + w.length + 2, 0);
            let acc = 0;
            lines.push({ t0: t, t1: t + d, text: p, w: ws.map(w => { const x = t + d * acc / tot; acc += w.length + 2; return x; }) });
            t += d;
          });
          T.cues.push({ si, k, kind, t0: c0, t1: t, lines, text });
        };
        add(0, 'intro', (sc.s || [])[0]);
        (sc.b || []).forEach((b, i) => {
          add(i + 1, 'block', (sc.s || [])[i + 1]);
          if (b && b.q) { add(i + 1, 'q', b.q); add(i + 1, 'e', b.e); }
        });
      });
      T.d = t + 1.6;
    }
    T.cues.forEach(c => c.lines.forEach(l => { l.cue = c; T.lines.push(l); }));
    T.lines.sort((a, b) => a.t0 - b.t0);
    v.sc.forEach((sc, si) => {
      const t0 = starts[si] != null ? starts[si] : (si ? T.sc[si - 1].t1 : 0);
      const t1 = si + 1 < v.sc.length ? (starts[si + 1] != null ? starts[si + 1] : T.d) : T.d;
      const cues = T.cues.filter(c => c.si === si);
      const intro = cues.find(c => c.kind === 'intro');
      let prev = intro ? intro.t1 : t0 + 1;
      const blockT = (sc.b || []).map((b, i) => {
        const c = cues.find(x => x.k === i + 1 && x.kind === 'block') || cues.find(x => x.k === i + 1);
        prev = c ? c.t0 - .1 : prev + 1.2;
        return prev;
      });
      const W = [];
      cues.forEach(c => c.lines.forEach(l => { if (l.w && l.text) l.text.split(/\s+/).forEach((w, j) => W.push([key(w), l.w[j] != null ? l.w[j] : l.t0])); }));
      const title = si === 0 || sc.k === 'title', firstT = blockT.length ? blockT[0] : t1;
      // Si la escena parte con una intro larga, Lima la presenta al centro junto a una ilustración del tema.
      T.sc.push({ si, t0, t1, cues, blockT, W, title, intro: !title && firstT - t0 > 2.4 ? firstT - .3 : null });
      (sc.b || []).forEach((b, i) => {
        if (!b || !b.q) return;
        const q = cues.find(c => c.k === i + 1 && c.kind === 'q'), e = cues.find(c => c.k === i + 1 && c.kind === 'e');
        const tq = q ? q.t1 + .12 : blockT[i] + 2;
        T.quiz.push({ si, k: i + 1, b, tq, tOpt: q ? Math.min(q.t0 + .6, q.t1 - .3) : blockT[i] + 1, te: e ? e.t0 : tq + .3, answered: null });
      });
    });
    return T;
  }
  // Momento en que la narración nombra un texto (su palabra más distintiva) dentro de [desde, hasta].
  function mention(S, text, from, to) {
    const ks = plain(text).split(/\s+/).map(key).filter(k => k.length >= 3 && !STOP.has(k));
    if (!ks.length) return null;
    const k0 = ks.slice(0, 3).sort((a, b) => b.length - a.length)[0];
    const stem = k0.length > 5 ? k0.slice(0, Math.max(5, k0.length - 2)) : k0;
    for (const [w, t] of S.W) if (t >= from - .05 && t <= to && (w === k0 || w.startsWith(stem))) return t;
    return null;
  }
  const STOP = new Set('los las del una uno unos unas que con por para como mas sus son esta este esto ese esa hay muy pero sin sobre entre'.split(' '));

  // ---------- Animaciones ----------
  // Cada animación es una Web Animation en pausa; el reproductor mueve currentTime al tiempo del video.
  const EASE = { out: 'cubic-bezier(.2,.8,.2,1)', back: 'cubic-bezier(.3,1.45,.5,1)', inout: 'cubic-bezier(.6,0,.3,1)', in: 'cubic-bezier(.55,0,.8,.3)' };
  const CAN_ANIM = typeof Element !== 'undefined' && !!Element.prototype.animate;
  class Anims {
    constructor() { this.list = []; }
    add(el, kf, t0, dur, easing = EASE.out, extra) {
      if (!el || !CAN_ANIM) return null;
      try {
        const a = el.animate(kf, Object.assign({ duration: Math.max(1, dur * 1000), delay: t0 * 1000, fill: 'both', easing }, extra || {}));
        a.pause();
        this.list.push(a);
        return a;
      } catch (e) { return null; }
    }
    set(t) { const ms = Math.max(0, t * 1000); for (let i = 0; i < this.list.length; i++) this.list[i].currentTime = ms; }
    kill() { this.list.forEach(a => { try { a.cancel(); } catch (e) { /* nada */ } }); this.list = []; }
  }
  const IN = { opacity: 0, transform: 'translateY(.5em)' }, SHOWN = { opacity: 1, transform: 'none' };
  // Piezas que usan también los videos en dibujos (toon.js).
  RB.vkit = { Anims, EASE, sentences, estSecs, plain, key, hashN, rng };
  // Texto con **negrita** y ==resaltado== partido en palabras que entran una a una; lo marcado queda agrupado.
  function kin(s) {
    const src = String(s == null ? '' : s), seg = [], re = /(\*\*|==)/g;
    let last = 0, b = false, m = false, mm;
    while ((mm = re.exec(src))) { if (mm.index > last) seg.push({ t: src.slice(last, mm.index), b, m }); if (mm[1] === '**') b = !b; else m = !m; last = re.lastIndex; }
    if (last < src.length) seg.push({ t: src.slice(last), b, m });
    return seg.map(g => {
      const ws = g.t.split(/(\s+)/).map(w => /^\s*$/.test(w) ? (w ? ' ' : '') : `<span class="w">${esc(w)}</span>`).join('');
      return g.b ? `<b class="hl">${ws}</b>` : g.m ? `<mark class="hl">${ws}</mark>` : ws;
    }).join('');
  }
  const kinWords = (el, A, t0, step = .045, dur = .36) => {
    const ws = el ? el.querySelectorAll('.w') : [];
    ws.forEach((w, j) => A.add(w, [IN, SHOWN], t0 + j * step, dur));
    return t0 + ws.length * step + dur;
  };
  // Resalta los términos marcados cuando la narradora los dice.
  const highlights = (el, A, S, from, to) => {
    if (!el) return;
    el.querySelectorAll('.hl').forEach((h, j) => {
      const t = mention(S, h.textContent, from, to);
      A.add(h, [{ backgroundSize: '0% 38%' }, { backgroundSize: '100% 38%' }], t != null ? t : from + .7 + j * .35, .45, EASE.out);
    });
  };
  const DRAW = (svg, A, t0, dur = .9) => {
    if (!svg) return;
    svg.querySelectorAll('[pathLength]').forEach((p, j) => A.add(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], t0 + j * .08, dur, EASE.inout));
  };
  // Movimiento de fondo de la ilustración de cada escena, según lo que representa.
  const SPIN = new Set(['gear', 'globe', 'atom', 'planet', 'sun', 'tire', 'round', 'target', 'replay']);
  const BEAT = new Set(['heart', 'bulb', 'flame', 'star', 'spark', 'bolt', 'brain', 'cell', 'eye']);
  const SWING = new Set(['scale', 'flag', 'crown', 'vote', 'scroll', 'sword', 'shield', 'landmark', 'quote', 'pen']);
  function idle(el, name, A, t0) {
    if (SPIN.has(name)) A.add(el, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], t0, 46, 'linear', { iterations: Infinity });
    else if (BEAT.has(name)) A.add(el, [{ transform: 'scale(1)' }, { transform: 'scale(1.07)' }], t0, 1.3, 'ease-in-out', { iterations: Infinity, direction: 'alternate' });
    else if (SWING.has(name)) A.add(el, [{ transform: 'rotate(-4deg)' }, { transform: 'rotate(4deg)' }], t0, 3.2, 'ease-in-out', { iterations: Infinity, direction: 'alternate' });
    else A.add(el, [{ transform: 'translateY(-8px)' }, { transform: 'translateY(8px)' }], t0, 4.6, 'ease-in-out', { iterations: Infinity, direction: 'alternate' });
  }

  // ---------- Bloques ----------
  function plotSvg(p) {
    const W = 300, H = 190, [x0, x1] = p.x || [-5, 5];
    const fs = Array.isArray(p.f) ? p.f : [p.f];
    let [y0, y1] = p.y || [null, null];
    if (y0 == null) {
      let lo = Infinity, hi = -Infinity;
      fs.forEach(f => { for (let k = 0; k <= 60; k++) { const y = f(x0 + (x1 - x0) * k / 60); if (isFinite(y)) { lo = Math.min(lo, y); hi = Math.max(hi, y); } } });
      const pad = (hi - lo) * .12 || 1; y0 = lo - pad; y1 = hi + pad;
    }
    const X = x => 14 + (W - 28) * (x - x0) / (x1 - x0), Y = y => H - 14 - (H - 28) * (y - y0) / (y1 - y0);
    let s = `<svg class="plot" viewBox="0 0 ${W} ${H}" aria-hidden="true"><g class="pgr">`;
    for (let gx = Math.ceil(x0); gx <= x1; gx++) s += `<line x1="${X(gx)}" x2="${X(gx)}" y1="10" y2="${H - 10}" class="pg"/>`;
    s += '</g>';
    if (y0 < 0 && y1 > 0) s += `<line x1="8" x2="${W - 8}" y1="${Y(0)}" y2="${Y(0)}" class="pa" pathLength="1"/>`;
    if (x0 < 0 && x1 > 0) s += `<line x1="${X(0)}" x2="${X(0)}" y1="${H - 8}" y2="8" class="pa" pathLength="1"/>`;
    fs.forEach((f, i) => {
      let d = '', pen = false;
      for (let k = 0; k <= 160; k++) {
        const x = x0 + (x1 - x0) * k / 160, y = f(x);
        if (!isFinite(y) || y < y0 - (y1 - y0) || y > y1 + (y1 - y0)) { pen = false; continue; }
        d += `${pen ? 'L' : 'M'}${X(x).toFixed(1)} ${Y(Math.max(y0 - 1, Math.min(y1 + 1, y))).toFixed(1)}`; pen = true;
      }
      s += `<path d="${d}" class="pf${i ? ' p2' : ''}" pathLength="1"/>`;
    });
    (p.pts || []).forEach(([x, y, l]) => {
      const px = X(x), py = Y(y), right = px > W * .62, up = py > 30;
      s += `<g class="ppt"><circle cx="${px}" cy="${py}" r="4.5" class="pp"/>` + (l ? `<text x="${right ? px - 8 : px + 8}" y="${up ? py - 9 : py + 18}" class="pt" text-anchor="${right ? 'end' : 'start'}">${esc(l)}</text>` : '') + '</g>';
    });
    if (p.lx) s += `<text x="${W - 12}" y="${Y(0) - 6 > 14 ? Y(0) - 6 : H - 18}" class="pt plx" text-anchor="end">${esc(p.lx)}</text>`;
    return s + `</svg>`;
  }
  const kindOf = b => typeof b === 'string' ? 'pt' : b.eq != null ? 'eq' : b.ex != null ? 'ex' : b.sol != null ? 'sol' : b.big != null ? 'big' : b.tl != null ? 'tl' : b.two ? 'two'
    : b.warn != null ? 'warn' : b.tip != null ? 'tip' : b.quote != null ? 'quote' : b.tags ? 'tags' : b.ic ? 'ic' : b.plot ? 'plot' : b.bars ? 'bars' : b.q ? 'quiz' : '';
  function blockHTML(b, seed) {
    switch (kindOf(b)) {
      case 'pt': return `<div class="b-pt"><i class="dot"></i><p>${kin(b)}</p></div>`;
      case 'eq': return `<div class="b-eq">${String(b.eq).split('\n').map(l => `<div class="eql"><span class="eqt">${rich(l)}</span></div>`).join('')}<i class="pen"></i>${b.n ? `<small>${kin(b.n)}</small>` : ''}</div>`;
      case 'ex': return `<div class="b-card"><small class="stamp">${esc(b.k || 'Ejemplo')}</small><p>${kin(b.ex)}</p></div>`;
      case 'sol': return `<div class="b-card sol"><small class="stamp">${I('check')}${esc(b.k || 'Solución')}</small><p>${kin(b.sol)}</p></div>`;
      case 'big': return `<div class="b-big"><b>${rich(b.big)}</b>${b.sub ? `<span>${kin(b.sub)}</span>` : ''}</div>`;
      case 'tl': return `<div class="b-tl"><i class="tl-line"></i><i class="tl-dot"></i><b class="tl-y">${esc(b.tl)}</b><p>${kin(b.t || '')}</p></div>`;
      case 'two': return `<div class="b-two">${b.two.map((col, ci) => `<div class="col c${ci}"><b>${kin(col[0])}</b>${col.slice(1).map(x => `<p class="it">${kin(x)}</p>`).join('')}</div>`).join('<i class="vs-div"></i>')}</div>`;
      case 'warn': return `<div class="b-warn"><span class="bi">${I('flag')}</span><div><small>¡Ojo!</small><p>${kin(b.warn)}</p></div></div>`;
      case 'tip': return `<div class="b-tip"><span class="bi">${I('bulb')}</span><div><small>Truco</small><p>${kin(b.tip)}</p></div></div>`;
      case 'quote': return `<blockquote class="b-quote"><span class="bi">${I('quote')}</span><p>${kin(b.quote)}</p>${b.by ? `<cite>${esc(b.by)}</cite>` : ''}</blockquote>`;
      case 'tags': return `<div class="b-tags">${b.tags.map(t => `<span class="tag"><span>${rich(t)}</span></span>`).join('')}</div>`;
      case 'ic': return `<div class="b-ic"><span class="bi">${drawIcon(b.ic)}</span><p>${kin(b.t || '')}</p></div>`;
      case 'plot': return `<div class="b-plot">${plotSvg(b.plot)}${b.plot.cap ? `<small>${kin(b.plot.cap)}</small>` : ''}</div>`;
      case 'bars': {
        const mx = Math.max(...b.bars.map(x => Math.abs(x[1])));
        return `<div class="b-bars">${b.bars.map(([l, v]) => `<div class="br"><span>${esc(l)}</span><i><i style="width:${(100 * Math.abs(v) / mx).toFixed(1)}%"></i></i><b>${esc(String(v).replace('.', ','))}${esc(b.u || '')}</b></div>`).join('')}</div>`;
      }
      case 'quiz': {
        const opts = shuffleSeed(b.o.map((t, i) => ({ t, i })), seed);
        return `<div class="b-quiz"><small class="qchip">${I('target')}Pregunta rápida</small><p class="qq">${kin(b.q)}</p>` +
          `<div class="qo">${opts.map((x, j) => `<button class="qopt" type="button" data-v="${x.i}" disabled><span class="k">${String.fromCharCode(65 + j)}</span><span class="ot">${rich(x.t)}</span></button>`).join('')}</div>` +
          `<div class="qfb" aria-live="polite"></div><button class="qskip" type="button">Saltar pregunta</button>${b.e ? `<p class="qe">${kin(b.e)}</p>` : ''}</div>`;
      }
    }
    return '';
  }

  // Animaciones de un bloque que aparece en ta; tn es cuando aparece el siguiente.
  function animateBlock(w, b, A, S, ta, tn, title) {
    const n = w.firstElementChild, k = kindOf(b), end = S.t1;
    A.add(w, [{ opacity: 0, transform: 'translateY(26px) scale(.97)' }, SHOWN], ta, .55, EASE.out);
    if (!title && tn < end - .4 && k !== 'quiz') A.add(n, [{ opacity: 1 }, { opacity: .42 }], tn, .5, EASE.out, { fill: 'forwards' });
    const $ = s => w.querySelector(s), $$ = s => w.querySelectorAll(s);
    switch (k) {
      case 'pt': {
        A.add($('.dot'), [{ transform: 'rotate(45deg) scale(0)' }, { transform: 'rotate(45deg) scale(1.5)', offset: .6 }, { transform: 'rotate(45deg) scale(1)' }], ta + .05, .45, 'ease-out');
        kinWords(w, A, ta + .12);
        highlights(w, A, S, ta, end);
        break;
      }
      case 'eq': {
        let t = ta + .2;
        $$('.eqt').forEach(e => { const d = clamp(e.textContent.length * .05, .5, 1.8); A.add(e, [{ clipPath: 'inset(-20% 100% -20% 0)' }, { clipPath: 'inset(-20% 0% -20% 0)' }], t, d, 'linear'); t += d + .15; });
        A.add($('.pen'), [{ left: '6%', opacity: 0 }, { left: '8%', opacity: 1, offset: .05 }, { left: '92%', opacity: 1, offset: .95 }, { left: '94%', opacity: 0 }], ta + .2, t - ta - .2, 'linear');
        A.add($('.b-eq'), [{ boxShadow: '0 0 0 0 rgba(198,255,0,0)' }, { boxShadow: '0 0 36px 2px rgba(198,255,0,.35)' }, { boxShadow: '0 0 0 0 rgba(198,255,0,0)' }], t, 1.1, 'ease-out', { fill: 'forwards' });
        if ($('small')) kinWords($('small'), A, t);
        break;
      }
      case 'ex': case 'sol': {
        A.add($('.b-card'), [{ transform: 'translateX(46px) rotate(4deg)', opacity: 0 }, SHOWN], ta, .6, EASE.back);
        A.add($('.stamp'), [{ transform: 'scale(2.4)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], ta + .3, .35, EASE.back);
        kinWords($('p'), A, ta + .4, .04);
        highlights(w, A, S, ta, end);
        break;
      }
      case 'big': {
        A.add($('.b-big b'), [{ transform: 'scale(2.8)', opacity: 0 }, { transform: 'scale(.9)', opacity: 1, offset: .7 }, { transform: 'scale(1)', opacity: 1 }], ta + .05, .65, 'ease-out');
        A.add($('.b-big b'), [{ textShadow: '0 0 18px rgba(198,255,0,.25)' }, { textShadow: '0 0 50px rgba(198,255,0,.65)' }], ta + .7, 1.5, 'ease-in-out', { iterations: Infinity, direction: 'alternate', fill: 'forwards' });
        if ($('.b-big span')) kinWords($('.b-big span'), A, ta + .55);
        break;
      }
      case 'tl': {
        A.add($('.tl-line'), [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], ta - .15, .5, EASE.out);
        A.add($('.tl-dot'), [{ transform: 'translateY(-28px) scale(.3)', opacity: 0 }, { transform: 'translateY(3px) scale(1.2)', opacity: 1, offset: .7 }, SHOWN], ta, .55, 'ease-out');
        A.add($('.tl-y'), [{ transform: 'translateX(-16px)', opacity: 0, letterSpacing: '.35em' }, { transform: 'none', opacity: 1, letterSpacing: '0em' }], ta + .1, .5, EASE.out);
        A.add($('.tl-dot'), [{ boxShadow: '0 0 0 0 rgba(198,255,0,.5)' }, { boxShadow: '0 0 0 12px rgba(198,255,0,0)' }], ta + .55, 1.2, 'ease-out', { iterations: 3, fill: 'forwards' });
        kinWords($('p'), A, ta + .3);
        highlights(w, A, S, ta, end);
        break;
      }
      case 'two': {
        const cols = $$('.col');
        A.add($('.vs-div'), [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], ta + .1, .5, EASE.out);
        cols.forEach((c, ci) => {
          const tc = ci === 0 ? ta : (mention(S, b.two[ci][0], ta + .4, tn) ?? ta + clamp((tn - ta) * .45, .5, 3.2));
          A.add(c, [{ transform: `translateX(${ci ? 40 : -40}px)`, opacity: 0 }, SHOWN], tc, .55, EASE.out);
          kinWords(c.querySelector('b'), A, tc + .1, .05);
          c.querySelectorAll('.it').forEach((it, j) => {
            const tj = mention(S, it.textContent, tc + .2, tn);
            A.add(it, [{ opacity: 0, transform: 'translateY(10px)' }, SHOWN], Math.max(tc + .35 + j * .25, tj != null ? tj - .1 : 0), .4, EASE.out);
          });
        });
        break;
      }
      case 'warn': {
        A.add($('.bi'), [{ transform: 'scale(0) rotate(-30deg)' }, { transform: 'scale(1.3) rotate(8deg)', offset: .6 }, { transform: 'none' }], ta + .1, .5, 'ease-out');
        A.add($('.b-warn'), [{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)', offset: .2 }, { transform: 'translateX(7px)', offset: .4 }, { transform: 'translateX(-4px)', offset: .6 }, { transform: 'translateX(2px)', offset: .8 }, { transform: 'translateX(0)' }], ta + .55, .5, 'linear', { fill: 'forwards' });
        kinWords($('p'), A, ta + .2);
        highlights(w, A, S, ta, end);
        break;
      }
      case 'tip': {
        A.add($('.bi'), [{ transform: 'scale(.4)', filter: 'drop-shadow(0 0 0 rgba(198,255,0,0))' }, { transform: 'scale(1.25)', filter: 'drop-shadow(0 0 14px rgba(198,255,0,.95))', offset: .55 }, { transform: 'scale(1)', filter: 'drop-shadow(0 0 5px rgba(198,255,0,.5))' }], ta + .1, .9, 'ease-out');
        kinWords($('p'), A, ta + .25);
        highlights(w, A, S, ta, end);
        break;
      }
      case 'quote': {
        A.add($('.bi'), [{ transform: 'scale(3) rotate(-25deg)', opacity: 0 }, SHOWN], ta, .55, EASE.back);
        const te = kinWords($('p'), A, ta + .25, .065, .45);
        if ($('cite')) A.add($('cite'), [{ opacity: 0, transform: 'translateX(24px)' }, SHOWN], te, .5, EASE.out);
        break;
      }
      case 'tags': {
        const r = rng(hashN(b.tags.join('|')));
        $$('.tag').forEach((tg, j) => {
          const tm = mention(S, tg.textContent, ta, end);
          const t = tm != null ? Math.max(ta, tm - .15) : ta + .15 + j * .24;
          const dx = Math.round((r() - .5) * 160), dy = Math.round((r() - .5) * 110), rot = Math.round((r() - .5) * 40);
          A.add(tg, [{ opacity: 0, transform: `translate(${dx}px,${dy}px) rotate(${rot}deg) scale(.35)` }, SHOWN], t, .65, EASE.back);
          A.add(tg.firstElementChild, [{ transform: 'translateY(0)' }, { transform: `translateY(${-3 - Math.round(r() * 4)}px)` }], t + .7, 1.6 + r(), 'ease-in-out', { iterations: Infinity, direction: 'alternate', fill: 'forwards' });
        });
        break;
      }
      case 'ic': {
        A.add($('.bi'), [{ transform: 'scale(.6)', opacity: 0 }, SHOWN], ta, .4, EASE.back);
        DRAW($('.bi svg'), A, ta + .1);
        kinWords($('p'), A, ta + .3);
        highlights(w, A, S, ta, end);
        break;
      }
      case 'plot': {
        A.add($('.pgr'), [{ opacity: 0 }, { opacity: 1 }], ta + .1, .5);
        $$('.pa').forEach(p => A.add(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], ta + .15, .6, EASE.inout));
        let t = ta + .5;
        $$('.pf').forEach(p => { A.add(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], t, 1.6, EASE.inout); t += .8; });
        $$('.ppt').forEach((p, j) => A.add(p, [{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'scale(1.25)', offset: .7 }, SHOWN], t + .8 + j * .3, .45, 'ease-out'));
        if ($('.plx')) A.add($('.plx'), [{ opacity: 0 }, { opacity: 1 }], t + .6, .4);
        if ($('small')) kinWords($('small'), A, t + .4);
        break;
      }
      case 'bars': {
        $$('.br').forEach((br, j) => {
          const t = ta + .2 + j * .2;
          A.add(br.querySelector('span'), [{ opacity: 0, transform: 'translateX(-10px)' }, SHOWN], t, .35);
          A.add(br.querySelector('i i'), [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], t + .1, .75, EASE.out);
          A.add(br.querySelector('b'), [{ opacity: 0 }, { opacity: 1 }], t + .6, .3);
        });
        break;
      }
      case 'quiz': {
        A.add($('.b-quiz'), [{ transform: 'perspective(700px) rotateX(65deg)', opacity: 0 }, SHOWN], ta, .65, EASE.out);
        A.add($('.qchip'), [{ transform: 'scale(.6)', opacity: 0 }, { transform: 'scale(1.12)', opacity: 1, offset: .6 }, SHOWN], ta + .25, .45, 'ease-out');
        kinWords($('.qq'), A, ta + .35, .04);
        break;
      }
    }
  }
  function animateQuizOpts(w, A, q) {
    w.querySelectorAll('.qopt').forEach((o, j) => A.add(o, [{ opacity: 0, transform: 'translateY(16px)' }, SHOWN], q.tOpt + j * .09, .4, EASE.out));
    const e = w.querySelector('.qe');
    if (e) { A.add(e, [{ opacity: 0 }, { opacity: 1 }], q.te, .3, EASE.out); kinWords(e, A, q.te + .05, .035); }
  }

  // ---------- Mascota: Lima ----------
  // Una lima con hojita: parpadea, mueve la boca con la voz, apunta a lo que aparece y reacciona.
  RB.mascot = (cls = '') => `<svg class="lima ${cls}" viewBox="0 0 120 120" aria-hidden="true">
    <defs><radialGradient id="lmg" cx="36%" cy="30%" r="78%"><stop offset="0" stop-color="#efff9e"/><stop offset=".5" stop-color="#c6ff00"/><stop offset="1" stop-color="#78b000"/></radialGradient></defs>
    <ellipse class="l-sh" cx="60" cy="112" rx="30" ry="5"/>
    <g class="l-all">
      <path class="l-arm l-al" d="M22 74 Q10 76 8 64"/><path class="l-arm l-ar" d="M98 74 Q110 76 112 64"/>
      <path class="l-stem" d="M60 26 L60 18"/>
      <path class="l-leaf" d="M60 22 C 64 8, 80 6, 88 11 C 80 21, 68 25, 60 22 Z"/>
      <ellipse class="l-skin" cx="60" cy="68" rx="40" ry="38"/>
      <ellipse class="l-shine" cx="44" cy="47" rx="11" ry="6" transform="rotate(-28 44 47)"/>
      <g class="l-pores"><circle cx="78" cy="52" r="1.2"/><circle cx="84" cy="66" r="1"/><circle cx="36" cy="82" r="1.1"/><circle cx="70" cy="92" r="1"/><circle cx="50" cy="36" r="1"/></g>
      <g class="l-face">
        <g class="l-eyes"><g transform="translate(46 64)"><g class="l-eye"><ellipse rx="9" ry="10.5" class="l-ew"/><g class="l-pu"><circle r="5.2"/><circle class="l-gl" r="1.7" cx="-1.8" cy="-2.2"/></g></g></g>
          <g transform="translate(74 64)"><g class="l-eye"><ellipse rx="9" ry="10.5" class="l-ew"/><g class="l-pu"><circle r="5.2"/><circle class="l-gl" r="1.7" cx="-1.8" cy="-2.2"/></g></g></g></g>
        <path class="l-brow" d="M37 50 Q45 45 53 49"/><path class="l-brow" d="M67 49 Q75 45 83 50"/>
        <ellipse class="l-ck" cx="35" cy="78" rx="6" ry="3.6"/><ellipse class="l-ck" cx="85" cy="78" rx="6" ry="3.6"/>
        <g class="l-mouth" transform="translate(60 82)"><path class="l-smile" d="M-8 -1 Q0 6 8 -1"/><g class="l-open"><ellipse class="l-o" rx="7" ry="5"/><ellipse class="l-tg" cy="2.6" rx="4" ry="2"/></g></g>
      </g>
      <g class="l-cap"><path d="M32 30 L60 18 L88 30 L60 42 Z"/><path d="M44 35 L44 44 Q60 52 76 44 L76 35"/><path class="l-tassel" d="M86 31 L86 44"/></g>
    </g></svg>`;
  class Pet {
    constructor(el) {
      this.el = el;
      const q = s => el.querySelector(s);
      this.all = q('.l-all'); this.open = q('.l-open'); this.smile = q('.l-smile');
      this.eyes = [...el.querySelectorAll('.l-eye')]; this.pu = [...el.querySelectorAll('.l-pu')];
      this.al = q('.l-al'); this.ar = q('.l-ar'); this.brows = [...el.querySelectorAll('.l-brow')];
      this.mo = 0;
    }
    // o: apertura de boca 0..1 · t: tiempo · point: 0..1 brazo arriba · look: [x, y]
    frame(t, o, point, look) {
      this.mo += (o - this.mo) * .55;
      const m = this.mo;
      this.open.setAttribute('transform', `scale(${(.55 + m * .7).toFixed(3)} ${Math.max(.05, m * 1.25).toFixed(3)})`);
      this.open.style.opacity = m > .06 ? 1 : 0;
      this.smile.style.opacity = m > .06 ? 0 : 1;
      const ph = (t + 1.3) % 4.3, blink = ph < .14 || (ph > .32 && ph < .44 && Math.floor(t / 4.3) % 3 === 0);
      this.eyes.forEach(e => e.setAttribute('transform', `scale(1 ${blink ? .12 : 1})`));
      const lx = look ? look[0] : Math.sin(t * .7) * 1.2, ly = look ? look[1] : Math.cos(t * .5) * .8;
      this.pu.forEach(p => p.setAttribute('transform', `translate(${lx.toFixed(2)} ${ly.toFixed(2)})`));
      const bob = Math.sin(t * 2.3) * 2.2 - m * 2.4, tilt = Math.sin(t * 1.1) * 2.2;
      this.all.setAttribute('transform', `translate(0 ${bob.toFixed(2)}) rotate(${tilt.toFixed(2)} 60 70)`);
      const up = ease(clamp(point, 0, 1));
      this.ar.setAttribute('transform', `rotate(${(-70 * up + Math.sin(t * 3) * 3 * up).toFixed(1)} 98 74)`);
      this.al.setAttribute('transform', `rotate(${(Math.sin(t * 1.7) * 6).toFixed(1)} 22 74)`);
      this.brows.forEach(b => b.setAttribute('transform', `translate(0 ${(-m * 1.6 - up * 1.2).toFixed(2)})`));
    }
    react(cls) { this.el.classList.remove('happy', 'sad', 'think', 'wave'); void this.el.offsetWidth; if (cls) this.el.classList.add(cls); }
  }

  // ---------- Música y efectos ----------
  let AC = null;
  const ac = () => { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); return AC; } catch (e) { return null; } };
  const b64buf = uri => { const s = atob(uri.split(',')[1]); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u.buffer; };
  class Music {
    constructor() { this.on = false; this.buf = null; this.src = null; this.gain = null; this.off = 0; this.t0 = 0; this.duck = 1; }
    async ready() {
      if (this.buf) return true;
      const uri = await loadMusic(), c = ac();
      if (!uri || !c) return false;
      try { this.buf = await new Promise((res, rej) => c.decodeAudioData(b64buf(uri), res, rej)); } catch (e) { return false; }
      return true;
    }
    async start() {
      this.want = true;
      if (!(await this.ready()) || !this.want || this.src) return;
      const c = ac();
      this.gain = c.createGain(); this.gain.gain.value = 0; this.gain.connect(c.destination);
      this.src = c.createBufferSource(); this.src.buffer = this.buf; this.src.loop = true; this.src.connect(this.gain);
      this.src.start(0, this.off % this.buf.duration); this.t0 = c.currentTime - this.off;
      this.gain.gain.setTargetAtTime(.22 * this.duck, c.currentTime, .4);
    }
    stop() {
      this.want = false;
      if (!this.src) return;
      const c = ac(), s = this.src, g = this.gain;
      this.off = (c.currentTime - this.t0) % this.buf.duration;
      g.gain.setTargetAtTime(0, c.currentTime, .12);
      setTimeout(() => { try { s.stop(); s.disconnect(); g.disconnect(); } catch (e) { /* nada */ } }, 500);
      this.src = null; this.gain = null;
    }
    // Baja la música mientras habla la narradora.
    level(speaking) {
      const d = speaking ? .62 : 1;
      if (Math.abs(d - this.duck) < .01 || !this.gain) { this.duck = d; return; }
      this.duck = d;
      this.gain.gain.setTargetAtTime(.22 * d, ac().currentTime, .35);
    }
  }
  const SFX = {
    on: true,
    tone(f, d, type = 'sine', v = .05, when = 0, f2) {
      const c = this.on && ac(); if (!c) return;
      const t0 = c.currentTime + when, o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t0); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + d);
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + .01); g.gain.exponentialRampToValueAtTime(.0001, t0 + d);
      o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + d + .02);
    },
    whoosh() {
      const c = this.on && ac(); if (!c) return;
      const n = Math.floor(c.sampleRate * .5), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / n) ** 2;
      const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      s.buffer = buf; f.type = 'bandpass'; f.Q.value = 1.4;
      f.frequency.setValueAtTime(400, c.currentTime); f.frequency.exponentialRampToValueAtTime(3200, c.currentTime + .45);
      g.gain.value = .07; s.connect(f); f.connect(g); g.connect(c.destination); s.start();
    },
    pop() { this.tone(620, .08, 'sine', .028); this.tone(930, .1, 'sine', .02, .05); },
    ok() { this.tone(660, .12, 'sine', .07); this.tone(990, .2, 'sine', .07, .09); },
    bad() { this.tone(200, .22, 'triangle', .06, 0, 150); },
    done() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, .22, 'triangle', .06, i * .1)); },
    // Ruido filtrado: base de los golpes y barridos de los videos en dibujos.
    noise(d, f1, f2, v = .05, type = 'bandpass', q = 1.2) {
      const c = this.on && ac(); if (!c) return;
      const n = Math.floor(c.sampleRate * d), buf = c.createBuffer(1, n, c.sampleRate), x = buf.getChannelData(0);
      for (let i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
      const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      s.buffer = buf; f.type = type; f.Q.value = q;
      f.frequency.setValueAtTime(f1, c.currentTime); f.frequency.exponentialRampToValueAtTime(f2, c.currentTime + d);
      g.gain.value = v; s.connect(f); f.connect(g); g.connect(c.destination); s.start();
    },
    boing() { this.tone(240, .28, 'triangle', .04, 0, 560); this.tone(480, .2, 'sine', .015, .02, 900); },
    thud() { this.tone(120, .2, 'sine', .09, 0, 48); this.noise(.08, 500, 200, .03, 'lowpass'); },
    tick() { this.tone(1900, .03, 'square', .012); },
    ding() { this.tone(1320, .45, 'sine', .03); this.tone(2640, .25, 'sine', .01); },
    sparkle() { [1700, 2150, 2600, 3100].forEach((f, i) => this.tone(f, .09, 'sine', .014, i * .045)); },
    boom() { this.noise(.6, 900, 80, .12, 'lowpass', .7); this.tone(90, .5, 'sine', .1, 0, 38); },
    swish() { this.noise(.22, 1400, 5200, .035); },
    blip() { this.tone(760, .05, 'sine', .012); this.tone(980, .05, 'sine', .01, .04); },
    cash() { this.tone(2300, .08, 'triangle', .022); this.tone(3000, .14, 'triangle', .022, .07); },
    count() { [0, 1, 2, 3].forEach(i => this.tone(1500 + i * 120, .03, 'square', .008, i * .07)); },
    yay() { [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, .14, 'triangle', .03, i * .06)); },
    play(n) { if (typeof this[n] === 'function' && n !== 'play' && n !== 'tone' && n !== 'noise') this[n](); },
  };
  RB.vkit.SFX = SFX;

  // ---------- Reproductor ----------
  // o: { cc, rate, music, sfx, start, onEnd(panel), onQuiz(ok), onPos(t), onState(player) }
  class VPlayer {
    constructor(host, id, o = {}) {
      const v = this.v = RB.videos[id];
      this.id = id; this.o = o; this.u = RB.units[v.u] || {};
      this.rate = o.rate || 1; this.cc = o.cc !== false; this.musicOn = o.music !== false; SFX.on = o.sfx !== false;
      this.dead = false; this.playing = false; this.ended = false; this.t = 0; this.built = {}; this.ready = false;
      host.innerHTML = this.html();
      this.root = host.firstElementChild;
      const q = s => this.root.querySelector(s);
      this.stage = q('.vp-stage'); this.scenesEl = q('.vp-scenes'); this.capEl = q('.vp-cap'); this.uiEl = q('.vp-ui');
      this.bar = q('.vp-bar'); this.fill = q('.vp-fill'); this.knob = q('.vp-knob'); this.mini = q('.vp-mini i'); this.timeEl = q('.vp-time');
      this.pet = new Pet(q('.vp-pet'));
      this.petEl = q('.vp-pet');
      this.music = new Music();
      this.G = new Anims();
      RB.curPlayer = this;
      this.wire();
      this.loading(true);
      this.init();
    }
    html() {
      const v = this.v, u = this.u;
      return `<div class="vp ui-on">
        <div class="vp-stage">
          <div class="vp-bg" aria-hidden="true"><i class="o1"></i><i class="o2"></i><i class="o3"></i><div class="grid"></div><div class="dust">${Array.from({ length: 14 }, () => '<b></b>').join('')}</div></div>
          <div class="vp-scenes"></div>
          <div class="vp-wipes" aria-hidden="true"></div>
          <div class="vp-pet">${RB.mascot()}</div>
          <div class="vp-cap${this.cc ? '' : ' off'}" aria-live="off"></div>
          <div class="vp-fx" aria-hidden="true"></div>
          <div class="vp-mini" aria-hidden="true"><i></i></div>
          <div class="vp-load"><div class="spin"></div></div>
        </div>
        <div class="vp-ui">
          <div class="vp-top"><button class="vb-ib" type="button" data-a="close" aria-label="Cerrar video">${I('x')}</button>
            <div class="vp-tt"><b>${esc(v.title)}</b><small class="vp-ch">${esc(u.name || '')}</small></div>
            <button class="vb-ib" type="button" data-a="chap" aria-label="Capítulos">${I('list')}</button></div>
          <div class="vp-mid"><button class="vb-ib big" type="button" data-a="b10" aria-label="Retroceder 10 segundos">${I('replay')}<em>10</em></button>
            <button class="vp-pp" type="button" data-a="pp" aria-label="Reproducir">${I('play')}</button>
            <button class="vb-ib big fwd" type="button" data-a="f10" aria-label="Adelantar 10 segundos">${I('replay')}<em>10</em></button></div>
          <div class="vp-bot">
            <div class="vp-bar" role="slider" tabindex="0" aria-label="Posición del video" aria-valuemin="0"><div class="vp-chs"></div><div class="vp-fill"></div><div class="vp-knob"></div><div class="vp-tip"></div></div>
            <div class="vp-row"><span class="vp-time">0:00 / 0:00</span><span class="sp"></span>
              <button class="vb-ib" type="button" data-a="cc" aria-pressed="${this.cc}" aria-label="Subtítulos">${I('cc')}</button>
              <button class="vb-ib txt" type="button" data-a="rate" aria-label="Velocidad">${String(this.rate).replace('.', ',')}×</button>
              <button class="vb-ib" type="button" data-a="mus" aria-pressed="${this.musicOn}" aria-label="Música de fondo">${I('music')}</button></div>
          </div>
        </div>
        <div class="vp-panel" hidden></div>
        <div class="vp-end" hidden></div>
      </div>`;
    }
    async init() {
      const data = await RB.loadTimes(this.id);
      if (this.dead) return;
      this.toon = this.v.kind === 'toon';
      this.tl = d => this.toon ? RB.toonKit.timeline(this.v, d) : timeline(this.v, d);
      this.T = this.tl(data);
      this.mode = 'clock';
      if (data) {
        const src = await srcFor(`audio/${this.id}.webm`);
        if (this.dead) { if (src.startsWith('blob:')) URL.revokeObjectURL(src); return; }
        if (src.startsWith('blob:')) this.blobUrl = src;
        const au = this.au = new Audio();
        au.preload = 'auto';
        au.src = src;
        au.playbackRate = this.rate;
        const ok = await new Promise(res => {
          const done = r => { au.oncanplay = au.onerror = null; res(r); };
          au.oncanplay = () => done(true); au.onerror = () => done(false);
          try { au.load(); } catch (e) { done(false); }
          setTimeout(() => done(au.readyState >= 2), 7000);
        });
        if (this.dead) return;
        if (ok) {
          this.mode = 'audio';
          au.onended = () => { if (!this.waitQuiz) this.finish(); };
          au.onpause = () => { if (this.playing && !this.waitQuiz && !this.seeking && !this.ended) this.pause(); };
        } else { this.T = this.tl(null); this.au = null; }
      }
      this.voiceTTS = this.mode === 'clock' && RB.canSpeak;
      this.buildGlobal();
      this.ready = true;
      this.loading(false);
      const st = this.o.start && this.o.start > 5 && this.o.start < this.T.d - 8 ? this.o.start : 0;
      this.seek(st, true);
      this.uiShow(true);
      if (this.o.onReady) this.o.onReady(this, st);
      this.loop();
    }
    loading(on) { const l = this.root.querySelector('.vp-load'); if (l) l.hidden = !on; }
    // Elementos que viven todo el video: fondo, cortinas entre escenas y marcas de capítulos.
    buildGlobal() {
      const T = this.T, G = this.G;
      this.stage.querySelectorAll('.vp-bg i').forEach((o, i) => G.add(o, [{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${[60, -70, 40][i]}px, ${[80, -50, -60][i]}px) scale(${[1.25, 1.15, 1.3][i]})` }], 0, [13, 17, 11][i], 'ease-in-out', { iterations: Infinity, direction: 'alternate' }));
      G.add(this.stage.querySelector('.vp-bg .grid'), [{ backgroundPosition: '0px 0px' }, { backgroundPosition: '0px 280px' }], 0, 40, 'linear', { iterations: Infinity });
      // Polvo de luz que sube lento: el fondo nunca está quieto mientras corre el video.
      const r = rng(hashN(this.id));
      this.stage.querySelectorAll('.vp-bg .dust b').forEach(d => {
        const x = Math.round(r() * 100), s = 2 + Math.round(r() * 4), dur = 9 + r() * 14;
        d.style.left = x + '%'; d.style.width = d.style.height = s + 'px';
        G.add(d, [{ transform: 'translateY(105vh)', opacity: 0 }, { opacity: .7, offset: .15 }, { opacity: .7, offset: .8 }, { transform: 'translateY(-10vh)', opacity: 0 }], -r() * dur, dur, 'linear', { iterations: Infinity });
      });
      const wipes = this.stage.querySelector('.vp-wipes');
      if (this.toon) {
        // Los planos en dibujos traen sus propias transiciones; la barra marca los capítulos.
        this.root.classList.add('toon');
        this.root.querySelector('.vp-chs').innerHTML = T.chs.map((c, i) => { const e = i + 1 < T.chs.length ? T.chs[i + 1].t0 : T.d; return `<i style="left:${(100 * c.t0 / T.d).toFixed(2)}%;width:${(100 * (e - c.t0) / T.d).toFixed(2)}%"></i>`; }).join('');
        this.bar.setAttribute('aria-valuemax', Math.round(T.d));
        return;
      }
      wipes.innerHTML = T.sc.slice(1).map(() => '<i></i>').join('');
      // Cortinas entre escenas: alternan el sentido para que no se sienta repetitivo.
      [...wipes.children].forEach((w, i) => {
        const r = i % 2 ? -1 : 1, sk = i % 3 === 2 ? 0 : -16 * r;
        G.add(w, [{ transform: `translateX(${-190 * r}%) skewX(${sk}deg)` }, { transform: `translateX(${190 * r}%) skewX(${sk}deg)` }], T.sc[i + 1].t0 - .5, .85, EASE.inout);
      });
      this.root.querySelector('.vp-chs').innerHTML = T.sc.map(s => `<i style="left:${(100 * s.t0 / T.d).toFixed(2)}%;width:${(100 * (s.t1 - s.t0) / T.d).toFixed(2)}%"></i>`).join('');
      this.bar.setAttribute('aria-valuemax', Math.round(T.d));
    }
    // ----- Escenas -----
    buildScene(si) {
      if (this.built[si]) return this.built[si];
      if (this.toon) return (this.built[si] = RB.toonKit.build(this, si));
      const v = this.v, sc = v.sc[si], S = this.T.sc[si], n = v.sc.length;
      const lay = S.title ? 'L-title' : (sc.b || []).some(b => b && b.tl != null) ? 'L-tl' : '';
      const ic = sc.ic || this.u.ic || 'spark';
      const el = D.createElement('div');
      el.className = 'vs ' + lay;
      el.innerHTML = `<div class="vs-x"><div class="vs-deco"><div class="dz">${drawIcon(ic)}</div></div>${S.intro ? `<div class="vs-hero"><div class="hz"><span class="hr"></span>${drawIcon(ic)}</div></div>` : ''}
        <header class="vs-h">${S.title ? `<span class="vs-badge">${drawIcon(ic)}</span>` : `<span class="vs-n">${I(ic)}Parte ${si + 1} de ${n}</span>`}<h2>${kin(sc.h || '')}</h2>${sc.sub ? `<p>${kin(sc.sub)}</p>` : ''}</header>
        <div class="vs-view"><div class="vs-cam">${(sc.b || []).map((b, i) => `<div class="vb" data-k="${i + 1}"><div class="vb-in">${blockHTML(b, hashN(this.id + si + ':' + i))}</div></div>`).join('')}</div></div></div>`;
      this.scenesEl.appendChild(el);
      const A = new Anims(), t0 = S.t0, x = el.firstElementChild;
      A.add(el, [{ opacity: 0, transform: 'translateY(18px) scale(1.02)' }, SHOWN], si ? t0 : .05, .55, EASE.out);
      if (si + 1 < n) A.add(x, [SHOWN, { opacity: 0, transform: 'translateY(-24px) scale(.98)' }], S.t1 - .42, .4, EASE.in, { fill: 'forwards' });
      const deco = x.querySelector('.vs-deco');
      A.add(deco.firstElementChild, [{ opacity: 0, transform: 'scale(.8) rotate(-8deg)' }, { opacity: 1, transform: 'none' }], t0 + .1, 1.2, EASE.out);
      DRAW(deco.querySelector('svg'), A, t0 + .15, 1.5);
      idle(deco.querySelector('svg'), ic, A, t0 + 1.4);
      const hero = x.querySelector('.vs-hero');
      if (hero) {
        const hz = hero.firstElementChild;
        A.add(hz, [{ opacity: 0, transform: 'scale(.5) rotate(-12deg)' }, SHOWN], t0 + .3, .7, EASE.back);
        DRAW(hz.querySelector('svg'), A, t0 + .4, 1.4);
        idle(hz.querySelector('svg'), ic, A, t0 + 1.8);
        A.add(hz.querySelector('.hr'), [{ transform: 'scale(.6)', opacity: .9 }, { transform: 'scale(1.5)', opacity: 0 }], t0 + .9, 1.8, 'ease-out', { iterations: Infinity, fill: 'forwards' });
        A.add(hero, [SHOWN, { opacity: 0, transform: 'translate(34%, 46%) scale(.25)' }], S.intro - .1, .55, EASE.in, { fill: 'forwards' });
      }
      const h = x.querySelector('.vs-h');
      const chip = h.querySelector('.vs-n, .vs-badge');
      A.add(chip, [{ opacity: 0, transform: S.title ? 'scale(.2) rotate(-25deg)' : 'translateY(-12px)' }, SHOWN], t0 + .12, S.title ? .7 : .4, S.title ? EASE.back : EASE.out);
      if (S.title) { DRAW(chip.querySelector('svg'), A, t0 + .35, 1); A.add(chip, [{ boxShadow: '0 0 0 0 rgba(198,255,0,.45)' }, { boxShadow: '0 0 0 22px rgba(198,255,0,0)' }], t0 + .9, 1.6, 'ease-out', { iterations: Infinity, fill: 'forwards' }); }
      h.querySelectorAll('h2 .w').forEach((w, j) => A.add(w, [{ opacity: 0, transform: 'translateY(65%) rotate(3deg)' }, SHOWN], t0 + .2 + j * .07, .5, EASE.back));
      kinWords(h.querySelector('p'), A, t0 + .55, .05);
      const blocks = [...x.querySelectorAll('.vb')];
      blocks.forEach((w, i) => animateBlock(w, sc.b[i], A, S, S.blockT[i], i + 1 < blocks.length ? S.blockT[i + 1] : S.t1, S.title));
      this.T.quiz.filter(q => q.si === si).forEach(q => { q.el = blocks[q.k - 1]; animateQuizOpts(q.el, A, q); this.wireQuiz(q); });
      const rec = { el, A, si, cam: x.querySelector('.vs-cam'), view: x.querySelector('.vs-view'), blocks };
      this.camera(rec, S);
      this.built[si] = rec;
      return rec;
    }
    // Cámara: mantiene centrado lo que ya apareció y, si no cabe, sigue al bloque nuevo.
    camera(rec, S) {
      const vh = rec.view.clientHeight, bl = rec.blocks;
      if (!vh || !bl.length || rec.el.classList.contains('L-title')) return;
      const max = Math.max(0, rec.cam.scrollHeight - vh), top0 = bl[0].offsetTop;
      const ys = bl.map(w => {
        const bot = w.offsetTop + w.offsetHeight;
        let y = bot - top0 <= vh - 24 ? (top0 + bot) / 2 - vh / 2 : bot - vh + 18;
        if (w.offsetHeight > vh - 20) y = w.offsetTop - 8;
        return Math.min(y, max);
      });
      const span = Math.max(.5, S.t1 - S.t0), kf = [{ transform: `translateY(${(-ys[0]).toFixed(1)}px)`, offset: 0 }];
      let last = ys[0], off = 0;
      bl.forEach((w, i) => {
        if (!i || Math.abs(ys[i] - last) < 1) return;
        const o0 = Math.max(clamp((S.blockT[i] - S.t0) / span, 0, 1), off + .0005);
        const o1 = Math.min(1, Math.max(clamp((S.blockT[i] + .75 - S.t0) / span, 0, 1), o0 + .001));
        if (o0 >= 1) return;
        kf.push({ transform: `translateY(${(-last).toFixed(1)}px)`, offset: o0, easing: EASE.inout });
        kf.push({ transform: `translateY(${(-ys[i]).toFixed(1)}px)`, offset: o1 });
        last = ys[i]; off = o1;
      });
      if (off < 1) kf.push({ transform: `translateY(${(-last).toFixed(1)}px)`, offset: 1 });
      rec.A.add(rec.cam, kf, S.t0, span, 'linear');
    }
    sceneAt(t) { const S = this.T.sc; let i = 0; while (i + 1 < S.length && S[i + 1].t0 <= t) i++; return i; }
    sync(t) {
      const si = this.sceneAt(t), S = this.T.sc[si];
      const want = new Set([si]);
      if (si + 1 < this.T.sc.length && t > this.T.sc[si + 1].t0 - .6) want.add(si + 1);
      if (si > 0 && t < S.t0 + (this.toon ? .5 : .1)) want.add(si - 1);
      Object.keys(this.built).forEach(k => { if (!want.has(+k)) { const r = this.built[k]; r.A.kill(); r.el.remove(); delete this.built[k]; } });
      want.forEach(k => this.buildScene(k).A.set(t));
      this.G.set(t);
      if (si !== this.si) {
        this.si = si;
        const chs = this.T.chs, ci = chs ? chs.filter(c => c.si <= si).length : 0;
        this.root.querySelector('.vp-ch').textContent = chs ? `${ci}/${chs.length} · ${plain(this.v.sc[si].h || '')}` : `${si + 1}/${this.T.sc.length} · ${plain(this.v.sc[si].h || '')}`;
      }
    }
    // ----- Cuadro a cuadro -----
    loop() {
      if (this.dead) return;
      const now = performance.now();
      if (this.mode === 'clock' && this.playing && !this.waitQuiz) {
        const dt = Math.min(.1, (now - (this.lastNow || now)) / 1000) * this.rate;
        let nt = this.t + dt;
        if (this.hold != null && nt > this.hold) nt = this.hold;
        this.clockT = nt;
      }
      this.lastNow = now;
      const t = this.mode === 'audio' ? this.au.currentTime : (this.clockT || 0);
      if (this.playing || this.dirty) this.frame(t);
      this.dirty = false;
      this.raf = requestAnimationFrame(() => this.loop());
    }
    frame(t) {
      const prev = this.t;
      this.t = t;
      const T = this.T;
      if (this.playing && !this.waitQuiz) {
        const q = T.quiz.find(q => !q.answered && prev < q.tq && t >= q.tq && t - prev < 1.5);
        if (q) return this.askQuiz(q);
        // Efectos al cruzar marcas mientras se reproduce.
        if (t - prev < .5) {
          if (this.toon) {
            Object.values(this.built).forEach(r => (r.fx || []).forEach(([ft, n]) => { if (prev < ft && t >= ft) SFX.play(n); }));
            T.tq.forEach(q => { if (prev < q.te && t >= q.te) this.toonReveal(q); });
          } else {
            T.sc.forEach((s, i) => { if (i && prev < s.t0 && t >= s.t0) SFX.whoosh(); });
            const S = T.sc[this.sceneAt(t)];
            S.blockT.forEach(bt => { if (prev < bt && t >= bt) SFX.pop(); });
          }
          if (this.mode === 'clock') this.clockCues(prev, t);
        }
        if (t >= T.d - .05) return this.finish();
      }
      this.sync(t);
      // Mascota
      const si = this.sceneAt(t), S = T.sc[si];
      const lv = T.env ? +(T.env[Math.floor(t * 25)] || 0) : (this.speaking ? 4 + 3 * Math.abs(Math.sin(t * 13)) : 0);
      const speaking = this.playing && !this.waitQuiz && lv > 0;
      const recent = S.blockT.filter(bt => bt <= t && t - bt < 1.6).pop();
      const point = recent != null ? Math.sin(Math.PI * clamp((t - recent) / 1.6, 0, 1)) : 0;
      this.pet.frame(t, this.playing ? lv / 9 : 0, point, point > .1 ? [2, -2] : null);
      if (this.toon) {
        // Lima aparece y desaparece en su lugar (no se desliza por la pantalla mientras se esconde).
        const p = RB.toonKit.petAt(this, S, t);
        if (p.show) this.petEl.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) scale(${p.s.toFixed(3)})`;
        this.petEl.classList.toggle('off', !p.show);
      } else this.petPlace(S, t);
      this.music.level(speaking);
      this.captions(t);
      this.ui();
    }
    // Lima: al centro en las portadas y presentando las intros; en la esquina mientras aparece el contenido.
    petPlace(S, t) {
      const W = this.stage.clientWidth, H = this.stage.clientHeight;
      const C = { x: W / 2 - 66, y: H - 330, s: 1.32 }, K = { x: 6, y: H - 188, s: .82 };
      const starts = s => s.title || s.intro != null ? C : K, ends = s => s.title ? C : K;
      let from, to, p, center;
      if (S.intro != null && t >= S.intro) { from = C; to = K; p = ease(clamp((t - S.intro) / .6, 0, 1)); center = p < .5; }
      else { from = S.si ? ends(this.T.sc[S.si - 1]) : starts(S); to = starts(S); p = ease(clamp((t - S.t0) / .7, 0, 1)); center = to === C && p > .5; }
      const x = lerp(from.x, to.x, p), y = lerp(from.y, to.y, p), s = lerp(from.s, to.s, p);
      this.petEl.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${s.toFixed(3)})`;
      this.stage.classList.toggle('pet-c', center);
      const cap = center ? 1 : 0;
      if (this.capMode !== cap) { this.capMode = cap; this.capEl.classList.toggle('wide', !!cap); }
    }
    // Subtítulos al estilo de los videos cortos: frases de pocas palabras y la palabra dicha en lima.
    captions(t) {
      if (!this.cc) return;
      if (this.waitQuiz) { if (this.capKey !== 'hint') { this.capKey = 'hint'; this.capEl.innerHTML = '<span class="cl hint">Elige una alternativa</span>'; } return; }
      const L = this.T.lines;
      let lo = 0, hi = L.length - 1, idx = -1;
      while (lo <= hi) { const m = (lo + hi) >> 1; if (L[m].t0 <= t) { idx = m; lo = m + 1; } else hi = m - 1; }
      const l = idx >= 0 ? L[idx] : null;
      if (!l || t > l.t1 + .45 || (this.waitQuiz && l.cue.kind !== 'q')) { if (this.capKey !== '') { this.capKey = ''; this.capEl.innerHTML = ''; } return; }
      const ws = (l.text || '').split(/\s+/).filter(Boolean);
      const wt = l.w && l.w.length === ws.length ? l.w : ws.map((_, j) => l.t0 + (l.t1 - l.t0) * j / ws.length);
      if (!l.chunks) {
        l.chunks = [];
        let cur = [];
        ws.forEach((w, j) => { cur.push(j); const br = /[,;:.!?]$/.test(w) && cur.length >= 3; if (cur.length >= 8 || br) { l.chunks.push(cur); cur = []; } });
        if (cur.length) { if (cur.length < 3 && l.chunks.length) l.chunks[l.chunks.length - 1].push(...cur); else l.chunks.push(cur); }
      }
      let wi = 0; while (wi + 1 < ws.length && wt[wi + 1] <= t) wi++;
      const ci = Math.max(0, l.chunks.findIndex(c => c.includes(wi)));
      const ck = idx + ':' + ci;
      if (this.capKey !== ck) {
        this.capKey = ck;
        this.capEl.innerHTML = `<span class="cl">${l.chunks[ci].map(j => `<span class="cw" data-j="${j}">${esc(ws[j])}</span>`).join(' ')}</span>`;
        this.capW = [...this.capEl.querySelectorAll('.cw')];
        this.capWi = -1;
      }
      if (this.capWi !== wi) { this.capWi = wi; this.capW.forEach(s => { const j = +s.dataset.j; s.className = 'cw' + (j < wi ? ' said' : j === wi ? ' now' : ''); }); }
    }
    ui() {
      const T = this.T, t = this.t, p = clamp(t / T.d, 0, 1);
      this.fill.style.transform = `scaleX(${p.toFixed(4)})`;
      this.knob.style.left = (p * 100).toFixed(2) + '%';
      this.mini.style.transform = `scaleX(${p.toFixed(4)})`;
      const txt = `${fmt(t)} / ${fmt(T.d)}`;
      if (txt !== this.lastTxt) { this.lastTxt = txt; this.timeEl.textContent = txt; this.bar.setAttribute('aria-valuenow', Math.round(t)); this.bar.setAttribute('aria-valuetext', txt); }
      const pp = this.root.querySelector('.vp-pp'), st = this.ended ? 'replay' : this.playing ? 'pause' : 'play';
      if (pp.dataset.s !== st) { pp.dataset.s = st; pp.innerHTML = I(st); pp.setAttribute('aria-label', st === 'pause' ? 'Pausar' : st === 'replay' ? 'Ver de nuevo' : 'Reproducir'); }
      this.root.classList.toggle('paused', !this.playing);
      if (this.o.onState) this.o.onState(this);
    }
    // ----- Reloj propio (sin audio grabado): la voz del teléfono lee cada parte -----
    clockCues(prev, t) {
      this.T.cues.forEach(c => {
        if (prev < c.t0 && t >= c.t0) {
          this.hold = c.t1;
          if (this.voiceTTS) {
            this.speaking = true;
            const tok = this.speakTok = {};
            TTS.speak(plain(c.text || c.lines.map(l => l.text).join(' ')), () => { if (tok === this.speakTok) { this.speaking = false; this.hold = null; } }, this.rate);
          } else setTimeout(() => { if (this.hold === c.t1) this.hold = null; }, 50);
        }
      });
    }
    // ----- Controles -----
    play() {
      if (!this.ready || this.dead) return;
      if (this.ended) return this.restart();
      if (this.waitQuiz) return;
      this.playing = true;
      this.lastNow = performance.now();
      if (this.mode === 'audio') { const p = this.au.play(); if (p && p.catch) p.catch(() => { this.playing = false; this.dirty = true; }); }
      else { this.hold = null; const c = this.T.cues.find(c => c.t0 <= this.t && this.t < c.t1); if (c) { this.clockT = c.t0; this.t = c.t0 - .001; } }
      if (this.musicOn) this.music.start();
      this.awake(true);
      this.uiShow(false, 2600);
      this.dirty = true;
    }
    pause() {
      this.playing = false;
      if (this.au && !this.au.paused) { this.seeking = true; this.au.pause(); this.seeking = false; }
      if (this.mode === 'clock') { this.speakTok = null; this.speaking = false; TTS.stop(); }
      this.music.stop();
      this.awake(false);
      this.uiShow(true);
      this.dirty = true;
      if (this.o.onPos) this.o.onPos(this.t);
    }
    toggle() { if (this.playing) this.pause(); else this.play(); }
    seek(t, quiet) {
      if (!this.T) return;
      t = clamp(t, 0, this.T.d - .1);
      this.ended = false;
      this.root.querySelector('.vp-end').hidden = true;
      if (this.waitQuiz) this.unwait();
      if (this.mode === 'audio') { this.seeking = true; this.au.currentTime = t; this.seeking = false; }
      else { this.clockT = t; this.hold = null; this.speakTok = null; this.speaking = false; TTS.stop(); }
      if (this.T.tq) this.T.tq.forEach(q => { if (t < q.te) q.revealed = false; });
      this.t = t;
      this.sync(t);
      this.frame(t);
      if (!quiet) this.flash();
      if (this.mode === 'clock' && this.playing) { const c = this.T.cues.find(c => c.t0 <= t && t < c.t1); if (c) { this.clockT = c.t0; this.t = c.t0 - .001; } }
    }
    skip(d) { this.seek(this.t + d); this.fx(d > 0 ? '+10 s' : '−10 s', d > 0 ? 'r' : 'l'); }
    // Preguntas de los videos en dibujos: se responden durante la cuenta regresiva, sin pausar el video.
    toonAnswer(q, choice) { if (q.answered != null || this.t >= q.te || this.t < q.t0 - .5) return false; q.answered = choice; return true; }
    toonReveal(q) {
      if (q.revealed) return;
      q.revealed = true;
      const r = this.built[q.si];
      if (r && r.quizUI) r.quizUI(q);
      if (q.answered == null) return;
      const ok = q.answered === q.a;
      if (ok) SFX.ok(); else SFX.bad();
      this.pet.react(ok ? 'happy' : 'sad');
      setTimeout(() => { if (!this.dead) this.pet.react(null); }, 1600);
      if (this.o.onQuiz) this.o.onQuiz(ok);
    }
    restart() { this.seek(0, true); this.play(); }
    setRate(r) { this.rate = r; if (this.au) this.au.playbackRate = r; const b = this.root.querySelector('[data-a="rate"]'); if (b) b.textContent = String(r).replace('.', ',') + '×'; if (this.o.onRate) this.o.onRate(r); }
    awake(on) { on = !!on && !this.dead; if (this._aw === on) return; this._aw = on; try { if (NAT() && NAT().keepAwake) NAT().keepAwake(on); } catch (e) { /* app antigua */ } }
    uiShow(on, after) {
      clearTimeout(this.uiT);
      this.root.classList.toggle('ui-on', on || !this.playing);
      if (!on && after) { this.root.classList.add('ui-on'); this.uiT = setTimeout(() => { if (this.playing && !this.dragging && !this.panelOpen) this.root.classList.remove('ui-on'); }, after); }
    }
    flash() { this.dirty = true; }
    fx(text, side) {
      const f = this.root.querySelector('.vp-fx');
      f.innerHTML = `<span class="${side}">${text}</span>`;
      f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
    }
    wire() {
      const R = this.root;
      R.addEventListener('click', e => {
        const b = e.target.closest('[data-a]');
        if (!b) return;
        e.stopPropagation();
        const a = b.dataset.a;
        if (a === 'pp') this.toggle();
        else if (a === 'b10') this.skip(-10);
        else if (a === 'f10') this.skip(10);
        else if (a === 'close') { if (this.o.onClose) this.o.onClose(); }
        else if (a === 'chap') this.chapters();
        else if (a === 'cc') { this.cc = !this.cc; b.setAttribute('aria-pressed', this.cc); this.capEl.classList.toggle('off', !this.cc); this.capKey = null; if (this.o.onCc) this.o.onCc(this.cc); }
        else if (a === 'rate') { const RT = [1, 1.25, 1.5, 2, .75]; this.setRate(RT[(RT.indexOf(this.rate) + 1) % RT.length] || 1); }
        else if (a === 'mus') { this.musicOn = !this.musicOn; b.setAttribute('aria-pressed', this.musicOn); if (this.musicOn && this.playing) this.music.start(); else this.music.stop(); if (this.o.onMusic) this.o.onMusic(this.musicOn); }
        if (this.playing) this.uiShow(false, 2600);
      });
      // Toque: muestra u oculta los controles. Doble toque a un lado: ±10 s.
      let lastTap = 0, tapT = null;
      this.stage.addEventListener('click', e => {
        if (e.target.closest('button, .vp-cap')) return;
        const now = Date.now(), x = e.clientX - this.stage.getBoundingClientRect().left, W = this.stage.clientWidth;
        if (now - lastTap < 300 && (x < W * .38 || x > W * .62)) { clearTimeout(tapT); lastTap = 0; this.skip(x < W / 2 ? -10 : 10); return; }
        lastTap = now;
        clearTimeout(tapT);
        tapT = setTimeout(() => { const on = !R.classList.contains('ui-on'); this.uiShow(on, on && this.playing ? 2600 : 0); }, 260);
      });
      this.uiEl.addEventListener('click', e => { if (e.target === this.uiEl || e.target.classList.contains('vp-mid')) { if (this.playing) this.uiShow(false); } });
      // Barra de tiempo arrastrable con el nombre del capítulo.
      const tip = R.querySelector('.vp-tip');
      const posT = e => { const r = this.bar.getBoundingClientRect(); return clamp((e.clientX - r.left) / r.width, 0, 1) * this.T.d; };
      const showTip = t => { const si = this.sceneAt(t); tip.textContent = `${fmt(t)} · ${plain(this.v.sc[si].h || '')}`; tip.style.left = clamp(100 * t / this.T.d, 12, 88) + '%'; tip.classList.add('on'); };
      this.bar.addEventListener('pointerdown', e => {
        if (!this.T) return;
        this.dragging = true; this.wasPlaying = this.playing;
        if (this.playing) { this.playing = false; if (this.au) { this.seeking = true; this.au.pause(); this.seeking = false; } this.music.stop(); }
        try { this.bar.setPointerCapture(e.pointerId); } catch (er) { /* nada */ }
        const t = posT(e); this.seek(t, true); showTip(t);
      });
      this.bar.addEventListener('pointermove', e => { if (!this.dragging) return; const t = posT(e); this.seek(t, true); showTip(t); });
      const up = () => { if (!this.dragging) return; this.dragging = false; tip.classList.remove('on'); if (this.wasPlaying) this.play(); else this.dirty = true; if (this.o.onPos) this.o.onPos(this.t); };
      this.bar.addEventListener('pointerup', up);
      this.bar.addEventListener('pointercancel', up);
      this.bar.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { this.skip(-10); e.preventDefault(); } else if (e.key === 'ArrowRight') { this.skip(10); e.preventDefault(); } });
      this._key = e => {
        if (this.dead || e.target.tagName === 'INPUT' || this.panelOpen) return;
        if (e.key === ' ' || e.key === 'k') { this.toggle(); e.preventDefault(); }
        else if (e.key === 'j') this.skip(-10);
        else if (e.key === 'l') this.skip(10);
        else if (e.key === 'c') R.querySelector('[data-a="cc"]').click();
      };
      D.addEventListener('keydown', this._key);
      this._vis = () => { if (D.hidden && this.playing) this.pause(); };
      D.addEventListener('visibilitychange', this._vis);
      this._rs = () => { Object.keys(this.built).forEach(k => { const r = this.built[k]; r.A.kill(); r.el.remove(); delete this.built[k]; }); this.dirty = true; };
      window.addEventListener('resize', this._rs);
    }
    chapters() {
      const P = this.root.querySelector('.vp-panel'), si = this.sceneAt(this.t);
      const list = this.T.chs ? this.T.chs.map(c => ({ i: c.si, s: this.T.sc[c.si], cur: c.si <= si && !this.T.chs.some(d => d.si > c.si && d.si <= si) })) : this.T.sc.map((s, i) => ({ i, s, cur: i === si }));
      P.innerHTML = `<div class="vp-pbg" data-close></div><div class="vp-psheet"><h3>Capítulos</h3><div class="vp-chl">${list.map(({ i, s, cur }) => `<button type="button" data-si="${i}" class="${cur ? 'cur' : ''}"><span>${I(this.v.sc[i].ic || this.u.ic || 'film')}</span><b>${esc(plain(this.v.sc[i].h || ''))}</b><small>${fmt(s.t0)}</small></button>`).join('')}</div></div>`;
      P.hidden = false; this.panelOpen = true; this.uiShow(true);
      P.onclick = e => {
        const b = e.target.closest('[data-si]');
        if (b) { this.seek(this.T.sc[+b.dataset.si].t0 + .01); this.closePanel(); if (!this.playing) this.play(); return; }
        if (e.target.closest('[data-close]')) this.closePanel();
      };
    }
    closePanel() { const P = this.root.querySelector('.vp-panel'); P.hidden = true; P.innerHTML = ''; this.panelOpen = false; }
    // Atrás del teléfono: primero cierra el panel de capítulos.
    back() { if (this.panelOpen) { this.closePanel(); return true; } return false; }
    // ----- Preguntas dentro del video -----
    wireQuiz(q) {
      const box = q.el && q.el.querySelector('.b-quiz');
      if (!box) return;
      const opts = box.querySelectorAll('.qopt');
      if (q.answered) this.markQuiz(q, box, q.choice, true);
      box.querySelector('.qo').onclick = e => {
        const b = e.target.closest('.qopt');
        if (!b || q.answered || !this.waitQuiz || this.waitQuiz !== q) return;
        e.stopPropagation();
        q.answered = true; q.choice = +b.dataset.v;
        const ok = q.choice === 0;
        this.markQuiz(q, box, q.choice);
        if (ok) SFX.ok(); else SFX.bad();
        this.pet.react(ok ? 'happy' : 'sad');
        if (this.o.onQuiz) this.o.onQuiz(ok);
        this.feedback(ok).then(() => { if (this.waitQuiz === q) { this.unwait(); this.play(); } });
      };
      opts.forEach(o => { o.disabled = !(this.waitQuiz === q); });
      const sk = box.querySelector('.qskip');
      if (sk) sk.onclick = e => {
        e.stopPropagation();
        if (q.answered || this.waitQuiz !== q) return;
        q.answered = 'skip';
        this.markQuiz(q, box, null);
        this.unwait();
        this.play();
      };
    }
    markQuiz(q, box, choice, quiet) {
      box.querySelectorAll('.qopt').forEach(x => { x.disabled = true; if (x.dataset.v === '0') x.classList.add('ok'); else if (+x.dataset.v === choice) x.classList.add('bad'); });
      const f = box.querySelector('.qfb');
      if (f) f.innerHTML = choice == null ? '' : `<b class="${choice === 0 ? 'okt' : 'badt'}">${I(choice === 0 ? 'check' : 'x')}${choice === 0 ? '¡Correcto!' : 'No era esa.'}</b>`;
      box.classList.add('done');
      if (!quiet) this.dirty = true;
    }
    askQuiz(q) {
      this.waitQuiz = q;
      if (this.mode === 'audio') { this.seeking = true; this.au.pause(); this.au.currentTime = q.tq; this.seeking = false; }
      else { this.clockT = q.tq; this.hold = null; }
      this.t = q.tq;
      this.music.level(false);
      this.sync(q.tq);
      this.pet.react('think');
      this.stage.classList.add('quizzing');
      const box = q.el && q.el.querySelector('.b-quiz');
      if (box) { box.querySelectorAll('.qopt').forEach(o => { o.disabled = false; }); box.classList.add('ask'); }
      this.uiShow(false);
      this.root.classList.remove('ui-on');
      this.frame(q.tq);
    }
    unwait() {
      const q = this.waitQuiz;
      this.waitQuiz = null;
      this.stage.classList.remove('quizzing');
      if (q && q.el) { const box = q.el.querySelector('.b-quiz'); if (box) { box.classList.remove('ask'); if (!q.answered) box.querySelectorAll('.qopt').forEach(o => { o.disabled = true; }); } }
      this.pet.react(null);
      this.capKey = null;
    }
    feedback(ok) {
      return loadFeedback().then(fb => new Promise(res => {
        const list = fb && fb.fb ? fb.fb.filter(x => ok ? !/^No|^Casi|^Ups/.test(x[0]) : /^No|^Casi|^Ups/.test(x[0])) : [];
        const it = list[Math.floor(Math.random() * list.length)];
        if (!it) { if (RB.canSpeak && this.mode === 'clock' && this.voiceTTS) TTS.speak(ok ? '¡Correcto!' : 'No era esa.', () => setTimeout(res, 250)); else setTimeout(res, 900); return; }
        const a = this.fbAu || (this.fbAu = new Audio(fbSrc || 'audio/fb.webm'));
        let done = false;
        const fin = () => { if (done) return; done = true; try { a.pause(); } catch (e) { /* nada */ } setTimeout(res, 300); };
        try {
          a.currentTime = it[1];
          const p = a.play();
          if (p && p.catch) p.catch(fin);
          const chk = () => { if (done) return; if (a.currentTime >= it[2] - .02 || a.ended) fin(); else requestAnimationFrame(chk); };
          requestAnimationFrame(chk);
          setTimeout(fin, (it[2] - it[1]) * 1000 + 1500);
        } catch (e) { fin(); }
      }));
    }
    finish() {
      if (this.ended) return;
      this.ended = true; this.playing = false;
      if (this.au) { this.seeking = true; this.au.pause(); this.seeking = false; }
      this.music.stop();
      this.awake(false);
      this.pet.react('wave');
      SFX.done();
      this.uiShow(true);
      this.dirty = true;
      const end = this.root.querySelector('.vp-end');
      end.hidden = false;
      end.innerHTML = `<div class="vp-endc"><div class="conf">${Array.from({ length: 18 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div><div class="vp-endp">${RB.mascot('big')}</div><h2>¡Video terminado!</h2><div class="vp-endb"></div>
        <button class="vb-link" type="button" data-again>${I('replay')}Ver de nuevo</button></div>`;
      end.querySelector('[data-again]').onclick = () => this.restart();
      if (this.o.onEnd) this.o.onEnd(end.querySelector('.vp-endb'), end);
      if (this.o.onPos) this.o.onPos(0);
    }
    destroy() {
      if (this.dead) return;
      if (this.o.onPos && this.T) this.o.onPos(this.ended ? 0 : this.t);
      this.dead = true; this.playing = false;
      cancelAnimationFrame(this.raf);
      if (this.au) { try { this.au.pause(); this.au.removeAttribute('src'); this.au.load(); } catch (e) { /* nada */ } }
      if (this.blobUrl) URL.revokeObjectURL(this.blobUrl);
      if (this.fbAu) { try { this.fbAu.pause(); } catch (e) { /* nada */ } }
      this.music.stop();
      TTS.stop();
      Object.values(this.built).forEach(r => r.A.kill());
      this.G.kill();
      this.awake(false);
      D.removeEventListener('keydown', this._key);
      D.removeEventListener('visibilitychange', this._vis);
      window.removeEventListener('resize', this._rs);
      if (RB.curPlayer === this) RB.curPlayer = null;
    }
  }
  RB.VPlayer = VPlayer;
  RB.Pet = Pet;

  // Miniatura del video: el ícono de la unidad dibujado sobre el fondo del video.
  RB.vthumb = id => {
    const v = RB.videos[id], u = RB.units[v.u] || {};
    return `<span class="vth">${I(u.ic || 'film')}<b>${esc(v.title)}</b></span>`;
  };
})();
