// srcset for the site photographs: phones get the 800px copy instead of the
// 1200–1600px original. Variants are made by scripts/photo-variants.py.
//   <img {...photo('/photos/x.webp')} />                 full-width image
//   <img {...photo(src, '(min-width: 1024px) 33vw, 100vw')} />
// Each photograph also carries its tone (data-tone), the step of the warm
// monochrome ramp nearest its lightness, so its place is filled with a
// matching colour until it loads (theme.css). An attribute, not a style:
// a styled image is left out of the scroll parallax (lib/motion.tsx).
import { PHOTO_SIZES, PHOTO_TONES } from '../data/photoSizes';

export function photo(src: string, sizes = '100vw') {
  const widths = PHOTO_SIZES[src];
  const tone = PHOTO_TONES[src];
  const mark = tone === undefined ? {} : { 'data-tone': tone };
  if (!widths) return { src, ...mark };
  const srcSet = widths
    .map((w, i) => `${i === widths.length - 1 ? src : src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`)
    .join(', ');
  return { src, srcSet, sizes, ...mark };
}
