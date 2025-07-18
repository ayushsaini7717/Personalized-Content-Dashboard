'use client';

import React from 'react';
import { Flame, Star, ChartNoAxesCombined } from 'lucide-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import TabAtom from '@/recoil/tabAtom';
import themeAtom from '@/recoil/themeAtom';

const Tabs = () => {
  const [tab, setTab] = useRecoilState(TabAtom);
  const theme = useRecoilValue(themeAtom);
  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full min-w-[75vw] py-4 px-4 flex justify-between gap-6 items-center rounded shadow-sm transition-colors duration-300
        ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
      `}
    >
      {[
        {
          id: 'HotNews',
          label: 'Hot News',
          icon: <Flame className="w-5 h-5 text-orange-500" />,
          lightBg: 'bg-red-100',
          darkBg: 'bg-red-900/30',
        },
        {
          id: 'TopMovies',
          label: 'Top Movies',
          icon: <Star className="w-5 h-5 text-yellow-500" />,
          lightBg: 'bg-yellow-100',
          darkBg: 'bg-yellow-900/30',
        },
        {
          id: 'AllTrending',
          label: 'All Trending',
          icon: <ChartNoAxesCombined className="w-5 h-5 text-blue-500" />,
          lightBg: 'bg-blue-100',
          darkBg: 'bg-blue-900/30',
        },
      ].map(({ id, label, icon, lightBg, darkBg }) => {
        const activeBg = isDark ? darkBg : lightBg;
        const textColor = tab === id
          ? isDark ? 'text-white' : 'text-black'
          : isDark ? 'text-gray-300' : 'text-gray-700';

        return (
          <div
            key={id}
            onClick={() => setTab(id)}
            role="button"
            tabIndex={0}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ease-in-out cursor-pointer
              ${tab === id ? activeBg : 'bg-transparent'} 
              ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
            `}
          >
            {icon}
            <span className={`text-sm font-semibold ${textColor}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
