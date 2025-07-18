"use client";
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import {  useRecoilValue } from 'recoil';
import searchAtom from '@/recoil/searchAtom';
import { useDebounce } from '@/hooks/useDebounce';
import ContentCard from './Card';
import CardSkeleton from './CardSkeleton';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [results, setResults] = useState<any>([]);
  const query = useRecoilValue(searchAtom);
  const debouncedQuery = useDebounce(query, 1000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchResults = async () => {
      if (!debouncedQuery) return;
      try {
        localStorage.setItem('searchHistory', debouncedQuery);
        const res = await fetch(`https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_API_KEY}&language=en&q=${debouncedQuery}`);
        const data = await res.json();
        setResults(data.results || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching search results', err);
      }
    };

    fetchResults();
  }, [debouncedQuery]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-full flex flex-col min-h-screen pt-4"
    >
       <div className="border-b border-gray-200 dark:border-gray-700 mb-6 pb-4 flex gap-2 items-center">
        <div>
          <SearchIcon />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Search</h2>
          <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300">
          This is the search section where you can find items.
          </h4>
        </div>
      </div>
       {/* <h1 className="text-2xl font-bold mb-4">Search</h1>
       <p className="text-gray-600">This is the search section where you can find items.</p> */}
       <div className="p-4 grid grid-cols-3 gap-4">
      {loading && debouncedQuery.length>0 ?  Array(24).fill(0).map((_, index) => (
             <div className='min-w-[300px]'>
                 <CardSkeleton key={`skeleton-${index}`} />
             </div>
            )): results.map((item:any, index:any) => (
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
      ))}
    </div>
    </motion.div>
  )
}

export default Search