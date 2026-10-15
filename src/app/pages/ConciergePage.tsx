// Concierge Services — laid out after maslows.com and pavilion.club, with the
// photographs of the two houses where the service is delivered (the HiLink
// Business Club and The Quarter Club). In the order a visitor needs it: a
// hero with the way to send a request; the idea in one line; the six things
// we arrange; how a request is handled; what sets the service apart, on club
// green; the gallery (it moves only when asked); the two houses, each with
// its own way in; and the enquiry.
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { scrollToEl } from '../lib/motion';
import { HeroFade, RuleTitle, Showcase, type Shot } from '../components/Club';
import { CONTACT } from '../data/site';
import { FormSent } from '../components/FormSent';
import { useLang, usePageMeta } from '../lib/i18n';
import { HONEYPOT_PROPS, honeypot, leadError, sendLead } from '../lib/lead';
import { Flag } from '../components/Flag';
import { HeritageCorners } from '../components/HeritageCorners';
import { photo } from '../lib/photo';

const HERO = ['/photos/hbc-reception.webp', '/photos/hbc-lounge-5.webp', '/photos/qc-bar-2.webp'];
// The photograph beside the enquiry form.
const FORM_PHOTO = '/photos/ai-cc-lifestyle.webp';
// One photograph for each thing we arrange (the order of T.services), all
// generated (PHOTO-CREDITS.md); lifestyle in warm sepia seen from above,
// after a reference the user gave.
const SERVICE_PHOTOS = ['/photos/ai-cc-travel.webp', '/photos/ai-cc-dining.webp', '/photos/ai-event-reception.webp', '/photos/ai-sepia-lifestyle.webp', '/photos/ai-cc-assistant.webp', '/photos/ai-cc-bespoke.webp'];
const HOUSE_PHOTOS = ['/photos/hbc-lounge-3.webp', '/photos/qc-room-2.webp'];
// Each house's own place on the Business Club page.
const HOUSE_LINKS = ['/business-club#obc', '/business-club#club-tqk'];
const HBC = 'HiLink Business Club', QC = 'The Quarter Club';
const SHOWCASE: Shot[] = [
  { src: '/photos/hbc-members.webp', caption: HBC }, { src: '/photos/qc-dining.webp', caption: QC }, { src: '/photos/hbc-globe.webp', caption: HBC },
  { src: '/photos/qc-cellar.webp', caption: QC }, { src: '/photos/hbc-mr8.webp', caption: HBC }, { src: '/photos/qc-room.webp', caption: QC }, { src: '/photos/hbc-counter.webp', caption: HBC },
];

const T = {
  en: {
    meta: 'A dedicated HiLink concierge team for travel, dining, events, lifestyle and business support.',
    eyebrow: 'Concierge Services', label: 'HiLink Private Concierge', h1: ['Your Life.', 'Perfected.'],
    lead: 'A dedicated concierge team at your service, 24/7. From the extraordinary to the everyday, we make the impossible, effortless.',
    request: 'Send a private request', scroll: 'Scroll to discover',
    philTitle: 'Time is Your Most Valuable Asset',
    phil: 'Your dedicated concierge manages the details, so you can focus on what matters — and anticipates your needs before you voice them.',
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
    howTitle: 'How it works',
    steps: [
      ['Send your request', 'Tell the concierge team what you need — through the form below, by phone or by email.'],
      ['Consultation & arrangement', 'The team reviews your request, talks the details through with you and proposes suitable arrangements.'],
      ['Confirmation & support', 'Once you confirm, the concierge team coordinates everything and stays with you throughout.'],
    ],
    formTitle: 'Concierge Enquiry', formLead: 'Concierge services are available exclusively to HiLink property clients and select members.',
    name: 'Full Name', email: 'Email Address', phone: 'Phone Number', message: 'Tell us about your needs and how we can assist you...',
    submit: 'Send request', sending: 'Sending…', sentTitle: 'Enquiry received', messageLbl: 'Your request', formNote: 'Your enquiry is handled in complete confidence. A member of our team will be in touch with you.',
    privacy: ['By sending, you agree to our', 'Privacy Policy'],
    formEyebrow: 'Private request',
    explore: 'Explore', prev: 'Previous photograph', next: 'Next photograph',
    housesTitle: 'Where we host you', houseLinks: ['Explore the Business Club', 'Explore The Quarter Club'],
    houses: [
      ['HiLink Business Club', 'Floor 7, 60 Ly Thai To', 'A lounge for businesspeople, companies and the community — a place to host guests, to meet and to work.'],
      ['The Quarter Club', '204 Tran Quang Khai', 'A private club for individuals, where privacy comes first. Membership is by referral.'],
    ],
  },
  vi: {
    meta: 'Đội ngũ concierge riêng của HiLink cho đi lại, ẩm thực, sự kiện, phong cách sống và hỗ trợ công việc.',
    eyebrow: 'Dịch vụ concierge', label: 'HiLink Private Concierge', h1: ['Cuộc sống của bạn.', 'Trọn vẹn.'],
    lead: 'Một đội ngũ concierge riêng phục vụ bạn 24/7. Từ những điều đặc biệt đến việc thường ngày, chúng tôi biến điều khó thành dễ dàng.',
    request: 'Gửi yêu cầu riêng', scroll: 'Cuộn để khám phá',
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
    howTitle: 'Cách concierge làm việc',
    steps: [
      ['Gửi yêu cầu', 'Cho đội concierge biết nhu cầu của bạn — qua biểu mẫu bên dưới, điện thoại hoặc email.'],
      ['Tư vấn & sắp xếp', 'Đội ngũ xem xét yêu cầu, trao đổi chi tiết với bạn và đề xuất phương án phù hợp.'],
      ['Xác nhận & hỗ trợ', 'Khi bạn xác nhận, đội concierge điều phối mọi việc và đồng hành cùng bạn trong suốt quá trình.'],
    ],
    formTitle: 'Gửi yêu cầu Concierge', formLead: 'Dịch vụ concierge dành riêng cho khách hàng bất động sản của HiLink và thành viên được chọn.',
    name: 'Họ và tên', email: 'Địa chỉ email', phone: 'Số điện thoại', message: 'Cho chúng tôi biết nhu cầu của bạn và chúng tôi có thể hỗ trợ thế nào...',
    submit: 'Gửi yêu cầu', sending: 'Đang gửi…', sentTitle: 'Đã nhận yêu cầu', messageLbl: 'Yêu cầu của bạn', formNote: 'Yêu cầu của bạn được bảo mật tuyệt đối. Đội ngũ của chúng tôi sẽ liên hệ lại với bạn.',
    privacy: ['Khi gửi, bạn đồng ý với', 'Chính sách bảo mật'],
    formEyebrow: 'Yêu cầu riêng',
    explore: 'Khám phá', prev: 'Ảnh trước', next: 'Ảnh tiếp theo',
    housesTitle: 'Nơi chúng tôi đón tiếp bạn', houseLinks: ['Khám phá Business Club', 'Khám phá Quarter Club'],
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
          <p className="mb-8 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-white/85"><Flag className="text-[#F06A6E]" /> {t.label}</p>
          <h1 className="serif">{t.h1[0]}<br />{t.h1[1]}</h1>
          <p className="mt-8 text-lg lg:text-xl leading-relaxed text-white/85">{t.lead}</p>
          <a
            href="#enquire"
            onClick={(e) => { const el = document.getElementById('enquire'); if (el) { e.preventDefault(); scrollToEl(el); } }}
            className="mt-10 inline-flex items-center justify-center px-10 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.2em] hover:bg-[#A3181C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors duration-200"
          >{t.request}</a>
        </div>
      </section>

      {/* The idea, in one centred statement, between two corner ornaments. */}
      <section className="relative py-28 lg:py-40 bg-white">
        <HeritageCorners />
        <div className="relative max-w-[720px] mx-auto px-10 sm:px-6 text-center">
          <h2 className="serif hl-statement-lg text-[#2A2623]">{t.philTitle}</h2>
          <p className="mt-6 text-[15px] lg:text-[16px] leading-[1.75] text-[#4A443F]">{t.phil}</p>
        </div>
      </section>

      {/* What we arrange: six photographs with centred captions. */}
      <section className="relative pb-16 sm:pb-24 lg:pb-32 bg-white hl-no-rule">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <RuleTitle>{t.arrTitle}</RuleTitle>
          <p className="mt-6 text-center text-[15px] lg:text-[16px] text-[#6B645D]">{t.arrLead}</p>
          <div className="mt-12 lg:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-14">
            {t.services.map(([title, d], k) => (
              <figure key={title} className="text-center">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#2A2623]">
                  <img loading="lazy" decoding="async" {...photo(SERVICE_PHOTOS[k], '(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw')} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <figcaption className="mx-auto mt-6 max-w-[34ch]">
                  <h3 className="serif text-[1.25rem] lg:text-[1.3125rem] leading-[1.25] text-[#2A2623]">{title}</h3>
                  <p className="mt-2.5 text-[15px] leading-[1.7] text-[#6B645D]">{d}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* How a request is handled: three steps between hairlines. */}
      <section className="relative pb-16 sm:pb-24 lg:pb-32 bg-white hl-no-rule">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <RuleTitle>{t.howTitle}</RuleTitle>
          <ol className="mt-12 lg:mt-14 grid md:grid-cols-3 gap-x-8 gap-y-10">
            {t.steps.map(([title, d], k) => (
              <li key={title} className="border-t border-[#2A2623]/15 pt-6">
                <span className="text-[12px] font-medium tabular-nums tracking-[0.14em] text-[#D12126]">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="serif mt-3 text-[1.25rem] lg:text-[1.375rem] leading-[1.25] text-[#2A2623]">{title}</h3>
                <p className="mt-3 max-w-[38ch] text-[15px] leading-[1.7] text-[#4A443F]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What sets it apart, on club green. */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-[#2E3A33] text-[#F8F6F1]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-16 gap-y-12 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#1B1412]">
            <img loading="lazy" decoding="async" {...photo('/photos/hbc-member.webp', '(min-width: 1024px) 40vw, 100vw')} alt={t.diffAlt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-t border-[#F8F6F1]/30 pt-8">
              <h2 className="serif hl-club-title text-[#F8F6F1]">{t.diffTitle}</h2>
            </div>
            <ol className="mt-10 space-y-10">
              {t.diffs.map(([title, d], k) => (
                <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-x-4">
                  <span className="pt-1.5 text-[13px] font-medium tabular-nums tracking-[0.08em] text-[#E8B9A6]">{String(k + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="serif text-[1.5rem] lg:text-[1.75rem] leading-snug text-[#F8F6F1]">{title}</p>
                    <p className="mt-3 text-[15px] lg:text-[16px] leading-[1.75] text-[#F8F6F1]/85">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The showcase (after the Explore gallery on maslows.com). */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-[#F8F6F1] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 mb-12 lg:mb-16"><RuleTitle>{t.explore}</RuleTitle></div>
        <Showcase shots={SHOWCASE} prev={t.prev} next={t.next} autoplay={false} />
      </section>

      {/* The two houses where the service is delivered, as on foraspace.com
          (About), spread to the full width of the page: two photographs side
          by side with no gap, rounded at the outer corners only, each with
          its name (in the site's serif), a line and the way in laid over the
          foot of it in light type. One above the other on phones. */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <RuleTitle>{t.housesTitle}</RuleTitle>
          <div className="mt-14 flex flex-col md:flex-row lg:mt-16">
            {t.houses.map(([name, , line], k) => (
              <Link
                key={name}
                to={l(HOUSE_LINKS[k])}
                className={`group relative block h-[440px] overflow-hidden bg-[#2A2623] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D12126] md:h-[460px] md:flex-1 lg:h-[560px] ${k === 0 ? 'rounded-t-[8px] md:rounded-r-none md:rounded-l-[8px]' : 'rounded-b-[8px] md:rounded-l-none md:rounded-r-[8px]'}`}
              >
                <img loading="lazy" decoding="async" {...photo(HOUSE_PHOTOS[k], '(min-width: 768px) 50vw, 100vw')} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.03]" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 px-6 pb-8 text-[#F3F0E7] sm:px-10 lg:px-20 lg:pb-10">
                  <span className="serif block text-[1.75rem] leading-[1.2] lg:text-[2.25rem]">{name}</span>
                  <span className="mt-3.5 block max-w-[416px] text-[14px] leading-[1.5] text-[#F3F0E7]/90">{line}</span>
                  <span className="mt-4 inline-flex items-center gap-3 text-[15px] lg:text-[16px]">
                    {t.houseLinks[k]} <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The enquiry, set out like the Contact page: a photograph down one side,
          the full height of the section, and on the other the form — fields
          drawn as a single rule each, a quiet dark button. */}
      <section id="enquire" className="relative bg-white hl-no-rule scroll-mt-24 border-t border-[#2A2623]/10">
        <div className="[display:grid] grid-cols-[minmax(0,1fr)] lg:grid-cols-12">
          <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:col-span-5 lg:min-h-0">
            <img {...photo(FORM_PHOTO, '(min-width: 1024px) 42vw, 100vw')} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            {/* the HiLink mark in white at the foot, as on every form's photograph */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
            <img src="/brand/logo-hilink-lockup.svg" alt="" aria-hidden="true" className="absolute bottom-6 left-6 h-9 w-auto [filter:brightness(0)_invert(1)] opacity-95 lg:bottom-8 lg:left-8 lg:h-11" />
          </div>
          <div className="px-6 py-16 sm:px-10 lg:col-span-7 lg:px-20 lg:py-24 xl:px-28">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126]">{t.formEyebrow}</p>
            <h2 className="serif hl-club-title mt-4 text-[#2A2623]">{t.formTitle}</h2>
            <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.formLead}</p>
            {sent ? (
              <div className="mt-12 border-t border-[#2A2623]/15 pt-10">
                <FormSent title={t.sentTitle} body={t.formNote} onAgain={() => { setFormData({ name: '', email: '', phone: '', message: '' }); setSent(false); }} />
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="relative mt-12 max-w-[640px] space-y-9">
              <input {...HONEYPOT_PROPS} />
              <div>
                <label htmlFor="cg-name" className="block text-[11px] uppercase tracking-[0.18em] text-[#6B645D]">{t.name} *</label>
                <input id="cg-name" type="text" autoComplete="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-0 border-b border-[#2A2623]/25 bg-transparent px-0 pb-3 pt-1 text-[17px] text-[#2A2623] placeholder-[#6B645D]/70 focus:outline-none focus:border-[#2A2623] user-invalid:border-[#B01B20] transition-colors duration-200" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-9 sm:gap-10">
                <div>
                  <label htmlFor="cg-email" className="block text-[11px] uppercase tracking-[0.18em] text-[#6B645D]">{t.email} *</label>
                  <input id="cg-email" type="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-0 border-b border-[#2A2623]/25 bg-transparent px-0 pb-3 pt-1 text-[17px] text-[#2A2623] placeholder-[#6B645D]/70 focus:outline-none focus:border-[#2A2623] user-invalid:border-[#B01B20] transition-colors duration-200" required />
                </div>
                <div>
                  <label htmlFor="cg-phone" className="block text-[11px] uppercase tracking-[0.18em] text-[#6B645D]">{t.phone} *</label>
                  <input id="cg-phone" type="tel" autoComplete="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border-0 border-b border-[#2A2623]/25 bg-transparent px-0 pb-3 pt-1 text-[17px] text-[#2A2623] placeholder-[#6B645D]/70 focus:outline-none focus:border-[#2A2623] user-invalid:border-[#B01B20] transition-colors duration-200" required />
                </div>
              </div>
              <div>
                <label htmlFor="cg-message" className="block text-[11px] uppercase tracking-[0.18em] text-[#6B645D]">{t.messageLbl} *</label>
                <textarea id="cg-message" placeholder={t.message} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full border-0 border-b border-[#2A2623]/25 bg-transparent px-0 pb-3 pt-1 text-[17px] text-[#2A2623] placeholder-[#6B645D]/70 focus:outline-none focus:border-[#2A2623] user-invalid:border-[#B01B20] transition-colors duration-200 resize-none" required />
              </div>
              <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={sending}
                  aria-busy={sending}
                  className="group inline-flex items-center justify-center gap-3 bg-[#2A2623] px-9 py-4 text-[12px] uppercase tracking-[0.2em] text-white hover:bg-[#D12126] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D12126] transition-colors duration-200 disabled:opacity-60"
                >
                  {sending ? t.sending : t.submit} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a href={CONTACT.emailHref} className="text-[14px] text-[#6B645D] hover:text-[#D12126] transition-colors">{CONTACT.email}</a>
              </div>
              {error && <p role="alert" className="text-[15px] text-[#B01B20]">{error}</p>}
              <p className="text-[13px] leading-[1.6] text-[#6B645D]">
                {t.formNote} {t.privacy[0]} <Link to={l('/privacy-policy')} className="underline decoration-[#2A2623]/30 underline-offset-4 hover:text-[#D12126]">{t.privacy[1]}</Link>.
              </p>
            </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
