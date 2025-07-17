import { atom } from 'recoil';

const CachedAtom = atom({
    key: 'CachedAtom',
    default: {
        hotNews: [] as any[],
        trendingMovies: [] as any[],
        allTrending: [] as any[],
    },
});

export default CachedAtom;