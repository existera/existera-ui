"use client";

import { createPortal } from "react-dom";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { ExDatePickerCalendarProps } from "./props/ExDatePickerCalendarProps";
import type { ContentStyle } from "./types/ExDatePickerType";
import { cn } from "../../utils/Utils";
import { parseDate as parseDateValue } from "./utils/parseDate";

const GAP = 2;
const VIEWPORT_PADDING = 8;
const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const YEARS = Array.from({ length: 201 }, (_, i) => 1900 + i);
const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const PICKER_PADDING = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;

interface CalendarDay {
  date: number;
  current: boolean;
  value: Date;
}

export default function ExDatePickerCalendar({
  open,
  value,
  triggerRef,
  contentRef,
  format = "DD-MM-YYYY",
  startDate,
  endDate,
  disabledDate,
  onSelect,
  onClear,
}: ExDatePickerCalendarProps) {
  const [view, setView] = useState<"calendar" | "month" | "year">("calendar");
  const yearRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<ContentStyle>({
    top: -99999,
    left: -99999,
    minWidth: 0,
    visibility: "hidden",
  });
  const parseDate = (value?: string) => parseDateValue(value, format);
  const selectedDate = parseDate(value);
  const [currentDate, setCurrentDate] = useState(
    () => selectedDate ?? new Date(),
  );
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const today = new Date();
  const minDate = parseDate(startDate);
  const maxDate = parseDate(endDate);
  const isSelectable = (date: Date) => {
    const target = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    if (minDate) {
      const min = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate(),
      );
      if (target < min) return false;
    }
    if (maxDate) {
      const max = new Date(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        maxDate.getDate(),
      );
      if (target > max) return false;
    }
    return true;
  };

  const formatDate = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return format === "YYYY-MM-DD"
      ? `${yyyy}-${mm}-${dd}`
      : `${dd}-${mm}-${yyyy}`;
  };

  const calendar = useMemo<CalendarDay[]>(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();
    const days: CalendarDay[] = [];
    for (let i = firstDay; i > 0; i--) {
      days.push({
        date: previousMonthDays - i + 1,
        current: false,
        value: new Date(year, month - 1, previousMonthDays - i + 1),
      });
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: i,
        current: true,
        value: new Date(year, month, i),
      });
    }
    const totalCells = days.length <= 35 ? 35 : 42;
    for (let i = 1; days.length < totalCells; i++) {
      days.push({
        date: i,
        current: false,
        value: new Date(year, month + 1, i),
      });
    }
    return days;
  }, [month, year]);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const content = contentRef.current;
    if (!trigger || !content) return;
    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const openTop =
      window.innerHeight - triggerRect.bottom < contentRect.height + GAP &&
      triggerRect.top > contentRect.height;
    setStyle({
      top: openTop
        ? triggerRect.top + window.scrollY - contentRect.height - GAP
        : triggerRect.bottom + window.scrollY + GAP,
      left: Math.max(
        window.scrollX + VIEWPORT_PADDING,
        Math.min(
          triggerRect.left +
            window.scrollX +
            (triggerRect.width - contentRect.width) / 2,
          window.scrollX +
            window.innerWidth -
            contentRect.width -
            VIEWPORT_PADDING,
        ),
      ),
      minWidth: 240,
      visibility: "visible",
    });
  }, [triggerRef, contentRef]);

  useLayoutEffect(() => {
    updatePosition();
    if (view !== "year") return;
    const index = YEARS.indexOf(year);
    yearRef.current?.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: "instant",
    });
  }, [view, year, updatePosition]);

  useLayoutEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(updatePosition);
    const observer = new ResizeObserver(updatePosition);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, contentRef, updatePosition]);
  if (!open) return null;

  const isDisabledDate = (date: Date) => {
    if (disabledDate) return disabledDate.includes(formatDate(date));
  };

  return createPortal(
    <div
      ref={contentRef}
      tabIndex={-1}
      style={{
        position: "absolute",
        zIndex: 9999,
        top: style.top,
        left: style.left,
        minWidth: Math.max(style.minWidth, 260),
        visibility: style.visibility,
      }}
      className="rounded-lg border border-border bg-surface shadow-lg overflow-hidden"
      onMouseDown={(e) => {
        if ((e.target as HTMLElement).closest("button,select")) return;
        e.preventDefault();
      }}
    >
      <div
        className={cn(
          view === "calendar" ? "mb-5" : "mb-3",
          "flex justify-between items-center gap-2 px-2 pt-2",
        )}
      >
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() =>
              view === "calendar"
                ? setView("month")
                : view === "month"
                  ? setView("year")
                  : setView("calendar")
            }
            className="flex items-center gap-1 text-sm font-medium rounded-sm px-2 py-1 hover:bg-surface-3 active:bg-surface-3 cursor-pointer"
          >
            {MONTHS[month]} {year}
            <ChevronDown size={14} />
          </button>
        </div>
        <div className="flex gap-0.5">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition hover:bg-surface-3 active:bg-surface-3 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition hover:bg-surface-3 active:bg-surface-3 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      {view === "month" && (
        <div>
          <div className="grid grid-cols-3 gap-1 px-2 pb-2">
            {MONTHS.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCurrentDate(new Date(year, index, 1));
                  setView("year");
                }}
                className={`
          h-9 rounded-md text-xs transition cursor-pointer
          ${index === month ? "border border-primary text-primary" : "hover:bg-primary-soft active:bg-primary-soft hover:text-primary"}
        `}
              >
                {item.slice(0, 3)}
              </button>
            ))}
          </div>
          <div className="flex w-full justify-end text-xs mt-2 p-2 border-t border-t-border gap-2 bg-surface-2">
            <button
              type="button"
              onClick={() => setView("calendar")}
              className="flex py-1 items-center rounded-sm hover:bg-primary-soft active:bg-primary-soft px-2 text-xs font-medium text-primary transition hover:opacity-90 cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      )}
      {view === "year" && (
        <div>
          <div className="flex justify-center pb-2">
            <div className="relative w-32">
              <div
                ref={yearRef}
                className="relative h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth ex-textarea-scroll"
                style={{
                  right: "-5px",
                  height: PICKER_HEIGHT,
                  paddingTop: PICKER_PADDING,
                  paddingBottom: PICKER_PADDING,
                }}
              >
                {YEARS.map((item) => {
                  const active = item === year;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setCurrentDate(new Date(item, month, 1));
                        setView("calendar");
                      }}
                      style={{
                        height: ITEM_HEIGHT,
                      }}
                      className={`
                relative
                z-10
                flex
                w-full
                snap-center
                items-center
                justify-center
                transition-all
                duration-200
                ease-out
                select-none
                cursor-pointer
                ${
                  active
                    ? `
                        scale-110
                        text-base
                        font-semibold
                        text-primary
                      `
                    : `
                        scale-95
                        text-sm
                        text-muted
                        opacity-60
                        hover:opacity-100
                      `
                }
              `}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end text-xs mt-2 p-2 border-t border-t-border gap-2 bg-surface-2">
            <button
              type="button"
              onClick={() => setView("month")}
              className="flex py-1 items-center rounded-sm hover:bg-primary-soft active:bg-primary-soft px-2 text-xs font-medium text-primary transition hover:opacity-90 cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      )}
      {view === "calendar" && (
        <div>
          <div className="mb-1 grid grid-cols-7 gap-1 text-center px-2">
            {WEEK_DAYS.map((day) => (
              <div key={day} className="text-xs text-muted">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 px-2">
            {calendar.map(({ date, current, value }) => {
              const selectable = isSelectable(value);
              const disabled = !selectable || isDisabledDate(value);
              const isToday = value.toDateString() === today.toDateString();
              const isSelected =
                selectedDate &&
                value.getFullYear() === selectedDate.getFullYear() &&
                value.getMonth() === selectedDate.getMonth() &&
                value.getDate() === selectedDate.getDate();

              return (
                <button
                  key={value.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => { if (!disabled) onSelect?.(formatDate(value)); }}
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-center text-xs transition
          ${current ? "" : "text-muted opacity-40"}
          ${disabled ? "cursor-not-allowed opacity-35" : "cursor-pointer"}
          ${
            !disabled &&
            (isSelected
              ? "bg-primary text-white"
              : isToday
                ? "border border-primary text-primary"
                : "hover:bg-primary-soft active:bg-primary-soft hover:text-primary")
          }
        `}
                >
                  {date}
                </button>
              );
            })}
          </div>
          <div className="flex w-full justify-end text-xs mt-2 p-2 border-t border-t-border gap-2 bg-surface-2">
            <button
              type="button"
              onClick={onClear}
              className="flex py-1 items-center rounded-sm hover:bg-primary-soft active:bg-primary-soft px-2 text-xs font-medium text-primary transition hover:opacity-90 cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              disabled={!isSelectable(today) || isDisabledDate(today)}
              onClick={() => {
                const today = new Date();
                if (!isSelectable(today) || isDisabledDate(today)) return;
                setCurrentDate(today);
                onSelect?.(formatDate(today));
              }}
              className="flex py-1 items-center rounded-sm bg-primary px-2 text-xs font-medium text-white transition hover:opacity-90 cursor-pointer"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}
