"use client";

import React, { Children, isValidElement, useEffect, useRef, useState } from "react";
import { CircleCheck, Loader, TriangleAlert, X } from "lucide-react";

import Prefix from "../Prefix/ExPrefix";
import Suffix from "../Suffix/ExSuffix";
import ExPrefix from "../Prefix/ExPrefix";
import ExSuffix from "../Suffix/ExSuffix";

import type { CompoundInput } from "./types/ExInputType";

import { cn } from "../../utils/Utils";

import { InputPadding, InputSizeClass, InputStateClass, InputStateIconSize } from "./class/ExInputClass";
import { useInputOperator } from "../InputOperator/context/ExInputOperatorContext";
import { EX_INPUT_OPERATOR_COMPONENT } from "../InputOperator/context/ExInputOperatorMarker";

const ExInput: CompoundInput = ({
  children,
  id,
  type = "text",
  disabled = false,
  placeholder = "Please type here...",
  value,
  leftIcon,
  rightIcon,
  size = "md",
  radius = "default",
  state = "default",
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
  textAlign = "left",
}) => {
  const { operator, size: operatorSize } = useInputOperator();
  const inputSize = operator ? operatorSize : size;
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(value ?? "");
  const inputValue = controlled ? (value ?? "") : internalValue;
  const inputModeMap = {
    text: "text",
    email: "email",
    password: "text",
    number: "decimal",
    search: "search",
    tel: "tel",
    url: "url",
  } as const;

  let prefix: React.ReactNode = null;
  let suffix: React.ReactNode = null;

  Children.forEach(children, (child) => {
    if (
      !isValidElement<{
        children: React.ReactNode;
      }>(child)
    ) {
      return;
    }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;

    if (!controlled) {
      setInternalValue(nextValue);
    }

    if (!onType) {
      return;
    }

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
    if (disabled) {
      return;
    }

    if (!controlled) {
      setInternalValue("");
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    onType?.("");
  };

  return (
    <div
      className={cn(
        InputSizeClass[inputSize].height,
        InputSizeClass[inputSize].radius[radius].default,
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
          InputPadding[inputSize].wrapper,
          !operator && InputStateClass[state],
          !operator && !suffix && prefix && InputSizeClass[inputSize].radius[radius].prefix,
          !operator && !prefix && suffix && InputSizeClass[inputSize].radius[radius].suffix,
          !operator && !prefix && !suffix && InputSizeClass[inputSize].radius[radius].default,
          disabled && "cursor-not-allowed",
        )}>
        {leftIcon && (
          <div className={cn(InputPadding[inputSize].left, disabled || !focused ? "text-muted" : "text-foreground")}>{leftIcon}</div>
        )}

        <input
          id={id}
          type={type}
          disabled={disabled}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedby}
          aria-required={ariaRequired}
          aria-invalid={ariaInvalid}
          className={cn(
            "w-full bg-transparent px-1 shadow-none outline-none",
            type === "number" && "ex-input-number",
            disabled && "cursor-not-allowed text-muted",
            className,
          )}
          style={{ textAlign }}
          maxLength={maxLength}
          inputMode={inputMode ?? inputModeMap[type ?? "text"]}
          autoComplete={autoComplete}
        />

        {loading && (
          <div className="pl-2 text-muted-foreground">
            <Loader className={cn(InputStateIconSize[inputSize], "animate-spin-slow")} />
          </div>
        )}

        {clearable && inputValue.length > 0 && !disabled && (
          <div className="flex items-center pl-2">
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              aria-label="Clear input"
              className={cn(InputStateIconSize[inputSize], "cursor-pointer border-none bg-transparent p-0 outline-none")}>
              <X className={InputStateIconSize[inputSize]} />
            </button>
          </div>
        )}

        {state === "success" && (
          <div className="pl-2 text-success">
            <CircleCheck className={InputStateIconSize[inputSize]} />
          </div>
        )}

        {state === "error" && (
          <div className="pl-2 text-danger">
            <TriangleAlert className={InputStateIconSize[inputSize]} />
          </div>
        )}

        {rightIcon && (
          <div className={cn(InputPadding[inputSize].right, disabled || !focused ? "text-muted" : "text-foreground")}>{rightIcon}</div>
        )}
      </div>

      {!operator && suffix && (
        <ExSuffix radius={radius} size={size}>
          {suffix}
        </ExSuffix>
      )}
    </div>
  );
};

ExInput.Prefix = Prefix;
ExInput.Suffix = Suffix;

(ExInput as any)[EX_INPUT_OPERATOR_COMPONENT] = true;
export default ExInput;
