// Física (2): cinemática; fuerzas, leyes de Newton y momentum.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Cinemática ----------
  RB.unit('fc', {
    name: 'Movimiento: cinemática', desc: 'Distancia y desplazamiento, rapidez y velocidad, MRU, MRUA, gráficos y caída libre.', ic: 'speed', area: 'Mecánica',
    lessons: [
      {
        n: 'Describir el movimiento', ic: 'road', items: [
          { t: 'info', ic: 'road', title: 'Distancia y desplazamiento', txt: 'La **distancia** es el largo del camino recorrido (escalar). El **desplazamiento** es el cambio de posición, en línea recta desde el inicio hasta el final (vector).' },
          M('Una persona camina 3 km al norte y luego 4 km al este. ¿Cuál es la distancia recorrida y cuál la magnitud de su desplazamiento?', ['7 km y 5 km', '5 km y 7 km', '7 km y 7 km', '1 km y 5 km'], 'Distancia: 3 + 4. Desplazamiento: √(3² + 4²) = 5.'),
          M('Un atleta da una vuelta completa a una pista de 400 m y vuelve al punto de partida. Su desplazamiento es:', ['0 m', '400 m', '800 m', '200 m'], 'Terminó donde empezó.'),
          T('La rapidez es una magnitud escalar y la velocidad es una magnitud vectorial.', true, 'La velocidad incluye dirección y sentido.'),
          M('Un auto recorre 150 km en 2 horas. Su rapidez media es:', ['75 km/h', '300 km/h', '150 km/h', '37,5 km/h'], '150/2.'),
          M('72 km/h equivalen a:', ['20 m/s', '72 m/s', '7,2 m/s', '259,2 m/s'], 'Para pasar de km/h a m/s se divide por 3,6.'),
          M('Un pasajero sentado en un bus en movimiento está:', ['En reposo respecto del bus y en movimiento respecto de la calle', 'En movimiento respecto del bus', 'En reposo respecto de todo', 'En movimiento respecto de sí mismo'], 'El movimiento depende del sistema de referencia.'),
          S('Clasifica cada magnitud', ['Escalar', 'Vectorial'], [['Distancia', 0], ['Desplazamiento', 1], ['Rapidez', 0], ['Velocidad', 1], ['Tiempo', 0], ['Aceleración', 1], ['Masa', 0], ['Fuerza', 1]], 'Las vectoriales tienen magnitud, dirección y sentido.'),
          N('Un ciclista viaja a 10 m/s. ¿Cuántos metros recorre en 1 minuto?', 600, 'm', '10 m/s · 60 s.'),
        ],
      },
      {
        n: 'MRU y MRUA', ic: 'speed', items: [
          { t: 'info', ic: 'speed', title: 'Ecuaciones', txt: '**MRU** (velocidad constante): d = v · t. **MRUA** (aceleración constante): a = Δv / t · v = v₀ + a·t · d = v₀·t + ½·a·t².' },
          M('Un auto parte del reposo y alcanza 20 m/s en 5 s con aceleración constante. Su aceleración es:', ['4 m/s²', '100 m/s²', '0,25 m/s²', '20 m/s²'], 'a = 20/5.'),
          M('Un móvil con MRU recorre 30 m cada 2 s. ¿Cuánto recorre en 10 s?', ['150 m', '60 m', '300 m', '15 m'], 'Va a 15 m/s.'),
          M('Un cuerpo parte del reposo con aceleración de 2 m/s². ¿Qué distancia recorre en 4 s?', ['16 m', '8 m', '32 m', '4 m'], '½ · 2 · 4² = 16.'),
          M('Un auto a 30 m/s frena con una desaceleración de 5 m/s². ¿Cuánto tarda en detenerse?', ['6 s', '150 s', '25 s', '35 s'], 't = 30/5.'),
          M('En un gráfico posición-tiempo, una recta inclinada representa:', ['Un MRU', 'Un MRUA', 'Un cuerpo en reposo', 'Una caída libre'], 'La posición cambia lo mismo en cada segundo: velocidad constante.'),
          M('En un gráfico velocidad-tiempo, el área bajo la curva representa:', ['El desplazamiento', 'La aceleración', 'La rapidez media', 'La fuerza'], 'velocidad · tiempo = distancia.'),
          M('En un gráfico velocidad-tiempo, una recta horizontal (distinta de cero) indica:', ['Velocidad constante', 'Aceleración constante distinta de cero', 'Reposo', 'Que el móvil retrocede'], 'La velocidad no cambia.'),
          T('En un MRUA, la velocidad cambia en la misma cantidad cada segundo.', true, 'Esa cantidad es la aceleración.'),
          M('Dos autos salen al mismo tiempo de ciudades separadas por 300 km, uno hacia el otro, a 60 km/h y 90 km/h. ¿Cuándo se cruzan?', ['A las 2 h', 'A las 3 h', 'A las 5 h', 'A la 1,5 h'], 'Se acercan a 150 km/h: 300/150.'),
          M('En un gráfico velocidad-tiempo, la pendiente de la recta representa:', ['La aceleración', 'La distancia', 'La posición', 'La masa'], 'Pendiente = Δv/Δt.'),
        ],
      },
      {
        n: 'Caída libre', ic: 'down', items: [
          { t: 'info', ic: 'down', title: 'Caída libre', txt: 'Sin roce del aire, todos los cuerpos caen con la misma aceleración: **g ≈ 10 m/s²**. Al soltarlo: v = g·t y d = ½·g·t².' },
          M('Se deja caer una piedra desde el reposo. ¿Qué rapidez tiene después de 3 s? (g = 10 m/s²)', ['30 m/s', '10 m/s', '45 m/s', '3 m/s'], 'v = 10 · 3.'),
          M('¿Qué distancia recorre esa piedra en los 3 s?', ['45 m', '30 m', '90 m', '15 m'], '½ · 10 · 3² = 45.'),
          M('Sin roce del aire, se sueltan al mismo tiempo una pelota de 1 kg y otra de 5 kg desde la misma altura. ¿Qué ocurre?', ['Llegan al suelo al mismo tiempo', 'Llega primero la de 5 kg', 'Llega primero la de 1 kg', 'Depende del color'], 'La aceleración de caída no depende de la masa.'),
          M('Se lanza una pelota hacia arriba a 20 m/s. ¿Cuánto tarda en llegar a su altura máxima? (g = 10 m/s²)', ['2 s', '20 s', '4 s', '1 s'], 'Pierde 10 m/s cada segundo: 20/10.'),
          M('¿Cuál es la altura máxima de esa pelota?', ['20 m', '40 m', '10 m', '200 m'], 'h = v²/(2g) = 400/20.'),
          T('En la altura máxima de un lanzamiento vertical, la velocidad es cero, pero la aceleración sigue siendo g.', true, 'La gravedad nunca deja de actuar.'),
          M('En la Luna la gravedad es menor que en la Tierra. Si se deja caer un objeto desde la misma altura, en la Luna:', ['Tarda más en llegar al suelo', 'Tarda menos', 'Tarda lo mismo', 'Flota'], 'Con menor aceleración, tarda más.'),
          N('Un objeto cae libremente durante 2 s desde el reposo. ¿Qué rapidez alcanza? (g = 10 m/s²)', 20, 'm/s', 'v = g · t.'),
        ],
      },
    ],
  });

  // ---------- Dinámica ----------
  RB.unit('fd', {
    name: 'Fuerzas y leyes de Newton', desc: 'Tipos de fuerzas, fuerza neta, las tres leyes de Newton, momentum e impulso.', ic: 'bolt', area: 'Mecánica',
    lessons: [
      {
        n: 'Fuerzas', ic: 'bolt', items: [
          { t: 'info', ic: 'bolt', title: 'Fuerza', txt: 'Una fuerza es una **interacción** que puede cambiar el movimiento de un cuerpo o deformarlo. Se mide en **newtons (N)**. El peso es P = m · g.' },
          M('El peso de una persona de 60 kg en la Tierra (g = 10 m/s²) es:', ['600 N', '60 N', '60 kg', '6 N'], 'P = 60 · 10.'),
          M('Si esa persona viaja a la Luna, ¿qué cambia?', ['Su peso, pero no su masa', 'Su masa, pero no su peso', 'Su masa y su peso', 'Nada'], 'La masa es la cantidad de materia; el peso depende de la gravedad.'),
          P('Une cada fuerza con su descripción', [['Peso', 'Atracción gravitacional de la Tierra sobre el cuerpo'], ['Normal', 'Fuerza perpendicular de una superficie de apoyo'], ['Roce', 'Fuerza que se opone al deslizamiento'], ['Tensión', 'Fuerza que ejerce una cuerda tensa']], 'Son las fuerzas más comunes en los problemas.'),
          M('Un libro está en reposo sobre una mesa. ¿Qué fuerzas actúan sobre él?', ['El peso y la normal, que se equilibran', 'Solo el peso', 'Solo la normal', 'El peso y el roce'], 'La fuerza neta es cero: por eso no se mueve.'),
          M('Dos fuerzas de 3 N y 4 N actúan sobre un cuerpo en la misma dirección y sentido. La fuerza neta es:', ['7 N', '1 N', '5 N', '12 N'], 'Se suman.'),
          M('Si esas fuerzas actúan en sentidos opuestos, la fuerza neta es:', ['1 N', '7 N', '5 N', '0 N'], 'Se restan.'),
          M('Si esas fuerzas son perpendiculares, la fuerza neta es:', ['5 N', '7 N', '1 N', '12 N'], 'Pitágoras: √(9 + 16).'),
          T('La masa se mide en kilogramos y el peso en newtons.', true, 'El peso es una fuerza.'),
          M('El roce entre los neumáticos y el pavimento:', ['Permite que el auto avance y frene', 'Siempre es perjudicial', 'No existe en el pavimento seco', 'Aumenta la rapidez sin límite'], 'Sin roce, las ruedas patinarían.'),
        ],
      },
      {
        n: 'Leyes de Newton', ic: 'scale', items: [
          { t: 'info', ic: 'scale', title: 'Las tres leyes', txt: '**1ª, inercia**: sin fuerza neta, un cuerpo sigue en reposo o con velocidad constante. **2ª**: F = m · a. **3ª, acción y reacción**: las fuerzas vienen de a pares, iguales y opuestas, sobre cuerpos distintos.' },
          M('Cuando un bus frena bruscamente, los pasajeros se van hacia adelante. Esto se explica por:', ['La primera ley de Newton (inercia)', 'La tercera ley de Newton', 'La ley de gravitación', 'La ley de Ohm'], 'Su cuerpo tiende a seguir moviéndose.'),
          M('Una fuerza neta de 20 N actúa sobre una masa de 4 kg. ¿Qué aceleración produce?', ['5 m/s²', '80 m/s²', '0,2 m/s²', '16 m/s²'], 'a = F/m.'),
          M('Si la fuerza neta sobre un cuerpo es cero, el cuerpo:', ['Está en reposo o se mueve con velocidad constante', 'Necesariamente está en reposo', 'Acelera', 'Se detiene de inmediato'], 'Primera ley.'),
          M('Al remar, el bote avanza porque:', ['El remo empuja el agua hacia atrás y el agua empuja el remo hacia adelante', 'El agua no ejerce fuerza', 'El bote no tiene masa', 'La gravedad empuja el bote'], 'Tercera ley.'),
          M('Las fuerzas de acción y reacción:', ['Actúan sobre cuerpos distintos y tienen igual magnitud', 'Se anulan porque actúan sobre el mismo cuerpo', 'Tienen distinta magnitud', 'Solo existen en reposo'], 'Por actuar sobre cuerpos distintos, no se anulan entre sí.'),
          M('Si se duplica la fuerza neta sobre un cuerpo, su aceleración:', ['Se duplica', 'Se reduce a la mitad', 'No cambia', 'Se cuadruplica'], 'a es directamente proporcional a F.'),
          M('Si con la misma fuerza se empuja un cuerpo del doble de masa, su aceleración:', ['Se reduce a la mitad', 'Se duplica', 'No cambia', 'Se cuadruplica'], 'a es inversamente proporcional a m.'),
          T('Un cuerpo puede estar moviéndose aunque la fuerza neta sobre él sea cero.', true, 'Con velocidad constante (primera ley).'),
          N('¿Qué fuerza neta se necesita para que un auto de 1.000 kg acelere a 3 m/s²?', 3000, 'N', 'F = 1.000 · 3.'),
          M('Una persona empuja una pared y no la mueve. Según la tercera ley:', ['La pared empuja a la persona con igual fuerza', 'La pared no ejerce fuerza', 'La pared ejerce más fuerza', 'La persona no ejerce fuerza'], 'Acción y reacción siempre son iguales.'),
        ],
      },
      {
        n: 'Momentum e impulso', ic: 'spark', items: [
          { t: 'info', ic: 'spark', title: 'Momentum', txt: 'Momentum (cantidad de movimiento): **p = m · v**. Impulso: **I = F · Δt = Δp**. Si no hay fuerzas externas, el momentum total de un sistema **se conserva**.' },
          M('El momentum de un auto de 1.000 kg que viaja a 20 m/s es:', ['20.000 kg·m/s', '50 kg·m/s', '1.020 kg·m/s', '200.000 kg·m/s'], 'p = 1.000 · 20.'),
          M('Los airbags reducen las lesiones porque:', ['Aumentan el tiempo del impacto y reducen la fuerza', 'Reducen el momentum inicial', 'Aumentan la fuerza', 'Detienen el auto antes del choque'], 'El mismo cambio de momentum en más tiempo requiere menos fuerza.'),
          M('Un patinador de 50 kg, en reposo, lanza una pelota de 1 kg a 10 m/s. ¿Con qué rapidez retrocede?', ['0,2 m/s', '10 m/s', '5 m/s', '2 m/s'], 'Conservación: 50 · v = 1 · 10.'),
          T('En un choque sin fuerzas externas, el momentum total del sistema se conserva.', true, 'Lo que pierde un cuerpo lo gana el otro.'),
          M('Un carro de 2 kg a 3 m/s choca con otro de 1 kg en reposo y quedan unidos. ¿Con qué rapidez se mueven juntos?', ['2 m/s', '3 m/s', '1 m/s', '6 m/s'], 'Momentum inicial 6; masa total 3: v = 6/3.'),
          M('Una fuerza de 50 N actúa durante 0,2 s. ¿Qué impulso entrega?', ['10 N·s', '250 N·s', '50,2 N·s', '0,004 N·s'], 'I = F · Δt.'),
          M('Al saltar desde una altura, conviene doblar las rodillas al caer porque:', ['Se alarga el tiempo de frenado y disminuye la fuerza', 'Aumenta la fuerza del impacto', 'Se reduce la masa', 'Se elimina el momentum'], 'Igual que el airbag.'),
          M('Un rifle retrocede al disparar. Esto se explica por:', ['La conservación del momentum', 'La primera ley de la termodinámica', 'La refracción', 'El efecto Doppler'], 'La bala va hacia adelante y el rifle hacia atrás.'),
        ],
      },
    ],
  });
})();
