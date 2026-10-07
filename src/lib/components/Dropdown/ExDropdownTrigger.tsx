"use client";

import type { ReactNode } from "react";
import { useExDropdown } from "./ExDropdownProps";

export default function ExDropdownTrigger({ children, id }: { children: ReactNode; id?: string }) {
  const { toggle, triggerRef, handleTriggerKeyDown, open } = useExDropdown();

  return (
    <div
      ref={triggerRef}
      id={id}
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleTriggerKeyDown}
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls="dropdown-content"
      className="w-fit h-fit flex items-center">
      {children}
    </div>
  );
}
