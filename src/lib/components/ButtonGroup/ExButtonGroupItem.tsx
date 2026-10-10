"use client";

import { useContext } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/Utils";

import {
  BaseClass,
  ButtonGroupActiveTextClass,
  ButtonGroupIndicatorClass,
  ButtonGroupInactiveClass,
  ButtonGroupItemRadiusClass,
  ButtonGroupLoadingClass,
  ButtonGroupSizeItemClass,
} from "./class/ExButtonGroupClass";

import type { ExButtonGroupItemProps } from "./props/ExButtonGroupItemProps";
import { ExButtonGroupContext } from "./ExButtonGroupContext";

export default function ExButtonGroupItem({
  color = "primary",
  variant = "solid",
  size = "md",
  loading = false,
  iconOnly = false,
  leftIcon,
  rightIcon,
  disabled = false,
  children,
  value,
  active,
  className,
  onClick,
  type = "button",
  ...props
}: ExButtonGroupItemProps) {
  const group = useContext(ExButtonGroupContext);
  const reduceMotion = useReducedMotion();

  const itemColor = group?.color ?? color;
  const itemVariant = group?.variant ?? variant;
  const itemSize = group?.size ?? size;
  const itemFit = group?.fit;
  const itemRadius = group?.radius ?? "default";

  const selectable = group !== null && value !== undefined;
  const isActive = selectable ? group.value === value : active;
  const unavailable = disabled || loading || Boolean(group?.disabled);

  const widthClass = itemFit
    ? "flex-none"
    : group?.responsive === "scroll"
      ? "min-w-max flex-1 basis-0"
      : group?.responsive === "stack"
        ? "w-full flex-none sm:w-auto sm:flex-1 sm:basis-0"
        : "min-w-0 flex-1 basis-auto";

  const stateClass = isActive ? ButtonGroupActiveTextClass[itemColor][itemVariant] : ButtonGroupInactiveClass[itemColor];

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (unavailable) return;

    onClick?.(event);

    if (!event.defaultPrevented && group && value !== undefined) {
      group.select(value);
    }
  };

  return (
    <button
      {...props}
      type={type}
      value={value}
      disabled={unavailable}
      data-button-group-item=""
      data-active={isActive === true}
      aria-pressed={isActive ?? props["aria-pressed"]}
      aria-busy={loading || undefined}
      onClick={handleClick}
      className={cn(
        BaseClass,
        ButtonGroupSizeItemClass[itemSize],
        ButtonGroupItemRadiusClass[itemRadius],
        widthClass,
        stateClass,
        className,
      )}>
      {isActive && (
        <motion.span
          aria-hidden="true"
          layoutId={selectable ? "button-group-indicator" : undefined}
          initial={false}
          transition={{
            layout: reduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 500,
                  damping: 40,
                  mass: 0.8,
                },
          }}
          className={cn(
            "pointer-events-none absolute inset-0 z-0",
            "rounded-[inherit] transition-colors duration-150",
            ButtonGroupIndicatorClass[itemColor][itemVariant],
          )}
        />
      )}

      {loading && (
        <span
          aria-hidden="true"
          className={cn(
            "relative z-10 shrink-0 animate-spin rounded-full",
            "border-current/25 border-t-current",
            ButtonGroupLoadingClass[itemSize],
          )}
        />
      )}

      {!loading && !iconOnly && leftIcon && (
        <span aria-hidden="true" className="relative z-10 shrink-0">
          {leftIcon}
        </span>
      )}

      {children && <span className="relative z-10 min-w-0 truncate text-center">{children}</span>}

      {!loading && !iconOnly && rightIcon && (
        <span aria-hidden="true" className="relative z-10 shrink-0">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
