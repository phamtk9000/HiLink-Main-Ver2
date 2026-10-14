import { Fragment } from 'react';
import { Outlet, useLocation, useParams } from 'react-router';
import { Header } from './Header';
import { Footer } from './FooterNew';
import { CookieConsent } from './CookieConsent';
import { ScrollToTop } from './ScrollToTop';
import { PatternDrift, ScrollMotion, SmoothScroll } from '../lib/motion';

export function RootLayout() {
  const { pathname } = useLocation();
  const { lang } = useParams();
  return (
    <>
      <SmoothScroll />
      <PatternDrift />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#2A2623] focus:px-5 focus:py-3 focus:text-[13px] focus:text-white focus:outline-none">{lang === 'vi' ? 'Bỏ qua đến nội dung' : 'Skip to content'}</a>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <ScrollToTop />
          {/* Remount the page per path, so scroll motion always starts from
              fresh markup (headings split into lines are never re-rendered). */}
          <Fragment key={pathname}>
            <Outlet />
          </Fragment>
          <ScrollMotion />
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </>
  );
}
