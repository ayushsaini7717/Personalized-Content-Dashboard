import { atom } from "recoil";

const NewsAtom = atom<any[]>({
    key: 'NewsAtom',
    default: [],
});

export default NewsAtom;