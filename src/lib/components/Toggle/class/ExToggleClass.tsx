import type { ToggleRadius, ToggleSize } from "../types/ExToggleType";

export const ToggleBaseClass =
  "relative inline-flex items-center justify-center select-none overflow-hidden transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background leading-none hover:shadow-sm active:shadow-sm";

export const ToggleSizeClass: Record<ToggleSize, string> = {
  xs: "h-xs text-xs leading-none gap-[var(--gap-x-xs)] rounded-[var(--radius-xs)]",
  sm: "h-sm text-sm leading-none gap-[var(--gap-x-sm)] rounded-[var(--radius-sm)]",
  md: "h-md text-md leading-none gap-[var(--gap-x-md)] rounded-[var(--radius-md)]",
  lg: "h-lg text-base leading-none gap-[var(--gap-x-lg)] rounded-[var(--radius-lg)]",
};

export const TogglePaddingClass: Record<ToggleSize, string> = {
  xs: "px-[var(--padding-x-xs)]",
  sm: "px-[var(--padding-x-sm)]",
  md: "px-[var(--padding-x-md)]",
  lg: "px-[var(--padding-x-lg)]",
};

export const TogglePaddingRadiusFullClass: Record<ToggleSize, string> = {
  xs: "px-2.5",
  sm: "px-3",
  md: "px-3.5",
  lg: "px-4",
};

export const ToggleIconOnlyClass: Record<ToggleSize, string> = {
  xs: "h-xs w-[var(--height-xs)]",
  sm: "h-sm w-[var(--height-sm)]",
  md: "h-md w-[var(--height-md)]",
  lg: "h-lg w-[var(--height-lg)]",
};

export const ToggleLoadingClass: Record<ToggleSize, string> = {
  xs: "h-3.5 w-3.5 border-2",
  sm: "h-3.5 w-3.5 border-2",
  md: "h-4 w-4 border-2",
  lg: "h-4.5 w-4.5 border-3",
};

export const ToggleRadiusClass: Record<ToggleRadius, string> = {
  default: "",
  full: "rounded-full",
};
