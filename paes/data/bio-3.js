// Biología (3): nutrición y sistemas del cuerpo; defensa del organismo (microorganismos e inmunidad).
(function () {
  const RB = window.RB, { M, T, P, S, O } = RB.Q;

  // ---------- Sistemas del cuerpo ----------
  RB.unit('be', {
    name: 'Sistemas del cuerpo', desc: 'Digestión y nutrición, respiración, corazón y circulación, la sangre, el sistema excretor y cómo se integran.', ic: 'heart', area: 'Cuerpo humano',
    lessons: [
      {
        n: 'Digestión y nutrición', ic: 'flask', items: [
          { t: 'info', ic: 'flask', title: 'El sistema digestivo', txt: '**Boca**: masticación y **amilasa** (almidón). **Estómago**: ácido y **pepsina** (proteínas). **Intestino delgado**: enzimas del **páncreas** y **bilis** del hígado (emulsiona grasas); aquí se **absorben** los nutrientes. **Intestino grueso**: absorbe **agua** y forma las heces.' },
          O('Ordena el recorrido de los alimentos por el tubo digestivo', ['Boca', 'Esófago', 'Estómago', 'Intestino delgado', 'Intestino grueso'], 'El hígado y el páncreas son glándulas anexas: los alimentos no pasan por ellas.'),
          M('¿En qué órgano se absorbe la mayor parte de los nutrientes?', ['El intestino delgado', 'El estómago', 'El intestino grueso', 'El esófago'], 'Sus vellosidades aumentan enormemente la superficie de absorción.'),
          M('La bilis, producida por el hígado y guardada en la vesícula biliar:', ['Emulsiona las grasas, separándolas en gotitas', 'Digiere las proteínas', 'Digiere el almidón', 'Absorbe el agua'], 'No es una enzima, pero facilita el trabajo de la lipasa.'),
          M('La digestión química de las proteínas comienza en:', ['El estómago, con la pepsina', 'La boca, con la amilasa', 'El intestino grueso', 'El esófago'], 'El ácido clorhídrico del estómago activa la pepsina.'),
          M('La función principal del intestino grueso es:', ['Absorber agua y formar las heces', 'Digerir proteínas', 'Producir bilis', 'Absorber la glucosa'], 'Además, sus bacterias producen vitaminas, como la K.'),
          P('Une cada enzima con lo que digiere', [['Amilasa', 'Almidón'], ['Pepsina', 'Proteínas'], ['Lipasa', 'Lípidos'], ['Lactasa', 'Lactosa de la leche']], 'Las personas con intolerancia a la lactosa producen poca lactasa.'),
          M('El páncreas aporta a la digestión:', ['Jugo pancreático, con enzimas para carbohidratos, proteínas y lípidos', 'Solo bilis', 'Ácido clorhídrico', 'Saliva'], 'Lo vierte en el duodeno, la primera parte del intestino delgado.'),
          M('La fibra de los alimentos (celulosa) es importante porque:', ['Favorece el tránsito intestinal y previene el estreñimiento', 'Aporta mucha energía', 'Se absorbe en el estómago', 'Forma los músculos'], 'Los humanos no la podemos digerir.'),
          T('La masticación y los movimientos del estómago son parte de la digestión mecánica.', true, 'La digestión química la realizan las enzimas.'),
          M('Una alimentación saludable incluye:', ['Variedad de alimentos en proporciones adecuadas: frutas, verduras, cereales, proteínas y agua', 'Solo proteínas', 'Solo carbohidratos', 'Pocos alimentos y mucha sal'], 'El exceso de grasas, azúcar y sal se asocia a obesidad, diabetes e hipertensión.'),
          M('Una persona pesa 81 kg y mide 1,80 m. ¿Cuál es su índice de masa corporal (IMC)?', ['25', '45', '81', '18'], 'IMC = peso / estatura² = 81 / 3,24 = 25. En adultos, lo normal va de 18,5 a 24,9.'),
        ],
      },
      {
        n: 'Respiración y circulación', ic: 'heart', items: [
          { t: 'info', ic: 'heart', title: 'Respirar y circular', txt: 'El aire llega a los **alvéolos**, donde ocurre el **intercambio gaseoso** por difusión. El **corazón** tiene 2 aurículas y 2 ventrículos. Circulación **menor**: corazón → pulmones → corazón. Circulación **mayor**: corazón → cuerpo → corazón. **Arterias** salen del corazón, **venas** llegan a él y los **capilares** hacen el intercambio.' },
          M('El intercambio de gases entre el aire y la sangre ocurre en:', ['Los alvéolos pulmonares', 'La tráquea', 'Los bronquios', 'La laringe'], 'Ocurre por difusión, a través de paredes muy delgadas rodeadas de capilares.'),
          M('Durante la inspiración, el diafragma:', ['Se contrae y baja, y aumenta el volumen del tórax', 'Se relaja y sube', 'No se mueve', 'Expulsa el aire'], 'Al aumentar el volumen baja la presión en los pulmones y entra el aire.'),
          M('Las arterias se caracterizan porque:', ['Llevan la sangre desde el corazón hacia los órganos', 'Siempre llevan sangre pobre en oxígeno', 'Llevan la sangre hacia el corazón', 'Realizan el intercambio con los tejidos'], 'La arteria pulmonar es arteria aunque lleve sangre pobre en O₂.'),
          M('La circulación menor (pulmonar) lleva la sangre:', ['Del ventrículo derecho a los pulmones, y de vuelta a la aurícula izquierda', 'Del corazón a todo el cuerpo', 'Del hígado a los riñones', 'De los pulmones al cerebro'], 'En los pulmones, la sangre se oxigena.'),
          O('Ordena el recorrido de la sangre desde que vuelve del cuerpo', ['Aurícula derecha', 'Ventrículo derecho', 'Pulmones', 'Aurícula izquierda', 'Ventrículo izquierdo', 'Arteria aorta'], 'Primero la circulación menor y luego la mayor.'),
          M('¿Qué cavidad del corazón impulsa la sangre hacia todo el cuerpo?', ['El ventrículo izquierdo', 'El ventrículo derecho', 'La aurícula derecha', 'La aurícula izquierda'], 'Por eso su pared muscular es la más gruesa.'),
          M('Las válvulas del corazón y de las venas sirven para:', ['Impedir que la sangre se devuelva', 'Producir glóbulos rojos', 'Oxigenar la sangre', 'Filtrar la sangre'], 'Mantienen el flujo en un solo sentido.'),
          M('Los capilares sanguíneos permiten:', ['El intercambio de sustancias entre la sangre y los tejidos', 'Bombear la sangre', 'Producir glóbulos rojos', 'Formar la orina'], 'Sus paredes tienen una sola capa de células.'),
          T('La sangre que llega a la aurícula derecha desde el cuerpo es pobre en oxígeno.', true, 'Llega por las venas cavas y luego va a los pulmones.'),
          M('Al hacer ejercicio aumentan la frecuencia respiratoria y la cardíaca porque:', ['Los músculos necesitan más O₂ y producen más CO₂', 'El cuerpo necesita menos energía', 'Baja la temperatura corporal', 'Se detiene la respiración celular'], 'Los sistemas respiratorio y circulatorio se ajustan a la demanda.'),
          M('La tráquea, los bronquios y los bronquiolos:', ['Conducen el aire hasta los alvéolos', 'Realizan el intercambio gaseoso', 'Bombean la sangre', 'Producen oxígeno'], 'El intercambio solo ocurre en los alvéolos.'),
        ],
      },
      {
        n: 'Sangre, excreción e integración', ic: 'link', items: [
          { t: 'info', ic: 'link', title: 'Sangre y riñones', txt: '**Glóbulos rojos**: transportan O₂ (hemoglobina con hierro). **Glóbulos blancos**: defensa. **Plaquetas**: coagulación. **Plasma**: transporte. Los **riñones** filtran la sangre en las **nefronas**, reabsorben agua, glucosa y sales, y eliminan la **urea** en la orina.' },
          P('Une cada componente de la sangre con su función', [['Glóbulos rojos', 'Transportan oxígeno'], ['Glóbulos blancos', 'Defienden al cuerpo'], ['Plaquetas', 'Coagulación'], ['Plasma', 'Transporta nutrientes, hormonas y desechos']], 'El plasma es la parte líquida de la sangre.'),
          M('La hemoglobina de los glóbulos rojos contiene:', ['Hierro, que se une al oxígeno', 'Calcio', 'Yodo', 'Glucosa'], 'La falta de hierro puede causar anemia.'),
          M('Una persona con anemia tiene:', ['Pocos glóbulos rojos o poca hemoglobina, y transporta menos oxígeno', 'Exceso de plaquetas', 'Demasiados glóbulos blancos', 'Exceso de glucosa'], 'Suele sentirse cansada y verse pálida.'),
          M('La unidad funcional del riñón, donde se filtra la sangre, es:', ['La nefrona', 'La neurona', 'El alvéolo', 'La vellosidad'], 'Cada riñón tiene alrededor de un millón de nefronas.'),
          M('La urea, que se elimina en la orina, proviene de la degradación de:', ['Las proteínas', 'Los carbohidratos', 'Las grasas', 'El agua'], 'El hígado transforma el amoníaco, que es tóxico, en urea.'),
          M('En la orina de una persona sana NO debería haber:', ['Glucosa', 'Agua', 'Urea', 'Sales'], 'La glucosa se reabsorbe por completo en la nefrona. Si aparece en la orina, puede indicar diabetes.'),
          M('La hormona antidiurética (ADH) actúa en el riñón:', ['Aumentando la reabsorción de agua, lo que concentra la orina', 'Aumentando la eliminación de agua', 'Fabricando urea', 'Filtrando glóbulos rojos'], 'Si estás deshidratado se libera más ADH y orinas menos.'),
          M('Además de los riñones, ¿qué órganos eliminan desechos del cuerpo?', ['Los pulmones (CO₂) y la piel (sudor)', 'El corazón y el cerebro', 'Los huesos', 'El esófago'], 'El hígado también elimina sustancias en la bilis.'),
          T('El CO₂ producido en la respiración celular se elimina por los pulmones.', true, 'Viaja por la sangre hasta los alvéolos y sale al espirar.'),
          M('¿Qué sistemas trabajan juntos para que el O₂ llegue a las mitocondrias de una célula muscular?', ['El respiratorio y el circulatorio', 'El digestivo y el excretor', 'El nervioso y el reproductor', 'Solo el respiratorio'], 'El respiratorio capta el O₂ y el circulatorio lo transporta.'),
          M('Después de comer, la glucosa en la sangre sube porque:', ['El intestino delgado absorbe la glucosa de los alimentos y pasa a la sangre', 'Los pulmones producen glucosa', 'El riñón fabrica glucosa', 'El corazón libera glucosa'], 'Luego la insulina la hace bajar.'),
        ],
      },
    ],
  });

  // ---------- Defensa del organismo ----------
  RB.unit('bf', {
    name: 'Defensa del organismo', desc: 'Microorganismos, barreras, inmunidad innata y adaptativa, vacunas, antibióticos, VIH, alergias y transfusiones.', ic: 'shield', area: 'Cuerpo humano',
    lessons: [
      {
        n: 'Microorganismos', ic: 'cell', items: [
          { t: 'info', ic: 'cell', title: 'Microorganismos', txt: '**Bacterias**: células procariotas, útiles o patógenas. **Virus**: no son células; solo se multiplican dentro de una. **Hongos**: levaduras y mohos. **Protozoos**: eucariotas unicelulares. Muchos son útiles: yogur, pan, flora intestinal, descomposición y antibióticos.' },
          M('¿Cuál de estos NO es una célula?', ['Un virus', 'Una bacteria', 'Una levadura', 'Un protozoo'], 'Un virus es material genético envuelto en proteínas.'),
          M('Los virus solo se pueden multiplicar:', ['Dentro de una célula hospedera', 'En el agua', 'Por mitosis', 'Al aire libre'], 'Usan la maquinaria de la célula para fabricar copias de sí mismos.'),
          S('Clasifica cada microorganismo', ['Útil para el ser humano', 'Causa enfermedades'], [['Lactobacilos del yogur', 0], ['Levadura del pan', 0], ['Hongo Penicillium', 0], ['Virus de la influenza', 1], ['Bacteria del cólera', 1], ['Protozoo de la malaria', 1]], 'Muchos microorganismos son beneficiosos; solo algunos son patógenos.'),
          M('Alexander Fleming descubrió la penicilina, el primer antibiótico, a partir de:', ['Un hongo', 'Un virus', 'Una planta', 'Un animal'], 'El moho Penicillium impedía el crecimiento de las bacterias.'),
          M('La microbiota (flora) intestinal está formada principalmente por bacterias que:', ['Ayudan a digerir y producen vitaminas, como la K', 'Siempre causan enfermedades', 'Fabrican glóbulos rojos', 'Producen insulina'], 'También compiten con las bacterias dañinas.'),
          T('Hongos y bacterias descomponedores reciclan la materia en los ecosistemas.', true, 'Transforman la materia orgánica muerta en sustancias inorgánicas que usan las plantas.'),
          M('Una enfermedad infecciosa es causada por:', ['Un agente patógeno que se transmite, como un virus o una bacteria', 'Una mala alimentación', 'Un alelo recesivo', 'El envejecimiento'], 'Por ejemplo, la influenza, la tuberculosis o el COVID-19.'),
          M('Lavarse las manos previene enfermedades porque:', ['Elimina microorganismos que podrían entrar al cuerpo', 'Fortalece los glóbulos blancos', 'Produce anticuerpos', 'Mata los virus que están dentro de las células'], 'Es una de las medidas de prevención más eficaces.'),
        ],
      },
      {
        n: 'Las líneas de defensa', ic: 'shield', items: [
          { t: 'info', ic: 'shield', title: 'Tres líneas', txt: '**1ª, barreras**: piel, mucosas, lágrimas, ácido del estómago. **2ª, innata** (inespecífica): inflamación, fiebre y fagocitos. **3ª, adaptativa** (específica): **linfocitos B** (fabrican **anticuerpos**) y **linfocitos T** (coordinan y destruyen células infectadas). La adaptativa tiene **memoria**.' },
          M('La piel y las mucosas forman parte de:', ['La primera línea de defensa (barreras)', 'La inmunidad adaptativa', 'El sistema endocrino', 'Las vacunas'], 'Impiden la entrada de los microorganismos.'),
          M('Los anticuerpos son fabricados por:', ['Los linfocitos B', 'Los glóbulos rojos', 'Las plaquetas', 'Las neuronas'], 'Son proteínas que reconocen un antígeno específico.'),
          M('Un antígeno es:', ['Una molécula extraña que el sistema inmune reconoce', 'Un tipo de glóbulo blanco', 'Un medicamento', 'Una hormona'], 'Por ejemplo, las proteínas de la superficie de un virus.'),
          S('Clasifica cada defensa', ['Innata (inespecífica)', 'Adaptativa (específica)'], [['Piel y mucosas', 0], ['Fiebre e inflamación', 0], ['Fagocitosis por macrófagos', 0], ['Anticuerpos', 1], ['Linfocitos T', 1], ['Memoria inmunológica', 1]], 'La adaptativa reconoce antígenos específicos y los recuerda.'),
          T('La segunda vez que el cuerpo se enfrenta al mismo antígeno, la respuesta es más rápida e intensa.', true, 'Gracias a las células de memoria.'),
          M('La inflamación de una herida (calor, rojez e hinchazón) sirve para:', ['Atraer más sangre y glóbulos blancos a la zona', 'Detener la circulación', 'Fabricar anticuerpos en la piel', 'Eliminar los glóbulos rojos'], 'Es parte de la respuesta innata.'),
          M('Los macrófagos destruyen a los microorganismos mediante:', ['Fagocitosis', 'Fotosíntesis', 'Osmosis', 'Meiosis'], 'Los engloban y los digieren con sus lisosomas.'),
          M('Un anticuerpo contra el virus del sarampión protege contra:', ['Solo el sarampión', 'Todas las enfermedades', 'Todas las bacterias', 'Cualquier virus'], 'Los anticuerpos son específicos para su antígeno.'),
          M('Los linfocitos T citotóxicos se encargan de:', ['Destruir células infectadas o tumorales', 'Fabricar anticuerpos', 'Coagular la sangre', 'Transportar oxígeno'], 'Los linfocitos T colaboradores coordinan la respuesta.'),
          M('La fiebre ayuda a la defensa porque:', ['Dificulta la multiplicación de muchos patógenos y activa la respuesta inmune', 'Destruye las células del cuerpo', 'Produce vitaminas', 'Elimina los anticuerpos'], 'Es parte de la respuesta innata, aunque una fiebre muy alta puede ser peligrosa.'),
        ],
      },
      {
        n: 'Vacunas, antibióticos y fallas', ic: 'aid', items: [
          { t: 'info', ic: 'aid', title: 'Vacunas y antibióticos', txt: '**Vacunas**: antígenos inactivados o debilitados que generan **memoria** sin causar la enfermedad (inmunidad activa artificial). **Inmunidad pasiva**: recibir anticuerpos listos (leche materna, sueros). **Antibióticos**: solo contra **bacterias**; su mal uso genera **resistencia**.' },
          M('Las vacunas protegen porque:', ['Generan memoria inmunológica sin causar la enfermedad', 'Matan directamente a las bacterias', 'Son antibióticos', 'Destruyen todos los virus del cuerpo'], 'Contienen antígenos debilitados, inactivados o fragmentos de ellos.'),
          M('Los antibióticos sirven para tratar infecciones causadas por:', ['Bacterias', 'Virus', 'Cualquier microorganismo', 'Alergias'], 'No sirven contra virus, como el del resfrío o la influenza.'),
          M('El uso excesivo o incorrecto de antibióticos favorece:', ['La aparición de bacterias resistentes', 'Que los virus desaparezcan', 'Que el cuerpo fabrique más glóbulos rojos', 'La inmunidad contra todas las enfermedades'], 'Las bacterias resistentes sobreviven y se multiplican: es selección natural.'),
          P('Une cada tipo de inmunidad con su ejemplo', [['Activa natural', 'Enfermarse y recuperarse'], ['Activa artificial', 'Vacunarse'], ['Pasiva natural', 'Anticuerpos de la madre al bebé'], ['Pasiva artificial', 'Recibir un suero con anticuerpos']], 'En la activa el cuerpo fabrica sus anticuerpos y queda memoria; en la pasiva los recibe listos.'),
          M('Los anticuerpos que recibe un bebé con la leche materna le dan inmunidad:', ['Pasiva y temporal', 'Activa y permanente', 'Innata', 'Activa artificial'], 'El bebé no fabrica esos anticuerpos, así que no queda memoria.'),
          M('El VIH, causante del sida, ataca principalmente a:', ['Los linfocitos T', 'Los glóbulos rojos', 'Las plaquetas', 'Las neuronas'], 'Debilita el sistema inmune y facilita otras infecciones.'),
          M('El VIH se transmite por:', ['Relaciones sexuales sin preservativo, sangre contaminada y de madre a hijo', 'Un abrazo o un beso en la mejilla', 'Compartir el baño', 'La picadura de un mosquito'], 'El preservativo es el método más eficaz para prevenir su transmisión sexual.'),
          M('Una alergia es:', ['Una respuesta inmune exagerada ante una sustancia normalmente inofensiva', 'Una infección bacteriana', 'La falta de glóbulos rojos', 'Una enfermedad contagiosa'], 'Por ejemplo, ante el polen, los ácaros o algunos alimentos.'),
          M('Una enfermedad autoinmune ocurre cuando:', ['El sistema inmune ataca células del propio cuerpo', 'No hay glóbulos blancos', 'Un virus ataca los linfocitos', 'Se toman antibióticos'], 'Ejemplos: la diabetes tipo 1 y la artritis reumatoide.'),
          M('Una persona de grupo O puede donar glóbulos rojos a cualquier grupo ABO porque:', ['Sus glóbulos rojos no tienen antígenos A ni B', 'Tiene todos los anticuerpos', 'Su sangre no tiene plasma', 'Sus glóbulos rojos tienen antígenos A y B'], 'Por eso se le llama donante universal.'),
          M('Una persona de grupo AB puede recibir glóbulos rojos de cualquier grupo ABO porque:', ['No tiene anticuerpos anti-A ni anti-B en su plasma', 'No tiene glóbulos rojos', 'Tiene anticuerpos contra todos los grupos', 'Sus glóbulos rojos no tienen antígenos'], 'Es el receptor universal.'),
          T('El rechazo de un trasplante ocurre porque el sistema inmune reconoce el órgano como extraño.', true, 'Por eso se buscan donantes compatibles y se usan medicamentos inmunosupresores.'),
        ],
      },
    ],
  });
})();
