"use client";

import { useState, Children, cloneElement, isValidElement, useRef, useCallback } from "react";
import { ExAccordionContext } from "./context/ExAccordionContext";
import type { ExAccordionProps } from "./props/ExAccordionProps";
import { cn } from "../../utils/Utils";

export default function ExAccordion({
  variant = "default",
  size = "md",
  children,
  defaultOpenIndex = null,
  allowMultiple = false,
}: ExAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    typeof defaultOpenIndex === "number" ? defaultOpenIndex : null,
  );

  const [openIndexes, setOpenIndexes] = useState<number[]>(
    Array.isArray(defaultOpenIndex)
      ? defaultOpenIndex
      : typeof defaultOpenIndex === "number"
        ? [defaultOpenIndex]
        : [],
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback((index: number) => {
    if (allowMultiple) {
      const toggleMultiple = (i: number) => {
        setOpenIndexes((prev) =>
          prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i],
        );
      };
      toggleMultiple(index);
    } else {
      const toggleSingle = (i: number) => {
        setOpenIndex((prev) => (prev === i ? null : i));
      };
      toggleSingle(index);
    }
  }, [allowMultiple]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.matches("button[data-accordion-trigger]") || target.closest("[data-accordion-root]") !== containerRef.current) return;
    const buttons = Array.from(containerRef.current?.querySelectorAll<HTMLButtonElement>("button[data-accordion-trigger]:not(:disabled)") ?? [])
      .filter(button => button.closest("[data-accordion-root]") === containerRef.current);
    const index = buttons.indexOf(target as HTMLButtonElement);
    if (index < 0 || !["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    e.preventDefault(); e.stopPropagation();
    const next = e.key === "Home" ? 0 : e.key === "End" ? buttons.length - 1 : (index + (e.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
  };

  return (
    <ExAccordionContext.Provider
      value={{
        openIndex,
        openIndexes,
        allowMultiple,
        size,
        toggle,
      }}
    >
      <div
          ref={containerRef}
          data-accordion-root=""
          className={cn(
            "w-full rounded-lg border border-border",
            variant === "default" ? "bg-background" : "bg-transparent",
          )}
          onKeyDown={handleKeyDown}
        >
          <div
            className="flex flex-col"
          >
            {Children.map(children, (child, index) => {
              if (!isValidElement<{ __index?: number }>(child)) return child;

              return cloneElement(child, {
                __index: index,
              });
            })}
          </div>
        </div>
    </ExAccordionContext.Provider>
  );
}
