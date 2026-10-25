// Matemática M1 (4): función lineal y afín; ecuación y función cuadrática.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Función lineal y afín ----------
  RB.unit('m1g', {
    name: 'Función lineal y afín', desc: 'Concepto de función, pendiente, coeficiente de posición, ecuación de la recta y modelación.', ic: 'func', vid: 'v-m1g', area: 'Funciones',
    lessons: [
      {
        n: 'Concepto de función', ic: 'func', items: [
          { t: 'info', ic: 'func', title: 'Función', txt: 'Una función asigna a **cada valor de x un único valor de y**. f(x) se lee "f de x": es el resultado que entrega la función cuando entra x.' },
          M('Si f(x) = 3x − 2, ¿cuánto es f(4)?', ['10', '12', '14', '1/3'], '3 · 4 − 2 = 10.'),
          M('Si f(x) = x² − 1, ¿cuánto es f(−3)?', ['8', '−10', '10', '−8'], '(−3)² − 1 = 9 − 1 = 8.'),
          M('Si g(x) = 2x + 5 y g(a) = 11, entonces a =', ['3', '27', '8', '−3'], '2a + 5 = 11 → a = 3.'),
          M('¿Cuál de estas relaciones NO es una función?', ['Una en que x = 2 se asocia con y = 3 y también con y = 5', 'y = 2x + 1', 'y = x²', 'y = 5 para todo x'], 'A un mismo x no pueden corresponderle dos valores de y.'),
          M('Si f(x) = 4 − x, ¿cuánto es f(1) + f(−1)?', ['8', '6', '2', '0'], 'f(1) = 3 y f(−1) = 5.'),
          T('En la función f(x) = x², se cumple que f(2) = f(−2).', true, 'Ambas dan 4.'),
          M('¿Qué función corresponde a la tabla x: 0, 1, 2, 3 · y: 1, 3, 5, 7?', ['y = 2x + 1', 'y = x + 1', 'y = 3x', 'y = 2x − 1'], 'y aumenta de 2 en 2 y parte en 1.'),
          N('Si f(x) = 5x − 3, ¿para qué x se cumple f(x) = 0?', 0.6, '', '5x = 3 → x = 0,6.'),
          M('Si f(x) = 2x y h(x) = x + 3, ¿cuánto es f(h(1))?', ['8', '5', '7', '4'], 'Primero h(1) = 4; luego f(4) = 8.'),
        ],
      },
      {
        n: 'Pendiente e intercepto', ic: 'chart', items: [
          { t: 'info', ic: 'chart', title: 'f(x) = mx + n', txt: '**m** es la pendiente (cuánto sube y por cada unidad que avanza x) y **n** es el coeficiente de posición (donde la recta corta el eje y). Si n = 0, la función es **lineal** y pasa por el origen.' },
          M('En f(x) = −2x + 5, la pendiente y el coeficiente de posición son:', ['m = −2 y n = 5', 'm = 5 y n = −2', 'm = 2 y n = 5', 'm = −2 y n = −5'], 'El número que multiplica a x es la pendiente; el término libre es n.'),
          M('¿Cuál de estas funciones es lineal (pasa por el origen)?', ['f(x) = 4x', 'f(x) = 4x + 1', 'f(x) = x + 4', 'f(x) = 4'], 'Una función lineal tiene n = 0.'),
          M('La recta y = 3x − 6 corta al eje y en:', ['(0, −6)', '(0, 3)', '(2, 0)', '(−6, 0)'], 'Con x = 0, y = −6.'),
          M('La recta y = 3x − 6 corta al eje x en:', ['(2, 0)', '(−2, 0)', '(0, −6)', '(6, 0)'], 'Con y = 0: 3x = 6 → x = 2.'),
          M('Si la pendiente de una recta es negativa, la función es:', ['Decreciente', 'Creciente', 'Constante', 'Cuadrática'], 'Cuando x aumenta, y disminuye.'),
          M('La pendiente de la recta que pasa por (1, 2) y (3, 8) es:', ['3', '1/3', '6', '2'], 'm = (8 − 2)/(3 − 1) = 6/2 = 3.'),
          T('La función f(x) = 7 es una recta horizontal de pendiente 0.', true, 'Para todo x vale 7: no sube ni baja.'),
          M('¿Qué recta es paralela a y = 2x + 1?', ['y = 2x − 4', 'y = −2x + 1', 'y = x/2 + 1', 'y = −x/2'], 'Las rectas paralelas tienen la misma pendiente.'),
          M('En y = (1/2)x + 3, si x aumenta en 4, entonces y:', ['Aumenta en 2', 'Aumenta en 4', 'Disminuye en 2', 'Aumenta en 8'], 'Variación de y = m · variación de x = 1/2 · 4 = 2.'),
          P('Une cada función con la descripción de su gráfico', [['y = 2x', 'Creciente, pasa por el origen'], ['y = −x + 3', 'Decreciente, corta al eje y en 3'], ['y = 4', 'Horizontal'], ['y = x − 2', 'Creciente, corta al eje y en −2']], 'Mira el signo de m y el valor de n.'),
        ],
      },
      {
        n: 'Ecuación de la recta', ic: 'pen', items: [
          M('La recta de pendiente 2 que pasa por (0, −1) tiene ecuación:', ['y = 2x − 1', 'y = −x + 2', 'y = 2x + 1', 'y = x − 2'], 'm = 2 y n = −1 (corta al eje y en −1).'),
          M('La ecuación de la recta que pasa por (2, 5) y (4, 9) es:', ['y = 2x + 1', 'y = 2x + 5', 'y = 4x − 3', 'y = x + 3'], 'm = (9 − 5)/(4 − 2) = 2; 5 = 2 · 2 + n → n = 1.'),
          M('La recta que pasa por (0, 4) y (2, 0) es:', ['y = −2x + 4', 'y = 2x + 4', 'y = −x/2 + 4', 'y = 4x − 2'], 'm = (0 − 4)/(2 − 0) = −2; n = 4.'),
          M('¿Qué punto pertenece a la recta y = −3x + 7?', ['(2, 1)', '(1, 2)', '(−1, 4)', '(3, 1)'], '−3 · 2 + 7 = 1 ✔.'),
          M('Las rectas y = 3x + 1 e y = −x/3 + 2 son:', ['Perpendiculares', 'Paralelas', 'Coincidentes', 'Ninguna de las anteriores'], 'El producto de sus pendientes es 3 · (−1/3) = −1.'),
          N('La recta y = mx + 3 pasa por (2, 11). ¿Cuánto vale m?', 4, '', '11 = 2m + 3 → m = 4.'),
          M('La recta 2x + y = 6 escrita en la forma y = mx + n es:', ['y = −2x + 6', 'y = 2x + 6', 'y = −2x − 6', 'y = 2x − 6'], 'Despejando y: y = 6 − 2x.'),
          T('Dos rectas paralelas tienen la misma pendiente.', true, 'Tienen la misma inclinación y nunca se cortan.'),
          M('¿Cuál es la pendiente de la recta 3x − 2y = 8?', ['3/2', '−3/2', '3', '−4'], '−2y = −3x + 8 → y = (3/2)x − 4.'),
        ],
      },
      {
        n: 'Modelar con funciones', ic: 'target', items: [
          M('Un taxi cobra $400 fijos más $150 por cada tramo de 100 m. ¿Qué función da el costo C según el número de tramos t?', ['C(t) = 150t + 400', 'C(t) = 400t + 150', 'C(t) = 550t', 'C(t) = 150t − 400'], 'El cargo fijo es n y el costo por tramo es la pendiente.'),
          M('Un auto nuevo vale $12.000.000 y pierde $1.500.000 de valor por año. ¿Cuánto vale a los 4 años?', ['$6.000.000', '$10.500.000', '$7.500.000', '$4.500.000'], 'V(t) = 12.000.000 − 1.500.000t; V(4) = 6.000.000.'),
          M('Según el modelo anterior, ¿en cuántos años el auto valdría $0?', ['8', '6', '12', '10'], '12.000.000 : 1.500.000 = 8.'),
          M('Una vela de 20 cm se consume 2 cm por hora. ¿Qué función da su altura h después de t horas?', ['h(t) = 20 − 2t', 'h(t) = 2t + 20', 'h(t) = 20t − 2', 'h(t) = 18t'], 'Parte en 20 y baja 2 por hora: pendiente −2.'),
          M('El plan A cobra $10.000 fijos + $50 por minuto; el plan B cobra $200 por minuto sin cargo fijo. ¿Desde cuántos minutos conviene el plan A?', ['Más de 66 minutos', 'Más de 50 minutos', 'Más de 100 minutos', 'Más de 200 minutos'], '10.000 + 50m < 200m → 10.000 < 150m → m > 66,7.'),
          N('Un estanque tiene 500 L y recibe 25 L por minuto. ¿Cuántos litros tendrá a los 12 minutos?', 800, 'L', '500 + 25 · 12 = 800.'),
          M('El sueldo de un vendedor es S(v) = 350.000 + 0,04v, con v sus ventas. ¿Qué representa 350.000?', ['El sueldo base, aunque no venda nada', 'La comisión por venta', 'El máximo que puede ganar', 'Lo que vende al mes'], 'Es el valor de S cuando v = 0.'),
          M('Un costo de $3.000 fijos más $500 por unidad se representa con una recta de:', ['Pendiente 500 y corte en el eje y en 3.000', 'Pendiente 3.000 y corte en 500', 'Pendiente 3.500', 'Pendiente 0'], 'C(x) = 500x + 3.000.'),
          T('En una función afín que modela un costo, la pendiente representa el costo de cada unidad adicional.', true, 'Por cada unidad más, el costo sube m.'),
        ],
      },
    ],
  });

  // ---------- Función cuadrática ----------
  RB.unit('m1h', {
    name: 'Ecuación y función cuadrática', desc: 'Resolver ecuaciones de segundo grado, discriminante, parábola, vértice y problemas de máximos.', ic: 'func', vid: 'v-m1h', area: 'Funciones',
    lessons: [
      {
        n: 'Ecuación de segundo grado', ic: 'calc', items: [
          { t: 'info', ic: 'calc', title: 'Fórmula general', txt: 'Para ax² + bx + c = 0: x = (−b ± √(b² − 4ac)) / 2a. El **discriminante** Δ = b² − 4ac dice cuántas soluciones reales hay.' },
          M('Las soluciones de x² − 9 = 0 son:', ['x = 3 y x = −3', 'Solo x = 3', 'x = 9 y x = −9', 'x = 81'], 'x² = 9 → x = ±3.'),
          M('Las soluciones de x² − 5x = 0 son:', ['x = 0 y x = 5', 'Solo x = 5', 'x = −5 y x = 0', 'x = √5'], 'x(x − 5) = 0. No dividas por x: perderías la solución x = 0.'),
          M('Las soluciones de x² − 7x + 10 = 0 son:', ['x = 2 y x = 5', 'x = −2 y x = −5', 'x = 1 y x = 10', 'x = −2 y x = 5'], '(x − 2)(x − 5) = 0.'),
          M('Las soluciones de x² + 2x − 15 = 0 son:', ['x = 3 y x = −5', 'x = −3 y x = 5', 'x = 5 y x = 3', 'x = −15 y x = 1'], '(x + 5)(x − 3) = 0.'),
          M('Las soluciones de 2x² − 3x − 2 = 0 son:', ['x = 2 y x = −1/2', 'x = −2 y x = 1/2', 'x = 1 y x = −2', 'x = 3 y x = −2'], 'Δ = 9 + 16 = 25; x = (3 ± 5)/4.'),
          M('El discriminante de x² − 4x + 4 = 0 es 0. ¿Qué indica?', ['Una solución real (doble)', 'Dos soluciones reales distintas', 'Ninguna solución real', 'Infinitas soluciones'], 'Δ = 16 − 16 = 0: la ecuación es (x − 2)² = 0.'),
          M('La ecuación x² + x + 5 = 0:', ['No tiene soluciones reales', 'Tiene dos soluciones reales', 'Tiene una solución real', 'Tiene infinitas soluciones'], 'Δ = 1 − 20 = −19 < 0.'),
          N('Si x = 3 es solución de x² + kx − 6 = 0, ¿cuánto vale k?', -1, '', '9 + 3k − 6 = 0 → 3k = −3 → k = −1.'),
          T('La ecuación (x − 4)² = 0 tiene dos soluciones distintas.', false, 'Solo x = 4 (solución doble).'),
          M('La suma de las soluciones de x² − 6x + 8 = 0 es:', ['6', '8', '−6', '2'], 'Las soluciones son 2 y 4. En general, la suma es −b/a.'),
        ],
      },
      {
        n: 'La parábola', ic: 'func', items: [
          { t: 'info', ic: 'func', title: 'f(x) = ax² + bx + c', txt: 'Si **a > 0** la parábola abre hacia arriba (tiene mínimo); si **a < 0**, hacia abajo (tiene máximo). Corta el eje y en **c**. El vértice está en **x = −b/2a**.' },
          M('La parábola f(x) = −2x² + 3x + 1 es:', ['Cóncava hacia abajo, con un máximo', 'Cóncava hacia arriba, con un mínimo', 'Una recta', 'Siempre positiva'], 'a = −2 < 0.'),
          M('¿Dónde corta f(x) = x² − 4x + 3 al eje y?', ['(0, 3)', '(3, 0)', '(0, −4)', '(1, 0)'], 'f(0) = c = 3.'),
          M('¿Dónde corta f(x) = x² − 4x + 3 al eje x?', ['En (1, 0) y (3, 0)', 'En (−1, 0) y (−3, 0)', 'En (0, 3)', 'En (4, 0) y (3, 0)'], 'x² − 4x + 3 = (x − 1)(x − 3) = 0.'),
          M('El vértice de f(x) = x² − 4x + 3 es:', ['(2, −1)', '(−2, 15)', '(4, 3)', '(2, 1)'], 'x = 4/2 = 2; f(2) = 4 − 8 + 3 = −1.'),
          M('El eje de simetría de f(x) = 2x² + 8x − 1 es:', ['x = −2', 'x = 2', 'x = −4', 'x = 8'], 'x = −8/(2 · 2) = −2.'),
          M('¿Cuál es el valor mínimo de f(x) = x² + 6x + 10?', ['1', '10', '−3', '6'], 'Vértice en x = −3; f(−3) = 9 − 18 + 10 = 1.'),
          T('Si el discriminante es negativo, la parábola no corta el eje x.', true, 'No hay soluciones reales de f(x) = 0.'),
          M('¿Qué función tiene su vértice en (0, 0) y abre hacia abajo?', ['f(x) = −3x²', 'f(x) = 3x²', 'f(x) = −3x² + 1', 'f(x) = x² − 3'], 'Sin b ni c, el vértice está en el origen; a < 0 abre hacia abajo.'),
          P('Une cada elemento con lo que indica', [['a > 0', 'La parábola abre hacia arriba'], ['c', 'El corte con el eje y'], ['−b/2a', 'La coordenada x del vértice'], ['b² − 4ac < 0', 'No corta el eje x']], 'Con estos cuatro datos puedes esbozar cualquier parábola.'),
          M('Si f(x) = (x − 1)(x + 5), sus ceros son:', ['x = 1 y x = −5', 'x = −1 y x = 5', 'x = 1 y x = 5', 'Solo x = −5'], 'Cada factor se anula: x − 1 = 0 o x + 5 = 0.'),
        ],
      },
      {
        n: 'Problemas de segundo grado', ic: 'target', items: [
          M('Una pelota lanzada hacia arriba tiene altura h(t) = −5t² + 20t (metros, t en segundos). ¿Cuál es la altura máxima?', ['20 m', '40 m', '2 m', '10 m'], 'Vértice en t = −20/(−10) = 2; h(2) = −20 + 40 = 20.'),
          M('En el lanzamiento anterior, ¿en qué instante la pelota vuelve al suelo?', ['t = 4 s', 't = 2 s', 't = 20 s', 't = 5 s'], '−5t² + 20t = 0 → t(−5t + 20) = 0 → t = 0 o t = 4.'),
          M('Un rectángulo tiene área 24 cm² y su largo mide 2 cm más que su ancho. ¿Cuánto mide el ancho?', ['4 cm', '6 cm', '2 cm', '12 cm'], 'x(x + 2) = 24 → x² + 2x − 24 = 0 → (x + 6)(x − 4) = 0 → x = 4.'),
          M('Con 40 m de reja se quiere cercar un terreno rectangular de área máxima. ¿Qué dimensiones debe tener?', ['10 m × 10 m', '15 m × 5 m', '20 m × 20 m', '12 m × 8 m'], 'A(x) = x(20 − x) es máxima en x = 10: un cuadrado.'),
          N('El producto de dos números consecutivos positivos es 56. ¿Cuál es el menor?', 7, '', 'x(x + 1) = 56 → x = 7 (7 · 8 = 56).'),
          M('La ganancia de una empresa es G(x) = −x² + 40x − 300 (en miles de pesos, x unidades). ¿Cuántas unidades maximizan la ganancia?', ['20', '40', '300', '10'], 'x = −40/(2 · (−1)) = 20.'),
          M('En el caso anterior, ¿cuál es la ganancia máxima?', ['100 mil pesos', '400 mil pesos', '300 mil pesos', '20 mil pesos'], 'G(20) = −400 + 800 − 300 = 100.'),
          T('Una función cuadrática con a < 0 tiene un valor máximo.', true, 'Abre hacia abajo: su vértice es el punto más alto.'),
          M('Si el área de un cuadrado de lado (x + 1) es 49, ¿cuánto vale x?', ['6', '7', '48', '8'], '(x + 1)² = 49 → x + 1 = 7 (un lado no puede ser negativo) → x = 6.'),
        ],
      },
    ],
  });

  // ---------- Videos ----------
  RB.video('v-m1g', {
    u: 'm1g', title: 'Función lineal y afín', desc: 'Qué es una función, pendiente, intercepto, ecuación de la recta y modelación de situaciones.',
    sc: [
      { h: 'Función lineal y afín', sub: 'Rectas que cuentan historias', b: [{ tags: ['f(x)', 'Pendiente', 'Intercepto', 'Ecuación de la recta', 'Paralelas', 'Modelar'] }],
        s: ['Hola. Las funciones son una de las partes más importantes de M1.', 'En este video veremos qué es una función, cómo leer la pendiente y el coeficiente de posición, cómo encontrar la ecuación de una recta y cómo usar funciones para modelar situaciones reales, como tarifas y planes de celular.'] },
      { h: '¿Qué es una función?', ic: 'func', b: [{ eq: 'f(x) = 3x − 2  →  f(4) = 3 · 4 − 2 = 10' }, 'Cada x tiene **un único** valor de y', { warn: 'Si un mismo x da dos valores de y, **no es función**.' }],
        s: ['Piensa en una función como una máquina: entra un número, sale otro.', 'Si f de equis es tres equis menos dos, al entrar el cuatro sale tres por cuatro menos dos, o sea, diez. Eso se escribe f de cuatro igual diez.', 'La condición para que algo sea función es que cada valor de equis tenga un único resultado.', 'Si a un mismo equis le corresponden dos valores distintos de y, ya no es una función.'] },
      { h: 'f(x) = mx + n', ic: 'chart', b: [{ plot: { f: [x => 2 * x + 1], x: [-3, 3], y: [-4, 7], pts: [[0, 1, 'n = 1'], [1, 3, '']], cap: 'y = 2x + 1: sube 2 por cada 1 que avanza' } }, { two: [['m: pendiente', 'Cuánto sube y por cada unidad de x'], ['n: coeficiente de posición', 'Dónde corta el eje y']] }, { two: [['Lineal', 'n = 0 → pasa por el origen'], ['Afín', 'n ≠ 0']] }],
        s: ['Las funciones lineales y afines tienen la forma f de equis igual eme equis más ene, y su gráfico es una recta.', 'Mira la recta y igual dos equis más uno. Corta el eje y en uno, y por cada unidad que avanza hacia la derecha, sube dos.', 'Eme es la pendiente: cuánto sube o baja y por cada unidad que avanza equis. Ene es el coeficiente de posición: el punto donde la recta corta el eje y.', 'Si ene es cero, la función se llama lineal y pasa por el origen. Si ene no es cero, se llama afín.'] },
      { h: 'El signo de la pendiente', ic: 'func', b: [{ plot: { f: [x => 1.5 * x + 1, x => -x + 3], x: [-3, 4], y: [-3, 7], cap: 'Lima: m > 0, creciente · Blanca: m < 0, decreciente' } }, { two: [['m > 0', 'Creciente ↗'], ['m < 0', 'Decreciente ↘']] }, 'm = 0 → recta **horizontal**, como y = 7'],
        s: ['La pendiente también indica hacia dónde va la recta.', 'En este gráfico, la recta lima tiene pendiente positiva y la blanca, negativa.', 'Si eme es positiva, la función es creciente: cuando equis aumenta, y también aumenta. Si eme es negativa, es decreciente.', 'Y si eme es cero, la recta es horizontal, como y igual siete.'] },
      { h: 'Pendiente entre dos puntos', ic: 'calc', b: [{ eq: 'm = (y₂ − y₁) / (x₂ − x₁)' }, { eq: '(1, 2) y (3, 8)  →  m = (8 − 2)/(3 − 1) = 3' }, { eq: 'Recta por (2, 5) y (4, 9): m = 2 → 5 = 2 · 2 + n → n = 1 → y = 2x + 1' }, { q: '¿Dónde corta la recta y = 3x − 6 al eje x?', o: ['(2, 0)', '(−2, 0)', '(0, −6)', '(6, 0)'], e: 'En el eje x, y = 0: 3x − 6 = 0 → x = 2.' }],
        s: ['Si conoces dos puntos, puedes calcular la pendiente.', 'Es la diferencia de las y dividida por la diferencia de las equis.', 'Entre el punto uno coma dos y el punto tres coma ocho, la pendiente es ocho menos dos, partido por tres menos uno: seis partido por dos, que es tres.', 'Y para la ecuación completa, calculas la pendiente y luego reemplazas un punto para encontrar ene. Por los puntos dos coma cinco y cuatro coma nueve, la pendiente es dos, y al reemplazar el primer punto, ene vale uno.', 'Ahora una pregunta sobre los cortes con los ejes.'] },
      { h: 'Paralelas y perpendiculares', ic: 'grid', b: [{ two: [['Paralelas', 'Misma pendiente', 'y = 2x + 1 e y = 2x − 4'], ['Perpendiculares', 'm₁ · m₂ = −1', 'y = 3x + 1 e y = −x/3 + 2']] }, { tip: 'Para leer la pendiente, primero **despeja y**: 3x − 2y = 8 → y = (3/2)x − 4' }],
        s: ['Ahora, la relación entre dos rectas.', 'Dos rectas son paralelas si tienen la misma pendiente: y igual dos equis más uno, e y igual dos equis menos cuatro, nunca se cortan. Y son perpendiculares si el producto de sus pendientes es menos uno: tres por menos un tercio da menos uno.', 'Un consejo: si la ecuación no está despejada, como tres equis menos dos y igual ocho, primero despeja y para leer la pendiente. Aquí queda tres medios.'] },
      { h: 'Modelar con rectas', ic: 'target', b: [{ ex: 'Un taxi cobra **$400 fijos** más **$150 por cada 100 m**.' }, { eq: 'C(t) = 150t + 400', n: 'n = cargo fijo · m = costo por tramo' }, { ex: 'Un auto de $12.000.000 pierde $1.500.000 por año: V(t) = 12.000.000 − 1.500.000t' }],
        s: ['Las funciones afines modelan muchas situaciones reales.', 'Un taxi cobra cuatrocientos pesos fijos más ciento cincuenta por cada tramo de cien metros.', 'El costo es ciento cincuenta por te, más cuatrocientos. El cargo fijo es el coeficiente de posición, y el costo por tramo es la pendiente.', 'Lo mismo con la depreciación: un auto de doce millones que pierde un millón y medio por año tiene un valor de doce millones menos un millón y medio por te. Aquí la pendiente es negativa, porque el valor disminuye.'] },
      { h: 'Comparar dos planes', ic: 'scale', b: [{ plot: { f: [x => 10 + 0.05 * x, x => 0.2 * x], x: [0, 120], y: [0, 24], pts: [[66.7, 13.3, 'se cruzan']], cap: 'Lima: plan A (10.000 + 50m) · Blanca: plan B (200m), en miles' } }, { eq: '10.000 + 50m < 200m  →  m > 66,7' }, { q: 'Según el gráfico, ¿cuál plan conviene para 30 minutos?', o: ['El plan B', 'El plan A', 'Cuestan lo mismo', 'No se puede saber'], e: 'Antes del cruce, la recta blanca (plan B) está más abajo: es más barato.' }],
        s: ['Un clásico de la PAES: comparar dos planes.', 'El plan A cobra diez mil pesos fijos más cincuenta por minuto. El plan B cobra doscientos por minuto, sin cargo fijo. Las rectas se cruzan cerca de los sesenta y siete minutos.', 'Planteando la desigualdad, el plan A es más barato cuando diez mil más cincuenta eme es menor que doscientos eme, o sea, cuando eme es mayor que sesenta y seis coma siete minutos.', 'Mira el gráfico y responde.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['f(a): reemplazar x', 'm: pendiente', 'n: corte en y', 'm = Δy/Δx', 'Paralelas: igual m', 'Perpendiculares: m₁·m₂ = −1'] }],
        s: ['Resumen: en f de equis igual eme equis más ene, la pendiente indica cuánto sube la recta y el coeficiente de posición, dónde corta el eje y.', 'Calcula la pendiente con dos puntos, recuerda las condiciones de paralelas y perpendiculares, y usa las rectas para modelar costos y tarifas. ¡A practicar!'] },
    ],
  });

  RB.video('v-m1h', {
    u: 'm1h', title: 'Ecuación y función cuadrática', desc: 'Factorizar, fórmula general, discriminante, parábola, vértice y problemas de máximos.',
    sc: [
      { h: 'Ecuación y función cuadrática', sub: 'La parábola y sus secretos', b: [{ tags: ['Factorizar', 'Fórmula general', 'Discriminante', 'Concavidad', 'Vértice', 'Máximos y mínimos'] }],
        s: ['Hola. En este video vamos a dominar lo cuadrático: cómo resolver ecuaciones de segundo grado y cómo leer una parábola.', 'Al final verás que muchos problemas de máximos y mínimos, como la altura máxima de una pelota o la ganancia máxima de una empresa, se resuelven encontrando el vértice.'] },
      { h: 'Ecuaciones incompletas', ic: 'calc', b: [{ eq: 'x² − 9 = 0  →  x² = 9  →  x = ±3' }, { eq: 'x² − 5x = 0  →  x(x − 5) = 0  →  x = 0 o x = 5' }, { warn: 'Nunca dividas por x: perderías la solución x = 0.' }],
        s: ['Partamos por las ecuaciones incompletas, que son las más rápidas.', 'Si falta el término con equis, como en equis cuadrado menos nueve igual cero, despejas: equis cuadrado es nueve, y equis es tres o menos tres. No olvides la solución negativa.', 'Si falta el término libre, como en equis cuadrado menos cinco equis igual cero, factorizas por equis: equis por equis menos cinco igual cero. Las soluciones son cero y cinco.', 'Un error muy común es dividir por equis. Si lo haces, pierdes la solución cero.'] },
      { h: 'Factorizar el trinomio', ic: 'list', b: [{ eq: 'x² − 7x + 10 = 0  →  (x − 2)(x − 5) = 0' }, 'Si un producto es cero, **algún factor es cero**: x = 2 o x = 5', { tip: 'Busca dos números: **multiplicados** dan c y **sumados** dan b.' }, { q: '¿Cuáles son las soluciones de x² + 2x − 15 = 0?', o: ['x = 3 y x = −5', 'x = −3 y x = 5', 'x = 5 y x = 3', 'x = −15 y x = 1'], e: 'Buscamos dos números que multiplicados den −15 y sumados den 2: 5 y −3. Entonces (x + 5)(x − 3) = 0.' }],
        s: ['Cuando la ecuación está completa, primero intenta factorizar.', 'Equis cuadrado menos siete equis más diez se factoriza como equis menos dos por equis menos cinco.', 'Y si un producto es cero, algún factor tiene que ser cero. Entonces equis vale dos o cinco.', 'Recuerda el truco: dos números que multiplicados den el término libre y sumados den el coeficiente de equis. Aquí menos dos y menos cinco: multiplicados dan diez y sumados, menos siete.', 'Prueba tú con esta.'] },
      { h: 'Fórmula general y discriminante', ic: 'sigma', b: [{ eq: 'x = (−b ± √(b² − 4ac)) / 2a' }, { eq: '2x² − 3x − 2 = 0  →  Δ = 9 + 16 = 25  →  x = (3 ± 5)/4  →  x = 2 o x = −1/2' }, { two: [['Δ > 0', 'Dos soluciones reales distintas'], ['Δ = 0', 'Una solución real (doble)']] }, { two: [['Δ < 0', 'No hay soluciones reales'], ['Δ = b² − 4ac', 'Se calcula antes de todo']] }],
        s: ['Si no se puede factorizar fácilmente, usa la fórmula general.', 'Equis igual menos b más o menos la raíz de b cuadrado menos cuatro a c, todo partido por dos a.', 'Por ejemplo, en dos equis cuadrado menos tres equis menos dos igual cero: b cuadrado menos cuatro a c es nueve más dieciséis, veinticinco. Su raíz es cinco. Entonces equis es tres más o menos cinco, partido por cuatro: dos, o menos un medio.', 'Lo que está dentro de la raíz se llama discriminante, y te dice cuántas soluciones hay. Si es positivo, hay dos soluciones reales distintas. Si es cero, hay una sola solución, que se llama doble.', 'Y si es negativo, no hay soluciones reales, porque no existe la raíz de un negativo.'] },
      { h: 'La parábola', ic: 'func', b: [{ plot: { f: [x => x * x - 4 * x + 3], x: [-1, 5], y: [-2, 8], pts: [[0, 3, 'c = 3'], [1, 0, ''], [3, 0, ''], [2, -1, 'vértice']], cap: 'f(x) = x² − 4x + 3' } }, { two: [['a > 0', 'Abre hacia arriba: tiene mínimo'], ['a < 0', 'Abre hacia abajo: tiene máximo']] }, { two: [['Corte con eje y', '(0, c)'], ['Cortes con eje x', 'Soluciones de f(x) = 0']] }],
        s: ['El gráfico de una función cuadrática es una parábola.', 'Mira f de equis igual equis cuadrado menos cuatro equis más tres. Corta el eje y en tres, corta el eje equis en uno y en tres, y tiene su punto más bajo en dos coma menos uno.', 'El signo de a decide la forma: si a es positivo, la parábola abre hacia arriba y tiene un mínimo. Si a es negativo, abre hacia abajo y tiene un máximo.', 'El corte con el eje y siempre es el término libre, c. Y los cortes con el eje equis son las soluciones de la ecuación f de equis igual cero.'] },
      { h: 'El vértice', ic: 'target', b: [{ eq: 'xᵥ = −b / 2a', n: 'También es el eje de simetría' }, { eq: 'f(x) = x² − 4x + 3  →  xᵥ = 4/2 = 2  →  f(2) = −1  →  V = (2, −1)' }, { q: '¿Cuál es el valor mínimo de f(x) = x² + 6x + 10?', o: ['1', '10', '−3', '6'], e: 'xᵥ = −6/2 = −3 y f(−3) = 9 − 18 + 10 = 1.' }],
        s: ['El vértice es el punto más importante de la parábola.', 'Su coordenada equis es menos b partido por dos a, y por esa recta vertical pasa el eje de simetría.', 'En el ejemplo, menos b es cuatro, partido por dos: el vértice está en equis igual dos. Reemplazando, f de dos es menos uno. El vértice es dos coma menos uno.', 'Ahora encuentra tú un valor mínimo.'] },
      { h: 'Máximos en la vida real', ic: 'spark', b: [{ plot: { f: [t => -5 * t * t + 20 * t], x: [0, 4.2], y: [0, 24], pts: [[2, 20, 'altura máxima'], [4, 0, 'cae al suelo']], cap: 'h(t) = −5t² + 20t' } }, { eq: 'tᵥ = −20 / (2 · (−5)) = 2 s  →  h(2) = 20 m' }, { eq: 'Vuelve al suelo: −5t² + 20t = 0  →  t = 0 o t = 4 s' }],
        s: ['Los problemas de máximos son el uso estrella de la parábola.', 'Una pelota lanzada hacia arriba tiene altura h de te igual menos cinco te cuadrado más veinte te.', 'El máximo está en el vértice: te igual menos veinte partido por menos diez, o sea, dos segundos. La altura máxima es h de dos, veinte metros.', 'Y para saber cuándo vuelve al suelo, igualas la altura a cero: te por menos cinco te más veinte igual cero. Las soluciones son cero, cuando se lanza, y cuatro segundos, cuando cae.'] },
      { h: 'Áreas máximas', ic: 'grid', b: [{ ex: 'Con 40 m de reja, ¿qué rectángulo encierra la **mayor área**?' }, { eq: 'Lados x y (20 − x)  →  A(x) = x(20 − x) = −x² + 20x' }, { sol: 'xᵥ = −20 / (−2) = 10 → un **cuadrado de 10 m × 10 m**, con área 100 m²' }],
        s: ['Otro clásico de la prueba son las áreas máximas.', 'Con cuarenta metros de reja, ¿qué rectángulo encierra la mayor área?', 'Si un lado mide equis, el otro mide veinte menos equis, porque el perímetro es cuarenta. El área es equis por veinte menos equis.', 'Es una parábola que abre hacia abajo, con vértice en equis igual diez. Así que el rectángulo de mayor área es un cuadrado de diez por diez, con cien metros cuadrados.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['No dividas por x', 'Factoriza primero', 'Δ = b² − 4ac', 'a > 0: mínimo', 'Corte en y: c', 'Vértice: −b/2a'] }],
        s: ['Resumen: en las ecuaciones cuadráticas, factoriza si puedes y usa la fórmula general si no. El discriminante te dice cuántas soluciones hay.', 'En la parábola, a decide si abre hacia arriba o hacia abajo, c es el corte con el eje y, y el vértice en menos b partido por dos a resuelve los problemas de máximos y mínimos. ¡A practicar!'] },
    ],
  });
})();
