// Page not found, set out after designhotels.com/404: the news in a centred
// heading with a line beneath, then "continue" and six ways back in — each a
// tall photograph, a label and a sentence.
import { Link } from 'react-router';
import { useLang, usePageMeta } from '../lib/i18n';
import { photo } from '../lib/photo';

const WAYS = [
  { to: '/', image: '/photos/hbc-lounge.webp' },
  { to: '/solutions', image: '/photos/f15-office-hi11.webp' },
  { to: '/workspace-leasing', image: '/photos/f15-lounge-cabin.webp' },
  { to: '/business-club', image: '/photos/hbc-study.webp' },
  { to: '/news', image: '/photos/nc35-room.webp' },
  { to: '/contact', image: '/photos/hbc-hostess.webp' },
];

const T = {
  en: {
    meta: 'Page Not Found',
    title: 'The page you are looking for was not found',
    lead: 'Either the page does not exist or it has moved. To get back to HiLink — our solutions, workspaces and the people behind them — choose a picture below.',
    go: 'Continue exploring',
    ways: [
      ['Homepage', 'Start again at the homepage for everything HiLink does.'],
      ['Solutions', 'Five solutions, one partner across the full property lifecycle.'],
      ['Workspace Leasing', 'Private offices, desks and meeting rooms at six addresses in central Hanoi.'],
      ['Business Club', 'A lounge for business people and their guests — to host, to meet, to work.'],
      ['News', 'Insights on workspace, Hanoi and how teams work.'],
      ['Contact', 'Tell us what you need and our team will come back to you.'],
    ],
  },
  vi: {
    meta: 'Không tìm thấy trang',
    title: 'Không tìm thấy trang bạn đang tìm',
    lead: 'Trang này không tồn tại hoặc đã được chuyển đi. Để trở lại với HiLink — các giải pháp, không gian làm việc và đội ngũ phía sau — hãy chọn một hình bên dưới.',
    go: 'Tiếp tục khám phá',
    ways: [
      ['Trang chủ', 'Bắt đầu lại từ trang chủ để xem mọi điều HiLink đang làm.'],
      ['Giải pháp', 'Năm giải pháp, một đối tác suốt vòng đời bất động sản.'],
      ['Cho thuê văn phòng', 'Văn phòng riêng, chỗ ngồi và phòng họp tại sáu địa chỉ giữa trung tâm Hà Nội.'],
      ['Business Club', 'Không gian lounge cho doanh nhân và khách mời — tiếp khách, giao lưu, làm việc.'],
      ['Tin tức', 'Góc nhìn về không gian làm việc, Hà Nội và cách đội ngũ làm việc.'],
      ['Liên hệ', 'Cho chúng tôi biết nhu cầu của bạn, đội ngũ sẽ phản hồi sớm.'],
    ],
  },
};

export function NotFoundPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.meta);
  return (
    <section className="bg-white pb-24 pt-16 lg:pb-32 lg:pt-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-[72px]">
        <div className="mx-auto max-w-[850px] text-center">
          <p className="mb-6 text-[12px] uppercase tracking-[0.2em] text-[#D12126]">404</p>
          <h1 className="serif hl-notfound-title text-[#2A2623]">{t.title}</h1>
          <p className="mx-auto mt-8 max-w-[62ch] text-[1.125rem] leading-[1.55] text-[#4A443F] lg:text-[1.1875rem]">{t.lead}</p>
          <h2 className="serif hl-notfound-go mt-16 text-[#2A2623] lg:mt-20">{t.go}</h2>
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
