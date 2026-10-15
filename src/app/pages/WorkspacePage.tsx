// Workspace Leasing — original layout. Locations, spaces and starting prices
// come from HiLink Workspaces (hilink.vn); live prices and booking stay there.
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Building2, Users, Wifi, Coffee, Mail, Calendar, MapPin, Key, Clock, ServiceIcon } from '../components/Glyph';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { FAQ } from '../components/FAQ';
import { LOCATIONS, WORKSPACE_LINES } from '../data/locations';
import { ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { Contours } from '../components/Contours';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { photo } from '../lib/photo';
import { WORKSPACE_LOCATIONS } from '../data/workspaceLocations';

const AMENITY_ICONS = [<Wifi size={24} />, <Coffee size={24} />, <Users size={24} />, <Building2 size={24} />, <Calendar size={24} />, <Mail size={24} />];
// The photograph of each location (the first is shown).
const LOCATION_PHOTOS: Record<string, string[]> = {
  obc: ['/photos/hbc-lounge.webp', '/photos/hbc-lounge-3.webp', '/photos/hbc-meeting.webp', '/photos/hbc-lounge-4.webp'],
  'nha-chung': ['/photos/nc35-hall.webp', '/photos/nc35-room.webp', '/photos/nc35-desks.webp'],
  'ttt-f15': ['/photos/f15-lounge-cabin.webp', '/photos/f15-lounge.webp', '/photos/f15-office-hi08.webp', '/photos/f15-meeting-pod.webp', '/photos/f15-boardroom.webp'],
  'ttt-f19': ['/photos/f19-window.webp', '/photos/f19-room.webp', '/photos/f19-corridor.webp'],
};
// The three workspace tiers, the addresses in each, and the photograph each is shown with.
const TIER_LOCATIONS = [['ttt-f17', 'ttt-f19'], ['ttt-f15'], ['nha-chung', 'nq49']];
const TIER_PHOTOS = ['/photos/f19-window.webp', '/photos/f15-lounge-wide-xl.webp', '/photos/nc35-long.webp'];
// One glyph for each plan (the order of T.plans): a desk, a key, two people, an address.
const PLAN_ICONS = [<ServiceIcon path="/workspace-leasing" size={34} strokeWidth={1.1} />, <Key size={34} strokeWidth={1.1} />, <Users size={34} strokeWidth={1.1} />, <MapPin size={34} strokeWidth={1.1} />];
const PLAN_SLUGS = ['/solutions/hybrid-work', '/solutions/private-workspaces', '/solutions/corporate-suites', '/solutions/e-office'];

const T = {
  en: {
    meta: 'Private offices, desks, meeting rooms and business addresses at six HiLink locations in central Hanoi.',
    tour: 'Book a Tour', visit: 'Visit HiLink Workspace', view: 'View Locations',
    eyebrow: 'Workspace Leasing', title: 'Work Where You Thrive',
    lead: 'Premium flexible workspace across six Hanoi addresses — private offices, desks, meeting rooms and business addresses.',
    whyTitle: 'Why Choose HiLink', whyLead: 'More than just a desk — a complete business ecosystem',
    amenities: [['1 Gbps Fibre Wi-Fi', 'Fast, reliable connection'], ['Pantry', 'Coffee and tea on every floor'], ['Meeting Rooms', 'Rooms for 4–12 people'], ['Staffed Reception', 'Guests welcomed for you'], ['Event Space', 'Lounges for events'], ['Mail Handling', 'Letters and parcels received']],
    pricingTitle: 'Spaces & Pricing', pricingLead: 'Starting prices from HiLink Workspaces — live prices and booking on hilink.vn',
    popular: 'Popular', start: 'Get Started', from: 'From',
    unsure: 'Not sure which one fits? Tell us the size of your team and we will suggest one.',
    plans: [
      { name: 'Hybrid Work', price: '₫130k', from: true, period: '/day', description: 'Desks in HiLink lounges', features: ['Flex desk — any open seat', 'Dedicated desk — your own seat', 'By the day or the month', '35 Nha Chung · 4 Ton That Tung'] },
      { name: 'Private Office', price: 'On request', from: false, period: '', description: 'Lockable, fitted offices', features: ['Teams of 2–12', 'Floor 15, 4 Ton That Tung', 'Staffed reception', 'Meeting rooms on the same floor'], popular: true },
      { name: 'Meeting Room', price: '₫475k', from: true, period: '/hour', description: 'Meeting rooms & event venues', features: ['Rooms for 4–12 people', 'Booked by the hour', '4 Ton That Tung · 60 Ly Thai To', 'Whole lounges for events'] },
      { name: 'E-office', price: '₫1m', from: true, period: '/month', description: 'Registered business address', features: ['60 Ly Thai To or 35 Nha Chung', 'Register your company here', 'Mail handling', 'Calls handled'] },
    ],
    live: 'See live availability',
    tiersTitle: 'Workspace tiers',
    tiersLead: 'Three ways to work with HiLink, from a floor of your own to a desk for the day.',
    tierRows: ['Best for', 'Spaces', 'Addresses', 'Hours'], opening: 'opening soon', more: 'Details',
    tiers: [
      { name: 'Signature', d: 'Whole floors at 4 Ton That Tung, leased to one tenant and built to suit your team, with the building\'s best views over Dong Da.', best: 'Companies that want a floor of their own', spaces: 'Private floors · Enterprise Solutions', note: 'Enterprise Solutions: fit-out and operations to your brief.', hours: 'Mon–Fri · from 08:00' },
      { name: 'Premium Workspaces', d: 'High-floor workspace with skyline views over Dong Da: scalable private offices, lounges, meeting rooms and an event space on one floor.', best: 'Growing teams that need a fitted office and room to scale', spaces: 'Private offices · Hybrid desks · E-office · Meeting rooms · Event space', note: '', hours: 'Mon–Fri · 08:00–20:00' },
      { name: 'Flex-Spaces', d: 'Boutique addresses in Hoan Kiem and Cua Nam for flexible working: flex and dedicated desks, by the day or the month.', best: 'Small teams, independents and hybrid workers', spaces: 'Flex desks · Dedicated desks · E-office · Event space', note: '', hours: 'Mon–Fri · 08:00–19:00' },
    ],
    locTitle: 'Our Locations', locLead: `${WORKSPACE_LOCATIONS.length} addresses in central Hanoi — Hoan Kiem and Dong Da`,
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
    meta: 'Văn phòng riêng, chỗ ngồi, phòng họp và địa chỉ doanh nghiệp tại sáu địa điểm HiLink giữa trung tâm Hà Nội.',
    tour: 'Đặt lịch tham quan', visit: 'Đến HiLink Workspace', view: 'Xem địa điểm',
    eyebrow: 'Cho thuê văn phòng', title: 'Làm việc ở nơi bạn phát triển',
    lead: 'Không gian làm việc linh hoạt cao cấp tại sáu địa chỉ ở Hà Nội — văn phòng riêng, chỗ ngồi, phòng họp và địa chỉ doanh nghiệp.',
    whyTitle: 'Vì sao chọn HiLink', whyLead: 'Hơn cả một chỗ ngồi — một hệ sinh thái doanh nghiệp trọn vẹn',
    amenities: [['Wi-Fi cáp quang 1 Gbps', 'Kết nối nhanh, ổn định'], ['Pantry', 'Cà phê và trà ở mọi tầng'], ['Phòng họp', 'Phòng cho 4–12 người'], ['Lễ tân trực', 'Đón khách giúp bạn'], ['Không gian sự kiện', 'Lounge cho sự kiện'], ['Nhận thư', 'Nhận thư và bưu phẩm']],
    pricingTitle: 'Không gian & giá', pricingLead: 'Giá khởi điểm của HiLink Workspaces — giá hiện hành và đặt chỗ trên hilink.vn',
    popular: 'Phổ biến', start: 'Bắt đầu', from: 'Từ',
    unsure: 'Chưa rõ lựa chọn nào phù hợp? Cho chúng tôi biết quy mô đội ngũ để được gợi ý.',
    plans: [
      { name: 'Làm việc linh hoạt', price: '₫130k', from: true, period: '/ngày', description: 'Chỗ ngồi trong lounge HiLink', features: ['Flex desk — chỗ trống bất kỳ', 'Dedicated desk — chỗ ngồi cố định', 'Theo ngày hoặc theo tháng', '35 Nhà Chung · 4 Tôn Thất Tùng'] },
      { name: 'Văn phòng riêng', price: 'Liên hệ', from: false, period: '', description: 'Văn phòng có khoá, đủ nội thất', features: ['Cho đội 2–12 người', 'Tầng 15, 4 Tôn Thất Tùng', 'Lễ tân trực', 'Phòng họp cùng tầng'], popular: true },
      { name: 'Phòng họp', price: '₫475k', from: true, period: '/giờ', description: 'Phòng họp & không gian sự kiện', features: ['Phòng cho 4–12 người', 'Đặt theo giờ', '4 Tôn Thất Tùng · 60 Lý Thái Tổ', 'Cả lounge cho sự kiện'] },
      { name: 'E-office', price: '₫1tr', from: true, period: '/tháng', description: 'Địa chỉ đăng ký kinh doanh', features: ['60 Lý Thái Tổ hoặc 35 Nhà Chung', 'Đăng ký công ty tại đây', 'Nhận thư', 'Nghe máy hộ'] },
    ],
    live: 'Xem phòng trống',
    tiersTitle: 'Các hạng Workspace',
    tiersLead: 'Ba cách làm việc cùng HiLink, từ nguyên một sàn riêng đến một chỗ ngồi theo ngày.',
    tierRows: ['Phù hợp với', 'Không gian', 'Địa chỉ', 'Giờ mở cửa'], opening: 'sắp mở', more: 'Chi tiết',
    tiers: [
      { name: 'Signature', d: 'Nguyên sàn tại 4 Tôn Thất Tùng, cho thuê trọn cho một đơn vị và thi công theo nhu cầu của đội bạn, với tầm nhìn đẹp nhất toà nhà ra Đống Đa.', best: 'Doanh nghiệp muốn có một sàn riêng', spaces: 'Sàn riêng · Giải pháp doanh nghiệp', note: 'Giải pháp doanh nghiệp: hoàn thiện và vận hành theo yêu cầu.', hours: 'T2–T6 · từ 08:00' },
      { name: 'Premium Workspaces', d: 'Không gian tầng cao với tầm nhìn toàn cảnh Đống Đa: văn phòng riêng có thể mở rộng, lounge, phòng họp và không gian sự kiện trên cùng một sàn.', best: 'Đội ngũ đang lớn, cần văn phòng đủ nội thất và chỗ để mở rộng', spaces: 'Văn phòng riêng · Chỗ ngồi linh hoạt · E-office · Phòng họp · Không gian sự kiện', note: '', hours: 'T2–T6 · 08:00–20:00' },
      { name: 'Flex-Spaces', d: 'Những địa chỉ boutique tại Hoàn Kiếm và Cửa Nam cho cách làm việc linh hoạt: flex desk và dedicated desk, theo ngày hoặc theo tháng.', best: 'Đội nhỏ, người làm độc lập và làm việc hybrid', spaces: 'Flex desk · Dedicated desk · E-office · Không gian sự kiện', note: '', hours: 'T2–T6 · 08:00–19:00' },
    ],
    locTitle: 'Các địa điểm', locLead: `${WORKSPACE_LOCATIONS.length} địa chỉ giữa trung tâm Hà Nội — Hoàn Kiếm và Đống Đa`,
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
    // Shown once past the hero, and put away again when the footer comes
    // into view, so it never sits over the HiLink mark there.
    const handleScroll = () => {
      const foot = [...document.querySelectorAll('footer')].pop();
      const atFoot = !!foot && foot.getBoundingClientRect().top < window.innerHeight - 40;
      setShowCTA(window.scrollY > 300 && !atFoot);
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
        className={`fixed bottom-8 right-8 z-50 ${showCTA ? '' : 'pointer-events-none'}`}
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
            {...photo('/photos/blog-office-solution.webp')}
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
            <motion.p className="text-xl text-[#F8F6F1] mb-12 leading-relaxed">
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F8F6F1] rounded-full text-[#D12126] mb-4">
                  {AMENITY_ICONS[i]}
                </div>
                <h3 className="serif text-lg mb-2">{name}</h3>
                <p className="text-sm text-[#6B645D]">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workspace tiers: three cards; the details of each slide up on hover. */}
      <section id="tiers" className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-10 lg:mb-14 grid lg:grid-cols-12 gap-x-16 gap-y-6 items-end">
            <div className="lg:col-span-7">
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {t.eyebrow}</p>
              <h2 className="serif text-4xl lg:text-5xl">{t.tiersTitle}</h2>
            </div>
            <p className="lg:col-span-5 text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.tiersLead}</p>
          </div>
          <TierCards tiers={t.tiers} rows={t.tierRows} opening={t.opening} more={t.more} lang={lang} />
        </div>
      </section>

      {/* Plans: four soft panels, the price in large figures; the popular one
          in club green and a little taller. On phones they sit in a row to swipe. */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-12 lg:mb-16">
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.pricingTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.pricingLead}
            </p>
          </motion.div>

          <div data-reveal-group className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
            {t.plans.map((plan, i) => (
              <PlanCard key={plan.name} {...plan} icon={PLAN_ICONS[i]} href={ws(lang, PLAN_SLUGS[i])} popularLabel={t.popular} fromLabel={t.from} cta={t.start} />
            ))}
          </div>

          <div className="mt-8 lg:mt-14 flex flex-col gap-5 rounded-[16px] bg-[#F8F6F1] px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-9">
            <p className="max-w-[60ch] text-[15px] leading-relaxed text-[#4A443F]">{t.unsure}</p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href={tourUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#D12126] px-6 py-3 text-[12.5px] font-semibold uppercase leading-[1.5] tracking-[0.07em] text-white hover:bg-[#A3181C] transition-colors">{t.tour}</a>
              <a href="#locations" className="inline-flex items-center justify-center rounded-full border border-[#2A2623]/35 px-6 py-3 text-[12.5px] font-semibold uppercase leading-[1.5] tracking-[0.07em] text-[#2A2623] hover:border-[#2A2623] hover:bg-[#2A2623] hover:text-white transition-colors">{t.view}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Locations, after themalin.co: the title on the left, the row on the right. */}
      <section id="locations" className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
          <div>
            <h2 className="serif text-4xl lg:text-5xl">{t.locTitle}</h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.locLead}</p>
            <a
              href={ws(lang, '/locations')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#D12126] border-b border-[#D12126]/40 pb-1 hover:border-[#D12126] transition-colors"
            >
              {t.live} <ExternalLink size={13} />
            </a>
          </div>
          <LocationRow
            label={t.locTitle}
            items={WORKSPACE_LOCATIONS.map((loc) => ({
              href: ws(lang, `/locations/${loc.id}`),
              // "4 Ton That Tung · Floor 15": the street as the name, the floor with the line beneath
              name: loc.name.split(' · ')[0],
              place: [loc.name.split(' · ')[1], loc.line ? WORKSPACE_LINES[loc.line].label : 'HiLink'].filter(Boolean).join(' · '),
              image: (LOCATION_PHOTOS[loc.id] ?? [loc.photo])[0],
              soon: loc.comingSoon ? t.soon : undefined,
            }))}
          />
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

type Tier = { name: string; d: string; best: string; spaces: string; note: string; hours: string };

/** The three workspace tiers on one stage. Their names stand side by side
    (with who each suits, on wide screens); beneath, a photograph and the
    facts of the tier on show. It moves on by itself every seven seconds —
    the line over the name fills meanwhile — while it is on screen and the
    pointer is elsewhere, until a tier is chosen by hand. */
/** The tiers as three cards, after the Membership cards on themalin.co: a
    tall photograph over the name and who it suits, in a hairline frame with
    square corners. Pointing at a card (or focusing into it) slides a panel
    up over the photograph with the tier's details; on phones a tap on
    "Details" does the same. */
function TierCards({ tiers, rows, opening, more, lang }: { tiers: Tier[]; rows: string[]; opening: string; more: string; lang: 'en' | 'vi' }) {
  const [open, setOpen] = useState(-1);
  const dt = 'text-[11px] uppercase tracking-[0.16em] text-white/60';
  return (
    <div data-reveal-group className="grid gap-5 md:grid-cols-3 lg:gap-5">
      {tiers.map((tier, k) => {
        const locs = TIER_LOCATIONS[k].map((id) => LOCATIONS.find((l) => l.id === id)!);
        const on = open === k;
        return (
          <article key={tier.name} className="group relative flex flex-col overflow-hidden border border-[#2A2623]/70 bg-white">
            <div className="relative aspect-[451/600] overflow-hidden bg-[#2A2623]">
              <img {...photo(TIER_PHOTOS[k], '(min-width: 768px) 33vw, 100vw')} alt={tier.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
              {/* The details, sliding up over the photograph. */}
              <div
                id={`tier-more-${k}`}
                className={`absolute inset-0 flex flex-col justify-end overflow-y-auto bg-[#1B1412]/92 p-6 text-white transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:p-8 [@media(hover:hover)]:group-hover:translate-y-0 group-focus-within:translate-y-0 ${on ? 'translate-y-0' : 'translate-y-full'}`}
              >
                <p className="serif text-[1.15rem] leading-[1.45] lg:text-[1.3rem]">{tier.d}</p>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className={dt}>{rows[1]}</dt>
                    <dd className="mt-2 text-[14px] leading-relaxed text-white/90">{tier.spaces}</dd>
                  </div>
                  <div>
                    <dt className={dt}>{rows[2]}</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {locs.map((l) => (
                        <a key={l.id} href={ws(lang, `/locations/${l.id}`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/30 py-1 pl-3 pr-2.5 text-[13px] leading-[1.4] hover:border-white transition-colors">
                          {l.name}{l.comingSoon ? ` (${opening})` : ''} <ArrowUpRight size={13} className="shrink-0" />
                        </a>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className={dt}>{rows[3]}</dt>
                    <dd className="mt-2 flex items-center gap-2 text-[14px] text-white/90"><Clock size={14} className="shrink-0 text-[#F06A6E]" /> {tier.hours}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center px-6 py-7 text-center lg:py-9">
              <h3 className="serif hl-tier-name text-[#2A2623]">{tier.name}</h3>
              <p className="mt-2.5 max-w-[30ch] text-[15px] leading-snug text-[#4A443F]">{tier.best}</p>
              <button
                type="button"
                onClick={() => setOpen(on ? -1 : k)}
                aria-expanded={on}
                aria-controls={`tier-more-${k}`}
                className="mt-5 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-[#D12126] [@media(hover:hover)]:hidden"
              >
                {more} <span aria-hidden="true">{on ? '−' : '+'}</span>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** The locations, after "Our Locations" on themalin.co: the title on the
    left, and on the right a row of tall photographs, the name under each,
    three at a time on a laptop. It runs round without end, moving on by
    itself every five seconds while on screen (it waits under the pointer);
    the dots, a swipe or a drag move it by hand. */
function LocationRow({ items, label }: { items: { href: string; name: string; place: string; image: string; soon?: string }[]; label: string }) {
  const n = items.length;
  const [i, setI] = useState(n);
  const [anim, setAnim] = useState(true);
  const [live, setLive] = useState(false);
  const [held, setHeld] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!live || held || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = window.setTimeout(() => { setAnim(true); setI((v) => v + 1); }, 5000);
    return () => window.clearTimeout(t);
  }, [i, live, held]);
  // Past either copy of the list, jump back to the middle one without motion.
  const settle = () => { if (i >= 2 * n || i < n) { setAnim(false); setI((v) => ((v % n) + n) % n + n); } };
  useEffect(() => { if (!anim) { const r = requestAnimationFrame(() => setAnim(true)); return () => cancelAnimationFrame(r); } return undefined; }, [anim]);
  const go = (d: number) => { setAnim(true); setI((v) => v + d); };
  const at = ((i % n) + n) % n;
  return (
    <div
      ref={box}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); touch.current = null; }}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      className="hl-locrow min-w-0"
    >
      <div className="overflow-hidden">
        <ul
          className="hl-locrow__track flex"
          style={{ ['--i' as string]: i, transition: anim ? 'transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)' : 'none' }}
          onTransitionEnd={settle}
        >
          {[...items, ...items, ...items].map((it, k) => (
            <li key={k} className="hl-locrow__cell shrink-0" aria-hidden={k < n || k >= 2 * n}>
              <a href={it.href} target="_blank" rel="noopener noreferrer" tabIndex={k < n || k >= 2 * n ? -1 : 0} className="group block">
                <span className="relative block aspect-[276/500] overflow-hidden bg-[#2A2623]">
                  <img {...photo(it.image, '(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 80vw')} alt="" loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]" />
                  {it.soon && <span className="absolute left-3 top-3 bg-white px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[#2A2623]">{it.soon}</span>}
                </span>
                <span className="mt-4 block text-center text-[14px] font-semibold uppercase tracking-[0.12em] text-[#2A2623] transition-colors group-hover:text-[#D12126]">{it.name}</span>
                <span className="mt-1 block text-center text-[13px] text-[#6B645D]">{it.place}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex justify-end gap-1.5">
        {items.map((it, k) => (
          <button key={it.name} type="button" onClick={() => go(k - at)} aria-label={it.name} aria-current={k === at ? 'true' : undefined} className="grid h-6 w-5 place-items-center">
            <span className={`block h-2 w-2 rounded-full border transition-colors ${k === at ? 'border-[#D12126] bg-[#D12126]' : 'border-[#2A2623]/50'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

/** A plan as a soft panel: a glyph, the name, the price in large figures,
    what it includes, and the way in. The popular one is club green. */
function PlanCard({ name, price, from, period, description, features, popular, href, icon, popularLabel, fromLabel, cta }: {
  name: string;
  price: string;
  from: boolean;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  href: string;
  icon: React.ReactNode;
  popularLabel: string;
  fromLabel: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex w-[80vw] max-w-[340px] shrink-0 snap-center flex-col rounded-[16px] p-7 transition-[translate,box-shadow,background-color] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgba(42,38,35,0.45)] md:w-auto md:max-w-none lg:p-8 ${popular ? 'bg-[#2E3A33] text-[#F8F6F1] lg:-my-4 lg:py-12' : 'bg-[#F8F6F1] text-[#2A2623] hover:bg-[#F3EFE6]'}`}
    >
      <div className="flex min-h-[34px] items-start justify-between gap-4">
        <span className={popular ? 'text-[#F8F6F1]/85' : 'text-[#D12126]'}>{icon}</span>
        {popular && <span className="rounded-full bg-[#F8F6F1] px-3 py-1 text-[11px] font-semibold uppercase leading-[1.5] tracking-[0.1em] text-[#0F0F0F]">{popularLabel}</span>}
      </div>
      <h3 className="serif hl-card-title mt-7">{name}</h3>
      <p className={`mt-2 text-[15px] leading-relaxed ${popular ? 'text-[#F8F6F1]/75' : 'text-[#6B645D]'}`}>{description}</p>
      <div className={`mt-7 border-b pb-7 ${popular ? 'border-[#F8F6F1]/20' : 'border-[#2A2623]/12'}`}>
        <p className={`h-[18px] text-[12px] uppercase leading-[18px] tracking-[0.14em] ${popular ? 'text-[#F8F6F1]/60' : 'text-[#6B645D]'}`}>{from ? fromLabel : ''}</p>
        <p className="mt-1.5 flex items-baseline gap-1.5 whitespace-nowrap">
          <span className="serif lining-nums text-[2.5rem] leading-none">{price}</span>
          {period && <span className={`text-[14px] leading-none ${popular ? 'text-[#F8F6F1]/70' : 'text-[#6B645D]'}`}>{period}</span>}
        </p>
      </div>
      <ul className="mt-7 space-y-3">
        {features.map((feature) => (
          <li key={feature} className={`flex items-start gap-3 text-[14.5px] leading-[1.5] ${popular ? 'text-[#F8F6F1]/90' : 'text-[#2A2623]'}`}>
            <span className={`mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full ${popular ? 'bg-[#F8F6F1]/70' : 'bg-[#D12126]'}`} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-4 pt-9">
        <span className="text-[12.5px] font-semibold uppercase leading-[1.5] tracking-[0.07em]">{cta}</span>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${popular ? 'bg-[#F8F6F1] text-[#0F0F0F] group-hover:bg-white' : 'border border-[#2A2623]/25 group-hover:border-[#D12126] group-hover:bg-[#D12126] group-hover:text-white'}`}>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
