import { Link } from 'react-router';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { COMPANY, CONTACT, SERVICES, SOCIAL } from '../data/site';

const ICONS = { LinkedIn: Linkedin, Instagram, Facebook };
const socials = SOCIAL.map((s) => ({ ...s, Icon: ICONS[s.label as keyof typeof ICONS] }));

const T = {
  en: {
    blurb: 'Workspace, property and business services in central Hanoi — under one relationship.',
    group: 'A member of HiCorp Group.',
    solutions: 'Solutions', company: 'Company', contact: 'Contact',
    comp: ['About Us', 'Partners', 'Careers', 'News', 'All Solutions', 'Contact'],
    privacy: 'Privacy Policy', terms: 'Terms and Conditions', code: 'Enterprise code',
  },
  vi: {
    blurb: 'Không gian làm việc, bất động sản và dịch vụ doanh nghiệp giữa trung tâm Hà Nội — trong một mối quan hệ.',
    group: 'Thành viên Tập đoàn HiCorp.',
    solutions: 'Giải pháp', company: 'Công ty', contact: 'Liên hệ',
    comp: ['Về chúng tôi', 'Đối tác', 'Tuyển dụng', 'Tin tức', 'Tất cả giải pháp', 'Liên hệ'],
    privacy: 'Chính sách bảo mật', terms: 'Điều khoản & Điều kiện', code: 'Mã số doanh nghiệp',
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang, l } = useLang();
  const t = T[lang];

  const link = 'text-[#6B645D] hover:text-[#D12126] transition-colors';
  const head = 'text-[12px] uppercase tracking-[0.2em] text-[#2A2623] mb-4';

  return (
    <footer className="bg-[#F4F0EA] text-[#2A2623] border-t-2 border-[#D12126]/35">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-10 text-[14px]">
          <div className="col-span-2 md:col-span-4">
            <img src="/brand/logo-hilink-lockup.svg" alt="HiLink — Your Solution" className="h-10 w-auto" />
            <p className="mt-4 max-w-xs text-[#6B645D] leading-relaxed">{t.blurb}</p>
            <p className="mt-3 text-[13px] text-[#6B645D]">{t.group}</p>
          </div>

          <nav className="md:col-span-3" aria-label={t.solutions}>
            <p className={head}>{t.solutions}</p>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.path}><Link to={l(s.path)} className={link}>{s.t[lang]}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label={t.company}>
            <p className={head}>{t.company}</p>
            <ul className="space-y-2">
              {['/about', '/partners', '/careers', '/news', '/solutions', '/contact'].map((to, i) => (
                <li key={to}><Link to={l(to)} className={link}>{t.comp[i]}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3">
            <p className={head}>{t.contact}</p>
            <address className="not-italic space-y-2 text-[#6B645D]">
              <p><a href={CONTACT.emailHref} className={link}>{CONTACT.email}</a> · <a href={CONTACT.phoneHref} className={link}>{CONTACT.phone}</a></p>
              <p>{CONTACT.address[lang]}</p>
            </address>
            <div className="mt-4 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center border border-[#2A2623]/15 text-[#6B645D] hover:bg-[#D12126] hover:border-[#D12126] hover:text-white transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#2A2623]/10 flex flex-col md:flex-row justify-between gap-3 text-[13px] text-[#6B645D]">
          <p>© {currentYear} {COMPANY.name[lang]} · {t.code} {COMPANY.enterpriseCode}</p>
          <div className="flex gap-6">
            <Link to={l('/privacy-policy')} className={link}>{t.privacy}</Link>
            <Link to={l('/terms')} className={link}>{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
