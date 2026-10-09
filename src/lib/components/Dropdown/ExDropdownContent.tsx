"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useExDropdown } from "./ExDropdownProps";
import { useRegisterModalPortal } from "../Modal/context/ExModalContext";

type Props = {
  children: ReactNode;
  id?: string;
};

type Placement = "top" | "bottom";

const GAP = 6;

export default function ExDropdownContent({ children, id }: Props) {
  const { open, triggerRef, contentRef, setContentRef, align, handleContentKeyDown, menuId, triggerId, setMenuId } = useExDropdown();
  useEffect(() => { if (id) setMenuId(id); }, [id, setMenuId]);
  const registerPortalRef = useRegisterModalPortal<HTMLDivElement>();

  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    width: 0,
    placement: "bottom" as Placement,
  });

  const updatePos = useCallback(() => {
    const trigger = triggerRef.current;
    const content = contentRef.current;

    if (!trigger || !content) return;

    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    const spaceAbove = triggerRect.top;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const requiredSpace = contentRect.height + GAP;

    let placement: Placement = "bottom";

    if (spaceBelow < requiredSpace) {
      placement = spaceAbove >= spaceBelow ? "top" : "bottom";
    }

    let left = triggerRect.left + window.scrollX;

    if (align === "center") {
      left = triggerRect.left + window.scrollX + triggerRect.width / 2;
    }

    if (align === "right") {
      left = triggerRect.right + window.scrollX;
    }

    const top = placement === "top" ? triggerRect.top + window.scrollY - GAP : triggerRect.bottom + window.scrollY + GAP;

    setPos({
      top,
      left,
      width: triggerRect.width,
      placement,
    });
  }, [align, contentRef, triggerRef]);

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(updatePos);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [open, updatePos]);

  useEffect(() => {
    if (!open) return;

    const handleUpdate = () => {
      updatePos();
    };

    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate, true);

    return () => {
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate, true);
    };
  }, [open, updatePos]);

  useEffect(() => {
    if (!open) return;

    const content = contentRef.current;

    if (!content) return;

    const observer = new ResizeObserver(() => {
      updatePos();
    });

    observer.observe(content);

    return () => {
      observer.disconnect();
    };
  }, [open, contentRef, updatePos]);

  if (!open) return null;

  const transform =
    align === "center"
      ? pos.placement === "top"
        ? "translate(-50%, -100%)"
        : "translateX(-50%)"
      : align === "right"
        ? pos.placement === "top"
          ? "translate(-100%, -100%)"
          : "translateX(-100%)"
        : pos.placement === "top"
          ? "translateY(-100%)"
          : undefined;

  return createPortal(
    <div
      id={id ?? menuId}
      ref={(element) => { setContentRef(element); registerPortalRef(element); }}
      role="menu"
      aria-labelledby={triggerId}
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        width: "max-content",
        minWidth: pos.width,
        maxWidth: `calc(100vw - 16px)`,
        maxHeight: `calc(100vh - 16px)`,
        overflowY: "auto",
        transform,
        zIndex: 9999,
      }}
      className="rounded-lg border border-border bg-surface p-1 shadow-sm"
      onKeyDown={(e) => {
        handleContentKeyDown(e);
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}>
      {children}
    </div>,
    document.body,
  );
}
