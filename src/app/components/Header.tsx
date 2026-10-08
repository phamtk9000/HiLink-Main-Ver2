import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useLang } from '../lib/i18n';
import { CONTACT } from '../data/site';

const MAIN_LINKS = [
  { en: 'Solutions', vi: 'Giải pháp', path: '/solutions' },
  { en: 'About', vi: 'Giới thiệu', path: '/about' },
  { en: 'Partners', vi: 'Đối tác', path: '/partners' },
  { en: 'Careers', vi: 'Tuyển dụng', path: '/careers' },
  { en: 'News', vi: 'Tin tức', path: '/news' },
  { en: 'Contact', vi: 'Liên hệ', path: '/contact' },
];

const SERVICE_LINKS = [
  { en: 'Property Management', vi: 'Quản lý bất động sản', path: '/property-management' },
  { en: 'Workspace Leasing', vi: 'Cho thuê văn phòng', path: '/workspace-leasing' },
  { en: 'Business Services', vi: 'Dịch vụ doanh nghiệp', path: '/business-services' },
  { en: 'Concierge Services', vi: 'Dịch vụ concierge', path: '/concierge-services' },
  { en: 'Industrial & Logistics', vi: 'Công nghiệp & logistics', path: '/industrial-logistics' },
];

const T = {
  en: { book: 'Book Consultation', menu: 'Menu', close: 'Close', ours: 'Our Solutions', touch: 'Get in touch', cta: 'Book a Consultation', addr: '60 Ly Thai To, Hoan Kiem · 4 Ton That Tung, Dong Da — Ha Noi', toggle: 'Toggle menu' },
  vi: { book: 'Đặt lịch tư vấn', menu: 'Menu', close: 'Đóng', ours: 'Giải pháp của chúng tôi', touch: 'Liên hệ', cta: 'Đặt lịch tư vấn', addr: '60 Lý Thái Tổ, Hoàn Kiếm · 4 Tôn Thất Tùng, Đống Đa — Hà Nội', toggle: 'Mở menu' },
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
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  // Lock body scroll while the overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const onDark = isOpen;

  return (
    <>
      <header
        className={`sticky top-0 z-[60] transition-colors duration-300 ${
          onDark
            ? 'bg-transparent'
            : isScrolled
              ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_16px_rgba(0,0,0,0.06)]'
              : 'bg-white border-b border-[#2A2623]/10'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[76px]">
            {/* Logo */}
            <Link
              to={l('/')}
              className="flex items-center shrink-0"
              aria-label="HiLink — Your Solution"
            >
              <img
                src="/brand/hilink-logo.png"
                alt="HiLink — Your Solution"
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            {/* Right cluster */}
            <div className="flex items-center gap-5 sm:gap-7">
              {/* Language */}
              <div className={`flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#2A2623]`}>
                <Link to={switchTo('en')} className={`transition-colors ${lang === 'en' ? 'text-[#D12126]' : 'opacity-45 hover:opacity-100'}`}>EN</Link>
                <span className="opacity-30">/</span>
                <Link to={switchTo('vi')} className={`transition-colors ${lang === 'vi' ? 'text-[#D12126]' : 'opacity-45 hover:opacity-100'}`}>VI</Link>
              </div>

              {/* Consultation — desktop only, hidden when overlay open */}
              {!onDark && (
                <Link
                  to={l('/book-consultation')}
                  className="hidden md:inline-flex items-center gap-2 px-6 py-[10px] bg-[#361716] text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:bg-[#D12126] transition-colors"
                >
                  {t.book}
                </Link>
              )}

              {/* Menu toggle */}
              <button
                onClick={() => setIsOpen((o) => !o)}
                className={`flex items-center gap-3 group text-[#2A2623]`}
                aria-label={t.toggle}
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

        {/* Scroll progress */}
        {!onDark && (
          <motion.div className="absolute bottom-0 left-0 h-[2px] bg-[#D12126] origin-left w-full" style={{ scaleX }} />
        )}
      </header>

      {/* ── Full-screen overlay menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#F4F0EA] text-[#2A2623] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* faint gold grid accent */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{ backgroundImage: 'linear-gradient(#D12126 1px, transparent 1px), linear-gradient(90deg, #D12126 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

            <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 pt-[120px] pb-16 min-h-full flex flex-col">
              <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 flex-1">
                {/* Primary nav */}
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
                        className="group flex items-center gap-4 py-2 lg:py-3 serif text-[2.4rem] lg:text-[4rem] leading-[1.05] text-[#2A2623] hover:text-[#D12126] transition-colors"
                      >
                        <span className="text-[11px] sans tracking-[0.2em] text-[#D12126] opacity-60 w-8 pt-4">0{i + 1}</span>
                        {item[lang]}
                        <ArrowUpRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D12126]" size={28} />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Secondary: services + contact */}
                <motion.div
                  className="flex flex-col justify-center gap-12 border-l border-[#2A2623]/10 lg:pl-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-6">{t.ours}</p>
                    <div className="flex flex-col gap-3">
                      {SERVICE_LINKS.map((s) => (
                        <Link key={s.path} to={l(s.path)} className="text-[15px] text-[#6B645D] hover:text-[#D12126] hover:translate-x-1 transition-all w-fit">
                          {s[lang]}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#D12126] mb-6">{t.touch}</p>
                    <a href={CONTACT.emailHref} className="block serif text-2xl text-[#2A2623] hover:text-[#D12126] transition-colors">{CONTACT.email}</a>
                    <a href={CONTACT.phoneHref} className="block text-[#6B645D] mt-2 hover:text-[#D12126] transition-colors">{CONTACT.phone}</a>
                    <Link
                      to={l('/book-consultation')}
                      className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#D12126] text-white text-[11px] uppercase tracking-[0.18em] hover:bg-[#A3181C] transition-colors"
                    >
                      {t.cta} <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Footer row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-10 border-t border-[#2A2623]/10 text-[11px] uppercase tracking-[0.18em] text-[#6B645D]">
                <span>{t.addr}</span>
                <span>© {new Date().getFullYear()} HiLink Vietnam</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
