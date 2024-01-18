import Result from '@/components/Result';
import { getIndexedDB } from '@/data';
import { GameResult } from '@/types/problem';
import { useEffect, useState } from 'react';

const ResultPage = () => {
  const [currentCountOfCorrect, setCurrentCountOfCorrect] = useState<number>(0);

  const fetchData = async () => {
    return await getIndexedDB();
  };

  useEffect(() => {
    const handleCountOfCorrect = async () => {
      const recievedResults = (await fetchData()) as GameResult[];
      const recentResult = recievedResults.sort((a, b) => b.order - a.order)[0]
        .count;

      setCurrentCountOfCorrect(recentResult as number);
    };

    handleCountOfCorrect();
  }, []);

  return (
    <div>
      <Result countOfCorrect={currentCountOfCorrect} />
    </div>
  );
};

export default ResultPage;
