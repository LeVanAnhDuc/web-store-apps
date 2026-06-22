// types
import type { AuthenticationRole } from "@/types/User";

export const APP_STATUS = { ACTIVE: "active", INACTIVE: "inactive" } as const;
export type AppStatus = (typeof APP_STATUS)[keyof typeof APP_STATUS];

export interface WebAppCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface WebApp {
  _id: string;
  name: string;
  displayName: string;
  description: string | null;
  iconUrl: string | null;
  homeUrl: string;
  categoryId: string;
  status: AppStatus;
  requiredRoles: AuthenticationRole[];
  redirectUris: string[];
  clientId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAppsQueryParams {
  search?: string;
  status?: AppStatus;
  categoryId?: string;
}

export interface AdminAppFormValues {
  name: string;
  displayName: string;
  description: string;
  iconUrl: string;
  homeUrl: string;
  categoryId: string;
  status: AppStatus;
  requiredRoles: AuthenticationRole[];
  redirectUris: string[];
}

export type AdminAppCreateInput = AdminAppFormValues;

export type AdminAppUpdateInput = AdminAppFormValues;

export type AdminAppCreateResult = WebApp & { clientSecret: string };
