// Matemática M2 (3): combinatoria y probabilidad condicional; dispersión, binomial y normal.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Combinatoria y probabilidad condicional ----------
  RB.unit('m2e', {
    name: 'Combinatoria y probabilidad condicional', desc: 'Factorial, permutaciones, variaciones, combinaciones y probabilidad condicional con tablas y árboles.', ic: 'dice', vid: 'v-m2e', area: 'Datos y azar',
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
    name: 'Dispersión, binomial y normal', desc: 'Varianza y desviación estándar, distribución binomial y distribución normal.', ic: 'chart', vid: 'v-m2f', area: 'Datos y azar',
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

  // ---------- Videos ----------
  RB.video('v-m2e', {
    u: 'm2e', title: 'Combinatoria y probabilidad condicional', desc: 'Contar con y sin orden, y calcular probabilidades cuando ya sabes algo.',
    sc: [
      { h: 'Combinatoria y probabilidad condicional', sub: 'Contar bien para calcular bien', b: [{ tags: ['Factorial', 'Permutación', 'Variación', 'Combinación', 'P(A | B)', 'Tablas'] }],
        s: ['Hola. En M2 la probabilidad sube de nivel: necesitas contar casos de forma inteligente y calcular probabilidades cuando ya sabes algo de lo que pasó.', 'Veremos el factorial, las permutaciones, las variaciones y las combinaciones, y luego la probabilidad condicional con tablas.'] },
      { h: 'El factorial', ic: 'calc', b: [{ eq: 'n! = n · (n − 1) · … · 2 · 1' }, { eq: '4! = 4 · 3 · 2 · 1 = 24', n: 'Formas de ordenar 4 libros distintos' }, { tip: 'Por convención, 0! = 1.' }],
        s: ['El factorial de un número es el producto de todos los enteros desde ese número hasta uno.', 'Cuatro factorial es cuatro por tres por dos por uno, veinticuatro.', 'Y eso es exactamente la cantidad de formas de ordenar cuatro libros distintos en un estante: cuatro opciones para el primer lugar, tres para el segundo, dos para el tercero y una para el último.', 'Por convención, cero factorial es uno.'] },
      { h: '¿Importa el orden?', ic: 'flag', b: [{ two: [['Sí importa: variación', 'Presidente y secretario de 6', '6 · 5 = 30'], ['No importa: combinación', 'Comisión de 2 de 6', '30 / 2 = 15']] }, { eq: 'C(n, k) = n! / (k! · (n − k)!)' }, { tip: 'Pregunta clave: si intercambio dos elegidos, **¿cambia el resultado?**' }],
        s: ['La gran pregunta en combinatoria es si importa el orden.', 'Si eliges presidente y secretario entre seis personas, el orden importa: Ana presidenta y Beto secretario es distinto de lo contrario. Son seis por cinco, treinta formas. Pero si eliges una comisión de dos personas, el orden no importa: Ana y Beto es la misma comisión que Beto y Ana. Cada pareja se contó dos veces, así que son quince.', 'Las combinaciones se calculan con esta fórmula: ene factorial dividido por ka factorial por ene menos ka factorial.', 'El truco para decidir: si intercambias dos elegidos y el resultado cambia, importa el orden.'] },
      { h: 'Letras repetidas', ic: 'pen', b: [{ eq: 'AMOR: 4! = 24 palabras' }, { eq: 'CASA: 4! / 2! = 12', n: 'Se divide por las repeticiones' }, { q: '¿De cuántas formas se puede elegir una comisión de 3 personas entre 5?', o: ['10', '60', '15', '125'], e: 'No importa el orden: C(5, 3) = 5!/(3! · 2!) = 10.' }],
        s: ['Un caso frecuente: ordenar letras de una palabra.', 'Con amor, que tiene cuatro letras distintas, hay cuatro factorial, veinticuatro palabras.', 'Pero con casa, la letra a se repite, y al intercambiarlas no se forma una palabra nueva. Por eso se divide por dos factorial: doce palabras.', 'Ahora tú, con una comisión.'] },
      { h: 'Probabilidad con conteo', ic: 'dice', b: [{ ex: 'Se eligen 2 personas al azar de un grupo de 4 mujeres y 3 hombres. ¿Probabilidad de que ambas sean mujeres?' }, { sol: 'C(4, 2) / C(7, 2) = 6 / 21 = **2/7**' }, { eq: 'Exactamente 2 caras en 4 monedas: C(4, 2) / 2⁴ = 6/16 = 3/8' }],
        s: ['La combinatoria sirve para aplicar Laplace en problemas grandes.', 'Se eligen dos personas al azar de un grupo de cuatro mujeres y tres hombres. ¿Cuál es la probabilidad de que ambas sean mujeres?', 'Los casos favorables son las formas de elegir dos de las cuatro mujeres: seis. Los casos posibles, elegir dos de siete: veintiuno. La probabilidad es seis veintiunavos, o sea, dos séptimos.', 'Otro: la probabilidad de obtener exactamente dos caras al lanzar cuatro monedas. Hay seis formas de elegir cuáles dos monedas son cara, de dieciséis resultados posibles: tres octavos.'] },
      { h: 'Probabilidad condicional', ic: 'search', b: [{ eq: 'P(A | B) = P(A y B) / P(B)' }, { ex: 'Dado: sabiendo que salió par, ¿probabilidad de que sea 6?' }, { sol: 'El espacio se reduce a {2, 4, 6}: **1/3**' }],
        s: ['La probabilidad condicional responde: ¿qué probabilidad tiene A, si ya sé que ocurrió B?', 'Se escribe pe de A dado B, y es la probabilidad de A y B, dividida por la probabilidad de B.', 'Por ejemplo, lanzas un dado y te dicen que salió un número par. ¿Cuál es la probabilidad de que sea un seis?', 'Saber que salió par reduce el espacio a tres resultados: dos, cuatro y seis. La probabilidad es un tercio, no un sexto.'] },
      { h: 'Tablas de doble entrada', ic: 'grid', b: [{ bars: [['Fuma y asma', 10], ['Fuma sin asma', 30], ['No fuma, asma', 6], ['No fuma, sin asma', 54]] }, { two: [['P(asma | fumador)', '10 / 40 = 1/4'], ['P(fumador | asma)', '10 / 16 = 5/8']] }, { warn: 'P(A | B) **no** es lo mismo que P(B | A).' }, { q: 'En un curso de 30, hay 18 mujeres y 12 de ellas usan lentes. Si se elige una mujer, ¿probabilidad de que use lentes?', o: ['2/3', '2/5', '12/30', '1/2'], e: 'Se restringe a las 18 mujeres: 12/18 = 2/3.' }],
        s: ['La forma más clara de ver la probabilidad condicional es con una tabla.', 'De cien personas, cuarenta fuman; de ellas, diez tienen asma. De las sesenta que no fuman, seis tienen asma.', 'La probabilidad de asma dado que fuma se calcula solo con los fumadores: diez de cuarenta, un cuarto. La probabilidad de que fume dado que tiene asma se calcula solo con los asmáticos: diez de dieciséis.', 'Son números distintos. Confundir pe de A dado B con pe de B dado A es uno de los errores más comunes.', 'Prueba.'] },
      { h: 'Árbol de probabilidades', ic: 'list', b: [{ eq: 'P(A y B) = P(A) · P(B | A)', n: 'Regla de la multiplicación' }, { ex: 'Bolsa con 3 rojas y 2 azules. Se sacan 2 sin reposición. ¿Probabilidad de que ambas sean rojas?' }, { sol: 'P(R₁) = 3/5 · P(R₂ | R₁) = 2/4  →  3/5 · 2/4 = **3/10**' }, { tip: 'En un árbol, se **multiplica** a lo largo de cada rama y se **suman** las ramas que sirven.' }],
        s: ['La probabilidad condicional también explica por qué multiplicamos en los problemas sin reposición.', 'La probabilidad de A y B es la probabilidad de A por la probabilidad de B dado A.', 'En una bolsa con tres rojas y dos azules, sacas dos bolitas sin reposición. ¿Cuál es la probabilidad de que ambas sean rojas?', 'La primera es roja con probabilidad tres quintos. Dado que salió roja, quedan dos rojas de cuatro: dos cuartos. Multiplicando: tres décimos.', 'En un diagrama de árbol, multiplicas a lo largo de cada rama y sumas las ramas que cumplen lo pedido.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['n!', '¿Importa el orden?', 'Variación: sí', 'Combinación: no', 'Letras repetidas: dividir', 'P(A | B): restringir'] }],
        s: ['Resumen: usa el factorial para ordenar, variaciones cuando importa el orden y combinaciones cuando no.', 'En la probabilidad condicional, restringe el total a los casos que ya sabes que ocurrieron, y no confundas A dado B con B dado A. ¡A practicar!'] },
    ],
  });

  RB.video('v-m2f', {
    u: 'm2f', title: 'Dispersión, binomial y normal', desc: 'Desviación estándar, el modelo binomial y la campana de la distribución normal.',
    sc: [
      { h: 'Dispersión, binomial y normal', sub: 'Qué tan repartidos están los datos y cómo se comporta el azar', b: [{ tags: ['Varianza', 'Desviación estándar', 'Binomial', 'Valor esperado', 'Normal', '68-95-99,7'] }],
        s: ['Hola. En este video cerramos la estadística de M2.', 'Veremos cómo medir la dispersión con la varianza y la desviación estándar, el modelo binomial para contar éxitos, y la distribución normal, la famosa campana.'] },
      { h: 'Dispersión', ic: 'chart', b: [{ two: [['Curso A', '5,4 · 5,5 · 5,6', 'Datos concentrados'], ['Curso B', '3,0 · 5,5 · 8,0', 'Datos dispersos']] }, 'Mismo promedio (5,5), **distinta dispersión**'],
        s: ['Dos conjuntos pueden tener el mismo promedio y ser muy distintos.', 'En el curso A, las notas están todas cerca de cinco coma cinco. En el curso B, hay notas muy bajas y muy altas.', 'Ambos tienen promedio cinco coma cinco, pero el B está mucho más disperso. Para medir eso existen la varianza y la desviación estándar.'] },
      { h: 'Varianza y desviación estándar', ic: 'calc', b: [{ eq: 'Varianza = promedio de (dato − media)²' }, { eq: 'Datos 2, 4, 6 · media 4 · distancias² 4, 0, 4  →  varianza 8/3' }, { eq: 'Desviación estándar = √varianza', n: 'Se mide en las mismas unidades que los datos' }],
        s: ['Veamos cómo se calcula.', 'La varianza es el promedio de los cuadrados de las distancias de cada dato a la media.', 'Con los datos dos, cuatro y seis, la media es cuatro. Las distancias al cuadrado son cuatro, cero y cuatro, y su promedio es ocho tercios. Esa es la varianza.', 'La desviación estándar es la raíz cuadrada de la varianza. Se usa más porque está en las mismas unidades que los datos. Mientras más grande, más dispersos están los datos.'] },
      { h: 'Transformar los datos', ic: 'replay', b: [{ two: [['Sumar 5 a todos', 'Media + 5 · desviación **igual**'], ['Multiplicar todos por 3', 'Desviación · 3 · varianza · 9']] }, { q: 'Si a cada dato se le suma 5, ¿qué pasa con la desviación estándar?', o: ['No cambia', 'Aumenta en 5', 'Se multiplica por 5', 'Aumenta en 25'], e: 'Todos los datos se mueven juntos: las distancias a la media no cambian.' }],
        s: ['Una pregunta típica: ¿qué pasa con la dispersión si transformo los datos?', 'Si a todos los datos les sumas cinco, la media sube cinco, pero la desviación estándar no cambia, porque todos se mueven juntos. Si multiplicas todos por tres, la desviación estándar se multiplica por tres y la varianza por nueve.', 'Comprueba si lo entendiste.'] },
      { h: 'Distribución binomial', ic: 'dice', b: [{ eq: 'P(X = k) = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ' }, { ex: 'Un jugador acierta un penal con probabilidad 0,8 y patea 2. ¿Probabilidad de acertar exactamente 1?' }, { sol: 'C(2, 1) · 0,8 · 0,2 = 2 · 0,16 = **0,32**' }, { eq: 'Valor esperado = n · p  →  10 preguntas al azar con 4 alternativas: 10 · 1/4 = 2,5' }],
        s: ['El modelo binomial sirve cuando repites un experimento ene veces, con dos resultados posibles, éxito o fracaso, y con la misma probabilidad de éxito cada vez.', 'La probabilidad de tener exactamente ka éxitos es: combinaciones de ene en ka, por pe elevado a ka, por uno menos pe elevado a ene menos ka.', 'Por ejemplo, un jugador acierta un penal con probabilidad cero coma ocho y patea dos. ¿Cuál es la probabilidad de acertar exactamente uno?', 'Puede acertar el primero y fallar el segundo, o al revés: dos casos. Dos por cero coma ocho por cero coma dos: cero coma treinta y dos.', 'Y el número esperado de éxitos es ene por pe. Si respondes al azar diez preguntas de cuatro alternativas, esperas dos coma cinco correctas. Por eso responder al azar no es una buena estrategia.'] },
      { h: 'La distribución normal', ic: 'func', b: [{ plot: { f: [x => 10 * Math.exp(-x * x / 2)], x: [-3.5, 3.5], y: [0, 11], pts: [[0, 10, 'media']], cap: 'Campana simétrica: media = mediana = moda' } }, { bars: [['μ ± 1σ', 68], ['μ ± 2σ', 95], ['μ ± 3σ', 99.7]], u: ' %' }, { tip: 'Más desviación estándar → campana **más ancha y baja**.' }],
        s: ['La distribución normal tiene forma de campana y describe muchos fenómenos, como las estaturas o los puntajes de una prueba.', 'Es simétrica respecto de la media, y en su centro coinciden la media, la mediana y la moda.', 'La regla que debes memorizar es sesenta y ocho, noventa y cinco, noventa y nueve coma siete: aproximadamente el sesenta y ocho por ciento de los datos está a una desviación estándar de la media, el noventa y cinco por ciento a dos, y el noventa y nueve coma siete por ciento a tres.', 'Si la desviación estándar es mayor, la campana es más ancha y más baja.'] },
      { h: 'Usar la regla', ic: 'target', b: [{ ex: 'Estaturas: media 170 cm, desviación 10 cm' }, { two: [['Entre 160 y 180', '68 %'], ['Más de 170', '50 %']] }, { q: 'Con esos datos, ¿qué porcentaje aproximado mide más de 180 cm?', o: ['16 %', '32 %', '34 %', '5 %'], e: 'Fuera de 160–180 queda el 32 %, repartido en dos colas iguales: 16 % arriba.' }],
        s: ['Apliquemos la regla con un ejemplo.', 'Las estaturas tienen media ciento setenta centímetros y desviación estándar diez.', 'Entre ciento sesenta y ciento ochenta, que es la media más o menos una desviación, está el sesenta y ocho por ciento. Y más de ciento setenta mide exactamente la mitad, el cincuenta por ciento, por la simetría.', '¿Y más de ciento ochenta? Piénsalo con las colas.'] },
      { h: 'Comparar con el puntaje z', ic: 'scale', b: [{ eq: 'z = (dato − media) / desviación estándar' }, { two: [['Ana: 650 en una prueba', 'media 500 · σ 100 → z = 1,5'], ['Beto: 80 en otra prueba', 'media 70 · σ 5 → z = 2']] }, { sol: 'Beto se destacó más respecto de su grupo, aunque su número sea menor.' }],
        s: ['Por último, una herramienta para comparar datos de distintas escalas: el puntaje zeta.', 'Zeta es el dato menos la media, dividido por la desviación estándar. Indica a cuántas desviaciones de la media está un dato.', 'Ana sacó seiscientos cincuenta en una prueba con media quinientos y desviación cien: su zeta es uno coma cinco. Beto sacó ochenta en otra prueba con media setenta y desviación cinco: su zeta es dos.', 'Entonces Beto se destacó más respecto de su grupo, aunque su número sea menor. Comparar puntajes brutos de pruebas distintas es un error.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['σ = √varianza', '+k: σ igual', '·k: σ · k', 'Binomial: C(n,k)pᵏ(1−p)ⁿ⁻ᵏ', 'Esperado: n·p', '68-95-99,7'] }],
        s: ['Resumen: la desviación estándar es la raíz de la varianza y mide la dispersión; sumar una constante no la cambia, multiplicar sí.', 'En la binomial, usa la fórmula con combinaciones y el valor esperado ene por pe. Y en la normal, recuerda la regla sesenta y ocho, noventa y cinco, noventa y nueve coma siete. ¡A practicar!'] },
    ],
  });
})();
