/* ============================================================
   hero.js — Parallaxe image, compteurs animés, smooth scroll ancres
   ============================================================ */

/* --- Parallaxe douce sur l'image hero --- */
export function initParallax() {
  const heroImg = document.querySelector('#hero-img');
  const hero    = document.querySelector('.hero');
  if (!heroImg || !hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  const update = () => {
    const scrolled = window.scrollY;
    if (scrolled < hero.offsetHeight) {
      heroImg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.05)`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

/* --- Compteurs animés (data-count) --- */
export function initCounters() {
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  if (!counters.length) return;

  const animate = (el) => {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start    = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => io.observe(el));
  } else {
    counters.forEach(el => { el.textContent = el.dataset.count; });
  }
}

/* --- Smooth scroll pour les ancres internes (fallback navigateurs) --- */
export function initSmoothScroll() {
  const header = document.querySelector('#site-header');

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = (header?.offsetHeight ?? 76) + 1;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });
}
