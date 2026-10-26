# Lectura en voz alta de las preguntas rápidas con fórmulas: así las diría un profesor.
# La clave es el texto tal como aparece en el video (sin ** ni ==); si el texto cambia, la clave deja de
# coincidir y tools/voz.py avisa para escribir la versión hablada nueva.
FIJO = {
    'Una especie tiene 2n = 8. ¿Cuántos cromosomas tiene cada uno de sus gametos?':
        'Una especie tiene dos ene igual a ocho. ¿Cuántos cromosomas tiene cada uno de sus gametos?',
    'La meiosis reduce el número a la mitad: n = 4. Al fecundar, 4 + 4 recupera los 8.':
        'La meiosis reduce el número a la mitad: ene igual a cuatro. Al fecundar, cuatro más cuatro recupera los ocho.',
    'En Aa × Aa, solo una de las cuatro combinaciones del cuadro de Punnett es aa.':
        'Al cruzar dos heterocigotos, solo una de las cuatro combinaciones del cuadro de Pánet es homocigota recesiva: a minúscula, a minúscula.',
    'Cada uno puede aportar su alelo o el alelo i: pueden salir hijos AB, A, B u O.':
        'Cada uno puede aportar su alelo o el alelo i minúscula: pueden salir hijos a be, a, be, u o.',
    'λ = v/f = 340/170 = 2 m.':
        'La longitud de onda es la rapidez dividida por la frecuencia: trescientos cuarenta dividido por ciento setenta, dos metros.',
    'Gritas frente a un cerro y oyes el eco 2 s después. Con v = 340 m/s, ¿a qué distancia está el cerro?':
        'Gritas frente a un cerro y oyes el eco dos segundos después. Si el sonido viaja a trescientos cuarenta metros por segundo, ¿a qué distancia está el cerro?',
    'Pierde 5 m/s cada segundo: 30/5 = 6 s.':
        'Pierde cinco metros por segundo cada segundo: treinta dividido por cinco, seis segundos.',
    'Un móvil va a 6 m/s constantes durante 5 s. Según el área bajo su gráfico v-t, ¿cuánto se desplazó?':
        'Un móvil va a seis metros por segundo constantes durante cinco segundos. Según el área bajo su gráfico de velocidad y tiempo, ¿cuánto se desplazó?',
    'Pitágoras: √(36 + 64) = 10 N.':
        'Por Pitágoras: la raíz de treinta y seis más sesenta y cuatro, que es diez níutons.',
    'v = √(2 · 10 · 45) = √900 = 30 m/s.':
        'La rapidez es la raíz de dos por diez por cuarenta y cinco, o sea, la raíz de novecientos: treinta metros por segundo.',
    '¿Cuánto calor se necesita para calentar 100 g de agua en 30 °C? (c = 1 cal/g°C)':
        '¿Cuánto calor se necesita para calentar cien gramos de agua en treinta grados? El calor específico del agua es una caloría por gramo y por grado.',
    'Q = 100 · 1 · 30 = 3.000 cal.':
        'El calor es cien por uno por treinta: tres mil calorías.',
    'Un sismo tiene magnitud 7,5. En Santiago se sintió con intensidad VI y en Valparaíso con VII. ¿Es posible?':
        'Un sismo tiene magnitud siete coma cinco. En Santiago se sintió con intensidad seis, y en Valparaíso, con intensidad siete. ¿Es posible?',
    '(104 − 100) / 100 · 100 = 4 %.':
        'Ciento cuatro menos cien, dividido por cien, y por cien: cuatro por ciento.',
    '¿Cuánto vale −3² + (−3)²?':
        '¿Cuánto vale menos tres al cuadrado, más menos tres entre paréntesis, al cuadrado?',
    '−3² = −9 porque el exponente afecta solo al 3; (−3)² = 9. La suma es 0.':
        'Menos tres al cuadrado es menos nueve, porque el exponente afecta solo al tres. En cambio, menos tres entre paréntesis, al cuadrado, es nueve. La suma es cero.',
    '¿Qué número está entre 1/3 y 1/2?':
        '¿Qué número está entre un tercio y un medio?',
    '1/3 ≈ 0,33 y 1/2 = 0,5. 2/5 = 0,4 está entre ellos.':
        'Un tercio es aproximadamente cero coma treinta y tres, y un medio es cero coma cinco. Dos quintos, que es cero coma cuatro, está entre ellos.',
    '20.000 · 0,7 = 14.000. Los $6.000 son el descuento, no el precio final.':
        'Veinte mil por cero coma siete da catorce mil. Los seis mil pesos son el descuento, no el precio final.',
    'Velocidad y tiempo son inversamente proporcionales: 80 · 3 = 240 km, y 240 : 120 = 2 horas.':
        'Velocidad y tiempo son inversamente proporcionales: ochenta por tres da doscientos cuarenta kilómetros, y doscientos cuarenta dividido por ciento veinte da dos horas.',
    '¿Cuánto es 3⁻¹ + 3⁻²?':
        '¿Cuánto es tres elevado a menos uno, más tres elevado a menos dos?',
    '3⁻¹ = 1/3 y 3⁻² = 1/9. La suma es 3/9 + 1/9 = 4/9.':
        'Tres elevado a menos uno es un tercio, y tres elevado a menos dos es un noveno. La suma es tres novenos más un noveno: cuatro novenos.',
    '¿Entre qué enteros consecutivos está √30?':
        '¿Entre qué enteros consecutivos está la raíz de treinta?',
    '5² = 25 y 6² = 36; como 25 < 30 < 36, √30 está entre 5 y 6.':
        'Cinco al cuadrado es veinticinco, y seis al cuadrado es treinta y seis. Como treinta está entre veinticinco y treinta y seis, la raíz de treinta está entre cinco y seis.',
    '¿Cuánto es (x + 3)(x − 7)?':
        '¿Cuánto es equis más tres, por equis menos siete?',
    'La suma de 3 y −7 es −4 y su producto es −21.':
        'La suma de tres y menos siete es menos cuatro, y su producto es menos veintiuno.',
    'Si x − y = 3 y x + y = 8, ¿cuánto vale x² − y²?':
        'Si equis menos i griega es tres, y equis más i griega es ocho, ¿cuánto vale equis al cuadrado menos i griega al cuadrado?',
    'x² − y² = (x + y)(x − y) = 8 · 3 = 24.':
        'Equis al cuadrado menos i griega al cuadrado es equis más i griega, por equis menos i griega: ocho por tres, veinticuatro.',
    'Si 2x − 3 = 9, ¿cuánto vale 4x + 1?':
        'Si dos equis menos tres es igual a nueve, ¿cuánto vale cuatro equis más uno?',
    'x = 6, así que 4 · 6 + 1 = 25. Ojo: la pregunta no pide x.':
        'Equis vale seis, así que cuatro por seis más uno es veinticinco. Ojo: la pregunta no pide equis.',
    '¿Cuál es el menor entero que cumple 3x − 2 > 10?':
        '¿Cuál es el menor entero que cumple que tres equis menos dos es mayor que diez?',
    '3x > 12 → x > 4. El 4 no sirve porque la desigualdad es estricta: el menor entero es 5.':
        'Tres equis es mayor que doce, entonces equis es mayor que cuatro. El cuatro no sirve, porque la desigualdad es estricta: el menor entero es cinco.',
    'Resuelve: 2x + y = 7 · x − y = 2':
        'Resuelve el sistema: dos equis más i griega igual a siete, y equis menos i griega igual a dos.',
    'Sumando: 3x = 9, así que x = 3, y luego y = 7 − 6 = 1.':
        'Sumando las ecuaciones queda tres equis igual a nueve, así que equis vale tres. Luego, i griega es siete menos seis: uno.',
    '¿Cuántas soluciones tiene x + y = 3 · 2x + 2y = 6?':
        '¿Cuántas soluciones tiene el sistema: equis más i griega igual a tres, y dos equis más dos i griega igual a seis?',
    '¿Dónde corta la recta y = 3x − 6 al eje x?':
        '¿Dónde corta la recta i griega igual a tres equis menos seis al eje equis?',
    'En el eje x, y = 0: 3x − 6 = 0 → x = 2.':
        'En el eje equis, i griega vale cero: tres equis menos seis igual a cero, entonces equis vale dos.',
    '¿Cuáles son las soluciones de x² + 2x − 15 = 0?':
        '¿Cuáles son las soluciones de equis al cuadrado más dos equis menos quince igual a cero?',
    'Buscamos dos números que multiplicados den −15 y sumados den 2: 5 y −3. Entonces (x + 5)(x − 3) = 0.':
        'Buscamos dos números que multiplicados den menos quince y sumados den dos: cinco y menos tres. Entonces, equis más cinco, por equis menos tres, es igual a cero.',
    '¿Cuál es el valor mínimo de f(x) = x² + 6x + 10?':
        '¿Cuál es el valor mínimo de efe de equis igual a equis al cuadrado más seis equis más diez?',
    'xᵥ = −6/2 = −3 y f(−3) = 9 − 18 + 10 = 1.':
        'La equis del vértice es menos seis dividido por dos: menos tres. Y efe de menos tres es nueve menos dieciocho más diez: uno.',
    'Los tramos forman un ángulo recto: es el trío 6-8-10.':
        'Los tramos forman un ángulo recto: es el trío seis, ocho, diez.',
    'El factor es 1,1, así que el área se multiplica por 1,1² = 1,21: aumenta 21 %.':
        'El factor es uno coma uno, así que el área se multiplica por uno coma uno al cuadrado, que es uno coma veintiuno: aumenta un veintiuno por ciento.',
    '¿Cuál es la reflexión de (3, 5) respecto del eje y?':
        '¿Cuál es la reflexión del punto tres, cinco, respecto del eje i griega?',
    'P = (1, 2) se refleja respecto del eje x y luego respecto del eje y. ¿Dónde queda?':
        'El punto uno, dos se refleja respecto del eje equis, y luego respecto del eje i griega. ¿Dónde queda?',
    'Eje x: (1, −2). Luego eje y: (−1, −2). Equivale a una rotación de 180°.':
        'Respecto del eje equis queda en uno, menos dos. Luego, respecto del eje i griega, en menos uno, menos dos. Equivale a una rotación de ciento ochenta grados.',
    'Una maqueta a escala 1 : 50 mide 40 cm de alto. ¿Cuánto mide el edificio real?':
        'Una maqueta a escala uno es a cincuenta mide cuarenta centímetros de alto. ¿Cuánto mide el edificio real?',
    '40 · 50 = 2.000 cm, que son 20 m.':
        'Cuarenta por cincuenta da dos mil centímetros, que son veinte metros.',
    'La mediana de 3, 9, 1, 7, 5 es:':
        'La mediana de los datos tres, nueve, uno, siete y cinco es:',
    'Si Q1 = 20 y Q3 = 35, ¿cuál es el rango intercuartil?':
        'Si el primer cuartil es veinte y el tercer cuartil es treinta y cinco, ¿cuál es el rango intercuartil?',
    'Rango intercuartil = Q3 − Q1 = 35 − 20 = 15.':
        'El rango intercuartil es el tercer cuartil menos el primero: treinta y cinco menos veinte, quince.',
    'Hay 6 combinaciones que suman 7 de un total de 36: 6/36 = 1/6.':
        'Hay seis combinaciones que suman siete, de un total de treinta y seis: seis de treinta y seis, o sea, un sexto.',
    'Primera roja: 4/10. Queda 3 rojas de 9: 3/9. Producto: 12/90 = 2/15.':
        'La primera roja: cuatro de diez. Quedan tres rojas de nueve: tres novenos. El producto es doce noventavos, o sea, dos quinceavos.',
    '√0,25 = 0,5, que es racional.':
        'La raíz de cero coma veinticinco es cero coma cinco, que es racional.',
    'Al racionalizar 2/(√3 + 1) se obtiene:':
        'Al racionalizar dos dividido por raíz de tres más uno, se obtiene:',
    'Multiplicando por (√3 − 1): 2(√3 − 1)/(3 − 1) = √3 − 1.':
        'Multiplicando arriba y abajo por raíz de tres menos uno, queda dos por raíz de tres menos uno, dividido por tres menos uno: raíz de tres menos uno.',
    'Si log 2 ≈ 0,30, ¿cuánto es aproximadamente log 8?':
        'Si el logaritmo de dos es aproximadamente cero coma treinta, ¿cuánto es aproximadamente el logaritmo de ocho?',
    'log 8 = log 2³ = 3 · log 2 ≈ 0,90.':
        'El logaritmo de ocho es el logaritmo de dos al cubo, o sea, tres por el logaritmo de dos: aproximadamente cero coma noventa.',
    '2ᵗ = 32 = 2⁵, así que t = 5 años.':
        'Dos elevado a te es treinta y dos, que es dos elevado a cinco, así que te es cinco años.',
    '¿Cuál es la inversa de f(x) = x³?':
        '¿Cuál es la inversa de efe de equis igual a equis al cubo?',
    'La raíz cúbica deshace el cubo: ∛(x³) = x.':
        'La raíz cúbica deshace el cubo: la raíz cúbica de equis al cubo es equis.',
    'En 2 · 3ˣ la variable está en el exponente.':
        'En dos por tres elevado a equis, la variable está en el exponente.',
    '¿Cuánto vale cos 60°?':
        '¿Cuánto vale el coseno de sesenta grados?',
    'cos 60° = sen 30° = 1/2.':
        'El coseno de sesenta grados es igual al seno de treinta grados: un medio.',
    'Una homotecia de centro en el origen transforma (2, 3) en (6, 9). ¿Cuál es la razón?':
        'Una homotecia con centro en el origen transforma el punto dos, tres, en el punto seis, nueve. ¿Cuál es la razón?',
    'No importa el orden: C(5, 3) = 5!/(3! · 2!) = 10.':
        'No importa el orden: son combinaciones de cinco elementos tomados de a tres. Cinco factorial, dividido por tres factorial por dos factorial, da diez.',
    'Se restringe a las 18 mujeres: 12/18 = 2/3.':
        'Se restringe a las dieciocho mujeres: doce de dieciocho, o sea, dos tercios.',
    'Fuera de 160–180 queda el 32 %, repartido en dos colas iguales: 16 % arriba.':
        'Fuera del rango entre ciento sesenta y ciento ochenta queda el treinta y dos por ciento, repartido en dos colas iguales: un dieciséis por ciento arriba.',
    'El hierro-56 tiene Z = 26. ¿Cuántos neutrones tiene?':
        'El hierro cincuenta y seis tiene zeta igual a veintiséis. ¿Cuántos neutrones tiene?',
    'Neutrones = A − Z = 56 − 26 = 30.':
        'Los neutrones son a menos zeta: cincuenta y seis menos veintiséis, treinta.',
    '¿Cuántos electrones de valencia tiene el oxígeno (1s² 2s² 2p⁴)?':
        '¿Cuántos electrones de valencia tiene el oxígeno, de configuración uno ese dos, dos ese dos, dos pe cuatro?',
    'El último nivel es el 2: 2s² 2p⁴ suman 6 electrones.':
        'El último nivel es el dos: dos ese dos y dos pe cuatro suman seis electrones.',
    'Un elemento termina su configuración en 4s¹. ¿Dónde está?':
        'Un elemento termina su configuración en cuatro ese uno. ¿Dónde está?',
    'El nivel 4 indica el período y 1 electrón en s indica el grupo 1: es el potasio.':
        'El nivel cuatro indica el período, y un electrón en ese indica el grupo uno: es el potasio.',
    'H y Cl son no metales con distinta electronegatividad: comparten de forma desigual.':
        'El hidrógeno y el cloro son no metales con distinta electronegatividad: comparten de forma desigual.',
    '¿Por qué el agua hierve a 100 °C, mucho más que el H₂S, que es parecido?':
        '¿Por qué el agua hierve a cien grados, mucho más que el hache dos ese, que es parecido?',
    '¿Cuál es la masa molar del CO₂? (C = 12, O = 16)':
        '¿Cuál es la masa molar del ce o dos, si el carbono tiene masa doce y el oxígeno, dieciséis?',
    '12 + 2 · 16 = 44 g/mol.':
        'Doce más dos por dieciséis: cuarenta y cuatro gramos por mol.',
    '¿Cuántos gramos de NaOH (40 g/mol) hay que pesar para 1 L de disolución 0,5 M?':
        '¿Cuántos gramos de hidróxido de sodio, de masa molar cuarenta gramos por mol, hay que pesar para un litro de disolución cero coma cinco molar?',
    '0,5 mol · 40 g/mol = 20 g.':
        'Cero coma cinco moles por cuarenta gramos por mol: veinte gramos.',
    '¿Qué grupo funcional tiene el etanol, CH₃–CH₂–OH?':
        '¿Qué grupo funcional tiene el etanol, ce hache tres, ce hache dos, o hache?',
    'El grupo –OH es el hidroxilo, característico de los alcoholes.':
        'El grupo o hache es el hidroxilo, característico de los alcoholes.',
    'El 1-buteno y el 2-buteno solo difieren en dónde está el enlace doble. ¿Qué tipo de isómeros son?':
        'El uno buteno y el dos buteno solo difieren en dónde está el enlace doble. ¿Qué tipo de isómeros son?',
    'C + 2(−2) = 0, así que C = +4.':
        'El carbono más dos veces menos dos debe dar cero, así que el carbono tiene estado de oxidación más cuatro.',
    'Una disolución tiene pH 3. ¿Cómo es?':
        'Una disolución tiene pe hache tres. ¿Cómo es?',
    '10.000 → 1.000 en los primarios → 100 en los secundarios.':
        'De diez mil, pasan unas mil a los consumidores primarios, y unas cien a los secundarios.',
}
