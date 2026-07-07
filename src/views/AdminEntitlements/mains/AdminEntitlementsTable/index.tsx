"use client";

// libs
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
// types
import type { EntitlementRow } from "@/types/AdminEntitlements";
// components
import { Label } from "@/components/ui/label";
import ListPageShell from "@/components/list/ListPageShell";
import ListPageHeader from "@/components/list/ListPageHeader";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import ListTable from "@/components/list/ListTable";
import GrantToggleButton from "../../components/GrantToggleButton";
import UserNotSelectedEmpty from "../../components/UserNotSelectedEmpty";
import EntitlementsTableSkeleton from "../../components/EntitlementsTableSkeleton";
import UserPickerSelect from "../../components/UserPickerSelect";
import AdminEntitlementsRevokeDialog from "../AdminEntitlementsRevokeDialog";
// hooks
import { useAnnounce, useListQuery } from "@/hooks";
import useAdminUserById from "../../hooks/useAdminUserById";
import useEntitlementsByUser from "../../hooks/useEntitlementsByUser";
import useGrantEntitlement from "../../hooks/useGrantEntitlement";
// dataSources
import { buildAdminEntitlementsColumns } from "@/dataSources/AdminEntitlements";
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

  const columns = useMemo(
    () =>
      buildAdminEntitlementsColumns(
        (k) => tTable(k as Parameters<typeof tTable>[0]),
        (k) => tGrant(k as Parameters<typeof tGrant>[0])
      ),
    [tTable, tGrant]
  );

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
    <ListPageShell fullHeight>
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
          fullHeight
          isLoading={isLoading}
          isEmpty={filtered.length === 0}
          hasActiveFilters={Boolean(query.search)}
          onClearFilters={query.clearFilters}
          skeleton={<EntitlementsTableSkeleton />}
        >
          <ListTable
            columns={columns}
            rows={filtered}
            getRowKey={(r) => r.app._id}
            rowActions={(row) => {
              const isPending =
                grantMutation.isPending &&
                grantMutation.variables?.webAppId === row.app._id;
              return (
                <GrantToggleButton
                  status={row.status}
                  onGrant={() => handleGrant(row)}
                  onRevokeRequest={() => setRevokeTarget(row)}
                  isPending={isPending}
                />
              );
            }}
            actionsLabel={tTable("action")}
          />
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
