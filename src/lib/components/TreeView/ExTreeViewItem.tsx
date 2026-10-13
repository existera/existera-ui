"use client";

import { Children, useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Archive,
  ChevronRight,
  Database,
  File,
  FileCode,
  FileImage,
  FileText,
  Folder,
  Globe,
  Layers,
  Move,
  Package,
  Settings,
  SquarePen,
  Trash2,
} from "lucide-react";
import type { ReactNode } from "react";
import ExButton from "../Button/ExButton";
import { cn } from "../../utils/Utils";
import { useTreeView } from "./context/ExTreeViewContext";
import { TreeViewSizeClass, TreeViewTotalSizeClass } from "./class/ExTreeViewClass";
import type { ExTreeViewItemProps } from "./props/ExTreeViewItemProps";

// Render icon keys locally; never put React elements in callback data.
const itemIcons = new Map<string, ReactNode>([
  ["folder", <Folder />],
  ["file", <File />],
  ["file-text", <FileText />],
  ["file-code", <FileCode />],
  ["file-image", <FileImage />],
  ["archive", <Archive />],
  ["database", <Database />],
  ["globe", <Globe />],
  ["layers", <Layers />],
  ["package", <Package />],
  ["settings", <Settings />],
]);

export default function ExTreeViewItem({
  id,
  name,
  icon,
  total,
  children,
  onClick,
  onEdit,
  onMove,
  onDelete,
  "aria-label": ariaLabel,
}: ExTreeViewItemProps) {
  const generatedId = useId();
  const { size, selected, select } = useTreeView();
  const [open, setOpen] = useState(false);
  const branch = Children.toArray(children).length > 0;
  const label = ariaLabel?.trim() || name?.trim() || "Unnamed item";
  const totalId = `${generatedId}-total`;
  const itemId = id ?? generatedId;
  const renderedIcon = icon ? (itemIcons.get(icon) ?? <File />) : null;
  const menuId = `${generatedId}-menu`;
  const itemRef = useRef<HTMLLIElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState({ open: false, x: 0, y: 0 });
  const closeMenu = useCallback((restoreFocus = true) => {
    if (restoreFocus) itemRef.current?.focus();
    setMenu((previous) => ({ ...previous, open: false }));
  }, []);

  const openMenu = (x: number, y: number) => {
    itemRef.current?.focus();
    select(generatedId);
    setMenu({ open: true, x, y });
  };

  useEffect(() => {
    if (!menu.open) return;
    const element = menuRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    element.style.left = `${Math.max(8, Math.min(menu.x, window.innerWidth - bounds.width - 8))}px`;
    element.style.top = `${Math.max(8, Math.min(menu.y, window.innerHeight - bounds.height - 8))}px`;
    element.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus();

    const dismissOutside = (event: Event) => {
      if (!element.contains(event.target as Node)) closeMenu(false);
    };
    const dismissOnViewportChange = (event: Event) => {
      if (event.type === "scroll" && element.contains(event.target as Node)) return;
      closeMenu(element.contains(document.activeElement));
    };
    document.addEventListener("pointerdown", dismissOutside, true);
    document.addEventListener("contextmenu", dismissOutside, true);
    document.addEventListener("focusin", dismissOutside);
    window.addEventListener("resize", dismissOnViewportChange);
    window.addEventListener("scroll", dismissOnViewportChange, true);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside, true);
      document.removeEventListener("contextmenu", dismissOutside, true);
      document.removeEventListener("focusin", dismissOutside);
      window.removeEventListener("resize", dismissOnViewportChange);
      window.removeEventListener("scroll", dismissOnViewportChange, true);
    };
  }, [menu.open, menu.x, menu.y, closeMenu]);

  const actions = [
    { name: "Edit", callback: onEdit, icon: <SquarePen size={12} aria-hidden="true" /> },
    { name: "Move", callback: onMove, icon: <Move size={12} aria-hidden="true" /> },
    { name: "Delete", callback: onDelete, icon: <Trash2 size={12} aria-hidden="true" /> },
  ];

  return (
    <li
      ref={itemRef}
      id={itemId}
      role="treeitem"
      tabIndex={-1}
      aria-label={label}
      aria-describedby={total != null ? totalId : undefined}
      aria-expanded={branch ? open : undefined}
      aria-selected={selected === generatedId}
      aria-haspopup="menu"
      aria-controls={menu.open ? menuId : undefined}
      className="min-w-0 list-none outline-none [&:focus-visible>div]:outline-2 [&:focus-visible>div]:outline-offset-2 [&:focus-visible>div]:outline-foreground"
      onClick={(event) => {
        event.stopPropagation();
        event.currentTarget.focus();
        onClick?.({ id: itemId, name: name ?? null, icon: icon ?? null });
        select(generatedId);
        if (branch) setOpen((value) => !value);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
        openMenu(event.clientX, event.clientY);
      }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
        const item = event.currentTarget;
        if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) {
          event.preventDefault();
          event.stopPropagation();
          const bounds = item.firstElementChild?.getBoundingClientRect() ?? item.getBoundingClientRect();
          openMenu(bounds.left, bounds.bottom);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          event.stopPropagation();
          if (branch && !open) setOpen(true);
          else if (branch) item.querySelector<HTMLLIElement>('[role="group"] > [role="treeitem"]')?.focus();
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          event.stopPropagation();
          if (branch && open) setOpen(false);
          else item.parentElement?.closest<HTMLLIElement>('[role="treeitem"]')?.focus();
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          item.click();
        }
      }}>
      <div
        className={cn(
          "flex min-w-0 cursor-pointer items-center rounded-md hover:bg-surface-2",
          TreeViewSizeClass[size],
          selected === generatedId && "bg-surface-3 font-semibold",
        )}>
        <span aria-hidden="true" className="flex size-4 shrink-0 items-center">
          {branch && <ChevronRight className={cn("size-4 transition-transform motion-reduce:transition-none", open && "rotate-90")} />}
        </span>
        {renderedIcon && (
          <span aria-hidden="true" className="flex size-4 shrink-0 items-center [&>svg]:size-full">
            {renderedIcon}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate" title={name?.trim() || "Unnamed item"}>
          {name?.trim() || "Unnamed item"}
        </span>
        {total != null && (
          <span
            id={totalId}
            className={cn(
              "inline-grid aspect-square shrink-0 place-items-center rounded-full bg-surface-4 font-medium leading-none text-foreground tabular-nums",
              TreeViewTotalSizeClass[size],
            )}>
            <span className="sr-only">Total: </span>
            {total}
          </span>
        )}
      </div>
      {branch && (
        <ul role="group" hidden={!open} className="my-1 ml-4 list-none space-y-1 border-l border-border pl-3">
          {children}
        </ul>
      )}
      {menu.open &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={`${label} actions`}
            className={cn(
              "fixed z-99999",
              "w-30 grid gap-1",
              "overflow-y-auto",
              "rounded-lg border border-border",
              "bg-surface",
              "shadow-xl",
              "p-1",
            )}
            style={{ left: menu.x, top: menu.y, maxWidth: "calc(100vw - 16px)", maxHeight: "calc(100vh - 16px)" }}
            onClick={(event) => event.stopPropagation()}
            onContextMenu={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onKeyDown={(event) => {
              event.stopPropagation();
              const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]'));
              const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
              if (event.key === "Escape" || event.key === "Tab") {
                if (event.key === "Escape") event.preventDefault();
                closeMenu();
              } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? buttons.length - 1
                      : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
                buttons[next]?.focus();
              } else if (event.key.length === 1 && event.key !== " " && !event.ctrlKey && !event.altKey && !event.metaKey) {
                const match = buttons.find((button) => button.textContent?.toLowerCase().startsWith(event.key.toLowerCase()));
                if (match) {
                  event.preventDefault();
                  match.focus();
                }
              }
            }}>
            {actions.map((action) => (
              <ExButton
                key={action.name}
                type="button"
                role="menuitem"
                tabIndex={-1}
                aria-disabled={!action.callback}
                variant="text"
                size="xs"
                fit={false}
                textAlign="between"
                color={action.name === "Delete" ? "danger" : "secondary"}
                className={cn("min-h-6 focus-visible:outline-2 focus-visible:outline-foreground focus-visible:-outline-offset-2")}
                rightIcon={action.icon}
                onClick={(event) => {
                  event.stopPropagation();
                  closeMenu();
                  action.callback?.({ id: itemId, name: name ?? null, icon: icon ?? null });
                }}>
                {action.name}
              </ExButton>
            ))}
          </div>,
          document.body,
        )}
    </li>
  );
}
