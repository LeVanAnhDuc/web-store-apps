// types
import type { LucideIcon } from "lucide-react";
import {
  Home,
  LayoutGrid,
  History,
  Star,
  Clock,
  User,
  Settings,
  CreditCard,
  Users,
  Shield
} from "lucide-react";
// others
import CONSTANTS from "@/constants";

const { ROUTES } = CONSTANTS;

export interface App {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  rating: number;
  downloads: string;
  colorClass: string;
  gradientClass: string;
  lastUsed?: Date;
  featured?: boolean;
  tags: string[];
}

export type NavKey =
  | "home"
  | "apps"
  | "loginHistory"
  | "favorites"
  | "recentlyUsed"
  | "profile"
  | "accountSettings"
  | "billing"
  | "team"
  | "security";

export type NavGroupKey = "discover" | "mine" | "settings";

export interface NavItem {
  key: NavKey;
  icon: LucideIcon;
  href: string;
}

export interface NavGroup {
  key: NavGroupKey;
  items: readonly NavItem[];
}

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    key: "discover",
    items: [
      { key: "home", icon: Home, href: ROUTES.HOME },
      { key: "apps", icon: LayoutGrid, href: ROUTES.APPS }
    ]
  },
  {
    key: "mine",
    items: [
      { key: "loginHistory", icon: History, href: ROUTES.LOGIN_HISTORY },
      { key: "favorites", icon: Star, href: ROUTES.FAVORITES },
      { key: "recentlyUsed", icon: Clock, href: ROUTES.RECENTLY_USED }
    ]
  },
  {
    key: "settings",
    items: [
      { key: "profile", icon: User, href: ROUTES.PROFILE },
      { key: "accountSettings", icon: Settings, href: ROUTES.ACCOUNT_SETTINGS },
      { key: "billing", icon: CreditCard, href: ROUTES.BILLING },
      { key: "team", icon: Users, href: ROUTES.TEAM },
      { key: "security", icon: Shield, href: ROUTES.SECURITY }
    ]
  }
] as const;

export const SORT_OPTIONS = [
  { value: "featured" },
  { value: "rating" },
  { value: "downloads" },
  { value: "name" }
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export const getSortLabel = (
  t: (key: SortOption) => string,
  value: SortOption
): string => t(value);
