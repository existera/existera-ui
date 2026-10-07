import { cn } from "../../../utils/Utils";
import type {
  AlertColor,
  AlertColorConfig,
  AlertSize,
  AlertVariant,
} from "../types/ExAlertType";

export const AlertBaseClass =
  "relative flex w-full transition-colors";

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
    wrap: "gap-1.5 p-2 text-xs rounded-sm",
    icon: "size-3",
    title: "text-sm gap-1",
    close: "top-1 right-1 size-5",
    pr: "pr-7",
  },
  sm: {
    wrap: "gap-2 p-2.5 text-sm rounded-md",
    icon: "size-4",
    title: "text-md gap-1",
    close: "top-1.5 right-1.5 size-6",
    pr: "pr-8",
  },
  md: {
    wrap: "gap-2 p-3 text-md rounded-lg",
    icon: "size-5",
    title: "text-lg gap-1",
    close: "top-2 right-2 size-7",
    pr: "pr-10",
  },
  lg: {
    wrap: "gap-3 p-4 text-lg rounded-xl",
    icon: "size-6",
    title: "text-xl gap-1.5",
    close: "top-2.5 right-2.5 size-8",
    pr: "pr-11",
  },
};

export const AlertColorClass: Record<AlertColor, AlertColorConfig> = {
  primary: {
    textOnFilled: "text-white",
    textOnSoft: "text-primary",
    bgFilled: "bg-primary",
    bgSoft: "bg-primary-soft",
    ring: "focus-visible:ring-primary",
  },
  secondary: {
    textOnFilled: "text-secondary-foreground",
    textOnSoft: "text-secondary-foreground",
    bgFilled: "bg-secondary",
    bgSoft: "bg-secondary-soft",
    ring: "focus-visible:ring-secondary",
  },
  success: {
    textOnFilled: "text-white",
    textOnSoft: "text-success",
    bgFilled: "bg-success",
    bgSoft: "bg-success-soft",
    ring: "focus-visible:ring-success",
  },
  warning: {
    textOnFilled: "text-white",
    textOnSoft: "text-warning",
    bgFilled: "bg-warning",
    bgSoft: "bg-warning-soft",
    ring: "focus-visible:ring-warning",
  },
  danger: {
    textOnFilled: "text-white",
    textOnSoft: "text-danger",
    bgFilled: "bg-danger",
    bgSoft: "bg-danger-soft",
    ring: "focus-visible:ring-danger",
  },
};

export const AlertVariantClass = {
  solid: (c: AlertColorConfig) => cn(c.bgFilled, c.textOnFilled),
  soft: (c: AlertColorConfig) =>
    cn(c.bgSoft, c.textOnSoft, "border-l-4 border-current"),
} satisfies Record<AlertVariant, (config: AlertColorConfig) => string>;

export const AlertCloseButtonClass =
  "absolute inline-flex items-center justify-center rounded-md hover:cursor-pointer transition hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
