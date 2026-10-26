import type { Size } from "../types/Types";

/** Shared border-box heights for single-line form controls and buttons. */
export const ControlSizeClass: Record<Size, string> = {
  xs: "h-[var(--height-xs)] min-h-[var(--height-xs)] text-xs leading-none",
  sm: "h-[var(--height-sm)] min-h-[var(--height-sm)] text-sm leading-none",
  md: "h-[var(--height-md)] min-h-[var(--height-md)] text-base leading-none",
  lg: "h-[var(--height-lg)] min-h-[var(--height-lg)] text-lg leading-none",
};

/** One textarea row fills the same height, excluding the wrapper's borders. */
export const TextareaLineClass: Record<Size, string> = {
  xs: "text-xs leading-[calc(var(--height-xs)-2px)]",
  sm: "text-sm leading-[calc(var(--height-sm)-2px)]",
  md: "text-base leading-[calc(var(--height-md)-2px)]",
  lg: "text-lg leading-[calc(var(--height-lg)-2px)]",
};
