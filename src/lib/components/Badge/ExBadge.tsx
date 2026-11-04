"use client";

import { useId } from "react";
import { X } from "lucide-react";
import type { ExBadgeProps } from "./props/ExBadgeProps";
import { cn } from "../../utils/Utils";
import {
  BadgeBaseClass,
  BadgeColorClass,
  BadgeDismissSizeClass,
  BadgeRadiusClass,
  BadgeSizeClass,
  BadgeVariantClass,
} from "./class/ExBadgeClass";

export default function ExBadge({
  variant = "solid",
  color = "primary",
  size = "md",
  radius = "default",
  leftIcon,
  rightIcon,
  dismissible = false,
  dismissPosition = "end",
  className,
  children,
  onDismiss,
}: ExBadgeProps) {
  const descriptionId = useId();
  const dismissButton = (
    <button
      type="button"
      tabIndex={0}
      aria-label="Dismiss badge"
      aria-describedby={descriptionId}
      onClick={(e) => {
        e.stopPropagation();
        onDismiss?.();
      }}
      className={cn(
        "inline-flex min-h-6 min-w-6 items-center justify-center rounded-full hover:cursor-pointer",
        "transition-opacity duration-150",
        "hover:opacity-100",
        "hover:bg-black/10 dark:hover:bg-white/10",
        "shrink-0",
        variant !== "solid" ? BadgeColorClass[color].softText : BadgeColorClass[color].text,
        className,
      )}
      role="button">
      <X className={cn(BadgeDismissSizeClass[size], variant !== "solid" ? BadgeColorClass[color].softText : BadgeColorClass[color].text)} />
    </button>
  );

  return (
    <span
      className={cn(
        BadgeBaseClass,
        BadgeSizeClass[size],
        BadgeRadiusClass[radius][size],
        BadgeVariantClass[variant](color),
        dismissible && "min-h-6",
        className,
      )}>
      {dismissible && dismissPosition === "start" && dismissButton}
      {leftIcon}
      <span id={descriptionId}>{children}</span>
      {rightIcon}
      {dismissible && dismissPosition === "end" && dismissButton}
    </span>
  );
}
