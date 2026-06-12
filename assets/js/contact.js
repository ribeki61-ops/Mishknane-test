/* ============================================================
   contact.js — Formulaire Formspree async + validation inline
   ============================================================ */

export function initContactForm() {
  const form   = document.querySelector('#contact-form');
  const status = document.querySelector('.form-status');
  if (!form || !status) return;

  /* ── Validation inline en temps réel ── */
  const validateField = (field) => {
    const group = field.closest('.form-group');
    if (!group) return;
    const isValid = field.checkValidity();
    group.classList.toggle('has-error', !isValid && field.value !== '');
    group.classList.toggle('is-valid',   isValid && field.value !== '');

    let errEl = group.querySelector('.field-error');
    if (!isValid && field.value !== '') {
      if (!errEl) {
        errEl = document.createElement('span');
        errEl.className = 'field-error';
        field.after(errEl);
      }
      errEl.textContent = field.validationMessage;
    } else if (errEl) {
      errEl.remove();
    }
  };

  /* Blur validation sur chaque champ */
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group')?.classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  /* ── Compteur de caractères sur le textarea ── */
  const textarea = form.querySelector('textarea');
  if (textarea) {
    const counter = document.createElement('span');
    counter.className = 'char-count';
    counter.textContent = '0 / 1000';
    textarea.after(counter);
    textarea.maxLength = 1000;

    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      counter.textContent = `${len} / 1000`;
      counter.classList.toggle('near-limit', len > 900);
    });
  }

  /* ── Soumission ── */
  form.addEventListener('submit', async e => {
    e.preventDefault();

    /* Forcer la validation de tous les champs */
    let valid = true;
    form.querySelectorAll('input, select, textarea').forEach(field => {
      if (!field.checkValidity()) {
        validateField(field);
        valid = false;
      }
    });
    if (!valid) {
      form.querySelector('.has-error input, .has-error textarea, .has-error select')?.focus();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    /* État chargement */
    btn.disabled = true;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" class="spin-icon">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      <span>Envoi en cours…</span>`;

    status.className = 'form-status';
    status.textContent = '';

    try {
      const res = await fetch(form.action, {
        method:  form.method,
        body:    new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        status.className   = 'form-status success';
        status.innerHTML   = '&#x2713; Message envoyé. Nous vous recontacterons sous 48 h ouvrées.';
        form.reset();
        /* Clear validation states */
        form.querySelectorAll('.is-valid, .has-error').forEach(g => {
          g.classList.remove('is-valid', 'has-error');
        });
        form.querySelectorAll('.field-error').forEach(e => e.remove());
        if (textarea) document.querySelector('.char-count').textContent = '0 / 1000';
      } else {
        const data = await res.json().catch(() => ({}));
        const msg  = data.errors?.map(er => er.message).join(', ')
          ?? 'Une erreur est survenue. Appelez-nous directement au 02 35 59 28 00.';
        status.className   = 'form-status error';
        status.textContent = msg;
      }
    } catch {
      status.className   = 'form-status error';
      status.textContent = 'Connexion impossible. Appelez-nous au 02 35 59 28 00.';
    } finally {
      btn.disabled  = false;
      btn.innerHTML = originalHTML;
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
