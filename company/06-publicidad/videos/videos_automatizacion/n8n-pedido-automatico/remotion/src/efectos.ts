// Utilidades de animación reutilizables para los videos de nniklab.
import {random} from 'remotion';

const SIGNOS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&';

// Escribe un texto letra por letra y "decodifica" los últimos caracteres:
// mientras no se asientan muestran signos al azar (efecto scramble).
export const decodificar = (
	texto: string,
	frame: number,
	inicio: number,
	velocidad = 1.4,
	revueltos = 5,
) => {
	const escritos = Math.floor((frame - inicio) * velocidad);
	if (escritos <= 0) return '';
	let salida = '';
	for (let i = 0; i < Math.min(escritos, texto.length); i++) {
		const letra = texto[i];
		const asentada = escritos - i > revueltos;
		if (asentada || letra === ' ' || letra === '·') {
			salida += letra;
		} else {
			salida += SIGNOS[Math.floor(random(`${texto}-${i}-${frame}`) * SIGNOS.length)];
		}
	}
	return salida;
};

// Número que "baraja" sus dígitos antes de fijarse en el valor final.
export const barajar = (valor: string, frame: number, fijaEn: number) => {
	if (frame >= fijaEn) return valor;
	return valor
		.split('')
		.map((c, i) => (/[0-9]/.test(c) ? String(Math.floor(random(`b-${i}-${frame}`) * 10)) : c))
		.join('');
};

// Punto de una curva Bézier cúbica (para los cables de la bifurcación).
export type Punto = {x: number; y: number};
export const bezier = (p0: Punto, p1: Punto, p2: Punto, p3: Punto, t: number): Punto => {
	const u = 1 - t;
	return {
		x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
		y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
	};
};
