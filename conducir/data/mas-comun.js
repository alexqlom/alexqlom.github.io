// Lecciones adicionales para las unidades comunes (señales, semáforos, normas, preferencias y usuarios vulnerables).
// Misma convención: en 'mc', 'img', 'fill' y 'video' la primera opción es la correcta.
(function () {
  const RB = window.RB = window.RB || {};
  RB.more = RB.more || ((id, lessons) => { RB.units[id].lessons.push(...lessons); });

  RB.more('sen', [
    {
      n: 'Más señales reglamentarias', ic: 'stop', items: [
        { t: 'mc', sign: 'vel30', q: '¿Dónde es habitual encontrar esta señal?', o: ['En zonas escolares, para el horario de entrada y salida de alumnos', 'En autopistas interurbanas', 'En túneles de alta velocidad', 'En caminos rurales sin tránsito'] },
        { t: 'mc', sign: 'anchoMax', q: '¿Qué indica esta señal?', o: ['El ancho máximo permitido de los vehículos', 'El ancho de la vereda', 'La distancia mínima entre vehículos', 'El ancho de la ciclovía'] },
        { t: 'mc', sign: 'noMotos', q: '¿Qué indica esta señal?', o: ['Prohibido el tránsito de motocicletas', 'Estacionamiento de motos', 'Pista exclusiva para motos', 'Taller de motos'] },
        { t: 'mc', sign: 'soloBus', q: '¿Qué indica esta señal?', o: ['Una pista exclusiva para buses', 'Un paradero de buses', 'Un terminal de buses', 'Un estacionamiento de buses'] },
        { t: 'tf', sign: 'soloBus', q: 'Un auto particular puede circular por una pista solo bus si va apurado.', a: false, e: 'Las pistas y vías exclusivas son solo para buses en el horario indicado. Circular por ellas se multa.' },
        { t: 'mc', sign: 'noCamiones', q: '¿Qué indica esta señal?', o: ['Prohibido el tránsito de camiones', 'Zona de carga y descarga', 'Peso máximo para camiones', 'Estacionamiento de camiones'] },
        { t: 'mc', sign: 'noBicicletas', q: '¿Qué indica esta señal?', o: ['Prohibido el tránsito de bicicletas', 'Ciclovía', 'Estacionamiento de bicicletas', 'Cruce de ciclistas'] },
        { t: 'mc', sign: 'noPeatones', q: '¿Qué indica esta señal?', o: ['Prohibido el tránsito de peatones', 'Paso peatonal', 'Zona escolar', 'Calle peatonal'] },
        { t: 'img', q: '¿Cuál señal prohíbe el tránsito de motocicletas?', o: ['noMotos', 'noBicicletas', 'noCamiones', 'noAdelantar'] },
        { t: 'match', q: 'Une cada señal con su significado', p: [['sign:vel30', 'Máximo 30 km/h'], ['sign:anchoMax', 'Ancho máximo'], ['sign:alturaMax', 'Altura máxima'], ['sign:pesoMax', 'Peso máximo']] },
      ],
    },
    {
      n: 'Advertencias en carretera', ic: 'sign', items: [
        { t: 'mc', sign: 'tunel', q: '¿Qué advierte esta señal?', o: ['Un túnel más adelante', 'Un puente', 'Un paso bajo nivel peatonal', 'El fin de la carretera'] },
        { t: 'mc', sign: 'viento', q: '¿Qué advierte esta señal?', o: ['Viento lateral fuerte', 'Un aeropuerto cercano', 'Una zona de faenas', 'Una bandera de peligro'] },
        { t: 'mc', sign: 'derrumbes', q: '¿Qué advierte esta señal?', o: ['Una zona de derrumbes o caída de piedras', 'Una pendiente fuerte', 'Un camino de ripio', 'Una zona de minería'] },
        { t: 'mc', sign: 'pendiente', q: 'Ves esta señal antes de una bajada. Conviene:', o: ['Bajar un cambio y usar el freno motor', 'Poner el vehículo en neutro', 'Acelerar para pasar rápido', 'Frenar a fondo durante toda la bajada'] },
        { t: 'mc', sign: 'curvas', q: '¿Qué advierte esta señal?', o: ['Curva y contracurva', 'Un desvío', 'Una rotonda', 'Un viraje en U'] },
        { t: 'tf', sign: 'viento', q: 'Con viento lateral fuerte conviene sujetar firme el volante y reducir la velocidad.', a: true },
        { t: 'mc', sign: 'tunel', q: 'Al ver esta señal, debes prepararte para:', o: ['Encender las luces y no adelantar dentro del túnel', 'Apagar las luces', 'Tocar la bocina al entrar', 'Adelantar antes de que se angoste'] },
        { t: 'sort', q: 'Clasifica cada señal', c: ['Reglamentaria', 'Advertencia'], k: [['sign:noMotos', 0], ['sign:tunel', 1], ['sign:anchoMax', 0], ['sign:viento', 1], ['sign:soloBus', 0], ['sign:derrumbes', 1]] },
        { t: 'img', q: '¿Cuál señal advierte un túnel?', o: ['tunel', 'estrechamiento', 'curvas', 'dobleSentido'] },
      ],
    },
    {
      n: 'Informativas y de servicios', ic: 'info', items: [
        { t: 'mc', sign: 'ciclovia', q: '¿Qué indica esta señal?', o: ['Una ciclovía', 'Prohibido el tránsito de bicicletas', 'Arriendo de bicicletas', 'Que los ciclistas deben ir por la vereda'] },
        { t: 'tf', sign: 'ciclovia', q: 'Un auto puede estacionar sobre la ciclovía si deja las luces de emergencia encendidas.', a: false },
        { t: 'mc', sign: 'calleSinSalida', q: '¿Qué indica esta señal?', o: ['Calle sin salida', 'Fin de la pista', 'Prohibido virar', 'Estacionamiento'] },
        { t: 'mc', sign: 'pasoPeatonal', q: '¿Qué indica esta señal?', o: ['Un paso peatonal', 'Una calle peatonal', 'Una zona escolar', 'Un paradero'] },
        { t: 'mc', sign: 'discapacidad', q: '¿Qué indica esta señal?', o: ['Estacionamiento reservado para personas con discapacidad', 'Un hospital', 'Una rampa para bicicletas', 'Una zona de carga'] },
        { t: 'tf', sign: 'discapacidad', q: 'Puedes usar un estacionamiento para personas con discapacidad si es por pocos minutos.', a: false },
        { t: 'match', q: 'Une cada señal con lo que indica', p: [['sign:hospital', 'Hospital'], ['sign:servicentro', 'Servicentro'], ['sign:paradero', 'Paradero de buses'], ['sign:ciclovia', 'Ciclovía']] },
        { t: 'img', q: '¿Cuál señal indica una calle sin salida?', o: ['calleSinSalida', 'noEntrar', 'estacionamiento', 'soloBus'] },
        { t: 'fill', q: 'Completa la frase', s: 'Las señales de color ___ indican trabajos temporales en la vía.', o: ['naranja', 'azul', 'verde'] },
      ],
    },
    {
      n: 'Repaso de señales', ic: 'sign', items: [
        { t: 'match', q: 'Une cada señal con su significado', p: [['sign:noVirarIzq', 'No virar a la izquierda'], ['sign:noVirarDer', 'No virar a la derecha'], ['sign:noEstacionar', 'No estacionar'], ['sign:noEntrar', 'No entrar']] },
        { t: 'sort', q: '¿Qué hace cada señal?', c: ['Prohíbe algo', 'Advierte un peligro', 'Informa'], k: [['sign:noBocina', 0], ['sign:animales', 1], ['sign:paradero', 2], ['sign:noAdelantar', 0], ['sign:semaforoAdelante', 1], ['sign:calleSinSalida', 2]] },
        { t: 'img', q: '¿Cuál señal advierte un cruce ferroviario más adelante?', o: ['cruceFerroviario', 'cruceVias', 'semaforoAdelante', 'resalto'] },
        { t: 'mc', sign: 'cruzSanAndres', q: '¿Qué indica esta señal?', o: ['La ubicación de un cruce ferroviario a nivel', 'Un cruce de calles', 'Prohibido el paso', 'Un hospital'] },
        { t: 'tf', q: 'Una señal reglamentaria es solo una recomendación: no respetarla no tiene sanción.', a: false },
        { t: 'build', q: 'Arma la regla', w: 'Las indicaciones de un carabinero prevalecen sobre el semáforo', x: ['nunca', 'señal'] },
        { t: 'fill', q: 'Completa la frase', s: 'La señal PARE tiene forma de ___.', o: ['octágono', 'triángulo', 'círculo'] },
        { t: 'fill', q: 'Completa la frase', s: 'La señal Ceda el paso es un triángulo con un vértice hacia ___.', o: ['abajo', 'arriba', 'la derecha'] },
        { t: 'multi', q: 'Selecciona las señales reglamentarias (obligan o prohíben)', o: ['PARE', 'Ceda el paso', 'Velocidad máxima', 'Curva peligrosa', 'Hospital'], a: [0, 1, 2] },
      ],
    },
  ]);

  RB.more('sem', [
    {
      n: 'Semáforos especiales y carabineros', ic: 'light', items: [
        { t: 'mc', q: 'Con luz roja y una flecha verde encendida hacia la derecha, puedes:', o: ['Avanzar con cuidado solo hacia la derecha, respetando a peatones y vehículos', 'Avanzar en cualquier dirección', 'Seguir derecho', 'Esperar la luz verde sin moverte'] },
        { t: 'mc', q: 'Una flecha verde en el semáforo te permite avanzar:', o: ['En la dirección que indica la flecha, respetando a los peatones', 'En cualquier dirección', 'Solo si tocas la bocina', 'Solo de noche'] },
        { t: 'mc', q: 'Si un semáforo no funciona y nadie dirige el tránsito:', o: ['Respetas las señales PARE o Ceda el paso que haya y, si no hay, las reglas de un cruce sin señales', 'Pasas primero porque nadie regula', 'Tocas la bocina y avanzas', 'Esperas a que lo arreglen'] },
        { t: 'tf', q: 'Si un carabinero te indica avanzar aunque el semáforo esté en rojo, debes avanzar.', a: true, e: 'Las indicaciones de Carabineros prevalecen sobre semáforos, señales y demarcaciones.' },
        { t: 'tf', q: 'Dos luces rojas que destellan alternadas en un cruce ferroviario indican que no debes pasar la línea de detención.', a: true },
        { t: 'mc', q: 'Las luces rojas alternadas en un cruce ferroviario indican:', o: ['Detenerse: se acerca un tren', 'Avanzar con precaución', 'Que la barrera está averiada', 'Que puedes cruzar si no ves el tren'] },
        { t: 'clip', scene: 'emergencia-cruce' },
        { t: 'video', scene: 'emergencia-cruce', at: 3, q: 'Tienes luz verde y se acerca una ambulancia con sirena por la otra vía. ¿Qué haces?', o: ['Me detengo y le cedo el paso', 'Sigo porque tengo luz verde', 'Acelero para pasar antes', 'Toco la bocina'] },
        { t: 'sort', q: '¿Puedes avanzar?', c: ['Puedo avanzar', 'Debo detenerme'], k: [['Luz verde y cruce despejado', 0], ['Luz roja', 1], ['Flecha verde en mi dirección', 0], ['Luz amarilla, aún lejos del cruce', 1], ['Luz roja intermitente y vía libre', 0]] },
      ],
    },
    {
      n: 'Más demarcaciones', ic: 'road', items: [
        { t: 'mc', q: 'Una doble línea continua en el centro de la calzada indica:', o: ['Que está prohibido cruzarla en ambos sentidos', 'Que puedes adelantar con cuidado', 'Una ciclovía', 'El borde de la berma'] },
        { t: 'mc', q: 'La línea blanca continua junto al borde derecho de la carretera separa:', o: ['La calzada de la berma', 'Las pistas para adelantar', 'La ciclovía de la vereda', 'Las zonas de estacionamiento'] },
        { t: 'mc', q: 'Una pista con la palabra BUS pintada en el pavimento es:', o: ['Una pista reservada para buses', 'Un paradero obligatorio para todos', 'Una zona para estacionar buses de turismo', 'Una pista para adelantar'] },
        { t: 'tf', q: 'Si tu pista tiene una flecha pintada que solo indica virar a la derecha, no puedes seguir derecho desde ella.', a: true },
        { t: 'mc', q: 'Las palabras y flechas pintadas en el pavimento:', o: ['Refuerzan las señales y debes respetarlas', 'Son solo decorativas', 'Valen solo de noche', 'Solo aplican a los buses'] },
        { t: 'fill', q: 'Completa la frase', s: 'Una línea ___ en el centro de la calzada prohíbe adelantar.', o: ['continua', 'discontinua', 'punteada'] },
        { t: 'spot', scene: 'pare', at: .5, q: 'Toca dónde debes detener tu vehículo ante la señal PARE', z: [316, 246, 48, 50], r: 'Justo antes de la línea de detención.' },
        { t: 'spot', scene: 'tren', at: 1.8, q: 'Las luces destellan: se acerca un tren. Toca dónde debes detenerte', z: [322, 180, 62, 40], r: 'Antes de la línea de detención, lejos de la vía.' },
        { t: 'spot', scene: 'cebra', at: 1, q: 'Toca dónde debes detenerte para dejar cruzar al peatón', z: [334, 180, 66, 40], r: 'Antes de la franja del paso de cebra.' },
        { t: 'build', q: 'Arma la regla', w: 'Con luz amarilla debes detenerte si puedes hacerlo con seguridad', x: ['acelerar', 'siempre'] },
      ],
    },
  ]);

  RB.more('nor', [
    {
      n: 'Velocidades por tipo de vehículo', ic: 'speed', items: [
        { t: 'mc', q: 'En zona urbana, la velocidad máxima para buses y camiones es:', o: ['50 km/h', '60 km/h', '70 km/h', '40 km/h'] },
        { t: 'mc', q: 'En zona rural, los camiones de 3.860 kg o más de peso bruto no pueden superar:', o: ['90 km/h', '100 km/h', '120 km/h', '80 km/h'] },
        { t: 'mc', q: 'En zona rural, el transporte escolar no puede superar:', o: ['90 km/h', '100 km/h', '120 km/h', '70 km/h'] },
        { t: 'tf', q: 'Los buses interurbanos pueden circular hasta 100 km/h en zona rural.', a: true },
        { t: 'mc', q: 'En un camino rural con dos o más pistas en el mismo sentido, la velocidad máxima para autos es:', o: ['120 km/h', '100 km/h', '90 km/h', '140 km/h'] },
        { t: 'num', q: 'Velocidad máxima en una zona escolar, en horario de entrada y salida de alumnos', a: 30, u: 'km/h', min: 10, max: 80, step: 10 },
        { t: 'mc', q: 'Pueden fijar límites de velocidad distintos a los generales:', o: ['Las municipalidades en zonas urbanas y Vialidad en caminos rurales, siempre con señales', 'Cualquier vecino con un letrero', 'Carabineros, de palabra', 'Las empresas de buses'] },
        { t: 'clip', scene: 'escolar' },
        { t: 'video', scene: 'escolar', at: 2.6, q: 'Entras a una zona escolar a la hora de salida de clases. ¿A qué velocidad máxima puedes ir?', o: ['30 km/h', '50 km/h', '60 km/h', '40 km/h'] },
        { t: 'sort', q: '¿Cuál es la velocidad máxima?', c: ['50 km/h', '90 km/h', '120 km/h'], k: [['Auto en zona urbana', 0], ['Camión en carretera rural', 1], ['Auto en una autopista rural de dos pistas por sentido', 2], ['Bus urbano en la ciudad', 0], ['Furgón escolar en carretera', 1]] },
      ],
    },
    {
      n: 'Adelantamientos y maniobras', ic: 'overtake', items: [
        { t: 'mc', q: 'No puedes adelantar al acercarte a un puente, túnel o cruce ferroviario a menos de:', o: ['200 metros', '20 metros', '50 metros', '1 kilómetro'] },
        { t: 'num', q: 'Distancia antes de un puente, túnel o cruce ferroviario en la que está prohibido adelantar', a: 200, u: 'm', min: 50, max: 500, step: 50 },
        { t: 'tf', q: 'Puedes adelantar por la derecha a un vehículo que señalizó y se detuvo para virar a la izquierda, si hay espacio y es seguro.', a: true },
        { t: 'mc', q: 'Para adelantar a un vehículo largo, como un camión:', o: ['Necesitas más distancia y tiempo: asegúrate de tener visibilidad suficiente', 'Puedes hacerlo igual que con un auto', 'Ve pegado a él para aprovechar su rebufo', 'Adelanta por la berma'] },
        { t: 'mc', q: 'Si mientras adelantas aparece un vehículo de frente y no alcanzas a terminar:', o: ['Desistes con seguridad: reduces y vuelves detrás del vehículo', 'Aceleras al máximo', 'Te detienes en la pista contraria', 'Tocas la bocina para que el otro se corra'] },
        { t: 'clip', scene: 'adelantado' },
        { t: 'video', scene: 'adelantado', at: 2.6, q: 'Un vehículo comienza a adelantarte. ¿Qué haces?', o: ['Mantengo o reduzco mi velocidad y sigo por la derecha', 'Acelero para que no me pase', 'Me cambio a la pista izquierda', 'Freno bruscamente'] },
        { t: 'order', q: 'Ordena cómo cambiarte de pista', o: ['Mirar los espejos', 'Señalizar con el intermitente', 'Revisar el punto ciego girando la cabeza', 'Cambiarte con suavidad cuando haya espacio'] },
        { t: 'build', q: 'Arma la regla', w: 'Cuando te adelantan no debes aumentar la velocidad', x: ['siempre', 'frenar'] },
      ],
    },
    {
      n: 'Estacionar y detenerse', ic: 'cross', items: [
        { t: 'mc', q: 'Está prohibido estacionar a menos de cuántos metros de un grifo:', o: ['5 metros', '1 metro', '20 metros', '50 metros'] },
        { t: 'mc', q: 'Está prohibido estacionar a menos de cuántos metros de una esquina:', o: ['10 metros', '2 metros', '5 metros', '30 metros'] },
        { t: 'mc', q: 'Está prohibido estacionar a menos de cuántos metros de un cruce ferroviario a nivel:', o: ['20 metros', '5 metros', '10 metros', '100 metros'] },
        { t: 'num', q: 'Distancia mínima a una esquina para poder estacionar', a: 10, u: 'm', min: 0, max: 30, step: 5 },
        { t: 'clip', scene: 'estacionar' },
        { t: 'tap', scene: 'estacionar', at: .5, q: 'Toca todos los autos mal estacionados', a: ['A', 'B', 'D', 'E', 'I', 'H'], ids: ['A', 'B', 'C', 'D', 'E', 'I', 'G', 'H'], r: 'El del grifo, el del garaje, el de doble fila, el del paso peatonal, el de la esquina y el de la vereda.' },
        { t: 'tap', scene: 'estacionar', at: .5, q: 'Toca el auto estacionado frente a la entrada de un garaje', a: 'B', ids: ['A', 'B', 'C', 'D', 'E', 'I', 'G', 'H'], r: 'El que tapa la salida de vehículos.', still: true },
        { t: 'spot', scene: 'estacionar', at: .5, q: 'Toca un lugar donde sí puedes estacionar', z: [[252, 221, 56, 24], [20, 117, 150, 24], [224, 117, 150, 24]], r: 'Los espacios libres junto a la vereda, lejos del grifo, del garaje, del paso peatonal y de la esquina.' },
        { t: 'tf', q: 'Estacionar en doble fila está prohibido.', a: true },
        { t: 'mc', q: 'Al estacionar junto a la solera en una calle de doble sentido, el vehículo debe quedar:', o: ['En el sentido del tránsito, paralelo y cerca de la solera', 'En sentido contrario al tránsito', 'Atravesado sobre la vereda', 'En el centro de la calzada'] },
      ],
    },
    {
      n: 'Luces, bocina y túneles', ic: 'eye', items: [
        { t: 'mc', q: 'En rutas interurbanas, de día debes circular:', o: ['Con luces de circulación diurna o luces bajas encendidas', 'Con todas las luces apagadas', 'Siempre con luces altas', 'Solo con luces de estacionamiento'] },
        { t: 'mc', q: 'En un camino rural, cuando se acerca un vehículo de frente, debes cambiar a luces bajas a una distancia no menor de:', o: ['200 metros', '20 metros', '2 kilómetros', 'No es necesario cambiarlas'] },
        { t: 'num', q: 'Distancia mínima a la que cambias a luces bajas ante un vehículo que viene de frente en un camino rural', a: 200, u: 'm', min: 50, max: 500, step: 50 },
        { t: 'tf', q: 'En zonas urbanas, la bocina solo se puede usar para advertir un peligro inminente.', a: true },
        { t: 'tf', q: 'Dentro de un túnel puedes tocar la bocina para avisar que vas pasando.', a: false },
        { t: 'multi', q: 'Selecciona lo correcto al circular por un túnel', o: ['Encender las luces', 'No adelantar', 'No detenerse, salvo emergencia', 'Tocar la bocina', 'Quitarse el cinturón'], a: [0, 1, 2] },
        { t: 'clip', scene: 'noche' },
        { t: 'video', scene: 'noche', at: 3, q: 'Llevas las luces altas y se acerca un vehículo de frente. ¿Qué haces?', o: ['Cambio a luces bajas', 'Mantengo las altas para ver mejor', 'Apago todas las luces', 'Hago cambios de luces seguidos'] },
        { t: 'fill', q: 'Completa la frase', s: 'De noche, al cruzarte con otro vehículo debes usar luces ___.', o: ['bajas', 'altas', 'de emergencia'] },
      ],
    },
    {
      n: 'Autopistas y carreteras', ic: 'road', items: [
        { t: 'clip', scene: 'autopista' },
        { t: 'video', scene: 'autopista', at: 3.6, q: '¿Cómo te incorporas a la autopista?', o: ['Acelero en la vía de aceleración, señalizo y entro en un espacio seguro', 'Me detengo al inicio de la vía de aceleración', 'Entro lento por la pista izquierda', 'Cruzo todas las pistas de inmediato'] },
        { t: 'spot', scene: 'autopista', at: 1, q: 'Toca la vía de aceleración, donde tomas velocidad antes de entrar a la autopista', z: [0, 221, 1110, 36], r: 'La pista paralela por la que entras, a la derecha de la autopista.' },
        { t: 'mc', q: 'Para salir de una autopista debes:', o: ['Señalizar con tiempo, pasar a la pista derecha y reducir la velocidad en la vía de salida', 'Frenar en la pista izquierda', 'Cruzar las pistas a último momento', 'Retroceder si te pasaste de la salida'] },
        { t: 'tf', q: 'Si te pasaste de la salida de una autopista, puedes retroceder por la berma.', a: false, e: 'Retroceder en una autopista es muy peligroso. Sigue hasta la próxima salida.' },
        { t: 'tf', q: 'En una autopista debes circular por la pista derecha y usar la izquierda para adelantar.', a: true },
        { t: 'mc', q: 'La berma de una carretera es:', o: ['La franja junto a la calzada, para emergencias y detenciones', 'Una pista para adelantar', 'Un estacionamiento permanente', 'Una ciclovía'] },
        { t: 'tf', q: 'Los peatones no deben cruzar una autopista por la calzada: deben usar las pasarelas o los pasos habilitados.', a: true },
        { t: 'order', q: 'Ordena cómo detenerte en la berma por una falla', o: ['Encender las luces de emergencia', 'Salir de la calzada hacia la berma', 'Ponerte el chaleco reflectante al bajar', 'Colocar los triángulos detrás del vehículo'] },
        { t: 'build', q: 'Arma la regla', w: 'En la autopista circula por la derecha y adelanta por la izquierda', x: ['berma', 'retrocede'] },
      ],
    },
    {
      n: 'Cruces ferroviarios', ic: 'stop', items: [
        { t: 'mc', q: 'Al acercarte a un cruce ferroviario sin barreras debes:', o: ['Reducir la velocidad, mirar y escuchar, y cruzar solo si no viene un tren', 'Acelerar para cruzar rápido', 'Tocar la bocina y pasar', 'Detenerte sobre los rieles para mirar'] },
        { t: 'tf', q: 'Si hay un taco al otro lado del cruce ferroviario, no debes empezar a cruzar.', a: true },
        { t: 'tf', q: 'Puedes pasar entre las barreras si ya bajaron pero todavía no ves el tren.', a: false },
        { t: 'mc', q: 'Si tu vehículo queda detenido sobre la vía del tren:', o: ['Bajas de inmediato con todos los ocupantes, te alejas de la vía y avisas a emergencias', 'Te quedas dentro intentando partir', 'Tocas la bocina para que el tren frene', 'Empujas el auto con todos dentro'] },
        { t: 'mc', sign: 'cruzSanAndres', q: '¿Dónde se ubica esta señal?', o: ['Junto a un cruce ferroviario a nivel', 'En la entrada de un hospital', 'En las esquinas sin semáforo', 'En los paraderos'] },
        { t: 'fill', q: 'Completa la frase', s: 'En un cruce ferroviario, el ___ siempre tiene preferencia.', o: ['tren', 'auto', 'peatón'] },
        { t: 'num', q: 'Distancia mínima a un cruce ferroviario a nivel para poder estacionar', a: 20, u: 'm', min: 5, max: 50, step: 5 },
        { t: 'build', q: 'Arma la regla', w: 'Nunca te detengas sobre la vía del tren', x: ['siempre', 'acelera'] },
      ],
    },
  ]);

  RB.more('pre', [
    {
      n: 'Reglas especiales de preferencia', ic: 'cross', items: [
        { t: 'mc', q: 'La regla de preferencia para quien viene por la derecha NO se aplica:', o: ['En cruces con semáforo, carabinero o señales PARE o Ceda el paso', 'En cruces sin señales', 'Cuando ambos llegan al mismo tiempo', 'En las calles de la ciudad'] },
        { t: 'tf', q: 'Quien vira pierde la preferencia y debe ceder el paso a peatones, ciclistas y vehículos que siguen derecho.', a: true },
        { t: 'mc', q: 'En una zona rural, si pasas de un camino de tierra a uno pavimentado:', o: ['Cedes el paso a quienes circulan por el pavimentado', 'Tienes preferencia si vienes por la derecha', 'Pasa el que llegue primero', 'Tocas la bocina y pasas'] },
        { t: 'tf', q: 'Con señal Ceda el paso debes dejar pasar a los vehículos de la otra vía, aunque vengan por tu izquierda.', a: true },
        { t: 'clip', scene: 'giro' },
        { t: 'video', scene: 'giro', at: 3.4, q: 'Tienes luz verde y quieres virar a la izquierda. Viene un auto de frente. ¿Qué haces?', o: ['Espero a que pase y luego viro con cuidado', 'Viro rápido antes de que llegue', 'Toco la bocina para que frene', 'Me detengo sobre el paso peatonal'] },
        { t: 'tap', scene: 'giro', at: 4.2, q: 'Toca a todos los que debes ceder el paso antes de virar', a: ['o', 'ped'], ids: ['ego', 'o', 'ped'], r: 'El auto que viene de frente y el peatón que cruza la calle a la que entras.' },
        { t: 'build', q: 'Arma la regla', w: 'Quien vira debe ceder el paso a los peatones', x: ['tiene', 'preferencia'] },
        { t: 'sort', q: '¿Tiene preferencia o debe ceder el paso?', c: ['Tiene preferencia', 'Debe ceder el paso'], k: [['Vehículo que circula dentro de la rotonda', 0], ['Vehículo que sale de un garaje', 1], ['Peatón en un paso de cebra', 0], ['Vehículo que vira', 1], ['Ambulancia con sirena', 0]] },
      ],
    },
    {
      n: 'Emergencias y vehículos especiales', ic: 'siren', items: [
        { t: 'mc', q: 'Un carro de bomberos con sirena viene detrás de ti:', o: ['Te orillas a la derecha y facilitas su paso', 'Aceleras para no estorbar', 'Frenas en seco', 'Te cambias a la izquierda'] },
        { t: 'tf', q: 'Seguir de cerca a una ambulancia para avanzar más rápido en un taco es correcto.', a: false },
        { t: 'mc', q: 'Estás detenido con luz roja y una ambulancia necesita pasar:', o: ['Te mueves con cuidado solo si puedes hacerlo de forma segura para abrirle paso', 'Cruzas el semáforo en rojo a toda velocidad', 'No haces nada', 'Te bajas del auto'] },
        { t: 'mc', q: 'Un bus señaliza para salir del paradero. Lo prudente es:', o: ['Facilitar su incorporación si es seguro', 'Acelerar para que no salga', 'Tocar la bocina', 'Adelantarlo por la derecha'] },
        { t: 'video', scene: 'emergencia', at: 2.6, q: 'Escuchas una sirena detrás de ti. ¿Qué haces?', o: ['Señalizo, me orillo a la derecha y reduzco la velocidad', 'Acelero para despejar la pista', 'Freno en seco en mi pista', 'Me cambio a la pista contraria'] },
        { t: 'multi', q: 'Selecciona a quienes debes ceder el paso siempre', o: ['Vehículos de emergencia con sirena y balizas', 'Peatones en un paso de cebra', 'Trenes en un cruce ferroviario', 'Un auto que quiere estacionar delante de ti'], a: [0, 1, 2] },
        { t: 'fill', q: 'Completa la frase', s: 'Los vehículos de emergencia con sirena y balizas tienen ___ de paso.', o: ['preferencia', 'prohibición', 'restricción'] },
      ],
    },
    {
      n: 'Peatones', ic: 'ped', items: [
        { t: 'mc', q: 'Un peatón todavía está cruzando cuando tu semáforo cambia a verde:', o: ['Esperas a que termine de cruzar', 'Tocas la bocina y pasas', 'Lo esquivas', 'Aceleras'] },
        { t: 'tf', q: 'En un paso de cebra, el peatón tiene preferencia aunque no haya semáforo.', a: true },
        { t: 'mc', q: 'Al salir de un garaje cruzando la vereda, debes:', o: ['Ceder el paso a los peatones que van por la vereda', 'Tocar la bocina y salir rápido', 'Salir sin detenerte', 'Esperar solo a los autos'] },
        { t: 'mc', q: 'Un niño en la vereda mira la calle con una pelota en la mano. Tú:', o: ['Reduces la velocidad y te preparas para frenar', 'Tocas la bocina para asustarlo', 'Mantienes la velocidad', 'Aceleras para pasar antes'] },
        { t: 'tf', q: 'Los peatones deben cruzar por los pasos peatonales o las esquinas.', a: true },
        { t: 'mc', q: 'De noche, para ver mejor a los peatones conviene:', o: ['Reducir la velocidad y usar las luces adecuadas', 'Usar siempre las luces altas en la ciudad', 'Ir más rápido para pasar antes', 'Apagar las luces'] },
        { t: 'build', q: 'Arma la regla', w: 'En el paso de cebra el peatón tiene preferencia', x: ['nunca', 'auto'] },
        { t: 'order', q: 'Ordena qué hacer ante un paso de cebra con un peatón esperando', o: ['Reducir la velocidad', 'Detenerte antes de la franja', 'Esperar a que el peatón cruce', 'Continuar con precaución'] },
      ],
    },
  ]);

  RB.more('vul', [
    {
      n: 'Ciclistas y ciclos', ic: 'bike', items: [
        { t: 'tf', q: 'Los ciclistas deben usar casco.', a: true },
        { t: 'mc', q: 'Si existe una ciclovía, los ciclistas deben:', o: ['Circular por ella', 'Circular por la vereda', 'Circular por el centro de la calzada', 'Circular en sentido contrario'] },
        { t: 'mc', q: 'Los scooters eléctricos y vehículos parecidos no deben superar:', o: ['25 km/h', '50 km/h', '10 km/h', '60 km/h'] },
        { t: 'tf', q: 'Por regla general, las bicicletas no deben circular por la vereda.', a: true },
        { t: 'mc', q: 'Al virar a la derecha cruzando una ciclovía, debes:', o: ['Ceder el paso a los ciclistas que siguen derecho', 'Pasar primero porque eres más grande', 'Tocar la bocina', 'Cerrarle el paso al ciclista'] },
        { t: 'num', q: 'Distancia lateral mínima al adelantar a un ciclista', a: 1.5, u: 'm', min: 0.5, max: 3, step: 0.5 },
        { t: 'tf', q: 'Pueden ir en bicicleta por la vereda los menores de 14 años, los adultos mayores, las personas con discapacidad y quienes acompañan a niños menores de 7 años.', a: true, e: 'Deben hacerlo a velocidad de peatón y respetando siempre su preferencia.' },
        { t: 'mc', q: 'Un ciclista va delante de ti y hay tránsito continuo en la pista contraria:', o: ['Esperas detrás, a distancia segura, hasta poder adelantar dejando 1,5 m', 'Lo adelantas pegado a él', 'Le tocas la bocina para que se suba a la vereda', 'Lo adelantas por la derecha'] },
        { t: 'multi', q: 'Selecciona lo que exige o recomienda la convivencia con ciclistas', o: ['Dejar 1,5 m al adelantarlos', 'Mirar antes de abrir la puerta', 'No estacionar en las ciclovías', 'Tocarles la bocina para que se aparten'], a: [0, 1, 2] },
        { t: 'fill', q: 'Completa la frase', s: 'Quien puede ir en bicicleta por la vereda debe hacerlo a velocidad de ___.', o: ['peatón', 'auto', 'moto'] },
      ],
    },
    {
      n: 'Niños, adultos mayores y discapacidad', ic: 'child', items: [
        { t: 'mc', q: 'Una persona en silla de ruedas cruza lentamente. Tú:', o: ['Esperas con paciencia hasta que termine de cruzar', 'Tocas la bocina', 'Pasas por detrás', 'La apuras con cambios de luces'] },
        { t: 'tf', q: 'Los niños pequeños calculan mal la velocidad y la distancia de los vehículos.', a: true },
        { t: 'mc', q: 'Cerca de un furgón escolar detenido conviene:', o: ['Reducir la velocidad: puede bajar o cruzar un niño', 'Pasar rápido', 'Tocar la bocina', 'Estacionar en doble fila'] },
        { t: 'tf', q: 'Los adultos mayores pueden necesitar más tiempo para cruzar la calle.', a: true },
        { t: 'mc', q: 'Una persona cruza acompañada de un perro guía:', o: ['Tiene discapacidad visual: le cedes el paso', 'Es un paseo: puedes pasar', 'Debes tocar la bocina para avisarle', 'Debe esperar a que pases'] },
        { t: 'sort', q: '¿Correcto o incorrecto?', c: ['Correcto', 'Incorrecto'], k: [['Esperar a un peatón que cruza lento', 0], ['Usar un estacionamiento para personas con discapacidad sin derecho', 1], ['Reducir la velocidad cerca de colegios', 0], ['Tocar la bocina a un niño en la vereda', 1]] },
        { t: 'img', q: '¿Cuál señal indica un estacionamiento para personas con discapacidad?', o: ['discapacidad', 'estacionamiento', 'hospital', 'pasoPeatonal'] },
        { t: 'build', q: 'Arma la regla', w: 'Cerca de los colegios reduce la velocidad', x: ['aumenta', 'siempre'] },
      ],
    },
    {
      n: 'Más sobre motos y vehículos grandes', ic: 'moto', items: [
        { t: 'hazard', scene: 'h-moto' },
        { t: 'mc', q: 'Antes de virar o cambiarte de pista, las motos son difíciles de ver porque:', o: ['Son angostas y pueden quedar en tu punto ciego', 'Siempre van lento', 'No usan luces', 'Van por la vereda'] },
        { t: 'tf', q: 'Si un camión pone el intermitente para virar a la derecha, no debes ubicarte a su derecha.', a: true },
        { t: 'mc', q: 'Vas detrás de un camión que no te deja ver hacia adelante:', o: ['Aumentas la distancia para ver mejor y que él te vea por sus espejos', 'Te acercas para adelantar luego', 'Tocas la bocina', 'Lo adelantas en una curva'] },
        { t: 'tf', q: 'Un bus que sale del paradero puede no verte si estás en su punto ciego.', a: true },
        { t: 'spot', scene: 'puntociego', at: .5, q: 'Vas pegado detrás del camión. Toca dónde conviene ubicarte para que su conductor te vea', z: [150, 178, 200, 44], r: 'Más atrás, fuera de la zona ciega: si ves sus espejos, él te puede ver.' },
        { t: 'build', q: 'Arma la regla', w: 'Si no ves los espejos del camión su conductor no te ve', x: ['siempre', 'nos'] },
      ],
    },
  ]);
})();
