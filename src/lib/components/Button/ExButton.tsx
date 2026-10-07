"use client";

import { cn } from "../../utils/Utils";
import type { ExButtonProps } from "./props/ExButtonProps";

import {
  ButtonBaseClass,
  ButtonIconOnlyClass,
  ButtonLoadingClass,
  ButtonPaddingClass,
  ButtonPaddingRadiusFullClass,
  ButtonRadiusClass,
  ButtonSizeClass,
  ButtonVariantClass,
} from "./class/ExButtonClass";

const buttonTextAlignClass = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

export default function ExButton({
  id,
  variant = "solid",
  color = "primary",
  size = "md",
  textAlign = "center",
  type = "button",
  radius = "default",
  loading = false,
  fit = true,
  iconOnly = false,
  leftIcon,
  rightIcon,
  disabled = false,
  children,
  className,
  ...props
}: ExButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      id={id}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        className,
        ButtonBaseClass,
        ButtonSizeClass[size],
        iconOnly
          ? ButtonIconOnlyClass[size]
          : radius === "default"
            ? ButtonPaddingClass[size]
            : ButtonPaddingRadiusFullClass[size],
        ButtonVariantClass[variant](color),
        ButtonRadiusClass[radius],
        fit ? "min-w-fit" : "w-full",
        !iconOnly && buttonTextAlignClass[textAlign],
        isDisabled
          ? "cursor-not-allowed opacity-70 pointer-events-none"
          : "cursor-pointer hover:scale-[1.01] active:scale-[0.98]",
      )}
    >
      {loading && (
        <span
          className={cn(
            ButtonLoadingClass[size],
            "animate-spin rounded-full border-current/30 border-t-current",
          )}
        />
      )}

      {!loading && !iconOnly && leftIcon}

      {children}

      {!loading && !iconOnly && rightIcon}
    </button>
  );
}
