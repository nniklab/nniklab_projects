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

## Próximos pasos

- company: catálogo de servicios, textos de marca (slogan oficial, misión, visión y valores) y datos prácticos de la web (dominio, canales de contacto, redes).
- company: construir el sitio web en `company/05-web/` con la identidad visual y los textos definidos.
- company: tarjeta de presentación final.
