import React from 'react';
import {Composition} from 'remotion';
import {DURACION, FlujoN8n} from './FlujoN8n';
import {cargarFuentes} from './marca';

cargarFuentes();

export const RemotionRoot: React.FC = () => (
	<Composition
		id="FlujoN8n"
		component={FlujoN8n}
		durationInFrames={DURACION}
		fps={30}
		width={1080}
		height={1920}
	/>
);
