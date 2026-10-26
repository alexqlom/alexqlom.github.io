// Historia (8): Formación ciudadana II (Constitución, derechos y participación); Economía I (escasez, mercado, oferta y demanda).
(function () {
  const RB = window.RB, { M, T, P, S, O, X } = RB.Q;

  // ---------- Derechos, ciudadanía y participación ----------
  RB.unit('h15', {
    name: 'Derechos, ciudadanía y participación', desc: 'La Constitución y los procesos constituyentes, los derechos humanos y sus garantías, nacionalidad, ciudadanía, voto y participación.', ic: 'vote', area: 'Formación ciudadana',
    lessons: [
      {
        n: 'La Constitución', ic: 'scroll', items: [
          { t: 'info', ic: 'scroll', title: 'Ley fundamental', txt: 'La **Constitución** organiza el Estado, reconoce **derechos y deberes** y limita el poder; ninguna ley puede contradecirla (**supremacía constitucional**). Chile tuvo las Constituciones de **1833**, **1925** y **1980** (reformada en 1989, 2005 y otras). Tras el **estallido social** (2019) hubo dos procesos constituyentes, y ambas propuestas fueron **rechazadas** (2022 y 2023).' },
          M('La Constitución Política de un país:', ['Es la ley fundamental: organiza el Estado, establece derechos y deberes y limita el poder', 'Es una ley igual a cualquier otra', 'Solo regula las elecciones', 'Es un tratado internacional'], 'Ninguna ley puede contradecirla: es el principio de supremacía constitucional.'),
          O('Ordena las constituciones de Chile', ['Constitución de 1833', 'Constitución de 1925', 'Constitución de 1980'], 'La de 1980 sigue vigente, con muchas reformas.'),
          M('El "estallido social" de octubre de 2019 fue:', ['Una ola de protestas masivas por la desigualdad y el costo de la vida, que llevó a un acuerdo para cambiar la Constitución', 'Un golpe de Estado', 'Un terremoto', 'Una guerra con un país vecino'], 'Comenzó con evasiones masivas en el Metro de Santiago por el alza del pasaje.'),
          M('En el plebiscito de entrada de octubre de 2020, la ciudadanía:', ['Aprobó redactar una nueva Constitución mediante una convención elegida', 'Rechazó cambiar la Constitución', 'Eligió al Presidente', 'Aprobó la Constitución de 1980'], 'La opción Apruebo obtuvo cerca del 78 %.'),
          M('La Convención Constitucional (2021–2022) fue inédita porque:', ['Tuvo paridad de género y escaños reservados para pueblos indígenas', 'Estuvo formada solo por militares', 'Fue designada por el Presidente', 'No tuvo representantes electos'], 'Fue la primera asamblea constituyente paritaria del mundo.'),
          M('En el plebiscito de septiembre de 2022, la propuesta de la Convención:', ['Fue rechazada', 'Fue aprobada', 'No se votó', 'Fue anulada'], 'El Rechazo obtuvo cerca del 62 %.'),
          M('En diciembre de 2023, la propuesta del Consejo Constitucional:', ['También fue rechazada en un plebiscito', 'Fue aprobada', 'Nunca se votó', 'Fue aprobada por el Congreso sin plebiscito'], 'Por eso sigue vigente la Constitución de 1980, con sus reformas.'),
          M('Para reformar la Constitución chilena se requiere:', ['La aprobación del Congreso con un quórum especial', 'Solo la firma del Presidente', 'Una decisión de la Corte Suprema', 'Un decreto municipal'], 'Actualmente se exigen cuatro séptimos de los diputados y senadores en ejercicio.'),
          T('Una ley que contradiga la Constitución puede ser declarada inconstitucional por el Tribunal Constitucional.', true, 'Así se protege la supremacía constitucional.'),
        ],
      },
      {
        n: 'Derechos humanos y garantías', ic: 'scale', items: [
          { t: 'info', ic: 'scale', title: 'Derechos humanos', txt: 'Son **universales**, **inalienables**, **irrenunciables**, **imprescriptibles** e **indivisibles**. Se agrupan en **civiles y políticos** (vida, libertad, voto), **económicos, sociales y culturales** (educación, salud, trabajo) y **de solidaridad** (paz, medio ambiente sano). Se protegen con la **Declaración Universal** (1948), el **Pacto de San José** y acciones como los recursos de **protección** y **amparo**.' },
          M('Que los derechos humanos sean universales significa que:', ['Pertenecen a todas las personas, sin distinción alguna', 'Solo los tienen los ciudadanos', 'Varían según el país', 'Se pueden vender'], 'Además son inalienables: nadie puede quitarlos ni transferirlos.'),
          S('Clasifica cada derecho', ['Civiles y políticos', 'Económicos, sociales y culturales'], [['Derecho a la vida', 0], ['Libertad de expresión', 0], ['Derecho a votar', 0], ['Derecho a la educación', 1], ['Derecho a la salud', 1], ['Derecho al trabajo', 1]], 'Existe también una tercera generación, como el derecho a un medio ambiente sano.'),
          M('La Declaración Universal de los Derechos Humanos (1948) fue una respuesta a:', ['Las atrocidades de la Segunda Guerra Mundial, como el Holocausto', 'La Revolución Francesa', 'La Guerra Fría', 'La crisis de 1929'], 'Es la base del sistema internacional de derechos humanos.'),
          M('El recurso de protección permite:', ['Pedir a una Corte de Apelaciones que proteja un derecho constitucional amenazado o vulnerado', 'Elegir al Presidente', 'Acusar constitucionalmente a un ministro', 'Reformar la Constitución'], 'Es una acción rápida para restablecer el derecho.'),
          M('El recurso de amparo (habeas corpus) protege:', ['La libertad personal y la seguridad individual frente a detenciones ilegales', 'El derecho de propiedad', 'El derecho a la educación', 'La libertad de prensa'], 'Puede presentarlo cualquier persona en favor del afectado.'),
          M('La Convención Americana sobre Derechos Humanos, o Pacto de San José (1969):', ['Creó un sistema interamericano de protección, con una Comisión y una Corte Interamericana', 'Creó la ONU', 'Es la Declaración de 1789', 'Es un tratado de comercio'], 'Chile la ratificó en 1990.'),
          M('Los derechos de tercera generación, o de solidaridad, incluyen:', ['El derecho a la paz y a vivir en un medio ambiente sano', 'El derecho a votar', 'La libertad de expresión', 'El derecho de propiedad'], 'Requieren la cooperación entre los Estados.'),
          T('Los derechos humanos son imprescriptibles: no se pierden con el paso del tiempo.', true, 'Por eso los crímenes de lesa humanidad no prescriben.'),
          M('La Convención sobre los Derechos del Niño (1989) reconoce que niños, niñas y adolescentes:', ['Son sujetos de derechos, con protección especial por su etapa de desarrollo', 'No tienen derechos hasta los 18 años', 'Pertenecen a sus padres, sin derechos propios', 'Solo tienen deberes'], 'En Chile existe la Defensoría de la Niñez desde 2018.'),
          M('Que los derechos humanos sean irrenunciables significa que:', ['Una persona no puede renunciar a ellos, aunque quiera', 'Solo se pueden ejercer una vez', 'Dependen de la voluntad del Estado', 'Se pierden al cometer un delito'], 'Por ejemplo, nadie puede aceptar válidamente ser esclavizado.'),
        ],
      },
      {
        n: 'Nacionalidad, ciudadanía y participación', ic: 'vote', items: [
          { t: 'info', ic: 'vote', title: 'Ser ciudadano', txt: 'La **nacionalidad** chilena se adquiere por **nacer en Chile** (ius solis), por ser **hijo de padre o madre chilenos** (ius sanguinis), por **carta de nacionalización** o por **gracia**. Son **ciudadanos** los chilenos de **18 años** o más no condenados a pena aflictiva: pueden **votar** y **ser elegidos**. Desde 2023 el **voto es obligatorio**, con inscripción automática. Los **extranjeros** con más de **5 años** de residencia pueden votar.' },
          M('¿Qué requisitos tiene la ciudadanía en Chile?', ['Ser chileno, tener 18 años cumplidos y no haber sido condenado a pena aflictiva', 'Tener 21 años y propiedades', 'Haber nacido en Santiago', 'Tener un título profesional'], 'La ciudadanía otorga el derecho a votar y a ser elegido.'),
          M('Una persona nacida en el extranjero, hija de madre chilena, es chilena por:', ['Ius sanguinis (derecho de sangre)', 'Ius solis (derecho de suelo)', 'Carta de nacionalización', 'Nacionalidad por gracia'], 'El ius solis se aplica a quienes nacen en territorio chileno.'),
          M('Una persona extranjera puede obtener la nacionalidad chilena mediante:', ['Carta de nacionalización, cumpliendo requisitos como años de residencia', 'Un viaje turístico', 'La compra de una propiedad', 'El matrimonio, de forma automática'], 'También existe la nacionalidad por gracia, otorgada por ley.'),
          M('Los extranjeros pueden votar en Chile si:', ['Tienen más de 5 años de residencia y cumplen los demás requisitos', 'Visitan Chile como turistas', 'Tienen doble nacionalidad', 'Nunca, bajo ninguna condición'], 'Chile es uno de los pocos países que permiten votar a extranjeros residentes.'),
          M('En Chile, desde 2023, el voto es:', ['Obligatorio, con inscripción automática', 'Voluntario, con inscripción voluntaria', 'Solo para mayores de 21 años', 'Solo para quienes pagan impuestos'], 'Entre 2012 y 2022, el voto fue voluntario.'),
          X('¿Cuáles son formas de participación ciudadana? Marca todas.', ['Votar en elecciones y plebiscitos', 'Participar en una junta de vecinos o un centro de estudiantes', 'Hacer voluntariado en una organización social', 'Evadir el pago de impuestos'], [0, 1, 2], 'También militar en partidos, firmar peticiones y participar en cabildos.'),
          M('Los partidos políticos cumplen la función de:', ['Agrupar a personas con ideas comunes para participar en elecciones y en el gobierno', 'Administrar justicia', 'Recaudar impuestos', 'Dirigir las Fuerzas Armadas'], 'Son fundamentales para la representación en democracia.'),
          P('Une cada deber ciudadano con su descripción', [['Respetar la Constitución y las leyes', 'Base del Estado de derecho'], ['Votar', 'Obligatorio en las elecciones'], ['Pagar impuestos', 'Financiar los servicios públicos'], ['Servicio militar', 'Cuando lo requiera la ley']], 'Los derechos van acompañados de deberes.'),
          M('La Ley de Transparencia (2008) establece que:', ['Toda persona puede pedir información pública a los órganos del Estado', 'La información del Estado es secreta', 'Solo los periodistas pueden pedir información', 'Las empresas privadas deben publicar sus cuentas'], 'La supervisa el Consejo para la Transparencia.'),
          M('La Ley del Lobby (2014) busca:', ['Transparentar las reuniones de autoridades con quienes buscan influir en sus decisiones', 'Prohibir las reuniones de autoridades', 'Financiar a los partidos', 'Elegir a los alcaldes'], 'Las audiencias quedan registradas en un sitio público.'),
          T('Informarse con fuentes confiables y distintas es parte de una participación ciudadana responsable.', true, 'La desinformación (noticias falsas) puede distorsionar el debate democrático.'),
        ],
      },
    ],
  });

  // ---------- Economía I ----------
  RB.unit('h16', {
    name: 'Economía: escasez y mercado', desc: 'Escasez y costo de oportunidad, factores productivos, agentes y sectores, oferta, demanda y equilibrio, estructuras de mercado y colusión.', ic: 'coin', area: 'Economía',
    lessons: [
      {
        n: 'El problema económico', ic: 'coin', items: [
          { t: 'info', ic: 'coin', title: 'Escasez', txt: 'La economía estudia cómo las sociedades usan **recursos escasos** para satisfacer **necesidades ilimitadas**. La escasez obliga a elegir, y toda elección tiene un **costo de oportunidad**: el valor de la mejor alternativa a la que se renuncia. **Factores productivos**: tierra, trabajo, capital y capacidad empresarial.' },
          M('El problema económico fundamental es:', ['La escasez: los recursos son limitados y las necesidades, ilimitadas', 'El exceso de recursos', 'La falta de necesidades', 'La existencia del dinero'], 'Por eso las personas, las empresas y los países deben elegir.'),
          M('Ana tiene una tarde libre: puede trabajar y ganar $20.000 o ir al cine. Si va al cine, su costo de oportunidad es:', ['Los $20.000 que deja de ganar', 'Solo el precio de la entrada', 'Nada, porque es tiempo libre', 'El costo del transporte'], 'Es el valor de la mejor alternativa a la que renuncia.'),
          P('Une cada factor productivo con su retribución', [['Tierra (recursos naturales)', 'Renta'], ['Trabajo', 'Salario'], ['Capital', 'Interés'], ['Capacidad empresarial', 'Utilidad o ganancia']], 'Los factores se combinan para producir bienes y servicios.'),
          M('Un bien de capital es:', ['Un bien que se usa para producir otros bienes, como una máquina', 'Un bien que se consume directamente, como una manzana', 'El dinero ahorrado en un banco', 'Un servicio gratuito'], 'Una retroexcavadora o un horno industrial son bienes de capital.'),
          S('Clasifica cada actividad según el sector económico', ['Primario', 'Secundario', 'Terciario'], [['Minería del cobre', 0], ['Pesca', 0], ['Fabricación de muebles', 1], ['Industria de alimentos', 1], ['Comercio', 2], ['Educación y salud', 2]], 'Primario: extraer; secundario: transformar; terciario: prestar servicios.'),
          M('Las tres preguntas básicas que toda economía debe responder son:', ['Qué producir, cómo producir y para quién producir', 'Cuándo, dónde y por qué votar', 'Quién gobierna, cuánto dura y cómo se elige', 'Qué importar, qué exportar y qué prohibir'], 'Cada sistema económico las responde de manera distinta.'),
          M('En una economía de mercado, las decisiones de qué y cuánto producir las toman principalmente:', ['Las empresas y los consumidores, guiados por los precios', 'Un organismo central de planificación', 'Las Fuerzas Armadas', 'La Iglesia'], 'En una economía centralmente planificada las toma el Estado. Hoy la mayoría de los países tiene economías mixtas.'),
          P('Une cada agente económico con su rol principal', [['Familias', 'Ofrecen trabajo y consumen bienes'], ['Empresas', 'Producen bienes y servicios'], ['Estado', 'Regula, cobra impuestos y provee bienes públicos'], ['Sector externo', 'Comercia con otros países']], 'Se relacionan en el flujo circular de la economía.'),
          T('El aire es un bien libre: existe en abundancia y no tiene precio.', true, 'Los bienes económicos, en cambio, son escasos y tienen precio.'),
          M('El té y el café son bienes:', ['Sustitutos, porque uno puede reemplazar al otro', 'Complementarios, porque se usan juntos', 'De capital', 'Libres'], 'Un auto y la bencina, en cambio, son complementarios.'),
        ],
      },
      {
        n: 'Oferta, demanda y precio', ic: 'chart', items: [
          { t: 'info', ic: 'chart', title: 'El mercado', txt: '**Ley de la demanda**: si el precio **sube**, la cantidad demandada **baja**. **Ley de la oferta**: si el precio **sube**, la cantidad ofrecida **sube**. El **precio de equilibrio** iguala la cantidad ofrecida y la demandada. Con **exceso de demanda** (escasez) el precio tiende a subir; con **exceso de oferta** (excedente), a bajar.' },
          M('Según la ley de la demanda, si el precio de un bien sube (y todo lo demás se mantiene):', ['La cantidad demandada disminuye', 'La cantidad demandada aumenta', 'La cantidad ofrecida disminuye', 'Nada cambia'], 'Por eso la curva de demanda tiene pendiente negativa.'),
          M('Según la ley de la oferta, si el precio de un bien sube:', ['Los productores ofrecen una mayor cantidad', 'Los productores ofrecen menos', 'Los consumidores compran más', 'Desaparece el mercado'], 'Producir se vuelve más rentable.'),
          M('El precio de equilibrio es aquel en que:', ['La cantidad ofrecida es igual a la cantidad demandada', 'El precio es el más bajo posible', 'Solo hay oferentes', 'El Estado fija el precio'], 'En el equilibrio no hay excedente ni escasez.'),
          M('Si el precio de un bien está por debajo del equilibrio, se produce:', ['Un exceso de demanda (escasez), que presiona el precio al alza', 'Un exceso de oferta', 'Un equilibrio perfecto', 'La desaparición de la demanda'], 'Muchos quieren comprar y hay poco producto.'),
          M('Si el precio de las paltas está por sobre el equilibrio, se produce:', ['Un excedente de paltas, que presiona el precio a la baja', 'Escasez de paltas', 'Un aumento de la demanda', 'Un equilibrio'], 'Los vendedores bajan los precios para vender lo que les sobra.'),
          M('Si una helada destruye gran parte de la cosecha de naranjas, lo esperable es que:', ['Disminuya la oferta y suba el precio', 'Aumente la oferta y baje el precio', 'Aumente la demanda y baje el precio', 'No cambie el precio'], 'La curva de oferta se desplaza hacia la izquierda.'),
          M('Si aumenta el ingreso de las personas, la demanda de la mayoría de los bienes:', ['Aumenta', 'Disminuye', 'No cambia', 'Desaparece'], 'Con más ingresos se compra más de los bienes normales.'),
          M('Si sube mucho el precio del café, ¿qué se espera que ocurra con la demanda de té?', ['Que aumente', 'Que disminuya', 'Que no cambie', 'Que desaparezca'], 'Muchos consumidores reemplazan el café por té, su sustituto.'),
          X('¿Qué factores pueden desplazar la demanda de un bien? Marca todos.', ['El ingreso de los consumidores', 'Los gustos y preferencias', 'El precio de bienes sustitutos o complementarios', 'El costo de las materias primas del productor'], [0, 1, 2], 'El costo de las materias primas afecta a la oferta, no a la demanda.'),
          M('Una mejora tecnológica que abarata la producción de celulares provoca:', ['Un aumento de la oferta y una baja del precio', 'Una baja de la oferta', 'Un alza del precio', 'Una caída de la demanda'], 'La curva de oferta se desplaza hacia la derecha.'),
          T('Si el Estado fija un precio máximo por debajo del equilibrio, puede producirse escasez.', true, 'A ese precio, la cantidad demandada supera a la ofrecida.'),
        ],
      },
      {
        n: 'Estructuras de mercado y comercio', ic: 'scale', items: [
          { t: 'info', ic: 'scale', title: 'Competencia', txt: '**Competencia perfecta**: muchos oferentes y demandantes. **Monopolio**: un solo oferente. **Oligopolio**: pocos oferentes. **Monopsonio**: un solo comprador. La **colusión** es un acuerdo ilegal entre competidores para fijar precios; la investiga la **Fiscalía Nacional Económica** (FNE) y la sanciona el **Tribunal de Defensa de la Libre Competencia** (TDLC).' },
          P('Une cada estructura de mercado con su característica', [['Competencia perfecta', 'Muchos oferentes y demandantes'], ['Monopolio', 'Un solo oferente'], ['Oligopolio', 'Pocos oferentes'], ['Monopsonio', 'Un solo comprador']], 'Mientras menos competencia, más poder sobre el precio.'),
          M('La colusión es:', ['Un acuerdo ilegal entre empresas competidoras para fijar precios o repartirse el mercado', 'Una fusión legal de empresas', 'Un tipo de impuesto', 'Una oferta de temporada'], 'En Chile hubo casos conocidos con farmacias, pollos y papel tissue.'),
          M('En Chile, la colusión es investigada por:', ['La Fiscalía Nacional Económica (FNE)', 'El Servel', 'La Contraloría', 'El Banco Central'], 'La sanciona el Tribunal de Defensa de la Libre Competencia. Desde 2016 también es delito, con cárcel.'),
          M('Una consecuencia de un monopolio para los consumidores suele ser:', ['Precios más altos y menos opciones', 'Precios más bajos', 'Más variedad de productos', 'Más competencia'], 'Por eso se regulan los monopolios naturales, como la distribución de agua o electricidad.'),
          M('La competencia entre empresas beneficia a los consumidores porque:', ['Presiona a bajar los precios y a mejorar la calidad', 'Sube siempre los precios', 'Elimina la variedad', 'Impide la innovación'], 'Por eso el Estado protege la libre competencia.'),
          T('En un oligopolio existe mayor riesgo de colusión.', true, 'Con pocos actores es más fácil coordinarse ilegalmente.'),
          M('La división del trabajo y la especialización permiten:', ['Aumentar la productividad, porque cada trabajador se dedica a una tarea', 'Producir menos', 'Eliminar el comercio', 'Que cada persona produzca todo lo que consume'], 'Adam Smith lo ejemplificó con una fábrica de alfileres.'),
          M('Chile exporta cobre e importa automóviles porque:', ['Se especializa en lo que produce con más ventaja relativa y compra lo demás', 'No sabe fabricar nada', 'Lo prohíbe la ley', 'No tiene minerales'], 'Es la idea de la ventaja comparativa.'),
          M('La productividad se refiere a:', ['La cantidad producida por unidad de recurso usado, por ejemplo por hora de trabajo', 'El total de impuestos', 'La cantidad de dinero', 'El número de empresas'], 'Más productividad permite mejores salarios y crecimiento.'),
        ],
      },
    ],
  });
})();
