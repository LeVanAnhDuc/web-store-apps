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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import ListPageShell from "@/components/list/ListPageShell";
import ListPageHeader from "@/components/list/ListPageHeader";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import ListTableCard from "@/components/list/ListTableCard";
import ListPagination from "@/components/list/ListPagination";
import UserRoleBadge from "../../components/UserRoleBadge";
import UserStatusBadge from "../../components/UserStatusBadge";
import UserRowActions from "../../components/UserRowActions";
import UsersTableSkeleton from "../../components/UsersTableSkeleton";
import AdminUsersResetPasswordDialog from "../AdminUsersResetPasswordDialog";
import AdminUsersLockDialog from "../AdminUsersLockDialog";
import AdminUsersForceLogoutDialog from "../AdminUsersForceLogoutDialog";
import FormatTime from "@/components/FormatTime";
// hooks
import { useListQuery } from "@/hooks";
import useAdminUsersList from "../../hooks/useAdminUsersList";
// dataSources
import { buildAdminUsersFilterDefs } from "@/dataSources/AdminUsers";
// others
import CONSTANTS from "@/constants";

const { AUTHENTICATION_ROLES } = CONSTANTS;

const isRole = (value: unknown): value is AuthenticationRole =>
  value === AUTHENTICATION_ROLES.USER || value === AUTHENTICATION_ROLES.ADMIN;

const isStatus = (value: unknown): value is AdminUserStatusFilter =>
  value === "active" || value === "locked";

const AdminUsersTable = () => {
  const t = useTranslations("adminUsers");
  const tTable = useTranslations("adminUsers.table");
  const tToolbar = useTranslations("adminUsers.toolbar");
  const tRole = useTranslations("adminUsers.role");
  const tStatus = useTranslations("adminUsers.status");

  const filterDefs = useMemo(
    () =>
      buildAdminUsersFilterDefs(
        (k) => tRole(k as Parameters<typeof tRole>[0]),
        (k) => tStatus(k as Parameters<typeof tStatus>[0]),
        (k) => tToolbar(k as Parameters<typeof tToolbar>[0])
      ),
    [tRole, tStatus, tToolbar]
  );
  const query = useListQuery(filterDefs);

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
        <ListTableCard>
          <Table containerClassName="md:h-full">
            <TableHeader>
              <TableRow>
                <TableHead>{tTable("user")}</TableHead>
                <TableHead>{tTable("role")}</TableHead>
                <TableHead>{tTable("status")}</TableHead>
                <TableHead>{tTable("lastLoginAt")}</TableHead>
                <TableHead>{tTable("createdAt")}</TableHead>
                <TableHead className="w-12 text-right">
                  <span className="sr-only">{tTable("actions")}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium">
                        {user.fullName}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <UserRoleBadge role={user.role} />
                  </TableCell>
                  <TableCell>
                    <UserStatusBadge isActive={user.isActive} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {user.lastLoginAt ? (
                      <FormatTime value={user.lastLoginAt} variant="datetime" />
                    ) : (
                      tTable("neverLoggedIn")
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    <FormatTime value={user.createdAt} variant="datetime" />
                  </TableCell>
                  <TableCell className="text-right">
                    <UserRowActions
                      user={user}
                      onResetPassword={setResetTarget}
                      onLockToggle={setLockTarget}
                      onForceLogout={setForceLogoutTarget}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ListTableCard>
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
