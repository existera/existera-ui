"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { cn } from "../../utils/Utils";
import type { ExCalendarProps } from "./props/ExCalendarProps";
import type { ExCalendarEvent, ExCalendarView } from "./types/ExCalendarType";
import { CalendarColorClass, CalendarSizeClass } from "./class/ExCalendarClass";
import {
  addDays,
  isMultiDay,
  layoutSpans,
  layoutEvents,
  navigateDate,
  sameDay,
  startOfDay,
  validEvent,
  weekStart,
} from "./utils/ExCalendarUtils";

export default function ExCalendar({
  events = [],
  date,
  defaultDate,
  view,
  defaultView = "month",
  locale = "id-ID",
  weekStartsOn = 1,
  height = "100%",
  size = "md",
  className,
  onDateChange,
  onViewChange,
  onEventClick,
}: ExCalendarProps) {
  const [internalDate, setDate] = useState(() => startOfDay(defaultDate ?? new Date()));
  const [internalView, setView] = useState<ExCalendarView>(defaultView);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const current = startOfDay(date ?? internalDate);
  const mode = view ?? internalView;
  const sizes = CalendarSizeClass[size];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: mode === "month" ? 0 : 8 * sizes.hour });
  }, [mode, sizes.hour]);

  const safeEvents = events.filter(validEvent).sort((a, b) => +a.start - +b.start || a.id.localeCompare(b.id));

  const changeDate = (next: Date) => {
    setDate(next);
    onDateChange?.(next);
  };

  const changeView = (next: ExCalendarView) => {
    setView(next);
    onViewChange?.(next);
  };

  const showDay = (day: Date) => {
    changeDate(day);
    changeView("day");
  };

  const format = (day: Date, options: Intl.DateTimeFormatOptions) => day.toLocaleDateString(locale, options);
  const time = (day: Date) => day.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });

  const first =
    mode === "month"
      ? weekStart(new Date(current.getFullYear(), current.getMonth(), 1), weekStartsOn)
      : mode === "week"
        ? weekStart(current, weekStartsOn)
        : current;

  const days = Array.from({ length: mode === "month" ? 42 : mode === "week" ? 7 : 1 }, (_, i) => addDays(first, i));

  const heading =
    mode === "day"
      ? current.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      : mode === "week"
        ? `${first.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} - ${days[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
        : current.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const isPast = (event: ExCalendarEvent) => event.end.getTime() <= now.getTime();
  const pastLabel = (event: ExCalendarEvent) => (isPast(event) ? " — Past event" : "");

  const eventButton = (event: ExCalendarEvent, pixels: number, style: CSSProperties) => (
    <button
      key={event.id}
      type="button"
      onClick={() => onEventClick?.(event)}
      data-past={isPast(event) || undefined}
      style={style}
      aria-label={
        event.title +
        ", " +
        format(event.start, { dateStyle: "medium" }) +
        ", " +
        time(event.start) +
        " - " +
        time(event.end) +
        (event.location ? ", " + event.location : "") +
        pastLabel(event)
      }
      title={
        event.title + "\n" + time(event.start) + " - " + time(event.end) + (event.location ? "\n" + event.location : "") + pastLabel(event)
      }
      className={cn(
        "ex-cal-event absolute flex min-w-0 flex-col items-stretch overflow-hidden border-l-[3px] px-2 py-1 text-left shadow-sm",
        CalendarColorClass[event.color ?? "primary"],
      )}>
      <span className={cn("block shrink-0 truncate font-semibold text-md", `text-${event.color}`)}>{event.title}</span>
      {pixels >= 55 && event.location && (
        <span className="ex-cal-card-location flex items-center gap-1 mt-1 block shrink-0 truncate text-[11px] font-medium">
          {event.location}
        </span>
      )}
      {pixels >= 55 && (
        <span className="ex-cal-card-location flex items-center gap-1 mt-0.5 block shrink-0 truncate text-[10px]">
          <Clock size={10} strokeWidth={3} /> {time(event.start)} - {time(event.end)}
        </span>
      )}
    </button>
  );

  const spanButton = (segment: ReturnType<typeof layoutSpans>[number], row: number) => {
    const { event, startColumn, endColumn, continuesBefore, continuesAfter } = segment;
    const label =
      event.title +
      ", " +
      format(event.start, { dateStyle: "medium" }) +
      " - " +
      format(new Date(+event.end - (event.allDay ? 1 : 0)), { dateStyle: "medium" });
    return (
      <button
        key={event.id}
        type="button"
        onClick={() => onEventClick?.(event)}
        data-past={isPast(event) || undefined}
        aria-label={label + pastLabel(event)}
        title={label + pastLabel(event)}
        style={{ gridColumn: startColumn + 1 + " / span " + (endColumn - startColumn), gridRow: row }}
        className={cn(
          "ex-cal-month-event cursor-pointer relative z-10 mx-0.5 my-0.5 flex min-w-0 items-center gap-1 overflow-hidden border-l-[3px] px-2 text-left text-[11px]",
          CalendarColorClass[event.color ?? "primary"],
          continuesBefore && "rounded-l-none border-l-0",
          continuesAfter && "rounded-r-none",
        )}>
        {continuesBefore && (
          <span aria-hidden="true">
            <ArrowLeft size={10} />
          </span>
        )}
        <span className={cn("truncate font-semibold hover:underline", `text-${event.color}`)}>{event.title}</span>

        {continuesAfter && (
          <span aria-hidden="true" className="ml-auto">
            <ArrowRight size={10} />
          </span>
        )}
      </button>
    );
  };

  const timedEvents = mode === "week" ? safeEvents.filter((event) => !isMultiDay(event)) : safeEvents;
  const dayLayouts = days.map((day) => layoutEvents(timedEvents, day));
  const maxColumns = Math.max(1, ...dayLayouts.flatMap((entries) => entries.map((entry) => entry.columns)));
  const weekWidth = 56 + 7 * Math.max(160, Math.min(320, maxColumns * 80));
  const control =
    "inline-flex h-8 items-center justify-center rounded-lg border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2";

  return (
    <section
      aria-label="Calendar"
      className={cn(
        "ex-calendar flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-sm",
        className,
      )}
      data-size={size}
      style={{ height, "--ex-cal-font": `${sizes.font}px` } as CSSProperties}>
      <header
        style={{ padding: sizes.padding }}
        className="ex-cal-toolbar shrink-0 flex flex-wrap items-center justify-between gap-4 border-b border-border p-4">
        <div className="min-w-0">
          <p className="mb-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Calendar</p>
          <h2 aria-live="polite" className="ex-cal-heading text-lg font-semibold tracking-tight">
            {heading}
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={`Previous ${mode}`}
            className={control}
            onClick={() => changeDate(navigateDate(current, mode, -1))}>
            <ChevronLeft size={14} />
          </button>
          <button type="button" className={control} onClick={() => changeDate(startOfDay(new Date()))}>
            Today
          </button>
          <button type="button" aria-label={`Next ${mode}`} className={control} onClick={() => changeDate(navigateDate(current, mode, 1))}>
            <ChevronRight size={14} />
          </button>
        </div>

        <div aria-label="Calendar view" className="ex-cal-view flex gap-1 rounded-xl bg-surface-2 p-1">
          {(["day", "week", "month"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => changeView(value)}
              className={cn(
                "rounded-lg px-4 py-1.5 text-xs font-medium capitalize transition-colors",
                mode === value ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground",
              )}>
              {value}
            </button>
          ))}
        </div>
      </header>

      <div ref={scrollRef} className="ex-textarea-scroll min-h-0 flex-1 overflow-auto overscroll-contain">
        {mode === "month" ? (
          <div className="flex min-h-full flex-col">
            <div className="sticky top-0 z-20 shrink-0 grid grid-cols-7 border-b border-border bg-surface">
              {days.slice(0, 7).map((day) => (
                <div key={+day} className="py-3 text-center text-[10px] font-semibold uppercase tracking-wide text-muted">
                  {format(day, { weekday: "short" })}
                </div>
              ))}
            </div>
            {Array.from({ length: 6 }, (_, week) => {
              const weekDays = days.slice(week * 7, week * 7 + 7);
              const segments = layoutSpans(safeEvents, weekDays);
              const visible = segments.filter((segment) => segment.lane < 3);
              const lanes = Math.max(1, ...visible.map((segment) => segment.lane + 1));
              return (
                <div
                  key={+weekDays[0]}
                  className="grid flex-1 grid-cols-7"
                  style={{
                    gridTemplateRows: `${sizes.header}px repeat(${lanes}, ${sizes.lane}px) minmax(24px, 1fr)`,
                    minHeight: sizes.month,
                  }}>
                  {weekDays.map((day, column) => {
                    const hidden = segments.filter(
                      (segment) => segment.lane >= 3 && segment.startColumn <= column && segment.endColumn > column,
                    ).length;
                    return (
                      <div
                        key={+day}
                        className={cn(
                          "min-w-0 border-b border-r border-border p-1",
                          day.getMonth() !== current.getMonth() && "bg-surface-2/50",
                          sameDay(day, now) && "bg-primary/5",
                        )}
                        style={{ gridColumn: column + 1, gridRow: "1 / -1" }}>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            aria-label={`View ${format(day, { dateStyle: "full" })}`}
                            aria-current={sameDay(day, now) ? "date" : undefined}
                            onClick={() => showDay(day)}
                            className={cn(
                              "flex size-6 items-center justify-center rounded-full text-xs",
                              sameDay(day, now) ? "bg-primary font-semibold text-background" : "hover:bg-surface-3",
                              day.getMonth() !== current.getMonth() && "text-muted",
                            )}>
                            {day.getDate()}
                          </button>
                        </div>
                        {hidden > 0 && (
                          <button
                            type="button"
                            onClick={() => showDay(day)}
                            style={{ marginTop: sizes.header - 28 + lanes * sizes.lane }}
                            className="text-[10px] font-medium text-muted hover:text-foreground cursor-pointer hover:underline">
                            +{hidden} more
                          </button>
                        )}
                      </div>
                    );
                  })}
                  {visible.map((segment) => spanButton(segment, segment.lane + 2))}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={mode === "week" ? "ex-cal-timed" : "ex-cal-day"} style={mode === "week" ? { minWidth: weekWidth } : undefined}>
            <div className="sticky top-0 z-30 bg-surface shadow-sm">
              <div className="grid border-b border-border" style={{ gridTemplateColumns: `56px repeat(${days.length}, minmax(0, 1fr))` }}>
                <div className="sticky left-0 z-40 self-stretch content-end border-r border-border bg-surface pb-3 text-center text-[9px] text-muted">
                  LOCAL
                </div>
                {days.map((day) => (
                  <button
                    key={+day}
                    type="button"
                    onClick={() => showDay(day)}
                    aria-current={sameDay(day, now) ? "date" : undefined}
                    className="flex flex-col items-center gap-1 border-l border-border py-3">
                    <span className="text-[10px] uppercase tracking-wide text-muted">{format(day, { weekday: "short" })}</span>
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full text-lg font-semibold",
                        sameDay(day, now) && "bg-primary text-background",
                      )}>
                      {day.getDate()}
                    </span>
                  </button>
                ))}
              </div>
              <div className="grid border-b border-border" style={{ gridTemplateColumns: `56px repeat(${days.length}, minmax(0, 1fr))` }}>
                <span className="sticky left-0 z-40 border-r border-border bg-surface py-3 text-center text-[9px] text-muted">
                  All day /<br />
                  Multi-day
                </span>
                <div
                  className="ex-textarea-scroll grid max-h-32 min-w-0 overflow-y-auto py-1"
                  style={{
                    gridColumn: `2 / span ${days.length}`,
                    gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
                    gridAutoRows: `${sizes.lane}px`,
                  }}>
                  {layoutSpans(
                    safeEvents.filter((event) => event.allDay || (mode === "week" && isMultiDay(event))),
                    days,
                  ).map((segment) => spanButton(segment, segment.lane + 1))}
                </div>
              </div>
            </div>
            <div className="grid" style={{ gridTemplateColumns: `56px repeat(${days.length}, minmax(0, 1fr))` }}>
              <div aria-hidden="true" className="sticky left-0 z-30 border-r border-border bg-surface">
                {Array.from({ length: 24 }, (_, hour) => (
                  <div key={hour} style={{ height: sizes.hour }} className="pr-2 pt-1 text-right text-[9px] tabular-nums text-muted">
                    {String(hour).padStart(2, "0")}:00
                  </div>
                ))}
              </div>

              {days.map((day, dayIndex) => (
                <div key={+day} style={{ height: sizes.hour * 24 }} className="relative min-w-0 border-l border-border">
                  <div aria-hidden="true">
                    {Array.from({ length: 48 }, (_, slot) => (
                      <div
                        key={slot}
                        style={{ height: sizes.hour / 2 }}
                        className={cn("w-full border-t", slot % 2 ? "border-dashed border-border/40" : "border-border/70")}
                      />
                    ))}
                  </div>

                  {dayLayouts[dayIndex].map(({ event, start, end, column, columns, span }) => {
                    const pixels = ((end - start) / 60) * sizes.hour - 2;
                    return eventButton(event, pixels, {
                      top: (start / 60) * sizes.hour,
                      height: pixels,
                      left: "calc(" + (column / columns) * 100 + "% + 2px)",
                      width: "calc(" + (span / columns) * 100 + "% - 5px)",
                      zIndex: 10,
                    });
                  })}

                  {sameDay(day, now) && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 z-20 border-t border-danger"
                      style={{ top: `${((now.getHours() * 60 + now.getMinutes()) / 1440) * 100}%` }}>
                      <span className="absolute -left-1 -top-1 size-2 rounded-full bg-danger" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
