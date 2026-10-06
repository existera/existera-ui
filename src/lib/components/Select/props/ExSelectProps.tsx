import type { ReactNode } from "react";
import type {
  SelectRadius,
  SelectSize,
  SelectState,
} from "../types/ExSelectType";

export interface SelectOption {
  label: string;
  value: string;
}

export interface ExSelectProps {
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  selected?: SelectOption;
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
