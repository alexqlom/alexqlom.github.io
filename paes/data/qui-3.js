// Química (3): disoluciones; química orgánica; ácidos, bases y óxido-reducción.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Disoluciones ----------
  RB.unit('qe', {
    name: 'Disoluciones', desc: 'Soluto y solvente, solubilidad, unidades de concentración, dilución y propiedades coligativas.', ic: 'flask', vid: 'v-qe', area: 'Disoluciones',
    lessons: [
      {
        n: 'Soluto, solvente y solubilidad', ic: 'flask', items: [
          { t: 'info', ic: 'flask', title: 'Disolución', txt: 'Mezcla **homogénea** de un **soluto** (lo que se disuelve, en menor cantidad) y un **solvente** (lo que disuelve, en mayor cantidad). El agua es el solvente más común.' },
          M('En una mezcla de 10 g de sal y 200 g de agua, el soluto es:', ['La sal', 'El agua', 'La mezcla', 'Ninguno'], 'Es lo que se disuelve y está en menor cantidad.'),
          M('¿Cuál de estas es una mezcla homogénea (disolución)?', ['Agua con sal disuelta', 'Agua con arena', 'Aceite con agua', 'Una ensalada'], 'En una disolución no se distinguen las fases.'),
          M('Una disolución saturada es aquella que:', ['Contiene la máxima cantidad de soluto que se puede disolver a esa temperatura', 'No tiene soluto', 'Tiene muy poco soluto', 'Siempre tiene más soluto que solvente'], 'Si agregas más, queda sin disolver.'),
          M('La solubilidad de la mayoría de los sólidos en agua, al aumentar la temperatura:', ['Aumenta', 'Disminuye', 'No cambia', 'Se anula'], 'Por eso el azúcar se disuelve mejor en té caliente.'),
          M('La solubilidad de los gases en agua, al aumentar la temperatura:', ['Disminuye', 'Aumenta', 'No cambia', 'Se duplica siempre'], 'Al revés que los sólidos.'),
          M('¿Por qué una bebida con gas pierde el gas más rápido si está caliente?', ['Porque la solubilidad de los gases disminuye con la temperatura', 'Porque el azúcar se evapora', 'Porque el agua se congela', 'Porque aumenta la presión'], 'El CO₂ escapa de la disolución.'),
          T('El aire es una disolución gaseosa.', true, 'Nitrógeno como solvente y oxígeno, argón y otros gases como solutos.'),
          P('Une cada término con su definición', [['Soluto', 'Sustancia que se disuelve, en menor cantidad'], ['Solvente', 'Sustancia que disuelve, en mayor cantidad'], ['Diluida', 'Poca cantidad de soluto'], ['Concentrada', 'Gran cantidad de soluto']], 'Diluida y concentrada son términos cualitativos.'),
        ],
      },
      {
        n: 'Concentración', ic: 'calc', items: [
          { t: 'info', ic: 'calc', title: 'Unidades', txt: '**% m/m** = g soluto / g disolución · 100. **% m/v** = g soluto / mL disolución · 100. **Molaridad (M)** = moles de soluto / litros de disolución.' },
          M('Se disuelven 20 g de azúcar en 180 g de agua. ¿Cuál es el % m/m?', ['10 %', '11,1 %', '20 %', '90 %'], 'La disolución pesa 200 g: 20/200 · 100. Ojo: no se divide por 180.'),
          M('¿Cuántos gramos de sal hay en 500 g de una disolución al 4 % m/m?', ['20 g', '4 g', '125 g', '40 g'], '0,04 · 500.'),
          M('Se disuelven 2 moles de NaCl hasta formar 4 litros de disolución. ¿Cuál es la molaridad?', ['0,5 M', '2 M', '8 M', '4 M'], '2 mol / 4 L.'),
          M('¿Cuántos moles de soluto hay en 250 mL de una disolución 2 M?', ['0,5 mol', '2 mol', '500 mol', '8 mol'], '2 mol/L · 0,25 L.'),
          M('Una disolución tiene 5 g de soluto en 100 mL de disolución. Su concentración es:', ['5 % m/v', '5 M', '50 % m/v', '0,5 % m/v'], '5 g / 100 mL · 100.'),
          N('¿Cuántos gramos de NaOH (masa molar 40 g/mol) se necesitan para preparar 1 L de disolución 0,5 M?', 20, 'g', '0,5 mol · 40 g/mol.'),
          T('En el % m/m, la masa de la disolución es la suma de las masas de soluto y solvente.', true, 'Ese es el denominador.'),
          M('El suero fisiológico tiene 0,9 % m/v de NaCl. ¿Cuántos gramos de NaCl hay en 1 L?', ['9 g', '0,9 g', '90 g', '0,09 g'], '0,9 g por cada 100 mL → 9 g en 1.000 mL.'),
          M('Para preparar una disolución de concentración exacta, el soluto disuelto se completa con agua hasta la marca de un:', ['Matraz de aforo', 'Mechero', 'Embudo de decantación', 'Termómetro'], 'El matraz de aforo mide con precisión el volumen final de disolución.'),
        ],
      },
      {
        n: 'Dilución y propiedades coligativas', ic: 'replay', items: [
          { t: 'info', ic: 'replay', title: 'Dilución y coligativas', txt: 'Al diluir, los **moles de soluto se conservan**: C₁ · V₁ = C₂ · V₂. Las propiedades **coligativas** dependen del **número de partículas** de soluto: suben el punto de ebullición, bajan el de congelación y generan presión osmótica.' },
          M('Se diluyen 100 mL de una disolución 2 M hasta 400 mL. ¿Cuál es la nueva concentración?', ['0,5 M', '8 M', '2 M', '1 M'], '2 · 100 = C₂ · 400.'),
          M('Al diluir una disolución, ¿qué se mantiene constante?', ['Los moles de soluto', 'La concentración', 'El volumen', 'La densidad'], 'Solo se agrega solvente.'),
          M('¿Cuánta agua hay que agregar a 50 mL de una disolución 6 M para que quede 2 M?', ['100 mL', '150 mL', '50 mL', '300 mL'], 'El volumen final debe ser 6 · 50 / 2 = 150 mL: se agregan 100 mL.'),
          M('En lugares con nieve, se echa sal en las calles congeladas porque:', ['La sal disminuye el punto de congelación del agua', 'La sal aumenta la temperatura del aire', 'La sal absorbe el hielo', 'La sal es caliente'], 'El agua salada se congela a menos de 0 °C.'),
          M('El agua con sal hierve a una temperatura:', ['Mayor que la del agua pura', 'Menor que la del agua pura', 'Igual que la del agua pura', 'De 0 °C'], 'Aumento ebulloscópico.'),
          M('Las propiedades coligativas dependen de:', ['La cantidad de partículas de soluto, no de su tipo', 'El color del soluto', 'Solo el tipo de soluto', 'La forma del recipiente'], 'Por eso se llaman coligativas ("en conjunto").'),
          M('Si se pone una célula en agua con mucha sal, la célula:', ['Pierde agua por osmosis y se arruga', 'Gana agua y se hincha', 'No cambia', 'Se divide'], 'El agua pasa hacia donde hay más concentración de soluto.'),
          T('El anticongelante en el radiador de un auto baja el punto de congelación del agua.', true, 'Es una propiedad coligativa.'),
        ],
      },
    ],
  });

  // ---------- Química orgánica ----------
  RB.unit('qf', {
    name: 'Química orgánica', desc: 'El carbono, hidrocarburos, nomenclatura, grupos funcionales e isomería.', ic: 'leaf', vid: 'v-qf', area: 'Química orgánica',
    lessons: [
      {
        n: 'Carbono e hidrocarburos', ic: 'leaf', items: [
          { t: 'info', ic: 'leaf', title: 'Hidrocarburos', txt: 'El carbono forma **4 enlaces** y largas cadenas. **Alcanos** (-ano): solo enlaces simples, CₙH₂ₙ₊₂. **Alquenos** (-eno): un enlace doble. **Alquinos** (-ino): un enlace triple. **Aromáticos**: anillo de benceno.' },
          M('El carbono puede formar:', ['4 enlaces covalentes', '2 enlaces', '1 enlace iónico', '8 enlaces'], 'Tiene 4 electrones de valencia: es tetravalente.'),
          M('El CH₄ se llama:', ['Metano', 'Etano', 'Metino', 'Propano'], 'Un carbono: prefijo met-.'),
          M('El hidrocarburo de 3 carbonos con solo enlaces simples es:', ['Propano', 'Propeno', 'Butano', 'Etano'], 'Prop- (3) + -ano (simples).'),
          M('Un alqueno se caracteriza por tener:', ['Al menos un enlace doble entre carbonos', 'Solo enlaces simples', 'Un enlace triple', 'Siempre un anillo de benceno'], 'Terminación -eno.'),
          M('La fórmula general de los alcanos es:', ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙHₙ'], 'Por ejemplo, el propano: C₃H₈.'),
          M('¿Cuál es la fórmula del etano?', ['C₂H₆', 'C₂H₄', 'C₂H₂', 'CH₄'], 'n = 2 → C₂H₆.'),
          M('El etino (acetileno), usado en soldaduras, tiene:', ['Un enlace triple', 'Un enlace doble', 'Solo enlaces simples', 'Un anillo'], 'Terminación -ino.'),
          P('Une cada prefijo con su número de carbonos', [['Met-', '1'], ['Et-', '2'], ['Prop-', '3'], ['But-', '4'], ['Pent-', '5']], 'Después vienen hex- (6), hept- (7) y oct- (8).'),
          T('El petróleo y el gas natural son mezclas formadas principalmente por hidrocarburos.', true, 'Por ejemplo, metano, propano, butano y octano.'),
          M('El benceno (C₆H₆) es un hidrocarburo:', ['Aromático', 'Alcano', 'Alquino lineal', 'Inorgánico'], 'Tiene un anillo de 6 carbonos.'),
        ],
      },
      {
        n: 'Grupos funcionales', ic: 'grid', items: [
          { t: 'info', ic: 'grid', title: 'Grupos funcionales', txt: 'Son grupos de átomos que dan propiedades características: alcohol –OH, aldehído –CHO, cetona C=O entre carbonos, ácido carboxílico –COOH, éster –COO–, amina –NH₂, éter –O–.' },
          P('Une cada grupo funcional con su nombre', [['–OH', 'Alcohol'], ['–COOH', 'Ácido carboxílico'], ['–CHO', 'Aldehído'], ['C=O entre dos carbonos', 'Cetona'], ['–NH₂', 'Amina']], 'Reconocerlos es clave para nombrar compuestos.'),
          M('El etanol (CH₃–CH₂–OH) es un:', ['Alcohol', 'Ácido', 'Aldehído', 'Éter'], 'Tiene el grupo –OH.'),
          M('El ácido acético (CH₃COOH), presente en el vinagre, tiene el grupo:', ['Carboxilo', 'Hidroxilo', 'Amino', 'Carbonilo de cetona'], '–COOH es el grupo carboxilo.'),
          M('La acetona (CH₃–CO–CH₃), usada como quitaesmalte, es una:', ['Cetona', 'Amina', 'Alcohol', 'Éster'], 'El C=O está entre dos carbonos.'),
          M('Los ésteres, que dan aroma a muchas frutas, se forman al reaccionar:', ['Un ácido carboxílico con un alcohol', 'Dos alcanos', 'Un metal con agua', 'Un gas noble con oxígeno'], 'Es la reacción de esterificación.'),
          M('El grupo –NH₂ es característico de:', ['Las aminas', 'Los alcoholes', 'Las cetonas', 'Los aldehídos'], 'También aparece en los aminoácidos.'),
          T('El metanol y el etanol pertenecen a la misma función química.', true, 'Ambos son alcoholes.'),
          M('El metanal (formaldehído), HCHO, es un:', ['Aldehído', 'Alcohol', 'Ácido', 'Alcano'], 'Terminación -al.'),
        ],
      },
      {
        n: 'Isomería y nomenclatura', ic: 'replay', items: [
          { t: 'info', ic: 'replay', title: 'Isómeros', txt: 'Compuestos con la **misma fórmula molecular** pero **distinta estructura**. Pueden ser de **cadena** (forma de la cadena), de **posición** (dónde está el grupo o el enlace) o de **función** (distinto grupo funcional).' },
          M('El butano y el metilpropano, ambos C₄H₁₀, son:', ['Isómeros de cadena', 'La misma sustancia', 'Alquenos', 'Isótopos'], 'Uno es lineal y el otro ramificado.'),
          M('El etanol (CH₃CH₂OH) y el dimetiléter (CH₃OCH₃) son isómeros de:', ['Función', 'Cadena', 'Posición', 'Ninguno: no son isómeros'], 'Ambos son C₂H₆O, pero uno es alcohol y el otro éter.'),
          M('El 1-buteno y el 2-buteno son isómeros de:', ['Posición', 'Función', 'Cadena', 'Isótopos'], 'Cambia la posición del enlace doble.'),
          M('¿Cuál es el nombre de CH₃–CH=CH₂?', ['Propeno', 'Propano', 'Propino', 'Etileno'], '3 carbonos y un enlace doble.'),
          M('¿Cuántos carbonos tiene el 2-metilbutano?', ['5', '4', '2', '6'], 'Cadena de 4 (butano) + 1 metilo.'),
          T('Dos isómeros tienen la misma fórmula molecular, pero pueden tener propiedades distintas.', true, 'Por ejemplo, distintos puntos de ebullición.'),
          M('Un carbono unido a otros tres carbonos se llama:', ['Terciario', 'Primario', 'Secundario', 'Cuaternario'], 'Primario: 1 carbono vecino; secundario: 2; terciario: 3; cuaternario: 4.'),
          M('El polietileno de las bolsas plásticas es:', ['Un polímero formado por muchas moléculas de eteno', 'Un alcano de 2 carbonos', 'Un isótopo del carbono', 'Un compuesto iónico'], 'Los polímeros son cadenas larguísimas de unidades repetidas (monómeros).'),
        ],
      },
    ],
  });

  // ---------- Ácidos, bases y redox ----------
  RB.unit('qg', {
    name: 'Ácidos, bases y redox', desc: 'Teorías ácido-base, escala de pH, neutralización, oxidación, reducción y estados de oxidación.', ic: 'flask', vid: 'v-qg', area: 'Reacciones',
    lessons: [
      {
        n: 'Ácidos, bases y pH', ic: 'flask', items: [
          { t: 'info', ic: 'flask', title: 'pH', txt: '**Arrhenius**: el ácido libera H⁺ y la base, OH⁻. **Brønsted-Lowry**: el ácido dona H⁺ y la base lo acepta. **pH = −log[H⁺]**: menor que 7 es ácido, 7 es neutro y mayor que 7 es básico.' },
          M('Según Arrhenius, un ácido es una sustancia que en agua libera:', ['Iones H⁺', 'Iones OH⁻', 'Electrones', 'Neutrones'], 'Las bases liberan OH⁻.'),
          M('Una disolución con pH 3 es:', ['Ácida', 'Básica', 'Neutra', 'Imposible'], 'pH menor que 7.'),
          M('El agua pura a 25 °C tiene pH:', ['7', '0', '14', '1'], 'Es neutra.'),
          S('Clasifica cada sustancia', ['Ácida', 'Básica'], [['Jugo de limón', 0], ['Vinagre', 0], ['Jabón', 1], ['Cloro doméstico', 1], ['Bebida cola', 0], ['Leche de magnesia', 1]], 'Los ácidos son agrios; las bases, jabonosas.'),
          M('Una disolución con [H⁺] = 10⁻⁴ M tiene pH:', ['4', '−4', '10', '0,0001'], 'pH = −log 10⁻⁴.'),
          M('Si el pH de una disolución baja de 5 a 3, su acidez:', ['Aumenta 100 veces', 'Aumenta 2 veces', 'Disminuye', 'No cambia'], 'Cada unidad de pH es un factor 10: 10² = 100.'),
          M('La reacción entre un ácido y una base se llama:', ['Neutralización', 'Combustión', 'Oxidación', 'Fusión'], 'Forma sal y agua.'),
          M('En HCl + NaOH → NaCl + H₂O, los productos son:', ['Una sal y agua', 'Un ácido y una base', 'Dos gases', 'Un metal y oxígeno'], 'Es una neutralización.'),
          M('Según Brønsted-Lowry, una base es una sustancia que:', ['Acepta protones (H⁺)', 'Dona protones', 'Libera electrones', 'Libera O₂'], 'El NH₃ es base porque acepta un H⁺.'),
          T('Un indicador, como el papel tornasol, cambia de color según el pH.', true, 'El tornasol se pone rojo en ácido y azul en base.'),
          M('La fenolftaleína se pone fucsia en una disolución:', ['Básica', 'Ácida', 'Neutra', 'De cualquier pH'], 'Es incolora en medio ácido o neutro.'),
          M('La lluvia ácida se produce principalmente por:', ['Óxidos de azufre y nitrógeno que reaccionan con el agua de la atmósfera', 'El exceso de oxígeno', 'La sal del mar', 'El ozono de la estratosfera'], 'Vienen de la quema de combustibles fósiles.'),
        ],
      },
      {
        n: 'Óxido-reducción', ic: 'bolt', items: [
          { t: 'info', ic: 'bolt', title: 'Redox', txt: '**Oxidación**: pérdida de electrones (el estado de oxidación sube). **Reducción**: ganancia de electrones (baja). El agente **oxidante se reduce** y el agente **reductor se oxida**.' },
          M('En una oxidación, un átomo:', ['Pierde electrones', 'Gana electrones', 'Gana protones', 'Pierde neutrones'], 'Truco: "OIL RIG" u "oxidar es perder".'),
          M('En Zn + Cu²⁺ → Zn²⁺ + Cu, ¿qué especie se oxida?', ['El Zn', 'El Cu²⁺', 'El Cu', 'Ninguna'], 'El Zn pasa de 0 a +2: pierde 2 electrones.'),
          M('En esa misma reacción, el agente oxidante es:', ['El Cu²⁺', 'El Zn', 'El Zn²⁺', 'El Cu'], 'El Cu²⁺ se reduce (gana electrones) y así oxida al Zn.'),
          M('¿Cuál es el estado de oxidación del oxígeno en la mayoría de sus compuestos?', ['−2', '+2', '0', '−1'], 'Excepciones: peróxidos (−1).'),
          M('El estado de oxidación de un elemento libre, como O₂ o Fe, es:', ['0', '+1', '−1', '+2'], 'No ha ganado ni perdido electrones.'),
          M('¿Cuál es el estado de oxidación del azufre en H₂SO₄?', ['+6', '+4', '−2', '+2'], '2(+1) + S + 4(−2) = 0 → S = +6.'),
          M('La corrosión del hierro (formación de óxido) es un proceso de:', ['Oxidación', 'Neutralización', 'Disolución', 'Fusión'], 'El hierro pierde electrones frente al oxígeno.'),
          T('En una reacción redox, la oxidación y la reducción ocurren al mismo tiempo.', true, 'Los electrones que uno pierde, otro los gana.'),
          M('Una pila produce electricidad gracias a:', ['Una reacción redox espontánea', 'Una neutralización', 'Un cambio de estado', 'La fricción'], 'Los electrones viajan por el circuito del que se oxida al que se reduce.'),
        ],
      },
    ],
  });

  // ---------- Videos ----------
  RB.video('v-qe', {
    u: 'qe', title: 'Disoluciones', desc: 'Soluto y solvente, solubilidad, % m/m, % m/v, molaridad, dilución y propiedades coligativas.',
    sc: [
      { h: 'Disoluciones', sub: 'Mezclas que se ven como una sola sustancia', b: [{ tags: ['Soluto', 'Solvente', 'Solubilidad', '% m/m', 'Molaridad', 'Dilución', 'Coligativas'] }],
        s: ['Hola. El agua con sal, el suero fisiológico, el aire y hasta el acero son disoluciones.', 'En este video veremos qué es una disolución, de qué depende la solubilidad, cómo se mide la concentración, cómo diluir, y las propiedades coligativas, que explican por qué se echa sal en el hielo.'] },
      { h: 'Soluto y solvente', ic: 'flask', b: [{ two: [['Soluto', 'Lo que se disuelve', 'Menor cantidad · ej.: la sal'], ['Solvente', 'Lo que disuelve', 'Mayor cantidad · ej.: el agua']] }, { tip: 'Una disolución es una mezcla **homogénea**: no se distinguen sus componentes.' }],
        s: ['Una disolución tiene dos partes.', 'El soluto es lo que se disuelve, y está en menor cantidad, como la sal. El solvente es lo que disuelve, y está en mayor cantidad, como el agua.', 'Y es una mezcla homogénea: a simple vista no se distinguen sus componentes. El agua con arena, en cambio, es heterogénea.'] },
      { h: 'Solubilidad', ic: 'chart', b: [{ two: [['Sólidos en agua', 'Más temperatura → **más** solubles', 'Azúcar en té caliente'], ['Gases en agua', 'Más temperatura → **menos** solubles', 'Bebida caliente pierde el gas']] }, { two: [['Insaturada', 'Admite más soluto'], ['Saturada', 'Ya no admite más a esa temperatura']] }],
        s: ['La solubilidad es la cantidad máxima de soluto que se puede disolver.', 'Para la mayoría de los sólidos, aumenta con la temperatura: el azúcar se disuelve mejor en té caliente. Para los gases es al revés: una bebida caliente pierde el gas más rápido.', 'Si una disolución todavía admite más soluto, está insaturada. Si ya tiene el máximo, está saturada, y lo que agregues quedará sin disolver.'] },
      { h: 'Concentración en porcentaje', ic: 'calc', b: [{ eq: '% m/m = g de soluto / g de disolución · 100' }, { eq: '20 g de azúcar en 180 g de agua  →  20 / 200 · 100 = 10 %' }, { warn: 'El denominador es la **disolución** (soluto + solvente), no solo el agua.' }, { eq: '% m/v = g de soluto / mL de disolución · 100  →  suero 0,9 %: 9 g por litro' }],
        s: ['La concentración dice cuánto soluto hay en cierta cantidad de disolución.', 'El porcentaje masa masa es la masa de soluto dividida por la masa de la disolución, por cien.', 'Si disuelves veinte gramos de azúcar en ciento ochenta de agua, la disolución pesa doscientos gramos, y la concentración es diez por ciento.', 'Ojo con la trampa: el denominador es la disolución completa, soluto más solvente. Si divides solo por el agua, obtienes once coma uno por ciento, que está mal.', 'El porcentaje masa volumen usa los mililitros de disolución. El suero fisiológico tiene cero coma nueve por ciento de sal: nueve gramos por litro.'] },
      { h: 'Molaridad', ic: 'target', b: [{ eq: 'M = moles de soluto / litros de disolución' }, { eq: '2 mol de NaCl en 4 L  →  0,5 M' }, { eq: '250 mL de una disolución 2 M  →  2 · 0,25 = 0,5 mol' }, { q: '¿Cuántos gramos de NaOH (40 g/mol) hay que pesar para 1 L de disolución 0,5 M?', o: ['20 g', '40 g', '0,5 g', '80 g'], e: '0,5 mol · 40 g/mol = 20 g.' }],
        s: ['La unidad más usada en química es la molaridad.', 'Es la cantidad de moles de soluto por cada litro de disolución.', 'Dos moles de sal en cuatro litros de disolución dan cero coma cinco molar.', 'Y si tienes doscientos cincuenta mililitros de una disolución dos molar, multiplicas dos por cero coma veinticinco litros: cero coma cinco moles. Recuerda pasar los mililitros a litros.', 'Calcula tú.'] },
      { h: 'Preparar una disolución', ic: 'list', b: [{ tl: '1', t: 'Calcular y **pesar** el soluto' }, { tl: '2', t: '**Disolver** en un poco de agua' }, { tl: '3', t: 'Traspasar a un **matraz de aforo** y completar con agua hasta la marca' }, { tip: 'Por eso la molaridad usa los litros de **disolución**, no los litros de agua agregados.' }],
        s: ['¿Cómo se prepara en el laboratorio una disolución de concentración exacta?', 'Primero se calcula y se pesa la masa de soluto necesaria.', 'Luego se disuelve en un poco de agua.', 'Y después se traspasa a un matraz de aforo, que tiene una marca, y se completa con agua hasta esa marca.', 'Por eso la molaridad se calcula con el volumen final de disolución, y no con la cantidad de agua que agregaste.'] },
      { h: 'Dilución', ic: 'replay', b: [{ eq: 'C₁ · V₁ = C₂ · V₂', n: 'Los moles de soluto no cambian: solo se agrega agua' }, { eq: '100 mL de 2 M llevados a 400 mL  →  C₂ = 2 · 100 / 400 = 0,5 M' }, { warn: 'Si preguntan **cuánta agua agregar**, resta el volumen inicial: de 50 mL a 150 mL se agregan **100 mL**.' }],
        s: ['Diluir es agregar solvente para bajar la concentración.', 'Como el soluto no cambia, la concentración por el volumen se conserva: ce uno por ve uno es igual a ce dos por ve dos.', 'Si llevas cien mililitros de una disolución dos molar hasta cuatrocientos mililitros, la nueva concentración es cero coma cinco molar.', 'Cuidado con la pregunta: si te piden cuánta agua agregar, no es el volumen final. Si de cincuenta mililitros llegas a ciento cincuenta, agregaste cien.'] },
      { h: 'Propiedades coligativas', ic: 'snow', b: [{ two: [['Punto de ebullición', 'Sube: el agua con sal hierve sobre 100 °C'], ['Punto de congelación', 'Baja: sal en calles con hielo, anticongelante']] }, { two: [['Presión osmótica', 'El agua pasa hacia donde hay más soluto'], ['Dependen de', 'La **cantidad** de partículas, no del tipo']] }, { q: 'Si pones un glóbulo rojo en agua muy salada, ¿qué le pasa?', o: ['Pierde agua y se arruga', 'Gana agua y se hincha', 'No cambia', 'Se divide'], e: 'Por osmosis, el agua sale de la célula hacia el medio más concentrado.' }],
        s: ['Las propiedades coligativas son cambios que produce el soluto en el solvente.', 'El agua con sal hierve a más de cien grados, y se congela a menos de cero. Por eso en los lugares con nieve se echa sal en las calles, y los autos usan anticongelante.', 'La presión osmótica explica que el agua pase a través de una membrana hacia donde hay más soluto. Y lo importante: estas propiedades dependen de cuántas partículas de soluto hay, no de qué soluto sea.', 'Aplícalo a una célula.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Soluto en menor cantidad', 'Gases: menos solubles con calor', '% m/m: dividir por la disolución', 'M = mol / L', 'C₁V₁ = C₂V₂', 'Coligativas: n° de partículas'] }],
        s: ['Resumen: el soluto se disuelve en el solvente, y los gases son menos solubles en caliente.', 'En el porcentaje masa masa se divide por la masa de la disolución, la molaridad son moles por litro, al diluir se conserva ce por ve, y las coligativas dependen del número de partículas. ¡A practicar!'] },
    ],
  });

  RB.video('v-qf', {
    u: 'qf', title: 'Química orgánica', desc: 'El carbono, alcanos, alquenos y alquinos, nomenclatura, grupos funcionales e isomería.',
    sc: [
      { h: 'Química orgánica', sub: 'La química del carbono', b: [{ tags: ['Carbono', 'Alcanos', 'Alquenos', 'Alquinos', 'Nomenclatura', 'Grupos funcionales', 'Isomería'] }],
        s: ['Hola. La química orgánica es la química de los compuestos del carbono: el gas de la cocina, la bencina, el alcohol, el vinagre, los plásticos y las moléculas de tu cuerpo.', 'En este video veremos por qué el carbono es tan especial, cómo se nombran los hidrocarburos, los grupos funcionales y los isómeros.'] },
      { h: '¿Por qué el carbono?', ic: 'leaf', b: [{ big: '4', sub: 'enlaces covalentes por carbono (tetravalente)' }, 'Forma **cadenas** largas, ramificadas y **anillos**', { two: [['Enlaces', 'Simples, dobles o triples'], ['Resultado', 'Millones de compuestos distintos']] }],
        s: ['El carbono es especial por dos razones.', 'Primero, tiene cuatro electrones de valencia, así que forma cuatro enlaces covalentes.', 'Segundo, puede unirse a otros carbonos formando cadenas larguísimas, ramificadas o cerradas en anillos.', 'Además, entre carbonos puede haber enlaces simples, dobles o triples. Con esas combinaciones existen millones de compuestos orgánicos distintos.'] },
      { h: 'Hidrocarburos', ic: 'flame', b: [{ two: [['Alcanos', 'Solo enlaces simples · -ano', 'CₙH₂ₙ₊₂ · metano CH₄'], ['Alquenos', 'Un enlace doble · -eno', 'eteno C₂H₄']] }, { two: [['Alquinos', 'Un enlace triple · -ino', 'etino C₂H₂'], ['Aromáticos', 'Anillo de benceno', 'C₆H₆']] }, { tip: 'Petróleo y gas natural son mezclas de hidrocarburos.' }],
        s: ['Los hidrocarburos tienen solo carbono e hidrógeno.', 'Los alcanos tienen solo enlaces simples y terminan en ano, como el metano. Su fórmula general es C ene H dos ene más dos. Los alquenos tienen un enlace doble y terminan en eno, como el eteno.', 'Los alquinos tienen un enlace triple y terminan en ino, como el etino o acetileno, que se usa para soldar. Y los aromáticos tienen el anillo de benceno.', 'El petróleo y el gas natural son mezclas de hidrocarburos.'] },
      { h: 'Nombrar por el número de carbonos', ic: 'list', b: [{ tl: '1 · Met-', t: 'Metano CH₄: gas natural' }, { tl: '2 · Et-', t: 'Etano C₂H₆' }, { tl: '3 · Prop-', t: 'Propano C₃H₈: gas de cilindro' }, { tl: '4 · But-', t: 'Butano C₄H₁₀: encendedores' }, { tl: '5 · Pent-', t: 'Pentano · luego hex-, hept-, oct-' }],
        s: ['Para nombrar, el prefijo indica la cantidad de carbonos de la cadena principal.', 'Un carbono es met: metano, el gas natural.', 'Dos es et: etano.', 'Tres es prop: propano, el gas de los cilindros.', 'Cuatro es but: butano, el de los encendedores.', 'Cinco es pent, y luego siguen hex, hept y oct. Si hay ramificaciones, se indican con un número y el nombre del grupo: el dos metilbutano tiene un metilo en el carbono dos de una cadena de cuatro, cinco carbonos en total.'] },
      { h: 'Grupos funcionales', ic: 'grid', b: [{ two: [['Alcohol –OH', 'Etanol'], ['Ácido carboxílico –COOH', 'Ácido acético (vinagre)']] }, { two: [['Cetona C=O', 'Acetona (quitaesmalte)'], ['Aldehído –CHO', 'Metanal (formaldehído)']] }, { two: [['Amina –NH₂', 'Base de los aminoácidos'], ['Éster –COO–', 'Aromas de frutas: ácido + alcohol']] }, { q: '¿Qué grupo funcional tiene el etanol, CH₃–CH₂–OH?', o: ['Alcohol', 'Cetona', 'Ácido carboxílico', 'Amina'], e: 'El grupo –OH es el hidroxilo, característico de los alcoholes.' }],
        s: ['Los grupos funcionales son conjuntos de átomos que le dan propiedades especiales a una molécula.', 'El alcohol tiene el grupo O H, como el etanol. El ácido carboxílico tiene C O O H, como el ácido acético del vinagre.', 'La cetona tiene un carbono con doble enlace a oxígeno entre dos carbonos, como la acetona. El aldehído tiene ese grupo al final de la cadena.', 'Las aminas tienen N H dos, y forman parte de los aminoácidos. Y los ésteres, que dan aroma a las frutas, se forman al reaccionar un ácido con un alcohol.', 'Identifica este.'] },
      { h: 'Isomería', ic: 'replay', b: [{ eq: 'Misma fórmula molecular, distinta estructura' }, { two: [['De cadena', 'Butano vs. metilpropano (C₄H₁₀)'], ['De posición', '1-buteno vs. 2-buteno']] }, { two: [['De función', 'Etanol vs. dimetiléter (C₂H₆O)'], ['Ojo', 'Isómero ≠ isótopo']] }, { q: 'El 1-buteno y el 2-buteno solo difieren en dónde está el enlace doble. ¿Qué tipo de isómeros son?', o: ['De posición', 'De función', 'De cadena', 'Isótopos'], e: 'Tienen la misma cadena y el mismo grupo; solo cambia la posición del enlace doble.' }],
        s: ['Los isómeros son compuestos con la misma fórmula molecular, pero distinta estructura, y por eso pueden tener propiedades diferentes.', 'Son isómeros de cadena si cambia la forma de la cadena: el butano es lineal y el metilpropano es ramificado.', 'Son de posición si cambia el lugar de un enlace o un grupo: uno buteno y dos buteno.', 'Y son de función si cambia el grupo funcional: el etanol es un alcohol y el dimetiléter es un éter, aunque ambos son C dos H seis O. No confundas isómeros con isótopos, que es un concepto del átomo.', 'A ver si los distingues.'] },
      { h: 'Orgánica en la vida diaria', ic: 'globe', b: [{ two: [['Combustibles', 'Gas natural, propano, bencina: alcanos'], ['Plásticos', 'Polímeros: el polietileno se forma uniendo muchas moléculas de eteno']] }, { two: [['Biomoléculas', 'Glucosa, aminoácidos, lípidos: compuestos orgánicos'], ['Combustión', 'CH₄ + 2 O₂ → CO₂ + 2 H₂O + energía']] }, { q: '¿Qué es un polímero, como el polietileno?', o: ['Una molécula gigante formada por muchas unidades repetidas', 'Un isótopo del carbono', 'Un tipo de enlace iónico', 'Un gas noble'], e: 'Se forma uniendo muchos monómeros, como el eteno, en una cadena larguísima.' }],
        s: ['La química orgánica está en todo lo que usamos.', 'Los combustibles, como el gas natural, el propano y la bencina, son principalmente alcanos. Los plásticos son polímeros: moléculas gigantes formadas por muchas unidades repetidas. El polietileno de las bolsas se forma uniendo miles de moléculas de eteno.', 'Las moléculas de la vida, como la glucosa, los aminoácidos y los lípidos, también son compuestos orgánicos. Y cuando quemamos un hidrocarburo, como el metano, se forman dióxido de carbono, agua y energía.', 'Una pregunta para cerrar.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Carbono: 4 enlaces', '-ano, -eno, -ino', 'Met, et, prop, but, pent', '–OH alcohol', '–COOH ácido', 'Isómeros: misma fórmula'] }],
        s: ['Resumen: el carbono forma cuatro enlaces y cadenas. Los alcanos terminan en ano, los alquenos en eno y los alquinos en ino, y el prefijo indica el número de carbonos.', 'Reconoce los grupos funcionales, como el alcohol y el ácido carboxílico, y recuerda que los isómeros comparten fórmula pero no estructura. ¡A practicar!'] },
    ],
  });

  RB.video('v-qg', {
    u: 'qg', title: 'Ácidos, bases y redox', desc: 'Teorías ácido-base, pH, neutralización, oxidación, reducción y estados de oxidación.',
    sc: [
      { h: 'Ácidos, bases y redox', sub: 'Protones y electrones que cambian de dueño', b: [{ tags: ['Arrhenius', 'Brønsted-Lowry', 'pH', 'Neutralización', 'Oxidación', 'Reducción'] }],
        s: ['Hola. En este video veremos dos grandes tipos de reacciones: las ácido-base, donde se transfieren protones, y las de óxido-reducción, donde se transfieren electrones.', 'Están en todas partes: en el limón, en el jabón, en la lluvia ácida, en el óxido de un clavo y en las pilas.'] },
      { h: 'Qué es un ácido y una base', ic: 'flask', b: [{ two: [['Arrhenius', 'Ácido: libera H⁺ en agua', 'Base: libera OH⁻'], ['Brønsted-Lowry', 'Ácido: dona H⁺', 'Base: acepta H⁺']] }, { two: [['Ácidos', 'Limón, vinagre, bebida cola'], ['Bases', 'Jabón, cloro, leche de magnesia']] }],
        s: ['Hay dos teorías que debes conocer.', 'Según Arrhenius, un ácido libera iones hidrógeno en agua, y una base libera iones hidróxido. Según Brønsted y Lowry, un ácido es quien dona un protón, y una base es quien lo acepta. Esta segunda es más general: el amoníaco es una base porque acepta un protón, aunque no tenga hidróxido.', 'En la vida diaria, el limón, el vinagre y las bebidas cola son ácidos; el jabón, el cloro doméstico y la leche de magnesia son básicos.'] },
      { h: 'La escala de pH', ic: 'chart', b: [{ bars: [['Limón', 2], ['Bebida cola', 3], ['Agua pura', 7], ['Agua de mar', 8], ['Jabón', 10], ['Cloro', 12]] }, { eq: 'pH = −log[H⁺]  →  [H⁺] = 10⁻⁴ M  ⟹  pH 4' }, { warn: 'Cada unidad de pH es un factor **10**: de pH 5 a pH 3, la acidez aumenta **100 veces**.' }],
        s: ['La acidez se mide con la escala de pH, que va de cero a catorce.', 'Menos de siete es ácido, siete es neutro, como el agua pura, y más de siete es básico. El limón tiene un pH cercano a dos, y el cloro cercano a doce.', 'El pH es menos el logaritmo de la concentración de iones hidrógeno. Si esa concentración es diez a la menos cuatro, el pH es cuatro.', 'Y como es una escala logarítmica, cada unidad significa diez veces más. Si el pH baja de cinco a tres, la acidez aumenta cien veces, no dos.'] },
      { h: 'Neutralización', ic: 'scale', b: [{ eq: 'Ácido + base → sal + agua' }, { eq: 'HCl + NaOH → NaCl + H₂O' }, { tip: 'Los antiácidos neutralizan el exceso de ácido del estómago.' }, { q: 'Una disolución tiene pH 3. ¿Cómo es?', o: ['Ácida', 'Básica', 'Neutra', 'No se puede saber'], e: 'Todo pH menor que 7 es ácido.' }],
        s: ['Cuando un ácido reacciona con una base, se neutralizan.', 'El resultado es una sal y agua.', 'Por ejemplo, el ácido clorhídrico con el hidróxido de sodio forma cloruro de sodio, la sal de mesa, y agua.', 'Así funcionan los antiácidos: neutralizan el exceso de ácido del estómago.', 'Pregunta rápida.'] },
      { h: 'Indicadores', ic: 'eye', b: [{ two: [['Papel tornasol', 'Rojo en ácido · azul en base'], ['Fenolftaleína', 'Incolora en ácido · fucsia en base']] }, { ex: 'El jugo de **repollo morado** es un indicador casero: cambia de color según el pH.' }, { q: 'Un papel tornasol se pone azul al mojarlo en una disolución. ¿Cómo es la disolución?', o: ['Básica', 'Ácida', 'Neutra', 'Salada'], e: 'El tornasol se vuelve azul en medio básico y rojo en medio ácido.' }],
        s: ['¿Cómo sabemos si algo es ácido o básico sin un medidor? Con indicadores.', 'Un indicador es una sustancia que cambia de color según el pH. El papel tornasol se pone rojo en ácido y azul en base. La fenolftaleína es incolora en ácido y se vuelve fucsia en base.', 'Incluso hay indicadores caseros: el jugo de repollo morado cambia de color según el pH, del rojo al verde.', 'Responde.'] },
      { h: 'Oxidación y reducción', ic: 'bolt', b: [{ two: [['Oxidación', 'Pierde electrones', 'Su estado de oxidación sube'], ['Reducción', 'Gana electrones', 'Su estado de oxidación baja']] }, { eq: 'Zn + Cu²⁺ → Zn²⁺ + Cu', n: 'El Zn se oxida (0 → +2) · el Cu²⁺ se reduce (+2 → 0)' }, { two: [['Agente reductor', 'El que se oxida: Zn'], ['Agente oxidante', 'El que se reduce: Cu²⁺']] }],
        s: ['Pasemos a las reacciones redox.', 'Oxidarse es perder electrones, y reducirse es ganarlos. Siempre ocurren juntas: los electrones que uno pierde, otro los gana.', 'En la reacción del zinc con el ion cobre dos más, el zinc pierde dos electrones y se oxida, y el cobre los gana y se reduce.', 'Los nombres de los agentes confunden, así que atención: el agente reductor es el que se oxida, porque provoca la reducción del otro. Y el agente oxidante es el que se reduce.'] },
      { h: 'Estados de oxidación', ic: 'calc', b: [{ two: [['Elemento libre', '0 (O₂, Fe, Zn)'], ['Oxígeno', '−2 · hidrógeno: +1']] }, { eq: 'H₂SO₄: 2(+1) + S + 4(−2) = 0  →  S = +6' }, { q: '¿Cuál es el estado de oxidación del carbono en el CO₂?', o: ['+4', '−4', '+2', '0'], e: 'C + 2(−2) = 0, así que C = +4.' }],
        s: ['Para saber quién se oxida, se usan los estados de oxidación.', 'Un elemento libre tiene estado cero. El oxígeno suele tener menos dos y el hidrógeno, más uno.', 'Y la suma en un compuesto neutro es cero. En el ácido sulfúrico: dos hidrógenos dan más dos, cuatro oxígenos dan menos ocho, así que el azufre debe ser más seis.', 'Calcula este.'] },
      { h: 'Redox en la vida diaria', ic: 'globe', b: [{ two: [['Corrosión', 'El hierro se oxida y se forma óxido'], ['Pilas y baterías', 'Una redox espontánea produce corriente']] }, { two: [['Combustión', 'El combustible se oxida con O₂'], ['Lluvia ácida', 'Óxidos de azufre y nitrógeno + agua']] }],
        s: ['Las reacciones redox están en todas partes.', 'La corrosión es la oxidación del hierro frente al oxígeno y la humedad. Las pilas y baterías producen electricidad gracias a una reacción redox espontánea, en la que los electrones viajan por el circuito.', 'La combustión también es una redox: el combustible se oxida con el oxígeno. Y la lluvia ácida se forma cuando los óxidos de azufre y nitrógeno, que salen de quemar combustibles, reaccionan con el agua de la atmósfera.'] },
      { h: 'Para recordar', ic: 'star', k: 'title', b: [{ tags: ['Ácido: dona H⁺', 'Base: acepta H⁺', 'pH < 7 ácido', '1 unidad = ×10', 'Ácido + base → sal + agua', 'Oxidar = perder e⁻', 'Oxidante se reduce'] }],
        s: ['Resumen: un ácido dona protones y una base los acepta. Un pH menor que siete es ácido, y cada unidad equivale a un factor diez. Ácido más base da sal y agua.', 'Oxidarse es perder electrones, reducirse es ganarlos, y el agente oxidante es el que se reduce. ¡A practicar!'] },
    ],
  });
})();
