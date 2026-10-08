// News — the articles published on the HiLink forum (hilink.vn/forum). Each
// card opens the full article there.
import { POSTS } from '../data/posts';
import { ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Button, PageHero, PhotoCard, Reveal, Section } from '../components/Kit';

const T = {
  en: { eyebrow: 'News & Insights', title: 'Notes on workspace, Hanoi and how teams work.', lead: 'Guides and stories from the HiLink forum.', read: 'Read on hilink.vn', all: 'All articles', cats: { Guide: 'Guide', Design: 'Design', Neighbourhood: 'Neighbourhood' } as Record<string, string> },
  vi: { eyebrow: 'Tin tức & góc nhìn', title: 'Về không gian làm việc, Hà Nội và cách đội ngũ làm việc.', lead: 'Hướng dẫn và câu chuyện từ diễn đàn HiLink.', read: 'Đọc trên hilink.vn', all: 'Tất cả bài viết', cats: { Guide: 'Hướng dẫn', Design: 'Thiết kế', Neighbourhood: 'Khu vực' } as Record<string, string> },
};

export function NewsPage() {
  const { lang } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.lead);
  const [first, ...rest] = POSTS;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <Section tone="cream">
        <Reveal>
          <a href={ws(lang, `/forum/${first.slug}`)} target="_blank" rel="noopener noreferrer" className="group grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
            <div className="aspect-[4/3] overflow-hidden bg-[#EAE3D2]">
              <img src={first.photo} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
            <div>
              <p className="eyebrow">{t.cats[first.category] ?? first.category} · {first.date}</p>
              <h2 className="mb-6 group-hover:text-[#7A653B] transition-colors">{first.title[lang]}</h2>
              <p className="lede mb-8">{first.excerpt[lang]}</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] border-b border-current/30 pb-1">{t.read} ↗</span>
            </div>
          </a>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-14">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <PhotoCard
                photo={p.photo}
                eyebrow={`${t.cats[p.category] ?? p.category} · ${p.date}`}
                title={p.title[lang]}
                text={p.excerpt[lang]}
                href={ws(lang, `/forum/${p.slug}`)}
                cta={t.read}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button href={ws(lang, '/forum')} variant="dark">{t.all}</Button>
        </div>
      </Section>
    </>
  );
}
