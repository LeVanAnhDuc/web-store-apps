// types
import type { LucideIcon } from "lucide-react";
// libs
import {
  CreditCard,
  Headphones,
  Keyboard,
  LifeBuoy,
  Settings,
  User,
  Users
} from "lucide-react";
// others
import CONSTANTS from "@/constants";

const { ROUTES } = CONSTANTS;

export type SettingsMenuKey =
  | "profile"
  | "accountSettings"
  | "billing"
  | "team";
export type UtilityMenuKey = "keyboardShortcuts" | "helpCenter" | "support";

export interface SettingsMenuItem {
  key: SettingsMenuKey;
  icon: LucideIcon;
  href: string;
}

export interface UtilityMenuItem {
  key: UtilityMenuKey;
  icon: LucideIcon;
  href?: string;
}

export const SETTINGS_MENU_ITEMS: readonly SettingsMenuItem[] = [
  { key: "profile", icon: User, href: ROUTES.PROFILE },
  { key: "accountSettings", icon: Settings, href: ROUTES.ACCOUNT_SETTINGS },
  { key: "billing", icon: CreditCard, href: ROUTES.BILLING },
  { key: "team", icon: Users, href: ROUTES.TEAM }
] as const;

export const UTILITY_MENU_ITEMS: readonly UtilityMenuItem[] = [
  { key: "keyboardShortcuts", icon: Keyboard },
  { key: "helpCenter", icon: LifeBuoy },
  { key: "support", icon: Headphones }
] as const;
