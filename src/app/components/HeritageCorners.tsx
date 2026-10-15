// Two engraved corner ornaments, at the top left and bottom right of a
// section (Concierge, the statement), so a short centred line does not sit in
// an empty field: a stepped rule turning the corner and a finer one inside
// it, two quarter arcs in the angle and small red lozenges at the ends, as on
// old Hanoi shopfronts and letterheads. When the section comes into view each one slides in from its
// corner and draws itself, slowly; the second follows the first. The same
// on touch screens (it is scroll, not hover). Reduced motion shows them drawn.
import { useEffect, useRef, useState } from 'react';

function Corner({ className }: { className: string }) {
  const line = { pathLength: 1, className: 'hl-corner__line' } as const;
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden="true" className={`hl-corner ${className}`}>
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="square">
        <path {...line} d="M4 150V36h12V18h18V4h116" />
        <path {...line} d="M24 112V24h88" />
        <path {...line} d="M24 62a38 38 0 0 0 38-38" />
        <path {...line} d="M24 46a22 22 0 0 0 22-22" />
      </g>
      <g className="hl-corner__gem" fill="#D12126">
        <path d="M150 0l4 4-4 4-4-4z" />
        <path d="M4 146l4 4-4 4-4-4z" />
        <path d="M24 20l4 4-4 4-4-4z" />
      </g>
    </svg>
  );
}

export function HeritageCorners() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 text-[#6B645D] ${inView ? 'is-in' : ''}`}>
      <Corner className="left-5 top-8 sm:left-8 lg:left-[max(2rem,calc(50%-560px))] lg:top-12" />
      <Corner className="hl-corner--end bottom-8 right-5 rotate-180 sm:right-8 lg:right-[max(2rem,calc(50%-560px))] lg:bottom-12" />
    </div>
  );
}
