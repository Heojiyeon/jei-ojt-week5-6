import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPage from './pages';
import GamePage from './pages/Game';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';
import ResultPage from './pages/Result';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
