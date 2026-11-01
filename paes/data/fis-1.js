// Física (1): ondas y sonido; luz y óptica.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Ondas y sonido ----------
  RB.unit('fa', {
    name: 'Ondas y sonido', desc: 'Tipos de ondas, período, frecuencia, longitud de onda, rapidez y cualidades del sonido.', ic: 'wave', area: 'Ondas',
    lessons: [
      {
        n: 'Características de las ondas', ic: 'wave', items: [
          { t: 'info', ic: 'wave', title: 'Ondas', txt: 'Una onda es una perturbación que **transporta energía sin transportar materia**. Las **mecánicas** necesitan un medio (sonido); las **electromagnéticas** pueden viajar en el vacío (luz).' },
          M('¿Qué transporta una onda?', ['Energía, sin transportar materia', 'Materia y energía', 'Solo materia', 'Partículas de aire de un lugar a otro'], 'Las partículas del medio solo oscilan alrededor de su posición.'),
          S('Clasifica cada onda', ['Mecánica', 'Electromagnética'], [['Sonido', 0], ['Luz', 1], ['Ola del mar', 0], ['Rayos X', 1], ['Onda sísmica', 0], ['Microondas', 1]], 'Las mecánicas necesitan un medio material.'),
          M('En una onda transversal, las partículas del medio vibran:', ['Perpendiculares a la dirección de propagación', 'En la misma dirección de propagación', 'En círculos', 'No vibran'], 'Como una cuerda que sube y baja mientras la onda avanza.'),
          M('El sonido en el aire es una onda:', ['Longitudinal', 'Transversal', 'Electromagnética', 'Que no transporta energía'], 'Las moléculas vibran en la dirección en que avanza el sonido (compresiones y enrarecimientos).'),
          P('Une cada concepto con su definición', [['Período', 'Tiempo de una oscilación completa'], ['Frecuencia', 'Oscilaciones por segundo'], ['Longitud de onda', 'Distancia entre dos crestas consecutivas'], ['Amplitud', 'Máximo alejamiento desde la posición de equilibrio']], 'La frecuencia se mide en hertz (Hz).'),
          M('Si una onda tiene una frecuencia de 5 Hz, su período es:', ['0,2 s', '5 s', '0,5 s', '25 s'], 'T = 1/f = 1/5.'),
          M('Una onda tiene longitud de onda 2 m y frecuencia 50 Hz. ¿Cuál es su rapidez?', ['100 m/s', '25 m/s', '52 m/s', '0,04 m/s'], 'v = λ · f = 2 · 50.'),
          M('Si la frecuencia de una onda aumenta y su rapidez se mantiene, su longitud de onda:', ['Disminuye', 'Aumenta', 'No cambia', 'Se anula'], 'λ = v/f: son inversamente proporcionales.'),
          N('Una onda viaja a 340 m/s y su frecuencia es 170 Hz. ¿Cuál es su longitud de onda?', 2, 'm', 'λ = v/f = 340/170.'),
          T('Las ondas electromagnéticas pueden propagarse en el vacío.', true, 'Por eso nos llega la luz del Sol.'),
          M('Cuando una onda pasa de un medio a otro, ¿qué se mantiene constante?', ['La frecuencia', 'La rapidez', 'La longitud de onda', 'La dirección'], 'La frecuencia la impone la fuente; cambian la rapidez y la longitud de onda.'),
        ],
      },
      {
        n: 'El sonido', ic: 'vol', items: [
          M('¿Por qué el sonido no se propaga en el espacio exterior?', ['Porque necesita un medio material y allí hay vacío', 'Porque hace mucho frío', 'Porque la luz lo bloquea', 'Porque viaja demasiado rápido'], 'Es una onda mecánica.'),
          M('¿En qué medio se propaga más rápido el sonido?', ['En los sólidos', 'En los gases', 'En el vacío', 'Igual en todos los medios'], 'En el aire ~340 m/s, en el agua ~1.500 m/s y en el acero ~5.000 m/s.'),
          P('Une cada cualidad del sonido con la propiedad de la onda', [['Intensidad (volumen)', 'Amplitud'], ['Tono (agudo o grave)', 'Frecuencia'], ['Timbre', 'Forma de la onda (armónicos)']], 'Son las tres cualidades del sonido.'),
          M('Un sonido agudo tiene:', ['Mayor frecuencia', 'Mayor amplitud', 'Menor frecuencia', 'Mayor longitud de onda'], 'Agudo = alta frecuencia; grave = baja frecuencia.'),
          M('El rango audible para el ser humano es aproximadamente:', ['De 20 Hz a 20.000 Hz', 'De 0 Hz a 100 Hz', 'De 200 Hz a 2.000 Hz', 'De 20.000 Hz a 200.000 Hz'], 'Bajo 20 Hz: infrasonido; sobre 20.000 Hz: ultrasonido.'),
          M('Los sonidos de frecuencia mayor que 20.000 Hz se llaman:', ['Ultrasonidos', 'Infrasonidos', 'Ecos', 'Decibeles'], 'Los usan los murciélagos y las ecografías.'),
          M('Una persona grita frente a un cerro y escucha el eco 2 s después. Si el sonido viaja a 340 m/s, ¿a qué distancia está el cerro?', ['340 m', '680 m', '170 m', '1.360 m'], 'El sonido va y vuelve: recorre 680 m en total, así que el cerro está a la mitad.'),
          M('Una ambulancia se acerca con la sirena encendida. Una persona detenida en la vereda percibe un sonido:', ['Más agudo que el real', 'Más grave que el real', 'Igual al real', 'Sin sonido'], 'Efecto Doppler: al acercarse la fuente, aumenta la frecuencia percibida.'),
          M('¿Qué permite distinguir una misma nota tocada por una guitarra y por un piano?', ['El timbre', 'La intensidad', 'El tono', 'La rapidez'], 'Cada instrumento produce distintos armónicos.'),
          M('Una copa se rompe cuando una cantante emite una nota con la frecuencia natural de la copa. Este fenómeno se llama:', ['Resonancia', 'Refracción', 'Difracción', 'Absorción'], 'Al coincidir las frecuencias, la amplitud de vibración crece mucho.'),
          T('El decibel (dB) es la unidad del nivel de intensidad sonora.', true, 'Sobre unos 85 dB, la exposición prolongada daña el oído.'),
          M('Podemos oír a alguien que habla en la pieza de al lado con la puerta abierta, aunque no lo veamos, gracias a la:', ['Difracción', 'Refracción', 'Polarización', 'Absorción'], 'El sonido rodea obstáculos y aberturas de tamaño parecido a su longitud de onda.'),
        ],
      },
    ],
  });

  // ---------- Luz y óptica ----------
  RB.unit('fb', {
    name: 'Luz y óptica', desc: 'Espectro electromagnético, colores, reflexión, refracción, espejos, lentes y el ojo.', ic: 'eye', area: 'Ondas',
    lessons: [
      {
        n: 'Luz y espectro', ic: 'sun', items: [
          { t: 'info', ic: 'sun', title: 'La luz', txt: 'La luz es una **onda electromagnética** que viaja a unos **300.000 km/s** en el vacío. La luz visible es solo una pequeña parte del espectro electromagnético.' },
          M('La rapidez de la luz en el vacío es aproximadamente:', ['300.000 km/s', '340 m/s', '300 km/s', '3.000 km/s'], 'c ≈ 3 · 10⁸ m/s.'),
          O('Ordena de menor a mayor frecuencia', ['Ondas de radio', 'Microondas', 'Infrarrojo', 'Luz visible', 'Ultravioleta', 'Rayos X'], 'A mayor frecuencia, menor longitud de onda y más energía.'),
          M('¿Qué color de la luz visible tiene mayor frecuencia?', ['Violeta', 'Rojo', 'Verde', 'Amarillo'], 'El violeta está junto al ultravioleta; el rojo, junto al infrarrojo.'),
          M('La luz blanca, al pasar por un prisma, se separa en colores. Este fenómeno se llama:', ['Dispersión', 'Reflexión', 'Difracción', 'Interferencia'], 'Cada color se refracta con un ángulo distinto. Así se forma el arcoíris.'),
          M('Un objeto se ve rojo porque:', ['Refleja la luz roja y absorbe los demás colores', 'Absorbe la luz roja', 'Emite luz roja siempre', 'Refracta la luz azul'], 'El color que vemos es el que el objeto refleja.'),
          T('Las ondas de radio y la luz visible son ondas de la misma naturaleza.', true, 'Ambas son electromagnéticas; difieren en su frecuencia.'),
          M('¿Qué radiación usa el control remoto de un televisor?', ['Infrarroja', 'Ultravioleta', 'Rayos X', 'Rayos gamma'], 'Es invisible y de baja energía.'),
          M('¿Qué radiación es responsable de las quemaduras solares?', ['Ultravioleta', 'Infrarroja', 'Microondas', 'Ondas de radio'], 'Por eso se usa bloqueador UV.'),
          M('La luz del Sol demora unos 8 minutos en llegar a la Tierra. Eso significa que cuando miramos el Sol:', ['Lo vemos como era hace 8 minutos', 'Lo vemos en tiempo real', 'Lo vemos 8 minutos en el futuro', 'No lo podemos ver'], 'La luz que llega a nuestros ojos salió del Sol hace 8 minutos.'),
        ],
      },
      {
        n: 'Reflexión y refracción', ic: 'replay', items: [
          { t: 'info', ic: 'replay', title: 'Reflexión y refracción', txt: '**Reflexión**: la luz rebota y el ángulo de incidencia es igual al de reflexión. **Refracción**: al cambiar de medio, la luz cambia de rapidez y se **desvía**.' },
          M('Un rayo incide sobre un espejo plano con un ángulo de 30° respecto de la normal. ¿Con qué ángulo se refleja?', ['30°', '60°', '90°', '15°'], 'Ángulo de incidencia = ángulo de reflexión.'),
          M('Un lápiz dentro de un vaso con agua parece quebrado. Esto se debe a la:', ['Refracción', 'Reflexión', 'Dispersión', 'Difracción'], 'La luz cambia de dirección al pasar del agua al aire.'),
          M('Cuando la luz pasa del aire al agua:', ['Disminuye su rapidez y se acerca a la normal', 'Aumenta su rapidez', 'No cambia de dirección nunca', 'Se convierte en sonido'], 'El agua es un medio más "denso" ópticamente.'),
          M('La imagen en un espejo plano es:', ['Virtual, del mismo tamaño y a la misma distancia detrás del espejo', 'Real e invertida', 'Más pequeña que el objeto', 'Real y más grande'], 'Parece estar detrás del espejo, pero no se puede proyectar en una pantalla.'),
          M('La reflexión total interna es el principio de funcionamiento de:', ['La fibra óptica', 'El horno microondas', 'La radio AM', 'El parlante'], 'La luz queda "atrapada" rebotando dentro de la fibra.'),
          M('Un espejismo en la carretera en un día caluroso se explica por:', ['La refracción de la luz en capas de aire a distinta temperatura', 'La reflexión en el pavimento mojado', 'La difracción del sonido', 'La dispersión en un prisma'], 'La luz del cielo se curva y parece venir del suelo.'),
          T('En un espejo plano, la izquierda y la derecha de la imagen aparecen invertidas.', true, 'Si levantas la mano derecha, tu imagen levanta la que está frente a ella.'),
          M('El índice de refracción de un medio indica:', ['Cuántas veces más lenta es la luz en ese medio que en el vacío', 'El color de la luz', 'La temperatura del medio', 'La masa del medio'], 'n = c / v.'),
          N('El índice de refracción del vidrio es 1,5. ¿Cuál es la rapidez de la luz en el vidrio, en km/s? (c = 300.000 km/s)', 200000, 'km/s', 'v = c / n = 300.000 / 1,5.'),
        ],
      },
      {
        n: 'Espejos, lentes y el ojo', ic: 'eye', items: [
          M('¿Qué tipo de lente usa una lupa?', ['Convergente', 'Divergente', 'Plana', 'Un prisma'], 'Una lente convergente cerca del objeto forma una imagen virtual y aumentada.'),
          M('Una persona miope ve mal de lejos. ¿Qué lente corrige la miopía?', ['Divergente', 'Convergente', 'Plana', 'Ninguna'], 'En la miopía la imagen se forma antes de la retina.'),
          M('Una persona hipermétrope ve mal de cerca. ¿Qué lente la corrige?', ['Convergente', 'Divergente', 'Plana', 'Ninguna'], 'En la hipermetropía la imagen se forma detrás de la retina.'),
          M('Los espejos retrovisores laterales de los autos suelen ser convexos porque:', ['Muestran un campo de visión más amplio', 'Agrandan los objetos', 'Forman imágenes reales', 'Concentran la luz'], 'A cambio, los objetos se ven más pequeños y parecen más lejanos.'),
          M('Un espejo cóncavo, como el de una linterna, sirve para:', ['Concentrar o dirigir los rayos de luz', 'Dispersar la luz en todas direcciones', 'Formar siempre imágenes más pequeñas', 'Absorber la luz'], 'Con la ampolleta en el foco, los rayos salen paralelos.'),
          M('En el ojo humano, ¿qué estructura funciona como una lente convergente?', ['El cristalino', 'La retina', 'La pupila', 'El nervio óptico'], 'El cristalino cambia de forma para enfocar.'),
          M('En el ojo, la imagen se forma en:', ['La retina', 'El iris', 'La córnea', 'La pupila'], 'La retina tiene los fotorreceptores (conos y bastones).'),
          T('Una lente convergente puede formar imágenes reales e invertidas.', true, 'Ocurre cuando el objeto está más lejos que el foco, como en una cámara o un proyector.'),
          M('Una lente divergente siempre forma imágenes:', ['Virtuales, derechas y más pequeñas', 'Reales e invertidas', 'Más grandes', 'Reales y derechas'], 'Por eso las gafas de un miope achican la imagen.'),
          P('Une cada instrumento con su elemento óptico principal', [['Lupa', 'Lente convergente'], ['Periscopio', 'Espejos planos'], ['Retrovisor lateral', 'Espejo convexo'], ['Linterna', 'Espejo cóncavo']], 'Cada uno aprovecha una forma distinta de desviar la luz.'),
        ],
      },
    ],
  });
})();
