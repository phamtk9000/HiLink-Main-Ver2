import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { TrendingUp, Users, Shield, BarChart, MapPin, Building2, Calendar, Home, Briefcase, Globe, ClipboardList, FileSignature, Settings, LineChart, LayoutDashboard, Bell } from '../components/Glyph';
import { motion } from 'motion/react';
import { PropertyRentalForm } from '../components/PropertyRentalForm';
import { FAQ } from '../components/FAQ';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { HeroBg } from '../components/HeroBg';
import { LOCATIONS } from '../data/locations';
import { PARTNERS, ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { Candles } from '../components/Candles';

const SERVICE_ICONS = [<Users size={28} />, <TrendingUp size={28} />, <Shield size={28} />, <BarChart size={28} />];
const TYPE_ICONS = [<Home size={26} />, <Building2 size={26} />, <Calendar size={26} />, <Briefcase size={26} />];
const STEP_ICONS = [<ClipboardList size={24} />, <FileSignature size={24} />, <Settings size={24} />, <LineChart size={24} />];

const T = {
  en: {
    meta: 'Concierge-level property management in Hanoi that maximises asset value for international investors.',
    eyebrow: 'Property Management', h1: ['Your Property.', 'Our Passion.', 'Exceptional Results.'],
    lead: 'Concierge-level property management that maximizes asset value and delivers peace of mind for international investors.',
    review: 'Schedule a Portfolio Review',
    svcTitle: 'Full-Service Management', svcLead: 'A personal touch at every stage, from tenant acquisition to financial reporting',
    services: [
      ['Tenant Relations', 'Premium tenant screening, onboarding, and 24/7 concierge support'],
      ['Revenue Optimization', 'Strategic pricing, occupancy management, and yield enhancement'],
      ['Asset Protection', 'Proactive maintenance, quality contractors, and property inspections'],
      ['Transparent Reporting', 'Monthly financial statements, owner portals, and performance analytics'],
    ],
    manageEyebrow: 'What We Manage', manageTitle: 'Every Asset Class, One Standard',
    manageLead: 'From single residences to full developer portfolios, managed with the same concierge care.',
    types: [
      ['Residential', 'Apartments, villas, and townhouses for individual and family living.'],
      ['Commercial', 'Offices, retail units, and mixed-use assets across prime locations.'],
      ['Hospitality & Short-Term', 'Serviced apartments and short-stay rentals with full turnover management.'],
      ['Developer Projects', 'End-to-end management for developers and large project owners.'],
    ],
    serveEyebrow: 'Who We Serve', serveTitle: 'Built for Owners & Occupiers Alike',
    serveLead: 'Whether you hold the asset or occupy it, we tailor our service to your role.',
    owners: 'Owners & Landlords', ownerList: ['Individual landlords', 'Real estate investors & HNW individuals', 'Developers & project owners'],
    tenants: 'Tenants & Occupiers', tenantList: ['Expats & foreign residents', 'Business & corporate tenants'],
    howEyebrow: 'How It Works', howTitle: 'A Clear Path from Onboarding to Returns',
    howLead: 'A structured, four-stage process designed for transparency at every step.',
    steps: [
      ['Onboarding & Assessment', 'We audit your asset, set targets, and agree on a tailored management scope.'],
      ['Tenant Acquisition', 'Premium screening, marketing, and lease execution to secure quality tenants.'],
      ['Day-to-Day Management', 'Maintenance, tenant relations, rent collection, and 24/7 concierge support.'],
      ['Reporting & Optimization', 'Monthly statements, performance reviews, and ongoing yield enhancement.'],
    ],
    propTitle: 'Properties We Manage', propLead: 'Residential and workspace assets run day to day by HiLink',
    view: 'View Property',
    properties: [
      { slug: 'quarter-house', name: 'The Quarter House', location: 'Hoan Kiem, Hanoi', type: 'Boutique Townhouse', image: '/properties/quarter-house/qh-07.webp', stats: [['Units', '4'], ['Occupancy', '95%'], ['Avg Rent', '$4,000/mo']] },
      { href: '/locations/ttt-f19', name: 'Floor 19 · 4 Ton That Tung', location: 'Kim Lien, Dong Da, Hanoi', type: 'Private Floor', image: '/photos/f19-window.webp', stats: [['Floor', '19'], ['Leased to', '1 tenant'], ['Team size', '20–60']] },
      { href: '/locations/ttt-f17', name: 'Floor 17 · 4 Ton That Tung', location: 'Kim Lien, Dong Da, Hanoi', type: 'Private Floor', image: '/photos/f15-office-hi11.webp', stats: [['Zones', '2'], ['Zone 17B', 'Let'], ['Zone 17A', 'Available']] },
      { href: '/locations/ttt-f15', name: 'Floor 15 · 4 Ton That Tung', location: 'Kim Lien, Dong Da, Hanoi', type: 'Premium Workspace', image: '/photos/f15-lounge-cabin.webp', stats: [['Offices', '2–12 pax'], ['Meeting rooms', '4–12 pax'], ['Hours', '08:00–20:00']] },
    ],
    resEyebrow: 'Results & Metrics', resTitle: 'Performance That Speaks for Itself',
    resLead: 'Numbers from the portfolio HiLink runs today.',
    metrics: ['Quarter House Occupancy', 'HiLink Locations', 'Partner Companies', 'Concierge Support'],
    dashSoon: 'Coming Soon', dashTitle: 'Your Owner Dashboard',
    dashLead: 'A secure, real-time portal to track occupancy, income, maintenance, and reporting across your entire portfolio — anytime, from anywhere.',
    dashList: ['Live occupancy & income tracking', 'On-demand financial statements', 'Maintenance request visibility', 'Document vault & lease archive'],
    dashDev: 'In Development', dashDevLead: 'Launching to managed-property owners soon.',
    faqSub: 'Everything international owners and tenants ask before working with us.', faqEyebrow: 'FAQs', faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'What types of property do you manage?', answer: 'We manage residential apartments, villas and townhouses, commercial offices and retail, hospitality and short-term rentals, and full developer projects.' },
      { question: 'How are your management fees structured?', answer: 'Fees are tailored to your asset type and scope of service, typically as a percentage of collected rent. We agree on a transparent structure during onboarding with no hidden charges.' },
      { question: 'Do you work with overseas and non-resident owners?', answer: 'Yes. Many of our clients are international investors and non-resident landlords. We provide clear reporting and bilingual communication so distance is never a barrier.' },
      { question: 'How quickly can you onboard a new property?', answer: 'Most properties are fully onboarded within one to two weeks, depending on condition and documentation. We handle the assessment, marketing, and tenant acquisition end to end.' },
      { question: 'How will I track my property’s performance?', answer: 'You receive monthly financial statements and performance analytics. Our owner dashboard (coming soon) will give you real-time visibility into occupancy, income, and maintenance.' },
    ],
    ctaTitle: 'Elevate Your Property Performance', ctaLead: "Let's discuss how our concierge approach can maximize your asset value and minimize your stress.", cta: 'Schedule a Consultation',
  },
  vi: {
    meta: 'Quản lý bất động sản theo phong cách concierge tại Hà Nội, tối đa hoá giá trị tài sản cho nhà đầu tư quốc tế.',
    eyebrow: 'Quản lý bất động sản', h1: ['Tài sản của bạn.', 'Tâm huyết của chúng tôi.', 'Kết quả vượt trội.'],
    lead: 'Quản lý bất động sản theo tiêu chuẩn concierge, tối đa hoá giá trị tài sản và mang lại sự an tâm cho nhà đầu tư quốc tế.',
    review: 'Đặt lịch đánh giá danh mục',
    svcTitle: 'Quản lý trọn gói', svcLead: 'Chăm chút ở mọi giai đoạn, từ tìm khách thuê đến báo cáo tài chính',
    services: [
      ['Quan hệ khách thuê', 'Sàng lọc, tiếp nhận khách thuê và hỗ trợ concierge 24/7'],
      ['Tối ưu doanh thu', 'Định giá chiến lược, quản lý tỷ lệ lấp đầy và nâng cao lợi suất'],
      ['Bảo vệ tài sản', 'Bảo trì chủ động, nhà thầu chất lượng và kiểm tra định kỳ'],
      ['Báo cáo minh bạch', 'Báo cáo tài chính hàng tháng, cổng thông tin chủ sở hữu và phân tích hiệu quả'],
    ],
    manageEyebrow: 'Chúng tôi quản lý gì', manageTitle: 'Mọi loại tài sản, một tiêu chuẩn',
    manageLead: 'Từ một căn nhà đến cả danh mục của chủ đầu tư, đều được chăm sóc theo cùng tiêu chuẩn concierge.',
    types: [
      ['Nhà ở', 'Căn hộ, biệt thự và nhà phố cho cá nhân và gia đình.'],
      ['Thương mại', 'Văn phòng, mặt bằng bán lẻ và tài sản hỗn hợp tại các vị trí đắc địa.'],
      ['Khách sạn & cho thuê ngắn hạn', 'Căn hộ dịch vụ và cho thuê ngắn ngày với quản lý luân chuyển trọn gói.'],
      ['Dự án của chủ đầu tư', 'Quản lý trọn gói cho chủ đầu tư và chủ dự án lớn.'],
    ],
    serveEyebrow: 'Chúng tôi phục vụ ai', serveTitle: 'Cho cả chủ sở hữu và người sử dụng',
    serveLead: 'Dù bạn sở hữu hay sử dụng tài sản, chúng tôi điều chỉnh dịch vụ theo vai trò của bạn.',
    owners: 'Chủ sở hữu & chủ nhà', ownerList: ['Chủ nhà cá nhân', 'Nhà đầu tư bất động sản & cá nhân có tài sản lớn', 'Chủ đầu tư & chủ dự án'],
    tenants: 'Khách thuê & người sử dụng', tenantList: ['Người nước ngoài sinh sống tại Việt Nam', 'Doanh nghiệp & khách thuê công ty'],
    howEyebrow: 'Quy trình', howTitle: 'Lộ trình rõ ràng từ tiếp nhận đến sinh lời',
    howLead: 'Quy trình bốn bước, minh bạch ở từng bước.',
    steps: [
      ['Tiếp nhận & đánh giá', 'Chúng tôi khảo sát tài sản, đặt mục tiêu và thống nhất phạm vi quản lý phù hợp.'],
      ['Tìm khách thuê', 'Sàng lọc, quảng bá và ký hợp đồng để có khách thuê chất lượng.'],
      ['Quản lý hằng ngày', 'Bảo trì, quan hệ khách thuê, thu tiền thuê và hỗ trợ concierge 24/7.'],
      ['Báo cáo & tối ưu', 'Báo cáo hàng tháng, đánh giá hiệu quả và liên tục nâng cao lợi suất.'],
    ],
    propTitle: 'Bất động sản chúng tôi quản lý', propLead: 'Tài sản nhà ở và không gian làm việc do HiLink vận hành hằng ngày',
    view: 'Xem bất động sản',
    properties: [
      { slug: 'quarter-house', name: 'The Quarter House', location: 'Hoàn Kiếm, Hà Nội', type: 'Nhà phố boutique', image: '/properties/quarter-house/qh-07.webp', stats: [['Số căn', '4'], ['Lấp đầy', '95%'], ['Giá thuê TB', '$4,000/tháng']] },
      { href: '/locations/ttt-f19', name: 'Tầng 19 · 4 Tôn Thất Tùng', location: 'Kim Liên, Đống Đa, Hà Nội', type: 'Sàn riêng', image: '/photos/f19-window.webp', stats: [['Tầng', '19'], ['Cho thuê', '1 khách'], ['Quy mô', '20–60 người']] },
      { href: '/locations/ttt-f17', name: 'Tầng 17 · 4 Tôn Thất Tùng', location: 'Kim Liên, Đống Đa, Hà Nội', type: 'Sàn riêng', image: '/photos/f15-office-hi11.webp', stats: [['Khu', '2'], ['Khu 17B', 'Đã thuê'], ['Khu 17A', 'Còn trống']] },
      { href: '/locations/ttt-f15', name: 'Tầng 15 · 4 Tôn Thất Tùng', location: 'Kim Liên, Đống Đa, Hà Nội', type: 'Premium Workspace', image: '/photos/f15-lounge-cabin.webp', stats: [['Văn phòng', '2–12 người'], ['Phòng họp', '4–12 người'], ['Giờ mở cửa', '08:00–20:00']] },
    ],
    resEyebrow: 'Kết quả & số liệu', resTitle: 'Hiệu quả tự nói lên tất cả',
    resLead: 'Số liệu từ danh mục HiLink đang vận hành.',
    metrics: ['Lấp đầy tại Quarter House', 'Địa điểm HiLink', 'Doanh nghiệp đối tác', 'Hỗ trợ concierge'],
    dashSoon: 'Sắp ra mắt', dashTitle: 'Bảng điều khiển cho chủ sở hữu',
    dashLead: 'Cổng thông tin bảo mật, theo thời gian thực để theo dõi tỷ lệ lấp đầy, doanh thu, bảo trì và báo cáo của toàn bộ danh mục — mọi lúc, mọi nơi.',
    dashList: ['Theo dõi lấp đầy & doanh thu trực tiếp', 'Báo cáo tài chính theo yêu cầu', 'Theo dõi yêu cầu bảo trì', 'Kho tài liệu & hợp đồng thuê'],
    dashDev: 'Đang phát triển', dashDevLead: 'Sớm ra mắt cho chủ sở hữu tài sản do HiLink quản lý.',
    faqSub: 'Những điều chủ sở hữu và khách thuê quốc tế thường hỏi trước khi làm việc với chúng tôi.', faqEyebrow: 'Câu hỏi', faqTitle: 'Câu hỏi thường gặp',
    faqs: [
      { question: 'HiLink quản lý những loại bất động sản nào?', answer: 'Căn hộ, biệt thự và nhà phố; văn phòng và mặt bằng bán lẻ; khách sạn và cho thuê ngắn hạn; và cả dự án của chủ đầu tư.' },
      { question: 'Phí quản lý được tính thế nào?', answer: 'Phí được điều chỉnh theo loại tài sản và phạm vi dịch vụ, thường tính theo phần trăm tiền thuê thu được. Chúng tôi thống nhất cơ cấu phí minh bạch khi tiếp nhận, không có phí ẩn.' },
      { question: 'HiLink có làm việc với chủ sở hữu ở nước ngoài không?', answer: 'Có. Nhiều khách hàng của chúng tôi là nhà đầu tư quốc tế và chủ nhà không cư trú tại Việt Nam. Báo cáo rõ ràng và giao tiếp song ngữ giúp khoảng cách không còn là trở ngại.' },
      { question: 'Mất bao lâu để tiếp nhận một tài sản mới?', answer: 'Hầu hết tài sản được tiếp nhận hoàn tất trong một đến hai tuần, tuỳ hiện trạng và giấy tờ. Chúng tôi lo trọn khâu đánh giá, quảng bá và tìm khách thuê.' },
      { question: 'Tôi theo dõi hiệu quả tài sản bằng cách nào?', answer: 'Bạn nhận báo cáo tài chính và phân tích hiệu quả hàng tháng. Bảng điều khiển cho chủ sở hữu (sắp ra mắt) sẽ cho bạn theo dõi lấp đầy, doanh thu và bảo trì theo thời gian thực.' },
    ],
    ctaTitle: 'Nâng tầm hiệu quả tài sản', ctaLead: 'Cùng trao đổi cách tiếp cận concierge của chúng tôi giúp tối đa hoá giá trị tài sản và giảm bớt nỗi lo cho bạn.', cta: 'Đặt lịch tư vấn',
  },
};

export function PropertyManagementPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);
  const metrics = [
    { value: 95, suffix: '%' },
    { value: LOCATIONS.length, suffix: '' },
    { value: PARTNERS.length, suffix: '' },
    { value: 24, suffix: '/7' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[#361716] text-white">
        <HeroBg image="/photos/f19-room.webp" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-wider text-[#F06A6E] mb-8">{t.eyebrow}</p>
            <h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
              {t.h1[0]}<br />{t.h1[1]}<br />{t.h1[2]}
            </h1>
            <p className="text-xl text-[#E9E3DA] mb-12 leading-relaxed">
              {t.lead}
            </p>
            <Link
              to={l('/contact')}
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors group"
            >
              {t.review}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32 bg-[#F4F0EA]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.svcTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.svcLead}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2623]/15"
          >
            {t.services.map(([title, description], i) => (
              <ServiceCard key={title} icon={SERVICE_ICONS[i]} title={title} description={description} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Manage */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4 flex items-center gap-2.5"><Flag /> {t.manageEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.manageTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.manageLead}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.types.map(([title, desc], i) => (
              <motion.div key={title} className="bg-white p-8" whileHover={{ y: -5 }}>
                <div className="text-[#D12126] mb-4">{TYPE_ICONS[i]}</div>
                <h3 className="serif text-xl mb-3">{title}</h3>
                <p className="text-[#6B645D] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 lg:py-32 bg-[#F4F0EA]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4 flex items-center gap-2.5"><Flag /> {t.serveEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.serveTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.serveLead}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 lg:p-12">
              <div className="text-[#D12126] mb-6"><Briefcase size={28} /></div>
              <h3 className="serif text-2xl lg:text-3xl mb-6">{t.owners}</h3>
              <ul className="space-y-4">
                {t.ownerList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#444] text-[16px]">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D12126] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#361716] text-white p-10 lg:p-12">
              <div className="text-[#D12126] mb-6"><Globe size={28} /></div>
              <h3 className="serif text-2xl lg:text-3xl mb-6">{t.tenants}</h3>
              <ul className="space-y-4">
                {t.tenantList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#E9E3DA] text-[16px]">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D12126] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4 flex items-center gap-2.5"><Flag /> {t.howEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.howTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.howLead}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.steps.map(([title, desc], i) => (
              <motion.div key={title} className="bg-[#F4F0EA] p-8" whileHover={{ y: -5 }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#D12126]">{STEP_ICONS[i]}</span>
                  <span className="serif text-3xl text-[#2A2623]/10">0{i + 1}</span>
                </div>
                <h3 className="serif text-xl mb-3">{title}</h3>
                <p className="text-[#6B645D] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties We Manage */}
      <section className="py-24 lg:py-32 bg-[#F4F0EA]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.propTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.propLead}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
          >
            {t.properties.map((property) => (
              <PropertyCard
                key={property.name}
                {...property}
                to={property.slug ? l(`/workspace/${property.slug}`) : undefined}
                href={property.href ? ws(lang, property.href) : undefined}
                viewLabel={t.view}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results & Metrics */}
      <section className="py-24 lg:py-32 bg-white text-[#2A2623]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4 flex items-center gap-2.5"><Flag /> {t.resEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.resTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.resLead}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2623]/10">
            {metrics.map(({ value, suffix }, i) => (
              <div key={t.metrics[i]} className="bg-white p-10 text-center">
                <div className="serif text-5xl lg:text-6xl text-[#D12126] mb-3">
                  <AnimatedCounter end={value} suffix={suffix} />
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#6B645D]">{t.metrics[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner Dashboard (Coming Soon) */}
      <section className="py-24 lg:py-32 bg-[#F4F0EA]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div>
              <span className="inline-block px-4 py-1.5 bg-[#D12126]/15 text-[#D12126] text-[11px] uppercase tracking-[0.2em] mb-6">
                {t.dashSoon}
              </span>
              <h2 className="serif text-4xl lg:text-5xl mb-6">{t.dashTitle}</h2>
              <p className="text-lg text-[#6B645D] mb-8 leading-relaxed">
                {t.dashLead}
              </p>
              <ul className="space-y-4">
                {t.dashList.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[#444] text-[16px]">
                    <Bell size={16} className="text-[#D12126] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="relative aspect-[4/3] bg-[#EDE7DF] flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center px-8">
                <LayoutDashboard size={64} className="text-[#D12126] mx-auto mb-6" />
                <p className="serif text-2xl text-[#2A2623] mb-2">{t.dashDev}</p>
                <p className="text-sm text-[#6B645D]">{t.dashDevLead}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Property Rental Estimate Form */}
      <PropertyRentalForm />

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
        <Candles />
        <motion.div
          className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center"
        >
          <h2 className="serif text-4xl lg:text-5xl mb-8">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            {t.ctaLead}
          </p>
          <Link
            to={l('/contact')}
            className="inline-block px-12 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors"
          >
            {t.cta}
          </Link>
        </motion.div>
      </section>
    </>
  );
}

function ServiceCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="bg-[#F4F0EA] p-8"
      whileHover={{ y: -5 }}
    >
      <div className="text-[#D12126] mb-4">{icon}</div>
      <h3 className="serif text-xl mb-3">{title}</h3>
      <p className="text-[#6B645D] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function PropertyCard({ name, location, type, stats, image, to, href, viewLabel }: {
  name: string;
  location: string;
  type: string;
  stats: string[][];
  image: string;
  to?: string;
  href?: string;
  viewLabel: string;
}) {
  const linked = Boolean(to || href);
  const inner = (
    <motion.div
      className={`group bg-white overflow-hidden ${linked ? 'cursor-pointer' : ''}`}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img loading="lazy" decoding="async"
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute top-6 right-6 px-4 py-2 bg-white/95 text-xs uppercase tracking-wider">
          {type}
        </div>
        {linked && (
          <div className="absolute inset-0 bg-[#2A2623]/0 group-hover:bg-[#2A2623]/20 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-3 bg-[#D12126] text-white text-xs uppercase tracking-widest">
              {viewLabel}
            </span>
          </div>
        )}
      </div>
      <div className="p-8">
        <h3 className="serif text-3xl mb-2">{name}</h3>
        <div className="flex items-center gap-2 text-[#D12126] mb-6">
          <MapPin size={16} />
          <span className="text-sm">{location}</span>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2A2623]/10">
          {stats.map(([label, value]) => (
            <div key={label}>
              <div className="text-sm text-[#6B645D] mb-1">{label}</div>
              <div className="serif text-lg">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  if (to) return <Link to={to}>{inner}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return inner;
}
