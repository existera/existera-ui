import { cn } from "../../../utils/Utils";
import type { AlertColor, AlertColorConfig, AlertPadding, AlertSize, AlertVariant } from "../types/ExAlertType";

export const AlertBaseClass = "relative flex w-full items-start rounded-none border-l-2 transition-colors";

export const AlertPaddingClass: Record<AlertPadding, string> = {
  s: "px-2.5 py-1.5",
  m: "px-3 py-2",
  l: "px-4 py-3",
};

export const AlertSizeClass: Record<
  AlertSize,
  {
    wrap: string;
    icon: string;
    title: string;
    close: string;
    pr: string;
  }
> = {
  xs: {
    wrap: "gap-2 text-xs leading-5",
    icon: "mt-0.5 size-3.5 [&>svg]:size-3.5",
    title: "text-xs leading-5",
    close: "size-5",
    pr: "",
  },
  sm: {
    wrap: "gap-2 text-xs leading-5",
    icon: "mt-0.5 size-4 [&>svg]:size-4",
    title: "text-xs leading-5",
    close: "size-5",
    pr: "",
  },
  md: {
    wrap: "gap-2.5 text-sm leading-6",
    icon: "mt-1 size-4 [&>svg]:size-4",
    title: "text-sm leading-6",
    close: "size-6",
    pr: "",
  },
  lg: {
    wrap: "gap-3 text-base leading-7",
    icon: "mt-1 size-5 [&>svg]:size-5",
    title: "text-base leading-7",
    close: "size-7",
    pr: "",
  },
};

export const AlertColorClass: Record<AlertColor, AlertColorConfig> = {
  primary: {
    textOnFilled: "text-white",
    textOnSoft: "text-primary",
    bgFilled: "bg-primary-solid",
    bgSoft: "bg-primary/[0.045] dark:bg-primary/[0.08]",
    ring: "focus-visible:ring-primary",
  },
  secondary: {
    textOnFilled: "text-secondary-foreground",
    textOnSoft: "text-secondary-foreground",
    bgFilled: "bg-secondary-solid",
    bgSoft: "bg-secondary/[0.045] dark:bg-secondary/[0.08]",
    ring: "focus-visible:ring-secondary",
  },
  success: {
    textOnFilled: "text-white",
    textOnSoft: "text-success",
    bgFilled: "bg-success-solid",
    bgSoft: "bg-success/[0.045] dark:bg-success/[0.08]",
    ring: "focus-visible:ring-success",
  },
  warning: {
    textOnFilled: "text-white",
    textOnSoft: "text-warning",
    bgFilled: "bg-warning-solid",
    bgSoft: "bg-warning/[0.045] dark:bg-warning/[0.08]",
    ring: "focus-visible:ring-warning",
  },
  danger: {
    textOnFilled: "text-white",
    textOnSoft: "text-danger",
    bgFilled: "bg-danger-solid",
    bgSoft: "bg-danger/[0.045] dark:bg-danger/[0.08]",
    ring: "focus-visible:ring-danger",
  },
};

export const AlertVariantClass = {
  solid: (c: AlertColorConfig) => cn(c.bgFilled, c.textOnFilled, "border-black/15 dark:border-white/20"),
  soft: (c: AlertColorConfig) => cn(c.bgSoft, c.textOnSoft),
} satisfies Record<AlertVariant, (config: AlertColorConfig) => string>;

export const AlertCloseButtonClass =
  "-mr-1 inline-flex shrink-0 items-center justify-center rounded-none opacity-60 hover:cursor-pointer transition-colors hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2";

export const AlertAccentClass: Record<AlertColor, string> = {
  primary: "border-primary/50",
  secondary: "border-secondary-foreground/30",
  success: "border-success/50",
  warning: "border-warning/50",
  danger: "border-danger/50",
};
