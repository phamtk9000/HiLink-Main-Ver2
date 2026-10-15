// Phones get fewer effects than wide screens (the user's call): the moving
// backgrounds hold one still frame, and scroll motion is a plain fade. One
// place decides what a phone is, so every component agrees.
export const PHONE = '(max-width: 767px)';
export const isPhone = () => typeof window !== 'undefined' && window.matchMedia(PHONE).matches;
/** Reduced motion asked for, or a phone: draw decorative motion still. */
export const stillMotion = () =>
  typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isPhone());
