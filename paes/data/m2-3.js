// Matemática M2 (3): combinatoria y probabilidad condicional; dispersión, binomial y normal.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Combinatoria y probabilidad condicional ----------
  RB.unit('m2e', {
    name: 'Combinatoria y probabilidad condicional', desc: 'Factorial, permutaciones, variaciones, combinaciones y probabilidad condicional con tablas y árboles.', ic: 'dice', area: 'Datos y azar',
    lessons: [
      {
        n: 'Contar con orden y sin orden', ic: 'list', items: [
          { t: 'info', ic: 'list', title: 'Técnicas de conteo', txt: 'n! = n·(n−1)·…·1. **Permutación**: ordenar n elementos: n!. **Variación** (importa el orden): n!/(n−k)!. **Combinación** (no importa el orden): C(n, k) = n!/(k!·(n−k)!).' },
          M('5! =', ['120', '25', '60', '720'], '5 · 4 · 3 · 2 · 1 = 120.'),
          M('¿De cuántas formas se pueden ordenar 4 libros distintos en un estante?', ['24', '16', '4', '12'], '4! = 24.'),
          M('¿De cuántas formas se pueden elegir presidente y secretario entre 6 personas?', ['30', '15', '36', '12'], 'Importa el orden (cargos distintos): 6 · 5.'),
          M('¿De cuántas formas se puede elegir una comisión de 2 personas entre 6?', ['15', '30', '12', '36'], 'No importa el orden: C(6, 2) = 30/2 = 15.'),
          M('¿Cuántos grupos de 3 personas se pueden formar con 5 personas?', ['10', '60', '15', '125'], 'C(5, 3) = 10.'),
          M('¿Cuántas "palabras" distintas (con o sin sentido) se forman con las letras de AMOR?', ['24', '4', '16', '12'], '4 letras distintas: 4!.'),
          M('¿Cuántas "palabras" distintas se forman con las letras de CASA?', ['12', '24', '6', '4'], 'La A se repite: 4!/2! = 12.'),
          T('En una combinación, el orden de los elementos no importa.', true, 'Elegir {Ana, Beto} es lo mismo que {Beto, Ana}.'),
          M('C(7, 2) =', ['21', '42', '14', '49'], '7 · 6 / 2 = 21.'),
          N('Compiten 8 corredores. ¿De cuántas formas se pueden repartir los puestos 1°, 2° y 3°?', 336, '', '8 · 7 · 6 = 336.'),
          P('Une cada situación con la técnica de conteo', [['Ordenar 5 personas en una fila', 'Permutación'], ['Elegir capitán y subcapitán de 11', 'Variación'], ['Elegir 3 delegados de un curso', 'Combinación'], ['Códigos de 4 dígitos con repetición', 'Principio multiplicativo']], 'Pregúntate: ¿importa el orden?, ¿se usan todos?, ¿se puede repetir?'),
        ],
      },
      {
        n: 'Probabilidad con conteo', ic: 'dice', items: [
          M('Se eligen al azar 2 estudiantes de un grupo de 4 mujeres y 3 hombres. ¿Cuál es la probabilidad de que ambos sean mujeres?', ['2/7', '4/7', '16/49', '1/2'], 'C(4, 2)/C(7, 2) = 6/21.'),
          M('En un juego de azar se eligen 14 números de 25. ¿Qué expresión da el total de cartones distintos?', ['C(25, 14)', '25!/14!', '25 · 14', '14!'], 'No importa el orden de los números.'),
          M('Se ordenan al azar las letras A, B y C. ¿Cuál es la probabilidad de que queden en orden alfabético?', ['1/6', '1/3', '1/2', '1/9'], 'Hay 3! = 6 órdenes y solo uno es ABC.'),
          M('Una clave de 3 dígitos distintos se elige al azar. ¿Cuál es la probabilidad de que sea 123?', ['1/720', '1/1.000', '1/120', '1/10'], 'Variaciones: 10 · 9 · 8 = 720.'),
          M('De una baraja de 52 cartas se sacan 2 sin reposición. ¿Cuál es la probabilidad de que ambas sean ases?', ['1/221', '1/169', '4/52', '1/26'], '4/52 · 3/51 = 1/221.'),
          T('El número de formas de elegir 3 de 10 es igual al número de formas de elegir 7 de 10.', true, 'C(10, 3) = C(10, 7): elegir los 3 que entran equivale a elegir los 7 que quedan fuera.'),
          M('Se lanzan 4 monedas. ¿Cuál es la probabilidad de obtener exactamente 2 caras?', ['3/8', '1/2', '1/4', '2/3'], 'C(4, 2)/2⁴ = 6/16.'),
          M('En una fila se sientan al azar 3 amigos y 2 amigas. ¿Cuál es la probabilidad de que las 2 amigas queden en los extremos?', ['1/10', '1/5', '2/5', '1/20'], 'Favorables: 2! · 3! = 12. Total: 5! = 120.'),
        ],
      },
      {
        n: 'Probabilidad condicional', ic: 'search', items: [
          { t: 'info', ic: 'search', title: 'P(A | B)', txt: '"Probabilidad de A **dado que** ocurrió B": P(A | B) = P(A y B) / P(B). En una tabla, es restringir el total a los casos de B.' },
          M('En un curso de 30 estudiantes hay 18 mujeres, de las cuales 12 usan lentes. Si se elige una mujer al azar, ¿cuál es la probabilidad de que use lentes?', ['2/3', '12/30', '2/5', '1/2'], 'Se restringe a las 18 mujeres: 12/18.'),
          M('De 100 personas, 40 fuman y, de ellas, 10 tienen asma. De las 60 que no fuman, 6 tienen asma. ¿Cuál es P(asma | fumador)?', ['1/4', '1/10', '10/16', '1/6'], '10 de los 40 fumadores.'),
          M('Con los mismos datos, ¿cuál es P(fumador | asma)?', ['10/16', '10/40', '16/100', '1/4'], 'Hay 16 personas con asma; 10 de ellas fuman.'),
          M('Si P(A y B) = 0,12 y P(B) = 0,4, entonces P(A | B) =', ['0,3', '0,048', '0,52', '0,28'], '0,12/0,4.'),
          M('Se lanza un dado. Sabiendo que salió un número par, ¿cuál es la probabilidad de que sea un 6?', ['1/3', '1/6', '1/2', '2/3'], 'El espacio se reduce a {2, 4, 6}.'),
          M('Si A y B son independientes, P(A | B) es igual a:', ['P(A)', 'P(B)', 'P(A) · P(B)', '1'], 'Saber que ocurrió B no cambia la probabilidad de A.'),
          M('Una bolsa tiene 3 bolitas rojas y 2 azules. Se sacan dos sin reposición. Si la primera fue roja, ¿cuál es la probabilidad de que la segunda sea roja?', ['1/2', '3/5', '2/5', '3/10'], 'Quedan 2 rojas de 4.'),
          T('P(A | B) siempre es igual a P(B | A).', false, 'En el ejemplo del asma: P(asma | fumador) = 1/4, pero P(fumador | asma) = 10/16.'),
          M('El 2 % de una población tiene una enfermedad. Si se elige una persona al azar, ¿cuál es la probabilidad de que NO la tenga?', ['0,98', '0,02', '0,2', '0,8'], 'Complemento: 1 − 0,02.'),
          M('Se lanzan dos dados. Sabiendo que la suma es 8, ¿cuál es la probabilidad de que ambos muestren el mismo número?', ['1/5', '1/6', '1/36', '1/8'], 'Suma 8: (2,6), (3,5), (4,4), (5,3), (6,2). Solo (4,4) tiene números iguales.'),
        ],
      },
    ],
  });

  // ---------- Dispersión, binomial y normal ----------
  RB.unit('m2f', {
    name: 'Dispersión, binomial y normal', desc: 'Varianza y desviación estándar, distribución binomial y distribución normal.', ic: 'chart', area: 'Datos y azar',
    lessons: [
      {
        n: 'Medidas de dispersión', ic: 'chart', items: [
          { t: 'info', ic: 'chart', title: 'Dispersión', txt: '**Varianza**: promedio de los cuadrados de las distancias a la media. **Desviación estándar**: raíz de la varianza; mide cuánto se alejan los datos de la media en promedio.' },
          M('La desviación estándar de 5, 5, 5, 5 es:', ['0', '5', '1', '20'], 'Todos los datos son iguales a la media: no hay dispersión.'),
          M('Para los datos 2, 4 y 6, la varianza (poblacional) es:', ['8/3', '4', '2', '√(8/3)'], 'Media 4; distancias al cuadrado: 4, 0, 4; promedio: 8/3.'),
          M('Dos cursos tienen el mismo promedio, pero el A tiene desviación estándar 0,3 y el B, 1,2. ¿Qué se puede afirmar?', ['Las notas del A son más homogéneas', 'Las notas del B son más homogéneas', 'El curso B tiene mejor promedio', 'Ambos tienen la misma dispersión'], 'Menor desviación estándar: datos más concentrados.'),
          M('Si a cada dato se le suma 5, la desviación estándar:', ['No cambia', 'Aumenta en 5', 'Se multiplica por 5', 'Aumenta en 25'], 'Todos se mueven juntos: las distancias a la media no cambian.'),
          M('Si cada dato se multiplica por 3, la desviación estándar:', ['Se multiplica por 3', 'Se multiplica por 9', 'No cambia', 'Aumenta en 3'], 'Las distancias se triplican.'),
          M('Si cada dato se multiplica por 3, la varianza:', ['Se multiplica por 9', 'Se multiplica por 3', 'No cambia', 'Aumenta en 9'], 'La varianza usa distancias al cuadrado: 3² = 9.'),
          T('La desviación estándar nunca es negativa.', true, 'Es una raíz cuadrada de una suma de cuadrados.'),
          N('La varianza de un conjunto de datos es 16. ¿Cuál es su desviación estándar?', 4, '', '√16 = 4.'),
          M('¿Qué conjunto tiene mayor desviación estándar?', ['1, 10, 19', '9, 10, 11', '10, 10, 10', '8, 10, 12'], 'Todos tienen media 10, pero 1 y 19 están mucho más lejos.'),
        ],
      },
      {
        n: 'Distribución binomial', ic: 'dice', items: [
          { t: 'info', ic: 'dice', title: 'Binomial', txt: 'n ensayos **independientes**, cada uno con probabilidad de éxito p: P(X = k) = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ. El número **esperado** de éxitos es n · p.' },
          M('Se lanza una moneda 3 veces. ¿Cuál es la probabilidad de obtener exactamente 2 caras?', ['3/8', '1/4', '1/2', '2/3'], 'C(3, 2) · (1/2)³ = 3/8.'),
          M('Un jugador acierta un penal con probabilidad 0,8. Si patea 2 penales, ¿cuál es la probabilidad de acertar ambos?', ['0,64', '0,8', '1,6', '0,16'], '0,8 · 0,8.'),
          M('Con el mismo jugador, ¿cuál es la probabilidad de fallar los 2?', ['0,04', '0,2', '0,4', '0,36'], '0,2 · 0,2.'),
          M('Con el mismo jugador, ¿cuál es la probabilidad de acertar exactamente 1 de los 2?', ['0,32', '0,16', '0,8', '0,64'], '2 · 0,8 · 0,2: acierta el primero o el segundo.'),
          M('En una prueba de 10 preguntas con 4 alternativas cada una, respondiendo todo al azar, ¿cuántas respuestas correctas se esperan?', ['2,5', '4', '10', '1'], 'n · p = 10 · 1/4.'),
          M('¿Qué expresión da la probabilidad de obtener exactamente 3 seis al lanzar un dado 5 veces?', ['C(5, 3) · (1/6)³ · (5/6)²', '(1/6)³', 'C(5, 3) · (1/6)⁵', '3 · (1/6) · (5/6)'], 'k = 3 éxitos y n − k = 2 fracasos.'),
          T('En una distribución binomial, los ensayos deben ser independientes.', true, 'Cada intento no debe afectar a los otros.'),
          N('Se lanza una moneda 4 veces. ¿Cuál es el número esperado de caras?', 2, '', 'n · p = 4 · 1/2.'),
        ],
      },
      {
        n: 'Distribución normal', ic: 'func', items: [
          { t: 'info', ic: 'func', title: 'La campana', txt: 'Simétrica respecto de la media, donde coinciden media, mediana y moda. Aproximadamente el **68 %** de los datos está a 1 desviación de la media, el **95 %** a 2 y el **99,7 %** a 3.' },
          M('En una distribución normal, ¿qué porcentaje aproximado de los datos está a menos de una desviación estándar de la media?', ['68 %', '95 %', '50 %', '99,7 %'], 'Regla 68-95-99,7.'),
          M('Las estaturas tienen distribución normal con media 170 cm y desviación estándar 10 cm. ¿Qué porcentaje mide entre 160 y 180 cm?', ['68 %', '95 %', '34 %', '50 %'], 'Es media ± 1 desviación.'),
          M('Con los mismos datos, ¿qué porcentaje mide más de 170 cm?', ['50 %', '68 %', '34 %', '16 %'], 'La media divide la campana en dos mitades iguales.'),
          M('Con los mismos datos, ¿qué porcentaje aproximado mide más de 180 cm?', ['16 %', '32 %', '34 %', '5 %'], 'Fuera de ±1 desviación queda el 32 %, la mitad a cada lado.'),
          M('Con los mismos datos, ¿qué porcentaje aproximado mide entre 150 y 190 cm?', ['95 %', '68 %', '99,7 %', '47,5 %'], 'Es media ± 2 desviaciones.'),
          T('En una distribución normal, la media, la mediana y la moda coinciden.', true, 'Por la simetría de la campana.'),
          M('Si una distribución normal tiene mayor desviación estándar, su campana es:', ['Más ancha y baja', 'Más angosta y alta', 'Igual', 'Desplazada a la derecha'], 'Los datos están más repartidos.'),
          M('En una prueba con media 500 y desviación estándar 100, un puntaje de 650 está a cuántas desviaciones de la media?', ['1,5', '150', '6,5', '0,15'], 'z = (650 − 500)/100 = 1,5.'),
        ],
      },
    ],
  });
})();
