const QUERY_KEYS = {
  // App registry (admin) + user-facing catalog
  ADMIN_APPS: "adminApps",
  ADMIN_APP_CATEGORIES: "adminAppCategories",
  APPS: "apps",
  FAVORITES: "favorites",
  // Contact
  ADMIN_CONTACT_LIST: "adminContactList",
  ADMIN_CONTACT_DETAIL: "adminContactDetail",
  // Entitlements
  ADMIN_USER: "adminUser",
  ADMIN_USERS: "adminUsers",
  ADMIN_ENTITLEMENTS: "adminEntitlements",
  // Users (admin list)
  ADMIN_USERS_LIST: "adminUsersList",
  // Login history
  ADMIN_LOGIN_HISTORY: "adminLoginHistory",
  ADMIN_LOGIN_HISTORY_DETAIL: "adminLoginHistoryDetail",
  LOGIN_HISTORY: "loginHistory",
  // Profile / session
  MY_PROFILE: "myProfile",
  TOKEN_REFRESH: "token-refresh",
  SESSION_BOOTSTRAP: "session-bootstrap",
  // Notifications
  NOTIFICATIONS: "notifications",
  NOTIFICATIONS_UNREAD_COUNT: "notificationsUnreadCount"
} as const;

export default QUERY_KEYS;
