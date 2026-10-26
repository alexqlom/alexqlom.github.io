// Exporta el guion hablado de cada video (lo que dice la narradora, en orden) para generar el audio.
// Uso: node tools/guion.js [salida.json]
// Cada escena aporta: la intro (s[0]); por cada bloque, su narración (s[k]); en las preguntas rápidas,
// además la pregunta (q) y, después de que respondes, la explicación (e).
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {}, document: { addEventListener() {}, removeEventListener() {} }, console, setTimeout, clearTimeout };
ctx.window.window = ctx.window;
vm.createContext(ctx);
const run = f => vm.runInContext(`(function(window, document){${fs.readFileSync(path.join(root, f), 'utf8')}})(window, document);`, ctx, { filename: f });
run('icons.js'); run('video.js'); run('data/tests.js');
fs.readdirSync(path.join(root, 'data')).filter(f => f.endsWith('.js') && f !== 'tests.js').sort().forEach(f => run('data/' + f));
const RB = ctx.window.RB;
const plain = s => String(s || '').replace(/\*\*|==/g, '').replace(/\s+/g, ' ').trim();
const out = Object.values(RB.videos).map(v => ({
  id: v.id, u: v.u, title: v.title,
  sc: v.sc.map((sc, si) => {
    const cues = [];
    const add = (k, kind, text) => { text = plain(text); if (text) cues.push({ k, kind, text }); };
    add(0, 'intro', (sc.s || [])[0]);
    (sc.b || []).forEach((b, i) => {
      add(i + 1, 'block', (sc.s || [])[i + 1]);
      if (b && b.q) { add(i + 1, 'q', b.q); add(i + 1, 'e', b.e); }
    });
    return { h: plain(sc.h), cues };
  }),
}));
// Huella de cada guion (igual a la de tools/voz.py) para saber si la narración grabada está al día.
// Mismo texto que json.dumps(..., ensure_ascii=False, sort_keys=True) de Python.
const pyJson = x => Array.isArray(x) ? '[' + x.map(pyJson).join(', ') + ']'
  : x && typeof x === 'object' ? '{' + Object.keys(x).sort().map(k => JSON.stringify(k) + ': ' + pyJson(x[k])).join(', ') + '}' : JSON.stringify(x);
module.exports = { scripts: out, huella: v => require('crypto').createHash('sha1').update(pyJson(v.sc)).digest('hex').slice(0, 12) };
if (require.main !== module) return;
const file = process.argv[2];
if (file) fs.writeFileSync(file, JSON.stringify(out, null, 1)); else process.stdout.write(JSON.stringify(out));
const words = out.reduce((n, v) => n + v.sc.reduce((m, s) => m + s.cues.reduce((w, c) => w + c.text.split(/\s+/).length, 0), 0), 0);
console.error(`${out.length} videos · ${words} palabras habladas`);
