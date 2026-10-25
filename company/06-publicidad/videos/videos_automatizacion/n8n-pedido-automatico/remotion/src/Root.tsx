import React from 'react';
import {Composition} from 'remotion';
import {DURACION, PedidoAutomatico} from './PedidoAutomatico';
import {FPS} from './ritmo';
import {cargarFuentes} from './marca';

cargarFuentes();

export const RemotionRoot: React.FC = () => (
	<Composition
		id="PedidoAutomatico"
		component={PedidoAutomatico}
		durationInFrames={DURACION}
		fps={FPS}
		width={1080}
		height={1920}
	/>
);
