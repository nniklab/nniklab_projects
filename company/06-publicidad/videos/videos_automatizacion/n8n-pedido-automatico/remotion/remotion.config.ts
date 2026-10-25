// Configuración de render de Remotion para los videos de nniklab.
// Pensada para subir a redes (Reels, TikTok, Shorts, LinkedIn): las plataformas vuelven a
// comprimir el video, así que se entrega con mucha calidad para que pierda lo mínimo.
import {Config} from '@remotion/cli/config';

Config.setEntryPoint('./src/index.ts');
Config.setVideoImageFormat('png'); // fotogramas sin pérdida (JPEG añadía compresión extra)
Config.setCodec('h264'); // el formato que aceptan todas las redes
Config.setCrf(12); // calidad muy alta (≈ 10–15 Mbps en este video)
Config.setX264Preset('slow'); // compresión más cuidadosa: mejor calidad por el mismo peso
Config.setPixelFormat('yuv420p'); // color estándar (evita el rango completo "yuvj420p", que algunas redes leen mal)
Config.setColorSpace('bt709'); // espacio de color de video HD
Config.setAudioBitrate('320k');
Config.setOverwriteOutput(true);
