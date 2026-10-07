"use client";

import { cn } from "../../utils/Utils";
import type { ExToggleProps } from "./props/ExToggleProps";

import {
  ToggleBaseClass,
  ToggleIconOnlyClass,
  ToggleLoadingClass,
  TogglePaddingClass,
  TogglePaddingRadiusFullClass,
  ToggleRadiusClass,
  ToggleSizeClass,
} from "./class/ExToggleClass";

export default function ExToggle({
  id,
  size = "md",
  radius = "default",
  fit = true,
  iconOnly = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  selected = false,
  onSelect,
  showCheckIcon = true,
  children,
  className,
  ...props
}: ExToggleProps) {
  const isDisabled = disabled || loading;

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (isDisabled) return;
    const newState = !selected;
    onSelect?.(newState, id);
  };

  return (
    <button
      {...props}
      type="button"
      disabled={isDisabled}
      aria-pressed={selected && !isDisabled}
      onClick={handleClick}
      className={cn(
        className,
        ToggleBaseClass,
        ToggleSizeClass[size],
        iconOnly
          ? ToggleIconOnlyClass[size]
          : radius === "default"
            ? TogglePaddingClass[size]
            : TogglePaddingRadiusFullClass[size],
        ToggleRadiusClass[radius],
        "border",
        fit ? "min-w-fit" : "w-full",
        selected
          ? "bg-primary text-white"
          : "bg-transparent border-foreground/15",
        isDisabled || loading
          ? "cursor-not-allowed opacity-70"
          : "cursor-pointer hover:scale-[1.01] active:scale-[0.98] hover:bg-primary hover:text-white",
      )}>
      {loading && (
        <span
          className={cn(
            ToggleLoadingClass[size],
            "animate-spin rounded-full border-current/30 border-t-current",
          )}
        />
      )}
      {!loading && leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
