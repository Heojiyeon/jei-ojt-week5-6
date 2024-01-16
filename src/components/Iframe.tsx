import { useEffect } from 'react';

const Iframe = () => {
  const { VITE_IFRAME_ORIGIN } = import.meta.env;
  /**
   * iframe 내부에서 보낸 메시지 확인
   */
  useEffect(() => {
    window.addEventListener(
      'message',
      e => {
        if (e.origin === VITE_IFRAME_ORIGIN && e.data) {
          console.log(e.data);
        }
      },
      false
    );
  }, []);

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
