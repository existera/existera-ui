"use client";

import { useState, useRef, useEffect, useCallback, Fragment, useId, isValidElement, cloneElement, type HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { cn, usePrefersReducedMotion } from "../../utils/Utils";
import type { ExTooltipProps } from "./props/ExTooltipProps";

export default function ExTooltip({
  content,
  children,
  position = "top",
  align = "center",
  delay = 200,
  clickable = false,
  className,
  contentClassName,
}: ExTooltipProps) {
  const tooltipId = useId();
  const childElement = isValidElement<HTMLAttributes<HTMLElement>>(children) && children.type !== Fragment ? children : null;
  const childIsControl = childElement && (typeof childElement.type !== "string" || ["button", "a", "input", "select", "textarea"].includes(childElement.type) || (childElement.props.tabIndex ?? -1) >= 0);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const gap = 10;

    let top = 0;
    let left = 0;

    if (position === "top" || position === "bottom") {
      if (align === "start") {
        left = rect.left - 11;
      } else if (align === "center") {
        left = rect.left + rect.width / 2;
      } else {
        left = rect.right + 11;
      }

      top = position === "top" ? rect.top - gap : rect.bottom + gap + 2;

      if (position === "top") {
        top = rect.top - gap - 2;
      }
    }

    if (position === "left" || position === "right") {
      if (align === "start") {
        top = rect.top;
      } else if (align === "center") {
        top = rect.top + rect.height / 2;
      } else {
        top = rect.bottom;
      }

      left = position === "left" ? rect.left - gap : rect.right + gap;
    }

    setCoords((prev) => {
      if (Math.abs(prev.top - top) < 1 && Math.abs(prev.left - left) < 1) {
        return prev;
      }

      return { top, left };
    });
  }, [position, align]);

  const startLoop = useCallback(() => {
    if (prefersReducedMotion) return;

    const loop = () => {
      updatePosition();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, [updatePosition, prefersReducedMotion]);

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const show = () => {
    if (clickable) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setOpen(true);
    }, delay);
  };

  const toggle = () => {
    if (!clickable) return;

    if (open) {
      setOpen(false);
      return;
    }

    updatePosition();
    setOpen(true);
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  useEffect(() => {
    if (!open) {
      stopLoop();
      return;
    }

    startLoop();

    return () => stopLoop();
  }, [open, startLoop, stopLoop]);

  useEffect(() => {
    if (!clickable || !open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (wrapperRef.current?.contains(target) || tooltipRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickable, open]);

  const transform =
    position === "top"
      ? align === "start"
        ? "translate(0, -100%)"
        : align === "center"
          ? "translate(-50%, -100%)"
          : "translate(-100%, -100%)"
      : position === "bottom"
        ? align === "start"
          ? "translate(0, 0)"
          : align === "center"
            ? "translate(-50%, 0)"
            : "translate(-100%, 0)"
        : position === "left"
          ? align === "start"
            ? "translate(-100%, 0)"
            : align === "center"
              ? "translate(-100%, -50%)"
              : "translate(-100%, -100%)"
          : align === "start"
            ? "translate(0, 0)"
            : align === "center"
              ? "translate(0, -50%)"
              : "translate(0, -100%)";

  const arrowBase = "absolute w-0 h-0";

  const arrowClass =
    position === "top"
      ? align === "start"
        ? "bottom-[-6px] left-3 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-neutral-800/90"
        : align === "center"
          ? "bottom-[-6px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-neutral-800/90"
          : "bottom-[-6px] right-3 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-neutral-800/90"
      : position === "bottom"
        ? align === "start"
          ? "top-[-6px] left-3 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-neutral-800/90"
          : align === "center"
            ? "top-[-6px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-neutral-800/90"
            : "top-[-6px] right-3 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-neutral-800/90"
        : position === "left"
          ? align === "start"
            ? "right-[-6px] top-3 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-neutral-800/90"
            : align === "center"
              ? "right-[-6px] top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-neutral-800/90"
              : "right-[-6px] bottom-3 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-neutral-800/90"
          : align === "start"
            ? "left-[-6px] top-3 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-neutral-800/90"
            : align === "center"
              ? "left-[-6px] top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-neutral-800/90"
              : "left-[-6px] bottom-3 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-neutral-800/90";


  return (
    <>
      <span
        ref={wrapperRef}
        className={cn(
          "inline-flex rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        onMouseEnter={show}
        onMouseLeave={() => {
          if (clickable || wrapperRef.current?.contains(document.activeElement)) return;
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setOpen(false), 150);
        }}
        onFocus={() => { if (!clickable) { if (timeoutRef.current) clearTimeout(timeoutRef.current); updatePosition(); setOpen(true); } }}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(false); } }}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (open) { e.preventDefault(); e.stopPropagation(); setOpen(false); }
          } else if (clickable && e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault(); toggle();
          }
        }}
        tabIndex={childIsControl ? undefined : 0}
        role={!childIsControl && clickable ? "button" : undefined}
        aria-describedby={!childIsControl && open ? tooltipId : undefined}>
        {childIsControl && childElement ? cloneElement(childElement, { "aria-describedby": [childElement.props["aria-describedby"], open ? tooltipId : undefined].filter(Boolean).join(" ") || undefined }) : children}
      </span>

      {open &&
        createPortal(
          <div
            id={tooltipId}
            ref={tooltipRef}
            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
            onMouseLeave={() => { if (!clickable && !wrapperRef.current?.contains(document.activeElement)) setOpen(false); }}
            className={cn(
              "fixed z-99999 w-fit rounded-md bg-neutral-800/90 px-2 py-1.5 text-xs text-white shadow-md",
              "will-change-transform",
              "pointer-events-auto",
              contentClassName,
            )}
            style={{
              top: coords.top,
              left: coords.left,
              transform,
              transition: prefersReducedMotion ? "none" : undefined,
            }}
            role="tooltip"
            aria-hidden={!open}>
            {content}
            <div className={cn(arrowBase, arrowClass)} />
          </div>,
          document.body,
        )}
    </>
  );
}
