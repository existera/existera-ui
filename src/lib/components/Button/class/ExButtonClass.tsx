import { cn } from "../../../utils/Utils";
import type { ButtonColor, ButtonRadius, ButtonSize } from "../types/ExButtonType";

export const ButtonBaseClass =
  "relative inline-flex items-center justify-center select-none overflow-hidden transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background leading-none";

export const ButtonSizeClass: Record<ButtonSize, string> = {
  xs: "h-xs text-xs leading-none gap-[var(--gap-x-xs)] rounded-[var(--radius-xs)]",
  sm: "h-sm text-sm leading-none gap-[var(--gap-x-sm)] rounded-[var(--radius-sm)]",
  md: "h-md text-md leading-none gap-[var(--gap-x-md)] rounded-[var(--radius-md)]",
  lg: "h-lg text-lg leading-none gap-[var(--gap-x-lg)] rounded-[var(--radius-lg)]",
};

export const ButtonPaddingClass: Record<ButtonSize, string> = {
  xs: "px-[var(--padding-x-xs)]",
  sm: "px-[var(--padding-x-sm)]",
  md: "px-[var(--padding-x-md)]",
  lg: "px-[var(--padding-x-lg)]",
};

export const ButtonCounterSizeClass: Record<ButtonSize, string> = {
  xs: "h-4 min-w-4 px-0.5 text-[10px]",
  sm: "h-4.5 min-w-4.5 px-0.5 text-[11px]",
  md: "h-5 min-w-5 px-1 text-xs",
  lg: "h-6 min-w-6 px-1 text-sm",
};

export const ButtonPaddingRadiusFullClass: Record<ButtonSize, string> = {
  xs: "px-2.5",
  sm: "px-3",
  md: "px-3.5",
  lg: "px-4",
};

export const ButtonIconOnlyClass: Record<ButtonSize, string> = {
  xs: "h-xs w-[var(--height-xs)]",
  sm: "h-sm w-[var(--height-sm)]",
  md: "h-md w-[var(--height-md)]",
  lg: "h-lg w-[var(--height-lg)]",
};

export const ButtonLoadingClass: Record<ButtonSize, string> = {
  xs: "h-3.5 w-3.5 border-2",
  sm: "h-3.5 w-3.5 border-2",
  md: "h-4 w-4 border-2",
  lg: "h-4.5 w-4.5 border-3",
};

export const ButtonRadiusClass: Record<ButtonRadius, string> = {
  default: "",
  full: "rounded-full",
};

export const ButtonColorTokens: Record<
  ButtonColor,
  {
    solidBg: string;
    solidText: string;
    softBg: string;
    softText: string;
    border: string;
    hoverSoft: string;
    hoverSolid: string;
  }
> = {
  primary: {
    solidBg: "bg-primary",
    solidText: "text-white",
    softBg: "bg-primary/25 dark:bg-primary/30",
    softText: "text-primary",
    border: "border-primary",
    hoverSoft: "hover:bg-primary/25 active:bg-primary/30 dark:hover:bg-primary/25 dark:active:bg-primary/30",
    hoverSolid: "hover:opacity-90 active:opacity-80",
  },

  secondary: {
    solidBg: "bg-secondary",
    solidText: "",
    softBg: "bg-secondary/25 dark:bg-secondary/30",
    softText: "",
    border: "border-secondary/70",
    hoverSoft: "hover:bg-secondary/25 active:bg-secondary/30 dark:hover:bg-secondary/25 dark:active:bg-secondary/30",
    hoverSolid: "hover:opacity-90 active:opacity-80",
  },

  success: {
    solidBg: "bg-success",
    solidText: "text-white",
    softBg: "bg-success/25 dark:bg-success/30",
    softText: "text-success",
    border: "border-success",
    hoverSoft: "hover:bg-success/25 active:bg-success/30 dark:hover:bg-success/25 dark:active:bg-success/30",
    hoverSolid: "hover:opacity-90 active:opacity-80",
  },

  warning: {
    solidBg: "bg-warning",
    solidText: "text-white",
    softBg: "bg-warning/25 dark:bg-warning/30",
    softText: "text-warning",
    border: "border-warning",
    hoverSoft: "hover:bg-warning/25 active:bg-warning/30 dark:hover:bg-warning/25 dark:active:bg-warning/30",
    hoverSolid: "hover:opacity-90 active:opacity-80",
  },

  danger: {
    solidBg: "bg-danger",
    solidText: "text-white",
    softBg: "bg-danger/25 dark:bg-danger/30",
    softText: "text-danger",
    border: "border-danger",
    hoverSoft: "hover:bg-danger/25 active:bg-danger/30 dark:hover:bg-danger/25 dark:active:bg-danger/30",
    hoverSolid: "hover:opacity-90 active:opacity-80",
  },
};

export const ButtonVariantClass = {
  solid: (color: ButtonColor) =>
    cn(
      ButtonColorTokens[color].solidBg,
      ButtonColorTokens[color].solidText,
      ButtonColorTokens[color].hoverSolid,
      "border border-transparent",
    ),

  soft: (color: ButtonColor) =>
    cn(ButtonColorTokens[color].softBg, ButtonColorTokens[color].softText, ButtonColorTokens[color].hoverSoft, "border border-transparent"),

  outline: (color: ButtonColor) => cn("bg-transparent", ButtonColorTokens[color].softText, ButtonColorTokens[color].border, "border"),

  text: (color: ButtonColor) =>
    cn("bg-transparent", ButtonColorTokens[color].softText, ButtonColorTokens[color].hoverSoft, "border border-transparent"),
};
