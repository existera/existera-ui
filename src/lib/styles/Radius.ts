import type { Size } from "../types/Types";

/** Shared default corners for every size; apply before structural corner overrides. */
export const RadiusSizeClass: Record<Size, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
};
