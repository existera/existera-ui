import type {
  LinkColor,
  LinkSize,
  LinkUnderline,
  LinkWeight,
} from "../types/ExLinkType";

export const LinkBaseClass =
  "inline-flex items-center gap-1 w-fit transition-all duration-200 outline-none underline-offset-4 decoration-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export const LinkColorClass: Record<LinkColor, string> = {
  default: "",
  primary: "text-primary",
  secondary: "text-secondary",
  danger: "text-danger",
  success: "text-success",
  warning: "text-warning",
};

export const LinkSizeClass: Record<LinkSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const LinkWeightClass: Record<LinkWeight, string> = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

export const LinkUnderlineClass: Record<LinkUnderline, string> = {
  none: "no-underline",
  hover: "no-underline hover:underline",
  always: "underline",
};
