import { createContext, useContext, type RefObject } from "react";

export type ExDropdownAlign = "left" | "center" | "right";

export type ExDropdownCtxType = {
  open: boolean;
  menuId: string;
  triggerId: string;
  setMenuId: (id: string) => void;
  setTriggerId: (id: string) => void;
  disabled: boolean;
  align: ExDropdownAlign;
  arrowKeyNavigation: boolean;
  triggerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  setContentRef: (el: HTMLDivElement | null) => void;
  toggle: () => void;
  close: () => void;
  setOpen: (v: boolean) => void;
  setAlign: (v: ExDropdownAlign) => void;
  setArrowKeyNavigation: (v: boolean) => void;
  registerMenuItem: (el: HTMLDivElement | null) => void;
  unregisterMenuItem: (el: HTMLDivElement | null) => void;
  menuItemsRef: React.MutableRefObject<Array<HTMLDivElement | null>>;
  handleTriggerKeyDown: (e: React.KeyboardEvent) => void;
  handleContentKeyDown: (e: React.KeyboardEvent) => void;
};

export const ExDropdownCtx = createContext<ExDropdownCtxType | null>(null);

export function useExDropdown() {
  const ctx = useContext(ExDropdownCtx);

  if (!ctx) {
    throw new Error("ExDropdown must be used inside provider");
  }

  return ctx;
}
