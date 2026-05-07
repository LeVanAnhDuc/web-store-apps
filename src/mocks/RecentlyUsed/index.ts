// libs
import {
  FileText,
  ShoppingBag,
  Code,
  CalendarDays,
  SquareCheckBig,
  Music,
  ChefHat,
  GraduationCap,
  Image as ImageIcon
} from "lucide-react";
// types
import type { LucideIcon } from "lucide-react";

export type RecentGroupKey = "today" | "yesterday" | "thisWeek" | "earlier";

export interface RecentApp {
  id: string;
  name: string;
  category: string;
  group: RecentGroupKey;
  time: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export const RECENT_GROUP_DOTS: Record<RecentGroupKey, string> = {
  today: "bg-green-500",
  yesterday: "bg-amber-500",
  thisWeek: "bg-slate-400",
  earlier: "bg-slate-300"
};

export const RECENT_APPS_MOCK: RecentApp[] = [
  {
    id: "ru1",
    name: "Personal Blog",
    category: "Productivity",
    group: "today",
    time: "12 minutes ago",
    icon: FileText,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-50"
  },
  {
    id: "ru2",
    name: "Mini Shop",
    category: "E-commerce",
    group: "today",
    time: "2 hours ago",
    icon: ShoppingBag,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50"
  },
  {
    id: "ru3",
    name: "DevTools",
    category: "Developer",
    group: "today",
    time: "5 hours ago",
    icon: Code,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50"
  },
  {
    id: "ru4",
    name: "Calendar Pro",
    category: "Productivity",
    group: "yesterday",
    time: "1 day ago",
    icon: CalendarDays,
    iconColor: "text-green-600",
    iconBg: "bg-green-50"
  },
  {
    id: "ru5",
    name: "TaskFlow",
    category: "Productivity",
    group: "yesterday",
    time: "1 day ago",
    icon: SquareCheckBig,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    id: "ru6",
    name: "SoundWave",
    category: "Entertainment",
    group: "thisWeek",
    time: "3 days ago",
    icon: Music,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50"
  },
  {
    id: "ru7",
    name: "Recipe Box",
    category: "Lifestyle",
    group: "thisWeek",
    time: "4 days ago",
    icon: ChefHat,
    iconColor: "text-red-500",
    iconBg: "bg-red-50"
  },
  {
    id: "ru8",
    name: "LearnHub",
    category: "Education",
    group: "thisWeek",
    time: "6 days ago",
    icon: GraduationCap,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50"
  },
  {
    id: "ru9",
    name: "Photo Gallery",
    category: "Entertainment",
    group: "earlier",
    time: "2 weeks ago",
    icon: ImageIcon,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50"
  },
  {
    id: "ru10",
    name: "Mini Shop",
    category: "E-commerce",
    group: "earlier",
    time: "3 weeks ago",
    icon: ShoppingBag,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50"
  }
];
