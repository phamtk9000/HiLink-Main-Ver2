import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ClipboardList, Handshake, Settings, LineChart, ServiceIcon } from '../components/Glyph';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';
import { PropertyStack } from '../components/PropertyStack';
import { PROPERTIES } from '../data/managedProperties';
import { ws } from '../data/site';
import { glideTo } from '../lib/motion';
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

const STEP_ICONS = [<ClipboardList size={22} />, <Handshake size={22} />, <Settings size={22} />, <LineChart size={22} />];

const T = {
  en: {
    meta: 'Property management, workspace leasing, business services, concierge and industrial & logistics — one partner across the full property lifecycle.',
    eyebrow: 'Our Solutions', h1a: 'One partner across the', h1b: 'full property lifecycle',
    lead: 'Management, workspace, advisory and concierge — everything you need to invest and grow in Vietnam, under one roof.',
    introEyebrow: 'Everything under one roof', introTitle: 'Five solutions, one standard of excellence',
    intro: 'Clients usually start with one need and stay because HiLink can handle what comes next. Explore each solution below.',
    explore: 'Explore', stackLabel: 'Properties HiLink manages',
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
    explore: 'Khám phá', stackLabel: 'Bất động sản HiLink quản lý',
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
  const [scrolled, setActive] = useState(-1);
  // While gliding to a solution chosen in the nav, its tab stays lit (the
  // line does not run through every tab on the way).
  const [heading, setHeading] = useState(-1);
  const headingTimer = useRef(0);
  const active = heading >= 0 ? heading : scrolled;
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

      {/* Quick nav, after the tab bar on HiLink Workspaces: a white strip
          between hairlines, each solution a glyph over its name; the one
          being read is picked out in red with a line beneath. On wide
          screens it stays under the header while the solutions are on
          screen; on phones it is a row to swipe. */}
      <div>
      <nav aria-label={t.eyebrow} className="z-40 border-y border-[#2A2623]/15 bg-white lg:sticky lg:top-[76px]">
        <div className="max-w-[1600px] mx-auto lg:px-12 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {solutions.map((s, i) => (
            <a
              key={s.path}
              href={`#solution-${i}`}
              onClick={(e) => { const ms = glideTo(e, `solution-${i}`); if (ms) { setHeading(i); window.clearTimeout(headingTimer.current); headingTimer.current = window.setTimeout(() => setHeading(-1), ms); } }}
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

      {/* The solutions, after the workspace page on neuehouse.com: a row for
          each, between hairlines that run the width of the page — the
          photograph over two thirds (Property Management: the managed
          properties, stacked and turning), the words over one third, ruled
          off; the photograph changes sides from one row to the next. */}
      <section id="solutions" className="relative bg-white pb-24 lg:pb-32 hl-no-rule">
        <div ref={stack} className="border-t border-[#2A2623]/25">
          {solutions.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <Fragment key={s.path}>
                <div id={`solution-${i}`} data-mark className="scroll-mt-[76px] lg:scroll-mt-[184px]" aria-hidden="true" />
                <article className="[display:grid] grid-cols-[minmax(0,1fr)] border-b border-[#2A2623]/25 lg:grid-cols-3">
                  <div className={`p-4 sm:p-6 lg:col-span-2 lg:p-[25px] ${flip ? 'lg:order-2' : ''}`}>
                    {i === 0 ? (
                      <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[910/576]">
                        <PropertyStack
                          label={t.stackLabel}
                          items={PROPERTIES[lang].map((p) => ({ ...p, to: p.slug ? l(`/workspace/${p.slug}`) : undefined, href: p.href ? ws(lang, p.href) : undefined, crop: p.slug === 'quarter-house' ? 'left top' : undefined }))}
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[910/576] overflow-hidden bg-[#2A2623]">
                        <img {...photo(s.image, '(min-width: 1024px) 64vw, 100vw')} alt={s.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className={`flex flex-col justify-center border-[#2A2623]/25 px-6 pb-12 pt-2 sm:px-10 lg:px-[54px] lg:pb-[60px] lg:pt-[30px] ${flip ? 'lg:order-1 lg:border-r' : 'lg:border-l'}`}>
                    <span className="text-[#D12126]" aria-hidden="true">{s.icon}</span>
                    <h3 className="serif hl-stack-title mt-5 text-[#2A2623]">{s.title}</h3>
                    <p className="mt-3 text-[18px] leading-snug text-[#2A2623]">{s.tag}</p>
                    <p className="mt-5 text-[16px] leading-[1.7] text-[#4A443F]">{s.description}</p>
                    <ul className="mt-6 space-y-2">
                      {s.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-[14.5px] leading-snug text-[#4A443F]">
                          <span className="mt-[9px] h-px w-3 shrink-0 bg-[#D12126]" aria-hidden="true" />{pt}
                        </li>
                      ))}
                    </ul>
                    <Link to={l(s.path)} aria-label={`${t.explore} ${s.title}`} className="mt-9 inline-flex h-[42px] w-fit items-center gap-2 border border-[#2A2623]/45 px-[25px] text-[15px] text-[#2A2623] hover:border-[#2A2623] hover:bg-[#2A2623] hover:text-white transition-colors">
                      {t.explore} <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
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
