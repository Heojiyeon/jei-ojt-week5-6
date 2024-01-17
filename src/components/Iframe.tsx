import { countOfCorrectAtom } from '@/atoms/problem';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

const Iframe = () => {
  const { VITE_IFRAME_ORIGIN } = import.meta.env;
  const setCountOfCorrect = useSetAtom(countOfCorrectAtom);

  /**
   * iframe 내부에서 보낸 메시지 확인
   */
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      e.preventDefault();

      if (e.origin === VITE_IFRAME_ORIGIN && e.data) {
        if (e.data === true) {
          setCountOfCorrect(prevCountOfCorrect => (prevCountOfCorrect += 1));
        }
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [setCountOfCorrect]);

  return (
    <iframe
      src={VITE_IFRAME_ORIGIN}
      width={1200}
      height={800}
      title="game content"
    >
      게임 컨텐츠를 불러오고 있습니다
    </iframe>
  );
};

export default Iframe;
