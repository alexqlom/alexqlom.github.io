// Genera toon-mapas.js: los mapas de los videos en dibujos (contornos de Natural Earth ya proyectados y
// simplificados para el escenario de 360×640), con ciudades, lugares y regiones históricas.
// Necesita (una sola vez, en cualquier carpeta): npm i world-atlas@2 d3-geo@3 topojson-client@3 polygon-clipping@0.15
// Uso: NODE_PATH=/ruta/node_modules node tools/mapas.js
const fs = require('fs'), path = require('path');
const d3 = require('d3-geo'), topo = require('topojson-client'), pc = require('polygon-clipping');
const root = path.join(__dirname, '..');
const W = { 110: require('world-atlas/countries-110m.json'), 50: require('world-atlas/countries-50m.json') };
const FC = {};
for (const k in W) FC[k] = topo.feature(W[k], W[k].objects.countries).features;
// Código numérico ISO 3166 → código de tres letras (el que se usa al escribir los videos).
const ISO = {
  32: 'ARG', 68: 'BOL', 76: 'BRA', 152: 'CHL', 170: 'COL', 218: 'ECU', 600: 'PRY', 604: 'PER', 858: 'URY', 862: 'VEN', 328: 'GUY', 740: 'SUR', 238: 'FLK',
  250: 'FRA', 724: 'ESP', 826: 'GBR', 276: 'DEU', 380: 'ITA', 40: 'AUT', 348: 'HUN', 203: 'CZE', 703: 'SVK', 616: 'POL', 643: 'RUS', 620: 'PRT', 528: 'NLD',
  56: 'BEL', 756: 'CHE', 752: 'SWE', 578: 'NOR', 208: 'DNK', 246: 'FIN', 300: 'GRC', 642: 'ROU', 100: 'BGR', 804: 'UKR', 112: 'BLR', 440: 'LTU', 428: 'LVA',
  233: 'EST', 191: 'HRV', 70: 'BIH', 705: 'SVN', 499: 'MNE', 8: 'ALB', 807: 'MKD', 688: 'SRB', 498: 'MDA', 372: 'IRL', 352: 'ISL', 442: 'LUX', 196: 'CYP',
  840: 'USA', 124: 'CAN', 484: 'MEX', 192: 'CUB', 320: 'GTM', 340: 'HND', 222: 'SLV', 558: 'NIC', 188: 'CRI', 591: 'PAN', 84: 'BLZ', 332: 'HTI', 214: 'DOM',
  388: 'JAM', 630: 'PRI', 44: 'BHS', 780: 'TTO', 304: 'GRL',
  12: 'DZA', 504: 'MAR', 788: 'TUN', 434: 'LBY', 818: 'EGY', 729: 'SDN', 728: 'SSD', 231: 'ETH', 404: 'KEN', 834: 'TZA', 180: 'COD', 178: 'COG', 24: 'AGO',
  710: 'ZAF', 516: 'NAM', 508: 'MOZ', 450: 'MDG', 566: 'NGA', 288: 'GHA', 384: 'CIV', 686: 'SEN', 466: 'MLI', 562: 'NER', 148: 'TCD', 120: 'CMR', 140: 'CAF',
  266: 'GAB', 894: 'ZMB', 716: 'ZWE', 72: 'BWA', 800: 'UGA', 646: 'RWA', 108: 'BDI', 706: 'SOM', 232: 'ERI', 262: 'DJI', 324: 'GIN', 694: 'SLE', 430: 'LBR',
  478: 'MRT', 732: 'ESH', 854: 'BFA', 204: 'BEN', 768: 'TGO', 624: 'GNB', 270: 'GMB', 426: 'LSO', 748: 'SWZ', 454: 'MWI', 226: 'GNQ',
  4: 'AFG', 586: 'PAK', 364: 'IRN', 368: 'IRQ', 760: 'SYR', 376: 'ISR', 400: 'JOR', 422: 'LBN', 682: 'SAU', 887: 'YEM', 512: 'OMN', 784: 'ARE', 414: 'KWT',
  634: 'QAT', 398: 'KAZ', 860: 'UZB', 795: 'TKM', 762: 'TJK', 417: 'KGZ', 496: 'MNG', 50: 'BGD', 104: 'MMR', 764: 'THA', 116: 'KHM', 418: 'LAO', 458: 'MYS',
  702: 'SGP', 360: 'IDN', 608: 'PHL', 36: 'AUS', 554: 'NZL', 598: 'PNG', 158: 'TWN', 144: 'LKA', 524: 'NPL', 64: 'BTN', 392: 'JPN', 156: 'CHN', 356: 'IND',
  410: 'KOR', 408: 'PRK', 704: 'VNM', 792: 'TUR', 268: 'GEO', 51: 'ARM', 31: 'AZE', 626: 'TLS', 96: 'BRN', 10: 'ATA',
};
const code = f => ISO[parseInt(f.id, 10)] || null;
// Lugares (longitud, latitud).
const PLACES = {
  paris: [2.35, 48.86], londres: [-0.13, 51.5], madrid: [-3.7, 40.42], bayona: [-1.47, 43.49], viena: [16.37, 48.21], berlin: [13.4, 52.52], roma: [12.5, 41.9],
  moscu: [37.62, 55.75], petersburgo: [30.32, 59.94], sarajevo: [18.41, 43.86], waterloo: [4.4, 50.68], lisboa: [-9.14, 38.72], cadiz: [-6.29, 36.53],
  versalles: [2.12, 48.8], varsovia: [21.0, 52.23], verdun: [5.38, 49.16], normandia: [-0.6, 49.35], stalingrado: [44.5, 48.7], ginebra: [6.14, 46.2],
  filadelfia: [-75.17, 39.95], washington: [-77.04, 38.9], nuevayork: [-74.0, 40.7], habana: [-82.38, 23.13], mexico: [-99.13, 19.43], caracas: [-66.9, 10.5],
  bogota: [-74.07, 4.71], quito: [-78.47, -0.18], lima: [-77.04, -12.05], buenosaires: [-58.38, -34.6], mendoza: [-68.84, -32.89], montevideo: [-56.16, -34.9],
  lapaz: [-68.15, -16.5], sucre: [-65.26, -19.04], asuncion: [-57.6, -25.3], riodejaneiro: [-43.2, -22.9], brasilia: [-47.9, -15.8], portauprince: [-72.3, 18.5],
  santiago: [-70.67, -33.45], valparaiso: [-71.63, -33.05], concepcion: [-73.05, -36.83], valdivia: [-73.25, -39.81], chiloe: [-73.83, -41.87], rancagua: [-70.74, -34.17],
  chacabuco: [-70.69, -32.98], maipu: [-70.76, -33.51], lircay: [-71.6, -35.4], antofagasta: [-70.4, -23.65], iquique: [-70.14, -20.21], arica: [-70.3, -18.48],
  tacna: [-70.25, -18.01], calama: [-68.93, -22.46], mejillones: [-70.45, -23.1], cobija: [-70.25, -22.55], tocopilla: [-70.2, -22.09], pisagua: [-70.21, -19.6],
  puntaarenas: [-70.91, -53.16], fuertebulnes: [-70.92, -53.63], temuco: [-72.6, -38.74], angol: [-72.71, -37.8], villarrica: [-72.23, -39.28], puertomontt: [-72.94, -41.47],
  copiapo: [-70.33, -27.37], laserena: [-71.25, -29.9], talca: [-71.66, -35.43], chillan: [-72.1, -36.6], coyhaique: [-72.07, -45.57], juanfernandez: [-78.83, -33.64],
  atacama: [-69.5, -24.5], tarapaca: [-69.5, -20.0], loa: [-70.1, -21.43], biobio: [-73.1, -36.8], tolten: [-73.2, -39.2], magallanes: [-70.0, -53.5], cabodehornos: [-67.27, -55.98],
  hiroshima: [132.46, 34.39], nagasaki: [129.87, 32.75], tokio: [139.69, 35.69], pekin: [116.4, 39.9], pearlharbor: [-157.95, 21.36], delhi: [77.2, 28.6], saigon: [106.7, 10.8],
  corea: [127.0, 37.5], cairo: [31.24, 30.04], ciudaddelcabo: [18.42, -33.92], argel: [3.06, 36.75], congo: [15.3, -4.3], suez: [32.55, 29.97], estambul: [28.98, 41.0],
  berlinoeste: [13.3, 52.5], cuba: [-79.5, 21.8], vietnam: [106.0, 16.0], indochina: [104.0, 14.0], india: [78.0, 22.0], sudafrica: [24.0, -29.0], argelia: [3.0, 28.0],
};
// Regiones históricas o administrativas: un rectángulo (longitudes y latitudes) que se recorta con la tierra de un país.
const REGIONS = {
  LITORAL: { of: ['CHL'], box: [-71.5, -24.0, -67.3, -21.43] },          // Litoral boliviano antes de 1879 (del río Loa al paralelo 24)
  TARAPACA: { of: ['CHL'], box: [-71.5, -21.43, -68.3, -19.2] },         // provincia peruana de Tarapacá
  ARICA: { of: ['CHL'], box: [-71.5, -19.2, -69.0, -17.4] },             // Arica (de Chile desde 1929)
  TACNA: { of: ['PER'], box: [-71.6, -18.4, -69.4, -17.3] },             // Tacna (volvió a Perú en 1929)
  ARAUCANIA: { of: ['CHL'], box: [-74.5, -39.3, -70.5, -37.5] },         // entre el Biobío y el Toltén
  CHILE1810: { of: ['CHL'], box: [-74.5, -38.5, -69.0, -26.0] },         // Chile de 1810: de Copiapó al Biobío (sin contar Valdivia y Chiloé)
  NORTEGRANDE: { of: ['CHL'], box: [-71.5, -27.0, -67.0, -17.4] },
  NORTECHICO: { of: ['CHL'], box: [-72.0, -32.2, -68.0, -27.0] },
  CENTRO: { of: ['CHL'], box: [-73.0, -38.5, -69.5, -32.2] },
  SUR: { of: ['CHL'], box: [-75.0, -43.5, -70.5, -38.5] },
  AUSTRAL: { of: ['CHL'], box: [-76.5, -56.5, -66.0, -43.5] },
  PATAGONIA_AR: { of: ['ARG'], box: [-74.0, -55.5, -62.0, -39.0] },
  // Las 16 regiones de Chile, aproximadas por franjas de latitud.
  R15: { of: ['CHL'], box: [-71.5, -19.2, -68.9, -17.4], n: 'Arica y Parinacota' }, R01: { of: ['CHL'], box: [-71.5, -21.6, -68.2, -19.2], n: 'Tarapacá' },
  R02: { of: ['CHL'], box: [-71.5, -26.0, -66.9, -21.6], n: 'Antofagasta' }, R03: { of: ['CHL'], box: [-71.5, -29.3, -68.0, -26.0], n: 'Atacama' },
  R04: { of: ['CHL'], box: [-72.0, -32.2, -69.5, -29.3], n: 'Coquimbo' }, R05: { of: ['CHL'], box: [-72.3, -33.2, -69.7, -32.2], n: 'Valparaíso' },
  R13: { of: ['CHL'], box: [-72.3, -34.1, -69.7, -33.2], n: 'Metropolitana' }, R06: { of: ['CHL'], box: [-72.4, -35.0, -69.8, -34.1], n: "O'Higgins" },
  R07: { of: ['CHL'], box: [-72.9, -36.4, -70.3, -35.0], n: 'Maule' }, R16: { of: ['CHL'], box: [-73.2, -37.2, -70.9, -36.4], n: 'Ñuble' },
  R08: { of: ['CHL'], box: [-73.9, -38.5, -70.9, -37.2], n: 'Biobío' }, R09: { of: ['CHL'], box: [-73.7, -39.6, -70.8, -38.5], n: 'La Araucanía' },
  R14: { of: ['CHL'], box: [-73.8, -40.6, -71.5, -39.6], n: 'Los Ríos' }, R10: { of: ['CHL'], box: [-74.9, -44.0, -71.5, -40.6], n: 'Los Lagos' },
  R11: { of: ['CHL'], box: [-76.0, -49.0, -71.0, -44.0], n: 'Aysén' }, R12: { of: ['CHL'], box: [-76.0, -56.5, -66.0, -49.0], n: 'Magallanes' },
};
// Vistas: proyección, área del mapa en el escenario y zona geográfica que debe caber.
const VIEWS = {
  mundo: { res: 110, proj: () => d3.geoNaturalEarth1(), fit: [[6, 215], [354, 435]], area: null },
  atlantico: { res: 110, proj: () => d3.geoNaturalEarth1().rotate([45, 0]), fit: [[8, 120], [352, 590]], area: [-118, -56, 42, 68] },
  europa: { res: 50, proj: () => d3.geoConicConformal().rotate([-15, 0]).parallels([40, 60]), fit: [[6, 130], [354, 570]], area: [-11, 35, 45, 61] },
  sudamerica: { res: 50, proj: () => d3.geoMercator(), fit: [[24, 110], [336, 600]], area: [-82, -56, -34, 13] },
  amlat: { res: 50, proj: () => d3.geoMercator(), fit: [[10, 110], [350, 600]], area: [-118, -56, -34, 33] },
  chile: { res: 50, proj: () => d3.geoMercator(), fit: [[70, 96], [290, 616]], area: [-76, -56, -66, -17.4] },
  norte: { res: 50, proj: () => d3.geoMercator(), fit: [[8, 130], [352, 580]], area: [-76, -27, -62.5, -15] },
  sur: { res: 50, proj: () => d3.geoMercator(), fit: [[10, 130], [350, 580]], area: [-74.6, -41, -70, -36.4] },
  magallanes: { res: 50, proj: () => d3.geoMercator(), fit: [[8, 130], [352, 580]], area: [-76, -56, -63, -45] },
  africa: { res: 110, proj: () => d3.geoMercator(), fit: [[10, 120], [350, 580]], area: [-19, -36, 53, 38] },
  asia: { res: 110, proj: () => d3.geoMercator(), fit: [[8, 150], [352, 520]], area: [60, -12, 150, 56] },
  pacifico: { res: 110, proj: () => d3.geoMercator().rotate([-170, 0]), fit: [[6, 170], [354, 500]], area: [100, -15, 240, 52] },
};
// d3-geo toma como interior lo que queda a la derecha del anillo: el rectángulo se recorre en sentido horario.
const boxPoly = ([x0, y0, x1, y1]) => ({ type: 'Polygon', coordinates: [[[x0, y0], [x0, y1], [x1, y1], [x1, y0], [x0, y0]]] });
// Ruta SVG con coordenadas a una décima y sin puntos casi repetidos.
function slim(d, tol = 1.1) {
  if (!d) return '';
  let out = '', lx = null, ly = null;
  d.replace(/([MLZ])([^MLZ]*)/g, (m, c, a) => {
    if (c === 'Z') { out += 'Z'; lx = null; return m; }
    const [x, y] = a.split(',').map(Number);
    if (c === 'L' && lx != null && Math.hypot(x - lx, y - ly) < tol) return m;
    out += c + (Math.round(x * 10) / 10) + ' ' + (Math.round(y * 10) / 10);
    lx = x; ly = y;
    return m;
  });
  return out.replace(/M[^MLZ]*(?:L[^MLZ]*){0,1}Z/g, '');
}
const out = {};
for (const [name, V] of Object.entries(VIEWS)) {
  const pr = V.proj();
  const target = V.area ? boxPoly(V.area) : { type: 'Sphere' };
  pr.fitExtent(V.fit, target);
  const [[fx0, fy0], [fx1, fy1]] = V.fit;
  pr.clipExtent([[fx0 - 40, fy0 - 40], [fx1 + 40, fy1 + 40]]);
  const gp = d3.geoPath(pr);
  const shapes = {}, cen = {}, nm = {};
  const inView = b => b[1][0] > fx0 - 4 && b[0][0] < fx1 + 4 && b[1][1] > fy0 - 4 && b[0][1] < fy1 + 4;
  for (const f of FC[V.res]) {
    const c = code(f);
    if (!c || c === 'ATA' && name !== 'mundo') continue;
    if (!inView(gp.bounds(f))) continue;
    const d = slim(gp(f), name === 'chile' || name === 'sur' || name === 'norte' ? .7 : name === 'sudamerica' || name === 'amlat' || name === 'magallanes' ? 1.1 : 1.6);
    if (!d || d.length < 12) continue;
    shapes[c] = d;
    // Centro para el rótulo: el del polígono más grande del país.
    let best = null, ba = -1;
    const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
    polys.forEach(p => { const g = { type: 'Polygon', coordinates: p }, a = gp.area(g); if (a > ba) { ba = a; best = g; } });
    const ct = best ? gp.centroid(best) : gp.centroid(f);
    if (isFinite(ct[0])) cen[c] = [Math.round(ct[0]), Math.round(ct[1])];
    nm[c] = f.properties.name;
  }
  const places = {};
  for (const [k, ll] of Object.entries(PLACES)) {
    const p = pr(ll);
    if (p && p[0] > fx0 - 10 && p[0] < fx1 + 10 && p[1] > fy0 - 10 && p[1] < fy1 + 10) places[k] = [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10];
  }
  const regions = {};
  for (const [k, R] of Object.entries(REGIONS)) {
    const land = FC[50].filter(f => R.of.includes(code(f)));
    if (!land.length) continue;
    const b = R.box;
    if (V.area && (b[2] < V.area[0] || b[0] > V.area[2] || b[3] < V.area[1] || b[1] > V.area[3])) continue;
    if (!V.area) continue;
    const geo = land.map(f => f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]).flat();
    const inter = pc.intersection(geo, boxPoly(b).coordinates);
    if (!inter.length) continue;
    // polygon-clipping entrega los anillos al revés de lo que espera d3-geo: se invierten.
    const g = { type: 'MultiPolygon', coordinates: inter.map(poly => poly.map(ring => ring.slice().reverse())) };
    const d = slim(gp(g), name === 'chile' || name === 'norte' || name === 'sur' ? .7 : 1.2);
    if (!d) continue;
    const ct = gp.centroid(g);
    regions[k] = { d, c: [Math.round(ct[0]), Math.round(ct[1])], n: R.n };
  }
  out[name] = { fit: V.fit, shapes, cen, places, regions };
  const size = JSON.stringify(out[name]).length;
  console.log(`${name}: ${Object.keys(shapes).length} países · ${Object.keys(places).length} lugares · ${Object.keys(regions).length} regiones · ${Math.round(size / 1024)} KB`);
}
const js = `// Mapas de los videos en dibujos (los genera tools/mapas.js con datos de Natural Earth, dominio público).\n(function () {\n  const RB = window.RB = window.RB || {};\n  (RB.toonKit = RB.toonKit || {}).MAPS = ${JSON.stringify(out)};\n})();\n`;
fs.writeFileSync(path.join(root, 'toon-mapas.js'), js);
console.log('toon-mapas.js', Math.round(js.length / 1024), 'KB');
