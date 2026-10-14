// Partners — facts set out after hines.com: a statement beside a stack of
// figures; the five ways to partner as tabs, each with its own figures,
// what the partner gets and how it works (approved HiLink Workspaces
// partnership copy, data/partnerCopy.ts); the benefits; the companies HiLink
// works with, by field; the four steps on a dark band; and the invitation.
import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Handshake, Layers, Globe, ShieldCheck, HeartHandshake } from '../components/Glyph';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';
import { FigureStack, Statement } from '../components/Figures';
import { Contours } from '../components/Contours';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { PARTNER_COPY } from '../data/partnerCopy';
import { PARTNERS, PARTNER_COUNT, PARTNER_FIGURE, ws } from '../data/site';
import { photo } from '../lib/photo';
import { WORKSPACE_LOCATIONS } from '../data/workspaceLocations';

const BENEFIT_ICONS = [<Layers size={24} />, <Globe size={24} />, <ShieldCheck size={24} />, <HeartHandshake size={24} />];
const PATH_PHOTOS = ['/photos/f19-window.webp', '/photos/f15-lounge-cabin.webp', '/photos/f15-office-hi11.webp', '/photos/f19-room.webp', '/photos/hbc-client-meeting.webp'];

const T = {
  en: {
    eyebrow: 'Partners', h1a: 'Built on trusted', h1b: 'relationships',
    lead: 'HiLink works alongside owners, developers, networks, and service partners who share our standard of quality and care.',
    introEyebrow: 'Stronger together', introTitle: 'A network that delivers across the lifecycle',
    intro: 'No single firm does everything alone. HiLink brings together a carefully chosen network of owners, advisors, and specialist providers — coordinated under one accountable team so our clients experience a single, seamless standard of service.',
    typesEyebrow: 'Who we work with', typesTitle: 'Our Partners',
    types: [
      ['Property Owners & Developers', 'Asset owners and developers who entrust HiLink with management, leasing, and operations across residential, commercial, and mixed-use portfolios.'],
      ['International Networks', 'Cross-border advisory, relocation, and investment partners who refer and co-serve global clients entering and operating in Vietnam.'],
      ['Service & Vendor Partners', 'Vetted maintenance, hospitality, fit-out, and professional service providers who deliver consistent quality across our portfolio.'],
    ],
    whyEyebrow: 'Why partner with HiLink', whyTitle: 'The benefits of working together', whyAlt: 'The business lounge at the HiLink Business Club',
    benefits: [
      ['Access our portfolio', 'Work across managed assets and six HiLink workspace locations in central Hanoi with steady, recurring demand.'],
      ['Reach global clients', 'Tap into our international, bilingual client base of investors, expats, and corporates.'],
      ['Trust & transparency', 'Clear agreements, prompt settlement, and a reputation built on doing things properly.'],
      ['Long-term relationships', 'We invest in partners for the long run, not one-off transactions.'],
    ],
    stripLbl: 'Companies we work with',
    howEyebrow: 'How it works', howTitle: 'Becoming a HiLink partner',
    steps: [
      ['Introduction', 'Tell us about your organisation and how you would like to collaborate.'],
      ['Assessment', 'We align on standards, scope, and a shared definition of quality.'],
      ['Agreement', 'A transparent partnership agreement with clear terms and expectations.'],
      ['Collaboration', 'We onboard, integrate, and start delivering together.'],
    ],
    withTitle: 'Partner with us', withAlt: 'The HiLink Business Club boardroom',
    withBody: 'Whether you own property, run a complementary service, or represent international clients, we would like to explore how we can work together — and build something that lasts.',
    lookFor: 'What we look for',
    lookItems: ['A shared commitment to quality and transparency', 'Proven reliability and professional standards', 'Alignment with our international client base', 'Long-term, relationship-driven collaboration'],
    start: 'Start a Conversation',
    figures: ['Partner companies', 'HiLink locations in central Hanoi', 'Ways to partner', 'Response to broker partners'],
    figureNote: 'Partnership terms of HiLink Workspaces: one dedicated contact, replying within 24 hours.',
    waysEyebrow: 'Choose your path', waysTitle: 'Five ways to partner with HiLink',
    whyLbl: 'What you get', howLbl: 'How it works', more: 'Read the full programme', talk: 'Talk to our partnerships team',
    fields: { fedex: 'Logistics', lianlian: 'Cross-border payments', kosaido: 'Human resources', wts: 'Tax advisory', gp: 'Legal', hicorp: 'Parent group' } as Record<string, string>,
    stripTitle: 'In good company',
  },
  vi: {
    eyebrow: 'Đối tác', h1a: 'Xây dựng trên', h1b: 'những mối quan hệ tin cậy',
    lead: 'HiLink đồng hành cùng chủ sở hữu, nhà phát triển, mạng lưới và đối tác dịch vụ có chung tiêu chuẩn về chất lượng và sự tận tâm.',
    introEyebrow: 'Cùng nhau mạnh hơn', introTitle: 'Một mạng lưới đồng hành suốt vòng đời tài sản',
    intro: 'Không doanh nghiệp nào tự làm được mọi thứ. HiLink kết nối một mạng lưới được chọn lọc gồm chủ sở hữu, đơn vị tư vấn và nhà cung cấp chuyên môn — điều phối bởi một đội ngũ chịu trách nhiệm duy nhất, để khách hàng nhận được một tiêu chuẩn dịch vụ liền mạch.',
    typesEyebrow: 'Chúng tôi làm việc với ai', typesTitle: 'Đối tác của chúng tôi',
    types: [
      ['Chủ sở hữu & nhà phát triển', 'Chủ sở hữu tài sản và nhà phát triển giao cho HiLink quản lý, cho thuê và vận hành danh mục nhà ở, thương mại và hỗn hợp.'],
      ['Mạng lưới quốc tế', 'Đối tác tư vấn xuyên biên giới, hỗ trợ chuyển đến và đầu tư, cùng giới thiệu và phục vụ khách hàng quốc tế vào và hoạt động tại Việt Nam.'],
      ['Đối tác dịch vụ & nhà cung cấp', 'Nhà cung cấp bảo trì, khách sạn, thi công và dịch vụ chuyên môn đã được thẩm định, mang lại chất lượng ổn định trên toàn danh mục.'],
    ],
    whyEyebrow: 'Vì sao hợp tác với HiLink', whyTitle: 'Lợi ích khi hợp tác', whyAlt: 'Business lounge tại HiLink Business Club',
    benefits: [
      ['Tiếp cận danh mục', 'Làm việc với các tài sản đang quản lý và sáu địa điểm HiLink giữa trung tâm Hà Nội, với nhu cầu ổn định, thường xuyên.'],
      ['Tiếp cận khách hàng quốc tế', 'Kết nối với tệp khách hàng quốc tế, song ngữ gồm nhà đầu tư, người nước ngoài và doanh nghiệp.'],
      ['Tin cậy & minh bạch', 'Thoả thuận rõ ràng, thanh toán đúng hạn và uy tín xây trên cách làm việc chuẩn mực.'],
      ['Quan hệ lâu dài', 'Chúng tôi đầu tư cho đối tác lâu dài, không phải giao dịch một lần.'],
    ],
    stripLbl: 'Doanh nghiệp đồng hành',
    howEyebrow: 'Quy trình', howTitle: 'Trở thành đối tác HiLink',
    steps: [
      ['Giới thiệu', 'Cho chúng tôi biết về tổ chức của bạn và cách bạn muốn hợp tác.'],
      ['Đánh giá', 'Thống nhất tiêu chuẩn, phạm vi và cách hiểu chung về chất lượng.'],
      ['Thoả thuận', 'Thoả thuận hợp tác minh bạch với điều khoản và kỳ vọng rõ ràng.'],
      ['Hợp tác', 'Chúng tôi tiếp nhận, kết nối và bắt đầu cùng triển khai.'],
    ],
    withTitle: 'Hợp tác cùng chúng tôi', withAlt: 'Phòng họp lớn tại HiLink Business Club',
    withBody: 'Dù bạn sở hữu bất động sản, cung cấp dịch vụ bổ trợ hay đại diện cho khách hàng quốc tế, chúng tôi mong được cùng tìm cách hợp tác — và xây dựng điều bền vững.',
    lookFor: 'Điều chúng tôi tìm kiếm',
    lookItems: ['Cùng cam kết về chất lượng và minh bạch', 'Độ tin cậy và tiêu chuẩn chuyên nghiệp đã được chứng minh', 'Phù hợp với tệp khách hàng quốc tế của chúng tôi', 'Hợp tác lâu dài, dựa trên quan hệ'],
    start: 'Bắt đầu trao đổi',
    figures: ['Doanh nghiệp đối tác', 'Địa điểm HiLink giữa trung tâm Hà Nội', 'Hình thức hợp tác', 'Phản hồi đối tác môi giới'],
    figureNote: 'Điều khoản hợp tác của HiLink Workspaces: một đầu mối riêng, phản hồi trong 24 giờ.',
    waysEyebrow: 'Chọn hướng đi của bạn', waysTitle: 'Năm cách hợp tác cùng HiLink',
    whyLbl: 'Bạn nhận được gì', howLbl: 'Quy trình', more: 'Xem đầy đủ chương trình', talk: 'Trao đổi với đội hợp tác',
    fields: { fedex: 'Logistics', lianlian: 'Thanh toán xuyên biên giới', kosaido: 'Nhân sự', wts: 'Tư vấn thuế', gp: 'Pháp lý', hicorp: 'Tập đoàn mẹ' } as Record<string, string>,
    stripTitle: 'Đồng hành cùng những tên tuổi uy tín',
  },
};

export function PartnersPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  const pc = PARTNER_COPY[lang];
  usePageMeta(t.eyebrow, t.lead);
  const [path, setPath] = useState(0);
  const cur = pc.paths[path];
  // Developers and service providers have no programme page of their own yet:
  // their panel uses this page's own description of them.
  const fallback = [null, null, null, t.types[0][1], t.types[2][1]][path];
  const eyebrow = (text: string, light = false) => (
    <p className={`text-[12px] uppercase tracking-[0.2em] mb-5 flex items-center gap-2.5 ${light ? 'text-[#F06A6E]' : 'text-[#D12126]'}`}><Flag /> {text}</p>
  );

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden min-h-[72vh] flex items-end bg-[#2A2623] text-white">
        <HeroBg image="/photos/hbc-meeting.webp" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#F06A6E] mb-7 flex items-center gap-3">
              <Flag className="text-[#F06A6E]" /> {t.eyebrow}
            </p>
            <h1 className="serif text-5xl lg:text-[5rem] mb-8 leading-[0.98]">{t.h1a}<br />{t.h1b}</h1>
            <p className="text-lg md:text-xl text-[#E9E3DA]/90 leading-relaxed max-w-2xl">{t.lead}</p>
          </motion.div>
        </div>
      </section>

      {/* The network in a statement and four figures. */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-16 gap-y-14">
          <div className="lg:col-span-7">
            {eyebrow(t.introEyebrow)}
            <Statement heading={t.introTitle} red={pc.heroSub}>
              <p className="mt-8 text-[1.0625rem] leading-[1.8] text-[#4A443F]">{t.intro}</p>
              <p className="mt-5 text-[1.0625rem] leading-[1.8] text-[#4A443F]">{pc.why}</p>
            </Statement>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <FigureStack
              lang={lang}
              pairs={2}
              figures={[
                { value: PARTNER_COUNT, suf: '+', label: t.figures[0] },
                { value: WORKSPACE_LOCATIONS.length, label: t.figures[1] },
                { value: pc.paths.length, label: t.figures[2] },
                { value: '24h', label: t.figures[3], note: 1 },
              ]}
              notes={[t.figureNote]}
            />
          </div>
        </div>
      </section>

      {/* The five ways to partner: a tab for each, its facts in the panel. */}
      <section id="our-partners" className="relative py-24 lg:py-32 bg-white scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-12 lg:mb-16">
            {eyebrow(t.waysEyebrow)}
            <h2 className="serif text-4xl lg:text-5xl">{t.waysTitle}</h2>
          </div>
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-8">
            <div role="tablist" aria-label={t.waysTitle} className="lg:col-span-4 flex lg:block gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 lg:mx-0 lg:px-0 lg:border-t lg:border-[#2A2623]/15">
              {pc.paths.map((p, k) => (
                <button
                  key={p.id}
                  role="tab"
                  type="button"
                  aria-selected={k === path}
                  onClick={() => setPath(k)}
                  className={`group shrink-0 lg:w-full text-left flex items-center justify-between gap-4 px-5 py-3 lg:px-0 lg:py-6 border lg:border-0 lg:border-b border-[#2A2623]/15 transition-colors ${k === path ? 'border-[#D12126] bg-[#D12126] text-white lg:bg-transparent lg:text-[#D12126]' : 'text-[#2A2623] hover:text-[#D12126]'}`}
                >
                  <span>
                    <span className={`hidden lg:block text-[12px] uppercase tracking-[0.18em] mb-1.5 ${k === path ? 'text-[#D12126]' : 'text-[#6B645D]'}`}>{String(k + 1).padStart(2, '0')} · {p.tag}</span>
                    <span className="serif text-[1.05rem] lg:text-[1.5rem] leading-snug whitespace-nowrap lg:whitespace-normal">{p.title}</span>
                  </span>
                  <ArrowRight size={18} className={`hidden lg:block shrink-0 transition-transform ${k === path ? 'translate-x-1' : 'opacity-0 group-hover:opacity-60'}`} />
                </button>
              ))}
            </div>

            <div role="tabpanel" key={cur.id} className="lg:col-span-8">
              <div className="relative aspect-[16/7] overflow-hidden rounded-[8px] bg-[#2A2623]">
                <img loading="lazy" decoding="async" {...photo(PATH_PHOTOS[path], '(min-width: 1024px) 62vw, 100vw')} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              {cur.line && <p className="serif mt-8 text-[1.5rem] lg:text-[1.9rem] leading-[1.3] text-[#D12126]">{cur.line}</p>}
              <p className="mt-5 max-w-[68ch] text-[1.0625rem] leading-[1.8] text-[#4A443F]">{cur.lead ?? fallback}</p>

              {cur.stats && (
                <dl className="mt-10 grid grid-cols-3 border-y border-[#2A2623]/15">
                  {cur.stats.map(([n, label], k) => (
                    <div key={label} className={`py-7 text-center ${k ? 'border-l border-[#2A2623]/15' : ''}`}>
                      <dd className="serif text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] leading-none lining-nums text-[#D12126]">{n}</dd>
                      <dt className="mt-3 px-2 text-[12px] sm:text-[13px] leading-snug text-[#2A2623]">{label}</dt>
                    </div>
                  ))}
                </dl>
              )}

              {cur.props && (
                <div className="mt-10">
                  <p className="text-[12px] uppercase tracking-[0.18em] text-[#6B645D]">{t.whyLbl}</p>
                  <dl className="mt-4 grid sm:grid-cols-2 gap-x-12 border-t border-[#2A2623]/15">
                    {cur.props.map(([title, d]) => (
                      <div key={title} className="border-b border-[#2A2623]/15 py-5">
                        <dt className="serif text-[1.2rem] text-[#2A2623]">{title}</dt>
                        <dd className="mt-1.5 text-[15px] leading-relaxed text-[#6B645D]">{d}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {cur.steps && (
                <div className="mt-10">
                  <p className="text-[12px] uppercase tracking-[0.18em] text-[#6B645D]">{t.howLbl}</p>
                  <ol className="mt-4 grid sm:grid-cols-3 gap-x-8 gap-y-6">
                    {cur.steps.map(([title, d], k) => (
                      <li key={title} className="border-t-2 border-[#D12126] pt-4">
                        <span className="text-[13px] font-medium tabular-nums tracking-[0.08em] text-[#D12126]">{String(k + 1).padStart(2, '0')}</span>
                        <p className="serif mt-1 text-[1.2rem] text-[#2A2623]">{title}</p>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-[#6B645D]">{d}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {cur.table && (
                <div className="mt-10">
                  <p className="text-[12px] uppercase tracking-[0.18em] text-[#6B645D]">{cur.table.title}</p>
                  <p className="mt-2 max-w-[68ch] text-[15px] leading-relaxed text-[#6B645D]">{cur.table.lead}</p>
                  <dl className="mt-4 border-t border-[#2A2623]/15">
                    {cur.table.rows.map(([label, value]) => (
                      <div key={label} className="grid sm:grid-cols-[12rem_1fr] gap-x-8 gap-y-1 border-b border-[#2A2623]/15 py-4">
                        <dt className="serif text-[1.1rem] text-[#2A2623]">{label}</dt>
                        <dd className="text-[15px] leading-relaxed text-[#4A443F]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link to={l('/contact')} className="group inline-flex items-center gap-2 px-8 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-colors">
                  {t.talk} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                {cur.href && (
                  <a href={ws(lang, cur.href)} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 border-b border-[#D12126]/40 pb-1 text-[12px] uppercase tracking-[0.18em] text-[#D12126] hover:border-[#D12126] transition-colors">
                    {t.more} <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why partner — benefits + feature image */}
      <section className="relative py-24 lg:py-32 bg-white text-[#2A2623]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-16 gap-y-12 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden rounded-[8px]">
            <img loading="lazy" decoding="async" {...photo('/photos/hbc-lounge-2.webp', '(min-width: 1024px) 40vw, 100vw')} alt={t.whyAlt} className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {eyebrow(t.whyEyebrow)}
            <h2 className="serif text-4xl lg:text-5xl mb-10 leading-tight">{t.whyTitle}</h2>
            <dl className="border-t border-[#2A2623]/15">
              {t.benefits.map(([title, desc], i) => (
                <div key={title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-[#2A2623]/15 py-6">
                  <span className="pt-1 text-[#D12126]">{BENEFIT_ICONS[i]}</span>
                  <div>
                    <dt className="serif text-[1.35rem] text-[#2A2623]">{title}</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-[#6B645D]">{desc}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The companies HiLink works with, each with its field where it has one. */}
      <section className="relative py-24 lg:py-28 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              {eyebrow(t.stripLbl)}
              <h2 className="serif text-4xl lg:text-5xl">{t.stripTitle}</h2>
            </div>
            <p className="serif text-[2.75rem] lg:text-[3.5rem] leading-none lining-nums text-[#D12126]">{PARTNER_FIGURE}</p>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-[#2A2623]/12">
            {PARTNERS.map((p) => (
              <li key={p.id} className="group relative flex h-36 lg:h-44 flex-col items-center justify-center gap-4 border-b border-r border-[#2A2623]/12 px-6 transition-colors hover:bg-[#FBF8F5]">
                <img loading="lazy" decoding="async" src={p.src} width={p.w} height={p.h} alt={p.name} className="hl-logo max-h-9 lg:max-h-11 w-auto max-w-[70%] object-contain" />
                {t.fields[p.id] && <span className="text-[12px] uppercase tracking-[0.14em] text-[#6B645D]">{t.fields[p.id]}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How partnership works: the four steps as a list, on a dark band. */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[#361716] text-white">
        <Contours />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-16 gap-y-10">
          <div className="lg:col-span-5">
            {eyebrow(t.howEyebrow, true)}
            <h2 className="serif text-4xl lg:text-5xl leading-tight">{t.howTitle}</h2>
          </div>
          <ol className="lg:col-span-7 border-t border-white/20">
            {t.steps.map(([title, desc], i) => (
              <li key={title} className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_14rem_1fr] gap-x-4 gap-y-1 border-b border-white/20 py-6 lg:py-7">
                <span className="pt-1.5 text-[13px] font-medium tabular-nums tracking-[0.08em] text-[#F06A6E]">{String(i + 1).padStart(2, '0')}</span>
                <p className="serif text-[1.4rem] lg:text-[1.6rem] leading-snug">{title}</p>
                <p className="col-start-2 sm:col-start-3 text-[15px] leading-relaxed text-white/75">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Partner with us — feature */}
      <section id="partner-with-us" className="relative overflow-hidden bg-white text-[#2A2623]">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-0 overflow-hidden">
            <img loading="lazy" decoding="async" {...photo('/photos/hbc-boardroom.webp')} alt={t.withAlt} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="px-8 lg:px-16 py-20 lg:py-28">
            <div className="text-[#D12126] mb-6"><Handshake size={40} /></div>
            <h2 className="serif text-4xl lg:text-5xl mb-8">{t.withTitle}</h2>
            <p className="text-lg text-[#6B645D] leading-relaxed mb-8">{t.withBody}</p>
            <div className="border-t border-[#2A2623]/15 mb-10">
              <h3 className="serif text-xl pt-6 mb-2">{t.lookFor}</h3>
              <ul>
                {t.lookItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-[#2A2623]/10 py-3.5">
                    <div className="w-1.5 h-1.5 bg-[#D12126] rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-[#2A2623] text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link to={l('/contact')} className="group inline-flex items-center gap-2 px-10 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-colors">
              {t.start}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
