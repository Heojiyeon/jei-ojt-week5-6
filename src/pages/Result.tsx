import Result from '@/components/Result';
import { getIndexedDB } from '@/data';
import { GameResult, Games } from '@/types/problem';
import { useEffect, useState } from 'react';

const ResultPage = () => {
  const [currentCountOfCorrect, setCurrentCountOfCorrect] = useState<number>(0);
  const [currentElapsedTime, setCurrentElapsedTime] = useState<string>('');
  const [gameType, setGameType] = useState<Games | null>(null);

  const fetchData = async (gameType: Games) => {
    return await getIndexedDB({ gameType: gameType as Games });
  };

  useEffect(() => {
    const currentGameType = window.localStorage.getItem('gameType') as Games;
    setGameType(currentGameType);

    const handleCountOfCorrect = async (gameType: Games) => {
      const recievedResults = (await fetchData(
        gameType as Games
      )) as GameResult[];
      const recentResult = recievedResults.sort((a, b) => b.order - a.order)[0];
      setCurrentElapsedTime(recentResult.elapsedTime as string);
      setCurrentCountOfCorrect(recentResult.count as number);
    };

    handleCountOfCorrect(currentGameType);
  }, []);

  return (
    <div>
      <Result
        currentElapsedTime={currentElapsedTime}
        countOfCorrect={currentCountOfCorrect}
        gameType={gameType as Games}
      />
    </div>
  );
};

export default ResultPage;
