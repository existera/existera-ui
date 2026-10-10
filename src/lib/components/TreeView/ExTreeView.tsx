"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ExTreeViewContext } from "./context/ExTreeViewContext";
import type { ExTreeViewProps } from "./props/ExTreeViewProps";

function visibleItems(root: HTMLUListElement) {
  return Array.from(root.querySelectorAll<HTMLLIElement>('[role="treeitem"]')).filter(
    (item) => item.closest('[role="tree"]') === root && !item.closest("[hidden]"),
  );
}

export default function ExTreeView({
  size = "md",
  children,
  "aria-label": label = "Tree view",
  "aria-labelledby": labelledBy,
}: ExTreeViewProps) {
  const rootRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef({ text: "", time: 0 });
  const [selected, select] = useState<string | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let lastFocused: HTMLLIElement | null = null;
    let focusWithin = false;
    const sync = () => {
      const items = visibleItems(root);
      const active = items.find((item) => item === document.activeElement);
      const current = active ?? items.find((item) => item.tabIndex === 0) ?? items[0];
      root.querySelectorAll<HTMLLIElement>('[role="treeitem"]').forEach((item) => {
        if (item.closest('[role="tree"]') === root) item.tabIndex = item === current ? 0 : -1;
      });
      if (focusWithin && lastFocused && !items.includes(lastFocused)) {
        (current ?? root).focus();
      }
      root.tabIndex = items.length ? -1 : 0;
    };
    const onFocus = (event: FocusEvent) => {
      const item = event.target as HTMLLIElement;
      if (item.matches('[role="treeitem"]') && item.closest('[role="tree"]') === root) {
        lastFocused = item;
        focusWithin = true;
        sync();
      }
    };
    const onDocumentFocus = (event: FocusEvent) => {
      if (!root.contains(event.target as Node)) focusWithin = false;
    };
    const onBlur = (event: FocusEvent) => {
      if (event.relatedTarget && !root.contains(event.relatedTarget as Node)) focusWithin = false;
    };
    sync();
    root.addEventListener("focusin", onFocus);
    root.addEventListener("focusout", onBlur);
    document.addEventListener("focusin", onDocumentFocus);
    const observer = new MutationObserver(sync);
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
    return () => {
      observer.disconnect();
      root.removeEventListener("focusin", onFocus);
      root.removeEventListener("focusout", onBlur);
      document.removeEventListener("focusin", onDocumentFocus);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const root = event.currentTarget;
    const target = event.target as HTMLLIElement;
    if (target.closest('[role="tree"]') !== root || event.altKey || event.ctrlKey || event.metaKey) return;
    const items = visibleItems(root);
    const index = items.indexOf(target);
    if (index < 0) return;
    let next: HTMLLIElement | undefined;
    switch (event.key) {
      case "ArrowDown":
        next = items[Math.min(index + 1, items.length - 1)];
        break;
      case "ArrowUp":
        next = items[Math.max(index - 1, 0)];
        break;
      case "Home":
        next = items[0];
        break;
      case "End":
        next = items[items.length - 1];
        break;
      default: {
        if (event.key.length !== 1 || event.key === " ") return;
        const now = Date.now();
        const previous = searchRef.current;
        const text = (now - previous.time < 700 ? previous.text : "") + event.key.toLocaleLowerCase();
        searchRef.current = { text, time: now };
        const query = [...text].every((character) => character === text[0]) ? text[0] : text;
        next = [...items.slice(index + 1), ...items.slice(0, index + 1)].find((item) =>
          item.getAttribute("aria-label")?.toLocaleLowerCase().startsWith(query),
        );
      }
    }
    event.preventDefault();
    event.stopPropagation();
    next?.focus();
  };

  return (
    <ExTreeViewContext.Provider value={{ size, selected, select }}>
      <ul
        ref={rootRef}
        role="tree"
        aria-label={labelledBy ? undefined : label}
        aria-labelledby={labelledBy}
        onKeyDown={handleKeyDown}
        className="m-0 flex min-w-0 list-none flex-col gap-1 p-1 text-foreground">
        {children}
      </ul>
    </ExTreeViewContext.Provider>
  );
}
