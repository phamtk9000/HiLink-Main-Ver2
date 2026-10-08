import { Link } from 'react-router';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { COMPANY, CONTACT, SOCIAL } from '../data/site';

const ICONS = { LinkedIn: Linkedin, Instagram, Facebook };
const socials = SOCIAL.map((s) => ({ ...s, Icon: ICONS[s.label as keyof typeof ICONS] }));

const T = {
  en: {
    cta1: "Let's build something", cta2: 'exceptional', book: 'Book a Consultation',
    blurb: 'Premium real estate solutions for international clients seeking excellence in Vietnam.',
    follow: 'Follow Us', solutions: 'Solutions', company: 'Company', contact: 'Contact',
    sol: ['Property Management', 'Workspace Leasing', 'Concierge Services', 'Business Services', 'Industrial & Logistics'],
    comp: ['About Us', 'Partners', 'Careers', 'News', 'All Solutions', 'Contact'],
    rights: 'All rights reserved.', privacy: 'Privacy Policy', terms: 'Terms and Conditions', code: 'Enterprise code',
  },
  vi: {
    cta1: 'Cùng xây dựng điều', cta2: 'khác biệt', book: 'Đặt lịch tư vấn',
    blurb: 'Giải pháp bất động sản cao cấp cho khách hàng quốc tế tìm kiếm sự xuất sắc tại Việt Nam.',
    follow: 'Theo dõi', solutions: 'Giải pháp', company: 'Công ty', contact: 'Liên hệ',
    sol: ['Quản lý bất động sản', 'Cho thuê văn phòng', 'Dịch vụ concierge', 'Dịch vụ doanh nghiệp', 'Công nghiệp & logistics'],
    comp: ['Về chúng tôi', 'Đối tác', 'Tuyển dụng', 'Tin tức', 'Tất cả giải pháp', 'Liên hệ'],
    rights: 'Bảo lưu mọi quyền.', privacy: 'Chính sách bảo mật', terms: 'Điều khoản & Điều kiện', code: 'Mã số doanh nghiệp',
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang, l } = useLang();
  const t = T[lang];

  return (
    <footer className="bg-[#F4F0EA] text-[#2A2623] border-t-2 border-[#D12126]/35">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24">
        {/* Pre-footer CTA band */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-16 mb-16 border-b border-[#2A2623]/10">
          <h2 className="serif text-4xl lg:text-5xl leading-tight max-w-2xl">{t.cta1} <span className="text-[#D12126]">{t.cta2}</span>.</h2>
          <Link to={l('/book-consultation')} className="shrink-0 inline-flex items-center gap-2 px-9 py-4 bg-[#D12126] text-white text-[11px] uppercase tracking-[0.18em] hover:bg-[#A3181C] transition-colors">
            {t.book}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-4">
            <img src="/brand/hilink-logo.png" alt="HiLink — Your Solution" className="h-12 w-auto mb-6" />
            <p className="text-[#6B645D] text-base leading-relaxed mb-8">
              {t.blurb}
            </p>
            <Link
              to={l('/book-consultation')}
              className="inline-block px-8 py-3 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors"
            >
              {t.book}
            </Link>

            <div className="mt-10">
              <h4 className="text-xs uppercase tracking-wider text-[#6B645D] mb-4">{t.follow}</h4>
              <div className="flex gap-4">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center border border-[#2A2623]/20 text-[#6B645D] hover:bg-[#D12126] hover:border-[#D12126] hover:text-white transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm uppercase tracking-wider mb-6">{t.solutions}</h4>
            <nav className="space-y-3">
              {[
                '/property-management', '/workspace-leasing', '/concierge-services', '/business-services', '/industrial-logistics',
              ].map((to, i) => ({ to, label: t.sol[i] })).map(({ to, label }) => (
                <Link key={to} to={l(to)} className="block text-[#6B645D] hover:text-[#D12126] transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm uppercase tracking-wider mb-6">{t.company}</h4>
            <nav className="space-y-3">
              {[
                '/about', '/partners', '/careers', '/news', '/solutions', '/contact',
              ].map((to, i) => ({ to, label: t.comp[i] })).map(({ to, label }) => (
                <Link key={to} to={l(to)} className="block text-[#6B645D] hover:text-[#D12126] transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm uppercase tracking-wider mb-6">{t.contact}</h4>
            <address className="not-italic space-y-3 text-[#6B645D]">
              <p>
                <a href={CONTACT.emailHref} className="hover:text-[#D12126] transition-colors">
                  {CONTACT.email}
                </a>
              </p>
              <p>
                <a href={CONTACT.phoneHref} className="hover:text-[#D12126] transition-colors">
                  {CONTACT.phone}
                </a>
              </p>
              <p>{CONTACT.address[lang]}</p>
            </address>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#2A2623]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6B645D] text-sm">
            © {currentYear} {COMPANY.name[lang]} · {t.code} {COMPANY.enterpriseCode}. {t.rights}
          </p>
          <div className="flex gap-8 text-sm">
            <Link to={l('/privacy-policy')} className="text-[#6B645D] hover:text-[#D12126] transition-colors">
              {t.privacy}
            </Link>
            <Link to={l('/terms')} className="text-[#6B645D] hover:text-[#D12126] transition-colors">
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
