// "Every link creates value" — HiLink's philosophy, laid out like the Stripe
// homepage section "The backbone of global commerce".
//
// A WebGL burst of lines rises from one hub (lib/linkField.ts). Four stats sit
// under it in a framed row; choosing one re-shapes the field:
//
//   Connect      partner companies   tips join their neighbours into a mesh
//   Opportunity  one point of contact light runs out along the lines
//   Grow         founded 2020        the burst breathes and growth rings spread
//   Destination  locations           the field dims; one route lights up per location
//
// As on Stripe, a menu in the corner sets the time of day (pre-dawn → night):
// the background gradient and the line colours crossfade over 1.2s. It opens
// on Daytime. The pointer pushes lines aside; a click sends light out from
// that spot.
//
// The loop runs only while the section is on screen and the tab is visible.
// Reduced motion: one still frame, no auto-advance. No WebGL: the gradient,
// stats and captions still work, without the lines.
import { useEffect, useRef, useState } from 'react';
import { Moon, MoonStar, Pause, Play, Sun, SunDim, Sunrise, Sunset } from 'lucide-react';
import { PARTNER_FIGURE } from '../data/site';
import { useLang } from '../lib/i18n';
import { LinkField, rgb, type Palette } from '../lib/linkField';
import { Flag } from './Flag';
import { WORKSPACE_LOCATIONS } from '../data/workspaceLocations';

type Scene = 0 | 1 | 2 | 3;
type Tod = 'predawn' | 'sunrise' | 'daytime' | 'dusk' | 'sunset' | 'night';

const T = {
  en: {
    eyebrow: 'The HiLink philosophy',
    title: 'Every link creates value.',
    lead: 'Link is in our name and all we do: connecting people, turning connections into opportunities, bringing every client to the right place.',
    stats: [
      { n: PARTNER_FIGURE, l: 'partner companies', t: 'Connect', d: 'We bring business people together — in our lounges, at the HiLink Business Club and through the companies we work with.' },
      { n: '1', l: 'point of contact for every client', t: 'Create opportunity', d: 'A good introduction opens doors: a client, a partner, a new hire. We make those introductions part of everyday work.' },
      { n: '2020', l: 'growing with our clients since', t: 'Grow together', d: 'As a business grows, its space and support grow with it — from a business address to a desk, an office, a whole floor.' },
      { n: String(WORKSPACE_LOCATIONS.length), l: 'locations in central Hanoi', t: 'Lead to the right place', d: 'We guide every client to the right address and the right solution, across our locations in Hoan Kiem and Dong Da.' },
    ],
    tod: { predawn: 'Pre-dawn', sunrise: 'Sunrise', daytime: 'Daytime', dusk: 'Dusk', sunset: 'Sunset', night: 'Night' },
    todLabel: 'Time of day',
    hint: 'Move to explore · Click to send a spark',
    hintTouch: 'Tap to send a spark',
    pause: 'Pause animation', play: 'Play animation',
  },
  vi: {
    eyebrow: 'Triết lý HiLink',
    title: 'Mỗi kết nối tạo nên giá trị.',
    lead: 'Link nằm trong tên gọi và trong mọi việc chúng tôi làm: kết nối doanh nhân, biến kết nối thành cơ hội và đưa mỗi khách hàng tới đúng nơi.',
    stats: [
      { n: PARTNER_FIGURE, l: 'doanh nghiệp đối tác', t: 'Kết nối', d: 'Chúng tôi đưa doanh nhân đến gần nhau — tại các lounge, tại HiLink Business Club và qua những doanh nghiệp đồng hành.' },
      { n: '1', l: 'đầu mối cho mỗi khách hàng', t: 'Tạo cơ hội', d: 'Một lời giới thiệu đúng mở ra cánh cửa: một khách hàng, một đối tác, một nhân sự mới. Chúng tôi biến điều đó thành việc hằng ngày.' },
      { n: '2020', l: 'cùng khách hàng phát triển từ năm', t: 'Cùng phát triển', d: 'Khi doanh nghiệp lớn lên, không gian và hỗ trợ lớn theo — từ địa chỉ doanh nghiệp đến chỗ ngồi, văn phòng, nguyên sàn.' },
      { n: String(WORKSPACE_LOCATIONS.length), l: 'địa điểm giữa trung tâm Hà Nội', t: 'Đưa tới đúng nơi', d: 'Chúng tôi dẫn mỗi khách hàng tới đúng địa chỉ và đúng giải pháp, tại các địa điểm ở Hoàn Kiếm và Đống Đa.' },
    ],
    tod: { predawn: 'Rạng sáng', sunrise: 'Bình minh', daytime: 'Ban ngày', dusk: 'Chiều muộn', sunset: 'Hoàng hôn', night: 'Ban đêm' },
    todLabel: 'Thời điểm trong ngày',
    hint: 'Di chuột để khám phá · Nhấp để tạo tia sáng',
    hintTouch: 'Chạm để tạo tia sáng',
    pause: 'Tạm dừng chuyển động', play: 'Phát chuyển động',
  },
};

// Six skies in HiLink's palette (red #D12126, wine, warm stone), built like
// Stripe's: a radial glow rising from the bottom centre. `dark` skies switch
// the text to white. Line colours run from `bottom` to `top` up the canvas.
const SKIES: Record<Tod, { bg: string; dark: boolean; lines: Palette; Icon: typeof Sun }> = {
  predawn: {
    bg: 'radial-gradient(102.8% 104% at 50% 104%, rgb(255,190,178) 0%, rgb(200,64,72) 16%, rgb(120,34,38) 34%, rgb(74,28,27) 56%, rgb(58,24,23) 78%, rgb(54,23,22) 100%)',
    dark: true, Icon: MoonStar,
    lines: { top: rgb('#F7A8B4'), bottom: rgb('#FFE9E4'), stop: [0.2, 0.75], opacity: 0.9 },
  },
  sunrise: {
    bg: 'radial-gradient(102.7% 99% at 50% 104.6%, rgb(209,33,38) 0%, rgb(240,104,84) 14%, rgb(255,176,128) 28%, rgb(255,214,178) 38%, rgb(255,239,226) 50%, #fff 63%)',
    dark: false, Icon: Sunrise,
    lines: { top: rgb('#C8361F'), bottom: rgb('#FFFFFF'), stop: [0.22, 0.6], over: true },
  },
  daytime: {
    bg: 'radial-gradient(102.8% 105% at 50% 105%, rgb(150,20,28) 1.3%, rgb(209,33,38) 14%, rgb(232,104,104) 27%, rgb(245,180,178) 38%, rgb(251,232,231) 48%, rgb(255,255,255) 62%)',
    dark: false, Icon: Sun,
    lines: { top: rgb('#D12126'), bottom: rgb('#FFFFFF'), stop: [0.22, 0.6], over: true },
  },
  dusk: {
    bg: 'radial-gradient(102.8% 104% at 50% 104%, rgb(122,52,36) 0%, rgb(184,98,62) 15%, rgb(226,162,118) 29%, rgb(242,210,180) 42%, rgb(247,238,228) 55%, #F4F0EA 70%)',
    dark: false, Icon: SunDim,
    lines: { top: rgb('#9A4A2C'), bottom: rgb('#FFF4EA'), stop: [0.2, 0.62], over: true },
  },
  sunset: {
    bg: 'radial-gradient(102.8% 104% at 50% 104%, rgb(110,18,52) 0%, rgb(209,33,38) 14%, rgb(242,112,66) 28%, rgb(255,180,122) 40%, rgb(255,226,200) 52%, #FFF7F0 66%)',
    dark: false, Icon: Sunset,
    lines: { top: rgb('#C22A22'), bottom: rgb('#FFE8D8'), stop: [0.22, 0.62], over: true },
  },
  night: {
    bg: 'radial-gradient(102.8% 106.4% at 50% 106.4%, rgb(255,236,236) 1%, rgb(229,72,77) 20%, rgb(160,34,38) 38%, rgb(96,30,28) 56%, rgb(64,25,24) 76%, rgb(54,23,22) 100%)',
    dark: true, Icon: Moon,
    lines: { top: rgb('#FF9EA2'), bottom: rgb('#FFFFFF'), stop: [0.2, 0.7], opacity: 0.9 },
  },
};
const TODS = Object.keys(SKIES) as Tod[];

const DEFAULT_TOD: Tod = 'daytime';

const SCENE_MS = 7000;

export function LinkPhilosophy() {
  const { lang } = useLang();
  const t = T[lang];
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<LinkField | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<Scene>(0);
  const [tod, setTod] = useState<Tod>(DEFAULT_TOD);
  const [menu, setMenu] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [touch, setTouch] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the auto-advance timer
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sky = SKIES[tod];

  useEffect(() => {
    setTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Auto-advance through the four stats while playing and on screen.
  useEffect(() => {
    if (!playing || reduced || !inView) return undefined;
    const id = window.setTimeout(() => setScene((s) => ((s + 1) % 4) as Scene), SCENE_MS);
    return () => window.clearTimeout(id);
  }, [scene, playing, inView, reduced, cycle]);

  // The field: created once, driven by refs so React renders stay cheap.
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;
    let field: LinkField;
    try {
      field = new LinkField(canvas, SKIES[DEFAULT_TOD].lines, WORKSPACE_LOCATIONS.length);
    } catch {
      setWebgl(false);
      return undefined;
    }
    fieldRef.current = field;

    let raf = 0;
    let visible = false;
    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      field.frame(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !reduced) raf = requestAnimationFrame(loop); };
    const still = () => field.frame(performance.now(), true);

    const resize = () => {
      field.resize(wrap.clientWidth, wrap.clientHeight);
      if (reduced) still();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      setInView(visible);
      if (visible) start();
    }, { threshold: 0.05 });
    const ro = new ResizeObserver(resize);
    const onVis = () => { if (!document.hidden) start(); };
    const onMove = (e: PointerEvent) => field.pointer(e.clientX, e.clientY);
    const onLeave = () => field.leave();
    const onDown = (e: PointerEvent) => field.spark(e.clientX, e.clientY);
    io.observe(wrap);
    ro.observe(wrap);
    document.addEventListener('visibilitychange', onVis);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerdown', onDown);
    resize();
    if (reduced) still();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onDown);
      field.dispose();
      fieldRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    const f = fieldRef.current;
    if (!f) return;
    f.scene = scene;
    if (reduced) f.frame(performance.now(), true);
  }, [scene, reduced]);

  useEffect(() => {
    const f = fieldRef.current;
    if (!f) return;
    f.setPalette(sky.lines, reduced);
    if (reduced) f.frame(performance.now(), true);
  }, [sky, reduced]);

  // Close the menu on outside click or Escape.
  useEffect(() => {
    if (!menu) return undefined;
    const onDown = (e: PointerEvent) => { if (!menuRef.current?.contains(e.target as Node)) setMenu(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  }, [menu]);

  const choose = (i: Scene) => { setScene(i); setCycle((c) => c + 1); };

  const ink = sky.dark ? 'text-white' : 'text-[#2A2623]';
  const muted = sky.dark ? 'text-white/60' : 'text-[#6B645D]';
  const hair = sky.dark ? 'border-white/15' : 'border-[#2A2623]/12';
  const chip = sky.dark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white/70 hover:bg-white text-[#2A2623] shadow-[0_1px_6px_rgba(42,38,35,0.1)]';
  const active = t.stats[scene];

  return (
    <section className={`relative overflow-hidden bg-white transition-colors duration-[1200ms] ${ink}`} aria-labelledby="hl-link-title">
      {/* Skies, crossfading like Stripe's backgrounds. */}
      {TODS.map((k) => (
        <div
          key={k}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ backgroundImage: SKIES[k].bg, opacity: k === tod ? 1 : 0 }}
        />
      ))}

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className={`relative border-x ${hair} transition-colors duration-[1200ms]`}>
          {/* Controls, top right. */}
          <div className="absolute right-3 top-4 lg:right-5 lg:top-6 z-20 flex items-center gap-2" ref={menuRef}>
            {!reduced && webgl && (
              <button
                type="button"
                onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? t.pause : t.play}
                className={`grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-colors ${chip}`}
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
            )}
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menu}
              aria-label={`${t.todLabel}: ${t.tod[tod]}`}
              className={`grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-colors ${chip}`}
            >
              <sky.Icon size={16} />
            </button>
            {menu && (
              <div role="menu" aria-label={t.todLabel} className="absolute right-0 top-11 w-44 rounded-xl bg-white p-1.5 text-[#2A2623] shadow-[0_12px_40px_rgba(42,38,35,0.18)]">
                {TODS.map((k) => {
                  const Icon = SKIES[k].Icon;
                  return (
                    <button
                      key={k}
                      type="button"
                      role="menuitemradio"
                      aria-checked={k === tod}
                      onClick={() => { setTod(k); setMenu(false); }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${k === tod ? 'bg-[#F8F6F1] text-[#B01B20]' : 'hover:bg-[#F4F0EA]'}`}
                    >
                      <Icon size={15} /> {t.tod[k]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Heading. */}
          <div className="relative z-10 mx-auto max-w-3xl px-6 pt-20 lg:pt-28 text-center">
            <p className={`mb-6 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] ${sky.dark ? 'text-[#F06A6E]' : 'text-[#D12126]'}`}>
              <Flag /> {t.eyebrow}
            </p>
            <h2 id="hl-link-title" className="serif leading-[1.05]">{t.title}</h2>
            <p className={`mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed transition-colors duration-[1200ms] ${muted}`}>{t.lead}</p>
          </div>

          {/* The field. Purely visual: the same ideas are in the stats and caption. */}
          <div ref={wrapRef} className="relative mt-4 sm:mt-0 h-[340px] sm:h-[440px] lg:h-[540px] select-none" aria-hidden="true">
            <canvas ref={canvasRef} className="absolute inset-0 cursor-crosshair touch-pan-y" />
            {webgl && !reduced && (
              <p className={`pointer-events-none absolute top-0 left-5 right-5 lg:left-8 text-center sm:text-left text-[12px] uppercase tracking-[0.2em] transition-colors duration-[1200ms] ${muted}`}>
                {touch ? t.hintTouch : t.hint}
              </p>
            )}
          </div>

          {/* Stats and caption sit on a solid, lightly tinted panel over the
              glow — no blur, so the figures stay crisp. */}
          <div className={`relative transition-colors duration-[1200ms] ${sky.dark ? 'bg-[#2B1212]/75' : 'bg-white/85'}`}>
          {/* Stats: Stripe's framed row with a sliding indicator on both rules. */}
          <div role="tablist" aria-label={t.eyebrow} className={`relative grid grid-cols-2 lg:grid-cols-4 border-y ${hair} transition-colors duration-[1200ms]`}>
            {[-1, 'auto'].map((pos) => (
              <span
                key={String(pos)}
                aria-hidden="true"
                className="pointer-events-none absolute hidden lg:block h-px w-1/4 transition-[left] duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{
                  left: `${scene * 25}%`,
                  ...(pos === -1 ? { top: -1 } : { bottom: -1 }),
                  background: `linear-gradient(90deg, transparent, ${sky.dark ? '#F06A6E' : '#D12126'} 30%, ${sky.dark ? '#F06A6E' : '#D12126'} 70%, transparent)`,
                }}
              />
            ))}
            {t.stats.map((s, i) => {
              const on = scene === i;
              return (
                <button
                  key={s.t}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="hl-link-caption"
                  onClick={() => choose(i as Scene)}
                  className={`relative px-5 py-6 lg:px-8 lg:py-9 text-left transition-colors duration-300 ${i % 2 ? `border-l ${hair}` : ''} ${i > 1 ? `border-t lg:border-t-0 ${hair}` : ''} ${i === 2 ? 'lg:border-l' : ''}`}
                >
                  {/* Mobile: each cell carries its own line. */}
                  <span
                    aria-hidden="true"
                    className={`lg:hidden absolute left-0 right-0 top-[-1px] h-px origin-left transition-transform duration-[400ms] ${on ? 'scale-x-100' : 'scale-x-0'}`}
                    style={{ background: sky.dark ? '#F06A6E' : '#D12126' }}
                  />
                  <span
                    className={`block serif text-[2.25rem] lg:text-[3.25rem] leading-none tracking-tight ${on ? 'bg-clip-text text-transparent' : sky.dark ? 'text-[#B9958F]' : 'text-[#B3A79F]'}`}
                    style={on ? { backgroundImage: sky.dark ? 'linear-gradient(100deg, #FFE1D2, #FF8F7E 55%, #F2475A)' : 'linear-gradient(100deg, #F2475A, #D12126 55%, #8E1418)', WebkitBackgroundClip: 'text' } : undefined}
                  >
                    {s.n}
                  </span>
                  <span className={`mt-3 block text-[13px] lg:text-[14px] leading-snug ${on ? '' : sky.dark ? 'text-[#C8ACA7]' : 'text-[#857A72]'}`}>{s.l}</span>
                </button>
              );
            })}
          </div>

          {/* Caption for the chosen stat. */}
          <div id="hl-link-caption" role="tabpanel" aria-live="polite" className="mx-auto max-w-2xl px-6 py-12 lg:py-16 text-center">
            <p key={scene} className="text-[1.0625rem] leading-relaxed animate-[hl-fade-up_0.6s_ease_both]">
              <span className="font-semibold">{active.t}.</span>{' '}
              <span className={`transition-colors duration-[1200ms] ${muted}`}>{active.d}</span>
            </p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
