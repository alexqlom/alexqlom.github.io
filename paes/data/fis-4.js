// Física (4): electricidad y magnetismo; la Tierra y el universo.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Electricidad y magnetismo ----------
  RB.unit('fg', {
    name: 'Electricidad y magnetismo', desc: 'Carga y electrización, corriente, ley de Ohm, circuitos, potencia eléctrica, imanes e inducción.', ic: 'bolt', vid: 'v-fg', area: 'Electricidad',
    lessons: [
      {
        n: 'Carga eléctrica', ic: 'atom', items: [
          { t: 'info', ic: 'atom', title: 'Carga eléctrica', txt: 'Hay dos tipos de carga: positiva y negativa. **Cargas iguales se repelen y distintas se atraen.** Al electrizar un cuerpo, la carga no se crea: se **transfieren electrones**.' },
          M('Dos cuerpos con carga del mismo signo:', ['Se repelen', 'Se atraen', 'No interactúan', 'Se neutralizan siempre'], 'Iguales se repelen.'),
          M('Al frotar un globo con el pelo, el globo queda con carga negativa porque:', ['Gana electrones', 'Gana protones', 'Pierde electrones', 'Crea carga nueva'], 'Los electrones pasan del pelo al globo; los protones no se mueven.'),
          S('Clasifica cada material', ['Conductor', 'Aislante'], [['Cobre', 0], ['Plástico', 1], ['Agua con sales', 0], ['Vidrio', 1], ['Aluminio', 0], ['Goma', 1]], 'Los conductores permiten el movimiento de cargas.'),
          M('Según la ley de Coulomb, si la distancia entre dos cargas se duplica, la fuerza entre ellas:', ['Se reduce a la cuarta parte', 'Se reduce a la mitad', 'Se duplica', 'No cambia'], 'Depende del inverso del cuadrado de la distancia: 1/2² = 1/4.'),
          T('En la electrización, la carga no se crea: se transfiere de un cuerpo a otro.', true, 'Es la conservación de la carga.'),
          M('Un rayo es:', ['Una descarga eléctrica entre nubes o entre una nube y el suelo', 'Un tipo de onda sonora', 'Una corriente de agua', 'Un imán gigante'], 'El trueno es el sonido que produce.'),
          M('La unidad de carga eléctrica es:', ['El coulomb', 'El ampere', 'El volt', 'El ohm'], 'El ampere es de corriente; el volt, de voltaje; el ohm, de resistencia.'),
        ],
      },
      {
        n: 'Circuitos y ley de Ohm', ic: 'grid', items: [
          { t: 'info', ic: 'grid', title: 'Ley de Ohm', txt: 'Voltaje V (volt), corriente I (ampere), resistencia R (ohm): **V = I · R**. Potencia eléctrica: **P = V · I**. En serie las resistencias se suman; en paralelo el total es menor que cada una.' },
          M('Una ampolleta de resistencia 20 Ω se conecta a 220 V. ¿Qué corriente circula?', ['11 A', '4.400 A', '0,09 A', '240 A'], 'I = V/R = 220/20.'),
          M('Por una resistencia de 10 Ω circulan 2 A. ¿Cuál es el voltaje?', ['20 V', '5 V', '0,2 V', '12 V'], 'V = I · R.'),
          M('Dos resistencias de 6 Ω en serie equivalen a:', ['12 Ω', '3 Ω', '6 Ω', '36 Ω'], 'En serie se suman.'),
          M('Dos resistencias de 6 Ω en paralelo equivalen a:', ['3 Ω', '12 Ω', '6 Ω', '36 Ω'], '1/R = 1/6 + 1/6 = 1/3.'),
          M('En las casas, los artefactos se conectan en paralelo porque:', ['Cada uno recibe el mismo voltaje y funciona de forma independiente', 'Así consumen menos', 'Así la corriente es la misma en todos', 'Es más barato'], 'Si uno se apaga, los demás siguen funcionando.'),
          M('En un circuito en serie, si se quema una ampolleta:', ['Se apagan todas', 'Las demás siguen encendidas', 'Las demás brillan más', 'No pasa nada'], 'El circuito queda abierto.'),
          M('Un hervidor de 2.000 W conectado a 220 V consume una corriente aproximada de:', ['9 A', '440.000 A', '0,1 A', '2.220 A'], 'I = P/V = 2.000/220.'),
          N('Una plancha de 1.000 W se usa durante 3 horas. ¿Cuántos kWh consume?', 3, 'kWh', '1 kW · 3 h.'),
          T('La corriente eléctrica es un flujo de cargas, en los metales generalmente de electrones.', true, 'Se mide en amperes.'),
        ],
      },
      {
        n: 'Magnetismo', ic: 'magnet', items: [
          M('Dos polos magnéticos iguales (norte con norte):', ['Se repelen', 'Se atraen', 'No interactúan', 'Se anulan'], 'Como las cargas: iguales se repelen.'),
          M('Una brújula apunta hacia el norte porque:', ['La Tierra se comporta como un gran imán', 'El Sol la atrae', 'Está cargada eléctricamente', 'El viento la mueve'], 'La aguja se alinea con el campo magnético terrestre.'),
          M('Una corriente eléctrica que circula por un cable:', ['Genera un campo magnético a su alrededor', 'No tiene efectos magnéticos', 'Genera sonido', 'Crea carga nueva'], 'Lo descubrió Oersted.'),
          M('Un electroimán es:', ['Un imán que funciona con corriente eléctrica y se puede encender y apagar', 'Un imán natural', 'Un aislante', 'Una pila'], 'Una bobina con corriente alrededor de un núcleo de hierro.'),
          M('Al mover un imán dentro de una bobina se genera corriente. Este fenómeno se llama:', ['Inducción electromagnética', 'Electrización por frotamiento', 'Resistencia', 'Dilatación'], 'Lo describió Faraday.'),
          M('¿Qué aparato transforma energía mecánica en eléctrica usando la inducción?', ['El generador', 'El motor eléctrico', 'La ampolleta', 'La pila'], 'Así funcionan las centrales eléctricas.'),
          M('¿Qué aparato transforma energía eléctrica en mecánica?', ['El motor eléctrico', 'El generador', 'El transformador', 'El termómetro'], 'Ventiladores, lavadoras, autos eléctricos.'),
          T('Si se corta un imán por la mitad, se obtienen un polo norte y un polo sur separados.', false, 'Cada mitad vuelve a tener norte y sur.'),
        ],
      },
    ],
  });

  // ---------- Tierra y universo ----------
  RB.unit('fh', {
    name: 'La Tierra y el universo', desc: 'Estructura interna, placas tectónicas, sismos, sistema solar, gravitación, leyes de Kepler y el universo.', ic: 'planet', vid: 'v-fh', area: 'Tierra y universo',
    lessons: [
      {
        n: 'Estructura de la Tierra y sismos', ic: 'globe', items: [
          { t: 'info', ic: 'globe', title: 'La Tierra por dentro', txt: 'Capas: **corteza**, **manto**, **núcleo externo** (líquido) y **núcleo interno** (sólido). La litosfera está dividida en **placas tectónicas** que se mueven sobre el manto.' },
          O('Ordena las capas de la Tierra desde la superficie hacia el centro', ['Corteza', 'Manto', 'Núcleo externo', 'Núcleo interno'], 'El núcleo externo es líquido y el interno, sólido.'),
          M('¿Qué capa de la Tierra es líquida?', ['El núcleo externo', 'El núcleo interno', 'La corteza', 'La litosfera'], 'Su movimiento genera el campo magnético terrestre.'),
          M('Chile tiene muchos sismos porque está en una zona donde:', ['La placa de Nazca se hunde bajo la placa Sudamericana (subducción)', 'No hay placas tectónicas', 'La corteza es muy gruesa', 'El núcleo está cerca de la superficie'], 'La subducción acumula y libera energía.'),
          M('El punto en el interior de la Tierra donde se origina un sismo se llama:', ['Hipocentro o foco', 'Epicentro', 'Magnitud', 'Falla'], '"Hipo" = debajo.'),
          M('El punto de la superficie que está justo encima del foco se llama:', ['Epicentro', 'Hipocentro', 'Núcleo', 'Cráter'], '"Epi" = encima.'),
          P('Une cada concepto con su descripción', [['Escala de magnitud (Richter o de momento)', 'La energía liberada por el sismo'], ['Escala de Mercalli', 'Los efectos y daños percibidos en un lugar'], ['Sismógrafo', 'Instrumento que registra las ondas sísmicas']], 'Un sismo tiene una sola magnitud, pero distintas intensidades según el lugar.'),
          M('Las ondas sísmicas que llegan primero a una estación son:', ['Las ondas P (primarias)', 'Las ondas S', 'Las ondas superficiales', 'Todas a la vez'], 'Son longitudinales y las más rápidas.'),
          M('Las ondas S no atraviesan el núcleo externo porque:', ['No se propagan en líquidos', 'Son muy rápidas', 'Son electromagnéticas', 'Son longitudinales'], 'Son transversales y los líquidos no las transmiten.'),
          T('Un tsunami puede originarse por un sismo bajo el mar.', true, 'El fondo marino desplaza grandes volúmenes de agua.'),
          M('El terremoto de Valdivia de 1960 es conocido por ser:', ['El de mayor magnitud registrado en la historia', 'El primero ocurrido en Chile', 'Un sismo sin tsunami', 'Un sismo de baja magnitud'], 'Magnitud 9,5.'),
        ],
      },
      {
        n: 'Sistema solar y gravitación', ic: 'planet', items: [
          { t: 'info', ic: 'planet', title: 'Gravitación y Kepler', txt: 'Ley de gravitación: la fuerza es proporcional a las masas e **inversamente proporcional al cuadrado de la distancia**. Kepler: órbitas **elípticas**, más rapidez **cerca** del Sol, y más **período** mientras más lejos.' },
          M('Según la ley de gravitación universal, si la distancia entre dos cuerpos se duplica, la fuerza:', ['Se reduce a la cuarta parte', 'Se reduce a la mitad', 'Se duplica', 'No cambia'], 'F ∝ 1/d².'),
          M('Según la primera ley de Kepler, las órbitas de los planetas son:', ['Elipses, con el Sol en uno de sus focos', 'Círculos perfectos con la Tierra al centro', 'Líneas rectas', 'Espirales'], 'El Sol no está en el centro de la elipse, sino en un foco.'),
          M('Según la segunda ley de Kepler, un planeta se mueve:', ['Más rápido cuando está más cerca del Sol', 'Siempre a la misma rapidez', 'Más rápido lejos del Sol', 'Solo de noche'], 'Barre áreas iguales en tiempos iguales.'),
          M('Según la tercera ley de Kepler, los planetas más lejanos al Sol:', ['Tardan más en dar una vuelta', 'Tardan menos', 'Tardan lo mismo', 'No giran'], 'T² es proporcional al cubo de la distancia media.'),
          M('Las estaciones del año se producen principalmente por:', ['La inclinación del eje de rotación de la Tierra', 'Los cambios de distancia al Sol', 'La rotación de la Luna', 'El movimiento de las nubes'], 'Por eso cuando en Chile es verano, en Europa es invierno.'),
          M('Las mareas se producen principalmente por:', ['La atracción gravitacional de la Luna (y del Sol)', 'El viento', 'Los terremotos', 'La rotación del Sol'], 'La Luna atrae el agua de los océanos.'),
          M('¿Cuál es el planeta más grande del sistema solar?', ['Júpiter', 'Saturno', 'La Tierra', 'Neptuno'], 'Es un gigante gaseoso.'),
          M('El día y la noche se deben a:', ['La rotación de la Tierra sobre su eje', 'La traslación alrededor del Sol', 'Las fases de la Luna', 'La inclinación de la órbita lunar'], 'Una rotación dura cerca de 24 horas.'),
          T('Las fases de la Luna se deben a la sombra que la Tierra proyecta sobre ella.', false, 'Se deben a la parte iluminada que vemos desde la Tierra; la sombra terrestre causa los eclipses de Luna.'),
          S('Clasifica cada planeta', ['Rocoso', 'Gaseoso o de hielo'], [['Mercurio', 0], ['Venus', 0], ['Tierra', 0], ['Marte', 0], ['Júpiter', 1], ['Saturno', 1], ['Urano', 1], ['Neptuno', 1]], 'Los cuatro interiores son rocosos.'),
        ],
      },
      {
        n: 'El universo', ic: 'star', items: [
          M('Una estrella como el Sol produce su energía mediante:', ['La fusión nuclear de hidrógeno en helio', 'La combustión de carbón', 'La fisión de uranio', 'El reflejo de la luz'], 'En su núcleo, núcleos livianos se unen y liberan energía.'),
          M('La galaxia en la que se encuentra el sistema solar es:', ['La Vía Láctea', 'Andrómeda', 'La Nube de Magallanes', 'Orión'], 'Es una galaxia espiral.'),
          M('Un año luz es una medida de:', ['Distancia', 'Tiempo', 'Velocidad', 'Brillo'], 'Es la distancia que recorre la luz en un año.'),
          M('Chile es un lugar privilegiado para la astronomía porque:', ['El norte tiene cielos despejados, secos y con poca contaminación lumínica', 'Está más cerca del Sol', 'Tiene noches más largas que el resto del mundo', 'Está en el ecuador'], 'Allí hay observatorios como ALMA y Paranal.'),
          M('La teoría más aceptada sobre el origen del universo es:', ['El Big Bang', 'El modelo geocéntrico', 'La deriva continental', 'La generación espontánea'], 'El universo se expande desde un estado inicial muy denso y caliente.'),
          T('La Luna brilla con luz propia.', false, 'Refleja la luz del Sol.'),
          M('El modelo heliocéntrico, defendido por Copérnico, plantea que:', ['La Tierra y los planetas giran alrededor del Sol', 'El Sol gira alrededor de la Tierra', 'La Tierra es plana', 'Las estrellas giran alrededor de la Luna'], 'Reemplazó al modelo geocéntrico de Ptolomeo.'),
        ],
      },
    ],
  });

  // ---------- Videos ----------
  RB.video('v-fg', {
    u: 'fg', title: 'Electricidad y magnetismo', desc: 'Carga, electrización, ley de Ohm, circuitos en serie y paralelo, potencia, imanes e inducción.',
    sc: [
      { h: 'Electricidad y magnetismo', sub: 'Dos caras de la misma fuerza', b: [{ tags: ['Carga', 'Electrización', 'V = I · R', 'Serie y paralelo', 'Potencia', 'Imanes', 'Inducción'] }],
        s: ['Hola. La electricidad y el magnetismo están en todo lo que usas: el celular, la luz de tu pieza, los motores y hasta la brújula.', 'En este video veremos la carga eléctrica, la ley de Ohm, los circuitos, la potencia eléctrica, los imanes y cómo una corriente puede crear magnetismo y un imán puede crear corriente.'] },
      { h: 'La carga eléctrica', ic: 'atom', b: [{ two: [['Iguales', 'Se repelen'], ['Distintas', 'Se atraen']] }, { ex: 'Frotas un globo con tu pelo: **electrones** pasan del pelo al globo. El globo queda negativo y el pelo, positivo.' }, { warn: 'La carga **no se crea ni se destruye**: se transfiere. Y se mueven los **electrones**, no los protones.' }],
        s: ['Empecemos por la carga eléctrica.', 'Hay dos tipos de carga, positiva y negativa. Cargas iguales se repelen y cargas distintas se atraen.', 'Cuando frotas un globo con tu pelo, algunos electrones pasan del pelo al globo. El globo queda con carga negativa, porque ganó electrones, y el pelo queda positivo, porque los perdió. Por eso se atraen.', 'Recuerda dos cosas: la carga no se crea ni se destruye, solo se transfiere. Y lo que se mueve son los electrones; los protones se quedan en el núcleo de los átomos.'] },
      { h: 'Conductores, aislantes y Coulomb', ic: 'bolt', b: [{ two: [['Conductores', 'Metales, agua con sales', 'Las cargas se mueven'], ['Aislantes', 'Plástico, vidrio, goma', 'Las cargas no se mueven']] }, { eq: 'Ley de Coulomb: F ∝ q₁ · q₂ / d²', n: 'Doble distancia → un cuarto de la fuerza' }],
        s: ['Los materiales se comportan distinto frente a la electricidad.', 'En los conductores, como los metales, las cargas se mueven con facilidad. En los aislantes, como el plástico o la goma, no. Por eso los cables son de cobre recubierto de plástico.', 'La fuerza entre dos cargas sigue la ley de Coulomb: es proporcional al producto de las cargas e inversamente proporcional al cuadrado de la distancia. Si la distancia se duplica, la fuerza se reduce a la cuarta parte.'] },
      { h: 'Corriente y ley de Ohm', ic: 'calc', b: [{ two: [['Voltaje V', 'El "empuje" · volt'], ['Corriente I', 'Cargas que pasan por segundo · ampere']] }, { two: [['Resistencia R', 'Oposición al paso · ohm'], ['Ley de Ohm', 'V = I · R']] }, { eq: 'Ampolleta de 20 Ω a 220 V  →  I = 220 / 20 = 11 A' }],
        s: ['La corriente eléctrica es un flujo de cargas.', 'El voltaje es el empuje que pone a las cargas en movimiento, y se mide en volts. La corriente es cuánta carga pasa por segundo, y se mide en amperes.', 'La resistencia es la oposición que pone un material al paso de la corriente, y se mide en ohm. Las tres se relacionan con la ley de Ohm: voltaje igual corriente por resistencia.', 'Si una ampolleta de veinte ohm se conecta a doscientos veinte volts, circula una corriente de once amperes.'] },
      { h: 'Serie y paralelo', ic: 'grid', b: [{ two: [['Serie', 'Un solo camino', 'R total = R₁ + R₂', 'Si una se corta, se apagan todas'], ['Paralelo', 'Varios caminos', 'R total menor que cada una', 'Mismo voltaje para todos']] }, { eq: 'Dos de 6 Ω: en serie 12 Ω · en paralelo 3 Ω' }, { q: '¿Por qué los artefactos de una casa se conectan en paralelo?', o: ['Porque cada uno recibe el mismo voltaje y funciona de forma independiente', 'Porque así consumen menos energía', 'Porque así todos reciben la misma corriente', 'Porque es más barato'], e: 'En paralelo, cada artefacto recibe los 220 V y puede apagarse sin afectar a los demás.' }],
        s: ['Hay dos formas de conectar los elementos de un circuito.', 'En serie, hay un solo camino: las resistencias se suman, y si una ampolleta se corta, se apagan todas. En paralelo, hay varios caminos: todos los elementos reciben el mismo voltaje, la resistencia total es menor que cada una, y cada elemento funciona de forma independiente.', 'Dos resistencias de seis ohm dan doce ohm en serie y tres ohm en paralelo.', 'Piénsalo con tu casa.'] },
      { h: 'Potencia eléctrica', ic: 'bolt', b: [{ eq: 'P = V · I' }, { eq: 'Hervidor de 2.000 W a 220 V  →  I = 2.000 / 220 ≈ 9 A' }, { eq: 'Energía = P · t  →  plancha de 1 kW durante 3 h = 3 kWh' }],
        s: ['La potencia eléctrica indica cuánta energía consume un aparato por segundo.', 'Es el voltaje por la corriente.', 'Un hervidor de dos mil watts conectado a doscientos veinte volts consume unos nueve amperes.', 'Y la energía consumida es la potencia por el tiempo. Una plancha de un kilowatt usada tres horas consume tres kilowatts hora, que es lo que aparece en tu cuenta de luz.'] },
      { h: 'Magnetismo', ic: 'magnet', b: [{ two: [['Polos iguales', 'Se repelen'], ['Polos distintos', 'Se atraen']] }, { ex: 'La Tierra es un **gran imán**: por eso la brújula apunta al norte' }, { warn: 'Si cortas un imán, cada mitad vuelve a tener **norte y sur**.' }],
        s: ['Los imanes tienen dos polos, norte y sur.', 'Igual que con las cargas, polos iguales se repelen y polos distintos se atraen.', 'La Tierra se comporta como un gran imán, gracias al movimiento del núcleo externo líquido. Por eso la aguja de una brújula se orienta hacia el norte.', 'Y un dato que se pregunta: si cortas un imán por la mitad, no separas los polos. Cada mitad vuelve a tener un norte y un sur.'] },
      { h: 'Electricidad que crea magnetismo y al revés', ic: 'replay', b: [{ two: [['Oersted', 'Una corriente crea un campo magnético', 'Electroimán, motor eléctrico'], ['Faraday', 'Un imán en movimiento crea corriente', 'Inducción, generador']] }, { two: [['Motor', 'Eléctrica → mecánica'], ['Generador', 'Mecánica → eléctrica']] }, { q: '¿Qué aparato aprovecha la inducción para transformar energía mecánica en eléctrica?', o: ['El generador', 'El motor eléctrico', 'La ampolleta', 'La pila'], e: 'En las centrales, turbinas que giran mueven imanes junto a bobinas y generan corriente.' }],
        s: ['La gran sorpresa del siglo diecinueve fue descubrir que electricidad y magnetismo están conectados.', 'Oersted descubrió que una corriente eléctrica crea un campo magnético: así funcionan los electroimanes y los motores. Y Faraday descubrió lo inverso: al mover un imán cerca de una bobina se genera una corriente. Eso se llama inducción electromagnética.', 'El motor eléctrico transforma energía eléctrica en mecánica. El generador hace lo contrario: transforma energía mecánica en eléctrica.', 'Una última.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Iguales se repelen', 'Se mueven electrones', 'V = I · R', 'Serie: se suman', 'Paralelo: mismo voltaje', 'P = V · I', 'Motor vs. generador'] }],
        s: ['Resumen: cargas y polos iguales se repelen; al electrizar se mueven electrones. Voltaje igual corriente por resistencia, y potencia igual voltaje por corriente.', 'En serie las resistencias se suman; en paralelo todos reciben el mismo voltaje. Y la inducción permite que los generadores produzcan electricidad. ¡A practicar!'] },
    ],
  });

  RB.video('v-fh', {
    u: 'fh', title: 'La Tierra y el universo', desc: 'Capas de la Tierra, placas, sismos, ondas sísmicas, gravitación, Kepler, estaciones y el universo.',
    sc: [
      { h: 'La Tierra y el universo', sub: 'De nuestro suelo a las galaxias', b: [{ tags: ['Capas', 'Placas', 'Sismos', 'Ondas P y S', 'Gravitación', 'Kepler', 'Universo'] }],
        s: ['Hola. En este video viajamos desde el interior de la Tierra hasta las galaxias.', 'Veremos la estructura de nuestro planeta, por qué Chile tiene tantos sismos, cómo se miden, y luego el sistema solar, la gravitación, las leyes de Kepler y el origen del universo.'] },
      { h: 'Las capas de la Tierra', ic: 'globe', b: [{ tl: 'Corteza', t: 'Capa sólida y delgada donde vivimos' }, { tl: 'Manto', t: 'Roca caliente que fluye muy lentamente' }, { tl: 'Núcleo externo', t: '**Líquido**: su movimiento genera el campo magnético' }, { tl: 'Núcleo interno', t: 'Sólido, de hierro y níquel, por la enorme presión' }],
        s: ['La Tierra tiene capas, como una cebolla.', 'Arriba está la corteza, la capa sólida y delgada donde vivimos.', 'Debajo está el manto, roca muy caliente que fluye lentísimo, como una pasta.', 'Luego el núcleo externo, que es líquido. Su movimiento genera el campo magnético terrestre.', 'Y en el centro, el núcleo interno, que es sólido a pesar de su altísima temperatura, por la enorme presión.'] },
      { h: 'Placas tectónicas y Chile', ic: 'map', b: [{ ex: 'La placa de **Nazca** se hunde bajo la **Sudamericana**: **subducción**' }, 'Se acumula energía que se libera en **sismos** y forma **volcanes** y la **cordillera**', { big: '9,5', sub: 'Valdivia, 1960: el sismo de mayor magnitud registrado' }],
        s: ['La capa externa de la Tierra está dividida en placas tectónicas que se mueven unos centímetros por año.', 'Frente a Chile, la placa de Nazca se hunde bajo la placa Sudamericana. Ese proceso se llama subducción.', 'El roce entre las placas acumula energía, que se libera de golpe en los sismos. La subducción también forma los volcanes y levantó la cordillera de los Andes.', 'Por eso Chile es uno de los países más sísmicos del mundo. El terremoto de Valdivia, en mil novecientos sesenta, con magnitud nueve coma cinco, es el de mayor magnitud registrado en la historia.'] },
      { h: 'Anatomía de un sismo', ic: 'target', b: [{ two: [['Hipocentro o foco', 'Donde se origina, bajo tierra'], ['Epicentro', 'El punto de la superficie justo encima']] }, { two: [['Magnitud', 'Energía liberada · una sola por sismo'], ['Intensidad (Mercalli)', 'Efectos en cada lugar · varía según dónde estés']] }, { q: 'Un sismo tiene magnitud 7,5. En Santiago se sintió con intensidad VI y en Valparaíso con VII. ¿Es posible?', o: ['Sí: la magnitud es una, pero la intensidad cambia según el lugar', 'No: deberían ser iguales', 'No: la intensidad siempre es mayor que la magnitud', 'Solo si hubo dos sismos'], e: 'La intensidad depende de la distancia al epicentro, del suelo y de las construcciones.' }],
        s: ['Veamos las partes de un sismo.', 'El hipocentro, o foco, es el punto bajo tierra donde se origina. El epicentro es el punto de la superficie que está justo encima.', 'La magnitud mide la energía liberada, y cada sismo tiene una sola. La intensidad, en la escala de Mercalli, mide los efectos y daños en cada lugar, y cambia según dónde estés.', '¿Puede pasar esto?'] },
      { h: 'Ondas sísmicas', ic: 'wave', b: [{ two: [['Ondas P', 'Primarias: llegan primero', 'Longitudinales · atraviesan sólidos y líquidos'], ['Ondas S', 'Secundarias: llegan después', 'Transversales · no atraviesan líquidos']] }, { tip: 'Como las ondas S no cruzan el núcleo externo, los científicos descubrieron que es **líquido**.' }],
        s: ['Los sismos generan ondas sísmicas, que son ondas mecánicas.', 'Las ondas P, o primarias, son las más rápidas y llegan primero. Son longitudinales y atraviesan sólidos y líquidos. Las ondas S, o secundarias, llegan después; son transversales y no atraviesan líquidos.', 'Justamente porque las ondas S no cruzan el núcleo externo, los científicos dedujeron que esa capa es líquida.'] },
      { h: 'Gravitación y Kepler', ic: 'planet', b: [{ eq: 'F = G · m₁ · m₂ / d²', n: 'Doble distancia → un cuarto de la fuerza' }, { tl: '1ª ley', t: 'Órbitas **elípticas**, con el Sol en un foco' }, { tl: '2ª ley', t: 'Más **rápido** cuando está **cerca** del Sol' }, { tl: '3ª ley', t: 'Más **lejos** → más **tiempo** en dar la vuelta' }],
        s: ['Pasemos al espacio. Newton explicó que todos los cuerpos se atraen por la gravedad.', 'La fuerza es proporcional a las masas e inversamente proporcional al cuadrado de la distancia. Igual que en Coulomb, si la distancia se duplica, la fuerza se reduce a la cuarta parte.', 'Antes, Kepler había descrito el movimiento de los planetas en tres leyes. Primera: las órbitas son elipses, con el Sol en uno de sus focos.', 'Segunda: un planeta se mueve más rápido cuando está más cerca del Sol.', 'Y tercera: mientras más lejos está un planeta, más tiempo tarda en dar una vuelta. Por eso un año en Neptuno dura unos ciento sesenta y cinco años terrestres.'] },
      { h: 'Movimientos de la Tierra y la Luna', ic: 'moon', b: [{ two: [['Rotación', 'Día y noche · cerca de 24 h'], ['Traslación', 'Un año alrededor del Sol']] }, { two: [['Estaciones', 'Por la **inclinación** del eje terrestre, no por la distancia'], ['Mareas', 'Por la atracción de la **Luna** y el Sol']] }, { warn: 'Las **fases** de la Luna no son la sombra de la Tierra: son la parte iluminada que vemos. La sombra produce los **eclipses**.' }],
        s: ['La Tierra tiene dos movimientos principales.', 'La rotación sobre su eje produce el día y la noche. La traslación alrededor del Sol dura un año.', 'Las estaciones se deben a la inclinación del eje terrestre, no a la distancia al Sol. Por eso cuando en Chile es verano, en Europa es invierno. Y las mareas se producen por la atracción gravitacional de la Luna y del Sol sobre los océanos.', 'Ojo con esta trampa: las fases de la Luna no se deben a la sombra de la Tierra. Se deben a cuánto de su cara iluminada vemos desde aquí. La sombra de la Tierra produce los eclipses de Luna.'] },
      { h: 'Estrellas, galaxias y universo', ic: 'star', b: [{ two: [['El Sol', 'Estrella que brilla por fusión nuclear de hidrógeno en helio'], ['La Vía Láctea', 'Nuestra galaxia, de forma espiral']] }, { two: [['Año luz', 'Unidad de **distancia**, no de tiempo'], ['Big Bang', 'El universo se expande desde un estado muy denso y caliente']] }, { q: '¿Qué mide un año luz?', o: ['Una distancia', 'Un tiempo', 'Una velocidad', 'Un brillo'], e: 'Es la distancia que recorre la luz en un año: unos 9,5 billones de kilómetros.' }],
        s: ['Por último, el universo.', 'El Sol es una estrella que produce su energía por fusión nuclear: en su núcleo, el hidrógeno se transforma en helio. Junto a cientos de miles de millones de estrellas, forma parte de la Vía Láctea, una galaxia espiral.', 'Las distancias se miden en años luz, que es la distancia que recorre la luz en un año: es una unidad de distancia, no de tiempo. Y según la teoría del Big Bang, el universo se expande desde un estado inicial muy denso y caliente. Chile, con sus cielos despejados del norte, alberga algunos de los observatorios más importantes del mundo.', 'Comprueba.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Núcleo externo líquido', 'Subducción', 'Hipocentro vs. epicentro', 'Magnitud vs. intensidad', 'P antes que S', 'F ∝ 1/d²', 'Estaciones: inclinación'] }],
        s: ['Resumen: el núcleo externo es líquido, Chile es sísmico por la subducción, la magnitud es una y la intensidad varía, y las ondas P llegan antes que las S.', 'La gravedad disminuye con el cuadrado de la distancia, los planetas siguen las leyes de Kepler y las estaciones se deben a la inclinación del eje. ¡A practicar!'] },
    ],
  });
})();
