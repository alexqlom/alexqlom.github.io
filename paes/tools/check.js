// Revisa los datos de la app: preguntas bien formadas, textos y videos existentes, duración de los videos
// y cantidad de preguntas por prueba. Uso: node tools/check.js [--videos]
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {}, document: { addEventListener() {}, removeEventListener() {} }, console, setTimeout, clearTimeout };
ctx.window.window = ctx.window;
vm.createContext(ctx);
const run = f => vm.runInContext(`(function(window, document){${fs.readFileSync(path.join(root, f), 'utf8')}})(window, document);`, ctx, { filename: f });
run('icons.js'); run('video.js'); ['toon.js', 'toon-arte.js', 'toon-mapas.js', 'toon-motor.js'].forEach(run); run('data/tests.js');
const files = fs.readdirSync(path.join(root, 'data')).filter(f => f.endsWith('.js') && f !== 'tests.js').sort();
files.forEach(f => run('data/' + f));
const RB = ctx.window.RB;
const errs = [], warns = [];
const E = (w, m) => errs.push(`${w}: ${m}`), W = (w, m) => warns.push(`${w}: ${m}`);
const TYPES = new Set(['mc', 'tf', 'fill', 'order', 'match', 'sort', 'multi', 'num', 'info', 'build']);
const stars = s => ((String(s).match(/\*\*/g) || []).length % 2 === 0) && ((String(s).match(/==/g) || []).length % 2 === 0);
const seenQ = new Map();
let total = 0;
const byTest = {};
for (const t of RB.tests) {
  let n = 0;
  for (const uid of t.units) {
    const u = RB.units[uid];
    if (!u) { W(t.id, `falta la unidad ${uid}`); continue; }
    if (!u.name || !u.desc) E(uid, 'unidad sin nombre o descripción');
    if (!RB.hasIcon(u.ic)) E(uid, `ícono desconocido ${u.ic}`);
    // Cada unidad tiene su video, o (Historia) un video en dibujos por lección.
    const toonL = u.lessons.map((l, li) => Object.values(RB.videos).find(v => v.kind === 'toon' && v.u === uid && v.l === li));
    if (u.vid && !RB.videos[u.vid]) E(uid, `video ${u.vid} no existe`);
    else if (u.vid && RB.videos[u.vid].u !== uid) E(uid, `el video ${u.vid} apunta a ${RB.videos[u.vid].u}`);
    else if (!u.vid && toonL.some(x => !x)) W(uid, `lecciones sin video: ${toonL.map((x, i) => x ? null : i + 1).filter(Boolean).join(', ')}`);
    let un = 0;
    u.lessons.forEach((l, li) => {
      const w = `${uid}.${li + 1}`;
      if (l.ic && !RB.hasIcon(l.ic)) E(w, `ícono desconocido ${l.ic}`);
      if (l.items.length < 6) W(w, `lección corta (${l.items.length})`);
      l.items.forEach((it, ii) => {
        const wi = `${w}#${ii + 1}`;
        if (!TYPES.has(it.t)) return E(wi, `tipo ${it.t}`);
        if (it.t === 'info') return;
        un++;
        const q = it.q || it.s || '';
        if (!q) E(wi, 'sin enunciado');
        if (!stars(q) || (it.e && !stars(it.e))) E(wi, 'marcas ** o == sin cerrar');
        if (it.tx && !RB.texts[it.tx]) E(wi, `texto ${it.tx} no existe`);
        if (!it.e && it.t !== 'match' && it.t !== 'sort') W(wi, 'sin explicación');
        const key = it.t + '|' + q + '|' + (it.tx || '') + '|' + JSON.stringify(it.o || it.p || it.k || '');
        if (seenQ.has(key)) W(wi, `pregunta repetida (también en ${seenQ.get(key)})`); else seenQ.set(key, wi);
        const o = it.o || [];
        if (it.t === 'mc') {
          if (o.length !== 4) W(wi, `mc con ${o.length} opciones`);
          if (o.length < 3) E(wi, 'mc con menos de 3 opciones');
        }
        if (['mc', 'multi', 'fill', 'order'].includes(it.t)) {
          if (new Set(o.map(x => String(x).trim().toLowerCase())).size !== o.length) E(wi, 'opciones repetidas');
          if (o.some(x => x === '' || x == null)) E(wi, 'opción vacía');
          o.forEach(x => { if (!stars(x)) E(wi, `marca sin cerrar en opción ${x}`); });
        }
        if (it.t === 'tf' && typeof it.a !== 'boolean') E(wi, 'tf sin a booleano');
        if (it.t === 'fill') { if ((it.s.match(/___/g) || []).length !== 1) E(wi, 'fill debe tener un solo ___'); if (o.length < 3) E(wi, 'fill con pocas opciones'); }
        if (it.t === 'order' && o.length < 3) E(wi, 'order con pocas opciones');
        if (it.t === 'match') {
          if (!it.p || it.p.length < 3) E(wi, 'match con pocas parejas');
          else { const L = new Set(it.p.map(p => p[0])), R = new Set(it.p.map(p => p[1])); if (L.size !== it.p.length || R.size !== it.p.length) E(wi, 'match con lados repetidos'); }
        }
        if (it.t === 'sort') { if (!it.c || it.c.length < 2) E(wi, 'sort sin categorías'); (it.k || []).forEach(k => { if (!(k[1] >= 0 && k[1] < it.c.length)) E(wi, `sort índice malo ${k}`); }); if ((it.k || []).length < 4) W(wi, 'sort con pocas tarjetas'); }
        if (it.t === 'multi') { if (!Array.isArray(it.a) || !it.a.length || it.a.some(i => !(i >= 0 && i < o.length))) E(wi, 'multi con a inválido'); if (new Set(it.a).size !== it.a.length) E(wi, 'multi con a repetido'); }
        if (it.t === 'num') { if (typeof it.a !== 'number' || !isFinite(it.a)) E(wi, 'num sin a numérico'); }
        if (it.t === 'build' && !it.w) E(wi, 'build sin w');
      });
    });
    n += un;
  }
  byTest[t.id] = n; total += n;
}
// Videos
const guion = require('./guion.js');
const narr = {};
const actx = { RB: { vaudio: (id, d) => { narr[id] = d; } } };
vm.createContext(actx);
if (fs.existsSync(path.join(root, 'audio'))) fs.readdirSync(path.join(root, 'audio')).filter(f => /^(v-.*|[a-z][a-z0-9]*-\d+)\.js$/.test(f)).forEach(f => vm.runInContext(fs.readFileSync(path.join(root, 'audio', f), 'utf8'), actx));
const vrows = [];
for (const id in RB.videos) {
  const v = RB.videos[id];
  if (!RB.units[v.u]) E(id, `unidad ${v.u} no existe`);
  let words = 0, quizzes = 0;
  if (v.kind === 'toon') {
    // Videos en dibujos: órdenes válidas, anclas que la narración sí dice y lección existente.
    if (!RB.units[v.u] || !RB.units[v.u].lessons[v.l]) E(id, `lección ${v.u}.${v.l + 1} no existe`);
    v.sc.forEach((sc, i) => {
      RB.toonKit.check(sc).forEach(m => E(`${id}/${i + 1}`, m));
      if (sc.set && !RB.toonKit.hasSet(sc.set)) E(`${id}/${i + 1}`, `escenario desconocido ${sc.set}`);
      if (sc.k === 'map' && !RB.toonKit.MAPS[sc.view || 'chile']) E(`${id}/${i + 1}`, `mapa desconocido ${sc.view}`);
      if (sc.k === 'quiz') { quizzes++; if (!sc.o || sc.o.length < 2 || !(sc.a >= 0 && sc.a < sc.o.length)) E(`${id}/${i + 1}`, 'pregunta mal armada'); }
      RB.toonKit.cuesOf(sc).forEach(c => { words += (c.text.match(/\S+/g) || []).length; if (!c.text) E(`${id}/${i + 1}`, 'plano sin narración'); });
    });
    const rec = narr[id];
    if (!rec) W(id, 'sin narración grabada (correr tools/voz.py)');
    else if (rec.h !== guion.huella(guion.scripts.find(x => x.id === id))) W(id, 'la narración grabada no coincide con el guion actual: volver a correr tools/voz.py');
    const secs = rec ? rec.d : RB.videoSecs(id);
    if (secs < 120) W(id, `video corto: ${Math.round(secs / 6) / 10} min`);
    if (secs > 420) W(id, `video largo: ${Math.round(secs / 6) / 10} min`);
    vrows.push([id, (secs / 60).toFixed(1) + ' min', words + ' palabras', quizzes + ' preguntas', v.sc.length + ' planos']);
    continue;
  }
  v.sc.forEach((sc, i) => {
    const b = sc.b || [], s = sc.s || [];
    if (!s.length) E(`${id}/${i + 1}`, 'escena sin narración');
    if (s.length > b.length + 1) E(`${id}/${i + 1}`, `más narraciones (${s.length}) que pasos (${b.length + 1})`);
    if (s.length < b.length + 1) E(`${id}/${i + 1}`, `bloques sin narración (${b.length + 1 - s.length}): cada bloque necesita su frase`);
    if (sc.ic && !RB.hasIcon(sc.ic)) E(`${id}/${i + 1}`, `ícono desconocido ${sc.ic}`);
    if (!stars(sc.h || '')) E(`${id}/${i + 1}`, 'marca sin cerrar en título');
    b.forEach(x => {
      if (x && x.q) { quizzes++; if (!x.o || x.o.length < 3) E(`${id}/${i + 1}`, 'pregunta del video con pocas opciones'); if (new Set(x.o).size !== x.o.length) E(`${id}/${i + 1}`, 'pregunta del video con opciones repetidas'); }
      if (x && x.ic && !RB.hasIcon(x.ic)) E(`${id}/${i + 1}`, `ícono desconocido ${x.ic}`);
      const txt = typeof x === 'string' ? x : JSON.stringify(x);
      if (!stars(txt)) E(`${id}/${i + 1}`, `marca sin cerrar: ${txt.slice(0, 60)}`);
    });
    s.forEach(t => { words += (String(t).match(/\S+/g) || []).length; if (/\*\*|==/.test(t)) E(`${id}/${i + 1}`, 'la narración no debe llevar marcas'); });
  });
  // Narración grabada (tools/voz.py): que exista, que esté al día con el guion y que dure lo razonable.
  const rec = narr[id];
  if (!rec) W(id, 'sin narración grabada (correr tools/voz.py): se verá con la voz del teléfono');
  else {
    if (!fs.existsSync(path.join(root, 'audio', id + '.webm'))) E(id, 'falta audio/' + id + '.webm');
    if (rec.h !== guion.huella(guion.scripts.find(x => x.id === id))) W(id, 'la narración grabada no coincide con el guion actual: volver a correr tools/voz.py');
  }
  const secs = rec ? rec.d : RB.videoSecs(id);
  if (secs < 210) W(id, `video corto: ${Math.round(secs / 6) / 10} min`);
  if (secs > 450) W(id, `video largo: ${Math.round(secs / 6) / 10} min`);
  if (quizzes < 2) W(id, `solo ${quizzes} preguntas dentro del video`);
  vrows.push([id, (secs / 60).toFixed(1) + ' min', words + ' palabras', quizzes + ' preguntas', v.sc.length + ' escenas']);
}
for (const id in RB.units) if (!RB.tests.some(t => t.units.includes(id))) W(id, 'unidad fuera de toda prueba');
if (process.argv.includes('--videos')) vrows.forEach(r => console.log(r.join(' · ')));
console.log('Preguntas por prueba:', JSON.stringify(byTest), '· total', total, '· videos', Object.keys(RB.videos).length, '· textos', Object.keys(RB.texts).length);
if (warns.length) console.log(`\n${warns.length} avisos:\n` + warns.slice(0, process.argv.includes('--all') ? 9999 : 40).join('\n'));
if (errs.length) { console.log(`\n${errs.length} ERRORES:\n` + errs.join('\n')); process.exit(1); }
console.log('\nSin errores.');
