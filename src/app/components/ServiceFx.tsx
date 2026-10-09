// The motion behind each service card on Home, revealed on hover — after the
// "Modular solutions" bento cards on stripe.com, where each card carries its
// own live graphic: a field of particles that reacts to the pointer, with a
// hover strength that eases in (Stripe: 0.002 per ms) and a pointer that is
// followed, not tracked. Each HiLink service gets a picture of what it does:
//
//   building  Property Management   loose dust settles into a building; the
//                                   windows light one by one
//   ring      Workspace Leasing     particles gather into a ring — people
//                                   round a table — and close up under the
//                                   pointer (Stripe's agentic ring)
//   orbits    Business Services     orbits draw in around a shell of dust and
//                                   nodes travel them: connections made
//   silk      Concierge Services    a soft ribbon of fine threads, swaying
//   routes    Industrial & Logistics  goods flow along routes into a hub
//   sphere    All services          a slowly turning globe of points
//
// 2D canvas. A card draws only while it is hovered or fading out; the graphic
// sits towards the right and fades out under the text. Touch screens show
// nothing; reduced motion shows a still frame on hover.
import { useEffect, useRef } from 'react';

export type FxKind = 'building' | 'ring' | 'orbits' | 'silk' | 'routes' | 'sphere';

type Pt = { x: number; y: number; z: number; r: number; a: number };

const rand = (() => {
  let s = 1234567;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
})();
// Cheap smooth noise in [-1, 1].
const noise = (x: number, y: number) =>
  (Math.sin(x * 1.7 + y * 2.3) + Math.sin(x * 3.1 - y * 1.3 + 1.7) * 0.6 + Math.sin(x * 0.7 + y * 4.1 + 4.2) * 0.4) / 2;

// Colour down the canvas: HiLink coral at the top to wine at the bottom (on
// the red card, warm white).
const ramp = (t: number, onRed: boolean) => {
  if (onRed) return `255,${236 - t * 30},${226 - t * 40}`;
  const a = [242, 90, 104], b = [209, 33, 38], c = [140, 30, 60];
  const [p, q, k] = t < 0.5 ? [a, b, t * 2] : [b, c, (t - 0.5) * 2];
  return p.map((v, i) => Math.round(v + (q[i] - v) * k)).join(',');
};

export function ServiceFx({ kind, onRed = false }: { kind: FxKind; onRed?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.closest('[data-fx-root]') as HTMLElement | null;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = 1, raf = 0, hovered = false;
    let strength = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const t0 = performance.now();
    let last = t0;
    let pts: Pt[] = [];

    const build = () => {
      pts = [];
      const N = kind === 'silk' ? 0 : kind === 'routes' ? 260 : kind === 'orbits' ? 900 : kind === 'building' ? 1100 : 1500;
      for (let i = 0; i < N; i++) pts.push({ x: rand(), y: rand(), z: rand(), r: rand(), a: rand() * Math.PI * 2 });
    };
    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    };

    const dot = (x: number, y: number, size: number, alpha: number) => {
      if (alpha <= 0.01) return;
      ctx.fillStyle = `rgba(${ramp(Math.min(1, Math.max(0, y / h)), onRed)},${alpha.toFixed(3)})`;
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    };

    function draw(now: number) {
      const dt = Math.min(50, now - last); last = now;
      const t = still ? 0 : (now - t0) / 1000;
      strength += ((hovered ? 1 : 0) - strength) * Math.min(1, dt * 0.004);
      mouse.x += (mouse.tx - mouse.x) * Math.min(1, dt * 0.008);
      mouse.y += (mouse.ty - mouse.y) * Math.min(1, dt * 0.008);
      const s = still ? (hovered ? 1 : 0) : strength;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.68, cy = h * 0.55, R = Math.min(w, h) * 0.36;
      const near = (x: number, y: number, rad: number) => Math.max(0, 1 - Math.hypot(x - mouse.x, y - mouse.y) / rad);

      if (kind === 'ring') {
        // Stripe's agentic ring: points scatter off the ring by noise, and the
        // ones near the pointer fall back onto it.
        for (const p of pts) {
          const ang = p.a + t * 0.05;
          const bx = cx + Math.cos(ang) * R * (1 + (p.z - 0.5) * 0.12);
          const by = cy + Math.sin(ang) * R * 0.92 * (1 + (p.z - 0.5) * 0.12);
          const n = noise(Math.cos(ang) * 1.6 + t * 0.15, Math.sin(ang) * 1.6 - t * 0.1);
          const scatter = R * 0.9 * Math.pow(p.r, 2.2 + 2 * s) * n;
          let x = bx + Math.cos(ang) * scatter, y = by + Math.sin(ang) * scatter;
          const k = near(bx, by, w * 0.3) * s;
          x += (bx - x) * k; y += (by - y) * k;
          dot(x, y, 1 + p.r * 2.2, (0.25 + 0.75 * p.z) * s);
        }
      } else if (kind === 'building') {
        // Three volumes on a ground line; each point has a home on a facade
        // grid and drifts there from the dust as the card is hovered.
        const blocks = [[0.6, 0.5, 0.1], [0.72, 0.2, 0.13], [0.87, 0.42, 0.09]]; // left, top, width (of w / h)
        pts.forEach((p, i) => {
          const b = blocks[i % 3];
          const gx = Math.round(p.x * 6) / 6, gy = Math.round(p.y * 14) / 14;
          const hx = w * (b[0] + gx * b[2]), hy = h * (b[1] + gy * (0.88 - b[1]));
          const dx = cx + (p.x - 0.5) * w * 0.7 + noise(p.a, t * 0.2) * 30;
          const dy = cy + (p.y - 0.5) * h * 0.9 + noise(t * 0.2, p.a) * 30;
          const arrive = Math.min(1, Math.max(0, (s - p.r * 0.5) / 0.5));
          const e = arrive * arrive * (3 - 2 * arrive);
          let x = dx + (hx - dx) * e, y = dy + (hy - dy) * e;
          const push = near(x, y, 70) * s * 14;
          x += (x - mouse.x) / 70 * push; y += (y - mouse.y) / 70 * push;
          const lit = e > 0.9 && i % 7 === 0 && Math.sin(t * 2 + p.a * 5) > 0.6;
          dot(x, y, lit ? 3 : 1.3 + p.r, (lit ? 1 : 0.35 + 0.5 * p.z) * Math.max(0.15, s));
        });
        ctx.fillStyle = `rgba(${ramp(0.6, onRed)},${0.35 * s})`;
        ctx.fillRect(w * 0.56, h * 0.885, w * 0.42, 1);
      } else if (kind === 'orbits') {
        // A shell of dust, three tilted orbits drawing in, and nodes on them.
        for (const p of pts) {
          const ang = p.a + t * 0.03;
          const rr = R * (1.15 + (p.r - 0.5) * 0.35 + noise(ang * 2, t * 0.2) * 0.1);
          const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr * 0.95;
          const arc = 0.5 + 0.5 * Math.sin(ang - 0.8); // denser on one side
          dot(x, y, 1 + p.r * 1.8, (0.15 + 0.6 * arc * p.z) * s);
        }
        const orbits = [[R * 1.25, R * 0.42, -0.35], [R * 0.95, R * 0.95, 0], [R * 1.4, R * 0.6, 0.5]];
        orbits.forEach(([rx, ry, rot], k) => {
          ctx.save();
          ctx.translate(cx, cy); ctx.rotate(rot);
          ctx.strokeStyle = `rgba(${ramp(0.3 + k * 0.25, onRed)},${0.55 * s})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(0, 0, rx, ry, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(1, s * 1.2));
          ctx.stroke();
          const na = t * (0.4 + k * 0.15) + k * 2;
          const nx = Math.cos(na) * rx, ny = Math.sin(na) * ry;
          ctx.fillStyle = `rgba(255,255,255,${s})`;
          ctx.strokeStyle = `rgba(${ramp(0.3 + k * 0.25, onRed)},${s})`;
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(nx, ny, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = `rgba(${ramp(0.3 + k * 0.25, onRed)},${0.18 * s})`;
          ctx.beginPath(); ctx.arc(nx, ny, 11, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });
      } else if (kind === 'silk') {
        // A ribbon of fine threads, peach to coral, swelling under the pointer.
        const lines = 46;
        for (let i = 0; i < lines; i++) {
          const sv = i / (lines - 1) - 0.5;
          ctx.beginPath();
          for (let x = w * 0.3; x <= w + 10; x += 6) {
            const u = (x - w * 0.3) / (w * 0.7);
            const swell = 1 + 0.6 * near(x, mouse.y, 170) * s;
            const y = h * (0.78 - 0.5 * u) + Math.sin(u * 3.6 + t * 0.8) * h * 0.09
              + sv * h * (0.1 + 0.42 * u) * Math.cos(u * 2.6 - t * 0.5) * swell;
            if (x === w * 0.3) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          const tone = onRed ? '255,236,226' : i % 3 === 0 ? '255,170,140' : i % 3 === 1 ? '242,90,104' : '209,33,38';
          ctx.strokeStyle = `rgba(${tone},${(0.25 + 0.45 * (1 - Math.abs(sv) * 2)) * s})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else if (kind === 'routes') {
        // Routes from the edges into a hub; goods travel them, faster on hover.
        const hub = { x: w * 0.8, y: h * 0.5 };
        const starts = [[w * 0.5, h * 1.05], [w * 1.05, h * 0.05], [w * 1.05, h * 0.95], [w * 0.55, -h * 0.05]];
        const curve = (k: number, u: number) => {
          const [sx, sy] = starts[k];
          const mx = (sx + hub.x) / 2 + (k % 2 ? -1 : 1) * h * 0.25, my = (sy + hub.y) / 2;
          const a = (1 - u) * (1 - u), b = 2 * (1 - u) * u, c = u * u;
          return [a * sx + b * mx + c * hub.x, a * sy + b * my + c * hub.y];
        };
        starts.forEach((_, k) => {
          ctx.strokeStyle = `rgba(${ramp(0.5, onRed)},${0.22 * s})`;
          ctx.setLineDash([2, 6]);
          ctx.beginPath();
          for (let u = 0; u <= 1.001; u += 0.04) { const [x, y] = curve(k, u); if (u === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
          ctx.stroke();
        });
        ctx.setLineDash([]);
        for (const p of pts) {
          const k = Math.floor(p.a / (Math.PI * 2) * starts.length) % starts.length;
          const u = (p.r + t * (0.04 + 0.12 * s) * (0.6 + p.z)) % 1;
          const [x, y] = curve(k, u);
          dot(x + (p.x - 0.5) * 8, y + (p.y - 0.5) * 8, 1.5 + p.z * 2, (0.3 + 0.6 * u) * s);
        }
        const pulse = (t * 0.6) % 1;
        ctx.strokeStyle = `rgba(${ramp(0.5, onRed)},${(1 - pulse) * 0.5 * s})`;
        ctx.beginPath(); ctx.arc(hub.x, hub.y, 8 + pulse * 40, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = `rgba(${ramp(0.5, onRed)},${s})`;
        ctx.fillRect(hub.x - 6, hub.y - 6, 12, 12);
      } else if (kind === 'sphere') {
        // A globe of points turning; the pointer tilts it.
        const spin = t * (0.15 + 0.35 * s);
        const tilt = (mouse.y / h - 0.5) * 0.6 * s;
        const N = pts.length;
        pts.forEach((p, i) => {
          const phi = Math.acos(1 - (2 * (i + 0.5)) / N), th = Math.PI * (1 + Math.sqrt(5)) * i + spin;
          let x = Math.sin(phi) * Math.cos(th), y = Math.cos(phi), z = Math.sin(phi) * Math.sin(th);
          const y2 = y * Math.cos(tilt) - z * Math.sin(tilt); z = y * Math.sin(tilt) + z * Math.cos(tilt); y = y2;
          const d = (z + 1) / 2;
          x = cx + x * R * 1.1; y = cy + y * R * 1.1;
          dot(x, y, 0.8 + d * 2.2, (0.12 + 0.6 * d) * s);
        });
      }
    }

    const loop = (now: number) => {
      raf = 0;
      draw(now);
      if (hovered || strength > 0.01) raf = requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    const onEnter = (e: PointerEvent) => {
      hovered = true;
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top;
      if (strength < 0.02) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
      start();
    };
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; };
    const onLeave = () => { hovered = false; start(); };
    const onFocus = () => { hovered = true; mouse.tx = w * 0.7; mouse.ty = h * 0.5; start(); };

    build();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('focusin', onFocus);
    host.addEventListener('focusout', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('focusin', onFocus);
      host.removeEventListener('focusout', onLeave);
    };
  }, [kind, onRed]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent_28%,#000_66%)]"
    />
  );
}
