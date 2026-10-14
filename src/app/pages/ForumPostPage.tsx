// One article of the HiLink forum: the section and the title, a line, the
// byline; the photograph (with the HiLink mark at its foot, as on every post
// photograph); the text; and more from the same section.
import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { FORUM_CATEGORIES, FORUM_POSTS } from '../data/forum';
import { useLang, usePageMeta } from '../lib/i18n';
import { photo } from '../lib/photo';
import { postDate } from './ForumPage';
import { NotFoundPage } from './NotFoundPage';

const T = {
  en: { back: 'HiLink Forum', min: 'min read', more: 'More from' },
  vi: { back: 'Diễn đàn HiLink', min: 'phút đọc', more: 'Thêm từ mục' },
};

export function ForumPostPage() {
  const { slug } = useParams();
  const { lang, l } = useLang();
  const t = T[lang];
  const post = FORUM_POSTS.find((p) => p.slug === slug);
  usePageMeta(post ? post.title[lang] : t.back, post?.excerpt[lang]);
  if (!post) return <NotFoundPage />;
  const cat = FORUM_CATEGORIES.find((c) => c.id === post.category)!;
  const more = FORUM_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="bg-white pt-12 pb-20 lg:pt-16 lg:pb-24">
        <header className="max-w-[880px] mx-auto px-6 text-center">
          <Link to={l('/forum')} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#6B645D] hover:text-[#D12126] transition-colors">
            <ArrowLeft size={14} /> {t.back}
          </Link>
          <p className="mt-8 text-[12px] uppercase tracking-[0.2em] text-[#D12126]">
            <Link to={l(`/forum#${cat.id.toLowerCase()}`)} className="hover:underline underline-offset-4">{cat[lang]}</Link>
          </p>
          <h1 className="serif hl-forum-title mt-4 text-[#2A2623]">{post.title[lang]}</h1>
          <p className="mx-auto mt-5 max-w-[60ch] text-[1.0625rem] leading-[1.65] text-[#4A443F]">{post.excerpt[lang]}</p>
          <p className="mt-5 text-[13px] text-[#6B645D]">HiLink · {postDate(post.date, lang)} · {post.minutes} {t.min}</p>
        </header>

        <figure className="relative max-w-[1180px] mx-auto mt-10 lg:mt-14 px-6 lg:px-12">
          <div className="relative aspect-[16/9] overflow-hidden bg-[#F4F0EA]">
            <img {...photo(post.image, '(min-width: 1180px) 1084px, 100vw')} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <img src="/brand/logo-hilink-lockup.svg" alt="" aria-hidden="true" className="absolute bottom-5 left-5 lg:bottom-7 lg:left-7 h-10 lg:h-14 w-auto [filter:brightness(0)_invert(1)] opacity-95" />
          </div>
        </figure>

        <div className="max-w-[720px] mx-auto mt-12 lg:mt-16 px-6">
          {post.blocks.map((b, k) => {
            if (b.type === 'h2') return <h2 key={k} className="serif hl-forum-h2 mt-12 text-[#2A2623]">{b[lang]}</h2>;
            if (b.type === 'img') return (
              <figure key={k} className="my-10">
                <img {...photo(b.src, '(min-width: 720px) 672px, 100vw')} alt={b.alt[lang]} loading="lazy" decoding="async" className="w-full" />
                <figcaption className="mt-3 text-[13px] text-[#6B645D]">{b.alt[lang]}</figcaption>
              </figure>
            );
            // A lead-in that ends a sentence runs into the paragraph; one that
            // names a thing ("Coworking space") stands on its own line above it.
            const lead = b.lead?.[lang], runIn = !!lead && /[.:!?]$/.test(lead);
            return (
              <p key={k} className="mt-5 text-[17px] leading-[1.8] text-[#2A2623]">
                {lead && <strong className={`font-semibold ${runIn ? '' : 'block'}`}>{lead}{runIn ? ' ' : ''}</strong>}{b[lang]}
              </p>
            );
          })}
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
