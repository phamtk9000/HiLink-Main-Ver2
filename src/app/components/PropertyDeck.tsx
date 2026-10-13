// The managed properties as a deck of tall cards, built like the Collections
// slider on augustcollections.com (slick, centre mode, there): the card in
// the middle stands a tenth larger and opens — its photograph draws up and
// the facts beneath it appear on white (type, place, the three figures, the
// way in) — while its neighbours show only a photograph and a name. Arrows
// and a "1 / 4" count sit beneath; it can also be dragged, swiped, or a
// neighbour clicked to bring it to the middle. It runs round without end
// and does not move by itself.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MapPin } from './Glyph';
import { photo } from '../lib/photo';

/** `crop`: an object-position class, for a photograph that must keep one side (a watermark shown whole). */
export type DeckItem = { name: string; location: string; type: string; image: string; stats: string[][]; to?: string; href?: string; crop?: string };

export function PropertyDeck({ items, view, prev, next }: { items: DeckItem[]; view: string; prev: string; next: string }) {
  const box = useRef<HTMLDivElement>(null);
  const cells = useRef<(HTMLElement | null)[]>([]);
  const api = useRef<{ go: (d: number) => void; to: (i: number) => void } | null>(null);
  const [sel, setSel] = useState(0);
  const n = items.length;

  useEffect(() => {
    const el = box.current;
    if (!el || n < 2) return undefined;
    let pos = 0, vel = 0, target = 0, raf = 0;
    let drag: { x: number; pos: number; moved: number; last: number; lastT: number; v: number } | null = null;
    const pitch = () => { const c = cells.current[0]; return c ? c.offsetWidth + parseFloat(getComputedStyle(el).getPropertyValue('--gap') || '32') : 360; };
    const wrap = (d: number) => ((((d + n / 2) % n) + n) % n) - n / 2;

    const render = () => {
      const w = pitch();
      cells.current.forEach((c, i) => {
        if (!c) return;
        const off = wrap(i - pos), a = Math.abs(off);
        c.style.transform = `translate3d(${off * w}px,0,0) scale(${1 + 0.1 * Math.max(0, 1 - a)})`;
        c.style.opacity = String(a <= 1 ? 1 - 0.1 * a : Math.max(0, 0.9 * (1.45 - a) / 0.45));
        c.style.visibility = a >= 1.45 ? 'hidden' : 'visible';
        c.style.zIndex = a < 0.5 ? '2' : '1';
      });
      const at = ((Math.round(pos) % n) + n) % n;
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
  }, [n]);

  const arrow = 'grid h-11 w-11 place-items-center text-[#2A2623] border border-transparent hover:border-[#2A2623]/40 focus-visible:border-[#D12126] outline-none transition-colors';
  return (
    <div>
      <div
        ref={box}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        className="relative overflow-hidden select-none cursor-grab touch-pan-y outline-none py-10 lg:py-12 [--gap:20px] lg:[--gap:36px]"
      >
        {/* one card in the flow gives the deck its height; the rest lie over it */}
        <div className="relative mx-auto w-[min(74vw,320px)] lg:w-[clamp(280px,24vw,340px)] aspect-[259/447]">
          {items.map((it, i) => {
            const on = i === sel;
            const link = 'mt-auto inline-flex w-full items-center justify-center border border-[#2A2623] px-4 py-3 text-[12px] uppercase tracking-[0.2em] text-[#2A2623] hover:bg-[#2A2623] hover:text-white transition-colors';
            return (
              <article
                key={it.name}
                ref={(c) => { cells.current[i] = c; }}
                aria-hidden={!on}
                onClick={() => { if (!on) api.current?.to(i); }}
                className={`absolute inset-0 overflow-hidden rounded-[8px] shadow-[0_0_10px_rgba(0,0,0,0.04)] will-change-transform ${on ? '' : 'cursor-pointer'}`}
              >
                <div className={`absolute inset-x-0 top-0 overflow-hidden bg-[#2A2623] transition-[height] duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)] ${on ? 'h-[42%]' : 'h-[calc(100%-4.5rem)]'}`}>
                  <img {...photo(it.image, '(min-width: 1024px) 340px, 74vw')} alt={it.name} draggable={false} loading="lazy" decoding="async" className={`h-full w-full object-cover ${it.crop ?? ''}`} />
                </div>
                <div className={`absolute inset-x-0 bottom-0 flex flex-col px-6 pt-5 pb-6 transition-[height,background-color] duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)] ${on ? 'h-[58%] bg-white' : 'h-[4.5rem] bg-transparent'}`}>
                  <h3 className="serif hl-deck-title shrink-0 truncate text-[#2A2623]">{it.name}</h3>
                  <div className={`flex min-h-0 flex-1 flex-col transition-opacity duration-500 ${on ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'}`}>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#D12126]">{it.type}</p>
                    <p className="mt-3 flex items-start gap-2 text-[13px] leading-snug text-[#4A443F]"><MapPin size={14} className="mt-0.5 shrink-0 text-[#D12126]" /> {it.location}</p>
                    <dl className="mt-4 mb-4 border-t border-[#2A2623]/12">
                      {it.stats.map(([label, value]) => (
                        <div key={label} className="flex items-baseline justify-between gap-3 border-b border-[#2A2623]/12 py-[7px]">
                          <dt className="text-[11px] uppercase tracking-[0.12em] text-[#6B645D]">{label}</dt>
                          <dd className="serif text-[1.05rem] leading-none lining-nums text-[#2A2623]">{value}</dd>
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
      </div>
      <div className="flex items-center justify-center gap-3">
        <button type="button" onClick={() => api.current?.go(-1)} aria-label={prev} className={arrow}><ChevronLeft size={18} /></button>
        <p className="min-w-[4.5rem] text-center text-[1.05rem] tabular-nums tracking-[0.12em] text-[#2A2623]" aria-live="polite">{sel + 1} / {n}</p>
        <button type="button" onClick={() => api.current?.go(1)} aria-label={next} className={arrow}><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
