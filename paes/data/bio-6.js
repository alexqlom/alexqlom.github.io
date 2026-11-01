// Biología (6): evolución y biodiversidad; ecología.
(function () {
  const RB = window.RB, { M, T, P, S, O, N, X } = RB.Q;

  // ---------- Evolución y biodiversidad ----------
  RB.unit('bj', {
    name: 'Evolución y biodiversidad', desc: 'Evidencias de la evolución, Lamarck y Darwin, selección natural, especie y especiación, clasificación y biodiversidad.', ic: 'leaf', area: 'Evolución',
    lessons: [
      {
        n: 'Evidencias de la evolución', ic: 'search', items: [
          { t: 'info', ic: 'search', title: 'Evidencias', txt: '**Fósiles** (organismos del pasado), **anatomía comparada**: estructuras **homólogas** (mismo origen, distinta función: brazo humano y ala de murciélago) y **análogas** (misma función, distinto origen: ala de ave y de insecto), **órganos vestigiales**, **embriología** comparada y **biología molecular** (ADN parecido).' },
          M('El brazo humano, la aleta de una ballena y el ala de un murciélago son estructuras:', ['Homólogas: mismo origen evolutivo, distinta función', 'Análogas: misma función, distinto origen', 'Vestigiales', 'Sin ninguna relación'], 'Tienen los mismos huesos básicos, heredados de un ancestro común.'),
          M('El ala de una mariposa y el ala de un ave son estructuras:', ['Análogas', 'Homólogas', 'Vestigiales', 'De idéntico origen'], 'Cumplen la misma función, pero tienen orígenes distintos.'),
          M('Los fósiles son evidencia de la evolución porque:', ['Muestran organismos del pasado y cómo cambiaron las especies a lo largo del tiempo', 'Son idénticos a las especies actuales', 'Demuestran que las especies nunca cambian', 'Siempre conservan el ADN intacto'], 'Permiten reconstruir la historia de la vida.'),
          M('En una secuencia de capas de roca sin alterar, los fósiles más antiguos se encuentran:', ['En las capas más profundas', 'En las capas superficiales', 'Siempre mezclados', 'Solo en los océanos'], 'Las capas se depositan unas sobre otras a lo largo del tiempo.'),
          M('Un órgano vestigial es aquel que:', ['Está reducido y no tiene una función importante, pero fue útil en los ancestros', 'Es el más grande del cuerpo', 'Aparece solo en los fósiles', 'Se forma en la adultez'], 'Ejemplos: el coxis humano o los restos de pelvis en las ballenas.'),
          M('Si dos especies tienen secuencias de ADN muy parecidas, se puede inferir que:', ['Están emparentadas y tienen un ancestro común reciente', 'Son la misma especie', 'No tienen relación', 'Una se transformó en la otra hace pocos años'], 'La comparación molecular permite construir árboles filogenéticos.'),
          S('Clasifica cada par de estructuras', ['Homólogas', 'Análogas'], [['Brazo humano y pata de perro', 0], ['Aleta de ballena y ala de murciélago', 0], ['Ala de ave y ala de insecto', 1], ['Aleta de tiburón y aleta de delfín', 1]], 'Homólogas: mismo origen. Análogas: misma función por adaptarse a un ambiente parecido.'),
          T('Los embriones de los vertebrados son muy parecidos en sus primeras etapas.', true, 'Por ejemplo, todos presentan cola y arcos faríngeos: evidencia de un ancestro común.'),
        ],
      },
      {
        n: 'Lamarck, Darwin y la selección natural', ic: 'leaf', items: [
          { t: 'info', ic: 'leaf', title: 'Teorías', txt: '**Lamarck**: uso y desuso, y herencia de caracteres adquiridos (descartada). **Darwin y Wallace**: **selección natural**: hay variabilidad heredable, nacen más individuos de los que sobreviven, y los mejor adaptados se reproducen más. **Teoría sintética**: suma la genética (mutación y recombinación).' },
          M('Según Lamarck, las jirafas tienen el cuello largo porque:', ['Lo estiraron para alcanzar las hojas y heredaron ese cambio a sus crías', 'Las de cuello más largo sobrevivieron y se reprodujeron más', 'Hubo una mutación al azar', 'Siempre fueron iguales'], 'La herencia de caracteres adquiridos fue descartada.'),
          M('Según Darwin, las jirafas tienen el cuello largo porque:', ['Las que tenían el cuello más largo sobrevivieron y se reprodujeron más', 'Estiraron el cuello y lo heredaron', 'El ambiente les ordenó cambiar', 'Comieron más que otras especies'], 'Es la selección natural actuando sobre la variabilidad.'),
          T('Un fisicoculturista heredará sus músculos desarrollados a sus hijos.', false, 'Lo adquirido durante la vida no se hereda; solo se heredan los cambios en el ADN de los gametos.'),
          O('Ordena el razonamiento de la selección natural', ['Hay variabilidad heredable entre los individuos', 'Nacen más individuos de los que pueden sobrevivir', 'Los mejor adaptados sobreviven y se reproducen más', 'Sus características se vuelven más frecuentes en la población'], 'Así cambian las poblaciones a lo largo de las generaciones.'),
          M('La fuente original de nuevas variantes genéticas es:', ['La mutación', 'El uso y desuso de los órganos', 'La alimentación', 'El ejercicio'], 'La recombinación en la meiosis mezcla esas variantes.'),
          M('En la Inglaterra industrial, las polillas oscuras se volvieron más frecuentes porque:', ['Se camuflaban mejor en los troncos ennegrecidos por el hollín y los pájaros las cazaban menos', 'El hollín las tiñó', 'Decidieron oscurecerse', 'Comían hollín'], 'Es un ejemplo clásico de selección natural, llamado melanismo industrial.'),
          M('La resistencia de las bacterias a los antibióticos aparece porque:', ['Las bacterias que ya eran resistentes sobreviven y se multiplican', 'El antibiótico enseña a las bacterias a resistir', 'Las bacterias deciden cambiar', 'El paciente se vuelve resistente'], 'El antibiótico no crea la resistencia: la selecciona.'),
          M('La teoría sintética de la evolución combina la selección natural con:', ['La genética: mutaciones, recombinación y herencia', 'La generación espontánea', 'La herencia de caracteres adquiridos', 'El fijismo'], 'También se le llama neodarwinismo.'),
          M('En su viaje en el Beagle, Darwin observó en las islas Galápagos:', ['Pinzones con picos adaptados al alimento de cada isla', 'Dinosaurios vivos', 'Bacterias al microscopio', 'Las arvejas de Mendel'], 'Esa variación entre islas lo ayudó a desarrollar su teoría.'),
          M('En evolución, el individuo "más apto" es el que:', ['Deja más descendientes fértiles en su ambiente', 'Es el más fuerte', 'Es el más grande', 'Vive más años'], 'La aptitud se mide en éxito reproductivo.'),
        ],
      },
      {
        n: 'Especies, clasificación y biodiversidad', ic: 'list', items: [
          { t: 'info', ic: 'list', title: 'Especies', txt: '**Especie**: individuos que se reproducen entre sí y tienen descendencia **fértil**. La **especiación** suele ocurrir por **aislamiento** (por ejemplo, geográfico). Clasificación: **3 dominios** (Bacteria, Archaea y Eukarya). Nombre científico **binomial**: género + especie (*Homo sapiens*). **Biodiversidad**: genética, de especies y de ecosistemas.' },
          M('El caballo y el burro pueden tener crías (mulas), pero estas son estériles. Por lo tanto:', ['Caballo y burro son especies distintas', 'Son la misma especie', 'La mula es una especie nueva', 'El burro es una variedad del caballo'], 'Una especie produce descendencia fértil.'),
          M('La especiación por aislamiento geográfico ocurre cuando:', ['Una barrera separa una población y cada parte evoluciona por separado', 'Dos especies se fusionan', 'Un solo individuo muta', 'No hay ningún aislamiento'], 'Con el tiempo acumulan tantas diferencias que ya no pueden cruzarse.'),
          M('El nombre científico de una especie se escribe:', ['Con dos palabras en latín: género y especie, como Homo sapiens', 'Con una sola palabra', 'En el idioma de cada país', 'Con un número'], 'Es el sistema binomial de Linneo.'),
          M('Los tres dominios de los seres vivos son:', ['Bacteria, Archaea y Eukarya', 'Animal, vegetal y hongos', 'Vertebrados, invertebrados y plantas', 'Procariotas, virus y eucariotas'], 'Los virus no se incluyen porque no son células.'),
          O('Ordena las categorías de clasificación de la más general a la más específica', ['Dominio', 'Reino', 'Filo', 'Clase', 'Orden', 'Familia', 'Género', 'Especie'], 'Mientras más específica la categoría, más parecidos son los organismos que agrupa.'),
          P('Une cada grupo con un ejemplo', [['Animales', 'Huemul'], ['Plantas', 'Araucaria'], ['Hongos', 'Champiñón'], ['Protistas', 'Ameba'], ['Bacterias', 'Escherichia coli']], 'Hongos: heterótrofos con pared de quitina. Plantas: autótrofas con pared de celulosa.'),
          M('Los hongos se diferencian de las plantas porque:', ['Son heterótrofos y su pared es de quitina', 'Hacen fotosíntesis', 'Son procariotas', 'No tienen núcleo'], 'Se alimentan por absorción y muchos son descomponedores.'),
          M('La biodiversidad incluye la diversidad:', ['Genética, de especies y de ecosistemas', 'Solo de animales', 'Solo de especies en peligro', 'Solo de plantas'], 'Las tres son importantes para la estabilidad de los ecosistemas.'),
          T('Una especie endémica es aquella que vive naturalmente solo en un lugar determinado.', true, 'Por ejemplo, el picaflor de Juan Fernández.'),
          M('Según la evolución, los seres humanos y los chimpancés:', ['Comparten un ancestro común', 'Los humanos descienden de los chimpancés actuales', 'No tienen ninguna relación', 'Son la misma especie'], 'Sus linajes se separaron hace unos 6 a 7 millones de años.'),
        ],
      },
    ],
  });

  // ---------- Ecología ----------
  RB.unit('bk', {
    name: 'Ecología', desc: 'Niveles de organización, interacciones, tramas tróficas, flujo de energía, ciclos de la materia, poblaciones e impacto humano.', ic: 'globe', area: 'Ecología',
    lessons: [
      {
        n: 'Ecosistemas e interacciones', ic: 'globe', items: [
          { t: 'info', ic: 'globe', title: 'Niveles e interacciones', txt: 'Individuo → **población** (misma especie) → **comunidad** (todas las especies) → **ecosistema** (comunidad + factores **abióticos**) → biosfera. Interacciones: **mutualismo** (+/+), **depredación** y **parasitismo** (+/−), **comensalismo** (+/0) y **competencia** (−/−).' },
          O('Ordena los niveles de organización ecológica de menor a mayor', ['Individuo', 'Población', 'Comunidad', 'Ecosistema', 'Biosfera'], 'El ecosistema suma los factores abióticos.'),
          M('Una población es:', ['Un grupo de individuos de la misma especie que viven en un lugar y tiempo determinados', 'Todas las especies de un lugar', 'Los factores físicos de un lugar', 'Un solo organismo'], 'Varias poblaciones forman una comunidad.'),
          S('Clasifica cada factor', ['Biótico', 'Abiótico'], [['Plantas', 0], ['Bacterias del suelo', 0], ['Herbívoros', 0], ['Temperatura', 1], ['Luz solar', 1], ['Humedad', 1]], 'Bióticos: los seres vivos. Abióticos: los componentes físicos y químicos.'),
          P('Une cada interacción con un ejemplo', [['Mutualismo (+/+)', 'Abeja que poliniza una flor mientras obtiene néctar'], ['Parasitismo (+/−)', 'Garrapata que se alimenta de un perro'], ['Comensalismo (+/0)', 'Ave que anida en un árbol sin dañarlo'], ['Competencia (−/−)', 'Dos especies que comen las mismas semillas'], ['Depredación (+/−)', 'Puma que caza un guanaco']], 'Los signos indican si cada especie gana (+), pierde (−) o no se afecta (0).'),
          M('Un liquen es una asociación entre un hongo y un alga en que ambos se benefician. Es un ejemplo de:', ['Mutualismo', 'Parasitismo', 'Competencia', 'Depredación'], 'El alga aporta alimento por fotosíntesis, y el hongo, protección y humedad.'),
          M('El nicho ecológico de una especie es:', ['Su función en el ecosistema: qué come, dónde vive y cómo se relaciona', 'Solo el lugar donde vive', 'Su nombre científico', 'Su número de cromosomas'], 'El lugar donde vive es su hábitat.'),
          T('Dos especies que ocupan exactamente el mismo nicho no pueden coexistir por mucho tiempo.', true, 'Es el principio de exclusión competitiva.'),
          M('En una relación depredador-presa, si disminuye la población de presas, se espera que luego:', ['Disminuya la población de depredadores', 'Aumenten los depredadores', 'Desaparezcan las plantas', 'No cambie nada'], 'Las poblaciones de ambos oscilan de forma desfasada.'),
        ],
      },
      {
        n: 'Energía y tramas tróficas', ic: 'sun', items: [
          { t: 'info', ic: 'sun', title: 'Flujo de energía', txt: '**Productores** (autótrofos) → **consumidores** primarios (herbívoros), secundarios y terciarios. Los **descomponedores** (hongos y bacterias) reciclan la materia. La **energía fluye** en un solo sentido: a cada nivel pasa cerca del **10 %** y el resto se pierde como calor. La **materia se recicla**.' },
          M('En una cadena alimentaria, los productores son:', ['Organismos autótrofos, como las plantas y las algas', 'Los herbívoros', 'Los carnívoros', 'Los descomponedores'], 'Captan la energía del Sol mediante la fotosíntesis.'),
          M('En la cadena pasto → conejo → zorro → puma, el zorro es:', ['Consumidor secundario', 'Consumidor primario', 'Productor', 'Consumidor terciario'], 'Se alimenta de un herbívoro.'),
          N('Si los productores de un ecosistema fijan 10.000 kcal, ¿cuántas kcal llegan aproximadamente a los consumidores secundarios, según la regla del 10 %?', 100, 'kcal', '10.000 → 1.000 en los primarios → 100 en los secundarios.'),
          M('¿Por qué las cadenas alimentarias rara vez tienen más de 4 o 5 niveles?', ['Porque en cada nivel se pierde la mayor parte de la energía como calor', 'Porque los carnívoros no se reproducen', 'Porque la materia se acaba', 'Porque hay pocos productores'], 'Solo cerca del 10 % de la energía pasa al nivel siguiente.'),
          M('La energía en un ecosistema:', ['Fluye en un solo sentido y no se recicla', 'Se recicla igual que la materia', 'Aumenta en cada nivel trófico', 'Proviene de los descomponedores'], 'Entra como luz y sale como calor.'),
          M('Los descomponedores, como hongos y bacterias:', ['Transforman la materia orgánica muerta en nutrientes inorgánicos', 'Producen su alimento con la luz', 'Son siempre herbívoros', 'No cumplen ninguna función'], 'Cierran el ciclo de la materia.'),
          M('Una trama trófica se diferencia de una cadena porque:', ['Muestra las múltiples relaciones alimentarias entrelazadas de un ecosistema', 'Tiene un solo depredador', 'No incluye productores', 'Solo muestra descomponedores'], 'Es más realista: cada especie suele comer y ser comida por varias.'),
          M('Un pesticida que no se degrada y se concentra en cada nivel trófico produce:', ['Bioacumulación: los depredadores tope reciben las mayores concentraciones', 'Una disminución del tóxico en los carnívoros', 'Un aumento de la energía disponible', 'Más fotosíntesis'], 'Así ocurrió con el DDT en las aves rapaces.'),
          T('Una pirámide de energía siempre es más ancha en la base.', true, 'Los productores tienen la mayor cantidad de energía y cada nivel siguiente tiene menos.'),
        ],
      },
      {
        n: 'Ciclos de la materia y poblaciones', ic: 'replay', items: [
          { t: 'info', ic: 'replay', title: 'Ciclos y poblaciones', txt: '**Carbono**: la fotosíntesis capta CO₂; la respiración, la combustión y la descomposición lo liberan. **Nitrógeno**: bacterias **fijan** el N₂ del aire y lo transforman en nitratos para las plantas. **Agua**: evaporación, condensación, precipitación. Poblaciones: crecimiento **exponencial** (J) o **logístico** (S), que se estabiliza en la **capacidad de carga**.' },
          M('El proceso que retira CO₂ de la atmósfera es:', ['La fotosíntesis', 'La respiración celular', 'La combustión', 'La descomposición'], 'Los otros tres liberan CO₂.'),
          M('La quema de combustibles fósiles aumenta el efecto invernadero porque:', ['Libera CO₂ que estuvo almacenado durante millones de años', 'Produce oxígeno', 'Enfría la atmósfera', 'Fija nitrógeno'], 'Ese aumento de gases causa el calentamiento global.'),
          M('Las plantas obtienen el nitrógeno que necesitan principalmente:', ['Del suelo, como nitratos producidos por bacterias', 'Directamente del N₂ del aire', 'De la luz solar', 'Del oxígeno'], 'Bacterias fijadoras, como las de las raíces de las leguminosas, transforman el N₂.'),
          M('El nitrógeno es necesario para formar:', ['Proteínas y ácidos nucleicos', 'Solo carbohidratos', 'Solo lípidos', 'Agua'], 'Está en los aminoácidos y en las bases nitrogenadas.'),
          M('Una población que crece sin límites, duplicándose cada generación, muestra un crecimiento:', ['Exponencial (curva en J)', 'Logístico (curva en S)', 'Lineal', 'Nulo'], 'Ocurre solo mientras hay recursos ilimitados, lo que no dura mucho.'),
          M('La capacidad de carga de un ambiente es:', ['El número máximo de individuos que puede sostener de forma estable', 'La cantidad de agua de un lago', 'El número de especies', 'La energía del Sol'], 'En el crecimiento logístico, la población se estabiliza en ese valor.'),
          X('¿Qué factores pueden limitar el crecimiento de una población? Marca todos.', ['La escasez de alimento', 'Los depredadores', 'Las enfermedades', 'La abundancia de recursos'], [0, 1, 2], 'Se llaman factores limitantes o resistencia ambiental.'),
          M('Si en una población la natalidad y la inmigración superan a la mortalidad y la emigración, la población:', ['Crece', 'Disminuye', 'Se mantiene igual', 'Se extingue'], 'Crecimiento = (natalidad + inmigración) − (mortalidad + emigración).'),
          O('Ordena las etapas del ciclo del agua a partir del océano', ['Evaporación', 'Condensación en nubes', 'Precipitación', 'Escorrentía hacia ríos y océanos'], 'La energía del Sol mueve este ciclo. Las plantas aportan vapor por transpiración.'),
        ],
      },
      {
        n: 'Impacto humano y conservación', ic: 'factory', items: [
          { t: 'info', ic: 'factory', title: 'Impacto humano', txt: 'Amenazas: **pérdida de hábitat**, **especies invasoras**, **contaminación**, **sobreexplotación** y **cambio climático**. Respuestas: **áreas protegidas**, energías **renovables**, reciclaje, cuidado del agua y **desarrollo sustentable**.' },
          M('La principal causa de pérdida de biodiversidad en el mundo es:', ['La destrucción y fragmentación de los hábitats', 'El exceso de áreas protegidas', 'La fotosíntesis', 'El reciclaje'], 'Por ejemplo, la deforestación para la agricultura.'),
          M('Una especie exótica invasora es aquella que:', ['Fue introducida por el ser humano y se expande dañando a las especies nativas', 'Siempre fue parte del ecosistema', 'Está extinta', 'Solo vive en zoológicos'], 'En Chile, por ejemplo, el castor en Tierra del Fuego o el visón en el sur.'),
          M('La eutrofización de un lago se produce por:', ['El exceso de nutrientes, como fertilizantes, que provoca una explosión de algas y la falta de oxígeno', 'La falta de luz', 'El exceso de peces', 'La congelación del agua'], 'Al morir las algas, su descomposición consume el oxígeno del agua.'),
          M('¿Cuál de estas es una fuente de energía renovable?', ['La energía solar', 'El carbón', 'El petróleo', 'El gas natural'], 'El desierto de Atacama tiene una de las radiaciones solares más altas del mundo.'),
          M('La capa de ozono se ha dañado principalmente por:', ['Los clorofluorocarbonos (CFC)', 'El CO₂', 'El oxígeno', 'El vapor de agua'], 'El Protocolo de Montreal prohibió los CFC y la capa se está recuperando.'),
          T('El calentamiento global se relaciona con el aumento de gases de efecto invernadero, como el CO₂ y el metano.', true, 'Provienen sobre todo de la quema de combustibles fósiles, la deforestación y la ganadería.'),
          M('La huella de carbono de una persona mide:', ['Los gases de efecto invernadero que emiten sus actividades', 'El carbono que tiene su cuerpo', 'Los árboles que planta', 'El agua que bebe'], 'Se reduce usando transporte público, ahorrando energía y consumiendo productos locales.'),
          M('El desarrollo sustentable consiste en:', ['Usar los recursos sin comprometer su disponibilidad para las generaciones futuras', 'Explotar al máximo los recursos ahora', 'Prohibir toda actividad humana', 'Reemplazar el bosque nativo por plantaciones'], 'Busca equilibrar lo económico, lo social y lo ambiental.'),
        ],
      },
    ],
  });
})();
