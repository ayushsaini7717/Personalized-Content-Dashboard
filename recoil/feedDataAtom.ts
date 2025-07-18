import { atom } from 'recoil';

const feedDataState = atom<any>({
  key: 'feedDataState',
  default: {
    feed: [],
  },
});

export default feedDataState;
