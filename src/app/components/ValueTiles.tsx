// Why join us (Careers): six white tiles; under the pointer (or keyboard
// focus) each fills from its lower left corner with an abstract ground of its
// own, after the collectives wall on hipress.vercel.app — solid colour, a
// fan of fine rays, interlocking rings, diagonal bands, quarter discs,
// stripes — all in HiLink's palette, and the words turn to read on it (on the
// patterned grounds they sit on a band of solid colour). On touch screens a
// tile fills while it crosses the middle of the screen. Reduced motion
// swaps the sweep for a plain change.
import { useEffect, useRef, useState, type ReactNode } from 'react';

type Ground = { bg: string; ink: string; soft: string; mark: string; band?: string; rings?: boolean };
const GROUNDS: Ground[] = [
  { bg: '#2E3A33', ink: '#F8F6F1', soft: 'rgba(248,246,241,0.78)', mark: '#F8F6F1', rings: true },
  { bg: 'repeating-conic-gradient(from 270deg at 100% 0%, rgba(248,246,241,0.13) 0deg 0.6deg, transparent 0.6deg 6deg), #1B1412', ink: '#F8F6F1', soft: 'rgba(248,246,241,0.75)', mark: '#F06A6E' },
  { bg: 'repeating-radial-gradient(circle at 100% 0%, transparent 0 26px, rgba(248,246,241,0.16) 26px 27px), #361716', ink: '#F8F6F1', soft: 'rgba(248,246,241,0.78)', mark: '#F8F6F1' },
  {
    bg: 'linear-gradient(135deg, #F8F6F1 0 14%, #6B645D 14% 26%, #361716 26% 38%, #2A2623 38% 50%, transparent 50%), linear-gradient(#2E3A33 0 33%, #361716 33% 66%, #6B645D 66%)',
    ink: '#2A2623', soft: '#4A443F', mark: '#2A2623', band: '#F8F6F1',
  },
  {
    bg: 'radial-gradient(circle at 0% 100%, #2E3A33 0 44%, transparent 44.5%), radial-gradient(circle at 100% 100%, #F8F6F1 0 44%, transparent 44.5%), #6B645D',
    ink: '#F8F6F1', soft: '#F8F6F1', mark: '#F8F6F1', band: '#6B645D',
  },
  { bg: 'repeating-linear-gradient(90deg, #2A2623 0 18px, #1B1412 18px 36px)', ink: '#F8F6F1', soft: 'rgba(248,246,241,0.78)', mark: '#F06A6E' },
];

function Tile({ g, icon, title, text }: { g: Ground; icon: ReactNode; title: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [touchOn, setTouchOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: none)').matches) return undefined;
    const io = new IntersectionObserver(([e]) => setTouchOn(e.isIntersecting), { rootMargin: '-42% 0px -42% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const vars = { '--g-bg': g.bg, '--g-ink': g.ink, '--g-soft': g.soft, '--g-mark': g.mark, '--g-band': g.band ?? 'transparent' } as React.CSSProperties;
  return (
    <div ref={ref} tabIndex={0} style={vars} className={`hl-tile group relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-white p-8 outline-none lg:min-h-[340px] lg:p-10 ${touchOn ? 'is-on' : ''}`}>
      <span className="hl-tile__ground" aria-hidden="true">
        {g.rings && (
          <svg viewBox="0 0 200 120" className="absolute -right-10 -top-6 h-[78%] w-auto opacity-25" fill="none" stroke="#F8F6F1" strokeWidth="1">
            <circle cx="70" cy="60" r="52" /><circle cx="130" cy="60" r="52" />
          </svg>
        )}
      </span>
      <span className="hl-tile__mark relative">{icon}</span>
      <div className="relative">
        <h3 className="serif text-2xl mb-3"><span className="hl-tile__band hl-tile__ink">{title}</span></h3>
        <p className="leading-relaxed text-[15px]"><span className="hl-tile__band hl-tile__soft">{text}</span></p>
      </div>
    </div>
  );
}

export function ValueTiles({ items, icons }: { items: [string, string][]; icons: ReactNode[] }) {
  return (
    <div className="[display:grid] sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2623]/10">
      {items.map(([title, text], i) => (
        <Tile key={title} g={GROUNDS[i % GROUNDS.length]} icon={icons[i]} title={title} text={text} />
      ))}
    </div>
  );
}
