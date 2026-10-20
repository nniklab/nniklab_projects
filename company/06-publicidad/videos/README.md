# Videos

Videos promocionales de nniklab. Se organizan por línea de servicio, para que cada campaña tenga su propio espacio y sea fácil encontrar, versionar y reutilizar las piezas.

## Organización

| Carpeta | Para qué es | Ejemplos de temas |
|---------|-------------|-------------------|
| `./` (raíz) | Videos de **marca**: presentan nniklab en general | Intro nniklab (`nniklab-intro-vN.mp4`) |
| `videos_automatizacion/` | Exclusiva para promocionar **automatización** | Flujos en n8n, integración entre apps, tareas repetitivas que se automatizan, notificaciones, bots, otros recursos de automatización |
| `videos_data/` | Exclusiva para promocionar **manejo de datos** | Extracción de datos, consumo de APIs, ETL, limpieza y transformación, bases de datos, reportes y dashboards |

**Por qué separarlas:** automatización y datos son dos servicios que se venden a públicos y problemas distintos. Tener una carpeta por servicio evita mezclar piezas, permite producir series de videos de cada tema y facilita saber qué hay publicado de cada uno. Si un video trata los dos temas por igual (por ejemplo, cómo se conectan datos, automatización e IA), va en la raíz como pieza de marca.

## Dentro de cada carpeta

Cada video es una subcarpeta con su nombre:

```
videos_automatizacion/
  n8n-reporte-automatico/
    n8n-reporte-automatico-v1.mp4
    n8n-reporte-automatico-v2.mp4
    n8n-reporte-automatico-v2-recursos.zip   ← proyecto editable
    README.md                                ← guion, versiones y cambios
```

- **Nombre:** en minúsculas, con guiones, describiendo el tema (`etl-excel-a-dashboard`, `n8n-whatsapp-pedidos`).
- **Versiones:** `nombre-del-video-vN.mp4`. La vigente es la de número más alto; las anteriores se conservan.
- **Recursos:** el proyecto editable (código de la animación, imágenes y audio usados) va en `nombre-del-video-vN-recursos.zip`, igual que la intro.
- **README del video:** objetivo, público, guion o escenas, y una tabla de versiones con formato (resolución, fps, duración), cambios y fecha.

## Identidad visual en todos los videos

Todos los videos usan la marca oficial, para que se reconozcan como nniklab aunque cambie el tema.

**Logo** (`../../01-marca/logo/final/`, guía de uso en su `README.md`):

- Sobre fondo oscuro: `svg/nniklab-logo-oscuro.svg`; con descriptor "AI, Data & Automation": `svg/nniklab-logo-descriptor-oscuro.svg`.
- Sobre fondo claro: `svg/nniklab-logo-claro.svg`.
- En esquinas o marcas de agua pequeñas: ícono `svg/nniklab-icono-ni.svg` (el logo completo no se usa por debajo de 80 px de ancho).
- El cierre de cada video termina con el logo y respeta el espacio libre (la altura de la "n" alrededor).

**Tipografía** (`../../01-marca/tipografia/`):

- **Space Grotesk** (500, 700): títulos y frases cortas en pantalla.
- **Inter** (400, 500): subtítulos y textos explicativos.
- **JetBrains Mono** (400): etiquetas técnicas, nombres de nodos, datos y fragmentos de código. Encaja especialmente en los videos de n8n y de datos, pero con moderación.

**Colores** (`../../01-marca/colores/`):

- Fondo grafito `#111418` y superficies `#1A1D22` como base.
- Lima eléctrico `#C6F432` solo como acento (≈10 %): el dato o paso que se quiere destacar.
- Nunca lima sobre blanco hueso.

**Material de apoyo compartido:** fondos y gráficos en `../imagenes/`, música en `../audio/` (revisar licencias en sus README).

## Formatos

- Redes (Reels, TikTok, Shorts, historias): vertical 1080 × 1920, 30 fps.
- Web, YouTube y LinkedIn: horizontal 1920 × 1080, 30 fps.
- Si una pieza se publica en los dos formatos, se indica en el nombre: `-vertical` / `-horizontal`.
