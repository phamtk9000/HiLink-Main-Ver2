import { Plane, UtensilsCrossed, Calendar, Key, Briefcase, Sparkles, Mail, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { CONTACT } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';

const SERVICE_META = [
  { icon: <Plane size={26} />, image: '/photos/hbc-host.webp' },
  { icon: <UtensilsCrossed size={26} />, image: '/photos/hbc-fandb.webp' },
  { icon: <Calendar size={26} />, image: '/photos/quarter-club-bar.webp' },
  { icon: <Key size={26} />, image: '/properties/quarter-house/qh-02.webp' },
  { icon: <Briefcase size={26} />, image: '/photos/hbc-meeting.webp' },
  { icon: <Sparkles size={26} />, image: '/photos/hbc-bar.webp' },
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
    submit: 'Submit Enquiry', formNote: 'Your enquiry is handled with complete confidentiality. A member of our team will contact you within 24 hours.',
    qLbl: 'Questions?', qText: 'Our concierge team is available 24/7',
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
    submit: 'Gửi yêu cầu', formNote: 'Yêu cầu của bạn được bảo mật tuyệt đối. Một thành viên đội ngũ sẽ liên hệ với bạn trong vòng 24 giờ.',
    qLbl: 'Câu hỏi?', qText: 'Đội concierge sẵn sàng 24/7',
  },
};

export function ConciergePage() {
  const { lang } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-[#2A2623] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/photos/hbc-lounge-xl.webp"
            alt=""
            className="w-full h-full object-cover opacity-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A2623]/85 via-[#2A2623]/45 to-[#2A2623]/20" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles size={16} className="text-[#F06A6E]" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#F06A6E]">
                {t.eyebrow}
              </p>
            </div>
            <h1
              className="serif text-white mb-8 leading-[1.05]"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', fontWeight: 300 }}
            >
              {t.h1[0]}<br />{t.h1[1]}
            </h1>
            <p className="text-lg md:text-xl text-[#E9E3DA] mb-12 leading-relaxed max-w-2xl font-light">
              {t.lead}
            </p>
            <a
              href="#enquire"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#D12126] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#A3181C] transition-colors"
            >
              <Lock size={16} />
              {t.request}
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-white/20" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">{t.scroll}</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28 lg:py-40 bg-[#F4F0EA]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="serif font-light text-4xl lg:text-5xl mb-8 leading-tight text-[#2A2623]">
            {t.philTitle}
          </h2>
          <p className="text-lg text-[#6B645D] leading-relaxed mb-10">
            {t.phil}
          </p>
          <div className="w-16 h-px bg-[#D12126] mx-auto" />
        </div>
      </section>

      {/* What We Arrange */}
      <section className="py-28 lg:py-40 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4">{t.arrEyebrow}</p>
            <h2 className="serif font-light text-4xl lg:text-5xl mb-6 text-[#2A2623]">{t.arrTitle}</h2>
            <p className="text-lg text-[#6B645D]">
              {t.arrLead}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2623]/10">
            {t.services.map(([title, description], i) => (
              <ServiceCard key={title} icon={SERVICE_META[i].icon} image={SERVICE_META[i].image} title={title} description={description} />
            ))}
          </div>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-28 lg:py-40 bg-[#F4F0EA]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="serif font-light text-4xl lg:text-5xl mb-12 text-[#2A2623]">{t.diffTitle}</h2>
              <div className="divide-y divide-[#2A2623]/10">
                {t.diffs.map(([title, body], i) => (
                  <div key={title} className={i === 0 ? 'pb-8' : i === t.diffs.length - 1 ? 'pt-8' : 'py-8'}>
                    <h3 className="serif text-2xl mb-3 text-[#2A2623]">{title}</h3>
                    <p className="text-[#6B645D] leading-relaxed">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src="/photos/hbc-reception.webp"
                alt={t.diffAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D12126]" />
            </div>
          </div>
        </div>
      </section>

      {/* Membership Enquiry */}
      <section id="enquire" className="py-28 lg:py-40 bg-white">
        <div className="max-w-[760px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <Lock size={36} className="mx-auto mb-8 text-[#D12126]" />
            <h2 className="serif font-light text-4xl lg:text-5xl mb-6 text-[#2A2623]">{t.formTitle}</h2>
            <p className="text-lg text-[#6B645D]">
              {t.formLead}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder={t.name}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 bg-[#F4F0EA] border border-[#2A2623]/15 text-[#2A2623] placeholder-[#9a9a9a] focus:outline-none focus:border-[#D12126] transition-colors"
              required
            />
            <input
              type="email"
              placeholder={t.email}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 bg-[#F4F0EA] border border-[#2A2623]/15 text-[#2A2623] placeholder-[#9a9a9a] focus:outline-none focus:border-[#D12126] transition-colors"
              required
            />
            <input
              type="tel"
              placeholder={t.phone}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-6 py-4 bg-[#F4F0EA] border border-[#2A2623]/15 text-[#2A2623] placeholder-[#9a9a9a] focus:outline-none focus:border-[#D12126] transition-colors"
              required
            />
            <textarea
              placeholder={t.message}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="w-full px-6 py-4 bg-[#F4F0EA] border border-[#2A2623]/15 text-[#2A2623] placeholder-[#9a9a9a] focus:outline-none focus:border-[#D12126] transition-colors resize-none"
              required
            />
            <button
              type="submit"
              className="w-full px-12 py-4 bg-[#D12126] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#A3181C] transition-colors"
            >
              {t.submit}
            </button>
            <p className="text-sm text-[#6B645D] text-center">
              {t.formNote}
            </p>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-[#F4F0EA] border-t border-[#D12126]/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-2">{t.qLbl}</p>
              <p className="text-xl text-[#2A2623]">{t.qText}</p>
            </div>
            <div className="flex items-center gap-8">
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-3 text-[#6B645D] hover:text-[#D12126] transition-colors"
              >
                <Mail size={20} />
                <span>{CONTACT.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ icon, title, description, image }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <motion.div
      className="group bg-white overflow-hidden"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-8">
        <div className="text-[#D12126] mb-4">{icon}</div>
        <h3 className="serif text-2xl mb-3 text-[#2A2623]">{title}</h3>
        <p className="text-[#6B645D] text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
