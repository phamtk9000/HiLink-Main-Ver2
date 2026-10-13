// Concierge Services — laid out after maslows.com and pavilion.club, with the
// photographs of the two houses where the service is delivered (the HiLink
// Business Club and The Quarter Club): a hero of fading photographs under a
// centred title, the six things we arrange as captioned photographs, the
// showcase, what sets the service apart on a band of club green, the two
// houses, and the membership enquiry.
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Mail } from '../components/Glyph';
import { HeroFade, RuleTitle, Showcase, type Shot } from '../components/Club';
import { CONTACT } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { HONEYPOT_PROPS, honeypot, leadError, sendLead } from '../lib/lead';
import { Flag } from '../components/Flag';
import { photo } from '../lib/photo';

const HERO = ['/photos/hbc-reception.webp', '/photos/hbc-lounge-5.webp', '/photos/qc-bar-2.webp'];
// One photograph for each thing we arrange (the order of T.services).
const SERVICE_PHOTOS = ['/photos/hbc-hostess.webp', '/photos/hbc-fandb.webp', '/photos/qc-bar.webp', '/photos/hbc-study.webp', '/photos/hbc-advisor.webp', '/photos/hbc-host.webp'];
const HOUSE_PHOTOS = ['/photos/hbc-lounge-3.webp', '/photos/qc-sign.webp'];
const HBC = 'HiLink Business Club', QC = 'The Quarter Club';
const SHOWCASE: Shot[] = [
  { src: '/photos/hbc-lounge-5.webp', caption: HBC }, { src: '/photos/qc-lounge.webp', caption: QC }, { src: '/photos/hbc-members.webp', caption: HBC },
  { src: '/photos/qc-dining.webp', caption: QC }, { src: '/photos/hbc-globe.webp', caption: HBC }, { src: '/photos/qc-cellar.webp', caption: QC },
  { src: '/photos/hbc-mr8.webp', caption: HBC }, { src: '/photos/qc-room.webp', caption: QC }, { src: '/photos/hbc-counter.webp', caption: HBC },
];

const T = {
  en: {
    meta: 'A dedicated HiLink concierge team for travel, dining, events, lifestyle and business support.',
    eyebrow: 'Concierge Services', h1: ['Your Life.', 'Perfected.'],
    lead: 'A dedicated concierge team at your service, 24/7. From the extraordinary to the everyday, we make the impossible, effortless.',
    request: 'Request Membership', scroll: 'Scroll to discover',
    philTitle: 'Time is Your Most Valuable Asset',
    phil: 'Your dedicated concierge manages the details, so you can focus on what truly matters. From securing impossible reservations to orchestrating seamless travel, we anticipate your needs before you voice them.',
    arrEyebrow: 'What We Arrange', arrTitle: 'What We Can Arrange', arrLead: 'A selection of our most requested services',
    services: [
      ['Travel & Aviation', 'Private jet charters, first-class bookings, luxury hotel reservations, bespoke itineraries'],
      ['Dining & Entertainment', 'Private chef services, restaurant reservations at Michelin-starred venues, exclusive event access'],
      ['Events & Experiences', 'VIP access to cultural events, private tours, yacht charters, curated experiences'],
      ['Lifestyle Management', 'Personal shopping, home services, relocation support, wellness and spa bookings'],
      ['Business Support', 'Executive assistance, meeting coordination, translation services, corporate gifting'],
      ['Bespoke Requests', 'Whatever you need, whenever you need it. Your dedicated concierge makes it happen'],
    ],
    diffTitle: 'The HiLink Difference', diffAlt: 'Reception at the HiLink Business Club',
    diffs: [
      ['Personal. Not Automated.', 'You work with a dedicated concierge team who knows your preferences, anticipates your needs, and operates with complete discretion.'],
      ['Connected. Not Limited.', 'Our network spans Vietnam and beyond—exclusive access to private clubs, VIP events, and experiences unavailable to the public.'],
      ['Proactive. Not Reactive.', "We don't wait for requests. We know your calendar, understand your preferences, and have everything arranged before you need it."],
    ],
    formTitle: 'Membership Enquiry', formLead: 'Concierge services are available exclusively to HiLink property clients and select members.',
    name: 'Full Name', email: 'Email Address', phone: 'Phone Number', message: 'Tell us about your needs and how we can assist you...',
    submit: 'Submit Enquiry', sending: 'Sending…', sentTitle: 'Enquiry received', messageLbl: 'Your request', formNote: 'Your enquiry is handled with complete confidentiality. A member of our team will contact you within 24 hours.',
    qLbl: 'Questions?', qText: 'Our concierge team is available 24/7',
    explore: 'Explore', prev: 'Previous photograph', next: 'Next photograph',
    housesTitle: 'Where we host you', housesLink: 'Discover the Business Club',
    houses: [
      ['HiLink Business Club', 'Floor 7, 60 Ly Thai To', 'A lounge for businesspeople, companies and the community — a place to host guests, to meet and to work.'],
      ['The Quarter Club', '204 Tran Quang Khai', 'A private club for individuals, where privacy comes first. Membership is by referral.'],
    ],
  },
  vi: {
    meta: 'Đội ngũ concierge riêng của HiLink cho đi lại, ẩm thực, sự kiện, phong cách sống và hỗ trợ công việc.',
    eyebrow: 'Dịch vụ concierge', h1: ['Cuộc sống của bạn.', 'Trọn vẹn.'],
    lead: 'Một đội ngũ concierge riêng phục vụ bạn 24/7. Từ những điều đặc biệt đến việc thường ngày, chúng tôi biến điều khó thành dễ dàng.',
    request: 'Đăng ký thành viên', scroll: 'Cuộn để khám phá',
    philTitle: 'Thời gian là tài sản quý nhất của bạn',
    phil: 'Concierge riêng lo từng chi tiết để bạn tập trung vào điều thật sự quan trọng. Từ những đặt chỗ khó nhất đến hành trình liền mạch, chúng tôi đón trước nhu cầu của bạn.',
    arrEyebrow: 'Chúng tôi sắp xếp', arrTitle: 'Những gì chúng tôi có thể sắp xếp', arrLead: 'Một số dịch vụ được yêu cầu nhiều nhất',
    services: [
      ['Đi lại & hàng không', 'Thuê chuyên cơ, đặt vé hạng nhất, đặt khách sạn cao cấp, lịch trình riêng'],
      ['Ẩm thực & giải trí', 'Đầu bếp riêng, đặt bàn nhà hàng Michelin, sự kiện đặc quyền'],
      ['Sự kiện & trải nghiệm', 'Vé VIP sự kiện văn hoá, tour riêng, thuê du thuyền, trải nghiệm được tuyển chọn'],
      ['Phong cách sống', 'Mua sắm riêng, dịch vụ tại nhà, hỗ trợ chuyển đến, đặt lịch wellness và spa'],
      ['Hỗ trợ công việc', 'Trợ lý điều hành, điều phối cuộc họp, phiên dịch, quà tặng doanh nghiệp'],
      ['Yêu cầu riêng', 'Bất cứ điều gì bạn cần, bất cứ khi nào. Concierge riêng sẽ biến điều đó thành hiện thực'],
    ],
    diffTitle: 'Khác biệt của HiLink', diffAlt: 'Quầy lễ tân tại HiLink Business Club',
    diffs: [
      ['Cá nhân hoá. Không tự động hoá.', 'Bạn làm việc với một đội concierge riêng hiểu sở thích, đón trước nhu cầu và luôn kín đáo tuyệt đối.'],
      ['Kết nối. Không giới hạn.', 'Mạng lưới của chúng tôi trải khắp Việt Nam và hơn thế — quyền vào câu lạc bộ riêng, sự kiện VIP và trải nghiệm không mở cho công chúng.'],
      ['Chủ động. Không bị động.', 'Chúng tôi không chờ yêu cầu. Chúng tôi nắm lịch trình, hiểu sở thích và chuẩn bị sẵn mọi thứ trước khi bạn cần.'],
    ],
    formTitle: 'Đăng ký thành viên', formLead: 'Dịch vụ concierge dành riêng cho khách hàng bất động sản của HiLink và thành viên được chọn.',
    name: 'Họ và tên', email: 'Địa chỉ email', phone: 'Số điện thoại', message: 'Cho chúng tôi biết nhu cầu của bạn và chúng tôi có thể hỗ trợ thế nào...',
    submit: 'Gửi yêu cầu', sending: 'Đang gửi…', sentTitle: 'Đã nhận yêu cầu', messageLbl: 'Yêu cầu của bạn', formNote: 'Yêu cầu của bạn được bảo mật tuyệt đối. Một thành viên đội ngũ sẽ liên hệ với bạn trong vòng 24 giờ.',
    qLbl: 'Câu hỏi?', qText: 'Đội concierge sẵn sàng 24/7',
    explore: 'Khám phá', prev: 'Ảnh trước', next: 'Ảnh tiếp theo',
    housesTitle: 'Nơi chúng tôi đón tiếp bạn', housesLink: 'Khám phá Business Club',
    houses: [
      ['HiLink Business Club', 'Tầng 7, 60 Lý Thái Tổ', 'Không gian Lounge cho doanh nhân, doanh nghiệp và cộng đồng — tiếp khách, giao lưu, làm việc.'],
      ['The Quarter Club', '204 Trần Quang Khải', 'Không gian Private Club dành riêng cho cá nhân, ưu tiên sự riêng tư, gia nhập qua giới thiệu.'],
    ],
  },
};

export function ConciergePage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await sendLead('concierge', { Name: formData.name, Email: formData.email, Phone: formData.phone, Message: formData.message }, { website: honeypot(e.currentTarget), lang });
      setSent(true);
    } catch {
      setError(leadError(lang));
    } finally {
      setSending(false);
    }
  };


  return (
    <>
      {/* Hero: photographs of the two houses fading into one another. */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#1B1412] text-white">
        <HeroFade images={HERO} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-28 text-center">
          <p className="mb-8 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.24em] text-white/85"><Flag className="text-[#F06A6E]" /> {t.eyebrow}</p>
          <h1 className="serif">{t.h1[0]}<br />{t.h1[1]}</h1>
          <p className="mt-8 text-lg lg:text-xl leading-relaxed text-white/85">{t.lead}</p>
          <a href="#enquire" className="mt-10 inline-flex items-center justify-center px-10 py-4 border border-white/70 text-white text-[12px] uppercase tracking-[0.2em] hover:bg-white hover:text-[#2A2623] transition-colors">{t.request}</a>
        </div>
      </section>

      {/* The idea, in one centred statement. */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="serif hl-club-statement text-[#2A2623]">{t.philTitle}</h2>
          <p className="mt-8 text-[1.0625rem] leading-[1.8] text-[#4A443F]">{t.phil}</p>
        </div>
      </section>

      {/* What we arrange: six photographs with centred captions. */}
      <section className="relative pb-24 lg:pb-32 bg-white hl-no-rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <RuleTitle>{t.arrTitle}</RuleTitle>
          <p className="mt-8 text-center text-[1.0625rem] text-[#6B645D]">{t.arrLead}</p>
          <div className="mt-14 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {t.services.map(([title, d], k) => (
              <figure key={title} className="group text-center">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#2A2623]">
                  <img loading="lazy" decoding="async" {...photo(SERVICE_PHOTOS[k], '(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw')} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]" />
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

      {/* The showcase (after the Explore gallery on maslows.com). */}
      <section className="relative py-20 lg:py-28 bg-[#F7F4EC] overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 mb-12 lg:mb-16"><RuleTitle>{t.explore}</RuleTitle></div>
        <Showcase shots={SHOWCASE} prev={t.prev} next={t.next} />
      </section>

      {/* What sets it apart, on club green. */}
      <section className="relative py-24 lg:py-32 bg-[#2B3A32] text-[#F6EFE6]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-16 gap-y-12 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#1B1412]">
            <img loading="lazy" decoding="async" {...photo('/photos/hbc-member.webp', '(min-width: 1024px) 40vw, 100vw')} alt={t.diffAlt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-t border-[#F6EFE6]/30 pt-8">
              <h2 className="serif hl-club-title text-[#F6EFE6]">{t.diffTitle}</h2>
            </div>
            <ol className="mt-10 space-y-10">
              {t.diffs.map(([title, d], k) => (
                <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-x-4">
                  <span className="pt-1.5 text-[13px] font-medium tabular-nums tracking-[0.08em] text-[#E8B9A6]">{String(k + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="serif text-[1.5rem] lg:text-[1.75rem] leading-snug text-[#F6EFE6]">{title}</p>
                    <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#F6EFE6]/75">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The two houses where the service is delivered. */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <RuleTitle>{t.housesTitle}</RuleTitle>
          <div className="mt-14 lg:mt-16 grid md:grid-cols-2 gap-x-10 gap-y-14">
            {t.houses.map(([name, address, line], k) => (
              <Link key={name} to={l('/business-club')} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[8px] bg-[#2A2623]">
                  <img loading="lazy" decoding="async" {...photo(HOUSE_PHOTOS[k], '(min-width: 768px) 46vw, 100vw')} alt={name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]" />
                </div>
                <p className="mt-6 text-[13px] text-[#6B645D] underline decoration-[#2A2623]/25 underline-offset-4">{address}</p>
                <h3 className="serif hl-club-caption mt-2 text-[#2A2623] transition-colors group-hover:text-[#D12126]">{name}</h3>
                <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-[#6B645D]">{line}</p>
              </Link>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to={l('/business-club')} className="group inline-flex items-center gap-2 border-b border-[#D12126]/40 pb-1 text-[12px] uppercase tracking-[0.18em] text-[#D12126] hover:border-[#D12126] transition-colors">
              {t.housesLink} <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Membership enquiry. */}
      <section id="enquire" className="relative pb-24 lg:pb-32 bg-white hl-no-rule scroll-mt-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12"><RuleTitle>{t.formTitle}</RuleTitle></div>
        <div className="max-w-[720px] mx-auto px-6 mt-10">
          <p className="mb-12 text-center text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.formLead}</p>
          {sent ? (
            <div role="status" className="text-center py-12 bg-[#F7F4EC]">
              <CheckCircle2 size={44} className="mx-auto mb-5 text-[#D12126]" />
              <p className="serif text-3xl text-[#2A2623] mb-3">{t.sentTitle}</p>
              <p className="text-[#6B645D]">{t.formNote}</p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="relative space-y-5">
            <input {...HONEYPOT_PROPS} />
            <div>
              <label htmlFor="cg-name" className="block text-[13px] uppercase tracking-[0.14em] text-[#6B645D] mb-2">{t.name} *</label>
              <input id="cg-name" type="text" autoComplete="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 bg-[#F7F4EC] border border-[#2A2623]/15 text-[#2A2623] placeholder-[#6B645D] focus:outline-none focus:border-[#D12126] transition-colors" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="cg-email" className="block text-[13px] uppercase tracking-[0.14em] text-[#6B645D] mb-2">{t.email} *</label>
                <input id="cg-email" type="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-6 py-4 bg-[#F7F4EC] border border-[#2A2623]/15 text-[#2A2623] placeholder-[#6B645D] focus:outline-none focus:border-[#D12126] transition-colors" required />
              </div>
              <div>
                <label htmlFor="cg-phone" className="block text-[13px] uppercase tracking-[0.14em] text-[#6B645D] mb-2">{t.phone} *</label>
                <input id="cg-phone" type="tel" autoComplete="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-6 py-4 bg-[#F7F4EC] border border-[#2A2623]/15 text-[#2A2623] placeholder-[#6B645D] focus:outline-none focus:border-[#D12126] transition-colors" required />
              </div>
            </div>
            <div>
              <label htmlFor="cg-message" className="block text-[13px] uppercase tracking-[0.14em] text-[#6B645D] mb-2">{t.messageLbl} *</label>
              <textarea id="cg-message" placeholder={t.message} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={6} className="w-full px-6 py-4 bg-[#F7F4EC] border border-[#2A2623]/15 text-[#2A2623] placeholder-[#6B645D] focus:outline-none focus:border-[#D12126] transition-colors resize-none" required />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full px-12 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.2em] hover:bg-[#A3181C] transition-colors disabled:opacity-60"
            >
              {sending ? t.sending : t.submit}
            </button>
            {error && <p role="alert" className="text-[15px] text-[#B01B20] text-center">{error}</p>}
            <p className="text-sm text-[#6B645D] text-center">
              {t.formNote}
            </p>
          </form>
          )}
        </div>
      </section>

      {/* Contact */}
      <section className="relative py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-2">{t.qLbl}</p>
            <p className="text-xl text-[#2A2623]">{t.qText}</p>
          </div>
          <a href={CONTACT.emailHref} className="flex items-center gap-3 text-[#6B645D] hover:text-[#D12126] transition-colors">
            <Mail size={20} /> <span>{CONTACT.email}</span>
          </a>
        </div>
      </section>
    </>
  );
}
