// Unidades comunes a todas las licencias.
// Convención: en 'mc', 'img' y 'fill' la primera opción es la correcta (se barajan al mostrar).
// Tipos: mc, tf, img, multi, fill, order, match, sort, num, video, tap, hazard, clip, info.
(function () {
  const RB = window.RB = window.RB || {};
  RB.units = RB.units || {};
  RB.unit = RB.unit || ((id, u) => { u.id = id; RB.units[id] = u; });

  RB.unit('sen', {
    name: 'Señales de tránsito', desc: 'Reglamentarias, de advertencia, informativas y de faenas.', ic: 'sign',
    lessons: [
      {
        n: 'Tipos de señales', ic: 'sign', items: [
          { t: 'mc', q: '¿Qué indican las señales reglamentarias?', o: ['Obligaciones, prohibiciones o limitaciones que debes cumplir', 'Peligros que hay más adelante', 'Servicios cercanos, como hospitales', 'Recomendaciones opcionales'], e: 'Las señales reglamentarias son normas: no respetarlas es una infracción.' },
          { t: 'mc', q: '¿Qué indican las señales de advertencia de peligro?', o: ['Un peligro o una condición especial más adelante', 'Una prohibición que debes cumplir', 'El camino hacia un destino', 'El fin de una restricción'] },
          { t: 'mc', q: 'Las señales informativas sirven para:', o: ['Orientar e informar sobre destinos, distancias y servicios', 'Prohibir maniobras', 'Advertir peligros', 'Indicar velocidades mínimas'] },
          { t: 'match', q: 'Une cada forma con su tipo de señal', p: [['Círculo con borde rojo', 'Reglamentaria'], ['Rombo amarillo', 'Advertencia de peligro'], ['Rectángulo o cuadrado azul', 'Informativa'], ['Octágono rojo', 'PARE']] },
          { t: 'img', q: '¿Cuál de estas es una señal de advertencia?', o: ['curvaDer', 'vel50', 'noEntrar', 'estacionamiento'] },
          { t: 'tf', q: 'Las señales de color naranja indican trabajos o faenas temporales en la vía.', a: true, e: 'Las señales de faenas son transitorias: avisan de trabajos en la vía y exigen extremar la precaución.' },
          { t: 'mc', q: 'Si un carabinero dirige el tránsito en un cruce con semáforo, ¿a quién obedeces?', o: ['Al carabinero', 'Al semáforo', 'A la señal PARE', 'Al vehículo que toque la bocina'], e: 'Las indicaciones de Carabineros prevalecen sobre semáforos, señales y demarcaciones.' },
          { t: 'order', q: 'Ordena de mayor a menor prioridad lo que debes obedecer', o: ['Indicaciones de un carabinero', 'Semáforo', 'Señal vertical, como un PARE', 'Demarcación en el pavimento'] },
          { t: 'fill', q: 'Completa la frase', s: 'Ante una señal PARE debes ___ por completo.', o: ['detenerte', 'reducir la velocidad', 'tocar la bocina'] },
        ],
      },
      {
        n: 'Señales reglamentarias', ic: 'stop', items: [
          { t: 'mc', sign: 'pare', q: '¿Qué debes hacer ante esta señal?', o: ['Detenerte por completo y continuar solo cuando sea seguro', 'Reducir la velocidad y pasar si no viene nadie', 'Tocar la bocina y continuar', 'Detenerte solo si hay un carabinero'], e: 'PARE exige detención total siempre, aunque la vía esté despejada.' },
          { t: 'mc', sign: 'ceda', q: 'Esta señal te indica que debes:', o: ['Ceder el paso a quienes circulan por la otra vía', 'Detenerte siempre al menos tres segundos', 'Avanzar porque tienes preferencia', 'Prepararte porque la calle termina'], e: 'Con Ceda el paso te detienes solo si es necesario para no interferir con otros.' },
          { t: 'mc', sign: 'noEntrar', q: '¿Qué indica esta señal?', o: ['No entrar: tránsito prohibido en ese sentido', 'Calle sin salida', 'Paso de peatones', 'Fin de una prohibición'] },
          { t: 'mc', sign: 'noVirarIzq', q: '¿Qué indica esta señal?', o: ['Prohibido virar a la izquierda', 'Curva a la izquierda', 'Viraje obligatorio a la izquierda', 'Desvío a la izquierda'] },
          { t: 'mc', sign: 'noVirarU', q: '¿Qué indica esta señal?', o: ['Prohibido virar en U', 'Rotonda más adelante', 'Viraje en U obligatorio', 'Calle de doble sentido'] },
          { t: 'mc', sign: 'noEstacionar', q: '¿Qué indica esta señal?', o: ['Prohibido estacionar', 'Estacionamiento permitido', 'Zona de espera de taxis', 'Prohibido el ingreso de vehículos'] },
          { t: 'tf', sign: 'noEstacionar', q: 'Con esta señal puedes detenerte un momento para que suba o baje un pasajero.', a: true, e: 'Prohibido estacionar no impide detenerse brevemente para subir o bajar personas. Detenerse se prohíbe con otra señal.' },
          { t: 'mc', sign: 'noAdelantar', q: '¿Qué indica esta señal?', o: ['Prohibido adelantar', 'Tránsito en ambos sentidos', 'Pista exclusiva para buses', 'Fin de la autopista'] },
          { t: 'mc', sign: 'vel50', q: '¿Qué indica esta señal?', o: ['Velocidad máxima de 50 km/h', 'Velocidad mínima de 50 km/h', 'Velocidad recomendada en curvas', 'Distancia mínima de 50 metros'] },
          { t: 'img', q: '¿Cuál señal prohíbe usar la bocina?', o: ['noBocina', 'noAdelantar', 'noEstacionar', 'noEntrar'] },
          { t: 'img', q: '¿Cuál señal indica Ceda el paso?', o: ['ceda', 'pare', 'noEntrar', 'curvaDer'] },
          { t: 'match', q: 'Une cada señal con su significado', p: [['sign:pare', 'Detención obligatoria'], ['sign:ceda', 'Ceda el paso'], ['sign:noEntrar', 'No entrar'], ['sign:noVirarU', 'Prohibido virar en U']] },
        ],
      },
      {
        n: 'Advertencia de peligro', ic: 'sign', items: [
          { t: 'mc', sign: 'curvaDer', q: '¿Qué te advierte esta señal?', o: ['Curva a la derecha más adelante', 'Viraje obligatorio a la derecha', 'Desvío a la derecha', 'Prohibido virar a la derecha'] },
          { t: 'mc', sign: 'escolares', q: '¿Qué te advierte esta señal?', o: ['Zona escolar: niños cerca de la vía', 'Paso peatonal con semáforo', 'Calle peatonal', 'Parque sin tránsito de vehículos'] },
          { t: 'mc', sign: 'semaforoAdelante', q: '¿Qué te advierte esta señal?', o: ['Hay un semáforo más adelante', 'Cruce ferroviario', 'Fin de la zona urbana', 'Luces de emergencia obligatorias'] },
          { t: 'mc', sign: 'resalto', q: '¿Qué te advierte esta señal?', o: ['Un resalto o reductor de velocidad (lomo de toro)', 'Pavimento resbaladizo', 'Un puente angosto', 'Una bajada peligrosa'] },
          { t: 'mc', sign: 'cruceFerroviario', q: '¿Qué te advierte esta señal?', o: ['Un cruce ferroviario más adelante', 'Un terminal de buses', 'Una zona industrial', 'Un túnel'] },
          { t: 'mc', sign: 'estrechamiento', q: '¿Qué te advierte esta señal?', o: ['La calzada se angosta', 'Un puente levadizo', 'El fin de la berma', 'Una pista exclusiva'] },
          { t: 'mc', sign: 'animales', q: '¿Qué te advierte esta señal?', o: ['Pueden cruzar animales', 'Hay una feria ganadera', 'Prohibido el paso de animales', 'Zona rural sin límite de velocidad'] },
          { t: 'mc', sign: 'resbaladizo', q: '¿Qué te advierte esta señal?', o: ['Pavimento resbaladizo', 'Curvas sucesivas', 'Prohibido adelantar', 'Zona de derrumbes'] },
          { t: 'mc', q: 'Al ver una señal de advertencia, lo correcto es:', o: ['Reducir la velocidad y aumentar la atención', 'Mantener la velocidad, porque es solo informativa', 'Detenerte por completo', 'Tocar la bocina'] },
          { t: 'match', q: 'Une cada señal con su significado', p: [['sign:cruceVias', 'Cruce de vías'], ['sign:rotondaAdelante', 'Rotonda más adelante'], ['sign:dobleSentido', 'Tránsito en ambos sentidos'], ['sign:ciclistas', 'Ciclistas en la vía']] },
          { t: 'img', q: '¿Cuál señal advierte un paso peatonal más adelante?', o: ['peatones', 'escolares', 'noPeatones', 'paradero'] },
          { t: 'clip', scene: 'tren' },
          { t: 'video', scene: 'tren', at: 2.6, q: 'Las luces destellan y las barreras empiezan a bajar. ¿Qué haces?', o: ['Me detengo antes de la línea y espero a que pase el tren', 'Acelero para cruzar antes de que bajen', 'Paso con cuidado entre las barreras', 'Me detengo sobre la vía a mirar'] },
        ],
      },
      {
        n: 'Informativas y faenas', ic: 'info', items: [
          { t: 'mc', sign: 'estacionamiento', q: '¿Qué indica esta señal?', o: ['Estacionamiento', 'Prohibido estacionar', 'Hospital', 'Escuela'] },
          { t: 'mc', sign: 'hospital', q: '¿Qué indica esta señal?', o: ['Un hospital cercano', 'Un helipuerto', 'Un hotel', 'Una zona de carga'] },
          { t: 'mc', sign: 'paradero', q: '¿Qué indica esta señal?', o: ['Un paradero de buses', 'Un terminal de camiones', 'Una pista solo para buses', 'Un estacionamiento de buses'] },
          { t: 'mc', sign: 'servicentro', q: '¿Qué indica esta señal?', o: ['Un servicentro (estación de combustible)', 'Un taller mecánico', 'Prohibido cargar combustible', 'Una zona industrial'] },
          { t: 'mc', sign: 'hombresTrabajando', q: '¿Qué indica esta señal naranja?', o: ['Trabajos en la vía', 'Una zona de juegos', 'El fin de los trabajos', 'Prohibido el paso de peatones'] },
          { t: 'mc', sign: 'desvio', q: '¿Qué indica esta señal naranja?', o: ['Un desvío por trabajos en la vía', 'Una curva peligrosa permanente', 'El fin de la autopista', 'Una salida de emergencia'] },
          { t: 'tf', q: 'En una zona de faenas debes reducir la velocidad y seguir las indicaciones del personal que dirige el tránsito.', a: true },
          { t: 'sort', q: 'Clasifica cada señal', c: ['Reglamentaria', 'Advertencia', 'Informativa'], k: [['sign:pare', 0], ['sign:curvaIzq', 1], ['sign:hospital', 2], ['sign:noAdelantar', 0], ['sign:resalto', 1], ['sign:estacionamiento', 2]] },
          { t: 'mc', sign: 'alturaMax', q: '¿Qué indica esta señal?', o: ['La altura máxima permitida de los vehículos', 'La profundidad del agua', 'El ancho de la calzada', 'La distancia al próximo cruce'] },
          { t: 'mc', sign: 'pesoMax', q: '¿Qué indica esta señal?', o: ['El peso máximo permitido', 'La velocidad máxima para camiones', 'La distancia mínima entre camiones', 'La carga mínima obligatoria'] },
          { t: 'img', q: '¿Cuál señal indica un lugar para estacionar?', o: ['estacionamiento', 'noEstacionar', 'hospital', 'paradero'] },
        ],
      },
    ],
  });

  RB.unit('sem', {
    name: 'Semáforos y demarcaciones', desc: 'Luces, líneas en el pavimento y prioridad entre señales.', ic: 'light',
    lessons: [
      {
        n: 'Semáforos', ic: 'light', items: [
          { t: 'clip', scene: 'amarilla' },
          { t: 'mc', q: 'La luz amarilla del semáforo indica que debes:', o: ['Detenerte, salvo que estés tan cerca que no puedas hacerlo con seguridad', 'Acelerar para alcanzar a pasar', 'Seguir siempre, porque aún no es roja', 'Detenerte en medio del cruce'] },
          { t: 'mc', q: 'Con luz roja debes:', o: ['Detenerte antes de la línea de detención y esperar la luz verde', 'Pasar si no viene nadie', 'Virar a la derecha libremente', 'Detenerte sobre el paso peatonal'] },
          { t: 'mc', q: 'Una luz roja intermitente equivale a:', o: ['Una señal PARE', 'Una señal Ceda el paso', 'Paso libre', 'Un semáforo en mantención, sin reglas'] },
          { t: 'mc', q: 'Una luz amarilla intermitente significa:', o: ['Avanzar con precaución', 'Detención obligatoria', 'Prohibido avanzar', 'Solo pueden pasar los buses'] },
          { t: 'tf', q: 'Con luz verde puedes entrar al cruce aunque al otro lado no haya espacio para salir de él.', a: false, e: 'Nunca entres a un cruce si vas a quedar detenido dentro, bloqueándolo.' },
          { t: 'tf', q: 'Con luz verde, al virar debes ceder el paso a los peatones que cruzan la calle hacia la que viras.', a: true },
          { t: 'video', scene: 'amarilla', at: 2.3, q: 'La luz cambió a amarillo y aún puedes frenar con seguridad. ¿Qué haces?', o: ['Me detengo antes de la línea', 'Acelero para pasar antes del rojo', 'Toco la bocina y sigo', 'Me detengo sobre el paso de cebra'] },
          { t: 'sort', q: '¿Qué haces ante cada luz?', c: ['Detenerse', 'Avanzar con precaución'], k: [['Luz roja', 0], ['Luz roja intermitente', 0], ['Luz amarilla intermitente', 1], ['Luz verde', 1], ['Flecha verde hacia tu dirección', 1]] },
        ],
      },
      {
        n: 'Demarcaciones', ic: 'road', items: [
          { t: 'mc', q: 'Una línea continua en el centro de la calzada indica que:', o: ['No puedes cruzarla ni adelantar sobre ella', 'Puedes adelantar con precaución', 'Es el borde de una ciclovía', 'Es una zona de estacionamiento'] },
          { t: 'mc', q: 'Una línea discontinua (segmentada) en el centro de la calzada indica que:', o: ['Puedes cruzarla para adelantar cuando sea seguro', 'Está prohibido adelantar', 'Debes detenerte', 'La vía termina'] },
          { t: 'tf', q: 'Si hay una línea continua junto a una discontinua, puedes cruzarlas para adelantar si la discontinua está de tu lado.', a: true, e: 'Manda la línea que está más cerca de tu pista.' },
          { t: 'mc', q: 'La línea de detención (línea blanca transversal) indica:', o: ['Dónde debes detenerte ante un PARE o una luz roja', 'El inicio de una zona de estacionamiento', 'Un resalto', 'El fin de la ciudad'] },
          { t: 'mc', q: 'Las flechas pintadas en una pista indican:', o: ['Las direcciones que puedes tomar desde esa pista', 'La velocidad recomendada', 'Un desvío temporal', 'Que puedes estacionar'] },
          { t: 'mc', q: 'El paso de cebra (franjas blancas paralelas) indica:', o: ['Un cruce donde los peatones tienen preferencia', 'Una zona para detener buses', 'Un resalto', 'Una ciclovía'] },
          { t: 'tf', q: 'Puedes detenerte sobre un paso de cebra si hay un taco.', a: false, e: 'Detente antes del paso peatonal, nunca sobre él.' },
          { t: 'match', q: 'Une cada demarcación con su significado', p: [['Línea continua', 'No se puede cruzar'], ['Línea discontinua', 'Se puede cruzar con precaución'], ['Línea de detención', 'Detenerse antes de ella'], ['Paso de cebra', 'Preferencia del peatón']] },
        ],
      },
      {
        n: 'Prioridad entre señales', ic: 'stop', items: [
          { t: 'mc', q: 'En un cruce hay un semáforo funcionando y además una señal PARE. ¿Qué obedeces?', o: ['El semáforo', 'La señal PARE', 'Ninguno de los dos', 'El que prefieras'], e: 'El semáforo tiene prioridad sobre las señales verticales.' },
          { t: 'mc', q: 'Si el semáforo está apagado y hay una señal PARE para ti:', o: ['Respetas la señal PARE', 'Pasas libremente', 'Tocas la bocina y pasas', 'Esperas a que se encienda'] },
          { t: 'tf', q: 'Las demarcaciones del pavimento tienen prioridad sobre las señales verticales.', a: false, e: 'El orden es: Carabineros, semáforos, señales verticales y, al final, demarcaciones.' },
          { t: 'clip', scene: 'pare' },
          { t: 'video', scene: 'pare', at: 3.9, q: '¿Qué debes hacer ahora?', o: ['Detenerme por completo antes de la línea', 'Pasar lento sin detenerme', 'Detenerme sobre el paso de cebra', 'Acelerar antes de que llegue el otro auto'] },
          { t: 'video', scene: 'ceda', at: 2.8, q: 'Tienes señal Ceda el paso y vienen autos por la otra vía. ¿Qué haces?', o: ['Me detengo y los dejo pasar', 'Paso primero porque llegué antes', 'Toco la bocina para que frenen', 'Acelero para cruzar antes'] },
          { t: 'mc', q: 'Ante una señal Ceda el paso:', o: ['Te detienes solo si es necesario para no interferir con otros vehículos', 'Te detienes siempre por completo', 'Tienes preferencia sobre los demás', 'Debes tocar la bocina'] },
        ],
      },
    ],
  });

  RB.unit('nor', {
    name: 'Normas de circulación', desc: 'Velocidad, adelantamiento, virajes, estacionamiento y luces.', ic: 'road',
    lessons: [
      {
        n: 'Velocidad', ic: 'speed', items: [
          { t: 'mc', q: 'En zona urbana, salvo señal distinta, la velocidad máxima es:', o: ['50 km/h', '60 km/h', '40 km/h', '70 km/h'], e: 'Desde 2018 el límite general en zonas urbanas es 50 km/h.' },
          { t: 'num', q: 'Velocidad máxima en zona urbana, sin señal distinta', a: 50, u: 'km/h', min: 10, max: 130, step: 10 },
          { t: 'mc', q: 'En caminos rurales, salvo señal distinta, la velocidad máxima para un automóvil es:', o: ['100 km/h', '120 km/h', '80 km/h', '90 km/h'] },
          { t: 'num', q: 'Velocidad máxima de un automóvil en autopista, sin señal distinta', a: 120, u: 'km/h', min: 60, max: 160, step: 10 },
          { t: 'tf', q: 'Puedes ir a la velocidad máxima aunque haya neblina, porque es el límite legal.', a: false, e: 'Debes conducir a una velocidad razonable y prudente según las condiciones. El límite es un máximo, no una meta.' },
          { t: 'mc', q: '¿Por qué los límites de velocidad son más bajos en la ciudad?', o: ['Porque hay más peatones, ciclistas y cruces, y un choque a menor velocidad es menos grave', 'Solo para ahorrar combustible', 'Porque las calles son más angostas', 'Para reducir el ruido'] },
          { t: 'tf', q: 'Conducir demasiado lento sin motivo, entorpeciendo el tránsito, también puede ser una infracción.', a: true },
          { t: 'mc', q: 'Si duplicas la velocidad, la distancia de frenado aproximadamente:', o: ['Se multiplica por cuatro', 'Se duplica', 'Se mantiene igual', 'Se reduce a la mitad'], e: 'La distancia de frenado crece con el cuadrado de la velocidad.' },
          { t: 'fill', q: 'Completa la frase', s: 'En zona urbana, la velocidad máxima general es de ___ km/h.', o: ['50', '60', '70'] },
        ],
      },
      {
        n: 'Adelantar', ic: 'overtake', items: [
          { t: 'clip', scene: 'adelantar' },
          { t: 'mc', q: 'Por regla general, debes adelantar por:', o: ['La izquierda', 'La derecha', 'La berma', 'Cualquier lado si hay espacio'] },
          { t: 'multi', q: 'Selecciona los lugares donde está prohibido adelantar', o: ['En curvas sin visibilidad', 'En pasos peatonales', 'En cruces de calles', 'En una recta con línea discontinua y buena visibilidad', 'En la cima de una cuesta'], a: [0, 1, 2, 4] },
          { t: 'video', scene: 'adelantar', at: 4.4, q: '¿Puedes adelantar ahora?', o: ['No: hay línea continua y viene un vehículo de frente', 'Sí, si acelero fuerte', 'Sí, porque el auto de adelante va lento', 'Sí, usando la berma'] },
          { t: 'tf', q: 'Cuando otro vehículo te está adelantando, no debes aumentar tu velocidad.', a: true },
          { t: 'mc', q: '¿Cuándo puedes adelantar por la derecha?', o: ['Cuando el vehículo de adelante va a virar a la izquierda y hay espacio seguro', 'Siempre que la pista derecha esté libre en una calle de doble sentido', 'Usando la berma en la carretera', 'Nunca, en ninguna circunstancia'] },
          { t: 'order', q: 'Ordena los pasos para adelantar', o: ['Comprobar que hay visibilidad y que la pista contraria está despejada', 'Mirar los espejos y señalizar a la izquierda', 'Adelantar sin demorar', 'Señalizar a la derecha y volver a tu pista cuando veas al vehículo por el retrovisor'] },
          { t: 'tf', q: 'Está permitido adelantar a un vehículo que se detuvo para dejar cruzar a un peatón.', a: false },
        ],
      },
      {
        n: 'Virajes y estacionamiento', ic: 'cross', items: [
          { t: 'mc', q: 'Para virar a la derecha debes:', o: ['Señalizar con anticipación y ubicarte en la pista derecha', 'Ubicarte en la pista izquierda', 'Virar desde cualquier pista', 'Señalizar solo si viene alguien'] },
          { t: 'mc', q: 'Para virar a la izquierda en una calle de doble sentido debes ubicarte:', o: ['Junto al eje central de la calzada', 'Junto a la solera derecha', 'En la berma', 'En la pista contraria'] },
          { t: 'tf', q: 'Debes usar el intermitente aunque no veas otros vehículos cerca.', a: true, e: 'Peatones y ciclistas también necesitan saber qué harás.' },
          { t: 'mc', q: 'En una vía con dos o más pistas por sentido, la pista izquierda se usa principalmente para:', o: ['Adelantar o virar a la izquierda', 'Circular a la menor velocidad posible', 'Estacionar', 'Detenerse en caso de duda'] },
          { t: 'multi', q: '¿Dónde está prohibido estacionar?', o: ['Sobre la vereda', 'En doble fila', 'Frente a la entrada de un garaje', 'En un paso peatonal', 'En un lugar con la señal de estacionamiento'], a: [0, 1, 2, 3] },
          { t: 'mc', q: 'Para estacionar en bajada junto a la solera, las ruedas delanteras deben quedar:', o: ['Giradas hacia la solera', 'Rectas', 'Giradas hacia la calzada', 'Da lo mismo'] },
          { t: 'mc', q: 'Para estacionar en subida junto a la solera, las ruedas delanteras deben quedar:', o: ['Giradas hacia la calzada, lejos de la solera', 'Giradas hacia la solera', 'Rectas', 'Da lo mismo'] },
          { t: 'tf', q: 'Antes de abrir la puerta de tu auto estacionado, debes mirar si se acercan ciclistas o vehículos.', a: true },
          { t: 'mc', q: 'Retroceder (marcha atrás) en la vía pública:', o: ['Se permite solo en distancias cortas y sin poner en peligro a nadie', 'Está permitido por cualquier distancia', 'Se permite en autopistas si te pasaste de la salida', 'Está prohibido siempre'] },
        ],
      },
      {
        n: 'Luces y autopistas', ic: 'eye', items: [
          { t: 'mc', q: 'Las luces altas debes cambiarlas a bajas cuando:', o: ['Te cruzas con otro vehículo o vas detrás de uno', 'Entras a una recta', 'Llueve sin viento', 'Vas solo por la carretera de noche'] },
          { t: 'mc', q: 'Con neblina debes usar:', o: ['Luces bajas y neblineros, si los tienes', 'Luces altas', 'Solo las luces de estacionamiento', 'Ninguna luz, para no encandilar'] },
          { t: 'tf', q: 'Las luces de emergencia sirven para advertir que tu vehículo está detenido por una emergencia o un peligro.', a: true },
          { t: 'mc', q: 'La bocina se debe usar:', o: ['Solo para advertir un peligro y evitar un accidente', 'Para saludar', 'Para apurar al vehículo de adelante', 'Siempre al salir de un estacionamiento'] },
          { t: 'tf', q: 'Si un vehículo te encandila de noche, conviene mirar hacia el borde derecho de la calzada y reducir la velocidad.', a: true },
          { t: 'tf', q: 'Puedes circular por la berma para adelantar a una fila de vehículos lentos.', a: false },
          { t: 'mc', q: 'Al entrar a una autopista desde la vía de aceleración debes:', o: ['Acelerar hasta una velocidad similar al tránsito y ceder el paso a quienes circulan', 'Detenerte siempre al final de la vía de aceleración', 'Entrar lento para que te vean', 'Entrar sin mirar, porque tienes preferencia'] },
          { t: 'tf', q: 'En autopistas está prohibido detenerse en la pista, salvo emergencias.', a: true },
        ],
      },
    ],
  });

  RB.unit('pre', {
    name: 'Preferencia de paso', desc: 'Cruces, rotondas, peatones y vehículos de emergencia.', ic: 'cross',
    lessons: [
      {
        n: 'Cruces', ic: 'cross', items: [
          { t: 'clip', scene: 'derecha' },
          { t: 'mc', q: 'En un cruce sin señales ni semáforo, si dos vehículos llegan al mismo tiempo, tiene preferencia:', o: ['El que viene por la derecha', 'El que viene por la izquierda', 'El más grande', 'El que va más rápido'] },
          { t: 'tap', scene: 'derecha', at: 3.8, q: 'Toca el vehículo que debe pasar primero', a: 'b', ids: ['ego', 'b'] },
          { t: 'video', scene: 'derecha', at: 3.6, q: '¿Quién debe pasar primero?', o: ['El auto blanco, porque viene por tu derecha', 'Tú, porque vas derecho', 'El que toque la bocina primero', 'El que frene último'] },
          { t: 'tf', q: 'Un vehículo que sale de un estacionamiento, garaje o propiedad privada debe ceder el paso a los que circulan por la vía.', a: true },
          { t: 'mc', q: 'Llegas a un cruce con señal PARE para ti y la otra vía no tiene señal. ¿Qué haces?', o: ['Me detengo y cedo el paso a todos los que circulan por la otra vía', 'Paso primero si vengo por la derecha', 'Pasa primero el que llegue antes', 'Toco la bocina y paso'] },
          { t: 'tf', q: 'Quien circula por un camino de tierra debe ceder el paso al que circula por un camino pavimentado.', a: true },
          { t: 'mc', q: 'Al virar a la izquierda en un cruce con luz verde, debes ceder el paso a:', o: ['Los vehículos que vienen de frente y los peatones', 'Nadie, porque tienes luz verde', 'Solo a los buses', 'Solo a los ciclistas'] },
        ],
      },
      {
        n: 'Rotondas', ic: 'round', items: [
          { t: 'clip', scene: 'rotonda' },
          { t: 'mc', q: 'En una rotonda tienen preferencia:', o: ['Los vehículos que ya circulan dentro de ella', 'Los que quieren entrar', 'Los vehículos más grandes', 'Los que vienen por la derecha para entrar'] },
          { t: 'video', scene: 'rotonda', at: 3.4, q: 'El auto blanco circula dentro de la rotonda. ¿Qué haces?', o: ['Espero y le cedo el paso', 'Entro primero porque llegué antes', 'Toco la bocina para que me deje pasar', 'Entro rápido aprovechando el espacio'] },
          { t: 'tap', scene: 'rotonda', at: 3.3, q: 'Toca el vehículo que tiene preferencia', a: 'w1', ids: ['ego', 'w1'], r: 'El auto blanco: ya circula dentro de la rotonda.' },
          { t: 'mc', q: 'En Chile, el sentido de circulación en las rotondas es:', o: ['Contrario a los punteros del reloj', 'A favor de los punteros del reloj', 'Depende de cada rotonda', 'Libre'] },
          { t: 'tf', q: 'Al salir de una rotonda debes señalizar con el intermitente derecho.', a: true },
          { t: 'order', q: 'Ordena cómo pasar por una rotonda', o: ['Reducir la velocidad al acercarte', 'Ceder el paso a quienes circulan dentro', 'Entrar y circular en sentido contrario a los punteros del reloj', 'Señalizar a la derecha y salir'] },
          { t: 'tf', q: 'Dentro de una rotonda conviene detenerse para dejar entrar a otros vehículos.', a: false, e: 'Detenerte sin necesidad dentro de la rotonda puede causar choques por alcance. Quienes entran deben esperar un espacio.' },
          { t: 'fill', q: 'Completa la frase', s: 'En una rotonda tienen preferencia los vehículos que ___.', o: ['circulan dentro de ella', 'quieren entrar', 'van más rápido'] },
        ],
      },
      {
        n: 'Peatones y emergencias', ic: 'ped', items: [
          { t: 'clip', scene: 'cebra' },
          { t: 'mc', q: 'En un paso de cebra sin semáforo, un peatón comienza a cruzar. Tú:', o: ['Te detienes y le cedes el paso', 'Pasas si alcanzas antes de que llegue a tu pista', 'Tocas la bocina para avisarle', 'Lo esquivas por detrás'] },
          { t: 'video', scene: 'cebra', at: 3, q: '¿Qué debes hacer?', o: ['Detenerme antes de la franja y dejar cruzar al peatón', 'Pasar antes de que llegue a mi pista', 'Tocar la bocina', 'Adelantar por la izquierda'] },
          { t: 'tap', scene: 'cebra', at: 2.9, q: 'Toca a quien tiene preferencia', a: 'ped', ids: ['ego', 'ped', 'w'], r: 'El peatón que cruza por el paso de cebra.' },
          { t: 'tf', q: 'Al virar en un cruce, los peatones que cruzan la calle a la que entras tienen preferencia.', a: true },
          { t: 'clip', scene: 'emergencia' },
          { t: 'mc', q: 'Escuchas la sirena de una ambulancia que se acerca por detrás. ¿Qué haces?', o: ['Me orillo a la derecha, reduzco la velocidad o me detengo y la dejo pasar', 'Acelero para que no me alcance', 'Freno bruscamente en medio de la pista', 'Sigo igual: ella debe esperar'] },
          { t: 'tf', q: 'Un vehículo de emergencia con balizas y sirena encendidas tiene preferencia de paso.', a: true },
          { t: 'mc', q: 'Cuando un furgón escolar se detiene a dejar niños, lo más seguro es:', o: ['Reducir la velocidad y extremar la precaución por niños que puedan cruzar', 'Adelantarlo rápido', 'Tocar la bocina para que avance', 'Mantener la velocidad'] },
          { t: 'tf', q: 'Los adultos mayores, los niños y las personas con discapacidad pueden cruzar más lento o de forma imprevista: requieren especial atención.', a: true },
        ],
      },
    ],
  });

  RB.unit('vul', {
    name: 'Usuarios vulnerables', desc: 'Ciclistas, peatones, niños, motos y vehículos grandes.', ic: 'bike',
    lessons: [
      {
        n: 'Ciclistas', ic: 'bike', items: [
          { t: 'clip', scene: 'ciclista' },
          { t: 'mc', q: 'Al adelantar a un ciclista debes dejar una distancia lateral mínima de:', o: ['1,5 metros', '50 centímetros', '1 metro', '30 centímetros'], e: 'La Ley de Convivencia Vial exige al menos 1,5 metros.' },
          { t: 'num', q: 'Distancia lateral mínima al adelantar a un ciclista', a: 1.5, u: 'm', min: .5, max: 3, step: .5 },
          { t: 'tf', q: 'Si no hay ciclovía, los ciclistas pueden circular por la calzada y debes respetarlos como a cualquier vehículo.', a: true },
          { t: 'img', q: '¿Cuál señal advierte la presencia de ciclistas?', o: ['ciclistas', 'noBicicletas', 'peatones', 'escolares'] },
          { t: 'mc', q: 'Antes de abrir la puerta de tu auto estacionado debes:', o: ['Mirar por el espejo y sobre tu hombro si viene un ciclista o un vehículo', 'Abrirla rápido para bajar pronto', 'Tocar la bocina', 'Abrirla hasta la mitad sin mirar'] },
          { t: 'tf', q: 'Al virar a la derecha, debes cuidar que no venga un ciclista por tu derecha.', a: true },
          { t: 'tf', q: 'Estacionar sobre una ciclovía está permitido si es por pocos minutos.', a: false },
          { t: 'fill', q: 'Completa la frase', s: 'Al adelantar a un ciclista deja al menos ___ de distancia lateral.', o: ['1,5 metros', '50 centímetros', '30 centímetros'] },
        ],
      },
      {
        n: 'Peatones y niños', ic: 'child', items: [
          { t: 'mc', q: 'Cerca de los colegios, lo más importante es:', o: ['Reducir la velocidad y estar atento a niños que crucen de improviso', 'Tocar la bocina para avisar', 'Mantener la velocidad máxima de la vía', 'Adelantar a los buses detenidos'] },
          { t: 'tf', q: 'Si ves una pelota cruzar la calle, debes prepararte para frenar: un niño puede aparecer detrás.', a: true },
          { t: 'hazard', scene: 'h-pelota' },
          { t: 'mc', q: 'Un peatón con bastón blanco es una persona:', o: ['Con discapacidad visual', 'Adulta mayor que pide ayuda', 'Que quiere detener un taxi', 'Que trabaja en la vía'] },
          { t: 'tf', q: 'De noche, los peatones con ropa oscura son muy difíciles de ver.', a: true },
          { t: 'mc', q: 'Al pasar junto a un bus detenido en un paradero:', o: ['Reduces la velocidad: puede cruzar un peatón por delante del bus', 'Aceleras para pasar rápido', 'Tocas la bocina para avisar', 'Lo adelantas por la derecha'] },
          { t: 'hazard', scene: 'h-bus' },
          { t: 'sort', q: '¿Correcto o incorrecto?', c: ['Correcto', 'Incorrecto'], k: [['Detenerte para que cruce un peatón en el paso de cebra', 0], ['Tocar la bocina a un adulto mayor que cruza lento', 1], ['Reducir la velocidad cerca de un colegio', 0], ['Pasar a un auto detenido ante un paso peatonal', 1]] },
        ],
      },
      {
        n: 'Motos y vehículos grandes', ic: 'truck', items: [
          { t: 'tf', q: 'Las motos son más difíciles de ver: antes de cambiar de pista revisa el espejo y el punto ciego.', a: true },
          { t: 'mc', q: 'Los camiones y buses tienen zonas ciegas. Si no ves los espejos del camión:', o: ['Su conductor tampoco te ve', 'Te ve siempre por una cámara', 'Estás en la posición más segura', 'Debes tocar la bocina y quedarte ahí'] },
          { t: 'clip', scene: 'puntociego' },
          { t: 'tf', q: 'Un camión que vira a la derecha puede abrirse primero hacia la izquierda: no te ubiques a su derecha.', a: true },
          { t: 'mc', q: 'Cuando un vehículo largo vira:', o: ['Sus ruedas traseras pasan más cerca de la esquina que las delanteras', 'Sus ruedas traseras siguen exactamente a las delanteras', 'Siempre vira por la izquierda', 'Necesita menos espacio que un auto'] },
          { t: 'hazard', scene: 'h-ciclista' },
          { t: 'tf', q: 'Como una moto frena en poca distancia, puedes ir más pegado a ella.', a: false, e: 'Mantén siempre una distancia segura: una moto puede frenar o caer de improviso.' },
        ],
      },
    ],
  });

  RB.unit('rie', {
    name: 'Factores de riesgo', desc: 'Alcohol, drogas, distracciones, fatiga y velocidad.', ic: 'glass',
    lessons: [
      {
        n: 'Alcohol y drogas', ic: 'glass', items: [
          { t: 'mc', q: 'Se conduce "bajo la influencia del alcohol" cuando la concentración en la sangre es:', o: ['Superior a 0,3 e inferior a 0,8 gramos por litro', 'Superior a 0,8 gramos por litro', 'Superior a 1,5 gramos por litro', 'Cualquier valor sobre 0,1 gramos por litro'], e: 'Así lo establece la Ley de Tolerancia Cero.' },
          { t: 'mc', q: 'Se considera "estado de ebriedad" desde:', o: ['0,8 gramos de alcohol por litro de sangre', '0,3 gramos por litro', '0,5 gramos por litro', '1,2 gramos por litro'] },
          { t: 'num', q: '¿Desde cuántos gramos por litro de sangre se considera estado de ebriedad?', a: .8, u: 'g/l', min: 0, max: 2, step: .1 },
          { t: 'tf', q: 'El café, una ducha fría o comer algo eliminan el alcohol más rápido.', a: false, e: 'Solo el tiempo permite que el cuerpo elimine el alcohol.' },
          { t: 'tf', q: 'Conducir bajo el efecto de drogas se sanciona con la misma severidad que conducir con alcohol.', a: true },
          { t: 'mc', q: 'Si un conductor ebrio causa la muerte de una persona, la Ley Emilia establece, entre otras sanciones:', o: ['Al menos un año de cárcel efectiva y la pérdida de la licencia de por vida', 'Solo una multa', 'La suspensión de la licencia por un mes', 'Trabajos comunitarios sin cárcel'] },
          { t: 'mc', q: '¿Qué efecto produce el alcohol al conducir?', o: ['Aumenta el tiempo de reacción y da una falsa sensación de seguridad', 'Mejora los reflejos', 'Mejora la visión nocturna', 'Solo da sueño, sin otros efectos'] },
          { t: 'mc', q: 'Si vas a beber alcohol en una celebración, lo responsable es:', o: ['No conducir: usar transporte público, taxi o un conductor designado que no beba', 'Esperar 15 minutos y manejar', 'Manejar más lento', 'Tomar café antes de manejar'] },
          { t: 'tf', q: 'Algunos medicamentos afectan la capacidad para conducir: lee las advertencias o consulta a un médico.', a: true },
          { t: 'fill', q: 'Completa la frase', s: 'Desde ___ gramos de alcohol por litro de sangre se considera estado de ebriedad.', o: ['0,8', '0,3', '1,5'] },
        ],
      },
      {
        n: 'Distracciones', ic: 'phone', items: [
          { t: 'tf', q: 'Puedes usar el celular con la mano mientras conduces si vas a baja velocidad.', a: false, e: 'Está prohibido manipular el celular al conducir. Solo se permiten sistemas de manos libres que no requieran tomarlo.' },
          { t: 'mc', q: 'Mirar el celular 2 segundos a 50 km/h equivale a recorrer a ciegas aproximadamente:', o: ['28 metros', '5 metros', '10 metros', '100 metros'], e: 'A 50 km/h recorres cerca de 14 metros por segundo.' },
          { t: 'num', q: 'A 100 km/h, ¿cuántos metros recorres aproximadamente en 1 segundo?', a: 28, u: 'm', min: 5, max: 60, step: 1, tol: 1 },
          { t: 'multi', q: 'Selecciona las distracciones peligrosas al conducir', o: ['Escribir un mensaje', 'Programar el GPS en marcha', 'Comer mientras conduces', 'Mirar la vía y los espejos', 'Discutir con los pasajeros'], a: [0, 1, 2, 4] },
          { t: 'tf', q: 'Aunque estés detenido en un semáforo, no debes usar el celular con la mano: sigues conduciendo.', a: true },
          { t: 'mc', q: 'Si necesitas hacer una llamada urgente y no tienes manos libres:', o: ['Te detienes en un lugar seguro y permitido para hacerla', 'Llamas a baja velocidad', 'Usas el altavoz sosteniendo el teléfono', 'Esperas una luz roja'] },
          { t: 'tf', q: 'Los audífonos te aíslan de sirenas, bocinas y otros sonidos importantes del tránsito.', a: true },
        ],
      },
      {
        n: 'Fatiga y sueño', ic: 'moon', items: [
          { t: 'mc', q: 'En un viaje largo se recomienda descansar al menos cada:', o: ['2 horas', '6 horas', '30 minutos', 'Solo al llegar'] },
          { t: 'mc', q: 'Si sientes sueño mientras conduces, lo más seguro es:', o: ['Detenerte en un lugar seguro y descansar', 'Bajar la ventana y seguir', 'Subir el volumen de la música', 'Acelerar para llegar antes'] },
          { t: 'tf', q: 'Un microsueño de pocos segundos a alta velocidad puede significar recorrer decenas de metros sin control.', a: true },
          { t: 'multi', q: 'Selecciona las señales de fatiga', o: ['Bostezar seguido', 'Parpadear seguido y sentir los ojos pesados', 'No recordar los últimos kilómetros', 'Sentirse descansado y atento', 'Salirse levemente de la pista'], a: [0, 1, 2, 4] },
          { t: 'tf', q: 'La madrugada y la hora después de almuerzo son momentos de mayor riesgo de sueño.', a: true },
          { t: 'mc', q: 'Antes de un viaje largo, lo ideal es:', o: ['Dormir bien la noche anterior y planificar descansos', 'Salir de noche después de trabajar todo el día', 'Tomar bebidas energéticas en vez de dormir', 'Manejar sin parar para llegar antes'] },
        ],
      },
      {
        n: 'Velocidad y frenado', ic: 'speed', items: [
          { t: 'clip', scene: 'frenado' },
          { t: 'mc', q: 'El tiempo de reacción de un conductor atento es de aproximadamente:', o: ['1 segundo', '5 segundos', '0,1 segundos', '10 segundos'] },
          { t: 'mc', q: 'La distancia total de detención es:', o: ['La distancia de reacción más la distancia de frenado', 'Solo la distancia de frenado', 'La distancia hasta el auto de adelante', 'La mitad de la velocidad, en metros'] },
          { t: 'tf', q: 'A mayor velocidad, el campo visual del conductor se reduce (efecto túnel).', a: true },
          { t: 'num', q: 'Si a 50 km/h necesitas unos 14 m para frenar (sin contar la reacción), ¿cuántos metros necesitas a 100 km/h?', a: 56, u: 'm', min: 14, max: 112, step: 14, e: 'Al duplicar la velocidad, la distancia de frenado se multiplica por cuatro.' },
          { t: 'tf', q: 'Un choque a 100 km/h tiene cuatro veces más energía que uno a 50 km/h.', a: true },
          { t: 'mc', q: '¿Cuál de estos factores NO aumenta la distancia de frenado?', o: ['Llevar los neumáticos bien inflados y con buen dibujo', 'El pavimento mojado', 'Los neumáticos gastados', 'Una mayor velocidad'] },
        ],
      },
    ],
  });

  RB.unit('seg', {
    name: 'Seguridad a bordo', desc: 'Cinturón, apoyacabezas, airbag y niños en el auto.', ic: 'shield',
    lessons: [
      {
        n: 'Cinturón y airbag', ic: 'shield', items: [
          { t: 'tf', q: 'El cinturón de seguridad es obligatorio para todos los ocupantes, también en los asientos traseros.', a: true },
          { t: 'mc', q: 'El cinturón bien puesto pasa:', o: ['Sobre el hombro y el pecho, y la banda baja sobre las caderas', 'Por el cuello y el abdomen', 'Bajo el brazo', 'Detrás de la espalda'] },
          { t: 'tf', q: 'En trayectos cortos dentro de la ciudad no es necesario el cinturón.', a: false },
          { t: 'mc', q: 'El apoyacabezas debe quedar:', o: ['A la altura de la parte superior de la cabeza', 'A la altura del cuello', 'A la altura de los hombros', 'Lo más bajo posible'] },
          { t: 'tf', q: 'Un pasajero trasero sin cinturón puede lesionar gravemente a quien va adelante en un choque.', a: true },
          { t: 'mc', q: 'El airbag:', o: ['Complementa al cinturón, pero no lo reemplaza', 'Reemplaza al cinturón', 'Solo funciona si no llevas cinturón', 'Protege a los bebés en sillas mirando hacia atrás'] },
        ],
      },
      {
        n: 'Niños a bordo', ic: 'child', items: [
          { t: 'mc', q: 'Los menores de 12 años deben viajar:', o: ['En el asiento trasero', 'Adelante, si llevan cinturón', 'En brazos de un adulto', 'Donde haya espacio'] },
          { t: 'mc', q: 'Los niños deben usar silla o alzador (sistema de retención infantil) hasta:', o: ['Los 9 años, salvo que ya midan 1,35 m o pesen 33 kg', 'Los 2 años', 'Los 5 años', 'Los 14 años'] },
          { t: 'tf', q: 'Un bebé en una silla mirando hacia atrás nunca debe ir en un asiento con airbag frontal activado.', a: true },
          { t: 'tf', q: 'Llevar a un niño en brazos es seguro si el adulto usa cinturón.', a: false, e: 'En un choque, el peso del niño se multiplica y es imposible sujetarlo.' },
          { t: 'mc', q: '¿Cuál es el lugar más seguro para la silla de un niño pequeño?', o: ['El asiento trasero, bien anclada según el fabricante', 'El asiento delantero', 'El maletero', 'Las piernas de un adulto'] },
          { t: 'sort', q: '¿Correcto o incorrecto?', c: ['Correcto', 'Incorrecto'], k: [['Niño de 6 años en alzador, atrás', 0], ['Bebé en brazos, adelante', 1], ['Niño de 10 años con cinturón, atrás', 0], ['Niño de 8 años adelante y sin silla', 1]] },
          { t: 'tf', q: 'Nunca dejes a un niño solo dentro de un vehículo, ni siquiera por unos minutos.', a: true },
          { t: 'fill', q: 'Completa la frase', s: 'Los menores de ___ años deben viajar en el asiento trasero.', o: ['12', '6', '16'] },
        ],
      },
    ],
  });

  RB.unit('def', {
    name: 'Conducción defensiva', desc: 'Distancia, anticipación, clima adverso y puntos ciegos.', ic: 'eye',
    lessons: [
      {
        n: 'Distancia y anticipación', ic: 'eye', items: [
          { t: 'clip', scene: 'distancia' },
          { t: 'mc', q: 'Para mantener una distancia segura con el vehículo de adelante, deja:', o: ['Al menos 2 a 3 segundos de separación', 'Un metro por cada 10 km/h', 'Lo menos posible, para que no se metan', 'El largo de un auto a cualquier velocidad'] },
          { t: 'tf', q: 'Con lluvia o neblina debes aumentar la distancia con el vehículo de adelante.', a: true },
          { t: 'hazard', scene: 'h-frenazo' },
          { t: 'mc', q: 'Conducir a la defensiva significa:', o: ['Anticiparte a los errores de otros y a los peligros para evitar accidentes', 'Defender tu preferencia siempre', 'Conducir rápido para salir de los peligros', 'Tocar la bocina ante cualquier error ajeno'] },
          { t: 'tf', q: 'Si alguien te sigue muy de cerca, conviene aumentar la distancia con el de adelante para frenar con más suavidad.', a: true },
          { t: 'hazard', scene: 'h-cruce' },
          { t: 'fill', q: 'Completa la frase', s: 'Mantén al menos ___ segundos de distancia con el vehículo de adelante.', o: ['2 a 3', '0,5', '10'] },
        ],
      },
      {
        n: 'Lluvia, neblina y noche', ic: 'rain', items: [
          { t: 'mc', q: 'Si tu vehículo hace hidroplaneo (pierde contacto con el pavimento por el agua):', o: ['Sueltas el acelerador con suavidad y mantienes el volante firme y recto, sin frenar bruscamente', 'Frenas a fondo', 'Giras el volante rápidamente', 'Aceleras para salir del agua'] },
          { t: 'tf', q: 'Los primeros minutos de lluvia son especialmente peligrosos porque el agua se mezcla con aceite y polvo del pavimento.', a: true },
          { t: 'mc', q: 'Si la parte trasera del vehículo patina (derrapa) hacia la derecha:', o: ['Giras el volante con suavidad hacia la derecha, hacia donde se va la parte trasera', 'Giras el volante con fuerza hacia la izquierda', 'Frenas a fondo', 'Sueltas el volante'] },
          { t: 'mc', q: 'Con frenos ABS, en una frenada de emergencia debes:', o: ['Pisar el freno con fuerza y mantenerlo, esquivando si es necesario', 'Bombear el pedal', 'Frenar suave para no activar el ABS', 'Usar solo el freno de mano'] },
          { t: 'tf', q: 'Con neblina densa, las luces altas mejoran la visibilidad.', a: false, e: 'La luz alta se refleja en la neblina y encandila. Usa luces bajas y neblineros.' },
          { t: 'mc', q: 'De noche, lo correcto es:', o: ['Ir a una velocidad que te permita detenerte dentro de la distancia que iluminan tus luces', 'Ir más rápido porque hay menos tránsito', 'Usar siempre luces altas', 'Llevar la luz interior encendida'] },
          { t: 'tf', q: 'En bajadas largas conviene usar el freno motor (un cambio más bajo) y no solo el freno de pie.', a: true },
          { t: 'tf', q: 'Bajar una cuesta en neutro ahorra combustible y es seguro.', a: false, e: 'En neutro pierdes el freno motor y el control del vehículo.' },
        ],
      },
      {
        n: 'Espejos y puntos ciegos', ic: 'eye', items: [
          { t: 'mc', q: 'Antes de cambiarte de pista debes:', o: ['Mirar los espejos, revisar el punto ciego girando la cabeza y señalizar', 'Señalizar y cambiarte de inmediato', 'Tocar la bocina', 'Mirar solo el espejo interior'] },
          { t: 'mc', q: 'El punto ciego es:', o: ['La zona alrededor del vehículo que no se ve por los espejos', 'Una falla de los focos', 'La parte oscura de la carretera', 'El centro del volante'] },
          { t: 'hazard', scene: 'h-puerta' },
          { t: 'tf', q: 'Los espejos se ajustan antes de empezar a conducir.', a: true },
          { t: 'order', q: 'Ordena los pasos antes de partir', o: ['Ajustar el asiento', 'Ajustar los espejos', 'Abrocharse el cinturón', 'Encender el motor'] },
          { t: 'mc', q: 'Para que los demás te vean conviene:', o: ['Usar luces cuando hay poca visibilidad y señalizar tus maniobras', 'Ir pegado a otros vehículos', 'Ir siempre por el centro de la calzada', 'Usar luces altas en la ciudad'] },
        ],
      },
    ],
  });

  RB.unit('emer', {
    name: 'Emergencias', desc: 'Accidentes, primeros auxilios y fallas del vehículo.', ic: 'aid',
    lessons: [
      {
        n: 'Ante un accidente', ic: 'aid', items: [
          { t: 'order', q: 'Ordena cómo actuar ante un accidente (conducta PAS)', o: ['Proteger: señalizar y asegurar el lugar', 'Avisar: llamar a emergencias', 'Socorrer: ayudar a los heridos sin moverlos'] },
          { t: 'match', q: 'Une cada servicio con su número de emergencia en Chile', p: [['Ambulancia (SAMU)', '131'], ['Bomberos', '132'], ['Carabineros', '133'], ['PDI', '134']] },
          { t: 'tf', q: 'Si hay heridos, no debes moverlos, salvo que exista un peligro inminente, como fuego.', a: true },
          { t: 'tf', q: 'Si chocas y hay lesionados, puedes irte si dejas tus datos en el parabrisas.', a: false, e: 'Debes detenerte, prestar ayuda y dar cuenta a Carabineros. Huir es un delito.' },
          { t: 'mc', q: 'Si un motociclista accidentado lleva casco:', o: ['No se lo quites, salvo que no respire y sepas hacerlo', 'Quítaselo rápido para que respire mejor', 'Levántale la cabeza', 'Siéntalo de inmediato'] },
          { t: 'mc', q: 'Al llamar a emergencias debes informar:', o: ['El lugar exacto, qué pasó y cuántos heridos hay', 'Solo tu nombre', 'La marca de los autos', 'Nada, ellos ya lo saben'] },
          { t: 'tf', q: 'En carretera, los triángulos se ponen lo bastante lejos para que los demás alcancen a frenar.', a: true },
          { t: 'fill', q: 'Completa la frase', s: 'El número de emergencia de Carabineros es el ___.', o: ['133', '131', '132'] },
        ],
      },
      {
        n: 'Fallas y panne', ic: 'wrench', items: [
          { t: 'mc', q: 'Si tu vehículo queda en panne en la carretera de noche:', o: ['Enciendes las luces de emergencia, te pones un chaleco reflectante y pones los triángulos', 'Te quedas dentro con las luces apagadas', 'Reparas en la pista sin señalizar', 'Haces señas con una linterna en medio de la pista'] },
          { t: 'tf', q: 'Durante una panne, los pasajeros deben esperar fuera de la calzada, en un lugar seguro.', a: true },
          { t: 'mc', q: 'Si se enciende la luz roja de temperatura del motor:', o: ['Te detienes en un lugar seguro y apagas el motor', 'Sigues hasta llegar a destino', 'Abres la tapa del radiador de inmediato', 'Aceleras para enfriar el motor'] },
          { t: 'tf', q: 'Nunca abras la tapa del radiador con el motor caliente: el líquido puede salir hirviendo.', a: true },
          { t: 'mc', q: 'Si un neumático revienta en marcha:', o: ['Sujetas firme el volante, sueltas el acelerador y frenas suave cuando el vehículo esté controlado', 'Frenas a fondo de inmediato', 'Giras bruscamente hacia la berma', 'Aceleras para estabilizarte'] },
          { t: 'mc', q: 'Si te quedas sin frenos:', o: ['Bajas cambios de a uno, usas el freno de mano con cuidado y buscas dónde detenerte', 'Apagas el motor y sacas la llave', 'Saltas del vehículo', 'Aceleras para llegar antes'] },
          { t: 'tf', q: 'Ante un principio de incendio en el motor, debes detenerte, apagar el motor y alejar a los ocupantes.', a: true },
        ],
      },
    ],
  });

  RB.unit('mec', {
    name: 'Mecánica y mantención', desc: 'Tablero, neumáticos, revisiones y elementos de seguridad.', ic: 'wrench',
    lessons: [
      {
        n: 'Tablero y revisiones', ic: 'wrench', items: [
          { t: 'mc', q: 'En el tablero, una luz de advertencia roja generalmente indica:', o: ['Un problema grave: detente en cuanto sea seguro', 'Información sin importancia', 'Que las luces están encendidas', 'Que todo está bien'] },
          { t: 'mc', q: 'Una luz amarilla o ámbar en el tablero generalmente indica:', o: ['Que debes revisar algo pronto', 'Un peligro inmediato de incendio', 'Que todo está bien', 'Que puedes ignorarla'] },
          { t: 'tf', q: 'El nivel de aceite se revisa con el motor apagado y el vehículo en una superficie plana.', a: true },
          { t: 'multi', q: '¿Qué conviene revisar periódicamente?', o: ['El nivel de aceite', 'La presión y el desgaste de los neumáticos', 'Las luces', 'El líquido de frenos', 'El color de los asientos'], a: [0, 1, 2, 3] },
          { t: 'mc', q: 'La presión de los neumáticos se mide idealmente:', o: ['En frío, antes de recorrer varios kilómetros', 'Después de un viaje largo', 'Solo en verano', 'Cuando se ven desinflados'] },
          { t: 'tf', q: 'Los testigos de desgaste del neumático indican que el dibujo llegó al mínimo y hay que cambiarlo.', a: true },
          { t: 'mc', q: 'Los neumáticos con poco dibujo:', o: ['Aumentan el riesgo de hidroplaneo y la distancia de frenado', 'Frenan mejor con lluvia', 'Duran más', 'Mejoran el consumo y la seguridad'] },
        ],
      },
      {
        n: 'Elementos de seguridad', ic: 'tire', items: [
          { t: 'multi', q: 'Selecciona lo que conviene llevar siempre en el vehículo', o: ['Rueda de repuesto', 'Gata y llave de ruedas', 'Triángulos reflectantes', 'Chaleco reflectante', 'Un televisor'], a: [0, 1, 2, 3] },
          { t: 'tf', q: 'La revisión técnica verifica que el vehículo cumpla condiciones de seguridad y de emisiones.', a: true },
          { t: 'mc', q: 'Si al frenar el vehículo se tira hacia un lado, puede ser:', o: ['Una falla en los frenos o neumáticos con distinta presión', 'Algo normal', 'Exceso de combustible', 'La radio encendida'] },
          { t: 'tf', q: 'Las plumillas gastadas reducen la visibilidad cuando llueve.', a: true },
          { t: 'mc', q: 'Las luces de freno se encienden cuando:', o: ['Pisas el pedal de freno', 'Enciendes las luces altas', 'Pones la marcha atrás', 'Abres la puerta'] },
          { t: 'tf', q: 'Los objetos sueltos en la cabina son peligrosos: en un frenazo se convierten en proyectiles.', a: true },
        ],
      },
    ],
  });

  RB.unit('doc', {
    name: 'Licencias y documentos', desc: 'Clases de licencia, documentos obligatorios y sanciones.', ic: 'doc',
    lessons: [
      {
        n: 'Clases de licencia', ic: 'doc', items: [
          { t: 'match', q: 'Une cada licencia con lo que permite conducir', p: [['Clase B', 'Autos, camionetas y furgones particulares'], ['Clase C', 'Motocicletas y similares'], ['Clase D', 'Maquinaria como tractores y grúas'], ['Clase E', 'Vehículos de tracción animal']] },
          { t: 'match', q: 'Une cada licencia profesional con lo que permite conducir', p: [['A1', 'Taxis'], ['A2', 'Taxis, ambulancias y transporte de 10 a 17 asientos'], ['A3', 'Buses sin límite de asientos y transporte escolar'], ['A4', 'Camiones simples de más de 3.500 kg']] },
          { t: 'mc', q: 'La licencia clase B permite conducir vehículos de carga de hasta:', o: ['3.500 kg de peso bruto vehicular', '10.000 kg', '1.000 kg', 'Sin límite'] },
          { t: 'mc', q: 'Para conducir un camión articulado (tracto con semirremolque) se necesita licencia:', o: ['A5', 'A4', 'B', 'D'] },
          { t: 'mc', q: 'La licencia clase F corresponde a vehículos de:', o: ['Las Fuerzas Armadas, Carabineros, PDI y Gendarmería', 'Fábricas e industrias', 'Transporte escolar', 'Ferrocarriles'] },
          { t: 'tf', q: 'La licencia clase B permite transportar pasajeros cobrando, como un taxi.', a: false, e: 'Para transportar pasajeros cobrando se necesita una licencia profesional clase A.' },
          { t: 'mc', q: 'La edad mínima para obtener licencia clase B es:', o: ['18 años, o 17 con autorización de los padres y curso en una escuela de conductores', '16 años', '21 años', '20 años'] },
          { t: 'mc', q: 'Para obtener una licencia profesional (clase A) por primera vez se necesita, entre otros requisitos:', o: ['Tener al menos 20 años y haber tenido licencia clase B por 2 años', 'Tener 18 años', 'Tener licencia clase C', 'Tener 25 años'] },
        ],
      },
      {
        n: 'Documentos', ic: 'doc', items: [
          { t: 'multi', q: 'Selecciona los documentos que debes portar al conducir', o: ['Licencia de conductor', 'Permiso de circulación vigente', 'Certificado de revisión técnica vigente', 'Seguro obligatorio (SOAP)', 'Certificado de nacimiento'], a: [0, 1, 2, 3] },
          { t: 'mc', q: 'El SOAP (Seguro Obligatorio de Accidentes Personales) cubre:', o: ['Lesiones y muerte de personas en accidentes de tránsito', 'Los daños materiales de los vehículos', 'El robo del vehículo', 'Las multas de tránsito'] },
          { t: 'tf', q: 'El SOAP paga los daños de tu auto en un choque.', a: false, e: 'El SOAP cubre a las personas, no los daños materiales.' },
          { t: 'mc', q: 'El permiso de circulación se paga en:', o: ['La municipalidad', 'Carabineros', 'El Registro Civil', 'La planta de revisión técnica'] },
          { t: 'tf', q: 'Puedes conducir con la licencia vencida durante un mes mientras haces el trámite.', a: false },
          { t: 'mc', q: 'Los exámenes para obtener la licencia de conductor se rinden en:', o: ['La Dirección de Tránsito de la municipalidad', 'Carabineros', 'Una notaría', 'El Servicio de Impuestos Internos'] },
          { t: 'multi', q: 'Para obtener la licencia clase B debes aprobar:', o: ['Un examen teórico', 'Un examen práctico de conducción', 'Un examen psicotécnico (vista, oído y reflejos)', 'Un examen de matemáticas'], a: [0, 1, 2] },
          { t: 'fill', q: 'Completa la frase', s: 'El SOAP cubre lesiones y muerte de ___ en accidentes de tránsito.', o: ['personas', 'vehículos', 'animales'] },
        ],
      },
      {
        n: 'Infracciones y sanciones', ic: 'exam', items: [
          { t: 'mc', q: 'En Chile, las infracciones de tránsito se clasifican en:', o: ['Gravísimas, graves, menos graves y leves', 'Solo graves y leves', 'Rojas, amarillas y verdes', 'Puntos del 1 al 10'] },
          { t: 'tf', q: 'Las multas de tránsito se expresan en UTM (Unidad Tributaria Mensual).', a: true },
          { t: 'tf', q: 'Pasar con luz roja es una infracción gravísima.', a: true },
          { t: 'mc', q: 'Conducir bajo la influencia del alcohol por primera vez, sin causar daños, se sanciona con:', o: ['Suspensión de la licencia por 3 meses y una multa', 'Una amonestación verbal', 'Solo una multa pequeña', 'Ninguna sanción'] },
          { t: 'mc', q: 'Conducir en estado de ebriedad, sin causar daños, se sanciona con:', o: ['Suspensión de la licencia por 2 años, multa y posible cárcel', 'Solo una multa', 'Suspensión de la licencia por una semana', 'Una charla educativa'] },
          { t: 'tf', q: 'Huir del lugar de un accidente con lesionados es un delito.', a: true },
        ],
      },
    ],
  });

  RB.unit('haz', {
    name: 'Percepción de riesgos', desc: 'Detecta los peligros antes de que ocurran.', ic: 'target',
    lessons: [
      {
        n: 'Peligros en la ciudad', ic: 'target', items: [
          { t: 'info', ic: 'target', title: 'Cómo funciona', txt: 'Verás un video desde tu auto. Toca la pantalla apenas veas un peligro que podría obligarte a frenar o a cambiar de dirección. Mientras antes lo detectes, más puntos (hasta 5). Si tocas demasiadas veces, no sumas puntos.' },
          { t: 'hazard', scene: 'h-pelota' },
          { t: 'mc', q: 'Una pelota que cruza la calle entre autos estacionados te advierte que:', o: ['Un niño podría aparecer corriendo detrás', 'Hay un partido cerca', 'Debes tocar la bocina', 'La calle está cerrada'] },
          { t: 'hazard', scene: 'h-puerta' },
          { t: 'hazard', scene: 'h-bus' },
          { t: 'tf', q: 'Anticipar los peligros te da más tiempo para reaccionar y frenar con suavidad.', a: true },
        ],
      },
      {
        n: 'Peligros en el tránsito', ic: 'target', items: [
          { t: 'info', ic: 'target', title: 'Mira lejos', txt: 'Los buenos conductores miran lejos y "leen" la escena: un vehículo que se acerca rápido a un cruce, un ciclista que se encuentra con un obstáculo o un peatón que mira para cruzar.' },
          { t: 'hazard', scene: 'h-frenazo' },
          { t: 'hazard', scene: 'h-cruce' },
          { t: 'hazard', scene: 'h-ciclista' },
          { t: 'mc', q: 'Ves un vehículo que se acerca rápido a un PARE en una calle lateral. ¿Qué haces?', o: ['Suelto el acelerador y me preparo para frenar', 'Acelero para pasar antes', 'Toco la bocina y sigo igual', 'Me cambio a la pista contraria'] },
        ],
      },
    ],
  });
})();
