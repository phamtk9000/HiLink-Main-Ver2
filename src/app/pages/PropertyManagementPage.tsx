// Property Management — rebuilt after how property managers set their pages
// out (Savills, Hines, Home Made): the promise with its figures up front;
// what the service covers as a ruled list; the asset classes as tall
// photographs that come into focus; who it is for; the four stages along one
// line; the portfolio as a list of facts; the rental estimate; questions;
// and a closing invitation laid out after foraspace.com, in a colour of its
// own.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { TrendingUp, Users, Shield, BarChart, LayoutDashboard, Coffee, Home, Briefcase, Search, DollarSign, Settings, ClipboardList, Globe } from '../components/Glyph';
import { PropertyRentalForm } from '../components/PropertyRentalForm';
import { FAQ } from '../components/FAQ';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { HeroBg } from '../components/HeroBg';
import { CONTACT, PARTNERS, ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { photo } from '../lib/photo';
import { PropertyDeck } from '../components/PropertyDeck';
import { WORKSPACE_LOCATIONS } from '../data/workspaceLocations';

const SERVICE_ICONS = [<Users size={26} />, <TrendingUp size={26} />, <Shield size={26} />, <BarChart size={26} />];
// (no glyph twice: a house, a floor plan, a cup, a stack of plans)
const TYPE_ICONS = [<Home size={26} />, <LayoutDashboard size={26} />, <Coffee size={26} />, <Briefcase size={26} />];
// What we do for home owners, one glyph each (the order of T.ownerItems).
const OWNER_ICONS = [Search, DollarSign, Settings, ClipboardList, Globe];
// One photograph for each asset class (the order of T.types).
const TYPE_PHOTOS = ['/properties/quarter-house/qh-02.webp', '/photos/f15-office-hi08.webp', '/properties/quarter-house/qh-03.webp', '/photos/f19-window.webp'];

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
    faqSub: 'Everything international owners and tenants ask before working with us.', faqEyebrow: 'FAQs', faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'What types of property do you manage?', answer: 'We manage residential apartments, villas and townhouses, commercial offices and retail, hospitality and short-term rentals, and full developer projects.' },
      { question: 'How are your management fees structured?', answer: 'Fees are tailored to your asset type and scope of service, typically as a percentage of collected rent. We agree on a transparent structure during onboarding with no hidden charges.' },
      { question: 'Do you work with overseas and non-resident owners?', answer: 'Yes. Many of our clients are international investors and non-resident landlords. We provide clear reporting and bilingual communication so distance is never a barrier.' },
      { question: 'How quickly can you onboard a new property?', answer: 'Most properties are fully onboarded within one to two weeks, depending on condition and documentation. We handle the assessment, marketing, and tenant acquisition end to end.' },
      { question: 'How will I track my property’s performance?', answer: 'You receive monthly financial statements and performance analytics.' },
    ],
    ownerEyebrow: 'For home owners', ownerTitle: 'Everything an owner needs, taken care of',
    ownerItems: [
      [['Tenant', 'finding'], 'Marketing, premium screening and lease execution to secure quality tenants.'],
      [['Rent', 'collection'], 'Rent collected and tenant relations handled, day to day.'],
      [['Maintenance', '& inspections'], 'Proactive maintenance, quality contractors and regular property inspections.'],
      [['Monthly', 'reporting'], 'Monthly financial statements and performance analytics.'],
      [['Bilingual,', 'around the clock'], 'Clear, bilingual communication for owners abroad, with 24/7 concierge support.'],
    ] as [string[], string][],
    prev: 'Previous property', next: 'Next property',
    step: 'Step', hotline: 'Hotline', ctaAlt: 'A client at work at the HiLink Business Club',
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
    faqSub: 'Những điều chủ sở hữu và khách thuê quốc tế thường hỏi trước khi làm việc với chúng tôi.', faqEyebrow: 'Câu hỏi', faqTitle: 'Câu hỏi thường gặp',
    faqs: [
      { question: 'HiLink quản lý những loại bất động sản nào?', answer: 'Căn hộ, biệt thự và nhà phố; văn phòng và mặt bằng bán lẻ; khách sạn và cho thuê ngắn hạn; và cả dự án của chủ đầu tư.' },
      { question: 'Phí quản lý được tính thế nào?', answer: 'Phí được điều chỉnh theo loại tài sản và phạm vi dịch vụ, thường tính theo phần trăm tiền thuê thu được. Chúng tôi thống nhất cơ cấu phí minh bạch khi tiếp nhận, không có phí ẩn.' },
      { question: 'HiLink có làm việc với chủ sở hữu ở nước ngoài không?', answer: 'Có. Nhiều khách hàng của chúng tôi là nhà đầu tư quốc tế và chủ nhà không cư trú tại Việt Nam. Báo cáo rõ ràng và giao tiếp song ngữ giúp khoảng cách không còn là trở ngại.' },
      { question: 'Mất bao lâu để tiếp nhận một tài sản mới?', answer: 'Hầu hết tài sản được tiếp nhận hoàn tất trong một đến hai tuần, tuỳ hiện trạng và giấy tờ. Chúng tôi lo trọn khâu đánh giá, quảng bá và tìm khách thuê.' },
      { question: 'Tôi theo dõi hiệu quả tài sản bằng cách nào?', answer: 'Bạn nhận báo cáo tài chính và phân tích hiệu quả hàng tháng.' },
    ],
    ownerEyebrow: 'Dành cho chủ nhà', ownerTitle: 'Mọi việc của chủ nhà, đã có chúng tôi lo',
    ownerItems: [
      [['Tìm', 'khách thuê'], 'Quảng bá, sàng lọc và ký hợp đồng để có khách thuê chất lượng.'],
      [['Thu', 'tiền thuê'], 'Thu tiền thuê và chăm sóc quan hệ khách thuê hằng ngày.'],
      [['Bảo trì', '& kiểm tra'], 'Bảo trì chủ động, nhà thầu chất lượng và kiểm tra định kỳ.'],
      [['Báo cáo', 'hàng tháng'], 'Báo cáo tài chính và phân tích hiệu quả hàng tháng.'],
      [['Song ngữ,', 'hỗ trợ 24/7'], 'Giao tiếp song ngữ rõ ràng cho chủ nhà ở nước ngoài, cùng hỗ trợ concierge 24/7.'],
    ] as [string[], string][],
    prev: 'Bất động sản trước', next: 'Bất động sản tiếp theo',
    step: 'Bước', hotline: 'Hotline', ctaAlt: 'Khách hàng làm việc tại HiLink Business Club',
    ctaTitle: 'Nâng tầm hiệu quả tài sản', ctaLead: 'Cùng trao đổi cách tiếp cận concierge của chúng tôi giúp tối đa hoá giá trị tài sản và giảm bớt nỗi lo cho bạn.', cta: 'Đặt lịch tư vấn',
  },
};

export function PropertyManagementPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);
  const metrics = [
    { value: 95, suffix: '%' },
    { value: WORKSPACE_LOCATIONS.length, suffix: '' },
    { value: PARTNERS.length, suffix: '' },
    { value: 24, suffix: '/7' },
  ];
  const eyebrow = (text: string) => (
    <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {text}</p>
  );

  return (
    <>
      {/* Hero: the promise, and the figures behind it along the foot. */}
      <section className="relative overflow-hidden bg-[#2A2623] text-white">
        <HeroBg image="/photos/f19-room.webp" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pt-24 pb-20 lg:pt-36 lg:pb-28">
          <div className="max-w-4xl">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#F06A6E] mb-7 flex items-center gap-3"><Flag className="text-[#F06A6E]" /> {t.eyebrow}</p>
            <h1 className="serif mb-8">{t.h1[0]}<br />{t.h1[1]}<br />{t.h1[2]}</h1>
            <p className="text-lg lg:text-xl text-[#E9E3DA] mb-10 leading-relaxed max-w-2xl">{t.lead}</p>
            <Link to={l('/contact')} className="inline-flex items-center gap-2 px-10 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-colors group">
              {t.review}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="relative z-10 border-t border-white/15 bg-[#241F1C]/85">
          <dl className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4">
            {metrics.map(({ value, suffix }, i) => (
              <div key={t.metrics[i]} className={`py-7 lg:py-9 ${i % 2 ? 'pl-6 border-l border-white/15' : ''} ${i > 0 ? 'lg:pl-10 lg:border-l lg:border-white/15' : ''} ${i > 1 ? 'border-t border-white/15 lg:border-t-0' : ''}`}>
                <dd className="serif text-[2.5rem] lg:text-[3.25rem] leading-none text-[#F06A6E]"><AnimatedCounter end={value} suffix={suffix} /></dd>
                <dt className="mt-3 text-[12px] uppercase tracking-[0.16em] text-white/65">{t.metrics[i]}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What the service covers: a statement held on the left, the four
          parts as a ruled list on the right. */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-16 gap-y-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              {eyebrow(t.eyebrow)}
              <h2 className="serif hl-display text-[#2A2623]">{t.svcTitle}</h2>
              <span className="mt-8 block h-px w-10 bg-[#D12126]" aria-hidden="true" />
              <p className="serif mt-8 max-w-[30ch] text-[1.35rem] lg:text-[1.6rem] leading-[1.4] text-[#D12126]">{t.svcLead}</p>
            </div>
          </div>
          <dl className="lg:col-span-6 lg:col-start-7 border-t border-[#2A2623]/15">
            {t.services.map(([title, description], i) => (
              <div key={title} className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4.5rem_1fr] gap-x-4 border-b border-[#2A2623]/15 py-8 lg:py-10">
                <span className="pt-1 text-[#D12126]">{SERVICE_ICONS[i]}</span>
                <div>
                  <p className="text-[13px] font-medium tabular-nums tracking-[0.08em] text-[#D12126]">{String(i + 1).padStart(2, '0')}</p>
                  <dt className="serif hl-card-title mt-2 text-[#2A2623]">{title}</dt>
                  <dd className="mt-3 max-w-[48ch] text-[1.0625rem] leading-relaxed text-[#6B645D]">{description}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What we manage: four tall photographs, soft and dim until one is
          under the pointer (or, on a phone, in the middle of the screen). */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-12 lg:mb-16 grid lg:grid-cols-12 gap-x-16 gap-y-6 items-end">
            <div className="lg:col-span-7">
              {eyebrow(t.manageEyebrow)}
              <h2 className="serif hl-display text-[#2A2623]">{t.manageTitle}</h2>
            </div>
            <p className="lg:col-span-5 text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.manageLead}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {t.types.map(([title, desc], i) => (
              <AssetCard key={title} n={i} icon={TYPE_ICONS[i]} title={title} desc={desc} image={TYPE_PHOTOS[i]} />
            ))}
          </div>
        </div>
      </section>

      {/* What we do for home owners, set out after augustcollections.com
          ("Local experts, at your service"): five columns on club green,
          each a fine glyph, a title on two lines and a line of detail. */}
      <section className="relative py-24 lg:py-28 bg-[#2B3A32] text-[#F6EFE6]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#E8B9A6] mb-5 flex items-center gap-2.5"><Flag /> {t.ownerEyebrow}</p>
          <h2 className="serif hl-display max-w-[20ch] text-[#F6EFE6]">{t.ownerTitle}</h2>
          <ul className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-5 gap-x-10 gap-y-14">
            {t.ownerItems.map(([title, d], k) => {
              const Icon = OWNER_ICONS[k];
              return (
                <li key={title.join(' ')}>
                  <span className="block text-[#F6EFE6]/70"><Icon size={44} strokeWidth={1} /></span>
                  <h3 className="serif hl-card-title mt-8 text-[#F6EFE6]">{title[0]}<br />{title[1]}</h3>
                  <p className="mt-5 max-w-[30ch] text-[14px] leading-relaxed text-[#F6EFE6]/80">{d}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* How it works: four stages along one line that fills as you read. */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-6 items-end">
            <div className="lg:col-span-7">
              {eyebrow(t.howEyebrow)}
              <h2 className="serif hl-display text-[#2A2623]">{t.howTitle}</h2>
            </div>
            <p className="lg:col-span-5 text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.howLead}</p>
          </div>
          <div className="relative mt-16 lg:mt-20">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#2A2623]/15 lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto" aria-hidden="true" />
            <div data-scroll-progress className="absolute left-[7px] top-0 bottom-0 w-px origin-top bg-[#D12126] lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-[2px] lg:w-auto lg:origin-left" aria-hidden="true" />
            <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-10">
              {t.steps.map(([title, desc], i) => (
                <li key={title} className="relative pl-10 lg:pl-0">
                  <span className="absolute left-0 lg:static grid h-[15px] w-[15px] place-items-center rounded-full border border-[#D12126] bg-white" aria-hidden="true">
                    <span className="h-[5px] w-[5px] rounded-full bg-[#D12126]" />
                  </span>
                  <p className="lg:mt-8 text-[12px] uppercase tracking-[0.2em] text-[#6B645D]">{t.step} {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="serif hl-card-title mt-2 text-[#2A2623]">{title}</h3>
                  <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-[#6B645D]">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The portfolio: a deck of tall cards (after augustcollections.com);
          the one in the middle opens to show how the property performs. */}
      <section className="relative py-24 lg:py-28 bg-[#F7F4EC] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center justify-center gap-2.5"><Flag /> {t.resEyebrow}</p>
          <h2 className="serif hl-display text-[#2A2623]">{t.propTitle}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.propLead}</p>
        </div>
        <div className="mt-6 lg:mt-8">
          {/* The Quarter House photograph carries a HiHomes mark top-left: it keeps that side, so the mark shows whole. */}
          <PropertyDeck
            view={t.view}
            prev={t.prev}
            next={t.next}
            items={t.properties.map((p) => ({ ...p, to: p.slug ? l(`/workspace/${p.slug}`) : undefined, href: p.href ? ws(lang, p.href) : undefined, crop: p.slug === 'quarter-house' ? 'object-left' : undefined }))}
          />
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

      {/* The closing invitation, laid out after foraspace.com ("We're here to
          help"): the words on the left, heading above and the way in below,
          a photograph on the right — on a sage drawn from the club's
          shutters, a ground no other page uses. */}
      <section className="relative bg-[#CBD3C5] text-[#1F2A23]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 lg:py-12 grid lg:grid-cols-12 gap-x-12 gap-y-10">
          <div className="lg:col-span-6 flex flex-col justify-between gap-12 py-6 lg:py-10">
            <div>
              <p className="text-[13px] uppercase tracking-[0.16em] text-[#1F2A23]">{t.eyebrow}</p>
              <h2 className="serif hl-display mt-5 max-w-[14ch] text-[#1F2A23]">{t.ctaTitle}</h2>
            </div>
            <div>
              <p className="max-w-[40ch] text-[1.0625rem] leading-relaxed text-[#1F2A23]">{t.ctaLead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link to={l('/contact')} className="group inline-flex items-center gap-2 rounded-full bg-[#D12126] px-7 py-3.5 text-[15px] font-medium text-white hover:bg-[#A3181C] transition-colors">
                  {t.cta} <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a href={CONTACT.phoneHref} className="text-[15px] tabular-nums text-[#1F2A23] underline decoration-[#1F2A23]/30 underline-offset-4 hover:decoration-[#1F2A23]">{t.hotline}: {CONTACT.phone}</a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[560px] overflow-hidden rounded-[8px] bg-[#1F2A23]">
            <img loading="lazy" decoding="async" {...photo('/photos/hbc-desk.webp', '(min-width: 1024px) 48vw, 100vw')} alt={t.ctaAlt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}

/** A tall photograph for an asset class: soft and dim at rest, in focus under
    the pointer or keyboard focus; on touch screens, while it crosses the
    middle of the screen. */
function AssetCard({ n, icon, title, desc, image }: { n: number; icon: React.ReactNode; title: string; desc: string; image: string }) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '-36% 0px -36% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <article ref={ref} data-on={on} tabIndex={0} className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-[8px] bg-[#2A2623] text-white outline-none">
      <div className="absolute inset-0 overflow-hidden">
        <img
          loading="lazy"
          decoding="async"
          {...photo(image, '(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 100vw')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-110 blur-[5px] brightness-[0.5] saturate-[0.55] transition-[filter,scale] duration-[900ms] ease-out group-hover:scale-100 group-hover:blur-none group-hover:brightness-100 group-hover:saturate-100 group-focus-visible:scale-100 group-focus-visible:blur-none group-focus-visible:brightness-100 group-focus-visible:saturate-100 group-data-[on=true]:scale-100 group-data-[on=true]:blur-none group-data-[on=true]:brightness-100 group-data-[on=true]:saturate-100"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25" aria-hidden="true" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-7">
        <div className="flex items-start justify-between">
          <span className="text-white">{icon}</span>
          <span className="text-[13px] font-medium tabular-nums tracking-[0.08em] text-white/80">{String(n + 1).padStart(2, '0')}</span>
        </div>
        <div>
          <h3 className="serif hl-card-title text-white">{title}</h3>
          <span className="mt-4 block h-px w-8 bg-[#F06A6E] transition-[width] duration-700 group-hover:w-16 group-data-[on=true]:w-16" aria-hidden="true" />
          <p className="mt-4 text-[15px] leading-relaxed text-white/85">{desc}</p>
        </div>
      </div>
    </article>
  );
}
