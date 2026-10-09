"use client";
import { useEffect, useRef, useState, useCallback, useId, type ReactNode } from "react";
import { ExDropdownCtx, type ExDropdownAlign } from "./ExDropdownProps.js";

type Props = { children: ReactNode; defaultAlign?: ExDropdownAlign; disabled?: boolean };
export default function ExDropdownRoot({ children, defaultAlign = "left", disabled = false }: Props) {
  const baseId = useId();
  const [menuId, setMenuId] = useState(baseId + "-menu");
  const [triggerId, setTriggerId] = useState(baseId + "-trigger");
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState<ExDropdownAlign>(defaultAlign);
  const [arrowKeyNavigation, setArrowKeyNavigation] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const menuItemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const pendingFocus = useRef<"first" | "last" | null>(null);
  const items = useCallback(() => Array.from(contentRef.current?.querySelectorAll<HTMLDivElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? [])
    .filter(item => item.closest('[role="menu"]') === contentRef.current), []);
  const focusTrigger = useCallback(() => {
    const trigger = triggerRef.current;
    (trigger?.querySelector<HTMLElement>('[data-dropdown-trigger]') ?? trigger)?.focus();
  }, []);
  const close = useCallback(() => { focusTrigger(); setOpen(false); setArrowKeyNavigation(false); pendingFocus.current = null; }, [focusTrigger]);
  const toggle = () => { if (!disabled) { pendingFocus.current = "first"; setOpen(v => !v); } };
  const setContentRef = useCallback((el: HTMLDivElement | null) => { contentRef.current = el; }, []);
  const registerMenuItem = useCallback((el: HTMLDivElement | null) => { if (el && !menuItemsRef.current.includes(el)) menuItemsRef.current.push(el); }, []);
  const unregisterMenuItem = useCallback((el: HTMLDivElement | null) => { menuItemsRef.current = menuItemsRef.current.filter(item => item !== el); }, []);
  useEffect(() => {
    if (!open) return;
    const list = items();
    (pendingFocus.current === "last" ? list.at(-1) : list[0])?.focus();
    pendingFocus.current = null;
  }, [open, items]);
  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || e.defaultPrevented) return;
    if (e.key === "Escape" && open) { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (!["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) return;
    e.preventDefault(); e.stopPropagation();
    pendingFocus.current = e.key === "ArrowUp" ? "last" : "first";
    setArrowKeyNavigation(true);
    if (open) { const list = items(); (pendingFocus.current === "last" ? list.at(-1) : list[0])?.focus(); }
    setOpen(true);
  };
  const handleContentKeyDown = (e: React.KeyboardEvent) => {
    if (e.defaultPrevented) return;
    if (e.key === "Tab") { close(); return; }
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); return; }
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLDivElement);
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
      e.preventDefault(); e.stopPropagation();
      const next = e.key === "Home" ? 0 : e.key === "End" ? list.length - 1 : (index + (e.key === "ArrowDown" ? 1 : -1) + list.length) % list.length;
      list[next]?.focus();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && e.key !== " ") {
      const ordered = [...list.slice(index + 1), ...list.slice(0, index + 1)];
      const match = ordered.find(item => item.textContent?.trim().toLocaleLowerCase().startsWith(e.key.toLocaleLowerCase()));
      if (match) { e.preventDefault(); match.focus(); }
    }
  };
  useEffect(() => {
    if (!open) return;
    const outside = (e: Event) => {
      if (triggerRef.current?.contains(e.target as Node) || contentRef.current?.contains(e.target as Node)) return;
      setOpen(false); setArrowKeyNavigation(false);
    };
    document.addEventListener("mousedown", outside);
    document.addEventListener("focusin", outside);
    return () => { document.removeEventListener("mousedown", outside); document.removeEventListener("focusin", outside); };
  }, [open]);
  return <ExDropdownCtx.Provider value={{ open: open && !disabled, setOpen, toggle, close, disabled, align, setAlign,
    menuId, triggerId, setMenuId, setTriggerId, arrowKeyNavigation, setArrowKeyNavigation,
    triggerRef, contentRef, setContentRef, registerMenuItem, unregisterMenuItem, menuItemsRef, handleTriggerKeyDown, handleContentKeyDown }}>{children}</ExDropdownCtx.Provider>;
}
