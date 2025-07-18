import { atom } from 'recoil';

const themeAtom = atom<'light' | 'dark'>({
  key: 'themeAtom',
  default: 'light', 
  effects: [
    ({ setSelf, onSet }) => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') {
          setSelf(saved);
        }
      }

      onSet((newTheme) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('theme', newTheme);
        }
      });
    },
  ],
});

export default themeAtom;
