import { ServicePage, type ServiceCopy } from '../components/ServicePage';

const COPY: { en: ServiceCopy; vi: ServiceCopy } = {
  en: {
    meta: 'Concierge services by HiLink in Hanoi — reception, guest care, meeting and event support, bookings and everyday help for members and tenants.',
    hero: {
      eyebrow: 'Concierge Services',
      title: 'Someone to take care of the details.',
      lead: 'Day-to-day support for members, tenants and their guests — so the people you work with feel looked after from the moment they arrive.',
    },
    intro: {
      eyebrow: 'What we do',
      title: 'The small things, done well, every day.',
      body: [
        'Every HiLink location has a staffed reception. Our concierge team welcomes your guests, handles your mail and deliveries, prepares your meetings and takes care of the requests that would otherwise interrupt your day.',
        'For clients new to Hanoi, the same team helps with the practical side of settling in.',
      ],
    },
    offer: {
      eyebrow: 'Services',
      title: 'What our concierge team looks after',
      items: [
        { t: 'Reception & guests', d: 'A staffed front desk that welcomes visitors and lets you know when they arrive.' },
        { t: 'Mail & deliveries', d: 'Letters, parcels and couriers received, recorded and passed on to you.' },
        { t: 'Meetings & events', d: 'Room set-up, refreshments and equipment ready before you walk in.' },
        { t: 'Bookings', d: 'Restaurants, travel and accommodation arranged for you and your guests.' },
        { t: 'Settling in', d: 'Help with housing, local services and paperwork for people new to Hanoi.' },
        { t: 'Everyday requests', d: 'Printing, errands and the many small tasks that keep a team moving.' },
      ],
    },
    steps: {
      eyebrow: 'How it works',
      title: 'Ask once. We take it from there.',
      items: [
        { t: 'Ask', d: 'Speak to reception in person, by phone or by email.' },
        { t: 'Confirm', d: 'We confirm what will happen and, where there is a cost, what it is.' },
        { t: 'Arrange', d: 'Our team makes it happen and keeps you posted.' },
        { t: 'Follow up', d: 'We check that everything went as it should.' },
      ],
    },
    faqs: [
      { question: 'Who can use the concierge service?', answer: 'Members and tenants at HiLink locations, and clients of HiLink property and business services.' },
      { question: 'Is concierge included in my membership?', answer: 'Reception, guest welcome and mail handling come with HiLink workspaces. Bookings and requests with a third-party cost are confirmed with you first.' },
      { question: 'What are the reception hours?', answer: 'Opening hours vary by location — check each location on hilink.vn.' },
    ],
    form: {
      title: 'How can we help?',
      lead: 'Tell us what you need and when. Our team will confirm the details with you.',
      interests: ['Guest or event support', 'Bookings (dining, travel, accommodation)', 'Settling in Hanoi', 'Something else'],
      messageLabel: 'Your request',
    },
  },
  vi: {
    meta: 'Dịch vụ concierge của HiLink tại Hà Nội — lễ tân, đón khách, hỗ trợ họp và sự kiện, đặt chỗ và hỗ trợ hằng ngày cho thành viên và khách thuê.',
    hero: {
      eyebrow: 'Dịch vụ concierge',
      title: 'Luôn có người lo những điều nhỏ.',
      lead: 'Hỗ trợ hằng ngày cho thành viên, khách thuê và khách của họ — để những người làm việc cùng bạn cảm thấy được chăm sóc ngay từ khi bước vào.',
    },
    intro: {
      eyebrow: 'Chúng tôi làm gì',
      title: 'Những việc nhỏ, làm tốt, mỗi ngày.',
      body: [
        'Mỗi địa điểm HiLink đều có lễ tân trực. Đội concierge đón khách của bạn, nhận thư và hàng, chuẩn bị phòng họp và lo những yêu cầu lẽ ra làm gián đoạn ngày làm việc của bạn.',
        'Với khách hàng mới đến Hà Nội, cùng đội ngũ đó hỗ trợ những việc thiết thực để ổn định cuộc sống.',
      ],
    },
    offer: {
      eyebrow: 'Dịch vụ',
      title: 'Những việc đội concierge đảm nhận',
      items: [
        { t: 'Lễ tân & đón khách', d: 'Quầy lễ tân có người trực, đón khách và báo cho bạn khi khách đến.' },
        { t: 'Thư & hàng hoá', d: 'Thư, bưu phẩm và chuyển phát được nhận, ghi sổ và chuyển đến bạn.' },
        { t: 'Họp & sự kiện', d: 'Phòng, đồ uống và thiết bị sẵn sàng trước khi bạn đến.' },
        { t: 'Đặt chỗ', d: 'Nhà hàng, đi lại và lưu trú được sắp xếp cho bạn và khách.' },
        { t: 'Ổn định cuộc sống', d: 'Hỗ trợ nhà ở, dịch vụ địa phương và giấy tờ cho người mới đến Hà Nội.' },
        { t: 'Yêu cầu hằng ngày', d: 'In ấn, việc vặt và vô số việc nhỏ giúp đội ngũ làm việc trôi chảy.' },
      ],
    },
    steps: {
      eyebrow: 'Quy trình',
      title: 'Chỉ cần nói một lần. Phần còn lại để chúng tôi.',
      items: [
        { t: 'Yêu cầu', d: 'Gặp lễ tân trực tiếp, gọi điện hoặc gửi email.' },
        { t: 'Xác nhận', d: 'Chúng tôi xác nhận việc sẽ làm và chi phí, nếu có.' },
        { t: 'Sắp xếp', d: 'Đội ngũ thực hiện và cập nhật cho bạn.' },
        { t: 'Theo dõi', d: 'Chúng tôi kiểm tra để mọi việc diễn ra đúng như mong muốn.' },
      ],
    },
    faqs: [
      { question: 'Ai có thể dùng dịch vụ concierge?', answer: 'Thành viên và khách thuê tại các địa điểm HiLink, cùng khách hàng của dịch vụ quản lý bất động sản và dịch vụ doanh nghiệp của HiLink.' },
      { question: 'Concierge có nằm trong gói thành viên không?', answer: 'Lễ tân, đón khách và nhận thư đi kèm không gian làm việc HiLink. Các yêu cầu đặt chỗ có chi phí bên thứ ba sẽ được xác nhận với bạn trước.' },
      { question: 'Lễ tân làm việc giờ nào?', answer: 'Giờ mở cửa khác nhau theo địa điểm — xem từng địa điểm trên hilink.vn.' },
    ],
    form: {
      title: 'Chúng tôi có thể giúp gì?',
      lead: 'Cho chúng tôi biết bạn cần gì và khi nào. Đội ngũ sẽ xác nhận chi tiết với bạn.',
      interests: ['Hỗ trợ đón khách hoặc sự kiện', 'Đặt chỗ (ăn uống, đi lại, lưu trú)', 'Ổn định cuộc sống tại Hà Nội', 'Nhu cầu khác'],
      messageLabel: 'Yêu cầu của bạn',
    },
  },
};

export function ConciergePage() {
  return (
    <ServicePage
      copy={COPY}
      path="/concierge-services"
      formType="concierge"
      photo="/photos/hbc-bar.webp"
      introPhoto="/photos/hbc-reception.webp"
      introAlt={{ en: 'Reception at the HiLink Business Club', vi: 'Quầy lễ tân tại HiLink Business Club' }}
    />
  );
}
