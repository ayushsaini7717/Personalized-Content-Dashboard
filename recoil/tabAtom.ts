import { atom } from "recoil";

const TabAtom = atom<any>({
    key: 'TabAtom',
    default: "HotNews",
});

export default TabAtom;