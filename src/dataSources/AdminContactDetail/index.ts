// types
import type { CustomBreadcrumbItem } from "@/components/CustomBreadcrumb";
// others
import CONSTANTS from "@/constants";

export const ADMIN_CONTACT_DETAIL_BREADCRUMB: readonly CustomBreadcrumbItem[] =
  [
    { key: "list", href: CONSTANTS.ROUTES.ADMIN_CONTACT },
    { key: "current" }
  ] as const;
