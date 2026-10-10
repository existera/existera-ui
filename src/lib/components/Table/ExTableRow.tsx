"use client";

import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useContext,
  useMemo,
} from "react";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ExTableCell from "./ExTableCell";
import ExTableExpand from "./ExTableExpand";
import ExTableHeader from "./ExTableHeader";
import { ExTableContext } from "./ExTableContext";
import type { ExTableRowProps } from "./props/ExTableProps";
import type { TableElement, TableExpandElement } from "./types/ExTableType";
import { cn } from "../../utils/Utils";

export default function ExTableRow({
  id,
  expandable = false,
  children,
}: ExTableRowProps) {
  const table = useContext(ExTableContext);
  const open = id ? (table?.expandedRows.has(id) ?? false) : false;
  const items = Children.toArray(children);
  const cells = useMemo(
    () =>
      items.filter(
        (child): child is TableElement =>
          isValidElement(child) &&
          (child.type === ExTableCell || child.type === ExTableHeader),
      ),
    [items],
  );
  const expand = useMemo(
    () =>
      items.find(
        (child): child is TableExpandElement =>
          isValidElement(child) && child.type === ExTableExpand,
      ),
    [items],
  );
  const isHeaderRow =
    cells.length > 0 && cells.every((cell) => cell.type === ExTableHeader);

  return (
    <Fragment>
      <tr
        role="row"
        aria-expanded={expandable ? open : undefined}
        className={cn(
          !isHeaderRow && expandable
            ? "cursor-pointer border-b border-border bg-surface-2 transition-colors"
            : "border-b border-border bg-surface-2",
          open ? "bg-surface-3" : "hover:bg-surface-3",
        )}
        onClick={() => {
          if (!isHeaderRow && expandable && id) {
            table?.toggleRow(id);
          }
        }}
      >
        {cells.map((cell, index) => {
          if (
            isHeaderRow ||
            !expandable ||
            index !== 0 ||
            cell.type === ExTableHeader
          ) {
            return cloneElement(cell, {
              key: index,
            });
          }
          return cloneElement(cell, {
            key: index,
            children: (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    rotate: open ? 90 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronRight size={12} />
                </motion.div>

                {cell.props.children}
              </div>
            ),
          });
        })}
      </tr>

      <AnimatePresence initial={false}>
        {!isHeaderRow && expandable && open && expand && (
          <tr className="border-b border-border" role="row">
            <td colSpan={cells.length} className="p-0">
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="overflow-hidden p-4 bg-surface-2"
              >
                {expand.props.children}
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </Fragment>
  );
}