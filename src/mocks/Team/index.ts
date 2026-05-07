// types
import type { LucideIcon } from "lucide-react";
// libs
import { Crown, Shield, User } from "lucide-react";

export type TeamRole = "owner" | "admin" | "member";

export interface TeamMemberMock {
  id: string;
  fullName: string;
  email: string;
  role: TeamRole;
  initials: string;
  avatarFromColor: string;
  avatarToColor: string;
  isYou: boolean;
}

export const TEAM_MEMBERS_MOCK: readonly TeamMemberMock[] = [
  {
    id: "tm-1",
    fullName: "Anh Duc Le",
    email: "anhducle@email.com",
    role: "owner",
    initials: "AL",
    avatarFromColor: "from-cream",
    avatarToColor: "to-primary",
    isYou: true
  },
  {
    id: "tm-2",
    fullName: "Minh Nguyen",
    email: "minh.nguyen@example.com",
    role: "admin",
    initials: "MN",
    avatarFromColor: "from-info",
    avatarToColor: "to-primary",
    isYou: false
  },
  {
    id: "tm-3",
    fullName: "Tran Le",
    email: "tran.le@example.com",
    role: "member",
    initials: "TL",
    avatarFromColor: "from-warning",
    avatarToColor: "to-cream",
    isYou: false
  }
] as const;

export interface PendingInvitationMock {
  id: string;
  email: string;
  role: TeamRole;
  sentAt: string;
}

export const PENDING_INVITATIONS_MOCK: readonly PendingInvitationMock[] = [
  {
    id: "inv-1",
    email: "lan.tran@example.com",
    role: "member",
    sentAt: "2 hours ago"
  },
  {
    id: "inv-2",
    email: "minh.le@example.com",
    role: "admin",
    sentAt: "Yesterday"
  }
] as const;

export interface RoleDefinitionMock {
  key: TeamRole;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export const ROLE_DEFINITIONS_MOCK: readonly RoleDefinitionMock[] = [
  {
    key: "owner",
    icon: Crown,
    iconBg: "bg-primary/15",
    iconColor: "text-primary"
  },
  {
    key: "admin",
    icon: Shield,
    iconBg: "bg-success/15",
    iconColor: "text-success"
  },
  {
    key: "member",
    icon: User,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground"
  }
] as const;
