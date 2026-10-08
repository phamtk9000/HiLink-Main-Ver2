import { useLang } from '../lib/i18n';
import { ws } from '../data/site';
import { PhotoCard, Section, SectionHead } from '../components/Kit';
import { ServicePage, type ServiceCopy } from '../components/ServicePage';

const COPY: { en: ServiceCopy; vi: ServiceCopy } = {
  en: {
    meta: 'Property and asset management by HiLink in Hanoi — leasing, operations, maintenance and owner reporting under one point of accountability.',
    hero: {
      eyebrow: 'Property & Asset Management',
      title: 'Your property, run properly.',
      lead: 'HiLink supports the management and performance of properties and assets — from finding the right tenants to the day-to-day work of keeping a building running.',
    },
    intro: {
      eyebrow: 'What we do',
      title: 'One team behind the whole life of your asset.',
      body: [
        'We take on the operational work of owning property: leasing, tenant care, maintenance, suppliers and reporting — with one point of accountability.',
        'HiLink runs its own workspaces across Hoan Kiem and Dong Da, including whole floors at 4 Ton That Tung. The same team and standards look after the properties owners entrust to us.',
      ],
    },
    offer: {
      eyebrow: 'Services',
      title: 'Everything an owner would otherwise have to do',
      items: [
        { t: 'Leasing', d: 'Pricing advice, marketing, viewings, tenant screening and lease preparation.' },
        { t: 'Tenant care', d: 'A single contact for tenants, from move-in to renewal or move-out.' },
        { t: 'Maintenance', d: 'Planned upkeep and repairs, carried out by vetted suppliers and checked by HiLink.' },
        { t: 'Rent & finance', d: 'Rent collection, deposits, service charges and supplier payments.' },
        { t: 'Reporting', d: 'Regular statements on income, costs, occupancy and works — so you always know where things stand.' },
        { t: 'Repositioning', d: 'Fit-out and layout changes that let an underused space earn more, from plan to handover.' },
      ],
    },
    who: {
      eyebrow: 'Who we work with',
      title: 'Built for owners who want the asset to perform without running it themselves',
      items: ['Owners of townhouses and apartments', 'Owners of office floors and buildings', 'Investors living outside Vietnam', 'Developers looking for an operator'],
    },
    steps: {
      eyebrow: 'How it works',
      title: 'From first visit to steady returns',
      items: [
        { t: 'Assess', d: 'We visit the property, review its condition and documents, and agree what you want from it.' },
        { t: 'Plan', d: 'A clear scope, budget and fee structure — agreed in writing before any work starts.' },
        { t: 'Lease & run', d: 'We prepare the property, find tenants and take over day-to-day operations.' },
        { t: 'Report & improve', d: 'Regular reporting and reviews, with recommendations to keep performance improving.' },
      ],
    },
    faqs: [
      { question: 'What kinds of property do you manage?', answer: 'Residential properties such as townhouses and apartments, and commercial space such as office floors. Tell us about yours and we will say honestly whether we are the right fit.' },
      { question: 'How are fees structured?', answer: 'Fees depend on the property and the scope of work, and are agreed in writing before we start. There are no charges outside what we agree.' },
      { question: 'I live outside Vietnam. Can you still manage my property?', answer: 'Yes. Our team works in English and Vietnamese, and reporting is designed so you can follow your property remotely.' },
      { question: 'Can you take over a property that already has tenants?', answer: 'Yes. We review the existing leases and the condition of the property, then take over the tenant relationship and operations.' },
    ],
    form: {
      title: 'Tell us about your property',
      lead: 'Share the address and what you have in mind. We will come back to you to arrange a visit.',
      interests: ['Full property management', 'Leasing only', 'Repositioning or fit-out', 'Not sure yet'],
      messageLabel: 'About the property (type, size, current use)',
    },
  },
  vi: {
    meta: 'Dịch vụ quản lý bất động sản và tài sản của HiLink tại Hà Nội — cho thuê, vận hành, bảo trì và báo cáo cho chủ sở hữu với một đầu mối chịu trách nhiệm.',
    hero: {
      eyebrow: 'Quản lý bất động sản & tài sản',
      title: 'Tài sản của bạn, được vận hành chu đáo.',
      lead: 'HiLink hỗ trợ quản lý và nâng cao hiệu quả của bất động sản và tài sản — từ tìm đúng khách thuê đến những việc hằng ngày giữ cho toà nhà vận hành trơn tru.',
    },
    intro: {
      eyebrow: 'Chúng tôi làm gì',
      title: 'Một đội ngũ đồng hành suốt vòng đời tài sản.',
      body: [
        'Chúng tôi đảm nhận phần việc vận hành của chủ sở hữu: cho thuê, chăm sóc khách thuê, bảo trì, nhà cung cấp và báo cáo — với một đầu mối chịu trách nhiệm.',
        'HiLink tự vận hành các không gian làm việc tại Hoàn Kiếm và Đống Đa, gồm cả những sàn nguyên tầng tại 4 Tôn Thất Tùng. Cùng đội ngũ và tiêu chuẩn đó chăm sóc tài sản mà chủ sở hữu giao cho chúng tôi.',
      ],
    },
    offer: {
      eyebrow: 'Dịch vụ',
      title: 'Mọi việc mà chủ sở hữu lẽ ra phải tự làm',
      items: [
        { t: 'Cho thuê', d: 'Tư vấn giá, quảng bá, dẫn xem, sàng lọc khách thuê và chuẩn bị hợp đồng.' },
        { t: 'Chăm sóc khách thuê', d: 'Một đầu mối duy nhất cho khách thuê, từ khi dọn vào đến khi gia hạn hoặc trả nhà.' },
        { t: 'Bảo trì', d: 'Bảo dưỡng định kỳ và sửa chữa, do nhà cung cấp đã thẩm định thực hiện và HiLink kiểm tra.' },
        { t: 'Thu tiền & tài chính', d: 'Thu tiền thuê, tiền cọc, phí dịch vụ và thanh toán cho nhà cung cấp.' },
        { t: 'Báo cáo', d: 'Báo cáo định kỳ về doanh thu, chi phí, tỷ lệ lấp đầy và công việc — để bạn luôn nắm rõ tình hình.' },
        { t: 'Tái định vị', d: 'Cải tạo và thay đổi bố trí để không gian chưa khai thác hết mang lại nhiều hơn, từ phương án đến bàn giao.' },
      ],
    },
    who: {
      eyebrow: 'Chúng tôi làm việc với ai',
      title: 'Dành cho chủ sở hữu muốn tài sản sinh lời mà không phải tự vận hành',
      items: ['Chủ nhà phố và căn hộ', 'Chủ sở hữu sàn văn phòng và toà nhà', 'Nhà đầu tư sống ngoài Việt Nam', 'Chủ đầu tư cần đơn vị vận hành'],
    },
    steps: {
      eyebrow: 'Quy trình',
      title: 'Từ lần khảo sát đầu tiên đến nguồn thu ổn định',
      items: [
        { t: 'Khảo sát', d: 'Chúng tôi đến xem tài sản, rà soát hiện trạng và giấy tờ, và thống nhất mục tiêu của bạn.' },
        { t: 'Lập kế hoạch', d: 'Phạm vi, ngân sách và mức phí rõ ràng — thống nhất bằng văn bản trước khi bắt đầu.' },
        { t: 'Cho thuê & vận hành', d: 'Chúng tôi chuẩn bị tài sản, tìm khách thuê và tiếp quản vận hành hằng ngày.' },
        { t: 'Báo cáo & cải thiện', d: 'Báo cáo và rà soát định kỳ, kèm đề xuất để hiệu quả tiếp tục tăng.' },
      ],
    },
    faqs: [
      { question: 'HiLink quản lý những loại bất động sản nào?', answer: 'Bất động sản nhà ở như nhà phố, căn hộ và bất động sản thương mại như sàn văn phòng. Hãy kể về tài sản của bạn, chúng tôi sẽ nói thẳng liệu mình có phù hợp hay không.' },
      { question: 'Phí dịch vụ được tính thế nào?', answer: 'Phí tuỳ theo tài sản và phạm vi công việc, được thống nhất bằng văn bản trước khi bắt đầu. Không có khoản phí nào ngoài những gì đã thoả thuận.' },
      { question: 'Tôi sống ở nước ngoài. HiLink vẫn quản lý được chứ?', answer: 'Được. Đội ngũ làm việc bằng tiếng Anh và tiếng Việt, và báo cáo được thiết kế để bạn theo dõi tài sản từ xa.' },
      { question: 'HiLink có tiếp quản tài sản đang có khách thuê không?', answer: 'Có. Chúng tôi rà soát hợp đồng hiện có và hiện trạng tài sản, sau đó tiếp quản quan hệ với khách thuê và việc vận hành.' },
    ],
    form: {
      title: 'Hãy kể về tài sản của bạn',
      lead: 'Cho chúng tôi biết địa chỉ và mong muốn của bạn. Chúng tôi sẽ liên hệ để hẹn lịch khảo sát.',
      interests: ['Quản lý trọn gói', 'Chỉ cho thuê', 'Tái định vị hoặc cải tạo', 'Chưa chắc chắn'],
      messageLabel: 'Về tài sản (loại hình, diện tích, hiện trạng sử dụng)',
    },
  },
};

const PORTFOLIO = {
  en: { eyebrow: 'Managed by HiLink', title: 'A property in our care', tag: 'Boutique townhouse · Hoan Kiem', text: 'Four furnished units in the Old Quarter, a few minutes from Hoan Kiem Lake.', cta: 'View the property', f19: 'Floor 19 · 4 Ton That Tung', f19Text: 'A whole floor fitted out and run by HiLink, leased to a single tenant.', f19Cta: 'See on hilink.vn' },
  vi: { eyebrow: 'Do HiLink quản lý', title: 'Tài sản chúng tôi đang chăm sóc', tag: 'Nhà phố boutique · Hoàn Kiếm', text: 'Bốn căn đầy đủ nội thất trong khu Phố Cổ, cách Hồ Hoàn Kiếm vài phút đi bộ.', cta: 'Xem bất động sản', f19: 'Tầng 19 · 4 Tôn Thất Tùng', f19Text: 'Nguyên một sàn do HiLink hoàn thiện và vận hành, cho một khách thuê duy nhất.', f19Cta: 'Xem trên hilink.vn' },
};

function Portfolio() {
  const { lang, l } = useLang();
  const p = PORTFOLIO[lang];
  return (
    <Section tone="cream">
      <SectionHead eyebrow={p.eyebrow} title={p.title} />
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-14">
        <PhotoCard photo="/properties/quarter-house/qh-07.webp" eyebrow={p.tag} title="The Quarter House" text={p.text} to={l('/properties/quarter-house')} cta={p.cta} />
        <PhotoCard photo="/photos/f19-window.webp" eyebrow="HiLink Workspace" title={p.f19} text={p.f19Text} href={ws(lang, '/locations/ttt-f19')} cta={p.f19Cta} />
      </div>
    </Section>
  );
}

export function PropertyManagementPage() {
  return (
    <ServicePage
      copy={COPY}
      path="/property-management"
      formType="property"
      photo="/photos/f19-room.webp"
      introPhoto="/photos/f19-corridor.webp"
      introAlt={{ en: 'Floor 19 at 4 Ton That Tung, a floor run by HiLink', vi: 'Tầng 19, 4 Tôn Thất Tùng, một sàn do HiLink vận hành' }}
      extra={<Portfolio />}
    />
  );
}
