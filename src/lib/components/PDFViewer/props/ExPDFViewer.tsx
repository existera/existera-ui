export interface ExPDFViewerProps {
  name: string;
  url?: string;
  file?: File;
  onClose: () => void;
}
