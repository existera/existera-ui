"use client";

import { X } from "lucide-react";
import { cn } from "../../utils/Utils";
import type { ExAlertProps } from "./props/ExAlertProps";

import { AlertBaseClass, AlertCloseButtonClass, AlertColorClass, AlertPaddingClass, AlertSizeClass, AlertVariantClass } from "./class/ExAlertClass";

import { useEffect, useRef } from "react";

export default function ExAlert({
  id,
  title = "Alert",
  variant = "solid",
  color = "primary",
  size = "md",
  padding = "m",
  icon,
  dismissible = false,
  onDismiss,
  children,
  "aria-live": ariaLive,
}: ExAlertProps) {
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (alertRef.current) {
      alertRef.current.setAttribute("role", "alert");
      alertRef.current.setAttribute("aria-live", ariaLive || "assertive");
    }
  }, [ariaLive]);

  return (
    <div
      id={id}
      ref={alertRef}
      role="alert"
      aria-live={ariaLive || "assertive"}
      aria-atomic="true"
      className={cn(
        AlertBaseClass,
        AlertSizeClass[size].wrap,
        AlertPaddingClass[padding],
        dismissible && AlertSizeClass[size].pr,
        AlertVariantClass[variant](AlertColorClass[color]),
      )}
      aria-label={title}>
      <div className="flex-1 min-w-0">
        <div className=" items-start gap-1 w-fit">
          <div className={cn(AlertSizeClass[size].title, "flex items-center min-w-0")}>
            {icon && icon}
            <div className={cn(AlertSizeClass[size].title, "font-medium leading-none")}>{title}</div>
          </div>
          {children && <div className="mt-1">{children}</div>}
        </div>
      </div>

      {dismissible && (
        <button
          id={`btn-close-alert-${id}`}
          type="button"
          aria-label="Close alert"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss?.();
          }}
          className={cn(
            AlertCloseButtonClass,
            AlertSizeClass[size].close,
            AlertColorClass[color].ring,
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          )}>
          <X
            className={cn(
              variant === "soft"
                ? ({
                    primary: "text-primary",
                    secondary: "text-secondary",
                    success: "text-success",
                    warning: "text-warning",
                    danger: "text-danger",
                    info: "text-info",
                  }[color] ?? "text-white")
                : "text-white",
              "size-4 stroke-2",
            )}
          />
        </button>
      )}
    </div>
  );
}
