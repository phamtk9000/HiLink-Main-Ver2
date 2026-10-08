import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { COMPANY, CONTACT, SERVICES, SOCIAL, ws } from '../data/site';

const T = {
  en: {
    blurb: 'Workspace, property and asset management, business services and operational support — under one relationship.',
    solutions: 'Solutions', company: 'Company', contact: 'Contact', follow: 'Follow us',
    about: 'About HiLink', partners: 'Partners', careers: 'Careers', news: 'News', all: 'All solutions', contactUs: 'Contact us',
    workspaces: 'HiLink Workspaces',
    rights: 'All rights reserved.', privacy: 'Privacy Policy', terms: 'Terms & Conditions', code: 'Enterprise code',
  },
  vi: {
    blurb: 'Không gian làm việc, quản lý bất động sản và tài sản, dịch vụ doanh nghiệp và hỗ trợ vận hành — trong một mối quan hệ.',
    solutions: 'Giải pháp', company: 'Công ty', contact: 'Liên hệ', follow: 'Theo dõi',
    about: 'Về HiLink', partners: 'Đối tác', careers: 'Tuyển dụng', news: 'Tin tức', all: 'Tất cả giải pháp', contactUs: 'Liên hệ',
    workspaces: 'HiLink Workspaces',
    rights: 'Bảo lưu mọi quyền.', privacy: 'Chính sách bảo mật', terms: 'Điều khoản & Điều kiện', code: 'Mã số doanh nghiệp',
  },
};

const linkCls = 'block text-[#EAE3D2]/80 hover:text-white transition-colors';
const headCls = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8BE86] mb-6';

export function Footer() {
  const { lang, l } = useLang();
  const t = T[lang];

  return (
    <footer className="bg-[#0F0F0F] text-white border-t-2 border-[#A88F5C]/35 on-dark">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-24">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          <div className="md:col-span-4">
            <img src="/brand/hilink-logo-light.png" alt="HiLink — Your Solution" className="h-12 w-auto mb-6" />
            <p className="text-[#EAE3D2]/80 mb-8 max-w-sm">{t.blurb}</p>
            <p className={headCls}>{t.follow}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] text-[#EAE3D2]/80 hover:text-white transition-colors">
                  {s.label} <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>

          <nav className="md:col-span-3 space-y-3 text-[14px]" aria-label={t.solutions}>
            <p className={headCls}>{t.solutions}</p>
            {SERVICES.map((s) => (
              <Link key={s.path} to={l(s.path)} className={linkCls}>{s.t[lang]}</Link>
            ))}
            <a href={ws(lang)} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-1`}>
              {t.workspaces} <ArrowUpRight size={12} />
            </a>
          </nav>

          <nav className="md:col-span-2 space-y-3 text-[14px]" aria-label={t.company}>
            <p className={headCls}>{t.company}</p>
            <Link to={l('/about')} className={linkCls}>{t.about}</Link>
            <Link to={l('/partners')} className={linkCls}>{t.partners}</Link>
            <Link to={l('/careers')} className={linkCls}>{t.careers}</Link>
            <Link to={l('/news')} className={linkCls}>{t.news}</Link>
            <Link to={l('/solutions')} className={linkCls}>{t.all}</Link>
            <Link to={l('/contact')} className={linkCls}>{t.contactUs}</Link>
          </nav>

          <div className="md:col-span-3 text-[14px]">
            <p className={headCls}>{t.contact}</p>
            <address className="not-italic space-y-3 text-[#EAE3D2]/80">
              <p><a href={CONTACT.emailHref} className="hover:text-white transition-colors">{CONTACT.email}</a></p>
              <p><a href={CONTACT.phoneHref} className="hover:text-white transition-colors">{CONTACT.phone}</a></p>
              <p>{CONTACT.address[lang]}</p>
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between md:items-center gap-4 text-[12.5px] text-[#EAE3D2]/60">
          <p className="text-[12.5px]">
            © {new Date().getFullYear()} {COMPANY.name[lang]} · {t.code} {COMPANY.enterpriseCode}. {t.rights}
          </p>
          <div className="flex gap-8">
            <Link to={l('/privacy-policy')} className="hover:text-white transition-colors">{t.privacy}</Link>
            <Link to={l('/terms')} className="hover:text-white transition-colors">{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
