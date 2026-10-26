// Historia (6): Chile 1925–1958 (Estado de compromiso); Chile 1958–1973 (reformas, Unidad Popular y quiebre democrático).
(function () {
  const RB = window.RB, { M, T, P, S, O, X } = RB.Q;

  // ---------- Chile 1925–1958 ----------
  RB.unit('h11', {
    name: 'Chile 1925–1958: Estado de compromiso', desc: 'La Constitución de 1925, Ibáñez y la crisis de 1929, los gobiernos radicales, la CORFO y la industrialización, el voto femenino y los cambios sociales.', ic: 'factory', area: 'Historia de Chile',
    lessons: [
      {
        n: 'La Constitución de 1925 e Ibáñez', ic: 'scroll', items: [
          { t: 'info', ic: 'scroll', title: 'Un nuevo orden', txt: 'La **Constitución de 1925** restableció el **régimen presidencial**: presidente elegido por **voto directo** por **6 años**, sin reelección inmediata; **separó la Iglesia del Estado** y reconoció **derechos sociales**. **Carlos Ibáñez del Campo** (1927–1931) gobernó de forma **autoritaria** y modernizadora: creó **Carabineros**, la **Contraloría**, la **FACh** y el **Código del Trabajo**. La **crisis de 1929** provocó su caída.' },
          M('La Constitución de 1925 estableció:', ['Un régimen presidencial y la separación de la Iglesia y el Estado', 'Un régimen parlamentario', 'Una monarquía constitucional', 'El voto femenino'], 'Reemplazó a la Constitución de 1833.'),
          M('Según la Constitución de 1925, el presidente era elegido:', ['Por votación directa, para un período de 6 años sin reelección inmediata', 'Por el Congreso, cada 4 años', 'Por las Fuerzas Armadas', 'De por vida'], 'Si nadie obtenía mayoría absoluta, el Congreso Pleno elegía entre las dos primeras mayorías.'),
          M('La Constitución de 1925 fue aprobada mediante:', ['Un plebiscito', 'Una decisión del Congreso sin consulta', 'Un tratado internacional', 'Un decreto militar sin consulta'], 'Se plebiscitó en agosto de 1925, durante el retorno de Arturo Alessandri.'),
          X('¿Qué innovaciones introdujo la Constitución de 1925? Marca todas.', ['La separación de la Iglesia y el Estado', 'Derechos sociales, como la protección del trabajo', 'El Tribunal Calificador de Elecciones', 'El voto obligatorio de las mujeres'], [0, 1, 2], 'El voto femenino pleno llegó en 1949.'),
          P('Une cada institución creada durante el primer gobierno de Ibáñez con su función', [['Carabineros de Chile', 'Policía nacional unificada (1927)'], ['Contraloría General de la República', 'Control de la legalidad y del gasto público (1927)'], ['Fuerza Aérea de Chile', 'Rama aérea de las Fuerzas Armadas (1930)'], ['Código del Trabajo', 'Reunió la legislación laboral (1931)']], 'Fue un gobierno autoritario y modernizador.'),
          M('El primer gobierno de Carlos Ibáñez del Campo (1927–1931) se caracterizó por:', ['Ser autoritario y modernizar el Estado con obras financiadas con créditos externos', 'Ser parlamentario', 'Respetar plenamente las libertades', 'No hacer obras públicas'], 'Persiguió a opositores y censuró la prensa.'),
          M('La crisis de 1929 afectó a Chile principalmente porque:', ['Se desplomaron las exportaciones de salitre y cobre, y con ellas los ingresos del Estado', 'Chile fue invadido', 'Aumentaron mucho las exportaciones', 'Llegaron muchos créditos nuevos'], 'Hubo desempleo masivo, y miles de trabajadores salitreros migraron al centro del país.'),
          M('La "República Socialista" de 1932 fue:', ['Un gobierno que duró solo 12 días, impulsado por Marmaduke Grove', 'Un régimen que duró diez años', 'La primera república de Chile', 'Un gobierno de Pinochet'], 'Refleja la inestabilidad tras la caída de Ibáñez.'),
          T('La Constitución de 1925 rigió hasta 1973.', true, 'El golpe de Estado la suspendió, y luego fue reemplazada por la de 1980.'),
        ],
      },
      {
        n: 'Gobiernos radicales y Estado empresario', ic: 'factory', items: [
          { t: 'info', ic: 'factory', title: 'Estado de compromiso', txt: 'Tras el **segundo gobierno de Alessandri** (1932–1938) gobernaron los **radicales** (1938–1952): **Pedro Aguirre Cerda** (Frente Popular: "gobernar es educar"), **Juan Antonio Ríos** y **Gabriel González Videla**. La **CORFO** (1939) impulsó la **industrialización por sustitución de importaciones** (ISI) con **ENDESA**, **CAP**, **ENAP** e **IANSA**. El Estado mediaba entre clase media, obreros y élite: el **Estado de compromiso**.' },
          M('La CORFO (Corporación de Fomento de la Producción), creada en 1939, tenía como objetivo:', ['Impulsar la industrialización del país', 'Privatizar las empresas estatales', 'Administrar las salitreras británicas', 'Organizar las elecciones'], 'También sirvió para reconstruir el país tras el terremoto de Chillán (1939).'),
          P('Une cada empresa creada con apoyo de la CORFO con su rubro', [['ENDESA', 'Electricidad'], ['CAP (Huachipato)', 'Acero'], ['ENAP', 'Petróleo'], ['IANSA', 'Azúcar de remolacha']], 'Fueron la base del Estado empresario.'),
          M('La industrialización por sustitución de importaciones (ISI) buscaba:', ['Producir en Chile bienes que antes se importaban, protegiendo la industria nacional', 'Importar todos los productos', 'Eliminar la industria', 'Exportar solo cobre'], 'Fue promovida por la CEPAL en gran parte de América Latina.'),
          M('El lema "gobernar es educar" se asocia al presidente:', ['Pedro Aguirre Cerda', 'Carlos Ibáñez', 'Arturo Alessandri', 'Gabriel González Videla'], 'Su gobierno (1938–1941) amplió fuertemente la educación pública.'),
          M('El Frente Popular (1938) fue una coalición de:', ['Radicales, socialistas y comunistas', 'Conservadores y liberales', 'Militares y la Iglesia', 'Solo partidos de derecha'], 'Llevó a Pedro Aguirre Cerda a la presidencia.'),
          M('El "Estado de compromiso" se refiere a:', ['Un sistema en que distintos sectores sociales negociaban y el Estado mediaba entre ellos', 'Un régimen militar', 'Un gobierno sin partidos', 'Una alianza militar con EE.UU.'], 'El Estado asumió un rol central en la economía y en la protección social.'),
          M('La "Ley de Defensa Permanente de la Democracia" (1948), llamada "ley maldita":', ['Proscribió al Partido Comunista', 'Estableció el voto femenino', 'Creó la CORFO', 'Nacionalizó el cobre'], 'La promulgó González Videla en el contexto de la Guerra Fría; se derogó en 1958.'),
          M('El terremoto de Chillán (1939) fue importante porque:', ['Impulsó la creación de la CORFO para la reconstrucción y el fomento productivo', 'Provocó la Guerra del Pacífico', 'Destruyó Santiago', 'Causó la caída de Ibáñez'], 'Es uno de los terremotos más mortíferos de la historia de Chile.'),
          T('En este período, el Estado asumió funciones en educación, salud, previsión y producción.', true, 'Es el modelo de Estado benefactor y empresario.'),
          M('El segundo gobierno de Arturo Alessandri (1932–1938) se caracterizó por:', ['Restablecer el orden y recuperar la economía tras la crisis', 'Crear la CORFO', 'Dar el voto presidencial a las mujeres', 'Nacionalizar el cobre'], 'También hubo represión, como la matanza del Seguro Obrero (1938).'),
        ],
      },
      {
        n: 'Sociedad: mujeres, ciudades y clase media', ic: 'people', items: [
          { t: 'info', ic: 'people', title: 'Cambios sociales', txt: 'Creció la **clase media** y se aceleró la **urbanización**: muchos migraron del campo a la ciudad y surgieron **poblaciones callampa**. Las mujeres votaron en elecciones **municipales desde 1934** y obtuvieron el **voto pleno en 1949**; votaron por primera vez en una presidencial en **1952**. **Ibáñez** volvió al poder (1952–1958), con alta **inflación**.' },
          M('Las mujeres chilenas obtuvieron el derecho a votar en elecciones presidenciales y parlamentarias en:', ['1949', '1925', '1810', '1973'], 'Votaron por primera vez en una presidencial en 1952. Desde 1934 podían votar en elecciones municipales.'),
          M('Las poblaciones callampa surgieron:', ['Por la migración del campo a la ciudad y la falta de viviendas', 'Por la llegada de inmigrantes europeos ricos', 'Por la Guerra del Pacífico', 'Por la reforma agraria'], 'Se llamaban así porque aparecían de un día para otro, como hongos.'),
          M('Carlos Ibáñez volvió a la presidencia en 1952 con el símbolo de:', ['Una escoba, para "barrer" con la politiquería de los partidos', 'Una espada', 'Una estrella', 'Un martillo'], 'Lo llamaban "el general de la esperanza".'),
          M('Un problema económico persistente entre 1940 y 1970 fue:', ['La alta inflación', 'La deflación permanente', 'El exceso de exportaciones industriales', 'La falta total de empleo público'], 'La misión Klein-Saks (1955) intentó controlarla, con resultados limitados.'),
          M('Elena Caffarena y Amanda Labarca destacaron por:', ['Su lucha por los derechos de las mujeres y el sufragio femenino', 'Ser presidentas de Chile', 'Dirigir la CORFO', 'Combatir en la Guerra del Pacífico'], 'El Movimiento Pro Emancipación de las Mujeres de Chile (MEMCH) fue clave.'),
          O('Ordena estos hechos', ['Constitución de 1925', 'Crisis de 1929 en Chile', 'Creación de la CORFO', 'Voto femenino pleno', 'Segundo gobierno de Ibáñez'], '1925, 1929–1931, 1939, 1949 y 1952.'),
          T('Entre 1930 y 1970, la población urbana de Chile superó a la rural.', true, 'La migración campo-ciudad transformó al país.'),
          M('La cédula única electoral, establecida en 1958, buscaba:', ['Hacer el voto más secreto y combatir el cohecho', 'Prohibir el voto de las mujeres', 'Eliminar las elecciones', 'Permitir el voto por correo'], 'Fortaleció la limpieza de las elecciones.'),
          M('El Servicio Nacional de Salud (SNS), creado en 1952, buscaba:', ['Extender la atención de salud pública a la población', 'Privatizar los hospitales', 'Atender solo a los militares', 'Cobrar cada consulta a todos'], 'Fue parte del Estado de bienestar.'),
          M('El crecimiento de la clase media en el siglo XX se relacionó con:', ['La expansión del Estado, de la educación y de los empleos públicos', 'La desaparición de la educación', 'La reducción del Estado', 'El fin de las ciudades'], 'Se identificó con partidos como el Radical.'),
        ],
      },
    ],
  });

  // ---------- Chile 1958–1973 ----------
  RB.unit('h12', {
    name: 'Chile 1958–1973: reformas y quiebre', desc: 'Los tres tercios, Jorge Alessandri, la Revolución en Libertad de Frei, la Unidad Popular de Allende, la crisis y el golpe de Estado de 1973.', ic: 'bolt', area: 'Historia de Chile',
    lessons: [
      {
        n: 'Alessandri y Frei: las reformas', ic: 'leaf', items: [
          { t: 'info', ic: 'leaf', title: 'Reformas estructurales', txt: '**Jorge Alessandri** (1958–1964) gobernó con técnicos, enfrentó el **terremoto de Valdivia** (1960) e inició una tímida **reforma agraria** (1962). **Eduardo Frei Montalva** (1964–1970), demócrata cristiano, impulsó la **"Revolución en Libertad"**: **reforma agraria** (1967) y **sindicalización campesina**, **chilenización del cobre** (el Estado compró el 51 %), **promoción popular** y **reforma educacional**.' },
          M('El gobierno de Jorge Alessandri (1958–1964) se caracterizó por:', ['Un enfoque técnico y favorable a la empresa privada, que buscó estabilizar la economía', 'La vía chilena al socialismo', 'La nacionalización del cobre', 'Un régimen militar'], 'En 1960 introdujo el escudo como moneda.'),
          M('El terremoto de Valdivia (1960) es:', ['El terremoto de mayor magnitud registrado en el mundo (9,5)', 'El primer terremoto de Chile', 'Un sismo sin consecuencias', 'Un terremoto ocurrido en Santiago'], 'Afectó gravemente al sur del país y generó un gran tsunami.'),
          M('La primera reforma agraria (1962), aplicada durante el gobierno de Jorge Alessandri:', ['Fue muy limitada, por lo que se le llamó "reforma de macetero"', 'Expropió todos los latifundios', 'Devolvió tierras a los mapuche', 'Nacionalizó el cobre'], 'Respondía en parte a las exigencias de la Alianza para el Progreso.'),
          M('La "Revolución en Libertad" fue el programa de:', ['Eduardo Frei Montalva y la Democracia Cristiana', 'Salvador Allende', 'Augusto Pinochet', 'Jorge Alessandri'], 'Buscaba cambios profundos sin romper la democracia.'),
          M('La chilenización del cobre (1966) consistió en:', ['La compra por el Estado del 51 % de las acciones de las grandes minas', 'La nacionalización total sin indemnización', 'La venta de las minas a empresas extranjeras', 'El cierre de las minas'], 'La nacionalización total llegó en 1971.'),
          M('La reforma agraria de Frei (1967) buscaba:', ['Expropiar latifundios mal explotados y entregar tierras a los campesinos', 'Devolver tierras a los terratenientes', 'Importar todos los alimentos', 'Eliminar la agricultura'], 'Se complementó con la ley de sindicalización campesina.'),
          M('La "promoción popular" de Frei impulsó:', ['La organización de juntas de vecinos y centros de madres', 'La privatización de la salud', 'El fin de los partidos', 'La disolución del Congreso'], 'Buscaba integrar a los sectores marginados a la vida social y política.'),
          T('Durante el gobierno de Frei Montalva, una reforma educacional extendió la educación básica a 8 años.', true, 'Aumentó fuertemente la cobertura escolar.'),
          M('En los años sesenta, la política chilena se caracterizó por:', ['La división en tres tercios (derecha, centro e izquierda), cada uno con un proyecto global propio', 'La existencia de un solo partido', 'La ausencia de elecciones', 'El acuerdo total entre los partidos'], 'Esos proyectos excluyentes dificultaron los acuerdos.'),
          S('Clasifica cada medida según el gobierno', ['Frei Montalva (1964–1970)', 'Allende (1970–1973)'], [['Chilenización del cobre', 0], ['Promoción popular', 0], ['Sindicalización campesina', 0], ['Nacionalización del cobre', 1], ['Área de Propiedad Social', 1], ['Estatización de la banca', 1]], 'Ambos profundizaron la reforma agraria.'),
        ],
      },
      {
        n: 'La Unidad Popular (1970–1973)', ic: 'flag', items: [
          { t: 'info', ic: 'flag', title: 'La vía chilena al socialismo', txt: '**Salvador Allende** ganó la elección de **1970** con el **36,6 %** y fue ratificado por el **Congreso Pleno**. La **Unidad Popular** buscó construir el socialismo **en democracia**: **nacionalización del cobre** (1971, por unanimidad), estatización de bancos y empresas (**Área de Propiedad Social**) y aceleración de la **reforma agraria**. Tras un buen primer año llegaron la **inflación**, el **desabastecimiento** y una profunda **polarización**.' },
          M('En la elección presidencial de 1970 compitieron:', ['Salvador Allende, Jorge Alessandri y Radomiro Tomic', 'Pinochet, Allende y Frei', 'Aylwin, Büchi y Errázuriz', 'Ibáñez, Alessandri y Aguirre Cerda'], 'Allende ganó por un estrecho margen sobre Alessandri.'),
          M('Salvador Allende llegó a la presidencia en 1970:', ['Tras obtener la primera mayoría relativa (36,6 %) y ser ratificado por el Congreso Pleno', 'Mediante un golpe de Estado', 'Con más del 60 % de los votos', 'Designado por las Fuerzas Armadas'], 'Como nadie obtuvo mayoría absoluta, el Congreso eligió entre las dos primeras mayorías.'),
          M('El Estatuto de Garantías Constitucionales, firmado por Allende antes de asumir, lo comprometía a:', ['Respetar las libertades, el pluralismo y la democracia', 'Disolver el Congreso', 'Prohibir los partidos de oposición', 'Estatizar la prensa'], 'Lo exigió la Democracia Cristiana para votar por él en el Congreso Pleno.'),
          M('El asesinato del general René Schneider (1970) buscaba:', ['Provocar una intervención militar que impidiera la llegada de Allende al poder', 'Apoyar a Allende', 'Iniciar la reforma agraria', 'Nacionalizar el cobre'], 'Schneider defendía que las Fuerzas Armadas no intervinieran en política.'),
          M('La "vía chilena al socialismo" planteaba:', ['Construir el socialismo respetando la democracia y las instituciones', 'Tomar el poder mediante una guerra civil', 'Establecer una monarquía', 'Privatizar la economía'], 'Fue una experiencia inédita en el mundo.'),
          M('La nacionalización del cobre (1971) fue aprobada:', ['Por unanimidad en el Congreso', 'Solo por los partidos de gobierno', 'Por decreto, sin el Congreso', 'Mediante un plebiscito'], 'De ahí la expresión "el cobre es el sueldo de Chile".'),
          M('El Área de Propiedad Social fue:', ['El conjunto de empresas estratégicas que pasaron a manos del Estado', 'Un barrio de Santiago', 'Un programa de vivienda privada', 'Una zona franca'], 'Su formación fue muy resistida por la oposición.'),
          T('Durante el primer año de la Unidad Popular (1971), la economía creció y bajó el desempleo.', true, 'El aumento de salarios y del gasto impulsó el consumo; después llegaron la inflación y la escasez.'),
          X('¿Qué problemas económicos hubo durante la Unidad Popular, sobre todo desde 1972? Marca todos.', ['Una inflación muy alta', 'Desabastecimiento y mercado negro', 'Caída de la producción', 'Exceso de exportaciones industriales'], [0, 1, 2], 'En 1973 la inflación superó el 500 % anual.'),
          M('Las JAP (Juntas de Abastecimiento y Precios) fueron creadas para:', ['Distribuir alimentos y controlar precios frente al desabastecimiento', 'Organizar elecciones', 'Exportar cobre', 'Dirigir las Fuerzas Armadas'], 'La oposición las criticó como un mecanismo de control político.'),
        ],
      },
      {
        n: 'El quiebre de la democracia', ic: 'bolt', items: [
          { t: 'info', ic: 'bolt', title: '1973', txt: 'La crisis se profundizó: **polarización** extrema, violencia política, el **paro de octubre de 1972**, el **"Tanquetazo"** (junio de 1973) y un acuerdo de la **Cámara de Diputados** (agosto) que acusó al gobierno de violar la Constitución. EE.UU. intervino para desestabilizar al gobierno. El **11 de septiembre de 1973**, las Fuerzas Armadas dieron un **golpe de Estado**: bombardearon **La Moneda** y Allende murió en su interior.' },
          M('El paro de camioneros de octubre de 1972 fue:', ['Una huelga de transportistas y gremios contra el gobierno, que agravó el desabastecimiento', 'Un apoyo masivo al gobierno', 'Una huelga de estudiantes', 'Una celebración del cobre'], 'Mostró el nivel de polarización del país.'),
          M('El "Tanquetazo" (29 de junio de 1973) fue:', ['Un intento fallido de golpe de Estado de un regimiento blindado', 'Un paro de camioneros', 'Una marcha pacífica', 'La nacionalización del cobre'], 'Fue un anticipo del golpe de septiembre.'),
          M('El acuerdo de la Cámara de Diputados del 22 de agosto de 1973:', ['Acusó al gobierno de Allende de violar la Constitución y las leyes', 'Apoyó la vía chilena al socialismo', 'Disolvió el Congreso', 'Aprobó la reforma agraria'], 'Después fue usado para justificar el golpe.'),
          M('El 11 de septiembre de 1973:', ['Las Fuerzas Armadas y Carabineros dieron un golpe de Estado y bombardearon La Moneda', 'Allende ganó la elección', 'Se nacionalizó el cobre', 'Se promulgó la Constitución de 1980'], 'Salvador Allende murió en el Palacio de La Moneda.'),
          X('¿Qué factores ayudan a explicar el quiebre de la democracia en 1973? Marca todos.', ['La polarización política y la falta de acuerdos', 'La crisis económica', 'La intervención de EE.UU. en el contexto de la Guerra Fría', 'El pleno consenso entre todos los partidos'], [0, 1, 2], 'Los historiadores debaten el peso de cada factor.'),
          T('Durante la Unidad Popular hubo intervención de Estados Unidos para desestabilizar al gobierno.', true, 'Documentos desclasificados muestran acciones de la CIA y presiones económicas.'),
          O('Ordena estos hechos', ['Terremoto de Valdivia', 'Chilenización del cobre', 'Elección de Salvador Allende', 'Nacionalización del cobre', 'Golpe de Estado'], '1960, 1966, 1970, 1971 y 1973.'),
          M('En 1972 y 1973, la vida política se caracterizó por:', ['La violencia política y el enfrentamiento entre grupos de distinto signo', 'La ausencia de conflictos', 'La desaparición de los partidos', 'El acuerdo entre gobierno y oposición'], 'Hubo atentados, tomas de terrenos y fábricas, y paros.'),
          M('La reforma agraria, entre 1962 y 1973, tuvo como efecto:', ['El fin del latifundio tradicional y la organización de los campesinos', 'El aumento del latifundio', 'La desaparición de la agricultura', 'La privatización inmediata de todas las tierras'], 'Fue uno de los cambios más profundos del siglo XX chileno.'),
          T('La democracia se quebró en un contexto en que los proyectos de derecha, centro e izquierda parecían incompatibles.', true, 'Se habla de "proyectos globales" excluyentes.'),
        ],
      },
    ],
  });
})();
