// types
import type { ListFilterDef } from "@/types/List";
import type {
  LoginHistoryMethod,
  LoginHistoryStatus
} from "@/types/LoginHistory";

export const LOGIN_HISTORY_METHOD_COLOR: Record<LoginHistoryMethod, string> = {
  password: "text-foreground",
  otp: "text-warning-foreground",
  "magic-link": "text-info",
  "forgot-password": "text-muted-foreground"
};

export const LOGIN_HISTORY_STATUS_VALUES: LoginHistoryStatus[] = [
  "success",
  "failed"
];

export const LOGIN_HISTORY_METHOD_VALUES: LoginHistoryMethod[] = [
  "password",
  "otp",
  "magic-link",
  "forgot-password"
];

export const buildLoginHistoryFilterDefs = (
  tStatus: (k: string) => string,
  tMethod: (k: string) => string,
  tFilters: (k: string) => string
): ListFilterDef[] => [
  {
    key: "status",
    type: "select",
    label: tFilters("status"),
    options: LOGIN_HISTORY_STATUS_VALUES.map((v) => ({
      value: v,
      label: tStatus(v)
    }))
  },
  {
    key: "method",
    type: "select",
    label: tFilters("method"),
    options: LOGIN_HISTORY_METHOD_VALUES.map((v) => ({
      value: v,
      label: tMethod(v)
    }))
  },
  {
    key: "dateRange",
    type: "dateRange",
    label: tFilters("fromDate")
  }
];
