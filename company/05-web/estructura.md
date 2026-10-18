# Estructura del sitio web — nniklab

Definida el 2026-10-17. Reemplaza a los borradores de landing anteriores (eliminados). Actualizada el mismo día con lo decidido en el diseño v1 y construido en el sitio v1.0 (`sitio/`).

## Formato

- **Sitio de una sola página** (one-page), con menú fijo que lleva a cada sección.
- Más adelante se pueden sumar páginas propias por servicio.
- Idioma: español. Solo el descriptor "AI, Data & Automation" va en inglés.
- Identidad visual: ver `../01-marca/` (paleta grafito + lima, Space Grotesk + Inter + JetBrains Mono, logo Punto de dato).

## Recorrido del visitante

Entender qué hacemos → reconocer su problema → ver cómo lo resolvemos → confiar → contactar.

## Secciones

### 0. Menú fijo

- Logo (`nniklab-logo-oscuro.svg`).
- Enlaces: Servicios · Cómo trabajamos · Ejemplos · Nosotros · Tecnologías.
- Botón: **Agenda una reunión** (ver "Llamado a la acción").
- En celular, los enlaces van en un menú desplegable.

### 1. Portada

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

### 2. El problema

- **Objetivo:** que el visitante se reconozca.
- **Situaciones:**
  - Tu información está repartida entre Excel, sistemas y correos.
  - Cada semana alguien arma reportes a mano.
  - Tu equipo pierde horas en tareas repetitivas.
  - Las decisiones se toman sin datos confiables o a destiempo.
- **Visual:** cuatro tarjetas con foto de una escena de oficina (fotos de Pexels con personas, en `../06-publicidad/imagenes/fondos/`), velo grafito, etiqueta corta (DISPERSIÓN, TRABAJO MANUAL, TAREAS REPETITIVAS, DECISIONES A CIEGAS) y una "ventanita" de interfaz que cuenta el problema (archivos duplicados, reporte pendiente, factura 128 de 340, "¿cuánto vendimos este mes?"). Las cifras de las ventanitas son ilustrativas.

### 3. Servicios

Fondo: grafito liso.

Tres líneas. Detalle en `../02-servicios/README.md`.

En la tarjeta de **Datos** se añade la línea: "Conectamos ERP, sistemas contables, facturación electrónica, CRM, Excel, bases de datos, correo y más." Lista completa de fuentes en `../02-servicios/README.md`.

| Línea | Qué incluye | Resultado para el cliente |
|-------|-------------|---------------------------|
| **Datos** | Arquitectura del flujo de información, construcción de ETL, ingeniería y análisis de datos, dashboards para la toma de decisiones | Información centralizada, confiable y visible para decidir |
| **Automatización** | Diseño e implementación de automatizaciones que eliminan procesos manuales e integran aplicaciones | Menos trabajo manual, menos errores, resultados que se generan solos |
| **IA** | Agentes que gestionan información y trabajan dentro de las automatizaciones | Procesos que leen documentos, responden consultas y toman decisiones simples |

### 4. Cómo se conectan (propuesta diferencial)

- **Fondo:** gris superficie liso (igual que "El problema", "Nosotros" y el cierre).
- **Mensaje:** las tres líneas forman un solo sistema. Los datos alimentan las automatizaciones y los agentes de IA trabajan sobre ambos.
- **Visual:** diagrama de izquierda a derecha:
  - **Entradas (fuentes):** sistemas de gestión (ERP, contabilidad, CRM), facturación electrónica del SRI, archivos y documentos (Excel, PDF), bases de datos, canales (correo, WhatsApp, formularios), ventas en línea y marketing.
  - **Centro (nniklab):** Datos → Automatización → IA, conectados.
  - **Salidas (resultados):** dashboards para decidir, procesos automáticos, agentes que responden y actúan.
- **Logos de tecnologías:** este es el único lugar del sitio donde se usan logos de terceros (de `recursos/tecnologias/`). Los de Microsoft van sin modificar y siempre con el nombre del producto al lado, como permiten sus términos.

### 5. Cómo trabajamos

Sección clara (blanco hueso). Cuatro tarjetas con número grande, ícono, un riel que las une y lo que el cliente **recibe** en cada paso. El paso 04 va en grafito con el número en lima.

1. **Diagnóstico:** entendemos tu negocio, tus procesos y tus datos. *Recibes:* un mapa de tus procesos y fuentes de datos, con las oportunidades priorizadas.
2. **Diseño:** definimos la solución y la arquitectura a tu medida. *Recibes:* la propuesta de solución: arquitectura, alcance y plan de trabajo.
3. **Construcción:** desarrollamos, probamos y entregamos. *Recibes:* la solución funcionando, probada con tus datos reales.
4. **Acompañamiento:** medimos resultados y mejoramos. *Recibes:* seguimiento de resultados y mejoras continuas.

Los textos de "Recibes" son un borrador para revisar.

### 6. Ejemplos de lo que podemos hacer

Todavía no hay casos de clientes: se muestran **procesos de ejemplo** que se pueden resolver con los servicios, presentados como ejemplos (no como casos reales). Cuando haya casos reales, esta sección pasa a llamarse "Casos".

| Línea | Ejemplo |
|-------|---------|
| Datos | **Dashboard de ventas que se actualiza solo:** datos del ERP y de los Excel de cada sucursal integrados cada noche en un tablero de Power BI. |
| Datos | **Una sola fuente de verdad:** información de varios sistemas centralizada en un almacén de datos, con indicadores que todos leen igual. |
| Automatización | **Reportes que llegan solos:** el reporte semanal se genera y se envía por correo cada lunes, sin que nadie lo arme. |
| Automatización | **Sistemas sincronizados:** un pedido registrado en el CRM se crea en el ERP y en facturación sin volver a digitarlo. |
| IA | **Facturas leídas por un agente:** la IA extrae los datos de facturas y documentos, los valida y los carga al sistema. |
| IA | **Pregúntale a tus datos:** un agente responde consultas como "¿cuánto vendimos ayer en Quito?" en lenguaje natural. |
| Combinado | **Pedido de principio a fin:** un cliente escribe por WhatsApp, un agente interpreta el pedido, la automatización lo registra y el dashboard se actualiza. |

### 7. Nosotros

- Se presenta como empresa ("nosotros"), con **Juan Heredia T.** como representante.
- Textos: ver `../03-comunicacion/perfil-fundador.md`.
- Incluye foto, versión corta del perfil, formación y enlace a LinkedIn.

### 8. Tecnologías

Franja con las herramientas con las que se trabaja (confirmadas), agrupadas. **Solo texto, sin logos:** etiquetas en JetBrains Mono. Así se evita usar marcas de terceros fuera de lo que permiten sus términos.

- **Datos y nube:** Azure · Azure Databricks · Azure SQL · Data Factory · Microsoft Fabric · Power BI
- **Bases de datos:** Oracle · SQL Server · PostgreSQL
- **Automatización:** n8n · Power Automate · SharePoint · Microsoft 365
- **IA:** Azure OpenAI · API de OpenAI · API de Claude (Anthropic)
- **Desarrollo e integración:** Python · APIs REST · Git / GitHub

### 9. Cierre

- **Etiqueta:** "> siguiente_paso" tipo terminal, con cursor.
- **Título:** ¿Hablamos de tus datos? ("datos" resaltado en lima).
- **Botón:** Agenda una reunión.
- **Contacto directo:** "o escríbenos: nniklab@outlook.com · +593 99 578 4113".
- **Fondo:** gris superficie liso con fondo animado: flujos de datos que convergen hacia el centro, ondas cuadradas lima que salen del botón y un halo suave. Se descartó la foto de espacio oscuro en el diseño (2026-10-17).

### 10. Pie de página

- Logo con descriptor (`nniklab-logo-descriptor-oscuro.svg`).
- Teléfono: +593 99 578 4113
- Correo: nniklab@outlook.com
- Aviso legal, en texto pequeño: "Los nombres y logos de terceros son marcas registradas de sus respectivos propietarios. Su uso no implica asociación ni respaldo."
- Por ahora solo estos elementos. Las redes sociales se añadirán cuando estén definidas.

## Recursos visuales

- **Fotos:** solo las cuatro escenas de oficina de "El problema" (en `../06-publicidad/imagenes/fondos/`). Las secciones usan fondos lisos que alternan grafito y gris superficie; la portada y el cierre llevan fondos animados en lugar de fotos. Los fondos de ondas, espacio oscuro, líneas de luz y microchips no se usan en la v1 y quedan guardados.
- **Gráficos propios** (en `../06-publicidad/imagenes/graficos/svg/`): datos, IA, automatización e integración; se pueden reutilizar en servicios y ejemplos.
- **Logos de tecnologías** (en `recursos/tecnologias/`): solo en el diagrama "Cómo se conectan".
- **Imagen para compartir en redes:** `sitio/assets/img/marca/og-nniklab.jpg` (1200 × 630).
- **Pendiente:** foto de Juan para "Nosotros".

## Llamado a la acción

- Todos los botones "Agenda una reunión" llevarán a un **formulario de n8n**.
- **Por ahora:** el botón del menú y el de la portada bajan hasta el cierre; el del cierre queda sin acción. El formulario y su conector de n8n se enlazarán más adelante.

## Pendiente

Queda para más adelante:

- Foto de Juan para "Nosotros".
- Redes sociales de la empresa (y su lugar en el pie de página).
- Dominio propio (el sitio ya está publicado en GitHub Pages).
- Formulario y conector de n8n para el llamado a la acción.
