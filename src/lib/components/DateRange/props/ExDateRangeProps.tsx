import type { ReactNode } from "react";
import type {
  DateRangeRadius,
  DateRangeSize,
  DateRangeState,
} from "../types/ExDateRangeType";

export interface ExDateRangeProps {
  id?: string;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
  disabled?: boolean;
  endPlaceholder?: string;
  startDateValue?: string;
  endDateValue?: string;
  children?: ReactNode;
  debounce?: number;
  state?: DateRangeState;
  size?: DateRangeSize;
  radius?: DateRangeRadius;
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
