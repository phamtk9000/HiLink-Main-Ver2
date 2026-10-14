// Facts and figures set out as on hines.com: a statement in two voices on
// the left (a line in red, then a larger one in ink), and on the right a
// stack of large serif figures between hairlines, each with a small label and
// a footnote mark; the footnotes (source and date) sit beneath in small type.
// Numbers count up once as the stack comes into view.
import { useEffect, useRef, useState } from 'react';

export type Figure = { value: number | string; decimals?: number; pre?: string; suf?: string; label: string; note?: number };

function Count({ to, decimals = 0, run, comma }: { to: number; decimals?: number; run: boolean; comma: boolean }) {
  const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // The true value shows until the count starts, so a figure can never be
  // left standing at zero.
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!run || still) return undefined;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1500);
      setV(to * (1 - (1 - p) ** 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, still, to]);
  const s = v.toFixed(decimals);
  return <>{comma ? s.replace('.', ',') : s}</>;
}

/** The stack of figures. `pairs` sets how many of the last figures sit two to a row. */
export function FigureStack({ figures, notes = [], pairs = 0, lang, dark = false }: { figures: Figure[]; notes?: string[]; pairs?: number; lang: 'en' | 'vi'; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const rule = dark ? 'border-white/15' : 'border-[#2A2623]/15';
  const ink = dark ? 'text-white/75' : 'text-[#2A2623]';
  const num = dark ? 'text-[#FF8A7A]' : 'text-[#D12126]';
  const cell = (f: Figure, big: boolean) => (
    <>
      <div className={`serif leading-none lining-nums tabular-nums ${num} ${big ? 'text-[3.25rem] sm:text-[4.25rem] lg:text-[4.75rem]' : 'text-[2.75rem] lg:text-[3.5rem]'}`}>
        <span className="sr-only">{`${f.pre ?? ''}${f.value}${f.suf ?? ''}`}</span>
        <span aria-hidden="true">
          {f.pre && <span className="mr-1.5 align-top text-[0.36em] leading-[1.9] tracking-[0.04em]">{f.pre}</span>}
          {typeof f.value === 'number' ? <Count to={f.value} decimals={f.decimals} run={seen} comma={lang === 'vi'} /> : f.value}
          {f.suf && <span className="ml-1 text-[0.5em]">{f.suf}</span>}
        </span>
      </div>
      <p className={`mt-3 text-[14px] leading-snug ${ink}`}>{f.label}{f.note ? <sup className="ml-0.5 text-[10px]">{f.note}</sup> : null}</p>
    </>
  );
  const single = figures.slice(0, figures.length - pairs), paired = figures.slice(figures.length - pairs);
  return (
    <div ref={ref}>
      {single.map((f) => <div key={f.label} className={`border-t ${rule} py-8 text-center lg:text-left`}>{cell(f, true)}</div>)}
      {paired.length > 0 && (
        <div className={`grid grid-cols-2 border-t ${single.length === 0 && notes.length === 0 ? 'border-b' : ''} ${rule}`}>
          {paired.map((f, k) => <div key={f.label} className={`px-3 py-9 lg:py-12 text-center ${k % 2 ? `border-l ${rule}` : ''} ${k > 1 ? `border-t ${rule}` : ''}`}>{cell(f, false)}</div>)}
        </div>
      )}
      {notes.length > 0 && (
        <ol className={`border-t ${rule} pt-5 space-y-1.5 text-[12px] leading-relaxed ${dark ? 'text-white/55' : 'text-[#6B645D]'}`}>
          {notes.map((n, k) => <li key={n} className="flex gap-2"><sup className="mt-1.5">{k + 1}</sup><span>{n}</span></li>)}
        </ol>
      )}
    </div>
  );
}

/** The statement in two voices: a line in red, then a larger one in ink. */
export function Statement({ heading, red, ink, children }: { heading?: string; red: string; ink?: string; children?: React.ReactNode }) {
  return (
    <div>
      {heading && (<><h2 className="serif hl-card-title text-[#2A2623]">{heading}</h2><span className="mt-6 block h-px w-10 bg-[#D12126]" aria-hidden="true" /></>)}
      <p className={`serif text-[1.35rem] lg:text-[1.6rem] leading-[1.4] text-[#D12126] ${heading ? 'mt-8' : ''}`}>{red}</p>
      {ink && <p className="serif mt-10 text-[1.9rem] lg:text-[2.6rem] leading-[1.18] text-[#2A2623]">{ink}</p>}
      {children}
    </div>
  );
}
