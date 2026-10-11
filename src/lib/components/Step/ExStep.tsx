"use client";

import { useId } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "../../utils/Utils";
import { StepColorClass, StepSizeClass } from "./class/ExStepClass";
import type { ExStepProps } from "./props/ExStepProps";

export type { ExStepProps } from "./props/ExStepProps";
export type { ExStepItem } from "./types/ExStepType";

const progressTransition = {
  duration: 0.38,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function ExStep({
  steps = [],
  activeStep = 0,
  size = "md",
  color = "primary",
  orientation = "horizontal",
  onStepChange,
  className,
  style,
  "aria-label": label = "Progress steps",
  "aria-labelledby": labelledBy,
}: ExStepProps) {
  const instanceId = useId();
  const reducedMotion = useReducedMotion();

  if (!steps.length) return null;

  const current = Number.isFinite(activeStep) ? Math.max(0, Math.min(Math.trunc(activeStep), steps.length)) : 0;

  const sizes = StepSizeClass[size];
  const colors = StepColorClass[color];
  const horizontal = orientation === "horizontal";

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cn("w-full min-w-0 overflow-x-auto", className)}
        style={{ "--ex-step-marker": sizes.diameter, ...style } as CSSProperties}>
        <ol
          aria-label={labelledBy ? undefined : label}
          aria-labelledby={labelledBy}
          className={cn("m-0 w-full list-none p-1 text-foreground", horizontal ? "flex min-w-max" : "flex flex-col")}>
          {steps.map((step, index) => {
            const active = index === current;
            const error = Boolean(step.error);
            const completed = index < current && !error;
            const status = error ? "Needs attention" : completed ? "Completed" : active ? "In progress" : "Pending";

            const descriptionId = `${instanceId}-${index}-description`;
            const statusId = `${instanceId}-${index}-status`;

            const surfaceClass = cn(
              "relative flex w-full min-w-0 items-start rounded-md text-left",
              horizontal ? "flex-col gap-4 pr-6" : "gap-4",
            );

            const connectorClass = horizontal
              ? "left-[calc(var(--ex-step-marker)/2)] right-[calc(var(--ex-step-marker)/-2)] top-[calc(var(--ex-step-marker)/2)] h-0.5 -translate-y-1/2"
              : "bottom-0 left-[calc(var(--ex-step-marker)/2)] top-[var(--ex-step-marker)] w-0.5 -translate-x-1/2";

            const indicatorClass = cn(
              "relative z-10 inline-flex shrink-0 items-center justify-center rounded-full border-2 font-semibold",
              "transition-colors duration-200 motion-reduce:transition-none",
              sizes.indicator,
              error
                ? "border-danger bg-danger/10 text-danger"
                : completed
                  ? colors.completed
                  : active
                    ? colors.active
                    : "border-border bg-surface-2 text-muted",
            );

            const content = (
              <>
                <motion.span
                  className={indicatorClass}
                  initial={false}
                  animate={error && !reducedMotion ? { x: [0, -2, 2, -1, 1, 0] } : { x: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={error ? "error" : completed ? "completed" : "number"}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="inline-flex items-center justify-center">
                      {error ? (
                        <AlertCircle className="size-4.5" strokeWidth={2} />
                      ) : completed ? (
                        <CheckCircle className="size-4.5 text-white" strokeWidth={2.5} />
                      ) : (
                        index + 1
                      )}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>

                <span className={cn("block min-w-0 flex-1", horizontal && "max-w-64")}>
                  <span
                    id={statusId}
                    className={cn(
                      "mb-1.5 flex flex-wrap items-center gap-x-2 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-200",
                      error ? "text-danger" : active ? "text-foreground" : "text-muted",
                    )}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={status}
                        initial={reducedMotion ? false : { opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, y: -3 }}
                        transition={{ duration: 0.14 }}>
                        {status}
                      </motion.span>
                    </AnimatePresence>

                    {step.disabled && <span>Unavailable</span>}
                  </span>

                  <span
                    className={cn(
                      "block break-words font-semibold leading-snug transition-opacity duration-200",
                      sizes.title,
                      !active && !completed && !error && "opacity-70",
                    )}>
                    {step.title}
                  </span>

                  {step.description && (
                    <span
                      id={descriptionId}
                      className={cn(
                        "mt-0.5 block break-words leading-relaxed text-muted transition-opacity duration-200",
                        sizes.description,
                        !active && !error && "opacity-75",
                      )}>
                      {step.description}
                    </span>
                  )}
                </span>
              </>
            );

            return (
              <li
                key={step.id ?? index}
                aria-current={active ? "step" : undefined}
                className={cn("relative min-w-0", horizontal ? "min-w-40 flex-1" : "pb-7 last:pb-0")}>
                {index < steps.length - 1 && (
                  <span aria-hidden="true" className={cn("pointer-events-none absolute overflow-hidden bg-border", connectorClass)}>
                    <motion.span
                      className={cn("absolute inset-0", colors.connector)}
                      initial={false}
                      animate={{
                        scaleX: horizontal ? (completed ? 1 : 0) : 1,
                        scaleY: horizontal ? 1 : completed ? 1 : 0,
                      }}
                      style={{ transformOrigin: horizontal ? "left center" : "center top" }}
                      transition={reducedMotion ? { duration: 0 } : progressTransition}
                    />
                  </span>
                )}

                {onStepChange ? (
                  <button
                    type="button"
                    disabled={step.disabled}
                    aria-label={`Step ${index + 1}: ${step.title}`}
                    aria-describedby={[statusId, step.description ? descriptionId : undefined].filter(Boolean).join(" ")}
                    className={cn(
                      surfaceClass,
                      "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed",
                    )}
                    onClick={() => onStepChange(index, step)}>
                    {content}
                  </button>
                ) : (
                  <div className={surfaceClass}>{content}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </MotionConfig>
  );
}
