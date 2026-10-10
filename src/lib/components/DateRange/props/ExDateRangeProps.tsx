import type { Ref } from "react";
import type { ExFormFieldProps } from "../../../types/Form";
import type { ReactNode } from "react";
import type {
  DateRangeRadius,
  DateRangeSize,
  DateRangeState,
} from "../types/ExDateRangeType";

export interface ExDateRangeValue { startDate: string; endDate: string; }

export interface ExDateRangeProps extends ExFormFieldProps<HTMLInputElement> {
  value?: ExDateRangeValue;
  defaultValue?: ExDateRangeValue;
  startName?: string;
  endName?: string;
  endRef?: Ref<HTMLInputElement>;
  id?: string;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
  disabled?: boolean;
  endPlaceholder?: string;
  startDateValue?: string;
  endDateValue?: string;
  onChange?: (range: ExDateRangeValue) => void;
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
