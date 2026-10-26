// Historia (3): república liberal, Araucanía y Guerra del Pacífico (1861–1891); guerra civil de 1891 y República Parlamentaria.
(function () {
  const RB = window.RB, { M, T, P, S, O, X } = RB.Q;

  // ---------- Chile liberal y expansión territorial ----------
  RB.unit('h5', {
    name: 'Chile liberal y expansión territorial', desc: 'Reformas liberales y leyes laicas, ocupación de la Araucanía, Guerra del Pacífico, límites con Argentina, Rapa Nui y el salitre (1861–1891).', ic: 'map', area: 'Historia de Chile',
    lessons: [
      {
        n: 'La república liberal', ic: 'vote', items: [
          { t: 'info', ic: 'vote', title: 'Reformas liberales', txt: 'Gobiernos liberales (1861–1891): **Pérez**, **Errázuriz Zañartu**, **Pinto**, **Santa María** y **Balmaceda**. Reformas: **prohibición de la reelección inmediata** del presidente (1871), libertad de culto en privado (1865), ampliación del voto (1874) y **leyes laicas** (1883–1884): cementerios laicos, matrimonio civil y registro civil. El **Congreso** ganó poder frente al presidente.' },
          M('La reforma constitucional de 1871 estableció:', ['La prohibición de la reelección inmediata del presidente', 'El voto femenino', 'El régimen federal', 'La separación de la Iglesia y el Estado'], 'Terminó con los decenios: desde entonces, los presidentes gobernaron 5 años.'),
          P('Une cada ley laica con lo que estableció', [['Ley de Cementerios Laicos (1883)', 'Sepultar a personas de cualquier credo en cementerios públicos'], ['Ley de Matrimonio Civil (1884)', 'El matrimonio válido ante la ley es el celebrado ante el Estado'], ['Ley de Registro Civil (1884)', 'El Estado registra nacimientos, matrimonios y defunciones']], 'Se aprobaron en el gobierno de Domingo Santa María.'),
          M('Las leyes laicas buscaban:', ['Traspasar al Estado funciones que antes cumplía la Iglesia', 'Prohibir la religión católica', 'Fortalecer el poder de la Iglesia', 'Crear una nueva religión oficial'], 'Generaron un fuerte conflicto entre liberales y conservadores.'),
          M('La reforma electoral de 1874 amplió el electorado porque:', ['Presumió que quien sabía leer y escribir cumplía el requisito de renta', 'Dio derecho a voto a las mujeres', 'Rebajó la edad para votar a 16 años', 'Eliminó el voto secreto'], 'Aumentó el número de votantes, aunque las mujeres seguían excluidas.'),
          M('Durante la república liberal, el poder del Congreso frente al presidente:', ['Aumentó gradualmente', 'Desapareció', 'Se mantuvo igual que en los decenios', 'Pasó al Ejército'], 'Las reformas limitaron al Ejecutivo, lo que llevaría al conflicto de 1891.'),
          M('El Partido Radical, fundado en 1863, defendía principalmente:', ['El laicismo, la educación pública y la libertad de conciencia', 'El poder absoluto del presidente', 'La monarquía', 'El fin de la educación pública'], 'Tuvo fuerza entre sectores mineros y medios.'),
          T('La ley interpretativa de 1865 permitió a los no católicos practicar su culto en recintos privados.', true, 'Fue un paso hacia la libertad religiosa.'),
          M('La guerra contra España (1865–1866) se recuerda por:', ['El bombardeo de Valparaíso por la escuadra española (1866)', 'La pérdida de Chiloé', 'La independencia de Chile', 'La captura del Huáscar'], 'Chile se alió con Perú, Ecuador y Bolivia.'),
        ],
      },
      {
        n: 'La ocupación de la Araucanía', ic: 'map', items: [
          { t: 'info', ic: 'map', title: 'Araucanía (1861–1883)', txt: 'El Estado ocupó militarmente el territorio mapuche al sur del **Biobío**, en un proceso llamado oficialmente **"Pacificación de la Araucanía"**. El plan de **Cornelio Saavedra** avanzó la frontera con fuertes y ciudades (Angol, Temuco). Los mapuche fueron confinados en **reducciones** (títulos de merced) y sus tierras se remataron o entregaron a **colonos** chilenos y europeos.' },
          M('La ocupación de la Araucanía (1861–1883) consistió en:', ['La incorporación por la fuerza del territorio mapuche al sur del Biobío al Estado chileno', 'Un tratado de paz entre iguales', 'La independencia del pueblo mapuche', 'La venta de la Araucanía a Argentina'], 'El nombre oficial de "pacificación" oculta su carácter militar.'),
          X('¿Qué razones tuvo el Estado chileno para ocupar la Araucanía? Marca todas.', ['Obtener tierras agrícolas para el trigo', 'Unir el territorio nacional de norte a sur', 'Afirmar la soberanía frente a Argentina', 'Proteger la cultura mapuche'], [0, 1, 2], 'También influyó la visión del mapuche como un obstáculo para el "progreso".'),
          M('El plan de Cornelio Saavedra consistió en:', ['Avanzar la frontera mediante líneas de fuertes y la fundación de ciudades', 'Firmar un tratado con Inglaterra', 'Trasladar a los mapuche a Santiago', 'Construir un canal'], 'Se fundaron ciudades como Angol (1862) y Temuco (1881).'),
          M('Las reducciones indígenas fueron:', ['Terrenos pequeños donde el Estado radicó a las comunidades mapuche mediante títulos de merced', 'Rebajas de impuestos para los mapuche', 'Escuelas para niños mapuche', 'Fuertes militares'], 'Los mapuche perdieron la mayor parte de su territorio ancestral.'),
          M('Las tierras de la Araucanía que el Estado consideró fiscales fueron:', ['Rematadas o entregadas a colonos chilenos y extranjeros', 'Devueltas a España', 'Convertidas en parques nacionales', 'Entregadas a Bolivia'], 'Llegaron colonos suizos, alemanes, franceses e italianos, entre otros.'),
          T('La ocupación militar de la Araucanía terminó con la refundación de Villarrica en 1883.', true, 'Ese año se considera el fin de la ocupación.'),
          M('Una consecuencia de largo plazo de la ocupación de la Araucanía fue:', ['La pérdida de tierras y el empobrecimiento de muchas comunidades mapuche, origen de conflictos actuales', 'La desaparición total del pueblo mapuche', 'La creación de un Estado mapuche independiente', 'El fin de la agricultura en el sur'], 'Las demandas de tierras siguen presentes hoy.'),
          M('Antes de la ocupación, la frontera entre el Estado chileno y el pueblo mapuche estaba aproximadamente en:', ['El río Biobío', 'El río Maipo', 'El estrecho de Magallanes', 'El desierto de Atacama'], 'Desde la Colonia hubo parlamentos (acuerdos) entre autoridades y mapuche.'),
        ],
      },
      {
        n: 'La Guerra del Pacífico (1879–1884)', ic: 'sword', items: [
          { t: 'info', ic: 'sword', title: 'Guerra del Pacífico', txt: '**Causa inmediata**: Bolivia cobró un impuesto de **10 centavos por quintal** de salitre exportado a una compañía chilena, violando el **tratado de 1874**; Chile ocupó **Antofagasta** (14 de febrero de 1879). Perú tenía un **tratado secreto** de alianza con Bolivia. Campañas: **marítima** (Iquique, Angamos), Tarapacá, Tacna y Arica, **Lima** y la Sierra. **Tratado de Ancón** (1883).' },
          M('¿Cuál fue la causa inmediata de la Guerra del Pacífico?', ['El impuesto de 10 centavos por quintal de salitre que Bolivia cobró a una compañía chilena, violando el tratado de 1874', 'La independencia de Chile', 'La ocupación de la Araucanía', 'La guerra civil de 1891'], 'Bolivia decidió rematar la compañía, y Chile ocupó Antofagasta.'),
          M('Perú entró a la guerra porque:', ['Tenía un tratado secreto de alianza defensiva con Bolivia, firmado en 1873', 'Chile invadió primero Lima', 'Quería anexar Argentina', 'Lo exigió Inglaterra'], 'Chile declaró la guerra a ambos países en abril de 1879.'),
          O('Ordena estos hechos de la Guerra del Pacífico', ['Ocupación de Antofagasta', 'Combate Naval de Iquique', 'Combate de Angamos', 'Toma del Morro de Arica', 'Ocupación de Lima', 'Tratado de Ancón'], 'Febrero, mayo y octubre de 1879; 1880, 1881 y 1883.'),
          M('El Combate Naval de Iquique (21 de mayo de 1879) es recordado por:', ['El sacrificio de Arturo Prat y la tripulación de la Esmeralda frente al Huáscar', 'La captura del Huáscar', 'La toma de Lima', 'La firma de la paz'], 'Aunque fue una derrota, su ejemplo motivó a miles a enrolarse.'),
          M('El Combate de Angamos (8 de octubre de 1879) fue decisivo porque:', ['Chile capturó el Huáscar y obtuvo el control del mar', 'Chile perdió su escuadra', 'Bolivia recuperó Antofagasta', 'Terminó la guerra'], 'Murió el almirante peruano Miguel Grau. Con el dominio del mar, Chile pudo transportar tropas.'),
          M('Con el Tratado de Ancón (1883), el Perú:', ['Cedió Tarapacá a Chile, y Tacna y Arica quedaron bajo administración chilena hasta un plebiscito', 'Recuperó todo su territorio', 'Cedió Lima a Chile', 'Se unió a Chile'], 'El plebiscito nunca se hizo. El Tratado de Lima (1929) dejó Tacna para Perú y Arica para Chile.'),
          M('El tratado de 1904 con Bolivia estableció:', ['La soberanía chilena sobre Antofagasta y la construcción de un ferrocarril de Arica a La Paz', 'La devolución de Antofagasta a Bolivia', 'Una salida soberana al mar para Bolivia', 'La anexión de Bolivia'], 'En 1884 se había firmado un Pacto de Tregua.'),
          M('Para la economía chilena, la principal consecuencia de la guerra fue:', ['El control de las riquezas salitreras, cuyo impuesto de exportación financió al Estado', 'La pérdida del cobre', 'El fin de la agricultura', 'La quiebra del Estado'], 'Comenzó el ciclo del salitre.'),
          T('El control del mar logrado tras Angamos fue clave para el triunfo chileno.', true, 'Permitió llevar tropas y abastecimiento al norte y a Lima.'),
          M('La campaña de la Sierra (1881–1883) consistió en:', ['La lucha contra la resistencia peruana en el interior, tras la ocupación de Lima', 'La conquista de la Patagonia', 'El bloqueo de Valparaíso', 'La defensa de Chiloé'], 'En ella ocurrió el combate de La Concepción (1882).'),
        ],
      },
      {
        n: 'Límites y nuevos territorios', ic: 'globe', items: [
          { t: 'info', ic: 'globe', title: 'Nuevas fronteras', txt: 'El **Tratado de 1881** con Argentina fijó el límite en las **altas cumbres de los Andes que dividen aguas**; Chile conservó el **estrecho de Magallanes** y la Patagonia oriental quedó para Argentina. **Rapa Nui** se incorporó en **1888** (Policarpo Toro). Tras la guerra, el **salitre** fue el motor de la economía, con fuerte presencia de **capitales británicos**.' },
          M('El Tratado de Límites de 1881 con Argentina estableció que:', ['La frontera seguiría las altas cumbres de los Andes que dividen aguas, y Chile conservaría el estrecho de Magallanes', 'Chile se quedaba con toda la Patagonia', 'Argentina obtenía una salida al Pacífico', 'Se dividía la Antártica'], 'Se firmó mientras Chile estaba en guerra con Perú y Bolivia.'),
          M('Rapa Nui (isla de Pascua) se incorporó a Chile en:', ['1888, por el capitán Policarpo Toro', '1810', '1904', '1965'], 'Se firmó un acuerdo de voluntades con autoridades rapanui.'),
          M('Tras la Guerra del Pacífico, buena parte de las oficinas salitreras quedaron en manos de:', ['Capitales británicos, como los de John Thomas North', 'El Estado de Bolivia', 'Cooperativas de trabajadores', 'La Iglesia'], 'El Estado chileno se financió con el impuesto a la exportación del salitre.'),
          S('Clasifica cada territorio según cómo se incorporó a Chile', ['Guerra del Pacífico', 'Otros procesos'], [['Antofagasta', 0], ['Tarapacá', 0], ['Arica', 0], ['Rapa Nui', 1], ['La Araucanía', 1], ['Magallanes', 1]], 'La Araucanía fue ocupada militarmente; Magallanes, con el Fuerte Bulnes (1843); Rapa Nui, por acuerdo en 1888.'),
          T('En el Tratado de 1881, Chile renunció a gran parte de la Patagonia oriental.', true, 'Fue cuestionado por algunos, pero aseguró la paz con Argentina durante la guerra.'),
          M('El ciclo del salitre (1880–1930) se caracterizó por:', ['La dependencia de la economía chilena de un solo producto de exportación', 'La diversificación industrial', 'El fin de las exportaciones', 'El predominio de la agricultura'], 'Su caída afectó gravemente al país.'),
        ],
      },
    ],
  });

  // ---------- Guerra civil de 1891 y parlamentarismo ----------
  RB.unit('h6', {
    name: 'La República Parlamentaria', desc: 'Balmaceda y la guerra civil de 1891, el predominio del Congreso, la oligarquía, la economía del salitre y el fin del parlamentarismo (1891–1925).', ic: 'landmark', area: 'Historia de Chile',
    lessons: [
      {
        n: 'Balmaceda y la guerra civil de 1891', ic: 'sword', items: [
          { t: 'info', ic: 'sword', title: 'Guerra civil de 1891', txt: '**José Manuel Balmaceda** (1886–1891) impulsó grandes **obras públicas** con el salitre y quiso mantener un Ejecutivo fuerte. El Congreso buscaba un régimen parlamentario. En 1891 no aprobó la **ley de presupuesto**; Balmaceda la prorrogó por decreto y estalló la **guerra civil**: la **Armada** apoyó al Congreso y el **Ejército** al presidente. Tras **Concón y Placilla**, Balmaceda se suicidó.' },
          M('La guerra civil de 1891 enfrentó a:', ['El presidente Balmaceda, apoyado por el Ejército, y el Congreso, apoyado por la Armada', 'Chile y Perú', 'Liberales y conservadores contra la Iglesia', 'El Ejército y el pueblo mapuche'], 'Fue una de las guerras civiles más sangrientas de la historia de Chile.'),
          M('¿Cuál fue el detonante de la guerra civil de 1891?', ['El Congreso no aprobó la ley de presupuesto y Balmaceda la prorrogó por decreto', 'La muerte de Arturo Prat', 'La ocupación de Lima', 'Una invasión argentina'], 'El Congreso consideró que el presidente había violado la Constitución.'),
          M('En el fondo, la guerra civil de 1891 fue un conflicto entre:', ['Un régimen presidencial y uno parlamentario', 'La monarquía y la república', 'El comunismo y el capitalismo', 'Chile y Bolivia'], 'El Congreso quería que los ministros dependieran de su confianza.'),
          X('¿Cuáles fueron obras del gobierno de Balmaceda? Marca todas.', ['El viaducto del Malleco', 'La construcción de escuelas y liceos', 'La extensión de los ferrocarriles', 'La Universidad de Chile'], [0, 1, 2], 'Las financió con los ingresos del salitre.'),
          M('La guerra civil terminó con:', ['El triunfo del bando congresista en Concón y Placilla, y el suicidio de Balmaceda', 'El triunfo de Balmaceda', 'Una intervención de Estados Unidos', 'Un plebiscito'], 'Balmaceda se suicidó en la legación argentina en septiembre de 1891.'),
          M('Balmaceda planteó que el Estado debía:', ['Aprovechar la riqueza del salitre para obras públicas y el desarrollo nacional', 'Vender el territorio del norte', 'Disolver el Ejército', 'Entregar el poder a la Iglesia'], 'Algunos historiadores lo ven como un precursor del nacionalismo económico.'),
          M('Durante la guerra, el bando congresista controló el norte salitrero, lo que le permitió:', ['Financiarse con los impuestos del salitre', 'Recibir tropas de Bolivia', 'Disolver el Ejército', 'Ocupar Lima'], 'Su Junta de Gobierno se instaló en Iquique.'),
          M('El marino que encabezó la Junta congresista y luego fue elegido presidente fue:', ['Jorge Montt', 'Arturo Prat', 'Manuel Bulnes', 'Arturo Alessandri'], 'Gobernó entre 1891 y 1896.'),
          T('La Junta de Gobierno del bando congresista se instaló en Iquique.', true, 'Desde allí dirigió la guerra con apoyo de la Armada.'),
        ],
      },
      {
        n: 'El predominio del Congreso', ic: 'landmark', items: [
          { t: 'info', ic: 'landmark', title: 'Parlamentarismo (1891–1925)', txt: 'Sin reformar la Constitución de 1833, se gobernó en forma **parlamentaria**: el Congreso dominaba con **interpelaciones**, **votos de censura** y las **leyes periódicas**. Hubo **rotativa ministerial**, **cohecho** (compra de votos) y control del poder por la **oligarquía**. La **Ley de Comuna Autónoma** (1891) dejó el control electoral en manos locales.' },
          M('La República Parlamentaria se caracterizó por:', ['El predominio del Congreso sobre el presidente', 'Un presidente con poder absoluto', 'La ausencia de partidos políticos', 'El voto femenino'], 'Se mantuvo la Constitución de 1833, pero interpretada en forma parlamentaria.'),
          M('La "rotativa ministerial" consistía en:', ['El cambio constante de ministros por las censuras del Congreso', 'La rotación anual de presidentes', 'El cambio de capital', 'La rotación de cultivos'], 'Hubo más de 120 gabinetes, lo que impedía gobernar con continuidad.'),
          M('El cohecho era:', ['La compra de votos en las elecciones', 'Un impuesto al salitre', 'Una ley social', 'Un tipo de gabinete'], 'Distorsionaba la voluntad popular y favorecía a quienes tenían dinero.'),
          M('Las "leyes periódicas", que el Congreso usaba para presionar al gobierno, eran:', ['Las leyes de presupuesto, de contribuciones y de fuerzas armadas, que debían aprobarse regularmente', 'Las leyes que fijaban los feriados', 'Las leyes de prensa', 'Las leyes laicas'], 'Sin ellas, el gobierno no podía funcionar.'),
          P('Une cada práctica con su descripción', [['Interpelación', 'Citar a un ministro para que explique su actuación'], ['Voto de censura', 'Acuerdo del Congreso que obligaba a renunciar a un ministro'], ['Rotativa ministerial', 'Cambio frecuente de gabinetes'], ['Cohecho', 'Compra de votos']], 'Todas reflejan el predominio del Congreso y de la élite.'),
          M('La Ley de Comuna Autónoma (1891) buscaba descentralizar, pero en la práctica:', ['Permitió que los grupos locales poderosos controlaran las elecciones', 'Creó gobiernos regionales electos', 'Dio derecho a voto a las mujeres', 'Eliminó los municipios'], 'Facilitó el cohecho y la intervención electoral.'),
          T('Durante la República Parlamentaria se reformó la Constitución para crear un régimen parlamentario.', false, 'No se reformó: se aplicó la Constitución de 1833 con prácticas parlamentarias.'),
          M('El término "oligarquía" se refiere a:', ['El pequeño grupo de familias que concentraba el poder político y económico', 'Los trabajadores del salitre', 'Los inmigrantes europeos', 'Los militares jóvenes'], 'Vivía en Santiago al estilo europeo.'),
          M('Una crítica frecuente a la República Parlamentaria fue que:', ['El Congreso se ocupaba más de disputas políticas que de resolver la cuestión social', 'El presidente tenía demasiado poder', 'No existían elecciones', 'El Estado no tenía ingresos'], 'Las reformas sociales se postergaron por años.'),
          M('Los presidentes de la República Parlamentaria tenían poco poder porque:', ['Dependían de mayorías en el Congreso que cambiaban constantemente', 'La Constitución había eliminado el cargo', 'Los elegía el Ejército', 'Gobernaban solo un año'], 'Las coaliciones parlamentarias se armaban y desarmaban con facilidad.'),
        ],
      },
      {
        n: 'Salitre, Centenario y crisis', ic: 'coin', items: [
          { t: 'info', ic: 'coin', title: 'Economía y fin del período', txt: 'El impuesto a la exportación del **salitre** financiaba gran parte del Estado. Tras la **Primera Guerra Mundial**, el **salitre sintético** alemán provocó su crisis. Capitales de **EE.UU.** desarrollaron la gran minería del **cobre** (El Teniente, Chuquicamata). El período terminó con **Arturo Alessandri** (1920), el **ruido de sables** (1924) y la **Constitución de 1925**.' },
          M('¿Por qué el salitre fue tan importante para el Estado chileno entre 1880 y 1930?', ['Porque el impuesto a su exportación financiaba gran parte del presupuesto fiscal', 'Porque se usaba como moneda', 'Porque era el principal alimento del país', 'Porque lo producía el Estado sin costo'], 'Esa dependencia hizo vulnerable al país.'),
          M('La crisis del salitre natural se debió principalmente a:', ['La invención del salitre sintético en Alemania, durante la Primera Guerra Mundial', 'El agotamiento del cobre', 'La Guerra del Pacífico', 'Una decisión de Bolivia'], 'El golpe final llegó con la crisis de 1929.'),
          M('A comienzos del siglo XX, la gran minería del cobre (El Teniente, Chuquicamata) fue desarrollada por:', ['Capitales estadounidenses', 'El Estado chileno', 'Capitales bolivianos', 'Cooperativas obreras'], 'Se nacionalizó en 1971.'),
          M('El Centenario de la independencia (1910) se celebró con:', ['Grandes obras públicas, como el Museo de Bellas Artes y la Estación Mapocho', 'Una guerra con Perú', 'La Constitución de 1925', 'El voto femenino'], 'El optimismo de la élite contrastaba con la pobreza de la mayoría.'),
          M('El "ruido de sables" (1924) fue:', ['Una protesta de jóvenes oficiales en el Senado que presionó para aprobar leyes sociales', 'Una batalla de la Guerra del Pacífico', 'Un tipo de cohecho', 'Una huelga de mineros'], 'Pocos días después, el Congreso aprobó las leyes sociales.'),
          M('Arturo Alessandri Palma, elegido en 1920, prometía:', ['Reformas sociales y políticas para enfrentar la cuestión social', 'Volver al régimen colonial', 'Disolver el Ejército', 'Devolver Tarapacá al Perú'], 'Fue llamado "el León de Tarapacá". El Congreso bloqueó muchas de sus reformas.'),
          M('La República Parlamentaria terminó con:', ['La Constitución de 1925, que restableció un régimen presidencial', 'La Guerra del Pacífico', 'La independencia de Chile', 'La Constitución de 1833'], 'La nueva Constitución también separó la Iglesia del Estado.'),
          O('Ordena estos hechos', ['Guerra civil de 1891', 'Celebración del Centenario', 'Elección de Arturo Alessandri', 'Ruido de sables', 'Constitución de 1925'], '1891, 1910, 1920, 1924 y 1925.'),
          T('El impuesto a la exportación del salitre llegó a financiar cerca de la mitad de los ingresos fiscales.', true, 'Por eso su crisis golpeó tanto al Estado.'),
          M('Durante este período surgieron partidos que representaban a los sectores populares, como:', ['El Partido Obrero Socialista (1912), fundado por Luis Emilio Recabarren', 'El partido pelucón', 'La Concertación', 'El Partido Federal'], 'En 1922 se transformó en el Partido Comunista.'),
        ],
      },
    ],
  });
})();
