// Matemática M2 (2): funciones exponencial, logarítmica y potencia; trigonometría y homotecia.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Funciones exponencial, logarítmica y potencia ----------
  RB.unit('m2c', {
    name: 'Funciones exponencial, logarítmica y potencia', desc: 'Crecimiento y decaimiento, función inversa, gráficos y modelación.', ic: 'func', vid: 'v-m2c', area: 'Funciones',
    lessons: [
      {
        n: 'Función exponencial', ic: 'spark', items: [
          { t: 'info', ic: 'spark', title: 'f(x) = a · bˣ', txt: 'Con b > 1 la función **crece**; con 0 < b < 1, **decrece**. Corta el eje y en **a**, nunca toca el eje x (asíntota y = 0) y su recorrido son los reales positivos (si a > 0).' },
          M('La función f(x) = 2ˣ es:', ['Creciente', 'Decreciente', 'Constante', 'Cuadrática'], 'La base es mayor que 1.'),
          M('La función f(x) = (1/3)ˣ es:', ['Decreciente', 'Creciente', 'Constante', 'Lineal'], 'La base está entre 0 y 1.'),
          M('¿Dónde corta f(x) = 5 · 2ˣ al eje y?', ['En (0, 5)', 'En (0, 2)', 'En (0, 10)', 'En (5, 0)'], 'f(0) = 5 · 1 = 5.'),
          M('¿Cuál es el recorrido de f(x) = 3ˣ?', ['Los reales positivos', 'Todos los reales', 'Los reales negativos', 'El intervalo [0, 3]'], '3ˣ siempre es mayor que 0.'),
          T('La gráfica de f(x) = 2ˣ corta el eje x.', false, '2ˣ nunca vale 0: se acerca al eje x sin tocarlo.'),
          M('Una inversión de $1.000.000 crece 5 % anual compuesto. ¿Qué función modela el capital después de t años?', ['C(t) = 1.000.000 · 1,05ᵗ', 'C(t) = 1.000.000 + 0,05t', 'C(t) = 1.000.000 · 0,05ᵗ', 'C(t) = 1.050.000t'], 'Cada año se multiplica por 1,05.'),
          M('Un medicamento se elimina a razón de 20 % por hora. Si hay 100 mg, ¿qué función da la cantidad después de t horas?', ['A(t) = 100 · 0,8ᵗ', 'A(t) = 100 · 1,2ᵗ', 'A(t) = 100 − 20t', 'A(t) = 100 · 0,2ᵗ'], 'Cada hora queda el 80 %.'),
          M('Si f(x) = 3 · 2ˣ, ¿cuánto es f(3)?', ['24', '216', '18', '12'], '3 · 8 = 24. Ojo: no es (3 · 2)³.'),
          M('Una sustancia tiene una vida media de 5 años. De 80 g, ¿cuánto queda después de 15 años?', ['10 g', '20 g', '40 g', '5 g'], 'Tres vidas medias: 80 → 40 → 20 → 10.'),
          N('Si f(x) = 2^(x + 1), ¿cuánto es f(4)?', 32, '', '2⁵ = 32.'),
        ],
      },
      {
        n: 'Logarítmica e inversa', ic: 'replay', items: [
          { t: 'info', ic: 'replay', title: 'Función inversa', txt: 'La inversa **deshace** lo que hace la función: si f(2) = 9, entonces f⁻¹(9) = 2. La logarítmica log_b x es la inversa de la exponencial bˣ: su dominio son los x > 0 y corta el eje x en (1, 0).' },
          M('El dominio de f(x) = log₂ x es:', ['x > 0', 'x ≥ 0', 'Todos los reales', 'x > 1'], 'Solo existen logaritmos de números positivos.'),
          M('La función f(x) = log x corta al eje x en:', ['(1, 0)', '(0, 1)', '(10, 0)', 'No lo corta'], 'log 1 = 0.'),
          M('La función inversa de f(x) = 3ˣ es:', ['g(x) = log₃ x', 'g(x) = x³', 'g(x) = (1/3)ˣ', 'g(x) = ∛x'], 'El logaritmo deshace la potencia.'),
          M('Si f(x) = log₂ x, ¿cuánto vale f(32)?', ['5', '16', '64', '2⁵'], '2⁵ = 32.'),
          T('Las gráficas de y = 2ˣ e y = log₂ x son simétricas respecto de la recta y = x.', true, 'Toda función y su inversa son simétricas respecto de y = x.'),
          M('¿Cuál es la inversa de f(x) = 2x + 6?', ['f⁻¹(x) = (x − 6)/2', 'f⁻¹(x) = 2x − 6', 'f⁻¹(x) = x/2 + 6', 'f⁻¹(x) = (x + 6)/2'], 'Despejando x en y = 2x + 6: x = (y − 6)/2.'),
          M('Si f(x) = x³, su inversa es:', ['∛x', 'x/3', '3x', 'x⁻³'], 'La raíz cúbica deshace el cubo.'),
          M('La función f(x) = log₀,₅ x es:', ['Decreciente', 'Creciente', 'Constante', 'No está definida'], 'Base entre 0 y 1: decreciente.'),
          M('¿Para qué x se cumple log₃ x = −2?', ['1/9', '−9', '−6', '9'], 'x = 3⁻² = 1/9.'),
        ],
      },
      {
        n: 'Función potencia', ic: 'func', items: [
          { t: 'info', ic: 'func', title: 'f(x) = a · xⁿ', txt: 'Si **n es par**, la gráfica tiene forma de U y es simétrica respecto del eje y. Si **n es impar**, tiene forma de S y es simétrica respecto del origen.' },
          M('La función f(x) = x³ es:', ['Creciente en todo su dominio', 'Decreciente', 'Simétrica respecto del eje y', 'Siempre positiva'], 'Exponente impar: forma de S, creciente.'),
          M('¿Qué forma tiene la gráfica de f(x) = x⁴?', ['Forma de U, simétrica respecto del eje y', 'Forma de S, creciente', 'Una recta', 'Una hipérbola'], 'Exponente par.'),
          M('Si f(x) = 2x³, entonces f(−2) =', ['−16', '16', '−12', '64'], '2 · (−8) = −16.'),
          M('El área de un cuadrado según su lado, A(l) = l², es un ejemplo de función:', ['Potencia', 'Exponencial', 'Logarítmica', 'Afín'], 'La variable está en la base y el exponente es fijo.'),
          M('El volumen de una esfera, V(r) = (4/3)πr³, es una función potencia de grado:', ['3', '4', '1', 'π'], 'r está elevado a 3.'),
          M('Para valores grandes de x, ¿cuál crece más rápido?', ['2ˣ', 'x²', 'Crecen igual', 'Depende del día'], 'Las exponenciales terminan superando a cualquier potencia.'),
          T('La función f(x) = x² es inyectiva en todos los reales.', false, 'f(2) = f(−2): dos x distintos dan el mismo resultado.'),
          M('¿Cuál es el dominio de f(x) = x⁻¹ = 1/x?', ['Todos los reales excepto 0', 'Todos los reales', 'x > 0', 'x ≥ 0'], 'No se puede dividir por cero.'),
          M('¿En qué punto está centrada la "S" de f(x) = (x − 2)³ + 1?', ['(2, 1)', '(−2, 1)', '(2, −1)', '(0, 1)'], 'Es x³ trasladada 2 a la derecha y 1 hacia arriba.'),
          S('Clasifica cada función', ['Exponencial', 'Potencia'], [['y = 5ˣ', 0], ['y = x⁵', 1], ['y = 0,5ˣ', 0], ['y = 3x²', 1], ['y = 2 · 3ˣ', 0], ['y = x⁻²', 1]], 'Exponencial: la x está en el exponente. Potencia: la x está en la base.'),
        ],
      },
    ],
  });

  // ---------- Trigonometría y homotecia ----------
  RB.unit('m2d', {
    name: 'Trigonometría y homotecia', desc: 'Razones trigonométricas en el triángulo rectángulo, ángulos notables, problemas y homotecias.', ic: 'tri', vid: 'v-m2d', area: 'Geometría',
    lessons: [
      {
        n: 'Razones trigonométricas', ic: 'tri', items: [
          { t: 'info', ic: 'tri', title: 'SOH CAH TOA', txt: '**sen** α = opuesto / hipotenusa · **cos** α = adyacente / hipotenusa · **tan** α = opuesto / adyacente. Ángulos notables: sen 30° = 1/2, cos 60° = 1/2, tan 45° = 1.' },
          M('En un triángulo rectángulo de catetos 3 y 4 e hipotenusa 5, el seno del ángulo opuesto al cateto 3 es:', ['3/5', '4/5', '3/4', '5/3'], 'Opuesto / hipotenusa.'),
          M('En el mismo triángulo, el coseno de ese ángulo es:', ['4/5', '3/5', '4/3', '5/4'], 'Adyacente / hipotenusa.'),
          M('En el mismo triángulo, la tangente de ese ángulo es:', ['3/4', '4/3', '3/5', '5/4'], 'Opuesto / adyacente.'),
          M('sen 30° =', ['1/2', '√3/2', '√2/2', '1'], 'Valor notable.'),
          M('cos 60° =', ['1/2', '√3/2', '0', '√2/2'], 'Valor notable: cos 60° = sen 30°.'),
          M('tan 45° =', ['1', '√2/2', '0', '√3'], 'Los catetos son iguales.'),
          M('sen² α + cos² α =', ['1', '0', '2', 'tan α'], 'Identidad fundamental (viene de Pitágoras).'),
          M('Una escalera de 10 m forma un ángulo de 60° con el suelo. ¿A qué altura toca la pared?', ['5√3 m', '5 m', '10√3 m', '20 m'], 'h = 10 · sen 60° = 10 · √3/2.'),
          M('Desde 20 m de la base de un edificio, se ve su punto más alto con un ángulo de elevación de 45°. ¿Cuánto mide el edificio?', ['20 m', '10 m', '20√2 m', '40 m'], 'tan 45° = h/20 = 1.'),
          T('En un triángulo rectángulo, el seno de un ángulo agudo es igual al coseno de su complemento.', true, 'sen α = cos(90° − α).'),
          N('Si sen α = 0,6 y α es agudo, ¿cuánto vale cos α?', 0.8, '', 'cos² α = 1 − 0,36 = 0,64 → cos α = 0,8.'),
        ],
      },
      {
        n: 'Problemas de trigonometría', ic: 'target', items: [
          M('Un avión despega con un ángulo de 30° y recorre 2.000 m en línea recta. ¿Qué altura alcanza?', ['1.000 m', '2.000 m', '1.000√3 m', '4.000 m'], '2.000 · sen 30° = 1.000.'),
          M('Un árbol proyecta una sombra de 10 m cuando el ángulo de elevación del sol es 60°. ¿Cuánto mide el árbol?', ['10√3 m', '10 m', '5√3 m', '20 m'], 'tan 60° = h/10 → h = 10√3.'),
          M('En un triángulo rectángulo, tan α = 1. ¿Cuánto mide α?', ['45°', '30°', '60°', '90°'], 'Opuesto = adyacente.'),
          M('Si cos α = 5/13 y α es agudo, entonces sen α =', ['12/13', '8/13', '5/12', '13/12'], 'Trío 5-12-13.'),
          M('Una rampa sube 1 m por cada 4 m horizontales. ¿Cuál es la tangente de su ángulo de inclinación?', ['1/4', '4', '1/√17', '√17'], 'Opuesto (subida) / adyacente (avance).'),
          M('Usando trigonometría, ¿cuál es la altura de un triángulo equilátero de lado 6 cm?', ['3√3 cm', '6√3 cm', '3 cm', '√3 cm'], '6 · sen 60° = 3√3.'),
          T('En los ángulos agudos, si el ángulo aumenta, su seno también aumenta.', true, 'Va de 0 (en 0°) a 1 (en 90°).'),
          M('El área de un triángulo con lados a = 8 y b = 5 y un ángulo comprendido de 30° es:', ['10', '20', '40', '10√3'], 'Área = (1/2) · a · b · sen γ = (1/2) · 8 · 5 · 1/2.'),
          M('Un observador ve la cima de un cerro con un ángulo de elevación α. Si se acerca al cerro, el ángulo α:', ['Aumenta', 'Disminuye', 'No cambia', 'Se vuelve negativo'], 'Más cerca, hay que mirar más hacia arriba.'),
        ],
      },
      {
        n: 'Homotecia', ic: 'spark', items: [
          { t: 'info', ic: 'spark', title: 'Homotecia', txt: 'Una homotecia de centro O y razón k multiplica por k las distancias desde O. Con centro en el origen: (x, y) → (kx, ky). Si |k| > 1 amplía, si |k| < 1 reduce y si k < 0, además, invierte la figura.' },
          M('Una homotecia de centro en el origen y razón 2 transforma el punto (3, −1) en:', ['(6, −2)', '(5, 1)', '(1,5; −0,5)', '(6, −1)'], '(2 · 3, 2 · (−1)).'),
          M('Una homotecia de razón 1/2 con centro en el origen transforma (8, 4) en:', ['(4, 2)', '(16, 8)', '(8,5; 4,5)', '(2, 4)'], 'Se multiplican ambas coordenadas por 1/2.'),
          M('Una homotecia de razón −1 con centro en el origen equivale a:', ['Una rotación de 180°', 'Una reflexión respecto del eje x', 'Una traslación', 'Una ampliación'], '(x, y) → (−x, −y).'),
          M('Si una figura se transforma con razón k = 3, su área se multiplica por:', ['9', '3', '27', '6'], 'Las áreas se multiplican por k².'),
          M('Si k = 0,5, la figura imagen es:', ['Una reducción a la mitad', 'Una ampliación al doble', 'Igual a la original', 'Invertida'], '0 < k < 1 reduce.'),
          T('Una homotecia conserva los ángulos de la figura.', true, 'La imagen es semejante a la original.'),
          M('Mediante una homotecia de centro en el origen, el punto (2, 3) se transforma en (6, 9). ¿Cuál es la razón?', ['3', '4', '1/3', '6'], '6/2 = 9/3 = 3.'),
          M('Una homotecia de centro (1, 1) y razón 2 transforma el punto (3, 2) en:', ['(5, 3)', '(6, 4)', '(4, 3)', '(7, 5)'], 'O + k · (P − O) = (1, 1) + 2 · (2, 1) = (5, 3).'),
          M('Un triángulo tiene perímetro 12 cm. ¿Cuál es el perímetro de su imagen con una homotecia de razón 2,5?', ['30 cm', '14,5 cm', '75 cm', '4,8 cm'], 'Las longitudes se multiplican por k.'),
        ],
      },
    ],
  });

  // ---------- Videos ----------
  RB.video('v-m2c', {
    u: 'm2c', title: 'Exponencial, logarítmica y potencia', desc: 'Crecimiento, decaimiento, vida media, función inversa y funciones potencia.',
    sc: [
      { h: 'Funciones exponencial, logarítmica y potencia', sub: 'Tres familias de curvas que modelan el mundo', b: [{ tags: ['Crecimiento', 'Decaimiento', 'Vida media', 'Inversa', 'Logarítmica', 'Potencia'] }],
        s: ['Hola. En este video vamos a conocer tres familias de funciones que modelan fenómenos reales: la exponencial, la logarítmica y la potencia.', 'Verás cómo reconocer sus gráficos, cómo modelar crecimiento y decaimiento, qué es una función inversa, y cómo distinguir una exponencial de una potencia.'] },
      { h: 'La función exponencial', ic: 'spark', b: [{ plot: { f: [x => Math.pow(2, x), x => Math.pow(0.5, x)], x: [-3, 3], y: [-0.5, 8], pts: [[0, 1, '(0, 1)']], cap: 'Lima: 2ˣ crece · Blanca: (1/2)ˣ decrece' } }, { two: [['b > 1', 'Crece'], ['0 < b < 1', 'Decrece']] }, 'Nunca toca el eje x: su recorrido son los **reales positivos**'],
        s: ['La función exponencial tiene la variable en el exponente: a por b elevado a equis.', 'Mira estas dos curvas. Dos elevado a equis crece cada vez más rápido. Un medio elevado a equis decrece. Ambas pasan por el punto cero coma uno, porque cualquier base elevada a cero es uno.', 'La base decide la forma: si es mayor que uno, la función crece; si está entre cero y uno, decrece.', 'Y un detalle que la PAES pregunta: la curva se acerca al eje equis pero nunca lo toca. Sus valores siempre son positivos.'] },
      { h: 'Crecimiento y decaimiento', ic: 'chart', b: [{ eq: 'Crece p % por período:  C(t) = C₀ · (1 + p)ᵗ', n: '$1.000.000 al 5 % anual → 1.000.000 · 1,05ᵗ' }, { eq: 'Decrece p % por período:  A(t) = A₀ · (1 − p)ᵗ', n: '100 mg, se elimina 20 % por hora → 100 · 0,8ᵗ' }, { eq: 'Vida media de 5 años: 80 g → 40 → 20 → 10 g en 15 años' }, { warn: 'f(x) = 3 · 2ˣ → f(3) = 3 · 8 = 24, **no** 6³' }],
        s: ['La exponencial modela todo lo que cambia en un porcentaje fijo por período.', 'Si algo crece un p por ciento, se multiplica por uno más p en cada período. Un millón de pesos al cinco por ciento anual es un millón por uno coma cero cinco elevado a te.', 'Si decrece, se multiplica por uno menos p. Si un medicamento se elimina un veinte por ciento por hora, queda el ochenta por ciento: cien por cero coma ocho elevado a te.', 'La vida media es el tiempo en que una cantidad se reduce a la mitad. Con vida media de cinco años, ochenta gramos pasan a cuarenta, luego a veinte y luego a diez en quince años.', 'Y cuidado al evaluar: en tres por dos elevado a equis, el exponente afecta solo al dos. Tres por dos al cubo es veinticuatro.'] },
      { h: 'La función inversa', ic: 'replay', b: [{ eq: 'Si f(2) = 9, entonces f⁻¹(9) = 2', n: 'La inversa deshace lo que hace f' }, { eq: 'f(x) = 2x + 6  →  y = 2x + 6  →  x = (y − 6)/2  →  f⁻¹(x) = (x − 6)/2' }, { q: '¿Cuál es la inversa de f(x) = x³?', o: ['∛x', 'x/3', '3x', 'x⁻³'], e: 'La raíz cúbica deshace el cubo: ∛(x³) = x.' }],
        s: ['Una función inversa deshace lo que hace la función original.', 'Si f de dos es nueve, entonces la inversa de nueve es dos.', 'Para encontrarla, escribe y igual a la función, despeja equis y luego cambia los nombres. Con dos equis más seis, despejando queda equis igual y menos seis, partido por dos. Esa es la inversa.', 'Ahora tú.'] },
      { h: 'La función logarítmica', ic: 'func', b: [{ plot: { f: [x => Math.pow(2, x), x => (x > 0 ? Math.log2(x) : NaN), x => x], x: [-3, 6], y: [-3, 6], pts: [[1, 0, '(1, 0)'], [0, 1, '(0, 1)']], cap: 'Lima: 2ˣ · Blanca: log₂ x · simétricas respecto de y = x' } }, { two: [['Dominio', 'x > 0'], ['Corte con eje x', '(1, 0), porque log 1 = 0']] }],
        s: ['La función logarítmica es la inversa de la exponencial.', 'Mira cómo el gráfico de logaritmo en base dos de equis es el reflejo de dos elevado a equis respecto de la recta y igual equis. Eso pasa siempre entre una función y su inversa.', 'Su dominio son solo los números positivos, porque no existe el logaritmo de cero ni de negativos. Y corta el eje equis en uno coma cero, porque el logaritmo de uno es cero.'] },
      { h: 'La función potencia', ic: 'func', b: [{ plot: { f: [x => x * x, x => x * x * x], x: [-2, 2], y: [-4, 4], cap: 'Lima: x² (par, forma de U) · Blanca: x³ (impar, forma de S)' } }, { two: [['n par', 'Forma de U · simétrica respecto del eje y'], ['n impar', 'Forma de S · simétrica respecto del origen']] }, { eq: '(x − 2)³ + 1: la "S" de x³ trasladada a (2, 1)' }],
        s: ['La función potencia tiene la variable en la base y un exponente fijo: a por equis elevado a ene.', 'Si el exponente es par, como en equis al cuadrado, la gráfica tiene forma de U. Si es impar, como en equis al cubo, tiene forma de S.', 'Las de exponente par son simétricas respecto del eje y: f de dos es igual a f de menos dos. Las de exponente impar son simétricas respecto del origen y son crecientes.', 'Y se trasladan igual que la parábola: equis menos dos al cubo, más uno, es la S de equis al cubo movida al punto dos coma uno.'] },
      { h: '¿Exponencial o potencia?', ic: 'flag', b: [{ two: [['Exponencial', 'La x en el **exponente**', '5ˣ · 2 · 3ˣ · 0,5ˣ'], ['Potencia', 'La x en la **base**', 'x⁵ · 3x² · x⁻²']] }, { tip: 'A largo plazo, **2ˣ supera a x²** y a cualquier potencia.' }, { q: '¿Cuál de estas funciones es exponencial?', o: ['y = 2 · 3ˣ', 'y = 3x²', 'y = x⁵', 'y = x⁻²'], e: 'En 2 · 3ˣ la variable está en el exponente.' }],
        s: ['Para no confundirlas, mira dónde está la equis.', 'Si la equis está en el exponente, es exponencial. Si la equis está en la base y el exponente es un número fijo, es potencia.', 'Y un dato: a largo plazo, cualquier exponencial con base mayor que uno termina superando a cualquier potencia. Dos elevado a equis le gana a equis al cuadrado.', 'Identifica la exponencial.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['b > 1 crece', '0 < b < 1 decrece', '(1 ± p)ᵗ', 'Vida media', 'Inversa: despejar', 'log: dominio x > 0', 'Par: U · Impar: S'] }],
        s: ['Resumen: la exponencial crece si la base es mayor que uno y decrece si está entre cero y uno, y modela cambios porcentuales constantes.', 'La logarítmica es su inversa, con dominio positivo. Y en la potencia, el exponente par da forma de U y el impar, forma de S. ¡A practicar!'] },
    ],
  });

  RB.video('v-m2d', {
    u: 'm2d', title: 'Trigonometría y homotecia', desc: 'Seno, coseno y tangente, ángulos notables, problemas de alturas y homotecias.',
    sc: [
      { h: 'Trigonometría y homotecia', sub: 'Ángulos que miden distancias', b: [{ tags: ['SOH CAH TOA', 'Ángulos notables', 'sen² + cos² = 1', 'Alturas', 'Homotecia'] }],
        s: ['Hola. La trigonometría permite calcular distancias que no se pueden medir directamente, como la altura de un edificio o de un cerro, usando ángulos.', 'En este video veremos las razones trigonométricas, los ángulos notables, problemas de alturas y, al final, la homotecia.'] },
      { h: 'SOH CAH TOA', ic: 'tri', b: [{ eq: 'sen α = opuesto / hipotenusa' }, { eq: 'cos α = adyacente / hipotenusa' }, { eq: 'tan α = opuesto / adyacente' }, { ex: 'Triángulo 3-4-5, ángulo opuesto al 3: sen = 3/5 · cos = 4/5 · tan = 3/4' }],
        s: ['Las razones trigonométricas comparan los lados de un triángulo rectángulo, mirados desde un ángulo agudo.', 'El seno es el cateto opuesto dividido por la hipotenusa.', 'El coseno es el cateto adyacente, el que está pegado al ángulo, dividido por la hipotenusa.', 'Y la tangente es el opuesto dividido por el adyacente. Una forma de recordarlo es la palabra so ca toa: seno, opuesto sobre hipotenusa; coseno, adyacente sobre hipotenusa; tangente, opuesto sobre adyacente.', 'En el triángulo tres, cuatro, cinco, para el ángulo opuesto al tres: el seno es tres quintos, el coseno cuatro quintos y la tangente tres cuartos.'] },
      { h: 'Ángulos notables', ic: 'star', b: [{ two: [['30°', 'sen = 1/2 · cos = √3/2 · tan = √3/3'], ['60°', 'sen = √3/2 · cos = 1/2 · tan = √3']] }, { two: [['45°', 'sen = cos = √2/2 · tan = 1'], ['Truco', 'sen α = cos (90° − α)']] }, { q: '¿Cuánto vale cos 60°?', o: ['1/2', '√3/2', '0', '√2/2'], e: 'cos 60° = sen 30° = 1/2.' }],
        s: ['Hay tres ángulos cuyos valores conviene saber de memoria.', 'Treinta grados: seno un medio, coseno raíz de tres partido por dos. Sesenta grados: al revés, seno raíz de tres partido por dos, coseno un medio.', 'Cuarenta y cinco grados: seno y coseno son iguales, raíz de dos partido por dos, y la tangente es uno. El truco es que el seno de un ángulo es el coseno de su complemento.', 'Pruébalo.'] },
      { h: 'La identidad fundamental', ic: 'sigma', b: [{ eq: 'sen² α + cos² α = 1', n: 'Viene directo de Pitágoras' }, { eq: 'sen α = 0,6  →  cos² α = 1 − 0,36 = 0,64  →  cos α = 0,8' }, { eq: 'cos α = 5/13  →  sen α = 12/13', n: 'Trío 5-12-13' }],
        s: ['Hay una identidad que se usa muchísimo.', 'Seno al cuadrado más coseno al cuadrado es siempre uno, para cualquier ángulo. Sale directamente del teorema de Pitágoras.', 'Si el seno de un ángulo agudo es cero coma seis, el coseno al cuadrado es uno menos cero coma treinta y seis, o sea, cero coma sesenta y cuatro, y el coseno es cero coma ocho.', 'Y si el coseno es cinco treceavos, piensa en el trío cinco, doce, trece: el seno es doce treceavos.'] },
      { h: 'Calcular alturas', ic: 'landmark', b: [{ ex: 'Una escalera de 10 m forma 60° con el suelo. ¿A qué altura toca la pared?' }, { sol: 'h = 10 · sen 60° = 10 · √3/2 = **5√3 m**' }, { ex: 'Desde 20 m de un edificio se ve la cima con 45° de elevación.' }, { sol: 'tan 45° = h/20 = 1  →  **h = 20 m**' }],
        s: ['La aplicación más típica: calcular alturas.', 'Una escalera de diez metros forma un ángulo de sesenta grados con el suelo. ¿A qué altura toca la pared?', 'La escalera es la hipotenusa y la altura es el cateto opuesto al ángulo. Entonces la altura es diez por seno de sesenta, o sea, cinco raíz de tres metros.', 'Otro: desde veinte metros de un edificio, ves su cima con un ángulo de elevación de cuarenta y cinco grados.', 'Aquí conoces el adyacente y buscas el opuesto, así que usas tangente: la tangente de cuarenta y cinco es uno, y el edificio mide veinte metros.'] },
      { h: 'Área con trigonometría', ic: 'grid', b: [{ eq: 'Área = (1/2) · a · b · sen γ', n: 'γ es el ángulo entre los lados a y b' }, { eq: 'a = 8, b = 5, γ = 30°  →  (1/2) · 8 · 5 · 1/2 = 10' }],
        s: ['La trigonometría también da una fórmula de área muy útil.', 'Si conoces dos lados de un triángulo y el ángulo entre ellos, el área es un medio por un lado por el otro por el seno del ángulo.', 'Con lados ocho y cinco y un ángulo de treinta grados, el área es un medio por ocho por cinco por un medio: diez. No necesitas conocer la altura.'] },
      { h: 'Homotecia', ic: 'spark', b: [{ eq: 'Centro en el origen, razón k:  (x, y) → (kx, ky)' }, { two: [['|k| > 1', 'Amplía'], ['|k| < 1', 'Reduce']] }, { two: [['k < 0', 'Además invierte (como girar 180°)'], ['Áreas', 'Se multiplican por k²']] }, { q: 'Una homotecia de centro en el origen transforma (2, 3) en (6, 9). ¿Cuál es la razón?', o: ['3', '4', '1/3', '6'], e: 'Cada coordenada se multiplicó por 3.' }],
        s: ['Por último, la homotecia: una transformación que agranda o achica una figura desde un punto llamado centro.', 'Con centro en el origen y razón ka, cada punto equis coma y pasa a ka equis coma ka y.', 'Si el valor absoluto de ka es mayor que uno, la figura se amplía; si es menor que uno, se reduce.', 'Si ka es negativo, además la figura queda invertida al otro lado del centro: con razón menos uno, equivale a girarla ciento ochenta grados. Y como la imagen es semejante, las longitudes se multiplican por ka y las áreas por ka al cuadrado.', 'Encuentra la razón.'] },
      { h: 'Homotecia con otro centro', ic: 'target', b: [{ eq: 'Imagen = O + k · (P − O)' }, { eq: 'O = (1, 1), k = 2, P = (3, 2)  →  (1, 1) + 2 · (2, 1) = (5, 3)' }],
        s: ['¿Y si el centro no es el origen?', 'Usa esta fórmula: la imagen es el centro más ka por el vector que va del centro al punto.', 'Con centro uno coma uno, razón dos y el punto tres coma dos: el vector del centro al punto es dos coma uno; multiplicado por dos queda cuatro coma dos; y sumado al centro da cinco coma tres.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['sen = op/hip', 'cos = ady/hip', 'tan = op/ady', 'sen 30° = 1/2', 'sen² + cos² = 1', 'Homotecia: (kx, ky)'] }],
        s: ['Resumen: seno es opuesto sobre hipotenusa, coseno es adyacente sobre hipotenusa y tangente es opuesto sobre adyacente. Memoriza los ángulos de treinta, cuarenta y cinco y sesenta grados.', 'Y en la homotecia, multiplica por ka las coordenadas, o las distancias desde el centro. ¡A practicar!'] },
    ],
  });
})();
