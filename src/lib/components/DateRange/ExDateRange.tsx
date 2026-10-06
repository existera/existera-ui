"use client";

import type { CompoundDateRange } from "./types/ExDateRangeType";
import Prefix from "../Prefix/ExPrefix";
import Suffix from "../Suffix/ExSuffix";
import ExPrefix from "../Prefix/ExPrefix";
import ExSuffix from "../Suffix/ExSuffix";
import { Children, isValidElement, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/Utils";
import { DateRangePadding, DateRangeSizeClass, DateRangeStateClass, DateRangeStateIconSize } from "./class/DateRangeClass";
import { ArrowRight, CircleCheck, Loader, TriangleAlert, X } from "lucide-react";
import ExDateRangeCalendar from "./ExDateRangeCalendar";

const ExDateRange: CompoundDateRange = ({
  children,
  id,
  startDatePlaceholder = "Start Date",
  endDatePlaceholder = "End Date",
  startDateValue,
  endDateValue,
  leftIcon,
  rightIcon,
  size = "md",
  radius = "default",
  state = "default",
  clearable = false,
  loading = false,
  format = "DD-MM-YYYY",
  debounce = 0,
  startDate,
  endDate,
  disabledDate = [],
  disabled = false,
  onType,
}) => {
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const startControlled = startDateValue !== undefined;

  const [startInternalValue, setStartInternalValue] = useState(startDateValue ?? "");

  const [endInternalValue, setEndInternalValue] = useState(endDateValue ?? "");

  let prefix: React.ReactNode = null;
  let suffix: React.ReactNode = null;

  Children.forEach(children, (child) => {
    if (!isValidElement<{ children: React.ReactNode }>(child)) return;

    if (child.type === Prefix) {
      prefix = child.props.children;
    }

    if (child.type === Suffix) {
      suffix = child.props.children;
    }
  });

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const nextValue = e.target.value;

    if (!startControlled) {
      setStartInternalValue(nextValue);
    }

    if (!onType) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (debounce <= 0) {
      onType(nextValue);
      return;
    }

    debounceRef.current = setTimeout(() => {
      onType(nextValue);
    }, debounce);
  };

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const nextValue = e.target.value;

    setEndInternalValue(nextValue);

    if (!onType) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (debounce <= 0) {
      onType(nextValue);
      return;
    }

    debounceRef.current = setTimeout(() => {
      onType(nextValue);
    }, debounce);
  };

  const handleClear = () => {
    if (disabled) return;

    setStartInternalValue("");
    setEndInternalValue("");

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    onType?.("");
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (triggerRef.current?.contains(target)) return;
      if (contentRef.current?.contains(target)) return;

      setOpen(false);
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        className={cn(
          DateRangeSizeClass[size].height,
          DateRangeSizeClass[size].radius[radius].default,
          "flex w-full items-center border border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.28),inset_0_-1px_1px_rgba(255,255,255,0.035)]",
          disabled ? "cursor-not-allowed bg-secondary" : "bg-surface-2",
        )}>
        {prefix && (
          <ExPrefix radius={radius} size={size}>
            {prefix}
          </ExPrefix>
        )}

        <div
          className={cn(
            "relative flex h-full w-full items-center",
            DateRangePadding[size].wrapper,
            DateRangeStateClass[state],
            !suffix && prefix && DateRangeSizeClass[size].radius[radius].prefix,
            !prefix && suffix && DateRangeSizeClass[size].radius[radius].suffix,
            !prefix && !suffix && DateRangeSizeClass[size].radius[radius].default,
            disabled && "cursor-not-allowed",
          )}>
          {leftIcon && (
            <div className={cn(DateRangePadding[size].left, disabled || !focused ? "text-muted" : "text-foreground")}>{leftIcon}</div>
          )}

          <div className="grid w-full grid-cols-7 items-center justify-between">
            <input
              className={cn(
                "col-span-3 w-full bg-transparent pl-1 outline-none focus:border-none focus:outline-none focus:ring-0",
                disabled && "cursor-not-allowed text-muted",
              )}
              id={id}
              ref={inputRef}
              readOnly
              disabled={disabled}
              placeholder={startDatePlaceholder}
              value={startInternalValue}
              onChange={handleChangeStart}
              onFocus={() => {
                if (disabled) return;

                setOpen(true);
                setFocused(true);
              }}
              onBlur={(e) => {
                setFocused(false);

                const next = e.relatedTarget as Node | null;

                if (next && contentRef.current?.contains(next)) {
                  return;
                }

                setOpen(false);
              }}
            />

            <div className="flex w-full items-center justify-center">
              <ArrowRight className={cn(DateRangeStateIconSize[size], disabled && "text-muted")} />
            </div>

            <input
              className={cn(
                "col-span-3 w-full bg-transparent pr-1 text-end outline-none focus:border-none focus:outline-none focus:ring-0",
                disabled && "cursor-not-allowed text-muted",
              )}
              id={id}
              ref={inputRef}
              readOnly
              disabled={disabled}
              placeholder={endDatePlaceholder}
              value={endInternalValue}
              onChange={handleChangeEnd}
              onFocus={() => {
                if (disabled) return;

                setOpen(true);
                setFocused(true);
              }}
              onBlur={(e) => {
                setFocused(false);

                const next = e.relatedTarget as Node | null;

                if (next && contentRef.current?.contains(next)) {
                  return;
                }

                setOpen(false);
              }}
            />
          </div>

          {loading && (
            <div className="pl-2 text-muted">
              <Loader className={cn(DateRangeStateIconSize[size], "animate-spin-slow")} />
            </div>
          )}

          {clearable && (startInternalValue || endInternalValue) && !disabled && (
            <div className="flex items-center pl-2">
              <button
                type="button"
                disabled={disabled}
                onClick={handleClear}
                className={cn(DateRangeStateIconSize[size], "cursor-pointer border-none bg-transparent p-0 text-muted outline-none")}>
                <X className={DateRangeStateIconSize[size]} />
              </button>
            </div>
          )}

          {state === "success" && (
            <div className="pl-2 text-success">
              <CircleCheck className={DateRangeStateIconSize[size]} />
            </div>
          )}

          {state === "error" && (
            <div className="pl-2 text-danger">
              <TriangleAlert className={DateRangeStateIconSize[size]} />
            </div>
          )}

          {rightIcon && (
            <div className={cn(DateRangePadding[size].right, disabled || !focused ? "text-muted" : "text-foreground")}>{rightIcon}</div>
          )}
        </div>

        {suffix && (
          <ExSuffix radius={radius} size={size}>
            {suffix}
          </ExSuffix>
        )}
      </div>

      {open && !disabled && (
        <ExDateRangeCalendar
          open={open}
          triggerRef={triggerRef}
          contentRef={contentRef}
          disabledDate={disabledDate}
          format={format}
          startDate={startDate}
          endDate={endDate}
          startDateValue={startInternalValue}
          endDateValue={endInternalValue}
          onSelectStart={(e) => {
            if (disabled) return;

            setStartInternalValue(e);
          }}
          onSelectEnd={(e) => {
            if (disabled) return;

            setEndInternalValue(e);
          }}
          onClear={() => {
            if (disabled) return;

            setStartInternalValue("");
            setEndInternalValue("");
            onType?.("");
          }}
        />
      )}
    </>
  );
};

ExDateRange.Prefix = Prefix;
ExDateRange.Suffix = Suffix;

export default ExDateRange;
