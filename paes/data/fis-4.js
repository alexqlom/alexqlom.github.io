// Física (4): electricidad y magnetismo; la Tierra y el universo.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Electricidad y magnetismo ----------
  RB.unit('fg', {
    name: 'Electricidad y magnetismo', desc: 'Carga y electrización, corriente, ley de Ohm, circuitos, potencia eléctrica, imanes e inducción.', ic: 'bolt', area: 'Electricidad',
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
    name: 'La Tierra y el universo', desc: 'Estructura interna, placas tectónicas, sismos, sistema solar, gravitación, leyes de Kepler y el universo.', ic: 'planet', area: 'Tierra y universo',
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
})();
