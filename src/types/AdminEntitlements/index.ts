// types
import type { WebApp } from "@/types/AdminApps";

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
