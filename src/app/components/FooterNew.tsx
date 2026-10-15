// The footer, after themalin.co: on a plain cream ground (no pattern),
// columns under bold capital headings — the solutions, the company, the
// sections of the forum — then the social links, the address in capitals and
// the fine print; the HiLink mark large in the lower right.
import { Link } from 'react-router';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { COMPANY, CONTACT, SERVICES, SOCIAL } from '../data/site';
import { FORUM_CATEGORIES } from '../data/forum';

const ICONS = { LinkedIn: Linkedin, Instagram, Facebook };
const socials = SOCIAL.map((s) => ({ ...s, Icon: ICONS[s.label as keyof typeof ICONS] }));

const T = {
  en: {
    group: 'A member of HiCorp Group.',
    solutions: 'Solutions', company: 'Company', forum: 'HiLink Forum', contact: 'Contact',
    comp: ['About Us', 'Business Club', 'Partners', 'Careers', 'All Solutions', 'Contact'],
    privacy: 'Privacy Policy', terms: 'Terms and Conditions', code: 'Enterprise code', rights: 'All rights reserved.',
  },
  vi: {
    group: 'Thành viên Tập đoàn HiCorp.',
    solutions: 'Giải pháp', company: 'Công ty', forum: 'Diễn đàn HiLink', contact: 'Liên hệ',
    comp: ['Về chúng tôi', 'Business Club', 'Đối tác', 'Tuyển dụng', 'Tất cả giải pháp', 'Liên hệ'],
    privacy: 'Chính sách bảo mật', terms: 'Điều khoản & Điều kiện', code: 'Mã số doanh nghiệp', rights: 'Bảo lưu mọi quyền.',
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang, l } = useLang();
  const t = T[lang];

  const link = 'text-[16px] leading-[1.6] text-[#2A2623]/85 hover:text-[#D12126] transition-colors';
  const head = 'mb-3 text-[15px] font-bold uppercase tracking-[0.04em] text-[#2A2623]';

  return (
    <footer className="bg-[#F8F6F1] text-[#2A2623]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-16 pb-10 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 lg:flex lg:gap-x-[4.5rem]">
          <nav aria-label={t.solutions}>
            <p className={head}>{t.solutions}</p>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.path}><Link to={l(s.path)} className={link}>{s.t[lang]}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t.company}>
            <p className={head}>{t.company}</p>
            <ul>
              {['/about', '/business-club', '/partners', '/careers', '/solutions', '/contact'].map((to, i) => (
                <li key={to}><Link to={l(to)} className={link}>{t.comp[i]}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t.forum}>
            <p className={head}>{t.forum}</p>
            <ul>
              {FORUM_CATEGORIES.map((c) => (
                <li key={c.id}><Link to={l(`/forum#${c.id.toLowerCase()}`)} className={link}>{c[lang]}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={head}>{t.contact}</p>
            <ul>
              <li><a href={CONTACT.phoneHref} className={link}>{CONTACT.phone}</a></li>
              <li><a href={CONTACT.emailHref} className={link}>{CONTACT.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-[#2A2623] hover:text-[#D12126] transition-colors">
                  <Icon size={26} strokeWidth={1.6} />
                </a>
              ))}
            </div>
            <address className="mt-5 not-italic text-[15px] font-bold uppercase leading-snug tracking-[0.02em] text-[#2A2623]">{CONTACT.address[lang]}</address>
            <p className="mt-2 text-[13px] text-[#6B645D]">
              © {currentYear} {COMPANY.name[lang]}. {t.rights} {t.code} {COMPANY.enterpriseCode}. {t.group}
            </p>
            <p className="mt-1.5 flex gap-5 text-[13px]">
              <Link to={l('/privacy-policy')} className="text-[#6B645D] hover:text-[#D12126] transition-colors">{t.privacy}</Link>
              <Link to={l('/terms')} className="text-[#6B645D] hover:text-[#D12126] transition-colors">{t.terms}</Link>
            </p>
          </div>
          <img src="/brand/logo-hilink-lockup.svg" alt="HiLink — Your Solution" className="h-20 w-auto self-start sm:h-28 lg:h-36 lg:self-end" />
        </div>
      </div>
    </footer>
  );
}
