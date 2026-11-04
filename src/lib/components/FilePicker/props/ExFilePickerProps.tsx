import type { Ref } from "react";
import { FilePickerSize } from "../types/ExFilePickerType";

export interface ExSelectedFile {
  name: string;
  size?: number;
  type?: string;
  url?: string;
}

export interface ExFilePickerProps {
  id?: string;
  "aria-label"?: string;
  ref?: Ref<HTMLInputElement>;
  onChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  file?: File | ExSelectedFile | null;
  maxSize?: number;
  size?: FilePickerSize;
  onFileSelect?: (files: File[]) => void;
  onRemove?: () => void;
}
