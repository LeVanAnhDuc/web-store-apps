// types
import type { LucideIcon } from "lucide-react";
// libs
import { Bird, GitBranch, Mail } from "lucide-react";

export type ConnectedAccountKey = "google" | "github" | "twitter";

export interface ConnectedAccountMock {
  key: ConnectedAccountKey;
  icon: LucideIcon;
  isConnected: boolean;
}

export const CONNECTED_ACCOUNTS_MOCK: readonly ConnectedAccountMock[] = [
  { key: "google", icon: Mail, isConnected: true },
  { key: "github", icon: GitBranch, isConnected: true },
  { key: "twitter", icon: Bird, isConnected: false }
] as const;

export type NotificationPrefKey = "email" | "push" | "marketing";

export interface NotificationPrefMock {
  key: NotificationPrefKey;
  defaultEnabled: boolean;
}

export const NOTIFICATION_PREFS_MOCK: readonly NotificationPrefMock[] = [
  { key: "email", defaultEnabled: true },
  { key: "push", defaultEnabled: true },
  { key: "marketing", defaultEnabled: false }
] as const;

export interface ProfileStatsMock {
  appsCount: number;
  teamsCount: number;
  planName: string;
}

export const PROFILE_STATS_MOCK: ProfileStatsMock = {
  appsCount: 12,
  teamsCount: 3,
  planName: "Pro"
};
