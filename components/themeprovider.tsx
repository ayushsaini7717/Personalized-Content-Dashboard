'use client';

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import themeAtom from '@/recoil/themeAtom';

const ThemeProvider = () => {
  const theme = useRecoilValue(themeAtom);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return null;
};

export default ThemeProvider;
