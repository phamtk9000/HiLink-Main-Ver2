import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroLoader({ onDone, lang }: { onDone: () => void; lang: 'en' | 'vi' }) {
  const [phase, setPhase] = useState<'loading' | 'exit'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // A short brand moment, not a wait: the page renders underneath from the
    // start, so the intro never holds content back for slow images or fonts.
    const start = performance.now();
    const minDuration = 650;
    let raf = 0;
    let t1 = 0;
    let t2 = 0;

    const tick = () => {
      const pct = Math.min(((performance.now() - start) / minDuration) * 100, 100);
      setProgress(Math.floor(pct));
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        t1 = window.setTimeout(() => {
          setPhase('exit');
          t2 = window.setTimeout(onDone, 500);
        }, 120);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <img
              src="/brand/logo-hilink-lockup.svg"
              alt="HiLink — Your Solution"
              className="w-auto mb-3"
              style={{ height: 'clamp(64px, 12vw, 110px)' }}
            />
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126]">
              Your Solution
            </p>
          </motion.div>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-12 left-12 right-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] uppercase tracking-[0.2em] text-[#2A2623]/50">{lang === 'vi' ? 'Đang tải' : 'Loading'}</span>
              <span className="text-[12px] tracking-wider text-[#2A2623]/50 tabular-nums">{progress}%</span>
            </div>
            <div className="h-px w-full bg-[#2A2623]/10 overflow-hidden">
              <motion.div
                className="h-full bg-[#D12126]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
