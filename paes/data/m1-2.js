// Matemática M1 (2): potencias y raíces; expresiones algebraicas, productos notables y factorización.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Potencias y raíces ----------
  RB.unit('m1c', {
    name: 'Potencias y raíces', desc: 'Propiedades de las potencias, exponentes negativos, notación científica y raíces.', ic: 'bolt', vid: 'v-m1c', area: 'Números',
    lessons: [
      {
        n: 'Propiedades de las potencias', ic: 'bolt', items: [
          { t: 'info', ic: 'bolt', title: 'Propiedades clave', txt: 'aᵐ · aⁿ = aᵐ⁺ⁿ · aᵐ : aⁿ = aᵐ⁻ⁿ · (aᵐ)ⁿ = aᵐ·ⁿ · a⁰ = 1 · a⁻ⁿ = 1/aⁿ' },
          M('2³ · 2⁴ =', ['2⁷', '2¹²', '4⁷', '4¹²'], 'Misma base: se suman los exponentes. 3 + 4 = 7.'),
          M('5⁸ : 5⁶ =', ['25', '5¹⁴', '1', '5/3'], 'Misma base: se restan los exponentes. 5² = 25.'),
          M('(3²)³ =', ['3⁶', '3⁵', '9⁵', '3⁸'], 'Potencia de potencia: se multiplican los exponentes.'),
          M('7⁰ + 7¹ =', ['8', '7', '1', '0'], '7⁰ = 1 y 7¹ = 7.'),
          M('2⁻³ =', ['1/8', '−8', '−6', '1/6'], 'Exponente negativo: el inverso. 2⁻³ = 1/2³ = 1/8. Nunca da un número negativo.'),
          M('(2/3)⁻² =', ['9/4', '4/9', '−4/9', '−9/4'], 'Se invierte la fracción y el exponente se hace positivo: (3/2)² = 9/4.'),
          N('Calcula (−3)³', -27, '', '(−3)(−3)(−3) = −27. Exponente impar: conserva el signo negativo.'),
          M('(a³ · a⁻⁵) : a⁻⁴ =', ['a²', 'a⁻⁶', 'a¹²', 'a⁻²'], '3 + (−5) = −2; luego −2 − (−4) = 2.'),
          T('(−2)⁴ es un número negativo.', false, 'Exponente par: (−2)⁴ = 16, positivo.'),
          M('(x²y³)² =', ['x⁴y⁶', 'x⁴y⁵', 'x²y⁶', '2x²y³'], 'Cada factor se eleva al cuadrado: (x²)² = x⁴ e (y³)² = y⁶.'),
          M('3⁻¹ + 3⁻² =', ['4/9', '1/27', '2/9', '−9'], '1/3 + 1/9 = 3/9 + 1/9 = 4/9.'),
        ],
      },
      {
        n: 'Notación científica', ic: 'planet', items: [
          M('300.000 en notación científica es:', ['3 · 10⁵', '3 · 10⁶', '30 · 10⁴', '3 · 10⁻⁵'], 'La coma se mueve 5 lugares: 3 · 10⁵.'),
          M('0,00045 en notación científica es:', ['4,5 · 10⁻⁴', '4,5 · 10⁴', '45 · 10⁻⁵', '4,5 · 10⁻³'], 'La coma se mueve 4 lugares a la derecha: exponente −4.'),
          M('(2 · 10³) · (4 · 10⁵) =', ['8 · 10⁸', '8 · 10¹⁵', '6 · 10⁸', '8 · 10²'], '2 · 4 = 8 y 10³ · 10⁵ = 10⁸.'),
          M('(6 · 10⁷) : (3 · 10²) =', ['2 · 10⁵', '2 · 10⁹', '3 · 10⁵', '2 · 10¹⁴'], '6 : 3 = 2 y 10⁷ : 10² = 10⁵.'),
          M('¿Cuál de estos números es el mayor?', ['2 · 10⁵', '9 · 10⁴', '5 · 10⁻⁶', '10⁵'], '2 · 10⁵ = 200.000; 9 · 10⁴ = 90.000; 10⁵ = 100.000.'),
          M('La distancia de la Tierra al Sol es aproximadamente 1,5 · 10⁸ km. Eso equivale a:', ['150 millones de km', '15 millones de km', '1.500 millones de km', '150 mil km'], '1,5 · 100.000.000 = 150.000.000.'),
          T('25 · 10³ está escrito en notación científica.', false, 'El coeficiente debe estar entre 1 y 10: 2,5 · 10⁴.'),
          M('0,5 · 10⁻³ escrito en notación científica es:', ['5 · 10⁻⁴', '5 · 10⁻²', '5 · 10³', '50 · 10⁻⁵'], '0,5 = 5 · 10⁻¹; entonces 5 · 10⁻¹ · 10⁻³ = 5 · 10⁻⁴.'),
          N('¿Cuántos ceros tiene 10⁹ después del 1?', 9, '', '10⁹ = 1.000.000.000.'),
          M('(3 · 10⁴)² =', ['9 · 10⁸', '9 · 10⁶', '6 · 10⁸', '3 · 10⁸'], '3² = 9 y (10⁴)² = 10⁸.'),
        ],
      },
      {
        n: 'Raíces', ic: 'tri', items: [
          M('√49 + ∛27 =', ['10', '16', '76', '7'], '√49 = 7 y ∛27 = 3.'),
          M('√12 simplificada es:', ['2√3', '3√2', '4√3', '6'], '√12 = √(4 · 3) = 2√3.'),
          M('√50 + √18 =', ['8√2', '√68', '2√17', '15√2'], '√50 = 5√2 y √18 = 3√2; son raíces semejantes: 8√2.'),
          M('√8 · √2 =', ['4', '√10', '16', '2√2'], '√8 · √2 = √16 = 4.'),
          M('Al racionalizar 6/√3 se obtiene:', ['2√3', '6√3', '√3', '3√2'], '6/√3 · √3/√3 = 6√3/3 = 2√3.'),
          M('∛(−8) =', ['−2', '2', 'No existe en los reales', '−4'], 'Las raíces de índice impar de negativos sí existen: (−2)³ = −8.'),
          T('√(−9) es un número real.', false, 'Ningún número real al cuadrado da −9.'),
          M('√(16 + 9) =', ['5', '7', '25', '13'], 'Primero la suma: √25 = 5. La raíz NO se distribuye en la suma: √16 + √9 = 7 es un error.'),
          M('(√5)² =', ['5', '25', '√10', '10'], 'La raíz y el cuadrado se cancelan.'),
          M('¿Entre qué enteros consecutivos está √30?', ['5 y 6', '4 y 5', '6 y 7', '15 y 16'], '5² = 25 < 30 < 36 = 6².'),
          M('√2 · √3 · √6 =', ['6', '√11', '36', '3√2'], '√(2 · 3 · 6) = √36 = 6.'),
        ],
      },
      {
        n: 'Problemas con potencias y raíces', ic: 'target', items: [
          M('Un cuadrado tiene área 72 cm². ¿Cuánto mide su lado?', ['6√2 cm', '36 cm', '18 cm', '12 cm'], 'Lado = √72 = √(36 · 2) = 6√2.'),
          M('Un cubo tiene volumen 125 cm³. ¿Cuánto mide su arista?', ['5 cm', '25 cm', '√125 cm', '41,6 cm'], '∛125 = 5.'),
          M('Una colonia de bacterias se duplica cada hora. Si hay 100 al inicio, ¿cuántas habrá después de 5 horas?', ['3.200', '1.000', '500', '6.400'], '100 · 2⁵ = 100 · 32 = 3.200.'),
          M('Un archivo de 2⁵ MB se copia 2³ veces. ¿Cuántos MB ocupan todas las copias juntas?', ['2⁸ MB', '2¹⁵ MB', '4⁸ MB', '2² MB'], '2⁵ · 2³ = 2⁸.'),
          N('Calcula 2⁵ − 5²', 7, '', '32 − 25 = 7.'),
          M('Si 3ˣ = 81, entonces x =', ['4', '27', '3', '9'], '81 = 3⁴.'),
          M('Si 2ˣ = 1/8, entonces x =', ['−3', '3', '1/3', '−1/3'], '1/8 = 2⁻³.'),
          M('La diagonal de un cuadrado de lado 4 cm mide:', ['4√2 cm', '8 cm', '16 cm', '2√2 cm'], 'Por Pitágoras: √(4² + 4²) = √32 = 4√2.'),
          T('El área de un cuadrado de lado √7 cm es 7 cm².', true, '(√7)² = 7.'),
          M('10³ · 10⁻⁵ · 10² =', ['1', '10', '10⁻¹⁰', '0'], '3 − 5 + 2 = 0, y 10⁰ = 1.'),
        ],
      },
    ],
  });

  // ---------- Álgebra ----------
  RB.unit('m1d', {
    name: 'Álgebra: productos notables y factorización', desc: 'Lenguaje algebraico, reducir y valorizar, productos notables y factorización.', ic: 'pen', vid: 'v-m1d', area: 'Álgebra',
    lessons: [
      {
        n: 'Expresiones algebraicas', ic: 'pen', items: [
          { t: 'info', ic: 'pen', title: 'Términos semejantes', txt: 'Solo se suman o restan los términos que tienen **la misma parte literal** (mismas letras con los mismos exponentes): 3x² + 5x² = 8x², pero 3x² + 5x no se puede reducir.' },
          M('Reduce: 3x + 5y − x + 2y', ['2x + 7y', '4x + 7y', '2x + 3y', '9xy'], '3x − x = 2x y 5y + 2y = 7y.'),
          M('"El doble de un número, disminuido en 5" se escribe:', ['2x − 5', '2(x − 5)', 'x² − 5', '5 − 2x'], 'Primero el doble (2x) y luego se le resta 5.'),
          M('"El cuadrado de la suma de dos números a y b" se escribe:', ['(a + b)²', 'a² + b²', '2(a + b)', 'a + b²'], 'Primero la suma, después el cuadrado.'),
          M('Si x = −2, el valor de 3x² − x + 1 es:', ['15', '11', '−9', '13'], '3 · 4 = 12; −(−2) = +2; 12 + 2 + 1 = 15.'),
          M('Reduce: 2(3a − b) − (a − 4b)', ['5a + 2b', '5a − 6b', '7a + 2b', '5a − 2b'], '6a − 2b − a + 4b = 5a + 2b. El signo menos antes del paréntesis cambia todos los signos.'),
          M('El perímetro de un rectángulo de lados (x + 3) y (2x − 1) es:', ['6x + 4', '3x + 2', '2x² + 5x − 3', '6x + 8'], '2(x + 3) + 2(2x − 1) = 2x + 6 + 4x − 2 = 6x + 4.'),
          T('Los términos 3x²y y −5yx² son semejantes.', true, 'Tienen la misma parte literal: x²y (el orden de los factores no importa).'),
          F('"La mitad de un número, aumentada en 7" se escribe ___.', ['x/2 + 7', '(x + 7)/2', '2x + 7'], 'Primero la mitad y luego se suma 7.'),
          N('Si a = 3 y b = −1, calcula a² − 2ab + b²', 16, '', '9 − 2(3)(−1) + 1 = 9 + 6 + 1 = 16. Es (a − b)² = 4² = 16.'),
        ],
      },
      {
        n: 'Productos notables', ic: 'grid', items: [
          M('(x + 5)² =', ['x² + 10x + 25', 'x² + 25', 'x² + 5x + 25', '2x + 10'], 'Cuadrado de binomio: x² + 2·5·x + 25.'),
          M('(2a − 3)² =', ['4a² − 12a + 9', '4a² − 9', '4a² + 12a + 9', '2a² − 6a + 9'], '(2a)² − 2·(2a)·3 + 3² = 4a² − 12a + 9.'),
          M('(x + 4)(x − 4) =', ['x² − 16', 'x² + 16', 'x² − 8x − 16', 'x² + 8x − 16'], 'Suma por diferencia: cuadrado del primero menos cuadrado del segundo.'),
          M('(x + 3)(x − 7) =', ['x² − 4x − 21', 'x² + 4x − 21', 'x² − 21', 'x² − 10x + 21'], 'Binomios con término común: x² + (3 − 7)x + 3·(−7).'),
          M('(3x + 2y)(3x − 2y) =', ['9x² − 4y²', '9x² + 4y²', '6x² − 4y²', '9x² − 12xy − 4y²'], '(3x)² − (2y)².'),
          M('101 · 99 se puede calcular como:', ['(100 + 1)(100 − 1) = 10.000 − 1 = 9.999', '100 · 100 + 1 = 10.001', '101 · 100 − 1 = 10.099', '(100 + 1)² = 10.201'], 'Es una suma por diferencia.'),
          T('(a + b)² = a² + b²', false, 'Falta el doble producto: (a + b)² = a² + 2ab + b².'),
          M('(x − 1)² − (x + 1)² =', ['−4x', '0', '−2', '4x'], '(x² − 2x + 1) − (x² + 2x + 1) = −4x.'),
          N('Calcula 21² usando (20 + 1)²', 441, '', '400 + 2·20·1 + 1 = 441.'),
          M('El área de un cuadrado de lado (x + 2) es:', ['x² + 4x + 4', 'x² + 4', '4x + 8', 'x² + 2x + 4'], '(x + 2)² = x² + 4x + 4. 4x + 8 es el perímetro.'),
        ],
      },
      {
        n: 'Factorización', ic: 'list', items: [
          M('Factoriza: 6x² + 9x', ['3x(2x + 3)', '6x(x + 9)', '3x(2x + 9)', 'x(6x + 3)'], 'El factor común es 3x: 6x² = 3x·2x y 9x = 3x·3.'),
          M('Factoriza: x² − 49', ['(x + 7)(x − 7)', '(x − 7)²', '(x + 49)(x − 1)', 'x(x − 49)'], 'Diferencia de cuadrados: a² − b² = (a + b)(a − b).'),
          M('Factoriza: x² + 6x + 9', ['(x + 3)²', '(x + 9)(x + 1)', '(x + 3)(x − 3)', '(x + 6)(x + 3)'], 'Trinomio cuadrado perfecto: 9 = 3² y 6x = 2·3·x.'),
          M('Factoriza: x² − 5x + 6', ['(x − 2)(x − 3)', '(x + 2)(x + 3)', '(x − 6)(x + 1)', '(x − 1)(x − 6)'], 'Dos números que multiplicados den 6 y sumados den −5: −2 y −3.'),
          M('Factoriza: x² + x − 12', ['(x + 4)(x − 3)', '(x − 4)(x + 3)', '(x + 6)(x − 2)', '(x + 12)(x − 1)'], 'Producto −12 y suma +1: 4 y −3.'),
          M('Factoriza: 4a² − 25b²', ['(2a + 5b)(2a − 5b)', '(4a − 25b)²', '(2a − 5b)²', '4(a − 5b)(a + 5b)'], '(2a)² − (5b)².'),
          M('Factoriza completamente: 2x² − 18', ['2(x + 3)(x − 3)', '(2x − 6)(x + 3)', '2(x − 3)²', '2(x² − 18)'], 'Factor común 2: 2(x² − 9) = 2(x + 3)(x − 3).'),
          M('Simplifica: (x² − 9)/(x + 3)', ['x − 3', 'x + 3', 'x − 9', '1/(x − 3)'], '(x + 3)(x − 3)/(x + 3) = x − 3, con x ≠ −3.'),
          T('x² + 9 se puede factorizar como (x + 3)(x − 3).', false, 'Eso es x² − 9. La suma de cuadrados no se factoriza en los reales.'),
          M('Factoriza: ax + ay + bx + by', ['(a + b)(x + y)', '(a + x)(b + y)', 'ab(x + y)', '(a + y)(b + x)'], 'Agrupando: a(x + y) + b(x + y) = (a + b)(x + y).'),
          P('Une cada expresión con su factorización', [['x² − 1', '(x + 1)(x − 1)'], ['x² − 2x + 1', '(x − 1)²'], ['x² + 2x', 'x(x + 2)'], ['x² + 3x + 2', '(x + 1)(x + 2)']], 'Diferencia de cuadrados, cuadrado perfecto, factor común y trinomio.'),
        ],
      },
      {
        n: 'Aplicaciones del álgebra', ic: 'target', items: [
          M('Simplifica: (x² + 5x)/x, con x ≠ 0', ['x + 5', 'x² + 5', '6x', '5'], 'x(x + 5)/x = x + 5.'),
          M('Simplifica: (x² − 4x + 4)/(x − 2), con x ≠ 2', ['x − 2', 'x + 2', 'x − 4', '(x − 2)²'], '(x − 2)²/(x − 2) = x − 2.'),
          M('El área de un rectángulo es x² + 7x + 12. Si un lado mide (x + 3), el otro mide:', ['x + 4', 'x + 9', 'x − 4', 'x + 3'], 'x² + 7x + 12 = (x + 3)(x + 4).'),
          M('Si a + b = 7 y ab = 10, ¿cuánto vale a² + b²?', ['29', '49', '39', '69'], '(a + b)² = a² + b² + 2ab → 49 = a² + b² + 20 → 29.'),
          M('Si x − y = 3 y x + y = 8, ¿cuánto vale x² − y²?', ['24', '11', '5', '64'], 'x² − y² = (x + y)(x − y) = 8 · 3 = 24.'),
          N('Si m + n = 5 y m − n = 1, ¿cuánto es m² − n²?', 5, '', '(m + n)(m − n) = 5 · 1 = 5.'),
          M('Un terreno cuadrado de lado x se amplía a lado (x + 3). ¿Cuánto aumentó su área?', ['6x + 9', '9', 'x² + 9', '3x + 9'], '(x + 3)² − x² = 6x + 9.'),
          T('Para todo número x, (x − 3)² = (3 − x)².', true, 'x − 3 y 3 − x son opuestos, y al elevarlos al cuadrado dan lo mismo.'),
          M('La expresión 4x² − 12x + 9 es igual a:', ['(2x − 3)²', '(4x − 3)²', '(2x + 3)²', '(2x − 9)(2x − 1)'], '(2x)² − 2·2x·3 + 3².'),
        ],
      },
    ],
  });

  // ---------- Videos ----------
  RB.video('v-m1c', {
    u: 'm1c', title: 'Potencias y raíces', desc: 'Propiedades, exponentes negativos, notación científica, raíces y ecuaciones exponenciales simples.',
    sc: [
      { h: 'Potencias y raíces', sub: 'Reglas cortas que resuelven muchas preguntas', b: [{ tags: ['Propiedades', 'Exponente 0 y negativo', 'Notación científica', 'Raíces', 'Racionalizar'] }],
        s: ['Hola. En este video vamos a dominar las potencias y las raíces. Son temas con reglas cortas, y si las tienes claras, resuelves muchas preguntas en segundos.', 'Veremos las propiedades de las potencias, los exponentes cero y negativos, la notación científica, cómo simplificar y operar raíces, y cómo resolver ecuaciones exponenciales simples.'] },
      { h: '¿Qué es una potencia?', ic: 'bolt', b: [{ eq: '2⁵ = 2 · 2 · 2 · 2 · 2 = 32', n: 'Base 2, exponente 5' }, { two: [['Exponente par', '(−2)⁴ = 16 → positivo'], ['Exponente impar', '(−2)³ = −8 → conserva el signo']] }],
        s: ['Una potencia es una multiplicación abreviada.', 'Dos elevado a cinco es dos multiplicado por sí mismo cinco veces: treinta y dos. El dos es la base y el cinco es el exponente.', 'Si la base es negativa, mira el exponente. Con exponente par, el resultado es positivo: menos dos a la cuarta es dieciséis. Con exponente impar, el resultado conserva el signo negativo: menos dos al cubo es menos ocho.'] },
      { h: 'Propiedades', ic: 'list', b: [{ eq: 'aᵐ · aⁿ = aᵐ⁺ⁿ', n: 'Misma base al multiplicar: se suman los exponentes' }, { eq: 'aᵐ : aⁿ = aᵐ⁻ⁿ', n: 'Misma base al dividir: se restan' }, { eq: '(aᵐ)ⁿ = aᵐ·ⁿ', n: 'Potencia de potencia: se multiplican' }, { eq: '(a · b)ⁿ = aⁿ · bⁿ', n: 'El exponente afecta a cada factor' }],
        s: ['Estas son las propiedades que más se usan.', 'Al multiplicar potencias de igual base, se conserva la base y se suman los exponentes: dos al cubo por dos a la cuarta es dos a la séptima.', 'Al dividir potencias de igual base, se restan los exponentes: cinco a la octava dividido en cinco a la sexta es cinco al cuadrado, o sea, veinticinco.', 'En una potencia de potencia, los exponentes se multiplican: tres al cuadrado, todo elevado al cubo, es tres a la sexta.', 'Y cuando un producto está elevado a un exponente, el exponente afecta a cada factor: equis al cuadrado por y al cubo, todo al cuadrado, es equis a la cuarta por y a la sexta.'] },
      { h: 'Exponente cero y negativo', ic: 'flag', b: [{ eq: 'a⁰ = 1   (a ≠ 0)' }, { eq: 'a⁻ⁿ = 1/aⁿ  →  2⁻³ = 1/8' }, { eq: '(a/b)⁻ⁿ = (b/a)ⁿ  →  (2/3)⁻² = 9/4' }, { q: '¿Cuánto es 3⁻¹ + 3⁻²?', o: ['4/9', '−9', '2/9', '1/27'], e: '3⁻¹ = 1/3 y 3⁻² = 1/9. La suma es 3/9 + 1/9 = 4/9.' }],
        s: ['Ahora, dos casos especiales que la PAES adora.', 'Cualquier número distinto de cero elevado a cero es uno.', 'Y un exponente negativo significa inverso: dos elevado a menos tres es uno partido por dos al cubo, o sea, un octavo. Ojo: el exponente negativo no hace negativo el resultado.', 'Si la base es una fracción, el exponente negativo la da vuelta: dos tercios elevado a menos dos es tres medios al cuadrado, o sea, nueve cuartos.', 'Pruébalo.'] },
      { h: 'Notación científica', ic: 'planet', b: [{ eq: '300.000 = 3 · 10⁵' }, { eq: '0,00045 = 4,5 · 10⁻⁴' }, { tip: 'El coeficiente siempre va **entre 1 y 10**: 25 · 10³ se escribe 2,5 · 10⁴.' }, { eq: '(2 · 10³)(4 · 10⁵) = 8 · 10⁸' }],
        s: ['La notación científica sirve para escribir números muy grandes o muy pequeños.', 'Trescientos mil es tres por diez a la quinta, porque la coma se mueve cinco lugares.', 'Y cero coma cero cero cero cuarenta y cinco es cuatro coma cinco por diez a la menos cuatro: la coma se mueve cuatro lugares hacia la derecha, y por eso el exponente es negativo.', 'Una regla importante: el coeficiente debe estar entre uno y diez. Veinticinco por diez al cubo no está en notación científica; se escribe dos coma cinco por diez a la cuarta.', 'Para multiplicar, multiplica los coeficientes y suma los exponentes: dos por cuatro es ocho, y tres más cinco es ocho. Resultado: ocho por diez a la octava.'] },
      { h: 'Raíces', ic: 'tri', b: [{ eq: '√49 = 7 porque 7² = 49' }, { eq: '∛(−8) = −2 porque (−2)³ = −8' }, { warn: '√(−9) **no es real**: ningún real al cuadrado da negativo.' }, { eq: '√a · √b = √(a · b)  →  √8 · √2 = √16 = 4' }],
        s: ['La raíz es la operación inversa de la potencia.', 'La raíz cuadrada de cuarenta y nueve es siete, porque siete al cuadrado es cuarenta y nueve.', 'Las raíces de índice impar sí existen para números negativos: la raíz cúbica de menos ocho es menos dos.', 'Pero las raíces de índice par de números negativos no son reales. Raíz de menos nueve no existe en los reales.', 'Y las raíces del mismo índice se pueden multiplicar juntando lo de adentro: raíz de ocho por raíz de dos es raíz de dieciséis, o sea, cuatro.'] },
      { h: 'Simplificar y sumar raíces', ic: 'calc', b: [{ eq: '√12 = √(4 · 3) = 2√3' }, { eq: '√50 + √18 = 5√2 + 3√2 = 8√2', n: 'Solo se suman raíces semejantes' }, { warn: '√(16 + 9) = √25 = 5, **no** 4 + 3 = 7' }, { q: '¿Entre qué enteros consecutivos está √30?', o: ['5 y 6', '4 y 5', '6 y 7', '15 y 16'], e: '5² = 25 y 6² = 36; como 25 < 30 < 36, √30 está entre 5 y 6.' }],
        s: ['Para simplificar una raíz, busca un cuadrado perfecto que divida al número.', 'Raíz de doce es raíz de cuatro por tres, o sea, dos raíz de tres.', 'Y solo se pueden sumar raíces semejantes, igual que términos algebraicos. Raíz de cincuenta es cinco raíz de dos, raíz de dieciocho es tres raíz de dos, y juntas suman ocho raíz de dos.', 'Cuidado con este error: la raíz no se reparte en una suma. Raíz de dieciséis más nueve es raíz de veinticinco, o sea, cinco. No es cuatro más tres.', 'Una pregunta para estimar raíces.'] },
      { h: 'Racionalizar', ic: 'check', b: [{ eq: '6/√3 = (6 · √3)/(√3 · √3) = 6√3/3 = 2√3' }, { tip: 'Multiplica arriba y abajo por la raíz del denominador: así desaparece la raíz de abajo.' }],
        s: ['Racionalizar es eliminar la raíz del denominador.', 'Si tienes seis partido por raíz de tres, multiplicas arriba y abajo por raíz de tres. Abajo queda tres, arriba seis raíz de tres, y simplificando: dos raíz de tres.', 'La idea es simple: multiplica numerador y denominador por la raíz que está abajo. Como raíz de tres por raíz de tres es tres, la raíz desaparece del denominador.'] },
      { h: 'Ecuaciones y crecimiento', ic: 'spark', b: [{ eq: '3ˣ = 81 = 3⁴  →  x = 4' }, { eq: '2ˣ = 1/8 = 2⁻³  →  x = −3' }, { ex: 'Bacterias que se duplican cada hora, 100 al inicio: después de 5 horas hay 100 · 2⁵ = **3.200**' }],
        s: ['Las potencias también aparecen en ecuaciones y en problemas de crecimiento.', 'Si tres elevado a equis es ochenta y uno, escribe ochenta y uno como potencia de tres: tres a la cuarta. Entonces equis vale cuatro.', 'Si dos elevado a equis es un octavo, como un octavo es dos a la menos tres, equis vale menos tres.', 'Y si una colonia de cien bacterias se duplica cada hora, después de cinco horas habrá cien por dos a la quinta, o sea, tres mil doscientas bacterias.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Multiplicar: sumar exponentes', 'Dividir: restar', 'a⁰ = 1', 'a⁻ⁿ = 1/aⁿ', 'Coeficiente entre 1 y 10', '√ no se reparte en la suma'] }],
        s: ['Resumen: al multiplicar se suman los exponentes, al dividir se restan, y en potencia de potencia se multiplican. A elevado a cero es uno, y un exponente negativo significa inverso.', 'En notación científica, el coeficiente va entre uno y diez. Y nunca repartas una raíz sobre una suma. ¡A practicar!'] },
    ],
  });

  RB.video('v-m1d', {
    u: 'm1d', title: 'Productos notables y factorización', desc: 'Términos semejantes, lenguaje algebraico, productos notables, factorización y simplificación.',
    sc: [
      { h: 'Álgebra: productos notables y factorización', sub: 'Expandir y comprimir expresiones', b: [{ tags: ['Términos semejantes', 'Lenguaje algebraico', 'Cuadrado de binomio', 'Suma por diferencia', 'Factorizar'] }],
        s: ['Hola. El álgebra es la herramienta que usarás en casi toda la prueba de matemática. En este video vamos a dominar las expresiones algebraicas, los productos notables y la factorización.', 'Piensa en los productos notables como expandir una expresión, y en la factorización como comprimirla. Son dos caminos del mismo puente.'] },
      { h: 'Términos semejantes', ic: 'pen', b: [{ eq: '3x + 5y − x + 2y = 2x + 7y' }, { two: [['Semejantes', '3x²y y −5yx²', 'Misma parte literal'], ['No semejantes', '3x² y 5x', 'Distinto exponente']] }, { eq: '2(3a − b) − (a − 4b) = 6a − 2b − a + 4b = 5a + 2b', n: 'El menos antes del paréntesis cambia todos los signos' }],
        s: ['Partamos por reducir.', 'Solo se suman términos semejantes: los que tienen las mismas letras con los mismos exponentes. Tres equis más cinco y menos equis más dos y da dos equis más siete y.', 'Tres equis cuadrado y, y menos cinco y equis cuadrado, son semejantes, porque el orden de los factores no importa. Pero tres equis cuadrado y cinco equis no lo son: tienen distinto exponente.', 'Y cuidado con los paréntesis precedidos de un signo menos: ese menos cambia el signo de todos los términos de adentro.'] },
      { h: 'Lenguaje algebraico', ic: 'quote', b: [{ two: [['"El doble de un número, disminuido en 5"', '2x − 5'], ['"El doble de un número disminuido en 5"', '2(x − 5)']] }, { two: [['"El cuadrado de la suma"', '(a + b)²'], ['"La suma de los cuadrados"', 'a² + b²']] }, { tip: 'Fíjate en el **orden** de las operaciones que describe la frase.' }],
        s: ['Muchas preguntas parten traduciendo palabras a expresiones.', 'La coma cambia todo. El doble de un número, coma, disminuido en cinco, es dos equis menos cinco. Pero el doble de un número disminuido en cinco, sin pausa, puede ser dos por paréntesis equis menos cinco.', 'Lo mismo con el cuadrado de la suma, que es a más b, todo al cuadrado, y la suma de los cuadrados, que es a al cuadrado más b al cuadrado. Son expresiones distintas.', 'La clave es fijarte en qué operación se hace primero según la frase.'] },
      { h: 'Cuadrado de binomio', ic: 'grid', b: [{ eq: '(a + b)² = a² + 2ab + b²' }, { eq: '(a − b)² = a² − 2ab + b²' }, { eq: '(x + 5)² = x² + 10x + 25' }, { warn: '(a + b)² ≠ a² + b²: falta el **doble producto** 2ab' }],
        s: ['El primer producto notable es el cuadrado de binomio.', 'A más b, al cuadrado, es a al cuadrado más dos a b más b al cuadrado. Cuadrado del primero, más el doble del primero por el segundo, más el cuadrado del segundo.', 'Si es una resta, cambia solo el signo del término del medio: a al cuadrado menos dos a b más b al cuadrado.', 'Por ejemplo, equis más cinco al cuadrado es equis al cuadrado más diez equis más veinticinco.', 'El error más común es olvidar el término del medio. A más b al cuadrado no es a al cuadrado más b al cuadrado.'] },
      { h: 'Suma por diferencia y término común', ic: 'calc', b: [{ eq: '(a + b)(a − b) = a² − b²' }, { eq: '101 · 99 = (100 + 1)(100 − 1) = 10.000 − 1 = 9.999' }, { eq: '(x + a)(x + b) = x² + (a + b)x + ab' }, { q: '¿Cuánto es (x + 3)(x − 7)?', o: ['x² − 4x − 21', 'x² + 4x − 21', 'x² − 21', 'x² − 10x + 21'], e: 'La suma de 3 y −7 es −4 y su producto es −21.' }],
        s: ['El segundo producto notable es la suma por diferencia.', 'A más b, por a menos b, es a al cuadrado menos b al cuadrado. Los términos del medio se cancelan.', 'Sirve incluso para calcular mentalmente: ciento uno por noventa y nueve es cien más uno por cien menos uno, o sea, diez mil menos uno: nueve mil novecientos noventa y nueve.', 'El tercero es el producto de binomios con un término común. Equis más a, por equis más b, es equis al cuadrado, más la suma de a y b por equis, más el producto de a y b.', 'Calcula tú este.'] },
      { h: 'Factorizar: comprimir', ic: 'list', b: [{ two: [['Factor común', '6x² + 9x = 3x(2x + 3)'], ['Diferencia de cuadrados', 'x² − 49 = (x + 7)(x − 7)']] }, { two: [['Trinomio cuadrado perfecto', 'x² + 6x + 9 = (x + 3)²'], ['Trinomio x² + bx + c', 'x² − 5x + 6 = (x − 2)(x − 3)']] }, { tip: 'Para x² + bx + c busca dos números que **multiplicados** den c y **sumados** den b.' }],
        s: ['Factorizar es el camino inverso: escribir una expresión como una multiplicación.', 'Siempre parte buscando un factor común: seis equis cuadrado más nueve equis es tres equis por paréntesis dos equis más tres. Y si ves una resta de cuadrados, usa la suma por diferencia: equis cuadrado menos cuarenta y nueve es equis más siete por equis menos siete.', 'Si el trinomio es un cuadrado perfecto, se escribe como binomio al cuadrado: equis cuadrado más seis equis más nueve es equis más tres al cuadrado. Y en un trinomio general como equis cuadrado menos cinco equis más seis, buscamos dos números: menos dos y menos tres.', 'El truco: dos números que multiplicados den el término libre y sumados den el coeficiente de equis.'] },
      { h: 'Factoriza por completo', ic: 'flag', b: [{ eq: '2x² − 18 = 2(x² − 9) = 2(x + 3)(x − 3)' }, { warn: 'x² + 9 **no** se factoriza en los reales: no es diferencia de cuadrados.' }, { eq: 'ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)', n: 'Factorización por agrupación' }],
        s: ['A veces hay que combinar métodos.', 'Dos equis cuadrado menos dieciocho: primero el factor común dos, y queda equis cuadrado menos nueve, que es diferencia de cuadrados. Resultado: dos por equis más tres por equis menos tres.', 'Ojo con esta trampa: equis cuadrado más nueve no se factoriza en los reales. Solo la resta de cuadrados se factoriza.', 'Y cuando hay cuatro términos, prueba agrupar de a dos: a equis más a y más b equis más b y es a por equis más y, más b por equis más y, o sea, a más b por equis más y.'] },
      { h: 'Usar las identidades', ic: 'target', b: [{ ex: 'Si a + b = 7 y ab = 10, ¿cuánto vale a² + b²?' }, { sol: '(a + b)² = a² + b² + 2ab → 49 = a² + b² + 20 → a² + b² = **29**' }, { q: 'Si x − y = 3 y x + y = 8, ¿cuánto vale x² − y²?', o: ['24', '11', '5', '64'], e: 'x² − y² = (x + y)(x − y) = 8 · 3 = 24.' }],
        s: ['La PAES también te pide usar estas identidades sin conocer los valores de las letras.', 'Si a más b es siete y a por b es diez, ¿cuánto vale a cuadrado más b cuadrado?', 'Usa el cuadrado de binomio: a más b al cuadrado es a cuadrado más b cuadrado más dos a b. Reemplazando, cuarenta y nueve es igual a lo que buscamos más veinte. Entonces a cuadrado más b cuadrado es veintinueve.', 'Ahora intenta tú con la suma por diferencia.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Solo semejantes', '(a ± b)² = a² ± 2ab + b²', '(a + b)(a − b) = a² − b²', 'Factor común primero', 'x² + 9 no se factoriza'] }],
        s: ['Resumen: reduce solo términos semejantes, recuerda el doble producto en el cuadrado de binomio, y usa la suma por diferencia para diferencias de cuadrados.', 'Al factorizar, busca primero un factor común y luego reconoce el producto notable. ¡A practicar!'] },
    ],
  });
})();
