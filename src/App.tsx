import { useEffect } from 'react';

import Layout from './components/Layout';
import { createIndexedDB } from './data';
import AppRouter from './Router';

const App = () => {
  /**
   * indexedDB 생성
   *
   */
  useEffect(() => {
    createIndexedDB();
  }, []);

  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default App;
