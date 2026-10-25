// Matemática M1 (5): Pitágoras, áreas y volúmenes; transformaciones isométricas, vectores y semejanza.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Geometría ----------
  RB.unit('m1i', {
    name: 'Pitágoras, áreas y volúmenes', desc: 'Teorema de Pitágoras, perímetros y áreas de figuras planas, y volúmenes de cuerpos geométricos.', ic: 'tri', vid: 'v-m1i', area: 'Geometría',
    lessons: [
      {
        n: 'Teorema de Pitágoras', ic: 'tri', items: [
          { t: 'info', ic: 'tri', title: 'Pitágoras', txt: 'En todo triángulo **rectángulo**: a² + b² = c², donde c es la **hipotenusa** (el lado opuesto al ángulo recto). Tríos que conviene recordar: 3-4-5, 6-8-10, 5-12-13 y 8-15-17.' },
          M('Los catetos de un triángulo rectángulo miden 6 cm y 8 cm. ¿Cuánto mide la hipotenusa?', ['10 cm', '14 cm', '√28 cm', '48 cm'], '6² + 8² = 36 + 64 = 100 → c = 10.'),
          M('La hipotenusa de un triángulo rectángulo mide 13 cm y un cateto 5 cm. ¿Cuánto mide el otro cateto?', ['12 cm', '8 cm', '√194 cm', '18 cm'], '13² − 5² = 169 − 25 = 144 → 12.'),
          M('¿Cuál de estos tríos puede corresponder a los lados de un triángulo rectángulo?', ['8, 15 y 17', '5, 6 y 7', '4, 5 y 6', '2, 3 y 4'], '8² + 15² = 64 + 225 = 289 = 17².'),
          M('Una escalera de 5 m se apoya en una pared, con su base a 3 m de la pared. ¿A qué altura toca la pared?', ['4 m', '2 m', '8 m', '√34 m'], 'Trío 3-4-5: √(25 − 9) = 4.'),
          M('La diagonal de un rectángulo de 9 cm × 12 cm mide:', ['15 cm', '21 cm', '√63 cm', '108 cm'], '81 + 144 = 225 → 15 (trío 3-4-5 multiplicado por 3).'),
          N('¿Cuánto mide la altura de un triángulo equilátero de lado 2 cm? Usa √3 ≈ 1,73.', 1.73, 'cm', 'La altura divide la base en dos partes de 1 cm: h = √(4 − 1) = √3 ≈ 1,73.', { tol: 0.011 }),
          T('En un triángulo rectángulo, la hipotenusa es siempre el lado más largo.', true, 'Se opone al ángulo mayor (90°).'),
          M('Un barco navega 8 km hacia el norte y luego 6 km hacia el este. ¿A qué distancia está del punto de partida?', ['10 km', '14 km', '2 km', '48 km'], 'Los dos tramos forman un ángulo recto: √(64 + 36) = 10.'),
          M('La diagonal de un cuadrado mide 6√2 cm. ¿Cuánto mide su lado?', ['6 cm', '12 cm', '3√2 cm', '6√2 cm'], 'La diagonal de un cuadrado de lado a es a√2.'),
        ],
      },
      {
        n: 'Perímetros y áreas', ic: 'grid', items: [
          { t: 'info', ic: 'grid', title: 'Áreas', txt: 'Triángulo: b·h/2 · Rectángulo y paralelogramo: b·h · Trapecio: (B + b)·h/2 · Rombo: D·d/2 · Círculo: πr² · Circunferencia: 2πr.' },
          M('El área de un triángulo de base 10 cm y altura 6 cm es:', ['30 cm²', '60 cm²', '16 cm²', '15 cm²'], '10 · 6 / 2 = 30.'),
          M('El área de un trapecio de bases 8 cm y 12 cm y altura 5 cm es:', ['50 cm²', '100 cm²', '480 cm²', '25 cm²'], '(8 + 12) · 5 / 2 = 50.'),
          M('El área de un círculo de radio 3 cm es:', ['9π cm²', '6π cm²', '3π cm²', '36π cm²'], 'π · 3² = 9π. 6π es el perímetro.'),
          M('El perímetro de un círculo de diámetro 10 cm es:', ['10π cm', '20π cm', '25π cm', '5π cm'], '2πr = π · d = 10π.'),
          M('Si el radio de un círculo se duplica, su área:', ['Se cuadruplica', 'Se duplica', 'Se triplica', 'No cambia'], 'π(2r)² = 4πr².'),
          M('Un rombo tiene diagonales de 10 cm y 6 cm. Su área es:', ['30 cm²', '60 cm²', '16 cm²', '15 cm²'], '10 · 6 / 2 = 30.'),
          N('Un rectángulo tiene perímetro 30 cm y uno de sus lados mide 6 cm. ¿Cuál es su área (en cm²)?', 54, 'cm²', 'El otro lado mide (30 − 12)/2 = 9. Área: 6 · 9 = 54.'),
          M('El área de un sector circular de 90° en un círculo de radio 4 cm es:', ['4π cm²', '16π cm²', '8π cm²', '2π cm²'], '90° es un cuarto del círculo: 16π/4 = 4π.'),
          M('Un cuadrado de perímetro 36 cm tiene un área de:', ['81 cm²', '36 cm²', '144 cm²', '9 cm²'], 'Lado = 9; área = 81.'),
          M('Un paralelogramo tiene base 7 cm y altura 4 cm. Su área es:', ['28 cm²', '22 cm²', '14 cm²', '11 cm²'], 'Base por altura (no por el lado inclinado).'),
          M('A un cuadrado de lado 4 cm se le recorta el círculo inscrito (que toca sus 4 lados). ¿Qué área queda?', ['(16 − 4π) cm²', '(16 − 16π) cm²', '(4π − 16) cm²', '(16 − 2π) cm²'], 'El círculo inscrito tiene radio 2: área 4π.'),
        ],
      },
      {
        n: 'Volúmenes', ic: 'box', items: [
          { t: 'info', ic: 'box', title: 'Volúmenes', txt: 'Prisma y cilindro: área de la base · altura (cilindro: πr²h) · Cono: πr²h/3 · Esfera: 4πr³/3 · Cubo: a³, con área total 6a².' },
          M('El volumen de un cubo de arista 4 cm es:', ['64 cm³', '16 cm³', '48 cm³', '96 cm³'], '4³ = 64. 96 cm² es su área total.'),
          M('El área total de un cubo de arista 3 cm es:', ['54 cm²', '27 cm²', '9 cm²', '36 cm²'], '6 caras de 9 cm² cada una.'),
          M('El volumen de un paralelepípedo de 2 cm × 3 cm × 5 cm es:', ['30 cm³', '10 cm³', '62 cm³', '15 cm³'], '2 · 3 · 5 = 30.'),
          M('El volumen de un cilindro de radio 2 cm y altura 5 cm es:', ['20π cm³', '10π cm³', '40π cm³', '100π cm³'], 'π · 4 · 5 = 20π.'),
          M('Un cono tiene el mismo radio y altura que un cilindro de volumen 60π cm³. ¿Cuál es el volumen del cono?', ['20π cm³', '60π cm³', '180π cm³', '30π cm³'], 'El cono es un tercio del cilindro.'),
          M('El volumen de una esfera de radio 3 cm es:', ['36π cm³', '12π cm³', '27π cm³', '108π cm³'], '4/3 · π · 27 = 36π.'),
          M('Si la arista de un cubo se duplica, su volumen:', ['Se multiplica por 8', 'Se duplica', 'Se multiplica por 4', 'Se multiplica por 6'], '(2a)³ = 8a³.'),
          N('Un estanque con forma de paralelepípedo mide 2 m × 1 m × 0,5 m. ¿Cuántos litros caben? (1 m³ = 1.000 L)', 1000, 'L', '2 · 1 · 0,5 = 1 m³ = 1.000 L.'),
          M('Una caja de base cuadrada de lado 10 cm tiene un volumen de 500 cm³. ¿Cuál es su altura?', ['5 cm', '50 cm', '10 cm', '2 cm'], '100 · h = 500 → h = 5.'),
          T('El volumen de un cono es un tercio del volumen del cilindro con igual base y altura.', true, 'Por eso su fórmula lleva el factor 1/3.'),
        ],
      },
      {
        n: 'Geometría en problemas', ic: 'target', items: [
          M('Un patio de 6 m × 4 m se cubrirá con baldosas cuadradas de 50 cm de lado. ¿Cuántas baldosas se necesitan?', ['96', '48', '24', '240'], 'Área del patio: 24 m². Cada baldosa: 0,25 m². 24 : 0,25 = 96.'),
          M('¿Cuántos litros caben en un cilindro de radio 10 cm y altura 30 cm? (π ≈ 3,14; 1 L = 1.000 cm³)', ['9,42 L', '94,2 L', '3 L', '0,94 L'], '3,14 · 100 · 30 = 9.420 cm³ = 9,42 L.'),
          M('Una pizza de 30 cm de diámetro se corta en 8 trozos iguales. ¿Cuál es el área de cada trozo?', ['225π/8 cm²', '900π/8 cm²', '30π/8 cm²', '15π/8 cm²'], 'Radio 15: área total 225π, dividida en 8.'),
          M('Una piscina mide 10 m × 5 m y tiene 1,5 m de profundidad. ¿Cuál es su volumen?', ['75 m³', '16,5 m³', '50 m³', '750 m³'], '10 · 5 · 1,5 = 75.'),
          M('Se quiere cercar un terreno circular de radio 7 m. ¿Cuántos metros de reja se necesitan? (π ≈ 22/7)', ['44 m', '154 m', '22 m', '88 m'], '2 · 22/7 · 7 = 44. 154 m² sería el área.'),
          M('Un triángulo rectángulo tiene catetos de 5 cm y 12 cm. ¿Cuál es su perímetro?', ['30 cm', '17 cm', '60 cm', '29 cm'], 'Hipotenusa 13: 5 + 12 + 13 = 30.'),
          N('Un cuadrado tiene la misma área que un rectángulo de 4 cm × 9 cm. ¿Cuánto mide el lado del cuadrado?', 6, 'cm', 'Área 36 → lado √36 = 6.'),
          M('Si cada lado de un cuadrado aumenta 10 %, su área aumenta en:', ['21 %', '10 %', '20 %', '100 %'], '1,1² = 1,21.'),
        ],
      },
    ],
  });

  // ---------- Transformaciones y semejanza ----------
  RB.unit('m1j', {
    name: 'Transformaciones, vectores y semejanza', desc: 'Traslaciones con vectores, reflexiones, rotaciones, semejanza de figuras y teorema de Tales.', ic: 'replay', vid: 'v-m1j', area: 'Geometría',
    lessons: [
      {
        n: 'Vectores y traslaciones', ic: 'right', items: [
          { t: 'info', ic: 'right', title: 'Vectores', txt: 'El vector (a, b) mueve un punto **a unidades en x** y **b unidades en y**. Trasladar (x, y) según (a, b) da (x + a, y + b).' },
          M('Al trasladar el punto (2, −1) según el vector (3, 4) se obtiene:', ['(5, 3)', '(−1, −5)', '(6, −4)', '(5, −5)'], '(2 + 3, −1 + 4) = (5, 3).'),
          M('¿Qué vector traslada el punto (1, 5) hasta (4, 2)?', ['(3, −3)', '(−3, 3)', '(5, 7)', '(4, 2)'], 'Final menos inicial: (4 − 1, 2 − 5).'),
          M('La suma de los vectores (2, 3) y (−1, 4) es:', ['(1, 7)', '(3, 7)', '(1, −1)', '(−2, 12)'], 'Se suman componente a componente.'),
          M('El vector 3 · (2, −1) es:', ['(6, −3)', '(5, 2)', '(6, −1)', '(2, −3)'], 'Se multiplica cada componente por 3.'),
          T('Una traslación cambia el tamaño de la figura.', false, 'Es una isometría: conserva forma y tamaño; solo cambia la posición.'),
          M('La magnitud (módulo) del vector (3, 4) es:', ['5', '7', '25', '1'], '√(3² + 4²) = 5, por Pitágoras.'),
          M('Un triángulo de vértices (0, 0), (2, 0) y (0, 3) se traslada según (1, 1). ¿Cuál es la imagen de (2, 0)?', ['(3, 1)', '(2, 1)', '(1, −1)', '(3, 0)'], '(2 + 1, 0 + 1).'),
          M('Si P se traslada según (2, −3) y luego según (−5, 1), equivale a una sola traslación según:', ['(−3, −2)', '(7, −4)', '(−3, 4)', '(3, 2)'], 'Se suman los vectores: (2 − 5, −3 + 1).'),
        ],
      },
      {
        n: 'Reflexiones y rotaciones', ic: 'replay', items: [
          M('La reflexión del punto (3, 5) respecto del eje x es:', ['(3, −5)', '(−3, 5)', '(−3, −5)', '(5, 3)'], 'Respecto del eje x cambia el signo de y.'),
          M('La reflexión del punto (3, 5) respecto del eje y es:', ['(−3, 5)', '(3, −5)', '(−3, −5)', '(5, 3)'], 'Respecto del eje y cambia el signo de x.'),
          M('La reflexión del punto (2, −4) respecto del origen es:', ['(−2, 4)', '(2, 4)', '(−2, −4)', '(4, −2)'], 'Cambian los dos signos (equivale a rotar 180°).'),
          M('Al rotar el punto (4, 1) en 90° en sentido antihorario con centro en el origen se obtiene:', ['(−1, 4)', '(1, −4)', '(−4, −1)', '(4, −1)'], 'Rotación de 90° antihoraria: (x, y) → (−y, x).'),
          M('Al rotar el punto (4, 1) en 180° con centro en el origen se obtiene:', ['(−4, −1)', '(−1, 4)', '(1, 4)', '(4, −1)'], '(x, y) → (−x, −y).'),
          M('La reflexión de (2, 7) respecto de la recta y = x es:', ['(7, 2)', '(−2, 7)', '(2, −7)', '(−7, −2)'], 'Se intercambian las coordenadas.'),
          S('Clasifica cada transformación', ['Isometría', 'No es isometría'], [['Traslación', 0], ['Reflexión', 0], ['Rotación', 0], ['Ampliación al doble', 1], ['Reducción a la mitad', 1], ['Simetría central', 0]], 'Las isometrías conservan forma y tamaño.'),
          T('Una rotación en 360° deja la figura en su posición original.', true, 'Da una vuelta completa.'),
          M('¿Cuántos ejes de simetría tiene un cuadrado?', ['4', '2', '8', '1'], 'Dos diagonales y dos que pasan por los puntos medios de lados opuestos.'),
          M('Rotar en 270° en sentido antihorario equivale a rotar:', ['90° en sentido horario', '180°', '90° en sentido antihorario', '360°'], '270° antihorario + 90° = vuelta completa.'),
        ],
      },
      {
        n: 'Semejanza y Tales', ic: 'tri', items: [
          { t: 'info', ic: 'tri', title: 'Semejanza', txt: 'Dos figuras son semejantes si tienen **igual forma**: ángulos iguales y lados **proporcionales**. Si la razón de semejanza es k, las áreas están en razón **k²** y los volúmenes en **k³**.' },
          M('Dos triángulos semejantes tienen razón de semejanza 3. Si un lado del pequeño mide 4 cm, el lado correspondiente del grande mide:', ['12 cm', '7 cm', '4/3 cm', '36 cm'], '4 · 3 = 12.'),
          M('Si la razón de semejanza entre dos figuras es 2, la razón entre sus áreas es:', ['4', '2', '8', '1/2'], 'k² = 4.'),
          M('Un poste de 3 m proyecta una sombra de 2 m. A la misma hora, un árbol proyecta una sombra de 8 m. ¿Cuánto mide el árbol?', ['12 m', '5,3 m', '16 m', '6 m'], 'Triángulos semejantes: 3/2 = h/8 → h = 12.'),
          M('Dos rectas paralelas cortan a dos rectas que parten del mismo punto. En una se forman segmentos de 4 y 6; en la otra, los segmentos correspondientes miden 6 y x. Por el teorema de Tales, x =', ['9', '8', '4', '12'], '4/6 = 6/x → x = 9.'),
          T('Todos los triángulos equiláteros son semejantes entre sí.', true, 'Todos tienen ángulos de 60°.'),
          M('¿Qué condición asegura que dos triángulos son semejantes?', ['Tener dos ángulos respectivamente iguales', 'Tener un lado igual', 'Tener la misma área', 'Tener el mismo perímetro'], 'Criterio AA: si dos ángulos coinciden, el tercero también.'),
          M('Una maqueta a escala 1 : 50 de un edificio mide 40 cm de alto. ¿Cuánto mide el edificio?', ['20 m', '2 m', '200 m', '50 m'], '40 · 50 = 2.000 cm = 20 m.'),
          M('Dos cubos semejantes tienen aristas de 2 cm y 6 cm. ¿Cuántas veces cabe el volumen del pequeño en el del grande?', ['27', '3', '9', '6'], 'k = 3 → k³ = 27.'),
          N('Los lados de un triángulo miden 3, 4 y 5 cm. Un triángulo semejante tiene su lado mayor de 15 cm. ¿Cuál es su perímetro (en cm)?', 36, 'cm', 'k = 15/5 = 3; perímetro 12 · 3 = 36.'),
        ],
      },
    ],
  });

  // ---------- Videos ----------
  RB.video('v-m1i', {
    u: 'm1i', title: 'Pitágoras, áreas y volúmenes', desc: 'El teorema de Pitágoras, las fórmulas de áreas y volúmenes, y cómo cambian al escalar.',
    sc: [
      { h: 'Pitágoras, áreas y volúmenes', sub: 'Geometría que se calcula', b: [{ tags: ['Pitágoras', 'Tríos', 'Áreas', 'Círculo', 'Volúmenes', 'Escalar'] }],
        s: ['Hola. En este video vamos a repasar la geometría que se calcula: el teorema de Pitágoras, las áreas de figuras planas y los volúmenes de los cuerpos.', 'Además verás un truco muy útil: qué pasa con el área y el volumen cuando una figura se agranda.'] },
      { h: 'Teorema de Pitágoras', ic: 'tri', b: [{ eq: 'a² + b² = c²', n: 'c es la hipotenusa: el lado opuesto al ángulo recto' }, { eq: 'Catetos 6 y 8  →  c = √(36 + 64) = √100 = 10' }, { eq: 'Hipotenusa 13, cateto 5  →  √(169 − 25) = √144 = 12', n: 'Para un cateto, se resta' }, { warn: 'Solo vale en triángulos **rectángulos**.' }],
        s: ['El teorema de Pitágoras es la herramienta más usada de la geometría de la PAES.', 'En todo triángulo rectángulo, la suma de los cuadrados de los catetos es igual al cuadrado de la hipotenusa. La hipotenusa es el lado más largo, el que está frente al ángulo recto.', 'Si los catetos miden seis y ocho, la hipotenusa es la raíz de treinta y seis más sesenta y cuatro, o sea, raíz de cien: diez.', 'Si conoces la hipotenusa y buscas un cateto, se resta: con hipotenusa trece y cateto cinco, el otro cateto es raíz de ciento sesenta y nueve menos veinticinco, o sea, doce.', 'Y no lo olvides: Pitágoras solo funciona en triángulos rectángulos.'] },
      { h: 'Tríos pitagóricos', ic: 'bolt', b: [{ tags: ['3 · 4 · 5', '6 · 8 · 10', '5 · 12 · 13', '8 · 15 · 17', '9 · 12 · 15'] }, { ex: 'Escalera de 5 m con la base a 3 m de la pared' }, { sol: 'Trío 3-4-5: toca la pared a **4 m** de altura' }, { q: 'Un barco avanza 8 km al norte y luego 6 km al este. ¿A qué distancia quedó del punto de partida?', o: ['10 km', '14 km', '2 km', '48 km'], e: 'Los tramos forman un ángulo recto: es el trío 6-8-10.' }],
        s: ['Para ahorrar tiempo, memoriza los tríos pitagóricos, que aparecen una y otra vez.', 'Tres, cuatro y cinco. Seis, ocho y diez. Cinco, doce y trece. Ocho, quince y diecisiete. Y sus múltiplos, como nueve, doce y quince.', 'Por ejemplo, una escalera de cinco metros apoyada en una pared, con la base a tres metros de la pared.', 'Es el trío tres, cuatro, cinco: la escalera toca la pared a cuatro metros de altura. Sin calcular nada.', 'Prueba tú.'] },
      { h: 'Áreas de figuras planas', ic: 'grid', b: [{ two: [['Triángulo', 'base · altura / 2'], ['Rectángulo y paralelogramo', 'base · altura']] }, { two: [['Trapecio', '(B + b) · h / 2'], ['Rombo', 'D · d / 2']] }, { warn: 'La **altura** es perpendicular a la base, no el lado inclinado.' }],
        s: ['Ahora, las áreas.', 'El triángulo es base por altura dividido en dos. El rectángulo y el paralelogramo son base por altura.', 'El trapecio es la suma de las bases por la altura, dividido en dos. Y el rombo es diagonal mayor por diagonal menor, dividido en dos.', 'Ojo: la altura siempre es perpendicular a la base. En un paralelogramo, el lado inclinado no es la altura, y la PAES lo usa como distractor.'] },
      { h: 'El círculo', ic: 'target', b: [{ two: [['Área', 'π · r²'], ['Perímetro (circunferencia)', '2 · π · r = π · d']] }, { eq: 'Radio 3  →  área 9π · perímetro 6π' }, { eq: 'Sector de 90° en radio 4: 16π / 4 = 4π', n: 'Un sector es una fracción del círculo: ángulo / 360°' }, { tip: 'Si te dan el **diámetro**, divide por 2 antes de usar πr².' }],
        s: ['El círculo merece atención especial.', 'Su área es pi por el radio al cuadrado, y el perímetro de su borde, la circunferencia, es dos pi por el radio.', 'Con radio tres, el área es nueve pi y el perímetro, seis pi. No los confundas.', 'Un sector circular es una porción del círculo. Un sector de noventa grados es un cuarto del círculo: en radio cuatro, dieciséis pi dividido en cuatro, o sea, cuatro pi.', 'Y cuidado: si el problema te da el diámetro, divídelo por dos antes de calcular el área.'] },
      { h: 'Volúmenes', ic: 'box', b: [{ two: [['Prisma y cilindro', 'área de la base · altura', 'Cilindro: π r² h'], ['Cono y pirámide', 'un tercio del prisma o cilindro', 'Cono: π r² h / 3']] }, { two: [['Esfera', '4 π r³ / 3'], ['Cubo', 'V = a³ · Área = 6a²']] }, { eq: 'Cilindro r = 2, h = 5  →  V = π · 4 · 5 = 20π' }, { tip: '1 m³ = 1.000 litros · 1 litro = 1.000 cm³' }],
        s: ['Pasemos a los volúmenes.', 'En los prismas y cilindros, el volumen es el área de la base por la altura. Para el cilindro, pi r cuadrado por la altura. Los conos y pirámides son un tercio de eso.', 'La esfera es cuatro tercios de pi r al cubo. Y el cubo es la arista al cubo, con un área total de seis veces la arista al cuadrado.', 'Por ejemplo, un cilindro de radio dos y altura cinco tiene un volumen de pi por cuatro por cinco: veinte pi.', 'Y si el problema habla de litros, recuerda: un metro cúbico son mil litros, y un litro son mil centímetros cúbicos.'] },
      { h: 'Agrandar figuras', ic: 'spark', b: [{ two: [['Longitudes · k', 'Áreas · k²'], ['Volúmenes · k³', 'k = factor de escala']] }, { eq: 'Radio al doble  →  área × 4' }, { eq: 'Arista al doble  →  volumen × 8' }, { q: 'Si cada lado de un cuadrado aumenta un 10 %, ¿en qué porcentaje aumenta su área?', o: ['21 %', '10 %', '20 %', '100 %'], e: 'El factor es 1,1, así que el área se multiplica por 1,1² = 1,21: aumenta 21 %.' }],
        s: ['Un truco muy útil: qué pasa al agrandar una figura.', 'Si las longitudes se multiplican por un factor ka, las áreas se multiplican por ka al cuadrado y los volúmenes por ka al cubo.', 'Si el radio de un círculo se duplica, su área se multiplica por cuatro.', 'Si la arista de un cubo se duplica, su volumen se multiplica por ocho.', 'Aplícalo.'] },
      { h: 'Problemas típicos', ic: 'pen', b: [{ ex: 'Un patio de 6 m × 4 m se cubrirá con baldosas cuadradas de 50 cm de lado. ¿Cuántas se necesitan?' }, { sol: 'Patio: 24 m². Baldosa: 0,5 · 0,5 = 0,25 m². 24 : 0,25 = **96 baldosas**' }, { warn: 'Trabaja siempre en la **misma unidad**: no mezcles metros con centímetros.' }],
        s: ['Terminemos con un problema típico de aplicación.', 'Un patio de seis por cuatro metros se cubrirá con baldosas cuadradas de cincuenta centímetros de lado. ¿Cuántas baldosas se necesitan?', 'El patio tiene veinticuatro metros cuadrados. Cada baldosa mide cero coma cinco por cero coma cinco, o sea, cero coma veinticinco metros cuadrados. Veinticuatro dividido en cero coma veinticinco: noventa y seis baldosas.', 'El error más común aquí es mezclar unidades. Antes de calcular, pasa todo a metros o todo a centímetros.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['a² + b² = c²', '3-4-5 · 5-12-13', 'Triángulo: b·h/2', 'Círculo: πr²', 'Cono = cilindro/3', 'Áreas k² · Volúmenes k³'] }],
        s: ['Resumen: usa Pitágoras en triángulos rectángulos y memoriza los tríos. Domina las fórmulas de áreas y volúmenes, y recuerda que el cono es un tercio del cilindro.', 'Al agrandar una figura, las áreas crecen con el cuadrado y los volúmenes con el cubo del factor. ¡A practicar!'] },
    ],
  });

  RB.video('v-m1j', {
    u: 'm1j', title: 'Transformaciones, vectores y semejanza', desc: 'Traslaciones, reflexiones, rotaciones, semejanza, escalas y teorema de Tales.',
    sc: [
      { h: 'Transformaciones y semejanza', sub: 'Mover, girar, reflejar y agrandar figuras', b: [{ tags: ['Vectores', 'Traslación', 'Reflexión', 'Rotación', 'Semejanza', 'Tales'] }],
        s: ['Hola. En este video veremos cómo se mueven las figuras en el plano cartesiano: traslaciones con vectores, reflexiones y rotaciones.', 'Y después veremos la semejanza: figuras con la misma forma pero distinto tamaño, junto al famoso teorema de Tales.'] },
      { h: 'Vectores y traslación', ic: 'right', b: [{ eq: '(x, y) + (a, b) = (x + a, y + b)' }, { eq: '(2, −1) trasladado según (3, 4)  →  (5, 3)' }, { eq: 'Vector de (1, 5) a (4, 2) = final − inicial = (3, −3)' }, { eq: '|(3, 4)| = √(3² + 4²) = 5', n: 'El módulo se calcula con Pitágoras' }],
        s: ['Un vector indica un desplazamiento: cuánto moverse en equis y cuánto en y.', 'Trasladar un punto según un vector es sumar componente a componente.', 'El punto dos coma menos uno, trasladado según el vector tres coma cuatro, llega a cinco coma tres.', 'Y si te dan el punto inicial y el final, el vector es final menos inicial: de uno coma cinco a cuatro coma dos, el vector es tres coma menos tres.', 'El tamaño del vector, su módulo, se calcula con Pitágoras: el vector tres coma cuatro mide cinco.'] },
      { h: 'Reflexiones', ic: 'replay', b: [{ two: [['Eje x', '(x, y) → (x, −y)'], ['Eje y', '(x, y) → (−x, y)']] }, { two: [['Origen', '(x, y) → (−x, −y)'], ['Recta y = x', '(x, y) → (y, x)']] }, { q: '¿Cuál es la reflexión de (3, 5) respecto del eje y?', o: ['(−3, 5)', '(3, −5)', '(−3, −5)', '(5, 3)'], e: 'Respecto del eje y, solo cambia el signo de x.' }],
        s: ['Una reflexión funciona como un espejo.', 'Respecto del eje equis, cambia el signo de la y. Respecto del eje y, cambia el signo de la equis.', 'Respecto del origen, cambian los dos signos. Y respecto de la recta y igual equis, se intercambian las coordenadas.', 'A ver si te acuerdas.'] },
      { h: 'Rotaciones con centro en el origen', ic: 'replay', b: [{ eq: '90° antihorario:  (x, y) → (−y, x)' }, { eq: '180°:  (x, y) → (−x, −y)' }, { eq: '270° antihorario = 90° horario:  (x, y) → (y, −x)' }, { ex: '(4, 1) rotado 90° antihorario  →  (−1, 4)' }],
        s: ['Las rotaciones giran la figura alrededor de un punto. Con centro en el origen, hay tres reglas que conviene memorizar.', 'Noventa grados en sentido antihorario: equis coma y pasa a menos y coma equis.', 'Ciento ochenta grados: cambian ambos signos, igual que la reflexión respecto del origen.', 'Y doscientos setenta grados antihorario, que es lo mismo que noventa grados en sentido horario: equis coma y pasa a y coma menos equis.', 'Por ejemplo, el punto cuatro coma uno, rotado noventa grados antihorario, llega a menos uno coma cuatro.'] },
      { h: 'Isometrías', ic: 'check', b: [{ two: [['Isometrías', 'Traslación, reflexión, rotación', 'Conservan forma y tamaño'], ['No isometrías', 'Ampliación, reducción', 'Cambian el tamaño']] }, { tip: 'Un cuadrado tiene **4 ejes de simetría**; un rectángulo, 2; un círculo, infinitos.' }],
        s: ['Un concepto clave es el de isometría.', 'Traslaciones, reflexiones y rotaciones son isometrías: mueven la figura, pero conservan su forma y su tamaño. En cambio, una ampliación o una reducción no son isometrías, porque cambian el tamaño.', 'Y un dato que aparece seguido: un cuadrado tiene cuatro ejes de simetría, un rectángulo tiene dos y un círculo tiene infinitos.'] },
      { h: 'Combinar transformaciones', ic: 'grid', b: [{ eq: 'Trasladar según (2, −3) y luego según (−5, 1)  =  trasladar según (−3, −2)', n: 'Dos traslaciones se suman' }, { eq: 'Dos rotaciones de 90°  =  una rotación de 180°' }, { eq: 'Reflejar dos veces en el mismo eje  =  volver al punto original' }, { q: 'P = (1, 2) se refleja respecto del eje x y luego respecto del eje y. ¿Dónde queda?', o: ['(−1, −2)', '(1, −2)', '(−1, 2)', '(2, 1)'], e: 'Eje x: (1, −2). Luego eje y: (−1, −2). Equivale a una rotación de 180°.' }],
        s: ['La PAES también combina transformaciones, una después de otra.', 'Dos traslaciones seguidas equivalen a una sola, según la suma de los vectores: dos coma menos tres más menos cinco coma uno da menos tres coma menos dos.', 'Dos rotaciones de noventa grados equivalen a una de ciento ochenta.', 'Y reflejar dos veces respecto del mismo eje te devuelve al punto original, como mirarse en un espejo frente a otro espejo.', 'Prueba con esta combinación.'] },
      { h: 'Semejanza', ic: 'tri', b: [{ two: [['Figuras semejantes', 'Misma forma', 'Ángulos iguales y lados proporcionales'], ['Razón de semejanza k', 'Lado grande / lado pequeño']] }, { eq: 'k = 3: un lado de 4 cm pasa a medir 12 cm' }, { two: [['Criterio AA', 'Dos ángulos iguales → triángulos semejantes'], ['Áreas y volúmenes', 'Áreas · k² · Volúmenes · k³']] }],
        s: ['Ahora, la semejanza.', 'Dos figuras son semejantes si tienen la misma forma, aunque distinto tamaño: sus ángulos son iguales y sus lados son proporcionales.', 'La razón de semejanza es el factor por el que se multiplican los lados. Si es tres, un lado de cuatro centímetros pasa a medir doce.', 'Para triángulos, basta con que tengan dos ángulos iguales para ser semejantes. Y recuerda lo del video anterior: las áreas se multiplican por ka al cuadrado y los volúmenes por ka al cubo.'] },
      { h: 'Sombras y teorema de Tales', ic: 'sun', b: [{ ex: 'Un poste de 3 m da una sombra de 2 m. A la misma hora, un árbol da una sombra de 8 m.' }, { sol: '3/2 = h/8  →  h = 12 m' }, { eq: 'Tales: si dos paralelas cortan dos rectas, los segmentos son proporcionales\n4/6 = 6/x  →  x = 9' }, { q: 'Una maqueta a escala 1 : 50 mide 40 cm de alto. ¿Cuánto mide el edificio real?', o: ['20 m', '2 m', '200 m', '50 m'], e: '40 · 50 = 2.000 cm, que son 20 m.' }],
        s: ['La semejanza resuelve problemas muy concretos, como medir alturas con sombras.', 'Un poste de tres metros proyecta una sombra de dos metros. A la misma hora, un árbol proyecta una sombra de ocho metros.', 'Como los rayos del sol llegan paralelos, los triángulos son semejantes: tres es a dos como la altura del árbol es a ocho. El árbol mide doce metros.', 'Esa misma idea es el teorema de Tales: cuando dos rectas paralelas cortan a dos rectas que se cruzan, los segmentos que se forman son proporcionales. Si en una recta los segmentos miden cuatro y seis, y en la otra seis y equis, entonces cuatro es a seis como seis es a equis, y equis vale nueve.', 'Ahora un problema de escala.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Traslación: sumar el vector', 'Eje x: cambia y', 'Eje y: cambia x', '90°: (−y, x)', 'Semejanza: lados · k', 'Tales: proporciones'] }],
        s: ['Resumen: para trasladar, suma el vector. En las reflexiones cambia el signo de la coordenada que no está en el eje, y para rotar noventa grados, equis coma y pasa a menos y coma equis.', 'En la semejanza, los lados se multiplican por ka, y el teorema de Tales te permite armar proporciones. ¡A practicar!'] },
    ],
  });
})();
