import type {
  AvatarSize,
  AvatarStatus,
  AvatarColor,
  AvatarEffect,
  AvatarVariant,
} from "../types/ExAvatarType";

export const AvatarSizeClass: Record<
  AvatarSize,
  { container: string; status: string }
> = {
  xs: {
    container: "size-6 text-[10px] [&_svg]:size-3",
    status: "size-2",
  },
  sm: {
    container: "size-7 text-xs [&_svg]:size-3.5",
    status: "size-2.5",
  },
  md: {
    container: "size-8 text-sm [&_svg]:size-4",
    status: "size-3",
  },
  lg: {
    container: "size-10 text-base [&_svg]:size-5",
    status: "size-3.5",
  },
};

export const AvatarStatusClass: Record<AvatarStatus, string> = {
  none: "",
  offline: "bg-secondary",
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-danger",
};

export const AvatarColorClass: Record<
  AvatarColor,
  Record<AvatarVariant, string>
> = {
  primary: {
    solid: "text-white bg-primary",
    soft: "text-primary bg-primary/25",
  },
  secondary: {
    solid: "text-white bg-secondary",
    soft: "text-secondary bg-secondary/25",
  },
  danger: {
    solid: "text-white bg-danger",
    soft: "text-danger bg-danger/25",
  },
  success: {
    solid: "text-white bg-success",
    soft: "text-success bg-success/25",
  },
  warning: {
    solid: "text-white bg-warning",
    soft: "text-warning bg-warning/25",
  },
};

export const AvatarEffectClass: Record<AvatarEffect, string> = {
  default: "",
  bw: "grayscale",
} as const;
