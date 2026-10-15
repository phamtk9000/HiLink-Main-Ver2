// Life at HiLink (Careers), after the "The work" collage on hipress.vercel.app
// (About): photographs of HiLink's own rooms and people, of every size,
// scattered on a dark ground close enough to overlap at the corners, with
// one tile of nine details. Each sits at its own depth — some drift up past
// the others as the page scrolls, some hang back — and comes up from slightly
// small as it arrives. Placed by hand on a field 100 units wide (x, y and the
// width w in those units, r the picture's aspect, d its depth from -1 to 1).
// On phones the pictures stack in two columns instead (the scattered field
// would make them too small to see). Reduced motion keeps everything still.
import { useEffect, useRef } from 'react';
import { photo } from '../lib/photo';
import { loadMotion } from '../lib/motion';
import { Flag } from './Flag';

const SPAN = 92; // height of the field, in the same units
type Slot = { src: string; x: number; y: number; w: number; r: number; d: number };
const SLOTS: Slot[] = [
  { src: '/photos/hbc-lounge-3.webp', x: 3, y: 2, w: 29, r: 1.5, d: 0.3 },
  { src: '/photos/qc-bar-2.webp', x: 54.5, y: 8, w: 12, r: 0.9, d: 0.5 },
  { src: '/photos/f19-corridor.webp', x: 72, y: 3, w: 20, r: 2.17, d: -0.4 },
  { src: '/photos/f15-lounge.webp', x: 66, y: 15, w: 31, r: 2.33, d: 0.2 },
  { src: '/photos/hbc-host.webp', x: 3, y: 26, w: 11.5, r: 0.47, d: -0.3 },
  { src: '/photos/hbc-members.webp', x: 16, y: 26, w: 17, r: 1.27, d: 0.4 },
  { src: '/photos/qc-lounge.webp', x: 54.5, y: 30, w: 15, r: 0.92, d: -0.1 },
  { src: '/photos/hbc-client-meeting.webp', x: 72, y: 31, w: 16, r: 1.01, d: 0.5 },
  { src: '/photos/hbc-study.webp', x: 17, y: 44, w: 27, r: 1.5, d: -0.2 },
  { src: '/photos/nc35-room.webp', x: 46, y: 50, w: 15, r: 1.37, d: 0.3 },
  { src: '/photos/hbc-desk-pair.webp', x: 64, y: 51, w: 33, r: 1.33, d: -0.3 },
  { src: '/photos/qc-room.webp', x: 2, y: 63, w: 23, r: 1.28, d: 0.2 },
  { src: '/photos/hbc-member.webp', x: 27, y: 66, w: 15, r: 1, d: -0.4 },
  { src: '/photos/f15-boardroom.webp', x: 44, y: 66, w: 18, r: 1.5, d: 0.4 },
  { src: '/photos/nc35-hall.webp', x: 27, y: 82, w: 14, r: 1.33, d: 0.1 },
];
// The tile of nine: details, food and corners, three by three.
const NINE = { x: 34, y: 5, w: 19, r: 0.69, d: -0.2 };
const NINE_PHOTOS = [
  '/photos/hbc-detail.webp', '/photos/hbc-fandb.webp', '/photos/hbc-globe.webp',
  '/photos/qc-cellar.webp', '/photos/f15-meeting-pod.webp', '/photos/nc35-desks.webp',
  '/photos/qc-dining.webp', '/photos/f19-window.webp', '/photos/f15-lounge-cabin.webp',
];

export function LifeCollage({ eyebrow, title, lead, alt }: { eyebrow: string; title: string; lead: string; alt: string }) {
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = field.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let ctx: { revert(): void } | undefined;
    let gone = false;
    loadMotion().then(({ gsap }) => {
      if (gone) return;
      ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
          const d = Number(el.dataset.depth);
          gsap.fromTo(el, { yPercent: d * 22 }, { yPercent: -d * 22, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } });
          gsap.from(el.firstElementChild, { scale: 0.86, autoAlpha: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
        });
      }, root);
    });
    return () => { gone = true; ctx?.revert(); };
  }, []);

  const place = (s: { x: number; y: number; w: number; d: number }) => ({
    left: `${s.x}%`, top: `${(s.y / SPAN) * 100}%`, width: `${s.w}%`, zIndex: Math.round((s.d + 1) * 10),
  });
  const pic = (src: string, sizes: string, cls = '') => (
    <img {...photo(src, sizes)} alt="" loading="lazy" decoding="async" className={`block h-full w-full object-cover ${cls}`} />
  );

  return (
    <section className="relative overflow-hidden bg-[#1B1412] py-24 text-[#F8F6F1] lg:py-32">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <p className="mb-5 flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#F06A6E]"><Flag /> {eyebrow}</p>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="serif max-w-[18ch] text-4xl leading-tight lg:text-5xl">{title}</h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#F8F6F1]/70">{lead}</p>
        </div>
      </div>

      {/* Wide screens: the scattered field. */}
      <div ref={field} role="img" aria-label={alt} className="relative mx-auto mt-16 hidden w-[min(96vw,1700px)] md:block lg:mt-20" style={{ aspectRatio: `100 / ${SPAN}` }}>
        {SLOTS.map((s) => (
          <div key={s.src} data-depth={s.d} className="absolute" style={place(s)}>
            <div style={{ aspectRatio: String(s.r) }}>{pic(s.src, `${Math.round(s.w)}vw`)}</div>
          </div>
        ))}
        <div data-depth={NINE.d} className="absolute" style={place(NINE)}>
          <div className="[display:grid] grid-cols-3 gap-[2px]" style={{ aspectRatio: String(NINE.r) }}>
            {NINE_PHOTOS.map((src) => <div key={src} className="min-h-0 overflow-hidden">{pic(src, '7vw')}</div>)}
          </div>
        </div>
      </div>

      {/* Phones: two columns of the same pictures, taller and wider in turn. */}
      <ul role="list" aria-label={alt} className="mt-12 columns-2 gap-2 px-6 md:hidden">
        {SLOTS.slice(0, 10).map((s, k) => (
          <li key={s.src} className="mb-2 break-inside-avoid overflow-hidden" style={{ aspectRatio: k % 3 === 0 ? '3 / 4' : k % 3 === 1 ? '1 / 1' : '4 / 3' }}>
            {pic(s.src, '50vw')}
          </li>
        ))}
      </ul>
    </section>
  );
}
