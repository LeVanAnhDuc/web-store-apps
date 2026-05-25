"use client";

// libs
import { useState } from "react";
import { useSearchParams } from "next/navigation";
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
import UserRoleBadge from "../../components/UserRoleBadge";
import UserStatusBadge from "../../components/UserStatusBadge";
import UserRowActions from "../../components/UserRowActions";
import UsersTableSkeleton from "../../components/UsersTableSkeleton";
import UsersEmptyState from "../../components/UsersEmptyState";
import AdminUsersToolbar from "../AdminUsersToolbar";
import AdminUsersResetPasswordDialog from "../AdminUsersResetPasswordDialog";
import AdminUsersLockDialog from "../AdminUsersLockDialog";
import AdminUsersForceLogoutDialog from "../AdminUsersForceLogoutDialog";
// hooks
import useAdminUsersList from "../../hooks/useAdminUsersList";
// others
import { formatDateTimeShort } from "@/utils";
// constants
import CONSTANTS from "@/constants";

const TABLE_COLUMN_COUNT = 6;

const isRole = (value: unknown): value is AuthenticationRole =>
  value === CONSTANTS.AUTHENTICATION_ROLES.USER ||
  value === CONSTANTS.AUTHENTICATION_ROLES.ADMIN;

const isStatus = (value: unknown): value is AdminUserStatusFilter =>
  value === "active" || value === "locked";

const AdminUsersTable = () => {
  const t = useTranslations("adminUsers.table");
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const roleParam = searchParams.get("role");
  const statusParam = searchParams.get("status");

  const params: AdminUsersQueryParams = {
    ...(search && { search }),
    ...(isRole(roleParam) && { role: roleParam }),
    ...(isStatus(statusParam) && { status: statusParam })
  };

  const [resetTarget, setResetTarget] = useState<AdminUser | null>(null);
  const [lockTarget, setLockTarget] = useState<AdminUser | null>(null);
  const [forceLogoutTarget, setForceLogoutTarget] = useState<AdminUser | null>(
    null
  );

  const { data, isLoading } = useAdminUsersList(params);
  const items = data?.items ?? [];

  return (
    <>
      <AdminUsersToolbar />
      {isLoading ? (
        <UsersTableSkeleton />
      ) : (
        <div className="bg-card rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("user")}</TableHead>
                <TableHead>{t("role")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("lastLoginAt")}</TableHead>
                <TableHead>{t("createdAt")}</TableHead>
                <TableHead className="w-12 text-right">
                  <span className="sr-only">{t("actions")}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={TABLE_COLUMN_COUNT}>
                    <UsersEmptyState />
                  </TableCell>
                </TableRow>
              ) : (
                items.map((user) => (
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
                      {user.lastLoginAt
                        ? formatDateTimeShort(user.lastLoginAt)
                        : t("neverLoggedIn")}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {formatDateTimeShort(user.createdAt)}
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
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
    </>
  );
};

export default AdminUsersTable;
