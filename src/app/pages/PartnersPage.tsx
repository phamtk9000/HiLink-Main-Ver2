import { Link } from 'react-router';
import { Handshake, Building, Globe, TrendingUp, ArrowRight, ShieldCheck, Layers, HeartHandshake, ClipboardList, Search, FileSignature, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';
import { PARTNERS } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';

const TYPE_META = [
  { icon: <Building size={28} />, image: '/photos/f19-window.webp' },
  { icon: <Globe size={28} />, image: '/photos/hbc-client-meeting.webp' },
  { icon: <TrendingUp size={28} />, image: '/photos/hbc-team.webp' },
];
const BENEFIT_ICONS = [<Layers size={24} />, <Globe size={24} />, <ShieldCheck size={24} />, <HeartHandshake size={24} />];
const STEP_ICONS = [<Search size={22} />, <ClipboardList size={22} />, <FileSignature size={22} />, <Rocket size={22} />];

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
      ['Access our portfolio', 'Work across managed assets and seven HiLink workspace locations in central Hanoi with steady, recurring demand.'],
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
      ['Tiếp cận danh mục', 'Làm việc với các tài sản đang quản lý và bảy địa điểm HiLink giữa trung tâm Hà Nội, với nhu cầu ổn định, thường xuyên.'],
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
  },
};

export function PartnersPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.lead);

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden min-h-[72vh] flex items-end bg-[#0F0F0F] text-white">
        <HeroBg image="/photos/hbc-meeting.webp" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#E5484D] mb-7 flex items-center gap-3">
              <span className="w-8 h-px bg-[#E5484D]" /> {t.eyebrow}
            </p>
            <h1 className="serif text-5xl lg:text-[5rem] mb-8 leading-[0.98]">{t.h1a}<br />{t.h1b}</h1>
            <p className="text-lg md:text-xl text-[#E6E6E6]/90 leading-relaxed max-w-2xl">
              {t.lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 lg:py-32 bg-[#F7F7F7]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-5">{t.introEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl leading-tight">{t.introTitle}</h2>
          </div>
          <div className="lg:col-span-7 flex items-center">
            <p className="text-xl text-[#707070] leading-relaxed">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Partner types — with images */}
      <section id="our-partners" className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-5">{t.typesEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl">{t.typesTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.types.map(([title, description], i) => (
              <motion.div key={title} className="group bg-white overflow-hidden border border-[#0F0F0F]/10" whileHover={{ y: -6 }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={TYPE_META[i].image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-11 h-11 bg-[#D12126] text-white flex items-center justify-center">{TYPE_META[i].icon}</div>
                </div>
                <div className="p-8">
                  <h3 className="serif text-2xl mb-4">{title}</h3>
                  <p className="text-[#707070] leading-relaxed text-[15px]">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why partner — benefits + feature image */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#E5484D] mb-5">{t.whyEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl mb-12 leading-tight">{t.whyTitle}</h2>
            <div className="grid sm:grid-cols-2 gap-px bg-white/10">
              {t.benefits.map(([title, desc], i) => (
                <div key={title} className="bg-[#0F0F0F] p-7">
                  <div className="text-[#D12126] mb-4">{BENEFIT_ICONS[i]}</div>
                  <h3 className="serif text-xl mb-2">{title}</h3>
                  <p className="text-[#E6E6E6]/70 text-[14px] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src="/photos/hbc-lounge-2.webp" alt={t.whyAlt} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Partners strip */}
      <section className="py-20 bg-[#F7F7F7] border-y border-[#0F0F0F]/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-8">{t.stripLbl}</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {PARTNERS.map((p) => (
              <span key={p.id} className="serif text-2xl text-[#0F0F0F]/35 hover:text-[#D12126] transition-colors">{p.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How partnership works */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-14 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-5">{t.howEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl leading-tight">{t.howTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0F0F0F]/10">
            {t.steps.map(([title, desc], i) => (
              <div key={title} className="bg-white p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#D12126]">{STEP_ICONS[i]}</span>
                  <span className="serif text-3xl text-[#0F0F0F]/15">0{i + 1}</span>
                </div>
                <h3 className="serif text-xl mb-3">{title}</h3>
                <p className="text-[#707070] text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner with us — feature */}
      <section id="partner-with-us" className="relative overflow-hidden bg-[#0F0F0F] text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-0 overflow-hidden">
            <img src="/photos/hbc-boardroom.webp" alt={t.withAlt} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="px-8 lg:px-16 py-20 lg:py-28">
            <div className="text-[#D12126] mb-6"><Handshake size={40} /></div>
            <h2 className="serif text-4xl lg:text-5xl mb-8">{t.withTitle}</h2>
            <p className="text-lg text-[#E6E6E6]/85 leading-relaxed mb-8">
              {t.withBody}
            </p>
            <div className="bg-white/[0.04] border border-white/10 p-8 mb-10">
              <h3 className="serif text-xl mb-6">{t.lookFor}</h3>
              <ul className="space-y-4">
                {t.lookItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#D12126] rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-[#E6E6E6] text-[15px]">{item}</span>
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
