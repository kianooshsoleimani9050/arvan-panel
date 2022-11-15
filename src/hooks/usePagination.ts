import { useMemo } from "react";
import { paginationRange } from "../utils/common";

const DOTS = "...";

const siblingCount = 1;

type UsePaginationType = {
  totalPageCount: number;
  currentPage: number;
};
export const usePagination = ({
  currentPage,
  totalPageCount,
}: UsePaginationType) =>
  useMemo(() => {
    const totalPageNumbers = siblingCount + 3;

    if (totalPageNumbers >= totalPageCount) {
      return paginationRange(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 2 + 2 * siblingCount;
      let leftRange = paginationRange(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 2 + 2 * siblingCount;
      let rightRange = paginationRange(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = paginationRange(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPageCount, currentPage]);
