// Historia (9): Economía II (Estado, indicadores, dinero y consumidor); Geografía de Chile (territorio, población y medio ambiente).
(function () {
  const RB = window.RB, { M, T, P, S, O, N, X } = RB.Q;

  // ---------- Economía II ----------
  RB.unit('h17', {
    name: 'Economía: Estado, dinero y consumidor', desc: 'Fallas de mercado, impuestos y políticas económicas, PIB, inflación y desempleo, dinero y crédito, derechos del consumidor y comercio exterior.', ic: 'chart', area: 'Economía',
    lessons: [
      {
        n: 'El Estado en la economía', ic: 'landmark', items: [
          { t: 'info', ic: 'landmark', title: 'Economía mixta', txt: 'El Estado corrige **fallas de mercado** (monopolios, **externalidades** como la contaminación, **bienes públicos**), **redistribuye** con impuestos y gasto social, y busca estabilidad. **Política fiscal** (Hacienda): impuestos y gasto. **Política monetaria** (Banco Central): **tasa de interés** para controlar la inflación. Impuestos: **IVA** (19 %, indirecto) y **renta** (directo y progresivo).' },
          M('Una externalidad negativa es:', ['Un costo que una actividad provoca a terceros que no participan en ella, como la contaminación de una fábrica', 'Un beneficio para el productor', 'Un impuesto', 'Una exportación'], 'El mercado por sí solo no la corrige; por eso el Estado regula o cobra impuestos.'),
          M('El alumbrado público es un bien público porque:', ['Nadie puede ser excluido de usarlo y el uso de una persona no impide el de otras', 'Lo produce una empresa privada', 'Es muy caro', 'Solo lo usan algunas personas'], 'Como nadie paga individualmente, el mercado no lo provee: lo hace el Estado.'),
          M('El IVA (Impuesto al Valor Agregado), de 19 % en Chile, es un impuesto:', ['Indirecto, que se paga al consumir bienes y servicios', 'Directo, sobre la renta', 'Solo para las empresas mineras', 'Que se paga una vez en la vida'], 'Es la principal fuente de recaudación del Estado.'),
          M('Un impuesto progresivo es aquel en que:', ['Quien gana más paga un porcentaje mayor de su ingreso', 'Todos pagan el mismo monto', 'Los más pobres pagan más', 'Nadie paga'], 'El impuesto a la renta de las personas es progresivo.'),
          P('Une cada política o ley con su descripción', [['Política fiscal', 'Ministerio de Hacienda: impuestos y gasto público'], ['Política monetaria', 'Banco Central: tasa de interés'], ['Ley de Presupuestos', 'Fija cada año los ingresos y gastos del Estado']], 'Ambas políticas buscan estabilidad y crecimiento.'),
          M('Para bajar la inflación, el Banco Central suele:', ['Subir la tasa de interés, lo que encarece el crédito y frena el consumo', 'Bajar la tasa de interés a cero', 'Imprimir más billetes', 'Prohibir las importaciones'], 'Su meta es una inflación cercana al 3 % anual.'),
          X('¿Cuáles son funciones del Estado en la economía? Marca todas.', ['Regular los monopolios y proteger la competencia', 'Redistribuir el ingreso con impuestos y gasto social', 'Proveer bienes públicos', 'Fijar el precio de todos los productos'], [0, 1, 2], 'En una economía mixta, el mercado y el Estado cumplen papeles complementarios.'),
          T('El Servicio de Impuestos Internos (SII) fiscaliza el pago de impuestos en Chile.', true, 'La Tesorería General de la República recauda y paga.'),
          M('La Pensión Garantizada Universal (PGU) es un ejemplo de:', ['Gasto social del Estado para mejorar los ingresos de las personas mayores', 'Un impuesto', 'Una AFP privada', 'Un crédito bancario'], 'Se financia con impuestos generales.'),
        ],
      },
      {
        n: 'PIB, inflación y desempleo', ic: 'chart', items: [
          { t: 'info', ic: 'chart', title: 'Indicadores', txt: 'El **PIB** es el valor de los bienes y servicios **finales** producidos en un país en un año; el **PIB per cápita** lo divide por la población. La **inflación** es el alza **sostenida y generalizada** de los precios; la mide el **IPC** (INE). La **UF** se reajusta según la inflación. La **tasa de desempleo** es el porcentaje de la **fuerza de trabajo** que busca empleo y no lo encuentra.' },
          M('El Producto Interno Bruto (PIB) mide:', ['El valor de los bienes y servicios finales producidos en un país durante un período', 'La cantidad de dinero que hay en los bancos', 'El número de habitantes', 'La deuda del Estado'], 'Su variación indica si la economía crece o se contrae.'),
          M('El PIB per cápita se calcula:', ['Dividiendo el PIB por la población', 'Multiplicando el PIB por la población', 'Sumando las exportaciones', 'Restando los impuestos'], 'Muestra el ingreso promedio, pero no cómo se distribuye.'),
          M('La inflación es:', ['El alza sostenida y generalizada de los precios', 'La baja de un solo precio', 'El aumento del desempleo', 'El crecimiento del PIB'], 'Reduce el poder adquisitivo del dinero.'),
          M('En Chile, la inflación se mide con:', ['El Índice de Precios al Consumidor (IPC), que calcula el INE', 'El PIB', 'La tasa de desempleo', 'El precio del dólar'], 'El IPC sigue el precio de una canasta de bienes y servicios.'),
          N('Si el IPC sube de 100 a 104 en un año, ¿cuál fue la inflación anual?', 4, '%', '(104 − 100) / 100 · 100 = 4 %.'),
          M('Si tu sueldo sube 3 % y la inflación es de 5 %, tu poder adquisitivo:', ['Disminuye', 'Aumenta', 'No cambia', 'Se duplica'], 'Los precios suben más que tu sueldo: puedes comprar menos.'),
          M('La Unidad de Fomento (UF) es:', ['Una unidad de cuenta que se reajusta según la inflación', 'Una moneda para pagar en el supermercado', 'Un impuesto', 'Un banco'], 'Se usa en créditos hipotecarios, arriendos y contratos de largo plazo.'),
          M('La tasa de desempleo se calcula como:', ['Los desocupados divididos por la fuerza de trabajo, por cien', 'Los desocupados divididos por toda la población', 'Los ocupados divididos por los desocupados', 'El número de empresas cerradas'], 'La fuerza de trabajo incluye a los ocupados y a los desocupados que buscan empleo.'),
          M('El coeficiente de Gini mide:', ['La desigualdad en la distribución del ingreso', 'El crecimiento económico', 'La inflación', 'El número de empresas'], 'Va de 0 (igualdad total) a 1 (desigualdad total).'),
          T('El Índice de Desarrollo Humano (IDH) considera la salud, la educación y el ingreso.', true, 'Lo calcula el Programa de las Naciones Unidas para el Desarrollo (PNUD).'),
        ],
      },
      {
        n: 'Dinero, consumidor y comercio', ic: 'shield', items: [
          { t: 'info', ic: 'shield', title: 'Tu bolsillo', txt: 'El **dinero** es medio de cambio, unidad de cuenta y depósito de valor. Los **bancos** captan ahorros y prestan, cobrando **intereses**; la **CAE** permite comparar créditos. La **Ley del Consumidor** protege la información veraz, la **garantía legal** y el **retracto**, y el **SERNAC** defiende a los consumidores. Chile exporta sobre todo **cobre** y tiene muchos **tratados de libre comercio**.' },
          P('Une cada función del dinero con su ejemplo', [['Medio de cambio', 'Pagar el pan con monedas'], ['Unidad de cuenta', 'Comparar precios en pesos'], ['Depósito de valor', 'Guardar dinero para usarlo después']], 'El dinero superó las dificultades del trueque.'),
          M('El principal problema del trueque era que:', ['Se necesitaba una doble coincidencia: que el otro quisiera lo que uno ofrecía', 'Era ilegal', 'Lo controlaba el Banco Central', 'Cobraba intereses'], 'El dinero facilitó los intercambios.'),
          M('La CAE (Carga Anual Equivalente) sirve para:', ['Comparar el costo total de distintos créditos, en porcentaje anual', 'Calcular el sueldo líquido', 'Medir la inflación', 'Saber cuántos impuestos se pagan'], 'Incluye intereses, comisiones y seguros: mientras más baja, más barato es el crédito.'),
          M('Si pides $100.000 prestados con un interés simple de 10 % anual, al cabo de un año deberás pagar:', ['$110.000', '$100.000', '$10.000', '$200.000'], '100.000 más el 10 % de 100.000.'),
          M('Pagar solo el monto mínimo de una tarjeta de crédito:', ['Hace que la deuda genere intereses y crezca', 'Elimina la deuda', 'Es gratis', 'Baja la tasa de interés'], 'Es una de las principales causas de sobreendeudamiento.'),
          M('El derecho a retracto permite al consumidor:', ['Arrepentirse de una compra a distancia, como por internet, dentro de un plazo', 'Devolver cualquier producto usado después de un año', 'No pagar sus deudas', 'Exigir descuentos'], 'En las compras a distancia, el plazo es de 10 días.'),
          M('Según la Ley del Consumidor, si un producto nuevo sale defectuoso, la garantía legal permite elegir entre:', ['Cambiarlo, repararlo o recibir la devolución del dinero', 'Solo repararlo', 'Solo cambiarlo, si la tienda acepta', 'Nada, si no se tiene boleta'], 'Es la "triple opción", que hoy rige por seis meses.'),
          M('El SERNAC es:', ['El Servicio Nacional del Consumidor, que informa y protege a los consumidores', 'Un banco estatal', 'El servicio de impuestos', 'Una AFP'], 'Recibe reclamos y puede llevar casos a tribunales.'),
          X('¿Cuáles son buenas prácticas de finanzas personales? Marca todas.', ['Hacer un presupuesto de ingresos y gastos', 'Ahorrar una parte del ingreso', 'Comparar la CAE antes de pedir un crédito', 'Pedir créditos para pagar otras deudas sin límite'], [0, 1, 2], 'El endeudamiento debe ser responsable y proporcional a los ingresos.'),
          M('Si sube el precio del dólar (el peso se deprecia), lo esperable es que:', ['Se encarezcan los productos importados y ganen los exportadores', 'Bajen los precios de los importados', 'Pierdan los exportadores', 'No cambie nada'], 'Por eso el tipo de cambio afecta a la inflación.'),
          T('El cobre es el principal producto de exportación de Chile.', true, 'Representa cerca de la mitad de las exportaciones.'),
          M('Los tratados de libre comercio (TLC) que ha firmado Chile buscan:', ['Reducir o eliminar aranceles para facilitar el comercio', 'Prohibir las importaciones', 'Subir los impuestos al consumo', 'Fijar los precios internos'], 'Chile tiene TLC con EE.UU., China y la Unión Europea, entre muchos otros.'),
        ],
      },
    ],
  });

  // ---------- Geografía ----------
  RB.unit('h18', {
    name: 'Geografía de Chile', desc: 'Territorio tricontinental, mar y regiones, relieve y zonas naturales, población y migración, riesgos naturales y desafíos ambientales.', ic: 'map', area: 'Geografía',
    lessons: [
      {
        n: 'Territorio y regiones', ic: 'map', items: [
          { t: 'info', ic: 'map', title: 'Territorio', txt: 'Chile es **tricontinental**: tiene territorio en **América**, en **Oceanía** (Rapa Nui) y en la **Antártica**. Su **mar territorial** llega a las **12 millas** y su **Zona Económica Exclusiva**, a las **200 millas**. Tiene **16 regiones** (la última, **Ñuble**, en 2018) y, desde **2021**, **gobernadores regionales** electos.' },
          M('Se dice que Chile es tricontinental porque tiene territorio en:', ['América, Oceanía y la Antártica', 'América, Europa y Asia', 'América, África y Oceanía', 'Solo en Sudamérica'], 'Rapa Nui está en Oceanía, y el Territorio Chileno Antártico, en la Antártica.'),
          M('La Zona Económica Exclusiva (ZEE) de Chile se extiende hasta:', ['200 millas marinas desde la costa', '12 millas', '24 millas', '1.000 millas'], 'En ella, Chile tiene derechos exclusivos para explotar los recursos, como la pesca.'),
          M('El mar territorial, donde el Estado tiene plena soberanía, se extiende hasta:', ['12 millas marinas', '200 millas', '50 millas', '5 millas'], 'Luego vienen la zona contigua (24 millas) y la ZEE (200 millas).'),
          M('El Tratado Antártico (1959), del que Chile es parte, establece que la Antártica:', ['Se usa solo con fines pacíficos y científicos, y congela los reclamos territoriales', 'Pertenece a Chile', 'Puede usarse para pruebas nucleares', 'Se divide entre los países más cercanos'], 'Chile mantiene su reclamación sobre el Territorio Chileno Antártico.'),
          M('Chile tiene actualmente:', ['16 regiones', '13 regiones', '15 regiones', '20 regiones'], 'La más reciente es Ñuble, creada en 2018.'),
          O('Ordena estas regiones de norte a sur', ['Arica y Parinacota', 'Coquimbo', 'Metropolitana', 'Biobío', 'Los Lagos', 'Magallanes'], 'El territorio continental se extiende por más de 4.000 km.'),
          M('La descentralización busca:', ['Traspasar poder y recursos desde el gobierno central a las regiones y comunas', 'Concentrar todo en Santiago', 'Eliminar las regiones', 'Fusionar los municipios'], 'Un paso importante fue la elección de gobernadores regionales desde 2021.'),
          M('Una región natural se define por:', ['Características físicas comunes, como el clima, el relieve o la vegetación', 'Límites administrativos fijados por ley', 'El número de habitantes', 'La cantidad de comunas'], 'Las regiones político-administrativas, en cambio, se definen por ley.'),
          P('Une cada zona natural con una característica', [['Norte Grande', 'Desierto de Atacama, clima desértico'], ['Norte Chico', 'Valles transversales, clima semiárido'], ['Zona Central', 'Clima mediterráneo, mayor población'], ['Zona Sur', 'Clima templado lluvioso y bosques'], ['Zona Austral', 'Fiordos, canales y clima frío']], 'Cada zona tiene formas de vida y actividades distintas.'),
          M('Las cuatro grandes formas de relieve del Chile central, de oeste a este, son:', ['Planicies litorales, cordillera de la Costa, depresión intermedia y cordillera de los Andes', 'Desierto, selva, montaña y costa', 'Fiordos, glaciares, islas y volcanes', 'Valles, mesetas, llanos y deltas'], 'En la depresión intermedia se concentran ciudades y agricultura.'),
        ],
      },
      {
        n: 'La población', ic: 'people', items: [
          { t: 'info', ic: 'people', title: 'Población', txt: 'La población es mayoritariamente **urbana** (cerca del 88 %) y se concentra en la **zona central**: la **Región Metropolitana** reúne cerca del **40 %**. Chile **envejece** por la **baja natalidad** y la mayor **esperanza de vida**. La **inmigración** reciente (Venezuela, Perú, Colombia, Haití, Bolivia) ha diversificado al país.' },
          M('La mayor parte de la población de Chile vive en:', ['Zonas urbanas', 'Zonas rurales', 'La Antártica', 'Rapa Nui'], 'Cerca del 88 % de la población es urbana.'),
          M('¿Qué región concentra cerca del 40 % de la población del país?', ['La Región Metropolitana', 'La Región de Antofagasta', 'La Región de Magallanes', 'La Región de Ñuble'], 'Esta concentración refleja el centralismo.'),
          M('El envejecimiento de la población chilena se explica por:', ['La baja de la natalidad y el aumento de la esperanza de vida', 'El aumento de la natalidad', 'La disminución de la esperanza de vida', 'La emigración de adultos mayores'], 'Esto plantea desafíos en pensiones y salud.'),
          M('Una pirámide de población de base angosta y cima ancha corresponde a una población:', ['Envejecida (pirámide regresiva)', 'Muy joven (pirámide progresiva)', 'Con alta natalidad', 'Sin adultos mayores'], 'Chile avanza hacia una pirámide cada vez más regresiva.'),
          M('La tasa de natalidad mide:', ['El número de nacimientos por cada mil habitantes en un año', 'El número de muertes', 'La cantidad de inmigrantes', 'La edad promedio'], 'La tasa de mortalidad mide las defunciones por cada mil habitantes.'),
          M('El crecimiento natural (o vegetativo) de una población es:', ['La diferencia entre nacimientos y defunciones', 'La suma de inmigrantes y emigrantes', 'El total de habitantes', 'La población urbana'], 'Si se suma el saldo migratorio, se obtiene el crecimiento total.'),
          N('Una comuna tiene 50.000 habitantes y una superficie de 100 km². ¿Cuál es su densidad de población?', 500, 'hab/km²', '50.000 / 100 = 500 habitantes por km².'),
          M('En los últimos años, la inmigración a Chile ha provenido principalmente de:', ['Venezuela, Perú, Colombia, Haití y Bolivia', 'Europa del norte', 'Australia y Nueva Zelanda', 'China y Japón'], 'Los migrantes aportan al trabajo, la cultura y la diversidad del país.'),
          T('La fecundidad en Chile está por debajo del nivel de reemplazo generacional (2,1 hijos por mujer).', true, 'Por eso la población envejece.'),
          M('La transición demográfica describe el paso de:', ['Altas tasas de natalidad y mortalidad a tasas bajas de ambas', 'Población urbana a rural', 'Población joven a población infantil', 'Baja a alta mortalidad'], 'Primero baja la mortalidad y después la natalidad.'),
          M('La segregación socioespacial en las ciudades se refiere a:', ['La separación de los grupos sociales en distintos barrios según su nivel de ingreso', 'La división de la ciudad en comunas', 'El tráfico vehicular', 'La construcción de edificios'], 'Afecta el acceso a servicios, áreas verdes y transporte.'),
        ],
      },
      {
        n: 'Riesgos naturales y medio ambiente', ic: 'bolt', items: [
          { t: 'info', ic: 'bolt', title: 'Riesgos y ambiente', txt: 'Chile está en el **Cinturón de Fuego del Pacífico**: la **placa de Nazca** se hunde bajo la **Sudamericana** (subducción) y genera **terremotos**, **tsunamis** y **volcanes**. También hay aluviones, **sequía** e **incendios forestales**. **Riesgo = amenaza × vulnerabilidad**. Problemas ambientales: escasez hídrica, contaminación del aire, **zonas de sacrificio** y basura. Instituciones: **Ministerio del Medio Ambiente**, **SEIA** y **SENAPRED**.' },
          M('Chile tiene muchos terremotos porque:', ['La placa de Nazca se hunde bajo la placa Sudamericana (subducción)', 'Está cerca del Polo Sur', 'Tiene mucho desierto', 'Tiene muchas ciudades'], 'Chile forma parte del Cinturón de Fuego del Pacífico.'),
          M('El riesgo de desastre depende de:', ['La amenaza natural y la vulnerabilidad de la población', 'Solo de la fuerza del fenómeno natural', 'Solo de la suerte', 'Solo del número de habitantes'], 'Un mismo sismo causa más daño donde hay viviendas precarias o falta preparación.'),
          P('Une cada amenaza con un ejemplo en Chile', [['Terremoto', '27F de 2010 (magnitud 8,8)'], ['Erupción volcánica', 'Volcán Chaitén (2008)'], ['Aluvión', 'Atacama (2015)'], ['Incendio forestal', 'Valparaíso y Viña del Mar (2024)']], 'Chile enfrenta múltiples amenazas naturales.'),
          M('El organismo del Estado encargado de la prevención y respuesta ante desastres es:', ['SENAPRED (ex ONEMI)', 'El SII', 'El SERNAC', 'La Contraloría'], 'Coordina alertas, evacuaciones y la gestión del riesgo.'),
          T('Un tsunami puede producirse después de un terremoto con epicentro en el mar.', true, 'Ante un sismo fuerte en la costa, hay que evacuar hacia zonas altas.'),
          M('Una "zona de sacrificio" es:', ['Un territorio con alta concentración de industrias contaminantes que afectan la salud de la población', 'Un parque nacional', 'Una zona sin habitantes', 'Una reserva indígena'], 'Un caso conocido es Quintero-Puchuncaví.'),
          M('La contaminación del aire en ciudades del sur, como Temuco, se debe principalmente a:', ['El uso de leña húmeda para calefacción', 'Las fábricas de automóviles', 'Los volcanes', 'El mar'], 'Por eso hay planes de descontaminación y restricciones al uso de leña.'),
          M('El Sistema de Evaluación de Impacto Ambiental (SEIA) sirve para:', ['Evaluar si un gran proyecto, como una mina, cumple las normas ambientales antes de construirse', 'Cobrar impuestos', 'Organizar elecciones', 'Fijar el precio del agua'], 'Lo administra el Servicio de Evaluación Ambiental.'),
          X('¿Cuáles son problemas ambientales importantes en Chile? Marca todos.', ['La escasez hídrica y la megasequía', 'La contaminación del aire en ciudades', 'La pérdida de bosque nativo', 'El exceso de glaciares en el norte'], [0, 1, 2], 'También la basura plástica y la contaminación del mar.'),
          M('La Ley REP (Responsabilidad Extendida del Productor) busca:', ['Que los productores se hagan cargo de los residuos de sus productos, fomentando el reciclaje', 'Prohibir toda la industria', 'Cobrar más impuestos a los consumidores', 'Construir más vertederos'], 'Se aplica a envases, neumáticos, aparatos electrónicos y otros productos.'),
        ],
      },
    ],
  });
})();
