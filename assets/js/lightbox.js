/* ============================================================
   lightbox.js — Galerie plein écran avec navigation, swipe,
                  compteur, clavier et dots.
   ============================================================ */

export function initLightbox() {
  const triggers = Array.from(document.querySelectorAll('.gal[data-src]'));
  if (!triggers.length) return;

  let current = 0;

  /* ── Overlay HTML ── */
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Photo agrandie');
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <button class="lightbox-prev" aria-label="Photo précédente">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button class="lightbox-next" aria-label="Photo suivante">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="lightbox-media">
      <img class="lightbox-img" src="" alt="" />
    </div>
    <div class="lightbox-footer">
      <p class="lightbox-caption"></p>
      <span class="lightbox-counter"></span>
    </div>
    <div class="lightbox-dots"></div>
  `;
  document.body.appendChild(overlay);

  const img     = overlay.querySelector('.lightbox-img');
  const caption = overlay.querySelector('.lightbox-caption');
  const counter = overlay.querySelector('.lightbox-counter');
  const dotsWrap = overlay.querySelector('.lightbox-dots');
  const btnClose = overlay.querySelector('.lightbox-close');
  const btnPrev  = overlay.querySelector('.lightbox-prev');
  const btnNext  = overlay.querySelector('.lightbox-next');

  /* ── Build dots ── */
  const buildDots = () => {
    dotsWrap.innerHTML = '';
    triggers.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'lightbox-dot';
      d.setAttribute('aria-label', `Photo ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
  };
  buildDots();

  const updateDots = () => {
    dotsWrap.querySelectorAll('.lightbox-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  };

  /* ── Navigation ── */
  const goTo = (idx, direction = 0) => {
    current = (idx + triggers.length) % triggers.length;
    const gal   = triggers[current];
    const imgEl = gal.querySelector('img');

    /* Slide animation */
    img.classList.add(direction > 0 ? 'slide-out-left' : direction < 0 ? 'slide-out-right' : '');
    
    setTimeout(() => {
      img.src = gal.dataset.src;
      img.alt = imgEl?.alt || '';
      caption.textContent = gal.dataset.caption || '';
      counter.textContent = `${current + 1} / ${triggers.length}`;
      img.classList.remove('slide-out-left', 'slide-out-right');
      img.classList.add(direction > 0 ? 'slide-in-right' : direction < 0 ? 'slide-in-left' : '');
      requestAnimationFrame(() => {
        img.classList.remove('slide-in-right', 'slide-in-left');
      });
    }, direction !== 0 ? 160 : 0);

    updateDots();
    btnPrev.style.display = triggers.length <= 1 ? 'none' : '';
    btnNext.style.display = triggers.length <= 1 ? 'none' : '';
  };

  /* ── Open / Close ── */
  const open = (idx) => {
    current = idx;
    goTo(idx);
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  };

  const closeBox = () => {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    /* Return focus to trigger */
    triggers[current]?.focus();
  };

  /* ── Trigger clicks ── */
  triggers.forEach((gal, i) => {
    gal.setAttribute('tabindex', '0');
    gal.setAttribute('role', 'button');
    gal.setAttribute('aria-label', gal.querySelector('img')?.alt || `Photo ${i + 1}`);
    gal.addEventListener('click', () => open(i));
    gal.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  /* ── Controls ── */
  btnClose.addEventListener('click', closeBox);
  btnPrev.addEventListener('click', () => goTo(current - 1, -1));
  btnNext.addEventListener('click', () => goTo(current + 1, 1));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeBox(); });

  /* ── Keyboard ── */
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape')     closeBox();
    if (e.key === 'ArrowRight') goTo(current + 1, 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1, -1);
  });

  /* ── Touch swipe ── */
  let touchStartX = 0;
  overlay.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  overlay.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goTo(current + 1,  1);
      else         goTo(current - 1, -1);
    }
  }, { passive: true });
}
