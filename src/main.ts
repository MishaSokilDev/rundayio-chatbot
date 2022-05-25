import App from './App.svelte'

declare global {
  interface Window { RUNDAY_IO_USER_ID: string; }
}

const app = new App({
  target: document.body
})

export default app
