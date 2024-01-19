import Sidebar from '@/components/Sidebar';
import Box from '@/components/common/Box';
import { GAMES } from '@/constants/game';
import { ContentTitle, Games } from '@/types/problem';
import { useState } from 'react';

const MainPage = () => {
  const [contentTitle, setContentTitle] = useState<ContentTitle>('game');

  const handleMenu = (title: ContentTitle) => {
    setContentTitle(title);

    console.log('clicked menu', title);
  };

  const handleBox = (id: Games) => {
    // 초기화
    window.localStorage.removeItem('gameType');

    switch (id) {
      case 'number-game':
        window.localStorage.setItem('gameType', 'number-game');
        break;
      case 'situation-game':
        window.localStorage.setItem('gameType', 'situation-game');
        break;

      default:
        break;
    }

    window.location.replace('/game');
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
