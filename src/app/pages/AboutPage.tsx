// About — HiLink's story told as a sequence of editorial sections rather than
// a stack of cards: the original full-screen hero and story; the ecosystem as
// one continuous "link" line looping through the five services (the loop in
// the HiLink logo); vision and mission as a split statement; the numbers band;
// values under drawn rules; the way we work along one line that fills as you
// read; a property mosaic; the group HiLink belongs to; partners; the team;
// and a compact contact band. Copy is the approved hilink.vn/about text.
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Shield, Layers, Target, Mail, MapPin, Calendar, ServiceIcon } from '../components/Glyph';
import { ABOUT } from '../data/aboutCopy';
import { CAREERS } from '../data/careersCopy';
import { COMPANY, CONTACT, PARTNERS, SERVICES, ws } from '../data/site';
import { LOCATIONS } from '../data/locations';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { ScaleWave } from '../components/ScaleWave';
import { Contours } from '../components/Contours';
import { photo } from '../lib/photo';
import { LOOP_PATH, LOOP_TIP } from '../lib/loop';

const T = {
  en: {
    est: 'Est. 2020 · Ha Noi, Vietnam', scroll: 'Scroll to discover',
    facts: [['2020', 'Year Founded'], ['Ha Noi', 'Headquarters'], [`${LOCATIONS.length} Locations`, 'HiLink Workspaces'], [`${PARTNERS.length} Partners`, 'Companies we work with']],
    storyAlt: 'A client at work in a private office at the HiLink Business Club',
    fig: 'Figure 1 · One relationship',
    workEyebrow: 'Selected work', workTitle: 'Properties we run',
    groupEyebrow: 'Our group', groupTitle: 'Part of HiCorp Group',
    groupBody: `${COMPANY.name.en} is a member company of HiCorp Group Joint Stock Company (Vietnam).`,
    groupLegal: 'Công ty Cổ phần Tập đoàn HiCorp (Việt Nam)',
    groupMember: 'Member company', groupParent: 'Parent company',
    partnersTitle: 'Trusted partners & affiliates', partnersSub: 'The companies HiLink works with every day.',
    teamPhotos: 'Photographs of the HiLink team and spaces',
    contactTitle: 'Contact us', labels: ['Office', 'Call or write', 'Consultation'],
    cards: [
      { t: 'Say hello', d: 'Questions, ideas or feedback — write to us any time.', cta: 'Email us' },
      { t: 'Visit us', d: '' , cta: 'Get directions' },
      { t: 'Book a consultation', d: 'Tell us what you need and an advisor will be in touch.', cta: 'Book now' },
    ],
    steps: 'Step', ecoList: 'What sits inside it', next: 'Next properties', prev: 'Previous properties',
  },
  vi: {
    est: 'Thành lập 2020 · Hà Nội, Việt Nam', scroll: 'Cuộn để khám phá',
    facts: [['2020', 'Năm thành lập'], ['Hà Nội', 'Trụ sở'], [`${LOCATIONS.length} địa điểm`, 'HiLink Workspaces'], [`${PARTNERS.length} đối tác`, 'Doanh nghiệp đồng hành']],
    storyAlt: 'Khách hàng làm việc trong văn phòng riêng tại HiLink Business Club',
    fig: 'Hình 1 · Một mối quan hệ',
    workEyebrow: 'Dự án tiêu biểu', workTitle: 'Bất động sản chúng tôi vận hành',
    groupEyebrow: 'Tập đoàn', groupTitle: 'Thành viên Tập đoàn HiCorp',
    groupBody: `${COMPANY.name.vi} là công ty thành viên của Công ty Cổ phần Tập đoàn HiCorp (Việt Nam).`,
    groupLegal: 'HiCorp Group Joint Stock Company (Vietnam)',
    groupMember: 'Công ty thành viên', groupParent: 'Công ty mẹ',
    partnersTitle: 'Đối tác & đơn vị đồng hành', partnersSub: 'Những doanh nghiệp HiLink làm việc cùng mỗi ngày.',
    teamPhotos: 'Ảnh đội ngũ và không gian HiLink',
    contactTitle: 'Liên hệ', labels: ['Văn phòng', 'Gọi hoặc viết cho chúng tôi', 'Tư vấn'],
    cards: [
      { t: 'Gửi lời chào', d: 'Câu hỏi, ý tưởng hay góp ý — hãy viết cho chúng tôi bất cứ lúc nào.', cta: 'Gửi email' },
      { t: 'Ghé thăm', d: '', cta: 'Chỉ đường' },
      { t: 'Đặt lịch tư vấn', d: 'Cho chúng tôi biết nhu cầu, một chuyên viên sẽ liên hệ với bạn.', cta: 'Đặt lịch' },
    ],
    steps: 'Bước', ecoList: 'Bên trong hệ sinh thái', next: 'Bất động sản tiếp theo', prev: 'Bất động sản trước',
  },
};

const TEAM_PHOTOS = ['/photos/hbc-team.webp', '/photos/hbc-host.webp', '/photos/f15-meeting-pod.webp', '/photos/hbc-client-meeting.webp', '/photos/hbc-reception.webp', '/photos/f15-boardroom.webp', '/photos/hbc-meeting.webp', '/photos/hbc-bar.webp', '/photos/f15-lounge-cabin.webp'];
const VALUE_ICONS = [Shield, Layers, Target];
const MAPS = 'https://maps.google.com/?q=60+Ly+Thai+To,+Hoan+Kiem,+Ha+Noi';

// One continuous line with five petals; between each pair of petals it curls
// into a small loop — a link — like the loop in the HiLink logo. Generated as
// x = R·cos t + ρ·cos 6t, y = R·sin t + ρ·sin 6t (R 160, ρ 48), turned so the
// first petal points up. Petal tips sit at t = 2πk/5, radius R + ρ.
const LOOP = LOOP_PATH;
const TIP = LOOP_TIP;

/** Figure: the five services on one linked line around HiLink. */
function LinkLoop({ label }: { label: string }) {
  const { lang, l } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <figure ref={ref} className={`hl-loop relative mx-auto aspect-square w-full max-w-[680px] ${on ? 'is-in' : ''}`}>
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(209,33,38,0.09),rgba(209,33,38,0))]" aria-hidden="true" />
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <filter id="hl-loop-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <circle cx="300" cy="300" r="96" fill="none" stroke="#D12126" strokeOpacity="0.18" strokeDasharray="1 7" className="hl-loop-ring" />
        <path d={LOOP} fill="none" stroke="#D12126" strokeOpacity="0.07" strokeWidth="12" />
        <path d={LOOP} pathLength={1} fill="none" stroke="#D12126" strokeWidth="1.6" className="hl-loop-draw" />
        <path d={LOOP} pathLength={1} fill="none" stroke="#FF6A6E" strokeWidth="5" strokeLinecap="round" filter="url(#hl-loop-glow)" className="hl-loop-run" />
        <path d={LOOP} pathLength={1} fill="none" stroke="#FF6A6E" strokeWidth="5" strokeLinecap="round" filter="url(#hl-loop-glow)" className="hl-loop-run" style={{ animationDelay: '-4.5s' }} />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24%]">
        <img src="/brand/logo-hilink-lockup.svg" alt="HiLink" className="w-full" />
      </div>
      {SERVICES.map((s, k) => {
        const a = -Math.PI / 2 + (k * 2 * Math.PI) / SERVICES.length;
        const x = 50 + (Math.cos(a) * TIP * 100) / 600;
        const y = 50 + (Math.sin(a) * TIP * 100) / 600;
        const below = Math.sin(a) > 0.2;
        return (
          <Link
            key={s.path}
            to={l(s.path)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {below && <span className="hidden sm:block order-2 mt-2 text-[12px] tabular-nums text-[#D12126]">{String(k + 1).padStart(2, '0')}</span>}
            <span className="relative grid h-14 w-14 place-items-center rounded-full border border-[#D12126]/25 bg-white text-[#D12126] transition-all duration-300 group-hover:scale-110 group-hover:border-[#D12126]">
              <ServiceIcon path={s.path} size={26} />
            </span>
            <span className={`hidden sm:block ${below ? 'order-3 mt-1' : 'order-first mb-2'} max-w-[9rem] text-[13px] leading-tight text-[#2A2623] transition-colors group-hover:text-[#D12126]`}>
              {!below && <span className="block text-[12px] tabular-nums text-[#D12126]">{String(k + 1).padStart(2, '0')}</span>}
              {s.t[lang]}
            </span>
          </Link>
        );
      })}
      <figcaption className="absolute bottom-0 right-0 hidden sm:block text-[12px] text-[#6B645D]">{label}</figcaption>
    </figure>
  );
}

type RailItem = { key: string; name: string; address: string; photo: string; to?: string; href?: string; crop?: string };

/** Properties we run: tall cards in a sideways rail with a progress bar. */
function PropertyRail({ eyebrow, title, next, prev }: { eyebrow: ReactNode; title: string; next: string; prev: string }) {
  const { lang, l } = useLang();
  const rail = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ size: 0.3, at: 0, start: true, end: false });
  const items: RailItem[] = [
    { key: 'qh', name: 'The Quarter House', address: lang === 'vi' ? 'Hoàn Kiếm, Hà Nội' : 'Hoan Kiem, Ha Noi', photo: '/properties/quarter-house/qh-07.webp', to: '/workspace/quarter-house', crop: 'object-[70%_50%]' },
    ...LOCATIONS.map((loc) => ({ key: loc.id, name: loc.name, address: loc.address, photo: loc.photo, href: `/locations/${loc.id}` })),
  ];

  useEffect(() => {
    const el = rail.current;
    if (!el) return undefined;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setBar({ size: Math.min(1, el.clientWidth / el.scrollWidth), at: max > 0 ? el.scrollLeft / max : 0, start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  const go = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.querySelector('a');
    if (el && card) el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: 'smooth' });
  };
  const button = 'absolute top-1/2 z-10 -translate-y-1/2 grid h-14 w-14 place-items-center rounded-full bg-[#D12126] text-white shadow-[0_6px_20px_rgba(209,33,38,0.3)] transition-all hover:bg-[#A3181C] disabled:pointer-events-none disabled:opacity-0';

  return (
    <section className="bg-[#F4F0EA] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {eyebrow}
        <h2 className="serif leading-[1.1]">{title}</h2>
        <div className="relative mt-10 lg:mt-12">
          <div ref={rail} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((it) => {
              const inner = (
                <>
                  <img loading="lazy" decoding="async" {...photo(it.photo, '(min-width: 1024px) 26vw, 78vw')} alt={it.name} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05] ${it.crop ?? ''}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-white">
                    <p className="text-[1.6rem] lg:text-[1.85rem] font-light leading-tight tracking-[-0.01em]">{it.name}</p>
                    <p className="mt-3 font-mono text-[12px] uppercase leading-relaxed tracking-[0.06em] text-white/85">{it.address}</p>
                  </div>
                </>
              );
              const cls = 'group relative block shrink-0 snap-start overflow-hidden rounded-[6px] bg-[#2A2623] w-[78vw] sm:w-[340px] lg:w-[min(26vw,440px)] aspect-[11/16]';
              return it.to
                ? <Link key={it.key} to={l(it.to)} className={cls}>{inner}</Link>
                : <a key={it.key} href={ws(lang, it.href)} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
            })}
          </div>
          <button type="button" onClick={() => go(-1)} disabled={bar.start} aria-label={prev} className={`${button} -left-3 lg:-left-6`}><ArrowRight size={20} className="rotate-180" /></button>
          <button type="button" onClick={() => go(1)} disabled={bar.end} aria-label={next} className={`${button} -right-3 lg:-right-6`}><ArrowRight size={20} /></button>
        </div>
        <div className="relative mt-8 h-[3px] rounded-full bg-[#2A2623]/12" aria-hidden="true">
          <div className="absolute inset-y-0 rounded-full bg-[#2A2623] transition-[left] duration-150" style={{ width: `${bar.size * 100}%`, left: `${bar.at * (1 - bar.size) * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  const a = ABOUT[lang];
  const c = CAREERS[lang];
  usePageMeta(lang === 'vi' ? 'Về HiLink' : 'About HiLink', a.heroBody);
  const eyebrow = (text: string, dark = false) => (
    <p className={`mb-5 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] ${dark ? 'text-[#FF9A8B]' : 'text-[#D12126]'}`}><Flag /> {text}</p>
  );
  const cols = [TEAM_PHOTOS.slice(0, 3), TEAM_PHOTOS.slice(3, 6), TEAM_PHOTOS.slice(6, 9)];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen bg-[#2A2623] flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <img
            {...photo('/photos/f15-lounge-wide-xl.webp')}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-12">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#F06A6E] mb-8">
            {t.est}
          </p>
          <h1
            className="serif text-white max-w-5xl leading-[1.05]"
            style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontWeight: 300 }}
          >
            {a.heroTitle}
          </h1>
        </div>
        <div className="relative pb-12 flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-white/20" />
          <p className="text-[12px] uppercase tracking-[0.2em] text-white/40">{t.scroll}</p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left — image */}
            <div className="lg:w-[35%]">
              <div className="lg:sticky lg:top-32">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img loading="lazy" decoding="async"
                    {...photo('/photos/hbc-desk.webp')}
                    alt={t.storyAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D12126]" />
                </div>
              </div>
            </div>

            <div className="lg:w-[65%]">
              <div className="space-y-7 text-[17px] text-[#444] leading-[1.85] mb-16">
                <p>{a.heroLead}</p>
                <p>{a.heroBody}</p>
                <p>{a.solveBody}</p>
              </div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                {t.facts.map(([value, label]) => (
                  <div key={label} className="border-t pt-5" style={{ borderColor: 'rgba(209,33,38,0.3)' }}>
                    <div className="serif text-2xl text-[#D12126] mb-2">{value}</div>
                    <div className="text-[12px] uppercase tracking-wider text-[#6B645D]">{label}</div>
                  </div>
                ))}
              </div>
              {/* The pull-quote closes the story, under the figures. */}
              <div className="mt-16">
                <blockquote
                  className="serif italic text-[#D12126] leading-snug"
                  style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)' }}
                >
                  "{a.solveTitle}"
                </blockquote>
                <div className="mt-6 w-8 h-px bg-[#D12126]/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem: one linked line through the five services. */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-4">
            {eyebrow(a.ecoEyebrow)}
            <h2 className="serif leading-[1.1]">{a.oneRel}</h2>
            <p className="mt-5 text-[17px] leading-[1.75] text-[#6B645D]">{a.ecoTitle}</p>
            <p className="mt-10 text-[12px] uppercase tracking-[0.2em] text-[#6B645D]">{t.ecoList}</p>
            <ul className="mt-3 border-t border-[#2A2623]/10">
              {a.eco.map((e) => (
                <li key={e.t} className="border-b border-[#2A2623]/10 py-4">
                  <p className="text-[15px] font-medium text-[#2A2623]">{e.t}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#6B645D]">{e.d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] leading-relaxed text-[#6B645D]">{a.ecoClose}</p>
          </div>
          <div className="lg:col-span-8">
            <LinkLoop label={t.fig} />
            <ol className="mt-6 grid grid-cols-1 gap-2 sm:hidden">
              {SERVICES.map((sv, k) => (
                <li key={sv.path}>
                  <Link to={l(sv.path)} className="flex items-center gap-3 border-b border-[#2A2623]/10 py-2.5 text-[15px] text-[#2A2623]">
                    <span className="text-[12px] tabular-nums text-[#D12126]">{String(k + 1).padStart(2, '0')}</span>
                    <span className="text-[#D12126]"><ServiceIcon path={sv.path} size={22} /></span>
                    {sv.t[lang]}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Vision and mission: one split statement. */}
      <section className="bg-[#F4F0EA] py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 md:divide-x divide-[#2A2623]/12">
          {[[a.visionLbl, a.vision], [a.missionLbl, a.mission]].map(([lbl, text], i) => (
            <div key={lbl} className={`${i ? 'md:pl-14 lg:pl-20 mt-14 md:mt-0' : 'md:pr-14 lg:pr-20'}`}>
              <p className="flex items-baseline gap-4 text-[12px] uppercase tracking-[0.2em] text-[#D12126]">
                <span className="serif text-[2.5rem] leading-none tracking-normal text-[#D12126]/25">{String(i + 1).padStart(2, '0')}</span>
                {lbl}
              </p>
              <p className="serif mt-8 text-[1.55rem] lg:text-[2.05rem] leading-[1.3] text-[#2A2623]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HiLink in numbers. */}
      <ScaleWave />

      {/* Values: three columns under drawn rules. */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-6">
              {eyebrow(a.diffEyebrow)}
              <h2 className="serif leading-[1.1]">{a.diffTitle}</h2>
            </div>
            <p className="lg:col-span-5 lg:col-start-8 text-[17px] leading-relaxed text-[#6B645D]">{a.diffLead}</p>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
            {a.diffs.map(({ t: title, d }, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div key={title} className="hl-rule relative pt-8">
                  <div className="flex items-start justify-between">
                    <span className="serif text-[3.5rem] leading-none text-[#2A2623]/[0.08]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[#D12126]"><Icon size={30} /></span>
                  </div>
                  <h3 className="serif mt-6 text-[#2A2623]">{title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6B645D]">{d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we work: one line that fills as you read, ending in the outcome. */}
      <section className="bg-[#F4F0EA] py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-6">
              {eyebrow(a.howEyebrow)}
              <h2 className="serif leading-[1.1]">{a.howTitle}</h2>
            </div>
            <p className="lg:col-span-5 lg:col-start-8 text-[17px] leading-relaxed text-[#6B645D]">{a.howBody}</p>
          </div>
          <div className="relative mt-16 lg:mt-20">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#2A2623]/15 lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto" aria-hidden="true" />
            <div data-scroll-progress className="absolute left-[7px] top-0 bottom-0 w-px origin-top bg-[#D12126] lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-[2px] lg:w-auto lg:origin-left" aria-hidden="true" />
            <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-8">
              {a.stages.map(({ t: title, s }, i) => (
                <li key={title} className="relative pl-10 lg:pl-0">
                  <span className="absolute left-0 lg:static grid h-[15px] w-[15px] place-items-center rounded-full border border-[#D12126] bg-[#F4F0EA]" aria-hidden="true">
                    <span className="h-[5px] w-[5px] rounded-full bg-[#D12126]" />
                  </span>
                  <p className="lg:mt-8 text-[12px] uppercase tracking-[0.2em] text-[#6B645D]">{t.steps} {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="serif mt-2 text-[#2A2623]">{title}</h3>
                  <p className="mt-1 text-[15px] text-[#6B645D]">{s}</p>
                </li>
              ))}
              <li className="relative pl-10 lg:pl-0">
                <span className="absolute left-0 lg:static block h-[15px] w-[15px] rounded-full bg-[#D12126]" aria-hidden="true" />
                <p className="lg:mt-8 text-[12px] uppercase tracking-[0.2em] text-[#D12126]">→</p>
                <p className="serif mt-2 text-[1.45rem] leading-snug text-[#D12126]">{a.performs}</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Properties we run: a row of tall cards that scrolls sideways, after foraspace.com. */}
      <PropertyRail eyebrow={eyebrow(t.workEyebrow)} title={t.workTitle} next={t.next} prev={t.prev} />

      {/* The group: statement on the left, the line from parent to member on the right. */}
      <section id="group" className="bg-white border-t border-[#2A2623]/10 py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            {eyebrow(t.groupEyebrow)}
            <h2 className="serif leading-[1.1]">{t.groupTitle}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-[#6B645D]">{t.groupBody}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-[#2A2623]/12 p-7 lg:p-9 flex items-center gap-6">
              <img src="/partners/hicorp.webp" alt="HiCorp" className="h-12 w-auto shrink-0" />
              <div>
                <p className="text-[12px] uppercase tracking-[0.2em] text-[#6B645D]">{t.groupParent}</p>
                <p className="mt-1 text-[16px] text-[#2A2623]">{t.groupLegal}</p>
              </div>
            </div>
            <div className="relative ml-12 h-16 w-px bg-[#D12126]" aria-hidden="true">
              <span className="absolute -left-[3px] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[#D12126]" />
            </div>
            <div className="border border-[#D12126]/40 bg-[#FBECEC]/50 p-7 lg:p-9 flex items-center gap-6">
              <img src="/brand/logo-hilink-lockup.svg" alt="HiLink" className="h-12 w-auto shrink-0" />
              <div>
                <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126]">{t.groupMember}</p>
                <p className="mt-1 text-[16px] text-[#2A2623]">{COMPANY.name[lang]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners. */}
      <section className="bg-[#F4F0EA] py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="serif leading-[1.1]">{t.partnersTitle}</h2>
          <p className="text-[16px] text-[#6B645D]">{t.partnersSub}</p>
        </div>
        <PartnerMarquee className="mt-8 max-w-[1600px] mx-auto" />
      </section>

      {/* The team: three columns of photographs drifting in opposite directions. */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-4">
            {eyebrow(c.aboutE)}
            <h2 className="serif leading-[1.1]">{c.aboutT}</h2>
            <p className="mt-5 text-[17px] leading-[1.75] text-[#6B645D]">{c.about1}</p>
            <Link to={l('/careers')} className="mt-8 inline-flex items-center gap-2 border-b border-[#2A2623]/40 pb-1 text-[13px] uppercase tracking-[0.18em] text-[#2A2623] hover:border-[#D12126] hover:text-[#D12126] transition-colors">
              {c.join} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="lg:col-span-8 relative h-[440px] lg:h-[560px] overflow-hidden" aria-label={t.teamPhotos} role="img">
            <div className="grid h-full grid-cols-3 gap-3">
              {cols.map((col, k) => (
                <div key={k} className="relative overflow-hidden">
                  <div className={`hl-photo-column ${k === 1 ? 'hl-photo-column--down' : ''} flex flex-col gap-3`} style={{ animationDuration: `${36 + k * 8}s` }}>
                    {[...col, ...col].map((src, i) => (
                      <img key={i} loading="lazy" decoding="async" {...photo(src, '260px')} alt="" className={`w-full object-cover ${(i + k) % 2 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </section>

      {/* Contact: a compact dark band, three centred columns. */}
      <section className="relative overflow-hidden bg-[#361716] py-14 lg:py-16 text-white">
        <Contours />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[#F2B8A8]"><MapPin size={28} strokeWidth={1} /></span>
              <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-white/60">{t.labels[0]}</p>
              <p className="mt-2 max-w-[17rem] text-[15px] leading-relaxed">{CONTACT.address[lang]}</p>
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-[#F2B8A8] hover:text-white transition-colors">{t.cards[1].cta} <ArrowUpRight size={13} /></a>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#F2B8A8]"><Mail size={28} strokeWidth={1} /></span>
              <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-white/60">{t.labels[1]}</p>
              <p className="mt-2 text-[15px] leading-relaxed">
                <a href={CONTACT.phoneHref} className="hover:text-[#F2B8A8] transition-colors">{CONTACT.phone}</a><br />
                <a href={CONTACT.emailHref} className="hover:text-[#F2B8A8] transition-colors">{CONTACT.email}</a>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#F2B8A8]"><Calendar size={28} strokeWidth={1} /></span>
              <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-white/60">{t.labels[2]}</p>
              <p className="mt-2 max-w-[17rem] text-[15px] leading-relaxed">{t.cards[2].d}</p>
              <Link to={l('/book-consultation')} className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-[#F2B8A8] hover:text-white transition-colors">{t.cards[2].t} <ArrowRight size={13} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
