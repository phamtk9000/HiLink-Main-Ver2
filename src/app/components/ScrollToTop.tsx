import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Resets scroll to the top on route (pathname) change.
// Skips when a hash is present so in-page anchor links (e.g. #case-studies) still work.
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
