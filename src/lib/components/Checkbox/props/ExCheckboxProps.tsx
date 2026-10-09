import type { ExFormFieldProps } from "../../../types/Form";
export interface ExCheckboxProps extends ExFormFieldProps<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  id?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  radius?: "default" | "full";
  size?: "xs" | "sm" | "md" | "lg";
  onChecked?: (checked: boolean) => void;
}
