import { atom } from 'recoil';

const favoritesState = atom<any[]>({
    key: 'favoritesState',
    default: [],
});

export default favoritesState;