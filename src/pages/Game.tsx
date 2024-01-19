import Iframe from '@/components/Iframe';
import { useEffect } from 'react';

const GamePage = () => {
  useEffect(() => {
    window.localStorage.removeItem('gameStartTime');

    const startTime = new Date().getTime();
    window.localStorage.setItem('gameStartTime', String(startTime));
  }, []);

  return (
    <div>
      <Iframe />
    </div>
  );
};

export default GamePage;
