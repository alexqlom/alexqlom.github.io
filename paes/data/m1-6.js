// Matemática M1 (6): estadística (tablas, gráficos, tendencia central y posición) y probabilidad.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Estadística ----------
  RB.unit('m1k', {
    name: 'Estadística', desc: 'Tablas de frecuencia, gráficos, media, mediana, moda, cuartiles, percentiles y diagrama de caja.', ic: 'chart', area: 'Datos y azar',
    lessons: [
      {
        n: 'Tablas y gráficos', ic: 'chart', items: [
          { t: 'info', ic: 'chart', title: 'Frecuencias', txt: '**Absoluta (f)**: cuántas veces aparece un dato. **Relativa**: f / n. **Porcentual**: relativa · 100. **Acumulada**: suma de las frecuencias hasta ese dato.' },
          M('En un curso de 40 estudiantes, 10 prefieren fútbol. ¿Cuál es la frecuencia relativa de "fútbol"?', ['0,25', '10', '0,10', '4'], '10/40 = 0,25.'),
          M('Una tabla de notas indica: nota 4 (f = 3), nota 5 (f = 7), nota 6 (f = 8) y nota 7 (f = 2). ¿Cuántos estudiantes hay?', ['20', '4', '22', '10'], '3 + 7 + 8 + 2 = 20.'),
          M('En esa tabla, ¿cuál es la frecuencia acumulada de la nota 5?', ['10', '7', '3', '17'], 'Hasta la nota 5: 3 + 7 = 10.'),
          M('En esa tabla, ¿qué porcentaje de estudiantes obtuvo nota 6 o más?', ['50 %', '40 %', '10 %', '80 %'], '(8 + 2)/20 = 0,5.'),
          M('En un gráfico circular, una categoría con el 25 % de los datos ocupa un ángulo de:', ['90°', '25°', '45°', '120°'], '25 % de 360° = 90°.'),
          M('En un gráfico circular de 200 encuestados, el sector "Netflix" mide 108°. ¿Cuántas personas eligieron Netflix?', ['60', '108', '54', '30'], '108/360 = 0,3; 0,3 · 200 = 60.'),
          T('La suma de todas las frecuencias relativas es 1.', true, 'Equivale al 100 % de los datos.'),
          M('¿Qué gráfico es más adecuado para mostrar cómo cambia la temperatura durante un día?', ['Un gráfico de líneas', 'Un gráfico circular', 'Un diagrama de caja', 'Un pictograma'], 'Los gráficos de líneas muestran la evolución en el tiempo.'),
          M('La frecuencia acumulada hasta la categoría C es 34 y hasta la categoría B (anterior) es 21. ¿Cuál es la frecuencia absoluta de C?', ['13', '34', '55', '21'], '34 − 21 = 13.'),
        ],
      },
      {
        n: 'Media, mediana y moda', ic: 'target', items: [
          { t: 'info', ic: 'target', title: 'Tendencia central', txt: '**Media**: suma de los datos / n. **Mediana**: el dato del centro con los datos **ordenados** (si n es par, el promedio de los dos centrales). **Moda**: el dato más repetido.' },
          M('La media de 4, 7, 8, 5 y 6 es:', ['6', '5', '7', '30'], '30/5 = 6.'),
          M('La mediana de 3, 9, 1, 7, 5 es:', ['5', '7', '3', '9'], 'Ordenados: 1, 3, 5, 7, 9. El centro es 5.'),
          M('La mediana de 2, 8, 4, 10 es:', ['6', '4', '8', '5'], 'Ordenados: 2, 4, 8, 10. Promedio de 4 y 8 = 6.'),
          M('La moda de 3, 5, 5, 6, 7, 7, 7, 9 es:', ['7', '5', '6', '3'], 'El 7 aparece tres veces.'),
          M('Las notas de Ana son 5,0; 6,0 y 4,0. ¿Qué nota necesita en la cuarta prueba para tener promedio 5,5?', ['7,0', '6,0', '5,5', '6,5'], 'Necesita sumar 4 · 5,5 = 22. Tiene 15. Le faltan 7,0.'),
          M('Si a cada dato de un conjunto se le suma 3, la media:', ['Aumenta en 3', 'No cambia', 'Se triplica', 'Aumenta en 9'], 'Todos suben 3, así que el promedio también.'),
          M('Los sueldos de 5 personas son $500.000, $520.000, $480.000, $510.000 y $3.000.000. ¿Qué medida representa mejor el sueldo típico?', ['La mediana', 'La media', 'La suma', 'El valor máximo'], 'El dato atípico de $3.000.000 infla la media; la mediana ($510.000) no se ve afectada.'),
          N('La media de 5 números es 8. ¿Cuál es su suma?', 40, '', 'Suma = media · n = 8 · 5.'),
          M('En la tabla: nota 4 (f = 3), nota 5 (f = 7), nota 6 (f = 8) y nota 7 (f = 2), ¿cuál es la moda?', ['6', '5', '8', '7'], 'La nota con mayor frecuencia (8) es el 6. La moda es el dato, no la frecuencia.'),
          M('En esa misma tabla, ¿cuál es la media?', ['5,45', '5,5', '5', '6'], '(4·3 + 5·7 + 6·8 + 7·2)/20 = 109/20 = 5,45.'),
          T('Un conjunto de datos puede tener más de una moda.', true, 'Si dos datos empatan en la mayor frecuencia, es bimodal.'),
        ],
      },
      {
        n: 'Cuartiles, percentiles y caja', ic: 'box', items: [
          { t: 'info', ic: 'box', title: 'Medidas de posición', txt: 'Los **cuartiles** dividen los datos ordenados en 4 partes: Q1 (25 %), Q2 = mediana (50 %) y Q3 (75 %). El **percentil k** deja bajo él al k % de los datos. **Rango** = máximo − mínimo.' },
          M('En los datos 2, 4, 5, 7, 8, 10, 12, el rango es:', ['10', '12', '7', '8'], '12 − 2 = 10.'),
          M('En los datos ordenados 1, 3, 4, 6, 8, 9, 11, la mediana (Q2) es:', ['6', '4', '8', '5'], 'Son 7 datos: el cuarto es el central.'),
          M('En los datos ordenados 1, 3, 4, 6, 8, 9, 11, ¿cuál es el primer cuartil (Q1)?', ['3', '4', '1', '2'], 'Es la mediana de la mitad inferior (1, 3, 4): el 3.'),
          M('El percentil 50 corresponde a:', ['La mediana', 'La media', 'La moda', 'El tercer cuartil'], 'Deja la mitad de los datos bajo él.'),
          M('Un estudiante quedó en el percentil 80 de un ensayo. Eso significa que:', ['Su puntaje fue mayor o igual que el del 80 % de los estudiantes', 'Respondió bien el 80 % de las preguntas', 'Obtuvo 80 puntos', 'Está en el 20 % más bajo'], 'El percentil indica posición respecto de los demás, no el porcentaje de logro.'),
          M('En un diagrama de caja, la "caja" abarca:', ['Desde Q1 hasta Q3: el 50 % central de los datos', 'Desde el mínimo hasta el máximo', 'Solo la mediana', 'Desde la media hasta la moda'], 'Los "bigotes" llegan al mínimo y al máximo.'),
          M('Si Q1 = 20 y Q3 = 35, el rango intercuartil es:', ['15', '55', '27,5', '35'], 'Q3 − Q1 = 15.'),
          T('El segundo cuartil siempre coincide con la mediana.', true, 'Ambos dejan el 50 % de los datos a cada lado.'),
          M('¿Qué porcentaje de los datos está entre Q1 y Q3?', ['50 %', '25 %', '75 %', '100 %'], 'De 25 % a 75 %.'),
          M('Si todos los datos se multiplican por 2, el rango:', ['Se duplica', 'No cambia', 'Aumenta en 2', 'Se cuadruplica'], 'El máximo y el mínimo se duplican, y su diferencia también.'),
        ],
      },
      {
        n: 'Interpretar datos', ic: 'search', items: [
          M('El promedio de un curso de 30 alumnos es 5,2 y el de otro curso de 20 alumnos es 6,0. ¿Cuál es el promedio de los 50 alumnos?', ['5,52', '5,6', '5,5', '11,2'], 'Promedio ponderado: (30 · 5,2 + 20 · 6,0)/50 = 276/50 = 5,52.'),
          M('A un conjunto de 9 datos con media 10 se le agrega el dato 20. ¿Cuál es la nueva media?', ['11', '15', '10', '12'], 'Suma: 90 + 20 = 110; 110/10 = 11.'),
          M('Si se elimina un dato muy alto (atípico), ¿qué medida suele cambiar más?', ['La media', 'La mediana', 'La moda', 'Ninguna'], 'La media es sensible a los valores extremos.'),
          M('Dos cursos tienen promedio 5,5, pero en el A las notas van de 5,0 a 6,0 y en el B de 2,5 a 7,0. ¿Qué se puede afirmar?', ['El curso B tiene mayor dispersión', 'El curso A tiene mayor dispersión', 'Ambos tienen la misma dispersión', 'El curso B tiene mejor rendimiento'], 'Mismo promedio, pero las notas de B están más repartidas.'),
          M('Un gráfico de barras tiene el eje vertical que empieza en 90 en vez de 0. ¿Qué efecto puede producir?', ['Exagerar visualmente las diferencias', 'Mostrar los datos sin distorsión', 'Eliminar la moda', 'Cambiar la media'], 'Diferencias pequeñas parecen enormes: es una distorsión frecuente.'),
          N('Las edades de 4 hermanos suman 48 años. Si nace un quinto hermano, ¿cuál es el nuevo promedio de edad?', 9.6, 'años', '48/5 = 9,6.'),
          T('La media siempre es uno de los datos del conjunto.', false, 'La media de 1 y 2 es 1,5, que no está entre los datos.'),
          M('En una encuesta a 50 personas, 18 prefieren té, 22 café y el resto jugo. ¿Qué porcentaje prefiere jugo?', ['20 %', '10 %', '40 %', '36 %'], 'Jugo: 50 − 40 = 10; 10/50 = 20 %.'),
        ],
      },
    ],
  });

  // ---------- Probabilidad ----------
  RB.unit('m1l', {
    name: 'Probabilidad', desc: 'Regla de Laplace, espacio muestral, complemento, reglas aditiva y multiplicativa, y conteo.', ic: 'dice', area: 'Datos y azar',
    lessons: [
      {
        n: 'Regla de Laplace', ic: 'dice', items: [
          { t: 'info', ic: 'dice', title: 'Laplace', txt: 'Si todos los resultados son igual de probables: **P(A) = casos favorables / casos posibles**. Siempre 0 ≤ P(A) ≤ 1, y **P(no A) = 1 − P(A)**.' },
          M('Al lanzar un dado, ¿cuál es la probabilidad de obtener un número par?', ['1/2', '1/3', '1/6', '2/3'], 'Pares: 2, 4, 6. Son 3 de 6.'),
          M('Al lanzar un dado, ¿cuál es la probabilidad de obtener un número mayor que 4?', ['1/3', '1/2', '2/3', '1/6'], 'Mayores que 4: 5 y 6. Son 2 de 6.'),
          M('En una bolsa hay 3 bolitas rojas, 5 azules y 2 verdes. ¿Cuál es la probabilidad de sacar una azul?', ['1/2', '5/8', '1/5', '3/10'], '5 de 10.'),
          M('Con la misma bolsa, ¿cuál es la probabilidad de NO sacar una roja?', ['7/10', '3/10', '3/7', '1/3'], '1 − 3/10 = 7/10.'),
          M('¿Cuál de estos valores NO puede ser una probabilidad?', ['1,2', '0', '1', '0,75'], 'Una probabilidad no puede ser mayor que 1.'),
          T('Un suceso imposible tiene probabilidad 0.', true, 'Y un suceso seguro tiene probabilidad 1.'),
          M('Al lanzar una moneda dos veces, ¿cuántos resultados posibles hay?', ['4', '2', '3', '6'], 'CC, CS, SC y SS.'),
          M('Al lanzar dos monedas, ¿cuál es la probabilidad de obtener exactamente una cara?', ['1/2', '1/4', '3/4', '1/3'], 'CS y SC: 2 de 4.'),
          M('Si P(A) = 0,35, entonces P(no A) =', ['0,65', '0,35', '1,35', '0'], '1 − 0,35.'),
          N('En una rifa de 200 números, Pedro compró 8. ¿Cuál es la probabilidad de que gane, en porcentaje?', 4, '%', '8/200 = 0,04 = 4 %.'),
        ],
      },
      {
        n: 'Espacio muestral', ic: 'grid', items: [
          M('Al lanzar dos dados, ¿cuántos resultados posibles hay?', ['36', '12', '6', '11'], '6 · 6 = 36.'),
          M('Al lanzar dos dados, ¿cuál es la probabilidad de que la suma sea 7?', ['1/6', '1/12', '7/36', '1/36'], '(1,6), (2,5), (3,4), (4,3), (5,2), (6,1): 6 de 36.'),
          M('Al lanzar dos dados, ¿cuál es la probabilidad de que la suma sea 12?', ['1/36', '1/12', '1/6', '1/18'], 'Solo (6, 6).'),
          M('Al lanzar dos dados, ¿cuál es la probabilidad de obtener dos números iguales?', ['1/6', '1/36', '1/12', '1/3'], 'Seis dobles de 36 resultados.'),
          M('Al lanzar dos dados, ¿cuál es la suma más probable?', ['7', '6', '12', '8'], 'Tiene 6 combinaciones, más que cualquier otra suma.'),
          M('Al lanzar tres monedas, ¿cuál es la probabilidad de obtener tres caras?', ['1/8', '1/3', '1/6', '3/8'], 'Un caso de 2³ = 8.'),
          M('Al lanzar tres monedas, ¿cuál es la probabilidad de obtener al menos una cara?', ['7/8', '1/8', '1/2', '3/8'], '1 − P(ninguna cara) = 1 − 1/8.'),
          T('Al lanzar dos dados, obtener suma 2 es igual de probable que obtener suma 7.', false, 'Suma 2 tiene 1 caso; suma 7 tiene 6.'),
          M('Se elige al azar un número del 1 al 20. ¿Cuál es la probabilidad de que sea múltiplo de 3?', ['3/10', '1/3', '1/4', '6/19'], 'Múltiplos: 3, 6, 9, 12, 15, 18. Son 6 de 20.'),
          M('Se elige al azar una letra de la palabra BANANA. ¿Cuál es la probabilidad de que sea una A?', ['1/2', '1/3', '1/6', '3/5'], 'Hay 3 A en 6 letras.'),
        ],
      },
      {
        n: 'Reglas de probabilidad', ic: 'calc', items: [
          { t: 'info', ic: 'calc', title: '"O" e "Y"', txt: '**P(A o B) = P(A) + P(B) − P(A y B)**. Si A y B son excluyentes (no pueden ocurrir juntos), se suman. Si son **independientes**: **P(A y B) = P(A) · P(B)**.' },
          M('Al lanzar un dado, ¿cuál es la probabilidad de obtener un 2 o un 5?', ['1/3', '1/6', '1/36', '2/3'], 'Son excluyentes: 1/6 + 1/6.'),
          M('Al sacar una carta de una baraja inglesa de 52, ¿cuál es la probabilidad de sacar un as o un corazón?', ['16/52', '17/52', '4/52', '13/52'], '4 ases + 13 corazones − 1 as de corazones contado dos veces.'),
          M('Se lanzan una moneda y un dado. ¿Cuál es la probabilidad de obtener cara y un 6?', ['1/12', '1/8', '2/3', '7/12'], 'Independientes: 1/2 · 1/6.'),
          M('La probabilidad de que llueva el lunes es 0,3 y el martes 0,4, de forma independiente. ¿Cuál es la probabilidad de que llueva ambos días?', ['0,12', '0,7', '0,1', '0,35'], '0,3 · 0,4.'),
          M('Una bolsa tiene 4 bolitas rojas y 6 azules. Se sacan dos, con reposición. ¿Cuál es la probabilidad de que ambas sean rojas?', ['4/25', '2/15', '1/5', '2/5'], '4/10 · 4/10 = 16/100.'),
          M('La misma bolsa, pero sin reposición. ¿Cuál es la probabilidad de que ambas sean rojas?', ['2/15', '4/25', '1/5', '4/15'], '4/10 · 3/9 = 12/90. Al no devolverla, quedan 3 rojas de 9.'),
          T('Si dos sucesos son mutuamente excluyentes, no pueden ocurrir al mismo tiempo.', true, 'Por eso P(A y B) = 0.'),
          M('Un control tiene 3 preguntas de verdadero o falso que se responden al azar. ¿Cuál es la probabilidad de acertar todas?', ['1/8', '1/3', '3/8', '1/6'], '(1/2)³.'),
          M('Si P(A) = 0,5, P(B) = 0,4 y P(A y B) = 0,2, entonces P(A o B) =', ['0,7', '0,9', '0,2', '0,5'], '0,5 + 0,4 − 0,2.'),
          M('Se lanza un dado dos veces. ¿Cuál es la probabilidad de obtener un 6 en ambos lanzamientos?', ['1/36', '1/6', '1/12', '1/3'], '1/6 · 1/6.'),
        ],
      },
      {
        n: 'Contar casos', ic: 'list', items: [
          M('Tienes 3 poleras y 4 pantalones. ¿De cuántas formas distintas te puedes vestir?', ['12', '7', '34', '24'], 'Principio multiplicativo: 3 · 4.'),
          M('¿Cuántos códigos de 3 dígitos (del 0 al 9) se pueden formar si los dígitos se pueden repetir?', ['1.000', '720', '30', '999'], '10 · 10 · 10.'),
          M('Un menú tiene 2 entradas, 3 platos de fondo y 2 postres. ¿Cuántos menús distintos hay?', ['12', '7', '6', '36'], '2 · 3 · 2.'),
          M('En un diagrama de árbol de dos lanzamientos de una moneda, ¿cuántas ramas finales hay?', ['4', '2', '3', '8'], '2 · 2.'),
          M('Una clave tiene una letra (de 26) seguida de un dígito (de 10). ¿Cuántas claves distintas hay?', ['260', '36', '2.600', '26'], '26 · 10.'),
          T('Si una acción tiene m opciones y otra tiene n, juntas tienen m · n opciones.', true, 'Es el principio multiplicativo.'),
          M('Se lanzan una moneda y un dado. ¿Cuántos resultados tiene el espacio muestral?', ['12', '8', '6', '2'], '2 · 6.'),
          M('Ana elige al azar una de 3 poleras y uno de 4 pantalones. ¿Cuál es la probabilidad de que elija la polera roja y el jeans?', ['1/12', '1/7', '2/7', '1/4'], 'Hay 12 combinaciones y solo 1 favorable.'),
        ],
      },
    ],
  });
})();
