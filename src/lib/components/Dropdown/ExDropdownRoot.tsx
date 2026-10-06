import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { ExDropdownCtx, type ExDropdownAlign } from "./ExDropdownProps.js";

type Props = {
  children: ReactNode;
  defaultAlign?: ExDropdownAlign;
  disabled?: boolean;
};

export default function ExDropdownRoot({
  children,
  defaultAlign = "left",
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState<ExDropdownAlign>(defaultAlign);
  const [arrowKeyNavigation, setArrowKeyNavigation] = useState(false);

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const menuItemsRef = useRef<Array<HTMLDivElement | null>>([]);

  const toggle = () => {
    if (disabled) return;
    setOpen((v) => !v);
  };

  const close = useCallback(() => {
    setOpen(false);
    setArrowKeyNavigation(false);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  const setContentRef = (el: HTMLDivElement | null) => {
    if (el) contentRef.current = el;
  };

  const registerMenuItem = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      const index = menuItemsRef.current.indexOf(null);
      if (index === -1) {
        menuItemsRef.current.push(el);
      } else {
        menuItemsRef.current[index] = el;
      }
    }
  }, []);

  const unregisterMenuItem = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      const index = menuItemsRef.current.indexOf(el);
      if (index !== -1) {
        menuItemsRef.current[index] = null;
      }
    }
  }, []);

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      const allowedKeys = [
        "ArrowDown",
        "ArrowUp",
        "Home",
        "End",
        "Enter",
        " ",
        "Escape",
      ];

      if (!allowedKeys.includes(e.key)) return;

      e.preventDefault();

      switch (e.key) {
        case "ArrowDown":
          e.stopPropagation();
          setOpen(true);
          setArrowKeyNavigation(true);
          const firstItem = menuItemsRef.current.find(
            (item) => item !== null && !item.getAttribute("aria-disabled")
          );
          if (firstItem) firstItem.focus();
          break;
        case "ArrowUp":
          e.stopPropagation();
          setOpen(true);
          setArrowKeyNavigation(true);
          const items = menuItemsRef.current.filter(
            (item) => item !== null && !item.getAttribute("aria-disabled")
          );
          const lastItem = items[items.length - 1];
          if (lastItem) lastItem.focus();
          break;
        case "Home":
          e.stopPropagation();
          setOpen(true);
          setArrowKeyNavigation(true);
          const first = menuItemsRef.current.find(
            (item) => item !== null && !item.getAttribute("aria-disabled")
          );
          if (first) first.focus();
          break;
        case "End":
          e.stopPropagation();
          setOpen(true);
          setArrowKeyNavigation(true);
          const allItems = menuItemsRef.current.filter(
            (item) => item !== null && !item.getAttribute("aria-disabled")
          );
          const last = allItems[allItems.length - 1];
          if (last) last.focus();
          break;
        case "Enter":
        case " ":
          if (!open) {
            e.stopPropagation();
            toggle();
          }
          break;
        case "Escape":
          if (open) {
            e.stopPropagation();
            close();
          }
          break;
      }
    },
    [disabled, open, toggle, close]
  );

  const handleContentKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      const items = menuItemsRef.current.filter(
        (item) => item !== null && !item.getAttribute("aria-disabled")
      );

      switch (e.key) {
        case "ArrowDown":
          e.stopPropagation();
          const currentIndex = items.findIndex(
            (item) => item === document.activeElement
          );
          const nextIndex = (currentIndex + 1) % items.length;
          items[nextIndex]?.focus();
          break;
        case "ArrowUp":
          e.stopPropagation();
          const currentIndexUp = items.findIndex(
            (item) => item === document.activeElement
          );
          const prevIndex =
            currentIndexUp === 0 ? items.length - 1 : currentIndexUp - 1;
          items[prevIndex]?.focus();
          break;
        case "Home":
          e.stopPropagation();
          items[0]?.focus();
          break;
        case "End":
          e.stopPropagation();
          items[items.length - 1]?.focus();
          break;
        case "Escape":
          e.stopPropagation();
          close();
          if (triggerRef.current) {
            triggerRef.current.focus();
          }
          break;
        case "Tab":
          close();
          break;
      }
    },
    [disabled, close]
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        contentRef.current?.contains(e.target as Node)
      )
        return;

      setOpen(false);
      setArrowKeyNavigation(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        close();
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (triggerRef.current) {
      const ariaExpanded = open ? "true" : "false";
      triggerRef.current.setAttribute("aria-expanded", ariaExpanded);
    }
  }, [open]);

  return (
    <ExDropdownCtx.Provider
      value={{
        open,
        setOpen,
        toggle,
        close,
        disabled,
        align,
        setAlign,
        arrowKeyNavigation,
        setArrowKeyNavigation,
        triggerRef,
        contentRef,
        setContentRef,
        registerMenuItem,
        unregisterMenuItem,
        menuItemsRef,
        handleTriggerKeyDown,
        handleContentKeyDown,
      }}
    >
      {children}
    </ExDropdownCtx.Provider>
  );
}