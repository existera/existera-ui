"use client";

import { forwardRef } from "react";
import { Check } from "lucide-react";

import type { ExComboBoxItemProps } from "./props/ExComboBoxItemProps";
import { cn } from "../../utils/Utils";
import { ComboBoxItemSizeClass } from "./class/ExComboBoxItemClass";

const ExComboBoxItem = forwardRef<HTMLButtonElement, ExComboBoxItemProps<unknown>>(
  ({ value, label, size = "md", children, selected = false, active = false, disabled = false, onSelect }, ref) => {
    return (
      <button
        role="option"
        ref={ref}
        type="button"
        disabled={disabled}
        tabIndex={-1}
        aria-selected={selected}
        aria-disabled={disabled}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onClick={() => {
          if (disabled) return;
          onSelect?.(value, label);
        }}
        className={cn(
          ComboBoxItemSizeClass[size],
          "flex w-full items-center px-3 py-1.5 text-left outline-none transition-colors border-b border-border last:border-b-0",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-surface-2",
          selected && "bg-surface-2 font-semibold",
          active && !disabled && "bg-surface-2",
          !selected && !active && "font-normal",
        )}>
        <div className="flex w-full items-center gap-2">
          {selected && <Check size={16} className="shrink-0" />}
          <div className="flex-1">{children ?? label}</div>
        </div>
      </button>
    );
  },
);

ExComboBoxItem.displayName = "ExComboBoxItem";

export default ExComboBoxItem;
