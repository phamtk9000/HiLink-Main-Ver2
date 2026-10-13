// A sideways rail of place cards, set out after the homes rail on
// onefinestay.com (measured at 1440px): a photograph 568 × 377 (3:2) with
// square corners and nothing laid over it, so the picture stays clear; the
// name beneath in the site's serif (20/28px, upright) and the address in grey
// (14/20px); 12px between cards; 64px white round arrows 32px in from either
// edge, level with the middle of the photographs. The first card lines up
// with the page margin and the rail runs on past the right edge; a fine
// progress bar sits below. Used for the HiLink locations on Home and the
// properties on About.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
    if (el && card) el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 12), behavior: 'smooth' });
  };
  // level with the middle of the photographs: a card is 3:2, so a third of its width down (--rail-card, theme.css)
  const arrow = 'absolute z-10 grid h-12 w-12 sm:h-16 sm:w-16 -translate-y-1/2 place-items-center rounded-full bg-white text-[#2A2623] shadow-[0_6px_20px_-6px_rgba(42,38,35,0.35)] transition-[opacity,background-color,color] duration-300 hover:bg-[#2A2623] hover:text-white disabled:pointer-events-none disabled:opacity-0';

  return (
    <div className="hl-rail">
      <div className="relative">
        <div
          ref={rail}
          data-reveal-group
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingInline: 'var(--rail-pad)', scrollPaddingInline: 'var(--rail-pad)' }}
        >
          {items.map((it) => {
            const inner = (
              <>
                <span className="relative block aspect-[3/2] overflow-hidden bg-[#EDE7DF]">
                  <img loading="lazy" decoding="async" {...photo(it.photo, '(min-width: 1622px) 640px, (min-width: 640px) 40vw, 78vw')} alt={it.name} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] ${it.crop ?? ''}`} />
                </span>
                <span className="serif mt-4 block text-[1.25rem] leading-[1.75rem] text-[#2A2623] transition-colors group-hover:text-[#D12126]">{it.name}</span>
                <span className="block text-[14px] leading-[1.25rem] text-[#6B645D]">{it.address}</span>
              </>
            );
            const cls = 'group block shrink-0 snap-start w-[var(--rail-card)]';
            return it.to
              ? <Link key={it.key} to={l(it.to)} className={cls}>{inner}</Link>
              : <a key={it.key} href={ws(lang, it.href)} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
          })}
        </div>
        <button type="button" onClick={() => go(-1)} disabled={bar.start} aria-label={prev} className={arrow} style={{ left: 'max(16px, calc(var(--rail-pad) - 16px))', top: 'calc(var(--rail-card) / 3)' }}><ArrowLeft size={20} /></button>
        <button type="button" onClick={() => go(1)} disabled={bar.end} aria-label={next} className={arrow} style={{ right: 'max(16px, calc(var(--rail-pad) - 16px))', top: 'calc(var(--rail-card) / 3)' }}><ArrowRight size={20} /></button>
      </div>
      <div className="relative mt-9 h-[3px] rounded-full bg-[#2A2623]/12" style={{ marginInline: 'var(--rail-pad)' }} aria-hidden="true">
        <div className="absolute inset-y-0 rounded-full bg-[#2A2623] transition-[left] duration-150" style={{ width: `${bar.size * 100}%`, left: `${bar.at * (1 - bar.size) * 100}%` }} />
      </div>
    </div>
  );
}
