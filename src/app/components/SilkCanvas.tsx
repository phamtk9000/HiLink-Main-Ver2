// A silk surface (lib/silk.ts) filling its parent: sized to it, drawn only
// while on screen, swelling under the pointer anywhere in the nearest
// section (on touch screens the swell travels by itself). Still frame for reduced motion; nothing if WebGL2 is missing.
import { useEffect, useRef } from 'react';
import { createSilk } from '../lib/silk';

export function SilkCanvas({ variant = 'sheet', className = '' }: { variant?: 'ribbon' | 'sheet'; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const box = canvas?.parentElement;
    const host = canvas?.closest('section') ?? box;
    if (!canvas || !box || !host) return undefined;
    const silk = createSilk(canvas, variant);
    if (!silk) return undefined;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    const pointer = { x: -1e4, on: 0, target: 0 };
    let raf = 0, visible = false;

    // On a touch screen the swell travels slowly along the cloth by itself.
    const auto = !still && !window.matchMedia('(pointer: fine)').matches;
    const draw = (now: number) => {
      if (auto) { pointer.x = canvas.clientWidth * (0.55 + 0.4 * Math.sin((now - t0) / 3200)); pointer.target = 1; }
      pointer.on += (pointer.target - pointer.on) * 0.06;
      silk.draw(still ? 6 : (now - t0) / 1000 + 6, pointer.x, pointer.on);
    };
    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const run = () => { if (!raf && !still) raf = requestAnimationFrame(loop); };
    const resize = () => {
      const r = box.getBoundingClientRect();
      silk.resize(r.width, r.height, Math.min(window.devicePixelRatio || 1, 2));
      draw(performance.now());
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) run(); });
    const ro = new ResizeObserver(resize);
    const onMove = (e: PointerEvent) => { pointer.x = e.clientX - canvas.getBoundingClientRect().left; pointer.target = 1; };
    const onLeave = () => { pointer.target = 0; };
    const onVis = () => { if (!document.hidden) run(); };
    io.observe(box);
    ro.observe(box);
    document.addEventListener('visibilitychange', onVis);
    if (!still && window.matchMedia('(pointer: fine)').matches) {
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
      silk.dispose();
    };
  }, [variant]);

  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 ${className}`} />;
}
