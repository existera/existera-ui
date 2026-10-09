"use client";
import { cloneElement, isValidElement, useEffect, type HTMLAttributes, type ReactNode } from "react";
import { useExDropdown } from "./ExDropdownProps";

export default function ExDropdownTrigger({ children, id }: { children: ReactNode; id?: string }) {
  const { toggle, triggerRef, handleTriggerKeyDown, open, disabled, menuId, triggerId, setTriggerId } = useExDropdown();
  const child = isValidElement<HTMLAttributes<HTMLElement> & { disabled?: boolean }>(children) &&
    (typeof children.type !== "string" || ["button", "a", "input"].includes(children.type)) ? children : null;
  const actualId = id ?? child?.props.id ?? triggerId;
  useEffect(() => { setTriggerId(actualId); }, [actualId, setTriggerId]);
  const semantics = { id: actualId, "aria-haspopup": "menu" as const, "aria-expanded": open, "aria-controls": open ? menuId : undefined, "aria-disabled": disabled || undefined };
  return <div ref={triggerRef} className="w-fit h-fit flex items-center"
    {...(!child ? semantics : {})} role={child ? undefined : "button"} tabIndex={child ? undefined : disabled ? -1 : 0}
    onClickCapture={e => { if (disabled) { e.preventDefault(); e.stopPropagation(); } }}
    onClick={e => { if (!e.defaultPrevented) toggle(); }} onKeyDown={handleTriggerKeyDown}>
    {child ? cloneElement(child, { ...semantics, ...(disabled ? { disabled: true, tabIndex: -1 } : {}), ...{ "data-dropdown-trigger": "" } }) : children}
  </div>;
}
