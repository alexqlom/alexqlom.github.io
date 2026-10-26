// Historia (1): la Ilustración y la era de las revoluciones; la independencia de Chile.
(function () {
  const RB = window.RB, { M, T, P, S, O, X } = RB.Q;

  // ---------- Ilustración y revoluciones ----------
  RB.unit('h1', {
    name: 'Ilustración y revoluciones', desc: 'El Antiguo Régimen, las ideas ilustradas, la independencia de EE.UU., la Revolución Francesa, Napoleón, el liberalismo y el nacionalismo.', ic: 'bulb', area: 'Historia universal',
    lessons: [
      {
        n: 'La Ilustración', ic: 'bulb', items: [
          { t: 'info', ic: 'bulb', title: 'El Siglo de las Luces', txt: 'Movimiento del siglo XVIII que confía en la **razón**, el **progreso** y la **libertad**, y critica el **absolutismo** y los privilegios. **Locke**: derechos naturales. **Montesquieu**: **separación de poderes**. **Rousseau**: **soberanía popular**. **Voltaire**: tolerancia religiosa. La **Enciclopedia** difundió estas ideas.' },
          P('Une cada pensador con su idea principal', [['Montesquieu', 'Separación de los poderes del Estado'], ['Rousseau', 'Soberanía popular y contrato social'], ['Locke', 'Derechos naturales: vida, libertad y propiedad'], ['Voltaire', 'Tolerancia religiosa y libertad de expresión'], ['Adam Smith', 'Libre mercado y "mano invisible"']], 'Sus ideas son la base del liberalismo y de las democracias modernas.'),
          M('La Ilustración se caracterizó por confiar principalmente en:', ['La razón como guía del conocimiento y de la sociedad', 'La tradición y la autoridad del rey', 'La revelación religiosa como única verdad', 'La fuerza militar'], 'Por eso al siglo XVIII se le llama el Siglo de las Luces.'),
          M('Montesquieu propuso dividir el poder en ejecutivo, legislativo y judicial para:', ['Evitar el abuso de poder, ya que cada poder controla a los otros', 'Fortalecer al rey', 'Eliminar las leyes', 'Impedir que el pueblo participe'], 'Lo planteó en "El espíritu de las leyes" (1748).'),
          M('Para Rousseau, la soberanía reside en:', ['El pueblo, que expresa la voluntad general', 'El rey, por derecho divino', 'La Iglesia', 'La nobleza'], 'Lo planteó en "El contrato social" (1762).'),
          M('El despotismo ilustrado se resume en la frase:', ['"Todo para el pueblo, pero sin el pueblo"', '"Libertad, igualdad, fraternidad"', '"El poder reside en el pueblo"', '"Paz, pan y tierra"'], 'Reyes como Carlos III de España aplicaron reformas ilustradas sin renunciar al poder absoluto.'),
          M('La Enciclopedia, dirigida por Diderot y D’Alembert, buscaba:', ['Reunir y difundir el conocimiento basado en la razón', 'Defender el poder absoluto', 'Prohibir la ciencia', 'Narrar la vida de los reyes'], 'Fue clave para difundir las ideas ilustradas por Europa y América.'),
          T('Los ilustrados criticaban el absolutismo y la sociedad basada en privilegios de nacimiento.', true, 'Defendían la igualdad ante la ley y la libertad.'),
          M('Según John Locke, si un gobierno viola los derechos naturales de las personas:', ['El pueblo tiene derecho a resistirlo y reemplazarlo', 'Debe ser obedecido siempre', 'La Iglesia debe nombrar otro rey', 'Los derechos dejan de existir'], 'Para Locke, el gobierno se basa en el consentimiento de los gobernados.'),
          M('"Para que no se pueda abusar del poder, es preciso que el poder frene al poder." Esta idea corresponde a:', ['La separación de poderes', 'El derecho divino de los reyes', 'La lucha de clases', 'El libre mercado'], 'Es de Montesquieu.'),
          M('Las ideas ilustradas llegaron a la América colonial principalmente a través de:', ['Libros, viajes de criollos a Europa y tertulias', 'Decretos del rey de España', 'La Inquisición', 'Los conquistadores del siglo XVI'], 'Muchos libros circulaban de contrabando, porque estaban prohibidos.'),
        ],
      },
      {
        n: 'Las revoluciones liberales', ic: 'sword', items: [
          { t: 'info', ic: 'sword', title: 'Revoluciones', txt: '**Independencia de EE.UU.** (1776) y su **Constitución** (1787): república federal con separación de poderes. **Revolución Francesa** (1789): fin del absolutismo y de los privilegios, **Declaración de los Derechos del Hombre y del Ciudadano**, **República** (1792), el **Terror** (1793–1794) y **Napoleón** (1799), que difundió el **Código Civil**.' },
          M('¿Cuál fue un antecedente directo de la Revolución Francesa?', ['La crisis financiera de la monarquía y la desigualdad de la sociedad estamental', 'La Revolución Rusa', 'La Primera Guerra Mundial', 'La independencia de Chile'], 'El Tercer Estado pagaba los impuestos, mientras el clero y la nobleza tenían privilegios.'),
          O('Ordena estos hechos de la Revolución Francesa', ['Reunión de los Estados Generales', 'Toma de la Bastilla', 'Proclamación de la República', 'Período del Terror', 'Napoleón llega al poder'], '1789, 1789, 1792, 1793–1794 y 1799.'),
          M('La toma de la Bastilla, el 14 de julio de 1789, simbolizó:', ['La caída del absolutismo y el inicio de la revolución popular', 'La coronación de Napoleón', 'El fin de la Primera Guerra Mundial', 'La restauración de la monarquía'], 'La Bastilla era una prisión, símbolo del poder arbitrario del rey.'),
          M('La sociedad estamental del Antiguo Régimen estaba dividida en:', ['Clero, nobleza y Tercer Estado', 'Burguesía y proletariado', 'Ciudadanos y extranjeros', 'Patricios y plebeyos'], 'Los dos primeros estamentos tenían privilegios, como no pagar ciertos impuestos.'),
          M('"Los hombres nacen y permanecen libres e iguales en derechos" (1789). Este principio se opone directamente a:', ['Los privilegios de la sociedad estamental', 'La soberanía nacional', 'La separación de poderes', 'La libertad de expresión'], 'Es el artículo 1 de la Declaración de los Derechos del Hombre y del Ciudadano.'),
          M('La independencia de Estados Unidos influyó en Hispanoamérica porque:', ['Demostró que una colonia podía independizarse y formar una república', 'Restableció la monarquía en América', 'Prohibió el comercio con Europa', 'Creó la sociedad estamental'], 'Fue el primer gran ejemplo de independencia colonial.'),
          M('La Constitución de Estados Unidos de 1787 estableció:', ['Una república federal y presidencial, con separación de poderes', 'Una monarquía absoluta', 'Un gobierno de la Iglesia', 'Un sistema de castas'], 'Fue la primera constitución escrita de una república moderna.'),
          M('El período del Terror (1793–1794), encabezado por Robespierre y los jacobinos, se caracterizó por:', ['La persecución y ejecución de quienes eran considerados enemigos de la revolución', 'La restauración del rey', 'La paz con toda Europa', 'La abolición de la república'], 'Miles de personas murieron en la guillotina.'),
          M('Napoleón Bonaparte difundió las ideas revolucionarias en Europa, por ejemplo, mediante:', ['El Código Civil, que estableció la igualdad ante la ley', 'El restablecimiento de los privilegios feudales', 'La abolición de la propiedad privada', 'La democracia directa'], 'Aunque gobernó como emperador, su código fue imitado en muchos países.'),
          T('El lema de la Revolución Francesa fue "libertad, igualdad, fraternidad".', true, 'Resume los ideales de la revolución.'),
          M('La invasión de Napoleón a España en 1808 influyó en América porque:', ['El rey Fernando VII quedó prisionero y se produjo un vacío de poder', 'España se fortaleció', 'Napoleón conquistó Chile', 'Se abolió la esclavitud en América'], 'En América se formaron juntas de gobierno, como la de Chile en 1810.'),
        ],
      },
      {
        n: 'Liberalismo, nacionalismo e independencias', ic: 'flag', items: [
          { t: 'info', ic: 'flag', title: 'El siglo XIX', txt: '**Liberalismo**: libertades individuales, igualdad ante la ley, constitución, separación de poderes y propiedad privada. **Nacionalismo**: cada nación (lengua, historia y cultura comunes) debe tener su propio Estado; impulsó las unificaciones de **Italia** (1861) y **Alemania** (1871). En América, los **criollos** lideraron las independencias.' },
          S('Clasifica cada principio', ['Liberalismo', 'Absolutismo'], [['Separación de poderes', 0], ['Igualdad ante la ley', 0], ['Constitución escrita', 0], ['Poder del rey por derecho divino', 1], ['Privilegios de la nobleza', 1], ['Todo el poder en el monarca', 1]], 'El liberalismo surge como reacción al absolutismo.'),
          M('El nacionalismo del siglo XIX sostenía que:', ['Cada nación, con su lengua, cultura e historia, debía tener su propio Estado', 'Todos los pueblos debían formar un solo imperio', 'Las naciones no existen', 'El rey es dueño de la nación'], 'Impulsó las unificaciones de Italia y Alemania.'),
          M('Un Estado-nación se construye, entre otras cosas, mediante:', ['Símbolos patrios, educación pública, un ejército y una historia común', 'La eliminación de las fronteras', 'El gobierno de una potencia extranjera', 'La renuncia al territorio'], 'En Chile, el Estado del siglo XIX creó escuelas, himno, bandera y conmemoraciones.'),
          M('El sufragio censitario, frecuente en el siglo XIX, permitía votar solo a:', ['Los hombres con cierta renta o propiedad', 'Todas las personas mayores de 18 años', 'Las mujeres', 'Los extranjeros'], 'El derecho a voto se fue ampliando poco a poco.'),
          M('La unificación de Alemania (1871) fue liderada por:', ['Prusia y su canciller Otto von Bismarck', 'Francia y Napoleón III', 'Austria', 'Italia y Garibaldi'], 'En la unificación italiana destacaron Cavour y Garibaldi.'),
          M('Las revoluciones de 1848 en Europa, llamadas "primavera de los pueblos", buscaban:', ['Más libertades, constituciones y, en algunos casos, la independencia nacional', 'Restaurar el absolutismo', 'Iniciar la Primera Guerra Mundial', 'Volver al feudalismo'], 'Ese mismo año se publicó el Manifiesto Comunista.'),
          X('¿Cuáles fueron causas de las independencias hispanoamericanas? Marca todas.', ['La difusión de las ideas ilustradas', 'El descontento de los criollos, excluidos de los altos cargos', 'La invasión napoleónica de España en 1808', 'La Revolución Rusa'], [0, 1, 2], 'Hubo causas internas (criollos, reformas borbónicas) y externas (ideas, ejemplo de EE.UU., crisis española).'),
          M('Los criollos eran:', ['Los hijos de españoles nacidos en América', 'Los españoles nacidos en España', 'Los pueblos indígenas', 'Los esclavos africanos'], 'Tenían riqueza, pero estaban excluidos de muchos cargos de gobierno.'),
          T('El liberalismo económico defendía una fuerte intervención del Estado en la economía.', false, 'Defendía el libre mercado y la mínima intervención del Estado (laissez faire).'),
          M('La Restauración, acordada en el Congreso de Viena (1815), buscó:', ['Volver al orden absolutista anterior a la Revolución Francesa', 'Difundir la república', 'Crear la ONU', 'Unificar Italia'], 'Aun así, las ideas liberales siguieron extendiéndose.'),
        ],
      },
    ],
  });

  // ---------- Independencia de Chile ----------
  RB.unit('h2', {
    name: 'Independencia de Chile', desc: 'La crisis de 1808, la Primera Junta, la Patria Vieja, la Reconquista, la Patria Nueva y el gobierno de O’Higgins (1808–1826).', ic: 'flag', area: 'Historia de Chile',
    lessons: [
      {
        n: 'La Patria Vieja (1810–1814)', ic: 'flag', items: [
          { t: 'info', ic: 'flag', title: 'Patria Vieja', txt: '**18 de septiembre de 1810**: un cabildo abierto formó la **Primera Junta Nacional de Gobierno** (presidida por Mateo de Toro y Zambrano), que juró fidelidad a **Fernando VII**. Medidas: libertad de comercio y **Primer Congreso Nacional** (1811). **José Miguel Carrera**: Reglamento Constitucional de 1812, Aurora de Chile y primeros símbolos patrios. Termina con el **Desastre de Rancagua** (1814).' },
          M('¿Qué ocurrió el 18 de septiembre de 1810?', ['Un cabildo abierto formó la Primera Junta Nacional de Gobierno', 'Se firmó el Acta de Independencia', 'Se ganó la batalla de Maipú', 'Se promulgó la Constitución de 1833'], 'La Junta gobernaría en nombre del rey Fernando VII, prisionero de Napoleón.'),
          M('La Primera Junta de Gobierno juró fidelidad a Fernando VII porque:', ['En un principio se buscaba gobernar en su nombre mientras estuviera prisionero, no independizarse', 'Fernando VII vivía en Chile', 'Napoleón lo exigió', 'Así lo pedía Estados Unidos'], 'La idea de la independencia total se fue imponiendo después.'),
          M('La doctrina que justificó la formación de juntas en América sostenía que, sin el rey, la soberanía:', ['Volvía al pueblo', 'Pasaba a Napoleón', 'Pasaba a la Iglesia', 'Desaparecía'], 'Es la doctrina de la reversión de la soberanía.'),
          X('¿Cuáles fueron medidas de la Primera Junta de Gobierno? Marca todas.', ['Decretar la libertad de comercio', 'Convocar al Primer Congreso Nacional', 'Crear milicias para la defensa', 'Abolir la esclavitud'], [0, 1, 2], 'La esclavitud se abolió por completo en 1823.'),
          M('El Primer Congreso Nacional (1811) aprobó la "libertad de vientres", que establecía que:', ['Los hijos de esclavas nacidos en Chile serían libres', 'Las mujeres podían votar', 'Se abolía la monarquía', 'Los indígenas no pagarían tributo'], 'La abolición total de la esclavitud llegó en 1823.'),
          P('Une cada obra de la Patria Vieja con su descripción', [['Aurora de Chile', 'Primer periódico nacional, dirigido por Camilo Henríquez'], ['Reglamento Constitucional de 1812', 'Declaraba que no se obedecería ninguna orden dictada fuera del territorio'], ['Instituto Nacional', 'Establecimiento educacional fundado en 1813'], ['Primera bandera', 'Franjas azul, blanca y amarilla']], 'Muchas se impulsaron durante el gobierno de José Miguel Carrera.'),
          M('El virrey del Perú envió expediciones militares contra Chile durante la Patria Vieja porque:', ['Consideraba que el gobierno de Chile se alejaba de la autoridad del rey', 'Chile había invadido Lima', 'Napoleón se lo pidió', 'Quería comprar trigo'], 'El virrey Abascal envió a Pareja, luego a Gaínza y finalmente a Osorio.'),
          M('El Tratado de Lircay (1814), firmado entre patriotas y realistas, establecía que:', ['Chile reconocería a Fernando VII y mantendría un gobierno propio, a cambio del retiro de las tropas realistas', 'Chile sería independiente', 'España cedía Chiloé', 'Se creaba la Escuadra Nacional'], 'No se cumplió: el virrey lo rechazó y envió a Osorio.'),
          M('Durante la Patria Vieja, los patriotas estuvieron divididos principalmente entre:', ['Los seguidores de José Miguel Carrera y los de Bernardo O’Higgins', 'Liberales y comunistas', 'Pipiolos y pelucones', 'Federalistas y unitarios'], 'Esa división debilitó la defensa ante los realistas.'),
          M('La Patria Vieja terminó con:', ['El Desastre de Rancagua (1814)', 'La batalla de Chacabuco', 'La batalla de Maipú', 'La abdicación de O’Higgins'], 'Las tropas realistas de Osorio derrotaron a los patriotas dirigidos por O’Higgins.'),
          T('La Primera Junta de 1810 declaró de inmediato la independencia de Chile.', false, 'Juró fidelidad a Fernando VII. La independencia se proclamó en 1818.'),
        ],
      },
      {
        n: 'Reconquista y Patria Nueva', ic: 'sword', items: [
          { t: 'info', ic: 'sword', title: 'Reconquista y Patria Nueva', txt: '**Reconquista** (1814–1817): gobierno realista de Osorio y Marcó del Pont; persecución de patriotas y guerrillas de **Manuel Rodríguez**. El **Ejército de los Andes** (San Martín y O’Higgins) triunfó en **Chacabuco** (1817). **Patria Nueva**: O’Higgins Director Supremo, **independencia proclamada en 1818** y triunfo de **Maipú** (5 de abril de 1818).' },
          O('Ordena estos hechos de la independencia de Chile', ['Primera Junta Nacional de Gobierno', 'Desastre de Rancagua', 'Batalla de Chacabuco', 'Proclamación de la Independencia', 'Batalla de Maipú'], '1810, 1814, 1817, febrero de 1818 y abril de 1818.'),
          M('Durante la Reconquista (1814–1817), el gobierno realista se caracterizó por:', ['Perseguir a los patriotas, confiscar bienes y enviar a muchos presos a la isla Juan Fernández', 'Declarar la independencia', 'Crear el Congreso Nacional', 'Abolir la esclavitud'], 'Esa dureza aumentó el apoyo a la causa independentista.'),
          M('Manuel Rodríguez es recordado por:', ['Organizar guerrillas contra los realistas durante la Reconquista', 'Ser el primer Presidente de Chile', 'Redactar la Constitución de 1833', 'Dirigir la Escuadra Nacional'], 'Mantuvo distraídos a los realistas mientras se preparaba el Ejército de los Andes.'),
          M('El Ejército de los Andes se organizó en:', ['Mendoza, bajo el mando de José de San Martín', 'Lima', 'Valdivia', 'Santiago, bajo el mando de Osorio'], 'O’Higgins fue uno de sus generales.'),
          M('La batalla de Chacabuco (12 de febrero de 1817) dio inicio a:', ['La Patria Nueva', 'La Reconquista', 'La Patria Vieja', 'La república conservadora'], 'Tras el triunfo, O’Higgins fue nombrado Director Supremo.'),
          M('La batalla de Maipú (5 de abril de 1818) es importante porque:', ['Aseguró la independencia de Chile', 'Inició la Reconquista', 'Fue una derrota patriota', 'Terminó con la Guerra del Pacífico'], 'Ocurrió pocas semanas después de la derrota patriota en Cancha Rayada.'),
          M('La independencia de Chile se proclamó solemnemente el:', ['12 de febrero de 1818', '18 de septiembre de 1810', '5 de abril de 1818', '2 de octubre de 1814'], 'Justo un año después de la batalla de Chacabuco.'),
          T('El triunfo en Maipú puso fin a la presencia realista en todo el territorio chileno.', false, 'Quedaron focos realistas en el sur: Valdivia fue tomada en 1820 y Chiloé se incorporó recién en 1826.'),
          M('Lord Thomas Cochrane, al mando de la Escuadra Nacional, logró en 1820:', ['La toma de Valdivia', 'El triunfo de Chacabuco', 'La incorporación de Isla de Pascua', 'La captura del Huáscar'], 'Valdivia era una de las plazas españolas mejor fortificadas.'),
        ],
      },
      {
        n: 'El gobierno de O’Higgins', ic: 'landmark', items: [
          { t: 'info', ic: 'landmark', title: 'O’Higgins (1817–1823)', txt: 'Como **Director Supremo**, O’Higgins consolidó la independencia: creó la **Escuadra Nacional** y organizó la **Expedición Libertadora del Perú** (1820). Fundó la **Escuela Militar** y el **Cementerio General**, y abolió los **títulos de nobleza**. Su gobierno autoritario generó oposición y **abdicó en 1823**. Chiloé se incorporó en **1826**.' },
          M('¿Por qué O’Higgins organizó la Expedición Libertadora del Perú (1820)?', ['Porque el virreinato del Perú era el centro del poder español en Sudamérica y amenazaba la independencia', 'Para conquistar Argentina', 'Para comerciar con Asia', 'Para buscar oro'], 'Mientras el Perú fuera realista, la independencia de Chile no estaría segura.'),
          M('O’Higgins abolió los títulos de nobleza y los escudos de armas porque:', ['Contradecían el principio republicano de igualdad', 'Eran muy caros', 'Lo exigía el rey de España', 'Quería crear una monarquía'], 'En una república, todos deben ser iguales ante la ley.'),
          M('¿Por qué O’Higgins abdicó en 1823?', ['Por la oposición a su gobierno autoritario y la crisis económica', 'Porque perdió la batalla de Maipú', 'Porque terminó su período de 4 años', 'Porque fue elegido rey'], 'Se exilió en el Perú, donde murió en 1842.'),
          X('¿Cuáles fueron obras del gobierno de O’Higgins? Marca todas.', ['La Escuela Militar', 'El Cementerio General', 'La Escuadra Nacional', 'La Universidad de Chile'], [0, 1, 2], 'La Universidad de Chile se fundó en 1842.'),
          M('Chiloé, último bastión realista, se incorporó a Chile en:', ['1826, durante el gobierno de Ramón Freire', '1810', '1818', '1891'], 'Mediante el Tratado de Tantauco.'),
          M('Las constituciones de 1818 y 1822 se caracterizaron por:', ['Dar amplios poderes al Director Supremo', 'Crear una monarquía', 'Establecer el voto femenino', 'Suprimir el Ejército'], 'Eso alimentó las críticas a O’Higgins.'),
          M('Uno de los principales problemas de los primeros años de la república fue:', ['La falta de recursos económicos por los gastos de la guerra', 'El exceso de dinero', 'La sobrepoblación de Santiago', 'Una invasión de Estados Unidos'], 'En 1822 el Estado tuvo que pedir un empréstito en Londres.'),
          M('La abolición total de la esclavitud en Chile se aprobó en:', ['1823', '1810', '1888', '1925'], 'Fue de las primeras de América. En 1811 ya se había aprobado la libertad de vientres.'),
          M('España reconoció oficialmente la independencia de Chile en:', ['1844', '1818', '1810', '1900'], 'Lo hizo mediante un tratado de paz y amistad.'),
          M('¿Cuál de los siguientes fue un CAMBIO producido por la independencia?', ['El paso de un gobierno monárquico a uno republicano', 'El fin de la desigualdad social', 'La pérdida de poder de la élite criolla', 'El abandono de la agricultura'], 'La élite criolla en el poder y la sociedad agraria fueron continuidades.'),
          T('Después de la independencia, la élite criolla perdió su poder económico y político.', false, 'Al contrario: la élite criolla pasó a dirigir la nueva república.'),
          T('Bernardo O’Higgins fue el primer Presidente de la República de Chile.', false, 'Fue Director Supremo. El primero en usar el título de Presidente fue Manuel Blanco Encalada, en 1826.'),
        ],
      },
    ],
  });
})();
