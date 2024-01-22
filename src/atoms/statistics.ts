import { GameResult } from '@/types/problem';
import { atom } from 'jotai';

const numberGameStatisticAtom = atom<GameResult[] | null>(null);
const situationGameStatisticAtom = atom<GameResult[] | null>(null);

export { numberGameStatisticAtom, situationGameStatisticAtom };
