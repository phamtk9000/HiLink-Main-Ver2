import { Fragment } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './FooterNew';
import { CookieConsent } from './CookieConsent';
import { ScrollToTop } from './ScrollToTop';
import { PatternLight, ScrollMotion, SmoothScroll } from '../lib/motion';

export function RootLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <SmoothScroll />
      <PatternLight />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
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
