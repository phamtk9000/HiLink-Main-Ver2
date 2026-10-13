import { Link } from 'react-router';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Globe, FileCheck, Users, TrendingUp, MapPin, Shield } from '../components/Glyph';
import { useState } from 'react';
import { FAQ } from '../components/FAQ';
import { LOCATIONS } from '../data/locations';
import { PARTNERS } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { Candles } from '../components/Candles';
import { photo } from '../lib/photo';
import { IsoScene } from '../components/IsoScene';
import { FigureStack, Statement } from '../components/Figures';
import { Contours } from '../components/Contours';

const SERVICE_META = [
  { icon: <Globe size={28} />, image: '/photos/hbc-client-meeting.webp' },
  { icon: <FileCheck size={28} />, image: '/photos/hbc-reception.webp' },
  { icon: <Shield size={28} />, image: '/photos/hbc-boardroom.webp' },
  { icon: <MapPin size={28} />, image: '/photos/f19-window.webp' },
  { icon: <Users size={28} />, image: '/photos/hbc-team.webp' },
  { icon: <TrendingUp size={28} />, image: '/photos/f15-office-hi08.webp' },
];

const T = {
  en: {
    meta: 'Business advisory for international companies entering or expanding in Vietnam — from strategy through to operational launch.',
    eyebrow: 'Business Consulting', title: "Navigate Vietnam's Business Landscape with Confidence",
    lead: "Expert advisory for international businesses entering or expanding in Vietnam's dynamic market — from strategy through to operational launch.",
    request: 'Request Consultation', explore: 'Explore Services',
    stats: [['2020', 'Founded in Ha Noi'], [String(LOCATIONS.length), 'HiLink Locations'], [String(PARTNERS.length), 'Partner Companies']],
    vnEyebrow: 'Vietnam in figures', vnTitle: 'Why companies are coming to Vietnam',
    vnRed: 'Vietnam’s economy grew 8.02% in 2025, and foreign investors disbursed US$27.62 billion — the most in five years.',
    vnInk: 'We help international companies turn that momentum into a licensed, staffed and operating business.',
    vnFigures: [
      { value: 8.02, decimals: 2, suf: '%', label: 'GDP growth, 2025', note: 1 },
      { value: 38.42, decimals: 2, pre: 'US$', suf: 'B', label: 'Registered foreign direct investment, 2025', note: 2 },
      { value: 27.62, decimals: 2, pre: 'US$', suf: 'B', label: 'Disbursed FDI, 2025', note: 2 },
      { value: 20, suf: '%', label: 'Standard corporate income tax', note: 3 },
    ],
    vnNotes: [
      'General Statistics Office of Vietnam, estimate for the full year 2025.',
      'General Statistics Office of Vietnam, full year 2025. Disbursement was the highest in five years.',
      'Law on Corporate Income Tax No. 67/2025/QH15, in force from 1 October 2025. Lower rates apply to small enterprises and to encouraged sectors and locations.',
    ],
    lawLbl: 'Regulatory update',
    law: 'The Law on Investment 2025 (No. 143/2025/QH15) has been in force since 1 March 2026. Where market-access conditions are met, a foreign investor may now set up the company first and complete investment registration afterwards — we advise on the right sequence for your sector.',
    fields: { fedex: 'Logistics', lianlian: 'Cross-border payments', kosaido: 'Human resources', wts: 'Tax advisory', gp: 'Legal', hicorp: 'Parent group' } as Record<string, string>,
    svcEyebrow: 'What We Do', svcTitle: 'Comprehensive Business Solutions',
    services: [
      { title: 'Market Entry Strategy', description: 'Comprehensive market analysis, competitive landscape assessment, and strategic roadmap for successful Vietnam market entry.', points: ['Feasibility assessment', 'Competitive benchmarking', 'Go-to-market roadmap', 'Risk mitigation planning'] },
      { title: 'Company Formation and Licensing', description: 'End-to-end support for business registration, investment certificates, and regulatory compliance in Vietnam.', points: ['Investment certificate (IRC)', 'Enterprise registration (ERC)', 'Foreign ownership structures', 'Branch and representative offices'] },
      { title: 'Legal and Regulatory Advisory', description: "Navigate Vietnam's regulatory framework with expert guidance on compliance, permits, and legal requirements.", points: ['Labour law compliance', 'Tax structuring', 'Contract drafting', 'Dispute resolution'] },
      { title: 'Location and Site Selection', description: 'Strategic analysis and recommendations for office, retail, or industrial site selection across Vietnam.', points: ['District-by-district analysis', 'Infrastructure assessment', 'Lease negotiation', 'Fit-out coordination'] },
      { title: 'Partner and Talent Sourcing', description: 'Connect with vetted local partners, suppliers, and senior talent to accelerate your operations.', points: ['Executive search', 'Distributor vetting', 'Joint venture facilitation', 'Supplier due diligence'] },
      { title: 'Operational Setup Support', description: 'Comprehensive operational launch support including HR, banking, utilities, and infrastructure setup.', points: ['Banking setup', 'HR policies and payroll', 'IT and telecoms', 'Vendor management'] },
    ],
    howEyebrow: 'How We Work', howTitle: 'A Structured Approach to Market Entry',
    steps: [
      ['Discovery', 'Understand your objectives, analyse market fit, and develop strategic recommendations tailored to your sector.'],
      ['Strategy', 'Create a detailed market entry roadmap with timelines, budgets, milestones, and risk mitigation plans.'],
      ['Implementation', 'Execute company formation, licensing, office setup, and operational infrastructure with expert on-ground support.'],
      ['Optimisation', 'Continuous advisory on compliance, performance, and business development as your Vietnam operations mature.'],
    ],
    secEyebrow: 'Sector Expertise', secTitle: 'Deep Industry Knowledge', secLabel: 'Sector',
    sectors: ['Technology and Software', 'Manufacturing and Industrial', 'Retail and E-commerce', 'Professional Services', 'Hospitality and F&B', 'Healthcare and Education'],
    prtEyebrow: 'Our Partners', prtTitle: 'A Trusted Network on the Ground',
    prtLead: 'We work alongside companies across logistics, finance, HR and professional services to deliver seamless market entry.',
    faqSub: 'Common questions from companies expanding into Vietnam.', faqEyebrow: 'FAQs', faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'How long does company registration in Vietnam take?', answer: 'Most foreign-invested entities are registered within four to eight weeks, depending on the business line and licensing requirements. We manage the full process and keep you updated at each milestone.' },
      { question: 'Can foreigners own 100% of a company in Vietnam?', answer: 'In many sectors, yes — full foreign ownership is permitted. Certain regulated industries have caps or conditions, which we assess during the discovery stage before recommending a structure.' },
      { question: 'Do you help with ongoing compliance after setup?', answer: 'Yes. Beyond formation we provide continuous advisory on tax, accounting, licensing, and reporting so your operations remain fully compliant as they grow.' },
      { question: 'What support do you offer for market entry strategy?', answer: 'We provide market analysis, entry roadmaps, investment structuring, and on-ground implementation — from initial discovery through to optimisation of your live operations.' },
      { question: 'How are your advisory services priced?', answer: 'Engagements are scoped to your objectives, typically as fixed-fee packages for defined deliverables or retainers for ongoing advisory. We agree on pricing transparently before any work begins.' },
    ],
    ctaTitle: 'Ready to Enter the Vietnam Market?', ctaLead: 'Schedule a consultation to discuss your objectives and explore the right structure for your business.', cta: 'Book a Consultation',
  },
  vi: {
    meta: 'Tư vấn doanh nghiệp cho công ty quốc tế vào hoặc mở rộng tại Việt Nam — từ chiến lược đến khi đi vào vận hành.',
    eyebrow: 'Tư vấn doanh nghiệp', title: 'Tự tin trên thị trường kinh doanh Việt Nam',
    lead: 'Tư vấn chuyên sâu cho doanh nghiệp quốc tế gia nhập hoặc mở rộng tại thị trường Việt Nam năng động — từ chiến lược đến khi đi vào vận hành.',
    request: 'Yêu cầu tư vấn', explore: 'Khám phá dịch vụ',
    stats: [['2020', 'Thành lập tại Hà Nội'], [String(LOCATIONS.length), 'Địa điểm HiLink'], [String(PARTNERS.length), 'Doanh nghiệp đối tác']],
    vnEyebrow: 'Việt Nam qua số liệu', vnTitle: 'Vì sao doanh nghiệp đến Việt Nam',
    vnRed: 'Kinh tế Việt Nam tăng trưởng 8,02% trong năm 2025, và vốn đầu tư nước ngoài giải ngân đạt 27,62 tỷ USD — mức cao nhất trong năm năm.',
    vnInk: 'Chúng tôi giúp doanh nghiệp quốc tế biến đà tăng trưởng đó thành một doanh nghiệp có giấy phép, có đội ngũ và đi vào vận hành.',
    vnFigures: [
      { value: 8.02, decimals: 2, suf: '%', label: 'Tăng trưởng GDP năm 2025', note: 1 },
      { value: 38.42, decimals: 2, suf: ' tỷ USD', label: 'Vốn FDI đăng ký năm 2025', note: 2 },
      { value: 27.62, decimals: 2, suf: ' tỷ USD', label: 'Vốn FDI giải ngân năm 2025', note: 2 },
      { value: 20, suf: '%', label: 'Thuế suất thuế thu nhập doanh nghiệp phổ thông', note: 3 },
    ],
    vnNotes: [
      'Tổng cục Thống kê, số ước tính cả năm 2025.',
      'Tổng cục Thống kê, cả năm 2025. Vốn giải ngân cao nhất trong năm năm.',
      'Luật Thuế thu nhập doanh nghiệp số 67/2025/QH15, hiệu lực từ 01/10/2025. Doanh nghiệp nhỏ và các ngành, địa bàn ưu đãi được áp dụng mức thấp hơn.',
    ],
    lawLbl: 'Cập nhật pháp lý',
    law: 'Luật Đầu tư 2025 (số 143/2025/QH15) có hiệu lực từ 01/03/2026. Khi đáp ứng điều kiện tiếp cận thị trường, nhà đầu tư nước ngoài nay có thể thành lập doanh nghiệp trước rồi hoàn tất đăng ký đầu tư sau — chúng tôi tư vấn trình tự phù hợp với ngành của bạn.',
    fields: { fedex: 'Logistics', lianlian: 'Thanh toán xuyên biên giới', kosaido: 'Nhân sự', wts: 'Tư vấn thuế', gp: 'Pháp lý', hicorp: 'Tập đoàn mẹ' } as Record<string, string>,
    svcEyebrow: 'Chúng tôi làm gì', svcTitle: 'Giải pháp doanh nghiệp toàn diện',
    services: [
      { title: 'Chiến lược gia nhập thị trường', description: 'Phân tích thị trường, đánh giá cạnh tranh và lộ trình chiến lược để gia nhập thị trường Việt Nam thành công.', points: ['Đánh giá khả thi', 'So sánh đối thủ', 'Lộ trình ra thị trường', 'Kế hoạch giảm thiểu rủi ro'] },
      { title: 'Thành lập công ty & giấy phép', description: 'Hỗ trợ trọn gói đăng ký kinh doanh, giấy chứng nhận đầu tư và tuân thủ quy định tại Việt Nam.', points: ['Giấy chứng nhận đăng ký đầu tư (IRC)', 'Giấy chứng nhận đăng ký doanh nghiệp (ERC)', 'Cơ cấu sở hữu nước ngoài', 'Chi nhánh & văn phòng đại diện'] },
      { title: 'Tư vấn pháp lý & quy định', description: 'Nắm vững khung pháp lý Việt Nam với hướng dẫn chuyên sâu về tuân thủ, giấy phép và yêu cầu pháp lý.', points: ['Tuân thủ luật lao động', 'Cơ cấu thuế', 'Soạn thảo hợp đồng', 'Giải quyết tranh chấp'] },
      { title: 'Chọn vị trí & địa điểm', description: 'Phân tích và đề xuất chiến lược chọn địa điểm văn phòng, bán lẻ hoặc công nghiệp trên khắp Việt Nam.', points: ['Phân tích theo từng quận', 'Đánh giá hạ tầng', 'Đàm phán thuê', 'Điều phối hoàn thiện'] },
      { title: 'Tìm đối tác & nhân sự', description: 'Kết nối với đối tác, nhà cung cấp địa phương đã thẩm định và nhân sự cấp cao để đẩy nhanh vận hành.', points: ['Tuyển dụng cấp cao', 'Thẩm định nhà phân phối', 'Hỗ trợ liên doanh', 'Thẩm định nhà cung cấp'] },
      { title: 'Hỗ trợ thiết lập vận hành', description: 'Hỗ trợ khởi động vận hành toàn diện gồm nhân sự, ngân hàng, tiện ích và hạ tầng.', points: ['Mở tài khoản ngân hàng', 'Chính sách nhân sự & tính lương', 'CNTT & viễn thông', 'Quản lý nhà cung cấp'] },
    ],
    howEyebrow: 'Cách chúng tôi làm việc', howTitle: 'Cách tiếp cận bài bản để gia nhập thị trường',
    steps: [
      ['Tìm hiểu', 'Hiểu mục tiêu, phân tích mức độ phù hợp với thị trường và đưa ra khuyến nghị chiến lược theo ngành của bạn.'],
      ['Chiến lược', 'Xây dựng lộ trình gia nhập thị trường chi tiết với thời gian, ngân sách, cột mốc và kế hoạch giảm rủi ro.'],
      ['Triển khai', 'Thực hiện thành lập công ty, giấy phép, thiết lập văn phòng và hạ tầng vận hành với hỗ trợ tại chỗ.'],
      ['Tối ưu', 'Tư vấn liên tục về tuân thủ, hiệu quả và phát triển kinh doanh khi hoạt động tại Việt Nam trưởng thành.'],
    ],
    secEyebrow: 'Chuyên môn theo ngành', secTitle: 'Am hiểu sâu từng ngành', secLabel: 'Ngành',
    sectors: ['Công nghệ & phần mềm', 'Sản xuất & công nghiệp', 'Bán lẻ & thương mại điện tử', 'Dịch vụ chuyên nghiệp', 'Khách sạn & F&B', 'Y tế & giáo dục'],
    prtEyebrow: 'Đối tác', prtTitle: 'Mạng lưới tin cậy tại chỗ',
    prtLead: 'Chúng tôi đồng hành cùng các doanh nghiệp trong logistics, tài chính, nhân sự và dịch vụ chuyên nghiệp để việc gia nhập thị trường liền mạch.',
    faqSub: 'Những câu hỏi thường gặp từ doanh nghiệp mở rộng vào Việt Nam.', faqEyebrow: 'Câu hỏi', faqTitle: 'Câu hỏi thường gặp',
    faqs: [
      { question: 'Đăng ký công ty tại Việt Nam mất bao lâu?', answer: 'Hầu hết doanh nghiệp có vốn đầu tư nước ngoài được đăng ký trong bốn đến tám tuần, tuỳ ngành nghề và yêu cầu giấy phép. Chúng tôi quản lý toàn bộ quy trình và cập nhật cho bạn ở từng cột mốc.' },
      { question: 'Người nước ngoài có được sở hữu 100% công ty tại Việt Nam không?', answer: 'Ở nhiều ngành, có — được phép sở hữu nước ngoài toàn bộ. Một số ngành có điều kiện hoặc giới hạn, chúng tôi đánh giá ở giai đoạn tìm hiểu trước khi đề xuất cơ cấu.' },
      { question: 'HiLink có hỗ trợ tuân thủ sau khi thành lập không?', answer: 'Có. Ngoài thành lập, chúng tôi tư vấn liên tục về thuế, kế toán, giấy phép và báo cáo để hoạt động luôn tuân thủ khi phát triển.' },
      { question: 'HiLink hỗ trợ gì cho chiến lược gia nhập thị trường?', answer: 'Phân tích thị trường, lộ trình gia nhập, cơ cấu đầu tư và triển khai tại chỗ — từ tìm hiểu ban đầu đến tối ưu hoạt động thực tế.' },
      { question: 'Dịch vụ tư vấn được tính phí thế nào?', answer: 'Phạm vi được xác định theo mục tiêu của bạn, thường là gói phí cố định cho hạng mục cụ thể hoặc phí duy trì cho tư vấn liên tục. Chúng tôi thống nhất phí minh bạch trước khi bắt đầu.' },
    ],
    ctaTitle: 'Sẵn sàng gia nhập thị trường Việt Nam?', ctaLead: 'Đặt lịch tư vấn để trao đổi mục tiêu và tìm cơ cấu phù hợp cho doanh nghiệp của bạn.', cta: 'Đặt lịch tư vấn',
  },
};

export function BusinessConsultingPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);
  const [activeService, setActiveService] = useState(0);
  const services = t.services.map((s, i) => ({ ...s, ...SERVICE_META[i] }));

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-[#361716] flex items-end overflow-hidden">
        <IsoScene kind="market" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 w-full">
          <div className="max-w-3xl lg:max-w-[40rem]">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#F06A6E] mb-8 flex items-center gap-2.5"><Flag /> {t.eyebrow}</p>
            <h1
              className="serif text-white mb-8 leading-[1.05]"
              style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 300 }}
            >
              {t.title}
            </h1>
            <p className="text-[#E9E3DA] text-lg mb-10 max-w-xl leading-relaxed">
              {t.lead}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={l('/contact')}
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-widest hover:bg-[#A3181C] transition-colors group"
              >
                {t.request}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white text-[12px] uppercase tracking-widest hover:border-white transition-colors"
              >
                {t.explore}
              </a>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-px bg-white/10 mt-64 lg:mt-20">
            {t.stats.map(([value, label]) => (
              <div key={label} className="bg-[#2C1312] border-t border-white/10 px-4 sm:px-8 py-6">
                <div className="serif text-3xl text-[#F06A6E] mb-1">{value}</div>
                <div className="text-[12px] uppercase tracking-[0.2em] text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vietnam in figures (set out after hines.com): a statement beside
          a stack of sourced figures, and one regulatory note. ── */}
      <section className="relative bg-white py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-16 gap-y-14">
          <div className="lg:col-span-7">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {t.vnEyebrow}</p>
            <Statement heading={t.vnTitle} red={t.vnRed} ink={t.vnInk}>
              <div className="mt-12 border-l-2 border-[#D12126] pl-6">
                <p className="text-[12px] uppercase tracking-[0.18em] text-[#D12126]">{t.lawLbl}</p>
                <p className="mt-3 max-w-[62ch] text-[1.0625rem] leading-[1.75] text-[#4A443F]">{t.law}</p>
              </div>
            </Statement>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <FigureStack lang={lang} figures={t.vnFigures} notes={t.vnNotes} pairs={0} />
          </div>
        </div>
      </section>

      {/* ── Services — interactive tabs ── */}
      <section id="services" className="relative bg-white py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-4 flex items-center gap-2.5"><Flag /> {t.svcEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl">{t.svcTitle}</h2>
          </div>

          <div className="grid lg:grid-cols-[340px_1fr] gap-px bg-[#2A2623]/10">
            {/* Tab list */}
            <div className="bg-white">
              {services.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActiveService(i)}
                  className={`w-full text-left px-8 py-6 border-l-[3px] transition-all duration-200 flex items-center justify-between group ${
                    activeService === i
                      ? 'border-[#D12126] bg-[#F4F0EA]'
                      : 'border-transparent hover:border-[#D12126]/40'
                  }`}
                >
                  <div>
                    <div className={`text-[12px] uppercase tracking-[0.2em] mb-1 transition-colors ${activeService === i ? 'text-[#D12126]' : 'text-[#6B645D]'}`}>
                      0{i + 1}
                    </div>
                    <div className="serif text-lg">{s.title}</div>
                  </div>
                  <ArrowRight size={14} className={`transition-all duration-200 ${activeService === i ? 'text-[#D12126] translate-x-1' : 'text-transparent group-hover:text-[#D12126]/50'}`} />
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="bg-white">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[8px]">
                <img loading="lazy" decoding="async"
                  key={activeService}
                  {...photo(services[activeService].image)}
                  alt={services[activeService].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2623]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="text-[#D12126] mb-3">{services[activeService].icon}</div>
                  <h3 className="serif text-white text-3xl">{services[activeService].title}</h3>
                </div>
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-[#444] text-[16px] leading-relaxed mb-8">{services[activeService].description}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {services[activeService].points.map((p) => (
                    <div key={p} className="flex items-center gap-3 text-[14px] text-[#555]">
                      <CheckCircle size={14} className="text-[#D12126] shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process: the four stages as a list on a dark band ── */}
      <section className="relative overflow-hidden bg-[#361716] py-24 lg:py-32 text-white">
        <Contours />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-16 gap-y-10">
          <div className="lg:col-span-5">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#F06A6E] mb-5 flex items-center gap-2.5"><Flag /> {t.howEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl">{t.howTitle}</h2>
          </div>
          <ol className="lg:col-span-7 border-t border-white/20">
            {t.steps.map(([title, desc], i) => (
              <li key={title} className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_13rem_1fr] gap-x-4 gap-y-1 border-b border-white/20 py-6 lg:py-7">
                <span className="pt-1.5 text-[13px] font-medium tabular-nums tracking-[0.08em] text-[#F06A6E]">{String(i + 1).padStart(2, '0')}</span>
                <p className="serif text-[1.4rem] lg:text-[1.6rem] leading-snug">{title}</p>
                <p className="col-start-2 sm:col-start-3 text-[15px] leading-relaxed text-white/75">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Sector expertise: the six sectors as ruled rows ── */}
      <section className="relative bg-white py-24 lg:py-32 text-[#2A2623]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-16 gap-y-10">
          <div className="lg:col-span-4">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {t.secEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl">{t.secTitle}</h2>
            <p className="serif mt-8 text-[4.25rem] leading-none lining-nums text-[#D12126]">{t.sectors.length}</p>
            <p className="mt-2 text-[14px] text-[#2A2623]">{t.secLabel}</p>
          </div>
          <ol className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12 border-t border-[#2A2623]/15">
            {t.sectors.map((name, i) => (
              <li key={name} className="group flex items-baseline gap-5 border-b border-[#2A2623]/15 py-6 transition-colors hover:text-[#D12126]">
                <span className="text-[13px] font-medium tabular-nums tracking-[0.08em] text-[#D12126]">{String(i + 1).padStart(2, '0')}</span>
                <span className="serif text-[1.35rem] lg:text-[1.5rem] leading-snug">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Our Partners ── */}
      <section className="bg-white py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-4 flex items-center justify-center gap-2.5"><Flag /> {t.prtEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.prtTitle}</h2>
            <p className="text-lg text-[#6B645D] max-w-2xl mx-auto">
              {t.prtLead}
            </p>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-[#2A2623]/12">
            {PARTNERS.map((p) => (
              <li key={p.id} className="group flex h-36 lg:h-44 flex-col items-center justify-center gap-4 border-b border-r border-[#2A2623]/12 px-6 transition-colors hover:bg-[#FBF8F5]">
                <img loading="lazy" decoding="async" src={p.src} width={p.w} height={p.h} alt={p.name} className="hl-logo max-h-9 lg:max-h-11 w-auto max-w-[70%] object-contain group-hover:[filter:none]" />
                {t.fields[p.id] && <span className="text-[12px] uppercase tracking-[0.14em] text-[#6B645D]">{t.fields[p.id]}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQs ── */}
      <FAQ
        items={t.faqs}
        eyebrow={t.faqEyebrow}
        title={t.faqTitle}
        subtitle={t.faqSub}
      />

      {/* ── CTA ── */}
      <section className="relative bg-[#361716] py-28 text-white overflow-hidden">
        <Candles />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="serif text-4xl lg:text-5xl mb-4">{t.ctaTitle}</h2>
            <p className="text-white/70 text-lg max-w-lg">
              {t.ctaLead}
            </p>
          </div>
          <Link
            to={l('/contact')}
            className="shrink-0 px-12 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-widest hover:bg-[#A3181C] transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
