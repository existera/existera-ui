"use client";
import type { ExFormFieldProps } from "../../types/Form";

import { useNativeField } from "../../hooks/useNativeField";

import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useEffect, useId, useState } from "react";
import clsx from "clsx";

export interface ExRadioProps extends ExFormFieldProps<HTMLInputElement> {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  error?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  onChecked?: (checked: boolean) => void;
}

const sizeMap = {
  xs: {
    box: "h-3.5 w-3.5",
    dot: "h-1.5 w-1.5",
    text: "text-xs",
    gap: "gap-1.5",
  },
  sm: {
    box: "h-4 w-4",
    dot: "h-1.5 w-1.5",
    text: "text-sm",
    gap: "gap-1.5",
  },
  md: {
    box: "h-5 w-5",
    dot: "h-2 w-2",
    text: "text-md",
    gap: "gap-2",
  },
  lg: {
    box: "h-6 w-6",
    dot: "h-2.5 w-2.5",
    text: "text-lg",
    gap: "gap-2",
  },
};

const ExRadio = forwardRef<HTMLInputElement, ExRadioProps>(
  ({ label, description, error, checked, defaultChecked = false, disabled = false, size = "md", onChecked, onChange, readOnly = false, ...nativeProps }, ref) => {


    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

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
      const element = inputRef.current;
      if (!element || isControlled || !element.name) return;
      const syncGroup = (event: Event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement && !target.readOnly && target.type === "radio" &&
          target.name === element.name && target.form === element.form && target.getRootNode() === element.getRootNode()) {
          setInternalChecked(target === element);
        }
      };
      element.ownerDocument.addEventListener("change", syncGroup, true);
      element.ownerDocument.addEventListener("click", syncGroup, true);
      return () => {
        element.ownerDocument.removeEventListener("change", syncGroup, true);
        element.ownerDocument.removeEventListener("click", syncGroup, true);
      };
    });

    const handleChange = () => {
      if (disabled || readOnly) return;

      if (!isControlled) {
        setInternalChecked(true);
      }

      (onChange ?? onChecked)?.(true);
    };

    const styles = sizeMap[size];

    return (
      <label
        className={clsx("group flex select-none items-start", styles.gap, disabled ? "cursor-not-allowed opacity-55" : "cursor-pointer")}>
        {/* Radio control */}
        <span className={clsx("relative flex shrink-0 items-center justify-center", styles.box)}>
          <input
            {...nativeProps}
            readOnly={readOnly}
            onClick={event => { if (readOnly) event.preventDefault(); }}
            aria-describedby={describedBy}
            aria-invalid={nativeProps["aria-invalid"] ?? Boolean(error)}
            ref={inputRef}
            type="radio"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />

          <motion.span
            className={clsx(
              styles.box,
              "flex items-center justify-center rounded-full border bg-surface",
              "transition-[border-color,background-color,box-shadow,transform]",
              "duration-150 ease-out",
              error ? "border-danger" : "border-secondary",
              !disabled && "group-hover:border-primary/70",
              "peer-focus-visible:ring-2",
              "peer-focus-visible:ring-primary/25",
              "peer-focus-visible:ring-offset-1",
              "peer-focus-visible:ring-offset-background",
              isChecked && [
                "border-primary",
                "bg-primary/10",
                "shadow-[0_0_0_2px_rgba(59,130,246,0.12)]",
                "dark:bg-primary/15",
                "dark:shadow-[0_0_0_2px_rgba(59,130,246,0.22),0_0_8px_rgba(59,130,246,0.14)]",
              ],
              isChecked &&
                error && [
                  "border-danger",
                  "bg-danger/10",
                  "shadow-[0_0_0_2px_rgba(239,68,68,0.12)]",
                  "dark:bg-danger/15",
                  "dark:shadow-[0_0_0_2px_rgba(239,68,68,0.22),0_0_8px_rgba(239,68,68,0.14)]",
                ],

              // Pressed
              !disabled && "active:scale-95",
            )}>
            <AnimatePresence initial={false}>
              {isChecked && (
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
                  className={clsx(
                    styles.dot,
                    "rounded-full bg-primary",
                    "shadow-[0_0_4px_rgba(59,130,246,0.35)]",
                    "dark:shadow-[0_0_6px_rgba(59,130,246,0.45)]",
                  )}
                />
              )}
            </AnimatePresence>
          </motion.span>
        </span>

        {/* Content */}
        {(label || description || error) && (
          <span className="min-w-0 flex-1">
            {label && (
              <span className={clsx("block leading-tight", styles.text, "font-medium", error ? "text-danger" : "text-foreground")}>
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

ExRadio.displayName = "ExRadio";

export default ExRadio;
