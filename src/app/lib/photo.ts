// srcset for the site photographs: phones get the 800px copy instead of the
// 1200–1600px original. Variants are made by scripts/photo-variants.py.
//   <img {...photo('/photos/x.webp')} />                 full-width image
//   <img {...photo(src, '(min-width: 1024px) 33vw, 100vw')} />
import { PHOTO_SIZES } from '../data/photoSizes';

export function photo(src: string, sizes = '100vw') {
  const widths = PHOTO_SIZES[src];
  if (!widths) return { src };
  const srcSet = widths
    .map((w, i) => `${i === widths.length - 1 ? src : src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`)
    .join(', ');
  return { src, srcSet, sizes };
}
