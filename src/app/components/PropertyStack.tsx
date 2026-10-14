// Cards of the properties HiLink manages, stacked: the one in front shows
// the photograph, the place and how it is doing, with two more standing
// behind it. Every few seconds the front card slides away and the next comes
// forward. It waits while the pointer is over it or it is off screen; the
// arrows (or a swipe) move it on by hand; reduced motion shows the first
// card, still.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MapPin } from './Glyph';
import { photo } from '../lib/photo';

export type StackItem = { name: string; location: string; type: string; image: string; stats: string[][]; to?: string; href?: string; crop?: string };

const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

export function PropertyStack({ items, view, prev, next }: { items: StackItem[]; view: string; prev: string; next: string }) {
  const n = items.length;
  const [front, setFront] = useState(0);
  const [live, setLive] = useState(false);
  const [held, setHeld] = useState(false);
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
    if (!live || held || n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setTimeout(() => go(1), 4500);
    return () => window.clearTimeout(timer);
  }, [front, live, held, n]);

  return (
    <div
      ref={box}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
      role="group"
      aria-roledescription="carousel"
    >
      <div className="relative mx-auto aspect-[440/560] w-full max-w-[400px] lg:max-w-[440px]">
        {items.map((it, i) => {
          const d = (i - front + n) % n;
          const on = d === 0, leaving = d === n - 1 && n > 3;
          const style: React.CSSProperties = on
            ? { transform: 'translate(0,0) scale(1)', opacity: 1, zIndex: n + 1 }
            : leaving
              ? { transform: 'translate(-16%, 3%) rotate(-5deg) scale(0.97)', opacity: 0, zIndex: n + 2 }
              : d <= 2
                ? { transform: `translate(${d * 6}%, ${-d * 5}%) scale(${1 - d * 0.07})`, opacity: 1 - d * 0.3, zIndex: n - d }
                : { transform: 'translate(12%, -10%) scale(0.86)', opacity: 0, zIndex: 0 };
          const link = 'group/v mt-auto inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-[#D12126] hover:text-[#A3181C]';
          return (
            <article
              key={it.name}
              aria-hidden={!on}
              className="absolute inset-0 flex flex-col overflow-hidden bg-white text-[#2A2623] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)]"
              style={{ ...style, transformOrigin: '50% 100%', transition: `transform 0.9s ${EASE}, opacity 0.9s ${EASE}` }}
            >
              <div className="relative h-[56%] shrink-0 overflow-hidden bg-[#2A2623]">
                <img {...photo(it.image, '(min-width: 1024px) 440px, 90vw')} alt={on ? it.name : ''} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover" style={{ objectPosition: it.crop ?? 'center' }} />
                <span className="absolute bottom-3 left-3 bg-white/90 px-2.5 py-1 text-[10.5px] uppercase leading-[14px] tracking-[0.14em] text-[#2A2623]">{it.type}</span>
              </div>
              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <h3 className="serif text-[1.35rem] leading-tight text-[#2A2623]">{it.name}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#4A443F]"><MapPin size={13} className="shrink-0 text-[#D12126]" /> {it.location}</p>
                <dl className="mt-4 flex justify-between gap-4 border-t border-[#2A2623]/12 pt-4">
                  {it.stats.map(([label, value]) => (
                    <div key={label} className="flex min-w-0 flex-col-reverse">
                      <dt className="mt-1 truncate text-[11px] text-[#6B645D]">{label}</dt>
                      <dd className="serif lining-nums truncate text-[0.95rem] sm:text-[1.15rem] leading-none text-[#2A2623]">{value}</dd>
                    </div>
                  ))}
                </dl>
                {it.to
                  ? <Link to={it.to} tabIndex={on ? 0 : -1} className={`${link} mt-5`}>{view} <ArrowRight size={14} className="transition-transform group-hover/v:translate-x-0.5" /></Link>
                  : <a href={it.href} target="_blank" rel="noopener noreferrer" tabIndex={on ? 0 : -1} className={`${link} mt-5`}>{view} <ArrowUpRight size={14} /></a>}
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4 text-white">
        <button type="button" onClick={() => go(-1)} aria-label={prev} className="grid h-10 w-10 place-items-center rounded-full border border-white/30 hover:border-white transition-colors"><ArrowLeft size={16} /></button>
        <p className="min-w-[4rem] text-center text-[13px] tabular-nums tracking-[0.14em] text-white/80" aria-live="polite">{front + 1} / {n}</p>
        <button type="button" onClick={() => go(1)} aria-label={next} className="grid h-10 w-10 place-items-center rounded-full border border-white/30 hover:border-white transition-colors"><ArrowRight size={16} /></button>
      </div>
    </div>
  );
}
