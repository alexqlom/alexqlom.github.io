// Química (3): disoluciones; química orgánica; ácidos, bases y óxido-reducción.
(function () {
  const RB = window.RB, { M, T, F, P, S, O, N } = RB.Q;

  // ---------- Disoluciones ----------
  RB.unit('qe', {
    name: 'Disoluciones', desc: 'Soluto y solvente, solubilidad, unidades de concentración, dilución y propiedades coligativas.', ic: 'flask', area: 'Disoluciones',
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
    name: 'Química orgánica', desc: 'El carbono, hidrocarburos, nomenclatura, grupos funcionales e isomería.', ic: 'leaf', area: 'Química orgánica',
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
    name: 'Ácidos, bases y redox', desc: 'Teorías ácido-base, escala de pH, neutralización, oxidación, reducción y estados de oxidación.', ic: 'flask', area: 'Reacciones',
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
})();
