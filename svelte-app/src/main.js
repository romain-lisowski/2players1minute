import App from './App.svelte'

const app = new App({
  target: document.body,
  hydrate: true,
  props: {
    siteName: '2SIDES 1MINUTE',
    baseLine: 'Deux avis en une minute'
  }
})

export default app