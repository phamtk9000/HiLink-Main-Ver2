// "What's happening" — the latest posts from the HiLink forum, laid out like
// the Stripe homepage carousel: one wide photo and the rest squeezed narrow,
// with the chosen post's title and a button to read it underneath. The posts
// live on the HiLink Workspaces site, so every link goes there.
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import { POSTS } from '../data/posts';
import { ws } from '../data/site';
import { useLang } from '../lib/i18n';
import { Flag } from './Flag';

const T = {
  en: { eyebrow: 'HiLink Forum', title: "What's happening.", sub: 'See the latest from HiLink.', read: 'Read article', all: 'Visit the forum', prev: 'Previous post', next: 'Next post', show: 'Show post' },
  vi: { eyebrow: 'Diễn đàn HiLink', title: 'Có gì mới.', sub: 'Tin mới nhất từ HiLink.', read: 'Đọc bài viết', all: 'Vào diễn đàn', prev: 'Bài trước', next: 'Bài sau', show: 'Xem bài' },
};

const CATEGORY: Record<string, { en: string; vi: string }> = {
  Guide: { en: 'Guide', vi: 'Cẩm nang' },
  Design: { en: 'Design', vi: 'Thiết kế' },
  Neighbourhood: { en: 'Neighbourhood', vi: 'Khu vực' },
};

// How wide each slide is, by distance from the active one.
const GROW = [6, 1.1, 0.8, 0.6];

export function ForumCarousel() {
  const { lang } = useLang();
  const t = T[lang];
  const [active, setActive] = useState(0);
  const touch = useRef<number | null>(null);
  const n = POSTS.length;
  const go = (i: number) => setActive((i + n) % n);
  const post = POSTS[active];
  const href = ws(lang, `/forum/${post.slug}`);

  return (
    <section className="py-24 lg:py-32 bg-white text-[#2A2623]" aria-roledescription="carousel" aria-label={t.eyebrow}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-5 inline-flex items-center gap-2.5">
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
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#2A2623] hover:text-[#D12126] transition-colors"
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

        {/* The squeeze. */}
        <div
          className="hl-squeeze flex gap-2 h-[220px] sm:h-[300px] lg:h-[380px]"
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
            const on = i === active;
            const dist = Math.min(Math.abs(i - active), GROW.length - 1);
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${t.show}: ${p.title[lang]}`}
                aria-current={on}
                className={`group relative min-w-0 basis-0 overflow-hidden rounded-lg bg-[#F4F0EA] ${on ? '' : 'cursor-pointer'}`}
                style={{ flexGrow: GROW[dist] }}
              >
                <img
                  src={p.photo}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${on ? 'scale-100' : 'scale-110 group-hover:scale-105'}`}
                />
                <span className={`absolute inset-0 bg-[#2A2623] transition-opacity duration-500 ${on ? 'opacity-0' : 'opacity-25 group-hover:opacity-10'}`} />
                <span className={`absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#2A2623] transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}>
                  {CATEGORY[p.category]?.[lang] ?? p.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* The chosen post. */}
        <div className="mt-5 flex flex-col md:flex-row md:items-start md:justify-between gap-6" aria-live="polite">
          <p key={active} className="max-w-3xl text-[15px] leading-relaxed animate-[hl-fade-up_0.5s_ease_both]">
            <span className="font-semibold">{post.title[lang]}</span>{' '}
            <span className="text-[#6B645D]">{post.excerpt[lang]}</span>
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 self-start rounded-full border border-[#2A2623]/20 px-5 py-2.5 text-[14px] font-medium hover:border-[#D12126] hover:text-[#D12126] transition-colors group"
          >
            {t.read}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <a
          href={ws(lang, '/forum')}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden mt-6 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#2A2623]"
        >
          {t.all} <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
