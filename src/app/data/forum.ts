// The HiLink forum: the four articles carried over from the old hilink.vn news
// page (text and photographs as published), and six more written for this
// site from HiLink's own facts (addresses, hours, starting prices, services)
// — awaiting HiLink's review. Newest first. An article's body is a list of
// blocks: a section heading (h2), a paragraph (p, sometimes with a bold
// lead-in) or a photograph (img).
export type Words = { en: string; vi: string };
export type Block = { type: 'p'; en: string; vi: string; lead?: Words } | { type: 'h2'; en: string; vi: string } | { type: 'img'; src: string; alt: Words };
export type ForumPost = { slug: string; category: ForumCategory; date: string; minutes: number; title: Words; excerpt: Words; image: string; blocks: Block[] };
export type ForumCategory = 'Guide' | 'Design' | 'Neighbourhood' | 'Services';

/** The sections of the forum, in the order they are shown. */
export const FORUM_CATEGORIES: { id: ForumCategory; en: string; vi: string; lead: Words }[] = [
  { id: 'Guide', en: 'Guides', vi: 'Cẩm nang', lead: { en: 'Choosing and using a workspace.', vi: 'Chọn và dùng không gian làm việc.' } },
  { id: 'Design', en: 'Design', vi: 'Thiết kế', lead: { en: 'How HiLink spaces are made.', vi: 'Không gian HiLink được tạo nên thế nào.' } },
  { id: 'Neighbourhood', en: 'Neighbourhood', vi: 'Khu vực', lead: { en: 'The streets around our addresses.', vi: 'Những con phố quanh các địa chỉ HiLink.' } },
  { id: 'Services', en: 'At HiLink', vi: 'Dịch vụ HiLink', lead: { en: 'The club, and looking after property.', vi: 'Câu lạc bộ và chăm sóc tài sản.' } },
];

export const FORUM_POSTS: ForumPost[] = [
 {
  "slug": "e-office-dia-chi-doanh-nghiep-khong-can-thue-van-phong",
  "category": "Guide",
  "date": "2026-10-14",
  "title": {
   "vi": "E-office: địa chỉ doanh nghiệp mà không cần thuê văn phòng",
   "en": "E-office: a business address without leasing an office"
  },
  "excerpt": {
   "vi": "Khi doanh nghiệp cần một địa chỉ đăng ký và người nhận thư, nhưng chưa cần chỗ ngồi hằng ngày.",
   "en": "For when a company needs a registered address and someone to receive its post, but not yet a desk every day."
  },
  "image": "/photos/hbc-reception.webp",
  "blocks": [
   {
    "type": "p",
    "vi": "Không phải doanh nghiệp nào cũng cần một văn phòng ngay từ ngày đầu. Có đội ngũ làm việc từ xa, có công ty mới đặt chân vào Việt Nam, có nhà sáng lập đang thử nghiệm sản phẩm. Điều họ cần trước tiên thường là một địa chỉ đáng tin để đăng ký công ty, nhận thư và tiếp khách khi cần. Đó là lúc E-office phát huy tác dụng.",
    "en": "Not every company needs an office from day one. Some teams work remotely, some are just arriving in Vietnam, some founders are still testing a product. What they need first is usually a credible address to register the company, receive post and meet a client when it matters. That is where an E-office comes in."
   },
   {
    "type": "h2",
    "vi": "E-office tại HiLink gồm những gì",
    "en": "What an E-office at HiLink includes"
   },
   {
    "type": "p",
    "vi": "Bạn có thể đăng ký công ty tại địa chỉ của HiLink, ở 60 Lý Thái Tổ hoặc 35 Nhà Chung. Thư và bưu phẩm được nhận giúp bạn, cuộc gọi được nghe máy hộ, và giá khởi điểm từ ₫1 triệu mỗi tháng.",
    "en": "You can register your company at a HiLink address, at 60 Ly Thai To or 35 Nha Chung. Letters and parcels are received for you, calls are answered on your behalf, and plans start from ₫1m a month."
   },
   {
    "type": "img",
    "src": "/photos/hbc-counter.webp",
    "alt": {
     "vi": "Quầy tiếp đón tại HiLink Business Club, 60 Lý Thái Tổ",
     "en": "The reception counter at the HiLink Business Club, 60 Ly Thai To"
    }
   },
   {
    "type": "h2",
    "vi": "Khi nào nên chọn E-office",
    "en": "When an E-office makes sense"
   },
   {
    "type": "p",
    "vi": "Khi đội ngũ của bạn làm việc phân tán hoặc chủ yếu ở bên ngoài.",
    "en": "When your team is spread out or mostly on the road.",
    "lead": {
     "vi": "Làm việc linh hoạt.",
     "en": "Flexible working."
    }
   },
   {
    "type": "p",
    "vi": "Khi bạn cần hiện diện tại Hà Nội trước khi quyết định quy mô văn phòng.",
    "en": "When you need a presence in Hanoi before deciding how much office you need.",
    "lead": {
     "vi": "Mới vào thị trường.",
     "en": "New to the market."
    }
   },
   {
    "type": "p",
    "vi": "Khi bạn muốn tiếp khách ở một địa chỉ trung tâm mà không gánh chi phí thuê cả năm.",
    "en": "When you want to meet clients at a central address without the cost of a year-long lease.",
    "lead": {
     "vi": "Tiết kiệm chi phí.",
     "en": "Keeping costs down."
    }
   },
   {
    "type": "h2",
    "vi": "Đi tiếp từ E-office",
    "en": "Growing from an E-office"
   },
   {
    "type": "p",
    "vi": "Khi đội ngũ lớn lên, bạn có thể chuyển sang chỗ ngồi linh hoạt, văn phòng riêng hoặc nguyên một sàn tại các địa chỉ HiLink — mà vẫn giữ một đầu mối. Đội ngũ của chúng tôi sẵn sàng tư vấn bước tiếp theo phù hợp.",
    "en": "As the team grows you can move on to flexible desks, a private office or a whole floor at HiLink's addresses — keeping one point of contact throughout. Our team is glad to advise on the right next step."
   }
  ],
  "minutes": 2
 },
 {
  "slug": "dat-phong-hop-tai-hilink-chon-phong-theo-cuoc-hop",
  "category": "Guide",
  "date": "2026-10-07",
  "title": {
   "vi": "Đặt phòng họp tại HiLink: chọn phòng theo cuộc họp",
   "en": "Booking a meeting room at HiLink: the right room for the meeting"
  },
  "excerpt": {
   "vi": "Từ buổi gặp bốn người đến cuộc họp mười hai người — và cả lounge khi bạn tổ chức sự kiện.",
   "en": "From a meeting of four to a table of twelve — and whole lounges when you host an event."
  },
  "image": "/photos/f15-boardroom.webp",
  "blocks": [
   {
    "type": "p",
    "vi": "Một cuộc họp tốt bắt đầu từ căn phòng phù hợp: đủ chỗ, đủ yên tĩnh và sẵn sàng khi khách đến. Tại HiLink, phòng họp được đặt theo giờ, cho từ 4 đến 12 người, tại 4 Tôn Thất Tùng và 60 Lý Thái Tổ.",
    "en": "A good meeting starts with the right room: enough seats, enough quiet, ready when your guests arrive. At HiLink, meeting rooms are booked by the hour, for 4 to 12 people, at 4 Ton That Tung and 60 Ly Thai To."
   },
   {
    "type": "h2",
    "vi": "Chọn theo số người",
    "en": "Choose by headcount"
   },
   {
    "type": "p",
    "vi": "Phòng nhỏ cho buổi trao đổi nhanh hoặc phỏng vấn; phòng lớn với bàn dài cho buổi trình bày hay họp hội đồng. Hãy tính thêm một hai chỗ cho người tham gia phút chót.",
    "en": "A small room for a quick catch-up or an interview; a larger one with a long table for a presentation or a board meeting. Allow a seat or two for late additions."
   },
   {
    "type": "img",
    "src": "/photos/f15-meeting-pod.webp",
    "alt": {
     "vi": "Phòng họp kính tròn tại tầng 15, 4 Tôn Thất Tùng",
     "en": "A round glass meeting room on Floor 15, 4 Ton That Tung"
    }
   },
   {
    "type": "h2",
    "vi": "Chọn theo địa chỉ",
    "en": "Choose by address"
   },
   {
    "type": "p",
    "vi": "4 Tôn Thất Tùng ở Đống Đa, trên cao với tầm nhìn ra thành phố. 60 Lý Thái Tổ ở Hoàn Kiếm, cạnh hồ, trong không gian của HiLink Business Club — hợp với những buổi tiếp khách cần sự trang trọng.",
    "en": "4 Ton That Tung is in Dong Da, high above the city. 60 Ly Thai To is in Hoan Kiem, by the lake, inside the HiLink Business Club — well suited to meetings where hospitality matters."
   },
   {
    "type": "h2",
    "vi": "Khi cuộc họp thành sự kiện",
    "en": "When a meeting becomes an event"
   },
   {
    "type": "p",
    "vi": "Với hội thảo, buổi ra mắt hay gặp mặt cộng đồng, bạn có thể đặt cả lounge làm không gian sự kiện. Giá phòng họp khởi điểm từ ₫475 nghìn mỗi giờ; giá hiện hành và lịch trống xem trên hilink.vn.",
    "en": "For a workshop, a launch or a community gathering, whole lounges can be booked as event space. Meeting rooms start from ₫475k an hour; current prices and availability are on hilink.vn."
   }
  ],
  "minutes": 2
 },
 {
  "slug": "35-nha-chung-lam-viec-canh-nha-tho-lon",
  "category": "Neighbourhood",
  "date": "2026-09-30",
  "title": {
   "vi": "35 Nhà Chung: làm việc cạnh Nhà thờ Lớn",
   "en": "35 Nha Chung: working beside St. Joseph's Cathedral"
  },
  "excerpt": {
   "vi": "Một không gian làm việc boutique giữa phố cổ, vài phút đi bộ ra hồ Hoàn Kiếm.",
   "en": "A boutique workspace in the old city, a few minutes' walk from Hoan Kiem Lake."
  },
  "image": "/photos/nc35-hall.webp",
  "blocks": [
   {
    "type": "p",
    "vi": "Nằm trên phố Nhà Chung, ngay cạnh Nhà thờ Lớn Hà Nội, 35 Nhà Chung là địa chỉ boutique của HiLink dành cho những đội ngũ nhỏ thích làm việc giữa nhịp sống của phố cổ.",
    "en": "On Nha Chung street, right beside St. Joseph's Cathedral, 35 Nha Chung is HiLink's boutique address for small teams who like to work in the rhythm of the old city."
   },
   {
    "type": "h2",
    "vi": "Không gian",
    "en": "The space"
   },
   {
    "type": "p",
    "vi": "Flex desk cho những ngày cần một chỗ ngồi, dedicated desk khi bạn muốn chỗ cố định của riêng mình — đặt theo ngày hoặc theo tháng. Ngoài ra có không gian sự kiện và gói E-office.",
    "en": "Flex desks for the days you need a seat, dedicated desks when you want one of your own — by the day or by the month. There is also an event space and E-office plans."
   },
   {
    "type": "img",
    "src": "/photos/nc35-desks.webp",
    "alt": {
     "vi": "Khu chỗ ngồi tại 35 Nhà Chung",
     "en": "The desks at 35 Nha Chung"
    }
   },
   {
    "type": "h2",
    "vi": "Khu phố",
    "en": "The neighbourhood"
   },
   {
    "type": "p",
    "vi": "Từ cửa bước ra là quảng trường Nhà thờ, những con phố nhỏ đầy quán cà phê và cửa hàng, và hồ Hoàn Kiếm chỉ cách vài phút đi bộ — tiện cho một buổi gặp khách hay một vòng đi bộ giữa giờ.",
    "en": "Step outside and you are on the cathedral square, among small streets of cafés and shops, with Hoan Kiem Lake a few minutes' walk away — handy for meeting a client or a walk between tasks."
   },
   {
    "type": "h2",
    "vi": "Giờ mở cửa",
    "en": "Opening hours"
   },
   {
    "type": "p",
    "vi": "Thứ Hai đến Thứ Sáu, 08:00–19:00. Đặt chỗ và xem chỗ trống trên hilink.vn, hoặc đặt lịch tham quan để xem tận nơi.",
    "en": "Monday to Friday, 08:00–19:00. Book and see availability on hilink.vn, or book a tour to see it for yourself."
   }
  ],
  "minutes": 2
 },
 {
  "slug": "tang-15-ton-that-tung-mot-san-nhin-ra-dong-da",
  "category": "Design",
  "date": "2026-09-23",
  "title": {
   "vi": "Tầng 15, 4 Tôn Thất Tùng: một sàn làm việc nhìn ra Đống Đa",
   "en": "Floor 15, 4 Ton That Tung: a working floor above Dong Da"
  },
  "excerpt": {
   "vi": "Lounge, văn phòng riêng, phòng họp và không gian sự kiện trên cùng một sàn — HiLink Premium Workspace.",
   "en": "Lounge, private offices, meeting rooms and an event space on one floor — HiLink Premium Workspace."
  },
  "image": "/photos/f15-lounge-wide-xl.webp",
  "blocks": [
   {
    "type": "p",
    "vi": "Tầng 15 tại 4 Tôn Thất Tùng là HiLink Premium Workspace: một sàn trên cao với tầm nhìn toàn cảnh Đống Đa, nơi văn phòng riêng, lounge, phòng họp và không gian sự kiện cùng nằm trên một mặt bằng.",
    "en": "Floor 15 at 4 Ton That Tung is the HiLink Premium Workspace: a high floor with views across Dong Da, where private offices, a lounge, meeting rooms and an event space share one plan."
   },
   {
    "type": "h2",
    "vi": "Bắt đầu từ lounge",
    "en": "It starts at the lounge"
   },
   {
    "type": "p",
    "vi": "Khách đến được đón ở quầy lễ tân và lounge mở, nơi các đội ngũ gặp nhau giữa giờ và những buổi trao đổi ngắn diễn ra tự nhiên.",
    "en": "Guests are welcomed at the reception and the open lounge, where teams meet between tasks and short conversations happen naturally."
   },
   {
    "type": "img",
    "src": "/photos/f15-lounge.webp",
    "alt": {
     "vi": "Lounge tại tầng 15, 4 Tôn Thất Tùng",
     "en": "The lounge on Floor 15, 4 Ton That Tung"
    }
   },
   {
    "type": "h2",
    "vi": "Văn phòng có thể lớn lên",
    "en": "Offices that can grow"
   },
   {
    "type": "p",
    "vi": "Văn phòng riêng có khoá, đủ nội thất, cho đội từ 2 đến 12 người. Khi đội ngũ lớn lên, bạn chuyển sang phòng lớn hơn ngay trên cùng sàn.",
    "en": "Lockable, fully fitted private offices for teams of 2 to 12. When the team grows, you move to a larger room on the same floor."
   },
   {
    "type": "img",
    "src": "/photos/f15-office-hi08.webp",
    "alt": {
     "vi": "Một văn phòng riêng tại tầng 15",
     "en": "A private office on Floor 15"
    }
   },
   {
    "type": "h2",
    "vi": "Họp và tổ chức sự kiện",
    "en": "Meetings and events"
   },
   {
    "type": "p",
    "vi": "Phòng họp cho 4–12 người và không gian sự kiện nằm ngay trên sàn. Giờ mở cửa: Thứ Hai đến Thứ Sáu, 08:00–20:00.",
    "en": "Meeting rooms for 4–12 people and an event space are right on the floor. Open Monday to Friday, 08:00–20:00."
   }
  ],
  "minutes": 2
 },
 {
  "slug": "hilink-business-club-noi-tiep-khach-canh-ho-hoan-kiem",
  "category": "Services",
  "date": "2026-09-16",
  "title": {
   "vi": "HiLink Business Club: nơi tiếp khách cạnh hồ Hoàn Kiếm",
   "en": "HiLink Business Club: hosting guests by Hoan Kiem Lake"
  },
  "excerpt": {
   "vi": "Lounge cho doanh nhân, doanh nghiệp và cộng đồng — tiếp khách, giao lưu, làm việc — tại tầng 7, 60 Lý Thái Tổ.",
   "en": "A lounge for businesspeople, companies and the community — to host, to meet, to work — on Floor 7, 60 Ly Thai To."
  },
  "image": "/photos/hbc-lounge-3.webp",
  "blocks": [
   {
    "type": "p",
    "vi": "Tầng 7 tại 60 Lý Thái Tổ, chỉ vài bước từ hồ Hoàn Kiếm, là địa chỉ của HiLink Business Club: không gian lounge dành cho doanh nhân, doanh nghiệp và cộng đồng — để tiếp khách, giao lưu và làm việc.",
    "en": "Floor 7 at 60 Ly Thai To, a few steps from Hoan Kiem Lake, is home to the HiLink Business Club: a lounge for businesspeople, companies and the community — to host guests, to meet and to work."
   },
   {
    "type": "h2",
    "vi": "Một lounge, nhiều cách dùng",
    "en": "One lounge, many uses"
   },
   {
    "type": "p",
    "vi": "Thành viên dùng business lounge để làm việc và gặp gỡ; phòng họp và không gian sự kiện sẵn sàng cho những buổi cần trang trọng hơn.",
    "en": "Members use the business lounge to work and to meet; meeting rooms and an event space are there when an occasion calls for more."
   },
   {
    "type": "img",
    "src": "/photos/hbc-study.webp",
    "alt": {
     "vi": "Một góc làm việc tại HiLink Business Club",
     "en": "A place to work at the HiLink Business Club"
    }
   },
   {
    "type": "h2",
    "vi": "Hạng hội viên",
    "en": "Membership"
   },
   {
    "type": "p",
    "vi": "Câu lạc bộ có ba hạng — Club, Premier và Executive — với quyền lợi theo từng hạng. Bên cạnh đó, The Quarter Club tại 204 Trần Quang Khải là private club dành cho cá nhân, ưu tiên sự riêng tư và gia nhập qua giới thiệu.",
    "en": "The club has three tiers — Club, Premier and Executive — each with its own privileges. Alongside it, The Quarter Club at 204 Tran Quang Khai is a private club for individuals, where privacy comes first and membership is by referral."
   },
   {
    "type": "h2",
    "vi": "Giờ mở cửa",
    "en": "Opening hours"
   },
   {
    "type": "p",
    "vi": "Thứ Hai đến Thứ Sáu, 08:00–20:00; Thứ Bảy, 09:00–17:00.",
    "en": "Monday to Friday, 08:00–20:00; Saturday, 09:00–17:00."
   }
  ],
  "minutes": 2
 },
 {
  "slug": "cho-thue-bat-dong-san-tai-ha-noi-khi-ban-o-nuoc-ngoai",
  "category": "Services",
  "date": "2026-09-09",
  "title": {
   "vi": "Cho thuê bất động sản tại Hà Nội khi bạn ở nước ngoài",
   "en": "Letting a property in Hanoi while you live abroad"
  },
  "excerpt": {
   "vi": "Những điều nên chuẩn bị để tài sản được chăm sóc và sinh lời khi bạn không có mặt.",
   "en": "What to prepare so the property is looked after, and earning, while you are away."
  },
  "image": "/properties/quarter-house/qh-07.webp",
  "blocks": [
   {
    "type": "p",
    "vi": "Sở hữu một căn hộ hay nhà phố ở Hà Nội trong khi sống ở nước ngoài là chuyện ngày càng phổ biến. Khoảng cách không phải trở ngại — nếu có người lo phần việc hằng ngày và báo cáo rõ ràng cho bạn.",
    "en": "Owning an apartment or townhouse in Hanoi while living abroad is increasingly common. Distance need not be a problem — as long as someone handles the day-to-day and reports back clearly."
   },
   {
    "type": "h2",
    "vi": "Trước khi cho thuê",
    "en": "Before you let"
   },
   {
    "type": "p",
    "vi": "Kiểm tra hiện trạng tài sản, chuẩn bị giấy tờ cần thiết và đặt mức giá hợp lý. Biểu mẫu định giá cho thuê trên trang Quản lý bất động sản giúp bạn bắt đầu.",
    "en": "Check the property's condition, have the necessary papers ready and set a sensible rent. The rental estimate form on the Property Management page is a good place to start.",
    "lead": {
     "vi": "Chuẩn bị.",
     "en": "Preparation."
    }
   },
   {
    "type": "p",
    "vi": "Một khách thuê tốt quan trọng hơn vài ngày trống. Sàng lọc kỹ và hợp đồng rõ ràng giúp tránh rắc rối về sau.",
    "en": "A good tenant matters more than a few empty days. Careful screening and a clear lease save trouble later.",
    "lead": {
     "vi": "Chọn khách thuê.",
     "en": "Choosing a tenant."
    }
   },
   {
    "type": "img",
    "src": "/properties/quarter-house/qh-02.webp",
    "alt": {
     "vi": "Một căn tại The Quarter House do HiLink quản lý",
     "en": "An apartment at The Quarter House, managed by HiLink"
    }
   },
   {
    "type": "h2",
    "vi": "Khi tài sản đã có người thuê",
    "en": "Once the property is let"
   },
   {
    "type": "p",
    "vi": "Thu tiền thuê, chăm sóc khách thuê, bảo trì chủ động và kiểm tra định kỳ là những việc diễn ra hằng tháng. HiLink lo trọn những việc này, gửi báo cáo tài chính hằng tháng và giao tiếp song ngữ với chủ nhà ở nước ngoài, cùng hỗ trợ concierge 24/7.",
    "en": "Collecting rent, looking after tenants, proactive maintenance and regular inspections happen every month. HiLink handles all of it, sends monthly financial statements and communicates bilingually with owners abroad, with 24/7 concierge support."
   }
  ],
  "minutes": 2
 },
 {
  "slug": "dau-la-giai-phap-van-phong-phu-hop-cho-doanh-nghiep-cua-ban",
  "category": "Guide",
  "date": "2024-10-11",
  "title": {
   "vi": "Đâu là giải pháp văn phòng phù hợp cho doanh nghiệp của bạn?",
   "en": "Which office solution is right for your business?"
  },
  "excerpt": {
   "vi": "Hãy cùng HiLink phân tích những yếu tố về không gian làm việc để giúp bạn tìm ra giải pháp văn phòng phù hợp nhất với nhu cầu của mình.",
   "en": "HiLink breaks down the workspace factors that help you choose the office solution that best fits your needs."
  },
  "image": "/photos/blog-office-solution.webp",
  "blocks": [
   {
    "type": "p",
    "vi": "Trong bối cảnh ngày càng nhiều doanh nghiệp và cá nhân lựa chọn hình thức làm việc linh hoạt, việc chọn giữa coworking space và văn phòng riêng trở nên quan trọng hơn bao giờ hết. Mỗi lựa chọn có những lợi ích và chi phí khác nhau, và quyết định đúng đắn có thể ảnh hưởng lớn đến ngân sách cũng như hiệu quả công việc. Hãy cùng phân tích chi phí và những yếu tố cần cân nhắc khi so sánh coworking space và văn phòng riêng để giúp bạn đưa ra giải pháp phù hợp nhất cho nhu cầu của mình.",
    "en": "As more businesses and professionals choose flexible ways of working, deciding between a coworking space and a private office matters more than ever. Each option comes with different benefits and costs, and the right decision can have a big effect on both your budget and how well your team works. Let's look at the costs and the factors to weigh when comparing coworking with a private office, so you can find the solution that fits your needs best."
   },
   {
    "type": "h2",
    "vi": "Chi Phí Thuê và Chi Phí Cố Định",
    "en": "Rent and fixed costs"
   },
   {
    "type": "p",
    "lead": {
     "vi": "Coworking Space",
     "en": "Coworking space"
    },
    "vi": "Coworking space thường cung cấp nhiều lựa chọn về mức giá, từ thuê theo ngày, tháng, hoặc năm. Chi phí thuê coworking space thường bao gồm nhiều dịch vụ tiện ích như internet, điện, nước, bảo trì, và thường cả không gian chung như phòng họp, phòng nghỉ. Sự linh hoạt trong hợp đồng thuê là một ưu điểm lớn, là giải pháp phù hợp giúp tiết kiệm chi phí cho các doanh nghiệp hoặc cá nhân cần sự thay đổi thường xuyên trong không gian làm việc.",
    "en": "Coworking spaces usually offer a range of price points, from daily to monthly or yearly plans. The fee typically covers internet, electricity, water and maintenance, and often shared areas such as meeting rooms and break-out spaces. Flexible contracts are a major advantage — a cost-effective choice for businesses or individuals whose space needs change often."
   },
   {
    "type": "p",
    "lead": {
     "vi": "Văn Phòng Riêng",
     "en": "Private office"
    },
    "vi": "Ngược lại, khi thuê văn phòng riêng, bạn thường phải chịu các chi phí cố định cao hơn, bao gồm tiền thuê mặt bằng, chi phí duy trì, bảo trì, và các dịch vụ cơ bản như điện, nước, internet. Văn phòng riêng thường yêu cầu một hợp đồng thuê dài hạn hơn, điều này có thể dẫn đến sự gắn bó lâu dài và ít linh hoạt hơn trong việc thay đổi hoặc mở rộng không gian.",
    "en": "Renting a private office, by contrast, usually means higher fixed costs: rent, upkeep, maintenance and utilities such as power, water and internet. Private offices also tend to require longer leases, which means a longer commitment and less freedom to change or expand your space."
   },
   {
    "type": "img",
    "src": "/photos/forum-photo-6053020530241552023-w.webp",
    "alt": {
     "vi": "Phòng họp lớn với bàn dài tại HiLink",
     "en": "A large boardroom with a long table at HiLink"
    }
   },
   {
    "type": "h2",
    "vi": "Chi Phí Trang Thiết Bị và Nội Thất",
    "en": "Equipment and furniture"
   },
   {
    "type": "p",
    "lead": {
     "vi": "Coworking Space",
     "en": "Coworking space"
    },
    "vi": "Coworking space thường đã được trang bị đầy đủ với nội thất và thiết bị cần thiết cho một môi trường làm việc chuyên nghiệp, bao gồm bàn làm việc, ghế, máy in, và các thiết bị công nghệ. Điều này giúp giảm thiểu chi phí đầu tư ban đầu và tiết kiệm thời gian cho việc thiết lập văn phòng.",
    "en": "Coworking spaces come fully equipped with the furniture and equipment a professional workplace needs — desks, chairs, printers and technology. That keeps your upfront investment low and saves the time it takes to set up an office."
   },
   {
    "type": "p",
    "lead": {
     "vi": "Văn Phòng Riêng",
     "en": "Private office"
    },
    "vi": "Văn phòng riêng yêu cầu bạn đầu tư vào nội thất và thiết bị làm việc riêng, từ bàn ghế đến các thiết bị văn phòng như máy in, máy photocopy, và các công cụ công nghệ khác. Chi phí đầu tư ban đầu có thể cao và bạn sẽ phải duy trì và bảo trì các thiết bị này trong suốt thời gian thuê.",
    "en": "A private office requires you to invest in your own furniture and equipment, from desks and chairs to printers, copiers and other technology. The initial outlay can be high, and you must maintain all of it for the length of the lease."
   },
   {
    "type": "img",
    "src": "/photos/forum-photo-6053020530241552024-w.webp",
    "alt": {
     "vi": "Phòng họp kính và khu lounge tại HiLink",
     "en": "A glass meeting room and the lounge at HiLink"
    }
   },
   {
    "type": "h2",
    "vi": "Chi Phí Vận Hành và Dịch Vụ Hỗ Trợ",
    "en": "Operating costs and support services"
   },
   {
    "type": "p",
    "lead": {
     "vi": "Coworking Space",
     "en": "Coworking space"
    },
    "vi": "Một trong những lợi thế lớn của coworking space là chi phí vận hành và dịch vụ hỗ trợ thường được bao gồm trong mức giá thuê. Điều này bao gồm các dịch vụ như lễ tân, hỗ trợ IT, và các tiện ích như cà phê, nước uống, và khu vực giải trí. Các coworking space cũng thường cung cấp các dịch vụ quản lý văn phòng giúp tiết kiệm thời gian và công sức cho người dùng.",
    "en": "One of coworking's biggest advantages is that operating costs and support services are usually included in the price. That covers reception, IT support, and amenities such as coffee, drinks and lounge areas. Many coworking spaces also provide office management services that save members time and effort."
   },
   {
    "type": "p",
    "lead": {
     "vi": "Văn Phòng Riêng",
     "en": "Private office"
    },
    "vi": "Với văn phòng riêng, bạn sẽ phải chi trả thêm cho các dịch vụ hỗ trợ và quản lý văn phòng, bao gồm cả việc thuê nhân viên lễ tân, bảo trì thiết bị, và các dịch vụ khác. Các chi phí này có thể gia tăng nhanh chóng và tạo ra gánh nặng tài chính cho doanh nghiệp.",
    "en": "With a private office you pay separately for support and office management — hiring a receptionist, maintaining equipment and other services. These costs add up quickly and can become a real financial burden."
   },
   {
    "type": "h2",
    "vi": "Tính Linh Hoạt và Mở Rộng",
    "en": "Flexibility and growth"
   },
   {
    "type": "p",
    "lead": {
     "vi": "Coworking Space",
     "en": "Coworking space"
    },
    "vi": "Coworking space mang lại sự linh hoạt cao, cho phép bạn thay đổi quy mô hoặc vị trí làm việc theo nhu cầu. Đây là sự lựa chọn lý tưởng cho các doanh nghiệp nhỏ hoặc startups cần khả năng mở rộng hoặc thu hẹp không gian một cách nhanh chóng mà không phải lo lắng về các vấn đề hợp đồng dài hạn.",
    "en": "Coworking offers a high degree of flexibility, letting you change the size or location of your workspace as your needs change. It is ideal for small businesses and startups that need to grow or shrink quickly without worrying about long-term contracts."
   },
   {
    "type": "p",
    "lead": {
     "vi": "Văn Phòng Riêng",
     "en": "Private office"
    },
    "vi": "Văn phòng riêng thường có ít sự linh hoạt hơn khi thay đổi quy mô hoặc vị trí. Việc mở rộng hoặc thu hẹp diện tích làm việc có thể đòi hỏi sự thay đổi hợp đồng thuê, đầu tư vào nội thất mới, và điều chỉnh các dịch vụ hỗ trợ, điều này có thể gây ra chi phí bổ sung.",
    "en": "A private office is usually less flexible when it comes to changing size or location. Expanding or reducing your space can mean renegotiating the lease, buying new furniture and adjusting support services — all of which add cost."
   },
   {
    "type": "img",
    "src": "/photos/forum-tx-03978.webp",
    "alt": {
     "vi": "Một nhóm làm việc quanh bàn họp tròn tại HiLink",
     "en": "A team working around a round meeting table at HiLink"
    }
   },
   {
    "type": "h2",
    "vi": "Tính Năng và Tiện Ích",
    "en": "Features and amenities"
   },
   {
    "type": "p",
    "lead": {
     "vi": "Coworking Space",
     "en": "Coworking space"
    },
    "vi": "Coworking space thường cung cấp một loạt các tiện ích và tính năng bao gồm không gian làm việc chung, phòng họp, phòng nghỉ, khu vực cà phê, và nhiều hoạt động cộng đồng. Những tiện ích này tạo ra một môi trường làm việc thú vị và hỗ trợ sự kết nối giữa các doanh nghiệp và cá nhân.",
    "en": "Coworking spaces typically offer a wide range of amenities — shared work areas, meeting rooms, lounges, coffee points and community events. Together they create an enjoyable working environment and help businesses and individuals connect."
   },
   {
    "type": "p",
    "lead": {
     "vi": "Văn Phòng Riêng",
     "en": "Private office"
    },
    "vi": "Văn phòng riêng có thể không cung cấp nhiều tiện ích và tính năng bổ sung như coworking space, đặc biệt là khi các tiện ích này không được tích hợp trong hợp đồng thuê. Điều này có thể làm giảm trải nghiệm làm việc và tạo ra những chi phí phụ trợ cho việc duy trì các tiện ích cần thiết.",
    "en": "A private office may not offer as many extras as a coworking space, especially when they are not part of the lease. That can make the working experience poorer and add the cost of maintaining the amenities you need."
   },
   {
    "type": "img",
    "src": "/photos/forum-tx-03881.webp",
    "alt": {
     "vi": "Trao đổi công việc ở khu lounge dưới logo HiLink",
     "en": "A conversation in the lounge under the HiLink logo"
    }
   },
   {
    "type": "h2",
    "vi": "Kết Luận",
    "en": "Conclusion"
   },
   {
    "type": "p",
    "vi": "Lựa chọn giữa coworking space và văn phòng riêng phụ thuộc vào nhu cầu cụ thể và ngân sách của bạn. Coworking space cung cấp sự linh hoạt, tiện ích tích hợp, và chi phí đầu tư thấp, trong khi văn phòng riêng mang lại sự kiểm soát và không gian cá nhân hơn nhưng với chi phí cố định cao hơn. Việc phân tích kỹ lưỡng các yếu tố chi phí và lợi ích sẽ giúp bạn tìm ra giải pháp phù hợp nhất cho môi trường làm việc của mình.",
    "en": "Choosing between a coworking space and a private office depends on your specific needs and budget. Coworking offers flexibility, built-in amenities and a low upfront investment, while a private office gives you more control and personal space at a higher fixed cost. Weighing the costs and benefits carefully will help you find the right working environment."
   }
  ],
  "minutes": 3
 },
 {
  "slug": "cach-tan-dung-toi-da-cac-dich-vu-trong-coworking-space",
  "category": "Guide",
  "date": "2024-09-28",
  "title": {
   "vi": "Cách tận dụng tối đa các dịch vụ trong coworking space",
   "en": "How to make the most of the services in a coworking space"
  },
  "excerpt": {
   "vi": "HiLink mang đến những giải pháp hỗ trợ bạn làm việc hiệu quả hơn và tận dụng tối đa dịch vụ tại coworking space.",
   "en": "The HiLink services that help you work more effectively — and how to get the most out of each one."
  },
  "image": "/photos/blog-coworking-services.webp",
  "blocks": [
   {
    "type": "p",
    "vi": "Khi bạn bước vào một không gian coworking, điều quan trọng không chỉ là tìm một chỗ ngồi để làm việc, mà là tận dụng tối đa những dịch vụ và tiện ích có sẵn. Tại HiLink, chúng tôi mang đến những giải pháp từ Private Office, Lounge Desk, Meeting Room, Locker Room, Phone Booth, Pantry, đến hỗ trợ kỹ thuật, lễ tân, và e-Office. Mỗi dịch vụ đều được thiết kế để hỗ trợ bạn làm việc hiệu quả hơn, và đây là cách để bạn khai thác tối đa những giá trị mà các tiện ích này mang lại.",
    "en": "When you walk into a coworking space, the point is not just to find a seat but to make the most of the services and amenities on offer. At HiLink we provide everything from Private Offices, Lounge Desks, Meeting Rooms, Locker Rooms, Phone Booths and the Pantry to technical support, reception and e-Office. Each service is designed to help you work more effectively — here is how to get the most out of them."
   },
   {
    "type": "h2",
    "vi": "Private Office – Tập Trung Và Nâng Cao Hiệu Suất",
    "en": "Private Office – focus and higher productivity"
   },
   {
    "type": "p",
    "vi": "Private Office là lựa chọn lý tưởng nếu bạn đang tìm kiếm không gian riêng tư, tách biệt để tập trung vào những công việc quan trọng hoặc gặp gỡ đối tác. Bạn có thể tận dụng không gian này để tạo ra một môi trường làm việc cá nhân hóa, tối ưu hóa quy trình và tập trung hoàn toàn vào công việc mà không bị gián đoạn. Với bàn làm việc riêng, ghế ngồi thoải mái và không gian lưu trữ được tổ chức tốt, bạn sẽ không cần lo lắng về sự lộn xộn, giúp giảm căng thẳng và tăng năng suất làm việc.",
    "en": "A Private Office is the right choice if you need a private, separate space to concentrate on important work or meet partners. You can shape it into a personalised workplace, streamline how you work and focus fully without interruptions. With your own desk, comfortable seating and well-organised storage, clutter is never a worry — which lowers stress and raises productivity."
   },
   {
    "type": "img",
    "src": "/photos/forum-tx-04035.webp",
    "alt": {
     "vi": "Một nhóm họp trong văn phòng riêng có cửa sổ nhìn ra thành phố",
     "en": "A team meeting in a private office with a city view"
    }
   },
   {
    "type": "h2",
    "vi": "Lounge Desk – Kết Nối Cộng Đồng Và Truyền Cảm Hứng",
    "en": "Lounge Desk – community and inspiration"
   },
   {
    "type": "p",
    "vi": "Đối với những người yêu thích sự linh hoạt và môi trường làm việc mở, Lounge Desk là nơi lý tưởng để vừa làm việc, vừa mở rộng mối quan hệ. Bạn có thể tận dụng khu vực này để gặp gỡ và trao đổi ý tưởng với các thành viên khác trong không gian. Việc làm việc trong môi trường sáng tạo với nhiều người từ các lĩnh vực khác nhau sẽ giúp bạn có thêm cảm hứng và đôi khi còn mở ra cơ hội hợp tác bất ngờ.",
    "en": "For people who love flexibility and an open environment, the Lounge Desk is the ideal place to work and grow your network at the same time. Use it to meet other members and exchange ideas. Working in a creative setting alongside people from many different fields brings fresh inspiration — and sometimes unexpected opportunities to collaborate."
   },
   {
    "type": "img",
    "src": "/photos/forum-tx-03792.webp",
    "alt": {
     "vi": "Thành viên làm việc tại khu Lounge Desk",
     "en": "Members working at the Lounge Desk"
    }
   },
   {
    "type": "h2",
    "vi": "Meeting Room – Tối Ưu Cuộc Họp Hiệu Quả",
    "en": "Meeting Room – meetings that get results"
   },
   {
    "type": "p",
    "vi": "Để những cuộc họp đạt được hiệu quả tối đa, không gian Meeting Room tại HiLink là một công cụ hỗ trợ đắc lực. Bạn có thể tận dụng phòng họp được trang bị đầy đủ công nghệ hiện đại như máy chiếu, màn hình lớn và hệ thống âm thanh rõ nét để thuyết trình, thảo luận chiến lược hoặc tổ chức các buổi hội thảo nhỏ. Đặc biệt, việc sử dụng phòng họp một cách linh hoạt giúp bạn tạo ấn tượng chuyên nghiệp đối với đối tác và khách hàng. Lên lịch trước qua hệ thống trực tuyến của HiLink sẽ giúp bạn không phải lo lắng về việc tìm phòng họp vào phút chót, đảm bảo sự chủ động và chuyên nghiệp trong mọi tình huống.",
    "en": "To make meetings as effective as possible, HiLink's Meeting Rooms are a powerful tool. They are fully equipped with modern technology — projectors, large screens and clear audio — for presentations, strategy discussions or small workshops. Using meeting rooms flexibly also leaves a professional impression on partners and clients. Booking ahead through HiLink's online system means no last-minute scramble for a room, so you stay in control in every situation."
   },
   {
    "type": "img",
    "src": "/photos/forum-tx-03969-1.webp",
    "alt": {
     "vi": "Buổi họp trong phòng họp có màn hình trình chiếu",
     "en": "A meeting in a room with a presentation screen"
    }
   },
   {
    "type": "h2",
    "vi": "Locker Room – Giữ Gìn Đồ Đạc An Toàn Và Tiện Lợi",
    "en": "Locker Room – keep your belongings safe and close"
   },
   {
    "type": "p",
    "vi": "Để tận dụng tối đa Locker Room, hãy sử dụng nó như nơi lưu trữ mọi vật dụng cá nhân hoặc tài liệu quan trọng mà bạn không muốn mang theo mỗi ngày. Điều này giúp bạn cảm thấy thoải mái hơn khi di chuyển giữa các buổi làm việc, gặp gỡ đối tác hay thay đổi không gian làm việc mà không phải lo lắng về đồ đạc. Việc có một chỗ an toàn để giữ đồ giúp bạn tập trung hơn vào công việc mà không phải lo nghĩ về sự bảo mật của các vật dụng cá nhân.",
    "en": "To get the most from the Locker Room, use it to store personal items or important documents you don't want to carry every day. You can move between work sessions, partner meetings and different spaces without worrying about your things. Having a secure place for your belongings lets you focus on work instead of on their safety."
   },
   {
    "type": "img",
    "src": "/photos/forum-blog-lockers-2.webp",
    "alt": {
     "vi": "Phòng locker tại HiLink",
     "en": "The locker room at HiLink"
    }
   },
   {
    "type": "h2",
    "vi": "Phone Booth – Sự Riêng Tư Cho Các Cuộc Gọi Quan Trọng",
    "en": "Phone Booth – privacy for important calls"
   },
   {
    "type": "p",
    "vi": "Khi cần thực hiện các cuộc gọi riêng tư hoặc thảo luận về những vấn đề nhạy cảm, Phone Booth là giải pháp tối ưu. Bạn có thể tận dụng không gian này để thực hiện các cuộc gọi mà không sợ bị phân tâm hay làm phiền bởi môi trường xung quanh. Đây là cách tốt nhất để đảm bảo sự riêng tư tuyệt đối trong khi vẫn giữ được chất lượng âm thanh rõ ràng, giúp bạn duy trì sự tập trung và hiệu quả trong những cuộc giao tiếp quan trọng.",
    "en": "When you need to make a private call or discuss something sensitive, the Phone Booth is the best option. You can take calls without distractions or disturbing the people around you. It is the simplest way to guarantee privacy while keeping the sound clear, so you stay focused during important conversations."
   },
   {
    "type": "img",
    "src": "/photos/forum-tx-03939.webp",
    "alt": {
     "vi": "Một thành viên gọi điện trong phone booth",
     "en": "A member taking a call in a phone booth"
    }
   },
   {
    "type": "h2",
    "vi": "Pantry – Nạp Năng Lượng Cho Ngày Làm Việc Hiệu Quả",
    "en": "Pantry – recharge for a productive day"
   },
   {
    "type": "p",
    "vi": "Sau những giờ làm việc căng thẳng, Pantry là nơi bạn có thể đến để thư giãn, nạp lại năng lượng và tái tạo tinh thần. Hãy tận dụng khu vực này như một điểm dừng chân để thưởng thức đồ uống hoặc đồ ăn nhẹ. Không gian pantry tại HiLink là nơi lý tưởng để bạn giao lưu, kết nối. Việc dành chút thời gian nghỉ ngơi tại đây cũng sẽ giúp bạn quay lại công việc với tinh thần sảng khoái hơn và hiệu suất cao hơn.",
    "en": "After intense hours of work, the Pantry is where you can relax, recharge and reset. Treat it as a stop for a drink or a snack. HiLink's pantry is also a natural place to meet and connect with others. Taking a short break here helps you return to work refreshed and more productive."
   },
   {
    "type": "h2",
    "vi": "Hỗ Trợ Kỹ Thuật Và Lễ Tân – Giảm Áp Lực Về Công Nghệ",
    "en": "Technical support and reception – less stress about technology"
   },
   {
    "type": "p",
    "vi": "Đội ngũ hỗ trợ kỹ thuật và lễ tân tại HiLink luôn sẵn sàng giúp bạn giải quyết mọi vấn đề liên quan đến công nghệ và quản lý văn phòng. Để tận dụng tối đa, đừng ngần ngại yêu cầu trợ giúp khi gặp phải sự cố về Wi-Fi, máy tính hay các thiết bị khác. Điều này giúp bạn tập trung vào công việc chính mà không bị gián đoạn bởi các rắc rối kỹ thuật. Đội ngũ lễ tân chuyên nghiệp cũng sẽ là người hỗ trợ đắc lực cho bạn trong việc tiếp đón khách hàng, quản lý thư từ hay hỗ trợ các nhu cầu văn phòng hàng ngày. Đây là một phần quan trọng giúp nâng cao sự chuyên nghiệp của doanh nghiệp bạn khi làm việc tại HiLink.",
    "en": "HiLink's technical support and reception team is always ready to help with technology and office management. Don't hesitate to ask for help with Wi-Fi, computers or other equipment, so you can focus on your work without technical interruptions. Our professional reception team also supports you in welcoming clients, handling mail and day-to-day office needs — an important part of how HiLink raises your business's professional image."
   },
   {
    "type": "img",
    "src": "/photos/forum-tx-03928-1.webp",
    "alt": {
     "vi": "Lễ tân HiLink hỗ trợ khách",
     "en": "HiLink reception helping a guest"
    }
   },
   {
    "type": "h2",
    "vi": "E-Office – Văn Phòng Ảo Linh Hoạt Cho Doanh Nghiệp",
    "en": "e-Office – a flexible virtual office for your business"
   },
   {
    "type": "p",
    "vi": "E-Office là giải pháp lý tưởng nếu bạn đang tìm cách duy trì sự hiện diện chuyên nghiệp mà không cần phải thuê một văn phòng thực tế. Bạn có thể tận dụng dịch vụ này để sử dụng địa chỉ đăng ký kinh doanh tại HiLink, quản lý thư từ và bưu phẩm từ xa, và chỉ cần đến không gian làm việc thực tế khi cần thiết. Điều này giúp bạn giảm bớt chi phí vận hành mà vẫn giữ được hình ảnh doanh nghiệp chuyên nghiệp, linh hoạt. E-Office là một cách thông minh để điều hành công việc mà không bị ràng buộc bởi chi phí và không gian cố định.",
    "en": "e-Office is the ideal solution if you want a professional presence without renting a physical office. Use HiLink's address as your registered business address, manage mail and parcels remotely, and come into the workspace only when you need to. It cuts operating costs while keeping a professional, flexible image — a smart way to run your business without fixed space and fixed costs."
   },
   {
    "type": "h2",
    "vi": "Tạm kết",
    "en": "In summary"
   },
   {
    "type": "p",
    "vi": "Khi tận dụng các dịch vụ như Private Office, Lounge Desk, Meeting Room, Locker Room, Phone Booth, Pantry, cùng với sự hỗ trợ kỹ thuật và lễ tân, bạn sẽ trải nghiệm không chỉ một không gian làm việc mà là một môi trường coworking đầy sự sáng tạo và linh hoạt. HiLink không chỉ mang đến cho bạn một vị trí làm việc, mà còn cung cấp mọi công cụ và tiện ích cần thiết để bạn làm việc hiệu quả và thoải mái nhất. Hãy khám phá những lợi ích mà HiLink mang lại, tận dụng tối đa dịch vụ và cảm nhận sự khác biệt trong môi trường làm việc của bạn.",
    "en": "By making full use of the Private Office, Lounge Desk, Meeting Room, Locker Room, Phone Booth and Pantry, together with technical and reception support, you get more than a place to work — you get a creative, flexible coworking environment. HiLink gives you not just a desk but every tool and amenity you need to work productively and comfortably. Explore what HiLink offers, make the most of its services and feel the difference in your working day."
   }
  ],
  "minutes": 4
 },
 {
  "slug": "cam-hung-sang-tao-tu-moi-truong-lam-viec-tai-hilink-khong-gian-mo-va-thiet-ke-hien-dai",
  "category": "Design",
  "date": "2024-09-24",
  "title": {
   "vi": "Cảm hứng sáng tạo từ môi trường làm việc tại HiLink: không gian mở và thiết kế hiện đại",
   "en": "Creative inspiration at HiLink: open space and modern design"
  },
  "excerpt": {
   "vi": "Với không gian mở và thiết kế hiện đại, HiLink mang đến điều kiện lý tưởng để bạn phát huy cảm hứng sáng tạo và kết nối hiệu quả.",
   "en": "With open space and modern design, HiLink creates the ideal conditions for creativity and meaningful connection."
  },
  "image": "/photos/blog-open-space.webp",
  "blocks": [
   {
    "type": "p",
    "vi": "Trong môi trường làm việc hiện nay, không gian làm việc là điều quan trọng để tăng cường cảm hứng sáng tạo và hiệu suất công việc. Tại HiLink Premium Workspace, chúng tôi hiểu rằng một không gian làm việc lý tưởng không chỉ giúp bạn hoàn thành công việc mà còn nâng cao cảm hứng và động lực làm việc. Với sự kết hợp hoàn hảo giữa không gian mở và thiết kế hiện đại, HiLink khuyến khích sự sáng tạo và kết nối hiệu quả trong công việc. Hãy khám phá những không gian làm việc tại HiLink để thấy cách thiết kế tinh tế có thể biến đổi quy trình làm việc của bạn và truyền cảm hứng cho những ý tưởng mới.",
    "en": "In today's working world, the workspace itself plays an important role in creativity and productivity. At HiLink Premium Workspace, we believe the ideal workspace does more than help you finish tasks — it lifts your inspiration and motivation. By combining open spaces with modern design, HiLink encourages creativity and effective connection. Explore HiLink's spaces and see how thoughtful design can change the way you work and spark new ideas."
   },
   {
    "type": "h2",
    "vi": "Private Office – Không gian riêng tư, sáng tạo cá nhân",
    "en": "Private Office – privacy for personal creativity"
   },
   {
    "type": "p",
    "vi": "Private Office là không gian làm việc riêng tư, được thiết kế để mang đến sự yên tĩnh tuyệt đối. Với gam màu trung tính dịu mắt, ánh sáng tự nhiên vừa đủ và không gian được bố trí khoa học, nơi đây sẽ giúp bạn tập trung tối đa và hoàn thành công việc một cách hiệu quả. Hãy tưởng tượng bạn đang làm việc trong một không gian yên tĩnh như một thư viện cổ kính, không có bất kỳ tiếng ồn nào làm phiền. Đó chính là trải nghiệm mà Private Office mang lại.",
    "en": "The Private Office is a private workspace designed for complete quiet. With calm neutral tones, balanced natural light and a well-planned layout, it helps you concentrate fully and work efficiently. Imagine working somewhere as quiet as an old library, with no noise to disturb you — that is the experience a Private Office offers."
   },
   {
    "type": "img",
    "src": "/photos/forum-ift-0317-84.webp",
    "alt": {
     "vi": "Văn phòng riêng yên tĩnh với ánh sáng tự nhiên",
     "en": "A quiet private office with natural light"
    }
   },
   {
    "type": "h2",
    "vi": "Lounge Desk – Không gian mở đầy năng lượng",
    "en": "Lounge Desk – an open space full of energy"
   },
   {
    "type": "p",
    "vi": "Lounge Desk tại HiLink là một không gian làm việc mở với những chiếc bàn làm việc màu đen tinh tế được bố trí hài hòa trong sảnh rộng lớn. Ánh sáng tự nhiên tràn ngập kết hợp cùng tông màu hiện đại và nội thất sang trọng, tạo nên một không gian làm việc chuyên nghiệp, khơi gợi cảm hứng sáng tạo. Đây là nơi lý tưởng để các cá nhân kết nối, giao lưu và tìm kiếm những ý tưởng mới, đồng thời tận hưởng những phút giây làm việc hiệu quả.",
    "en": "The Lounge Desk at HiLink is an open workspace with elegant black desks arranged across a generous hall. Abundant natural light, a modern palette and refined furniture create a professional setting that sparks creativity. It is the ideal place to meet people, exchange ideas and enjoy productive hours of work."
   },
   {
    "type": "img",
    "src": "/photos/forum-tx-03810.webp",
    "alt": {
     "vi": "Khu Lounge Desk với bàn đen và ánh sáng tự nhiên",
     "en": "The Lounge Desk area with black desks and natural light"
    }
   },
   {
    "type": "h2",
    "vi": "Meeting Room – Không gian thảo luận độc đáo",
    "en": "Meeting Room – a distinctive space for discussion"
   },
   {
    "type": "p",
    "vi": "Meeting Room tại HiLink là một không gian làm việc hiện đại và sang trọng, được thiết kế với tông màu trung tính và nội thất hình học độc đáo. Bàn họp thông minh và hệ thống âm thanh vòm chất lượng cao tạo nên một môi trường làm việc chuyên nghiệp, hiệu quả và ấn tượng. Với thiết kế tập trung vào sự tiện nghi và thẩm mỹ, Meeting Room tại HiLink không chỉ nâng cao chất lượng các cuộc họp mà còn tạo ra một ấn tượng tích cực và chuyên nghiệp với các đối tác và khách hàng.",
    "en": "HiLink's Meeting Rooms are modern and refined, designed with neutral tones and distinctive geometric furniture. Smart meeting tables and high-quality surround sound create a professional, effective and memorable setting. With a design focused on comfort and aesthetics, the Meeting Rooms not only improve the quality of your meetings but also leave partners and clients with a positive, professional impression."
   },
   {
    "type": "img",
    "src": "/photos/forum-photo-6298359236966598469-y.webp",
    "alt": {
     "vi": "Phòng họp kính hình tròn tại HiLink",
     "en": "A round glass meeting room at HiLink"
    }
   },
   {
    "type": "h2",
    "vi": "e-Office – Văn phòng ảo với sự hiện diện chuyên nghiệp",
    "en": "e-Office – a virtual office with a professional presence"
   },
   {
    "type": "p",
    "vi": "Dịch vụ e-Office giúp bạn giữ vững sự chuyên nghiệp trong mắt đối tác dù làm việc từ xa. Với địa chỉ văn phòng uy tín, dịch vụ nhận thư từ, cùng tiện ích quản lý tài liệu, bạn hoàn toàn có thể duy trì sự hiện diện chuyên nghiệp của mình mọi lúc, mọi nơi.",
    "en": "The e-Office service keeps you professional in your partners' eyes even when you work remotely. With a reputable office address, mail handling and document management, you can maintain a professional presence anytime, anywhere."
   },
   {
    "type": "h2",
    "vi": "Tạm Kết",
    "en": "In summary"
   },
   {
    "type": "p",
    "vi": "Khi lựa chọn môi trường làm việc, sự kết hợp giữa thiết kế hiện đại và không gian mở không chỉ đáp ứng nhu cầu cá nhân mà còn thúc đẩy sự sáng tạo và hiệu quả công việc.",
    "en": "When choosing a working environment, combining modern design with open space not only meets individual needs but also drives creativity and productivity."
   },
   {
    "type": "p",
    "vi": "Mỗi không gian làm việc tại HiLink đều được thiết kế với mục tiêu tối ưu hóa sự sáng tạo và hiệu quả công việc. Từ sự yên tĩnh của Private Office, năng lượng giao lưu của Lounge Desk, đến tính linh hoạt của e-Office, bạn sẽ luôn tìm được môi trường làm việc lý tưởng giúp thúc đẩy sáng tạo và kết nối.",
    "en": "Every workspace at HiLink is designed to make the most of creativity and productivity. From the quiet of the Private Office and the social energy of the Lounge Desk to the flexibility of e-Office, you will always find an environment that helps you create and connect."
   },
   {
    "type": "p",
    "vi": "HiLink Premium Workspace tự hào mang đến những không gian được thiết kế đặc biệt để đáp ứng nhu cầu đa dạng của các chuyên gia và doanh nhân hiện đại.",
    "en": "HiLink Premium Workspace is proud to offer spaces designed specifically for the varied needs of today's professionals and entrepreneurs."
   }
  ],
  "minutes": 2
 },
 {
  "slug": "nhung-loi-the-khi-thue-van-phong-tai-quan-dong-da",
  "category": "Neighbourhood",
  "date": "2023-10-11",
  "title": {
   "vi": "Những lợi thế khi thuê văn phòng tại quận Đống Đa",
   "en": "The advantages of renting an office in Dong Da district"
  },
  "excerpt": {
   "vi": "Quận Đống Đa đã trở thành một trong những điểm đến phổ biến cho nhiều doanh nghiệp tìm kiếm không gian làm việc hiện đại và thuận tiện.",
   "en": "Dong Da has become one of Hanoi's most popular districts for businesses looking for a modern, convenient workspace."
  },
  "image": "/photos/blog-dong-da.webp",
  "blocks": [
   {
    "type": "p",
    "vi": "Việc tìm một vị trí lý tưởng cho văn phòng của bạn có thể là một nhiệm vụ khá phức tạp. Quận Đống Đa tại Hà Nội, Việt Nam, đã trở thành một trong những điểm đến phổ biến cho nhiều doanh nghiệp khi họ tìm kiếm không gian làm việc hiện đại và thuận tiện. Trong bài viết này, hãy cùng HiLink Vietnam xem xét những lợi thế quan trọng khi thuê văn phòng tại quận Đống Đa.",
    "en": "Finding the ideal location for your office can be a complex task. Dong Da district in Hanoi has become one of the most popular choices for businesses looking for a modern, convenient workspace. In this article, HiLink Vietnam looks at the key advantages of renting an office in Dong Da."
   },
   {
    "type": "h2",
    "vi": "Vị trí đắc địa",
    "en": "A prime location"
   },
   {
    "type": "p",
    "vi": "Quận Đống Đa nằm ở trung tâm của Hà Nội, giữa các quận quan trọng khác như Ba Đình, Hoàn Kiếm và Hai Bà Trưng, gần các trục đường chính và thuận tiện di chuyển đến các khu vực lân cận. Vị trí này giúp cho các doanh nghiệp dễ dàng tiếp cận từ các khu vực khác của thành phố, thuận tiện cho việc tiếp khách hoặc họp gặp đối tác kinh doanh và các nguồn lực khác.",
    "en": "Dong Da sits in the centre of Hanoi, between other key districts such as Ba Dinh, Hoan Kiem and Hai Ba Trung, close to main roads and with easy access to surrounding areas. That makes businesses easy to reach from across the city — convenient for hosting clients, meeting partners and accessing other resources."
   },
   {
    "type": "h2",
    "vi": "Hạ tầng phát triển và hiện đại",
    "en": "Modern, well-developed infrastructure"
   },
   {
    "type": "p",
    "vi": "Quận Đống Đa được đầu tư mạnh mẽ về cơ sở hạ tầng, với nhiều tòa nhà văn phòng cao cấp, được trang bị các thiết bị và dịch vụ hiện đại, có nhiều trường đại học, bệnh viện, cửa hàng, nhà hàng, quán cà phê và các cơ sở giải trí khác. Quận Đống Đa cũng đã được đầu tư phát triển hạ tầng giao thông, điều này giúp giảm tắc nghẽn và tăng tính linh hoạt cho việc di chuyển trong khu vực. Điều này đặc biệt quan trọng đối với doanh nghiệp và nhân viên của các doanh nghiệp và công ty, giúp tạo nên một môi trường làm việc chuyên nghiệp và tăng hiệu suất làm việc.",
    "en": "Dong Da has seen heavy investment in infrastructure, with many premium office buildings equipped with modern facilities and services, alongside universities, hospitals, shops, restaurants, cafés and entertainment venues. Investment in transport infrastructure has also eased congestion and made getting around the area more flexible. This matters especially for companies and their employees, helping create a professional working environment and higher productivity."
   },
   {
    "type": "img",
    "src": "/photos/forum-quan-dong-da.webp",
    "alt": {
     "vi": "Toàn cảnh quận Đống Đa, Hà Nội nhìn từ trên cao",
     "en": "An aerial view of Dong Da district, Hanoi"
    }
   },
   {
    "type": "h2",
    "vi": "Lựa chọn đa dạng",
    "en": "A wide range of options"
   },
   {
    "type": "p",
    "vi": "Trên thị trường văn phòng ở quận Đống Đa, bạn có nhiều sự lựa chọn về loại hình văn phòng. Có thể là văn phòng truyền thống, không gian làm việc chia sẻ, hoặc cả hai. Điều này cho phép bạn tùy chỉnh không gian làm việc theo nhu cầu cụ thể của doanh nghiệp bạn. Mô hình Co-working được HiLink Vietnam lựa chọn dựa trên xu hướng phát triển trong tương lai.",
    "en": "Dong Da's office market offers many types of workspace: traditional offices, shared workspaces, or a mix of both. That lets you tailor your workspace to your business's specific needs. HiLink Vietnam chose the coworking model based on where the market is heading."
   },
   {
    "type": "h2",
    "vi": "Cộng đồng kinh doanh phát triển",
    "en": "A thriving business community"
   },
   {
    "type": "p",
    "vi": "Quận Đống Đa có nhiều doanh nghiệp và cơ quan chính phủ, tạo ra một môi trường phát triển cho việc kết nối và hợp tác kinh doanh. Bạn có cơ hội gặp gỡ các đối tác tiềm năng và học hỏi từ những người khác trong cộng đồng kinh doanh năng động này.",
    "en": "Dong Da is home to many businesses and government agencies, creating a strong environment for networking and business collaboration. You have the chance to meet potential partners and learn from others in this dynamic business community."
   },
   {
    "type": "h2",
    "vi": "Giá cả hợp lý",
    "en": "Reasonable prices"
   },
   {
    "type": "p",
    "vi": "Mặc dù nằm ở trung tâm thành phố, quận Đống Đa thường có mức giá thuê văn phòng hợp lý so với một số quận khác tại Hà Nội như quận Hoàn Kiếm, quận Hai Bà Trưng hay quận Ba Đình. Việc thuê văn phòng tại đây sẽ giúp cho doanh nghiệp tiết kiệm chi phí về thuê văn phòng và các chi phí khác liên quan đến hoạt động kinh doanh.",
    "en": "Despite its central location, Dong Da usually offers more reasonable office rents than districts such as Hoan Kiem, Hai Ba Trung or Ba Dinh. Renting here helps businesses save on rent and other operating costs."
   },
   {
    "type": "img",
    "src": "/photos/forum-dong-da-toan-canh.webp",
    "alt": {
     "vi": "Các toà nhà và khu dân cư quận Đống Đa nhìn từ trên cao",
     "en": "Buildings and neighbourhoods of Dong Da seen from above"
    }
   },
   {
    "type": "h2",
    "vi": "Tạm kết",
    "en": "In summary"
   },
   {
    "type": "p",
    "vi": "Như vậy, quận Đống Đa không chỉ có vị trí tốt và hạ tầng phát triển, mà còn cung cấp một loạt các lợi thế cho doanh nghiệp khi họ quyết định thuê văn phòng ở đây. Sự đa dạng trong lựa chọn, dịch vụ hỗ trợ, môi trường làm việc thân thiện, và cơ hội kết nối với cộng đồng kinh doanh đang phát triển đã khiến quận Đống Đa trở thành một trong những điểm đến hàng đầu cho các doanh nghiệp tại Hà Nội.",
    "en": "Dong Da offers not only a good location and developed infrastructure but also a range of advantages for businesses that choose to rent an office here. Its variety of options, support services, friendly working environment and growing business community have made it one of the leading destinations for businesses in Hanoi."
   }
  ],
  "minutes": 2
 }
];
