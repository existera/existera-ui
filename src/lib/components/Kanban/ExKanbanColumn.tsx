"use client";

import { cn } from "../../utils/Utils";
import { KanbanSizeClass } from "./class/ExKanbanClass";
import type { ExKanbanColumnProps } from "./props/ExKanbanColumnProps";

export default function ExKanbanColumn({
  column: columnData,
  id,
  title,
  header,
  disabled,
  size = "md",
  active = false,
  readOnly = true,
  children,
  className,
  ...props
}: ExKanbanColumnProps) {
  const column = columnData ?? { id: id ?? "", title: title ?? props["aria-label"] ?? id ?? "Column", cards: [], disabled };
  return (
    <section
      {...props}
      data-kanban-column={column.id}
      data-active={active || undefined}
      aria-label={props["aria-label"] ?? column.title}
      className={cn("flex max-w-[85vw] shrink-0 flex-col", KanbanSizeClass[size].width, className)}>
      {header != null && <header className="flex items-center gap-2 px-5 pb-3">{header}</header>}
      <div data-kanban-list className="flex flex-col ex-textarea-scroll min-h-50 max-h-[65vh] flex-1 overflow-y-auto px-2 py-1 gap-3">
        {children}
        {(columnData ? column.cards.length === 0 : !children) && (
          <p className="flex flex-col text-center text-xs justify-center items-center text-muted h-full">
            {readOnly || column.disabled ? "No cards" : "Drop a card here"}
          </p>
        )}
      </div>
    </section>
  );
}
