"use client";

import clsx from "clsx";
import type { ExProgressProps } from "./props/ExProgressProps";

export default function ExProgress({
  value,
  max = 100,
  size = "md",
  color = "primary",
  showValue = false,
  radius = true,
  className,
  style,
}: ExProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={clsx("min-w-0 w-full", className)} style={style}>
      {showValue && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}

      <div
        className={clsx(
          "w-full overflow-hidden bg-surface-3",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.10)]",
          "dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.28),inset_0_-1px_1px_rgba(255,255,255,0.035)]",
          radius && "rounded-full",
          {
            "h-1": size === "xs",
            "h-1.5": size === "sm",
            "h-2.5": size === "md",
            "h-4": size === "lg",
          },
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={`${Math.round(percentage)}%`}>
        <div
          className={clsx(
            "h-full transition-all duration-300 ease-out",
            "shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]",
            "dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.10)]",
            radius && "rounded-full",
            {
              "bg-primary": color === "primary",
              "bg-secondary": color === "secondary",
              "bg-success": color === "success",
              "bg-warning": color === "warning",
              "bg-danger": color === "danger",
            },
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
