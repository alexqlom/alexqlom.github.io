// Mantiene al día la lista de archivos de datos en index.html y en el service worker.
// Uso: node tools/sync.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const data = fs.readdirSync(path.join(root, 'data')).filter(f => f.endsWith('.js') && f !== 'tests.js').sort();
const tags = data.map(f => `<script src="data/${f}" defer></script>`).join('\n');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
html = html.replace(/<!-- DATA(:start)? -->[\s\S]*?(<!-- DATA:end -->|(?=\n<script src="app.js"))/, `<!-- DATA:start -->\n${tags}\n<!-- DATA:end -->`);
fs.writeFileSync(path.join(root, 'index.html'), html);
// Duración real de cada video (según su narración grabada), para mostrarla sin cargar el audio.
const vm = require('vm'), dur = {};
const adir = path.join(root, 'audio');
if (fs.existsSync(adir)) {
  const ctx = { RB: { vaudio: (id, d) => { if (id !== 'fb' && d && d.d) dur[id] = d.d; } } };
  vm.createContext(ctx);
  fs.readdirSync(adir).filter(f => /^(v-.*|h\d+-\d+)\.js$/.test(f)).sort().forEach(f => vm.runInContext(fs.readFileSync(path.join(adir, f), 'utf8'), ctx));
  fs.writeFileSync(path.join(adir, 'indice.js'), `// Duración en segundos de cada video narrado (lo genera tools/sync.js).\nRB.vdur = ${JSON.stringify(dur)};\n`);
}
const shell = ['./', './index.html', './app.css', './app.js', './icons.js', './video.js', './toon.js', './toon-arte.js', './toon-mapas.js', './toon-motor.js', './data/tests.js', './audio/indice.js']
  .concat(data.map(f => './data/' + f), ['./manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png']);
let sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const ver = require('crypto').createHash('sha1').update(shell.map(f => { try { return fs.readFileSync(path.join(root, f === './' ? 'index.html' : f)); } catch (e) { return ''; } }).join('|')).digest('hex').slice(0, 8);
sw = sw.replace(/const CACHE = '[^']*';/, `const CACHE = 'paes-${ver}';`).replace(/const SHELL = \[[^\]]*\];/, `const SHELL = ${JSON.stringify(shell)};`);
fs.writeFileSync(path.join(root, 'sw.js'), sw);
console.log(`${data.length} archivos de datos · ${Object.keys(dur).length} videos con narración · cache paes-${ver}`);
