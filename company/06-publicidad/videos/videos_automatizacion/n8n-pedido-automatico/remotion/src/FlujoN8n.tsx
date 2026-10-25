// Escena de prueba: "El flujo" del video n8n · El pedido que se registra solo.
// Mismo contenido que la v3, con cámara, profundidad y efectos nuevos.
import React from 'react';
import {
	AbsoluteFill,
	Audio,
	Easing,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {
	Bell,
	Check,
	Clock,
	Database,
	Mail,
	MessageCircle,
	Sparkles,
	Split,
	Table,
	Users,
	type LucideIcon,
} from 'lucide-react';
import {COLOR, FUENTE} from './marca';
import {barajar, bezier, decodificar, type Punto} from './efectos';

import musica from '../../recursos/musica/tech-explainer-background-loop.mp3';
import sonidoPop from '../../recursos/efectos/pop.mp3';
import sonidoClic from '../../recursos/efectos/clic.mp3';
import sonidoGolpe from '../../recursos/efectos/golpe-grave.mp3';

export const DURACION = 14 * 30; // 14 s a 30 fps

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

// ─── Tiempos (en fotogramas) ───
const LLEGA = [80, 115, 150, 185]; // el paquete activa cada nodo principal
const APARECE = LLEGA.map((f) => f - 28);
const SALE = (i: number) => LLEGA[i] + 12; // pausa de 12 fotogramas en cada nodo
const RAMA_APARECE = 178;
const RAMA_LLEGA = RAMAS.map((_, i) => 222 + i * 3);
const ALEJA = [242, 288]; // la cámara se aleja y muestra todo el flujo
const RESULTADO = 300;
const FIJA_3S = 362;

const suave = Easing.bezier(0.65, 0, 0.35, 1);

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
		inclinacion: interpolate(f, [40, 200, ALEJA[0], ALEJA[1]], [16, 9, 9, 0], {
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

// ─── Escena ───
export const FlujoN8n: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const cam = camara(f);

	// Pulso final cuando el flujo completo está encendido.
	const pulso = interpolate(f, [ALEJA[1] - 6, ALEJA[1] + 4, ALEJA[1] + 14], [1, 0.45, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Paso al resultado: el flujo se hunde al fondo.
	const fondoFlujo = interpolate(f, [RESULTADO, RESULTADO + 24], [0, 1], {
		easing: suave,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const nacePaquete = spring({frame: f - (LLEGA[0] - 6), fps, config: {damping: 14}});

	return (
		<AbsoluteFill style={{background: COLOR.grafito, overflow: 'hidden'}}>
			{/* Rejilla de puntos con paralaje (se mueve más lento que el flujo: da profundidad) */}
			<AbsoluteFill
				style={{
					backgroundImage: `radial-gradient(rgba(244,244,242,.10) 1.6px, transparent 1.6px)`,
					backgroundSize: '48px 48px',
					backgroundPosition: `0px ${-cam.y * 0.35}px`,
					maskImage: 'radial-gradient(ellipse 70% 55% at 50% 52%, #000 20%, transparent 80%)',
					WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 52%, #000 20%, transparent 80%)',
					opacity: 1 - fondoFlujo * 0.6,
				}}
			/>

			{/* Mundo del flujo: cámara con zoom e inclinación 3D */}
			<AbsoluteFill
				style={{
					perspective: 1700,
					perspectiveOrigin: '50% 45%',
					opacity: 1 - fondoFlujo * 0.82,
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
			<Resultado f={f} />

			{/* Viñeta y grano: acabado cinematográfico */}
			<AbsoluteFill
				style={{background: 'radial-gradient(ellipse 80% 65% at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)'}}
			/>
			<AbsoluteFill style={{opacity: 0.07, mixBlendMode: 'overlay'}}>
				<svg width="1080" height="1920">
					<filter id="grano">
						<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={Math.floor(f / 2)} />
					</filter>
					<rect width="100%" height="100%" filter="url(#grano)" />
				</svg>
			</AbsoluteFill>

			{/* Fundido final */}
			<AbsoluteFill
				style={{
					background: COLOR.grafito,
					opacity: interpolate(f, [DURACION - 14, DURACION], [0, 1], {extrapolateLeft: 'clamp'}),
				}}
			/>

			<Sonido />
		</AbsoluteFill>
	);
};

// Título: palabra por palabra con desenfoque, y luego sube a encabezado.
const Palabras: React.FC<{texto: string; f: number; inicio: number; acento?: string[]; paso?: number}> = ({
	texto,
	f,
	inicio,
	acento = [],
	paso = 4,
}) => {
	const {fps} = useVideoConfig();
	return (
		<>
			{texto.split(' ').map((p, i) => {
				const e = spring({frame: f - inicio - i * paso, fps, config: {damping: 18, stiffness: 140}});
				return (
					<span
						key={i}
						style={{
							display: 'inline-block',
							marginRight: '0.26em',
							opacity: Math.min(1, e),
							filter: `blur(${(1 - Math.min(1, e)) * 14}px)`,
							transform: `translateY(${(1 - e) * 30}px)`,
							color: acento.includes(p) ? COLOR.lima : undefined,
						}}
					>
						{p}
					</span>
				);
			})}
		</>
	);
};

const Encabezado: React.FC<{f: number}> = ({f}) => {
	const {fps} = useVideoConfig();
	const sube = spring({frame: f - 34, fps, config: {damping: 20, stiffness: 90}});
	const sale = interpolate(f, [RESULTADO - 4, RESULTADO + 10], [1, 0], {
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
				<Palabras texto="Con un flujo automático en n8n" f={f} inicio={2} acento={['n8n']} />
			</div>
			<div
				style={{
					fontFamily: FUENTE.mono,
					fontSize: 36,
					color: COLOR.gris,
					marginTop: 22,
					opacity: interpolate(f, [52, 64], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
				}}
			>
				{decodificar('// proceso de ejemplo', f, 52, 1.8, 5)}
			</div>
		</div>
	);
};

// Remate: "Ahora se hace solo." y el contador 15 min → 3 s.
const Resultado: React.FC<{f: number}> = ({f}) => {
	const {fps} = useVideoConfig();
	if (f < RESULTADO) return null;
	const tachado = interpolate(f, [338, 350], [0, 1], {easing: suave, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const minutos = spring({frame: f - 326, fps, config: {damping: 18}});
	const tres = spring({frame: f - 348, fps, config: {damping: 9, stiffness: 160}});
	const golpe = spring({frame: f - FIJA_3S, fps, config: {damping: 8, stiffness: 220}});
	const escala = f < FIJA_3S ? tres : 1 + 0.18 * (1 - golpe);
	return (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 80}}>
			<div style={{fontFamily: FUENTE.titulo, fontWeight: 700, fontSize: 104, color: COLOR.hueso, letterSpacing: -2}}>
				<Palabras texto="Ahora se hace solo." f={f} inicio={RESULTADO + 8} acento={['solo.']} paso={5} />
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
					<Clock size={54} color={COLOR.gris} strokeWidth={1.8} />
					<span style={{fontFamily: FUENTE.mono, fontSize: 64, color: COLOR.gris}}>15 min</span>
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
						fontSize: 250,
						color: COLOR.lima,
						lineHeight: 1,
						letterSpacing: -6,
						opacity: Math.min(1, tres),
						transform: `scale(${escala})`,
						textShadow: `0 0 ${f >= FIJA_3S ? 60 * (1.4 - golpe * 0.6) : 30}px rgba(198,244,50,.45)`,
					}}
				>
					{barajar('3', f, FIJA_3S)}
					<span style={{fontSize: 150, marginLeft: 16}}>s</span>
				</div>
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: 300,
					fontFamily: FUENTE.mono,
					fontSize: 26,
					color: COLOR.acero,
					opacity: interpolate(f, [372, 386], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
				}}
			>
				proceso de ejemplo · tiempos ilustrativos
			</div>
		</AbsoluteFill>
	);
};

// Audio sincronizado al fotograma. Los efectos traen silencio al inicio:
// pop ≈ 0,16 s (5 fotogramas) y clic ≈ 0,14 s (4 fotogramas), por eso se recortan.
const Sonido: React.FC = () => (
	<>
		<Audio
			src={musica}
			volume={(f) =>
				interpolate(f, [0, 60, DURACION - 30, DURACION], [0.3, 0.5, 0.5, 0], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				})
			}
		/>
		{LLEGA.map((f) => (
			<Sequence key={`pop-${f}`} from={f} durationInFrames={30}>
				<Audio src={sonidoPop} trimBefore={5} volume={0.55} />
			</Sequence>
		))}
		{RAMA_LLEGA.map((f) => (
			<Sequence key={`clic-${f}`} from={f} durationInFrames={20}>
				<Audio src={sonidoClic} trimBefore={4} volume={0.55} />
			</Sequence>
		))}
		<Sequence from={FIJA_3S} durationInFrames={60}>
			<Audio src={sonidoGolpe} volume={0.6} />
		</Sequence>
	</>
);
