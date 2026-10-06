export interface ExExplorerItemProps {
  id: string;
  name: string;
  type: string;
  hexColor?: string;
  url?: string;
  selected?: boolean;
  file?: File;
  onClick?: (id: string | File) => void;
  onRename?: (id: string) => void;
  onMove?: (id: string) => void;
  onShare?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
}
