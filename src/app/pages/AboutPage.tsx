// About HiLink — the copy HiLink approved for hilink.vn/about (data/aboutCopy.ts),
// in the same order, with HiLink's own photographs.
import { ABOUT } from '../data/aboutCopy';
import { BUSINESS_CLUB_SITE } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Button, CtaBand, PageHero, PhotoCard, Reveal, Section, SectionHead, TextLink } from '../components/Kit';
import { PartnerLogos } from '../components/Blocks';

const ALT = {
  en: {
    who: 'A client at work in a private office at the HiLink Business Club',
    vision: 'Reception on Floor 15 at 4 Ton That Tung',
    diffs: ['A HiLink team working with clients', 'The glass meeting pod on Floor 15', 'A staffed HiLink reception, ready every day'],
    eco: ['Floor 19, a HiLink-managed floor with views over Dong Da', 'The reception lounge on Floor 15', 'A HiLink team working with clients', 'The HiLink Business Club'],
  },
  vi: {
    who: 'Khách hàng làm việc trong văn phòng riêng tại HiLink Business Club',
    vision: 'Quầy lễ tân tầng 15, 4 Tôn Thất Tùng',
    diffs: ['Đội ngũ HiLink làm việc cùng khách hàng', 'Phòng họp kính trên tầng 15', 'Quầy lễ tân HiLink có người trực, sẵn sàng mỗi ngày'],
    eco: ['Tầng 19, một sàn do HiLink quản lý, nhìn ra Đống Đa', 'Sảnh lễ tân tầng 15', 'Đội ngũ HiLink làm việc cùng khách hàng', 'HiLink Business Club'],
  },
};

const DIFF_PHOTOS = ['/photos/hbc-team.webp', '/photos/f15-meeting-pod.webp', '/photos/f15-reception.webp'];
const ECO = [
  { photo: '/photos/f19-window.webp', to: '/property-management' },
  { photo: '/photos/f15-lounge-cabin.webp', to: '/workspace-leasing' },
  { photo: '/photos/hbc-client-meeting.webp', to: '/business-services' },
  { photo: '/photos/hbc-lounge.webp', href: BUSINESS_CLUB_SITE },
];

export function AboutPage() {
  const { lang, l } = useLang();
  const a = ABOUT[lang];
  const alt = ALT[lang];
  const more = lang === 'vi' ? 'Tìm hiểu thêm' : 'Learn more';
  usePageMeta(lang === 'vi' ? 'Về HiLink' : 'About HiLink', a.heroBody);

  return (
    <>
      <PageHero eyebrow={a.heroEyebrow} title={a.heroTitle} photo="/photos/f15-lounge-wide-xl.webp" />

      {/* Who we are */}
      <section className="bg-[#F8F6F1]">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[640px]">
            <img src="/photos/hbc-desk.webp" alt={alt.who} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <Reveal className="px-6 lg:px-20 py-20 lg:py-28 flex flex-col justify-center max-w-[680px]">
            <p className="eyebrow">{a.whoEyebrow}</p>
            <h2 className="mb-6">{a.whoTitle}</h2>
            <p className="lede mb-5">{a.heroLead}</p>
            <p className="text-[#555] mb-10">{a.heroBody}</p>
            <TextLink to={l('/solutions')}>{a.heroCta}</TextLink>
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="bg-[#F0EDE6]">
        <div className="grid lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1 px-6 lg:px-20 py-20 lg:py-28 flex flex-col justify-center max-w-[680px] lg:ml-auto">
            <p className="eyebrow">{a.visionLbl}</p>
            <p className="serif text-[clamp(1.4rem,2.4vw,2rem)] leading-snug mb-12">{a.vision}</p>
            <p className="eyebrow">{a.missionLbl}</p>
            <p className="text-[#555]">{a.mission}</p>
          </Reveal>
          <div className="order-1 lg:order-2 relative min-h-[360px] lg:min-h-[560px]">
            <img src="/photos/f15-reception.webp" alt={alt.vision} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Principles */}
      <Section tone="cream">
        <SectionHead eyebrow={a.diffEyebrow} title={a.diffTitle} lead={a.diffLead} />
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-14">
          {a.diffs.map((d, i) => (
            <Reveal key={d.t} delay={i * 0.1}>
              <PhotoCard photo={DIFF_PHOTOS[i]} alt={alt.diffs[i]} title={d.t} text={d.d} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What we solve */}
      <Section tone="beige">
        <Reveal className="max-w-3xl mx-auto text-center">
          <img src="/brand/logo-hilink-lockup.svg" alt="HiLink" width={120} height={68} className="mx-auto mb-10" loading="lazy" />
          <blockquote className="serif text-[clamp(1.6rem,3vw,2.6rem)] leading-tight mb-6">{a.solveTitle}</blockquote>
          <p className="eyebrow">{a.solveEyebrow}</p>
          <p className="text-[#555] max-w-2xl mx-auto">{a.solveBody}</p>
        </Reveal>
        <Reveal className="mt-14">
          <ol className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#0F0F0F]/10">
            {a.needs.map((n, i) => (
              <li key={n} className="bg-[#F0EDE6] p-6 text-center">
                <span className="block text-[11px] font-semibold tracking-[0.12em] text-[#7A653B] mb-2">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[14px]">{n}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 flex items-center gap-4 text-[12px] text-[#666]" aria-hidden="true">
            <span>{a.simple}</span>
            <i className="flex-1 h-px bg-gradient-to-r from-[#0F0F0F]/15 to-[#A88F5C]" />
            <span className="text-[#7A653B]">{a.complex}</span>
          </p>
        </Reveal>
      </Section>

      {/* Ecosystem */}
      <Section tone="white">
        <SectionHead eyebrow={a.ecoEyebrow} title={a.ecoTitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {a.eco.map((e, i) => (
            <Reveal key={e.t} delay={i * 0.08}>
              <PhotoCard
                photo={ECO[i].photo}
                alt={alt.eco[i]}
                title={e.t}
                text={e.d}
                to={ECO[i].to ? l(ECO[i].to!) : undefined}
                href={ECO[i].href}
                cta={more}
              />
            </Reveal>
          ))}
        </div>
        <p className="mt-14 max-w-2xl text-[#555]">
          <span className="eyebrow block">{a.oneRel}</span>
          {a.ecoClose}
        </p>
      </Section>

      {/* How we work */}
      <Section tone="dark">
        <SectionHead eyebrow={a.howEyebrow} title={a.howTitle} lead={a.howBody} />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {a.stages.map((s, i) => (
            <li key={s.t} className="bg-[#0F0F0F] p-8 lg:p-10">
              <span className="block text-[11px] font-semibold tracking-[0.16em] text-[#D8BE86] mb-6">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.t}</h3>
              <p className="text-[#EAE3D2]/75">{s.s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 serif text-[clamp(1.2rem,2vw,1.6rem)] text-[#D8BE86]">→ {a.performs}</p>
      </Section>

      {/* Partnerships */}
      <Section tone="cream">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <SectionHead eyebrow={a.prtEyebrow} title={a.prtLead} className="!mb-0" />
          <div className="shrink-0"><Button to={l('/partners')} variant="dark">{a.prtCta}</Button></div>
        </div>
        <PartnerLogos />
      </Section>

      <CtaBand title={a.helpTitle} lead={a.helpBody} photo="/photos/hbc-boardroom.webp">
        <Button to={l('/contact')}>{a.helpContact}</Button>
      </CtaBand>
    </>
  );
}
