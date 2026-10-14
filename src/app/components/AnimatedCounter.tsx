import { useEffect, useRef, useState } from 'react';

// A figure that rolls up into place one digit at a time, like a mechanical
// counter settling (the HiPress RollingNumber). Each digit is a column of
// 0–9 twice over inside a mask, translated so the right numeral lands on the
// line; the resting state shows the same digit one cycle lower, so the number
// reads correctly before, during and after the roll. Digits settle left to
// right. Suffixes such as "+", "%" or "/7" stay static.
const COLUMN = [...'01234567890123456789'];

export function AnimatedCounter({ end, duration = 1.6, suffix = '', prefix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [rolled, setRolled] = useState(false);
  const digits = String(end).split('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setRolled(true); return undefined; }
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      raf = requestAnimationFrame(() => requestAnimationFrame(() => setRolled(true)));
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <span className="sr-only">{`${prefix}${end}${suffix}`}</span>
      {prefix && <span aria-hidden="true">{prefix}</span>}
      {digits.map((d, i) => {
        const n = Number(d);
        // Rest one cycle lower (index n), roll to the second cycle (n + 10).
        const index = rolled ? n + 10 : n;
        return (
          <span key={i} aria-hidden="true" className="relative inline-block overflow-hidden" style={{ height: '1em', lineHeight: 1 }}>
            <span
              className="flex flex-col"
              style={{
                transform: `translateY(-${index}em)`,
                transition: rolled ? `transform ${duration + i * 0.12}s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s` : 'none',
              }}
            >
              {COLUMN.map((c, k) => <span key={k} style={{ height: '1em', lineHeight: 1 }}>{c}</span>)}
            </span>
          </span>
        );
      })}
      {suffix && <span aria-hidden="true">{suffix}</span>}
    </span>
  );
}
