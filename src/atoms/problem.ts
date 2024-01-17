import { atom } from 'jotai';

export type Games = 'number-game' | 'situation-game' | null;

const countOfCorrectAtom = atom<number>(0);

export { countOfCorrectAtom };
