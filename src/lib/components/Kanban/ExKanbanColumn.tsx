"use client";

import { cn } from "../../utils/Utils";
import { KanbanColorClass, KanbanSizeClass } from "./class/ExKanbanClass";
import type { ExKanbanColumnProps } from "./props/ExKanbanColumnProps";

export default function ExKanbanColumn({ column, size = "md", active = false, readOnly = true, children, className, ...props }: ExKanbanColumnProps) {
  return <section {...props} data-kanban-column={column.id} aria-label={props["aria-label"] ?? column.title} className={cn("flex max-w-[85vw] shrink-0 flex-col rounded-2xl border bg-surface-2 transition-colors motion-reduce:transition-none", KanbanSizeClass[size].width, active ? "border-primary/60" : "border-border", className)}>
    <header className="flex items-center gap-2.5 border-b border-border px-4 py-4"><span aria-hidden="true" className={cn("size-2 rounded-full", KanbanColorClass[column.color ?? "neutral"])} /><h3 className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{column.title}</h3><span className="rounded-md bg-surface-3 px-2 py-0.5 text-xs tabular-nums text-muted">{column.cards.length}</span></header>
    <div data-kanban-list className="ex-textarea-scroll min-h-40 max-h-[65vh] flex-1 overflow-y-auto p-2">
      {children}
      {column.cards.length === 0 && <p className="rounded-lg border border-dashed border-border px-3 py-8 text-center text-xs text-muted">{readOnly || column.disabled ? "No cards" : "Drop a card here"}</p>}
    </div>
  </section>;
}
