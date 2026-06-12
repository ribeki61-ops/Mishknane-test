/* ============================================================
   floats.js — Cookie RGPD, bouton téléphone flottant, back-to-top
   ============================================================ */

const COOKIE_KEY = 'mishkane_cookie_consent';

/* ---------- Cookie banner RGPD ---------- */
export function initCookieBanner() {
  if (localStorage.getItem(COOKIE_KEY)) return; // déjà répondu

  const banner = document.querySelector('#cookie-banner');
  if (!banner) return;

  // Délai court pour ne pas bloquer le rendu initial
  setTimeout(() => banner.classList.add('is-visible'), 1200);

  const accept = banner.querySelector('#cookie-accept');
  const refuse = banner.querySelector('#cookie-refuse');

  const dismiss = (value) => {
    localStorage.setItem(COOKIE_KEY, value);
    banner.classList.remove('is-visible');
    // Transition sortie puis suppression du DOM
    setTimeout(() => banner.remove(), 600);
  };

  accept?.addEventListener('click', () => dismiss('accepted'));
  refuse?.addEventListener('click', () => dismiss('refused'));
}

/* ---------- Bouton téléphone flottant ---------- */
export function initFloatPhone() {
  const btn = document.querySelector('#float-phone');
  if (!btn) return;

  const toggle = () => {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}

/* ---------- Back to top ---------- */
export function initBackToTop() {
  const btn = document.querySelector('#back-to-top');
  if (!btn) return;

  const toggle = () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
