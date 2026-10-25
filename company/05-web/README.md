# Web

Sitio web de nniklab: una sola página con las secciones definidas en `estructura.md`. El código del sitio está en `sitio/`.

## Archivos

- `sitio/`: el sitio web (HTML, CSS y JavaScript, sin dependencias). Ver `sitio/README.md` para abrirlo y su estructura.
- `estructura.md`: estructura del sitio, sección por sección, con objetivos y textos.
- `recursos/tecnologias/`: logos de las tecnologías (SVG) para el diagrama "Cómo se conectan" (quitado del sitio en la v1.2; se reservan para su video), con su fuente, licencia y reglas de uso.

## Diseño (Claude Design)

- **Propuesta v1 (2026-10-17):** lienzo "nniklab · Sitio web" en Claude Design, con la página completa en escritorio (1440 px) y en celular (390 px), hecha con el design system "nniklab". Enlace: https://claude.ai/artifact/9wNc6RJRdcEi75acDfVkff (privado: solo lo abre la cuenta de Juan, salvo que se comparta desde el menú Compartir del lienzo).
- Desde la v1.1 cada ajuste se aplica a la vez en el código de `sitio/` y en el lienzo de Claude Design, para revisarlo ahí antes de publicar.
- El diseño vive en Claude, no en este repositorio. Cuando se apruebe, se construye el sitio en código en esta carpeta, con las animaciones completas.

## Recursos que se reutilizan (no se copian aquí)

- Logo y favicon: `../01-marca/logo/final/`.
- Paleta y tipografía: `../01-marca/colores/` y `../01-marca/tipografia/`.
- Gráficos y fondos fotográficos: `../06-publicidad/imagenes/` (ver su README; los fondos para la web están marcados en "Uso sugerido").

## Versiones del sitio

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **v1.0** | 2026-10-17 | Primera versión, construida desde la propuesta de diseño v1: portada con animación en tres escenas (datos, automatización, IA), flujos de datos y halo que sigue el mouse; "El problema" con fotos; servicios; "Cómo se conectan"; proceso; ejemplos; nosotros; tecnologías; cierre animado. Fuentes propias, menú de celular e imagen para compartir en redes. |
| **v1.1** | 2026-10-19 | Etiquetas de sección: más grandes (16 px en escritorio, 18 px en celular) y unificadas con una sola barra (`/el_problema`, `/servicios`, `/cómo_se_conectan`, `/cómo_trabajamos`, `/soluciones`, `/nosotros`, `/tecnologías`). `/ejemplos` pasa a `/soluciones`, también en el menú. |
| **v1.2** | 2026-10-19 | Se quita la sección "Cómo se conectan" (ocupaba mucho espacio, sobre todo en el celular). Su contexto queda en `../06-publicidad/ideas/video-como-se-conectan/` para un video propio. "Tecnologías" pasa de lista de texto a seis tarjetas (la sexta invita a contactar si el cliente usa otra herramienta); en celular es un carrusel que avanza solo cada 5 s, con flechas ← → e indicadores. |
| **v1.3** | 2026-10-19 | Nuevo orden de secciones (Lo que te frena → Servicios → Qué puedes lograr → Cómo trabajamos → Tecnologías → Conoce a nuestro equipo → Cierre). Etiquetas `/lo_que_te_frena` (título "¿Te suena familiar? Esto te quita tiempo y dinero."), `/qué_puedes_lograr` y `/conoce_a_nuestro_equipo`; menú actualizado. Perfil de Juan resumido y con la etiqueta y el título antes de la foto. En celular, carruseles en Lo que te frena, Servicios, Qué puedes lograr, Cómo trabajamos y Tecnologías (página unos 35 % más corta). Fondos que se alternan grafito / gris superficie. En celular, la portada queda sin animación (solo lo principal) y con menos espacio arriba; el encabezado es compacto y en tablet el menú pasa a desplegable. |
| **v1.3.1** | 2026-10-19 | El ancla de "Conoce a nuestro equipo" pasa de `#nosotros` a `#equipo` (sección y enlace del menú), para que coincida con el nombre nuevo. |
| v1.4 | 2026-10-19 | "Servicios": etiqueta `/lo_que_hacemos`, título "Te ayudamos en tres frentes: datos, automatización e IA." y subtítulo "Contrátalos por separado o juntos…"; textos de sus tarjetas más cortos. En celular, tarjetas de los carruseles más bajas (menos relleno y títulos más chicos); la de servicios pasa de 649 a 482 px. El menú sigue diciendo "Servicios". |
| v1.5 | 2026-10-24 | Revisión de espacios superiores e inferiores en celular: todas las secciones centrales quedan en 64 px. El cierre ("¿Hablamos de tus datos?") baja de 112 a 80 px arriba y abajo solo en celular (en escritorio sigue con 112-176 px). Se quita el borde superior del cierre, que sumado al borde inferior de "Equipo" formaba una línea doble. |
| v1.6 | 2026-10-24 | "Lo que hacemos": cada tarjeta lleva una escena animada en lugar del ícono (01 Datos: barras que crecen y un indicador que cuenta; 02 Automatización: un pedido que recorre pedido → validar → registrar, de 15 min a 20 s; 03 IA: un documento que se escanea y sus campos que se llenan). En escritorio, un pulso salta entre las tarjetas (datos → automatización → IA) y las tarjetas entran escalonadas al bajar. "Cómo trabajamos": en escritorio la línea entre etapas se llena con el scroll y enciende cada etapa; "RECIBES" muestra una miniatura animada del entregable (mapa de procesos priorizado, propuesta con cronograma, pruebas aprobadas, gráfica de resultados) en lugar del ícono. Se probó y descartó una franja con "Agenda una reunión" al final de la sección: el botón ya está en el encabezado fijo. En celular ambas secciones se compactan para que la tarjeta y sus flechas quepan en pantalla (iPhone 13-16 y Android de 360 px). Con "reducir movimiento" todo queda quieto en su estado final. |
| **v1.7** | 2026-10-24 | Portada (escritorio): las líneas del fondo ya no cruzan el texto; entran por arriba y por abajo, bajan por el espacio entre columnas y llegan a cada sistema del panel. El panel pasa de tres escenas (repetían "Lo que hacemos") a una escena integradora: "Tus sistemas, conectados en un solo flujo." (Excel, ERP, CRM y correo → núcleo "ni" con automatización + agentes IA → tablero), con barra DATOS → AUTOMATIZACIÓN + IA → DECISIONES y un ciclo de 6 s. El halo queda detrás del panel en cualquier ancho y se acerca al mouse solo un 40 %. Se probó y descartó una laptop con la animación en pantalla. Celular: espacio entre secciones a la mitad (64 → 32 px; cierre 80 → 40; portada 24/28) y sin el ejemplo "Un pedido, de principio a fin"; la página pasa de 7672 a 6234 px. "Conoce a nuestro equipo": sin título, párrafo ni las tres áreas; un solo resumen: "+10 años liderando proyectos de software, datos y automatización: del diagnóstico a la solución funcionando." |

Cada versión nueva se anota aquí y se marca con una etiqueta de git (por ejemplo `web-v1.0`).

## Publicación

- **En línea:** https://nniklab.github.io/nniklab_projects/ (GitHub Pages, desde el 2026-10-17).
- **Cómo se publica:** `.github/workflows/publicar-web.yml` publica la carpeta `sitio/` cada vez que un push a `main` cambia algo dentro de ella. También se puede lanzar a mano desde la pestaña Actions → "Publicar sitio web".
- **Dominio propio:** pendiente; se configura en Settings → Pages. Al tenerlo, poner la URL completa en `og:image`, `og:url` y `canonical` de `index.html`.

## Historial

- **2026-10-17:** eliminados los borradores de landing (`landing-ejemplo-paleta4.png` y `-v2.png`); se rediseña desde la nueva estructura. Quedan en el historial de git.
