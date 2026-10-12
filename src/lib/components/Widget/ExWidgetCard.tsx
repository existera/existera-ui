"use client";

import { useContext } from "react";
import { GripHorizontal, MoveDiagonal2 } from "lucide-react";
import { cn } from "../../utils/Utils";
import { ExWidgetContext } from "./ExWidgetContext";
import type { ExWidgetCardProps } from "./props/ExWidgetCardProps";
import type { ExWidgetAction } from "./types/ExWidgetType";

export default function ExWidgetCard({ widgetId, title, actions, draggable = true, resizable = true,
  contentClassName, moveLabel, resizeLabel, children, className, ...props }: ExWidgetCardProps) {
  const context = useContext(ExWidgetContext);
  const label = typeof title === "string" ? title : widgetId;
  const handle = (action: ExWidgetAction) => ({
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => context?.start(event, action),
    onPointerMove: context?.move,
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => context?.finish(event),
    onPointerCancel: (event: React.PointerEvent<HTMLButtonElement>) => context?.finish(event, true),
    onLostPointerCapture: (event: React.PointerEvent<HTMLButtonElement>) => context?.finish(event, true),
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => context?.keyboard(event, action),
    "aria-describedby": context?.instructionsId,
  });
  const handleClass = "touch-none select-none rounded-md text-muted transition-opacity duration-150 motion-reduce:transition-none hover:bg-surface-3 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary opacity-0 group-hover/widget:opacity-100 group-focus-within/widget:opacity-100 [@media(hover:none)]:opacity-100";

  return (
    <article {...props} data-widget-card={widgetId} aria-label={props["aria-label"] ?? label}
      className={cn("group/widget relative flex h-full min-h-0 min-w-0 flex-col rounded-2xl border border-border bg-surface text-foreground shadow-sm transition-shadow duration-150 motion-reduce:transition-none",
        context?.active && "z-10 select-none ring-2 ring-primary shadow-xl", className)}>
      <header className="flex min-h-10 shrink-0 items-center gap-2 px-3 pt-2 pb-1">
        <div className="min-w-0 flex-1 truncate text-sm font-medium">{title}</div>
        {actions}
        {context?.editable && draggable && (
          <button type="button" {...handle("move")} aria-label={moveLabel ?? `Move ${label}`}
            title={moveLabel ?? `Move ${label}`} className={cn(handleClass, "flex size-8 shrink-0 cursor-grab items-center justify-center active:cursor-grabbing")}>
            <GripHorizontal size={18} aria-hidden="true" />
          </button>
        )}
      </header>
      <div className={cn("min-h-0 flex-1 overflow-auto px-4 pt-2 pb-8", contentClassName)}>{children}</div>
      {context?.editable && resizable && (
        <button type="button" {...handle("resize")} aria-label={resizeLabel ?? `Resize ${label}`}
          title={resizeLabel ?? `Resize ${label}`} className={cn(handleClass, "absolute bottom-1 right-1 flex size-7 cursor-nwse-resize items-center justify-center")}>
          <MoveDiagonal2 size={16} aria-hidden="true" />
        </button>
      )}
    </article>
  );
}
