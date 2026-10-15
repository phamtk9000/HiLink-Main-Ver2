import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Package, Truck, Factory, Shield, BarChart, MapPin, Warehouse } from '../components/Glyph';
import { motion } from 'motion/react';
import { useLang, usePageMeta } from '../lib/i18n';
import { Yard } from '../components/Yard';
import { Contours } from '../components/Contours';
import { CtaContact } from '../components/CtaContact';

// No HiLink photograph of an industrial site exists yet, so image slots show
// a dark panel with an icon. Swap in photos when HiLink supplies them.
const SERVICE_ICONS = [<Package size={32} />, <Factory size={32} />, <MapPin size={32} />, <Truck size={32} />, <Shield size={32} />, <BarChart size={32} />];

const T = {
  en: {
    meta: 'Warehousing, factory and logistics property solutions across Vietnam — from site selection to facility operations.',
    eyebrow: 'Industrial & Logistics', title: 'Strategic Solutions for Manufacturing & Distribution',
    lead: 'Warehousing, factory and logistics property for manufacturing and supply-chain businesses in Vietnam.',
    request: 'Request Information',
    svcTitle: 'Comprehensive Industrial Solutions', svcLead: 'End-to-end support for your manufacturing and logistics operations',
    services: [
      ['Warehouse & Distribution Centers', 'Modern warehousing facilities with advanced logistics infrastructure, security systems, and efficient layouts.'],
      ['Factory & Manufacturing Space', 'Purpose-built manufacturing facilities in established industrial parks with full utilities and compliance.'],
      ['Industrial Park Placement', "Strategic site selection within Vietnam's top-tier industrial zones with optimal infrastructure and incentives."],
      ['Logistics Coordination', 'Supply chain optimization, last-mile delivery solutions, and transportation network integration.'],
      ['Compliance & Safety Management', 'Regulatory compliance support, safety protocols, environmental standards, and permit management.'],
      ['Facility Operations Support', 'Ongoing operational management, maintenance, utilities, and vendor coordination for seamless operations.'],
    ],
    locTitle: 'Strategic Locations', locLead: "Access to Vietnam's premier industrial zones",
    parks: [
      { name: 'Northern Industrial Corridor', location: 'Bac Ninh, Bac Giang, Hai Phong', features: ['Proximity to Hanoi and major ports', 'Electronics and manufacturing hub', 'Excellent highway and rail connections', 'Favorable tax incentives'] },
      { name: 'Southern Logistics Hub', location: 'Binh Duong, Dong Nai, Long An', features: ['Adjacent to HCMC metropolitan area', 'Deep-water port access', 'Multimodal transportation links', 'Established supply chain ecosystem'] },
    ],
    facTitle: 'Facility Options',
    facilities: [
      ['Built-to-Suit', 'Custom-designed facilities tailored to your specific operational requirements and specifications', 'From 5,000m²'],
      ['Ready-Built Warehouses', 'Immediate occupancy warehouses with standard specifications and flexible lease terms', '1,000 - 20,000m²'],
      ['Shared Logistics Centers', 'Cost-effective shared warehousing solutions with professional management and security', 'From 500m²'],
    ],
    whyTitle: 'Why Partner with HiLink for Industrial Real Estate',
    values: [
      ['Local Expertise', 'Deep relationships with industrial park developers and understanding of regional advantages'],
      ['Regulatory Navigation', 'Expert support for permits, environmental compliance, and operational licensing'],
      ['Cost Optimization', 'Negotiate favorable terms and identify tax incentives and operational efficiencies'],
      ['Operational Continuity', 'Ensure uninterrupted operations with proactive maintenance and vendor management'],
    ],
    ctaTitle: 'Find Your Ideal Industrial Space', ctaLead: 'Discuss your manufacturing and logistics requirements with our industrial real estate specialists.', cta: 'Request Site Information',
  },
  vi: {
    meta: 'Giải pháp bất động sản kho bãi, nhà xưởng và logistics trên khắp Việt Nam — từ chọn địa điểm đến vận hành cơ sở.',
    eyebrow: 'Công nghiệp & logistics', title: 'Giải pháp chiến lược cho sản xuất & phân phối',
    lead: 'Bất động sản kho bãi, nhà xưởng và logistics cho doanh nghiệp sản xuất và chuỗi cung ứng tại Việt Nam.',
    request: 'Yêu cầu thông tin',
    svcTitle: 'Giải pháp công nghiệp toàn diện', svcLead: 'Hỗ trợ trọn gói cho hoạt động sản xuất và logistics của bạn',
    services: [
      ['Kho & trung tâm phân phối', 'Kho bãi hiện đại với hạ tầng logistics tiên tiến, hệ thống an ninh và bố trí hiệu quả.'],
      ['Nhà xưởng & không gian sản xuất', 'Nhà xưởng xây sẵn trong các khu công nghiệp lâu năm, đầy đủ tiện ích và tuân thủ.'],
      ['Chọn khu công nghiệp', 'Chọn địa điểm chiến lược trong các khu công nghiệp hàng đầu Việt Nam với hạ tầng và ưu đãi tốt nhất.'],
      ['Điều phối logistics', 'Tối ưu chuỗi cung ứng, giải pháp giao hàng chặng cuối và kết nối mạng lưới vận tải.'],
      ['Quản lý tuân thủ & an toàn', 'Hỗ trợ tuân thủ quy định, quy trình an toàn, tiêu chuẩn môi trường và quản lý giấy phép.'],
      ['Hỗ trợ vận hành cơ sở', 'Quản lý vận hành, bảo trì, tiện ích và điều phối nhà cung cấp để hoạt động liền mạch.'],
    ],
    locTitle: 'Vị trí chiến lược', locLead: 'Tiếp cận các khu công nghiệp hàng đầu Việt Nam',
    parks: [
      { name: 'Hành lang công nghiệp phía Bắc', location: 'Bắc Ninh, Bắc Giang, Hải Phòng', features: ['Gần Hà Nội và các cảng lớn', 'Trung tâm điện tử và sản xuất', 'Kết nối cao tốc và đường sắt thuận lợi', 'Ưu đãi thuế hấp dẫn'] },
      { name: 'Trung tâm logistics phía Nam', location: 'Bình Dương, Đồng Nai, Long An', features: ['Liền kề vùng đô thị TP.HCM', 'Tiếp cận cảng nước sâu', 'Kết nối vận tải đa phương thức', 'Hệ sinh thái chuỗi cung ứng hoàn chỉnh'] },
    ],
    facTitle: 'Loại hình cơ sở',
    facilities: [
      ['Xây theo yêu cầu', 'Cơ sở thiết kế riêng theo yêu cầu và thông số vận hành của bạn', 'Từ 5.000m²'],
      ['Kho xây sẵn', 'Kho sẵn sàng sử dụng với thông số tiêu chuẩn và thời hạn thuê linh hoạt', '1.000 - 20.000m²'],
      ['Trung tâm logistics chia sẻ', 'Giải pháp kho chia sẻ tiết kiệm với quản lý chuyên nghiệp và an ninh', 'Từ 500m²'],
    ],
    whyTitle: 'Vì sao chọn HiLink cho bất động sản công nghiệp',
    values: [
      ['Am hiểu địa phương', 'Quan hệ sâu rộng với chủ đầu tư khu công nghiệp và hiểu rõ lợi thế từng vùng'],
      ['Xử lý thủ tục', 'Hỗ trợ chuyên sâu về giấy phép, tuân thủ môi trường và cấp phép vận hành'],
      ['Tối ưu chi phí', 'Đàm phán điều khoản có lợi, tìm ưu đãi thuế và hiệu quả vận hành'],
      ['Vận hành liên tục', 'Đảm bảo hoạt động không gián đoạn với bảo trì chủ động và quản lý nhà cung cấp'],
    ],
    ctaTitle: 'Tìm không gian công nghiệp phù hợp', ctaLead: 'Trao đổi yêu cầu sản xuất và logistics với chuyên gia bất động sản công nghiệp của chúng tôi.', cta: 'Yêu cầu thông tin địa điểm',
  },
};

export function IndustrialPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-64 lg:py-36 bg-[#361716] text-white">
        <Yard />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="grid lg:grid-cols-12 gap-12 xl:gap-24"
          >
            <motion.div className="lg:col-span-6">
              <p className="text-sm uppercase tracking-wider text-[#F06A6E] mb-8">{t.eyebrow}</p>
              <h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
                {t.title}
              </h1>
              <p className="text-xl text-[#F8F6F1] mb-12 leading-relaxed">
                {t.lead}
              </p>
              <Link
                to={l('/contact')}
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors group"
              >
                {t.request}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="relative py-24 lg:py-32 bg-white">
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2623]/15"
          >
            {t.services.map(([title, description], i) => (
              <ServiceCard key={title} icon={SERVICE_ICONS[i]} title={title} description={description} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industrial Parks */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.locTitle}</h2>
            <p className="text-xl text-[#6B645D] max-w-3xl mx-auto">
              {t.locLead}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12"
          >
            {t.parks.map((p, i) => (
              <IndustrialParkCard key={p.name} {...p} icon={i === 0 ? <Factory size={64} strokeWidth={1} /> : <Truck size={64} strokeWidth={1} />} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facility Types */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">{t.facTitle}</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
          >
            {t.facilities.map(([type, description, size]) => (
              <FacilityCard key={type} type={type} description={description} size={size} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          >
            <motion.div>
              <h2 className="serif text-4xl lg:text-5xl mb-8">
                {t.whyTitle}
              </h2>
              <div className="space-y-6">
                {t.values.map(([title, description]) => (
                  <ValuePoint key={title} title={title} description={description} />
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[#EDE7DF] flex items-center justify-center text-[#D12126]"
            >
              <Warehouse size={120} strokeWidth={0.8} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 bg-[#361716] text-white overflow-hidden">
        <Contours />
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
          <CtaContact className="mt-10" />
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
      className="bg-[#F4F0EA] p-8 lg:p-10"
      whileHover={{ y: -5 }}
    >
      <div className="text-[#D12126] mb-6">{icon}</div>
      <h3 className="serif text-2xl mb-4">{title}</h3>
      <p className="text-[#6B645D] leading-relaxed">{description}</p>
    </motion.div>
  );
}

function IndustrialParkCard({ name, location, features, icon }: {
  name: string;
  location: string;
  features: string[];
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      className="bg-white overflow-hidden"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] bg-[#EDE7DF] flex items-center justify-center text-[#D12126]">
        {icon}
      </div>
      <div className="p-8">
        <h3 className="serif text-3xl mb-2">{name}</h3>
        <p className="text-[#D12126] mb-6">{location}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#D12126] rounded-full mt-2 flex-shrink-0" />
              <span className="text-[#6B645D]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function FacilityCard({ type, description, size }: {
  type: string;
  description: string;
  size: string;
}) {
  return (
    <motion.div
      className="bg-white p-8"
      whileHover={{ y: -5 }}
    >
      <h3 className="serif text-2xl mb-4">{type}</h3>
      <p className="text-[#6B645D] mb-6 leading-relaxed">{description}</p>
      <div className="text-[#D12126] text-sm uppercase tracking-wider">{size}</div>
    </motion.div>
  );
}

function ValuePoint({ title, description }: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="serif text-xl mb-2">{title}</h3>
      <p className="text-[#6B645D] leading-relaxed">{description}</p>
    </div>
  );
}
