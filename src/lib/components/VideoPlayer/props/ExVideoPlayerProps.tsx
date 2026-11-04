export interface ExVideoTrack {
  src: string;
  srcLang: string;
  label: string;
  default?: boolean;
}

export interface ExVideoPlayerProps {
  name: string;
  url: string;
  autoPlay?: boolean;
  /** Show Existera's custom controls. Native video controls are never enabled. */
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  /** WebVTT subtitle tracks. Cross-origin tracks require appropriate CORS headers. */
  tracks?: ExVideoTrack[];
  crossOrigin?: "anonymous" | "use-credentials";
  onClose: () => void;
  onRestore?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onBufferingChange?: (buffering: boolean) => void;
  onError?: (message: string) => void;
}
