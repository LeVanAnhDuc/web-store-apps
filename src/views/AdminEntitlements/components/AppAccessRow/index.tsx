"use client";

// types
import type { BulkEntitlementRow } from "@/types/AdminEntitlements";
// components
import RoleChip from "@/views/AdminApps/components/RoleChip";
import AppAccessIcon from "../AppAccessIcon";
import AppAccessStatus from "../AppAccessStatus";
import AppAccessAction from "../AppAccessAction";

const AppAccessRow = ({
  row,
  isPending = false,
  onGrant,
  onRevokeRequest
}: {
  row: BulkEntitlementRow;
  isPending?: boolean;
  onGrant: () => void;
  onRevokeRequest: () => void;
}) => (
  <div className="flex items-center justify-between gap-4 p-4">
    <div className="flex items-center gap-3">
      <AppAccessIcon iconUrl={row.app.iconUrl} name={row.app.displayName} />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold">{row.app.displayName}</span>
          {row.app.requiredRoles.map((role) => (
            <RoleChip key={role} role={role} />
          ))}
        </div>
        {row.app.description && (
          <div className="text-muted-foreground text-xs">
            {row.app.description}
          </div>
        )}
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-3">
      <AppAccessStatus row={row} />
      <AppAccessAction
        status={row.status}
        isPending={isPending}
        onGrant={onGrant}
        onRevokeRequest={onRevokeRequest}
      />
    </div>
  </div>
);

export default AppAccessRow;
