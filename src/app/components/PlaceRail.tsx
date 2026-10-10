// A sideways rail of tall place cards, measured off foraspace.com's
// "Featured workspaces" at 1440px: cards 388 × 550 with 8px corners and a
// 32px gap; the first card lines up with the page margin and the rail runs
// on past the right edge of the screen; title 27.2/34px (in the site's
// serif), address in small spaced capitals (the site's label style), 32px in from the left and 40px up from the bottom;
// 64px round arrows sitting 24px inside the outer cards; a 4px progress bar
// 36px below. Used for the HiLink locations on Home and the properties on
// About.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { ws } from '../data/site';
import { photo } from '../lib/photo';

export type Place = { key: string; name: string; address: string; photo: string; to?: string; href?: string; crop?: string };

export function PlaceRail({ items, next, prev }: { items: Place[]; next: string; prev: string }) {
  const { lang, l } = useLang();
  const rail = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ size: 0.3, at: 0, start: true, end: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return undefined;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setBar({ size: Math.min(1, el.clientWidth / el.scrollWidth), at: max > 0 ? el.scrollLeft / max : 0, start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  const go = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.querySelector('a');
    if (el && card) el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 32), behavior: 'smooth' });
  };
  const arrow = 'absolute top-1/2 z-10 -translate-y-1/2 grid h-16 w-16 place-items-center rounded-full bg-[#D12126] text-white shadow-[0_8px_24px_-6px_rgba(209,33,38,0.45)] transition-[opacity,background-color] duration-300 hover:bg-[#A3181C] disabled:pointer-events-none disabled:opacity-0';

  return (
    <div className="hl-rail">
      <div className="relative">
        <div
          ref={rail}
          data-reveal-group
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingInline: 'var(--rail-pad)', scrollPaddingInline: 'var(--rail-pad)' }}
        >
          {items.map((it) => {
            const inner = (
              <>
                <img loading="lazy" decoding="async" {...photo(it.photo, '(min-width: 640px) 388px, 78vw')} alt={it.name} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05] ${it.crop ?? ''}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-white">
                  <p className="serif text-[1.7rem] leading-[2.125rem]">{it.name}</p>
                  <p className="mt-2 text-[12px] uppercase tracking-[0.14em] leading-[1.275rem] text-white/90">{it.address}</p>
                </div>
              </>
            );
            const cls = 'group relative block shrink-0 snap-start overflow-hidden rounded-[8px] bg-[#2A2623] w-[78vw] sm:w-[388px] aspect-[388/550]';
            return it.to
              ? <Link key={it.key} to={l(it.to)} className={cls}>{inner}</Link>
              : <a key={it.key} href={ws(lang, it.href)} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
          })}
        </div>
        <button type="button" onClick={() => go(-1)} disabled={bar.start} aria-label={prev} className={arrow} style={{ left: 'calc(var(--rail-pad) + 24px)' }}><ChevronLeft size={24} /></button>
        <button type="button" onClick={() => go(1)} disabled={bar.end} aria-label={next} className={arrow} style={{ right: 'calc(var(--rail-pad) + 24px)' }}><ChevronRight size={24} /></button>
      </div>
      <div className="relative mt-9 h-1 rounded-full bg-[#2A2623]/15" style={{ marginInline: 'var(--rail-pad)' }} aria-hidden="true">
        <div className="absolute inset-y-0 rounded-full bg-[#2A2623] transition-[left] duration-150" style={{ width: `${bar.size * 100}%`, left: `${bar.at * (1 - bar.size) * 100}%` }} />
      </div>
    </div>
  );
}
