// "What's happening" — the ten newest posts of this site's forum (/forum),
// after the squeezy carousel on stripe.com. Its numbers and motion are
// Stripe's own, read from their source (14/10/2026): seven cards show at a
// time — the chosen one, as wide as the row is tall × 16/9 less 6% of what is
// left, then three taking 61%, 30% and 15% of what is left, then three
// slivers of 8px; 16px between the first four, 8px between the slivers; 6px
// corners; the row is 1232 × 460 at full width. Every photograph is drawn at
// the chosen card's size and only cut narrower, so a card squeezes rather
// than shrinks. Moving on, the chosen card shrinks to a sliver and slides out
// to the left while the next grows into its place, over 1s, easing out
// (exponential). Pointing at one of the first four widens it (to 0, 71%, 40%
// or 25%) and narrows the rest; pointing at a sliver widens it 3px; a click
// brings that card to the front. The chosen post carries its section, the
// HiLink mark (large, white, at its foot on the left; the next two carry it
// small) and a button to read it; its title and line sit below.
// Phones get Stripe's phone version: a row of cards to swipe, each with its
// title and line beneath, the ones beside the current card a little smaller.
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { FORUM_CATEGORIES, FORUM_POSTS as POSTS } from '../data/forum';
import { useLang } from '../lib/i18n';
import { Flag } from './Flag';
import { photo } from '../lib/photo';

const T = {
  en: { eyebrow: 'HiLink Forum', title: "What's happening.", sub: 'See the latest from HiLink.', read: 'Read article', all: 'Visit the forum', prev: 'Previous post', next: 'Next post' },
  vi: { eyebrow: 'Diễn đàn HiLink', title: 'Có gì mới.', sub: 'Tin mới nhất từ HiLink.', read: 'Đọc bài viết', all: 'Vào diễn đàn', prev: 'Bài trước', next: 'Bài sau' },
};

const CATEGORY = Object.fromEntries(FORUM_CATEGORIES.map((c) => [c.id, c])) as Record<string, { en: string; vi: string }>;

// stripe.com's squeezy carousel.
const SMALL_GAP = 8, LARGE_GAP = 16, SMALL = 8, SMALL_HOVER = 3, DURATION = 1000;
const FLEX = [-0.06, 0.61, 0.3, 0.15];
const SQUEEZED = [-0.12, 0.59, 0.28, 0.13];
const STRETCHED = [0, 0.71, 0.4, 0.25];
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// Each post is laid out three times over, so a post can leave on the left
// while it comes in again on the right.
const COPIES = 3;

type Card = { item: number; el: number; x: number; width: number; gap: number; col: number; w0: number; g0: number; w1: number; g1: number };

export function ForumCarousel() {
  const { lang, l } = useLang();
  const t = T[lang];
  const navigate = useNavigate();
  const n = POSTS.length;
  const [active, setActive] = useState(0);
  const [phoneAt, setPhoneAt] = useState(0);
  const row = useRef<HTMLDivElement>(null);
  const lead = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const strip = useRef<HTMLDivElement>(null);
  const api = useRef<{ next: (k: number) => void; prev: (k: number) => void } | null>(null);
  // Opening a post from a click on the chosen card (kept current without restarting the row).
  const open = useRef((slug: string) => {});
  open.current = (slug: string) => navigate(l(`/forum/${slug}`));
  const post = POSTS[active];

  useEffect(() => {
    const box = row.current;
    if (!box || n < 2) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 200 : DURATION;
    const numSmall = Math.max(1, Math.min(3, n - 4));
    const visible = 4 + numSmall;
    const totalGap = SMALL_GAP * numSmall + 3 * LARGE_GAP;
    let W = 0, H = 0, colOne = 0, medium = 0;
    let fractions = [...FLEX], hovered = -1;
    let offset = 0, offset0 = 0, offset1 = 0, colOffset = 0;
    let mediumOff = 0, mediumOff0 = 0, mediumOff1 = 0;
    let start = 0, raf = 0;
    const used = new Set<number>();
    const take = (item: number) => {
      for (let c = 0; c < COPIES; c++) { const el = item * COPIES + c; if (!used.has(el)) { used.add(el); return el; } }
      return item * COPIES;
    };
    const width = (col: number) => {
      if (col < 0 || col > 3) return SMALL + (hovered === col ? mediumOff1 : 0);
      return col === 0 ? colOne + (medium - mediumOff1) * fractions[0] : (medium - mediumOff1) * fractions[col];
    };
    const blank = (): Omit<Card, 'item' | 'el'> => ({ x: 0, width: SMALL, gap: SMALL_GAP, col: 0, w0: SMALL, g0: SMALL_GAP, w1: SMALL, g1: SMALL_GAP });
    let cards: Card[] = Array.from({ length: Math.min(visible, n) }, (_, i) => ({ item: i, el: take(i), ...blank(), col: i }));

    const render = () => {
      cards.forEach((c, k) => { c.x = k === 0 ? offset : cards[k - 1].x + cards[k - 1].width + c.gap; });
      const on = new Map(cards.map((c) => [c.el, c]));
      els.current.forEach((el, i) => {
        if (!el) return;
        const c = on.get(i);
        if (!c || c.x + c.width < 0 || c.x > W) { el.style.visibility = 'hidden'; return; }
        el.style.visibility = 'visible';
        el.style.transform = `translate3d(${c.x}px,0,0)`;
        el.style.width = `${c.width}px`;
        const img = el.firstElementChild as HTMLElement | null;
        if (img) { img.style.width = `${colOne}px`; img.style.left = `${(c.width - colOne) / 2}px`; }
      });
      const front = cards.find((c) => c.col === 0);
      if (front && lead.current) { lead.current.style.transform = `translate3d(${front.x}px,0,0)`; lead.current.style.width = `${front.width}px`; }
    };
    // Which place each card is heading for (the mark and the shade follow it, in CSS).
    const mark = () => {
      used.clear();
      cards.forEach((c) => used.add(c.el));
      els.current.forEach((el, i) => { if (el) el.dataset.col = String(cards.find((c) => c.el === i)?.col ?? -1); });
    };
    const animate = (now: number) => {
      const a = easeOutExpo(Math.min((now - start) / duration, 1));
      offset = lerp(offset0, offset1, a);
      mediumOff = lerp(mediumOff0, mediumOff1, a);
      cards.forEach((c) => { c.width = lerp(c.w0, c.w1, a); c.gap = lerp(c.g0, c.g1, a); });
      render();
      if (a < 1) { raf = requestAnimationFrame(animate); return; }
      raf = 0;
      const k = cards.findIndex((c) => c.col === 0);
      cards = cards.slice(k, k + visible);
      colOffset = 0; offset = 0;
      mark(); render();
    };
    const play = (back = 0) => {
      offset0 = offset - back * (SMALL + LARGE_GAP);
      offset1 = colOffset * (SMALL + LARGE_GAP);
      mediumOff0 = mediumOff;
      mediumOff1 = !reduced && hovered > 3 ? SMALL_HOVER : 0;
      cards.forEach((c) => { c.w0 = c.width; c.g0 = c.gap; c.w1 = width(c.col); c.g1 = c.col < 4 ? LARGE_GAP : SMALL_GAP; });
      mark();
      const front = cards.find((c) => c.col === 0);
      if (front) setActive(front.item);
      start = performance.now();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(animate);
    };
    const next = (k: number) => {
      for (let i = 0; i < k; i++) {
        const item = (cards[cards.length - 1].item + 1) % n;
        cards.push({ item, el: take(item), ...blank() });
      }
      colOffset -= k;
      cards.forEach((c, i) => { c.col = i + colOffset; });
      play();
    };
    const prev = (k: number) => {
      for (let i = 0; i < k; i++) {
        const item = (cards[0].item - 1 + n) % n;
        cards.unshift({ item, el: take(item), ...blank(), gap: LARGE_GAP, g0: LARGE_GAP });
      }
      cards.forEach((c, i) => { c.col = i + colOffset; });
      play(k);
    };
    api.current = { next, prev };

    const flex = () => {
      fractions = hovered >= 0 && hovered <= 3 && !reduced
        ? FLEX.map((_, i) => (i === hovered ? STRETCHED[i] : SQUEEZED[i]))
        : [...FLEX];
      box.style.cursor = hovered >= 0 ? 'pointer' : '';
      play();
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const x = e.clientX - box.getBoundingClientRect().left;
      const col = cards.find((c) => c.x <= x && x <= c.x + c.width)?.col ?? -1;
      if (col >= 0 && col !== hovered) { hovered = col; flex(); }
    };
    const leave = () => { if (hovered !== -1) { hovered = -1; flex(); } };
    const click = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a')) return;
      const x = e.clientX - box.getBoundingClientRect().left;
      const c = cards.find((d) => d.x <= x && x <= d.x + d.width);
      if (!c) return;
      if (c.col > 0) { hovered = -1; fractions = [...FLEX]; next(c.col); } else if (c.col === 0) open.current(POSTS[c.item].slug);
    };
    let touchX: number | null = null;
    const touchStart = (e: TouchEvent) => { touchX = e.touches[0].clientX; };
    const touchEnd = (e: TouchEvent) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) { if (dx < 0) next(1); else prev(1); }
      touchX = null;
    };
    const size = () => {
      W = box.clientWidth; H = box.clientHeight;
      colOne = H * (16 / 9);
      medium = W - colOne - totalGap - SMALL * numSmall;
      cancelAnimationFrame(raf); raf = 0;
      const k = cards.findIndex((c) => c.col === 0);
      if (k > 0) { cards = cards.slice(k, k + visible); colOffset = 0; }
      offset = 0;
      cards.forEach((c) => { c.width = width(c.col); c.gap = c.col < 4 ? LARGE_GAP : SMALL_GAP; });
      mark(); render();
    };
    const ro = new ResizeObserver(size);
    ro.observe(box);
    box.addEventListener('pointermove', move);
    box.addEventListener('pointerleave', leave);
    box.addEventListener('click', click);
    box.addEventListener('touchstart', touchStart, { passive: true });
    box.addEventListener('touchend', touchEnd);
    size();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      box.removeEventListener('pointermove', move);
      box.removeEventListener('pointerleave', leave);
      box.removeEventListener('click', click);
      box.removeEventListener('touchstart', touchStart);
      box.removeEventListener('touchend', touchEnd);
    };
  }, [n]);

  // Phones: which card the row has come to rest on.
  const onStrip = () => {
    const s = strip.current, first = s?.firstElementChild as HTMLElement | null;
    if (!s || !first) return;
    const at = Math.round(s.scrollLeft / (first.offsetWidth + 16));
    if (at !== phoneAt) setPhoneAt(Math.max(0, Math.min(n - 1, at)));
  };
  const step = (d: number) => {
    const s = strip.current;
    if (s && s.offsetParent !== null) {
      const first = s.firstElementChild as HTMLElement | null;
      s.scrollTo({ left: Math.max(0, Math.min(n - 1, phoneAt + d)) * ((first?.offsetWidth ?? 0) + 16), behavior: 'smooth' });
    } else if (d > 0) api.current?.next(1);
    else api.current?.prev(1);
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white text-[#2A2623]" aria-roledescription="carousel" aria-label={t.eyebrow}>
      <div className="max-w-[1328px] mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 lg:mb-16">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 inline-flex items-center gap-2.5">
              <Flag /> {t.eyebrow}
            </p>
            <h2 className="serif leading-[1.05]">
              {t.title} <span className="text-[#6B645D]">{t.sub}</span>
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <Link
              to={l('/forum')}
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] text-[#2A2623] hover:text-[#D12126] transition-colors"
            >
              {t.all} <ArrowRight size={14} />
            </Link>
            <div className="flex gap-2">
              <button type="button" onClick={() => step(-1)} aria-label={t.prev} className="grid h-11 w-11 place-items-center rounded-full border border-[#2A2623]/15 hover:border-[#D12126] hover:text-[#D12126] transition-colors">
                <ArrowLeft size={16} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={t.next} className="grid h-11 w-11 place-items-center rounded-full border border-[#2A2623]/15 hover:border-[#D12126] hover:text-[#D12126] transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* From 768px: the squeezy row. Cards are placed by the script above. */}
        <div ref={row} className="relative hidden md:block aspect-[1232/460] overflow-hidden select-none">
          {POSTS.flatMap((p, i) => Array.from({ length: COPIES }, (_, c) => (
            <div
              key={`${p.slug}-${c}`}
              ref={(el) => { els.current[i * COPIES + c] = el; }}
              data-col="-1"
              aria-hidden="true"
              className="hl-sq-card absolute left-0 top-0 h-full overflow-hidden rounded-[6px] will-change-transform"
              style={{ visibility: 'hidden' }}
            >
              <img
                {...photo(p.image, '(min-width: 1024px) 820px, 100vw')}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute top-0 h-full max-w-none object-cover"
                style={{ width: 0, left: 0 }}
              />
              <span className="hl-sq-shade pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              <img src="/brand/logo-hilink-lockup.svg" alt="" className="hl-sq-logo pointer-events-none absolute w-auto [filter:brightness(0)_invert(1)]" />
            </div>
          )))}
          {/* What sits on the chosen card: its section and the way to read it. */}
          <div ref={lead} className="pointer-events-none absolute left-0 top-0 h-full">
            <div key={active} className="absolute inset-0 animate-[hl-fade-up_0.5s_ease_both]">
              <span className="absolute left-5 top-5 lg:left-7 lg:top-7 rounded-full bg-white/90 px-3 py-1 text-[12px] uppercase tracking-[0.18em] text-[#2A2623]">
                {CATEGORY[post.category]?.[lang] ?? post.category}
              </span>
              <Link
                to={l(`/forum/${post.slug}`)}
                className="group/read pointer-events-auto absolute bottom-5 right-5 lg:bottom-7 lg:right-7 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-[#2A2623] hover:bg-[#F8F6F1] transition-colors"
              >
                {t.read}
                <ChevronRight size={16} className="transition-transform group-hover/read:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
        <p key={active} className="hidden md:block mt-8 max-w-[820px] text-[18px] lg:text-[20px] leading-[1.3] animate-[hl-fade-up_0.5s_ease_both]" aria-live="polite">
          <span className="text-[#2A2623]">{post.title[lang]}.</span> <span className="text-[#6B645D]">{post.excerpt[lang]}</span>
        </p>

        {/* Phones: Stripe's phone row — a card per post, swiped. */}
        <div
          ref={strip}
          onScroll={onStrip}
          className="md:hidden -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {POSTS.map((p, i) => (
            <Link key={p.slug} to={l(`/forum/${p.slug}`)} className="group w-[calc(100vw-48px)] max-w-[420px] shrink-0 snap-start">
              <span className={`relative block aspect-[358/373] overflow-hidden rounded-[6px] transition-transform duration-500 ${i === phoneAt ? '' : 'scale-[0.95]'}`}>
                <img {...photo(p.image, '90vw')} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#2A2623]">{CATEGORY[p.category]?.[lang] ?? p.category}</span>
                <img src="/brand/logo-hilink-lockup.svg" alt="" aria-hidden="true" className="absolute bottom-4 left-4 h-9 w-auto [filter:brightness(0)_invert(1)] opacity-95" />
              </span>
              <span className="mt-6 block text-[16px] leading-[1.5]">
                <span className="text-[#2A2623]">{p.title[lang]}.</span> <span className="text-[#6B645D]">{p.excerpt[lang]}</span>
              </span>
              <span className="mt-4 inline-flex items-center gap-1 rounded-[4px] border border-[#2A2623]/25 px-4 py-2 text-[14px] font-medium text-[#2A2623] group-hover:border-[#D12126] group-hover:text-[#D12126] transition-colors">
                {t.read} <ChevronRight size={15} />
              </span>
            </Link>
          ))}
        </div>
        <Link
          to={l('/forum')}
          className="sm:hidden mt-8 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] text-[#2A2623]"
        >
          {t.all} <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
