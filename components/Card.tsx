"use client";
import { Heart,Eye } from 'lucide-react';
import { useRecoilState } from 'recoil';
import favoritesState from '@/recoil/favoriteListAtom';
import { motion } from "framer-motion";

type Props = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    frameUrl?: string;
    pubDate?: string;
    keywords? : string;
    watches?: any;
    source_name?: string;
    onClick?: () => void;
};
  
const ContentCard = ({id, title, description, imageUrl, onClick ,frameUrl,pubDate,keywords,watches,source_name}: Props) => {
    const [favorites, setFavorites] = useRecoilState(favoritesState);
    const isFavorited = favorites.some((item) => item.id === id);

    const toggleFavorite = () => {
      if (isFavorited) {
        setFavorites(favorites.filter((item) => item.id !== id));
      } else {
        setFavorites((prev) => [...prev, { id, title, description, imageUrl }]);
      }
    };
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
      >
        {imageUrl ? (
          <div className="relative w-full h-48">
          <div className="absolute top-2 left-2 z-10 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded shadow">
            {keywords}
          </div>
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
          </div>
        ) : <div className="relative w-full h-48">
          <div className="absolute top-2 left-2 z-10 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded shadow">
            {keywords}
          </div>
      
        <iframe
          src={frameUrl}
          className="w-full h-full object-cover rounded"
         
          allowFullScreen
        ></iframe>
      </div>}

        <div className="p-4 flex-grow space-y-2">
        <div className='flex gap-2'>
          {watches? <Eye/> : null}
          {watches ? watches : null}
        </div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300"> {(description || "No description available").slice(0, 300)}
          {(description && description.length > 300) ? "..." : null}</p>
        </div>

        {source_name ? <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold flex justify-center">
             Source: {source_name}
          </div>: null}
          
        
        <div className="p-4 pt-0 flex justify-between items-center">
          <button className='flex gap-2 items-center hover:bg-gray-50 transition ease-in-out p-2 rounded cursor-pointer' onClick={toggleFavorite}>
            {isFavorited ? (
              <Heart className="w-5 h-5 text-red-500" fill="red" />
            ) : (
              <Heart className="w-5 h-5 text-gray-500" />
            )}
            <span className='text-sm text-gray-700 font-semibold'>
              Favorite
            </span>
          </button>
          <div className='text-gray-500 text-sm font-semibold'>{pubDate}</div>
        </div>
      </motion.div>

    );
};
  
export default ContentCard;
  