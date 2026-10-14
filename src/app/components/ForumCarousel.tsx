// "What's happening" — the latest posts from the HiLink forum, set out to the
// proportions of the carousel on stripe.com (measured at 1440: one photograph
// 799px wide, then 194, 96 and 48, 16px apart, 460px tall): the chosen post
// leads on the left and the next ones follow, each half as wide as the one
// before. The chosen post's title and a button to read it sit on its
// photograph; every photograph carries the HiLink mark, in white, at its foot
// on the left. The posts live on the HiLink Workspaces site, so every link
// goes there.
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import { POSTS } from '../data/posts';
import { ws } from '../data/site';
import { useLang } from '../lib/i18n';
import { Flag } from './Flag';
import { photo } from '../lib/photo';

const T = {
  en: { eyebrow: 'HiLink Forum', title: "What's happening.", sub: 'See the latest from HiLink.', read: 'Read article', all: 'Visit the forum', prev: 'Previous post', next: 'Next post', show: 'Show post' },
  vi: { eyebrow: 'Diễn đàn HiLink', title: 'Có gì mới.', sub: 'Tin mới nhất từ HiLink.', read: 'Đọc bài viết', all: 'Vào diễn đàn', prev: 'Bài trước', next: 'Bài sau', show: 'Xem bài' },
};

const CATEGORY: Record<string, { en: string; vi: string }> = {
  Guide: { en: 'Guide', vi: 'Cẩm nang' },
  Design: { en: 'Design', vi: 'Thiết kế' },
  Neighbourhood: { en: 'Neighbourhood', vi: 'Khu vực' },
};

// How wide each slide is, by its place after the chosen one (share of the row);
// the chosen one takes what is left. Beyond these, slivers of 8px.
const WIDTHS = [0, 0.1575, 0.078, 0.039];

export function ForumCarousel() {
  const { lang } = useLang();
  const t = T[lang];
  const [active, setActive] = useState(0);
  const touch = useRef<number | null>(null);
  const n = POSTS.length;
  const go = (i: number) => setActive((i + n) % n);
  const post = POSTS[active];

  return (
    <section className="py-24 lg:py-32 bg-white text-[#2A2623]" aria-roledescription="carousel" aria-label={t.eyebrow}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 inline-flex items-center gap-2.5">
              <Flag /> {t.eyebrow}
            </p>
            <h2 className="serif leading-[1.05]">
              {t.title} <span className="text-[#6B645D]">{t.sub}</span>
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={ws(lang, '/forum')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] text-[#2A2623] hover:text-[#D12126] transition-colors"
            >
              {t.all} <ArrowUpRight size={14} />
            </a>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(active - 1)} aria-label={t.prev} className="grid h-11 w-11 place-items-center rounded-full border border-[#2A2623]/15 hover:border-[#D12126] hover:text-[#D12126] transition-colors">
                <ArrowLeft size={16} />
              </button>
              <button type="button" onClick={() => go(active + 1)} aria-label={t.next} className="grid h-11 w-11 place-items-center rounded-full border border-[#2A2623]/15 hover:border-[#D12126] hover:text-[#D12126] transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* The row: the chosen post first, the rest after it in turn. */}
        <div
          className="hl-squeeze flex h-[clamp(320px,32vw,460px)]"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
          }}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touch.current == null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
            touch.current = null;
          }}
        >
          {POSTS.map((p, i) => {
            const at = (i - active + n) % n, on = at === 0;
            const share = WIDTHS[at];
            const style = on
              ? { order: 0, flex: '1 1 0%' }
              : { order: at, flex: `0 0 ${share !== undefined ? `${share * 100}%` : '8px'}`, marginLeft: at <= 3 ? 'var(--sq-gap)' : 'calc(var(--sq-gap) / 2)' };
            const inner = (
              <>
                <img
                  {...photo(p.photo, on ? '(min-width: 1024px) 860px, 90vw' : '(min-width: 1024px) 200px, 30vw')}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${on ? 'scale-100' : 'scale-110 group-hover:scale-105'}`}
                />
                <span className={`absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
                <span className={`absolute inset-0 bg-[#2A2623] transition-opacity duration-500 ${on ? 'opacity-0' : 'opacity-15 group-hover:opacity-0'}`} aria-hidden="true" />
                {/* the mark, white, at the foot on the left of every photograph wide enough to hold it */}
                {at <= 2 && <img src="/brand/logo-hilink-lockup.svg" alt="" aria-hidden="true" className={`absolute bottom-4 left-4 w-auto [filter:brightness(0)_invert(1)] opacity-90 ${on ? "h-6 lg:bottom-6 lg:left-6 lg:h-8" : "h-4 lg:h-5"}`} />}
              </>
            );
            return on ? (
              <article key={p.slug} className="relative min-w-0 overflow-hidden rounded-[6px] bg-[#F4F0EA] text-white" style={style}>
                {inner}
                <span className="absolute left-4 top-4 lg:left-6 lg:top-6 hidden sm:inline-block rounded-full bg-white/90 px-3 py-1 text-[12px] uppercase tracking-[0.18em] text-[#2A2623]">
                  {CATEGORY[p.category]?.[lang] ?? p.category}
                </span>
                <div key={active} className="absolute inset-x-4 bottom-14 lg:inset-x-6 lg:bottom-20 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-[hl-fade-up_0.5s_ease_both]">
                  <h3 className="serif hl-post-title max-w-[22ch] line-clamp-4 text-white">{p.title[lang]}</h3>
                  <a
                    href={ws(lang, `/forum/${p.slug}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/read shrink-0 inline-flex w-fit items-center gap-1 rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-[#2A2623] hover:bg-[#F8F6F1] transition-colors"
                  >
                    {t.read}
                    <ChevronRight size={16} className="transition-transform group-hover/read:translate-x-0.5" />
                  </a>
                </div>
              </article>
            ) : (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${t.show}: ${p.title[lang]}`}
                className="group relative min-w-0 overflow-hidden rounded-[6px] bg-[#F4F0EA] cursor-pointer"
                style={style}
              >
                {inner}
              </button>
            );
          })}
        </div>

        {/* What the chosen post is about. */}
        <p key={active} className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[#6B645D] animate-[hl-fade-up_0.5s_ease_both]" aria-live="polite">
          {post.excerpt[lang]}
        </p>
        <a
          href={ws(lang, '/forum')}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden mt-6 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] text-[#2A2623]"
        >
          {t.all} <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
