// Biología (4): sistema nervioso; hormonas y homeostasis.
(function () {
  const RB = window.RB, { M, T, P, S, O } = RB.Q;

  // ---------- Sistema nervioso ----------
  RB.unit('bg', {
    name: 'Sistema nervioso', desc: 'Neurona, impulso nervioso, sinapsis, efecto de las drogas, organización del sistema nervioso, reflejos y receptores.', ic: 'brain', area: 'Cuerpo humano',
    lessons: [
      {
        n: 'Neurona e impulso nervioso', ic: 'bolt', items: [
          { t: 'info', ic: 'bolt', title: 'La neurona', txt: '**Dendritas** (reciben), **cuerpo celular** y **axón** (conduce el impulso), a menudo cubierto de **mielina**, que lo acelera. En **reposo** el interior es **negativo** (cerca de −70 mV). En el **potencial de acción** entra **Na⁺** y el interior se vuelve positivo; luego sale **K⁺** y se repolariza.' },
          P('Une cada parte de la neurona con su función', [['Dendritas', 'Reciben estímulos de otras neuronas'], ['Axón', 'Conduce el impulso hacia otras células'], ['Vaina de mielina', 'Aísla el axón y acelera el impulso'], ['Botón sináptico', 'Libera neurotransmisores']], 'El impulso va de las dendritas al cuerpo celular y luego por el axón.'),
          M('En reposo, el interior de una neurona es:', ['Negativo respecto al exterior (cerca de −70 mV)', 'Positivo respecto al exterior', 'Neutro', 'Igual al exterior en todos los iones'], 'Esa diferencia la mantiene la bomba de sodio-potasio.'),
          M('¿Qué ion entra a la neurona y genera el potencial de acción?', ['El sodio (Na⁺)', 'El potasio (K⁺)', 'El cloro (Cl⁻)', 'El hierro'], 'Al entrar el sodio, el interior se vuelve positivo: es la despolarización.'),
          M('Después del potencial de acción, la neurona se repolariza porque:', ['Salen iones K⁺', 'Entran más iones Na⁺', 'Entra agua', 'Se destruye la membrana'], 'Luego la bomba de sodio-potasio restablece las concentraciones.'),
          M('La vaina de mielina:', ['Aumenta la velocidad del impulso nervioso', 'Detiene el impulso', 'Produce neurotransmisores', 'Fabrica glóbulos blancos'], 'En la esclerosis múltiple se daña la mielina y el impulso se vuelve lento.'),
          O('Ordena el recorrido del impulso por una neurona', ['Dendritas', 'Cuerpo celular', 'Axón', 'Botón sináptico'], 'Luego se liberan neurotransmisores hacia la célula siguiente.'),
          M('El estímulo mínimo necesario para generar un potencial de acción se llama:', ['Umbral', 'Sinapsis', 'Reflejo', 'Mielina'], 'Si el estímulo no lo alcanza, no hay impulso: es la ley del todo o nada.'),
          T('Un estímulo más intenso que el umbral genera un potencial de acción de mayor voltaje.', false, 'El potencial de acción siempre tiene la misma amplitud; un estímulo más intenso genera más impulsos por segundo.'),
          M('Las neuronas que llevan información desde los receptores hacia el sistema nervioso central son:', ['Sensitivas (aferentes)', 'Motoras (eferentes)', 'Glóbulos blancos', 'Hormonas'], 'Las motoras llevan las órdenes a músculos y glándulas.'),
        ],
      },
      {
        n: 'Sinapsis y drogas', ic: 'link', items: [
          { t: 'info', ic: 'link', title: 'Sinapsis', txt: 'En la **sinapsis química**, la neurona presináptica libera **neurotransmisores** (dopamina, serotonina, acetilcolina) que se unen a **receptores** de la célula siguiente. Las **drogas** alteran la sinapsis: generan **tolerancia** (se necesita más dosis) y **dependencia**; al dejarlas aparece el **síndrome de abstinencia**.' },
          M('La sinapsis química es:', ['La comunicación entre neuronas mediante neurotransmisores', 'La unión física de dos axones', 'Una enfermedad nerviosa', 'La división de una neurona'], 'El neurotransmisor cruza el espacio sináptico y se une a receptores.'),
          M('¿Cuál de estas sustancias es un neurotransmisor?', ['La dopamina', 'La insulina', 'La hemoglobina', 'La amilasa'], 'Otros son la acetilcolina, la serotonina y la noradrenalina.'),
          T('En una sinapsis química, el impulso viaja en un solo sentido.', true, 'De la neurona que libera el neurotransmisor (presináptica) a la que tiene los receptores (postsináptica).'),
          M('La cocaína bloquea la recaptura de dopamina. Por eso:', ['La dopamina se acumula en la sinapsis y produce euforia', 'La dopamina desaparece', 'La neurona muere de inmediato', 'Disminuye la frecuencia cardíaca'], 'Esa sobreestimulación del sistema de recompensa facilita la adicción.'),
          M('Una droga genera tolerancia cuando:', ['Se necesitan dosis cada vez mayores para lograr el mismo efecto', 'Deja de hacer efecto para siempre', 'Cura enfermedades', 'No altera la sinapsis'], 'La dependencia es la necesidad de consumirla para sentirse bien.'),
          S('Clasifica cada droga según su efecto principal', ['Depresora', 'Estimulante'], [['Alcohol', 0], ['Tranquilizantes (benzodiazepinas)', 0], ['Cocaína', 1], ['Nicotina', 1], ['Cafeína', 1]], 'La marihuana suele clasificarse como perturbadora: altera la percepción.'),
          T('El alcohol es una droga depresora del sistema nervioso central.', true, 'Disminuye la actividad nerviosa: altera los reflejos, la coordinación y el juicio.'),
          M('El síndrome de abstinencia aparece cuando:', ['Una persona dependiente deja de consumir la droga', 'Se consume por primera vez', 'Se toma agua', 'Se duerme bien'], 'Produce malestar físico y psicológico.'),
          M('Las drogas actúan sobre el sistema nervioso principalmente:', ['En las sinapsis, alterando la acción de los neurotransmisores', 'En los glóbulos rojos', 'En los huesos', 'En el estómago'], 'Pueden imitar, bloquear o aumentar a los neurotransmisores.'),
          M('Conducir después de beber alcohol es peligroso porque el alcohol:', ['Hace más lentos los reflejos y altera la coordinación', 'Acelera los reflejos', 'Mejora la visión', 'No afecta al sistema nervioso'], 'Por eso la ley chilena sanciona la conducción bajo su influencia.'),
        ],
      },
      {
        n: 'Organización, reflejos y sentidos', ic: 'brain', items: [
          { t: 'info', ic: 'brain', title: 'Organización', txt: '**SNC**: encéfalo (cerebro, cerebelo y tronco encefálico) y médula espinal. **SNP**: nervios; sistema **somático** (voluntario) y **autónomo** (involuntario): **simpático** (alerta) y **parasimpático** (reposo). **Arco reflejo**: receptor → neurona sensitiva → médula → neurona motora → efector.' },
          M('El sistema nervioso central está formado por:', ['El encéfalo y la médula espinal', 'Los nervios', 'Los músculos y los huesos', 'El corazón y los pulmones'], 'El periférico está formado por los nervios y los ganglios.'),
          P('Une cada estructura con su función', [['Cerebro', 'Pensamiento, memoria y movimientos voluntarios'], ['Cerebelo', 'Equilibrio y coordinación'], ['Tronco encefálico', 'Respiración y ritmo cardíaco'], ['Médula espinal', 'Conduce impulsos y procesa reflejos']], 'El tronco encefálico incluye el bulbo raquídeo.'),
          O('Ordena los componentes de un arco reflejo', ['Receptor', 'Neurona sensitiva', 'Médula espinal', 'Neurona motora', 'Efector (músculo)'], 'Por eso retiras la mano del fuego antes de sentir el dolor.'),
          T('Un reflejo puede ocurrir sin la participación del cerebro.', true, 'La médula espinal procesa la respuesta; el cerebro se entera después.'),
          M('Ante un susto, el corazón se acelera y se dilatan las pupilas. Esto lo provoca:', ['El sistema nervioso simpático', 'El sistema parasimpático', 'El cerebelo', 'El sistema somático'], 'El simpático prepara para la acción; el parasimpático relaja.'),
          M('El sistema nervioso parasimpático:', ['Disminuye la frecuencia cardíaca y favorece la digestión', 'Acelera el corazón', 'Controla los movimientos voluntarios', 'Produce las hormonas sexuales'], 'Predomina en situaciones de reposo.'),
          M('El sistema nervioso somático controla:', ['Los movimientos voluntarios de los músculos esqueléticos', 'Los latidos del corazón', 'La digestión', 'La secreción de hormonas'], 'El autónomo controla lo involuntario.'),
          P('Une cada sentido con su tipo de receptor', [['Vista', 'Fotorreceptores'], ['Oído', 'Mecanorreceptores'], ['Gusto y olfato', 'Quimiorreceptores'], ['Calor y frío de la piel', 'Termorreceptores']], 'Los conos y bastones de la retina son fotorreceptores.'),
          M('Tras un accidente, una persona tiene problemas de equilibrio y coordinación. Probablemente se dañó:', ['El cerebelo', 'El bulbo raquídeo', 'La médula ósea', 'La hipófisis'], 'El cerebelo coordina los movimientos y el equilibrio.'),
          M('Un receptor sensorial es una estructura que:', ['Capta un estímulo y lo transforma en impulso nervioso', 'Produce hormonas', 'Contrae los músculos', 'Fabrica neurotransmisores para la sangre'], 'Cada receptor es sensible a un tipo de estímulo.'),
        ],
      },
    ],
  });

  // ---------- Hormonas y homeostasis ----------
  RB.unit('bh', {
    name: 'Hormonas y homeostasis', desc: 'Glándulas y hormonas, retroalimentación, regulación de la glicemia, diabetes, temperatura corporal, agua y estrés.', ic: 'scale', area: 'Cuerpo humano',
    lessons: [
      {
        n: 'Glándulas y hormonas', ic: 'flask', items: [
          { t: 'info', ic: 'flask', title: 'Sistema endocrino', txt: 'Las **hormonas** son mensajeros químicos que viajan por la **sangre** hasta **células blanco** con receptores. **Hipotálamo** e **hipófisis** (glándula maestra) controlan a otras glándulas. **Tiroides**: tiroxina (metabolismo). **Páncreas**: insulina y glucagón. **Suprarrenales**: adrenalina y cortisol.' },
          M('Las hormonas viajan hasta sus células blanco a través de:', ['La sangre', 'Los nervios', 'El tubo digestivo', 'El aire'], 'Por eso su efecto es más lento, pero más duradero, que el nervioso.'),
          M('La glándula que regula a muchas otras, llamada glándula maestra, es:', ['La hipófisis', 'La tiroides', 'El páncreas', 'Las suprarrenales'], 'A su vez, está controlada por el hipotálamo.'),
          P('Une cada hormona con la glándula que la produce', [['Tiroxina', 'Tiroides'], ['Adrenalina', 'Glándulas suprarrenales'], ['Insulina', 'Páncreas'], ['Hormona del crecimiento', 'Hipófisis']], 'Cada hormona actúa sobre las células que tienen receptores para ella.'),
          M('¿Qué diferencia principal hay entre la respuesta nerviosa y la hormonal?', ['La nerviosa es rápida y breve; la hormonal es más lenta y duradera', 'La hormonal siempre es más rápida', 'Son idénticas', 'La nerviosa viaja por la sangre'], 'Ambas coordinan el cuerpo y trabajan juntas.'),
          M('Solo responden a una hormona las células que:', ['Tienen receptores para esa hormona', 'Están cerca de la glándula', 'Son neuronas', 'No tienen núcleo'], 'Se llaman células blanco.'),
          M('La falta de yodo en la dieta puede causar bocio porque:', ['La tiroides necesita yodo para fabricar sus hormonas', 'El yodo forma la insulina', 'El yodo es parte de la hemoglobina', 'El páncreas produce yodo'], 'Por eso en Chile la sal de mesa se yoda.'),
          M('El hipotálamo se relaciona con el sistema endocrino porque:', ['Controla a la hipófisis y conecta el sistema nervioso con el endocrino', 'Fabrica insulina', 'Produce glóbulos rojos', 'Digiere grasas'], 'Es un centro clave del control homeostático.'),
          S('Clasifica cada glándula', ['Endocrina (vierte a la sangre)', 'Exocrina (vierte por un conducto)'], [['Tiroides', 0], ['Hipófisis', 0], ['Suprarrenales', 0], ['Glándulas salivales', 1], ['Glándulas sudoríparas', 1]], 'El páncreas es mixto: endocrino (insulina) y exocrino (jugo pancreático).'),
          T('La melatonina, producida por la glándula pineal, regula el ciclo de sueño y vigilia.', true, 'Se libera más en la oscuridad.'),
        ],
      },
      {
        n: 'Glicemia y diabetes', ic: 'chart', items: [
          { t: 'info', ic: 'chart', title: 'Glicemia', txt: 'Si la glicemia **sube** (después de comer), el páncreas libera **insulina**: las células captan glucosa y el hígado la guarda como **glucógeno**. Si **baja** (ayuno), libera **glucagón**: el hígado libera glucosa. **Diabetes tipo 1**: no hay insulina. **Tipo 2**: las células responden mal a ella.' },
          M('La insulina, producida por el páncreas:', ['Disminuye la glucosa en la sangre, porque hace que las células la capten', 'Aumenta la glucosa en la sangre', 'Digiere proteínas', 'Produce glóbulos rojos'], 'También favorece que el hígado la guarde como glucógeno.'),
          M('Después de varias horas de ayuno, el páncreas libera:', ['Glucagón, que eleva la glicemia', 'Más insulina', 'Bilis', 'Tiroxina'], 'El glucagón hace que el hígado degrade glucógeno y libere glucosa.'),
          M('La diabetes tipo 1 se debe a que:', ['El páncreas no produce insulina', 'El cuerpo produce demasiada insulina', 'Falta glucagón', 'Hay exceso de hierro'], 'Suele aparecer en la infancia o la juventud y se trata con insulina.'),
          M('La diabetes tipo 2:', ['Se debe a que las células responden mal a la insulina, y se asocia a obesidad y sedentarismo', 'Siempre se debe a una infección', 'Ocurre por falta de glucagón', 'No tiene relación con el estilo de vida'], 'Se previene con alimentación saludable y actividad física.'),
          T('Una persona con diabetes descontrolada puede tener glucosa en la orina.', true, 'Si la glicemia es muy alta, el riñón no alcanza a reabsorberla toda.'),
          M('Si a una persona se le aplica demasiada insulina, su glicemia:', ['Baja demasiado (hipoglicemia)', 'Sube mucho', 'No cambia', 'Se duplica'], 'La hipoglicemia produce mareo, sudor y confusión.'),
          M('El órgano que guarda glucosa como glucógeno y la libera a la sangre cuando se necesita es:', ['El hígado', 'El riñón', 'El corazón', 'El estómago'], 'Los músculos también guardan glucógeno, pero lo usan para sí mismos.'),
          M('La retroalimentación negativa es un mecanismo en que:', ['La respuesta contrarresta el cambio y devuelve la variable a su valor normal', 'La respuesta aumenta cada vez más el cambio', 'No hay respuesta', 'Se dejan de producir hormonas para siempre'], 'Si sube la glicemia, se libera insulina y la glicemia baja.'),
          M('Un gráfico muestra que la glicemia sube después de comer y luego vuelve a su valor normal. La hormona responsable de que baje es:', ['La insulina', 'El glucagón', 'La adrenalina', 'La tiroxina'], 'Es un ejemplo de retroalimentación negativa.'),
        ],
      },
      {
        n: 'Temperatura, agua y estrés', ic: 'replay', items: [
          { t: 'info', ic: 'replay', title: 'Homeostasis', txt: 'Es mantener **estable el medio interno**. **Temperatura**: el **hipotálamo** actúa como termostato (frío: escalofríos y vasoconstricción; calor: sudor y vasodilatación). **Agua**: la **ADH** hace que el riñón reabsorba más agua. **Estrés**: adrenalina (respuesta inmediata) y cortisol (prolongado).' },
          M('La homeostasis es:', ['La mantención de un medio interno estable', 'La división celular', 'Un tipo de hormona', 'La herencia de caracteres'], 'La temperatura, la glicemia, el agua y el pH se mantienen dentro de ciertos rangos.'),
          M('Al bajar la temperatura del ambiente, el cuerpo responde con:', ['Escalofríos y vasoconstricción de la piel', 'Sudor abundante', 'Vasodilatación de la piel', 'Disminución del metabolismo'], 'Así genera calor y lo conserva.'),
          M('Cuando hace mucho calor o hacemos ejercicio, el cuerpo se enfría mediante:', ['El sudor y la vasodilatación de la piel', 'Los escalofríos', 'La vasoconstricción', 'El aumento del metabolismo'], 'Al evaporarse, el sudor quita calor.'),
          M('El centro que controla la temperatura corporal está en:', ['El hipotálamo', 'El cerebelo', 'El páncreas', 'Los pulmones'], 'Funciona como un termostato.'),
          M('Si una persona está deshidratada, se libera más ADH y:', ['Los riñones reabsorben más agua y la orina queda más concentrada', 'Los riñones eliminan más agua', 'La persona suda más', 'Aumenta el volumen de orina'], 'Así se conserva el agua del cuerpo.'),
          M('Ante una situación de peligro, las glándulas suprarrenales liberan:', ['Adrenalina, que acelera el corazón y aumenta la glicemia', 'Insulina', 'Melatonina', 'Prolactina'], 'Prepara al cuerpo para luchar o huir.'),
          M('El estrés prolongado eleva el cortisol, lo que puede:', ['Debilitar el sistema inmune y alterar el sueño', 'Mejorar siempre la salud', 'Detener el corazón', 'Bajar la glicemia a cero'], 'Por eso el estrés crónico afecta la salud.'),
          T('En la retroalimentación positiva, la respuesta amplifica el cambio, como ocurre con la oxitocina durante el parto.', true, 'Es mucho menos común que la retroalimentación negativa.'),
          O('Ordena la respuesta del cuerpo cuando sube la glicemia', ['Sube la glucosa en la sangre', 'El páncreas detecta el cambio', 'Se libera insulina', 'Las células captan glucosa', 'La glicemia vuelve a lo normal'], 'Estímulo, receptor, respuesta y corrección: retroalimentación negativa.'),
        ],
      },
    ],
  });
})();
