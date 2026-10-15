// The hero background of Industrial & Logistics: a container yard in fine
// isometric line. Stacks of containers stand in rows with lanes between
// them; every few seconds one is lifted on a cable, carried across and set
// down on another stack, and small trucks run along the lanes. It fills its
// section from the right and fades out under the copy.
//
// 2D canvas, drawn back to front (row by row, since the lanes separate the
// rows; then along each row, then up each stack). It runs while on screen (the same on
// phones) and stops off screen; reduced motion shows one still frame.
// On phones (lib/calm.ts) it is drawn still, as for reduced motion.
import { useEffect, useRef } from 'react';
import { stillMotion } from '../lib/calm';

const COLS = 6, ROWS = 5;            // stacks along x (length) and y (across)
const LX = 3, LY = 1, LZ = 1;        // one container, in units
const GX = 0.55, GY = 1.15;          // gaps: between ends, and the lanes
const MAX = 4;                       // containers in a stack
const LINE = '240,106,110';          // HiLink's light red, for the edges
const C30 = Math.cos(Math.PI / 6), S30 = 0.5;

type Box = { x: number; y: number; z: number; lx: number; ly: number; lz: number; red: boolean; key: number; cable?: boolean };

const rand = (() => {
  let s = 20201010;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
})();
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export function Yard({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.closest('section') ?? canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return undefined;
    const still = stillMotion();

    // The yard: a height and a colour for every slot.
    const heights: number[][] = [];
    const reds: boolean[][][] = [];
    for (let i = 0; i < COLS; i++) {
      heights.push([]); reds.push([]);
      for (let j = 0; j < ROWS; j++) {
        heights[i].push(1 + Math.floor(rand() * 3.4));
        reds[i].push(Array.from({ length: MAX }, () => rand() < 0.16));
      }
    }
    const pos = (i: number, j: number) => [i * (LX + GX), j * (LY + GY)];
    const spanX = COLS * (LX + GX) - GX, spanY = ROWS * (LY + GY) - GY;

    // One container in the air at a time: up, across, down.
    let move: { fi: number; fj: number; ti: number; tj: number; t0: number; red: boolean } | null = null;
    let nextMove = 1.2;
    // Trucks: one per lane, alternating direction.
    const trucks = Array.from({ length: ROWS - 1 }, (_, k) => ({ lane: k, off: rand(), dir: k % 2 ? -1 : 1, speed: 0.035 + rand() * 0.02 }));

    let w = 0, h = 0, dpr = 1, u = 24, ox = 0, oy = 0, raf = 0, visible = false;
    const t0 = performance.now();

    const iso = (x: number, y: number, z: number): [number, number] => [ox + (x - y) * C30 * u, oy + (x + y) * S30 * u - z * u];
    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      // Wide screens: the yard fills the right half. Phones: it sits low and
      // smaller, behind the foot of the copy.
      const wide = w >= 1024;
      u = wide ? Math.min(34, Math.max(20, w / 52)) : Math.max(11, w / 30);
      const cx = wide ? w * 0.7 : w * 0.62, cy = wide ? h * 0.56 : h * 0.8;
      // Centre of the yard's footprint, half a stack up.
      ox = cx - (spanX / 2 - spanY / 2) * C30 * u;
      oy = cy - (spanX / 2 + spanY / 2) * S30 * u + 1.2 * u;
      draw(performance.now());
    };

    const face = (pts: [number, number][], fill: string, stroke: string) => {
      ctx.beginPath();
      pts.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      ctx.fillStyle = fill; ctx.fill();
      ctx.strokeStyle = stroke; ctx.stroke();
    };
    const box = (b: Box) => {
      const { x, y, z, lx, ly, lz } = b;
      const x1 = x + lx, y1 = y + ly, z1 = z + lz;
      const edge = `rgba(${LINE},${b.red ? 0.75 : 0.42})`;
      // top, long side (towards the viewer), end
      face([iso(x, y, z1), iso(x1, y, z1), iso(x1, y1, z1), iso(x, y1, z1)], b.red ? '#C4222A' : '#4A2321', edge);
      face([iso(x, y1, z), iso(x1, y1, z), iso(x1, y1, z1), iso(x, y1, z1)], b.red ? '#9C1A22' : '#3A1918', edge);
      face([iso(x1, y, z), iso(x1, y1, z), iso(x1, y1, z1), iso(x1, y, z1)], b.red ? '#7F141B' : '#2C1211', edge);
      // ribs on the long side, like a container wall
      if (lx > 2) {
        ctx.strokeStyle = `rgba(${LINE},${b.red ? 0.28 : 0.13})`;
        ctx.beginPath();
        for (let k = 1; k < 8; k++) {
          const rx = x + (lx * k) / 8;
          const [ax, ay] = iso(rx, y1, z + 0.12), [bx, by] = iso(rx, y1, z1 - 0.12);
          ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
        }
        ctx.stroke();
      }
      if (b.cable) {
        const [cx, cy] = iso(x + lx / 2, y + ly / 2, z1);
        const g = ctx.createLinearGradient(0, cy, 0, cy - 9 * u);
        g.addColorStop(0, `rgba(${LINE},0.7)`); g.addColorStop(1, `rgba(${LINE},0)`);
        ctx.strokeStyle = g;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - 9 * u); ctx.stroke();
      }
    };

    function draw(now: number) {
      const t = still ? 0 : (now - t0) / 1000;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      ctx!.lineWidth = 1;
      ctx!.lineJoin = 'round';

      // Start a new move when the last one has landed.
      if (!still && !move && t > nextMove) {
        const from: [number, number][] = [], to: [number, number][] = [];
        for (let i = 0; i < COLS; i++) for (let j = 0; j < ROWS; j++) {
          if (heights[i][j] > 1) from.push([i, j]);
          if (heights[i][j] < MAX) to.push([i, j]);
        }
        const f = from[Math.floor(rand() * from.length)];
        const cands = to.filter(([i, j]) => i !== f[0] || j !== f[1]);
        const d = cands[Math.floor(rand() * cands.length)];
        heights[f[0]][f[1]] -= 1;
        const red = reds[f[0]][f[1]][heights[f[0]][f[1]]];
        move = { fi: f[0], fj: f[1], ti: d[0], tj: d[1], t0: t, red };
      }

      const items: Box[] = [];
      // Lane markings on the ground.
      ctx!.strokeStyle = `rgba(${LINE},0.12)`;
      ctx!.setLineDash([u * 0.5, u * 0.5]);
      ctx!.beginPath();
      for (let k = 0; k < ROWS - 1; k++) {
        const y = k * (LY + GY) + LY + GY / 2;
        const [ax, ay] = iso(-3, y, 0), [bx, by] = iso(spanX + 3, y, 0);
        ctx!.moveTo(ax, ay); ctx!.lineTo(bx, by);
      }
      ctx!.stroke();
      ctx!.setLineDash([]);

      for (let i = 0; i < COLS; i++) for (let j = 0; j < ROWS; j++) {
        const [x, y] = pos(i, j);
        for (let k = 0; k < heights[i][j]; k++) items.push({ x, y, z: k * LZ, lx: LX, ly: LY, lz: LZ, red: reds[i][j][k], key: y * 1000 + x * 10 + k });
      }
      for (const tr of trucks) {
        const run = spanX + 8;
        const p = ((tr.off + t * tr.speed * tr.dir) % 1 + 1) % 1;
        const x = -4 + p * run, y = tr.lane * (LY + GY) + LY + GY / 2 - 0.28;
        items.push({ x, y, z: 0, lx: 1.5, ly: 0.56, lz: 0.5, red: tr.lane % 2 === 0, key: y * 1000 + x * 10 });
        items.push({ x: tr.dir > 0 ? x + 1.6 : x - 0.6, y, z: 0, lx: 0.5, ly: 0.56, lz: 0.42, red: false, key: y * 1000 + (tr.dir > 0 ? x + 1.6 : x - 0.6) * 10 });
      }
      items.sort((a, b) => a.key - b.key);
      items.forEach(box);

      if (move) {
        // 0–1.3s up, 1.3–3.6s across, 3.6–4.9s down.
        const e = t - move.t0;
        const [fx, fy] = pos(move.fi, move.fj), [tx, ty] = pos(move.ti, move.tj);
        const fz = heights[move.fi][move.fj] * LZ, tz = heights[move.ti][move.tj] * LZ;
        const top = MAX * LZ + 1.6;
        const up = ease(Math.min(1, e / 1.3)), across = ease(Math.min(1, Math.max(0, (e - 1.3) / 2.3))), down = ease(Math.min(1, Math.max(0, (e - 3.6) / 1.3)));
        const z = e < 3.6 ? fz + (top - fz) * up : top + (tz - top) * down;
        box({ x: fx + (tx - fx) * across, y: fy + (ty - fy) * across, z, lx: LX, ly: LY, lz: LZ, red: move.red, key: 0, cable: true });
        if (e >= 4.9) {
          reds[move.ti][move.tj][heights[move.ti][move.tj]] = move.red;
          heights[move.ti][move.tj] += 1;
          move = null;
          nextMove = t + 0.9 + rand() * 1.2;
        }
      }
    }

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const run = () => { if (!raf && !still) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) run(); });
    const ro = new ResizeObserver(resize);
    const onVis = () => { if (!document.hidden) run(); };
    io.observe(host);
    ro.observe(host);
    document.addEventListener('visibilitychange', onVis);
    resize();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_38%,#000_78%)] lg:[mask-image:linear-gradient(to_right,transparent_30%,#000_62%)] ${className}`}
    />
  );
}
