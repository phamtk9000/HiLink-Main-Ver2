import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Factory, ClipboardList, Handshake, Settings, LineChart, ServiceIcon } from '../components/Glyph';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { Candles } from '../components/Candles';
import { photo } from '../lib/photo';

const META = [
  { icon: <ServiceIcon path="/property-management" size={30} />, path: '/property-management', image: '/photos/f19-window.webp' },
  { icon: <ServiceIcon path="/workspace-leasing" size={30} />, path: '/workspace-leasing', image: '/photos/f15-reception.webp' },
  { icon: <ServiceIcon path="/business-services" size={30} />, path: '/business-services', image: '/photos/hbc-client-meeting.webp' },
  { icon: <ServiceIcon path="/concierge-services" size={30} />, path: '/concierge-services', image: '/photos/hbc-host.webp' },
  // No HiLink photograph of an industrial site yet — shown as a dark panel.
  { icon: <ServiceIcon path="/industrial-logistics" size={30} />, path: '/industrial-logistics', image: '' },
];

const STEP_ICONS = [<ClipboardList size={22} />, <Handshake size={22} />, <Settings size={22} />, <LineChart size={22} />];

const T = {
  en: {
    meta: 'Property management, workspace leasing, business services, concierge and industrial & logistics — one partner across the full property lifecycle.',
    eyebrow: 'Our Solutions', h1a: 'One partner across the', h1b: 'full property lifecycle',
    lead: 'From management and workspace to advisory and concierge, HiLink brings every solution international clients need to invest, operate, and grow in Vietnam — under one roof.',
    introEyebrow: 'Everything under one roof', introTitle: 'Five solutions, one standard of excellence',
    intro: 'Most clients start with a single need — a property to manage, an office to lease, a company to set up. They stay because HiLink can handle everything that comes next. Explore each solution below, or tell us your goals and we will compose the right combination for you.',
    explore: 'Explore',
    solutions: [
      { title: 'Property Management', tag: 'Own with confidence', description: 'End-to-end management for residential, commercial, hospitality, and short-term rental assets — tenant acquisition, maintenance, rent collection, and transparent owner reporting.', points: ['Residential, commercial & hospitality assets', 'Premium tenant screening & leasing', '24/7 maintenance & concierge support', 'Monthly statements & yield optimisation'] },
      { title: 'Workspace Leasing', tag: 'Work where you thrive', description: 'Premium coworking, private offices and whole floors across seven HiLink addresses in central Hanoi — bookable by the hour, day, or month, with everything a modern team needs to do their best work.', points: ['Private offices, desks & meeting rooms', 'Seven locations in Hoan Kiem & Dong Da', 'Business addresses with E-office', 'Live availability & booking on hilink.vn'] },
      { title: 'Business Services', tag: 'Scale in Vietnam', description: 'Market-entry, advisory, and operational support for businesses scaling in Vietnam — from company formation to accounting, legal, and ongoing back-office operations.', points: ['Market entry & company formation', 'Accounting, tax & compliance', 'Legal & licensing advisory', 'Bilingual operational support'] },
      { title: 'Concierge Services', tag: 'The exceptional, handled', description: 'Personal and corporate concierge for clients who expect more — travel, dining, events, lifestyle, and business support delivered by a dedicated team, 24/7.', points: ['Travel, aviation & hospitality', 'Dining & exclusive event access', 'Lifestyle & relocation management', 'Executive & business support'] },
      { title: 'Industrial & Logistics', tag: 'Space that performs', description: 'Warehousing, factory, and logistics property solutions across Vietnam — from site selection and leasing to fit-out coordination and ongoing facilities management.', points: ['Warehouse & factory leasing', 'Site selection & due diligence', 'Fit-out & build-out coordination', 'Facilities & supply-chain support'] },
    ],
    howEyebrow: 'How we work together', howTitle: 'A simple path from first call to lasting results',
    steps: [
      ['Discovery', 'We learn your goals, assets, and constraints to map the right mix of solutions.'],
      ['Proposal', 'A clear, transparent scope and plan tailored to your situation — no surprises.'],
      ['Delivery', 'A dedicated bilingual team executes, coordinating every moving part for you.'],
      ['Optimisation', 'Ongoing reporting and reviews to keep performance climbing over time.'],
    ],
    ctaTitle: 'Not sure where to start?', ctaLead: 'Tell us about your goals and we will map the right combination of solutions for you.', cta: 'Book a Consultation',
  },
  vi: {
    meta: 'Quản lý bất động sản, cho thuê văn phòng, dịch vụ doanh nghiệp, concierge và công nghiệp & logistics — một đối tác suốt vòng đời bất động sản.',
    eyebrow: 'Giải pháp', h1a: 'Một đối tác suốt', h1b: 'vòng đời bất động sản',
    lead: 'Từ quản lý tài sản, không gian làm việc đến tư vấn và concierge, HiLink mang đến mọi giải pháp khách hàng quốc tế cần để đầu tư, vận hành và phát triển tại Việt Nam — tại một đầu mối.',
    introEyebrow: 'Tất cả trong một đầu mối', introTitle: 'Năm giải pháp, một tiêu chuẩn xuất sắc',
    intro: 'Hầu hết khách hàng bắt đầu với một nhu cầu — một tài sản cần quản lý, một văn phòng cần thuê, một công ty cần thành lập. Họ ở lại vì HiLink có thể lo mọi việc tiếp theo. Khám phá từng giải pháp bên dưới, hoặc cho chúng tôi biết mục tiêu để chúng tôi kết hợp giải pháp phù hợp cho bạn.',
    explore: 'Khám phá',
    solutions: [
      { title: 'Quản lý bất động sản', tag: 'Sở hữu an tâm', description: 'Quản lý trọn gói cho bất động sản nhà ở, thương mại, khách sạn và cho thuê ngắn hạn — tìm khách thuê, bảo trì, thu tiền thuê và báo cáo minh bạch cho chủ sở hữu.', points: ['Bất động sản nhà ở, thương mại & khách sạn', 'Sàng lọc khách thuê & cho thuê', 'Bảo trì & hỗ trợ concierge 24/7', 'Báo cáo hàng tháng & tối ưu lợi suất'] },
      { title: 'Cho thuê văn phòng', tag: 'Làm việc ở nơi bạn phát triển', description: 'Coworking, văn phòng riêng và nguyên sàn tại bảy địa chỉ HiLink giữa trung tâm Hà Nội — đặt theo giờ, ngày hoặc tháng, với mọi thứ một đội ngũ hiện đại cần để làm việc tốt nhất.', points: ['Văn phòng riêng, chỗ ngồi & phòng họp', 'Bảy địa điểm tại Hoàn Kiếm & Đống Đa', 'Địa chỉ doanh nghiệp với E-office', 'Xem phòng trống & đặt chỗ trên hilink.vn'] },
      { title: 'Dịch vụ doanh nghiệp', tag: 'Phát triển tại Việt Nam', description: 'Hỗ trợ gia nhập thị trường, tư vấn và vận hành cho doanh nghiệp mở rộng tại Việt Nam — từ thành lập công ty đến kế toán, pháp lý và vận hành văn phòng.', points: ['Gia nhập thị trường & thành lập công ty', 'Kế toán, thuế & tuân thủ', 'Tư vấn pháp lý & giấy phép', 'Hỗ trợ vận hành song ngữ'] },
      { title: 'Dịch vụ concierge', tag: 'Mọi điều đặc biệt, đã có người lo', description: 'Concierge cá nhân và doanh nghiệp cho khách hàng mong đợi nhiều hơn — đi lại, ẩm thực, sự kiện, phong cách sống và hỗ trợ công việc do một đội ngũ riêng thực hiện, 24/7.', points: ['Đi lại, hàng không & lưu trú', 'Ẩm thực & sự kiện đặc quyền', 'Phong cách sống & hỗ trợ chuyển đến', 'Hỗ trợ điều hành & công việc'] },
      { title: 'Công nghiệp & logistics', tag: 'Không gian hiệu quả', description: 'Giải pháp bất động sản kho bãi, nhà xưởng và logistics trên khắp Việt Nam — từ chọn địa điểm, cho thuê đến điều phối thi công và quản lý vận hành.', points: ['Cho thuê kho & nhà xưởng', 'Chọn địa điểm & thẩm định', 'Điều phối thi công & hoàn thiện', 'Hỗ trợ vận hành & chuỗi cung ứng'] },
    ],
    howEyebrow: 'Cách chúng tôi làm việc', howTitle: 'Lộ trình đơn giản từ cuộc gọi đầu tiên đến kết quả lâu dài',
    steps: [
      ['Tìm hiểu', 'Chúng tôi tìm hiểu mục tiêu, tài sản và các ràng buộc để chọn đúng giải pháp.'],
      ['Đề xuất', 'Phạm vi và kế hoạch rõ ràng, minh bạch, phù hợp với hoàn cảnh của bạn — không bất ngờ.'],
      ['Triển khai', 'Một đội ngũ song ngữ riêng thực hiện, điều phối mọi khâu thay bạn.'],
      ['Tối ưu', 'Báo cáo và rà soát định kỳ để hiệu quả tiếp tục tăng theo thời gian.'],
    ],
    ctaTitle: 'Chưa biết bắt đầu từ đâu?', ctaLead: 'Hãy cho chúng tôi biết mục tiêu, chúng tôi sẽ kết hợp các giải pháp phù hợp cho bạn.', cta: 'Đặt lịch tư vấn',
  },
};

export function SolutionsPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);
  const solutions = t.solutions.map((s, i) => ({ ...s, ...META[i] }));

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden min-h-[72vh] flex items-end bg-[#2A2623] text-white">
        <HeroBg image="/photos/hbc-lounge-xl.webp" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#F06A6E] mb-7 flex items-center gap-3">
              <Flag className="text-[#F06A6E]" /> {t.eyebrow}
            </p>
            <h1 className="serif text-5xl lg:text-[5rem] mb-8 leading-[0.98]">
              {t.h1a}<br />{t.h1b}
            </h1>
            <p className="text-lg md:text-xl text-[#E9E3DA]/90 leading-relaxed max-w-2xl">
              {t.lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick nav strip */}
      <section className="bg-[#2A2623] border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-x-8 gap-y-3 py-6">
            {solutions.map((s, i) => (
              <a key={s.path} href={`#solution-${i}`} className="text-[12px] uppercase tracking-[0.16em] text-white/55 hover:text-[#F06A6E] transition-colors">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 lg:py-32 bg-[#F4F0EA]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {t.introEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl leading-tight">{t.introTitle}</h2>
          </div>
          <div className="lg:col-span-7 flex items-center">
            <p className="text-xl text-[#6B645D] leading-relaxed">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Detailed solution sections */}
      <section id="solutions" className="bg-white">
        {solutions.map((s, i) => (
          <div
            id={`solution-${i}`}
            key={s.path}
            className={`border-t border-[#2A2623]/10 ${i % 2 === 1 ? 'bg-[#F4F0EA]' : 'bg-white'}`}
          >
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden lg:[direction:ltr]"
                  initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
                >
                  {s.image ? (
                    <img {...photo(s.image)} alt={s.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#EDE7DF] flex flex-col items-start justify-end p-10 text-[#D12126]">
                      <Factory size={56} strokeWidth={1} className="mb-6" />
                      <span className="serif text-3xl lg:text-4xl">{s.title}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2623]/30 to-transparent" />
                  <span className="absolute top-5 left-5 text-[12px] uppercase tracking-[0.2em] bg-[#2A2623]/70 text-[#F06A6E] px-3 py-1.5">0{i + 1}</span>
                </motion.div>

                <motion.div
                  className="lg:[direction:ltr]"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
                >
                  <div className="text-[#D12126] mb-5">{s.icon}</div>
                  <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-3">{s.tag}</p>
                  <h3 className="serif text-3xl lg:text-4xl mb-6">{s.title}</h3>
                  <p className="text-[#6B645D] leading-relaxed mb-8 text-[17px]">{s.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-[15px] text-[#2A2623]">
                        <span className="w-1.5 h-1.5 bg-[#D12126] rounded-full mt-2.5 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link to={l(s.path)} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#2A2623] group">
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D12126] group-hover:after:w-full after:transition-all after:duration-300">
                      {t.explore} {s.title}
                    </span>
                    <ArrowRight size={15} className="text-[#D12126] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* How we work together */}
      <section className="py-24 lg:py-32 bg-[#F4F0EA] text-[#2A2623]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-14 max-w-2xl">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {t.howEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl leading-tight">{t.howTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2623]/10">
            {t.steps.map(([title, desc], i) => (
              <div key={title} className="bg-white p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#D12126]">{STEP_ICONS[i]}</span>
                  <span className="serif text-3xl text-[#2A2623]/20">0{i + 1}</span>
                </div>
                <h3 className="serif text-xl mb-3">{title}</h3>
                <p className="text-[#6B645D] text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative py-24 lg:py-32 bg-[#361716] text-white overflow-hidden">
        <Candles />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="serif text-4xl lg:text-5xl mb-8">{t.ctaTitle}</h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            {t.ctaLead}
          </p>
          <Link to={l('/book-consultation')} className="group inline-flex items-center gap-2 px-12 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-colors">
            {t.cta} <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
