import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem('hilink_consent');
    if (consentGiven === 'true') return;

    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code !== 'VN') {
          setShowBanner(true);
        }
      })
      .catch(() => {
        // Silently fail — don't show banner if geo check fails
      });
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hilink_consent', 'true');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[200] bg-[#111] text-white px-6 py-6"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-center md:text-left text-[#EAE3D2]">
              We use cookies to improve your experience. By continuing, you agree to our Privacy Policy.
            </p>
            <div className="flex gap-3 shrink-0">
              <a
                href="/privacy-policy"
                className="px-6 py-2 border border-white/30 text-white/70 text-xs uppercase tracking-wider hover:border-white hover:text-white transition-colors"
              >
                Learn More
              </a>
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-[#A88F5C] text-white text-xs uppercase tracking-wider hover:bg-[#C9A84C] transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
