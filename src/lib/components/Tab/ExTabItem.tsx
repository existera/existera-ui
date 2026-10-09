"use client";

import { useRef } from "react";
import { cn } from "../../utils/Utils";
import { useTab } from "./context/ExTabContext";
import type { ExTabItemProps } from "./props/ExTabItemProps";

export default function ExTabItem({
  value,
  disabled = false,
  children,
  icon,
  badge,
}: ExTabItemProps) {
  const { activeTab, setActiveTab, baseId } = useTab();
  const isActive = activeTab === value;
  const tabRef = useRef<HTMLButtonElement>(null);


  return (
    <button
      type="button"
      ref={tabRef}
      role="tab"
      id={`${baseId}-tab-${encodeURIComponent(value)}`}
      aria-controls={`${baseId}-panel-${encodeURIComponent(value)}`}
      data-tab={value}
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={!disabled && isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      onKeyDown={(e) => {
        if (disabled || !["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
        const list = e.currentTarget.closest('[role="tablist"]');
        const buttons = Array.from(list?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [])
          .filter(button => button.closest('[role="tablist"]') === list);
        const index = buttons.indexOf(e.currentTarget);
        if (index < 0) return;
        e.preventDefault(); e.stopPropagation();
        const next = e.key === "Home" ? 0 : e.key === "End" ? buttons.length - 1 : (index + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;
        buttons[next]?.focus();
        const nextValue = buttons[next]?.dataset.tab;
        if (nextValue !== undefined) setActiveTab(nextValue);
      }}
      className={cn(
        "group flex items-center gap-1 px-3 py-1.5 text-sm transition-all duration-200 font-medium",
        disabled && "cursor-not-allowed opacity-50 text-muted",
        !disabled && isActive && "text-primary",
        !disabled &&
          !isActive &&
          "text-muted hover:text-foreground cursor-pointer",
      )}
    >
      {icon && (
        <span
          className={cn(
            "flex items-center transition-colors duration-200",
            disabled && "opacity-50",
            isActive && !disabled && "text-primary",
            !isActive && !disabled && "text-muted-foreground",
          )}
        >
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap transition-colors duration-200">
        {children}
      </span>
      {badge !== undefined && (
        <span
          className={cn(
            "ml-1 flex items-center justify-center text-[10px] px-1.5 py-1 rounded-md leading-none transition-all duration-200",
            disabled && "bg-muted/30 text-muted-foreground",
            !disabled && isActive && "bg-primary text-white",
            !disabled &&
              !isActive &&
              "bg-muted/20 text-muted-foreground group-hover:bg-muted/30",
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
