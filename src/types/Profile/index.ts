// types
import type { LucideIcon } from "lucide-react";

export type ConnectedAccountKey = "google" | "github" | "twitter";

export interface ConnectedAccountMock {
  key: ConnectedAccountKey;
  icon: LucideIcon;
  isConnected: boolean;
}

export type NotificationPrefKey = "email" | "push" | "marketing";

export interface NotificationPrefMock {
  key: NotificationPrefKey;
  defaultEnabled: boolean;
}

export interface ProfileStatsMock {
  appsCount: number;
  teamsCount: number;
  planName: string;
}
