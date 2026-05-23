import type { LoginHistoryMethod } from "@/types/LoginHistory";

export const LOGIN_HISTORY_METHOD_COLOR: Record<LoginHistoryMethod, string> = {
  password: "text-foreground",
  otp: "text-warning-foreground",
  "magic-link": "text-info",
  "forgot-password": "text-muted-foreground"
};
