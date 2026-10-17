# Estructura del sitio web — nniklab

Definida el 2026-10-17. Reemplaza a los borradores de landing anteriores (eliminados).

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
- Enlaces: Servicios · Cómo trabajamos · Ejemplos · Nosotros.
- Botón: **Agenda una reunión** (ver "Llamado a la acción").

### 1. Portada

- **Objetivo:** que en 5 segundos se entienda qué hace nniklab.
- **Etiqueta:** AI, Data & Automation.
- **Título (slogan oficial):** Datos que trabajan. Procesos que fluyen.
- **Frase de apoyo (borrador):** Diseñamos el flujo de tu información, automatizamos tus procesos y sumamos agentes de IA para que tu negocio decida mejor y trabaje menos.
- **Botones:** Agenda una reunión · Ver servicios.
- **Visual:** esquema animado del flujo dato → proceso → decisión: íconos de fuentes (ERP, Excel, facturación electrónica, CRM, bases de datos, correo / WhatsApp) que entran a nniklab y salen como dashboards, automatizaciones y agentes.

### 2. El problema

- **Objetivo:** que el visitante se reconozca.
- **Situaciones (borrador):**
  - Tu información está repartida entre Excel, sistemas y correos.
  - Cada semana alguien arma reportes a mano.
  - Tu equipo pierde horas en tareas repetitivas.
  - Las decisiones se toman sin datos confiables o a destiempo.

### 3. Servicios

Tres líneas. Detalle en `../02-servicios/README.md`.

En la tarjeta de **Datos** se añade la línea: "Conectamos ERP, sistemas contables, facturación electrónica, CRM, Excel, bases de datos, correo y más." Lista completa de fuentes en `../02-servicios/README.md`.

| Línea | Qué incluye | Resultado para el cliente |
|-------|-------------|---------------------------|
| **Datos** | Arquitectura del flujo de información, construcción de ETL, ingeniería y análisis de datos, dashboards para la toma de decisiones | Información centralizada, confiable y visible para decidir |
| **Automatización** | Diseño e implementación de automatizaciones que eliminan procesos manuales e integran aplicaciones | Menos trabajo manual, menos errores, resultados que se generan solos |
| **IA** | Agentes que gestionan información y trabajan dentro de las automatizaciones | Procesos que leen documentos, responden consultas y toman decisiones simples |

### 4. Cómo se conectan (propuesta diferencial)

- **Mensaje:** las tres líneas forman un solo sistema. Los datos alimentan las automatizaciones y los agentes de IA trabajan sobre ambos.
- **Visual:** diagrama de izquierda a derecha:
  - **Entradas (fuentes):** sistemas de gestión (ERP, contabilidad, CRM), facturación electrónica del SRI, archivos y documentos (Excel, PDF), bases de datos, canales (correo, WhatsApp, formularios), ventas en línea y marketing.
  - **Centro (nniklab):** Datos → Automatización → IA, conectados.
  - **Salidas (resultados):** dashboards para decidir, procesos automáticos, agentes que responden y actúan.

### 5. Cómo trabajamos

1. **Diagnóstico:** entendemos tu negocio, tus procesos y tus datos.
2. **Diseño:** definimos la solución y la arquitectura a tu medida.
3. **Construcción:** desarrollamos, probamos y entregamos.
4. **Acompañamiento:** medimos resultados y mejoramos.

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

Franja de logos o etiquetas con las herramientas con las que se trabaja (confirmadas), agrupadas:

- **Datos y nube:** Azure · Azure Databricks · Azure SQL · Data Factory · Microsoft Fabric · Power BI
- **Bases de datos:** Oracle · SQL Server · PostgreSQL
- **Automatización:** n8n · Power Automate · SharePoint · Microsoft 365
- **IA:** Azure OpenAI · API de OpenAI · API de Claude (Anthropic)
- **Desarrollo e integración:** Python · APIs REST · Git / GitHub

### 9. Cierre

- **Título (borrador):** ¿Hablamos de tus datos?
- **Botón:** Agenda una reunión.

### 10. Pie de página

- Logo con descriptor (`nniklab-logo-descriptor-oscuro.svg`).
- Teléfono: +593 99 578 4113
- Correo: nniklab@outlook.com
- Por ahora solo estos tres elementos. Las redes sociales se añadirán cuando estén definidas.

## Llamado a la acción

- Todos los botones "Agenda una reunión" llevarán a un **formulario de n8n**.
- **Por ahora quedan sin acción.** El formulario y su conector de n8n se enlazarán más adelante.

## Pendiente

Queda para más adelante:

- Foto de Juan para "Nosotros".
- Redes sociales de la empresa (y su lugar en el pie de página).
- Dominio y hosting.
- Formulario y conector de n8n para el llamado a la acción.
