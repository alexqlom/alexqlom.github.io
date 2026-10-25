// Lecciones adicionales para las unidades específicas de cada licencia (motos, profesionales, maquinaria,
// tracción animal y conducción institucional). En 'mc', 'img', 'fill' y 'video' la primera opción es la correcta.
(function () {
  const RB = window.RB = window.RB || {};
  RB.more = RB.more || ((id, lessons) => { RB.units[id].lessons.push(...lessons); });

  // ---------- Motos (clase C) ----------
  RB.more('motoA', [
    {
      n: 'Equipo y visibilidad', ic: 'shield', items: [
        { t: 'mc', q: 'El casco que más protege para andar en moto es:', o: ['El integral, que cubre también la mandíbula', 'Un casco de bicicleta', 'Una gorra gruesa', 'El casco abierto sin visera'] },
        { t: 'tf', q: 'El casco debe ir siempre abrochado: sin la correa puede salir volando en una caída.', a: true },
        { t: 'multi', q: 'Selecciona prendas que protegen al motociclista', o: ['Chaqueta con protecciones', 'Guantes', 'Botas que cubran el tobillo', 'Sandalias', 'Pantalón corto'], a: [0, 1, 2] },
        { t: 'mc', q: 'De noche, para que te vean mejor en moto conviene:', o: ['Usar ropa clara o reflectante y tener las luces en buen estado', 'Ir sin luces para no encandilar', 'Usar ropa negra', 'Ir pegado a los autos'] },
        { t: 'tf', q: 'Los guantes protegen las manos, que suelen ser lo primero que toca el suelo en una caída.', a: true },
        { t: 'mc', q: 'Con lluvia, la visera del casco:', o: ['Debe ir limpia y, si es posible, con tratamiento antiempañante', 'Conviene llevarla levantada siempre', 'Da lo mismo si está rayada', 'Se limpia con la mano en marcha'] },
        { t: 'sort', q: '¿Protege o no protege?', c: ['Protege', 'No protege'], k: [['Casco certificado y abrochado', 0], ['Chaqueta con protecciones', 0], ['Polera de algodón', 1], ['Guantes de moto', 0], ['Zapatillas de lona', 1]] },
        { t: 'build', q: 'Arma la regla', w: 'El casco se usa siempre y bien abrochado', x: ['nunca', 'suelto'] },
      ],
    },
    {
      n: 'Revisión de la moto', ic: 'wrench', items: [
        { t: 'mc', q: 'La tensión de la cadena se revisa:', o: ['Según el manual, con la moto detenida y apagada', 'En marcha, con la mano', 'Nunca', 'Solo cuando se corta'] },
        { t: 'tf', q: 'Con poca presión en los neumáticos, la moto cuesta más al girar y frena peor.', a: true },
        { t: 'match', q: 'Une cada parte con lo que debes revisar', p: [['Neumáticos', 'Presión y desgaste'], ['Frenos', 'Que respondan bien'], ['Luces', 'Que todas enciendan'], ['Cadena', 'Tensión y lubricación']] },
        { t: 'tf', q: 'Los espejos de la moto se ajustan antes de partir.', a: true },
        { t: 'mc', q: 'Si la moto pierde aceite o líquido de frenos:', o: ['No la usas hasta repararla', 'Sigues con cuidado', 'Le pones agua', 'Lo ignoras si es poco'] },
        { t: 'order', q: 'Ordena cómo partir en moto', o: ['Revisar espejos y luces', 'Encender el motor', 'Mirar atrás y señalizar', 'Incorporarte con suavidad cuando haya espacio'] },
        { t: 'tf', q: 'La bocina y los intermitentes de la moto deben funcionar siempre.', a: true },
      ],
    },
  ]);

  RB.more('motoB', [
    {
      n: 'Frenado de emergencia y adherencia', ic: 'stop', items: [
        { t: 'mc', q: 'Para frenar fuerte en una recta con una moto sin ABS:', o: ['Aplicas ambos frenos de forma progresiva, sin bloquear las ruedas', 'Usas solo el freno trasero', 'Bloqueas la rueda delantera', 'Sueltas el manubrio'] },
        { t: 'tf', q: 'Al frenar fuerte, el peso se carga hacia la rueda delantera.', a: true },
        { t: 'mc', q: 'Si la rueda trasera se bloquea en una frenada en línea recta:', o: ['Mantienes el freno trasero apretado hasta detenerte, con la moto recta', 'Sueltas el freno trasero de golpe', 'Giras el manubrio', 'Aceleras'] },
        { t: 'tf', q: 'La arena, el aceite y las hojas mojadas reducen mucho la adherencia de la moto.', a: true },
        { t: 'mc', q: 'Para pasar sobre un obstáculo inevitable, como un resalto o un hoyo:', o: ['Reduces antes, enderezas la moto y te levantas un poco del asiento', 'Frenas fuerte justo encima', 'Inclinas la moto', 'Aceleras a fondo'] },
        { t: 'sort', q: '¿Más o menos adherencia?', c: ['Más adherencia', 'Menos adherencia'], k: [['Asfalto seco y limpio', 0], ['Pintura mojada', 1], ['Tapa de alcantarilla', 1], ['Ripio suelto', 1], ['Neumáticos en buen estado', 0]] },
        { t: 'num', q: 'En una frenada fuerte en moto, ¿qué porcentaje aproximado del frenado aporta el freno delantero?', a: 70, u: '%', min: 10, max: 100, step: 10, tol: 10 },
        { t: 'build', q: 'Arma la regla', w: 'Frena con la moto recta antes de la curva', x: ['dentro', 'inclinada'] },
      ],
    },
    {
      n: 'Curvas y mirada', ic: 'eye', items: [
        { t: 'video', scene: 'moto-curva', at: 1.5, q: 'Te acercas a la curva. ¿Qué haces?', o: ['Freno antes de entrar, con la moto recta', 'Freno fuerte dentro de la curva', 'Acelero para pasar rápido', 'Miro la rueda delantera'] },
        { t: 'tf', q: 'Mirar fijamente un obstáculo hace que la moto tienda a ir hacia él.', a: true },
        { t: 'mc', q: 'Para girar a baja velocidad, como al estacionar, conviene:', o: ['Mirar hacia donde quieres ir y dosificar con suavidad embrague y freno trasero', 'Frenar fuerte con el delantero y el manubrio girado', 'Ir rápido para no caer', 'Mirar el suelo'] },
        { t: 'mc', q: 'Si entras muy rápido a una curva:', o: ['Miras hacia la salida, mantienes la trayectoria y evitas frenar de golpe', 'Frenas a fondo con la moto inclinada', 'Sueltas el manubrio', 'Cierras los ojos'] },
        { t: 'tf', q: 'En una curva, el acelerador suave y constante ayuda a mantener estable la moto.', a: true },
        { t: 'fill', q: 'Completa la frase', s: 'En una curva, la mirada va hacia la ___ de la curva.', o: ['salida', 'rueda', 'berma'] },
      ],
    },
  ]);

  RB.more('motoC', [
    {
      n: 'Tránsito urbano en moto', ic: 'moto', items: [
        { t: 'tf', q: 'Circular entre filas de autos es peligroso: los conductores no esperan que pases por ahí.', a: true },
        { t: 'mc', q: 'En un taco, detrás de un auto, lo más seguro es quedarte:', o: ['A una distancia que te permita ver sus espejos y tener una salida', 'Pegado a su parachoques', 'Entre dos autos', 'En la vereda'] },
        { t: 'mc', q: 'Un auto estacionado tiene a alguien adentro:', o: ['Te alejas de su puerta y reduces la velocidad', 'Pasas pegado', 'Tocas la bocina sin parar', 'Aceleras'] },
        { t: 'hazard', scene: 'h-giro' },
        { t: 'mc', q: 'Un auto viene de frente y quiere virar a la izquierda:', o: ['Asumes que podría no verte y te preparas para frenar', 'Aceleras para pasar antes', 'Tocas la bocina y sigues', 'Te cambias a su pista'] },
        { t: 'tf', q: 'Llevar las luces encendidas de día ayuda a que los demás vean la moto.', a: true },
        { t: 'multi', q: 'Selecciona situaciones de riesgo para un motociclista', o: ['Un auto que vira a la izquierda delante', 'Puertas de autos estacionados', 'Pavimento mojado con pintura', 'Una recta seca y despejada'], a: [0, 1, 2] },
        { t: 'build', q: 'Arma la regla', w: 'En moto supón que los demás no te ven', x: ['acelera', 'rápido'] },
      ],
    },
    {
      n: 'Pasajero, carga y viajes', ic: 'user', items: [
        { t: 'mc', q: 'Antes de llevar a un pasajero, explícale que:', o: ['Se sujete, acompañe la inclinación en las curvas y no se mueva bruscamente', 'Puede ir sentado de lado', 'Puede ir sin casco si es cerca', 'Debe apoyar los pies en el suelo'] },
        { t: 'mc', q: 'La carga en una moto debe ir:', o: ['Bien sujeta, baja y centrada, sin superar lo que indica el fabricante', 'Colgando del manubrio', 'En la espalda del pasajero', 'Sobre el estanque sin amarrar'] },
        { t: 'tf', q: 'Un bolso colgando del manubrio puede afectar la dirección de la moto.', a: true },
        { t: 'mc', q: 'En un viaje largo en moto conviene:', o: ['Detenerte cada cierto tiempo a descansar e hidratarte', 'Manejar sin parar para llegar antes', 'Ir más rápido de noche', 'Ir sin guantes para no transpirar'] },
        { t: 'sort', q: '¿Correcto o incorrecto?', c: ['Correcto', 'Incorrecto'], k: [['Pasajero con casco y pies en los posapiés', 0], ['Carga bien amarrada en la parrilla', 0], ['Pasajero sentado de lado', 1], ['Bolso colgando del manubrio', 1]] },
        { t: 'fill', q: 'Completa la frase', s: 'El pasajero de la moto apoya los pies en los ___.', o: ['posapiés', 'neumáticos', 'espejos'] },
      ],
    },
    {
      n: 'Normas para motos', ic: 'doc', items: [
        { t: 'mc', q: 'En zona urbana, la velocidad máxima para una moto es:', o: ['50 km/h', '60 km/h', '80 km/h', '40 km/h'] },
        { t: 'tf', q: 'Las motos deben respetar las mismas señales y semáforos que los demás vehículos.', a: true },
        { t: 'tf', q: 'Con licencia clase C puedes conducir un auto.', a: false },
        { t: 'mc', q: 'Para estacionar una moto:', o: ['Usas lugares permitidos, sin ocupar la vereda ni estorbar a los peatones', 'La dejas en la vereda', 'La dejas en el paso de cebra', 'La dejas en doble fila'] },
        { t: 'tf', q: 'Una moto no puede llevar más pasajeros de los que permite su asiento.', a: true },
        { t: 'multi', q: 'Selecciona lo que se exige para andar en moto', o: ['Casco del conductor y del pasajero', 'Luz delantera encendida', 'Licencia clase C', 'Música a todo volumen'], a: [0, 1, 2] },
      ],
    },
  ]);

  // ---------- Profesionales: pasajeros y carga (A1 a A5) ----------
  RB.more('profA', [
    {
      n: 'Requisitos y licencias A', ic: 'doc', items: [
        { t: 'tf', q: 'Para obtener la licencia A3 debes haber tenido licencia A1 o A2 por al menos dos años, o aprobar un curso especial con simulador.', a: true },
        { t: 'tf', q: 'Para obtener la licencia A5 debes haber tenido licencia A4 por al menos dos años, o aprobar un curso especial con simulador.', a: true },
        { t: 'mc', q: 'Un conductor de transporte escolar debe tener licencia:', o: ['A3, o una A1 antigua', 'B', 'C', 'D'] },
        { t: 'sort', q: '¿Cuál es la licencia mínima que necesitas?', c: ['A1', 'A2', 'A3'], k: [['Taxi', 0], ['Furgón de 15 asientos', 1], ['Bus de 45 asientos', 2], ['Transporte escolar remunerado', 2]] },
        { t: 'multi', q: 'Selecciona requisitos para obtener una licencia profesional por primera vez', o: ['Tener al menos 20 años', 'Haber tenido licencia B por al menos 2 años', 'Aprobar el curso de una Escuela de Conductores Profesionales', 'Tener un vehículo propio'], a: [0, 1, 2] },
        { t: 'tf', q: 'La licencia profesional se controla periódicamente, con exámenes médicos y psicotécnicos.', a: true },
        { t: 'mc', q: 'Si un conductor profesional tiene un problema de salud que afecta su conducción:', o: ['Debe dejar de conducir y consultar a un médico', 'Puede seguir si nadie se entera', 'Toma un analgésico y sigue', 'Maneja solo de noche'] },
        { t: 'build', q: 'Arma la regla', w: 'El conductor profesional responde por la seguridad de sus pasajeros', x: ['nunca', 'solo'] },
      ],
    },
  ]);

  RB.more('pas', [
    {
      n: 'Pasajeros seguros', ic: 'bus', items: [
        { t: 'tf', q: 'En los buses interurbanos, los pasajeros deben usar el cinturón de seguridad.', a: true },
        { t: 'mc', q: 'Antes de partir en un bus interurbano, el conductor o el auxiliar debe:', o: ['Recordar a los pasajeros que usen el cinturón', 'Apagar las luces', 'Cerrar con llave las salidas de emergencia', 'Pedir que se paren en el pasillo'] },
        { t: 'tf', q: 'Las salidas y ventanas de emergencia nunca deben bloquearse con equipaje.', a: true },
        { t: 'mc', q: 'Sube al bus un pasajero con movilidad reducida:', o: ['Esperas a que esté sentado o bien sujeto antes de partir', 'Partes de inmediato', 'Le pides que se apure', 'Lo dejas en la puerta'] },
        { t: 'tf', q: 'Está prohibido llevar pasajeros en las pisaderas o con las puertas abiertas.', a: true },
        { t: 'mc', q: 'Un pasajero se siente mal durante el viaje:', o: ['Te detienes en un lugar seguro y pides ayuda al 131 si es necesario', 'Sigues hasta el terminal', 'Le abres la puerta en marcha', 'Aceleras'] },
        { t: 'multi', q: 'Selecciona conductas correctas del conductor de bus', o: ['Frenar y acelerar con suavidad', 'Detenerse solo en paraderos autorizados', 'Abrir las puertas con el bus detenido', 'Hablar por celular mientras conduce'], a: [0, 1, 2] },
        { t: 'sort', q: '¿Correcto o incorrecto?', c: ['Correcto', 'Incorrecto'], k: [['Partir con las puertas cerradas', 0], ['Dejar pasajeros en una esquina sin paradero', 1], ['Mirar los espejos antes de cerrar la puerta', 0], ['Llevar pasajeros en la pisadera', 1]] },
        { t: 'build', q: 'Arma la regla', w: 'Abre las puertas solo con el bus detenido', x: ['marcha', 'siempre'] },
      ],
    },
    {
      n: 'Transporte escolar y taxis', ic: 'taxi', items: [
        { t: 'mc', q: 'El transporte escolar remunerado debe estar inscrito en:', o: ['El Registro Nacional de Servicios de Transporte Remunerado de Escolares', 'La junta de vecinos', 'Solo el colegio', 'Ningún registro'] },
        { t: 'tf', q: 'El conductor de transporte escolar debe llevar en el vehículo el certificado de inscripción en el registro.', a: true },
        { t: 'mc', q: 'Si un furgón escolar lleva más de cinco niños en edad preescolar:', o: ['Debe ir un adulto acompañante que ayude a los niños', 'Pueden ir dos por asiento', 'El conductor debe ir más rápido', 'No necesita nada especial'] },
        { t: 'mc', q: 'Un vehículo de transporte escolar se identifica por:', o: ['Un letrero que dice ESCOLARES', 'Luces de colores', 'Una bandera', 'Una sirena'] },
        { t: 'tf', q: 'Un furgón escolar puede llevar más niños que asientos si son pequeños.', a: false },
        { t: 'mc', q: 'Al recoger a un niño en su casa, el conductor de transporte escolar debe:', o: ['Detenerse en un lugar seguro y esperar que suba y se ponga el cinturón', 'Tocar la bocina y partir', 'Esperar en doble fila', 'Pedirle que cruce la calle solo'] },
        { t: 'order', q: 'Ordena cómo dejar a un escolar en su destino', o: ['Detenerte junto a la acera, en un lugar permitido', 'Encender las luces de emergencia', 'Ayudar a que baje por el lado de la acera', 'Esperar a que entre o quede con un adulto antes de partir'] },
        { t: 'mc', q: 'Un taxista debe tomar y dejar pasajeros:', o: ['Donde esté permitido detenerse, junto a la acera', 'En doble fila', 'En la mitad de un cruce', 'Sobre el paso de cebra'] },
        { t: 'tf', q: 'En un taxi, los pasajeros también deben usar el cinturón de seguridad.', a: true },
      ],
    },
  ]);

  RB.more('pesado', [
    {
      n: 'Maniobras con vehículos largos', ic: 'truck', items: [
        { t: 'mc', q: 'Al virar a la izquierda con un bus o camión largo:', o: ['Avanzas hasta el centro del cruce y giras más abierto, vigilando la parte trasera', 'Giras cerrado desde el primer momento', 'Giras invadiendo la pista contraria', 'Retrocedes antes de girar'] },
        { t: 'tf', q: 'Al retroceder con un camión conviene que alguien te guíe desde afuera, ubicado donde lo veas.', a: true },
        { t: 'mc', q: 'Antes de retroceder con un vehículo grande:', o: ['Bajas a mirar si es necesario, usas la alarma de retroceso y vas muy despacio', 'Retrocedes rápido para terminar luego', 'Confías solo en los espejos sin mirar', 'Tocas la bocina y retrocedes'] },
        { t: 'tf', q: 'Un vehículo grande necesita más espacio para incorporarse a una vía y para adelantar.', a: true },
        { t: 'mc', q: 'En un camino angosto con un vehículo grande, si viene otro de frente:', o: ['Reduces, te orillas a la derecha y, si es necesario, te detienes', 'Mantienes tu posición en el centro', 'Aceleras', 'Tocas la bocina para que se salga'] },
        { t: 'order', q: 'Ordena cómo virar a la derecha con un camión largo', o: ['Señalizar con anticipación', 'Revisar los espejos, sobre todo el derecho', 'Avanzar más antes de girar', 'Girar vigilando que la rueda trasera no suba a la vereda'] },
        { t: 'tf', q: 'Los ciclistas y motociclistas pueden quedar ocultos en las zonas ciegas de un camión.', a: true },
        { t: 'build', q: 'Arma la regla', w: 'Antes de virar revisa siempre el espejo derecho', x: ['nunca', 'izquierda'] },
      ],
    },
    {
      n: 'Frenos y estabilidad', ic: 'stop', items: [
        { t: 'mc', q: 'Los frenos sobrecalentados en una bajada larga:', o: ['Pierden eficacia y pueden fallar', 'Frenan mejor', 'Reducen el consumo', 'Dan más agarre a los neumáticos'] },
        { t: 'tf', q: 'Para bajar una pendiente conviene usar la misma marcha que usarías para subirla.', a: true },
        { t: 'mc', q: 'Si un vehículo pesado empieza a volcarse en una curva, la causa más probable es:', o: ['Ir demasiado rápido para su altura y su carga', 'Llevar los espejos sucios', 'Usar luces bajas', 'Tener el estanque lleno'] },
        { t: 'tf', q: 'Un vehículo pesado vacío frena y se comporta distinto que cargado.', a: true },
        { t: 'mc', q: 'En una subida larga con un camión cargado:', o: ['Usas una marcha baja con anticipación y vigilas la temperatura del motor', 'Aceleras a fondo en una marcha alta', 'Pones neutro', 'Adelantas en la cima'] },
        { t: 'sort', q: '¿Aumenta el riesgo de volcar?', c: ['Aumenta', 'No aumenta'], k: [['Curva tomada rápido', 0], ['Carga alta y mal distribuida', 0], ['Velocidad moderada', 1], ['Viento lateral fuerte', 0], ['Carga baja y centrada', 1]] },
        { t: 'num', q: 'Un camión a 90 km/h recorre en 1 segundo aproximadamente', a: 25, u: 'm', min: 5, max: 60, step: 1, tol: 1 },
      ],
    },
  ]);

  RB.more('jor', [
    {
      n: 'Jornada en la carga interurbana', ic: 'clock', items: [
        { t: 'mc', q: 'La jornada ordinaria de los choferes de carga terrestre interurbana es de:', o: ['180 horas mensuales', '300 horas mensuales', '40 horas mensuales', 'Sin límite'] },
        { t: 'mc', q: 'Esas 180 horas mensuales se distribuyen en no menos de:', o: ['21 días', '5 días', '10 días', '30 días'] },
        { t: 'tf', q: 'Los choferes de carga interurbana deben tener un descanso ininterrumpido de al menos 8 horas dentro de cada 24 horas.', a: true },
        { t: 'num', q: 'Descanso mínimo ininterrumpido, dentro de cada 24 horas, de un chofer de carga interurbana', a: 8, u: 'horas', min: 2, max: 12, step: 1 },
        { t: 'tf', q: 'Los tiempos de descanso a bordo o en tierra no se cuentan como jornada.', a: true },
        { t: 'mc', q: 'Un chofer de bus interurbano, después de 5 horas continuas al volante, debe descansar al menos:', o: ['2 horas', '10 minutos', '30 minutos', '8 horas'] },
        { t: 'build', q: 'Arma la regla', w: 'Después de cinco horas continuas el chofer debe descansar', x: ['acelerar', 'nunca'] },
      ],
    },
    {
      n: 'Salud del conductor profesional', ic: 'heart', items: [
        { t: 'mc', q: 'Para cuidar la espalda en jornadas largas conviene:', o: ['Ajustar bien el asiento y hacer pausas para estirarse', 'Manejar encorvado', 'Ir con el asiento muy reclinado', 'No moverse en todo el día'] },
        { t: 'tf', q: 'La apnea del sueño puede causar somnolencia peligrosa al conducir: conviene tratarla.', a: true },
        { t: 'multi', q: 'Selecciona hábitos saludables para un conductor profesional', o: ['Dormir lo suficiente', 'Hidratarse', 'Comer liviano y a sus horas', 'Usar estimulantes para no dormir'], a: [0, 1, 2] },
        { t: 'mc', q: 'El estrés al conducir:', o: ['Reduce la atención y aumenta el riesgo de accidentes', 'Mejora los reflejos', 'No influye', 'Solo afecta a los pasajeros'] },
        { t: 'tf', q: 'Los exámenes médicos periódicos ayudan a detectar problemas de vista, oído o salud que afectan la conducción.', a: true },
        { t: 'sort', q: '¿Ayuda o perjudica?', c: ['Ayuda', 'Perjudica'], k: [['Dormir 7 a 8 horas', 0], ['Comida muy abundante antes de manejar', 1], ['Pausas para estirarse', 0], ['Manejar con sueño para cumplir el horario', 1], ['Tomar agua', 0]] },
        { t: 'fill', q: 'Completa la frase', s: 'El cronotacógrafo registra la velocidad y los tiempos de ___.', o: ['conducción', 'comida', 'carga'] },
      ],
    },
  ]);

  RB.more('carga', [
    {
      n: 'Pesos y dimensiones', ic: 'box', items: [
        { t: 'tf', q: 'La carga no debe tapar las luces, la patente ni la visibilidad del conductor.', a: true },
        { t: 'mc', q: 'La tara de un vehículo es:', o: ['El peso del vehículo vacío', 'El peso de la carga', 'El peso máximo por eje', 'El peso del conductor'] },
        { t: 'mc', q: 'La carga útil es:', o: ['El peso máximo de carga que puede llevar el vehículo', 'El peso del vehículo vacío', 'El combustible del estanque', 'El peso de los neumáticos'] },
        { t: 'num', q: 'Un camión tiene una tara de 6.000 kg y un peso bruto vehicular de 16.000 kg. ¿Cuántos kilos de carga puede llevar?', a: 10000, u: 'kg', min: 2000, max: 20000, step: 1000 },
        { t: 'tf', q: 'Con la carga alta, el centro de gravedad sube y aumenta el riesgo de volcar.', a: true },
        { t: 'mc', q: 'La carga que sobresale por atrás debe señalizarse:', o: ['Con elementos bien visibles, como una banderola de día y una luz o reflectante de noche', 'No es necesario', 'Solo con la bocina', 'Con la radio encendida'] },
        { t: 'build', q: 'Arma la regla', w: 'La carga debe ir amarrada y bien distribuida', x: ['suelta', 'arriba'] },
      ],
    },
    {
      n: 'Estiba y amarras', ic: 'box', items: [
        { t: 'mc', q: 'Antes de amarrar la carga, revisa que las cinchas o cadenas:', o: ['Estén en buen estado y sean adecuadas para el peso', 'Sean de colores', 'Estén mojadas', 'Sean nuevas aunque no resistan el peso'] },
        { t: 'tf', q: 'Los esquineros protegen la carga y las cinchas de los bordes filosos.', a: true },
        { t: 'sort', q: '¿Bien o mal estibado?', c: ['Bien', 'Mal'], k: [['Lo pesado abajo y centrado', 0], ['Lo pesado arriba', 1], ['Carga repartida entre los ejes', 0], ['Espacios vacíos que dejan moverse la carga', 1], ['Amarras tensas y revisadas', 0]] },
        { t: 'mc', q: 'Si transportas áridos u otro material que puede volarse:', o: ['Lo cubres con una lona bien sujeta', 'Lo llevas descubierto', 'Lo mojas y no lo cubres', 'Vas más rápido'] },
        { t: 'tf', q: 'Después de un frenazo fuerte conviene revisar la carga en cuanto sea seguro.', a: true },
        { t: 'order', q: 'Ordena el proceso de carga', o: ['Revisar el vehículo y su capacidad', 'Distribuir la carga, lo pesado abajo', 'Amarrar y proteger los bordes', 'Revisar las amarras durante el viaje'] },
        { t: 'fill', q: 'Completa la frase', s: 'La carga más pesada va abajo y ___.', o: ['centrada', 'atrás', 'arriba'] },
      ],
    },
  ]);

  RB.more('art', [
    {
      n: 'Enganche y conducción', ic: 'truck', items: [
        { t: 'order', q: 'Ordena cómo enganchar un semirremolque', o: ['Alinear el tracto frente al semirremolque', 'Retroceder despacio hasta que la quinta rueda enganche', 'Comprobar el enganche tirando suavemente hacia adelante', 'Conectar las mangueras de aire y el cable eléctrico, y subir las patas de apoyo'] },
        { t: 'tf', q: 'Las patas de apoyo del semirremolque deben subirse por completo antes de partir.', a: true },
        { t: 'mc', q: 'Para evitar el efecto tijera en una bajada mojada:', o: ['Reduces la velocidad antes y frenas con suavidad, en línea recta', 'Frenas fuerte en la curva', 'Pones neutro', 'Aceleras'] },
        { t: 'tf', q: 'Al virar, el semirremolque recorre una trayectoria más cerrada que el tracto.', a: true },
        { t: 'mc', q: 'Un tracto camión sin semirremolque, al frenar fuerte:', o: ['Puede bloquear las ruedas con más facilidad: frena con cuidado', 'Siempre frena mejor', 'Se comporta igual', 'No necesita frenos'] },
        { t: 'tf', q: 'Antes de un viaje se revisan las luces del semirremolque y que las conexiones no tengan fugas de aire.', a: true },
        { t: 'sort', q: '¿Aumenta o disminuye el riesgo de efecto tijera?', c: ['Aumenta', 'Disminuye'], k: [['Frenar fuerte en una curva', 0], ['Pavimento mojado', 0], ['Velocidad moderada', 1], ['Semirremolque vacío', 0], ['Frenar en línea recta y con suavidad', 1]] },
        { t: 'build', q: 'Arma la regla', w: 'Revisa que la quinta rueda quede bien enganchada', x: ['suelta', 'nunca'] },
      ],
    },
  ]);

  RB.more('peligrosas', [
    {
      n: 'Rotulación y emergencias', ic: 'flame', items: [
        { t: 'mc', q: 'El número de la ONU en el panel naranja de un camión identifica:', o: ['La sustancia peligrosa que transporta', 'La patente del camión', 'El número de ejes', 'El teléfono del dueño'] },
        { t: 'mc', q: 'El rombo de colores de un camión con sustancias peligrosas indica:', o: ['La clase de peligro, por ejemplo inflamable o tóxico', 'La marca del camión', 'El destino', 'La velocidad máxima'] },
        { t: 'tf', q: 'Ante una fuga o un derrame, debes alejarte hacia donde el viento no te traiga los vapores y avisar a Bomberos al 132.', a: true },
        { t: 'mc', q: 'Un vehículo que transporta sustancias peligrosas debe llevar:', o: ['Rótulos, documentos de la carga y equipos para emergencias', 'Solo la patente', 'Luces de colores', 'Una bandera'] },
        { t: 'tf', q: 'Quien conduce cargas peligrosas debe estar capacitado para actuar en emergencias con esa carga.', a: true },
        { t: 'multi', q: 'Selecciona conductas correctas con carga inflamable', o: ['No fumar', 'Estacionar lejos de fuentes de calor', 'Evitar zonas muy pobladas cuando sea posible', 'Cargar combustible con el motor encendido'], a: [0, 1, 2] },
        { t: 'match', q: 'Une cada clase de peligro con un ejemplo', p: [['Inflamable', 'Bencina'], ['Gas', 'Cilindro de gas licuado'], ['Corrosivo', 'Ácido de batería'], ['Explosivo', 'Fuegos artificiales']] },
        { t: 'build', q: 'Arma la regla', w: 'Ante un derrame aleja a las personas y avisa a Bomberos', x: ['acércate', 'limpia'] },
      ],
    },
  ]);

  // ---------- Maquinaria (clase D) ----------
  RB.more('maq1', [
    {
      n: 'Inspección y estabilidad', ic: 'tractor', items: [
        { t: 'mc', q: 'La inspección diaria de una máquina se hace:', o: ['Antes de comenzar a trabajar', 'Una vez al mes', 'Solo cuando falla', 'Al final del año'] },
        { t: 'multi', q: 'Selecciona puntos de la inspección diaria', o: ['Niveles de aceite y refrigerante', 'Fugas hidráulicas', 'Frenos, luces y alarma de retroceso', 'El color de la cabina'], a: [0, 1, 2] },
        { t: 'tf', q: 'Para subir o bajar de la máquina se usan tres puntos de apoyo: dos manos y un pie, o dos pies y una mano.', a: true },
        { t: 'mc', q: 'Para trasladar material con un cargador frontal, la pala debe ir:', o: ['Baja, cerca del suelo', 'Lo más alto posible', 'Inclinada hacia adelante', 'Fuera de la máquina'] },
        { t: 'tf', q: 'Un terreno blando o el borde de una zanja puede ceder con el peso de la máquina.', a: true },
        { t: 'mc', q: 'Si la máquina comienza a volcar y tienes cinturón y estructura antivuelco:', o: ['Te quedas en el asiento, bien sujeto, sin saltar', 'Saltas de la máquina', 'Te sueltas el cinturón', 'Abres la puerta'] },
        { t: 'sort', q: '¿Más o menos estable?', c: ['Más estable', 'Menos estable'], k: [['Pala baja', 0], ['Pala cargada en alto', 1], ['Trabajar atravesado en una pendiente', 1], ['Terreno firme y plano', 0], ['Giro brusco a alta velocidad', 1]] },
        { t: 'build', q: 'Arma la regla', w: 'Usa el cinturón si la máquina tiene estructura antivuelco', x: ['nunca', 'salta'] },
      ],
    },
    {
      n: 'Señales y trabajo en equipo', ic: 'user', items: [
        { t: 'mc', q: 'En una faena con grúa, el señalero (rigger):', o: ['Guía la maniobra con señales que el operador debe conocer', 'Solo observa', 'Maneja la grúa', 'Dirige el tránsito de la ciudad'] },
        { t: 'tf', q: 'Si pierdes de vista al señalero, debes detener la maniobra.', a: true },
        { t: 'tf', q: 'Nadie debe pasar ni quedarse bajo una carga suspendida.', a: true },
        { t: 'mc', q: 'La alarma de retroceso sirve para:', o: ['Advertir a las personas que la máquina va en reversa', 'Avisar que falta combustible', 'Llamar al señalero', 'Encender las luces'] },
        { t: 'mc', q: 'Antes de excavar conviene averiguar:', o: ['Si hay cañerías de gas o agua, o cables enterrados', 'El color del suelo', 'La hora del almuerzo', 'Nada'] },
        { t: 'multi', q: 'Selecciona elementos de protección personal para operar maquinaria', o: ['Casco', 'Zapatos de seguridad', 'Protección auditiva', 'Chaleco reflectante', 'Sandalias'], a: [0, 1, 2, 3] },
        { t: 'fill', q: 'Completa la frase', s: 'Nunca te ubiques bajo una carga ___.', o: ['suspendida', 'apoyada', 'liviana'] },
      ],
    },
  ]);

  RB.more('maq2', [
    {
      n: 'Transitar con maquinaria', ic: 'road', items: [
        { t: 'video', scene: 'tractor', at: 3.2, q: 'Vas detrás de un tractor y la línea central es continua. ¿Qué haces?', o: ['Espero con paciencia la línea discontinua y la pista contraria libre', 'Adelanto igual', 'Toco la bocina', 'Lo adelanto por la berma'] },
        { t: 'tf', q: 'La maquinaria que circula por la vía pública debe llevar luces y baliza visibles.', a: true },
        { t: 'mc', q: 'Si la máquina es más ancha que la pista:', o: ['Necesita autorización y señalización especial, y a veces un vehículo de escolta', 'Puede circular sin avisar', 'Debe ir por la vereda', 'Debe ir rápido'] },
        { t: 'mc', q: 'Si la maquinaria queda detenida en la berma por una falla:', o: ['La señalizas con triángulos y balizas para advertir a los demás', 'La dejas sin señalizar', 'La dejas en la calzada', 'Te vas a buscar ayuda sin avisar'] },
        { t: 'tf', q: 'Antes de salir a la vía pública conviene limpiar el barro y las piedras de las ruedas y de la pala.', a: true },
        { t: 'mc', q: 'Al virar con un tractor que lleva un acoplado:', o: ['Señalizas con tiempo y vigilas que el acoplado no golpee nada', 'Viras sin señalizar', 'Viras rápido', 'Retrocedes'] },
        { t: 'build', q: 'Arma la regla', w: 'Con maquinaria en la vía usa luces y baliza', x: ['nunca', 'apaga'] },
      ],
    },
  ]);

  // ---------- Tracción animal (clase E) ----------
  RB.more('tra1', [
    {
      n: 'Circular con una carreta', ic: 'horse', items: [
        { t: 'mc', q: 'Al circular de noche con una carreta, lo mínimo es llevar:', o: ['Luces o reflectantes visibles adelante y atrás', 'Nada si el camino es conocido', 'Solo una campana', 'Ropa oscura'] },
        { t: 'tf', q: 'Una carreta debe circular lo más cerca posible del borde derecho del camino.', a: true },
        { t: 'mc', q: 'Si se forma una fila de vehículos detrás de tu carreta:', o: ['Te orillas cuando sea seguro para dejarlos pasar', 'Te pones en el centro', 'Apuras al animal', 'Te detienes en una curva'] },
        { t: 'tf', q: 'Con una carreta debes respetar los semáforos y los pasos de cebra.', a: true },
        { t: 'mc', q: 'Para cruzar una carretera con una carreta:', o: ['Esperas un espacio amplio sin vehículos y cruzas donde haya buena visibilidad', 'Cruzas en una curva', 'Cruzas de noche sin luces', 'Te detienes en la mitad'] },
        { t: 'sort', q: '¿Correcto o incorrecto?', c: ['Correcto', 'Incorrecto'], k: [['Ir por la derecha del camino', 0], ['Llevar reflectantes de noche', 0], ['Dejar el animal suelto en la berma', 1], ['Circular en sentido contrario', 1], ['Respetar el PARE', 0]] },
        { t: 'img', q: '¿Cuál señal advierte que puede haber animales en la vía?', o: ['animales', 'peatones', 'ciclistas', 'escolares'] },
        { t: 'build', q: 'Arma la regla', w: 'La carreta circula por la derecha del camino', x: ['izquierda', 'centro'] },
      ],
    },
    {
      n: 'Señales y otros vehículos', ic: 'sign', items: [
        { t: 'mc', q: 'Un camión se acerca rápido por detrás mientras vas en tu carreta:', o: ['Te mantienes a la derecha, con calma y controlando al animal', 'Te cruzas al centro', 'Sueltas las riendas', 'Te detienes en medio de la pista'] },
        { t: 'mc', sign: 'cruceFerroviario', q: 'Con tu carreta ves esta señal. ¿Qué haces?', o: ['Me preparo para detenerme y cruzo solo si no viene un tren', 'Cruzo rápido sin mirar', 'Me detengo sobre la vía', 'Toco la campana y sigo'] },
        { t: 'tf', q: 'Un vehículo de tracción animal no tiene preferencia sobre los demás solo por ser lento.', a: true },
        { t: 'mc', q: 'Para virar a la izquierda con una carreta:', o: ['Señalizas con el brazo con anticipación y miras hacia atrás', 'Viras sin avisar', 'Te detienes en la curva', 'Gritas para que te dejen pasar'] },
        { t: 'match', q: 'Une cada señal con su significado', p: [['sign:pare', 'Detenerse siempre'], ['sign:ceda', 'Ceder el paso'], ['sign:animales', 'Animales en la vía'], ['sign:cruceFerroviario', 'Cruce de tren']] },
        { t: 'tf', q: 'Las normas de tránsito se respetan también en los caminos rurales poco transitados.', a: true },
      ],
    },
  ]);

  RB.more('tra2', [
    {
      n: 'Salud y trabajo del animal', ic: 'heart', items: [
        { t: 'mc', q: 'Las herraduras de un caballo de tiro deben:', o: ['Estar en buen estado y revisarse periódicamente', 'Cambiarse solo cuando se caen', 'Ser de goma', 'No son necesarias en el pavimento'] },
        { t: 'tf', q: 'Los arneses mal ajustados pueden causar heridas al animal.', a: true },
        { t: 'mc', q: 'Si el animal cojea:', o: ['Lo detienes, revisas la pata y no lo haces trabajar si está lesionado', 'Lo haces trabajar más lento', 'Le pegas para que avance', 'Lo ignoras'] },
        { t: 'tf', q: 'Golpear a un animal para que avance es maltrato y puede sancionarse.', a: true },
        { t: 'multi', q: 'Selecciona lo que necesita un animal de tiro', o: ['Agua y alimento suficientes', 'Descanso y sombra', 'Revisión veterinaria', 'Trabajar sin pausas todo el día'], a: [0, 1, 2] },
        { t: 'sort', q: '¿Bienestar o maltrato?', c: ['Bienestar', 'Maltrato'], k: [['Darle agua durante la jornada', 0], ['Cargar más de lo que puede tirar', 1], ['Revisar sus cascos', 0], ['Dejarlo amarrado al sol todo el día', 1]] },
        { t: 'build', q: 'Arma la regla', w: 'Un animal enfermo no debe trabajar', x: ['siempre', 'más'] },
      ],
    },
  ]);

  // ---------- Conducción institucional (clase F) ----------
  RB.more('emerv', [
    {
      n: 'Conducir en emergencia', ic: 'siren', items: [
        { t: 'tf', q: 'Las balizas y la sirena piden el paso, pero no garantizan que los demás te vean o te escuchen.', a: true },
        { t: 'mc', q: 'En un taco, el vehículo de emergencia debe:', o: ['Avanzar despacio por el espacio que le abren, sin presionar a los demás', 'Subirse a la vereda a alta velocidad', 'Empujar a los autos', 'Apagar la sirena'] },
        { t: 'tf', q: 'Cuando la emergencia termina, se apagan las balizas y la sirena y se conduce con las reglas normales.', a: true },
        { t: 'mc', q: 'Al detenerte en el lugar de una emergencia, el vehículo debe:', o: ['Ubicarse de forma que proteja la zona de trabajo, con luces de advertencia', 'Quedar en cualquier parte', 'Bloquear a la ambulancia', 'Quedar con las luces apagadas'] },
        { t: 'multi', q: 'Selecciona lo que aumenta el riesgo al conducir en emergencia', o: ['Exceso de velocidad', 'Cruzar con luz roja sin reducir', 'El estrés de la situación', 'Revisar el vehículo antes del turno'], a: [0, 1, 2] },
        { t: 'tap', scene: 'emergencia-cruce', at: 3.2, q: 'Se acerca una ambulancia con sirena. Toca al vehículo que tiene preferencia', a: 'amb', ids: ['amb', 'n', 'ego'], r: 'La ambulancia con sirena y balizas, aunque los demás tengan luz verde.' },
        { t: 'build', q: 'Arma la regla', w: 'La sirena pide el paso pero no lo garantiza', x: ['siempre', 'obliga'] },
      ],
    },
    {
      n: 'Patrullaje y convoy', ic: 'car', items: [
        { t: 'mc', q: 'Durante un patrullaje normal, sin emergencia, el conductor debe:', o: ['Cumplir todas las normas de tránsito como cualquier conductor', 'Exceder la velocidad', 'No usar cinturón', 'Estacionar en cualquier parte'] },
        { t: 'tf', q: 'El cinturón de seguridad también se usa en los vehículos institucionales.', a: true },
        { t: 'mc', q: 'En un convoy, si el vehículo de adelante frena:', o: ['Mantienes la distancia para poder frenar con seguridad', 'Lo adelantas', 'Tocas la bocina', 'Te pegas para no perderlo'] },
        { t: 'tf', q: 'Antes de cada turno se revisan neumáticos, frenos, luces, sirena y balizas.', a: true },
        { t: 'sort', q: '¿Correcto o incorrecto?', c: ['Correcto', 'Incorrecto'], k: [['Usar la sirena solo en emergencias', 0], ['Conducir cansado tras un turno largo', 1], ['Reducir la velocidad en los cruces', 0], ['Usar el celular mientras conduces', 1]] },
        { t: 'fill', q: 'Completa la frase', s: 'En una emergencia, la ___ importa más que llegar unos segundos antes.', o: ['seguridad', 'velocidad', 'sirena'] },
      ],
    },
  ]);
})();
