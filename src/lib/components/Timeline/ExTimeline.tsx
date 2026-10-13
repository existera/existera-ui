"use client";

import type { CSSProperties } from "react";
import { cn } from "../../utils/Utils";
import { TimelineColorClass, TimelineSizeClass } from "./class/ExTimelineClass";
import type { ExTimelineProps } from "./props/ExTimelineProps";

export type { ExTimelineProps } from "./props/ExTimelineProps";
export type { ExTimelineItem } from "./types/ExTimelineType";

export default function ExTimeline({
  items = [],
  size = "md",
  color = "primary",
  align = "start",
  className,
  style,
  "aria-label": label = "Timeline",
  "aria-labelledby": labelledBy,
  ...props
}: ExTimelineProps) {
  if (!items.length) return null;

  const sizes = TimelineSizeClass[size];
  const alternate = align === "alternate";

  return (
    <ol
      {...props}
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      className={cn("m-0 w-full list-none p-0 text-foreground", className)}
      style={{ "--ex-timeline-marker": sizes.diameter, ...style } as CSSProperties}>
      {items.map((item, index) => {
        const left = alternate && index % 2 === 0;

        return (
          <li
            key={item.id}
            className={cn(
              "relative grid min-w-0 grid-cols-[var(--ex-timeline-marker)_minmax(0,1fr)] gap-x-4 last:pb-0",
              sizes.spacing,
              alternate && "md:grid-cols-[minmax(0,1fr)_var(--ex-timeline-marker)_minmax(0,1fr)] md:gap-x-6",
            )}>
            {index < items.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute bottom-0 left-[calc(var(--ex-timeline-marker)/2)] top-[var(--ex-timeline-marker)] w-[2px] -translate-x-1/2 bg-border",
                  alternate && "md:left-1/2",
                )}
              />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 col-start-1 row-start-1 flex shrink-0 items-center justify-center rounded-full border",
                sizes.marker,
                TimelineColorClass[item.color ?? color],
                alternate && "md:col-start-2",
              )}>
              {item.icon ?? <span className="size-1.5 rounded-full bg-current" />}
            </span>
            <div
              className={cn(
                "col-start-2 row-start-1 min-w-0 self-start break-words pt-0.5",
                alternate && (left ? "md:col-start-1 md:text-right" : "md:col-start-3"),
              )}>
              {item.time != null && (
                <time dateTime={item.dateTime} className={cn("mb-1 block text-muted", sizes.body)}>
                  {item.time}
                </time>
              )}
              <div className={cn("font-medium leading-snug", sizes.title)}>{item.title}</div>
              {item.description != null && <div className={cn("leading-relaxed text-muted", sizes.body)}>{item.description}</div>}
              {item.content != null && (
                <div className={cn("mt-2 flex min-w-0 flex-col", sizes.body, left && "md:items-end")}>{item.content}</div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
