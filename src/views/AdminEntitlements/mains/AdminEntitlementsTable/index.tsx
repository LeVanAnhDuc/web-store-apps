"use client";

// libs
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
import { Label } from "@/components/ui/label";
import ListPageShell from "@/components/list/ListPageShell";
import ListPageHeader from "@/components/list/ListPageHeader";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import EntitlementStatusBadge from "../../components/EntitlementStatusBadge";
import GrantToggleButton from "../../components/GrantToggleButton";
import UserNotSelectedEmpty from "../../components/UserNotSelectedEmpty";
import EntitlementsTableSkeleton from "../../components/EntitlementsTableSkeleton";
import UserPickerSelect from "../../components/UserPickerSelect";
import RoleChip from "@/views/AdminApps/components/RoleChip";
import AdminEntitlementsRevokeDialog from "../AdminEntitlementsRevokeDialog";
import FormatTime from "@/components/FormatTime";
// hooks
import { useAnnounce, useListQuery } from "@/hooks";
import useAdminUserById from "../../hooks/useAdminUserById";
import useEntitlementsByUser from "../../hooks/useEntitlementsByUser";
import useGrantEntitlement from "../../hooks/useGrantEntitlement";
// others
import { useRouter, usePathname } from "@/i18n/navigation";

const AdminEntitlementsTable = () => {
  const t = useTranslations("adminEntitlements");
  const tTable = useTranslations("adminEntitlements.table");
  const tGrant = useTranslations("adminEntitlements.grantInfo");
  const tToolbar = useTranslations("adminEntitlements.toolbar");
  const tAnnounce = useTranslations("adminEntitlements.announce");
  const { announce } = useAnnounce();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const userId = searchParams.get("userId") ?? undefined;

  const query = useListQuery([]);

  const handleUserChange = (newUserId: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (newUserId) next.set("userId", newUserId);
    else next.delete("userId");
    // Reset search when switching users
    next.delete("search");
    router.push(`${pathname}?${next.toString()}`);
  };

  const [revokeTarget, setRevokeTarget] = useState<EntitlementRow | null>(null);

  const { data: user = null } = useAdminUserById(userId ?? null);
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

  // Client-side filter — use query.search (live value) for instant filtering
  const filtered = (rows ?? []).filter((row) => {
    if (!query.search) return true;
    const needle = query.search.toLowerCase();
    const hay =
      `${row.app.name} ${row.app.displayName} ${row.app.description ?? ""}`.toLowerCase();
    return hay.includes(needle);
  });

  const userPickerSlot = (
    <div className="flex items-center gap-2">
      <Label className="text-muted-foreground shrink-0 text-xs">
        {tToolbar("user")}
      </Label>
      <UserPickerSelect
        value={userId}
        onValueChange={handleUserChange}
        placeholder={tToolbar("userPlaceholder")}
      />
    </div>
  );

  return (
    <ListPageShell>
      <ListPageHeader title={t("title")} description={t("description")} />
      <ListToolbar
        query={query}
        searchPlaceholder={tToolbar("appSearchPlaceholder")}
        rightSlot={userPickerSlot}
      />
      {!user ? (
        <UserNotSelectedEmpty />
      ) : (
        <ListContent
          isLoading={isLoading}
          isEmpty={filtered.length === 0}
          hasActiveFilters={Boolean(query.search)}
          onClearFilters={query.clearFilters}
          skeleton={<EntitlementsTableSkeleton />}
        >
          <div className="bg-card rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{tTable("app")}</TableHead>
                  <TableHead>{tTable("requiredRoles")}</TableHead>
                  <TableHead>{tTable("status")}</TableHead>
                  <TableHead>{tTable("grantInfo")}</TableHead>
                  <TableHead className="w-32 text-right">
                    <span className="sr-only">{tTable("action")}</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => {
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
                            <FormatTime
                              value={row.entitlement.grantedAt}
                              variant="datetime"
                            />
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
                })}
              </TableBody>
            </Table>
          </div>
        </ListContent>
      )}
      <AdminEntitlementsRevokeDialog
        user={user}
        target={revokeTarget}
        onClose={() => setRevokeTarget(null)}
      />
    </ListPageShell>
  );
};

export default AdminEntitlementsTable;
