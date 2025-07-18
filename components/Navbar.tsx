'use client';

import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import { useRecoilState } from 'recoil';
import searchAtom from '@/recoil/searchAtom';
import currentViewState from '@/recoil/currentviewAtom';
import themeAtom from '@/recoil/themeAtom';
import { SidebarTrigger } from './ui/sidebar';

const Navbar = () => {
  const [tab, setTab] = useRecoilState(currentViewState);
  const [query, setQuery] = useRecoilState(searchAtom);
  const [theme, setTheme] = useRecoilState(themeAtom);

  const isDark = theme === 'dark';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b p-4 transition-colors duration-300
        ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-black'}
      `}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        
        {/* Sidebar Trigger */}
        <div className="flex items-center gap-4">
          <SidebarTrigger
            className={`p-2 rounded-md hover:bg-opacity-20 transition ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
            }`}
          />
          
          {/* Search Box */}
          <div
            className={`flex items-center gap-2 rounded-md px-3 py-2 w-[60vw] sm:w-[25vw] shadow-sm border
              ${isDark ? 'bg-gray-800 border-gray-600 focus-within:ring-purple-400' : 'bg-white border-gray-300 focus-within:ring-blue-500'}
            `}
          >
            <Search className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              onChange={(e) => {
                setQuery(e.target.value);
                setTab('Search');
              }}
              type="text"
              placeholder="Search Content..."
              className={`w-full border-none outline-none bg-transparent text-sm placeholder-gray-400
                ${isDark ? 'text-white' : 'text-black'}
              `}
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <div>
          {isDark ? (
            <Sun
              className="cursor-pointer text-yellow-400 hover:text-yellow-300 transition"
              onClick={() => setTheme('light')}
              aria-label="Switch to light mode"
            />
          ) : (
            <Moon
              className="cursor-pointer text-gray-700 hover:text-gray-900 transition"
              onClick={() => setTheme('dark')}
              aria-label="Switch to dark mode"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
