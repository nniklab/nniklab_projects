# Estructura del sitio web — nniklab

Definida el 2026-10-17. Reemplaza a los borradores de landing anteriores (eliminados). Actualizada el mismo día con lo decidido en el diseño v1 y construido en el sitio v1.0 (`sitio/`).

## Formato

- **Sitio de una sola página** (one-page), con menú fijo que lleva a cada sección.
- Más adelante se pueden sumar páginas propias por servicio.
- Idioma: español. Solo el descriptor "AI, Data & Automation" va en inglés.
- Identidad visual: ver `../01-marca/` (paleta grafito + lima, Space Grotesk + Inter + JetBrains Mono, logo Punto de dato).
- Etiquetas de sección: en JetBrains Mono, lima, con una sola barra al inicio, como una ruta web: `/lo_que_te_frena`, `/lo_que_hacemos`, `/qué_puedes_lograr`, `/cómo_trabajamos`, `/tecnologías`, `/conoce_a_nuestro_equipo`. Tamaño: 16 px en escritorio y 18 px en celular (clase `.nk-etiqueta`); en celular deben caber en una línea de 342 px, así que conviene que no pasen de unos 28 caracteres. Unificadas el 2026-10-19 (antes mezclaban `//` y `/`).
- **Orden de las secciones (desde la v1.3):** portada → lo que te frena → servicios → qué puedes lograr → cómo trabajamos → tecnologías → conoce a nuestro equipo → cierre. Cada sección responde la pregunta que deja la anterior: qué hacemos, qué puedes lograr con eso, cómo lo hacemos, con qué y quiénes.
- **Fondos que se alternan (desde la v1.3):** grafito (#111418) y gris superficie (#1a1d22), sin dos secciones seguidas con el mismo fondo: portada grafito · lo que te frena gris · servicios grafito · qué puedes lograr gris · cómo trabajamos clara (blanco hueso) · tecnologías grafito · equipo gris · cierre grafito. La portada y "Cómo trabajamos" no cambian. Las tarjetas sobre fondo gris van en grafito, y al revés.
- **Carruseles en celular (desde la v1.3):** lo que te frena, servicios, qué puedes lograr, cómo trabajamos y tecnologías. En escritorio siguen como grilla. En celular se ve una tarjeta y asoma la siguiente; avanza sola (5 s; 6 s en cómo trabajamos; 7 s en servicios, que tiene más texto), con flechas ← → de 44 px, indicadores con barra de tiempo y deslizamiento con el dedo. Se pausa mientras el usuario toca, solo avanza con la sección en pantalla y no avanza solo si el sistema pide reducir el movimiento. Mismo código para todos (`.nk-carrusel` en `nniklab.js`); el tiempo va en `data-duracion`. Desde la v1.4, en celular las tarjetas de los carruseles usan menos relleno y títulos un poco más chicos para que sean más bajas (a 390 px: lo que hacemos 482 px, lo que te frena 380, cómo trabajamos 348, tecnologías 318, qué puedes lograr 274).

## Recorrido del visitante

Entender qué hacemos → reconocer su problema → ver cómo lo resolvemos → confiar → contactar.

## Secciones

### 0. Menú fijo

- Logo (`nniklab-logo-oscuro.svg`).
- Enlaces: Servicios · Qué puedes lograr · Cómo trabajamos · Tecnologías · Nuestro equipo. El menú usa "Servicios" aunque la etiqueta de la sección sea `/lo_que_hacemos`: en el menú el visitante busca la palabra que ya conoce; la etiqueta y el título son los que venden (decidido el 2026-10-19).
- Botón: **Agenda una reunión** (ver "Llamado a la acción").
- En celular y tablet (hasta 1080 px), los enlaces van en un menú desplegable: con cinco enlaces el menú no cabe en una línea por debajo de unos 1050 px. En celular el encabezado es compacto (logo de 22 px y botón "Agenda una reunión" de 13 px, en una sola línea); por debajo de 340 px el botón se oculta, porque la portada ya tiene el suyo.

### 1. Portada

- **En celular (desde la v1.3):** solo lo principal: etiqueta, título, frase y botones. Sin la animación de tres escenas ni el fondo animado, y con menos espacio arriba (40 px), para que todo quepa en la primera pantalla.

- **Objetivo:** que en 5 segundos se entienda qué hace nniklab.
- **Etiqueta:** AI, Data & Automation.
- **Título (slogan oficial):** Datos que trabajan. Procesos que fluyen.
- **Frase de apoyo (borrador):** Diseñamos el flujo de tu información, automatizamos tus procesos y sumamos agentes de IA para que tu negocio decida mejor y trabaje menos.
- **Botones:** Agenda una reunión · Ver servicios.
- **Visual:** animación en tres escenas, como el video intro v2, en un ciclo de 12 s y sin recuadro, fundida con el fondo:
  1. **Datos:** "Ordenamos tus datos para decidir mejor." Barras que crecen (la última en lima) y "dashboard actualizado".
  2. **Automatización:** "Conectamos tus apps y automatizamos el trabajo." Formulario → Validar → Registrar, con registros `[ok]`.
  3. **IA:** "Incorporamos IA en cada decisión." Una factura escaneada de la que salen tipo, proveedor y total.
  Debajo, una barra de progreso de tres tramos (Datos · Automatización · IA).
- **Fondo:** grafito liso (sin foto) con fondo animado: líneas de flujo de datos por las que corren segmentos lima y un halo lima suave que sigue el mouse. Se descartó la foto de ondas verdes en el diseño (2026-10-17).

### 2. Lo que te frena (antes "El problema")

- **Etiqueta:** `/lo_que_te_frena` (antes `/el_problema`, cambiada el 2026-10-19 para enganchar más).
- **Título:** "¿Te suena familiar?" y, en otra línea, "Esto te quita tiempo y dinero."
- **Objetivo:** que el visitante se reconozca.
- **Situaciones:**
  - Tu información está repartida entre Excel, sistemas y correos.
  - Cada semana alguien arma reportes a mano.
  - Tu equipo pierde horas en tareas repetitivas.
  - Las decisiones se toman sin datos confiables o a destiempo.
- **Visual:** cuatro tarjetas con foto de una escena de oficina (fotos de Pexels con personas, en `../06-publicidad/imagenes/fondos/`), velo grafito, etiqueta corta (DISPERSIÓN, TRABAJO MANUAL, TAREAS REPETITIVAS, DECISIONES A CIEGAS) y una "ventanita" de interfaz que cuenta el problema (archivos duplicados, reporte pendiente, factura 128 de 340, "¿cuánto vendimos este mes?"). Las cifras de las ventanitas son ilustrativas.

### 3. Lo que hacemos (servicios)

- **Etiqueta:** `/lo_que_hacemos` (antes `/servicios`, cambiada el 2026-10-19). Ancla `#servicios` y enlace del menú "Servicios", sin cambios.
- **Título:** "Te ayudamos en tres frentes: datos, automatización e IA." (antes "Tres líneas. Un solo sistema.", que no decía de entrada qué ofrecemos).
- **Subtítulo:** "Contrátalos por separado o juntos: tus datos alimentan las automatizaciones y la IA trabaja sobre ambos."
- **Fondo:** grafito liso.

Tres líneas. Detalle en `../02-servicios/README.md`.

Textos de las tarjetas, acortados en la v1.4 para que en celular las tarjetas sean más bajas:

- **Datos:** Arquitectura del flujo de información · ETL e ingeniería de datos · Análisis de datos · Dashboards para decidir. Recuadro: "Conectamos ERP, contabilidad, facturación electrónica, CRM, Excel y más." Resultado: "Información centralizada y confiable para decidir."
- **Automatización:** Automatizaciones que eliminan procesos manuales · Integración de aplicaciones: tus sistemas se hablan · Flujos que generan resultados solos. Resultado: "Menos trabajo manual y menos errores."
- **IA:** Agentes que gestionan tu información · Agentes en tus automatizaciones: leen documentos, responden y deciden. Resultado: "Procesos que van más allá de las reglas fijas."

Lista completa de fuentes de datos en `../02-servicios/README.md`. Descripción general de cada línea:

| Línea | Qué incluye | Resultado para el cliente |
|-------|-------------|---------------------------|
| **Datos** | Arquitectura del flujo de información, construcción de ETL, ingeniería y análisis de datos, dashboards para la toma de decisiones | Información centralizada, confiable y visible para decidir |
| **Automatización** | Diseño e implementación de automatizaciones que eliminan procesos manuales e integran aplicaciones | Menos trabajo manual, menos errores, resultados que se generan solos |
| **IA** | Agentes que gestionan información y trabajan dentro de las automatizaciones | Procesos que leen documentos, responden consultas y toman decisiones simples |

### 4. Qué puedes lograr (ejemplos de lo que podemos hacer)

Todavía no hay casos de clientes: se muestran **procesos de ejemplo** que se pueden resolver con los servicios, presentados como ejemplos (no como casos reales). Cuando haya casos reales, esta sección pasa a llamarse "Casos".

Etiqueta de la sección: `/qué_puedes_lograr` (antes `/ejemplos` y luego `/soluciones`; se cambió el 2026-10-19 porque "soluciones" se confundía con "servicios"). El subtítulo sigue aclarando que son procesos de ejemplo. Va justo después de Servicios. Fondo gris superficie, con las tarjetas en grafito.

| Línea | Ejemplo |
|-------|---------|
| Datos | **Dashboard de ventas que se actualiza solo:** datos del ERP y de los Excel de cada sucursal integrados cada noche en un tablero de Power BI. |
| Datos | **Una sola fuente de verdad:** información de varios sistemas centralizada en un almacén de datos, con indicadores que todos leen igual. |
| Automatización | **Reportes que llegan solos:** el reporte semanal se genera y se envía por correo cada lunes, sin que nadie lo arme. |
| Automatización | **Sistemas sincronizados:** un pedido registrado en el CRM se crea en el ERP y en facturación sin volver a digitarlo. |
| IA | **Facturas leídas por un agente:** la IA extrae los datos de facturas y documentos, los valida y los carga al sistema. |
| IA | **Pregúntale a tus datos:** un agente responde consultas como "¿cuánto vendimos ayer en Quito?" en lenguaje natural. |
| Combinado | **Pedido de principio a fin:** un cliente escribe por WhatsApp, un agente interpreta el pedido, la automatización lo registra y el dashboard se actualiza. |

### 5. Cómo trabajamos

Sección clara (blanco hueso). Cuatro tarjetas con número grande, ícono, un riel que las une y lo que el cliente **recibe** en cada paso. El paso 04 va en grafito con el número en lima.

1. **Diagnóstico:** entendemos tu negocio, tus procesos y tus datos. *Recibes:* un mapa de tus procesos y fuentes de datos, con las oportunidades priorizadas.
2. **Diseño:** definimos la solución y la arquitectura a tu medida. *Recibes:* la propuesta de solución: arquitectura, alcance y plan de trabajo.
3. **Construcción:** desarrollamos, probamos y entregamos. *Recibes:* la solución funcionando, probada con tus datos reales.
4. **Acompañamiento:** medimos resultados y mejoramos. *Recibes:* seguimiento de resultados y mejoras continuas.

Los textos de "Recibes" son un borrador para revisar.

### 6. Tecnologías

**Desde la v1.2 (2026-10-19): tarjetas.** Antes era una lista de texto por filas; se cambió porque se veía muy simple.

- **Escritorio:** seis tarjetas en una grilla de 3 × 2 (2 columnas en tablet), con el estilo de las tarjetas de Servicios: ícono lima, número, nombre del área, una frase de para qué sirve y las tecnologías como etiquetas en JetBrains Mono.
- **Celular:** carrusel de una tarjeta a la vez, con el borde de la siguiente asomando. Avanza solo cada 5 segundos y vuelve a la primera al llegar al final. Debajo: flecha ← (anterior), seis indicadores y flecha → (siguiente). El indicador activo es una barra lima que se llena en los 5 segundos. Se pausa mientras el usuario toca el carrusel; al deslizar, tocar una flecha o un indicador, el conteo vuelve a empezar. Solo avanza con la sección en pantalla, y no avanza solo si el sistema pide reducir el movimiento.
- **Sin logos:** las tecnologías van solo en texto, para no usar marcas de terceros fuera de lo que permiten sus términos.
- **Subtítulo:** "Plataformas líderes del mercado, y nos adaptamos a las que ya usa tu empresa."

Tarjetas:

1. **Datos y nube** ("Donde se guardan, procesan y visualizan tus datos."): Azure · Azure Databricks · Azure SQL · Data Factory · Microsoft Fabric · Power BI
2. **Bases de datos** ("Nos conectamos a las bases que tu empresa ya usa."): Oracle · SQL Server · PostgreSQL
3. **Automatización** ("Flujos que conectan las aplicaciones de tu día a día."): n8n · Power Automate · SharePoint · Microsoft 365
4. **Inteligencia artificial** ("Modelos para agentes que leen, responden y deciden."): Azure OpenAI · API de OpenAI · API de Claude (Anthropic)
5. **Desarrollo e integración** ("Código a la medida cuando una herramienta no alcanza."): Python · APIs REST · Git / GitHub
6. **¿Usas otra herramienta?** (tarjeta lima): "Si tu empresa trabaja con otra plataforma, la evaluamos y la sumamos al flujo." Botón "Conversemos →" que baja al cierre.

### 7. Conoce a nuestro equipo (antes "Nosotros")
- **Etiqueta:** `/conoce_a_nuestro_equipo` (antes `/nosotros`); en el menú, "Nuestro equipo"; ancla `#equipo` (antes `#nosotros`). Por ahora agrupa al equipo técnico.
- Se presenta como empresa, con **Juan Heredia T.** como representante.
- **Orden:** etiqueta y título arriba; debajo, la foto y al lado el perfil.
- **Perfil resumido (v1.3):** Juan Heredia T. · Mgs. Business Intelligence & Analytics · +10 años en Proyectos de Arquitectura de Software y Datos. Luego la frase de nniklab, tres indicadores (Arquitectura, Liderazgo, Gestión ágil) y el enlace a LinkedIn.
- Textos completos del perfil: ver `../03-comunicacion/perfil-fundador.md`.

### 8. Cierre

- **Etiqueta:** "> siguiente_paso" tipo terminal, con cursor, en un recuadro gris superficie.
- **Título:** ¿Hablamos de tus datos? ("datos" resaltado en lima).
- **Botón:** Agenda una reunión.
- **Contacto directo:** "o escríbenos: nniklab@outlook.com · +593 99 578 4113".
- **Fondo:** grafito liso (desde la v1.3; antes gris superficie, igual que Nosotros) con fondo animado: flujos de datos que convergen hacia el centro, ondas cuadradas lima que salen del botón y un halo suave. Se descartó la foto de espacio oscuro en el diseño (2026-10-17).

### 9. Pie de página

- Logo con descriptor (`nniklab-logo-descriptor-oscuro.svg`).
- Teléfono: +593 99 578 4113
- Correo: nniklab@outlook.com
- Aviso legal, en texto pequeño: "Los nombres y logos de terceros son marcas registradas de sus respectivos propietarios. Su uso no implica asociación ni respaldo."
- Por ahora solo estos elementos. Las redes sociales se añadirán cuando estén definidas.

## Secciones retiradas

### Cómo se conectan (propuesta diferencial): quitada en la v1.2

**Quitada del sitio el 2026-10-19 (v1.2)** porque ocupaba mucho espacio, sobre todo en el celular. El mensaje se reserva para un video publicitario propio: contexto, textos y capturas en `../06-publicidad/ideas/video-como-se-conectan/`. Lo que sigue es cómo era la sección.

- **Fondo:** gris superficie liso (igual que "El problema", "Nosotros" y el cierre).
- **Mensaje:** las tres líneas forman un solo sistema. Los datos alimentan las automatizaciones y los agentes de IA trabajan sobre ambos.
- **Visual:** diagrama de izquierda a derecha:
  - **Entradas (fuentes):** sistemas de gestión (ERP, contabilidad, CRM), facturación electrónica del SRI, archivos y documentos (Excel, PDF), bases de datos, canales (correo, WhatsApp, formularios), ventas en línea y marketing.
  - **Centro (nniklab):** Datos → Automatización → IA, conectados.
  - **Salidas (resultados):** dashboards para decidir, procesos automáticos, agentes que responden y actúan.
- **Logos de tecnologías:** este es el único lugar del sitio donde se usan logos de terceros (de `recursos/tecnologias/`). Los de Microsoft van sin modificar y siempre con el nombre del producto al lado, como permiten sus términos.

## Recursos visuales

- **Fotos:** solo las cuatro escenas de oficina de "Lo que te frena" (en `../06-publicidad/imagenes/fondos/`). Las secciones usan fondos lisos que alternan grafito y gris superficie; la portada y el cierre llevan fondos animados en lugar de fotos. Los fondos de ondas, espacio oscuro, líneas de luz y microchips no se usan en la v1 y quedan guardados.
- **Gráficos propios** (en `../06-publicidad/imagenes/graficos/svg/`): datos, IA, automatización e integración; se pueden reutilizar en servicios y ejemplos.
- **Logos de tecnologías** (en `recursos/tecnologias/`): se usaban solo en el diagrama "Cómo se conectan"; desde la v1.2 el sitio no muestra logos de terceros. Quedan para el video de esa sección.
- **Imagen para compartir en redes:** `sitio/assets/img/marca/og-nniklab.jpg` (1200 × 630).
- **Pendiente:** foto de Juan para "Conoce a nuestro equipo".

## Llamado a la acción

- Todos los botones "Agenda una reunión" llevarán a un **formulario de n8n**.
- **Por ahora:** el botón del menú y el de la portada bajan hasta el cierre; el del cierre queda sin acción. El formulario y su conector de n8n se enlazarán más adelante.

## Pendiente

Queda para más adelante:

- Foto de Juan para "Conoce a nuestro equipo".
- Redes sociales de la empresa (y su lugar en el pie de página).
- Dominio propio (el sitio ya está publicado en GitHub Pages).
- Formulario y conector de n8n para el llamado a la acción.
