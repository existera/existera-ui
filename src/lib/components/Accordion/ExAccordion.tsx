"use client";

import { useState, Children, cloneElement, useEffect, useRef, useCallback } from "react";
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

  const [childrenCount, setChildrenCount] = useState(0);
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

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!allowMultiple) {
      const allOpenIndexes = openIndex !== null ? [openIndex] : [];
      switch (e.key) {
        case "ArrowDown":
          e.stopPropagation();
          e.preventDefault();
          const nextIndex = allOpenIndexes.length > 0 ? (allOpenIndexes[allOpenIndexes.length - 1] + 1) % childrenCount : 0;
          if (nextIndex >= 0) {
            const nextElem = document.querySelector<HTMLButtonElement>(
              `[id="accordion-trigger-${nextIndex}"]`
            );
            nextElem?.focus();
          }
          break;
        case "ArrowUp":
          e.stopPropagation();
          e.preventDefault();
          const prevIndex = allOpenIndexes.length > 0 
            ? (allOpenIndexes[0] - 1 + childrenCount) % childrenCount 
            : 0;
          if (prevIndex >= 0) {
            const prevElem = document.querySelector<HTMLButtonElement>(
              `[id="accordion-trigger-${prevIndex}"]`
            );
            prevElem?.focus();
          }
          break;
        case "Home":
          e.stopPropagation();
          e.preventDefault();
          if (childrenCount > 0) {
            const firstElem = document.querySelector<HTMLButtonElement>(
              `[id="accordion-trigger-0"]`
            );
            firstElem?.focus();
          }
          break;
        case "End":
          e.stopPropagation();
          e.preventDefault();
          if (childrenCount > 0) {
            const lastElem = document.querySelector<HTMLButtonElement>(
              `[id="accordion-trigger-${childrenCount - 1}"]`
            );
            lastElem?.focus();
          }
          break;
      }
    }
  }, [allowMultiple, openIndex, childrenCount]);

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
          className={cn(
            "w-full rounded-lg border border-border",
            variant === "default" ? "bg-background" : "bg-transparent",
          )}
          onKeyDown={handleKeyDown}
          role="presentation"
          aria-label={children ? "Accordion navigation" : undefined}
        >
          <div
            className="flex flex-col"
            ref={(el) => {
              if (el) {
                setChildrenCount(el.children.length);
              }
            }}
          >
            {Children.map(children, (child, index) => {
              if (!child) return null;

              return cloneElement(child as never, {
                __index: index,
              });
            })}
          </div>
        </div>
    </ExAccordionContext.Provider>
  );
}
