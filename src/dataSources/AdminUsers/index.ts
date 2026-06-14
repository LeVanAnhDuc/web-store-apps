// types
import type { ListFilterDef } from "@/types/List";

export const buildAdminUsersFilterDefs = (
  tRole: (k: string) => string,
  tStatus: (k: string) => string,
  tToolbar: (k: string) => string
): ListFilterDef[] => [
  {
    key: "role",
    type: "select",
    label: tToolbar("role"),
    options: [
      { value: "user", label: tRole("user") },
      { value: "admin", label: tRole("admin") }
    ]
  },
  {
    key: "status",
    type: "select",
    label: tToolbar("status"),
    options: [
      { value: "active", label: tStatus("active") },
      { value: "locked", label: tStatus("locked") }
    ]
  }
];
