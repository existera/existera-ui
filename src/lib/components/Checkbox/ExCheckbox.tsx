"use client";

import { useNativeField } from "../../hooks/useNativeField";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { forwardRef, useEffect, useId, useState } from "react";

import { cn } from "../../utils/Utils";
import type { ExCheckboxProps } from "./props/ExCheckboxProps";
import { sizeMap } from "./class/ExCheckboxClass";

const ExCheckbox = forwardRef<HTMLInputElement, ExCheckboxProps>(
  (
    {
      label,
      description,
      error,
      checked,
      defaultChecked = false,
      indeterminate = false,
      disabled = false,
      size = "md",
      radius = "default",
      onChecked,
      onChange,
      readOnly = false,
      ...nativeProps
    },
    ref,
  ) => {

    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    const isActive = isChecked || indeterminate;

    const inputRef = useNativeField<HTMLInputElement>(ref, element => {
      const next = isControlled ? checked : defaultChecked;
      if (!isControlled) setInternalChecked(next);
      element.checked = next;
    });
    const fieldId = useId();
    const descriptionId = description ? fieldId + "-description" : undefined;
    const errorId = error ? fieldId + "-error" : undefined;
    const describedBy = [nativeProps["aria-describedby"], descriptionId, errorId].filter(Boolean).join(" ") || undefined;

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, inputRef]);

    const handleChange = () => {
      if (disabled || readOnly) return;
      const value = !isChecked;
      if (!isControlled) {
        setInternalChecked(value);
      }
      (onChange ?? onChecked)?.(value);
    };

    const styles = sizeMap[size];

    return (
      <label className={cn("group flex items-start select-none gap-2", disabled ? "cursor-not-allowed opacity-55" : "cursor-pointer")}>
        <span className={cn("relative flex shrink-0 items-center justify-center", styles.box)}>
          <input
            {...nativeProps}
            readOnly={readOnly}
            aria-describedby={describedBy}
            aria-invalid={nativeProps["aria-invalid"] ?? Boolean(error)}
            ref={inputRef}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />

          <motion.span
            className={cn(
              styles.box,
              "flex items-center justify-center border",
              "bg-surface",
              "transition-[border-color,background-color,box-shadow,transform]",
              "duration-150 ease-out",
              radius === "default" ? "rounded-xs" : "rounded-full",
              "border-secondary",
              error && "border-danger",
              !disabled && !error && "group-hover:border-primary/70",
              "peer-focus-visible:ring-2",
              error ? "peer-focus-visible:ring-danger/25" : "peer-focus-visible:ring-primary/25",
              "peer-focus-visible:ring-offset-1",
              "peer-focus-visible:ring-offset-background",
              isActive &&
                !error && [
                  "border-primary",
                  "bg-primary/10",
                  "shadow-[0_0_0_2px_rgba(59,130,246,0.12)]",
                  "dark:bg-primary/15",
                  "dark:shadow-[0_0_0_2px_rgba(59,130,246,0.22),0_0_8px_rgba(59,130,246,0.14)]",
                ],
              error && [
                "border-danger",

                isActive && [
                  "bg-danger/10",
                  "shadow-[0_0_0_2px_rgba(239,68,68,0.12)]",
                  "dark:bg-danger/15",
                  "dark:shadow-[0_0_0_2px_rgba(239,68,68,0.22),0_0_8px_rgba(239,68,68,0.14)]",
                ],
              ],
              !disabled && "active:scale-95",
            )}>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.span
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                  }}
                  className="flex items-center justify-center">
                  {indeterminate ? (
                    <Minus size={styles.icon} strokeWidth={2.5} className={error ? "text-danger" : "text-primary"} />
                  ) : (
                    <Check size={styles.icon} strokeWidth={2.5} className={error ? "text-danger" : "text-primary"} />
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        </span>
        {(label || description || error) && (
          <span className="min-w-0 flex-1">
            {label && (
              <span className={cn("block leading-tight", styles.text, "font-medium", error ? "text-danger" : "text-foreground")}>
                {label}
              </span>
            )}
            {description && <span id={descriptionId} className="mt-1 block text-xs leading-relaxed text-muted">{description}</span>}
            {error && <span id={errorId} className="mt-1 block text-xs leading-relaxed text-danger">{error}</span>}
          </span>
        )}
      </label>
    );
  },
);

ExCheckbox.displayName = "ExCheckbox";

export default ExCheckbox;
