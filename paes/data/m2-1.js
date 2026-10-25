// Matemática M2 (1): números reales, potencias de exponente racional y raíces; logaritmos.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Reales, potencias racionales y raíces ----------
  RB.unit('m2a', {
    name: 'Números reales y potencias racionales', desc: 'Irracionales, orden en los reales, potencias de exponente racional y racionalización.', ic: 'sigma', vid: 'v-m2a', area: 'Números',
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
    name: 'Logaritmos', desc: 'Definición, propiedades, cambio de base y ecuaciones exponenciales y logarítmicas.', ic: 'func', vid: 'v-m2b', area: 'Números',
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
  RB.video('v-m2a', {
    u: 'm2a', title: 'Reales, potencias racionales y raíces', desc: 'Irracionales, exponentes fraccionarios, conjugados y racionalización.',
    sc: [
      { h: 'Números reales y potencias racionales', sub: 'El lado más fino de los números', b: [{ tags: ['Irracionales', 'Orden', 'Exponente racional', 'Conjugado', 'Racionalizar'] }],
        s: ['Hola. Este es el primer video de M2. Vamos a profundizar en los números reales: los irracionales, cómo compararlos, las potencias con exponente fraccionario y la racionalización con conjugados.', 'Si viste los videos de M1 sobre potencias y raíces, aquí damos el siguiente paso.'] },
      { h: 'Los conjuntos numéricos', ic: 'sigma', b: [{ eq: 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ' }, { two: [['Racionales ℚ', 'Fracciones, decimales finitos y periódicos', '3/11 · 0,1212… · −4'], ['Irracionales 𝕀', 'Infinitos decimales sin período', '√2 · √7 · π']] }, { warn: '√16 = 4 y √0,25 = 0,5 parecen irracionales, pero **son racionales**.' }],
        s: ['Partamos por el mapa de los números.', 'Los naturales están dentro de los enteros, los enteros dentro de los racionales, y los racionales dentro de los reales.', 'Los racionales son los que se escriben como fracción: decimales finitos o periódicos. Los irracionales tienen infinitos decimales que nunca se repiten, como raíz de dos, raíz de siete o pi. Juntos forman los reales.', 'Ojo con las trampas: raíz de dieciséis es cuatro, y raíz de cero coma veinticinco es cero coma cinco. Tienen raíz, pero son racionales.'] },
      { h: 'Operar racionales e irracionales', ic: 'calc', b: [{ two: [['Racional + irracional', 'Siempre irracional', '1 + √3'], ['Irracional · irracional', 'Puede ser racional', '√2 · √2 = 2']] }, { eq: '(√3 + 1)(√3 − 1) = 3 − 1 = 2', n: 'Conjugados: el resultado es racional' }, { q: '¿Cuál de estos números es racional?', o: ['√0,25', '√2', 'π', '√3 + 1'], e: '√0,25 = 0,5, que es racional.' }],
        s: ['¿Qué pasa al operar estos números?', 'Un racional más un irracional da siempre un irracional. Pero dos irracionales multiplicados pueden dar un racional: raíz de dos por raíz de dos es dos. Por eso, afirmaciones como el producto de irracionales siempre es irracional son falsas.', 'Un caso muy útil son los conjugados: raíz de tres más uno, por raíz de tres menos uno, es tres menos uno, o sea, dos. Un número racional.', 'Una rápida.'] },
      { h: 'Comparar reales', ic: 'list', b: [{ eq: 'π ≈ 3,14 · √10 ≈ 3,16 · 3,2' }, { eq: '2√3 = √12  vs  3√2 = √18  →  3√2 es mayor', n: 'Mete el coeficiente dentro de la raíz' }, { tip: 'Para comparar raíces: elévalas al cuadrado o ponlas con el mismo índice.' }],
        s: ['Para comparar números reales, aproxima o transforma.', 'Pi es aproximadamente tres coma catorce, raíz de diez es aproximadamente tres coma dieciséis, y tres coma dos es mayor que ambos.', 'Para comparar dos raíces con coeficientes, como dos raíz de tres y tres raíz de dos, mete el coeficiente dentro de la raíz: dos raíz de tres es raíz de doce, y tres raíz de dos es raíz de dieciocho. Gana tres raíz de dos.', 'En general, elevar al cuadrado o igualar los índices hace la comparación muy fácil.'] },
      { h: 'Exponente racional', ic: 'bolt', b: [{ eq: 'a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ', n: 'El denominador es el índice de la raíz' }, { eq: '8^(2/3) = (∛8)² = 2² = 4' }, { eq: '27^(−1/3) = 1/∛27 = 1/3' }, { eq: '∛(a²) · ∛a = a^(2/3 + 1/3) = a' }],
        s: ['Ahora, las potencias de exponente racional.', 'A elevado a eme partido por ene es la raíz enésima de a a la eme. El denominador del exponente es el índice de la raíz, y el numerador es la potencia.', 'Ocho elevado a dos tercios: primero la raíz cúbica de ocho, que es dos, y luego al cuadrado: cuatro. Conviene sacar la raíz primero, porque trabajas con números más chicos.', 'Con exponente negativo, aplicas el inverso: veintisiete elevado a menos un tercio es uno partido por raíz cúbica de veintisiete, o sea, un tercio.', 'Y se aplican todas las propiedades: raíz cúbica de a cuadrado por raíz cúbica de a es a elevado a dos tercios más un tercio, o sea, a.'] },
      { h: 'Racionalizar con conjugado', ic: 'check', b: [{ eq: '1/(√5 − √3) · (√5 + √3)/(√5 + √3) = (√5 + √3)/(5 − 3) = (√5 + √3)/2' }, { tip: 'Si abajo hay una suma o resta con raíces, multiplica por el **conjugado**.' }, { q: 'Al racionalizar 2/(√3 + 1) se obtiene:', o: ['√3 − 1', '√3 + 1', '(√3 − 1)/2', '2√3 − 2'], e: 'Multiplicando por (√3 − 1): 2(√3 − 1)/(3 − 1) = √3 − 1.' }],
        s: ['En M2 aparece la racionalización con binomios.', 'Si tienes uno partido por raíz de cinco menos raíz de tres, multiplicas arriba y abajo por el conjugado, raíz de cinco más raíz de tres. Abajo queda cinco menos tres, que es dos, y arriba, raíz de cinco más raíz de tres.', 'La regla: si en el denominador hay una suma o resta con raíces, multiplica por el conjugado, que es la misma expresión con el signo del medio cambiado.', 'Practica con esta.'] },
      { h: 'Raíces dobles', ic: 'spark', b: [{ eq: '√(3 + 2√2) = √2 + 1', n: 'Porque (√2 + 1)² = 2 + 2√2 + 1' }, { eq: '(√2 + √8)² = (3√2)² = 18' }, { warn: 'La raíz no se reparte en la suma: √(a + b) ≠ √a + √b' }],
        s: ['Un tipo de pregunta más difícil son las raíces dobles.', 'Raíz de tres más dos raíz de dos es igual a raíz de dos más uno. ¿Por qué? Porque si elevas raíz de dos más uno al cuadrado, da dos más dos raíz de dos más uno, o sea, tres más dos raíz de dos. La estrategia es probar elevando las alternativas al cuadrado.', 'También conviene simplificar antes de operar: raíz de dos más raíz de ocho es raíz de dos más dos raíz de dos, tres raíz de dos. Al cuadrado: dieciocho.', 'Y nunca olvides que la raíz no se reparte en una suma.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Irracional: sin período', '√2 · √2 = 2', 'a^(m/n) = ⁿ√aᵐ', 'Raíz primero', 'Conjugado', 'Prueba al cuadrado'] }],
        s: ['Resumen: los irracionales tienen decimales infinitos sin período, y operar con ellos puede dar racionales. El exponente fraccionario es una raíz: el denominador es el índice.', 'Para racionalizar binomios, usa el conjugado, y para raíces dobles, prueba elevando al cuadrado. ¡A practicar!'] },
    ],
  });

  RB.video('v-m2b', {
    u: 'm2b', title: 'Logaritmos sin miedo', desc: 'Qué es un logaritmo, propiedades, cambio de base y ecuaciones exponenciales.',
    sc: [
      { h: 'Logaritmos', sub: 'El logaritmo es un exponente', b: [{ tags: ['Definición', 'Base 10', 'Propiedades', 'Cambio de base', 'Ecuaciones', 'Aplicaciones'] }],
        s: ['Hola. Los logaritmos asustan a mucha gente, pero tienen una sola idea central: un logaritmo es un exponente.', 'Si entiendes eso, el resto son propiedades que se derivan de las potencias. Veremos la definición, las propiedades, el cambio de base y cómo resolver ecuaciones exponenciales y logarítmicas.'] },
      { h: 'La definición', ic: 'func', b: [{ eq: 'log_b a = c  ⟺  b^c = a' }, { eq: 'log₂ 8 = 3  porque  2³ = 8' }, { eq: 'log 1.000 = 3  (base 10)' }, { tip: 'Pregúntate: **¿a qué número elevo la base para obtener a?**' }],
        s: ['Empecemos por la definición, que es lo único que de verdad necesitas memorizar.', 'Logaritmo en base b de a es igual a c, significa que b elevado a c es igual a a.', 'Por ejemplo, logaritmo en base dos de ocho es tres, porque dos al cubo es ocho.', 'Cuando no se escribe la base, se entiende que es diez. Logaritmo de mil es tres, porque diez al cubo es mil.', 'Para calcular cualquier logaritmo, hazte siempre la misma pregunta: ¿a qué número elevo la base para obtener el número?'] },
      { h: 'Casos especiales', ic: 'flag', b: [{ two: [['log_b 1 = 0', 'Porque b⁰ = 1'], ['log_b b = 1', 'Porque b¹ = b']] }, { two: [['log₂ (1/16) = −4', 'Fracciones: exponentes negativos'], ['log 0,01 = −2', '10⁻² = 0,01']] }, { warn: 'No existe el logaritmo de 0 ni de números negativos, y la base debe ser positiva y distinta de 1.' }],
        s: ['Hay casos que conviene memorizar.', 'El logaritmo de uno siempre es cero, en cualquier base, porque cualquier número elevado a cero da uno. Y el logaritmo de la base es uno.', 'Para fracciones y decimales menores que uno, el logaritmo es negativo: logaritmo en base dos de un dieciseisavo es menos cuatro, y logaritmo de cero coma cero uno es menos dos.', 'Y recuerda: no existe el logaritmo de cero ni de números negativos. Por eso, en una expresión como logaritmo de equis menos tres, equis tiene que ser mayor que tres.'] },
      { h: 'Propiedades', ic: 'list', b: [{ eq: 'log(a · b) = log a + log b' }, { eq: 'log(a / b) = log a − log b' }, { eq: 'log(aⁿ) = n · log a' }, { warn: 'log(a + b) **no** se puede separar.' }],
        s: ['Las propiedades vienen directamente de las potencias.', 'El logaritmo de un producto es la suma de los logaritmos: logaritmo de dos más logaritmo de cinco es logaritmo de diez, o sea, uno.', 'El logaritmo de un cociente es la resta: logaritmo en base tres de cincuenta y cuatro menos logaritmo en base tres de dos es logaritmo en base tres de veintisiete, o sea, tres.', 'Y el logaritmo de una potencia baja el exponente multiplicando: logaritmo de diez a la quinta es cinco.', 'Cuidado: no existe una propiedad para el logaritmo de una suma. Es una trampa clásica.'] },
      { h: 'Usar valores conocidos', ic: 'calc', b: [{ eq: 'log 2 ≈ 0,30   log 3 ≈ 0,48' }, { eq: 'log 6 = log 2 + log 3 ≈ 0,78' }, { eq: 'log 5 = log(10/2) = 1 − 0,30 = 0,70' }, { q: 'Si log 2 ≈ 0,30, ¿cuánto es aproximadamente log 8?', o: ['0,90', '2,4', '0,60', '0,08'], e: 'log 8 = log 2³ = 3 · log 2 ≈ 0,90.' }],
        s: ['La PAES suele darte valores aproximados para que calcules otros.', 'Si logaritmo de dos es cero coma treinta y logaritmo de tres es cero coma cuarenta y ocho,', 'entonces logaritmo de seis, que es dos por tres, es la suma: cero coma setenta y ocho.', 'Y logaritmo de cinco se calcula como logaritmo de diez partido por dos: uno menos cero coma treinta, o sea, cero coma setenta.', 'Calcula tú.'] },
      { h: 'Cambio de base', ic: 'replay', b: [{ eq: 'log_b a = log a / log b' }, { eq: 'log₈ 2 = log 2 / log 8 = log 2 / (3 log 2) = 1/3' }, { tip: 'También puedes pensar: 8^(1/3) = 2.' }],
        s: ['El cambio de base permite escribir cualquier logaritmo en base diez.', 'Logaritmo en base b de a es logaritmo de a partido por logaritmo de b.', 'Por ejemplo, logaritmo en base ocho de dos es logaritmo de dos partido por logaritmo de ocho. Como ocho es dos al cubo, queda logaritmo de dos partido por tres veces logaritmo de dos: un tercio.', 'O, directamente, ocho elevado a un tercio es dos.'] },
      { h: 'Ecuaciones exponenciales', ic: 'target', b: [{ eq: '3^(x + 1) = 27 = 3³  →  x + 1 = 3  →  x = 2', n: 'Iguala las bases' }, { eq: '4ˣ = 8  →  2^(2x) = 2³  →  x = 3/2' }, { eq: 'log₂(x − 1) = 3  →  x − 1 = 2³  →  x = 9', n: 'Aplica la definición' }],
        s: ['Para resolver ecuaciones exponenciales, la estrategia es igualar las bases.', 'Tres elevado a equis más uno es veintisiete. Como veintisiete es tres al cubo, los exponentes deben ser iguales: equis más uno es tres, y equis vale dos.', 'Si las bases son distintas, busca una base común: cuatro a la equis es ocho se escribe como dos a la dos equis igual dos al cubo. Entonces dos equis es tres, y equis vale tres medios.', 'Y para ecuaciones logarítmicas, aplica la definición: logaritmo en base dos de equis menos uno igual tres significa que equis menos uno es dos al cubo, o sea, ocho. Equis vale nueve.'] },
      { h: 'Logaritmos en el mundo real', ic: 'globe', b: [{ two: [['pH', 'pH = −log[H⁺]', '[H⁺] = 10⁻³ → pH 3'], ['Sismos', 'Cada grado = 10 veces más amplitud', 'Magnitud 7 vs. 5 → 100 veces']] }, { q: 'Una población se duplica cada año. ¿En cuántos años será 32 veces la inicial?', o: ['5', '16', '6', '32'], e: '2ᵗ = 32 = 2⁵, así que t = 5 años.' }],
        s: ['Los logaritmos aparecen en escalas que miden cosas muy grandes o muy pequeñas.', 'El pH es menos el logaritmo de la concentración de iones hidrógeno: con diez a la menos tres, el pH es tres. Y en la escala sísmica, cada grado más significa diez veces más amplitud: un sismo de magnitud siete tiene cien veces la amplitud de uno de magnitud cinco.', 'Y para crecimiento: resuelve esta.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['log = exponente', 'log_b 1 = 0', 'Producto → suma', 'Cociente → resta', 'Potencia → baja', 'Iguala bases'] }],
        s: ['Resumen: un logaritmo es un exponente. El producto se transforma en suma, el cociente en resta y la potencia baja multiplicando. No existe el logaritmo de cero ni de negativos.', 'En las ecuaciones, iguala las bases o aplica la definición. ¡A practicar!'] },
    ],
  });
})();
