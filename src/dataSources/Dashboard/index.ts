// types
import type { LucideIcon } from "lucide-react";
import { Home, Compass, LayoutGrid, History, Star, Clock } from "lucide-react";
// others
import CONSTANTS from "@/constants";

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

export const NAV_ITEMS = [
  { key: "home", icon: Home, href: CONSTANTS.ROUTES.HOME },
  { key: "discover", icon: Compass, href: CONSTANTS.ROUTES.DISCOVER },
  { key: "apps", icon: LayoutGrid, href: CONSTANTS.ROUTES.APPS },
  { key: "loginHistory", icon: History, href: CONSTANTS.ROUTES.LOGIN_HISTORY },
  { key: "favorites", icon: Star, href: CONSTANTS.ROUTES.FAVORITES },
  { key: "recentlyUsed", icon: Clock, href: CONSTANTS.ROUTES.RECENTLY_USED }
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];

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
