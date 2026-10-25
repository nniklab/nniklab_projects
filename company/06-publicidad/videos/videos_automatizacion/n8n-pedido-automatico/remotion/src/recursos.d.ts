// Permite importar fuentes y audios como archivos (Remotion los empaqueta).
declare module '*.woff2' {
	const url: string;
	export default url;
}
declare module '*.mp3' {
	const url: string;
	export default url;
}
declare module '*.jpg' {
	const url: string;
	export default url;
}
