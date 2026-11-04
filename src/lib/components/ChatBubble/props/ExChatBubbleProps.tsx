import type { Color } from "../../../types/Types";

export interface ExChatBubbleProps {
  /** Defaults to soft for outgoing messages and solid for incoming messages. */
  variant?: "solid" | "soft";
  color?: Color;
  position?: "left" | "right";
  size?: "xs" | "sm" | "md" | "lg";
  message?: string;
  media?: string;
  mediaAlt?: string;
  mediaType?: "image" | "video" | "file";
  timestamp?: string;
  avatar?: string;
  name?: string;
  status?: "sent" | "delivered" | "read";
  showAvatar?: boolean;
  showName?: boolean;
  showTimestamp?: boolean;
  showStatus?: boolean;
  className?: string;
}
