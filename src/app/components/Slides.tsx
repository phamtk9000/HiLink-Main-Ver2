// A frame of photographs that cross-fade by themselves, one every four
// seconds, while the frame is on screen (and stay on the first for reduced
// motion). Used for the two houses of the Business Club.
import { useEffect, useRef, useState } from 'react';
import { photo } from '../lib/photo';

export function Slides({ images, alt, sizes = '100vw', className = '', delay = 0 }: { images: string[]; alt: string; sizes?: string; className?: string; delay?: number }) {
  const [shot, setShot] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || images.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer = 0, first = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer); window.clearTimeout(first);
      if (!e.isIntersecting) return;
      first = window.setTimeout(() => {
        setShot((n) => (n + 1) % images.length);
        timer = window.setInterval(() => setShot((n) => (n + 1) % images.length), 4000);
      }, 1800 + delay);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); window.clearInterval(timer); window.clearTimeout(first); };
  }, [images.length, delay]);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[8px] bg-[#2A2623] ${className}`}>
      {images.map((src, k) => (
        <img key={src} loading="lazy" decoding="async" {...photo(src, sizes)} alt={k === 0 ? alt : ''} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${k === shot ? 'opacity-100' : 'opacity-0'}`} />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-6 flex gap-1.5" aria-hidden="true">
          {images.map((src, k) => <span key={src} className={`h-[3px] rounded-full transition-all duration-500 ${k === shot ? 'w-6 bg-white' : 'w-3 bg-white/50'}`} />)}
        </div>
      )}
    </div>
  );
}
