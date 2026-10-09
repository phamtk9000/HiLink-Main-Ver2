// The silk ribbon behind "Built to connect. Designed to scale." — a WebGL2
// surface rendered the way the Stripe homepage renders its hero wave:
//
//   - a finely divided plane (Stripe: 128 × 256) bent and twisted in the
//     vertex shader, here along HiLink's rising, turning path;
//   - colour from a palette across the surface (peach → coral → HiLink red →
//     wine), lit from its own normal so the folds read as cloth;
//   - fine threads from high-frequency simplex noise running along the
//     ribbon (Stripe: frequency ~600, strength 0.2), fading where the cloth
//     turns edge-on;
//   - a sheen where it turns edge-on, measured, as Stripe does, from the
//     screen-space derivative of the surface coordinate;
//   - a touch of film grain.
//
// Waves travel along it, it breathes and turns, and it swells under the
// pointer. Returns null when WebGL2 is unavailable, so the caller can fall
// back to drawing lines on a 2D canvas.

const VS = `#version 300 es
in vec2 a_uv;
uniform vec2 u_size;      // CSS px
uniform float u_time;
uniform float u_px;       // pointer x, CSS px
uniform float u_pon;      // pointer presence 0..1
out vec2 v_uv;
out vec3 v_pos;
float sm(float a, float b, float x) { return smoothstep(a, b, x); }
void main() {
  float u = a_uv.x, s = a_uv.y - 0.5, t = u_time;
  float W = u_size.x, H = u_size.y;
  float x = u * W * 1.06 - W * 0.03;
  float swell = 1.0 + 0.4 * u_pon * exp(-pow(x - u_px, 2.0) / (2.0 * 130.0 * 130.0));
  float centre = H * 0.6 - H * 0.24 * sm(0.3, 0.85, u)
    + sin(u * 5.2 - t * 0.85) * H * 0.055 * (0.35 + sm(0.2, 1.0, u))
    + sin(u * 11.0 + t * 0.6) * H * 0.012;
  float width = H * (0.11 + 0.44 * sm(0.22, 0.95, u)) * (1.0 + 0.14 * sin(t * 0.55 + u * 3.0)) * swell;
  float theta = 3.14159265 * (0.18 + 0.82 * sm(0.12, 0.8, u)) + s * 0.5 * sm(0.15, 0.6, u) + 0.34 * sin(t * 0.45 + u * 3.2);
  float ripple = sin(u * 9.0 + t * 1.1 + s * 4.0) * H * 0.012 * sm(0.25, 1.0, u);
  vec3 p = vec3(x, centre + s * width * cos(theta) + ripple, s * width * sin(theta));
  v_uv = a_uv;
  v_pos = p;
  gl_Position = vec4(p.x / W * 2.0 - 1.0, 1.0 - p.y / H * 2.0, -p.z / (H * 1.5), 1.0);
}`;

const FS = `#version 300 es
precision highp float;
in vec2 v_uv;
in vec3 v_pos;
uniform float u_time;
uniform float u_dpr;
out vec4 o;

// 2D simplex noise (Ashima Arts / Stefan Gustavson), as in Stripe's shader.
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// HiLink palette along the ribbon, warmer at one edge than the other.
vec3 palette(float u, float v) {
  vec3 c0 = vec3(0.98, 0.72, 0.60);
  vec3 c1 = vec3(1.00, 0.58, 0.48);
  vec3 c2 = vec3(0.95, 0.30, 0.36);
  vec3 c3 = vec3(0.82, 0.13, 0.15);
  vec3 c4 = vec3(0.55, 0.07, 0.15);
  vec3 c = u < 0.28 ? mix(c0, c1, u / 0.28)
         : u < 0.52 ? mix(c1, c2, (u - 0.28) / 0.24)
         : u < 0.78 ? mix(c2, c3, (u - 0.52) / 0.26)
         : mix(c3, c4, (u - 0.78) / 0.22);
  // Across the ribbon one edge warms towards peach, the other deepens, so
  // the twist shows as a change of colour, as on Stripe's wave.
  c = mix(c, mix(c1, c0, 0.6), smoothstep(0.5, 1.0, v) * 0.55);
  return mix(c * vec3(0.78, 0.7, 0.75), c, smoothstep(0.0, 0.45, v));
}

void main() {
  vec3 N = normalize(cross(dFdx(v_pos), dFdy(v_pos)));
  if (N.z < 0.0) N = -N; // cloth: both faces lit
  vec3 L = normalize(vec3(-0.35, -0.6, 0.72));
  float diff = clamp(dot(N, L), 0.0, 1.0);
  float spec = pow(clamp(dot(N, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 42.0);

  // How edge-on the cloth is here: the across-coordinate changing fast per
  // pixel means the surface is turned away (Stripe's "pdy").
  // per CSS px: ~0.003 where the cloth faces us, 0.1+ where it folds away.
  float g = length(vec2(dFdx(v_uv.y), dFdy(v_uv.y))) * u_dpr;
  float comp = smoothstep(0.018, 0.12, g);

  vec3 col = palette(v_uv.x, v_uv.y);
  col *= 0.42 + 0.7 * diff;

  // Threads along the ribbon.
  // A few CSS px per thread wherever the cloth faces us: the frequency
  // across the ribbon follows how wide it is on screen.
  float n0 = snoise(vec2(v_uv.x * 0.9, v_uv.y * 0.6 + u_time * 0.015));
  float threads = clamp(0.28 / max(g, 0.0012), 40.0, 160.0);
  float n1 = snoise(vec2(v_uv.y * threads * (1.0 + 0.35 * n0), v_uv.x * 7.0 * (1.0 + 0.5 * n0))) * 0.5 + 0.5;
  float n2 = snoise(vec2(v_uv.y * threads * 2.3, v_uv.x * 15.0 + 3.0)) * 0.5 + 0.5;
  float fibre = mix(n1, n2, 0.35);
  col *= 0.82 + 0.36 * fibre * (1.0 - comp);
  col += (fibre - 0.5) * 0.1 * (1.0 - comp);

  // Sheen on the folds.
  col += spec * 0.3 + pow(comp, 2.0) * vec3(0.36, 0.26, 0.24);

  // Grain.
  col += (hash(gl_FragCoord.xy + fract(u_time) * 97.0) - 0.5) * 0.04;

  float edge = smoothstep(0.0, 0.012, v_uv.y) * smoothstep(1.0, 0.988, v_uv.y);
  float ends = smoothstep(0.0, 0.12, v_uv.x) * smoothstep(1.0, 0.86, v_uv.x);
  float a = edge * ends;
  if (a < 0.01) discard;
  o = vec4(clamp(col, 0.0, 1.0) * a, a);
}`;

export type Silk = {
  resize: (w: number, h: number, dpr: number) => void;
  draw: (time: number, pointerX: number, pointerOn: number) => void;
  dispose: () => void;
};

export function createSilk(canvas: HTMLCanvasElement): Silk | null {
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: true, premultipliedAlpha: true });
  if (!gl) return null;
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  };
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;

  // The plane: NX steps along, NY across, as triangle strips joined by
  // degenerate triangles.
  const NX = 320, NY = 96;
  const verts: number[] = [];
  for (let j = 0; j < NY; j++) {
    const v0 = j / NY, v1 = (j + 1) / NY;
    if (j) verts.push(0, v0);
    for (let i = 0; i <= NX; i++) { const u = i / NX; verts.push(u, v0, u, v1); }
    if (j < NY - 1) verts.push(1, v1);
  }
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const loc = gl.getAttribLocation(prog, 'a_uv');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const count = verts.length / 2;
  const U = (n: string) => gl.getUniformLocation(prog, n);
  const uSize = U('u_size'), uTime = U('u_time'), uPx = U('u_px'), uPon = U('u_pon'), uTimeF = U('u_time'), uDpr = U('u_dpr');
  let W = 1, H = 1, DPR = 1;

  return {
    resize(w, h, dpr) {
      W = w; H = h; DPR = dpr;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    draw(time, px, pon) {
      gl.clearColor(0, 0, 0, 0);
      gl.clearDepth(1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(prog);
      gl.bindVertexArray(vao);
      gl.uniform2f(uSize, W, H);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uTimeF, time);
      gl.uniform1f(uPx, px);
      gl.uniform1f(uPon, pon);
      gl.uniform1f(uDpr, DPR);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, count);
    },
    dispose() {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
