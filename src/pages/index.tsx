import { Games } from '@/atoms/problem';
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

  const handleBox = (id: Games) => {
    if (id === 'number-game') {
      window.location.replace('/game');
    }
  };

  return (
    <div className="grid grid-cols-4">
      <Sidebar onClick={handleMenu} />
      <div className="col-span-3">
        {contentTitle === 'game' && (
          <div>
            {GAMES.map(game => (
              <Box
                key={game.id}
                info={game}
                onClick={() => handleBox(game.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
