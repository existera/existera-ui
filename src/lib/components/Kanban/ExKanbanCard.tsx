"use client";

import { cn } from "../../utils/Utils";
import { KanbanPriorityClass, KanbanSizeClass } from "./class/ExKanbanClass";
import type { ExKanbanCardProps } from "./props/ExKanbanCardProps";

export default function ExKanbanCard({ card, size = "md", moving = false, locked = true, renderCard, onCardClick, className, style, ...props }: ExKanbanCardProps) {
  const styles = KanbanSizeClass[size];
  return <article {...props} data-kanban-card={card.id} aria-label={props["aria-label"] ?? card.title}
    style={{ touchAction: locked ? "auto" : "none", ...style }}
    className={cn("group relative mb-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-xl border border-border bg-surface shadow-sm", styles.padding, !locked && "cursor-grab active:cursor-grabbing select-none", moving && "opacity-20 border-dashed ring-2 ring-primary/30", locked && "bg-surface-2", className)}>
                  <div className="mb-2 flex items-center justify-between gap-2"><span className="truncate text-[10px] font-medium uppercase tracking-wider text-muted">{card.id}</span></div>
                  {renderCard ? renderCard(card) : <><button type="button" data-kanban-title aria-disabled={!onCardClick} onClick={() => onCardClick?.(card)} className={cn("block w-full break-words text-left font-semibold leading-snug text-foreground enabled:hover:underline focus-visible:outline-2 focus-visible:outline-primary", styles.title)}>{card.title}</button>{card.description && <p className="mt-2 line-clamp-3 break-words text-xs leading-relaxed text-muted">{card.description}</p>}{Boolean(card.labels?.length) && <div className="mt-3 flex flex-wrap gap-1">{card.labels?.map((tag, tagIndex) => <span key={`${tag}-${tagIndex}`} className="rounded bg-surface-3 px-2 py-1 text-[10px] text-muted">{tag}</span>)}</div>}<div className="mt-4 flex flex-wrap items-center justify-between gap-2">{card.priority && <span className={cn("rounded px-2 py-1 text-[10px] font-medium capitalize", KanbanPriorityClass[card.priority])}>{card.priority}</span>}{card.assignee && <span className="ml-auto max-w-full truncate text-[11px] text-muted">{card.assignee}</span>}</div></>}
                
  </article>;
}
