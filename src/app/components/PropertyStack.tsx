// Cards of the properties HiLink manages, stacked (Solutions, the first
// solution). The card in front is all photograph — its type, name, place and
// how it is doing laid over the foot of it — and the next two stand behind,
// their top edges showing. Every 2.2 seconds the front card slides away and
// the next comes forward, by itself: there are no buttons (a swipe still
// moves it on). It waits while off screen; reduced motion shows the first
// card, still.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { MapPin } from './Glyph';
import { photo } from '../lib/photo';

export type StackItem = { name: string; location: string; type: string; image: string; stats: string[][]; to?: string; href?: string; crop?: string };

const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const EVERY = 2200;

export function PropertyStack({ items, label }: { items: StackItem[]; label: string }) {
  const n = items.length;
  const [front, setFront] = useState(0);
  const [live, setLive] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const go = (d: number) => setFront((f) => (f + d + n) % n);

  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!live || n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setTimeout(() => go(1), EVERY);
    return () => window.clearTimeout(timer);
  }, [front, live, n]);

  return (
    <div
      ref={box}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative h-full min-h-[340px] overflow-hidden pt-6"
    >
      {/* room above for the edges of the cards behind */}
      <div className="relative h-full">
        {items.map((it, i) => {
          const d = (i - front + n) % n;
          const on = d === 0, leaving = d === n - 1 && n > 3;
          // behind: 12px higher and 4% narrower for each place back, from the top edge
          const style: React.CSSProperties = on
            ? { transform: 'translate(0,0) scale(1)', opacity: 1, zIndex: n + 1 }
            : leaving
              ? { transform: 'translate(-14%, 2%) rotate(-3deg) scale(0.97)', opacity: 0, zIndex: n + 2 }
              : d <= 2
                ? { transform: `translateY(${-d * 12}px) scale(${1 - d * 0.04})`, opacity: 1 - d * 0.25, zIndex: n - d }
                : { transform: 'translateY(-36px) scale(0.88)', opacity: 0, zIndex: 0 };
          const inner = (
            <>
              <img {...photo(it.image, '(min-width: 1024px) 60vw, 100vw')} alt="" loading={i < 2 ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: it.crop ?? 'center' }} />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" aria-hidden="true" />
              <span className="absolute left-4 top-4 bg-white/90 px-2.5 py-1 text-[10.5px] uppercase leading-[14px] tracking-[0.14em] text-[#2A2623] lg:left-5 lg:top-5">{it.type}</span>
              <span className="absolute inset-x-0 bottom-0 p-5 text-white lg:p-7">
                <span className="serif hl-stack-name block">{it.name}</span>
                <span className="mt-1.5 flex items-center gap-1.5 text-[13px] text-white/85"><MapPin size={13} className="shrink-0" /> {it.location}</span>
                <span className="mt-4 flex gap-6 border-t border-white/25 pt-4 sm:gap-10">
                  {it.stats.map(([label, value]) => (
                    <span key={label} className="flex min-w-0 flex-col">
                      <span className="serif lining-nums truncate text-[1.05rem] leading-none sm:text-[1.3rem]">{value}</span>
                      <span className="mt-1 truncate text-[11px] text-white/75">{label}</span>
                    </span>
                  ))}
                </span>
              </span>
            </>
          );
          const cls = 'absolute inset-0 block overflow-hidden rounded-[6px] bg-[#2A2623] shadow-[0_24px_50px_-28px_rgba(0,0,0,0.6)]';
          const motion = { ...style, transformOrigin: '50% 0%', transition: `transform 0.9s ${EASE}, opacity 0.9s ${EASE}` };
          return it.to
            ? <Link key={it.name} to={it.to} aria-hidden={!on} tabIndex={on ? 0 : -1} aria-label={on ? it.name : undefined} className={cls} style={motion}>{inner}</Link>
            : <a key={it.name} href={it.href} target="_blank" rel="noopener noreferrer" aria-hidden={!on} tabIndex={on ? 0 : -1} aria-label={on ? it.name : undefined} className={cls} style={motion}>{inner}</a>;
        })}
      </div>
    </div>
  );
}
