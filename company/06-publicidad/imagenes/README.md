# Imágenes

Fotos, ilustraciones, íconos y gráficos para los videos, anuncios y la web de nniklab.

## Organización

- **Nombres de archivo:** en minúsculas y con guiones, describiendo el contenido (ej. `servidores-oscuro.jpg`, `dashboard-ventas.png`).
- **Gráficos propios** (dashboards, flujos, diagramas hechos con la marca): en `graficos/`, con prefijo `nniklab-grafico-` y separados en `png/` y `svg/`, igual que el logo.
- **Fondos fotográficos** (de bancos de imágenes): en `fondos/`, con el nombre `contenido-autor.jpg` (ej. `circuito-verde-vishnu-mohanan.jpg`).
- **Formato:** PNG o SVG para gráficos e ilustraciones; JPG para fotos. Mínimo 1920 × 1080 para usar en video Full HD.
- Cada imagen que se añade se registra en la tabla de abajo con su fuente y licencia.

## Criterios de selección

- Tonos oscuros que combinen con el grafito `#111418`; el lima `#C6F432` como acento.
- Temas: datos, IA, automatización, integración de aplicaciones, negocios.
- Personas: sí, en escenas de trabajo reales (decisión del 2026-10-17, para mostrar los problemas del cliente en la web), nunca ridiculizadas ni en situaciones ofensivas, y sin dar a entender que respaldan a nniklab. Evitar marcas o logos visibles.
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

## Fondos fotográficos

Los tres primeros se eligieron el 2026-10-11 entre unas 330 imágenes de Pexels, Unsplash y Pixabay; los cuatro siguientes, el 2026-10-17 entre unas 110 de Pexels, para la web; y las cuatro escenas de oficina (con personas), también el 2026-10-17, para las tarjetas de "El problema" (versión web de 1600 px). Para usarlos detrás de texto o de los gráficos, oscurecerlos entre un 40 y un 60 %.

| Archivo | Descripción | Uso sugerido | Tamaño | Fuente | Autor | Licencia |
|---------|-------------|--------------|--------|--------|-------|----------|
| `fondos/particulas-oscuras-cottonbro.jpg` | Partículas de polvo sobre negro | Fondo neutro para títulos y cierre | 4262 × 2842 | [Pexels](https://www.pexels.com/photo/9665214/) | cottonbro studio | Pexels License |
| `fondos/cubos-conectados-shubham-dhage.jpg` | Cubos conectados en red sobre negro | Escenas de datos e integración | 3840 × 2160 | [Unsplash](https://unsplash.com/photos/T9rKvI3N0NM) | Shubham Dhage | Unsplash License |
| `fondos/circuito-verde-vishnu-mohanan.jpg` | Circuito con pistas verdes en la oscuridad | Escenas de tecnología y automatización | 4592 × 3448 | [Unsplash](https://unsplash.com/photos/M0yAcynJr6M) | Vishnu Mohanan | Unsplash License |
| `fondos/ondas-verdes-engin-akyurt.jpg` | Ondas verdes en la parte baja, el resto negro | Portada de la web (propuesta inicial; no se usa en la web v1) | 7500 × 5000 | [Pexels](https://www.pexels.com/photo/5200063/) | Engin Akyurt | Pexels License |
| `fondos/espacio-oscuro-ijoxi-studios.jpg` | Espacio oscuro verde azulado con líneas de luz | Cierre de la web (propuesta inicial; no se usa en la web v1) | 4500 × 2532 | [Pexels](https://www.pexels.com/photo/13027585/) | iJoxi Studios | Pexels License |
| `fondos/lineas-de-luz-dennis-ariel.jpg` | Líneas finas de luz en diagonal (estelas) | Automatización y flujo de datos (no se usa en la web v1) | 4096 × 2731 | [Pexels](https://www.pexels.com/photo/17106977/) | Dennis Ariel | Pexels License |
| `fondos/microchips-jakub-pabis.jpg` | Microchips en primer plano sobre placa oscura | Datos y tecnología, oscurecida o desenfocada por los códigos de los chips (no se usa en la web v1) | 7008 × 4672 | [Pexels](https://www.pexels.com/photo/36169770/) | Jakub Pabis | Pexels License |
| `fondos/papeles-escritorio-tima-miroshnichenko.jpg` | Escritorio cubierto de reportes impresos junto a una laptop | Web, problema 01 (dispersión) | 1600 × 1067 | [Pexels](https://www.pexels.com/photo/6694878/) | Tima Miroshnichenko | Pexels License |
| `fondos/trabajo-nocturno-oktay-koseoglu.jpg` | Persona trabajando sola de noche en la laptop | Web, problema 02 (trabajo manual) | 1600 × 1061 | [Pexels](https://www.pexels.com/photo/30215681/) | Oktay Köseoğlu | Pexels License |
| `fondos/digitando-documento-vanessa-garcia.jpg` | Hombre digitando un documento impreso en la laptop | Web, problema 03 (tareas repetitivas) | 1600 × 1067 | [Pexels](https://www.pexels.com/photo/6326031/) | Vanessa Garcia | Pexels License |
| `fondos/duda-documento-kaboompics.jpg` | Hombre revisando un documento con duda | Web, problema 04 (decisiones a ciegas) | 1600 × 1067 | [Pexels](https://www.pexels.com/photo/7877111/) | Kaboompics | Pexels License |

Las licencias de Pexels y Unsplash permiten uso comercial sin atribución obligatoria.

### Otras candidatas de la selección (no descargadas)

| Descripción | Fuente |
|-------------|--------|
| Líneas diagonales sobre negro | [Unsplash · Jr Korpa](https://unsplash.com/photos/mwYTmjpcxIc) |
| Red de nodos con tono verde | [Pixabay](https://pixabay.com/illustrations/communication-digital-computer-4871245/) |
| Esfera de puntos | [Unsplash · BoliviaInteligente](https://unsplash.com/photos/5-GgBB4W5h0) |
| Estelas de luz verde | [Pexels](https://www.pexels.com/photo/14146609/) |
| Fibra óptica verde desenfocada | [Unsplash · Sander Weeteling](https://unsplash.com/photos/FZY6AarjY08) |
| Líneas que se cruzan y conectan | [Unsplash · Gábor Szűts](https://unsplash.com/photos/X6prM41CTsM) |
| Servidores con luz verde | [Unsplash · Tyler](https://unsplash.com/photos/OnI_TNcIv9U) |
