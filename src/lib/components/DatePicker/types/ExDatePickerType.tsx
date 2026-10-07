import type { Radius, Size, State } from "../../../types/Types";
import type Prefix from "../../Prefix/ExPrefix";
import type Suffix from "../../Suffix/ExSuffix";
import type { ExDatePickerProps } from "../props/ExDatePickerProps";

export type DatePickerState = State;
export type DatePickerSize = Size;
export type DatePickerRadius = Radius;

export type CompoundDatePicker = React.FC<ExDatePickerProps> & {
  Prefix: typeof Prefix;
  Suffix: typeof Suffix;
};

export type ContentStyle = {
  top: number;
  left: number;
  minWidth: number;
  visibility: "hidden" | "visible";
};
