"use client";

// libs
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
// types
import type {
  AdminAppCreateResult,
  AdminAppsQueryParams,
  AppStatus,
  WebApp
} from "@/types/AdminApps";
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
import CustomButton from "@/components/CustomButton";
import AppStatusBadge from "../../components/AppStatusBadge";
import RoleChip from "../../components/RoleChip";
import AppRowActions from "../../components/AppRowActions";
import AdminAppsLoading from "../../components/AdminAppsLoading";
import AdminAppsFormSheet from "../AdminAppsFormSheet";
import AdminAppsHideDialog from "../AdminAppsHideDialog";
import AdminAppsSecretDialog from "../AdminAppsSecretDialog";
import FormatTime from "@/components/FormatTime";
// hooks
import { useListQuery, useAnnounce } from "@/hooks";
import useSetAdminAppStatus from "../../hooks/useSetAdminAppStatus";
// dataSources
import {
  APP_STATUSES,
  buildAdminAppsFilterDefs
} from "@/dataSources/AdminApps";
// requests
import { getAdminApps, getAdminAppCategories } from "@/requests/adminApps";
// others
import CONSTANTS from "@/constants";
import { resolveCategoryLabel } from "@/utils";

const isAppStatus = (value: unknown): value is AppStatus =>
  typeof value === "string" && APP_STATUSES.includes(value as AppStatus);

const AdminAppsTable = () => {
  const t = useTranslations("adminApps");
  const tTable = useTranslations("adminApps.table");
  const tToolbar = useTranslations("adminApps.toolbar");
  const tActions = useTranslations("adminApps.actions");
  const tStatus = useTranslations("adminApps.status");
  const tAnnounce = useTranslations("adminApps.announce");
  const tCategory = useTranslations("common.categories");
  const { announce } = useAnnounce();
  const setStatusMutation = useSetAdminAppStatus();

  const [formOpen, setFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<WebApp | null>(null);
  const [hideTarget, setHideTarget] = useState<WebApp | null>(null);
  const [createdApp, setCreatedApp] = useState<AdminAppCreateResult | null>(
    null
  );

  const { data: categories = [] } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_APP_CATEGORIES],
    queryFn: getAdminAppCategories
  });

  const statusOptions = useMemo(
    () =>
      APP_STATUSES.map((s) => ({
        value: s,
        label: tStatus(s as Parameters<typeof tStatus>[0])
      })),
    [tStatus]
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((cat) => ({
        value: cat._id,
        label: resolveCategoryLabel(tCategory, cat.slug, cat.name)
      })),
    [categories, tCategory]
  );

  const filterDefs = useMemo(
    () =>
      buildAdminAppsFilterDefs(statusOptions, categoryOptions, {
        status: tToolbar("status" as Parameters<typeof tToolbar>[0]),
        category: tToolbar("category" as Parameters<typeof tToolbar>[0])
      }),
    [statusOptions, categoryOptions, tToolbar]
  );

  const query = useListQuery(filterDefs);

  const params: AdminAppsQueryParams = {
    ...(query.appliedSearch && { search: query.appliedSearch }),
    ...(isAppStatus(query.filters.status) && { status: query.filters.status }),
    ...(query.filters.categoryId && { categoryId: query.filters.categoryId })
  };

  const { data, isLoading } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.ADMIN_APPS, params],
    queryFn: () => getAdminApps(params)
  });

  const categoryMap = useMemo(
    () =>
      new Map(
        categories.map((c) => [
          c._id,
          resolveCategoryLabel(tCategory, c.slug, c.name)
        ])
      ),
    [categories, tCategory]
  );

  const items = data?.items ?? [];
  const hasActiveFilters =
    query.activeFilterCount > 0 || Boolean(query.appliedSearch);

  const handleCreate = () => {
    setEditingApp(null);
    setFormOpen(true);
  };

  const handleEdit = (app: WebApp) => {
    setEditingApp(app);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingApp(null);
  };

  const handleHide = (app: WebApp) => setHideTarget(app);
  const handleCloseHide = () => setHideTarget(null);

  const handleUnhide = (app: WebApp) =>
    setStatusMutation.mutate(
      { id: app._id, status: CONSTANTS.APP_STATUS.ACTIVE },
      {
        onSuccess: () =>
          announce(tAnnounce("reactivated", { name: app.displayName }))
      }
    );

  const handleCloseSecret = () => setCreatedApp(null);

  return (
    <ListPageShell fullHeight>
      <ListPageHeader
        title={t("title")}
        description={t("description")}
        action={
          <CustomButton
            onClick={handleCreate}
            iconLeft={<Plus aria-hidden="true" />}
          >
            {tActions("create")}
          </CustomButton>
        }
      />
      <ListToolbar
        query={query}
        filterDefs={filterDefs}
        searchPlaceholder={tToolbar(
          "searchPlaceholder" as Parameters<typeof tToolbar>[0]
        )}
      />
      <ListContent
        fullHeight
        isLoading={isLoading}
        isEmpty={items.length === 0}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={query.clearFilters}
        skeleton={<AdminAppsLoading />}
        emptyTitle={tTable("empty")}
        emptyDescription={tTable("emptyCta")}
      >
        <ListTableCard>
          <Table containerClassName="md:h-full">
            <TableHeader>
              <TableRow>
                <TableHead>{tTable("app")}</TableHead>
                <TableHead>{tTable("category")}</TableHead>
                <TableHead>{tTable("status")}</TableHead>
                <TableHead>{tTable("roles")}</TableHead>
                <TableHead>{tTable("redirectUris")}</TableHead>
                <TableHead>{tTable("updatedAt")}</TableHead>
                <TableHead className="w-12 text-right">
                  <span className="sr-only">{tTable("actions")}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((app) => (
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
                    <FormatTime value={app.updatedAt} variant="datetime" />
                  </TableCell>
                  <TableCell className="text-right">
                    <AppRowActions
                      app={app}
                      onEdit={handleEdit}
                      onHide={handleHide}
                      onUnhide={handleUnhide}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ListTableCard>
      </ListContent>
      <ListPagination
        page={query.page}
        totalPages={1}
        total={items.length}
        onPageChange={query.setPage}
        loading={isLoading}
      />
      <AdminAppsFormSheet
        open={formOpen}
        editingApp={editingApp}
        onClose={handleCloseForm}
        onCreated={setCreatedApp}
      />
      <AdminAppsHideDialog target={hideTarget} onClose={handleCloseHide} />
      <AdminAppsSecretDialog app={createdApp} onClose={handleCloseSecret} />
    </ListPageShell>
  );
};

export default AdminAppsTable;
