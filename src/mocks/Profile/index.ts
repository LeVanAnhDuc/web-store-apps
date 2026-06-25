// types
import type {
  ConnectedAccountMock,
  NotificationPrefMock,
  ProfileStatsMock
} from "@/types/Profile";
// libs
import { Bird, GitBranch, Mail } from "lucide-react";

export const CONNECTED_ACCOUNTS_MOCK: readonly ConnectedAccountMock[] = [
  { key: "google", icon: Mail, isConnected: true },
  { key: "github", icon: GitBranch, isConnected: true },
  { key: "twitter", icon: Bird, isConnected: false }
] as const;

export const NOTIFICATION_PREFS_MOCK: readonly NotificationPrefMock[] = [
  { key: "email", defaultEnabled: true },
  { key: "push", defaultEnabled: true },
  { key: "marketing", defaultEnabled: false }
] as const;

export const PROFILE_STATS_MOCK: ProfileStatsMock = {
  appsCount: 12,
  teamsCount: 3,
  planName: "Pro"
};
