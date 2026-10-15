// Why join us (Careers): six white tiles; under the pointer (or keyboard
// focus) each fills from its lower left corner with a bright ground of its
// own, after the collectives wall on hipress.vercel.app — emerald with
// HiLink's two rings, ochre with rising steps, teal with a globe's circles,
// diagonal bands, quarter discs, HiLink red with a burst — and the words
// turn to read on it (on the busiest grounds they sit on a band of solid
// colour). On touch screens a tile fills while it crosses the middle of the
// screen. Reduced motion swaps the sweep for a plain change.
import { useEffect, useRef, useState, type ReactNode } from 'react';

const EMERALD = '#1E5B47', OCHRE = '#E3B04B', TEAL = '#14465A', TERRA = '#C2553A', CELADON = '#CFE3D4', CREAM = '#F8F6F1', INK = '#1B1412';

type Ground = { bg: string; ink: string; soft: string; mark: string; band?: string; art?: ReactNode };
const RAYS = Array.from({ length: 16 }, (_, k) => k * 11.25);
const GROUNDS: Ground[] = [
  {
    bg: EMERALD, ink: CREAM, soft: 'rgba(248,246,241,0.85)', mark: CELADON,
    art: (
      <svg viewBox="0 0 200 120" className="absolute -right-[12%] -top-[14%] w-[78%]" fill="none" stroke={CELADON} strokeWidth="7">
        <circle cx="72" cy="60" r="46" /><circle cx="128" cy="60" r="46" stroke={OCHRE} />
      </svg>
    ),
  },
  {
    bg: OCHRE, ink: INK, soft: 'rgba(27,20,18,0.8)', mark: INK,
    art: (
      <svg viewBox="0 0 120 100" className="absolute right-0 top-0 w-[52%]" preserveAspectRatio="xMaxYMin meet">
        <rect x="0" y="70" width="30" height="30" fill={TERRA} /><rect x="30" y="47" width="30" height="53" fill={CREAM} />
        <rect x="60" y="24" width="30" height="76" fill={TERRA} /><rect x="90" y="0" width="30" height="100" fill={INK} />
      </svg>
    ),
  },
  {
    bg: `repeating-radial-gradient(circle at 100% 0%, ${CELADON} 0 2px, transparent 2px 24px), ${TEAL}`, ink: CREAM, soft: 'rgba(248,246,241,0.85)', mark: OCHRE, band: TEAL,
  },
  {
    bg: `linear-gradient(135deg, ${CREAM} 0 14%, ${OCHRE} 14% 26%, #D12126 26% 38%, ${INK} 38% 50%, transparent 50%), linear-gradient(${EMERALD} 0 33%, ${TERRA} 33% 66%, ${OCHRE} 66%)`,
    ink: INK, soft: '#3A332E', mark: INK, band: CREAM,
  },
  {
    bg: `radial-gradient(circle at 0% 100%, ${EMERALD} 0 44%, transparent 44.5%), radial-gradient(circle at 100% 100%, ${OCHRE} 0 44%, transparent 44.5%), ${CELADON}`,
    ink: INK, soft: '#3A332E', mark: INK, band: CELADON,
  },
  {
    bg: '#D12126', ink: CREAM, soft: 'rgba(248,246,241,0.88)', mark: CREAM,
    art: (
      <svg viewBox="-60 -60 120 120" className="absolute -right-[6%] -top-[10%] w-[52%]" stroke={CREAM} strokeWidth="3.5" strokeLinecap="round">
        {RAYS.map((a) => <line key={a} x1="0" y1="-14" x2="0" y2="-54" transform={`rotate(${a})`} />)}
        <circle r="7" fill={OCHRE} stroke="none" />
      </svg>
    ),
  },
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
        {g.art}
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
