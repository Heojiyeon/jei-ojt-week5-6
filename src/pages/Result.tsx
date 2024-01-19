import Result from '@/components/Result';
import { getIndexedDB } from '@/data';
import { GameResult, Games } from '@/types/problem';
import { useEffect, useState } from 'react';

const ResultPage = () => {
  const [currentCountOfCorrect, setCurrentCountOfCorrect] = useState<number>(0);

  const fetchData = async (gameType: Games) => {
    return await getIndexedDB({ gameType: gameType as Games });
  };

  useEffect(() => {
    const currentGameType = window.localStorage.getItem('gameType') as Games;

    const handleCountOfCorrect = async (gameType: Games) => {
      const recievedResults = (await fetchData(
        gameType as Games
      )) as GameResult[];
      const recentResult = recievedResults.sort((a, b) => b.order - a.order)[0]
        .count;

      setCurrentCountOfCorrect(recentResult as number);
    };

    handleCountOfCorrect(currentGameType);
  }, []);

  return (
    <div>
      <Result countOfCorrect={currentCountOfCorrect} />
    </div>
  );
};

export default ResultPage;
