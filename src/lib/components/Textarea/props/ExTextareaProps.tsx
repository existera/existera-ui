import type { ReactNode } from "react";
import type {
  TextareaRadius,
  TextareaSize,
  TextareaState,
} from "../types/ExTextareaType";

export interface ExTextareaProps {
  id?: string;
  children?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  debounce?: number;
  state?: TextareaState;
  size?: TextareaSize;
  radius?: TextareaRadius;
  loading?: boolean;
  clearable?: boolean;
  autoResize?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onType?: (value: string) => void;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  maxLength?: number;
  inputMode?: "text" | "search" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
  autoComplete?: "on" | "off" | "name" | "organization" | "street-address" | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1" | "country" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "impp" | "url" | "photo" | "off" | "one-time-code";
  className?: string;
}
