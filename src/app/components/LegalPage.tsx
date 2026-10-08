// Legal pages — the original page layout, filled with the texts HiLink
// published on hilink.vn (data/legalCopy.ts).
import { motion } from 'motion/react';
import { LEGAL } from '../data/legalCopy';
import { useLang, usePageMeta } from '../lib/i18n';

export function LegalPage({ doc, pdf }: { doc: 'privacy' | 'terms'; pdf?: string }) {
  const { lang } = useLang();
  const d = LEGAL[doc][lang] as {
    title: string; ref?: string; updatedDate: string; intro: string;
    sections: { n: string; title: string; body: string }[];
  };
  const s = LEGAL.shared[lang];
  usePageMeta(d.title, d.intro.slice(0, 155));

  return (
    <>
      <section id="hero" className="py-20 lg:py-28 bg-[#2A2623] text-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm uppercase tracking-wider text-[#F06A6E] mb-8">{s.legal}</p>
            <h1 className="serif text-5xl lg:text-6xl mb-6 leading-tight">{d.title}</h1>
            <p className="text-[#E9E3DA]">
              {s.updated}: {d.updatedDate}{d.ref ? ` · ${d.ref}` : ''}
              {pdf && <> · <a href={pdf} className="underline hover:text-[#F06A6E]">{s.download}</a></>}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <p className="text-lg text-[#6B645D] leading-relaxed mb-6">
            {d.intro}
          </p>
          <p className="text-sm text-[#6B645D] leading-relaxed mb-12 border-l-2 border-[#D12126] pl-4">{s.note}</p>
          <div className="space-y-12">
            {d.sections.map((sec) => (
              <div key={sec.n} id={`section-${sec.n}`}>
                <h2 className="serif text-3xl mb-4">{sec.n}. {sec.title}</h2>
                {sec.body.split('\n\n').map((para, i) => (
                  <p key={i} className="text-[#6B645D] leading-relaxed mb-4 whitespace-pre-line">{para}</p>
                ))}
              </div>
            ))}
            <div id="contact">
              <h2 className="serif text-3xl mb-4">{s.contactTitle}</h2>
              <p className="text-[#6B645D] leading-relaxed mb-4">{s.contactBody}</p>
              <address className="not-italic text-[#444] leading-relaxed">
                <strong>{s.companyName}</strong><br />
                {s.companyAddress}<br />
                {s.companyPhone} · <a href={`mailto:${s.companyEmail}`} className="underline hover:text-[#D12126]">{s.companyEmail}</a>
              </address>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
