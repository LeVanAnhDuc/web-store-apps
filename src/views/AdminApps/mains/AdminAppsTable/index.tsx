"use client";

// libs
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LayoutGrid } from "lucide-react";
// types
import type {
  AdminAppsQueryParams,
  AppStatus,
  WebApp
} from "@/types/AdminApps";
// components
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import AppStatusBadge from "../../components/AppStatusBadge";
import RoleChip from "../../components/RoleChip";
import AppRowActions from "../../components/AppRowActions";
// dataSources
import { APP_STATUSES } from "@/dataSources/AdminApps";
// requests
import { getAdminApps, getAdminAppCategories } from "@/requests/adminApps";
// others
import { formatDateTimeShort } from "@/utils";

const ADMIN_APPS_QUERY_KEY = "adminApps";
const ADMIN_APP_CATEGORIES_QUERY_KEY = "adminAppCategories";
const TABLE_COLUMN_COUNT = 7;
const SKELETON_ROW_COUNT = 4;

const isAppStatus = (value: unknown): value is AppStatus =>
  typeof value === "string" && APP_STATUSES.includes(value as AppStatus);

const AdminAppsTable = ({
  onEdit,
  onDelete
}: {
  onEdit: (app: WebApp) => void;
  onDelete: (app: WebApp) => void;
}) => {
  const t = useTranslations("adminApps.table");
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const statusParam = searchParams.get("status");
  const categoryId = searchParams.get("categoryId");

  const params: AdminAppsQueryParams = {
    ...(search && { search }),
    ...(isAppStatus(statusParam) && { status: statusParam }),
    ...(categoryId && { categoryId })
  };

  const { data, isLoading } = useQuery({
    queryKey: [ADMIN_APPS_QUERY_KEY, params],
    queryFn: () => getAdminApps(params)
  });

  const { data: categories = [] } = useQuery({
    queryKey: [ADMIN_APP_CATEGORIES_QUERY_KEY],
    queryFn: getAdminAppCategories
  });

  const categoryMap = new Map(categories.map((c) => [c._id, c.name]));

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border p-4">
        <div className="flex flex-col gap-2">
          {Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
            <Skeleton key={`skeleton-${i}`} className="h-12 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const items = data?.items ?? [];

  return (
    <div className="bg-card rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("app")}</TableHead>
            <TableHead>{t("category")}</TableHead>
            <TableHead>{t("status")}</TableHead>
            <TableHead>{t("roles")}</TableHead>
            <TableHead>{t("redirectUris")}</TableHead>
            <TableHead>{t("updatedAt")}</TableHead>
            <TableHead className="w-12 text-right">
              <span className="sr-only">{t("actions")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={TABLE_COLUMN_COUNT} className="py-16">
                <div className="flex flex-col items-center gap-2 text-center">
                  <LayoutGrid
                    className="text-muted-foreground size-8"
                    aria-hidden="true"
                  />
                  <p className="text-foreground text-sm font-medium">
                    {t("empty")}
                  </p>
                  <p className="text-muted-foreground max-w-sm text-sm">
                    {t("emptyCta")}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            items.map((app) => (
              <TableRow key={app._id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium">
                      {app.displayName}
                    </span>
                    <span className="text-muted-foreground font-mono text-xs">
                      {app.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {categoryMap.get(app.categoryId) ?? "—"}
                </TableCell>
                <TableCell>
                  <AppStatusBadge status={app.status} />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {app.requiredRoles.map((role) => (
                      <RoleChip key={role} role={role} />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {app.redirectUris.length}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {formatDateTimeShort(app.updatedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <AppRowActions
                    app={app}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminAppsTable;
