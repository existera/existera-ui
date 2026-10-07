"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/Utils";
import { useAccordion } from "./context/ExAccordionContext";
import { AccordionSizeClass } from "./class/ExAccordionClass";
import type { ExAccordionItemProps } from "./props/ExAccordionItemProps";
import { useEffect, useRef } from "react";

export default function ExAccordionItem({
  title,
  children,
  icon,
  __index = 0,
}: ExAccordionItemProps) {
  const { openIndex, openIndexes, allowMultiple, size, toggle } =
    useAccordion();

  const opened = allowMultiple
    ? openIndexes.includes(__index)
    : openIndex === __index;

  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        id={`accordion-trigger-${__index}`}
        aria-expanded={opened}
        aria-controls={`accordion-panel-${__index}`}
        aria-labelledby={`accordion-trigger-${__index}`}
        type="button"
        onClick={() => toggle(__index)}
        className={cn(
          AccordionSizeClass[size].title,
          AccordionSizeClass[size].pading,
          "flex w-full items-center justify-between gap-3 text-left transition-colors hover:cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          opened
            ? "font-medium underline"
            : "",
        )}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center gap-2">
          {icon && (
            <span className="flex shrink-0">{icon}</span>
          )}

          <span>{title}</span>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            opened && "rotate-180",
          )}
        />
      </button>

      <div
        id={`accordion-panel-${__index}`}
        role="region"
        aria-labelledby={`accordion-trigger-${__index}`}
        className={cn(
          AccordionSizeClass[size].text,
          AccordionSizeClass[size].padingContent,
          "grid transition-all duration-300 ease-in-out",
          opened
            ? "grid-rows-[1fr] opacity-100 pb-3"
            : "grid-rows-[0fr] opacity-0 pb-0",
        )}
        aria-hidden={!opened}
      >
        <div ref={panelRef} className="overflow-hidden text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
