import { ABOUT } from '../data/aboutCopy';
import { WORKSPACE_SOLUTIONS, ws, wsSolutionUrl } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Button, CtaBand, PageHero, PhotoCard, Reveal, Section, SectionHead, Steps } from '../components/Kit';
import { ServiceGrid } from '../components/Blocks';

const T = {
  en: {
    title: 'Solutions', heroTitle: 'Different business needs. Connected solutions.',
    svcEyebrow: 'Our solutions', svcTitle: 'Each solution can stand on its own',
    wsEyebrow: 'HiLink Workspaces', wsTitle: 'Workspace solutions', wsLead: 'Plans, live availability and booking are on hilink.vn.',
    more: 'See on hilink.vn', site: 'Visit hilink.vn', book: 'Book a consultation',
  },
  vi: {
    title: 'Giải pháp', heroTitle: 'Nhu cầu khác nhau. Giải pháp kết nối.',
    svcEyebrow: 'Giải pháp của chúng tôi', svcTitle: 'Mỗi giải pháp có thể đứng riêng',
    wsEyebrow: 'HiLink Workspaces', wsTitle: 'Giải pháp không gian làm việc', wsLead: 'Các gói, phòng trống và đặt chỗ có trên hilink.vn.',
    more: 'Xem trên hilink.vn', site: 'Đến hilink.vn', book: 'Đặt lịch tư vấn',
  },
};

export function SolutionsPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  const a = ABOUT[lang];
  usePageMeta(t.title, a.solsLead);

  return (
    <>
      <PageHero eyebrow={t.title} title={t.heroTitle} lead={a.solveBody} photo="/photos/f15-panorama.webp" />

      <Section tone="cream">
        <SectionHead eyebrow={t.svcEyebrow} title={t.svcTitle} lead={a.ecoClose} />
        <ServiceGrid />
      </Section>

      <Section tone="white">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <SectionHead eyebrow={t.wsEyebrow} title={t.wsTitle} lead={t.wsLead} className="!mb-0" />
          <div className="shrink-0"><Button href={ws(lang)} variant="line">{t.site}</Button></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {WORKSPACE_SOLUTIONS.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <PhotoCard photo={s.photo} title={s.t[lang]} text={s.d[lang]} href={wsSolutionUrl(lang, s)} cta={t.more} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead eyebrow={a.howEyebrow} title={a.howTitle} lead={a.howBody} />
        <Steps items={a.stages.map((s) => ({ t: s.t, d: s.s }))} />
      </Section>

      <CtaBand title={a.helpTitle} lead={a.helpBody} photo="/photos/hbc-lounge-xl.webp">
        <Button to={l('/book-consultation')}>{t.book}</Button>
      </CtaBand>
    </>
  );
}
