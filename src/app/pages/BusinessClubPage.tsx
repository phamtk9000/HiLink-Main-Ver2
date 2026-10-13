// HiLink Business Club — laid out after maslows.com and pavilion.club: a hero
// of fading photographs under a centred title; the club's two houses (the
// Business Club lounge at 60 Ly Thai To and The Quarter Club at 204 Tran
// Quang Khai) as photographs beside ruled text; the showcase; the three
// levels of membership on a band of club green; what membership includes as
// captioned photographs; the partner network. Copy is the approved text of
// the Business Club page on HiLink Workspaces; applications are taken there.
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { MapPin, Clock, Sparkles, Search, TrendingUp, ClipboardList, Scale, Layers, Users, Truck, Globe, UtensilsCrossed, Bell, Calendar, Plane } from '../components/Glyph';
import { Candles } from '../components/Candles';
import { Flag } from '../components/Flag';
import { Slides } from '../components/Slides';
import { HeroFade, RuleTitle, Showcase, type Shot } from '../components/Club';
import { LOCATIONS } from '../data/locations';
import { ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { photo } from '../lib/photo';
import { TileFx, type TileKind } from '../components/TileFx';

const HOURS_VI: [RegExp, string][] = [[/Mon/g, 'T2'], [/Fri/g, 'T6'], [/Sat/g, 'T7'], [/Sun/g, 'CN'], [/late/g, 'khuya']];
const HERO = ['/photos/hbc-lounge-xl.webp', '/photos/qc-bar.webp', '/photos/hbc-lounge-3.webp'];
const HOUSE_PHOTOS = [
  ['/photos/hbc-lounge-5.webp', '/photos/hbc-study.webp', '/photos/hbc-members.webp', '/photos/hbc-mr8.webp', '/photos/hbc-lounge-4.webp'],
  ['/photos/qc-sign.webp', '/photos/qc-bar-2.webp', '/photos/qc-lounge.webp', '/photos/qc-dining.webp', '/photos/qc-cellar.webp'],
];
const HOUSE_IDS = ['obc', 'club-tqk'];
const CARDS = ['/brand/card-club.webp', '/brand/card-premier.webp', '/brand/card-executive.webp'];
// One photograph for each benefit (the order of T.benefits).
const BENEFIT_PHOTOS = ['/photos/hbc-globe.webp', '/photos/hbc-members.webp', '/photos/hbc-host.webp', '/photos/hbc-client-meeting.webp', '/photos/hbc-mr8.webp', '/photos/hbc-mr10-flowers.webp'];
// The partner network: a photograph for each group, an icon for each service
// (the order of T.svc; no glyph twice in a group).
const SVC_PHOTOS = ['/photos/hbc-advisor.webp', '/photos/hbc-fandb.webp'];
const SVC_ICONS = [
  [Sparkles, Search, TrendingUp, ClipboardList, Scale, Layers, Users, Truck, Globe],
  [UtensilsCrossed, Bell, Sparkles, Calendar, Plane],
];
// …and the drawing that plays behind each tile on hover.
const SVC_FX: TileKind[][] = [
  ['broadcast', 'audit', 'chart', 'ledger', 'scale', 'cover', 'people', 'route', 'trade'],
  ['steam', 'pulse', 'equalizer', 'calendar', 'flight'],
];
const HBC = 'HiLink Business Club', QC = 'The Quarter Club';
const SHOWCASE: Shot[] = [
  { src: '/photos/hbc-lounge-3.webp', caption: HBC }, { src: '/photos/qc-bar.webp', caption: QC }, { src: '/photos/hbc-study-2.webp', caption: HBC },
  { src: '/photos/qc-room-2.webp', caption: QC }, { src: '/photos/hbc-counter.webp', caption: HBC }, { src: '/photos/qc-lounge.webp', caption: QC },
  { src: '/photos/hbc-detail.webp', caption: HBC }, { src: '/photos/qc-sign-2.webp', caption: QC }, { src: '/photos/hbc-desk-pair.webp', caption: HBC },
];

const T = {
  en: {
    meta: 'A private business club in Hanoi — the Business Club lounge at 60 Ly Thai To and The Quarter Club at 204 Tran Quang Khai. Membership at three levels.',
    eyebrow: 'HiLink Business Club · Hanoi', title: 'The first Business Club in Vietnam',
    sub: "A private business members' club for executives, accomplished professionals, influential entrepreneurs and leading businesses — inside the HiLink workspace network.",
    apply: 'Apply for Membership', tour: 'Arrange a viewing',
    housesEyebrow: 'The addresses', housesTitle: 'Two houses, one club.',
    housesLead: 'Membership opens both doors — the club floor on Ly Thai To and the house on Tran Quang Khai.',
    houses: [
      { kind: 'Lounge', name: 'HiLink Business Club', line: 'A lounge for businesspeople, companies and the community — a place to host guests, to meet and to work.', body: "Entry to the club's exclusive premises, where privacy, luxury and attention to detail come together. Floor 7 pairs a members' business lounge with meeting rooms and an event space, steps from Hoan Kiem Lake." },
      { kind: 'Private Club', name: 'The Quarter Club', line: 'A private club for individuals, where privacy comes first. Membership is by referral.', body: 'A modern business and social club — a room for the meetings, the conversations and the connections that happen after the working day. Bar, cigar room and private dining, beside the river.' },
    ],
    view: 'View location',
    tiersEyebrow: 'Member privileges', tiersTitle: 'Privileges at every level of membership',
    tiersLead: 'Membership is offered to individuals and to companies, across three levels: Club, Premier and Executive.',
    who: 'Individual or Corporate',
    tiers: [['Club', 'The entry level of club membership.'], ['Premier', 'The mid level of club membership.'], ['Executive', 'The premium level of club membership.']],
    invite: 'Invitation only — members are proposed by the committee and invited directly.',
    incEyebrow: 'Member benefits', incTitle: 'What membership includes',
    benefits: [
      ['Business Club lounges', "Entry to the club's exclusive premises, where privacy, luxury and attention to detail come together."],
      ['Networking opportunities', 'Mingle with a select group of industry leaders, influencers and visionaries.'],
      ['Concierge & lifestyle services', 'Personalised concierge assistance, with gastronomy, health & welfare, entertainment, events and transport arranged for you.'],
      ['Global reciprocal clubs', 'Access to a global network of partner clubs, granting entry to prestigious venues worldwide.'],
      ['Business support services', 'A network of trusted partners across legal, accounting, finance, HR, marketing and more.'],
      ['Private hires', 'The meeting room and the private event space can be booked for closed-door briefings, launches and private dinners.'],
    ],
    svcEyebrow: 'Partner network', svcTitle: 'Business support and lifestyle services',
    svcLead: "Members draw on a catalogue of services delivered through the club's network of trusted partners.",
    svc: [['Business support', ['Marketing & Branding', 'Audit', 'Finance', 'Accounting & Tax', 'Legal', 'Insurance', 'Human Resources', 'Logistics', 'Trade']], ['Lifestyle', ['Gastronomy', 'Health & Welfare', 'Entertainment & Leisure', 'Events', 'Transport']]] as [string, string[]][],
    explore: 'Explore', prev: 'Previous photograph', next: 'Next photograph', housesRule: 'The houses',
    svcRule: 'Business support services', svcMore: 'Concierge services',
    ctaTitle: 'Apply for Membership',
    ctaLead: 'Applications are reviewed by the membership committee, and we come back to every one within two business days.',
  },
  vi: {
    meta: 'Câu lạc bộ doanh nhân riêng tư tại Hà Nội — lounge Business Club tại 60 Lý Thái Tổ và The Quarter Club tại 204 Trần Quang Khải. Ba hạng hội viên.',
    eyebrow: 'HiLink Business Club · Hà Nội', title: 'Business Club đầu tiên tại Việt Nam',
    sub: 'Câu lạc bộ doanh nhân riêng tư dành cho giới điều hành, chuyên gia, doanh nhân và các doanh nghiệp hàng đầu — trong mạng lưới không gian làm việc HiLink.',
    apply: 'Đăng ký hội viên', tour: 'Đặt lịch tham quan',
    housesEyebrow: 'Các địa chỉ', housesTitle: 'Hai ngôi nhà, một câu lạc bộ.',
    housesLead: 'Thẻ hội viên mở cả hai cánh cửa — tầng câu lạc bộ trên phố Lý Thái Tổ và ngôi nhà trên phố Trần Quang Khải.',
    houses: [
      { kind: 'Lounge', name: 'HiLink Business Club', line: 'Không gian Lounge cho doanh nhân, doanh nghiệp và cộng đồng — tiếp khách, giao lưu, làm việc.', body: 'Quyền vào các không gian riêng của câu lạc bộ, nơi sự riêng tư, sang trọng và tinh tế hội tụ. Tầng 7 kết hợp business lounge dành cho thành viên với phòng họp và không gian sự kiện, sát Hồ Hoàn Kiếm.' },
      { kind: 'Private Club', name: 'The Quarter Club', line: 'Không gian Private Club dành riêng cho cá nhân, ưu tiên sự riêng tư, gia nhập qua giới thiệu.', body: 'Một business & social club hiện đại — chỗ dành cho những cuộc gặp, những câu chuyện và những kết nối diễn ra sau giờ làm việc. Quầy bar, phòng cigar và phòng ăn riêng, bên sông.' },
    ],
    view: 'Xem địa điểm',
    tiersEyebrow: 'Đặc quyền hội viên', tiersTitle: 'Quyền lợi theo từng hạng hội viên',
    tiersLead: 'Hội viên dành cho cá nhân và cho doanh nghiệp, với ba hạng: Club, Premier và Executive.',
    who: 'Cá nhân hoặc Doanh nghiệp',
    tiers: [['Club', 'Hạng hội viên cơ bản.'], ['Premier', 'Hạng hội viên trung cấp.'], ['Executive', 'Hạng hội viên cao cấp.']],
    invite: 'Chỉ theo lời mời — hội viên do hội đồng đề cử và được mời trực tiếp.',
    incEyebrow: 'Quyền lợi hội viên', incTitle: 'Hội viên bao gồm những gì',
    benefits: [
      ['Phòng chờ Business Club', 'Quyền vào các không gian riêng của câu lạc bộ, nơi sự riêng tư, sang trọng và tinh tế hội tụ.'],
      ['Cơ hội kết nối', 'Gặp gỡ nhóm chọn lọc gồm những nhà lãnh đạo, người có ảnh hưởng và người tiên phong trong ngành.'],
      ['Concierge & dịch vụ phong cách sống', 'Hỗ trợ concierge cá nhân hoá, cùng ẩm thực, sức khoẻ, giải trí, sự kiện và di chuyển được sắp xếp sẵn.'],
      ['Câu lạc bộ đối ứng toàn cầu', 'Quyền tiếp cận mạng lưới câu lạc bộ đối tác toàn cầu, mở cửa những địa điểm danh giá trên thế giới.'],
      ['Dịch vụ hỗ trợ doanh nghiệp', 'Mạng lưới đối tác tin cậy về pháp lý, kế toán, tài chính, nhân sự, marketing và nhiều lĩnh vực khác.'],
      ['Thuê không gian riêng', 'Phòng họp và không gian sự kiện riêng có thể đặt cho họp kín, lễ ra mắt và tiệc tối riêng tư.'],
    ],
    svcEyebrow: 'Mạng lưới đối tác', svcTitle: 'Dịch vụ hỗ trợ doanh nghiệp và phong cách sống',
    svcLead: 'Hội viên sử dụng danh mục dịch vụ được cung cấp qua mạng lưới đối tác tin cậy của câu lạc bộ.',
    svc: [['Hỗ trợ doanh nghiệp', ['Marketing & Thương hiệu', 'Kiểm toán', 'Tài chính', 'Kế toán & Thuế', 'Pháp lý', 'Bảo hiểm', 'Nhân sự', 'Logistics', 'Thương mại']], ['Phong cách sống', ['Ẩm thực', 'Sức khoẻ & Phúc lợi', 'Giải trí & Thư giãn', 'Sự kiện', 'Di chuyển']]] as [string, string[]][],
    explore: 'Khám phá', prev: 'Ảnh trước', next: 'Ảnh tiếp theo', housesRule: 'Hai ngôi nhà',
    svcRule: 'Dịch vụ hỗ trợ doanh nghiệp', svcMore: 'Dịch vụ concierge',
    ctaTitle: 'Đăng ký hội viên',
    ctaLead: 'Hồ sơ được hội đồng hội viên xét duyệt và chúng tôi phản hồi mọi hồ sơ trong vòng hai ngày làm việc.',
  },
};

export function BusinessClubPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta('HiLink Business Club', t.meta);
  const applyUrl = ws(lang, '/business-club#apply');
  const hours = (h: string) => (lang === 'vi' ? HOURS_VI.reduce((s, [re, v]) => s.replace(re, v), h) : h);

  return (
    <>
      {/* Hero: photographs of the two houses fading into one another. */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#1B1412] text-white">
        <HeroFade images={HERO} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center">
          <p className="mb-8 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.24em] text-white/85"><Flag className="text-[#F06A6E]" /> {t.eyebrow}</p>
          <h1 className="serif">{t.title}</h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg lg:text-xl leading-relaxed text-white/85">{t.sub}</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.2em] hover:bg-[#A3181C] transition-colors">
              {t.apply} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={ws(lang, '/book-a-tour')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-4 border border-white/70 text-white text-[12px] uppercase tracking-[0.2em] hover:bg-white hover:text-[#2A2623] transition-colors">
              {t.tour}
            </a>
          </div>
        </div>
      </section>

      {/* The two houses: photographs that turn by themselves beside ruled
          text; the second one mirrored. */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <RuleTitle>{t.housesRule}</RuleTitle>
          <div className="mt-14 lg:mt-20 space-y-20 lg:space-y-28">
            {t.houses.map((hse, k) => {
              const loc = LOCATIONS.find((l) => l.id === HOUSE_IDS[k])!;
              return (
                <article key={hse.name} className="grid lg:grid-cols-12 gap-x-16 gap-y-8 items-center">
                  <Slides images={HOUSE_PHOTOS[k]} alt={hse.name} sizes="(min-width: 1024px) 56vw, 100vw" delay={k * 900} className={`aspect-[3/2] lg:col-span-7 ${k % 2 ? 'lg:order-2' : ''}`} />
                  <div className={`lg:col-span-4 ${k % 2 ? 'lg:col-start-1' : 'lg:col-start-9'}`}>
                    <div className="border-t border-[#2A2623]/25 pt-7">
                      <p className="text-[12px] uppercase tracking-[0.18em] text-[#D12126]">{hse.kind}</p>
                      <h3 className="serif hl-club-name mt-4 text-[#2A2623]">{hse.name}</h3>
                      <span className="mt-6 block h-[2px] w-12 bg-[#D12126]" aria-hidden="true" />
                    </div>
                    <p className="serif mt-6 text-[1.3rem] leading-[1.4] italic text-[#2A2623]">{hse.line}</p>
                    <p className="mt-5 text-[15px] leading-[1.8] text-[#4A443F]">{hse.body}</p>
                    <dl className="mt-7 space-y-2.5 text-[14px] text-[#4A443F]">
                      <div className="flex items-start gap-3"><MapPin size={15} className="mt-0.5 shrink-0 text-[#D12126]" /> {loc.address}</div>
                      <div className="flex items-start gap-3"><Clock size={15} className="mt-0.5 shrink-0 text-[#D12126]" /> {hours(loc.hours)}</div>
                    </dl>
                    <a href={ws(lang, `/locations/${loc.id}`)} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-2 border-b border-[#D12126]/40 pb-1 text-[12px] uppercase tracking-[0.18em] text-[#D12126] hover:border-[#D12126] transition-colors">
                      {t.view} <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* The showcase (after the Explore gallery on maslows.com). */}
      <section className="relative py-20 lg:py-28 bg-[#F7F4EC] overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 mb-12 lg:mb-16"><RuleTitle>{t.explore}</RuleTitle></div>
        <Showcase shots={SHOWCASE} prev={t.prev} next={t.next} />
      </section>

      {/* Member privileges: the three cards, on club green. */}
      <section id="membership" className="relative py-24 lg:py-32 bg-[#2E3A33] text-[#F6EFE6] scroll-mt-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <RuleTitle dark>{t.tiersEyebrow}</RuleTitle>
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <p className="serif hl-club-statement text-[#F6EFE6]">{t.tiersTitle}</p>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[#F6EFE6]/75">{t.tiersLead}</p>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-x-10 gap-y-14">
            {t.tiers.map(([name, d], k) => (
              <div key={name} className="group text-center">
                <div className="relative aspect-[1011/637] overflow-hidden rounded-[12px] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:-translate-y-1.5">
                  <img loading="lazy" decoding="async" src={CARDS[k]} alt={`HiLink Business Club — ${name}`} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <h3 className="serif hl-club-caption mt-8 text-[#F6EFE6]">{name}</h3>
                <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-[#E8B9A6]">{t.who}</p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#F6EFE6]/80">{d}</p>
                {k === 2 && <p className="mx-auto mt-3 max-w-[34ch] text-[14px] leading-relaxed text-[#E8B9A6]">{t.invite}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What membership includes: six photographs with centred captions. */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <RuleTitle>{t.incTitle}</RuleTitle>
          <div className="mt-14 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {t.benefits.map(([title, d], k) => (
              <figure key={title} className="group text-center">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#2A2623]">
                  <img loading="lazy" decoding="async" {...photo(BENEFIT_PHOTOS[k], '(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw')} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]" />
                </div>
                <figcaption className="mx-auto mt-7 max-w-[34ch]">
                  <h3 className="serif hl-club-caption text-[#2A2623]">{title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6B645D]">{d}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Business support and lifestyle services, set out as concierge sites
          do: each group a photograph beside its services, one tile apiece. */}
      <section className="relative pb-24 lg:pb-32 bg-white hl-no-rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <RuleTitle>{t.svcRule}</RuleTitle>
          <div className="mt-14 lg:mt-16 space-y-16 lg:space-y-24">
            {t.svc.map(([head, items], g) => (
              <div key={head} className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-stretch">
                <div className={`lg:col-span-4 relative min-h-[260px] overflow-hidden rounded-[8px] bg-[#2A2623] ${g % 2 ? 'lg:order-2' : ''}`}>
                  <img loading="lazy" decoding="async" {...photo(SVC_PHOTOS[g], '(min-width: 1024px) 32vw, 100vw')} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <h3 className="serif hl-club-caption">{head}</h3>
                  </div>
                </div>
                <ul className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 border-t border-l border-[#2A2623]/12">
                  {items.map((it, k) => {
                    const Icon = SVC_ICONS[g][k];
                    return (
                      <li key={it} data-fx-root tabIndex={0} className="group relative flex min-h-[148px] flex-col justify-between overflow-hidden border-b border-r border-[#2A2623]/12 p-5 lg:p-6 outline-none transition-colors duration-500 hover:bg-[#FBF8F5] focus-visible:bg-[#FBF8F5]">
                        <TileFx kind={SVC_FX[g][k]} />
                        <span className="relative flex items-start justify-between text-[#D12126]">
                          <Icon size={24} />
                          <span className="text-[12px] tabular-nums tracking-[0.08em] text-[#6B645D] transition-opacity duration-300 group-hover:opacity-0">{String(k + 1).padStart(2, '0')}</span>
                        </span>
                        <span className="serif relative mt-6 sm:max-w-[58%] text-[1.15rem] lg:text-[1.3rem] leading-snug text-[#2A2623] transition-colors group-hover:text-[#D12126]">{it}</span>
                      </li>
                    );
                  })}
                  {g === 1 && (
                    <li className="border-b border-r border-[#2A2623]/12">
                      <Link to={l('/concierge-services')} className="group flex h-full min-h-[148px] flex-col justify-between bg-[#2E3A33] p-5 lg:p-6 text-[#F6EFE6] transition-colors duration-300 hover:bg-[#22302A]">
                        <ArrowUpRight size={22} className="self-end transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        <span className="serif mt-6 text-[1.15rem] lg:text-[1.3rem] leading-snug">{t.svcMore}</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply. */}
      <section className="relative overflow-hidden py-24 lg:py-28 bg-[#361716] text-white">
        <Candles />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="serif mb-6">{t.ctaTitle}</h2>
          <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto">{t.ctaLead}</p>
          <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-12 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-colors">
            {t.apply} <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </section>
    </>
  );
}
