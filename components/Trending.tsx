"use client";
import React, { useEffect } from 'react'
import {motion} from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Tabs from './Tabs';
import NewsAtom from '@/recoil/NewsAtom';
import TrendMovieAtom from '@/recoil/TrendMovieAtom';
import { useRecoilState } from 'recoil';
import TabAtom from '@/recoil/tabAtom';
import { useRecoilValue } from 'recoil';
import ContentCard from './Card';

const Trending = () => {
  const [newsData, setNewsData] = useRecoilState(NewsAtom);
  const [trendMovieData, setTrendMovieData] = useRecoilState(TrendMovieAtom);
  const tab = useRecoilValue(TabAtom);

  useEffect(()=>{
    const fetcher=async ()=>{
      const [res1, res2] = await Promise.all([
        fetch(`https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_API_KEY}&language=en&category=top`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }),
        fetch("https://api.trakt.tv/movies/trending", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Trakt-Api-Version': '2',
            'Trakt-Api-Key': process.env.NEXT_PUBLIC_TRAKT_Client_ID!
          }
        })
      ]);


    
      const [data1,data2] = await Promise.all([res1.json(), res2.json()]);
  //     const data1=[{
  //       "article_id": "eea55449f6da110fd2467483ad242fd4",
  //       "title": "Eni signs first long-term U.S. LNG deal with Venture Global",
  //       "link": "https://www.trend.az/business/4070716.html",
  //       "keywords": [
  //           "economy"
  //       ],
  //       "creator": null,
  //       "description": null,
  //       "content": "ONLY AVAILABLE IN PAID PLANS",
  //       "pubDate": "2025-07-16 12:41:00",
  //   }]
  //   const data2=[{
  //     "watchers": 2023,
  //     "movie": {
  //         "title": "How to Train Your Dragon",
  //         "year": 2025,
  //         "ids": {
  //             "trakt": 873974,
  //             "slug": "how-to-train-your-dragon-2025",
  //             "imdb": "tt26743210",
  //             "tmdb": 1087192
  //         }
  //     }
  // }]
      setNewsData(data1.results);
      setTrendMovieData(data2);
    }
    fetcher();
  },[]);


  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full flex flex-col min-h-screen pt-4"
      >
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6 pb-4 flex gap-2 items-center">
          
        <div>
          <TrendingUp className="w-8 h-8 text-blue-500 inline-block mr-2" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Trending Content</h2>
          <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300">
            Explore the most popular content right now
          </h4>
        </div>
      </div>
      <div>
        <Tabs/>
      </div>
      

{/* { Array.isArray(newsData) ? (
  newsData.map((item, i) => (
    <div key={i}>
      <div>{item.article_id} - {item.title}</div>
    </div>
  ))
) : tab === "TopMovies" ? (
  <div>Top Movies content here</div>
) : null} */}
<div className='relative top-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
  {tab==="HotNews" ? newsData.map((item,i)=>{
    return <div
    key={i}>
      <ContentCard
        id={item.article_id}
        title={item.title}
        description={item.description===null ? "No description available": item.description}
        frameUrl={item.link}
        pubDate={item.pubDate}
        keywords={item.keywords === null ? "recent" : item.keywords[0]}
      />
    </div>
  }): tab==="TopMovies"? trendMovieData.map((item,i)=>{
    return <div key={i}>
      {item.watchers} 
    </div>
  }): <div>hi</div>}
</div>

{newsData.length }
{trendMovieData.length}



      </motion.div>
  )
}

export default Trending