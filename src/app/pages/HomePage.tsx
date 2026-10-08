import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Building2, Briefcase, Bell, TrendingUp, Warehouse } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { LinkPhilosophy } from '../components/LinkPhilosophy';
import { useLang, usePageMeta } from '../lib/i18n';
import { LOCATIONS, WORKSPACE_LINES } from '../data/locations';
import { ws } from '../data/site';

const IMG = {
  hero: '/photos/f15-lounge-wide-xl.webp',
  reception: '/photos/f15-reception.webp',
  lounge: '/photos/hbc-lounge.webp',
  panel: '/photos/f15-meeting-pod.webp',
};

const T = {
  en: {
    meta: 'Bespoke property management, premium workspace and business advisory for international clients in Vietnam.',
    eyebrow: 'Real Estate · Workspace · Advisory — Ha Noi',
    h1a: 'Your assets,', h1b: 'managed', h1c: '& optimised.',
    lead: 'Bespoke property management, premium workspace, and business advisory for international clients across Vietnam.',
    book: 'Book a Consultation', explore: 'Explore Services',
    aboutEyebrow: 'About the Company', aboutSub: 'Your Solution',
    aboutBody: 'Part of Hanoi Group, HiLink understands the complexities of cross-border investment and the needs of international clients. Our bilingual team delivers transparent services with a personalised concierge approach across property management, premium workspace, and business advisory.',
    aboutCta: 'Learn More About Us', receptionAlt: 'Reception on Floor 15 at 4 Ton That Tung', panelAlt: 'The glass meeting pod on Floor 15',
    stats: ['HiLink Locations', 'Workspace Brands', 'Partner Companies'], est: 'Established in Ha Noi',
    svcEyebrow: 'What We Do', svcTitle: 'Services',
    svcLead: "End-to-end solutions for property owners, businesses, and international clients seeking excellence in Vietnam's dynamic market.",
    svc: [
      ['Asset Management & Optimisation', 'Strategic oversight and performance maximisation for your real estate portfolio.'],
      ['Workspace Leasing', 'Premium office and coworking solutions tailored to your business needs.'],
      ['Business Solutions & Consulting', 'Expert advisory services for market entry and business development.'],
      ['Concierge Services', 'Personalised support for all your property and business requirements.'],
      ['Industrial & Logistics', 'Specialised warehousing, factory leasing, and supply-chain solutions across Vietnam.'],
    ],
    learn: 'Learn More', all: 'All Services', allTitle: 'Explore the full HiLink ecosystem', allCta: 'View All Services',
    prjEyebrow: 'HiLink Workspaces · Ha Noi', prjTitle: 'Our Locations',
    prjLead: 'Seven HiLink addresses across Hoan Kiem and Dong Da — from a lakeside business club to whole floors high above the city.',
    soon: 'Opening soon', prev: 'Previous', next: 'Next',
    whyEyebrow: 'Why HiLink', whyTitle: 'Trusted by international clients across Asia',
    whyBody: 'We understand the complexities of cross-border investment and the unique needs of international clients. Our bilingual team provides transparent services with a personalised concierge approach.',
    whyCta: 'Learn About Us', loungeAlt: 'The business lounge at the HiLink Business Club',
    ctaTitle: 'Ready to start?', ctaLead: 'Tell us about your needs. Our team will get back to you shortly.',
  },
  vi: {
    meta: 'Quản lý bất động sản, không gian làm việc cao cấp và tư vấn doanh nghiệp cho khách hàng quốc tế tại Việt Nam.',
    eyebrow: 'Bất động sản · Không gian làm việc · Tư vấn — Hà Nội',
    h1a: 'Tài sản của bạn,', h1b: 'được quản lý', h1c: '& tối ưu.',
    lead: 'Quản lý bất động sản theo nhu cầu, không gian làm việc cao cấp và tư vấn doanh nghiệp cho khách hàng quốc tế tại Việt Nam.',
    book: 'Đặt lịch tư vấn', explore: 'Khám phá dịch vụ',
    aboutEyebrow: 'Về công ty', aboutSub: 'Your Solution',
    aboutBody: 'Là thành viên của Hanoi Group, HiLink thấu hiểu sự phức tạp của đầu tư xuyên biên giới và nhu cầu của khách hàng quốc tế. Đội ngũ song ngữ mang đến dịch vụ minh bạch theo phong cách concierge riêng cho từng khách hàng, trong quản lý bất động sản, không gian làm việc cao cấp và tư vấn doanh nghiệp.',
    aboutCta: 'Tìm hiểu về chúng tôi', receptionAlt: 'Quầy lễ tân tầng 15, 4 Tôn Thất Tùng', panelAlt: 'Phòng họp kính trên tầng 15',
    stats: ['Địa điểm HiLink', 'Dòng sản phẩm', 'Doanh nghiệp đối tác'], est: 'Thành lập tại Hà Nội',
    svcEyebrow: 'Chúng tôi làm gì', svcTitle: 'Dịch vụ',
    svcLead: 'Giải pháp trọn gói cho chủ sở hữu bất động sản, doanh nghiệp và khách hàng quốc tế tìm kiếm sự xuất sắc tại thị trường Việt Nam năng động.',
    svc: [
      ['Quản lý & tối ưu tài sản', 'Giám sát chiến lược và tối đa hoá hiệu quả danh mục bất động sản của bạn.'],
      ['Cho thuê văn phòng', 'Văn phòng và không gian coworking cao cấp, phù hợp nhu cầu doanh nghiệp.'],
      ['Giải pháp & tư vấn doanh nghiệp', 'Dịch vụ tư vấn chuyên sâu về gia nhập thị trường và phát triển kinh doanh.'],
      ['Dịch vụ concierge', 'Hỗ trợ riêng cho mọi nhu cầu về bất động sản và doanh nghiệp của bạn.'],
      ['Công nghiệp & logistics', 'Giải pháp kho bãi, thuê nhà xưởng và chuỗi cung ứng chuyên biệt trên khắp Việt Nam.'],
    ],
    learn: 'Tìm hiểu thêm', all: 'Tất cả dịch vụ', allTitle: 'Khám phá hệ sinh thái HiLink', allCta: 'Xem tất cả dịch vụ',
    prjEyebrow: 'HiLink Workspaces · Hà Nội', prjTitle: 'Các địa điểm',
    prjLead: 'Bảy địa chỉ HiLink tại Hoàn Kiếm và Đống Đa — từ câu lạc bộ doanh nhân bên hồ đến những sàn nguyên tầng trên cao.',
    soon: 'Sắp mở', prev: 'Trước', next: 'Sau',
    whyEyebrow: 'Vì sao chọn HiLink', whyTitle: 'Được khách hàng quốc tế khắp châu Á tin tưởng',
    whyBody: 'Chúng tôi thấu hiểu sự phức tạp của đầu tư xuyên biên giới và nhu cầu riêng của khách hàng quốc tế. Đội ngũ song ngữ mang đến dịch vụ minh bạch theo phong cách concierge riêng cho từng khách hàng.',
    whyCta: 'Tìm hiểu về chúng tôi', loungeAlt: 'Business lounge tại HiLink Business Club',
    ctaTitle: 'Sẵn sàng bắt đầu?', ctaLead: 'Hãy cho chúng tôi biết nhu cầu của bạn. Đội ngũ HiLink sẽ liên hệ lại sớm.',
  },
};

const SVC = [
  { icon: <TrendingUp size={30} />, link: '/property-management' },
  { icon: <Briefcase size={30} />, link: '/workspace-leasing' },
  { icon: <Building2 size={30} />, link: '/business-services' },
  { icon: <Bell size={30} />, link: '/concierge-services' },
  { icon: <Warehouse size={30} />, link: '/industrial-logistics' },
];

export function HomePage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta('', t.meta);
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => scroller.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-end bg-[#2A2623] text-white overflow-hidden">
        <motion.img
          src={IMG.hero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.88 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2623]/85 via-[#2A2623]/25 to-[#2A2623]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A2623]/65 via-[#2A2623]/20 to-transparent" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 pb-20 lg:pb-28 w-full">
          <motion.p
            className="text-[11px] uppercase tracking-[0.32em] text-[#F06A6E] mb-7 flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
          >
            <span className="w-8 h-px bg-[#F06A6E]" /> {t.eyebrow}
          </motion.p>
          <motion.h1
            className="serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.98] mb-8 max-w-5xl"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t.h1a}<br /><span className="text-[#F06A6E]">{t.h1b}</span> {t.h1c}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-[#E9E3DA]/90 mb-11 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
          >
            {t.lead}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link to={l('/contact')} className="group inline-flex items-center justify-center gap-2 px-9 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-all">
              {t.book} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to={l('/solutions')} className="inline-flex items-center justify-center px-9 py-4 border border-white/40 text-white text-[12px] uppercase tracking-[0.16em] hover:bg-white hover:text-[#2A2623] transition-colors">
              {t.explore}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Philosophy — interactive ── */}
      <LinkPhilosophy />

      {/* ── About — editorial three-column ── */}
      <section className="w-full bg-[#F4F0EA]">
        <div className="grid lg:grid-cols-[30%_1fr_28%] min-h-[680px]">
          <div className="relative overflow-hidden min-h-[400px] lg:min-h-0 group">
            <img loading="lazy" decoding="async" src={IMG.reception} alt={t.receptionAlt} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
          </div>

          <div className="px-10 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-10">{t.aboutEyebrow}</p>
            <h2 className="serif text-[#D12126] mb-6 leading-none" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 400, letterSpacing: '0.06em' }}>HILINK</h2>
            <p className="text-[18px] uppercase tracking-[0.08em] text-[#2A2623] mb-6">{t.aboutSub}</p>
            <div className="w-full h-px mb-6" style={{ backgroundColor: 'rgba(209,33,38,0.3)' }} />
            <p className="text-[15px] leading-[1.85] text-[#444] max-w-[520px] mb-12">
              {t.aboutBody}
            </p>
            <Link to={l('/about')} className="inline-flex items-center gap-3 group w-fit">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#2A2623] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D12126] group-hover:after:w-full after:transition-all after:duration-300">{t.aboutCta}</span>
              <ArrowRight size={14} className="text-[#D12126] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col">
            <div className="bg-[#EDE7DF] px-10 py-10 flex flex-col justify-center gap-8 flex-1">
              {[
                { end: LOCATIONS.length, label: t.stats[0], duration: 1.6 },
                { end: Object.keys(WORKSPACE_LINES).length, label: t.stats[1], duration: 1.4 },
                { end: 9, label: t.stats[2], duration: 1.8 },
              ].map((stat) => (
                <div key={stat.label} className="border-t border-[#D12126]/30 pt-5">
                  <div className="serif text-[40px] font-light text-[#D12126] leading-none mb-2">
                    <AnimatedCounter end={stat.end} duration={stat.duration} />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#555]">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden min-h-[200px] lg:min-h-[260px]">
              <img loading="lazy" decoding="async" src={IMG.panel} alt={t.panelAlt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ backgroundColor: 'rgba(42,38,35,0.5)' }}>
                <div className="serif text-white text-[72px] font-light leading-none">2020</div>
                <div className="text-white uppercase tracking-[0.2em] text-[11px] mt-3">{t.est}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 lg:py-32 bg-[#F4F0EA]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-20">
            <div className="lg:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-5">{t.svcEyebrow}</p>
              <h2 className="serif text-5xl lg:text-6xl">{t.svcTitle}</h2>
            </div>
            <div className="lg:col-span-8 flex items-end">
              <p className="text-xl text-[#6B645D] leading-relaxed">
                {t.svcLead}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2623]/15">
            {SVC.map((s, i) => (
              <ServiceCard key={s.link} icon={s.icon} title={t.svc[i][0]} description={t.svc[i][1]} link={l(s.link)} more={t.learn} />
            ))}
            <div className="bg-[#D12126] p-8 lg:p-12 flex flex-col justify-between">
              <div className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-auto">{t.all}</div>
              <div>
                <p className="serif text-white text-2xl lg:text-3xl mb-6 leading-snug">{t.allTitle}</p>
                <Link to={l('/solutions')} className="inline-flex items-center gap-2 text-white text-[11px] uppercase tracking-[0.2em] border-b border-white/40 pb-1 hover:border-white transition-colors group">
                  {t.allCta} <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Locations (HiLink Workspaces) ── */}
      <section className="py-24 lg:py-32 bg-white text-[#2A2623] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-[#D12126]" /> {t.prjEyebrow}
              </p>
              <h2 className="serif text-4xl lg:text-6xl leading-none">{t.prjTitle}</h2>
            </div>
            <div className="flex items-center gap-6">
              <p className="hidden md:block max-w-sm text-[#6B645D] leading-relaxed text-[15px]">
                {t.prjLead}
              </p>
              <div className="flex gap-2">
                <button onClick={() => scrollBy(-1)} aria-label={t.prev} className="w-11 h-11 border border-[#2A2623]/25 flex items-center justify-center hover:bg-[#2A2623] hover:text-white transition-colors"><ArrowRight size={16} className="rotate-180" /></button>
                <button onClick={() => scrollBy(1)} aria-label={t.next} className="w-11 h-11 border border-[#2A2623]/25 flex items-center justify-center hover:bg-[#2A2623] hover:text-white transition-colors"><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>

          <div ref={scroller} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {LOCATIONS.map((loc, i) => (
              <motion.a
                key={loc.id}
                href={ws(lang, `/locations/${loc.id}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative shrink-0 w-[280px] sm:w-[320px] snap-start"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: (i % 4) * 0.08, duration: 0.6 }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#2A2623]">
                  <img loading="lazy" decoding="async" src={loc.photo} alt={loc.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[0.9s] group-hover:scale-[1.07]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2623]/85 via-[#2A2623]/10 to-transparent" />
                  <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.18em] bg-[#D12126] text-white px-3 py-1.5">
                    {loc.comingSoon ? t.soon : loc.line ? WORKSPACE_LINES[loc.line].label : 'HiLink'}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="serif text-2xl mb-1.5 leading-tight">{loc.name}</h3>
                    <p className="text-[12px] text-[#E9E3DA]/70 flex items-start gap-1.5">
                      <span className="text-[#F06A6E] mt-0.5">◦</span> {loc.address}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="py-24 lg:py-32 bg-[#F4F0EA]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-6">{t.whyEyebrow}</p>
              <h2 className="serif text-4xl lg:text-5xl mb-8 leading-tight">{t.whyTitle}</h2>
              <p className="text-lg text-[#6B645D] mb-8 leading-relaxed">
                {t.whyBody}
              </p>
              <Link to={l('/about')} className="inline-flex items-center gap-2 text-[#D12126] uppercase text-sm tracking-wider group hover:gap-4 transition-all">
                {t.whyCta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <motion.div className="relative aspect-[4/3] overflow-hidden" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
              <img loading="lazy" decoding="async" src={IMG.lounge} alt={t.loungeAlt} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 lg:py-36 bg-[#FBECEC] text-[#2A2623] overflow-hidden">
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="serif text-4xl lg:text-6xl mb-8">{t.ctaTitle}</h2>
          <p className="text-xl text-[#6B645D] mb-12 max-w-2xl mx-auto">{t.ctaLead}</p>
          <Link to={l('/contact')} className="group inline-flex items-center gap-2 px-12 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-colors">
            {t.book} <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ icon, title, description, link, more }: { icon: React.ReactNode; title: string; description: string; link: string; more: string }) {
  return (
    <Link to={link} className="group bg-[#F4F0EA] p-8 lg:p-12 hover:bg-[#E9E3DA] transition-all block h-full">
      <motion.div className="text-[#D12126] mb-6" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>{icon}</motion.div>
      <h3 className="serif text-2xl lg:text-[1.7rem] mb-4 leading-snug">{title}</h3>
      <p className="text-[#6B645D] mb-6 leading-relaxed text-[15px]">{description}</p>
      <div className="inline-flex items-center gap-2 text-[#2A2623] text-[11px] uppercase tracking-[0.16em] group-hover:gap-4 transition-all">{more} <ArrowRight size={15} /></div>
    </Link>
  );
}
