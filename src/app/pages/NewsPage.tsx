// News — the articles published on the HiLink forum (hilink.vn/forum), in the
// original page layout. Each article opens on hilink.vn.
import { useState } from 'react';
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';
import { POSTS } from '../data/posts';
import { ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';

const CATS: Record<string, { en: string; vi: string }> = {
  Guide: { en: 'Guide', vi: 'Hướng dẫn' },
  Design: { en: 'Design', vi: 'Thiết kế' },
  Neighbourhood: { en: 'Neighbourhood', vi: 'Khu vực' },
};

const T = {
  en: {
    eyebrow: 'News & Insights', title: 'Insights on workspace, Hanoi and how teams work',
    lead: 'Guides and stories from the HiLink forum.',
    featured: 'Featured', read: 'Read Article', all: 'All',
    subTitle: 'More on the HiLink forum', subLead: 'Guides, neighbourhood notes and stories from HiLink workspaces.', subCta: 'Visit the forum',
  },
  vi: {
    eyebrow: 'Tin tức & góc nhìn', title: 'Góc nhìn về không gian làm việc, Hà Nội và cách đội ngũ làm việc',
    lead: 'Hướng dẫn và câu chuyện từ diễn đàn HiLink.',
    featured: 'Nổi bật', read: 'Đọc bài viết', all: 'Tất cả',
    subTitle: 'Đọc thêm trên diễn đàn HiLink', subLead: 'Hướng dẫn, ghi chép về khu vực và câu chuyện từ các không gian HiLink.', subCta: 'Đến diễn đàn',
  },
};

export function NewsPage() {
  const { lang } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.lead);
  const [cat, setCat] = useState('All');

  const articles = POSTS.map((p) => ({
    id: p.slug,
    category: CATS[p.category]?.[lang] ?? p.category,
    rawCategory: p.category,
    title: p.title[lang],
    excerpt: p.excerpt[lang],
    date: p.date,
    image: p.photo,
    href: ws(lang, `/forum/${p.slug}`),
  }));
  const [featuredArticle, ...rest] = articles;
  const regularArticles = rest.filter((a) => cat === 'All' || a.rawCategory === cat);
  const categories = ['All', ...Object.keys(CATS)];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[#2A2623] text-white">
        <HeroBg image="/photos/f15-lounge-cabin.webp" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-wider text-[#F06A6E] mb-8">{t.eyebrow}</p>
            <h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
              {t.title}
            </h1>
            <p className="text-xl text-[#E9E3DA] leading-relaxed">
              {t.lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-24 bg-[#F4F0EA]">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <motion.div
              className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
            >
              <motion.div
                className="relative aspect-[4/3] overflow-hidden"
              >
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-[#D12126] text-white text-xs uppercase tracking-wider">
                  {t.featured}
                </div>
              </motion.div>
              <motion.div>
                <div className="text-sm uppercase tracking-wider text-[#D12126] mb-4">
                  {featuredArticle.category}
                </div>
                <h2 className="serif text-4xl lg:text-5xl mb-6">{featuredArticle.title}</h2>
                <p className="text-lg text-[#6B645D] mb-8 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-[#6B645D] mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {featuredArticle.date}
                  </div>
                </div>
                <a
                  href={featuredArticle.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#2A2623] text-white text-sm uppercase tracking-wider hover:bg-[#D12126] transition-colors group"
                >
                  {t.read}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 bg-white border-b border-[#2A2623]/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCat(category)}
                aria-pressed={cat === category}
                className={`px-6 py-2 text-sm uppercase tracking-wider border border-[#2A2623]/20 hover:bg-[#2A2623] hover:text-white transition-colors ${cat === category ? 'bg-[#2A2623] text-white' : ''}`}
              >
                {category === 'All' ? t.all : CATS[category][lang]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {regularArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Forum */}
      <section className="py-24 lg:py-32 bg-[#FBECEC] text-[#2A2623]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="max-w-3xl mx-auto text-center"
          >
            <TrendingUp size={48} className="mx-auto mb-8 text-[#D12126]" />
            <h2 className="serif text-4xl lg:text-5xl mb-6">
              {t.subTitle}
            </h2>
            <p className="text-xl text-[#6B645D] mb-12">
              {t.subLead}
            </p>
            <a
              href={ws(lang, '/forum')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors whitespace-nowrap"
            >
              {t.subCta}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function ArticleCard({ category, title, excerpt, date, image, href }: {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href: string;
}) {
  return (
    <motion.article
      className="group"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[4/3] overflow-hidden mb-6">
          <motion.img loading="lazy" decoding="async"
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="text-sm uppercase tracking-wider text-[#D12126] mb-3">
          {category}
        </div>
        <h3 className="serif text-2xl mb-4 group-hover:text-[#D12126] transition-colors">
          {title}
        </h3>
        <p className="text-[#6B645D] mb-6 leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center gap-6 text-sm text-[#6B645D]">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            {date}
          </div>
        </div>
      </a>
    </motion.article>
  );
}
