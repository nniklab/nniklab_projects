# Imágenes

Fotos, ilustraciones, íconos y gráficos para los videos y anuncios de nniklab.

## Organización

- **Nombres de archivo:** en minúsculas y con guiones, describiendo el contenido (ej. `servidores-oscuro.jpg`, `dashboard-ventas.png`).
- **Gráficos propios** (dashboards, flujos, diagramas hechos con la marca): en `graficos/`, con prefijo `nniklab-grafico-` y separados en `png/` y `svg/`, igual que el logo.
- **Imágenes externas** (fotos, ilustraciones de bancos de imágenes): directamente en esta carpeta.
- **Formato:** PNG o SVG para gráficos e ilustraciones; JPG para fotos. Mínimo 1920 × 1080 para usar en video Full HD.
- Cada imagen que se añade se registra en la tabla de abajo con su fuente y licencia.

## Criterios de selección

- Tonos oscuros que combinen con el grafito `#111418`; el lima `#C6F432` como acento.
- Temas: datos, IA, automatización, integración de aplicaciones, negocios.
- Evitar personas reconocibles y marcas o logos visibles (las plataformas gratuitas no incluyen permisos de modelo ni de propiedad).
- Las ilustraciones e íconos, recoloreados con la paleta oficial (ver `../../01-marca/colores/`).

## Fuentes recomendadas

| Fuente | Tipo | Licencia |
|--------|------|----------|
| [Pexels](https://www.pexels.com) | Fotos y clips de video | Uso comercial gratis, sin atribución |
| [Pixabay](https://pixabay.com) | Fotos, ilustraciones y video | Pixabay Content License (igual que el audio) |
| [Unsplash](https://unsplash.com) | Fotos | Uso comercial gratis, sin atribución; las marcadas **Unsplash+** son de pago |
| [unDraw](https://undraw.co) | Ilustraciones con color personalizable | Gratis, sin atribución |
| [Storyset](https://storyset.com) | Ilustraciones animables | Gratis con atribución |
| [Lucide](https://lucide.dev) / [Phosphor](https://phosphoricons.com) | Íconos SVG | Código abierto |

Verificar la licencia en la página de cada imagen antes de publicar.

## Gráficos propios

Creados el 2026-10-11 con la paleta y la tipografía oficiales, 1920 × 1080, uno por escena del video. Son de nniklab: no tienen restricciones de licencia. Los datos que muestran son ficticios.

| Archivo | Escena | Contenido |
|---------|--------|-----------|
| `graficos/png/nniklab-grafico-datos-dashboard.png` | Datos | Panel de ventas: indicadores, ingresos de 12 meses y ventas por canal |
| `graficos/png/nniklab-grafico-ia-documentos.png` | IA | La IA lee una factura, extrae sus datos, la clasifica y la envía a contabilidad |
| `graficos/png/nniklab-grafico-automatizacion-flujo.png` | Automatización | Flujo de un pedido en 5 pasos, con la IA al centro; tiempo por pedido de 15 min a 20 s |
| `graficos/png/nniklab-grafico-integracion-apps.png` | Integración | Ícono "ni" conectando CRM, ERP, facturación, correo, tienda online y hojas de cálculo |

- **Para el video usa los PNG.** Los SVG sirven para editar; sus textos usan las fuentes de la marca, así que se ven bien solo en equipos que las tienen instaladas.
- **Para cambiar textos o cifras:** edita `graficos/generar-graficos.py` y vuelve a generarlos (`python3 generar-graficos.py <carpeta-de-salida>`), o pídeselo a Claude.

## Imágenes externas

| Archivo | Descripción | Fuente | Autor | Licencia | Usada en |
|---------|-------------|--------|-------|----------|----------|
| _(ninguna todavía)_ | | | | | |
