// About — the original page layout, filled with the copy HiLink approved for
// hilink.vn/about (data/aboutCopy.ts) and HiLink's own photographs.
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Target, Compass } from '../components/Glyph';
import { motion } from 'motion/react';
import { ABOUT } from '../data/aboutCopy';
import { LOCATIONS } from '../data/locations';
import { BUSINESS_CLUB_SITE, PARTNERS, ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { LinkPhilosophy } from '../components/LinkPhilosophy';
import { Flag } from '../components/Flag';
import { Candles } from '../components/Candles';
import { PartnerMarquee } from '../components/PartnerMarquee';

const T = {
  en: {
    est: 'Est. 2020 · Ha Noi, Vietnam', scroll: 'Scroll to discover', storyAlt: 'A client at work in a private office at the HiLink Business Club',
    facts: [['2020', 'Year Founded'], ['Ha Noi', 'Headquarters'], [`${LOCATIONS.length} Locations`, 'HiLink Workspaces'], [`${PARTNERS.length} Partners`, 'Companies we work with']],
    standFor: 'What We Stand For',
    journeyEyebrow: 'Our Approach',
    workEyebrow: 'Selected Work', workTitle: 'Properties We Run',
    work: [
      { name: 'The Quarter House', location: 'Hoan Kiem, Hanoi', tag: 'Boutique Townhouse', image: '/properties/quarter-house/qh-07.webp', to: '/workspace/quarter-house' },
      { name: 'Floor 19 · 4 Ton That Tung', location: 'Dong Da, Hanoi', tag: 'Private Floor', image: '/photos/f19-window.webp', href: '/locations/ttt-f19' },
      { name: 'HiLink Business Club', location: 'Hoan Kiem, Hanoi', tag: "Members' Club", image: '/photos/hbc-lounge.webp', href: '/locations/obc' },
    ],
    partnersLbl: 'Trusted Partners & Affiliates', cta: 'Get in Touch',
  },
  vi: {
    est: 'Thành lập 2020 · Hà Nội, Việt Nam', scroll: 'Cuộn để khám phá', storyAlt: 'Khách hàng làm việc trong văn phòng riêng tại HiLink Business Club',
    facts: [['2020', 'Năm thành lập'], ['Hà Nội', 'Trụ sở'], [`${LOCATIONS.length} địa điểm`, 'HiLink Workspaces'], [`${PARTNERS.length} đối tác`, 'Doanh nghiệp đồng hành']],
    standFor: 'Giá trị cốt lõi',
    journeyEyebrow: 'Cách tiếp cận',
    workEyebrow: 'Dự án tiêu biểu', workTitle: 'Bất động sản chúng tôi vận hành',
    work: [
      { name: 'The Quarter House', location: 'Hoàn Kiếm, Hà Nội', tag: 'Nhà phố boutique', image: '/properties/quarter-house/qh-07.webp', to: '/workspace/quarter-house' },
      { name: 'Tầng 19 · 4 Tôn Thất Tùng', location: 'Đống Đa, Hà Nội', tag: 'Sàn riêng', image: '/photos/f19-window.webp', href: '/locations/ttt-f19' },
      { name: 'HiLink Business Club', location: 'Hoàn Kiếm, Hà Nội', tag: 'Câu lạc bộ thành viên', image: '/photos/hbc-lounge.webp', href: '/locations/obc' },
    ],
    partnersLbl: 'Đối tác & đơn vị đồng hành', cta: 'Liên hệ',
  },
};

const ECO_LINKS = ['/property-management', '/workspace-leasing', '/business-services', ''];

export function AboutPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  const a = ABOUT[lang];
  usePageMeta(lang === 'vi' ? 'Về HiLink' : 'About HiLink', a.heroBody);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen bg-[#361716] flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/photos/f15-lounge-wide-xl.webp"
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#F06A6E] mb-8">
            {t.est}
          </p>
          <h1
            className="serif text-white max-w-5xl leading-[1.05]"
            style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontWeight: 300 }}
          >
            {a.heroTitle}
          </h1>
        </div>
        <div className="relative pb-12 flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-white/20" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">{t.scroll}</p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left — image + pull-quote */}
            <div className="lg:w-[35%]">
              <div className="lg:sticky lg:top-32 space-y-8">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/photos/hbc-desk.webp"
                    alt={t.storyAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D12126]" />
                </div>
                <div>
                  <blockquote
                    className="serif italic text-[#D12126] leading-snug"
                    style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)' }}
                  >
                    "{a.solveTitle}"
                  </blockquote>
                  <div className="mt-6 w-8 h-px bg-[#D12126]/40" />
                </div>
              </div>
            </div>

            <div className="lg:w-[65%]">
              <div className="space-y-7 text-[17px] text-[#444] leading-[1.85] mb-16">
                <p>{a.heroLead}</p>
                <p>{a.heroBody}</p>
                <p>{a.solveBody}</p>
              </div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                {t.facts.map(([value, label]) => (
                  <div key={label} className="border-t pt-5" style={{ borderColor: 'rgba(209,33,38,0.3)' }}>
                    <div className="serif text-2xl text-[#D12126] mb-2">{value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-[#6B645D]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — interactive */}
      <LinkPhilosophy />

      {/* Vision & Mission */}
      <section className="bg-[#F4F0EA] py-32 text-[#2A2623]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-px bg-[#2A2623]/10">
            <div className="bg-white p-10 lg:p-14">
              <div className="text-[#D12126] mb-8"><Compass size={32} /></div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {a.visionLbl}</p>
              <h2 className="serif text-3xl lg:text-4xl mb-6 leading-snug">
                {a.vision}
              </h2>
              <p className="text-[#6B645D] text-[16px] leading-relaxed">
                {a.ecoClose}
              </p>
            </div>
            <div className="bg-white p-10 lg:p-14">
              <div className="text-[#D12126] mb-8"><Target size={32} /></div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {a.missionLbl}</p>
              <h2 className="serif text-3xl lg:text-4xl mb-6 leading-snug">
                {a.whoTitle}
              </h2>
              <p className="text-[#6B645D] text-[16px] leading-relaxed">
                {a.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-16 flex items-center gap-2.5"><Flag /> {t.standFor}</p>
          <div className="divide-y divide-[#2A2623]/10">
            {a.diffs.map(({ t: title, d: desc }, i) => (
              <div key={title} className="flex items-start gap-8 py-10">
                <span className="serif font-light text-[#2A2623]/[0.07] leading-none select-none shrink-0 hidden lg:block" style={{ fontSize: '80px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 lg:pt-4">
                  <h3 className="serif text-3xl mb-3">{title}</h3>
                  <p className="text-[#6B645D] text-[16px] leading-relaxed max-w-2xl">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work — timeline */}
      <section className="bg-[#F4F0EA] py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4 flex items-center gap-2.5"><Flag /> {t.journeyEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl">{a.howTitle}</h2>
            <p className="text-[#6B645D] text-[15px] leading-relaxed max-w-2xl mt-6">{a.howBody}</p>
          </div>
          <div className="border-l-2 border-[#D12126]/30 ml-2 lg:ml-4">
            {a.stages.map(({ t: title, s }, i) => (
              <div key={title} className="relative pl-10 lg:pl-14 pb-12 last:pb-0">
                <span className="absolute left-0 -translate-x-1/2 top-1 w-3 h-3 rounded-full bg-[#D12126]" />
                <div className="serif text-2xl text-[#D12126] mb-2">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="serif text-xl mb-2">{title}</h3>
                <p className="text-[#6B645D] text-[15px] leading-relaxed max-w-2xl">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties we run */}
      <section className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4 flex items-center gap-2.5"><Flag /> {t.workEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl">{t.workTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.work.map(({ name, location, tag, image, to, href }) => {
              const card = (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img loading="lazy" decoding="async"
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-5 left-5 px-3 py-1.5 bg-white/95 text-[10px] uppercase tracking-[0.2em]">
                      {tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="serif text-2xl mb-1">{name}</h3>
                    <p className="text-[13px] text-[#D12126] uppercase tracking-wider">{location}</p>
                  </div>
                </>
              );
              return (
                <motion.div key={name} className="group bg-[#F4F0EA] overflow-hidden" whileHover={{ y: -8 }}>
                  {to
                    ? <Link to={l(to)}>{card}</Link>
                    : <a href={ws(lang, href)} target="_blank" rel="noopener noreferrer">{card}</a>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="bg-[#F4F0EA] py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#D12126] mb-4 flex items-center gap-2.5"><Flag /> {a.ecoEyebrow}</p>
              <h2 className="serif text-4xl lg:text-5xl">{a.oneRel}</h2>
            </div>
            <p className="text-[15px] text-[#6B645D] max-w-sm">
              {a.ecoTitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2623]/10">
            {a.eco.map((c, i) => {
              const inner = (
                <>
                  <h3 className="serif text-2xl mb-3 text-[#2A2623] group-hover:text-[#D12126] transition-colors">{c.t}</h3>
                  <p className="text-[14px] text-[#6B645D] leading-relaxed">{c.d}</p>
                </>
              );
              const cls = 'group block bg-white p-8 lg:p-10 hover:bg-[#FBECEC] transition-colors';
              return ECO_LINKS[i]
                ? <Link key={c.t} to={l(ECO_LINKS[i])} className={cls}>{inner}</Link>
                : <a key={c.t} href={BUSINESS_CLUB_SITE} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] uppercase tracking-[0.18em] text-[#2A2623]/40">
            {a.needs.map((n, i) => (
              <span key={n} className="flex items-center gap-8">{i > 0 && <span>·</span>}{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Partners ticker */}
      <section className="bg-white py-16 border-t border-b border-[#2A2623]/08">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] text-center">
            {t.partnersLbl}
          </p>
        </div>
        <PartnerMarquee className="max-w-[1400px] mx-auto" />
      </section>

      {/* CTA */}
      <section className="relative py-28 bg-[#361716] text-white overflow-hidden">
        <Candles />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="serif text-4xl lg:text-5xl mb-4">{a.helpTitle}</h2>
            <p className="text-white/70 text-lg">{a.helpBody}</p>
          </div>
          <Link to={l('/contact')} className="shrink-0 inline-flex items-center gap-3 px-9 py-4 bg-[#D12126] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#A3181C] transition-colors group">
            {t.cta}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
