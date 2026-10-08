// Workspace leasing is run by HiLink Workspaces on hilink.vn, where prices and
// availability come live from SmartOS. This page introduces it and links each
// location and solution there — it does not copy prices that change daily.
import { WORKSPACE_LINES } from '../data/locations';
import { WORKSPACE_SOLUTIONS, ws, wsSolutionUrl } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Button, CtaBand, PageHero, PhotoCard, Reveal, Section, SectionHead } from '../components/Kit';
import { LocationGrid, PartnerLogos } from '../components/Blocks';
import { FAQ } from '../components/FAQ';

const T = {
  en: {
    eyebrow: 'Workspace Leasing',
    title: 'Workspace designed around the way you work.',
    lead: 'Private offices, desks, meeting rooms, event space and business addresses at seven HiLink addresses in central Hanoi.',
    find: 'Find a space', tour: 'Book a tour',
    linesEyebrow: 'Our workspace brands', linesTitle: 'Four lines, one standard',
    lines: {
      HPW: 'High-floor offices and lounges for growing teams.',
      HW: 'Boutique workspaces and private floors.',
      HBC: "Members' clubs for Hanoi's business community.",
      HFS: 'Roam-anywhere desks for hybrid teams.',
    },
    solEyebrow: 'Solutions', solTitle: 'From a business address to a whole floor', see: 'See plans & prices',
    locEyebrow: 'Locations', locTitle: 'Seven addresses in Hoan Kiem and Dong Da',
    locLead: 'Each location page shows the spaces available today, prices and how to book.',
    prtEyebrow: 'Trusted by', prtTitle: 'Companies working from HiLink',
    faqEyebrow: 'Questions', faqTitle: 'Before you choose a space',
    faqs: [
      { question: 'Can I visit before I decide?', answer: 'Yes. Book a tour of any location on hilink.vn and our team will show you the spaces.' },
      { question: 'How do I see prices and availability?', answer: 'Each location page on hilink.vn shows current prices and the spaces available, and lets you book online.' },
      { question: 'What is included in a workspace?', answer: 'It depends on the plan and location. Typical inclusions are Wi-Fi, a staffed reception, pantry and access to meeting rooms — each plan on hilink.vn lists exactly what is included.' },
      { question: 'Can you build a floor for my team?', answer: 'Yes. HiLink Enterprise Solutions fits out whole floors at 4 Ton That Tung to your brief and runs them for you.' },
    ],
    ctaTitle: 'Ready to find your space?', ctaLead: 'Book a tour, or tell us what your team needs and we will suggest the right fit.',
  },
  vi: {
    eyebrow: 'Cho thuê không gian làm việc',
    title: 'Không gian làm việc thiết kế quanh cách bạn làm việc.',
    lead: 'Văn phòng riêng, chỗ ngồi, phòng họp, không gian sự kiện và địa chỉ doanh nghiệp tại bảy địa chỉ HiLink giữa trung tâm Hà Nội.',
    find: 'Tìm không gian', tour: 'Đặt lịch tham quan',
    linesEyebrow: 'Các dòng sản phẩm', linesTitle: 'Bốn dòng, một tiêu chuẩn',
    lines: {
      HPW: 'Văn phòng và lounge tầng cao cho đội ngũ đang phát triển.',
      HW: 'Không gian boutique và sàn riêng.',
      HBC: 'Câu lạc bộ thành viên cho cộng đồng doanh nhân Hà Nội.',
      HFS: 'Chỗ ngồi linh hoạt ở nhiều nơi cho đội ngũ hybrid.',
    },
    solEyebrow: 'Giải pháp', solTitle: 'Từ địa chỉ doanh nghiệp đến nguyên một sàn', see: 'Xem gói & giá',
    locEyebrow: 'Địa điểm', locTitle: 'Bảy địa chỉ tại Hoàn Kiếm và Đống Đa',
    locLead: 'Trang của từng địa điểm cho biết không gian còn trống hôm nay, giá và cách đặt chỗ.',
    prtEyebrow: 'Đồng hành cùng', prtTitle: 'Những doanh nghiệp làm việc tại HiLink',
    faqEyebrow: 'Câu hỏi', faqTitle: 'Trước khi chọn không gian',
    faqs: [
      { question: 'Tôi có thể đến xem trước khi quyết định không?', answer: 'Được. Đặt lịch tham quan bất kỳ địa điểm nào trên hilink.vn, đội ngũ sẽ dẫn bạn xem không gian.' },
      { question: 'Xem giá và phòng trống ở đâu?', answer: 'Trang của từng địa điểm trên hilink.vn hiển thị giá hiện hành và không gian còn trống, và cho phép đặt chỗ trực tuyến.' },
      { question: 'Không gian làm việc bao gồm những gì?', answer: 'Tuỳ gói và địa điểm. Thường gồm Wi-Fi, lễ tân trực, pantry và phòng họp — mỗi gói trên hilink.vn ghi rõ những gì đi kèm.' },
      { question: 'HiLink có thể làm nguyên sàn cho đội ngũ của tôi không?', answer: 'Có. Giải pháp doanh nghiệp của HiLink hoàn thiện nguyên sàn tại 4 Tôn Thất Tùng theo yêu cầu và vận hành giúp bạn.' },
    ],
    ctaTitle: 'Sẵn sàng tìm không gian?', ctaLead: 'Đặt lịch tham quan, hoặc cho chúng tôi biết đội ngũ cần gì để được gợi ý phù hợp.',
  },
};

export function WorkspacePage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.lead);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} photo="/photos/f15-lounge-wide-xl.webp">
        <Button href={ws(lang, '/locations')}>{t.find}</Button>
        <Button href={ws(lang, '/book-a-tour')} variant="light">{t.tour}</Button>
      </PageHero>

      <Section tone="cream">
        <SectionHead eyebrow={t.linesEyebrow} title={t.linesTitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0F0F0F]/10 border border-[#0F0F0F]/10">
          {(Object.keys(WORKSPACE_LINES) as (keyof typeof WORKSPACE_LINES)[]).map((code) => (
            <div key={code} className="bg-[#F8F6F1] p-8">
              <span className="block w-8 h-[3px] mb-6" style={{ background: WORKSPACE_LINES[code].color }} />
              <h3 className="mb-3">{WORKSPACE_LINES[code].label}</h3>
              <p className="text-[#555]">{t.lines[code]}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow={t.solEyebrow} title={t.solTitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {WORKSPACE_SOLUTIONS.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <PhotoCard photo={s.photo} title={s.t[lang]} text={s.d[lang]} href={wsSolutionUrl(lang, s)} cta={t.see} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="cream" id="locations">
        <SectionHead eyebrow={t.locEyebrow} title={t.locTitle} lead={t.locLead} />
        <LocationGrid />
      </Section>

      <Section tone="white">
        <SectionHead eyebrow={t.prtEyebrow} title={t.prtTitle} center />
        <PartnerLogos />
      </Section>

      <FAQ items={t.faqs} eyebrow={t.faqEyebrow} title={t.faqTitle} />

      <CtaBand title={t.ctaTitle} lead={t.ctaLead} photo="/photos/f15-boardroom.webp">
        <Button href={ws(lang, '/book-a-tour')}>{t.tour}</Button>
        <Button to={l('/contact')} variant="light">{lang === 'vi' ? 'Liên hệ' : 'Contact us'}</Button>
      </CtaBand>
    </>
  );
}
