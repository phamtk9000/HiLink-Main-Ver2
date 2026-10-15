// The footer, after themalin.co (29px in from the edge, columns 320px apart,
// bold capital headings, 28px social icons, the mark 96px tall), given more
// height at the user's request so nothing is pressed together (then made a
// little smaller twice): links every 28px, a little room around them.
// On a plain cream ground (no pattern), columns under bold capital headings,
// the longest first: the company (with the privacy policy and terms), the
// solutions, the sections of the forum. Then the social links, the address
// in capitals and the copyright; the HiLink mark large in the lower right.
// The phone and email are in the closing call to action above (CtaContact).
import { Link } from 'react-router';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { CONTACT, SERVICES, SOCIAL } from '../data/site';
import { FORUM_CATEGORIES } from '../data/forum';

const ICONS = { LinkedIn: Linkedin, Instagram, Facebook };
const socials = SOCIAL.map((s) => ({ ...s, Icon: ICONS[s.label as keyof typeof ICONS] }));

const T = {
  en: {
    solutions: 'Solutions', company: 'Company', forum: 'HiLink Forum',
    comp: ['About Us', 'Business Club', 'Partners', 'Careers', 'Privacy Policy', 'Terms and Conditions'],
  },
  vi: {
    solutions: 'Giải pháp', company: 'Công ty', forum: 'Diễn đàn HiLink',
    comp: ['Về chúng tôi', 'Business Club', 'Đối tác', 'Tuyển dụng', 'Chính sách bảo mật', 'Điều khoản & Điều kiện'],
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang, l } = useLang();
  const t = T[lang];

  const link = 'block text-[15px] leading-[28px] text-[#2A2623]/85 hover:text-[#D12126] transition-colors';
  const head = 'mb-2 text-[15px] font-bold uppercase leading-[22px] tracking-[0.02em] text-[#2A2623]';

  return (
    <footer className="bg-[#F8F6F1] text-[#2A2623]">
      <div className="px-6 pt-10 pb-8 lg:px-[29px] lg:pt-[34px] lg:pb-[28px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:flex lg:gap-x-0 [&>*]:lg:w-[320px]">
          <nav aria-label={t.company}>
            <p className={head}>{t.company}</p>
            <ul>
              {['/about', '/business-club', '/partners', '/careers', '/privacy-policy', '/terms'].map((to, i) => (
                <li key={to}><Link to={l(to)} className={link}>{t.comp[i]}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t.solutions}>
            <p className={head}>{t.solutions}</p>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.path}><Link to={l(s.path)} className={link}>{s.t[lang]}</Link></li>
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

        <div className="mt-10 flex flex-col gap-8 lg:mt-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex gap-[10px]">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-[#2A2623] hover:text-[#D12126] transition-colors">
                  <Icon size={28} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <address className="mt-4 not-italic text-[15px] font-bold uppercase leading-[24px] tracking-[0.01em] text-[#2A2623]">{CONTACT.address[lang]}</address>
            <p className="mt-2 text-[12px] leading-[18px] text-[#6B645D]">© {currentYear} HiLink</p>
          </div>
          <img src="/brand/logo-hilink-lockup.svg" alt="HiLink — Your Solution" className="h-16 w-auto self-start sm:h-[72px] lg:h-[96px] lg:self-end" />
        </div>
      </div>
    </footer>
  );
}
