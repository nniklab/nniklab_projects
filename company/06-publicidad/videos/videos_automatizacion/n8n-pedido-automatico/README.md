# n8n · El pedido que se registra solo

Video corto que muestra para qué sirve automatizar con n8n, usando un caso que cualquier negocio reconoce: llega un pedido y alguien tiene que copiarlo a mano en varios lugares. El video enseña el antes (trabajo manual) y el después (un flujo que lo hace solo), y termina con la marca nniklab.

**Estado:** listo para producir en Claude Design. Guion, tiempos, recursos y audio cerrados el 2026-10-20 (ver "Cómo producirlo en Claude Design").

## Objetivo

Que quien lo vea entienda en menos de 30 segundos que una tarea repetitiva puede hacerse sola, y que nniklab es quien la monta. Se vende el **beneficio (tiempo y cero errores)**, no la herramienta: no hace falta saber qué es n8n para entenderlo.

## Público

Dueños y responsables de negocios pequeños y medianos (tiendas, distribuidoras, servicios) que reciben pedidos o solicitudes por correo, formulario o WhatsApp y los registran a mano.

## Formato

| Parámetro | Valor |
|-----------|-------|
| Orientación | Vertical 9:16 (Reels, TikTok, Shorts, historias) |
| Resolución | 1080 × 1920 |
| Cuadros por segundo | 30 fps |
| Duración | ≈ 25 s |
| Salida | MP4 H.264 + audio AAC |
| Zona segura | Textos y elementos clave dentro de un margen de 120 px a los lados y 260 px arriba y abajo (las redes tapan esas franjas con botones y texto) |

## Identidad visual

Se aplica la guía de `../../README.md`. En resumen, para este video:

- **Fondo:** grafito `#111418`. Tarjetas y nodos sobre superficie `#1A1D22` con borde `#2A2E35`.
- **Acento:** lima `#C6F432`, solo para lo que avanza o se completa (el paquete, el nodo activo, los checks). Nunca más del ≈ 10 % de la pantalla.
- **Textos grandes:** Space Grotesk 700. **Textos de apoyo:** Inter 400/500 en blanco hueso `#F4F4F2` o gris `#9CA3AF`.
- **Nombres de nodos y datos del pedido:** JetBrains Mono 400.
- **El logo no aparece hasta la escena 4.** El paquete es un cuadrado lima, el mismo lenguaje visual que el punto del logo, pero sin mostrar la marca antes del cierre.

## Personaje central: el paquete

Un **cuadrado lima de 28 × 28 px** que representa el pedido. Es lo único que se mueve de forma continua en la escena 2, y el ojo lo sigue de nodo en nodo.

- Siempre cuadrado: no se redondea, no se estira, no rota.
- Cuando viaja, deja una estela lima tenue (opacidad 35 %) que se borra en 0,5 s.
- Al llegar a un nodo, lo "enciende": borde del nodo pasa a lima y aparece un check.
- Lleva al lado una etiqueta pequeña en JetBrains Mono con el dato que transporta (ver escena 2).

## Escenas

### Escena 1 · El problema (0,0 – 5,0 s)

**Qué se ve:** una lista de tareas manuales, como un post-it digital, que se va llenando mientras un reloj corre rápido.

| Tiempo | Acción |
|--------|--------|
| 0,0 – 0,6 s | Fondo grafito. Entra desde abajo el texto grande: **"Llega un pedido…"** |
| 0,6 – 3,2 s | Aparecen una por una (cada 0,6 s) cuatro tareas con casilla vacía, en Inter 500: <br>1. Copiar los datos del correo <br>2. Pegarlos en la hoja de pedidos <br>3. Avisar al equipo <br>4. Responder al cliente |
| 0,6 – 4,0 s | Arriba a la derecha, un reloj (ícono `clock`) con un contador que sube rápido: `0 min` → `15 min`, en JetBrains Mono gris. |
| 3,2 – 4,2 s | El texto grande cambia a la pregunta: **"¿Cuánto tiempo pierdes copiando y pegando?"** |
| 4,2 – 5,0 s | La lista se encoge y se desliza hacia arriba hasta desaparecer (transición a la escena 2). |

**Detalle:** las casillas quedan vacías a propósito; en la escena 3 se marcan solas.

### Escena 2 · El flujo (5,0 – 14,0 s)

**Qué se ve:** cuatro nodos en columna (por el formato vertical), unidos por líneas. El paquete los recorre de arriba abajo.

**Los nodos** (tarjetas de 640 × 120 px, radio 18 px, centradas, separadas 150 px):

| # | Ícono (Lucide) | Etiqueta | Dato que muestra al activarse |
|---|----------------|----------|-------------------------------|
| 1 | `mail` | Nuevo pedido | `Pedido #1048 · Ana R.` |
| 2 | `table` | Guardar en hoja | `fila 214 añadida` |
| 3 | `bell` | Avisar al equipo | `#ventas notificado` |
| 4 | `send` | Confirmar al cliente | `correo enviado` |

| Tiempo | Acción |
|--------|--------|
| 5,0 – 5,6 s | Texto superior en Inter 500 gris: **"Con un flujo automático en n8n"**. Debajo, pequeño, en JetBrains Mono gris: `proceso de ejemplo` (regla de marca: sin casos inventados; los ejemplos se rotulan). |
| 5,4 – 7,0 s | Los nodos aparecen de arriba abajo, uno cada 0,3 s: fade + subida de 20 px. Las líneas entre ellos se dibujan de arriba abajo (trazo punteado gris `#2A2E35`). |
| 7,0 – 7,4 s | Aparece el paquete en el nodo 1 con un pop corto (escala de 0 a 1, sin pasar de 1,1). El nodo 1 se enciende. |
| 7,4 – 12,6 s | El paquete viaja por las líneas: **≈ 0,9 s de viaje + 0,4 s de pausa** en cada nodo. En cada llegada: borde del nodo a lima, check lima en el ícono, y el dato aparece debajo de la etiqueta escribiéndose en JetBrains Mono (efecto máquina de escribir, 0,3 s). La línea recorrida queda en lima; la que falta, gris. |
| 12,6 – 14,0 s | Con los cuatro nodos encendidos, el flujo completo da un pulso lima suave (opacidad del borde 100 % → 60 % → 100 %). Transición: los nodos se desvanecen de arriba abajo. |

**Movimiento del paquete:** curva de aceleración `ease-in-out` en cada tramo; acelera al salir y frena al llegar, como si "entregara" algo. Pequeño rebote vertical de 6 px al llegar a cada nodo (solo posición, sin deformarse).

### Escena 3 · El resultado (14,0 – 20,0 s)

**Qué se ve:** vuelve la lista de la escena 1, pero ahora se completa sola en un instante.

| Tiempo | Acción |
|--------|--------|
| 14,0 – 14,6 s | La lista de las cuatro tareas regresa desde arriba, igual que se fue. |
| 14,6 – 15,4 s | Las cuatro casillas se marcan con check lima en cascada rápida (0,15 s entre cada una), con un pequeño pop. |
| 15,4 – 17,0 s | El reloj vuelve: el `15 min` se tacha con una línea lima y al lado aparece, más grande, **`3 s`** en Space Grotesk 700 lima. |
| 17,0 – 19,4 s | La lista se desvanece y queda el texto grande, en dos líneas que entran una tras otra: <br>**"Automatiza lo repetitivo."** <br>**"Dedícate a lo importante."** |
| 19,4 – 20,0 s | Todo se desvanece a fondo grafito vacío. |

### Escena 4 · Cierre de marca (20,0 – 25,0 s)

Es la animación **"logo tecleado"** ya aprobada como prueba (`recursos/animacion/cierre-logo-tecleado.html`), sin cambios:

1. Cursor lima parpadeando en pantalla vacía (1 s).
2. "nniklab" se teclea letra por letra con ritmo humano (≈ 0,9 s).
3. El cursor se encoge a cuadrado y salta sobre la "i": se convierte en el punto de dato.
4. Pulso del punto y revelado de "AI, Data & Automation".
5. Logo quieto hasta el final.

Es el **único** momento del video donde aparece la marca. Usa el SVG oficial `01-marca/logo/final/svg/nniklab-logo-descriptor-oscuro.svg`, con las letras separadas para animarlas (la prueba ya las trae separadas).

## Audio

| Momento | Sonido |
|---------|--------|
| Todo el video | **Música de fondo elegida:** `recursos/musica/tech-explainer-background-loop.mp3` (Tech Explainer Background Loop, Vadim_Makes_Sound, Pixabay; 30 s, hace loop). Se usa desde el segundo 0 durante los 25 s. Volumen bajo (≈ 30 %) en la escena 1, sube a ≈ 50 % al entrar el flujo y baja con un fade de 2 s mientras se teclea el logo. Va siempre por debajo de los efectos. |
| Escena 1 | Tic-tac acelerado del reloj, suave (`recursos/efectos/tic-tac.mp3`). |
| Escena 2 | Un "pop" corto cuando el paquete llega a cada nodo (4 en total): `recursos/efectos/pop.mp3`, adelantado 0,16 s (trae silencio al inicio). |
| Escena 3 | Clics rápidos de los checks (`clic.mp3`, adelantado 0,14 s); un golpe grave cuando aparece `3 s` (`golpe-grave.mp3`, al ≈ 60 % de volumen: es el efecto más fuerte). |
| Escena 4 | Una tecla por letra (7, `tecla.mp3`) y un "clic" cuando el punto aterriza sobre la "i" (`clic.mp3`). La música baja en los últimos 2 s. |

## Recursos

Todo lo propio de este video está en esta carpeta, en `recursos/`, incluida una copia de la música de fondo para tener el paquete completo. Lo que es de la marca (logo, tipografías) se usa desde su ubicación oficial, sin copiarlo.

```
n8n-pedido-automatico/
  README.md                         ← este instructivo
  recursos/
    iconos/                         ← íconos Lucide del video + licencia + muestra
    efectos/                        ← efectos de sonido (MP3) + README con fuentes y licencias
    musica/
      tech-explainer-background-loop.mp3   ← música de fondo elegida (copia de 06-publicidad/audio/)
    animacion/
      cierre-logo-tecleado.html     ← prueba aprobada del cierre de marca (escena 4)
```

| Recurso | Dónde | Estado |
|---------|-------|--------|
| Íconos `mail`, `table`, `bell`, `send`, `clock`, `check` | `recursos/iconos/` (Lucide v1.60.0, licencia ISC en `LICENSE.txt`) | ✅ Listo |
| Efectos de sonido (tecla, pop, clic, tic-tac, golpe grave) | `recursos/efectos/` (MP3 de Pixabay; fuentes y licencias en su `README.md`) | ✅ Listo |
| Música de fondo | `recursos/musica/tech-explainer-background-loop.mp3` (Pixabay Content License, uso comercial; registrada en `06-publicidad/audio/README.md`) | ✅ Listo |
| Animación del cierre | `recursos/animacion/cierre-logo-tecleado.html` | ✅ Prueba aprobada |
| Logo con descriptor (oscuro) | `01-marca/logo/final/svg/nniklab-logo-descriptor-oscuro.svg` | ✅ Compartido de la marca |
| Tipografías Space Grotesk, Inter, JetBrains Mono | `01-marca/tipografia/` | ✅ Compartido de la marca |

**Sobre n8n:** se nombra en texto ("Con un flujo automático en n8n"), pero no se usa su logo. Los nodos se dibujan con el estilo de nniklab, no como capturas de n8n. Si en una versión futura se quiere mostrar su logo o interfaz, revisar antes la guía de marca de n8n.

**Datos del pedido:** el pedido #1048, "Ana R." y la fila 214 son ficticios, y el contraste "15 min → 3 s" es ilustrativo; por eso el flujo va rotulado como `proceso de ejemplo`. No usar datos de clientes reales.

## Cómo producirlo en Claude Design

El video se arma en **Claude Design**, con el design system **nniklab** (que ya trae colores, tipografías, logos y las reglas de video y movimiento).

**1. Crear el diseño.** Nuevo diseño en Claude Design con el design system nniklab, lienzo vertical 1080 × 1920.

**2. Adjuntar estos archivos** (todos en esta carpeta, salvo el logo):

| Archivo | Para qué |
|---------|----------|
| `README.md` (este instructivo) | Guion, tiempos y reglas de cada escena |
| `recursos/iconos/*.svg` (6) | Íconos de los nodos, el reloj y los checks |
| `recursos/animacion/cierre-logo-tecleado.html` | Escena 4 ya resuelta: se reutiliza tal cual |
| `recursos/musica/tech-explainer-background-loop.mp3` | Música de fondo |
| `recursos/efectos/*.mp3` (5) | Efectos sincronizados con la animación |
| `01-marca/logo/final/svg/nniklab-logo-descriptor-oscuro.svg` | Logo oficial para el cierre (si el diseño no lo toma del design system) |

**3. Pedido sugerido** (copiar y pegar):

```
Crea un video animado vertical de 1080 × 1920 a 30 fps y unos 25 segundos para nniklab,
siguiendo exactamente el instructivo adjunto (README.md): "El pedido que se registra solo".

- Usa el design system nniklab: fondo grafito, lima solo como acento, Space Grotesk en
  títulos, Inter en textos y JetBrains Mono en nodos y datos.
- Cuatro escenas con los tiempos del instructivo: 1) el problema (lista de tareas y reloj),
  2) el flujo (cuatro nodos en columna que recorre un cuadrado lima, "el paquete"),
  3) el resultado (la lista se marca sola, 15 min → 3 s, frase final),
  4) el cierre: reutiliza tal cual la animación de cierre-logo-tecleado.html.
- La marca nniklab aparece SOLO en la escena 4.
- Usa los íconos Lucide adjuntos, la música tech-explainer-background-loop.mp3 y los efectos
  adjuntos en los momentos que indica la tabla de Audio.
- Rotula el flujo como "proceso de ejemplo". Respeta la zona segura de redes
  (120 px a los lados, 260 px arriba y abajo).
```

**4. Revisar escena por escena** contra las tablas de tiempos. Puntos clave: el paquete siempre cuadrado (sin redondear, estirar ni rotar), un solo acento lima por momento, la marca solo al final y el cuadro final limpio (logo recto, sin brillos).

**5. Exportar y guardar.**

- Video: MP4 H.264 + AAC, 1080 × 1920, 30 fps, como `n8n-pedido-automatico-v1.mp4` en esta carpeta. Si la exportación sale sin audio, se mezcla después la música y los efectos con `ffmpeg` (o se le pide a Claude).
- Proyecto editable: exportar el proyecto de Claude Design y guardarlo como `n8n-pedido-automatico-v1-recursos.zip`, igual que la intro v3.
- Anotar la versión en la tabla de abajo y en `../README.md`.

## Versiones

| Versión | Archivo | Cambios | Formato | Fecha |
|---------|---------|---------|---------|-------|
| _(por producir)_ | `n8n-pedido-automatico-v1.mp4` | Primera versión | 1080 × 1920 · 30 fps · ≈ 25 s | |
