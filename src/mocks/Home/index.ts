// libs
import {
  FileText,
  Wrench,
  ShoppingCart,
  Calendar,
  Music,
  GraduationCap,
  ChefHat,
  SquareCheckBig
} from "lucide-react";
// types
import type { LucideIcon } from "lucide-react";

export interface QuickAccessItem {
  id: string;
  name: string;
  lastOpened: string;
  icon: LucideIcon;
  gradient: string;
}

export interface RecommendedApp {
  id: string;
  name: string;
  category: string;
  rating: number;
  icon: LucideIcon;
  iconColor: string;
  gradient: string;
}

export const QUICK_ACCESS_MOCK: QuickAccessItem[] = [
  {
    id: "1",
    name: "Personal Blog",
    lastOpened: "12 min ago",
    icon: FileText,
    gradient: "bg-gradient-to-br from-indigo-500 to-indigo-400"
  },
  {
    id: "2",
    name: "DevTools",
    lastOpened: "3 hrs ago",
    icon: Wrench,
    gradient: "bg-gradient-to-br from-cyan-500 to-cyan-400"
  },
  {
    id: "3",
    name: "Mini Shop",
    lastOpened: "5 hrs ago",
    icon: ShoppingCart,
    gradient: "bg-gradient-to-br from-amber-500 to-amber-400"
  },
  {
    id: "4",
    name: "Calendar Pro",
    lastOpened: "1 day ago",
    icon: Calendar,
    gradient: "bg-gradient-to-br from-green-600 to-green-400"
  }
];

export const RECOMMENDED_APPS_MOCK: RecommendedApp[] = [
  {
    id: "1",
    name: "SoundWave",
    category: "Entertainment",
    rating: 4.7,
    icon: Music,
    iconColor: "text-violet-500",
    gradient: "bg-gradient-to-br from-purple-100 to-indigo-100"
  },
  {
    id: "2",
    name: "LearnHub",
    category: "Education",
    rating: 4.8,
    icon: GraduationCap,
    iconColor: "text-green-600",
    gradient: "bg-gradient-to-br from-green-100 to-cyan-100"
  },
  {
    id: "3",
    name: "Recipe Box",
    category: "Lifestyle",
    rating: 4.5,
    icon: ChefHat,
    iconColor: "text-red-600",
    gradient: "bg-gradient-to-br from-red-100 to-amber-100"
  },
  {
    id: "4",
    name: "TaskFlow",
    category: "Productivity",
    rating: 4.6,
    icon: SquareCheckBig,
    iconColor: "text-blue-600",
    gradient: "bg-gradient-to-br from-blue-100 to-indigo-100"
  }
];
