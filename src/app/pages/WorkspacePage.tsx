// Workspace Leasing — original layout. Locations, spaces and starting prices
// come from HiLink Workspaces (hilink.vn); live prices and booking stay there.
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { Building2, Users, Wifi, Coffee, Mail, Calendar, MapPin } from '../components/Glyph';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { FAQ } from '../components/FAQ';
import { LOCATIONS, WORKSPACE_LINES } from '../data/locations';
import { ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { Contours } from '../components/Contours';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { photo } from '../lib/photo';

const AMENITY_ICONS = [<Wifi size={24} />, <Coffee size={24} />, <Users size={24} />, <Building2 size={24} />, <Calendar size={24} />, <Mail size={24} />];
const SPACE_PHOTOS = ['/photos/f15-office-hi08.webp', '/photos/f15-office-hi11.webp', '/photos/f15-meeting-pod.webp', '/photos/f15-boardroom.webp', '/photos/f15-lounge.webp', '/photos/hbc-meeting.webp'];
const PLAN_SLUGS = ['/solutions/hybrid-work', '/solutions/private-workspaces', '/solutions/corporate-suites', '/solutions/e-office'];

const HOURS_VI: [RegExp, string][] = [[/Mon/g, 'T2'], [/Fri/g, 'T6'], [/Sat/g, 'T7'], [/Sun/g, 'CN'], [/late/g, 'khuya']];

const T = {
  en: {
    meta: 'Private offices, desks, meeting rooms and business addresses at seven HiLink locations in central Hanoi.',
    tour: 'Book a Tour', visit: 'Visit HiLink Workspace', view: 'View Locations',
    eyebrow: 'Workspace Leasing', title: 'Work Where You Thrive',
    lead: 'Premium flexible workspaces across seven Hanoi addresses — from a lakeside business club at 60 Ly Thai To to whole floors high above Dong Da at 4 Ton That Tung. Private offices, desks, meeting rooms and business addresses.',
    whyTitle: 'Why Choose HiLink', whyLead: 'More than just a desk — a complete business ecosystem',
    amenities: [['1 Gbps Fibre Wi-Fi', 'Fast, reliable connection'], ['Pantry', 'Coffee and tea on every floor'], ['Meeting Rooms', 'Rooms for 4–12 people'], ['Staffed Reception', 'Guests welcomed for you'], ['Event Space', 'Lounges for events'], ['Mail Handling', 'Letters and parcels received']],
    pricingTitle: 'Spaces & Pricing', pricingLead: 'Starting prices from HiLink Workspaces — live prices and booking on hilink.vn',
    popular: 'Popular', start: 'Get Started',
    plans: [
      { name: 'Hybrid Work', price: 'From ₫130k', period: '/day', description: 'Desks in HiLink lounges', features: ['Flex desk — any open seat', 'Dedicated desk — your own seat', 'By the day or the month', '35 Nha Chung · 4 Ton That Tung'] },
      { name: 'Private Office', price: 'On request', period: '', description: 'Lockable, fitted offices', features: ['Teams of 2–12', 'Floor 15, 4 Ton That Tung', 'Staffed reception', 'Meeting rooms on the same floor'], popular: true },
      { name: 'Meeting Room', price: 'From ₫475k', period: '/hour', description: 'Meeting rooms & event venues', features: ['Rooms for 4–12 people', 'Booked by the hour', '4 Ton That Tung · 60 Ly Thai To', 'Whole lounges for events'] },
      { name: 'E-office', price: 'From ₫1m', period: '/month', description: 'Registered business address', features: ['60 Ly Thai To or 35 Nha Chung', 'Register your company here', 'Mail handling', 'Calls handled'] },
    ],
    spacesEyebrow: `${LOCATIONS.length} Locations · Ha Noi`, spacesTitle: 'Featured Spaces', live: 'See live availability',
    spaces: [
      ['Private Office Hi.08', 'Private Office', 'Floor 15 · 4 Ton That Tung'],
      ['Private Office Hi.11', 'Private Office', 'Floor 15 · 4 Ton That Tung'],
      ['Glass Meeting Pod', 'Meeting Room', 'Floor 15 · 4 Ton That Tung'],
      ['Meeting Room 10', 'Meeting Room', 'Floor 15 · 4 Ton That Tung'],
      ['Lounge Desk', 'Hybrid Work', 'Floor 15 · 4 Ton That Tung'],
      ['Business Club Meeting Room', 'Meeting Room', 'Floor 7 · 60 Ly Thai To'],
    ],
    locTitle: 'Our Locations', locLead: `${LOCATIONS.length} addresses in central Hanoi — Hoan Kiem and Dong Da`,
    available: 'Now Available', soon: 'Coming Soon', type: 'Brand', hours: 'Hours', explore: 'Explore live availability',
    trusted: 'Trusted by Leading Companies',
    faqSub: 'What members most often ask before joining a HiLink workspace.', faqEyebrow: 'FAQs', faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'Can I book a tour before committing?', answer: 'Absolutely. Book a tour of any location on hilink.vn and our team will walk you through the spaces and options with no obligation.' },
      { question: 'What workspace types do you offer?', answer: 'Flex and dedicated desks, private offices, meeting rooms, event space, E-office business addresses and whole private floors.' },
      { question: 'What is included?', answer: 'It depends on the plan and location. Typical inclusions are fibre Wi-Fi, a staffed reception, pantry and access to meeting rooms — each plan on hilink.vn lists exactly what is included.' },
      { question: 'Where can I see prices and availability?', answer: 'Each location page on hilink.vn shows current prices and the spaces available, and lets you book online.' },
      { question: 'Can you accommodate larger teams?', answer: 'Yes. HiLink Enterprise Solutions fits out whole floors at 4 Ton That Tung to your brief and runs them for you.' },
    ],
    ctaTitle: 'Ready to Find Your Perfect Workspace?', ctaLead: 'Book a tour of any of our locations. Our team will help you find the ideal solution for your business.', ctaBtn: 'Schedule a Tour',
  },
  vi: {
    meta: 'Văn phòng riêng, chỗ ngồi, phòng họp và địa chỉ doanh nghiệp tại bảy địa điểm HiLink giữa trung tâm Hà Nội.',
    tour: 'Đặt lịch tham quan', visit: 'Đến HiLink Workspace', view: 'Xem địa điểm',
    eyebrow: 'Cho thuê văn phòng', title: 'Làm việc ở nơi bạn phát triển',
    lead: 'Không gian làm việc linh hoạt cao cấp tại bảy địa chỉ ở Hà Nội — từ câu lạc bộ doanh nhân bên hồ tại 60 Lý Thái Tổ đến những sàn nguyên tầng trên cao tại 4 Tôn Thất Tùng. Văn phòng riêng, chỗ ngồi, phòng họp và địa chỉ doanh nghiệp.',
    whyTitle: 'Vì sao chọn HiLink', whyLead: 'Hơn cả một chỗ ngồi — một hệ sinh thái doanh nghiệp trọn vẹn',
    amenities: [['Wi-Fi cáp quang 1 Gbps', 'Kết nối nhanh, ổn định'], ['Pantry', 'Cà phê và trà ở mọi tầng'], ['Phòng họp', 'Phòng cho 4–12 người'], ['Lễ tân trực', 'Đón khách giúp bạn'], ['Không gian sự kiện', 'Lounge cho sự kiện'], ['Nhận thư', 'Nhận thư và bưu phẩm']],
    pricingTitle: 'Không gian & giá', pricingLead: 'Giá khởi điểm của HiLink Workspaces — giá hiện hành và đặt chỗ trên hilink.vn',
    popular: 'Phổ biến', start: 'Bắt đầu',
    plans: [
      { name: 'Làm việc linh hoạt', price: 'Từ ₫130k', period: '/ngày', description: 'Chỗ ngồi trong lounge HiLink', features: ['Flex desk — chỗ trống bất kỳ', 'Dedicated desk — chỗ ngồi cố định', 'Theo ngày hoặc theo tháng', '35 Nhà Chung · 4 Tôn Thất Tùng'] },
      { name: 'Văn phòng riêng', price: 'Liên hệ', period: '', description: 'Văn phòng có khoá, đủ nội thất', features: ['Cho đội 2–12 người', 'Tầng 15, 4 Tôn Thất Tùng', 'Lễ tân trực', 'Phòng họp cùng tầng'], popular: true },
      { name: 'Phòng họp', price: 'Từ ₫475k', period: '/giờ', description: 'Phòng họp & không gian sự kiện', features: ['Phòng cho 4–12 người', 'Đặt theo giờ', '4 Tôn Thất Tùng · 60 Lý Thái Tổ', 'Cả lounge cho sự kiện'] },
      { name: 'E-office', price: 'Từ ₫1tr', period: '/tháng', description: 'Địa chỉ đăng ký kinh doanh', features: ['60 Lý Thái Tổ hoặc 35 Nhà Chung', 'Đăng ký công ty tại đây', 'Nhận thư', 'Nghe máy hộ'] },
    ],
    spacesEyebrow: `${LOCATIONS.length} địa điểm · Hà Nội`, spacesTitle: 'Không gian nổi bật', live: 'Xem phòng trống',
    spaces: [
      ['Văn phòng riêng Hi.08', 'Văn phòng riêng', 'Tầng 15 · 4 Tôn Thất Tùng'],
      ['Văn phòng riêng Hi.11', 'Văn phòng riêng', 'Tầng 15 · 4 Tôn Thất Tùng'],
      ['Phòng họp kính', 'Phòng họp', 'Tầng 15 · 4 Tôn Thất Tùng'],
      ['Phòng họp 10', 'Phòng họp', 'Tầng 15 · 4 Tôn Thất Tùng'],
      ['Lounge Desk', 'Làm việc linh hoạt', 'Tầng 15 · 4 Tôn Thất Tùng'],
      ['Phòng họp Business Club', 'Phòng họp', 'Tầng 7 · 60 Lý Thái Tổ'],
    ],
    locTitle: 'Các địa điểm', locLead: `${LOCATIONS.length} địa chỉ giữa trung tâm Hà Nội — Hoàn Kiếm và Đống Đa`,
    available: 'Đang mở', soon: 'Sắp mở', type: 'Dòng sản phẩm', hours: 'Giờ mở cửa', explore: 'Xem phòng trống',
    trusted: 'Đồng hành cùng các doanh nghiệp',
    faqSub: 'Những câu hỏi thường gặp trước khi chọn không gian HiLink.', faqEyebrow: 'Câu hỏi', faqTitle: 'Câu hỏi thường gặp',
    faqs: [
      { question: 'Tôi có thể tham quan trước khi quyết định không?', answer: 'Được. Đặt lịch tham quan bất kỳ địa điểm nào trên hilink.vn, đội ngũ sẽ dẫn bạn xem không gian và các lựa chọn, không ràng buộc.' },
      { question: 'HiLink có những loại không gian nào?', answer: 'Flex desk và dedicated desk, văn phòng riêng, phòng họp, không gian sự kiện, địa chỉ doanh nghiệp E-office và nguyên sàn riêng.' },
      { question: 'Không gian bao gồm những gì?', answer: 'Tuỳ gói và địa điểm. Thường gồm Wi-Fi cáp quang, lễ tân trực, pantry và phòng họp — mỗi gói trên hilink.vn ghi rõ những gì đi kèm.' },
      { question: 'Xem giá và phòng trống ở đâu?', answer: 'Trang của từng địa điểm trên hilink.vn hiển thị giá hiện hành và không gian còn trống, và cho phép đặt chỗ trực tuyến.' },
      { question: 'HiLink có đáp ứng đội ngũ lớn không?', answer: 'Có. Giải pháp doanh nghiệp của HiLink hoàn thiện nguyên sàn tại 4 Tôn Thất Tùng theo yêu cầu và vận hành giúp bạn.' },
    ],
    ctaTitle: 'Sẵn sàng tìm không gian phù hợp?', ctaLead: 'Đặt lịch tham quan bất kỳ địa điểm nào. Đội ngũ sẽ giúp bạn tìm giải pháp lý tưởng cho doanh nghiệp.', ctaBtn: 'Đặt lịch tham quan',
  },
};

export function WorkspacePage() {
  const { lang } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);
  const [showCTA, setShowCTA] = useState(false);
  const tourUrl = ws(lang, '/book-a-tour');

  useEffect(() => {
    const handleScroll = () => {
      setShowCTA(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showCTA ? 0 : 100, opacity: showCTA ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <a
          href={tourUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors shadow-2xl"
        >
          <Calendar size={18} />
          {t.tour}
        </a>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-[#2A2623] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            {...photo('/photos/f15-lounge-wide-xl.webp')}
            alt=""
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A2623]/80 via-[#2A2623]/45 to-[#2A2623]/15" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 py-24 w-full">
          <motion.div className="max-w-4xl">
            <motion.p className="text-sm uppercase tracking-wider text-[#F06A6E] mb-8">
              {t.eyebrow}
            </motion.p>
            <motion.h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
              {t.title}
            </motion.h1>
            <motion.p className="text-xl text-[#E9E3DA] mb-12 leading-relaxed">
              {t.lead}
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4">
              <a
                href={tourUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors group"
              >
                <Calendar size={18} />
                {t.tour}
              </a>
              <a
                href={ws(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors group"
              >
                <ExternalLink size={18} />
                {t.visit}
              </a>
              <a
                href="#locations"
                className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-sm uppercase tracking-wider hover:bg-white hover:text-[#2A2623] transition-colors"
              >
                {t.view}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why HiLink Workspaces */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.whyTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.whyLead}
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {t.amenities.map(([name, description], i) => (
              <motion.div
                key={name}
                className="text-center"
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FBECEC] rounded-full text-[#D12126] mb-4">
                  {AMENITY_ICONS[i]}
                </div>
                <h3 className="serif text-lg mb-2">{name}</h3>
                <p className="text-sm text-[#6B645D]">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.pricingTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.pricingLead}
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.plans.map((plan, i) => (
              <PlanCard key={plan.name} {...plan} href={ws(lang, PLAN_SLUGS[i])} popularLabel={t.popular} cta={t.start} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="relative py-24 lg:py-32 bg-white text-[#2A2623] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-4 flex items-center gap-3">
                <Flag className="text-[#D12126]" /> {t.spacesEyebrow}
              </p>
              <h2 className="serif text-4xl lg:text-5xl">{t.spacesTitle}</h2>
            </div>
            <a
              href={ws(lang, '/locations')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#D12126] border-b border-[#D12126]/40 pb-1 hover:border-[#D12126] transition-colors"
            >
              {t.live} <ExternalLink size={13} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.spaces.map(([name, type, floor], i) => (
              <a
                key={name}
                href={ws(lang, '/locations')}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden bg-white border border-[#2A2623]/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
                  <img loading="lazy" decoding="async" {...photo(SPACE_PHOTOS[i])} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 text-[12px] uppercase tracking-[0.16em] px-2.5 py-1 bg-[#D12126] text-white">{type}</span>
                </div>
                <div className="flex items-end justify-between p-5">
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-1.5">{floor}</p>
                    <h3 className="serif text-xl">{name}</h3>
                  </div>
                  <ExternalLink size={16} className="text-[#D12126] shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.locTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.locLead}
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-8">
            {LOCATIONS.map((loc) => (
              <LocationCard
                key={loc.id}
                href={ws(lang, `/locations/${loc.id}`)}
                name={loc.name}
                address={loc.address}
                city={loc.intro[lang]}
                type={loc.line ? WORKSPACE_LINES[loc.line].label : 'HiLink'}
                capacity={lang === 'vi' ? HOURS_VI.reduce((s, [re, v]) => s.replace(re, v), loc.hours) : loc.hours}
                available={!loc.comingSoon}
                image={loc.photo}
                labels={{ available: t.available, soon: t.soon, type: t.type, capacity: t.hours, explore: t.explore }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="relative py-16 bg-white border-y border-[#2A2623]/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-center text-sm uppercase tracking-wider text-[#6B645D] mb-4">
            {t.trusted}
          </p>
          <PartnerMarquee />
        </div>
      </section>

      {/* FAQs */}
      <FAQ
        items={t.faqs}
        eyebrow={t.faqEyebrow}
        title={t.faqTitle}
        subtitle={t.faqSub}
        background="white"
      />

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 bg-[#361716] text-white overflow-hidden">
        <Contours />
        <motion.div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="serif text-4xl lg:text-5xl mb-8">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            {t.ctaLead}
          </p>
          <a
            href={tourUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-12 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors"
          >
            <Calendar size={18} />
            {t.ctaBtn}
          </a>
        </motion.div>
      </section>
    </>
  );
}

function PlanCard({ name, price, period, description, features, popular, href, popularLabel, cta }: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  href: string;
  popularLabel: string;
  cta: string;
}) {
  return (
    <motion.div
      className={`bg-white p-8 relative ${popular ? 'ring-2 ring-[#D12126]' : 'border border-[#2A2623]/10'}`}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D12126] text-white text-xs uppercase tracking-wider">
          {popularLabel}
        </div>
      )}
      <h3 className="serif text-2xl mb-2">{name}</h3>
      <p className="text-sm text-[#6B645D] mb-6">{description}</p>
      <div className="mb-8">
        <span className="serif text-4xl">{price}</span>
        <span className="text-[#6B645D]">{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <Check size={16} className="text-[#D12126] flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center px-6 py-3 bg-[#361716] text-white text-sm uppercase tracking-wider hover:bg-[#D12126] transition-colors"
      >
        {cta}
      </a>
    </motion.div>
  );
}

function LocationCard({ href, name, address, city, type, capacity, available, image, labels }: {
  href: string;
  name: string;
  address: string;
  city: string;
  type: string;
  capacity: string;
  available: boolean;
  image: string;
  labels: { available: string; soon: string; type: string; capacity: string; explore: string };
}) {
  return (
    <motion.div
      className="group bg-[#F4F0EA] overflow-hidden"
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[8px]">
          <motion.img loading="lazy" decoding="async"
            {...photo(image)}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute top-6 right-6">
            <div className={`px-4 py-2 text-xs uppercase tracking-wider ${
              available ? 'bg-[#D12126] text-white' : 'bg-[#6B645D] text-white'
            }`}>
              {available ? labels.available : labels.soon}
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="text-sm text-[#6B645D] mb-3">{city}</div>
          <h3 className="serif text-3xl mb-4">{name}</h3>
          <div className="flex items-start gap-2 text-[#6B645D] mb-4">
            <MapPin size={16} className="flex-shrink-0 mt-1" />
            <span className="text-sm">{address}</span>
          </div>
          <div className="flex items-center justify-between gap-6 pt-6 border-t border-[#2A2623]/10">
            <div>
              <div className="text-xs text-[#6B645D] mb-1">{labels.type}</div>
              <div className="text-sm">{type}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#6B645D] mb-1">{labels.capacity}</div>
              <div className="text-sm">{capacity}</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#2A2623] group-hover:text-[#D12126] group-hover:gap-4 transition-all">
              {labels.explore} <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
