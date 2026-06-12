/* ============================================================
   scrollprogress.js — Barre de progression au scroll (header)
   ============================================================ */

export function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-valuenow', '0');
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', '100');
  bar.setAttribute('aria-label', 'Progression de lecture');
  document.querySelector('#site-header')?.appendChild(bar);

  const update = () => {
    const scrollTop   = window.scrollY;
    const docH        = document.documentElement.scrollHeight - window.innerHeight;
    const pct         = docH > 0 ? Math.round((scrollTop / docH) * 100) : 0;
    bar.style.width   = pct + '%';
    bar.setAttribute('aria-valuenow', pct);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}
