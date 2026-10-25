// Ruta: app para aprender a conducir al estilo de lecciones cortas. Todo el progreso vive en el navegador.
(function () {
  'use strict';
  const RB = window.RB;
  const D = document;
  const $ = (s, el = D) => el.querySelector(s);
  const $$ = (s, el = D) => Array.from(el.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const I = (n, c) => RB.icon(n, c);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const dayStr = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const today = () => dayStr(new Date());
  const addDays = (s, n) => { const d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + n); return dayStr(d); };
  const decimals = step => (String(step).split('.')[1] || '').length;
  const fmtNum = (v, step) => (+v).toFixed(decimals(step)).replace('.', ',');
  const fmtTime = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const plural = (n, a, b) => `${n} ${n === 1 ? a : b}`;

  // ---------- Estado ----------
  const KEY = 'ruta-conducir-v1';
  const DEF = () => ({
    v: 1, lic: null, goal: 20, xp: 0, days: {}, streak: 0, best: 0, last: null, hearts: 5, hAt: Date.now(),
    done: {}, stars: {}, q: {}, exams: [], ach: {}, seen: {}, lics: {}, cards: 0, revs: 0, perf: 0, goals: 0, goalDay: null,
    haz: {}, hazBest: 0, blitz: 0, set: { sound: true, vib: true, voice: false, inf: false, theme: 'dark' },
  });
  let S = DEF();
  const load = raw => { const o = JSON.parse(raw); return Object.assign(DEF(), o, { set: Object.assign(DEF().set, o.set || {}) }); };
  try { const raw = localStorage.getItem(KEY); if (raw) S = load(raw); } catch (e) { /* sin almacenamiento: se juega igual */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* modo privado */ } };

  const MAXH = 5, REGEN = 30 * 60 * 1000;
  function regen() {
    if (S.hearts >= MAXH) { S.hAt = Date.now(); return; }
    const n = Math.floor((Date.now() - S.hAt) / REGEN);
    if (n > 0) { S.hearts = Math.min(MAXH, S.hearts + n); S.hAt = S.hearts >= MAXH ? Date.now() : S.hAt + n * REGEN; save(); }
  }
  const nextHeartMin = () => Math.max(1, Math.ceil((REGEN - (Date.now() - S.hAt)) / 60000));
  function loseHeart() { if (S.set.inf) return; if (S.hearts >= MAXH) S.hAt = Date.now(); S.hearts = Math.max(0, S.hearts - 1); save(); }
  const streakNow = () => (S.last === today() || S.last === addDays(today(), -1)) ? S.streak : 0;
  function bumpStreak() {
    const t = today();
    if (S.last === t) return false;
    S.streak = (S.last === addDays(t, -1) ? S.streak : 0) + 1;
    S.last = t; S.best = Math.max(S.best, S.streak);
    return true;
  }
  function addXP(n) {
    S.xp += n;
    const t = today();
    S.days[t] = (S.days[t] || 0) + n;
    if (S.days[t] >= S.goal && S.goalDay !== t) { S.goalDay = t; S.goals++; return true; }
    return false;
  }

  // ---------- Datos ----------
  const ITEMS = {};
  const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  const LESSONS = {};
  for (const uid in RB.units) {
    RB.units[uid].lessons.forEach((l, li) => {
      l.id = uid + '.' + (li + 1); l.u = uid; LESSONS[l.id] = l;
      l.items.forEach(it => {
        it.id = 'q' + hash(it.t + '|' + (it.q || it.s || it.title || '') + '|' + (it.scene || '') + '|' + JSON.stringify(it.o || it.p || it.k || it.a || it.w || ''));
        if (!ITEMS[it.id]) { ITEMS[it.id] = it; it._u = uid; }
      });
    });
  }
  const GRADED = it => it.t !== 'clip' && it.t !== 'info';
  const EXAMT = ['mc', 'tf', 'img', 'multi', 'fill'];
  const licInfo = () => RB.licenses.find(l => l.id === S.lic) || RB.licenses.find(l => l.id === 'B');
  const course = () => RB.courses[licInfo().course];
  const cUnits = () => course().units.map(id => RB.units[id]);
  const cLessons = () => cUnits().flatMap(u => u.lessons);
  const uniq = list => { const seen = new Set(); return list.filter(it => !seen.has(it.id) && seen.add(it.id)); };
  const cItems = () => uniq(cUnits().flatMap(u => u.lessons.flatMap(l => l.items)));
  const unitItems = u => uniq(u.lessons.flatMap(l => l.items));
  const lessonState = () => { const ls = cLessons(); let cur = ls.findIndex(l => !S.done[l.id]); if (cur < 0) cur = ls.length; return { ls, cur }; };

  // Repaso espaciado: cada pregunta sube de "caja" al acertar y vuelve a 0 al fallar.
  const BOX = [0, 1, 3, 7, 16, 35];
  function record(it, ok) {
    if (!GRADED(it)) return;
    const r = S.q[it.id] || (S.q[it.id] = { b: 0, d: today(), n: 0, w: 0 });
    r.n++;
    if (ok) { r.b = Math.min(5, r.b + 1); r.d = addDays(today(), BOX[r.b]); } else { r.w++; r.b = 0; r.d = today(); }
  }
  const dueItems = () => cItems().filter(it => GRADED(it) && S.q[it.id] && S.q[it.id].d <= today())
    .sort((a, b) => (S.q[b.id].w - S.q[a.id].w) || S.q[a.id].d.localeCompare(S.q[b.id].d));
  function accOf(list) {
    let n = 0, w = 0;
    list.forEach(it => { const r = S.q[it.id]; if (r) { n += r.n; w += r.w; } });
    return n ? Math.round(100 * (n - w) / n) : null;
  }

  // ---------- Sonido y vibración ----------
  let AC = null;
  function tone(f, d, type = 'sine', v = .07, when = 0) {
    if (!S.set.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
      const t0 = AC.currentTime + when, o = AC.createOscillator(), g = AC.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + .01); g.gain.exponentialRampToValueAtTime(.0001, t0 + d);
      o.connect(g); g.connect(AC.destination); o.start(t0); o.stop(t0 + d + .02);
    } catch (e) { /* sin audio */ }
  }
  const SFX = {
    ok() { tone(660, .12, 'sine', .08); tone(990, .18, 'sine', .08, .08); },
    bad() { tone(180, .25, 'square', .035); },
    done() { [523, 659, 784, 1047].forEach((f, i) => tone(f, .2, 'triangle', .07, i * .11)); },
    tap() { tone(1200, .03, 'sine', .02); },
  };
  const buzz = ms => {
    if (!S.set.vib) return;
    try { if (window.RutaNative) window.RutaNative.vibrate(ms); else if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* nada */ }
  };

  // ---------- Capas: el botón Atrás del teléfono cierra la capa superior ----------
  const OV = [];
  function openLayer(cls, html, onClose) {
    const el = D.createElement('section');
    el.className = 'layer ' + cls;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.innerHTML = html;
    $('#layer').appendChild(el);
    D.body.classList.add('noscroll');
    const ent = { el, onClose };
    OV.push(ent);
    history.pushState({ ov: OV.length }, '');
    return ent;
  }
  function closeLayer(after) {
    const ent = OV[OV.length - 1];
    if (!ent) { if (after) after(); return; }
    ent.guard = null; ent.after = after;
    history.back();
  }
  window.addEventListener('popstate', () => {
    const ent = OV[OV.length - 1];
    if (!ent) return;
    if (ent.guard && !ent.guard()) { history.pushState({ ov: OV.length }, ''); return; }
    OV.pop();
    if (ent.onClose) ent.onClose();
    ent.el.remove();
    if (!OV.length) D.body.classList.remove('noscroll');
    if (ent.after) setTimeout(ent.after, 0);
  });
  function sheet(html, mount) {
    const ent = openLayer('sheetw', `<div class="sheet-bg"></div><div class="sheet">${html}</div>`);
    $('.sheet-bg', ent.el).onclick = () => closeLayer();
    if (mount) mount(ent.el);
    const f = $('button, [tabindex]', $('.sheet', ent.el));
    if (f) f.focus({ preventScroll: true });
    return ent;
  }
  function toast(html, ms = 2600) {
    const t = D.createElement('div');
    t.className = 'toast';
    t.innerHTML = html;
    $('#toasts').appendChild(t);
    setTimeout(() => t.classList.add('out'), ms);
    setTimeout(() => t.remove(), ms + 400);
  }

  // ---------- Logros ----------
  const ACH = [
    { id: 'first', n: 'Primer paso', d: 'Completa tu primera lección', ic: 'check', ok: () => Object.keys(S.done).length >= 1 },
    { id: 'l10', n: 'En marcha', d: 'Completa 10 lecciones', ic: 'road', ok: () => Object.keys(S.done).length >= 10 },
    { id: 'l30', n: 'Kilometraje', d: 'Completa 30 lecciones', ic: 'speed', ok: () => Object.keys(S.done).length >= 30 },
    { id: 'perfect', n: 'Sin errores', d: 'Termina una lección sin equivocarte', ic: 'star', ok: () => S.perf >= 1 },
    { id: 's3', n: 'Constante', d: 'Logra una racha de 3 días', ic: 'flame', ok: () => S.best >= 3 },
    { id: 's7', n: 'Una semana', d: 'Logra una racha de 7 días', ic: 'flame', ok: () => S.best >= 7 },
    { id: 's30', n: 'Imparable', d: 'Logra una racha de 30 días', ic: 'flame', ok: () => S.best >= 30 },
    { id: 'goal', n: 'Meta cumplida', d: 'Cumple tu meta diaria', ic: 'target', ok: () => S.goals >= 1 },
    { id: 'xp500', n: '500 XP', d: 'Suma 500 puntos de experiencia', ic: 'bolt', ok: () => S.xp >= 500 },
    { id: 'xp2000', n: '2.000 XP', d: 'Suma 2.000 puntos de experiencia', ic: 'bolt', ok: () => S.xp >= 2000 },
    { id: 'exam', n: 'Aprobado', d: 'Aprueba un simulacro de examen', ic: 'exam', ok: () => S.exams.some(e => e.pass) },
    { id: 'exam38', n: 'Puntaje perfecto', d: 'Saca puntaje máximo en un simulacro', ic: 'trophy', ok: () => S.exams.some(e => e.score === e.max) },
    { id: 'haz', n: 'Ojo de halcón', d: 'Saca 5 de 5 en percepción de riesgos', ic: 'eye', ok: () => Object.values(S.haz).some(v => v >= 5) },
    { id: 'cine', n: 'Cinéfilo', d: 'Mira 10 videos completos', ic: 'play', ok: () => Object.keys(S.seen).length >= 10 },
    { id: 'cards', n: 'Señalero', d: 'Completa una ronda de tarjetas de señales', ic: 'sign', ok: () => S.cards >= 1 },
    { id: 'review', n: 'Repaso al día', d: 'Completa un repaso inteligente', ic: 'replay', ok: () => S.revs >= 1 },
    { id: 'multi', n: 'Todo terreno', d: 'Practica con 3 clases de licencia', ic: 'truck', ok: () => Object.keys(S.lics).length >= 3 },
    { id: 'blitz', n: 'Rayo', d: 'Responde 15 bien en un contrarreloj', ic: 'bolt', ok: () => S.blitz >= 15 },
  ];
  function checkAch() {
    let i = 0;
    ACH.forEach(a => {
      if (!S.ach[a.id] && a.ok()) {
        S.ach[a.id] = today();
        setTimeout(() => toast(`${I(a.ic)}<span><small>Logro desbloqueado</small><b>${esc(a.n)}</b></span>`, 3200), 400 + 700 * i++);
      }
    });
    save();
  }

  // ---------- Encabezado y pestañas ----------
  function header() {
    regen();
    $('#hLic').textContent = licInfo().id;
    $('#hStreak').innerHTML = `${I('flame', S.last === today() ? 'on' : '')}<span>${streakNow()}</span>`;
    $('#hStreak').title = `Racha: ${plural(streakNow(), 'día', 'días')}`;
    $('#hXp').innerHTML = `${I('bolt')}<span>${S.xp}</span>`;
    $('#hHearts').innerHTML = `${I('heart')}<span>${S.set.inf ? '∞' : S.hearts}</span>`;
    $('#hHearts').title = S.set.inf ? 'Vidas ilimitadas' : S.hearts < MAXH ? `Próxima vida en ${nextHeartMin()} min` : 'Vidas completas';
  }
  const VIEWS = {};
  let tab = 'aprender';
  function go(t) {
    if (!VIEWS[t]) t = 'aprender';
    tab = t;
    try { history.replaceState(history.state, '', '#' + t); } catch (e) { /* file:// */ }
    $$('.tabs button').forEach(b => b.setAttribute('aria-current', b.dataset.tab === t ? 'page' : 'false'));
    header();
    const v = $('#view');
    v.onclick = null;
    v.innerHTML = '';
    VIEWS[t](v);
  }
  const refresh = () => go(tab);

  // ---------- Aprender ----------
  VIEWS.aprender = v => {
    const c = course(), lic = licInfo(), { ls, cur } = lessonState();
    const doneN = ls.filter(l => S.done[l.id]).length, dxp = S.days[today()] || 0;
    let h = `<section class="hero">
      <div class="goal"><div class="ring" style="--p:${clamp(dxp / S.goal, 0, 1).toFixed(3)}"><span>${I(dxp >= S.goal ? 'check' : 'target')}</span></div>
        <div><small>Meta diaria</small><b>${Math.min(dxp, S.goal)} / ${S.goal} XP</b></div>
        <div class="streakc">${I('flame', S.last === today() ? 'on' : '')}<b>${streakNow()}</b><small>${streakNow() === 1 ? 'día' : 'días'}</small></div></div>
      <div class="course"><button class="lic-big" data-act="lic" aria-label="Cambiar licencia">${esc(lic.id)}</button>
        <div><small>${esc(c.name)} · ${esc(c.sub)}</small><b>${doneN} de ${ls.length} lecciones</b><div class="bar"><i style="width:${(100 * doneN / ls.length).toFixed(1)}%"></i></div></div></div>
      ${cur < ls.length ? `<button class="btn" data-act="cont">${I('play')}${doneN ? 'Continuar' : 'Comenzar'}</button>` : `<button class="btn" data-act="exam">${I('exam')}Curso completo: haz un simulacro</button>`}
    </section>`;
    let idx = 0;
    cUnits().forEach((u, ui) => {
      const first = idx, uDone = u.lessons.filter(l => S.done[l.id]).length, locked = first > cur;
      h += `<section class="unit${locked ? ' locked' : ''}"><div class="unit-h"><small>Unidad ${ui + 1}</small><h2>${esc(u.name)}</h2><p>${esc(u.desc)}</p><span class="unit-n">${uDone}/${u.lessons.length}</span>` +
        (locked ? `<button class="chip" data-act="jump" data-u="${u.id}">${I('bolt')}Saltar aquí</button>` : '') + `</div><div class="path">`;
      u.lessons.forEach((l, li) => {
        const gi = idx++, done = !!S.done[l.id], isCur = gi === cur;
        const off = [0, 54, 0, -54][li % 4];
        h += `<div class="node-w${isCur ? ' has-b' : ''}" style="--x:${off}px">${isCur ? `<span class="bubble">${doneN ? 'Siguiente' : 'Empieza aquí'}</span>` : ''}` +
          `<button class="node ${done ? 'done' : isCur ? 'cur' : 'lock'}" data-l="${l.id}" aria-label="${esc(l.n)}${done ? ', completada' : isCur ? '' : ', bloqueada'}">${I(done || isCur ? l.ic : 'lock')}</button>` +
          (done ? `<div class="stars" aria-label="${S.stars[l.id] || 1} de 3 estrellas">${[1, 2, 3].map(k => I('star', k <= (S.stars[l.id] || 1) ? 'on' : '')).join('')}</div>` : '') +
          `<div class="nl">${esc(l.n)}</div></div>`;
      });
      h += `</div></section>`;
    });
    h += `<p class="foot">Preguntas de práctica basadas en la Ley de Tránsito y en material de CONASET. No es una aplicación oficial: revisa siempre el material vigente antes de tu examen.</p>`;
    v.innerHTML = h;
    v.onclick = e => {
      const b = e.target.closest('[data-l],[data-act]');
      if (!b) return;
      if (b.dataset.l) return lessonSheet(b.dataset.l);
      const a = b.dataset.act;
      if (a === 'cont') { const st = lessonState(); if (st.cur < st.ls.length) startLesson(st.ls[st.cur].id); }
      else if (a === 'lic') licenseSheet();
      else if (a === 'exam') startExam();
      else if (a === 'jump') jumpSheet(b.dataset.u);
    };
    const curNode = $('.node.cur', v);
    if (curNode && !go.scrolled) {
      go.scrolled = true;
      setTimeout(() => { if (curNode.getBoundingClientRect().bottom > innerHeight - 100) curNode.scrollIntoView({ block: 'center' }); }, 30);
    }
  };

  function lessonSheet(lid) {
    const l = LESSONS[lid], u = RB.units[l.u], { ls, cur } = lessonState();
    const gi = ls.findIndex(x => x.id === lid), done = !!S.done[lid];
    if (!done && gi !== cur) { toast(`${I('lock')}<span>Completa primero las lecciones anteriores o usa <b>Saltar aquí</b>.</span>`); return; }
    const n = l.items.filter(GRADED).length, vids = l.items.filter(it => ['clip', 'video', 'hazard', 'tap'].includes(it.t)).length;
    sheet(`<small class="kick">${esc(u.name)}</small><h3>${esc(l.n)}</h3>
      <p class="muted">${plural(n, 'ejercicio', 'ejercicios')}${vids ? ` · ${plural(vids, 'video', 'videos')}` : ''}${done ? ` · ${[1, 2, 3].map(k => k <= (S.stars[lid] || 1) ? '★' : '☆').join('')}` : ''}</p>
      <button class="btn" data-go>${I('play')}${done ? 'Repasar · +5 XP' : 'Empezar · +10 XP'}</button>`,
      el => { $('[data-go]', el).onclick = () => closeLayer(() => startLesson(lid)); });
  }
  function jumpSheet(uid) {
    const u = RB.units[uid];
    sheet(`<small class="kick">Prueba para saltar</small><h3>${esc(u.name)}</h3>
      <p class="muted">Responde 10 preguntas de esta unidad. Si te equivocas menos de 3 veces, desbloqueas la unidad y todo lo anterior.</p>
      <button class="btn" data-go>${I('bolt')}Hacer la prueba</button>`,
      el => { $('[data-go]', el).onclick = () => closeLayer(() => startJump(uid)); });
  }
  function licenseSheet() {
    sheet(`<small class="kick">Licencia</small><h3>¿Qué licencia quieres obtener?</h3><p class="muted">Tu progreso en las unidades comunes se mantiene al cambiar.</p>${licGrid()}`, el => {
      $('.lics', el).onclick = e => {
        const b = e.target.closest('[data-lic]');
        if (!b) return;
        S.lic = b.dataset.lic; save();
        closeLayer(() => { go.scrolled = false; refresh(); toast(`${I('check')}<span>Ahora estudias para la licencia <b>${esc(S.lic)}</b></span>`); });
      };
    });
  }
  const licGrid = () => `<div class="lics">${RB.licenses.map(l => `<button class="licc" data-lic="${l.id}" aria-pressed="${l.id === S.lic}"><b>${l.id}</b><span>${esc(l.t)}</span></button>`).join('')}</div>`;

  // ---------- Sesiones de ejercicios ----------
  let curSes = null;
  const KIND = {
    mc: 'Elige la respuesta correcta', tf: '¿Verdadero o falso?', img: 'Elige la señal correcta', multi: 'Selecciona todas las correctas',
    fill: 'Completa la frase', order: 'Ordena los pasos', match: 'Une las parejas', sort: 'Clasifica', num: 'Indica el valor',
    video: 'Video · responde', tap: 'Toca en la imagen', hazard: 'Percepción de riesgos', clip: 'Video', info: 'Antes de empezar',
    spot: 'Toca el lugar', build: 'Arma la frase',
  };
  const qHead = (it, text) => `<div class="qk">${KIND[it.t]}</div><div class="qt"><span class="qtx">${esc(text != null ? text : it.q)}</span>${RB.canSpeak ? `<button class="ib say" data-say type="button" aria-label="Leer en voz alta">${I('vol')}</button>` : ''}</div>`;
  const optBtn = (html, v, k) => `<button class="opt" data-v="${v}" type="button"><span class="k">${k}</span><span class="ot">${html}</span></button>`;
  const cell = s => typeof s === 'string' && s.startsWith('sign:') ? RB.sign(s.slice(5), 58) : esc(s);
  const cellText = s => typeof s === 'string' && s.startsWith('sign:') ? RB.signName(s.slice(5)) : s;
  const sayText = it => {
    if (it.t === 'fill') return it.s.replace('___', 'espacio en blanco') + '. Opciones: ' + it.o.join(', ');
    if (it.t === 'tf') return it.q + '. ¿Verdadero o falso?';
    if (it.t === 'mc' || it.t === 'multi') return it.q + '. ' + it.o.join('. ');
    return it.q || '';
  };
  function pickOne(body, onPick) {
    body.addEventListener('click', e => {
      const b = e.target.closest('.opt');
      if (!b || b.disabled || body.dataset.locked) return;
      $$('.opt', body).forEach(x => x.classList.toggle('sel', x === b));
      SFX.tap();
      onPick(b.dataset.v);
    });
  }
  function reveal(body, sel, right) {
    body.dataset.locked = '1';
    $$('.opt', body).forEach(b => {
      b.disabled = true; b.classList.remove('sel');
      if (b.dataset.v === right) b.classList.add('ok'); else if (b.dataset.v === sel) b.classList.add('bad');
    });
  }

  const R = {};
  R.mc = (it, body, api) => {
    const opts = shuffle(it.o.map((t, i) => ({ t, i })));
    let sel = null;
    body.innerHTML = qHead(it) + (it.sign ? `<div class="qsign">${RB.sign(it.sign, 132)}</div>` : '') +
      `<div class="opts">${opts.map((o, k) => optBtn(esc(o.t), o.i, k + 1)).join('')}</div>`;
    pickOne(body, v => { sel = +v; api.ready(true); });
    return { check: () => { reveal(body, String(sel), '0'); return { ok: sel === 0, right: esc(it.o[0]) }; } };
  };
  R.tf = (it, body, api) => {
    let sel = null;
    body.innerHTML = qHead(it) + (it.sign ? `<div class="qsign">${RB.sign(it.sign, 132)}</div>` : '') +
      `<div class="opts tf">${optBtn('Verdadero', '1', 1)}${optBtn('Falso', '0', 2)}</div>`;
    pickOne(body, v => { sel = v; api.ready(true); });
    return { check: () => { const r = it.a ? '1' : '0'; reveal(body, sel, r); return { ok: sel === r, right: it.a ? 'Verdadero' : 'Falso' }; } };
  };
  R.img = (it, body, api) => {
    const opts = shuffle(it.o.map((k, i) => ({ k, i })));
    let sel = null;
    body.innerHTML = qHead(it) + `<div class="opts img">${opts.map((o, j) => `<button class="opt io" type="button" data-v="${o.i}" aria-label="Opción ${j + 1}: ${esc(RB.signName(o.k))}"><span class="k">${j + 1}</span>${RB.sign(o.k, 84)}</button>`).join('')}</div>`;
    pickOne(body, v => { sel = +v; api.ready(true); });
    return { check: () => { reveal(body, String(sel), '0'); return { ok: sel === 0, right: esc(RB.signName(it.o[0])) }; } };
  };
  R.multi = (it, body, api) => {
    const opts = shuffle(it.o.map((t, i) => ({ t, i }))), sel = new Set();
    body.innerHTML = qHead(it) + `<div class="opts multi">${opts.map(o => `<button class="opt" type="button" data-v="${o.i}" aria-pressed="false"><span class="k box">${I('check')}</span><span class="ot">${esc(o.t)}</span></button>`).join('')}</div>`;
    body.addEventListener('click', e => {
      const b = e.target.closest('.opt');
      if (!b || body.dataset.locked) return;
      const v = +b.dataset.v;
      if (sel.has(v)) sel.delete(v); else sel.add(v);
      b.classList.toggle('sel', sel.has(v));
      b.setAttribute('aria-pressed', sel.has(v));
      SFX.tap();
      api.ready(sel.size > 0);
    });
    return {
      check: () => {
        body.dataset.locked = '1';
        const A = new Set(it.a), ok = A.size === sel.size && [...A].every(x => sel.has(x));
        $$('.opt', body).forEach(b => {
          const v = +b.dataset.v;
          b.disabled = true; b.classList.remove('sel');
          if (A.has(v)) b.classList.add(sel.has(v) ? 'ok' : 'miss'); else if (sel.has(v)) b.classList.add('bad');
        });
        return { ok, right: it.a.map(i => '· ' + esc(it.o[i])).join('<br>') };
      },
    };
  };
  R.fill = (it, body, api) => {
    const [a, b] = it.s.split('___'), opts = shuffle(it.o.map((t, i) => ({ t, i })));
    let sel = null;
    body.innerHTML = qHead(it) + `<p class="fill">${esc(a)}<button class="blank" type="button" aria-label="Espacio en blanco">&nbsp;</button>${esc(b || '')}</p>` +
      `<div class="fill-bank">${opts.map(o => `<button class="chipw" type="button" data-v="${o.i}">${esc(o.t)}</button>`).join('')}</div>`;
    const blank = $('.blank', body);
    body.addEventListener('click', e => {
      if (body.dataset.locked) return;
      const c = e.target.closest('.fill-bank .chipw');
      if (c) {
        sel = +c.dataset.v;
        blank.textContent = it.o[sel];
        blank.classList.add('filled');
        $$('.fill-bank .chipw', body).forEach(x => x.classList.toggle('used', x === c));
        SFX.tap();
        api.ready(true);
      } else if (e.target.closest('.blank') && sel != null) {
        sel = null;
        blank.innerHTML = '&nbsp;';
        blank.classList.remove('filled');
        $$('.fill-bank .chipw', body).forEach(x => x.classList.remove('used'));
        api.ready(false);
      }
    });
    return { check: () => { body.dataset.locked = '1'; const ok = sel === 0; blank.classList.add(ok ? 'ok' : 'bad'); return { ok, right: `${esc(a)}<b>${esc(it.o[0])}</b>${esc(b || '')}` }; } };
  };
  R.order = (it, body, api) => {
    const items = it.o.map((t, i) => ({ t, i })), bank = shuffle(items), ans = [];
    body.innerHTML = qHead(it) + `<ol class="ord-ans"></ol><div class="ord-bank"></div>`;
    const draw = () => {
      $('.ord-ans', body).innerHTML = ans.map((o, k) => `<li><button class="chipw on" type="button" data-i="${o.i}"><span class="k">${k + 1}</span><span>${esc(o.t)}</span></button></li>`).join('') +
        (ans.length < items.length ? `<li class="ph">${ans.length + 1}</li>` : '');
      $('.ord-bank', body).innerHTML = bank.map(o => ans.includes(o) ? '' : `<button class="chipw" type="button" data-b="${o.i}">${esc(o.t)}</button>`).join('');
      api.ready(ans.length === items.length);
    };
    body.addEventListener('click', e => {
      if (body.dataset.locked) return;
      const b = e.target.closest('[data-b]'), a = e.target.closest('[data-i]');
      if (b) { ans.push(items[+b.dataset.b]); SFX.tap(); draw(); } else if (a) { ans.splice(ans.findIndex(o => o.i === +a.dataset.i), 1); draw(); }
    });
    draw();
    return {
      check: () => {
        body.dataset.locked = '1';
        const ok = ans.every((o, k) => o.i === k);
        $$('.ord-ans [data-i]', body).forEach((el, k) => el.classList.add(+el.dataset.i === k ? 'ok' : 'bad'));
        return { ok, right: `<ol class="rl">${it.o.map(t => `<li>${esc(t)}</li>`).join('')}</ol>` };
      },
    };
  };
  R.match = (it, body, api) => {
    const L = shuffle(it.p.map((p, i) => ({ s: p[0], i }))), Rr = shuffle(it.p.map((p, i) => ({ s: p[1], i })));
    let selL = null, selR = null, done = 0, mistakes = 0;
    body.innerHTML = qHead(it) + `<div class="match"><div class="mcol">${L.map(o => `<button class="mt" type="button" data-side="l" data-i="${o.i}">${cell(o.s)}</button>`).join('')}</div>` +
      `<div class="mcol">${Rr.map(o => `<button class="mt" type="button" data-side="r" data-i="${o.i}">${cell(o.s)}</button>`).join('')}</div></div>`;
    body.addEventListener('click', e => {
      const b = e.target.closest('.mt');
      if (!b || b.disabled) return;
      const side = b.dataset.side;
      $$(`.mt[data-side="${side}"]`, body).forEach(x => x.classList.toggle('sel', x === b));
      if (side === 'l') selL = b; else selR = b;
      SFX.tap();
      if (!selL || !selR) return;
      const l = selL, r = selR;
      selL = selR = null;
      if (l.dataset.i === r.dataset.i) {
        [l, r].forEach(x => { x.classList.remove('sel'); x.classList.add('ok'); x.disabled = true; });
        if (++done === it.p.length) {
          setTimeout(() => api.finish(mistakes === 0, it.p.map(p => `${esc(cellText(p[0]))} → ${esc(cellText(p[1]))}`).join('<br>'),
            mistakes ? { html: `<p class="fb-e">Te equivocaste ${plural(mistakes, 'vez', 'veces')} al unir.</p>` } : {}), 250);
        }
      } else {
        mistakes++; SFX.bad(); buzz(70);
        [l, r].forEach(x => { x.classList.remove('sel'); x.classList.add('bad'); setTimeout(() => x.classList.remove('bad'), 550); });
      }
    });
    return { check: () => ({ ok: mistakes === 0 }) };
  };
  R.sort = (it, body, api) => {
    const cards = shuffle(it.k.map(([s, c]) => ({ s, c }))), wrong = [], two = it.c.length === 2;
    let k = 0, busy = false;
    body.innerHTML = qHead(it) + `<div class="sort"><div class="sort-n"></div><div class="scard" aria-live="polite"></div>` +
      `<div class="sort-c${two ? '' : ' many'}">${it.c.map((c, i) => `<button class="opt sc" type="button" data-c="${i}">${two && i === 0 ? I('left') : ''}<span>${esc(c)}</span>${two && i === 1 ? I('right') : ''}</button>`).join('')}</div>` +
      (two ? `<p class="hint muted">Desliza la tarjeta o toca una opción</p>` : '') + `</div>`;
    const card = $('.scard', body);
    const draw = () => { $('.sort-n', body).textContent = `${k + 1} de ${cards.length}`; card.className = 'scard'; card.style.transform = ''; card.innerHTML = cell(cards[k].s); };
    const choose = c => {
      if (busy || body.dataset.locked) return;
      busy = true;
      const cur = cards[k], ok = c === cur.c;
      if (ok) SFX.tap(); else { wrong.push(cur); SFX.bad(); buzz(70); card.insertAdjacentHTML('beforeend', `<em>${esc(it.c[cur.c])}</em>`); }
      card.classList.add(ok ? 'ok' : 'bad');
      setTimeout(() => {
        busy = false;
        if (++k < cards.length) return draw();
        body.dataset.locked = '1';
        api.finish(wrong.length === 0, wrong.map(w => `${esc(cellText(w.s))} → ${esc(it.c[w.c])}`).join('<br>'));
      }, ok ? 350 : 1100);
    };
    body.addEventListener('click', e => { const b = e.target.closest('.sc'); if (b) choose(+b.dataset.c); });
    let x0 = null;
    card.addEventListener('pointerdown', e => { if (!two) return; x0 = e.clientX; try { card.setPointerCapture(e.pointerId); } catch (er) { /* nada */ } });
    card.addEventListener('pointermove', e => { if (x0 == null || busy) return; const dx = e.clientX - x0; card.style.transform = `translateX(${dx}px) rotate(${dx / 22}deg)`; });
    const end = e => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; card.style.transform = ''; if (Math.abs(dx) > 70) choose(dx < 0 ? 0 : 1); };
    card.addEventListener('pointerup', end);
    card.addEventListener('pointercancel', () => { x0 = null; card.style.transform = ''; });
    draw();
    return { check: () => ({ ok: wrong.length === 0 }) };
  };
  // Velocímetro: arco de 240° que se llena según el valor elegido.
  function gauge(v, min, max) {
    const pt = (deg, r) => { const a = deg * Math.PI / 180; return `${(100 + r * Math.cos(a)).toFixed(1)} ${(100 + r * Math.sin(a)).toFixed(1)}`; };
    const f = clamp((v - min) / (max - min), 0, 1), a = 150 + 240 * f;
    let ticks = '';
    for (let k = 0; k <= 12; k++) { const d = 150 + 20 * k; ticks += `<path d="M${pt(d, 66)} L${pt(d, k % 2 ? 72 : 76)}" stroke="var(--line2)" stroke-width="${k % 2 ? 1.5 : 2.5}"/>`; }
    return `<svg class="gauge" viewBox="0 0 200 128" aria-hidden="true"><path d="M${pt(150, 84)} A84 84 0 1 1 ${pt(390, 84)}" fill="none" stroke="var(--s3)" stroke-width="10" stroke-linecap="round"/>` +
      (f > 0 ? `<path d="M${pt(150, 84)} A84 84 0 ${a - 150 > 180 ? 1 : 0} 1 ${pt(a, 84)}" fill="none" stroke="var(--red)" stroke-width="10" stroke-linecap="round"/>` : '') +
      ticks + `<path d="M100 100 L${pt(a, 60)}" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="100" r="7" fill="var(--ink)"/></svg>`;
  }
  R.num = (it, body, api) => {
    const { min, max, step, a } = it, n = Math.round((max - min) / step), speed = it.u === 'km/h';
    let v;
    do { v = +(min + step * Math.floor(Math.random() * (n + 1))).toFixed(4); } while (Math.abs(v - a) < step / 2 && n > 1);
    body.innerHTML = qHead(it) + (speed ? `<div class="gw">${gauge(v, min, max)}</div>` : '') + `<div class="num"><button class="ib nb" type="button" data-d="-1" aria-label="Menos">−</button><output class="nv"><b>${fmtNum(v, step)}</b> <span>${esc(it.u)}</span></output><button class="ib nb" type="button" data-d="1" aria-label="Más">+</button></div>` +
      `<input class="nr" type="range" min="${min}" max="${max}" step="${step}" value="${v}" aria-label="Valor en ${esc(it.u)}"><div class="nscale"><span>${fmtNum(min, step)}</span><span>${fmtNum(max, step)}</span></div>`;
    const rng = $('.nr', body), out = $('.nv b', body);
    const set = nv => { v = clamp(+(+nv).toFixed(4), min, max); rng.value = v; out.textContent = fmtNum(v, step); if (speed) $('.gw', body).innerHTML = gauge(v, min, max); api.ready(true); };
    rng.addEventListener('input', () => set(rng.value));
    body.addEventListener('click', e => { const b = e.target.closest('.nb'); if (b && !body.dataset.locked) { set(v + step * +b.dataset.d); SFX.tap(); } });
    return {
      check: () => {
        body.dataset.locked = '1'; rng.disabled = true;
        $$('.nb', body).forEach(b => { b.disabled = true; });
        const ok = Math.abs(v - a) <= (it.tol || 0) + 1e-9;
        $('.nv', body).classList.add(ok ? 'ok' : 'bad');
        return { ok, right: `${fmtNum(a, step)} ${esc(it.u)}` };
      },
    };
  };
  R.video = (it, body, api, ses) => {
    const opts = shuffle(it.o.map((t, i) => ({ t, i })));
    let sel = null;
    body.innerHTML = qHead(it, 'Observa la situación…') + `<div class="qvid"></div><button class="link replay" type="button" hidden>${I('replay')}Ver otra vez</button>` +
      `<div class="vq" hidden><div class="opts">${opts.map((o, k) => optBtn(esc(o.t), o.i, k + 1)).join('')}</div></div>`;
    const p = ses.player = new RB.Player($('.qvid', body), it.scene, { captions: false, noBig: true });
    const showQ = () => { $('.qtx', body).textContent = it.q; $('.vq', body).hidden = false; $('.replay', body).hidden = false; };
    setTimeout(() => { if (!ses.dead) p.playUntil(it.at, showQ); }, 500);
    $('.replay', body).onclick = () => { p.seek(0); p.playUntil(it.at, () => { }); };
    pickOne(body, v => { sel = +v; api.ready(true); });
    return {
      check: () => {
        reveal(body, String(sel), '0');
        $('.replay', body).hidden = true;
        p.showCaptions(true);
        p.play();
        return { ok: sel === 0, right: esc(it.o[0]) };
      },
    };
  };
  R.tap = (it, body, api, ses) => {
    const multi = Array.isArray(it.a), A = multi ? it.a : [it.a], sel = new Set();
    body.innerHTML = qHead(it) + `<div class="qvid"></div><p class="hint muted">${multi ? 'Toca todos los que correspondan y luego comprueba.' : 'Toca directamente sobre la imagen.'}</p>`;
    const p = ses.player = new RB.Player($('.qvid', body), it.scene, { captions: false, noBig: true });
    p.seek(it.at);
    p.pickable(it.ids, id => {
      if (body.dataset.locked) return;
      if (!multi) sel.clear();
      if (sel.has(id)) sel.delete(id); else sel.add(id);
      const m = {};
      sel.forEach(x => { m[x] = 'sel'; });
      p.mark(m); SFX.tap(); api.ready(sel.size > 0);
    });
    return {
      check: () => {
        body.dataset.locked = '1';
        const m = {}, ok = A.length === sel.size && A.every(x => sel.has(x));
        A.forEach(x => { m[x] = 'ok'; });
        sel.forEach(x => { if (!A.includes(x)) m[x] = 'bad'; });
        p.mark(m);
        if (!it.still) setTimeout(() => { if (!ses.dead) { p.mark({}); p.showCaptions(true); p.play(); } }, 1600);
        return { ok, right: esc(it.r || (multi ? 'Los marcados con el visto bueno en la imagen.' : 'Mira el vehículo marcado en la imagen.')) };
      },
    };
  };
  // Tocar un lugar de la imagen (una o varias zonas correctas, en coordenadas de la escena).
  R.spot = (it, body, api, ses) => {
    let pt = null;
    body.innerHTML = qHead(it) + `<div class="qvid"></div><p class="hint muted">Toca el lugar en la imagen y luego comprueba.</p>`;
    const p = ses.player = new RB.Player($('.qvid', body), it.scene, { captions: false, noBig: true });
    p.seek(it.at || 0);
    const dot = (x, y, col) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="${col}" stroke="#000" stroke-width="2"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="17" fill="none" stroke="${col}" stroke-width="2.5"/>`;
    p.pickSpot((x, y) => { if (body.dataset.locked) return; pt = [x, y]; p.setExtra(dot(x, y, '#fff')); SFX.tap(); api.ready(true); });
    return {
      check: () => {
        body.dataset.locked = '1';
        const Z = Array.isArray(it.z[0]) ? it.z : [it.z];
        const ok = Z.some(([zx, zy, zw, zh]) => pt[0] >= zx && pt[0] <= zx + zw && pt[1] >= zy && pt[1] <= zy + zh);
        p.setExtra(Z.map(([zx, zy, zw, zh]) => `<rect x="${zx}" y="${zy}" width="${zw}" height="${zh}" rx="6" fill="#fff" fill-opacity=".16" stroke="#fff" stroke-width="2.5" stroke-dasharray="7 5"/>`).join('') + dot(pt[0], pt[1], ok ? '#fff' : '#E10600'));
        return { ok, right: esc(it.r || 'La zona marcada en la imagen.') };
      },
    };
  };
  // Armar una frase con fichas de palabras, con algunas palabras de más.
  const norm = t => t.toLowerCase().replace(/[.,;:¿?¡!]/g, '').replace(/\s+/g, ' ').trim();
  R.build = (it, body, api) => {
    const words = it.w.split(' '), tiles = shuffle(words.map(w => ({ w })).concat((it.x || []).map(w => ({ w })))), ans = [];
    body.innerHTML = qHead(it) + `<div class="bld-a" aria-live="polite"></div><div class="bld-b"></div>`;
    const draw = () => {
      $('.bld-a', body).innerHTML = ans.length ? ans.map((t, k) => `<button class="chipw on" type="button" data-k="${k}">${esc(t.w)}</button>`).join('') : `<span class="muted">Toca las palabras en orden</span>`;
      $('.bld-b', body).innerHTML = tiles.map((t, j) => `<button class="chipw${ans.includes(t) ? ' used' : ''}" type="button" data-j="${j}"${ans.includes(t) ? ' disabled' : ''}>${esc(t.w)}</button>`).join('');
      api.ready(ans.length === words.length);
    };
    body.addEventListener('click', e => {
      if (body.dataset.locked) return;
      const b = e.target.closest('[data-j]'), a = e.target.closest('[data-k]');
      if (b && !b.disabled && ans.length < words.length) { ans.push(tiles[+b.dataset.j]); SFX.tap(); draw(); } else if (a) { ans.splice(+a.dataset.k, 1); draw(); }
    });
    draw();
    return {
      check: () => {
        body.dataset.locked = '1';
        const ok = norm(ans.map(t => t.w).join(' ')) === norm(it.w);
        $('.bld-a', body).classList.add(ok ? 'ok' : 'bad');
        return { ok, right: esc(it.w) };
      },
    };
  };
  R.hazard = (it, body, api, ses) => {
    const sc = RB.scenes[it.scene];
    body.innerHTML = qHead(it, 'Toca el video apenas veas un peligro') + `<div class="qvid"></div>` +
      `<div class="haz-start"><button class="btn" type="button" data-start>${I('eye')}Comenzar</button><p class="muted">Toca cada vez que detectes un peligro en desarrollo. Mientras antes, más puntos (hasta 5). Si tocas demasiadas veces, no sumas.</p></div>`;
    const p = ses.player = new RB.Player($('.qvid', body), it.scene, {
      hazard: true, captions: false,
      onEnd: taps => {
        const r = RB.hazScore(it.scene, taps), [a, b] = sc.hz.w;
        const win = D.createElement('i');
        win.className = 'vp-win';
        win.style.left = (100 * a / sc.dur) + '%';
        win.style.width = (100 * (b - a) / sc.dur) + '%';
        p.tl.appendChild(win);
        ses.hazScore += r.score; ses.hazMax += 5;
        S.haz[it.scene] = Math.max(S.haz[it.scene] || 0, r.score);
        save();
        api.finish(r.score > 0, null, { html: `<p class="fb-r">${I('target')}Puntaje: <b>${r.score} de 5</b>${r.spam ? ' · tocaste demasiadas veces' : ''}</p><p class="fb-e">${esc(sc.hz.txt)}</p><p class="fb-e">La franja clara en la línea de tiempo marca cuándo debías tocar.</p>` });
      },
    });
    $('[data-start]', body).onclick = () => { $('.haz-start', body).remove(); p.play(); };
    return { check: () => ({ ok: false }) };
  };
  R.clip = (it, body, api, ses) => {
    const sc = RB.scenes[it.scene];
    body.innerHTML = `<div class="qk">Video</div><div class="qt"><span class="qtx">${esc(sc.title)}</span></div><div class="qvid"></div><p class="muted">${esc(sc.desc || '')}</p>`;
    ses.player = new RB.Player($('.qvid', body), it.scene, {
      controls: true, voice: S.set.voice,
      onVoice: v => { S.set.voice = v; save(); },
      onEnd: () => { S.seen[it.scene] = S.seen[it.scene] || today(); save(); },
    });
    return {};
  };
  R.info = (it, body) => {
    body.innerHTML = `<div class="infoc">${I(it.ic || 'info')}<h2>${esc(it.title)}</h2><p>${esc(it.txt)}</p></div>`;
    return {};
  };

  function startSession(cfg) {
    regen();
    const useHearts = (cfg.kind === 'lesson' || cfg.kind === 'practice') && !S.set.inf;
    if (useHearts && S.hearts <= 0) return noHearts();
    const ses = {
      cfg, useHearts, queue: cfg.items.map(it => ({ it, retry: false })), i: 0, total: cfg.items.length, resolved: 0,
      firstOk: 0, graded: 0, combo: 0, t0: Date.now(), hazScore: 0, hazMax: 0, jumpFail: 0, finished: false, dead: false,
    };
    const lives = useHearts ? `<span class="ses-hp" title="Vidas">${I('heart')}<b>${S.hearts}</b></span>` : cfg.kind === 'jump' ? `<span class="ses-hp" title="Errores permitidos">${I('heart')}<b>3</b></span>` : '';
    const ent = openLayer('ses', `<header class="ses-h"><button class="ib" type="button" data-x aria-label="Salir">${I('x')}</button><div class="pbar" role="progressbar" aria-label="Progreso" aria-valuemin="0" aria-valuemax="100"><i></i></div>${lives}</header>` +
      `<main class="ses-b"></main><footer class="ses-f"><div class="fb" aria-live="polite"></div><button class="btn" type="button" data-go disabled>Comprobar</button></footer>`,
      () => { ses.dead = true; if (ses.player) ses.player.destroy(); RB.hush(); if (curSes === ses) curSes = null; });
    ent.guard = () => ses.finished || confirm('¿Seguro que quieres salir? Perderás el progreso de esta sesión.');
    ses.el = ent.el;
    curSes = ses;
    $('[data-x]', ent.el).onclick = () => history.back();
    $('[data-go]', ent.el).onclick = () => {
      if (ses.state === 'answer') { const r = ses.r.check(); grade(ses, r.ok, r.right, r.extra); } else if (ses.state === 'info') { ses.resolved++; next(ses); } else if (ses.state === 'fb') next(ses);
    };
    showItem(ses);
  }
  function progress(ses) {
    const p = 100 * ses.resolved / ses.total, bar = $('.pbar', ses.el);
    $('i', bar).style.width = p + '%';
    bar.setAttribute('aria-valuenow', Math.round(p));
  }
  function showItem(ses) {
    const q = ses.queue[ses.i], it = q.it;
    ses.cur = q; ses.state = 'answer';
    if (ses.player) { ses.player.destroy(); ses.player = null; }
    RB.hush();
    const body = D.createElement('main');
    body.className = 'ses-b';
    $('.ses-b', ses.el).replaceWith(body);
    const foot = $('.ses-f', ses.el), goB = $('[data-go]', ses.el);
    foot.className = 'ses-f';
    $('.fb', ses.el).innerHTML = '';
    goB.className = 'btn'; goB.disabled = true; goB.textContent = 'Comprobar';
    progress(ses);
    const api = { ready: on => { if (ses.state === 'answer') goB.disabled = !on; }, finish: (ok, right, extra) => grade(ses, ok, right, extra) };
    ses.r = R[it.t](it, body, api, ses);
    if (!GRADED(it)) { ses.state = 'info'; goB.disabled = false; goB.textContent = 'Continuar'; }
    if (q.retry) body.insertAdjacentHTML('afterbegin', `<div class="retry">${I('replay')}Pregunta que fallaste antes</div>`);
    const sb = $('[data-say]', body);
    if (sb) sb.onclick = () => RB.say(sayText(it));
  }
  function grade(ses, ok, right, extra = {}) {
    if (ses.state !== 'answer') return;
    ses.state = 'fb';
    const q = ses.cur, it = q.it, soft = it.t === 'match' || it.t === 'sort' || it.t === 'hazard', kind = ses.cfg.kind;
    if (!q.retry) { ses.graded++; if (ok) ses.firstOk++; }
    record(it, ok);
    let requeued = false;
    if (ok) { ses.combo++; SFX.ok(); } else {
      ses.combo = 0; SFX.bad(); buzz(140);
      if (!soft) {
        if (ses.useHearts) { loseHeart(); const hp = $('.ses-hp b', ses.el); if (hp) hp.textContent = S.hearts; }
        if (kind === 'jump') { ses.jumpFail++; const hp = $('.ses-hp b', ses.el); if (hp) hp.textContent = Math.max(0, 3 - ses.jumpFail); }
        if (!q.retry && (kind === 'lesson' || kind === 'practice' || kind === 'review')) { ses.queue.push({ it, retry: true }); requeued = true; }
      }
    }
    if (!requeued) ses.resolved++;
    progress(ses);
    const praise = ['¡Correcto!', '¡Muy bien!', '¡Excelente!', '¡Perfecto!', '¡Así se hace!'];
    let msg = ok ? `<div class="fb-t">${I('check')}<span>${praise[Math.floor(Math.random() * praise.length)]}</span></div>`
      : `<div class="fb-t">${I('x')}<span>${it.t === 'hazard' ? 'No detectaste el peligro a tiempo' : right ? 'Respuesta correcta:' : 'Incorrecto'}</span></div>`;
    if (!ok && right) msg += `<div class="fb-r">${right}</div>`;
    if (extra && extra.html) msg += extra.html;
    if (it.e) msg += `<p class="fb-e">${esc(it.e)}</p>`;
    $('.ses-f', ses.el).className = 'ses-f ' + (ok ? 'ok' : 'bad');
    $('.fb', ses.el).innerHTML = msg;
    const goB = $('[data-go]', ses.el);
    goB.disabled = false; goB.textContent = 'Continuar'; goB.className = 'btn' + (ok ? ' w' : '');
    if (ok && ses.combo >= 5 && ses.combo % 5 === 0) toast(`${I('flame')}<b>¡${ses.combo} seguidas!</b>`, 1300);
    goB.focus({ preventScroll: true });
  }
  function next(ses) {
    if (ses.useHearts && S.hearts <= 0) return endSession(ses, 'hearts');
    if (ses.cfg.kind === 'jump' && ses.jumpFail >= 3) return endSession(ses, 'jumpfail');
    if (++ses.i >= ses.queue.length) return endSession(ses, 'done');
    showItem(ses);
  }
  function endSession(ses, why) {
    ses.finished = true;
    if (ses.player) { ses.player.destroy(); ses.player = null; }
    const cfg = ses.cfg, acc = ses.graded ? Math.round(100 * ses.firstOk / ses.graded) : 100;
    const perfect = ses.graded > 0 && ses.firstOk === ses.graded, secs = Math.round((Date.now() - ses.t0) / 1000);
    const body = $('.ses-b', ses.el), goB = $('[data-go]', ses.el);
    $('.ses-f', ses.el).className = 'ses-f';
    $('.fb', ses.el).innerHTML = '';
    goB.className = 'btn'; goB.disabled = false; goB.textContent = 'Continuar';
    goB.onclick = () => closeLayer(refresh);
    if (why === 'hearts') {
      body.innerHTML = `<div class="res"><div class="res-ic">${I('heart')}</div><h2>Te quedaste sin vidas</h2><p class="muted">Recuperas una vida cada 30 minutos (la próxima en ${nextHeartMin()} min). También puedes ganar una ahora con un repaso.</p>` +
        `<button class="btn ghost" type="button" data-rev>${I('replay')}Repasar para ganar una vida</button></div>`;
      $('[data-rev]', body).onclick = () => closeLayer(startReview);
      goB.textContent = 'Volver';
      save();
      return;
    }
    if (why === 'jumpfail') {
      body.innerHTML = `<div class="res"><div class="res-ic">${I('x')}</div><h2>Casi lo logras</h2><p class="muted">Para saltar esta unidad necesitas equivocarte menos de 3 veces. Puedes intentarlo de nuevo cuando quieras o seguir el camino lección a lección.</p></div>`;
      return;
    }
    let xp = 0, title = '¡Sesión completada!', ic = 'trophy', extra = '';
    if (cfg.kind === 'lesson') {
      const first = !S.done[cfg.lid];
      xp = (first ? 10 : 5) + (perfect ? (first ? 5 : 2) : 0);
      if (first) S.done[cfg.lid] = today();
      S.stars[cfg.lid] = Math.max(S.stars[cfg.lid] || 0, acc >= 95 ? 3 : acc >= 80 ? 2 : 1);
      if (perfect) S.perf++;
      title = '¡Lección completada!';
      extra += `<div class="bigstars">${[1, 2, 3].map(k => I('star', k <= S.stars[cfg.lid] ? 'on' : '')).join('')}</div>`;
      const u = RB.units[LESSONS[cfg.lid].u];
      if (first && u.lessons.every(l => S.done[l.id])) extra += `<p class="note">${I('trophy')}Terminaste la unidad «${esc(u.name)}»</p>`;
    } else if (cfg.kind === 'practice') { xp = 5 + (perfect ? 3 : 0); title = '¡Práctica completada!'; ic = 'target'; } else if (cfg.kind === 'review') {
      xp = 5 + (perfect ? 3 : 0); S.revs++; title = '¡Repaso completado!'; ic = 'replay';
      if (!S.set.inf && S.hearts < MAXH) { S.hearts++; if (S.hearts >= MAXH) S.hAt = Date.now(); extra += `<p class="note">${I('heart')}Ganaste una vida</p>`; }
    } else if (cfg.kind === 'jump') {
      xp = 15; title = '¡Unidad desbloqueada!'; ic = 'bolt';
      const ls = cLessons(), stop = ls.findIndex(l => l.u === cfg.uid);
      ls.slice(0, stop).forEach(l => { if (!S.done[l.id]) { S.done[l.id] = today(); S.stars[l.id] = S.stars[l.id] || 1; } });
    } else if (cfg.kind === 'hazard') {
      xp = Math.max(2, Math.round(ses.hazScore / 2)); title = 'Percepción de riesgos'; ic = 'eye';
      if (cfg.full) S.hazBest = Math.max(S.hazBest, ses.hazScore);
      extra += `<div class="score"><b>${ses.hazScore}</b><span>/ ${ses.hazMax}</span></div>`;
    }
    const streakUp = bumpStreak(), goalHit = addXP(xp);
    S.lics[S.lic] = 1;
    save();
    SFX.done();
    const tiles = cfg.kind === 'hazard' ? '' : `<div class="tiles"><div class="tile"><small>XP</small><b>+${xp}</b></div><div class="tile"><small>Precisión</small><b>${acc}%</b></div><div class="tile"><small>Tiempo</small><b>${fmtTime(secs)}</b></div></div>`;
    body.innerHTML = `<div class="res"><div class="res-ic">${I(ic)}</div><h2>${title}</h2>${extra}${tiles}` +
      (cfg.kind === 'hazard' ? `<p class="note">${I('bolt')}+${xp} XP</p>` : '') +
      (perfect && cfg.kind !== 'hazard' ? `<p class="note">${I('star')}¡Sin errores!</p>` : '') +
      `<p class="note">${I('flame', 'on')}${streakUp ? '¡Racha extendida! ' : ''}${plural(streakNow(), 'día', 'días')} de racha</p>` +
      (goalHit ? `<p class="note">${I('target')}¡Meta diaria cumplida!</p>` : '') + `</div>`;
    checkAch();
  }

  function startLesson(lid) {
    const l = LESSONS[lid];
    startSession({ kind: 'lesson', lid, items: l.items.slice() });
  }
  function startJump(uid) {
    const items = shuffle(unitItems(RB.units[uid]).filter(it => ['mc', 'tf', 'img', 'fill', 'multi'].includes(it.t))).slice(0, 10);
    startSession({ kind: 'jump', uid, items });
  }
  function startReview() {
    let items = dueItems().slice(0, 10);
    if (items.length < 5) {
      const doneItems = cLessons().filter(l => S.done[l.id]).flatMap(l => l.items).filter(it => GRADED(it) && it.t !== 'hazard');
      items = uniq(items.concat(shuffle(doneItems))).slice(0, 10);
    }
    if (!items.length) { toast(`${I('info')}<span>Completa algunas lecciones y aquí aparecerán tus preguntas para repasar.</span>`, 3200); return; }
    startSession({ kind: 'review', items });
  }
  function startTopic(uid) {
    const items = shuffle(unitItems(RB.units[uid]).filter(GRADED)).slice(0, 10);
    startSession({ kind: 'practice', uid, items });
  }
  const hazIds = () => Object.keys(RB.scenes).filter(id => RB.scenes[id].hz);
  function startHazards() {
    const ids = hazIds();
    startSession({ kind: 'hazard', full: true, items: [{ t: 'info', ic: 'target', title: 'Percepción de riesgos', txt: `Verás ${ids.length} videos desde tu auto. Toca la pantalla apenas veas un peligro que podría obligarte a frenar o a esquivar. Mientras antes lo detectes, más puntos.` }].concat(ids.map(id => ({ t: 'hazard', scene: id, id: 'qh' + id }))) });
  }
  function noHearts() {
    sheet(`<small class="kick">Sin vidas</small><h3>Descansa un momento</h3><p class="muted">Recuperas una vida cada 30 minutos (la próxima en ${nextHeartMin()} min). Haz un repaso para ganar una ahora, o desactiva las vidas en Perfil → Ajustes.</p>` +
      `<button class="btn" data-rev>${I('replay')}Repasar y ganar una vida</button><button class="btn ghost" data-close>Volver</button>`, el => {
      $('[data-rev]', el).onclick = () => closeLayer(startReview);
      $('[data-close]', el).onclick = () => closeLayer();
    });
  }

  // ---------- Simulacro de examen ----------
  function startExam() {
    const pool = cItems().filter(it => EXAMT.includes(it.t)), byU = {};
    shuffle(pool).forEach(it => { (byU[it._u] = byU[it._u] || []).push(it); });
    const keys = shuffle(Object.keys(byU)), N = Math.min(35, pool.length), qs = [];
    for (let k = 0; qs.length < N; k++) { const arr = byU[keys[k % keys.length]]; if (arr.length) qs.push(arr.pop()); }
    const dbl = new Set(shuffle([...Array(N).keys()]).slice(0, 3));
    const ex = { Q: qs.map((it, i) => ({ it, dbl: dbl.has(i), ans: null, ord: it.o ? shuffle(it.o.map((_, j) => j)) : null })), i: 0, t0: Date.now(), dur: 45 * 60, max: N + 3, done: false };
    ex.pass = Math.round(ex.max * 33 / 38);
    const ent = openLayer('ses exam', `<header class="ses-h"><button class="ib" type="button" data-x aria-label="Salir">${I('x')}</button><div class="ex-n"></div><span class="ex-t" aria-label="Tiempo restante">${I('clock')}<b>45:00</b></span><button class="ib" type="button" data-grid aria-label="Ver todas las preguntas">${I('grid')}</button></header>` +
      `<main class="ses-b"></main><footer class="ses-f ex-f"><button class="btn ghost" type="button" data-prev>Anterior</button><button class="btn" type="button" data-next>Siguiente</button></footer>`, () => clearInterval(ex.timer));
    ent.guard = () => ex.done || confirm('¿Salir del simulacro? Se perderán tus respuestas.');
    const el = ent.el;
    const answered = q => q.it.t === 'multi' ? (q.ans || []).length > 0 : q.ans != null;
    const draw = () => {
      const q = ex.Q[ex.i], it = q.it;
      $('.ex-n', el).textContent = `Pregunta ${ex.i + 1} de ${ex.Q.length}`;
      let opts;
      if (it.t === 'tf') opts = `<div class="opts tf">${[true, false].map((v, j) => `<button class="opt${q.ans === v ? ' sel' : ''}" type="button" data-v="${v}"><span class="k">${j ? 'b' : 'a'}</span><span class="ot">${v ? 'Verdadero' : 'Falso'}</span></button>`).join('')}</div>`;
      else if (it.t === 'img') opts = `<div class="opts img">${q.ord.map((j, k) => `<button class="opt io${q.ans === j ? ' sel' : ''}" type="button" data-v="${j}" aria-label="Opción ${String.fromCharCode(97 + k)}: ${esc(RB.signName(it.o[j]))}"><span class="k">${String.fromCharCode(97 + k)}</span>${RB.sign(it.o[j], 84)}</button>`).join('')}</div>`;
      else if (it.t === 'multi') opts = `<div class="opts multi">${q.ord.map(j => `<button class="opt${(q.ans || []).includes(j) ? ' sel' : ''}" type="button" data-v="${j}"><span class="k box">${I('check')}</span><span class="ot">${esc(it.o[j])}</span></button>`).join('')}</div>`;
      else opts = `<div class="opts">${q.ord.map((j, k) => `<button class="opt${q.ans === j ? ' sel' : ''}" type="button" data-v="${j}"><span class="k">${String.fromCharCode(97 + k)}</span><span class="ot">${esc(it.o[j])}</span></button>`).join('')}</div>`;
      const qtext = it.t === 'fill' ? it.s.replace('___', '______') : it.q;
      $('.ses-b', el).innerHTML = `<div class="qk">${it.t === 'multi' ? `Selecciona ${it.a.length} respuestas` : it.t === 'tf' ? 'Verdadero o falso' : 'Una respuesta'}${q.dbl ? '<span class="badge">Doble puntaje</span>' : ''}</div>` +
        `<div class="qt"><span class="qtx">${esc(qtext)}</span></div>${it.sign ? `<div class="qsign">${RB.sign(it.sign, 120)}</div>` : ''}${opts}`;
      $('[data-prev]', el).disabled = ex.i === 0;
      $('[data-next]', el).textContent = ex.i === ex.Q.length - 1 ? 'Terminar' : 'Siguiente';
      $('.ses-b', el).scrollTop = 0;
    };
    $('.ses-b', el).addEventListener('click', e => {
      const b = e.target.closest('.opt');
      if (!b || ex.done) return;
      const q = ex.Q[ex.i], v = b.dataset.v;
      if (q.it.t === 'tf') q.ans = v === 'true';
      else if (q.it.t === 'multi') { const a = q.ans || (q.ans = []), j = +v, k = a.indexOf(j); if (k >= 0) a.splice(k, 1); else a.push(j); } else q.ans = +v;
      SFX.tap();
      draw();
    });
    $('[data-x]', el).onclick = () => history.back();
    $('[data-prev]', el).onclick = () => { if (ex.i > 0) { ex.i--; draw(); } };
    $('[data-next]', el).onclick = () => {
      if (ex.i < ex.Q.length - 1) { ex.i++; draw(); return; }
      const left = ex.Q.filter(q => !answered(q)).length;
      if (left && !confirm(`Tienes ${plural(left, 'pregunta', 'preguntas')} sin responder. ¿Terminar igual?`)) return;
      finish();
    };
    $('[data-grid]', el).onclick = () => sheet(`<small class="kick">Simulacro</small><h3>Ir a una pregunta</h3><p class="muted">En negro, las respondidas.</p><div class="grid35">${ex.Q.map((q, k) => `<button type="button" class="${answered(q) ? 'a' : ''}${k === ex.i ? ' cur' : ''}" data-k="${k}">${k + 1}</button>`).join('')}</div>`, s => {
      $('.grid35', s).onclick = e => { const b = e.target.closest('[data-k]'); if (b) closeLayer(() => { ex.i = +b.dataset.k; draw(); }); };
    });
    const tick = () => {
      const left = ex.dur - Math.floor((Date.now() - ex.t0) / 1000);
      const t = $('.ex-t', el);
      $('b', t).textContent = fmtTime(Math.max(0, left));
      t.classList.toggle('low', left <= 300);
      if (left <= 0 && !ex.done) finish(true);
    };
    ex.timer = setInterval(tick, 1000);
    const okOf = q => q.it.t === 'tf' ? q.ans === q.it.a : q.it.t === 'multi' ? (q.ans || []).slice().sort().join() === q.it.a.slice().sort().join() : q.ans === 0;
    const ansText = (it, a) => {
      if (a == null || (Array.isArray(a) && !a.length)) return '<i>Sin responder</i>';
      if (it.t === 'tf') return a ? 'Verdadero' : 'Falso';
      if (it.t === 'multi') return a.map(j => esc(it.o[j])).join(' · ');
      if (it.t === 'img') return esc(RB.signName(it.o[a]));
      return esc(it.o[a]);
    };
    const rightText = it => it.t === 'tf' ? (it.a ? 'Verdadero' : 'Falso') : it.t === 'multi' ? it.a.map(j => esc(it.o[j])).join(' · ') : it.t === 'img' ? esc(RB.signName(it.o[0])) : esc(it.o[0]);
    function finish(auto) {
      ex.done = true;
      clearInterval(ex.timer);
      let score = 0, good = 0;
      ex.Q.forEach(q => { q.ok = okOf(q); if (q.ok) { good++; score += q.dbl ? 2 : 1; } record(q.it, q.ok); });
      const pass = score >= ex.pass, secs = Math.min(ex.dur, Math.round((Date.now() - ex.t0) / 1000));
      S.exams.unshift({ d: today(), lic: S.lic, score, max: ex.max, pass, secs });
      S.exams = S.exams.slice(0, 30);
      const xp = 10 + (pass ? 10 : 0), streakUp = bumpStreak(), goalHit = addXP(xp);
      S.lics[S.lic] = 1;
      save();
      if (pass) SFX.done(); else SFX.bad();
      $('.ex-n', el).textContent = 'Resultado';
      $('[data-grid]', el).hidden = true;
      $('.ex-t', el).hidden = true;
      $('.ses-b', el).innerHTML = `<div class="res">${auto ? '<p class="muted">Se acabó el tiempo.</p>' : ''}<div class="score ${pass ? 'pass' : 'fail'}"><b>${score}</b><span>/ ${ex.max}</span></div>` +
        `<span class="pill ${pass ? 'pass' : 'fail'}">${pass ? 'Aprobado' : 'Reprobado'}</span>` +
        `<p class="muted">Necesitas ${ex.pass} puntos para aprobar · ${good} de ${ex.Q.length} correctas · ${fmtTime(secs)}</p>` +
        `<p class="note">${I('bolt')}+${xp} XP${streakUp ? ` · ${I('flame', 'on')}¡Racha extendida!` : ''}${goalHit ? ` · ${I('target')}¡Meta cumplida!` : ''}</p></div>` +
        `<h3 class="st">Revisión</h3><ol class="rev">${ex.Q.map((q, k) => `<li class="${q.ok ? 'ok' : 'bad'}"><details><summary>${I(q.ok ? 'check' : 'x')}<span>${k + 1}. ${esc(q.it.t === 'fill' ? q.it.s.replace('___', '______') : q.it.q)}</span>${q.dbl ? '<em>×2</em>' : ''}</summary>` +
          `<p><small>Tu respuesta:</small> ${ansText(q.it, q.ans)}</p><p><small>Correcta:</small> ${rightText(q.it)}</p>${q.it.e ? `<p class="muted">${esc(q.it.e)}</p>` : ''}</details></li>`).join('')}</ol>`;
      $('.ses-b', el).scrollTop = 0;
      const f = $('.ex-f', el);
      f.innerHTML = `<button class="btn" type="button">Volver</button>`;
      $('button', f).onclick = () => closeLayer(refresh);
      checkAch();
    }
    draw();
  }

  // ---------- Videos ----------
  const CATS = ['Normas y preferencias', 'Adelantar y distancia', 'Vehículos grandes y especiales', 'Percepción de riesgos'];
  VIEWS.videos = v => {
    const all = Object.values(RB.scenes);
    v.innerHTML = `<h1 class="vt">Videos</h1><p class="muted">Situaciones de tránsito animadas. Puedes pausarlas, retrocederlas y activar la narración por voz. Los de percepción de riesgos son interactivos: toca cuando veas el peligro.</p>` +
      CATS.map(cat => `<h2 class="st">${esc(cat)}</h2><div class="vgrid">${all.filter(sc => sc.cat === cat).map(sc => `<button class="vcard" type="button" data-s="${sc.id}"><span class="th"><span class="pl">${I(sc.hz ? 'eye' : 'play')}</span></span>` +
        `<span class="vb"><b>${esc(sc.title)}</b><small>${fmtTime(sc.dur)}${S.seen[sc.id] ? ` · ${I('check')}Visto` : ''}${sc.hz && S.haz[sc.id] != null ? ` · ${S.haz[sc.id]}/5` : ''}</small></span></button>`).join('')}</div>`).join('');
    $$('.vcard', v).forEach(b => $('.th', b).prepend(RB.thumb(b.dataset.s)));
    v.onclick = e => { const b = e.target.closest('[data-s]'); if (b) openVideo(b.dataset.s); };
  };
  function openVideo(id) {
    const sc = RB.scenes[id];
    if (sc.hz) return startSession({ kind: 'hazard', items: [{ t: 'hazard', scene: id, id: 'qh' + id }] });
    let player;
    const ent = openLayer('pl', `<header class="lh"><button class="ib" type="button" data-x aria-label="Cerrar">${I('x')}</button><b>${esc(sc.title)}</b></header>` +
      `<div class="lbody"><div class="plv"></div><p class="muted">${esc(sc.desc || '')}</p><h3 class="st">Puntos clave</h3><ol class="keys">${(sc.cap || []).map(c => `<li>${esc(c[2])}</li>`).join('')}</ol></div>`, () => player && player.destroy());
    $('[data-x]', ent.el).onclick = () => closeLayer(refresh);
    player = new RB.Player($('.plv', ent.el), id, {
      controls: true, autoplay: true, voice: S.set.voice,
      onVoice: on => { S.set.voice = on; save(); },
      onEnd: () => { S.seen[id] = S.seen[id] || today(); save(); checkAch(); },
    });
  }

  // ---------- Practicar ----------
  VIEWS.practicar = v => {
    const due = dueItems().length, last = S.exams.find(e => e.lic === S.lic), c = course();
    const passed = S.exams.filter(e => e.lic === S.lic && e.pass).length;
    v.innerHTML = `<h1 class="vt">Practicar</h1><p class="muted">${esc(c.name)} · ${esc(c.sub)}</p>
      <button class="pcard big" type="button" data-act="exam">${I('exam')}<div><b>Simulacro de examen</b><span>35 preguntas · 3 de doble puntaje · 45 minutos · apruebas con 33 de 38</span>${last ? `<em>Último: ${last.score}/${last.max} · ${last.pass ? 'Aprobado' : 'Reprobado'}${passed ? ` · ${plural(passed, 'aprobado', 'aprobados')}` : ''}</em>` : ''}</div></button>
      <div class="pgrid">
        <button class="pcard" type="button" data-act="review">${I('replay')}<b>Repaso inteligente</b><span>${due ? plural(due, 'pregunta pendiente', 'preguntas pendientes') : 'Estás al día'}</span></button>
        <button class="pcard" type="button" data-act="blitz">${I('bolt')}<b>Contrarreloj</b><span>60 segundos · récord ${S.blitz}</span></button>
        <button class="pcard" type="button" data-act="hazard">${I('eye')}<b>Percepción de riesgos</b><span>${hazIds().length} clips · mejor ${S.hazBest}/${hazIds().length * 5}</span></button>
        <button class="pcard" type="button" data-act="guide">${I('doc')}<b>Guía de estudio</b><span>${cItems().filter(GRADED).length} preguntas con respuesta</span></button>
        <button class="pcard" type="button" data-act="lab">${I('flask')}<b>Laboratorio de frenado</b><span>Velocidad, reacción y distancia</span></button>
        <button class="pcard" type="button" data-act="cards">${I('cards')}<b>Tarjetas de señales</b><span>${Object.keys(RB.signs).length} señales</span></button>
      </div>
      <h2 class="st">Práctica por tema</h2>
      <div class="topics">${cUnits().map(u => { const a = accOf(unitItems(u)); return `<button class="topic" type="button" data-u="${u.id}">${I(u.ic)}<span><b>${esc(u.name)}</b><small>${a == null ? 'Sin práctica aún' : `Precisión ${a}%`}</small></span><i class="meter" aria-hidden="true"><i style="width:${a || 0}%"></i></i></button>`; }).join('')}</div>
      <p class="foot">El simulacro sigue el formato del examen teórico de la clase B. Revisa el formato vigente para tu licencia en la Dirección de Tránsito de tu municipalidad.</p>`;
    v.onclick = e => {
      const b = e.target.closest('[data-act],[data-u]');
      if (!b) return;
      if (b.dataset.u) return startTopic(b.dataset.u);
      ({ exam: startExam, review: startReview, hazard: startHazards, lab: openLab, cards: startCards, blitz: startBlitz, guide: openGuide })[b.dataset.act]();
    };
  };

  // ---------- Contrarreloj: todas las que puedas en 60 segundos ----------
  function startBlitz() {
    const pool = shuffle(cItems().filter(it => it.t === 'tf' || it.t === 'mc'));
    const st = { i: 0, score: 0, miss: 0, t0: Date.now(), dur: 60, done: false, lock: false };
    const ent = openLayer('ses blitz', `<header class="ses-h"><button class="ib" type="button" data-x aria-label="Salir">${I('x')}</button><div class="pbar tbar" role="timer" aria-label="Tiempo restante"><i style="width:100%"></i></div><span class="ses-hp" title="Correctas">${I('bolt')}<b>0</b></span></header>` +
      `<main class="ses-b"></main><footer class="ses-f"><p class="muted center">Responde todas las que puedas en 60 segundos.</p></footer>`, () => { st.done = true; cancelAnimationFrame(st.raf); });
    ent.guard = () => st.done || confirm('¿Salir del contrarreloj?');
    const el = ent.el;
    $('[data-x]', el).onclick = () => history.back();
    const draw = () => {
      const it = pool[st.i % pool.length];
      const opts = it.t === 'tf' ? `<div class="opts tf">${optBtn('Verdadero', it.a ? 'ok' : 'no', 1)}${optBtn('Falso', it.a ? 'no' : 'ok', 2)}</div>`
        : `<div class="opts">${shuffle(it.o.map((t, j) => ({ t, j }))).map((o, k) => optBtn(esc(o.t), o.j === 0 ? 'ok' : 'no', k + 1)).join('')}</div>`;
      $('.ses-b', el).innerHTML = `<div class="qk">${it.t === 'tf' ? '¿Verdadero o falso?' : 'Elige la correcta'}</div><div class="qt"><span class="qtx">${esc(it.q)}</span></div>${it.sign ? `<div class="qsign">${RB.sign(it.sign, 104)}</div>` : ''}${opts}`;
    };
    $('.ses-b', el).addEventListener('click', e => {
      const b = e.target.closest('.opt');
      if (!b || st.lock || st.done) return;
      st.lock = true;
      const it = pool[st.i % pool.length], ok = b.dataset.v === 'ok';
      record(it, ok);
      b.classList.add(ok ? 'ok' : 'bad');
      if (ok) { st.score++; SFX.ok(); } else { st.miss++; SFX.bad(); buzz(60); const r = $('.opt[data-v="ok"]', el); if (r) r.classList.add('ok'); }
      $('.ses-hp b', el).textContent = st.score;
      setTimeout(() => { st.lock = false; st.i++; if (!st.done) draw(); }, ok ? 280 : 1000);
    });
    const finish = () => {
      st.done = true;
      const rec = st.score > S.blitz;
      S.blitz = Math.max(S.blitz, st.score);
      const xp = Math.min(20, 3 + st.score), streakUp = bumpStreak(), goalHit = addXP(xp);
      S.lics[S.lic] = 1;
      save();
      SFX.done();
      $('.ses-b', el).innerHTML = `<div class="res"><div class="res-ic">${I('bolt')}</div><h2>¡Tiempo!</h2><div class="score"><b>${st.score}</b><span>correctas</span></div>` +
        `<p class="muted">${plural(st.miss, 'incorrecta', 'incorrectas')} · récord ${S.blitz}${rec && st.score ? ' · ¡nuevo récord!' : ''}</p>` +
        `<p class="note">${I('bolt')}+${xp} XP${streakUp ? ` · ${I('flame', 'on')}¡Racha extendida!` : ''}${goalHit ? ` · ${I('target')}¡Meta cumplida!` : ''}</p></div>`;
      $('.ses-f', el).innerHTML = `<div class="two"><button class="btn ghost" type="button" data-again>${I('replay')}Otra vez</button><button class="btn" type="button" data-close>Listo</button></div>`;
      $('[data-again]', el).onclick = () => closeLayer(startBlitz);
      $('[data-close]', el).onclick = () => closeLayer(refresh);
      checkAch();
    };
    const tick = () => {
      if (st.done) return;
      const left = st.dur - (Date.now() - st.t0) / 1000;
      $('.tbar i', el).style.width = Math.max(0, 100 * left / st.dur) + '%';
      if (left <= 0) return finish();
      st.raf = requestAnimationFrame(tick);
    };
    draw();
    st.raf = requestAnimationFrame(tick);
  }

  // ---------- Guía de estudio: todas las preguntas con su respuesta ----------
  const plain = t => String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const guideQ = it => it.t === 'fill' ? it.s.replace('___', '____') : it.t === 'hazard' ? RB.scenes[it.scene].title : (it.q || '');
  function guideAnswer(it) {
    const ok = txt => `<p class="ga">${I('check')}<span>${txt}</span></p>`;
    switch (it.t) {
      case 'mc': case 'video': return ok(esc(it.o[0]));
      case 'fill': { const [a, b] = it.s.split('___'); return ok(`${esc(a)}<b>${esc(it.o[0])}</b>${esc(b || '')}`); }
      case 'tf': return ok(it.a ? 'Verdadero' : 'Falso');
      case 'img': return `<p class="ga">${RB.sign(it.o[0], 40)}<span>${esc(RB.signName(it.o[0]))}</span></p>`;
      case 'multi': return `<ul class="gal">${it.a.map(i => `<li>${esc(it.o[i])}</li>`).join('')}</ul>`;
      case 'order': return `<ol class="gal">${it.o.map(t => `<li>${esc(t)}</li>`).join('')}</ol>`;
      case 'match': return `<ul class="gal">${it.p.map(p => `<li>${esc(cellText(p[0]))} → ${esc(cellText(p[1]))}</li>`).join('')}</ul>`;
      case 'sort': return `<ul class="gal">${it.k.map(([x, c]) => `<li>${esc(cellText(x))} → ${esc(it.c[c])}</li>`).join('')}</ul>`;
      case 'num': return ok(`${fmtNum(it.a, it.step)} ${esc(it.u)}`);
      case 'build': return ok(esc(it.w));
      case 'tap': case 'spot': return ok(esc(it.r || ''));
      case 'hazard': return `<p class="ga">${I('eye')}<span>${esc(RB.scenes[it.scene].hz.txt)}</span></p>`;
      default: return '';
    }
  }
  function openGuide() {
    const all = cItems().filter(GRADED);
    const ent = openLayer('guide', `<header class="lh"><button class="ib" type="button" data-x aria-label="Cerrar">${I('x')}</button><b>Guía de estudio</b></header>` +
      `<div class="lbody"><input class="search" type="search" placeholder="Buscar entre ${all.length} preguntas…" aria-label="Buscar en la guía"><div class="gl"></div></div>`);
    const el = ent.el, box = $('.gl', el), inp = $('.search', el);
    $('[data-x]', el).onclick = () => closeLayer();
    const item = it => `<div class="gq"><p class="gqq">${esc(guideQ(it))}</p>${it.sign ? `<div class="gqs">${RB.sign(it.sign, 52)}</div>` : ''}${guideAnswer(it)}${it.e ? `<p class="gqe">${esc(it.e)}</p>` : ''}</div>`;
    const list = () => {
      const q = plain(inp.value.trim());
      if (q.length >= 2) {
        const hits = all.filter(it => plain(guideQ(it) + ' ' + JSON.stringify(it.o || it.p || it.k || it.w || '') + ' ' + (it.e || '') + ' ' + (it.r || '')).includes(q));
        box.innerHTML = `<p class="muted">${plural(hits.length, 'resultado', 'resultados')}${hits.length > 120 ? ' · se muestran los primeros 120' : ''}</p>` + hits.slice(0, 120).map(item).join('');
        return;
      }
      box.innerHTML = cUnits().map(u => {
        const n = unitItems(u).filter(GRADED).length;
        return `<details class="gu"><summary>${I(u.ic)}<span><b>${esc(u.name)}</b><small>${plural(n, 'pregunta', 'preguntas')}</small></span></summary><div class="gus" data-u="${u.id}"></div></details>`;
      }).join('');
      $$('details.gu', box).forEach(d => d.addEventListener('toggle', () => {
        const c = $('.gus', d);
        if (d.open && !c.innerHTML) c.innerHTML = unitItems(RB.units[c.dataset.u]).filter(GRADED).map(item).join('');
      }));
    };
    let tmr;
    inp.addEventListener('input', () => { clearTimeout(tmr); tmr = setTimeout(list, 160); });
    list();
  }

  // ---------- Laboratorio de frenado ----------
  function openLab() {
    const st = { v: 60, mu: .7, tr: 1 };
    const ent = openLayer('lab', `<header class="lh"><button class="ib" type="button" data-x aria-label="Cerrar">${I('x')}</button><b>Laboratorio de frenado</b></header>
      <div class="lbody"><p class="muted">Mueve la velocidad y cambia las condiciones para ver cuántos metros necesitas para detenerte.</p>
      <div class="labv"><b>60</b><span>km/h</span></div>
      <input class="nr" type="range" min="20" max="130" step="5" value="60" aria-label="Velocidad en km/h">
      <div class="labopts"><div><small>Pavimento</small><div class="seg" data-k="mu"><button type="button" data-v=".7" aria-pressed="true">Seco</button><button type="button" data-v=".4" aria-pressed="false">Mojado</button><button type="button" data-v=".1" aria-pressed="false">Hielo</button></div></div>
      <div><small>Conductor</small><div class="seg" data-k="tr"><button type="button" data-v="1" aria-pressed="true">Atento (1 s)</button><button type="button" data-v="2" aria-pressed="false">Distraído (2 s)</button></div></div></div>
      <div class="labbar"></div>
      <div class="tiles"><div class="tile"><small>Reacción</small><b data-o="r"></b></div><div class="tile"><small>Frenado</small><b data-o="b"></b></div><div class="tile"><small>Total</small><b data-o="t"></b></div></div>
      <div class="verdict"></div>
      <p class="foot">Valores aproximados para un auto con buenos neumáticos y frenos. En la realidad influyen el peso, los neumáticos, la pendiente y el estado de los frenos.</p></div>`);
    const el = ent.el;
    $('[data-x]', el).onclick = () => closeLayer();
    const calc = () => {
      const vm = st.v / 3.6, a = st.mu * 9.81, dr = vm * st.tr, db = vm * vm / (2 * a), dt = dr + db, X = 30;
      $('.labv b', el).textContent = st.v;
      $('[data-o="r"]', el).textContent = dr.toFixed(0) + ' m';
      $('[data-o="b"]', el).textContent = db.toFixed(0) + ' m';
      $('[data-o="t"]', el).textContent = dt.toFixed(0) + ' m';
      const scale = Math.max(60, Math.ceil(dt / 20) * 20), W = 320, x = m => 10 + (W - 20) * m / scale;
      let ticks = '';
      const stp = scale <= 100 ? 10 : scale <= 300 ? 50 : 100;
      for (let m = 0; m <= scale; m += stp) ticks += `<line x1="${x(m)}" x2="${x(m)}" y1="58" y2="62" stroke="currentColor" opacity=".35"/><text x="${x(m)}" y="74" text-anchor="middle">${m}</text>`;
      $('.labbar', el).innerHTML = `<svg viewBox="0 0 ${W} 80" role="img" aria-label="Distancia de detención: ${dt.toFixed(0)} metros"><rect x="10" y="26" width="${W - 20}" height="22" rx="4" fill="var(--s3)"/>` +
        `<rect x="10" y="26" width="${(x(dr) - 10).toFixed(1)}" height="22" rx="4" fill="var(--neu)"/><rect x="${x(dr).toFixed(1)}" y="26" width="${(x(dt) - x(dr)).toFixed(1)}" height="22" rx="4" fill="var(--red)"/>` +
        `<line x1="${x(X)}" x2="${x(X)}" y1="16" y2="56" stroke="var(--ink)" stroke-width="2" stroke-dasharray="3 3"/><text x="${x(X)}" y="12" text-anchor="middle" class="lbl">cruce a 30 m</text>${ticks}</svg>`;
      const vd = $('.verdict', el);
      if (dt <= X) { vd.className = 'verdict ok'; vd.innerHTML = `${I('check')}<span>Te detienes ${(X - dt).toFixed(0)} m antes de un cruce peatonal ubicado a 30 m.</span>`; } else {
        const vi = dr >= X ? vm : Math.sqrt(Math.max(0, vm * vm - 2 * a * (X - dr)));
        vd.className = 'verdict bad';
        vd.innerHTML = `${I('x')}<span>No alcanzas a detenerte antes de un cruce a 30 m: llegarías a unos <b>${(vi * 3.6).toFixed(0)} km/h</b>.</span>`;
      }
    };
    $('.nr', el).addEventListener('input', e => { st.v = +e.target.value; calc(); });
    $$('.seg', el).forEach(sg => sg.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      st[sg.dataset.k] = +b.dataset.v;
      $$('button', sg).forEach(x => x.setAttribute('aria-pressed', x === b));
      calc();
    }));
    calc();
  }

  // ---------- Señales ----------
  let sigFilter = 'all';
  VIEWS.senales = v => {
    const keys = Object.keys(RB.signs).filter(k => sigFilter === 'all' || RB.signs[k][1] === sigFilter);
    v.innerHTML = `<h1 class="vt">Señales</h1><p class="muted">Toca una señal para ver qué significa.</p>
      <button class="btn" type="button" data-cards>${I('cards')}Practicar con tarjetas</button>
      <div class="chips" role="group" aria-label="Filtrar señales">${[['all', 'Todas']].concat(Object.entries(RB.signCats)).map(([k, n]) => `<button class="chip" type="button" data-f="${k}" aria-pressed="${k === sigFilter}">${esc(n)}</button>`).join('')}</div>
      <div class="sgrid">${keys.map(k => `<button class="scell" type="button" data-k="${k}">${RB.sign(k, 64)}<span>${esc(RB.signs[k][0])}</span></button>`).join('')}</div>`;
    v.onclick = e => {
      const f = e.target.closest('[data-f]'), k = e.target.closest('[data-k]');
      if (f) { sigFilter = f.dataset.f; refresh(); } else if (k) signSheet(k.dataset.k); else if (e.target.closest('[data-cards]')) startCards();
    };
  };
  function signSheet(k) {
    const [n, c, d] = RB.signs[k];
    sheet(`<div class="sdet">${RB.sign(k, 150)}<small class="kick">${esc(RB.signCats[c])}</small><h3>${esc(n)}</h3><p class="muted">${esc(d)}</p></div>${RB.canSpeak ? `<button class="btn ghost" type="button" data-say>${I('vol')}Escuchar</button>` : ''}`, el => {
      const b = $('[data-say]', el);
      if (b) b.onclick = () => RB.say(`${n}. ${d}`);
    });
  }
  function startCards() {
    const deck = shuffle(Object.keys(RB.signs)).slice(0, 12);
    let i = 0, known = 0;
    const ent = openLayer('ses cards', `<header class="ses-h"><button class="ib" type="button" data-x aria-label="Salir">${I('x')}</button><div class="pbar"><i></i></div><span class="ses-hp">${I('cards')}<b>1/12</b></span></header><main class="ses-b"></main><footer class="ses-f"></footer>`);
    const el = ent.el;
    $('[data-x]', el).onclick = () => closeLayer(refresh);
    const draw = () => {
      const k = deck[i], [n, c, d] = RB.signs[k];
      $('.pbar i', el).style.width = (100 * i / deck.length) + '%';
      $('.ses-hp b', el).textContent = `${i + 1}/${deck.length}`;
      $('.ses-b', el).innerHTML = `<div class="qk">Tarjetas de señales</div><div class="fc">${RB.sign(k, 170)}<div class="ans" hidden><small class="kick">${esc(RB.signCats[c])}</small><h3>${esc(n)}</h3><p>${esc(d)}</p></div><p class="muted q">¿Sabes qué significa?</p></div>`;
      $('.ses-f', el).innerHTML = `<button class="btn" type="button" data-show>Mostrar respuesta</button>`;
      $('[data-show]', el).onclick = () => {
        $('.ans', el).hidden = false;
        $('.fc .q', el).hidden = true;
        $('.ses-f', el).innerHTML = `<div class="two"><button class="btn ghost" type="button" data-n>No la sabía</button><button class="btn" type="button" data-y>La sabía</button></div>`;
        const step = ok => { if (ok) known++; SFX[ok ? 'ok' : 'tap'](); if (++i < deck.length) draw(); else end(); };
        $('[data-n]', el).onclick = () => step(false);
        $('[data-y]', el).onclick = () => step(true);
      };
    };
    const end = () => {
      S.cards++;
      const xp = 5, streakUp = bumpStreak(), goalHit = addXP(xp);
      save();
      SFX.done();
      $('.pbar i', el).style.width = '100%';
      $('.ses-b', el).innerHTML = `<div class="res"><div class="res-ic">${I('cards')}</div><h2>Ronda terminada</h2><div class="score"><b>${known}</b><span>/ ${deck.length}</span></div><p class="muted">señales que ya conocías</p>` +
        `<p class="note">${I('bolt')}+${xp} XP${streakUp ? ` · ${I('flame', 'on')}¡Racha extendida!` : ''}${goalHit ? ` · ${I('target')}¡Meta cumplida!` : ''}</p></div>`;
      $('.ses-f', el).innerHTML = `<button class="btn" type="button">Continuar</button>`;
      $('.ses-f button', el).onclick = () => closeLayer(refresh);
      checkAch();
    };
    draw();
  }

  // ---------- Perfil ----------
  const WD = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  function weekChart() {
    const days = [...Array(7)].map((_, i) => addDays(today(), i - 6)), vals = days.map(d => S.days[d] || 0);
    const W = 320, H = 150, pb = 24, pt = 20, bw = 22, slot = W / 7, max = Math.max(S.goal, ...vals) * 1.18;
    const y = val => pt + (H - pt - pb) * (1 - val / max), base = H - pb;
    let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Puntos de experiencia de los últimos 7 días">` +
      `<line class="bl" x1="0" x2="${W}" y1="${base}" y2="${base}"/>`;
    days.forEach((d, i) => {
      const x = slot * i + (slot - bw) / 2, v = vals[i], top = y(v), h = base - top, r = Math.min(4, h), isT = i === 6;
      const lbl = new Date(d + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'short' });
      s += `<g class="col${isT ? ' today' : ''}" tabindex="0" data-tip="${esc(lbl)}: ${v} XP" aria-label="${esc(lbl)}: ${v} XP"><rect x="${slot * i}" y="0" width="${slot}" height="${H}" fill="transparent"/>` +
        (h > .5 ? `<path d="M${x} ${base} V${(top + r).toFixed(1)} Q${x} ${top.toFixed(1)} ${x + r} ${top.toFixed(1)} H${x + bw - r} Q${x + bw} ${top.toFixed(1)} ${x + bw} ${(top + r).toFixed(1)} V${base} Z"/>` : '') +
        `<text x="${x + bw / 2}" y="${H - 7}" text-anchor="middle">${isT ? 'Hoy' : WD[new Date(d + 'T12:00:00').getDay()]}</text>` +
        (isT && v ? `<text class="vl" x="${x + bw / 2}" y="${(top - 6).toFixed(1)}" text-anchor="middle">${v}</text>` : '') + `</g>`;
    });
    // La meta va encima de las barras para que ninguna la tape.
    s += `<line class="gl" x1="0" x2="${W}" y1="${y(S.goal).toFixed(1)}" y2="${y(S.goal).toFixed(1)}"/><text class="glt" x="2" y="${(y(S.goal) - 5).toFixed(1)}">Meta ${S.goal} XP</text></svg>`;
    const table = `<details class="tv"><summary>Ver como tabla</summary><table class="tbl"><thead><tr><th>Día</th><th>XP</th></tr></thead><tbody>${days.map((d, i) => `<tr><td>${esc(new Date(d + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'short' }))}</td><td>${vals[i]}</td></tr>`).join('')}</tbody></table></details>`;
    return `<div class="chart-w">${s}<div class="tip" role="tooltip"></div></div>${table}`;
  }
  function wireChart(root) {
    const w = $('.chart-w', root);
    if (!w) return;
    const tip = $('.tip', w);
    const show = g => {
      tip.textContent = g.dataset.tip;
      const r = g.getBoundingClientRect(), wr = w.getBoundingClientRect(), p = $('path', g);
      const top = p ? p.getBoundingClientRect().top : r.bottom - 30;
      tip.style.left = clamp(r.left - wr.left + r.width / 2, 60, wr.width - 60) + 'px';
      tip.style.top = (top - wr.top - 8) + 'px';
      tip.classList.add('on');
    };
    $$('.col', w).forEach(g => {
      g.addEventListener('pointerenter', () => show(g));
      g.addEventListener('focus', () => show(g));
      g.addEventListener('pointerleave', () => tip.classList.remove('on'));
      g.addEventListener('blur', () => tip.classList.remove('on'));
    });
  }
  VIEWS.perfil = v => {
    const lic = licInfo(), c = course(), totalDone = Object.keys(S.done).length, acc = accOf(Object.values(ITEMS));
    const exams = S.exams.slice(0, 5), achN = ACH.filter(a => S.ach[a.id]).length;
    const sw = (k, label, sub, dis) => `<label class="row"><span>${label}${sub ? `<small>${sub}</small>` : ''}</span><input class="sw" type="checkbox" data-set="${k}" ${S.set[k] ? 'checked' : ''} ${dis ? 'disabled' : ''}></label>`;
    v.innerHTML = `<h1 class="vt">Perfil</h1>
      <div class="course"><button class="lic-big" type="button" data-act="lic" aria-label="Cambiar licencia">${esc(lic.id)}</button><div><small>Estudias para</small><b>${esc(c.name)}</b><span class="muted small">${esc(lic.t)}</span></div><button class="chip" type="button" data-act="lic">Cambiar</button></div>
      <div class="ptiles">
        <div class="ptile">${I('flame')}<b>${streakNow()}</b><small>Racha actual · mejor ${S.best}</small></div>
        <div class="ptile">${I('bolt')}<b>${S.xp}</b><small>XP total</small></div>
        <div class="ptile">${I('check')}<b>${totalDone}</b><small>Lecciones completadas</small></div>
        <div class="ptile">${I('target')}<b>${acc == null ? '—' : acc + '%'}</b><small>Precisión global</small></div>
      </div>
      <h2 class="st">Últimos 7 días</h2><div class="card">${weekChart()}</div>
      <h2 class="st">Precisión por tema</h2><div class="card accl">${cUnits().map(u => { const a = accOf(unitItems(u)); return `<div class="accr"><b>${esc(u.name)}</b><span>${a == null ? '—' : a + '%'}</span><i class="meter" aria-hidden="true"><i style="width:${a || 0}%"></i></i></div>`; }).join('')}</div>
      <h2 class="st">Simulacros</h2><div class="card">${exams.length ? `<ul class="exl">${exams.map(e => `<li><span class="pill ${e.pass ? 'pass' : 'fail'}">${e.pass ? 'Aprobado' : 'Reprobado'}</span><b>${e.score}/${e.max}</b><small>Clase ${esc(e.lic)} · ${esc(new Date(e.d + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'short' }))} · ${fmtTime(e.secs)}</small></li>`).join('')}</ul>` : `<p class="muted">Aún no haces simulacros. Encuéntralos en Practicar.</p>`}</div>
      <h2 class="st">Logros · ${achN} de ${ACH.length}</h2><div class="agrid">${ACH.map(a => `<button class="ach${S.ach[a.id] ? ' on' : ''}" type="button" data-ach="${a.id}"><i>${I(a.ic)}</i><span>${esc(a.n)}</span></button>`).join('')}</div>
      <h2 class="st">Ajustes</h2><div class="set">
        <div class="row"><span>Meta diaria</span><div class="seg" data-goal>${[10, 20, 30, 50].map(g => `<button type="button" data-v="${g}" aria-pressed="${S.goal === g}">${g}</button>`).join('')}</div></div>
        <div class="row"><span>Tema</span><div class="seg" data-theme>${[['dark', 'Oscuro'], ['light', 'Claro']].map(([k, n]) => `<button type="button" data-v="${k}" aria-pressed="${S.set.theme === k}">${n}</button>`).join('')}</div></div>
        ${sw('sound', 'Sonidos')}${sw('vib', 'Vibración', 'Al equivocarte, si tu teléfono lo permite')}
        ${sw('voice', 'Narración por voz en videos', RB.canSpeak ? 'Lee los subtítulos en voz alta' : 'Tu navegador no tiene voz disponible', !RB.canSpeak)}
        ${sw('inf', 'Vidas ilimitadas', 'Practica sin perder vidas')}
        <button class="row" type="button" data-act="export">${I('down')}<span>Exportar progreso<small>Guarda una copia en un archivo</small></span></button>
        <label class="row">${I('up')}<span>Importar progreso<small>Recupera tu progreso desde un archivo</small></span><input type="file" accept="application/json,.json" data-import hidden></label>
        <button class="row danger" type="button" data-act="reset">${I('trash')}<span>Borrar todo el progreso</span></button>
      </div>
      <h2 class="st">Acerca de</h2><div class="card about"><p><b>Ruta</b> es una app gratuita de práctica para el examen teórico de conducir en Chile, para todas las clases de licencia.</p><p>Las preguntas se basan en la Ley de Tránsito (Ley 18.290 y sus modificaciones, como las leyes de Tolerancia Cero, Emilia y de Convivencia Vial) y en material educativo de CONASET. No es una aplicación oficial y puede no reflejar cambios recientes: revisa siempre el material vigente.</p><p>Tu progreso se guarda solo en este navegador. Si borras los datos del navegador, se pierde: usa “Exportar progreso” para guardar una copia.</p></div>`;
    wireChart(v);
    v.onclick = e => {
      const b = e.target.closest('[data-act],[data-ach],.seg button');
      if (!b) return;
      if (b.dataset.ach) { const a = ACH.find(x => x.id === b.dataset.ach); toast(`${I(a.ic)}<span><small>${S.ach[a.id] ? 'Logro desbloqueado' : 'Logro bloqueado'}</small><b>${esc(a.n)}</b> · ${esc(a.d)}</span>`, 2600); return; }
      if (b.closest('[data-goal]')) { S.goal = +b.dataset.v; save(); refresh(); return; }
      if (b.closest('[data-theme]')) { S.set.theme = b.dataset.v; save(); applyTheme(); refresh(); return; }
      const a = b.dataset.act;
      if (a === 'lic') licenseSheet();
      else if (a === 'export') exportData();
      else if (a === 'reset') {
        if (!confirm('¿Borrar todo tu progreso? No se puede deshacer.')) return;
        S = DEF(); save(); go.scrolled = false; applyTheme(); go('aprender'); onboarding();
      }
    };
    $$('[data-set]', v).forEach(inp => inp.addEventListener('change', () => { S.set[inp.dataset.set] = inp.checked; save(); header(); }));
    $('[data-import]', v).addEventListener('change', e => {
      const f = e.target.files[0];
      if (!f) return;
      const rd = new FileReader();
      rd.onload = () => {
        try {
          const o = load(rd.result);
          if (typeof o.xp !== 'number' || typeof o.done !== 'object') throw new Error('formato');
          S = o; save(); applyTheme(); refresh();
          toast(`${I('check')}<span>Progreso importado</span>`);
        } catch (er) { toast(`${I('x')}<span>No se pudo leer el archivo. ¿Es una copia exportada desde Ruta?</span>`, 3200); }
      };
      rd.readAsText(f);
    });
  };
  function exportData() {
    if (window.RutaNative) { window.RutaNative.share(`ruta-progreso-${today()}.json`, JSON.stringify(S)); return; }
    const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
    const a = D.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ruta-progreso-${today()}.json`;
    D.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function applyTheme() {
    D.documentElement.dataset.theme = S.set.theme;
    const m = $('meta[name="theme-color"]');
    if (m) m.content = S.set.theme === 'light' ? '#ffffff' : '#000000';
  }

  // ---------- Bienvenida ----------
  function onboarding() {
    const ent = openLayer('onb', `<div class="onb-in"></div>`);
    ent.guard = () => !!S.lic;
    const box = $('.onb-in', ent.el);
    let goal = S.goal;
    const step1 = () => {
      box.innerHTML = `<div class="wm">RUTA<i></i></div><h1>Aprende a conducir, una lección a la vez.</h1><p>Prepara el examen teórico de tu licencia con ejercicios cortos, videos y simulacros.</p>
        <ul class="feat"><li>${I('road')}Lecciones para todas las clases de licencia</li><li>${I('play')}Videos animados y percepción de riesgos</li><li>${I('exam')}Simulacro del examen teórico</li><li>${I('flame')}Rachas, metas diarias y logros</li></ul>
        <button class="btn" type="button" data-n>Comenzar</button>`;
      $('[data-n]', box).onclick = step2;
    };
    const step2 = () => {
      box.innerHTML = `<small class="kick">Paso 1 de 2</small><h1>¿Qué licencia quieres obtener?</h1><p>Puedes cambiarla cuando quieras.</p>${licGrid()}`;
      $('.lics', box).onclick = e => { const b = e.target.closest('[data-lic]'); if (b) { S.lic = b.dataset.lic; save(); step3(); } };
    };
    const step3 = () => {
      box.innerHTML = `<small class="kick">Paso 2 de 2</small><h1>Elige tu meta diaria</h1><p>Un poco cada día es la mejor forma de aprender.</p>
        <div class="goals">${[[10, 'Relajada', '~5 min al día'], [20, 'Normal', '~10 min al día'], [30, 'Seria', '~15 min al día'], [50, 'Intensa', '~25 min al día']].map(([g, n, d]) => `<button class="goalc" type="button" data-g="${g}" aria-pressed="${g === goal}"><b>${n}</b><span>${g} XP · ${d}</span></button>`).join('')}</div>
        <button class="btn" type="button" data-n>Empezar a aprender</button>`;
      $('.goals', box).onclick = e => { const b = e.target.closest('[data-g]'); if (!b) return; goal = +b.dataset.g; $$('.goalc', box).forEach(x => x.setAttribute('aria-pressed', x === b)); };
      $('[data-n]', box).onclick = () => { S.goal = goal; save(); closeLayer(() => { go.scrolled = false; go('aprender'); }); };
    };
    step1();
  }

  // ---------- Teclado ----------
  D.addEventListener('keydown', e => {
    const ses = curSes;
    if (!ses || ses.dead || e.target.tagName === 'INPUT' || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'Enter' && !(e.target.tagName === 'BUTTON' && e.target !== $('[data-go]', ses.el))) {
      const b = $('[data-go]', ses.el);
      if (b && !b.disabled) { e.preventDefault(); b.click(); }
    } else if (/^[1-9]$/.test(e.key) && ses.state === 'answer') {
      const list = $$('.ses-b .opt:not(:disabled), .ses-b .ord-bank .chipw, .ses-b .fill-bank .chipw, .ses-b .bld-b .chipw:not(:disabled)', ses.el);
      const b = list[+e.key - 1];
      if (b) { e.preventDefault(); b.click(); }
    }
  });

  // ---------- Inicio ----------
  applyTheme();
  $$('.tabs button').forEach(b => { b.onclick = () => { go.scrolled = b.dataset.tab !== 'aprender'; go(b.dataset.tab); window.scrollTo(0, 0); }; });
  $('#hLic').onclick = licenseSheet;
  $('.brand').onclick = () => { go('aprender'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  setInterval(header, 60000);
  D.addEventListener('visibilitychange', () => { if (!D.hidden) header(); });
  go((location.hash || '').slice(1) || 'aprender');
  if (!S.lic) onboarding();
  if ('serviceWorker' in navigator && location.protocol === 'https:' && !window.RutaNative) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
  }
  RB.app = { state: () => S, session: () => curSes };
})();
