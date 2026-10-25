// Física (1): ondas y sonido; luz y óptica.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Ondas y sonido ----------
  RB.unit('fa', {
    name: 'Ondas y sonido', desc: 'Tipos de ondas, período, frecuencia, longitud de onda, rapidez y cualidades del sonido.', ic: 'wave', vid: 'v-fa', area: 'Ondas',
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
    name: 'Luz y óptica', desc: 'Espectro electromagnético, colores, reflexión, refracción, espejos, lentes y el ojo.', ic: 'eye', vid: 'v-fb', area: 'Ondas',
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

  // ---------- Videos ----------
  RB.video('v-fa', {
    u: 'fa', title: 'Ondas y sonido', desc: 'Qué es una onda, sus características, la ecuación v = λf y las cualidades del sonido.',
    sc: [
      { h: 'Ondas y sonido', sub: 'Energía que viaja sin llevarse la materia', b: [{ tags: ['Mecánicas', 'Electromagnéticas', 'Transversal', 'Longitudinal', 'v = λ · f', 'Tono e intensidad'] }],
        s: ['Hola. Las ondas están en todas partes: el sonido de tu voz, la luz de la pantalla, el wifi, las olas del mar e incluso los terremotos.', 'En este video veremos qué es una onda, cómo se clasifican, sus características, la ecuación fundamental, y todo lo que la PAES pregunta sobre el sonido.'] },
      { h: '¿Qué es una onda?', ic: 'wave', b: [{ big: 'Energía', sub: 'viaja · la materia solo oscila' }, { ex: 'En un estadio, la "ola" avanza por las galerías, pero cada persona se queda en su asiento.' }, { two: [['Mecánicas', 'Necesitan un medio', 'Sonido, olas, sismos'], ['Electromagnéticas', 'Viajan en el vacío', 'Luz, radio, rayos X']] }],
        s: ['Una onda es una perturbación que transporta energía de un lugar a otro.', 'Lo importante es que transporta energía, pero no materia. Las partículas del medio solo oscilan en torno a su posición.', 'Piensa en la ola de un estadio: la ola recorre todas las galerías, pero cada persona se queda en su asiento, solo se para y se sienta.', 'Las ondas mecánicas necesitan un medio material para viajar, como el sonido, las olas o los sismos. Las electromagnéticas, en cambio, pueden viajar en el vacío, como la luz, las ondas de radio o los rayos X.'] },
      { h: 'Transversales y longitudinales', ic: 'grid', b: [{ two: [['Transversal', 'El medio vibra **perpendicular** al avance', 'Cuerda, luz'], ['Longitudinal', 'El medio vibra **en la dirección** del avance', 'Sonido, resorte']] }, { plot: { f: [x => Math.sin(x * 2)], x: [0, 9.4], y: [-1.6, 1.6], pts: [[0.785, 1, 'cresta'], [2.356, -1, 'valle']], cap: 'Una onda transversal: crestas y valles' } }],
        s: ['Según cómo vibran las partículas, las ondas pueden ser transversales o longitudinales.', 'En una onda transversal, el medio vibra perpendicular a la dirección en que avanza la onda, como una cuerda que sube y baja. En una longitudinal, vibra en la misma dirección del avance, como un resorte que se comprime y se estira. El sonido en el aire es longitudinal.', 'En una onda transversal se distinguen las crestas, que son los puntos más altos, y los valles, los más bajos.'] },
      { h: 'Las características', ic: 'list', b: [{ two: [['Amplitud (A)', 'Máximo alejamiento del equilibrio'], ['Longitud de onda (λ)', 'Distancia entre dos crestas']] }, { two: [['Período (T)', 'Tiempo de una oscilación, en segundos'], ['Frecuencia (f)', 'Oscilaciones por segundo, en hertz']] }, { eq: 'f = 1 / T  →  f = 5 Hz  ⟹  T = 0,2 s' }],
        s: ['Toda onda tiene cuatro características.', 'La amplitud es el máximo alejamiento desde la posición de equilibrio: está relacionada con la energía. La longitud de onda, que se escribe con la letra griega lambda, es la distancia entre dos crestas consecutivas.', 'El período es el tiempo que demora una oscilación completa. Y la frecuencia es cuántas oscilaciones ocurren en un segundo; se mide en hertz.', 'Período y frecuencia son inversos: si la frecuencia es cinco hertz, el período es un quinto de segundo, cero coma dos segundos.'] },
      { h: 'La ecuación fundamental', ic: 'calc', b: [{ eq: 'v = λ · f' }, { eq: 'λ = 2 m · f = 50 Hz  →  v = 100 m/s' }, { tip: 'Al cambiar de medio, la **frecuencia no cambia**: cambian la rapidez y la longitud de onda.' }, { q: 'Una onda viaja a 340 m/s con frecuencia 170 Hz. ¿Cuál es su longitud de onda?', o: ['2 m', '0,5 m', '510 m', '57.800 m'], e: 'λ = v/f = 340/170 = 2 m.' }],
        s: ['Ahora, la ecuación que conecta todo.', 'La ecuación más importante de las ondas es: rapidez igual longitud de onda por frecuencia.', 'Si una onda tiene dos metros de longitud de onda y una frecuencia de cincuenta hertz, viaja a cien metros por segundo.', 'Un dato clave: cuando una onda pasa de un medio a otro, la frecuencia se mantiene, porque la impone la fuente. Lo que cambia es la rapidez y, con ella, la longitud de onda.', 'Calcula tú.'] },
      { h: 'El sonido', ic: 'vol', b: [{ bars: [['Aire', 340], ['Agua', 1500], ['Acero', 5000]], u: ' m/s' }, { warn: 'En el **vacío no hay sonido**: es una onda mecánica.' }, { two: [['Infrasonido', 'Menos de 20 Hz'], ['Ultrasonido', 'Más de 20.000 Hz']] }],
        s: ['El sonido es una onda mecánica longitudinal, y su rapidez depende del medio.', 'En el aire viaja a unos trescientos cuarenta metros por segundo, en el agua a unos mil quinientos, y en el acero a unos cinco mil. En general, es más rápido en sólidos que en líquidos, y en líquidos que en gases.', 'Y como necesita un medio, en el vacío del espacio no hay sonido.', 'Los humanos oímos entre veinte y veinte mil hertz. Por debajo están los infrasonidos y por encima, los ultrasonidos, que usan los murciélagos y las ecografías.'] },
      { h: 'Cualidades del sonido', ic: 'mic', b: [{ two: [['Intensidad', 'Volumen · depende de la **amplitud** · se mide en dB'], ['Tono', 'Agudo o grave · depende de la **frecuencia**']] }, { two: [['Timbre', 'Distingue instrumentos · forma de la onda'], ['Ejemplo', 'Agudo = alta frecuencia']] }],
        s: ['El sonido tiene tres cualidades.', 'La intensidad, o volumen, depende de la amplitud de la onda y se mide en decibeles. El tono es lo agudo o grave, y depende de la frecuencia: un sonido agudo tiene alta frecuencia.', 'Y el timbre es lo que permite distinguir una guitarra de un piano tocando la misma nota: depende de la forma de la onda.'] },
      { h: 'Fenómenos del sonido', ic: 'spark', b: [{ two: [['Eco', 'Reflexión del sonido', 'd = v · t / 2'], ['Efecto Doppler', 'Fuente que se acerca: más agudo']] }, { two: [['Resonancia', 'Vibrar con la frecuencia natural', 'La copa que se rompe'], ['Difracción', 'El sonido rodea obstáculos']] }, { q: 'Gritas frente a un cerro y oyes el eco 2 s después. Con v = 340 m/s, ¿a qué distancia está el cerro?', o: ['340 m', '680 m', '170 m', '1.360 m'], e: 'El sonido va y vuelve: recorre 680 m, así que el cerro está a 340 m.' }],
        s: ['Por último, los fenómenos que más se preguntan.', 'El eco es el sonido reflejado. Y el efecto Doppler es el cambio de tono cuando la fuente se mueve: una ambulancia que se acerca suena más aguda, y al alejarse, más grave.', 'La resonancia ocurre cuando algo vibra con su frecuencia natural y su vibración crece muchísimo: así una cantante puede romper una copa. Y la difracción permite que el sonido rodee obstáculos: por eso oyes a alguien en la pieza de al lado aunque no lo veas.', 'Un problema de eco: recuerda que el sonido va y vuelve.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Energía, no materia', 'v = λ · f', 'f = 1/T', 'Sonido: mecánico y longitudinal', 'Tono ↔ frecuencia', 'Intensidad ↔ amplitud'] }],
        s: ['Resumen: las ondas transportan energía sin transportar materia. Rapidez igual longitud de onda por frecuencia, y la frecuencia no cambia al cambiar de medio.', 'El sonido es mecánico y longitudinal: el tono depende de la frecuencia y la intensidad, de la amplitud. ¡A practicar!'] },
    ],
  });

  RB.video('v-fb', {
    u: 'fb', title: 'Luz y óptica', desc: 'Espectro electromagnético, colores, reflexión, refracción, espejos, lentes y el ojo humano.',
    sc: [
      { h: 'Luz y óptica', sub: 'Cómo viaja la luz y cómo la desviamos', b: [{ tags: ['Espectro', 'Colores', 'Reflexión', 'Refracción', 'Espejos', 'Lentes', 'Ojo'] }],
        s: ['Hola. En este video vamos a estudiar la luz: qué es, cómo se relaciona con otras ondas, por qué vemos colores, y cómo los espejos y las lentes la desvían.', 'Al final veremos cómo funciona el ojo humano y cómo se corrigen la miopía y la hipermetropía.'] },
      { h: 'La luz es una onda electromagnética', ic: 'sun', b: [{ big: '300.000 km/s', sub: 'rapidez de la luz en el vacío' }, 'No necesita medio: por eso llega la luz del Sol', { tip: 'La luz del Sol tarda unos **8 minutos** en llegar: vemos el Sol como era hace 8 minutos.' }],
        s: ['La luz es una onda electromagnética.', 'Viaja a unos trescientos mil kilómetros por segundo en el vacío, la máxima rapidez posible.', 'Como no necesita un medio, puede cruzar el espacio vacío. Por eso nos llega la luz del Sol.', 'Y aunque es rapidísima, la distancia al Sol es tan grande que su luz tarda unos ocho minutos en llegar. Cuando miras el Sol, lo ves como era hace ocho minutos.'] },
      { h: 'El espectro electromagnético', ic: 'wave', b: [{ tl: 'Radio', t: 'Menor frecuencia, mayor longitud de onda' }, { tl: 'Microondas · Infrarrojo', t: 'Hornos, controles remotos, calor' }, { tl: 'Luz visible', t: 'Del rojo al violeta' }, { tl: 'Ultravioleta · Rayos X · Gamma', t: 'Mayor frecuencia y más energía' }],
        s: ['La luz visible es solo una pequeña parte del espectro electromagnético. Todas estas ondas son de la misma naturaleza y viajan a la misma rapidez en el vacío; se diferencian por su frecuencia.', 'En un extremo están las ondas de radio, con la menor frecuencia y la mayor longitud de onda.', 'Luego vienen las microondas y el infrarrojo, que usan los hornos y los controles remotos.', 'Después, la luz visible, que va del rojo, de menor frecuencia, al violeta, de mayor frecuencia.', 'Y en el otro extremo, el ultravioleta, que causa las quemaduras solares, los rayos X y los rayos gamma, con la mayor frecuencia y energía.'] },
      { h: 'Los colores', ic: 'spark', b: [{ ex: 'Un prisma separa la luz blanca en colores: **dispersión**' }, { two: [['Objeto rojo', 'Refleja el rojo, absorbe el resto'], ['Objeto negro', 'Absorbe todos los colores']] }, { q: '¿Qué color de la luz visible tiene la mayor frecuencia?', o: ['Violeta', 'Rojo', 'Amarillo', 'Verde'], e: 'El violeta tiene la mayor frecuencia de la luz visible; el rojo, la menor.' }],
        s: ['¿De dónde vienen los colores?', 'La luz blanca es una mezcla de todos los colores. Al pasar por un prisma, cada color se desvía distinto y se separan. Eso se llama dispersión, y es lo que forma el arcoíris.', 'Un objeto se ve rojo porque refleja la luz roja y absorbe los demás colores. Un objeto negro absorbe todos los colores, y uno blanco los refleja todos.', 'Pregunta rápida.'] },
      { h: 'Reflexión', ic: 'replay', b: [{ eq: 'ángulo de incidencia = ángulo de reflexión', n: 'Ambos se miden respecto de la normal' }, { two: [['Espejo plano', 'Imagen virtual, del mismo tamaño, invierte izquierda y derecha'], ['Reflexión total interna', 'Base de la fibra óptica']] }],
        s: ['Cuando la luz choca con una superficie y rebota, ocurre la reflexión.', 'La regla es simple: el ángulo con que llega es igual al ángulo con que sale, ambos medidos respecto de la normal, que es la línea perpendicular a la superficie.', 'En un espejo plano, la imagen es virtual, del mismo tamaño y parece estar a la misma distancia detrás del espejo, con la izquierda y la derecha invertidas. Y la reflexión total interna, en la que la luz queda atrapada rebotando, es la base de la fibra óptica.'] },
      { h: 'Refracción', ic: 'flask', b: [{ ex: 'Un lápiz en un vaso con agua parece quebrado' }, 'Al cambiar de medio, la luz **cambia de rapidez** y se **desvía**', { eq: 'n = c / v  →  vidrio: n = 1,5  ⟹  v = 200.000 km/s' }, { tip: 'Más lenta en el medio → se acerca a la normal.' }],
        s: ['El otro gran fenómeno es la refracción.', 'Es lo que explica por qué un lápiz se ve quebrado dentro de un vaso con agua.', 'Cuando la luz pasa de un medio a otro, cambia su rapidez y, por eso, cambia de dirección.', 'El índice de refracción indica cuántas veces más lenta es la luz en un medio que en el vacío. En el vidrio es uno coma cinco, así que la luz viaja a doscientos mil kilómetros por segundo.', 'Cuando la luz entra a un medio donde va más lenta, como del aire al agua, se acerca a la normal. Los espejismos en la carretera también son refracción, en capas de aire caliente.'] },
      { h: 'Espejos curvos y lentes', ic: 'eye', b: [{ two: [['Espejo cóncavo', 'Concentra la luz · linternas, focos'], ['Espejo convexo', 'Campo de visión amplio · retrovisores']] }, { two: [['Lente convergente', 'Junta los rayos · lupa, cámaras', 'Imágenes reales o virtuales'], ['Lente divergente', 'Separa los rayos', 'Siempre virtuales y más pequeñas']] }],
        s: ['Los espejos curvos y las lentes desvían la luz a voluntad.', 'Los espejos cóncavos concentran la luz, como en linternas y focos. Los convexos dan un campo de visión más amplio, por eso se usan como retrovisores, aunque los objetos se vean más pequeños.', 'Las lentes convergentes juntan los rayos: una lupa es una lente convergente. Las divergentes los separan y siempre forman imágenes virtuales, derechas y más pequeñas.'] },
      { h: 'El ojo humano', ic: 'eye', b: [{ two: [['Cristalino', 'Lente convergente que enfoca'], ['Retina', 'Donde se forma la imagen']] }, { two: [['Miopía', 'Ve mal de lejos · imagen antes de la retina', 'Se corrige con lente **divergente**'], ['Hipermetropía', 'Ve mal de cerca · imagen detrás de la retina', 'Se corrige con lente **convergente**']] }, { q: 'Una persona ve mal de lejos. ¿Qué lente necesita?', o: ['Divergente', 'Convergente', 'Plana', 'Un prisma'], e: 'Es miopía: la imagen se forma antes de la retina y una lente divergente la retrasa.' }],
        s: ['El ojo humano es un instrumento óptico.', 'El cristalino funciona como una lente convergente que enfoca la imagen sobre la retina, donde están las células sensibles a la luz.', 'En la miopía, la persona ve mal de lejos porque la imagen se forma antes de la retina, y se corrige con lentes divergentes. En la hipermetropía, ve mal de cerca porque la imagen se forma detrás de la retina, y se corrige con lentes convergentes.', 'Aplícalo.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['c = 300.000 km/s', 'Violeta: mayor f', 'Color reflejado', 'i = r', 'Refracción: cambio de rapidez', 'Miopía: divergente'] }],
        s: ['Resumen: la luz es una onda electromagnética, el color que vemos es el que se refleja, y en la reflexión el ángulo de incidencia es igual al de reflexión.', 'La refracción ocurre por el cambio de rapidez. Y recuerda: la miopía se corrige con lentes divergentes y la hipermetropía con convergentes. ¡A practicar!'] },
    ],
  });
})();
