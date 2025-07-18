"use client";
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import currentViewState from '@/recoil/currentviewAtom'
import Feed from '@/components/Feed';
import Trending from '@/components/Trending';
import Favorites from '@/components/Favorites';
import Search from '@/components/Search';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const { data: session, status } = useSession()
    const currentView = useRecoilValue(currentViewState);
    const router=useRouter();
    
    useEffect(() => {
        if (status === 'unauthenticated') {
          signIn();
        }
      }, [status])

      if (status === 'loading') {
        return (
          <div className="flex justify-center items-center h-screen text-xl">
            Loading...
          </div>
        )
      }
    
      if (status === 'unauthenticated') {
        router.push('/');
      }

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
    
    <div className="flex flex-col items-center justify-center min-h-screen pt-20">
      {renderContent()}
    </div>
  )
}

export default Page