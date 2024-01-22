import { GAMES } from '@/constants/game';
import Box from './common/Box';
import { Games } from '@/types/problem';

const GameList = () => {
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
    <div>
      <div className="col-span-3">
        {GAMES.map(game => (
          <Box key={game.id} info={game} onClick={() => handleBox(game.id)} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
