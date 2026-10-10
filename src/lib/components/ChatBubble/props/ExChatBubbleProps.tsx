export interface ExChatBubbleProps {
  position?: "left" | "right";
  size?: "xs" | "sm" | "md" | "lg";
  message?: string;
  media?: string;
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
