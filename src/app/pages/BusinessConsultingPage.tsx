import { ServicePage, type ServiceCopy } from '../components/ServicePage';

const COPY: { en: ServiceCopy; vi: ServiceCopy } = {
  en: {
    meta: 'Business services by HiLink in Hanoi — business presence, company setup support, administration and operational support around your business.',
    hero: {
      eyebrow: 'Business Services',
      title: 'The operational work around your business, handled.',
      lead: 'HiLink supports the operational needs around the way you work — from establishing a business presence in Hanoi to the administration that keeps a company running.',
    },
    intro: {
      eyebrow: 'What we do',
      title: 'Less administration. More time for the business.',
      body: [
        'Setting up and running a company involves work that sits outside your core business: an address, paperwork, suppliers, staff logistics. We take that work on, so your team can focus on clients.',
        'Our services connect with HiLink workspaces — a registered address at 60 Ly Thai To or 35 Nha Chung, meeting rooms when you need them, and a team on site.',
      ],
    },
    offer: {
      eyebrow: 'Services',
      title: 'Support where businesses most often need it',
      items: [
        { t: 'Business presence', d: 'A registered business address with mail and calls handled, through HiLink E-office.' },
        { t: 'Company setup support', d: 'Guidance through registration and licensing, working with trusted professional partners.' },
        { t: 'Accounting & tax', d: 'Bookkeeping, tax filings and payroll, delivered through partner firms we coordinate for you.' },
        { t: 'Administration', d: 'Contracts, supplier management, document handling and the day-to-day running of an office.' },
        { t: 'Team support', d: 'Practical help for staff relocating to Hanoi — from finding a home to settling in.' },
        { t: 'Workspace as you grow', d: 'Move from an address to a desk, a private office or a whole floor without changing partner.' },
      ],
    },
    who: {
      eyebrow: 'Who we work with',
      title: 'For companies that want to start and grow in Hanoi without building a back office first',
      items: ['Foreign companies entering Vietnam', 'Start-ups and small teams', 'Regional offices of international groups', 'Companies relocating or expanding in Hanoi'],
    },
    steps: {
      eyebrow: 'How it works',
      title: 'Your business first. The solution follows.',
      items: [
        { t: 'Understand', d: 'We learn how your business works and what you need now.' },
        { t: 'Design', d: 'We propose the right mix of address, space and services, with a clear scope.' },
        { t: 'Set up', d: 'We coordinate the people and paperwork needed to get you running.' },
        { t: 'Run', d: 'We stay on as your point of contact as your needs change.' },
      ],
    },
    faqs: [
      { question: 'Can I register my company at a HiLink address?', answer: 'Yes. HiLink E-office provides a registered business address at 60 Ly Thai To or 35 Nha Chung, with mail and calls handled. See plans on hilink.vn.' },
      { question: 'Do you provide legal or accounting advice yourselves?', answer: 'We coordinate qualified partner firms for legal, accounting and tax work, and act as your single point of contact.' },
      { question: 'Can these services be combined with a workspace?', answer: 'Yes. Many clients start with an address and later move into a desk or private office at a HiLink location.' },
    ],
    form: {
      title: 'Tell us what your business needs',
      lead: 'A few lines on your company and plans are enough. We will come back with a suggested approach.',
      interests: ['Business address / E-office', 'Company setup support', 'Accounting & tax', 'Administration support', 'Something else'],
    },
  },
  vi: {
    meta: 'Dịch vụ doanh nghiệp của HiLink tại Hà Nội — hiện diện doanh nghiệp, hỗ trợ thành lập công ty, hành chính và hỗ trợ vận hành.',
    hero: {
      eyebrow: 'Dịch vụ doanh nghiệp',
      title: 'Phần việc vận hành quanh doanh nghiệp, đã có người lo.',
      lead: 'HiLink hỗ trợ các nhu cầu vận hành xoay quanh cách bạn làm việc — từ xây dựng sự hiện diện của doanh nghiệp tại Hà Nội đến công việc hành chính giúp công ty vận hành.',
    },
    intro: {
      eyebrow: 'Chúng tôi làm gì',
      title: 'Bớt việc hành chính. Thêm thời gian cho kinh doanh.',
      body: [
        'Thành lập và vận hành công ty kéo theo nhiều việc nằm ngoài hoạt động chính: địa chỉ, giấy tờ, nhà cung cấp, hậu cần cho nhân sự. Chúng tôi đảm nhận những việc đó để đội ngũ của bạn tập trung vào khách hàng.',
        'Dịch vụ gắn liền với không gian làm việc HiLink — địa chỉ đăng ký tại 60 Lý Thái Tổ hoặc 35 Nhà Chung, phòng họp khi cần, và đội ngũ có mặt tại chỗ.',
      ],
    },
    offer: {
      eyebrow: 'Dịch vụ',
      title: 'Hỗ trợ ở những chỗ doanh nghiệp cần nhất',
      items: [
        { t: 'Hiện diện doanh nghiệp', d: 'Địa chỉ đăng ký kinh doanh có người nhận thư và nghe máy, qua dịch vụ HiLink E-office.' },
        { t: 'Hỗ trợ thành lập công ty', d: 'Hướng dẫn thủ tục đăng ký và giấy phép, phối hợp cùng các đối tác chuyên môn tin cậy.' },
        { t: 'Kế toán & thuế', d: 'Ghi sổ, khai thuế và tính lương, do các công ty đối tác thực hiện và HiLink điều phối.' },
        { t: 'Hành chính', d: 'Hợp đồng, quản lý nhà cung cấp, xử lý giấy tờ và vận hành văn phòng hằng ngày.' },
        { t: 'Hỗ trợ nhân sự', d: 'Giúp nhân sự chuyển đến Hà Nội ổn định — từ tìm nhà đến làm quen cuộc sống mới.' },
        { t: 'Không gian theo đà phát triển', d: 'Từ địa chỉ lên chỗ ngồi, văn phòng riêng hay nguyên sàn mà không phải đổi đối tác.' },
      ],
    },
    who: {
      eyebrow: 'Chúng tôi làm việc với ai',
      title: 'Cho những công ty muốn khởi đầu và phát triển tại Hà Nội mà chưa cần dựng bộ máy hành chính',
      items: ['Doanh nghiệp nước ngoài vào Việt Nam', 'Start-up và nhóm nhỏ', 'Văn phòng khu vực của tập đoàn quốc tế', 'Doanh nghiệp chuyển đến hoặc mở rộng tại Hà Nội'],
    },
    steps: {
      eyebrow: 'Quy trình',
      title: 'Doanh nghiệp của bạn trước. Giải pháp theo sau.',
      items: [
        { t: 'Thấu hiểu', d: 'Chúng tôi tìm hiểu cách doanh nghiệp vận hành và nhu cầu hiện tại.' },
        { t: 'Thiết kế', d: 'Đề xuất kết hợp địa chỉ, không gian và dịch vụ phù hợp, với phạm vi rõ ràng.' },
        { t: 'Triển khai', d: 'Điều phối con người và giấy tờ cần thiết để bạn bắt đầu hoạt động.' },
        { t: 'Vận hành', d: 'Tiếp tục là đầu mối của bạn khi nhu cầu thay đổi.' },
      ],
    },
    faqs: [
      { question: 'Tôi có thể đăng ký công ty tại địa chỉ HiLink không?', answer: 'Được. HiLink E-office cung cấp địa chỉ đăng ký kinh doanh tại 60 Lý Thái Tổ hoặc 35 Nhà Chung, có người nhận thư và nghe máy. Xem các gói trên hilink.vn.' },
      { question: 'HiLink có tự tư vấn pháp lý hay kế toán không?', answer: 'Chúng tôi điều phối các công ty đối tác đủ năng lực cho phần pháp lý, kế toán và thuế, và là đầu mối duy nhất của bạn.' },
      { question: 'Có thể kết hợp các dịch vụ này với không gian làm việc không?', answer: 'Có. Nhiều khách hàng bắt đầu với địa chỉ đăng ký, sau đó chuyển sang chỗ ngồi hoặc văn phòng riêng tại một địa điểm HiLink.' },
    ],
    form: {
      title: 'Cho chúng tôi biết doanh nghiệp bạn cần gì',
      lead: 'Vài dòng về công ty và kế hoạch là đủ. Chúng tôi sẽ phản hồi với hướng đề xuất.',
      interests: ['Địa chỉ doanh nghiệp / E-office', 'Hỗ trợ thành lập công ty', 'Kế toán & thuế', 'Hỗ trợ hành chính', 'Nhu cầu khác'],
    },
  },
};

export function BusinessConsultingPage() {
  return (
    <ServicePage
      copy={COPY}
      path="/business-services"
      formType="business"
      photo="/photos/hbc-boardroom.webp"
      introPhoto="/photos/hbc-team.webp"
      introAlt={{ en: 'A HiLink team working with clients', vi: 'Đội ngũ HiLink làm việc cùng khách hàng' }}
    />
  );
}
