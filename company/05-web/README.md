# Web

Sitio web de nniklab: una sola página con las secciones definidas en `estructura.md`. El código del sitio está en `sitio/`.

## Archivos

- `sitio/`: el sitio web (HTML, CSS y JavaScript, sin dependencias). Ver `sitio/README.md` para abrirlo y su estructura.
- `estructura.md`: estructura del sitio, sección por sección, con objetivos y textos.
- `recursos/tecnologias/`: logos de las tecnologías (SVG) para el diagrama "Cómo se conectan", con su fuente, licencia y reglas de uso.

## Diseño (Claude Design)

- **Propuesta v1 (2026-10-17):** lienzo "nniklab · Sitio web" en Claude Design, con la página completa en escritorio (1440 px) y en celular (390 px), hecha con el design system "nniklab". Enlace: https://claude.ai/artifact/9wNc6RJRdcEi75acDfVkff (privado: solo lo abre la cuenta de Juan, salvo que se comparta desde el menú Compartir del lienzo).
- El diseño vive en Claude, no en este repositorio. Cuando se apruebe, se construye el sitio en código en esta carpeta, con las animaciones completas.

## Recursos que se reutilizan (no se copian aquí)

- Logo y favicon: `../01-marca/logo/final/`.
- Paleta y tipografía: `../01-marca/colores/` y `../01-marca/tipografia/`.
- Gráficos y fondos fotográficos: `../06-publicidad/imagenes/` (ver su README; los fondos para la web están marcados en "Uso sugerido").

## Versiones del sitio

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **v1.0** | 2026-10-17 | Primera versión, construida desde la propuesta de diseño v1: portada con animación en tres escenas (datos, automatización, IA), flujos de datos y halo que sigue el mouse; "El problema" con fotos; servicios; "Cómo se conectan"; proceso; ejemplos; nosotros; tecnologías; cierre animado. Fuentes propias, menú de celular e imagen para compartir en redes. |

Cada versión nueva se anota aquí. Para publicar una versión se usa una etiqueta de git (por ejemplo `web-v1.0`).

## Historial

- **2026-10-17:** eliminados los borradores de landing (`landing-ejemplo-paleta4.png` y `-v2.png`); se rediseña desde la nueva estructura. Quedan en el historial de git.
