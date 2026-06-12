/* ============================================================
   faqanim.js — Animation fluide pour tous les <details>
                (FAQ et accordéon aides financières)
   ============================================================ */

export function initDetailsAnimation() {
  document.querySelectorAll('details').forEach(details => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.faq-answer, .aide-item > p, details > p');
    if (!summary || !content) return;

    /* Wrap content pour la mesure */
    let inner = content.querySelector('.details-inner');
    if (!inner) {
      inner = document.createElement('div');
      inner.className = 'details-inner';
      while (content.firstChild) inner.appendChild(content.firstChild);
      content.appendChild(inner);
    }
    content.style.overflow = 'hidden';

    let isAnimating = false;

    summary.addEventListener('click', e => {
      e.preventDefault();
      if (isAnimating) return;
      isAnimating = true;

      if (details.open) {
        /* ── Fermer ── */
        const startH = content.scrollHeight;
        content.style.height = startH + 'px';

        requestAnimationFrame(() => {
          content.style.transition = `height 340ms cubic-bezier(0.22,1,0.36,1)`;
          content.style.height = '0px';

          content.addEventListener('transitionend', () => {
            details.open = false;
            content.style.height = '';
            content.style.transition = '';
            isAnimating = false;
          }, { once: true });
        });
      } else {
        /* ── Ouvrir ── */
        details.open = true;
        const targetH = content.scrollHeight;
        content.style.height = '0px';

        requestAnimationFrame(() => {
          content.style.transition = `height 340ms cubic-bezier(0.22,1,0.36,1)`;
          content.style.height = targetH + 'px';

          content.addEventListener('transitionend', () => {
            content.style.height = '';
            content.style.transition = '';
            isAnimating = false;
          }, { once: true });
        });
      }
    });
  });
}
