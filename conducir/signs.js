// Señales de tránsito e íconos dibujados en SVG: no dependen de imágenes externas y funcionan sin conexión.
(function () {
  const RB = window.RB = window.RB || {};
  const R = '#D0021B', Y = '#F6C500', O = '#F07D00', BL = '#1F4FA3', K = '#111', W = '#fff';

  const T = (x, y, s, txt, fill = K) =>
    `<text x="${x}" y="${y}" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="${s}" fill="${fill}" text-anchor="middle">${txt}</text>`;
  const reg = (inner, bar) =>
    `<circle cx="50" cy="50" r="44" fill="${W}" stroke="${R}" stroke-width="10"/>${inner}` +
    (bar ? `<line x1="21" y1="21" x2="79" y2="79" stroke="${R}" stroke-width="9"/>` : '');
  const rombo = (inner, fill = Y) =>
    `<path d="M50 3 L97 50 L50 97 L3 50Z" fill="${fill}" stroke="#000" stroke-width="2" stroke-linejoin="round"/>` +
    `<path d="M50 9 L91 50 L50 91 L9 50Z" fill="none" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>${inner}`;
  const info = inner => `<rect x="6" y="6" width="88" height="88" rx="11" fill="${BL}" stroke="${W}" stroke-width="3"/>${inner}`;
  const mirror = inner => `<g transform="matrix(-1 0 0 1 100 0)">${inner}</g>`;

  const carRear = (ox, col) =>
    `<g fill="${col}"><rect x="${ox}" y="47" width="20" height="13" rx="3"/><path d="M${ox + 3} 47 L${ox + 5} 38 H${ox + 15} L${ox + 17} 47Z"/>` +
    `<rect x="${ox + 1}" y="59" width="5" height="6" rx="1"/><rect x="${ox + 14}" y="59" width="5" height="6" rx="1"/></g>`;
  const ped = (sw = 6) =>
    `<g stroke="${K}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M50 40 L47 57 L41 71 M47 57 L55 71 M49 45 L41 52 M49 45 L57 51"/></g><circle cx="51" cy="31" r="6" fill="${K}"/>`;
  const bike = (rider) =>
    `<g fill="none" stroke="${K}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="61" r="9"/><circle cx="64" cy="61" r="9"/>` +
    `<path d="M36 61 L45 47 H59 L64 61 M45 47 L50 61 L59 47 M42 43 H49 M59 47 L57 41 H62"/>` +
    (rider ? `<path d="M51 37 L47 47 M50 40 L58 44"/>` : '') + `</g>` + (rider ? `<circle cx="53" cy="31" r="4.5" fill="${K}"/>` : '');
  const bikeW = `<g fill="none" stroke="${W}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="34" cy="60" r="11"/><circle cx="66" cy="60" r="11"/>` +
    `<path d="M34 60 L45 44 H60 L66 60 M45 44 L50 60 L60 44 M41 39 H49 M60 44 L58 37 H64"/></g>`;
  const moto = `<g fill="none" stroke="${K}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="31" cy="62" r="9"/><circle cx="69" cy="62" r="9"/><path d="M31 62 H50 L60 46 H67 L69 62 M60 46 L57 39 H64"/></g><path d="M38 48 H56 L50 58 H42Z" fill="${K}"/>`;
  const leftArrow = `<path d="M60 74 V50 Q60 38 48 38 H38" fill="none" stroke="${K}" stroke-width="8"/><path d="M40 27 L25 38 L40 49Z" fill="${K}"/>`;
  const curve = `<path d="M42 72 V56 Q42 42 56 40" fill="none" stroke="${K}" stroke-width="7"/><path d="M53 31 L67 40 L53 49Z" fill="${K}"/>`;
  const truck = `<rect x="22" y="36" width="34" height="22" rx="2" fill="${K}"/><path d="M57 42 H68 L76 50 V58 H57Z" fill="${K}"/><circle cx="32" cy="61" r="5" fill="${K}"/><circle cx="68" cy="61" r="5" fill="${K}"/>`;

  // Rotonda: círculo con tres flechas en sentido contrario a los punteros del reloj.
  const roundabout = (() => {
    let s = `<circle cx="50" cy="50" r="15" fill="none" stroke="${K}" stroke-width="6"/>`;
    [90, 210, 330].forEach(deg => {
      const a = deg * Math.PI / 180, px = 50 + 15 * Math.cos(a), py = 50 + 15 * Math.sin(a);
      const dx = Math.sin(a), dy = -Math.cos(a), nx = Math.cos(a), ny = Math.sin(a);
      const f = n => n.toFixed(1);
      s += `<path d="M${f(px + 7 * dx)} ${f(py + 7 * dy)} L${f(px - 3 * dx + 6 * nx)} ${f(py - 3 * dy + 6 * ny)} L${f(px - 3 * dx - 6 * nx)} ${f(py - 3 * dy - 6 * ny)}Z" fill="${K}"/>`;
    });
    return s;
  })();

  const octagon = (r) => {
    const pts = [];
    for (let i = 0; i < 8; i++) { const a = (22.5 + 45 * i) * Math.PI / 180; pts.push((50 + r * Math.cos(a)).toFixed(1) + ',' + (50 + r * Math.sin(a)).toFixed(1)); }
    return pts.join(' ');
  };

  const DRAW = {
    pare: () => `<polygon points="${octagon(48)}" fill="${R}"/><polygon points="${octagon(42)}" fill="none" stroke="${W}" stroke-width="3"/>` + T(50, 59, 25, 'PARE', W),
    ceda: () => `<path d="M10 14 H90 L50 88Z" fill="${W}" stroke="${R}" stroke-width="11" stroke-linejoin="round"/>`,
    noEntrar: () => `<circle cx="50" cy="50" r="48" fill="${R}"/><rect x="18" y="41" width="64" height="18" fill="${W}"/>`,
    noVirarIzq: () => reg(leftArrow, true),
    noVirarDer: () => reg(mirror(leftArrow), true),
    noVirarU: () => reg(`<path d="M62 74 V44 A12 12 0 0 0 38 44 V54" fill="none" stroke="${K}" stroke-width="8"/><path d="M29 52 L38 66 L47 52Z" fill="${K}"/>`, true),
    noAdelantar: () => reg(carRear(27, R) + carRear(53, K)),
    noEstacionar: () => reg(T(50, 66, 46, 'E'), true),
    noBocina: () => reg(`<path d="M28 43 H38 L60 30 V70 L38 57 H28Z" fill="${K}"/>`, true),
    noCamiones: () => reg(truck, true),
    noBicicletas: () => reg(bike(false), true),
    noPeatones: () => reg(ped(6), true),
    pesoMax: () => reg(T(50, 61, 30, '10t')),
    alturaMax: () => reg(T(50, 59, 22, '4,2m') + `<path d="M50 16 L43 25 H57Z M50 84 L43 75 H57Z" fill="${K}"/>`),
    anchoMax: () => reg(T(50, 59, 22, '2,5m') + `<path d="M14 50 L23 43 V57Z M86 50 L77 43 V57Z" fill="${K}"/>`),
    noMotos: () => reg(moto, true),
    soloBus: () => `<rect x="5" y="10" width="90" height="80" rx="9" fill="${BL}" stroke="${W}" stroke-width="3"/><rect x="33" y="19" width="34" height="30" rx="5" fill="${W}"/><rect x="37" y="23" width="26" height="12" rx="2" fill="${BL}"/><rect x="36" y="48" width="7" height="5" fill="${W}"/><rect x="57" y="48" width="7" height="5" fill="${W}"/>` + T(50, 76, 15, 'SOLO BUS', W),
    cruzSanAndres: () => [45, -45].map(d => `<g transform="rotate(${d} 50 50)"><rect x="41" y="2" width="18" height="96" fill="${R}"/><rect x="44" y="5" width="12" height="90" fill="${W}"/></g>`).join(''),

    curvaDer: () => rombo(curve),
    curvaIzq: () => rombo(mirror(curve)),
    curvas: () => rombo(`<path d="M42 74 V64 Q42 56 50 52 Q58 48 58 40 V36" fill="none" stroke="${K}" stroke-width="6"/><path d="M50 38 L58 25 L66 38Z" fill="${K}"/>`),
    escolares: () => rombo(`<g stroke="${K}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M43 41 L41 56 L36 68 M41 56 L46 68 M42 45 L36 52 M42 45 L50 49"/><path d="M58 50 L57 60 L53 69 M57 60 L61 69 M58 53 L52 56"/></g><circle cx="44" cy="34" r="5" fill="${K}"/><circle cx="59" cy="44" r="4" fill="${K}"/>`),
    peatones: () => rombo(ped(5.5)),
    resalto: () => rombo(`<path d="M24 62 H38 Q50 42 62 62 H76" fill="none" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>`),
    semaforoAdelante: () => rombo(`<rect x="41" y="24" width="18" height="52" rx="5" fill="${K}"/><circle cx="50" cy="34" r="5.5" fill="#E3262A"/><circle cx="50" cy="50" r="5.5" fill="${Y}"/><circle cx="50" cy="66" r="5.5" fill="#2DB34A"/>`),
    cruceFerroviario: () => rombo(`<rect x="28" y="40" width="38" height="20" rx="2" fill="${K}"/><rect x="58" y="32" width="12" height="28" rx="2" fill="${K}"/><rect x="34" y="33" width="6" height="8" fill="${K}"/><circle cx="36" cy="63" r="4.5" fill="${K}"/><circle cx="50" cy="63" r="4.5" fill="${K}"/><circle cx="64" cy="63" r="4.5" fill="${K}"/>`),
    cruceVias: () => rombo(`<path d="M50 26 V74 M26 50 H74" stroke="${K}" stroke-width="9"/>`),
    rotondaAdelante: () => rombo(roundabout),
    estrechamiento: () => rombo(`<path d="M36 76 L42 52 V24 M64 76 L58 52 V24" fill="none" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>`),
    pendiente: () => rombo(`<path d="M26 70 H74 V44Z" fill="${K}"/>` + T(42, 53, 13, '10%')),
    resbaladizo: () => rombo(`<rect x="40" y="30" width="20" height="12" rx="3" fill="${K}"/><path d="M43 30 L45 23 H55 L57 30Z" fill="${K}"/><path d="M42 48 q-6 6 0 12 t0 12 M58 48 q6 6 0 12 t0 12" fill="none" stroke="${K}" stroke-width="3.5"/>`),
    animales: () => rombo(`<g fill="${K}"><ellipse cx="47" cy="50" rx="17" ry="9"/><circle cx="66" cy="45" r="6"/><rect x="33" y="56" width="4" height="13"/><rect x="40" y="56" width="4" height="13"/><rect x="52" y="56" width="4" height="13"/><rect x="58" y="56" width="4" height="13"/></g><path d="M63 39 l-3 -5 M69 39 l3 -5 M30 47 q-4 6 -2 12" stroke="${K}" stroke-width="2.5" fill="none"/>`),
    ciclistas: () => rombo(`<g transform="translate(50 50) scale(.82) translate(-50 -50)">${bike(true)}</g>`),
    tunel: () => rombo(`<path d="M28 72 V54 A22 22 0 0 1 72 54 V72 H62 V56 A12 12 0 0 0 38 56 V72Z" fill="${K}"/>`),
    viento: () => rombo(`<path d="M34 74 V30" stroke="${K}" stroke-width="4" stroke-linecap="round"/><path d="M36 32 L70 37 V48 L36 53Z" fill="${K}"/><path d="M47 33.6 L58 35.2 V49.6 L47 51.2Z" fill="${Y}"/>`),
    derrumbes: () => rombo(`<path d="M27 74 V38 L63 74Z" fill="${K}"/><circle cx="58" cy="43" r="6" fill="${K}"/><circle cx="68" cy="55" r="5" fill="${K}"/><circle cx="53" cy="57" r="4" fill="${K}"/>`),
    dobleSentido: () => rombo(`<path d="M42 72 V34 M58 28 V66" stroke="${K}" stroke-width="6"/><path d="M34 38 L42 25 L50 38Z M50 62 L58 75 L66 62Z" fill="${K}"/>`),

    estacionamiento: () => info(T(50, 71, 60, 'E', W)),
    ciclovia: () => info(bikeW),
    calleSinSalida: () => info(`<rect x="44" y="40" width="12" height="44" fill="${W}"/><rect x="22" y="20" width="56" height="15" fill="${R}"/>`),
    pasoPeatonal: () => info(`<path d="M50 13 L87 84 H13Z" fill="${W}"/><g transform="translate(50 58) scale(.6) translate(-50 -50)">${ped(6)}</g><path d="M30 76h8v4h-8zM42 76h8v4h-8zM54 76h8v4h-8zM66 76h6v4h-6z" fill="${K}"/>`),
    discapacidad: () => info(`<circle cx="45" cy="25" r="6" fill="${W}"/><g fill="none" stroke="${W}" stroke-linecap="round" stroke-linejoin="round"><path d="M45 34 V54 H62 L68 70" stroke-width="6"/><path d="M45 44 H58" stroke-width="5"/><path d="M37 49 A16 16 0 1 0 60 71" stroke-width="5"/></g>`),
    hospital: () => info(T(50, 71, 60, 'H', W)),
    paradero: () => info(`<rect x="31" y="22" width="38" height="48" rx="7" fill="${W}"/><rect x="36" y="28" width="28" height="18" rx="2" fill="${BL}"/><circle cx="39" cy="58" r="3" fill="${BL}"/><circle cx="61" cy="58" r="3" fill="${BL}"/><rect x="34" y="70" width="8" height="7" rx="1.5" fill="${W}"/><rect x="58" y="70" width="8" height="7" rx="1.5" fill="${W}"/>`),
    servicentro: () => info(`<rect x="32" y="26" width="24" height="44" rx="3" fill="${W}"/><rect x="36" y="31" width="16" height="11" fill="${BL}"/><path d="M56 36 H62 Q66 36 66 40 V60 Q66 66 61 64" fill="none" stroke="${W}" stroke-width="4"/><rect x="28" y="70" width="32" height="5" fill="${W}"/>`),

    hombresTrabajando: () => rombo(`<g stroke="${K}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M44 37 L42 54 L36 68 M42 54 L49 68 M43 42 L55 48"/><path d="M50 38 L64 60" stroke-width="3.5"/></g><circle cx="44" cy="31" r="5" fill="${K}"/><path d="M61 58 l7 3 l-2 6 l-7 -3Z M54 72 Q64 58 74 72Z" fill="${K}"/>`, O),
    desvio: () => rombo(`<path d="M40 74 V54 L60 42 V32" fill="none" stroke="${K}" stroke-width="7" stroke-linejoin="round"/><path d="M52 36 L60 23 L68 36Z" fill="${K}"/>`, O),
  };

  // Catálogo con nombre, tipo y explicación (las velocidades se generan con la clave velNN).
  const CAT = {
    reg: 'Reglamentarias', adv: 'Advertencia', inf: 'Informativas', tra: 'Faenas',
  };
  const META = {
    pare: ['PARE', 'reg', 'Obliga a detenerse por completo antes de la línea de detención y a ceder el paso a los vehículos de la otra vía, aunque no venga nadie.'],
    ceda: ['Ceda el paso', 'reg', 'Debes ceder el paso a quienes circulan por la vía a la que te acercas. Te detienes solo si es necesario para no interferir.'],
    noEntrar: ['No entrar', 'reg', 'Prohíbe el ingreso de vehículos en ese sentido de tránsito.'],
    noVirarIzq: ['Prohibido virar a la izquierda', 'reg', 'No puedes virar a la izquierda en ese cruce.'],
    noVirarDer: ['Prohibido virar a la derecha', 'reg', 'No puedes virar a la derecha en ese cruce.'],
    noVirarU: ['Prohibido virar en U', 'reg', 'No puedes dar la vuelta en U para volver en sentido contrario.'],
    noAdelantar: ['Prohibido adelantar', 'reg', 'No puedes adelantar a otros vehículos motorizados desde la señal en adelante.'],
    noEstacionar: ['Prohibido estacionar', 'reg', 'No puedes estacionar. Sí puedes detenerte un momento para subir o bajar personas.'],
    noBocina: ['Prohibido usar la bocina', 'reg', 'No se permite tocar la bocina en esa zona, salvo para evitar un accidente.'],
    noCamiones: ['Prohibido el tránsito de camiones', 'reg', 'Los vehículos de carga no pueden circular por esa vía.'],
    noBicicletas: ['Prohibido el tránsito de bicicletas', 'reg', 'Las bicicletas no pueden circular por esa vía.'],
    noPeatones: ['Prohibido el tránsito de peatones', 'reg', 'Los peatones no pueden circular por esa vía.'],
    vel50: ['Velocidad máxima 50 km/h', 'reg', 'No puedes superar la velocidad indicada. Es un máximo, no una meta: adapta tu velocidad a las condiciones.'],
    vel100: ['Velocidad máxima 100 km/h', 'reg', 'Velocidad máxima permitida en ese tramo. Con lluvia, neblina o tránsito denso, ve más lento.'],
    vel120: ['Velocidad máxima 120 km/h', 'reg', 'Velocidad máxima habitual en autopistas para vehículos livianos, salvo señal distinta.'],
    vel30: ['Velocidad máxima 30 km/h', 'reg', 'Es el límite en zonas escolares en el horario de entrada y salida de alumnos. También se usa en otras calles con mucha presencia de peatones.'],
    vel90: ['Velocidad máxima 90 km/h', 'reg', 'Velocidad máxima en ese tramo. En zonas rurales, es además el tope para camiones de 3.860 kg o más, transporte escolar y la mayoría de los buses.'],
    anchoMax: ['Ancho máximo', 'reg', 'Prohíbe el paso de vehículos más anchos que lo indicado (en este ejemplo, 2,5 metros).'],
    noMotos: ['Prohibido el tránsito de motocicletas', 'reg', 'Las motocicletas no pueden circular por esa vía.'],
    soloBus: ['Pista solo bus', 'reg', 'Indica una pista o vía exclusiva para buses de transporte público. Los demás vehículos no pueden circular por ella en el horario indicado.'],
    pesoMax: ['Peso máximo', 'reg', 'Prohíbe el paso de vehículos cuyo peso supere el indicado (en este ejemplo, 10 toneladas).'],
    alturaMax: ['Altura máxima', 'reg', 'Prohíbe el paso de vehículos más altos que lo indicado (en este ejemplo, 4,2 metros).'],
    cruzSanAndres: ['Cruz de San Andrés', 'reg', 'Marca un cruce ferroviario a nivel. El tren siempre tiene preferencia: detente si se acerca uno.'],
    curvaDer: ['Curva a la derecha', 'adv', 'Advierte una curva a la derecha más adelante. Reduce la velocidad antes de entrar.'],
    curvaIzq: ['Curva a la izquierda', 'adv', 'Advierte una curva a la izquierda más adelante. Reduce la velocidad antes de entrar.'],
    curvas: ['Curva y contracurva', 'adv', 'Advierte curvas sucesivas en sentidos opuestos.'],
    escolares: ['Zona escolar', 'adv', 'Hay niños cerca de la vía: reduce la velocidad y prepárate para detenerte.'],
    peatones: ['Paso peatonal', 'adv', 'Advierte un cruce de peatones más adelante.'],
    resalto: ['Resalto', 'adv', 'Advierte un resalto o reductor de velocidad (lomo de toro) más adelante.'],
    semaforoAdelante: ['Semáforo adelante', 'adv', 'Advierte que hay un semáforo más adelante, que quizás aún no ves.'],
    cruceFerroviario: ['Cruce ferroviario', 'adv', 'Advierte un cruce con la vía del tren más adelante.'],
    cruceVias: ['Cruce de vías', 'adv', 'Advierte un cruce con otra calle o camino más adelante.'],
    rotondaAdelante: ['Rotonda adelante', 'adv', 'Advierte una rotonda. Recuerda: tienen preferencia quienes ya circulan dentro de ella.'],
    estrechamiento: ['Estrechamiento de calzada', 'adv', 'La calzada se angosta más adelante.'],
    pendiente: ['Pendiente pronunciada', 'adv', 'Advierte una bajada o subida fuerte. En bajadas, usa un cambio más bajo.'],
    resbaladizo: ['Pavimento resbaladizo', 'adv', 'El pavimento puede ser resbaladizo, sobre todo con lluvia o hielo.'],
    animales: ['Animales en la vía', 'adv', 'Pueden cruzar animales. Reduce la velocidad y mantente atento.'],
    ciclistas: ['Ciclistas', 'adv', 'Advierte la presencia de ciclistas en la vía.'],
    tunel: ['Túnel', 'adv', 'Advierte un túnel más adelante: enciende las luces, no adelantes, no te detengas y no uses la bocina dentro.'],
    viento: ['Viento lateral', 'adv', 'Advierte una zona con viento lateral fuerte: sujeta firme el volante y reduce la velocidad.'],
    derrumbes: ['Zona de derrumbes', 'adv', 'Advierte una posible caída de piedras o derrumbes en la vía.'],
    dobleSentido: ['Tránsito en ambos sentidos', 'adv', 'Advierte que la vía pasa a tener tránsito en ambos sentidos.'],
    ciclovia: ['Ciclovía', 'inf', 'Indica una vía para ciclos, como bicicletas. Los vehículos motorizados no pueden circular ni estacionar en ella.'],
    calleSinSalida: ['Calle sin salida', 'inf', 'Indica que la calle no tiene salida para vehículos.'],
    pasoPeatonal: ['Paso peatonal', 'inf', 'Indica la ubicación de un paso para peatones, donde ellos tienen preferencia.'],
    discapacidad: ['Estacionamiento para personas con discapacidad', 'inf', 'Lugar reservado para vehículos de personas con discapacidad. Ocuparlo sin derecho es una infracción.'],
    estacionamiento: ['Estacionamiento', 'inf', 'Indica un lugar donde se permite estacionar.'],
    hospital: ['Hospital', 'inf', 'Indica la cercanía de un hospital: evita ruidos innecesarios.'],
    paradero: ['Paradero de buses', 'inf', 'Indica un paradero de transporte público.'],
    servicentro: ['Servicentro', 'inf', 'Indica una estación de servicio con combustible.'],
    hombresTrabajando: ['Trabajos en la vía', 'tra', 'Señal transitoria (naranja): hay trabajadores o faenas en la vía. Reduce la velocidad.'],
    desvio: ['Desvío', 'tra', 'Señal transitoria (naranja): el tránsito se desvía por trabajos en la vía.'],
  };

  function body(key) {
    const m = /^vel(\d+)$/.exec(key);
    if (m) return reg(T(50, m[1].length > 2 ? 62 : 64, m[1].length > 2 ? 33 : 40, m[1]));
    return (DRAW[key] || (() => ''))();
  }

  RB.signs = META;
  RB.signCats = CAT;
  RB.hasSign = key => !!(DRAW[key] || /^vel\d+$/.test(key));
  RB.signName = key => (META[key] || [key])[0];
  // Devuelve la señal como <svg>; con x/y se puede anidar dentro de otra escena SVG.
  RB.sign = (key, size = 96, x, y) =>
    `<svg ${x != null ? `x="${x - size / 2}" y="${y - size / 2}" ` : ''}width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="${RB.signName(key)}">${body(key)}</svg>`;

  // Íconos de línea (24×24). Usan currentColor para tomar el color del texto.
  const P = {
    road: 'M7 21 10 3M17 21 14 3M12 6v2M12 11v2M12 16v2',
    play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
    pause: 'M8 5v14M16 5v14',
    replay: 'M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
    sign: 'M12 3 22 20H2ZM12 9v5M12 17v.5',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    flame: 'M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z',
    heart: '<path d="M12 20s-7-4.4-9-8.5C1.5 8.1 3.6 5 6.8 5c2 0 3.4 1.1 5.2 3 1.8-1.9 3.2-3 5.2-3 3.2 0 5.3 3.1 3.8 6.5-2 4.1-9 8.5-9 8.5z" fill="currentColor"/>',
    bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    check: 'M5 12.5 9.5 17 19 7',
    x: 'M6 6l12 12M18 6 6 18',
    stop: 'M8 3h8l5 5v8l-5 5H8l-5-5V8z',
    light: '<rect x="8" y="2" width="8" height="20" rx="3"/><circle cx="12" cy="7" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="17" r="1.5"/>',
    speed: 'M4 18a8 8 0 1 1 16 0M12 18l4-6',
    overtake: 'M16 21v-6c0-3-8-3-8-6V4M5 7l3-3 3 3',
    cross: 'M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6',
    round: '<circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',
    ped: '<circle cx="13" cy="4" r="2"/><path d="m13 7-2 6 3 3v5M11 13l-3 8M11 9l-3 3M13 9l3 3"/>',
    bike: '<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="m6 16 4-7h5l3 7M10 9l3 7M14 6h2"/>',
    moto: '<circle cx="5" cy="16" r="3"/><circle cx="19" cy="16" r="3"/><path d="M5 16h6l3-5h3l2 5M14 11l-2-3h-2"/>',
    child: '<circle cx="9" cy="5" r="2"/><circle cx="16" cy="8" r="1.6"/><path d="M9 8v6l-2 6M9 14l2 6M16 11v4l-1.5 5M16 15l1.5 5"/>',
    glass: 'M7 3h10l-1 8a4 4 0 0 1-8 0zM12 15v6M8 21h8',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    moon: 'M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z',
    shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5',
    rain: 'M6 14a4 4 0 0 1 1-7.9A5 5 0 0 1 17 7a4 4 0 0 1 1 7.9M8 18l-1 3M12 18l-1 3M16 18l-1 3',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    aid: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M9 6V4h6v2M12 10v6M9 13h6"/>',
    doc: 'M6 2h9l4 4v16H6zM14 2v5h5M9 12h7M9 16h7',
    wrench: 'M15 4a5 5 0 0 0-5 6.5L3 17.5 6.5 21l7-7A5 5 0 0 0 20 9l-3 3-3-1-1-3z',
    tire: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',
    bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 10h16M7 21v-3M17 21v-3"/><circle cx="8" cy="14.5" r="1"/><circle cx="16" cy="14.5" r="1"/>',
    taxi: 'M5 14l1.5-5h11L19 14M3 14h18v4H3zM10 9V6h4v3M6 18v2M18 18v2',
    truck: '<path d="M2 6h12v10H2zM14 9h4l3 3v4h-7z"/><circle cx="6" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    box: 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10',
    tractor: '<circle cx="7" cy="15" r="5"/><circle cx="18" cy="17" r="3"/><path d="M7 10V5h6l2 5h4v4M13 5v5"/>',
    horse: 'M6 4c-1 6 0 14 6 14s7-8 6-14M4.5 5h3M16.5 5h3',
    siren: 'M7 18v-6a5 5 0 0 1 10 0v6M5 18h14v3H5zM12 3v2M4 8l1.5 1M20 8l-1.5 1',
    exam: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M8.5 13l2.5 2.5 4.5-5"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor"/>',
    trophy: 'M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M10 17h4',
    chart: 'M4 20V10M10 20V4M16 20v-7M3 20h18',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
    vol: 'M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11',
    mute: 'M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6',
    flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z',
    flask: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3',
    cards: '<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/>',
    right: 'M5 12h14M13 6l6 6-6 6',
    left: 'M15 6l-6 6 6 6',
    down: 'M12 3v12M7 10l5 5 5-5M4 21h16',
    up: 'M12 15V3M7 8l5-5 5 5M4 21h16',
    trash: 'M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14',
    car: 'M5 13l1.6-5h10.8L19 13M3 13h18v5H3zM6 18v2M18 18v2M6.5 15.5h1M16.5 15.5h1',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    cc: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10.5 10.2a2.2 2.2 0 1 0 0 3.6M17 10.2a2.2 2.2 0 1 0 0 3.6"/>',
    wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.2"/><path d="M3.3 10.8h6.5M14.2 10.8h6.5M12 14.2v6.6"/>',
    joy: '<circle cx="12" cy="5" r="2.4"/><path d="M12 7.4V13M6 13h12l1.5 4.5V20h-15v-2.5z"/>',
    dig: '<rect x="2" y="17" width="12" height="4" rx="2"/><path d="M4 17v-5h5l1.5 5M9 12l5-6.5 5 3.5M19 9l1.5 4-3 .5"/>',
    fork: '<path d="M3 18V10h5l3 4.5V18M8 10V6H5M15 3v15M15 16h6"/><circle cx="6" cy="19.5" r="1.5"/><circle cx="11" cy="19.5" r="1.5"/>',
  };
  RB.icon = (name, cls = '') => {
    const d = P[name] || P.info;
    const inner = d.startsWith('<') ? d : `<path d="${d}"/>`;
    return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  };
  RB.hasIcon = name => !!P[name];
})();
