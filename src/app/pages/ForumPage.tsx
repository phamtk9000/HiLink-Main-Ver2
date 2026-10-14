// The HiLink forum, set out like a Dwell collection page (dwell.com): on the
// left a signature cover that stays in view — a photograph hung on a wall of
// HiLink's own wallpaper (linked rings, the "link" in the name), with the
// masthead above; on the right the title, a line, a bar of the sections
// (after the quick nav on Solutions: a glyph over each name and how many
// stories it holds, the one being read underlined in red; it stays under the
// header on wide screens), and the stories, each section on its own under a
// ruled heading: a photograph, a title, a line and a byline.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { FORUM_CATEGORIES, FORUM_POSTS } from '../data/forum';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { ClipboardList, DraftingCompass, Handshake, MapPin } from '../components/Glyph';
import { photo } from '../lib/photo';

const T = {
  en: {
    meta: 'Guides, design notes and neighbourhood stories from HiLink workspaces in Hanoi.',
    eyebrow: 'HiLink Forum', title: 'Insights on workspace, Hanoi and how teams work',
    lead: 'Guides, design notes and stories from the HiLink workspaces.',
    stories: 'stories', story: 'story', sections: 'Forum sections', min: 'min read', coverAlt: 'The lounge at the HiLink Business Club',
  },
  vi: {
    meta: 'Cẩm nang, câu chuyện thiết kế và khu phố từ các không gian HiLink tại Hà Nội.',
    eyebrow: 'Diễn đàn HiLink', title: 'Góc nhìn về không gian làm việc, Hà Nội và cách đội ngũ làm việc',
    lead: 'Cẩm nang, câu chuyện thiết kế và khu phố từ các không gian HiLink.',
    stories: 'bài viết', story: 'bài viết', sections: 'Các mục của diễn đàn', min: 'phút đọc', coverAlt: 'Lounge tại HiLink Business Club',
  },
};

// One glyph per section, by what it is about: a handbook, the shape of a
// space, a place, and HiLink's linked rings for its own services.
const ICONS = { Guide: ClipboardList, Design: DraftingCompass, Neighbourhood: MapPin, Services: Handshake };

export const postDate = (iso: string, lang: 'en' | 'vi') =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: lang === 'vi' ? '2-digit' : 'short', year: 'numeric' });

// The wallpaper: rings linked in pairs, with a small diamond between rows.
const WALLPAPER = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">'
  + '<g stroke="#F06A6E" stroke-opacity=".32" stroke-width="1"><circle cx="24" cy="18" r="9"/><circle cx="36" cy="18" r="9"/></g>'
  + '<path d="M32 44l4 4-4 4-4-4z" fill="#F06A6E" fill-opacity=".28"/>'
  + '<path d="M0 50l2 2-2 2M64 50l-2 2 2 2" stroke="#F06A6E" stroke-opacity=".2"/></svg>',
)}")`;

/** The signature cover: masthead, a framed photograph on HiLink's wallpaper, and the sections as cover lines. */
function Cover({ lang, count }: { lang: 'en' | 'vi'; count: number }) {
  const t = T[lang];
  return (
    <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-[#361716] text-[#F8F6F1]" style={{ backgroundImage: WALLPAPER, backgroundSize: '64px 64px' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_35%,rgba(27,20,18,0.55)_100%)]" aria-hidden="true" />
      <div className="relative flex h-full flex-col p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <p className="serif text-[3.25rem] lg:text-[3.75rem] leading-[0.9] tracking-[-0.01em]">HiLink</p>
          <ul className="pt-2 text-right text-[10px] uppercase leading-[1.6] tracking-[0.16em] text-[#F8F6F1]/80">
            {FORUM_CATEGORIES.map((c) => <li key={c.id}>{c[lang]}</li>)}
          </ul>
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#F06A6E]">{t.eyebrow}</p>
        {/* the photograph, hung on the wall in an arched frame */}
        <div className="relative mx-auto mt-6 w-[68%] flex-1 min-h-0">
          <div className="absolute inset-0 overflow-hidden rounded-t-[999px] border border-[#F8F6F1]/60 p-[6px]">
            <div className="h-full w-full overflow-hidden rounded-t-[999px]">
              <img {...photo('/photos/hbc-lounge-3.webp', '(min-width: 1024px) 260px, 60vw')} alt={t.coverAlt} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <p className="serif text-[1.6rem] lg:text-[1.8rem] italic leading-none">{lang === 'vi' ? 'Diễn đàn' : 'Forum'}</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#F8F6F1]/80">{count} {t.stories}</p>
        </div>
      </div>
    </div>
  );
}

export function ForumPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);
  // The section being read: the last whose heading has passed 40% of the screen.
  const [active, setActive] = useState(-1);
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = list.current;
    if (!root) return undefined;
    const marks = [...root.querySelectorAll<HTMLElement>('section[id]')];
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let at = -1;
      marks.forEach((m, k) => { if (m.getBoundingClientRect().top < line) at = k; });
      setActive(at);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section className="bg-white pt-12 pb-24 lg:pt-16 lg:pb-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-x-14 gap-y-12">
        <div className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-[100px]">
            <Cover lang={lang} count={FORUM_POSTS.length} />
          </div>
        </div>

        <div ref={list} className="min-w-0 lg:col-span-8">
          <p className="mb-5 flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#D12126]"><Flag /> {t.eyebrow}</p>
          <h1 className="serif hl-forum-title text-[#2A2623]">{t.title}</h1>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.7] text-[#4A443F]">{t.lead}</p>
          <nav aria-label={t.sections} className="z-30 mt-9 -mx-6 border-y border-[#2A2623]/12 bg-[#F8F6F1] sm:mx-0 lg:sticky lg:top-[76px]">
            <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FORUM_CATEGORIES.map((c, k) => {
                const Icon = ICONS[c.id], count = FORUM_POSTS.filter((p) => p.category === c.id).length, on = k === active;
                return (
                  <a
                    key={c.id}
                    href={`#${c.id.toLowerCase()}`}
                    aria-current={on ? 'true' : undefined}
                    className={`group relative flex min-w-[8.5rem] flex-1 flex-col items-center gap-2 px-4 pb-4 pt-5 text-center transition-colors duration-300 ${on ? 'text-[#D12126]' : 'text-[#4A443F] hover:text-[#2A2623]'}`}
                  >
                    <Icon size={26} strokeWidth={1.3} />
                    <span className={`whitespace-nowrap text-[15px] font-medium leading-[1.3] ${on ? 'text-[#2A2623]' : ''}`}>{c[lang]}</span>
                    <span className="text-[12px] leading-none text-[#6B645D]">{count} {count === 1 ? t.story : t.stories}</span>
                    <span className={`absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-[#D12126] transition-transform duration-500 ease-out ${on ? 'scale-x-100' : 'scale-x-0'}`} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </nav>

          {FORUM_CATEGORIES.map((c) => {
            const posts = FORUM_POSTS.filter((p) => p.category === c.id);
            if (!posts.length) return null;
            return (
              <section key={c.id} id={c.id.toLowerCase()} className="mt-14 lg:mt-16 scroll-mt-28 lg:scroll-mt-[210px]" aria-labelledby={`forum-${c.id}`}>
                <div className="flex items-baseline justify-between gap-6 border-b-2 border-[#2A2623] pb-2.5">
                  <h2 id={`forum-${c.id}`} className="hl-forum-section text-[#2A2623]">{c[lang]}</h2>
                  <p className="hidden sm:block text-[13px] text-[#6B645D]">{c.lead[lang]}</p>
                </div>
                <ul>
                  {posts.map((p) => (
                    <li key={p.slug} className="border-b border-[#2A2623]/12 last:border-b-0">
                      <Link to={l(`/forum/${p.slug}`)} className="group grid grid-cols-[112px_1fr] sm:grid-cols-[220px_1fr] gap-5 sm:gap-8 py-6 lg:py-7">
                        <span className="relative block aspect-[4/3] overflow-hidden bg-[#F4F0EA]">
                          <img {...photo(p.image, '(min-width: 640px) 220px, 112px')} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                          <img src="/brand/logo-hilink-lockup.svg" alt="" aria-hidden="true" className="absolute bottom-2 left-2 h-4 sm:h-5 w-auto [filter:brightness(0)_invert(1)] opacity-90" />
                        </span>
                        <span className="min-w-0">
                          <span className="serif block text-[1.15rem] sm:text-[1.4rem] leading-[1.25] text-[#2A2623] transition-colors group-hover:text-[#D12126]">{p.title[lang]}</span>
                          <span className="mt-2 hidden sm:block text-[15px] leading-[1.6] text-[#4A443F]">{p.excerpt[lang]}</span>
                          <span className="mt-2.5 block text-[12px] text-[#6B645D]">HiLink · {postDate(p.date, lang)} · {p.minutes} {t.min}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
