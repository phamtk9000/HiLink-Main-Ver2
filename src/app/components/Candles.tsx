// Candlestick background for the dark (#361716) sections, after the hero of
// reckoner.com: a band of faint stepped candles climbs from bottom left to top
// right, bobbing gently in a slow wave. Under the pointer the candles grow a
// little and brighten — the Reckoner constants: within 200px of the pointer
// (horizontally), scaleY up to 1.05 and opacity 0.1 → 0.3, eased 10% a frame.
//
// The SVG is generated once with a fixed seed. Pointer work only runs while
// the pointer is over the section; the bobbing is CSS (theme.css,
// .hl-candles). Touch screens get the bobbing only; reduced motion, neither.
import { useEffect, useRef } from 'react';

const VB_W = 1440;
const VB_H = 810;
const STEP = 23.5;   // spacing between candles, as on Reckoner
const SEG = 67;      // height of one step of a candle

// The trend the band follows: rising with a couple of plateaus.
const TREND: [number, number][] = [[-40, 740], [240, 680], [430, 590], [560, 450], [700, 360], [860, 330], [990, 350], [1110, 280], [1260, 160], [1480, 40]];
const trendAt = (x: number) => {
  for (let k = 1; k < TREND.length; k++) {
    const [x0, y0] = TREND[k - 1], [x1, y1] = TREND[k];
    if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return TREND[TREND.length - 1][1];
};

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

// One candle: a thin wick, a stepped body, a thin wick — drawn as a single
// outline, right side down and left side back up.
function candle(cx: number, top: number, widths: number[]) {
  let d = `M${(cx + widths[0] / 2).toFixed(2)} ${top.toFixed(2)}`;
  widths.forEach((w, i) => {
    if (i) d += `H${(cx + w / 2).toFixed(2)}`;
    d += `V${(top + (i + 1) * SEG).toFixed(2)}`;
  });
  for (let i = widths.length - 1; i >= 0; i--) {
    d += `H${(cx - widths[i] / 2).toFixed(2)}V${(top + i * SEG).toFixed(2)}`;
  }
  return `${d}Z`;
}

const CANDLES: string[] = (() => {
  const rand = rng(361716);
  const out: string[] = [];
  for (let x = -20; x < VB_W + 20; x += STEP) {
    const body = 2 + Math.floor(rand() * 3);                       // 2–4 body steps
    const widths = [0.3 + rand() * 1.2];                          // top wick
    for (let b = 0; b < body; b++) widths.push(2.6 + rand() * 4.6);
    widths.push(0.15 + rand() * 0.9);                             // bottom wick
    const h = widths.length * SEG;
    const top = trendAt(x) - h / 2 + (rand() - 0.5) * 70;
    out.push(candle(x, top, widths));
  }
  return out;
})();

const MAX_DIST = 200;
const MAX_SCALE = 1.05;

export function Candles({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const host = svg?.closest('section') ?? svg?.parentElement;
    if (!svg || !host) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return undefined;

    const paths = Array.from(svg.querySelectorAll('path'));
    const scales = paths.map(() => 1);
    let centers: number[] = [];
    let mouseX = -1e4;
    let raf = 0;

    const measure = () => {
      centers = paths.map((p) => {
        const r = p.getBoundingClientRect();
        return r.left + r.width / 2;
      });
    };
    const tick = () => {
      raf = 0;
      let moving = false;
      paths.forEach((p, i) => {
        const dist = Math.min(Math.abs(mouseX - centers[i]), MAX_DIST);
        const target = MAX_SCALE - (dist / MAX_DIST) * (MAX_SCALE - 1);
        const next = scales[i] + (target - scales[i]) * 0.1;
        if (Math.abs(next - scales[i]) > 0.0002) moving = true;
        scales[i] = next;
        const k = (next - 1) / (MAX_SCALE - 1);
        p.style.transform = `scaleY(${next.toFixed(4)})`;
        p.setAttribute('fill-opacity', (0.1 + k * 0.2).toFixed(3));
      });
      if (moving || mouseX > -1e4) raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onEnter = () => { measure(); };
    const onMove = (e: PointerEvent) => { mouseX = e.clientX; start(); };
    const onLeave = () => { mouseX = -1e4; start(); };

    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`hl-candles pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      {CANDLES.map((d, i) => (
        <g key={i} style={{ animationDelay: `${(-(i / CANDLES.length) * 6).toFixed(2)}s` }}>
          <path d={d} fill="#F9F7F4" fillOpacity="0.1" />
        </g>
      ))}
    </svg>
  );
}
