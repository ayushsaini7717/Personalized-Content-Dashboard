'use client';

import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import { useRecoilState } from 'recoil';
import searchAtom from '@/recoil/searchAtom';
import currentViewState from '@/recoil/currentviewAtom';
import themeAtom from '@/recoil/themeAtom';
import { SidebarTrigger } from './ui/sidebar';
import { usePathname } from 'next/navigation';
import {motion} from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const [tab, setTab] = useRecoilState(currentViewState);
  const [query, setQuery] = useRecoilState(searchAtom);
  const [theme, setTheme] = useRecoilState(themeAtom);
  const { data: session, status } = useSession()
  
  const pathname= usePathname();

  const isDark = theme === 'dark';

  if(pathname === '/'){
    return <nav
    className={`fixed top-0 left-0 w-full z-50 border-b p-4 transition-colors duration-300
      ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-black'}
    `}
  >
    <div className="max-w-screen-xl mx-auto flex items-center justify-between">
      <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='flex gap-2 font-bold'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap h-5 w-5 text-blue-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        <span>ContentHub</span>
      </motion.div>


      

      <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='flex gap-6 items-center'>
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
        <div className='bg-blue-500 rounded p-2 text-white' onClick={()=>signIn('github')}>Sign In</div>
      </motion.div>
    </div>
  </nav>

  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b p-4 transition-colors duration-300
        ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-black'}
      `}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        className="flex items-center gap-4">
          <SidebarTrigger
            className={`p-2 rounded-md hover:bg-opacity-20 transition ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
            }`}
          />
          
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='flex gap-4'
        >
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
          <div onClick={()=>signOut()} className='w-7 cursor-pointer h-7 flex justify-center items-center rounded-full bg-gray-200 text-black'>{session?.user?.name ? session.user.name[0] : session?.user?.email?.[0] ?? 'A'}</div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
