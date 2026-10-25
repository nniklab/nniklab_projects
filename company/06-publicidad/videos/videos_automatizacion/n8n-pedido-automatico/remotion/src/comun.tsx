// Piezas visuales compartidas por todas las escenas.
import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, random, spring, useVideoConfig} from 'remotion';
import {COLOR} from './marca';
import {g} from './ritmo';

import fotoParticulas from '../../../../../imagenes/fondos/particulas-oscuras-cottonbro.jpg';

export const suave = Easing.bezier(0.65, 0, 0.35, 1);
export const sale = Easing.bezier(0.2, 0.7, 0.2, 1);

// Avance de 0 a 1 entre dos golpes (con curva opcional).
export const tramo = (f: number, desde: number, hasta: number, curva = suave) =>
	interpolate(f, [g(desde), g(hasta)], [0, 1], {
		easing: curva,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

// Resorte que arranca en el golpe k.
export const useResorte = () => {
	const {fps} = useVideoConfig();
	return (f: number, k: number, config: {damping?: number; stiffness?: number; mass?: number} = {}) =>
		spring({frame: f - g(k), fps, config: {damping: 15, stiffness: 150, ...config}});
};

// Salida rápida: escala hacia adelante con desenfoque (como si la cámara atravesara el texto).
export const salida = (f: number, desde: number, hasta: number) => {
	const p = tramo(f, desde, hasta, Easing.in(Easing.cubic));
	return {
		opacity: 1 - p,
		transform: `scale(${1 + 0.3 * p})`,
		filter: `blur(${p * 18}px)`,
	};
};

// Texto palabra por palabra: cada palabra entra desenfocada y se asienta.
// `acento` pinta palabras en lima; `caja` las pone en una caja lima (estilo nniklab).
export const Palabras: React.FC<{
	texto: string;
	f: number;
	desde: number; // golpe de la primera palabra
	paso?: number; // golpes entre palabras
	acento?: string[];
	caja?: string[];
}> = ({texto, f, desde, paso = 0.5, acento = [], caja = []}) => {
	const resorte = useResorte();
	return (
		<>
			{texto.split(' ').map((p, i) => {
				const e = resorte(f, desde + i * paso, {damping: 14, stiffness: 170});
				const enCaja = caja.includes(p);
				return (
					<span
						key={i}
						style={{
							display: 'inline-block',
							marginRight: '0.24em',
							opacity: Math.min(1, e * 1.4),
							filter: `blur(${Math.max(0, 1 - e) * 16}px)`,
							transform: enCaja ? `scale(${0.6 + 0.4 * e})` : `translateY(${(1 - e) * 40}px)`,
							color: enCaja ? COLOR.grafito : acento.includes(p) ? COLOR.lima : undefined,
							background: enCaja ? COLOR.lima : undefined,
							padding: enCaja ? '0 0.14em' : undefined,
						}}
					>
						{p}
					</span>
				);
			})}
		</>
	);
};

// Fondo de partículas (foto de Pexels registrada en 06-publicidad/imagenes) con motas lima que flotan.
const MOTAS = Array.from({length: 22}, (_, i) => ({
	x: 60 + random(`mx${i}`) * 960,
	y: random(`my${i}`) * 1920,
	lado: 4 + Math.round(random(`ml${i}`) * 6),
	vel: 0.6 + random(`mv${i}`) * 1.4,
	fase: random(`mf${i}`) * 6.28,
}));

export const Particulas: React.FC<{f: number; opacidad: number; desplazamiento?: number}> = ({
	f,
	opacidad,
	desplazamiento = 0,
}) => {
	if (opacidad <= 0) return null;
	const t = f / 30;
	return (
		<AbsoluteFill style={{opacity: opacidad, overflow: 'hidden'}}>
			<Img
				src={fotoParticulas}
				style={{
					position: 'absolute',
					left: -300,
					top: -200,
					width: 1680,
					height: 2320,
					objectFit: 'cover',
					objectPosition: '70% 50%',
					transform: `translate(${-t * 8}px, ${-t * 12 - desplazamiento}px) scale(${1 + t * 0.006}) rotate(${t * 0.3}deg)`,
				}}
			/>
			{MOTAS.map((m, i) => {
				const y = (((m.y - f * m.vel - desplazamiento * 1.6) % 1920) + 1920) % 1920;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: m.x + 14 * Math.sin(t * 0.6 + m.fase),
							top: y,
							width: m.lado,
							height: m.lado,
							background: COLOR.lima,
							opacity: 0.18 + 0.25 * (0.5 + 0.5 * Math.sin(t * 1.7 + m.fase)),
						}}
					/>
				);
			})}
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(180deg, rgba(17,20,24,.86) 0%, rgba(17,20,24,.66) 50%, rgba(17,20,24,.9) 100%)',
				}}
			/>
		</AbsoluteFill>
	);
};

// Luz lima que late con la música.
export const Resplandor: React.FC<{intensidad: number; y?: number; tam?: number}> = ({intensidad, y = 960, tam = 1300}) =>
	intensidad <= 0 ? null : (
		<div
			style={{
				position: 'absolute',
				left: 540 - tam / 2,
				top: y - tam / 2,
				width: tam,
				height: tam,
				background: `radial-gradient(circle, rgba(198,244,50,${0.16 * intensidad}) 0%, rgba(198,244,50,0) 60%)`,
			}}
		/>
	);

// Acabado de cine: viñeta y grano.
export const Acabado: React.FC<{f: number}> = ({f}) => (
	<>
		<AbsoluteFill
			style={{background: 'radial-gradient(ellipse 80% 65% at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)'}}
		/>
		<AbsoluteFill style={{opacity: 0.045, mixBlendMode: 'overlay'}}>
			<svg width="1080" height="1920">
				<filter id="grano">
					<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={Math.floor(f / 3)} />
				</filter>
				<rect width="100%" height="100%" filter="url(#grano)" />
			</svg>
		</AbsoluteFill>
	</>
);
