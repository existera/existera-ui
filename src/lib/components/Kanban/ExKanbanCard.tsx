"use client";

import { cn } from "../../utils/Utils";
import ExBadge from "../Badge/ExBadge";
import { KanbanPriorityClass, KanbanSizeClass } from "./class/ExKanbanClass";
import type { ExKanbanCardProps } from "./props/ExKanbanCardProps";

export default function ExKanbanCard({
  card,
  size = "md",
  moving = false,
  locked = true,
  renderCard,
  onCardClick,
  className,
  style,
  ...props
}: ExKanbanCardProps) {
  const styles = KanbanSizeClass[size];
  return (
    <article
      {...props}
      data-kanban-card={card.id}
      aria-label={props["aria-label"] ?? card.title}
      style={{ touchAction: locked ? "auto" : "none", ...style }}
      className={cn(
        "group relative focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-[var(--radius-full-sm)] border border-border bg-surface",
        styles.padding,
        !locked && "cursor-grab active:cursor-grabbing select-none",
        moving && "opacity-20 border-dashed ring-2 ring-primary/30",
        locked && "bg-surface-2",
        className,
      )}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium uppercase tracking-wider text-muted">{card.id}</span>
        {card.priority && (
          <ExBadge className="capitalize" size="sm" variant="soft">
            {card.priority}
          </ExBadge>
        )}
      </div>
      {renderCard ? (
        renderCard(card)
      ) : (
        <>
          <button
            type="button"
            data-kanban-title
            aria-disabled={!onCardClick}
            onClick={() => onCardClick?.(card)}
            className={cn(
              "block w-full break-words text-left font-semibold leading-snug text-foreground enabled:hover:underline focus-visible:outline-2 focus-visible:outline-primary cursor-pointer",
            )}>
            {card.title}
          </button>
          {card.description && <p className="mt-2 line-clamp-3 break-words text-xs leading-relaxed">{card.description}</p>}
          <div className="flex w-full justify-between items-end mt-3">
            {card.priority && (
              <ExBadge className="capitalize" size="sm" variant="soft">
                {card.priority}
              </ExBadge>
            )}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              {card.assignee && <span className="ml-auto max-w-full truncate text-[11px] text-muted">{card.assignee}</span>}
            </div>
          </div>
        </>
      )}
    </article>
  );
}
