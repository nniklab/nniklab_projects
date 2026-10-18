# Sitio web nniklab

Sitio de una sola página, construido a partir de la propuesta de diseño v1 en Claude Design.
HTML, CSS y JavaScript sin dependencias ni paso de compilación: se puede abrir directo en el navegador o subir tal cual a cualquier hosting estático.

## Versión

**v1.0** (2026-10-17): primera versión, fiel al diseño v1. Historial de cambios en `../README.md`.

## Estructura

```
sitio/
├── index.html              ← la página (secciones de ../estructura.md)
├── favicon.ico             ← ícono "ni" (16, 32, 48 px)
├── apple-touch-icon.png    ← ícono para iPhone (180 px)
├── site.webmanifest        ← nombre e íconos para Android
└── assets/
    ├── css/
    │   ├── fuentes.css     ← @font-face de las tres fuentes de la marca
    │   └── nniklab.css     ← estados, animaciones, menú de celular
    ├── js/nniklab.js       ← menú de celular y halo que sigue el mouse
    ├── fonts/              ← Space Grotesk, Inter, JetBrains Mono (woff2, licencia OFL)
    └── img/
        ├── marca/          ← logos, íconos e imagen para compartir en redes (og-nniklab.jpg)
        ├── fotos/          ← fotos de "El problema" (JPG + WebP, 900 px)
        └── tecnologias/    ← logos del diagrama "Cómo se conectan"
```

## Cómo verlo

- Doble clic en `index.html`, o
- con un servidor local desde esta carpeta: `python -m http.server 8000` y abrir http://localhost:8000

## Notas técnicas

- Los estilos del diseño van en línea en `index.html` (tal como salieron de Claude Design); `nniklab.css` tiene la base, los estados (hover), las animaciones y los ajustes de celular.
- Las fuentes se sirven desde el propio sitio, no desde Google Fonts: carga más rápida y sin enviar datos de los visitantes a terceros.
- Animaciones en CSS puro. Si el sistema del visitante pide reducir el movimiento, la página se muestra sin animaciones.
- Fotos con carga diferida (`loading="lazy"`) y en WebP con respaldo JPG.

## Pendiente

- Botón "Agenda una reunión" del cierre: conectar el formulario de n8n (los demás botones bajan hasta el cierre).
- Foto de Juan en "Nosotros" (hoy es un recuadro "[FOTO DE JUAN]").
- Dominio propio (el sitio ya está publicado en GitHub Pages). Poner la URL completa en `og:image` y añadir `og:url` y `canonical` en `index.html`.
- Redes sociales en el pie de página.
