/* ============================================================
   room3d.js — Chambre 3D interactive : auto-oscillation
                + rotation souris & touch
   ============================================================ */

export function initRoom3D() {
  const scene = document.querySelector('#room-scene');
  const box   = document.querySelector('#room-box');
  const hint  = document.querySelector('.room-hint');
  if (!scene || !box) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const MAX_X = 12;
  const MAX_Y = 18;
  let interacting = false;
  let hintHidden  = false;
  let autoRafId;

  /* ── Auto-oscillation douce au chargement ── */
  const startAuto = () => {
    const animate = () => {
      if (!interacting) {
        const t  = Date.now() / 1000;
        const rx = Math.sin(t * 0.38) * 5;
        const ry = Math.sin(t * 0.27) * 9;
        box.style.transition = 'transform 80ms linear';
        box.style.transform  = `rotateX(${4 + rx}deg) rotateY(${ry}deg)`;
      }
      autoRafId = requestAnimationFrame(animate);
    };
    autoRafId = requestAnimationFrame(animate);
  };
  startAuto();

  const hideHint = () => {
    if (!hintHidden && hint) {
      hint.style.opacity = '0';
      hint.style.transition = 'opacity 400ms ease';
      setTimeout(() => hint.remove(), 400);
      hintHidden = true;
    }
  };

  const applyRotation = (rx, ry) => {
    const cx = Math.max(-MAX_X, Math.min(MAX_X, rx));
    const cy = Math.max(-MAX_Y, Math.min(MAX_Y, ry));
    box.style.transition = 'transform 60ms linear';
    box.style.transform  = `rotateX(${cx}deg) rotateY(${cy}deg)`;
  };

  const returnToRest = () => {
    interacting = false;
  };

  /* ── Mouse ── */
  scene.addEventListener('mousemove', e => {
    interacting = true;
    hideHint();
    const r  = scene.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    applyRotation(dy * -MAX_X, dx * MAX_Y);
  });
  scene.addEventListener('mouseleave', returnToRest);

  /* ── Touch ── */
  scene.addEventListener('touchmove', e => {
    e.preventDefault();
    interacting = true;
    hideHint();
    const touch = e.touches[0];
    const r     = scene.getBoundingClientRect();
    const dx    = (touch.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy    = (touch.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    applyRotation(dy * -MAX_X * 0.7, dx * MAX_Y * 0.7);
  }, { passive: false });
  scene.addEventListener('touchend', returnToRest);
}
