import { atom } from "recoil";

const paginationAtom = atom<any>({
  key: "paginationAtom",
  default: {
    feed:{
        currentPage: 1,
        itemsPerPage: 10,
    },
    hotNews: {
        currentPage: 1,
        itemsPerPage: 10,
    },
    trendingMovies: {
        currentPage: 1,
        itemsPerPage: 10,
    },
    allTrending: {
        currentPage: 1,
        itemsPerPage: 10,
    }
  },
});

export default paginationAtom;