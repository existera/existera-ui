"use client";
import { usePickerKeyboard } from "../../hooks/usePickerKeyboard";
import { useNativeField } from "../../hooks/useNativeField";

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

const ExDateRange: CompoundDateRange = (props) => {
  const {
    children,
    id,
    value,
    defaultValue,
    name,
    startName,
    endName,
    ref,
    endRef,
    readOnly = false,
    startDatePlaceholder = "Start Date",
    endDatePlaceholder = "End Date",
    startDateValue,
    endDateValue,
    onChange,
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
    endPlaceholder,
    ...nativeProps
  } = props;
 void endPlaceholder;
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRangeRef = useRef<{ startDate: string; endDate: string } | null>(null);
  const typeCallback = useRef(onType);
  useEffect(() => { typeCallback.current = onType; }, [onType]);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const picker = usePickerKeyboard(open, setOpen, triggerRef, contentRef, disabled || readOnly);

  const pairControlled = "value" in props;
  const startControlled = pairControlled || "startDateValue" in props;
  const endControlled = pairControlled || "endDateValue" in props;
  const [startInternalValue, setStartInternalValue] = useState(defaultValue?.startDate ?? "");
  const [endInternalValue, setEndInternalValue] = useState(defaultValue?.endDate ?? "");
  const startValue = pairControlled ? value?.startDate ?? "" : startControlled ? startDateValue ?? "" : startInternalValue;
  const endValue = pairControlled ? value?.endDate ?? "" : endControlled ? endDateValue ?? "" : endInternalValue;
  const resetRange = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!startControlled) setStartInternalValue(defaultValue?.startDate ?? "");
    if (!endControlled) setEndInternalValue(defaultValue?.endDate ?? "");
    setOpen(false);
  };
  const startInputRef = useNativeField<HTMLInputElement>(ref, element => {
    resetRange(); element.value = startControlled ? startValue : defaultValue?.startDate ?? "";
  });
  const endInputRef = useNativeField<HTMLInputElement>(endRef, element => {
    resetRange(); element.value = endControlled ? endValue : defaultValue?.endDate ?? "";
  });
  useEffect(() => {
    const pending = pendingRangeRef.current;
    if (pending && ((startControlled && startValue !== pending.startDate) ||
      (endControlled && endValue !== pending.endDate) || disabled || readOnly)) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      pendingRangeRef.current = null;
    }
  }, [startControlled, endControlled, startValue, endValue, disabled, readOnly]);

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

  const notifyType = (value: string) => {
    if (!onType) return;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (debounce <= 0) {
      onType(value);
      return;
    }
    debounceRef.current = setTimeout(() => {
      pendingRangeRef.current = null;
      typeCallback.current?.(value);
    }, debounce);
  };

  const updateRange = (next: { startDate: string; endDate: string }, legacyValue = next.endDate || next.startDate) => {
    if (disabled || readOnly) return;
    if (!startControlled) setStartInternalValue(next.startDate);
    if (!endControlled) setEndInternalValue(next.endDate);
    onChange?.(next);
    pendingRangeRef.current = next;
    notifyType(legacyValue);
  };
  const updateStart = (next: string) => updateRange({ startDate: next, endDate: endValue }, next);
  const updateEnd = (next: string) => updateRange({ startDate: startValue, endDate: next }, next);
  const handleClear = () => {
    if (disabled || readOnly) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!startControlled) setStartInternalValue("");
    if (!endControlled) setEndInternalValue("");
    onChange?.({ startDate: "", endDate: "" });
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
          disabled ? "cursor-not-allowed bg-surface-4 select-none" :  "bg-surface-2",
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
              {...nativeProps}
              className={cn(
                "col-span-3 w-full bg-transparent pl-1 outline-none focus:border-none focus:outline-none focus:ring-0",
                disabled && "cursor-not-allowed text-muted",
              )}
              id={id ? `${id}-start` : undefined}
              ref={startInputRef}
              name={startName ?? (name ? `${name}.startDate` : undefined)}
              aria-label={nativeProps["aria-label"] ? `${nativeProps["aria-label"]} start` : startDatePlaceholder}
              readOnly
              disabled={disabled}
              placeholder={startDatePlaceholder}
              value={startValue ?? ""}
              onChange={(e) => updateStart(e.target.value)}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={open ? picker.popupId : undefined}
              onKeyDown={(e) => { picker.onTriggerKeyDown(e); }}
              onClick={() => { if (!disabled && !readOnly) setOpen(true); }}
              onFocus={(e) => {
                nativeProps.onFocus?.(e);
                picker.rememberTrigger(e.currentTarget);
                if (disabled || readOnly) return;

                setOpen(true);
                setFocused(true);
              }}
              onBlur={(e) => {
                nativeProps.onBlur?.(e);
                setFocused(false);

                const next = e.relatedTarget as Node | null;

                if (next && (contentRef.current?.contains(next) || triggerRef.current?.contains(next))) {
                  return;
                }

                setOpen(false);
              }}
            />

            <div className="flex w-full items-center justify-center">
              <ArrowRight className={cn(DateRangeStateIconSize[size], disabled && "text-muted")} />
            </div>

            <input
              {...nativeProps}
              className={cn(
                "col-span-3 w-full bg-transparent pr-1 text-end outline-none focus:border-none focus:outline-none focus:ring-0",
                disabled && "cursor-not-allowed text-muted",
              )}
              id={id ? `${id}-end` : undefined}
              ref={endInputRef}
              name={endName ?? (name ? `${name}.endDate` : undefined)}
              aria-label={nativeProps["aria-label"] ? `${nativeProps["aria-label"]} end` : endDatePlaceholder}
              readOnly
              disabled={disabled}
              placeholder={endDatePlaceholder}
              value={endValue ?? ""}
              onChange={(e) => updateEnd(e.target.value)}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={open ? picker.popupId : undefined}
              onKeyDown={(e) => { picker.onTriggerKeyDown(e); }}
              onClick={() => { if (!disabled && !readOnly) setOpen(true); }}
              onFocus={(e) => {
                nativeProps.onFocus?.(e);
                picker.rememberTrigger(e.currentTarget);
                if (disabled || readOnly) return;

                setOpen(true);
                setFocused(true);
              }}
              onBlur={(e) => {
                nativeProps.onBlur?.(e);
                setFocused(false);

                const next = e.relatedTarget as Node | null;

                if (next && (contentRef.current?.contains(next) || triggerRef.current?.contains(next))) {
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

          {clearable && (startValue || endValue) && !disabled && !readOnly && (
            <div className="flex items-center pl-2">
              <button
                type="button"
                disabled={disabled}
                onClick={handleClear}
                aria-label="Clear date range"
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

      {open && !disabled && !readOnly && (
        <ExDateRangeCalendar popupId={picker.popupId} onPopupKeyDown={picker.onPopupKeyDown}
          open={open}
          triggerRef={triggerRef}
          contentRef={contentRef}
          disabledDate={disabledDate}
          format={format}
          startDate={startDate}
          endDate={endDate}
          startDateValue={startValue}
          endDateValue={endValue}
          onSelectStart={updateStart}
          onSelectEnd={updateEnd}
          onSelectRange={updateRange}
          onClear={handleClear}
        />
      )}
    </>
  );
};

ExDateRange.Prefix = Prefix;
ExDateRange.Suffix = Suffix;

export default ExDateRange;
