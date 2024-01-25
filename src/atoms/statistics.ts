import { atom } from 'jotai';

import { GameResult } from '@/types/problem';

const numberGameStatisticAtom = atom<GameResult[] | null>(null);
const situationGameStatisticAtom = atom<GameResult[] | null>(null);

export { numberGameStatisticAtom, situationGameStatisticAtom };
