// Matemática M1 (2): potencias y raíces; expresiones algebraicas, productos notables y factorización.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Potencias y raíces ----------
  RB.unit('m1c', {
    name: 'Potencias y raíces', desc: 'Propiedades de las potencias, exponentes negativos, notación científica y raíces.', ic: 'bolt', area: 'Números',
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
    name: 'Álgebra: productos notables y factorización', desc: 'Lenguaje algebraico, reducir y valorizar, productos notables y factorización.', ic: 'pen', area: 'Álgebra',
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
})();
