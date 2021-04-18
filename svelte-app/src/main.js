import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		siteName: 'SIDE BY SIDE',
		baseLine: 'Deux opinions en une minute'
	}
});

export default app;