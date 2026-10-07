"use client";

import { CheckCircle2, CircleAlert, Info, TriangleAlert, X } from "lucide-react";
import { useEffect, useRef } from "react";

import type { ExToastProps } from "./props/ExToastProps";
import { cn } from "../../utils/Utils";

export default function ExToast({ toast, onClose }: ExToastProps) {
  const styles = {
    default: {
      icon: null,
      text: "text-foreground",
      background: "bg-surface",
      border: "border-border",
      close: "text-muted hover:bg-surface-2 hover:text-foreground",
      progress: "bg-foreground/30",
      shadow: "shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)]",
      darkShadow: "dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.18),0_4px_14px_rgba(0,0,0,0.25)]",
    },

    success: {
      icon: CheckCircle2,
      text: "text-success",
      background: "bg-success-soft",
      border: "border-success/25",
      progress: "bg-success",
      close: "text-success/70 hover:bg-success/10 hover:text-success",
      shadow: "shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]",
      darkShadow: "dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.20),0_4px_14px_rgba(0,0,0,0.22)]",
    },

    danger: {
      icon: CircleAlert,
      text: "text-danger",
      background: "bg-danger-soft",
      border: "border-danger/25",
      progress: "bg-danger",
      close: "text-danger/70 hover:bg-danger/10 hover:text-danger",
      shadow: "shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]",
      darkShadow: "dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.22),0_4px_14px_rgba(0,0,0,0.24)]",
    },

    warning: {
      icon: TriangleAlert,
      text: "text-warning",
      background: "bg-warning-soft",
      border: "border-warning/25",
      progress: "bg-warning",
      close: "text-warning/70 hover:bg-warning/10 hover:text-warning",
      shadow: "shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]",
      darkShadow: "dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.22),0_4px_14px_rgba(0,0,0,0.24)]",
    },

    info: {
      icon: Info,
      text: "text-primary",
      background: "bg-primary-soft",
      border: "border-primary/25",
      progress: "bg-primary",
      close: "text-primary/70 hover:bg-primary/10 hover:text-primary",
      shadow: "shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]",
      darkShadow: "dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.22),0_4px_14px_rgba(0,0,0,0.24)]",
    },
  } as const;

  const style = styles[toast.type];
  const Icon = style.icon;

  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toastRef.current) return;

    const ariaLive = toast.type === "danger" ? "assertive" : "polite";

    toastRef.current.setAttribute("role", "status");
    toastRef.current.setAttribute("aria-live", ariaLive);
    toastRef.current.setAttribute("aria-atomic", "true");
  }, [toast.type]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClose(toast.id);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose(toast.id);
    }
  };

  return (
    <div
      ref={toastRef}
      className={cn(
        "relative w-80 overflow-hidden",
        "rounded-(--radius-lg)",
        "border border-border",
        "transition-all duration-200",
        style.background,
        style.shadow,
        style.darkShadow,
      )}
      onKeyDown={handleKeyDown}
      role="status"
      aria-live={toast.type === "danger" ? "assertive" : "polite"}
      aria-atomic="true">
      {/* Content */}
      <div className={cn(!toast.description && !toast.content && "items-center", "flex gap-1.5 p-3")}>
        {/* Icon */}
        {Icon && (
          <div className={cn(style.text, toast.description && "mt-0.5", "shrink-0")}>
            <Icon size={17} strokeWidth={2.5} />
          </div>
        )}

        {/* Body */}
        <div className="min-w-0 flex-1 pr-5">
          {toast.content ? (
            toast.content
          ) : (
            <>
              {toast.title && <h4 className={cn(style.text, "text-sm font-semibold leading-tight")}>{toast.title}</h4>}

              {toast.description && <p className="mt-1 text-sm leading-relaxed wrap-break-word text-foreground/80">{toast.description}</p>}
            </>
          )}
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={() => onClose(toast.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClose(toast.id);
            } else if (e.key === "Escape") {
              e.preventDefault();
              onClose(toast.id);
            }
          }}
          className={cn(
            "absolute right-3 top-3",
            "flex h-5 w-5 shrink-0 items-center justify-center",
            "rounded-xs",
            "cursor-pointer",
            "transition-colors",
            style.close,
            "focus:outline-none",
            "focus-visible:ring-1",
            "focus-visible:ring-ring",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background",
          )}
          aria-label={`Dismiss notification: ${toast.title || "notification"}`}>
          <X size={14} strokeWidth={2} />
        </button>
      </div>

      {/* Timeout progress */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 h-0.5 w-full">
          <div
            className={cn("h-full w-full origin-left", style.progress, "animate-[toast-progress_linear_forwards]")}
            style={
              {
                animationDuration: `${toast.duration}ms`,
              } as React.CSSProperties
            }
          />
        </div>
      )}
    </div>
  );
}
