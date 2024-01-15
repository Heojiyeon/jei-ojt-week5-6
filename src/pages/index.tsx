import Sidebar from '@/components/Sidebar';
import Box from '@/components/common/Box';
import { GAMES } from '@/constants/game';
import { useState } from 'react';

export type ContentTitle = 'game' | 'statistics' | 'badge';

const MainPage = () => {
  const [contentTitle, setContentTitle] = useState<ContentTitle>('game');

  const handleMenu = (title: ContentTitle) => {
    setContentTitle(title);

    console.log('clicked menu', title);
  };

  const handleBox = (id: string) => {
    console.log('clicked box', id);
  };
  return (
    <div className="grid grid-cols-4">
      <Sidebar onClick={handleMenu} />
      <div className="col-span-3">
        {contentTitle === 'game' && (
          <div>
            {GAMES.map(game => (
              <Box key={game.id} info={game} onClick={handleBox} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
