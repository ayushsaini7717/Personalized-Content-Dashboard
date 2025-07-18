'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { Rss } from 'lucide-react';

import feedDataState from '@/recoil/feedDataAtom';
import paginationAtom from '@/recoil/paginationAtom';

import ContentCard from './Card';
import CardSkeleton from './CardSkeleton';
import PaginationComp from './PaginationComp';

const Feed = () => {
  const [cached, setCached] = useRecoilState(feedDataState);
  const [pagination, setPagination] = useRecoilState(paginationAtom);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState('');

  const lastSearch = typeof window !== 'undefined' ? localStorage.getItem('searchHistory') : null;
  const tabKey = 'feed';
  const { currentPage, itemsPerPage } = pagination[tabKey];
  const data = cached[tabKey] || [];

  const getPaginatedData = (data: any[]) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  useEffect(() => {
    const load = async () => {
      const requiredItems = currentPage * itemsPerPage;
      let currentCache = cached[tabKey] || [];

      if (currentCache.length >= requiredItems) return;

      setLoading(true);
      try {
        let fetchedData: any[] = [];
        let token = nextPageToken;

        const trendingRes = await fetch(
          `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_API_KEY}&language=en&category=top${
            token ? `&page=${token}` : ''
          }`
        );
        const trendingJson = await trendingRes.json();
        const trendingResults = trendingJson.results || [];
        token = trendingJson.nextPage || '';

        fetchedData.push(...trendingResults);

        if (lastSearch) {
          const searchRes = await fetch(
            `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_API_KEY}&language=en&q=${encodeURIComponent(
              lastSearch
            )}`
          );
          const searchJson = await searchRes.json();
          const searchResults = searchJson.results || [];

          fetchedData.push(...searchResults);
        }

        const existingIds = new Set(currentCache.map((item: any) => item.article_id));
        const uniqueFetched = fetchedData.filter(
          (item: any) => item.article_id && !existingIds.has(item.article_id)
        );

        const updated = [...currentCache, ...uniqueFetched];

        setNextPageToken(token);

        setCached((prev: any) => ({
          ...prev,
          [tabKey]: updated,
        }));
      } catch (err) {
        console.error('Feed fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [currentPage]);

  const paginatedData = getPaginatedData(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-full flex flex-col min-h-screen pt-4"
    >
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6 pb-4 flex gap-2 items-center">
        <Rss className="w-8 h-8 text-blue-500" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Your Personalized Feed</h2>
          <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300">
            Content curated based on trending news & your preferences
          </h4>
        </div>
      </div>

      <div className="relative top-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {loading
          ? Array(itemsPerPage)
              .fill(0)
              .map((_, i) => (
                <div key={`skeleton-${i}`} className="min-w-[300px]">
                  <CardSkeleton />
                </div>
              ))
          : paginatedData.map((item: any, i: number) => (
              <ContentCard
                key={item.article_id || i}
                id={item.article_id}
                title={item.title}
                description={item.description ?? 'No description available'}
                imageUrl={item.image_url}
                pubDate={item.pubDate}
                frameUrl={item.link}
                keywords={
                  item.keywords === null
                    ? item.country?.[0]
                    : item.keywords?.[0]
                }
                source_name={item.source_name}
              />
            ))}
      </div>

      <div className="mt-6 flex justify-center">
        <PaginationComp />
      </div>
    </motion.div>
  );
};

export default Feed;
