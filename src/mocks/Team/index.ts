// types
import type {
  TeamMemberMock,
  PendingInvitationMock,
  RoleDefinitionMock
} from "@/types/Team";
// libs
import { Crown, Shield, User } from "lucide-react";

export const TEAM_MEMBERS_MOCK: readonly TeamMemberMock[] = [
  {
    id: "tm-1",
    fullName: "Anh Duc Le",
    email: "anhducle@email.com",
    role: "owner",
    initials: "AL",
    isYou: true
  },
  {
    id: "tm-2",
    fullName: "Minh Nguyen",
    email: "minh.nguyen@example.com",
    role: "admin",
    initials: "MN",
    isYou: false
  },
  {
    id: "tm-3",
    fullName: "Tran Le",
    email: "tran.le@example.com",
    role: "member",
    initials: "TL",
    isYou: false
  }
] as const;

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
