// Golpes 32–74: "el flujo". Entra en el drop de la música: el título golpea, la cámara sigue
// al pedido nodo por nodo (un compás por nodo), se divide en cuatro salidas y se aleja para
// mostrar el flujo completo. Desde el golpe 62 se hunde al fondo detrás del resultado.
import React from 'react';
import {AbsoluteFill, interpolate, spring, useVideoConfig} from 'remotion';
import {
	Bell,
	Check,
	Database,
	Mail,
	MessageCircle,
	Sparkles,
	Split,
	Table,
	Users,
	type LucideIcon,
} from 'lucide-react';
import {COLOR, FUENTE} from '../marca';
import {bezier, decodificar, type Punto} from '../efectos';
import {ESCENA, g} from '../ritmo';
import {Palabras, suave} from '../comun';

// Golpes contados desde el drop (golpe 32 del video).
const D = (k: number) => g(ESCENA.flujo + k);

// ─── Contenido (el mismo de la v3; datos ficticios, rotulados como ejemplo) ───
type Nodo = {icono: LucideIcon; nombre: string; sub: string; dato: string};

const PRINCIPALES: (Nodo & {y: number})[] = [
	{icono: Mail, nombre: 'Nuevo pedido', sub: 'Gmail · Outlook', dato: 'Pedido #1048 · Ana R.', y: 0},
	{icono: Sparkles, nombre: 'Extraer datos', sub: 'IA · OpenAI / Claude', dato: '3 productos · $184,50', y: 240},
	{icono: Database, nombre: 'Consultar stock', sub: 'Base de datos', dato: 'stock disponible', y: 480},
	{icono: Split, nombre: '¿Hay stock?', sub: 'IF', dato: 'true', y: 720},
];

const RAMA_Y = 1010;
const RAMAS: (Nodo & {x: number})[] = [
	{icono: Table, nombre: 'Guardar', sub: 'Sheets', dato: 'fila 214', x: 195},
	{icono: Users, nombre: 'Registrar', sub: 'CRM', dato: 'cliente ok', x: 425},
	{icono: Bell, nombre: 'Avisar', sub: 'Slack', dato: '#ventas', x: 655},
	{icono: MessageCircle, nombre: 'Confirmar', sub: 'WhatsApp', dato: 'enviado', x: 885},
];

// ─── Medidas (en coordenadas del "mundo" del flujo) ───
const CX = 540;
const ANCHO = 760;
const ALTO = 150;
const RAMA_ANCHO = 200;
const RAMA_ALTO = 210;

// ─── Tiempos (en fotogramas, calculados desde los golpes de la música) ───
// Un nodo por compás (4 golpes); las cuatro salidas, una por medio golpe.
export const LLEGA = [6, 10, 14, 18].map(D); // el paquete activa cada nodo principal
const APARECE = LLEGA.map((f) => f - 28);
const SALE = (i: number) => LLEGA[i] + 12; // pausa en cada nodo
const RAMA_APARECE = D(17.2);
export const RAMA_LLEGA = [22, 22.5, 23, 23.5].map(D);
const ALEJA = [D(24), D(28)]; // la cámara se aleja y muestra todo el flujo
const HUNDE = g(ESCENA.resultado); // el flujo pasa al fondo

// Posición del paquete en el tramo principal (centro a centro, por debajo de las tarjetas).
const paqueteY = (f: number) => {
	if (f <= SALE(0)) return PRINCIPALES[0].y;
	for (let i = 0; i < 3; i++) {
		if (f <= LLEGA[i + 1]) {
			return interpolate(f, [SALE(i), LLEGA[i + 1]], [PRINCIPALES[i].y, PRINCIPALES[i + 1].y], {
				easing: suave,
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
			});
		}
		if (f <= SALE(i + 1)) return PRINCIPALES[i + 1].y;
	}
	return PRINCIPALES[3].y;
};

const cable = (x: number) => {
	const p0 = {x: CX, y: PRINCIPALES[3].y};
	const p3 = {x, y: RAMA_Y};
	return [p0, {x: CX, y: 890}, {x, y: 850}, p3] as [Punto, Punto, Punto, Punto];
};

const avanceRama = (f: number, i: number) =>
	interpolate(f, [SALE(3), RAMA_LLEGA[i]], [0, 1], {
		easing: suave,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

// ─── Cámara: sigue al paquete, baja a la bifurcación y se aleja al final ───
const camara = (f: number) => {
	const seguir = paqueteY(f - 4);
	const haciaRama = interpolate(f, [SALE(3), RAMA_LLEGA[3] + 4], [0, 1], {
		easing: suave,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const alejar = interpolate(f, ALEJA, [0, 1], {
		easing: suave,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const y1 = seguir + (900 - seguir) * haciaRama;
	const z1 = 1.22 + (0.9 - 1.22) * haciaRama;
	return {
		y: y1 + (560 - y1) * alejar,
		zoom: z1 + (0.74 - z1) * alejar,
		// punto de la pantalla donde se centra la cámara (baja un poco en la vista completa)
		centro: 1010 + 70 * alejar,
		inclinacion: interpolate(f, [D(0.5), D(16.5), ALEJA[0], ALEJA[1]], [16, 9, 9, 0], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}),
	};
};

// ─── Piezas ───
const Cuadro: React.FC<{x: number; y: number; lado: number; opacidad?: number}> = ({x, y, lado, opacidad = 1}) => (
	<div
		style={{
			position: 'absolute',
			left: x - lado / 2,
			top: y - lado / 2,
			width: lado,
			height: lado,
			background: COLOR.lima,
			opacity: opacidad,
			boxShadow: `0 0 ${lado}px rgba(198,244,50,${0.6 * opacidad})`,
		}}
	/>
);

// Paquete lima con estela de movimiento (copias en instantes anteriores).
const Paquete: React.FC<{pos: (f: number) => Punto; f: number}> = ({pos, f}) => (
	<>
		{Array.from({length: 9}, (_, k) => 9 - k).map((k) => {
			const p = pos(f - k * 0.45);
			return <Cuadro key={k} x={p.x} y={p.y} lado={30 - k * 1.8} opacidad={(1 - k / 10) * 0.32} />;
		})}
		<Cuadro {...pos(f)} lado={32} />
	</>
);

const useActivacion = (f: number, inicio: number) => {
	const {fps} = useVideoConfig();
	return spring({frame: f - inicio, fps, config: {damping: 12, stiffness: 170}});
};

const Onda: React.FC<{f: number; inicio: number; ancho: number; alto: number}> = ({f, inicio, ancho, alto}) => {
	const t = interpolate(f - inicio, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	if (t <= 0 || t >= 1) return null;
	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				border: `2px solid ${COLOR.lima}`,
				borderRadius: 22,
				transform: `scale(${1 + t * 0.22}, ${1 + (t * 0.22 * ancho) / alto})`,
				opacity: (1 - t) * 0.7,
			}}
		/>
	);
};

const Insignia: React.FC<{a: number; derecha: number; arriba: number}> = ({a, derecha, arriba}) => (
	<div
		style={{
			position: 'absolute',
			right: derecha,
			top: arriba,
			width: 42,
			height: 42,
			background: COLOR.lima,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			transform: `scale(${a})`,
		}}
	>
		<Check size={28} strokeWidth={3} color={COLOR.grafito} />
	</div>
);

const Tarjeta: React.FC<{
	f: number;
	aparece: number;
	activa: number;
	ancho: number;
	alto: number;
	x: number;
	y: number;
	pulso: number;
	children: (a: number) => React.ReactNode;
}> = ({f, aparece, activa, ancho, alto, x, y, pulso, children}) => {
	const {fps} = useVideoConfig();
	const e = spring({frame: f - aparece, fps, config: {damping: 16, stiffness: 120}});
	const a = useActivacion(f, activa);
	const borde = Math.min(1, a) * pulso;
	return (
		<div
			style={{
				position: 'absolute',
				left: x - ancho / 2,
				top: y - alto / 2,
				width: ancho,
				height: alto,
				opacity: e,
				transform: `translateY(${(1 - e) * 60}px) scale(${0.9 + 0.1 * e})`,
				filter: `blur(${(1 - Math.min(1, e)) * 12}px)`,
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: COLOR.superficie,
					border: `2px solid ${COLOR.linea}`,
					borderRadius: 22,
					boxShadow: `0 30px 60px rgba(0,0,0,.45), 0 0 ${70 * borde}px rgba(198,244,50,${0.22 * borde})`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					border: `2px solid ${COLOR.lima}`,
					borderRadius: 22,
					opacity: borde,
				}}
			/>
			<Onda f={f} inicio={activa} ancho={ancho} alto={alto} />
			{children(a)}
		</div>
	);
};

const Icono: React.FC<{icono: LucideIcon; a: number; lado: number; tam: number}> = ({icono: I, a, lado, tam}) => (
	<div
		style={{
			position: 'relative',
			width: lado,
			height: lado,
			flexShrink: 0,
			border: `2px solid ${a > 0.5 ? COLOR.lima : COLOR.linea}`,
			borderRadius: 16,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: `rgba(198,244,50,${0.08 * Math.min(1, a)})`,
		}}
	>
		<I size={tam} strokeWidth={1.8} color={COLOR.gris} style={{position: 'absolute', opacity: 1 - Math.min(1, a)}} />
		<I size={tam} strokeWidth={1.8} color={COLOR.lima} style={{position: 'absolute', opacity: Math.min(1, a)}} />
	</div>
);

export const Flujo: React.FC<{f: number}> = ({f}) => {
	const {fps} = useVideoConfig();
	if (f < D(-0.2) || f > g(ESCENA.lema + 0.5)) return null;
	const cam = camara(f);

	// Pulso final cuando el flujo completo está encendido.
	const pulso = interpolate(f, [ALEJA[1] - 6, ALEJA[1] + 4, ALEJA[1] + 14], [1, 0.45, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Paso al resultado: el flujo se hunde al fondo.
	const fondoFlujo = interpolate(f, [HUNDE, HUNDE + 24], [0, 1], {
		easing: suave,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const nacePaquete = spring({frame: f - (LLEGA[0] - 6), fps, config: {damping: 14}});

	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			{/* Rejilla de puntos con paralaje (se mueve más lento que el flujo: da profundidad) */}
			<AbsoluteFill
				style={{
					backgroundImage: `radial-gradient(rgba(244,244,242,.10) 1.6px, transparent 1.6px)`,
					backgroundSize: '48px 48px',
					backgroundPosition: `0px ${-cam.y * 0.35}px`,
					maskImage: 'radial-gradient(ellipse 70% 55% at 50% 52%, #000 20%, transparent 80%)',
					WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 52%, #000 20%, transparent 80%)',
					opacity: (1 - fondoFlujo) * 0.6,
				}}
			/>

			{/* Mundo del flujo: cámara con zoom e inclinación 3D */}
			<AbsoluteFill
				style={{
					perspective: 1700,
					perspectiveOrigin: '50% 45%',
					opacity: (1 - fondoFlujo * 0.85) * interpolate(f, [D(-0.2), D(0)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
					// el flujo se desvanece bajo el encabezado en vez de taparlo
					maskImage: 'linear-gradient(transparent 0px, transparent 470px, #000 610px)',
					WebkitMaskImage: 'linear-gradient(transparent 0px, transparent 470px, #000 610px)',
					filter: `blur(${fondoFlujo * 7}px)`,
					transform: `scale(${1 - fondoFlujo * 0.08})`,
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: 1080,
						height: 1,
						transformOrigin: `${CX}px ${cam.y}px`,
						transform: `translateY(${cam.centro - cam.y}px) rotateX(${cam.inclinacion}deg) scale(${cam.zoom})`,
					}}
				>
					{/* Luz ambiental que acompaña al paquete */}
					<div
						style={{
							position: 'absolute',
							left: CX - 520,
							top: (f < SALE(3) ? paqueteY(f) : 860) - 520,
							width: 1040,
							height: 1040,
							background: 'radial-gradient(circle, rgba(198,244,50,.13) 0%, rgba(198,244,50,0) 62%)',
						}}
					/>

					{/* Cables principales: base gris punteada + tramo recorrido en lima */}
					{[0, 1, 2].map((i) => {
						const desde = PRINCIPALES[i].y + ALTO / 2;
						const hasta = PRINCIPALES[i + 1].y - ALTO / 2;
						const largo = hasta - desde;
						const dibujo = interpolate(f, [APARECE[i + 1], APARECE[i + 1] + 14], [0, 1], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						});
						const encendido = Math.max(0, Math.min(largo, paqueteY(f) - desde));
						return (
							<React.Fragment key={i}>
								<div
									style={{
										position: 'absolute',
										left: CX - 1.5,
										top: desde,
										width: 3,
										height: largo * dibujo,
										backgroundImage: `linear-gradient(${COLOR.linea} 60%, transparent 60%)`,
										backgroundSize: '3px 14px',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: CX - 2,
										top: desde,
										width: 4,
										height: encendido,
										background: COLOR.lima,
										boxShadow: `0 0 16px rgba(198,244,50,.7)`,
									}}
								/>
							</React.Fragment>
						);
					})}

					{/* Cables de la bifurcación */}
					<svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1080} height={1}>
						{RAMAS.map((r, i) => {
							const [p0, p1, p2, p3] = cable(r.x);
							const d = `M${p0.x},${p0.y} C${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
							const dibujo = interpolate(f, [RAMA_APARECE, RAMA_APARECE + 16], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							});
							return (
								<React.Fragment key={i}>
									<path
										d={d}
										fill="none"
										stroke={COLOR.linea}
										strokeWidth={3}
										pathLength={1}
										strokeDasharray={`${dibujo} 1`}
									/>
									<path
										d={d}
										fill="none"
										stroke={COLOR.lima}
										strokeWidth={4}
										pathLength={1}
										strokeDasharray={`${avanceRama(f, i)} 1`}
										style={{filter: 'drop-shadow(0 0 8px rgba(198,244,50,.7))'}}
									/>
								</React.Fragment>
							);
						})}
					</svg>

					{/* Paquete (viaja por debajo de las tarjetas) */}
					{f >= LLEGA[0] - 6 && f < SALE(3) + 1 && (
						<div style={{transform: `scale(${nacePaquete})`, transformOrigin: `${CX}px 0px`}}>
							<Paquete f={f} pos={(t) => ({x: CX, y: paqueteY(t)})} />
						</div>
					)}
					{f >= SALE(3) &&
						f < RAMA_LLEGA[3] + 2 &&
						RAMAS.map((r, i) =>
							avanceRama(f, i) < 1 ? (
								<Paquete key={i} f={f} pos={(t) => bezier(...cable(r.x), avanceRama(t, i))} />
							) : null,
						)}

					{/* Nodos principales */}
					{PRINCIPALES.map((n, i) => (
						<Tarjeta
							key={n.nombre}
							f={f}
							aparece={APARECE[i]}
							activa={LLEGA[i]}
							ancho={ANCHO}
							alto={ALTO}
							x={CX}
							y={n.y}
							pulso={pulso}
						>
							{(a) => (
								<>
									<div
										style={{
											position: 'absolute',
											inset: 0,
											padding: '0 36px',
											display: 'flex',
											alignItems: 'center',
											gap: 28,
										}}
									>
										<Icono icono={n.icono} a={a} lado={86} tam={42} />
										<div>
											<div style={{fontFamily: FUENTE.titulo, fontWeight: 500, fontSize: 42, color: COLOR.hueso, lineHeight: 1.1, whiteSpace: 'nowrap'}}>
												{n.nombre}
											</div>
											<div style={{fontFamily: FUENTE.mono, fontSize: 22, color: COLOR.gris, marginTop: 8}}>
												{n.sub}
											</div>
										</div>
										<div
											style={{
												marginLeft: 'auto',
												fontFamily: FUENTE.mono,
												fontSize: 22,
												color: COLOR.lima,
												textAlign: 'right',
												maxWidth: 200,
												lineHeight: 1.35,
											}}
										>
											{decodificar(n.dato, f, LLEGA[i] + 3)}
										</div>
									</div>
									<Insignia a={a} derecha={-14} arriba={-14} />
								</>
							)}
						</Tarjeta>
					))}

					{/* Nodos de la bifurcación */}
					{RAMAS.map((r, i) => (
						<Tarjeta
							key={r.nombre}
							f={f}
							aparece={RAMA_APARECE + i * 3}
							activa={RAMA_LLEGA[i]}
							ancho={RAMA_ANCHO}
							alto={RAMA_ALTO}
							x={r.x}
							y={RAMA_Y}
							pulso={pulso}
						>
							{(a) => (
								<>
									<div
										style={{
											position: 'absolute',
											inset: 0,
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											gap: 10,
										}}
									>
										<Icono icono={r.icono} a={a} lado={70} tam={34} />
										<div style={{fontFamily: FUENTE.titulo, fontWeight: 500, fontSize: 30, color: COLOR.hueso, marginTop: 4}}>
											{r.nombre}
										</div>
										<div style={{fontFamily: FUENTE.mono, fontSize: 18, color: COLOR.gris}}>{r.sub}</div>
										<div style={{fontFamily: FUENTE.mono, fontSize: 19, color: COLOR.lima, height: 24}}>
											{decodificar(r.dato, f, RAMA_LLEGA[i] + 2, 1.2, 4)}
										</div>
									</div>
									<Insignia a={a} derecha={-12} arriba={-12} />
								</>
							)}
						</Tarjeta>
					))}

					{/* Estado final del flujo */}
					<div
						style={{
							position: 'absolute',
							left: 0,
							width: 1080,
							top: RAMA_Y + RAMA_ALTO / 2 + 50,
							textAlign: 'center',
							fontFamily: FUENTE.mono,
							fontSize: 28,
							color: COLOR.gris,
						}}
					>
						{f >= ALEJA[1] - 10 && <span style={{color: COLOR.lima}}>■ </span>}
						{decodificar('[ok] flujo_ejecutado · 8 nodos', f, ALEJA[1] - 8, 1.6, 6)}
					</div>
				</div>
			</AbsoluteFill>


			<Encabezado f={f} />
		</AbsoluteFill>
	);
};

const Encabezado: React.FC<{f: number}> = ({f}) => {
	const {fps} = useVideoConfig();
	const sube = spring({frame: f - D(2.2), fps, config: {damping: 20, stiffness: 90}});
	const sale = interpolate(f, [HUNDE - 4, HUNDE + 10], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{
				position: 'absolute',
				left: 120,
				right: 120,
				top: interpolate(sube, [0, 1], [820, 290]),
				transform: `scale(${interpolate(sube, [0, 1], [1, 0.6])})`,
				transformOrigin: '0% 0%',
				opacity: sale,
			}}
		>
			<div style={{fontFamily: FUENTE.titulo, fontWeight: 700, fontSize: 96, color: COLOR.hueso, lineHeight: 1.05, letterSpacing: -1.5}}>
				<Palabras texto="Con un flujo automático en n8n" f={f} desde={ESCENA.flujo} paso={0.25} acento={['n8n']} />
			</div>
			<div
				style={{
					fontFamily: FUENTE.mono,
					fontSize: 36,
					color: COLOR.gris,
					marginTop: 22,
					opacity: interpolate(f, [D(2.6), D(3.6)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
				}}
			>
				{decodificar('// proceso de ejemplo', f, D(2.6), 1.8, 5)}
			</div>
		</div>
	);
};
