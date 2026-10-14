// The building blocks of the two club pages (Business Club, Concierge), laid
// out after maslows.com and pavilion.club: a hero of photographs fading into
// one another under a centred title; section titles in spaced capitals
// between two hairlines; photographs with centred captions; and the
// "Explore" showcase.
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { photo } from '../lib/photo';

/** A section title in spaced capitals, a hairline running out to either side. */
export function RuleTitle({ children, dark = false, as: Tag = 'h2' }: { children: React.ReactNode; dark?: boolean; as?: 'h2' | 'h3' }) {
  const line = dark ? 'bg-white/20' : 'bg-[#2A2623]/15';
  return (
    <div className="flex items-center gap-6 lg:gap-10">
      <span className={`h-px flex-1 ${line}`} aria-hidden="true" />
      <Tag className={`serif hl-club-title text-center ${dark ? 'text-white' : 'text-[#2A2623]'}`}>{children}</Tag>
      <span className={`h-px flex-1 ${line}`} aria-hidden="true" />
    </div>
  );
}

/** Full-bleed photographs fading into one another every six seconds, under a scrim. */
export function HeroFade({ images }: { images: string[] }) {
  const [shot, setShot] = useState(0);
  useEffect(() => {
    if (images.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setShot((n) => (n + 1) % images.length), 6000);
    return () => window.clearInterval(timer);
  }, [images.length]);
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((src, k) => (
        <img key={src} {...photo(src)} alt="" fetchPriority={k === 0 ? 'high' : 'low'} loading={k === 0 ? 'eager' : 'lazy'} decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[2200ms] ease-out ${k === shot ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'}`} />
      ))}
      <div className="absolute inset-0 bg-[#1B1412]/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1412]/70 via-transparent to-[#1B1412]/35" />
    </div>
  );
}

export type Shot = { src: string; caption?: string };

/**
 * The showcase, built like the "Explore" gallery on maslows.com/membership
 * (Flickity there): the photograph in the middle takes two thirds of the
 * screen (a little more on phones), its neighbours stand at four fifths of its
 * size to either side and run off the edges; it moves on by itself every six seconds and can be
 * dragged, swiped, clicked (a neighbour comes to the middle) or stepped with
 * the arrows. The motion is Flickity's own spring (attraction 0.025,
 * friction 0.28). It runs round without end.
 */
/** With `autoplay` off it moves only when asked (arrows, drag, keys, a click). */
export function Showcase({ shots, prev, next, className = '', autoplay = true }: { shots: Shot[]; prev: string; next: string; className?: string; autoplay?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const cells = useRef<(HTMLDivElement | null)[]>([]);
  const api = useRef<{ go: (d: number) => void; to: (i: number) => void } | null>(null);
  const [sel, setSel] = useState(0);
  const n = shots.length;

  useEffect(() => {
    const el = box.current;
    if (!el || n < 3) return undefined;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pos = 0, vel = 0, target = 0, raf = 0, timer = 0, visible = false, hover = false;
    let drag: { x: number; pos: number; moved: number; last: number; lastT: number; v: number } | null = null;
    const width = () => (cells.current[0]?.offsetWidth ?? el.clientWidth * 0.66);
    const wrap = (d: number) => ((((d + n / 2) % n) + n) % n) - n / 2;

    const render = () => {
      const w = width();
      cells.current.forEach((c, i) => {
        if (!c) return;
        const off = wrap(i - pos);
        const far = Math.abs(off) > 2.2;
        c.style.transform = `translate3d(${off * w}px,0,0) scale(${1 - 0.2 * Math.min(1, Math.abs(off))})`;
        c.style.visibility = far ? 'hidden' : 'visible';
        c.style.zIndex = Math.abs(off) < 0.5 ? '2' : '1';
      });
      const at = ((Math.round(pos) % n) + n) % n;
      setSel((s) => (s === at ? s : at));
    };
    const tick = () => {
      raf = 0;
      if (!drag) {
        vel += (target - pos) * 0.025;
        vel *= 1 - 0.28;
        pos += vel;
        if (Math.abs(target - pos) < 0.0005 && Math.abs(vel) < 0.0005) { pos = target; vel = 0; }
      }
      render();
      if (drag || pos !== target) raf = requestAnimationFrame(tick);
    };
    const run = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const auto = () => {
      window.clearInterval(timer);
      if (!autoplay || still || !visible || hover || drag) return;
      timer = window.setInterval(() => { target += 1; run(); }, 6000);
    };
    api.current = {
      go: (d) => { target = Math.round(target) + d; run(); auto(); },
      to: (i) => { target = Math.round(pos) + Math.round(wrap(i - pos)); run(); auto(); },
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { x: e.clientX, pos, moved: 0, last: e.clientX, lastT: e.timeStamp, v: 0 };
      window.clearInterval(timer);
      run();
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      if (drag.moved > 6) { el.setPointerCapture?.(e.pointerId); el.style.cursor = 'grabbing'; }
      const dt = Math.max(1, e.timeStamp - drag.lastT);
      drag.v = (e.clientX - drag.last) / dt;
      drag.last = e.clientX; drag.lastT = e.timeStamp;
      pos = drag.pos - dx / width();
    };
    const up = (e: PointerEvent) => {
      if (!drag) return;
      const d = drag; drag = null;
      el.style.cursor = '';
      if (d.moved > 6) {
        // let go: carry on in the direction of the throw, to the nearest photograph
        const thrown = pos - (d.v * 180) / width();
        target = Math.round(thrown);
        if (target === Math.round(d.pos) && Math.abs(pos - d.pos) > 0.12) target += pos > d.pos ? 1 : -1;
        vel = (-d.v * 16) / width();
        // a drag is not a click
        const stop = (ev: Event) => { ev.stopPropagation(); ev.preventDefault(); };
        el.addEventListener('click', stop, { capture: true, once: true });
        window.setTimeout(() => el.removeEventListener('click', stop, true), 0);
      } else {
        target = Math.round(pos);
      }
      el.releasePointerCapture?.(e.pointerId);
      run(); auto();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { api.current?.go(1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { api.current?.go(-1); e.preventDefault(); }
    };
    const enter = () => { hover = true; auto(); };
    const leave = () => { hover = false; auto(); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; auto(); }, { threshold: 0.3 });
    const ro = new ResizeObserver(render);
    io.observe(el); ro.observe(el);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('keydown', key);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    render();
    return () => {
      cancelAnimationFrame(raf); window.clearInterval(timer);
      io.disconnect(); ro.disconnect();
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('keydown', key);
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, [n, autoplay]);

  return (
    <div className={className}>
      <div
        ref={box}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        className="relative w-full overflow-hidden select-none cursor-grab touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-[#D12126]/50 h-[49.2vw] sm:h-[45vw]"
      >
        {shots.map((s, i) => (
          <div
            key={s.src}
            ref={(c) => { cells.current[i] = c; }}
            onClick={() => { if (i !== sel) api.current?.to(i); }}
            aria-hidden={i !== sel}
            className={`absolute top-0 left-[14vw] sm:left-[17vw] h-full w-[72vw] sm:w-[66vw] will-change-transform ${i === sel ? '' : 'cursor-pointer'}`}
          >
            <img {...photo(s.src, '(min-width: 640px) 66vw, 72vw')} alt={s.caption ?? ''} draggable={false} loading={i < 2 || i === n - 1 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-7 lg:mt-9 flex items-center justify-center gap-6 px-6">
        <button type="button" onClick={() => api.current?.go(-1)} aria-label={prev} className="grid h-10 w-10 place-items-center rounded-full border border-[#2A2623]/25 text-[#2A2623] hover:border-[#D12126] hover:text-[#D12126] transition-colors"><ArrowLeft size={15} /></button>
        <p className="min-w-[14rem] text-center text-[12px] uppercase tracking-[0.18em] text-[#6B645D]" aria-live="polite">
          <span className="tabular-nums text-[#2A2623]">{String(sel + 1).padStart(2, '0')}</span> / <span className="tabular-nums">{String(n).padStart(2, '0')}</span>
          {shots[sel].caption && <span className="ml-3 normal-case tracking-normal text-[14px] text-[#2A2623]">{shots[sel].caption}</span>}
        </p>
        <button type="button" onClick={() => api.current?.go(1)} aria-label={next} className="grid h-10 w-10 place-items-center rounded-full border border-[#2A2623]/25 text-[#2A2623] hover:border-[#D12126] hover:text-[#D12126] transition-colors"><ArrowRight size={15} /></button>
      </div>
    </div>
  );
}
