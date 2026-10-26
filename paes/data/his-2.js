// Historia (2): la organización de la república (1823–1861); la Revolución Industrial y las ideologías del siglo XIX.
(function () {
  const RB = window.RB, { M, T, P, S, O, X } = RB.Q;

  // ---------- Organización de la República ----------
  RB.unit('h3', {
    name: 'Organización de la República', desc: 'Ensayos constitucionales, pipiolos y pelucones, Portales, la Constitución de 1833, la guerra contra la Confederación y los decenios (1823–1861).', ic: 'scroll', area: 'Historia de Chile',
    lessons: [
      {
        n: 'Ensayos constitucionales (1823–1830)', ic: 'scroll', items: [
          { t: 'info', ic: 'scroll', title: 'Años de ensayo', txt: 'Tras la abdicación de O’Higgins se probaron distintas formas de organizar el país: Constitución **moralista** de 1823 (Juan Egaña), ensayo **federal** de 1826 (José Miguel Infante) y Constitución **liberal** de 1828 (José Joaquín de Mora). Se enfrentaban **pipiolos** (liberales) y **pelucones** (conservadores). La guerra civil de 1829–1830 terminó con el triunfo conservador en **Lircay** (1830).' },
          P('Une cada ensayo constitucional con su característica', [['Constitución de 1823', 'Moralista: buscaba regular la conducta moral de los ciudadanos'], ['Leyes federales de 1826', 'Dividían el país en provincias con asambleas propias'], ['Constitución de 1828', 'Liberal: amplias libertades y equilibrio de poderes']], 'Ninguno logró dar estabilidad al país.'),
          P('Une cada grupo político con su descripción', [['Pipiolos', 'Liberales: más libertades y límites al Ejecutivo'], ['Pelucones', 'Conservadores: orden, autoridad y defensa de la Iglesia'], ['Estanqueros', 'Grupo de Diego Portales, partidario de un gobierno fuerte'], ['Federalistas', 'Querían dar autonomía a las provincias']], 'El triunfo final fue de pelucones y estanqueros.'),
          M('El período 1823–1830 se caracterizó por:', ['La inestabilidad política y los intentos por organizar la república', 'Una larga paz y estabilidad', 'El dominio del Ejército realista', 'La Guerra del Pacífico'], 'Algunos historiadores lo llaman un período de aprendizaje político.'),
          M('¿Quién gobernó como Director Supremo tras la abdicación de O’Higgins?', ['Ramón Freire', 'Diego Portales', 'Manuel Montt', 'José Miguel Carrera'], 'Freire gobernó entre 1823 y 1826 e incorporó Chiloé.'),
          M('El ensayo federal de 1826 fracasó principalmente porque:', ['Las provincias no tenían recursos ni experiencia para gobernarse, y aumentó el desorden', 'Fue prohibido por España', 'Lo rechazó Estados Unidos', 'Chile no tenía provincias'], 'Se inspiraba en el modelo de Estados Unidos.'),
          M('La guerra civil de 1829–1830 se desató por:', ['Un conflicto en torno a la elección de 1829, que enfrentó a conservadores y liberales', 'Una invasión del Perú', 'La muerte de O’Higgins', 'La Guerra del Pacífico'], 'Los conservadores acusaron al Congreso liberal de violar la Constitución de 1828.'),
          M('La batalla de Lircay (1830) significó:', ['El triunfo de los conservadores y el inicio de la república conservadora', 'La independencia de Chile', 'El triunfo definitivo de los liberales', 'La incorporación de Chiloé'], 'Los conservadores derrotaron a las fuerzas liberales de Ramón Freire.'),
          T('La Constitución de 1828 era de orientación liberal.', true, 'Fue redactada por José Joaquín de Mora.'),
          M('La inestabilidad de 1823 a 1830 se explica, entre otras cosas, por:', ['La falta de experiencia política, las diferencias entre grupos y la crisis económica', 'La presencia de tropas napoleónicas', 'La existencia de partidos de masas', 'La falta de interés de la élite'], 'Organizar un Estado nuevo no era sencillo.'),
        ],
      },
      {
        n: 'Portales y la Constitución de 1833', ic: 'landmark', items: [
          { t: 'info', ic: 'landmark', title: 'El orden conservador', txt: '**Diego Portales**, ministro de Prieto, impulsó un **gobierno fuerte, centralizado y autoritario**, con autoridad **impersonal** y respeto a la ley. La **Constitución de 1833** fue **presidencialista**: el presidente duraba 5 años con una reelección inmediata (**decenios**), tenía **facultades extraordinarias** y el voto era **censitario**. El catolicismo era la religión oficial.' },
          M('Diego Portales defendía un gobierno:', ['Fuerte, centralizado y autoritario, capaz de imponer el orden', 'Federal y descentralizado', 'Parlamentario', 'Monárquico'], 'Para él, el orden era la base del progreso.'),
          M('La Constitución de 1833 se caracterizó por:', ['Ser presidencialista y autoritaria, con un Ejecutivo muy fuerte', 'Crear una monarquía', 'Establecer el voto femenino', 'Separar la Iglesia del Estado'], 'El catolicismo era la religión oficial y se prohibía el culto público de otras religiones.'),
          M('Como el presidente duraba 5 años y podía reelegirse de inmediato una vez, los primeros gobiernos de la Constitución de 1833 se llaman:', ['Decenios', 'Quinquenios', 'Sexenios', 'Mandatos vitalicios'], 'Prieto, Bulnes y Montt gobernaron diez años cada uno.'),
          O('Ordena los presidentes de la república conservadora', ['José Joaquín Prieto', 'Manuel Bulnes', 'Manuel Montt'], '1831–1841, 1841–1851 y 1851–1861.'),
          M('Las facultades extraordinarias de la Constitución de 1833 permitían al presidente:', ['Restringir libertades en situaciones de crisis, con autorización del Congreso', 'Disolver la Corte Suprema', 'Nombrarse rey', 'Votar dos veces'], 'Se usaron con frecuencia para controlar a la oposición.'),
          M('El sufragio en la Constitución de 1833 era censitario: votaban', ['Los hombres que sabían leer y escribir y tenían cierta propiedad o renta', 'Todos los mayores de 18 años', 'Hombres y mujeres alfabetizados', 'Solo los militares'], 'Así se aseguraba el control de la élite.'),
          M('"El orden social se mantiene en Chile por el peso de la noche." Esta frase de Portales alude a:', ['La pasividad de la mayoría de la población, que facilitaba mantener el orden', 'La importancia del alumbrado público', 'El horario de trabajo del gobierno', 'La necesidad de una revolución'], 'Expresa su visión de una sociedad tradicional y jerárquica.'),
          M('La guerra contra la Confederación Perú-boliviana (1836–1839) terminó con:', ['El triunfo chileno en la batalla de Yungay (1839)', 'La derrota de Chile', 'La anexión de Bolivia a Chile', 'La independencia del Perú'], 'Chile veía a la Confederación del mariscal Santa Cruz como una amenaza comercial y política.'),
          M('Diego Portales murió en 1837:', ['Asesinado tras un motín militar en Quillota', 'En la batalla de Yungay', 'En el exilio, ya anciano', 'En un terremoto en Valparaíso'], 'El motín ocurrió en el contexto de la guerra contra la Confederación.'),
          T('La Constitución de 1833 rigió, con reformas, hasta 1925.', true, 'Fue la constitución más duradera de Chile hasta ese momento.'),
        ],
      },
      {
        n: 'Los decenios: obras y conflictos', ic: 'book', items: [
          { t: 'info', ic: 'book', title: 'Orden y progreso', txt: '**Universidad de Chile** (1842, rector **Andrés Bello**), **Escuela Normal de Preceptores** (1842), **Código Civil** (1855), toma del **estrecho de Magallanes** (1843), **colonización alemana** en el sur y primer **ferrocarril** (Caldera–Copiapó, 1851). Economía: plata de **Chañarcillo** (1832), cobre y **trigo** para California y Australia. Oposición liberal: revoluciones de **1851** y **1859**.' },
          P('Une cada obra con su contexto', [['Universidad de Chile (1842)', 'Su primer rector fue Andrés Bello'], ['Código Civil (1855)', 'Redactado por Andrés Bello, ordenó las leyes civiles'], ['Escuela Normal de Preceptores (1842)', 'Formar profesores, dirigida por Domingo F. Sarmiento'], ['Fuerte Bulnes (1843)', 'Toma de posesión del estrecho de Magallanes']], 'Muchas obras se realizaron durante el gobierno de Bulnes.'),
          M('El descubrimiento de plata en Chañarcillo (1832) impulsó:', ['El desarrollo económico del Norte Chico y de Copiapó', 'La Guerra del Pacífico', 'La caída de Portales', 'La industria del salitre'], 'La minería de plata y cobre financió obras como el ferrocarril.'),
          M('El primer ferrocarril de Chile (1851) unió:', ['Caldera y Copiapó', 'Santiago y Valparaíso', 'Arica y La Paz', 'Concepción y Talcahuano'], 'Servía para llevar los minerales al puerto.'),
          M('La ocupación del estrecho de Magallanes (1843) buscaba:', ['Afirmar la soberanía chilena sobre esa ruta estratégica', 'Conquistar Argentina', 'Buscar oro en la Antártica', 'Trasladar la capital al sur'], 'Se fundó el Fuerte Bulnes y, en 1848, Punta Arenas.'),
          M('La colonización alemana en Valdivia y Llanquihue, a mediados del siglo XIX, buscaba:', ['Poblar y desarrollar económicamente el sur del país', 'Defender el norte minero', 'Reemplazar a la élite de Santiago', 'Crear un Estado independiente'], 'Vicente Pérez Rosales fue agente de colonización. En 1853 se fundó Puerto Montt.'),
          M('La exportación de trigo chileno creció a mediados del siglo XIX gracias a:', ['La fiebre del oro en California y Australia', 'La Primera Guerra Mundial', 'El canal de Panamá', 'La Guerra del Pacífico'], 'Esos mercados necesitaban alimentos.'),
          M('La "Generación de 1842", con figuras como Lastarria y Bilbao, se caracterizó por:', ['Difundir ideas liberales y criticar la herencia colonial y el autoritarismo', 'Defender el absolutismo', 'Promover la monarquía', 'Rechazar la educación pública'], 'Francisco Bilbao fundó en 1850 la Sociedad de la Igualdad.'),
          M('La "cuestión del sacristán" (1856) provocó:', ['La división de los conservadores y el surgimiento de nuevos partidos', 'La independencia de Chile', 'La Guerra del Pacífico', 'La abolición de la esclavitud'], 'Enfrentó al gobierno de Montt con la Iglesia y reordenó a los grupos políticos.'),
          X('¿Qué hechos ocurrieron durante la república conservadora (1831–1861)? Marca todos.', ['La fundación de la Universidad de Chile', 'La promulgación del Código Civil', 'Las revoluciones de 1851 y 1859', 'La Guerra del Pacífico'], [0, 1, 2], 'La Guerra del Pacífico fue entre 1879 y 1884.'),
          T('Las revoluciones de 1851 y 1859 fueron levantamientos contra el autoritarismo del gobierno de Manuel Montt.', true, 'Ambas fueron derrotadas.'),
          T('El Estado de la república conservadora impulsó la educación pública.', true, 'Se crearon escuelas primarias, la Escuela Normal de Preceptores y la Universidad de Chile.'),
        ],
      },
    ],
  });

  // ---------- Revolución Industrial ----------
  RB.unit('h4', {
    name: 'Revolución Industrial', desc: 'Origen y etapas de la industrialización, la sociedad de clases, la cuestión social europea, el movimiento obrero y las ideologías del siglo XIX.', ic: 'factory', area: 'Historia universal',
    lessons: [
      {
        n: 'Máquinas, fábricas y ferrocarriles', ic: 'factory', items: [
          { t: 'info', ic: 'factory', title: 'Industrialización', txt: 'Comenzó en **Inglaterra** a fines del siglo XVIII gracias a la revolución agrícola, el crecimiento de la población, los capitales, el **carbón y el hierro** y los mercados coloniales. La **máquina de vapor** (James Watt) movió **fábricas** textiles, **ferrocarriles** y barcos. La **Segunda Revolución Industrial** (desde 1870) trajo electricidad, petróleo, acero y producción en cadena.' },
          M('La Revolución Industrial comenzó en:', ['Inglaterra, a fines del siglo XVIII', 'Francia, en el siglo XVI', 'Estados Unidos, en el siglo XX', 'China, en la Edad Media'], 'Luego se extendió a Bélgica, Francia, Alemania y Estados Unidos.'),
          X('¿Qué factores explican que la Revolución Industrial comenzara en Inglaterra? Marca todos.', ['Abundancia de carbón y hierro', 'Capitales acumulados por el comercio', 'Mercados en sus colonias', 'La ausencia de población'], [0, 1, 2], 'También influyeron la revolución agrícola y la estabilidad política.'),
          M('La máquina de vapor, perfeccionada por James Watt, fue clave porque:', ['Permitió mover fábricas, locomotoras y barcos con una energía independiente del viento y del agua', 'Producía electricidad', 'Funcionaba con petróleo', 'Eliminó el uso del carbón'], 'Su combustible era el carbón.'),
          M('El primer sector productivo en mecanizarse fue:', ['La industria textil', 'La industria aeronáutica', 'La informática', 'La industria química'], 'Inventos como la lanzadera volante y el telar mecánico multiplicaron la producción.'),
          M('El sistema fabril se caracterizó por:', ['Concentrar a muchos trabajadores y máquinas en un mismo lugar, con horario fijo', 'Trabajar en casa con herramientas propias', 'Producir solo para el autoconsumo', 'No usar ninguna fuente de energía'], 'Reemplazó al trabajo artesanal y doméstico.'),
          P('Une cada etapa con sus características', [['Primera Revolución Industrial', 'Carbón, vapor y textiles'], ['Segunda Revolución Industrial', 'Electricidad, petróleo y acero'], ['Producción en cadena', 'Línea de montaje de Ford (1913)']], 'La segunda etapa comenzó hacia 1870.'),
          M('La revolución agrícola que precedió a la industrial permitió:', ['Producir más alimentos con menos trabajadores, liberando mano de obra para las fábricas', 'Eliminar la agricultura', 'Que todos volvieran al campo', 'Prohibir el comercio de alimentos'], 'Los cercamientos y la rotación de cultivos aumentaron la productividad.'),
          T('El ferrocarril redujo los tiempos y los costos del transporte de personas y mercancías.', true, 'Integró los mercados y aceleró la industrialización.'),
          M('¿Cuál de estos inventos pertenece a la Segunda Revolución Industrial?', ['El motor de combustión interna', 'La lanzadera volante', 'La máquina de vapor', 'El telar manual'], 'También la ampolleta, el teléfono y el automóvil.'),
          M('Las Exposiciones Universales del siglo XIX, como la de Londres en 1851, servían para:', ['Mostrar los avances industriales y técnicos de los países', 'Firmar tratados de paz', 'Votar leyes internacionales', 'Repartir colonias'], 'Reflejaban la fe en el progreso.'),
        ],
      },
      {
        n: 'Burguesía, proletariado y cuestión social', ic: 'people', items: [
          { t: 'info', ic: 'people', title: 'Sociedad de clases', txt: 'La **burguesía** era dueña de los medios de producción (fábricas, bancos) y el **proletariado** vendía su trabajo por un salario. Hubo **urbanización** acelerada, jornadas de 12 a 16 horas, **trabajo infantil**, viviendas insalubres y contaminación. Los obreros se organizaron en **sindicatos**.' },
          M('La sociedad industrial se dividió principalmente en:', ['Burguesía y proletariado', 'Clero, nobleza y Tercer Estado', 'Señores y siervos', 'Patricios y plebeyos'], 'Es una sociedad de clases, basada en la riqueza y no en el nacimiento.'),
          M('El proletariado estaba formado por:', ['Obreros que vendían su fuerza de trabajo a cambio de un salario', 'Dueños de fábricas y bancos', 'Nobles terratenientes', 'Sacerdotes'], 'Vivían en barrios obreros, a menudo insalubres.'),
          M('La urbanización durante la Revolución Industrial se debió a:', ['La migración del campo a la ciudad en busca de trabajo en las fábricas', 'El abandono de las ciudades', 'Las guerras mundiales', 'La caída de la natalidad'], 'Ciudades como Manchester crecieron rápido y sin planificación.'),
          X('¿Cuáles eran condiciones de trabajo comunes en las primeras fábricas? Marca todas.', ['Jornadas de 12 a 16 horas', 'Trabajo infantil', 'Ausencia de seguridad social', 'Vacaciones pagadas'], [0, 1, 2], 'Las leyes laborales llegaron poco a poco, gracias a la presión obrera.'),
          M('El ludismo fue un movimiento de obreros que:', ['Destruían máquinas porque las culpaban del desempleo y los bajos salarios', 'Fundaron los primeros bancos', 'Apoyaban el trabajo infantil', 'Promovían el voto femenino'], 'Fue una de las primeras reacciones obreras.'),
          M('Los sindicatos se crearon para:', ['Defender colectivamente los derechos de los trabajadores', 'Representar a los dueños de las fábricas', 'Administrar las colonias', 'Cobrar impuestos'], 'En Inglaterra se llamaron trade unions.'),
          M('El 1 de mayo, Día Internacional de los Trabajadores, recuerda:', ['La lucha de obreros de Chicago (1886) por la jornada de 8 horas', 'El fin de la Primera Guerra Mundial', 'La Revolución Francesa', 'La independencia de Estados Unidos'], 'Varios dirigentes fueron condenados tras los sucesos de Haymarket.'),
          T('La burguesía valoraba el trabajo, el ahorro, el mérito y la propiedad.', true, 'Fueron los valores de la sociedad burguesa del siglo XIX.'),
          M('Uno de los efectos ambientales de la industrialización fue:', ['La contaminación del aire y del agua en las ciudades industriales', 'La desaparición del carbón', 'La reforestación de Europa', 'La disminución de la población urbana'], 'El humo de las chimeneas cubría ciudades como Londres.'),
          M('En Chile, la Revolución Industrial se reflejó en el siglo XIX principalmente en:', ['La llegada del ferrocarril y la exportación de materias primas a los países industrializados', 'La creación de grandes industrias automotrices', 'La producción de energía nuclear', 'El abandono de la minería'], 'Chile se integró a la economía mundial exportando plata, cobre, trigo y salitre.'),
        ],
      },
      {
        n: 'Las ideologías del siglo XIX', ic: 'book', items: [
          { t: 'info', ic: 'book', title: 'Respuestas a la cuestión social', txt: '**Liberalismo económico** (Adam Smith): libre mercado. **Socialismo utópico** (Owen): comunidades ideales. **Marxismo** (Marx y Engels, *Manifiesto Comunista*, 1848): lucha de clases, revolución del proletariado y propiedad colectiva. **Anarquismo** (Bakunin): abolir el Estado. **Doctrina social de la Iglesia** (*Rerum Novarum*, 1891): salario justo y armonía entre las clases.' },
          P('Une cada ideología con su propuesta', [['Liberalismo económico', 'Libre mercado y mínima intervención del Estado'], ['Marxismo', 'Lucha de clases y revolución del proletariado'], ['Anarquismo', 'Abolición del Estado y de toda autoridad'], ['Doctrina social de la Iglesia', 'Salario justo y armonía entre las clases']], 'Todas respondieron a los problemas de la sociedad industrial.'),
          M('El Manifiesto Comunista (1848) fue escrito por:', ['Karl Marx y Friedrich Engels', 'Adam Smith', 'El papa León XIII', 'Robert Owen'], 'Comienza con la frase "Un fantasma recorre Europa".'),
          M('Para el marxismo, la historia se explica por:', ['La lucha de clases entre explotadores y explotados', 'La voluntad de los reyes', 'El clima', 'La armonía entre las clases'], 'Proponía una revolución del proletariado y una sociedad sin clases.'),
          M('La encíclica Rerum Novarum (1891), del papa León XIII:', ['Rechazó tanto los abusos del capitalismo como la lucha de clases, y defendió un salario justo', 'Defendió el trabajo infantil', 'Promovió la revolución comunista', 'Prohibió que los católicos formaran asociaciones obreras'], 'Es la base de la Doctrina Social de la Iglesia.'),
          M('El anarquismo, a diferencia del marxismo, proponía:', ['Abolir de inmediato el Estado', 'Fortalecer el Estado con un partido único', 'Restaurar la monarquía', 'Mantener el libre mercado'], 'Destacaron Bakunin y Proudhon.'),
          M('Según Adam Smith, la "mano invisible" del mercado:', ['Ordena la economía cuando cada persona busca su propio interés', 'Es el control del Estado sobre los precios', 'Es la acción de los sindicatos', 'Es la planificación central'], 'Lo planteó en "La riqueza de las naciones" (1776).'),
          M('Los socialistas utópicos, como Robert Owen, propusieron:', ['Crear comunidades ideales con mejores condiciones para los obreros', 'La guerra entre naciones', 'Una revolución violenta inmediata', 'Volver a la sociedad estamental'], 'Se les llamó utópicos porque sus proyectos eran difíciles de aplicar a gran escala.'),
          S('Clasifica cada idea', ['Liberalismo económico', 'Socialismo'], [['Propiedad privada de las fábricas', 0], ['Libre competencia', 0], ['Mínima intervención del Estado', 0], ['Propiedad colectiva de los medios de producción', 1], ['Igualdad económica', 1], ['Fin de la explotación obrera', 1]], 'Fueron las dos grandes visiones económicas del siglo XIX.'),
          M('La Primera Internacional (1864) fue:', ['Una organización que buscó unir a los trabajadores de distintos países', 'Una exposición de inventos', 'Un tratado de paz', 'Un banco internacional'], 'Reunió a socialistas y anarquistas.'),
          T('El positivismo del siglo XIX confiaba en la ciencia como camino al progreso.', true, 'Su principal exponente fue Auguste Comte.'),
        ],
      },
    ],
  });
})();
