/* ============================================================
   main.js — Point d'entrée JS (ES module)
   ============================================================ */

import { initHeader }      from './header.js';
import { initPreloader }   from './preloader.js';
import { initReveal }      from './reveal.js';
import { initParallax, initCounters, initSmoothScroll } from './hero.js';
import { initRoom3D }      from './room3d.js';
import { initLightbox }    from './lightbox.js';
import { initContactForm } from './contact.js';
import { initCookieBanner, initFloatPhone, initBackToTop } from './floats.js';
import { initDetailsAnimation } from './faqanim.js';
import { initScrollProgress }   from './scrollprogress.js';

/* Année courante dans le footer */
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHeader();
  initReveal();
  initParallax();
  initCounters();
  initSmoothScroll();
  initRoom3D();
  initLightbox();
  initContactForm();
  initCookieBanner();
  initFloatPhone();
  initBackToTop();
  initDetailsAnimation();
  initScrollProgress();
});
