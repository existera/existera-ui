import type { ExAvatarProps } from "../../Avatar/props/ExAvatarProps";

export interface ExProfilePictureProps extends Omit<ExAvatarProps, "size"> {
  disabled?: boolean;
  /** Open the profile photo in a modal without editing. Takes precedence over editOnly. */
  viewOnly?: boolean;
  /** Only allow choosing and cropping a photo, without a view action. */
  editOnly?: boolean;
  /** Called after saving a square PNG crop. previewURL is a persistent data URL. */
  onChange?: (file: File, previewURL: string) => void;
}
