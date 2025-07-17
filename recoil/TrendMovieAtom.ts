import { atom } from 'recoil';

const TrendMovieAtom = atom<any[]>({
    key: 'TraktRecommendationsState',
    default: [],
});

export default TrendMovieAtom;