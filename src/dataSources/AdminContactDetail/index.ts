// types
import type { CustomBreadcrumbItem } from "@/types/CustomBreadcrumb";
// others
import CONSTANTS from "@/constants";

export const buildAdminContactDetailBreadcrumb = (
  id: string
): readonly CustomBreadcrumbItem[] => [
  { key: "list", href: CONSTANTS.ROUTES.ADMIN_CONTACT },
  { key: "current", label: id }
];
