import { countOfCorrectAtom } from '@/atoms/problem';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

const { VITE_IFRAME_ORIGIN, VITE_ORIGIN } = import.meta.env;

const Iframe = () => {
  const setCountOfCorrect = useSetAtom(countOfCorrectAtom);

  /**
   * iframe 내부에서 보낸 메시지 확인
   */
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      e.preventDefault();

      if (e.origin === VITE_ORIGIN && e.data) {
        console.log(e.data);
        setCountOfCorrect(e.data[0]);
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
