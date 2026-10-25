// Videos de introducción: cada tema es un guion de escenas animadas que avanzan al ritmo del narrador.
// Una escena tiene un título (h), bloques (b) y la narración de cada paso (s): s[0] se lee con el título
// y s[i] aparece junto con el bloque b[i-1]. Pesan poco, funcionan sin conexión y se pueden pausar.
(function () {
  const RB = window.RB = window.RB || {};
  const D = document;
  RB.videos = RB.videos || {};
  RB.video = (id, v) => { v.id = id; RB.videos[id] = v; };
  const NAT = () => window.PaesNative;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // **negrita** y ==resaltado== dentro de los textos que se ven en pantalla.
  const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/==(.+?)==/g, '<mark>$1</mark>');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const words = t => (String(t).match(/\S+/g) || []).length;
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
  const estSecs = (t, rate = 1) => Math.max(1.2, words(t) / (2.55 * rate)) + .25;

  // ---------- Voz ----------
  // En la app Android habla el motor del sistema (PaesNative); en el navegador, la Web Speech API.
  const TTS = RB.tts = { voice: null, list: [], pref: null, rate: 1, seq: 0, cbs: {}, live: [] };
  TTS.webOk = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  RB.canSpeak = TTS.webOk || !!NAT();
  // Orden de preferencia: Catalina (Windows, Chile), voces neuronales "Natural/Online" y luego cualquier español.
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
  // El motor nativo avisa aquí cuando termina de decir una frase.
  RB.ttsDone = id => { const cb = TTS.cbs[id]; delete TTS.cbs[id]; if (cb) cb(); };
  TTS.speak = (text, onEnd) => {
    const id = 'u' + (++TTS.seq);
    let done = false;
    const fin = () => { if (done) return; done = true; clearTimeout(guard); delete TTS.cbs[id]; if (onEnd) onEnd(); };
    // Respaldo por si el motor nunca avisa que terminó.
    const guard = setTimeout(fin, estSecs(text, TTS.rate) * 1900 + 2500);
    TTS.cbs[id] = fin;
    try {
      if (NAT()) {
        // Si la voz del teléfono aún no está lista, el video sigue con su reloj.
        if (NAT().speak(text, id, TTS.rate) === false) { clearTimeout(guard); setTimeout(fin, estSecs(text, TTS.rate) * 1000); }
        return id;
      }
      if (!TTS.webOk) { clearTimeout(guard); setTimeout(fin, estSecs(text, TTS.rate) * 1000); return id; }
      const u = new SpeechSynthesisUtterance(text);
      u.lang = TTS.voice ? TTS.voice.lang : 'es-CL';
      if (TTS.voice) u.voice = TTS.voice;
      u.rate = TTS.rate;
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
  // Lectura suelta (botón de parlante en las preguntas).
  RB.say = txt => { if (!RB.canSpeak || !txt) return; TTS.stop(); const parts = sentences(txt); const step = () => { const p = parts.shift(); if (p) TTS.speak(p, step); }; step(); };
  RB.hush = () => TTS.stop();

  // ---------- Duración estimada ----------
  RB.videoSecs = (id, rate = 1) => {
    const v = RB.videos[id];
    if (!v) return 0;
    let s = 0;
    v.sc.forEach(sc => {
      (sc.s || []).forEach(t => { sentences(t).forEach(p => { s += estSecs(p, rate); }); });
      (sc.b || []).forEach(b => { if (b && b.q) s += 8 + estSecs(b.q, rate) + (b.e ? estSecs(b.e, rate) : 0); });
      s += .6;
    });
    return Math.round(s);
  };

  // ---------- Bloques ----------
  const I = (n, c) => RB.icon(n, c);
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
    let s = `<svg class="plot" viewBox="0 0 ${W} ${H}" aria-hidden="true">`;
    for (let gx = Math.ceil(x0); gx <= x1; gx++) s += `<line x1="${X(gx)}" x2="${X(gx)}" y1="10" y2="${H - 10}" class="pg"/>`;
    if (y0 < 0 && y1 > 0) s += `<line x1="8" x2="${W - 8}" y1="${Y(0)}" y2="${Y(0)}" class="pa"/>`;
    if (x0 < 0 && x1 > 0) s += `<line x1="${X(0)}" x2="${X(0)}" y1="8" y2="${H - 8}" class="pa"/>`;
    fs.forEach((f, i) => {
      let d = '', pen = false;
      for (let k = 0; k <= 160; k++) {
        const x = x0 + (x1 - x0) * k / 160, y = f(x);
        if (!isFinite(y) || y < y0 - (y1 - y0) || y > y1 + (y1 - y0)) { pen = false; continue; }
        d += `${pen ? 'L' : 'M'}${X(x).toFixed(1)} ${Y(Math.max(y0 - 1, Math.min(y1 + 1, y))).toFixed(1)}`; pen = true;
      }
      s += `<path d="${d}" class="pf${i ? ' p2' : ''}" pathLength="1"/>`;
    });
    // Etiquetas legibles: con borde oscuro, hacia adentro del gráfico y sobre el punto si hay espacio.
    (p.pts || []).forEach(([x, y, l]) => {
      const px = X(x), py = Y(y), right = px > W * .62, up = py > 30;
      s += `<circle cx="${px}" cy="${py}" r="4.5" class="pp"/>` + (l ? `<text x="${right ? px - 8 : px + 8}" y="${up ? py - 9 : py + 18}" class="pt" text-anchor="${right ? 'end' : 'start'}">${esc(l)}</text>` : '');
    });
    if (p.lx) s += `<text x="${W - 12}" y="${Y(0) - 6 > 14 ? Y(0) - 6 : H - 18}" class="pt" text-anchor="end">${esc(p.lx)}</text>`;
    return s + `</svg>`;
  }
  function block(b, i) {
    if (typeof b === 'string') return `<div class="vb-pt" style="--i:${i}"><i></i><span>${rich(b)}</span></div>`;
    if (b.eq != null) return `<div class="vb-eq${Math.max(...String(b.eq).split('\n').map(l => l.length)) > 26 ? ' sm' : ''}">${rich(b.eq)}${b.n ? `<small>${rich(b.n)}</small>` : ''}</div>`;
    if (b.ex != null) return `<div class="vb-ex"><small>${esc(b.k || 'Ejemplo')}</small><p>${rich(b.ex)}</p></div>`;
    if (b.sol != null) return `<div class="vb-sol"><small>${esc(b.k || 'Solución')}</small><p>${rich(b.sol)}</p></div>`;
    if (b.big != null) return `<div class="vb-big"><b>${rich(b.big)}</b>${b.sub ? `<span>${rich(b.sub)}</span>` : ''}</div>`;
    if (b.tl != null) return `<div class="vb-tl"><b>${esc(b.tl)}</b><span>${rich(b.t || '')}</span></div>`;
    if (b.two) return `<div class="vb-two">${b.two.map(col => `<div><b>${rich(col[0])}</b>${col.slice(1).map(x => `<p>${rich(x)}</p>`).join('')}</div>`).join('')}</div>`;
    if (b.warn != null) return `<div class="vb-warn">${I('flag')}<p>${rich(b.warn)}</p></div>`;
    if (b.tip != null) return `<div class="vb-tip">${I('bulb')}<p>${rich(b.tip)}</p></div>`;
    if (b.quote != null) return `<blockquote class="vb-q">${I('quote')}<p>${rich(b.quote)}</p>${b.by ? `<cite>${esc(b.by)}</cite>` : ''}</blockquote>`;
    if (b.tags) return `<div class="vb-tags">${b.tags.map((t, k) => `<span style="--k:${k}">${rich(t)}</span>`).join('')}</div>`;
    if (b.ic) return `<div class="vb-ic">${I(b.ic)}<span>${rich(b.t || '')}</span></div>`;
    if (b.plot) return `<div class="vb-plot">${plotSvg(b.plot)}${b.plot.cap ? `<small>${rich(b.plot.cap)}</small>` : ''}</div>`;
    if (b.bars) {
      const mx = Math.max(...b.bars.map(x => Math.abs(x[1])));
      return `<div class="vb-bars">${b.bars.map(([l, v], k) => `<div class="br"><span>${esc(l)}</span><i><i style="--w:${(100 * Math.abs(v) / mx).toFixed(1)}%;--k:${k}"></i></i><b>${esc(String(v).replace('.', ','))}${esc(b.u || '')}</b></div>`).join('')}</div>`;
    }
    if (b.q) return `<div class="vb-quiz"><small>${I('target')}Pregunta rápida</small><p>${rich(b.q)}</p><div class="vq-o"></div><div class="vq-f"></div></div>`;
    return '';
  }

  // Personaje narrador: una figura lima que parpadea, habla y celebra.
  const MASCOT = `<div class="vx-pet" aria-hidden="true"><svg viewBox="0 0 64 64"><rect class="pb" x="6" y="8" width="52" height="50" rx="18"/><g class="pe"><ellipse cx="24" cy="29" rx="4.2" ry="5.4"/><ellipse cx="40" cy="29" rx="4.2" ry="5.4"/></g><circle class="pg" cx="25.4" cy="27" r="1.4"/><circle class="pg" cx="41.4" cy="27" r="1.4"/><path class="pm" d="M25 41 Q32 47 39 41"/><ellipse class="po" cx="32" cy="43" rx="6" ry="4.5"/></svg></div>`;

  // ---------- Reproductor ----------
  // o: { voice, cc, rate, onEnd, onQuiz, onState }
  class VPlayer {
    constructor(host, id, o = {}) {
      const v = this.v = RB.videos[id], u = RB.units[v.u] || {};
      this.o = o; this.id = id; this.dead = false; this.playing = false; this.ended = false;
      this.voice = o.voice !== false && RB.canSpeak; this.cc = o.cc !== false; TTS.rate = o.rate || 1;
      // Pasos lineales: [escena, paso]. El primer paso de cada escena muestra solo el título.
      this.steps = [];
      v.sc.forEach((sc, si) => { for (let k = 0; k <= (sc.b || []).length; k++) this.steps.push([si, k]); });
      this.pos = 0; this.sIdx = 0;
      host.innerHTML = `<div class="vx${this.cc ? ' cc' : ''}">
        <div class="vx-stage" tabindex="-1"><div class="vx-bg" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="vx-deco" aria-hidden="true"></div>
          <div class="vx-hud"><span class="vx-u">${I(u.ic || 'film')}${esc(u.name || '')}</span><span class="vx-n"></span></div>
          <div class="vx-sc"></div>
          ${MASCOT}
          <button class="vx-big" type="button" aria-label="Reproducir">${I('play')}</button></div>
        <div class="vx-cap" aria-live="polite"></div>
        <div class="vx-tl" role="slider" aria-label="Escenas del video" tabindex="0">${v.sc.map((_, i) => `<button type="button" data-sc="${i}" aria-label="Escena ${i + 1}"><i></i></button>`).join('')}</div>
        <div class="vx-ctl">
          <button class="ib" type="button" data-a="prev" aria-label="Escena anterior">${I('prev')}</button>
          <button class="ib vx-pp" type="button" data-a="pp" aria-label="Reproducir">${I('play')}</button>
          <button class="ib" type="button" data-a="next" aria-label="Escena siguiente">${I('next')}</button>
          <span class="vx-tm"></span><span class="sp"></span>
          <button class="ib vx-rate" type="button" data-a="rate" aria-label="Velocidad">${(TTS.rate + '×').replace('.', ',')}</button>
          <button class="ib" type="button" data-a="cc" aria-pressed="${this.cc}" aria-label="Subtítulos">${I('cc')}</button>
          ${RB.canSpeak ? `<button class="ib" type="button" data-a="vo" aria-pressed="${this.voice}" aria-label="Narración por voz">${I(this.voice ? 'vol' : 'mute')}</button>` : ''}
        </div></div>`;
      this.root = host.firstElementChild;
      this.stage = this.root.querySelector('.vx-stage');
      this.scEl = this.root.querySelector('.vx-sc');
      this.cap = this.root.querySelector('.vx-cap');
      this.big = this.root.querySelector('.vx-big');
      this.pet = this.root.querySelector('.vx-pet');
      this.deco = this.root.querySelector('.vx-deco');
      this.total = RB.videoSecs(id, 1);
      this.root.addEventListener('click', e => {
        const b = e.target.closest('[data-a],[data-sc]');
        if (!b) return;
        if (b.dataset.sc != null) return this.jumpScene(+b.dataset.sc);
        const a = b.dataset.a;
        if (a === 'pp') this.toggle();
        else if (a === 'prev') this.jumpScene(this.curScene() - (this.steps[this.pos][1] === 0 ? 1 : 0));
        else if (a === 'next') this.jumpScene(this.curScene() + 1);
        else if (a === 'rate') {
          const R = [1, 1.25, 1.5, .85];
          TTS.rate = R[(R.indexOf(TTS.rate) + 1) % R.length] || 1;
          b.textContent = (TTS.rate + '×').replace('.', ',');
          if (o.onRate) o.onRate(TTS.rate);
          if (this.playing) this.restartStep();
        } else if (a === 'cc') {
          this.cc = !this.cc; b.setAttribute('aria-pressed', this.cc); this.root.classList.toggle('cc', this.cc);
          if (o.onCc) o.onCc(this.cc);
        } else if (a === 'vo') {
          this.voice = !this.voice; b.setAttribute('aria-pressed', this.voice); b.innerHTML = I(this.voice ? 'vol' : 'mute');
          if (o.onVoice) o.onVoice(this.voice);
          if (this.playing) this.restartStep();
        }
      });
      this.big.addEventListener('click', () => this.ended ? this.restart() : this.play());
      this.stage.addEventListener('click', e => { if (!e.target.closest('button') && this.playing) this.pause(); });
      this._vis = () => { if (D.hidden && this.playing) this.pause(); };
      D.addEventListener('visibilitychange', this._vis);
      this.drawScene(true);
      this.ui();
      RB.curPlayer = this;
    }
    curScene() { return this.steps[Math.min(this.pos, this.steps.length - 1)][0]; }
    // Tiempo transcurrido aproximado (según la narración ya leída).
    elapsed() {
      let s = 0;
      for (let i = 0; i < this.pos; i++) { const [si, k] = this.steps[i]; const t = (this.v.sc[si].s || [])[k]; if (t) sentences(t).forEach(p => { s += estSecs(p); }); if (k === 0) s += .6; }
      return Math.round(s);
    }
    awake(on) { on = !!on; if (this._aw === on) return; this._aw = on; try { if (NAT() && NAT().keepAwake) NAT().keepAwake(on); } catch (e) { /* app antigua */ } }
    ui() {
      this.awake(this.playing && !this.dead);
      const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
      const pp = this.root.querySelector('.vx-pp');
      pp.innerHTML = I(this.playing ? 'pause' : this.ended ? 'replay' : 'play');
      pp.setAttribute('aria-label', this.playing ? 'Pausar' : 'Reproducir');
      this.big.innerHTML = I(this.ended ? 'replay' : 'play');
      this.big.classList.toggle('hide', this.playing || this.quizOpen);
      this.root.querySelector('.vx-tm').textContent = `${fmt(this.elapsed())} / ${fmt(this.total)}`;
      const cs = this.curScene();
      this.root.querySelectorAll('.vx-tl button').forEach((b, i) => {
        b.classList.toggle('done', i < cs); b.classList.toggle('cur', i === cs);
        if (i === cs) { const n = (this.v.sc[i].b || []).length + 1, k = this.steps[this.pos][1] + (this.ended ? 1 : 0); b.style.setProperty('--p', Math.min(1, (k + (this.playing ? .5 : 0)) / n).toFixed(3)); } else b.style.removeProperty('--p');
      });
      this.root.querySelector('.vx-n').textContent = `${cs + 1} / ${this.v.sc.length}`;
      if (this.o.onState) this.o.onState(this);
    }
    // Dibuja la escena actual. Todos los bloques ocupan su lugar desde el inicio (invisibles), así nada salta
    // cuando aparece uno nuevo y la composición queda centrada como en un video.
    drawScene(fresh) {
      const [si, k] = this.steps[this.pos], sc = this.v.sc[si], first = si === 0;
      if (fresh || this.drawn !== si) {
        this.drawn = si;
        const lay = sc.k || (first ? 'title' : (sc.b || []).some(b => b && b.tl != null) ? 'tl' : '');
        const ic = sc.ic || (first ? (RB.units[this.v.u] || {}).ic || 'film' : '');
        this.scEl.className = 'vx-sc in ' + (lay ? 'L-' + lay : '');
        this.scEl.innerHTML = `<div class="vx-in"><header class="vx-h">${ic ? I(ic) : ''}<h2>${rich(sc.h || '')}</h2>${sc.sub ? `<p>${rich(sc.sub)}</p>` : ''}</header><div class="vx-bl">${(sc.b || []).map((b, i) => `<div class="vx-b" data-k="${i + 1}">${block(b, i)}</div>`).join('')}</div></div>`;
        this.scEl.scrollTop = 0;
        this.scEl.style.animation = 'none'; void this.scEl.offsetWidth; this.scEl.style.animation = '';
        this.deco.innerHTML = I(sc.ic || (RB.units[this.v.u] || {}).ic || 'spark');
        this.deco.style.animation = 'none'; void this.deco.offsetWidth; this.deco.style.animation = '';
      }
      this.scEl.querySelectorAll('.vx-b').forEach(el => {
        const n = +el.dataset.k, on = n <= k;
        if (on && !el.classList.contains('show')) { el.classList.add('show'); if (this.o.onReveal && n === k) this.o.onReveal(); }
        if (!on) el.classList.remove('show');
        el.classList.toggle('now', n === k);
      });
      const cur = this.scEl.querySelector(`.vx-b[data-k="${k}"]`);
      if (cur) {
        const r = cur.getBoundingClientRect(), br = this.scEl.getBoundingClientRect();
        if (r.bottom > br.bottom - 70) this.scEl.scrollTo({ top: this.scEl.scrollTop + r.bottom - br.bottom + 90, behavior: 'smooth' });
        else if (r.top < br.top) this.scEl.scrollTo({ top: this.scEl.scrollTop + r.top - br.top - 16, behavior: 'smooth' });
      }
    }
    // El personaje mueve la boca mientras se narra y reacciona a las preguntas.
    talk(on) { this.pet.classList.toggle('talk', !!on); }
    mood(m) { this.pet.classList.remove('happy', 'sad'); void this.pet.offsetWidth; if (m) this.pet.classList.add(m); }
    say(t) { this.cap.innerHTML = t ? `<span>${esc(t)}</span>` : ''; }
    // Lee la narración del paso actual frase por frase y luego avanza.
    runStep() {
      if (!this.playing || this.dead) return;
      const [si, k] = this.steps[this.pos], sc = this.v.sc[si], b = k ? sc.b[k - 1] : null;
      // En las preguntas rápidas, después de la narración se lee también la pregunta.
      const parts = sentences((sc.s || [])[k] || '').concat(b && b.q ? sentences(String(b.q).replace(/\*\*|==/g, '')) : []);
      const tok = this.tok = {};
      const after = () => {
        if (tok !== this.tok || !this.playing) return;
        if (b && b.q) return this.quiz(b);
        this.advance();
      };
      const nextPart = () => {
        if (tok !== this.tok || !this.playing) return;
        const p = parts[this.sIdx++];
        if (p == null) { this.sIdx = 0; return setTimeout(after, k === (sc.b || []).length ? 650 : 280); }
        this.say(p);
        this.talk(true);
        const done = () => { this.talk(false); this.timer = setTimeout(nextPart, 140); };
        if (this.voice) TTS.speak(p, done);
        else this.timer = setTimeout(done, estSecs(p, TTS.rate) * 1000);
      };
      if (!parts.length) { this.say(''); this.timer = setTimeout(after, b ? 1600 / TTS.rate : 1100); return; }
      nextPart();
    }
    advance() {
      if (this.pos >= this.steps.length - 1) return this.finish();
      this.pos++; this.sIdx = 0;
      this.drawScene(); this.ui(); this.runStep();
    }
    restartStep() { this.halt(); this.sIdx = 0; this.runStep(); }
    halt() { this.tok = null; clearTimeout(this.timer); TTS.stop(); if (this.pet) this.talk(false); }
    play() {
      if (this.dead || this.quizOpen) return;
      if (this.ended) return this.restart();
      this.playing = true; this.ui();
      this.sIdx = Math.max(0, this.sIdx - 1);
      this.runStep();
    }
    pause() { this.playing = false; this.halt(); this.ui(); }
    toggle() { if (this.playing) this.pause(); else this.play(); }
    restart() { this.halt(); this.ended = false; this.pos = 0; this.sIdx = 0; this.drawScene(true); this.playing = true; this.ui(); this.runStep(); }
    jumpScene(si) {
      si = Math.max(0, Math.min(this.v.sc.length - 1, si));
      const was = this.playing || this.ended;
      this.halt(); this.closeQuiz(); this.ended = false;
      this.pos = this.steps.findIndex(s => s[0] === si); this.sIdx = 0;
      this.drawScene(true); this.playing = was; this.ui();
      if (was) this.runStep();
    }
    finish() {
      this.playing = false; this.ended = true; this.halt(); this.say(''); this.mood('happy');
      this.ui();
      if (this.o.onEnd) this.o.onEnd();
    }
    // Pregunta dentro del video: se detiene hasta que respondes.
    quiz(b) {
      const box = this.scEl.querySelector('.vx-b.now .vb-quiz');
      if (!box || box.dataset.done) return this.advance();
      this.quizOpen = true; this.ui();
      const opts = shuffle(b.o.map((t, i) => ({ t, i })));
      const oBox = box.querySelector('.vq-o');
      oBox.innerHTML = opts.map((x, j) => `<button class="opt" type="button" data-v="${x.i}"><span class="k">${String.fromCharCode(65 + j)}</span><span class="ot">${rich(x.t)}</span></button>`).join('');
      this.say('Responde para continuar.');
      oBox.onclick = e => {
        const btn = e.target.closest('.opt');
        if (!btn || box.dataset.done) return;
        box.dataset.done = '1';
        const ok = btn.dataset.v === '0';
        oBox.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (x.dataset.v === '0') x.classList.add('ok'); else if (x === btn) x.classList.add('bad'); });
        box.querySelector('.vq-f').innerHTML = `<p class="${ok ? 'okt' : 'badt'}">${ok ? '¡Correcto!' : 'No era esa.'}</p>${b.e ? `<p>${rich(b.e)}</p>` : ''}`;
        if (this.o.onQuiz) this.o.onQuiz(ok);
        this.mood(ok ? 'happy' : 'sad');
        // Responder reanuda el video: se lee la explicación y se pasa al paso siguiente.
        this.halt();
        this.quizOpen = false; this.playing = true; this.ui();
        const tok = this.tok = {};
        const cont = () => { if (tok === this.tok && this.playing) this.advance(); };
        const fbText = ((ok ? 'Correcto. ' : 'No era esa. ') + (b.e || '')).replace(/\*\*|==/g, '');
        this.say(fbText);
        if (this.voice) { const parts = sentences(fbText); const nx = () => { if (tok !== this.tok) return; const p = parts.shift(); if (p == null) { this.talk(false); return setTimeout(cont, 600); } this.say(p); this.talk(true); TTS.speak(p, nx); }; nx(); }
        else { this.talk(true); this.timer = setTimeout(() => { this.talk(false); cont(); }, estSecs(fbText, TTS.rate) * 1000 + 600); }
      };
    }
    closeQuiz() { this.quizOpen = false; }
    destroy() { this.dead = true; this.playing = false; this.halt(); this.awake(false); D.removeEventListener('visibilitychange', this._vis); RB.curPlayer = null; }
  }
  RB.VPlayer = VPlayer;

  // Miniatura: el título de la primera escena sobre el fondo del video.
  RB.vthumb = id => {
    const v = RB.videos[id], u = RB.units[v.u] || {};
    return `<span class="vth">${I(u.ic || 'film')}<b>${esc(v.title)}</b></span>`;
  };
})();
