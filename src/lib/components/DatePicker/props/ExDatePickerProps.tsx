import type { ReactNode } from "react";
import type {
  DatePickerRadius,
  DatePickerSize,
  DatePickerState,
} from "../types/ExDatePickerType";

export interface ExDatePickerProps {
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  children?: ReactNode;
  debounce?: number;
  state?: DatePickerState;
  size?: DatePickerSize;
  radius?: DatePickerRadius;
  loading?: boolean;
  clearable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  format?: "DD-MM-YYYY" | "YYYY-MM-DD";
  disabledDate?: string[];
  startDate?: string;
  endDate?: string;
  onType?: (value: string) => void;
}
