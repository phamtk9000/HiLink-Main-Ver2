// "Every link creates value" — HiLink's philosophy as an interactive field.
//
// A burst of lines rises from a single hub (HiLink) like a sunrise; every tip
// is a business or a person. Four pillars re-shape the field:
//
//   01 Connect      tips join their neighbours into a mesh — a community
//   02 Opportunity  light runs out along the lines and tips sprout branches
//   03 Grow         the burst breathes outwards and growth rings spread
//   04 Destination  lines gather into seven bundles — the HiLink locations
//
// The pointer is part of it: lines lean towards it and nearby tips link to it.
// A click or tap sends a pulse out and adds new connections near that spot.
//
// Canvas 2D, ~170 lines, paused when off-screen or in a background tab, and
// drawn once (no loop, no auto-advance) for visitors who ask for reduced motion.
import { useEffect, useRef, useState } from 'react';
import { LOCATIONS } from '../data/locations';
import { PARTNERS } from '../data/site';
import { useLang } from '../lib/i18n';

type Mode = 0 | 1 | 2 | 3;

const T = {
  en: {
    eyebrow: 'The HiLink philosophy',
    title: 'Every link creates value.',
    lead: 'Link is in our name and at the heart of what we do: connecting business people with each other, turning those connections into opportunities, growing together — and bringing every client to the place they need to be.',
    hint: 'Move to explore · Click to spark a connection',
    hintTouch: 'Tap to spark a connection',
    pillars: [
      { t: 'Connect', d: 'We bring business people together — in our lounges, at the HiLink Business Club and through the companies we work with.', f: `${PARTNERS.length} partner companies` },
      { t: 'Create opportunity', d: 'A good introduction opens doors: a client, a partner, a new hire. We make those introductions part of everyday work.', f: 'One relationship, one point of accountability' },
      { t: 'Grow together', d: 'As a business grows, its space and support grow with it — from a business address to a desk, an office, a whole floor.', f: 'From E-office to whole floors' },
      { t: 'Lead to the right place', d: 'We guide every client to the right address and the right solution, across our locations in central Hanoi.', f: `${LOCATIONS.length} locations in Hoan Kiem & Dong Da` },
    ],
    pause: 'Pause', play: 'Play',
  },
  vi: {
    eyebrow: 'Triết lý HiLink',
    title: 'Mỗi kết nối tạo nên giá trị.',
    lead: 'Link nằm trong tên gọi và là cốt lõi của những gì chúng tôi làm: kết nối doanh nhân với nhau, biến kết nối thành cơ hội, cùng nhau phát triển — và đưa mỗi khách hàng tới đúng nơi họ cần đến.',
    hint: 'Di chuột để khám phá · Nhấp để tạo kết nối',
    hintTouch: 'Chạm để tạo kết nối',
    pillars: [
      { t: 'Kết nối', d: 'Chúng tôi đưa doanh nhân đến gần nhau — tại các lounge, tại HiLink Business Club và qua những doanh nghiệp đồng hành.', f: `${PARTNERS.length} doanh nghiệp đối tác` },
      { t: 'Tạo cơ hội', d: 'Một lời giới thiệu đúng mở ra cánh cửa: một khách hàng, một đối tác, một nhân sự mới. Chúng tôi biến điều đó thành việc hằng ngày.', f: 'Một mối quan hệ, một đầu mối chịu trách nhiệm' },
      { t: 'Cùng phát triển', d: 'Khi doanh nghiệp lớn lên, không gian và hỗ trợ lớn theo — từ địa chỉ doanh nghiệp đến chỗ ngồi, văn phòng, nguyên sàn.', f: 'Từ E-office đến nguyên sàn' },
      { t: 'Đưa tới đúng nơi', d: 'Chúng tôi dẫn mỗi khách hàng tới đúng địa chỉ và đúng giải pháp, tại các địa điểm giữa trung tâm Hà Nội.', f: `${LOCATIONS.length} địa điểm tại Hoàn Kiếm & Đống Đa` },
    ],
    pause: 'Tạm dừng', play: 'Phát',
  },
};

const MODE_MS = 7000;
const RED = [209, 33, 38];
const INK = [42, 38, 35];
const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

// Deterministic randomness so the field looks the same on every visit.
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

interface Line {
  a: number; len: number; r: number; big: boolean;   // base angle (rad), length 0–1, tip radius
  ca: number; cl: number;                           // current angle / length (animated)
  dest: number;                                     // destination index for mode 04
  born: number;                                     // spawn time (for lines added by clicks)
}
interface Pulse { line: number; t: number; speed: number }
interface Branch { x: number; y: number; a: number; len: number; t: number }
interface Ring { t: number }

export function LinkPhilosophy() {
  const { lang } = useLang();
  const t = T[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [mode, setMode] = useState<Mode>(0);
  const [playing, setPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const modeRef = useRef<Mode>(0);
  const [touch, setTouch] = useState(false);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Auto-advance through the pillars while playing.
  useEffect(() => {
    modeRef.current = mode;
    if (!playing || reduced) return undefined;
    const id = window.setTimeout(() => setMode(((mode + 1) % 4) as Mode), MODE_MS);
    return () => window.clearTimeout(id);
  }, [mode, playing, progressKey, reduced]);

  useEffect(() => { setTouch(window.matchMedia('(pointer: coarse)').matches); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const rand = rng(20200);
    const N = 170;
    const lines: Line[] = [];
    const A0 = Math.PI * 1.04;   // just below the left horizon
    const A1 = Math.PI * 1.96;   // just below the right horizon
    for (let i = 0; i < N; i++) {
      const a = A0 + (A1 - A0) * (i + rand() * 0.9) / N;
      const centre = 1 - Math.abs((a - Math.PI * 1.5) / (Math.PI * 0.46)); // longer in the middle
      const len = 0.58 + 0.34 * centre * (0.55 + rand() * 0.45) + rand() * 0.08;
      const big = rand() < 0.14;
      lines.push({ a, len, r: big ? 2.6 + rand() * 1.4 : 0.9 + rand() * 1.3, big, ca: a, cl: 0, dest: 0, born: -1e9 });
    }
    // Seven destinations on an arc; each line is routed to the nearest one.
    const DEST = LOCATIONS.map((_, i) => A0 + 0.12 + (A1 - A0 - 0.24) * (i + 0.5) / LOCATIONS.length);
    lines.forEach((l) => {
      let best = 0;
      DEST.forEach((d, k) => { if (Math.abs(d - l.a) < Math.abs(DEST[best] - l.a)) best = k; });
      l.dest = best;
    });
    // Neighbour pairs for the mesh (mode 01): tips close in angle and length.
    const pairs: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < Math.min(N, i + 9); j++) {
        if (Math.abs(lines[i].len - lines[j].len) < 0.09 && rand() < 0.55) pairs.push([i, j]);
      }
    }

    let w = 0, h = 0, R = 0, hx = 0, hy = 0, dpr = 1, destR = 0.98;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      hx = w / 2; hy = h - 6;
      // Narrow screens: the side lines are short, so the burst can run past half
      // the width without the tips leaving the canvas.
      R = Math.min(h - 36, w < 640 ? w * 0.62 : w * 0.48);
      // Destination tips sit on an arc that must stay inside the canvas.
      destR = Math.min(0.98, (w / 2 - 24) / R);
      placeLabels();
      if (reduced) draw(performance.now(), true);
    };
    const tip = (l: Line, len = l.cl, a = l.ca) => [hx + Math.cos(a) * R * len, hy + Math.sin(a) * R * len];

    const placeLabels = () => {
      DEST.forEach((d, k) => {
        const el = labelsRef.current[k];
        if (!el) return;
        const half = el.offsetWidth / 2;
        const x = Math.min(w - half - 8, Math.max(half + 8, hx + Math.cos(d) * R * destR));
        const y = hy + Math.sin(d) * R * destR;
        // On narrow screens alternate labels sit higher so neighbours don't touch.
        const lift = w < 640 && k % 2 === 1 ? 210 : 140;
        el.style.transform = `translate(${x - half}px, ${y}px) translate(0, -${lift}%)`;
      });
    };

    const pointer = { x: -9999, y: -9999, on: false };
    const pulses: Pulse[] = [];
    const branches: Branch[] = [];
    const rings: Ring[] = [];
    let lastPulse = 0;

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.on = true;
    };
    const onLeave = () => { pointer.on = false; };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      const now = performance.now();
      rings.push({ t: now });
      // Light out along the lines nearest the click, and a few new links.
      const ang = Math.atan2(pointer.y - hy, pointer.x - hx);
      lines.forEach((l, i) => { if (Math.abs(l.ca - ang) < 0.22 && Math.random() < 0.6) pulses.push({ line: i, t: now, speed: 0.0011 + Math.random() * 0.0007 }); });
      for (let k = 0; k < 4; k++) {
        const a = Math.min(A1, Math.max(A0, ang + (Math.random() - 0.5) * 0.3));
        let dest = 0;
        DEST.forEach((d, n) => { if (Math.abs(d - a) < Math.abs(DEST[dest] - a)) dest = n; });
        lines.push({ a, len: 0.5 + Math.random() * 0.45, r: 1 + Math.random() * 2, big: Math.random() < 0.3, ca: a, cl: 0, dest, born: now });
      }
      if (lines.length > N + 60) lines.splice(N, lines.length - N - 60);
      if (reduced) draw(now, true);
    };

    let raf = 0;
    let visible = true;
    let last = performance.now();

    function draw(now: number, still = false) {
      const dt = Math.min(64, now - last); last = now;
      const m = modeRef.current;
      const k = still ? 1 : 1 - Math.pow(0.0025, dt / 1000); // smoothing factor per frame
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      const pAng = Math.atan2(pointer.y - hy, pointer.x - hx);
      const pDist = Math.hypot(pointer.x - hx, pointer.y - hy) / R;
      const breathe = m === 2 ? 0.86 + 0.14 * Math.sin(now / 1400) : 1;

      // Ease every line towards its target for the current mode.
      lines.forEach((l) => {
        let ta = l.a;
        let tl = l.len * breathe;
        if (m === 3) { ta = DEST[l.dest] + (l.a - DEST[l.dest]) * 0.12; tl = destR; }
        if (pointer.on && !still) {
          const da = pAng - ta;
          if (Math.abs(da) < 0.35 && pDist < 1.25) ta += da * 0.18 * (1 - Math.abs(da) / 0.35);
        }
        const grow = l.born > 0 ? Math.min(1, (now - l.born) / 900) : 1;
        l.ca += (ta - l.ca) * k;
        l.cl += (tl * grow - l.cl) * k;
      });

      // Growth rings (mode 03) and click rings.
      if (m === 2 && !still && now - lastPulse > 1600) { rings.push({ t: now }); lastPulse = now; }
      for (let i = rings.length - 1; i >= 0; i--) {
        const p = (now - rings[i].t) / 2400;
        if (p >= 1) { rings.splice(i, 1); continue; }
        ctx!.beginPath();
        ctx!.arc(hx, hy, R * (0.08 + p), Math.PI, Math.PI * 2);
        ctx!.strokeStyle = rgba(RED, 0.28 * (1 - p));
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // Lines: ink near the hub fading out; red where the pointer leans them.
      lines.forEach((l) => {
        const [x, y] = tip(l);
        const lean = pointer.on ? Math.max(0, 1 - Math.abs(pAng - l.ca) / 0.2) * (pDist < 1.25 ? 1 : 0) : 0;
        const g = ctx!.createLinearGradient(hx, hy, x, y);
        g.addColorStop(0, rgba(INK, 0.05));
        g.addColorStop(1, lean > 0 ? rgba(RED, 0.25 + 0.5 * lean) : rgba(m === 3 ? RED : INK, m === 3 ? 0.28 : 0.2 + (l.big ? 0.12 : 0)));
        ctx!.beginPath(); ctx!.moveTo(hx, hy); ctx!.lineTo(x, y);
        ctx!.strokeStyle = g; ctx!.lineWidth = l.big ? 1 : 0.7; ctx!.stroke();
      });

      // Mesh between neighbouring tips (mode 01).
      if (m === 0) {
        const fade = 0.5 + 0.5 * Math.sin(now / 900);
        ctx!.lineWidth = 0.6;
        pairs.forEach(([i, j], n) => {
          const [x1, y1] = tip(lines[i]); const [x2, y2] = tip(lines[j]);
          ctx!.beginPath(); ctx!.moveTo(x1, y1); ctx!.lineTo(x2, y2);
          ctx!.strokeStyle = rgba(RED, 0.1 + 0.18 * (n % 3 === 0 ? fade : 1 - fade));
          ctx!.stroke();
        });
      }

      // Opportunity (mode 02): pulses run out continuously; tips sprout branches.
      if (m === 1 && !still && Math.random() < dt / 70) {
        pulses.push({ line: Math.floor(Math.random() * lines.length), t: now, speed: 0.0008 + Math.random() * 0.0006 });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]; const l = lines[p.line];
        if (!l) { pulses.splice(i, 1); continue; }
        const s = (now - p.t) * p.speed;
        if (s >= 1) {
          pulses.splice(i, 1);
          if (m === 1 || Math.random() < 0.5) { const [x, y] = tip(l); branches.push({ x, y, a: l.ca + (Math.random() < 0.5 ? -1 : 1) * (0.3 + Math.random() * 0.4), len: 14 + Math.random() * 22, t: now }); }
          continue;
        }
        const [x, y] = tip(l, l.cl * s);
        ctx!.beginPath(); ctx!.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx!.fillStyle = rgba(RED, 0.9 * (1 - s * 0.4)); ctx!.fill();
      }
      for (let i = branches.length - 1; i >= 0; i--) {
        const b = branches[i]; const p = (now - b.t) / 2600;
        if (p >= 1) { branches.splice(i, 1); continue; }
        const grow = Math.min(1, p * 4);
        const x2 = b.x + Math.cos(b.a) * b.len * grow; const y2 = b.y + Math.sin(b.a) * b.len * grow;
        ctx!.beginPath(); ctx!.moveTo(b.x, b.y); ctx!.lineTo(x2, y2);
        ctx!.strokeStyle = rgba(RED, 0.55 * (1 - p)); ctx!.lineWidth = 0.8; ctx!.stroke();
        ctx!.beginPath(); ctx!.arc(x2, y2, 1.6, 0, Math.PI * 2); ctx!.fillStyle = rgba(RED, 0.7 * (1 - p)); ctx!.fill();
      }

      // Tips.
      lines.forEach((l) => {
        const [x, y] = tip(l);
        const near = pointer.on ? Math.max(0, 1 - Math.hypot(pointer.x - x, pointer.y - y) / 120) : 0;
        ctx!.beginPath(); ctx!.arc(x, y, l.r * (1 + near * 0.8), 0, Math.PI * 2);
        ctx!.fillStyle = l.big || near > 0 ? rgba(RED, 0.75 + 0.25 * near) : rgba(INK, 0.45);
        ctx!.fill();
      });

      // The pointer joins the network: links to the tips around it.
      if (pointer.on && !still) {
        ctx!.lineWidth = 0.7;
        lines.forEach((l) => {
          const [x, y] = tip(l);
          const d = Math.hypot(pointer.x - x, pointer.y - y);
          if (d < 110) {
            ctx!.beginPath(); ctx!.moveTo(pointer.x, pointer.y); ctx!.lineTo(x, y);
            ctx!.strokeStyle = rgba(RED, 0.5 * (1 - d / 110)); ctx!.stroke();
          }
        });
        ctx!.beginPath(); ctx!.arc(pointer.x, pointer.y, 3.2, 0, Math.PI * 2); ctx!.fillStyle = rgba(RED, 0.9); ctx!.fill();
      }

      // The hub.
      ctx!.beginPath(); ctx!.arc(hx, hy, 7, 0, Math.PI * 2); ctx!.fillStyle = rgba(RED, 1); ctx!.fill();
      ctx!.beginPath(); ctx!.arc(hx, hy, 14 + 3 * Math.sin(now / 600), 0, Math.PI * 2); ctx!.strokeStyle = rgba(RED, 0.25); ctx!.lineWidth = 1; ctx!.stroke();

      // Destination labels follow mode 04.
      labelsRef.current.forEach((el) => { if (el) el.style.opacity = m === 3 ? '1' : '0'; });
    }

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !reduced) { last = performance.now(); raf = requestAnimationFrame(loop); } };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0.05 });
    io.observe(wrap);
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener('visibilitychange', onVis);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerdown', onDown);
    resize();
    if (reduced) {
      lines.forEach((l) => { l.cl = l.len; });
      draw(performance.now(), true);
    } else start();

    // Re-draw once when the mode changes under reduced motion.
    const redraw = () => { if (reduced) draw(performance.now(), true); };
    window.addEventListener('hilink-link-mode', redraw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('hilink-link-mode', redraw);
    };
  }, [reduced]);

  const choose = (i: Mode) => {
    setMode(i);
    setProgressKey((k) => k + 1);
    modeRef.current = i;
    window.dispatchEvent(new Event('hilink-link-mode'));
  };

  return (
    <section
      className="relative overflow-hidden bg-white py-20 lg:py-28"
      style={{ backgroundImage: 'radial-gradient(ellipse 60% 55% at 50% 100%, rgba(209,33,38,0.2), rgba(251,236,236,0.7) 38%, rgba(244,240,234,0.55) 58%, rgba(255,255,255,0) 80%)' }}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[#D12126]" /> {t.eyebrow}
            </p>
            <h2 className="serif leading-[1.05]">{t.title}</h2>
          </div>
          <p className="lg:col-span-5 text-[#6B645D] text-[1.0625rem] leading-relaxed">{t.lead}</p>
        </div>
      </div>

      {/* The field. Purely visual: the same ideas are in the pillars below. */}
      <div ref={wrapRef} className="relative mt-8 h-[360px] sm:h-[440px] lg:h-[520px] w-full select-none" aria-hidden="true">
        <canvas ref={canvasRef} className="absolute inset-0 cursor-crosshair touch-pan-y" />
        {LOCATIONS.map((loc, i) => (
          <span
            key={loc.id}
            ref={(el) => { labelsRef.current[i] = el; }}
            className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full bg-white/90 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-medium text-[#2A2623] shadow-[0_1px_8px_rgba(42,38,35,0.12)] transition-opacity duration-700"
            style={{ opacity: 0 }}
          >
            <span className="hidden sm:inline">{loc.name}</span>
            <span className="sm:hidden">{loc.name.replace('4 Ton That Tung · Floor ', 'TTT · F')}</span>
          </span>
        ))}
        <p className="pointer-events-none absolute top-3 left-6 sm:left-auto sm:right-6 lg:right-12 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#6B645D]">
          {touch ? t.hintTouch : t.hint}
        </p>
      </div>

      {/* Pillars: numbered tabs with a progress line, Brookfield/McKinsey style. */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div role="tablist" aria-label={t.eyebrow} className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-[#2A2623]/15">
          {t.pillars.map((p, i) => {
            const active = mode === i;
            return (
              <button
                key={p.t}
                role="tab"
                aria-selected={active}
                onClick={() => choose(i as Mode)}
                className={`group relative text-left pt-7 pb-8 pr-8 transition-colors ${active ? '' : 'opacity-60 hover:opacity-100'}`}
              >
                <span className="absolute left-0 top-[-1px] h-[2px] w-full bg-transparent">
                  {active && (
                    <span
                      key={`${progressKey}-${i}`}
                      className="block h-full bg-[#D12126]"
                      style={{ animation: playing && !reduced ? `hl-progress ${MODE_MS}ms linear forwards` : 'none', width: playing && !reduced ? undefined : '100%' }}
                    />
                  )}
                </span>
                <span className="block text-[11px] font-semibold tracking-[0.16em] text-[#D12126] mb-3">{String(i + 1).padStart(2, '0')}</span>
                <span className="block serif text-[1.45rem] leading-snug text-[#2A2623] mb-3">{p.t}</span>
                <span className="block text-[14px] leading-relaxed text-[#6B645D] mb-4">{p.d}</span>
                <span className={`inline-block text-[11px] uppercase tracking-[0.14em] ${active ? 'text-[#2A2623]' : 'text-[#6B645D]'}`}>{p.f}</span>
              </button>
            );
          })}
        </div>
        {!reduced && (
          <button
            onClick={() => { setPlaying((v) => !v); setProgressKey((k) => k + 1); }}
            className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#6B645D] hover:text-[#D12126] transition-colors"
          >
            {playing ? t.pause : t.play}
          </button>
        )}
      </div>
    </section>
  );
}
