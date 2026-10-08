import { Link } from 'react-router';
import { Globe, FileCheck, Users, TrendingUp, MapPin, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { FAQ } from '../components/FAQ';
import { LOCATIONS } from '../data/locations';
import { PARTNERS } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';

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
      <section className="relative min-h-screen bg-[#2A2623] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/photos/hbc-boardroom.webp"
            alt=""
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2623] via-[#2A2623]/45 to-[#2A2623]/10" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 w-full">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#F06A6E] mb-8">{t.eyebrow}</p>
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
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#D12126] text-white text-[11px] uppercase tracking-widest hover:bg-[#A3181C] transition-colors group"
              >
                {t.request}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white text-[11px] uppercase tracking-widest hover:border-white transition-colors"
              >
                {t.explore}
              </a>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-px bg-white/10 mt-20">
            {t.stats.map(([value, label]) => (
              <div key={label} className="bg-[#23201D] border-t border-white/10 px-8 py-6">
                <div className="serif text-3xl text-[#F06A6E] mb-1">{value}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services — interactive tabs ── */}
      <section id="services" className="bg-[#F4F0EA] py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4">{t.svcEyebrow}</p>
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
                    <div className={`text-[10px] uppercase tracking-[0.25em] mb-1 transition-colors ${activeService === i ? 'text-[#D12126]' : 'text-[#6B645D]'}`}>
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
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  key={activeService}
                  src={services[activeService].image}
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

      {/* ── Process ── */}
      <section className="bg-white py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4">{t.howEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl max-w-lg">{t.howTitle}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-px bg-[#2A2623]/10">
            {t.steps.map(([title, desc], i) => (
              <div key={title} className="bg-white p-8 lg:p-10">
                <div className="serif text-[56px] font-light text-[#2A2623]/08 leading-none mb-6">0{i + 1}</div>
                <div className="w-6 h-px bg-[#D12126] mb-6" />
                <h3 className="serif text-2xl mb-4">{title}</h3>
                <p className="text-[#6B645D] text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sector expertise ── */}
      <section className="bg-[#F4F0EA] py-28 text-[#2A2623]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4">{t.secEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl">{t.secTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2623]/10">
            {t.sectors.map((name, i) => (
              <div key={name} className="bg-white p-8 group hover:bg-[#FBECEC] transition-colors">
                <div className="serif text-4xl text-[#D12126] mb-1">0{i + 1}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#6B645D] mb-6">{t.secLabel}</div>
                <h3 className="serif text-xl text-[#2A2623] mb-3">{name}</h3>
                <div className="w-8 h-px bg-[#D12126]/30 group-hover:bg-[#D12126] transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Partners ── */}
      <section className="bg-white py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4">{t.prtEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.prtTitle}</h2>
            <p className="text-lg text-[#6B645D] max-w-2xl mx-auto">
              {t.prtLead}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#2A2623]/10">
            {PARTNERS.map((p) => (
              <div
                key={p.id}
                className="bg-white py-10 flex items-center justify-center text-[#2A2623]/40 hover:text-[#D12126] transition-colors"
              >
                <span className="serif text-xl lg:text-2xl font-light whitespace-nowrap">{p.name}</span>
              </div>
            ))}
            {/* Fill the last row so the grid shows no empty grey cell. */}
            {Array.from({ length: (5 - (PARTNERS.length % 5)) % 5 }, (_, i) => (
              <div key={`fill-${i}`} className="bg-white hidden lg:block" />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <FAQ
        items={t.faqs}
        eyebrow={t.faqEyebrow}
        title={t.faqTitle}
        subtitle={t.faqSub}
        background="beige"
      />

      {/* ── CTA ── */}
      <section className="bg-[#FBECEC] py-28 text-[#2A2623]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="serif text-4xl lg:text-5xl mb-4">{t.ctaTitle}</h2>
            <p className="text-[#6B645D] text-lg max-w-lg">
              {t.ctaLead}
            </p>
          </div>
          <Link
            to={l('/contact')}
            className="shrink-0 px-12 py-4 bg-[#D12126] text-white text-[11px] uppercase tracking-widest hover:bg-[#A3181C] transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
