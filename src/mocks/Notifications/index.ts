// types
import type { LucideIcon } from "lucide-react";
// libs
import {
  CreditCard,
  Heart,
  ShoppingBag,
  Sparkles,
  UserCircle2
} from "lucide-react";

export type NotificationGroup = "today" | "yesterday" | "earlier";

export interface NotificationItemMock {
  id: string;
  group: NotificationGroup;
  itemKey:
    | "newOrder"
    | "flashSale"
    | "profileUpdated"
    | "paymentConfirmed"
    | "newFollower";
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  timestamp: string;
  isRead: boolean;
}

export const NOTIFICATIONS_LIST_MOCK: readonly NotificationItemMock[] = [
  {
    id: "n1",
    group: "today",
    itemKey: "newOrder",
    icon: ShoppingBag,
    iconBg: "bg-success/15",
    iconColor: "text-success",
    timestamp: "2 min ago",
    isRead: false
  },
  {
    id: "n2",
    group: "today",
    itemKey: "flashSale",
    icon: Sparkles,
    iconBg: "bg-warning/20",
    iconColor: "text-warning-foreground",
    timestamp: "28 min ago",
    isRead: false
  },
  {
    id: "n3",
    group: "today",
    itemKey: "profileUpdated",
    icon: UserCircle2,
    iconBg: "bg-info/15",
    iconColor: "text-info",
    timestamp: "1 hour ago",
    isRead: true
  },
  {
    id: "n4",
    group: "yesterday",
    itemKey: "paymentConfirmed",
    icon: CreditCard,
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    timestamp: "Yesterday, 16:42",
    isRead: true
  },
  {
    id: "n5",
    group: "yesterday",
    itemKey: "newFollower",
    icon: Heart,
    iconBg: "bg-cream/30",
    iconColor: "text-cream-foreground",
    timestamp: "Yesterday, 09:15",
    isRead: true
  }
] as const;
