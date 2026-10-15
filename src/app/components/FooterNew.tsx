// The footer, after themalin.co and to its measurements (1440: 376px tall,
// 29px in from the edge, columns spread to 320px at the user's request, headings on a 22px line, links
// every 28px, 28px social icons, the address on a 23px line, the mark
// 125px tall); their condensed face is matched by size of eye in Inter.
// On a plain cream ground (no pattern),
// columns under bold capital headings — the solutions, the company, the
// sections of the forum — then the social links with the phone and email
// beside them, the address in capitals and
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
    solutions: 'Solutions', company: 'Company', forum: 'HiLink Forum',
    comp: ['About Us', 'Business Club', 'Partners', 'Careers', 'All Solutions', 'Contact'],
    privacy: 'Privacy Policy', terms: 'Terms and Conditions', code: 'Enterprise code', rights: 'All rights reserved.',
  },
  vi: {
    group: 'Thành viên Tập đoàn HiCorp.',
    solutions: 'Giải pháp', company: 'Công ty', forum: 'Diễn đàn HiLink',
    comp: ['Về chúng tôi', 'Business Club', 'Đối tác', 'Tuyển dụng', 'Tất cả giải pháp', 'Liên hệ'],
    privacy: 'Chính sách bảo mật', terms: 'Điều khoản & Điều kiện', code: 'Mã số doanh nghiệp', rights: 'Bảo lưu mọi quyền.',
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang, l } = useLang();
  const t = T[lang];

  const link = 'block text-[15px] leading-[28px] text-[#2A2623]/85 hover:text-[#D12126] transition-colors';
  const head = 'mb-1 text-[15px] font-bold uppercase leading-[22px] tracking-[0.02em] text-[#2A2623]';

  return (
    <footer className="bg-[#F8F6F1] text-[#2A2623]">
      <div className="px-6 pt-10 pb-9 lg:px-[29px] lg:pt-[29px] lg:pb-[38px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:flex lg:gap-x-0 [&>*]:lg:w-[320px]">
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
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:-mt-[30px] lg:flex-row lg:items-end lg:justify-between">
          <div>
            {/* the social links, and beside them the ways to reach HiLink */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:mt-[48px]">
              <div className="flex gap-[6px]">
                {socials.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-[#2A2623] hover:text-[#D12126] transition-colors">
                    <Icon size={28} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
              <p className="flex flex-wrap gap-x-6 gap-y-1 text-[15px] text-[#2A2623]/85">
                <a href={CONTACT.phoneHref} className="hover:text-[#D12126] transition-colors">{CONTACT.phone}</a>
                <a href={CONTACT.emailHref} className="hover:text-[#D12126] transition-colors">{CONTACT.email}</a>
              </p>
            </div>
            <address className="mt-[10px] not-italic text-[15px] font-bold uppercase leading-[23px] tracking-[0.01em] text-[#2A2623]">{CONTACT.address[lang]}</address>
            <p className="mt-0.5 text-[12px] leading-[18px] text-[#6B645D]">
              © {currentYear} {COMPANY.name[lang]}. {t.rights} {t.code} {COMPANY.enterpriseCode}. {t.group}
            </p>
            <p className="flex gap-5 text-[12px] leading-[18px]">
              <Link to={l('/privacy-policy')} className="text-[#6B645D] hover:text-[#D12126] transition-colors">{t.privacy}</Link>
              <Link to={l('/terms')} className="text-[#6B645D] hover:text-[#D12126] transition-colors">{t.terms}</Link>
            </p>
          </div>
          <img src="/brand/logo-hilink-lockup.svg" alt="HiLink — Your Solution" className="h-20 w-auto self-start sm:h-24 lg:h-[125px] lg:self-end" />
        </div>
      </div>
    </footer>
  );
}
