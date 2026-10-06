"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../utils/Utils";
import type { ExTabListProps } from "./props/ExTabListProps";
import { useTab } from "./context/ExTabContext";

export default function ExTabList({ children, className, "aria-label": ariaLabel = "Primary" }: ExTabListProps) {
  const { activeTab } = useTab();

  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;

    if (!container || !scroll) return;

    const activeEl = container.querySelector<HTMLButtonElement>(
      `[data-tab="${activeTab}"]`,
    );

    if (!activeEl) return;

    setIndicator({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
    });

    const scrollLeft = scroll.scrollLeft;
    const viewportLeft = scrollLeft;
    const viewportRight = scrollLeft + scroll.clientWidth;

    const elementLeft = activeEl.offsetLeft;
    const elementRight = elementLeft + activeEl.offsetWidth;

    if (elementLeft < viewportLeft) {
      scroll.scrollTo({
        left: elementLeft - 16,
        behavior: "smooth",
      });
    } else if (elementRight > viewportRight) {
      scroll.scrollTo({
        left: elementRight - scroll.clientWidth + 16,
        behavior: "smooth",
      });
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current) return;

      const active = containerRef.current.querySelector<HTMLButtonElement>(
        `[data-tab="${activeTab}"]`,
      );

      if (!active) return;

      setIndicator({
        left: active.offsetLeft,
        width: active.offsetWidth,
      });
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [activeTab, children]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "min-w-0 overflow-x-auto overflow-y-hidden",
        "scrollbar-none",
        "[-ms-overflow-style:none]",
        "[&::-webkit-scrollbar]:hidden",
      )}
    >
      <div
        ref={containerRef}
        role="tablist"
        aria-label={ariaLabel}
        className={cn(
          "relative flex w-max min-w-full items-center gap-2 border-b border-border",
          className,
        )}
      >
        {children}

        <span
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out"
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />
      </div>
    </div>
  );
}
