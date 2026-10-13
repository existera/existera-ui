import type { ExMentionUser } from "../types/ExMentionType";

export interface ExMentionProps {
  users?: ExMentionUser[];
  onSearch?: (query: string) => Promise<ExMentionUser[]> | ExMentionUser[];
  onSelect?: (user: ExMentionUser, element: HTMLInputElement | HTMLTextAreaElement) => void;
  minQueryLength?: number;
  debounce?: number;
  maxResults?: number;
  className?: string;
}
