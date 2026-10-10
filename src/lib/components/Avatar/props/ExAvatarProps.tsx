import type { ReactNode } from "react";
import type {
  AvatarColor,
  AvatarEffect,
  AvatarSize,
  AvatarStatus,
  AvatarVariant,
} from "../types/ExAvatarType";

export interface ExAvatarProps {
  variant?: AvatarVariant;
  name?: string;
  imgURL?: string;
  icon?: ReactNode;
  size?: AvatarSize;
  status?: AvatarStatus;
  color?: AvatarColor;
  effect?: AvatarEffect;
  border?: boolean;
}
