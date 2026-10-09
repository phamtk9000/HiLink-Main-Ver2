// The silk wave of the Stripe homepage hero, ported to raw WebGL2 from the
// shaders and settings on stripe.com (three.js there), in HiLink's colours:
//
//   - geometry: a 400 × 400 plane, 128 × 256 segments, folded in half over a
//     round fold of radius 2–4 at x = −16 (thicker at the edges:
//     4 − 2·(4v(1−v))^9.5), then turned −90° about X and −90° about Y;
//   - vertex: simplex-noise displacement in y, then three uv-weighted
//     rotations — about (½,0,½) by twistY·expStep(u, powY), about (0,½,½) by
//     (twistX − noise·0.1)·expStep(v, powX), about (½,0,½) by
//     twistZ·expStep(v, powZ) — then the mesh's own scale, rotation and
//     position, seen by an orthographic camera at z 5000;
//   - fragment: palette colour by uv, fine threads from simplex noise at
//     frequency ~600 strongest towards the edges, a sheen where the surface
//     turns away (the screen-space derivative of v, Stripe's "pdy"),
//     contrast / saturation / hue, and film grain in place of their post pass.
//
// It drifts very slowly with time (Stripe: speed ~5e-5 per ms) and does not
// react to the pointer.

export type SilkConfig = {
  speed: number; timeOffset: number;
  colorContrast: number; colorSaturation: number; colorHueShift: number;
  displaceFrequencyX: number; displaceFrequencyZ: number; displaceAmount: number;
  position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number];
  twistFrequency: [number, number, number]; twistPower: [number, number, number];
  glowAmount: number; glowPower: number; glowRamp: number;
  zoom: number; grain: number;
  /** Mirror left–right. */
  flip?: boolean;
};

const VS = `#version 300 es
in vec3 position;
in vec2 uv;
uniform mat4 u_model, u_view, u_proj;
uniform float u_time, u_speed;
uniform vec3 u_twistFrequency, u_twistPower;
uniform float u_displaceFrequencyX, u_displaceFrequencyZ, u_displaceAmount;
out vec2 v_uv;
out vec3 v_position;

float xxhash(vec2 x) {
  uvec2 t = floatBitsToUint(x);
  uint h = 0xc2b2ae3du * t.x + 0x165667b9u;
  h = (h << 17u | h >> 15u) * 0x27d4eb2fu;
  h += 0xc2b2ae3du * t.y;
  h = (h << 17u | h >> 15u) * 0x27d4eb2fu;
  h ^= h >> 15u; h *= 0x85ebca77u; h ^= h >> 13u; h *= 0xc2b2ae3du; h ^= h >> 16u;
  return uintBitsToFloat(h >> 9u | 0x3f800000u) - 1.0;
}
vec2 hash(vec2 x) { float k = 6.283185307 * xxhash(x); return vec2(cos(k), sin(k)); }
float simplexNoise(in vec2 p) {
  const float K1 = 0.366025404, K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
  return dot(n, vec3(32.99));
}
float expStep(float x, float n) { return exp2(-exp2(n) * pow(x, n)); }
mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle), c = cos(angle), oc = 1.0 - c;
  return mat4(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s, 0.0,
              oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0,
              oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c, 0.0,
              0.0, 0.0, 0.0, 1.0);
}
void main() {
  v_uv = uv;
  float t = u_time * u_speed;
  float twistXNoise = simplexNoise(vec2(uv.y * 2.0, t));
  float twistXMotion = u_twistFrequency.x - twistXNoise * 0.1;
  mat4 rotationA = rotationMatrix(vec3(0.5, 0.0, 0.5), u_twistFrequency.y * expStep(uv.x, u_twistPower.y));
  mat4 rotationB = rotationMatrix(vec3(0.0, 0.5, 0.5), twistXMotion * expStep(uv.y, u_twistPower.x));
  mat4 rotationC = rotationMatrix(vec3(0.5, 0.0, 0.5), u_twistFrequency.z * expStep(uv.y, u_twistPower.z));
  vec3 p = position;
  p.y += u_displaceAmount * simplexNoise(vec2(p.x * u_displaceFrequencyX + t, p.z * u_displaceFrequencyZ + t));
  p = (vec4(p, 1.0) * rotationA).xyz;
  p = (vec4(p, 1.0) * rotationB).xyz;
  p = (vec4(p, 1.0) * rotationC).xyz;
  v_position = p;
  gl_Position = u_proj * u_view * u_model * vec4(p, 1.0);
}`;

const FS = `#version 300 es
precision highp float;
in vec2 v_uv;
in vec3 v_position;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_colorContrast, u_colorSaturation, u_colorHueShift;
uniform float u_glowAmount, u_glowPower, u_glowRamp, u_grain;
out vec4 o;

float xxhash(vec2 x) {
  uvec2 t = floatBitsToUint(x);
  uint h = 0xc2b2ae3du * t.x + 0x165667b9u;
  h = (h << 17u | h >> 15u) * 0x27d4eb2fu;
  h += 0xc2b2ae3du * t.y;
  h = (h << 17u | h >> 15u) * 0x27d4eb2fu;
  h ^= h >> 15u; h *= 0x85ebca77u; h ^= h >> 13u; h *= 0xc2b2ae3du; h ^= h >> 16u;
  return uintBitsToFloat(h >> 9u | 0x3f800000u) - 1.0;
}
vec2 hash(vec2 x) { float k = 6.283185307 * xxhash(x); return vec2(cos(k), sin(k)); }
float simplexNoise(in vec2 p) {
  const float K1 = 0.366025404, K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o2 = vec2(m, 1.0 - m);
  vec2 b = a - o2 + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o2)), dot(c, hash(i + 1.0)));
  return dot(n, vec3(32.99));
}
float mapLinear(float v, float a1, float b1, float a2, float b2) { return a2 + (v - a1) * (b2 - a2) / (b1 - a1); }
float parabola(float x, float k) { return pow(4.0 * x * (1.0 - x), k); }
vec3 contrast(vec3 v, float a) { return (v - 0.5) * a + 0.5; }
vec3 desaturate(vec3 c, float f) { return mix(c, vec3(dot(vec3(0.299, 0.587, 0.114), c)), f); }
vec3 hueShift(vec3 color, float shift) {
  vec3 gray = vec3(0.57735);
  vec3 projection = gray * dot(gray, color);
  vec3 U = color - projection;
  vec3 V = cross(gray, U);
  return U * cos(shift) + V * sin(shift) + projection;
}

// HiLink's palette in place of Stripe's palette texture: deep reds only —
// oxblood, crimson, HiLink red, a warm red at the fold — with no peach or
// pink, so the cloth reads rich rather than light.
vec3 ramp(float t, vec3 a, vec3 b, vec3 c, vec3 d, vec3 e) {
  return t < 0.25 ? mix(a, b, t / 0.25)
       : t < 0.5 ? mix(b, c, (t - 0.25) / 0.25)
       : t < 0.75 ? mix(c, d, (t - 0.5) / 0.25)
       : mix(d, e, (t - 0.75) / 0.25);
}
vec3 palette(vec2 uv) {
  // front face, from its free edge (near-black oxblood) through crimson
  // and HiLink red to a warm red at the fold
  float k = clamp(uv.x / 0.47, 0.0, 1.0);
  vec3 front = ramp(k, vec3(0.14, 0.02, 0.03), vec3(0.36, 0.03, 0.06), vec3(0.62, 0.06, 0.09), vec3(0.82, 0.13, 0.15), vec3(0.92, 0.26, 0.19));
  // underside, darkening from the fold back to oxblood
  float kb = clamp((uv.x - 0.53) / 0.47, 0.0, 1.0);
  vec3 back = ramp(kb, vec3(0.88, 0.28, 0.20), vec3(0.78, 0.16, 0.14), vec3(0.58, 0.07, 0.09), vec3(0.38, 0.04, 0.07), vec3(0.22, 0.02, 0.04));
  vec3 c = mix(front, back, smoothstep(0.47, 0.53, uv.x));
  // and warmer towards one end of the length, deeper towards the other
  return c * mix(1.08, 0.82, smoothstep(0.2, 1.0, uv.y));
}

void main() {
  vec2 dy = dFdy(v_uv);
  float pdy = dy.y * u_resolution.y * u_glowAmount;
  pdy = clamp(mapLinear(pdy, -1.0, 1.0, 0.0, 1.0), 0.0, 1.0);
  pdy = pow(pdy, u_glowPower);
  pdy = clamp(smoothstep(0.0, u_glowRamp, pdy), 0.0, 1.0);

  vec3 color = palette(v_uv);
  float strength = 0.2, freq = 600.0, colorAtten = 0.9, paraPow = 3.0;
  float p = 1.0 - parabola(v_uv.x, paraPow);
  float n0 = simplexNoise(vec2(v_uv.x * 0.1, v_uv.y * 0.5));
  float n1 = simplexNoise(vec2(v_uv.x * (freq + (freq * 0.5 * n0)), v_uv.y * 4.0 * n0));
  n1 = mapLinear(n1, -1.0, 1.0, 0.0, 1.0);
  // (Stripe adds the threads in white; warm red here, so they don't grey the dark reds)
  color += n1 * strength * (1.0 - color.b * colorAtten) * pdy * p * vec3(1.0, 0.6, 0.5);

  color = contrast(color, u_colorContrast);
  color = desaturate(color, 1.0 - u_colorSaturation);
  color = hueShift(color, u_colorHueShift);
  color += (1.0 - pdy) * 0.1 * vec3(1.0, 0.45, 0.35); // Stripe lifts by 0.25 in white; a little, in warm red, here

  float g = fract(sin(dot(gl_FragCoord.xy + fract(u_time * 0.001) * 91.0, vec2(12.9898, 78.233))) * 43758.5453);
  color += (g - 0.5) * 0.045 * u_grain;
  o = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

// Stripe's folded plane (their SingleWaveGeometry "folded").
function foldedGeometry(width = 400, height = 400, nx = 128, ny = 256) {
  const ax = nx + 1, ay = ny + 1;
  const pos = new Float32Array(ax * ay * 3);
  const uvs = new Float32Array(ax * ay * 2);
  let d = 0, m = 0;
  for (let j = 0; j < ay; j++) {
    const yv = j * (height / ny) - height / 2;
    for (let i = 0; i < ax; i++) {
      let x = i * (width / nx) - width / 2;
      const y = -yv;
      let z = 0;
      const v = 1 - j / ny;
      const pr = 4 - 2 * (4 * v * (1 - v)) ** 9.5;
      if (x < -16) z += pr;
      else if (x < 16) {
        z = Math.cos(((x + 16) * Math.PI) / 32) * pr;
        x = Math.cos(-Math.PI / 2 + ((x + 16) * Math.PI) / 32) * pr - 16;
      } else { z -= pr; x = -x; }
      x += width / 4;
      // −90° about X, then −90° about Y: (x, y, z) → (y, z, x).
      pos[d] = y; pos[d + 1] = z; pos[d + 2] = x; d += 3;
      uvs[m] = i / nx; uvs[m + 1] = v; m += 2;
    }
  }
  const idx = new Uint32Array(nx * ny * 6);
  let k = 0;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const a = i + ax * j, b = i + ax * (j + 1), c = i + 1 + ax * (j + 1), e = i + 1 + ax * j;
    idx[k++] = a; idx[k++] = b; idx[k++] = e; idx[k++] = b; idx[k++] = c; idx[k++] = e;
  }
  return { pos, uvs, idx };
}

// Column-major 4×4 helpers.
type M4 = Float32Array;
const mul = (a: M4, b: M4) => {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
    o[c * 4 + r] = s;
  }
  return o;
};
const rot = (axis: 'x' | 'y' | 'z', t: number): M4 => {
  const c = Math.cos(t), s = Math.sin(t);
  if (axis === 'x') return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
  if (axis === 'y') return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
  return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};

export type StripeSilk = {
  /** Change the framing (position, scale, zoom…); takes effect on the next resize. */
  configure: (over: Partial<SilkConfig>) => void;
  resize: (w: number, h: number, dpr: number) => void;
  draw: (ms: number) => void;
  dispose: () => void;
};

export function createStripeSilk(canvas: HTMLCanvasElement, base: SilkConfig): StripeSilk | null {
  let cfg = { ...base };
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: true, premultipliedAlpha: true });
  if (!gl) return null;
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  };
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;

  const geo = foldedGeometry();
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const attr = (name: string, data: Float32Array, size: number) => {
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  };
  attr('position', geo.pos, 3);
  attr('uv', geo.uvs, 2);
  const ib = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.idx, gl.STATIC_DRAW);
  const count = geo.idx.length;

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const u = {
    model: U('u_model'), view: U('u_view'), proj: U('u_proj'), time: U('u_time'), speed: U('u_speed'), res: U('u_resolution'),
    tf: U('u_twistFrequency'), tp: U('u_twistPower'), dfx: U('u_displaceFrequencyX'), dfz: U('u_displaceFrequencyZ'), da: U('u_displaceAmount'),
    cc: U('u_colorContrast'), cs: U('u_colorSaturation'), ch: U('u_colorHueShift'), ga: U('u_glowAmount'), gp: U('u_glowPower'), gr: U('u_glowRamp'), grain: U('u_grain'),
  };

  // Model: translate · rotate (Euler XYZ) · scale, as three.js composes it.
  const modelOf = (c: SilkConfig) => {
    const [sx, sy, sz] = c.scale;
    const scale = new Float32Array([sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1]);
    const R = mul(mul(rot('x', c.rotation[0]), rot('y', c.rotation[1])), rot('z', c.rotation[2]));
    const T = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c.position[0], c.position[1], c.position[2], 1]);
    return mul(T, mul(R, scale));
  };
  let model = modelOf(cfg);
  // View: a camera at (100, 0, 5000) looking at the origin.
  const eye = [100, 0, 5000];
  const zl = Math.hypot(...eye);
  const zx = eye[0] / zl, zz = eye[2] / zl;           // z axis
  const xx = zz, xz = -zx;                            // x = up × z (up = y)
  const view = new Float32Array([xx, 0, zx, 0, 0, 1, 0, 0, xz, 0, zz, 0,
    -(xx * eye[0] + xz * eye[2]), 0, -(zx * eye[0] + zz * eye[2]), 1]);
  let proj = new Float32Array(16);
  let res = [1, 1];

  return {
    configure(over) { cfg = { ...cfg, ...over }; model = modelOf(cfg); },
    resize(w, h, dpr) {
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      res = [canvas.width, canvas.height];
      const l = -w / 2 / cfg.zoom, r = w / 2 / cfg.zoom, t = h / 2 / cfg.zoom, b = -h / 2 / cfg.zoom, n = 1, f = 10000;
      const fx = cfg.flip ? -1 : 1;
      proj = new Float32Array([fx * 2 / (r - l), 0, 0, 0, 0, 2 / (t - b), 0, 0, 0, 0, -2 / (f - n), 0, -(r + l) / (r - l), -(t + b) / (t - b), -(f + n) / (f - n), 1]);
    },
    draw(ms) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.useProgram(prog);
      gl.bindVertexArray(vao);
      gl.uniformMatrix4fv(u.model, false, model);
      gl.uniformMatrix4fv(u.view, false, view);
      gl.uniformMatrix4fv(u.proj, false, proj);
      gl.uniform1f(u.time, ms + cfg.timeOffset);
      gl.uniform1f(u.speed, cfg.speed);
      gl.uniform2f(u.res, res[0], res[1]);
      gl.uniform3f(u.tf, ...cfg.twistFrequency);
      gl.uniform3f(u.tp, ...cfg.twistPower);
      gl.uniform1f(u.dfx, cfg.displaceFrequencyX);
      gl.uniform1f(u.dfz, cfg.displaceFrequencyZ);
      gl.uniform1f(u.da, cfg.displaceAmount);
      gl.uniform1f(u.cc, cfg.colorContrast);
      gl.uniform1f(u.cs, cfg.colorSaturation);
      gl.uniform1f(u.ch, cfg.colorHueShift);
      gl.uniform1f(u.ga, cfg.glowAmount);
      gl.uniform1f(u.gp, cfg.glowPower);
      gl.uniform1f(u.gr, cfg.glowRamp);
      gl.uniform1f(u.grain, cfg.grain);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_INT, 0);
    },
    dispose() { gl.getExtension('WEBGL_lose_context')?.loseContext(); },
  };
}

// Stripe's large-screen light-theme hero settings (their config "l").
export const STRIPE_HERO: SilkConfig = {
  speed: 4e-5, timeOffset: 17500, colorContrast: 1, colorSaturation: 1, colorHueShift: 0,
  displaceFrequencyX: 0.005831, displaceFrequencyZ: 0.016001, displaceAmount: -7.821,
  position: [380, -301.7, -11.1], rotation: [-0.4496, -0.1176, 1.8744], scale: [9, 8, 5],
  twistFrequency: [-0.65, 0.41, -0.58], twistPower: [3.63, 0.7, 3.95],
  glowAmount: 1.98, glowPower: 0.806, glowRamp: 0.834, zoom: 1, grain: 1.1,
};
