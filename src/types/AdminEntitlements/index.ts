// types
import type { WebApp } from "@/types/AdminApps";
// constants
import type ENTITLEMENT_STATUS from "@/constants/entitlementStatus";

export interface Entitlement {
  _id: string;
  userId: string;
  webAppId: string;
  grantedBy: string;
  grantedAt: string;
  revokedAt: string | null;
}

export type EntitlementStatus =
  (typeof ENTITLEMENT_STATUS)[keyof typeof ENTITLEMENT_STATUS];

export interface EntitlementRow {
  app: WebApp;
  entitlement: Entitlement | null;
  status: EntitlementStatus;
}

export interface GrantEntitlementInput {
  userId: string;
  webAppId: string;
}
