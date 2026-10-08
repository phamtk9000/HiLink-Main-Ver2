import { ServicePage, type ServiceCopy } from '../components/ServicePage';

// No HiLink photograph of an industrial site exists yet, so this page uses
// type-only panels instead of stand-in pictures. Add photos when HiLink
// supplies them.
const COPY: { en: ServiceCopy; vi: ServiceCopy } = {
  en: {
    meta: 'Industrial and logistics property support by HiLink — site search, leasing, fit-out coordination and facilities management for warehouses and factories.',
    hero: {
      eyebrow: 'Industrial & Logistics',
      title: 'Warehouse and factory space, without the legwork.',
      lead: 'From finding the right site to running it day to day, HiLink takes on the operational work of industrial property for occupiers and owners.',
    },
    intro: {
      eyebrow: 'What we do',
      title: 'One partner from site search to operations.',
      body: [
        'Industrial space comes with its own questions: access, power, permits, fit-out and the people who keep it running. We coordinate them under one relationship.',
        'For owners, the same approach as our property management applies: leasing, tenant care, maintenance and reporting.',
      ],
    },
    offer: {
      eyebrow: 'Services',
      title: 'Support across the life of an industrial site',
      items: [
        { t: 'Site search', d: 'A shortlist of warehouses, factories or land that match your requirements.' },
        { t: 'Due diligence', d: 'Checks on documents, condition, access and utilities before you commit.' },
        { t: 'Leasing', d: 'Negotiation and lease preparation, on behalf of occupiers or owners.' },
        { t: 'Fit-out coordination', d: 'Planning and coordinating contractors until the space is ready to use.' },
        { t: 'Facilities management', d: 'Maintenance, security, cleaning and supplier management on site.' },
        { t: 'Owner reporting', d: 'Regular reporting on occupancy, income and works for asset owners.' },
      ],
    },
    who: {
      eyebrow: 'Who we work with',
      title: 'For businesses that need space to make, store and move goods',
      items: ['Manufacturers setting up or expanding', 'Logistics and distribution companies', 'Retail and e-commerce businesses', 'Owners of warehouses and industrial land'],
    },
    steps: {
      eyebrow: 'How it works',
      title: 'A clear path from brief to running site',
      items: [
        { t: 'Brief', d: 'Location, size, power, access and timing — we agree what the site must deliver.' },
        { t: 'Search & check', d: 'We shortlist options and check them before you visit.' },
        { t: 'Secure & fit out', d: 'We support the lease and coordinate the works.' },
        { t: 'Operate', d: 'We can stay on to manage the facility day to day.' },
      ],
    },
    faqs: [
      { question: 'Where do you search for sites?', answer: 'Tell us the area you need. We will say plainly whether we can help there, and with which partners.' },
      { question: 'Do you work for occupiers or owners?', answer: 'Both — occupiers looking for space, and owners who want their industrial property leased and run.' },
    ],
    form: {
      title: 'Tell us about your requirements',
      lead: 'Location, size and timing are a good start. We will come back to discuss options.',
      interests: ['Find a warehouse or factory', 'Lease out my industrial property', 'Facilities management', 'Something else'],
      messageLabel: 'Location, size and timing',
    },
  },
  vi: {
    meta: 'Hỗ trợ bất động sản công nghiệp và logistics của HiLink — tìm địa điểm, cho thuê, điều phối thi công và quản lý vận hành kho bãi, nhà xưởng.',
    hero: {
      eyebrow: 'Công nghiệp & logistics',
      title: 'Kho bãi và nhà xưởng, không phải tự chạy việc.',
      lead: 'Từ tìm đúng địa điểm đến vận hành hằng ngày, HiLink đảm nhận phần việc vận hành bất động sản công nghiệp cho bên thuê và chủ sở hữu.',
    },
    intro: {
      eyebrow: 'Chúng tôi làm gì',
      title: 'Một đối tác từ tìm địa điểm đến vận hành.',
      body: [
        'Không gian công nghiệp có những câu hỏi riêng: giao thông, điện, giấy phép, thi công và đội ngũ vận hành. Chúng tôi điều phối tất cả trong một mối quan hệ.',
        'Với chủ sở hữu, cách làm giống dịch vụ quản lý bất động sản của chúng tôi: cho thuê, chăm sóc khách thuê, bảo trì và báo cáo.',
      ],
    },
    offer: {
      eyebrow: 'Dịch vụ',
      title: 'Hỗ trợ suốt vòng đời một cơ sở công nghiệp',
      items: [
        { t: 'Tìm địa điểm', d: 'Danh sách kho, xưởng hoặc đất phù hợp với yêu cầu của bạn.' },
        { t: 'Thẩm định', d: 'Kiểm tra giấy tờ, hiện trạng, giao thông và hạ tầng trước khi bạn quyết định.' },
        { t: 'Cho thuê', d: 'Đàm phán và chuẩn bị hợp đồng, cho bên thuê hoặc chủ sở hữu.' },
        { t: 'Điều phối thi công', d: 'Lập kế hoạch và điều phối nhà thầu đến khi không gian sẵn sàng sử dụng.' },
        { t: 'Quản lý vận hành', d: 'Bảo trì, an ninh, vệ sinh và quản lý nhà cung cấp tại chỗ.' },
        { t: 'Báo cáo cho chủ sở hữu', d: 'Báo cáo định kỳ về tỷ lệ lấp đầy, doanh thu và công việc.' },
      ],
    },
    who: {
      eyebrow: 'Chúng tôi làm việc với ai',
      title: 'Cho doanh nghiệp cần không gian để sản xuất, lưu trữ và vận chuyển hàng hoá',
      items: ['Nhà sản xuất mới thành lập hoặc mở rộng', 'Công ty logistics và phân phối', 'Doanh nghiệp bán lẻ và thương mại điện tử', 'Chủ sở hữu kho bãi và đất công nghiệp'],
    },
    steps: {
      eyebrow: 'Quy trình',
      title: 'Lộ trình rõ ràng từ yêu cầu đến cơ sở đi vào hoạt động',
      items: [
        { t: 'Yêu cầu', d: 'Vị trí, diện tích, điện, giao thông và thời gian — thống nhất điều cơ sở cần đáp ứng.' },
        { t: 'Tìm & kiểm tra', d: 'Chúng tôi chọn lọc phương án và kiểm tra trước khi bạn đến xem.' },
        { t: 'Ký kết & thi công', d: 'Hỗ trợ hợp đồng thuê và điều phối thi công.' },
        { t: 'Vận hành', d: 'Chúng tôi có thể tiếp tục quản lý cơ sở hằng ngày.' },
      ],
    },
    faqs: [
      { question: 'HiLink tìm địa điểm ở những khu vực nào?', answer: 'Hãy cho chúng tôi biết khu vực bạn cần. Chúng tôi sẽ nói rõ liệu có hỗ trợ được ở đó không, và cùng những đối tác nào.' },
      { question: 'HiLink làm cho bên thuê hay chủ sở hữu?', answer: 'Cả hai — bên thuê đang tìm không gian, và chủ sở hữu muốn bất động sản công nghiệp được cho thuê và vận hành.' },
    ],
    form: {
      title: 'Cho chúng tôi biết yêu cầu của bạn',
      lead: 'Vị trí, diện tích và thời gian là khởi đầu tốt. Chúng tôi sẽ liên hệ để trao đổi phương án.',
      interests: ['Tìm kho hoặc nhà xưởng', 'Cho thuê bất động sản công nghiệp', 'Quản lý vận hành', 'Nhu cầu khác'],
      messageLabel: 'Vị trí, diện tích và thời gian',
    },
  },
};

export function IndustrialPage() {
  return <ServicePage copy={COPY} path="/industrial-logistics" formType="industrial" />;
}
