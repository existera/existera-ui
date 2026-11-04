"use client";

import { X } from "lucide-react";
import { cn } from "../../utils/Utils";
import type { ExAlertProps } from "./props/ExAlertProps";
import {
  AlertAccentClass,
  AlertBaseClass,
  AlertCloseButtonClass,
  AlertColorClass,
  AlertPaddingClass,
  AlertSizeClass,
  AlertVariantClass,
} from "./class/ExAlertClass";

export default function ExAlert({
  id,
  isOpen = true,
  title = "Alert",
  variant = "soft",
  color = "primary",
  size = "md",
  padding = "m",
  icon,
  dismissible = false,
  onDismiss,
  children,
  className,
  "aria-live": ariaLive = "assertive",
  "aria-label": ariaLabel,
  ...rest
}: ExAlertProps) {
  const styles = AlertSizeClass[size];
  if (!isOpen) return null;

  return (
    <div
      {...rest}
      id={id}
      role="alert"
      aria-live={ariaLive}
      aria-atomic="true"
      aria-label={ariaLabel ?? (title || undefined)}
      className={cn(
        AlertBaseClass,
        styles.wrap,
        AlertPaddingClass[padding],
        AlertVariantClass[variant](AlertColorClass[color]),
        variant === "soft" && AlertAccentClass[color],
        className,
      )}>
      {icon && (
        <span aria-hidden="true" className={cn("flex shrink-0 items-center justify-center [&>svg]:stroke-[1.75]", styles.icon)}>
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1 break-words">
        {title && <div className={cn(styles.title, "font-semibold tracking-tight", variant === "soft" && "text-foreground")}>{title}</div>}
        {children != null && <div className={cn(title && "mt-0.5", variant === "soft" && "text-muted")}>{children}</div>}
      </div>
      {dismissible && (
        <button
          id={id ? `btn-close-alert-${id}` : undefined}
          type="button"
          aria-label="Close alert"
          onClick={(event) => {
            event.stopPropagation();
            onDismiss?.();
          }}
          className={cn(AlertCloseButtonClass, styles.close, AlertColorClass[color].ring)}>
          <X aria-hidden="true" className="size-3.5 stroke-[1.75]" />
        </button>
      )}
    </div>
  );
}
