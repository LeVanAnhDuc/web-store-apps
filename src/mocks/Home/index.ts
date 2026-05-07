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
    gradient: "bg-gradient-to-br from-primary to-primary/60"
  },
  {
    id: "2",
    name: "DevTools",
    lastOpened: "3 hrs ago",
    icon: Wrench,
    gradient: "bg-gradient-to-br from-info to-info/60"
  },
  {
    id: "3",
    name: "Mini Shop",
    lastOpened: "5 hrs ago",
    icon: ShoppingCart,
    gradient: "bg-gradient-to-br from-warning to-warning/60"
  },
  {
    id: "4",
    name: "Calendar Pro",
    lastOpened: "1 day ago",
    icon: Calendar,
    gradient: "bg-gradient-to-br from-success to-success/60"
  }
];

export const RECOMMENDED_APPS_MOCK: RecommendedApp[] = [
  {
    id: "1",
    name: "SoundWave",
    category: "Entertainment",
    rating: 4.7,
    icon: Music,
    iconColor: "text-cream-foreground",
    gradient: "bg-gradient-to-br from-cream to-cream/60"
  },
  {
    id: "2",
    name: "LearnHub",
    category: "Education",
    rating: 4.8,
    icon: GraduationCap,
    iconColor: "text-success",
    gradient: "bg-gradient-to-br from-success/20 to-success/5"
  },
  {
    id: "3",
    name: "Recipe Box",
    category: "Lifestyle",
    rating: 4.5,
    icon: ChefHat,
    iconColor: "text-destructive",
    gradient: "bg-gradient-to-br from-destructive/20 to-warning/10"
  },
  {
    id: "4",
    name: "TaskFlow",
    category: "Productivity",
    rating: 4.6,
    icon: SquareCheckBig,
    iconColor: "text-info",
    gradient: "bg-gradient-to-br from-info/20 to-info/5"
  }
];
