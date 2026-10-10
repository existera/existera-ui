import type { ExFormFieldProps } from "../../../types/Form";
import { ReactNode } from "react";

export interface ExInputRangeProps extends ExFormFieldProps<HTMLDivElement> {
  id?: string;
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
