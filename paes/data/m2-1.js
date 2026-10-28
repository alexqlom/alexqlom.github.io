// Matemática M2 (1): números reales, potencias de exponente racional y raíces; logaritmos.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Reales, potencias racionales y raíces ----------
  RB.unit('m2a', {
    name: 'Números reales y potencias racionales', desc: 'Irracionales, orden en los reales, potencias de exponente racional y racionalización.', ic: 'sigma', area: 'Números',
    lessons: [
      {
        n: 'Racionales e irracionales', ic: 'sigma', items: [
          { t: 'info', ic: 'sigma', title: 'Los reales', txt: 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. Los **irracionales** tienen infinitos decimales **sin período**: √2, √3, π. Racionales e irracionales juntos forman los reales.' },
          M('¿Cuál de estos números es irracional?', ['√5', '√16', '0,333...', '22/7'], '√16 = 4; 0,333... = 1/3; 22/7 es una fracción. √5 no es exacta ni periódica.'),
          M('¿Cuál de estos números es racional?', ['√0,25', '√2', 'π', '√3 + 1'], '√0,25 = 0,5 = 1/2.'),
          T('La suma de un número racional y uno irracional es siempre irracional.', true, 'Si fuera racional, el irracional se podría despejar como resta de racionales.'),
          T('El producto de dos números irracionales es siempre irracional.', false, '√2 · √2 = 2, que es racional.'),
          M('(√3 + 1)(√3 − 1) =', ['2', '4', '3', '√3'], 'Suma por diferencia: 3 − 1 = 2.'),
          M('Si a = √10, b = 3,2 y c = π, ¿cuál es el orden correcto?', ['c < a < b', 'a < b < c', 'b < a < c', 'c < b < a'], 'π ≈ 3,14; √10 ≈ 3,16; b = 3,2.'),
          M('Entre 3 y 4 hay:', ['Infinitos números reales', 'Ningún número irracional', 'Solo 9 números decimales', 'Un único número irracional'], 'Hay infinitos racionales e infinitos irracionales entre dos reales distintos.'),
          S('Clasifica cada número', ['Racional', 'Irracional'], [['√9', 0], ['√7', 1], ['0,121212...', 0], ['π', 1], ['3/11', 0], ['√2/2', 1], ['−4', 0], ['1 + √3', 1]], 'Las raíces no exactas y π son irracionales; los periódicos son racionales.'),
          M('El valor de |−5| + |3 − 8| es:', ['10', '0', '−10', '6'], '|−5| = 5 y |−5| = 5.'),
          M('Si a = √2, ¿cuál es el valor de a⁴ − a²?', ['2', '4', '6', '0'], 'a² = 2 y a⁴ = 4.'),
        ],
      },
      {
        n: 'Potencias de exponente racional', ic: 'bolt', items: [
          { t: 'info', ic: 'bolt', title: 'Exponente fraccionario', txt: 'a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ. Por ejemplo, a^(1/2) = √a y 8^(2/3) = (∛8)² = 4. Se aplican las mismas propiedades de las potencias.' },
          M('8^(2/3) =', ['4', '16/3', '2', '64'], '(∛8)² = 2² = 4.'),
          M('16^(3/4) =', ['8', '12', '4', '64'], '(⁴√16)³ = 2³ = 8.'),
          M('27^(−1/3) =', ['1/3', '−3', '−9', '1/9'], 'Exponente negativo: 1/∛27 = 1/3.'),
          M('√(x³) escrito como potencia es:', ['x^(3/2)', 'x^(2/3)', 'x⁶', 'x^(1/6)'], 'El índice de la raíz va en el denominador.'),
          M('∛(a²) · ∛a =', ['a', 'a^(2/9)', 'a^(5/3)', 'a³'], 'a^(2/3) · a^(1/3) = a^(3/3) = a.'),
          M('(x^(1/2))⁴ =', ['x²', 'x^(9/2)', 'x^(1/8)', 'x⁴'], '1/2 · 4 = 2.'),
          N('Calcula 25^(1/2) + 32^(1/5)', 7, '', '√25 = 5 y ⁵√32 = 2.'),
          M('9^(1/2) · 9^(−1) =', ['1/3', '3', '9', '−3'], '3 · 1/9 = 1/3.'),
          T('a^(1/n) es la raíz enésima de a.', true, 'Por definición.'),
          M('√(√16) =', ['2', '4', '8', '√2'], '√16 = 4 y √4 = 2. También: 16^(1/4).'),
        ],
      },
      {
        n: 'Raíces y racionalización', ic: 'tri', items: [
          M('Al racionalizar 1/(√5 − √3) se obtiene:', ['(√5 + √3)/2', '(√5 − √3)/2', '√5 + √3', '(√5 + √3)/8'], 'Se multiplica por el conjugado: (√5 + √3)/(5 − 3).'),
          M('Al racionalizar 2/(√3 + 1) se obtiene:', ['√3 − 1', '√3 + 1', '(√3 − 1)/2', '2√3 − 2'], '2(√3 − 1)/(3 − 1) = √3 − 1.'),
          M('(√2 + √8)² =', ['18', '10', '16', '6'], '√8 = 2√2, así que √2 + √8 = 3√2 y (3√2)² = 18.'),
          M('√(3 + 2√2) es igual a:', ['√2 + 1', '√3 + √2', '3 + √2', '2 + √3'], '(√2 + 1)² = 2 + 2√2 + 1 = 3 + 2√2.'),
          M('Si x = √2 − 1, entonces 1/x =', ['√2 + 1', '√2 − 1', '1 − √2', '2√2'], '1/(√2 − 1) · (√2 + 1)/(√2 + 1) = (√2 + 1)/1.'),
          M('∛2 · √2 =', ['2^(5/6)', '2^(1/6)', '∛4', '2'], '2^(1/3 + 1/2) = 2^(5/6).'),
          M('√2,25 es igual a:', ['1,5', '1,05', '0,15', '2,5'], '1,5² = 2,25.'),
          T('√a + √b = √(a + b) para todo a y b positivos.', false, '√9 + √16 = 7, pero √25 = 5.'),
          M('¿Cuál es mayor: 2√3 o 3√2?', ['3√2', '2√3', 'Son iguales', 'No se puede saber'], '2√3 = √12 y 3√2 = √18.'),
          N('Calcula (√7 + √2)(√7 − √2)', 5, '', '7 − 2 = 5.'),
        ],
      },
    ],
  });

  // ---------- Logaritmos ----------
  RB.unit('m2b', {
    name: 'Logaritmos', desc: 'Definición, propiedades, cambio de base y ecuaciones exponenciales y logarítmicas.', ic: 'func', area: 'Números',
    lessons: [
      {
        n: 'Qué es un logaritmo', ic: 'func', items: [
          { t: 'info', ic: 'func', title: 'Definición', txt: 'log_b a = c significa **b^c = a**: el logaritmo es el **exponente** al que hay que elevar la base. Si no se escribe la base, es 10: log 1.000 = 3.' },
          M('log₂ 8 =', ['3', '4', '1/3', '16'], '2³ = 8.'),
          M('log₃ 81 =', ['4', '27', '3', '1/4'], '3⁴ = 81.'),
          M('log 1.000 =', ['3', '100', '10', '4'], '10³ = 1.000.'),
          M('log₅ 1 =', ['0', '1', '5', 'No existe'], 'Cualquier base elevada a 0 da 1.'),
          M('log₂ (1/16) =', ['−4', '4', '1/4', '−1/4'], '2⁻⁴ = 1/16.'),
          M('log 0,01 =', ['−2', '2', '−1', '0,1'], '10⁻² = 0,01.'),
          M('Si log_x 49 = 2, entonces x =', ['7', '24,5', '2.401', '√2'], 'x² = 49 y la base debe ser positiva.'),
          M('Si log₂ x = 5, entonces x =', ['32', '10', '25', '2,5'], 'x = 2⁵.'),
          T('El logaritmo de un número negativo no existe en los reales.', true, 'Ninguna potencia de base positiva da un resultado negativo.'),
          M('log₄ 2 =', ['1/2', '2', '4', '1/4'], '4^(1/2) = 2.'),
          M('¿Entre qué enteros está log 500?', ['2 y 3', '5 y 6', '50 y 51', '1 y 2'], '100 < 500 < 1.000, así que 2 < log 500 < 3.'),
        ],
      },
      {
        n: 'Propiedades', ic: 'list', items: [
          { t: 'info', ic: 'list', title: 'Propiedades', txt: 'log(a·b) = log a + log b · log(a/b) = log a − log b · log(aⁿ) = n·log a · Cambio de base: log_b a = log a / log b.' },
          M('log 2 + log 5 =', ['1', 'log 7', '10', 'log 25'], 'log(2 · 5) = log 10 = 1.'),
          M('log₃ 54 − log₃ 2 =', ['3', 'log₃ 52', '27', 'log₃ 108'], 'log₃(54/2) = log₃ 27 = 3.'),
          M('log 10⁵ =', ['5', '10', '50', '100.000'], '5 · log 10 = 5.'),
          M('Si log 2 ≈ 0,30, entonces log 8 ≈', ['0,90', '2,4', '0,60', '0,08'], 'log 2³ = 3 · 0,30.'),
          M('Si log 2 ≈ 0,30 y log 3 ≈ 0,48, entonces log 6 ≈', ['0,78', '0,144', '0,18', '1,8'], 'log(2 · 3) = 0,30 + 0,48.'),
          M('Si log 2 ≈ 0,30, entonces log 5 ≈', ['0,70', '0,15', '0,60', '1,5'], 'log 5 = log(10/2) = 1 − 0,30.'),
          M('2 log 3 + log 4 − log 6 =', ['log 6', 'log 7', 'log 30', 'log 3'], 'log 9 + log 4 − log 6 = log(36/6) = log 6.'),
          M('log₂ 32 · log₅ 25 =', ['10', '7', '5', '57'], '5 · 2 = 10.'),
          T('log(a + b) = log a + log b', false, 'La propiedad es para el producto: log(a·b) = log a + log b.'),
          M('Usando cambio de base, log₈ 2 es igual a:', ['1/3', '3', '4', '1/4'], 'log 2 / log 8 = log 2 / (3 log 2) = 1/3.'),
          N('Calcula log₂ 4 + log₂ 8 + log₂ 16', 9, '', '2 + 3 + 4 = 9.'),
        ],
      },
      {
        n: 'Ecuaciones y aplicaciones', ic: 'target', items: [
          M('Resuelve: 2ˣ = 64', ['x = 6', 'x = 32', 'x = 8', 'x = 5'], '64 = 2⁶.'),
          M('Resuelve: 3^(x + 1) = 27', ['x = 2', 'x = 3', 'x = 9', 'x = 26'], '27 = 3³ → x + 1 = 3.'),
          M('Resuelve: 5^(2x) = 125', ['x = 3/2', 'x = 3', 'x = 2/3', 'x = 25'], '125 = 5³ → 2x = 3.'),
          M('Resuelve: log₂(x − 1) = 3', ['x = 9', 'x = 7', 'x = 4', 'x = 8'], 'x − 1 = 2³ = 8.'),
          M('Resuelve: log x + log 4 = 2', ['x = 25', 'x = 96', 'x = 50', 'x = 1/2'], 'log(4x) = 2 → 4x = 100.'),
          M('Resuelve: 4ˣ = 8', ['x = 3/2', 'x = 2', 'x = 2/3', 'x = 1/2'], '2^(2x) = 2³ → 2x = 3.'),
          M('¿Para qué valores de x está definido log(x − 3)?', ['x > 3', 'x ≥ 3', 'x > 0', 'Para todo x'], 'El argumento debe ser positivo: x − 3 > 0.'),
          M('Una población se duplica cada año. ¿Después de cuántos años habrá 32 veces la población inicial?', ['5', '16', '6', '32'], '2ᵗ = 32 → t = 5.'),
          M('El pH se calcula como pH = −log[H⁺]. Si [H⁺] = 10⁻³, el pH es:', ['3', '−3', '0,001', '10'], '−log 10⁻³ = 3.'),
          M('En la escala de Richter, cada grado más significa una amplitud 10 veces mayor. ¿Cuántas veces mayor es la amplitud de un sismo de magnitud 7 que la de uno de magnitud 5?', ['100', '2', '20', '10'], 'Dos grados de diferencia: 10² = 100.'),
          T('La ecuación 2ˣ = −4 no tiene solución real.', true, 'Las potencias de base positiva siempre son positivas.'),
        ],
      },
    ],
  });

  // ---------- Videos ----------

})();
