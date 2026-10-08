// Partnerships — copy approved for hilink.vn/partnerships. Landlord, broker and
// enterprise programmes have their own pages there; developers and service
// providers enquire here.
import { ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { PageHero, PhotoCard, Reveal, Section, SectionHead } from '../components/Kit';
import { PartnerLogos } from '../components/Blocks';
import { LeadForm } from '../components/LeadForm';

const T = {
  en: {
    eyebrow: 'Partnerships',
    title: 'We do space. We do growth. We do partnerships.',
    lead: "Whether you bring buildings, clients, or capital, there's a way to partner with HiLink — and share in how Vietnam works next.",
    dirLabel: 'Choose your path', whyE: 'Why partner', whyT: 'Why partner with HiLink',
    why: 'We combine premium design, disciplined operations, and a fast-growing membership base. Partners get a trusted brand, a proven operating model, and a team that delivers.',
    whyItems: [
      { t: 'A trusted brand', d: 'Premium addresses members recognise and seek out.' },
      { t: 'Proven operations', d: 'A disciplined model that fills and runs space well.' },
      { t: 'A growing demand base', d: 'A pipeline of teams looking for their next space.' },
      { t: 'Aligned incentives', d: 'We only win when our partners win.' },
    ],
    partnersE: 'Our partners', partnersT: 'In good company',
    paths: [
      { t: 'For Landlords & Owners', tag: 'Owners', path: '/partnerships/landlords', photo: '/photos/f19-window.webp' },
      { t: 'For Brokers', tag: 'Brokers', path: '/partnerships/brokers', photo: '/photos/hbc-client-meeting.webp' },
      { t: 'For Enterprises', tag: 'Enterprise', path: '/partnerships/enterprise', photo: '/photos/f15-boardroom.webp' },
    ],
    more: 'Read more on hilink.vn',
    formE: 'Developers & service providers', formT: "Let's talk",
    formLead: 'Developers and business service providers: tell us about your organisation and how you would like to work together.',
    interests: ['Developer', 'Business services provider', 'Landlord or owner', 'Broker', 'Enterprise'],
  },
  vi: {
    eyebrow: 'Hợp tác',
    title: 'Hợp lực không gian. Hợp lực tăng trưởng. Hợp tác cùng HiLink.',
    lead: 'Dù bạn mang đến toà nhà, khách hàng hay nguồn vốn, luôn có cách hợp tác cùng HiLink — và cùng định hình cách Việt Nam làm việc.',
    dirLabel: 'Chọn hướng hợp tác', whyE: 'Vì sao hợp tác', whyT: 'Vì sao hợp tác với HiLink',
    why: 'Chúng tôi kết hợp thiết kế cao cấp, vận hành kỷ luật và tệp thành viên tăng trưởng nhanh. Đối tác có được thương hiệu uy tín, mô hình đã kiểm chứng và một đội ngũ thực thi.',
    whyItems: [
      { t: 'Thương hiệu uy tín', d: 'Địa chỉ cao cấp được thành viên nhận biết và tìm đến.' },
      { t: 'Vận hành đã kiểm chứng', d: 'Mô hình kỷ luật giúp lấp đầy và vận hành tốt.' },
      { t: 'Nguồn cầu tăng trưởng', d: 'Dòng khách hàng đang tìm không gian tiếp theo.' },
      { t: 'Lợi ích đồng thuận', d: 'Chúng tôi chỉ thắng khi đối tác thắng.' },
    ],
    partnersE: 'Đối tác', partnersT: 'Đồng hành cùng những tên tuổi',
    paths: [
      { t: 'Cho Chủ nhà & Chủ sở hữu', tag: 'Chủ nhà', path: '/partnerships/landlords', photo: '/photos/f19-window.webp' },
      { t: 'Cho Môi giới', tag: 'Môi giới', path: '/partnerships/brokers', photo: '/photos/hbc-client-meeting.webp' },
      { t: 'Cho Doanh nghiệp', tag: 'Doanh nghiệp', path: '/partnerships/enterprise', photo: '/photos/f15-boardroom.webp' },
    ],
    more: 'Xem thêm trên hilink.vn',
    formE: 'Nhà phát triển & nhà cung cấp dịch vụ', formT: 'Trao đổi ngay',
    formLead: 'Nhà phát triển và nhà cung cấp dịch vụ doanh nghiệp: hãy giới thiệu về tổ chức của bạn và cách bạn muốn hợp tác.',
    interests: ['Nhà phát triển', 'Nhà cung cấp dịch vụ doanh nghiệp', 'Chủ nhà hoặc chủ sở hữu', 'Môi giới', 'Doanh nghiệp'],
  },
};

export function PartnersPage() {
  const { lang } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.lead);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} photo="/photos/hbc-meeting.webp" />

      <Section tone="cream">
        <SectionHead eyebrow={t.dirLabel} title={t.whyT} lead={t.why} />
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-14">
          {t.paths.map((p, i) => (
            <Reveal key={p.path} delay={i * 0.08}>
              <PhotoCard photo={p.photo} eyebrow={p.tag} title={p.t} href={ws(lang, p.path)} cta={t.more} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead eyebrow={t.whyE} title={t.whyT} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {t.whyItems.map((w) => (
            <div key={w.t} className="bg-[#0F0F0F] p-8 lg:p-10">
              <h3 className="mb-3">{w.t}</h3>
              <p className="text-[#EAE3D2]/75">{w.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow={t.partnersE} title={t.partnersT} center />
        <PartnerLogos />
      </Section>

      <Section tone="cream" id="contact">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow">{t.formE}</p>
            <h2 className="mb-6">{t.formT}</h2>
            <p className="text-[#555]">{t.formLead}</p>
          </div>
          <div className="lg:col-span-7 relative">
            <LeadForm formType="partnership" source="/partners" fields={['company', 'phone', 'interest', 'message']} interests={t.interests} />
          </div>
        </div>
      </Section>
    </>
  );
}
