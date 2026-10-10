export interface ExUploadContextValue {
  isDragging: boolean;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}
