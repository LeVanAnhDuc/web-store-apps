export type NotificationKind = "comment" | "invite" | "system" | "alert";

export interface NotificationAvatarInitials {
  kind: "initials";
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface NotificationAvatarSystem {
  kind: "system";
  bgColor: string;
}

export type NotificationAvatar =
  | NotificationAvatarInitials
  | NotificationAvatarSystem;

export interface AppNotification {
  id: string;
  type: NotificationKind;
  avatar: NotificationAvatar;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}
