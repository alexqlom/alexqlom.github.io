// Matemática M2 (2): funciones exponencial, logarítmica y potencia; trigonometría y homotecia.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Funciones exponencial, logarítmica y potencia ----------
  RB.unit('m2c', {
    name: 'Funciones exponencial, logarítmica y potencia', desc: 'Crecimiento y decaimiento, función inversa, gráficos y modelación.', ic: 'func', area: 'Funciones',
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
    name: 'Trigonometría y homotecia', desc: 'Razones trigonométricas en el triángulo rectángulo, ángulos notables, problemas y homotecias.', ic: 'tri', area: 'Geometría',
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

})();
