import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollTopNow, scrollToEl } from '../lib/motion';

// Resets scroll to the top on route (pathname) change, without the eased
// glide. With a hash it goes to that element instead — waiting for a page
// that is still loading to put it there.
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) { scrollTopNow(); return undefined; }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0, timer = 0;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) { scrollToEl(el, false); return; }
      if (tries++ === 0) scrollTopNow();
      if (tries < 40) timer = window.setTimeout(seek, 100);
    };
    seek();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
