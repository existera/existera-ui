import type { PrefixRadius, PrefixSize } from "../types/ExPrefixType";

export const PrefixSizeClass: Record<PrefixSize, string> = {
  xs: "items-center h-stretch text-xs rounded-l-[var(--radius-pre-suffix-xs)]",
  sm: "items-center h-stretch text-sm rounded-l-[var(--radius-pre-suffix-sm)]",
  md: "items-center h-stretch text-md rounded-l-[var(--radius-pre-suffix-md)]",
  lg: "items-center h-stretch text-lg rounded-l-[var(--radius-pre-suffix-lg)]",
};

export const PrefixTextareaSizeClass: Record<PrefixSize, string> = {
  xs: "items-start pt-[4px] text-xs rounded-l-[var(--radius-pre-suffix-xs)]",
  sm: "items-start pt-[4px] text-sm rounded-l-[var(--radius-pre-suffix-sm)]",
  md: "items-start pt-[4px] text-md rounded-l-[var(--radius-pre-suffix-md)]",
  lg: "items-start pt-[4px] text-lg rounded-l-[var(--radius-pre-suffix-lg)]",
};

export const PrefixRadiusSizeClass: Record<
  PrefixSize,
  Record<PrefixRadius, string>
> = {
  xs: {
    default: "px-2",
    full: "pl-2.5 pr-2 rounded-l-[var(--radius-full-xs)]",
  },
  sm: {
    default: "px-2",
    full: "pl-3 pr-2 rounded-l-[var(--radius-full-sm)]",
  },
  md: {
    default: "px-2",
    full: "pl-3.5 pr-2 rounded-l-[var(--radius-full-md)]",
  },
  lg: {
    default: "px-2",
    full: "pl-4 pr-2 rounded-l-[var(--radius-full-lg)]",
  },
};
