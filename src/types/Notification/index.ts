export type NotificationKind = "comment" | "invite" | "system" | "alert";

export interface NotificationAvatarInitials {
  kind: "initials";
  initials: string;
  gradientClass: string;
}

export interface NotificationAvatarSystem {
  kind: "system";
  bgClass: string;
}

export type NotificationAvatar =
  | NotificationAvatarInitials
  | NotificationAvatarSystem;

export type NotificationListTabValue = "unread" | "read";

export type NotificationPanelTab = "all" | "unread" | "mentions";

export interface AppNotification {
  id: string;
  type: NotificationKind;
  avatar: NotificationAvatar;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}
