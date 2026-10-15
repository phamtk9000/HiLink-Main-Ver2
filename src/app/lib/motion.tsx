// Scroll motion for the whole site, modelled on the HiPress about page:
//
//   1. Eased scroll (Lenis) that settles onto the next section when the wheel
//      stops with it in the top half of the screen.
//   2. Section headings rise a line at a time, each line out of its own mask.
//   3. Cards and grid items rise into place in reading order — left to right,
//      then the next row — and the copy under a heading follows it in, with
//      the timing of mercury.com (50px rise, 0.67s, a slight overshoot).
//   4. Large photographs drift a little slower than the page (parallax).
//
// The pages keep their own markup: everything here works on the rendered DOM
// of the current route, and is torn down and rebuilt on every route change.
// RootLayout remounts the page per pathname, so a split heading is never
// re-rendered by React with stale text nodes.
//
// All of it is off for visitors who ask for reduced motion.
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import 'lenis/dist/lenis.css';
import type Lenis from 'lenis';
import type { SplitText as SplitTextType } from 'gsap/SplitText';

declare global {
  interface Window { __lenis?: Lenis }
}

// GSAP and Lenis are not needed for the first paint, so they load as their
// own chunk once the page is up. Cached: every caller shares one import.
type MotionLibs = {
  gsap: typeof import('gsap').gsap;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
  SplitText: typeof import('gsap/SplitText').SplitText;
  Lenis: typeof import('lenis').default;
};
// mercury.com: translate cubic-bezier(.28,1.1,.74,1) .67s after .15s; opacity
// cubic-bezier(.59,.41,.68,.49) .67s.
const RISE = 'hlRise';
const FADE = 'hlFade';
let libs: Promise<MotionLibs> | null = null;
const loadMotion = () =>
  (libs ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/SplitText'), import('lenis'), import('gsap/CustomEase')]).then(
    ([g, st, sp, l, ce]) => {
      g.gsap.registerPlugin(st.ScrollTrigger, sp.SplitText, ce.CustomEase);
      ce.CustomEase.create(RISE, '.28,1.1,.74,1');
      ce.CustomEase.create(FADE, '.59,.41,.68,.49');
      return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText, Lenis: l.default };
    },
  ));

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Jump to the top with no glide — for a route change. */
export function scrollTopNow() {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

/** Bring an element to just under the sticky header: eased unless asked not to
    (or the visitor prefers reduced motion). */
export function scrollToEl(el: HTMLElement, smooth = true) {
  const header = document.querySelector('header')?.getBoundingClientRect().height ?? 76;
  // A target that sets its own scroll margin (to clear a sticky bar under the header) keeps it.
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - Math.max(header + 16, margin));
  const ease = smooth && !reducedMotion();
  // An even glide (ease in and out), longer for a longer way, 0.8–1.6s.
  const duration = Math.min(1.6, Math.max(0.8, 0.7 + Math.abs(y - window.scrollY) / 4000));
  const easing = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  if (window.__lenis) window.__lenis.scrollTo(y, ease ? { duration, easing, force: true } : { immediate: true, force: true });
  else window.scrollTo({ top: y, behavior: ease ? 'smooth' : 'auto' });
}

/** A click on an in-page link (a quick nav): glide to its target once, and
    put the hash in the address without a second jump. Returns the time the
    glide takes, in ms. */
export function glideTo(e: { preventDefault(): void; stopPropagation(): void }, id: string) {
  const el = document.getElementById(id);
  if (!el) return 0;
  e.preventDefault();
  e.stopPropagation(); // the smooth-scroll library would otherwise start its own scroll to the anchor
  const before = window.scrollY;
  scrollToEl(el);
  window.history.replaceState(window.history.state, '', `#${id}`);
  const header = document.querySelector('header')?.getBoundingClientRect().height ?? 76;
  return Math.min(1600, Math.max(800, 700 + Math.abs(el.getBoundingClientRect().top + before - header - before) / 4)) + 150;
}

/** Eased page scroll; on the home page it also settles on sections (wheel and trackpad only). */
export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return undefined;
    let cancelled = false;
    let cleanup = () => {};
    loadMotion().then(({ gsap, ScrollTrigger, Lenis }) => {
    if (cancelled) return;
    // Duration-based easing (rather than lerp) keeps every wheel step the same
    // length, which reads smoother on trackpads and mice alike.
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, anchors: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Stopping points: the top of every tall section in <main>, the footer
    // and the end of the page, measured afresh each time the scroll rests.
    const points = () => {
      const y0 = lenis.scroll;
      const vh = window.innerHeight;
      const out = [0];
      document.querySelectorAll<HTMLElement>('main section, footer').forEach((el) => {
        if (el.parentElement?.closest('section')) return; // nested sections belong to their parent
        if (el.offsetHeight < vh * 0.25) return;
        out.push(Math.round(el.getBoundingClientRect().top + y0));
      });
      out.push(Math.max(0, Math.round(lenis.limit)));
      return [...new Set(out)].filter((v) => v >= 0 && v <= lenis.limit + 1).sort((a, b) => a - b);
    };

    let idle = 0;
    let dir = 1;
    // Settling helps the home page read as a sequence of panels; on long
    // reading pages (About, legal…) it would pull people off their paragraph.
    const isHome = () => /^\/(en|vi)?\/?$/.test(window.location.pathname);
    const settle = () => {
      if (lenis.isStopped || !isHome()) return;
      if (lenis.isScrolling) { idle = window.setTimeout(settle, 120); return; }
      const y = lenis.scroll;
      const vh = window.innerHeight;
      const pts = points();
      const ahead = dir > 0 ? pts.find((p) => p > y + 2) : [...pts].reverse().find((p) => p < y - 2);
      const behind = dir > 0 ? [...pts].reverse().find((p) => p <= y + 2) : pts.find((p) => p >= y - 2);
      let target: number | null = null;
      if (ahead !== undefined && Math.abs(ahead - y) <= vh * 0.5) target = ahead;
      else if (behind !== undefined && Math.abs(y - behind) > 2 && Math.abs(y - behind) <= vh * 0.18) target = behind;
      if (target === null) return;
      // The sticky header is 76px tall; land the section just under it.
      const header = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
      const to = target === 0 || target >= lenis.limit ? target : Math.max(0, target - header);
      if (Math.abs(to - y) < 4) return;
      lenis.scrollTo(to, { duration: 0.9, easing: (t) => 1 - Math.pow(1 - t, 4), userData: { settle: true } });
    };
    if (window.matchMedia('(pointer: fine)').matches) {
      lenis.on('scroll', (e: Lenis & { userData?: { settle?: boolean } }) => {
        if (e.userData?.settle) return;
        if (e.direction) dir = e.direction;
        window.clearTimeout(idle);
        idle = window.setTimeout(settle, 140);
      });
    }

    cleanup = () => {
      window.clearTimeout(idle);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
    });
    return () => { cancelled = true; cleanup(); };
  }, []);
  return null;
}

/** Has an ancestor (or itself) already animated by framer-motion? */
const animatedByFramer = (el: Element) => {
  for (let n: Element | null = el; n && n.tagName !== 'MAIN'; n = n.parentElement) {
    const s = (n as HTMLElement).getAttribute('style') ?? '';
    if (/opacity|transform/.test(s)) return true;
  }
  return false;
};

/** Reveals and parallax for the current route's <main>. */
export function ScrollMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || reducedMotion()) return undefined;
    const splits: SplitTextType[] = [];
    let ctx: { revert: () => void } | undefined;
    let raf = 0;
    let cancelled = false;
    let refresh = () => {};
    let timer = 0;

    loadMotion().then(({ gsap, ScrollTrigger, SplitText }) => {
    if (cancelled) return;
    refresh = () => { window.clearTimeout(timer); timer = window.setTimeout(() => ScrollTrigger.refresh(), 120); };
    document.addEventListener('load', refresh, true);
    document.fonts?.ready.then(refresh).catch(() => {});
    // Wait one frame so the new page has laid out.
    raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // 1. Headings: h2 everywhere in main, h1 unless framer already animates it.
        main.querySelectorAll<HTMLElement>('h1, h2').forEach((el) => {
          if (el.tagName === 'H1' && animatedByFramer(el)) return;
          if (el.closest('[aria-hidden="true"], button, a')) return;
          const isHero = el.tagName === 'H1';
          const split = SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'line-mask__line',
            aria: 'auto',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 135,
                duration: isHero ? 1.05 : 0.85,
                ease: 'expo.out',
                stagger: 0.08,
                delay: isHero ? 0.15 : 0,
                scrollTrigger: isHero ? undefined : { trigger: el, start: 'top 85%', once: true },
              }),
          });
          splits.push(split);
        });

        // 2. Cards: the items of every grid (and of any [data-reveal-group]
        //    row or carousel) rise in reading order. Items arriving together
        //    are sorted top-to-bottom, then left-to-right, and staggered.
        const cards: HTMLElement[] = [];
        main.querySelectorAll<HTMLElement>('section .grid, [data-reveal-group]').forEach((grid) => {
          if (grid.closest('header, footer, [aria-hidden="true"]')) return;
          const items = [...grid.children].filter(
            (c): c is HTMLElement => c instanceof HTMLElement && !c.getAttribute('style') && !animatedByFramer(c) && c.offsetHeight > 0,
          );
          if (items.length < 2 || items.length > 24) return;
          items.forEach((c) => { if (!cards.includes(c) && !cards.some((p) => p.contains(c))) cards.push(c); });
        });
        if (cards.length) {
          gsap.set(cards, { autoAlpha: 0, y: 50 });
          ScrollTrigger.batch(cards, {
            start: 'top 92%',
            once: true,
            interval: 0.08,
            onEnter: (batch) => {
              const els = (batch as HTMLElement[]).slice().sort((a, b) => {
                const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
                return Math.abs(ra.top - rb.top) > 12 ? ra.top - rb.top : ra.left - rb.left;
              });
              gsap.to(els, { y: 0, duration: 0.67, delay: 0.15, ease: RISE, stagger: 0.09, overwrite: 'auto', clearProps: 'transform' });
              gsap.to(els, { autoAlpha: 1, duration: 0.67, ease: FADE, stagger: 0.09, clearProps: 'opacity,visibility' });
            },
          });
        }

        // 2b. The copy that follows a section heading (lead, buttons) comes in
        //     just after the heading's lines, the same way.
        main.querySelectorAll<HTMLElement>('section h2').forEach((h2) => {
          if (h2.closest('[aria-hidden="true"], button, a, .grid')) return;
          const parent = h2.parentElement;
          if (!parent) return;
          const after = [...parent.children].filter(
            (c): c is HTMLElement =>
              c instanceof HTMLElement && c !== h2 && !!(h2.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING) &&
              /^(P|A|UL|DIV|FORM)$/.test(c.tagName) && c.offsetHeight < 420 && !c.querySelector('.grid, img, canvas, form') &&
              !cards.includes(c) && !c.getAttribute('style') && !animatedByFramer(c),
          ).slice(0, 3);
          if (!after.length) return;
          gsap.set(after, { autoAlpha: 0, y: 50 });
          ScrollTrigger.create({
            trigger: h2,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(after, { y: 0, duration: 0.67, delay: 0.25, ease: RISE, stagger: 0.08, clearProps: 'transform' });
              gsap.to(after, { autoAlpha: 1, duration: 0.67, delay: 0.1, ease: FADE, stagger: 0.08, clearProps: 'opacity,visibility' });
            },
          });
        });

        // 2c. Framed media that grows to full size as it comes up the screen.
        main.querySelectorAll<HTMLElement>('[data-scroll-grow]').forEach((el) => {
          gsap.fromTo(el, { scale: 0.92 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 25%', scrub: 0.6 } });
        });

        // 2d. Lines that fill as their section is read ([data-scroll-progress]):
        //     scaleX on wide screens, scaleY when the line runs down the page.
        main.querySelectorAll<HTMLElement>('[data-scroll-progress]').forEach((el) => {
          const horizontal = el.getBoundingClientRect().width > el.getBoundingClientRect().height;
          gsap.fromTo(el, horizontal ? { scaleX: 0 } : { scaleY: 0 }, {
            ...(horizontal ? { scaleX: 1 } : { scaleY: 1 }),
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top 80%', end: 'bottom 55%', scrub: 0.6 },
          });
        });

        // 3. Parallax: large photographs that are not links and not already animated.
        main.querySelectorAll<HTMLImageElement>('section img').forEach((img) => {
          if (img.closest('a, button') || img.getAttribute('style') || animatedByFramer(img)) return;
          const frame = img.parentElement;
          if (!frame || img.getBoundingClientRect().height < 320) return;
          if (getComputedStyle(frame).overflow === 'visible' && !img.classList.contains('absolute')) return;
          gsap.fromTo(
            img,
            { yPercent: -5, scale: 1.12 },
            {
              yPercent: 5,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });
      }, main);

      // Images and web fonts change the page height after load; keep the
      // trigger positions in step with them.
      ScrollTrigger.refresh();
    });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      document.removeEventListener('load', refresh, true);
      ctx?.revert();
      splits.forEach((s) => s.revert());
    };
  }, [pathname]);

  return null;
}

/** Lets the background pattern (theme.css) drift slowly against the scroll. */
export function PatternDrift() {
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const onScroll = () => document.documentElement.style.setProperty('--pat-drift', `${Math.round(window.scrollY * -0.06)}px`);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}
