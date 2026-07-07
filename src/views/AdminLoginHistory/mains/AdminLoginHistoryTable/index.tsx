"use client";

// libs
import { useMemo } from "react";
import { useTranslations } from "next-intl";
// types
import type { AdminLoginHistoryQueryParams } from "@/types/LoginHistory";
// components
import ListPageShell from "@/components/list/ListPageShell";
import ListPageHeader from "@/components/list/ListPageHeader";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import ListPagination from "@/components/list/ListPagination";
import ListTable from "@/components/list/ListTable";
import LoginHistoryTableSkeleton from "../../components/LoginHistoryTableSkeleton";
// hooks
import { useListQuery } from "@/hooks";
import useAdminLoginHistory from "../../hooks/useAdminLoginHistory";
// dataSources
import {
  buildAdminLoginHistoryColumns,
  buildLoginHistoryFilterDefs
} from "@/dataSources/LoginHistory";
// others
import { isLoginHistoryStatus, isLoginHistoryMethod } from "@/utils";
import CONSTANTS from "@/constants";

const { ADMIN_LOGIN_HISTORY } = CONSTANTS.ROUTES;

const AdminLoginHistoryTable = () => {
  const tAdmin = useTranslations("loginHistory.admin");
  const tTable = useTranslations("loginHistory.table");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tFilters = useTranslations("loginHistory.filters");
  const tLocation = useTranslations("loginHistory.location");

  const filterDefs = useMemo(
    () =>
      buildLoginHistoryFilterDefs(
        (k) => tStatus(k as Parameters<typeof tStatus>[0]),
        (k) => tMethod(k as Parameters<typeof tMethod>[0]),
        (k) => tFilters(k as Parameters<typeof tFilters>[0])
      ),
    [tStatus, tMethod, tFilters]
  );

  const columns = useMemo(
    () =>
      buildAdminLoginHistoryColumns(
        (k) => tTable(k as Parameters<typeof tTable>[0]),
        (k) => tMethod(k as Parameters<typeof tMethod>[0]),
        (k) => tStatus(k as Parameters<typeof tStatus>[0]),
        (k) => tLocation(k as Parameters<typeof tLocation>[0])
      ),
    [tTable, tMethod, tStatus, tLocation]
  );

  const query = useListQuery(filterDefs);

  const params: AdminLoginHistoryQueryParams = {
    page: query.page,
    limit: CONSTANTS.LIST.DEFAULT_PAGE_SIZE,
    ...(isLoginHistoryStatus(query.filters.status) && {
      status: query.filters.status
    }),
    ...(isLoginHistoryMethod(query.filters.method) && {
      method: query.filters.method
    }),
    ...(query.filters.fromDate && { fromDate: query.filters.fromDate }),
    ...(query.filters.toDate && { toDate: query.filters.toDate })
  };

  const { data, isLoading } = useAdminLoginHistory(params);
  const items = data?.items ?? [];
  const meta = data?.meta;

  const hasActiveFilters =
    query.activeFilterCount > 0 || Boolean(query.appliedSearch);

  return (
    <ListPageShell fullHeight>
      <ListPageHeader
        title={tAdmin("title")}
        description={tAdmin("description")}
      />
      <ListToolbar query={query} filterDefs={filterDefs} showSearch={false} />
      <ListContent
        fullHeight
        isLoading={isLoading}
        isEmpty={items.length === 0}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={query.clearFilters}
        skeleton={<LoginHistoryTableSkeleton />}
        emptyTitle={tTable("empty")}
      >
        <ListTable
          columns={columns}
          rows={items}
          getRowKey={(r) => r._id}
          caption={tTable("caption")}
          getRowHref={(r) => `${ADMIN_LOGIN_HISTORY}/${r._id}`}
          rowLabel={(r) =>
            tTable("viewDetailFor", { name: r.usernameAttempted })
          }
        />
      </ListContent>
      <ListPagination
        page={meta?.page ?? query.page}
        totalPages={meta?.totalPages ?? 1}
        total={meta?.total ?? 0}
        onPageChange={query.setPage}
        loading={isLoading}
      />
    </ListPageShell>
  );
};

export default AdminLoginHistoryTable;
