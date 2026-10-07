import type { SuffixRadius, SuffixSize } from "../types/ExSuffixType";

export interface ESuffixProps {
  textarea?: boolean;
  size?: SuffixSize;
  radius?: SuffixRadius;
  children: React.ReactNode;
}
