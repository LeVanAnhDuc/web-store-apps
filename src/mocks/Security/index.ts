// types
import type { LucideIcon } from "lucide-react";
// libs
import { CheckCircle2, MapPin, Smartphone } from "lucide-react";

export interface LoginActivityMock {
  id: string;
  icon: LucideIcon;
  title: string;
  meta: string;
  timestamp: string;
  status: "success" | "warning";
}

export const LOGIN_ACTIVITY_MOCK: readonly LoginActivityMock[] = [
  {
    id: "act-1",
    icon: CheckCircle2,
    title: "Login from Chrome on macOS",
    meta: "Hanoi, Vietnam · 192.168.1.10",
    timestamp: "Active now",
    status: "success"
  },
  {
    id: "act-2",
    icon: Smartphone,
    title: "Login from Safari on iPhone",
    meta: "Hanoi, Vietnam · 192.168.1.42",
    timestamp: "1 hour ago",
    status: "success"
  },
  {
    id: "act-3",
    icon: MapPin,
    title: "Login from Firefox on Windows",
    meta: "Da Nang, Vietnam · 14.232.10.5",
    timestamp: "Yesterday, 09:15",
    status: "warning"
  }
] as const;

export interface ApiKeyMock {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string;
}

export const API_KEYS_MOCK: readonly ApiKeyMock[] = [
  {
    id: "key-1",
    name: "Production API Key",
    prefix: "sk_live_••••",
    createdAt: "Aug 12, 2025",
    lastUsed: "2 hours ago"
  },
  {
    id: "key-2",
    name: "Development API Key",
    prefix: "sk_test_••••",
    createdAt: "Jul 03, 2025",
    lastUsed: "Yesterday"
  }
] as const;
