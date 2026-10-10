"use client";

import { Check } from "lucide-react";
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

  const handleClick = () => {
    if (isDisabled) return;

    onSelect?.(!selected, id);
  };

  return (
    <button
      {...props}
      id={id}
      type="button"
      disabled={isDisabled}
      aria-pressed={selected}
      aria-busy={loading}
      onClick={handleClick}
      className={cn(
        ToggleBaseClass,
        ToggleSizeClass[size],
        iconOnly ? ToggleIconOnlyClass[size] : radius === "default" ? TogglePaddingClass[size] : TogglePaddingRadiusFullClass[size],
        ToggleRadiusClass[radius],
        "border",
        fit ? "min-w-fit" : "w-full",
        selected ? "bg-primary text-white" : "bg-transparent border-foreground/15",
        isDisabled
          ? "cursor-not-allowed opacity-70"
          : "cursor-pointer hover:scale-[1.01] active:scale-[0.98] hover:bg-primary hover:text-white",
        className,
      )}>
      {loading && (
        <span aria-hidden="true" className={cn(ToggleLoadingClass[size], "animate-spin rounded-full border-current/30 border-t-current")} />
      )}

      {!loading && leftIcon}

      {children}

      {!loading && selected && showCheckIcon && <Check size={14} aria-hidden="true" />}

      {rightIcon}
    </button>
  );
}
