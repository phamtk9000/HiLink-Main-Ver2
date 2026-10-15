// One article of the HiLink forum, set out like a magazine feature: the
// section and a large title, a standfirst in the serif, the byline between
// hairlines; the photograph nearly the width of the page (with the HiLink
// mark at its foot, as on every post photograph); then the text in a narrow
// column with a drop capital, beside a column that keeps the section, date,
// reading time and a way to copy the link in view; photographs in the text
// carry their caption beneath; more from the same section at the end.
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Check, Link2 } from 'lucide-react';
import { FORUM_CATEGORIES, FORUM_POSTS } from '../data/forum';
import { useLang, usePageMeta } from '../lib/i18n';
import { photo } from '../lib/photo';
import { postDate } from './ForumPage';
import { NotFoundPage } from './NotFoundPage';

const T = {
  en: { back: 'HiLink Forum', min: 'min read', more: 'More from', by: 'By HiLink', section: 'Section', published: 'Published', reading: 'Reading time', copy: 'Copy link', copied: 'Link copied' },
  vi: { back: 'Diễn đàn HiLink', min: 'phút đọc', more: 'Thêm từ mục', by: 'Bởi HiLink', section: 'Chuyên mục', published: 'Ngày đăng', reading: 'Thời gian đọc', copy: 'Sao chép liên kết', copied: 'Đã sao chép' },
};

export function ForumPostPage() {
  const { slug } = useParams();
  const { lang, l } = useLang();
  const t = T[lang];
  const [copied, setCopied] = useState(false);
  const post = FORUM_POSTS.find((p) => p.slug === slug);
  usePageMeta(post ? post.title[lang] : t.back, post?.excerpt[lang]);
  if (!post) return <NotFoundPage />;
  const cat = FORUM_CATEGORIES.find((c) => c.id === post.category)!;
  const more = FORUM_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);
  const firstP = post.blocks.findIndex((b) => b.type === 'p');
  const copy = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 2200); }).catch(() => {});
  };
  const metaLbl = 'text-[11px] uppercase tracking-[0.18em] text-[#6B645D]';

  return (
    <>
      <article className="bg-white pb-20 lg:pb-28">
        <header className="max-w-[1180px] mx-auto px-6 lg:px-12 pt-12 lg:pt-16">
          <Link to={l('/forum')} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#6B645D] hover:text-[#D12126] transition-colors">
            <ArrowLeft size={14} /> {t.back}
          </Link>
          <p className="mt-12 lg:mt-16 text-[12px] uppercase tracking-[0.22em] text-[#D12126]">
            <Link to={l(`/forum#${cat.id.toLowerCase()}`)} className="hover:underline underline-offset-4">{cat[lang]}</Link>
          </p>
          <h1 className="serif hl-article-title mt-5 max-w-[18ch] text-[#2A2623]">{post.title[lang]}</h1>
          <p className="serif mt-7 max-w-[40ch] text-[1.3rem] leading-[1.45] text-[#4A443F] lg:text-[1.55rem]">{post.excerpt[lang]}</p>
          <p className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-1 border-y border-[#2A2623]/15 py-4 text-[13px] text-[#6B645D]">
            <span className="font-medium text-[#2A2623]">{t.by}</span>
            <span>{postDate(post.date, lang)}</span>
            <span>{post.minutes} {t.min}</span>
          </p>
        </header>

        <figure className="relative max-w-[1440px] mx-auto mt-10 lg:mt-14 lg:px-12">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#F4F0EA] sm:aspect-[16/9] lg:aspect-[2/1]">
            <img {...photo(post.image, '(min-width: 1440px) 1344px, 100vw')} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <img src="/brand/logo-hilink-lockup.svg" alt="" aria-hidden="true" className="absolute bottom-5 left-5 lg:bottom-8 lg:left-8 h-10 lg:h-14 w-auto [filter:brightness(0)_invert(1)] opacity-95" />
          </div>
        </figure>

        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 mt-14 lg:mt-20 [display:grid] lg:grid-cols-12 lg:gap-x-12">
          {/* What the article is, kept in view beside the text on wide screens. */}
          <aside className="hidden lg:block lg:col-span-3">
            <dl className="sticky top-[110px] space-y-6 border-t border-[#2A2623] pt-5">
              <div><dt className={metaLbl}>{t.section}</dt><dd className="mt-1.5 text-[15px] text-[#2A2623]">{cat[lang]}</dd></div>
              <div><dt className={metaLbl}>{t.published}</dt><dd className="mt-1.5 text-[15px] text-[#2A2623]">{postDate(post.date, lang)}</dd></div>
              <div><dt className={metaLbl}>{t.reading}</dt><dd className="mt-1.5 text-[15px] text-[#2A2623]">{post.minutes} {t.min}</dd></div>
              <div>
                <button type="button" onClick={copy} className="inline-flex items-center gap-2 text-[13px] text-[#2A2623] hover:text-[#D12126] transition-colors" aria-live="polite">
                  {copied ? <Check size={15} /> : <Link2 size={15} />} {copied ? t.copied : t.copy}
                </button>
              </div>
            </dl>
          </aside>

          <div className="min-w-0 lg:col-span-7">
            {post.blocks.map((b, k) => {
              if (b.type === 'h2') return <h2 key={k} className="serif hl-forum-h2 mt-14 text-[#2A2623]">{b[lang]}</h2>;
              if (b.type === 'img') return (
                <figure key={k} className="my-12">
                  <img {...photo(b.src, '(min-width: 1024px) 640px, 100vw')} alt={b.alt[lang]} loading="lazy" decoding="async" className="w-full" />
                  <figcaption className="mt-3 border-l-2 border-[#D12126] pl-3 text-[13px] leading-snug text-[#6B645D]">{b.alt[lang]}</figcaption>
                </figure>
              );
              // A lead-in that ends a sentence runs into the paragraph; one that
              // names a thing ("Coworking space") stands on its own line above it.
              const lead = b.lead?.[lang], runIn = !!lead && /[.:!?]$/.test(lead);
              return (
                <p key={k} className={`mt-6 text-[17px] leading-[1.85] text-[#2A2623] lg:text-[18px] ${k === firstP ? 'hl-dropcap' : ''}`}>
                  {lead && <strong className={`font-semibold ${runIn ? '' : 'block'}`}>{lead}{runIn ? ' ' : ''}</strong>}{b[lang]}
                </p>
              );
            })}
            <p className="mt-14 flex items-center gap-3 text-[13px] text-[#6B645D]">
              <span className="h-px w-10 bg-[#2A2623]/30" aria-hidden="true" /> HiLink · {cat[lang]}
            </p>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-[#F8F6F1] py-16 lg:py-20" aria-labelledby="forum-more">
          <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
            <div className="flex items-baseline justify-between gap-6 border-b-2 border-[#2A2623] pb-2.5">
              <h2 id="forum-more" className="hl-forum-section text-[#2A2623]">{t.more} {cat[lang]}</h2>
              <Link to={l('/forum')} className="text-[13px] text-[#6B645D] hover:text-[#D12126]">{t.back}</Link>
            </div>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link to={l(`/forum/${p.slug}`)} className="group block">
                    <span className="relative block aspect-[4/3] overflow-hidden bg-[#EDE7DF]">
                      <img {...photo(p.image, '(min-width: 1024px) 360px, 90vw')} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                      <img src="/brand/logo-hilink-lockup.svg" alt="" aria-hidden="true" className="absolute bottom-3 left-3 h-6 w-auto [filter:brightness(0)_invert(1)] opacity-90" />
                    </span>
                    <span className="serif mt-4 block text-[1.25rem] leading-[1.3] text-[#2A2623] transition-colors group-hover:text-[#D12126]">{p.title[lang]}</span>
                    <span className="mt-2 block text-[12px] text-[#6B645D]">{postDate(p.date, lang)} · {p.minutes} {t.min}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
