// The small picture behind each service tile on the Business Club page, shown
// on hover. Each is made of hundreds of small dots in a run of HiLink's reds
// through coral to gold — after the dotted globe on stripe.com — which fly in
// from all sides, settle into a thing, and then keep it moving:
//
//   broadcast  Marketing & Branding   a megaphone, the waves it sends out and the audience they reach
//   audit      Audit                  a lens passing over rows of entries, each one checked as it passes
//   chart      Finance                columns climbing under a line
//   ledger     Accounting & Tax       an abacus, its beads counting
//   scale      Legal                  a balance: weights fall into one pan, then the other, and it finds its level
//   cover      Insurance              an umbrella turning in the rain, the drops running off it
//   people     Human Resources        three people and the ties between them
//   route      Logistics              Vietnam (with Hoàng Sa and Trường Sa) and parcels running north to south
//   trade      Trade                  the globe, turned to Vietnam, with routes going out from Hanoi
//   steam      Gastronomy             a bowl, chopsticks across it, steam curling up
//   pulse      Health & Welfare       a heart beating, a trace running through it
//   equalizer  Entertainment          a record turning under a skyline of sound
//   calendar   Events                 fireworks
//   flight     Transport              a flight over the curve of the earth
//
// 2D canvas, drawn only while the tile is hovered or fading out. On touch
// screens, where nothing hovers, a tile plays while it crosses the middle of
// the screen. Reduced motion shows a still frame.
import { useEffect, useRef } from 'react';
import { VN, PHU_QUOC, ISLANDS, CITIES, inside } from '../lib/vietnam';

export type TileKind = 'broadcast' | 'audit' | 'chart' | 'ledger' | 'scale' | 'cover' | 'people' | 'route' | 'trade' | 'steam' | 'pulse' | 'equalizer' | 'calendar' | 'flight';

type V3 = [number, number, number];
const TAU = Math.PI * 2, RAD = Math.PI / 180;
const hash = (n: number) => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const smooth = (a: number, b: number, x: number) => { const u = clamp01((x - a) / (b - a)); return u * u * (3 - 2 * u); };
function memo<T>(make: () => T) { let v: T | undefined; return () => (v ??= make()); }

// The run of colour: deep crimson, HiLink red, coral, peach, gold.
const STOPS = [[132, 16, 22], [209, 33, 38], [236, 92, 98], [240, 138, 98], [226, 150, 58]];
const PAL = Array.from({ length: 33 }, (_, i) => {
  const u = (i / 32) * (STOPS.length - 1), k = Math.min(STOPS.length - 2, Math.floor(u)), f = u - k;
  return STOPS[k].map((v, j) => Math.round(v + (STOPS[k + 1][j] - v) * f)).join(',');
});
// The site's ink, for a line that has to read across the red.
const ink = (a: number) => `rgba(42,38,35,${clamp01(a).toFixed(3)})`;
const col = (u: number, a: number) => `rgba(${PAL[Math.round(clamp01(u) * 32)]},${clamp01(a).toFixed(3)})`;

type Pen = { ctx: CanvasRenderingContext2D; w: number; h: number; cx: number; cy: number; R: number; t: number; s: number };

/** One dot at (x, y), in units of R from the centre. A dot with an index (i ≥ 0)
    flies in from a little way off when the picture starts; i < 0 simply appears. */
function dot(p: Pen, i: number, x: number, y: number, size: number, u: number, a = 1) {
  let g = 1, sx = p.cx + x * p.R, sy = p.cy + y * p.R;
  if (i >= 0) {
    g = easeOut(clamp01(p.t * 1.4 - hash(i * 1.37 + 0.5) * 0.75));
    if (g <= 0) return;
    if (g < 1) { const ang = hash(i * 3.1 + 1) * TAU, d = (0.5 + hash(i * 7.7 + 2)) * p.R * 1.5 * (1 - g) ** 2; sx += Math.cos(ang) * d; sy += Math.sin(ang) * d; }
  }
  const al = a * 1.3 * g * p.s;
  if (al < 0.012) return;
  size *= 1.14;
  p.ctx.fillStyle = col(u, al);
  if (size <= 2.7) p.ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
  else { p.ctx.beginPath(); p.ctx.arc(sx, sy, size / 2, 0, TAU); p.ctx.fill(); }
}
/** A line through points given in units of R. */
function line(p: Pen, pts: number[][], u: number, a: number, width: number) {
  if (pts.length < 2) return;
  p.ctx.strokeStyle = col(u, a * p.s); p.ctx.lineWidth = width; p.ctx.lineJoin = 'round'; p.ctx.lineCap = 'round';
  p.ctx.beginPath();
  pts.forEach(([x, y], k) => (k ? p.ctx.lineTo(p.cx + x * p.R, p.cy + y * p.R) : p.ctx.moveTo(p.cx + x * p.R, p.cy + y * p.R)));
  p.ctx.stroke();
}
/** A ring of radius r pixels round (x, y). */
function ring(p: Pen, x: number, y: number, r: number, u: number, a: number, width = 1.2) {
  p.ctx.strokeStyle = col(u, a * p.s); p.ctx.lineWidth = width;
  p.ctx.beginPath(); p.ctx.arc(p.cx + x * p.R, p.cy + y * p.R, r, 0, TAU); p.ctx.stroke();
}
/** A bright point with a soft halo. */
function glow(p: Pen, x: number, y: number, r: number, u: number, a: number) {
  const sx = p.cx + x * p.R, sy = p.cy + y * p.R;
  p.ctx.fillStyle = col(u, 0.22 * a * p.s); p.ctx.beginPath(); p.ctx.arc(sx, sy, r * 2.3, 0, TAU); p.ctx.fill();
  p.ctx.fillStyle = col(u, a * p.s); p.ctx.beginPath(); p.ctx.arc(sx, sy, r, 0, TAU); p.ctx.fill();
}
/** The point a fraction u of the way along a line of points, by length. */
function along(pts: number[][], u: number) {
  let total = 0; const len = [0];
  for (let k = 1; k < pts.length; k++) { total += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); len.push(total); }
  const d = clamp01(u) * total;
  for (let k = 1; k < pts.length; k++) if (d <= len[k]) { const f = (d - len[k - 1]) / (len[k] - len[k - 1] || 1); return [pts[k - 1][0] + (pts[k][0] - pts[k - 1][0]) * f, pts[k - 1][1] + (pts[k][1] - pts[k - 1][1]) * f, k]; }
  return [...pts[pts.length - 1], pts.length - 1];
}

// ── Shapes worked out once ──────────────────────────────────────────────────

/** n points spread evenly over a unit sphere. */
const fib = (n: number): V3[] => Array.from({ length: n }, (_, i) => { const y = 1 - (2 * (i + 0.5)) / n, r = Math.sqrt(1 - y * y), a = i * 2.39996323; return [Math.cos(a) * r, y, Math.sin(a) * r]; });
const vec = (lat: number, lon: number): V3 => [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)];

// The continents, roughly, as (latitude, longitude) outlines — enough for a
// globe a hundred pixels across to read as the earth.
const LAND: [number, number][][] = [
  // Europe and Asia
  [[36, -9], [43, -9], [43.5, -1.5], [48.5, -5], [51, 2], [53.5, 7], [57, 8], [58, 6], [62, 5], [70, 20], [71, 28], [68, 44], [69, 60], [73, 70], [77, 100], [73, 110], [73, 140], [70, 160], [66, 179], [62, 179], [60, 165], [60, 156], [51, 157], [57, 140], [54, 137], [53, 141], [46, 138], [43, 132], [39, 128], [35, 129.5], [34.5, 126.5], [39, 125], [40.5, 122], [38, 121], [37, 122.5], [35, 119.5], [30.5, 122], [27, 120.5], [23, 117], [21.5, 108.5], [19, 105.7], [16, 108.3], [12, 109.3], [10.4, 107.5], [8.6, 105], [10.5, 104.5], [13, 100.5], [9, 99.3], [5, 103], [1.4, 104], [3, 101], [7, 99.5], [10, 98.5], [16, 97.5], [16, 94.5], [20, 93], [22, 91.5], [21.5, 88], [19.5, 85], [16, 81.5], [13, 80.3], [10, 79.5], [8, 77.5], [12, 75], [17, 73.3], [21, 72.5], [22.5, 69], [25, 66.5], [25.3, 61], [27, 56.5], [26, 56], [22.5, 59.8], [17, 55], [12.7, 45], [15, 42.7], [21, 39], [28, 34.8], [31.3, 34.3], [33, 35.5], [36.5, 36], [36.2, 30], [37, 27.5], [40.5, 26], [38, 24], [36.5, 22.5], [39.5, 20], [42, 19], [45.5, 13.5], [44, 12.3], [40.5, 18.3], [38, 16], [40.5, 14.5], [44.2, 9], [43.2, 3.5], [41, 1], [38.5, 0], [36.7, -2.5], [36, -5.5]],
  // Africa
  [[35.8, -5.8], [37, 10], [33, 11.5], [31, 20], [31.3, 31.5], [30, 32.5], [22, 36.8], [15.5, 39.5], [12, 43.3], [11.8, 51.2], [2, 45.5], [-4.5, 39.5], [-15, 40.7], [-25, 33.5], [-34, 26], [-34.5, 19.5], [-29, 16.7], [-18, 11.8], [-9, 13], [-1, 9], [4.3, 9], [6, 1], [4.6, -7.5], [8, -13], [14.7, -17.5], [21, -17], [28, -12.5], [33.5, -8]],
  // North America
  [[71, -157], [70, -128], [68, -108], [73, -85], [62, -78], [58, -94], [55, -80], [62, -73], [60, -64], [52, -56], [47, -53], [45, -66], [41, -70], [35, -76], [30.5, -81.5], [25.5, -80.3], [29.5, -84], [29, -95], [22, -98], [18.5, -95], [21.5, -87], [15.8, -88], [9.5, -79.5], [7.5, -78], [9, -84], [15.5, -96], [20, -105.5], [31, -113.5], [23, -110], [32.5, -117.2], [40, -124.3], [48.5, -124.7], [58, -136.5], [60, -147], [55, -162], [59, -164], [65, -168]],
  // South America
  [[12, -72], [10.5, -62], [6, -57], [0, -50], [-5.5, -35.3], [-13, -38.5], [-23, -42], [-34, -53.5], [-41, -63], [-52, -69], [-54.5, -66], [-52, -74.5], [-37, -73.5], [-18.5, -70.5], [-14, -76.3], [-6, -81], [-1, -80.5], [1.5, -79], [8, -77.5]],
  // Australia
  [[-12, 130.5], [-11, 136.5], [-17.5, 140.5], [-10.8, 142.5], [-19, 146.5], [-25, 153], [-33, 152], [-38, 147], [-38.5, 141], [-35, 138], [-32, 134], [-31.5, 128.5], [-34.5, 119], [-34, 115], [-25, 113.5], [-21.5, 115], [-18, 122], [-14.5, 125.5]],
  // Greenland
  [[83, -33], [81, -62], [76, -71], [69, -54], [60, -43.5], [65, -40], [70, -22], [77, -18]],
];
// Islands, as (latitude, longitude, radius in degrees).
const ISLES = [[35, 136, 3], [38.5, 140.5, 2.6], [43.2, 142.8, 2.4], [54, -2, 3.4], [53.3, -8, 2], [65, -18, 2.4], [-19, 47, 3.6], [0, 101.5, 4], [1, 114, 4.6], [-7.4, 110, 2.4], [-2, 121, 2.4], [-5.5, 141, 5], [13, 122, 3.4], [8, 125, 2.4], [-42, 172.5, 3.4], [-38.5, 176, 2], [7.8, 80.7, 1.6], [23.7, 121, 1.5], [19, -77, 2.6]];
const GLOBE = memo(() => fib(2500).filter(([x, y, z]) => {
  const lat = Math.asin(y) / RAD, lon = Math.atan2(x, z) / RAD;
  return lat < -68 || LAND.some((poly) => inside(poly, lat, lon)) || ISLES.some(([a, b, r]) => Math.hypot(lat - a, (lon - b) * Math.cos(lat * RAD)) < r);
}));
// Where the routes from Hanoi go: Singapore, Tokyo, Sydney, Dubai, Frankfurt.
const HANOI = vec(21.03, 105.85);
const PORTS = [vec(1.35, 103.82), vec(35.68, 139.69), vec(-33.87, 151.2), vec(25.2, 55.3), vec(50.1, 8.7)];

const HALF = memo(() => fib(560).filter((v) => v[1] < 0));   // the upper half of a sphere (y runs downwards on screen)
const CAP = memo(() => fib(1700).filter((v) => v[1] < -0.72));  // the top of a much larger one
const SPARKS = memo(() => fib(66));
const HEART = memo(() => {
  const pts: number[][] = [];
  for (let y = -1.2; y <= 1.25; y += 0.088) for (let x = -1.3; x <= 1.3; x += 0.088) {
    const X = x / 0.86, Y = -y / 0.86 + 0.12;
    if ((X * X + Y * Y - 1) ** 3 - X * X * Y * Y * Y <= 0) pts.push([x, y]);
  }
  return pts;
});
const BUST = memo(() => {
  const pts: number[][] = [];
  for (let y = -0.7; y <= 0.56; y += 0.082) for (let x = -0.56; x <= 0.56; x += 0.082) {
    if (Math.hypot(x, y + 0.4) < 0.25 || (y > -0.08 && (x / 0.52) ** 2 + ((y - 0.56) / 0.62) ** 2 < 1)) pts.push([x, y]);
  }
  return pts;
});
// Vietnam as dots (longitude, latitude), and where a place on it falls in the picture.
const VNDOTS = memo(() => {
  const pts: number[][] = [];
  for (let lat = 23.3; lat >= 8.5; lat -= 0.37) for (let lon = 102.1; lon <= 109.6; lon += 0.385) if (inside(VN, lon, lat) || inside(PHU_QUOC, lon, lat)) pts.push([lon, lat]);
  return pts;
});
const geo = (lon: number, lat: number) => [(lon - 107.5) * 0.144, -(lat - 15.9) * 0.15];
const WAY = [[105.85, 21.03], [105.75, 19.6], [106.2, 18], [107.6, 16.5], [108.22, 16.07], [109, 14.2], [109.2, 12.3], [108, 11], [106.7, 10.78]].map(([a, b]) => geo(a, b));

// ── The pictures ────────────────────────────────────────────────────────────

const DRAW: Record<TileKind, (p: Pen) => void> = {
  broadcast(p) {
    const A = [-0.8, 0.14], M = [-0.26, -0.17], dl = Math.hypot(M[0] - A[0], M[1] - A[1]);
    const dx = (M[0] - A[0]) / dl, dy = (M[1] - A[1]) / dl, nx = -dy, ny = dx, dir = Math.atan2(dy, dx);
    let n = 0;
    // the horn, narrow to wide
    for (let u = 0; u <= 1.001; u += 0.1) {
      const hw = 0.09 + 0.3 * u, rows = Math.max(1, Math.round(hw / 0.08)), x = A[0] + (M[0] - A[0]) * u, y = A[1] + (M[1] - A[1]) * u;
      for (let v = -rows; v <= rows; v++) dot(p, n++, x + nx * (v / rows) * hw, y + ny * (v / rows) * hw, 1.6, 0.05 + 0.3 * u, 1);
    }
    for (let j = 0; j < 22; j++) { const a = (j / 22) * TAU; dot(p, n++, M[0] + nx * 0.4 * Math.cos(a) + dx * 0.1 * Math.sin(a), M[1] + ny * 0.4 * Math.cos(a) + dy * 0.1 * Math.sin(a), 1.6, 0.02, 1); }
    for (let j = 0; j < 5; j++) dot(p, n++, A[0] + dx * 0.24 + nx * (0.17 + j * 0.075), A[1] + dy * 0.24 + ny * (0.17 + j * 0.075), 1.6, 0.02, 1);
    // the waves going out
    const live = clamp01(p.t * 2 - 0.6), radii: number[] = [];
    for (let k = 0; k < 4; k++) {
      const q = (p.t * 0.3 + k / 4) % 1, r = 0.25 + q * 1.45, span = 0.8, cnt = Math.max(5, Math.round((r * 2 * span) / 0.115));
      radii.push(r);
      for (let j = 0; j <= cnt; j++) { const a = dir - span + (j / cnt) * 2 * span; dot(p, -1, M[0] + Math.cos(a) * r, M[1] + Math.sin(a) * r, 1.35 + 0.9 * (1 - q), 0.1 + q * 0.85, (1 - q) ** 0.9 * live); }
    }
    // the audience: each lights as a wave reaches it
    for (let j = 0; j < 16; j++) {
      const a = dir + (hash(j * 2.1 + 3) - 0.5) * 1.45, r = 1.1 + hash(j * 5.3 + 1) * 0.55;
      const lit = Math.max(...radii.map((rk) => Math.exp(-(((rk - r) / 0.13) ** 2)))) * live;
      dot(p, n++, M[0] + Math.cos(a) * r, M[1] + Math.sin(a) * r, 1.7 + 2.2 * lit, 0.45 + 0.5 * lit, 0.4 + 0.6 * lit);
    }
  },

  audit(p) {
    const cols = 10, rows = 7, g = 0.235, x0 = -((cols - 1) * g) / 2, y0 = -((rows - 1) * g) / 2, per = 1.7, lr = 0.46;
    const cyc = p.t % (rows * per + 1.6), done = cyc >= rows * per;
    const row = Math.min(rows - 1, Math.floor(cyc / per)), e = done ? 1 : ease(clamp01((cyc - row * per) / (per * 0.9))), fwd = row % 2 === 0;
    const lx = x0 + (fwd ? e : 1 - e) * (cols - 1) * g, ly = y0 + row * g;
    for (let r = 0; r < rows; r++) {
      const short = Math.floor(hash(r * 3.7 + 2) * 4);   // an entry is as long as it is
      for (let c = 0; c < cols - short; c++) {
        const x = x0 + c * g, y = y0 + r * g, d = Math.hypot(x - lx, y - ly);
        const passed = done || r < row || (r === row && (fwd ? x <= lx + 0.03 : x >= lx - 0.03));
        const k = d < lr ? 1 + 0.55 * (1 - d / lr) : 1;   // under the lens, larger and spread
        dot(p, r * cols + c, lx + (x - lx) * k, ly + (y - ly) * k, (c === 0 ? 2.3 : 1.6) * (d < lr ? 1.8 : 1), d < lr ? 0.98 : passed ? 0.2 : 0.42, d < lr ? 1 : passed ? 1 : 0.36);
      }
    }
    const show = clamp01(p.t * 1.6 - 0.5);
    ring(p, lx, ly, lr * p.R, 0.02, show, 1.6);
    line(p, [[lx + lr * 0.72, ly + lr * 0.72], [lx + lr * 1.4, ly + lr * 1.4]], 0.02, show, 2.6);
  },

  chart(p) {
    const n = 18, x0 = -1.05, dx = 2.3 / (n - 1), base = 0.72, g = 0.112, live = clamp01(p.t * 3);
    const tops: number[][] = [];
    for (let i = 0; i < n; i++) {
      const grow = easeOut(clamp01(p.t * 0.9 - i * 0.035));
      const v = (0.2 + 0.72 * (i / (n - 1)) ** 1.15 + 0.09 * Math.sin(i * 1.3)) * (0.86 + 0.14 * Math.sin(p.t * 1.4 - i * 0.5));
      const hgt = v * 1.5 * grow, m = Math.floor(hgt / g);
      for (let j = 0; j <= m; j++) dot(p, -1, x0 + i * dx, base - j * g, 1.5, 0.04 + 0.85 * ((j * g) / 1.5), (0.45 + 0.5 * (j / (m + 1))) * live);
      tops.push([x0 + i * dx, base - hgt - 0.11]);
    }
    for (let k = -1; k <= n; k++) dot(p, -1, x0 + k * dx, base + 0.13, 1.1, 0.02, 0.5 * live);
    line(p, tops, 0.02, live, 1.5);
    const [hx, hy] = tops[n - 1], r = (p.t * 0.7) % 1;
    glow(p, hx, hy, 2.8, 0.95, live);
    ring(p, hx, hy, 3 + r * 9, 0.9, (1 - r) * 0.7 * live, 1.1);
  },

  ledger(p) {
    const W = 1.2, H = 0.9, rods = 5, beads = 6, pitch = 0.2;
    let n = 0;
    for (let x = -W; x <= W + 0.001; x += 0.1) { dot(p, n++, x, -H, 1.5, 0.02, 0.9); dot(p, n++, x, H, 1.5, 0.02, 0.9); }
    for (let y = -H + 0.1; y < H - 0.05; y += 0.1) { dot(p, n++, -W, y, 1.5, 0.02, 0.9); dot(p, n++, W, y, 1.5, 0.02, 0.9); }
    for (let r = 0; r < rods; r++) {
      const y = -0.62 + r * 0.31;
      line(p, [[-W + 0.08, y], [W - 0.08, y]], 0.25, 0.45 * clamp01(p.t * 2), 1);
      // every so often the rod counts again: beads slide across one after another
      const ph = p.t * (0.42 + hash(r * 4.1) * 0.2) + r * 0.37, step = Math.floor(ph), f = ease(clamp01((ph - step) / 0.45));
      const k0 = Math.floor(hash(r * 9.1 + step * 3.7) * (beads + 1)), k1 = Math.floor(hash(r * 9.1 + (step + 1) * 3.7) * (beads + 1)), k = k0 + (k1 - k0) * f;
      for (let j = 0; j < beads; j++) {
        const left = -W + 0.24 + j * pitch, right = W - 0.24 - (beads - 1 - j) * pitch, m = clamp01(k - j);
        dot(p, n++, right + (left - right) * m, y, Math.max(3.4, p.R * 0.1), 0.05 + r * 0.22, 1);
      }
    }
  },

  scale(p) {
    const cyc = p.t % 7.2, late = Math.max(0, cyc - 4.3);
    // weights into the left pan, then the right; the beam follows and settles
    const a = -0.2 * (smooth(1, 2, cyc) - smooth(3.3, 4.3, cyc)) + (cyc > 4.3 ? 0.035 * Math.sin(late * 6) * Math.exp(-late * 1.3) : 0);
    const py = -0.78, L = 0.92, ca = Math.cos(a), sa = Math.sin(a), pr = 0.36, gone = 1 - smooth(6.2, 6.9, cyc);
    let n = 0;
    for (let k = 0; k < 24; k++) dot(p, n++, 0, py + k * 0.075, 1.7, 0.03, 1);
    for (let k = -6; k <= 6; k++) dot(p, n++, k * 0.08, 0.98, 1.7, 0.03, 1);
    for (let k = -15; k <= 15; k++) { const d = (k / 15) * L; dot(p, n++, d * ca, py + d * sa, 1.7, 0.1 + 0.02 * Math.abs(k), 1); }
    dot(p, n++, 0, py - 0.1, 3.6, 0.98, 1);
    [-1, 1].forEach((side) => {
      const ex = side * L * ca, ey = py + side * L * sa, pcy = ey + 0.74;
      for (let j = 1; j < 9; j++) { const f = j / 9; dot(p, n++, ex - pr * f, ey + 0.74 * f, 1.15, 0.4, 0.7); dot(p, n++, ex + pr * f, ey + 0.74 * f, 1.15, 0.4, 0.7); }
      for (let j = 0; j <= 12; j++) { const th = (j / 12) * Math.PI; dot(p, n++, ex + pr * Math.cos(th), pcy + pr * 0.72 * Math.sin(th), 1.7, 0.12, 1); }
      for (let j = -4; j <= 4; j++) dot(p, n++, ex + (j / 4.6) * pr, pcy, 1.3, 0.3, 0.9);
      for (let k = 0; k < 3; k++) {
        const t0 = (side < 0 ? 0.5 : 2.8) + k * 0.4;
        if (cyc < t0) continue;
        const f = clamp01((cyc - t0) / 0.55), rest = pcy + (k === 1 ? 0.19 : 0.12);
        dot(p, -1, ex + (k - 1) * 0.16, -1.7 + (rest + 1.7) * f * f, Math.max(3.2, p.R * 0.085), 0.95, gone);
      }
    });
  },

  cover(p) {
    const top = 0.2, ry = 0.84, spin = p.t * 0.4, cs = Math.cos(spin), sn = Math.sin(spin), tilt = 0.14;
    const dome = HALF();
    let n = 0;
    // the canopy, turning
    for (let i = 0; i < dome.length; i++) {
      const [x0, y0, z0] = dome[i], x = x0 * cs - z0 * sn, z = x0 * sn + z0 * cs;
      dot(p, n++, x, top + y0 * ry + z * tilt, z > 0 ? 1.6 : 1.1, 0.08 + 0.42 * (x + 1) / 2 - 0.12 * y0, z > 0 ? 0.55 + 0.45 * z : 0.16);
    }
    for (let k = 0; k < 48; k++) { const a = (k / 48) * TAU + spin, z = Math.sin(a); dot(p, n++, Math.cos(a), top + z * tilt, 1.7, 0.08, z > 0 ? 0.95 : 0.25); }
    for (let k = 0; k < 13; k++) dot(p, n++, 0, top + 0.12 + k * 0.08, 1.5, 0.05, 0.9);
    for (let k = 1; k <= 7; k++) { const a = Math.PI - (k / 7) * Math.PI; dot(p, n++, 0.13 + 0.13 * Math.cos(a), top + 1.08 + 0.13 * Math.sin(a), 1.5, 0.05, 0.9); }
    // the rain: a drop that meets the canopy runs down it to the rim and falls from there
    const live = clamp01(p.t * 1.5 - 0.4), yTop = -1.75, yBot = 1.5;
    for (let k = 0; k < 50; k++) {
      const x0 = -1.5 + hash(k * 1.7 + 4) * 3, sp = 0.3 + hash(k + 40) * 0.2, on = Math.abs(x0) < 0.98;
      const th0 = on ? Math.acos(x0) : 0, end = x0 >= 0 ? 0 : Math.PI, side = x0 >= 0 ? 1 : -1;
      const L1 = on ? top - ry * Math.sin(th0) - yTop - 0.04 : yBot - yTop, L2 = on ? Math.abs(th0 - end) * 0.92 : 0, L3 = on ? yBot - top : 0;
      const at = (len: number) => {
        if (len < L1) return [x0, yTop + len];
        if (len < L1 + L2) { const th = th0 + (end - th0) * ((len - L1) / L2); return [Math.cos(th) * 1.04, top - ry * Math.sin(th) * 1.04]; }
        return [side * 1.04, top + (len - L1 - L2)];
      };
      const len = ((p.t * sp + hash(k * 3.3 + 9)) % 1) * (L1 + L2 + L3);
      for (let m = 0; m < 3; m++) { const l = len - m * 0.075; if (l < 0) break; const [x, y] = at(l); dot(p, -1, x, y, 1.7 - m * 0.25, 0.55 + 0.4 * hash(k), (0.95 - m * 0.3) * live); }
    }
  },

  people(p) {
    const who = [[-0.86, 0.3, 0.74, 0.5], [0.86, 0.3, 0.74, 0.68], [0, 0.12, 0.98, 0.06]];   // x, y, size, colour
    const pts = BUST(), live = clamp01(p.t * 1.6 - 0.7);
    let n = 0;
    // the ties between them, and something passing along each
    const heads = who.map(([bx, by, sc]) => [bx, by - 0.68 * sc]);
    [[0, 2, 0.45], [2, 1, 0.45], [0, 1, 1.05]].forEach(([a, b, lift], k) => {
      const A = heads[a], B = heads[b], M = [(A[0] + B[0]) / 2, Math.min(A[1], B[1]) - lift];
      const at = (u: number) => [(1 - u) ** 2 * A[0] + 2 * (1 - u) * u * M[0] + u * u * B[0], (1 - u) ** 2 * A[1] + 2 * (1 - u) * u * M[1] + u * u * B[1]];
      for (let j = 1; j < 16; j++) { const [x, y] = at(j / 16); dot(p, n++, x, y, 1.25, 0.3, 0.75); }
      const [x, y] = at((p.t * 0.38 + k * 0.33) % 1);
      glow(p, x, y, 2.1, 0.95, live);
    });
    who.forEach(([bx, by, sc, u], k) => {
      const bob = Math.sin(p.t * 1.3 + k * 2.1) * 0.02;
      pts.forEach(([x, y]) => dot(p, n++, bx + x * sc, by + bob + y * sc, k === 2 ? 1.6 : 1.35, u + 0.22 * ((y + 0.7) / 1.26), k === 2 ? 1 : 0.8));
    });
  },

  route(p) {
    let n = 0;
    VNDOTS().forEach(([lon, lat]) => { const [x, y] = geo(lon, lat); dot(p, n++, x, y, 1.45, 0.12 + 0.55 * ((23.4 - lat) / 15), 0.8); });
    // Hoàng Sa and Trường Sa
    ISLANDS.forEach(([lon, lat], k) => { const [x, y] = geo(lon, lat); dot(p, n++, x, y, 1.8, 0.2, 0.8 + 0.2 * Math.sin(p.t * 2 + k)); });
    // the run from Hanoi through Da Nang to Ho Chi Minh City, and the parcels on it
    const shown = clamp01(p.t * 0.8 - 0.4), drawn: number[][] = [];
    for (let j = 0; j <= 40; j++) { const u = (j / 40) * shown; drawn.push(along(WAY, u)); }
    p.ctx.strokeStyle = ink(0.9 * p.s); p.ctx.lineWidth = 1.5; p.ctx.lineJoin = 'round'; p.ctx.lineCap = 'round';
    p.ctx.beginPath(); drawn.forEach(([x, y], k) => (k ? p.ctx.lineTo(p.cx + x * p.R, p.cy + y * p.R) : p.ctx.moveTo(p.cx + x * p.R, p.cy + y * p.R))); p.ctx.stroke();
    CITIES.forEach(([lon, lat], k) => {
      const [x, y] = geo(lon, lat), r = (p.t * 0.6 + k * 0.33) % 1;
      p.ctx.strokeStyle = ink((1 - r) * 0.6 * shown * p.s); p.ctx.lineWidth = 1.1;
      p.ctx.beginPath(); p.ctx.arc(p.cx + x * p.R, p.cy + y * p.R, 2.5 + r * 8, 0, TAU); p.ctx.stroke();
      p.ctx.fillStyle = ink(shown * p.s); p.ctx.beginPath(); p.ctx.arc(p.cx + x * p.R, p.cy + y * p.R, 2.4, 0, TAU); p.ctx.fill();
    });
    if (shown >= 1) for (let k = 0; k < 3; k++) {
      const u = (p.t * 0.15 + k / 3) % 1, [x, y] = along(WAY, u), a = Math.sin(u * Math.PI) ** 0.5;
      const s = Math.max(3.4, p.R * 0.085);
      p.ctx.fillStyle = col(0.98, a * p.s); p.ctx.fillRect(p.cx + x * p.R - s / 2, p.cy + y * p.R - s / 2, s, s);
      p.ctx.strokeStyle = ink(a * p.s); p.ctx.lineWidth = 1; p.ctx.strokeRect(p.cx + x * p.R - s / 2, p.cy + y * p.R - s / 2, s, s);
    }
  },

  trade(p) {
    const { ctx, cx, cy, R, t, s } = p;
    // turned so that Vietnam faces us, and swaying a little either way
    const lon0 = (106 + 15 * Math.sin(t * 0.25)) * RAD, tilt = 0.28;
    const cl = Math.cos(lon0), sl = Math.sin(lon0), ct = Math.cos(tilt), st = Math.sin(tilt);
    const view = (v: number[]): V3 => { const x = v[0] * cl - v[2] * sl, z0 = v[0] * sl + v[2] * cl; return [x, -(v[1] * ct - z0 * st), v[1] * st + z0 * ct]; };
    const behind = (v: V3) => v[2] < 0 && v[0] * v[0] + v[1] * v[1] < 1;
    const air = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R * 1.16);
    air.addColorStop(0, col(0.85, 0.16 * s)); air.addColorStop(0.75, col(0.45, 0.07 * s)); air.addColorStop(1, col(0.45, 0));
    ctx.fillStyle = air; ctx.beginPath(); ctx.arc(cx, cy, R * 1.16, 0, TAU); ctx.fill();
    const land = GLOBE();
    for (let i = 0; i < land.length; i++) {
      const [x, y, z] = view(land[i]);
      if (z > 0.03) dot(p, i, x, y, 1.2 + 0.6 * z, 0.48 + 0.48 * x - 0.42 * y, 0.38 + 0.62 * z);
    }
    // the routes out of Hanoi: each is drawn, arrives, rests and fades
    const live = clamp01(t * 1.2 - 0.8);
    PORTS.forEach((to, k) => {
      const q = (t * 0.17 + k * 0.21) % 1, head = ease(clamp01(q / 0.5)), fade = (1 - smooth(0.82, 1, q)) * live;
      const om = Math.acos(Math.max(-1, Math.min(1, HANOI[0] * to[0] + HANOI[1] * to[1] + HANOI[2] * to[2]))) || 0.0001, lift = 0.34 * Math.min(1, om / 1.1), so = Math.sin(om);
      const at = (u: number) => { const a = Math.sin((1 - u) * om) / so, b = Math.sin(u * om) / so, hgt = 1 + lift * Math.sin(Math.PI * u); return view([(HANOI[0] * a + to[0] * b) * hgt, (HANOI[1] * a + to[1] * b) * hgt, (HANOI[2] * a + to[2] * b) * hgt]); };
      let prev = at(0);
      ctx.lineWidth = 1.2; ctx.lineCap = 'round';
      for (let j = 1; j <= 26; j++) {
        const u = j / 26;
        if (u > head + 1e-6) break;
        const cur = at(u);
        if (!behind(prev) && !behind(cur)) { ctx.strokeStyle = col(0.1 + 0.85 * u, (0.3 + 0.6 * (u / Math.max(head, 0.01))) * fade * s); ctx.beginPath(); ctx.moveTo(cx + prev[0] * R, cy + prev[1] * R); ctx.lineTo(cx + cur[0] * R, cy + cur[1] * R); ctx.stroke(); }
        prev = cur;
      }
      const hp = at(head);
      if (!behind(hp)) {
        glow(p, hp[0], hp[1], 2.1, 0.95, fade);
        if (head >= 1) { const r = (t * 0.9 + k * 0.3) % 1; ring(p, hp[0], hp[1], 2.5 + r * 7, 0.8, (1 - r) * 0.7 * fade, 1); }
      }
    });
    const o = view(HANOI), r = (t * 0.6) % 1;
    if (o[2] > 0) { ring(p, o[0], o[1], 3 + r * 9, 0.08, (1 - r) * 0.8 * live, 1.2); glow(p, o[0], o[1], 2.6, 0.05, live); }
  },

  steam(p) {
    const spin = p.t * 0.3, cs = Math.cos(spin), sn = Math.sin(spin), tilt = 0.42, ct = Math.cos(tilt), st = Math.sin(tilt), by = 0.26, r = 0.92;
    const bowl = HALF();
    let n = 0;
    // the bowl, seen a little from above (HALF is the upper half; turned over it is a bowl)
    for (let i = 0; i < bowl.length; i++) {
      const [x0, y0, z0] = bowl[i], x = x0 * cs - z0 * sn, z = x0 * sn + z0 * cs, y = -y0 * 0.86;
      const Y = y * ct + z * st, Z = z * ct - y * st;
      dot(p, n++, x * r, by + Y * r, Z > 0 ? 1.6 : 1.1, 0.42 - 0.4 * y, Z > 0 ? 0.6 + 0.4 * Z : 0.22);
    }
    for (let k = 0; k < 56; k++) { const a = (k / 56) * TAU + spin, z = Math.sin(a); dot(p, n++, Math.cos(a) * r, by + z * st * r, 1.7, 0.1, z > 0 ? 1 : 0.5); }
    // chopsticks laid across the rim
    for (let j = 0; j < 24; j++) { const f = j / 23; dot(p, n++, -0.3 + f * 1.65, by + 0.12 - f * 0.7, 1.6, 0.02, 1); dot(p, n++, -0.18 + f * 1.65, by + 0.25 - f * 0.66, 1.6, 0.02, 1); }
    // steam
    const live = clamp01(p.t * 1.2 - 0.6);
    for (let k = 0; k < 3; k++) for (let j = 0; j < 12; j++) {
      const q = (p.t * 0.28 + j / 12 + k * 0.11) % 1;
      dot(p, -1, -0.45 + k * 0.4 + Math.sin(q * 6 + p.t * 1.1 + k * 2.1) * 0.2 * q + 0.1 * q * (k - 1), by - 0.1 - q * 1.5, 1.4 + 2.6 * q, 0.5 + 0.45 * q, Math.sin(Math.PI * q) ** 1.1 * 0.8 * live);
    }
  },

  pulse(p) {
    const ph = (p.t * 0.9) % 1, beat = Math.exp(-(((ph - 0.12) / 0.06) ** 2)) + 0.55 * Math.exp(-(((ph - 0.34) / 0.07) ** 2)), sc = 1 + 0.07 * beat;
    // the heart; each beat sends a brightness out from the middle
    HEART().forEach(([x, y], i) => {
      const wave = Math.exp(-(((Math.hypot(x, y) - ph * 1.7) / 0.22) ** 2));
      dot(p, i, x * sc, y * sc, 1.45 + 0.5 * wave + 0.3 * beat, 0.1 + 0.5 * ((x - y + 2) / 4) + 0.25 * wave, 0.7 + 0.3 * wave);
    });
    // the trace running through it
    const live = clamp01(p.t * 1.5 - 0.8), x0 = -1.4, x1 = 1.5, head = x0 + ((p.t * 0.42) % 1) * (x1 - x0);
    const f = (x: number) => { const u = ((x + 4) % 1.3) / 1.3; return u < 0.4 ? 0 : u < 0.46 ? -0.16 : u < 0.52 ? 0.8 : u < 0.6 ? -0.48 : u < 0.68 ? 0.14 : 0; };
    const tail: number[][] = [];
    for (let x = Math.max(x0, head - 1.7); x <= head; x += 0.03) tail.push([x, 0.08 - f(x) * 0.62]);
    p.ctx.lineCap = 'round'; p.ctx.lineJoin = 'round';
    for (let k = 1; k < tail.length; k++) {
      const a = (k / tail.length) ** 1.2 * live * p.s, [ax, ay] = tail[k - 1], [bx, bw] = tail[k];
      p.ctx.strokeStyle = ink(a); p.ctx.lineWidth = 1.6;
      p.ctx.beginPath(); p.ctx.moveTo(p.cx + ax * p.R, p.cy + ay * p.R); p.ctx.lineTo(p.cx + bx * p.R, p.cy + bw * p.R); p.ctx.stroke();
    }
    if (tail.length) { p.ctx.fillStyle = ink(live * p.s); p.ctx.beginPath(); p.ctx.arc(p.cx + head * p.R, p.cy + (0.08 - f(head) * 0.62) * p.R, 2.6, 0, TAU); p.ctx.fill(); }
  },

  equalizer(p) {
    const k = 0.42, y0 = 0.45, spin = p.t * 0.9, live = clamp01(p.t * 1.5 - 0.5);
    let n = 0;
    // sound, standing behind the record
    for (let b = 0; b < 22; b++) {
      const a = Math.PI + ((b + 0.5) / 22) * Math.PI;
      const v = 0.15 + 0.85 * Math.abs(Math.sin(p.t * (1.8 + hash(b + 1) * 1.6) + b * 0.7)) * (0.5 + 0.5 * Math.sin(p.t * 0.8 + b * 0.45) ** 2);
      const m = Math.round(v * 7), x = 1.12 * Math.cos(a), yb = y0 + 1.12 * Math.sin(a) * k;
      for (let j = 0; j < m; j++) dot(p, -1, x, yb - 0.12 - j * 0.105, 1.6, 0.1 + j * 0.13, live);
    }
    // the record: the dots turn, the sheen stays where the light falls
    for (let r = 0.3; r <= 1.001; r += 0.1) {
      const cnt = Math.round(r * 46);
      for (let j = 0; j < cnt; j++) { const a = (j / cnt) * TAU + spin, sheen = Math.abs(Math.cos(a - 0.7)) ** 5; dot(p, n++, r * Math.cos(a), y0 + r * Math.sin(a) * k, 1.3 + 0.7 * sheen, 0.02 + 0.22 * r + 0.6 * sheen, 0.55 + 0.45 * sheen); }
    }
    for (let j = 0; j < 10; j++) { const a = (j / 10) * TAU + spin; dot(p, n++, 0.16 * Math.cos(a), y0 + 0.16 * Math.sin(a) * k, 1.5, 0.95, 0.95); }
    dot(p, n++, 0, y0, 2.8, 0.05, 1);
  },

  calendar(p) {
    const live = clamp01(p.t * 3), sparks = SPARKS();
    // three rockets, one after another, over and over: x, y, when, colour
    [[-0.35, -0.3, 0, 0.02], [0.75, -0.6, 1.15, 0.34], [0.25, 0.3, 2.25, 0.18]].forEach(([bx, by, when, hue], k) => {
      const q = (p.t + 3.4 - when) % 3.4;
      if (p.t < when) return;
      if (q < 0.6) {
        const f = easeOut(q / 0.6);
        for (let j = 0; j < 7; j++) { const g = f - j * 0.045; if (g > 0) dot(p, -1, bx + Math.sin(g * 9 + k) * 0.02, 1.3 + (by - 1.3) * g, 1.8 - j * 0.15, 0.95, (1 - j / 7) * 0.9 * live); }
        return;
      }
      const tau = (q - 0.6) / 2.8, fade = Math.min(1, (1 - tau) * 1.7);
      for (let i = 0; i < sparks.length; i++) {
        const [dx, dy, dz] = sparks[i], tw = 0.65 + 0.35 * Math.sin(p.t * 14 + i * 2.4);
        for (let m = 0; m < 3; m++) {
          const tm = Math.max(0, tau - m * 0.03), rm = 0.95 * (1 - Math.exp(-4.2 * tm));
          dot(p, -1, bx + dx * rm, by + dy * rm + 0.4 * tm * tm, 1.9 + 0.6 * dz - m * 0.4, hue + 0.48 * hash(i * 1.9 + k), fade * tw * (1 - m * 0.3) * live);
        }
      }
    });
  },

  flight(p) {
    const { ctx, cx, cy, R, t, s } = p;
    const spin = t * 0.12, cs = Math.cos(spin), sn = Math.sin(spin), ER = 2.7, ecy = 3.25;
    // the curve of the earth, turning slowly underneath
    CAP().forEach(([x0, y0, z0], i) => {
      const x = x0 * cs - z0 * sn, z = x0 * sn + z0 * cs;
      if (z > -0.15) dot(p, i, x * ER, ecy + y0 * ER, 1.4, 0.08 + 0.5 * ((x * ER + 2) / 4), (0.35 + 0.6 * clamp01(z * 2.2 + 0.35)) * smooth(-1.7, -1, x * ER));
    });
    const A = [-1.3, 0.5], M = [-0.05, -1.75], B = [1.35, 0.3];
    const at = (u: number) => [(1 - u) ** 2 * A[0] + 2 * (1 - u) * u * M[0] + u * u * B[0], (1 - u) ** 2 * A[1] + 2 * (1 - u) * u * M[1] + u * u * B[1]];
    const q = (t * 0.16) % 1, u = ease(clamp01(q / 0.82)), fade = (1 - smooth(0.9, 1, q)) * clamp01(t * 2 - 0.6);
    for (let j = 0; j <= 34; j++) { const v = j / 34, [x, y] = at(v); dot(p, 3000 + j, x, y, 1.1, 0.4, 0.22); }
    for (let v = 0; v < u; v += 0.022) { const [x, y] = at(v); dot(p, -1, x, y, 1.5, 0.15 + 0.8 * v, (0.25 + 0.7 * (v / Math.max(u, 0.01)) ** 2) * fade); }
    const [px, py] = at(u), [qx, qy] = at(Math.min(1, u + 0.02)), k = Math.max(0.8, R / 46);
    ctx.save(); ctx.translate(cx + px * R, cy + py * R); ctx.rotate(Math.atan2(qy - py, qx - px) || 0); ctx.scale(k, k);
    ctx.fillStyle = col(0.08, fade * s);
    ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(1.5, -1.5); ctx.lineTo(-2.5, -7); ctx.lineTo(-4.6, -7); ctx.lineTo(-2.8, -1.4); ctx.lineTo(-6.8, -1.2); ctx.lineTo(-8.6, -3.8); ctx.lineTo(-9.8, -3.8); ctx.lineTo(-8.8, 0);
    ctx.lineTo(-9.8, 3.8); ctx.lineTo(-8.6, 3.8); ctx.lineTo(-6.8, 1.2); ctx.lineTo(-2.8, 1.4); ctx.lineTo(-4.6, 7); ctx.lineTo(-2.5, 7); ctx.lineTo(1.5, 1.5); ctx.closePath(); ctx.fill();
    ctx.restore();
    const r = (t * 0.6) % 1;
    glow(p, A[0], A[1], 2.2, 0.1, clamp01(t * 2 - 0.6));
    ring(p, B[0], B[1], 3 + r * 9, 0.9, (1 - r) * 0.7 * clamp01(t * 2 - 0.6), 1.1);
    glow(p, B[0], B[1], 2.4, 0.95, clamp01(t * 2 - 0.6));
  },
};

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
      DRAW[kind]({ ctx, w, h, cx: w * 0.71, cy: h * 0.5, R: Math.min(w * 0.185, h * 0.34), t: ht, s });
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

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-45 sm:opacity-100" />;
}
