// types
import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Palette,
  MessageSquare,
  Gamepad2,
  Heart,
  GraduationCap,
  Wallet,
  ShoppingCart,
  Home,
  Wrench,
  BarChart3,
  Calendar
} from "lucide-react";

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

export const APP_CATEGORIES = [
  "Productivity",
  "Creativity",
  "Communication",
  "Entertainment",
  "Health",
  "Education",
  "Finance",
  "Shopping",
  "Lifestyle",
  "Utilities"
] as const;

export type AppCategory = (typeof APP_CATEGORIES)[number];

export const CATEGORY_ICONS: Record<AppCategory, LucideIcon> = {
  Productivity: FileText,
  Creativity: Palette,
  Communication: MessageSquare,
  Entertainment: Gamepad2,
  Health: Heart,
  Education: GraduationCap,
  Finance: Wallet,
  Shopping: ShoppingCart,
  Lifestyle: Home,
  Utilities: Wrench
};

export const NAV_ITEMS = [
  { key: "home", icon: Home },
  { key: "recent", icon: Calendar },
  { key: "history", icon: BarChart3 }
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];

export const SORT_OPTIONS = [
  { value: "featured" },
  { value: "rating" },
  { value: "downloads" },
  { value: "name" }
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

// Type-safe translation helpers
export const getSortLabel = (
  t: (key: SortOption) => string,
  value: SortOption
): string => t(value);

export type CategoryKey =
  | "productivity"
  | "creativity"
  | "communication"
  | "entertainment"
  | "health"
  | "education"
  | "finance"
  | "shopping"
  | "lifestyle"
  | "utilities";

export const getCategoryKey = (category: AppCategory): CategoryKey =>
  category.toLowerCase() as CategoryKey;

export const getCategoryLabel = (
  t: (key: CategoryKey) => string,
  category: AppCategory
): string => t(getCategoryKey(category));
