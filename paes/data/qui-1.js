// Química (1): modelos atómicos y estructura del átomo; tabla periódica y propiedades periódicas.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- El átomo ----------
  RB.unit('qa', {
    name: 'El átomo', desc: 'Modelos atómicos, partículas subatómicas, número atómico y másico, isótopos, iones y configuración electrónica.', ic: 'atom', area: 'Estructura atómica',
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
    name: 'Tabla periódica', desc: 'Organización en grupos y períodos, metales y no metales, y propiedades periódicas.', ic: 'grid', area: 'Estructura atómica',
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
})();
