// types
import type { LucideIcon } from "lucide-react";

export type TeamRole = "owner" | "admin" | "member";

export interface TeamMemberMock {
  id: string;
  fullName: string;
  email: string;
  role: TeamRole;
  initials: string;
  isYou: boolean;
}

export interface PendingInvitationMock {
  id: string;
  email: string;
  role: TeamRole;
  sentAt: string;
}

export interface RoleDefinitionMock {
  key: TeamRole;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}
