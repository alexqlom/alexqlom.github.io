// Química (2): enlace químico y fuerzas intermoleculares; reacciones químicas y estequiometría.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Enlace químico ----------
  RB.unit('qc', {
    name: 'Enlace químico', desc: 'Enlace iónico, covalente y metálico, polaridad, geometría molecular y fuerzas intermoleculares.', ic: 'grid', vid: 'v-qc', area: 'Estructura atómica',
    lessons: [
      {
        n: 'Tipos de enlace', ic: 'grid', items: [
          { t: 'info', ic: 'grid', title: 'Enlaces', txt: '**Iónico**: un metal cede electrones a un no metal. **Covalente**: no metales **comparten** electrones (polar si la electronegatividad es distinta). **Metálico**: un "mar" de electrones libres entre cationes.' },
          M('El enlace en el NaCl (sal de mesa) es:', ['Iónico', 'Covalente apolar', 'Metálico', 'Puente de hidrógeno'], 'Metal (Na) con no metal (Cl): el Na cede su electrón.'),
          M('El enlace en la molécula de H₂ es:', ['Covalente apolar', 'Iónico', 'Metálico', 'Covalente polar'], 'Dos átomos iguales comparten los electrones por igual.'),
          M('El enlace en la molécula de HCl es:', ['Covalente polar', 'Iónico', 'Covalente apolar', 'Metálico'], 'El Cl es más electronegativo y atrae más los electrones.'),
          M('En un enlace iónico:', ['Un átomo transfiere electrones a otro', 'Los átomos comparten electrones por igual', 'Hay un mar de electrones', 'No hay electrones involucrados'], 'Se forman iones que se atraen.'),
          M('Los compuestos iónicos, como la sal:', ['Tienen altos puntos de fusión y conducen la electricidad disueltos en agua', 'Son gases a temperatura ambiente', 'No se disuelven nunca', 'Conducen electricidad en estado sólido'], 'Disueltos, sus iones quedan libres para moverse.'),
          M('¿Qué enlace explica que los metales conduzcan la electricidad?', ['El enlace metálico, con electrones libres', 'El enlace iónico', 'El enlace covalente apolar', 'El puente de hidrógeno'], 'Los electrones se mueven libremente.'),
          S('Clasifica el enlace de cada sustancia', ['Iónico', 'Covalente'], [['NaCl', 0], ['H₂O', 1], ['KBr', 0], ['CO₂', 1], ['CaO', 0], ['CH₄', 1]], 'Metal + no metal: iónico. Solo no metales: covalente.'),
          T('Según la regla del octeto, los átomos tienden a completar 8 electrones en su último nivel.', true, 'Así se parecen al gas noble más cercano (el hidrógeno busca 2).'),
          M('Un enlace triple, como el del N₂, comparte:', ['6 electrones', '3 electrones', '2 electrones', '8 electrones'], 'Cada enlace es un par: 3 pares = 6 electrones.'),
        ],
      },
      {
        n: 'Polaridad y geometría', ic: 'tri', items: [
          M('La molécula de agua (H₂O) es polar porque:', ['Tiene geometría angular y el oxígeno es más electronegativo', 'Es lineal', 'Tiene enlaces iónicos', 'No tiene electrones libres'], 'Los dipolos no se anulan por la forma angular.'),
          M('La molécula de CO₂ es apolar aunque sus enlaces son polares porque:', ['Es lineal y los dipolos se anulan', 'Tiene enlaces iónicos', 'El carbono es más electronegativo', 'No tiene electrones'], 'O=C=O: tiran con igual fuerza en sentidos opuestos.'),
          M('La geometría del metano (CH₄) es:', ['Tetraédrica', 'Lineal', 'Angular', 'Plana triangular'], 'Cuatro enlaces que se separan al máximo: ángulos de 109,5°.'),
          M('La geometría del amoníaco (NH₃) es:', ['Piramidal', 'Tetraédrica regular', 'Lineal', 'Plana cuadrada'], 'Tres enlaces y un par de electrones libre.'),
          M('¿Cuántos electrones de valencia dibuja la estructura de Lewis del oxígeno?', ['6', '8', '2', '4'], 'Su configuración termina en 2s² 2p⁴.'),
          T('"Lo semejante disuelve a lo semejante": los solventes polares disuelven sustancias polares.', true, 'Por eso el agua disuelve la sal y el azúcar.'),
          M('El aceite no se mezcla con el agua porque:', ['El aceite es apolar y el agua es polar', 'Ambos son polares', 'El aceite es iónico', 'El agua es apolar'], 'Lo semejante disuelve a lo semejante.'),
          M('En el enlace H–F, los electrones compartidos están más cerca del:', ['Flúor', 'Hidrógeno', 'Centro exacto del enlace', 'Ninguno de los dos'], 'El flúor es el más electronegativo.'),
        ],
      },
      {
        n: 'Fuerzas intermoleculares', ic: 'link', items: [
          { t: 'info', ic: 'spark', title: 'Entre moléculas', txt: 'Más débiles que los enlaces: **puentes de hidrógeno** (H unido a N, O o F), **dipolo-dipolo** (moléculas polares) y **fuerzas de London** (todas, las únicas en apolares).' },
          M('El agua tiene un punto de ebullición alto para su tamaño debido a:', ['Los puentes de hidrógeno', 'Los enlaces iónicos', 'Las fuerzas nucleares', 'Su color'], 'Hay que romper muchos puentes para que hierva.'),
          M('Los puentes de hidrógeno se forman cuando el hidrógeno está unido a:', ['N, O o F', 'C o Si', 'Metales', 'Gases nobles'], 'Átomos pequeños y muy electronegativos.'),
          M('Las fuerzas que mantienen unidas las moléculas apolares, como las de I₂, son:', ['Fuerzas de dispersión de London', 'Puentes de hidrógeno', 'Enlaces iónicos', 'Fuerzas dipolo-dipolo'], 'Son dipolos temporales.'),
          T('Las fuerzas intermoleculares son más fuertes que los enlaces covalentes.', false, 'Son mucho más débiles: por eso hervir agua no rompe las moléculas de H₂O.'),
          M('¿Qué sustancia tiene mayor punto de ebullición?', ['H₂O', 'H₂S', 'CH₄', 'O₂'], 'El agua forma puentes de hidrógeno.'),
          M('La tensión superficial del agua, que permite que algunos insectos caminen sobre ella, se debe a:', ['Las fuerzas entre sus moléculas (puentes de hidrógeno)', 'Su color', 'Su sabor', 'Los enlaces metálicos'], 'Las moléculas de la superficie se atraen fuertemente.'),
        ],
      },
    ],
  });

  // ---------- Estequiometría ----------
  RB.unit('qd', {
    name: 'Reacciones y estequiometría', desc: 'Ecuaciones químicas, balance, tipos de reacción, mol, masa molar, cálculos y reactivo limitante.', ic: 'flask', vid: 'v-qd', area: 'Reacciones',
    lessons: [
      {
        n: 'Reacciones y balance', ic: 'flask', items: [
          { t: 'info', ic: 'flask', title: 'Ley de Lavoisier', txt: 'En una reacción, **la masa se conserva**: los átomos solo se reordenan. Balancear es poner coeficientes para que haya **el mismo número de átomos de cada elemento** a cada lado.' },
          M('Según la ley de Lavoisier, en una reacción química:', ['La masa total de los reactantes es igual a la de los productos', 'Se crea masa', 'Se destruye masa', 'La masa depende del color'], '"Nada se pierde, nada se crea, todo se transforma".'),
          M('¿Cuál es la ecuación balanceada de la formación de agua?', ['2 H₂ + O₂ → 2 H₂O', 'H₂ + O₂ → H₂O', 'H₂ + O → H₂O₂', '2 H + O₂ → H₂O'], '4 átomos de H y 2 de O a cada lado.'),
          M('Balancea: __ N₂ + __ H₂ → __ NH₃. Los coeficientes son:', ['1, 3, 2', '1, 1, 2', '2, 3, 2', '1, 3, 1'], '2 N y 6 H a cada lado.'),
          M('Balancea la combustión del metano: CH₄ + __ O₂ → CO₂ + __ H₂O', ['2 y 2', '1 y 2', '2 y 1', '3 y 2'], 'CH₄ + 2 O₂ → CO₂ + 2 H₂O: 4 átomos de O a cada lado.'),
          P('Une cada tipo de reacción con su ejemplo', [['Síntesis', '2 H₂ + O₂ → 2 H₂O'], ['Descomposición', '2 H₂O₂ → 2 H₂O + O₂'], ['Combustión', 'CH₄ + 2 O₂ → CO₂ + 2 H₂O'], ['Sustitución simple', 'Zn + 2 HCl → ZnCl₂ + H₂']], 'Síntesis une, descomposición separa.'),
          S('Clasifica cada cambio', ['Químico', 'Físico'], [['Quemar papel', 0], ['Derretir hielo', 1], ['Oxidarse un clavo', 0], ['Disolver azúcar en agua', 1], ['Cocinar un huevo', 0], ['Romper un vidrio', 1]], 'En un cambio químico se forman sustancias nuevas.'),
          M('Si 12 g de carbono reaccionan completamente con 32 g de oxígeno para formar CO₂, ¿qué masa de CO₂ se forma?', ['44 g', '20 g', '12 g', '32 g'], 'Conservación de la masa: 12 + 32.'),
          T('En una ecuación balanceada, el número de moléculas a cada lado siempre es igual.', false, 'Se conserva el número de átomos de cada elemento, no el de moléculas: 2 H₂ + O₂ (3 moléculas) → 2 H₂O (2 moléculas).'),
          M('Una reacción que libera calor se llama:', ['Exotérmica', 'Endotérmica', 'Isotérmica', 'Catalítica'], 'La combustión es exotérmica.'),
        ],
      },
      {
        n: 'El mol y la masa molar', ic: 'calc', items: [
          { t: 'info', ic: 'calc', title: 'El mol', txt: '1 mol = **6,02 · 10²³** partículas (número de Avogadro). La **masa molar** (g/mol) es la suma de las masas atómicas. Moles = masa / masa molar.' },
          M('¿Cuál es la masa molar del agua? (H = 1, O = 16)', ['18 g/mol', '17 g/mol', '16 g/mol', '34 g/mol'], '2 · 1 + 16.'),
          M('¿Cuál es la masa molar del CO₂? (C = 12, O = 16)', ['44 g/mol', '28 g/mol', '40 g/mol', '56 g/mol'], '12 + 2 · 16.'),
          M('¿Cuántos moles hay en 36 g de agua?', ['2 mol', '36 mol', '0,5 mol', '18 mol'], '36 / 18.'),
          M('Un mol de cualquier sustancia contiene aproximadamente:', ['6,02 · 10²³ partículas', '1.000 partículas', '12 partículas', '6,02 · 10⁻²³ partículas'], 'Es el número de Avogadro.'),
          M('¿Cuántas moléculas hay en 0,5 mol de O₂?', ['3,01 · 10²³', '6,02 · 10²³', '1,2 · 10²⁴', '0,5'], 'La mitad del número de Avogadro.'),
          M('¿Qué masa tienen 3 moles de NaCl? (Na = 23, Cl = 35,5)', ['175,5 g', '58,5 g', '19,5 g', '105 g'], '3 · 58,5.'),
          N('¿Cuál es la masa molar del CH₄? (C = 12, H = 1)', 16, 'g/mol', '12 + 4 · 1.'),
          T('Un mol de H₂O y un mol de CO₂ tienen la misma masa.', false, 'Tienen el mismo número de moléculas, pero distinta masa (18 g y 44 g).'),
          M('¿Cuántos átomos de hidrógeno hay en una molécula de glucosa, C₆H₁₂O₆?', ['12', '6', '24', '1'], 'El subíndice indica cuántos átomos hay.'),
        ],
      },
      {
        n: 'Cálculos estequiométricos', ic: 'target', items: [
          M('Según 2 H₂ + O₂ → 2 H₂O, ¿cuántos moles de agua se forman con 4 moles de H₂ y suficiente O₂?', ['4 mol', '2 mol', '8 mol', '1 mol'], 'La razón H₂ : H₂O es 2 : 2.'),
          M('Según N₂ + 3 H₂ → 2 NH₃, ¿cuántos moles de H₂ se necesitan para formar 4 moles de NH₃?', ['6 mol', '3 mol', '4 mol', '12 mol'], 'H₂ : NH₃ = 3 : 2 → 4 · 3/2.'),
          M('Según 2 H₂ + O₂ → 2 H₂O, si reaccionan 4 mol de H₂ con 1 mol de O₂, el reactivo limitante es:', ['El O₂', 'El H₂', 'Ninguno', 'El agua'], '4 mol de H₂ necesitarían 2 mol de O₂: solo hay 1.'),
          M('En el caso anterior, ¿cuántos moles de agua se forman?', ['2 mol', '4 mol', '1 mol', '6 mol'], 'Manda el limitante: 1 mol de O₂ forma 2 mol de agua.'),
          M('Según CH₄ + 2 O₂ → CO₂ + 2 H₂O, ¿qué masa de CO₂ se forma al quemar 16 g de CH₄? (C = 12, O = 16, H = 1)', ['44 g', '16 g', '22 g', '88 g'], '16 g de CH₄ = 1 mol → 1 mol de CO₂ = 44 g.'),
          M('Si una reacción debería producir 50 g de producto y solo produce 40 g, su rendimiento es:', ['80 %', '40 %', '125 %', '10 %'], '40/50.'),
          T('El reactivo limitante es el que se consume primero y determina cuánto producto se forma.', true, 'El otro queda en exceso.'),
          M('Según 2 Mg + O₂ → 2 MgO, ¿cuántos moles de O₂ reaccionan con 6 moles de Mg?', ['3 mol', '6 mol', '12 mol', '2 mol'], 'Mg : O₂ = 2 : 1.'),
        ],
      },
    ],
  });

  // ---------- Videos ----------
  RB.video('v-qc', {
    u: 'qc', title: 'Enlace químico', desc: 'Iónico, covalente y metálico, polaridad, geometría y fuerzas entre moléculas.',
    sc: [
      { h: 'Enlace químico', sub: 'Cómo y por qué se unen los átomos', b: [{ tags: ['Octeto', 'Iónico', 'Covalente', 'Metálico', 'Polaridad', 'Geometría', 'Fuerzas intermoleculares'] }],
        s: ['Hola. ¿Por qué la sal es un sólido duro y el agua es un líquido? ¿Por qué el aceite no se mezcla con el agua? Todo depende de cómo se unen los átomos.', 'En este video veremos la regla del octeto, los tres tipos de enlace, la polaridad, la geometría de las moléculas y las fuerzas que actúan entre moléculas.'] },
      { h: 'La regla del octeto', ic: 'target', b: [{ eq: 'Los átomos ganan, pierden o comparten electrones hasta tener 8 en su último nivel' }, { tip: 'Buscan parecerse al **gas noble** más cercano. El hidrógeno busca 2.' }],
        s: ['La idea central es la regla del octeto.', 'Los átomos tienden a ganar, perder o compartir electrones hasta tener ocho en su último nivel.', 'Así se parecen al gas noble más cercano, que es muy estable. El hidrógeno es la excepción: busca tener dos, como el helio.'] },
      { h: 'Estructuras de Lewis', ic: 'pen', b: [{ eq: 'Cada punto = un electrón de valencia' }, { ex: 'H₂O: el oxígeno comparte un par con cada hidrógeno y le quedan **2 pares libres**' }, { tip: 'Los **pares libres** también ocupan espacio: por eso el agua es angular y el amoníaco, piramidal.' }],
        s: ['Para dibujar los enlaces se usan las estructuras de Lewis.', 'Alrededor del símbolo de cada elemento se dibujan puntos, uno por cada electrón de valencia. El oxígeno tiene seis puntos y el hidrógeno, uno.', 'En el agua, el oxígeno comparte un par de electrones con cada hidrógeno, y así completa su octeto. Además le quedan dos pares de electrones sin compartir, llamados pares libres.', 'Esos pares libres también ocupan espacio y empujan a los enlaces. Por eso la molécula de agua no es recta, sino angular, y el amoníaco tiene forma de pirámide.'] },
      { h: 'Enlace iónico', ic: 'bolt', b: [{ ex: 'Na (1 e⁻ de valencia) + Cl (7 e⁻ de valencia)' }, { eq: 'Na → Na⁺ + e⁻   ·   Cl + e⁻ → Cl⁻   →   Na⁺Cl⁻' }, { two: [['Se forma entre', 'Un metal y un no metal'], ['Propiedades', 'Sólidos duros, alto punto de fusión, conducen disueltos']] }],
        s: ['El primer tipo es el enlace iónico.', 'El sodio tiene un electrón de valencia y el cloro tiene siete.', 'El sodio le cede su electrón al cloro. El sodio queda como ion positivo y el cloro como ion negativo, y como cargas opuestas se atraen, quedan unidos.', 'El enlace iónico se forma entre un metal y un no metal. Los compuestos iónicos, como la sal, son sólidos duros, con altos puntos de fusión, y conducen la electricidad cuando están disueltos en agua, porque sus iones quedan libres.'] },
      { h: 'Enlace covalente', ic: 'grid', b: [{ two: [['Apolar', 'Átomos iguales: H₂, O₂, Cl₂', 'Comparten por igual'], ['Polar', 'Distinta electronegatividad: HCl, H₂O', 'Uno atrae más los electrones']] }, { eq: 'Simple: 1 par · doble: 2 pares · triple (N₂): 3 pares = 6 electrones' }, { q: '¿Qué tipo de enlace tiene el HCl?', o: ['Covalente polar', 'Covalente apolar', 'Iónico', 'Metálico'], e: 'H y Cl son no metales con distinta electronegatividad: comparten de forma desigual.' }],
        s: ['Entre no metales, los átomos no se ceden electrones: los comparten. Eso es el enlace covalente.', 'Si los átomos son iguales, como en el hidrógeno H dos, comparten los electrones por igual: es covalente apolar. Si tienen distinta electronegatividad, como en el cloruro de hidrógeno, el más electronegativo atrae más los electrones: es covalente polar.', 'Pueden compartir un par de electrones, dos o tres. El nitrógeno, N dos, tiene un enlace triple: comparte seis electrones.', 'A ver.'] },
      { h: 'Enlace metálico', ic: 'magnet', b: [{ ex: 'Cationes metálicos en un **"mar" de electrones libres**' }, { two: [['Conducen', 'Electricidad y calor'], ['Son', 'Maleables y brillantes']] }],
        s: ['El tercer tipo es el enlace metálico.', 'En los metales, los átomos ceden sus electrones de valencia a un mar de electrones que se mueven libremente entre los cationes.', 'Esos electrones libres explican por qué los metales conducen tan bien la electricidad y el calor, y por qué se pueden doblar y estirar sin romperse.'] },
      { h: 'Polaridad y geometría', ic: 'tri', b: [{ two: [['H₂O', 'Angular → **polar**', 'Los dipolos no se anulan'], ['CO₂', 'Lineal → **apolar**', 'Los dipolos se anulan']] }, { two: [['CH₄', 'Tetraédrica'], ['NH₃', 'Piramidal']] }, { tip: '**Lo semejante disuelve a lo semejante**: el agua (polar) disuelve sal y azúcar, pero no el aceite (apolar).' }],
        s: ['Que una molécula sea polar depende de sus enlaces y de su forma.', 'El agua es angular, y como el oxígeno atrae más los electrones, queda una zona negativa y otra positiva: es polar. El dióxido de carbono también tiene enlaces polares, pero es lineal, y los dos tirones opuestos se anulan: es apolar.', 'El metano tiene forma de tetraedro, y el amoníaco, de pirámide.', 'La polaridad explica una regla muy útil: lo semejante disuelve a lo semejante. El agua, polar, disuelve la sal y el azúcar, pero no el aceite, que es apolar.'] },
      { h: 'Fuerzas entre moléculas', ic: 'link', b: [{ tl: 'Puente de hidrógeno', t: 'H unido a N, O o F: el más fuerte · agua' }, { tl: 'Dipolo-dipolo', t: 'Entre moléculas polares' }, { tl: 'London', t: 'En todas; las únicas en apolares · I₂, CH₄' }, { q: '¿Por qué el agua hierve a 100 °C, mucho más que el H₂S, que es parecido?', o: ['Por sus puentes de hidrógeno', 'Porque es iónica', 'Porque es apolar', 'Porque pesa más'], e: 'Romper los puentes de hidrógeno requiere mucha energía.' }],
        s: ['Además de los enlaces dentro de las moléculas, hay fuerzas entre moléculas, más débiles.', 'Las más fuertes son los puentes de hidrógeno, cuando el hidrógeno está unido a nitrógeno, oxígeno o flúor. El agua los tiene.', 'Las fuerzas dipolo-dipolo actúan entre moléculas polares.', 'Y las fuerzas de London existen en todas las moléculas, y son las únicas en las moléculas apolares.', 'Estas fuerzas explican los puntos de ebullición. Responde.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Octeto', 'Iónico: metal + no metal', 'Covalente: comparten', 'Metálico: mar de e⁻', 'H₂O polar, CO₂ apolar', 'Puente de H: N, O, F'] }],
        s: ['Resumen: los átomos buscan el octeto. El enlace iónico une un metal con un no metal, el covalente comparte electrones entre no metales, y el metálico tiene un mar de electrones.', 'La polaridad depende de la electronegatividad y de la forma, y los puentes de hidrógeno explican las propiedades especiales del agua. ¡A practicar!'] },
    ],
  });

  RB.video('v-qd', {
    u: 'qd', title: 'Reacciones y estequiometría', desc: 'Conservación de la masa, balance de ecuaciones, el mol, la masa molar y el reactivo limitante.',
    sc: [
      { h: 'Reacciones y estequiometría', sub: 'Las recetas de la química', b: [{ tags: ['Lavoisier', 'Balancear', 'Tipos de reacción', 'Mol', 'Masa molar', 'Limitante', 'Rendimiento'] }],
        s: ['Hola. Una reacción química es como una receta: los reactantes son los ingredientes y los productos son el plato.', 'En este video veremos la conservación de la masa, cómo balancear ecuaciones, los tipos de reacción, qué es un mol, y cómo calcular cuánto producto se forma.'] },
      { h: 'La masa se conserva', ic: 'scale', b: [{ eq: 'Reactantes → Productos' }, { eq: '12 g de C + 32 g de O₂ → 44 g de CO₂' }, { tip: 'Los átomos no se crean ni se destruyen: **solo se reordenan**.' }],
        s: ['El principio fundamental es la ley de Lavoisier: en una reacción química, la masa se conserva.', 'A la izquierda de la flecha están los reactantes y a la derecha, los productos.', 'Si doce gramos de carbono reaccionan con treinta y dos de oxígeno, se forman exactamente cuarenta y cuatro gramos de dióxido de carbono.', 'Esto ocurre porque en una reacción los átomos no se crean ni se destruyen: solo se reordenan.'] },
      { h: 'Balancear ecuaciones', ic: 'list', b: [{ eq: 'H₂ + O₂ → H₂O   ✘ (2 O a la izquierda, 1 a la derecha)' }, { eq: '2 H₂ + O₂ → 2 H₂O   ✔' }, { eq: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O' }, { warn: 'Solo se cambian los **coeficientes** (los números de adelante), nunca los subíndices.' }],
        s: ['Como los átomos se conservan, las ecuaciones deben estar balanceadas.', 'Hidrógeno más oxígeno da agua, escrito así, no está balanceado: hay dos oxígenos a la izquierda y uno a la derecha.', 'Si ponemos un dos delante del agua y un dos delante del hidrógeno, quedan cuatro hidrógenos y dos oxígenos a cada lado.', 'Lo mismo con la combustión del metano: un metano más dos oxígenos da un dióxido de carbono y dos aguas.', 'Ojo: para balancear solo cambias los coeficientes, los números de adelante. Si cambias los subíndices, cambias la sustancia.'] },
      { h: 'Tipos de reacción', ic: 'flask', b: [{ two: [['Síntesis', 'A + B → AB'], ['Descomposición', 'AB → A + B']] }, { two: [['Combustión', 'Con O₂: libera CO₂, H₂O y energía'], ['Sustitución', 'Zn + 2 HCl → ZnCl₂ + H₂']] }, { two: [['Exotérmica', 'Libera calor'], ['Endotérmica', 'Absorbe calor']] }],
        s: ['Las reacciones se clasifican según lo que ocurre.', 'En la síntesis, dos sustancias se unen en una. En la descomposición, una sustancia se separa en otras.', 'En la combustión, algo reacciona con oxígeno y libera dióxido de carbono, agua y energía. En la sustitución, un elemento reemplaza a otro en un compuesto.', 'Y según la energía, son exotérmicas si liberan calor, como la combustión, o endotérmicas si lo absorben.'] },
      { h: 'El mol', ic: 'calc', b: [{ big: '6,02 · 10²³', sub: 'partículas en 1 mol (número de Avogadro)' }, { eq: 'Masa molar del H₂O = 2 · 1 + 16 = 18 g/mol' }, { eq: 'moles = masa / masa molar  →  36 g de agua = 2 mol' }, { q: '¿Cuál es la masa molar del CO₂? (C = 12, O = 16)', o: ['44 g/mol', '28 g/mol', '40 g/mol', '56 g/mol'], e: '12 + 2 · 16 = 44 g/mol.' }],
        s: ['Los átomos son tan pequeños que los químicos los cuentan por moles, igual que contamos huevos por docenas.', 'Un mol son seis coma cero dos por diez a la veintitrés partículas: el número de Avogadro.', 'La masa molar es la masa de un mol, y se calcula sumando las masas atómicas. Para el agua: dos hidrógenos de uno más un oxígeno de dieciséis, dieciocho gramos por mol.', 'Y para pasar de gramos a moles, divides la masa por la masa molar: treinta y seis gramos de agua son dos moles.', 'Calcula esta masa molar.'] },
      { h: 'Cálculos con la ecuación', ic: 'target', b: [{ eq: 'N₂ + 3 H₂ → 2 NH₃', n: 'Los coeficientes son proporciones de moles' }, { eq: 'Para 4 mol de NH₃: 4 · 3/2 = 6 mol de H₂' }, { eq: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O  ·  16 g de CH₄ = 1 mol → 1 mol de CO₂ = 44 g' }],
        s: ['Los coeficientes de una ecuación balanceada son proporciones de moles.', 'En la síntesis del amoníaco, un mol de nitrógeno reacciona con tres de hidrógeno para formar dos de amoníaco.', 'Si quieres cuatro moles de amoníaco, necesitas el doble: seis moles de hidrógeno.', 'Para trabajar con masas, pasa primero a moles. Dieciséis gramos de metano son un mol, y según la ecuación forman un mol de dióxido de carbono, o sea, cuarenta y cuatro gramos.'] },
      { h: 'Reactivo limitante y rendimiento', ic: 'flag', b: [{ ex: '2 H₂ + O₂ → 2 H₂O, con 4 mol de H₂ y solo 1 mol de O₂' }, { sol: '4 mol de H₂ necesitarían 2 mol de O₂: el **O₂ es el limitante** → se forman **2 mol de agua**' }, { eq: 'Rendimiento = obtenido / teórico · 100  →  40 g / 50 g = 80 %' }],
        s: ['En la vida real, casi nunca los reactivos están en la proporción exacta.', 'Con cuatro moles de hidrógeno y solo un mol de oxígeno, ¿cuánta agua se forma?', 'Cuatro moles de hidrógeno necesitarían dos moles de oxígeno, pero solo hay uno. El oxígeno se acaba primero: es el reactivo limitante, y manda. Un mol de oxígeno forma dos moles de agua, y sobran dos moles de hidrógeno.', 'Y como en la práctica siempre hay pérdidas, se calcula el rendimiento: lo obtenido dividido por lo teórico. Si debías obtener cincuenta gramos y obtuviste cuarenta, el rendimiento es ochenta por ciento.'] },
      { h: 'Cambio físico o químico', ic: 'search', b: [{ two: [['Químico', 'Se forman sustancias nuevas', 'Quemar, oxidar, cocinar'], ['Físico', 'Misma sustancia', 'Derretir, disolver, romper']] }, { q: '¿Cuál de estos es un cambio químico?', o: ['Oxidarse un clavo', 'Derretir hielo', 'Disolver azúcar', 'Romper un vidrio'], e: 'Al oxidarse se forma una sustancia nueva: el óxido de hierro.' }],
        s: ['Por último, una distinción básica que siempre aparece.', 'En un cambio químico se forman sustancias nuevas, como al quemar papel, oxidarse un clavo o cocinar un huevo. En un cambio físico la sustancia sigue siendo la misma, como al derretir hielo, disolver azúcar o romper un vidrio.', 'Identifica el cambio químico.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['La masa se conserva', 'Balancear: coeficientes', '1 mol = 6,02 · 10²³', 'n = m / M', 'Coeficientes = moles', 'Limitante manda'] }],
        s: ['Resumen: la masa se conserva, y se balancea cambiando coeficientes. Un mol son seis coma cero dos por diez a la veintitrés partículas, y los moles se calculan con la masa dividida por la masa molar.', 'Los coeficientes indican proporciones de moles, y el reactivo limitante decide cuánto producto se forma. ¡A practicar!'] },
    ],
  });
})();
