// The small drawing behind each service tile on the Business Club page,
// shown on hover — like the graphics behind the service cards on Home
// (ServiceFx), one picture per title:
//
//   broadcast  Marketing & Branding   a signal going out in widening arcs
//   audit      Audit                  a lens passing over rows of entries
//   chart      Finance                a line climbing, drawn as it goes
//   ledger     Accounting & Tax       rows of a ledger filling to a total
//   scale      Legal                  a balance finding its level
//   cover      Insurance              rain kept off by a canopy
//   people     Human Resources        people joined into a team
//   route      Logistics              parcels along a route
//   trade      Trade                  a globe with goods crossing it
//   steam      Gastronomy             steam rising from a bowl
//   pulse      Health & Welfare       a steady heartbeat
//   equalizer  Entertainment          music levels
//   calendar   Events                 days passing to the one that matters
//   flight     Transport              a flight along its arc
//
// 2D canvas, drawn only while the tile is hovered or fading out. On touch
// screens, where nothing hovers, a tile plays while it crosses the middle of
// the screen. Reduced motion shows a still frame.
import { useEffect, useRef } from 'react';

export type TileKind = 'broadcast' | 'audit' | 'chart' | 'ledger' | 'scale' | 'cover' | 'people' | 'route' | 'trade' | 'steam' | 'pulse' | 'equalizer' | 'calendar' | 'flight';

const RED = '209,33,38', CORAL = '240,106,110';
const hash = (n: number) => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Pen = { ctx: CanvasRenderingContext2D; w: number; h: number; cx: number; cy: number; R: number; t: number; s: number };
const ink = (a: number, c = RED) => `rgba(${c},${Math.max(0, a).toFixed(3)})`;

const DRAW: Record<TileKind, (p: Pen) => void> = {
  broadcast({ ctx, cx, cy, R, t, s }) {
    const ox = cx - R * 0.9, oy = cy + R * 0.2;
    for (let k = 0; k < 4; k++) {
      const p = (t * 0.32 + k / 4) % 1;
      ctx.strokeStyle = ink((1 - p) * 0.6 * s);
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(ox, oy, 6 + p * R * 2.4, -0.62, 0.62); ctx.stroke();
    }
    ctx.fillStyle = ink(0.85 * s); ctx.fillRect(ox - 3, oy - 3, 6, 6);
  },
  audit({ ctx, cx, cy, R, t, s }) {
    const cols = 7, rows = 4, g = Math.max(11, R * 0.42);
    const x0 = cx - ((cols - 1) * g) / 2, y0 = cy - ((rows - 1) * g) / 2;
    const prog = (t * 3.2) % (cols * rows + 6);
    const cur = Math.min(cols * rows - 1, Math.floor(prog));
    const lx = x0 + (cur % cols) * g, ly = y0 + Math.floor(cur / cols) * g;
    for (let i = 0; i < cols * rows; i++) {
      const x = x0 + (i % cols) * g, y = y0 + Math.floor(i / cols) * g;
      const done = i < prog, under = Math.hypot(x - lx, y - ly) < g * 0.9;
      ctx.fillStyle = ink((under ? 0.95 : done ? 0.5 : 0.16) * s);
      const z = under ? 5 : done ? 3.2 : 2.4;
      ctx.fillRect(x - z / 2, y - z / 2, z, z);
    }
    ctx.strokeStyle = ink(0.75 * s); ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(lx, ly, g * 0.85, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(lx + g * 0.6, ly + g * 0.6); ctx.lineTo(lx + g * 1.25, ly + g * 1.25); ctx.stroke();
  },
  chart({ ctx, cx, cy, R, t, s }) {
    const n = 9, wd = R * 2.6, x0 = cx - wd / 2, base = cy + R * 0.8;
    const shown = clamp01(t * 0.6);
    const y = (i: number) => base - (0.15 + (i / (n - 1)) * 0.75 + (hash(i + 3) - 0.5) * 0.28) * R * 1.5 - Math.sin(t * 1.1 + i) * 1.5;
    for (let i = 0; i < n; i++) {
      const x = x0 + (wd * i) / (n - 1);
      if (i / (n - 1) > shown) break;
      ctx.fillStyle = ink(0.1 * s, CORAL); ctx.fillRect(x - 3, y(i), 6, base - y(i));
    }
    ctx.strokeStyle = ink(0.25 * s); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, base); ctx.lineTo(x0 + wd, base); ctx.stroke();
    ctx.strokeStyle = ink(0.85 * s); ctx.lineWidth = 1.6; ctx.lineJoin = 'round';
    ctx.beginPath();
    let ex = x0, ey = y(0);
    for (let i = 0; i < n; i++) {
      const f = i / (n - 1);
      if (f > shown) { const pf = (i - 1) / (n - 1), k = (shown - pf) / (f - pf); ex = x0 + wd * (pf + (f - pf) * k); ey = y(i - 1) + (y(i) - y(i - 1)) * k; ctx.lineTo(ex, ey); break; }
      ex = x0 + wd * f; ey = y(i);
      if (i) ctx.lineTo(ex, ey); else ctx.moveTo(ex, ey);
    }
    ctx.stroke();
    ctx.fillStyle = ink(s); ctx.beginPath(); ctx.arc(ex, ey, 3 + Math.sin(t * 4) * 0.8, 0, Math.PI * 2); ctx.fill();
  },
  ledger({ ctx, cx, cy, R, t, s }) {
    const rows = 5, gap = Math.max(11, R * 0.42), x0 = cx - R * 1.2, y0 = cy - (rows * gap) / 2, len = R * 2.4;
    const cyc = t % 6;
    for (let k = 0; k < rows; k++) {
      const y = y0 + k * gap, fill = clamp01((cyc - k * 0.45) / 0.6), v = 0.35 + hash(k + 11) * 0.6;
      ctx.fillStyle = ink(0.3 * s); ctx.fillRect(x0, y - 1, len * 0.22, 2);
      ctx.fillStyle = ink(0.12 * s, CORAL); ctx.fillRect(x0 + len * 0.3, y - 3, len * 0.7, 6);
      ctx.fillStyle = ink(0.7 * s); ctx.fillRect(x0 + len * 0.3, y - 3, len * 0.7 * v * fill, 6);
    }
    const tot = clamp01((cyc - rows * 0.45) / 0.6), y = y0 + rows * gap + 2;
    ctx.fillStyle = ink(0.85 * s);
    ctx.fillRect(x0 + len * 0.3, y - 2, len * 0.7 * tot, 1.5); ctx.fillRect(x0 + len * 0.3, y + 2, len * 0.7 * tot, 1.5);
  },
  scale({ ctx, cx, cy, R, t, s }) {
    const a = 0.2 * Math.sin(t * 1.4) * Math.exp(-((t % 6) * 0.35)), arm = R * 1.15, top = cy - R * 0.75;
    ctx.strokeStyle = ink(0.8 * s); ctx.lineWidth = 1.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx, top - 6); ctx.lineTo(cx, cy + R); ctx.moveTo(cx - R * 0.5, cy + R); ctx.lineTo(cx + R * 0.5, cy + R); ctx.stroke();
    const ends = [-1, 1].map((d) => [cx + Math.cos(a) * arm * d, top + Math.sin(a) * arm * d]);
    ctx.beginPath(); ctx.moveTo(ends[0][0], ends[0][1]); ctx.lineTo(ends[1][0], ends[1][1]); ctx.stroke();
    ends.forEach(([x, y]) => {
      const py = y + R * 0.75;
      ctx.strokeStyle = ink(0.45 * s); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - R * 0.36, py); ctx.moveTo(x, y); ctx.lineTo(x + R * 0.36, py); ctx.stroke();
      ctx.strokeStyle = ink(0.8 * s); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(x, py, R * 0.36, 0, Math.PI); ctx.stroke();
    });
    ctx.fillStyle = ink(s); ctx.fillRect(cx - 3, top - 9, 6, 6);
  },
  cover({ ctx, w, cx, cy, R, t, s }) {
    const dy = cy + R * 0.35, dr = R * 1.05;
    for (let k = 0; k < 26; k++) {
      const x = cx - R * 1.9 + hash(k) * R * 3.8, p = (t * (0.45 + hash(k + 50) * 0.3) + hash(k + 9)) % 1;
      const y = cy - R * 1.6 + p * R * 3.2;
      const dx = x - cx, roof = Math.abs(dx) < dr ? dy - Math.sqrt(dr * dr - dx * dx) : Infinity;
      if (y > roof || x > w) continue;
      ctx.fillStyle = ink((0.25 + 0.4 * (1 - p)) * s, CORAL); ctx.fillRect(x, y, 1.5, 6);
    }
    ctx.strokeStyle = ink(0.85 * s); ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(cx, dy, dr, Math.PI, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - dr, dy); ctx.lineTo(cx + dr, dy); ctx.moveTo(cx, dy); ctx.lineTo(cx, dy + R * 0.7); ctx.stroke();
    ctx.fillStyle = ink(0.75 * s); ctx.fillRect(cx - 5, dy + R * 0.7 - 2, 10, 10);
  },
  people({ ctx, cx, cy, R, t, s }) {
    const nodes = [[0, -0.9], [-0.75, 0], [0.75, 0], [-1.15, 0.9], [-0.35, 0.9], [0.35, 0.9], [1.15, 0.9]].map(([x, y]) => [cx + x * R, cy + y * R * 0.85]);
    const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
    edges.forEach(([a, b], k) => {
      const p = clamp01(t * 1.4 - k * 0.22);
      ctx.strokeStyle = ink(0.45 * s); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(nodes[a][0], nodes[a][1]); ctx.lineTo(nodes[a][0] + (nodes[b][0] - nodes[a][0]) * p, nodes[a][1] + (nodes[b][1] - nodes[a][1]) * p); ctx.stroke();
      if (p >= 1) {
        const q = (t * 0.5 + k * 0.17) % 1;
        ctx.fillStyle = ink(Math.sin(q * Math.PI) * 0.9 * s);
        ctx.fillRect(nodes[a][0] + (nodes[b][0] - nodes[a][0]) * q - 1.5, nodes[a][1] + (nodes[b][1] - nodes[a][1]) * q - 1.5, 3, 3);
      }
    });
    nodes.forEach(([x, y], k) => {
      const pop = clamp01(t * 2.4 - k * 0.2);
      ctx.fillStyle = ink(0.12 * s * pop, CORAL); ctx.beginPath(); ctx.arc(x, y, 9 * pop, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = ink((k === 0 ? 1 : 0.7) * s * pop); ctx.beginPath(); ctx.arc(x, y, (k === 0 ? 5 : 3.6) * pop, 0, Math.PI * 2); ctx.fill();
    });
  },
  route({ ctx, cx, cy, R, t, s }) {
    const a = [cx - R * 1.5, cy + R * 0.8], b = [cx + R * 1.5, cy - R * 0.8], c1 = [cx - R * 0.2, cy + R * 0.9], c2 = [cx + R * 0.2, cy - R * 0.9];
    const at = (u: number) => { const v = 1 - u; return [v ** 3 * a[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u ** 3 * b[0], v ** 3 * a[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u ** 3 * b[1]]; };
    ctx.strokeStyle = ink(0.4 * s); ctx.lineWidth = 1.2; ctx.setLineDash([3, 5]);
    ctx.beginPath(); for (let u = 0; u <= 1.001; u += 0.04) { const [x, y] = at(u); if (u) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = ink(0.8 * s); ctx.strokeRect(a[0] - 5, a[1] - 5, 10, 10);
    ctx.fillStyle = ink(0.85 * s); ctx.fillRect(b[0] - 5, b[1] - 5, 10, 10);
    for (let k = 0; k < 3; k++) { const u = (t * 0.14 + k / 3) % 1, [x, y] = at(u); ctx.fillStyle = ink(Math.sin(u * Math.PI) * s); ctx.fillRect(x - 3.5, y - 3.5, 7, 7); }
  },
  trade({ ctx, cx, cy, R, t, s }) {
    ctx.strokeStyle = ink(0.55 * s); ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = ink(0.28 * s); ctx.lineWidth = 1;
    for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(Math.cos(t * 0.35 + (k * Math.PI) / 3)) * R, R, 0, 0, Math.PI * 2); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.32, 0, 0, Math.PI * 2); ctx.stroke();
    [[-0.6, 0.3, 0.7, -0.35], [-0.2, -0.65, 0.55, 0.5]].forEach(([x1, y1, x2, y2], k) => {
      const A = [cx + x1 * R, cy + y1 * R], B = [cx + x2 * R, cy + y2 * R], M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 - R * 0.9];
      const at = (u: number) => [(1 - u) ** 2 * A[0] + 2 * (1 - u) * u * M[0] + u * u * B[0], (1 - u) ** 2 * A[1] + 2 * (1 - u) * u * M[1] + u * u * B[1]];
      ctx.strokeStyle = ink(0.6 * s); ctx.lineWidth = 1.2;
      ctx.beginPath(); for (let u = 0; u <= 1.001; u += 0.05) { const [x, y] = at(u); if (u) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke();
      const [x, y] = at((t * 0.22 + k * 0.5) % 1);
      ctx.fillStyle = ink(s); ctx.fillRect(x - 3, y - 3, 6, 6);
      ctx.fillStyle = ink(0.8 * s); [A, B].forEach(([px, py]) => { ctx.beginPath(); ctx.arc(px, py, 2.4, 0, Math.PI * 2); ctx.fill(); });
    });
  },
  steam({ ctx, cx, cy, R, t, s }) {
    const by = cy + R * 0.55;
    ctx.strokeStyle = ink(0.85 * s); ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(cx, by, R * 0.85, 0, Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - R * 1.05, by); ctx.lineTo(cx + R * 1.05, by); ctx.stroke();
    for (let k = -1; k <= 1; k++) {
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 16; i++) {
        const p0 = i / 16, p1 = (i + 1) / 16;
        const pt = (p: number) => [cx + k * R * 0.42 + Math.sin(p * 5 - t * 2.2 + k * 1.7) * 5 * (0.4 + p), by - 8 - p * R * 1.5];
        const [x0, y0] = pt(p0), [x1, y1] = pt(p1);
        ctx.strokeStyle = ink((1 - p0) * 0.6 * s, CORAL);
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      }
    }
  },
  pulse({ ctx, w, cx, cy, R, t, s }) {
    const x0 = cx - R * 1.9, x1 = Math.min(w + 4, cx + R * 1.9), period = R * 1.5, head = x0 + ((t * 0.45) % 1) * (x1 - x0);
    const beat = (x: number) => { const u = ((x - x0) % period) / period; return u < 0.5 ? 0 : u < 0.56 ? -0.25 : u < 0.62 ? 1 : u < 0.7 ? -0.55 : u < 0.78 ? 0.18 : 0; };
    ctx.lineWidth = 1.6; ctx.lineJoin = 'round';
    for (let x = x0; x < x1; x += 3) {
      const d = head - x, a = d >= 0 ? Math.max(0.12, 1 - d / (R * 2.2)) : 0.12;
      ctx.strokeStyle = ink(a * 0.9 * s);
      ctx.beginPath(); ctx.moveTo(x, cy - beat(x) * R * 0.8); ctx.lineTo(x + 3, cy - beat(x + 3) * R * 0.8); ctx.stroke();
    }
    ctx.fillStyle = ink(s); ctx.beginPath(); ctx.arc(head, cy - beat(head) * R * 0.8, 3.2, 0, Math.PI * 2); ctx.fill();
  },
  equalizer({ ctx, cx, cy, R, t, s }) {
    const n = 11, bw = Math.max(4, R * 0.16), gap = bw * 0.9, x0 = cx - (n * (bw + gap) - gap) / 2, base = cy + R * 0.75;
    for (let k = 0; k < n; k++) {
      const v = 0.18 + 0.82 * Math.abs(Math.sin(t * (2.2 + hash(k) * 1.8) + k * 0.8)) * (0.55 + 0.45 * Math.sin(t * 0.9 + k * 0.5) ** 2);
      const hgt = v * R * 1.5, x = x0 + k * (bw + gap);
      ctx.fillStyle = ink((0.35 + 0.5 * v) * s); ctx.fillRect(x, base - hgt, bw, hgt);
      ctx.fillStyle = ink(0.1 * s, CORAL); ctx.fillRect(x, base + 3, bw, hgt * 0.25);
    }
  },
  calendar({ ctx, cx, cy, R, t, s }) {
    const cols = 7, rows = 4, g = Math.max(12, R * 0.44), x0 = cx - (cols * g) / 2, y0 = cy - (rows * g) / 2, day = 17;
    const now = Math.min(day, Math.floor((t % 7) * 4.5));
    for (let i = 0; i < cols * rows; i++) {
      const x = x0 + (i % cols) * g, y = y0 + Math.floor(i / cols) * g;
      ctx.strokeStyle = ink(0.22 * s); ctx.lineWidth = 1; ctx.strokeRect(x + 2, y + 2, g - 4, g - 4);
      if (i < now) { ctx.fillStyle = ink(0.16 * s, CORAL); ctx.fillRect(x + 2, y + 2, g - 4, g - 4); }
      if (i === now && now < day) { ctx.fillStyle = ink(0.5 * s); ctx.fillRect(x + 2, y + 2, g - 4, g - 4); }
    }
    const ex = x0 + (day % cols) * g + g / 2, ey = y0 + Math.floor(day / cols) * g + g / 2;
    ctx.fillStyle = ink((now >= day ? 0.95 : 0.35) * s); ctx.fillRect(ex - g / 2 + 2, ey - g / 2 + 2, g - 4, g - 4);
    if (now >= day) for (let k = 0; k < 2; k++) { const q = (t * 0.7 + k * 0.5) % 1; ctx.strokeStyle = ink((1 - q) * 0.7 * s); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(ex, ey, g * 0.5 + q * g * 1.3, 0, Math.PI * 2); ctx.stroke(); }
  },
  flight({ ctx, cx, cy, R, t, s }) {
    const A = [cx - R * 1.7, cy + R * 0.75], B = [cx + R * 1.6, cy + R * 0.35], M = [cx, cy - R * 1.7];
    const at = (u: number) => [(1 - u) ** 2 * A[0] + 2 * (1 - u) * u * M[0] + u * u * B[0], (1 - u) ** 2 * A[1] + 2 * (1 - u) * u * M[1] + u * u * B[1]];
    const u = ease((t * 0.2) % 1);
    ctx.strokeStyle = ink(0.2 * s); ctx.lineWidth = 1; ctx.setLineDash([2, 5]);
    ctx.beginPath(); for (let v = 0; v <= 1.001; v += 0.04) { const [x, y] = at(v); if (v) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = ink(0.8 * s); ctx.lineWidth = 1.5;
    ctx.beginPath(); for (let v = 0; v <= u + 0.001; v += 0.03) { const [x, y] = at(Math.min(v, u)); if (v) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke();
    const [px, py] = at(u), [qx, qy] = at(Math.min(1, u + 0.02)), ang = Math.atan2(qy - py, qx - px);
    ctx.save(); ctx.translate(px, py); ctx.rotate(ang);
    ctx.fillStyle = ink(s); ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(-5, -4.5); ctx.lineTo(-2, 0); ctx.lineTo(-5, 4.5); ctx.closePath(); ctx.fill();
    ctx.restore();
    ctx.fillStyle = ink(0.7 * s); ctx.beginPath(); ctx.arc(A[0], A[1], 3, 0, Math.PI * 2); ctx.fill();
    const q = (t * 0.6) % 1;
    ctx.strokeStyle = ink((1 - q) * 0.6 * s); ctx.beginPath(); ctx.arc(B[0], B[1], 3 + q * 10, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = ink(0.9 * s); ctx.beginPath(); ctx.arc(B[0], B[1], 3, 0, Math.PI * 2); ctx.fill();
  },
};
function ease(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; }

export function TileFx({ kind }: { kind: TileKind }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.closest('[data-fx-root]') as HTMLElement | null;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return undefined;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0, hovered = false, strength = 0, ht = 0, last = 0;

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    };
    const loop = (now: number) => {
      raf = 0;
      const dt = Math.min(50, now - last); last = now;
      strength += ((hovered ? 1 : 0) - strength) * Math.min(1, dt * 0.005);
      ht = still ? 4 : ht + dt / 1000;
      const s = still ? (hovered ? 1 : 0) : strength;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'butt'; ctx.setLineDash([]);
      // The picture sits to the right of the middle, clear of the title.
      DRAW[kind]({ ctx, w, h, cx: w * 0.66, cy: h * 0.46, R: Math.min(w * 0.19, h * 0.3), t: ht, s });
      if (hovered || strength > 0.01) raf = requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, w, h);
    };
    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    const on = () => { if (strength < 0.02) ht = 0; hovered = true; start(); };
    const off = () => { hovered = false; start(); };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    let io: IntersectionObserver | null = null;
    if (canHover) {
      host.addEventListener('pointerenter', on);
      host.addEventListener('pointerleave', off);
      host.addEventListener('focusin', on);
      host.addEventListener('focusout', off);
    } else {
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? on() : off()), { rootMargin: '-40% 0px -40% 0px' });
      io.observe(host);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      host.removeEventListener('pointerenter', on);
      host.removeEventListener('pointerleave', off);
      host.removeEventListener('focusin', on);
      host.removeEventListener('focusout', off);
    };
  }, [kind]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70 sm:opacity-100" />;
}
