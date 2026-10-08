// Careers — copy and open roles approved for hilink.vn/careers. Applications go
// to the main HiLink inbox, as on hilink.vn.
import { CAREERS } from '../data/careersCopy';
import { CONTACT } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Button, CtaBand, PageHero, Reveal, Section, SectionHead } from '../components/Kit';

export function CareersPage() {
  const { lang } = useLang();
  const c = CAREERS[lang];
  usePageMeta(lang === 'vi' ? 'Tuyển dụng' : 'Careers', c.heroSub);
  const apply = (role: string) => `${CONTACT.emailHref}?subject=${encodeURIComponent(`${lang === 'vi' ? 'Ứng tuyển' : 'Application'}: ${role}`)}`;

  const depts = Array.from(new Set(c.jobs.map((j) => j.dept)));

  return (
    <>
      <PageHero eyebrow={lang === 'vi' ? 'Tuyển dụng' : 'Careers'} title={c.heroTitle} lead={c.heroSub} photo="/photos/hbc-team.webp">
        <Button href="#vacancies">{c.viewVac}</Button>
      </PageHero>

      <section className="bg-[#F8F6F1]">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <img src="/photos/hbc-host.webp" alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <Reveal className="px-6 lg:px-20 py-20 lg:py-28 flex flex-col justify-center max-w-[680px]">
            <p className="eyebrow">{c.aboutE}</p>
            <h2 className="mb-6">{c.aboutT}</h2>
            <p className="lede mb-5">{c.about1}</p>
            <p className="text-[#555]">{c.about2}</p>
          </Reveal>
        </div>
      </section>

      <Section tone="white" id="vacancies">
        <SectionHead eyebrow={c.join} title={c.viewVac} />
        {depts.map((d) => (
          <div key={d} className="mb-12">
            <p className="eyebrow">{d}</p>
            <ul className="divide-y divide-[#0F0F0F]/10 border-y border-[#0F0F0F]/10">
              {c.jobs.filter((j) => j.dept === d).map((j) => (
                <li key={j.t} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6">
                  <div>
                    <h3>{j.t}</h3>
                    <p className="text-[13.5px] text-[#666]">{j.loc}</p>
                  </div>
                  <a href={apply(j.t)} className="shrink-0 inline-flex items-center justify-center px-7 py-3 bg-[#0F0F0F] text-white text-[11px] font-medium uppercase tracking-[0.16em] hover:bg-[#A88F5C] transition-colors">
                    {c.apply}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section tone="beige">
        <SectionHead eyebrow={c.benefitsE} title={c.benefitsT} lead={c.benefitsSub} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0F0F0F]/10 border border-[#0F0F0F]/10">
          {c.perks.map((p) => (
            <div key={p.t} className="bg-[#F0EDE6] p-8">
              <h3 className="mb-3">{p.t}</h3>
              <p className="text-[#555]">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-[#F8F6F1]">
        <div className="grid lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1 px-6 lg:px-20 py-20 lg:py-28 flex flex-col justify-center max-w-[680px] lg:ml-auto">
            <p className="eyebrow">{c.cultureE}</p>
            <h2 className="mb-6">{c.cultureT}</h2>
            <p className="lede mb-5">{c.culture1}</p>
            <p className="text-[#555]">{c.culture2}</p>
          </Reveal>
          <div className="order-1 lg:order-2 relative min-h-[360px] lg:min-h-[520px]">
            <img src="/photos/hbc-lounge-2.webp" alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <CtaBand title={c.noRole} lead={c.noRoleSub} photo="/photos/f15-lounge.webp">
        <Button href={`${CONTACT.emailHref}?subject=${encodeURIComponent('CV')}`}>{c.sendCv}</Button>
      </CtaBand>
    </>
  );
}
