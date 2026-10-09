import type { AriaAttributes, FocusEventHandler, Ref } from "react";

export interface ExFormFieldProps<T extends HTMLElement = HTMLInputElement> extends AriaAttributes {
  name?: string;
  form?: string;
  required?: boolean;
  readOnly?: boolean;
  ref?: Ref<T>;
  onFocus?: FocusEventHandler<T>;
  onBlur?: FocusEventHandler<T>;
}
