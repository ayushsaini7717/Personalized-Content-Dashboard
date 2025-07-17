import { atom } from 'recoil';
const trendingPageAtom = atom({
    key: 'trendingPageAtom',
    default: {
      hotNews: 1,
      trendingMovies: 1,
      allTrending: 1,
}})

export default trendingPageAtom;