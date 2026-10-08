import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollTopNow } from '../lib/motion';

// Resets scroll to the top on route (pathname) change, without the eased
// glide. Skips when a hash is present so in-page anchor links still work.
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    scrollTopNow();
  }, [pathname, hash]);

  return null;
}
