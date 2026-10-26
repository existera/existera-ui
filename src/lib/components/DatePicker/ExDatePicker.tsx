"use client";
import { usePickerKeyboard } from "../../hooks/usePickerKeyboard";
import { useTextField } from "../../hooks/useTextField";
import { useNativeField } from "../../hooks/useNativeField";

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
    ref,
    readOnly = false,
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
    ...nativeProps
  } = props;
  const { operator, size: operatorSize } = useInputOperator();
  const inputSize = operator ? operatorSize : size;
  const [focused, setFocused] = useState(false);


  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const picker = usePickerKeyboard(open, setOpen, triggerRef, contentRef, disabled || readOnly);
  const field = useTextField({ controlled: "value" in props, value, defaultValue, onChange, onType, debounce, disabled, readOnly });
  const inputValue = field.value;
  const inputRef = useNativeField<HTMLInputElement>(ref, element => {
    element.value = field.reset(); setOpen(false);
  });

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

  const handleSelect = (nextValue: string) => {
    if (disabled || readOnly) return;
    field.change(nextValue, nextValue === "");
    picker.dismiss();
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
          operator && "h-full min-h-0",
          DatePickerSizeClass[inputSize].radius[radius].default,
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
            {...nativeProps}
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
            onClick={() => { if (!disabled && !readOnly) setOpen(true); }}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? picker.popupId : undefined}
            onKeyDown={(e) => { picker.onTriggerKeyDown(e); }}
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
              const next = e.relatedTarget as Node | null;
              if (next && (contentRef.current?.contains(next) || triggerRef.current?.contains(next))) {
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

          {clearable && inputValue && !disabled && !readOnly && (
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

      {open && !disabled && !readOnly && (
        <ExDatePickerCalendar popupId={picker.popupId} onPopupKeyDown={picker.onPopupKeyDown}
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
