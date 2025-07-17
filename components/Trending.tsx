"use client";
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Tabs from './Tabs';
import NewsAtom from '@/recoil/NewsAtom';
import TrendMovieAtom from '@/recoil/TrendMovieAtom';
import { useRecoilState } from 'recoil';
import TabAtom from '@/recoil/tabAtom';
import { useRecoilValue } from 'recoil';
import ContentCard from './Card';
import AllTrendingAtom from '@/recoil/AllTrendingAtom';
import CardSkeleton from './CardSkeleton';



const Trending = () => {
  const [newsData, setNewsData] = useRecoilState(NewsAtom);
  const [trendMovieData, setTrendMovieData] = useRecoilState(TrendMovieAtom);
  const [allTrending, setAllTrending] = useRecoilState(AllTrendingAtom);
  const tab = useRecoilValue(TabAtom);
  const [loading,SetLoading]=useState(false);

  useEffect(()=>{
    SetLoading(true);
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

      setNewsData(data1.results);
      setTrendMovieData(data2);

      const news = data1.results;
      const movies = data2;

      const maxLength = Math.max(news.length, movies.length);
      let temp: any[] = [];

      for (let i = 0; i < maxLength; i++) {
        if (i < news.length) {
          temp.push({
            ...news[i],
            type: "news"
          });
        }
        if (i < movies.length) {
          temp.push({
            ...movies[i].movie,
            watchers: movies[i].watchers, 
            type: "movie"
          });
        }
      }

      setAllTrending(temp);
      SetLoading(false);
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
      
<div className='relative top-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
  {loading ? (
            Array(24).fill(0).map((_, index) => (
             <div className='min-w-[300px]'>
                 <CardSkeleton key={`skeleton-${index}`} />
             </div>
            ))
          ): tab==="HotNews" ? newsData.map((item,i)=>{
            return <div
            key={i}>
              <ContentCard
                id={item.article_id}
                title={item.title}
                description={item.description===null ? "No description available": item.description}
                frameUrl={item.link ? item.link : null}
                imageUrl={item.image_url ? item.image_url : null}
                pubDate={item.pubDate}
                keywords={item.keywords === null ? item.country[0] : item.keywords[0]}
                source_name={item.source_name}
              />
            </div>
          }): tab==="TopMovies"? trendMovieData.map((item,i)=>{
            return <div key={i}>
              <ContentCard
                id={item.movie.ids.trakt}
                title={item.movie.title}
                description='This is a great movie that you might enjoy based on your preferences and viewing history.'
                keywords='recommendation'
                pubDate={item.movie.year}
                imageUrl='/movieplaceholder.png'
                watches={item.watchers ? item.watchers : 'n/a'}
              /> 
            </div>
          }): allTrending.map((item:any,i:any)=>{
                return <div key={i}>
                  {item.type === "news" ? (
                    <ContentCard
                      id={item.article_id}
                      title={item.title}
                      description={item.description===null ? "No description available": item.description}
                      frameUrl={item.link}
                      pubDate={item.pubDate}
                      keywords={item.keywords === null ? item.country[0] : item.keywords[0]}
                      source_name={item.source_name}
                    />
                  ) : (
                    <ContentCard
                      id={item.ids.trakt}
                      title={item.title}
                      description='This is a great movie that you might enjoy based on your preferences and viewing history.'
                      keywords='recommendation'
                      pubDate={item.year}
                      imageUrl='/movieplaceholder.png'
                      watches={item.watchers ? item.watchers : 'n/a'}
                    />
                  )}
                </div>
              })}
  
</div>





      </motion.div>
  )
}

export default Trending