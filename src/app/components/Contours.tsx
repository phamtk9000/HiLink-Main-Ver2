// Contour background for the dark (#361716) sections — the alternative to
// the candlesticks (Candles.tsx), so a page never shows the same pattern
// twice. Faint contour lines, like a terrain map, climb gently from left to
// right and drift slowly. Under the pointer they part around it like a lens
// and brighten; when the pointer leaves they settle back.
//
// Canvas 2D, drawn only while the section is on screen. Touch screens get the
// drift only; reduced motion, one still frame.
import { useEffect, useRef } from 'react';

const LINES = 26;
const INK = '249,247,244';

export function Contours({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.closest('section') ?? canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointerOk = !reduced && window.matchMedia('(pointer: fine)').matches;

    // Phases change slowly from one line to the next, so neighbouring lines
    // stay nearly parallel and never cross — like real contours.
    const phase = Array.from({ length: LINES }, (_, i) => [i * 0.16, i * 0.11 + 2, i * 0.07]);
    let w = 0, h = 0, dpr = 1;
    const target = { x: -1e4, y: -1e4, on: 0 };
    const cur = { x: -1e4, y: -1e4, on: 0 };
    let raf = 0;
    let visible = false;
    const start = performance.now();

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      if (reduced || !visible) draw(start);
    };

    function draw(now: number) {
      const t = reduced ? 0 : (now - start) / 1000;
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      cur.on += (target.on - cur.on) * 0.08;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      ctx!.lineWidth = 1;
      const span = h * 1.5;
      const step = Math.max(8, w / 140);
      const lens = 26 * cur.on;
      for (let i = 0; i < LINES; i++) {
        const [p1, p2, p3] = phase[i];
        const base = -h * 0.25 + (i / (LINES - 1)) * span;
        const yAt = (x: number) => {
          let y = base - x * 0.18                                  // the climb
            + Math.sin(x * 0.0042 + p1 + t * 0.12) * 16
            + Math.sin(x * 0.009 + p2 - t * 0.08) * 5
            + Math.sin(x * 0.0017 + p3) * 24;
          if (lens > 0.01) {
            const dx = x - cur.x, dy = y - cur.y;
            const g = Math.exp(-(dx * dx) / (2 * 150 * 150) - (dy * dy) / (2 * 110 * 110));
            y += Math.tanh(dy / 40) * g * lens;   // parts smoothly around the pointer
          }
          return y;
        };
        // Brighter the nearer the line passes to the pointer.
        const near = cur.on > 0.01 ? Math.exp(-((yAt(cur.x) - cur.y) ** 2) / (2 * 70 * 70)) * cur.on : 0;
        ctx!.strokeStyle = `rgba(${INK},${(0.08 + near * 0.22).toFixed(3)})`;
        ctx!.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const y = yAt(x);
          if (x === -step) ctx!.moveTo(x, y); else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }
    }

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const run = () => { if (!raf && !reduced) raf = requestAnimationFrame(loop); };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) run(); });
    const ro = new ResizeObserver(resize);
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      target.x = e.clientX - r.left; target.y = e.clientY - r.top; target.on = 1;
      if (cur.on < 0.01) { cur.x = target.x; cur.y = target.y; }
    };
    const onLeave = () => { target.on = 0; };
    const onVis = () => { if (!document.hidden) run(); };
    io.observe(host);
    ro.observe(host);
    document.addEventListener('visibilitychange', onVis);
    if (pointerOk) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }
    resize();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
}
