"use client";
import React from 'react'
import { useRecoilValue } from 'recoil'
import currentViewState from '@/recoil/currentviewAtom'
import Feed from '@/components/Feed';
import Trending from '@/components/Trending';
import Favorites from '@/components/Favorites';
import Search from '@/components/Search';

const Page = () => {
    const currentView = useRecoilValue(currentViewState);
    

    const renderContent = () => {
        switch (currentView) {
            case 'Feed':
                return <Feed />;
            case 'Trending':
                return <Trending />;
            case 'Favorites':
                return <Favorites />;
            case 'Search':
                return <Search />;
            default:
                return <Feed/>;
    }
}
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {renderContent()}
    </div>
  )
}

export default Page