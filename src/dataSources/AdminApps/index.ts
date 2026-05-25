// types
import type { AppStatus } from "@/types/AdminApps";
import type { AuthenticationRole } from "@/types/User";
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
