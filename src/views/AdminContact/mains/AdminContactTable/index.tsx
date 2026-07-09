"use client";

// libs
import { useMemo } from "react";
import { useTranslations } from "next-intl";
// types
import type { AdminContactQuery } from "@/types/ContactAdmin";
// components
import ListPageShell from "@/components/list/ListPageShell";
import ListPageHeader from "@/components/list/ListPageHeader";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import ListTable from "@/components/list/ListTable";
import ListPagination from "@/components/list/ListPagination";
import ContactTableSkeleton from "../../components/ContactTableSkeleton";
// hooks
import { useListQuery } from "@/hooks";
import useAdminContactList from "../../hooks/useAdminContactList";
// dataSources
import {
  buildAdminContactColumns,
  buildAdminContactFilterDefs
} from "@/dataSources/ContactAdmin";
// others
import CONSTANTS from "@/constants";
import { isContactStatus } from "@/utils";

const { ADMIN_CONTACT } = CONSTANTS.ROUTES;

const AdminContactTable = () => {
  const tPage = useTranslations("contactAdmin.admin.list");
  const tTable = useTranslations("contactAdmin.admin.list.table");
  const tStatus = useTranslations("contactAdmin.admin.list.status");
  const tFilters = useTranslations("contactAdmin.admin.list.filters");
  const tList = useTranslations("list");

  const filterDefs = useMemo(
    () =>
      buildAdminContactFilterDefs(tStatus, {
        status: tFilters("status"),
        email: tFilters("email"),
        dateRange: tList("dateRange.label"),
        emailPh: tFilters("email")
      }),
    [tStatus, tFilters, tList]
  );

  const query = useListQuery(filterDefs);

  const columns = useMemo(
    () => buildAdminContactColumns(tTable, tStatus),
    [tTable, tStatus]
  );

  const params: AdminContactQuery = {
    page: query.page,
    limit: CONSTANTS.LIST.DEFAULT_PAGE_SIZE,
    ...(query.appliedSearch && { search: query.appliedSearch }),
    ...(isContactStatus(query.filters.status) && {
      status: query.filters.status
    }),
    ...(query.filters.email && { email: query.filters.email }),
    ...(query.filters.fromDate && { fromDate: query.filters.fromDate }),
    ...(query.filters.toDate && { toDate: query.filters.toDate })
  };

  const { data, isLoading } = useAdminContactList(params);
  const items = data?.items ?? [];
  const meta = data?.meta;

  const hasActiveFilters =
    query.activeFilterCount > 0 || Boolean(query.appliedSearch);

  return (
    <ListPageShell fullHeight>
      <ListPageHeader
        title={tPage("title")}
        description={tPage("description")}
      />
      <ListToolbar
        query={query}
        filterDefs={filterDefs}
        searchPlaceholder={tFilters("searchPlaceholder")}
      />
      <ListContent
        fullHeight
        isLoading={isLoading}
        isEmpty={items.length === 0}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={query.clearFilters}
        skeleton={<ContactTableSkeleton />}
        emptyTitle={tTable("empty")}
      >
        <ListTable
          columns={columns}
          rows={items}
          getRowKey={(r) => r._id}
          getRowHref={(r) => `${ADMIN_CONTACT}/${r._id}`}
          rowLabel={(r) => tTable("viewDetailFor", { id: r._id })}
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

export default AdminContactTable;
