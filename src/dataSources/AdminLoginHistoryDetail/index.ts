// types
import type { CustomBreadcrumbItem } from "@/types/CustomBreadcrumb";
// others
import CONSTANTS from "@/constants";

export const ADMIN_LOGIN_HISTORY_DETAIL_BREADCRUMB: readonly CustomBreadcrumbItem[] =
  [
    { key: "list", href: CONSTANTS.ROUTES.ADMIN_LOGIN_HISTORY },
    { key: "current" }
  ] as const;
