import {atom} from 'recoil';

const searchAtom = atom<string>({
  key: 'searchAtom',
  default: '',
});

export default searchAtom;