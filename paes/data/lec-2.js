// Competencia Lectora (2): inferencias y relaciones, evaluar (propósito, postura y argumentos) y géneros y tipos de texto.
(function () {
  const RB = window.RB, { M, T, F, P, S, X, O } = RB.Q;
  const tx = (id, t, b, src) => { RB.texts[id] = { t, b, src }; };

  // ---------- Textos ----------
  tx('glaciar', 'Reportaje: Los glaciares que se despiden', `Quien visite hoy el glaciar Echaurren, en la cordillera de Santiago, encontrará una lengua de hielo mucho más pequeña que la que aparece en las fotografías de los años setenta. Este glaciar, uno de los más estudiados de los Andes, ha perdido gran parte de su espesor en las últimas décadas, y algunos investigadores estiman que podría desaparecer antes de mediados de siglo.
La causa principal es el aumento de las temperaturas. Cuando el aire es más cálido, la isoterma cero —la altura a partir de la cual las precipitaciones caen como nieve— sube por la montaña. En consecuencia, en las zonas bajas llueve donde antes nevaba, y la nieve que debía alimentar al glaciar durante el invierno no se acumula.
El problema no es solo paisajístico. Los glaciares funcionan como reservas de agua: en los veranos secos, su deshielo mantiene el caudal de ríos como el Maipo, del que depende buena parte del agua potable de la capital. Paradójicamente, durante algunos años el retroceso aumenta el caudal, porque se derrite más hielo; pero cuando el glaciar se agota, ese aporte desaparece para siempre.
Por eso, más que lamentar su pérdida, los especialistas insisten en planificar: mejorar la eficiencia del riego, reparar las redes que pierden agua y proteger legalmente los glaciares que aún quedan.`, 'Reportaje elaborado para práctica.');

  tx('cronica', 'Crónica: La micro de las seis', `A las seis y diez de la mañana, la micro que baja por avenida Recoleta ya va llena. Nadie habla. Una señora reza con los ojos cerrados y un rosario enredado entre los dedos; un joven con overol naranjo duerme de pie, sostenido por la multitud como un árbol en el bosque. El chofer tiene la radio encendida en una emisora de cumbias, pero el volumen es tan bajo que la música parece venir de otro bus.
En cada paradero suben más personas y nadie baja. Cuando un estudiante intenta pasar con su mochila, la señora del rosario abre un ojo, lo mira de arriba abajo y, sin decir palabra, se corre unos centímetros. Es lo más parecido a una conversación que ocurre en todo el trayecto.
Al llegar a la Alameda, la micro se vacía de golpe, como si alguien hubiera abierto un tapón. Los pasajeros se dispersan hacia oficinas, obras y liceos. El chofer sube el volumen de la radio por primera vez y, durante un par de cuadras, la cumbia suena fuerte, solo para él.`, 'Crónica elaborada para práctica.');

  tx('carta', 'Carta al director: Celulares en la sala', `Señor director:
Leí con preocupación la propuesta de prohibir totalmente los celulares en los colegios. Entiendo que el uso descontrolado del teléfono distrae a los estudiantes; como profesora, lo veo a diario. Sin embargo, una prohibición absoluta me parece una solución simple para un problema complejo.
En primer lugar, el celular también es una herramienta de aprendizaje: con él mis alumnos buscan definiciones, graban experimentos y consultan mapas. Prohibirlo es como prohibir los lápices porque algunos estudiantes los usan para rayar las mesas.
En segundo lugar, la escuela debe enseñar a usar la tecnología, no a esconderse de ella. Fuera del colegio, los jóvenes pasan horas frente a la pantalla; si no aprenden en la sala a regular su uso, ¿dónde lo harán?
Algunos dirán que en países como Francia la prohibición funcionó. Pero los estudios sobre esas experiencias muestran resultados mixtos, y muchos de esos colegios combinaron la medida con educación digital, algo que la propuesta chilena no menciona.
Propongo, en cambio, reglas claras: teléfonos guardados durante las clases, salvo cuando el profesor los pida para una actividad, y un programa de educación digital desde la enseñanza básica.
Carolina Muñoz, profesora de Historia, Valparaíso.`, 'Carta al director elaborada para práctica.');

  tx('poema', 'Poema: Oficio de la lluvia', `Llueve sobre la ciudad dormida
como quien barre, despacio, una casa vacía.
El agua sabe nombres que nosotros olvidamos:
el de la calle de tierra, el del primer zapato.

Lluvia, vieja maestra de lo lento,
enséñame a caer sin hacer ruido,
a llegar a las raíces sin que nadie me vea,
a volver al cielo después de haber servido.

Yo, que corro de techo en techo con mi prisa,
me detengo a escucharte en la ventana:
y por un momento soy también agua,
y por un momento no me falta nada.`, 'Poema elaborado para práctica.');

  tx('teatro', 'Fragmento dramático: La herencia', `(Comedor de una casa antigua en Chillán. Sobre la mesa, una caja de cartón. ELENA, cincuenta años, ordena papeles. Entra TOMÁS, su hermano menor, con el abrigo puesto.)
TOMÁS. — Vine apenas pude. ¿Ya llegó el notario?
ELENA. — (Sin mirarlo.) Llegó ayer. Tú no.
TOMÁS. — Tenía una reunión en Santiago, Elena. Te lo expliqué.
ELENA. — Siempre tienes una reunión. Cuando mamá se enfermó, también tenías una reunión.
TOMÁS. — (Se quita el abrigo lentamente.) No vine a pelear.
ELENA. — Entonces, ¿a qué viniste? ¿A llevarte el reloj del abuelo? Está en la caja. (Empuja la caja hacia él.)
TOMÁS. — (Abre la caja; saca un cuaderno escolar.) Esto es mío... Mis composiciones de cuarto básico. ¿Ella las guardó?
ELENA. — (Por primera vez lo mira.) Todas. Las leía cuando la llamabas para decirle que no podías venir.
(TOMÁS se sienta. Silencio largo. ELENA deja de ordenar.)`, 'Fragmento dramático elaborado para práctica.');

  tx('infografia', 'Infografía: ¿Cuánta agua usamos?', `CONSUMO DE AGUA POTABLE EN UN HOGAR PROMEDIO DE LA ZONA CENTRAL (litros por persona al día)
• Ducha: 60 litros (39 %)
• Inodoro: 35 litros (23 %)
• Lavado de ropa: 24 litros (16 %)
• Cocina y bebida: 18 litros (12 %)
• Lavado de manos y dientes: 9 litros (6 %)
• Otros usos: 6 litros (4 %)
TOTAL: 152 litros por persona al día.
CONSEJOS: Una ducha de 5 minutos en vez de 10 ahorra cerca de 30 litros. Cerrar la llave al lavarse los dientes ahorra hasta 6 litros cada vez. Reparar una llave que gotea evita perder hasta 30 litros diarios.
Fuente: elaboración propia con datos de ejemplo para práctica.`, 'Texto discontinuo (infografía) elaborado para práctica.');

  // ---------- Unidad 4: inferencias y relaciones ----------
  RB.unit('lec4', {
    name: 'Inferencias y relaciones', desc: 'Deducir lo implícito, reconocer causas y consecuencias y entender cómo se conectan las ideas.', ic: 'spark', area: 'Interpretar',
    lessons: [
      {
        n: 'Leer entre líneas', ic: 'eye', items: [
          { t: 'info', ic: 'eye', title: 'Inferir', txt: 'Inferir es **deducir algo que el texto no dice directamente**, pero que se desprende de él. La inferencia correcta siempre se puede **justificar con pistas del texto**.' },
          M('¿Qué se infiere del ambiente en la micro de las seis?', ['Los pasajeros van cansados y cada uno está concentrado en lo suyo', 'Los pasajeros son amigos que viajan juntos', 'La micro va casi vacía', 'Todos van a la misma oficina'], 'Nadie habla, un joven duerme de pie y la señora reza: cansancio y silencio.', { tx: 'cronica' }),
          M('¿Por qué la señora del rosario se corre "unos centímetros" sin decir nada?', ['Para dejar pasar al estudiante, en un gesto mínimo de convivencia', 'Porque se va a bajar en el próximo paradero', 'Porque el chofer se lo ordena', 'Porque reconoce al estudiante'], 'El cronista dice que es "lo más parecido a una conversación": un gesto de cortesía silenciosa.', { tx: 'cronica' }),
          M('¿Qué sugiere que el chofer suba el volumen solo cuando la micro se vacía?', ['Que respeta el silencio de los pasajeros y disfruta un momento propio', 'Que la radio estaba descompuesta', 'Que a los pasajeros no les gusta la cumbia', 'Que está apurado por terminar su turno'], 'Al quedar solo, la música "suena fuerte, solo para él": un momento personal.', { tx: 'cronica' }),
          M('Se infiere que los pasajeros de la micro son principalmente:', ['Trabajadores y estudiantes que van a sus actividades', 'Turistas que recorren la ciudad', 'Personas que vuelven de una fiesta', 'Vendedores ambulantes'], 'Se dispersan "hacia oficinas, obras y liceos".', { tx: 'cronica' }),
          M('En "La estación", ¿qué se infiere de que el abuelo le deje "la pieza de tu mamá"?', ['Que es una forma de expresar cariño y cercanía sin decirlo', 'Que la madre del narrador vive allí', 'Que no hay otra pieza disponible', 'Que el abuelo quiere vender la casa'], 'El final del relato explica que en esa casa "las cosas importantes" se dejan, no se dicen.', { tx: 'cuento' }),
          M('¿Qué se puede inferir sobre la relación entre el narrador y su abuelo?', ['Es afectuosa, aunque se expresa con pocas palabras', 'Es conflictiva y llena de reproches', 'Es la primera vez que se conocen', 'Es distante porque no se quieren'], 'Gestos como la mano en el aire o la pieza preparada muestran afecto silencioso.', { tx: 'cuento' }),
          T('Del texto sobre el sueño se puede inferir que adelantar la hora de entrada empeoraría la falta de sueño de los adolescentes.', true, 'Si el problema es que entran demasiado temprano, adelantar la entrada lo agravaría.', { tx: 'sueno' }),
          M('¿Cuál de estas inferencias NO se desprende del texto sobre los glaciares?', ['Los glaciares crecerán si se repara la red de agua potable', 'Santiago podría tener menos agua en los veranos futuros', 'Antes nevaba más en las zonas bajas de la cordillera', 'El glaciar Echaurren era más grande en los años setenta'], 'Reparar redes ahorra agua, pero no hace crecer glaciares: esa inferencia no tiene base en el texto.', { tx: 'glaciar' }),
          M('Una inferencia es válida cuando:', ['Se puede justificar con información del texto', 'Coincide con lo que opina el lector', 'Aparece escrita literalmente en el texto', 'Es la más original de las alternativas'], 'Si estuviera escrita literalmente, sería localizar, no inferir.'),
        ],
      },
      {
        n: 'Causas y consecuencias', ic: 'bolt', items: [
          M('Según el reportaje, ¿cuál es la causa principal del retroceso de los glaciares?', ['El aumento de las temperaturas', 'La extracción de hielo para riego', 'El turismo en la cordillera', 'Los terremotos'], 'Segundo párrafo: "La causa principal es el aumento de las temperaturas".', { tx: 'glaciar' }),
          M('¿Qué consecuencia tiene que suba la isoterma cero?', ['En las zonas bajas llueve donde antes nevaba', 'Aumentan las nevadas en la ciudad', 'El glaciar se mueve más rápido', 'Los ríos se congelan en verano'], 'El texto lo une con "En consecuencia": llueve donde antes nevaba y no se acumula nieve.', { tx: 'glaciar' }),
          O('Ordena la cadena causal que explica el retroceso del glaciar', ['Aumentan las temperaturas', 'Sube la isoterma cero', 'En las zonas bajas llueve en vez de nevar', 'No se acumula nieve que alimente al glaciar', 'El glaciar pierde espesor'], 'Cada eslabón es causa del siguiente.', { tx: 'glaciar' }),
          M('¿Por qué durante algunos años el retroceso del glaciar AUMENTA el caudal de los ríos?', ['Porque se derrite más hielo de lo normal', 'Porque llueve más en verano', 'Porque se reparan las redes de agua', 'Porque el glaciar crece en invierno'], 'Es la "paradoja" del tercer párrafo: más deshielo, más caudal... hasta que se agota.', { tx: 'glaciar' }),
          M('¿Qué relación hay entre los glaciares y el agua potable de Santiago?', ['El deshielo mantiene el caudal del Maipo en verano, del que depende parte del agua potable', 'Los glaciares filtran el agua de la ciudad', 'El agua de los glaciares se embotella para venderla', 'No existe relación según el texto'], 'El tercer párrafo explica la función de reserva de los glaciares.', { tx: 'glaciar' }),
          M('En el texto sobre el sueño, ¿qué causa la privación crónica de sueño?', ['El choque entre el reloj biológico adolescente y la hora de entrada temprana', 'La rebeldía de los adolescentes', 'El exceso de tareas escolares', 'La falta de melatonina en la infancia'], 'El texto relaciona la melatonina tardía con clases antes de las ocho.', { tx: 'sueno' }),
          P('Une cada causa con su consecuencia según los textos', [['La luz azul de las pantallas', 'Se retrasa la melatonina'], ['La red de ciclovías es discontinua', 'Muchas personas no se atreven a pedalear'], ['Se pierden flores silvestres', 'Las abejas tienen menos alimento'], ['Sube la isoterma cero', 'No se acumula nieve en el glaciar']], 'Relacionar causas y efectos entre distintas partes de un texto es parte de interpretar.'),
          T('En el reportaje, los especialistas proponen principalmente lamentar la pérdida de los glaciares.', false, 'Dicen "más que lamentar su pérdida", hay que planificar.', { tx: 'glaciar' }),
          M('¿Qué propósito tiene la palabra "Paradójicamente" en el tercer párrafo del reportaje?', ['Anunciar un hecho que parece contradictorio con lo anterior', 'Introducir un ejemplo', 'Concluir el texto', 'Presentar una cifra'], 'Que un glaciar que se pierde aumente el caudal parece contradictorio: es una paradoja.', { tx: 'glaciar' }),
        ],
      },
      {
        n: 'Conectores y relaciones lógicas', ic: 'grid', items: [
          S('Clasifica cada conector según la relación que expresa', ['Causa', 'Contraste'], [['porque', 0], ['ya que', 0], ['puesto que', 0], ['sin embargo', 1], ['no obstante', 1], ['pero', 1], ['debido a que', 0], ['en cambio', 1]], 'Causa: explica por qué. Contraste: opone dos ideas.'),
          P('Une cada conector con la relación que establece', [['Por lo tanto', 'Consecuencia'], ['Aunque', 'Concesión'], ['Por ejemplo', 'Ejemplificación'], ['Además', 'Adición'], ['Es decir', 'Explicación']], 'Reconocer conectores te ayuda a seguir el razonamiento del texto.'),
          M('"Estudió todo el semestre; ___, aprobó con buena nota." ¿Qué conector corresponde?', ['por eso', 'sin embargo', 'aunque', 'en cambio'], 'Aprobar es consecuencia de estudiar: conector consecutivo.'),
          M('"___ llovía, el partido se jugó igual." ¿Qué conector corresponde?', ['Aunque', 'Porque', 'Por lo tanto', 'Además'], 'Concesión: se reconoce un obstáculo que no impide la acción.'),
          M('En "La red sigue siendo discontinua, **no obstante** el crecimiento", ¿qué relación expresa el conector?', ['Contraste', 'Causa', 'Consecuencia', 'Ejemplificación'], 'No obstante = sin embargo, a pesar de: contraste u oposición.'),
          M('"Los glaciares son reservas de agua, **es decir**, guardan agua para los veranos secos." El conector introduce:', ['Una explicación o reformulación', 'Una consecuencia', 'Una oposición', 'Una condición'], 'Es decir, o sea y esto es reformulan lo dicho.'),
          F('Los especialistas advierten que, ___ se regule el uso de pesticidas, las flores no bastarán.', ['a menos que', 'gracias a que', 'por ejemplo'], '"A menos que" introduce una condición: si no se regula, no bastará.'),
          M('En la carta, "En primer lugar... En segundo lugar..." son conectores de:', ['Orden', 'Causa', 'Contraste', 'Conclusión'], 'Ordenan los argumentos uno tras otro.', { tx: 'carta' }),
          M('¿Qué relación hay entre estas oraciones? "El agua escasea. Debemos reparar las redes que pierden agua."', ['La segunda es una consecuencia o propuesta derivada de la primera', 'La segunda contradice la primera', 'La segunda es un ejemplo de la primera', 'No tienen relación'], 'Se podría unir con "por lo tanto".'),
          T('"Sin embargo" y "en consecuencia" expresan la misma relación lógica.', false, '"Sin embargo" expresa contraste; "en consecuencia", consecuencia.'),
        ],
      },
      {
        n: 'Personajes y situaciones', ic: 'people', items: [
          M('En el fragmento dramático, ¿qué siente Elena hacia Tomás al comienzo?', ['Resentimiento por sus ausencias', 'Alegría por su llegada', 'Indiferencia total', 'Miedo de su reacción'], 'Le reprocha que "siempre tiene una reunión", incluso cuando la madre enfermó.', { tx: 'teatro' }),
          M('¿Qué revela la acotación "(Sin mirarlo.)"?', ['El enojo o distancia de Elena hacia su hermano', 'Que Elena está ciega', 'Que Tomás no ha entrado aún', 'Que Elena está leyendo un libro'], 'Las acotaciones muestran actitudes que el diálogo no dice.', { tx: 'teatro' }),
          M('¿Qué se infiere de que la madre leyera las composiciones "cuando la llamabas para decirle que no podías venir"?', ['Que la madre extrañaba a Tomás y se consolaba con sus recuerdos', 'Que la madre estaba enojada con Tomás', 'Que Tomás escribía muy bien', 'Que Elena escondía los cuadernos'], 'Es una forma de mostrar el cariño de la madre y la tristeza por sus ausencias.', { tx: 'teatro' }),
          M('¿Qué cambio ocurre al final del fragmento?', ['La tensión da paso a un momento de emoción y silencio', 'Los hermanos se pelean a gritos', 'Llega el notario con el testamento', 'Tomás se va de la casa'], 'Elena "por primera vez lo mira", Tomás se sienta y hay un "silencio largo".', { tx: 'teatro' }),
          M('¿Qué representa el cuaderno escolar dentro de la escena?', ['El amor de la madre por Tomás, que él no conocía', 'Una herencia de gran valor económico', 'Una prueba de que Tomás fue mal alumno', 'El testamento de la madre'], 'El objeto cambia el sentido de la escena: lo que Tomás esperaba no era un reloj, sino ese gesto.', { tx: 'teatro' }),
          T('Según el fragmento, Tomás llegó antes que el notario.', false, 'Elena dice: "Llegó ayer. Tú no." El notario llegó antes.', { tx: 'teatro' }),
          M('¿Cuál es el conflicto central del fragmento?', ['El reproche de Elena a Tomás por haber estado ausente de la familia', 'La disputa por el reloj del abuelo', 'La venta de la casa de Chillán', 'Una pelea con el notario'], 'El reloj es un pretexto; el conflicto es la ausencia de Tomás.', { tx: 'teatro' }),
          M('En la crónica, el joven que "duerme de pie, sostenido por la multitud como un árbol en el bosque" sugiere que:', ['La micro va tan llena que los cuerpos se sostienen entre sí', 'El joven es leñador', 'La micro pasa por un bosque', 'El joven está enfermo'], 'La comparación enfatiza el hacinamiento del bus.', { tx: 'cronica' }),
        ],
      },
    ],
  });

  // ---------- Unidad 5: evaluar ----------
  RB.unit('lec5', {
    name: 'Evaluar: propósito, postura y argumentos', desc: 'Reconocer para qué se escribe un texto, la postura del autor y la calidad de sus argumentos.', ic: 'scale', area: 'Evaluar',
    lessons: [
      {
        n: 'Propósito comunicativo', ic: 'target', items: [
          { t: 'info', ic: 'scale', title: 'Evaluar', txt: 'Evaluar es **juzgar el texto**: para qué fue escrito, qué postura defiende, si sus argumentos son sólidos y si la información es pertinente.' },
          M('¿Cuál es el propósito principal de la carta al director?', ['Persuadir de que no se prohíban totalmente los celulares y proponer otra solución', 'Informar sobre la historia de los celulares', 'Narrar una experiencia personal en Francia', 'Describir cómo funciona un celular'], 'La autora argumenta contra la prohibición y propone reglas claras.', { tx: 'carta' }),
          M('¿Cuál es el propósito principal de la noticia sobre ciclistas?', ['Informar sobre el aumento del uso de la bicicleta y sus limitaciones', 'Convencer a los lectores de usar bicicleta', 'Criticar a las autoridades de transporte', 'Entretener con anécdotas de ciclistas'], 'La noticia entrega datos de un estudio, sin opinión explícita del periodista.', { tx: 'noticia' }),
          M('¿Cuál es el propósito del texto sobre el sueño?', ['Explicar las causas del sueño tardío adolescente y sus consecuencias', 'Vender un suplemento de melatonina', 'Narrar la vida de un adolescente', 'Prohibir el uso de pantallas'], 'Es un texto de divulgación científica: explica.', { tx: 'sueno' }),
          M('¿Qué propósito tiene la crónica "La micro de las seis"?', ['Retratar con detalles una escena cotidiana de la ciudad', 'Denunciar a la empresa de buses', 'Informar sobre los horarios del transporte', 'Persuadir de usar el metro'], 'La crónica describe y da una mirada personal sobre lo cotidiano.', { tx: 'cronica' }),
          P('Une cada tipo de texto con su propósito más habitual', [['Noticia', 'Informar hechos de actualidad'], ['Columna de opinión', 'Persuadir con argumentos'], ['Instructivo', 'Indicar cómo hacer algo'], ['Cuento', 'Entretener o conmover narrando una historia']], 'El propósito orienta la forma del texto.'),
          M('¿Qué propósito tienen los "CONSEJOS" de la infografía?', ['Orientar al lector para que ahorre agua', 'Informar el precio del agua', 'Criticar a las empresas sanitarias', 'Narrar la historia del agua potable'], 'Son recomendaciones: buscan cambiar una conducta.', { tx: 'infografia' }),
          T('Un texto puede tener un propósito principal y otros secundarios.', true, 'Por ejemplo, un reportaje informa, pero también puede advertir o persuadir.'),
          M('El último párrafo del reportaje sobre glaciares tiene un propósito principalmente:', ['Exhortativo: llama a planificar y proteger los glaciares', 'Narrativo: cuenta una anécdota', 'Descriptivo: describe el paisaje', 'Humorístico'], '"Los especialistas insisten en planificar": llama a actuar.', { tx: 'glaciar' }),
        ],
      },
      {
        n: 'Tesis y argumentos', ic: 'scale', items: [
          M('¿Cuál es la tesis de la carta al director?', ['Una prohibición absoluta de los celulares en los colegios no es la solución adecuada', 'Los celulares distraen a los estudiantes', 'En Francia se prohibieron los celulares', 'Los profesores usan mucho el celular'], 'La tesis es la postura que defiende la autora.', { tx: 'carta' }),
          M('¿Qué argumento usa la autora en el segundo párrafo?', ['El celular también es una herramienta de aprendizaje', 'Los celulares son caros', 'Los estudiantes prefieren los lápices', 'La prohibición es ilegal'], 'Da ejemplos de usos: buscar definiciones, grabar experimentos, consultar mapas.', { tx: 'carta' }),
          M('"Prohibirlo es como prohibir los lápices porque algunos los usan para rayar las mesas." ¿Qué tipo de argumento es?', ['Analogía', 'Argumento de autoridad', 'Dato estadístico', 'Argumento de causa'], 'Compara dos situaciones semejantes para sacar una conclusión.', { tx: 'carta' }),
          M('¿Qué hace la autora en el cuarto párrafo ("Algunos dirán que en países como Francia...")?', ['Presenta un contraargumento y lo refuta', 'Da un nuevo argumento a favor de prohibir', 'Concluye la carta', 'Cuenta una anécdota personal'], 'Anticipa una objeción y responde que los resultados fueron mixtos.', { tx: 'carta' }),
          M('¿Qué concesión hace la autora en el primer párrafo?', ['Reconoce que el uso descontrolado del teléfono distrae a los estudiantes', 'Acepta que se prohíban los celulares', 'Admite que no sabe usar la tecnología', 'Reconoce que en Francia funcionó'], 'Conceder es aceptar parte de la postura contraria antes de oponerse.', { tx: 'carta' }),
          M('¿Qué aporta que la autora se presente como "profesora de Historia"?', ['Credibilidad: habla desde su experiencia en la sala de clases', 'Un dato irrelevante para el tema', 'Una prueba de que conoce Francia', 'Un argumento de mayoría'], 'Su experiencia respalda afirmaciones como "lo veo a diario".', { tx: 'carta' }),
          O('Ordena la estructura de la carta al director', ['Planteamiento del tema y tesis', 'Primer argumento con analogía', 'Segundo argumento', 'Contraargumento y refutación', 'Propuesta alternativa'], 'Es la estructura típica de un texto argumentativo.', { tx: 'carta' }),
          T('En la carta, la autora rechaza cualquier regla sobre el uso del celular en clases.', false, 'Propone reglas claras: teléfonos guardados salvo actividades.', { tx: 'carta' }),
          M('¿Con cuál de estas afirmaciones estaría de acuerdo la autora?', ['La escuela debe enseñar a usar responsablemente la tecnología', 'Los celulares deben usarse libremente en todas las clases', 'Las experiencias de otros países son irrelevantes', 'Los estudiantes no se distraen con el celular'], 'Su tercer párrafo lo dice: "la escuela debe enseñar a usar la tecnología".', { tx: 'carta' }),
        ],
      },
      {
        n: 'Tipos de argumentos y falacias', ic: 'flag', items: [
          P('Une cada argumento con su tipo', [['"Según la OMS, dormir poco aumenta el riesgo de obesidad"', 'Autoridad'], ['"El 61 % de los ciclistas va al trabajo en bicicleta"', 'Dato o estadística'], ['"Mi vecino dejó el azúcar y bajó cinco kilos"', 'Ejemplo o experiencia'], ['"Si sube la temperatura, la nieve se derrite"', 'Causa y efecto']], 'Reconocer el tipo de argumento ayuda a evaluar su fuerza.'),
          M('"No hay que creerle al ministro sobre economía: es un antipático." ¿Qué falacia es?', ['Ataque a la persona (ad hominem)', 'Generalización apresurada', 'Falsa disyuntiva', 'Apelación a la mayoría'], 'Ataca a la persona en vez de discutir sus argumentos.'),
          M('"Conocí a dos santiaguinos maleducados; los santiaguinos son maleducados." ¿Qué falacia es?', ['Generalización apresurada', 'Ad hominem', 'Pendiente resbaladiza', 'Falsa causa'], 'Saca una conclusión general a partir de muy pocos casos.'),
          M('"O prohibimos todos los celulares o los colegios se convertirán en un caos." ¿Qué falacia es?', ['Falsa disyuntiva', 'Argumento de autoridad', 'Analogía', 'Generalización'], 'Presenta solo dos opciones cuando existen otras (por ejemplo, reglas de uso).'),
          M('"Si permitimos un celular en clases, después querrán tablets, luego consolas y al final nadie estudiará." ¿Qué falacia es?', ['Pendiente resbaladiza', 'Ad hominem', 'Falsa disyuntiva', 'Apelación a la tradición'], 'Supone una cadena de consecuencias cada vez peores sin justificarla.'),
          M('"Este libro es bueno porque lo compró todo el mundo." ¿Qué falacia es?', ['Apelación a la mayoría', 'Argumento de autoridad legítimo', 'Analogía', 'Causa y efecto'], 'Que algo sea popular no prueba que sea bueno.'),
          M('"Desde que se instaló la antena en el barrio, llovió más. La antena causa lluvia." ¿Qué falacia es?', ['Falsa causa', 'Generalización apresurada', 'Ad hominem', 'Apelación a la mayoría'], 'Que algo ocurra después de otra cosa no significa que esa sea su causa.'),
          T('Un argumento de autoridad es válido cuando la autoridad es experta en el tema del que habla.', true, 'Citar a un médico sobre salud es pertinente; citar a un futbolista sobre medicina, no.'),
          M('¿Cuál de estos argumentos es más sólido para defender que se retrase la entrada a clases?', ['Un estudio muestra que en Seattle los alumnos durmieron 34 minutos más y mejoraron su asistencia', 'A mí no me gusta levantarme temprano', 'Todos mis compañeros opinan lo mismo', 'Los que entran temprano son unos amargados'], 'Se basa en evidencia; las demás son opinión personal, mayoría y ataque.'),
        ],
      },
      {
        n: 'Evaluar información', ic: 'search', items: [
          M('¿Qué información fortalecería el argumento de la carta contra la prohibición total?', ['Un estudio que muestre mejores resultados en colegios con reglas de uso que en colegios con prohibición total', 'Una encuesta sobre las marcas de celulares más vendidas', 'Un dato sobre el precio de los celulares', 'La opinión de un futbolista famoso'], 'Es evidencia directamente relacionada con la tesis.', { tx: 'carta' }),
          M('¿Qué información debilitaría la tesis de la carta?', ['Estudios que demuestren que la prohibición total mejora el aprendizaje en todos los casos', 'Que los profesores usen el celular para pasar lista', 'Que los celulares tengan cámara', 'Que en Valparaíso llueva mucho'], 'Contradiría el argumento de que los resultados son mixtos.', { tx: 'carta' }),
          M('Según la infografía, ¿qué uso consume más agua en el hogar?', ['La ducha', 'El inodoro', 'El lavado de ropa', 'La cocina y bebida'], 'La ducha: 60 litros, el 39 %.', { tx: 'infografia' }),
          M('Según la infografía, ¿cuántos litros ahorraría una persona que se ducha 5 minutos en vez de 10?', ['Cerca de 30 litros', 'Cerca de 60 litros', 'Cerca de 6 litros', 'Cerca de 152 litros'], 'Lo dice el primer consejo.', { tx: 'infografia' }),
          M('¿Qué conclusión se puede sacar de la infografía?', ['Reducir el tiempo de ducha es la medida individual con mayor impacto en el consumo', 'El inodoro es el mayor consumidor de agua', 'Cocinar consume más que lavar ropa', 'Lavarse los dientes es el uso principal'], 'La ducha es el mayor consumo y el consejo de ahorro más grande.', { tx: 'infografia' }),
          M('¿Qué limitación tiene la infografía como fuente?', ['Indica que usa datos de ejemplo, por lo que no son cifras oficiales', 'No menciona el inodoro', 'Está escrita en primera persona', 'No incluye consejos'], 'La fuente dice "datos de ejemplo para práctica": no es confiable para afirmar cifras reales.', { tx: 'infografia' }),
          M('Para comprobar si un dato de una noticia es confiable, lo más adecuado es:', ['Revisar la fuente original del estudio y si otras fuentes confiables lo confirman', 'Ver cuántos "me gusta" tiene la noticia', 'Confiar si el titular es llamativo', 'Preguntar la opinión de un amigo'], 'La confiabilidad depende de la fuente y de su verificación.'),
          T('En el reportaje sobre glaciares, la afirmación "podría desaparecer antes de mediados de siglo" se presenta como una certeza absoluta.', false, 'Se presenta como estimación de "algunos investigadores": es una proyección, no una certeza.', { tx: 'glaciar' }),
          M('¿Por qué el periodista de la noticia cita textualmente a los autores ("el principal freno...")?', ['Para respaldar la información con la voz de los responsables del estudio', 'Para expresar su propia opinión', 'Para criticar a los ciclistas', 'Para agregar humor'], 'La cita da precisión y respaldo a la información.', { tx: 'noticia' }),
        ],
      },
    ],
  });

  // ---------- Unidad 6: géneros y tipos de texto ----------
  RB.unit('lec6', {
    name: 'Géneros y tipos de texto', desc: 'Narrador, lírica y drama; noticia, columna, crónica, carta e infografía: cómo se organiza cada texto.', ic: 'book', area: 'Evaluar',
    lessons: [
      {
        n: 'El narrador y el mundo narrado', ic: 'book', items: [
          P('Une cada tipo de narrador con su descripción', [['Protagonista', 'Cuenta su propia historia en primera persona'], ['Testigo', 'Cuenta en primera persona lo que le ocurre a otro'], ['Omnisciente', 'Sabe todo, incluso lo que piensan los personajes'], ['Objetivo', 'Solo relata lo observable, como una cámara']], 'El narrador es la voz ficticia que cuenta la historia, no el autor.'),
          M('¿Qué tipo de narrador tiene "La estación"?', ['Protagonista', 'Omnisciente', 'Testigo', 'Objetivo'], 'El narrador cuenta en primera persona su propia llegada: "mi abuelo", "me parecía".', { tx: 'cuento' }),
          M('¿Qué tipo de narrador predomina en la crónica "La micro de las seis"?', ['Un observador que describe desde fuera lo que ve', 'Un narrador protagonista que cuenta su vida', 'El chofer en primera persona', 'Un narrador que conoce los pensamientos de todos'], 'Describe lo que ve y oye sin entrar en la mente de los pasajeros.', { tx: 'cronica' }),
          T('El narrador de un cuento es siempre el autor del texto.', false, 'El narrador es una voz creada por el autor dentro de la ficción.'),
          M('"Juan no sabía que su hermano lo esperaba con una sorpresa, ni que esa noche cambiaría su vida." ¿Qué narrador es?', ['Omnisciente', 'Protagonista', 'Testigo', 'Objetivo'], 'Sabe más que el personaje e incluso anticipa el futuro.'),
          M('En "La estación", ¿qué recurso temporal se usa al decir que el camino era "el mismo de mis veranos de infancia"?', ['Una referencia al pasado (retrospección)', 'Una anticipación del futuro', 'Un diálogo', 'Una acotación'], 'El narrador vuelve mentalmente a su infancia.', { tx: 'cuento' }),
          M('¿Dónde transcurre la acción de "La estación"?', ['En un pueblo rural del sur, entre la estación y la casa del abuelo', 'En una ciudad grande', 'En un tren en movimiento', 'En un colegio'], 'El espacio incluye la estación de Pua, un camino de tierra y la casa.', { tx: 'cuento' }),
          P('Une cada concepto narrativo con su ejemplo de "La estación"', [['Personaje principal', 'El narrador'], ['Personaje secundario', 'El abuelo'], ['Espacio', 'La estación de Pua'], ['Tiempo', 'Un verano, en enero']], 'Personajes, espacio y tiempo forman el mundo narrado.'),
        ],
      },
      {
        n: 'Género lírico', ic: 'pen', items: [
          P('Une cada concepto del género lírico con su definición', [['Hablante lírico', 'Voz que expresa sus emociones en el poema'], ['Objeto lírico', 'Ser u objeto que provoca la emoción'], ['Motivo lírico', 'Tema o sentimiento central del poema'], ['Temple de ánimo', 'Estado emocional del hablante']], 'El hablante lírico, como el narrador, no es el autor.'),
          M('En "Oficio de la lluvia", ¿cuál es el objeto lírico?', ['La lluvia', 'La ciudad', 'El primer zapato', 'El techo'], 'La lluvia es lo que motiva las emociones del hablante.', { tx: 'poema' }),
          M('¿Qué actitud lírica predomina en la segunda estrofa ("Lluvia, vieja maestra de lo lento, / enséñame...")?', ['Apostrófica: el hablante se dirige a la lluvia', 'Enunciativa: describe sin dirigirse a nadie', 'Carmínica: expresa sus emociones como una canción íntima', 'Narrativa: cuenta una historia'], 'Habla directamente a la lluvia, en segunda persona.', { tx: 'poema' }),
          M('¿Qué temple de ánimo se percibe al final del poema?', ['Calma y plenitud', 'Furia', 'Miedo', 'Burla'], '"Por un momento no me falta nada": paz.', { tx: 'poema' }),
          M('"Lluvia, vieja maestra de lo lento" es un ejemplo de:', ['Personificación', 'Hipérbole', 'Comparación', 'Ironía'], 'Se le atribuyen rasgos humanos (ser maestra) a la lluvia.', { tx: 'poema' }),
          M('"Llueve sobre la ciudad dormida / como quien barre, despacio, una casa vacía" contiene:', ['Una comparación', 'Una ironía', 'Una pregunta retórica', 'Una hipérbole'], 'Compara la lluvia con alguien que barre usando "como".', { tx: 'poema' }),
          M('¿Qué contraste plantea la última estrofa?', ['La prisa del hablante frente a la calma de la lluvia', 'El día frente a la noche', 'La ciudad frente al campo', 'La juventud frente a la vejez'], '"Yo, que corro... con mi prisa, / me detengo a escucharte".', { tx: 'poema' }),
          T('El hablante lírico desea aprender de la lluvia a ser útil sin buscar reconocimiento.', true, '"A llegar a las raíces sin que nadie me vea, / a volver al cielo después de haber servido".', { tx: 'poema' }),
        ],
      },
      {
        n: 'Género dramático', ic: 'people', items: [
          P('Une cada elemento del texto dramático con su definición', [['Acotación', 'Indicación entre paréntesis sobre gestos, lugar o movimientos'], ['Diálogo', 'Intercambio de parlamentos entre personajes'], ['Conflicto', 'Choque de fuerzas o voluntades que mueve la acción'], ['Monólogo', 'Parlamento de un personaje que habla solo']], 'El texto dramático está escrito para ser representado.'),
          M('En el fragmento "La herencia", ¿qué función cumple "(Comedor de una casa antigua en Chillán...)"?', ['Describir el espacio y los personajes al inicio de la escena', 'Mostrar lo que piensa Tomás', 'Narrar la historia de la madre', 'Indicar el final de la obra'], 'Es una acotación inicial.', { tx: 'teatro' }),
          M('¿Quiénes son los personajes del fragmento?', ['Elena y Tomás, hermanos', 'Elena y el notario', 'Tomás y su madre', 'El abuelo y Elena'], 'La madre y el notario se mencionan, pero no aparecen en escena.', { tx: 'teatro' }),
          M('En el fragmento, el reloj del abuelo funciona como:', ['Un pretexto que Elena usa para reprochar a Tomás su interés', 'El objeto más valioso de la herencia', 'Un regalo de Tomás a su madre', 'El motivo por el que llegó el notario'], 'Elena insinúa que Tomás solo vino por la herencia.', { tx: 'teatro' }),
          T('En un texto dramático la historia la cuenta principalmente un narrador.', false, 'En el drama no hay narrador: la acción avanza por el diálogo y las acotaciones.'),
          M('¿Qué acotación marca el cambio de actitud de Elena?', ['"(Por primera vez lo mira.)"', '"(Sin mirarlo.)"', '"(Empuja la caja hacia él.)"', '"(Se quita el abrigo lentamente.)"'], 'Pasa de evitarlo a mirarlo: se abre un momento de acercamiento.', { tx: 'teatro' }),
          O('Ordena la progresión de la escena', ['Tomás llega y pregunta por el notario', 'Elena le reprocha sus ausencias', 'Elena le ofrece el reloj con ironía', 'Tomás descubre su cuaderno escolar', 'Silencio y acercamiento'], 'La escena avanza de la tensión a la emoción.', { tx: 'teatro' }),
        ],
      },
      {
        n: 'Textos no literarios', ic: 'doc', items: [
          M('La estructura de "pirámide invertida" de la noticia consiste en:', ['Poner lo más importante al principio y los detalles después', 'Contar los hechos en orden cronológico desde el comienzo', 'Terminar con la información más importante', 'Alternar opinión e información'], 'Por eso el primer párrafo (lead) responde qué, quién, cuándo, dónde.'),
          M('El primer párrafo de la noticia sobre ciclistas se llama:', ['Lead o entradilla', 'Epígrafe', 'Conclusión', 'Bajada'], 'El lead resume lo esencial de la noticia.', { tx: 'noticia' }),
          P('Une cada texto con su rasgo distintivo', [['Crónica', 'Relata hechos con mirada personal y detalles de ambiente'], ['Reportaje', 'Investiga un tema en profundidad con datos y fuentes'], ['Carta al director', 'Un lector opina sobre un tema público en un diario'], ['Infografía', 'Combina datos, imágenes y textos breves']], 'Son géneros periodísticos y textos de los medios.'),
          M('¿Qué rasgo hace que "La micro de las seis" sea una crónica y no una noticia?', ['La mirada subjetiva y el uso de recursos literarios para describir', 'Que informa hechos de actualidad', 'Que tiene un titular', 'Que menciona lugares reales'], 'Comparaciones como "como un árbol en el bosque" son propias de la crónica.', { tx: 'cronica' }),
          M('La infografía sobre el agua es un texto discontinuo porque:', ['Presenta la información en listas, cifras y bloques, no en párrafos seguidos', 'No tiene título', 'Está escrita en verso', 'Le faltan datos'], 'Los textos discontinuos incluyen tablas, gráficos, listas e infografías.', { tx: 'infografia' }),
          M('¿Qué tipo de texto es "Los glaciares que se despiden"?', ['Reportaje', 'Cuento', 'Poema', 'Instructivo'], 'Investiga un tema con datos, causas y opiniones de especialistas.', { tx: 'glaciar' }),
          S('Clasifica cada texto como literario o no literario', ['Literario', 'No literario'], [['Cuento', 0], ['Noticia', 1], ['Poema', 0], ['Carta al director', 1], ['Obra de teatro', 0], ['Infografía', 1], ['Novela', 0], ['Reportaje', 1]], 'Los literarios crean mundos ficticios con intención estética; los no literarios informan o argumentan sobre el mundo real.'),
          M('¿Qué diferencia principal hay entre una noticia y una columna de opinión?', ['La noticia informa hechos; la columna argumenta una postura personal', 'La noticia es más larga', 'La columna no tiene título', 'La noticia siempre usa primera persona'], 'En la columna el autor expresa y defiende su opinión.'),
        ],
      },
    ],
  });
})();
