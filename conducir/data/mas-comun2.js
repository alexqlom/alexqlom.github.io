// Lecciones adicionales para riesgos, seguridad, conducción defensiva, emergencias, mecánica, documentos
// y percepción de riesgos, más la unidad de conducción eficiente y electromovilidad.
// Misma convención: en 'mc', 'img', 'fill' y 'video' la primera opción es la correcta.
(function () {
  const RB = window.RB = window.RB || {};
  RB.unit = RB.unit || ((id, u) => { u.id = id; RB.units[id] = u; });
  RB.more = RB.more || ((id, lessons) => { RB.units[id].lessons.push(...lessons); });

  RB.more('rie', [
    {
      n: 'Alcohol: efectos y controles', ic: 'glass', items: [
        { t: 'mc', q: '¿Qué bebida alcohólica afecta menos la conducción?', o: ['Ninguna: todas contienen alcohol y afectan igual', 'La cerveza', 'El vino', 'Los tragos con bebida'] },
        { t: 'tf', q: 'El cuerpo elimina el alcohol a un ritmo fijo: solo el tiempo baja la alcoholemia.', a: true },
        { t: 'mc', q: 'Con alcohol en la sangre, el conductor tiende a:', o: ['Subestimar el riesgo y sobrestimar sus capacidades', 'Ver mejor de noche', 'Reaccionar más rápido', 'Calcular mejor las distancias'] },
        { t: 'mc', q: 'Carabineros puede pedirte una prueba de alcohol:', o: ['En controles preventivos, aunque no hayas cometido una infracción', 'Solo si chocaste', 'Solo de noche', 'Solo con la orden de un juez'] },
        { t: 'tf', q: 'Negarte sin justificación a las pruebas de alcohol tiene sanciones.', a: true },
        { t: 'multi', q: 'Selecciona efectos del alcohol en la conducción', o: ['Visión borrosa o doble', 'Menor capacidad de atención', 'Reacciones más lentas', 'Mejor coordinación', 'Más prudencia'], a: [0, 1, 2] },
        { t: 'sort', q: '¿Cómo lo clasifica la ley?', c: ['Bajo la influencia', 'Estado de ebriedad'], k: [['0,5 g/L', 0], ['1,2 g/L', 1], ['0,4 g/L', 0], ['0,9 g/L', 1], ['0,79 g/L', 0], ['1,5 g/L', 1]] },
        { t: 'num', q: 'Sobre cuántos gramos de alcohol por litro de sangre ya conduces "bajo la influencia del alcohol"', a: 0.3, u: 'g/L', min: 0, max: 1.5, step: 0.1 },
        { t: 'mc', q: 'Después de una noche de mucho alcohol, a la mañana siguiente:', o: ['Puedes seguir con alcohol en la sangre y no estar en condiciones de conducir', 'Ya no queda alcohol si dormiste', 'Basta con tomar café', 'Puedes conducir si te sientes bien'] },
        { t: 'build', q: 'Arma la regla', w: 'Si bebes alcohol no conduzcas', x: ['poco', 'rápido'] },
      ],
    },
    {
      n: 'Drogas y medicamentos', ic: 'flask', items: [
        { t: 'tf', q: 'La marihuana disminuye la atención y aumenta el tiempo de reacción.', a: true },
        { t: 'mc', q: 'Si un medicamento advierte que puede producir somnolencia:', o: ['No conduces mientras te haga efecto o consultas a tu médico', 'Tomas café y conduces', 'Conduces más lento', 'Bajas la ventana'] },
        { t: 'tf', q: 'Mezclar alcohol con medicamentos o drogas puede multiplicar sus efectos.', a: true },
        { t: 'multi', q: 'Selecciona lo que puede afectar tu capacidad de conducir', o: ['Antialérgicos que dan sueño', 'Tranquilizantes', 'Drogas ilícitas', 'Tomar agua', 'Un descanso de 15 minutos'], a: [0, 1, 2] },
        { t: 'mc', q: 'Conducir bajo la influencia de drogas o estupefacientes se sanciona:', o: ['Igual que conducir en estado de ebriedad', 'Solo con una multa leve', 'No tiene sanción si no hay accidente', 'Con una amonestación verbal'] },
        { t: 'tf', q: 'Las bebidas energéticas eliminan los efectos del alcohol.', a: false },
        { t: 'fill', q: 'Completa la frase', s: 'Antes de conducir, revisa si tus ___ pueden producir sueño.', o: ['medicamentos', 'neumáticos', 'documentos'] },
        { t: 'sort', q: '¿Puedes conducir?', c: ['Sí, con normalidad', 'No debo conducir'], k: [['Descansado y sin consumir nada', 0], ['Después de fumar marihuana', 1], ['Con un remedio que da sueño', 1], ['Tras dormir bien y desayunar', 0], ['Después de beber dos cervezas', 1]] },
      ],
    },
    {
      n: 'Velocidad: lo que la ley exige', ic: 'speed', items: [
        { t: 'mc', q: 'La velocidad adecuada es:', o: ['La que permite controlar el vehículo según las condiciones, sin superar el máximo', 'Siempre la máxima permitida', 'La del vehículo de adelante', 'La que marca el GPS'] },
        { t: 'tf', q: 'Aunque no superes el máximo, debes ir más lento si la lluvia, la neblina o el tránsito lo exigen.', a: true, e: 'La regla básica es conducir a una velocidad razonable y prudente según las condiciones existentes.' },
        { t: 'mc', q: 'Exceder la velocidad máxima en más de 20 km/h es una infracción:', o: ['Gravísima', 'Leve', 'Menos grave', 'No es infracción'] },
        { t: 'mc', q: 'Exceder la velocidad máxima entre 11 y 20 km/h es una infracción:', o: ['Grave', 'Gravísima', 'Leve', 'Menos grave'] },
        { t: 'num', q: 'Si duplicas la velocidad, ¿por cuánto se multiplica aproximadamente la distancia de frenado?', a: 4, u: 'veces', min: 1, max: 8, step: 1 },
        { t: 'sort', q: '¿Aumenta o disminuye la distancia para detenerte?', c: ['Aumenta', 'Disminuye'], k: [['Pavimento mojado', 0], ['Neumáticos gastados', 0], ['Ir más lento', 1], ['Ir cansado', 0], ['Mirar el celular', 0], ['Ir descansado y atento', 1]] },
        { t: 'mc', q: 'En una curva, la velocidad se reduce:', o: ['Antes de entrar en la curva', 'En el medio de la curva', 'Al salir de la curva', 'No es necesario reducirla'] },
        { t: 'order', q: 'Ordena de menor a mayor la distancia que necesitas para detenerte', o: ['30 km/h en seco', '50 km/h en seco', '50 km/h con lluvia', '100 km/h con lluvia'] },
        { t: 'multi', q: 'Selecciona las situaciones en que debes reducir la velocidad', o: ['Neblina', 'Zona escolar', 'Calzada con hielo o ripio', 'Autopista despejada de día'], a: [0, 1, 2] },
        { t: 'build', q: 'Arma la regla', w: 'A mayor velocidad mayor distancia de frenado', x: ['menor', 'tiempo'] },
      ],
    },
    {
      n: 'Distracciones y emociones', ic: 'phone', items: [
        { t: 'mc', q: 'Escribir un mensaje mientras conduces es muy peligroso porque:', o: ['Quita la vista, las manos y la mente de la conducción', 'Solo distrae la mente', 'Gasta batería', 'No es peligroso a baja velocidad'] },
        { t: 'tf', q: 'Programar el GPS mientras conduces es seguro si vas a baja velocidad.', a: false },
        { t: 'mc', q: 'Si te sientes enojado o muy estresado al volante:', o: ['Respiras, bajas el ritmo y, si es necesario, te detienes a calmarte', 'Aceleras para llegar antes', 'Respondes a las provocaciones', 'Tocas la bocina'] },
        { t: 'mc', q: 'Otro conductor te provoca con gestos y bocinazos. Lo correcto es:', o: ['No responder y mantener la distancia', 'Responder igual', 'Frenar de golpe delante de él', 'Seguirlo'] },
        { t: 'tf', q: 'Comer, maquillarse o buscar algo en la guantera mientras conduces también son distracciones.', a: true },
        { t: 'multi', q: 'Selecciona las distracciones que te sacan la vista del camino', o: ['Mirar el celular', 'Buscar algo en la guantera', 'Mirar un accidente al pasar', 'Escuchar la radio a bajo volumen'], a: [0, 1, 2] },
        { t: 'mc', q: 'Antes de partir, lo ideal con el celular es:', o: ['Dejarlo en silencio o en modo conducción y fuera de tu alcance', 'Tenerlo en la mano para contestar rápido', 'Ponerlo en las piernas', 'Dejarlo en el asiento para ver los mensajes'] },
        { t: 'fill', q: 'Completa la frase', s: 'Mirar el celular unos segundos es como conducir con los ojos ___.', o: ['cerrados', 'abiertos', 'atentos'] },
        { t: 'build', q: 'Arma la regla', w: 'Toma el celular solo con el vehículo estacionado', x: ['detenido', 'semáforo'] },
      ],
    },
    {
      n: 'Fatiga y estado del conductor', ic: 'moon', items: [
        { t: 'mc', q: 'Contra el sueño al volante, lo único eficaz es:', o: ['Detenerte y dormir o descansar', 'Bajar la ventana', 'Subir el volumen de la música', 'Masticar chicle'] },
        { t: 'tf', q: 'Una siesta corta de 15 a 20 minutos puede ayudarte a recuperar la atención en un viaje largo.', a: true },
        { t: 'mc', q: 'Un conductor con mucha fatiga puede:', o: ['Tener microsueños sin darse cuenta', 'Reaccionar más rápido', 'Ver mejor', 'Conducir igual que descansado'] },
        { t: 'multi', q: 'Selecciona hábitos que ayudan a prevenir la fatiga en un viaje largo', o: ['Dormir bien la noche anterior', 'Hacer pausas periódicas', 'Comer liviano', 'Manejar toda la noche sin parar', 'Tomar alcohol para relajarse'], a: [0, 1, 2] },
        { t: 'tf', q: 'Si tu licencia indica que debes usar lentes, tienes que llevarlos puestos al conducir.', a: true },
        { t: 'tf', q: 'Conducir de noche cansa más la vista que conducir de día.', a: true },
        { t: 'order', q: 'Ordena qué hacer si sientes sueño en la carretera', o: ['Reconocer las señales de sueño', 'Buscar un lugar seguro para detenerte', 'Estacionar fuera de la calzada', 'Dormir o descansar antes de seguir'] },
      ],
    },
  ]);

  RB.more('seg', [
    {
      n: 'Cinturón y apoyacabezas', ic: 'shield', items: [
        { t: 'mc', q: 'En un choque a 50 km/h, una persona sin cinturón:', o: ['Sale proyectada con una fuerza muchas veces mayor a su peso', 'Puede sujetarse con los brazos', 'No sufre daño si va atrás', 'Queda protegida solo por el airbag'] },
        { t: 'tf', q: 'Una embarazada debe usar el cinturón con la banda baja bajo el abdomen, sobre las caderas.', a: true },
        { t: 'mc', q: 'Un cinturón que estuvo en un choque fuerte:', o: ['Debe revisarse y probablemente cambiarse', 'Queda más firme', 'Sigue igual que nuevo', 'Se puede lavar y seguir usando'] },
        { t: 'mc', q: 'El cinturón no debe pasar:', o: ['Por el cuello ni bajo el brazo', 'Por el hombro', 'Por las caderas', 'Sobre el pecho'] },
        { t: 'sort', q: '¿Bien o mal puesto?', c: ['Bien', 'Mal'], k: [['Banda sobre el hombro y el pecho', 0], ['Banda bajo el brazo', 1], ['Banda baja sobre las caderas', 0], ['Cinturón suelto y con holgura', 1], ['Banda por el cuello', 1]] },
        { t: 'tf', q: 'Un apoyacabezas bien ajustado reduce las lesiones de cuello en un choque por alcance.', a: true },
        { t: 'tf', q: 'El airbag puede lesionar a quien va muy cerca del volante o sin cinturón.', a: true },
        { t: 'build', q: 'Arma la regla', w: 'El cinturón se usa en todos los asientos', x: ['delanteros', 'solo'] },
      ],
    },
    {
      n: 'Niños y sillas', ic: 'child', items: [
        { t: 'mc', q: 'Un bebé recién nacido debe viajar en:', o: ['Una silla mirando hacia atrás, en el asiento trasero', 'Los brazos de un adulto', 'Una silla mirando hacia adelante en el asiento delantero', 'Un alzador'] },
        { t: 'mc', q: 'El alzador sirve para:', o: ['Que el cinturón del auto quede bien ubicado sobre el niño', 'Que el niño vea mejor el paisaje', 'Reemplazar el cinturón', 'Que pueda ir adelante'] },
        { t: 'tf', q: 'La silla de un niño se instala según las instrucciones del fabricante y debe quedar firme.', a: true },
        { t: 'tf', q: 'Un niño de 10 años puede viajar en el asiento delantero.', a: false, e: 'Los menores de 12 años deben viajar en el asiento trasero.' },
        { t: 'sort', q: '¿Dónde puede viajar?', c: ['Debe ir atrás', 'Puede ir adelante'], k: [['Niño de 5 años', 0], ['Niña de 11 años', 0], ['Joven de 15 años', 1], ['Bebé en su silla', 0], ['Adulto', 1]] },
        { t: 'mc', q: 'Si un niño se suelta el cinturón durante el viaje:', o: ['Te detienes en un lugar seguro y lo vuelves a asegurar', 'Sigues y le llamas la atención', 'Lo sujetas con una mano mientras conduces', 'Aceleras para llegar antes'] },
        { t: 'tf', q: 'Dejar a un niño o a una mascota dentro de un auto cerrado al sol puede ser mortal en pocos minutos.', a: true },
        { t: 'fill', q: 'Completa la frase', s: 'Los niños usan silla o alzador hasta los ___ años, salvo que ya midan 1,35 m o pesen 33 kg.', o: ['9', '4', '15'] },
      ],
    },
    {
      n: 'Carga, mascotas y pasajeros', ic: 'box', items: [
        { t: 'mc', q: 'Una mascota en el auto debe viajar:', o: ['Sujeta con un arnés o en un transportador seguro', 'Suelta en el asiento delantero', 'En las piernas del conductor', 'Con la cabeza fuera de la ventana'] },
        { t: 'tf', q: 'Puedes llevar a tu perro en las piernas mientras conduces si es pequeño.', a: false },
        { t: 'mc', q: 'Los objetos pesados en el auto deben ir:', o: ['En el maletero, bien asegurados', 'En la bandeja trasera', 'Sueltos en el asiento', 'En el piso del conductor'] },
        { t: 'tf', q: 'Viajar en la parte de carga de una camioneta, sin asiento ni cinturón, es muy peligroso.', a: true },
        { t: 'mc', q: 'La cantidad máxima de pasajeros de un auto es:', o: ['La de asientos con cinturón que tiene el vehículo', 'Los que quepan', 'Siempre cinco', 'El doble de asientos si son niños'] },
        { t: 'multi', q: 'Selecciona lo que debes hacer antes de partir', o: ['Ajustar el asiento y los espejos', 'Abrocharte el cinturón y verificar el de los pasajeros', 'Asegurar la carga suelta', 'Revisar el celular mientras partes'], a: [0, 1, 2] },
        { t: 'tf', q: 'Los pasajeros deben bajar del vehículo por el lado de la acera.', a: true },
      ],
    },
  ]);

  RB.more('def', [
    {
      n: 'Clima adverso', ic: 'rain', items: [
        { t: 'mc', q: 'Con neblina debes usar:', o: ['Luces bajas y, si tienes, neblineros', 'Luces altas', 'Solo luces de estacionamiento', 'Luces de emergencia mientras avanzas'] },
        { t: 'mc', q: 'Si el parabrisas se empaña:', o: ['Usas el desempañador y, si no ves, te detienes en un lugar seguro', 'Lo limpias con la mano mientras conduces', 'Sigues igual', 'Aceleras para llegar antes'] },
        { t: 'tf', q: 'Con hielo o escarcha debes evitar frenadas, aceleraciones y giros bruscos.', a: true },
        { t: 'mc', q: 'En caminos de montaña con nieve, la autoridad puede exigir:', o: ['Cadenas para los neumáticos', 'Neumáticos lisos', 'Un remolque', 'Luces de colores'] },
        { t: 'tf', q: 'Antes de un charco grande conviene reducir la velocidad, para evitar el hidroplaneo y no mojar a los peatones.', a: true },
        { t: 'mc', q: 'Después de pasar por agua profunda conviene:', o: ['Probar suavemente los frenos para secarlos', 'Acelerar a fondo', 'Apagar el motor', 'No hacer nada'] },
        { t: 'sort', q: '¿Qué luces usas?', c: ['Luces bajas', 'Luces altas'], k: [['Ciudad de noche', 0], ['Carretera de noche, sin nadie adelante', 1], ['Neblina', 0], ['Vehículo que viene de frente', 0], ['Camino rural oscuro y vacío', 1]] },
        { t: 'build', q: 'Arma la regla', w: 'Con lluvia aumenta la distancia y reduce la velocidad', x: ['disminuye', 'acelera'] },
      ],
    },
    {
      n: 'Anticipación en la ciudad', ic: 'eye', items: [
        { t: 'mc', q: 'Un auto en un garaje tiene encendidas las luces de retroceso:', o: ['Va a salir de reversa: reduzco y me preparo para detenerme', 'Está apagado', 'Puedo pasar rápido', 'Tengo preferencia y no hago nada'] },
        { t: 'tap', scene: 'h-retroceso', at: 2.8, q: 'Toca el vehículo que está por salir a la calle', a: 'R', ids: ['R', 'p232_0', 'p232_1'], r: 'El auto del garaje: encendió las luces de freno y de retroceso.' },
        { t: 'tap', scene: 'h-puerta', at: 3, q: 'Toca el auto estacionado del que podría abrirse una puerta', a: 'pd', ids: ['pd', 'p232_0', 'p232_1', 'p232_2', 'p232_3', 'p232_4', 'p232_5'], r: 'El que tiene a una persona dentro y las luces de freno encendidas.' },
        { t: 'spot', scene: 'h-pelota', at: 3.2, q: 'Salió una pelota a la calle. Toca el lugar desde donde podría aparecer un niño', z: [620, 212, 80, 54], r: 'El espacio entre los autos estacionados, de donde salió la pelota.' },
        { t: 'spot', scene: 'h-bus', at: 3, q: 'Pasas junto a un bus detenido en el paradero. Toca por dónde podría aparecer un peatón', z: [[708, 194, 46, 66], [596, 194, 46, 66]], r: 'Por delante o por detrás del bus, que tapa la visión.' },
        { t: 'mc', q: 'El auto de adelante lleva rato con el intermitente puesto y no vira:', o: ['Mantengo la distancia porque no sé qué hará', 'Lo adelanto rápido', 'Le toco la bocina', 'Me pego para presionarlo'] },
        { t: 'tf', q: 'Siempre conviene dejar una vía de escape: un espacio libre hacia donde moverte si algo sale mal.', a: true },
        { t: 'mc', q: 'Detenido en un taco detrás de otro auto, deja espacio para:', o: ['Ver sus neumáticos traseros sobre el pavimento', 'Que pase una moto', 'Que se estacione otro', 'Nada: hay que pegarse'] },
      ],
    },
    {
      n: 'La regla de los 3 segundos', ic: 'clock', items: [
        { t: 'mc', q: 'La regla de los 3 segundos sirve para:', o: ['Medir la distancia segura con el vehículo de adelante', 'Saber cuánto esperar en un PARE', 'Medir la luz amarilla', 'Calcular el tiempo de un adelantamiento'] },
        { t: 'order', q: 'Ordena cómo medir la distancia de 3 segundos', o: ['Elegir un punto fijo, como un poste', 'Esperar a que el vehículo de adelante pase por ese punto', 'Contar mil uno, mil dos, mil tres', 'Comprobar que no llegaste al punto antes de terminar'] },
        { t: 'num', q: 'A 90 km/h, ¿cuántos metros recorres aproximadamente en 3 segundos?', a: 75, u: 'm', min: 25, max: 150, step: 5, tol: 5 },
        { t: 'tf', q: 'Con lluvia, de noche o detrás de una moto o un camión conviene dejar más de 3 segundos.', a: true },
        { t: 'tf', q: 'Mirar lejos, unos 12 segundos hacia adelante, te ayuda a anticipar los peligros.', a: true },
        { t: 'video', scene: 'distancia', at: 3, q: 'El vehículo de adelante podría frenar en cualquier momento. ¿Qué distancia mantienes?', o: ['Al menos 3 segundos, más si el camino está mojado', 'Un auto de distancia', 'Lo más cerca posible para que nadie se meta', 'Medio segundo'] },
        { t: 'build', q: 'Arma la regla', w: 'Deja al menos tres segundos con el vehículo de adelante', x: ['metros', 'nunca'] },
      ],
    },
    {
      n: 'Carretera y animales', ic: 'road', items: [
        { t: 'mc', q: 'Antes de adelantar en una carretera de doble sentido, asegúrate de:', o: ['Tener visibilidad suficiente, línea discontinua y la pista contraria libre', 'Ir detrás de otro auto que también adelanta', 'Que el vehículo de adelante vaya lento', 'Tocar la bocina'] },
        { t: 'mc', q: 'Si el conductor de adelante te hace una seña para que lo adelantes:', o: ['Igual compruebas tú mismo que es seguro', 'Adelantas sin mirar', 'Esperas que se detenga', 'Tocas la bocina'] },
        { t: 'tf', q: 'Adelantar en una curva o cerca de la cima de una cuesta está prohibido.', a: true },
        { t: 'mc', q: 'Un vehículo te adelanta y se vuelve a tu pista muy cerca:', o: ['Sueltas el acelerador y recuperas la distancia', 'Aceleras para darle una lección', 'Le haces cambios de luces', 'Te pegas a él'] },
        { t: 'mc', q: 'Si te encandilan las luces de un vehículo que viene de frente:', o: ['Reduces la velocidad y miras hacia el borde derecho de la calzada', 'Le respondes con luces altas', 'Cierras los ojos un momento', 'Aceleras'] },
        { t: 'video', scene: 'h-perro', at: 2.8, q: 'Hay un perro junto a la carretera. ¿Qué haces?', o: ['Reduzco la velocidad y me preparo para frenar', 'Toco la bocina y acelero', 'Sigo igual: el perro se apartará', 'Lo esquivo por la pista contraria sin mirar'] },
        { t: 'video', scene: 'h-giro', at: 2.8, q: 'El auto que viene de frente puso el intermitente izquierdo. ¿Qué haces?', o: ['Suelto el acelerador y me preparo para frenar: puede cruzarse', 'Acelero para pasar antes', 'Toco la bocina y sigo igual', 'Me cambio de pista sin mirar'] },
        { t: 'mc', sign: 'animales', q: 'Ves esta señal en un camino rural. ¿Qué haces?', o: ['Reduzco la velocidad y voy atento a animales en la vía', 'Toco la bocina continuamente', 'Acelero para pasar rápido', 'Enciendo las luces de emergencia'] },
      ],
    },
  ]);

  RB.more('emer', [
    {
      n: 'Primeros auxilios básicos', ic: 'aid', items: [
        { t: 'mc', q: 'Un herido no responde, pero respira:', o: ['No lo mueves salvo peligro, vigilas que siga respirando y llamas al 131', 'Le das agua', 'Lo sientas', 'Lo trasladas en tu auto'] },
        { t: 'tf', q: 'Al llamar al 131 debes seguir las instrucciones del operador y no cortar hasta que te lo indique.', a: true },
        { t: 'mc', q: 'Ante una hemorragia fuerte en un brazo:', o: ['Presionas la herida con un paño limpio y no la sueltas', 'Le das agua', 'Lavas la herida con alcohol', 'Esperas sin hacer nada'] },
        { t: 'tf', q: 'No se le debe dar agua ni comida a un herido grave.', a: true },
        { t: 'mc', q: 'Ante una quemadura:', o: ['Enfrías la zona con agua corriente, sin reventar las ampollas', 'Pones mantequilla o pasta de dientes', 'Revientas las ampollas', 'La cubres con algodón'] },
        { t: 'multi', q: 'Selecciona lo que conviene tener en el botiquín del auto', o: ['Gasas y vendas', 'Guantes desechables', 'Tijeras', 'Medicamentos vencidos'], a: [0, 1, 2] },
        { t: 'tf', q: 'Si no sabes primeros auxilios, lo más útil es proteger el lugar y llamar a emergencias.', a: true },
        { t: 'match', q: 'Une cada número con su servicio', p: [['131', 'Ambulancia (SAMU)'], ['132', 'Bomberos'], ['133', 'Carabineros'], ['134', 'PDI']] },
        { t: 'build', q: 'Arma la regla', w: 'No muevas a un herido salvo peligro inminente', x: ['siempre', 'rápido'] },
      ],
    },
    {
      n: 'Incendio, agua y fallas graves', ic: 'flame', items: [
        { t: 'mc', q: 'Si sale humo del motor:', o: ['Te detienes en un lugar seguro, apagas el motor, bajas a todos y llamas al 132', 'Abres el capó por completo de inmediato', 'Sigues hasta el taller', 'Echas agua al motor encendido'] },
        { t: 'tf', q: 'Un extintor sirve solo si sabes usarlo y tiene su carga vigente.', a: true },
        { t: 'order', q: 'Ordena cómo usar un extintor', o: ['Quitar el seguro', 'Apuntar a la base del fuego', 'Presionar la palanca', 'Mover la boquilla de lado a lado'] },
        { t: 'mc', q: 'Si el acelerador se queda pegado:', o: ['Pones neutro, frenas con firmeza y te detienes en un lugar seguro', 'Apagas el motor en plena curva', 'Saltas del auto', 'Tiras la palanca de cambios sin frenar'] },
        { t: 'mc', q: 'Si tu vehículo cae al agua:', o: ['Te sueltas el cinturón, abres o rompes una ventana y sales de inmediato', 'Esperas a que se llene para abrir la puerta', 'Llamas por teléfono antes de salir', 'Te quedas quieto'] },
        { t: 'tf', q: 'Con un neumático pinchado en la carretera, primero debes salir por completo de la calzada.', a: true },
        { t: 'mc', q: 'Si la dirección se pone muy dura de repente:', o: ['Puede fallar la dirección asistida: reduces y te detienes con cuidado', 'Aceleras', 'Giras con más fuerza a alta velocidad', 'Apagas el motor en marcha'] },
        { t: 'sort', q: '¿Correcto o incorrecto en una panne?', c: ['Correcto', 'Incorrecto'], k: [['Encender las luces de emergencia', 0], ['Esperar dentro del auto sobre la calzada', 1], ['Ponerse el chaleco reflectante', 0], ['Colocar los triángulos', 0], ['Caminar por la calzada de la autopista', 1]] },
      ],
    },
    {
      n: 'Después de un choque', ic: 'doc', items: [
        { t: 'mc', q: 'Tras un choque con solo daños materiales:', o: ['Te detienes, intercambias datos con el otro conductor y das cuenta en Carabineros', 'Te vas sin decir nada', 'Discutes en la calzada', 'Mueves los autos sin señalizar'] },
        { t: 'tf', q: 'Si chocas a un vehículo estacionado y su dueño no está, debes dejar tus datos y dar cuenta a Carabineros.', a: true },
        { t: 'multi', q: 'Selecciona los datos que conviene anotar después de un choque', o: ['Patente del otro vehículo', 'Nombre y RUT del otro conductor', 'Compañía de seguros', 'El color de su ropa'], a: [0, 1, 2] },
        { t: 'tf', q: 'Si hay lesionados, no muevas los vehículos hasta que llegue Carabineros, salvo para auxiliar o evitar otro accidente.', a: true },
        { t: 'mc', q: 'Después de un choque, aunque te sientas bien, conviene:', o: ['Hacerte revisar: algunas lesiones aparecen horas después', 'Seguir manejando todo el día', 'Tomar alcohol para calmarte', 'No contarlo a nadie'] },
        { t: 'order', q: 'Ordena qué hacer tras un choque leve en la ciudad', o: ['Encender las luces de emergencia', 'Revisar si hay heridos', 'Señalizar el lugar', 'Intercambiar datos y dar cuenta del accidente'] },
        { t: 'tf', q: 'Fotografiar la posición de los vehículos y los daños puede ayudar después.', a: true },
      ],
    },
  ]);

  RB.more('mec', [
    {
      n: 'Neumáticos', ic: 'tire', items: [
        { t: 'mc', q: 'La profundidad mínima legal del dibujo de los neumáticos es:', o: ['1,6 mm', '0,5 mm', '5 mm', '10 mm'] },
        { t: 'num', q: 'Profundidad mínima legal del dibujo de un neumático', a: 1.6, u: 'mm', min: 0, max: 5, step: 0.1 },
        { t: 'tf', q: 'Para un buen frenado y agarre se recomienda que el dibujo tenga al menos 3 mm.', a: true },
        { t: 'mc', q: 'Un neumático con poca presión:', o: ['Se desgasta más en los bordes, se calienta y aumenta el consumo', 'Frena mejor', 'Dura más', 'No tiene ningún efecto'] },
        { t: 'mc', q: 'La presión correcta de los neumáticos se encuentra en:', o: ['El manual o la etiqueta del marco de la puerta o de la tapa del combustible', 'El número máximo escrito en el costado del neumático', 'Cualquier servicentro', 'La patente'] },
        { t: 'tf', q: 'Los neumáticos de un mismo eje deben ser del mismo tipo y medida.', a: true },
        { t: 'tf', q: 'Un neumático con un corte o un globo en el costado debe cambiarse.', a: true },
        { t: 'multi', q: 'Selecciona lo que debes revisar en los neumáticos', o: ['Presión', 'Profundidad del dibujo', 'Cortes o deformaciones', 'El color'], a: [0, 1, 2] },
        { t: 'order', q: 'Ordena cómo cambiar una rueda pinchada', o: ['Detenerte en un lugar seguro y señalizar', 'Aflojar un poco las tuercas con la rueda en el suelo', 'Levantar el vehículo con la gata', 'Cambiar la rueda y apretar las tuercas en cruz'] },
      ],
    },
    {
      n: 'Frenos, luces y fluidos', ic: 'wrench', items: [
        { t: 'mc', q: 'Si el pedal de freno se siente esponjoso o se va al fondo:', o: ['Puede haber aire o falta de líquido de frenos: revísalo de inmediato', 'Es normal', 'Debes frenar más fuerte siempre', 'Indica que los frenos son nuevos'] },
        { t: 'mc', q: 'Un chirrido metálico al frenar suele indicar:', o: ['Pastillas de freno gastadas', 'Neumáticos nuevos', 'Exceso de combustible', 'Que el motor está frío'] },
        { t: 'tf', q: 'Las luces de freno, los intermitentes y la luz de retroceso deben funcionar siempre.', a: true },
        { t: 'multi', q: 'Selecciona los líquidos que conviene revisar periódicamente', o: ['Aceite del motor', 'Líquido de frenos', 'Refrigerante', 'Agua del limpiaparabrisas', 'Perfume del auto'], a: [0, 1, 2, 3] },
        { t: 'match', q: 'Une cada luz del tablero con lo que indica', p: [['Aceitera', 'Baja presión de aceite'], ['Batería', 'Falla de carga eléctrica'], ['Termómetro', 'Temperatura del motor'], ['Freno con signo !', 'Freno de mano o falla de frenos']] },
        { t: 'mc', q: 'Si se enciende la luz de presión de aceite mientras conduces:', o: ['Te detienes en un lugar seguro y apagas el motor', 'Sigues hasta llegar a casa', 'Aceleras para que suba la presión', 'Le echas agua al motor'] },
        { t: 'tf', q: 'Las luces deben estar limpias y bien reguladas para no encandilar a los demás.', a: true },
        { t: 'mc', q: 'El refrigerante del motor sirve para:', o: ['Evitar que el motor se sobrecaliente', 'Lubricar los frenos', 'Limpiar el parabrisas', 'Aumentar la potencia'] },
        { t: 'fill', q: 'Completa la frase', s: 'El aceite del motor se revisa con la ___ y el motor apagado.', o: ['varilla', 'gata', 'llave de ruedas'] },
      ],
    },
    {
      n: 'Mantención preventiva', ic: 'gear', items: [
        { t: 'mc', q: 'La mantención preventiva sirve para:', o: ['Detectar fallas antes de que causen un accidente', 'Pasar la revisión técnica sin revisar nada', 'Gastar más dinero', 'Solo para autos nuevos'] },
        { t: 'tf', q: 'Para circular, el vehículo debe tener vigentes la revisión técnica y la verificación de emisiones contaminantes.', a: true },
        { t: 'mc', q: 'Para hacer partir un auto con cables y la batería de otro vehículo:', o: ['Unes positivo con positivo y el negativo a una parte metálica del motor, según el manual', 'Conectas los cables al azar', 'Unes positivo con negativo', 'Lo haces con el motor mojado'] },
        { t: 'tf', q: 'Un escape roto puede hacer que entren gases tóxicos a la cabina.', a: true },
        { t: 'mc', q: 'Si el volante vibra mucho a cierta velocidad, puede ser:', o: ['Ruedas desbalanceadas o mal alineadas', 'El aire acondicionado', 'La radio muy fuerte', 'Un espejo suelto'] },
        { t: 'sort', q: '¿Detenerte ya o revisar pronto?', c: ['Detenerme en cuanto sea seguro', 'Revisar pronto'], k: [['Luz de presión de aceite', 0], ['Luz de temperatura del motor', 0], ['Aviso de mantención programada', 1], ['Luz de combustible en reserva', 1], ['Luz de falla de frenos', 0]] },
        { t: 'multi', q: 'Selecciona revisiones antes de un viaje largo', o: ['Neumáticos y rueda de repuesto', 'Niveles de aceite y refrigerante', 'Luces y frenos', 'La patente del vehículo de adelante'], a: [0, 1, 2] },
        { t: 'build', q: 'Arma la regla', w: 'Revisa los neumáticos y las luces antes de un viaje', x: ['nunca', 'después'] },
      ],
    },
  ]);

  RB.more('doc', [
    {
      n: 'Licencias: más detalles', ic: 'doc', items: [
        { t: 'mc', q: 'La licencia clase B permite conducir vehículos de transporte particular de personas con:', o: ['Hasta nueve asientos, sin contar el del conductor', 'Hasta tres asientos', 'Hasta veinte asientos', 'Cualquier cantidad de asientos'] },
        { t: 'tf', q: 'Con licencia B puedes llevar un remolque liviano si no pesa más que el vehículo que lo tira y el conjunto no supera los 3.500 kg.', a: true },
        { t: 'match', q: 'Une cada licencia con un vehículo', p: [['A1', 'Taxi'], ['A3', 'Bus de transporte público'], ['A5', 'Tracto camión con semirremolque'], ['D', 'Retroexcavadora']] },
        { t: 'mc', q: 'Para conducir un furgón particular de 7 asientos, sin cobrar, basta con licencia:', o: ['B', 'A2', 'A3', 'C'] },
        { t: 'mc', q: 'Para obtener la licencia A3 se debe acreditar, entre otros requisitos:', o: ['Haber tenido licencia A1 o A2 por al menos 2 años, o aprobar un curso especial', 'Tener licencia C', 'Tener 18 años', 'Haber tenido licencia D'] },
        { t: 'mc', q: 'Para obtener la licencia A5 se debe acreditar, entre otros requisitos:', o: ['Haber tenido licencia A4 por al menos 2 años, o aprobar un curso especial', 'Tener licencia B por un mes', 'Tener licencia E', 'Ser mayor de 60 años'] },
        { t: 'sort', q: '¿Qué licencia necesitas?', c: ['Clase B', 'Profesional (clase A)'], k: [['Auto particular de 5 asientos', 0], ['Taxi colectivo', 1], ['Camioneta de 3.000 kg', 0], ['Bus de turismo', 1], ['Camión de 10.000 kg', 1]] },
        { t: 'build', q: 'Arma la regla', w: 'Para cobrar por transportar pasajeros necesitas licencia profesional', x: ['B', 'nunca'] },
      ],
    },
    {
      n: 'Documentos y trámites', ic: 'doc', items: [
        { t: 'mc', q: 'El permiso de circulación se renueva:', o: ['Cada año', 'Cada cinco años', 'Solo al comprar el vehículo', 'Cada diez años'] },
        { t: 'mc', q: 'Para pagar el permiso de circulación necesitas, entre otros:', o: ['El SOAP vigente y la revisión técnica al día', 'Licencia profesional', 'El certificado de nacimiento', 'Un curso de manejo'] },
        { t: 'tf', q: 'El SOAP es obligatorio para todos los vehículos motorizados que circulan.', a: true },
        { t: 'mc', q: 'La revisión técnica verifica:', o: ['El estado de frenos, luces, dirección, neumáticos y emisiones', 'Solo la pintura', 'El valor comercial del auto', 'Las multas pendientes'] },
        { t: 'tf', q: 'Circular sin revisión técnica vigente es una infracción.', a: true },
        { t: 'mc', q: 'Al comprar un auto usado, la transferencia se inscribe en:', o: ['El Registro de Vehículos Motorizados del Registro Civil', 'Carabineros', 'La planta de revisión técnica', 'La notaría, sin otro trámite'] },
        { t: 'mc', q: 'El certificado de anotaciones vigentes de un vehículo muestra:', o: ['Quién es el dueño y si tiene prendas o prohibiciones', 'Las multas de su conductor', 'Su velocidad máxima', 'El color de la licencia'] },
        { t: 'sort', q: '¿Qué cubre el SOAP?', c: ['Lo cubre', 'No lo cubre'], k: [['Gastos médicos de un peatón herido', 0], ['La reparación de tu auto', 1], ['La muerte de un pasajero', 0], ['El robo del vehículo', 1], ['Las multas de tránsito', 1]] },
      ],
    },
    {
      n: 'Multas y Ley No Chat', ic: 'exam', items: [
        { t: 'match', q: 'Une cada tipo de infracción con su multa', p: [['Gravísima', '1,5 a 3 UTM'], ['Grave', '1 a 1,5 UTM'], ['Menos grave', '0,5 a 1 UTM'], ['Leve', '0,2 a 0,5 UTM']] },
        { t: 'mc', q: 'Manipular el celular mientras conduces es una infracción:', o: ['Gravísima', 'Leve', 'Menos grave', 'No es infracción si vas lento'] },
        { t: 'tf', q: 'La Ley No Chat prohíbe manipular el celular también cuando esperas en un semáforo en rojo o en un taco.', a: true },
        { t: 'mc', q: 'Por manipular el celular al conducir, además de la multa, te pueden:', o: ['Suspender la licencia', 'Regalar un soporte', 'Bajar el permiso de circulación', 'Nada más'] },
        { t: 'sort', q: 'Clasifica el exceso de velocidad', c: ['Grave', 'Gravísima'], k: [['15 km/h sobre el límite', 0], ['25 km/h sobre el límite', 1], ['12 km/h sobre el límite', 0], ['40 km/h sobre el límite', 1]] },
        { t: 'tf', q: 'Con multas de tránsito impagas no puedes renovar el permiso de circulación del vehículo.', a: true },
        { t: 'mc', q: 'Las infracciones de tránsito las conoce y sanciona:', o: ['El Juzgado de Policía Local', 'La planta de revisión técnica', 'La compañía de seguros', 'El servicentro'] },
        { t: 'tf', q: 'Adelantar donde está prohibido es una falta sin importancia.', a: false },
        { t: 'build', q: 'Arma la regla', w: 'Manipular el celular al conducir es una infracción gravísima', x: ['leve', 'permitido'] },
      ],
    },
  ]);

  RB.more('haz', [
    {
      n: 'Más peligros en el camino', ic: 'eye', items: [
        { t: 'info', ic: 'eye', title: 'Busca las pistas', txt: 'Las luces de retroceso, un intermitente, un animal junto a la vía o una moto que se acerca rápido anuncian un peligro. Toca apenas los veas.' },
        { t: 'hazard', scene: 'h-moto' },
        { t: 'hazard', scene: 'h-giro' },
        { t: 'hazard', scene: 'h-retroceso' },
        { t: 'hazard', scene: 'h-perro' },
        { t: 'mc', q: 'Antes de cambiarte de pista en una autopista, además del espejo debes:', o: ['Girar la cabeza para revisar el punto ciego', 'Tocar la bocina', 'Frenar', 'Encender las luces altas'] },
        { t: 'tf', q: 'Un vehículo que viene de frente con el intermitente izquierdo puede cruzarse en tu camino.', a: true },
      ],
    },
  ]);

  RB.unit('eco', {
    name: 'Conducción eficiente', desc: 'Ahorra combustible, contamina menos y conoce los vehículos eléctricos.', ic: 'bolt',
    lessons: [
      {
        n: 'Manejo eficiente', ic: 'bolt', items: [
          { t: 'mc', q: 'La conducción eficiente consiste en:', o: ['Conducir con suavidad y anticipación, gastando menos combustible', 'Ir siempre a la máxima velocidad', 'Usar solo la primera marcha', 'Frenar tarde y acelerar fuerte'] },
          { t: 'tf', q: 'Acelerar y frenar bruscamente aumenta el consumo de combustible.', a: true },
          { t: 'mc', q: 'En un motor bencinero, para ahorrar conviene pasar a una marcha más alta alrededor de:', o: ['2.000 a 2.500 rpm', '5.000 a 6.000 rpm', '500 rpm', 'Solo cuando el motor suena fuerte'] },
          { t: 'mc', q: 'En un motor diésel, el cambio a una marcha más alta conviene alrededor de:', o: ['1.500 a 2.000 rpm', '4.000 a 5.000 rpm', '800 rpm', '6.000 rpm'] },
          { t: 'tf', q: 'Anticipar las detenciones y soltar el acelerador con tiempo ahorra combustible y frenos.', a: true },
          { t: 'mc', q: 'A alta velocidad en carretera, el consumo aumenta sobre todo por:', o: ['La resistencia del aire', 'El peso de los pasajeros', 'La radio', 'Las luces'] },
          { t: 'multi', q: 'Selecciona lo que aumenta el consumo de combustible', o: ['Neumáticos con poca presión', 'Un portaequipaje vacío en el techo', 'Peso innecesario en el maletero', 'Conducir con suavidad'], a: [0, 1, 2] },
          { t: 'tf', q: 'Dejar el motor encendido mucho rato con el vehículo detenido gasta combustible y contamina.', a: true },
          { t: 'build', q: 'Arma la regla', w: 'Conduce con suavidad y anticipa las detenciones', x: ['frena', 'fuerte'] },
        ],
      },
      {
        n: 'Consumo y mantención', ic: 'gear', items: [
          { t: 'mc', q: 'El aire acondicionado:', o: ['Aumenta el consumo: úsalo con moderación', 'No cambia el consumo', 'Siempre ahorra combustible', 'Solo funciona en carretera'] },
          { t: 'tf', q: 'A alta velocidad, ir con las ventanas abiertas también aumenta el consumo.', a: true },
          { t: 'tf', q: 'Una mantención al día (aceite, filtros y neumáticos) ayuda a mantener un consumo bajo.', a: true },
          { t: 'mc', q: 'La etiqueta de eficiencia energética de los autos nuevos informa:', o: ['El rendimiento en km por litro y las emisiones de CO₂', 'El precio del seguro', 'La velocidad máxima', 'El número de multas'] },
          { t: 'sort', q: '¿Ahorra o gasta más?', c: ['Ahorra', 'Gasta más'], k: [['Mantener una velocidad constante', 0], ['Acelerar a fondo al partir', 1], ['Usar la marcha más alta posible sin forzar el motor', 0], ['Llevar los neumáticos desinflados', 1], ['Planificar la ruta', 0]] },
          { t: 'tf', q: 'Los motores modernos necesitan calentarse varios minutos detenidos antes de partir.', a: false, e: 'Basta con partir y conducir con suavidad los primeros kilómetros.' },
          { t: 'mc', q: 'Si vas a esperar a alguien con el auto detenido más de un minuto, lo eficiente es:', o: ['Apagar el motor', 'Dejarlo acelerado', 'Dejarlo en marcha con el aire encendido', 'Acelerar de vez en cuando'] },
          { t: 'num', q: 'Si tu auto rinde 12 km por litro, ¿cuántos litros necesitas para recorrer 300 km?', a: 25, u: 'litros', min: 5, max: 60, step: 1 },
        ],
      },
      {
        n: 'Vehículos eléctricos', ic: 'bolt', items: [
          { t: 'mc', q: 'El freno regenerativo de un auto eléctrico:', o: ['Recupera energía al desacelerar y la guarda en la batería', 'Frena solo las ruedas traseras', 'Reemplaza el freno de mano', 'Gasta más batería'] },
          { t: 'tf', q: 'Los autos eléctricos e híbridos pueden ser muy silenciosos a baja velocidad: los peatones podrían no oírlos.', a: true },
          { t: 'mc', q: 'La autonomía de un auto eléctrico es:', o: ['La distancia que puede recorrer con la batería cargada', 'Su velocidad máxima', 'El tiempo que tarda en cargar', 'El peso de la batería'] },
          { t: 'tf', q: 'El frío intenso, la velocidad alta y el uso de la calefacción pueden reducir la autonomía.', a: true },
          { t: 'mc', q: 'Para cargar un auto eléctrico en casa conviene:', o: ['Una instalación eléctrica adecuada, hecha por un instalador autorizado', 'Un alargador doméstico cualquiera', 'Enchufarlo junto a varios aparatos', 'Mojar el cable para que no se caliente'] },
          { t: 'tf', q: 'Un auto eléctrico no emite gases por el escape mientras circula.', a: true },
          { t: 'mc', q: 'Un auto híbrido:', o: ['Combina un motor a combustión con uno eléctrico', 'Funciona solo con electricidad', 'Funciona con leña', 'Es un vehículo de dos ruedas'] },
          { t: 'tf', q: 'Los estacionamientos con cargador son para autos eléctricos que están cargando: no se deben ocupar con otros vehículos.', a: true },
          { t: 'multi', q: 'Selecciona ventajas de conducir de forma eficiente', o: ['Ahorrar dinero', 'Contaminar menos', 'Conducir más seguro y relajado', 'Llegar siempre mucho más rápido'], a: [0, 1, 2] },
        ],
      },
      {
        n: 'Planificar el viaje', ic: 'flag', items: [
          { t: 'tf', q: 'Planificar la ruta evita vueltas innecesarias y ahorra combustible.', a: true },
          { t: 'mc', q: 'Compartir el auto con personas que van al mismo lugar:', o: ['Reduce el número de autos, el consumo y la congestión', 'Está prohibido', 'Aumenta la contaminación', 'No cambia nada'] },
          { t: 'mc', q: 'En un episodio crítico de contaminación en Santiago puede regir:', o: ['Restricción vehicular para algunos vehículos', 'Libre velocidad', 'Prohibición de usar cinturón', 'El cierre de todas las calles'] },
          { t: 'tf', q: 'El transporte público, la bicicleta y caminar son alternativas eficientes para los viajes cortos.', a: true },
          { t: 'build', q: 'Arma la regla', w: 'Planifica tu ruta antes de salir', x: ['durante', 'nunca'] },
        ],
      },
    ],
  });
})();
