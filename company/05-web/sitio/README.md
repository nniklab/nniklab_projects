# Sitio web nniklab

Sitio de una sola página, construido a partir de la propuesta de diseño v1 en Claude Design.
HTML, CSS y JavaScript sin dependencias ni paso de compilación: se puede abrir directo en el navegador o subir tal cual a cualquier hosting estático.

## Versión

**v1.6** (2026-10-24): "Lo que hacemos" con una escena animada por servicio, flujo entre tarjetas y entrada escalonada; "Cómo trabajamos" con línea de tiempo que se llena con el scroll y miniatura de cada entregable; ambas compactas en celular. v1.5 (2026-10-24): en celular, el cierre pasa de 112 a 80 px de espacio arriba y abajo; una sola línea entre "Equipo" y el cierre. v1.4 (2026-10-19): sección de servicios con etiqueta `/lo_que_hacemos` y título nuevo; tarjetas de los carruseles más bajas en celular. v1.3.1 (2026-10-19): ancla `#nosotros` → `#equipo`. v1.3 (2026-10-19): nuevo orden de secciones, etiquetas más comerciales, carruseles en celular en cinco secciones y fondos alternados. v1.2 (2026-10-19): sin la sección "Cómo se conectan"; "Tecnologías" en tarjetas, con carrusel en celular. v1.1 (2026-10-19): etiquetas de sección más grandes y unificadas; `/ejemplos` pasa a `/soluciones`. v1.0 (2026-10-17): primera versión, fiel al diseño v1. Historial de cambios en `../README.md`.

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
    ├── js/nniklab.js       ← menú de celular, halo que sigue el mouse y carruseles de celular (`.nk-carrusel`)
    ├── fonts/              ← Space Grotesk, Inter, JetBrains Mono (woff2, licencia OFL)
    └── img/
        ├── marca/          ← logos, íconos e imagen para compartir en redes (og-nniklab.jpg)
        └── fotos/          ← fotos de "El problema" (JPG + WebP, 900 px)
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
