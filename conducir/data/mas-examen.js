// Lecciones con temas clásicos del examen teórico: definiciones de la ley, virajes, señales de Carabineros,
// demarcaciones, peatones, responsabilidad legal y seguridad activa y pasiva.
// En 'mc', 'img', 'fill' y 'video' la primera opción es la correcta.
(function () {
  const RB = window.RB = window.RB || {};
  RB.more = RB.more || ((id, lessons) => { RB.units[id].lessons.push(...lessons); });

  RB.more('sen', [
    {
      n: 'Señales en la carretera', ic: 'sign', items: [
        { t: 'mc', sign: 'hombresTrabajando', q: 'Ves esta señal en la carretera. ¿Qué haces?', o: ['Reduzco la velocidad y sigo las indicaciones del personal', 'Acelero para pasar rápido', 'Me detengo en la berma', 'Toco la bocina'] },
        { t: 'mc', q: 'En una faena, un banderero te muestra una paleta PARE:', o: ['Te detienes hasta que te indique avanzar', 'Sigues con cuidado', 'Tocas la bocina', 'Adelantas a los demás'] },
        { t: 'mc', sign: 'resalto', q: 'Al ver esta señal debes:', o: ['Reducir la velocidad antes del resalto', 'Acelerar', 'Frenar encima del resalto', 'Esquivarlo por la berma'] },
        { t: 'tf', sign: 'rotondaAdelante', q: 'Esta señal advierte que más adelante hay una rotonda.', a: true },
        { t: 'img', q: '¿Cuál señal advierte un resalto?', o: ['resalto', 'pendiente', 'resbaladizo', 'derrumbes'] },
        { t: 'sort', q: '¿Qué tipo de señal es?', c: ['Reglamentaria', 'Advertencia', 'Informativa'], k: [['sign:vel90', 0], ['sign:resalto', 1], ['sign:servicentro', 2], ['sign:rotondaAdelante', 1], ['sign:noVirarU', 0], ['sign:hospital', 2]] },
        { t: 'match', q: 'Une cada señal con su significado', p: [['sign:resbaladizo', 'Pavimento resbaladizo'], ['sign:pendiente', 'Pendiente pronunciada'], ['sign:estrechamiento', 'La calzada se angosta'], ['sign:dobleSentido', 'Tránsito en ambos sentidos']] },
        { t: 'mc', sign: 'dobleSentido', q: 'Venías por una calle de un solo sentido y ves esta señal. Significa que:', o: ['Desde ahí habrá vehículos circulando en ambos sentidos', 'Debes virar en U', 'Hay dos pistas para ti', 'Termina la calle'] },
      ],
    },
  ]);

  RB.more('sem', [
    {
      n: 'Señales de Carabineros', ic: 'user', items: [
        { t: 'mc', q: 'Un carabinero dirige el tránsito y lo ves de frente. Debes:', o: ['Detenerte', 'Avanzar', 'Virar a la derecha', 'Tocar la bocina'] },
        { t: 'mc', q: 'Si ves al carabinero de espalda, debes:', o: ['Detenerte', 'Avanzar', 'Retroceder', 'Adelantar'] },
        { t: 'mc', q: 'Si ves al carabinero de costado, puedes:', o: ['Avanzar', 'Virar en U', 'Estacionar', 'Adelantar por la derecha'] },
        { t: 'mc', q: 'Un carabinero levanta el brazo en alto. Eso indica que:', o: ['Va a cambiar la indicación: prepárate', 'Debes acelerar', 'Te está saludando', 'Puedes estacionar'] },
        { t: 'sort', q: '¿Avanzas o te detienes?', c: ['Avanzo', 'Me detengo'], k: [['Carabinero de costado', 0], ['Carabinero de frente', 1], ['Carabinero de espalda', 1], ['Luz verde y ningún carabinero', 0]] },
        { t: 'tf', q: 'Si el semáforo está en verde y un carabinero te ordena detenerte, debes detenerte.', a: true },
        { t: 'match', q: 'Une cada posición del carabinero con su significado', p: [['De frente o de espalda', 'Detenerse'], ['De costado', 'Avanzar'], ['Brazo en alto', 'Prepararse para un cambio']] },
        { t: 'fill', q: 'Completa la frase', s: 'Las indicaciones de Carabineros ___ sobre los semáforos y las señales.', o: ['prevalecen', 'no valen', 'dependen'] },
      ],
    },
    {
      n: 'Soleras y líneas', ic: 'road', items: [
        { t: 'mc', q: 'Una solera pintada de amarillo indica:', o: ['Prohibido estacionar', 'Estacionamiento para motos', 'Zona de carga', 'Paradero de taxis'] },
        { t: 'tf', q: 'Aunque la solera no esté pintada, igual se prohíbe estacionar cerca de grifos y esquinas.', a: true },
        { t: 'mc', q: 'Una línea discontinua entre pistas del mismo sentido indica que:', o: ['Puedes cambiarte de pista con precaución', 'Está prohibido cambiarse', 'Es el borde de la calzada', 'Hay un paso peatonal'] },
        { t: 'mc', q: 'En el centro hay una línea continua junto a una discontinua. Puede adelantar:', o: ['Solo quien tiene la línea discontinua de su lado', 'Cualquiera de los dos', 'Nadie', 'Solo los buses'] },
        { t: 'mc', q: 'Las líneas oblicuas (achurado) pintadas en la calzada indican:', o: ['Una zona por la que no se debe circular ni estacionar', 'Un estacionamiento', 'Una pista para adelantar', 'Una ciclovía'] },
        { t: 'mc', q: 'La línea de detención es:', o: ['La línea transversal antes del cruce, donde debes detenerte', 'La línea del borde de la calzada', 'La línea que separa pistas', 'La línea central'] },
        { t: 'spot', scene: 'ceda', at: .5, q: 'Toca dónde debes esperar si viene alguien por la otra vía', z: [316, 246, 48, 50], r: 'Justo antes de la línea de Ceda el paso.' },
      ],
    },
  ]);

  RB.more('nor', [
    {
      n: 'Definiciones de la ley', ic: 'doc', items: [
        { t: 'match', q: 'Une cada término con su definición', p: [['Calzada', 'Parte de la vía para los vehículos'], ['Acera', 'Parte de la vía para los peatones'], ['Berma', 'Franja junto a la calzada, no destinada al tránsito habitual'], ['Pista', 'Faja para una fila de vehículos']] },
        { t: 'mc', q: 'La berma es:', o: ['La franja contigua a la calzada, que no está destinada al tránsito habitual de vehículos', 'La pista de adelantamiento', 'La vereda', 'El bandejón central'] },
        { t: 'mc', q: 'Una pista es:', o: ['La faja de la calzada para que circule una fila de vehículos', 'Toda la calle', 'La vereda', 'La línea central'] },
        { t: 'mc', q: 'El bandejón es:', o: ['El espacio que separa las calzadas de una vía', 'Una pista exclusiva', 'Una berma pavimentada', 'Un paso peatonal'] },
        { t: 'mc', q: 'Un cruce o intersección es:', o: ['El área donde se unen o se cruzan dos o más vías', 'Un paso peatonal', 'Solo una rotonda', 'Un estacionamiento'] },
        { t: 'mc', q: 'Detenerse es:', o: ['Paralizar el vehículo brevemente, por ejemplo para subir o bajar pasajeros', 'Dejarlo estacionado por horas', 'Apagar el motor e irse', 'Ir lento'] },
        { t: 'mc', q: 'Estacionar es:', o: ['Dejar el vehículo detenido más tiempo del necesario para subir o bajar pasajeros', 'Detenerse en un semáforo', 'Frenar en un taco', 'Bajar a un pasajero rápido'] },
        { t: 'sort', q: '¿Detención o estacionamiento?', c: ['Detención', 'Estacionamiento'], k: [['Dejar a un pasajero en una esquina permitida', 0], ['Dejar el auto una hora para ir al banco', 1], ['Recoger a alguien que ya espera en la acera', 0], ['Dejar el auto toda la noche frente a tu casa', 1]] },
      ],
    },
    {
      n: 'Virajes y señales con el brazo', ic: 'right', items: [
        { t: 'mc', q: 'Para virar a la derecha debes:', o: ['Ubicarte con anticipación en la pista derecha y virar cerca de la solera', 'Virar desde la pista izquierda', 'Abrirte hacia la izquierda antes', 'Virar desde el centro de la calle'] },
        { t: 'mc', q: 'En una calle de doble sentido, para virar a la izquierda debes:', o: ['Acercarte al eje central y entrar a la otra calle a la derecha de su eje', 'Virar desde la pista derecha', 'Cruzar en diagonal por la pista contraria', 'Esperar sobre el paso de cebra'] },
        { t: 'num', q: 'Distancia mínima con la que debes señalizar un viraje', a: 30, u: 'm', min: 5, max: 100, step: 5 },
        { t: 'mc', q: 'Si los intermitentes no funcionan, para virar a la izquierda señalizas:', o: ['Con el brazo izquierdo extendido horizontalmente', 'Con el brazo izquierdo hacia arriba', 'Con el brazo hacia abajo', 'Con la bocina'] },
        { t: 'match', q: 'Une cada señal con su significado', p: [['Brazo izquierdo extendido horizontal', 'Viraje a la izquierda'], ['Brazo izquierdo doblado hacia arriba', 'Viraje a la derecha'], ['Brazo izquierdo hacia abajo', 'Reducir la velocidad o detenerse'], ['Luces de emergencia', 'Vehículo detenido o en peligro']] },
        { t: 'tf', q: 'Las señales con el brazo se hacen por el costado izquierdo del vehículo.', a: true },
        { t: 'tf', q: 'Está prohibido virar en U a menos de 200 metros de una curva, de la cima de una cuesta, de un puente o de un túnel.', a: true },
        { t: 'multi', q: 'Selecciona dónde está prohibido virar en U', o: ['En un paso peatonal', 'Cerca de un cruce ferroviario', 'Donde una señal lo prohíba', 'En una calle amplia y recta, sin señales que lo prohíban'], a: [0, 1, 2] },
        { t: 'img', q: '¿Cuál señal prohíbe virar en U?', o: ['noVirarU', 'noVirarIzq', 'noVirarDer', 'noEntrar'] },
      ],
    },
  ]);

  RB.more('pre', [
    {
      n: 'Más situaciones de preferencia', ic: 'cross', items: [
        { t: 'mc', q: 'Al salir de un estacionamiento a la calle:', o: ['Cedes el paso a los peatones y a los vehículos que circulan', 'Tienes preferencia', 'Tocas la bocina y sales', 'Sales rápido'] },
        { t: 'tf', q: 'Al entrar a una vía desde un camino particular o un garaje, debes ceder el paso.', a: true },
        { t: 'spot', scene: 'rotonda', at: 1.5, q: 'Toca dónde debes ceder el paso antes de entrar a la rotonda', z: [316, 296, 48, 46], r: 'En la entrada, antes de la línea de Ceda el paso.' },
        { t: 'mc', q: 'Para salir de una rotonda debes:', o: ['Señalizar a la derecha y salir por tu pista', 'Frenar en seco', 'Salir desde la pista interior cruzando a los demás', 'Tocar la bocina'] },
        { t: 'tap', scene: 'escolar', at: 9.2, q: 'Toca a todos los peatones que debes dejar cruzar', a: ['c1', 'c2', 'g'], ids: ['c1', 'c2', 'g', 'w'], r: 'Los dos niños y el adulto que cruzan por el paso peatonal.' },
        { t: 'spot', scene: 'giro', at: 1.5, q: 'Quieres virar a la izquierda y viene un auto de frente. Toca dónde debes esperar', z: [312, 180, 50, 50], r: 'Dentro del cruce, cerca del centro, sin bloquear el paso peatonal.' },
        { t: 'build', q: 'Arma la regla', w: 'Al salir de un garaje cede el paso a todos', x: ['nadie', 'rápido'] },
      ],
    },
  ]);

  RB.more('vul', [
    {
      n: 'Peatones en la vía', ic: 'ped', items: [
        { t: 'mc', q: 'En un camino sin acera, los peatones deben caminar:', o: ['Por la berma del lado izquierdo, enfrentando a los vehículos', 'Por el centro de la calzada', 'Por la berma derecha, de espaldas al tránsito', 'Por cualquier lado'] },
        { t: 'tf', q: 'Los peatones no deben cruzar la calzada en diagonal.', a: true },
        { t: 'mc', q: 'De noche, un peatón que camina por la berma de un camino debe:', o: ['Usar ropa clara o reflectante y caminar enfrentando el tránsito', 'Usar ropa oscura', 'Caminar por la calzada', 'Caminar de espaldas al tránsito'] },
        { t: 'mc', q: 'Una persona con bastón blanco cruza la calle:', o: ['Es una persona ciega: le cedes el paso y esperas con paciencia', 'Debe esperar a que pases', 'Le tocas la bocina para avisarle', 'Pasas rápido por detrás'] },
        { t: 'tf', q: 'Los peatones deben respetar los semáforos peatonales y las indicaciones de Carabineros.', a: true },
        { t: 'sort', q: '¿Correcto o incorrecto para un peatón?', c: ['Correcto', 'Incorrecto'], k: [['Cruzar por el paso de cebra', 0], ['Cruzar entre autos estacionados', 1], ['Caminar por la berma izquierda en carretera', 0], ['Quedarse conversando en la calzada', 1], ['Mirar a ambos lados antes de cruzar', 0]] },
        { t: 'video', scene: 'ciclista', at: 2, q: 'Hay un ciclista adelante y viene un auto de frente. ¿Qué haces?', o: ['Espero detrás, a distancia, hasta que pase el auto', 'Adelanto pegado al ciclista', 'Toco la bocina para que se corra', 'Lo adelanto por la derecha'] },
        { t: 'build', q: 'Arma la regla', w: 'En la carretera camina por la izquierda enfrentando el tránsito', x: ['derecha', 'espaldas'] },
      ],
    },
  ]);

  RB.more('rie', [
    {
      n: 'Por qué ocurren los siniestros', ic: 'chart', items: [
        { t: 'mc', q: 'La mayoría de los siniestros de tránsito se deben principalmente a:', o: ['Errores o conductas imprudentes de las personas', 'Fallas mecánicas', 'El clima', 'Los animales'] },
        { t: 'multi', q: 'Selecciona los factores que influyen en un siniestro de tránsito', o: ['Las personas', 'El vehículo', 'La vía y su entorno', 'El color del auto'], a: [0, 1, 2] },
        { t: 'tf', q: 'La velocidad excesiva o inadecuada es una de las principales causas de muertes en el tránsito.', a: true },
        { t: 'mc', q: 'Un siniestro de tránsito se previene sobre todo:', o: ['Respetando las normas y conduciendo con atención', 'Con un auto más caro', 'Con suerte', 'Tocando la bocina'] },
        { t: 'tf', q: 'Peatones, ciclistas y motociclistas son los usuarios más vulnerables de la vía.', a: true },
        { t: 'fill', q: 'Completa la frase', s: 'El factor ___ está presente en la mayoría de los siniestros de tránsito.', o: ['humano', 'climático', 'animal'] },
      ],
    },
  ]);

  RB.more('seg', [
    {
      n: 'Seguridad activa y pasiva', ic: 'shield', items: [
        { t: 'mc', q: 'Los sistemas de seguridad activa sirven para:', o: ['Ayudar a evitar el choque, como los frenos ABS y el control de estabilidad', 'Proteger durante el choque, como el airbag', 'Decorar el auto', 'Ahorrar combustible'] },
        { t: 'mc', q: 'Los sistemas de seguridad pasiva sirven para:', o: ['Reducir las lesiones durante el choque, como el cinturón y el airbag', 'Evitar el choque', 'Mejorar la radio', 'Aumentar la velocidad'] },
        { t: 'sort', q: '¿Seguridad activa o pasiva?', c: ['Activa', 'Pasiva'], k: [['Frenos ABS', 0], ['Cinturón de seguridad', 1], ['Control de estabilidad', 0], ['Airbag', 1], ['Apoyacabezas', 1], ['Neumáticos en buen estado', 0]] },
        { t: 'tf', q: 'El control de estabilidad ayuda a evitar derrapes en curvas y maniobras bruscas.', a: true },
        { t: 'mc', q: 'Una carrocería con zonas de deformación programada:', o: ['Absorbe energía en un choque para proteger a los ocupantes', 'Hace más lento el auto', 'Es solo estética', 'Es un defecto de fábrica'] },
        { t: 'tf', q: 'El ABS te permite seguir girando el volante mientras frenas fuerte.', a: true },
        { t: 'build', q: 'Arma la regla', w: 'El airbag complementa al cinturón pero no lo reemplaza', x: ['siempre', 'solo'] },
      ],
    },
  ]);

  RB.more('def', [
    {
      n: 'Ver y ser visto', ic: 'eye', items: [
        { t: 'mc', q: 'Las luces del vehículo deben encenderse:', o: ['Desde media hora después de la puesta del sol hasta media hora antes de su salida, y cuando el clima lo requiera', 'Solo a medianoche', 'Solo en carretera', 'Cuando el conductor quiera'] },
        { t: 'mc', q: 'Las luces de emergencia se usan:', o: ['Cuando el vehículo está detenido por una emergencia o representa un peligro', 'Para estacionar en doble fila', 'Para dar las gracias', 'Para avanzar con neblina'] },
        { t: 'mc', q: 'Si debes detenerte de noche en un camino sin iluminación:', o: ['Sales de la calzada y enciendes las luces de emergencia', 'Apagas todas las luces', 'Dejas las luces altas encendidas', 'Te detienes en la curva'] },
        { t: 'tf', q: 'Los vidrios y espejos limpios mejoran la visibilidad, sobre todo de noche y con lluvia.', a: true },
        { t: 'sort', q: '¿Te hace más o menos visible?', c: ['Más visible', 'Menos visible'], k: [['Luces encendidas de día en carretera', 0], ['Vidrios sucios', 1], ['Señalizar con anticipación', 0], ['Ir en el punto ciego de un camión', 1]] },
      ],
    },
  ]);

  RB.more('emer', [
    {
      n: 'Señalizar una emergencia', ic: 'siren', items: [
        { t: 'tf', q: 'Los triángulos se ponen uno delante y otro detrás del vehículo, visibles para los demás conductores.', a: true },
        { t: 'mc', q: 'En una vía de un solo sentido, basta con poner:', o: ['Un triángulo detrás del vehículo', 'Ningún triángulo', 'Tres triángulos adelante', 'Un triángulo sobre el techo'] },
        { t: 'mc', q: 'Si tu vehículo queda detenido justo después de una curva:', o: ['Pones el triángulo antes de la curva, para avisar a tiempo a quienes vienen', 'Lo pones junto al auto', 'No lo pones', 'Lo pones en la pista contraria'] },
        { t: 'tf', q: 'En la carretera, el chaleco reflectante se pone antes de bajarte del auto.', a: true },
      ],
    },
  ]);

  RB.more('mec', [
    {
      n: 'Partes del vehículo', ic: 'car', items: [
        { t: 'match', q: 'Une cada sistema con su función', p: [['Embrague', 'Conectar y desconectar el motor de la caja'], ['Caja de cambios', 'Elegir entre más fuerza o más velocidad'], ['Suspensión', 'Absorber las irregularidades del camino'], ['Dirección', 'Orientar las ruedas']] },
        { t: 'mc', q: 'El freno de mano sirve principalmente para:', o: ['Mantener el vehículo inmóvil al estacionar', 'Frenar en las curvas', 'Frenar a alta velocidad', 'Acelerar'] },
        { t: 'tf', q: 'Al estacionar en bajada junto a la solera, se giran las ruedas delanteras hacia la solera.', a: true },
        { t: 'mc', q: 'Al estacionar en subida junto a la solera, las ruedas delanteras se giran:', o: ['Hacia el centro de la calzada, para que la rueda se apoye en la solera si el auto retrocede', 'Hacia la solera', 'Rectas', 'Da lo mismo'] },
        { t: 'mc', q: 'Si se enciende el testigo de la batería mientras conduces:', o: ['El sistema no está cargando la batería', 'La batería está llena', 'Debes acelerar', 'Falta agua en el limpiaparabrisas'] },
        { t: 'order', q: 'Ordena cómo estacionar en una pendiente', o: ['Detener el vehículo junto a la solera', 'Girar las ruedas según la pendiente', 'Aplicar el freno de mano', 'Dejar un cambio puesto y apagar el motor'] },
      ],
    },
  ]);

  RB.more('doc', [
    {
      n: 'Responsabilidad legal', ic: 'doc', items: [
        { t: 'mc', q: 'Por los daños que causa un vehículo, por regla general responden solidariamente:', o: ['El conductor, el propietario y el tenedor del vehículo', 'Solo el conductor', 'Solo la aseguradora', 'Nadie'] },
        { t: 'tf', q: 'El propietario puede liberarse de esa responsabilidad si prueba que el vehículo se usó contra su voluntad.', a: true },
        { t: 'tf', q: 'Si prestas tu auto a alguien sin licencia y causa un accidente, también puedes responder por los daños.', a: true },
        { t: 'mc', q: 'Conducir sin licencia:', o: ['Es una infracción, y el vehículo puede ser retirado de circulación', 'Es legal si sabes manejar', 'Solo se sanciona de noche', 'Está permitido en caminos rurales'] },
        { t: 'mc', q: 'Si conduces con la licencia suspendida:', o: ['Recibes sanciones más severas', 'No pasa nada', 'Solo pagas una multa leve', 'Puedes hacerlo de noche'] },
        { t: 'tf', q: 'Las licencias y las infracciones quedan anotadas en el Registro Nacional de Conductores.', a: true },
        { t: 'mc', q: 'El Registro Nacional de Conductores está a cargo de:', o: ['El Registro Civil', 'Cada municipalidad por su cuenta', 'Las compañías de seguros', 'Los servicentros'] },
        { t: 'build', q: 'Arma la regla', w: 'El conductor el propietario y el tenedor responden solidariamente', x: ['nunca', 'solo'] },
      ],
    },
  ]);
})();
