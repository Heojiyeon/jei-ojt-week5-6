import axios from 'axios';
import { useEffect, useState } from 'react';

import { addIndexedDB, getIndexedDB } from '@/data';
import { GameResult, Games } from '@/types/problem';

const Iframe = () => {
  /**
   * iframe 내부에서 보낸 메시지 확인
   */
  const [isLoaded, setIsLoaded] = useState(false);
  const [gameType, setGameType] = useState<Games | null>(null);

  const fetchData = async (gameType: Games) => {
    return await getIndexedDB({ gameType });
  };

  useEffect(() => {
    const handleMessage = async (e: MessageEvent) => {
      e.preventDefault();

      // 소요 시간 계산
      const calculateElapsedTime = () => {
        const endTime = new Date().getTime();
        const startTime = window.localStorage.getItem('gameStartTime');
        let currentElapsedTime: number;

        if (startTime !== null) {
          currentElapsedTime = (endTime - Number(startTime)) / 1000;
          return currentElapsedTime;
        }
      };
      const elapsedTime = calculateElapsedTime()!;

      // 게임 유형에 따라 결과를 저장하는 함수
      const addResultByGameType = async (gameType: Games) => {
        // 가져와서 length 체크
        const checkResultLength = async () => {
          const currentLength = (await fetchData(gameType)) as GameResult[];
          return currentLength.length;
        };

        const currentLength = await checkResultLength();

        // length에 따라 order 부여 후 DB에 add
        const currentResult = {
          order: currentLength as unknown as number,
          count: e.data[0],
          elapsedTime: elapsedTime.toFixed(2) as unknown as string,
        };

        addIndexedDB({ gameType: gameType, result: currentResult });
        window.location.replace('/result');
      };

      switch (gameType) {
        case 'number-game':
          addResultByGameType('number-game');
          break;
        case 'situation-game':
          addResultByGameType('situation-game');
          break;

        default:
          break;
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [gameType]);

  useEffect(() => {
    if (isLoaded && gameType) {
      const postProblemMessage = async (gameType: Games) => {
        const currentProblem = await axios.get(`/problem/${gameType}`);
        // 데이터 보내기
        const $iframe: HTMLIFrameElement | null =
          document.querySelector('iframe');

        $iframe?.contentWindow?.postMessage(
          JSON.parse(JSON.stringify(currentProblem))
        );
      };

      postProblemMessage(gameType);
    }

    const currentGameType = window.localStorage.getItem('gameType');

    if (currentGameType !== null) {
      setGameType(currentGameType as Games);
    }
  }, [gameType, isLoaded]);

  return (
    <iframe
      src="../../public/index.html"
      width={900}
      height={700}
      title="game content"
      onLoad={() => setIsLoaded(true)}
    >
      게임 컨텐츠를 불러오고 있습니다
    </iframe>
  );
};

export default Iframe;
