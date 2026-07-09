"use client";

// libs
import { Users } from "lucide-react";
import { useTranslations } from "next-intl";
// types
import type { AdminUser } from "@/types/AdminUsers";
import type { BulkEntitlementRow } from "@/types/AdminEntitlements";
// components
import AppAccessRow from "../../components/AppAccessRow";
import AppAccessSkeleton from "../../components/AppAccessSkeleton";
// hooks
import { useAnnounce } from "@/hooks";
import useBulkEntitlements from "../../hooks/useBulkEntitlements";
import useGrantBulk from "../../hooks/useGrantBulk";

const AdminEntitlementsMatrix = ({
  selectedUsers,
  onRevokeRequest
}: {
  selectedUsers: AdminUser[];
  onRevokeRequest: (row: BulkEntitlementRow) => void;
}) => {
  const t = useTranslations("adminEntitlements.matrix");
  const tAnnounce = useTranslations("adminEntitlements.announce");
  const { announce } = useAnnounce();

  const userIds = selectedUsers.map((user) => user._id);
  const { data: rows = [], isLoading } = useBulkEntitlements(userIds);
  const grantMutation = useGrantBulk();

  const handleGrant = (row: BulkEntitlementRow) => {
    grantMutation.mutate(
      { appId: row.app._id, userIds },
      {
        onSuccess: () => {
          announce(
            tAnnounce("granted", {
              appName: row.app.displayName,
              count: userIds.length
            })
          );
        }
      }
    );
  };

  if (isLoading) return <AppAccessSkeleton />;

  return (
    <div className="border-border bg-card rounded-xl border">
      <div className="border-border flex items-center justify-between border-b p-4">
        <div>
          <h3 className="text-base font-semibold">{t("title")}</h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {t("subtitle", { count: selectedUsers.length })}
          </p>
        </div>
        <Users
          className="text-muted-foreground size-[18px]"
          aria-hidden="true"
        />
      </div>
      <div className="divide-border divide-y">
        {rows.map((row) => (
          <AppAccessRow
            key={row.app._id}
            row={row}
            isPending={
              grantMutation.isPending &&
              grantMutation.variables?.appId === row.app._id
            }
            onGrant={() => handleGrant(row)}
            onRevokeRequest={() => onRevokeRequest(row)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminEntitlementsMatrix;
