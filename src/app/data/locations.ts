// Generated from the approved HiLink copy (src/data/locations.js, hilink.vn).
// Edit the source of truth first, then regenerate — do not hand-edit.
export const WORKSPACE_LINES = {
  "HPW": {
    "label": "HiLink Premium Workspace",
    "color": "#A88F5C"
  },
  "HW": {
    "label": "HiLink Workspace",
    "color": "#6F6A5C"
  },
  "HBC": {
    "label": "HiLink Business Club",
    "color": "#3D4A2E"
  },
  "HFS": {
    "label": "HiLink Flex Spaces",
    "color": "#8C5A3C"
  }
} as const;

export type LineCode = keyof typeof WORKSPACE_LINES;

export const LOCATIONS: { id: string; name: string; line: LineCode | null; ward: string; address: string; hours: string; comingSoon: boolean; solutions: string[]; intro: { en: string; vi: string }; photo: string }[] = [
  {
    "id": "obc",
    "name": "60 Ly Thai To",
    "line": "HBC",
    "ward": "Ly Thai To",
    "address": "Floor 7, 60 Ly Thai To, P. Ly Thai To, Ha Noi",
    "hours": "Mon–Fri · 08:00–20:00 · Sat 09:00–17:00",
    "comingSoon": false,
    "solutions": [
      "E-office",
      "Meeting & Event Space",
      "Meeting Rooms",
      "Event Space"
    ],
    "intro": {
      "en": "Our flagship Business Club address, steps from Hoan Kiem Lake. Floor 7 pairs a members' business lounge with meeting rooms and an event space for Hanoi's executives.",
      "vi": "Địa chỉ Business Club hàng đầu, sát Hồ Hoàn Kiếm. Tầng 7 kết hợp business lounge dành cho thành viên với phòng họp và không gian sự kiện cho giới điều hành Hà Nội."
    },
    "photo": "/photos/hbc-lounge.webp"
  },
  {
    "id": "nha-chung",
    "name": "35 Nha Chung",
    "line": "HW",
    "ward": "Hoan Kiem",
    "address": "35 Nha Chung, Hoan Kiem, Ha Noi",
    "hours": "Mon–Fri · 08:00–19:00",
    "comingSoon": false,
    "solutions": [
      "Hybrid Work",
      "E-office",
      "Meeting & Event Space",
      "Event Space"
    ],
    "intro": {
      "en": "A boutique workspace tucked beside St. Joseph's Cathedral. Flex and dedicated desks, an event space and E-office plans for small, design-minded teams.",
      "vi": "Không gian boutique nép bên Nhà thờ Lớn. Bàn linh hoạt, bàn cố định, không gian sự kiện và gói E-office cho các đội nhỏ yêu thiết kế."
    },
    "photo": "/photos/nc35-room.webp"
  },
  {
    "id": "nq49",
    "name": "49 Ngo Quyen",
    "line": null,
    "ward": "Cua Nam",
    "address": "49 Ngo Quyen, Cua Nam, Ha Noi",
    "hours": "Mon–Sat · 08:00–20:00",
    "comingSoon": true,
    "solutions": [
      "Hybrid Work"
    ],
    "intro": {
      "en": "A new HiLink address in Cua Nam, opening soon with roam-anywhere hybrid memberships.",
      "vi": "Địa chỉ HiLink mới tại Cửa Nam, sắp khai trương với gói hội viên hybrid linh hoạt."
    },
    "photo": "/photos/f15-logo.webp"
  },
  {
    "id": "club-tqk",
    "name": "204 Tran Quang Khai",
    "line": "HBC",
    "ward": "Hoan Kiem",
    "address": "204 Tran Quang Khai, Hoan Kiem, Ha Noi",
    "hours": "Mon–Sun · 10:00 – late",
    "comingSoon": false,
    "solutions": [
      "Private Workspaces",
      "Meeting & Event Space",
      "Meeting Rooms"
    ],
    "intro": {
      "en": "A modern business and social club inspired by the streets of Hanoi — bar, cigar room and private dining, beside the river.",
      "vi": "Business & social club hiện đại lấy cảm hứng từ những con phố Hà Nội — quầy bar, phòng cigar và phòng ăn riêng, bên sông."
    },
    "photo": "/photos/quarter-club-bar.webp"
  },
  {
    "id": "ttt-f15",
    "name": "4 Ton That Tung · Floor 15",
    "line": "HPW",
    "ward": "Kim Lien",
    "address": "Floor 15, 4 Ton That Tung, Kim Lien, Ha Noi",
    "hours": "Mon–Fri · 08:00–20:00",
    "comingSoon": false,
    "solutions": [
      "Private Workspaces",
      "Hybrid Work",
      "E-office",
      "Meeting & Event Space",
      "Meeting Rooms",
      "Event Space"
    ],
    "intro": {
      "en": "High-floor workspace with skyline views over Dong Da. Scalable private offices and build-to-suit enterprise floors for growing teams.",
      "vi": "Không gian tầng cao với tầm nhìn toàn cảnh Đống Đa. Văn phòng riêng có thể mở rộng và tầng doanh nghiệp build-to-suit cho đội ngũ tăng trưởng."
    },
    "photo": "/photos/f15-lounge-cabin.webp"
  },
  {
    "id": "ttt-f17",
    "name": "4 Ton That Tung · Floor 17",
    "line": "HW",
    "ward": "Kim Lien",
    "address": "Floor 17, 4 Ton That Tung, Kim Lien, Ha Noi",
    "hours": "Mon–Fri · 08:00–20:00",
    "comingSoon": false,
    "solutions": [
      "Private Workspaces",
      "Enterprise Solutions"
    ],
    "intro": {
      "en": "Floor 17, leased as a private floor for one tenant. Zone 17B is already let — zone 17A is available as a single unit.",
      "vi": "Tầng 17 cho thuê nguyên sàn cho một đơn vị. Khu 17B đã có đơn vị thuê — khu 17A còn trống, cho thuê trọn khu."
    },
    "photo": "/photos/f15-office-hi11.webp"
  },
  {
    "id": "ttt-f19",
    "name": "4 Ton That Tung · Floor 19",
    "line": "HW",
    "ward": "Kim Lien",
    "address": "Floor 19, 4 Ton That Tung, Kim Lien, Ha Noi",
    "hours": "Mon–Fri · 08:00–21:00",
    "comingSoon": false,
    "solutions": [
      "Private Workspaces",
      "Enterprise Solutions"
    ],
    "intro": {
      "en": "The whole of Floor 19, leased as one private floor — built to suit your team, with the building's best views over Dong Da.",
      "vi": "Trọn tầng 19 cho thuê nguyên tầng — thi công theo nhu cầu của đội bạn, với tầm nhìn đẹp nhất toà nhà ra Đống Đa."
    },
    "photo": "/photos/f19-window.webp"
  }
];
