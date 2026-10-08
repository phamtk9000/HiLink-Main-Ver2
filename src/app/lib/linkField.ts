// The "link field": a WebGL burst of lines from one hub, modelled on the
// Stripe homepage data visualisation ("The backbone of global commerce").
//
// What is carried over from Stripe's implementation (three.js there, raw WebGL
// here so no 3D library ships with the site):
//   - ~800 lines from a common origin to points on a Fibonacci sphere, each
//     2.75–3.75 units long, seen through a perspective camera; lines whose tip
//     falls outside the view are culled, which is what leaves a sunrise fan.
//   - Colour taken from the fragment's height on screen (bottom → top colour
//     with a soft stop), lines fading in from the origin, a per-line shimmer,
//     additive blending, and a soft dot on every tip.
//   - Pointer physics: tips are pushed away from the pointer in screen space
//     and spring back (repulsion 0.07, spring 0.05, damping 0.9).
//   - An intro that scales the burst from 70% to 100% over 1.2s.
//
// HiLink's four pillars re-shape the field by moving the spring targets, so
// every change of scene is the same physics settling into a new form:
//   0 Connect      the burst, plus links between neighbouring tips
//   1 Opportunity  sparks of light run out along the lines
//   2 Grow         the burst breathes outwards and growth rings spread
//   3 Destination  tips gather into seven bundles — the HiLink locations

export type Palette = { top: [number, number, number]; bottom: [number, number, number]; stop: [number, number]; opacity?: number; over?: boolean };

type V3 = [number, number, number];

const ORIGIN: V3 = [0, -2.3, -0.4];
const CAM_Z = 5.2;
const FOV = (42 * Math.PI) / 180;

const LINE_VS = `
attribute vec2 aPos; attribute float aProg; attribute float aId; attribute float aA;
varying float vProg; varying float vId; varying float vA;
void main(){ vProg=aProg; vId=aId; vA=aA; gl_Position=vec4(aPos,0.0,1.0); }`;
const LINE_FS = `
precision mediump float;
uniform vec3 uTop; uniform vec3 uBot; uniform vec2 uStop; uniform vec2 uRes; uniform float uTime; uniform float uOpacity;
varying float vProg; varying float vId; varying float vA;
void main(){
  float y = gl_FragCoord.y / uRes.y;
  vec3 c = mix(uBot, uTop, smoothstep(uStop.x, uStop.y, y));
  float centerFade = smoothstep(0.0, 3.0, vProg);
  float lineFade = pow(smoothstep(0.0, 0.75, vProg), 10.5);
  float fade = max(lineFade, centerFade * 0.5);
  float shimmer = sin(uTime * 2.0 + vId * 0.1) * 0.4 + 0.6;
  float a = uOpacity * shimmer * fade * vA;
  gl_FragColor = vec4(c * a, a);
}`;
const DOT_VS = `
attribute vec2 aPos; attribute float aSize; attribute float aA; attribute float aId;
varying float vA; varying float vId;
void main(){ vA=aA; vId=aId; gl_Position=vec4(aPos,0.0,1.0); gl_PointSize=aSize; }`;
const DOT_FS = `
precision mediump float;
uniform vec3 uTop; uniform vec3 uBot; uniform vec2 uStop; uniform vec2 uRes; uniform float uTime;
varying float vA; varying float vId;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.18, d);
  float y = gl_FragCoord.y / uRes.y;
  vec3 c = mix(uBot, uTop, smoothstep(uStop.x, uStop.y, y));
  float shimmer = sin(uTime * 2.0 + vId * 0.1) * 0.25 + 0.75;
  float o = a * vA * shimmer;
  gl_FragColor = vec4(c * o, o);
}`;

function compile(gl: WebGLRenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!;
  for (const [type, src] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]] as const) {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
    gl.attachShader(p, s);
  }
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link');
  return p;
}

// Deterministic randomness so the field is the same on every visit.
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

export class LinkField {
  private gl: WebGLRenderingContext;
  private lineProg: WebGLProgram;
  private dotProg: WebGLProgram;
  private lineBuf: WebGLBuffer;
  private dotBuf: WebGLBuffer;
  private lineData = new Float32Array(0);
  private dotData = new Float32Array(0);

  private base: V3[] = [];          // burst tip positions (spring targets in scene 0)
  private cur: V3[] = [];
  private vel: V3[] = [];
  private len: number[] = [];
  private dest: number[] = [];      // destination bundle for scene 3
  private pairs: [number, number][] = [];
  private sparks: { line: number; t: number; speed: number }[] = [];
  private destPts: V3[] = [];
  private vis: number[] = [];
  private loc = new Map<string, number>();
  private uni = new Map<string, WebGLUniformLocation | null>();

  private w = 1; private h = 1; private dpr = 1; private aspect = 1;
  private mouse = { x: 9, y: 9 };
  private start = performance.now();
  private intro = 0;
  private sceneAlpha = 1;
  private lastSpark = 0;
  private palette: Palette;
  private target: Palette;
  private fromPalette: Palette;
  private paletteT = 1;
  private paletteStart = 0;

  scene = 0;
  onLabels?: (pts: { x: number; y: number }[] | null) => void;

  constructor(private canvas: HTMLCanvasElement, palette: Palette, destCount: number) {
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) throw new Error('webgl');
    this.gl = gl;
    this.lineProg = compile(gl, LINE_VS, LINE_FS);
    this.dotProg = compile(gl, DOT_VS, DOT_FS);
    this.lineBuf = gl.createBuffer()!;
    this.dotBuf = gl.createBuffer()!;
    this.palette = palette; this.target = palette; this.fromPalette = palette;
    this.build(destCount);
  }

  // ---- geometry -----------------------------------------------------------
  private project(p: V3): [number, number, number] {
    const f = 1 / Math.tan(FOV / 2);
    const z = CAM_Z - p[2];
    return [(p[0] * f) / (z * Math.max(this.aspect, 1.5)), (p[1] * f) / z, z];
  }

  private build(destCount: number) {
    const rand = rng(20200);
    const total = 1600;
    const golden = (1 + Math.sqrt(5)) / 2;
    const candidates: V3[] = [];
    for (let i = 0; i < total; i++) {
      const th = (2 * Math.PI * i) / golden;
      const ph = Math.acos(1 - (2 * (i + 0.5)) / total);
      const dir: V3 = [Math.sin(ph) * Math.cos(th), Math.sin(ph) * Math.sin(th), Math.cos(ph)];
      const l = 2.75 + rand() * 1.0;
      candidates.push([ORIGIN[0] + dir[0] * l, ORIGIN[1] + dir[1] * l, ORIGIN[2] + dir[2] * l]);
    }
    // Keep the upper half; which of those are on screen depends on the
    // canvas shape, so that is decided in cull() on every resize.
    for (const c of candidates) {
      if (c[1] > ORIGIN[1] + 0.2) {
        this.base.push(c);
        this.cur.push([ORIGIN[0], ORIGIN[1], ORIGIN[2]]);
        this.vel.push([0, 0, 0]);
        this.len.push(Math.hypot(c[0] - ORIGIN[0], c[1] - ORIGIN[1], c[2] - ORIGIN[2]));
      }
    }
    // Destinations: an arc of points above the hub, left to right.
    for (let k = 0; k < destCount; k++) {
      const a = Math.PI * (0.84 - (0.68 * (k + 0.5)) / destCount);
      this.destPts.push([ORIGIN[0] + Math.cos(a) * 3.0, ORIGIN[1] + Math.sin(a) * 2.5, ORIGIN[2] + 0.4]);
    }
    this.base.forEach((b, i) => {
      let best = 0;
      let bd = Infinity;
      this.destPts.forEach((d, k) => {
        const dd = Math.atan2(b[1] - ORIGIN[1], b[0] - ORIGIN[0]) - Math.atan2(d[1] - ORIGIN[1], d[0] - ORIGIN[0]);
        if (Math.abs(dd) < bd) { bd = Math.abs(dd); best = k; }
      });
      this.dest[i] = best;
    });
    // Neighbouring tips for the "connect" mesh.
    const n = this.base.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = this.base[i], b = this.base[j];
        if (Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 0.4 && rand() < 0.3) this.pairs.push([i, j]);
      }
    }
    this.lineData = new Float32Array((n + this.pairs.length + 220) * 2 * 5);
    this.dotData = new Float32Array((n + 200) * 5);
  }

  // ---- input ----------------------------------------------------------------
  resize(w: number, h: number) {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = w; this.h = h; this.aspect = w / h;
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.cull();
  }
  // Stripe drops lines whose tip falls outside the view; same here.
  private cull() {
    this.vis = this.base.map((b) => {
      const [x, y] = this.project(b);
      return Math.abs(x) <= 1.04 && y <= 1.04 ? 1 : 0;
    });
  }
  pointer(clientX: number, clientY: number) {
    const r = this.canvas.getBoundingClientRect();
    this.mouse.x = ((clientX - r.left) / r.width) * 2 - 1;
    this.mouse.y = -(((clientY - r.top) / r.height) * 2 - 1);
  }
  leave() { this.mouse.x = 9; this.mouse.y = 9; }
  spark(clientX: number, clientY: number) {
    this.pointer(clientX, clientY);
    const now = performance.now();
    this.cur.forEach((c, i) => {
      const [x, y] = this.project(c);
      if (this.vis[i] && Math.hypot(x - this.mouse.x, y - this.mouse.y) < 0.35 && Math.random() < 0.7) {
        this.sparks.push({ line: i, t: now, speed: 0.0009 + Math.random() * 0.0006 });
      }
    });
  }
  setPalette(p: Palette, immediate = false) {
    this.fromPalette = this.palette; this.target = p; this.paletteStart = performance.now(); this.paletteT = immediate ? 1 : 0;
    if (immediate) this.palette = p;
  }

  // ---- frame ------------------------------------------------------------------
  frame(now: number, still = false) {
    const gl = this.gl;
    const t = (now - this.start) / 1000;
    if (!still) this.intro = Math.min(1, this.intro + 1 / 72);
    else this.intro = 1;
    const introScale = 0.7 + 0.3 * (1 - (1 - this.intro) ** 3);

    // Palette crossfade (1.2s, like the background gradients).
    if (this.paletteT < 1) {
      this.paletteT = still ? 1 : Math.min(1, (now - this.paletteStart) / 1200);
      const e = this.paletteT < 0.5 ? 4 * this.paletteT ** 3 : 1 - (-2 * this.paletteT + 2) ** 3 / 2;
      const mix = (a: number[], b: number[]) => a.map((v, i) => v + (b[i] - v) * e) as [number, number, number];
      const o0 = this.fromPalette.opacity ?? 1, o1 = this.target.opacity ?? 1;
      this.palette = {
        top: mix(this.fromPalette.top, this.target.top),
        bottom: mix(this.fromPalette.bottom, this.target.bottom),
        stop: mix([...this.fromPalette.stop, 0], [...this.target.stop, 0]).slice(0, 2) as [number, number],
        opacity: o0 + (o1 - o0) * e,
        over: e < 0.5 ? this.fromPalette.over : this.target.over,
      };
    }

    // Bundled lines (scene 3) overlap heavily, so they are drawn lighter.
    this.sceneAlpha += ((this.scene === 3 ? 0.4 : 1) - this.sceneAlpha) * (still ? 1 : 0.06);
    const breathe = this.scene === 2 ? 0.9 + 0.12 * Math.sin(t * 0.9) : 1;
    const n = this.base.length;

    // Spring physics towards the current scene's targets, pushed by the pointer.
    for (let i = 0; i < n; i++) {
      if (!this.vis[i]) continue;
      const b = this.base[i];
      let tx = ORIGIN[0] + (b[0] - ORIGIN[0]) * introScale * breathe;
      let ty = ORIGIN[1] + (b[1] - ORIGIN[1]) * introScale * breathe;
      let tz = ORIGIN[2] + (b[2] - ORIGIN[2]) * introScale * breathe;
      if (this.scene === 3) {
        const d = this.destPts[this.dest[i]];
        tx = d[0] + (b[0] - ORIGIN[0]) * 0.07; ty = d[1] + (b[1] - ORIGIN[1]) * 0.05; tz = d[2] + (b[2] - ORIGIN[2]) * 0.1;
      }
      const c = this.cur[i], v = this.vel[i];
      if (still) { c[0] = tx; c[1] = ty; c[2] = tz; continue; }
      const [px, py] = this.project(c);
      const dx = px - this.mouse.x, dy = py - this.mouse.y;
      const dist = Math.hypot(dx, dy);
      const radius = 0.8;
      if (dist < radius && dist > 0.001) {
        const force = (1 - dist / radius) ** 2 * 0.07 * (0.8 + 0.4 * Math.sin(0.1 * i + t));
        // Screen direction plus a little of the line's own direction (radial blend 0.15).
        const rx = b[0] - ORIGIN[0], ry = b[1] - ORIGIN[1], rl = Math.hypot(rx, ry) || 1;
        v[0] += ((dx / dist) * 0.85 + (rx / rl) * 0.15) * force;
        v[1] += ((dy / dist) * 0.85 + (ry / rl) * 0.15) * force;
      }
      const sx = tx - c[0], sy = ty - c[1], sz = tz - c[2];
      const off = Math.hypot(sx, sy, sz);
      const spring = 0.05 * (1 + (off / 2) ** 1.5);
      v[0] += sx * spring; v[1] += sy * spring; v[2] += sz * spring;
      const damp = dist < 1.2 ? 0.9 * 0.85 : 0.9;
      v[0] *= damp; v[1] *= damp; v[2] *= damp;
      c[0] += v[0]; c[1] += v[1]; c[2] += v[2];
    }

    // Build line and dot buffers in clip space.
    const [ox, oy] = this.project(ORIGIN);
    let li = 0;
    const L = this.lineData;
    const push = (x: number, y: number, prog: number, idv: number, a: number) => {
      L[li++] = x; L[li++] = y; L[li++] = prog; L[li++] = idv; L[li++] = a;
    };
    const proj: [number, number, number][] = this.cur.map((c) => this.project(c));
    for (let i = 0; i < n; i++) {
      if (!this.vis[i]) continue;
      const c = this.cur[i];
      const l = Math.hypot(c[0] - ORIGIN[0], c[1] - ORIGIN[1], c[2] - ORIGIN[2]);
      push(ox, oy, 0, i, 1);
      push(proj[i][0], proj[i][1], l, i, 1);
    }
    if (this.scene === 0) {
      for (const [a, b] of this.pairs) {
        if (li + 10 > L.length) break;
        if (!this.vis[a] || !this.vis[b]) continue;
        const pulse = 0.25 + 0.25 * Math.sin(t * 1.4 + a * 0.7);
        push(proj[a][0], proj[a][1], 3, a, pulse);
        push(proj[b][0], proj[b][1], 3, b, pulse);
      }
    }
    // Growth rings (scene 2): circles around the hub, expanding and fading.
    if (this.scene === 2 && !still) {
      for (let r = 0; r < 3; r++) {
        const p = ((t * 0.28 + r / 3) % 1);
        const rad = 0.4 + p * 3.6;
        const seg = 48;
        for (let s = 0; s < seg && li + 10 <= L.length; s++) {
          const a0 = Math.PI * (s / seg), a1 = Math.PI * ((s + 1) / seg);
          const p0 = this.project([ORIGIN[0] + Math.cos(a0) * rad, ORIGIN[1] + Math.sin(a0) * rad, ORIGIN[2]]);
          const p1 = this.project([ORIGIN[0] + Math.cos(a1) * rad, ORIGIN[1] + Math.sin(a1) * rad, ORIGIN[2]]);
          push(p0[0], p0[1], 3, s, 0.5 * (1 - p));
          push(p1[0], p1[1], 3, s, 0.5 * (1 - p));
        }
      }
    }
    const lineVerts = li / 5;

    // Dots: one per tip, plus sparks.
    let di = 0;
    const D = this.dotData;
    const pushDot = (x: number, y: number, size: number, a: number, idv: number) => {
      D[di++] = x; D[di++] = y; D[di++] = size * this.dpr; D[di++] = a; D[di++] = idv;
    };
    for (let i = 0; i < n; i++) {
      if (!this.vis[i]) continue;
      const depth = 1 - Math.min(1, Math.max(0, (proj[i][2] - 3) / 5));
      pushDot(proj[i][0], proj[i][1], 3.2 + depth * 4.5, 0.65 + 0.35 * depth, i);
    }
    if (!still && (this.scene === 1) && now - this.lastSpark > 45) {
      this.lastSpark = now;
      const pick = Math.floor(Math.random() * n);
      if (this.vis[pick]) this.sparks.push({ line: pick, t: now, speed: 0.0007 + Math.random() * 0.0005 });
    }
    for (let k = this.sparks.length - 1; k >= 0; k--) {
      const s = this.sparks[k];
      const p = (now - s.t) * s.speed;
      if (p >= 1 || di + 5 > D.length) { this.sparks.splice(k, 1); continue; }
      const c = this.cur[s.line];
      const q = this.project([ORIGIN[0] + (c[0] - ORIGIN[0]) * p, ORIGIN[1] + (c[1] - ORIGIN[1]) * p, ORIGIN[2] + (c[2] - ORIGIN[2]) * p]);
      pushDot(q[0], q[1], 7, 1 - p * 0.5, s.line);
    }
    const dotCount = di / 5;

    // Draw.
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // Additive on dark skies (lines pile up into light, as on Stripe); plain
    // "over" on light skies, where adding would wash everything to white.
    if (this.palette.over) gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    else gl.blendFunc(gl.ONE, gl.ONE);
    const { top, bottom, stop } = this.palette;
    const res = [this.canvas.width, this.canvas.height];

    const use = (prog: WebGLProgram, buf: WebGLBuffer, data: Float32Array, count: number, attrs: [string, number][]) => {
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data.subarray(0, count * 5), gl.DYNAMIC_DRAW);
      let off = 0;
      for (const [name, size] of attrs) {
        const key = `${prog === this.lineProg ? 'l' : 'd'}${name}`;
        if (!this.loc.has(key)) this.loc.set(key, gl.getAttribLocation(prog, name));
        const loc = this.loc.get(key)!;
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 20, off * 4);
        off += size;
      }
      gl.uniform3fv(this.u(prog, 'uTop'), top);
      gl.uniform3fv(this.u(prog, 'uBot'), bottom);
      gl.uniform2fv(this.u(prog, 'uStop'), stop);
      gl.uniform2fv(this.u(prog, 'uRes'), res);
      gl.uniform1f(this.u(prog, 'uTime'), still ? 0 : t);
    };
    use(this.lineProg, this.lineBuf, L, lineVerts, [['aPos', 2], ['aProg', 1], ['aId', 1], ['aA', 1]]);
    gl.uniform1f(this.u(this.lineProg, 'uOpacity'), (this.palette.opacity ?? 1) * this.sceneAlpha);
    gl.drawArrays(gl.LINES, 0, lineVerts);
    use(this.dotProg, this.dotBuf, D, dotCount, [['aPos', 2], ['aSize', 1], ['aA', 1], ['aId', 1]]);
    gl.drawArrays(gl.POINTS, 0, dotCount);

    // Destination labels follow scene 3.
    if (this.onLabels) {
      this.onLabels(
        this.scene === 3
          ? this.destPts.map((d) => {
              const [x, y] = this.project(d);
              return { x: ((x + 1) / 2) * this.w, y: ((1 - y) / 2) * this.h };
            })
          : null,
      );
    }
  }

  private u(prog: WebGLProgram, name: string) {
    const key = `${prog === this.lineProg ? 'l' : 'd'}${name}`;
    if (!this.uni.has(key)) this.uni.set(key, this.gl.getUniformLocation(prog, name));
    return this.uni.get(key)!;
  }

  dispose() {
    const ext = this.gl.getExtension('WEBGL_lose_context');
    ext?.loseContext();
  }
}

/** Hex "#rrggbb" → [r, g, b] in 0–1. */
export const rgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};
