// Historia (4): la cuestión social en Chile; imperialismo, Primera Guerra Mundial y Revolución Rusa.
(function () {
  const RB = window.RB, { M, T, P, S, O, X } = RB.Q;

  // ---------- La cuestión social ----------
  RB.unit('h7', {
    name: 'La cuestión social en Chile', desc: 'Condiciones de vida y trabajo, conventillos y salitreras, movimiento obrero, huelgas y represión, críticas y leyes sociales (1880–1925).', ic: 'people', area: 'Historia de Chile',
    lessons: [
      {
        n: 'Condiciones de vida y de trabajo', ic: 'people', items: [
          { t: 'info', ic: 'people', title: 'La cuestión social', txt: 'Entre fines del siglo XIX y comienzos del XX, la **migración campo-ciudad** y la minería generaron graves problemas: **conventillos** insalubres, **enfermedades** (tuberculosis, viruela, tifus), altísima **mortalidad infantil**, alcoholismo y jornadas extenuantes. En las salitreras se pagaba con **fichas**, canjeables solo en la **pulpería** de la empresa.' },
          M('La "cuestión social" fue:', ['El conjunto de problemas que afectaron a los sectores populares entre fines del siglo XIX y comienzos del XX', 'Un debate sobre la independencia', 'La guerra contra España', 'El conflicto entre el Estado y la Iglesia'], 'Incluía problemas de vivienda, salud, trabajo y educación.'),
          M('El conventillo era:', ['Una vivienda colectiva con piezas en torno a un patio común, con malas condiciones sanitarias', 'Un convento religioso', 'Una oficina salitrera', 'Una escuela pública'], 'Familias completas vivían en una sola pieza, sin agua potable ni alcantarillado.'),
          M('¿Por qué las enfermedades infecciosas se propagaban rápido en los conventillos?', ['Por el hacinamiento y la falta de agua potable y alcantarillado', 'Porque estaban en el campo', 'Por el exceso de médicos', 'Porque eran casas muy amplias'], 'Así se contagiaban la tuberculosis, la viruela y el cólera.'),
          M('En las oficinas salitreras, el pago en fichas significaba que:', ['Los obreros solo podían comprar en la pulpería de la empresa, a precios fijados por ella', 'Recibían el sueldo en dólares', 'Podían comprar donde quisieran', 'Recibían acciones de la empresa'], 'Era una de las principales quejas de los trabajadores pampinos.'),
          X('¿Cuáles eran problemas de la cuestión social? Marca todos.', ['Viviendas insalubres', 'Alta mortalidad infantil', 'Enfermedades como la tuberculosis', 'Exceso de leyes laborales'], [0, 1, 2], 'Casi no existían leyes que protegieran a los trabajadores.'),
          M('La migración del campo a la ciudad a fines del siglo XIX se debió a:', ['La búsqueda de trabajo y mejores salarios en las ciudades y la minería', 'La prohibición de la agricultura', 'Una guerra en el campo', 'El cierre de las ciudades'], 'Las ciudades crecieron sin planificación ni servicios suficientes.'),
          T('A comienzos del siglo XX, Chile tenía una de las tasas de mortalidad infantil más altas del mundo.', true, 'Las enfermedades infecciosas y la falta de higiene eran las principales causas.'),
          M('En "Sinceridad. Chile íntimo en 1910", Alejandro Venegas denunció:', ['El contraste entre el lujo de la élite y la miseria del pueblo en el Centenario', 'La victoria en la Guerra del Pacífico', 'La llegada de Napoleón', 'La independencia de Bolivia'], 'Lo publicó con el seudónimo de Dr. J. Valdés Cange.'),
          M('En su "Discurso sobre la crisis moral de la República" (1900), Enrique Mac-Iver sostuvo que:', ['Pese a su riqueza, el país vivía un malestar general: "no somos felices"', 'Chile era el país más feliz del mundo', 'Había que volver a la monarquía', 'La solución era una nueva guerra'], 'Fue una de las primeras críticas al sistema surgidas desde la élite.'),
        ],
      },
      {
        n: 'El movimiento obrero', ic: 'link', items: [
          { t: 'info', ic: 'link', title: 'Organización obrera', txt: 'Los trabajadores formaron **sociedades mutuales** (ayuda mutua), **mancomunales** (norte salitrero y puertos), **sociedades de resistencia** (anarquistas) y la **FOCH** (1909). **Luis Emilio Recabarren** fundó el **Partido Obrero Socialista** (1912), que en 1922 se convirtió en el **Partido Comunista**. Las huelgas fueron a menudo reprimidas, como en la **Escuela Santa María de Iquique** (1907).' },
          P('Une cada organización obrera con su característica', [['Sociedades mutuales', 'Ayuda mutua ante enfermedades, accidentes o muerte'], ['Mancomunales', 'Trabajadores del norte salitrero y de los puertos'], ['Sociedades de resistencia', 'De orientación anarquista, usaban la huelga como arma'], ['FOCH', 'Federación Obrera de Chile, fundada en 1909']], 'Con el tiempo, el movimiento obrero se volvió más combativo.'),
          M('La matanza de la Escuela Santa María de Iquique (1907) ocurrió cuando:', ['El Ejército disparó contra obreros salitreros en huelga y sus familias, reunidos en una escuela', 'Chile ocupó Iquique en la Guerra del Pacífico', 'Un terremoto destruyó la escuela', 'Los obreros atacaron un regimiento'], 'Murieron cientos de personas.'),
          M('¿Qué pedían los obreros salitreros en la huelga de 1907?', ['El pago en dinero y no en fichas, mejores salarios y seguridad en el trabajo', 'La independencia del norte', 'La devolución de Tarapacá a Perú', 'El cierre de las oficinas'], 'También pedían libertad de comercio en las oficinas y escuelas nocturnas.'),
          M('Luis Emilio Recabarren es recordado por:', ['Fundar el Partido Obrero Socialista y organizar al movimiento obrero', 'Ser presidente de Chile', 'Dirigir la Escuadra en Iquique', 'Redactar la Constitución de 1925'], 'También fundó periódicos obreros y fue diputado.'),
          O('Ordena estos hechos del movimiento obrero', ['Huelga portuaria de Valparaíso', 'Matanza de la Escuela Santa María de Iquique', 'Fundación de la FOCH', 'Fundación del Partido Obrero Socialista', 'Nacimiento del Partido Comunista'], '1903, 1907, 1909, 1912 y 1922.'),
          M('Las sociedades mutuales se caracterizaban por:', ['Reunir aportes de sus socios para ayudarse ante enfermedades, accidentes o muerte', 'Promover la violencia contra el Estado', 'Representar a los dueños de las salitreras', 'Organizar elecciones'], 'Fueron de las primeras organizaciones de trabajadores.'),
          M('El anarquismo en el movimiento obrero chileno promovía:', ['La acción directa y la huelga, rechazando la participación en elecciones', 'La participación en el Congreso', 'La alianza con la oligarquía', 'El fortalecimiento del Estado'], 'Tuvo fuerza en gremios como los portuarios y los zapateros.'),
          T('El Estado respondió a muchas huelgas de comienzos del siglo XX con represión militar.', true, 'Por ejemplo, en Valparaíso (1903), Santiago (1905) e Iquique (1907).'),
          M('La "huelga de la carne" (1905) en Santiago protestó contra:', ['Un impuesto al ganado argentino que encarecía la carne', 'La Guerra del Pacífico', 'El voto femenino', 'Las leyes laicas'], 'Terminó en enfrentamientos y muertes.'),
          T('La FOCH comenzó como una organización mutualista y luego se volvió más combativa.', true, 'Hacia 1919 adoptó posiciones revolucionarias, cercanas a Recabarren.'),
        ],
      },
      {
        n: 'Respuestas y leyes sociales', ic: 'scroll', items: [
          { t: 'info', ic: 'scroll', title: 'Respuestas', txt: 'Respondieron la **Iglesia** (Rerum Novarum, caridad, sindicatos católicos), los intelectuales críticos, los **partidos** (Demócrata, Radical, socialistas) y el **Estado**: **habitaciones obreras** (1906), **descanso dominical** (1907), **ley de la silla** (1914), **accidentes del trabajo** (1916), **instrucción primaria obligatoria** (1920) y las **leyes sociales de 1924** (contrato de trabajo, sindicatos, seguro obrero, jornada de 8 horas).' },
          P('Une cada ley con lo que estableció', [['Habitaciones obreras (1906)', 'Mejorar e higienizar las viviendas populares'], ['Descanso dominical (1907)', 'Derecho a descansar el domingo'], ['Ley de la silla (1914)', 'Asientos para los empleados del comercio'], ['Instrucción primaria obligatoria (1920)', 'Educación básica obligatoria para niños y niñas']], 'Fueron avances graduales frente a la cuestión social.'),
          M('Las leyes sociales aprobadas en 1924 establecieron, entre otras cosas:', ['La jornada de 8 horas, el contrato de trabajo, los sindicatos legales y el seguro obrero', 'El voto femenino', 'La nacionalización del cobre', 'La reforma agraria'], 'Se aprobaron tras el "ruido de sables".'),
          M('La respuesta de la Iglesia Católica a la cuestión social se basó en:', ['La encíclica Rerum Novarum y obras sociales y de caridad', 'La lucha de clases', 'La abolición del Estado', 'La reforma agraria'], 'Destacaron católicos sociales como Juan Enrique Concha.'),
          M('La ley de instrucción primaria obligatoria (1920) buscaba:', ['Combatir el analfabetismo asegurando la educación básica de niños y niñas', 'Cerrar las escuelas públicas', 'Que solo estudiara la élite', 'Crear universidades privadas'], 'Una parte importante de la población era analfabeta.'),
          M('La clase media chilena creció a comienzos del siglo XX gracias a:', ['La expansión del Estado, la educación y el comercio: empleados, profesores y profesionales', 'La Guerra del Pacífico', 'La desaparición de la oligarquía', 'La agricultura de subsistencia'], 'Se expresó políticamente sobre todo en el Partido Radical.'),
          M('El Decreto Amunátegui (1877) es importante porque:', ['Permitió a las mujeres ingresar a la universidad', 'Dio derecho a voto a las mujeres', 'Creó el registro civil', 'Fundó la Universidad de Chile'], 'Eloísa Díaz se tituló en 1887 como la primera médica de Chile.'),
          M('El Partido Demócrata (1887) buscaba:', ['Representar a artesanos y obreros y mejorar sus condiciones mediante reformas', 'Restaurar la monarquía', 'Defender a la oligarquía terrateniente', 'Abolir el Estado'], 'Fue uno de los primeros partidos de los sectores populares.'),
          T('Las primeras leyes sociales se aprobaron antes de 1910.', true, 'Por ejemplo, la de habitaciones obreras (1906) y la de descanso dominical (1907).'),
          M('La cuestión social contribuyó a la crisis del régimen parlamentario porque:', ['El Congreso oligárquico no respondía a las demandas de los sectores populares y medios', 'Los obreros apoyaban la rotativa ministerial', 'El salitre desapareció de golpe', 'Chile entró a la Primera Guerra Mundial'], 'Esa tensión llevó al ruido de sables y a la Constitución de 1925.'),
          S('Clasifica cada respuesta a la cuestión social', ['Del Estado', 'De la sociedad civil'], [['Ley de accidentes del trabajo', 0], ['Leyes sociales de 1924', 0], ['Ley de habitaciones obreras', 0], ['Sociedades mutuales', 1], ['Mancomunales', 1], ['Obras de caridad de la Iglesia', 1]], 'Tanto el Estado como las organizaciones sociales buscaron soluciones.'),
        ],
      },
    ],
  });

  // ---------- Imperialismo y Primera Guerra Mundial ----------
  RB.unit('h8', {
    name: 'Imperialismo y Primera Guerra Mundial', desc: 'Causas y consecuencias del imperialismo, la Primera Guerra Mundial, el Tratado de Versalles y la Revolución Rusa (1870–1922).', ic: 'globe', area: 'Historia universal',
    lessons: [
      {
        n: 'El imperialismo', ic: 'globe', items: [
          { t: 'info', ic: 'globe', title: 'Imperialismo (1870–1914)', txt: 'Las potencias industriales (Gran Bretaña, Francia, Alemania, Bélgica, EE.UU., Japón) se repartieron **África y Asia**. Causas: **económicas** (materias primas, mercados, inversiones), **políticas** (poder y prestigio) e **ideológicas** (**darwinismo social**, "misión civilizadora"). La **Conferencia de Berlín** (1884–1885) fijó las reglas para repartir África.' },
          X('¿Cuáles fueron causas del imperialismo? Marca todas.', ['Buscar materias primas y mercados para la industria', 'El prestigio y la rivalidad entre potencias', 'La idea de una supuesta superioridad europea', 'El deseo de los pueblos de ser colonizados'], [0, 1, 2], 'También influyeron avances técnicos, como el barco a vapor y las armas modernas.'),
          M('La Conferencia de Berlín (1884–1885) tuvo como objetivo:', ['Establecer reglas para repartir África entre las potencias europeas', 'Terminar la Primera Guerra Mundial', 'Crear la ONU', 'Unificar Alemania'], 'Ningún africano participó, y se trazaron fronteras artificiales.'),
          M('El darwinismo social sostenía que:', ['Algunos pueblos eran superiores y estaban destinados a dominar a otros', 'Todos los pueblos son iguales', 'La evolución no existe', 'Las colonias debían independizarse'], 'Aplicaba de forma errónea las ideas de Darwin a las sociedades humanas.'),
          M('La "joya de la corona" del Imperio británico era:', ['La India', 'Canadá', 'Australia', 'Egipto'], 'Gran Bretaña dominó la India hasta 1947.'),
          M('Una consecuencia del imperialismo para los pueblos colonizados fue:', ['La explotación económica, la imposición cultural y fronteras artificiales', 'Su inmediata industrialización', 'El fin de toda desigualdad', 'La creación de democracias plenas'], 'Muchos conflictos actuales en África se relacionan con esas fronteras.'),
          M('En América Latina, el imperialismo se manifestó principalmente como:', ['Dependencia económica: exportación de materias primas e inversiones extranjeras', 'La conquista militar de todos los países', 'La creación de nuevas colonias europeas en todo el continente', 'Una industrialización acelerada'], 'Por ejemplo, el salitre chileno en manos británicas. Se le llama también neocolonialismo.'),
          T('En la rebelión de los cipayos (1857), soldados indios se alzaron contra el dominio británico.', true, 'Fue una de las resistencias más importantes al imperialismo.'),
          M('La política del "gran garrote" de Estados Unidos en el Caribe y Centroamérica consistía en:', ['Intervenir, incluso militarmente, para proteger sus intereses', 'No intervenir nunca en otros países', 'Apoyar a las monarquías europeas', 'Ceder territorios a España'], 'Se asocia al presidente Theodore Roosevelt.'),
          M('Japón se convirtió en potencia imperialista a fines del siglo XIX gracias a:', ['La modernización e industrialización de la era Meiji', 'Su conquista por Gran Bretaña', 'Su aislamiento total', 'La Revolución Rusa'], 'Venció a China en 1895 y a Rusia en 1905.'),
          M('La guerra de los bóxers (1899–1901) en China fue:', ['Un levantamiento contra la presencia y el dominio extranjero', 'Una competencia deportiva', 'Una guerra entre Japón y EE.UU.', 'La unificación de China'], 'Fue aplastada por una coalición de potencias.'),
        ],
      },
      {
        n: 'La Primera Guerra Mundial', ic: 'sword', items: [
          { t: 'info', ic: 'sword', title: 'La Gran Guerra (1914–1918)', txt: 'Causas: **imperialismo**, **nacionalismos** (revanchismo francés por Alsacia-Lorena, paneslavismo), **carrera armamentista** (paz armada) y **alianzas**: **Triple Entente** (Francia, Gran Bretaña, Rusia) y **Triple Alianza** (Alemania, Austria-Hungría, Italia). Detonante: asesinato del archiduque **Francisco Fernando** en **Sarajevo** (1914). Fue una **guerra de trincheras** y una **guerra total**.' },
          M('¿Cuál fue el detonante de la Primera Guerra Mundial?', ['El asesinato del archiduque Francisco Fernando en Sarajevo, en 1914', 'La invasión de Polonia', 'El ataque a Pearl Harbor', 'La Revolución Rusa'], 'Austria-Hungría declaró la guerra a Serbia, y las alianzas extendieron el conflicto.'),
          P('Une cada bloque con sus miembros', [['Triple Entente', 'Francia, Gran Bretaña y Rusia'], ['Triple Alianza', 'Alemania, Austria-Hungría e Italia'], ['Ingresó en 1917 junto a la Entente', 'Estados Unidos']], 'Italia cambió de bando en 1915 y se unió a la Entente.'),
          X('¿Cuáles fueron causas profundas de la Primera Guerra Mundial? Marca todas.', ['La rivalidad imperialista', 'Los nacionalismos', 'La carrera armamentista', 'La crisis de 1929'], [0, 1, 2], 'La crisis de 1929 ocurrió después de la guerra.'),
          M('El revanchismo francés se refería al deseo de:', ['Recuperar Alsacia y Lorena, perdidas ante Alemania en 1871', 'Conquistar Inglaterra', 'Recuperar Canadá', 'Vengarse de España'], 'Fue una de las tensiones nacionalistas previas a la guerra.'),
          M('El paneslavismo buscaba:', ['Unir a los pueblos eslavos, con apoyo de Rusia', 'Unir a los países de habla alemana', 'Independizar la India', 'Crear la Sociedad de las Naciones'], 'Chocaba con los intereses de Austria-Hungría en los Balcanes.'),
          M('La "guerra de trincheras" se caracterizó por:', ['Frentes estancados, con enormes pérdidas humanas para avanzar muy poco', 'Batallas rápidas con tanques', 'La ausencia de muertos', 'Combates solo en el mar'], 'En Verdún y el Somme murieron cientos de miles de soldados.'),
          M('Se dice que la Primera Guerra Mundial fue una "guerra total" porque:', ['Movilizó toda la economía y la población de los países, incluidas las mujeres en las fábricas', 'Duró pocos días', 'Solo participaron militares', 'Se peleó solo en Europa occidental'], 'También se usó intensamente la propaganda.'),
          M('Estados Unidos entró a la guerra en 1917, entre otras razones, por:', ['La guerra submarina alemana contra barcos que transportaban a sus ciudadanos y mercancías', 'El ataque a Pearl Harbor', 'Una invasión mexicana a Texas', 'La Revolución Francesa'], 'Su ingreso fue decisivo para el triunfo de la Entente.'),
          T('En la Primera Guerra Mundial se usaron a gran escala armas químicas, tanques y aviones.', true, 'La tecnología industrial hizo la guerra mucho más mortífera.'),
          O('Ordena estos hechos', ['Asesinato en Sarajevo', 'Batalla de Verdún', 'Entrada de EE.UU. a la guerra', 'Armisticio', 'Tratado de Versalles'], '1914, 1916, 1917, noviembre de 1918 y 1919.'),
        ],
      },
      {
        n: 'Consecuencias y Revolución Rusa', ic: 'scroll', items: [
          { t: 'info', ic: 'scroll', title: 'Después de la guerra', txt: 'La guerra terminó con el **armisticio** del 11 de noviembre de 1918. El **Tratado de Versalles** (1919) culpó a **Alemania**, que debió pagar **reparaciones**, perder territorios y colonias y limitar su ejército. Cayeron los imperios alemán, austrohúngaro, otomano y ruso, y se creó la **Sociedad de las Naciones**. En Rusia, la **revolución de 1917** llevó al poder a los **bolcheviques** de Lenin; en 1922 nació la **URSS**.' },
          M('El Tratado de Versalles (1919) estableció que Alemania:', ['Era culpable de la guerra, debía pagar reparaciones y perdía territorios y colonias', 'Ganaba territorios en Francia', 'Se unía a Rusia', 'No tenía responsabilidad alguna'], 'Muchos alemanes lo consideraron humillante, lo que favoreció el ascenso del nazismo.'),
          M('La Sociedad de las Naciones (1920) buscaba:', ['Mantener la paz y resolver los conflictos mediante el diálogo', 'Repartir África', 'Crear un ejército mundial', 'Unificar Europa en un solo Estado'], 'Fue debilitada por la ausencia de EE.UU. y no logró evitar la Segunda Guerra Mundial.'),
          X('¿Qué imperios desaparecieron tras la Primera Guerra Mundial? Marca todos.', ['El austrohúngaro', 'El otomano', 'El ruso', 'El británico'], [0, 1, 2], 'El alemán también cayó; el británico siguió existiendo.'),
          M('Los "14 puntos" del presidente estadounidense Woodrow Wilson proponían, entre otras cosas:', ['Una organización internacional para mantener la paz y la autodeterminación de los pueblos', 'Repartir Alemania entre los vencedores', 'Restaurar el zarismo', 'Prohibir el comercio internacional'], 'De esa idea surgió la Sociedad de las Naciones.'),
          M('La Revolución de Febrero de 1917 en Rusia provocó:', ['La abdicación del zar Nicolás II', 'La llegada de Lenin al poder', 'La creación de la URSS', 'La entrada de Rusia a la guerra'], 'Se formó un gobierno provisional, derrocado en octubre por los bolcheviques.'),
          M('La Revolución de Octubre de 1917 en Rusia llevó al poder a:', ['Los bolcheviques, dirigidos por Lenin', 'El zar Nicolás II', 'Los nazis', 'Una monarquía constitucional'], 'Su lema fue "paz, pan y tierra".'),
          M('Rusia se retiró de la Primera Guerra Mundial en 1918 mediante:', ['El Tratado de Brest-Litovsk, firmado por los bolcheviques con Alemania', 'El Tratado de Versalles', 'La Conferencia de Berlín', 'El Tratado de Ancón'], 'Los bolcheviques querían concentrarse en la revolución interna.'),
          M('En 1922, tras una guerra civil entre rojos y blancos, se creó:', ['La Unión de Repúblicas Socialistas Soviéticas (URSS)', 'La Sociedad de las Naciones', 'La OTAN', 'El Imperio ruso'], 'Fue el primer Estado socialista del mundo.'),
          M('Para Chile, una consecuencia de la Primera Guerra Mundial fue:', ['La crisis del salitre natural por la aparición del salitre sintético', 'La pérdida de Tarapacá', 'Una invasión alemana', 'La anexión de Bolivia'], 'Chile se mantuvo neutral en el conflicto.'),
          T('Después de la guerra, Estados Unidos se consolidó como una gran potencia económica.', true, 'Europa quedó endeudada y devastada.'),
        ],
      },
    ],
  });
})();
