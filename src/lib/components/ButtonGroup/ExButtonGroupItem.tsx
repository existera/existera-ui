"use client";

import { cn } from "../../utils/Utils";
import {
  BaseClass,
  ButtonGroupLoadingClass,
  ButtonGroupPaddingClass,
  ButtonGroupSeparatorClass,
  ButtonGroupSizeItemClass,
  ButtonGroupVariantClass,
} from "./class/ExButtonGroupClass";
import type { ExButtonGroupItemProps } from "./props/ExButtonGroupItemProps";

export default function ExButtonGroupItem({
  id,
  color = "primary",
  variant = "solid",
  size = "md",
  loading = false,
  fit = true,
  iconOnly = false,
  leftIcon,
  rightIcon,
  disabled = false,
  children,
  ...props
}: ExButtonGroupItemProps) {
  return (
    <button
      {...props}
      id={id}
      type="button"
      disabled={disabled}
      className={cn(
        BaseClass,
        ButtonGroupVariantClass[color][variant],
        ButtonGroupSizeItemClass[size],
        ButtonGroupPaddingClass[size],
        "cursor-pointer border-r last:border-r-0",
        variant === "outline" ? ButtonGroupSeparatorClass[color] : "border-r-border/60 dark:border-r-border/40",
        fit ? "min-w-fit" : "w-full",
      )}>
      {loading && <span className={cn(ButtonGroupLoadingClass[size], "animate-spin rounded-full border-current/30 border-t-current")} />}
      {!loading && !iconOnly && leftIcon}
      {children}
      {!loading && !iconOnly && rightIcon}
    </button>
  );
}
