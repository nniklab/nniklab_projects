// Escenas de texto grande: "¿Te suena familiar?" (apertura) y "Hay una forma mejor." (antes del drop).
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {COLOR, FUENTE} from '../marca';
import {ESCENA, g, golpeEn, latido} from '../ritmo';
import {Palabras, Resplandor, salida, tramo} from '../comun';
import {decodificar} from '../efectos';

const grande: React.CSSProperties = {
	fontFamily: FUENTE.titulo,
	fontWeight: 700,
	fontSize: 112,
	lineHeight: 1.05,
	letterSpacing: -3,
	color: COLOR.hueso,
	textAlign: 'center',
};

// Golpes 0–4: el gancho del inicio. Empuje lento de cámara y salida hacia adelante.
export const Familiar: React.FC<{f: number}> = ({f}) => {
	if (f > g(ESCENA.caos + 0.4)) return null;
	const empuje = 1 + 0.06 * tramo(f, 0, 4);
	return (
		<AbsoluteFill>
			<Resplandor intensidad={0.5 + 0.8 * latido(f, 1, 4)} />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: 120}}>
				<div style={{...grande, transform: `scale(${empuje})`}}>
					<div style={salida(f, 3.5, 4.3)}>
						<Palabras texto="¿Te suena familiar?" f={f} desde={0} paso={0.75} caja={['familiar?']} />
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// Golpes 24–32: el caos se hunde, aparece la frase mientras la música sube (riser),
// todo queda en negro en el silencio previo y la frase sale disparada en el drop.
export const FormaMejor: React.FC<{f: number}> = ({f}) => {
	const k = golpeEn(f);
	if (k < ESCENA.formaMejor || k > ESCENA.flujo + 0.2) return null;
	const sube = tramo(f, 24, 30); // tensión del riser
	const silencio = tramo(f, 29.6, 30.2);
	const cursor = Math.floor(k * 2) % 2 === 0 ? 1 : 0;
	return (
		<AbsoluteFill>
			{/* En el silencio previo al drop todo cae a negro */}
			<AbsoluteFill style={{background: '#000', opacity: silencio * 0.85}} />
			<Resplandor intensidad={(0.3 + 1.2 * sube) * (1 - silencio)} tam={1100 + 500 * sube} />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: 100}}>
				<div style={{...salida(f, 31.4, 32), width: '100%'}}>
					<div style={{...grande, transform: `scale(${1 + 0.1 * sube})`}}>
						<Palabras texto="Hay una forma mejor." f={f} desde={25} paso={0.75} caja={['mejor.']} />
					</div>
					<div
						style={{
							marginTop: 48,
							textAlign: 'center',
							fontFamily: FUENTE.mono,
							fontSize: 40,
							color: COLOR.gris,
							opacity: interpolate(k, [27.5, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
						}}
					>
						{'> '}
						{decodificar('automatízalo', f, g(28), 1.4, 2)}
						<span style={{color: COLOR.lima, opacity: cursor}}>_</span>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// Destello lima en el golpe del drop.
export const Destello: React.FC<{f: number; k: number}> = ({f, k}) => {
	const o = interpolate(f, [g(k) - 1, g(k), g(k) + 5], [0, 0.7, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return o > 0 ? <AbsoluteFill style={{background: COLOR.lima, opacity: o}} /> : null;
};
