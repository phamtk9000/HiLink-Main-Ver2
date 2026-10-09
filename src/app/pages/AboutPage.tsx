// About — laid out after mercury.com/about: a narrow, airy column; a large
// centred statement over a framed photograph; story and figure in offset
// pairs; soft rounded cards; the numbers band; the group HiLink belongs to;
// the team; and contact cards in place of a closing banner. Copy is the
// approved hilink.vn/about text (data/aboutCopy.ts); photos are HiLink's own.
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Shield, Layers, Target, Mail, MapPin, Calendar, ServiceIcon } from '../components/Glyph';
import { ABOUT } from '../data/aboutCopy';
import { CAREERS } from '../data/careersCopy';
import { COMPANY, CONTACT, PARTNERS, SERVICES, ws } from '../data/site';
import { LOCATIONS } from '../data/locations';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { ScaleWave } from '../components/ScaleWave';
import { Contours } from '../components/Contours';
import { photo } from '../lib/photo';

const T = {
  en: {
    est: 'Est. 2020 · Ha Noi, Vietnam', scroll: 'Scroll to discover',
    facts: [['2020', 'Year Founded'], ['Ha Noi', 'Headquarters'], [`${LOCATIONS.length} Locations`, 'HiLink Workspaces'], [`${PARTNERS.length} Partners`, 'Companies we work with']],
    storyAlt: 'A client at work in a private office at the HiLink Business Club',
    fig: 'Figure 1 · One relationship',
    workEyebrow: 'Selected work', workTitle: 'Properties we run', view: 'View',
    work: [
      { name: 'The Quarter House', location: 'Hoan Kiem, Hanoi', tag: 'Boutique townhouse', image: '/properties/quarter-house/qh-07.webp', to: '/workspace/quarter-house' },
      { name: 'Floor 19 · 4 Ton That Tung', location: 'Dong Da, Hanoi', tag: 'Private floor', image: '/photos/f19-window.webp', href: '/locations/ttt-f19' },
      { name: 'HiLink Business Club', location: 'Hoan Kiem, Hanoi', tag: "Members' club", image: '/photos/hbc-lounge.webp', href: '/locations/obc' },
    ],
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
    pause: 'Pause photos', play: 'Play photos',
  },
  vi: {
    est: 'Thành lập 2020 · Hà Nội, Việt Nam', scroll: 'Cuộn để khám phá',
    facts: [['2020', 'Năm thành lập'], ['Hà Nội', 'Trụ sở'], [`${LOCATIONS.length} địa điểm`, 'HiLink Workspaces'], [`${PARTNERS.length} đối tác`, 'Doanh nghiệp đồng hành']],
    storyAlt: 'Khách hàng làm việc trong văn phòng riêng tại HiLink Business Club',
    fig: 'Hình 1 · Một mối quan hệ',
    workEyebrow: 'Dự án tiêu biểu', workTitle: 'Bất động sản chúng tôi vận hành', view: 'Xem',
    work: [
      { name: 'The Quarter House', location: 'Hoàn Kiếm, Hà Nội', tag: 'Nhà phố boutique', image: '/properties/quarter-house/qh-07.webp', to: '/workspace/quarter-house' },
      { name: 'Tầng 19 · 4 Tôn Thất Tùng', location: 'Đống Đa, Hà Nội', tag: 'Sàn riêng', image: '/photos/f19-window.webp', href: '/locations/ttt-f19' },
      { name: 'HiLink Business Club', location: 'Hoàn Kiếm, Hà Nội', tag: 'Câu lạc bộ thành viên', image: '/photos/hbc-lounge.webp', href: '/locations/obc' },
    ],
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
    pause: 'Tạm dừng ảnh', play: 'Phát ảnh',
  },
};

const TEAM_PHOTOS = ['/photos/hbc-team.webp', '/photos/hbc-host.webp', '/photos/f15-meeting-pod.webp', '/photos/hbc-client-meeting.webp', '/photos/hbc-reception.webp', '/photos/f15-boardroom.webp'];
const VALUE_ICONS = [Shield, Layers, Target];
const MAPS = 'https://maps.google.com/?q=60+Ly+Thai+To,+Hoan+Kiem,+Ha+Noi';

/** Figure 1: the five services in orbit around one relationship. */
function EcosystemFigure({ label }: { label: string }) {
  const { lang, l } = useLang();
  const R = 118;
  return (
    <figure className="relative aspect-square w-full rounded-[28px] overflow-hidden bg-[radial-gradient(120%_90%_at_50%_100%,#F6D3D0_0%,#FBECEC_38%,#F7F2EC_75%)]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g className="hl-orbit" fill="none" stroke="#D12126" strokeOpacity="0.28">
          <circle cx="200" cy="200" r={R} strokeDasharray="2 6" />
          <circle cx="200" cy="200" r="168" strokeOpacity="0.12" />
          {SERVICES.map((_, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / SERVICES.length;
            return <circle key={i} cx={200 + Math.cos(a) * R} cy={200 + Math.sin(a) * R} r="62" strokeOpacity="0.2" />;
          })}
        </g>
        <circle cx="200" cy="200" r="44" fill="#fff" stroke="#D12126" strokeOpacity="0.5" />
        <circle className="hl-pulse" cx="200" cy="200" r="44" fill="none" stroke="#D12126" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="serif text-[15px] text-[#2A2623]">HiLink</span>
      </div>
      {SERVICES.map((s, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / SERVICES.length;
        const x = 50 + (Math.cos(a) * R * 100) / 400;
        const y = 50 + (Math.sin(a) * R * 100) / 400;
        return (
          <Link
            key={s.path}
            to={l(s.path)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 text-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#D12126] shadow-[0_2px_10px_rgba(209,33,38,0.12)] transition-transform group-hover:scale-110">
              <ServiceIcon path={s.path} size={22} />
            </span>
            <span className="max-w-[7.5rem] text-[12px] leading-tight text-[#2A2623] group-hover:text-[#D12126]">{s.t[lang]}</span>
          </Link>
        );
      })}
      <figcaption className="absolute bottom-4 right-5 text-[12px] text-[#6B645D]">{label}</figcaption>
    </figure>
  );
}

export function AboutPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  const a = ABOUT[lang];
  const c = CAREERS[lang];
  usePageMeta(lang === 'vi' ? 'Về HiLink' : 'About HiLink', a.heroBody);

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
            {/* Left — image + pull-quote */}
            <div className="lg:w-[35%]">
              <div className="lg:sticky lg:top-32 space-y-8">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img loading="lazy" decoding="async"
                    {...photo('/photos/hbc-desk.webp')}
                    alt={t.storyAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D12126]" />
                </div>
                <div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem: the five services around one relationship. */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <p className="mb-5 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#D12126]"><Flag /> {a.ecoEyebrow}</p>
              <h2 className="serif leading-[1.1]">{a.oneRel}</h2>
              <p className="mt-5 text-[17px] leading-[1.75] text-[#6B645D]">{a.ecoTitle}</p>
              <p className="mt-4 text-[17px] leading-[1.75] text-[#6B645D]">{a.ecoClose}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
              <EcosystemFigure label={t.fig} />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & mission: two soft cards. */}
      <section className="bg-white pb-20 lg:pb-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-5">
          {[[a.visionLbl, a.vision], [a.missionLbl, a.mission]].map(([lbl, text]) => (
            <div key={lbl} className="rounded-[20px] bg-[#F4F0EA] p-8 lg:p-10">
              <p className="mb-5 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#D12126]"><Flag /> {lbl}</p>
              <p className="serif text-[1.6rem] lg:text-[1.85rem] leading-snug text-[#2A2623]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HiLink in numbers. */}
      <ScaleWave />

      {/* Values. */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <p className="mb-5 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#D12126]"><Flag /> {a.diffEyebrow}</p>
            <h2 className="serif mx-auto max-w-3xl leading-[1.1]">{a.diffTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-[#6B645D]">{a.diffLead}</p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {a.diffs.map(({ t: title, d }, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div key={title} className="group rounded-[20px] bg-[#F4F0EA] p-8 transition-colors hover:bg-[#FBECEC]">
                  <div className="flex items-center justify-between text-[#D12126]">
                    <Icon size={30} />
                    <span className="text-[12px] tabular-nums text-[#6B645D]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="serif mt-10 text-[1.6rem] text-[#2A2623]">{title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6B645D]">{d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we work: four stages on one line. */}
      <section className="bg-[#F4F0EA] py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <p className="mb-5 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#D12126]"><Flag /> {a.howEyebrow}</p>
            <h2 className="serif mx-auto max-w-3xl leading-[1.1]">{a.howTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-[#6B645D]">{a.howBody}</p>
          </div>
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-[22px] hidden lg:block h-px bg-[#D12126]/25" aria-hidden="true" />
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {a.stages.map(({ t: title, s }, i) => (
                <li key={title} className="relative rounded-[20px] bg-white p-7">
                  <span className="relative z-10 -mt-[3px] grid h-[18px] w-[18px] place-items-center rounded-full border border-[#D12126] bg-white" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-[#D12126]" />
                  </span>
                  <p className="mt-6 text-[12px] tabular-nums text-[#D12126]">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="serif mt-1 text-[1.5rem] text-[#2A2623]">{title}</h3>
                  <p className="text-[15px] text-[#6B645D]">{s}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#D12126] px-5 py-2 text-[14px] text-white">{a.performs} <ArrowRight size={14} /></span>
            </p>
          </div>
        </div>
      </section>

      {/* Properties we run: cards like Mercury's news cards. */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <p className="mb-5 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#D12126]"><Flag /> {t.workEyebrow}</p>
            <h2 className="serif leading-[1.1]">{t.workTitle}</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {t.work.map(({ name, location, tag, image, to, href }) => {
              const inner = (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img loading="lazy" decoding="async" {...photo(image, '(min-width: 768px) 360px, 100vw')} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[12px] text-[#2A2623]">{tag}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="serif text-[1.45rem] text-[#2A2623]">{name}</h3>
                    <p className="mt-1 text-[14px] text-[#6B645D]">{location}</p>
                    <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[13px] text-[#2A2623] transition-colors group-hover:bg-[#D12126] group-hover:text-white">
                      {t.view} <ArrowUpRight size={14} />
                    </span>
                  </div>
                </>
              );
              const cls = 'group flex flex-col overflow-hidden rounded-[20px] bg-[#F4F0EA]';
              return to
                ? <Link key={name} to={l(to)} className={cls}>{inner}</Link>
                : <a key={name} href={ws(lang, href)} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
            })}
          </div>
        </div>
      </section>

      {/* The group HiLink belongs to. */}
      <section id="group" className="bg-white pb-20 lg:pb-28 scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-5 rounded-[20px] bg-[#F4F0EA] p-8 lg:p-10 flex flex-col justify-between gap-10">
              <div>
                <p className="text-[12px] uppercase tracking-[0.2em] text-[#6B645D]">{t.groupParent}</p>
                <img src="/partners/hicorp.webp" alt="HiCorp" className="mt-6 h-14 w-auto" />
                <p className="mt-6 serif text-[1.35rem] leading-snug text-[#2A2623]">{t.groupLegal}</p>
              </div>
              <div className="flex items-center gap-4 border-t border-[#2A2623]/10 pt-6">
                <img src="/brand/logo-hilink-lockup.svg" alt="HiLink" className="h-10 w-auto" />
                <div>
                  <p className="text-[12px] uppercase tracking-[0.2em] text-[#6B645D]">{t.groupMember}</p>
                  <p className="text-[14px] text-[#2A2623]">{COMPANY.name[lang]}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 rounded-[20px] bg-[#361716] p-8 lg:p-12 text-white flex flex-col justify-center">
              <p className="mb-5 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#FF9A8B]"><Flag /> {t.groupEyebrow}</p>
              <h2 className="serif leading-[1.1]">{t.groupTitle}</h2>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">{t.groupBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners. */}
      <section className="bg-[#F4F0EA] py-20 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="serif leading-[1.1]">{t.partnersTitle}</h2>
          <p className="mt-4 text-[16px] text-[#6B645D]">{t.partnersSub}</p>
        </div>
        <PartnerMarquee className="mt-8 max-w-[1600px] mx-auto" />
      </section>

      {/* The team: a column of photographs drifting upwards. */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <h2 className="serif mx-auto max-w-3xl text-center leading-[1.1]">{c.aboutT}</h2>
          <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative h-[420px] lg:h-[520px] overflow-hidden rounded-[20px] bg-[#F4F0EA]" aria-label={t.teamPhotos} role="img">
              <div className="hl-photo-column absolute inset-x-0 top-0 grid grid-cols-2 gap-3 p-3">
                {[...TEAM_PHOTOS, ...TEAM_PHOTOS].map((src, i) => (
                  <img key={i} loading="lazy" decoding="async" {...photo(src, '280px')} alt="" className={`w-full rounded-[14px] object-cover ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'} ${i % 2 ? 'translate-y-10' : ''}`} />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F4F0EA] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F4F0EA] to-transparent" />
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <h3 className="text-[1.375rem] font-medium leading-snug text-[#2A2623]">{c.heroTitle}</h3>
              <p className="mt-4 text-[16px] leading-[1.75] text-[#6B645D]">{c.about1}</p>
              <Link to={l('/careers')} className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-[#F4F0EA] px-5 py-2 text-[14px] text-[#2A2623] hover:bg-[#D12126] hover:text-white transition-colors">
                {c.join} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact: its own dark band, three centred columns. */}
      <section className="relative overflow-hidden bg-[#361716] py-20 lg:py-28 text-white">
        <Contours />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <h2 className="serif leading-[1.1]">{t.contactTitle}</h2>
            <p className="mt-4 text-[16px] text-white/70">{a.helpSub}</p>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-14 md:gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[#F2B8A8]"><MapPin size={40} strokeWidth={1} /></span>
              <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/60">{t.labels[0]}</p>
              <p className="mt-4 max-w-[18rem] text-[16px] leading-relaxed">{CONTACT.address[lang]}</p>
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border border-[#F2B8A8]/50 px-7 py-3 text-[14px] text-white hover:bg-white hover:text-[#361716] transition-colors">{t.cards[1].cta} <ArrowUpRight size={14} /></a>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#F2B8A8]"><Mail size={40} strokeWidth={1} /></span>
              <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/60">{t.labels[1]}</p>
              <p className="mt-4 text-[16px] leading-relaxed">
                <a href={CONTACT.phoneHref} className="hover:text-[#F2B8A8] transition-colors">{CONTACT.phone}</a><br />
                <a href={CONTACT.emailHref} className="hover:text-[#F2B8A8] transition-colors">{CONTACT.email}</a>
              </p>
              <p className="mt-2 text-[14px] text-white/55">{t.cards[0].d}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#F2B8A8]"><Calendar size={40} strokeWidth={1} /></span>
              <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/60">{t.labels[2]}</p>
              <p className="mt-4 max-w-[18rem] text-[16px] leading-relaxed">{t.cards[2].d}</p>
              <Link to={l('/book-consultation')} className="mt-7 inline-flex items-center gap-2 border border-[#F2B8A8]/50 px-7 py-3 text-[14px] text-white hover:bg-white hover:text-[#361716] transition-colors">{t.cards[2].t} <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
