"use client";

import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import { LayoutGroup } from "framer-motion";
import type { ButtonGroupProps } from "./props/ExButtonGroupProps";
import { ExButtonGroupContext } from "./ExButtonGroupContext";
import { cn } from "../../utils/Utils";
import { ButtonGroupRadiusClass, ButtonGroupSizeClass } from "./class/ExButtonGroupClass";

const NAV_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];

export default function ExButtonGroup(props: ButtonGroupProps) {
  const {
    color = "primary",
    variant = "solid",
    size = "md",
    radius = "default",
    fit = true,
    disabled = false,
    value,
    defaultValue,
    onValueChange,
    responsive = "scroll",
    children,
    className,
    onKeyDown,
    ...nativeProps
  } = props;

  const layoutId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const controlled = "value" in props;
  const selectedValue = controlled ? value : internalValue;

  const select = (next: string) => {
    if (disabled || next === selectedValue) return;
    if (!controlled) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled || !NAV_KEYS.includes(event.key)) {
      return;
    }
    const container = event.currentTarget;
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    if (!target.matches("button[data-button-group-item]")) return;
    if (target.closest("[data-button-group]") !== container) return;
    const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>("button[data-button-group-item]:not(:disabled)")).filter(
      (button) => button.closest("[data-button-group]") === container,
    );
    const index = buttons.indexOf(target);
    if (index < 0) return;
    const rtl = getComputedStyle(container).direction === "rtl";
    const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    let delta = backward ? -1 : 1;
    if (rtl && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      delta *= -1;
    }
    const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (index + delta + buttons.length) % buttons.length;
    event.preventDefault();
    buttons[next]?.focus();
    buttons[next]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  };

  return (
    <LayoutGroup id={layoutId}>
      <ExButtonGroupContext.Provider
        value={{
          color,
          variant,
          size,
          radius,
          responsive,
          fit,
          disabled,
          value: selectedValue,
          select,
        }}>
        <div
          {...nativeProps}
          role={nativeProps.role ?? "group"}
          aria-disabled={disabled || undefined}
          data-button-group=""
          data-layout={responsive}
          onKeyDown={handleKeyDown}
          className={cn(
            "inline-flex min-w-0 max-w-full items-center",
            "border border-border bg-surface",
            "align-middle",
            ButtonGroupSizeClass[size],
            ButtonGroupRadiusClass[radius],
            fit ? "w-fit" : "w-full",
            responsive === "wrap" && "flex-wrap",
            responsive === "scroll" && "flex-nowrap overflow-x-auto",
            responsive === "stack" && "flex-col items-stretch sm:flex-row sm:items-center",
            className,
          )}>
          {children}
        </div>
      </ExButtonGroupContext.Provider>
    </LayoutGroup>
  );
}
