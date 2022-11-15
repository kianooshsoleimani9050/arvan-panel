import { memo } from "react";
import { Pagination } from "react-bootstrap";
import { CustomPaginationPropsType } from "../@types/components/CustomPagination.model";
import { usePagination } from "../hooks/usePagination";

export const CustomPagination = memo(
  ({
    totalPages,
    activePage,
    onNextClick,
    onPrevClick,
    onPageClick,
  }: CustomPaginationPropsType) => {
    const pagination = usePagination({
      currentPage: activePage,
      totalPageCount: totalPages,
    });
    return (
      <Pagination>
        <Pagination.Prev onClick={onPrevClick} disabled={activePage === 1} />
        {pagination?.map((pageItem, index) => {
          if (typeof pageItem === "string") {
            return (
              <Pagination.Ellipsis key={`pagination${pageItem}${index}`} />
            );
          }
          return (
            <Pagination.Item
              key={`pagination${pageItem}${index}`}
              onClick={() => {
                onPageClick(pageItem);
              }}
              active={pageItem === activePage}
            >
              {pageItem}
            </Pagination.Item>
          );
        })}
        <Pagination.Next
          onClick={onNextClick}
          disabled={activePage === pagination?.[pagination.length - 1]}
        />
      </Pagination>
    );
  },
);
