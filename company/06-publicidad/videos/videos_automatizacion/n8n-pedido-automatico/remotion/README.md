# Video n8n en Remotion

Versión en código del video **"El pedido que se registra solo"**, hecha con [Remotion](https://www.remotion.dev) (videos con React). Es la primera prueba para comparar con la v3 hecha en Claude Design: por ahora contiene solo **la escena del flujo y el remate "15 min → 3 s"** (14 s).

**Estado:** prueba para comparar con `../n8n_Pedido_Automatico_v3.mp4`. Render de muestra: `../n8n_Flujo_Remotion_prueba.mp4`.

## Qué mejora frente a la v3

| Efecto | Qué hace |
|--------|----------|
| Escala | Los nodos ocupan casi todo el ancho; los textos se leen bien en el celular. |
| Cámara | Sigue al paquete nodo por nodo, baja a la bifurcación y al final se aleja para mostrar el flujo completo. |
| Profundidad | El plano del flujo va inclinado en 3D y se endereza en la vista completa; la rejilla del fondo se mueve más lento (paralaje). |
| Paquete | Estela de movimiento; en "¿Hay stock?" se divide en cuatro paquetes, uno por salida. |
| Activación | Resorte con rebote, borde y brillo lima, onda que se expande y check que salta. |
| Datos | Se escriben "decodificándose" (signos al azar que se asientan). |
| Título | Palabra por palabra, del desenfoque al foco, y luego sube a encabezado. |
| Remate | El flujo se hunde desenfocado, "15 min" se tacha y el "3" baraja dígitos antes de fijarse con un golpe. |
| Acabado | Viñeta, grano de película y luz ambiental lima que acompaña al paquete. |
| Audio | Música + pop en cada nodo + clic en cada salida + golpe en "3 s", sincronizados al fotograma. |

Se respetan las reglas de marca: colores y fuentes oficiales, n8n solo nombrado en texto (sin su logo) y datos ficticios rotulados como `proceso de ejemplo`.

## Cómo usarlo (Windows)

La forma más fácil: ejecutar `instalar-remotion.bat` desde la terminal de VS Code, estando en esta carpeta:

```powershell
.\instalar-remotion.bat
```

Hace todo: verifica Node y Git, permite los scripts de npm en PowerShell, trae los cambios (`git pull`), instala (`npm install`) y deja elegir entre abrir el editor o renderizar.

A mano, desde esta carpeta:

```powershell
npm install          # solo la primera vez o si cambian las dependencias
npm run studio       # editor en el navegador para previsualizar
npm run render       # exporta out/flujo-n8n-prueba.mp4
```

La primera vez, `npm run render` descarga el navegador interno de Remotion (dentro de `node_modules\.remotion\`).

## Estructura

```
remotion/
  package.json          ← dependencias y comandos (studio, render)
  remotion.config.ts    ← calidad de render (H.264, CRF 18)
  instalar-remotion.bat ← instalación y uso en un paso (Windows)
  src/
    index.ts            ← punto de entrada
    Root.tsx            ← composición FlujoN8n: 1080 × 1920, 30 fps, 14 s
    FlujoN8n.tsx        ← la escena: contenido, tiempos, cámara, piezas y audio
    marca.ts            ← colores y fuentes oficiales de nniklab
    efectos.ts          ← efectos reutilizables: decodificar, barajar, curvas
```

- **No se suben a GitHub:** `node_modules/` (se descarga con `npm install`) y `out/` (renders de prueba). Están en `.gitignore`.
- **Recursos compartidos, sin copiar:** las fuentes se leen de `05-web/sitio/assets/fonts/` y los audios de `../recursos/`.

## Cómo ajustar

Todo está al inicio de `src/FlujoN8n.tsx`:

- **Textos y datos de los nodos:** `PRINCIPALES` y `RAMAS`.
- **Tiempos:** `LLEGA` (cuándo el paquete activa cada nodo), `RAMA_LLEGA`, `ALEJA`, `RESULTADO`, `FIJA_3S`. Están en fotogramas (30 = 1 segundo).
- **Cámara:** función `camara` (zoom, inclinación y punto de enfoque).
- **Volúmenes:** componente `Sonido` al final del archivo.

## Licencia de Remotion

Gratis para personas y empresas pequeñas; las empresas grandes pagan licencia. Ver [remotion.dev/license](https://www.remotion.dev/docs/license) antes de publicar.
