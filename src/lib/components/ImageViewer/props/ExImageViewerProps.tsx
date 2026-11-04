export interface ExImageViewerProps {
  name: string;
  /** Describe the image content when its file name is not a useful alternative. */
  alt?: string;
  url?: string;
  file?: File;
  onClose: () => void;
}
