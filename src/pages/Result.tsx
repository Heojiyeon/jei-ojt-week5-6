import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Result from '@/components/Result';
import { GameResult, Games } from '@/types/problem';

const ResultPage = () => {
  const [currentCountOfCorrect, setCurrentCountOfCorrect] = useState<number>(0);
  const [currentElapsedTime, setCurrentElapsedTime] = useState<string>('');
  const [gameType, setGameType] = useState<Games | null>(null);

  const { data } = useQuery({
    queryKey: ['result', gameType!],
    queryFn: () => getResult(gameType as Games),
    enabled: !!gameType,
  });

  const getResult = async (gameType: Games) => {
    const response = await axios.get(`/result/${gameType}`);

    return response.data;
  };

  useEffect(() => {
    const currentGameType = window.localStorage.getItem('gameType') as Games;
    setGameType(currentGameType);

    const handleCountOfCorrect = () => {
      const recievedResults = data as GameResult[];
      const recentResult = recievedResults.sort((a, b) => b.order - a.order)[0];

      setCurrentElapsedTime(recentResult.elapsedTime);
      setCurrentCountOfCorrect(recentResult.count as number);
    };

    if (data) {
      handleCountOfCorrect();
    }
  }, [data]);

  return (
    <div className="flex justify-center">
      <Result
        currentElapsedTime={currentElapsedTime}
        countOfCorrect={currentCountOfCorrect}
        gameType={gameType as Games}
      />
    </div>
  );
};

export default ResultPage;
