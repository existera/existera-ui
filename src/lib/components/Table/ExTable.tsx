"use client";

import React, { Children, isValidElement, useMemo, useState } from "react";
import type { ExTableProps } from "./props/ExTableProps";
import { cn } from "../../utils/Utils";
import { TableSizeClass } from "./class/ExTableClass";
import ExTableFooter from "./ExTableFooter";
import { ExTableContext } from "./ExTableContext";

export default function ExTable({
  size = "md",
  expandMode = "single",
  children,
}: ExTableProps) {
  const items = Children.toArray(children).filter(isValidElement);
  const headerRow = items[0];
  const footerRow = items.find((item) => item.type === ExTableFooter);
  const bodyRows = items.filter(
    (_, index) => index !== 0 && (!footerRow || items[index] !== footerRow),
  );
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const context = useMemo(
    () => ({
      expandMode,
      expandedRows,

      toggleRow(id: string) {
        setExpandedRows((prev) => {
          const next = new Set(prev);
          if (expandMode === "single") {
            if (next.has(id)) {
              next.clear();
            } else {
              next.clear();
              next.add(id);
            }
          } else {
            if (next.has(id)) {
              next.delete(id);
            } else {
              next.add(id);
            }
          }

          return next;
        });
      },
    }),
    [expandMode, expandedRows],
  );

  return (
    <ExTableContext.Provider value={context}>
      <div className="w-full overflow-x-auto rounded-md ex-textarea-scroll">
        <table
          className={cn(TableSizeClass[size], "w-full table-auto")}
          role="table"
          aria-label="Data table"
        >
          {headerRow && (
            <thead role="rowgroup">
              {React.isValidElement(headerRow) ? React.cloneElement(headerRow, {
                key: "header-row",
              }) : headerRow}
            </thead>
          )}

          {bodyRows.length > 0 && (
            <tbody role="rowgroup">
              {bodyRows.map((row, index) =>
                React.isValidElement(row) ? React.cloneElement(row, {
                  key: `row-${index}`,
                }) : row
              )}
            </tbody>
          )}
        </table>

        {footerRow && (
          <div
            className={cn(
              TableSizeClass[size],
              "border-border bg-surface-2 border-t px-3 py-2",
            )}
          >
            {footerRow}
          </div>
        )}
      </div>
    </ExTableContext.Provider>
  );
}