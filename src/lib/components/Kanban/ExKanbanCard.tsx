"use client";

import { cn } from "../../utils/Utils";

import { KanbanSizeClass } from "./class/ExKanbanClass";
import type { ExKanbanCardProps } from "./props/ExKanbanCardProps";

export default function ExKanbanCard({
  card: cardData,
  id,
  title,
  children,
  actions,
  disabled,
  size = "md",
  moving = false,
  locked = true,
  renderCard,
  onCardClick,
  className,
  style,
  ...props
}: ExKanbanCardProps) {
  const card = cardData ?? { id: id ?? "", title: title ?? props["aria-label"] ?? id ?? "Card", disabled };
  const styles = KanbanSizeClass[size];
  return (
    <article
      {...props}
      data-kanban-card={card.id}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented && !(event.target as HTMLElement).closest("button, a, input, textarea, select, [contenteditable=true]"))
          onCardClick?.(card);
      }}
      aria-label={props["aria-label"] ?? card.title}
      style={{ touchAction: locked ? "auto" : "none", ...style }}
      className={cn(
        "group relative focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-[var(--radius-full-sm)] border border-border bg-surface",
        styles.padding,
        !locked && "cursor-grab active:cursor-grabbing select-none",
        moving && "opacity-20 border-dashed ring-2 ring-primary",
        locked && "bg-surface-2",
        className,
      )}>
      {children !== undefined ? children : renderCard ? renderCard(card) : <h3 className="text-sm font-medium">{card.title}</h3>}
      {actions && <div className="mt-2 flex justify-end opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" data-kanban-no-drag>{actions}</div>}
    </article>
  );
}
