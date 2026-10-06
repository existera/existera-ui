import type { ButtonGroupColor, ButtonGroupRadius, ButtonGroupSize, ButtonGroupVariant } from "../types/ExButtonGroupType";

export const BaseClass =
  "relative inline-flex items-center justify-center select-none overflow-hidden transition-colors duration-150 ease-out focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background leading-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

export const ButtonGroupVariantClass: Record<ButtonGroupColor, Record<ButtonGroupVariant, string>> = {
  primary: {
    solid: "bg-primary text-white hover:bg-primary/90 active:bg-primary/80 disabled:hover:bg-primary",
    soft: "bg-primary/20 text-primary hover:bg-primary/25 active:bg-primary/30 dark:bg-primary/25 dark:hover:bg-primary/30 dark:active:bg-primary/35",
    outline:
      "bg-background text-primary hover:bg-primary/10 active:bg-primary/15 dark:bg-background dark:hover:bg-primary/15 dark:active:bg-primary/20",
  },

  secondary: {
    solid: "bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80 disabled:hover:bg-secondary",
    soft: "bg-secondary/20 text-secondary hover:bg-secondary/25 active:bg-secondary/30 dark:bg-secondary/25 dark:hover:bg-secondary/30 dark:active:bg-secondary/35",
    outline:
      "bg-background text-secondary hover:bg-secondary/10 active:bg-secondary/15 dark:bg-background dark:hover:bg-secondary/15 dark:active:bg-secondary/20",
  },

  danger: {
    solid: "bg-danger text-white hover:bg-danger/90 active:bg-danger/80 disabled:hover:bg-danger",
    soft: "bg-danger/20 text-danger hover:bg-danger/25 active:bg-danger/30 dark:bg-danger/25 dark:hover:bg-danger/30 dark:active:bg-danger/35",
    outline:
      "bg-background text-danger hover:bg-danger/10 active:bg-danger/15 dark:bg-background dark:hover:bg-danger/15 dark:active:bg-danger/20",
  },

  success: {
    solid: "bg-success text-white hover:bg-success/90 active:bg-success/80 disabled:hover:bg-success",
    soft: "bg-success/20 text-success hover:bg-success/25 active:bg-success/30 dark:bg-success/25 dark:hover:bg-success/30 dark:active:bg-success/35",
    outline:
      "bg-background text-success hover:bg-success/10 active:bg-success/15 dark:bg-background dark:hover:bg-success/15 dark:active:bg-success/20",
  },

  warning: {
    solid: "bg-warning text-white hover:bg-warning/90 active:bg-warning/80 disabled:hover:bg-warning",
    soft: "bg-warning/20 text-warning hover:bg-warning/25 active:bg-warning/30 dark:bg-warning/25 dark:hover:bg-warning/30 dark:active:bg-warning/35",
    outline:
      "bg-background text-warning hover:bg-warning/10 active:bg-warning/15 dark:bg-background dark:hover:bg-warning/15 dark:active:bg-warning/20",
  },
};

export const ButtonGroupSizeClass: Record<ButtonGroupSize, string> = {
  xs: "rounded-[var(--radius-xs)]",
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
};

export const ButtonGroupSizeItemClass: Record<ButtonGroupSize, string> = {
  xs: "h-xs text-xs leading-none gap-[var(--gap-x-xs)]",
  sm: "h-sm text-sm leading-none gap-[var(--gap-x-sm)]",
  md: "h-md text-md leading-none gap-[var(--gap-x-md)]",
  lg: "h-lg text-base leading-none gap-[var(--gap-x-lg)]",
};

export const ButtonGroupPaddingClass: Record<ButtonGroupSize, string> = {
  xs: "px-[var(--padding-x-xs)]",
  sm: "px-[var(--padding-x-sm)]",
  md: "px-[var(--padding-x-md)]",
  lg: "px-[var(--padding-x-lg)]",
};

export const ButtogGroupRadiusClass: Record<ButtonGroupRadius, string> = {
  default: "",
  full: "rounded-full",
};

export const ButtonGroupLoadingClass: Record<ButtonGroupSize, string> = {
  xs: "h-3.5 w-3.5 border-2",
  sm: "h-3.5 w-3.5 border-2",
  md: "h-4 w-4 border-2",
  lg: "h-4.5 w-4.5 border-3",
};

export const ButtonGroupOutlineClass: Record<ButtonGroupColor, string> = {
  primary: "border border-primary",
  secondary: "border border-secondary",
  danger: "border border-danger",
  success: "border border-success",
  warning: "border border-warning",
};

export const ButtonGroupSeparatorClass: Record<ButtonGroupColor, string> = {
  primary: "border-r-primary",
  secondary: "border-r-secondary",
  danger: "border-r-danger",
  success: "border-r-success",
  warning: "border-r-warning",
};
