// The properties HiLink manages, with how each is doing — shown as the deck
// on Property Management and as the cards in the Solutions hero. A
// `slug` is a page on this site (/workspace/:slug); an `href` is a location
// page on HiLink Workspaces.
export type ManagedProperty = { slug?: string; href?: string; name: string; location: string; type: string; image: string; stats: string[][] };

export const PROPERTIES: Record<'en' | 'vi', ManagedProperty[]> = {
  en: [
    { slug: 'quarter-house', name: 'The Quarter House', location: 'Hoan Kiem, Hanoi', type: 'Boutique Townhouse', image: '/properties/quarter-house/qh-07.webp', stats: [['Units', '4'], ['Occupancy', '95%'], ['Avg Rent', '$4,000/mo']] },
    { href: '/locations/ttt-f19', name: 'Floor 19 · 4 Ton That Tung', location: 'Kim Lien, Dong Da, Hanoi', type: 'Private Floor', image: '/photos/f19-window.webp', stats: [['Floor', '19'], ['Leased to', '1 tenant'], ['Team size', '20–60']] },
    { href: '/locations/ttt-f17', name: 'Floor 17 · 4 Ton That Tung', location: 'Kim Lien, Dong Da, Hanoi', type: 'Private Floor', image: '/photos/f15-office-hi11.webp', stats: [['Zones', '2'], ['Zone 17B', 'Let'], ['Zone 17A', 'Available']] },
    { href: '/locations/ttt-f15', name: 'Floor 15 · 4 Ton That Tung', location: 'Kim Lien, Dong Da, Hanoi', type: 'Premium Workspace', image: '/photos/f15-lounge-cabin.webp', stats: [['Offices', '2–12 pax'], ['Meeting rooms', '4–12 pax'], ['Hours', '08:00–20:00']] },
    { href: '/locations/nha-chung', name: '35 Nha Chung', location: 'Hoan Kiem, Hanoi', type: 'Flex Space', image: '/photos/nc35-room.webp', stats: [['Desks', 'Flex · dedicated'], ['Day pass', 'from ₫130k'], ['Hours', '08:00–19:00']] },
  ],
  vi: [
    { slug: 'quarter-house', name: 'The Quarter House', location: 'Hoàn Kiếm, Hà Nội', type: 'Nhà phố boutique', image: '/properties/quarter-house/qh-07.webp', stats: [['Số căn', '4'], ['Lấp đầy', '95%'], ['Giá thuê TB', '$4,000/tháng']] },
    { href: '/locations/ttt-f19', name: 'Tầng 19 · 4 Tôn Thất Tùng', location: 'Kim Liên, Đống Đa, Hà Nội', type: 'Sàn riêng', image: '/photos/f19-window.webp', stats: [['Tầng', '19'], ['Cho thuê', '1 khách'], ['Quy mô', '20–60 người']] },
    { href: '/locations/ttt-f17', name: 'Tầng 17 · 4 Tôn Thất Tùng', location: 'Kim Liên, Đống Đa, Hà Nội', type: 'Sàn riêng', image: '/photos/f15-office-hi11.webp', stats: [['Khu', '2'], ['Khu 17B', 'Đã thuê'], ['Khu 17A', 'Còn trống']] },
    { href: '/locations/ttt-f15', name: 'Tầng 15 · 4 Tôn Thất Tùng', location: 'Kim Liên, Đống Đa, Hà Nội', type: 'Premium Workspace', image: '/photos/f15-lounge-cabin.webp', stats: [['Văn phòng', '2–12 người'], ['Phòng họp', '4–12 người'], ['Giờ mở cửa', '08:00–20:00']] },
    { href: '/locations/nha-chung', name: '35 Nhà Chung', location: 'Hoàn Kiếm, Hà Nội', type: 'Không gian linh hoạt', image: '/photos/nc35-room.webp', stats: [['Chỗ ngồi', 'Flex · cố định'], ['Theo ngày', 'từ ₫130k'], ['Giờ mở cửa', '08:00–19:00']] },
  ],
};
