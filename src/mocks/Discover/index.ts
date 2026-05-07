// libs
import {
  FileText,
  ShoppingCart,
  Calendar,
  Music,
  SquareCheckBig,
  ChefHat,
  GraduationCap,
  Wrench
} from "lucide-react";
// types
import type { LucideIcon } from "lucide-react";

export type DiscoverCategoryKey =
  | "all"
  | "productivity"
  | "entertainment"
  | "education"
  | "tools"
  | "lifestyle"
  | "developer";

export interface DiscoverApp {
  id: string;
  name: string;
  category: DiscoverCategoryKey;
  description: string;
  rating: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export const DISCOVER_CATEGORIES: DiscoverCategoryKey[] = [
  "all",
  "productivity",
  "entertainment",
  "education",
  "tools",
  "lifestyle",
  "developer"
];

export const FEATURED_APPS_MOCK: DiscoverApp[] = [
  {
    id: "f1",
    name: "Personal Blog",
    category: "productivity",
    description: "Markdown blog with newsletter, comments and dark mode.",
    rating: 4.8,
    icon: FileText,
    iconColor: "text-primary",
    iconBg: "bg-primary/10"
  },
  {
    id: "f2",
    name: "Mini Shop",
    category: "lifestyle",
    description: "A lightweight storefront with cart and Stripe checkout.",
    rating: 4.6,
    icon: ShoppingCart,
    iconColor: "text-warning-foreground",
    iconBg: "bg-warning/20"
  },
  {
    id: "f3",
    name: "Calendar Pro",
    category: "productivity",
    description: "Beautiful calendar with events, reminders and sharing.",
    rating: 4.9,
    icon: Calendar,
    iconColor: "text-success",
    iconBg: "bg-success/10"
  },
  {
    id: "f4",
    name: "SoundWave",
    category: "entertainment",
    description: "Stream and discover playlists from your favorite artists.",
    rating: 4.7,
    icon: Music,
    iconColor: "text-cream-foreground",
    iconBg: "bg-cream"
  }
];

export const MY_APPS_MOCK: DiscoverApp[] = [
  {
    id: "m1",
    name: "TaskFlow",
    category: "productivity",
    description: "Kanban-style task manager with team collaboration.",
    rating: 4.5,
    icon: SquareCheckBig,
    iconColor: "text-info",
    iconBg: "bg-info/10"
  },
  {
    id: "m2",
    name: "Recipe Box",
    category: "lifestyle",
    description: "Save, organize and share your favorite cooking recipes.",
    rating: 4.4,
    icon: ChefHat,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10"
  },
  {
    id: "m3",
    name: "LearnHub",
    category: "education",
    description: "Online courses, quizzes and progress tracking platform.",
    rating: 4.7,
    icon: GraduationCap,
    iconColor: "text-success",
    iconBg: "bg-success/10"
  },
  {
    id: "m4",
    name: "DevTools",
    category: "developer",
    description: "Snippet manager, API tester and JSON formatter in one.",
    rating: 4.6,
    icon: Wrench,
    iconColor: "text-info",
    iconBg: "bg-info/10"
  }
];
