import type { SuffixRadius, SuffixSize } from "../types/ExSuffixType";

export const SuffixSizeClass: Record<SuffixSize, string> = {
  xs: "items-center text-xs rounded-r-xs",
  sm: "items-center text-sm rounded-r-sm",
  md: "items-center text-md rounded-r-md",
  lg: "items-center text-lg rounded-r-lg",
};
export const SuffixTextareaSizeClass: Record<SuffixSize, string> = {
  xs: "items-start pt-[4px] text-xs rounded-r-xs",
  sm: "items-start pt-[4px] text-sm rounded-r-sm",
  md: "items-start pt-[4px] text-md rounded-r-md",
  lg: "items-start pt-[4px] text-lg rounded-r-lg",
};

export const SuffixRadiusSizeClass: Record<
  SuffixSize,
  Record<SuffixRadius, string>
> = {
  xs: {
    default: "px-2",
    full: "pr-2.5 pl-2 rounded-r-[var(--radius-full-xs)]",
  },
  sm: {
    default: "px-2",
    full: "pr-3 pl-2 rounded-r-[var(--radius-full-sm)]",
  },
  md: {
    default: "px-2",
    full: "pr-3.5 pl-2 rounded-r-[var(--radius-full-md)]",
  },
  lg: {
    default: "px-2",
    full: "pr-4 pl-2 rounded-r-[var(--radius-full-lg)]",
  },
};