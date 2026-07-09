"use client";

// libs
import { useMemo } from "react";
import { useTranslations } from "next-intl";
// types
import type { LoginHistoryQueryParams } from "@/types/LoginHistory";
// components
import ListPageShell from "@/components/list/ListPageShell";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import ListPagination from "@/components/list/ListPagination";
import ListTable from "@/components/list/ListTable";
import LoginHistoryTableSkeleton from "../../components/LoginHistoryTableSkeleton";
// hooks
import { useListQuery } from "@/hooks";
import useMyLoginHistory from "../../hooks/useMyLoginHistory";
// dataSources
import {
  buildLoginHistoryColumns,
  buildLoginHistoryFilterDefs
} from "@/dataSources/LoginHistory";
// others
import CONSTANTS from "@/constants";
import { isLoginHistoryStatus, isLoginHistoryMethod } from "@/utils";

const LoginHistoryTable = () => {
  const tTable = useTranslations("loginHistory.table");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tFilters = useTranslations("loginHistory.filters");
  const tLocation = useTranslations("loginHistory.location");

  const filterDefs = useMemo(
    () => buildLoginHistoryFilterDefs(tStatus, tMethod, tFilters),
    [tStatus, tMethod, tFilters]
  );

  const columns = useMemo(
    () => buildLoginHistoryColumns(tTable, tStatus, tMethod, tLocation),
    [tTable, tStatus, tMethod, tLocation]
  );

  const query = useListQuery(filterDefs);

  const params: LoginHistoryQueryParams = {
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

  const { data, isLoading } = useMyLoginHistory(params);
  const items = data?.items ?? [];
  const meta = data?.meta;

  const hasActiveFilters =
    query.activeFilterCount > 0 || Boolean(query.appliedSearch);

  return (
    <ListPageShell fullHeight>
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

export default LoginHistoryTable;
