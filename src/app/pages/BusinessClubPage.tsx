// HiLink Business Club — the club's two houses (the Business Club lounge at
// 60 Ly Thai To and The Quarter Club at 204 Tran Quang Khai), what membership
// includes, and the three levels of membership. Copy is the approved text of
// the Business Club page on HiLink Workspaces; applications are taken there.
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { MapPin, Clock } from '../components/Glyph';
import { HeroBg } from '../components/HeroBg';
import { Candles } from '../components/Candles';
import { Flag } from '../components/Flag';
import { Slides } from '../components/Slides';
import { LOCATIONS } from '../data/locations';
import { ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';

const HOURS_VI: [RegExp, string][] = [[/Mon/g, 'T2'], [/Fri/g, 'T6'], [/Sat/g, 'T7'], [/Sun/g, 'CN'], [/late/g, 'khuya']];
const HOUSE_PHOTOS = [
  ['/photos/hbc-lounge-5.webp', '/photos/hbc-lounge-3.webp', '/photos/hbc-members.webp', '/photos/hbc-mr8.webp', '/photos/hbc-lounge-4.webp'],
  ['/photos/qc-sign.webp', '/photos/qc-bar.webp', '/photos/qc-lounge.webp', '/photos/qc-dining.webp', '/photos/qc-cellar.webp'],
];
const HOUSE_IDS = ['obc', 'club-tqk'];
const CARDS = ['/brand/card-club.webp', '/brand/card-premier.webp', '/brand/card-executive.webp'];

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
    ctaTitle: 'Đăng ký hội viên',
    ctaLead: 'Hồ sơ được hội đồng hội viên xét duyệt và chúng tôi phản hồi mọi hồ sơ trong vòng hai ngày làm việc.',
  },
};

export function BusinessClubPage() {
  const { lang } = useLang();
  const t = T[lang];
  usePageMeta('HiLink Business Club', t.meta);
  const applyUrl = ws(lang, '/business-club#apply');
  const eyebrow = (text: string) => (
    <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {text}</p>
  );
  const hours = (h: string) => (lang === 'vi' ? HOURS_VI.reduce((s, [re, v]) => s.replace(re, v), h) : h);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[78vh] flex items-end bg-[#2A2623] text-white">
        <HeroBg image="/photos/hbc-lounge-xl.webp" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full">
          <div className="max-w-4xl">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#F06A6E] mb-7 flex items-center gap-3"><Flag className="text-[#F06A6E]" /> {t.eyebrow}</p>
            <h1 className="serif mb-8">{t.title}</h1>
            <p className="text-lg md:text-xl text-[#E9E3DA]/90 leading-relaxed max-w-2xl">{t.sub}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-colors">
                {t.apply} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={ws(lang, '/book-a-tour')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-4 border border-white/60 text-white text-[12px] uppercase tracking-[0.16em] hover:bg-white hover:text-[#2A2623] transition-colors">
                {t.tour}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The two houses: photographs that turn by themselves beside what each
          house is, its address and its hours; the second one mirrored. */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-14 lg:mb-20 grid lg:grid-cols-12 gap-x-16 gap-y-6 items-end">
            <div className="lg:col-span-7">
              {eyebrow(t.housesEyebrow)}
              <h2 className="serif hl-display text-[#2A2623]">{t.housesTitle}</h2>
            </div>
            <p className="lg:col-span-5 text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.housesLead}</p>
          </div>
          <div className="space-y-20 lg:space-y-28">
            {t.houses.map((hse, k) => {
              const loc = LOCATIONS.find((l) => l.id === HOUSE_IDS[k])!;
              return (
                <article key={hse.name} className="grid lg:grid-cols-12 gap-x-16 gap-y-8 items-center">
                  <Slides images={HOUSE_PHOTOS[k]} alt={hse.name} sizes="(min-width: 1024px) 56vw, 100vw" delay={k * 900} className={`aspect-[3/2] lg:col-span-7 ${k % 2 ? 'lg:order-2' : ''}`} />
                  <div className="lg:col-span-5">
                    <p className="text-[13px] font-medium tabular-nums tracking-[0.08em] text-[#D12126]">{String(k + 1).padStart(2, '0')} · <span className="uppercase tracking-[0.14em]">{hse.kind}</span></p>
                    <h3 className="serif hl-display mt-4 text-[#2A2623]">{hse.name}</h3>
                    <p className="serif mt-6 text-[1.35rem] lg:text-[1.5rem] leading-[1.35] text-[#D12126]">{hse.line}</p>
                    <p className="mt-5 text-[1.0625rem] leading-[1.75] text-[#4A443F]">{hse.body}</p>
                    <dl className="mt-8 border-t border-[#2A2623]/15">
                      <div className="flex items-start gap-3 border-b border-[#2A2623]/15 py-4 text-[15px] text-[#2A2623]"><MapPin size={16} className="mt-1 shrink-0 text-[#D12126]" /> {loc.address}</div>
                      <div className="flex items-start gap-3 border-b border-[#2A2623]/15 py-4 text-[15px] text-[#2A2623]"><Clock size={16} className="mt-1 shrink-0 text-[#D12126]" /> {hours(loc.hours)}</div>
                    </dl>
                    <a href={ws(lang, `/locations/${loc.id}`)} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[#2A2623] hover:text-[#D12126] transition-colors">
                      {t.view} <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Member privileges: the three cards, then what membership includes. */}
      <section id="membership" className="relative py-24 lg:py-32 bg-white scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-12 lg:mb-16 grid lg:grid-cols-12 gap-x-16 gap-y-6 items-end">
            <div className="lg:col-span-7">
              {eyebrow(t.tiersEyebrow)}
              <h2 className="serif hl-display text-[#2A2623]">{t.tiersTitle}</h2>
            </div>
            <p className="lg:col-span-5 text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.tiersLead}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
            {t.tiers.map(([name, d], k) => (
              <div key={name} className="group">
                <div className="relative aspect-[1011/637] overflow-hidden rounded-[12px] shadow-[0_18px_40px_-18px_rgba(42,38,35,0.55)] transition-transform duration-500 group-hover:-translate-y-1.5">
                  <img loading="lazy" decoding="async" src={CARDS[k]} alt={`HiLink Business Club — ${name}`} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <p className="mt-7 text-[12px] uppercase tracking-[0.14em] text-[#6B645D]">{t.who}</p>
                <h3 className="serif hl-card-title mt-2 text-[#2A2623]">{name}</h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#4A443F]">{d}</p>
                {k === 2 && <p className="mt-3 text-[15px] leading-relaxed text-[#D12126]">{t.invite}</p>}
              </div>
            ))}
          </div>

          <div className="mt-20 lg:mt-28">
            {eyebrow(t.incEyebrow)}
            <h3 className="serif hl-card-title text-[#2A2623]">{t.incTitle}</h3>
            <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 border-t border-[#2A2623]/15">
              {t.benefits.map(([title, d], k) => (
                <li key={title} className={`border-b border-[#2A2623]/15 py-8 lg:py-10 lg:pr-10 ${k % 3 ? 'lg:border-l lg:pl-10' : ''} ${k % 2 ? 'sm:max-lg:border-l sm:max-lg:pl-8' : 'sm:max-lg:pr-8'}`}>
                  <span className="text-[13px] font-medium tabular-nums tracking-[0.08em] text-[#D12126]">{String(k + 1).padStart(2, '0')}</span>
                  <p className="serif mt-3 text-[1.35rem] leading-snug text-[#2A2623]">{title}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6B645D]">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Partner network. */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-16 gap-y-12">
          <div className="lg:col-span-5">
            {eyebrow(t.svcEyebrow)}
            <h2 className="serif text-[#2A2623]">{t.svcTitle}</h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.svcLead}</p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {t.svc.map(([head, items]) => (
              <div key={head}>
                <p className="text-[12px] uppercase tracking-[0.14em] text-[#D12126]">{head}</p>
                <ul className="mt-4 border-t border-[#2A2623]/15">
                  {items.map((it) => <li key={it} className="border-b border-[#2A2623]/15 py-3 text-[1.0625rem] text-[#2A2623]">{it}</li>)}
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
