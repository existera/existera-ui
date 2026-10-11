"use client";

import { cn } from "../../utils/Utils";
import { KanbanColorClass, KanbanSizeClass } from "./class/ExKanbanClass";
import type { ExKanbanColumnProps } from "./props/ExKanbanColumnProps";

export default function ExKanbanColumn({
  column,
  size = "md",
  active = false,
  readOnly = true,
  children,
  className,
  ...props
}: ExKanbanColumnProps) {
  return (
    <section
      {...props}
      data-kanban-column={column.id}
      aria-label={props["aria-label"] ?? column.title}
      className={cn("flex max-w-[85vw] shrink-0 flex-col", KanbanSizeClass[size].width, className)}>
      <header className="flex items-center gap-2 px-5 pb-3">
        <span aria-hidden="true" className={cn("size-2 rounded-full", KanbanColorClass[column.color ?? "neutral"])} />
        <h3 className="min-w-0 flex-1 truncate text-sm font-semibold">{column.title}</h3>
        <span className="rounded-md bg-surface-2 px-2 py-1 text-xs tabular-nums text-muted">{column.cards.length}</span>
      </header>
      <div data-kanban-list className="flex flex-col ex-textarea-scroll min-h-50 max-h-[65vh] flex-1 overflow-y-auto px-2 gap-3">
        {children}
        {column.cards.length === 0 && (
          <p className="flex flex-col text-center text-xs justify-center items-center text-muted h-full">
            {readOnly || column.disabled ? "No cards" : "Drop a card here"}
          </p>
        )}
      </div>
    </section>
  );
}
