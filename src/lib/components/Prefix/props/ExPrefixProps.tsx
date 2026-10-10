import type { PrefixRadius, PrefixSize } from "../types/ExPrefixType";

export interface ExPrefixProps {
  textarea?: boolean;
  size?: PrefixSize;
  radius?: PrefixRadius;
  children: React.ReactNode;
}
