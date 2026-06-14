// types
import type { AppStatus } from "@/types/AdminApps";
import type { AuthenticationRole } from "@/types/User";
import type { ListFilterDef, ListFilterOption } from "@/types/List";
// others
import CONSTANTS from "@/constants";

const { AUTHENTICATION_ROLES } = CONSTANTS;

export const APP_STATUSES: readonly AppStatus[] = [
  "active",
  "inactive"
] as const;

export const APP_ROLE_OPTIONS: readonly AuthenticationRole[] = [
  AUTHENTICATION_ROLES.USER,
  AUTHENTICATION_ROLES.ADMIN
] as const;

export const buildAdminAppsFilterDefs = (
  statusOptions: ListFilterOption[],
  categoryOptions: ListFilterOption[],
  labels: { status: string; category: string }
): ListFilterDef[] => [
  {
    key: "status",
    type: "select",
    label: labels.status,
    options: statusOptions
  },
  {
    key: "categoryId",
    type: "select",
    label: labels.category,
    options: categoryOptions
  }
];
