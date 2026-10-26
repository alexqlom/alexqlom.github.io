# Convierte los textos de los videos en lo que debe decir la narradora: números, unidades, siglas,
# fórmulas y nombres extranjeros pasan a palabras en español de Chile. Cada palabra escrita queda ligada a
# su forma hablada, así los subtítulos pueden resaltar la palabra que se está diciendo.
import re, unicodedata

UNI = ('cero uno dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince dieciséis '
       'diecisiete dieciocho diecinueve veinte veintiuno veintidós veintitrés veinticuatro veinticinco '
       'veintiséis veintisiete veintiocho veintinueve').split()
DEC = {3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta', 7: 'setenta', 8: 'ochenta', 9: 'noventa'}
CEN = {1: 'ciento', 2: 'doscientos', 3: 'trescientos', 4: 'cuatrocientos', 5: 'quinientos', 6: 'seiscientos',
       7: 'setecientos', 8: 'ochocientos', 9: 'novecientos'}


def apocope(w, fem=False):
    """'uno' delante de un sustantivo: 'un' (o 'una'), también en 'veintiuno' y '... y uno'."""
    if w.endswith('veintiuno'):
        return w[:-9] + ('veintiuna' if fem else 'veintiún')
    if w == 'uno' or w.endswith(' uno'):
        return w[:-3] + ('una' if fem else 'un')
    return w


def num(n, fem=False):
    """Entero a palabras (hasta billones). fem: 'una' en vez de 'uno' al final."""
    if n < 0:
        return 'menos ' + num(-n, fem)
    if n < 30:
        w = UNI[n]
    elif n < 100:
        d, u = divmod(n, 10)
        w = DEC[d] + ('' if u == 0 else ' y ' + UNI[u])
    elif n < 1000:
        c, r = divmod(n, 100)
        w = 'cien' if (c == 1 and r == 0) else CEN[c] + ('' if r == 0 else ' ' + num(r))
    elif n < 10 ** 6:
        m, r = divmod(n, 1000)
        w = ('mil' if m == 1 else apocope(num(m)) + ' mil') + ('' if r == 0 else ' ' + num(r))
    elif n < 10 ** 12:
        m, r = divmod(n, 10 ** 6)
        w = ('un millón' if m == 1 else apocope(num(m)) + ' millones') + ('' if r == 0 else ' ' + num(r))
    else:
        m, r = divmod(n, 10 ** 12)
        w = ('un billón' if m == 1 else apocope(num(m)) + ' billones') + ('' if r == 0 else ' ' + num(r))
    if fem and (w == 'uno' or w.endswith('uno')):
        w = w[:-1] + 'a'
    return w


NUM_RE = re.compile(r'^([−-]?)(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?$')


def number_words(tok, fem=False, noun=False):
    m = NUM_RE.match(tok)
    if not m:
        return None
    sign, ent, dec = m.groups()
    n = int(ent.replace('.', ''))
    if dec:
        # 1,80 → uno coma ochenta; 0,05 → cero coma cero cinco
        z = len(dec) - len(dec.lstrip('0'))
        w = num(n) + ' coma ' + ' '.join(['cero'] * z) + (' ' + num(int(dec)) if dec.strip('0') else '')
        w = re.sub(r'\s+', ' ', w).strip()
    else:
        w = num(n, fem)
        if noun and not fem:
            w = apocope(w)
    return ('menos ' if sign else '') + w


# Unidades que siguen a un número: (singular, plural, femenino)
UNITS = {
    'km/h': ('kilómetro por hora', 'kilómetros por hora', 0), 'm/s²': ('metro por segundo al cuadrado', 'metros por segundo al cuadrado', 0),
    'm/s': ('metro por segundo', 'metros por segundo', 0), '°C': ('grado', 'grados', 0), '°': ('grado', 'grados', 0),
    'kg': ('kilo', 'kilos', 0), 'g/mol': ('gramo por mol', 'gramos por mol', 0), 'g': ('gramo', 'gramos', 0),
    'kcal': ('kilocaloría', 'kilocalorías', 1), 'cal': ('caloría', 'calorías', 1), 'Hz': ('jerts', 'jerts', 0),
    'N': ('níuton', 'níutons', 0), 'V': ('volt', 'volts', 0), 'W': ('uat', 'uats', 0), 'J': ('yul', 'yuls', 0),
    'cm': ('centímetro', 'centímetros', 0), 'mm': ('milímetro', 'milímetros', 0), 'km': ('kilómetro', 'kilómetros', 0),
    'km²': ('kilómetro cuadrado', 'kilómetros cuadrados', 0), 'm²': ('metro cuadrado', 'metros cuadrados', 0),
    'm': ('metro', 'metros', 0), 's': ('segundo', 'segundos', 0), 'h': ('hora', 'horas', 1), 'min': ('minuto', 'minutos', 0),
    'L': ('litro', 'litros', 0), 'mL': ('mililitro', 'mililitros', 0), 'M': ('molar', 'molar', 0), 'mol': ('mol', 'moles', 0),
    '%': ('por ciento', 'por ciento', 0), 'Pa': ('pascal', 'pascales', 0), 'ppm': ('parte por millón', 'partes por millón', 1),
}
NOT_NOUN = set('dividido multiplicado elevado por más menos y o u e es son era fue de del a al en que con para entre como '
               'sobre hasta desde se no le lo la el los las un una sí ya'.split())
FEM_NOUNS = set('hora horas vez veces persona personas roja rojas bola bolas carta cartas cifra cifras célula células '
                'molécula moléculas página páginas pregunta preguntas semana semanas letra letras mujer mujeres unidad '
                'unidades opción opciones caloría calorías cara caras moneda monedas alternativa alternativas vida vidas '
                'especie especies cadena cadenas hebra hebras ley leyes guerra guerras etapa etapas región regiones'.split())

# Siglas que se deletrean o se leen como palabra.
ACRO = {
    'ADN': 'a de ene', 'ARN': 'a erre ene', 'ATP': 'a te pe', 'NADPH': 'ene a de pe hache', 'IVA': 'iva', 'PIB': 'pe i be',
    'ONU': 'onu', 'IPC': 'i pe ce', 'URSS': 'u erre ese ese', 'CORFO': 'corfo', 'DINA': 'dina', 'CNI': 'ce ene i',
    'AFP': 'a efe pe', 'CAE': 'cae', 'IMC': 'i eme ce', 'ITS': 'i te ese', 'DDT': 'de de te', 'CFC': 'ce efe ce',
    'OTAN': 'otan', 'ENDESA': 'endesa', 'CAP': 'cap', 'ENAP': 'enap', 'IANSA': 'iansa', 'MEMCH': 'memch', 'INE': 'ine',
    'SERNAC': 'sernac', 'SENAPRED': 'senapred', 'REP': 'rep', 'LH': 'ele hache', 'FSH': 'efe ese hache',
    'VIH': 've i hache', 'MRU': 'eme erre u', 'MRUA': 'eme erre u a', 'PAES': 'paes', 'M1': 'eme uno', 'M2': 'eme dos',
    'HCl': 'hache ce ele', 'NaOH': 'hidróxido de sodio', 'pH': 'pe hache', 'H₂O': 'hache dos o', 'CO₂': 'ce o dos',
    'H₂S': 'hache dos ese', 'O₂': 'o dos', 'N₂': 'ene dos', 'CH₄': 'ce hache cuatro', 'EE.UU.': 'Estados Unidos',
    'EE. UU.': 'Estados Unidos', 'EE.UU': 'Estados Unidos', 'DEMRE': 'demre', 'TP': 'te pe', 'UV': 'u ve', 'SIDA': 'sida', 'RNA': 'erre ene a',
    'INDH': 'i ene de hache', 'TC': 'te ce', 'Servel': 'Servel',
    'PEM': 'pem', 'POJH': 'pe o jota hache', 'DD.HH.': 'derechos humanos',
    'JAP': 'jap', 'CIA': 'cía', 'DC': 'de ce',
    'RDA': 'erre de a', 'RFA': 'erre efe a', 'ISI': 'isi',
    'FOCH': 'foch', 'FECH': 'fech', 'CUT': 'cut', 'MIR': 'mir', 'UP': 'u pe', 'PDC': 'pe de ce', 'OEA': 'o e a', 'CEPAL': 'cepal', 'FMI': 'efe eme i',
    'CONTINUIDAD': 'continuidad', 'hCG': 'hache ce ge', 'Cl': 'ce ele', 'Br': 'be erre', 'OH': 'o hache', 'AB': 'a be', 'Q1': 'cu uno', 'Q3': 'cu tres',
}
# Nombres extranjeros escritos como se pronuncian en Chile (la tilde marca el acento).
RESPELL = {
    'Punnett': 'Pánet', 'Eukarya': 'Eucaria', 'O’Higgins': 'Ojíguins', "O'Higgins": 'Ojíguins', 'Archaea': 'Arquea',
    'Mendeleiev': 'Mendeléiev', 'Oersted': 'Ésted', 'Klinefelter': 'Cláinfelter', 'Arrhenius': 'Arrénius',
    'Rettig': 'Rétig', 'Coulomb': 'Culómb', 'Somme': 'Som', 'Lamarck': 'Lamárk', 'Lavoisier': 'Lavuasié',
    'Entente': 'Antánt', 'Crick': 'Crik', 'Hooke': 'Juk', 'Ohm': 'Om', 'Laplace': 'Laplás', 'Meiji': 'Méiyi',
    'Montesquieu': 'Montesquiú', 'Watt': 'Uat', 'Gini': 'Yini', 'Fahrenheit': 'Fárenjait', 'Letelier': 'Leteliér',
    'Robespierre': 'Robespiér', 'Rutherford': 'Ráderford', 'Faraday': 'Fáradei', 'Lowry': 'Láuri', 'Beagle': 'Bígol',
    'Cochrane': 'Cócran', 'Aylwin': 'Éilwin', 'Keynes': 'Kéins', 'Deal': 'Dil', 'New': 'Niú', 'Thomson': 'Tómson',
    'Leigh': 'Lí', 'Rousseau': 'Rusó', 'Truman': 'Trúman', 'Harbor': 'Járbor', 'Pearl': 'Perl', 'Voltaire': 'Voltér',
    'Auschwitz': 'Áushvits', 'Calvin': 'Cálvin', 'Locke': 'Lok', 'Luther': 'Lúter', 'Roosevelt': 'Rúsvelt',
    'Gandhi': 'Gandi', 'Wallace': 'Uólas', 'Mac-Iver': 'Mak Íver', 'Dolly': 'Doli', 'Pont': 'Pon', 'Kelvin': 'Kélvin',
    'Shoá': 'Shoá', 'Gorbachov': 'Gorbachóv', 'Sputnik': 'Spútnik', 'Hiroshima': 'Jiroshima', 'Fleming': 'Fléming',
    'Rosalind': 'Rósalind', 'Bohr': 'Bor', 'Golgi': 'Gólyi', 'Dalton': 'Dálton', 'Doppler': 'Dópler', 'Kepler': 'Képler',
    'Mendel': 'Méndel', 'Darwin': 'Dáruin', 'Krebs': 'Crebs', 'Engels': 'Énguels', 'Marx': 'Marx', 'Stalingrado': 'Stalingrado',
    'Celsius': 'Célsius', 'Newton': 'Níuton', 'Joule': 'Yul', 'Pascal': 'Páscal', 'Bandung': 'Bandúng',
    'Núremberg': 'Núremberg', 'Sarajevo': 'Sarayevo', 'Mijaíl': 'Mijaíl', 'Litovsk': 'Litóvsk', 'Gagarin': 'Gagárin',
    'Avogadro': 'Avogadro', 'Mercalli': 'Mercali', 'Valech': 'Valech', 'Bachelet': 'Bacheléth', 'Pinochet': 'Pinoché',
    'Kennedy': 'Kénedi', 'Churchill': 'Chérchil', 'Hitler': 'Jítler', 'Wall': 'Uol', 'Street': 'Strit', 'Marshall': 'Márshal',
    'Thatcher': 'Táchet', 'o’higginistas': 'ojiguinistas', "o'higginistas": 'ojiguinistas', 'Brønsted': 'Brónsted', 'boys': 'bóis', 'Reagan': 'Réigan', 'Nixon': 'Níxon', 'Kissinger': 'Kísinyer', 'Freud': 'Froid',
    'habeas': 'ábeas', 'corpus': 'córpus', 'solis': 'sólis', 'sanguinis': 'sanguínis', 'Lobby': 'Lóbi', 'Apruebo': 'Apruebo',
    'Schneider': 'Shnáider', 'Tomic': 'Tómic', 'Tanquetazo': 'Tanquetazo',
    'Marmaduke': 'Mármaduk', 'Grove': 'Grov', 'Klein-Saks': 'Kláin Saks', 'Huachipato': 'Huachipato',
    'Prebisch': 'Prébish', 'Batista': 'Batista', 'glasnost': 'glásnost', 'perestroika': 'perestróika', 'Apolo': 'Apolo',
    'John': 'Yon', 'Maynard': 'Méinard', 'Normandía': 'Normandía', 'Sudetes': 'Sudetes',
    'Theodore': 'Téodor', 'Wilson': 'Uílson', 'Führer': 'Fíurer', 'Brest-Litovsk': 'Brest Litóvsk', 'Franklin': 'Fránklin',
    'Diderot': 'Didró', 'D’Alembert': 'Dalambér', "D'Alembert": 'Dalambér', 'Smith': 'Smit', 'Adam': 'Ádam', 'Wikipedia': 'Uikipedia',
}
LETTER = {'B': 'be', 'C': 'ce', 'D': 'de', 'F': 'efe', 'G': 'ge', 'H': 'hache', 'J': 'jota', 'K': 'ka', 'L': 'ele',
          'M': 'eme', 'N': 'ene', 'P': 'pe', 'Q': 'cu', 'R': 'erre', 'S': 'ese', 'T': 'te', 'V': 've', 'W': 'doble ve',
          'X': 'equis', 'Z': 'zeta'}
LOWER_LETTER = {k.lower(): v for k, v in LETTER.items()}
SYMBOL = {'%': 'por ciento', '=': 'igual a', '+': 'más', '−': 'menos', '·': 'por', '×': 'por', '<': 'menor que',
          '>': 'mayor que', '≈': 'aproximadamente', '→': 'entonces', '≤': 'menor o igual que', '≥': 'mayor o igual que',
          '&': 'y', '—': '', '–': '', '-': ''}
YEARS_RANGE = re.compile(r'^(\d{3,4})[–-](\d{2,4})([.,;:]?)$')
PUNCT = re.compile(r'^([¿¡«"“(\[]*)(.*?)([.,;:!?»"”)\]…]*)$')


def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')


def word_key(s):
    """Forma de comparación: minúsculas, sin tildes ni signos."""
    return re.sub(r'[^a-zñ0-9]+', '', strip_accents(s.lower()).replace('ñ', 'n'))


def tokens(text):
    """Separa el texto en palabras visibles, uniendo 'EE. UU.' en una sola."""
    text = text.replace('EE. UU.', 'EE.UU.')
    return text.split()


def speak_tokens(text):
    """Lista de (palabra escrita, forma hablada). La forma hablada puede ser vacía (signos) o de varias palabras."""
    toks = tokens(text)
    out = []
    for i, t in enumerate(toks):
        nxt = toks[i + 1] if i + 1 < len(toks) else ''
        prv = toks[i - 1] if i else ''
        pre, core, post = PUNCT.match(t).groups()
        nxt_core = PUNCT.match(nxt).group(2) if nxt else ''
        prv_core = PUNCT.match(prv).group(2) if prv else ''
        sp = None
        if core in ACRO:
            sp = ACRO[core]
        elif core in RESPELL:
            sp = RESPELL[core]
        elif YEARS_RANGE.match(core + post):
            a, b, _ = YEARS_RANGE.match(core + post).groups()
            if len(b) == 2:
                b = a[:2] + b
            sp = num(int(a)) + ' a ' + num(int(b))
        elif core.startswith('$') and NUM_RE.match(core[1:]):
            sp = number_words(core[1:], noun=True) + ' pesos'
        elif core.endswith('°') and NUM_RE.match(core[:-1]):
            sp = number_words(core[:-1], noun=True) + (' grado' if core[:-1] == '1' else ' grados')
        elif NUM_RE.match(core):
            unit = UNITS.get(nxt_core)
            fem = bool(unit and unit[2]) or nxt_core.lower() in FEM_NOUNS
            noun = not post and ((bool(unit) and nxt_core != '%') or (bool(re.match(r'^[a-záéíóúñ]', nxt_core)) and nxt_core not in NOT_NOUN))
            sp = number_words(core, fem=fem, noun=noun)
        elif core in UNITS and NUM_RE.match(prv_core.lstrip('$')):
            n = prv_core.lstrip('$')
            one = re.sub(r'[^\d,]', '', n) in ('1', '1,0')
            sp = UNITS[core][0] if one else UNITS[core][1]
        elif core in SYMBOL:
            sp = SYMBOL[core]
        elif len(core) == 1 and core in LETTER:
            sp = LETTER[core]
        elif core == 'Y' and prv_core in ('X', 'Y', 'un', 'su', 'cromosoma') and not PUNCT.match(prv).group(3):
            sp = 'i griega'
        elif len(core) == 1 and core in LOWER_LETTER:
            sp = LOWER_LETTER[core]
        else:
            sp = core
        post = re.sub(r'[^.,;:!?…]', '', post)
        pre = re.sub(r'[^¿¡]', '', pre)
        out.append((t, pre + sp + post if sp else post))
    return out


def spoken(text):
    s = ' '.join(sp for _, sp in speak_tokens(text) if sp)
    s = re.sub(r'\s+([.,;:!?])', r'\1', s)
    return re.sub(r'\s+', ' ', s).strip()


LEFTOVER = re.compile(r'[0-9=+−·×/√∛²³⁻ᵗˣᵥ₂₃₄<>≈→%$°λ()]')


def problems(sp):
    """Signos que la voz no debería recibir."""
    return sorted(set(LEFTOVER.findall(sp)))


SENT_SPLIT = re.compile(r'(?<=[.!?…:;])\s+(?=[A-ZÁÉÍÓÚÑ¿¡0-9«"“])')


def sentences(text):
    """Frases cortas para la voz (las muy largas se cortan en las comas)."""
    out = []
    for p in SENT_SPLIT.split(re.sub(r'\s+', ' ', text).strip()):
        if len(p) <= 230:
            if p:
                out.append(p)
            continue
        cur = ''
        for c in re.split(r',\s+', p):
            if cur and len(cur) + len(c) > 200:
                out.append(cur + ',')
                cur = c
            else:
                cur = cur + ', ' + c if cur else c
        if cur:
            out.append(cur)
    return out
