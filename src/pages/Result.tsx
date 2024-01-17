import Result from '@/components/Result';
import { getIndexedDB } from '@/data';
import { useEffect, useState } from 'react';

const ResultPage = () => {
  const [currentCountOfCorrect, setCurrentCountOfCorrect] = useState<number>(0);

  const fetchData = async () => {
    return await getIndexedDB();
  };

  useEffect(() => {
    const handleCountOfCorrect = async () => {
      const countOfCorrect = (await fetchData()) as number;
      setCurrentCountOfCorrect(countOfCorrect);
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
