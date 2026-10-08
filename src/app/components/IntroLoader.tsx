import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'exit'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress tied to actual page load
    const start = performance.now();
    const minDuration = 1800; // minimum ms to show intro

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min((elapsed / minDuration) * 100, 100);
      setProgress(Math.floor(pct));

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        // Wait for document ready too
        const finish = () => {
          setTimeout(() => {
            setPhase('exit');
            setTimeout(onDone, 900);
          }, 300);
        };
        if (document.readyState === 'complete') {
          finish();
        } else {
          window.addEventListener('load', finish, { once: true });
        }
      }
    };

    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0F0F0F] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <img
              src="/brand/hilink-logo-light.png"
              alt="HiLink — Your Solution"
              className="w-auto mb-3"
              style={{ height: 'clamp(64px, 12vw, 110px)' }}
            />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#D12126]">
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
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">Loading</span>
              <span className="text-[9px] tracking-wider text-white/20 font-mono">{progress}%</span>
            </div>
            <div className="h-px w-full bg-white/10 overflow-hidden">
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
