export interface ExMentionUser {
  id: string;
  username: string;
  name: string;
  avatar?: string;
}

export type MentionTarget = HTMLInputElement | HTMLTextAreaElement;

export interface MentionState {
  element: MentionTarget;
  query: string;
  start: number;
  end: number;
}

export interface PopupPosition {
  top: number;
  left: number;
  width: number;
}
