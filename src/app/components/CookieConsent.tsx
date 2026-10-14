import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useLang } from '../lib/i18n';

const KEY = 'hilink_consent';

const T = {
  en: { text: 'We use cookies to run this site and remember your preferences, such as language.', more: 'Privacy Policy', accept: 'Accept', decline: 'Essential only' },
  vi: { text: 'Chúng tôi dùng cookie để vận hành trang web và ghi nhớ lựa chọn của bạn, như ngôn ngữ.', more: 'Chính sách bảo mật', accept: 'Đồng ý', decline: 'Chỉ cookie cần thiết' },
};

// Shown to every visitor until they choose. No geolocation lookup: asking a
// third-party service for the visitor's country would itself send their IP away.
export function CookieConsent() {
  const { lang, l } = useLang();
  const t = T[lang];
  const [show, setShow] = useState(false);

  useEffect(() => {
    try { setShow(!localStorage.getItem(KEY)); } catch { setShow(true); }
  }, []);

  const choose = (value: 'all' | 'essential') => {
    try { localStorage.setItem(KEY, value); } catch { /* private mode — just hide */ }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookies"
          className="fixed bottom-0 left-0 right-0 z-[200] bg-[#361716] text-white px-6 py-5"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[13.5px] text-center md:text-left text-[#F8F6F1]">
              {t.text}{' '}
              <Link to={l('/privacy-policy')} className="underline hover:text-white">{t.more}</Link>
            </p>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => choose('essential')} className="px-6 py-2 border border-white/30 text-white/80 text-[12px] uppercase tracking-wider hover:border-white hover:text-white transition-colors">
                {t.decline}
              </button>
              <button onClick={() => choose('all')} className="px-6 py-2 bg-[#D12126] text-white text-[12px] uppercase tracking-wider hover:bg-[#A3181C] transition-colors">
                {t.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
