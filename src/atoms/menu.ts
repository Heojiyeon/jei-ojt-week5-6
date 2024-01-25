import { atom } from 'jotai';

type Menu = 'game' | 'statistics' | 'badge';

const menuAtom = atom<Menu>('game');

export { menuAtom };
