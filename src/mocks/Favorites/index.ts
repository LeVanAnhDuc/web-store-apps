// libs
import {
  FileText,
  ShoppingCart,
  Calendar,
  Music,
  SquareCheckBig,
  Wrench
} from "lucide-react";
// types
import type { LucideIcon } from "lucide-react";

export type FavoriteCategoryKey =
  | "all"
  | "productivity"
  | "entertainment"
  | "developer"
  | "lifestyle";

export interface FavoriteApp {
  id: string;
  name: string;
  category: Exclude<FavoriteCategoryKey, "all">;
  description: string;
  rating: number;
  reviews: string;
  icon: LucideIcon;
  iconBg: string;
}

export const FAVORITE_CATEGORIES: FavoriteCategoryKey[] = [
  "all",
  "productivity",
  "entertainment",
  "developer"
];

export const FAVORITE_APPS_MOCK: FavoriteApp[] = [
  {
    id: "fv1",
    name: "Personal Blog",
    category: "productivity",
    description: "Share your thoughts and ideas with the world.",
    rating: 4.7,
    reviews: "2.8K",
    icon: FileText,
    iconBg: "bg-indigo-500"
  },
  {
    id: "fv2",
    name: "Mini Shop",
    category: "lifestyle",
    description: "Run your own mini online store easily.",
    rating: 3.9,
    reviews: "1.2K",
    icon: ShoppingCart,
    iconBg: "bg-emerald-500"
  },
  {
    id: "fv3",
    name: "Calendar Pro",
    category: "productivity",
    description: "Beautiful calendar with events, reminders and sharing.",
    rating: 4.7,
    reviews: "2.1K",
    icon: Calendar,
    iconBg: "bg-emerald-600"
  },
  {
    id: "fv4",
    name: "SoundWave",
    category: "entertainment",
    description: "Stream and discover playlists from your favorite artists.",
    rating: 4.5,
    reviews: "3.4K",
    icon: Music,
    iconBg: "bg-pink-500"
  },
  {
    id: "fv5",
    name: "TaskFlow",
    category: "productivity",
    description: "Kanban-style task manager with clean collaboration features.",
    rating: 4.5,
    reviews: "2.9K",
    icon: SquareCheckBig,
    iconBg: "bg-blue-600"
  },
  {
    id: "fv6",
    name: "DevTools",
    category: "developer",
    description: "Embed manager, API tester and JSON formatter in one.",
    rating: 4.1,
    reviews: "1.6K",
    icon: Wrench,
    iconBg: "bg-slate-500"
  }
];
