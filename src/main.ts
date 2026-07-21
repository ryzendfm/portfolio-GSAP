import './style.css';
import App from './App.vue';
import { createApp } from 'vue';
import Lenis from 'lenis';
import router from './router';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// smooth scroll
const lenis = new Lenis({
  duration: 0.8,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

function raf(_time?: number) {
  // Driven by gsap.ticker.add
}

const app = createApp(App);
app.use(router);
app.mount('#app');

export { raf, lenis };
