export interface ExCheckboxProps {
  label?: string;
  description?: string;
  error?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  radius?: "default" | "full";
  size?: "xs" | "sm" | "md" | "lg";
  onChecked?: (checked: boolean) => void;
}
