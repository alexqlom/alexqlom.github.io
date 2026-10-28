// Matemática M1 (4): función lineal y afín; ecuación y función cuadrática.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Función lineal y afín ----------
  RB.unit('m1g', {
    name: 'Función lineal y afín', desc: 'Concepto de función, pendiente, coeficiente de posición, ecuación de la recta y modelación.', ic: 'func', area: 'Funciones',
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
    name: 'Ecuación y función cuadrática', desc: 'Resolver ecuaciones de segundo grado, discriminante, parábola, vértice y problemas de máximos.', ic: 'func', area: 'Funciones',
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
})();
