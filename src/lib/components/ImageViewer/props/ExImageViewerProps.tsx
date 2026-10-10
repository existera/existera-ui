export interface ExImageViewerProps {
  name: string;
  url?: string;
  file?: File;
  onClose: () => void;
}
