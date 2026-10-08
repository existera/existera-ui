import type { ReactNode, SelectHTMLAttributes } from "react";
import type {
  SelectRadius,
  SelectSize,
  SelectState,
} from "../types/ExSelectType";

export interface SelectOption {
  label: string;
  value: string;
}

export interface ExSelectProps extends Pick<SelectHTMLAttributes<HTMLSelectElement>,
  "name" | "required" | "autoComplete" | "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid"
> {
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Controlled selection. Pass null (or an explicit undefined) to clear. */
  selected?: SelectOption | null;
  /** Initial selection when selected is omitted. */
  defaultSelected?: SelectOption | null;
  /** Called for user changes and clear actions; null means no selection. */
  onChange?: (option: SelectOption | null) => void;
  option?: SelectOption[];
  children?: ReactNode;
  state?: SelectState;
  size?: SelectSize;
  radius?: SelectRadius;
  loading?: boolean;
  clearable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  textAlign?: "left" | "center" | "right";
}
