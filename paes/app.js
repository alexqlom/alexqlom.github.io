// PAES: app para preparar la PAES con lecciones cortas, videos narrados y ensayos. Todo el progreso vive en el teléfono.
(function () {
  'use strict';
  const RB = window.RB;
  const D = document;
  const $ = (s, el = D) => el.querySelector(s);
  const $$ = (s, el = D) => Array.from(el.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/==(.+?)==/g, '<mark>$1</mark>');
  const I = (n, c) => RB.icon(n, c);
  const NAT = () => window.PaesNative;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const dayStr = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const today = () => dayStr(new Date());
  const addDays = (s, n) => { const d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + n); return dayStr(d); };
  const decimals = step => (String(step).split('.')[1] || '').length;
  const fmtNum = (v, step) => (+v).toFixed(decimals(step)).replace('.', ',');
  const fmtTime = s => s >= 3600 ? `${Math.floor(s / 3600)}:${String(Math.floor(s % 3600 / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}` : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const plural = (n, a, b) => `${n.toLocaleString('es-CL')} ${n === 1 ? a : b}`;

  // ---------- Estado ----------
  const KEY = 'paes-v1';
  const DEF = () => ({
    v: 1, test: null, sel: [], plan: null, today: null, act: null, vpos: {}, goal: 30, xp: 0, days: {}, streak: 0, best: 0, last: null, hearts: 5, hAt: Date.now(),
    done: {}, stars: {}, q: {}, exams: [], ach: {}, seen: {}, tests: {}, revs: 0, perf: 0, goals: 0, goalDay: null,
    blitz: 0, vq: 0, set: { sound: true, vib: true, voice: true, cc: true, music: true, rate: 1, vname: '', inf: false, remind: true, rh: 19 },
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
        it.id = 'q' + hash(it.t + '|' + (it.q || it.s || it.title || '') + '|' + (it.tx || '') + '|' + JSON.stringify(it.o || it.p || it.k || it.a || it.w || ''));
        if (!ITEMS[it.id]) { ITEMS[it.id] = it; it._u = uid; }
      });
    });
  }
  // Cada tema trae su video al entrar a la lección: en Historia, uno por lección (videos en dibujos); en las otras
  // pruebas, el video de la unidad va al comienzo de su primera lección.
  for (const id in RB.videos) {
    const v = RB.videos[id], u = RB.units[v.u];
    if (v.kind === 'toon' && u && u.lessons[v.l]) u.lessons[v.l].vid = id;
  }
  for (const uid in RB.units) {
    const u = RB.units[uid];
    if (u.vid && RB.videos[u.vid] && u.lessons.length && !u.lessons.some(l => l.vid)) u.lessons[0].vid = u.vid;
  }
  const GRADED = it => it.t !== 'info';
  const EXAMT = ['mc', 'tf', 'fill'];
  const testInfo = id => RB.tests.find(t => t.id === (id || S.test)) || RB.tests[0];
  const cUnits = (t = testInfo()) => t.units.map(id => RB.units[id]).filter(Boolean);
  const cLessons = () => cUnits().flatMap(u => u.lessons);
  const uniq = list => { const seen = new Set(); return list.filter(it => !seen.has(it.id) && seen.add(it.id)); };
  const cItems = (t) => uniq(cUnits(t).flatMap(u => u.lessons.flatMap(l => l.items)));
  const unitItems = u => uniq(u.lessons.flatMap(l => l.items));
  const lessonState = () => { const ls = cLessons(); let cur = ls.findIndex(l => !S.done[l.id]); if (cur < 0) cur = ls.length; return { ls, cur }; };
  const allGraded = () => Object.values(ITEMS).filter(GRADED);

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
  const wrongItems = () => cItems().filter(it => GRADED(it) && S.q[it.id] && S.q[it.id].w > 0 && S.q[it.id].b < 3)
    .sort((a, b) => (S.q[b.id].w - S.q[a.id].w));
  function accOf(list) {
    let n = 0, w = 0;
    list.forEach(it => { const r = S.q[it.id]; if (r) { n += r.n; w += r.w; } });
    return n ? Math.round(100 * (n - w) / n) : null;
  }
  // Dominio de una unidad: preguntas respondidas bien al menos una vez sobre el total.
  const mastery = list => { const g = list.filter(GRADED); if (!g.length) return 0; return Math.round(100 * g.filter(it => S.q[it.id] && S.q[it.id].n > S.q[it.id].w).length / g.length); };

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
    pop() { tone(740, .07, 'sine', .022); tone(1110, .09, 'sine', .016, .05); },
  };
  const buzz = ms => {
    if (!S.set.vib) return;
    try { if (NAT()) NAT().vibrate(ms); else if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* nada */ }
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
    if (ent.guard && !ent.guard()) {
      history.pushState({ ov: OV.length }, '');
      if (ent.ask && !ent.asking) {
        ent.asking = true;
        ask(ent.ask).then(ok => { ent.asking = false; if (ok) { ent.guard = null; closeLayer(); } });
      }
      return;
    }
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
  function ask({ title, text, ok, cancel = 'Cancelar', danger = true }) {
    return new Promise(res => {
      let yes = false;
      const ent = sheet(`<div class="ask"><h3>${esc(title)}</h3>${text ? `<p class="muted">${esc(text)}</p>` : ''}` +
        `<div class="ask-b"><button class="btn" type="button" data-no>${esc(cancel)}</button><button class="btn ghost${danger ? ' danger' : ''}" type="button" data-yes>${esc(ok)}</button></div></div>`);
      ent.onClose = () => res(yes);
      $('[data-no]', ent.el).onclick = () => closeLayer();
      $('[data-yes]', ent.el).onclick = () => { yes = true; closeLayer(); };
    });
  }
  // Botón Atrás de Android (lo llama la app nativa). Nunca cierra la app de golpe: cierra la capa de arriba,
  // retrocede un paso en la encuesta, vuelve a Aprender y, en el inicio, pide tocar Atrás otra vez para salir.
  let lastBack = 0;
  const exitPress = () => {
    const now = Date.now();
    if (now - lastBack < 2200) { lastBack = 0; return 'exit'; }
    lastBack = now;
    toast(`${I('info')}<span>Toca <b>Atrás</b> otra vez para salir</span>`, 2000);
    return 'handled';
  };
  window.PaesBack = () => {
    const top = OV[OV.length - 1];
    if (top) {
      if (top.back && top.back()) return 'handled';
      if (top.guard && !top.guard() && !top.ask) return exitPress();
      history.back();
      return 'handled';
    }
    if (tab !== 'aprender') { go('aprender'); window.scrollTo(0, 0); return 'handled'; }
    return exitPress();
  };
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
    { id: 'l50', n: 'Maratón', d: 'Completa 50 lecciones', ic: 'speed', ok: () => Object.keys(S.done).length >= 50 },
    { id: 'l100', n: 'Cien lecciones', d: 'Completa 100 lecciones', ic: 'trophy', ok: () => Object.keys(S.done).length >= 100 },
    { id: 'perfect', n: 'Sin errores', d: 'Termina una lección sin equivocarte', ic: 'star', ok: () => S.perf >= 1 },
    { id: 'perf10', n: 'Precisión quirúrgica', d: 'Termina 10 lecciones sin errores', ic: 'target', ok: () => S.perf >= 10 },
    { id: 's3', n: 'Constante', d: 'Logra una racha de 3 días', ic: 'flame', ok: () => S.best >= 3 },
    { id: 's7', n: 'Una semana', d: 'Logra una racha de 7 días', ic: 'flame', ok: () => S.best >= 7 },
    { id: 's30', n: 'Imparable', d: 'Logra una racha de 30 días', ic: 'flame', ok: () => S.best >= 30 },
    { id: 'goal', n: 'Meta cumplida', d: 'Cumple tu meta diaria', ic: 'target', ok: () => S.goals >= 1 },
    { id: 'xp1000', n: '1.000 XP', d: 'Suma 1.000 puntos de experiencia', ic: 'bolt', ok: () => S.xp >= 1000 },
    { id: 'xp5000', n: '5.000 XP', d: 'Suma 5.000 puntos de experiencia', ic: 'bolt', ok: () => S.xp >= 5000 },
    { id: 'exam', n: 'Primer ensayo', d: 'Termina un ensayo PAES', ic: 'exam', ok: () => S.exams.length >= 1 },
    { id: 'p700', n: 'Sobre 700', d: 'Saca 700 puntos o más en un ensayo de 30 preguntas o más', ic: 'trophy', ok: () => S.exams.some(e => e.pts >= 700 && e.n >= 30) },
    { id: 'p850', n: 'Puntaje de excelencia', d: 'Saca 850 puntos o más en un ensayo de 30 preguntas o más', ic: 'crown', ok: () => S.exams.some(e => e.pts >= 850 && e.n >= 30) },
    { id: 'cine', n: 'Cinéfilo', d: 'Mira 10 videos completos', ic: 'film', ok: () => Object.keys(S.seen).length >= 10 },
    { id: 'cine30', n: 'Maestro del video', d: 'Mira 30 videos completos', ic: 'play', ok: () => Object.keys(S.seen).length >= 30 },
    { id: 'review', n: 'Repaso al día', d: 'Completa un repaso inteligente', ic: 'replay', ok: () => S.revs >= 1 },
    { id: 'multi', n: 'Todoterreno', d: 'Practica en 4 pruebas distintas', ic: 'grid', ok: () => Object.keys(S.tests).length >= 4 },
    { id: 'blitz', n: 'Rayo', d: 'Responde 15 bien en un contrarreloj', ic: 'bolt', ok: () => S.blitz >= 15 },
    { id: 'vq', n: 'Atento al video', d: 'Responde bien 20 preguntas dentro de los videos', ic: 'eye', ok: () => S.vq >= 20 },
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
    $('#hTest').textContent = testInfo().s;
    $('#hStreak').innerHTML = `${I('flame', S.last === today() ? 'on' : '')}<span>${streakNow()}</span>`;
    $('#hXp').innerHTML = `${I('bolt')}<span>${S.xp}</span>`;
    $('#hHearts').innerHTML = `${I('heart')}<span>${S.set.inf ? '∞' : S.hearts}</span>`;
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
    v.classList.remove('vin'); void v.offsetWidth; v.classList.add('vin');
  }
  const refresh = () => go(tab);

  // ---------- Aprender ----------
  VIEWS.aprender = v => {
    const T = testInfo(), { ls, cur } = lessonState();
    const doneN = ls.filter(l => S.done[l.id]).length, dxp = S.days[today()] || 0;
    const nq = cItems().filter(GRADED).length;
    let h = planCard() + `<section class="hero">
      <div class="goal"><div class="ring" style="--p:${clamp(dxp / S.goal, 0, 1).toFixed(3)}"><span>${I(dxp >= S.goal ? 'check' : 'target')}</span></div>
        <div><small>Meta diaria</small><b>${Math.min(dxp, S.goal)} / ${S.goal} XP</b></div>
        <div class="streakc">${I('flame', S.last === today() ? 'on' : '')}<b>${streakNow()}</b><small>${streakNow() === 1 ? 'día' : 'días'}</small></div></div>
      ${selTests().length > 1 || S.plan ? `<div class="tsel" role="group" aria-label="Tus pruebas">${selTests().map(id => `<button class="chip" type="button" data-t="${id}" aria-pressed="${id === S.test}">${I(testInfo(id).ic)}${esc(testInfo(id).s)}</button>`).join('')}<button class="chip more" type="button" data-act="test" aria-label="Todas las pruebas">${I('grid')}</button></div>` : ''}
      <div class="course"><button class="lic-big" data-act="test" aria-label="Cambiar prueba">${I(T.ic)}</button>
        <div><small>${esc(T.n)} · ${plural(nq, 'pregunta', 'preguntas')}</small><b>${doneN} de ${ls.length} lecciones</b><div class="bar"><i style="width:${(100 * doneN / Math.max(1, ls.length)).toFixed(1)}%"></i></div></div></div>
      ${cur < ls.length ? `<button class="btn" data-act="cont">${I('play')}${doneN ? 'Continuar' : 'Comenzar'}</button>` : `<button class="btn" data-act="exam">${I('exam')}Prueba completa: haz un ensayo</button>`}
    </section>`;
    let idx = 0;
    cUnits().forEach((u, ui) => {
      const uDone = u.lessons.filter(l => S.done[l.id]).length;
      h += `<section class="unit"><div class="unit-h"><small>Unidad ${ui + 1}${u.area ? ' · ' + esc(u.area) : ''}</small><h2>${esc(u.name)}</h2><p>${esc(u.desc)}</p><span class="unit-n">${uDone}/${u.lessons.length}</span>` +
        `<div class="unit-a"><button class="chip" type="button" data-u="${u.id}">${I('target')}Practicar</button></div></div><div class="path">`;
      u.lessons.forEach((l, li) => {
        const gi = idx++, done = !!S.done[l.id], isCur = gi === cur;
        const off = [54, 0, -54, 0][li % 4];
        h += `<div class="node-w${isCur ? ' has-b' : ''}" style="--x:${off}px">${isCur ? `<span class="bubble">${doneN ? 'Siguiente' : 'Empieza aquí'}</span>` : ''}` +
          `<button class="node ${done ? 'done' : isCur ? 'cur' : 'open'}" data-l="${l.id}" aria-label="${esc(l.n)}${done ? ', completada' : ''}${l.vid ? ', con video' : ''}">${I(l.ic || u.ic)}${l.vid && !S.seen[l.vid] ? `<i class="nv">${I('play')}</i>` : ''}</button>` +
          (done ? `<div class="stars" aria-label="${S.stars[l.id] || 1} de 3 estrellas">${[1, 2, 3].map(k => I('star', k <= (S.stars[l.id] || 1) ? 'on' : '')).join('')}</div>` : '') +
          `<div class="nl">${esc(l.n)}</div></div>`;
      });
      h += `</div></section>`;
    });
    h += `<p class="foot">Preguntas de práctica basadas en los temarios PAES del DEMRE. No es material oficial: revisa siempre los temarios vigentes de tu admisión.</p>`;
    v.innerHTML = h;
    v.onclick = e => {
      const b = e.target.closest('[data-l],[data-act],[data-v],[data-u],[data-task],[data-t]');
      if (!b) return;
      if (b.dataset.task != null) { const x = S.today && S.today.tasks[+b.dataset.task]; if (x) runTask(x); return; }
      if (b.dataset.t) { if (b.dataset.t !== S.test) { S.test = b.dataset.t; save(); go.scrolled = false; refresh(); } return; }
      if (b.dataset.l) return lessonSheet(b.dataset.l);
      if (b.dataset.v) return openVideo(b.dataset.v);
      if (b.dataset.u) return startTopic(b.dataset.u);
      const a = b.dataset.act;
      if (a === 'cont') { const st = lessonState(); if (st.cur < st.ls.length) enterLesson(st.ls[st.cur].id); }
      else if (a === 'test') testSheet();
      else if (a === 'exam') examSheet();
      else if (a === 'plan') planView();
      else if (a === 'survey') survey({ edit: true });
      else if (a === 'tmore') { planCard.open = true; $('.tasks', v).classList.add('open'); b.remove(); }
    };
    const curNode = $('.node.cur', v);
    if (curNode && !go.scrolled && !S.plan) {
      go.scrolled = true;
      setTimeout(() => { if (curNode.getBoundingClientRect().bottom > innerHeight - 100) curNode.scrollIntoView({ block: 'center' }); }, 30);
    }
  };

  function lessonSheet(lid) {
    const l = LESSONS[lid], u = RB.units[l.u], done = !!S.done[lid];
    const n = l.items.filter(GRADED).length;
    const vid = l.vid && RB.videos[l.vid], mins = vid ? Math.max(1, Math.round(RB.videoSecs(l.vid) / 60)) : 0;
    const first = vid && !done && !S.seen[l.vid] && !(S.plan && S.plan.style === 'practice');
    sheet(`<small class="kick">${esc(u.name)}</small><h3>${esc(l.n)}</h3>
      <p class="muted">${vid ? `Video de ${mins} min · ` : ''}${plural(n, 'ejercicio', 'ejercicios')}${done ? ` · ${[1, 2, 3].map(k => k <= (S.stars[lid] || 1) ? '★' : '☆').join('')}` : ''}</p>
      ${first ? `<button class="btn" data-vg>${I('play')}Empezar: video y ejercicios</button><button class="btn ghost" data-go>${I('pen')}Ir directo a los ejercicios</button>`
    : `<button class="btn" data-go>${I('play')}${done ? 'Repasar · +5 XP' : 'Empezar · +10 XP'}</button>${vid ? `<button class="btn ghost" data-vg>${I('film')}${S.seen[l.vid] ? 'Ver el video otra vez' : 'Ver el video primero'}</button>` : ''}`}`,
      el => {
        $('[data-go]', el).onclick = () => closeLayer(() => startLesson(lid));
        const vb = $('[data-vg]', el);
        if (vb) vb.onclick = () => closeLayer(() => openVideo(l.vid, { lid }));
      });
  }
  // Entrar a una lección: si su video está pendiente, primero el video y al terminar, los ejercicios.
  function enterLesson(lid) {
    const l = LESSONS[lid];
    if (l.vid && RB.videos[l.vid] && !S.seen[l.vid] && !S.done[lid] && !(S.plan && S.plan.style === 'practice')) openVideo(l.vid, { lid });
    else startLesson(lid);
  }
  const testGrid = (list = RB.tests) => `<div class="lics">${list.map(t => `<button class="licc" data-test="${t.id}" aria-pressed="${t.id === S.test}">${I(t.ic)}<b>${esc(t.s)}</b><span>${esc(t.n)}</span><small>${plural(cItems(t).filter(GRADED).length, 'pregunta', 'preguntas')}</small></button>`).join('')}</div>`;
  function testSheet() {
    const mine = RB.tests.filter(t => selTests().includes(t.id)), other = RB.tests.filter(t => !selTests().includes(t.id));
    sheet(`<small class="kick">Prueba</small><h3>¿Qué prueba quieres estudiar?</h3><p class="muted">Tu progreso en cada prueba se guarda por separado. Puedes cambiar cuando quieras.</p>${S.plan ? `<small class="kick sub2">En tu plan</small>${testGrid(mine)}${other.length ? `<small class="kick sub2">Otras pruebas</small>${testGrid(other)}` : ''}` : testGrid()}`, el => {
      $$('.lics', el).forEach(g => g.onclick = e => {
        const b = e.target.closest('[data-test]');
        if (!b) return;
        S.test = b.dataset.test; save();
        closeLayer(() => { go.scrolled = false; refresh(); window.scrollTo(0, 0); toast(`${I('check')}<span>Ahora estudias <b>${esc(testInfo().n)}</b></span>`); });
      });
    });
  }

  // ---------- Sesiones de ejercicios ----------
  let curSes = null;
  const KIND = {
    mc: 'Elige la respuesta correcta', tf: '¿Verdadero o falso?', multi: 'Selecciona todas las correctas',
    fill: 'Completa la frase', order: 'Ordena', match: 'Une las parejas', sort: 'Clasifica', num: 'Calcula el valor',
    info: 'Antes de empezar', build: 'Arma la frase',
  };
  const passage = (it, open = true) => {
    const T = it.tx && RB.texts && RB.texts[it.tx];
    if (!T) return '';
    // Los poemas se separan en estrofas (línea en blanco) y conservan cada verso en su línea.
    const verse = /\n\s*\n/.test(T.b);
    const paras = verse ? T.b.split(/\n\s*\n/).map(st => `<p class="st-v">${st.split('\n').map(rich).join('<br>')}</p>`) : T.b.split('\n').filter(Boolean).map(p => `<p>${rich(p)}</p>`);
    return `<details class="txt"${open ? ' open' : ''}><summary>${I('book')}<span>${esc(T.t || 'Lee el texto')}</span></summary><div class="txb${verse ? ' verse' : ''}">${paras.join('')}${T.src ? `<p class="src">${esc(T.src)}</p>` : ''}</div></details>`;
  };
  const formula = it => it.f ? `<div class="qf">${rich(it.f)}</div>` : '';
  // El texto de lectura se muestra abierto la primera vez y plegado si la pregunta anterior era del mismo texto.
  let openTx = true;
  const qHead = (it, text) => { const q = text != null ? text : it.q; return `<div class="qk">${KIND[it.t]}</div>${passage(it, openTx)}<div class="qt${String(q).length > 110 ? ' long' : ''}"><span class="qtx">${rich(q)}</span>${RB.canSpeak ? `<button class="ib say" data-say type="button" aria-label="Leer en voz alta">${I('vol')}</button>` : ''}</div>${formula(it)}`; };
  const optBtn = (html, v, k) => `<button class="opt" data-v="${v}" type="button"><span class="k">${k}</span><span class="ot">${html}</span></button>`;
  const L = k => String.fromCharCode(65 + k);
  const plainT = s => String(s).replace(/\*\*|==/g, '');
  // Lee la pregunta tal como se ve: las opciones van en el orden barajado de la pantalla.
  const sayText = (it, body) => {
    const shown = sel => $$(sel, body).map(x => x.textContent.trim());
    const end = s => /[.:?!]$/.test(s) ? s + ' ' : s + '. ';
    if (it.t === 'fill') return plainT(it.s).replace('___', 'espacio en blanco') + '. Opciones: ' + shown('.fill-bank .chipw').join(', ');
    if (it.t === 'tf') return plainT(it.q) + '. ¿Verdadero o falso?';
    if (it.t === 'mc') return end(plainT(it.q)) + shown('.opt .ot').map((o, k) => `${L(k)}: ${o}`).join('. ');
    if (it.t === 'multi') return end(plainT(it.q)) + shown('.opt .ot').join('. ');
    return plainT(it.q || '');
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
    body.innerHTML = qHead(it) + `<div class="opts">${opts.map((o, k) => optBtn(rich(o.t), o.i, L(k))).join('')}</div>`;
    pickOne(body, v => { sel = +v; api.ready(true); });
    return { check: () => { reveal(body, String(sel), '0'); return { ok: sel === 0, right: rich(it.o[0]) }; } };
  };
  R.tf = (it, body, api) => {
    let sel = null;
    body.innerHTML = qHead(it) + `<div class="opts tf">${optBtn('Verdadero', '1', 'V')}${optBtn('Falso', '0', 'F')}</div>`;
    pickOne(body, v => { sel = v; api.ready(true); });
    return { check: () => { const r = it.a ? '1' : '0'; reveal(body, sel, r); return { ok: sel === r, right: it.a ? 'Verdadero' : 'Falso' }; } };
  };
  R.multi = (it, body, api) => {
    const opts = shuffle(it.o.map((t, i) => ({ t, i }))), sel = new Set();
    body.innerHTML = qHead(it) + `<div class="opts multi">${opts.map(o => `<button class="opt" type="button" data-v="${o.i}" aria-pressed="false"><span class="k box">${I('check')}</span><span class="ot">${rich(o.t)}</span></button>`).join('')}</div>`;
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
        return { ok, right: it.a.map(i => '· ' + rich(it.o[i])).join('<br>') };
      },
    };
  };
  R.fill = (it, body, api) => {
    const [a, b] = it.s.split('___'), opts = shuffle(it.o.map((t, i) => ({ t, i })));
    let sel = null;
    body.innerHTML = qHead(it, it.q || '') + `<p class="fill">${rich(a)}<button class="blank" type="button" aria-label="Espacio en blanco">&nbsp;</button>${rich(b || '')}</p>` +
      `<div class="fill-bank">${opts.map(o => `<button class="chipw" type="button" data-v="${o.i}">${rich(o.t)}</button>`).join('')}</div>`;
    const blank = $('.blank', body);
    body.addEventListener('click', e => {
      if (body.dataset.locked) return;
      const c = e.target.closest('.fill-bank .chipw');
      if (c) {
        sel = +c.dataset.v;
        blank.innerHTML = rich(it.o[sel]);
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
    return { check: () => { body.dataset.locked = '1'; const ok = sel === 0; blank.classList.add(ok ? 'ok' : 'bad'); return { ok, right: `${rich(a)}<b>${rich(it.o[0])}</b>${rich(b || '')}` }; } };
  };
  R.order = (it, body, api) => {
    const items = it.o.map((t, i) => ({ t, i })), bank = shuffle(items), ans = [];
    body.innerHTML = qHead(it) + `<ol class="ord-ans"></ol><div class="ord-bank"></div>`;
    const draw = () => {
      $('.ord-ans', body).innerHTML = ans.map((o, k) => `<li><button class="chipw on" type="button" data-i="${o.i}"><span class="k">${k + 1}</span><span>${rich(o.t)}</span></button></li>`).join('') +
        (ans.length < items.length ? `<li class="ph">${ans.length + 1}</li>` : '');
      $('.ord-bank', body).innerHTML = bank.map(o => ans.includes(o) ? '' : `<button class="chipw" type="button" data-b="${o.i}">${rich(o.t)}</button>`).join('');
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
        return { ok, right: `<ol class="rl">${it.o.map(t => `<li>${rich(t)}</li>`).join('')}</ol>` };
      },
    };
  };
  R.match = (it, body, api) => {
    const Lf = shuffle(it.p.map((p, i) => ({ s: p[0], i }))), Rr = shuffle(it.p.map((p, i) => ({ s: p[1], i })));
    let selL = null, selR = null, done = 0, mistakes = 0;
    body.innerHTML = qHead(it) + `<div class="match"><div class="mcol">${Lf.map(o => `<button class="mt" type="button" data-side="l" data-i="${o.i}">${rich(o.s)}</button>`).join('')}</div>` +
      `<div class="mcol">${Rr.map(o => `<button class="mt" type="button" data-side="r" data-i="${o.i}">${rich(o.s)}</button>`).join('')}</div></div>`;
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
          setTimeout(() => api.finish(mistakes === 0, it.p.map(p => `${rich(p[0])} → ${rich(p[1])}`).join('<br>'),
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
    const draw = () => { $('.sort-n', body).textContent = `${k + 1} de ${cards.length}`; card.className = 'scard'; card.style.transform = ''; card.innerHTML = rich(cards[k].s); };
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
        api.finish(wrong.length === 0, wrong.map(w => `${rich(w.s)} → ${esc(it.c[w.c])}`).join('<br>'));
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
  // Valor numérico con teclado propio (como en una calculadora), para no abrir el teclado del sistema.
  R.num = (it, body, api) => {
    let s = '';
    body.innerHTML = qHead(it) + `<div class="numk"><output class="nv"><b>&nbsp;</b>${it.u ? ` <span>${esc(it.u)}</span>` : ''}</output>` +
      `<div class="kp">${['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0', ','].map(k => `<button class="chipw" type="button" data-k="${k}">${k === '-' ? '−' : k}</button>`).join('')}<button class="chipw wide" type="button" data-k="del" aria-label="Borrar">⌫</button></div></div>`;
    const out = $('.nv b', body);
    const draw = () => { out.textContent = s ? s.replace('-', '−') : ' '; api.ready(/\d/.test(s)); };
    body.addEventListener('click', e => {
      const b = e.target.closest('[data-k]');
      if (!b || body.dataset.locked) return;
      const k = b.dataset.k;
      if (k === 'del') s = s.slice(0, -1);
      else if (k === '-') s = s.startsWith('-') ? s.slice(1) : '-' + s;
      else if (k === ',') { if (!s.includes(',')) s = (s.replace('-', '') ? s : s + '0') + ','; }
      else if (s.replace(/[-,]/g, '').length < 9) s += k;
      SFX.tap(); draw();
    });
    return {
      check: () => {
        body.dataset.locked = '1';
        const v = parseFloat(s.replace(',', '.')), ok = Math.abs(v - it.a) <= (it.tol || 1e-9);
        $('.nv', body).classList.add(ok ? 'ok' : 'bad');
        return { ok, right: `${String(it.a).replace('.', ',')}${it.u ? ' ' + esc(it.u) : ''}` };
      },
    };
  };
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
  R.info = (it, body) => {
    body.innerHTML = `<div class="infoc">${I(it.ic || 'info')}<h2>${esc(it.title)}</h2><p>${rich(it.txt)}</p></div>`;
    return {};
  };

  function startSession(cfg) {
    regen();
    const useHearts = (cfg.kind === 'lesson' || cfg.kind === 'practice') && !S.set.inf;
    if (useHearts && S.hearts <= 0) return noHearts();
    const ses = {
      cfg, useHearts, queue: cfg.items.map(it => ({ it, retry: false })), i: 0, total: cfg.items.length, resolved: 0,
      firstOk: 0, graded: 0, combo: 0, t0: Date.now(), finished: false, dead: false,
    };
    const lives = useHearts ? `<span class="ses-hp" title="Vidas">${I('heart')}<b>${S.hearts}</b></span>` : '';
    const ent = openLayer('ses', `<header class="ses-h"><button class="ib" type="button" data-x aria-label="Salir">${I('x')}</button><div class="pbar" role="progressbar" aria-label="Progreso" aria-valuemin="0" aria-valuemax="100"><i></i></div>${lives}</header>` +
      `<main class="ses-b"></main><footer class="ses-f"><div class="fb" aria-live="polite"></div><button class="btn" type="button" data-go disabled>Comprobar</button></footer>`,
      () => { ses.dead = true; RB.hush(); if (curSes === ses) curSes = null; });
    ent.guard = () => ses.finished;
    ent.ask = { title: '¡Espera, no te vayas!', text: 'Si sales ahora, perderás el progreso de esta sesión.', ok: 'Salir', cancel: 'Seguir estudiando' };
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
    RB.hush();
    const body = D.createElement('main');
    body.className = 'ses-b';
    $('.ses-b', ses.el).replaceWith(body);
    const foot = $('.ses-f', ses.el), goB = $('[data-go]', ses.el);
    foot.className = 'ses-f';
    $('.fb', ses.el).innerHTML = '';
    goB.className = 'btn'; goB.disabled = true; goB.textContent = 'Comprobar';
    progress(ses);
    openTx = !(it.tx && ses.lastTx === it.tx);
    ses.lastTx = it.tx || null;
    const api = { ready: on => { if (ses.state === 'answer') goB.disabled = !on; }, finish: (ok, right, extra) => grade(ses, ok, right, extra) };
    ses.r = R[it.t](it, body, api, ses);
    if (!GRADED(it)) { ses.state = 'info'; goB.disabled = false; goB.textContent = 'Continuar'; }
    if (q.retry) body.insertAdjacentHTML('afterbegin', `<div class="retry">${I('replay')}Pregunta que fallaste antes</div>`);
    if (ses.cfg.tag && it._u && RB.units[it._u]) body.insertAdjacentHTML('afterbegin', `<div class="utag">${I(RB.units[it._u].ic)}${esc(RB.units[it._u].name)}</div>`);
    const sb = $('[data-say]', body);
    if (sb) sb.onclick = () => RB.say(sayText(it, body));
  }
  function grade(ses, ok, right, extra = {}) {
    if (ses.state !== 'answer') return;
    ses.state = 'fb';
    const q = ses.cur, it = q.it, soft = it.t === 'match' || it.t === 'sort', kind = ses.cfg.kind;
    if (!q.retry) { ses.graded++; if (ok) ses.firstOk++; (ses.log = ses.log || []).push([it, ok]); }
    record(it, ok);
    let requeued = false;
    if (ok) { ses.combo++; SFX.ok(); } else {
      ses.combo = 0; SFX.bad(); buzz(140);
      if (!soft) {
        if (ses.useHearts) { loseHeart(); const hp = $('.ses-hp b', ses.el); if (hp) hp.textContent = S.hearts; }
        if (!q.retry && (kind === 'lesson' || kind === 'practice' || kind === 'review')) { ses.queue.push({ it, retry: true }); requeued = true; }
      }
    }
    if (!requeued) ses.resolved++;
    progress(ses);
    const praise = ['¡Correcto!', '¡Muy bien!', '¡Excelente!', '¡Perfecto!', '¡Así se hace!', '¡Bien ahí!'];
    let msg = ok ? `<div class="fb-t">${I('check')}<span>${praise[Math.floor(Math.random() * praise.length)]}</span></div>`
      : `<div class="fb-t">${I('x')}<span>${right ? 'Respuesta correcta:' : 'Incorrecto'}</span></div>`;
    if (!ok && right) msg += `<div class="fb-r">${right}</div>`;
    if (extra && extra.html) msg += extra.html;
    if (it.e) msg += `<p class="fb-e">${rich(it.e)}</p>`;
    $('.ses-f', ses.el).className = 'ses-f ' + (ok ? 'ok' : 'bad');
    $('.fb', ses.el).innerHTML = msg;
    const goB = $('[data-go]', ses.el);
    goB.disabled = false; goB.textContent = 'Continuar'; goB.className = 'btn' + (ok ? '' : ' w');
    if (ok && ses.combo >= 5 && ses.combo % 5 === 0) toast(`${I('flame')}<b>¡${ses.combo} seguidas!</b>`, 1300);
    goB.focus({ preventScroll: true });
  }
  function next(ses) {
    if (ses.useHearts && S.hearts <= 0) return endSession(ses, 'hearts');
    if (++ses.i >= ses.queue.length) return endSession(ses, 'done');
    showItem(ses);
  }
  function endSession(ses, why) {
    ses.finished = true;
    RB.hush();
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
    if (cfg.kind === 'diag') {
      const by = diagResult(ses);
      bumpStreak(); addXP(10); save(); SFX.done();
      body.innerHTML = `<div class="res"><div class="res-ic">${I('target')}</div><h2>¡Diagnóstico listo!</h2><p class="muted">Ajusté tu plan con estos resultados.</p>` +
        `<div class="card diagr">${Object.entries(by).map(([id, [g, n]]) => `<div class="accr"><b>${I(testInfo(id).ic)}${esc(testInfo(id).n)}</b><span>${g}/${n}</span><i class="meter" aria-hidden="true"><i style="width:${Math.round(100 * g / n)}%"></i></i></div>`).join('')}</div></div>`;
      goB.textContent = 'Ver mi plan';
      goB.onclick = () => closeLayer(() => { if (cfg.onDone) cfg.onDone(by); else refresh(); });
      return;
    }
    let xp = 0, title = '¡Sesión completada!', ic = 'trophy', extra = '';
    if (cfg.kind === 'review') mark(cfg.src === 'mis' ? 'mis' : 'rev');
    if (cfg.mix) mark('mix_' + S.test);
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
    }
    const streakUp = bumpStreak(), goalHit = addXP(xp);
    S.tests[S.test] = 1;
    save();
    SFX.done();
    body.innerHTML = `<div class="res"><div class="res-ic">${I(ic)}</div><h2>${title}</h2>${extra}` +
      `<div class="tiles"><div class="tile"><small>XP</small><b>+${xp}</b></div><div class="tile"><small>Precisión</small><b>${acc}%</b></div><div class="tile"><small>Tiempo</small><b>${fmtTime(secs)}</b></div></div>` +
      (perfect ? `<p class="note">${I('star')}¡Sin errores!</p>` : '') +
      `<p class="note">${I('flame', 'on')}${streakUp ? '¡Racha extendida! ' : ''}${plural(streakNow(), 'día', 'días')} de racha</p>` +
      (goalHit ? `<p class="note">${I('target')}¡Meta diaria cumplida!</p>` : '') + `</div>`;
    checkAch();
  }

  function startLesson(lid) {
    const l = LESSONS[lid];
    startSession({ kind: 'lesson', lid, items: l.items.slice() });
  }
  function startReview() {
    let items = dueItems().slice(0, 12);
    if (items.length < 6) {
      const doneItems = cLessons().filter(l => S.done[l.id]).flatMap(l => l.items).filter(GRADED);
      items = uniq(items.concat(shuffle(doneItems))).slice(0, 12);
    }
    if (!items.length) { toast(`${I('info')}<span>Completa algunas lecciones y aquí aparecerán tus preguntas para repasar.</span>`, 3200); return; }
    startSession({ kind: 'review', items, tag: true });
  }
  function startMistakes() {
    const items = wrongItems().slice(0, 12);
    if (!items.length) { toast(`${I('check')}<span>No tienes errores pendientes en esta prueba.</span>`, 3000); return; }
    startSession({ kind: 'review', items: shuffle(items), tag: true, src: 'mis' });
  }
  function startTopic(uid) {
    const items = shuffle(unitItems(RB.units[uid]).filter(GRADED)).slice(0, 12);
    startSession({ kind: 'practice', uid, items });
  }
  function startMix() {
    const items = shuffle(cItems().filter(GRADED)).slice(0, 15);
    startSession({ kind: 'practice', items, tag: true, mix: true });
  }
  function noHearts() {
    sheet(`<small class="kick">Sin vidas</small><h3>Descansa un momento</h3><p class="muted">Recuperas una vida cada 30 minutos (la próxima en ${nextHeartMin()} min). Haz un repaso para ganar una ahora, o desactiva las vidas en Perfil → Ajustes.</p>` +
      `<button class="btn" data-rev>${I('replay')}Repasar y ganar una vida</button><button class="btn ghost" data-close>Volver</button>`, el => {
      $('[data-rev]', el).onclick = () => closeLayer(startReview);
      $('[data-close]', el).onclick = () => closeLayer();
    });
  }

  // ---------- Ensayo PAES ----------
  // Puntaje estimado en la escala PAES (100 a 1.000). La escala oficial depende de cada proceso de admisión.
  const paesPts = (good, n) => n ? Math.round((100 + 900 * Math.pow(good / n, 1.08)) / 5) * 5 : 100;
  function examSheet() {
    const T = testInfo(), pool = cItems().filter(it => EXAMT.includes(it.t)).length, full = Math.min(T.ex.n, pool);
    const opts = [[15, 20, 'Mini'], [30, 45, 'Medio'], [full, T.ex.min, 'Completo']].filter(o => o[0] <= pool);
    sheet(`<small class="kick">Ensayo PAES · ${esc(T.n)}</small><h3>¿De qué largo?</h3><p class="muted">El ensayo completo usa la cantidad de preguntas y el tiempo de la prueba real (${T.ex.n} preguntas, ${fmtTime(T.ex.min * 60)} h). Al final verás un puntaje estimado de 100 a 1.000.</p>` +
      `<div class="goals">${opts.map(([n, m, name]) => `<button class="goalc" type="button" data-n="${n}" data-m="${m}"><b>${name}</b><span>${n} preguntas · ${m} min</span></button>`).join('')}</div>`, el => {
      $('.goals', el).onclick = e => { const b = e.target.closest('[data-n]'); if (b) closeLayer(() => startExam(+b.dataset.n, +b.dataset.m)); };
    });
  }
  function startExam(N, mins) {
    const T = testInfo(), pool = cItems().filter(it => EXAMT.includes(it.t)), byU = {};
    shuffle(pool).forEach(it => { (byU[it._u] = byU[it._u] || []).push(it); });
    const keys = shuffle(Object.keys(byU)), qs = [];
    N = Math.min(N, pool.length);
    for (let k = 0; qs.length < N; k++) { const arr = byU[keys[k % keys.length]]; if (arr.length) qs.push(arr.pop()); }
    // Las preguntas de un mismo texto quedan juntas, como en la prueba.
    qs.sort((a, b) => (a.tx || '').localeCompare(b.tx || '') || 0);
    const ordered = T.id === 'lec' ? qs : shuffle(qs);
    const ex = { Q: ordered.map(it => ({ it, ans: null, flag: false, ord: it.o ? shuffle(it.o.map((_, j) => j)) : null })), i: 0, t0: Date.now(), dur: mins * 60, done: false };
    const ent = openLayer('ses exam', `<header class="ses-h"><button class="ib" type="button" data-x aria-label="Salir">${I('x')}</button><div class="ex-n"></div><span class="ex-t" aria-label="Tiempo restante">${I('clock')}<b></b></span><button class="ib" type="button" data-grid aria-label="Ver todas las preguntas">${I('grid')}</button></header>` +
      `<main class="ses-b"></main><footer class="ses-f ex-f"><button class="btn ghost" type="button" data-prev>Anterior</button><button class="btn" type="button" data-next>Siguiente</button></footer>`, () => clearInterval(ex.timer));
    ent.guard = () => ex.done;
    ent.ask = { title: '¿Salir del ensayo?', text: 'Se perderán tus respuestas.', ok: 'Salir', cancel: 'Seguir con el ensayo' };
    const el = ent.el;
    const answered = q => q.ans != null;
    const draw = () => {
      const q = ex.Q[ex.i], it = q.it;
      $('.ex-n', el).textContent = `Pregunta ${ex.i + 1} de ${ex.Q.length}`;
      let opts;
      if (it.t === 'tf') opts = `<div class="opts tf">${[true, false].map((v, j) => `<button class="opt${q.ans === v ? ' sel' : ''}" type="button" data-v="${v}"><span class="k">${j ? 'F' : 'V'}</span><span class="ot">${v ? 'Verdadero' : 'Falso'}</span></button>`).join('')}</div>`;
      else opts = `<div class="opts">${q.ord.map((j, k) => `<button class="opt${q.ans === j ? ' sel' : ''}" type="button" data-v="${j}"><span class="k">${L(k)}</span><span class="ot">${rich(it.o[j])}</span></button>`).join('')}</div>`;
      const qtext = it.t === 'fill' ? it.s.replace('___', '______') : it.q;
      const prevTx = ex.i > 0 && ex.Q[ex.i - 1].it.tx === it.tx;
      $('.ses-b', el).innerHTML = `<div class="qk">${it.t === 'tf' ? 'Verdadero o falso' : 'Una respuesta'}<button class="flagb${q.flag ? ' on' : ''}" type="button" data-flag>${I('flag')}${q.flag ? 'Marcada' : 'Marcar para revisar'}</button></div>` +
        passage(it, !prevTx) + `<div class="qt"><span class="qtx">${rich(qtext)}</span></div>${formula(it)}${opts}`;
      $('[data-prev]', el).disabled = ex.i === 0;
      $('[data-next]', el).textContent = ex.i === ex.Q.length - 1 ? 'Terminar' : 'Siguiente';
      $('.ses-b', el).scrollTop = 0;
    };
    $('.ses-b', el).addEventListener('click', e => {
      if (e.target.closest('[data-flag]')) { const q = ex.Q[ex.i]; q.flag = !q.flag; draw(); return; }
      const b = e.target.closest('.opt');
      if (!b || ex.done) return;
      const q = ex.Q[ex.i], v = b.dataset.v;
      if (q.it.t === 'tf') q.ans = v === 'true'; else q.ans = +v;
      SFX.tap();
      draw();
    });
    $('[data-x]', el).onclick = () => history.back();
    $('[data-prev]', el).onclick = () => { if (ex.i > 0) { ex.i--; draw(); } };
    $('[data-next]', el).onclick = () => {
      if (ex.i < ex.Q.length - 1) { ex.i++; draw(); return; }
      const left = ex.Q.filter(q => !answered(q)).length;
      if (left) {
        ask({ title: `Tienes ${plural(left, 'pregunta', 'preguntas')} sin responder`, text: 'Las preguntas sin responder cuentan como incorrectas (en la PAES no se descuenta por error, así que conviene responder todo).', ok: 'Terminar igual', cancel: 'Seguir respondiendo', danger: false })
          .then(ok => { if (ok) finish(); });
        return;
      }
      finish();
    };
    $('[data-grid]', el).onclick = () => sheet(`<small class="kick">Ensayo</small><h3>Ir a una pregunta</h3><p class="muted">En blanco, las respondidas; con borde lima, las marcadas para revisar.</p><div class="grid35">${ex.Q.map((q, k) => `<button type="button" class="${answered(q) ? 'a' : ''}${q.flag ? ' f' : ''}${k === ex.i ? ' cur' : ''}" data-k="${k}">${k + 1}</button>`).join('')}</div>`, s => {
      $('.grid35', s).onclick = e => { const b = e.target.closest('[data-k]'); if (b) closeLayer(() => { ex.i = +b.dataset.k; draw(); }); };
    });
    const tick = () => {
      const left = ex.dur - Math.floor((Date.now() - ex.t0) / 1000);
      const t = $('.ex-t', el);
      $('b', t).textContent = fmtTime(Math.max(0, left));
      t.classList.toggle('low', left <= 300);
      if (left <= 0 && !ex.done) finish(true);
    };
    tick();
    ex.timer = setInterval(tick, 1000);
    const okOf = q => q.it.t === 'tf' ? q.ans === q.it.a : q.ans === 0;
    const ansText = (it, a) => a == null ? '<i>Sin responder</i>' : it.t === 'tf' ? (a ? 'Verdadero' : 'Falso') : rich(it.o[a]);
    const rightText = it => it.t === 'tf' ? (it.a ? 'Verdadero' : 'Falso') : rich(it.o[0]);
    function finish(auto) {
      ex.done = true;
      clearInterval(ex.timer);
      let good = 0;
      const byUnit = {};
      ex.Q.forEach(q => { q.ok = okOf(q); if (q.ok) good++; record(q.it, q.ok); const u = byUnit[q.it._u] || (byUnit[q.it._u] = [0, 0]); u[1]++; if (q.ok) u[0]++; });
      const pts = paesPts(good, ex.Q.length), secs = Math.min(ex.dur, Math.round((Date.now() - ex.t0) / 1000));
      S.exams.unshift({ d: today(), t: S.test, good, n: ex.Q.length, pts, secs });
      S.exams = S.exams.slice(0, 50);
      const xp = 10 + Math.round(good / 2), streakUp = bumpStreak(), goalHit = addXP(xp);
      S.tests[S.test] = 1;
      save();
      SFX.done();
      $('.ex-n', el).textContent = 'Resultado';
      $('[data-grid]', el).hidden = true;
      $('.ex-t', el).hidden = true;
      const weak = Object.entries(byUnit).map(([u, [a, n]]) => ({ u: RB.units[u], a, n, p: a / n })).sort((x, y) => x.p - y.p);
      $('.ses-b', el).innerHTML = `<div class="res">${auto ? '<p class="muted">Se acabó el tiempo.</p>' : ''}<small class="kick">Puntaje estimado</small><div class="score pass"><b>${pts}</b><span>/ 1.000</span></div>` +
        `<p class="muted">${good} de ${ex.Q.length} correctas · ${fmtTime(secs)}</p>` +
        `<p class="note">${I('bolt')}+${xp} XP${streakUp ? ` · ${I('flame', 'on')}¡Racha extendida!` : ''}${goalHit ? ` · ${I('target')}¡Meta cumplida!` : ''}</p></div>` +
        `<h3 class="st">Por unidad</h3><div class="card accl">${weak.map(w => `<div class="accr"><b>${esc(w.u.name)}</b><span>${w.a}/${w.n}</span><i class="meter" aria-hidden="true"><i style="width:${Math.round(100 * w.p)}%"></i></i></div>`).join('')}</div>` +
        `<h3 class="st">Revisión</h3><ol class="rev">${ex.Q.map((q, k) => `<li class="${q.ok ? 'ok' : 'bad'}"><details><summary>${I(q.ok ? 'check' : 'x')}<span>${k + 1}. ${rich(q.it.t === 'fill' ? q.it.s.replace('___', '______') : q.it.q)}</span></summary>` +
          `<p><small>Tu respuesta:</small> ${ansText(q.it, q.ans)}</p><p><small>Correcta:</small> ${rightText(q.it)}</p>${q.it.e ? `<p class="muted">${rich(q.it.e)}</p>` : ''}</details></li>`).join('')}</ol>`;
      $('.ses-b', el).scrollTop = 0;
      const f = $('.ex-f', el);
      f.innerHTML = `<button class="btn" type="button">Volver</button>`;
      $('button', f).onclick = () => closeLayer(refresh);
      checkAch();
    }
    draw();
  }

  // ---------- Videos ----------
  // o.lid: el video se abrió al entrar a esa lección; al terminar, se sigue con sus ejercicios.
  function openVideo(id, o = {}) {
    const vd = RB.videos[id], u = RB.units[vd.u], toon = vd.kind === 'toon';
    let player = null;
    RB.hush();
    const ent = openLayer('vidl', `<div class="plv"></div>`, () => { if (player) player.destroy(); setTimeout(refresh, 0); });
    ent.back = () => !!(player && player.back());
    S.vpos = S.vpos || {};
    // Los videos en dibujos parten sin subtítulos (menos texto en pantalla); se activan con el botón CC.
    player = new RB.VPlayer($('.plv', ent.el), id, {
      cc: toon ? !!S.set.cc2 : S.set.cc, rate: S.set.rate, music: S.set.music !== false, sfx: S.set.sound, start: S.vpos[id] || 0,
      onClose: () => closeLayer(),
      onCc: on => { if (toon) S.set.cc2 = on; else S.set.cc = on; save(); },
      onRate: r => { S.set.rate = r; save(); },
      onMusic: on => { S.set.music = on; save(); },
      onPos: t => { if (t > 8 && t < RB.videoSecs(id) - 10) S.vpos[id] = Math.round(t); else delete S.vpos[id]; save(); },
      onQuiz: ok => { if (ok) { S.vq++; save(); } else buzz(80); },
      onReady: (p, st) => {
        if (st) toast(`${I('play')}<span>Seguimos donde quedaste · ${fmtTime(st)}</span>`, 2600);
        p.play();
      },
      onEnd: box => {
        const first = !S.seen[id];
        S.seen[id] = S.seen[id] || today();
        let xp = 0, streakUp = false;
        if (first) { xp = 10; streakUp = bumpStreak(); addXP(xp); }
        S.tests[S.test] = 1;
        save(); checkAch();
        const l1 = (o.lid && LESSONS[o.lid]) || u.lessons.find(l => l.vid === id) || u.lessons.find(l => !S.done[l.id]) || u.lessons[0];
        box.innerHTML = (xp ? `<p class="note">${I('bolt')}+${xp} XP${streakUp ? ` · ${I('flame', 'on')}¡Racha extendida!` : ''}</p>` : '') +
          `<button class="btn" type="button" data-l>${I('pen')}${S.done[l1.id] ? 'Repasar' : 'Ahora, los ejercicios'}: ${esc(l1.n)}</button><button class="btn ghost" type="button" data-p>${I('target')}Práctica mixta del tema</button>`;
        $('[data-l]', box).onclick = () => closeLayer(() => startLesson(l1.id));
        $('[data-p]', box).onclick = () => closeLayer(() => startTopic(u.id));
      },
    });
  }

  // ---------- Practicar ----------
  VIEWS.practicar = v => {
    const T = testInfo(), due = dueItems().length, wr = wrongItems().length, last = S.exams.find(e => e.t === S.test);
    const best = S.exams.filter(e => e.t === S.test && e.n >= 30).reduce((m, e) => Math.max(m, e.pts), 0);
    v.innerHTML = `<h1 class="vt">Practicar</h1><p class="muted">${esc(T.n)}</p>
      <button class="pcard big" type="button" data-act="exam">${I('exam')}<div><b>Ensayo PAES</b><span>Mini, medio o completo (${T.ex.n} preguntas) con tiempo y puntaje estimado</span>${last ? `<em>Último: ${last.pts} pts · ${last.good}/${last.n}${best ? ` · mejor ${best}` : ''}</em>` : ''}</div></button>
      <div class="pgrid">
        <button class="pcard" type="button" data-act="review">${I('replay')}<b>Repaso inteligente</b><span>${due ? plural(due, 'pregunta pendiente', 'preguntas pendientes') : 'Estás al día'}</span></button>
        <button class="pcard" type="button" data-act="mistakes">${I('x')}<b>Mis errores</b><span>${wr ? plural(wr, 'pregunta por reforzar', 'preguntas por reforzar') : 'Sin errores pendientes'}</span></button>
        <button class="pcard" type="button" data-act="mix">${I('spark')}<b>Práctica mixta</b><span>15 preguntas de toda la prueba</span></button>
        <button class="pcard" type="button" data-act="blitz">${I('bolt')}<b>Contrarreloj</b><span>60 segundos · récord ${S.blitz}</span></button>
        <button class="pcard wide" type="button" data-act="guide">${I('search')}<b>Guía de estudio</b><span>Busca entre ${plural(cItems().filter(GRADED).length, 'pregunta', 'preguntas')} con su respuesta explicada</span></button>
      </div>
      <h2 class="st">Práctica por unidad</h2>
      <div class="topics">${cUnits().map(u => { const a = accOf(unitItems(u)), m = mastery(unitItems(u)); return `<button class="topic" type="button" data-u="${u.id}">${I(u.ic)}<span><b>${esc(u.name)}</b><small>${a == null ? `${unitItems(u).filter(GRADED).length} preguntas · sin práctica aún` : `Dominio ${m}% · precisión ${a}%`}</small></span><i class="meter" aria-hidden="true"><i style="width:${m}%"></i></i></button>`; }).join('')}</div>
      <p class="foot">El puntaje del ensayo es una estimación para orientarte: la conversión oficial a la escala PAES la publica el DEMRE en cada proceso.</p>`;
    v.onclick = e => {
      const b = e.target.closest('[data-act],[data-u]');
      if (!b) return;
      if (b.dataset.u) return startTopic(b.dataset.u);
      ({ exam: examSheet, review: startReview, mistakes: startMistakes, mix: startMix, blitz: startBlitz, guide: openGuide })[b.dataset.act]();
    };
  };

  // ---------- Contrarreloj: todas las que puedas en 60 segundos ----------
  function startBlitz() {
    const pool = shuffle(cItems().filter(it => (it.t === 'tf' || it.t === 'mc') && !it.tx && it.q.length < 160));
    const st = { i: 0, score: 0, miss: 0, t0: Date.now(), dur: 60, done: false, lock: false };
    const ent = openLayer('ses blitz', `<header class="ses-h"><button class="ib" type="button" data-x aria-label="Salir">${I('x')}</button><div class="pbar tbar" role="timer" aria-label="Tiempo restante"><i style="width:100%"></i></div><span class="ses-hp" title="Correctas">${I('bolt')}<b>0</b></span></header>` +
      `<main class="ses-b"></main><footer class="ses-f"><p class="muted center">Responde todas las que puedas en 60 segundos.</p></footer>`, () => { st.done = true; cancelAnimationFrame(st.raf); });
    ent.guard = () => st.done;
    ent.ask = { title: '¿Salir del contrarreloj?', text: 'El puntaje de esta partida no se guardará.', ok: 'Salir', cancel: 'Seguir jugando' };
    const el = ent.el;
    $('[data-x]', el).onclick = () => history.back();
    const draw = () => {
      const it = pool[st.i % pool.length];
      const opts = it.t === 'tf' ? `<div class="opts tf">${optBtn('Verdadero', it.a ? 'ok' : 'no', 'V')}${optBtn('Falso', it.a ? 'no' : 'ok', 'F')}</div>`
        : `<div class="opts">${shuffle(it.o.map((t, j) => ({ t, j }))).map((o, k) => optBtn(rich(o.t), o.j === 0 ? 'ok' : 'no', L(k))).join('')}</div>`;
      $('.ses-b', el).innerHTML = `<div class="qk">${it.t === 'tf' ? '¿Verdadero o falso?' : 'Elige la correcta'}</div><div class="qt"><span class="qtx">${rich(it.q)}</span></div>${formula(it)}${opts}`;
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
      setTimeout(() => { st.lock = false; st.i++; if (!st.done) draw(); }, ok ? 280 : 1100);
    });
    const finish = () => {
      st.done = true;
      const rec = st.score > S.blitz;
      S.blitz = Math.max(S.blitz, st.score);
      const xp = Math.min(20, 3 + st.score), streakUp = bumpStreak(), goalHit = addXP(xp);
      S.tests[S.test] = 1;
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
  const plain = t => String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const guideQ = it => it.t === 'fill' ? it.s.replace('___', '____') : (it.q || '');
  function guideAnswer(it) {
    const ok = txt => `<p class="ga">${I('check')}<span>${txt}</span></p>`;
    switch (it.t) {
      case 'mc': return ok(rich(it.o[0]));
      case 'fill': { const [a, b] = it.s.split('___'); return ok(`${rich(a)}<b>${rich(it.o[0])}</b>${rich(b || '')}`); }
      case 'tf': return ok(it.a ? 'Verdadero' : 'Falso');
      case 'multi': return `<ul class="gal">${it.a.map(i => `<li>${rich(it.o[i])}</li>`).join('')}</ul>`;
      case 'order': return `<ol class="gal">${it.o.map(t => `<li>${rich(t)}</li>`).join('')}</ol>`;
      case 'match': return `<ul class="gal">${it.p.map(p => `<li>${rich(p[0])} → ${rich(p[1])}</li>`).join('')}</ul>`;
      case 'sort': return `<ul class="gal">${it.k.map(([x, c]) => `<li>${rich(x)} → ${esc(it.c[c])}</li>`).join('')}</ul>`;
      case 'num': return ok(`${String(it.a).replace('.', ',')}${it.u ? ' ' + esc(it.u) : ''}`);
      case 'build': return ok(esc(it.w));
      default: return '';
    }
  }
  function openGuide() {
    const all = cItems().filter(GRADED);
    const ent = openLayer('guide', `<header class="lh"><button class="ib" type="button" data-x aria-label="Cerrar">${I('x')}</button><b>Guía de estudio · ${esc(testInfo().s)}</b></header>` +
      `<div class="lbody"><input class="search" type="search" placeholder="Buscar entre ${all.length} preguntas…" aria-label="Buscar en la guía"><div class="gl"></div></div>`);
    const el = ent.el, box = $('.gl', el), inp = $('.search', el);
    $('[data-x]', el).onclick = () => closeLayer();
    const item = it => `<div class="gq"><p class="gqq">${rich(guideQ(it))}</p>${it.f ? `<p class="gqf">${rich(it.f)}</p>` : ''}${it.tx && RB.texts[it.tx] ? `<p class="gqt">${I('book')}${esc(RB.texts[it.tx].t)}</p>` : ''}${guideAnswer(it)}${it.e ? `<p class="gqe">${rich(it.e)}</p>` : ''}</div>`;
    const list = () => {
      const q = plain(inp.value.trim());
      if (q.length >= 2) {
        const hits = all.filter(it => plain(guideQ(it) + ' ' + JSON.stringify(it.o || it.p || it.k || it.w || '') + ' ' + (it.e || '') + ' ' + (it.f || '')).includes(q));
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
    s += `<line class="gl" x1="0" x2="${W}" y1="${y(S.goal).toFixed(1)}" y2="${y(S.goal).toFixed(1)}"/><text class="glt" x="2" y="${(y(S.goal) - 5).toFixed(1)}">Meta ${S.goal} XP</text></svg>`;
    return `<div class="chart-w">${s}<div class="tip" role="tooltip"></div></div>`;
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
  // Selector de la voz del narrador: muestra las voces en español que tiene el teléfono o el navegador.
  function voiceSheet() {
    const list = RB.tts.refresh();
    const cur = RB.tts.current();
    sheet(`<small class="kick">Lectura en voz alta</small><h3>Voz para leer las preguntas</h3><p class="muted">Los videos traen su propia narradora. Esta voz es la del botón de parlante en las preguntas. ${NAT() ? 'Estas son las voces en español de tu teléfono. Las de mejor calidad suenan más humanas; si no ves ninguna buena, instala “Servicios de voz de Google” y descarga la voz en español desde Ajustes → Texto a voz.' : 'En Windows, “Microsoft Catalina” es la voz chilena; las que dicen “Natural” u “Online” suenan más humanas.'}</p>` +
      `<div class="vlist2">${list.length ? list.map(v => `<button class="row" type="button" data-n="${esc(v.n)}" aria-pressed="${v.n === cur}"><span>${esc(v.n)}<small>${esc(v.l)}${v.q != null && v.q >= 40 ? ' · alta calidad' : ''}${v.net ? ' · usa internet' : ''}</small></span>${v.n === cur ? I('check') : ''}</button>`).join('') : '<p class="muted">No se encontraron voces en español.</p>'}</div>` +
      `<button class="btn ghost" type="button" data-test>${I('vol')}Probar la voz</button>` +
      (NAT() && NAT().ttsSettings ? `<button class="btn ghost" type="button" data-sys>${I('gear')}Ajustes de voz del teléfono</button>` : ''), el => {
      const sys = $('[data-sys]', el);
      if (sys) sys.onclick = () => NAT().ttsSettings();
      $('.vlist2', el).onclick = e => {
        const b = e.target.closest('[data-n]');
        if (!b) return;
        S.set.vname = b.dataset.n; save();
        RB.tts.setPref(S.set.vname);
        if (VIEWS.perfil && tab === 'perfil') setTimeout(() => { const r = $('[data-act="voice"] small'); if (r) r.textContent = S.set.vname; }, 0);
        $$('[data-n]', el).forEach(x => { x.setAttribute('aria-pressed', x === b); const c = $('.ic', x); if (c) c.remove(); });
        b.insertAdjacentHTML('beforeend', I('check'));
        RB.say('Hola. Así sonarán las preguntas cuando toques el parlante.');
      };
      $('[data-test]', el).onclick = () => RB.say('Hola. Vamos a preparar la PAES juntos, un tema a la vez.');
    });
  }
  VIEWS.perfil = v => {
    const T = testInfo(), totalDone = Object.keys(S.done).length, acc = accOf(Object.values(ITEMS));
    const exams = S.exams.slice(0, 6), achN = ACH.filter(a => S.ach[a.id]).length;
    const sw = (k, label, sub, dis) => `<label class="row"><span>${label}${sub ? `<small>${sub}</small>` : ''}</span><input class="sw" type="checkbox" data-set="${k}" ${S.set[k] ? 'checked' : ''} ${dis ? 'disabled' : ''}></label>`;
    const answered = Object.keys(S.q).length;
    v.innerHTML = `<h1 class="vt">Perfil</h1>
      <div class="ptiles">
        <div class="ptile">${I('flame')}<b>${streakNow()}</b><small>Racha actual · mejor ${S.best}</small></div>
        <div class="ptile">${I('bolt')}<b>${S.xp.toLocaleString('es-CL')}</b><small>XP total</small></div>
        <div class="ptile">${I('check')}<b>${totalDone}</b><small>Lecciones completadas</small></div>
        <div class="ptile">${I('target')}<b>${acc == null ? '—' : acc + '%'}</b><small>Precisión global</small></div>
        <div class="ptile">${I('list')}<b>${answered.toLocaleString('es-CL')}</b><small>de ${allGraded().length.toLocaleString('es-CL')} preguntas vistas</small></div>
        <div class="ptile">${I('film')}<b>${Object.keys(S.seen).length}</b><small>de ${Object.keys(RB.videos).length} videos vistos</small></div>
      </div>
      <h2 class="st">Últimos 7 días</h2><div class="card">${weekChart()}</div>
      <h2 class="st">Avance por prueba</h2><div class="card accl">${RB.tests.map(t => { const it = cItems(t), m = mastery(it); return `<div class="accr"><b>${I(t.ic)}${esc(t.n)}</b><span>${m}%</span><i class="meter" aria-hidden="true"><i style="width:${m}%"></i></i></div>`; }).join('')}</div>
      <h2 class="st">Ensayos</h2><div class="card">${exams.length ? `<ul class="exl">${exams.map(e => `<li><span class="pill pass">${e.pts}</span><b>${esc(testInfo(e.t).s)} · ${e.good}/${e.n}</b><small>${esc(new Date(e.d + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'short' }))} · ${fmtTime(e.secs)}</small></li>`).join('')}</ul>` : `<p class="muted">Aún no haces ensayos. Encuéntralos en Practicar.</p>`}</div>
      <h2 class="st">Logros · ${achN} de ${ACH.length}</h2><div class="agrid">${ACH.map(a => `<button class="ach${S.ach[a.id] ? ' on' : ''}" type="button" data-ach="${a.id}"><i>${I(a.ic)}</i><span>${esc(a.n)}</span></button>`).join('')}</div>
      <h2 class="st">Ajustes</h2><div class="set">
        <div class="row"><span>Meta diaria</span><div class="seg" data-goal>${[...new Set([20, 30, 50, 80, S.goal])].sort((x, y) => x - y).map(g => `<button type="button" data-v="${g}" aria-pressed="${S.goal === g}">${g}</button>`).join('')}</div></div>
        <div class="row"><span>Velocidad de los videos</span><div class="seg" data-rate>${[[.75, '0,75'], [1, '1'], [1.25, '1,25'], [1.5, '1,5'], [2, '2']].map(([r, n]) => `<button type="button" data-v="${r}" aria-pressed="${S.set.rate === r}">${n}×</button>`).join('')}</div></div>
        ${sw('cc', 'Subtítulos en los videos')}
        ${sw('music', 'Música en los videos', 'Música suave de fondo, bajo la narración')}
        ${RB.canSpeak ? `<button class="row" type="button" data-act="voice">${I('mic')}<span>Voz para leer las preguntas<small>${esc(S.set.vname || RB.tts.current() || 'Automática')} · los videos traen su propia narradora</small></span></button>` : ''}
        ${sw('sound', 'Sonidos')}${sw('vib', 'Vibración', 'Al equivocarte')}
        ${NAT() && NAT().remind ? `${sw('remind', 'Recordatorio diario', 'Aviso si aún no terminas el plan de hoy')}<div class="row"><span>Hora del recordatorio</span><div class="seg" data-rh>${[17, 18, 19, 20, 21].map(h => `<button type="button" data-v="${h}" aria-pressed="${(S.set.rh || 19) === h}">${h}:00</button>`).join('')}</div></div>` : ''}
        ${sw('inf', 'Vidas ilimitadas', 'Practica sin perder vidas')}
        <button class="row" type="button" data-act="plan">${I('target')}<span>Mi plan de estudio<small>${S.plan && S.plan.date ? `PAES: ${esc(fmtDate(S.plan.date, { day: 'numeric', month: 'short', year: 'numeric' }))} · ${S.plan.mins} min al día · ${selTests().map(tShort).join(', ')}` : 'Responde la encuesta para armarlo'}</small></span></button>
        <button class="row" type="button" data-act="test">${I(T.ic)}<span>Prueba que estudias<small>${esc(T.n)}</small></span></button>
        <button class="row" type="button" data-act="export">${I('down')}<span>Exportar progreso<small>Guarda una copia en un archivo</small></span></button>
        <label class="row">${I('up')}<span>Importar progreso<small>Recupera tu progreso desde un archivo</small></span><input type="file" accept="application/json,.json,text/plain" data-import hidden></label>
        <button class="row danger" type="button" data-act="reset">${I('trash')}<span>Borrar todo el progreso</span></button>
      </div>
      <h2 class="st">Acerca de</h2><div class="card about"><p><b>PAES</b> es una app personal de práctica para la Prueba de Acceso a la Educación Superior: Competencia Lectora, Matemática M1 y M2, Ciencias (Biología, Química y Física) e Historia y Ciencias Sociales.</p><p>Tiene ${allGraded().length.toLocaleString('es-CL')} preguntas y ${Object.keys(RB.videos).length} videos basados en los temarios del DEMRE. No es material oficial: revisa siempre los temarios vigentes.</p><p>Tu progreso se guarda solo en este teléfono. Usa “Exportar progreso” para tener una copia.</p></div>`;
    wireChart(v);
    v.onclick = e => {
      const b = e.target.closest('[data-act],[data-ach],.seg button');
      if (!b) return;
      if (b.dataset.ach) { const a = ACH.find(x => x.id === b.dataset.ach); toast(`${I(a.ic)}<span><small>${S.ach[a.id] ? 'Logro desbloqueado' : 'Logro bloqueado'}</small><b>${esc(a.n)}</b> · ${esc(a.d)}</span>`, 2600); return; }
      const seg = b.closest('.seg');
      if (seg && seg.hasAttribute('data-goal')) { S.goal = +b.dataset.v; save(); refresh(); return; }
      if (seg && seg.hasAttribute('data-rate')) { S.set.rate = +b.dataset.v; save(); refresh(); return; }
      if (seg && seg.hasAttribute('data-rh')) { S.set.rh = +b.dataset.v; save(); syncReminder(); refresh(); return; }
      const a = b.dataset.act;
      if (a === 'test') testSheet();
      else if (a === 'plan') planView();
      else if (a === 'voice') voiceSheet();
      else if (a === 'export') exportData();
      else if (a === 'reset') {
        ask({ title: '¿Borrar todo tu progreso?', text: 'Perderás tus lecciones, XP, rachas, ensayos y logros. No se puede deshacer.', ok: 'Borrar todo', cancel: 'Cancelar' }).then(ok => {
          if (!ok) return;
          S = DEF(); save(); go.scrolled = false; go('aprender'); survey();
        });
      }
    };
    $$('[data-set]', v).forEach(inp => inp.addEventListener('change', () => { S.set[inp.dataset.set] = inp.checked; save(); header(); if (inp.dataset.set === 'remind') syncReminder(); }));
    $('[data-import]', v).addEventListener('change', e => {
      const f = e.target.files[0];
      if (!f) return;
      const rd = new FileReader();
      rd.onload = () => {
        try {
          const o = load(rd.result);
          if (typeof o.xp !== 'number' || typeof o.done !== 'object') throw new Error('formato');
          S = o; save(); refresh();
          toast(`${I('check')}<span>Progreso importado</span>`);
        } catch (er) { toast(`${I('x')}<span>No se pudo leer el archivo. ¿Es una copia exportada desde esta app?</span>`, 3200); }
      };
      rd.readAsText(f);
    });
  };
  function exportData() {
    if (NAT()) { NAT().share(`paes-progreso-${today()}.json`, JSON.stringify(S)); return; }
    const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
    const a = D.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `paes-progreso-${today()}.json`;
    D.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  // ---------- Plan de estudio ----------
  // La encuesta inicial guarda en S.plan la fecha de la PAES, el tiempo y los días disponibles, el nivel en
  // cada prueba, la meta y la forma de estudiar. Con eso se reparte cada día entre las pruebas (más tiempo a
  // las más débiles y a las que tienen más temario), con ensayos semanales y un repaso final antes de la prueba.
  const SCI = ['bio', 'fis', 'qui'];
  const PICK = [
    { id: 'lec', n: 'Competencia Lectora', s: 'LEC', tag: 'Obligatoria', ic: 'book' },
    { id: 'm1', n: 'Matemática M1', s: 'M1', tag: 'Obligatoria', ic: 'calc' },
    { id: 'm2', n: 'Matemática M2', s: 'M2', tag: 'Electiva · carreras científicas', ic: 'sigma' },
    { id: 'his', n: 'Historia y Cs. Sociales', s: 'HIS', tag: 'Electiva', ic: 'landmark' },
    { id: 'sci', n: 'Ciencias', s: 'CIE', tag: 'Electiva · Biología, Física y Química', ic: 'atom' },
  ];
  const UNIT_TEST = {};
  RB.tests.forEach(t => t.units.forEach(u => { UNIT_TEST[u] = t.id; }));
  const ORDER = RB.tests.map(t => t.id);
  const selTests = () => { const s = (S.sel || []).filter(id => ORDER.includes(id)); return s.length ? s : [S.test || 'lec']; };
  const tShort = id => testInfo(id).s;
  const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);
  const fmtDate = (d, o = { day: 'numeric', month: 'long', year: 'numeric' }) => new Date(d + 'T12:00:00').toLocaleDateString('es-CL', o);
  // Fechas de referencia (estimadas): la PAES regular cae a fines de noviembre o inicios de diciembre y la de
  // invierno a mediados de junio. Se toma el lunes más cercano; la persona puede poner la fecha exacta.
  const nearMonday = (y, m, d) => { const x = new Date(y, m, d, 12); let off = (8 - x.getDay()) % 7; if (off > 3) off -= 7; x.setDate(x.getDate() + off); return dayStr(x); };
  function examDates() {
    const y = new Date().getFullYear(), t = today();
    let reg = nearMonday(y, 11, 1); if (reg <= t) reg = nearMonday(y + 1, 11, 1);
    let inv = nearMonday(y, 5, 15); if (inv <= t) inv = nearMonday(y + 1, 5, 15);
    return [{ k: 'reg', n: 'PAES regular', d: reg }, { k: 'inv', n: 'PAES de invierno', d: inv }].sort((a, b) => a.d.localeCompare(b.d));
  }
  const lessonMin = l => Math.max(4, Math.round(l.items.filter(GRADED).length * .45 + 1));
  const videoMin = id => Math.max(3, Math.round(RB.videoSecs(id) / 60));
  const courseOf = tid => cUnits(testInfo(tid)).map(u => ({ u, ls: u.lessons.map(l => ({ l, min: lessonMin(l), vid: l.vid && RB.videos[l.vid] ? l.vid : null, vmin: l.vid && RB.videos[l.vid] ? videoMin(l.vid) : 0 })) }));
  const needMin = (tid, video = true) => courseOf(tid).reduce((s, c) => s + c.ls.reduce((a, x) => a + x.min + (video ? x.vmin : 0), 0), 0);
  const doneMin = (tid, video = true) => courseOf(tid).reduce((s, c) => s + c.ls.reduce((a, x) => a + (S.done[x.l.id] ? x.min : 0) + (video && x.vid && S.seen[x.vid] ? x.vmin : 0), 0), 0);
  const goalFor = mins => clamp(Math.round(mins * 1.2 / 5) * 5, 20, 150);
  function weightsOf(P, tests) {
    const w = {};
    tests.forEach(id => {
      const lv = (P.lvl && P.lvl[id]) || 3;
      let x = 1.55 - .22 * (lv - 1);
      if (SCI.includes(id) && P.sci) x *= id === P.sci ? 1.3 : .7;
      if (P.target >= 800) x *= 1.05;
      w[id] = x * Math.sqrt(Math.max(40, needMin(id)) / 160);
    });
    return w;
  }
  const weekStart = d => { const x = new Date(d + 'T12:00:00'); x.setDate(x.getDate() - x.getDay()); return dayStr(x); };
  function studyDays(P, from) {
    const out = [], end = P.date, wd = P.days && P.days.length ? P.days : [1, 2, 3, 4, 5, 6];
    for (let d = from; d < end && out.length < 500; d = addDays(d, 1)) if (wd.includes(new Date(d + 'T12:00:00').getDay())) out.push(d);
    return out;
  }
  const examLen = (M, tid) => { const T = testInfo(tid); if (M >= T.ex.min + 15) return { n: T.ex.n, min: T.ex.min, name: 'completo' }; if (M >= 55) return { n: 30, min: 45, name: 'medio' }; return { n: 15, min: 20, name: 'mini' }; };
  // Reparto día a día (determinista desde el inicio del plan): cada día toca 1 a 3 pruebas según el tiempo.
  function schedule(P, tests = selTests()) {
    const days = studyDays(P, P.start || today()), n = days.length;
    const f = n ? clamp(Math.round(n * .18), Math.min(2, n), 21) : 0, L = n - f;
    const w = weightsOf(P, tests), sw = tests.reduce((s, id) => s + w[id], 0) || 1, M = P.mins || 30;
    const k = Math.min(tests.length, M <= 30 ? 1 : M <= 75 ? 2 : 3);
    const credit = Object.fromEntries(tests.map(id => [id, 0])), exRot = tests.slice().sort((a, b) => w[b] - w[a]);
    let ei = 0;
    const out = days.map((d, i) => {
      const final = i >= L, lastOfWeek = !days[i + 1] || weekStart(days[i + 1]) !== weekStart(d);
      const exam = (final ? (i - L) % 2 === 0 : lastOfWeek && i >= 3) ? exRot[ei++ % exRot.length] : null;
      tests.forEach(id => { credit[id] += w[id] / sw * k; });
      const focus = tests.slice().sort((a, b) => credit[b] - credit[a] || ORDER.indexOf(a) - ORDER.indexOf(b)).slice(0, k);
      focus.forEach(id => { credit[id] -= 1; });
      return { d, focus, exam, final };
    });
    return { days: out, n, L, f, k, w, sw };
  }
  function planStats(P, tests = selTests()) {
    const sc = schedule(P, tests), M = P.mins || 30, video = P.style !== 'practice', per = {};
    tests.forEach(id => { per[id] = { need: needMin(id, video), done: doneMin(id, video), alloc: 0, days: 0 }; });
    sc.days.forEach(day => {
      if (day.final) return;
      const learn = Math.max(8, M - 5 - (day.exam ? examLen(M, day.exam).min : 0));
      day.focus.forEach(id => { per[id].alloc += learn / day.focus.length; per[id].days++; });
    });
    tests.forEach(id => { const p = per[id]; p.cov = p.need ? Math.min(1, (p.done + p.alloc) / p.need) : 1; p.share = sc.w[id] / sc.sw; });
    return { sc, per };
  }
  function makePlan(A) {
    const tests = expandSel(A.sel, A.sci);
    const P = { v: 1, ver: ((S.plan && S.plan.ver) || 0) + 1, start: today(), date: A.date, dk: A.dk, mins: A.mins, days: A.days.slice().sort(), lvl: A.lvl, target: A.target, career: (A.career || '').trim().slice(0, 60), style: A.style, sci: A.sci, picks: A.sel.slice() };
    const st = planStats(P, tests);
    P.base = tests.reduce((s, id) => s + st.per[id].done, 0);
    P.reach = tests.reduce((s, id) => s + Math.min(st.per[id].need, st.per[id].done + st.per[id].alloc), 0);
    return { P, tests, st };
  }
  const expandSel = (sel, sci) => ORDER.filter(id => sel.includes(id) || (sel.includes('sci') && SCI.includes(id)))
    .sort((a, b) => (SCI.includes(a) && SCI.includes(b) && sci) ? (a === sci ? -1 : b === sci ? 1 : 0) : 0);
  // Ritmo: cuánto debería llevar visto a esta altura según el plan.
  function pace() {
    const P = S.plan;
    if (!P || !P.date) return null;
    const sc = schedule(P), learn = sc.days.filter(d => !d.final), passed = learn.filter(d => d.d < today()).length;
    const exp = learn.length ? passed / learn.length : 1, video = P.style !== 'practice';
    const done = selTests().reduce((s, id) => s + doneMin(id, video), 0), want = P.base + (P.reach - P.base) * exp, diff = done - want;
    if (!isFinite(diff)) return null;
    if (diff >= 25) return { cls: 'ok', txt: 'Vas adelantado' };
    if (diff >= -12) return { cls: 'ok', txt: 'Vas al día' };
    const n = Math.max(1, Math.round(-diff / 10));
    return { cls: 'late', txt: `Vas ${plural(n, 'lección', 'lecciones')} atrasado` };
  }
  const TASK_IC = { video: 'film', lesson: 'pen', exam: 'exam', review: 'replay', mistakes: 'x', mix: 'spark' };
  const TASK_N = { video: 'Video', lesson: 'Lección', exam: 'Ensayo', review: 'Repaso', mistakes: 'Errores', mix: 'Práctica' };
  // Tareas de hoy: se arman una vez al día (así no cambian mientras se avanza) y se marcan solas al cumplirlas.
  function todayPlan() {
    const P = S.plan;
    if (!P || !P.date) return null;
    const t = today();
    if (S.today && S.today.d === t && S.today.v === P.ver) return S.today;
    const sc = schedule(P), M = P.mins || 30, tasks = [];
    let day = sc.days.find(x => x.d === t);
    // El día en que se arma el plan siempre se estudia, aunque no sea día de estudio.
    if (!day && P.start === t) { const nx = sc.days.find(x => x.d > t); day = { d: t, focus: nx ? nx.focus : selTests().slice(0, sc.k || 1), exam: null, final: !!(nx && nx.final) }; }
    const pending = (id, max) => {
      const out = [];
      for (const c of courseOf(id)) {
        c.ls.forEach(x => { if (!S.done[x.l.id]) out.push({ k: 'lesson', t: id, ref: x.l.id, min: x.min + (P.style !== 'practice' && x.vid && !S.seen[x.vid] ? x.vmin : 0), label: x.l.n, u: c.u.name, v: !!x.vid }); });
        if (out.length >= max) break;
      }
      return out;
    };
    const fill = (focus, budget) => {
      const per = Math.max(8, budget / focus.length);
      focus.forEach(id => {
        let left = per;
        const pend = pending(id, 6);
        while (pend.length && left > 3) { const x = pend.shift(); tasks.push(x); left -= x.min; }
        if (!tasks.some(x => x.t === id)) tasks.push({ k: 'mix', t: id, min: 10, label: `Práctica mixta de ${tShort(id)}` });
      });
    };
    if (!day) {
      // Día libre: sugerencias livianas para no perder la racha.
      const nx = sc.days.find(x => x.d > t);
      fill(nx ? nx.focus.slice(0, 1) : selTests().slice(0, 1), 12);
      tasks.splice(1);
      tasks.push({ k: 'review', min: 5, label: 'Repaso inteligente' });
      S.today = { d: t, v: P.ver, free: true, tasks };
    } else {
      let budget = M - 5;
      if (day.exam) { const e = examLen(M, day.exam); tasks.push({ k: 'exam', t: day.exam, n: e.n, min: e.min, label: `Ensayo ${e.name} de ${testInfo(day.exam).n}` }); budget -= e.min; }
      if (day.final) {
        tasks.push({ k: 'mistakes', min: 10, label: 'Repasa tus errores' });
        if (budget > 25) fill(day.focus.slice(0, 1), budget - 10);
      } else if (budget >= 8 || !day.exam) fill(day.focus, Math.max(8, budget));
      tasks.push({ k: 'review', min: 5, label: 'Repaso inteligente' });
      S.today = { d: t, v: P.ver, tasks, final: day.final };
    }
    save();
    return S.today;
  }
  function taskDone(x) {
    const d = S.today && S.today.d, act = S.act && S.act.d === d ? S.act : {};
    switch (x.k) {
      case 'video': return !!S.seen[x.ref];
      case 'lesson': return !!S.done[x.ref];
      case 'exam': return S.exams.some(e => e.d === d && e.t === x.t);
      case 'review': return !!act.rev;
      case 'mistakes': return !!act.mis;
      case 'mix': return !!act['mix_' + x.t];
    }
    return false;
  }
  // Recordatorio diario (solo en la app Android): avisa a la hora elegida si el plan de hoy no está completo.
  function syncReminder() {
    const N = NAT();
    if (!N || !N.remind) return;
    const P = S.plan, on = !!(S.set.remind && P);
    try { N.remind(on, S.set.rh || 19, 0, 'Lima: ¡te toca estudiar!', P ? `Tu plan de hoy: ${P.mins} minutos. ¡Vamos que se puede!` : 'Unos minutos al día hacen la diferencia.', P ? (P.days || []).join(',') : ''); } catch (e) { /* app antigua */ }
  }
  function mark(k) { const t = today(); if (!S.act || S.act.d !== t) S.act = { d: t }; S.act[k] = (S.act[k] || 0) + 1; }
  function runTask(x) {
    if (x.t && x.t !== S.test) { S.test = x.t; save(); header(); }
    if (x.k === 'video') openVideo(x.ref);
    else if (x.k === 'lesson') enterLesson(x.ref);
    else if (x.k === 'exam') startExam(x.n, x.min);
    else if (x.k === 'review') planReview();
    else if (x.k === 'mistakes') planMistakes();
    else if (x.k === 'mix') startMix();
  }
  // Repaso de todas las pruebas del plan (no solo la que se está mirando).
  const selItems = () => uniq(selTests().flatMap(id => cItems(testInfo(id))));
  function planReview() {
    let items = selItems().filter(it => GRADED(it) && S.q[it.id] && S.q[it.id].d <= today()).sort((a, b) => (S.q[b.id].w - S.q[a.id].w)).slice(0, 12);
    if (items.length < 6) {
      const doneItems = selTests().flatMap(id => cUnits(testInfo(id)).flatMap(u => u.lessons)).filter(l => S.done[l.id]).flatMap(l => l.items).filter(GRADED);
      items = uniq(items.concat(shuffle(doneItems))).slice(0, 12);
    }
    if (!items.length) {
      mark('rev'); save(); refresh();
      toast(`${I('check')}<span>Aún no hay nada que repasar: el repaso aparece cuando completas lecciones. ¡Marcado como hecho!</span>`, 3400);
      return;
    }
    startSession({ kind: 'review', items: shuffle(items), tag: true, src: 'rev' });
  }
  function planMistakes() {
    const items = selItems().filter(it => GRADED(it) && S.q[it.id] && S.q[it.id].w > 0 && S.q[it.id].b < 3).slice(0, 12);
    if (!items.length) { mark('mis'); save(); refresh(); toast(`${I('check')}<span>No tienes errores pendientes. ¡Bien!</span>`, 2600); return; }
    startSession({ kind: 'review', items: shuffle(items), tag: true, src: 'mis' });
  }
  function taskSub(x) {
    if (x.k === 'review') return 'Preguntas que te tocan hoy, de todas tus pruebas';
    if (x.k === 'mistakes') return 'Preguntas que fallaste antes';
    return `${tShort(x.t)} · ${TASK_N[x.k]}${x.u ? ' · ' + esc(x.u) : ''}`;
  }
  function planCard() {
    const P = S.plan;
    if (!P || !P.date) return '';
    const left = daysBetween(today(), P.date);
    if (left < 0) return `<section class="plan"><div class="plan-h"><div><small>Tu plan</small><b>La fecha de tu PAES ya pasó</b></div></div><p class="muted">Pon la fecha de tu próxima PAES para seguir con un plan.</p><button class="btn" type="button" data-act="survey">${I('replay')}Actualizar mi plan</button></section>`;
    const tp = todayPlan(), n = tp.tasks.length, done = tp.tasks.filter(taskDone).length, nx = tp.tasks.findIndex(x => !taskDone(x)), pc = pace();
    if (nx < 0 && NAT() && NAT().planDone) { try { NAT().planDone(today()); } catch (e) { /* app antigua */ } }
    const lbl = fmtDate(today(), { weekday: 'long', day: 'numeric', month: 'short' });
    return `<section class="plan">
      <div class="plan-h"><div><small>${tp.free ? 'Día libre' : 'Plan de hoy'} · ${esc(lbl)}</small><b>${left === 0 ? '¡Hoy es la PAES! Mucho éxito' : `Faltan ${plural(left, 'día', 'días')} para la PAES`}</b>${pc ? `<span class="pace ${pc.cls}">${I(pc.cls === 'ok' ? 'check' : 'info')}${pc.txt}</span>` : ''}</div>
        <div class="ring" style="--p:${(n ? done / n : 1).toFixed(3)}"><span>${done}/${n}</span></div></div>
      ${tp.free ? `<p class="muted small">Hoy no es día de estudio en tu plan. Si quieres, adelanta algo cortito:</p>` : ''}
      <ol class="tasks${planCard.open ? ' open' : ''}">${tp.tasks.map((x, i) => { const ok = taskDone(x); return `<li${i >= 5 ? ' class="more"' : ''}><button class="task${ok ? ' done' : ''}${i === nx ? ' next' : ''}" type="button" data-task="${i}"><i class="tk">${I(ok ? 'check' : TASK_IC[x.k])}</i><span><b>${esc(x.label)}</b><small>${taskSub(x)}</small></span><em>${x.min} min</em></button></li>`; }).join('')}</ol>
      ${n > 5 && !planCard.open ? `<button class="tmore" type="button" data-act="tmore">${I('down')}Ver ${plural(n - 5, 'tarea más', 'tareas más')} · ${tp.tasks.reduce((s, x) => s + x.min, 0)} min en total</button>` : ''}
      ${nx >= 0 ? `<button class="btn" type="button" data-task="${nx}">${I('play')}${done ? 'Seguir con el plan' : 'Empezar el plan de hoy'}</button>` : `<p class="note done-all">${I('trophy')}¡Plan de hoy completo! Mañana sigue.</p>`}
      <button class="link" type="button" data-act="plan">${I('list')}Ver mi plan completo</button>
    </section>`;
  }
  function planView() {
    const P = S.plan;
    if (!P) return survey({ edit: true });
    const tests = selTests(), { sc, per } = planStats(P, tests), left = daysBetween(today(), P.date);
    const lastLearn = sc.days.filter(d => !d.final).pop(), firstFinal = sc.days.find(d => d.final);
    const upcoming = sc.days.filter(d => d.d >= today()).slice(0, 12);
    const short = d => fmtDate(d, { weekday: 'short', day: 'numeric', month: 'short' });
    const hours = Math.round(P.mins * (P.days || []).length / 6) / 10;
    const html = `<header class="lh"><button class="ib" type="button" data-x aria-label="Cerrar">${I('x')}</button><b>Mi plan de estudio</b></header>
      <div class="lbody planv">
        <div class="pv-hero"><div class="pv-pet">${RB.mascot('cap')}</div><div><small>PAES · ${esc(fmtDate(P.date))}</small><b>${left > 0 ? `Faltan ${plural(left, 'día', 'días')}` : left === 0 ? '¡Es hoy!' : 'Ya pasó'}</b><span>${plural(sc.n, 'día de estudio', 'días de estudio')} · ${P.mins} min al día · ≈${String(hours).replace('.', ',')} h por semana</span>${P.career ? `<span>Meta: ${esc(P.career)}${P.target ? ` · ${P.target} pts` : ''}</span>` : P.target ? `<span>Meta: ${P.target} puntos</span>` : ''}</div></div>
        <h2 class="st">Cómo se reparte tu tiempo</h2>
        <div class="card pv-tests">${tests.map(id => { const p = per[id]; return `<div class="pvt"><b>${I(testInfo(id).ic)}${esc(testInfo(id).n)}</b><span>${Math.round(p.share * 100)}% del tiempo · alcanzas a ver ${Math.round(p.cov * 100)}% del temario</span><i class="meter"><i style="width:${Math.round(p.cov * 100)}%"></i></i></div>`; }).join('')}</div>
        ${tests.some(id => per[id].cov < .98) ? `<p class="note warnn">${I('info')}Con este tiempo no alcanzas a ver todo. El plan prioriza tus pruebas más débiles; si puedes, sube los minutos diarios.</p>` : `<p class="note">${I('check')}Con este ritmo alcanzas a ver todo el temario antes de la prueba.</p>`}
        <h2 class="st">Etapas</h2>
        <div class="card pv-phases"><div><b>1 · Aprender</b><span>${lastLearn ? `Hasta el ${esc(short(lastLearn.d))}: videos y lecciones de cada tema, con un ensayo al final de cada semana.` : 'No quedan días de aprendizaje.'}</span></div>
          <div><b>2 · Repaso final</b><span>${firstFinal ? `Desde el ${esc(short(firstFinal.d))}: ensayos, tus errores y repaso inteligente.` : 'Muy poco tiempo: el plan va directo a repasar.'}</span></div></div>
        <h2 class="st">Próximos días</h2>
        <div class="card pv-days">${upcoming.length ? upcoming.map(d => `<div class="pvd${d.d === today() ? ' today' : ''}"><b>${d.d === today() ? 'Hoy' : esc(short(d.d))}</b><span>${d.exam ? `<em>${I('exam')}Ensayo ${esc(tShort(d.exam))}</em>` : ''}${d.final ? '<em class="f">Repaso</em>' : ''}${d.focus.map(id => `<i>${esc(tShort(id))}</i>`).join('')}</span></div>`).join('') : '<p class="muted">No quedan días de estudio antes de la fecha.</p>'}</div>
        <button class="btn" type="button" data-edit>${I('gear')}Editar mi plan</button>
        <button class="btn ghost" type="button" data-diag>${I('target')}Hacer un diagnóstico</button>
      </div>`;
    const ent = openLayer('pl', html);
    $('[data-x]', ent.el).onclick = () => closeLayer();
    $('[data-edit]', ent.el).onclick = () => closeLayer(() => survey({ edit: true }));
    $('[data-diag]', ent.el).onclick = () => closeLayer(() => startDiag(() => { S.today = null; save(); refresh(); planView(); }));
  }

  // Diagnóstico: unas preguntas de cada prueba elegida para ajustar el nivel del plan.
  function startDiag(onDone) {
    const items = [];
    selTests().forEach(id => {
      const pool = shuffle(cItems(testInfo(id)).filter(it => EXAMT.includes(it.t) && (!it.tx || id === 'lec')));
      const seenU = new Set();
      for (const it of pool) { if (items.filter(x => UNIT_TEST[x._u] === id).length >= 3) break; if (!seenU.has(it._u)) { seenU.add(it._u); items.push(it); } }
    });
    if (!items.length) return onDone && onDone();
    startSession({ kind: 'diag', items, tag: true, onDone });
  }
  function diagResult(ses) {
    const by = {};
    (ses.log || []).forEach(([it, ok]) => { const id = UNIT_TEST[it._u]; if (!id) return; (by[id] = by[id] || [0, 0])[1]++; if (ok) by[id][0]++; });
    if (S.plan) {
      S.plan.lvl = S.plan.lvl || {};
      Object.entries(by).forEach(([id, [g, n]]) => { const dl = 1 + 4 * g / n, self = S.plan.lvl[id] || 3; S.plan.lvl[id] = clamp(Math.round((self + dl) / 2), 1, 5); });
      S.plan.diag = today();
      S.plan.ver = (S.plan.ver || 0) + 1;
    }
    return by;
  }

  // ---------- Encuesta inicial ----------
  const LV = ['Me cuesta mucho', 'Me cuesta', 'Más o menos', 'Me va bien', 'Me va muy bien'];
  // Lima habla en la encuesta con la misma narradora de los videos (audio/app.webm) y mueve la boca al hablar.
  const lima = { pet: null, raf: 0, au: null, d: null, end: 0 };
  const limaReady = () => lima.p || (lima.p = RB.loadTimes('app').then(d => { lima.d = d; if (d) { lima.au = new Audio('audio/app.webm'); lima.au.preload = 'auto'; } return d; }));
  function limaSay(k) {
    if (!S.set.sound) return;
    limaReady().then(d => {
      const c = d && d.clips && d.clips[k];
      if (!c || !lima.au) return;
      lima.end = c[1]; lima.key = k;
      try { lima.au.currentTime = c[0]; const pr = lima.au.play(); if (pr && pr.catch) pr.catch(() => { }); } catch (e) { /* sin audio */ }
    });
  }
  function limaLoop() {
    cancelAnimationFrame(lima.raf);
    const step = () => {
      const au = lima.au;
      let o = 0;
      if (au && !au.paused) {
        if (au.currentTime >= lima.end) au.pause();
        else if (lima.d && lima.d.e) o = (+lima.d.e[Math.floor(au.currentTime * 25)] || 0) / 9;
      }
      if (lima.pet) lima.pet.frame(performance.now() / 1000, o, 0, null);
      lima.raf = requestAnimationFrame(step);
    };
    step();
  }
  function limaStop() { cancelAnimationFrame(lima.raf); lima.pet = null; if (lima.au) { try { lima.au.pause(); } catch (e) { /* nada */ } } }
  function survey(o = {}) {
    const first = !S.plan;
    const P0 = S.plan || {};
    const A = {
      sel: P0.picks ? P0.picks.slice() : S.sel && S.sel.length ? [...new Set(S.sel.map(id => SCI.includes(id) ? 'sci' : id))] : [],
      sci: P0.sci || null, date: P0.date || null, dk: P0.dk || null, mins: P0.mins || 45, days: (P0.days || [1, 2, 3, 4, 5, 6]).slice(),
      lvl: Object.assign({}, P0.lvl || {}), target: P0.target || 700, career: P0.career || '', style: P0.style || 'video',
    };
    const steps = (first ? ['hola'] : []).concat(['pruebas', 'fecha', 'tiempo', 'nivel', 'meta', 'estilo', 'diag', 'plan']);
    let cur = 0, finished = false;
    const hist = [];
    // Lima lee cada paso una sola vez, un momento después de que aparece (al abrir la app espera más), y se
    // puede silenciar. Elegir opciones redibuja el paso pero no repite la voz.
    const said = new Set();
    let sayT = 0;
    const sayStep = s => {
      clearTimeout(sayT);
      if (lima.au && lima.key !== s) { try { lima.au.pause(); } catch (e) { /* nada */ } }
      if (!first || said.has(s) || S.set.limaMute || !S.set.sound) return;
      sayT = setTimeout(() => { if (finished || steps[cur] !== s) return; said.add(s); limaSay(s); }, said.size ? 450 : 2000);
    };
    const ent = openLayer('onb srv', `<div class="srv-top"><button class="ib" type="button" data-back aria-label="Atrás">${I('left')}</button><div class="pbar"><i></i></div>${first ? `<button class="ib" type="button" data-mute aria-pressed="${!S.set.limaMute}" aria-label="Voz de Lima">${I(S.set.limaMute ? 'mute' : 'vol')}</button>` : `<button class="ib" type="button" data-x aria-label="Cerrar">${I('x')}</button>`}</div><div class="onb-in"></div>`, () => { clearTimeout(sayT); limaStop(); });
    limaLoop();
    ent.guard = () => !first || finished;
    const box = $('.onb-in', ent.el);
    const goBack = () => { if (hist.length) { cur = hist.pop(); render(); return true; } if (!first) { closeLayer(); return true; } return false; };
    ent.back = goBack;
    $('[data-back]', ent.el).onclick = () => { if (!goBack()) toast(`${I('info')}<span>Completa la encuesta para armar tu plan</span>`, 2000); };
    const xb = $('[data-x]', ent.el);
    if (xb) xb.onclick = () => closeLayer();
    const mb = $('[data-mute]', ent.el);
    if (mb) mb.onclick = () => {
      S.set.limaMute = !S.set.limaMute; save();
      mb.setAttribute('aria-pressed', !S.set.limaMute); mb.innerHTML = I(S.set.limaMute ? 'mute' : 'vol');
      if (S.set.limaMute) { clearTimeout(sayT); if (lima.au) { try { lima.au.pause(); } catch (e) { /* nada */ } } }
    };
    const next = () => { hist.push(cur); cur++; render(); box.scrollTop = 0; ent.el.scrollTop = 0; };
    const bubble = t => `<div class="srv-pet"><div class="pet">${RB.mascot('cap')}</div><p class="bub">${t}</p></div>`;
    const tests = () => expandSel(A.sel, A.sci);
    function render() {
      const s = steps[cur];
      $('.pbar i', ent.el).style.width = (100 * cur / (steps.length - 1)) + '%';
      $('[data-back]', ent.el).style.visibility = cur === 0 && first ? 'hidden' : 'visible';
      const footer = (lbl, dis) => `<div class="srv-f"><button class="btn" type="button" data-next${dis ? ' disabled' : ''}>${lbl}</button></div>`;
      let h = '';
      if (s === 'hola') {
        h = bubble('¡Hola! Soy <b>Lima</b>, tu profe para la PAES. Te haré unas preguntas rápidas para armar tu <b>plan de estudio</b>.') +
          `<ul class="feat"><li>${I('list')}${plural(allGraded().length, 'pregunta', 'preguntas')} de todas las pruebas</li><li>${I('film')}${Object.keys(RB.videos).length} videos animados, con narradora</li><li>${I('exam')}Ensayos con tiempo real y puntaje</li><li>${I('target')}Un plan diario hecho para ti</li></ul>` + footer('¡Vamos!');
      } else if (s === 'pruebas') {
        h = bubble('¿Qué pruebas vas a rendir? <b>Marca todas</b> las que darás.') +
          `<div class="pk">${PICK.map(p => `<button class="pkc" type="button" data-p="${p.id}" aria-pressed="${A.sel.includes(p.id)}"><i class="pki">${I(p.ic)}</i><span><b>${esc(p.n)}</b><small>${esc(p.tag)}</small></span><i class="pkb">${I('check')}</i></button>`).join('')}</div>
          <button class="link" type="button" data-all>${I('check')}Marcar todas</button>
          ${A.sel.includes('sci') ? `<div class="sub"><b>¿Qué módulo electivo de Ciencias darás?</b><div class="seg" data-sci>${[['bio', 'Biología'], ['fis', 'Física'], ['qui', 'Química'], ['', 'Aún no sé']].map(([k, n]) => `<button type="button" data-v="${k}" aria-pressed="${(A.sci || '') === k}">${n}</button>`).join('')}</div><small class="muted">Ciencias incluye las tres materias; tu electivo tendrá más preguntas.</small></div>` : ''}` +
          footer('Continuar', !A.sel.length);
      } else if (s === 'fecha') {
        const opts = examDates();
        if (!A.date) { A.date = opts[0].d; A.dk = opts[0].k; }
        h = bubble('¿Cuándo das la PAES?') + `<div class="goals">${opts.map(x => `<button class="goalc" type="button" data-d="${x.d}" data-k="${x.k}" aria-pressed="${A.dk === x.k}"><b>${x.n}</b><span>${esc(fmtDate(x.d))}</span></button>`).join('')}
          <label class="goalc dpick" aria-pressed="${A.dk === 'otra'}"><b>Otra fecha</b><input type="date" data-date min="${addDays(today(), 1)}" value="${A.date}"></label></div>
          <p class="muted small">Faltan <b>${plural(Math.max(0, daysBetween(today(), A.date)), 'día', 'días')}</b>. Las fechas son estimadas: confirma la oficial en demre.cl y ajústala aquí cuando quieras.</p>` + footer('Continuar', !A.date || A.date <= today());
      } else if (s === 'tiempo') {
        const hrs = Math.round(A.mins * A.days.length / 6) / 10;
        h = bubble('¿Cuánto tiempo puedes estudiar al día?') + `<div class="seg big" data-mins>${[[15, '15 min'], [30, '30 min'], [45, '45 min'], [60, '1 hora'], [90, '1,5 horas'], [120, '2 horas']].map(([m, n]) => `<button type="button" data-v="${m}" aria-pressed="${A.mins === m}">${n}</button>`).join('')}</div>
          <div class="sub"><b>¿Qué días?</b><div class="seg days" data-days>${[1, 2, 3, 4, 5, 6, 0].map(d => `<button type="button" data-v="${d}" aria-pressed="${A.days.includes(d)}">${WD[d]}</button>`).join('')}</div></div>
          <p class="muted small">≈ <b>${String(hrs).replace('.', ',')} horas</b> a la semana. Mejor poco todos los días que mucho de vez en cuando.</p>` + footer('Continuar', !A.days.length);
      } else if (s === 'nivel') {
        h = bubble('¿Cómo te va en cada prueba? Sé honesto: así el plan te da más tiempo donde más lo necesitas.') +
          `<div class="lvls">${tests().map(id => { const v = A.lvl[id] || 3; return `<div class="lvr"><b>${I(testInfo(id).ic)}${esc(testInfo(id).n)}</b><div class="seg lv" data-lv="${id}">${[1, 2, 3, 4, 5].map(k => `<button type="button" data-v="${k}" aria-pressed="${v === k}" aria-label="${LV[k - 1]}">${k}</button>`).join('')}</div><small>${LV[v - 1]}</small></div>`; }).join('')}</div>` + footer('Continuar');
      } else if (s === 'meta') {
        h = bubble('¿Qué puntaje quieres lograr? Si ya sabes qué carrera quieres, cuéntame.') + `<div class="seg big" data-target>${[600, 700, 800, 900].map(p => `<button type="button" data-v="${p}" aria-pressed="${A.target === p}">${p}</button>`).join('')}</div>
          <label class="field"><span>Carrera o universidad (opcional)</span><input type="text" data-career maxlength="60" placeholder="Ej.: Medicina, U. de Chile" value="${esc(A.career)}"></label>` + footer('Continuar');
      } else if (s === 'estilo') {
        h = bubble('¿Cómo prefieres estudiar cada tema?') + `<div class="goals">${[['video', 'Primero el video, después practico', 'Recomendado si el tema es nuevo'], ['practice', 'Practico directo', 'Y veo el video solo si me cuesta']].map(([k, n, d]) => `<button class="goalc col" type="button" data-st="${k}" aria-pressed="${A.style === k}"><b>${n}</b><span>${d}</span></button>`).join('')}</div>` + footer('Continuar');
      } else if (s === 'diag') {
        const nq = tests().length * 3;
        h = bubble(`¿Hacemos un diagnóstico? Son ${nq} preguntas (unos ${Math.max(3, Math.round(nq * .6))} minutos) y así ajusto el plan a lo que ya sabes.`) +
          `<div class="srv-f two"><button class="btn" type="button" data-diag>${I('target')}Hacer el diagnóstico</button><button class="btn ghost" type="button" data-next>Ahora no</button></div>`;
      } else if (s === 'plan') {
        const { P, tests: ts, st } = makePlan(A), left = daysBetween(today(), P.date);
        h = bubble(`¡Listo! Tienes <b>${plural(st.sc.n, 'día', 'días')} de estudio</b> hasta la PAES. Así repartimos tu tiempo:`) +
          `<div class="card pv-tests">${ts.map(id => { const p = st.per[id]; return `<div class="pvt"><b>${I(testInfo(id).ic)}${esc(testInfo(id).n)}</b><span>${Math.round(p.share * 100)}% del tiempo · alcanzas ${Math.round(p.cov * 100)}% del temario</span><i class="meter"><i style="width:${Math.round(p.cov * 100)}%"></i></i></div>`; }).join('')}</div>
          <ul class="feat small"><li>${I('flame')}${P.mins} min, ${plural(P.days.length, 'día', 'días')} a la semana</li><li>${I('exam')}Un ensayo al final de cada semana</li><li>${I('replay')}${st.sc.f ? `Los últimos ${plural(st.sc.f, 'día', 'días')}: repaso final y ensayos` : 'Repaso inteligente todos los días'}</li><li>${I('target')}Faltan ${plural(Math.max(0, left), 'día', 'días')}</li></ul>
          ${ts.some(id => st.per[id].cov < .98) ? `<p class="note warnn">${I('info')}No alcanzas a ver todo el temario: el plan prioriza lo más débil. Más minutos al día ayudan.</p>` : ''}
          ${NAT() && NAT().remind ? `<label class="row remind"><span>Recordarme estudiar cada día<small>Un aviso si aún no terminas el plan de hoy</small></span><select data-rh>${[17, 18, 19, 20, 21].map(h => `<option value="${h}"${(S.set.rh || 19) === h ? ' selected' : ''}>${h}:00</option>`).join('')}</select><input class="sw" type="checkbox" data-rem ${S.set.remind ? 'checked' : ''}></label>` : ''}` + footer(first ? '¡Empezar!' : 'Guardar mi plan');
      }
      box.innerHTML = `<div class="srv-s" data-s="${s}">${h}</div>`;
      const pe = $('.srv-pet .pet', box);
      lima.pet = pe && RB.Pet ? new RB.Pet(pe) : null;
      sayStep(s);
      wire(s);
    }
    function wire(s) {
      const nb = $('[data-next]', box);
      if (nb) nb.onclick = () => { if (s === 'plan') return finish(); if (s === 'fecha') A.date = A.date || examDates()[0].d; next(); };
      const set = (sel, fn) => { const el = $(sel, box); if (el) el.onclick = e => { const b = e.target.closest('button'); if (b) { fn(b); render(); } }; };
      if (s === 'pruebas') {
        $$('.pkc', box).forEach(b => { b.onclick = () => { const id = b.dataset.p; A.sel = A.sel.includes(id) ? A.sel.filter(x => x !== id) : A.sel.concat(id); render(); }; });
        $('[data-all]', box).onclick = () => { A.sel = PICK.map(p => p.id); render(); };
        set('[data-sci]', b => { A.sci = b.dataset.v || null; });
      }
      if (s === 'fecha') {
        $$('[data-d]', box).forEach(b => { b.onclick = () => { A.date = b.dataset.d; A.dk = b.dataset.k; render(); }; });
        $('[data-date]', box).onchange = e => { if (e.target.value && e.target.value > today()) { A.date = e.target.value; A.dk = 'otra'; render(); } };
      }
      if (s === 'tiempo') {
        set('[data-mins]', b => { A.mins = +b.dataset.v; });
        set('[data-days]', b => { const d = +b.dataset.v; A.days = A.days.includes(d) ? A.days.filter(x => x !== d) : A.days.concat(d); });
      }
      if (s === 'nivel') $$('[data-lv]', box).forEach(g => { g.onclick = e => { const b = e.target.closest('button'); if (b) { A.lvl[g.dataset.lv] = +b.dataset.v; render(); } }; });
      if (s === 'meta') { set('[data-target]', b => { A.target = +b.dataset.v; }); $('[data-career]', box).oninput = e => { A.career = e.target.value; }; }
      if (s === 'estilo') $$('[data-st]', box).forEach(b => { b.onclick = () => { A.style = b.dataset.st; render(); }; });
      if (s === 'plan' && $('[data-rem]', box)) { $('[data-rem]', box).onchange = e => { S.set.remind = e.target.checked; save(); }; $('[data-rh]', box).onchange = e => { S.set.rh = +e.target.value; save(); }; }
      if (s === 'diag') $('[data-diag]', box).onclick = () => {
        commit();
        startDiag(() => { const L = S.plan.lvl || {}; Object.assign(A.lvl, L); hist.push(cur); cur = steps.indexOf('plan'); render(); });
      };
    }
    function commit() {
      const { P, tests: ts } = makePlan(A);
      S.plan = P; S.sel = ts;
      if (!ts.includes(S.test)) S.test = ts[0];
      S.goal = goalFor(P.mins);
      S.today = null;
      save();
    }
    function finish() {
      const lv = S.plan && S.plan.diag === today() ? S.plan.lvl : null;
      commit();
      if (lv) { S.plan.lvl = Object.assign(S.plan.lvl, lv); S.plan.diag = today(); save(); }
      finished = true;
      syncReminder();
      closeLayer(() => { go.scrolled = false; go('aprender'); window.scrollTo(0, 0); toast(`${I('check')}<span>${first ? '¡Tu plan está listo! Empieza por el plan de hoy.' : 'Plan actualizado'}</span>`, 2800); });
    }
    render();
  }

  // La app Android avisa cuando pasa a segundo plano: se pausa el video y se calla la voz.
  window.PaesPause = () => { if (RB.curPlayer && RB.curPlayer.playing) RB.curPlayer.pause(); RB.hush(); };

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
  $$('.tabs button').forEach(b => { b.onclick = () => { go.scrolled = b.dataset.tab !== 'aprender'; go(b.dataset.tab); window.scrollTo(0, 0); }; });
  $('#hTest').onclick = testSheet;
  $('.brand').onclick = () => { go('aprender'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  setInterval(header, 60000);
  D.addEventListener('visibilitychange', () => { if (!D.hidden) header(); });
  RB.tts.rate = S.set.rate;
  RB.tts.setPref(S.set.vname);
  go((location.hash || '').slice(1) || 'aprender');
  if (!S.plan) survey(); else syncReminder();
  // Dentro de la app Android: sin barras de desplazamiento ni menú contextual del navegador.
  if (NAT()) {
    D.documentElement.classList.add('app');
    D.addEventListener('contextmenu', e => { if (!e.target.closest('input, textarea')) e.preventDefault(); });
  }
  if ('serviceWorker' in navigator && location.protocol === 'https:' && !NAT()) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
  }
  RB.app = { state: () => S, session: () => curSes, openVideo, go };
})();
