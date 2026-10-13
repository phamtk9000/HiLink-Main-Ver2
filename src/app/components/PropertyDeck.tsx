// The managed properties as a row of tall cards, built to the measure of the
// Collections slider on augustcollections.com (slick, centre mode, there).
// The row runs the full width of the screen. A card is a third of the list
// less its 32px gutter (310px on a 1440 screen; see .hl-deck in theme.css):
// at rest a 380px photograph over a 65px name; the one in the middle stands a
// tenth larger and opens — its photograph draws up to 265px and 190px of
// facts appear on white (place, three figures, the way in). Corners are
// square. Arrows and a "1 / 4" count sit beneath; it can also be dragged,
// swiped, or a neighbour clicked to bring it to the middle. It runs round
// without end and does not move by itself.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MapPin } from './Glyph';
import { photo } from '../lib/photo';

/** `crop`: an object-position, for a photograph that must keep one side (a watermark shown whole). */
export type DeckItem = { name: string; location: string; type: string; image: string; stats: string[][]; to?: string; href?: string; crop?: string };

const EASE = 'duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)]';

export function PropertyDeck({ items, view, prev, next }: { items: DeckItem[]; view: string; prev: string; next: string }) {
  const box = useRef<HTMLDivElement>(null);
  const cells = useRef<(HTMLElement | null)[]>([]);
  const api = useRef<{ go: (d: number) => void; to: (i: number) => void } | null>(null);
  const [sel, setSel] = useState(0);
  const n = items.length;
  // The row shows five cards on a laptop and more on a wide screen, and runs
  // round: a short list is laid out several times over so it never runs dry.
  const total = n * Math.max(1, Math.ceil(12 / n));

  useEffect(() => {
    const el = box.current;
    if (!el || n < 2) return undefined;
    let pos = 0, vel = 0, target = 0, raf = 0;
    let drag: { x: number; pos: number; moved: number; last: number; lastT: number; v: number } | null = null;
    const pitch = () => (cells.current[0]?.offsetWidth ?? 310) + 32;
    const wrap = (d: number) => ((((d + total / 2) % total) + total) % total) - total / 2;

    const render = () => {
      const w = pitch();
      const reach = el.clientWidth / 2 / w + 0.6; // how far out a card still shows
      cells.current.forEach((c, i) => {
        if (!c) return;
        const off = wrap(i - pos), a = Math.abs(off);
        c.style.transform = `translate3d(${off * w}px,0,0) scale(${1 + 0.1 * Math.max(0, 1 - a)})`;
        c.style.opacity = String(1 - 0.1 * Math.min(1, a));
        c.style.visibility = a > reach ? 'hidden' : 'visible';
        c.style.zIndex = a < 0.5 ? '2' : '1';
      });
      const at = ((Math.round(pos) % total) + total) % total;
      setSel((s) => (s === at ? s : at));
    };
    const tick = () => {
      raf = 0;
      if (!drag) {
        vel += (target - pos) * 0.03;
        vel *= 1 - 0.3;
        pos += vel;
        if (Math.abs(target - pos) < 0.0005 && Math.abs(vel) < 0.0005) { pos = target; vel = 0; }
      }
      render();
      if (drag || pos !== target) raf = requestAnimationFrame(tick);
    };
    const run = () => { if (!raf) raf = requestAnimationFrame(tick); };
    api.current = {
      go: (d) => { target = Math.round(target) + d; run(); },
      to: (i) => { target = Math.round(pos) + Math.round(wrap(i - pos)); run(); },
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { x: e.clientX, pos, moved: 0, last: e.clientX, lastT: e.timeStamp, v: 0 };
      run();
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      if (drag.moved > 6) { el.setPointerCapture?.(e.pointerId); el.style.cursor = 'grabbing'; }
      drag.v = (e.clientX - drag.last) / Math.max(1, e.timeStamp - drag.lastT);
      drag.last = e.clientX; drag.lastT = e.timeStamp;
      pos = drag.pos - dx / pitch();
    };
    const up = (e: PointerEvent) => {
      if (!drag) return;
      const d = drag; drag = null;
      el.style.cursor = '';
      if (d.moved > 6) {
        target = Math.round(pos - (d.v * 160) / pitch());
        if (target === Math.round(d.pos) && Math.abs(pos - d.pos) > 0.15) target += pos > d.pos ? 1 : -1;
        const stop = (ev: Event) => { ev.stopPropagation(); ev.preventDefault(); };
        el.addEventListener('click', stop, { capture: true, once: true });
        window.setTimeout(() => el.removeEventListener('click', stop, true), 0);
      } else target = Math.round(pos);
      el.releasePointerCapture?.(e.pointerId);
      run();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { api.current?.go(1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { api.current?.go(-1); e.preventDefault(); }
    };
    const ro = new ResizeObserver(render);
    ro.observe(el);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('keydown', key);
    render();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('keydown', key);
    };
  }, [n, total]);

  const arrow = 'grid h-10 w-10 place-items-center text-[#2A2623] border border-transparent hover:border-[#2A2623]/40 focus-visible:border-[#D12126] outline-none transition-colors';
  const link = 'mt-auto flex h-9 w-full shrink-0 items-center justify-center border border-[#2A2623] px-6 text-[12px] uppercase tracking-[0.22em] text-[#2A2623] hover:bg-[#2A2623] hover:text-white transition-colors';
  return (
    <div>
      {/* 40px of air above and below: the card in the middle grows into it */}
      <div
        ref={box}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        className="hl-deck relative h-[537px] overflow-hidden select-none cursor-grab touch-pan-y outline-none"
      >
        {Array.from({ length: total }, (_, i) => {
          const it = items[i % n];
          const on = i === sel;
          return (
            <article
              key={i}
              ref={(c) => { cells.current[i] = c; }}
              aria-hidden={!on}
              onClick={() => { if (!on) api.current?.to(i); }}
              className={`absolute left-1/2 top-10 -ml-[calc(var(--w)/2)] w-[var(--w)] overflow-hidden border border-[#E4E3E3] shadow-[0_0_10px_rgba(0,0,0,0.02)] will-change-transform ${on ? '' : 'cursor-pointer'}`}
            >
              <div className={`relative overflow-hidden bg-[#2A2623] transition-[height] ${EASE} ${on ? 'h-[265px]' : 'h-[380px]'}`}>
                <img {...photo(it.image, '(min-width: 1680px) 368px, 310px')} alt={on ? it.name : ''} draggable={false} loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ objectPosition: it.crop ?? 'center' }} />
                <span className="absolute right-3 top-3 bg-white/90 px-2.5 py-1 text-[10px] uppercase leading-[14px] tracking-[0.14em] text-[#2A2623]">{it.type}</span>
              </div>
              <div className={`@container flex flex-col overflow-hidden px-6 transition-[height,background-color,padding] ${EASE} ${on ? 'h-[190px] bg-white py-6' : 'h-[65px] bg-transparent py-5'}`}>
                <h3 className="serif hl-deck-title shrink-0 truncate text-[#2A2623]">{it.name}</h3>
                <div className={`mt-3 flex min-h-0 flex-1 flex-col transition-opacity duration-500 ${on ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'}`}>
                  <p className="flex items-center gap-1.5 text-[12px] leading-[20px] text-[#4A443F]"><MapPin size={13} className="shrink-0 text-[#D12126]" /> <span className="truncate">{it.location}</span></p>
                  <dl className="mt-2 flex justify-between gap-2">
                    {it.stats.map(([label, value]) => (
                      <div key={label} className="flex flex-col-reverse whitespace-nowrap">
                        <dt className="mt-0.5 text-[min(10.5px,4.4cqw)] leading-[13px] text-[#6B645D]">{label}</dt>
                        <dd className="serif lining-nums text-[min(14px,5.4cqw)] leading-[18px] text-[#2A2623]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {it.to
                    ? <Link to={it.to} tabIndex={on ? 0 : -1} className={link}>{view}</Link>
                    : <a href={it.href} target="_blank" rel="noopener noreferrer" tabIndex={on ? 0 : -1} className={link}>{view}</a>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-center gap-3">
        <button type="button" onClick={() => api.current?.go(-1)} aria-label={prev} className={arrow}><ChevronLeft size={18} /></button>
        <p className="min-w-[4.5rem] text-center text-[1.05rem] tabular-nums lining-nums tracking-[0.12em] text-[#2A2623]" aria-live="polite">{(sel % n) + 1} / {n}</p>
        <button type="button" onClick={() => api.current?.go(1)} aria-label={next} className={arrow}><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
