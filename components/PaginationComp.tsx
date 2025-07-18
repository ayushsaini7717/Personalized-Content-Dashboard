import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRecoilState, useRecoilValue } from 'recoil';
import paginationAtom from '@/recoil/paginationAtom';
import TabAtom from '@/recoil/tabAtom';
import currentViewState from '@/recoil/currentviewAtom';


const PaginationComp = () => {
  const [pagination, setPagination] = useRecoilState(paginationAtom);
  const tab = useRecoilValue(TabAtom);
  const view=useRecoilValue(currentViewState);

  const tabKey = view ==="Feed" ? "feed":tab === "HotNews"
    ? "hotNews"
    : tab === "TopMovies"
    ? "trendingMovies"
    : "allTrending";

  const currentPage = pagination[tabKey].currentPage;
  // allTrending
  const goToPage = (page: number) => {
    if (page < 1) return;
    setPagination((prev: typeof pagination) => ({
      ...prev,
      [tabKey]: {
        ...prev[tabKey],
        currentPage: page,
      },
    }));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(currentPage - 1);
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
