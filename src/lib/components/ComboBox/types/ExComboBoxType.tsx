import type { Radius, Size, State } from "../../../types/Types";
import type Prefix from "../../Prefix/ExPrefix";
import type Suffix from "../../Suffix/ExSuffix";
import type { ExComboBoxProps } from "../props/ExComboBoxProps";

export type ComboBoxSize = Size;
export type ComboBoxRadius = Radius;
export type ComboBoxState = State;

export type CompoundComboBox = {
  <T = string>(props: ExComboBoxProps<T>): React.ReactElement | null;

  Prefix: typeof Prefix;
  Suffix: typeof Suffix;
};
