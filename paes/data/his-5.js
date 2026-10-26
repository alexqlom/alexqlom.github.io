// Historia (5): crisis de 1929, totalitarismos y Segunda Guerra Mundial; Guerra Fría, descolonización y América Latina.
(function () {
  const RB = window.RB, { M, T, P, S, O, X } = RB.Q;

  // ---------- Entreguerras y Segunda Guerra Mundial ----------
  RB.unit('h9', {
    name: 'Crisis, totalitarismos y Segunda Guerra', desc: 'La crisis de 1929 y el New Deal, fascismo, nazismo y estalinismo, la Segunda Guerra Mundial, el Holocausto y la creación de la ONU (1929–1948).', ic: 'sword', area: 'Historia universal',
    lessons: [
      {
        n: 'La crisis de 1929', ic: 'chart', items: [
          { t: 'info', ic: 'chart', title: 'La Gran Depresión', txt: 'Tras los **"felices años veinte"** (consumo, crédito y especulación), la **Bolsa de Nueva York** se desplomó en **octubre de 1929**. Vino la **Gran Depresión**: quiebras, **desempleo** masivo, caída del comercio y **proteccionismo**. Respuesta: el **New Deal** de Roosevelt (1933), con **intervención del Estado**, según las ideas de **Keynes**. Chile fue uno de los países más afectados.' },
          M('La crisis de 1929 comenzó con:', ['La caída de la Bolsa de Valores de Nueva York', 'El asesinato de un archiduque', 'La Revolución Rusa', 'La invasión de Polonia'], 'El "jueves negro" fue el 24 de octubre de 1929.'),
          X('¿Cuáles fueron causas de la crisis de 1929? Marca todas.', ['La especulación en la bolsa', 'Una producción que crecía más que el consumo', 'El exceso de créditos', 'La Segunda Guerra Mundial'], [0, 1, 2], 'La Segunda Guerra Mundial fue posterior.'),
          M('La Gran Depresión se caracterizó por:', ['Quiebras de bancos y empresas, desempleo masivo y caída del comercio mundial', 'Un fuerte crecimiento económico', 'El pleno empleo', 'La baja de impuestos en todo el mundo'], 'En EE.UU., el desempleo llegó a cerca de un cuarto de los trabajadores.'),
          M('El New Deal del presidente Franklin D. Roosevelt consistió en:', ['La intervención del Estado en la economía con obras públicas, subsidios y regulación de los bancos', 'Dejar que el mercado se arreglara solo', 'Privatizar las empresas estatales', 'Prohibir el comercio exterior'], 'Se relaciona con las ideas de John Maynard Keynes.'),
          M('Según John Maynard Keynes, en una crisis el Estado debía:', ['Aumentar el gasto público para reactivar la demanda y el empleo', 'Reducir al mínimo su gasto', 'Cerrar las fábricas', 'Prohibir el comercio'], 'Su teoría cambió el papel del Estado en la economía del siglo XX.'),
          M('Chile fue uno de los países más afectados por la crisis de 1929 porque:', ['Cayeron drásticamente sus exportaciones de salitre y cobre, de las que dependía su economía', 'Fue invadido', 'No tenía exportaciones', 'Perdió la Guerra del Pacífico'], 'Un informe de la Sociedad de las Naciones lo señaló como el más afectado del mundo.'),
          M('Muchos países respondieron a la crisis con proteccionismo, que consiste en:', ['Subir los aranceles para proteger la producción nacional de las importaciones', 'Eliminar todos los impuestos', 'Abrir por completo las fronteras al comercio', 'Unirse en un solo país'], 'Eso redujo aún más el comercio internacional.'),
          T('La crisis de 1929 favoreció el ascenso de regímenes autoritarios en Europa.', true, 'El desempleo y la desesperación aumentaron el apoyo a movimientos como el nazismo.'),
        ],
      },
      {
        n: 'Los totalitarismos', ic: 'lock', items: [
          { t: 'info', ic: 'lock', title: 'Totalitarismos', txt: 'Regímenes con **partido único**, **líder** con culto a la personalidad, **propaganda**, control de la educación y los medios, **policía política** y supresión de las libertades. **Fascismo** (Mussolini, Italia, 1922), **nazismo** (Hitler, Alemania, 1933: racismo y **antisemitismo**) y **estalinismo** (URSS: colectivización forzosa y **gulag**).' },
          X('¿Cuáles son características de los regímenes totalitarios? Marca todas.', ['Partido único', 'Culto a la personalidad del líder', 'Propaganda y control de los medios', 'Elecciones libres y competitivas'], [0, 1, 2], 'Eliminaban la oposición y las libertades individuales.'),
          P('Une cada régimen con su líder', [['Fascismo italiano', 'Benito Mussolini'], ['Nazismo alemán', 'Adolf Hitler'], ['Estalinismo soviético', 'Iósif Stalin'], ['Franquismo español', 'Francisco Franco']], 'Franco gobernó España tras la Guerra Civil (1936–1939).'),
          M('El nazismo se caracterizó, además del totalitarismo, por:', ['Su racismo y antisemitismo, con la idea de una supuesta "raza aria" superior', 'La defensa de la democracia liberal', 'El internacionalismo obrero', 'El pacifismo'], 'Llevó a la persecución y al exterminio de millones de personas.'),
          M('Hitler llegó al poder en Alemania en 1933:', ['Nombrado canciller tras el éxito electoral del partido nazi', 'Mediante una invasión extranjera', 'Como rey hereditario', 'Tras ganar la Segunda Guerra Mundial'], 'Luego eliminó la democracia y se proclamó Führer.'),
          M('Las Leyes de Núremberg (1935):', ['Quitaron la ciudadanía a los judíos alemanes y prohibieron los matrimonios mixtos', 'Crearon la ONU', 'Juzgaron a los criminales nazis', 'Restablecieron la democracia en Alemania'], 'No confundir con los Juicios de Núremberg (1945–1946).'),
          M('El estalinismo en la URSS se caracterizó por:', ['La planificación centralizada, la colectivización forzosa y la represión en los gulag', 'El libre mercado', 'El multipartidismo', 'La monarquía'], 'Millones de personas murieron por hambrunas, purgas y trabajos forzados.'),
          M('Una diferencia importante entre fascismo y comunismo era que:', ['El fascismo era nacionalista y anticomunista, y el comunismo buscaba abolir la propiedad privada', 'El fascismo defendía la democracia liberal', 'El comunismo promovía la monarquía', 'Ninguno era autoritario'], 'Ambos compartían, sin embargo, rasgos totalitarios.'),
          T('La Guerra Civil Española (1936–1939) fue vista como un anticipo de la Segunda Guerra Mundial.', true, 'Alemania e Italia apoyaron a Franco; la URSS, a la República.'),
          M('En los regímenes totalitarios, la propaganda servía para:', ['Controlar a la población, exaltar al líder y difundir la ideología oficial', 'Informar con objetividad', 'Fomentar la crítica al gobierno', 'Promover elecciones libres'], 'Se usaban la radio, el cine, los afiches y las concentraciones masivas.'),
        ],
      },
      {
        n: 'La Segunda Guerra Mundial', ic: 'sword', items: [
          { t: 'info', ic: 'sword', title: 'La guerra (1939–1945)', txt: 'Causas: el **Tratado de Versalles**, la crisis de 1929, el **expansionismo** de Alemania, Italia y Japón y la **política de apaciguamiento**. Comenzó con la **invasión de Polonia** (1939). El **Eje** (Alemania, Italia, Japón) enfrentó a los **Aliados** (Gran Bretaña, Francia, la **URSS** y **EE.UU.** desde 1941). Hitos: **Pearl Harbor** (1941), **Stalingrado** (1942–1943), **Día D** (1944) y las **bombas atómicas** (1945).' },
          M('La Segunda Guerra Mundial comenzó con:', ['La invasión alemana de Polonia, en septiembre de 1939', 'El ataque a Pearl Harbor', 'El asesinato en Sarajevo', 'La caída de la Bolsa de Nueva York'], 'Gran Bretaña y Francia declararon la guerra a Alemania.'),
          P('Une cada grupo con sus miembros', [['Eje', 'Alemania, Italia y Japón'], ['Aliados', 'Gran Bretaña, Francia, URSS y EE.UU.'], ['Pacto de no agresión de 1939', 'Alemania y la URSS']], 'El pacto se rompió en 1941, cuando Alemania invadió la URSS.'),
          M('La "política de apaciguamiento" de Gran Bretaña y Francia consistió en:', ['Ceder ante las exigencias de Hitler para evitar la guerra, como en Múnich (1938)', 'Atacar de inmediato a Alemania', 'Aliarse con Japón', 'Invadir la URSS'], 'Hitler anexó Austria y los Sudetes sin que nadie lo detuviera.'),
          M('Estados Unidos entró a la guerra en diciembre de 1941 tras:', ['El ataque japonés a Pearl Harbor', 'La invasión de Polonia', 'El Día D', 'La caída de Francia'], 'Hasta entonces había ayudado a los Aliados sin combatir.'),
          M('La batalla de Stalingrado (1942–1943) fue importante porque:', ['Marcó el comienzo de la derrota alemana en el frente oriental', 'Fue la primera victoria de Hitler', 'Terminó la guerra', 'Fue un ataque japonés'], 'Desde entonces, la URSS avanzó hasta Berlín.'),
          M('El Día D (6 de junio de 1944) corresponde a:', ['El desembarco aliado en Normandía, que abrió un frente en Europa occidental', 'El lanzamiento de la bomba atómica', 'La invasión de Polonia', 'El ataque a Pearl Harbor'], 'Fue la mayor operación anfibia de la historia.'),
          O('Ordena estos hechos de la Segunda Guerra Mundial', ['Invasión de Polonia', 'Ataque a Pearl Harbor', 'Batalla de Stalingrado', 'Desembarco de Normandía', 'Bombas atómicas sobre Hiroshima y Nagasaki'], '1939, 1941, 1942–1943, 1944 y 1945.'),
          M('La guerra en el Pacífico terminó cuando:', ['Japón se rindió tras las bombas atómicas sobre Hiroshima y Nagasaki, en agosto de 1945', 'Alemania invadió Japón', 'Japón ganó en Pearl Harbor', 'China se rindió'], 'Alemania ya se había rendido en mayo de 1945.'),
          T('La "guerra relámpago" alemana combinaba tanques y aviación para avanzar rápidamente.', true, 'Así Alemania ocupó Polonia y Francia en pocas semanas.'),
        ],
      },
      {
        n: 'Holocausto y nuevo orden mundial', ic: 'scale', items: [
          { t: 'info', ic: 'scale', title: 'Después de la guerra', txt: 'El **Holocausto** (Shoá) fue el genocidio de cerca de **6 millones de judíos**, además de gitanos, personas con discapacidad y opositores, en **campos de exterminio** como Auschwitz. Tras la guerra (entre 50 y 60 millones de muertos) vinieron los **Juicios de Núremberg**, la **ONU** (1945) y la **Declaración Universal de los Derechos Humanos** (1948). EE.UU. y la URSS quedaron como **superpotencias**.' },
          M('El Holocausto fue:', ['El genocidio sistemático de cerca de 6 millones de judíos y de otros grupos por el régimen nazi', 'Una batalla naval', 'Un tratado de paz', 'El ataque atómico a Japón'], 'También se le llama Shoá.'),
          M('La Organización de las Naciones Unidas (ONU), creada en 1945, tiene como objetivo principal:', ['Mantener la paz y la seguridad internacionales y promover los derechos humanos', 'Repartir colonias', 'Formar un ejército para conquistar territorios', 'Imponer un sistema económico'], 'Reemplazó a la fracasada Sociedad de las Naciones.'),
          M('La Declaración Universal de los Derechos Humanos fue aprobada por la ONU en:', ['1948', '1789', '1918', '1990'], 'Por eso el 10 de diciembre es el Día de los Derechos Humanos.'),
          M('Los Juicios de Núremberg (1945–1946) sirvieron para:', ['Juzgar a líderes nazis por crímenes de guerra y crímenes contra la humanidad', 'Repartir Alemania', 'Crear la URSS', 'Elegir al canciller alemán'], 'Establecieron que obedecer órdenes no excusa cometer crímenes.'),
          X('¿Cuáles fueron consecuencias de la Segunda Guerra Mundial? Marca todas.', ['Entre 50 y 60 millones de muertos', 'EE.UU. y la URSS como superpotencias', 'La creación de la ONU', 'El fortalecimiento de los imperios coloniales europeos'], [0, 1, 2], 'Al contrario, los imperios coloniales se debilitaron y comenzó la descolonización.'),
          T('El Consejo de Seguridad de la ONU tiene cinco miembros permanentes con derecho a veto.', true, 'EE.UU., Rusia, China, Francia y el Reino Unido.'),
          M('Al terminar la guerra, Alemania:', ['Fue dividida en zonas de ocupación entre los Aliados', 'Se convirtió en superpotencia', 'Anexó Polonia', 'Se unió a Japón'], 'En 1949 se formaron dos Estados: la RFA y la RDA.'),
        ],
      },
    ],
  });

  // ---------- Guerra Fría ----------
  RB.unit('h10', {
    name: 'Guerra Fría y descolonización', desc: 'El mundo bipolar, sus conflictos y su fin, la descolonización de Asia y África, y América Latina en la Guerra Fría (1945–1991).', ic: 'globe', area: 'Historia universal',
    lessons: [
      {
        n: 'El mundo bipolar', ic: 'globe', items: [
          { t: 'info', ic: 'globe', title: 'Guerra Fría (1947–1991)', txt: 'Enfrentamiento sin guerra directa entre **EE.UU.** (capitalismo y democracia liberal) y la **URSS** (comunismo y economía planificada). Hitos: **Doctrina Truman** y **Plan Marshall** (1947), **OTAN** (1949), **Pacto de Varsovia** (1955), **Muro de Berlín** (1961–1989), carrera **armamentista** y **espacial**. Terminó con la **caída del Muro** (1989) y la **disolución de la URSS** (1991).' },
          M('La Guerra Fría fue:', ['Un enfrentamiento ideológico, político y económico entre EE.UU. y la URSS, sin guerra directa entre ellos', 'Una guerra en el Ártico', 'La Primera Guerra Mundial', 'Un conflicto entre Chile y Argentina'], 'Se enfrentaron indirectamente, en conflictos en otros países.'),
          S('Clasifica cada elemento según el bloque', ['Bloque capitalista (EE.UU.)', 'Bloque comunista (URSS)'], [['OTAN', 0], ['Plan Marshall', 0], ['Economía de mercado', 0], ['Pacto de Varsovia', 1], ['Economía planificada', 1], ['Partido único', 1]], 'Cada bloque tenía su alianza militar y su modelo económico.'),
          M('El Plan Marshall (1947) consistió en:', ['Ayuda económica de EE.UU. para reconstruir Europa occidental y frenar el comunismo', 'Una invasión soviética', 'La construcción del Muro de Berlín', 'Un plan de la ONU para África'], 'Se complementó con la Doctrina Truman, de contención del comunismo.'),
          M('Tras la Segunda Guerra Mundial, Alemania quedó dividida en:', ['La República Federal (RFA), capitalista, y la República Democrática (RDA), comunista', 'Dos monarquías', 'Cuatro países independientes', 'Una colonia británica'], 'Se reunificó en 1990.'),
          M('El Muro de Berlín (1961–1989) simbolizó:', ['La división de Europa y del mundo en dos bloques', 'La unidad alemana', 'El fin de la Segunda Guerra Mundial', 'La alianza entre EE.UU. y la URSS'], 'Lo construyó la RDA para impedir que sus habitantes huyeran al oeste.'),
          M('La crisis de los misiles (1962) ocurrió cuando:', ['La URSS instaló misiles nucleares en Cuba y EE.UU. exigió retirarlos', 'EE.UU. bombardeó Moscú', 'China invadió Taiwán', 'Cayó el Muro de Berlín'], 'Fue el momento en que el mundo estuvo más cerca de una guerra nuclear.'),
          M('La carrera espacial incluyó hitos como:', ['El Sputnik soviético (1957) y la llegada a la Luna del Apolo 11 (1969)', 'La invención de la imprenta', 'El primer vuelo de los hermanos Wright', 'La bomba de Hiroshima'], 'Era otra forma de demostrar superioridad tecnológica.'),
          X('¿Cuáles fueron conflictos armados de la Guerra Fría? Marca todos.', ['La guerra de Corea', 'La guerra de Vietnam', 'La guerra de Afganistán (1979–1989)', 'La guerra franco-prusiana'], [0, 1, 2], 'En ellos, las superpotencias apoyaron a bandos opuestos.'),
          O('Ordena estos hechos de la Guerra Fría', ['Plan Marshall', 'Construcción del Muro de Berlín', 'Crisis de los misiles', 'Caída del Muro de Berlín', 'Disolución de la URSS'], '1947, 1961, 1962, 1989 y 1991.'),
          M('Las reformas de Mijaíl Gorbachov en la URSS (perestroika y glasnost) buscaban:', ['Reestructurar la economía y dar más apertura y transparencia', 'Volver al estalinismo', 'Invadir Europa occidental', 'Restaurar el zarismo'], 'Terminaron acelerando la caída del bloque soviético.'),
          T('La disuasión nuclear consistía en que ninguna potencia atacaba por temor a una destrucción mutua.', true, 'Se le llamó "equilibrio del terror".'),
          T('Al disolverse en 1991, la URSS dio origen a quince repúblicas independientes, entre ellas Rusia.', true, 'Con eso terminó la Guerra Fría.'),
        ],
      },
      {
        n: 'Descolonización y Tercer Mundo', ic: 'flag', items: [
          { t: 'info', ic: 'flag', title: 'Descolonización', txt: 'Tras 1945, las colonias de Asia y África se independizaron por el **debilitamiento de Europa**, los **movimientos nacionalistas** y el apoyo de la **ONU**. Hubo procesos **pacíficos** (**India**, 1947, con **Gandhi**) y **violentos** (**Argelia**, 1962). En la **Conferencia de Bandung** (1955) surgió la idea de **Tercer Mundo** y luego el **Movimiento de Países No Alineados**.' },
          M('La descolonización fue:', ['El proceso por el cual las colonias de Asia y África se independizaron tras la Segunda Guerra Mundial', 'La conquista de América', 'El reparto de África en Berlín', 'La Revolución Industrial'], 'Entre 1945 y 1975 surgieron decenas de nuevos países.'),
          X('¿Qué factores favorecieron la descolonización? Marca todos.', ['El debilitamiento de las potencias europeas tras la guerra', 'Los movimientos nacionalistas en las colonias', 'El apoyo de la ONU a la autodeterminación', 'El fortalecimiento de los imperios coloniales'], [0, 1, 2], 'EE.UU. y la URSS también se oponían, por distintas razones, al colonialismo europeo.'),
          M('La independencia de la India (1947) se caracterizó por:', ['El movimiento de resistencia no violenta liderado por Gandhi', 'Una larga guerra contra Francia', 'La intervención de la URSS', 'La anexión a China'], 'El territorio se dividió en India y Pakistán.'),
          M('La independencia de Argelia (1962) se caracterizó por:', ['Una guerra violenta contra Francia', 'Un proceso totalmente pacífico', 'El liderazgo de Gandhi', 'La anexión a Marruecos'], 'La descolonización no siempre fue pacífica.'),
          M('El término "Tercer Mundo" se usó para referirse a:', ['Los países que no pertenecían a ninguno de los dos bloques, muchos pobres y recién independizados', 'Los países más ricos', 'La URSS y sus aliados', 'Los países europeos'], 'Se popularizó tras la Conferencia de Bandung (1955).'),
          M('El Movimiento de Países No Alineados buscaba:', ['Mantenerse independiente de EE.UU. y de la URSS', 'Unirse a la OTAN', 'Formar parte del Pacto de Varsovia', 'Restaurar los imperios coloniales'], 'Defendía la neutralidad y el desarrollo de sus miembros.'),
          T('Muchos de los nuevos países africanos heredaron fronteras trazadas por las potencias coloniales.', true, 'Eso provocó conflictos étnicos y guerras posteriores.'),
          M('Una dificultad de muchos países recién descolonizados fue:', ['La dependencia económica de sus antiguas metrópolis y la inestabilidad política', 'El exceso de industrias', 'La falta total de recursos naturales', 'La sobrepoblación de Europa'], 'A esa dependencia se le ha llamado neocolonialismo.'),
        ],
      },
      {
        n: 'América Latina en la Guerra Fría', ic: 'map', items: [
          { t: 'info', ic: 'map', title: 'América Latina', txt: 'La **Revolución Cubana** (1959) de **Fidel Castro** y el **Che Guevara** llevó al socialismo a Cuba. EE.UU. respondió con la **Alianza para el Progreso** (1961), que promovió reformas, y con la **Doctrina de Seguridad Nacional**. Hubo **dictaduras militares** (Brasil 1964, Chile y Uruguay 1973, Argentina 1976), coordinadas en el **Plan Cóndor**. La **CEPAL** promovió la industrialización (**ISI**).' },
          M('La Revolución Cubana (1959) fue liderada por:', ['Fidel Castro y Ernesto "Che" Guevara', 'Salvador Allende', 'Juan Domingo Perón', 'Augusto Pinochet'], 'Derrocó al dictador Fulgencio Batista y luego se alineó con la URSS.'),
          M('La invasión de Bahía de Cochinos (1961) fue:', ['Un intento fallido de exiliados cubanos, apoyados por EE.UU., de derrocar a Fidel Castro', 'Un ataque soviético a EE.UU.', 'El inicio de la Revolución Cubana', 'Una batalla de la Segunda Guerra Mundial'], 'Acercó aún más a Cuba a la URSS.'),
          M('La Alianza para el Progreso (1961), impulsada por el presidente Kennedy, buscaba:', ['Promover reformas sociales y económicas para frenar la expansión de la revolución', 'Invadir Cuba', 'Crear una alianza militar latinoamericana', 'Nacionalizar las empresas de EE.UU.'], 'Apoyó, por ejemplo, reformas agrarias.'),
          M('Las reformas agrarias impulsadas en América Latina en los años sesenta buscaban:', ['Redistribuir la tierra concentrada en grandes latifundios', 'Privatizar las tierras indígenas', 'Eliminar la agricultura', 'Entregar la tierra a empresas extranjeras'], 'En Chile se aplicaron con Alessandri, Frei y Allende.'),
          M('La Doctrina de Seguridad Nacional planteaba que:', ['Las Fuerzas Armadas debían combatir a un "enemigo interno" asociado al comunismo', 'Los países debían desarmarse', 'Había que apoyar la revolución', 'Las elecciones debían ser obligatorias'], 'Sirvió para justificar golpes de Estado y graves violaciones a los derechos humanos.'),
          M('El Plan Cóndor fue:', ['Una coordinación entre dictaduras sudamericanas para perseguir a opositores más allá de sus fronteras', 'Un programa espacial', 'Un plan de reforma agraria', 'Una alianza comercial'], 'Participaron, entre otras, las dictaduras de Chile, Argentina, Uruguay, Paraguay, Bolivia y Brasil.'),
          M('La CEPAL (1948), con sede en Santiago, promovió:', ['La industrialización por sustitución de importaciones (ISI)', 'El libre comercio absoluto', 'La economía planificada soviética', 'El regreso a la agricultura'], 'Su figura más conocida fue Raúl Prebisch.'),
          O('Ordena estos golpes de Estado en América Latina', ['Brasil', 'Chile', 'Argentina'], '1964, 1973 y 1976.'),
          T('La Teología de la Liberación propuso un compromiso de la Iglesia con los pobres.', true, 'Surgió en América Latina tras el Concilio Vaticano II (1962–1965).'),
          M('En los años sesenta hubo profundos cambios culturales, como:', ['Los movimientos juveniles, feministas y por los derechos civiles', 'El regreso de las monarquías absolutas', 'El fin de la música popular', 'La prohibición de la televisión'], 'Destacaron Mayo del 68 y la lucha de Martin Luther King.'),
        ],
      },
    ],
  });
})();
