export interface ExUploadProviderProps {
  uploadButton?: boolean;
  children: React.ReactNode;
  onFiles?: (files: File[]) => void;
}
