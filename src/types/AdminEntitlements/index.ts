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

export interface BulkEntitlementRow {
  app: WebApp;
  grantedCount: number;
  totalCount: number;
  status: EntitlementStatus;
  insufficientRoleUserIds: string[];
}

export interface BulkEntitlementInput {
  appId: string;
  userIds: string[];
}

export interface EntitlementMatrixFormValues {
  grants: Record<string, Record<string, boolean>>;
}

export interface EntitlementChange {
  userId: string;
  appId: string;
  granted: boolean;
}
