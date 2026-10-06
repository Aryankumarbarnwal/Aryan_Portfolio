import { useEffect } from 'react';

// Writes a 0..1 value into the CSS variable --p on the element while the
// element scrolls through the viewport. No React re-render per frame.
// from: where in the viewport (0..1 of height) progress starts at 0
// span: how many viewport heights it takes to reach 1
export function useProgressVar(ref, { from = 0.9, span = 0.7, reduced = false } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) { el.style.setProperty('--p', '1'); return; }
    let raf = 0;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * from - r.top) / (vh * span)));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [ref, from, span, reduced]);
}
