import { ReactNode } from "react";

export interface ExInputRangeProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  showLabels?: boolean;
  labels?: ReactNode[];
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  onChange?: (value: number) => void;
  thumbContent?: ReactNode;
  className?: string;
}
