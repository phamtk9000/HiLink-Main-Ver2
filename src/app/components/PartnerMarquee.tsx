// Partner logos in an endless strip, after the stripe.com/enterprise marquee:
// the edges fade out (mask 5% each side), every logo sits in one quiet tone
// and shows its own colours under the pointer, and the strip slows to half
// speed while it is hovered (30s → 60s a loop on Stripe; the rate is changed
// on the running animation so it does not jump).
//
// Reduced motion: no movement, the logos wrap onto as many rows as they need.
import { useEffect, useRef } from 'react';
import { PARTNERS } from '../data/site';

// Optical sizing: wide wordmarks get less height than square marks so every
// logo carries about the same visual weight.
const height = (w: number, h: number) => Math.round(Math.min(40, Math.max(18, 34 * Math.sqrt(3 / (w / h)))));

export function PartnerMarquee({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const rate = (r: number) => track.getAnimations().forEach((a) => a.updatePlaybackRate(r));
    const slow = () => rate(0.5);
    const fast = () => rate(1);
    track.addEventListener('pointerenter', slow);
    track.addEventListener('pointerleave', fast);
    return () => {
      track.removeEventListener('pointerenter', slow);
      track.removeEventListener('pointerleave', fast);
    };
  }, []);

  const logos = (copy: number) =>
    PARTNERS.map((p) => (
      <li key={`${copy}-${p.id}`} className="flex h-[100px] shrink-0 items-center px-8 lg:px-12" aria-hidden={copy > 0 || undefined}>
        <img
          src={p.src}
          alt={copy ? '' : p.name}
          width={p.w}
          height={p.h}
          loading="lazy"
          decoding="async"
          className={`hl-logo w-auto ${tone === 'light' ? 'hl-logo--light' : ''}`}
          style={{ height: height(p.w, p.h) }}
        />
      </li>
    ));

  return (
    <div className={`hl-marquee relative overflow-hidden ${className}`}>
      <ul ref={trackRef} className="hl-marquee__track flex w-max items-center">
        {logos(0)}
        {logos(1)}
      </ul>
    </div>
  );
}
