// libs
import {
  FileText,
  ShoppingCart,
  Calendar,
  Music,
  SquareCheckBig,
  ChefHat,
  GraduationCap,
  Wrench,
  Image as ImageIcon,
  BookOpen,
  Briefcase,
  Camera
} from "lucide-react";
// types
import type { LucideIcon } from "lucide-react";

export type AppStatus = "published" | "draft";

export interface ManagedApp {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  status: AppStatus;
  views: string;
  date: string;
}

export const MANAGED_APPS_MOCK: ManagedApp[] = [
  {
    id: "a1",
    name: "Personal Blog",
    category: "Productivity",
    description:
      "Markdown blog with newsletter, comments and dark mode support.",
    icon: FileText,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    status: "published",
    views: "4.2K",
    date: "May 2, 2026"
  },
  {
    id: "a2",
    name: "Mini Shop",
    category: "E-commerce",
    description:
      "A lightweight storefront with cart and Stripe checkout integration.",
    icon: ShoppingCart,
    iconColor: "text-warning-foreground",
    iconBg: "bg-warning/20",
    status: "published",
    views: "8.9K",
    date: "Apr 18, 2026"
  },
  {
    id: "a3",
    name: "Calendar Pro",
    category: "Productivity",
    description:
      "Beautiful calendar with events, reminders and sharing capabilities.",
    icon: Calendar,
    iconColor: "text-success",
    iconBg: "bg-success/10",
    status: "draft",
    views: "1.1K",
    date: "May 5, 2026"
  },
  {
    id: "a4",
    name: "SoundWave",
    category: "Entertainment",
    description: "Stream and discover playlists from your favorite artists.",
    icon: Music,
    iconColor: "text-cream-foreground",
    iconBg: "bg-cream",
    status: "published",
    views: "3.7K",
    date: "Apr 15, 2026"
  },
  {
    id: "a5",
    name: "TaskFlow",
    category: "Productivity",
    description: "Kanban-style task manager with team collaboration features.",
    icon: SquareCheckBig,
    iconColor: "text-info",
    iconBg: "bg-info/10",
    status: "published",
    views: "3.4K",
    date: "Apr 24, 2026"
  },
  {
    id: "a6",
    name: "Recipe Box",
    category: "Lifestyle",
    description: "Save, organize and share your favorite cooking recipes.",
    icon: ChefHat,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
    status: "draft",
    views: "1.8K",
    date: "May 1, 2026"
  },
  {
    id: "a7",
    name: "LearnHub",
    category: "Education",
    description: "Online courses, quizzes and progress tracking platform.",
    icon: GraduationCap,
    iconColor: "text-success",
    iconBg: "bg-success/10",
    status: "published",
    views: "5.1K",
    date: "Feb 14, 2026"
  },
  {
    id: "a8",
    name: "DevTools",
    category: "Developer",
    description: "Snippet manager, API tester and JSON formatter in one.",
    icon: Wrench,
    iconColor: "text-info",
    iconBg: "bg-info/10",
    status: "published",
    views: "2.6K",
    date: "Jan 30, 2026"
  },
  {
    id: "a9",
    name: "Photo Gallery",
    category: "Lifestyle",
    description: "Beautiful photo gallery with albums, tags and sharing.",
    icon: ImageIcon,
    iconColor: "text-cream-foreground",
    iconBg: "bg-cream",
    status: "published",
    views: "1.9K",
    date: "May 4, 2026"
  },
  {
    id: "a10",
    name: "Reading Club",
    category: "Education",
    description: "Track books, share reviews and join reading challenges.",
    icon: BookOpen,
    iconColor: "text-warning-foreground",
    iconBg: "bg-warning/20",
    status: "draft",
    views: "920",
    date: "Apr 8, 2026"
  },
  {
    id: "a11",
    name: "Portfolio Hub",
    category: "Career",
    description: "Showcase your projects, skills and experience to recruiters.",
    icon: Briefcase,
    iconColor: "text-muted-foreground",
    iconBg: "bg-muted",
    status: "published",
    views: "2.4K",
    date: "Mar 20, 2026"
  },
  {
    id: "a12",
    name: "Snap Studio",
    category: "Creativity",
    description: "Lightweight photo editor with filters and one-click presets.",
    icon: Camera,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
    status: "draft",
    views: "1.3K",
    date: "Apr 30, 2026"
  }
];
