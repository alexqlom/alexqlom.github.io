// Física (3): energía, trabajo y potencia; calor y temperatura.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Energía ----------
  RB.unit('fe', {
    name: 'Energía, trabajo y potencia', desc: 'Energía cinética y potencial, conservación de la energía mecánica, trabajo, potencia y eficiencia.', ic: 'bolt', vid: 'v-fe', area: 'Mecánica',
    lessons: [
      {
        n: 'Formas de energía', ic: 'bolt', items: [
          { t: 'info', ic: 'bolt', title: 'Energía mecánica', txt: 'Cinética: **Ec = ½ · m · v²**. Potencial gravitatoria: **Ep = m · g · h**. Potencial elástica: Ee = ½ · k · x². La energía mecánica es Ec + Ep, y se mide en **joules (J)**.' },
          M('La energía cinética de un auto de 1.000 kg que va a 10 m/s es:', ['50.000 J', '10.000 J', '100.000 J', '5.000 J'], '½ · 1.000 · 10² = 50.000.'),
          M('Si la rapidez de un cuerpo se duplica, su energía cinética:', ['Se cuadruplica', 'Se duplica', 'No cambia', 'Se reduce a la mitad'], 'La rapidez está al cuadrado: 2² = 4.'),
          M('La energía potencial gravitatoria de una masa de 2 kg a 5 m de altura es (g = 10 m/s²):', ['100 J', '10 J', '50 J', '7 J'], '2 · 10 · 5 = 100.'),
          M('¿Qué tipo de energía tiene un resorte comprimido?', ['Potencial elástica', 'Cinética', 'Térmica', 'Nuclear'], 'Se almacena al deformarlo.'),
          P('Une cada situación con la transformación de energía que ocurre', [['Una central hidroeléctrica', 'Potencial gravitatoria → eléctrica'], ['Un panel solar', 'Luminosa → eléctrica'], ['Una ampolleta', 'Eléctrica → luminosa y térmica'], ['Frotarse las manos', 'Cinética → térmica']], 'La energía se transforma de una forma en otra.'),
          T('La energía no se crea ni se destruye: solo se transforma.', true, 'Es el principio de conservación de la energía.'),
          M('La unidad de energía en el Sistema Internacional es:', ['El joule', 'El watt', 'El newton', 'El kilogramo'], 'El watt es de potencia y el newton, de fuerza.'),
          N('Un cuerpo de 4 kg se mueve a 3 m/s. ¿Cuál es su energía cinética?', 18, 'J', '½ · 4 · 9 = 18.'),
        ],
      },
      {
        n: 'Conservación de la energía', ic: 'replay', items: [
          M('Se deja caer una pelota de 1 kg desde 20 m. Sin roce, ¿con qué energía cinética llega al suelo? (g = 10 m/s²)', ['200 J', '20 J', '100 J', '2.000 J'], 'Toda la Ep inicial (1 · 10 · 20) se transforma en Ec.'),
          M('¿Con qué rapidez llega esa pelota al suelo?', ['20 m/s', '200 m/s', '10 m/s', '400 m/s'], '½ · 1 · v² = 200 → v² = 400.'),
          M('En un péndulo sin roce, en el punto más bajo de su recorrido:', ['La energía cinética es máxima', 'La energía potencial es máxima', 'La energía mecánica es cero', 'La rapidez es cero'], 'Abajo la altura es mínima y la rapidez, máxima.'),
          M('Un carro de montaña rusa parte del reposo a 45 m de altura. Sin roce, ¿con qué rapidez pasa por el punto más bajo (0 m)? (g = 10 m/s²)', ['30 m/s', '45 m/s', '900 m/s', '15 m/s'], 'v = √(2 · g · h) = √900.'),
          M('Si hay roce, la energía mecánica:', ['Disminuye, porque parte se transforma en calor', 'Aumenta', 'Se conserva igual', 'Desaparece sin transformarse'], 'La energía total se conserva, pero la mecánica se "pierde" como calor.'),
          T('En la altura máxima de un lanzamiento vertical sin roce, toda la energía cinética inicial se transformó en potencial.', true, 'Arriba la rapidez es cero.'),
          M('Un cuerpo resbala sin roce por un plano inclinado desde 5 m de altura. ¿Su rapidez al llegar abajo depende de la inclinación?', ['No: solo depende de la altura', 'Sí: más inclinado, más rápido', 'Sí: menos inclinado, más rápido', 'Depende de la masa'], 'm·g·h = ½·m·v²: la masa y la inclinación no influyen.'),
          M('¿Cuál es la energía mecánica de un cuerpo de 2 kg que está a 10 m de altura y se mueve a 10 m/s? (g = 10 m/s²)', ['300 J', '200 J', '100 J', '120 J'], 'Ep = 200 J y Ec = 100 J.'),
        ],
      },
      {
        n: 'Trabajo y potencia', ic: 'gear', items: [
          { t: 'info', ic: 'gear', title: 'Trabajo y potencia', txt: 'Trabajo: **W = F · d** (fuerza en la dirección del desplazamiento). Potencia: **P = W / t**, en watts (1 W = 1 J/s). Eficiencia = energía útil / energía recibida.' },
          M('Una fuerza de 20 N empuja una caja 5 m en su misma dirección. ¿Qué trabajo realiza?', ['100 J', '4 J', '25 J', '15 J'], '20 · 5.'),
          M('Una persona sostiene una maleta quieta durante 10 minutos. ¿Qué trabajo mecánico realiza sobre la maleta?', ['Cero', 'Mucho, porque se cansa', 'Igual al peso de la maleta', 'Igual al peso multiplicado por 10'], 'Sin desplazamiento no hay trabajo mecánico.'),
          M('Un motor realiza 3.000 J de trabajo en 10 s. Su potencia es:', ['300 W', '30.000 W', '30 W', '3 W'], '3.000/10.'),
          M('Dos personas de igual masa suben la misma escalera; una tarda la mitad del tiempo. ¿Qué se puede afirmar?', ['Hacen el mismo trabajo, pero la más rápida desarrolla el doble de potencia', 'La más rápida hace el doble de trabajo', 'Ambas tienen la misma potencia', 'La más lenta hace más trabajo'], 'El trabajo es m·g·h para ambas; la potencia es trabajo/tiempo.'),
          M('Una ampolleta de 100 W encendida durante 2 horas consume:', ['0,2 kWh', '200 kWh', '50 kWh', '2 kWh'], '0,1 kW · 2 h.'),
          M('Una máquina recibe 1.000 J y entrega 600 J de trabajo útil. Su eficiencia es:', ['60 %', '40 %', '160 %', '6 %'], '600/1.000.'),
          T('El watt es la unidad de potencia y equivale a 1 joule por segundo.', true, 'Por eso kWh es una unidad de energía.'),
          N('¿Cuánta energía consume un aparato de 50 W durante 1 minuto?', 3000, 'J', 'E = P · t = 50 · 60.'),
        ],
      },
    ],
  });

  // ---------- Calor y temperatura ----------
  RB.unit('ff', {
    name: 'Calor y temperatura', desc: 'Escalas de temperatura, equilibrio térmico, calor específico, cambios de estado, dilatación y propagación del calor.', ic: 'flame', vid: 'v-ff', area: 'Energía',
    lessons: [
      {
        n: 'Temperatura y escalas', ic: 'flame', items: [
          { t: 'info', ic: 'flame', title: 'Calor vs. temperatura', txt: 'La **temperatura** mide la agitación de las partículas. El **calor** es energía que pasa del cuerpo más caliente al más frío. Escalas: K = °C + 273 · °F = 1,8 · °C + 32.' },
          M('El calor es:', ['Energía que se transfiere de un cuerpo de mayor a uno de menor temperatura', 'Lo mismo que la temperatura', 'Una sustancia que contienen los cuerpos', 'La cantidad de materia de un cuerpo'], 'Los cuerpos no "tienen" calor: lo transfieren.'),
          M('25 °C equivalen en la escala Kelvin a:', ['298 K', '248 K', '25 K', '77 K'], '25 + 273.'),
          M('El cero absoluto (0 K) corresponde a:', ['−273 °C', '0 °C', '−100 °C', '273 °C'], 'Es la temperatura más baja posible.'),
          M('100 °C equivalen en Fahrenheit a:', ['212 °F', '180 °F', '100 °F', '132 °F'], '1,8 · 100 + 32.'),
          M('Dos cuerpos a distinta temperatura se ponen en contacto. Después de un tiempo:', ['Alcanzan la misma temperatura (equilibrio térmico)', 'El cuerpo frío le pasa "frío" al caliente', 'Mantienen sus temperaturas', 'Ambos se enfrían'], 'El calor fluye hasta que se igualan las temperaturas.'),
          T('Una variación de 10 °C equivale a una variación de 10 K.', true, 'Ambas escalas tienen grados del mismo tamaño.'),
          M('¿Qué mide un termómetro?', ['La temperatura', 'El calor total del cuerpo', 'La masa', 'La presión'], 'Mide el nivel de agitación térmica.'),
          M('¿A qué temperatura las escalas Celsius y Fahrenheit marcan el mismo número?', ['−40', '0', '32', '100'], 'x = 1,8x + 32 → x = −40.'),
        ],
      },
      {
        n: 'Calor específico y cambios de estado', ic: 'flask', items: [
          { t: 'info', ic: 'flask', title: 'Q = m · c · ΔT', txt: 'El calor necesario para cambiar la temperatura depende de la masa, del material (calor específico c) y de la variación de temperatura. Para el agua, **c = 1 cal/g°C**. Durante un cambio de estado, la temperatura **no cambia**.' },
          M('¿Cuánto calor se necesita para calentar 200 g de agua de 20 °C a 70 °C? (c = 1 cal/g°C)', ['10.000 cal', '14.000 cal', '4.000 cal', '50 cal'], '200 · 1 · 50.'),
          M('El agua tiene un calor específico alto. Esto significa que:', ['Necesita mucho calor para cambiar su temperatura', 'Se calienta muy rápido', 'No puede hervir', 'No conduce el calor'], 'Por eso regula el clima.'),
          M('Mientras el hielo se derrite a 0 °C, su temperatura:', ['Se mantiene constante', 'Aumenta', 'Disminuye', 'Oscila'], 'El calor se usa para cambiar de estado (calor latente).'),
          P('Une cada cambio de estado con su nombre', [['Sólido → líquido', 'Fusión'], ['Líquido → gas', 'Vaporización'], ['Gas → líquido', 'Condensación'], ['Líquido → sólido', 'Solidificación'], ['Sólido → gas', 'Sublimación']], 'La sublimación ocurre, por ejemplo, con el hielo seco.'),
          M('¿Por qué las ciudades costeras tienen temperaturas más moderadas que las del interior?', ['Porque el mar, por su alto calor específico, se calienta y enfría lentamente', 'Porque en la costa no llega el sol', 'Porque el viento es siempre caliente', 'Porque el agua del mar es salada'], 'El océano amortigua los cambios de temperatura.'),
          M('La mayoría de los materiales, al calentarse:', ['Se dilatan', 'Se contraen', 'Pierden masa', 'Cambian de color'], 'Las partículas se agitan más y se separan.'),
          M('Las líneas del tren y los puentes tienen pequeñas separaciones (juntas) para:', ['Permitir la dilatación por calor', 'Ahorrar material', 'Drenar el agua', 'Hacer ruido'], 'Sin juntas, el metal dilatado se deformaría.'),
          T('Entre 0 °C y 4 °C, el agua se contrae al calentarse.', true, 'Es la dilatación anómala: por eso el hielo flota y los lagos se congelan desde arriba.'),
        ],
      },
      {
        n: 'Propagación del calor', ic: 'sun', items: [
          P('Une cada forma de propagación con su ejemplo', [['Conducción', 'Una cuchara metálica se calienta dentro de una olla'], ['Convección', 'El aire caliente sube y el frío baja en una pieza'], ['Radiación', 'El calor del Sol llega a la Tierra']], 'Conducción: contacto. Convección: movimiento de fluidos. Radiación: ondas electromagnéticas.'),
          M('¿Cómo llega el calor del Sol a la Tierra a través del espacio vacío?', ['Por radiación', 'Por conducción', 'Por convección', 'No llega calor'], 'La radiación no necesita medio.'),
          M('Los metales se sienten fríos al tacto porque:', ['Son buenos conductores y extraen rápido el calor de la mano', 'Están a menor temperatura que el ambiente', 'No tienen calor', 'Reflejan la luz'], 'A igual temperatura que la madera, el metal se siente más frío.'),
          M('Una estufa calienta toda una pieza principalmente por:', ['Convección del aire', 'Conducción por el suelo', 'Solo radiación', 'Sublimación'], 'El aire caliente sube y circula.'),
          M('Un termo mantiene el café caliente porque:', ['Reduce la conducción, la convección y la radiación', 'Genera calor', 'Aumenta la convección', 'Absorbe el frío'], 'Tiene vacío entre paredes y superficies reflectantes.'),
          T('La lana abriga porque produce calor.', false, 'Es aislante: atrapa aire y reduce la pérdida del calor de tu cuerpo.'),
          M('¿Qué material es mejor aislante térmico?', ['Plumavit (poliestireno expandido)', 'Cobre', 'Aluminio', 'Hierro'], 'Contiene mucho aire atrapado.'),
          M('La brisa que en el día sopla desde el mar hacia la tierra se explica por:', ['La convección del aire', 'La conducción', 'La radiación del mar', 'La dilatación del agua'], 'La tierra se calienta más rápido, su aire sube y el aire del mar ocupa su lugar.'),
        ],
      },
    ],
  });

  // ---------- Videos ----------
  RB.video('v-fe', {
    u: 'fe', title: 'Energía, trabajo y potencia', desc: 'Energía cinética y potencial, conservación, trabajo, potencia, kWh y eficiencia.',
    sc: [
      { h: 'Energía, trabajo y potencia', sub: 'Nada se pierde, todo se transforma', b: [{ tags: ['Cinética', 'Potencial', 'Conservación', 'Roce', 'Trabajo', 'Potencia', 'Eficiencia'] }],
        s: ['Hola. La energía es uno de los conceptos más poderosos de la física, porque permite resolver problemas complicados con ideas simples.', 'Veremos la energía cinética y potencial, la conservación de la energía, el trabajo, la potencia, los kilowatts hora de tu cuenta de luz y la eficiencia de las máquinas.'] },
      { h: 'Energía cinética', ic: 'speed', b: [{ eq: 'Ec = ½ · m · v²' }, { eq: 'Auto de 1.000 kg a 10 m/s: Ec = ½ · 1.000 · 100 = 50.000 J' }, { warn: 'La rapidez va **al cuadrado**: el doble de rapidez es **cuatro veces** más energía.' }],
        s: ['La energía cinética es la energía del movimiento.', 'Se calcula como un medio de la masa por la rapidez al cuadrado, y se mide en joules.', 'Un auto de mil kilos a diez metros por segundo tiene cincuenta mil joules.', 'Fíjate en que la rapidez está al cuadrado. Si duplicas la rapidez, la energía se multiplica por cuatro. Por eso un choque a cien kilómetros por hora es mucho más que el doble de grave que uno a cincuenta.'] },
      { h: 'Energía potencial', ic: 'landmark', b: [{ eq: 'Ep gravitatoria = m · g · h' }, { eq: '2 kg a 5 m de altura: Ep = 2 · 10 · 5 = 100 J' }, { two: [['Potencial elástica', 'Resortes y elásticos deformados'], ['Energía mecánica', 'Em = Ec + Ep']] }],
        s: ['La energía potencial es energía almacenada por la posición.', 'La gravitatoria es masa por gravedad por altura.', 'Una masa de dos kilos a cinco metros de altura tiene cien joules.', 'Un resorte comprimido o un elástico estirado tienen energía potencial elástica. Y la suma de la cinética y la potencial es la energía mecánica.'] },
      { h: 'Conservación de la energía', ic: 'replay', b: [{ plot: { f: [h => 10 * (20 - h), h => 10 * h], x: [0, 20], y: [0, 210], cap: 'Pelota de 1 kg que cae desde 20 m: Ep (lima) baja y Ec (blanca) sube; la suma es siempre 200 J' } }, { eq: 'm · g · h = ½ · m · v²  →  v = √(2 · g · h) = √(2 · 10 · 20) = 20 m/s' }, { tip: 'Sin roce, la rapidez final **no depende de la masa** ni de la inclinación: solo de la altura.' }],
        s: ['El principio clave es que la energía no se crea ni se destruye: solo se transforma.', 'Mira una pelota de un kilo que cae desde veinte metros. Mientras cae, su energía potencial disminuye y su energía cinética aumenta, pero la suma se mantiene en doscientos joules.', 'Al llegar al suelo, toda la potencial se transformó en cinética. Igualando, la rapidez final es la raíz de dos por gravedad por altura: veinte metros por segundo.', 'Y un detalle muy preguntado: sin roce, la rapidez final no depende de la masa ni de la forma del camino, solo de la altura.'] },
      { h: 'Péndulos y montañas rusas', ic: 'spark', b: [{ two: [['Punto más alto', 'Ep máxima · Ec mínima'], ['Punto más bajo', 'Ec máxima · Ep mínima']] }, { warn: 'Con **roce**, la energía mecánica **disminuye**: se transforma en calor.' }, { q: 'Un carro parte del reposo a 45 m de altura. Sin roce, ¿con qué rapidez pasa por el punto más bajo?', o: ['30 m/s', '45 m/s', '900 m/s', '15 m/s'], e: 'v = √(2 · 10 · 45) = √900 = 30 m/s.' }],
        s: ['En un péndulo o una montaña rusa, la energía va y viene entre potencial y cinética.', 'En el punto más alto, la energía potencial es máxima; en el más bajo, la cinética es máxima.', 'Si hay roce, parte de la energía mecánica se transforma en calor, así que la energía mecánica disminuye. La energía total se conserva, pero ya no está disponible como movimiento.', 'Calcula esta.'] },
      { h: 'Trabajo', ic: 'gear', b: [{ eq: 'W = F · d', n: 'Solo cuenta la fuerza en la dirección del desplazamiento' }, { eq: '20 N empujando una caja 5 m: W = 100 J' }, { warn: 'Sostener una maleta quieta: te cansas, pero el **trabajo mecánico es cero** (no hay desplazamiento).' }],
        s: ['En física, el trabajo tiene un significado preciso: es la fuerza por el desplazamiento en la dirección de la fuerza.', 'Se mide también en joules, porque el trabajo es energía transferida.', 'Si empujas una caja con veinte newtons a lo largo de cinco metros, haces cien joules de trabajo.', 'Y aquí una trampa clásica: si sostienes una maleta quieta durante diez minutos, te cansas, pero el trabajo mecánico sobre la maleta es cero, porque no hay desplazamiento.'] },
      { h: 'Potencia y kWh', ic: 'bolt', b: [{ eq: 'P = W / t  →  3.000 J en 10 s = 300 W' }, { ex: 'Dos personas suben la misma escalera; una en la mitad del tiempo: **mismo trabajo, doble potencia**' }, { eq: 'Energía = potencia · tiempo  →  100 W · 2 h = 0,2 kWh', n: 'El kWh es una unidad de **energía**: es lo que cobra la cuenta de luz' }, { eq: 'Eficiencia = energía útil / energía recibida  →  600 / 1.000 = 60 %' }],
        s: ['Ahora, la potencia.', 'La potencia es qué tan rápido se realiza un trabajo: trabajo dividido por tiempo. Se mide en watts. Tres mil joules en diez segundos son trescientos watts.', 'Si dos personas suben la misma escalera, y una tarda la mitad, ambas hacen el mismo trabajo, pero la más rápida desarrolla el doble de potencia.', 'La energía es potencia por tiempo. Una ampolleta de cien watts encendida dos horas consume cero coma dos kilowatts hora. Ojo: el kilowatt hora es una unidad de energía, y es lo que te cobran en la cuenta de luz.', 'Por último, la eficiencia: qué parte de la energía recibida se convierte en energía útil. Si una máquina recibe mil joules y entrega seiscientos útiles, su eficiencia es sesenta por ciento.'] },
      { h: 'Transformaciones de energía', ic: 'globe', b: [{ two: [['Central hidroeléctrica', 'Potencial → eléctrica'], ['Panel solar', 'Luminosa → eléctrica']] }, { two: [['Ampolleta', 'Eléctrica → luz y calor'], ['Frotar las manos', 'Cinética → térmica']] }, { q: '¿Qué transformación ocurre en una central hidroeléctrica?', o: ['Potencial gravitatoria → eléctrica', 'Eléctrica → potencial', 'Química → luminosa', 'Nuclear → térmica'], e: 'El agua almacenada en altura cae, mueve turbinas y genera electricidad.' }],
        s: ['La PAES también pregunta por las transformaciones de energía en la vida diaria.', 'En una central hidroeléctrica, la energía potencial del agua se transforma en eléctrica. En un panel solar, la energía luminosa se transforma en eléctrica.', 'Una ampolleta transforma energía eléctrica en luz y calor. Y al frotarte las manos, la energía cinética se transforma en térmica.', 'Una última.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Ec = ½mv²', 'Ep = mgh', 'Se conserva sin roce', 'v = √(2gh)', 'W = F · d', 'P = W/t', 'kWh = energía'] }],
        s: ['Resumen: la energía cinética depende de la rapidez al cuadrado y la potencial de la altura. Sin roce, la energía mecánica se conserva.', 'El trabajo es fuerza por desplazamiento, la potencia es trabajo por tiempo, y el kilowatt hora es una unidad de energía. ¡A practicar!'] },
    ],
  });

  RB.video('v-ff', {
    u: 'ff', title: 'Calor y temperatura', desc: 'Escalas, equilibrio térmico, Q = m·c·ΔT, cambios de estado, dilatación y propagación del calor.',
    sc: [
      { h: 'Calor y temperatura', sub: 'No son lo mismo', b: [{ tags: ['Temperatura', 'Calor', 'Escalas', 'Calor específico', 'Cambios de estado', 'Dilatación', 'Propagación'] }],
        s: ['Hola. En el lenguaje diario decimos que hace calor o que algo tiene calor, pero en física calor y temperatura son conceptos distintos.', 'En este video veremos la diferencia, las escalas de temperatura, el calor específico, los cambios de estado, la dilatación y las tres formas en que se propaga el calor.'] },
      { h: 'Calor vs. temperatura', ic: 'flame', b: [{ two: [['Temperatura', 'Mide la agitación de las partículas', 'Se mide con termómetro'], ['Calor', 'Energía en tránsito', 'Va del cuerpo caliente al frío']] }, { ex: 'Café caliente en una pieza fría: el café cede calor hasta el **equilibrio térmico**' }, { warn: 'Los cuerpos no "tienen" calor ni "pasan frío": transfieren energía.' }],
        s: ['Empecemos por la diferencia más importante.', 'La temperatura mide qué tan agitadas están las partículas de un cuerpo. El calor es la energía que pasa de un cuerpo de mayor temperatura a otro de menor temperatura.', 'Si dejas un café caliente en una pieza fría, el café cede calor al ambiente hasta que ambos quedan a la misma temperatura. Eso se llama equilibrio térmico.', 'Por eso, en física, un cuerpo no tiene calor, ni el frío pasa de un lado a otro. Lo que viaja es energía, siempre de lo caliente a lo frío.'] },
      { h: 'Escalas de temperatura', ic: 'list', b: [{ eq: 'K = °C + 273  →  25 °C = 298 K' }, { eq: '°F = 1,8 · °C + 32  →  100 °C = 212 °F' }, { two: [['Cero absoluto', '0 K = −273 °C'], ['Dato curioso', '−40 °C = −40 °F']] }],
        s: ['Hay tres escalas de temperatura que debes conocer.', 'Para pasar de Celsius a Kelvin, suma doscientos setenta y tres: veinticinco grados Celsius son doscientos noventa y ocho kelvin.', 'Para pasar a Fahrenheit, multiplica por uno coma ocho y suma treinta y dos: cien grados Celsius son doscientos doce Fahrenheit.', 'El cero absoluto, cero kelvin, equivale a menos doscientos setenta y tres grados Celsius: es la temperatura más baja posible. Y un dato curioso que aparece en la PAES: menos cuarenta es igual en Celsius y en Fahrenheit.'] },
      { h: 'Calor específico', ic: 'calc', b: [{ eq: 'Q = m · c · ΔT' }, { eq: '200 g de agua de 20 °C a 70 °C: Q = 200 · 1 · 50 = 10.000 cal' }, { tip: 'El agua tiene un calor específico **alto**: por eso el mar modera el clima de las ciudades costeras.' }, { q: '¿Cuánto calor se necesita para calentar 100 g de agua en 30 °C? (c = 1 cal/g°C)', o: ['3.000 cal', '130 cal', '300 cal', '30 cal'], e: 'Q = 100 · 1 · 30 = 3.000 cal.' }],
        s: ['¿Cuánto calor se necesita para calentar algo?', 'El calor es la masa por el calor específico por la variación de temperatura. El calor específico depende del material.', 'Para el agua es una caloría por gramo por grado. Calentar doscientos gramos de agua de veinte a setenta grados requiere diez mil calorías.', 'El agua tiene un calor específico alto: necesita mucho calor para cambiar su temperatura. Por eso el mar se calienta y se enfría lentamente, y las ciudades costeras tienen temperaturas más moderadas.', 'Calcula tú.'] },
      { h: 'Cambios de estado', ic: 'flask', b: [{ tl: 'Fusión', t: 'Sólido → líquido (hielo que se derrite)' }, { tl: 'Vaporización', t: 'Líquido → gas · y Condensación: gas → líquido' }, { tl: 'Solidificación', t: 'Líquido → sólido' }, { tl: 'Sublimación', t: 'Sólido → gas directo (hielo seco)' }, { tl: '¡Ojo!', t: 'Durante el cambio de estado, la temperatura **no cambia**' }],
        s: ['Al ganar o perder calor, la materia puede cambiar de estado.', 'La fusión es el paso de sólido a líquido, como el hielo que se derrite.', 'La vaporización es de líquido a gas, y la condensación, de gas a líquido, como el vapor que empaña un espejo.', 'La solidificación es el paso de líquido a sólido, como el agua que se congela.', 'Y la sublimación es el paso directo de sólido a gas, como ocurre con el hielo seco.', 'Y un dato fundamental: mientras ocurre el cambio de estado, la temperatura se mantiene constante. El hielo que se derrite sigue a cero grados hasta que se derrite por completo, porque el calor se usa en cambiar de estado.'] },
      { h: 'Dilatación', ic: 'spark', b: [{ ex: 'Puentes y rieles tienen **juntas de dilatación**' }, 'Al calentarse, la mayoría de los materiales **se dilatan**', { two: [['Dilatación anómala del agua', 'Entre 0 °C y 4 °C se contrae al calentarse'], ['Consecuencia', 'El hielo flota y los lagos se congelan desde arriba']] }],
        s: ['Otro efecto del calor es la dilatación.', 'Por eso los puentes y los rieles del tren tienen pequeñas separaciones, llamadas juntas de dilatación: en verano el metal se alarga y necesita espacio.', 'La mayoría de los materiales se dilatan al calentarse, porque sus partículas se agitan más y se separan.', 'Pero el agua tiene un comportamiento especial: entre cero y cuatro grados se contrae al calentarse. Por eso el hielo es menos denso que el agua líquida y flota, y los lagos se congelan desde arriba, protegiendo la vida que hay abajo.'] },
      { h: 'Cómo se propaga el calor', ic: 'sun', b: [{ two: [['Conducción', 'Por contacto: una cuchara en la olla'], ['Convección', 'Por movimiento de fluidos: el aire caliente sube']] }, { two: [['Radiación', 'Por ondas electromagnéticas, incluso en el vacío: el Sol'], ['Aislantes', 'Lana, plumavit: atrapan aire']] }, { q: '¿Cómo llega el calor del Sol a la Tierra?', o: ['Por radiación', 'Por conducción', 'Por convección', 'No llega calor'], e: 'En el espacio no hay materia: solo puede viajar como radiación.' }],
        s: ['El calor se propaga de tres formas.', 'Por conducción, por contacto directo, como cuando se calienta el mango de una cuchara dentro de una olla. Por convección, mediante el movimiento de líquidos o gases: el aire caliente sube y el frío baja, y así una estufa calienta toda la pieza.', 'Y por radiación, mediante ondas electromagnéticas, que pueden viajar incluso en el vacío. Así nos llega el calor del Sol. Los aislantes, como la lana o el plumavit, atrapan aire y frenan la pérdida de calor: no producen calor, lo conservan.', '¿Lo tienes claro?'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Calor = energía en tránsito', 'K = °C + 273', 'Q = m · c · ΔT', 'Agua: c alto', 'Cambio de estado: T constante', 'Conducción · convección · radiación'] }],
        s: ['Resumen: la temperatura mide agitación y el calor es energía en tránsito. Para pasar a kelvin, suma doscientos setenta y tres.', 'El calor necesario es masa por calor específico por variación de temperatura, la temperatura no cambia durante un cambio de estado, y el calor viaja por conducción, convección y radiación. ¡A practicar!'] },
    ],
  });
})();
