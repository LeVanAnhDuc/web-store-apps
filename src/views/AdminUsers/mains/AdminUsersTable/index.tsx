"use client";

// libs
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
// types
import type {
  AdminUser,
  AdminUsersQueryParams,
  AdminUserStatusFilter
} from "@/types/AdminUsers";
import type { AuthenticationRole } from "@/types/User";
// components
import ListPageShell from "@/components/list/ListPageShell";
import ListPageHeader from "@/components/list/ListPageHeader";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import ListTable from "@/components/list/ListTable";
import ListPagination from "@/components/list/ListPagination";
import UserRowActions from "../../components/UserRowActions";
import UsersTableSkeleton from "../../components/UsersTableSkeleton";
import AdminUsersResetPasswordDialog from "../AdminUsersResetPasswordDialog";
import AdminUsersLockDialog from "../AdminUsersLockDialog";
import AdminUsersForceLogoutDialog from "../AdminUsersForceLogoutDialog";
// hooks
import { useListQuery } from "@/hooks";
import useAdminUsersList from "../../hooks/useAdminUsersList";
// dataSources
import {
  buildAdminUsersColumns,
  buildAdminUsersFilterDefs
} from "@/dataSources/AdminUsers";
// others
import CONSTANTS from "@/constants";

const { AUTHENTICATION_ROLES } = CONSTANTS;

const isRole = (value: unknown): value is AuthenticationRole =>
  value === AUTHENTICATION_ROLES.USER || value === AUTHENTICATION_ROLES.ADMIN;

const { ACTIVE, LOCKED } = CONSTANTS.ADMIN_USER_STATUS;

const isStatus = (value: unknown): value is AdminUserStatusFilter =>
  value === ACTIVE || value === LOCKED;

const AdminUsersTable = () => {
  const t = useTranslations("adminUsers");
  const tTable = useTranslations("adminUsers.table");
  const tToolbar = useTranslations("adminUsers.toolbar");
  const tRole = useTranslations("adminUsers.role");
  const tStatus = useTranslations("adminUsers.status");

  const filterDefs = useMemo(
    () => buildAdminUsersFilterDefs(tRole, tStatus, tToolbar),
    [tRole, tStatus, tToolbar]
  );
  const query = useListQuery(filterDefs);

  const columns = useMemo(() => buildAdminUsersColumns(tTable), [tTable]);

  const params: AdminUsersQueryParams = {
    page: query.page,
    ...(query.appliedSearch && { search: query.appliedSearch }),
    ...(isRole(query.filters.role) && { role: query.filters.role }),
    ...(isStatus(query.filters.status) && { status: query.filters.status })
  };

  const [resetTarget, setResetTarget] = useState<AdminUser | null>(null);
  const [lockTarget, setLockTarget] = useState<AdminUser | null>(null);
  const [forceLogoutTarget, setForceLogoutTarget] = useState<AdminUser | null>(
    null
  );

  const { data, isLoading } = useAdminUsersList(params);
  const items = data?.items ?? [];
  const meta = data?.meta;

  const hasActiveFilters =
    query.activeFilterCount > 0 || Boolean(query.appliedSearch);

  return (
    <ListPageShell fullHeight>
      <ListPageHeader title={t("title")} description={t("description")} />
      <ListToolbar
        query={query}
        filterDefs={filterDefs}
        searchPlaceholder={tToolbar("searchPlaceholder")}
      />
      <ListContent
        fullHeight
        isLoading={isLoading}
        isEmpty={items.length === 0}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={query.clearFilters}
        skeleton={<UsersTableSkeleton />}
        emptyTitle={tTable("empty")}
        emptyDescription={tTable("emptyDescription")}
      >
        <ListTable
          columns={columns}
          rows={items}
          getRowKey={(r) => r._id}
          rowActions={(user) => (
            <UserRowActions
              user={user}
              onResetPassword={setResetTarget}
              onLockToggle={setLockTarget}
              onForceLogout={setForceLogoutTarget}
            />
          )}
          actionsLabel={tTable("actions")}
        />
      </ListContent>
      <ListPagination
        page={meta?.page ?? query.page}
        totalPages={meta?.totalPages ?? 1}
        total={meta?.total ?? 0}
        onPageChange={query.setPage}
        loading={isLoading}
      />
      <AdminUsersResetPasswordDialog
        target={resetTarget}
        onClose={() => setResetTarget(null)}
      />
      <AdminUsersLockDialog
        target={lockTarget}
        onClose={() => setLockTarget(null)}
      />
      <AdminUsersForceLogoutDialog
        target={forceLogoutTarget}
        onClose={() => setForceLogoutTarget(null)}
      />
    </ListPageShell>
  );
};

export default AdminUsersTable;
