import React from 'react'
import {Search} from 'lucide-react';
import searchAtom from '@/recoil/searchAtom';
import { useRecoilState } from 'recoil';
import currentViewState from '@/recoil/currentviewAtom';

const Navbar = () => {
    const [tab, setTab] = useRecoilState(currentViewState);
    const [query, setQuery] = useRecoilState(searchAtom);
    return  <nav className="bg-gray-50 border-b border-black rounded text-black p-4 w-full relative z-20">
  <div className="max-w-screen-xl mx-auto">
    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-full sm:w-[25vw] bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
      <Search className="text-gray-500 w-5 h-5" />
      <input
        onChange={(e) => {
            setQuery(e.target.value);
            setTab('Search');
        }}
        type="text"
        placeholder="Search Content..."
        className="w-full border-none outline-none bg-transparent placeholder-gray-400 text-sm"
      />
    </div>
  </div>
</nav>
}

export default Navbar