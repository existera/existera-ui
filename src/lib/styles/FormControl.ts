import type { State } from "../types/Types";

/** One flat surface and one focus boundary, including attached prefix/suffix. */
export const FormControlBaseClass =
  "flex w-full items-center border bg-field text-foreground shadow-none transition-colors duration-150 motion-reduce:transition-none focus-within:outline-2 focus-within:-outline-offset-2 [&_input:focus-visible]:shadow-none [&_textarea:focus-visible]:shadow-none [&_select:focus-visible]:shadow-none [&_input]:placeholder:text-muted [&_textarea]:placeholder:text-muted";

export const FormControlDisabledClass =
  "cursor-not-allowed select-none border-border bg-surface-2 text-muted";

export const FormControlStateClass: Record<State, string> = {
  default: "border-field-border hover:border-field-hover focus-within:border-field-focus focus-within:outline-field-focus",
  error: "border-danger hover:border-danger focus-within:border-field-focus-danger focus-within:outline-field-focus-danger",
  success: "border-success hover:border-success focus-within:border-field-focus-success focus-within:outline-field-focus-success",
};
