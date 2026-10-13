"use client";

import { useTextField } from "../../hooks/useTextField";
import { useNativeField } from "../../hooks/useNativeField";
import React, { Children, isValidElement, useLayoutEffect, useState, useCallback } from "react";
import { CircleCheck, Loader, TriangleAlert, X } from "lucide-react";

import Prefix from "../Prefix/ExPrefix";
import Suffix from "../Suffix/ExSuffix";
import ExPrefix from "../Prefix/ExPrefix";
import ExSuffix from "../Suffix/ExSuffix";

import type { CompoundTextarea } from "./types/ExTextareaType";

import { cn } from "../../utils/Utils";

import {
  TextareaPadding,
  TextareaRadiusClass,
  TextareaSizeClass,
  TextareaStateClass,
  TextareaStateIconPaddingSize,
  TextareaStateIconSize,
} from "./class/ExTextareaClass";
import { EX_INPUT_OPERATOR_COMPONENT } from "../InputOperator/context/ExInputOperatorMarker";
import { useInputOperator } from "../InputOperator/context/ExInputOperatorContext";

const ExTextarea: CompoundTextarea = (props) => {
  const {
    id,
    value: controlledValue,
    defaultValue = "",
    onChange,
    ref,
    readOnly = false,
    children,
    placeholder = "Please type here...",
    leftIcon,
    rightIcon,
    size = "md",
    radius = "default",
    state = "default",
    disabled = false,
    rows = 3,
    autoResize = false,
    loading = false,
    clearable = false,
    debounce = 0,
    onType,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedby,
    "aria-required": ariaRequired,
    "aria-invalid": ariaInvalid = state === "error",
    maxLength,
    inputMode,
    autoComplete,
    className,
    ...nativeProps
  } = props;
  const { operator, size: operatorSize } = useInputOperator();
  const inputSize = operator ? operatorSize : size;
  const [focused, setFocused] = useState(false);
  const field = useTextField({ controlled: "value" in props, value: controlledValue, defaultValue, onChange, onType, debounce, disabled, readOnly });
  const textareaRef = useNativeField<HTMLTextAreaElement>(ref, element => { element.value = field.reset(); });
  const value = field.value;

  let prefix: React.ReactNode = null;
  let suffix: React.ReactNode = null;

  Children.forEach(children, (child) => {
    if (!isValidElement<{ children: React.ReactNode }>(child)) {
      return;
    }
    if (child.type === Prefix) {
      prefix = child.props.children;
    }
    if (child.type === Suffix) {
      suffix = child.props.children;
    }
  });

  const autoResizeTextarea = useCallback(() => {
    if (!autoResize) {
      return;
    }
    const el = textareaRef.current;
    if (!el) {
      return;
    }
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize, textareaRef]);

  useLayoutEffect(() => {
    autoResizeTextarea();
  }, [value, autoResizeTextarea]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => field.change(e.target.value);
  const handleClear = () => field.change("", true);

  return (
    <div
      className={cn(
        TextareaSizeClass[inputSize].height,
        TextareaSizeClass[inputSize].radius[radius].default,
        operator
          ? "min-w-0 flex-1"
          : "flex w-full items-center border border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.28),inset_0_-1px_1px_rgba(255,255,255,0.035)]",
        disabled ? "cursor-not-allowed bg-surface-4 select-none" : !operator ? "bg-surface-2" : "transparent",
      )}>
      {!operator && prefix && (
        <ExPrefix textarea radius={radius} size={size}>
          {prefix}
        </ExPrefix>
      )}

      <div
        className={cn(
          "relative z-2 flex h-full w-full items-start px-2.5",
          TextareaPadding[inputSize].wrapper,
          !operator && TextareaStateClass[state],
          !operator && !suffix && prefix && TextareaRadiusClass[radius].prefix,
          !operator && !prefix && suffix && TextareaRadiusClass[radius].suffix,
          !operator && !prefix && !suffix && TextareaSizeClass[inputSize].radius[radius].default,
          disabled && "cursor-not-allowed",
        )}>
        {leftIcon && (
          <div className={cn(TextareaPadding[inputSize].left, disabled || !focused ? "text-muted" : "text-foreground")}>{leftIcon}</div>
        )}

        <textarea
          {...nativeProps}
          readOnly={readOnly}
          id={id}
          ref={textareaRef}
          disabled={disabled}
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={(e) => {
            nativeProps.onFocus?.(e);
            if (disabled) {
              return;
            }

            setFocused(true);
          }}
          onBlur={(e) => { setFocused(false); nativeProps.onBlur?.(e); }}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedby}
          aria-required={ariaRequired}
          aria-invalid={ariaInvalid}
          className={cn(
            TextareaSizeClass[inputSize].height,
            autoResize && "resize-none",
            "ex-textarea-scroll h-fit min-w-0 flex-1 bg-transparent px-1 shadow-none placeholder:text-muted/70",
            disabled && "cursor-not-allowed text-muted",
            className,
          )}
          maxLength={maxLength}
          inputMode={inputMode}
          autoComplete={autoComplete}
        />

        {loading && (
          <div className={cn("pl-2 text-muted", TextareaStateIconPaddingSize[inputSize])}>
            <Loader className={cn(TextareaStateIconSize[inputSize], "animate-spin-slow")} />
          </div>
        )}

        {clearable && value.length > 0 && !disabled && !readOnly && (
          <div className={cn("flex items-center", TextareaStateIconPaddingSize[inputSize])}>
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              aria-label="Clear input"
              className={cn(TextareaStateIconSize[inputSize], "cursor-pointer border-none bg-transparent p-0 outline-none")}>
              <X className={TextareaStateIconSize[inputSize]} />
            </button>
          </div>
        )}

        {state === "success" && (
          <div className={cn("pl-2 text-success", TextareaStateIconPaddingSize[inputSize])}>
            <CircleCheck className={TextareaStateIconSize[inputSize]} />
          </div>
        )}

        {state === "error" && (
          <div className={cn("pl-2 text-danger", TextareaStateIconPaddingSize[inputSize])}>
            <TriangleAlert className={TextareaStateIconSize[inputSize]} />
          </div>
        )}

        {rightIcon && (
          <div className={cn(TextareaPadding[inputSize].right, disabled || !focused ? "text-muted" : "text-foreground")}>{rightIcon}</div>
        )}
      </div>

      {!operator && suffix && (
        <ExSuffix textarea radius={radius} size={size}>
          {suffix}
        </ExSuffix>
      )}
    </div>
  );
};

ExTextarea.Prefix = Prefix;
ExTextarea.Suffix = Suffix;

Object.assign(ExTextarea, { [EX_INPUT_OPERATOR_COMPONENT]: true });
export default ExTextarea;
