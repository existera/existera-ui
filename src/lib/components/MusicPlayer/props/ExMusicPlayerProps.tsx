export interface ExMusicPlayerProps {
  name: string;
  url: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onClose: () => void;
}
