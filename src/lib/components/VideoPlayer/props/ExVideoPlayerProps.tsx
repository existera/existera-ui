export interface ExVideoPlayerProps {
  name: string;
  url: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  onClose: () => void;
}
