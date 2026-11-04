export function formatVideoTime(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const total = Math.floor(value);
  const seconds = String(total % 60).padStart(2, "0");
  const minutes = Math.floor(total / 60) % 60;
  const hours = Math.floor(total / 3600);
  return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${seconds}` : `${minutes}:${seconds}`;
}

export function getBufferedSegments(ranges: TimeRanges, duration: number): { start: number; end: number }[] {
  if (!Number.isFinite(duration) || duration <= 0) return [];
  return Array.from({ length: ranges.length }, (_, index) => ({
    start: Math.max(0, Math.min(100, (ranges.start(index) / duration) * 100)),
    end: Math.max(0, Math.min(100, (ranges.end(index) / duration) * 100)),
  }));
}

export function getVideoError(code?: number): string {
  switch (code) {
    case 1:
      return "Video loading was interrupted. Please try again.";
    case 2:
      return "A network error interrupted the video. Check your connection and retry.";
    case 3:
      return "This video could not be decoded. Try another file or format.";
    case 4:
      return "This video format is not supported, or the source is unavailable.";
    default:
      return "Unable to load this video. Check the source and try again.";
  }
}
