import type { ButtonGroupColor, ButtonGroupRadius, ButtonGroupSize, ButtonGroupVariant } from "../types/ExButtonGroupType";

export const BaseClass = [
  "group/item relative isolate inline-flex min-w-0",
  "items-center justify-center select-none",
  "whitespace-nowrap text-center leading-none",
  "cursor-pointer outline-none",
  "transition-colors duration-150 ease-out",
  "focus-visible:z-10 focus-visible:ring-2",
  "focus-visible:ring-ring focus-visible:ring-inset",
  "disabled:pointer-events-none disabled:cursor-not-allowed",
  "disabled:opacity-50",
].join(" ");

export const ButtonGroupSizeClass: Record<ButtonGroupSize, string> = {
  xs: "gap-1 p-0.5 rounded-[calc(var(--radius-xs)+2px)]",
  sm: "gap-1 p-0.5 rounded-[calc(var(--radius-sm)+2px)]",
  md: "gap-1 p-1 rounded-[calc(var(--radius-md)+4px)]",
  lg: "gap-1 p-1 rounded-[calc(var(--radius-lg)+4px)]",
};

export const ButtonGroupSizeItemClass: Record<ButtonGroupSize, string> = {
  xs: ["h-xs text-xs leading-none", "gap-[var(--gap-x-xs)]", "px-[var(--padding-x-xs)]", "rounded-[var(--radius-xs)]"].join(" "),
  sm: ["h-sm text-sm leading-none", "gap-[var(--gap-x-sm)]", "px-[var(--padding-x-sm)]", "rounded-[var(--radius-sm)]"].join(" "),
  md: ["h-md text-md leading-none", "gap-[var(--gap-x-md)]", "px-[var(--padding-x-md)]", "rounded-[var(--radius-md)]"].join(" "),
  lg: ["h-lg text-lg leading-none", "gap-[var(--gap-x-lg)]", "px-[var(--padding-x-lg)]", "rounded-[var(--radius-lg)]"].join(" "),
};

export const ButtonGroupRadiusClass: Record<ButtonGroupRadius, string> = {
  default: "",
  full: "rounded-full",
};

export const ButtonGroupItemRadiusClass: Record<ButtonGroupRadius, string> = {
  default: "",
  full: "rounded-full",
};

export const ButtonGroupLoadingClass: Record<ButtonGroupSize, string> = {
  xs: "h-3.5 w-3.5 border-2",
  sm: "h-3.5 w-3.5 border-2",
  md: "h-4 w-4 border-2",
  lg: "h-4.5 w-4.5 border-3",
};

export const ButtonGroupActiveTextClass: Record<ButtonGroupColor, Record<ButtonGroupVariant, string>> = {
  primary: {
    solid: "text-white",
    soft: "text-primary",
    outline: "text-primary",
  },
  secondary: {
    solid: "text-foreground",
    soft: "text-foreground",
    outline: "text-foreground",
  },
  danger: {
    solid: "text-white",
    soft: "text-danger",
    outline: "text-danger",
  },
  success: {
    solid: "text-white",
    soft: "text-success",
    outline: "text-success",
  },
  warning: {
    solid: "text-white",
    soft: "text-warning",
    outline: "text-warning",
  },
};

export const ButtonGroupIndicatorClass: Record<ButtonGroupColor, Record<ButtonGroupVariant, string>> = {
  primary: {
    solid: "bg-primary",
    soft: "bg-primary-soft",
    outline: "border border-primary",
  },
  secondary: {
    solid: "bg-secondary",
    soft: "bg-secondary-soft",
    outline: "border border-secondary",
  },
  danger: {
    solid: "bg-danger",
    soft: "bg-danger-soft",
    outline: "border border-danger",
  },
  success: {
    solid: "bg-success",
    soft: "bg-success-soft",
    outline: "border border-success",
  },
  warning: {
    solid: "bg-warning",
    soft: "bg-warning-soft",
    outline: "border border-warning",
  },
};

export const ButtonGroupInactiveClass: Record<ButtonGroupColor, string> = {
  primary: ["bg-transparent text-primary", "hover:bg-primary-soft hover:text-primary"].join(" "),
  secondary: ["bg-transparent text-foreground", "hover:bg-secondary-soft hover:text-foreground"].join(" "),
  danger: ["bg-transparent text-danger", "hover:bg-danger-soft hover:text-danger"].join(" "),
  success: ["bg-transparent text-success", "hover:bg-success-soft hover:text-success"].join(" "),
  warning: ["bg-transparent text-warning", "hover:bg-warning-soft hover:text-warning"].join(" "),
};
