// Mapa de tiempos del video, medido sobre la música "Future Bass Hot Night" (alexgrohl, Pixabay).
// La pista va a 176 golpes por minuto: un golpe cada 0,34109 s (≈ 10,23 fotogramas a 30 fps).
// Todo el video se programa en golpes, así cada animación y cada sonido cae sobre el ritmo.

export const FPS = 30;

// La música arranca en el fotograma 1985 de la pista (66,17 s): justo antes de un golpe,
// para que el "drop" de la canción (77,1 s) caiga en el golpe 32 del video (≈ 10,9 s).
export const MUSICA_DESDE = 1985;

export const GOLPE = 0.34109 * FPS; // fotogramas entre golpes
const DESFASE = 0.45; // el golpe 0 cae 0,015 s después del inicio

// Fotograma en que cae el golpe k (acepta medios golpes: 4.5, 27.25…).
export const g = (k: number) => DESFASE + k * GOLPE;

// Golpe (con decimales) en que está un fotograma.
export const golpeEn = (f: number) => (f - DESFASE) / GOLPE;

// Escenas, en golpes
export const ESCENA = {
	familiar: 0, // ¿Te suena familiar?
	caos: 4, // copiar y pegar a mano (build-up de la música)
	formaMejor: 24, // Hay una forma mejor (riser y silencio previo al drop)
	flujo: 32, // DROP: entra el flujo de n8n
	resultado: 62, // Ahora se hace solo · 15 min → 3 s
	lema: 74, // Automatiza lo repetitivo. Dedícate a lo importante.
	cierre: 82, // logo tecleado
	fin: 101,
} as const;

export const DURACION = Math.ceil(g(ESCENA.fin));

// Brillo que "late" con cada golpe: 1 justo en el golpe y se apaga antes del siguiente.
export const latido = (f: number, desde: number, hasta: number, cada = 1) => {
	const k = golpeEn(f);
	if (k < desde || k > hasta) return 0;
	const fase = ((k - desde) % cada) / cada;
	return Math.exp(-fase * 5);
};
