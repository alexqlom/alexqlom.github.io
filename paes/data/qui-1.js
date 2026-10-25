// Química (1): modelos atómicos y estructura del átomo; tabla periódica y propiedades periódicas.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- El átomo ----------
  RB.unit('qa', {
    name: 'El átomo', desc: 'Modelos atómicos, partículas subatómicas, número atómico y másico, isótopos, iones y configuración electrónica.', ic: 'atom', vid: 'v-qa', area: 'Estructura atómica',
    lessons: [
      {
        n: 'Modelos atómicos', ic: 'atom', items: [
          { t: 'info', ic: 'atom', title: 'Los modelos', txt: 'Dalton (esfera indivisible) → Thomson (budín de pasas, descubre el electrón) → Rutherford (núcleo pequeño y denso) → Bohr (niveles de energía) → modelo mecano-cuántico (orbitales).' },
          O('Ordena los modelos atómicos según su aparición', ['Dalton: esferas indivisibles', 'Thomson: "budín de pasas"', 'Rutherford: núcleo pequeño y denso', 'Bohr: electrones en niveles de energía', 'Mecano-cuántico: orbitales'], 'Cada modelo corrigió al anterior con nueva evidencia.'),
          M('¿Qué experimento llevó a Rutherford a proponer un núcleo pequeño y denso?', ['El bombardeo de una lámina de oro con partículas alfa', 'El tubo de rayos catódicos', 'La gota de aceite', 'La descomposición del agua'], 'Algunas partículas rebotaban: chocaban con algo muy denso.'),
          M('El modelo de Thomson describía el átomo como:', ['Una esfera positiva con electrones incrustados', 'Un núcleo con electrones en órbitas', 'Una esfera indivisible', 'Una nube de probabilidad'], 'Por eso se le llamó "budín de pasas".'),
          M('Según Bohr, los electrones:', ['Giran en niveles de energía definidos y emiten o absorben energía al cambiar de nivel', 'Están incrustados en una masa positiva', 'Están en el núcleo', 'No tienen energía'], 'Explicó los espectros de emisión del hidrógeno.'),
          T('Según el experimento de Rutherford, la mayor parte del átomo es espacio vacío.', true, 'Casi todas las partículas alfa atravesaban la lámina sin desviarse.'),
          M('¿Qué partícula descubrió Thomson?', ['El electrón', 'El protón', 'El neutrón', 'El núcleo'], 'Lo hizo con el tubo de rayos catódicos.'),
          M('En el modelo mecano-cuántico, un orbital es:', ['Una región donde es más probable encontrar un electrón', 'Una órbita circular exacta', 'Un tipo de núcleo', 'Un protón en movimiento'], 'No hay trayectorias exactas, solo probabilidades.'),
        ],
      },
      {
        n: 'Partículas, Z y A', ic: 'calc', items: [
          { t: 'info', ic: 'calc', title: 'Z y A', txt: '**Z** (número atómico) = protones. **A** (número másico) = protones + neutrones. En un átomo neutro, electrones = protones. Un **catión** perdió electrones; un **anión** los ganó.' },
          M('Un átomo tiene Z = 11 y A = 23. ¿Cuántos neutrones tiene?', ['12', '11', '23', '34'], 'n = A − Z = 23 − 11.'),
          M('Un átomo neutro de cloro tiene Z = 17. ¿Cuántos electrones tiene?', ['17', '18', '35', '16'], 'En un átomo neutro, electrones = protones.'),
          M('El ion Na⁺ (Z = 11) tiene:', ['11 protones y 10 electrones', '11 protones y 12 electrones', '10 protones y 11 electrones', '12 protones y 11 electrones'], 'Perdió un electrón; los protones no cambian.'),
          M('El ion O²⁻ (Z = 8) tiene:', ['10 electrones', '6 electrones', '8 electrones', '16 electrones'], 'Ganó dos electrones: 8 + 2.'),
          M('Los isótopos de un elemento tienen:', ['Igual número de protones y distinto número de neutrones', 'Distinto número de protones', 'Igual número de neutrones y distinto de protones', 'Distinta carga eléctrica'], 'Por eso tienen distinto A, pero son el mismo elemento.'),
          P('Une cada partícula con su carga y ubicación', [['Protón', 'Positiva, en el núcleo'], ['Neutrón', 'Sin carga, en el núcleo'], ['Electrón', 'Negativa, alrededor del núcleo']], 'El electrón tiene una masa mucho menor que el protón.'),
          M('El carbono-14 y el carbono-12 se diferencian en:', ['El número de neutrones', 'El número de protones', 'El número de electrones del átomo neutro', 'El símbolo químico'], 'Ambos tienen 6 protones: el C-14 tiene 8 neutrones y el C-12, 6.'),
          T('El número atómico Z identifica a cada elemento químico.', true, 'Si cambia el número de protones, cambia el elemento.'),
          N('El hierro-56 tiene Z = 26. ¿Cuántos neutrones tiene?', 30, '', '56 − 26 = 30.'),
          M('Un catión es un átomo que:', ['Perdió electrones y quedó con carga positiva', 'Ganó electrones', 'Ganó protones', 'Perdió neutrones'], 'Los aniones ganan electrones y quedan negativos.'),
          M('El cloro tiene dos isótopos: Cl-35 (75 %) y Cl-37 (25 %). ¿Cuál es su masa atómica promedio?', ['35,5', '36', '35', '37'], 'Promedio ponderado: 35 · 0,75 + 37 · 0,25 = 35,5.'),
        ],
      },
      {
        n: 'Configuración electrónica', ic: 'list', items: [
          { t: 'info', ic: 'list', title: 'Configuración', txt: 'Los electrones llenan los subniveles en orden: 1s 2s 2p 3s 3p 4s 3d… Capacidad: **s = 2, p = 6, d = 10**. Los electrones del último nivel son los **electrones de valencia**.' },
          M('La configuración electrónica del sodio (Z = 11) es:', ['1s² 2s² 2p⁶ 3s¹', '1s² 2s² 2p⁷', '1s² 2s² 2p⁶ 3p¹', '1s² 2s⁸ 3s¹'], 'Después de 2p⁶ viene 3s.'),
          M('¿Cuántos electrones de valencia tiene el oxígeno (1s² 2s² 2p⁴)?', ['6', '8', '2', '4'], 'Último nivel: 2s² 2p⁴ = 6.'),
          M('¿Cuántos electrones caben como máximo en un subnivel p?', ['6', '2', '10', '8'], 'Tres orbitales con 2 electrones cada uno.'),
          M('La configuración 1s² 2s² 2p⁶ corresponde a un átomo de Z =', ['10', '8', '6', '12'], '2 + 2 + 6 = 10: es el neón.'),
          M('Los elementos de un mismo grupo de la tabla periódica tienen:', ['Igual número de electrones de valencia', 'Igual número de neutrones', 'Igual masa', 'Igual número de niveles'], 'Por eso tienen propiedades químicas parecidas.'),
          T('Los gases nobles tienen su último nivel completo, lo que los hace muy estables.', true, 'Casi no reaccionan.'),
          M('El último electrón del cloro (Z = 17) está en el subnivel:', ['3p', '3s', '2p', '4s'], '1s² 2s² 2p⁶ 3s² 3p⁵.'),
          M('¿Cuántos niveles de energía ocupados tiene el calcio (Z = 20, configuración terminada en 4s²)?', ['4', '2', '3', '20'], 'El nivel más alto ocupado es el 4.'),
        ],
      },
    ],
  });

  // ---------- Tabla periódica ----------
  RB.unit('qb', {
    name: 'Tabla periódica', desc: 'Organización en grupos y períodos, metales y no metales, y propiedades periódicas.', ic: 'grid', vid: 'v-qb', area: 'Estructura atómica',
    lessons: [
      {
        n: 'Cómo se organiza', ic: 'grid', items: [
          { t: 'info', ic: 'grid', title: 'La tabla', txt: 'Los elementos se ordenan por **número atómico**. Las **filas** son períodos (número de niveles) y las **columnas** son grupos (mismos electrones de valencia y propiedades parecidas).' },
          M('En la tabla periódica, los elementos se ordenan por:', ['Número atómico creciente', 'Masa atómica creciente', 'Orden alfabético', 'Fecha de descubrimiento'], 'Es el criterio moderno, propuesto por Moseley.'),
          M('El número del período indica:', ['El número de niveles de energía ocupados', 'Los electrones de valencia', 'El número de neutrones', 'La masa atómica'], 'El sodio está en el período 3 porque ocupa 3 niveles.'),
          P('Une cada grupo con su nombre', [['Grupo 1', 'Metales alcalinos'], ['Grupo 2', 'Metales alcalinotérreos'], ['Grupo 17', 'Halógenos'], ['Grupo 18', 'Gases nobles']], 'Son los grupos con nombre propio más preguntados.'),
          M('¿Cuál de estos elementos es un gas noble?', ['Neón', 'Nitrógeno', 'Sodio', 'Cloro'], 'Grupo 18: helio, neón, argón, kriptón, xenón, radón.'),
          S('Clasifica cada elemento', ['Metal', 'No metal'], [['Hierro', 0], ['Oxígeno', 1], ['Cobre', 0], ['Azufre', 1], ['Sodio', 0], ['Carbono', 1]], 'Los metales están a la izquierda y al centro; los no metales, arriba a la derecha.'),
          M('Las propiedades típicas de los metales son:', ['Ser buenos conductores de calor y electricidad, con brillo y maleabilidad', 'Ser malos conductores y frágiles', 'Ser gases a temperatura ambiente', 'No tener brillo y ser aislantes'], 'Por eso se usan en cables y herramientas.'),
          M('¿En qué grupo está un elemento cuya configuración termina en 3s²?', ['Grupo 2', 'Grupo 3', 'Grupo 12', 'Grupo 18'], 'Tiene 2 electrones de valencia en un subnivel s: es el magnesio.'),
          T('Mendeleiev dejó espacios vacíos en su tabla para elementos aún no descubiertos.', true, 'Incluso predijo sus propiedades.'),
          M('El cobre, el hierro y el oro pertenecen a:', ['Los metales de transición', 'Los gases nobles', 'Los halógenos', 'Los no metales'], 'Están en el bloque d, al centro de la tabla.'),
          M('Un elemento termina su configuración en 4s¹. ¿En qué período y grupo está?', ['Período 4, grupo 1', 'Período 1, grupo 4', 'Período 4, grupo 4', 'Período 1, grupo 1'], 'El nivel 4 indica el período y un electrón en s, el grupo 1: es el potasio.'),
          M('¿Qué grupo de elementos reacciona violentamente con el agua?', ['Los metales alcalinos', 'Los gases nobles', 'Los metales de transición', 'Los halógenos sólidos'], 'Pierden muy fácil su único electrón de valencia.'),
        ],
      },
      {
        n: 'Propiedades periódicas', ic: 'chart', items: [
          { t: 'info', ic: 'chart', title: 'Tendencias', txt: '**Radio atómico**: aumenta hacia abajo y hacia la izquierda. **Electronegatividad** y **energía de ionización**: aumentan hacia arriba y hacia la derecha (el flúor es el más electronegativo).' },
          M('En un grupo de la tabla periódica, al bajar, el radio atómico:', ['Aumenta', 'Disminuye', 'No cambia', 'Se anula'], 'Se agregan niveles de energía.'),
          M('En un período, de izquierda a derecha, el radio atómico:', ['Disminuye', 'Aumenta', 'No cambia', 'Primero aumenta y luego disminuye'], 'Hay más protones atrayendo a los electrones del mismo nivel.'),
          M('¿Cuál es el elemento más electronegativo?', ['Flúor', 'Francio', 'Oxígeno', 'Cesio'], 'Está arriba a la derecha (sin contar los gases nobles).'),
          M('La energía de ionización es:', ['La energía necesaria para quitarle un electrón a un átomo gaseoso', 'La energía liberada al formar un enlace', 'La energía del núcleo', 'La energía de un fotón'], 'Mientras más alta, más difícil es formar un catión.'),
          M('¿Qué átomo tiene mayor radio: Na o Cl (ambos del período 3)?', ['Na', 'Cl', 'Son iguales', 'Depende de la temperatura'], 'El Na está más a la izquierda.'),
          M('¿Cuál tiene menor energía de ionización: Li o Cs (grupo 1)?', ['Cs', 'Li', 'Son iguales', 'Ninguno tiene'], 'El Cs es más grande: su electrón externo está más lejos del núcleo.'),
          T('Los metales alcalinos pierden fácilmente su electrón de valencia.', true, 'Por eso son muy reactivos.'),
          M('Un catión, comparado con su átomo neutro, es:', ['Más pequeño', 'Más grande', 'Del mismo tamaño', 'Sin núcleo'], 'Pierde electrones y los que quedan son atraídos con más fuerza.'),
          M('La electronegatividad es:', ['La tendencia de un átomo a atraer los electrones de un enlace', 'La carga del núcleo', 'El número de electrones', 'La masa del átomo'], 'Decide la polaridad de los enlaces.'),
        ],
      },
    ],
  });

  // ---------- Videos ----------
  RB.video('v-qa', {
    u: 'qa', title: 'El átomo por dentro', desc: 'Modelos atómicos, protones, neutrones y electrones, isótopos, iones y configuración electrónica.',
    sc: [
      { h: 'El átomo', sub: 'Lo más pequeño de cada elemento', b: [{ tags: ['Modelos', 'Protón', 'Neutrón', 'Electrón', 'Z y A', 'Isótopos', 'Configuración'] }],
        s: ['Hola. Todo lo que te rodea está hecho de átomos. En este video veremos cómo los científicos fueron descubriendo su estructura, qué partículas lo forman, cómo leer el número atómico y el número másico, qué son los isótopos y los iones, y cómo se ordenan los electrones.', 'Es la base de toda la química, así que vale la pena dominarlo.'] },
      { h: 'La historia de los modelos', ic: 'atom', b: [{ tl: 'Dalton', t: 'Esferas indivisibles' }, { tl: 'Thomson', t: 'Descubre el electrón: "budín de pasas"' }, { tl: 'Rutherford', t: 'Lámina de oro: núcleo pequeño, denso y positivo' }, { tl: 'Bohr', t: 'Electrones en niveles de energía' }, { tl: 'Mecano-cuántico', t: 'Orbitales: zonas de probabilidad' }],
        s: ['El modelo del átomo cambió muchas veces, cada vez que apareció nueva evidencia.', 'Dalton propuso que los átomos eran esferas indivisibles.', 'Thomson descubrió el electrón y propuso un átomo como una esfera positiva con electrones incrustados, como un budín de pasas.', 'Rutherford bombardeó una lámina de oro con partículas alfa. Casi todas pasaban, pero algunas rebotaban. Concluyó que el átomo es casi todo espacio vacío, con un núcleo pequeño, denso y positivo.', 'Bohr propuso que los electrones giran en niveles de energía definidos, y que al saltar de un nivel a otro absorben o emiten energía.', 'Y el modelo actual, mecano-cuántico, describe zonas de probabilidad llamadas orbitales, donde es más probable encontrar a los electrones.'] },
      { h: 'Las partículas', ic: 'grid', b: [{ two: [['Protón', 'Carga + · en el núcleo'], ['Neutrón', 'Sin carga · en el núcleo']] }, { two: [['Electrón', 'Carga − · alrededor del núcleo'], ['Masa', 'Casi toda está en el núcleo']] }],
        s: ['El átomo tiene tres partículas principales.', 'Los protones, con carga positiva, y los neutrones, sin carga, están en el núcleo.', 'Los electrones, con carga negativa, se mueven alrededor del núcleo. Su masa es tan pequeña que casi toda la masa del átomo está en el núcleo.'] },
      { h: 'Z y A', ic: 'calc', b: [{ eq: 'Z = protones · A = protones + neutrones' }, { eq: 'Sodio: Z = 11, A = 23  →  neutrones = 23 − 11 = 12' }, { tip: 'En un átomo **neutro**, electrones = protones = Z.' }, { q: 'El hierro-56 tiene Z = 26. ¿Cuántos neutrones tiene?', o: ['30', '26', '56', '82'], e: 'Neutrones = A − Z = 56 − 26 = 30.' }],
        s: ['Dos números describen a cada átomo.', 'El número atómico, Z, es la cantidad de protones, e identifica al elemento. El número másico, A, es la suma de protones y neutrones.', 'Si el sodio tiene Z igual once y A igual veintitrés, tiene doce neutrones.', 'Y en un átomo neutro, la cantidad de electrones es igual a la de protones.', 'Calcula tú.'] },
      { h: 'Iones e isótopos', ic: 'flag', b: [{ two: [['Catión', 'Pierde electrones → carga +', 'Na⁺: 11 p⁺ y 10 e⁻'], ['Anión', 'Gana electrones → carga −', 'O²⁻: 8 p⁺ y 10 e⁻']] }, { two: [['Isótopos', 'Mismo Z, distinto número de neutrones'], ['Ejemplo', 'C-12 y C-14: ambos con 6 protones']] }, { warn: 'Un ion cambia sus **electrones**, nunca sus protones. Si cambian los protones, cambia el elemento.' }],
        s: ['Los átomos pueden ganar o perder electrones y transformarse en iones.', 'Un catión perdió electrones y quedó positivo: el ion sodio más tiene once protones y diez electrones. Un anión ganó electrones y quedó negativo: el ion óxido, O dos menos, tiene ocho protones y diez electrones.', 'Los isótopos, en cambio, son átomos del mismo elemento con distinto número de neutrones. El carbono doce y el carbono catorce tienen seis protones, pero seis y ocho neutrones.', 'Ojo con la trampa: en un ion cambian los electrones, nunca los protones. Si cambiara el número de protones, sería otro elemento.'] },
      { h: 'Masa atómica promedio', ic: 'scale', b: [{ ex: 'El cloro tiene dos isótopos: Cl-35 (75 %) y Cl-37 (25 %)' }, { eq: 'Masa promedio = 35 · 0,75 + 37 · 0,25 = 35,5' }, { tip: 'Por eso en la tabla las masas atómicas tienen decimales: son **promedios ponderados** de los isótopos.' }],
        s: ['¿Por qué la masa atómica del cloro en la tabla es treinta y cinco coma cinco, si no existe medio neutrón?', 'Porque el cloro tiene dos isótopos: el cloro treinta y cinco, que es el setenta y cinco por ciento, y el cloro treinta y siete, que es el veinticinco por ciento.', 'La masa atómica es el promedio ponderado: treinta y cinco por cero coma setenta y cinco, más treinta y siete por cero coma veinticinco, da treinta y cinco coma cinco.', 'Por eso las masas de la tabla tienen decimales: son promedios de los isótopos según su abundancia.'] },
      { h: 'Configuración electrónica', ic: 'list', b: [{ eq: '1s → 2s → 2p → 3s → 3p → 4s → 3d …' }, { two: [['Capacidad', 's: 2 · p: 6 · d: 10'], ['Sodio (Z = 11)', '1s² 2s² 2p⁶ 3s¹']] }, { eq: 'Cloro (Z = 17): 1s² 2s² 2p⁶ 3s² 3p⁵  →  7 electrones de valencia' }],
        s: ['Los electrones se ordenan en niveles y subniveles de energía.', 'Se van llenando en este orden: uno ese, dos ese, dos pe, tres ese, tres pe, cuatro ese, tres de, y así sucesivamente.', 'Un subnivel s admite dos electrones, uno p admite seis y uno d, diez. El sodio, con once electrones, queda: uno ese dos, dos ese dos, dos pe seis, tres ese uno.', 'El cloro, con diecisiete, termina en tres pe cinco. Sus electrones de valencia, los del último nivel, son siete.'] },
      { h: 'Electrones de valencia', ic: 'spark', b: [{ ex: 'Los elementos de un mismo **grupo** tienen los mismos electrones de valencia → propiedades químicas parecidas' }, { two: [['Gases nobles', 'Último nivel completo: muy estables'], ['Sodio', '1 electrón de valencia: lo pierde fácilmente']] }, { q: '¿Cuántos electrones de valencia tiene el oxígeno (1s² 2s² 2p⁴)?', o: ['6', '8', '4', '2'], e: 'El último nivel es el 2: 2s² 2p⁴ suman 6 electrones.' }],
        s: ['Los electrones de valencia son los protagonistas de la química, porque son los que participan en los enlaces.', 'Los elementos de un mismo grupo de la tabla tienen la misma cantidad de electrones de valencia, y por eso se comportan de forma parecida.', 'Los gases nobles tienen su último nivel completo y son muy estables: casi no reaccionan. El sodio, con un solo electrón de valencia, lo pierde con facilidad.', 'Pregunta rápida.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Rutherford: núcleo', 'Bohr: niveles', 'Z = protones', 'A = p + n', 'Ion: cambian e⁻', 'Isótopo: cambian n', 's2 p6 d10'] }],
        s: ['Resumen: Rutherford descubrió el núcleo y Bohr los niveles de energía. Z son los protones y A, protones más neutrones.', 'En los iones cambian los electrones, y en los isótopos, los neutrones. Y los subniveles s, p y d admiten dos, seis y diez electrones. ¡A practicar!'] },
    ],
  });

  RB.video('v-qb', {
    u: 'qb', title: 'La tabla periódica', desc: 'Grupos, períodos, metales y no metales, y las tendencias del radio, la electronegatividad y la ionización.',
    sc: [
      { h: 'La tabla periódica', sub: 'Un mapa que predice cómo se comporta cada elemento', b: [{ tags: ['Períodos', 'Grupos', 'Metales', 'No metales', 'Radio', 'Electronegatividad', 'Ionización'] }],
        s: ['Hola. La tabla periódica no es solo una lista de elementos: es un mapa que permite predecir sus propiedades.', 'En este video veremos cómo está organizada, sus grupos más importantes, y las tres tendencias periódicas que más se preguntan: radio atómico, electronegatividad y energía de ionización.'] },
      { h: 'Cómo está ordenada', ic: 'grid', b: [{ eq: 'Orden: número atómico creciente' }, { two: [['Períodos (filas)', 'Indican los niveles de energía ocupados'], ['Grupos (columnas)', 'Mismos electrones de valencia → propiedades parecidas']] }, { tip: 'Mendeleiev dejó **espacios vacíos** y predijo elementos que aún no se conocían.' }],
        s: ['Partamos por la organización.', 'Los elementos se ordenan por número atómico creciente.', 'Las filas se llaman períodos, e indican cuántos niveles de energía ocupa el átomo. Las columnas se llaman grupos, y reúnen elementos con la misma cantidad de electrones de valencia, que por eso tienen propiedades parecidas.', 'Un dato histórico: Mendeleiev, al armar su tabla, dejó espacios vacíos y predijo las propiedades de elementos que todavía no se habían descubierto. Cuando se encontraron, calzaban.'] },
      { h: 'Grupos con nombre', ic: 'list', b: [{ tl: 'Grupo 1', t: 'Metales alcalinos: Li, Na, K · muy reactivos' }, { tl: 'Grupo 2', t: 'Alcalinotérreos: Mg, Ca' }, { tl: 'Grupos 3 a 12', t: 'Metales de transición: Fe, Cu, Au' }, { tl: 'Grupo 17', t: 'Halógenos: F, Cl, Br, I' }, { tl: 'Grupo 18', t: 'Gases nobles: He, Ne, Ar · muy estables' }],
        s: ['Algunos grupos tienen nombre propio.', 'El grupo uno son los metales alcalinos, como el litio, el sodio y el potasio, muy reactivos.', 'El grupo dos son los alcalinotérreos, como el magnesio y el calcio.', 'Al centro están los metales de transición, como el hierro, el cobre y el oro.', 'El grupo diecisiete son los halógenos, como el flúor y el cloro.', 'Y el grupo dieciocho son los gases nobles, como el helio y el neón, muy estables porque tienen su último nivel completo.'] },
      { h: 'Metales y no metales', ic: 'scale', b: [{ two: [['Metales', 'Izquierda y centro', 'Brillo, conducen calor y electricidad, maleables'], ['No metales', 'Arriba a la derecha', 'Opacos, malos conductores, frágiles']] }, { q: '¿Cuál de estos elementos es un no metal?', o: ['Azufre', 'Cobre', 'Hierro', 'Sodio'], e: 'El azufre está a la derecha de la tabla; los otros tres son metales.' }],
        s: ['La tabla también separa metales de no metales.', 'Los metales están a la izquierda y al centro: tienen brillo, conducen bien el calor y la electricidad, y se pueden moldear. Los no metales están arriba a la derecha: son opacos, malos conductores y frágiles. Entre ambos hay algunos metaloides, como el silicio.', 'Identifica el no metal.'] },
      { h: 'Ubicar un elemento con su configuración', ic: 'map', b: [{ two: [['Bloque s', 'Grupos 1 y 2'], ['Bloque p', 'Grupos 13 a 18']] }, { two: [['Bloque d', 'Metales de transición'], ['Bloque f', 'Lantánidos y actínidos']] }, { eq: 'Cloro: 1s² 2s² 2p⁶ 3s² 3p⁵  →  período 3 (nivel más alto) · grupo 17 (7 de valencia en bloque p)' }, { q: 'Un elemento termina su configuración en 4s¹. ¿Dónde está?', o: ['Período 4, grupo 1', 'Período 1, grupo 4', 'Período 4, grupo 4', 'Período 1, grupo 1'], e: 'El nivel 4 indica el período y 1 electrón en s indica el grupo 1: es el potasio.' }],
        s: ['La configuración electrónica te dice dónde está un elemento en la tabla.', 'Si el último electrón está en un subnivel s, el elemento está en los grupos uno o dos. Si está en un subnivel p, en los grupos trece al dieciocho.', 'Los que terminan en d son los metales de transición, y los que terminan en f son los lantánidos y actínidos, que van abajo.', 'Por ejemplo, el cloro termina en tres ese dos, tres pe cinco. Su nivel más alto es el tres, así que está en el período tres. Y tiene siete electrones de valencia en el bloque p, así que está en el grupo diecisiete.', 'Ahora tú.'] },
      { h: 'Radio atómico', ic: 'target', b: [{ two: [['Hacia abajo en un grupo', 'Aumenta: más niveles'], ['Hacia la derecha en un período', 'Disminuye: más protones atraen']] }, { eq: 'Período 3: Na es más grande que Cl' }, { tip: 'Los **cationes** son más pequeños que su átomo; los **aniones**, más grandes.' }],
        s: ['La primera tendencia es el radio atómico, el tamaño del átomo.', 'Al bajar en un grupo, el radio aumenta, porque se agregan niveles de energía. Al avanzar hacia la derecha en un período, el radio disminuye: los electrones están en el mismo nivel, pero hay más protones que los atraen con más fuerza.', 'Por eso, en el período tres, el sodio es más grande que el cloro.', 'Y un detalle: los cationes son más pequeños que su átomo neutro, y los aniones son más grandes.'] },
      { h: 'Electronegatividad e ionización', ic: 'bolt', b: [{ two: [['Electronegatividad', 'Tendencia a atraer los electrones de un enlace'], ['Energía de ionización', 'Energía para arrancar un electrón']] }, 'Ambas **aumentan hacia arriba y hacia la derecha**', { big: 'F', sub: 'el flúor es el elemento más electronegativo' }, { q: '¿Cuál tiene menor energía de ionización: litio o cesio?', o: ['Cesio', 'Litio', 'Son iguales', 'Ninguno tiene'], e: 'El cesio está más abajo en el grupo 1: su electrón externo está más lejos del núcleo y se arranca más fácil.' }],
        s: ['Las otras dos tendencias van juntas.', 'La electronegatividad es la tendencia de un átomo a atraer los electrones de un enlace. La energía de ionización es la energía necesaria para arrancarle un electrón a un átomo.', 'Ambas aumentan hacia arriba y hacia la derecha de la tabla, justo al revés que el radio. Un átomo pequeño atrae con más fuerza a sus electrones.', 'Por eso el flúor, arriba a la derecha, es el elemento más electronegativo.', 'Aplícalo.'] },
      { h: 'Reactividad', ic: 'flame', b: [{ two: [['Metales alcalinos', 'Pierden 1 electrón con facilidad', 'El sodio reacciona violentamente con agua'], ['Halógenos', 'Ganan 1 electrón con facilidad', 'Muy reactivos: el cloro desinfecta']] }, { two: [['Gases nobles', 'Último nivel completo', 'Casi no reaccionan: el helio de los globos'], ['Regla', 'Los átomos buscan parecerse al gas noble más cercano']] }],
        s: ['Las tendencias explican qué tan reactivo es cada elemento.', 'Los metales alcalinos pierden su único electrón de valencia con mucha facilidad. Por eso el sodio reacciona violentamente con el agua. Los halógenos, en cambio, están a un electrón de completar su nivel, y lo ganan con facilidad: el cloro es tan reactivo que se usa para desinfectar.', 'Los gases nobles ya tienen su último nivel completo y casi no reaccionan; por eso el helio es seguro en los globos. En general, los átomos ganan, pierden o comparten electrones para parecerse al gas noble más cercano, y esa es la base de los enlaces químicos.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Orden: Z', 'Período: niveles', 'Grupo: valencia', 'Radio ↙', 'Electronegatividad ↗', 'Ionización ↗', 'Flúor: el más electronegativo'] }],
        s: ['Resumen: la tabla se ordena por número atómico. Los períodos indican niveles y los grupos, electrones de valencia.', 'El radio aumenta hacia abajo y a la izquierda, mientras que la electronegatividad y la energía de ionización aumentan hacia arriba y a la derecha. ¡A practicar!'] },
    ],
  });
})();
