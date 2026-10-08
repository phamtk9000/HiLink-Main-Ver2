import { CONTACT, ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { PageHero, Section, TextLink } from '../components/Kit';
import { LeadForm } from '../components/LeadForm';

const T = {
  en: {
    eyebrow: 'Book a consultation', title: 'Start with a conversation.',
    lead: 'Tell us about your business and what you are looking for. We will suggest a time to meet — at a HiLink location or online.',
    steps: ['You tell us what you need', 'We arrange a time to meet', 'We propose a solution, in writing'],
    tourT: 'Just want to see a workspace?', tourD: 'Book a tour of any HiLink location directly on hilink.vn.', tour: 'Book a tour',
    interests: ['Workspace', 'Property & asset management', 'Business services', 'Concierge services', 'Industrial & logistics', 'Not sure yet'],
    messageLabel: 'What would you like to discuss?',
  },
  vi: {
    eyebrow: 'Đặt lịch tư vấn', title: 'Bắt đầu bằng một cuộc trò chuyện.',
    lead: 'Hãy cho chúng tôi biết về doanh nghiệp và điều bạn đang tìm. Chúng tôi sẽ hẹn thời gian gặp — tại một địa điểm HiLink hoặc trực tuyến.',
    steps: ['Bạn cho chúng tôi biết nhu cầu', 'Chúng tôi hẹn lịch gặp', 'Chúng tôi đề xuất giải pháp bằng văn bản'],
    tourT: 'Chỉ muốn xem không gian làm việc?', tourD: 'Đặt lịch tham quan bất kỳ địa điểm HiLink nào ngay trên hilink.vn.', tour: 'Đặt lịch tham quan',
    interests: ['Không gian làm việc', 'Quản lý bất động sản & tài sản', 'Dịch vụ doanh nghiệp', 'Dịch vụ concierge', 'Công nghiệp & logistics', 'Chưa chắc chắn'],
    messageLabel: 'Bạn muốn trao đổi về điều gì?',
  },
};

export function BookConsultationPage() {
  const { lang } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.lead);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} photo="/photos/hbc-meeting.webp" />

      <Section tone="cream">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
          <aside className="lg:col-span-4">
            <ol className="space-y-6 mb-14">
              {t.steps.map((s, i) => (
                <li key={s} className="flex gap-5">
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-[#7A653B] pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[1.0625rem]">{s}</span>
                </li>
              ))}
            </ol>
            <div className="border-t border-[#0F0F0F]/10 pt-8 mb-10">
              <h3 className="mb-3">{t.tourT}</h3>
              <p className="text-[#555] mb-5">{t.tourD}</p>
              <TextLink href={ws(lang, '/book-a-tour')}>{t.tour}</TextLink>
            </div>
            <div className="border-t border-[#0F0F0F]/10 pt-8">
              <a href={CONTACT.emailHref} className="block serif text-[1.3rem] hover:text-[#7A653B]">{CONTACT.email}</a>
              <a href={CONTACT.phoneHref} className="block mt-1 text-[#555] hover:text-[#7A653B]">{CONTACT.phone}</a>
            </div>
          </aside>

          <div className="lg:col-span-8 relative">
            <LeadForm
              formType="consultation"
              source="/book-consultation"
              fields={['company', 'phone', 'interest', 'date', 'message']}
              interests={t.interests}
              messageLabel={t.messageLabel}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
