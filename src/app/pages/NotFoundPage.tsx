// Page not found. In HiLink's own voice — the name is about links, so a lost
// page is a link come loose (two rings drifting apart) — said kindly, with a
// clear way out: a button home, a search of the site's pages, and below,
// after designhotels.com/404, six ways back in, each a tall photograph, a
// label and a sentence.
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, Search } from 'lucide-react';
import { useLang, usePageMeta } from '../lib/i18n';
import { photo } from '../lib/photo';

const WAYS = [
  { to: '/', image: '/photos/hbc-lounge.webp' },
  { to: '/solutions', image: '/photos/f15-office-hi11.webp' },
  { to: '/workspace-leasing', image: '/photos/f15-lounge-cabin.webp' },
  { to: '/business-club', image: '/photos/hbc-study.webp' },
  { to: '/forum', image: '/photos/nc35-room.webp' },
  { to: '/contact', image: '/photos/hbc-hostess.webp' },
];

// The pages a visitor can be sent to from here, with words to find them by.
const PAGES: { to: string; en: string; vi: string; keys: string }[] = [
  { to: '/', en: 'Home', vi: 'Trang chủ', keys: 'home trang chu hilink' },
  { to: '/about', en: 'About HiLink', vi: 'Về HiLink', keys: 'about gioi thieu cong ty company hicorp' },
  { to: '/solutions', en: 'Solutions', vi: 'Giải pháp', keys: 'solutions giai phap dich vu services' },
  { to: '/property-management', en: 'Property Management', vi: 'Quản lý bất động sản', keys: 'property management quan ly bat dong san cho thue rental landlord chu nha quarter house' },
  { to: '/workspace-leasing', en: 'Workspace Leasing', vi: 'Cho thuê văn phòng', keys: 'workspace office van phong coworking desk cho ngoi phong hop meeting e-office' },
  { to: '/business-services', en: 'Business Services', vi: 'Dịch vụ doanh nghiệp', keys: 'business services dich vu doanh nghiep thanh lap cong ty ke toan thue phap ly advisory' },
  { to: '/concierge-services', en: 'Concierge Services', vi: 'Dịch vụ concierge', keys: 'concierge le tan dat cho am thuc su kien travel' },
  { to: '/industrial-logistics', en: 'Industrial & Logistics', vi: 'Công nghiệp & logistics', keys: 'industrial logistics kho bai nha xuong warehouse factory' },
  { to: '/business-club', en: 'Business Club', vi: 'Business Club', keys: 'business club quarter club hoi vien membership lounge 60 ly thai to 204 tran quang khai' },
  { to: '/partners', en: 'Partners', vi: 'Đối tác', keys: 'partners doi tac hop tac' },
  { to: '/careers', en: 'Careers', vi: 'Tuyển dụng', keys: 'careers tuyen dung viec lam jobs' },
  { to: '/forum', en: 'Forum', vi: 'Diễn đàn', keys: 'forum dien dan news tin tuc blog bai viet cam nang' },
  { to: '/contact', en: 'Contact', vi: 'Liên hệ', keys: 'contact lien he hotline email dia chi' },
  { to: '/privacy-policy', en: 'Privacy Policy', vi: 'Chính sách bảo mật', keys: 'privacy chinh sach bao mat' },
  { to: '/terms', en: 'Terms', vi: 'Điều khoản', keys: 'terms dieu khoan' },
];
const plain = (v: string) => v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase();

const T = {
  en: {
    meta: 'Page Not Found',
    title: 'Looks like a link has come loose.',
    lead: "It's not you — this page has moved or no longer exists. Search for what you need, or head back home.",
    home: 'Back to home', contact: 'Contact us', search: 'Search the site', none: 'Nothing found — try another word.',
    go: 'Continue exploring',
    ways: [
      ['Homepage', 'Start again at the homepage for everything HiLink does.'],
      ['Solutions', 'Five solutions, one partner across the full property lifecycle.'],
      ['Workspace Leasing', 'Private offices, desks and meeting rooms at six addresses in central Hanoi.'],
      ['Business Club', 'A lounge for business people and their guests — to host, to meet, to work.'],
      ['Forum', 'Insights on workspace, Hanoi and how teams work.'],
      ['Contact', 'Tell us what you need and our team will come back to you.'],
    ],
  },
  vi: {
    meta: 'Không tìm thấy trang',
    title: 'Có vẻ một mắt xích vừa tuột mất.',
    lead: 'Không phải lỗi của bạn — trang này đã chuyển đi hoặc không còn nữa. Hãy tìm điều bạn cần, hoặc về trang chủ.',
    home: 'Về trang chủ', contact: 'Liên hệ', search: 'Tìm trên trang', none: 'Không thấy kết quả — thử một từ khác.',
    go: 'Tiếp tục khám phá',
    ways: [
      ['Trang chủ', 'Bắt đầu lại từ trang chủ để xem mọi điều HiLink đang làm.'],
      ['Giải pháp', 'Năm giải pháp, một đối tác suốt vòng đời bất động sản.'],
      ['Cho thuê văn phòng', 'Văn phòng riêng, chỗ ngồi và phòng họp tại sáu địa chỉ giữa trung tâm Hà Nội.'],
      ['Business Club', 'Không gian lounge cho doanh nhân và khách mời — tiếp khách, giao lưu, làm việc.'],
      ['Diễn đàn', 'Góc nhìn về không gian làm việc, Hà Nội và cách đội ngũ làm việc.'],
      ['Liên hệ', 'Cho chúng tôi biết nhu cầu của bạn, đội ngũ sẽ phản hồi sớm.'],
    ],
  },
};


export function NotFoundPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.meta);
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const found = useMemo(() => {
    const words = plain(q).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return PAGES.filter((p) => { const hay = plain(`${p.en} ${p.vi} ${p.keys}`); return words.every((w) => hay.includes(w)); }).slice(0, 6);
  }, [q]);

  return (
    <section className="bg-white pb-24 pt-16 lg:pb-32 lg:pt-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-[72px]">
        <div className="mx-auto max-w-[760px] text-center">
          {/* two rings, one drifting off: the link that came loose */}
          <svg viewBox="0 0 120 48" className="hl-loose mx-auto h-12 w-[120px] text-[#D12126]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="38" cy="24" r="18" />
            <circle className="hl-loose__ring" cx="70" cy="24" r="18" />
          </svg>
          <p className="mt-6 mb-5 text-[12px] uppercase tracking-[0.2em] text-[#D12126]">404</p>
          <h1 className="serif hl-notfound-title text-[#2A2623]">{t.title}</h1>
          <p className="mx-auto mt-6 max-w-[56ch] text-[1.0625rem] leading-[1.6] text-[#4A443F]">{t.lead}</p>

          <form
            role="search"
            className="relative mx-auto mt-10 max-w-[560px] text-left"
            onSubmit={(e) => { e.preventDefault(); if (found[0]) navigate(l(found[0].to)); }}
          >
            <label htmlFor="nf-search" className="sr-only">{t.search}</label>
            <Search size={18} className="pointer-events-none absolute left-5 top-[27px] -translate-y-1/2 text-[#6B645D]" aria-hidden="true" />
            <input
              id="nf-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.search}
              autoComplete="off"
              className="h-[54px] w-full rounded-full border border-[#2A2623]/20 bg-[#F8F6F1] pl-12 pr-5 text-[15px] text-[#2A2623] placeholder:text-[#6B645D] outline-none transition-colors focus:border-[#D12126] focus:ring-1 focus:ring-[#D12126]"
            />
            {q.trim() && (
              <ul className="mt-3 overflow-hidden rounded-[16px] border border-[#2A2623]/12 bg-white" aria-live="polite">
                {found.length ? found.map((p) => (
                  <li key={p.to} className="border-b border-[#2A2623]/8 last:border-b-0">
                    <Link to={l(p.to)} className="flex items-center justify-between px-5 py-3.5 text-[15px] text-[#2A2623] hover:bg-[#F8F6F1] hover:text-[#D12126] transition-colors">
                      {p[lang]} <ArrowRight size={15} className="shrink-0" />
                    </Link>
                  </li>
                )) : <li className="px-5 py-3.5 text-[14px] text-[#6B645D]">{t.none}</li>}
              </ul>
            )}
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to={l('/')} className="inline-flex items-center gap-2 bg-[#D12126] px-8 py-3.5 text-[12px] uppercase tracking-[0.18em] text-white hover:bg-[#A3181C] transition-colors">{t.home}</Link>
            <Link to={l('/contact')} className="inline-flex items-center gap-2 border border-[#2A2623]/30 px-8 py-3.5 text-[12px] uppercase tracking-[0.18em] text-[#2A2623] hover:border-[#2A2623] transition-colors">{t.contact}</Link>
          </div>

          <h2 className="serif hl-notfound-go mt-20 text-[#2A2623] lg:mt-24">{t.go}</h2>
        </div>
        <div data-reveal-group className="mt-10 grid gap-x-[51px] gap-y-14 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {WAYS.map((w, i) => (
            <Link key={w.to} to={l(w.to)} className="group block">
              <span className="relative block aspect-[4/5] overflow-hidden bg-[#EDE7DF]">
                <img loading={i < 3 ? 'eager' : 'lazy'} decoding="async" {...photo(w.image, '(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw')} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
              </span>
              <span className="mt-4 block text-[13px] font-semibold leading-[1.4] text-[#2A2623]">{t.ways[i][0]}</span>
              <span className="mt-2 block text-[1.125rem] leading-[1.4] text-[#2A2623] transition-colors group-hover:text-[#D12126] lg:text-[1.1875rem]">{t.ways[i][1]}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
