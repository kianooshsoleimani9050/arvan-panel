export type CustomPaginationPropsType = {
  totalPages: number;
  activePage: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  onPageClick: (pageNumber: number) => void;
};
