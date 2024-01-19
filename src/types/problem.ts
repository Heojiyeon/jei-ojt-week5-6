export interface GameResult {
  order: number;
  count: number;
  elapsedTime: string;
}

export type Games = 'number-game' | 'situation-game';

export type ContentTitle = 'game' | 'statistics' | 'badge';
