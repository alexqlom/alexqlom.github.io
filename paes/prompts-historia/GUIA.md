# Guía para los videos de Historia PAES (Remotion + voz de Fernando Martínez)

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
