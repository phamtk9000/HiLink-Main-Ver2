// The small flag that leads an eyebrow, after the Stripe Treasury glyph
// (a 14×14 parallelogram). It is cut into four strips that rise in turn, so a
// slow ripple runs across it; it unfurls from the left the first time it is
// drawn. Colour is currentColor. Motion lives in theme.css (.hl-flag).
const TOP = (x: number) => 2.887 - 0.2062 * x;
const BOT = (x: number) => 14 - 0.2101 * x;
const STRIPS = [0, 1, 2, 3].map((i) => {
  const x0 = i * 3.5 + (i ? 0.12 : 0);
  const x1 = (i + 1) * 3.5 - (i < 3 ? 0.12 : 0);
  const f = (n: number) => n.toFixed(2);
  return `${f(x0)},${f(TOP(x0))} ${f(x1)},${f(TOP(x1))} ${f(x1)},${f(BOT(x1))} ${f(x0)},${f(BOT(x0))}`;
});

export function Flag({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" width="12" height="12" className={`hl-flag shrink-0 ${className}`} aria-hidden="true" fill="currentColor">
      {STRIPS.map((points, i) => (
        <polygon key={i} points={points} style={{ animationDelay: `${i * 0.11}s` }} />
      ))}
    </svg>
  );
}
