import { atom } from "recoil";

export type View = 'Feed' | 'Trending' | 'Favorites' | 'Search';

const currentViewState = atom<View>({
  key: 'currentViewState',
  default: 'Feed',
});

export default currentViewState;