// Matemática M1 (3): ecuaciones e inecuaciones lineales; sistemas de ecuaciones.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Ecuaciones e inecuaciones lineales ----------
  RB.unit('m1e', {
    name: 'Ecuaciones e inecuaciones lineales', desc: 'Resolver ecuaciones de primer grado, plantear problemas e inecuaciones con intervalos.', ic: 'scale', area: 'Álgebra',
    lessons: [
      {
        n: 'Resolver ecuaciones', ic: 'scale', items: [
          { t: 'info', ic: 'scale', title: 'La balanza', txt: 'Una ecuación es una **balanza en equilibrio**: lo que hagas a un lado, hazlo también al otro. El objetivo es dejar la incógnita sola.' },
          N('Resuelve: 3x + 7 = 22', 5, '', '3x = 15 → x = 5.'),
          N('Resuelve: 5x − 4 = 2x + 11', 5, '', '5x − 2x = 11 + 4 → 3x = 15 → x = 5.'),
          M('Resuelve: 2(x − 3) = x + 4', ['x = 10', 'x = 7', 'x = 1', 'x = −2'], '2x − 6 = x + 4 → x = 10.'),
          M('Resuelve: x/3 + 2 = 5', ['x = 9', 'x = 1', 'x = 21', 'x = 3'], 'x/3 = 3 → x = 9.'),
          M('Resuelve: (x + 1)/2 = (x − 2)/3', ['x = −7', 'x = 7', 'x = −1', 'x = 1/5'], 'Multiplicando cruzado: 3(x + 1) = 2(x − 2) → 3x + 3 = 2x − 4 → x = −7.'),
          M('Resuelve: 4 − 3(2 − x) = 2x + 1', ['x = 3', 'x = −3', 'x = 1', 'x = 7/5'], '4 − 6 + 3x = 2x + 1 → 3x − 2 = 2x + 1 → x = 3.'),
          N('Resuelve: 0,5x + 1,5 = 4', 5, '', '0,5x = 2,5 → x = 5.'),
          T('La ecuación 2(x + 3) = 2x + 6 tiene infinitas soluciones.', true, 'Al desarrollar queda 2x + 6 = 2x + 6: se cumple para cualquier x.'),
          T('La ecuación x + 5 = x + 2 tiene una única solución.', false, 'Queda 5 = 2, que es falso: no tiene solución.'),
          M('Si 2x − 3 = 9, ¿cuánto vale 4x + 1?', ['25', '6', '13', '37'], 'x = 6 → 4·6 + 1 = 25. También: 4x = 2·(2x) = 2·12 = 24.'),
          M('Despeja h en A = (b · h)/2', ['h = 2A/b', 'h = A/(2b)', 'h = 2b/A', 'h = Ab/2'], 'Multiplica por 2 y divide por b: 2A = bh → h = 2A/b.'),
        ],
      },
      {
        n: 'Plantear problemas', ic: 'pen', items: [
          M('La suma de tres números consecutivos es 72. ¿Cuál es el mayor?', ['25', '24', '23', '26'], 'x + (x + 1) + (x + 2) = 72 → 3x + 3 = 72 → x = 23. El mayor es 25.'),
          M('Ana tiene el triple de la edad de su hijo. En 10 años tendrá el doble. ¿Qué edad tiene el hijo hoy?', ['10 años', '20 años', '5 años', '30 años'], '3x + 10 = 2(x + 10) → 3x + 10 = 2x + 20 → x = 10.'),
          N('El perímetro de un rectángulo es 46 cm y su largo mide 5 cm más que su ancho. ¿Cuánto mide el ancho (en cm)?', 9, 'cm', '2x + 2(x + 5) = 46 → 4x + 10 = 46 → x = 9.'),
          M('Un plan de celular cobra $5.000 fijos más $20 por megabyte. Si la cuenta fue $9.000, ¿cuántos megabytes se usaron?', ['200', '450', '250', '700'], '5.000 + 20m = 9.000 → 20m = 4.000 → m = 200.'),
          M('Si a un número se le resta 7 y el resultado se multiplica por 3, se obtiene 24. ¿Cuál es el número?', ['15', '1', '31', '10'], '3(x − 7) = 24 → x − 7 = 8 → x = 15.'),
          M('En un curso hay 34 estudiantes y hay 6 mujeres más que hombres. ¿Cuántos hombres hay?', ['14', '20', '17', '12'], 'x + (x + 6) = 34 → 2x = 28 → x = 14.'),
          M('Con $10.000 se compraron 3 cuadernos y un estuche de $2.800. ¿Cuánto costó cada cuaderno?', ['$2.400', '$3.333', '$7.200', '$2.800'], '3c + 2.800 = 10.000 → 3c = 7.200 → c = 2.400.'),
          M('El doble de un número aumentado en 4 es igual al número disminuido en 5. ¿Cuál es el número?', ['−9', '9', '−1', '3'], '2x + 4 = x − 5 → x = −9.'),
          T('Si la mitad de un número es 18, el número es 9.', false, 'x/2 = 18 → x = 36.'),
          M('Un taxi cobra $500 de bajada de bandera y $200 cada 200 metros. ¿Cuánto cuesta un viaje de 3 km?', ['$3.500', '$3.000', '$1.100', '$6.500'], '3.000 m son 15 tramos de 200 m: 500 + 15 · 200 = 3.500.'),
        ],
      },
      {
        n: 'Inecuaciones', ic: 'func', items: [
          { t: 'info', ic: 'func', title: 'Inecuaciones', txt: 'Se resuelven como ecuaciones, con una regla extra: si **multiplicas o divides por un número negativo**, la desigualdad **se invierte** (< pasa a >).' },
          M('Resuelve: 2x + 3 > 11', ['x > 4', 'x < 4', 'x > 7', 'x > 8'], '2x > 8 → x > 4.'),
          M('Resuelve: −3x ≤ 12', ['x ≥ −4', 'x ≤ −4', 'x ≥ 4', 'x ≤ 4'], 'Al dividir por −3 la desigualdad se invierte: x ≥ −4.'),
          M('El conjunto solución de x − 5 < 2x + 1 es:', ['x > −6', 'x < −6', 'x > 6', 'x < 6'], '−5 − 1 < 2x − x → −6 < x.'),
          M('El intervalo [2, 7[ corresponde a:', ['2 ≤ x < 7', '2 < x ≤ 7', '2 < x < 7', '2 ≤ x ≤ 7'], 'Corchete hacia adentro: incluye; corchete hacia afuera: no incluye.'),
          M('¿Cuál es el menor número entero que cumple 3x − 2 > 10?', ['5', '4', '3', '12'], '3x > 12 → x > 4. El menor entero mayor que 4 es 5.'),
          T('Si x > 3, entonces −x < −3.', true, 'Multiplicar por −1 invierte la desigualdad.'),
          M('Un estacionamiento cobra $1.000 la primera hora y $600 cada hora adicional. ¿Cuántas horas como máximo se puede estacionar con $4.000?', ['6 horas', '5 horas', '7 horas', '4 horas'], '1.000 + 600(h − 1) ≤ 4.000 → 600(h − 1) ≤ 3.000 → h − 1 ≤ 5 → h ≤ 6.'),
          M('Resuelve: (x − 1)/2 ≥ 3', ['x ≥ 7', 'x ≥ 5', 'x ≤ 7', 'x ≥ 4'], 'x − 1 ≥ 6 → x ≥ 7.'),
          M('¿Qué números cumplen −1 < x + 2 ≤ 5?', ['−3 < x ≤ 3', '1 < x ≤ 7', '−3 ≤ x < 3', '−1 < x ≤ 3'], 'Restando 2 en las tres partes: −3 < x ≤ 3.'),
          F('Para aprobar con promedio 4,0 o más, con notas 3,5 y 4,2, la tercera nota x debe cumplir (3,5 + 4,2 + x)/3 ≥ 4,0, es decir, x ≥ ___.', ['4,3', '4,0', '3,7'], '7,7 + x ≥ 12 → x ≥ 4,3.'),
        ],
      },
      {
        n: 'Ecuaciones en contexto', ic: 'target', items: [
          M('Una piscina tiene 1.200 L y se vacía a razón de 40 L por minuto. ¿En cuántos minutos le quedarán 400 L?', ['20', '30', '10', '40'], '1.200 − 40t = 400 → 40t = 800 → t = 20.'),
          M('Dos ciudades están a 300 km. Un bus sale de A a 70 km/h y otro sale al mismo tiempo de B hacia A a 80 km/h. ¿En cuántas horas se cruzan?', ['2 horas', '3 horas', '1,5 horas', '4 horas'], 'Se acercan a 150 km/h: 150t = 300 → t = 2.'),
          M('Un vendedor gana $400.000 fijos más 5 % de sus ventas. ¿Cuánto debe vender para ganar $650.000?', ['$5.000.000', '$12.500.000', '$1.250.000', '$250.000'], '400.000 + 0,05v = 650.000 → 0,05v = 250.000 → v = 5.000.000.'),
          N('La temperatura en °F se calcula como F = 1,8C + 32. ¿A cuántos °C equivalen 77 °F?', 25, '°C', '1,8C = 45 → C = 25.'),
          M('Para un paseo, el curso arrienda un bus de $180.000 y cobra $4.000 por alumno. ¿Cuántos alumnos deben ir como mínimo para no perder dinero?', ['45', '44', '40', '50'], '4.000n ≥ 180.000 → n ≥ 45.'),
          M('El largo de un terreno rectangular es el doble de su ancho. Si el perímetro es 120 m, ¿cuál es su área?', ['800 m²', '1.200 m²', '600 m²', '400 m²'], '2x + 2(2x) = 120 → x = 20; área = 20 · 40 = 800.'),
          T('Si 3(x − 2) = 3x − 6, la ecuación no tiene solución.', false, 'Es una identidad: se cumple para todo x.'),
          M('Pedro tiene $2.000 más que Juan y entre los dos tienen $15.000. ¿Cuánto tiene Pedro?', ['$8.500', '$6.500', '$7.500', '$9.000'], 'j + (j + 2.000) = 15.000 → j = 6.500; Pedro = 8.500.'),
          M('Si 5 − 2x = 3x − 10, entonces x² =', ['9', '3', '25', '−9'], '15 = 5x → x = 3 → x² = 9.'),
        ],
      },
    ],
  });

  // ---------- Sistemas de ecuaciones ----------
  RB.unit('m1f', {
    name: 'Sistemas de ecuaciones', desc: 'Sistemas lineales de 2×2 por sustitución, igualación y reducción; problemas y análisis de soluciones.', ic: 'grid', area: 'Álgebra',
    lessons: [
      {
        n: 'Métodos de resolución', ic: 'grid', items: [
          { t: 'info', ic: 'grid', title: 'Sistemas 2×2', txt: 'Dos ecuaciones con dos incógnitas. La solución es el par (x, y) que cumple **ambas** a la vez: gráficamente, el **punto de corte** de dos rectas.' },
          M('Resuelve: x + y = 10 · x − y = 4', ['x = 7, y = 3', 'x = 3, y = 7', 'x = 6, y = 4', 'x = 8, y = 2'], 'Sumando: 2x = 14 → x = 7; y = 3.'),
          M('Resuelve: 2x + y = 7 · x − y = 2', ['x = 3, y = 1', 'x = 1, y = 5', 'x = 2, y = 3', 'x = 4, y = −1'], 'Sumando: 3x = 9 → x = 3; y = 7 − 6 = 1.'),
          M('Resuelve: y = 2x · x + y = 9', ['x = 3, y = 6', 'x = 6, y = 3', 'x = 2, y = 7', 'x = 4, y = 5'], 'Sustitución: x + 2x = 9 → x = 3; y = 6.'),
          M('Resuelve: 3x + 2y = 12 · x − 2y = 4', ['x = 4, y = 0', 'x = 2, y = 3', 'x = 0, y = 6', 'x = 4, y = 2'], 'Sumando: 4x = 16 → x = 4; 4 − 2y = 4 → y = 0.'),
          N('Si x + 2y = 11 y x − y = 2, ¿cuánto vale y?', 3, '', 'Restando: 3y = 9 → y = 3.'),
          M('En el sistema 2x + 3y = 13 · 4x − y = 5, ¿cuánto vale x + y?', ['5', '4', '3', '6'], 'De la segunda: y = 4x − 5. Reemplazando: 2x + 12x − 15 = 13 → x = 2; y = 3; x + y = 5.'),
          M('¿Qué par es solución de x − 3y = 1 y 2x + y = 9?', ['(4, 1)', '(1, 4)', '(7, 2)', '(3, 3)'], '4 − 3 = 1 ✓ y 8 + 1 = 9 ✓.'),
          T('Para comprobar una solución hay que reemplazarla en las dos ecuaciones.', true, 'Debe cumplir ambas; cumplir solo una no basta.'),
          M('Si x + y = 12 y x − y = 2, ¿cuánto vale x · y?', ['35', '24', '20', '14'], 'x = 7, y = 5 → 35.'),
          P('Une cada método con su idea', [['Sustitución', 'Despejar una incógnita y reemplazarla en la otra ecuación'], ['Igualación', 'Despejar la misma incógnita en ambas e igualar'], ['Reducción', 'Sumar o restar ecuaciones para eliminar una incógnita']], 'Todos llegan a la misma solución.'),
        ],
      },
      {
        n: 'Problemas con sistemas', ic: 'pen', items: [
          M('En una granja hay gallinas y conejos: 20 cabezas y 56 patas. ¿Cuántos conejos hay?', ['8', '12', '10', '6'], 'g + c = 20 y 2g + 4c = 56 → 2c = 16 → c = 8.'),
          M('2 cuadernos y 3 lápices cuestan $4.300; 1 cuaderno y 2 lápices cuestan $2.400. ¿Cuánto cuesta un lápiz?', ['$500', '$1.400', '$700', '$300'], 'Duplicando la segunda: 2c + 4l = 4.800. Restando: l = 500.'),
          M('La suma de dos números es 50 y su diferencia es 14. ¿Cuál es el mayor?', ['32', '36', '18', '25'], 'x + y = 50, x − y = 14 → 2x = 64 → x = 32.'),
          M('Entradas al cine: adulto $5.000 y niño $3.000. Se vendieron 100 entradas y se recaudaron $380.000. ¿Cuántas entradas de niño se vendieron?', ['60', '40', '50', '76'], 'a + n = 100 y 5.000a + 3.000n = 380.000 → 5a + 3n = 380 → 2a = 80 → a = 40; n = 60.'),
          N('Hace 5 años, la edad de un padre era el triple de la de su hijo. Hoy suman 50 años. ¿Qué edad tiene el hijo hoy?', 15, 'años', 'p + h = 50 y p − 5 = 3(h − 5) → p = 3h − 10 → 4h − 10 = 50 → h = 15.'),
          M('Un número de dos cifras: la suma de sus cifras es 9 y la cifra de las decenas es el doble de la de las unidades. ¿Cuál es el número?', ['63', '36', '54', '72'], 'd + u = 9 y d = 2u → 3u = 9 → u = 3, d = 6.'),
          M('Una mezcla de 10 kg de café cuesta $62.000 en total. Tiene café de $8.000 el kg y de $5.000 el kg. ¿Cuántos kg del más caro tiene?', ['4 kg', '6 kg', '5 kg', '3 kg'], 'x + y = 10 y 8x + 5y = 62 (en miles). Reemplazando y = 10 − x: 8x + 50 − 5x = 62 → 3x = 12 → x = 4.'),
          T('Un sistema puede plantearse cuando un problema tiene dos cantidades desconocidas relacionadas por dos condiciones.', true, 'Cada condición del enunciado da una ecuación.'),
        ],
      },
      {
        n: 'Análisis de soluciones', ic: 'func', items: [
          M('¿Cuántas soluciones tiene el sistema x + y = 3 · 2x + 2y = 6?', ['Infinitas', 'Ninguna', 'Una', 'Dos'], 'La segunda es la primera multiplicada por 2: son la misma recta.'),
          M('¿Cuántas soluciones tiene el sistema x + y = 3 · x + y = 5?', ['Ninguna', 'Infinitas', 'Una', 'Dos'], 'Son rectas paralelas: la misma suma no puede valer 3 y 5.'),
          M('Gráficamente, un sistema con solución única corresponde a:', ['Dos rectas que se cortan en un punto', 'Dos rectas paralelas', 'Dos rectas coincidentes', 'Una recta y una parábola'], 'El punto de corte es la solución.'),
          P('Une cada caso con su representación gráfica', [['Solución única', 'Rectas que se cortan'], ['Sin solución', 'Rectas paralelas distintas'], ['Infinitas soluciones', 'Rectas coincidentes']], 'Comparar las pendientes ayuda a decidirlo sin resolver.'),
          M('¿Para qué valor de k el sistema 2x + y = 4 · kx + y = 1 no tiene solución?', ['k = 2', 'k = 4', 'k = 1', 'k = −2'], 'Con k = 2 ambas rectas tienen pendiente −2 y distinto intercepto: paralelas.'),
          T('Si dos rectas tienen distinta pendiente, el sistema tiene exactamente una solución.', true, 'Rectas con distinta inclinación siempre se cortan en un único punto.'),
          M('Las rectas y = 2x + 1 e y = −x + 4 se cortan en:', ['(1, 3)', '(3, 1)', '(0, 1)', '(2, 5)'], '2x + 1 = −x + 4 → 3x = 3 → x = 1; y = 3.'),
          M('¿Qué sistema tiene infinitas soluciones?', ['x − y = 1 · 3x − 3y = 3', 'x − y = 1 · x − y = 2', 'x + y = 1 · x − y = 1', 'x = 1 · y = 1'], 'La segunda ecuación es la primera multiplicada por 3.'),
        ],
      },
    ],
  });
})();
