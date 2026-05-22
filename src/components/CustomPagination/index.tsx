"use client";

// libs
import { useMemo, type MouseEvent } from "react";
// components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  className?: string;
};

const buildPageNumbers = (page: number, totalPages: number) => {
  if (totalPages <= 5)
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  const result: (number | "dots")[] = [1];
  if (page > 3) result.push("dots");
  const middleStart = Math.max(2, page - 1);
  const middleEnd = Math.min(totalPages - 1, page + 1);
  for (let i = middleStart; i <= middleEnd; i += 1) result.push(i);
  if (page < totalPages - 2) result.push("dots");
  result.push(totalPages);
  return result;
};

const CustomPagination = ({
  page,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className
}: Props) => {
  const pageNumbers = useMemo(
    () => buildPageNumbers(page, totalPages),
    [page, totalPages]
  );
  const disabledPrev = page <= 1;
  const disabledNext = page >= totalPages;
  const handleClick = (e: MouseEvent, target: number) => {
    e.preventDefault();
    if (target < 1 || target > totalPages || target === page) return;
    onPageChange(target);
  };
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => handleClick(e, page - 1)}
            aria-disabled={disabledPrev}
            tabIndex={disabledPrev ? -1 : 0}
            className={
              disabledPrev ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
        {showPageNumbers &&
          pageNumbers.map((num, idx) =>
            num === "dots" ? (
              <PaginationItem key={`dots-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={num}>
                <PaginationLink
                  href="#"
                  isActive={num === page}
                  onClick={(e) => handleClick(e, num)}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => handleClick(e, page + 1)}
            aria-disabled={disabledNext}
            tabIndex={disabledNext ? -1 : 0}
            className={
              disabledNext ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
