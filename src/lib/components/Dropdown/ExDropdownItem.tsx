"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useExDropdown } from "./ExDropdownProps";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  onSelect?: () => void;
  disabled?: boolean;
  value?: string;
  id?: string;
};

export default function ExDropdownItem({
  children,
  onClick,
  onSelect,
  disabled = false,
  value,
  id,
}: Props) {
  const { registerMenuItem, unregisterMenuItem, close } =
    useExDropdown();

  const itemRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          close();
          onClick?.();
          onSelect?.();
        }
        break;
    }
  };

  const handleClick = () => {
    if (!disabled) {
      close();
      onClick?.();
      onSelect?.();
    }
  };

  useEffect(() => {
    const el = itemRef.current;
    if (el) {
      registerMenuItem(el as HTMLDivElement);
      return () => {
        unregisterMenuItem(el as HTMLDivElement);
      };
    }
  }, [id, registerMenuItem, unregisterMenuItem]);

  return (
    <div
      id={id}
      ref={itemRef}
      data-value={value}
      role="menuitem"
      aria-disabled={disabled || undefined}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className={`
        flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors
        focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${disabled ? "cursor-not-allowed opacity-50" : "hover:bg-surface-2"}
      `}
    >
      {children}
    </div>
  );
}