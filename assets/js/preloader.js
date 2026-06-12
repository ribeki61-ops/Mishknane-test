/* ============================================================
   preloader.js — Orchestration de l'écran d'accueil de marque
   Affiche un temps minimum pour la "respiration" de marque,
   attend le chargement de la page, puis lève le rideau et
   libère les animations du hero.
   ============================================================ */

export function initPreloader() {
  const pre  = document.getElementById('preloader');
  const root = document.documentElement;
  if (!pre) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Verrouille le scroll + masque le hero pendant l'intro
  root.classList.add('intro-active');

  const release = () => {
    pre.classList.add('is-hidden');
    // On libère le hero une fois le rideau parti : double rAF pour que
    // le navigateur recalcule les styles et déclenche les transitions.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove('intro-active'));
    });
    // Nettoyage du DOM après la transition de sortie
    window.setTimeout(() => pre.remove(), 900);
  };

  // Réduction de mouvement : on retire l'intro quasi instantanément
  if (reduce) {
    window.setTimeout(release, 300);
    return;
  }

  const MIN_TIME = 1500; // durée minimale d'affichage (ms) — "moment de marque"
  const start = performance.now();

  const onReady = () => {
    const elapsed = performance.now() - start;
    window.setTimeout(release, Math.max(0, MIN_TIME - elapsed));
  };

  if (document.readyState === 'complete') {
    onReady();
  } else {
    window.addEventListener('load', onReady, { once: true });
  }

  // Filet de sécurité : ne jamais bloquer l'utilisateur au-delà de 4 s
  window.setTimeout(release, 4000);
}
