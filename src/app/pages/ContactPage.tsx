import { Mail, MapPin, Phone } from 'lucide-react';
import { LOCATIONS } from '../data/locations';
import { CONTACT, SOCIAL, ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { PageHero, Section } from '../components/Kit';
import { LeadForm } from '../components/LeadForm';

const T = {
  en: {
    eyebrow: 'Contact', title: 'Talk to HiLink.', lead: 'Tell us what you need — a workspace, help with a property, or support for your business — and the right person will get back to you.',
    formT: 'Send us a message', reach: 'Reach us directly', email: 'Email', phone: 'Phone', office: 'Office', follow: 'Follow us',
    locT: 'Our locations', visit: 'Visit a location',
    interests: ['Workspace', 'Property & asset management', 'Business services', 'Concierge services', 'Industrial & logistics', 'Partnership', 'Something else'],
  },
  vi: {
    eyebrow: 'Liên hệ', title: 'Trao đổi với HiLink.', lead: 'Cho chúng tôi biết bạn cần gì — không gian làm việc, hỗ trợ về bất động sản hay dịch vụ cho doanh nghiệp — người phụ trách sẽ liên hệ lại với bạn.',
    formT: 'Gửi lời nhắn', reach: 'Liên hệ trực tiếp', email: 'Email', phone: 'Điện thoại', office: 'Văn phòng', follow: 'Theo dõi',
    locT: 'Các địa điểm', visit: 'Ghé thăm một địa điểm',
    interests: ['Không gian làm việc', 'Quản lý bất động sản & tài sản', 'Dịch vụ doanh nghiệp', 'Dịch vụ concierge', 'Công nghiệp & logistics', 'Hợp tác', 'Nhu cầu khác'],
  },
};

export function ContactPage() {
  const { lang } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.lead);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} photo="/photos/f15-reception.webp" />

      <Section tone="cream">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-7 relative">
            <h2 className="mb-10">{t.formT}</h2>
            <LeadForm formType="general" source="/contact" fields={['company', 'phone', 'interest', 'message']} interests={t.interests} />
          </div>

          <aside className="lg:col-span-5 space-y-10">
            <div>
              <p className="eyebrow">{t.reach}</p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <Mail size={18} className="shrink-0 mt-1 text-[#7A653B]" />
                  <div><p className="text-[12px] text-[#666]">{t.email}</p><a href={CONTACT.emailHref} className="serif text-[1.3rem] hover:text-[#7A653B]">{CONTACT.email}</a></div>
                </li>
                <li className="flex gap-4">
                  <Phone size={18} className="shrink-0 mt-1 text-[#7A653B]" />
                  <div><p className="text-[12px] text-[#666]">{t.phone}</p><a href={CONTACT.phoneHref} className="serif text-[1.3rem] hover:text-[#7A653B]">{CONTACT.phone}</a></div>
                </li>
                <li className="flex gap-4">
                  <MapPin size={18} className="shrink-0 mt-1 text-[#7A653B]" />
                  <div><p className="text-[12px] text-[#666]">{t.office}</p><p>{CONTACT.address[lang]}</p></div>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">{t.locT}</p>
              <ul className="divide-y divide-[#0F0F0F]/10 border-y border-[#0F0F0F]/10">
                {LOCATIONS.map((loc) => (
                  <li key={loc.id}>
                    <a href={ws(lang, `/locations/${loc.id}`)} target="_blank" rel="noopener noreferrer" className="flex justify-between gap-4 py-3 text-[14px] hover:text-[#7A653B]">
                      <span>{loc.name}</span><span className="text-[#666]">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">{t.follow}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[14px] border-b border-[#0F0F0F]/25 hover:text-[#7A653B]">{s.label}</a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
