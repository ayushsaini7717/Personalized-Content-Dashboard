import React from 'react'
import {motion} from 'framer-motion'
import { useRecoilState } from 'recoil'
import favoritesState from '@/recoil/favoriteListAtom'
import ContentCard from './Card'
import { Heart } from 'lucide-react'

const Favorites = () => {
  const [favorites] = useRecoilState(favoritesState)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full flex flex-col min-h-screen pt-4"
      >
      {/* <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      <p className="text-gray-600">Content you've marked as favorite ({favorites.length} items)</p> */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6 pb-4 flex gap-2 items-center">
        <div>
          <Heart className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Your Favorites</h2>
          <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300">
            Content you've marked as favorite ({favorites.length} items)
          </h4>
        </div>
      </div>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven't added anything to favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      )}
      </motion.div>  
  )
}

export default Favorites