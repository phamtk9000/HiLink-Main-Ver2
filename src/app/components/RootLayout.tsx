import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './FooterNew';
import { LanguageProvider } from '../context/LanguageContext';
import { CookieConsent } from './CookieConsent';
import { ScrollToTop } from './ScrollToTop';

export function RootLayout() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <ScrollToTop />
          <Outlet />
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </LanguageProvider>
  );
}
