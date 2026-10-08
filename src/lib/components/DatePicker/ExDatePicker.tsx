"use client";

import type { CompoundDatePicker } from "./types/ExDatePickerType";
import Prefix from "../Prefix/ExPrefix";
import Suffix from "../Suffix/ExSuffix";
import ExPrefix from "../Prefix/ExPrefix";
import ExSuffix from "../Suffix/ExSuffix";
import { Children, isValidElement, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/Utils";
import { CircleCheck, Loader, TriangleAlert, X } from "lucide-react";
import { DatePickerPadding, DatePickerSizeClass, DatePickerStateClass, DatePickerStateIconSize } from "./class/ExDatePickerClass";
import ExDatePickerCalendar from "./ExDatePickerCalendar";
import { EX_INPUT_OPERATOR_COMPONENT } from "../InputOperator/context/ExInputOperatorMarker";
import { useInputOperator } from "../InputOperator/context/ExInputOperatorContext";

const ExDatePicker: CompoundDatePicker = (props) => {
  const {
    children,
    id,
    placeholder = "Choose Date",
    value,
    defaultValue = "",
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
    onChange,
  } = props;
  const { operator, size: operatorSize } = useInputOperator();
  const inputSize = operator ? operatorSize : size;
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingValueRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const controlled = "value" in props;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputValue = controlled ? (value ?? "") : internalValue;

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
        debounceRef.current = null;
        pendingValueRef.current = null;
      }
    };
  }, [disabled, debounce, onType]);

  useEffect(() => {
    // An external reset must not be overwritten by a delayed legacy callback.
    if (controlled && pendingValueRef.current !== null && inputValue !== pendingValueRef.current) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = null;
      pendingValueRef.current = null;
    }
  }, [controlled, inputValue]);

  const handleSelect = (nextValue: string) => {
    if (disabled) return;

    if (!controlled) {
      setInternalValue(nextValue);
    }

    setOpen(false);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    pendingValueRef.current = null;
    onChange?.(nextValue);
    if (!onType) return;

    if (debounce <= 0 || nextValue === "") {
      onType(nextValue);
      return;
    }

    pendingValueRef.current = nextValue;
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
      pendingValueRef.current = null;
      onType(nextValue);
    }, debounce);
  };

  const handleClear = () => handleSelect("");

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
          DatePickerSizeClass[inputSize].height,
          DatePickerSizeClass[inputSize].radius[radius].default,
          operator
            ? "min-w-0 flex-1"
            : "flex w-full items-center border border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.28),inset_0_-1px_1px_rgba(255,255,255,0.035)]",
          disabled ? "cursor-not-allowed bg-secondary" : !operator ? "bg-surface-2" : "transparent",
        )}>
        {!operator && prefix && (
          <ExPrefix radius={radius} size={size}>
            {prefix}
          </ExPrefix>
        )}

        <div
          className={cn(
            "relative flex h-full w-full items-center",
            DatePickerPadding[inputSize].wrapper,
            !operator && DatePickerStateClass[state],
            !operator && !suffix && prefix && DatePickerSizeClass[inputSize].radius[radius].prefix,
            !operator && !prefix && suffix && DatePickerSizeClass[inputSize].radius[radius].suffix,
            !operator && !prefix && !suffix && DatePickerSizeClass[inputSize].radius[radius].default,
            disabled && "cursor-not-allowed",
          )}>
          {leftIcon && (
            <div className={cn(DatePickerPadding[inputSize].left, disabled || !focused ? "text-muted" : "text-foreground")}>{leftIcon}</div>
          )}

          <input
            className={cn(
              "w-full bg-transparent px-1 outline-none focus:border-none focus:outline-none focus:ring-0",
              disabled && "cursor-not-allowed text-muted",
            )}
            id={id}
            ref={inputRef}
            readOnly
            disabled={disabled}
            placeholder={placeholder}
            value={inputValue}
            onClick={() => { if (!disabled) setOpen(true); }}
            onKeyDown={(event) => {
              if (disabled) return;
              if (event.key === "Escape") setOpen(false);
              if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
                event.preventDefault();
                setOpen(true);
              }
            }}
            onFocus={() => {
              if (disabled) return;
              setFocused(true);
              setOpen(true);
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

          {loading && (
            <div className="pl-2 text-muted">
              <Loader className={cn(DatePickerStateIconSize[inputSize], "animate-spin-slow")} />
            </div>
          )}

          {clearable && inputValue && !disabled && (
            <div className="flex items-center pl-2">
              <button
                type="button"
                disabled={disabled}
                onClick={handleClear}
                aria-label="Clear date"
                className={cn(DatePickerStateIconSize[inputSize], "cursor-pointer border-none bg-transparent p-0 text-muted outline-none")}>
                <X className={DatePickerStateIconSize[inputSize]} />
              </button>
            </div>
          )}

          {state === "success" && (
            <div className="pl-2 text-success">
              <CircleCheck className={DatePickerStateIconSize[inputSize]} />
            </div>
          )}

          {state === "error" && (
            <div className="pl-2 text-danger">
              <TriangleAlert className={DatePickerStateIconSize[inputSize]} />
            </div>
          )}

          {rightIcon && (
            <div className={cn(DatePickerPadding[inputSize].right, disabled || !focused ? "text-muted" : "text-foreground")}>{rightIcon}</div>
          )}
        </div>

        {!operator && suffix && (
          <ExSuffix radius={radius} size={size}>
            {suffix}
          </ExSuffix>
        )}
      </div>

      {open && !disabled && (
        <ExDatePickerCalendar
          key={`${format}:${inputValue}`}
          open={open}
          triggerRef={triggerRef}
          contentRef={contentRef}
          disabledDate={disabledDate}
          format={format}
          startDate={startDate}
          endDate={endDate}
          value={inputValue}
          onSelect={handleSelect}
          onClear={handleClear}
        />
      )}
    </>
  );
};

ExDatePicker.Prefix = Prefix;
ExDatePicker.Suffix = Suffix;

ExDatePicker[EX_INPUT_OPERATOR_COMPONENT] = true;
export default ExDatePicker;
