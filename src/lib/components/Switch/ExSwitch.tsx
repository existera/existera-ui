"use client";

import clsx from "clsx";
import { useState } from "react";
import type { ExSwitchProps } from "./props/ExSwitchProps";

export default function ExSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  className,
}: ExSwitchProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const currentChecked = isControlled ? checked : internalChecked;

  const toggle = () => {
    if (disabled) return;

    const next = !currentChecked;

    if (!isControlled) {
      setInternalChecked(next);
    }

    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={currentChecked}
      disabled={disabled}
      onClick={toggle}
      className={clsx(
        "relative inline-flex shrink-0 cursor-pointer items-center",
        "transition-[background-color,box-shadow,transform] duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",

        // Inner shadow
        "shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]",
        "dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.32),inset_0_-1px_1px_rgba(255,255,255,0.04)]",

        currentChecked ? "bg-primary" : "bg-secondary",

        disabled && "cursor-not-allowed opacity-50",

        {
          "h-4 w-7 rounded-full": size === "xs",
          "h-5 w-9 rounded-full": size === "sm",
          "h-6 w-11 rounded-full": size === "md",
          "h-7 w-13 rounded-full": size === "lg",
        },

        className,
      )}>
      <span
        className={clsx(
          "absolute rounded-full bg-white",
          "shadow-[0_1px_2px_rgba(0,0,0,0.18)]",
          "transition-transform duration-200 ease-out",
          {
            "left-0.5 size-3": size === "xs",
            "left-0.5 size-4": size === "sm",
            "left-0.5 size-5": size === "md",
            "left-0.5 size-6": size === "lg",

            "translate-x-3": currentChecked && size === "xs",
            "translate-x-4": currentChecked && size === "sm",
            "translate-x-5": currentChecked && size === "md",
            "translate-x-6": currentChecked && size === "lg",
          },
        )}
      />
    </button>
  );
}
