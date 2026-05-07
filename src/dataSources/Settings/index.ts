// types
import type { LucideIcon } from "lucide-react";
// libs
import {
  Bell,
  CreditCard,
  Home,
  Settings,
  Shield,
  User,
  Users
} from "lucide-react";
// others
import CONSTANTS from "@/constants";

const { ROUTES } = CONSTANTS;

export type SettingsMenuKey = "home";
export type SettingsGroupKey =
  | "profile"
  | "accountSettings"
  | "billing"
  | "team"
  | "notifications"
  | "security";

export interface SettingsNavItem<K extends string> {
  key: K;
  icon: LucideIcon;
  href: string;
}

export const SETTINGS_MENU_ITEMS: readonly SettingsNavItem<SettingsMenuKey>[] =
  [{ key: "home", icon: Home, href: ROUTES.HOME }] as const;

export const SETTINGS_GROUP_ITEMS: readonly SettingsNavItem<SettingsGroupKey>[] =
  [
    { key: "profile", icon: User, href: ROUTES.PROFILE },
    { key: "accountSettings", icon: Settings, href: ROUTES.ACCOUNT_SETTINGS },
    { key: "billing", icon: CreditCard, href: ROUTES.BILLING },
    { key: "team", icon: Users, href: ROUTES.TEAM },
    { key: "notifications", icon: Bell, href: ROUTES.NOTIFICATIONS },
    { key: "security", icon: Shield, href: ROUTES.SECURITY }
  ] as const;
