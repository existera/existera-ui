import type { Radius, Size, State } from "../../../types/Types";
import type { ExTimeSelectorProps } from "../props/ExTimeSelectorProps";
import type Prefix from "../../Prefix/ExPrefix";
import type Suffix from "../../Suffix/ExSuffix";

export type TimeSelectorSize = Size;
export type TimeSelectorRadius = Radius;
export type TimeSelectorState = State;

export type CompoundTimeSelector = React.FC<ExTimeSelectorProps> & {
  Prefix: typeof Prefix;
  Suffix: typeof Suffix;
};
