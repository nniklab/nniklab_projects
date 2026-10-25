# Video n8n en Remotion

Versión en código del video **"El pedido que se registra solo"**, hecha con [Remotion](https://www.remotion.dev) (videos con React). Produce la **v4**: `../n8n_Pedido_Automatico_v4_redes.mp4` (1080 × 1920 · 30 fps · ≈ 34,5 s), lista para subir a redes.

## Calidad para redes

Las redes vuelven a comprimir todo lo que se sube, así que el render sale con mucha calidad para que pierda lo mínimo (`remotion.config.ts`):

| Ajuste | Valor | Por qué |
|--------|-------|---------|
| Fotogramas | PNG | sin pérdida antes de codificar |
| Video | H.264, CRF 12, preset `slow` | ≈ 11 Mbps; por debajo de los 30 Mbps de LinkedIn |
| Color | `yuv420p`, BT.709 | el estándar que todas las redes leen bien |
| Audio | AAC 320 kbps, pico ≈ −1 dB | sin saturar |
| Peso | ≈ 48 MB | bajo el límite de 72 MB de TikTok en Android |

Sirve tal cual para Reels, TikTok, Shorts, historias y LinkedIn (vertical 9:16). Para que se vea bien: subirlo desde el archivo original (no reenviado por WhatsApp, que lo comprime mucho) y, en Instagram, activar "Subir con la máxima calidad" en Configuración → Calidad de los archivos multimedia.

La primera prueba (solo la escena del flujo, 14 s) quedó como `../n8n_Flujo_Remotion_prueba.mp4`.

## La música manda

Todo el video está programado sobre los golpes de la música **Future Bass Hot Night** (alexgrohl, Pixabay; `06-publicidad/audio/alexgrohl-future-bass-hot-night-111447.mp3`):

- La pista va a **176 golpes por minuto** (un golpe cada 0,341 s ≈ 10,2 fotogramas).
- Se usa desde el segundo **66,17**, para que el *build-up* acompañe el problema y el **drop** (77,1 s de la pista) caiga en el **golpe 32** del video (≈ 10,9 s), justo cuando entra el flujo.
- Las escenas, las animaciones y los efectos de sonido se definen en golpes (`src/ritmo.ts`). Si se cambia un tiempo, la animación y su sonido se mueven juntos.

| Golpes | Tiempo | Escena | Música |
|--------|--------|--------|--------|
| 0–4 | 0–1,4 s | "¿Te suena familiar?" | build-up |
| 4–24 | 1,4–8,2 s | El caos: copiar y pegar, notificaciones, reloj, sacudida creciente | build-up (el bajo sube) |
| 24–32 | 8,2–10,9 s | El caos se hunde · "Hay una forma mejor." · `> automatízalo_` · negro | riser y silencio previo |
| 32 | 10,9 s | Destello lima y golpe grave | **drop** |
| 32–62 | 10,9–21,1 s | El flujo: un nodo por compás, 4 salidas en medios golpes, la cámara se aleja | drop |
| 62–74 | 21,1–25,2 s | "Ahora se hace solo." · 15 min → **3 s** | drop |
| 74–82 | 25,2–28 s | "Automatiza lo repetitivo. Dedícate a lo importante." | drop |
| 82–101 | 28–34,5 s | Logo tecleado: una letra por medio golpe, el punto cae en un golpe | baja y se apaga |

## Efectos

| Efecto | Dónde |
|--------|-------|
| Texto palabra por palabra, del desenfoque al foco | Todos los titulares |
| Salidas "a través de la cámara" (escala + desenfoque) | Cambios de escena |
| Sacudida y acercamiento que crecen con la música; foto de fondo con desenfoque de profundidad | El caos |
| Implosión (el caos se encoge, gira y se desenfoca) | Antes de "Hay una forma mejor." |
| Destello lima en el drop | Golpe 32 |
| Cámara que sigue al pedido, plano inclinado en 3D, vista completa al final | El flujo |
| Estela de movimiento, bifurcación en 4 paquetes, ondas y checks con rebote | El flujo |
| Datos que se "decodifican" y números que se barajan | Flujo y resultado |
| Luz lima que late con los golpes | Ganchos, resultado, lema, cierre |
| Partículas (foto de Pexels) con motas lima | Del drop al lema |
| Viñeta y grano de película (sutil, para que no se pixele al recomprimir) | Todo el video |

## Sonidos

| Sonido | Cuándo |
|--------|--------|
| Música (60 %: la pista viene muy fuerte; sube al inicio y se apaga al final) | Todo el video |
| Tic-tac | El caos (sube con la tensión) |
| Clic suave | Cada fila pegada a mano y cada salida del flujo |
| Tecla | `> automatízalo_` y cada letra del logo |
| Golpe grave | El drop y cuando el "3" se fija |
| Pop | Cada nodo del flujo y la caja "importante." |
| Clic | El punto cae sobre la "i" del logo |

Los MP3 de efectos traen silencio al inicio y se recortan (`pop` 5 fotogramas, `clic` 4, `tecla` y `tic-tac` 1–4) para que suenen justo en su golpe.

## Cómo usarlo (Windows)

La forma más fácil: ejecutar `instalar-remotion.bat` desde la terminal de VS Code. Verifica Node y Git, trae los cambios (`git pull`), instala (`npm install`) y deja elegir entre abrir el editor o renderizar.

A mano, desde esta carpeta:

```powershell
npm.cmd install        # solo la primera vez o si cambian las dependencias
npm.cmd run studio     # editor en el navegador para previsualizar
npm.cmd run render     # exporta out/n8n-pedido-automatico.mp4
```

La primera vez, el render descarga el navegador interno de Remotion (dentro de `node_modules\.remotion\`). El MP4 final se copia a la carpeta del video con el nombre de la versión.

## Estructura

```
remotion/
  package.json             ← dependencias y comandos (studio, render)
  remotion.config.ts       ← calidad de render (H.264, CRF 18)
  instalar-remotion.bat    ← instalación y uso en un paso (Windows)
  src/
    index.ts               ← punto de entrada
    Root.tsx               ← composición PedidoAutomatico: 1080 × 1920, 30 fps
    PedidoAutomatico.tsx   ← une las escenas y programa todos los sonidos
    ritmo.ts               ← la cuadrícula de golpes y el mapa de escenas
    comun.tsx              ← piezas compartidas: palabras, partículas, resplandor, acabado
    marca.ts               ← colores y fuentes oficiales de nniklab
    efectos.ts             ← decodificar, barajar, curvas
    logo.ts                ← trazos del logo con las letras separadas
    escenas/
      Ganchos.tsx          ← "¿Te suena familiar?", "Hay una forma mejor.", destello
      Caos.tsx             ← el problema
      Flujo.tsx            ← el flujo de n8n
      Resultado.tsx        ← "Ahora se hace solo.", 15 min → 3 s y el lema
      Cierre.tsx           ← logo tecleado
```

- **No se suben a GitHub:** `node_modules/` y `out/` (están en `.gitignore`).
- **Recursos compartidos, sin copiar:** fuentes de `05-web/sitio/assets/fonts/`, música de `06-publicidad/audio/`, fotos de `06-publicidad/imagenes/fondos/` y efectos de `../recursos/efectos/`.

## Cómo ajustar

- **Mover una escena o cambiar el ritmo:** `src/ritmo.ts` (`ESCENA`, en golpes).
- **Textos y datos del flujo:** `PRINCIPALES` y `RAMAS` en `escenas/Flujo.tsx`; filas y mensajes del caos en `escenas/Caos.tsx`.
- **Cuándo se activa cada nodo:** `LLEGA` y `RAMA_LLEGA` en `escenas/Flujo.tsx` (en golpes desde el drop).
- **Volúmenes y sonidos:** componente `Sonido` en `PedidoAutomatico.tsx`.
- **Cambiar la música:** reemplazar el archivo en `PedidoAutomatico.tsx`, medir su tempo y su drop, y ajustar `GOLPE` y `MUSICA_DESDE` en `ritmo.ts`.

## Licencias

- **Remotion:** gratis para personas y empresas pequeñas; las empresas grandes pagan licencia. Ver [remotion.dev/license](https://www.remotion.dev/docs/license).
- **Música y efectos:** Pixabay Content License (uso comercial permitido).
- **Fotos:** Pexels License (uso comercial permitido).
