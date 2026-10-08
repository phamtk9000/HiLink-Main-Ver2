import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import type { Bi, Lang } from '../data/site';

// Every URL carries its language: /en/... or /vi/... (same rule as hilink.vn).
// The language comes from the URL, so a shared link opens in the language it
// was copied in, and search engines see two distinct pages.
export const LANGS: Lang[] = ['en', 'vi'];
export const isLang = (v: unknown): v is Lang => v === 'en' || v === 'vi';

export const stripLang = (path: string) => path.replace(/^\/(en|vi)(?=\/|$)/, '') || '/';
export const withLang = (lang: Lang, path: string) => `/${lang}${path === '/' ? '' : path}`;

export function useLang() {
  const { lang: raw } = useParams();
  const { pathname, search, hash } = useLocation();
  const lang: Lang = isLang(raw) ? raw : 'en';
  return {
    lang,
    /** Prefix an internal path with the current language. */
    l: (path: string) => withLang(lang, path),
    /** The current page in the other language. */
    switchTo: (to: Lang) => withLang(to, stripLang(pathname)) + search + hash,
    /** Pick the string for the current language. */
    t: (v: Bi) => v[lang],
  };
}

/** Sets <html lang>, the tab title and the meta description for a page. */
export function usePageMeta(title: string, description?: string) {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = title ? `${title} | HiLink` : 'HiLink — Your Solution';
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
      }
      m.setAttribute('content', description);
    }
  }, [lang, title, description]);
}
