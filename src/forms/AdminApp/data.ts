// types
import type { AdminAppFormValues } from "@/types/AdminApps";
// others
import CONSTANTS from "@/constants";

const { AUTHENTICATION_ROLES } = CONSTANTS;

export const initialAdminAppData: AdminAppFormValues = {
  name: "",
  displayName: "",
  description: "",
  iconUrl: "",
  homeUrl: "",
  categoryId: "",
  status: "active",
  requiredRoles: [AUTHENTICATION_ROLES.USER],
  redirectUris: []
};
