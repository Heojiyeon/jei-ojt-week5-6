import { useAtomValue } from 'jotai';
import AppRouter from './Router';
import Layout from './components/Layout';
import { countOfCorrectAtom } from './atoms/problem';
import { useEffect } from 'react';
import { createIndexedDB } from './data';

const App = () => {
  const countOfCorrect = useAtomValue(countOfCorrectAtom);
  /**
   * indexedDB 생성
   *
   */
  useEffect(() => {
    createIndexedDB({ count: countOfCorrect });
  }, [countOfCorrect]);

  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default App;
