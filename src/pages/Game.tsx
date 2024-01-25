import { useEffect } from 'react';

import Iframe from '@/components/Iframe';

const GamePage = () => {
  useEffect(() => {
    window.localStorage.removeItem('gameStartTime');

    const startTime = new Date().getTime();
    window.localStorage.setItem('gameStartTime', String(startTime));
  }, []);

  return (
    <div className="flex justify-center items-center mt-24">
      <Iframe />
    </div>
  );
};

export default GamePage;
