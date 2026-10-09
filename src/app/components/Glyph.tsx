// HiLink's own icons: minimal, abstract line glyphs that draw themselves in
// the first time they scroll into view and then keep one small part moving
// slowly — a dot running along a line, a ring that breathes, a floor that
// rises. Motion lives in theme.css (.hl-glyph); reduced motion shows them
// drawn and still.
//
// Each export takes the name of the Lucide icon it replaces and the same props
// (size, strokeWidth, className), so a page swaps its icons by changing the
// import. Below 20px a date, address, alert or mail icon is inline metadata
// rather than a symbol, so the plain Lucide icon is kept there for legibility.
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { Bell as LBell, Calendar as LCalendar, Clock as LClock, Mail as LMail, MapPin as LMapPin, type LucideIcon } from 'lucide-react';

type Props = { size?: number | string; strokeWidth?: number | string; className?: string; style?: CSSProperties };

// One shared observer marks glyphs as seen.
let io: IntersectionObserver | null = null;
const observe = (el: Element) => {
  if (typeof IntersectionObserver === 'undefined') { el.classList.add('is-in'); return () => {}; }
  io ??= new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io!.unobserve(e.target); }
  }), { threshold: 0.4 });
  io.observe(el);
  return () => io?.unobserve(el);
};

// Drawn strokes carry their order (i) for a staggered draw-in.
const D = ({ i = 0, children }: { i?: number; children: ReactNode }) => (
  <g className="d" style={{ ['--i' as string]: i }}>{children}</g>
);

const P = (d: string) => <path d={d} pathLength={1} />;
const C = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} pathLength={1} />;
// A dot that runs along a path (a round-capped dash of almost no length).
const Run = ({ d, dur = 3, delay = 0 }: { d: string; dur?: number; delay?: number }) => (
  <path className="lv-run" d={d} pathLength={1} style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }} />
);

const SHAPES: Record<string, ReactNode> = {
  // A building: two volumes on a ground line; a floor rises through the tall one.
  tower: <>
    <D i={0}>{P('M3.5 20.5h17')}</D>
    <D i={1}>{P('M6 20.5V10h5v10.5')}</D>
    <D i={2}>{P('M11 20.5V4h7.5v16.5')}</D>
    <path className="lv lv-floor" d="M13.2 17.5h3.1" />
  </>,
  // Two linked rings that drift together and apart.
  link: <>
    <D i={0}>{C(9, 12, 5)}</D>
    <g className="lv lv-sway"><D i={1}>{C(15, 12, 5)}</D></g>
  </>,
  // A source and the waves it sends out.
  pulse: <>
    <D i={0}>{P('M12 20.5V14')}</D>
    <circle cx="12" cy="12.4" r="1.2" className="fill" />
    <g className="lv lv-wave" style={{ animationDelay: '0s' }}><D i={1}>{P('M8.7 9.2a4.7 4.7 0 0 1 6.6 0')}</D></g>
    <g className="lv lv-wave" style={{ animationDelay: '0.35s' }}><D i={2}>{P('M5.6 6.2a9 9 0 0 1 12.8 0')}</D></g>
  </>,
  // A bowl with steam rising.
  steam: <>
    <D i={0}>{P('M4 13h16')}</D>
    <D i={1}>{P('M5.5 13a6.5 6.5 0 0 0 13 0')}</D>
    <path className="lv lv-steam" d="M10 9.5V6" style={{ animationDelay: '0s' }} />
    <path className="lv lv-steam" d="M14 9.5V5" style={{ animationDelay: '0.9s' }} />
  </>,
  // A dial with one slow hand.
  dial: <>
    <D i={0}>{C(12, 12, 8)}</D>
    <path className="lv lv-turn" d="M12 12V7" />
    <circle cx="12" cy="12" r="1" className="fill" />
  </>,
  // A sphere and an orbit with something travelling round it.
  orbit: <>
    <D i={0}>{C(12, 12, 6.5)}</D>
    <D i={1}>{P('M2.5 12a9.5 3.4 0 1 0 19 0a9.5 3.4 0 1 0 -19 0')}</D>
    <Run d="M2.5 12a9.5 3.4 0 1 0 19 0a9.5 3.4 0 1 0 -19 0" dur={5} />
  </>,
  // A line that climbs, and a point running up it.
  rise: <>
    <D i={0}>{P('M3 20.5h18')}</D>
    <D i={1}>{P('M4 16.5l5-5 3.5 3L20 7')}</D>
    <Run d="M4 16.5l5-5 3.5 3L20 7" dur={2.8} />
  </>,
  // An arch — shelter — with a line scanning inside it.
  arch: <>
    <D i={0}>{P('M3.5 20.5h17')}</D>
    <D i={1}>{P('M6 20.5V11a6 6 0 0 1 12 0v9.5')}</D>
    <path className="lv lv-scan" d="M9 13h6" />
  </>,
  // Three layers; the top one lifts.
  stack: <>
    <g className="lv lv-lift"><D i={0}>{P('M12 4.5l8 4-8 4-8-4z')}</D></g>
    <D i={1}>{P('M4 12.5l8 4 8-4')}</D>
    <D i={2}>{P('M4 16.5l8 4 8-4')}</D>
  </>,
  // A sheet whose lines write themselves.
  doc: <>
    <D i={0}>{P('M6 3.5h8.5l3.5 3.5v13.5H6z')}</D>
    <path className="lv lv-write" d="M9 10.5h6" pathLength={1} style={{ animationDelay: '0s' }} />
    <path className="lv lv-write" d="M9 14h6" pathLength={1} style={{ animationDelay: '0.5s' }} />
    <path className="lv lv-write" d="M9 17.5h3.5" pathLength={1} style={{ animationDelay: '1s' }} />
  </>,
  // A lens with a focus that breathes.
  lens: <>
    <D i={0}>{C(10.5, 10.5, 6.5)}</D>
    <D i={1}>{P('M15.3 15.3l5.2 5.2')}</D>
    <circle className="lv lv-focus fill" cx="10.5" cy="10.5" r="2" />
  </>,
  // From a point to a place, with something on the way.
  route: <>
    <D i={0}>{C(5, 18.5, 2)}</D>
    <D i={1}>{P('M16 3.5h4.5V8H16z')}</D>
    <D i={2}>{P('M7 18.5C13 18.5 9.5 6 16 6')}</D>
    <Run d="M7 18.5C13 18.5 9.5 6 16 6" dur={2.6} />
  </>,
  // A grid of four; one cell after another lights.
  grid: <>
    {[[4, 4], [13, 4], [4, 13], [13, 13]].map(([x, y], k) => (
      <g key={k}>
        <rect className="lv lv-cell fill" x={x} y={y} width="7" height="7" style={{ animationDelay: `${k * 0.9}s` }} />
        <D i={k}><rect x={x} y={y} width="7" height="7" pathLength={1} /></D>
      </g>
    ))}
  </>,
  // A cross of light that turns a quarter, rests, turns again.
  spark: <>
    <g className="lv lv-spin">
      <D i={0}>{P('M12 3.5v17')}</D>
      <D i={1}>{P('M3.5 12h17')}</D>
    </g>
    <circle cx="12" cy="12" r="1.6" className="fill" />
  </>,
  // A place: a point on a stem, and a ring spreading on the ground.
  pin: <>
    <D i={0}>{C(12, 8.5, 4)}</D>
    <D i={1}>{P('M12 12.5v8')}</D>
    <ellipse className="lv lv-ring" cx="12" cy="20.5" rx="4" ry="1.3" />
  </>,
  // ── The five services. Each has one symbol, used wherever that service
  //    appears (home, solutions, its own page) and for nothing else.
  // Property Management: a building whose windows light one after another.
  'svc-property': <>
    <D i={0}>{P('M3.5 20.5h17')}</D>
    <D i={1}>{P('M7 20.5V5h10v15.5')}</D>
    <D i={2}>{P('M10.5 20.5V17h3v3.5')}</D>
    {[[9.2, 7.6], [12.8, 7.6], [9.2, 11.4], [12.8, 11.4]].map(([x, y], k) => (
      <g key={k}>
        <rect className="lv lv-cell fill" x={x} y={y} width="2" height="2" style={{ animationDelay: `${k * 0.9}s` }} />
        <D i={3}><rect x={x} y={y} width="2" height="2" pathLength={1} /></D>
      </g>
    ))}
  </>,
  // Workspace Leasing: a desk and a screen, a line being typed on it.
  'svc-workspace': <>
    <D i={0}>{P('M3.5 17.5h17')}</D>
    <D i={1}>{P('M6 17.5v3M18 17.5v3')}</D>
    <D i={2}>{P('M7 5h10v7.5H7z')}</D>
    <D i={3}>{P('M12 12.5v5')}</D>
    <path className="lv lv-write" d="M9.3 8.8h5.4" pathLength={1} />
  </>,
  // Business Services: a briefcase; the handle lifts, the clasp glows.
  'svc-business': <>
    <g className="lv lv-lift"><D i={0}>{P('M9 8V5.5h6V8')}</D></g>
    <D i={1}>{P('M4 8h16v11.5H4z')}</D>
    <D i={2}>{P('M4 12.5h16')}</D>
    <circle className="lv lv-focus fill" cx="12" cy="12.5" r="1.3" />
  </>,
  // Concierge Services: a service bell, and the ring it sends out.
  'svc-concierge': <>
    <D i={0}>{P('M3.5 18h17')}</D>
    <D i={1}>{P('M5.5 18a6.5 6.5 0 0 1 13 0')}</D>
    <D i={2}>{P('M12 11.5V10')}</D>
    <circle cx="12" cy="9" r="1.1" className="fill" />
    <g className="lv lv-wave" style={{ animationDelay: '0s' }}><D i={3}>{P('M9.4 6.4a3.7 3.7 0 0 1 5.2 0')}</D></g>
    <g className="lv lv-wave" style={{ animationDelay: '0.35s' }}><D i={3}>{P('M7.5 4.3a6.4 6.4 0 0 1 9 0')}</D></g>
  </>,
  // Industrial & Logistics: a sawtooth-roof warehouse; the roller door lifts.
  'svc-industrial': <>
    <D i={0}>{P('M3.5 20.5h17')}</D>
    <D i={1}>{P('M4.5 20.5v-10l5-3v3l5-3v3l5-3v13')}</D>
    <D i={2}>{P('M9.5 20.5V15h5v5.5')}</D>
    <path className="lv lv-roll" d="M10.4 19h3.2" />
  </>,
};

function glyph(kind: keyof typeof SHAPES, Fallback?: LucideIcon) {
  function Glyph({ size = 24, strokeWidth = 1.25, className = '', style }: Props) {
    const ref = useRef<SVGSVGElement>(null);
    useEffect(() => (ref.current ? observe(ref.current) : undefined), []);
    if (Fallback && Number(size) < 20) return <Fallback size={size} strokeWidth={strokeWidth} className={className} style={style} />;
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={Math.min(Number(strokeWidth), 1.5)}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`hl-glyph ${className}`}
        style={style}
        aria-hidden="true"
      >
        {SHAPES[kind]}
      </svg>
    );
  }
  Glyph.displayName = `Glyph(${kind})`;
  return Glyph;
}

export const Building2 = glyph('tower');
export const Building = glyph('tower');
export const Home = glyph('tower');
export const Users = glyph('link');
export const Handshake = glyph('link');
export const HeartHandshake = glyph('link');
export const Heart = glyph('link');
export const Wifi = glyph('pulse');
export const Bell = glyph('pulse', LBell);
export const MonitorSmartphone = glyph('pulse');
export const Coffee = glyph('steam');
export const UtensilsCrossed = glyph('steam');
export const Calendar = glyph('dial', LCalendar);
export const Clock = glyph('dial', LClock);
export const Globe = glyph('orbit');
export const Globe2 = glyph('orbit');
export const Compass = glyph('orbit');
export const Target = glyph('orbit');
export const TrendingUp = glyph('rise');
export const LineChart = glyph('rise');
export const BarChart = glyph('rise');
export const DollarSign = glyph('rise');
export const Shield = glyph('arch');
export const ShieldCheck = glyph('arch');
export const Lock = glyph('arch');
export const Key = glyph('arch');
export const Scale = glyph('arch');
export const FileCheck = glyph('arch');
export const Layers = glyph('stack');
export const Briefcase = glyph('stack');
export const ClipboardList = glyph('doc');
export const FileSignature = glyph('doc');
export const Mail = glyph('doc', LMail);
export const Search = glyph('lens');
export const Rocket = glyph('route');
export const Truck = glyph('route');
export const Plane = glyph('route');
export const Settings = glyph('grid');
export const LayoutDashboard = glyph('grid');
export const Package = glyph('grid');
export const Warehouse = glyph('svc-industrial');
export const Factory = glyph('svc-industrial');
export const Sparkles = glyph('spark');
export const GraduationCap = glyph('spark');
export const MapPin = glyph('pin', LMapPin);

// One symbol per service, keyed by the service's path (see SERVICES in site.ts).
const SERVICE_GLYPHS: Record<string, ReturnType<typeof glyph>> = {
  '/property-management': glyph('svc-property'),
  '/workspace-leasing': glyph('svc-workspace'),
  '/business-services': glyph('svc-business'),
  '/concierge-services': glyph('svc-concierge'),
  '/industrial-logistics': glyph('svc-industrial'),
};
export function ServiceIcon({ path, ...props }: Props & { path: string }) {
  const Icon = SERVICE_GLYPHS[path];
  return Icon ? <Icon {...props} /> : null;
}
