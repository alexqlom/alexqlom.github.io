// Pruebas PAES y las unidades que estudia cada una. ex: preguntas y minutos de la prueba real.
(function () {
  const RB = window.RB = window.RB || {};
  RB.tests = [
    { id: 'lec', s: 'LEC', n: 'Competencia Lectora', ic: 'book', ex: { n: 65, min: 150 }, units: ['lec1', 'lec2', 'lec3', 'lec4', 'lec5', 'lec6'] },
    { id: 'm1', s: 'M1', n: 'Matemática M1', ic: 'calc', ex: { n: 65, min: 140 }, units: ['m1a', 'm1b', 'm1c', 'm1d', 'm1e', 'm1f', 'm1g', 'm1h', 'm1i', 'm1j', 'm1k', 'm1l'] },
    { id: 'm2', s: 'M2', n: 'Matemática M2', ic: 'sigma', ex: { n: 55, min: 140 }, units: ['m2a', 'm2b', 'm2c', 'm2d', 'm2e', 'm2f'] },
    { id: 'fis', s: 'FIS', n: 'Ciencias · Física', ic: 'magnet', ex: { n: 80, min: 160 }, units: ['fa', 'fb', 'fc', 'fd', 'fe', 'ff', 'fg', 'fh'] },
    { id: 'qui', s: 'QUI', n: 'Ciencias · Química', ic: 'flask', ex: { n: 80, min: 160 }, units: ['qa', 'qb', 'qc', 'qd', 'qe', 'qf', 'qg'] },
    { id: 'bio', s: 'BIO', n: 'Ciencias · Biología', ic: 'dna', ex: { n: 80, min: 160 }, units: ['ba', 'bb', 'bc', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bk'] },
    { id: 'his', s: 'HIS', n: 'Historia y Cs. Sociales', ic: 'landmark', ex: { n: 65, min: 120 }, units: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13', 'h14', 'h15', 'h16', 'h17', 'h18'] },
  ];
  RB.units = RB.units || {};
  RB.texts = RB.texts || {};
  RB.unit = RB.unit || ((id, u) => { u.id = id; RB.units[id] = u; });
  // Atajos para escribir preguntas: en mc la primera opción es la correcta (se barajan al mostrar).
  RB.Q = {
    M: (q, o, e, x) => Object.assign({ t: 'mc', q, o }, e ? { e } : {}, x || {}),
    T: (q, a, e, x) => Object.assign({ t: 'tf', q, a }, e ? { e } : {}, x || {}),
    F: (s, o, e, x) => Object.assign({ t: 'fill', s, o }, e ? { e } : {}, x || {}),
    O: (q, o, e, x) => Object.assign({ t: 'order', q, o }, e ? { e } : {}, x || {}),
    P: (q, p, e, x) => Object.assign({ t: 'match', q, p }, e ? { e } : {}, x || {}),
    S: (q, c, k, e, x) => Object.assign({ t: 'sort', q, c, k }, e ? { e } : {}, x || {}),
    X: (q, o, a, e, x) => Object.assign({ t: 'multi', q, o, a }, e ? { e } : {}, x || {}),
    N: (q, a, u, e, x) => Object.assign({ t: 'num', q, a }, u ? { u } : {}, e ? { e } : {}, x || {}),
  };
})();
