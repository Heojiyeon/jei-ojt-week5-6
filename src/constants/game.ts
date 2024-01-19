import { Games } from '@/types/problem';

export interface Game {
  id: Games;
  title: string;
}

export const GAMES: Game[] = [
  {
    id: 'number-game',
    title: '숫자 맞추기 게임',
  },
  {
    id: 'situation-game',
    title: '상황 추론 게임',
  },
];
