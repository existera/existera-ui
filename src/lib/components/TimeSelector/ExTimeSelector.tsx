"use client";
import { handlePickerGroupKeyDown } from "../../hooks/useCalendarKeyboard";
import { usePickerKeyboard } from "../../hooks/usePickerKeyboard";
import { useNativeField } from "../../hooks/useNativeField";
import { useTextField } from "../../hooks/useTextField";

import React, { Children, isValidElement, useEffect, useMemo, useRef, useState } from "react";
import { CircleCheck, Loader, TriangleAlert, X } from "lucide-react";

import Prefix from "../Prefix/ExPrefix";
import Suffix from "../Suffix/ExSuffix";
import ExPrefix from "../Prefix/ExPrefix";
import ExSuffix from "../Suffix/ExSuffix";

import type { CompoundTimeSelector } from "./types/ExTimeSelectorType";

import { cn } from "../../utils/Utils";

import { TimeSelectorPadding, TimeSelectorSizeClass, TimeSelectorStateClass, TimeSelectorStateIconSize } from "./class/ExTimeSelectorClass";
import ExTimeSelectorClock from "./ExTimeSelectorClock";
import { EX_INPUT_OPERATOR_COMPONENT } from "../InputOperator/context/ExInputOperatorMarker";
import { useInputOperator } from "../InputOperator/context/ExInputOperatorContext";

const ExTimeSelector: CompoundTimeSelector = (props) => {
  const {
    children,
    id,
    type = "text",
    value,
    defaultValue = "",
    onChange,
    ref,
    readOnly = false,
    name,
    form,
    leftIcon,
    rightIcon,
    size = "md",
    radius = "default",
    state = "default",
    loading = false,
    clearable = false,
    format = 24,
    debounce = 0,
    disabled = false,
    onType,
    ...nativeProps
  } = props;
  const { operator, size: operatorSize } = useInputOperator();
  const inputSize = operator ? operatorSize : size;
  const [focused, setFocused] = useState(false);
  const HOURS = useMemo(
    () =>
      format === 24
        ? Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
        : Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0")),
    [format],
  );
  const MINUTES = useMemo(() => Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")), []);
  const FORMATVALUE = useMemo(() => (format === 12 ? (["PM", "AM"] as const) : []), [format]);
  const ITEM_HEIGHT = 40;
  const VISIBLE_ITEMS = 5;
  const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
  const PICKER_PADDING = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hourItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const minuteItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const formatItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [open, setOpen] = useState(false);
  const picker = usePickerKeyboard(open, setOpen, triggerRef, contentRef, disabled || readOnly);
  const field = useTextField({ controlled: "value" in props, value, defaultValue, onChange, onType, debounce, disabled, readOnly });
  const inputValue = field.value;
  const inputRef = useNativeField<HTMLInputElement>(ref, element => {
    element.value = field.reset().split(":")[0] ?? ""; setOpen(false);
  });
  const { hour, minute, formatValue } = useMemo(() => {
    if (!inputValue.trim()) {
      return {
        hour: "",
        minute: "",
        formatValue: undefined,
      };
    }
    const trimmedVal = inputValue.trim();
    if (format === 12) {
      const match = trimmedVal.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (match) {
        return {
          hour: match[1],
          minute: match[2],
          formatValue: match[3]?.toUpperCase() as "AM" | "PM" | undefined,
        };
      }
      return {
        hour: "",
        minute: "",
        formatValue: undefined,
      };
    }
    const [hour, minute] = trimmedVal.split(":");
    return {
      hour: hour ?? "",
      minute: minute ?? "",
      formatValue: undefined,
    };
  }, [inputValue, format]);

  useEffect(() => {
    const hourIndex = HOURS.indexOf(hour);
    const minuteIndex = MINUTES.indexOf(minute);

    if (!disabled && open && (hourIndex !== -1 || minuteIndex !== -1)) {
      requestAnimationFrame(() => {
        if (disabled || readOnly) return;
        if (hourIndex !== -1) {
          hourItemRefs.current[hourIndex]?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }
        if (minuteIndex !== -1) {
          minuteItemRefs.current[minuteIndex]?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }
        if (formatValue && format === 12) {
          const formatIndex = (FORMATVALUE as string[]).indexOf(formatValue);
          if (formatIndex !== -1) {
            formatItemRefs.current[formatIndex]?.scrollIntoView({
              block: "center",
              behavior: "smooth",
            });
          }
        }
      });
    }
  }, [hour, minute, formatValue, open, format, HOURS, MINUTES, FORMATVALUE, disabled, readOnly]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => field.change(e.target.value);
  const handleClear = () => field.change("", true);
  const handleReset = handleClear;
  const updateTime = (nextHour: string, nextMinute: string, nextFormat?: "AM" | "PM") => {
    if (disabled || readOnly) return;
    const next = format === 12 ? `${nextHour}:${nextMinute} ${nextFormat ?? formatValue ?? "AM"}` : `${nextHour}:${nextMinute}`;
    field.change(next);
    picker.dismiss();
  };

  const handleThisTime = () => {
    if (disabled || readOnly) return;
    const now = new Date();
    const currentHour = now.getHours();
    const displayHour = format === 12 ? currentHour % 12 || 12 : currentHour;
    const currentMinute = now.getMinutes().toString().padStart(2, "0");
    if (format === 12) {
      const nextFormatValue = currentHour >= 12 ? "PM" : "AM";
      updateTime(displayHour.toString().padStart(2, "0"), currentMinute, nextFormatValue);
    } else {
      updateTime(displayHour.toString().padStart(2, "0"), currentMinute);
    }
  };

  return (
    <>
      <input type="hidden" name={name} form={form} value={inputValue} disabled={disabled} />
      <div
        ref={triggerRef}
        className={cn(
          TimeSelectorSizeClass[inputSize].height,
          operator && "h-full min-h-0",
          TimeSelectorSizeClass[inputSize].radius[radius].default,
          operator
            ? "min-w-0 flex-1"
            : "flex w-full items-center border border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.28),inset_0_-1px_1px_rgba(255,255,255,0.035)]",
          disabled ? "cursor-not-allowed bg-surface-4 select-none" : !operator ? "bg-surface-2" : "transparent",
        )}>
        {!operator && prefix && (
          <ExPrefix radius={radius} size={size}>
            {prefix}
          </ExPrefix>
        )}

        <div
          className={cn(
            "relative flex h-full w-full items-center",
            TimeSelectorPadding[inputSize].wrapper,
            !operator && TimeSelectorStateClass[state],
            !operator && !suffix && prefix && TimeSelectorSizeClass[inputSize].radius[radius].prefix,
            !operator && !prefix && suffix && TimeSelectorSizeClass[inputSize].radius[radius].suffix,
            !operator && !prefix && !suffix && TimeSelectorSizeClass[inputSize].radius[radius].default,
            disabled && "cursor-not-allowed",
          )}>
          {leftIcon && (
            <div className={cn(TimeSelectorPadding[inputSize].left, disabled || !focused ? "text-muted" : "text-foreground")}>
              {leftIcon}
            </div>
          )}

          <div className="flex">
            <input
              {...nativeProps}
              form={form}
              id={id}
              type={type}
              ref={inputRef}
              value={hour}
              placeholder="Hour"
              readOnly
              disabled={disabled}
              onChange={handleChange}
              aria-label={nativeProps["aria-label"] ? `${nativeProps["aria-label"]} hour` : "Hour"}
              className={cn(
                "w-full bg-transparent pl-1 outline-none focus:border-none focus:outline-none focus:ring-0",
                disabled && "cursor-not-allowed text-muted",
              )}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={open ? picker.popupId : undefined}
              onKeyDown={(e) => { picker.onTriggerKeyDown(e); }}
              onClick={() => { if (!disabled && !readOnly) setOpen(true); }}
              onFocus={(e) => {
                nativeProps.onFocus?.(e);
                picker.rememberTrigger(e.currentTarget);
                if (disabled || readOnly) return;

                setFocused(true);
                setOpen(true);
              }}
              onBlur={(e) => {
                nativeProps.onBlur?.(e);
                setFocused(false);
                if (e.relatedTarget && (contentRef.current?.contains(e.relatedTarget as Node) || triggerRef.current?.contains(e.relatedTarget as Node))) return;
                setOpen(false);
              }}
            />

            <span className={cn("px-1", disabled && "text-muted")} aria-hidden="true">
              :
            </span>

            <input
              {...nativeProps}
              form={form}
              id={id ? `${id}-minute` : undefined}
              type={type}
              value={minute}
              placeholder="Minute"
              readOnly
              disabled={disabled}
              onChange={handleChange}
              aria-label={nativeProps["aria-label"] ? `${nativeProps["aria-label"]} minute` : "Minute"}
              className={cn(
                "w-full bg-transparent pr-1 outline-none focus:border-none focus:outline-none focus:ring-0",
                disabled && "cursor-not-allowed text-muted",
              )}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={open ? picker.popupId : undefined}
              onKeyDown={(e) => { picker.onTriggerKeyDown(e); }}
              onClick={() => { if (!disabled && !readOnly) setOpen(true); }}
              onFocus={(e) => {
                nativeProps.onFocus?.(e);
                picker.rememberTrigger(e.currentTarget);
                if (disabled || readOnly) return;

                setFocused(true);
                setOpen(true);
              }}
              onBlur={(e) => {
                nativeProps.onBlur?.(e);
                setFocused(false);
                if (e.relatedTarget && (contentRef.current?.contains(e.relatedTarget as Node) || triggerRef.current?.contains(e.relatedTarget as Node))) return;
                setOpen(false);
              }}
            />

            {format === 12 && (
              <span className={cn("pl-1", disabled && "text-muted")} aria-label={formatValue || ""}>
                {formatValue}
              </span>
            )}
          </div>

          {loading && (
            <div className="pl-2 text-muted">
              <Loader className={cn(TimeSelectorStateIconSize[inputSize], "animate-spin-slow")} />
            </div>
          )}

          {clearable && inputValue.length > 0 && !disabled && !readOnly && (
            <div className="flex items-center pl-2">
              <button
                type="button"
                disabled={disabled}
                aria-label="Clear time"
                onClick={handleClear}
                className={cn(
                  TimeSelectorStateIconSize[inputSize],
                  "cursor-pointer border-none bg-transparent p-0 text-muted outline-none",
                )}>
                <X className={TimeSelectorStateIconSize[inputSize]} />
              </button>
            </div>
          )}

          {state === "success" && (
            <div className="pl-2 text-success">
              <CircleCheck className={TimeSelectorStateIconSize[inputSize]} />
            </div>
          )}

          {state === "error" && (
            <div className="pl-2 text-danger">
              <TriangleAlert className={TimeSelectorStateIconSize[inputSize]} />
            </div>
          )}

          {rightIcon && (
            <div className={cn(TimeSelectorPadding[inputSize].right, disabled || !focused ? "text-muted" : "text-foreground")}>
              {rightIcon}
            </div>
          )}
        </div>

        {!operator && suffix && (
          <ExSuffix radius={radius} size={size}>
            {suffix}
          </ExSuffix>
        )}
      </div>

      {!disabled && !readOnly && (
        <ExTimeSelectorClock popupId={picker.popupId} onPopupKeyDown={picker.onPopupKeyDown} open={open} triggerRef={triggerRef} contentRef={contentRef}>
          <div className={cn("grid w-full grid-cols-3 pb-2", format === 12 ? "grid-cols-3" : "grid-cols-2")}>
            <div className="relative w-full">
              <div
                ref={hourRef}
                className="relative h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth ex-textarea-scroll"
                style={{
                  right: "-5px",
                  height: PICKER_HEIGHT,
                  paddingTop: PICKER_PADDING,
                  paddingBottom: PICKER_PADDING,
                }}>
                {HOURS.map((item, index) => {
                  const active = item === hour;

                  return (
                    <button
                      key={item}
                      data-time-part="hour"
                      aria-label={"hour " + item}
                      aria-pressed={active}
                      tabIndex={active || (!hour && index === 0) ? 0 : -1}
                      onKeyDown={e => handlePickerGroupKeyDown(e)}
                      ref={(el) => {
                        hourItemRefs.current[index] = el;
                      }}
                      type="button"
                      disabled={disabled}
                      onClick={(e) => {
                        e.preventDefault();

                        if (disabled || readOnly) return;

                        updateTime(item, minute || "00", formatValue);
                      }}
                      style={{
                        height: ITEM_HEIGHT,
                      }}
                      className={cn(
                        "relative z-10 flex w-full snap-center select-none items-center justify-center transition-all duration-200 ease-out",
                        disabled ? "cursor-not-allowed text-muted" : "cursor-pointer",
                        active
                          ? "scale-110 text-base font-semibold text-primary"
                          : "scale-95 text-sm text-muted opacity-60 hover:opacity-100",
                      )}>
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative w-full">
              <div
                ref={minuteRef}
                className="relative h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth ex-textarea-scroll"
                style={{
                  right: "-5px",
                  height: PICKER_HEIGHT,
                  paddingTop: PICKER_PADDING,
                  paddingBottom: PICKER_PADDING,
                }}>
                {MINUTES.map((item, index) => {
                  const active = item === minute;

                  return (
                    <button
                      key={item}
                      data-time-part="minute"
                      aria-label={"minute " + item}
                      aria-pressed={active}
                      tabIndex={active || (!minute && index === 0) ? 0 : -1}
                      onKeyDown={e => handlePickerGroupKeyDown(e)}
                      ref={(el) => {
                        minuteItemRefs.current[index] = el;
                      }}
                      type="button"
                      disabled={disabled}
                      onClick={(e) => {
                        e.preventDefault();

                        if (disabled || readOnly) return;

                        updateTime(hour || HOURS[0], item, formatValue);
                      }}
                      style={{
                        height: ITEM_HEIGHT,
                      }}
                      className={cn(
                        "relative z-10 flex w-full snap-center select-none items-center justify-center transition-all duration-200 ease-out",
                        disabled ? "cursor-not-allowed text-muted" : "cursor-pointer",
                        active
                          ? "scale-110 text-base font-semibold text-primary"
                          : "scale-95 text-sm text-muted opacity-60 hover:opacity-100",
                      )}>
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {format === 12 && (
              <div className="relative w-full">
                <div
                  ref={hourRef}
                  className="relative h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth ex-textarea-scroll"
                  style={{
                    right: "-5px",
                    height: PICKER_HEIGHT,
                    paddingTop: PICKER_PADDING,
                    paddingBottom: PICKER_PADDING,
                  }}>
                  {FORMATVALUE.map((item, index) => {
                    const active = item === formatValue;

                    return (
                      <button
                        key={item}
                        data-time-part="period"
                        aria-label={"period " + item}
                        aria-pressed={active}
                        tabIndex={active || (!formatValue && index === 0) ? 0 : -1}
                        onKeyDown={e => handlePickerGroupKeyDown(e)}
                        ref={(el) => {
                          formatItemRefs.current[index] = el;
                        }}
                        type="button"
                        disabled={disabled}
                        onClick={(e) => {
                          e.preventDefault();

                          if (disabled || readOnly) return;

                          updateTime(hour || HOURS[0], minute || "00", item);
                        }}
                        style={{
                          height: ITEM_HEIGHT,
                        }}
                        className={cn(
                          "relative z-10 flex w-full snap-center select-none items-center justify-center transition-all duration-200 ease-out",
                          disabled ? "cursor-not-allowed text-muted" : "cursor-pointer",
                          active
                            ? "scale-110 text-base font-semibold text-primary"
                            : "scale-95 text-sm text-muted opacity-60 hover:opacity-100",
                        )}>
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-2 flex w-full justify-end gap-2 border-t border-t-border bg-surface-2 p-2 text-xs">
            <button
              type="button"
              disabled={disabled}
              className="flex cursor-pointer items-center rounded-sm px-2 py-1 text-xs font-medium text-primary transition hover:bg-primary-soft hover:opacity-90 disabled:cursor-not-allowed disabled:text-muted"
              onClick={(e) => {
                e.preventDefault();

                if (disabled || readOnly) return;

                handleReset();
              }}>
              Reset
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={(e) => {
                e.preventDefault();

                if (disabled || readOnly) return;

                handleThisTime();
              }}
              className="flex cursor-pointer items-center rounded-sm bg-primary px-2 py-1 text-xs font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              This Time
            </button>
          </div>
        </ExTimeSelectorClock>
      )}
    </>
  );
};

ExTimeSelector.Prefix = Prefix;
ExTimeSelector.Suffix = Suffix;

Object.assign(ExTimeSelector, { [EX_INPUT_OPERATOR_COMPONENT]: true });
export default ExTimeSelector;
