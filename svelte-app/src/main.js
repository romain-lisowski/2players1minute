import App from './App.svelte';

const app = new App({
	target: document.body,
	hydrate: true,
	props: {
		siteName: 'SIDE BY SIDE',
		baseLine: 'Deux avis en une minute'
	}
});

export default app;