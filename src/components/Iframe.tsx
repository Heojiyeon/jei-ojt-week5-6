import { addIndexedDB, getIndexedDB } from '@/data';
import { GameResult } from '@/types/problem';
import { useEffect } from 'react';

const { VITE_IFRAME_ORIGIN, VITE_ORIGIN } = import.meta.env;

const Iframe = () => {
  /**
   * iframe 내부에서 보낸 메시지 확인
   */

  const fetchData = async () => {
    return await getIndexedDB();
  };

  useEffect(() => {
    const handleMessage = async (e: MessageEvent) => {
      e.preventDefault();

      if (e.origin === VITE_ORIGIN && e.data) {
        console.log('받은 메시지', e.data);
        // 가져와서 length 체크
        const checkResultLength = async () => {
          const currentLength = (await fetchData()) as GameResult[];
          return currentLength.length;
        };

        const currentLength = await checkResultLength();

        // length에 따라 order 부여 후 DB에 add
        const currentResult = {
          order: currentLength as unknown as number,
          count: e.data[0],
        };
        addIndexedDB(currentResult);
        window.location.replace('/result');
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  });

  return (
    <iframe
      src={VITE_IFRAME_ORIGIN}
      width={900}
      height={700}
      title="game content"
    >
      게임 컨텐츠를 불러오고 있습니다
    </iframe>
  );
};

export default Iframe;
