// types
import type { WebApp } from "@/types/AdminApps";
import type { AuthenticationRole } from "@/types/User";

export interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  avatar: string | null;
  role: AuthenticationRole;
}

export interface Entitlement {
  _id: string;
  userId: string;
  webAppId: string;
  grantedBy: string;
  grantedAt: string;
  revokedAt: string | null;
}

export type EntitlementStatus = "granted" | "not_granted" | "insufficient_role";

export interface EntitlementRow {
  app: WebApp;
  entitlement: Entitlement | null;
  status: EntitlementStatus;
}

export interface GrantEntitlementInput {
  userId: string;
  webAppId: string;
}
