// Video completo: n8n · El pedido que se registra solo (v4, hecho en Remotion).
// Las escenas y los sonidos se programan sobre los golpes de la música (ver ritmo.ts).
import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {COLOR} from './marca';
import {DURACION, ESCENA, g, MUSICA_DESDE} from './ritmo';
import {Acabado, Particulas} from './comun';
import {Destello, Familiar, FormaMejor} from './escenas/Ganchos';
import {Caos, PEGADOS} from './escenas/Caos';
import {Flujo, LLEGA, RAMA_LLEGA} from './escenas/Flujo';
import {CAJA_IMPORTANTE, FIJA_3S, Lema, opacidadParticulas, Resultado} from './escenas/Resultado';
import {Cierre, SALTO_B, TECLAS} from './escenas/Cierre';

import musica from '../../../../../audio/alexgrohl-future-bass-hot-night-111447.mp3';
import sonidoPop from '../../recursos/efectos/pop.mp3';
import sonidoClic from '../../recursos/efectos/clic.mp3';
import sonidoGolpe from '../../recursos/efectos/golpe-grave.mp3';
import sonidoTecla from '../../recursos/efectos/tecla.mp3';
import sonidoTicTac from '../../recursos/efectos/tic-tac.mp3';

export {DURACION};

export const PedidoAutomatico: React.FC = () => {
	const f = useCurrentFrame();
	return (
		<AbsoluteFill style={{background: COLOR.grafito, overflow: 'hidden'}}>
			<Particulas f={f} opacidad={opacidadParticulas(f)} desplazamiento={Math.max(0, f - g(ESCENA.flujo)) * 0.4} />
			<Familiar f={f} />
			<Caos f={f} />
			<FormaMejor f={f} />
			<Flujo f={f} />
			<Resultado f={f} />
			<Lema f={f} />
			<Cierre f={f} />
			<Destello f={f} k={ESCENA.flujo} />
			<Acabado f={f} />
			<Sonido />
		</AbsoluteFill>
	);
};

// Un efecto de sonido en un fotograma. `recorte` quita el silencio que trae al inicio el archivo.
const Efecto: React.FC<{src: string; en: number; volumen: number; recorte?: number; dura?: number}> = ({
	src,
	en,
	volumen,
	recorte = 0,
	dura = 45,
}) => (
	<Sequence from={Math.round(en)} durationInFrames={dura}>
		<Audio src={src} trimBefore={recorte} volume={volumen} />
	</Sequence>
);

const Sonido: React.FC = () => (
	<>
		{/* Música: Future Bass Hot Night (alexgrohl, Pixabay) desde el segundo 66,17. Viene muy fuerte: 60 % evita saturar. */}
		<Audio
			src={musica}
			trimBefore={MUSICA_DESDE}
			volume={(f) =>
				interpolate(f, [0, 4, g(ESCENA.fin - 4), DURACION], [0, 0.6, 0.6, 0], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				})
			}
		/>

		{/* El caos: reloj que corre y un clic por cada fila pegada a mano */}
		<Sequence from={Math.round(g(ESCENA.caos + 1))} durationInFrames={Math.round(g(ESCENA.formaMejor + 2) - g(ESCENA.caos + 1))}>
			<Audio
				src={sonidoTicTac}
				trimBefore={4}
				loop
				volume={(f) => interpolate(f, [0, 20, 160, 210], [0, 0.18, 0.3, 0], {extrapolateRight: 'clamp'})}
			/>
		</Sequence>
		{PEGADOS.map((en, i) => (
			<Efecto key={`pega-${i}`} src={sonidoClic} en={en} volumen={0.3} recorte={4} dura={20} />
		))}

		{/* "> automatízalo_": teclas suaves */}
		{[28, 28.5, 29, 29.5].map((k) => (
			<Efecto key={`auto-${k}`} src={sonidoTecla} en={g(k)} volumen={0.25} recorte={1} dura={15} />
		))}

		{/* Drop: golpe grave que refuerza la entrada del flujo */}
		<Efecto src={sonidoGolpe} en={g(ESCENA.flujo)} volumen={0.3} dura={55} />

		{/* El flujo: pop en cada nodo, clic en cada salida */}
		{LLEGA.map((en) => (
			<Efecto key={`pop-${en}`} src={sonidoPop} en={en} volumen={0.5} recorte={5} dura={30} />
		))}
		{RAMA_LLEGA.map((en) => (
			<Efecto key={`rama-${en}`} src={sonidoClic} en={en} volumen={0.5} recorte={4} dura={20} />
		))}

		{/* Resultado y lema */}
		<Efecto src={sonidoGolpe} en={FIJA_3S} volumen={0.45} dura={55} />
		<Efecto src={sonidoPop} en={g(CAJA_IMPORTANTE)} volumen={0.4} recorte={5} dura={30} />

		{/* Cierre: una tecla por letra y un clic cuando el punto cae sobre la "i" */}
		{TECLAS.map((k) => (
			<Efecto key={`tecla-${k}`} src={sonidoTecla} en={g(k)} volumen={0.6} recorte={1} dura={20} />
		))}
		<Efecto src={sonidoClic} en={g(SALTO_B)} volumen={0.6} recorte={4} dura={20} />
	</>
);
