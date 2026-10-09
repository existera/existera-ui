import type { ExFormFieldProps } from "../../../types/Form";
import type { SwitchSize } from "../types/ExSwitchType";

export interface ExSwitchProps extends ExFormFieldProps<HTMLButtonElement> {
  id?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  className?: string;
}
