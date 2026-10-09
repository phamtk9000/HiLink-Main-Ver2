import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useState } from 'react';
import { IntroLoader } from './components/IntroLoader';

export default function App() {
  // The intro plays once per session, and only when the visit starts on the
  // home page — someone arriving on /vi/contact from a search gets the page.
  const [showIntro, setShowIntro] = useState(() => {
    if (!/^\/(en|vi)?\/?$/.test(window.location.pathname)) return false;
    try { return !sessionStorage.getItem('hilink_intro_seen'); } catch { return false; }
  });

  const handleIntroDone = () => {
    try { sessionStorage.setItem('hilink_intro_seen', '1'); } catch { /* storage blocked */ }
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroLoader onDone={handleIntroDone} lang={window.location.pathname.startsWith('/vi') ? 'vi' : 'en'} />}
      <RouterProvider router={router} />
    </>
  );
}
