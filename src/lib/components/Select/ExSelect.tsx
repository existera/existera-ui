"use client";

import React, { Children, isValidElement, useState } from "react";
import { CircleCheck, Loader, TriangleAlert, X } from "lucide-react";

import Prefix from "../Prefix/ExPrefix";
import Suffix from "../Suffix/ExSuffix";
import ExPrefix from "../Prefix/ExPrefix";
import ExSuffix from "../Suffix/ExSuffix";

import type { CompoundSelect } from "./types/ExSelectType";

import { cn } from "../../utils/Utils";

import { SelectHeight, SelectPadding, SelectSizeClass, SelectStateClass, SelectStateIconSize } from "./Class/ExSelectClass";
import { EX_INPUT_OPERATOR_COMPONENT } from "../InputOperator/context/ExInputOperatorMarker";
import { useInputOperator } from "../InputOperator/context/ExInputOperatorContext";

const ExSelect: CompoundSelect = (props) => {
  const {
    id,
    children,
    selected,
    defaultSelected,
    onChange,
    name,
    required,
    autoComplete,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    option = [],
    placeholder = "Please Select Item",
    leftIcon,
    rightIcon,
    size = "md",
    radius = "default",
    state = "default",
    disabled = false,
    clearable = false,
    loading = false,
    className,
    textAlign = "left",
  } = props;
  const { operator, size: operatorSize } = useInputOperator();
  const inputSize = operator ? operatorSize : size;
  const [focused, setFocused] = useState(false);
  const controlled = "selected" in props;
  const [internalValue, setInternalValue] = useState<string | null>(defaultSelected?.value ?? null);
  const selectedValue = controlled ? selected?.value : internalValue;
  // Resolve against current options so async option updates cannot leave a stale
  // label or make the browser silently display an unrelated first option.
  const selectedOption = option.find((item) => item.value === selectedValue) ?? null;

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (disabled) {
      return;
    }
    const nextSelected = option.find((item) => item.value === e.target.value) ?? null;
    if (!controlled) setInternalValue(nextSelected?.value ?? null);
    onChange?.(nextSelected);
  };

  const handleClear = () => {
    if (disabled) {
      return;
    }
    if (!controlled) setInternalValue(null);
    onChange?.(null);
  };

  return (
    <div
      className={cn(
        SelectSizeClass[inputSize].height,
        SelectSizeClass[inputSize].radius[radius].default,
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
          SelectPadding[inputSize].wrapper,
          !operator && SelectStateClass[state],
          !operator && !suffix && prefix && SelectSizeClass[inputSize].radius[radius].prefix,
          !operator && !prefix && suffix && SelectSizeClass[inputSize].radius[radius].suffix,
          !operator && !prefix && !suffix && SelectSizeClass[inputSize].radius[radius].default,
          disabled && "cursor-not-allowed",
        )}>
        {leftIcon && (
          <div className={cn(SelectPadding[inputSize].left, disabled || !focused ? "text-muted" : "text-foreground")}>{leftIcon}</div>
        )}

        <select
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          aria-label={ariaLabel ?? (ariaLabelledBy || id ? undefined : placeholder)}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid ?? (state === "error" || undefined)}
          value={selectedOption?.value ?? ""}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            SelectHeight[inputSize],
            selectedOption ? "text-foreground" : "text-muted",
            "min-w-8 w-full bg-transparent shadow-none",
            disabled && "cursor-not-allowed text-muted",
            className,
          )}
          style={{ textAlign }}
          autoComplete={autoComplete}>
          <option value="" disabled className="text-muted">
            {placeholder}
          </option>

          {option.map((item) => (
            <option key={item.value} value={item.value} className="text-black">
              {item.label}
            </option>
          ))}
        </select>

        {loading && (
          <div className="pl-2 text-muted">
            <Loader className={cn(SelectStateIconSize[inputSize], "animate-spin-slow")} />
          </div>
        )}

        {clearable && selectedOption && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="cursor-pointer pl-2 outline-none"
            aria-label="Clear selection">
            <X className={SelectStateIconSize[inputSize]} />
          </button>
        )}

        {state === "success" && (
          <div className="pl-2 text-success">
            <CircleCheck className={SelectStateIconSize[inputSize]} />
          </div>
        )}

        {state === "error" && (
          <div className="pl-2 text-danger">
            <TriangleAlert className={SelectStateIconSize[inputSize]} />
          </div>
        )}

        {rightIcon && (
          <div className={cn(SelectPadding[inputSize].right, disabled || !focused ? "text-muted" : "text-foreground")}>{rightIcon}</div>
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

ExSelect.Prefix = Prefix;
ExSelect.Suffix = Suffix;

ExSelect[EX_INPUT_OPERATOR_COMPONENT] = true;
export default ExSelect;
