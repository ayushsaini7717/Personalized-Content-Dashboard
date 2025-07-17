'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Tabs from './Tabs';
import { useRecoilState, useRecoilValue } from 'recoil';
import NewsAtom from '@/recoil/NewsAtom';
import TrendMovieAtom from '@/recoil/TrendMovieAtom';
import AllTrendingAtom from '@/recoil/AllTrendingAtom';
import TabAtom from '@/recoil/tabAtom';
import CachedAtom from '@/recoil/cachedAtom';
import paginationAtom from '@/recoil/paginationAtom';
import ContentCard from './Card';
import CardSkeleton from './CardSkeleton';
import PaginationComp from './PaginationComp';

const Trending = () => {
  const tab = useRecoilValue(TabAtom);
  const [newsData, setNewsData] = useRecoilState(NewsAtom);
  const [trendMovieData, setTrendMovieData] = useRecoilState(TrendMovieAtom);
  const [allTrending, setAllTrending] = useRecoilState(AllTrendingAtom);
  const [cached, setCached] = useRecoilState(CachedAtom);
  const pagination = useRecoilValue(paginationAtom);
  const [loading, setLoading] = useState(false);
  const [nextPageString, setNextPageString] = useState('');

  const tabKey =
    tab === 'HotNews'
      ? 'hotNews'
      : tab === 'TopMovies'
      ? 'trendingMovies'
      : 'allTrending';

  const { currentPage, itemsPerPage } = pagination[tabKey];

  const getPaginatedData = (data: any[]) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  useEffect(() => {
    const load = async () => {
      const cachedItems = cached[tabKey] || [];
      const requiredCount = currentPage * itemsPerPage;

      if (cachedItems.length >= requiredCount) {
        if (tabKey === 'hotNews') setNewsData(cachedItems);
        else if (tabKey === 'trendingMovies') setTrendMovieData(cachedItems);
        else setAllTrending(cachedItems);
        return;
      }

      setLoading(true);
      let newItems: any[] = [];

      if (tabKey === 'hotNews') {
        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_API_KEY}&language=en&category=top${
            nextPageString ? `&page=${nextPageString}` : ''
          }`
        );
        const result = await res.json();
        setNextPageString(result.nextPage);
        newItems = result.results || [];
      } else if (tabKey === 'trendingMovies') {
        const res = await fetch(`https://api.trakt.tv/movies/trending?page=${currentPage}`, {
          headers: {
            'Content-Type': 'application/json',
            'Trakt-Api-Version': '2',
            'Trakt-Api-Key': process.env.NEXT_PUBLIC_TRAKT_Client_ID!,
          },
        });
        newItems = await res.json();
      } 

      const updated = [...cachedItems, ...newItems];
      setCached((prev) => ({ ...prev, [tabKey]: updated }));
      setCached((prev)=>({...prev,allTrending:updated}));

      if (tabKey === 'hotNews'){
        setNewsData(updated);
        // setAllTrending(updated);
      }
      else if (tabKey === 'trendingMovies') setTrendMovieData(updated);
      else setAllTrending(updated);

      setLoading(false);
    };

    load();
  }, [currentPage, tab]);

  const dataToRender =
    tab === 'HotNews'
      ? newsData
      : tab === 'TopMovies'
      ? trendMovieData
      : tab==='AllTrending'?
      allTrending: null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-full flex flex-col min-h-screen pt-4"
    >
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6 pb-4 flex gap-2 items-center">
        <TrendingUp className="w-8 h-8 text-blue-500 inline-block mr-2" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Trending Content</h2>
          <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300">
            Explore the most popular content right now
          </h4>
        </div>
      </div>

      <Tabs />

      <div className="relative top-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {loading
          ? Array(itemsPerPage)
              .fill(0)
              .map((_, index) => (
                <div className="min-w-[300px]" key={`skeleton-${index}`}>
                  <CardSkeleton />
                </div>
              ))
          : getPaginatedData(dataToRender).map((item: any, i: number) => (
              <div key={i}>
                {tab === 'HotNews' ? (
                  <ContentCard
                    id={item.article_id}
                    title={item.title}
                    description={
                      item.description ?? 'No description available'
                    }
                    frameUrl={item.link ?? null}
                    imageUrl={item.image_url ?? null}
                    pubDate={item.pubDate}
                    keywords={
                      item.keywords === null
                        ? item.country?.[0]
                        : item.keywords?.[0]
                    }
                    source_name={item.source_name}
                  />
                ) : tab === 'TopMovies' ? (
                  <ContentCard
                    id={item.ids?.trakt}
                    title={item.movie.title}
                    description="This is a great movie that you might enjoy based on your preferences and viewing history."
                    keywords="recommendation"
                    pubDate={item.movie.year}
                    imageUrl="/movieplaceholder.png"
                    watches={item.watchers ?? 'n/a'}
                  />
                ): tab==="AllTrending" && item.type === 'news' ?
                  <ContentCard
                      id={item.article_id}
                      title={item.title}
                      description={
                        item.description ?? 'No description available'
                      }
                      frameUrl={item.link ?? null}
                      imageUrl={item.image_url ?? null}
                      pubDate={item.pubDate}
                      keywords={
                        item.keywords === null
                          ? item.country?.[0]
                          : item.keywords?.[0]
                      }
                      source_name={item.source_name}
                    />:<ContentCard
                id={item.ids?.trakt}
                title={item.movie?.title}
                description="This is a great movie that you might enjoy based on your preferences and viewing history."
                keywords="recommendation"
                pubDate={item.movie?.year}
                imageUrl="/movieplaceholder.png"
                watches={item.watchers ?? 'n/a'}
              />  
                
                }
              </div>
            ))}
      </div>
      <div className="mt-6 flex justify-center">
        <PaginationComp />
      </div>
    </motion.div>
  );
};

export default Trending;

