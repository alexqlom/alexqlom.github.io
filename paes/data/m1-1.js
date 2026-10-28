// Matemática M1 (1): números enteros y racionales; porcentajes y proporcionalidad.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Enteros y racionales ----------
  RB.unit('m1a', {
    name: 'Números enteros y racionales', desc: 'Reglas de los signos, prioridad de operaciones, fracciones, decimales y orden.', ic: 'calc', area: 'Números',
    lessons: [
      {
        n: 'Operaciones con enteros', ic: 'calc', items: [
          { t: 'info', ic: 'calc', title: 'Reglas de los signos', txt: 'Al **multiplicar o dividir**: signos iguales dan **positivo** y signos distintos dan **negativo**. Restar un negativo es **sumar**: a − (−b) = a + b.' },
          M('−8 + 5 − (−3) =', ['0', '−6', '−10', '16'], '−8 + 5 = −3; luego −3 − (−3) = −3 + 3 = 0.'),
          M('(−4) · (−6) : (−3) =', ['−8', '8', '−2', '2'], '(−4)·(−6) = 24 y 24 : (−3) = −8.'),
          M('12 − 3 · (2 − 6) =', ['24', '−36', '36', '0'], 'Primero el paréntesis: 2 − 6 = −4. Luego 3 · (−4) = −12. Finalmente 12 − (−12) = 24.'),
          M('El valor de −2² + (−2)² es:', ['0', '8', '−8', '4'], '−2² = −4, porque el exponente afecta solo al 2. En cambio (−2)² = 4. La suma es 0.'),
          N('Calcula: −15 + 4 · 3 − (−7)', 4, '', 'Primero la multiplicación: 4 · 3 = 12. Luego −15 + 12 + 7 = 4.'),
          T('El producto de un número par de factores negativos es positivo.', true, 'Los negativos se "cancelan" de a pares: (−)(−) = +.'),
          M('Si a = −3 y b = 2, ¿cuánto vale a² − 2ab + b?', ['23', '−7', '11', '19'], 'a² = 9; −2ab = −2(−3)(2) = 12; 9 + 12 + 2 = 23.'),
          M('En Punta Arenas la temperatura era −4 °C a las 6:00 y subió 9 °C hasta el mediodía. ¿Qué temperatura había al mediodía?', ['5 °C', '13 °C', '−13 °C', '−5 °C'], '−4 + 9 = 5.'),
          O('Ordena de menor a mayor', ['−7', '−3', '0', '2', '5'], 'En los negativos, mientras más lejos del cero, menor es el número.'),
          M('[−6 + 2 · (−3)] : (−4) =', ['3', '−3', '12', '1'], '2 · (−3) = −6; −6 + (−6) = −12; −12 : (−4) = 3.'),
        ],
      },
      {
        n: 'Fracciones y decimales', ic: 'grid', items: [
          M('2/3 + 1/4 =', ['11/12', '3/7', '3/12', '2/12'], 'Con denominador común 12: 8/12 + 3/12 = 11/12. Nunca se suman los denominadores.'),
          M('3/5 · 10/9 =', ['2/3', '13/14', '30/14', '1/3'], '3·10 = 30 y 5·9 = 45; 30/45 = 2/3.'),
          M('(3/4) : (9/8) =', ['2/3', '27/32', '3/2', '1/6'], 'Dividir es multiplicar por el inverso: 3/4 · 8/9 = 24/36 = 2/3.'),
          M('0,25 + 1/2 =', ['3/4', '1/3', '2/6', '0,52'], '0,25 = 1/4; 1/4 + 2/4 = 3/4.'),
          M('El decimal periódico 0,444... escrito como fracción es:', ['4/9', '4/10', '2/5', '4/99'], 'Periódico puro de una cifra: el período sobre 9.'),
          M('El decimal semiperiódico 0,1666... es igual a:', ['1/6', '16/99', '1/16', '15/99'], '(16 − 1)/90 = 15/90 = 1/6.'),
          M('1 − 2/5 · 3/4 =', ['7/10', '9/20', '3/20', '1/20'], 'Primero la multiplicación: 2/5 · 3/4 = 3/10. Luego 1 − 3/10 = 7/10. 9/20 sale si restas antes de multiplicar.'),
          N('Calcula 0,3 · 0,2 (como decimal)', 0.06, '', '3 · 2 = 6 y en total hay dos cifras decimales: 0,06.'),
          M('¿Qué fracción es equivalente a 18/24?', ['3/4', '2/3', '9/16', '6/9'], 'Dividiendo numerador y denominador por 6: 3/4.'),
          T('0,999... (periódico) es igual a 1.', true, '0,999... = 9/9 = 1.'),
          F('Al dividir 7 entre 4 se obtiene el decimal ___.', ['1,75', '1,4', '0,57'], '7 : 4 = 1,75.'),
        ],
      },
      {
        n: 'Orden y comparación', ic: 'list', items: [
          M('¿Cuál de los siguientes números es el mayor?', ['3/4', '0,7', '5/8', '0,72'], 'En decimales: 3/4 = 0,75; 5/8 = 0,625. El mayor es 0,75.'),
          M('¿Cuál de los siguientes números es el menor?', ['−5/4', '−1', '−0,9', '−3/4'], '−5/4 = −1,25 es el más alejado del cero hacia la izquierda.'),
          M('¿Qué número está entre 1/3 y 1/2?', ['2/5', '1/4', '3/5', '1/6'], '1/3 ≈ 0,33 y 1/2 = 0,5; 2/5 = 0,4 está entre ellos.'),
          O('Ordena de menor a mayor', ['−2/3', '−1/2', '1/5', '0,3', '1/2'], '−0,67 < −0,5 < 0,2 < 0,3 < 0,5.'),
          M('Si a = 2/3, b = 3/5 y c = 5/8, ¿cuál es el orden correcto?', ['b < c < a', 'a < b < c', 'c < b < a', 'b < a < c'], 'a ≈ 0,667; b = 0,6; c = 0,625.'),
          T('Entre dos números racionales distintos siempre existe otro número racional.', true, 'Por ejemplo, su promedio. Por eso se dice que los racionales son densos.'),
          M('El promedio entre 1/4 y 3/4 es:', ['1/2', '1', '3/8', '2/3'], '(1/4 + 3/4) : 2 = 1 : 2 = 1/2.'),
          M('Si x es un número entre 0 y 1, ¿cuál afirmación es siempre verdadera?', ['x² < x', 'x² > x', '1/x < 1', '√x < x'], 'Con x = 1/2: x² = 1/4, que es menor. En cambio 1/x = 2 > 1 y √x ≈ 0,7 > x.'),
          M('¿Cuál de estas desigualdades es verdadera?', ['−3 < −2', '−3 > −2', '−1/2 < −1', '0 < −0,1'], 'En la recta numérica, −3 está a la izquierda de −2.'),
          P('Une cada fracción con su decimal', [['1/4', '0,25'], ['3/5', '0,6'], ['1/8', '0,125'], ['2/3', '0,666...']], 'Para convertir, divide el numerador por el denominador.'),
        ],
      },
      {
        n: 'Problemas con racionales', ic: 'target', items: [
          M('Una receta usa 3/4 kg de harina para 6 panes. ¿Cuánta harina se necesita para 10 panes?', ['5/4 kg', '1 kg', '3/2 kg', '9/8 kg'], 'Por pan: 3/4 : 6 = 1/8 kg. Para 10 panes: 10/8 = 5/4 kg.'),
          M('Camila gastó 2/5 de su dinero en ropa y 1/3 del total en comida. ¿Qué fracción del dinero le queda?', ['4/15', '3/8', '11/15', '2/15'], 'Gastó 6/15 + 5/15 = 11/15; le quedan 4/15.'),
          M('Pedro gastó 1/4 de su sueldo en arriendo y 1/3 de lo que le quedó en comida. ¿Qué fracción del sueldo le queda?', ['1/2', '5/12', '1/4', '7/12'], 'Tras el arriendo quedan 3/4. Comida: 1/3 de 3/4 = 1/4. Quedan 3/4 − 1/4 = 1/2.'),
          N('Un estanque de 240 litros está a 3/8 de su capacidad. ¿Cuántos litros tiene?', 90, 'L', '240 · 3/8 = 90.'),
          M('Una cuenta bancaria tenía −$15.000 (sobregiro). Se depositaron $40.000 y luego se pagaron $12.000. ¿Cuál es el saldo?', ['$13.000', '$37.000', '−$13.000', '$67.000'], '−15.000 + 40.000 − 12.000 = 13.000.'),
          M('Un submarino está a −120 m y asciende 2/3 de esa profundidad. ¿A qué profundidad queda?', ['−40 m', '−80 m', '80 m', '−200 m'], 'Sube 2/3 · 120 = 80 m: −120 + 80 = −40 m.'),
          N('Si 2/3 de un número es 18, ¿cuál es el número?', 27, '', 'x · 2/3 = 18, entonces x = 18 : 2/3 = 27.'),
          M('En un curso de 36 estudiantes, 5/9 son mujeres. ¿Cuántos hombres hay?', ['16', '20', '14', '18'], 'Mujeres: 36 · 5/9 = 20. Hombres: 36 − 20 = 16.'),
          M('Tres amigos se reparten una pizza: el primero come 1/3, el segundo 1/4 y el tercero el resto. ¿Qué fracción come el tercero?', ['5/12', '7/12', '1/2', '1/3'], '1 − (4/12 + 3/12) = 5/12.'),
          M('¿Cuántos trozos de 3/8 m se pueden cortar de una cinta de 6 m?', ['16', '18', '2,25', '12'], '6 : 3/8 = 6 · 8/3 = 16.'),
        ],
      },
    ],
  });

  // ---------- Porcentajes y proporcionalidad ----------
  RB.unit('m1b', {
    name: 'Porcentajes y proporcionalidad', desc: 'Porcentajes, aumentos y descuentos, interés, proporcionalidad directa e inversa, razones y escalas.', ic: 'chart', area: 'Números',
    lessons: [
      {
        n: 'Porcentajes', ic: 'chart', items: [
          { t: 'info', ic: 'chart', title: 'Porcentaje', txt: 'p % significa **p de cada 100**: 15 % = 15/100 = 0,15. Para calcular el p % de un número, **multiplica por el decimal**: 15 % de 240 = 0,15 · 240.' },
          N('¿Cuánto es el 15 % de 240?', 36, '', '0,15 · 240 = 36.'),
          M('¿Qué porcentaje es 18 de 72?', ['25 %', '18 %', '40 %', '4 %'], '18/72 = 0,25 = 25 %.'),
          M('Un polerón cuesta $20.000 y tiene 30 % de descuento. ¿Cuánto se paga?', ['$14.000', '$6.000', '$17.000', '$26.000'], '20.000 · 0,7 = 14.000. $6.000 es el descuento, no el precio.'),
          M('Un precio sin IVA es $50.000. Con IVA (19 %), el precio final es:', ['$59.500', '$51.900', '$69.000', '$40.500'], '50.000 · 1,19 = 59.500.'),
          M('Si el 40 % de un número es 36, el número es:', ['90', '14,4', '76', '144'], '0,4 · x = 36 → x = 90.'),
          T('Aumentar un precio en 20 % equivale a multiplicarlo por 1,2.', true, 'p + 0,2p = 1,2p.'),
          M('Disminuir una cantidad en 15 % equivale a multiplicarla por:', ['0,85', '0,15', '1,15', '−0,15'], 'Queda el 85 %: 1 − 0,15 = 0,85.'),
          M('En un curso de 40 alumnos, 12 usan lentes. ¿Qué porcentaje NO usa lentes?', ['70 %', '30 %', '28 %', '12 %'], 'No usan: 28. 28/40 = 0,7 = 70 %.'),
          F('El 25 % de una cantidad equivale a ___ de ella.', ['un cuarto', 'un quinto', 'la mitad'], '25/100 = 1/4.'),
          N('Una camisa costaba $12.000 y ahora cuesta $15.000. ¿En qué porcentaje aumentó?', 25, '%', '(15.000 − 12.000) : 12.000 = 0,25 = 25 %. Siempre se divide por el valor inicial.'),
        ],
      },
      {
        n: 'Variaciones e interés', ic: 'coin', items: [
          M('Un precio sube 10 % y luego baja 10 %. El precio final, respecto del original:', ['Es 1 % menor', 'Es igual', 'Es 1 % mayor', 'Es 10 % menor'], '1,1 · 0,9 = 0,99: queda el 99 %.'),
          M('Un artículo cuesta $11.900 con IVA incluido (19 %). ¿Cuál es su precio sin IVA?', ['$10.000', '$9.639', '$9.900', '$10.100'], 'p · 1,19 = 11.900 → p = 10.000. Restar el 19 % del precio final da un resultado incorrecto.'),
          M('Después de un descuento del 25 %, un libro cuesta $9.000. ¿Cuál era su precio original?', ['$12.000', '$11.250', '$6.750', '$9.250'], 'p · 0,75 = 9.000 → p = 12.000.'),
          M('Un capital de $100.000 se invierte a interés simple del 5 % anual. ¿Cuánto interés genera en 3 años?', ['$15.000', '$15.762', '$5.000', '$115.000'], 'Interés simple: 100.000 · 0,05 · 3 = 15.000.'),
          M('Un capital de $100.000 se invierte a interés compuesto del 10 % anual. ¿Cuánto dinero habrá al cabo de 2 años?', ['$121.000', '$120.000', '$110.000', '$122.000'], '100.000 · 1,1² = 121.000. Con interés simple serían $120.000.'),
          M('Una población de 2.000 bacterias aumenta 50 % cada hora. ¿Cuántas habrá después de 2 horas?', ['4.500', '4.000', '3.000', '6.000'], '2.000 · 1,5 · 1,5 = 4.500.'),
          T('Dos descuentos sucesivos del 20 % equivalen a un descuento del 40 %.', false, '0,8 · 0,8 = 0,64: el descuento total es 36 %.'),
          M('El precio de la bencina subió de $1.250 a $1.300 por litro. ¿Cuál fue el aumento porcentual?', ['4 %', '5 %', '50 %', '3,8 %'], '50 : 1.250 = 0,04 = 4 %.'),
          N('Un producto cuesta $10.000. La tienda sube su precio 20 % y luego ofrece 20 % de descuento. ¿Cuánto cuesta al final?', 9600, '$', '10.000 · 1,2 · 0,8 = 9.600.'),
          M('¿Qué expresión representa el precio final de un producto de precio p con un recargo del 8 %?', ['1,08p', 'p + 8', '0,08p', 'p + 0,8p'], 'p + 0,08p = 1,08p.'),
        ],
      },
      {
        n: 'Proporcionalidad', ic: 'func', items: [
          { t: 'info', ic: 'func', title: 'Directa e inversa', txt: '**Directa**: el cociente y/x es constante (si una se duplica, la otra también). **Inversa**: el producto x·y es constante (si una se duplica, la otra se reduce a la mitad).' },
          S('Clasifica cada situación', ['Directa', 'Inversa'], [['Kilos de pan y precio a pagar', 0], ['Número de obreros y días para terminar una obra', 1], ['Velocidad y tiempo para una distancia fija', 1], ['Litros de bencina y kilómetros recorridos', 0], ['Número de personas y porción de torta para cada una', 1], ['Horas trabajadas y sueldo (pago por hora)', 0]], 'Pregúntate: si una aumenta, ¿la otra aumenta en la misma proporción o disminuye?'),
          M('Si 4 cuadernos cuestan $6.000, ¿cuánto cuestan 10 cuadernos?', ['$15.000', '$24.000', '$12.000', '$2.400'], 'Cada cuaderno: 1.500. Diez: 15.000.'),
          M('6 obreros construyen un muro en 10 días. ¿Cuántos días tardarían 15 obreros al mismo ritmo?', ['4', '25', '6', '9'], 'Es inversa: 6 · 10 = 60 días-obrero; 60 : 15 = 4.'),
          M('x e y son inversamente proporcionales. Si x = 3 cuando y = 12, ¿cuánto vale y cuando x = 9?', ['4', '36', '6', '1/4'], 'x·y = 36 → y = 36 : 9 = 4.'),
          M('En una proporcionalidad directa, si x = 5 entonces y = 20. ¿Cuál es la constante k = y/x?', ['4', '100', '1/4', '15'], 'k = 20/5 = 4.'),
          M('¿Qué gráfico corresponde a una proporcionalidad directa?', ['Una recta que pasa por el origen', 'Una hipérbola', 'Una recta que no pasa por el origen', 'Una parábola'], 'y = kx es una recta que pasa por (0, 0).'),
          T('En una proporcionalidad inversa, si una variable se duplica, la otra se reduce a la mitad.', true, 'El producto se mantiene constante.'),
          M('Un auto a 80 km/h demora 3 horas en un viaje. ¿Cuánto demoraría a 120 km/h?', ['2 horas', '4,5 horas', '2,5 horas', '1,5 horas'], 'La distancia es 240 km; a 120 km/h: 2 horas.'),
          M('¿Qué tabla muestra una proporcionalidad directa?', ['x: 2, 4, 6 · y: 5, 10, 15', 'x: 2, 4, 6 · y: 12, 6, 4', 'x: 2, 4, 6 · y: 4, 6, 8', 'x: 2, 4, 6 · y: 4, 16, 36'], 'y/x = 2,5 en todos los pares.'),
        ],
      },
      {
        n: 'Razones, repartos y escalas', ic: 'map', items: [
          M('La razón entre hombres y mujeres de un curso es 3 : 5. Si hay 40 estudiantes, ¿cuántas mujeres hay?', ['25', '15', '24', '20'], '3 + 5 = 8 partes; cada parte = 5; mujeres = 5 · 5 = 25.'),
          M('Se reparten $90.000 entre Ana y Beto en razón 2 : 7. ¿Cuánto recibe Beto?', ['$70.000', '$20.000', '$63.000', '$45.000'], '9 partes de 10.000; Beto recibe 7 partes.'),
          M('En un mapa de escala 1 : 50.000, dos ciudades están a 8 cm. ¿Cuál es la distancia real?', ['4 km', '40 km', '400 m', '0,4 km'], '8 · 50.000 = 400.000 cm = 4.000 m = 4 km.'),
          N('Si a : b = 3 : 4 y a = 12, ¿cuánto vale b?', 16, '', 'a/b = 3/4 → b = 12 · 4/3 = 16.'),
          M('Una mezcla tiene agua y jugo en razón 5 : 2. Si se usan 1,4 litros de jugo, ¿cuánta agua se usa?', ['3,5 L', '2,8 L', '0,56 L', '7 L'], 'Cada parte: 1,4 : 2 = 0,7 L. Agua: 5 · 0,7 = 3,5 L.'),
          M('Tres socios invierten $2, $3 y $5 millones. Si la ganancia de $20 millones se reparte proporcionalmente, ¿cuánto recibe quien invirtió $3 millones?', ['$6 millones', '$3 millones', '$10 millones', '$4 millones'], '10 partes de 2 millones; le tocan 3 partes.'),
          T('La razón 4 : 6 es equivalente a la razón 2 : 3.', true, 'Dividiendo ambos términos por 2.'),
          M('Si x/12 = 5/4, entonces x =', ['15', '9,6', '20', '3'], 'x = 12 · 5/4 = 15.'),
          M('Un plano tiene escala 1 : 100. Una pieza mide 3,5 cm en el plano. ¿Cuánto mide en la realidad?', ['3,5 m', '35 m', '35 cm', '0,35 m'], '3,5 · 100 = 350 cm = 3,5 m.'),
          M('En una encuesta, la razón entre quienes prefieren té y café es 2 : 3. Si 60 personas prefieren café, ¿cuántas prefieren té?', ['40', '90', '120', '30'], 'Cada parte = 20; té = 2 · 20 = 40.'),
        ],
      },
    ],
  });
})();
