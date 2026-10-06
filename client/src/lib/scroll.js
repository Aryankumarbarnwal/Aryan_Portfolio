let lenis = null;
export const setLenis = (l) => { lenis = l; };

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
export function lockScroll() {
  if (lenis) lenis.stop(); else document.body.style.overflow = 'hidden';
}
export function unlockScroll() {
  if (lenis) lenis.start(); else document.body.style.overflow = '';
}
