// Legal pages — the texts HiLink published on hilink.vn (data/legalCopy.ts),
// with a contents list and the company's registered details.
import { LEGAL } from '../data/legalCopy';
import { useLang, usePageMeta } from '../lib/i18n';
import { Container } from './Kit';

export function LegalPage({ doc, pdf }: { doc: 'privacy' | 'terms'; pdf?: string }) {
  const { lang } = useLang();
  const d = LEGAL[doc][lang] as {
    eyebrow: string; title: string; ref?: string; updatedDate: string; intro: string;
    sections: { n: string; title: string; body: string }[];
  };
  const s = LEGAL.shared[lang];
  usePageMeta(d.title, d.intro.slice(0, 155));

  return (
    <section className="bg-[#F8F6F1] py-20 lg:py-28">
      <Container>
        <header className="max-w-3xl mb-14">
          <p className="eyebrow">{s.legal} · {d.eyebrow}</p>
          <h1 className="mb-6">{d.title}</h1>
          <p className="text-[13.5px] text-[#666]">
            {s.updated}: {d.updatedDate}{d.ref ? ` · ${d.ref}` : ''}
            {pdf && <> · <a href={pdf} className="underline hover:text-[#7A653B]">{s.download}</a></>}
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <nav className="lg:col-span-3 lg:sticky lg:top-28 self-start" aria-label={s.contents}>
            <p className="eyebrow">{s.contents}</p>
            <ol className="space-y-2 text-[13.5px]">
              {d.sections.map((sec) => (
                <li key={sec.n}><a href={`#s-${sec.n}`} className="text-[#555] hover:text-[#7A653B]">{sec.n}. {sec.title}</a></li>
              ))}
            </ol>
          </nav>

          <article className="lg:col-span-9 max-w-3xl">
            <p className="lede mb-6">{d.intro}</p>
            <p className="text-[13.5px] text-[#666] mb-14 border-l-2 border-[#A88F5C] pl-4">{s.note}</p>
            {d.sections.map((sec) => (
              <section key={sec.n} id={`s-${sec.n}`} className="mb-12 scroll-mt-28">
                <h2 className="legal-h mb-4">{sec.n}. {sec.title}</h2>
                {sec.body.split('\n\n').map((para, i) => <p key={i} className="text-[#333] mb-4 whitespace-pre-line">{para}</p>)}
              </section>
            ))}

            <div className="mt-16 pt-10 border-t border-[#0F0F0F]/10">
              <h2 className="legal-h mb-3">{s.contactTitle}</h2>
              <p className="text-[#555] mb-4">{s.contactBody}</p>
              <address className="not-italic text-[14px] leading-7">
                <strong>{s.companyName}</strong><br />
                {s.companyAddress}<br />
                {s.companyPhone} · <a href={`mailto:${s.companyEmail}`} className="underline">{s.companyEmail}</a>
              </address>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
