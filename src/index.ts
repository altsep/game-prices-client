import App from './App.svelte';

import './index.css';

const app = new App({
  target: document.body,
  props: {
    greeting: '&#x1F44B;',
  },
});

export default app;
