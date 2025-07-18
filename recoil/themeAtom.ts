import { atom } from 'recoil';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme');
  return saved === 'dark' ? 'dark' : 'light';
};

const themeAtom = atom<'light' | 'dark'>({
  key: 'themeAtom',
  default: typeof window !== 'undefined' ? getInitialTheme() : 'light',
  effects: [
    ({ onSet }) => {
      onSet((newTheme) => {
        localStorage.setItem('theme', newTheme);
      });
    },
  ],
});

export default themeAtom;
