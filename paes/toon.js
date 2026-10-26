// Videos en dibujos: cada tema de Historia se cuenta con personajes, utilería, escenarios y mapas que se
// mueven al ritmo de la narración. Todo es SVG animado con Web Animations en pausa, igual que video.js: el
// reproductor mueve el tiempo y cada cosa queda donde debe, así que se puede adelantar, retroceder y pausar.
//
// Un video es una lista de planos. Cada plano tiene lo que dice la narradora (s) y órdenes cortas (c) que
// dicen qué aparece y qué hace cada personaje, amarradas a la palabra en que la narradora lo dice (@palabra).
// Ver la guía de órdenes más abajo (función parse).
(function () {
  const RB = window.RB = window.RB || {};
  const D = typeof document !== 'undefined' ? document : null;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const key = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
  const hashN = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = seed => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const f1 = n => +(+n).toFixed(1);

  // ---------- Paleta ----------
  const K = {
    lime: '#c6ff00', limed: '#7fa300', ink: '#f2f2f2', ink2: '#c9c9c9', dim: '#707070', bg: '#0b0b0b', s1: '#141414', s2: '#1c1c1c', s3: '#272727', s4: '#333',
    red: '#ff5a5f', dred: '#b8323a', org: '#ff9f43', yel: '#ffd23f', grn: '#3ecf6e', dgrn: '#23824a', teal: '#2ec4b6', blue: '#4d8cff', navy: '#2b3f8f',
    pur: '#9b6bff', dpur: '#5b2fb8', pink: '#ff7eb6', brn: '#a0714f', dbrn: '#6b4a32', gold: '#f2c14e', wht: '#f4f1ea', blk: '#262626', gry: '#9aa3ad', dgry: '#5b6370',
    mouth: '#3b1212', line: '#1b1210',
  };
  const SKIN = { a: ['#f8d7b9', '#e6b893'], b: ['#eebd93', '#d69f72'], c: ['#cf9566', '#b37a4c'], d: ['#99643f', '#7d4e2d'], e: ['#6a4429', '#53331d'] };
  const col = c => (c && K[c]) || c;

  // ---------- Personajes ----------
  // Partes en coordenadas del dibujo (caja -30 -30 160 210, pies en 50,170). Brazos de dos tramos: hombro y codo.
  const SH = { L: [35, 78], R: [65, 78] }, ARM = 21, FORE = 19;
  const HAIR = {
    short: c => ({ f: `<path d="M27.5 47 C26 25 38 19.5 50 19.5 C63 19.5 74.5 26 72.5 47 C70 38 63 33 53 33.5 C45 33.5 35 37 27.5 47Z" fill="${c}"/>` }),
    side: c => ({ f: `<path d="M27.5 48 C25 26 37 19 51 19.5 C64 20 75 27 72.5 46 C71 39 69 36 66 34 C58 37 44 37 33 34 C30 38 28.5 43 27.5 48Z" fill="${c}"/><path d="M33 34 C42 28 55 27 66 34" stroke="#000" stroke-opacity=".18" stroke-width="1.4" fill="none"/>` }),
    spiky: c => ({ f: `<path d="M27.5 47 L27 30 L33 33 L34 21 L41 27 L45 16 L51 25 L57 15 L60 26 L67 20 L67 32 L73 30 L72.5 47 C69 38 62 34 51 34 C41 34 33 38 27.5 47Z" fill="${c}"/>` }),
    curly: c => ({ f: `<g fill="${c}"><circle cx="31" cy="38" r="6.5"/><circle cx="36" cy="28" r="7"/><circle cx="45" cy="22.5" r="7.5"/><circle cx="55.5" cy="22.5" r="7.5"/><circle cx="64.5" cy="28" r="7"/><circle cx="69.5" cy="38" r="6.5"/></g>` }),
    afro: c => ({ b: `<circle cx="50" cy="38" r="31" fill="${c}"/>`, f: `<path d="M28 40 C30 30 40 27 50 27 C60 27 70 30 72 40 C66 34 58 33 50 33.5 C42 33 34 34 28 40Z" fill="${c}"/>` }),
    long: c => ({ b: `<path d="M26 46 C24 22 39 17 50 17 C62 17 76 22 74 46 L77 86 C71 92 63 89 61 82 L61 62 L39 62 L39 82 C37 89 29 92 23 86 Z" fill="${c}"/>`, f: `<path d="M27.5 48 C26 26 38 19.5 50 19.5 C62 19.5 74 26 72.5 48 C69 37 60 30 50 31 C42 31.5 33 37 27.5 48Z" fill="${c}"/>` }),
    bob: c => ({ b: `<path d="M25 47 C23 22 38 17 50 17 C62 17 77 22 75 47 L76 66 C70 70 64 68 62 62 L38 62 C36 68 30 70 24 66 Z" fill="${c}"/>`, f: `<path d="M27.5 46 C27 26 38 19.5 50 19.5 C62 19.5 73 26 72.5 46 C66 39 58 33 44 33 C38 34 31 39 27.5 46Z" fill="${c}"/>` }),
    bun: c => ({ b: `<circle cx="50" cy="15" r="9" fill="${c}"/>`, f: `<path d="M27.5 47 C26 25 38 20 50 20 C62 20 74 25 72.5 47 C69 37 61 32 50 32 C39 32 31 37 27.5 47Z" fill="${c}"/>` }),
    pony: c => ({ b: `<path d="M64 30 C82 30 86 52 80 76 C78 82 72 80 73 74 C76 58 74 44 64 40Z" fill="${c}"/>`, f: `<path d="M27.5 47 C26 25 38 20 50 20 C62 20 74 25 72.5 47 C69 37 61 32 50 32 C39 32 31 37 27.5 47Z" fill="${c}"/>` }),
    braids: c => ({ b: `<path d="M26 46 C24 22 39 17 50 17 C62 17 76 22 74 46 L74 60 L26 60 Z" fill="${c}"/><g fill="${c}"><rect x="23" y="56" width="9" height="40" rx="4.5"/><rect x="68" y="56" width="9" height="40" rx="4.5"/></g><g fill="#000" opacity=".2"><rect x="23" y="66" width="9" height="2"/><rect x="23" y="76" width="9" height="2"/><rect x="68" y="66" width="9" height="2"/><rect x="68" y="76" width="9" height="2"/></g>`, f: `<path d="M27.5 46 C27 26 38 19.5 50 19.5 C62 19.5 73 26 72.5 46 C67 36 59 31 50 31.5 C41 31 33 36 27.5 46Z" fill="${c}"/><path d="M50 19.5 L50 31.5" stroke="#000" stroke-opacity=".25" stroke-width="1.2"/>` }),
    bald: c => ({ f: `<path d="M27.6 50 C27 42 29 38 31 36 L33 46Z M72.4 50 C73 42 71 38 69 36 L67 46Z" fill="${c}"/>` }),
    wig: c => ({ b: `<path d="M30 54 C22 70 32 84 46 84 L54 84 C68 84 78 70 70 54Z" fill="${c}"/><path d="M45 80 L50 84 L55 80 L56 90 L50 86 L44 90Z" fill="#222"/>`, f: `<path d="M27.5 47 C26 25 38 19 50 19 C62 19 74 25 72.5 47 C68 35 60 30 50 30 C40 30 32 35 27.5 47Z" fill="${c}"/><g fill="${c}" stroke="#000" stroke-opacity=".12"><circle cx="27" cy="48" r="6.4"/><circle cx="27.5" cy="59" r="5.6"/><circle cx="73" cy="48" r="6.4"/><circle cx="72.5" cy="59" r="5.6"/></g>` }),
    scarf: c => ({ b: `<path d="M24 50 C22 22 38 15 50 15 C62 15 78 22 76 50 L78 74 C66 80 34 80 22 74Z" fill="${c}"/>`, f: `<path d="M27 50 C25 25 38 17 50 17 C62 17 75 25 73 50 C71 35 62 28 50 28 C38 28 29 35 27 50Z" fill="${c}"/>` }),
    none: () => ({}),
  };
  const HAT = {
    crown: c => `<g><path d="M30.5 27 L33.5 8 L42 18.5 L50 4 L58 18.5 L66.5 8 L69.5 27 Z" fill="${c || K.gold}" stroke="#9a6b12" stroke-width="1.2" stroke-linejoin="round"/><rect x="30" y="23.5" width="40" height="6.5" rx="2" fill="${c || K.gold}" stroke="#9a6b12" stroke-width="1.2"/><circle cx="50" cy="26.8" r="2.4" fill="${K.red}"/><circle cx="40" cy="26.8" r="1.7" fill="${K.blue}"/><circle cx="60" cy="26.8" r="1.7" fill="${K.grn}"/><circle cx="50" cy="5" r="2.2" fill="#fff4c2"/></g>`,
    bicorne: c => `<g><path d="M14 31 C24 8 76 8 86 31 C70 23 30 23 14 31Z" fill="${c || '#1d1d1d'}"/><path d="M14 31 C30 25 70 25 86 31" stroke="${K.gold}" stroke-width="1.6" fill="none"/><circle cx="50" cy="19" r="4.6" fill="${K.blue}"/><circle cx="50" cy="19" r="3" fill="#fff"/><circle cx="50" cy="19" r="1.5" fill="${K.red}"/></g>`,
    tophat: c => `<g><rect x="34" y="-6" width="32" height="30" rx="2" fill="${c || '#1d1d1d'}"/><rect x="34" y="16" width="32" height="5" fill="${K.dred}"/><ellipse cx="50" cy="25" rx="26" ry="4.6" fill="${c || '#1d1d1d'}"/></g>`,
    cap: c => `<g><path d="M27 33 C27 19 39 15 50 15 C63 15 73 20 73 30 L84 33 C77 37 63 36.5 50 36 C40 36 32 35.5 27 33Z" fill="${c || '#5d5348'}"/><path d="M73 30 L84 33" stroke="#000" stroke-opacity=".3" stroke-width="1.2"/><circle cx="50" cy="16" r="2" fill="#000" opacity=".25"/></g>`,
    kepi: c => `<g><rect x="35" y="3" width="30" height="24" rx="2.5" fill="${c || K.navy}"/><rect x="35" y="21" width="30" height="5" fill="${K.red}"/><path d="M34 27 L66 27 L72 31 L40 31Z" fill="#111"/><circle cx="50" cy="12" r="3.2" fill="${K.gold}"/><path d="M50 3 L50 -6" stroke="${K.red}" stroke-width="4" stroke-linecap="round"/></g>`,
    helmet: c => `<g><path d="M25 34 C25 12 37 9 50 9 C63 9 75 12 75 34 Z" fill="${c || '#5f6b45'}"/><rect x="20" y="31" width="60" height="5.5" rx="2.7" fill="${c || '#5f6b45'}" stroke="#000" stroke-opacity=".25"/></g>`,
    straw: c => `<g><ellipse cx="50" cy="28" rx="35" ry="7" fill="${c || '#d9b45a'}"/><path d="M33 28 C33 12 40 9 50 9 C60 9 67 12 67 28Z" fill="${c || '#d9b45a'}"/><rect x="33" y="22" width="34" height="5" fill="${K.dred}" opacity=".85"/><path d="M18 28 C30 33 70 33 82 28" stroke="#000" stroke-opacity=".18" fill="none"/></g>`,
    huaso: c => `<g><ellipse cx="50" cy="27" rx="34" ry="5.5" fill="${c || '#222'}"/><rect x="34" y="12" width="32" height="15" rx="2" fill="${c || '#222'}"/><rect x="34" y="22" width="32" height="3.4" fill="#555"/></g>`,
    frigio: c => `<g><path d="M28 34 C26 14 42 6 58 9 C70 11 76 20 72 26 C70 22 66 22 64 25 C68 28 72 32 72 34Z" fill="${c || K.red}"/><circle cx="44" cy="26" r="3.2" fill="#fff"/><circle cx="44" cy="26" r="1.7" fill="${K.blue}"/></g>`,
    beret: c => `<g><ellipse cx="48" cy="25" rx="26" ry="9" fill="${c || '#2a2a2a'}" transform="rotate(-8 48 25)"/><rect x="47" y="13" width="3" height="5" rx="1.5" fill="${c || '#2a2a2a'}"/></g>`,
    zucchetto: c => `<path d="M38 24 C38 17 44 15 50 15 C56 15 62 17 62 24 C56 22 44 22 38 24Z" fill="${c || '#111'}"/>`,
    band: c => `<g><rect x="27" y="31" width="46" height="6" rx="3" fill="${c || K.red}"/><circle cx="50" cy="34" r="3.2" fill="#d8dde3" stroke="#8a929c"/><circle cx="39" cy="34" r="2" fill="#d8dde3"/><circle cx="61" cy="34" r="2" fill="#d8dde3"/></g>`,
    grad: c => `<g><path d="M22 22 L50 12 L78 22 L50 32Z" fill="${c || '#1d1d1d'}"/><path d="M36 26 L36 34 C44 38 56 38 64 34 L64 26" fill="${c || '#1d1d1d'}"/><path d="M76 22 L76 34" stroke="${K.gold}" stroke-width="1.6"/><circle cx="76" cy="35" r="2" fill="${K.gold}"/></g>`,
    miner: c => `<g><path d="M26 33 C26 12 38 9 50 9 C62 9 74 12 74 33Z" fill="${c || K.yel}"/><rect x="21" y="30" width="58" height="5" rx="2.5" fill="${c || K.yel}" stroke="#000" stroke-opacity=".2"/><rect x="43" y="14" width="14" height="10" rx="3" fill="#ddd"/><circle cx="50" cy="19" r="3.4" fill="#fff8b0"/></g>`,
    officer: c => `<g><path d="M28 27 C28 15 40 12 50 12 C62 12 74 15 72 27Z" fill="${c || '#3f4a35'}"/><rect x="28" y="24" width="44" height="6" fill="#222"/><path d="M30 30 L70 30 L74 34 L36 34Z" fill="#111"/><circle cx="50" cy="20" r="3" fill="${K.gold}"/></g>`,
    hard: c => `<g><path d="M26 33 C26 14 38 10 50 10 C62 10 74 14 74 33Z" fill="${c || K.org}"/><rect x="22" y="30" width="56" height="5" rx="2.5" fill="${c || K.org}" stroke="#000" stroke-opacity=".2"/><rect x="47" y="10" width="6" height="21" rx="2" fill="#000" opacity=".12"/></g>`,
    nurse: c => `<g><path d="M32 30 L35 16 L65 16 L68 30Z" fill="#fff"/><rect x="47" y="19" width="6" height="8" fill="${K.red}"/><rect x="46" y="21" width="8" height="4" fill="${K.red}"/></g>`,
    bonnet: c => `<g><path d="M24 44 C22 18 38 12 50 12 C62 12 78 18 76 44 C72 30 62 24 50 24 C38 24 28 30 24 44Z" fill="${c || '#e9e2d0'}"/><path d="M27 44 C30 50 34 54 38 56" stroke="${c || '#e9e2d0'}" stroke-width="3" fill="none"/></g>`,
  };
  const FH = {
    mus: c => `<path d="M40 54.5 C43 51 47 51.5 50 53.5 C53 51.5 57 51 60 54.5 C57 57 53 57 50 55.5 C47 57 43 57 40 54.5Z" fill="${c}"/>`,
    big: c => `<path d="M36 52 C38 56 42 56.5 45 54.5 C47.5 52.5 50 53 50 54.5 C50 53 52.5 52.5 55 54.5 C58 56.5 62 56 64 52 C64 57 60 60 55.5 58.5 C53 57.5 51 57 50 57 C49 57 47 57.5 44.5 58.5 C40 60 36 57 36 52Z" fill="${c}"/>`,
    beard: c => `<path d="M28.5 47 C28 66 38 74 50 74 C62 74 72 66 71.5 47 C69 57 64 62 58 61 C55 60.5 52.5 59.5 50 59.5 C47.5 59.5 45 60.5 42 61 C36 62 31 57 28.5 47Z" fill="${c}"/><path d="M41 54.5 C44 52 47 52 50 53.6 C53 52 56 52 59 54.5 C56 56.4 53 56.6 50 55.4 C47 56.6 44 56.4 41 54.5Z" fill="${c}"/>`,
    goatee: c => `<path d="M45 61 C46 66 54 66 55 61 C53 62.5 47 62.5 45 61Z" fill="${c}"/><path d="M42 54.5 C45 52.6 48 52.6 50 53.8 C52 52.6 55 52.6 58 54.5 C55 56 52 56 50 55.2 C48 56 45 56 42 54.5Z" fill="${c}"/>`,
    side: c => `<g fill="${c}"><path d="M27.6 40 L33 40 L32.5 58 C30.5 57 28.5 53 27.6 48Z"/><path d="M72.4 40 L67 40 L67.5 58 C69.5 57 71.5 53 72.4 48Z"/></g>`,
    none: () => '',
  };
  // Ropa: torso (de 70 a 122) y largo; devuelve el dibujo y los colores de mangas.
  const TORSO = 'M34 77 C34 71 38 70 43 70 L57 70 C62 70 66 71 66 77 L68 121 C68 123 66.5 124 64.5 124 L35.5 124 C33.5 124 32 123 32 121 Z';
  const TOP = {
    tee: c => ({ s: c, f: K.skin, d: `<path d="${TORSO}" fill="${c}"/><path d="M44 70 Q50 76 56 70" stroke="#000" stroke-opacity=".25" stroke-width="1.6" fill="none"/>` }),
    shirt: c => ({ s: c, d: `<path d="${TORSO}" fill="${c}"/><path d="M43 70 L50 78 L57 70 L54 70 L50 74 L46 70Z" fill="#fff" opacity=".85"/><g fill="#000" opacity=".3"><circle cx="50" cy="86" r="1.1"/><circle cx="50" cy="96" r="1.1"/><circle cx="50" cy="106" r="1.1"/></g>` }),
    suit: c => ({ s: c, d: `<path d="${TORSO}" fill="${c}"/><path d="M43 70 L50 92 L57 70Z" fill="#fff"/><path d="M48.6 74 L51.4 74 L52.6 90 L50 94 L47.4 90Z" fill="${K.red}"/><path d="M43 70 L47.5 86 L42 78Z M57 70 L52.5 86 L58 78Z" fill="#000" opacity=".28"/>` }),
    vest: c => ({ s: '#e9e4d8', d: `<path d="${TORSO}" fill="#e9e4d8"/><path d="M36 75 L46 72 L50 84 L54 72 L64 75 L66 121 L34 121Z" fill="${c}"/><path d="M53 96 Q58 100 62 96" stroke="${K.gold}" stroke-width="1.3" fill="none"/><g fill="${K.gold}"><circle cx="50" cy="92" r="1.1"/><circle cx="50" cy="101" r="1.1"/><circle cx="50" cy="110" r="1.1"/></g>` }),
    coat: c => ({ s: c, d: `<path d="M33 76 C33 71 38 70 43 70 L57 70 C62 70 67 71 67 76 L71 146 L57 146 L50 120 L43 146 L29 146 Z" fill="${c}"/><path d="M45 70 L50 84 L55 70" fill="#fff"/><path d="M46 73 C47 79 53 79 54 73 L52 84 L48 84Z" fill="#f4f1ea"/><g fill="${K.gold}"><circle cx="45" cy="92" r="1.3"/><circle cx="45" cy="102" r="1.3"/><circle cx="55" cy="92" r="1.3"/><circle cx="55" cy="102" r="1.3"/></g>` }),
    uniform: c => ({ s: c, d: `<path d="${TORSO}" fill="${c}"/><path d="M36 74 L64 118 M64 74 L36 118" stroke="#f4f1ea" stroke-width="4"/><g fill="${K.gold}"><circle cx="50" cy="96" r="2.3"/></g><rect x="31" y="72" width="10" height="5" rx="2" fill="${K.gold}"/><rect x="59" y="72" width="10" height="5" rx="2" fill="${K.gold}"/><rect x="32" y="112" width="36" height="5" fill="#111" opacity=".55"/>` }),
    general: c => ({ s: c, d: `<path d="${TORSO}" fill="${c}"/><path d="M44 70 L50 77 L56 70" fill="${K.gold}"/><g fill="${K.gold}"><circle cx="46" cy="86" r="1.5"/><circle cx="46" cy="96" r="1.5"/><circle cx="46" cy="106" r="1.5"/><circle cx="54" cy="86" r="1.5"/><circle cx="54" cy="96" r="1.5"/><circle cx="54" cy="106" r="1.5"/></g><path d="M29 72 L41 72 L40 79 L30 79Z M59 72 L71 72 L70 79 L60 79Z" fill="${K.gold}"/><path d="M34 76 L66 112" stroke="${K.red}" stroke-width="5" opacity=".9"/>` }),
    robe: c => ({ s: c, d: `<path d="M33 76 C33 71 38 70 43 70 L57 70 C62 70 67 71 67 76 L75 163 L25 163 Z" fill="${c}"/><path d="M45 70 L42 163 L58 163 L55 70Z" fill="#f4f1ea"/><path d="M38 70 C44 80 56 80 62 70 L64 76 C56 86 44 86 36 76Z" fill="#f4f1ea"/><g fill="#1d1d1d"><circle cx="49" cy="96" r="1.1"/><circle cx="52" cy="112" r="1.1"/><circle cx="48" cy="128" r="1.1"/><circle cx="52" cy="144" r="1.1"/><circle cx="44" cy="80" r="1"/><circle cx="56" cy="80" r="1"/></g>` }),
    dress: c => ({ s: c, d: `<path d="M35 77 C35 71 39 70 43 70 L57 70 C61 70 65 71 65 77 L66 104 L76 158 C66 162 34 162 24 158 L34 104 Z" fill="${c}"/><path d="M34 104 L66 104" stroke="#000" stroke-opacity=".2" stroke-width="2"/><path d="M43 70 Q50 78 57 70" stroke="#fff" stroke-opacity=".5" stroke-width="1.6" fill="none"/>` }),
    gown: c => ({ s: c, d: `<path d="M36 77 C36 71 39 70 43 70 L57 70 C61 70 64 71 64 77 L64 100 C76 116 82 138 82 160 C66 166 34 166 18 160 C18 138 24 116 36 100 Z" fill="${c}"/><path d="M40 72 C45 80 55 80 60 72" stroke="#f4f1ea" stroke-width="3" fill="none"/><path d="M30 130 C40 136 60 136 70 130" stroke="#000" stroke-opacity=".2" stroke-width="2" fill="none"/>` }),
    cassock: c => ({ s: c || '#151515', d: `<path d="M33 76 C33 71 38 70 43 70 L57 70 C62 70 67 71 67 76 L71 163 L29 163 Z" fill="${c || '#151515'}"/><rect x="46" y="69" width="8" height="4" fill="#fff"/><g fill="#444"><circle cx="50" cy="84" r="1"/><circle cx="50" cy="94" r="1"/><circle cx="50" cy="104" r="1"/><circle cx="50" cy="114" r="1"/><circle cx="50" cy="124" r="1"/></g><path d="M50 128 L50 142 M45 133 L55 133" stroke="${K.gold}" stroke-width="2"/>` }),
    overall: c => ({ s: '#d6cfc0', d: `<path d="${TORSO}" fill="#d6cfc0"/><path d="M38 90 L62 90 L64 124 L36 124Z" fill="${c}"/><path d="M38 90 L38 72 M62 90 L62 72" stroke="${c}" stroke-width="4"/><rect x="45" y="96" width="10" height="8" rx="1.5" fill="#000" opacity=".2"/><g fill="${K.gold}"><circle cx="38" cy="92" r="1.4"/><circle cx="62" cy="92" r="1.4"/></g>` }),
    peasant: c => ({ s: '#d9cdb5', d: `<path d="${TORSO}" fill="#d9cdb5"/><path d="M34 77 L44 70 L48 124 L35.5 124 C33.5 124 32 123 32 121Z M66 77 L56 70 L52 124 L64.5 124 C66.5 124 68 123 68 121Z" fill="${c}"/><rect x="56" y="104" width="7" height="7" fill="#000" opacity=".18" transform="rotate(8 59 107)"/><path d="M32 116 L68 116" stroke="#4a3626" stroke-width="3"/>` }),
    apron: c => ({ s: c, d: `<path d="${TORSO}" fill="${c}"/><path d="M38 82 L62 82 L64 126 L36 126Z" fill="#f2efe6"/><path d="M38 82 L45 70 M62 82 L55 70" stroke="#f2efe6" stroke-width="2.5"/>` }),
    poncho: c => ({ s: c, d: `<path d="M50 68 L84 112 C70 122 30 122 16 112 Z" fill="${c}"/><path d="M26 108 L74 108 M22 104 L78 104" stroke="#f4f1ea" stroke-width="2.4" opacity=".85"/><path d="M30 113 L70 113" stroke="${K.yel}" stroke-width="2"/><path d="M45 68 L50 76 L55 68" fill="#000" opacity=".25"/>` }),
    hoodie: c => ({ s: c, d: `<path d="${TORSO}" fill="${c}"/><path d="M40 70 C40 78 60 78 60 70" stroke="#000" stroke-opacity=".25" stroke-width="3" fill="none"/><path d="M46 76 L45 88 M54 76 L55 88" stroke="#fff" stroke-width="1.3"/><path d="M40 104 L60 104 L58 116 L42 116Z" fill="#000" opacity=".15"/>` }),
    school: c => ({ s: c || '#1f2d5c', d: `<path d="${TORSO}" fill="${c || '#1f2d5c'}"/><path d="M42 70 L50 90 L58 70Z" fill="#f4f4f4"/><path d="M48.8 72 L51.2 72 L52.2 86 L50 89 L47.8 86Z" fill="${K.dgrn}"/><path d="M42 70 L50 90 L58 70" stroke="#000" stroke-opacity=".25" stroke-width="1.4" fill="none"/>` }),
    labcoat: c => ({ s: '#f2f2f2', d: `<path d="M33 76 C33 71 38 70 43 70 L57 70 C62 70 67 71 67 76 L69 146 L31 146 Z" fill="#f2f2f2"/><path d="M45 70 L50 86 L55 70Z" fill="${c || K.blue}"/><path d="M50 86 L50 146" stroke="#000" stroke-opacity=".15" stroke-width="1.5"/><rect x="56" y="88" width="7" height="8" rx="1" fill="none" stroke="#000" stroke-opacity=".2"/>` }),
    toga: c => ({ s: '#141414', d: `<path d="M33 76 C33 71 38 70 43 70 L57 70 C62 70 67 71 67 76 L71 160 L29 160 Z" fill="#141414"/><path d="M45 70 L50 84 L55 70Z" fill="#fff"/><path d="M47 76 L53 76 L52 90 L48 90Z" fill="#fff"/>` }),
    jersey: c => ({ s: c, d: `<path d="${TORSO}" fill="${c}"/><path d="M44 70 L50 76 L56 70" stroke="#fff" stroke-width="2" fill="none"/><text x="50" y="104" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" font-family="system-ui,sans-serif">10</text>` }),
    kepam: c => ({ s: c || '#151515', d: `<path d="M35 77 C35 71 39 70 43 70 L57 70 C61 70 65 71 65 77 L67 160 L33 160 Z" fill="${c || '#151515'}"/><path d="M33 104 L67 104" stroke="${K.red}" stroke-width="4"/><g fill="#d8dde3" stroke="#8a929c" stroke-width=".6"><circle cx="50" cy="80" r="3.4"/><rect x="46" y="84" width="8" height="5" rx="1"/><circle cx="44" cy="93" r="2.2"/><circle cx="50" cy="94" r="2.6"/><circle cx="56" cy="93" r="2.2"/></g>` }),
  };
  K.skin = '#eebd93';
  const DEFTOP = { cassock: '#151515', school: '#1f2d5c', labcoat: K.blue, toga: '#141414', kepam: '#151515', robe: '#6a2fb8', uniform: '#2b4fa8', general: '#22305e', poncho: '#8a3a2a', overall: '#3f5fa8', vest: '#1d1d1d' };
  const ACC = {
    glasses: `<g fill="none" stroke="#1d1d1d" stroke-width="1.6"><circle cx="42" cy="46" r="5.4"/><circle cx="58" cy="46" r="5.4"/><path d="M47.4 46 L52.6 46"/></g>`,
    shades: `<g><rect x="35" y="41.5" width="13" height="8" rx="3" fill="#111"/><rect x="52" y="41.5" width="13" height="8" rx="3" fill="#111"/><path d="M48 44 L52 44" stroke="#111" stroke-width="1.6"/></g>`,
    monocle: `<g fill="none" stroke="${K.gold}" stroke-width="1.5"><circle cx="58" cy="46" r="5.6"/><path d="M63 49 L66 70"/></g>`,
    sash: `<g><path d="M35 74 L66 116 L66 123 L58 123 L33 82Z" fill="${K.blue}"/><path d="M38.5 77 L66 113.5" stroke="#fff" stroke-width="2.6"/><path d="M36.5 80.2 L62 119" stroke="${K.red}" stroke-width="2.6"/></g>`,
    medal: `<g><path d="M45 74 L48 86 L52 86 L55 74" fill="${K.red}"/><circle cx="50" cy="89" r="4" fill="${K.gold}" stroke="#9a6b12"/></g>`,
    tie: `<path d="M48.6 72 L51.4 72 L52.6 88 L50 92 L47.4 88Z" fill="${K.red}"/>`,
    pearls: `<g fill="#f7f3e8">${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${41 + i * 3}" cy="${72 + Math.sin(i / 6 * Math.PI) * 5}" r="1.6"/>`).join('')}</g>`,
    scarfred: `<path d="M40 68 C44 74 56 74 60 68 L61 74 C56 79 44 79 39 74Z M54 74 L60 94 L54 92Z" fill="${K.red}"/>`,
    armband: `<rect x="60" y="88" width="10" height="5" rx="1.5" fill="${K.red}" transform="rotate(-6 65 90)"/>`,
  };
  // Objetos en la mano (dibujados con la mano en 0,0 y hacia abajo).
  const HOLD = {
    book: `<g transform="rotate(-8)"><rect x="-9" y="-6" width="18" height="22" rx="2" fill="${K.red}"/><rect x="-7" y="-4" width="14" height="18" fill="#f4f1ea" opacity=".2"/><path d="M-9 -3 L9 -3" stroke="#000" stroke-opacity=".3"/></g>`,
    quill: `<g transform="rotate(-25)"><path d="M0 4 L0 -28 C8 -24 10 -14 2 -2Z" fill="#f4f1ea"/><path d="M0 4 L0 -26" stroke="#bbb"/></g>`,
    scroll: `<g><rect x="-7" y="-14" width="14" height="28" fill="#efe2bf"/><rect x="-9" y="-17" width="18" height="5" rx="2.5" fill="#d9c08a"/><rect x="-9" y="12" width="18" height="5" rx="2.5" fill="#d9c08a"/><path d="M-4 -6 H4 M-4 -1 H4 M-4 4 H2" stroke="#7a6a4a" stroke-width="1.2"/></g>`,
    sword: `<g transform="rotate(180)"><rect x="-1.6" y="4" width="3.2" height="40" rx="1" fill="#d7dde4"/><rect x="-7" y="2" width="14" height="3.4" rx="1.5" fill="${K.gold}"/><rect x="-1.8" y="-6" width="3.6" height="8" fill="#6b4a32"/></g>`,
    musket: `<g transform="rotate(170)"><rect x="-2" y="-14" width="4" height="62" rx="1.5" fill="#7a5233"/><rect x="-1.2" y="-36" width="2.4" height="26" fill="#9aa3ad"/><path d="M0 -36 L0 -46" stroke="#cfd5db" stroke-width="1.6"/></g>`,
    flag: `<g><rect x="-1.3" y="-60" width="2.6" height="70" fill="#8b6b4a"/><path d="M1 -58 L34 -58 L34 -36 L1 -36Z" fill="var(--flag, ${K.lime})"/></g>`,
    flagfr: `<g><rect x="-1.3" y="-60" width="2.6" height="70" fill="#8b6b4a"/><rect x="1" y="-58" width="11" height="22" fill="#2b4fd6"/><rect x="12" y="-58" width="11" height="22" fill="#fff"/><rect x="23" y="-58" width="11" height="22" fill="${K.red}"/></g>`,
    flagcl: `<g><rect x="-1.3" y="-60" width="2.6" height="70" fill="#8b6b4a"/><rect x="1" y="-58" width="33" height="11" fill="#fff"/><rect x="1" y="-47" width="33" height="11" fill="#d52b1e"/><rect x="1" y="-58" width="11" height="11" fill="#0039a6"/><path d="M6.5 -55.5 L7.4 -53 L10 -53 L7.9 -51.4 L8.7 -48.8 L6.5 -50.4 L4.3 -48.8 L5.1 -51.4 L3 -53 L5.6 -53Z" fill="#fff"/></g>`,
    scepter: `<g transform="rotate(180)"><rect x="-1.5" y="-4" width="3" height="40" fill="${K.gold}"/><circle cx="0" cy="38" r="5" fill="${K.gold}"/><circle cx="0" cy="38" r="2.4" fill="${K.red}"/></g>`,
    fork: `<g transform="rotate(175)"><rect x="-1.3" y="-20" width="2.6" height="64" fill="#8b6b4a"/><path d="M-7 44 L-7 56 M0 44 L0 58 M7 44 L7 56 M-7 44 L7 44" stroke="#aab" stroke-width="2" fill="none"/></g>`,
    hammer: `<g transform="rotate(200)"><rect x="-1.6" y="-4" width="3.2" height="28" fill="#8b6b4a"/><rect x="-8" y="22" width="16" height="7" rx="1.5" fill="#8a929c"/></g>`,
    pick: `<g transform="rotate(200)"><rect x="-1.5" y="-4" width="3" height="30" fill="#8b6b4a"/><path d="M-13 30 Q0 20 13 30 L13 27 Q0 17 -13 27Z" fill="#8a929c"/></g>`,
    sign: `<g><rect x="-1.3" y="-46" width="2.6" height="54" fill="#8b6b4a"/><rect x="-22" y="-70" width="44" height="28" rx="3" fill="#f4f1ea" stroke="#222" stroke-width="1.4"/><text x="0" y="-51" text-anchor="middle" font-size="11" font-weight="900" fill="#222" font-family="system-ui,sans-serif">{T}</text></g>`,
    coin: `<g><circle r="7" fill="${K.gold}" stroke="#9a6b12" stroke-width="1.4"/><text y="3" text-anchor="middle" font-size="8" font-weight="900" fill="#9a6b12" font-family="system-ui,sans-serif">$</text></g>`,
    bag: `<g><path d="M-10 0 C-14 14 -8 20 0 20 C8 20 14 14 10 0 L5 -6 L-5 -6Z" fill="#c9a46b"/><path d="M-5 -6 L5 -6" stroke="#7a5a2a" stroke-width="2.4"/><text y="13" text-anchor="middle" font-size="11" font-weight="900" fill="#7a5a2a" font-family="system-ui,sans-serif">$</text></g>`,
    phone: `<g><rect x="-5" y="-10" width="10" height="18" rx="2" fill="#222"/><rect x="-3.8" y="-8" width="7.6" height="13" fill="${K.lime}" opacity=".7"/></g>`,
    mic: `<g transform="rotate(160)"><rect x="-2" y="0" width="4" height="16" rx="2" fill="#333"/><circle cy="20" r="5" fill="#888"/></g>`,
    torch: `<g transform="rotate(180)"><rect x="-2" y="-4" width="4" height="24" fill="#8b6b4a"/><path d="M0 22 C-7 30 -4 38 0 44 C4 38 7 30 0 22Z" fill="${K.org}"/><path d="M0 28 C-3 32 -2 36 0 39 C2 36 3 32 0 28Z" fill="${K.yel}"/></g>`,
    ballot: `<g transform="rotate(-10)"><rect x="-8" y="-11" width="16" height="20" fill="#fff" stroke="#999" stroke-width=".8"/><path d="M-4 -3 L-1 1 L5 -6" stroke="${K.dgrn}" stroke-width="2" fill="none"/></g>`,
    bread: `<g transform="rotate(-30)"><rect x="-4" y="-18" width="9" height="36" rx="4.5" fill="#d79a52"/><path d="M-2 -10 L3 -12 M-2 -2 L3 -4 M-2 6 L3 4" stroke="#a8692b" stroke-width="1.4"/></g>`,
    gavel: `<g transform="rotate(200)"><rect x="-1.5" y="-4" width="3" height="24" fill="#6b4a32"/><rect x="-9" y="18" width="18" height="9" rx="2" fill="#8a5a3a"/></g>`,
    paper: `<g transform="rotate(-6)"><rect x="-9" y="-12" width="18" height="23" fill="#fff"/><path d="M-6 -6 H6 M-6 -2 H6 M-6 2 H4" stroke="#999" stroke-width="1.2"/></g>`,
    newspaper: `<g transform="rotate(-6)"><rect x="-13" y="-16" width="26" height="30" fill="#ece7da"/><rect x="-10" y="-13" width="20" height="5" fill="#333"/><path d="M-10 -4 H10 M-10 0 H10 M-10 4 H2 M-10 8 H10" stroke="#888" stroke-width="1.2"/></g>`,
    cane: `<g transform="rotate(180)"><path d="M0 -4 L0 40 M0 -4 C0 -10 -8 -10 -8 -4" stroke="#3b2a1d" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`,
    broom: `<g transform="rotate(-14)"><rect x="-1.3" y="-30" width="2.6" height="66" fill="#b08a5a"/><path d="M-8 34 L8 34 L13 56 L-13 56Z" fill="#d9b45a"/><path d="M-6 38 L-8 54 M0 38 L0 55 M6 38 L8 54" stroke="#a8862f" stroke-width="1.4"/><rect x="-9" y="32" width="18" height="5" rx="2" fill="#c0392b"/></g>`,
    shovel: `<g transform="rotate(175)"><rect x="-1.3" y="-14" width="2.6" height="52" fill="#8b6b4a"/><path d="M-8 38 L8 38 L6 54 L0 58 L-6 54Z" fill="#8a929c"/></g>`,
    wrench: `<g transform="rotate(200)"><rect x="-2" y="-2" width="4" height="22" rx="2" fill="#8a929c"/><path d="M-6 20 C-6 28 6 28 6 20 L3 20 L3 24 L-3 24 L-3 20Z" fill="#8a929c"/></g>`,
    baguette: `<g transform="rotate(-50)"><rect x="-3.5" y="-24" width="7" height="48" rx="3.5" fill="#d79a52"/><path d="M-2 -14 L2 -16 M-2 -4 L2 -6 M-2 6 L2 4 M-2 16 L2 14" stroke="#a8692b" stroke-width="1.3"/></g>`,
    briefcase: `<g><rect x="-11" y="2" width="22" height="16" rx="2" fill="#5a3b26"/><path d="M-4 2 L-4 -2 L4 -2 L4 2" stroke="#3b2618" stroke-width="2" fill="none"/></g>`,
    cup: `<g><path d="M-6 -6 L6 -6 L5 8 L-5 8Z" fill="#f4f1ea"/><path d="M6 -3 C10 -3 10 4 5.5 4" stroke="#f4f1ea" stroke-width="1.6" fill="none"/></g>`,
    lamp: `<g><path d="M0 0 L0 6" stroke="#666" stroke-width="2"/><rect x="-6" y="6" width="12" height="14" rx="2" fill="${K.gold}" opacity=".9"/><circle cy="13" r="4" fill="#fff8b0"/></g>`,
    whistle: `<g><rect x="-6" y="-3" width="12" height="6" rx="3" fill="#d7dde4"/></g>`,
    card: `<g transform="rotate(-8)"><rect x="-8" y="-11" width="16" height="22" rx="2" fill="${K.yel}"/></g>`,
    redcard: `<g transform="rotate(-8)"><rect x="-8" y="-11" width="16" height="22" rx="2" fill="${K.red}"/></g>`,
    rifle: `<g transform="rotate(170)"><rect x="-2" y="-12" width="4" height="56" rx="1.5" fill="#4a3a2a"/><rect x="-1.2" y="-30" width="2.4" height="20" fill="#555"/></g>`,
    ticket: `<g transform="rotate(-10)"><rect x="-11" y="-7" width="22" height="14" rx="2" fill="${K.lime}"/><path d="M-3 -7 L-3 7" stroke="#000" stroke-dasharray="2 2" stroke-opacity=".4"/></g>`,
    cash: `<g transform="rotate(-12)"><rect x="-13" y="-7" width="26" height="14" rx="2" fill="#7ccf7a"/><circle r="4" fill="#4b9b49"/></g>`,
    key: `<g transform="rotate(-30)"><circle cx="0" cy="-8" r="5" fill="none" stroke="${K.gold}" stroke-width="3"/><path d="M0 -3 L0 14 M0 9 L5 9 M0 13 L4 13" stroke="${K.gold}" stroke-width="3"/></g>`,
    chalk: `<g transform="rotate(-30)"><rect x="-1.5" y="-8" width="3" height="10" fill="#fff"/></g>`,
  };
  // Elenco: tipos de personaje listos para usar. Se pueden modificar en el video: "rey+sad", "obrero color=red".
  const CAST = {
    rey: { sk: 'a', hr: 'long:#6b4a32', fh: 'mus:#6b4a32', top: 'robe:#6a2fb8', hat: 'crown', hold: 'scepter' },
    reina: { sk: 'a', hr: 'bun:#c9a65a', top: 'gown:#8e2f6b', hat: 'crown', acc: 'pearls' },
    noble: { sk: 'a', hr: 'wig:#efefef', top: 'coat:#2f63c9', acc: 'monocle', pt: '#e9e4d8', shoe: '#1d1d1d' },
    dama: { sk: 'a', hr: 'bun:#e8e2d6', top: 'gown:#d9709a', acc: 'pearls' },
    cura: { sk: 'b', hr: 'bald:#5a4637', top: 'cassock', hat: 'zucchetto' },
    obispo: { sk: 'a', hr: 'bald:#ccc', top: 'cassock:#5a1f6e', hat: 'zucchetto:#6b1f86' },
    campesino: { sk: 'c', hr: 'short:#3b2a1d', fh: 'beard:#3b2a1d', top: 'peasant:#7a5a3c', hat: 'straw', pt: '#6b5a44' },
    campesina: { sk: 'c', hr: 'braids:#2b1d14', top: 'dress:#7a5a3c', hat: 'none' },
    burgues: { sk: 'a', hr: 'side:#3b2a1d', fh: 'mus:#3b2a1d', top: 'vest:#1d1d1d', hat: 'tophat', pt: '#2a2a2a', hold: 'cane' },
    obrero: { sk: 'b', hr: 'short:#2b1d14', fh: 'mus:#2b1d14', top: 'overall:#3f5fa8', hat: 'cap', pt: '#3f5fa8' },
    obrera: { sk: 'b', hr: 'bun:#2b1d14', top: 'apron:#6a6f7a', hat: 'none' },
    nino: { sk: 'b', hr: 'short:#3b2a1d', top: 'peasant:#6b5a44', hat: 'cap', k: .72, pt: '#5a4a38' },
    soldado: { sk: 'b', hr: 'short:#2b1d14', top: 'uniform:#2b4fa8', hat: 'kepi', pt: '#f2efe6', hold: 'musket' },
    patriota: { sk: 'b', hr: 'side:#2b1d14', fh: 'side:#2b1d14', top: 'general:#22305e', pt: '#f2efe6', shoe: '#111' },
    realista: { sk: 'a', hr: 'short:#3b2a1d', top: 'uniform:#b8323a', hat: 'kepi:#b8323a', pt: '#f2efe6', hold: 'musket' },
    napoleon: { sk: 'a', hr: 'short:#3b2a1d', top: 'general:#22305e', hat: 'bicorne', pt: '#f2efe6', shoe: '#111' },
    filosofo: { sk: 'a', hr: 'wig:#f2f2f2', top: 'coat:#7a3b2a', pt: '#3a2a20', hold: 'book' },
    criollo: { sk: 'a', hr: 'side:#3b2a1d', fh: 'side:#3b2a1d', top: 'coat:#2a2a2a', pt: '#e9e4d8' },
    revolucionario: { sk: 'b', hr: 'short:#3b2a1d', top: 'peasant:#3a4a7a', hat: 'frigio', pt: '#e9e4d8', hold: 'flagfr' },
    mapuche: { sk: 'd', hr: 'long:#151515', top: 'poncho:#5a2a2a', hat: 'band:#b8323a', pt: '#3a3a3a' },
    mapuchef: { sk: 'd', hr: 'braids:#151515', top: 'kepam', hat: 'band:#3a6ad6' },
    minero: { sk: 'c', hr: 'short:#2b1d14', fh: 'mus:#2b1d14', top: 'peasant:#5a4a38', hat: 'miner', hold: 'pick', pt: '#4a3a2a' },
    pampino: { sk: 'c', hr: 'short:#2b1d14', fh: 'mus:#2b1d14', top: 'shirt:#a08a6a', hat: 'straw:#c9b07a', hold: 'shovel', pt: '#5a4a38' },
    huaso: { sk: 'b', hr: 'short:#2b1d14', fh: 'mus:#2b1d14', top: 'poncho:#a8323a', hat: 'huaso', pt: '#2a2a2a' },
    presidente: { sk: 'a', hr: 'side:#3b2a1d', fh: 'mus:#3b2a1d', top: 'suit:#1d1d1d', acc: 'sash', pt: '#1d1d1d' },
    diputado: { sk: 'a', hr: 'side:#3b2a1d', fh: 'mus:#3b2a1d', top: 'suit:#2a2a2a', hat: 'tophat', pt: '#2a2a2a' },
    juez: { sk: 'a', hr: 'short:#d0d0d0', top: 'toga', hold: 'gavel' },
    profe: { sk: 'b', hr: 'bob:#5a3a22', top: 'shirt:#2ec4b6', acc: 'glasses', pt: '#2a2a2a', hold: 'chalk' },
    estudiante: { sk: 'b', hr: 'short:#2b1d14', top: 'school', pt: '#5b6370' },
    estudianta: { sk: 'b', hr: 'pony:#3b2a1d', top: 'school', pt: '#5b6370' },
    chico: { sk: 'b', hr: 'spiky:#2b1d14', top: 'hoodie:#ff9f43', pt: '#2b3f8f' },
    chica: { sk: 'c', hr: 'long:#2b1d14', top: 'tee:#9b6bff', pt: '#262626' },
    vecino: { sk: 'c', hr: 'curly:#2b1d14', top: 'shirt:#3ecf6e', pt: '#3a3a3a' },
    vecina: { sk: 'a', hr: 'bob:#c97a3a', top: 'tee:#ff7eb6', pt: '#2b3f8f' },
    abuelo: { sk: 'a', hr: 'bald:#d0d0d0', fh: 'mus:#d0d0d0', top: 'vest:#6b4a32', acc: 'glasses', pt: '#5a4a38', hold: 'cane' },
    vendedor: { sk: 'c', hr: 'short:#2b1d14', fh: 'mus:#2b1d14', top: 'apron:#3ecf6e', pt: '#3a3a3a' },
    cientifico: { sk: 'a', hr: 'afro:#e0e0e0', top: 'labcoat', acc: 'glasses', pt: '#333' },
    medico: { sk: 'b', hr: 'short:#2b1d14', top: 'labcoat:#2ec4b6', pt: '#333' },
    enfermera: { sk: 'b', hr: 'bun:#2b1d14', top: 'dress:#f2f2f2', hat: 'nurse' },
    sufragista: { sk: 'a', hr: 'bun:#5a3a22', top: 'dress:#5b2fb8', acc: 'scarfred', hold: 'sign' },
    militar: { sk: 'b', hr: 'short:#2b1d14', top: 'uniform:#4a5a3a', hat: 'helmet', pt: '#4a5a3a', hold: 'rifle' },
    oficial: { sk: 'a', hr: 'short:#5a5a5a', fh: 'mus:#5a5a5a', top: 'general:#3f4a35', hat: 'officer', pt: '#3f4a35' },
    arbitro: { sk: 'b', hr: 'bald:#2b1d14', top: 'shirt:#1d1d1d', pt: '#1d1d1d', hold: 'whistle' },
    jugador: { sk: 'c', hr: 'spiky:#2b1d14', top: 'jersey:#d52b1e', pt: '#fff' },
    empresario: { sk: 'a', hr: 'side:#5a5a5a', top: 'suit:#2b3f8f', pt: '#2b3f8f', hold: 'briefcase' },
    trabajadora: { sk: 'c', hr: 'pony:#2b1d14', top: 'shirt:#ff9f43', pt: '#2a2a2a', hat: 'hard' },
    lima: { sk: 'b', hr: 'pony:#2b1d14', top: 'tee:#c6ff00', pt: '#1d1d1d' },
  };
  // "rey" · "obrero color=#f00 hold=sign:¡8 horas!" · { sk, hr, top, ... }
  function spec(s) {
    if (s && typeof s === 'object') return s;
    const [base, ...mods] = String(s).trim().split(/\s+/);
    const o = Object.assign({}, CAST[base] || CAST.vecino);
    o.base = base;
    mods.forEach(m => { const i = m.indexOf('='); if (i > 0) o[m.slice(0, i)] = m.slice(i + 1).replace(/_/g, ' '); });
    if (o.color) { const [st] = String(o.top).split(':'); o.top = st + ':' + o.color; }
    return o;
  }
  const split2 = (s, d) => { const i = String(s || '').indexOf(':'); return i < 0 ? [s || '', d] : [s.slice(0, i), s.slice(i + 1)]; };
  const ARMSH = (side, sleeve, skin, hold, holdTxt) => {
    const [sx, sy] = SH[side], ey = sy + ARM, hy = ey + FORE;
    const h = hold && HOLD[hold] ? HOLD[hold].replace('{T}', esc(holdTxt || '')) : '';
    return `<g class="a${side}" style="transform-origin:${sx}px ${sy}px"><path d="M${sx} ${sy} L${sx} ${ey}" stroke="${sleeve}" stroke-width="9.5" stroke-linecap="round"/>` +
      `<g class="f${side}" style="transform-origin:${sx}px ${ey}px"><path d="M${sx} ${ey} L${sx} ${hy - 2}" stroke="${sleeve}" stroke-width="8.6" stroke-linecap="round"/>` +
      `<g transform="translate(${sx} ${hy + 2})" class="h${side}">${side === 'R' ? h : ''}<circle r="5.3" fill="${skin}"/></g></g></g>`;
  };
  // Dibujo completo de un personaje. Las clases (aL, fR, mm-*, eye, bL...) son las que anima el plano.
  function charSVG(sp) {
    const [skin, skinD] = SKIN[sp.sk] || SKIN.b;
    const [hs, hc] = split2(sp.hr, '#2b1d14');
    const hair = (HAIR[hs] || HAIR.short)(col(hc));
    const [ts, tc] = split2(sp.top, '');
    const tcol = col(tc) || DEFTOP[ts] || K.blue;
    const top = (TOP[ts] || TOP.shirt)(tcol);
    const sleeve = top.f === K.skin ? skin : top.s || tcol;
    const [hts, htc] = split2(sp.hat, '');
    const hat = hts && HAT[hts] ? HAT[hts](col(htc)) : '';
    const [fs, fc] = split2(sp.fh, hc || '#2b1d14');
    const fh = fs && FH[fs] ? FH[fs](col(fc)) : '';
    const pants = col(sp.pt) || '#333', shoe = col(sp.shoe) || '#1a1a1a';
    const long = /robe|cassock|toga|kepam|gown/.test(ts);
    const [hold, holdTxt] = split2(sp.hold, '');
    const legs = (side, x) => `<g class="l${side}" style="transform-origin:${x}px 118px"><rect x="${x - 4.6}" y="116" width="9.2" height="48" rx="4.6" fill="${long ? shoe : pants}"/><rect x="${x - 7.5}" y="160" width="15" height="8.5" rx="4.2" fill="${shoe}"/></g>`;
    const brow = col(fc || hc) || '#2b1d14';
    const lc = K.line;
    return `<svg class="tc" viewBox="-30 -30 160 210" aria-hidden="true">
      <ellipse class="shd" cx="50" cy="169" rx="25" ry="4.5" fill="#000" opacity=".45"/>
      <g class="all"><g class="sw" style="transform-origin:50px 168px"><g class="bob">
      ${long ? '' : legs('L', 44) + legs('R', 56)}
      ${hair.b && hs !== 'afro' ? hair.b : ''}
      ${long ? legs('L', 44) + legs('R', 56) : ''}
      ${top.d}
      ${sp.acc && /sash|medal|tie|pearls|scarfred|armband/.test(sp.acc) ? ACC[sp.acc] : ''}
      ${ARMSH('L', sleeve, skin, '', '')}${ARMSH('R', sleeve, skin, hold, holdTxt)}
      <rect x="45" y="62" width="10" height="10" rx="3" fill="${skinD}"/>
      <g class="hd" style="transform-origin:50px 66px"><g class="ht" style="transform-origin:50px 66px">
        ${hs === 'afro' ? hair.b : ''}
        <circle cx="28.5" cy="49" r="4.3" fill="${skinD}"/><circle cx="71.5" cy="49" r="4.3" fill="${skinD}"/>
        <circle cx="50" cy="46" r="22" fill="${skin}"/>
        <g class="ck" opacity=".3"><circle cx="36.5" cy="54.5" r="3.8" fill="#ff6f7d"/><circle cx="63.5" cy="54.5" r="3.8" fill="#ff6f7d"/></g>
        <g class="eyes" style="transform-origin:50px 46px"><g class="eo" style="transform-origin:50px 46px">
          <g fill="#161616"><ellipse cx="42" cy="46" rx="2.8" ry="3.6"/><ellipse cx="58" cy="46" rx="2.8" ry="3.6"/></g>
          <g fill="#fff"><circle cx="42.9" cy="44.6" r="1"/><circle cx="58.9" cy="44.6" r="1"/></g></g>
          <g class="ec" opacity="0" fill="none" stroke="#161616" stroke-width="2.2" stroke-linecap="round"><path d="M38.6 47 Q42 42.6 45.4 47"/><path d="M54.6 47 Q58 42.6 61.4 47"/></g></g>
        <g stroke="${brow}" stroke-width="2.7" stroke-linecap="round"><path class="bL" style="transform-origin:41.3px 38.2px" d="M37.6 38.8 L45 37.6"/><path class="bR" style="transform-origin:58.7px 38.2px" d="M55 37.6 L62.4 38.8"/></g>
        <path d="M48.6 50.5 Q50 52.4 51.4 50.5" stroke="${skinD}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
        <g class="mm">
          <path class="m-n" d="M44.5 56.5 Q50 60.5 55.5 56.5" stroke="${lc}" stroke-width="2.3" fill="none" stroke-linecap="round"/>
          <g class="m-h" opacity="0"><path d="M42.6 55.2 Q50 66.4 57.4 55.2 Z" fill="${K.mouth}"/><path d="M45.6 60.9 Q50 63.8 54.4 60.9 Q50 59.3 45.6 60.9Z" fill="#ff7b7b"/></g>
          <path class="m-s" opacity="0" d="M44.5 61 Q50 55.6 55.5 61" stroke="${lc}" stroke-width="2.3" fill="none" stroke-linecap="round"/>
          <ellipse class="m-o" opacity="0" cx="50" cy="59.5" rx="3.4" ry="4.4" fill="${K.mouth}"/>
          <path class="m-a" opacity="0" d="M43.5 60.2 Q50 54.8 56.5 60.2 Q50 62.6 43.5 60.2Z" fill="${K.mouth}"/>
          <path class="m-f" opacity="0" d="M45.5 58.5 L54.5 58.5" stroke="${lc}" stroke-width="2.3" stroke-linecap="round"/>
        </g>
        <ellipse class="mt" opacity="0" cx="50" cy="58.6" rx="4.4" ry="3.6" fill="${K.mouth}"/>
        ${fh}
        ${hair.f || ''}
        ${hat}
        ${sp.acc && /glasses|shades|monocle/.test(sp.acc) ? ACC[sp.acc] : ''}
      </g></g></g></g></g></svg>`;
  }
  RB.toonChar = s => charSVG(spec(s));
  RB.toonCast = CAST;
  RB.toonPal = K;
  // Ángulos de hombro y codo de cada pose (izquierda / derecha). Positivo en el brazo izquierdo lo abre hacia la
  // izquierda; en el derecho, negativo lo abre hacia la derecha.
  const POSE = {
    idle: [8, -6, -8, 6], down: [3, 0, -3, 0], wave: [10, -4, -150, -30], point: [8, -6, -92, -6], pointl: [92, 6, -8, 6],
    up: [8, -6, -168, 0], cheer: [150, 22, -150, -22], shrug: [55, -95, -55, 95], hips: [42, -118, -42, 118],
    think: [10, -6, -18, -142], cross: [-28, -112, 28, 112], fist: [10, -6, -160, -28], hold: [10, -6, -22, -74],
    present: [62, -40, -62, 40], stop: [10, -6, -80, -80], bow: [6, 0, -6, 0], arms: [70, -10, -70, 10], facepalm: [10, -6, -25, -155],
    vote: [10, -6, -45, -60], hug: [-40, -70, 40, 70], scared: [40, -120, -40, 120], run: [-30, -60, 30, 60],
  };
  // Cara de cada ánimo: boca visible, cejas (izq, der: [rotación, subida]), ojos (abiertos/cerrados, escala), mejillas.
  const MOOD = {
    neutral: { m: 'n', b: [[0, 0], [0, 0]], e: 1, c: .3 },
    happy: { m: 'h', b: [[-4, -1.6], [4, -1.6]], e: 1, c: .4 },
    laugh: { m: 'h', b: [[-6, -2.2], [6, -2.2]], e: 0, c: .5 },
    sad: { m: 's', b: [[-16, -1], [16, -1]], e: 1, c: .2 },
    cry: { m: 's', b: [[-18, -1], [18, -1]], e: 0, c: .3 },
    angry: { m: 'a', b: [[20, 1.2], [-20, 1.2]], e: .82, c: .75 },
    shock: { m: 'o', b: [[-6, -4.2], [6, -4.2]], e: 1.3, c: .2 },
    wow: { m: 'o', b: [[-4, -3.4], [4, -3.4]], e: 1.18, c: .45 },
    think: { m: 'f', b: [[-10, -3], [6, .6]], e: 1, c: .25 },
    smug: { m: 'n', b: [[8, .4], [-12, -2]], e: .85, c: .3 },
    worried: { m: 'f', b: [[-14, -1.6], [14, -1.6]], e: 1, c: .2 },
  };

  RB.toonKit = RB.toonKit || {};
  Object.assign(RB.toonKit, { K, SKIN, CAST, HAIR, HAT, TOP, FH, ACC, HOLD, POSE, MOOD, spec, charSVG, esc, clamp, key, hashN, rng, f1, col });
})();
