import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useState } from 'react';
import { IntroLoader } from './components/IntroLoader';

export default function App() {
  // Only show intro on first visit per session
  const [showIntro, setShowIntro] = useState(() => {
    const seen = sessionStorage.getItem('hilink_intro_seen');
    return !seen;
  });

  const handleIntroDone = () => {
    sessionStorage.setItem('hilink_intro_seen', '1');
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroLoader onDone={handleIntroDone} />}
      <RouterProvider router={router} />
    </>
  );
}
