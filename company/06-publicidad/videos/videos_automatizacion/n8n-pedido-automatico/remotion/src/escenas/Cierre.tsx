// Golpes 82–101: cierre de marca "logo tecleado" (la animación aprobada en
// recursos/animacion/cierre-logo-tecleado.html), ahora al ritmo de la música:
// el cursor parpadea en medios golpes, cada letra cae en un medio golpe y el cursor
// salta a ser el punto de la "i" justo en un golpe.
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {COLOR} from '../marca';
import {ESCENA, g, golpeEn} from '../ritmo';
import {Resplandor, suave, tramo} from '../comun';
import {NK_LOGO} from '../logo';

const C = ESCENA.cierre;
export const TECLAS = Array.from({length: 7}, (_, i) => C + 2 + i * 0.5); // golpes de cada letra
const SALTO_A = C + 5.75;
export const SALTO_B = C + 7; // el punto aterriza sobre la "i"

// Medidas del logo (unidades del SVG de marca)
const DERECHA = [110.0, 225.2, 269.6, 385.6, 419.6, 536.8, 652.0]; // borde derecho de cada letra
const ESPACIO = 9;
const ANCHO_CURSOR = 34;
const ALTO_CURSOR = 99.2;
const PUNTO = {x: 240, y: -140};

export const Cierre: React.FC<{f: number}> = ({f}) => {
	const k = golpeEn(f);
	if (k < C - 0.3) return null;

	let tecleadas = 0;
	TECLAS.forEach((t, i) => {
		if (k >= t) tecleadas = i + 1;
	});

	let x = tecleadas === 0 ? 14 : DERECHA[tecleadas - 1] + ESPACIO;
	let y = -ALTO_CURSOR;
	let alto = ALTO_CURSOR;
	let visible = 1;
	if (k < SALTO_A) {
		const escribiendo = k >= TECLAS[0] - 0.1 && k < TECLAS[6] + 0.4;
		if (!escribiendo) visible = Math.floor((k - C) * 2) % 2 === 0 ? 1 : 0; // parpadeo en medios golpes
	} else {
		const j = tramo(f, SALTO_A, SALTO_B, suave);
		x = interpolate(j, [0, 1], [DERECHA[6] + ESPACIO, PUNTO.x]);
		alto = interpolate(Math.min(1, j * 1.6), [0, 1], [ALTO_CURSOR, ANCHO_CURSOR]);
		y = interpolate(j, [0, 1], [-ALTO_CURSOR, PUNTO.y]) - 70 * Math.sin(j * Math.PI);
		if (k >= SALTO_B) {
			const r = Math.min(1, (k - SALTO_B) / 1);
			y = PUNTO.y + 9 * Math.sin(r * Math.PI) * (1 - r);
		}
	}
	const onda = tramo(f, SALTO_B + 0.3, SALTO_B + 2.6);
	const ladoOnda = ANCHO_CURSOR + 90 * onda;
	const descriptor = 680 * tramo(f, SALTO_B + 0.8, SALTO_B + 2.8);
	const respira = 1 + 0.025 * tramo(f, C, ESCENA.fin);
	const fundido = interpolate(k, [ESCENA.fin - 1.5, ESCENA.fin], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill>
			<Resplandor intensidad={0.7 * tramo(f, SALTO_B, SALTO_B + 1) * (1 - fundido)} y={800} tam={900} />
			<svg
				width="1080"
				height="1920"
				viewBox="0 0 1080 1920"
				style={{position: 'absolute', inset: 0, transform: `scale(${respira})`, opacity: 1 - fundido}}
			>
				<defs>
					<clipPath id="nk-barrido">
						<rect x="0" y="0" width={descriptor} height="120" />
					</clipPath>
				</defs>
				<g transform="translate(160,960) scale(1.15)">
					{NK_LOGO.letters.map((d, i) => (
						<path
							key={i}
							d={d}
							fill={COLOR.hueso}
							opacity={interpolate(f, [g(TECLAS[i]), g(TECLAS[i]) + 1.5], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							})}
						/>
					))}
					<g clipPath="url(#nk-barrido)">
						<g transform="translate(2,62.7)">
							<path d={NK_LOGO.desc} fill={COLOR.gris} />
						</g>
					</g>
					{onda > 0 && onda < 1 && (
						<rect
							x={PUNTO.x + ANCHO_CURSOR / 2 - ladoOnda / 2}
							y={PUNTO.y + ANCHO_CURSOR / 2 - ladoOnda / 2}
							width={ladoOnda}
							height={ladoOnda}
							fill="none"
							stroke={COLOR.lima}
							strokeWidth="3.5"
							opacity={0.8 * (1 - onda)}
						/>
					)}
					<rect x={x} y={y} width={ANCHO_CURSOR} height={alto} fill={COLOR.lima} opacity={visible} />
				</g>
			</svg>
		</AbsoluteFill>
	);
};
