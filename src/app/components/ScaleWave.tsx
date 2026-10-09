// "Built to connect. Designed to scale." — HiLink's scale in numbers, laid out
// like the Stripe homepage section "Scale with confidence": a framed panel, a
// headline that runs on in a muted voice, a ribbon of light lines flowing
// across behind it, and the figures along the bottom, counting up as the
// section arrives.
//
// The ribbon is a single twisting surface of ~110 fine lines on a deep ink
// ground, coloured peach → pink → violet like Stripe's, drawn on a 2D canvas
// with additive light. It drifts slowly while on screen
// and stops when off screen. Reduced motion: still ribbon, final numbers.
import { useEffect, useRef, useState } from 'react';
import { LOCATIONS } from '../data/locations';
import { PARTNERS, SERVICES } from '../data/site';
import { useLang } from '../lib/i18n';
import { Flag } from './Flag';

const T = {
  en: {
    eyebrow: 'HiLink at a glance',
    title: 'Built to connect.',
    rest: 'Designed to scale.',
    lead: 'From a business address to a whole floor, HiLink grows with the companies it serves — across central Hanoi, under one relationship.',
    stats: [
      { n: LOCATIONS.length, l: 'locations in central Hanoi' },
      { n: PARTNERS.length, l: 'partner companies' },
      { n: SERVICES.length, l: 'service lines, one point of contact' },
      { n: 2020, from: 2010, l: 'serving businesses since' },
    ],
  },
  vi: {
    eyebrow: 'HiLink qua những con số',
    title: 'Kiến tạo để kết nối.',
    rest: 'Thiết kế để mở rộng.',
    lead: 'Từ địa chỉ doanh nghiệp đến nguyên một sàn, HiLink lớn lên cùng các doanh nghiệp đồng hành — giữa trung tâm Hà Nội, trong một mối quan hệ duy nhất.',
    stats: [
      { n: LOCATIONS.length, l: 'địa điểm giữa trung tâm Hà Nội' },
      { n: PARTNERS.length, l: 'doanh nghiệp đối tác' },
      { n: SERVICES.length, l: 'mảng dịch vụ, một đầu mối' },
      { n: 2020, from: 2010, l: 'đồng hành cùng doanh nghiệp từ' },
    ],
  },
};

// Each figure carries its own slice of the ribbon's gradient, as on Stripe.
const NUM_GRADIENTS = [
  'linear-gradient(95deg, #FFE2D6 0%, #FFB49A 50%, #F49AC0 100%)',
  'linear-gradient(95deg, #FFB0A0 0%, #F070B0 55%, #D46CF0 100%)',
  'linear-gradient(95deg, #E683C8 0%, #B65BFF 55%, #9A6BFF 100%)',
  'linear-gradient(95deg, #B07CFF 0%, #8A64FF 55%, #6E7BFF 100%)',
];

/** Counts from `from` to `to` once `run` turns true (easeOutCubic, 1.6s). */
function useCount(to: number, from: number, run: boolean, still: boolean) {
  const [v, setV] = useState(still ? to : from);
  useEffect(() => {
    if (!run || still) { if (still) setV(to); return undefined; }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1600);
      setV(Math.round(from + (to - from) * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, still, to, from]);
  return v;
}

function Stat({ n, from = 0, l, i, run, still }: { n: number; from?: number; l: string; i: number; run: boolean; still: boolean }) {
  const v = useCount(n, from, run, still);
  return (
    <div className="px-6 lg:px-8 py-8 lg:py-10">
      <div
        className="text-[3rem] lg:text-[4.25rem] leading-none tracking-[-0.03em] font-light tabular-nums bg-clip-text text-transparent"
        style={{ backgroundImage: NUM_GRADIENTS[i % NUM_GRADIENTS.length], WebkitBackgroundClip: 'text' }}
        aria-label={String(n)}
      >
        {v}
      </div>
      <p className="mt-3 text-[15px] text-white/85">{l}</p>
    </div>
  );
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export function ScaleWave() {
  const { lang } = useLang();
  const t = T[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [counted, setCounted] = useState(false);
  const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!section || !canvas || !ctx) return undefined;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = false;
    const t0 = performance.now();

    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      draw(t0);
    };

    // The ribbon is one twisting surface of fine lines, as on Stripe: thin and
    // edge-on at the left, turning through itself, then opening out wide and
    // rising to the right. Each line is drawn in short segments whose
    // brightness follows the surface's depth, so the near face reads lighter
    // than the far one; colour runs along the ribbon (peach → pink → violet).
    function draw(now: number) {
      const time = still ? 0 : (now - t0) / 1000;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = 'lighter';
      ctx!.lineWidth = 1;
      const narrow = w < 640;
      const lines = narrow ? 56 : 110;
      const step = narrow ? 7 : 5;
      const seg = 9; // points per segment
      const g = ctx!.createLinearGradient(0, 0, w, 0);
      [[0, 'rgba(255,190,160,0)'], [0.1, 'rgba(255,176,150,1)'], [0.3, 'rgba(255,128,128,1)'], [0.48, 'rgba(240,104,176,1)'],
        [0.68, 'rgba(168,72,255,1)'], [0.9, 'rgba(118,72,255,1)'], [1, 'rgba(110,80,255,0)']].forEach(([o, c]) => g.addColorStop(o as number, c as string));
      ctx!.strokeStyle = g;
      const pts: [number, number, number][] = [];
      for (let i = 0; i < lines; i++) {
        const sv = i / (lines - 1) - 0.5;
        pts.length = 0;
        for (let x = -step; x <= w + step; x += step) {
          const u = x / w;
          const centre = h * 0.6 - h * 0.24 * smooth(0.3, 0.85, u) + Math.sin(u * 2.4 + time * 0.22) * h * 0.025;
          const width = h * (0.13 + 0.42 * smooth(0.22, 0.95, u));
          // Each line turns a little ahead of the next, so the twist is woven
          // rather than pinched to a single point.
          const theta = Math.PI * (0.18 + 0.82 * smooth(0.12, 0.8, u)) + sv * 0.55 * smooth(0.15, 0.6, u) + 0.12 * Math.sin(time * 0.3 + u * 2.2);
          const y = centre + sv * width * Math.cos(theta);
          const depth = sv * Math.sin(theta); // -0.5 (far) … 0.5 (near)
          pts.push([x, y, depth]);
        }
        for (let k = 0; k < pts.length - 1; k += seg) {
          const end = Math.min(pts.length - 1, k + seg);
          const mid = pts[(k + end) >> 1][2];
          ctx!.globalAlpha = 0.07 + 0.26 * (mid + 0.5);
          ctx!.beginPath();
          ctx!.moveTo(pts[k][0], pts[k][1]);
          for (let m = k + 1; m <= end; m++) ctx!.lineTo(pts[m][0], pts[m][1]);
          ctx!.stroke();
        }
      }
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = 'source-over';
    }

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const run = () => { if (!raf && !still) raf = requestAnimationFrame(loop); };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) run();
      if (e.intersectionRatio > 0.3) setCounted(true);
    }, { threshold: [0, 0.3] });
    const ro = new ResizeObserver(resize);
    const onVis = () => { if (!document.hidden) run(); };
    io.observe(section);
    ro.observe(canvas.parentElement!);
    document.addEventListener('visibilitychange', onVis);
    resize();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [still]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0C1738] text-white" aria-labelledby="hl-scale-title">
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="relative border-x border-[#24305E]">
          <div className="border-b border-[#24305E] h-16 lg:h-20" aria-hidden="true" />
          {/* The ribbon, behind the copy. */}
          <div className="pointer-events-none absolute inset-x-0 top-16 lg:top-20 bottom-0" aria-hidden="true">
            <canvas ref={canvasRef} className="absolute inset-0" />
          </div>

          <div className="relative px-6 lg:px-8 pt-14 lg:pt-20">
            <p className="mb-6 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#F7A8B8]">
              <Flag /> {t.eyebrow}
            </p>
            <h2 id="hl-scale-title" className="serif max-w-4xl leading-[1.08]">
              {t.title} <span className="text-[#8E9BCB]">{t.rest}</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-[#B4BCDD]">{t.lead}</p>
          </div>

          <div className="h-[220px] sm:h-[280px] lg:h-[300px]" aria-hidden="true" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4">
            {t.stats.map((s, i) => (
              <Stat key={s.l} i={i} n={s.n} from={'from' in s ? s.from : 0} l={s.l} run={counted} still={still} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
