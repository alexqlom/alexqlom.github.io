#!/usr/bin/env python3
# Escribe un prompt por video de Historia para hacerlo con Remotion en otra sesión, con la voz de Fernando
# Martínez (ElevenLabs). Cada prompt trae la narración exacta de cada escena (la misma que se grabó), lo que se ve
# en ella (escenario, personajes, objetos, textos, mapas) atado a la palabra en que ocurre, las preguntas, las
# banderas y la época correctas, y el texto listo para generar la voz en la web.
# Uso: python3 tools/prompts-historia.py [carpeta]     (por defecto, prompts-historia/)
import json, math, os, re, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import habla

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOZ_ID = 'dlGxemPxFMTY7iXagmOj'   # Fernando Martínez (biblioteca de voces de ElevenLabs, español latino)
MAXC = 2400                       # caracteres por generación en la web

# ---------- Vocabulario de los guiones ----------

ESCENARIO = {
    'stage': 'fondo de presentación oscuro con luces de escenario', 'plain': 'fondo liso oscuro, limpio, para gráficos',
    'street': 'calle de ciudad', 'parliament': 'sala de sesiones de un congreso o parlamento', 'chile': 'fondo para el mapa',
    'class': 'sala de clases', 'office': 'oficina', 'market': 'mercado o feria', 'paper': 'mesa con documentos y papel antiguo',
    'night': 'ciudad de noche', 'factory': 'fábrica', 'cabildo': 'sala del cabildo colonial', 'palace': 'salón de un palacio',
    'desert': 'desierto (pampa del norte)', 'battle': 'campo de batalla', 'sea': 'mar abierto', 'home': 'interior de una casa',
    'south': 'paisaje del sur de Chile (bosque, volcán, lluvia)', 'city': 'ciudad', 'farm': 'campo con cultivos',
    'colonial': 'calle colonial (casas de adobe y tejas, cordillera al fondo)', 'field': 'campo abierto',
    'country': 'paisaje rural', 'church': 'interior de una iglesia', 'snow': 'paisaje nevado', 'library': 'biblioteca',
    'port': 'puerto con barcos', 'andes': 'cordillera de los Andes', 'mine': 'interior de una mina', 'plaza': 'Plaza de Armas',
    'trench': 'trinchera', 'space': 'espacio exterior', 'forest': 'bosque', 'road': 'camino', 'lab': 'laboratorio',
    'clinic': 'consulta médica', 'grid': 'fondo cuadriculado', 'hacienda': 'hacienda (casa patronal y campo)',
}
PERSONAJE = {
    'rey': 'rey (corona, manto, cetro)', 'reina': 'reina (corona, vestido largo, perlas)',
    'noble': 'noble del siglo XVIII (peluca blanca, casaca, monóculo)', 'dama': 'dama de clase alta (vestido largo, perlas)',
    'cura': 'sacerdote (sotana)', 'obispo': 'obispo (sotana morada, solideo)', 'campesino': 'campesino (sombrero de paja, ropa de trabajo)',
    'campesina': 'campesina (trenzas, vestido sencillo)', 'burgues': 'burgués (sombrero de copa, chaleco, bastón)',
    'obrero': 'obrero (overol, gorra)', 'obrera': 'obrera (delantal, moño)', 'nino': 'niño',
    'soldado': 'soldado (uniforme, quepí, fusil)', 'patriota': 'oficial patriota (uniforme de la Independencia)',
    'realista': 'soldado realista (casaca roja, fusil)', 'napoleon': 'Napoleón Bonaparte (bicornio, uniforme de general)',
    'filosofo': 'filósofo de la Ilustración (peluca blanca, casaca, libro)', 'criollo': 'criollo de la élite colonial (levita, patillas)',
    'revolucionario': 'revolucionario francés (gorro frigio, bandera)', 'mapuche': 'hombre mapuche (makuñ o manta, trarilonko)',
    'mapuchef': 'mujer mapuche (küpam, trarilonko, trapelakucha)', 'minero': 'minero (picota)',
    'pampino': 'pampino de las salitreras (sombrero, pala)', 'huaso': 'huaso (chupalla, manta)',
    'presidente': 'presidente (traje oscuro, banda presidencial)', 'diputado': 'parlamentario (traje formal)',
    'juez': 'juez (toga, mazo)', 'profe': 'profesora (lentes)', 'estudiante': 'estudiante (uniforme escolar)',
    'estudianta': 'estudiante (uniforme escolar, cola de caballo)', 'chico': 'joven (polerón)', 'chica': 'joven (polera)',
    'vecino': 'vecino', 'vecina': 'vecina', 'abuelo': 'abuelo (bastón, lentes)', 'vendedor': 'vendedor (delantal)',
    'cientifico': 'científico (delantal blanco)', 'medico': 'médico (delantal)', 'enfermera': 'enfermera',
    'sufragista': 'sufragista (vestido, cartel)', 'militar': 'militar (uniforme de combate, casco, fusil)',
    'oficial': 'oficial militar (gorra de oficial)', 'arbitro': 'árbitro (silbato)', 'jugador': 'futbolista',
    'empresario': 'empresario (traje, maletín)', 'trabajadora': 'trabajadora (casco de obra)', 'lima': 'Lima, la mascota de la app (joven con polera verde lima)',
}
ROPA = {
    'top': {'suit': 'traje', 'coat': 'levita', 'general': 'uniforme de general', 'uniform': 'uniforme', 'robe': 'manto',
            'vest': 'chaleco', 'dress': 'vestido', 'shirt': 'camisa', 'poncho': 'manta', 'tee': 'polera', 'jersey': 'camiseta deportiva',
            'apron': 'delantal', 'cassock': 'sotana', 'gown': 'vestido largo', 'labcoat': 'delantal blanco', 'peasant': 'ropa de trabajo'},
    'hat': {'cap': 'gorra', 'kepi': 'quepí', 'officer': 'gorra de oficial', 'helmet': 'casco', 'crown': 'corona', 'tophat': 'sombrero de copa',
            'bicorne': 'bicornio', 'beret': 'boina', 'zucchetto': 'solideo', 'hard': 'casco de obra', 'band': 'cintillo', 'none': 'sin sombrero',
            'straw': 'sombrero de paja', 'huaso': 'chupalla', 'frigio': 'gorro frigio', 'miner': 'casco de minero'},
    'hr': {'bald': 'calvo', 'wig': 'peluca blanca', 'curly': 'pelo crespo', 'afro': 'pelo afro', 'long': 'pelo largo', 'bun': 'moño',
           'bob': 'melena corta', 'short': 'pelo corto', 'braids': 'trenzas', 'pony': 'cola de caballo'},
    'fh': {'mus': 'bigote', 'beard': 'barba', 'big': 'bigote grande', 'side': 'patillas', 'goatee': 'barba de chivo', 'none': 'afeitado'},
    'acc': {'glasses': 'lentes', 'sash': 'banda presidencial', 'shades': 'lentes oscuros', 'medal': 'medalla', 'pearls': 'perlas', 'monocle': 'monóculo'},
    'hold': {'book': 'libro', 'bag': 'bolso', 'sign': 'cartel', 'hammer': 'martillo', 'cup': 'taza', 'fork': 'tenedor', 'quill': 'pluma',
             'sword': 'espada', 'paper': 'papel', 'phone': 'celular', 'broom': 'escoba', 'musket': 'fusil antiguo', 'cane': 'bastón',
             'shovel': 'pala', 'rifle': 'fusil', 'briefcase': 'maletín', 'mic': 'micrófono', 'gavel': 'mazo', 'scepter': 'cetro', 'pick': 'picota'},
    'sk': {'a': 'tez clara', 'b': 'tez trigueña', 'c': 'tez morena', 'd': 'tez morena oscura', 'e': 'tez oscura'},
}
OBJETO = {
    'doc': 'documento', 'flag': 'bandera', 'cross': 'marca roja de «no» (X)', 'ballotbox': 'urna de votación', 'pricetag': 'etiqueta de precio',
    'ship': 'velero', 'cash': 'billetes', 'factory': 'fábrica', 'school': 'escuela', 'candle': 'vela encendida', 'chartdown': 'gráfico que baja',
    'sack': 'saco', 'house': 'casa', 'chartup': 'gráfico que sube', 'book': 'libro', 'moneybag': 'bolsa de dinero', 'coin': 'moneda',
    'phone': 'celular', 'handshake': 'apretón de manos', 'car': 'auto', 'globe': 'globo terráqueo', 'copper': 'barras de cobre',
    'lock': 'candado', 'heart': 'corazón', 'stall': 'puesto de feria', 'magnifier': 'lupa', 'gavel': 'mazo de juez', 'wheat': 'trigo',
    'crowd': 'multitud', 'box': 'caja', 'bank': 'banco (edificio)', 'scroll': 'pergamino', 'coins': 'monedas', 'congreso': 'edificio del Congreso',
    'dove': 'paloma de la paz', 'bread': 'pan', 'scale': 'balanza', 'bigflag': 'bandera grande', 'train': 'tren', 'piggybank': 'alcancía',
    'clock': 'reloj', 'shield': 'escudo', 'sandwich': 'sándwich', 'bulb': 'ampolleta (idea)', 'books': 'libros', 'sign': 'letrero',
    'calendar': 'calendario', 'tree': 'árbol', 'steamship': 'barco a vapor', 'brokenchain': 'cadena rota', 'megaphone': 'megáfono',
    'creditcard': 'tarjeta de crédito', 'crown': 'corona', 'wall': 'muro', 'tractor': 'tractor', 'receipt': 'boleta', 'rancho': 'rancho campesino',
    'stethoscope': 'estetoscopio', 'question': 'signo de pregunta', 'swords': 'espadas cruzadas', 'people': 'grupo de personas',
    'palace': 'palacio', 'rocket': 'cohete', 'newspaper': 'diario', 'plane': 'avión', 'city': 'ciudad', 'wave': 'ola', 'tank': 'tanque',
    'map': 'mapa de papel', 'volcano': 'volcán', 'house2': 'casa moderna', 'check': 'marca verde de «sí» (✓)', 'tv': 'televisor',
    'hospital': 'hospital', 'cannon': 'cañón', 'island': 'isla', 'ball': 'pelota', 'guillotine': 'guillotina', 'bomb': 'bomba', 'ruler': 'regla',
    'gear': 'engranaje', 'moai': 'moái', 'pizza': 'pizza', 'horse': 'caballo', 'church': 'iglesia', 'conventillo': 'conventillo', 'germ': 'microbio',
    'cake': 'torta', 'trophy': 'trofeo', 'tribunal': 'tribunal (edificio)', 'pin': 'alfiler de mapa', 'chain': 'cadena', 'throne': 'trono',
    'medal': 'medalla', 'mushroom': 'hongo de una explosión nuclear', 'whistle': 'silbato', 'hammer': 'martillo', 'idcard': 'carnet de identidad',
    'star': 'estrella', 'helmet': 'casco militar', 'fire': 'fuego', 'cloud': 'nube', 'barrel': 'barril', 'apple': 'manzana', 'lightning': 'rayo',
    'cart': 'carro de supermercado', 'penguin': 'pingüino', 'mountain': 'montaña', 'sash': 'banda presidencial', 'loom': 'telar',
    'cotton': 'algodón', 'flask': 'matraz', 'castle': 'castillo', 'arrow': 'flecha', 'radio': 'radio', 'wire': 'alambre de púas',
    'table': 'mesa', 'moneda': 'Palacio de La Moneda', 'compass': 'brújula', 'bastille': 'la Bastilla', 'microphone': 'micrófono',
    'satellite': 'satélite', 'eye': 'ojo', 'rabbit': 'conejo', 'cards': 'naipes', 'lamp': 'farol', 'hen': 'gallina', 'laptop': 'notebook',
    'andes': 'cordillera', 'sun': 'sol', 'minecart': 'carro minero', 'key': 'llave', 'question2': 'signo de pregunta', 'engine': 'máquina a vapor',
    'coal': 'carbón', 'rain': 'lluvia', 'grill': 'parrilla', 'desk': 'escritorio', 'bench': 'banca', 'gasmask': 'máscara antigás',
    'fist': 'puño en alto', 'araucaria': 'araucaria', 'sword': 'espada', 'snow': 'copo de nieve', 'house3': 'casa', 'person': 'persona',
}
BANDERA = {
    'cl': 'Chile (la actual, con estrella; existe desde 1817)',
    'chv': 'la Patria Vieja (franjas horizontales azul, blanca y amarilla; usada en Chile de 1812 a 1814)',
    'us': 'Estados Unidos (con las estrellas de la época)',
    'uk': 'Reino Unido (Union Jack; la de 1606, sin la cruz de San Patricio, si es antes de 1801)',
    'fr': 'Francia (tricolor azul, blanco y rojo, desde la Revolución; antes de 1789, la blanca real con flores de lis)',
    'cu': 'Cuba', 'su': 'la Unión Soviética (roja, con hoz, martillo y estrella; 1923–1991)',
    'es': 'España (en la Colonia, la Cruz de Borgoña, aspa roja sobre blanco; la roja y amarilla es nacional desde 1843)',
    'bo': 'Bolivia (roja, amarilla y verde)', 'pe': 'Perú (roja y blanca, vertical)',
    'de': 'Alemania (Imperio alemán hasta 1918: negra, blanca y roja; hoy negra, roja y dorada; nunca la nazi ni la esvástica)',
    'cn': 'China (República Popular, desde 1949)', 'ru': 'Rusia (Imperio ruso antes de 1917: blanca, azul y roja)',
    'blanca': 'bandera blanca', 'in': 'India (desde 1947)', 'eu': 'Unión Europea', 'mapu': 'Wenufoye, la bandera mapuche (creada en 1992: úsala solo para hoy)',
    'ar': 'Argentina', 'be': 'Bélgica', 'jp': 'Japón', 'at': 'Austria (Austria-Hungría, si es antes de 1918)', 'rs': 'Serbia (Reino de Serbia en 1914)',
    'it': 'Italia (el Reino de Italia, 1861–1946, llevaba el escudo de Saboya al centro)', 'un': 'Naciones Unidas', 'br': 'Brasil',
}
PAIS = {
    'USA': 'Estados Unidos', 'VEN': 'Venezuela', 'COL': 'Colombia', 'PER': 'Perú', 'CHL': 'Chile', 'ARG': 'Argentina', 'MEX': 'México',
    'FRA': 'Francia', 'ESP': 'España', 'ITA': 'Italia', 'DEU': 'Alemania', 'BEL': 'Bélgica', 'NLD': 'Países Bajos', 'CHE': 'Suiza',
    'AUT': 'Austria', 'POL': 'Polonia', 'GBR': 'Reino Unido', 'LUX': 'Luxemburgo', 'PRT': 'Portugal', 'NOR': 'Noruega', 'DNK': 'Dinamarca',
    'ISL': 'Islandia', 'CZE': 'Chequia', 'SVK': 'Eslovaquia', 'HUN': 'Hungría', 'ROU': 'Rumania', 'BGR': 'Bulgaria', 'RUS': 'Rusia',
    'UKR': 'Ucrania', 'BLR': 'Bielorrusia', 'LTU': 'Lituania', 'LVA': 'Letonia', 'EST': 'Estonia', 'KOR': 'Corea del Sur',
    'PRK': 'Corea del Norte', 'VNM': 'Vietnam', 'AFG': 'Afganistán', 'IND': 'India', 'PAK': 'Pakistán', 'BGD': 'Bangladés',
    'IDN': 'Indonesia', 'MMR': 'Birmania', 'PHL': 'Filipinas', 'DZA': 'Argelia', 'NGA': 'Nigeria', 'KEN': 'Kenia', 'GHA': 'Ghana',
    'SEN': 'Senegal', 'COD': 'Congo (RD)', 'TZA': 'Tanzania', 'MOZ': 'Mozambique', 'AGO': 'Angola', 'MDG': 'Madagascar', 'MLI': 'Malí',
    'NER': 'Níger', 'TCD': 'Chad', 'BRA': 'Brasil', 'URY': 'Uruguay', 'BOL': 'Bolivia', 'EGY': 'Egipto', 'SDN': 'Sudán', 'UGA': 'Uganda',
    'ZAF': 'Sudáfrica', 'ZWE': 'Zimbabue', 'ZMB': 'Zambia', 'BWA': 'Botsuana', 'MRT': 'Mauritania', 'CIV': 'Costa de Marfil',
    'GIN': 'Guinea', 'BFA': 'Burkina Faso', 'CAF': 'República Centroafricana', 'COG': 'Congo', 'GAB': 'Gabón', 'NAM': 'Namibia',
    'CMR': 'Camerún', 'TGO': 'Togo', 'CHN': 'China', 'SRB': 'Serbia', 'MNE': 'Montenegro', 'HRV': 'Croacia', 'BIH': 'Bosnia',
    'SVN': 'Eslovenia', 'MKD': 'Macedonia', 'TUR': 'Turquía', 'JPN': 'Japón', 'CUB': 'Cuba', 'PRY': 'Paraguay', 'ECU': 'Ecuador',
}
LUGAR = {
    'paris': 'París', 'londres': 'Londres', 'madrid': 'Madrid', 'bayona': 'Bayona', 'viena': 'Viena', 'berlin': 'Berlín', 'roma': 'Roma',
    'moscu': 'Moscú', 'petersburgo': 'San Petersburgo', 'sarajevo': 'Sarajevo', 'waterloo': 'Waterloo', 'lisboa': 'Lisboa', 'cadiz': 'Cádiz',
    'versalles': 'Versalles', 'varsovia': 'Varsovia', 'verdun': 'Verdún', 'normandia': 'Normandía', 'stalingrado': 'Stalingrado',
    'ginebra': 'Ginebra', 'filadelfia': 'Filadelfia', 'washington': 'Washington', 'nuevayork': 'Nueva York', 'habana': 'La Habana',
    'mexico': 'Ciudad de México', 'caracas': 'Caracas', 'bogota': 'Bogotá', 'quito': 'Quito', 'lima': 'Lima', 'buenosaires': 'Buenos Aires',
    'mendoza': 'Mendoza', 'montevideo': 'Montevideo', 'lapaz': 'La Paz', 'sucre': 'Sucre', 'asuncion': 'Asunción',
    'riodejaneiro': 'Río de Janeiro', 'brasilia': 'Brasilia', 'portauprince': 'Puerto Príncipe', 'santiago': 'Santiago',
    'valparaiso': 'Valparaíso', 'concepcion': 'Concepción', 'valdivia': 'Valdivia', 'chiloe': 'Chiloé', 'rancagua': 'Rancagua',
    'chacabuco': 'Chacabuco', 'maipu': 'Maipú', 'lircay': 'Lircay', 'antofagasta': 'Antofagasta', 'iquique': 'Iquique', 'arica': 'Arica',
    'tacna': 'Tacna', 'calama': 'Calama', 'mejillones': 'Mejillones', 'cobija': 'Cobija', 'tocopilla': 'Tocopilla', 'pisagua': 'Pisagua',
    'puntaarenas': 'Punta Arenas', 'fuertebulnes': 'Fuerte Bulnes', 'temuco': 'Temuco', 'angol': 'Angol', 'villarrica': 'Villarrica',
    'puertomontt': 'Puerto Montt', 'copiapo': 'Copiapó', 'laserena': 'La Serena', 'talca': 'Talca', 'chillan': 'Chillán',
    'coyhaique': 'Coyhaique', 'juanfernandez': 'Archipiélago Juan Fernández', 'atacama': 'desierto de Atacama', 'tarapaca': 'Tarapacá',
    'loa': 'río Loa', 'biobio': 'río Biobío', 'tolten': 'río Toltén', 'magallanes': 'Estrecho de Magallanes', 'cabodehornos': 'Cabo de Hornos',
    'hiroshima': 'Hiroshima', 'nagasaki': 'Nagasaki', 'tokio': 'Tokio', 'pekin': 'Pekín', 'pearlharbor': 'Pearl Harbor', 'delhi': 'Delhi',
    'cairo': 'El Cairo', 'ciudaddelcabo': 'Ciudad del Cabo', 'argel': 'Argel', 'congo': 'Congo', 'suez': 'Canal de Suez',
    'estambul': 'Estambul', 'berlinoeste': 'Berlín Occidental', 'argelia': 'Argelia', 'saigon': 'Saigón', 'corea': 'Corea',
    'vietnam': 'Vietnam', 'indochina': 'Indochina', 'india': 'India', 'rapanui': 'Rapa Nui', 'quintero': 'Quintero', 'chaiten': 'Chaitén',
    'vina': 'Viña del Mar', 'cuba': 'Cuba', 'sudafrica': 'Sudáfrica', 'antartica': 'Antártica',
}
ZONA = {
    'LITORAL': 'el litoral boliviano (Antofagasta, boliviano hasta 1879)', 'TARAPACA': 'Tarapacá (peruana hasta 1879)',
    'ARICA': 'Arica', 'TACNA': 'Tacna', 'ARAUCANIA': 'la Araucanía', 'CHILE1810': 'el territorio de Chile en 1810',
    'NORTEGRANDE': 'el Norte Grande', 'NORTECHICO': 'el Norte Chico', 'CENTRO': 'la zona central', 'SUR': 'la zona sur',
    'AUSTRAL': 'la zona austral', 'PATAGONIA_AR': 'la Patagonia argentina', 'R15': 'la Región de Arica y Parinacota',
    'R01': 'la Región de Tarapacá', 'R02': 'la Región de Antofagasta', 'R03': 'la Región de Atacama', 'R04': 'la Región de Coquimbo',
    'R05': 'la Región de Valparaíso', 'R13': 'la Región Metropolitana', 'R06': "la Región de O'Higgins", 'R07': 'la Región del Maule',
    'R16': 'la Región de Ñuble', 'R08': 'la Región del Biobío', 'R09': 'la Región de La Araucanía', 'R14': 'la Región de Los Ríos',
    'R10': 'la Región de Los Lagos', 'R11': 'la Región de Aysén', 'R12': 'la Región de Magallanes',
}
VISTA = {
    'mundo': 'mapamundi', 'atlantico': 'mapa del Atlántico (América y Europa)', 'europa': 'mapa de Europa', 'sudamerica': 'mapa de Sudamérica',
    'amlat': 'mapa de América Latina', 'chile': 'mapa de Chile', 'norte': 'mapa del norte de Chile, el sur del Perú y Bolivia',
    'sur': 'mapa del sur de Chile', 'magallanes': 'mapa de Magallanes y la Patagonia', 'africa': 'mapa de África',
    'asia': 'mapa de Asia', 'pacifico': 'mapa del Pacífico (Asia oriental)',
}
COLOR = {'lime': 'verde lima', 'red': 'rojo', 'blue': 'azul', 'yel': 'amarillo', 'org': 'naranja', 'pur': 'morado', 'purple': 'morado',
         'teal': 'turquesa', 'pink': 'rosado', 'gry': 'gris', 'wht': 'blanco', 'grn': 'verde', 'brn': 'café'}
POSE = {'cheer': 'celebra con los brazos arriba', 'point': 'señala', 'present': 'presenta con la mano abierta', 'fist': 'levanta el puño',
        'vote': 'deposita su voto', 'hips': 'pone las manos en la cintura', 'stop': 'hace el gesto de «alto»', 'hold': 'sostiene algo',
        'up': 'levanta los brazos', 'shrug': 'se encoge de hombros', 'cross': 'se cruza de brazos', 'wave': 'saluda con la mano',
        'hug': 'abraza', 'think': 'se queda pensando', 'facepalm': 'se lleva la mano a la cara', 'arms': 'abre los brazos', 'idle': 'vuelve a su postura',
        'down': 'baja los brazos'}
ANIMO = {'sad': 'se pone triste', 'angry': 'se enoja', 'shock': 'queda impactado', 'worried': 'se preocupa', 'smug': 'sonríe satisfecho',
         'happy': 'se alegra', 'laugh': 'se ríe', 'wow': 'se asombra', 'think': 'se pone pensativo', 'cry': 'llora', 'neutral': 'se calma'}
EMOTE = {'sweat': 'suda (gota de sudor)', 'angry': 'echa humo de enojo', '!': 'se sobresalta (signo de exclamación)', '?': 'duda (signo de pregunta)',
         'zzz': 'se queda dormido («zzz»)', 'star': 'brilla de emoción (estrellitas)', 'heart': 'muestra un corazón', 'idea': 'tiene una idea (ampolleta)',
         'music': 'tararea feliz (notas musicales)', 'money': 'piensa en dinero (signo $)'}
EFECTO = {'confetti': 'confeti', 'smoke': 'humo', 'sparks': 'chispas', 'boom': 'explosión', 'hearts': 'corazones', 'question': 'signos de pregunta',
          'speed': 'líneas de velocidad', 'money': 'billetes volando', 'flash': 'destello', 'notes': 'notas musicales', 'dust': 'polvo',
          'snow': 'nieve', 'stars': 'estrellas', 'rays': 'rayos de luz', 'splash': 'salpicadura', 'rain': 'lluvia'}
ENTRA = {'pop': 'aparece', 'hop': 'aparece de un salto', 'drop': 'cae desde arriba', 'rise': 'sube desde abajo', 'zoom': 'aparece con un acercamiento',
         'spin': 'aparece girando', 'fade': 'aparece de a poco', 'walk': 'entra caminando', 'walkl': 'entra caminando por la izquierda',
         'walkr': 'entra caminando por la derecha', 'slidel': 'entra deslizándose por la izquierda', 'slider': 'entra deslizándose por la derecha',
         'grow': 'crece desde un punto', 'none': 'ya está en escena'}
LADO = {'ll': 'a la izquierda', 'l': 'a la izquierda', 'lc': 'al centro-izquierda', 'c': 'al centro', 'rc': 'al centro-derecha',
        'r': 'a la derecha', 'rr': 'a la derecha'}
FEM = set('bandera marca urna etiqueta fábrica escuela vela casa bolsa moneda lupa multitud caja paloma balanza alcancía ampolleta '
          'cadena tarjeta corona boleta ciudad ola isla pelota guillotina bomba regla pizza iglesia torta medalla estrella nube manzana '
          'montaña banda flecha radio mesa brújula gallina cordillera llave máquina lluvia parrilla banca máscara araucaria espada persona '
          'barras monedas espadas marca'.split())
PLURAL = set('billetes barras monedas libros espadas naipes'.split())
FEM_P = set('reina dama campesina obrera mapuchef estudianta chica vecina enfermera sufragista trabajadora lima profe'.split())
BANDERA_CORTA = {'cl': 'Chile', 'chv': 'la Patria Vieja', 'us': 'Estados Unidos', 'uk': 'el Reino Unido', 'fr': 'Francia', 'cu': 'Cuba',
                 'su': 'la Unión Soviética', 'es': 'España', 'bo': 'Bolivia', 'pe': 'el Perú', 'de': 'Alemania', 'cn': 'China', 'ru': 'Rusia',
                 'blanca': 'paz (blanca)', 'in': 'la India', 'eu': 'la Unión Europea', 'mapu': 'el pueblo mapuche (Wenufoye)', 'ar': 'Argentina',
                 'be': 'Bélgica', 'jp': 'Japón', 'at': 'Austria', 'rs': 'Serbia', 'it': 'Italia', 'un': 'las Naciones Unidas', 'br': 'Brasil'}


def articulo(desc, definido=False):
    w = desc.split()[0] if desc else ''
    if desc.startswith(('la ', 'el ', 'los ', 'las ')) or desc[:1].isupper():
        return desc if desc[:1].islower() else ('el ' + desc if definido else desc)
    pl, fem = w in PLURAL, w in FEM
    a = ('los' if pl and not fem else 'las' if pl else 'la' if fem else 'el') if definido else ('unos' if pl and not fem else 'unas' if pl else 'una' if fem else 'un')
    return f'{a} {desc}'


def plural_verbo(v):
    return {'aparece': 'aparecen', 'cae desde arriba': 'caen desde arriba', 'sube desde abajo': 'suben desde abajo'}.get(v, v.replace('entra ', 'entran ').replace('aparece ', 'aparecen ').replace('crece ', 'crecen '))


def corto(base):
    if base == 'lima':
        return 'Lima'
    return PERSONAJE.get(base, base).split(' (')[0].split(' de ')[0].split(' del ')[0]


# Temas que piden un tono sobrio (sin humor ni efectos alegres).
SOBRIO = re.compile(r'detenid|desaparecid|tortur|ejecutad|asesin|matanza|masacre|genocidio|holocausto|shoá|exterminio|campos de concentraci|'
                    r'bomba at[oó]mica|hiroshima|nagasaki|derechos humanos|dictadura|golpe de estado|bombarde|v[ií]ctimas|muertos|murieron|'
                    r'esclav|ocupaci[oó]n de la araucan|represi|exilio|fusilad', re.I)
COMICO = {'confetti', 'hearts', 'notes', 'money', 'stars', 'speed'}


def node_json(js):
    return json.loads(subprocess.run(['node', '-e', js], capture_output=True, check=True, cwd=ROOT).stdout)


def cargar():
    defs = node_json(r"""
const vm=require('vm'),fs=require('fs');const defs={},heads={};
const w={RB:{toon:(id,d)=>{defs[id]=d;}}};w.window=w;const ctx=vm.createContext({window:w,RB:w.RB});
for(const f of fs.readdirSync('data').filter(f=>/^toon-h\d+\.js$/.test(f))){const s=fs.readFileSync('data/'+f,'utf8');
 const m=/Unidad (\d+): ([^\n]*?)(\.\s|\.$|\n)/.exec(s); if(m) heads['h'+m[1]]=m[2].replace(/\.$/,'');
 vm.runInContext(s,ctx);}
process.stdout.write(JSON.stringify({defs,heads}));""")
    guion = node_json("process.stdout.write(JSON.stringify(require('./tools/guion.js').scripts))")
    dur = {}
    try:
        s = open(os.path.join(ROOT, 'audio', 'indice.js'), encoding='utf-8').read()
        dur = json.loads(s[s.index('{'):s.rindex('}') + 1])
    except OSError:
        pass
    return defs['defs'], defs['heads'], {v['id']: v for v in guion}, dur


# ---------- Palabras de la narración (para anclar cada momento) ----------

def clave(w):
    return habla.word_key(w)


class Narr:
    def __init__(self, textos):
        self.toks = ' '.join(textos).split()
        self.keys = [clave(t) for t in self.toks]

    def busca(self, a):
        """Posición y palabra dicha de un ancla del guion (@palabra, @dos_palabras, @palabra#2, @1810+0.5)."""
        if not a:
            return None, None
        a = re.sub(r'(?<=[^+-])[+-]\d+(\.\d+)?$', '', a) if not re.fullmatch(r'[+-]?\d+(\.\d+)?%?', a) else a
        if a in ('start', 'end') or re.fullmatch(r'\+?\d+(\.\d+)?%?|\d+\.\d+', a) and not any(k == a for k in self.keys):
            return (0 if a == 'start' else 10 ** 6), None
        nth = 1
        m = re.fullmatch(r'(.*)#(\d+)', a)
        if m:
            a, nth = m.group(1), int(m.group(2))
        ws = [clave(x) for x in a.split('_') if clave(x)]
        if not ws:
            return None, None
        found = 0
        for i in range(len(self.keys)):
            if all(i + j < len(self.keys) and (self.keys[i + j] == w or (len(w) >= 3 and self.keys[i + j].startswith(w))) for j, w in enumerate(ws)):
                found += 1
                if found == nth:
                    dicho = ' '.join(self.toks[i:i + len(ws)])
                    return i, dicho.strip('.,;:¿?¡!«»"“”()…')
        return None, None


def lista(xs):
    xs = [x for x in xs if x]
    return xs[0] if len(xs) == 1 else ', '.join(xs[:-1]) + ' y ' + xs[-1] if xs else ''


def paises(codes, anio=None):
    """Países que se pintan en un mapa, con la nota de cómo eran en el año de la escena."""
    cs = codes.split(',')
    nombres = [PAIS.get(c, c) for c in cs]
    s = set(cs)
    nota = []
    en = lambda a, b: anio is None or a <= anio <= b
    if {'AUT', 'HUN'} <= s and en(1867, 1918):
        nota.append('Austria y Hungría, con las tierras checas, eslovacas, croatas, bosnias y eslovenas, formaban Austria-Hungría' if anio else 'Austria y Hungría formaban Austria-Hungría hasta 1918')
    if {'CZE', 'SVK'} <= s and en(1918, 1992):
        nota.append('Chequia y Eslovaquia formaban Checoslovaquia' + ('' if anio else ' entre 1918 y 1992'))
    if {'SRB', 'HRV', 'BIH', 'SVN'} <= s and en(1918, 1991):
        nota.append('Serbia, Croacia, Bosnia y Eslovenia formaban Yugoslavia' + ('' if anio else ' entre 1918 y 1991'))
    if 'RUS' in s and en(1922, 1991):
        nota.append(('Rusia, Ucrania, Bielorrusia y los países bálticos eran' if 'UKR' in s else 'Rusia era') + ' parte de la URSS' + ('' if anio else ' entre 1922 y 1991'))
    elif 'RUS' in s and anio and anio < 1917:
        nota.append('Rusia era el Imperio ruso')
    if 'DEU' in s and anio and 1949 <= anio <= 1990:
        nota.append('Alemania estaba dividida en la RFA y la RDA')
    return lista(nombres) + (f' (en {anio}: ' if anio else ' (con las fronteras de esa época: ') + '; '.join(nota) + ')' if nota else lista(nombres)


def bandera(code):
    return BANDERA.get(code, code)


def icono(ic):
    """Íconos de títulos, resúmenes, líneas de tiempo y cadenas: 'flag:cl', 'doc:1925', '+ship'."""
    ic = str(ic or '').lstrip('+')
    if not ic:
        return ''
    nm, _, arg = ic.partition(':')
    if nm == 'flag':
        return 'bandera de ' + bandera(arg) if arg else 'bandera'
    base = OBJETO.get(nm, nm)
    return f'{base} «{arg}»' if arg else base


# ---------- Una escena ----------

TOK = re.compile(r'"[^"]*"|\S+')


def persona(base, mods):
    """Rol y rasgos de un personaje: los de su tipo y lo que cambia de su ropa (sin repetir)."""
    d = PERSONAJE.get(base, base)
    rol, _, attrs = d.partition(' (')
    attrs = [x.strip() for x in attrs.rstrip(')').split(',') if x.strip()]
    for m in mods:
        k, _, v = m.partition('=')
        x = ROPA.get(k, {}).get(v.split(':')[0])
        if not x or x in rol or (k in ('hat', 'fh') and v.split(':')[0] == 'none') or any(x in a for a in attrs):
            continue
        attrs = [a for a in attrs if a not in x] + [x]
    return rol, attrs


def momentos(sh, N, sobrio, memo, anio=None):
    """Lo que pasa en la escena, en orden, cada cosa con la palabra en que ocurre. memo guarda los nombres de los
    personajes de escenas anteriores (el guion reusa sus nombres internos para el mismo personaje)."""
    actores, out, fijos = {}, [], []
    lineas = [TOK.findall(str(x)) for x in (sh.get('c') or [])]
    # Personajes sin nombre que se repiten en la escena: se numeran (criollo 1, criollo 2).
    bases = [t[0].split('=', 1)[1].split('/')[0] for t in lineas if t and '=' in t[0] and not t[0].split('=', 1)[1].startswith('+')
             and not any(x.startswith('"') for x in t[1:]) and not memo.get(t[0].split('=', 1)[0], (None, None))[0] == t[0].split('=', 1)[1]]
    dup, vistos = {b for b in bases if bases.count(b) > 1}, {}
    for li, tk in enumerate(lineas):
        if not tk:
            continue
        a = tk[0]
        quotes = [x[1:-1] for x in tk[1:] if x.startswith('"')]
        at = next((x[1:] for x in tk[1:] if x.startswith('@')), None)
        kv = dict(x.split('=', 1) for x in tk[1:] if re.match(r'^[a-z]+=', x))
        words = [x for x in tk[1:] if not x.startswith('"') and not x.startswith('@') and not re.match(r'^[a-z]+=', x)]
        pos, dicho = N.busca(at)
        texto = None
        if '=' in a:
            aid, tipo = a.split('=', 1)
            enter = next((w for w in words if w in ENTRA), 'pop')
            lado = next((LADO[w] for w in words if w in LADO), '')
            grande = 'grande ' if any(w in ('big', 'huge', 'giant') for w in words) else 'pequeño ' if any(w in ('small', 'tiny') for w in words) else ''
            verbo = ENTRA.get(enter, 'aparece')
            if tipo.startswith('+'):
                nm = tipo[1:]
                desc = OBJETO.get(nm, nm)
                fl = kv.get('f')
                if nm in ('flag', 'bigflag'):
                    desc = ('bandera grande' if nm == 'bigflag' else 'bandera') + (f' de {BANDERA_CORTA.get(fl, fl)}' if fl else ' (sin país: no le pongas una bandera nacional)')
                elif fl:
                    desc += f' con la bandera de {BANDERA_CORTA.get(fl, fl)}'
                if kv.get('t'):
                    desc += f' que dice «{kv["t"].replace("_", " ")}»'
                actores[aid] = articulo(desc, True)
                if desc.split()[0] in PLURAL:
                    verbo = plural_verbo(verbo)
                cosa = articulo((grande + desc) if grande and desc.split()[0] not in PLURAL else desc)
                if grande:
                    cosa = articulo(desc).replace(desc, desc.split()[0] + ' ' + grande.strip() + ' ' + ' '.join(desc.split()[1:])).strip()
                texto = f'{verbo} {cosa}' + (f' {lado}' if lado else '')
                desc_fijo = cosa + (f' {lado}' if lado else '')
            else:
                base, *mods = tipo.split('/')
                label = quotes[0] if quotes else (memo.get(aid, (None, None))[1] if memo.get(aid, (None, None))[0] == tipo else None)
                rol, attrs = persona(base, mods)
                if label:
                    memo[aid] = (tipo, label)
                    nombre = label
                    desc = f'{label} (' + ('virrey' if 'virrey' in label.lower() else rol) + ''.join(', ' + x for x in attrs) + ')'
                elif base in dup:
                    vistos[base] = vistos.get(base, 0) + 1
                    nombre = ('la ' if base in FEM_P else 'el ') + f'{corto(base)} {vistos[base]}'
                    desc = f'{nombre} ({rol}' + (': ' + ', '.join(attrs) if attrs else '') + ')'
                elif base == 'lima':
                    nombre, desc = 'Lima', 'Lima, la mascota de la app (joven con polera verde lima)'
                else:
                    nombre = ('la ' if base in FEM_P else 'el ') + corto(base)
                    desc = ('una ' if base in FEM_P else 'un ') + rol + (f' ({", ".join(attrs)})' if attrs else '')
                actores[aid] = nombre
                texto = f'{verbo} {desc}' + (f' {lado}' if lado else '')
                desc_fijo = desc + (f' {lado}' if lado else '')
            if enter == 'none' or not at:
                fijos.append(desc_fijo)
                continue
        elif a in ('T', 'Y', 'L', 'N', 'S'):
            q = quotes[0] if quotes else ' '.join(w for w in words if not re.match(r'^[xy]-?\d', w) and w not in ('box', 'w', 'r'))
            if a == 'T':
                texto = f'texto grande en pantalla: «{q}»'
            elif a == 'Y':
                texto = f'rótulo de fecha: «{" ".join(words) or q}»'
            elif a == 'L':
                texto = f'rótulo: «{q}»'
            elif a == 'S':
                texto = f'sello estampado: «{q}»'
            else:
                num = words[0] if words else ''
                suf = ' '.join(w for w in words[1:] if not re.match(r'^[xy]\d', w))
                texto = f'contador que sube hasta {num}{(" " + suf) if suf else ""}' + (f' («{quotes[0]}»)' if quotes else '')
        elif a == 'fx':
            nm = tk[1] if len(tk) > 1 else ''
            if sobrio and nm in COMICO:
                continue
            texto = 'efecto: ' + EFECTO.get(nm, nm)
        elif a == 'cam':
            nm = tk[1] if len(tk) > 1 else ''
            texto = {'shake': 'la cámara se sacude', 'zoom': 'la cámara se acerca', 'mood': 'cambia la luz de la escena'}.get(nm, 'movimiento de cámara')
        elif a == 'arrow':
            x, y = (words + ['', ''])[:2]
            texto = f'flecha de {actores.get(x, x)} a {actores.get(y, y)}' + (f' con el texto «{quotes[0]}»' if quotes else '')
        elif a in ('hl', 'dim', 'reg', 'pin', 'go', 'tok', 'zoom', 'lab'):
            w = words
            if a == 'hl':
                texto = f'se pinta{"n" if "," in w[0] else ""} de {COLOR.get(w[1], w[1]) if len(w) > 1 else "verde lima"} {paises(w[0], anio)}' + (f', con el rótulo «{quotes[0]}»' if quotes else '')
            elif a == 'dim':
                texto = f'se apaga{"n" if "," in w[0] else ""} {paises(w[0], anio)}'
            elif a == 'reg':
                texto = f'se marca {ZONA.get(w[0], w[0])}' + (f' en {COLOR.get(w[1], w[1])}' if len(w) > 1 else '') + (f', con el rótulo «{quotes[0]}»' if quotes else '')
            elif a == 'pin':
                texto = f'cae un alfiler en {LUGAR.get(w[0], w[0])}' + (f', con el rótulo «{quotes[0]}»' if quotes else '')
            elif a == 'go':
                texto = f'se dibuja una ruta de {LUGAR.get(w[0], w[0])} a {LUGAR.get(w[1], w[1])}' + (f' («{quotes[0]}»)' if quotes else '')
            elif a == 'tok':
                texto = f'{icono(w[1])} viaja de {LUGAR.get(w[2], w[2])} a {LUGAR.get(w[3], w[3])}'
            elif a == 'zoom':
                texto = f'la cámara se acerca a {LUGAR.get(w[0], w[0])}'
            else:
                texto = f'rótulo «{quotes[0] if quotes else LUGAR.get(w[0], w[0])}» en {LUGAR.get(w[0], w[0])}'
        elif a == 'lima':
            continue
        else:
            quien = actores.get(a, a)
            what = words[0] if words else ''
            arg = words[1] if len(words) > 1 else ''
            if sobrio and ((what == 'emote' and arg in ('zzz', 'music', 'money', 'star', 'heart')) or what == 'dance' or (what == 'mood' and arg in ('laugh', 'smug'))):
                continue
            accion = {
                'pose': POSE.get(arg, arg), 'mood': ANIMO.get(arg, arg), 'emote': EMOTE.get(arg, arg),
                'say': f'dice en un globo: «{quotes[0] if quotes else ""}»', 'think': f'piensa: «{quotes[0] if quotes else ""}»',
                'exit': {'r': 'sale por la derecha', 'l': 'sale por la izquierda', 'down': 'sale por abajo', 'up': 'sale hacia arriba'}.get(arg, 'desaparece'),
                'walk': 'camina', 'to': 'se desplaza', 'run': 'corre', 'shake': 'se sacude', 'tremble': 'tiembla', 'no': 'niega con la cabeza',
                'nod': 'asiente', 'jump': 'salta', 'bounce': 'rebota', 'dance': 'baila', 'spin': 'gira', 'grow': 'se agranda', 'shrink': 'se achica',
                'pulse': 'late para llamar la atención', 'fall': 'cae', 'up': 'se levanta', 'flip': 'se da vuelta', 'hide': 'desaparece',
                'show': 'reaparece', 'hl': 'se ilumina', 'fire': 'dispara', 'drop': 'deja caer algo', 'tilt': 'se inclina',
                'look': 'mira hacia ' + ('la izquierda' if arg == 'l' else 'la derecha'), 'talk': 'habla',
            }.get(what, what)
            texto = f'{quien} {accion}'
        if texto:
            out.append((pos if pos is not None else -1, li, dicho, texto))
    out.sort(key=lambda x: (x[0], x[1]))
    return fijos, [(d, t) for _, _, d, t in out]


def fmt_momentos(fijos, ms):
    lines = []
    if fijos:
        lines.append(('- Ya está en escena desde el inicio: ' if len(fijos) == 1 else '- Ya están en escena desde el inicio: ') + lista(fijos) + '.')
    for dicho, t in ms:
        lines.append(f'- Al decir «{dicho}»: {t}.' if dicho else f'- {t[0].upper() + t[1:]}.')
    return lines


def escena(i, sh, cues, epoca, v, memo):
    k = sh.get('k') or ''
    textos = [c['text'] for c in cues]
    N = Narr(textos)
    ys = re.findall(r'\b(1[5-9]\d\d|20[0-3]\d)\b', ' '.join(textos))
    anio = int(ys[0]) if ys else (int(epoca[:4]) if re.match(r'\d{4}', epoca or '') else None)
    sobrio = bool(SOBRIO.search(' '.join(textos))) or memo.get('__sobrio__', False)
    tipo = {'title': 'Título', 'quiz': 'Pregunta', 'recap': 'Resumen', 'map': 'Mapa', 'chain': 'Cadena de causas', 'tl': 'Línea de tiempo',
            'vs': 'Comparación', 'pyr': 'Pirámide'}.get(k, 'Escena')
    cab = f'### {i + 1}. {tipo}' + (f' · «{sh["ch"]}»' if sh.get('ch') else '') + (' · tono sobrio' if sobrio else '')
    L = [cab, '']
    if k == 'quiz':
        q = next((c for c in cues if c['kind'] == 'q'), None)
        e = next((c for c in cues if c['kind'] == 'e'), None)
        L.append(f'Narración (pregunta): «{q["text"] if q else sh.get("s", "")}»')
        L.append('')
        L.append(f'En pantalla: la pregunta «{sh.get("q", "")}» y tres alternativas:')
        for j, o in enumerate(sh.get('o') or []):
            L.append(f'  {"ABC"[j]}) {o}' + ('   ← correcta' if j == sh.get('a') else ''))
        L.append('')
        L.append('Pausa para pensar: cuenta regresiva de 5 segundos sin voz. Luego se marca la correcta en verde (✓) y las demás se atenúan.')
        L.append('')
        L.append(f'Narración (respuesta): «{e["text"] if e else sh.get("e", "")}»')
        return L, sobrio
    L.append(f'Narración: «{" ".join(textos)}»')
    L.append('')
    if k == 'title':
        ems = [icono(x) for x in sh.get('em') or []]
        L.append(f'En pantalla: título «{sh.get("t", v.get("title", ""))}», subtítulo «{sh.get("sub", "")}»' + (f'; íconos: {lista(ems)}' if ems else '') + '.')
        L.append('Apertura sobria: el título entra con un fundido lento, sin destellos ni rebotes, sobre un fondo oscuro y sereno.' if sobrio else
                 'Animación de apertura con fuerza (entra el título, los íconos y un destello), sobre un fondo que anticipa la época.')
        return L, sobrio
    if k in ('recap', 'chain', 'tl'):
        items = []
        for it in sh.get('it') or []:
            at = next((x[1:] for x in it if isinstance(x, str) and x.startswith('@')), None)
            _, dicho = N.busca(at)
            vals = [x for x in it if not (isinstance(x, str) and x.startswith('@'))]
            if k == 'tl':
                fecha, txt, ic = (vals + ['', '', ''])[:3]
                items.append((dicho, f'{fecha}: {txt}' + (f' (ícono: {icono(ic)})' if ic else '')))
            else:
                ic, txt = (vals + ['', ''])[:2]
                items.append((dicho, f'{txt}' + (f' (ícono: {icono(ic)})' if ic else '')))
        cual = {'recap': 'la lista «Para recordar», que se arma idea por idea', 'chain': 'una cadena de causas o pasos unidos por flechas',
                'tl': 'una línea de tiempo que avanza de izquierda a derecha'}[k]
        L.append(f'En pantalla: {cual}' + (f', con el título «{sh["ch"]}»' if sh.get('ch') and k == 'chain' else '') + ':')
        for dicho, t in items:
            L.append(f'- {t}' + (f' — aparece al decir «{dicho}»' if dicho else ''))
        return L, sobrio
    if k == 'vs':
        L.append('En pantalla: comparación en dos columnas, que se llenan a medida que se nombran:')
        for lado, nombre in (('l', 'Izquierda'), ('r', 'Derecha')):
            col = sh.get(lado) or []
            if not col:
                continue
            tit = re.sub(r'\s*@\S+', '', str(col[0]))
            quien = PERSONAJE.get(str(col[1]).split('/')[0], col[1]) if len(col) > 1 and col[1] else ''
            filas = [re.sub(r'\s*@\S+', '', str(x)) for x in col[2:]]
            L.append(f'- {nombre}: «{tit}»' + (f' (personaje: {quien})' if quien else '') + (': ' + '; '.join(f'«{f}»' for f in filas) if filas else ''))
        return L, sobrio
    if k == 'pyr':
        L.append('En pantalla: pirámide que se arma de arriba hacia abajo:')
        for it in sh.get('it') or []:
            vals = [x for x in it if not (isinstance(x, str) and x.startswith('@'))]
            nombre = vals[0] if vals else ''
            gente = [PERSONAJE.get(g, g).split(' (')[0] for g in str(vals[1]).split(',')] if len(vals) > 1 else []
            extra = vals[2] if len(vals) > 2 else ''
            L.append(f'- {nombre}' + (f' ({lista(gente)})' if gente else '') + (f' — «{extra}»' if extra else ''))
        return L, sobrio
    if k == 'map':
        L.append(f'Imagen: {VISTA.get(sh.get("view", "chile"), "mapa")} animado, con geografía real y las fronteras ' + (f'de {anio}.' if anio else 'de la época que se narra.'))
    else:
        esc = ESCENARIO.get(sh.get('set', ''), sh.get('set', ''))
        L.append(f'Escenario: {esc}' + (f', con la bandera de {BANDERA_CORTA.get(sh["flag"], sh["flag"])}' if sh.get('flag') else '') + '.')
    fijos, ms = momentos(sh, N, sobrio, memo, anio)
    if fijos or ms:
        L.append('')
        L.append('Momentos (cada uno justo cuando la voz dice la palabra):')
        L += fmt_momentos(fijos, ms)
    return L, sobrio


# ---------- El texto para la voz ----------

def para_narrador(text):
    out = []
    for t, sp in habla.speak_tokens(text):
        pre, core, post = habla.PUNCT.match(t).groups()
        if ((core in habla.ACRO and ' ' in habla.ACRO[core]) or core.startswith('$') or habla.YEARS_RANGE.match(core + post)
                or (core in habla.SYMBOL and habla.SYMBOL[core])):
            out.append(sp)
        else:
            out.append(t)
    return re.sub(r'\s+', ' ', ' '.join(x for x in out if x)).strip()


def parrafos(g):
    pars = []
    for sc in g['sc']:
        cur = []
        for c in sc['cues']:
            if c['kind'] == 'e' and cur:
                pars.append(' '.join(cur))
                cur = []
            cur.append(para_narrador(c['text']))
        if cur:
            pars.append(' '.join(cur))
    return pars


def partes(pars, maxc=MAXC):
    total = len('\n\n'.join(pars))
    n = max(1, math.ceil(total / maxc))
    meta = total / n
    out, cur = [], ''
    for p in pars:
        nuevo = f'{cur}\n\n{p}' if cur else p
        if cur and (len(nuevo) > maxc or (len(out) < n - 1 and len(cur) >= meta)):
            out.append(cur)
            cur = p
        else:
            cur = nuevo
    return out + ([cur] if cur else [])


# ---------- El prompt de un video ----------

def epoca_de(v, unidad):
    sub = next((sh.get('sub', '') for sh in v['shots'] if sh.get('k') == 'title'), '')
    m = re.search(r'(\d{3,4})\s*[–-]\s*(\d{2,4})', sub) or re.search(r'\((\d{3,4})\s*[–-]\s*(\d{2,4})\)', unidad)
    if m:
        return f'{m.group(1)}–{m.group(2)}'
    m = re.search(r'(\d{4})', sub)
    return m.group(1) if m else ''


def miles(n):
    return f'{n:,}'.replace(',', '.')


def mmss(s):
    return f'{int(s // 60)}:{int(round(s % 60)):02d}'


def prompt(vid, v, g, unidad, nles, dur):
    u = int(v['u'][1:])
    epoca = epoca_de(v, unidad)
    chars = sum(len(c['text']) + 1 for sc in g['sc'] for c in sc['cues'])
    cuerpo, sobrio_any, banderas, memo = [], False, set(), {}
    todo = ' '.join(c['text'] for sc in g['sc'] for c in sc['cues'])
    n_sob = sum(1 for sc in g['sc'] if SOBRIO.search(' '.join(c['text'] for c in sc['cues'])))
    if SOBRIO.search(v['title'] + ' ' + v.get('desc', '')) or n_sob >= .4 * len(g['sc']):
        memo['__sobrio__'] = True
    for i, (sh, sc) in enumerate(zip(v['shots'], g['sc'])):
        L, sob = escena(i, sh, sc['cues'], epoca, v, memo)
        sobrio_any |= sob
        cuerpo += L + ['']
        for line in sh.get('c') or []:
            banderas |= set(re.findall(r'\bf=([a-z]+)', line))
        if sh.get('flag'):
            banderas.add(sh['flag'])
        for x in (sh.get('em') or []) + [y for it in (sh.get('it') or []) for y in it if isinstance(y, str)]:
            m = re.match(r'flag:([a-z]+)', str(x))
            if m:
                banderas.add(m.group(1))
    banderas = sorted(b for b in banderas if b in BANDERA)
    texto_web = partes(parrafos(g))
    nombres = sorted({q for sh in v['shots'] for line in (sh.get('c') or []) for q in re.findall(r'=[a-z]+[^"]*"([^"]+)"', line)})
    P = []
    P.append(f'# Video de Historia PAES · {vid} · «{v["title"]}»')
    P.append('')
    P.append(f'Unidad {u}: {unidad} · lección {v.get("l", 0) + 1} de {nles}' + (f' · época {epoca}' if epoca else '') +
             f' · duración de referencia {mmss(dur)}' * bool(dur) + f' · narración de {miles(chars)} caracteres')
    P.append('')
    P.append('> Copia este prompt completo en la sesión que tiene Remotion. Si ya le pasaste GUIA.md, la sección 1 es un recordatorio.')
    P.append('')
    P.append('## 1. Encargo')
    P.append('')
    P.append(f'Haz con Remotion el video «{v["title"]}» para la app PAES (estudio para la PAES de Historia en Chile). Tema: {v.get("desc", "")}')
    P.append('')
    P.append('- Formato vertical 1080×1920, 30 fps; la duración la da la voz. Sigue GUIA.md (estilo, ritmo, subtítulos, sonido, exactitud y entrega).')
    P.append('- Que se vea como un muy buen video de divulgación para redes: ilustraciones 2D detalladas y con profundidad, personajes expresivos y bien dibujados, animación fluida, algo nuevo en pantalla cada 2 a 3 segundos, humor ligero donde el tema lo permite.')
    P.append('- La narración de cada escena (sección 3) es exacta: Fernando la lee tal cual, sin agregar, quitar ni cambiar palabras. Lo que se ve está atado a palabras de esa narración: haz que ocurra justo cuando se dicen.')
    P.append('- El guion gráfico de cada escena es la base: puedes mejorarlo y enriquecerlo, pero sin cambiar los hechos, las fechas, las banderas ni el orden.')
    P.append(f'- Entrega: out/{vid}.mp4, out/{vid}-720.mp4, out/{vid}.jpg, out/{vid}.json y out/{vid}-creditos.txt (ver GUIA.md).')
    P.append('')
    P.append('## 2. Voz: Fernando Martínez (ElevenLabs)')
    P.append('')
    P.append(f'- voice_id `{VOZ_ID}` · model_id `eleven_multilingual_v2` (o `eleven_v4` si suena mejor; prueba ambos solo en la escena 1) · language_code `es`.')
    P.append('- voice_settings: `{"stability": 0.5, "similarity_boost": 0.8, "style": 0.25, "use_speaker_boost": true, "speed": 1.0}`.')
    P.append(f'- Una petición por escena a `POST /v1/text-to-speech/{VOZ_ID}/with-timestamps`, con `previous_text` y `next_text` (las escenas vecinas) para que la entonación fluya. En las preguntas, la pregunta y la respuesta van en peticiones separadas. Guarda cada MP3 y sus tiempos por carácter (conviértelos a tiempos por palabra).')
    P.append('- Si la API rechaza la voz (plan gratis: «Free users cannot use library voices via the API»), no uses otra voz: pide al usuario el MP3 hecho en elevenlabs.io con el texto de la sección 5 y saca los tiempos por palabra con whisper.cpp (`@remotion/install-whisper-cpp`, idioma es) o con `POST /v1/forced-alignment`, alineando con la narración de la sección 3.')
    P.append(f'- Costo: unos {miles(chars)} créditos con `eleven_multilingual_v2` o `eleven_v4` (la mitad con `eleven_v4_turbo`). No regeneres escenas que ya están bien.')
    P.append('- Revisa el audio: transcríbelo y compáralo con la narración; vuelve a generar solo las escenas con palabras cambiadas, saltadas o nombres mal dichos.')
    P.append('')
    P.append('## 3. Escenas')
    P.append('')
    P += cuerpo
    P.append('## 4. Cuidados de este video')
    P.append('')
    if epoca:
        P.append(f'- Época: {epoca} (si una escena nombra otro año o lugar, ambiéntala según su narración). Ropa, peinados, armas, transporte, edificios y objetos de esos años; nada que no existiera entonces.')
    else:
        P.append('- Época: Chile actual (salvo que la escena hable de otro tiempo).')
    if banderas:
        P.append('- Banderas que aparecen en este video (solo estas, y solo donde la escena las pide): ' + '; '.join(bandera(b) for b in banderas) + '.')
    else:
        P.append('- Este video no pide banderas: no agregues ninguna.')
    P.append('- Nunca pongas la bandera de Estados Unidos junto a la de Chile si la narración de esa escena no habla de ambos países. Una bandera sin país indicado va sin bandera nacional.')
    if nombres:
        P.append('- Personajes con nombre: ' + ', '.join(nombres) + '. A las personas reales, dibújalas parecidas a sus retratos o fotos de la época, con respeto (sin caricaturas ofensivas).')
    if memo.get('__sobrio__'):
        P.append('- Todo este video va con tono sobrio: es un tema de violencia o derechos humanos. Sin chistes, sin confeti ni emojis, colores apagados, música grave o silencio, sin sangre ni violencia explícita; muestra con símbolos (velas, flores, siluetas, nombres, documentos). Las víctimas, siempre con respeto.')
    elif sobrio_any:
        P.append('- Hay escenas con tono sobrio (marcadas arriba): sin chistes, sin confeti ni emojis, colores apagados, música grave o silencio, sin sangre ni violencia explícita; muestra con símbolos (velas, flores, siluetas, nombres, documentos).')
    P.append('- No muestres esvásticas ni banderas nazis en ningún caso.')
    P.append('')
    P.append('## 5. Texto para la web (solo si hay que generar la voz a mano en elevenlabs.io)')
    P.append('')
    P.append(f'Voz «Fernando Martínez», modelo Eleven Multilingual v2. {"Genera cada parte por separado y descárgalas en orden." if len(texto_web) > 1 else "Pégalo completo y descarga el MP3."}')
    P.append('')
    for j, t in enumerate(texto_web):
        if len(texto_web) > 1:
            P.append(f'**Parte {j + 1} de {len(texto_web)}** ({len(t)} caracteres)')
            P.append('')
        P.append('```text')
        P.append(t)
        P.append('```')
        P.append('')
    txt = '\n'.join(P).rstrip() + '\n'
    txt = re.sub(r'\bde el ', 'del ', re.sub(r'\ba el ', 'al ', txt))
    return txt, chars, sobrio_any


GUIA = r'''# Guía para los videos de Historia PAES (Remotion + voz de Fernando Martínez)

Esta guía vale para los 56 videos. Cada video tiene su prompt (`h1-1.md` … `h18-3.md`) con la narración exacta,
el guion gráfico escena por escena, las preguntas y los cuidados propios. Lee esta guía una vez y después
cada prompt.

## Para quién y para qué

Estudiantes chilenos de 3.° y 4.° medio que preparan la PAES de Historia. Los videos están dentro de una app
de estudio (una lección = un video de 3 a 5 minutos). Tienen que enganchar como un buen video de divulgación
en redes y enseñar con total exactitud: después del video, el estudiante responde preguntas de la PAES.

## Formato

- Composición vertical 1080×1920, 30 fps. Un `<Composition id="h2-1">` por video; la duración se calcula
  desde el audio (`calculateMetadata`).
- Zonas seguras: deja el 12 % de arriba y el 20 % de abajo libres de textos importantes (ahí van los
  controles del reproductor de la app y los subtítulos).
- Render: H.264, CRF 20, `yuv420p`, audio AAC 160 kbps a 48 kHz. Además, una versión para la app de
  720×1280 (`--scale=0.6667`, CRF 26, AAC 96 kbps).

## Voz

- ElevenLabs, voz **Fernando Martínez** (`voice_id` `dlGxemPxFMTY7iXagmOj`, español latino), modelo
  `eleven_multilingual_v2` (o `eleven_v4`), `language_code` `es`. Una petición por escena a
  `/v1/text-to-speech/{voice_id}/with-timestamps` con `previous_text` y `next_text`. Cada prompt trae la
  configuración exacta.
- La narración se lee tal cual está en el prompt. No la resumas ni la "mejores": ya está revisada para la PAES.
- Guarda el audio de cada escena con un nombre que dependa del texto y la configuración (por ejemplo, un hash):
  así no se gastan créditos dos veces. La cuenta tiene créditos limitados.
- Si la API no deja usar la voz (plan gratis), el usuario genera el MP3 en elevenlabs.io con el texto de la
  sección 5 del prompt. En ese caso, los tiempos por palabra salen de whisper.cpp
  (`@remotion/install-whisper-cpp`) o de `POST /v1/forced-alignment`, alineados con la narración.
- Entre la pregunta y su respuesta va una pausa de 5 segundos sin voz (la cuenta regresiva).

## Ritmo y edición

- La escena 1 es un gancho y va **antes** del título: tiene que atrapar en los primeros 3 segundos.
- Algo cambia en pantalla cada 2 a 3 segundos: un texto clave, un personaje que reacciona, un objeto que
  entra, un movimiento de cámara. Nunca una imagen quieta más de 4 segundos.
- Todo lo que pide el guion gráfico está atado a una palabra («Al decir "1810"…»): haz que pase justo en ese
  momento, con los tiempos por palabra de la voz.
- Cámara siempre viva: paneo o zoom lento (Ken Burns), parallax entre las capas del fondo, empujes suaves hacia
  lo que acaba de aparecer.
- Transiciones: si la escena sigue en el mismo lugar, fundido corto; si cambia de lugar o de época, zoom o
  barrido rápido con un *whoosh*.
- Textos grandes del guion: máximo 5 palabras, tipografía gruesa, entrada con rebote; se van cuando llega el
  siguiente.
- Subtítulos tipo karaoke de 1 a 4 palabras (`@remotion/captions`, `createTikTokStyleCaptions`), letra gruesa
  blanca con borde oscuro y la palabra que se está diciendo en verde lima `#c6ff00` (el color de la app). En las
  pantallas de pregunta, sin subtítulos (la pregunta ya está escrita).
- Sonido: *whoosh* en transiciones, *pop* o *ding* suave al aparecer textos, golpe seco en los sellos, tic en la
  cuenta regresiva. Música instrumental de fondo, libre de derechos, que baja bajo la voz (*ducking* de unos
  −18 dB) y nunca la tapa. Mezcla final cerca de −14 LUFS.

## Gráficos

- Estilo: ilustración vectorial 2D de alta calidad, tipo *explainer* de documental animado. Fondos en 3 o 4
  capas con luz, sombra suave y textura sutil (papel, grano). Una paleta por época: Colonia e Independencia en
  ocres, tierras y azules; siglo XIX en sepias y verdes; siglo XX más saturado; Guerra Fría en rojos y azules;
  formación ciudadana y economía, colores limpios de infografía.
- Personajes: un mismo diseño en los 56 videos (proporciones, línea y sombreado consistentes), con ojos
  expresivos, cejas y boca que actúan, manos claras y ropa de su época. Se mueven: caminan, gesticulan,
  reaccionan. Los globos de diálogo del guion son ilustrativos (la voz es solo la del narrador).
- Personas reales (O'Higgins, Carrera, Portales, Balmaceda, Alessandri, Allende, Pinochet, Napoleón, Hitler,
  Stalin, etc.): parecidas a sus retratos o fotos de la época, con respeto. Puedes usar retratos y grabados de
  dominio público (por ejemplo, de Wikimedia Commons) con marco y movimiento, como apoyo.
- Mapas con geografía real (Natural Earth, dominio público) y **las fronteras de la época narrada**: antes de
  1879 Antofagasta era boliviana y Tarapacá peruana; en 1914 existían Austria-Hungría y el Imperio ruso; entre
  1945 y 1991, la URSS, Checoslovaquia, Yugoslavia y las dos Alemanias. Países que se pintan, rutas que se
  dibujan, alfileres que caen, rótulos legibles.
- Infografías (líneas de tiempo, cadenas de causas, comparaciones, pirámides, resúmenes): limpias, con íconos
  del mismo estilo, y que se arman al ritmo de la voz.
- Documentos (constituciones, leyes, tratados): papel envejecido, sello y título legible.
- Tipografías de Google Fonts: una gruesa para títulos (por ejemplo, Anton o Bebas Neue) y una redonda y
  clara para textos (por ejemplo, Nunito).

## Exactitud (lo más importante)

- La narración es la fuente. No agregues en pantalla datos, cifras, fechas ni nombres que no estén en la
  narración o en el guion gráfico de esa escena.
- Banderas: solo las que pide la escena, y la versión correcta para el año. La bandera actual de Chile, con
  estrella, existe desde 1817; en la Patria Vieja (1812–1814) se usó la azul, blanca y amarilla. **Nunca**
  pongas la bandera de Estados Unidos junto a la de Chile si la narración no habla de ambos. Si el guion pide
  una bandera sin país, no inventes uno. Nunca uses esvásticas ni banderas nazis: la Alemania nazi se
  representa con el mapa, rótulos o un color.
- Época: ropa, armas, transporte, edificios y objetos de la época de la escena (nada de celulares, autos o
  relojes digitales fuera de su tiempo).
- Temas de violencia y derechos humanos (dictadura, detenidos desaparecidos, tortura, Holocausto, guerras,
  bombardeos, matanzas, esclavitud, ocupación de la Araucanía): tono sobrio, sin chistes, sin confeti ni
  emojis, sin sangre ni violencia explícita; con símbolos (velas, flores, siluetas, nombres, documentos).
  Los prompts marcan esas escenas como «tono sobrio».
- Pueblos originarios: representación respetuosa y fiel (ropa, símbolos y lugares), sin estereotipos.

## Preguntas

Cada video trae dos preguntas. Pantalla con la pregunta y tres alternativas (A, B, C), cuenta regresiva de 5
segundos sin voz, la correcta se marca en verde con ✓ y las otras se atenúan, y después la voz explica.

## Entrega de cada video

- `out/<id>.mp4` (1080×1920) y `out/<id>-720.mp4` (720×1280, para la app).
- `out/<id>.jpg`: miniatura 1080×1920 con el título.
- `out/<id>-creditos.txt`: fuentes y licencias de imágenes, música y tipografías usadas.
- `out/<id>.json`: los tiempos, para que la app pueda pausar en las preguntas y mostrar capítulos:

```json
{
  "id": "h2-1",
  "duracion": 231.4,
  "escenas": [{ "n": 1, "t0": 0.0, "titulo": "Un reino sin rey" }],
  "preguntas": [{ "n": 16, "t_pregunta": 180.1, "t_cuenta": 184.9, "t_respuesta": 189.9,
                  "pregunta": "…", "opciones": ["…", "…", "…"], "correcta": 1 }],
  "palabras": [{ "w": "1808.", "t0": 0.25, "t1": 0.9 }]
}
```

## Cómo trabajar cada video

1. Lee el prompt completo.
2. Genera la voz por escena (o recibe el MP3 del usuario) y revísala contra la narración.
3. Arma las escenas con los tiempos por palabra.
4. Renderiza primero los 15 segundos del gancho y el título, y revisa que se vean bien.
5. Renderiza el video completo y revisa fotogramas clave: banderas, mapas, fechas, nombres y textos.
6. Entrega los archivos de la lista.
'''


LEEME = """# Prompts para rehacer los videos de Historia con Remotion

{n} prompts, uno por video, más la guía común. Los genera `tools/prompts-historia.py` a partir de los guiones
de la app (`data/toon-h*.js`): si cambia un guion, se vuelven a generar.

## Cómo usarlos

1. En la sesión que tiene Remotion, pásale primero `GUIA.md` (una sola vez).
2. Después, un prompt por vez y en orden (ver `INDICE.md`): «Haz el video del prompt `h1-1.md`».
   Si esa sesión puede leer el repositorio `alexqlom/paes`, basta con decirle:
   «Lee `prompts-historia/GUIA.md` y haz el video de `prompts-historia/h1-1.md`».
3. Revisa el primer video completo antes de pedir los siguientes.

## La voz de Fernando Martínez

- Es una voz de la biblioteca de ElevenLabs: por la API solo funciona con un plan pagado. Con el plan gratis,
  genera el audio en elevenlabs.io con el texto de la sección 5 de cada prompt (voz Fernando Martínez) y pásale
  el MP3 a la sesión de Remotion.
- Créditos: los {n} videos suman {total} caracteres, unos {min} minutos de voz. El plan gratis da 10.000 al mes
  (unos 3 videos). Generar una escena de nuevo vuelve a gastar créditos.

## Qué entrega cada video

`out/<id>.mp4` (1080×1920), `out/<id>-720.mp4` (para la app), `out/<id>.jpg`, `out/<id>-creditos.txt` y
`out/<id>.json` con los tiempos de las escenas, las preguntas y las palabras, para integrarlo a la app.
"""


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'prompts-historia')
    os.makedirs(out, exist_ok=True)
    defs, heads, guion, dur = cargar()
    orden = sorted(defs, key=lambda x: (int(re.match(r'h(\d+)', x).group(1)), defs[x].get('l', 0)))
    por_unidad = {}
    for vid in orden:
        por_unidad.setdefault(defs[vid]['u'], []).append(vid)
    filas, total, minutos = [], 0, 0
    for vid in orden:
        v, g = defs[vid], guion[vid]
        assert len(v['shots']) == len(g['sc']), vid
        unidad = heads.get(v['u'], '')
        txt, chars, sob = prompt(vid, v, g, unidad, len(por_unidad[v['u']]), dur.get(vid, 0))
        open(os.path.join(out, f'{vid}.md'), 'w', encoding='utf-8').write(txt)
        total += chars
        minutos += dur.get(vid, 0) / 60
        filas.append(f'| [{vid}]({vid}.md) | {int(v["u"][1:])}. {unidad} | {v["title"]} | {mmss(dur.get(vid, 0))} | {miles(chars)} | ' + ('sobrio en partes |' if sob else '|'))
    open(os.path.join(out, 'GUIA.md'), 'w', encoding='utf-8').write(GUIA)
    open(os.path.join(out, 'LEEME.md'), 'w', encoding='utf-8').write(LEEME.format(n=len(orden), total=miles(total), min=round(minutos)))
    indice = ['# Índice de los videos de Historia', '',
              f'{len(orden)} videos · unos {round(minutos)} minutos de narración · {miles(total)} caracteres (créditos de ElevenLabs con Multilingual v2 o v4).',
              '', '| Prompt | Unidad | Video | Duración (ref.) | Caracteres | Tono |', '|---|---|---|---|---|---|'] + filas
    open(os.path.join(out, 'INDICE.md'), 'w', encoding='utf-8').write('\n'.join(indice) + '\n')
    print(f'{len(orden)} prompts en {out} · {total} caracteres · {minutos:.0f} min')


if __name__ == '__main__':
    main()
