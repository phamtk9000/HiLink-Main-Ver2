// "Built to connect. Designed to scale." — HiLink's scale in numbers, laid out
// like the Stripe homepage section "Scale with confidence": a framed panel, a
// headline that runs on in a muted voice, a ribbon of light lines flowing
// across behind it, and the figures along the bottom, counting up as the
// section arrives.
//
// The ribbon is two bundles of fine lines that twist through each other —
// warm coral narrowing to the left, HiLink red opening out to the right —
// drawn on a 2D canvas with additive light. It drifts slowly while on screen
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
  'linear-gradient(100deg, #FFE1D2 0%, #FFB49A 55%, #FF8F7E 100%)',
  'linear-gradient(100deg, #FFC2AE 0%, #FF8F7E 55%, #FF6B6F 100%)',
  'linear-gradient(100deg, #FF9C8C 0%, #FF6B6F 55%, #F2475A 100%)',
  'linear-gradient(100deg, #FF7F86 0%, #F2475A 55%, #E0334E 100%)',
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

    // One bundle: `face` 1 or -1 sets which way it twists, so the two bundles
    // cross where the twist passes through zero.
    const bundle = (time: number, face: 1 | -1, colors: [number, string][], lines: number, step: number) => {
      const g = ctx.createLinearGradient(0, 0, w, 0);
      colors.forEach(([o, c]) => g.addColorStop(o, c));
      ctx.strokeStyle = g;
      for (let i = 0; i < lines; i++) {
        const s = i / (lines - 1) - 0.5;
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const u = x / w;
          const centre = h * 0.6 - h * 0.2 * smooth(0.38, 0.95, u) + Math.sin(u * 3.1 + time * 0.25) * h * 0.035;
          const spread = h * (0.035 + 0.3 * smooth(0.32, 1, u) + 0.06 * (1 - smooth(0, 0.3, u)));
          const twist = Math.cos((u * 1.3 - 0.42) * Math.PI * 1.35 + time * 0.18);
          const ripple = Math.sin(u * 7 + time * 0.55 + s * 3) * h * 0.008;
          const y = centre + face * s * spread * twist + s * spread * 0.18 + ripple;
          if (x === -step) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    function draw(now: number) {
      const time = still ? 0 : (now - t0) / 1000;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = 'lighter';
      ctx!.lineWidth = 1;
      const narrow = w < 640;
      const lines = narrow ? 34 : 64;
      const step = narrow ? 8 : 6;
      // Warm bundle: strong on the left, fading to the right.
      bundle(time, 1, [[0, 'rgba(255,170,140,0)'], [0.08, 'rgba(255,170,140,0.32)'], [0.45, 'rgba(255,128,110,0.3)'], [0.8, 'rgba(255,110,110,0.08)'], [1, 'rgba(255,110,110,0)']], lines, step);
      // Red bundle: opens out to the right.
      bundle(time, -1, [[0, 'rgba(242,71,90,0)'], [0.2, 'rgba(242,71,90,0.1)'], [0.5, 'rgba(242,71,90,0.32)'], [0.85, 'rgba(255,92,110,0.3)'], [1, 'rgba(255,92,110,0)']], lines, step);
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
    <section ref={sectionRef} className="relative overflow-hidden bg-[#2B1212] text-white" aria-labelledby="hl-scale-title">
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="relative border-x border-white/10">
          <div className="border-b border-white/10 h-16 lg:h-20" aria-hidden="true" />
          {/* The ribbon, behind the copy. */}
          <div className="pointer-events-none absolute inset-x-0 top-16 lg:top-20 bottom-0" aria-hidden="true">
            <canvas ref={canvasRef} className="absolute inset-0" />
          </div>

          <div className="relative px-6 lg:px-8 pt-14 lg:pt-20">
            <p className="mb-6 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#FF9A8B]">
              <Flag /> {t.eyebrow}
            </p>
            <h2 id="hl-scale-title" className="serif max-w-4xl leading-[1.08]">
              {t.title} <span className="text-[#C9A7A2]">{t.rest}</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-[#D9C2BE]">{t.lead}</p>
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
