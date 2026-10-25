# Contexto de trabajo

Archivo para retomar el trabajo desde cualquier equipo o conversación nueva.
Se actualiza al final de cada sesión.

## Cómo retomar

En una conversación nueva con Claude, pide: "conecta el repo nniklab/nniklab_projects y lee CONTEXTO.md".

## Cómo sincronizar

- Copia local de trabajo: `C:\Users\jheredia\Documents\nniklab_Project` (rama `main`).
- Claude edita los archivos en la copia local; el commit y el push se hacen desde ese equipo para que GitHub y la copia local no se desfasen.
- Antes de empezar una sesión: `git pull`.

## Convenciones

- Una carpeta por proyecto, con nombre en minúsculas y guiones (ej. `mi-proyecto`). Lo mismo para subcarpetas y archivos.
- Cada carpeta de proyecto tiene su `README.md` y su `NOTAS.md`.
- Piezas con versiones: `nombre-de-la-pieza-vN.ext`; la vigente es la de número más alto y las anteriores se conservan.
- Lo descartado se elimina (queda en el historial de git); lo guardado para el futuro va a `99-respaldo/`.
- Al terminar una sesión se actualiza este archivo y el `NOTAS.md` del proyecto.

## Estado actual

- **2026-10-10:** repositorio configurado con la estructura base.
- **2026-10-10:** creado el proyecto `company/` (marca y servicios). Ver `company/NOTAS.md`.
- **2026-10-10:** company: definidos nombre (nniklab), descriptor (AI, Data & Automation), idioma (español salvo el descriptor), paleta oficial (grafito + lima) y tipografía oficial (Space Grotesk + Inter + JetBrains Mono).
- **2026-10-10:** company: logo final "Punto de dato" producido en `company/01-marca/logo/final/`.
- **2026-10-10:** company: creada `company/06-publicidad/` con el video intro de la marca (v2 vigente, Full HD con música) y dos pistas de audio de Pixabay para usar en videos.
- **2026-10-11:** revisión del repositorio: carpeta `Company/` renombrada a `company/`, eliminados archivos de logo duplicados, documentación actualizada y añadido `.gitignore`.
- **2026-10-11:** company: creada `company/06-publicidad/imagenes/` para las imágenes del video (vacía, con su README de criterios y licencias).
- **2026-10-11:** company: cuatro gráficos de marca para el video (datos, IA, automatización, integración de apps) en `company/06-publicidad/imagenes/graficos/`.
- **2026-10-11:** company: tres fondos fotográficos de Pexels y Unsplash en `company/06-publicidad/imagenes/fondos/`.
- **2026-10-11:** company: video intro v3 (vertical 9:16, 22 s), ahora la versión vigente, con su proyecto editable en `company/06-publicidad/videos/`.
- **2026-10-17:** se trabaja desde la copia local del repositorio (ver "Cómo sincronizar").
- **2026-10-17:** company: se inicia el sitio web de la empresa en `company/05-web/`. Antes de construirlo se afina el contexto de la empresa (servicios, slogan, misión y visión).
- **2026-10-17:** company: slogan oficial, catálogo de servicios, perfil del fundador y nueva estructura del sitio web (`company/05-web/estructura.md`). Borradores de landing eliminados. Estructura cerrada por ahora: pie de página solo con logo, teléfono y correo.
- **2026-10-17:** company: logos de tecnologías para el diagrama de la web (`company/05-web/recursos/tecnologias/`); la franja de tecnologías va solo en texto y el pie lleva un aviso de marcas registradas.
- **2026-10-17:** company: cuatro fondos de Pexels para la web en `company/06-publicidad/imagenes/fondos/`.
- **2026-10-17:** company: propuesta de diseño v1 del sitio en Claude Design (enlace en `company/05-web/README.md`).
- **2026-10-17:** company: sitio web v1.0 construido en `company/05-web/sitio/`, etiquetado como `web-v1.0` y publicado en GitHub Pages: https://nniklab.github.io/nniklab_projects/ (se republica solo con cada push que cambie el sitio; `.github/workflows/publicar-web.yml`).
- **2026-10-19:** company: sitio web v1.1 (etiquetas de sección más grandes (16 px escritorio, 18 px celular, para que se lean en el celular) y unificadas con una sola barra; `/ejemplos` pasa a `/soluciones` (también en el menú y el ancla `#soluciones`); `// stack` pasa a `/tecnologías`). Etiqueta `web-v1.1`. Los ajustes se hacen en el código; el lienzo de Claude Design queda como propuesta v1.
- **2026-10-19:** company: el lienzo de Claude Design se actualiza junto con el código en cada ajuste, para revisar los cambios antes de publicar.
- **2026-10-19:** company: sitio web v1.2: se quita la sección "Cómo se conectan" (su contexto queda en `company/06-publicidad/ideas/video-como-se-conectan/` para un video publicitario propio) y "Tecnologías" pasa a seis tarjetas, con carrusel en celular (5 s por tarjeta, flechas ← → e indicadores). Etiqueta `web-v1.2`.
- **2026-10-19:** company: sitio web v1.3: nuevo orden (lo que te frena → servicios → qué puedes lograr → cómo trabajamos → tecnologías → equipo → cierre); etiquetas `/lo_que_te_frena` (título "¿Te suena familiar? Esto te quita tiempo y dinero."), `/qué_puedes_lograr` y `/conoce_a_nuestro_equipo`; perfil de Juan resumido; carruseles en celular en cinco secciones; fondos que se alternan grafito / gris; en celular, portada sin animación y encabezado compacto. Etiqueta `web-v1.3`.
- **2026-10-19:** company: sitio web v1.3.1: ancla `#nosotros` → `#equipo`. Etiqueta `web-v1.3.1`.
- **2026-10-19:** company: sitio web v1.4: "Servicios" con etiqueta `/lo_que_hacemos`, título "Te ayudamos en tres frentes: datos, automatización e IA." y textos de tarjetas más cortos; en celular, tarjetas de los carruseles más bajas. El menú sigue diciendo "Servicios". Etiqueta `web-v1.4`.
- **2026-10-20:** company: videos promocionales organizados por servicio en `company/06-publicidad/videos/`: `videos_automatizacion/` (n8n, integración de apps y recursos relacionados) y `videos_data/` (extracción, consumo, ETL, dashboards); los videos de marca quedan en la raíz. Guía de organización, versiones e identidad visual (logo, tipografía, colores) en `videos/README.md`.
- **2026-10-20:** company: primer video de automatización, "El pedido que se registra solo" (n8n), listo para producir en Claude Design. Todo en `company/06-publicidad/videos/videos_automatizacion/n8n-pedido-automatico/`: instructivo con 4 escenas (vertical 1080 × 1920, ≈ 25 s), íconos Lucide, efectos de sonido y música de fondo (`tech-explainer-background-loop.mp3`) de Pixabay, y la animación de cierre "logo tecleado" (la marca aparece solo al final). Reglas de video y movimiento añadidas al design system "nniklab" de Claude.
- **2026-10-24:** company: sitio web v1.5: revisión de espacios superiores e inferiores en celular (secciones centrales en 64 px); el cierre baja de 112 a 80 px arriba y abajo solo en celular y se corrige la línea doble entre "Equipo" y el cierre. Commit y push hechos desde la sesión en la nube (hacer `git pull` en la copia local). Etiqueta `web-v1.5`.
- **2026-10-24:** company: sitio web v1.6: "Lo que hacemos" con una escena animada por servicio, flujo entre tarjetas y entrada escalonada; "Cómo trabajamos" con línea de tiempo que se llena con el scroll y miniatura de cada entregable. Ambas secciones compactas en celular (tarjeta y flechas caben en pantalla en iPhone 13-16 y Android de 360 px). Lienzo de Claude Design actualizado. Commit y push desde la sesión en la nube (hacer `git pull` en la copia local). Etiqueta `web-v1.6`.
- **2026-10-24:** company: sitio web v1.7: portada con flujos que rodean el texto y llegan a un panel integrador (sistemas → núcleo ni → tablero), halo anclado al panel; celular con la mitad de espacio entre secciones y sin el ejemplo combinado; equipo con un solo resumen de Juan. Se descartó la laptop con animación. Lienzo de Claude Design actualizado (título v1.7). Commit y push desde la sesión en la nube (hacer `git pull` en la copia local). Etiqueta `web-v1.7`.

## Próximos pasos

- company: producir en Claude Design el video `n8n-pedido-automatico` (v1) siguiendo su README y guardar el MP4 y sus recursos editables en su carpeta.
- company: mejoras al sitio (próxima versión v1.8), dominio propio, formulario de n8n y foto para "Conoce a nuestro equipo".
- company (más adelante): conector de n8n para el formulario y redes sociales.
- company (más adelante): video publicitario "Cómo se conectan" (ver `company/06-publicidad/ideas/video-como-se-conectan/`).
- company: detalle de cada servicio, misión, visión y valores, tarjeta de presentación final.
