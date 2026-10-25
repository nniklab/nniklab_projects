// Golpes 4–28: el problema. Alguien copia pedidos del correo a la hoja a mano,
// los mensajes se acumulan y el reloj corre. Todo se acelera con el build-up de la música
// y al final el caos se hunde hacia el centro.
import React from 'react';
import {AbsoluteFill, Img, interpolate, random} from 'remotion';
import {Bell, Mail, MessageCircle, Table, type LucideIcon} from 'lucide-react';
import {COLOR, FUENTE} from '../marca';
import {ESCENA, g, golpeEn} from '../ritmo';
import {Palabras, sale, tramo, useResorte} from '../comun';

import fotoNoche from '../../../../../../imagenes/fondos/trabajo-nocturno-oktay-koseoglu.jpg';

// Ciclos de copiar y pegar (en golpes): empiezan lentos y se aceleran.
const DURACIONES = [3, 2.5, 2, 1.5, 1.5, 1, 1, 1];
export const CICLOS = (() => {
	let k = ESCENA.caos + 1;
	return DURACIONES.map((d) => {
		const c = {inicio: k, copia: k + d * 0.45, pega: k + d};
		k += d;
		return c;
	});
})();

// Datos ficticios (rotulados como ejemplo en la escena del flujo). La fila 4 se duplica por error.
const FILAS = [
	['#1048', 'Ana R.', '$184,50'],
	['#1049', 'Luis M.', '$62,00'],
	['#1050', 'Carla P.', '$310,20'],
	['#1050', 'Carla P.', '$310,20'],
	['#1051', 'Jorge T.', '$45,90'],
	['#1052', 'Sofía V.', '$128,00'],
	['#1053', 'Pedro L.', '$77,40'],
	['#1054', 'Marta G.', '$203,10'],
];
const FILA_ERROR = 3;

const APPS: [LucideIcon, string][] = [
	[Mail, 'Gmail'],
	[MessageCircle, 'WhatsApp'],
	[Mail, 'Outlook'],
	[Table, 'Excel'],
	[Bell, 'Teams'],
	[Bell, 'Slack'],
];
const MENSAJES = [
	'Nuevo pedido #1055',
	'¿Ya enviaron mi pedido?',
	'URGENTE: falta la factura',
	'Te reenvío el pedido',
	'¿Me confirmas el stock?',
	'Pedido modificado',
	'Recordatorio: responder al cliente',
	'3 mensajes nuevos',
	'Nuevo pedido #1056',
	'¿Cuándo llega?',
];

// Notificaciones: cada una entra en medio golpe, cada vez más seguidas.
const AVISOS = Array.from({length: 24}, (_, i) => ({
	k: Math.round((ESCENA.caos + 7 + 12.5 * Math.sqrt(i / 24)) * 2) / 2,
	x: 110 + random(`nx${i}`) * 260,
	y: 600 + random(`ny${i}`) * 900,
	giro: (random(`nr${i}`) - 0.5) * 10,
	app: APPS[i % APPS.length],
	msj: MENSAJES[(i * 7) % MENSAJES.length],
}));

const CORREO = {x: 700, y: 730};
const filaPunto = (i: number) => ({x: 470, y: 860 + 64 + 44 + i * 50 + 25});

const Puntero: React.FC<{f: number}> = ({f}) => {
	const k = golpeEn(f);
	// Recorrido: correo (copiar) → fila nueva (pegar), ciclo tras ciclo.
	const tiempos: number[] = [ESCENA.caos + 0.6];
	const xs = [900];
	const ys = [1560];
	let px = 900;
	let py = 1560;
	CICLOS.forEach((c, i) => {
		const fila = filaPunto(i);
		tiempos.push(c.inicio, c.copia, c.copia + (c.pega - c.copia) * 0.2, c.pega);
		xs.push(px, CORREO.x, CORREO.x, fila.x);
		ys.push(py, CORREO.y, CORREO.y, fila.y);
		px = fila.x;
		py = fila.y;
	});
	const opts = {easing: sale, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
	let x = xs[0];
	let y = ys[0];
	for (let i = 1; i < tiempos.length; i++) {
		if (k <= tiempos[i]) {
			x = interpolate(k, [tiempos[i - 1], tiempos[i]], [xs[i - 1], xs[i]], opts);
			y = interpolate(k, [tiempos[i - 1], tiempos[i]], [ys[i - 1], ys[i]], opts);
			break;
		}
		x = xs[i];
		y = ys[i];
	}
	let atajo: string | null = null;
	CICLOS.forEach((c) => {
		if (k >= c.copia && k < c.copia + 0.6) atajo = 'Ctrl+C';
		if (k >= c.pega && k < c.pega + 0.6) atajo = 'Ctrl+V';
	});
	return (
		<div style={{position: 'absolute', left: x, top: y, opacity: tramo(f, ESCENA.caos + 0.4, ESCENA.caos + 1)}}>
			<svg width="50" height="50" viewBox="0 0 24 24">
				<path
					d="M4 2.5v17.5l4.6-4.4 3.1 6.9 3-1.3-3.1-6.8h6.4Z"
					fill={COLOR.hueso}
					stroke={COLOR.grafito}
					strokeWidth="1.4"
					strokeLinejoin="round"
				/>
			</svg>
			{atajo && (
				<div
					style={{
						position: 'absolute',
						left: 44,
						top: 42,
						padding: '4px 12px',
						background: COLOR.hueso,
						color: COLOR.grafito,
						fontFamily: FUENTE.mono,
						fontSize: 22,
						whiteSpace: 'nowrap',
					}}
				>
					{atajo}
				</div>
			)}
		</div>
	);
};

const Reloj: React.FC<{angulo: number}> = ({angulo}) => (
	<svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke={COLOR.gris} strokeWidth="2" strokeLinecap="round">
		<circle cx="12" cy="12" r="10" />
		<path d="M12 12V6" transform={`rotate(${angulo} 12 12)`} />
		<path d="M12 12h3.5" transform={`rotate(${angulo / 12} 12 12)`} />
	</svg>
);

const tarjeta: React.CSSProperties = {
	position: 'absolute',
	left: 120,
	width: 840,
	boxSizing: 'border-box',
	background: COLOR.superficie,
	border: `1px solid ${COLOR.linea}`,
	borderRadius: 10,
};

export const Caos: React.FC<{f: number}> = ({f}) => {
	const resorte = useResorte();
	const k = golpeEn(f);
	if (k < ESCENA.caos - 0.2 || k > ESCENA.formaMejor + 4.5) return null;

	const entra = tramo(f, ESCENA.caos, ESCENA.caos + 1, sale);
	const tension = tramo(f, ESCENA.caos + 8, ESCENA.formaMejor); // crece con el build-up
	const hunde = tramo(f, ESCENA.formaMejor, ESCENA.formaMejor + 4); // implosión
	const sacudida = 13 * tension * tension * (1 - hunde);
	const sx = sacudida * Math.sin(f * 1.9);
	const sy = sacudida * Math.cos(f * 1.4);

	let actual = -1;
	CICLOS.forEach((c, i) => {
		if (k >= c.inicio) actual = i;
	});
	const correo = FILAS[Math.max(0, actual)];
	const nuevo = actual >= 0 ? resorte(f, CICLOS[actual].inicio, {damping: 20}) : 1;
	const seleccionado = actual >= 0 && k >= CICLOS[actual].copia && k < CICLOS[actual].pega;
	const pegadas = CICLOS.filter((c) => k >= c.pega).length;
	const avisos = AVISOS.filter((a) => k >= a.k).length;
	const minutos = Math.round(15 * Math.pow(tramo(f, ESCENA.caos + 1, ESCENA.formaMejor), 1.5));
	const ultimoAviso = avisos ? AVISOS[avisos - 1].k : 0;

	return (
		<AbsoluteFill
			style={{
				opacity: entra * (1 - hunde),
				transform: `scale(${1 - 0.4 * hunde}) rotate(${-4 * hunde}deg)`,
				filter: `blur(${hunde * 16}px)`,
			}}
		>
			{/* Foto de fondo: persona trabajando sola de noche (Pexels, registrada en imagenes/) */}
			<AbsoluteFill style={{overflow: 'hidden'}}>
				<Img
					src={fotoNoche}
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: '34% 50%',
						// la foto es la versión web de 1600 px: un desenfoque de profundidad evita que se note ampliada
						filter: 'blur(3px)',
						transform: `scale(${1.06 + 0.16 * tramo(f, ESCENA.caos, ESCENA.formaMejor)}) translate(${sx * 0.4}px, ${sy * 0.4}px)`,
					}}
				/>
				<AbsoluteFill
					style={{
						background: `linear-gradient(180deg, rgba(17,20,24,.62) 0%, rgba(17,20,24,${0.5 + 0.25 * tension}) 45%, rgba(17,20,24,.94) 100%)`,
					}}
				/>
			</AbsoluteFill>

			{/* Titular */}
			<div
				style={{
					position: 'absolute',
					left: 120,
					top: 340,
					width: 860,
					fontFamily: FUENTE.titulo,
					fontWeight: 700,
					fontSize: 76,
					lineHeight: 1.04,
					letterSpacing: -2.5,
					color: COLOR.hueso,
				}}
			>
				{k < ESCENA.caos + 9.6 ? (
					<div style={{opacity: 1 - tramo(f, ESCENA.caos + 9.2, ESCENA.caos + 9.6)}}>
						<Palabras texto="Llega un pedido…" f={f} desde={ESCENA.caos + 0.25} paso={0.5} />
					</div>
				) : (
					<Palabras
						texto="¿Cuánto tiempo pierdes copiando y pegando?"
						f={f}
						desde={ESCENA.caos + 10}
						paso={0.5}
						acento={['tiempo']}
					/>
				)}
			</div>

			{/* Barra de estado: mensajes sin leer y reloj */}
			<div
				style={{
					position: 'absolute',
					left: 120,
					top: 262,
					width: 840,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					opacity: tramo(f, ESCENA.caos + 0.5, ESCENA.caos + 1.5),
				}}
			>
				<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
					<div
						style={{
							minWidth: 46,
							height: 46,
							padding: '0 10px',
							boxSizing: 'border-box',
							background: COLOR.hueso,
							color: COLOR.grafito,
							fontFamily: FUENTE.mono,
							fontSize: 26,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							transform: `scale(${1 + 0.2 * Math.max(0, 1 - (k - ultimoAviso) / 0.5) * (avisos ? 1 : 0)})`,
						}}
					>
						{3 + avisos}
					</div>
					<div style={{fontFamily: FUENTE.mono, fontSize: 26, color: COLOR.gris}}>sin leer</div>
				</div>
				<div style={{display: 'flex', alignItems: 'center', gap: 14}}>
					<Reloj angulo={f * (6 + 26 * tension)} />
					<div style={{fontFamily: FUENTE.mono, fontSize: 36, color: COLOR.gris, minWidth: 140}}>{minutos} min</div>
				</div>
			</div>

			<AbsoluteFill style={{transform: `translate(${sx}px, ${sy}px)`}}>
				{/* El correo con el pedido actual */}
				<div
					style={{
						...tarjeta,
						top: 650,
						padding: '20px 24px',
						display: 'flex',
						alignItems: 'center',
						gap: 20,
						opacity: tramo(f, ESCENA.caos + 0.3, ESCENA.caos + 1),
					}}
				>
					<div
						style={{
							width: 56,
							height: 56,
							flex: 'none',
							background: COLOR.linea,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Mail size={30} color={COLOR.hueso} strokeWidth={1.8} />
					</div>
					<div style={{opacity: nuevo, transform: `translateY(${(1 - nuevo) * 12}px)`}}>
						<div style={{fontFamily: FUENTE.mono, fontSize: 19, color: COLOR.gris}}>Gmail · ahora</div>
						<div style={{fontFamily: FUENTE.texto, fontWeight: 500, fontSize: 29, color: COLOR.hueso, marginTop: 6}}>
							Pedido{' '}
							<span style={{background: seleccionado ? COLOR.acero : 'transparent'}}>
								{correo[0]} · {correo[1]} · {correo[2]}
							</span>
						</div>
					</div>
				</div>

				{/* La hoja de pedidos que se llena a mano */}
				<div style={{...tarjeta, top: 860, overflow: 'hidden', opacity: tramo(f, ESCENA.caos + 0.5, ESCENA.caos + 1.2)}}>
					<div
						style={{
							height: 64,
							display: 'flex',
							alignItems: 'center',
							gap: 14,
							padding: '0 24px',
							borderBottom: `1px solid ${COLOR.linea}`,
						}}
					>
						<Table size={26} color={COLOR.gris} strokeWidth={1.8} />
						<div style={{fontFamily: FUENTE.mono, fontSize: 21, color: COLOR.gris}}>pedidos.xlsx</div>
					</div>
					<div
						style={{
							height: 44,
							display: 'grid',
							gridTemplateColumns: '150px 1fr 190px',
							alignItems: 'center',
							padding: '0 24px',
							fontFamily: FUENTE.mono,
							fontSize: 18,
							color: COLOR.gris,
							borderBottom: `1px solid ${COLOR.linea}`,
						}}
					>
						<div>#</div>
						<div>cliente</div>
						<div>total</div>
					</div>
					{FILAS.map((r, i) => {
						const visible = i < pegadas;
						const error = i === FILA_ERROR && visible;
						const dk = k - CICLOS[i].pega;
						const temblor = error ? 9 * Math.sin(dk * 40) * Math.max(0, 1 - dk / 1.2) : 0;
						return (
							<div
								key={i}
								style={{
									position: 'relative',
									height: 50,
									display: 'grid',
									gridTemplateColumns: '150px 1fr 190px',
									alignItems: 'center',
									padding: '0 24px',
									fontFamily: FUENTE.texto,
									fontSize: 25,
									color: error ? COLOR.gris : COLOR.hueso,
									background: error ? COLOR.linea : 'transparent',
									borderBottom: `1px solid ${COLOR.linea}`,
									opacity: visible ? Math.min(1, dk * 4) : 0,
									transform: `translateX(${temblor}px)`,
								}}
							>
								<div style={{fontFamily: FUENTE.mono, fontSize: 22}}>{r[0]}</div>
								<div>{r[1]}</div>
								<div>{r[2]}</div>
								{error && (
									<div
										style={{
											position: 'absolute',
											right: 16,
											top: 11,
											padding: '2px 10px',
											background: COLOR.hueso,
											color: COLOR.grafito,
											fontFamily: FUENTE.mono,
											fontSize: 18,
										}}
									>
										[error] dato_duplicado
									</div>
								)}
							</div>
						);
					})}
				</div>

				<Puntero f={f} />

				{/* Notificaciones que se apilan */}
				{AVISOS.map((a, i) => {
					if (k < a.k) return null;
					const e = resorte(f, a.k, {damping: 13, stiffness: 200});
					const [Icono, app] = a.app;
					return (
						<div
							key={i}
							style={{
								...tarjeta,
								left: a.x,
								top: a.y,
								width: 610,
								padding: '18px 22px',
								display: 'flex',
								alignItems: 'center',
								gap: 18,
								boxShadow: '0 24px 50px rgba(0,0,0,.5)',
								opacity: Math.min(1, e) * (1 - 0.25 * tramo(f, a.k + 1, a.k + 4)),
								transform: `translateX(${160 * (1 - e)}px) rotate(${a.giro}deg) scale(${0.88 + 0.12 * e})`,
							}}
						>
							<div
								style={{
									width: 50,
									height: 50,
									flex: 'none',
									background: COLOR.linea,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Icono size={26} color={COLOR.hueso} strokeWidth={1.8} />
							</div>
							<div style={{minWidth: 0}}>
								<div style={{fontFamily: FUENTE.mono, fontSize: 18, color: COLOR.gris}}>{app} · ahora</div>
								<div style={{fontFamily: FUENTE.texto, fontWeight: 500, fontSize: 27, color: COLOR.hueso, whiteSpace: 'nowrap', marginTop: 4}}>
									{a.msj}
								</div>
							</div>
						</div>
					);
				})}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// Golpes en que se pega una fila (para el sonido).
export const PEGADOS = CICLOS.map((c) => g(c.pega));
