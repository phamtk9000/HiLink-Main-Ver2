import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ClipboardList, Handshake, Settings, LineChart, ServiceIcon } from '../components/Glyph';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';
import { PropertyStack } from '../components/PropertyStack';
import { PROPERTIES } from '../data/managedProperties';
import { ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { Candles } from '../components/Candles';
import { photo } from '../lib/photo';

const META = [
  { icon: <ServiceIcon path="/property-management" size={30} />, path: '/property-management', image: '/photos/f19-window.webp' },
  { icon: <ServiceIcon path="/workspace-leasing" size={30} />, path: '/workspace-leasing', image: '/photos/f15-reception.webp' },
  { icon: <ServiceIcon path="/business-services" size={30} />, path: '/business-services', image: '/photos/hbc-client-meeting.webp' },
  { icon: <ServiceIcon path="/concierge-services" size={30} />, path: '/concierge-services', image: '/photos/hbc-host.webp' },
  // No HiLink photograph of an industrial site yet: a stock one (PHOTO-CREDITS.md).
  { icon: <ServiceIcon path="/industrial-logistics" size={30} />, path: '/industrial-logistics', image: '/photos/stock-port.webp' },
];
// Each solution's card: its ground, and whether the words on it are light.
const CARDS = [
  { bg: '#2A2623', light: true }, { bg: '#F4F0EA', light: false }, { bg: '#2E3A33', light: true }, { bg: '#361716', light: true }, { bg: '#1B1412', light: true },
];

const STEP_ICONS = [<ClipboardList size={22} />, <Handshake size={22} />, <Settings size={22} />, <LineChart size={22} />];

const T = {
  en: {
    meta: 'Property management, workspace leasing, business services, concierge and industrial & logistics — one partner across the full property lifecycle.',
    eyebrow: 'Our Solutions', h1a: 'One partner across the', h1b: 'full property lifecycle',
    lead: 'Management, workspace, advisory and concierge — everything you need to invest and grow in Vietnam, under one roof.',
    introEyebrow: 'Everything under one roof', introTitle: 'Five solutions, one standard of excellence',
    intro: 'Clients usually start with one need and stay because HiLink can handle what comes next. Explore each solution below.',
    explore: 'Explore', stackView: 'View property', stackPrev: 'Previous property', stackNext: 'Next property',
    solutions: [
      { title: 'Property Management', tag: 'Own with confidence', description: 'End-to-end management for residential, commercial, hospitality, and short-term rental assets — tenant acquisition, maintenance, rent collection, and transparent owner reporting.', points: ['Residential, commercial & hospitality assets', 'Premium tenant screening & leasing', '24/7 maintenance & concierge support', 'Monthly statements & yield optimisation'] },
      { title: 'Workspace Leasing', tag: 'Work where you thrive', description: 'Premium coworking, private offices and whole floors across six HiLink addresses in central Hanoi — bookable by the hour, day, or month, with everything a modern team needs to do their best work.', points: ['Private offices, desks & meeting rooms', 'Six locations in Hoan Kiem & Dong Da', 'Business addresses with E-office', 'Live availability & booking on hilink.vn'] },
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
    lead: 'Quản lý tài sản, không gian làm việc, tư vấn và concierge — mọi điều cần để đầu tư tại Việt Nam, một đầu mối.',
    introEyebrow: 'Tất cả trong một đầu mối', introTitle: 'Năm giải pháp, một tiêu chuẩn xuất sắc',
    intro: 'Khách hàng thường bắt đầu với một nhu cầu và ở lại vì HiLink lo được mọi việc tiếp theo. Khám phá từng giải pháp bên dưới.',
    explore: 'Khám phá', stackView: 'Xem chi tiết', stackPrev: 'Bất động sản trước', stackNext: 'Bất động sản tiếp theo',
    solutions: [
      { title: 'Quản lý bất động sản', tag: 'Sở hữu an tâm', description: 'Quản lý trọn gói cho bất động sản nhà ở, thương mại, khách sạn và cho thuê ngắn hạn — tìm khách thuê, bảo trì, thu tiền thuê và báo cáo minh bạch cho chủ sở hữu.', points: ['Bất động sản nhà ở, thương mại & khách sạn', 'Sàng lọc khách thuê & cho thuê', 'Bảo trì & hỗ trợ concierge 24/7', 'Báo cáo hàng tháng & tối ưu lợi suất'] },
      { title: 'Cho thuê văn phòng', tag: 'Làm việc ở nơi bạn phát triển', description: 'Coworking, văn phòng riêng và nguyên sàn tại sáu địa chỉ HiLink giữa trung tâm Hà Nội — đặt theo giờ, ngày hoặc tháng, với mọi thứ một đội ngũ hiện đại cần để làm việc tốt nhất.', points: ['Văn phòng riêng, chỗ ngồi & phòng họp', 'Sáu địa điểm tại Hoàn Kiếm & Đống Đa', 'Địa chỉ doanh nghiệp với E-office', 'Xem phòng trống & đặt chỗ trên hilink.vn'] },
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
  // Which solution is being read, for the quick nav: the last whose place in
  // the page has passed the middle of the screen.
  const [active, setActive] = useState(-1);
  const stack = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = stack.current;
    if (!root) return undefined;
    const marks = [...root.querySelectorAll<HTMLElement>('[data-mark]')];
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let at = -1;
      marks.forEach((m, k) => { if (m.getBoundingClientRect().top < mid) at = k; });
      setActive(root.getBoundingClientRect().bottom < mid ? -1 : at);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, []);
  return (
    <>
      {/* Hero */}
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
            <p className="text-lg md:text-xl text-[#F8F6F1]/90 leading-relaxed max-w-2xl">
              {t.lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick nav, after the tab bar on HiLink Workspaces: a pale strip
          between hairlines, each solution a glyph over its name; the one
          being read is picked out in red with a line beneath. On wide
          screens it stays under the header while the solutions are on
          screen; on phones it is a row to swipe. */}
      <div>
      <nav aria-label={t.eyebrow} className="z-40 border-y border-[#2A2623]/12 bg-[#F8F6F1] lg:sticky lg:top-[76px]">
        <div className="max-w-[1600px] mx-auto lg:px-12 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {solutions.map((s, i) => (
            <a
              key={s.path}
              href={`#solution-${i}`}
              aria-current={i === active ? 'true' : undefined}
              className={`group relative flex min-w-[9.5rem] flex-1 flex-col items-center gap-2.5 px-4 pb-[18px] pt-5 text-center transition-colors duration-300 ${i === active ? 'text-[#D12126]' : 'text-[#4A443F] hover:text-[#2A2623]'}`}
            >
              <ServiceIcon path={s.path} size={26} strokeWidth={1.3} />
              <span className={`whitespace-nowrap text-[15px] font-medium leading-[1.3] ${i === active ? 'text-[#2A2623]' : ''}`}>{s.title}</span>
              <span className={`absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-[#D12126] transition-transform duration-500 ease-out ${i === active ? 'scale-x-100' : 'scale-x-0'}`} aria-hidden="true" />
            </a>
          ))}
        </div>
      </nav>

      {/* Intro */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 xl:gap-24">
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

      {/* The solutions as large cards, one after another. Each: its number,
          name and promise, what it covers, the way in, and a photograph. */}
      <section id="solutions" className="relative bg-white pb-24 lg:pb-32">
        <div ref={stack} className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {solutions.map((s, i) => {
            const c = CARDS[i], on = c.light ? 'text-[#F8F6F1]' : 'text-[#2A2623]', soft = c.light ? 'text-[#F8F6F1]/85' : 'text-[#4A443F]', rule = c.light ? 'border-white/15' : 'border-[#2A2623]/12';
            return (
              <Fragment key={s.path}>
                <div id={`solution-${i}`} data-mark className="scroll-mt-[76px] lg:scroll-mt-[184px]" aria-hidden="true" />
                <div className={i < solutions.length - 1 ? 'mb-6 lg:mb-8' : ''}>
                  <article className="relative overflow-hidden rounded-[20px] [display:grid] lg:grid-cols-12 lg:min-h-[600px]" style={{ backgroundColor: c.bg }}>
                    <div className={`relative z-10 flex flex-col p-7 sm:p-10 lg:col-span-7 lg:p-14 ${on}`}>
                      <div className="flex items-start justify-between gap-6">
                        <p className={`serif lining-nums leading-none text-[3.25rem] lg:text-[4.5rem] ${c.light ? 'text-[#F06A6E]' : 'text-[#D12126]'}`}>
                          {String(i + 1).padStart(2, '0')}<span className={`ml-2 align-top text-[13px] tracking-[0.14em] ${soft}`}>/ {String(solutions.length).padStart(2, '0')}</span>
                        </p>
                        <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full border ${c.light ? 'border-white/25 text-[#F06A6E]' : 'border-[#2A2623]/15 text-[#D12126]'}`}>{s.icon}</span>
                      </div>
                      <p className={`mt-8 lg:mt-auto text-[12px] uppercase tracking-[0.2em] ${c.light ? 'text-[#F8F6F1]/80' : 'text-[#D12126]'}`}>{s.tag}</p>
                      <h3 className={`serif hl-stack-title mt-3 ${on}`}>{s.title}</h3>
                      <p className={`mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed ${soft}`}>{s.description}</p>
                      <ul className={`mt-7 grid sm:grid-cols-2 border-t ${rule}`}>
                        {s.points.map((pt) => (
                          <li key={pt} className={`flex items-start gap-3 border-b py-3.5 text-[15px] leading-snug sm:odd:pr-6 ${rule}`}>
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F06A6E]" aria-hidden="true" />{pt}
                          </li>
                        ))}
                      </ul>
                      <Link to={l(s.path)} className={`group mt-8 inline-flex w-fit items-center gap-3 rounded-full px-6 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] transition-colors ${c.light ? 'bg-[#F8F6F1] text-[#2A2623] hover:bg-white' : 'bg-[#2A2623] text-white hover:bg-[#D12126]'}`}>
                        {t.explore} {s.title} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                    {i === 0 ? (
                      // Property Management: the properties HiLink manages and how they are doing, turning one after another.
                      <div className="relative overflow-hidden bg-[#1B1412] px-5 pb-6 pt-4 sm:px-8 lg:col-span-5 lg:px-10 lg:pb-8 lg:pt-6">
                        <div className="h-full">
                          <PropertyStack
                            view={t.stackView}
                            prev={t.stackPrev}
                            next={t.stackNext}
                            items={PROPERTIES[lang].map((p) => ({ ...p, to: p.slug ? l(`/workspace/${p.slug}`) : undefined, href: p.href ? ws(lang, p.href) : undefined, crop: p.slug === 'quarter-house' ? 'left top' : undefined }))}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative min-h-[280px] sm:min-h-[380px] lg:col-span-5 lg:min-h-0">
                        <img {...photo(s.image, '(min-width: 1024px) 40vw, 100vw')} alt={s.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                      </div>
                    )}
                  </article>
                </div>
              </Fragment>
            );
          })}
        </div>
      </section>
      </div>

      {/* How we work together */}
      <section className="relative py-24 lg:py-32 bg-white text-[#2A2623]">
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
                  <span className="serif text-3xl text-[#2A2623]/20" aria-hidden="true">0{i + 1}</span>
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
          <Link to={l('/contact')} className="group inline-flex items-center gap-2 px-12 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-colors">
            {t.cta} <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
