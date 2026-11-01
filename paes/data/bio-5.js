// Biología (5): sexualidad y reproducción humana.
(function () {
  const RB = window.RB, { M, T, P, S, O } = RB.Q;

  RB.unit('bi', {
    name: 'Sexualidad y reproducción', desc: 'Aparatos reproductores, hormonas sexuales, ciclo menstrual, fecundación, embarazo, parto, lactancia, anticoncepción e ITS.', ic: 'child', area: 'Cuerpo humano',
    lessons: [
      {
        n: 'Aparatos reproductores y hormonas', ic: 'people', items: [
          { t: 'info', ic: 'people', title: 'Aparatos reproductores', txt: '**Masculino**: testículos (espermatozoides y **testosterona**), epidídimo, conductos deferentes, vesículas seminales y próstata (semen) y uretra. **Femenino**: ovarios (ovocitos, **estrógenos** y **progesterona**), **trompas de Falopio** (fecundación), útero (endometrio) y vagina. La **FSH** y la **LH** de la hipófisis estimulan a las gónadas.' },
          M('¿Dónde se producen los espermatozoides?', ['En los testículos', 'En la próstata', 'En la uretra', 'En las vesículas seminales'], 'Los testículos también producen testosterona.'),
          M('La fecundación ocurre normalmente en:', ['Las trompas de Falopio', 'El útero', 'La vagina', 'Los ovarios'], 'Luego el embrión viaja al útero y se implanta.'),
          P('Une cada estructura con su función', [['Ovario', 'Produce ovocitos y hormonas femeninas'], ['Útero', 'Aloja al embrión durante el embarazo'], ['Testículo', 'Produce espermatozoides y testosterona'], ['Próstata', 'Aporta líquido al semen']], 'Los ovarios y los testículos son las gónadas.'),
          M('La testosterona es responsable de:', ['Los caracteres sexuales secundarios masculinos y la producción de espermatozoides', 'La menstruación', 'La producción de leche', 'La ovulación'], 'Por ejemplo, el vello facial y la voz más grave.'),
          M('Las hormonas FSH y LH son producidas por:', ['La hipófisis', 'Los ovarios', 'El útero', 'La tiroides'], 'Estimulan a los testículos y a los ovarios.'),
          M('Los espermatozoides y los ovocitos se forman por:', ['Meiosis', 'Mitosis', 'Fecundación', 'Fermentación'], 'Son gametos haploides, con 23 cromosomas.'),
          T('El espermatozoide determina el sexo genético del hijo.', true, 'Puede llevar un cromosoma X o uno Y; el ovocito siempre lleva un X.'),
          M('El desarrollo de las mamas en la pubertad se debe principalmente a:', ['Los estrógenos', 'La testosterona', 'La insulina', 'La adrenalina'], 'Es un carácter sexual secundario femenino.'),
          M('La pubertad comienza cuando:', ['El hipotálamo y la hipófisis estimulan a las gónadas a producir hormonas sexuales', 'Se forma el cigoto', 'Termina el crecimiento', 'Llega la menopausia'], 'Las gónadas son los testículos y los ovarios.'),
        ],
      },
      {
        n: 'El ciclo menstrual', ic: 'replay', items: [
          { t: 'info', ic: 'replay', title: 'Ciclo de 28 días', txt: '**Días 1–5**: menstruación (se desprende el endometrio). **Fase folicular**: la FSH madura un folículo, que produce **estrógenos** y engrosa el endometrio. **Día 14**: **ovulación**, por un pico de **LH**. **Fase lútea**: el cuerpo lúteo produce **progesterona**, que mantiene el endometrio. Sin fecundación, baja la progesterona y llega la menstruación.' },
          M('En un ciclo de 28 días, la ovulación ocurre cerca del día:', ['14', '1', '28', '5'], 'El ciclo se cuenta desde el primer día de la menstruación.'),
          M('La hormona que provoca la ovulación es:', ['La LH (hormona luteinizante)', 'La insulina', 'La testosterona', 'La oxitocina'], 'Su pico ocurre a mitad del ciclo.'),
          M('La menstruación es:', ['El desprendimiento del endometrio cuando no hubo fecundación', 'La liberación del ovocito', 'La implantación del embrión', 'La producción de leche'], 'Ocurre porque bajan los estrógenos y la progesterona.'),
          M('La progesterona, producida por el cuerpo lúteo:', ['Mantiene el endometrio preparado para un posible embarazo', 'Provoca la menstruación', 'Produce espermatozoides', 'Hace madurar el folículo'], 'Si hay embarazo, se sigue produciendo.'),
          O('Ordena los eventos del ciclo menstrual', ['Menstruación', 'Maduración del folículo', 'Ovulación', 'Formación del cuerpo lúteo'], 'Si no hay fecundación, el cuerpo lúteo degenera y vuelve la menstruación.'),
          M('Durante la fase folicular, los estrógenos:', ['Engrosan el endometrio', 'Desprenden el endometrio', 'Producen leche', 'Provocan el parto'], 'Los produce el folículo en desarrollo.'),
          T('El período fértil dura varios días, porque los espermatozoides pueden sobrevivir algunos días en el aparato femenino.', true, 'El ovocito vive solo uno o dos días después de la ovulación, pero los espermatozoides, hasta unos cinco.'),
          M('La hormona que detectan los test de embarazo es:', ['La gonadotropina coriónica humana (hCG)', 'La insulina', 'La testosterona', 'La FSH'], 'La produce el embrión y mantiene activo al cuerpo lúteo.'),
        ],
      },
      {
        n: 'Embarazo, parto y lactancia', ic: 'child', items: [
          { t: 'info', ic: 'child', title: 'Del cigoto al nacimiento', txt: 'Espermatozoide (n) + ovocito (n) → **cigoto** (2n). El embrión se **implanta** en el endometrio cerca de una semana después; desde el tercer mes se llama **feto**. La **placenta** permite el intercambio de nutrientes, O₂ y desechos. **Parto**: la **oxitocina** contrae el útero. **Lactancia**: la **prolactina** produce la leche.' },
          M('El cigoto es:', ['La primera célula de un nuevo individuo, formada en la fecundación', 'Un gameto masculino', 'La placenta', 'Una hormona'], 'Es diploide: 23 cromosomas del padre y 23 de la madre.'),
          M('La implantación es:', ['La fijación del embrión en el endometrio del útero', 'La unión de los gametos', 'La salida del bebé', 'La producción de leche'], 'Ocurre cerca de una semana después de la fecundación.'),
          M('La placenta permite:', ['El intercambio de nutrientes, oxígeno y desechos entre la madre y el feto', 'Que se mezclen la sangre de la madre y la del feto', 'Producir espermatozoides', 'La fecundación'], 'Las sangres no se mezclan: el intercambio ocurre a través de capilares.'),
          M('¿Por qué una embarazada no debe consumir alcohol ni tabaco?', ['Porque esas sustancias atraviesan la placenta y pueden dañar al feto', 'Porque mejoran el desarrollo', 'Porque no tienen ningún efecto', 'Porque producen anticuerpos'], 'Pueden causar malformaciones, bajo peso al nacer y otros problemas.'),
          M('La hormona que produce las contracciones del útero durante el parto es:', ['La oxitocina', 'La prolactina', 'La insulina', 'La testosterona'], 'También provoca la salida de la leche al amamantar.'),
          M('La prolactina:', ['Estimula la producción de leche en las glándulas mamarias', 'Provoca la ovulación', 'Produce espermatozoides', 'Desprende el endometrio'], 'La produce la hipófisis.'),
          M('Los gemelos idénticos (monocigóticos) se originan:', ['De un solo cigoto que se divide en dos embriones', 'De dos ovocitos fecundados por dos espermatozoides', 'De un ovocito fecundado por dos espermatozoides', 'Por clonación artificial'], 'Por eso tienen el mismo ADN. Los mellizos vienen de dos cigotos distintos.'),
          T('La leche materna aporta anticuerpos al bebé.', true, 'Es inmunidad pasiva natural.'),
        ],
      },
      {
        n: 'Anticoncepción e ITS', ic: 'shield', items: [
          { t: 'info', ic: 'shield', title: 'Prevención', txt: '**Barrera**: preservativo (el único que también protege de las **ITS**). **Hormonales**: píldora, inyección, implante (impiden la ovulación). **DIU**: dentro del útero. **Naturales**: ritmo (poco seguros). **Definitivos**: vasectomía y ligadura de trompas. ITS por **virus**: VIH, VPH, herpes. Por **bacterias**: sífilis, gonorrea, clamidia.' },
          M('¿Qué método anticonceptivo además protege de las infecciones de transmisión sexual?', ['El preservativo', 'La píldora anticonceptiva', 'El DIU', 'La vasectomía'], 'Es el único que forma una barrera física contra los microorganismos.'),
          M('Las píldoras anticonceptivas actúan principalmente:', ['Impidiendo la ovulación mediante hormonas', 'Matando a los espermatozoides', 'Destruyendo el útero', 'Eliminando la menstruación para siempre'], 'Contienen estrógenos y progestágenos sintéticos.'),
          S('Clasifica cada método anticonceptivo', ['Barrera', 'Hormonal', 'Quirúrgico (definitivo)'], [['Preservativo masculino', 0], ['Preservativo femenino', 0], ['Píldora', 1], ['Implante subdérmico', 1], ['Vasectomía', 2], ['Ligadura de trompas', 2]], 'Los métodos naturales, como el del ritmo, son los menos seguros.'),
          M('La vasectomía consiste en:', ['Cortar y ligar los conductos deferentes', 'Extirpar los testículos', 'Cortar las trompas de Falopio', 'Bloquear la uretra'], 'Los espermatozoides ya no llegan al semen. No afecta la producción de testosterona.'),
          M('El virus del papiloma humano (VPH) se relaciona con:', ['El cáncer cervicouterino', 'La diabetes', 'La hemofilia', 'El daltonismo'], 'Existe una vacuna, que en Chile se aplica en los colegios.'),
          M('La sífilis y la gonorrea son ITS causadas por:', ['Bacterias, y se tratan con antibióticos', 'Virus, y no tienen tratamiento', 'Hongos', 'Mutaciones genéticas'], 'El VIH y el herpes, en cambio, son causados por virus.'),
          T('Las ITS solo se transmiten si la persona tiene síntomas visibles.', false, 'Muchas ITS no dan síntomas al principio, pero igual se transmiten. Por eso es importante el preservativo y hacerse exámenes.'),
          M('El método del ritmo es poco seguro porque:', ['El día de la ovulación puede variar de un ciclo a otro', 'La ovulación siempre ocurre el día 1', 'No existe la ovulación', 'Los espermatozoides mueren en minutos'], 'Además, no protege de las ITS.'),
        ],
      },
    ],
  });

})();
