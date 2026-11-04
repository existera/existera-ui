import { cn } from "../../../utils/Utils";
import type { BadgeColor, BadgeRadius, BadgeSize } from "../types/ExBadgeType";

export const BadgeBaseClass = "inline-flex w-fit items-center justify-center whitespace-nowrap select-none font-medium leading-none";

export const BadgeColorClass = {
  primary: {
    text: "text-white",
    softText: "text-primary",
    bg: "bg-primary-solid",
    softBg: "bg-primary/20",
    border: "border-primary",
  },
  secondary: {
    text: "text-white",
    softText: "text-foreground",
    bg: "bg-secondary-solid",
    softBg: "bg-secondary/20",
    border: "border-secondary",
  },
  success: {
    text: "text-white",
    softText: "text-success",
    bg: "bg-success-solid",
    softBg: "bg-success/20",
    border: "border-success",
  },
  warning: {
    text: "text-white",
    softText: "text-warning",
    bg: "bg-warning-solid",
    softBg: "bg-warning/20",
    border: "border-warning",
  },
  danger: {
    text: "text-white",
    softText: "text-danger",
    bg: "bg-danger-solid",
    softBg: "bg-danger/20",
    border: "border-danger",
  },
} as const;

export const BadgeSizeClass: Record<BadgeSize, string> = {
  xs: "h-[16px] px-1 text-xs gap-1",
  sm: "h-[20px] px-1.5 text-xs gap-1",
  md: "h-[24px] px-2 text-sm gap-1",
  lg: "h-[28px] px-2.5 text-md gap-1.5",
};

export const BadgeDismissSizeClass: Record<BadgeSize, string> = {
  xs: "size-2",
  sm: "size-2.5",
  md: "size-3",
  lg: "size-3.5",
};

export const BadgeRadiusClass: Record<BadgeRadius, Record<BadgeSize, string>> = {
  default: {
    xs: "rounded-xs",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
  },
  full: {
    xs: "rounded-full",
    sm: "rounded-full",
    md: "rounded-full",
    lg: "rounded-full",
  },
} as const;

export const BadgeVariantClass = {
  solid: (color: BadgeColor) => cn(BadgeColorClass[color].bg, BadgeColorClass[color].text, "border border-transparent"),

  soft: (color: BadgeColor) => cn(BadgeColorClass[color].softBg, BadgeColorClass[color].softText, "border border-transparent"),

  outline: (color: BadgeColor) => cn("bg-transparent", BadgeColorClass[color].softText, BadgeColorClass[color].border, "border"),
} as const;
