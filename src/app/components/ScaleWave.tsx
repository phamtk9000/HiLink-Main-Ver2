// "Built to connect. Designed to scale." — HiLink's scale in numbers, laid out
// like the Stripe homepage section "Scale with confidence": a framed panel, a
// headline that runs on in a muted voice, a band of silk behind it, and the
// figures along the bottom, counting up as the section arrives.
//
// The silk is Stripe's own hero wave (lib/stripeSilk.ts) in HiLink's colours:
// it enters from the top right, turns over through itself and falls away
// under the lead, clipped by the frame above the figures. It drifts very
// slowly while on screen, stops off screen and does not react to the
// pointer. Without WebGL2, fine light lines on a 2D canvas stand in.
// Reduced motion: a still frame and the final numbers.
// It keeps moving on phones (the user wants the wave there), drawn at a
// lower pixel ratio so scrolling stays smooth (lib/calm.ts).
import { useEffect, useRef, useState } from 'react';
import { PARTNER_COUNT, SERVICES } from '../data/site';
import { useLang } from '../lib/i18n';
import { Flag } from './Flag';
import { createStripeSilk, STRIPE_HERO, type SilkConfig } from '../lib/stripeSilk';
import { WORKSPACE_LOCATIONS } from '../data/workspaceLocations';
import { isPhone } from '../lib/calm';

const T = {
  en: {
    eyebrow: 'HiLink at a glance',
    title: 'Built to connect.',
    rest: 'Designed to scale.',
    lead: 'From a business address to a whole floor, HiLink grows with the companies it serves — across central Hanoi, under one relationship.',
    stats: [
      { n: WORKSPACE_LOCATIONS.length, l: 'locations in central Hanoi' },
      { n: PARTNER_COUNT, suf: '+', l: 'partner companies' },
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
      { n: WORKSPACE_LOCATIONS.length, l: 'địa điểm giữa trung tâm Hà Nội' },
      { n: PARTNER_COUNT, suf: '+', l: 'doanh nghiệp đối tác' },
      { n: SERVICES.length, l: 'mảng dịch vụ, một đầu mối' },
      { n: 2020, from: 2010, l: 'đồng hành cùng doanh nghiệp từ' },
    ],
  },
};

// Each figure carries its own slice of the silk's reds, as on Stripe (white
// to HiLink red, warm throughout — no pink).
const NUM_GRADIENTS = [
  'linear-gradient(95deg, #FFFFFF 0%, #FFE2D8 55%, #FFC2AE 100%)',
  'linear-gradient(95deg, #FFE2D8 0%, #FFB29A 55%, #FF8A6E 100%)',
  'linear-gradient(95deg, #FFB29A 0%, #FF7A5C 55%, #F2553F 100%)',
  'linear-gradient(95deg, #FF8A6E 0%, #F2553F 55%, #E8332C 100%)',
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

function Stat({ n, from = 0, suf = '', l, i, run, still }: { n: number; from?: number; suf?: string; l: string; i: number; run: boolean; still: boolean }) {
  const v = useCount(n, from, run, still);
  return (
    <div className="px-6 lg:px-8 py-8 lg:py-10">
      {/* the figure for screen readers sits outside the gradient-clipped one:
          Safari paints every glyph inside background-clip: text, even hidden ones */}
      <span className="sr-only">{`${n}${suf}`}</span>
      <div
        aria-hidden="true"
        className="serif text-[3rem] lg:text-[4.25rem] leading-none lining-nums tabular-nums bg-clip-text text-transparent"
        style={{ backgroundImage: NUM_GRADIENTS[i % NUM_GRADIENTS.length], WebkitBackgroundClip: 'text' }}
      >
        {v}{suf}
      </div>
      <p className="mt-3 text-[15px] text-white/85">{l}</p>
    </div>
  );
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Where the silk sits for a canvas w × h: measured at 1344 × 630 (the panel
// at 1440px) and at 342 × 540 (a phone), anchored to the bottom edge so it
// always falls away under the copy.
function framing(w: number, h: number): Partial<SilkConfig> {
  if (w >= 768) {
    const zoom = Math.min(1.25, Math.max(0.62, w / 1344));
    return { zoom, position: [-180, (355 * zoom - h / 2) / zoom, -11] };
  }
  const zoom = w / 1000;
  return { zoom, position: [-100, (80 * (zoom / 0.34) - h / 2) / zoom, -11] };
}

const SILK: SilkConfig = {
  ...STRIPE_HERO,
  flip: true,
  rotation: [-0.45, -0.12, 2.4],
  scale: [5.5, 5.5, 3.8],
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
    if (!section || !canvas) return undefined;
    const silk = createStripeSilk(canvas, SILK);
    const ctx = silk ? null : canvas.getContext('2d');
    if (!silk && !ctx) return undefined;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = false;
    const t0 = performance.now();

    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, isPhone() ? 1.5 : 2);
      w = r.width; h = r.height;
      if (silk) { silk.configure(framing(w, h)); silk.resize(w, h, dpr); }
      else {
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
        canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      }
      draw(performance.now());
      canvas.style.opacity = '1';
    };

    function draw(now: number) {
      const ms = still ? 0 : now - t0;
      if (silk) { silk.draw(ms); return; }
      // Fallback: a band of fine lines turning over itself, rising to the right.
      const time = ms / 1000;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = 'lighter';
      ctx!.lineWidth = 1;
      const lines = w < 640 ? 56 : 110;
      const step = w < 640 ? 7 : 5;
      const g = ctx!.createLinearGradient(0, 0, w, 0);
      [[0, 'rgba(255,196,170,0)'], [0.3, 'rgba(255,143,122,1)'], [0.6, 'rgba(255,84,104,1)'], [1, 'rgba(255,140,156,1)']]
        .forEach(([o, c]) => g.addColorStop(o as number, c as string));
      ctx!.strokeStyle = g;
      for (let i = 0; i < lines; i++) {
        const sv = i / (lines - 1) - 0.5;
        ctx!.globalAlpha = 0.12 + 0.3 * (sv + 0.5);
        ctx!.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const u = x / w;
          const centre = h * 0.75 - h * 0.45 * smooth(0.35, 0.95, u) + Math.sin(u * 5 - time * 0.3) * h * 0.03;
          const width = h * (0.1 + 0.35 * smooth(0.3, 0.95, u));
          const theta = Math.PI * (0.2 + 0.8 * smooth(0.3, 0.8, u)) + 0.2 * Math.sin(time * 0.2 + u * 3);
          const y = centre + sv * width * Math.cos(theta);
          if (x < 0) ctx!.moveTo(x, y); else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
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
      silk?.dispose();
    };
  }, [still]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#241010] text-white" aria-labelledby="hl-scale-title">
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="relative border-x border-white/10">
          <div className="border-b border-white/10 h-16 lg:h-20" aria-hidden="true" />
          <div className="relative">
            {/* The silk, behind the copy, clipped by the frame. */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <canvas ref={canvasRef} className="absolute inset-0 opacity-0 transition-opacity duration-700" />
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
          </div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {t.stats.map((s, i) => (
              <Stat key={s.l} i={i} n={s.n} from={'from' in s ? s.from : 0} suf={'suf' in s ? s.suf : ''} l={s.l} run={counted} still={still} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
