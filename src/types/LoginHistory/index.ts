export type LoginHistoryStatus = "success" | "failed";
export type LoginHistoryMethod =
  | "password"
  | "otp"
  | "magic-link"
  | "forgot-password";
export type LoginHistoryDeviceType =
  | "DESKTOP"
  | "MOBILE"
  | "TABLET"
  | "UNKNOWN";
type DeviceType = LoginHistoryDeviceType;
type ClientType = "WEB" | "MOBILE_IOS" | "MOBILE_ANDROID";
export type DateRangePreset = "today" | "7d" | "30d" | "90d" | "all";

export interface LoginHistoryItem {
  _id: string;
  method: LoginHistoryMethod;
  status: LoginHistoryStatus;
  failReason: string | null;
  ip: string;
  country: string;
  city: string;
  deviceType: DeviceType;
  os: string;
  browser: string;
  clientType: ClientType;
  createdAt: string;
}

export interface LoginHistoryAdminItem extends LoginHistoryItem {
  userId: string | null;
  usernameAttempted: string;
  userAgent: string;
  timezoneOffset: string | null;
  isAnomaly: boolean;
  anomalyReasons: string[];
}

export type LoginHistoryAdminDetailItem = LoginHistoryAdminItem;

export interface LoginHistoryMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedLoginHistoryResponse {
  items: LoginHistoryItem[];
  meta: LoginHistoryMeta;
}

export interface PaginatedAdminLoginHistoryResponse {
  items: LoginHistoryAdminItem[];
  meta: LoginHistoryMeta;
}

export interface LoginHistoryQueryParams {
  page?: number;
  limit?: number;
  status?: LoginHistoryStatus;
  method?: LoginHistoryMethod;
  deviceType?: DeviceType;
  clientType?: ClientType;
  country?: string;
  city?: string;
  os?: string;
  browser?: string;
  fromDate?: string;
  toDate?: string;
  sortBy?: "createdAt" | "method" | "status" | "country";
  sortOrder?: "asc" | "desc";
}

export interface AdminLoginHistoryQueryParams
  extends Omit<LoginHistoryQueryParams, "sortBy"> {
  userId?: string;
  ip?: string;
  sortBy?:
    | "createdAt"
    | "method"
    | "status"
    | "country"
    | "ip"
    | "usernameAttempted";
}

export type AdminLoginHistoryFilterFormValues = {
  status: string;
  method: string;
  country: string;
  city: string;
  fromDate: string;
  toDate: string;
  userId: string;
  ip: string;
};

export interface LoginHistoryStats {
  total: number;
  successful: number;
  failed: number;
  byMethod: Record<LoginHistoryMethod, number>;
  byDevice: Record<LoginHistoryDeviceType, number>;
  range: {
    from: string;
    to: string;
  };
}
