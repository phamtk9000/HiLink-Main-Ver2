import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useLang } from '../lib/i18n';
import { CONTACT, SERVICES, ws } from '../data/site';

const MAIN_LINKS = [
  { path: '/solutions', en: 'Solutions', vi: 'Giải pháp' },
  { path: '/about', en: 'About', vi: 'Giới thiệu' },
  { path: '/partners', en: 'Partners', vi: 'Đối tác' },
  { path: '/careers', en: 'Careers', vi: 'Tuyển dụng' },
  { path: '/news', en: 'News', vi: 'Tin tức' },
  { path: '/contact', en: 'Contact', vi: 'Liên hệ' },
];

const T = {
  en: { menu: 'Menu', close: 'Close', book: 'Book a consultation', ours: 'Our solutions', touch: 'Get in touch', ws: 'HiLink Workspaces', toggle: 'Open menu' },
  vi: { menu: 'Menu', close: 'Đóng', book: 'Đặt lịch tư vấn', ours: 'Giải pháp của chúng tôi', touch: 'Liên hệ', ws: 'HiLink Workspaces', toggle: 'Mở menu' },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { lang, l, switchTo } = useLang();
  const t = T[lang];
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [isOpen]);

  const onDark = isOpen;

  return (
    <>
      <header
        className={`sticky top-0 z-[60] transition-colors duration-300 ${
          onDark
            ? 'bg-transparent'
            : isScrolled
              ? 'bg-[#F8F6F1]/90 backdrop-blur-md shadow-[0_1px_16px_rgba(0,0,0,0.06)]'
              : 'bg-[#F8F6F1] border-b border-[#0F0F0F]/10'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[76px]">
            <Link to={l('/')} className="flex items-center shrink-0" aria-label="HiLink — Your Solution">
              <img
                src={onDark ? '/brand/hilink-logo-light.png' : '/brand/hilink-logo.png'}
                alt="HiLink — Your Solution"
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            <div className="flex items-center gap-5 sm:gap-7">
              <div className={`flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.14em] ${onDark ? 'text-[#F8F6F1]' : 'text-[#0F0F0F]'}`}>
                {(['en', 'vi'] as const).map((code, i) => (
                  <span key={code} className="flex items-center gap-1">
                    {i > 0 && <span className="opacity-30">/</span>}
                    <Link
                      to={switchTo(code)}
                      aria-current={lang === code ? 'true' : undefined}
                      className={`transition-colors ${lang === code ? (onDark ? 'text-[#D8BE86]' : 'text-[#7A653B]') : 'opacity-50 hover:opacity-100'}`}
                    >
                      {code.toUpperCase()}
                    </Link>
                  </span>
                ))}
              </div>

              {!onDark && (
                <Link
                  to={l('/book-consultation')}
                  className="hidden md:inline-flex items-center gap-2 px-6 py-[10px] bg-[#0F0F0F] text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:bg-[#A88F5C] transition-colors"
                >
                  {t.book}
                </Link>
              )}

              <button
                onClick={() => setIsOpen((o) => !o)}
                className={`flex items-center gap-3 ${onDark ? 'text-[#F8F6F1]' : 'text-[#0F0F0F]'}`}
                aria-label={t.toggle}
                aria-expanded={isOpen}
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] hidden sm:inline">
                  {isOpen ? t.close : t.menu}
                </span>
                <span className="relative w-7 h-[14px]">
                  <span className={`absolute left-0 w-7 h-[1.5px] bg-current transition-all duration-300 ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
                  <span className={`absolute left-0 w-7 h-[1.5px] bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'}`} />
                  <span className={`absolute left-0 w-7 h-[1.5px] bg-current transition-all duration-300 ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {!onDark && (
          <motion.div className="absolute bottom-0 left-0 h-[2px] bg-[#A88F5C] origin-left w-full" style={{ scaleX }} />
        )}
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#0F0F0F] text-[#F8F6F1] overflow-y-auto on-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 pt-[120px] pb-16 min-h-full flex flex-col">
              <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 flex-1">
                <nav className="flex flex-col justify-center">
                  {MAIN_LINKS.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: 'easeOut' }}
                    >
                      <Link
                        to={l(item.path)}
                        className="group flex items-center gap-4 py-2 lg:py-3 serif text-[2.2rem] lg:text-[3.4rem] leading-[1.05] text-[#F8F6F1] hover:text-[#D8BE86] transition-colors"
                      >
                        <span className="text-[11px] sans tracking-[0.2em] text-[#D8BE86] opacity-70 w-8 pt-4">0{i + 1}</span>
                        {item[lang]}
                        <ArrowUpRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D8BE86]" size={28} />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="flex flex-col justify-center gap-12 lg:border-l border-white/10 lg:pl-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div>
                    <p className="eyebrow">{t.ours}</p>
                    <div className="flex flex-col gap-3">
                      {SERVICES.map((s) => (
                        <Link key={s.path} to={l(s.path)} className="text-[15px] text-[#F8F6F1]/80 hover:text-[#D8BE86] hover:translate-x-1 transition-all w-fit">
                          {s.t[lang]}
                        </Link>
                      ))}
                      <a href={ws(lang)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[15px] text-[#F8F6F1]/80 hover:text-[#D8BE86] transition-colors w-fit">
                        {t.ws} <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="eyebrow">{t.touch}</p>
                    <a href={CONTACT.emailHref} className="block serif text-2xl text-[#F8F6F1] hover:text-[#D8BE86] transition-colors">{CONTACT.email}</a>
                    <a href={CONTACT.phoneHref} className="block text-[#F8F6F1]/70 mt-2 hover:text-[#D8BE86] transition-colors">{CONTACT.phone}</a>
                    <Link
                      to={l('/book-consultation')}
                      className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#A88F5C] text-white text-[11px] font-medium uppercase tracking-[0.18em] hover:bg-[#F8F6F1] hover:text-[#0F0F0F] transition-colors"
                    >
                      {t.book} <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-10 mt-10 border-t border-white/10 text-[11px] uppercase tracking-[0.18em] text-[#F8F6F1]/50">
                <span>{CONTACT.address[lang]}</span>
                <span>© {new Date().getFullYear()} HiLink Vietnam</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
