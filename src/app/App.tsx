import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useState } from 'react';
import { IntroLoader } from './components/IntroLoader';

const KEY = 'hilink_intro_seen';

// The intro plays once per browser session, and never for visitors who ask
// for reduced motion.
function shouldShowIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  const handleIntroDone = () => {
    try { sessionStorage.setItem(KEY, '1'); } catch { /* storage blocked */ }
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroLoader onDone={handleIntroDone} />}
      <RouterProvider router={router} />
    </>
  );
}
