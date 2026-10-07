"use client";

import { createPortal } from "react-dom";
import { useLayoutEffect, useState, useCallback } from "react";
import type { ExTimeSelectorClockProps } from "./props/ExTimeSelectorClockProps";

const GAP = 2;
const VIEWPORT_PADDING = 8;
type ContentStyle = {
  top: number;
  left: number;
  minWidth: number;
  visibility: "hidden" | "visible";
};

export default function ExTimeSelectorClock({
  children,
  open,
  triggerRef,
  contentRef,
}: ExTimeSelectorClockProps) {
  const [style, setStyle] = useState<ContentStyle>({
    top: -99999,
    left: -99999,
    minWidth: 0,
    visibility: "hidden",
  });

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const content = contentRef.current;
    if (!trigger || !content) return;
    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const spaceAbove = triggerRect.top;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const openTop =
      spaceBelow < contentRect.height + GAP && spaceAbove > contentRect.height;
    const top = openTop
      ? triggerRect.top + window.scrollY - contentRect.height - GAP
      : triggerRect.bottom + window.scrollY + GAP;
    let left =
      triggerRect.left +
      window.scrollX +
      (triggerRect.width - contentRect.width) / 2;
    const minLeft = window.scrollX + VIEWPORT_PADDING;
    const maxLeft =
      window.scrollX + window.innerWidth - contentRect.width - VIEWPORT_PADDING;
    left = Math.max(minLeft, Math.min(left, maxLeft));
    setStyle({
      top,
      left,
      minWidth: triggerRect.width,
      visibility: "visible",
    });
  }, [triggerRef, contentRef]);

  useLayoutEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(updatePosition);
    const observer = new ResizeObserver(updatePosition);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition, contentRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={contentRef}
      style={{
        position: "absolute",
        top: style.top,
        left: style.left,
        minWidth: style.minWidth,
        visibility: style.visibility,
        zIndex: 9999,
      }}
      className="max-h-72 overflow-y-auto overflow-x-hidden rounded-lg border border-border bg-surface shadow-sm"
    >
      {children}
    </div>,
    document.body,
  );
}
