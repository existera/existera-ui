"use client";

import { Delete } from "lucide-react";
import { cn } from "../../utils/Utils";
import { InputSizeClass } from "../Input/class/ExInputClass";

export interface ExNumpadProps {
  size?: "s" | "m" | "l";
  disabled?: boolean;
  onPress?: (value: string) => void;
  onBackspace?: () => void;
  className?: string;
  "aria-label"?: string;
}

const keySizes = {
  s: "size-10 text-lg",
  m: "size-12 text-xl",
  l: "size-14 text-2xl",
} as const;

const inputSizes = { s: "sm", m: "md", l: "lg" } as const;
const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace"];

export default function ExNumpad({
  size = "m",
  disabled = false,
  onPress,
  onBackspace,
  className,
  "aria-label": ariaLabel = "Number pad",
}: ExNumpadProps) {
  return (
    <div role="group" aria-label={ariaLabel} className={cn("grid w-fit flex-none grid-cols-3 gap-2", className)}>
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          disabled={disabled}
          aria-label={key === "backspace" ? "Backspace" : undefined}
          onClick={() => (key === "backspace" ? onBackspace?.() : onPress?.(key))}
          className={cn(
            "inline-flex shrink-0 items-center justify-center border border-border font-medium tabular-nums outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.28),inset_0_-1px_1px_rgba(255,255,255,0.035)]",
            "focus-visible:outline-2 focus-visible:outline-primary",
            InputSizeClass[inputSizes[size]].radius.default.default,
            keySizes[size],
            key === "0" && "col-start-2",
            disabled
              ? "cursor-not-allowed bg-surface-4 text-muted"
              : key === "backspace"
                ? "cursor-pointer bg-danger-soft text-danger hover:bg-danger-soft/80 active:bg-danger-soft/80"
                : "cursor-pointer bg-surface-2 text-foreground hover:bg-surface-3 active:bg-surface-4",
          )}>
          {key === "backspace" ? <Delete aria-hidden="true" className="text-danger size-[1em]" /> : key}
        </button>
      ))}
    </div>
  );
}
