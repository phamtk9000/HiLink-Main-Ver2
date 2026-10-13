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
//   market    Business Services     market entry: Vietnam as a field of dots;
//                                   routes arrive from abroad at Hanoi, Da Nang
//                                   and Ho Chi Minh City, and the country
//                                   lights up from Hanoi southwards
//   silk      Concierge Services    a soft ribbon of fine threads, swaying
//   routes    Industrial & Logistics  goods flow slowly along routes into a hub
//   sphere    All services          a slowly turning globe of points
//
// 2D canvas. A card draws only while it is hovered or fading out; the graphic
// sits towards the right and fades out under the text. On touch screens,
// where nothing hovers, a card plays while it crosses the middle of the
// screen. Reduced motion shows a still frame.
import { useEffect, useRef } from 'react';

export type FxKind = 'building' | 'ring' | 'market' | 'silk' | 'routes' | 'sphere';

// Vietnam, simplified (longitude, latitude), clockwise from the north-west
// corner; Phú Quốc; and a dot for each group of islands of Hoàng Sa and
// Trường Sa.
const VN: [number, number][] = [
  [102.14, 22.4], [102.4, 22.62], [102.7, 22.7], [103, 22.55], [103.3, 22.8], [103.6, 22.78], [103.97, 22.5], [104.3, 22.72],
  [104.75, 22.82], [105.05, 23], [105.32, 23.38], [105.6, 23.1], [105.85, 22.95], [106.25, 22.95], [106.7, 22.85], [106.65, 22.55],
  [106.75, 22.3], [106.95, 21.95], [107.35, 21.65], [107.98, 21.53],
  [107.7, 21.3], [107.2, 20.95], [106.75, 20.75], [106.55, 20.35], [106.1, 19.95], [105.85, 19.55], [105.7, 19.05], [105.95, 18.6],
  [106.35, 18.1], [106.6, 17.55], [107.05, 17.05], [107.55, 16.6], [108, 16.2], [108.25, 15.95], [108.65, 15.45], [108.9, 15],
  [109.1, 14.3], [109.25, 13.7], [109.3, 13.1], [109.45, 12.85], [109.2, 12.3], [109.2, 11.85], [109, 11.45], [108.7, 11.15],
  [108.3, 10.95], [107.9, 10.75], [107.3, 10.45], [107, 10.35], [106.8, 10.1], [106.55, 9.75], [106.2, 9.45], [105.8, 9.15],
  [105.4, 8.85], [105.1, 8.62], [104.75, 8.6],
  [104.8, 9.1], [104.85, 9.6], [105.05, 9.95], [104.75, 10.2], [104.48, 10.4], [104.8, 10.5], [105.1, 10.75], [105.45, 10.95],
  [105.85, 10.85], [106.15, 10.98], [105.95, 11.3], [106.1, 11.7], [106.4, 11.95], [106.8, 12.1], [107.3, 12.3], [107.55, 12.35],
  [107.45, 12.75], [107.55, 13.3], [107.45, 13.85], [107.6, 14.4], [107.55, 14.7],
  [107.7, 15.2], [107.4, 15.6], [107.2, 15.95], [107.05, 16.3], [106.65, 16.55], [106.55, 16.95], [106.4, 17.3], [106.05, 17.65],
  [105.7, 18.05], [105.45, 18.35], [105.1, 18.7], [104.55, 19], [104.05, 19.3], [103.9, 19.6], [104.3, 19.8], [104.65, 20.1],
  [104.4, 20.4], [104.05, 20.8], [103.7, 20.7], [103.3, 20.8], [103.05, 21.1], [102.85, 21.4], [102.75, 21.7], [102.55, 21.9], [102.2, 22.1],
];
const PHU_QUOC: [number, number][] = [[103.85, 10.45], [104.08, 10.4], [104.05, 10.05], [103.95, 10], [103.85, 10.2]];
const ISLANDS: [number, number][] = [
  [111.2, 15.8], [111.6, 16.5], [111.9, 16.3], [112.3, 16.6], [112.0, 16.95],
  [114.3, 11.4], [113.9, 10.4], [114.5, 10.0], [113.2, 9.8], [114.1, 8.9], [112.9, 8.6], [111.9, 8.6],
];
const CITIES: [number, number][] = [[105.85, 21.03], [108.22, 16.07], [106.7, 10.78]]; // Hanoi, Da Nang, Ho Chi Minh City
const LON0 = 102.1, LON1 = 114.6, LAT0 = 23.4, LAT1 = 8.4, KX = 0.96; // cos(16°)
const inside = (poly: [number, number][], x: number, y: number) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
type MapDot = { x: number; y: number; dh: number; dc: number; r: number };

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
    // No hover on a touch screen: there the graphic plays while its card
    // crosses the middle of the screen.
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = 1, raf = 0, hovered = false;
    let strength = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const t0 = performance.now();
    let last = t0;
    let pts: Pt[] = [];
    let map: MapDot[] = [];
    let cities: [number, number][] = [];
    let ht = 0; // seconds of hover, for the market map's sequence

    const build = () => {
      pts = [];
      const N = kind === 'silk' || kind === 'market' ? 0 : kind === 'routes' ? 260 : kind === 'building' ? 1100 : 1500;
      for (let i = 0; i < N; i++) pts.push({ x: rand(), y: rand(), z: rand(), r: rand(), a: rand() * Math.PI * 2 });
    };
    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      if (kind === 'market') {
        // Vietnam on a 5px grid, filling the card's height, the islands
        // against its right edge.
        const k = Math.min((h * 0.9) / (LAT0 - LAT1), (w * 0.52) / ((LON1 - LON0) * KX));
        const x0 = w - 10 - (LON1 - LON0) * KX * k, y0 = (h - (LAT0 - LAT1) * k) / 2;
        const px = ([lon, lat]: [number, number]): [number, number] => [x0 + (lon - LON0) * KX * k, y0 + (LAT0 - lat) * k];
        cities = CITIES.map(px);
        const g = 5;
        const add = (x: number, y: number) => {
          const dh = Math.hypot(x - cities[0][0], y - cities[0][1]);
          const dc = Math.min(dh, ...cities.slice(1).map(([cx, cy]) => Math.hypot(x - cx, y - cy)));
          map.push({ x, y, dh, dc, r: rand() });
        };
        map = [];
        for (let y = y0; y <= h - y0; y += g) for (let x = x0; x <= w; x += g) {
          const ll: [number, number] = [LON0 + (x - x0) / (KX * k), LAT0 - (y - y0) / k];
          if (inside(VN, ll[0], ll[1]) || inside(PHU_QUOC, ll[0], ll[1])) add(x, y);
        }
        ISLANDS.forEach((p) => { const [x, y] = px(p); add(x0 + Math.round((x - x0) / g) * g, y0 + Math.round((y - y0) / g) * g); });
      }
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
      ht = still ? 6 : ht + dt / 1000;
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
      } else if (kind === 'market') {
        // The country lights up from Hanoi southwards (70px a second), then
        // slow rings go out from the three cities; dots near the pointer
        // brighten a little.
        const front = ht * 70;
        const ring = (ht * 22) % 110;
        for (const d of map) {
          const lit = Math.min(1, Math.max(0, (front - d.dh) / 50));
          const wave = Math.exp(-(((d.dc - ring) / 8) ** 2)) * (1 - ring / 110) * lit;
          const a = 0.24 + 0.5 * lit + 0.4 * wave + 0.25 * near(d.x, d.y, 60) + (lit > 0.9 && d.r > 0.97 ? 0.3 : 0);
          dot(d.x, d.y, 2 + wave * 1.2, a * s);
        }
        // Routes in from abroad: drawn one after another, then a parcel of
        // light travels each one, slowly.
        const from: [number, number][] = [[w * 0.8, -h * 0.06], [w * 1.04, h * 0.3], [w * 1.04, h * 1.04]];
        cities.forEach(([ex, ey], k) => {
          const [sx, sy] = from[k];
          const mx = (sx + ex) / 2, my = Math.min(sy, ey) - h * 0.14;
          const at = (u: number) => [(1 - u) ** 2 * sx + 2 * (1 - u) * u * mx + u * u * ex, (1 - u) ** 2 * sy + 2 * (1 - u) * u * my + u * u * ey];
          const drawn = Math.min(1, Math.max(0, ht * 0.6 - k * 0.3));
          if (drawn <= 0) return;
          ctx.strokeStyle = `rgba(${ramp(0.35 + k * 0.2, onRed)},${0.45 * s})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let u = 0; u <= drawn + 0.001; u += 0.02) { const [x, y] = at(Math.min(u, drawn)); if (u === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
          ctx.stroke();
          if (drawn >= 1) {
            const u = (ht * 0.12 + k * 0.37) % 1;
            const [x, y] = at(u);
            ctx.fillStyle = `rgba(${ramp(0.35 + k * 0.2, onRed)},${Math.sin(u * Math.PI) * s})`;
            ctx.fillRect(x - 2, y - 2, 4, 4);
          }
        });
        // The cities: Hanoi larger, with a slow pulse.
        cities.forEach(([x, y], k) => {
          const size = k === 0 ? 8 : 5;
          ctx.fillStyle = `rgba(${ramp(0.5, onRed)},${s})`;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        });
        const pulse = (ht / 3) % 1;
        ctx.strokeStyle = `rgba(${ramp(0.5, onRed)},${(1 - pulse) * 0.5 * s})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cities[0][0], cities[0][1], 7 + pulse * 26, 0, Math.PI * 2); ctx.stroke();
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
          const u = (p.r + t * (0.018 + 0.03 * s) * (0.6 + p.z)) % 1;
          const [x, y] = curve(k, u);
          dot(x + (p.x - 0.5) * 8, y + (p.y - 0.5) * 8, 1.5 + p.z * 2, (0.3 + 0.6 * u) * s);
        }
        const pulse = (t * 0.3) % 1;
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
      if (strength < 0.02) { mouse.x = mouse.tx; mouse.y = mouse.ty; ht = 0; }
      start();
    };
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; };
    const onLeave = () => { hovered = false; start(); };
    const onFocus = () => { if (strength < 0.02) ht = 0; hovered = true; mouse.tx = w * 0.7; mouse.ty = h * 0.5; start(); };

    build();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    let io: IntersectionObserver | null = null;
    if (canHover) {
      host.addEventListener('pointerenter', onEnter);
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
      host.addEventListener('focusin', onFocus);
      host.addEventListener('focusout', onLeave);
    } else {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) onFocus(); else onLeave(); }, { rootMargin: '-38% 0px -38% 0px' });
      io.observe(host);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
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
      className="pointer-events-none absolute inset-0 opacity-60 sm:opacity-100 [mask-image:linear-gradient(to_right,transparent_48%,#000_92%)] sm:[mask-image:linear-gradient(to_right,transparent_28%,#000_66%)]"
    />
  );
}
