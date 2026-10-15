// Hero backgrounds for the solution pages, in the same fine isometric line
// as the container yard of Industrial & Logistics (Yard.tsx): one drawn
// scene per solution, each with a little life in it.
//
//   towers   Property Management   a city block; windows light and go dark,
//                                  and one building at a time is surveyed
//   office   Workspace Leasing     a floor of offices, a meeting pod, desks
//                                  and a lounge; screens wake, people cross
//   market   Business Services     Vietnam as a landscape of columns rising
//                                  from north to south, routes between the
//                                  three cities
//   lounge   Concierge Services    the Business Club's chequered floor and
//                                  shutters; a bell rings at the desk and
//                                  the concierge walks over
//
// 2D canvas, drawn back to front. A scene fills its section from the right
// and fades out under the copy (from below on phones); it runs while on
// screen, the same on phones, and stops off screen. Reduced motion shows one
// still frame.
// On phones (lib/calm.ts) it is drawn still, as for reduced motion.
import { useEffect, useRef } from 'react';
import { VN, PHU_QUOC, ISLANDS, CITIES, inside } from '../lib/vietnam';
import { stillMotion } from '../lib/calm';

export type SceneKind = 'towers' | 'office' | 'market' | 'lounge';

const LINE = '240,106,110';
const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
// top, the long side towards the viewer, the end; and how strong the edges are
const TONES = {
  dark: ['#4A2321', '#3A1918', '#2C1211', 0.42],
  mid: ['#5A2B28', '#47201E', '#371816', 0.45],
  pale: ['#7A4640', '#623630', '#4E2924', 0.5],
  red: ['#C4222A', '#9C1A22', '#7F141B', 0.75],
  glass: [`rgba(${LINE},0.08)`, `rgba(${LINE},0.06)`, `rgba(${LINE},0.04)`, 0.5],
} as const;
type Tone = keyof typeof TONES;
type P3 = [number, number, number];
type Box = { x: number; y: number; z: number; lx: number; ly: number; lz: number; tone?: Tone; key: number; after?: (b: Box) => void };
type Api = {
  u: number;
  ctx: CanvasRenderingContext2D;
  iso: (x: number, y: number, z: number) => [number, number];
  poly: (pts: P3[], fill: string | null, stroke: string | null) => void;
  path: (pts: P3[], stroke: string, dash?: number[]) => void;
  draw: (boxes: Box[]) => void;
};
// `lift`: how far above the foot of the section the scene sits on phones (px);
// `mx`: where its centre sits across a phone screen (0–1).
type Scene = { span: P3; scale: number; lift?: number; mx?: number; frame: (t: number, api: Api) => void };

const seeded = (seed: number) => {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
};
const hash = (a: number, b = 0, c = 0) => {
  const v = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453;
  return v - Math.floor(v);
};
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const stroke = (a: number) => `rgba(${LINE},${a})`;

// ── Property Management: a city block ──────────────────────────────────────
function towers(): Scene {
  const rand = seeded(86028121);
  const PLOT = 2.3, STREET = 1.15, FLOOR = 0.52;
  const blocks: { i: number; j: number; x: number; y: number; l: number; floors: number; cap: boolean }[] = [];
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) {
    const l = 1.7 + rand() * 0.5;
    blocks.push({ i, j, x: i * (PLOT + STREET) + (PLOT - l) / 2, y: j * (PLOT + STREET) + (PLOT - l) / 2, l, floors: 4 + Math.floor(rand() * 9), cap: rand() > 0.45 });
  }
  const span: P3 = [4 * PLOT + 3 * STREET, 3 * PLOT + 2 * STREET, 4];
  return {
    span, scale: 1.06,
    frame(t, { poly, path, draw, iso, ctx, u }) {
      // streets
      for (let k = 1; k < 4; k++) { const x = k * (PLOT + STREET) - STREET / 2; path([[x, -1, 0], [x, span[1] + 1, 0]], stroke(0.1), [u * 0.4, u * 0.4]); }
      for (let k = 1; k < 3; k++) { const y = k * (PLOT + STREET) - STREET / 2; path([[-1, y, 0], [span[0] + 1, y, 0]], stroke(0.1), [u * 0.4, u * 0.4]); }
      const active = Math.floor(t / 4.5) % blocks.length;
      const picked = (active * 5) % blocks.length;      // wander, not march
      const boxes: Box[] = [];
      blocks.forEach((b, n) => {
        const h = b.floors * FLOOR;
        const on = n === picked;
        boxes.push({
          x: b.x, y: b.y, z: 0, lx: b.l, ly: b.l, lz: h, tone: on ? 'mid' : 'dark', key: b.j * 1000 + b.i * 10,
          after: () => {
            // floors, and windows that light and go dark
            const cols = 4;
            for (let f = 0; f < b.floors; f++) {
              const z0 = f * FLOOR + 0.12, z1 = (f + 1) * FLOOR - 0.1;
              for (let c = 0; c < cols; c++) {
                const a0 = (c + 0.18) / cols, a1 = (c + 0.82) / cols;
                for (const side of [0, 1]) {
                  const lit = Math.sin(t * (0.25 + hash(n, f, c + side * 9) * 0.5) + hash(n, c, f + side * 5) * 40) > 0.55;
                  const pts: P3[] = side === 0
                    ? [[b.x + a0 * b.l, b.y + b.l, z0], [b.x + a1 * b.l, b.y + b.l, z0], [b.x + a1 * b.l, b.y + b.l, z1], [b.x + a0 * b.l, b.y + b.l, z1]]
                    : [[b.x + b.l, b.y + a0 * b.l, z0], [b.x + b.l, b.y + a1 * b.l, z0], [b.x + b.l, b.y + a1 * b.l, z1], [b.x + b.l, b.y + a0 * b.l, z1]];
                  poly(pts, lit ? `rgba(255,${side ? 150 : 176},${side ? 130 : 150},${on ? 0.85 : 0.5})` : null, stroke(on ? 0.3 : 0.14));
                }
              }
            }
            if (on) {
              // the survey: a red line rising round the building, its edges picked out
              const z = ((t % 4.5) / 4.5) * h;
              ctx.lineWidth = 1.6;
              path([[b.x, b.y + b.l, z], [b.x + b.l, b.y + b.l, z], [b.x + b.l, b.y, z]], 'rgba(255,90,96,0.95)');
              path([[b.x, b.y + b.l, 0], [b.x, b.y + b.l, h], [b.x + b.l, b.y + b.l, h], [b.x + b.l, b.y + b.l, 0]], 'rgba(255,90,96,0.7)');
              path([[b.x + b.l, b.y + b.l, h], [b.x + b.l, b.y, h], [b.x + b.l, b.y, 0]], 'rgba(255,90,96,0.7)');
              path([[b.x, b.y + b.l, h], [b.x, b.y, h], [b.x + b.l, b.y, h]], 'rgba(255,90,96,0.7)');
              ctx.lineWidth = 1;
              const [mx, my] = iso(b.x + b.l / 2, b.y + b.l / 2, h);
              ctx.fillStyle = '#D12126';
              ctx.fillRect(mx - 3, my - 0.9 * u - 3, 6, 6);
              ctx.strokeStyle = 'rgba(255,90,96,0.7)';
              ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, my - 0.9 * u); ctx.stroke();
            }
          },
        });
        if (b.cap) boxes.push({ x: b.x + b.l * 0.2, y: b.y + b.l * 0.2, z: h, lx: b.l * 0.45, ly: b.l * 0.45, lz: 0.35, tone: n % 5 === 0 ? 'red' : 'dark', key: b.j * 1000 + b.i * 10 + 1 });
      });
      draw(boxes);
    },
  };
}

// ── Workspace Leasing: a floor of offices ──────────────────────────────────
function office(): Scene {
  const span: P3 = [13, 9.4, 1.4];
  const K = (x: number, y: number) => y * 1000 + x * 10;
  const fixed: Box[] = [];
  // the slab
  fixed.push({ x: -0.4, y: -0.4, z: -0.3, lx: span[0] + 0.8, ly: span[1] + 0.8, lz: 0.3, tone: 'dark', key: -1e6 });
  // private offices along the back, in glass
  [0.5, 3.6, 6.7].forEach((x, k) => {
    fixed.push({ x: x + 0.6, y: 1.0, z: 0, lx: 1.6, ly: 0.75, lz: 0.5, tone: 'pale', key: K(x, 1.0) });
    fixed.push({ x: x + 1.1, y: 1.9, z: 0, lx: 0.45, ly: 0.45, lz: 0.55, tone: k === 1 ? 'red' : 'mid', key: K(x, 1.9) });
    fixed.push({ x, y: 0.3, z: 0, lx: 2.8, ly: 2.5, lz: 1.5, tone: 'glass', key: K(x, 2.81) });
  });
  // the meeting pod: a table and six chairs in a glass room
  fixed.push({ x: 10.3, y: 1.0, z: 0, lx: 1.5, ly: 2.2, lz: 0.5, tone: 'pale', key: K(10.3, 1.0) });
  for (let k = 0; k < 3; k++) {
    fixed.push({ x: 9.75, y: 1.1 + k * 0.75, z: 0, lx: 0.4, ly: 0.4, lz: 0.5, tone: 'mid', key: K(9.75, 1.1 + k * 0.75) });
    fixed.push({ x: 11.95, y: 1.1 + k * 0.75, z: 0, lx: 0.4, ly: 0.4, lz: 0.5, tone: 'mid', key: K(11.95, 1.1 + k * 0.75) });
  }
  fixed.push({ x: 9.5, y: 0.3, z: 0, lx: 3.1, ly: 3.4, lz: 1.5, tone: 'glass', key: K(9.5, 3.71) });
  // benches of desks, each with a screen and a chair
  const desks: { x: number; y: number; n: number }[] = [];
  [4.7, 6.5].forEach((y, r) => [0.6, 2.3, 4.0, 6.3, 8.0].forEach((x, c) => {
    desks.push({ x, y, n: r * 5 + c });
    fixed.push({ x, y, z: 0, lx: 1.5, ly: 0.7, lz: 0.48, tone: 'pale', key: K(x, y) });
    fixed.push({ x: x + 0.55, y: y + 0.85, z: 0, lx: 0.42, ly: 0.42, lz: 0.5, tone: 'mid', key: K(x, y + 0.85) });
  }));
  // the lounge: a sofa, two armchairs, a low table, plants
  fixed.push({ x: 10.4, y: 5.0, z: 0, lx: 0.8, ly: 2.6, lz: 0.5, tone: 'red', key: K(10.4, 5.0) });
  fixed.push({ x: 10.2, y: 5.0, z: 0, lx: 0.22, ly: 2.6, lz: 0.95, tone: 'red', key: K(10.19, 5.0) });
  fixed.push({ x: 11.6, y: 5.7, z: 0, lx: 0.8, ly: 1.2, lz: 0.32, tone: 'pale', key: K(11.6, 5.7) });
  fixed.push({ x: 11.6, y: 7.9, z: 0, lx: 0.8, ly: 0.8, lz: 0.5, tone: 'mid', key: K(11.6, 7.9) });
  [[9.3, 4.6], [12.4, 4.3], [0.2, 8.4]].forEach(([x, y]) => {
    fixed.push({ x, y, z: 0, lx: 0.42, ly: 0.42, lz: 0.4, tone: 'dark', key: K(x, y) });
    fixed.push({ x: x - 0.1, y: y - 0.1, z: 0.4, lx: 0.62, ly: 0.62, lz: 0.8, tone: 'pale', key: K(x, y) + 1 });
  });
  // people cross the floor along the aisles
  const routes: P3[][] = [
    [[-0.6, 3.6, 0], [9.0, 3.6, 0], [9.0, 5.6, 0], [10.0, 5.6, 0]],
    [[13.4, 8.6, 0], [5.6, 8.6, 0], [5.6, 3.6, 0], [3.2, 3.6, 0], [3.2, 2.9, 0]],
    [[-0.6, 8.6, 0], [3.4, 8.6, 0], [3.4, 5.9, 0]],
  ];
  const along = (pts: P3[], p: number): P3 => {
    const lens = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
    let d = p * lens.reduce((a, b) => a + b, 0);
    for (let i = 0; i < lens.length; i++) { if (d <= lens[i]) { const k = d / lens[i]; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k, 0]; } d -= lens[i]; }
    return pts[pts.length - 1];
  };
  return {
    span, scale: 1.02,
    frame(t, { draw }) {
      const boxes = [...fixed];
      desks.forEach((d) => {
        const on = Math.sin(t * 0.22 + hash(d.n, 3) * 30) > -0.15;
        boxes.push({ x: d.x + 0.45, y: d.y + 0.08, z: 0.48, lx: 0.6, ly: 0.08, lz: 0.4, tone: on ? 'red' : 'dark', key: K(d.x, d.y) + 2 });
      });
      routes.forEach((r, k) => {
        // there and back, with a pause at each end
        const cyc = ((t * 0.045 + k * 0.37) % 1) * 2;
        const p = ease(clamp01((cyc < 1 ? cyc : 2 - cyc) * 1.25 - 0.125));
        const [x, y] = along(r, p);
        boxes.push({ x: x - 0.15, y: y - 0.15, z: 0, lx: 0.3, ly: 0.3, lz: 0.72, tone: 'red', key: K(x, y) });
        boxes.push({ x: x - 0.12, y: y - 0.12, z: 0.78, lx: 0.24, ly: 0.24, lz: 0.24, tone: 'pale', key: K(x, y) + 1 });
      });
      draw(boxes);
    },
  };
}

// ── Business Services: Vietnam as a landscape of columns ───────────────────
// A fine grid of slim columns, tallest round the three cities. They rise
// from north to south; a band of light then travels down the country every
// few seconds. Each city carries a beam and its name; routes arrive from
// abroad and run between the cities, a light with a tail along each.
function market(): Scene {
  const STEP = 0.4, LON0 = 102.0, LAT0 = 23.6, COLS = 20, ROWS = 39;
  const cells: { x: number; y: number; h: number; city: number; isle: boolean; n: number }[] = [];
  const toXY = ([lon, lat]: [number, number]) => [Math.round((lon - LON0) / STEP), Math.round((LAT0 - lat) / STEP)];
  const cityXY = CITIES.map(toXY);
  const PEAK = [6.6, 3.8, 7.4];
  const NAMES = ['HÀ NỘI', 'ĐÀ NẴNG', 'TP. HỒ CHÍ MINH'];
  for (let gy = 0; gy < ROWS; gy++) for (let gx = 0; gx < COLS; gx++) {
    const lon = LON0 + gx * STEP, lat = LAT0 - gy * STEP;
    if (!inside(VN, lon, lat) && !inside(PHU_QUOC, lon, lat)) continue;
    let h = 0.45 + hash(gx, gy) * 0.8, city = -1;
    cityXY.forEach(([cx, cy], k) => {
      const d = Math.hypot(gx - cx, gy - cy);
      h += PEAK[k] * Math.exp(-(d * d) / 5.5) * (0.82 + hash(gx * 3, gy * 7) * 0.36);
    });
    cells.push({ x: gx, y: gy, h, city, isle: false, n: hash(gx, gy, 5) });
  }
  // Each city is the cell nearest to it (the coast is simplified, so the exact
  // spot may fall just outside the outline).
  cityXY.forEach(([cx, cy], k) => {
    const near = cells.reduce((a, b) => (Math.hypot(a.x - cx, a.y - cy) <= Math.hypot(b.x - cx, b.y - cy) ? a : b));
    near.city = k; near.h = PEAK[k] + 1.2;
    cityXY[k] = [near.x, near.y];
  });
  ISLANDS.forEach((p, k) => { const [x, y] = toXY(p); cells.push({ x, y, h: 0.35, city: -1, isle: true, n: k / 12 }); });
  cells.sort((a, b) => a.x + a.y - (b.x + b.y));
  const span: P3 = [COLS + 2, ROWS, 3];
  const mix = (l: number, red: boolean, k = 1) => {
    const a = red ? [150, 22, 30] : [52, 22, 21], b = red ? [255, 96, 88] : [255, 132, 112];
    const v = clamp01(l);
    return `rgb(${a.map((c, i) => Math.round((c + (b[i] - c) * v) * k)).join(',')})`;
  };
  // Routes: three in from abroad (north-east, east, south-east), three between the cities.
  const top = (n: number) => PEAK[n] + 1.2;
  const routes: { at: (p: number) => P3; delay: number }[] = [];
  [[COLS + 14, -8], [COLS + 16, 14], [COLS + 12, ROWS + 4]].forEach(([fx, fy], k) => {
    const [cx, cy] = cityXY[k];
    routes.push({ delay: 2.2 + k * 0.5, at: (p) => [fx + (cx + 0.4 - fx) * p, fy + (cy + 0.4 - fy) * p, 1 + (top(k) - 1) * p + Math.sin(p * Math.PI) * 9] });
  });
  [[0, 1], [1, 2]].forEach(([a, b], k) => {
    const [ax, ay] = cityXY[a], [bx, by] = cityXY[b];
    routes.push({ delay: 3.6 + k * 0.5, at: (p) => [ax + 0.4 + (bx - ax) * p, ay + 0.4 + (by - ay) * p, top(a) + (top(b) - top(a)) * p + Math.sin(p * Math.PI) * 5] });
  });
  return {
    span, scale: 0.62, lift: 330, mx: 0.44,
    frame(t, { iso, ctx, u, path }) {
      // the sea: a field of faint points on the ground plane
      ctx.fillStyle = stroke(0.13);
      for (let gy = -4; gy <= ROWS + 4; gy += 2) for (let gx = -6; gx <= COLS + 16; gx += 2) {
        const [x, y] = iso(gx, gy, 0);
        ctx.fillRect(x - 0.6, y - 0.6, 1.2, 1.2);
      }
      // a band of light running north to south, every seven seconds
      const band = ((t - 4) % 7) / 7 * (ROWS + 16) - 8;
      const tops: P3[] = [];
      for (const c of cells) {
        const grow = ease(clamp01((t * 12 - c.y) / 7));
        const wave = t > 4 ? Math.exp(-(((c.y - band) / 2.6) ** 2)) : 0;
        const h = Math.max(0.1, (c.h + wave * 0.5) * grow * (1 + 0.035 * Math.sin(t * 0.8 + c.n * 20)));
        const red = c.city >= 0;
        // brighter the taller it stands, and under the band of light
        const l = (c.isle ? 0.2 : 0.02 + Math.min(1, c.h / 7) * 0.56) + wave * 0.42 + (red ? 0.25 : 0);
        const x = c.x + 0.1, y = c.y + 0.1, x1 = c.x + 0.9, y1 = c.y + 0.9;
        const a = iso(x, y1, 0), b = iso(x1, y1, 0), e = iso(x1, y, 0);
        const a1 = iso(x, y1, h), b1 = iso(x1, y1, h), e1 = iso(x1, y, h), d1 = iso(x, y, h);
        const side = (p: [number, number], q: [number, number], q1: [number, number], p1: [number, number], k: number) => {
          const g = ctx.createLinearGradient(0, p[1], 0, p1[1]);
          g.addColorStop(0, mix(l * 0.18, red, k)); g.addColorStop(1, mix(l, red, k));
          ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.lineTo(q1[0], q1[1]); ctx.lineTo(p1[0], p1[1]); ctx.closePath();
          ctx.fillStyle = g; ctx.fill();
        };
        side(a, b, b1, a1, 0.86);
        side(b, e, e1, b1, 0.58);
        ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(b1[0], b1[1]); ctx.lineTo(e1[0], e1[1]); ctx.lineTo(d1[0], d1[1]); ctx.closePath();
        ctx.fillStyle = mix(l + 0.09, red); ctx.fill();
        ctx.strokeStyle = stroke(0.16 + clamp01(l) * 0.5); ctx.lineWidth = 0.75; ctx.stroke();
        if (red) tops[c.city] = [c.x + 0.5, c.y + 0.5, h];
      }
      ctx.lineWidth = 1;
      // routes, each with a light and its tail
      routes.forEach((r, k) => {
        const shown = clamp01((t - r.delay) * 0.55);
        if (shown <= 0) return;
        const pts: P3[] = [];
        for (let p = 0; p <= shown + 1e-6; p += 0.025) pts.push(r.at(p));
        path(pts, stroke(0.3), [2, 5]);
        if (shown < 1) return;
        const head = (t * 0.085 + k * 0.23) % 1;
        for (let n = 0; n < 14; n++) {
          const p0 = head - n * 0.012, p1 = head - (n + 1) * 0.012;
          if (p1 < 0) break;
          path([r.at(p0), r.at(p1)], `rgba(255,170,150,${(1 - n / 14) * 0.95})`);
        }
        const [hx, hy] = iso(...r.at(head));
        ctx.fillStyle = '#FFD2C4'; ctx.beginPath(); ctx.arc(hx, hy, 2, 0, Math.PI * 2); ctx.fill();
      });
      // the three cities: a beam, a ring breathing on the roof, a name
      const shownLabels = clamp01((t - 2.4) / 1.2);
      tops.forEach((p, k) => {
        if (!p) return;
        const [x, y] = iso(...p);
        const beam = ctx.createLinearGradient(0, y, 0, y - 7 * u);
        beam.addColorStop(0, 'rgba(255,120,104,0.9)'); beam.addColorStop(1, 'rgba(255,120,104,0)');
        ctx.strokeStyle = beam; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 7 * u * shownLabels); ctx.stroke();
        ctx.lineWidth = 1;
        const q = (t * 0.35 + k * 0.33) % 1;
        const ring: P3[] = [];
        for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 16) ring.push([p[0] + Math.cos(a) * (0.6 + q * 2.6), p[1] + Math.sin(a) * (0.6 + q * 2.6), p[2] + 0.05]);
        path(ring, `rgba(255,130,116,${(1 - q) * 0.7 * shownLabels})`);
        ctx.globalAlpha = shownLabels;
        ctx.fillStyle = '#FFE6DE'; ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
        // the name, on a short leader to the right
        const ly = y - 3.2 * u - k * 0.4 * u;
        ctx.strokeStyle = 'rgba(255,214,203,0.5)';
        ctx.beginPath(); ctx.moveTo(x, ly); ctx.lineTo(x + 26, ly); ctx.stroke();
        ctx.font = `500 ${Math.max(9, Math.min(11.5, u * 0.62))}px "Inter Variable", system-ui, sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(255,232,225,0.92)';
        let tx = x + 32;
        for (const ch of NAMES[k]) { ctx.fillText(ch, tx, ly); tx += ctx.measureText(ch).width + 1.6; }
        ctx.globalAlpha = 1;
      });
    },
  };
}

// ── Concierge Services: the club's lounge ──────────────────────────────────
function lounge(): Scene {
  const N = 9;
  const span: P3 = [N, N, 1.6];
  const K = (x: number, y: number) => y * 1000 + x * 10;
  const fixed: Box[] = [];
  // the reception desk and its top
  fixed.push({ x: 4.6, y: 0.7, z: 0, lx: 3.2, ly: 0.9, lz: 1.0, tone: 'mid', key: K(4.6, 0.7) });
  fixed.push({ x: 4.5, y: 0.6, z: 1.0, lx: 3.4, ly: 1.1, lz: 0.1, tone: 'pale', key: K(4.6, 0.7) + 1 });
  // a sofa under the shutters
  fixed.push({ x: 0.5, y: 1.2, z: 0, lx: 0.95, ly: 2.6, lz: 0.45, tone: 'red', key: K(0.5, 1.2) });
  fixed.push({ x: 0.3, y: 1.2, z: 0, lx: 0.22, ly: 2.6, lz: 1.0, tone: 'red', key: K(0.29, 1.2) });
  // two armchairs round a trunk
  const chair = (x: number, y: number, tone: Tone, back: 'x' | 'y') => {
    fixed.push({ x, y, z: 0, lx: 0.9, ly: 0.9, lz: 0.42, tone, key: K(x, y) });
    if (back === 'y') fixed.push({ x, y: y + 0.74, z: 0.42, lx: 0.9, ly: 0.16, lz: 0.6, tone, key: K(x, y) + 2 });
    else fixed.push({ x: x + 0.74, y, z: 0.42, lx: 0.16, ly: 0.9, lz: 0.6, tone, key: K(x, y) + 2 });
  };
  chair(2.2, 6.6, 'pale', 'y');
  chair(5.0, 4.6, 'pale', 'x');
  fixed.push({ x: 2.6, y: 4.5, z: 0, lx: 1.7, ly: 1.0, lz: 0.5, tone: 'mid', key: K(2.6, 4.5) });
  fixed.push({ x: 3.1, y: 4.75, z: 0.5, lx: 0.5, ly: 0.4, lz: 0.06, tone: 'pale', key: K(2.6, 4.5) + 1 });
  // a plant, and a floor lamp with a lit shade
  fixed.push({ x: 7.6, y: 6.9, z: 0, lx: 0.5, ly: 0.5, lz: 0.5, tone: 'dark', key: K(7.6, 6.9) });
  fixed.push({ x: 7.45, y: 6.75, z: 0.5, lx: 0.8, ly: 0.8, lz: 1.0, tone: 'pale', key: K(7.6, 6.9) + 1 });
  const LAMP: P3 = [1.2, 4.9, 1.9];
  fixed.push({ x: LAMP[0], y: LAMP[1], z: 0, lx: 0.1, ly: 0.1, lz: LAMP[2], tone: 'pale', key: K(LAMP[0], LAMP[1]) });
  fixed.push({ x: LAMP[0] - 0.3, y: LAMP[1] - 0.3, z: LAMP[2], lx: 0.7, ly: 0.7, lz: 0.5, tone: 'red', key: K(LAMP[0], LAMP[1]) + 1 });
  // the concierge's round: desk → trunk → desk
  const walk: P3[] = [[5.6, 2.0, 0], [4.2, 2.0, 0], [4.2, 4.0, 0], [3.6, 4.0, 0]];
  const BELL: P3 = [6.9, 1.1, 1.1];
  const CYCLE = 9;
  return {
    span, scale: 1.26,
    frame(t, { draw, poly, path, iso, ctx, u }) {
      // chequered marble
      for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
        poly([[i, j, 0], [i + 1, j, 0], [i + 1, j + 1, 0], [i, j + 1, 0]], (i + j) % 2 ? '#2E1413' : '#5C2F2B', stroke(0.16));
      }
      // shuttered walls behind: panels with louvres
      for (let k = 0; k < 4; k++) {
        const a = 0.4 + k * 2.2;
        poly([[a, 0, 0], [a + 1.7, 0, 0], [a + 1.7, 0, 2.6], [a, 0, 2.6]], `rgba(${LINE},0.05)`, stroke(0.4));
        poly([[0, a, 0], [0, a + 1.7, 0], [0, a + 1.7, 2.6], [0, a, 2.6]], `rgba(${LINE},0.03)`, stroke(0.4));
        for (let z = 0.25; z < 2.5; z += 0.2) {
          path([[a + 0.12, 0, z], [a + 1.58, 0, z]], stroke(0.16));
          path([[0, a + 0.12, z], [0, a + 1.58, z]], stroke(0.16));
        }
      }
      // the lamp's pool of light on the floor
      const [lx, ly] = iso(LAMP[0], LAMP[1], 0);
      const glow = ctx.createRadialGradient(lx, ly, 0, lx, ly, 2.6 * u);
      glow.addColorStop(0, `rgba(255,150,120,${0.2 + 0.04 * Math.sin(t * 1.3)})`); glow.addColorStop(1, 'rgba(255,150,120,0)');
      ctx.save(); ctx.translate(lx, ly); ctx.scale(1, 0.5); ctx.translate(-lx, -ly);
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(lx, ly, 2.6 * u, 0, Math.PI * 2); ctx.fill(); ctx.restore();

      const boxes = [...fixed];
      // the bell rings at the start of each round…
      const c = t % CYCLE;
      boxes.push({ x: BELL[0], y: BELL[1], z: BELL[2], lx: 0.22, ly: 0.22, lz: 0.16 + (c < 0.5 ? 0.05 * Math.sin(c * 40) : 0), tone: 'red', key: K(4.6, 0.7) + 2 });
      // …and the concierge goes over with a tray, waits, and comes back
      const p = c < 1 ? 0 : c < 4 ? ease((c - 1) / 3) : c < 5.5 ? 1 : c < 8.5 ? 1 - ease((c - 5.5) / 3) : 0;
      const lens = walk.slice(1).map((q, i) => Math.hypot(q[0] - walk[i][0], q[1] - walk[i][1]));
      let d = p * lens.reduce((a, b) => a + b, 0), px = walk[0][0], py = walk[0][1];
      for (let i = 0; i < lens.length; i++) { const k = Math.min(1, d / lens[i]); px = walk[i][0] + (walk[i + 1][0] - walk[i][0]) * k; py = walk[i][1] + (walk[i + 1][1] - walk[i][1]) * k; d -= lens[i]; if (d <= 0) break; }
      boxes.push({ x: px - 0.17, y: py - 0.17, z: 0, lx: 0.34, ly: 0.34, lz: 0.8, tone: 'red', key: K(px, py) });
      boxes.push({ x: px - 0.13, y: py - 0.13, z: 0.86, lx: 0.26, ly: 0.26, lz: 0.26, tone: 'pale', key: K(px, py) + 1 });
      boxes.push({ x: px - 0.5, y: py - 0.1, z: 0.62, lx: 0.3, ly: 0.3, lz: 0.05, tone: 'pale', key: K(px, py) + 2 });
      draw(boxes);
      // rings off the bell
      if (c < 1.6) for (let r = 0; r < 2; r++) {
        const q = c / 1.6 - r * 0.25;
        if (q <= 0 || q >= 1) continue;
        const pts: P3[] = [];
        for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 14) pts.push([BELL[0] + 0.11 + Math.cos(a) * q * 1.3, BELL[1] + 0.11 + Math.sin(a) * q * 1.3, BELL[2] + 0.2]);
        path(pts, `rgba(255,120,110,${(1 - q) * 0.8})`);
      }
    },
  };
}

const SCENES: Record<SceneKind, () => Scene> = { towers, office, market, lounge };

export function IsoScene({ kind, className = '' }: { kind: SceneKind; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.closest('section') ?? canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return undefined;
    const still = stillMotion();
    const scene = SCENES[kind]();
    let w = 0, h = 0, dpr = 1, u = 24, ox = 0, oy = 0, raf = 0, visible = false;
    const t0 = performance.now();

    const iso = (x: number, y: number, z: number): [number, number] => [ox + (x - y) * C30 * u, oy + (x + y) * S30 * u - z * u];
    const poly: Api['poly'] = (pts, fill, line) => {
      ctx.beginPath();
      pts.forEach((p, k) => { const [x, y] = iso(...p); if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (line) { ctx.strokeStyle = line; ctx.stroke(); }
    };
    const path: Api['path'] = (pts, line, dash) => {
      if (dash) ctx.setLineDash(dash);
      ctx.beginPath();
      pts.forEach((p, k) => { const [x, y] = iso(...p); if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      ctx.strokeStyle = line; ctx.stroke();
      if (dash) ctx.setLineDash([]);
    };
    const box = (b: Box) => {
      const [top, side, end, edge] = TONES[b.tone ?? 'dark'];
      const { x, y, z } = b, x1 = x + b.lx, y1 = y + b.ly, z1 = z + b.lz;
      const e = stroke(edge);
      poly([[x, y, z1], [x1, y, z1], [x1, y1, z1], [x, y1, z1]], top, e);
      poly([[x, y1, z], [x1, y1, z], [x1, y1, z1], [x, y1, z1]], side, e);
      poly([[x1, y, z], [x1, y1, z], [x1, y1, z1], [x1, y, z1]], end, e);
      b.after?.(b);
    };
    const draw: Api['draw'] = (boxes) => { boxes.sort((a, b) => a.key - b.key).forEach(box); };

    const frame = (now: number) => {
      // Reduced motion: one frame from well into the scene, so nothing is half-grown.
      const t = still ? 7 : (now - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      scene.frame(t, { u, ctx, iso, poly, path, draw });
    };
    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      // Wide screens: the scene fills the right half. Phones: it sits low and
      // smaller, behind the foot of the copy.
      const wide = w >= 1024;
      u = (wide ? Math.min(34, Math.max(20, w / 52)) : Math.max(11, w / 30)) * scene.scale;
      const cx = wide ? w * 0.72 : w * (scene.mx ?? 0.56), cy = wide ? h * 0.55 : h - (scene.lift ?? Math.min(190, h * 0.22));
      const [sx, sy, sz] = scene.span;
      ox = cx - (sx / 2 - sy / 2) * C30 * u;
      oy = cy - (sx / 2 + sy / 2) * S30 * u + (sz / 2) * u;
      frame(performance.now());
    };
    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      frame(now);
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
  }, [kind]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_42%,#000_80%)] lg:[mask-image:linear-gradient(to_right,transparent_30%,#000_60%)] ${className}`}
    />
  );
}
