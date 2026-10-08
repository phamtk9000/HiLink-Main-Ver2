import { ABOUT } from '../data/aboutCopy';
import { ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Button, CtaBand, PageHero, PhotoCard, Reveal, Section, SectionHead, TextLink } from '../components/Kit';
import { LocationGrid, PartnerLogos, ServiceGrid } from '../components/Blocks';

const T = {
  en: {
    meta: 'HiLink brings together workspace, property and asset management, business services and operational support under one relationship.',
    eyebrow: 'HiLink Vietnam · Hanoi',
    explore: 'Explore our solutions', book: 'Book a consultation', about: 'More about HiLink',
    svcEyebrow: 'What we do', svcTitle: 'Different business needs. Connected solutions.',
    wsEyebrow: 'HiLink Workspaces', wsTitle: 'Seven addresses in central Hanoi',
    wsLead: 'Private offices, desks, meeting rooms, event space and business addresses across Hoan Kiem and Dong Da — with live availability and booking on hilink.vn.',
    wsAll: 'All locations', wsSite: 'Visit hilink.vn',
    prtEyebrow: 'Trusted by', prtTitle: 'Companies that work with HiLink',
    principles: ['A HiLink team working with clients', 'The glass meeting pod on Floor 15', 'Reception on Floor 15 at 4 Ton That Tung'],
  },
  vi: {
    meta: 'HiLink kết nối không gian làm việc, quản lý bất động sản và tài sản, dịch vụ doanh nghiệp và hỗ trợ vận hành trong một mối quan hệ.',
    eyebrow: 'HiLink Việt Nam · Hà Nội',
    explore: 'Khám phá giải pháp', book: 'Đặt lịch tư vấn', about: 'Tìm hiểu về HiLink',
    svcEyebrow: 'Chúng tôi làm gì', svcTitle: 'Nhu cầu khác nhau. Giải pháp kết nối.',
    wsEyebrow: 'HiLink Workspaces', wsTitle: 'Bảy địa chỉ giữa trung tâm Hà Nội',
    wsLead: 'Văn phòng riêng, chỗ ngồi, phòng họp, không gian sự kiện và địa chỉ doanh nghiệp tại Hoàn Kiếm và Đống Đa — xem phòng trống và đặt chỗ trực tiếp trên hilink.vn.',
    wsAll: 'Tất cả địa điểm', wsSite: 'Đến hilink.vn',
    prtEyebrow: 'Đồng hành cùng', prtTitle: 'Những doanh nghiệp làm việc cùng HiLink',
    principles: ['Đội ngũ HiLink làm việc cùng khách hàng', 'Phòng họp kính trên tầng 15', 'Quầy lễ tân tầng 15, 4 Tôn Thất Tùng'],
  },
};

const PRINCIPLE_PHOTOS = ['/photos/hbc-team.webp', '/photos/f15-meeting-pod.webp', '/photos/f15-reception.webp'];

export function HomePage() {
  const { lang, l } = useLang();
  const t = T[lang];
  const a = ABOUT[lang];
  usePageMeta('', t.meta);

  return (
    <>
      <PageHero tall eyebrow={t.eyebrow} title={a.heroTitle} lead={a.heroLead} photo="/photos/f15-lounge-wide-xl.webp">
        <Button to={l('/solutions')}>{t.explore}</Button>
        <Button to={l('/book-consultation')} variant="light">{t.book}</Button>
      </PageHero>

      {/* Who we are */}
      <section className="bg-[#F8F6F1]">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[620px]">
            <img src="/photos/hbc-client-meeting.webp" alt={lang === 'vi' ? 'Buổi gặp khách hàng tại HiLink Business Club' : 'A client meeting at the HiLink Business Club'} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <Reveal className="px-6 lg:px-20 py-20 lg:py-28 flex flex-col justify-center max-w-[680px]">
            <p className="eyebrow">{a.whoEyebrow}</p>
            <h2 className="mb-6">{a.whoTitle}</h2>
            <p className="lede mb-5">{a.heroBody}</p>
            <p className="text-[#555] mb-10">{a.mission}</p>
            <TextLink to={l('/about')}>{t.about}</TextLink>
          </Reveal>
        </div>
      </section>

      <Section tone="white">
        <SectionHead eyebrow={t.svcEyebrow} title={t.svcTitle} lead={a.solsLead} />
        <ServiceGrid />
      </Section>

      <Section tone="cream">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <SectionHead eyebrow={t.wsEyebrow} title={t.wsTitle} lead={t.wsLead} className="!mb-0" />
          <div className="flex flex-wrap gap-4 lg:mb-2 shrink-0">
            <Button to={l('/workspace-leasing')} variant="dark">{t.wsAll}</Button>
            <Button href={ws(lang)} variant="line">{t.wsSite}</Button>
          </div>
        </div>
        <div className="mt-14">
          <LocationGrid limit={3} />
        </div>
      </Section>

      <Section tone="beige">
        <SectionHead eyebrow={a.diffEyebrow} title={a.diffTitle} lead={a.diffLead} />
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-14">
          {a.diffs.map((d, i) => (
            <Reveal key={d.t} delay={i * 0.1}>
              <PhotoCard photo={PRINCIPLE_PHOTOS[i]} alt={t.principles[i]} title={d.t} text={d.d} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow={t.prtEyebrow} title={t.prtTitle} center />
        <PartnerLogos />
      </Section>

      <CtaBand title={a.helpTitle} lead={a.helpBody} photo="/photos/hbc-lounge-xl.webp">
        <Button to={l('/contact')}>{a.helpContact}</Button>
        <Button to={l('/book-consultation')} variant="light">{t.book}</Button>
      </CtaBand>
    </>
  );
}
