import type { SwitchSize } from "../types/ExSwitchType";

export interface ExSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  className?: string;
}
