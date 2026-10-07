"use client";

import { useEffect, useRef } from "react";
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
  const { activeTab, setActiveTab } = useTab();
  const isActive = activeTab === value;
  const tabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.setAttribute("aria-current", isActive ? "page" : "false");
    }
  }, [isActive]);

  return (
    <button
      type="button"
      ref={tabRef}
      role="tab"
      data-tab={value}
      aria-selected={isActive}
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      onKeyDown={(e) => {
        if (disabled) return;
        const parentRole = tabRef.current?.parentElement?.getAttribute("role");
        if (parentRole === "tablist" && tabRef.current?.parentElement) {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            const buttons = Array.from(
              tabRef.current.parentElement.querySelectorAll<HTMLButtonElement>(
                'button[role="tab"]:not([aria-disabled="true"])'
              ) || []
            );
            const currentIndex = buttons.indexOf(tabRef.current);
            const nextIndex = (currentIndex + 1) % buttons.length;
            if (nextIndex < buttons.length) {
              buttons[nextIndex].focus();
            }
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const buttons = Array.from(
              tabRef.current.parentElement.querySelectorAll<HTMLButtonElement>(
                'button[role="tab"]:not([aria-disabled="true"])'
              ) || []
            );
            const currentIndex = buttons.indexOf(tabRef.current);
            const prevIndex =
              currentIndex === 0 ? buttons.length - 1 : currentIndex - 1;
            if (prevIndex >= 0) {
              buttons[prevIndex].focus();
            }
          } else if (e.key === "Home") {
            e.preventDefault();
            const buttons = Array.from(
              tabRef.current.parentElement.querySelectorAll<HTMLButtonElement>(
                'button[role="tab"]:not([aria-disabled="true"])'
              ) || []
            );
            if (buttons.length > 0) {
              buttons[0].focus();
            }
          } else if (e.key === "End") {
            e.preventDefault();
            const buttons = Array.from(
              tabRef.current.parentElement.querySelectorAll<HTMLButtonElement>(
                'button[role="tab"]:not([aria-disabled="true"])'
              ) || []
            );
            if (buttons.length > 0) {
              buttons[buttons.length - 1].focus();
            }
          }
        }
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
