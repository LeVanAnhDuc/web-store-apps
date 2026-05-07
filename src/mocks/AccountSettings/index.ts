// types
import type { LucideIcon } from "lucide-react";
// libs
import { Laptop, Smartphone, Monitor } from "lucide-react";

export interface ActiveSessionMock {
  id: string;
  icon: LucideIcon;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export const ACTIVE_SESSIONS_MOCK: readonly ActiveSessionMock[] = [
  {
    id: "session-1",
    icon: Laptop,
    device: "MacBook Pro — Chrome",
    location: "Hanoi, Vietnam",
    lastActive: "Active now",
    isCurrent: true
  },
  {
    id: "session-2",
    icon: Smartphone,
    device: "iPhone 14 Pro — Safari",
    location: "Hanoi, Vietnam",
    lastActive: "2 hours ago",
    isCurrent: false
  },
  {
    id: "session-3",
    icon: Monitor,
    device: "Windows PC — Firefox",
    location: "Hanoi, Vietnam",
    lastActive: "Yesterday, 14:32",
    isCurrent: false
  }
] as const;
