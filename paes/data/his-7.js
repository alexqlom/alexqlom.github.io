// Historia (7): dictadura militar y transición; Formación ciudadana I (Estado, democracia y poderes del Estado).
(function () {
  const RB = window.RB, { M, T, P, S, O, X } = RB.Q;

  // ---------- Dictadura y transición ----------
  RB.unit('h13', {
    name: 'Dictadura y transición', desc: 'La Junta Militar, las violaciones a los derechos humanos, el modelo neoliberal, la Constitución de 1980, el plebiscito de 1988 y la transición (1973–2005).', ic: 'lock', area: 'Historia de Chile',
    lessons: [
      {
        n: 'La dictadura militar', ic: 'lock', items: [
          { t: 'info', ic: 'lock', title: 'Dictadura (1973–1990)', txt: 'Una **Junta Militar** (Pinochet, Merino, Leigh y Mendoza) asumió el poder; **Augusto Pinochet** concentró el mando. Se **disolvió el Congreso**, se **prohibieron los partidos** y se impuso la **censura**. Hubo **violaciones sistemáticas a los derechos humanos**: tortura, ejecuciones, **desaparición forzada** y exilio, a cargo de la **DINA** (1974–1977) y la **CNI** (1977–1990).' },
          M('Tras el golpe de 1973, el poder lo asumió:', ['Una Junta Militar formada por los comandantes de las Fuerzas Armadas y Carabineros', 'El Congreso Nacional', 'La Corte Suprema', 'Un gobierno elegido por votación'], 'Augusto Pinochet la presidió y luego concentró el poder.'),
          M('En 1974, la Junta nombró a Augusto Pinochet:', ['Jefe Supremo de la Nación y luego Presidente de la República', 'Embajador en EE.UU.', 'Ministro de Hacienda', 'Senador vitalicio'], 'Concentró el poder ejecutivo, mientras la Junta ejercía el legislativo.'),
          X('¿Qué medidas tomó la dictadura en sus primeros años? Marca todas.', ['Disolver el Congreso', 'Prohibir los partidos políticos', 'Imponer la censura y el toque de queda', 'Convocar a elecciones libres inmediatas'], [0, 1, 2], 'También intervino las universidades y destruyó los registros electorales.'),
          M('La desaparición forzada consiste en:', ['Detener a una persona y negar su paradero, ocultando su destino', 'Exiliar a una persona con su consentimiento', 'Trasladar a un funcionario a otra ciudad', 'Un tipo de elección'], 'Es un crimen de lesa humanidad. Muchas familias aún buscan a sus seres queridos.'),
          M('La DINA (1974–1977) fue:', ['La policía política de la dictadura, responsable de graves violaciones a los derechos humanos', 'Un banco estatal', 'Un partido político', 'Una organización de derechos humanos'], 'Fue reemplazada por la CNI en 1977.'),
          M('La Vicaría de la Solidaridad (1976), creada por el cardenal Raúl Silva Henríquez:', ['Defendió a las víctimas de violaciones a los derechos humanos y les dio asistencia legal', 'Apoyó la represión', 'Administró las AFP', 'Redactó la Constitución de 1980'], 'Antes funcionó el Comité Pro Paz, con varias iglesias.'),
          M('El Estadio Nacional y Villa Grimaldi son recordados como:', ['Centros de detención y tortura de la dictadura', 'Lugares de celebración del golpe', 'Sedes del Congreso', 'Monumentos de la independencia'], 'Hoy son sitios de memoria.'),
          M('El ex canciller Orlando Letelier fue asesinado en 1976 en:', ['Washington, Estados Unidos', 'Santiago', 'Buenos Aires', 'Lima'], 'Fue un atentado de la DINA. En Buenos Aires había sido asesinado el general Carlos Prats (1974).'),
          M('La "Caravana de la Muerte" (1973) fue:', ['Una comitiva militar que recorrió el país ejecutando a prisioneros políticos', 'Una marcha por la democracia', 'Una campaña de vacunación', 'Un desfile militar'], 'Es uno de los crímenes más conocidos de los primeros meses de la dictadura.'),
          T('Miles de chilenos debieron partir al exilio durante la dictadura.', true, 'Muchos fueron expulsados o huyeron por persecución política.'),
        ],
      },
      {
        n: 'Modelo neoliberal y Constitución de 1980', ic: 'coin', items: [
          { t: 'info', ic: 'coin', title: 'Transformaciones', txt: 'Los **"Chicago boys"** aplicaron un modelo **neoliberal**: libre mercado, **privatización** de empresas estatales, **apertura comercial** y reducción del Estado. Se crearon las **AFP** (1980) y las **isapres**, se **municipalizó** la educación y el **Plan Laboral** limitó a los sindicatos. Hubo una grave **crisis en 1982**. La **Constitución de 1980** se aprobó en un plebiscito **sin registros electorales**.' },
          M('Los "Chicago boys" eran:', ['Economistas formados en la Universidad de Chicago que aplicaron el modelo neoliberal en Chile', 'Militares estadounidenses', 'Un equipo deportivo', 'Dirigentes sindicales'], 'Su programa se conoció como "El Ladrillo".'),
          X('¿Cuáles fueron rasgos del modelo económico neoliberal? Marca todos.', ['Privatización de empresas estatales', 'Apertura comercial y rebaja de aranceles', 'Reducción del tamaño del Estado', 'Fijación estatal de todos los precios'], [0, 1, 2], 'El mercado pasó a ser el principal asignador de recursos.'),
          M('Las AFP, creadas en 1980, establecieron un sistema de pensiones de:', ['Capitalización individual: cada trabajador ahorra en su propia cuenta', 'Reparto: los trabajadores activos financian a los jubilados', 'Pensiones pagadas solo por el Estado', 'Ahorro voluntario sin cotización'], 'Reemplazaron al antiguo sistema de cajas de previsión.'),
          M('El Plan Laboral (1979) estableció:', ['Nuevas reglas para los sindicatos y la negociación colectiva, que limitaron su poder', 'La jornada de 6 horas', 'La nacionalización de las empresas', 'El fin de los contratos de trabajo'], 'Formó parte de las llamadas "siete modernizaciones".'),
          M('La crisis económica de 1982 se caracterizó por:', ['Quiebras de bancos y empresas y un desempleo cercano al 30 %', 'Un crecimiento récord', 'La nacionalización del cobre', 'La hiperinflación de 1973'], 'El Estado intervino bancos y creó programas de empleo como el PEM y el POJH.'),
          M('La Constitución de 1980 fue aprobada:', ['En un plebiscito sin registros electorales y bajo estado de emergencia', 'Por un Congreso elegido democráticamente', 'Por una asamblea constituyente', 'Por unanimidad en el Senado'], 'Por eso su legitimidad de origen ha sido cuestionada.'),
          M('La versión original de la Constitución de 1980 incluía:', ['Senadores designados, un Consejo de Seguridad Nacional con gran poder y la inamovilidad de los comandantes en jefe', 'El voto femenino', 'La nacionalización del cobre', 'Un régimen parlamentario'], 'Muchos de estos "enclaves autoritarios" se eliminaron en 2005.'),
          M('La municipalización de la educación (1981) consistió en:', ['Traspasar los colegios del Estado central a las municipalidades', 'Cerrar todos los colegios públicos', 'Hacer gratuita la universidad', 'Fundar el Instituto Nacional'], 'También se promovieron los colegios particulares subvencionados.'),
          S('Clasifica cada medida', ['Economía neoliberal', 'Represión política'], [['Privatización de empresas estatales', 0], ['Creación de las AFP', 0], ['Rebaja de aranceles', 0], ['Creación de la DINA', 1], ['Disolución del Congreso', 1], ['Censura de prensa', 1]], 'La dictadura combinó una transformación económica profunda con la represión.'),
          T('Desde mediados de los años ochenta, la economía chilena tuvo un fuerte crecimiento.', true, 'Algunos lo llamaron "milagro económico", aunque con alta desigualdad y pobreza.'),
        ],
      },
      {
        n: 'La transición a la democracia', ic: 'vote', items: [
          { t: 'info', ic: 'vote', title: 'Transición', txt: 'Desde **1983** hubo **protestas nacionales**. En el **plebiscito del 5 de octubre de 1988** ganó el **"No"** (cerca del 56 %). En **1989** se aprobaron reformas constitucionales y se eligió a **Patricio Aylwin** (Concertación), que asumió en **1990**. La **Comisión Rettig** (1991) y la **Comisión Valech** (2004) documentaron las violaciones a los derechos humanos. En **2005** se eliminaron los senadores designados.' },
          M('En el plebiscito del 5 de octubre de 1988:', ['Ganó la opción "No", y se convocó a elecciones democráticas', 'Ganó el "Sí" y Pinochet siguió 8 años más', 'Se aprobó la Constitución de 1980', 'Se eligió a Salvador Allende'], 'El "No" obtuvo cerca del 56 % de los votos.'),
          M('El primer presidente elegido democráticamente tras la dictadura fue:', ['Patricio Aylwin (1990–1994)', 'Ricardo Lagos', 'Eduardo Frei Ruiz-Tagle', 'Michelle Bachelet'], 'Fue el candidato de la Concertación de Partidos por la Democracia.'),
          P('Une cada comisión con su trabajo', [['Comisión Rettig (1991)', 'Verdad sobre ejecutados y detenidos desaparecidos'], ['Comisión Valech (2004)', 'Prisión política y tortura'], ['Mesa de Diálogo (1999–2000)', 'Información sobre el destino de detenidos desaparecidos']], 'Fueron pasos hacia la verdad y la reparación.'),
          M('Las protestas nacionales contra la dictadura comenzaron en:', ['1983, en medio de la crisis económica', '1973', '1990', '2005'], 'Las convocaron organizaciones sindicales y luego los partidos de oposición.'),
          O('Ordena estos hechos', ['Golpe de Estado', 'Plebiscito de la Constitución', 'Crisis económica', 'Plebiscito del Sí y el No', 'Asume Patricio Aylwin'], '1973, 1980, 1982, 1988 y 1990.'),
          M('Las reformas constitucionales de 2005, durante el gobierno de Ricardo Lagos:', ['Eliminaron los senadores designados y vitalicios y fijaron el período presidencial en 4 años', 'Crearon el Congreso Nacional', 'Restablecieron la Constitución de 1925', 'Aprobaron el voto femenino'], 'Fueron las reformas más amplias a la Constitución de 1980 hasta entonces.'),
          M('La detención de Pinochet en Londres (1998) se produjo por:', ['Una orden de un juez español que lo acusaba de crímenes contra la humanidad', 'Un problema con su pasaporte', 'Una deuda bancaria', 'Una invitación oficial'], 'Volvió a Chile en 2000 y enfrentó procesos judiciales.'),
          T('Durante la transición, Pinochet siguió como comandante en jefe del Ejército hasta 1998.', true, 'Luego asumió como senador vitalicio, cargo que existía en la Constitución de 1980.'),
          M('La Concertación de Partidos por la Democracia fue:', ['La coalición de centro e izquierda que gobernó Chile entre 1990 y 2010', 'Un partido militar', 'La coalición que apoyó el "Sí" en 1988', 'Un sindicato'], 'Sus presidentes fueron Aylwin, Frei Ruiz-Tagle, Lagos y Bachelet.'),
          M('La Ley de Amnistía de 1978 fue criticada porque:', ['Impedía juzgar muchos crímenes cometidos entre 1973 y 1978', 'Liberó a todos los presos comunes', 'Prohibió el exilio', 'Creó la CNI'], 'Con el tiempo, los tribunales dejaron de aplicarla a crímenes de lesa humanidad.'),
        ],
      },
    ],
  });

  // ---------- Estado, democracia y poderes ----------
  RB.unit('h14', {
    name: 'Estado, democracia y poderes', desc: 'Estado y nación, régimen democrático, Estado de derecho, poderes Ejecutivo, Legislativo y Judicial, formación de la ley y órganos autónomos.', ic: 'landmark', area: 'Formación ciudadana',
    lessons: [
      {
        n: 'Estado, nación y democracia', ic: 'landmark', items: [
          { t: 'info', ic: 'landmark', title: 'Conceptos clave', txt: 'El **Estado** es la organización política y jurídica de una sociedad, con **población**, **territorio** y **poder soberano**. La **nación** es una comunidad con historia, lengua y cultura comunes. Chile es una **república democrática** y un **Estado unitario**. En democracia hay **soberanía popular**, **Estado de derecho**, **separación de poderes**, **pluralismo** y respeto a los **derechos humanos**.' },
          M('¿Cuáles son los elementos del Estado?', ['Población, territorio y poder soberano', 'Bandera, himno y escudo', 'Presidente, Congreso y tribunales', 'Lengua, religión y costumbres'], 'Los símbolos patrios representan al Estado, pero no son sus elementos.'),
          M('La diferencia entre Estado y nación es que:', ['El Estado es una organización política y jurídica; la nación, una comunidad unida por historia, cultura e identidad', 'Son exactamente lo mismo', 'La nación tiene ejército y el Estado no', 'El Estado no tiene territorio'], 'En un Estado puede haber varias naciones, como los pueblos originarios en Chile.'),
          M('Chile es un Estado unitario porque:', ['Hay un solo centro de poder político que legisla para todo el territorio, aunque la administración se descentralice', 'Cada región tiene su propia Constitución', 'No tiene regiones', 'Lo gobierna un rey'], 'Son federales, por ejemplo, EE.UU., Argentina, Brasil y México.'),
          M('El Estado de derecho significa que:', ['Gobernantes y gobernados están sometidos a la Constitución y a las leyes', 'El gobierno puede actuar por sobre la ley', 'Solo los ciudadanos deben respetar la ley', 'No existen tribunales'], 'Incluye el principio de legalidad: las autoridades solo pueden hacer lo que la ley les permite.'),
          X('¿Qué elementos son propios de un régimen democrático? Marca todos.', ['Elecciones libres y periódicas', 'Separación de poderes', 'Pluralismo político', 'Partido único'], [0, 1, 2], 'También el respeto a los derechos humanos y a las minorías.'),
          M('En una democracia representativa, el pueblo:', ['Elige a representantes que toman decisiones en su nombre', 'Vota directamente cada ley', 'No participa', 'Es gobernado por una familia'], 'El plebiscito es, en cambio, un mecanismo de democracia directa.'),
          M('Según la Constitución, la soberanía reside esencialmente en:', ['La Nación', 'El Presidente de la República', 'Las Fuerzas Armadas', 'El Congreso'], 'La ejerce el pueblo, mediante elecciones y plebiscitos, y las autoridades. Su límite son los derechos humanos.'),
          M('Un régimen presidencial, como el de Chile, se caracteriza porque:', ['El Presidente es a la vez jefe de Estado y jefe de Gobierno', 'Un primer ministro elegido por el Parlamento dirige el gobierno', 'Un rey gobierna de por vida', 'No hay separación de poderes'], 'En un régimen parlamentario, como el de España, el jefe de Gobierno depende del Parlamento.'),
          M('Los estados de excepción constitucional permiten:', ['Restringir temporalmente algunos derechos ante guerras, catástrofes o grave alteración del orden', 'Suspender la Constitución para siempre', 'Disolver el Congreso', 'Prohibir las elecciones indefinidamente'], 'Son los estados de asamblea, de sitio, de catástrofe y de emergencia.'),
          T('El respeto a las minorías es un principio de la democracia, aunque las decisiones se tomen por mayoría.', true, 'La mayoría no puede vulnerar los derechos fundamentales de las minorías.'),
        ],
      },
      {
        n: 'Los tres poderes del Estado', ic: 'scale', items: [
          { t: 'info', ic: 'scale', title: 'Separación de poderes', txt: '**Ejecutivo**: el **Presidente** (4 años, sin reelección inmediata) gobierna y administra con sus **ministros**. **Legislativo**: el **Congreso Nacional**, bicameral (**Cámara de Diputadas y Diputados**, 155 miembros por 4 años, y **Senado**, 50 miembros por 8 años), legisla, aprueba el presupuesto y la Cámara fiscaliza. **Judicial**: los **tribunales**, con la **Corte Suprema** a la cabeza.' },
          S('Clasifica cada función según el poder del Estado', ['Ejecutivo', 'Legislativo', 'Judicial'], [['Gobernar y administrar el Estado', 0], ['Nombrar a los ministros', 0], ['Aprobar las leyes', 1], ['Fiscalizar los actos del gobierno', 1], ['Resolver conflictos aplicando la ley', 2], ['Dictar sentencias', 2]], 'La separación de poderes evita que el poder se concentre.'),
          M('El Presidente de la República de Chile dura en su cargo:', ['4 años, sin reelección inmediata', '6 años, con reelección inmediata', '8 años', '5 años, con una reelección'], 'Así lo fijó la reforma de 2005.'),
          M('¿Qué requisitos debe cumplir quien quiera ser Presidente de la República?', ['Tener nacionalidad chilena, 35 años cumplidos y derecho a sufragio', 'Tener 18 años y un título universitario', 'Haber sido senador', 'Ser militar'], 'Antes de 2005, la edad mínima era de 40 años.'),
          M('El Congreso Nacional de Chile es bicameral, es decir, está formado por:', ['La Cámara de Diputadas y Diputados y el Senado', 'El Senado y la Corte Suprema', 'Los ministros y los gobernadores', 'Una sola cámara'], 'Ambas cámaras participan en la formación de las leyes.'),
          M('Fiscalizar los actos del Gobierno es una atribución exclusiva de:', ['La Cámara de Diputadas y Diputados', 'El Senado', 'La Corte Suprema', 'El Tribunal Constitucional'], 'Puede interpelar a ministros y crear comisiones investigadoras.'),
          M('En una acusación constitucional, la Cámara de Diputados acusa y el Senado:', ['Actúa como jurado y decide si la autoridad es culpable', 'Dicta una ley', 'Nombra un nuevo presidente', 'Archiva el caso sin votar'], 'Se puede acusar, entre otros, al Presidente, a ministros, jueces y gobernadores regionales.'),
          M('¿Cuántos diputados y senadores tiene el Congreso de Chile?', ['155 diputados y 50 senadores', '120 diputados y 38 senadores', '100 diputados y 100 senadores', '200 diputados y 20 senadores'], 'Desde el fin del sistema binominal (reforma de 2015).'),
          M('Los diputados y los senadores duran en sus cargos, respectivamente:', ['4 y 8 años', '8 y 4 años', '6 y 6 años', '2 y 4 años'], 'El Senado se renueva por parcialidades cada 4 años.'),
          M('La Corte Suprema es:', ['El tribunal superior del Poder Judicial', 'Un organismo del Congreso', 'Un ministerio', 'Un órgano del Poder Ejecutivo'], 'Le siguen las Cortes de Apelaciones y los juzgados.'),
          T('Los jueces son inamovibles: no pueden ser removidos mientras tengan buen comportamiento.', true, 'Esa garantía protege su independencia frente a los otros poderes.'),
        ],
      },
      {
        n: 'Leyes y órganos autónomos', ic: 'doc', items: [
          { t: 'info', ic: 'doc', title: 'Leyes y control del poder', txt: 'Una ley nace por **mensaje** (del Presidente) o **moción** (de parlamentarios), pasa por la **cámara de origen** y la **revisora** (y por una **comisión mixta** si hay diferencias), y se **promulga** y **publica** en el Diario Oficial. Órganos autónomos: **Contraloría**, **Tribunal Constitucional**, **Banco Central**, **Ministerio Público**, **Servel**, **Defensoría Penal Pública** e **INDH**.' },
          M('Un proyecto de ley presentado por el Presidente de la República se llama:', ['Mensaje', 'Moción', 'Decreto', 'Sentencia'], 'Si lo presentan diputados o senadores, se llama moción.'),
          O('Ordena las etapas de formación de una ley', ['Iniciativa: mensaje o moción', 'Discusión y aprobación en la cámara de origen', 'Discusión y aprobación en la cámara revisora', 'Promulgación por el Presidente', 'Publicación en el Diario Oficial'], 'Si las cámaras no coinciden, se forma una comisión mixta.'),
          P('Une cada órgano autónomo con su función', [['Contraloría General de la República', 'Controla la legalidad de los actos de la Administración y el uso de recursos públicos'], ['Tribunal Constitucional', 'Controla que las leyes respeten la Constitución'], ['Banco Central', 'Vela por la estabilidad de la moneda y controla la inflación'], ['Ministerio Público', 'Dirige la investigación de los delitos'], ['Servicio Electoral (Servel)', 'Organiza y supervisa las elecciones']], 'Su autonomía los protege de la presión política.'),
          M('El veto presidencial es:', ['La facultad del Presidente de hacer observaciones a un proyecto de ley aprobado por el Congreso', 'El derecho a disolver el Congreso', 'Una sentencia judicial', 'Un tipo de elección'], 'El Congreso puede insistir con dos tercios de sus miembros.'),
          M('La Defensoría Penal Pública tiene como función:', ['Dar defensa gratuita a las personas imputadas de un delito que no tienen abogado', 'Acusar a los delincuentes', 'Dictar sentencias', 'Organizar las elecciones'], 'Garantiza el derecho a defensa.'),
          M('El Instituto Nacional de Derechos Humanos (INDH) tiene como función:', ['Promover y proteger los derechos humanos de las personas en Chile', 'Juzgar delitos comunes', 'Administrar las cárceles', 'Elegir a los jueces'], 'Es un organismo autónomo creado en 2009.'),
          M('Los gobernadores regionales:', ['Son elegidos por votación popular desde 2021 y encabezan el gobierno regional', 'Son nombrados por el Presidente', 'Son jueces', 'Son elegidos por el Senado'], 'El Presidente nombra, en cambio, a los delegados presidenciales regionales.'),
          M('El alcalde y el concejo municipal:', ['Administran la comuna y son elegidos por votación popular', 'Son nombrados por el Presidente', 'Forman parte del Poder Judicial', 'Dirigen las Fuerzas Armadas'], 'La municipalidad es la institución pública más cercana a las personas.'),
          T('La Contraloría revisa la legalidad de los decretos del Gobierno mediante la "toma de razón".', true, 'Si un decreto es ilegal, puede representarlo, es decir, rechazarlo.'),
          M('El Fiscal Nacional, que encabeza el Ministerio Público, es nombrado por:', ['El Presidente, a partir de una quina de la Corte Suprema y con acuerdo del Senado', 'Votación popular', 'La Cámara de Diputados', 'Las Fuerzas Armadas'], 'En su nombramiento participan los tres poderes.'),
        ],
      },
    ],
  });
})();
