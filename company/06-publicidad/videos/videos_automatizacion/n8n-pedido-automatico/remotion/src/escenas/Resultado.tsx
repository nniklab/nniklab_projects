// Golpes 62–82: el resultado ("Ahora se hace solo." y 15 min → 3 s) y el lema.
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {Clock} from 'lucide-react';
import {COLOR, FUENTE} from '../marca';
import {ESCENA, g, golpeEn, latido} from '../ritmo';
import {Palabras, Resplandor, salida, tramo, useResorte} from '../comun';
import {barajar} from '../efectos';

const R = ESCENA.resultado;
export const FIJA_3S = g(R + 8); // el "3" deja de barajarse y golpea
const L = ESCENA.lema;
export const CAJA_IMPORTANTE = L + 4.5;

const titular: React.CSSProperties = {
	fontFamily: FUENTE.titulo,
	fontWeight: 700,
	color: COLOR.hueso,
	letterSpacing: -2.5,
	lineHeight: 1.05,
};

export const Resultado: React.FC<{f: number}> = ({f}) => {
	const resorte = useResorte();
	const k = golpeEn(f);
	if (k < R - 0.2 || k > L + 0.4) return null;
	const tachado = tramo(f, R + 5, R + 6);
	const minutos = resorte(f, R + 3, {damping: 18});
	const tres = resorte(f, R + 6, {damping: 9, stiffness: 160});
	const golpe = resorte(f, R + 8, {damping: 8, stiffness: 220});
	const escala = f < FIJA_3S ? tres : 1 + 0.2 * (1 - golpe);
	return (
		<AbsoluteFill>
			<Resplandor intensidad={0.6 * latido(f, R + 8, L, 2)} y={1080} />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 80, ...salida(f, L - 0.6, L)}}>
				<div style={{...titular, fontSize: 108}}>
					<Palabras texto="Ahora se hace solo." f={f} desde={R} paso={0.5} acento={['solo.']} />
				</div>
				<div style={{display: 'flex', alignItems: 'center', gap: 44, marginTop: 70, height: 280}}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 18,
							opacity: minutos,
							transform: `translateX(${(1 - minutos) * -40}px)`,
							position: 'relative',
						}}
					>
						<Clock size={56} color={COLOR.gris} strokeWidth={1.8} />
						<span style={{fontFamily: FUENTE.mono, fontSize: 66, color: COLOR.gris}}>15 min</span>
						<div
							style={{
								position: 'absolute',
								left: -6,
								top: '50%',
								height: 6,
								width: `calc(${tachado * 100}% + 12px)`,
								background: COLOR.lima,
								boxShadow: '0 0 14px rgba(198,244,50,.8)',
							}}
						/>
					</div>
					<div
						style={{
							fontFamily: FUENTE.titulo,
							fontWeight: 700,
							fontSize: 260,
							color: COLOR.lima,
							lineHeight: 1,
							letterSpacing: -6,
							opacity: Math.min(1, tres),
							transform: `scale(${escala})`,
							textShadow: `0 0 ${f >= FIJA_3S ? 70 * (1.4 - golpe * 0.6) : 30}px rgba(198,244,50,.45)`,
						}}
					>
						{barajar('3', f, FIJA_3S)}
						<span style={{fontSize: 156, marginLeft: 16}}>s</span>
					</div>
				</div>
				<div
					style={{
						position: 'absolute',
						bottom: 300,
						fontFamily: FUENTE.mono,
						fontSize: 26,
						color: COLOR.acero,
						opacity: tramo(f, R + 9, R + 10),
					}}
				>
					proceso de ejemplo · tiempos ilustrativos
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

export const Lema: React.FC<{f: number}> = ({f}) => {
	const k = golpeEn(f);
	if (k < L - 0.2 || k > ESCENA.cierre + 0.4) return null;
	return (
		<AbsoluteFill>
			<Resplandor intensidad={0.4 + 0.8 * latido(f, L + 4.5, ESCENA.cierre, 1)} y={1060} />
			<AbsoluteFill style={{justifyContent: 'center', padding: '0 110px', ...salida(f, ESCENA.cierre - 0.6, ESCENA.cierre)}}>
				<div style={{...titular, fontSize: 112, transform: `scale(${1 + 0.04 * tramo(f, L, ESCENA.cierre)})`, transformOrigin: '0% 50%'}}>
					<div>
						<Palabras texto="Automatiza lo repetitivo." f={f} desde={L} paso={0.5} />
					</div>
					<div style={{marginTop: 50}}>
						<Palabras texto="Dedícate a lo importante." f={f} desde={L + 2.5} paso={0.5} caja={['importante.']} />
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// El fondo de partículas aparece en el drop y se va antes del logo.
export const opacidadParticulas = (f: number) =>
	interpolate(golpeEn(f), [ESCENA.flujo - 0.2, ESCENA.flujo + 1, ESCENA.cierre - 1, ESCENA.cierre + 0.5], [0, 0.85, 0.85, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
