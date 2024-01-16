import Iframe from '@/components/Iframe';
import { createIndexedDB } from '@/data';
import { useEffect } from 'react';

const GamePage = () => {
  /**
   * indexedDB 생성
   *
   */
  useEffect(() => {
    createIndexedDB();
  }, []);

  return (
    <div>
      <Iframe />
    </div>
  );
};

export default GamePage;
