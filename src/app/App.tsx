import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useState } from 'react';
import { IntroLoader } from './components/IntroLoader';

export default function App() {
  // Only show intro on first visit per session
  const [showIntro, setShowIntro] = useState(() => {
    try { return !sessionStorage.getItem('hilink_intro_seen'); } catch { return false; }
  });

  const handleIntroDone = () => {
    try { sessionStorage.setItem('hilink_intro_seen', '1'); } catch { /* storage blocked */ }
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroLoader onDone={handleIntroDone} />}
      <RouterProvider router={router} />
    </>
  );
}
