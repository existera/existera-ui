import type { ReactNode } from "react";
import type { ExInputType, InputRadius, InputSize, InputState } from "../types/ExInputType";

export interface ExInputProps {
  id?: string;
  type?: ExInputType;
  placeholder?: string;
  value?: string;
  children?: ReactNode;
  state?: InputState;
  disabled?: boolean;
  size?: InputSize;
  radius?: InputRadius;
  loading?: boolean;
  clearable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  debounce?: number;
  onType?: (value: string) => void;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  maxLength?: number;
  inputMode?: "text" | "search" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
  autoComplete?: "on" | "off" | "name" | "organization" | "street-address" | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1" | "country" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "impp" | "url" | "photo" | "off" | "one-time-code";
  className?: string;
  textAlign?: "left" | "center" | "right";
}
