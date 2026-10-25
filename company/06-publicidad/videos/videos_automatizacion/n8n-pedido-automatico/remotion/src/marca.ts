// Identidad visual de nniklab para los videos en Remotion.
// Colores y fuentes oficiales: se leen desde su ubicación de marca, sin copiarlos.
import {loadFont} from '@remotion/fonts';

import sg500 from '../../../../../../05-web/sitio/assets/fonts/space-grotesk-latin-500-normal.woff2';
import sg700 from '../../../../../../05-web/sitio/assets/fonts/space-grotesk-latin-700-normal.woff2';
import in400 from '../../../../../../05-web/sitio/assets/fonts/inter-latin-400-normal.woff2';
import in500 from '../../../../../../05-web/sitio/assets/fonts/inter-latin-500-normal.woff2';
import jb400 from '../../../../../../05-web/sitio/assets/fonts/jetbrains-mono-latin-400-normal.woff2';

export const COLOR = {
	lima: '#C6F432',
	grafito: '#111418',
	superficie: '#1A1D22',
	linea: '#2E333B',
	hueso: '#F4F4F2',
	gris: '#9CA3AF',
	acero: '#6B7280',
} as const;

export const FUENTE = {
	titulo: '"Space Grotesk", sans-serif',
	texto: 'Inter, sans-serif',
	mono: '"JetBrains Mono", monospace',
} as const;

const fuentes = [
	{family: 'Space Grotesk', url: sg500, weight: '500'},
	{family: 'Space Grotesk', url: sg700, weight: '700'},
	{family: 'Inter', url: in400, weight: '400'},
	{family: 'Inter', url: in500, weight: '500'},
	{family: 'JetBrains Mono', url: jb400, weight: '400'},
];

// loadFont retiene el render hasta que cada fuente está lista.
export const cargarFuentes = () => {
	for (const f of fuentes) {
		loadFont({family: f.family, url: f.url, weight: f.weight, format: 'woff2'});
	}
};
