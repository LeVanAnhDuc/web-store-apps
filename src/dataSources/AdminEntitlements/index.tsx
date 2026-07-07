// types
import type { EntitlementRow } from "@/types/AdminEntitlements";
import type { ListColumn } from "@/types/List";
// components
import FormatTime from "@/components/FormatTime";
import RoleChip from "@/views/AdminApps/components/RoleChip";
import EntitlementStatusBadge from "@/views/AdminEntitlements/components/EntitlementStatusBadge";

export const buildAdminEntitlementsColumns = (
  tTable: (k: string) => string,
  tGrant: (k: string) => string
): ListColumn<EntitlementRow>[] => [
  {
    id: "app",
    header: tTable("app"),
    cell: (row) => (
      <div className="flex flex-col">
        <span className="text-foreground font-medium">
          {row.app.displayName}
        </span>
        <span className="text-muted-foreground font-mono text-xs">
          {row.app.name}
        </span>
      </div>
    )
  },
  {
    id: "requiredRoles",
    header: tTable("requiredRoles"),
    cell: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.app.requiredRoles.map((role) => (
          <RoleChip key={role} role={role} />
        ))}
      </div>
    )
  },
  {
    id: "status",
    header: tTable("status"),
    cell: (row) => <EntitlementStatusBadge status={row.status} />
  },
  {
    id: "grantInfo",
    header: tTable("grantInfo"),
    cell: (row) =>
      row.entitlement ? (
        <span>
          {tGrant("by")} {row.entitlement.grantedBy.replace("user_", "")}
          {" · "}
          {tGrant("on")}{" "}
          <FormatTime value={row.entitlement.grantedAt} variant="datetime" />
        </span>
      ) : (
        tGrant("neverGranted")
      ),
    cellClassName: "text-muted-foreground text-xs"
  }
];
