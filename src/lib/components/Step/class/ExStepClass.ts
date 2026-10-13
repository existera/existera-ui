import type { ExStepColor, ExStepSize } from "../types/ExStepType";

export const StepSizeClass: Record<ExStepSize, { diameter: string; indicator: string; title: string; description: string }> = {
  xs: { diameter: "24px", indicator: "size-6 text-xs", title: "text-xs", description: "text-[10px]" },
  sm: { diameter: "32px", indicator: "size-8 text-xs", title: "text-sm", description: "text-[11px]" },
  md: { diameter: "40px", indicator: "size-10 text-sm", title: "text-sm", description: "text-xs" },
  lg: { diameter: "48px", indicator: "size-12 text-base", title: "text-base", description: "text-[13px]" },
};

export const StepColorClass: Record<ExStepColor, { completed: string; active: string; connector: string }> = {
  primary: {
    completed: "border-primary bg-primary text-white",
    active: "border-primary bg-surface text-primary ring-primary/15",
    connector: "bg-primary",
  },
  secondary: {
    completed: "border-foreground bg-foreground text-white dark:text-black",
    active: "border-foreground bg-surface text-foreground ring-foreground/10",
    connector: "bg-foreground",
  },
  success: {
    completed: "border-success bg-success text-white",
    active: "border-success bg-surface text-success ring-success/15",
    connector: "bg-success",
  },
  warning: {
    completed: "border-warning bg-warning text-white",
    active: "border-warning bg-surface text-warning ring-warning/15",
    connector: "bg-warning",
  },
  danger: {
    completed: "border-danger bg-danger text-white",
    active: "border-danger bg-surface text-danger ring-danger/15",
    connector: "bg-danger",
  },
};
