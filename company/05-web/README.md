# Web

Sitio web de nniklab: una sola página con las secciones definidas en `estructura.md`. El código del sitio está en `sitio/`.

## Archivos

- `sitio/`: el sitio web (HTML, CSS y JavaScript, sin dependencias). Ver `sitio/README.md` para abrirlo y su estructura.
- `estructura.md`: estructura del sitio, sección por sección, con objetivos y textos.
- `recursos/tecnologias/`: logos de las tecnologías (SVG) para el diagrama "Cómo se conectan", con su fuente, licencia y reglas de uso.

## Diseño (Claude Design)

- **Propuesta v1 (2026-10-17):** lienzo "nniklab · Sitio web" en Claude Design, con la página completa en escritorio (1440 px) y en celular (390 px), hecha con el design system "nniklab". Enlace: https://claude.ai/artifact/9wNc6RJRdcEi75acDfVkff (privado: solo lo abre la cuenta de Juan, salvo que se comparta desde el menú Compartir del lienzo).
- Desde la v1.1 los cambios se hacen directo en el código de `sitio/`; el lienzo de Claude Design se queda como la propuesta v1 y no refleja los ajustes posteriores.
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

Cada versión nueva se anota aquí y se marca con una etiqueta de git (por ejemplo `web-v1.0`).

## Publicación

- **En línea:** https://nniklab.github.io/nniklab_projects/ (GitHub Pages, desde el 2026-10-17).
- **Cómo se publica:** `.github/workflows/publicar-web.yml` publica la carpeta `sitio/` cada vez que un push a `main` cambia algo dentro de ella. También se puede lanzar a mano desde la pestaña Actions → "Publicar sitio web".
- **Dominio propio:** pendiente; se configura en Settings → Pages. Al tenerlo, poner la URL completa en `og:image`, `og:url` y `canonical` de `index.html`.

## Historial

- **2026-10-17:** eliminados los borradores de landing (`landing-ejemplo-paleta4.png` y `-v2.png`); se rediseña desde la nueva estructura. Quedan en el historial de git.
