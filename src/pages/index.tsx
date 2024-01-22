import GameList from '@/components/GameList';
import Sidebar from '@/components/Sidebar';
import Statistics from '@/components/Statistic';
import { ContentTitle } from '@/types/problem';
import { useState } from 'react';

const MainPage = () => {
  const [contentTitle, setContentTitle] = useState<ContentTitle>('game');

  const handleMenu = (title: ContentTitle) => {
    setContentTitle(title);
  };

  return (
    <div className="grid grid-cols-4">
      <Sidebar onClick={handleMenu} />
      <div className="col-span-3">
        {contentTitle === 'game' && <GameList />}
        {contentTitle === 'statistics' && <Statistics />}
      </div>
    </div>
  );
};

export default MainPage;
