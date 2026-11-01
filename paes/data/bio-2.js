// Biología (2): ADN y división celular; herencia (Mendel, grupos sanguíneos, ligada al sexo, genealogías).
(function () {
  const RB = window.RB, { M, T, P, S, O, N, X } = RB.Q;

  // ---------- ADN y división celular ----------
  RB.unit('bc', {
    name: 'ADN y división celular', desc: 'Estructura del ADN, genes, cromosomas y cariotipo, ciclo celular, mitosis, meiosis, cáncer y mutaciones.', ic: 'dna', area: 'Genética',
    lessons: [
      {
        n: 'ADN, genes y cromosomas', ic: 'dna', items: [
          { t: 'info', ic: 'dna', title: 'El material genético', txt: 'El **ADN** es una **doble hélice** de nucleótidos (fosfato + desoxirribosa + base). Bases complementarias: **A–T** y **C–G**. Un **gen** es un segmento de ADN con la información para una proteína. Los humanos tenemos **46 cromosomas** (23 pares): 22 pares de autosomas y un par sexual (XX o XY).' },
          M('En el ADN, la adenina (A) se aparea siempre con:', ['Timina (T)', 'Citosina (C)', 'Guanina (G)', 'Uracilo (U)'], 'Pares complementarios: A–T y C–G. En el ARN, el uracilo reemplaza a la timina.'),
          M('Si una hebra de ADN tiene la secuencia ATGC, su hebra complementaria es:', ['TACG', 'ATGC', 'UACG', 'GCAT'], 'A con T, T con A, G con C y C con G.'),
          N('Si el 30 % de las bases de un ADN es adenina, ¿qué porcentaje es guanina?', 20, '%', 'A = T = 30 %, así que A + T = 60 % y C + G = 40 %: G = 20 %.'),
          M('Un gen es:', ['Un segmento de ADN con la información para fabricar una proteína', 'Un cromosoma completo', 'Una proteína', 'Un tipo de célula'], 'Los genes se ordenan a lo largo de los cromosomas.'),
          M('¿Cuántos cromosomas tiene una célula somática (del cuerpo) humana?', ['46, en 23 pares', '23', '44', '92'], 'Los gametos tienen la mitad: 23.'),
          M('Una célula diploide (2n) es aquella que:', ['Tiene pares de cromosomas homólogos, uno de cada progenitor', 'Tiene un solo juego de cromosomas', 'No tiene núcleo', 'Solo existe en bacterias'], 'Las células del cuerpo son diploides; los gametos son haploides (n).'),
          M('El cariotipo de un hombre está formado por:', ['44 autosomas + XY', '44 autosomas + XX', '46 autosomas + XY', '22 autosomas + X'], 'El de una mujer es 44 + XX. El cariotipo ordena los cromosomas por tamaño y forma.'),
          T('El ARN tiene uracilo en lugar de timina.', true, 'Además, el ARN suele tener una sola hebra y su azúcar es la ribosa.'),
          M('¿Quiénes propusieron el modelo de doble hélice del ADN en 1953?', ['Watson y Crick, con datos de Rosalind Franklin', 'Mendel y Darwin', 'Schleiden y Schwann', 'Hooke y Pasteur'], 'Las imágenes de rayos X de Franklin fueron clave.'),
          M('La replicación del ADN es semiconservativa porque:', ['Cada nueva molécula conserva una hebra original y una nueva', 'Se conservan juntas las dos hebras originales', 'El ADN original se destruye', 'Solo se copia la mitad del ADN'], 'Ocurre en la fase S del ciclo celular.'),
          M('El proceso en que la información del ADN se copia en un ARN mensajero se llama:', ['Transcripción', 'Traducción', 'Replicación', 'Mutación'], 'Ocurre en el núcleo. Luego, en el ribosoma, la traducción convierte el ARNm en proteína.'),
          O('Ordena el flujo de la información genética', ['ADN', 'ARN mensajero', 'Proteína', 'Característica del organismo'], 'Transcripción (ADN → ARN) y traducción (ARN → proteína).'),
        ],
      },
      {
        n: 'Ciclo celular y mitosis', ic: 'replay', items: [
          { t: 'info', ic: 'replay', title: 'Ciclo celular', txt: '**Interfase**: G1 (crece), **S (duplica el ADN)** y G2 (se prepara). **Fase M**: mitosis (**profase, metafase, anafase, telofase**) y citocinesis. La mitosis forma **2 células idénticas** a la madre: sirve para crecer, reparar tejidos y la reproducción asexual.' },
          M('¿En qué etapa del ciclo celular se duplica el ADN?', ['En la fase S de la interfase', 'En la profase', 'En la anafase', 'En la citocinesis'], 'S viene de síntesis.'),
          O('Ordena las fases de la mitosis', ['Profase', 'Metafase', 'Anafase', 'Telofase'], 'Un truco: PMAT.'),
          M('En la metafase, los cromosomas:', ['Se alinean en el centro (plano ecuatorial) de la célula', 'Se separan hacia los polos', 'Se descondensan', 'Se duplican'], 'Es la mejor fase para observar y contar los cromosomas.'),
          M('En la anafase de la mitosis:', ['Las cromátidas hermanas se separan hacia polos opuestos', 'Los cromosomas se alinean en el centro', 'Se forma la membrana nuclear', 'Se duplica el ADN'], 'Las fibras del huso las tiran hacia los polos.'),
          M('Una célula con 46 cromosomas se divide por mitosis. Cada célula hija tendrá:', ['46 cromosomas', '23 cromosomas', '92 cromosomas', '44 cromosomas'], 'La mitosis forma células idénticas a la madre.'),
          X('¿Para qué sirve la mitosis? Marca todas las correctas.', ['Crecer', 'Reparar tejidos dañados', 'La reproducción asexual', 'Formar gametos'], [0, 1, 2], 'Los gametos se forman por meiosis.'),
          M('La citocinesis es:', ['La división del citoplasma, que separa las dos células hijas', 'La duplicación del ADN', 'La alineación de los cromosomas', 'La unión de dos gametos'], 'Ocurre al final de la mitosis.'),
          M('Un cromosoma duplicado (después de la fase S) está formado por:', ['Dos cromátidas hermanas unidas por el centrómero', 'Una sola cromátida', 'Cuatro cromosomas', 'Dos núcleos'], 'Las cromátidas se separan en la anafase.'),
          M('El cáncer se produce cuando:', ['Las células se dividen sin control por fallas en la regulación del ciclo celular', 'Las células dejan de dividirse', 'Se forman demasiados gametos', 'Hay exceso de oxígeno en la sangre'], 'Las mutaciones en los genes que controlan el ciclo pueden causarlo y forman tumores.'),
          X('¿Cuáles son factores de riesgo de cáncer? Marca todos.', ['El humo del tabaco', 'La radiación ultravioleta sin protección', 'Algunos virus, como el VPH', 'Beber agua potable'], [0, 1, 2], 'Son agentes que pueden producir mutaciones.'),
          T('La mayoría de las neuronas maduras se divide constantemente.', false, 'Las neuronas maduras salen del ciclo celular (fase G0) y en general no se dividen.'),
        ],
      },
      {
        n: 'Meiosis y mutaciones', ic: 'spark', items: [
          { t: 'info', ic: 'spark', title: 'Meiosis', txt: 'Forma los **gametos**: una célula **2n** produce **4 células n**, distintas entre sí. En la **meiosis I** se separan los homólogos (antes ocurre el **crossing-over**) y en la **meiosis II**, las cromátidas. Una **no disyunción** puede causar alteraciones como la **trisomía 21** (síndrome de Down).' },
          M('La meiosis produce:', ['4 células haploides (n) distintas entre sí', '2 células diploides idénticas', '4 células diploides idénticas', '1 célula haploide'], 'Así se forman los gametos.'),
          M('Si una especie tiene 2n = 8, ¿cuántos cromosomas tiene cada uno de sus gametos?', ['4', '8', '16', '2'], 'Los gametos son haploides: n = 4.'),
          N('Un perro tiene 78 cromosomas en sus células somáticas. ¿Cuántos tiene un espermatozoide de perro?', 39, 'cromosomas', 'Los gametos son haploides: 78 / 2.'),
          M('El crossing-over (entrecruzamiento), que ocurre en la profase I de la meiosis, consiste en:', ['El intercambio de segmentos entre cromosomas homólogos', 'La duplicación del ADN', 'La división del citoplasma', 'La fusión de dos gametos'], 'Forma nuevas combinaciones de genes: genera variabilidad.'),
          S('Clasifica cada característica', ['Mitosis', 'Meiosis'], [['Forma 2 células hijas', 0], ['Hijas idénticas a la madre', 0], ['Crecimiento y reparación', 0], ['Forma 4 células hijas', 1], ['Reduce los cromosomas a la mitad', 1], ['Hay crossing-over', 1]], 'La meiosis forma gametos y genera variabilidad.'),
          M('¿Por qué es importante que los gametos sean haploides?', ['Para que al unirse en la fecundación se recupere el número diploide de la especie', 'Para que el cigoto tenga el doble de cromosomas que sus padres', 'Para evitar la variabilidad', 'Porque no tienen ADN'], 'n + n = 2n.'),
          M('Una mutación es:', ['Un cambio en la secuencia o en la cantidad del material genético', 'Una enfermedad contagiosa', 'Un tipo de división celular', 'La unión de dos gametos'], 'Puede ser perjudicial, neutra o, a veces, beneficiosa.'),
          M('El síndrome de Down se debe a:', ['Una copia extra del cromosoma 21 (trisomía 21)', 'La falta de un cromosoma X', 'Una infección viral', 'Un exceso de vitaminas'], 'Suele originarse por una no disyunción durante la meiosis.'),
          M('La no disyunción es:', ['Una falla en la separación de los cromosomas durante la meiosis', 'La unión de dos cromosomas', 'La duplicación del ADN', 'Un tipo de fecundación'], 'Genera gametos con un cromosoma de más o de menos.'),
          M('El síndrome de Turner corresponde a una mujer con cariotipo:', ['45, X (un solo cromosoma X)', '47, XXY', '47, XX + 21', '46, XY'], 'El síndrome de Klinefelter, en cambio, es un hombre 47, XXY.'),
          T('Las mutaciones que ocurren en los gametos pueden heredarse.', true, 'Las mutaciones en células somáticas no pasan a los hijos, pero pueden causar enfermedades como el cáncer.'),
          M('¿Qué fuentes de variabilidad genética aporta la reproducción sexual?', ['El crossing-over, la permutación de los cromosomas y la fecundación al azar', 'La fotosíntesis y la respiración', 'Solo la mitosis', 'La osmosis'], 'Por eso cada hijo es genéticamente único, salvo los gemelos idénticos.'),
        ],
      },
    ],
  });

  // ---------- Herencia ----------
  RB.unit('bd', {
    name: 'Herencia', desc: 'Leyes de Mendel, cuadro de Punnett, dominancia incompleta, codominancia, grupos sanguíneos, herencia ligada al sexo, genealogías y biotecnología.', ic: 'people', area: 'Genética',
    lessons: [
      {
        n: 'Mendel y la primera ley', ic: 'grid', items: [
          { t: 'info', ic: 'grid', title: 'Conceptos', txt: '**Alelos**: versiones de un gen (A dominante, a recesivo). **Homocigoto**: AA o aa; **heterocigoto**: Aa. **Genotipo**: los alelos; **fenotipo**: la característica observable. **1ª ley (segregación)**: los alelos se separan al formar los gametos. Aa × Aa → 1 AA : 2 Aa : 1 aa (3 : 1 en fenotipo).' },
          P('Une cada concepto con su definición', [['Alelo', 'Versión alternativa de un gen'], ['Genotipo', 'Combinación de alelos de un individuo'], ['Fenotipo', 'Característica observable'], ['Homocigoto', 'Dos alelos iguales'], ['Heterocigoto', 'Dos alelos distintos']], 'El fenotipo depende del genotipo y del ambiente.'),
          M('En las arvejas, el color amarillo (A) domina sobre el verde (a). ¿Qué color tiene una planta Aa?', ['Amarillo', 'Verde', 'Amarillo verdoso', 'No se puede saber'], 'Basta un alelo dominante para que se exprese.'),
          M('Al cruzar dos plantas heterocigotas (Aa × Aa), la proporción fenotípica esperada es:', ['3 dominantes : 1 recesivo', '1 : 1', '1 : 2 : 1', 'Todos dominantes'], 'Genotipos 1 AA : 2 Aa : 1 aa, así que 3 de cada 4 muestran el fenotipo dominante.'),
          M('En el cruce Aa × Aa, ¿qué proporción de la descendencia será heterocigota?', ['1/2', '1/4', '3/4', '0'], '2 de las 4 combinaciones del cuadro de Punnett son Aa.'),
          M('Al cruzar AA × aa, toda la primera generación (F1) será:', ['Aa (heterocigota), con fenotipo dominante', 'AA (homocigota dominante)', 'aa (homocigota recesiva)', 'Mitad AA y mitad aa'], 'Uno aporta A y el otro a. Mendel observó que la F1 es uniforme.'),
          M('Para saber si una planta de fenotipo dominante es AA o Aa, se cruza con una aa. Este cruce se llama:', ['Cruzamiento de prueba', 'Autofecundación', 'Clonación', 'Mutación'], 'Si aparece algún descendiente recesivo, la planta era Aa.'),
          M('En un cruzamiento de prueba se obtiene 50 % de descendientes dominantes y 50 % recesivos. El individuo probado era:', ['Heterocigoto (Aa)', 'Homocigoto dominante (AA)', 'Homocigoto recesivo (aa)', 'Haploide'], 'Aa × aa → 1/2 Aa : 1/2 aa.'),
          N('Dos padres heterocigotos (Aa) para el albinismo, que es recesivo, tienen un hijo. ¿Qué probabilidad hay, en %, de que sea albino?', 25, '%', 'Solo 1 de las 4 combinaciones es aa.'),
          T('Un individuo con fenotipo recesivo siempre es homocigoto.', true, 'El recesivo solo se expresa si no hay ningún alelo dominante: aa.'),
          M('Mendel hizo sus experimentos de herencia con:', ['Plantas de arveja', 'Moscas de la fruta', 'Ratones', 'Bacterias'], 'Eligió características con dos variantes claras, como el color y la forma de la semilla.'),
          M('La primera ley de Mendel, o ley de segregación, dice que:', ['Los dos alelos de un gen se separan al formar los gametos', 'Los genes de distintas características siempre se heredan juntos', 'Los caracteres adquiridos se heredan', 'Todos los alelos son dominantes'], 'Cada gameto lleva un solo alelo de cada gen.'),
        ],
      },
      {
        n: 'Dos características y otras herencias', ic: 'dice', items: [
          { t: 'info', ic: 'dice', title: 'Más allá del 3 : 1', txt: '**2ª ley (segregación independiente)**: AaBb × AaBb → **9 : 3 : 3 : 1**. **Dominancia incompleta**: el heterocigoto es intermedio (rojo × blanco → rosado). **Codominancia**: se expresan ambos alelos (grupo AB). Grupos sanguíneos: alelos Iᴬ e Iᴮ (codominantes) e i (recesivo).' },
          M('Al cruzar dos dihíbridos (AaBb × AaBb), la proporción fenotípica es:', ['9 : 3 : 3 : 1', '3 : 1', '1 : 2 : 1', '1 : 1 : 1 : 1'], 'Es el resultado de la segunda ley de Mendel.'),
          M('¿Cuántos tipos distintos de gametos produce un individuo AaBb?', ['4: AB, Ab, aB y ab', '2', '1', '8'], 'Cada gameto lleva un alelo de cada gen, combinados al azar.'),
          M('En el cruce AaBb × AaBb, ¿qué fracción de la descendencia muestra los dos caracteres recesivos (aabb)?', ['1/16', '9/16', '3/16', '1/4'], 'Se calcula cada gen por separado y se multiplica: 1/4 · 1/4.'),
          M('En una flor, el rojo y el blanco presentan dominancia incompleta. Al cruzar una roja pura con una blanca pura, la F1 será:', ['Toda rosada', 'Toda roja', 'Toda blanca', 'Mitad roja y mitad blanca'], 'El heterocigoto muestra un fenotipo intermedio.'),
          M('Si se cruzan dos flores rosadas con dominancia incompleta, se espera:', ['1 roja : 2 rosadas : 1 blanca', '3 rojas : 1 blanca', 'Todas rosadas', '9 : 3 : 3 : 1'], 'Aquí la proporción de fenotipos coincide con la de genotipos.'),
          M('Una persona de grupo sanguíneo AB expresa los antígenos A y B. Esto es un ejemplo de:', ['Codominancia', 'Dominancia incompleta', 'Herencia ligada al sexo', 'Mutación'], 'Ambos alelos se expresan por completo.'),
          P('Une cada genotipo con su grupo sanguíneo', [['IᴬIᴬ o Iᴬi', 'Grupo A'], ['IᴮIᴮ o Iᴮi', 'Grupo B'], ['IᴬIᴮ', 'Grupo AB'], ['ii', 'Grupo O']], 'Iᴬ e Iᴮ son codominantes entre sí y dominantes sobre i.'),
          M('Un padre de grupo A (Iᴬi) y una madre de grupo B (Iᴮi) pueden tener hijos de grupo:', ['A, B, AB u O', 'Solo AB', 'Solo A o B', 'Solo O'], 'Cada uno puede aportar su alelo o el alelo i: IᴬIᴮ, Iᴬi, Iᴮi o ii.'),
          M('Dos padres de grupo O pueden tener hijos de grupo:', ['Solo O', 'A u O', 'AB', 'Cualquiera'], 'Ambos son ii: solo pueden aportar el alelo i.'),
          T('El ambiente puede influir en el fenotipo.', true, 'Fenotipo = genotipo + ambiente. La estatura, por ejemplo, depende también de la alimentación.'),
        ],
      },
      {
        n: 'Ligada al sexo, genealogías y biotecnología', ic: 'people', items: [
          { t: 'info', ic: 'people', title: 'Herencia ligada al X', txt: 'El **daltonismo** y la **hemofilia** son recesivos ligados al **cromosoma X**: son más frecuentes en **hombres**, que tienen un solo X. Una mujer **portadora** (XᴴXʰ) no presenta la enfermedad, pero puede transmitirla. En una **genealogía**: cuadrado = hombre, círculo = mujer, relleno = afectado.' },
          M('¿Por qué el daltonismo es más frecuente en los hombres?', ['Porque tienen un solo cromosoma X: basta un alelo recesivo para manifestarlo', 'Porque el cromosoma Y causa daltonismo', 'Porque las mujeres no tienen cromosoma X', 'Porque es una infección'], 'Una mujer necesita dos alelos recesivos para manifestarlo.'),
          M('Una mujer portadora de hemofilia (XᴴXʰ) y un hombre sano (XᴴY) tienen un hijo varón. ¿Qué probabilidad hay de que sea hemofílico?', ['1/2', '1/4', '0', '1'], 'El hijo recibe el Y del padre y uno de los dos X de la madre: la mitad recibe Xʰ.'),
          M('Un hombre daltónico y una mujer que no es portadora tienen hijos. ¿Qué se espera?', ['Hijas portadoras e hijos sanos', 'Todos los hijos varones daltónicos', 'Todas las hijas daltónicas', 'La mitad de los hijos daltónicos'], 'El padre da su X a las hijas (quedan portadoras) y su Y a los hijos.'),
          T('Un padre transmite su cromosoma X a todas sus hijas.', true, 'Y su cromosoma Y a todos sus hijos varones.'),
          M('En una genealogía, un círculo relleno representa a:', ['Una mujer afectada', 'Un hombre afectado', 'Una mujer sana', 'Un hombre portador'], 'Cuadrado = hombre; círculo = mujer; relleno = presenta la característica.'),
          M('En una genealogía, dos padres sanos tienen un hijo afectado. La característica es:', ['Recesiva, y ambos padres son portadores', 'Dominante', 'Siempre ligada al Y', 'Causada solo por el ambiente'], 'Si fuera dominante, al menos uno de los padres estaría afectado.'),
          M('Un rasgo que aparece en todas las generaciones, y cuyos afectados siempre tienen un padre afectado, suele ser:', ['Dominante', 'Recesivo', 'Ligado al cromosoma Y', 'Adquirido'], 'Un rasgo dominante no se salta generaciones.'),
          M('¿Qué probabilidad tiene una pareja de que su próximo hijo sea mujer?', ['1/2', '1/4', '1/3', '1'], 'La madre siempre aporta un X; el padre aporta X o Y con igual probabilidad.'),
          M('Un organismo transgénico es aquel que:', ['Tiene en su ADN un gen de otra especie, introducido por ingeniería genética', 'Es idéntico a otro organismo', 'Tiene más cromosomas de lo normal', 'Nació por fecundación natural'], 'Por ejemplo, las bacterias con el gen humano de la insulina.'),
          M('La oveja Dolly, nacida en 1996, fue el primer mamífero:', ['Clonado a partir de una célula adulta', 'Transgénico', 'Con cuatro patas', 'Nacido por fecundación in vitro'], 'Se transfirió el núcleo de una célula adulta a un óvulo sin núcleo.'),
          M('Hoy, la insulina para las personas con diabetes se produce principalmente:', ['Con bacterias que tienen el gen humano de la insulina', 'Extrayéndola de cadáveres', 'Con plantas fotosintéticas', 'A partir del azúcar de mesa'], 'Es un ejemplo de biotecnología con ADN recombinante.'),
        ],
      },
    ],
  });
})();
