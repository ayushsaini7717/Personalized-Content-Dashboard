import { atom } from 'recoil';

const AllTrendingAtom = atom<any>({
  key: 'InterleavedAtom',
  default: [],
});

export default AllTrendingAtom;
