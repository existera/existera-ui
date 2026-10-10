import type { CodeBlockColor, CodeBlockSize } from "../types/ExCodeBlockTypes";

export const ColorCodeBlockStyles: Record<CodeBlockColor, string> = {
  default: "border-[var(--color-surface-4)]/40 bg-[var(--color-surface-4)]/40",
  primary: "border-[var(--color-primary)]/40 bg-[var(--color-primary)]/40",
  secondary:
    "border-[var(--color-secondary)]/40 bg-[var(--color-secondary)]/40",
  success: "border-[var(--color-success)]/40 bg-[var(--color-success)]/40",
  warning: "border-[var(--color-warning)]/40 bg-[var(--color-warning)]/40",
  danger: "border-[var(--color-danger)]/40 bg-[var(--color-danger)]/40",
};

export const ColorCodeBlockBodyStyles: Record<CodeBlockColor, string> = {
  default: "bg-[var(--color-surface-2)]",
  primary: "bg-[var(--color-primary-soft)]",
  secondary: "bg-[var(--color-secondary-soft)]",
  success: "bg-[var(--color-success-soft)]",
  warning: "bg-[var(--color-warning-soft)]",
  danger: "bg-[var(--color-danger-soft)]",
};

export const SizeCodeBlockClass: Record<
  CodeBlockSize,
  { fontSize: string; padding: string; headerPadding: string }
> = {
  xs: {
    fontSize: "11px",
    padding: "6px",
    headerPadding: "4px 8px",
  },
  sm: {
    fontSize: "12px",
    padding: "10px",
    headerPadding: "6px 10px",
  },
  md: {
    fontSize: "13px",
    padding: "14px",
    headerPadding: "8px 12px",
  },
  lg: {
    fontSize: "14px",
    padding: "18px",
    headerPadding: "10px 14px",
  },
};
