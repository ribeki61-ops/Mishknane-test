/* ============================================================
   reveal.js — Animations de révélation au scroll (IntersectionObserver)
   ============================================================ */

export function initReveal() {
  const elements = Array.from(document.querySelectorAll('.reveal'));
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback : tout révéler immédiatement
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => io.observe(el));
}
