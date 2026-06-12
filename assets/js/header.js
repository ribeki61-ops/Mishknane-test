/* ============================================================
   header.js — Header sticky, nav active au scroll, menu burger
   ============================================================ */

export function initHeader() {
  const header    = document.querySelector('#site-header');
  const navToggle = document.querySelector('#nav-toggle');
  const primaryNav = document.querySelector('#primary-nav');

  if (!header) return;

  /* --- Sticky au scroll --- */
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Menu burger --- */
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.classList.toggle('nav-open', isOpen);
    });

    // Fermer sur clic d'un lien
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Ouvrir le menu');
        document.body.classList.remove('nav-open');
      });
    });

    // Fermer avec Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        navToggle.focus();
      }
    });
  }

  /* --- Lien actif selon section visible --- */
  const sections  = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks  = Array.from(document.querySelectorAll('#primary-nav a[href^="#"]'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => io.observe(s));
  }
}
