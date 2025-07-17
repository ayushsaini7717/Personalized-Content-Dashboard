"use client";
import React from 'react'
import {Flame,Star,ChartNoAxesCombined} from 'lucide-react';
import { useRecoilState } from 'recoil';
import TabAtom from '@/recoil/tabAtom';

const Tabs = () => {
  const [tab, setTab] = useRecoilState(TabAtom);
  // const [tab,SetTab]=useState('HotNews');
  return (
    <div className="w-full min-w-[75vw] py-4 px-4 flex justify-between gap-6 items-center bg-gray-50 rounded shadow-sm">
  {[
    {
      id: 'HotNews',
      label: 'Hot News',
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      activeBg: 'bg-red-100',
    },
    {
      id: 'TopMovies',
      label: 'Top Movies',
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      activeBg: 'bg-yellow-100',
    },
    {
      id: 'AllTrending',
      label: 'All Trending',
      icon: <ChartNoAxesCombined className="w-5 h-5 text-blue-500" />,
      activeBg: 'bg-blue-100',
    },
  ].map(({ id, label, icon, activeBg }) => (
    <div
      key={id}
      onClick={() => setTab(id)}
      role="button"
      tabIndex={0}
      className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ease-in-out cursor-pointer hover:bg-gray-100 ${
        tab === id ? activeBg : 'bg-transparent'
      }`}
    >
      {icon}
      <span
        className={`text-sm font-semibold ${
          tab === id ? 'text-black' : 'text-gray-700'
        }`}
      >
        {label}
      </span>
    </div>
  ))}
</div>


  )
}

export default Tabs