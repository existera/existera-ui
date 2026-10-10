"use client";

import type { ReactNode } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "../../utils/Utils";

export default function ExTableHeader({
  sortable = false,
  sortDirection,
  onSort,
  textAlign = "left",
  children,
}: {
  sortable?: boolean;
  sortDirection?: "asc" | "desc";
  onSort?: () => void;
  textAlign?: "left" | "right";
  children?: ReactNode;
}) {
  const Icon =
    sortDirection === "asc"
      ? ChevronUp
      : sortDirection === "desc"
        ? ChevronDown
        : ChevronsUpDown;

  return (
    <th
      scope="col"
      className={cn(
        textAlign === "left" ? "text-left" : "text-right",
        "bg-surface-2 px-3 py-2 font-medium border-b border-border",
      )}
      role="columnheader"
      aria-sort={
        sortDirection
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            "inline-flex items-center gap-2 hover:text-primary transition-colors cursor-pointer",
            textAlign === "right" && "ml-auto",
          )}
        >
          <span>{children}</span>
          <Icon size={14} strokeWidth={2} />
        </button>
      ) : (
        children
      )}
    </th>
  );
}