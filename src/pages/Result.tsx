import { countOfCorrectAtom } from '@/atoms/problem';
import Result from '@/components/Result';
import { getIndexedDB } from '@/data';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

const ResultPage = () => {
  const countOfCorrect = useAtomValue(countOfCorrectAtom);
  const [currentCountOfCorrect, setCurrentCountOfCorrect] = useState<number>(0);

  const fetchData = async () => {
    return await getIndexedDB();
  };

  useEffect(() => {
    const handleCountOfCorrect = async () => {
      const recievedCountOfCorrect = (await fetchData()) as number;
      if (!recievedCountOfCorrect) {
        console.log(countOfCorrect);
        setCurrentCountOfCorrect(countOfCorrect);
      } else {
        setCurrentCountOfCorrect(recievedCountOfCorrect);
      }
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
