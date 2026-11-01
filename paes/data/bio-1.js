// Biología (1): la célula; biomoléculas, enzimas y energía (fotosíntesis, respiración y fermentación).
(function () {
  const RB = window.RB, { M, T, F, P, S, O, X } = RB.Q;

  // ---------- La célula ----------
  RB.unit('ba', {
    name: 'La célula', desc: 'Teoría celular, células procariotas y eucariotas, organelos, membrana plasmática y transporte.', ic: 'cell', area: 'Célula',
    lessons: [
      {
        n: 'Teoría celular y tipos de célula', ic: 'cell', items: [
          { t: 'info', ic: 'cell', title: 'Teoría celular', txt: '1) Todos los seres vivos están formados por **células**. 2) La célula es la **unidad estructural y funcional**. 3) Toda célula proviene de **otra célula**. Las **procariotas** (bacterias y arqueas) no tienen núcleo; las **eucariotas** (animales, plantas, hongos y protistas) sí.' },
          M('Según la teoría celular, toda célula proviene de:', ['Otra célula preexistente', 'La materia inerte', 'El agua y el aire', 'Una molécula de ADN aislada'], 'Lo planteó Virchow en el siglo XIX y descartó la generación espontánea.'),
          M('¿Qué característica distingue a una célula procariota?', ['No tiene núcleo: su ADN está libre en el citoplasma', 'Tiene núcleo y mitocondrias', 'Solo existe en animales', 'Siempre forma organismos pluricelulares'], 'Su ADN se ubica en una zona llamada nucleoide.'),
          M('¿Cuál de estos organismos está formado por células procariotas?', ['Una bacteria', 'Un hongo', 'Una planta', 'Un ser humano'], 'Bacterias y arqueas son procariotas.'),
          M('¿Qué tienen en común TODAS las células, procariotas y eucariotas?', ['Membrana plasmática, citoplasma, ribosomas y material genético', 'Núcleo y mitocondrias', 'Pared celular y cloroplastos', 'Lisosomas y centriolos'], 'Son los componentes básicos de cualquier célula.'),
          M('El primero en observar "celdas" en un corte de corcho, en 1665, fue:', ['Robert Hooke', 'Charles Darwin', 'Gregor Mendel', 'Louis Pasteur'], 'Les llamó células por su parecido con las celdas de un panal.'),
          T('Los virus están formados por células.', false, 'Los virus no son células: son material genético envuelto en proteínas y solo se multiplican dentro de una célula.'),
          S('Clasifica cada característica', ['Célula vegetal', 'Célula animal'], [['Pared celular de celulosa', 0], ['Cloroplastos', 0], ['Vacuola central grande', 0], ['Almidón como reserva', 0], ['Centriolos', 1], ['Glucógeno como reserva', 1]], 'Ambas tienen núcleo, mitocondrias, ribosomas, retículo y aparato de Golgi.'),
          T('Los hongos tienen células eucariotas con pared celular.', true, 'Su pared es de quitina, no de celulosa.'),
          O('Ordena los niveles de organización de menor a mayor complejidad', ['Célula', 'Tejido', 'Órgano', 'Sistema', 'Organismo'], 'Las células forman tejidos, los tejidos forman órganos, los órganos forman sistemas y los sistemas, un organismo.'),
          M('Un paramecio es un organismo unicelular con núcleo. Por lo tanto, es:', ['Eucarionte', 'Procarionte', 'Un virus', 'Pluricelular'], 'Tener núcleo lo hace eucarionte, aunque sea una sola célula (es un protista).'),
        ],
      },
      {
        n: 'Los organelos', ic: 'gear', items: [
          { t: 'info', ic: 'gear', title: 'Organelos', txt: '**Núcleo**: guarda el ADN. **Ribosomas**: fabrican proteínas. **Retículo rugoso**: proteínas; **liso**: lípidos y detoxificación. **Golgi**: modifica, empaqueta y secreta. **Lisosomas**: digestión. **Mitocondrias**: respiración celular (ATP). **Cloroplastos**: fotosíntesis.' },
          P('Une cada organelo con su función', [['Mitocondria', 'Respiración celular y producción de ATP'], ['Cloroplasto', 'Fotosíntesis'], ['Ribosoma', 'Síntesis de proteínas'], ['Lisosoma', 'Digestión intracelular'], ['Aparato de Golgi', 'Modificar, empaquetar y secretar sustancias']], 'Cada organelo cumple un trabajo, como las secciones de una fábrica.'),
          M('¿Dónde se encuentra la mayor parte del ADN de una célula eucariota?', ['En el núcleo', 'En los ribosomas', 'En la membrana', 'En los lisosomas'], 'Mitocondrias y cloroplastos también tienen un poco de ADN propio.'),
          M('Una célula muscular, que gasta mucha energía, tendrá abundantes:', ['Mitocondrias', 'Cloroplastos', 'Vacuolas', 'Lisosomas'], 'Las mitocondrias producen el ATP.'),
          M('Una célula del páncreas que secreta enzimas digestivas (proteínas) tendrá muy desarrollados:', ['El retículo endoplasmático rugoso y el aparato de Golgi', 'Los cloroplastos', 'Las vacuolas centrales', 'Los centriolos'], 'El retículo rugoso fabrica las proteínas y el Golgi las empaqueta para secretarlas.'),
          M('El retículo endoplasmático liso se encarga principalmente de:', ['Sintetizar lípidos y detoxificar sustancias', 'Sintetizar proteínas', 'Hacer fotosíntesis', 'Guardar el ADN'], 'Está muy desarrollado en las células del hígado.'),
          T('Las células vegetales tienen mitocondrias, además de cloroplastos.', true, 'Las plantas también respiran: los cloroplastos fabrican glucosa y las mitocondrias la usan para obtener ATP.'),
          M('El organelo que fabrica proteínas, y que puede estar libre o adherido al retículo, es el:', ['Ribosoma', 'Lisosoma', 'Centriolo', 'Aparato de Golgi'], 'Lee el ARN mensajero y une aminoácidos.'),
          M('¿Qué teoría explica que mitocondrias y cloroplastos tengan ADN y ribosomas propios?', ['La teoría endosimbiótica', 'La generación espontánea', 'La teoría de Lamarck', 'La deriva continental'], 'Habrían sido bacterias englobadas por otra célula hace miles de millones de años.'),
          M('Los centriolos, presentes en las células animales, participan en:', ['La división celular, organizando el huso que separa los cromosomas', 'La fotosíntesis', 'El almacenamiento de agua', 'La síntesis de lípidos'], 'Forman parte del centrosoma.'),
          M('Si una célula pierde sus lisosomas, tendrá problemas para:', ['Digerir sustancias y organelos dañados', 'Fabricar ATP', 'Hacer fotosíntesis', 'Copiar su ADN'], 'Los lisosomas contienen enzimas digestivas.'),
        ],
      },
      {
        n: 'Membrana y transporte', ic: 'shield', items: [
          { t: 'info', ic: 'shield', title: 'Membrana y transporte', txt: 'La membrana es una **bicapa de fosfolípidos con proteínas** (mosaico fluido) y es **semipermeable**. **Pasivo** (a favor del gradiente, sin ATP): difusión simple, difusión facilitada y osmosis. **Activo** (contra el gradiente, con ATP): bomba de sodio-potasio. **En masa**: endocitosis y exocitosis.' },
          M('El modelo que describe la estructura de la membrana plasmática se llama:', ['Mosaico fluido', 'Doble hélice', 'Llave y cerradura', 'Pared rígida'], 'Bicapa de fosfolípidos con proteínas que se desplazan.'),
          M('La osmosis es el movimiento de:', ['Agua a través de una membrana semipermeable, hacia donde hay más soluto', 'Soluto con gasto de ATP', 'Proteínas hacia el núcleo', 'Glucosa en contra de su gradiente'], 'El agua pasa del medio con menos soluto al medio con más soluto.'),
          M('El transporte activo se caracteriza porque:', ['Gasta energía (ATP) y mueve sustancias en contra de su gradiente', 'No gasta energía', 'Solo mueve agua', 'Siempre va a favor del gradiente'], 'Ejemplo: la bomba de sodio y potasio.'),
          M('El oxígeno y el CO₂ atraviesan la membrana por:', ['Difusión simple', 'Transporte activo', 'Endocitosis', 'La bomba de sodio-potasio'], 'Son moléculas pequeñas y sin carga que pasan entre los fosfolípidos.'),
          M('La glucosa entra a muchas células a favor de su gradiente, a través de una proteína transportadora y sin gastar ATP. Esto es:', ['Difusión facilitada', 'Difusión simple', 'Transporte activo', 'Exocitosis'], 'Es transporte pasivo, pero necesita una proteína.'),
          M('Un glóbulo rojo puesto en agua destilada (medio hipotónico):', ['Gana agua, se hincha y puede estallar', 'Pierde agua y se arruga', 'No cambia', 'Se divide'], 'El agua entra porque dentro de la célula hay más soluto. La ruptura se llama hemólisis.'),
          M('Una célula vegetal puesta en un medio hipertónico (muy salado):', ['Pierde agua y su membrana se separa de la pared (plasmólisis)', 'Se hincha hasta estallar', 'Gana agua y queda turgente', 'No cambia'], 'En medio hipotónico, en cambio, queda turgente y la pared evita que estalle.'),
          M('Por cada ATP, la bomba de sodio-potasio:', ['Saca 3 Na⁺ de la célula y mete 2 K⁺', 'Saca 2 Na⁺ y mete 3 K⁺', 'Mete agua a la célula', 'Saca glucosa y mete oxígeno'], 'Gasta energía y mantiene la diferencia de cargas de la membrana, clave para las neuronas.'),
          M('Un glóbulo blanco que engloba a una bacteria realiza:', ['Fagocitosis, un tipo de endocitosis', 'Exocitosis', 'Osmosis', 'Difusión simple'], 'La membrana rodea la partícula y forma una vesícula.'),
          S('Clasifica cada tipo de transporte', ['Pasivo (sin gasto de energía)', 'Con gasto de energía'], [['Difusión simple', 0], ['Osmosis', 0], ['Difusión facilitada', 0], ['Bomba de sodio-potasio', 1], ['Endocitosis', 1], ['Exocitosis', 1]], 'El pasivo va a favor del gradiente; el activo y el transporte en vesículas gastan energía.'),
          T('En un medio isotónico, la célula no gana ni pierde agua en forma neta.', true, 'La concentración de soluto es igual dentro y fuera. Por eso el suero fisiológico se prepara al 0,9 % de sal.'),
          F('Si hay más soluto fuera de la célula que dentro, el medio es ___ y la célula pierde agua.', ['hipertónico', 'hipotónico', 'isotónico'], 'Hiper = más soluto afuera.'),
        ],
      },
    ],
  });

  // ---------- Biomoléculas, enzimas y energía ----------
  RB.unit('bb', {
    name: 'Biomoléculas y energía', desc: 'Agua, carbohidratos, lípidos, proteínas, ácidos nucleicos, enzimas, fotosíntesis, respiración celular y fermentación.', ic: 'flame', area: 'Célula',
    lessons: [
      {
        n: 'Biomoléculas', ic: 'flask', items: [
          { t: 'info', ic: 'flask', title: 'Biomoléculas', txt: '**Inorgánicas**: agua y sales minerales. **Orgánicas**: **carbohidratos** (energía rápida; almidón y glucógeno de reserva; celulosa estructural), **lípidos** (reserva, membranas, hormonas), **proteínas** (cadenas de aminoácidos: enzimas, anticuerpos, hemoglobina) y **ácidos nucleicos** (ADN y ARN, hechos de nucleótidos).' },
          P('Une cada biomolécula con su unidad básica', [['Proteína', 'Aminoácido'], ['Almidón', 'Glucosa'], ['Ácido nucleico', 'Nucleótido'], ['Triglicérido (grasa)', 'Glicerol y ácidos grasos']], 'Las grandes moléculas se forman uniendo unidades más pequeñas.'),
          M('La principal fuente de energía inmediata para las células es:', ['La glucosa', 'El colesterol', 'El ADN', 'El agua'], 'Es un monosacárido que se usa en la respiración celular.'),
          M('Los animales almacenan glucosa en el hígado y los músculos en forma de:', ['Glucógeno', 'Almidón', 'Celulosa', 'Quitina'], 'Las plantas la almacenan como almidón.'),
          M('La celulosa, que forma la pared de las células vegetales, es:', ['Un polisacárido estructural', 'Una proteína', 'Un lípido', 'Un ácido nucleico'], 'Es la fibra de los alimentos: los humanos no la podemos digerir.'),
          M('¿Qué biomolécula es la principal reserva de energía a largo plazo en los animales?', ['Los lípidos (grasas)', 'Las proteínas', 'Las sales minerales', 'El ADN'], 'Un gramo de grasa entrega cerca del doble de energía que un gramo de carbohidrato.'),
          M('Las proteínas están formadas por:', ['Aminoácidos unidos por enlaces peptídicos', 'Glucosas', 'Nucleótidos', 'Ácidos grasos'], 'Existen 20 aminoácidos distintos, y su orden define la proteína.'),
          S('Clasifica cada función', ['Proteínas', 'Lípidos'], [['Enzimas que aceleran reacciones', 0], ['Anticuerpos', 0], ['Hemoglobina que transporta O₂', 0], ['Bicapa de las membranas', 1], ['Aislante térmico bajo la piel', 1], ['Colesterol y hormonas esteroidales', 1]], 'Las proteínas cumplen funciones muy variadas; los lípidos almacenan energía, forman membranas y algunas hormonas.'),
          T('El agua es la molécula más abundante en los seres vivos.', true, 'Forma cerca del 60 al 70 % de la masa del cuerpo humano.'),
          M('¿Qué propiedad del agua le permite regular la temperatura de los seres vivos?', ['Su alto calor específico', 'Su color', 'Que sea un gas a temperatura ambiente', 'Que no disuelva nada'], 'Absorbe mucho calor sin calentarse demasiado, y al evaporarse en el sudor enfría el cuerpo.'),
          M('Las sales minerales, como el calcio, cumplen funciones como:', ['Formar huesos y dientes y participar en la contracción muscular', 'Entregar la mayor parte de la energía', 'Guardar la información genética', 'Formar la pared de las plantas'], 'El hierro, otra sal mineral, forma parte de la hemoglobina.'),
        ],
      },
      {
        n: 'Enzimas', ic: 'target', items: [
          { t: 'info', ic: 'target', title: 'Enzimas', txt: 'Son **proteínas** que aceleran reacciones al **disminuir la energía de activación**, sin consumirse. Son **específicas**: el sustrato encaja en el **sitio activo**. Tienen **temperatura y pH óptimos**; el calor extremo las **desnaturaliza**.' },
          M('Las enzimas aceleran las reacciones porque:', ['Disminuyen la energía de activación', 'Aumentan la temperatura del cuerpo', 'Se consumen en la reacción', 'Cambian los productos de la reacción'], 'No se gastan: pueden actuar una y otra vez.'),
          M('La zona de la enzima donde se une el sustrato se llama:', ['Sitio activo', 'Núcleo', 'Ribosoma', 'Nucleoide'], 'Su forma es complementaria a la del sustrato.'),
          M('Una enzima que se calienta demasiado pierde su forma y su función. Este proceso se llama:', ['Desnaturalización', 'Fotosíntesis', 'Mutación', 'Osmosis'], 'El calor rompe los enlaces que mantienen su forma tridimensional.'),
          M('La pepsina del estómago funciona mejor a pH 2. Si se lleva a pH 8:', ['Su actividad disminuye mucho', 'Su actividad aumenta', 'Se convierte en otra enzima', 'El pH no la afecta'], 'Cada enzima tiene un pH óptimo.'),
          M('Un gráfico de actividad enzimática versus temperatura suele mostrar:', ['Un máximo en la temperatura óptima y una caída brusca a temperaturas altas', 'Una línea que siempre sube', 'Una línea horizontal', 'La mayor actividad a 0 °C'], 'En el cuerpo humano, muchas enzimas tienen su óptimo cerca de 37 °C.'),
          T('Una enzima puede actuar sobre cualquier sustrato.', false, 'Son específicas: cada una reconoce un sustrato o un grupo muy parecido.'),
          M('La amilasa de la saliva degrada:', ['El almidón', 'Las proteínas', 'Las grasas', 'El ADN'], 'Lo transforma en azúcares más pequeños, como la maltosa.'),
          X('¿Qué factores modifican la actividad de una enzima? Marca todos.', ['La temperatura', 'El pH', 'La concentración de sustrato', 'El color del recipiente'], [0, 1, 2], 'También influyen los inhibidores y la cantidad de enzima.'),
          M('Al aumentar la cantidad de sustrato, la velocidad de la reacción sube y luego se estabiliza porque:', ['Todas las enzimas están ocupadas (saturación)', 'La enzima se desnaturaliza', 'Se acaba el agua', 'El pH baja a cero'], 'Ya no quedan sitios activos libres.'),
        ],
      },
      {
        n: 'Fotosíntesis y respiración', ic: 'sun', items: [
          { t: 'info', ic: 'sun', title: 'Energía', txt: '**Fotosíntesis** (cloroplasto): 6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂. Fase **luminosa** (tilacoides): se rompe el agua y se libera O₂. Fase **oscura** o ciclo de Calvin (estroma): se fija el CO₂. **Respiración** (mitocondria): C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP. Sin oxígeno: **fermentación**.' },
          M('La fotosíntesis ocurre en:', ['Los cloroplastos', 'Las mitocondrias', 'El núcleo', 'Los ribosomas'], 'Contienen clorofila, el pigmento que capta la luz.'),
          M('El oxígeno que liberan las plantas en la fotosíntesis proviene de:', ['El agua', 'El dióxido de carbono', 'La glucosa', 'El suelo'], 'En la fase luminosa se rompe la molécula de agua (fotólisis).'),
          M('¿Cuáles son los reactivos de la fotosíntesis?', ['CO₂, agua y energía luminosa', 'Glucosa y oxígeno', 'Oxígeno y agua', 'ATP y glucosa'], 'Los productos son glucosa y oxígeno.'),
          M('La respiración celular aeróbica ocurre principalmente en:', ['Las mitocondrias', 'Los cloroplastos', 'Las vacuolas', 'La pared celular'], 'Solo su primera etapa, la glucólisis, ocurre en el citoplasma.'),
          M('¿Qué molécula entrega la energía que usan directamente las células?', ['ATP', 'ADN', 'CO₂', 'Clorofila'], 'El adenosín trifosfato es la "moneda energética" de la célula.'),
          T('Las plantas hacen fotosíntesis, pero no respiran.', false, 'Las plantas respiran de día y de noche en sus mitocondrias; la fotosíntesis solo ocurre con luz.'),
          M('En un día muy nublado, ¿qué factor limita más la fotosíntesis?', ['La intensidad de la luz', 'La cantidad de oxígeno', 'La cantidad de glucosa', 'El número de mitocondrias'], 'Luz, CO₂ y temperatura son los factores limitantes.'),
          M('En la fase oscura (ciclo de Calvin) de la fotosíntesis:', ['Se fija el CO₂ y se forma glucosa usando ATP y NADPH', 'Se rompe el agua y se libera O₂', 'La clorofila capta la luz', 'Se libera CO₂'], 'Ocurre en el estroma y usa los productos de la fase luminosa.'),
          M('La fermentación láctica ocurre en los músculos cuando:', ['Falta oxígeno durante un ejercicio intenso', 'Sobra oxígeno', 'Se come mucha proteína', 'La célula hace fotosíntesis'], 'Produce poco ATP y ácido láctico.'),
          M('La levadura que se usa para hacer pan realiza fermentación:', ['Alcohólica: produce etanol y CO₂', 'Láctica: produce ácido láctico', 'Fotosintética', 'Aeróbica: libera O₂'], 'El CO₂ forma las burbujas que inflan la masa.'),
          M('¿Qué proceso obtiene mucho más ATP por cada glucosa?', ['La respiración aeróbica', 'La fermentación láctica', 'La fermentación alcohólica', 'Todos obtienen lo mismo'], 'La respiración aeróbica rinde unos 36 ATP (los textos dan entre 30 y 38); la fermentación, solo 2.'),
          S('Clasifica cada característica', ['Fotosíntesis', 'Respiración celular'], [['Ocurre en los cloroplastos', 0], ['Libera O₂', 0], ['Fabrica glucosa', 0], ['Ocurre en las mitocondrias', 1], ['Libera CO₂', 1], ['Produce mucho ATP', 1]], 'Son procesos complementarios: los productos de uno son los reactivos del otro.'),
        ],
      },
    ],
  });
})();
