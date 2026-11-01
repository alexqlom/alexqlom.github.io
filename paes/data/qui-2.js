// Química (2): enlace químico y fuerzas intermoleculares; reacciones químicas y estequiometría.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Enlace químico ----------
  RB.unit('qc', {
    name: 'Enlace químico', desc: 'Enlace iónico, covalente y metálico, polaridad, geometría molecular y fuerzas intermoleculares.', ic: 'grid', area: 'Estructura atómica',
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
    name: 'Reacciones y estequiometría', desc: 'Ecuaciones químicas, balance, tipos de reacción, mol, masa molar, cálculos y reactivo limitante.', ic: 'flask', area: 'Reacciones',
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
})();
