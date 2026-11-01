// Física (3): energía, trabajo y potencia; calor y temperatura.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Energía ----------
  RB.unit('fe', {
    name: 'Energía, trabajo y potencia', desc: 'Energía cinética y potencial, conservación de la energía mecánica, trabajo, potencia y eficiencia.', ic: 'bolt', area: 'Mecánica',
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
    name: 'Calor y temperatura', desc: 'Escalas de temperatura, equilibrio térmico, calor específico, cambios de estado, dilatación y propagación del calor.', ic: 'flame', area: 'Energía',
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
})();
