export type NotificationListTabValue = "unread" | "read";

export type NotificationPanelTab = "all" | "unread";

export type ApiNotificationType =
  | "LOGIN_ANOMALY"
  | "ACCOUNT_LOCKED"
  | "APP_AVAILABLE"
  | "ENTITLEMENT_GRANTED"
  | "ENTITLEMENT_REVOKED"
  | "PASSWORD_CHANGED"
  | "SYSTEM_ANNOUNCEMENT";

export interface ApiNotification {
  id: string;
  type: ApiNotificationType;
  title: string;
  message: string;
  meta: Record<string, unknown> | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface NotificationListResponse {
  items: ApiNotification[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface NotificationListParams {
  page?: number;
  limit?: number;
  isRead?: boolean;
}
