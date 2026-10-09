// Facts shared by every page. Values match hilink.vn (src/data/contact.js and
// the legal pages there) — change them there and here together.

export type Lang = 'en' | 'vi';
export type Bi = { en: string; vi: string };

export const CONTACT = {
  phone: '(+84) 24 2202 9000',
  phoneHref: 'tel:+842422029000',
  email: 'contact@hilink.vn',
  emailHref: 'mailto:contact@hilink.vn',
  address: {
    en: 'Floor 7, 60 Ly Thai To, Hoan Kiem, Ha Noi, Viet Nam',
    vi: 'Tầng 7, 60 Lý Thái Tổ, Hoàn Kiếm, Hà Nội, Việt Nam',
  },
};

export const COMPANY = {
  name: { en: 'HiLink Vietnam Joint Stock Company', vi: 'Công ty Cổ phần HiLink Việt Nam' },
  enterpriseCode: '0109622778',
  registeredAddress: {
    en: 'No. 4 Ton That Tung, Trung Tu Ward, Dong Da District, Hanoi, Vietnam',
    vi: 'Số 4 Tôn Thất Tùng, phường Trung Tự, quận Đống Đa, Hà Nội, Việt Nam',
  },
};

export const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/hilink-viet-nam/' },
  { label: 'Instagram', href: 'https://www.instagram.com/hilinkworkspace/' },
  { label: 'Facebook', href: 'https://www.facebook.com/HiLinkWorkspaceSolutions' },
];

// HiLink Workspaces runs its own site (locations, live prices, SmartOS
// booking, forum). This site links there instead of copying data that changes
// daily. Production deployment of the workspace site; switch to the final
// domain (hilink.vn) here once it points at that deployment.
export const WORKSPACE_SITE = 'https://hilink-wsp-2408.vercel.app';
export const BUSINESS_CLUB_SITE = 'https://businessclub.hilink.vn';

export const ws = (lang: Lang, path = '') => `${WORKSPACE_SITE}/${lang}${path}`;

// Workspace solutions, slugs as on hilink.vn/solutions/:slug.
export const WORKSPACE_SOLUTIONS: { slug: string; t: Bi; d: Bi; photo: string; path?: string }[] = [
  {
    slug: 'private-workspaces',
    t: { en: 'Private Workspaces', vi: 'Văn phòng riêng' },
    d: {
      en: 'Lockable, fitted offices for 2–12 people on Floor 15 at 4 Ton That Tung.',
      vi: 'Văn phòng có khoá, đủ nội thất cho 2–12 người ở tầng 15, 4 Tôn Thất Tùng.',
    },
    photo: '/photos/f15-office-hi08.webp',
  },
  {
    slug: 'hybrid-work',
    t: { en: 'Hybrid Work', vi: 'Làm việc linh hoạt' },
    d: {
      en: 'Desks in HiLink lounges — take any open desk, or keep the same seat.',
      vi: 'Chỗ ngồi trong lounge HiLink — ngồi chỗ trống bất kỳ hoặc giữ chỗ cố định.',
    },
    photo: '/photos/f15-lounge.webp',
  },
  {
    slug: 'e-office',
    t: { en: 'E-office', vi: 'E-office' },
    d: {
      en: 'A registered business address at 60 Ly Thai To or 35 Nha Chung, with mail and calls handled.',
      vi: 'Địa chỉ đăng ký kinh doanh tại 60 Lý Thái Tổ hoặc 35 Nhà Chung, có người nhận thư và nghe máy.',
    },
    photo: '/photos/hbc-reception.webp',
  },
  {
    slug: 'corporate-suites',
    t: { en: 'Meeting & Event Space', vi: 'Phòng họp & sự kiện' },
    d: {
      en: 'Meeting rooms for 4–12 people by the hour, and whole lounges for events.',
      vi: 'Phòng họp cho 4–12 người theo giờ, và cả lounge cho sự kiện.',
    },
    photo: '/photos/f15-meeting-pod.webp',
  },
  {
    slug: 'business-club',
    path: '/business-club',
    t: { en: 'Business Club', vi: 'Business Club' },
    d: {
      en: "The members' club at 60 Ly Thai To — lounges, meeting rooms and events for Hanoi's business community.",
      vi: 'Câu lạc bộ thành viên tại 60 Lý Thái Tổ — lounge, phòng họp và sự kiện cho cộng đồng doanh nhân Hà Nội.',
    },
    photo: '/photos/hbc-lounge.webp',
  },
  {
    slug: 'enterprise',
    t: { en: 'Enterprise Solutions', vi: 'Giải pháp doanh nghiệp' },
    d: {
      en: 'Whole floors at 4 Ton That Tung, fitted out to your brief and run by HiLink.',
      vi: 'Nguyên sàn tại 4 Tôn Thất Tùng, hoàn thiện theo yêu cầu và do HiLink vận hành.',
    },
    photo: '/photos/f19-window.webp',
  },
];

export const wsSolutionUrl = (lang: Lang, s: { slug: string; path?: string }) =>
  ws(lang, s.path ?? `/solutions/${s.slug}`);

// Logos supplied by HiLink (same files as hilink.vn/public/partners).
export const PARTNERS = [
  { id: 'fedex', name: 'FedEx', src: '/partners/fedex.webp', w: 430, h: 132 },
  { id: 'lianlian', name: 'LianLian Global', src: '/partners/lianlian.webp', w: 480, h: 52 },
  { id: 'kosaido', name: 'Kosaido HR Vietnam', src: '/partners/kosaido.webp', w: 480, h: 60 },
  { id: 'wts', name: 'WTS Vietnam', src: '/partners/wts.webp', w: 480, h: 84 },
  { id: 'gp', name: 'Grünkorn & Partner', src: '/partners/gp.webp', w: 396, h: 132 },
  { id: 'viven', name: 'Viven', src: '/partners/viven.webp', w: 480, h: 89 },
  { id: 'hicorp', name: 'HiCorp', src: '/partners/hicorp.webp', w: 373, h: 132 },
  { id: 'hifund', name: 'HiFund', src: '/partners/hifund.webp', w: 393, h: 132 },
  { id: 'hiwise', name: 'HiWise', src: '/partners/hiwise.webp', w: 400, h: 132 },
];

// The service lines of this site, in menu order. `t` is the one name each
// service goes by everywhere — header, footer, home, forms.
export const SERVICES: { path: string; t: Bi; d: Bi; photo: string }[] = [
  {
    path: '/property-management',
    t: { en: 'Property Management', vi: 'Quản lý bất động sản' },
    d: {
      en: 'Supporting the management and performance of properties and assets.',
      vi: 'Hỗ trợ quản lý và nâng cao hiệu quả của bất động sản và tài sản.',
    },
    photo: '/photos/f19-window.webp',
  },
  {
    path: '/workspace-leasing',
    t: { en: 'Workspace Leasing', vi: 'Cho thuê văn phòng' },
    d: {
      en: 'Workspace solutions designed around the different ways businesses work.',
      vi: 'Giải pháp không gian làm việc thiết kế quanh những cách làm việc khác nhau của doanh nghiệp.',
    },
    photo: '/photos/f15-reception.webp',
  },
  {
    path: '/business-services',
    t: { en: 'Business Services', vi: 'Dịch vụ doanh nghiệp' },
    d: {
      en: 'Supporting the operational needs around your business.',
      vi: 'Hỗ trợ những nhu cầu vận hành xoay quanh doanh nghiệp của bạn.',
    },
    photo: '/photos/hbc-client-meeting.webp',
  },
  {
    path: '/concierge-services',
    t: { en: 'Concierge Services', vi: 'Dịch vụ concierge' },
    d: {
      en: 'Day-to-day support for members, tenants and their guests.',
      vi: 'Hỗ trợ hằng ngày cho thành viên, khách thuê và khách của họ.',
    },
    photo: '/photos/hbc-host.webp',
  },
  {
    path: '/industrial-logistics',
    t: { en: 'Industrial & Logistics', vi: 'Công nghiệp & logistics' },
    d: {
      en: 'Warehouse and factory space, from site search to day-to-day operations.',
      vi: 'Kho bãi và nhà xưởng, từ tìm địa điểm đến vận hành hằng ngày.',
    },
    // No HiLink photograph of an industrial site yet — cards render as type only.
    photo: '',
  },
];

export const pick = (v: Bi, lang: Lang) => v[lang];
