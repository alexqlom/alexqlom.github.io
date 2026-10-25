// Unidades específicas por clase de licencia. Misma convención que comun.js.
(function () {
  const RB = window.RB = window.RB || {};
  RB.units = RB.units || {};
  RB.unit = RB.unit || ((id, u) => { u.id = id; RB.units[id] = u; });

  // ---------- Clase C: motocicletas ----------
  RB.unit('motoA', {
    name: 'Tu moto y el equipo', desc: 'Casco, protección y revisión antes de salir.', ic: 'moto',
    lessons: [
      {
        n: 'Casco y equipo', ic: 'shield', items: [
          { t: 'tf', q: 'El casco es obligatorio para el conductor y el acompañante de una motocicleta.', a: true },
          { t: 'mc', q: 'El casco debe:', o: ['Estar certificado, ser de tu talla y llevarse siempre abrochado', 'Ser de cualquier tipo, si es cómodo', 'Usarse solo en carretera', 'Ir colgado del brazo en la ciudad'] },
          { t: 'multi', q: 'Selecciona el equipo de protección recomendado para andar en moto', o: ['Casco certificado', 'Guantes', 'Chaqueta con protecciones', 'Botas que cubran el tobillo', 'Sandalias'], a: [0, 1, 2, 3] },
          { t: 'tf', q: 'Las motocicletas deben circular con la luz delantera encendida, de día y de noche.', a: true },
          { t: 'mc', q: 'Usar ropa clara o con elementos reflectantes en moto sirve para:', o: ['Que los demás conductores te vean mejor', 'Ir más rápido', 'Reemplazar el casco', 'Nada en especial'] },
          { t: 'tf', q: 'Un casco que recibió un golpe fuerte debe reemplazarse aunque se vea bien.', a: true },
          { t: 'mc', q: 'Una visera sucia o rayada:', o: ['Reduce la visibilidad, sobre todo de noche y con lluvia', 'No afecta en nada', 'Protege más del sol', 'Mejora la visión nocturna'] },
          { t: 'fill', q: 'Completa la frase', s: 'El casco es obligatorio para el conductor y para el ___.', o: ['acompañante', 'mecánico', 'peatón'] },
        ],
      },
      {
        n: 'Revisión y pasajero', ic: 'wrench', items: [
          { t: 'multi', q: 'Antes de salir en moto revisa:', o: ['La presión y el estado de los neumáticos', 'Los frenos', 'Las luces e intermitentes', 'La tensión de la cadena', 'El color del estanque'], a: [0, 1, 2, 3] },
          { t: 'tf', q: 'Una cadena muy suelta o seca puede salirse o cortarse y causar una caída.', a: true },
          { t: 'mc', q: 'La licencia para conducir motocicletas, motonetas y bicimotos es la:', o: ['Clase C', 'Clase B', 'Clase D', 'Clase A1'] },
          { t: 'tf', q: 'Con licencia clase B puedes conducir una motocicleta.', a: false, e: 'La clase B es para vehículos de tres o cuatro ruedas. Las motos requieren clase C.' },
          { t: 'mc', q: 'Para llevar a un pasajero en la moto, este debe:', o: ['Usar casco, ir a horcajadas y apoyar los pies en los posapiés', 'Ir sentado de lado', 'Ir sin casco si el viaje es corto', 'Sostenerse con una sola mano'] },
          { t: 'tf', q: 'Llevar un pasajero cambia el equilibrio de la moto y aumenta la distancia de frenado.', a: true },
        ],
      },
    ],
  });

  RB.unit('motoB', {
    name: 'Técnica de conducción en moto', desc: 'Frenado, curvas y maniobras.', ic: 'moto',
    lessons: [
      {
        n: 'Frenado', ic: 'speed', items: [
          { t: 'mc', q: 'En la mayoría de las motos, el freno que aporta más capacidad de frenado es:', o: ['El delantero', 'El trasero', 'El freno motor', 'Todos aportan lo mismo'] },
          { t: 'mc', q: 'Para frenar con máxima eficacia en una recta:', o: ['Usa ambos frenos de forma progresiva', 'Usa solo el freno trasero', 'Usa solo el delantero, de golpe', 'Pon la moto en neutro'] },
          { t: 'tf', q: 'Frenar fuerte en plena curva puede hacerte perder adherencia y caer.', a: true },
          { t: 'clip', scene: 'moto-curva' },
          { t: 'order', q: 'Ordena cómo tomar una curva en moto', o: ['Frenar antes de la curva, con la moto recta', 'Mirar hacia la salida de la curva', 'Inclinarse con un acelerador suave y constante', 'Acelerar de forma progresiva al salir'] },
          { t: 'tf', q: 'Con el pavimento mojado, las líneas pintadas y las tapas de alcantarilla son muy resbaladizas.', a: true },
          { t: 'mc', q: 'Si la moto tiene ABS, en una frenada de emergencia:', o: ['Frenas fuerte con ambos frenos y dejas que el ABS evite el bloqueo', 'Bombeas los frenos', 'Usas solo el freno trasero', 'No frenas'] },
        ],
      },
      {
        n: 'Curvas y maniobras', ic: 'road', items: [
          { t: 'mc', q: 'Dentro de una curva, la mirada debe ir:', o: ['Hacia la salida de la curva, adonde quieres ir', 'A la rueda delantera', 'Al borde de la vía', 'Al tablero'] },
          { t: 'tf', q: 'A velocidad media o alta, para girar la moto a la derecha se empuja levemente el manubrio derecho hacia adelante (contramanillar).', a: true },
          { t: 'mc', q: 'La mejor posición dentro de tu pista suele ser:', o: ['Una que te permita ver y ser visto, lejos de puertas y zonas sucias', 'Siempre pegado a la solera', 'Siempre sobre la línea central', 'Entre dos autos'] },
          { t: 'tf', q: 'Zigzaguear entre autos aumenta el riesgo: es probable que no te vean al cambiarse de pista.', a: true },
          { t: 'mc', q: 'En moto, ¿por qué conviene dejar más distancia con el vehículo de adelante?', o: ['Para tener tiempo de reaccionar y ver los peligros del pavimento', 'Para poder ir más rápido', 'Porque la moto siempre frena peor', 'No es necesario'] },
          { t: 'tf', q: 'El viento lateral fuerte, como al pasar junto a un camión, puede desestabilizar la moto.', a: true },
        ],
      },
    ],
  });

  RB.unit('motoC', {
    name: 'Seguridad en moto', desc: 'Ver y ser visto, y los riesgos más comunes.', ic: 'eye',
    lessons: [
      {
        n: 'Ver y ser visto', ic: 'eye', items: [
          { t: 'tf', q: 'Muchos accidentes de moto ocurren porque un auto vira a la izquierda sin ver a la moto que viene de frente.', a: true },
          { t: 'mc', q: 'Te acercas a un cruce y un auto espera para salir. ¿Qué haces?', o: ['Reduzco la velocidad y me preparo para frenar: quizás no me vio', 'Acelero para pasar antes', 'Toco la bocina y mantengo la velocidad', 'Me pego al auto'] },
          { t: 'clip', scene: 'puntociego' },
          { t: 'mc', q: 'Si vas en moto y no ves los espejos de un camión:', o: ['Estás en su zona ciega: aléjate o adelanta con decisión', 'Estás seguro', 'Te ve por una cámara', 'Debes quedarte ahí'] },
          { t: 'tf', q: 'De noche, la moto debe llevar encendidas la luz delantera y la trasera.', a: true },
          { t: 'hazard', scene: 'h-cruce' },
        ],
      },
      {
        n: 'Riesgos en moto', ic: 'glass', items: [
          { t: 'tf', q: 'El alcohol afecta aún más a quien conduce una moto, porque requiere equilibrio y coordinación.', a: true },
          { t: 'mc', q: 'Con lluvia, en moto conviene:', o: ['Ir más lento, frenar con suavidad y evitar las líneas pintadas', 'Frenar fuerte para probar los frenos', 'Inclinarse más en las curvas', 'Ir más cerca del auto de adelante'] },
          { t: 'tf', q: 'Está prohibido usar el celular con la mano mientras conduces una moto.', a: true },
          { t: 'mc', q: 'Después de una caída leve, antes de seguir debes:', o: ['Revisar frenos, manubrio, luces y tu propio estado', 'Seguir sin revisar nada', 'Quitarte el casco y seguir', 'Acelerar para probar'] },
          { t: 'sort', q: '¿Correcto o incorrecto?', c: ['Correcto', 'Incorrecto'], k: [['Llevar el casco abrochado', 0], ['Llevar a un niño sin casco en un trayecto corto', 1], ['Andar con la luz encendida de día', 0], ['Frenar fuerte en plena curva', 1]] },
        ],
      },
    ],
  });

  // ---------- Licencias profesionales ----------
  RB.unit('profA', {
    name: 'Licencias profesionales', desc: 'Clases A1 a A5, requisitos y responsabilidades.', ic: 'doc',
    lessons: [
      {
        n: 'Clases A', ic: 'doc', items: [
          { t: 'mc', q: 'La licencia A1 permite conducir:', o: ['Taxis', 'Buses de más de 17 asientos', 'Camiones de más de 3.500 kg', 'Motocicletas'] },
          { t: 'mc', q: 'La licencia A2 permite conducir taxis, ambulancias y vehículos de transporte de personas de:', o: ['10 a 17 asientos, sin contar el del conductor', 'Hasta 9 asientos', 'Más de 40 asientos', 'Cualquier capacidad'] },
          { t: 'mc', q: 'Para conducir un furgón de transporte escolar remunerado se necesita licencia:', o: ['A3', 'B', 'A1', 'C'] },
          { t: 'mc', q: 'Un bus de transporte público de 40 asientos requiere licencia:', o: ['A3', 'A2', 'A1', 'B'] },
          { t: 'mc', q: 'Para obtener licencia profesional por primera vez se debe tener al menos:', o: ['20 años', '18 años', '25 años', '17 años'] },
          { t: 'tf', q: 'Para obtener licencia profesional debes haber tenido licencia clase B al menos 2 años.', a: true },
          { t: 'tf', q: 'Para obtener licencia profesional debes aprobar los cursos de una Escuela de Conductores Profesionales.', a: true },
          { t: 'match', q: 'Une cada clase con lo que permite conducir', p: [['A1', 'Taxis'], ['A2', 'Ambulancias y transporte de 10 a 17 asientos'], ['A3', 'Buses y transporte escolar'], ['A5', 'Camiones articulados']] },
        ],
      },
      {
        n: 'Responsabilidad profesional', ic: 'shield', items: [
          { t: 'tf', q: 'El conductor profesional es responsable de la seguridad de sus pasajeros o de su carga durante todo el viaje.', a: true },
          { t: 'mc', q: 'Antes de iniciar un servicio, el conductor profesional debe:', o: ['Revisar el vehículo: frenos, neumáticos, luces, espejos y documentos', 'Solo cargar combustible', 'Revisar únicamente la radio', 'Nada, eso lo hace el taller'] },
          { t: 'tf', q: 'Un conductor profesional puede trabajar con la licencia vencida mientras hace el trámite.', a: false },
          { t: 'mc', q: 'Frente a un pasajero conflictivo, lo correcto es:', o: ['Mantener la calma, priorizar la seguridad y pedir ayuda a Carabineros si es necesario', 'Discutir mientras conduces', 'Bajarlo a la fuerza en cualquier lugar', 'Ignorar la situación aunque haya peligro'] },
          { t: 'tf', q: 'Si no te sientes en condiciones de conducir (enfermo, cansado o bajo efectos de medicamentos), debes avisar y no iniciar el servicio.', a: true },
          { t: 'mc', q: 'Para conducir un camión simple de más de 3.500 kg se necesita licencia:', o: ['A4 o A5', 'B', 'A1', 'C'] },
        ],
      },
    ],
  });

  RB.unit('pas', {
    name: 'Transporte de pasajeros', desc: 'Buses, taxis, escolares y ambulancias.', ic: 'bus',
    lessons: [
      {
        n: 'Buses y taxis', ic: 'bus', items: [
          { t: 'clip', scene: 'bus' },
          { t: 'mc', q: 'Para tomar o dejar pasajeros, un bus debe detenerse:', o: ['En paraderos autorizados, junto a la acera', 'Donde el pasajero lo pida', 'En doble fila', 'En medio de un cruce'] },
          { t: 'tf', q: 'Las puertas del bus deben ir cerradas mientras está en movimiento.', a: true },
          { t: 'video', scene: 'bus', at: 4.9, q: 'El bus acaba de detenerse en el paradero. ¿Cuándo se abren las puertas?', o: ['Ahora, con el bus completamente detenido', 'Antes de detenerse, para ganar tiempo', 'Mientras se reincorpora al tránsito', 'Cuando el pasajero las golpee'] },
          { t: 'mc', q: 'Al partir desde el paradero, el conductor del bus debe:', o: ['Cerrar las puertas, señalizar, mirar los espejos y partir con suavidad', 'Partir rápido para recuperar tiempo', 'Partir con las puertas abiertas', 'Tocar la bocina y salir sin mirar'] },
          { t: 'tf', q: 'Frenar y acelerar con suavidad es clave porque puede haber pasajeros de pie.', a: true },
          { t: 'mc', q: 'Si llevas pasajeros de pie y debes frenar:', o: ['Anticipas y frenas de forma progresiva', 'Frenas a último momento', 'Avisas por altoparlante y frenas fuerte', 'Usas solo el freno de mano'] },
          { t: 'tf', q: 'Un taxi puede detenerse en doble fila si el pasajero baja rápido.', a: false },
        ],
      },
      {
        n: 'Escolares y ambulancias', ic: 'child', items: [
          { t: 'tf', q: 'El transporte remunerado de escolares requiere licencia profesional clase A3.', a: true },
          { t: 'mc', q: 'Al dejar a un niño en su destino, el conductor de transporte escolar debe:', o: ['Asegurarse de que baje por el lado de la acera y quede en un lugar seguro', 'Dejarlo en medio de la calle para no perder tiempo', 'Pedirle que cruce solo y rápido', 'Dejarlo en cualquier lugar si va atrasado'] },
          { t: 'tf', q: 'Al terminar el recorrido escolar, debes revisar que ningún niño quede dentro del vehículo.', a: true },
          { t: 'mc', q: 'Las licencias que permiten conducir ambulancias son:', o: ['A2 y A3', 'B', 'C', 'D'] },
          { t: 'tf', q: 'Una ambulancia en emergencia tiene preferencia, pero su conductor debe seguir actuando con precaución.', a: true },
          { t: 'mc', q: 'En un furgón escolar, cada niño debe:', o: ['Ir sentado y con cinturón si el asiento lo tiene', 'Ir de pie si faltan asientos', 'Ir en el pasillo', 'Compartir el cinturón con otro niño'] },
        ],
      },
    ],
  });

  RB.unit('pesado', {
    name: 'Vehículos grandes', desc: 'Zonas ciegas, virajes, frenado y pendientes.', ic: 'truck',
    lessons: [
      {
        n: 'Zonas ciegas y virajes', ic: 'eye', items: [
          { t: 'clip', scene: 'puntociego' },
          { t: 'mc', q: 'En Chile, la zona ciega más grande de un camión o bus suele estar:', o: ['Al costado derecho', 'Al costado izquierdo', 'Justo delante del conductor', 'No tienen zonas ciegas'] },
          { t: 'tf', q: 'Al virar, las ruedas traseras de un vehículo largo recorren una trayectoria más cerrada que las delanteras.', a: true },
          { t: 'mc', q: 'Para virar a la derecha con un vehículo largo:', o: ['Avanzas más antes de girar, vigilando la parte trasera y a peatones y ciclistas a tu derecha', 'Giras igual que con un auto', 'Te subes a la vereda para girar más fácil', 'Giras rápido para no estorbar'] },
          { t: 'tf', q: 'Los espejos de un bus o camión deben ajustarse para ver todo el costado del vehículo.', a: true },
          { t: 'mc', q: 'Retroceder con un camión sin visibilidad completa:', o: ['Debes hacerlo muy despacio, con alguien que te guíe o con sistemas de apoyo', 'Es seguro si tocas la bocina', 'Puedes hacerlo rápido para no estorbar', 'Está siempre prohibido'] },
        ],
      },
      {
        n: 'Frenado y pendientes', ic: 'speed', items: [
          { t: 'tf', q: 'Un vehículo pesado necesita más distancia para detenerse que un auto.', a: true },
          { t: 'mc', q: 'En bajadas largas con un vehículo pesado debes:', o: ['Usar una marcha baja y el freno motor o retardador', 'Bajar en neutro', 'Usar solo el freno de servicio todo el tiempo', 'Acelerar para terminar luego'] },
          { t: 'tf', q: 'Usar el freno de servicio en forma continua en una bajada larga puede sobrecalentarlo y hacerle perder eficacia.', a: true },
          { t: 'mc', q: 'Los lechos o rampas de frenado de emergencia en las carreteras sirven para:', o: ['Detener a vehículos que se quedan sin frenos', 'Estacionar camiones', 'Descansar', 'Revisar la carga'] },
          { t: 'tf', q: 'En las curvas, un vehículo alto tiene más riesgo de volcar si va rápido.', a: true },
          { t: 'clip', scene: 'distancia' },
        ],
      },
    ],
  });

  RB.unit('jor', {
    name: 'Jornada y fatiga', desc: 'Horas de conducción, descanso y salud.', ic: 'clock',
    lessons: [
      {
        n: 'Jornada y descanso', ic: 'clock', items: [
          { t: 'mc', q: 'Los choferes de buses interurbanos no pueden manejar más de:', o: ['5 horas continuas', '8 horas continuas', '2 horas continuas', '12 horas continuas'] },
          { t: 'tf', q: 'Después de manejar 5 horas continuas, el chofer de bus interurbano debe tener un descanso.', a: true, e: 'El Código del Trabajo establece un descanso mínimo de dos horas.' },
          { t: 'mc', q: 'Un cronotacógrafo registra:', o: ['La velocidad y los tiempos de conducción y detención', 'El consumo de la radio', 'La temperatura de los pasajeros', 'La cantidad de pasajeros'] },
          { t: 'tf', q: 'El sueño acumulado puede afectar los reflejos tanto como el alcohol.', a: true },
          { t: 'mc', q: 'Si sientes somnolencia durante un viaje como conductor profesional:', o: ['Detienes el vehículo en un lugar seguro, descansas y avisas a tu empresa', 'Sigues para cumplir el horario', 'Tomas bebidas energéticas y continúas', 'Le pides a un pasajero que maneje'] },
          { t: 'tf', q: 'Una comida muy pesada antes de manejar puede aumentar la somnolencia.', a: true },
          { t: 'fill', q: 'Completa la frase', s: 'Un chofer de bus interurbano no puede manejar más de ___ horas continuas.', o: ['5', '8', '12'] },
        ],
      },
    ],
  });

  RB.unit('carga', {
    name: 'Carga y estiba', desc: 'Peso, distribución y sujeción de la carga.', ic: 'box',
    lessons: [
      {
        n: 'Peso y distribución', ic: 'box', items: [
          { t: 'mc', q: 'El peso bruto vehicular es:', o: ['El peso del vehículo más el de la carga máxima que puede llevar', 'Solo el peso de la carga', 'Solo el peso del vehículo vacío', 'El peso de los neumáticos'] },
          { t: 'mc', q: 'Un camión simple de 10.000 kg de peso bruto vehicular requiere licencia:', o: ['A4 o A5', 'B', 'A1', 'C'] },
          { t: 'tf', q: 'La carga debe ir bien amarrada y cubierta para que no caiga ni se desplace.', a: true },
          { t: 'mc', q: 'Una carga mal distribuida puede provocar:', o: ['Pérdida de estabilidad, volcamiento y un frenado deficiente', 'Menor consumo', 'Mejor tracción en curvas', 'Nada importante'] },
          { t: 'tf', q: 'La carga que sobresale del vehículo debe señalizarse para que los demás la vean.', a: true },
          { t: 'mc', q: 'La carga más pesada se ubica preferentemente:', o: ['Abajo y centrada, repartida entre los ejes', 'Arriba, para que se vea', 'Toda atrás', 'Toda adelante, sobre la cabina'] },
          { t: 'tf', q: 'Exceder el peso máximo por eje daña los caminos y afecta los frenos y la dirección.', a: true },
          { t: 'mc', q: 'Las plazas de pesaje en las carreteras sirven para:', o: ['Controlar que los camiones no superen los pesos máximos', 'Cobrar peaje a los autos', 'Revisar la licencia de los pasajeros', 'Lavar los camiones'] },
        ],
      },
      {
        n: 'Sujeción de la carga', ic: 'box', items: [
          { t: 'multi', q: 'Selecciona elementos adecuados para sujetar la carga', o: ['Cintas o eslingas', 'Cadenas y tensores', 'Carpas o lonas', 'Cuerdas gastadas y cortadas', 'Esquineros que protegen las amarras'], a: [0, 1, 2, 4] },
          { t: 'tf', q: 'Conviene revisar las amarras durante el viaje, sobre todo después de los primeros kilómetros.', a: true },
          { t: 'mc', q: 'Si la carga se desplaza durante el viaje:', o: ['Te detienes en un lugar seguro y la vuelves a asegurar', 'Sigues hasta el destino', 'Frenas fuerte para acomodarla', 'Aceleras en las curvas'] },
          { t: 'tf', q: 'Un líquido en un estanque a medio llenar puede moverse y empujar el vehículo al frenar o en curvas.', a: true },
          { t: 'mc', sign: 'alturaMax', q: 'Tu camión mide 4,5 m de alto y ves esta señal. ¿Qué haces?', o: ['No paso: busco otra ruta', 'Paso despacio', 'Paso por el centro de la calzada', 'Paso y reviso después'] },
          { t: 'mc', sign: 'pesoMax', q: 'Esta señal indica que no pueden pasar vehículos que superen:', o: ['El peso indicado en la señal', 'La altura indicada', 'La velocidad indicada', 'La cantidad de ejes indicada'] },
          { t: 'img', q: '¿Cuál señal limita la altura de los vehículos?', o: ['alturaMax', 'pesoMax', 'vel50', 'estrechamiento'] },
        ],
      },
    ],
  });

  RB.unit('art', {
    name: 'Articulados y frenos de aire', desc: 'Tracto, semirremolque, efecto tijera y frenos.', ic: 'truck',
    lessons: [
      {
        n: 'Vehículos articulados', ic: 'truck', items: [
          { t: 'mc', q: 'La "quinta rueda" es:', o: ['El acople entre el tracto camión y el semirremolque', 'La rueda de repuesto', 'Una rueda de apoyo delantera', 'El volante'] },
          { t: 'mc', q: 'El efecto tijera ocurre cuando:', o: ['El semirremolque empuja al tracto y ambos se doblan formando un ángulo', 'La carga se cae', 'Revienta un neumático delantero', 'El motor se apaga'] },
          { t: 'multi', q: '¿Qué puede provocar el efecto tijera?', o: ['Frenar bruscamente en una curva', 'El pavimento resbaladizo', 'Un semirremolque vacío o con poca carga', 'Ir a velocidad moderada y frenar con anticipación'], a: [0, 1, 2] },
          { t: 'tf', q: 'Antes de partir, debes comprobar que el semirremolque esté bien enganchado y que las conexiones de aire y electricidad estén conectadas.', a: true },
          { t: 'mc', q: 'Para conducir un tracto camión con semirremolque se necesita licencia:', o: ['A5', 'A4', 'A3', 'B'] },
        ],
      },
      {
        n: 'Frenos de aire', ic: 'wrench', items: [
          { t: 'tf', q: 'En un sistema de frenos de aire, si la presión baja de cierto nivel se activa una alarma.', a: true },
          { t: 'mc', q: 'Si se enciende la alarma de baja presión de aire:', o: ['Te detienes en un lugar seguro lo antes posible', 'Sigues hasta el destino', 'Aceleras para cargar aire más rápido', 'Desconectas la alarma'] },
          { t: 'tf', q: 'Hay que drenar periódicamente el agua que se acumula en los estanques de aire.', a: true },
          { t: 'mc', q: 'El freno motor o retardador sirve para:', o: ['Ayudar a mantener la velocidad en bajadas sin sobrecalentar los frenos', 'Detener el vehículo por completo en una emergencia', 'Encender el motor', 'Mejorar la tracción'] },
          { t: 'tf', q: 'Los frenos de resorte de un camión se aplican solos si se pierde la presión de aire.', a: true },
        ],
      },
    ],
  });

  RB.unit('peligrosas', {
    name: 'Sustancias peligrosas', desc: 'Rótulos, precauciones y emergencias.', ic: 'flame',
    lessons: [
      {
        n: 'Carga peligrosa', ic: 'flame', items: [
          { t: 'tf', q: 'Los vehículos que transportan sustancias peligrosas deben llevar rótulos que identifiquen el tipo de riesgo.', a: true },
          { t: 'mc', q: 'Si transportas sustancias peligrosas y ocurre un derrame:', o: ['Alejas a las personas, avisas a Bomberos (132) e informas qué sustancia es', 'Intentas limpiar solo y sigues', 'Fumas para calmarte', 'Lo ocultas para evitar multas'] },
          { t: 'tf', q: 'Está prohibido fumar al cargar, descargar o transportar sustancias inflamables.', a: true },
          { t: 'mc', q: 'La hoja de datos de seguridad de una sustancia peligrosa sirve para:', o: ['Saber cómo actuar en una emergencia con esa sustancia', 'Calcular el peaje', 'Registrar la velocidad', 'Nada importante'] },
          { t: 'tf', q: 'Un vehículo con carga peligrosa debe estacionarse lejos de lugares concurridos y de fuentes de calor.', a: true },
        ],
      },
    ],
  });

  // ---------- Clase D: maquinaria ----------
  RB.unit('maq1', {
    name: 'Maquinaria y operación segura', desc: 'Licencia D, inspección, volcamiento y riesgos.', ic: 'tractor',
    lessons: [
      {
        n: 'Licencia D y maquinaria', ic: 'tractor', items: [
          { t: 'mc', q: 'La licencia clase D permite conducir:', o: ['Maquinaria automotriz como tractores, retroexcavadoras y grúas', 'Camiones de carga de más de 3.500 kg', 'Buses', 'Motocicletas'] },
          { t: 'multi', q: 'Selecciona la maquinaria que requiere licencia clase D', o: ['Tractor', 'Retroexcavadora', 'Motoniveladora', 'Grúa autopropulsada', 'Furgón escolar'], a: [0, 1, 2, 3] },
          { t: 'tf', q: 'La licencia D permite conducir un camión de carga de 15.000 kg.', a: false },
          { t: 'mc', q: 'Antes de operar una máquina, el operador debe:', o: ['Inspeccionar neumáticos u orugas, frenos, luces, fugas y dispositivos de seguridad', 'Encenderla y partir', 'Revisar solo el combustible', 'Esperar a que otro la revise'] },
          { t: 'tf', q: 'Solo debe operar una máquina quien esté capacitado y autorizado.', a: true },
          { t: 'mc', q: 'La estructura antivuelco (ROPS) de un tractor sirve para:', o: ['Proteger al operador en caso de volcamiento', 'Aumentar la velocidad', 'Llevar pasajeros', 'Remolcar autos'] },
        ],
      },
      {
        n: 'Operación segura', ic: 'shield', items: [
          { t: 'tf', q: 'Si el tractor tiene estructura antivuelco, el operador debe usar el cinturón de seguridad.', a: true },
          { t: 'mc', q: 'El volcamiento es una de las principales causas de accidentes graves con tractores. Para evitarlo:', o: ['Evita pendientes pronunciadas, ve despacio y no gires bruscamente', 'Ve rápido en las pendientes', 'Lleva los implementos levantados al máximo', 'Gira bruscamente en las laderas'] },
          { t: 'tf', q: 'Está permitido llevar pasajeros de pie en el tractor si el trayecto es corto.', a: false },
          { t: 'mc', q: 'La toma de fuerza (TDF) es peligrosa porque:', o: ['Puede atrapar ropa suelta, pelo o extremidades', 'Calienta la cabina', 'Gasta mucho combustible', 'Hace ruido'] },
          { t: 'order', q: 'Ordena los pasos antes de bajarte de la máquina', o: ['Bajar los implementos o la pala al suelo', 'Aplicar el freno de estacionamiento', 'Apagar el motor y sacar la llave', 'Bajar usando tres puntos de apoyo'] },
          { t: 'tf', q: 'Con la pala cargada en alto, la máquina es más estable.', a: false, e: 'Transporta la carga lo más baja posible para mantener bajo el centro de gravedad.' },
        ],
      },
    ],
  });

  RB.unit('maq2', {
    name: 'Maquinaria en la vía pública', desc: 'Circulación, señalización y trabajo cerca de otros.', ic: 'road',
    lessons: [
      {
        n: 'Circular por la vía', ic: 'road', items: [
          { t: 'clip', scene: 'tractor' },
          { t: 'mc', q: 'La maquinaria que circula por la vía pública debe hacerlo:', o: ['Por la derecha, a baja velocidad y con luces o balizas encendidas', 'Por el centro de la calzada', 'Por la vereda', 'De noche y sin luces'] },
          { t: 'tf', q: 'Si se forma una fila de vehículos detrás de tu maquinaria, conviene orillarte cuando sea seguro para dejarlos pasar.', a: true },
          { t: 'mc', q: 'Si conduces un auto detrás de un tractor lento:', o: ['Esperas línea discontinua y la pista contraria despejada para adelantar', 'Adelantas en la curva', 'Lo apuras con la bocina', 'Adelantas por la berma'] },
          { t: 'tf', q: 'Los implementos que sobresalen de la maquinaria deben señalizarse.', a: true },
          { t: 'mc', q: 'Al circular con una retroexcavadora por la vía pública, la pala debe ir:', o: ['Recogida y asegurada en posición de transporte', 'Levantada al máximo', 'Arrastrando por el suelo', 'Con carga suelta'] },
          { t: 'img', q: '¿Cuál señal avisa que hay trabajadores en la vía?', o: ['hombresTrabajando', 'desvio', 'animales', 'pendiente'] },
        ],
      },
      {
        n: 'Riesgos en el trabajo', ic: 'aid', items: [
          { t: 'tf', q: 'Trabajar con una grúa o pluma cerca de líneas eléctricas es muy peligroso: mantén siempre una distancia segura.', a: true },
          { t: 'mc', q: 'Antes de mover la máquina en una obra:', o: ['Verificas que no haya personas en las zonas ciegas y usas la alarma de retroceso', 'Tocas la bocina y avanzas sin mirar', 'Partes rápido para no perder tiempo', 'Te guías solo por el espejo'] },
          { t: 'tf', q: 'Una grúa no debe levantar más carga que la indicada en su tabla de capacidades.', a: true },
          { t: 'mc', q: 'Para subir o bajar una pendiente con un tractor, lo más seguro es:', o: ['Hacerlo en línea recta, no en diagonal ni de costado', 'Cruzarla de costado', 'Girar en medio de la pendiente', 'Bajar en neutro'] },
          { t: 'tf', q: 'El ruido de la maquinaria puede dañar la audición: usa protección auditiva.', a: true },
        ],
      },
    ],
  });

  // ---------- Clase E: tracción animal ----------
  RB.unit('tra1', {
    name: 'Tracción animal en la vía', desc: 'Normas para carretas y coches.', ic: 'horse',
    lessons: [
      {
        n: 'Normas de circulación', ic: 'horse', items: [
          { t: 'mc', q: 'La licencia clase E permite conducir:', o: ['Vehículos de tracción animal, como carretas y coches', 'Motocicletas', 'Tractores', 'Bicicletas eléctricas'] },
          { t: 'tf', q: 'Los vehículos de tracción animal deben respetar las señales y normas de tránsito como los demás vehículos.', a: true },
          { t: 'mc', q: 'Un vehículo de tracción animal debe circular:', o: ['Por la derecha de la calzada', 'Por el centro de la calzada', 'Por la vereda', 'Por la pista izquierda'] },
          { t: 'tf', q: 'De noche, una carreta debe llevar luces o elementos reflectantes para ser vista.', a: true },
          { t: 'mc', q: 'Al llegar a un cruce con señal PARE, quien conduce una carreta debe:', o: ['Detenerse y ceder el paso como cualquier vehículo', 'Seguir, porque es lento', 'Tocar una campana y pasar', 'Bajarse y cruzar a pie'] },
          { t: 'tf', q: 'Los vehículos de tracción animal pueden circular por autopistas si van por la berma.', a: false },
          { t: 'mc', sign: 'ceda', q: 'Conduces una carreta y ves esta señal. ¿Qué haces?', o: ['Cedo el paso a los vehículos de la otra vía', 'Sigo, porque tengo preferencia', 'Acelero', 'La ignoro'] },
          { t: 'img', q: '¿Cuál señal obliga a detenerse siempre por completo?', o: ['pare', 'ceda', 'cruceVias', 'noEntrar'] },
        ],
      },
      {
        n: 'Antes de salir', ic: 'wrench', items: [
          { t: 'mc', q: 'Antes de salir con una carreta conviene revisar:', o: ['Arneses, ruedas, frenos y el estado del animal', 'Solo el color de la carreta', 'Nada, el animal conoce el camino', 'La radio'] },
          { t: 'tf', q: 'Quien conduce debe mantener el control del animal en todo momento.', a: true },
          { t: 'mc', q: 'Si el animal se asusta con el ruido del tránsito:', o: ['Mantienes la calma, sujetas firme las riendas y buscas detenerte en un lugar seguro', 'Gritas y lo golpeas', 'Sueltas las riendas', 'Te bajas corriendo'] },
          { t: 'tf', q: 'Es peligroso llevar más carga de la que el animal y el vehículo pueden soportar.', a: true },
          { t: 'tf', q: 'Puedes conducir un vehículo de tracción animal después de beber alcohol, porque va lento.', a: false },
        ],
      },
    ],
  });

  RB.unit('tra2', {
    name: 'Bienestar animal', desc: 'Cuidado y protección del animal de tiro.', ic: 'heart',
    lessons: [
      {
        n: 'Cuidado del animal', ic: 'heart', items: [
          { t: 'tf', q: 'En Chile, la Ley 20.380 protege a los animales y sanciona el maltrato.', a: true },
          { t: 'mc', q: 'Un animal de tiro debe:', o: ['Tener agua, alimento, descanso y herraduras en buen estado', 'Trabajar sin descanso', 'Cargar siempre el máximo', 'Trabajar aunque esté enfermo'] },
          { t: 'tf', q: 'Un animal herido, enfermo o muy cansado no debe ser obligado a trabajar.', a: true },
          { t: 'mc', q: 'En días de mucho calor:', o: ['Reduces el trabajo y le das más agua y descansos a la sombra', 'Trabajas igual', 'Le das menos agua', 'Lo dejas amarrado al sol'] },
          { t: 'sort', q: '¿Correcto o incorrecto?', c: ['Correcto', 'Incorrecto'], k: [['Darle agua y descanso al animal', 0], ['Dejarlo amarrado al sol', 1], ['Revisar sus herraduras', 0], ['Hacerlo trabajar herido', 1]] },
        ],
      },
    ],
  });

  // ---------- Clase F: institucional ----------
  RB.unit('emerv', {
    name: 'Conducción institucional', desc: 'Vehículos de emergencia y servicio.', ic: 'siren',
    lessons: [
      {
        n: 'En emergencia', ic: 'siren', items: [
          { t: 'mc', q: 'La licencia clase F permite conducir vehículos de:', o: ['Las Fuerzas Armadas, Carabineros, PDI y Gendarmería', 'Transporte escolar', 'Empresas de seguridad privada', 'Ferrocarriles'] },
          { t: 'tf', q: 'Un vehículo en emergencia debe usar balizas y sirena para advertir su paso.', a: true },
          { t: 'tf', q: 'Aun en emergencia, el conductor debe actuar con precaución y es responsable de evitar accidentes.', a: true },
          { t: 'mc', q: 'Al cruzar un semáforo en rojo durante una emergencia, el conductor debe:', o: ['Reducir la velocidad y asegurarse de que los demás se detuvieron antes de cruzar', 'Cruzar a máxima velocidad', 'Cruzar sin mirar porque tiene preferencia', 'Apagar la sirena'] },
          { t: 'tf', q: 'Los demás conductores pueden reaccionar de forma imprevisible al escuchar una sirena.', a: true },
          { t: 'clip', scene: 'emergencia' },
        ],
      },
      {
        n: 'Servicio seguro', ic: 'shield', items: [
          { t: 'mc', q: 'Al conducir en columna (convoy), lo más importante es:', o: ['Mantener una distancia constante y segura entre los vehículos', 'Ir pegados para no separarse', 'Adelantarse entre ellos', 'Usar luces altas para los demás'] },
          { t: 'tf', q: 'Revisar el vehículo antes de cada servicio es parte de la seguridad.', a: true },
          { t: 'mc', q: 'Conducir un vehículo de emergencia a alta velocidad en zona urbana:', o: ['Aumenta mucho el riesgo: la velocidad debe adecuarse al entorno', 'Es siempre seguro con sirena', 'No tiene riesgos', 'Es obligatorio'] },
          { t: 'tf', q: 'La fatiga y el estrés también afectan a los conductores institucionales: el descanso es parte de la seguridad.', a: true },
          { t: 'mc', q: 'Si un conductor no se aparta al escuchar la sirena:', o: ['Mantienes la calma, no lo presionas peligrosamente y buscas una alternativa segura', 'Lo empujas con el vehículo', 'Lo adelantas por la vereda entre peatones', 'Apagas las luces'] },
        ],
      },
    ],
  });
})();
