import { atom } from "recoil";

const feedDataState = atom<any[]>({
    key: 'feedDataState',
    default: [],
});

export default feedDataState;