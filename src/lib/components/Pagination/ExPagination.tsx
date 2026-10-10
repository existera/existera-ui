"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import ExButton from "../Button/ExButton";
import type { ExPaginationProps } from "./props/ExPagintationProps";

export default function ExPagination({
  color = "primary",
  variant = "solid",
  page = 1,
  total = 10,
  range = 3,
  size = "md",
  radius = "default",
  onPageChange,
}: ExPaginationProps) {
  const pages: (number | "...")[] = [];
  if (total <= range + 2) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    const half = Math.floor(range / 2);
    let start = Math.max(2, page - half);
    let end = Math.min(total - 1, page + half);
    if (page <= half + 1) {
      start = 2;
      end = range;
    }
    if (page >= total - half) {
      start = total - range + 1;
      end = total - 1;
    }
    pages.push(1);
    if (start > 2) {
      pages.push("...");
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < total - 1) {
      pages.push("...");
    }
    pages.push(total);
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      <ExButton
        iconOnly
        color={color}
        variant="text"
        radius={radius}
        size={size}
        disabled={page === 1}
        onClick={() => onPageChange?.(page - 1)}>
        <ChevronLeft size={16} />
      </ExButton>

      <div className="flex items-center gap-1">
        {pages.map((item, index) =>
          item === "..." ? (
            <span key={`ellipsis-${index}`} className="text-muted px-2 select-none">
              ...
            </span>
          ) : (
            <ExButton
              key={item}
              color={color}
              size={size}
              radius={radius}
              variant={item === page ? variant : "text"}
              iconOnly
              onClick={() => onPageChange?.(item)}>
              {item}
            </ExButton>
          ),
        )}
      </div>

      <ExButton
        iconOnly
        color={color}
        size={size}
        radius={radius}
        variant="text"
        disabled={page === total}
        onClick={() => onPageChange?.(page + 1)}>
        <ChevronRight size={16} />
      </ExButton>
    </nav>
  );
}
