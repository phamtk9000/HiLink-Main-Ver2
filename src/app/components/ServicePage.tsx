// One layout for every service line (property management, business services,
// concierge, industrial). Each page supplies its copy in both languages; the
// structure, spacing and type are shared so the pages read as one site.
import type { ReactNode } from 'react';
import { CONTACT } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Button, CtaBand, PageHero, Reveal, Section, SectionHead, Steps } from './Kit';
import { ServiceGrid } from './Blocks';
import { FAQ } from './FAQ';
import { LeadForm } from './LeadForm';

type Item = { t: string; d: string };

export interface ServiceCopy {
  meta: string;
  hero: { eyebrow: string; title: string; lead: string };
  intro: { eyebrow: string; title: string; body: string[] };
  offer: { eyebrow: string; title: string; lead?: string; items: Item[] };
  who?: { eyebrow: string; title: string; items: string[] };
  steps: { eyebrow: string; title: string; items: Item[] };
  faqs: { question: string; answer: string }[];
  form: { title: string; lead: string; interests?: string[]; messageLabel?: string };
}

const T = {
  en: { faqEyebrow: 'Questions', faqTitle: 'Frequently asked', contact: 'Prefer to talk?', more: 'Other solutions', moreTitle: 'One partner for the rest of your needs', book: 'Book a consultation', ctaTitle: 'Not sure where to start?', ctaLead: 'Tell us what you need. We will put together the right mix of space, services and support.' },
  vi: { faqEyebrow: 'Câu hỏi', faqTitle: 'Câu hỏi thường gặp', contact: 'Muốn trao đổi trực tiếp?', more: 'Giải pháp khác', moreTitle: 'Một đối tác cho mọi nhu cầu còn lại', book: 'Đặt lịch tư vấn', ctaTitle: 'Chưa biết bắt đầu từ đâu?', ctaLead: 'Hãy cho chúng tôi biết nhu cầu của bạn. Chúng tôi sẽ kết hợp không gian, dịch vụ và hỗ trợ phù hợp.' },
};

export function ServicePage({ copy, path, formType, photo, introPhoto, introAlt, extra }: {
  copy: { en: ServiceCopy; vi: ServiceCopy };
  path: string;
  formType: string;
  photo?: string;
  introPhoto?: string;
  introAlt?: { en: string; vi: string };
  extra?: ReactNode;
}) {
  const { lang, l } = useLang();
  const c = copy[lang];
  const t = T[lang];
  usePageMeta(c.hero.eyebrow, c.meta);

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} lead={c.hero.lead} photo={photo}>
        <Button href="#enquire">{t.book}</Button>
      </PageHero>

      {introPhoto ? (
        <section className="bg-[#F8F6F1]">
          <div className="grid lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1 px-6 lg:px-20 py-20 lg:py-28 flex flex-col justify-center max-w-[680px] lg:ml-auto">
              <p className="eyebrow">{c.intro.eyebrow}</p>
              <h2 className="mb-6">{c.intro.title}</h2>
              {c.intro.body.map((p, i) => <p key={i} className={i === 0 ? 'lede mb-5' : 'text-[#555] mb-5'}>{p}</p>)}
            </Reveal>
            <div className="order-1 lg:order-2 relative min-h-[360px] lg:min-h-[560px]">
              <img src={introPhoto} alt={introAlt?.[lang] ?? ''} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </section>
      ) : (
        <Section tone="cream">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">{c.intro.eyebrow}</p>
            <h2 className="mb-6">{c.intro.title}</h2>
            {c.intro.body.map((p, i) => <p key={i} className={i === 0 ? 'lede mb-5' : 'text-[#555] mb-5'}>{p}</p>)}
          </Reveal>
        </Section>
      )}

      <Section tone="white">
        <SectionHead eyebrow={c.offer.eyebrow} title={c.offer.title} lead={c.offer.lead} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0F0F0F]/10 border border-[#0F0F0F]/10">
          {c.offer.items.map((it) => (
            <div key={it.t} className="bg-white p-8 lg:p-10">
              <h3 className="mb-3">{it.t}</h3>
              <p className="text-[#555]">{it.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {c.who && (
        <Section tone="beige">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="eyebrow">{c.who.eyebrow}</p>
              <h2>{c.who.title}</h2>
            </div>
            <ul className="lg:col-span-7 divide-y divide-[#0F0F0F]/10 border-y border-[#0F0F0F]/10">
              {c.who.items.map((w) => (
                <li key={w} className="py-5 flex gap-4 text-[1.0625rem]"><span className="text-[#7A653B]">—</span>{w}</li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {extra}

      <Section tone="dark">
        <SectionHead eyebrow={c.steps.eyebrow} title={c.steps.title} />
        <Steps items={c.steps.items} />
      </Section>

      <FAQ items={c.faqs} eyebrow={t.faqEyebrow} title={t.faqTitle} />

      <Section tone="cream" id="enquire">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow">{c.hero.eyebrow}</p>
            <h2 className="mb-6">{c.form.title}</h2>
            <p className="text-[#555] mb-10">{c.form.lead}</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555] mb-3">{t.contact}</p>
            <a href={CONTACT.emailHref} className="block serif text-[1.4rem] hover:text-[#7A653B]">{CONTACT.email}</a>
            <a href={CONTACT.phoneHref} className="block mt-1 text-[#555] hover:text-[#7A653B]">{CONTACT.phone}</a>
          </div>
          <div className="lg:col-span-7 relative">
            <LeadForm
              formType={formType}
              source={path}
              fields={['company', 'phone', 'interest', 'message']}
              interests={c.form.interests}
              messageLabel={c.form.messageLabel}
            />
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow={t.more} title={t.moreTitle} />
        <ServiceGrid exclude={path} />
      </Section>

      <CtaBand title={t.ctaTitle} lead={t.ctaLead} photo="/photos/hbc-lounge-xl.webp">
        <Button to={l('/book-consultation')}>{t.book}</Button>
      </CtaBand>
    </>
  );
}
