"use client";

// libs
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LayoutGrid } from "lucide-react";
// types
import type { EntitlementRow } from "@/types/AdminEntitlements";
// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import EntitlementStatusBadge from "../../components/EntitlementStatusBadge";
import GrantToggleButton from "../../components/GrantToggleButton";
import UserNotSelectedEmpty from "../../components/UserNotSelectedEmpty";
import EntitlementsTableSkeleton from "../../components/EntitlementsTableSkeleton";
import RoleChip from "@/views/AdminApps/components/RoleChip";
import AdminEntitlementsToolbar from "../AdminEntitlementsToolbar";
import AdminEntitlementsRevokeDialog from "../AdminEntitlementsRevokeDialog";
// hooks
import { useAnnounce } from "@/hooks";
import useAdminUserById from "../../hooks/useAdminUserById";
import useEntitlementsByUser from "../../hooks/useEntitlementsByUser";
import useGrantEntitlement from "../../hooks/useGrantEntitlement";
// others
import { formatDateTimeShort } from "@/utils";

const TABLE_COLUMN_COUNT = 5;

const AdminEntitlementsTable = () => {
  const t = useTranslations("adminEntitlements.table");
  const tGrant = useTranslations("adminEntitlements.grantInfo");
  const tEmptyApps = useTranslations("adminEntitlements.emptyApps");
  const tAnnounce = useTranslations("adminEntitlements.announce");
  const { announce } = useAnnounce();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");
  const search = (searchParams.get("search") ?? "").toLowerCase();

  const [revokeTarget, setRevokeTarget] = useState<EntitlementRow | null>(null);

  const { data: user = null } = useAdminUserById(userId);
  const { data: rows, isLoading } = useEntitlementsByUser(user?._id ?? null);
  const grantMutation = useGrantEntitlement();

  const handleGrant = (row: EntitlementRow) => {
    if (!user) return;
    grantMutation.mutate(
      { userId: user._id, webAppId: row.app._id },
      {
        onSuccess: () => {
          announce(
            tAnnounce("granted", {
              appName: row.app.displayName,
              userName: user.fullName
            })
          );
        }
      }
    );
  };

  const filtered = (rows ?? []).filter((row) => {
    if (!search) return true;
    const hay =
      `${row.app.name} ${row.app.displayName} ${row.app.description ?? ""}`.toLowerCase();
    return hay.includes(search);
  });

  return (
    <>
      <AdminEntitlementsToolbar />
      {!user ? (
        <UserNotSelectedEmpty />
      ) : isLoading ? (
        <EntitlementsTableSkeleton />
      ) : (
        <div className="bg-card rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("app")}</TableHead>
                <TableHead>{t("requiredRoles")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("grantInfo")}</TableHead>
                <TableHead className="w-32 text-right">
                  <span className="sr-only">{t("action")}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={TABLE_COLUMN_COUNT} className="py-16">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <LayoutGrid
                        className="text-muted-foreground size-8"
                        aria-hidden="true"
                      />
                      <p className="text-foreground text-sm font-medium">
                        {tEmptyApps("title")}
                      </p>
                      <p className="text-muted-foreground max-w-sm text-sm">
                        {tEmptyApps("description")}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => {
                  const isPending =
                    grantMutation.isPending &&
                    grantMutation.variables?.webAppId === row.app._id;
                  return (
                    <TableRow key={row.app._id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-foreground font-medium">
                            {row.app.displayName}
                          </span>
                          <span className="text-muted-foreground font-mono text-xs">
                            {row.app.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {row.app.requiredRoles.map((role) => (
                            <RoleChip key={role} role={role} />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <EntitlementStatusBadge status={row.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {row.entitlement ? (
                          <span>
                            {tGrant("by")}{" "}
                            {row.entitlement.grantedBy.replace("user_", "")}
                            {" · "}
                            {tGrant("on")}{" "}
                            {formatDateTimeShort(row.entitlement.grantedAt)}
                          </span>
                        ) : (
                          tGrant("neverGranted")
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <GrantToggleButton
                          status={row.status}
                          onGrant={() => handleGrant(row)}
                          onRevokeRequest={() => setRevokeTarget(row)}
                          isPending={isPending}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <AdminEntitlementsRevokeDialog
        user={user}
        target={revokeTarget}
        onClose={() => setRevokeTarget(null)}
      />
    </>
  );
};

export default AdminEntitlementsTable;
