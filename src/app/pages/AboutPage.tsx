// About — HiLink's story as a sequence of editorial sections: the original
// full-screen hero; the story and the ecosystem laid out after
// foraspace.com/about-fora (text beside a photograph rising over a pale band,
// then staggered photo cards); a word from the leadership in Club green; the
// vision; the numbers band; values under drawn rules; the way we work along
// one line; the shared place rail; the group HiLink belongs to; partners; the
// team; and a compact contact band. Copy is the approved hilink.vn/about text.
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Shield, Layers, Target, Mail, MapPin, Calendar } from '../components/Glyph';
import { ABOUT } from '../data/aboutCopy';
import { CAREERS } from '../data/careersCopy';
import { BUSINESS_CLUB_SITE, COMPANY, CONTACT, PARTNERS } from '../data/site';
import { LOCATIONS } from '../data/locations';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { ScaleWave } from '../components/ScaleWave';
import { Contours } from '../components/Contours';
import { photo } from '../lib/photo';
import { LOOP_PATH } from '../lib/loop';
import { PlaceRail, type Place } from '../components/PlaceRail';

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
    steps: 'Step', leaders: 'HiLink leadership', leadersRole: 'Our mission', quoteAlt: 'The lounge at the HiLink Business Club', next: 'Next properties', prev: 'Previous properties',
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
    steps: 'Bước', leaders: 'Ban lãnh đạo HiLink', leadersRole: 'Sứ mệnh', quoteAlt: 'Lounge tại HiLink Business Club', next: 'Bất động sản tiếp theo', prev: 'Bất động sản trước',
  },
};

const TEAM_PHOTOS = ['/photos/hbc-team.webp', '/photos/hbc-host.webp', '/photos/f15-meeting-pod.webp', '/photos/hbc-client-meeting.webp', '/photos/hbc-reception.webp', '/photos/f15-boardroom.webp', '/photos/hbc-meeting.webp', '/photos/hbc-bar.webp', '/photos/f15-lounge-cabin.webp'];
const VALUE_ICONS = [Shield, Layers, Target];
const MAPS = 'https://maps.google.com/?q=60+Ly+Thai+To,+Hoan+Kiem,+Ha+Noi';
// The ecosystem cards (approved copy, data/aboutCopy.ts "eco"): photo, link,
// and the stagger of each column on wide screens.
const ECO_PHOTOS = ['/photos/f19-window.webp', '/photos/f15-lounge.webp', '/photos/hbc-client-meeting.webp', '/photos/hbc-lounge.webp'];
const ECO_LINKS = ['/property-management', '/workspace-leasing', '/business-services', ''];
const ECO_OFFSETS = ['lg:mt-16', 'lg:mt-36', '', 'lg:mt-24'];

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
  const places: Place[] = [
    { key: 'qh', name: 'The Quarter House', address: lang === 'vi' ? 'Hoàn Kiếm, Hà Nội' : 'Hoan Kiem, Ha Noi', photo: '/properties/quarter-house/qh-07.webp', to: '/workspace/quarter-house', crop: 'object-[70%_50%]' },
    ...LOCATIONS.map((loc) => ({ key: loc.id, name: loc.name, address: loc.address, photo: loc.photo, href: `/locations/${loc.id}` })),
  ];

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

      {/* Story, after foraspace.com/about-fora ("A new world of work"): the
          text on the left, the photograph on the right rising over the top
          edge of a pale band. */}
      <section className="relative bg-white pt-16 lg:pt-24">
        <div className="absolute inset-x-0 bottom-0 top-[180px] lg:top-[260px] bg-[#FBECEC]" aria-hidden="true" />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 pb-20 lg:pb-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1 lg:pt-[300px]">
            <h2 className="serif hl-display text-[#2A2623]">{a.whoTitle}</h2>
            <div className="mt-8 space-y-5 text-[15px] leading-[1.75] text-[#4A443F]">
              <p>{a.heroLead}</p>
              <p>{a.heroBody}</p>
              <p>{a.solveBody}</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {t.facts.map(([value, label]) => (
                <div key={label} className="border-t border-[#D12126]/25 pt-4">
                  <div className="serif text-[1.45rem] text-[#D12126]">{value}</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.14em] text-[#6B645D]">{label}</div>
                </div>
              ))}
            </div>
            <blockquote className="serif mt-12 italic leading-snug text-[#D12126]" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)' }}>
              "{a.solveTitle}"
            </blockquote>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
            <div className="relative aspect-square overflow-hidden rounded-[8px] bg-[#2A2623]">
              <img loading="lazy" decoding="async" {...photo('/photos/hbc-desk.webp', '(min-width: 1024px) 46vw, 100vw')} alt={t.storyAlt} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem, after the staggered cards on foraspace.com/about-fora. */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-6">
              {eyebrow(a.ecoEyebrow)}
              <h2 className="serif hl-display text-[#2A2623]">{a.oneRel}</h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 text-[15px] leading-[1.75] text-[#4A443F] space-y-4">
              <p>{a.ecoTitle}</p>
              <p>{a.ecoClose}</p>
            </div>
          </div>
          <div className="mt-16 lg:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {a.eco.map((e, k) => {
              const inner = (
                <>
                  <div className="relative aspect-[363/460] overflow-hidden rounded-[8px] bg-[#2A2623]">
                    <img loading="lazy" decoding="async" {...photo(ECO_PHOTOS[k], '(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw')} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]" />
                  </div>
                  <h3 className="serif hl-card-title mt-6 text-[#2A2623] group-hover:text-[#D12126] transition-colors">{e.t}</h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-[#6B645D]">{e.d}</p>
                </>
              );
              const cls = `group block ${ECO_OFFSETS[k]}`;
              const to = ECO_LINKS[k];
              return to
                ? <Link key={e.t} to={l(to)} className={cls}>{inner}</Link>
                : <a key={e.t} href={BUSINESS_CLUB_SITE} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
            })}
          </div>
        </div>
      </section>

      {/* A word from the leadership, after foraspace.com/about-fora: the
          HiLink link mark, the mission as a quote, and a photograph that
          steps over into the next section. In Club green, from the shutters
          of the HiLink Business Club. */}
      <section className="bg-[#2B3A32] text-[#F6EFE6] pt-20 lg:pt-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <svg viewBox="0 0 600 600" className="mx-auto h-20 w-20" aria-hidden="true">
            <path d={LOOP_PATH} fill="none" stroke="currentColor" strokeWidth="26" strokeLinejoin="round" />
          </svg>
          <blockquote className="mx-auto mt-14 max-w-[1000px]">
            <p className="serif text-[1.55rem] sm:text-[1.9rem] lg:text-[2.125rem] leading-[1.22] text-[#F6EFE6]">{a.mission}</p>
            <footer className="mt-10">
              <p className="text-[13px] uppercase tracking-[0.12em] text-[#F6EFE6]">{t.leaders}</p>
              <p className="mt-1 font-mono text-[13px] text-[#F6EFE6]/75">{t.leadersRole}</p>
            </footer>
          </blockquote>
        </div>
        <div className="mt-20 lg:mt-24 bg-[linear-gradient(to_bottom,#2B3A32_50%,#F4F0EA_50%)]">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="relative mx-auto max-w-[1232px] aspect-[16/9] overflow-hidden rounded-[8px] bg-[#2A2623]">
              <img loading="lazy" decoding="async" {...photo('/photos/hbc-lounge-xl.webp', '(min-width: 1280px) 1232px, 100vw')} alt={t.quoteAlt} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision: the mission is the quote above, so the vision stands alone. */}
      <section className="bg-[#F4F0EA] pt-16 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-8">
          <p className="lg:col-span-3 flex items-baseline gap-4 text-[12px] uppercase tracking-[0.2em] text-[#D12126]">
            <span className="serif text-[2.5rem] leading-none tracking-normal text-[#D12126]/25">01</span>
            {a.visionLbl}
          </p>
          <p className="serif lg:col-span-8 lg:col-start-5 text-[1.55rem] lg:text-[2.2rem] leading-[1.28] text-[#2A2623]">{a.vision}</p>
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

      {/* Properties we run: the shared place rail (after foraspace.com). */}
      <section className="bg-[#F4F0EA] py-20 lg:py-28 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-10 lg:mb-12">
          {eyebrow(t.workEyebrow)}
          <h2 className="serif leading-[1.1]">{t.workTitle}</h2>
        </div>
        <PlaceRail items={places} next={t.next} prev={t.prev} />
      </section>

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
                      <img key={i} loading="lazy" decoding="async" {...photo(src, '260px')} alt="" className={`w-full rounded-[8px] object-cover ${(i + k) % 2 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`} />
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
