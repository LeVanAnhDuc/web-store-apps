"use client";

// libs
import { useMemo } from "react";
import { useTranslations } from "next-intl";
// types
import type { LoginHistoryQueryParams } from "@/types/LoginHistory";
// components
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import ListPageShell from "@/components/list/ListPageShell";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import ListTableCard from "@/components/list/ListTableCard";
import ListPagination from "@/components/list/ListPagination";
import LoginHistoryTableRow from "../../components/LoginHistoryTableRow";
import LoginHistoryTableSkeleton from "../../components/LoginHistoryTableSkeleton";
// hooks
import { useListQuery } from "@/hooks";
import useMyLoginHistory from "../../hooks/useMyLoginHistory";
// dataSources
import { buildLoginHistoryFilterDefs } from "@/dataSources/LoginHistory";
// others
import CONSTANTS from "@/constants";
import { isLoginHistoryStatus, isLoginHistoryMethod } from "@/utils";

const LoginHistoryTable = () => {
  const tTable = useTranslations("loginHistory.table");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tFilters = useTranslations("loginHistory.filters");

  const filterDefs = useMemo(
    () =>
      buildLoginHistoryFilterDefs(
        (k) => tStatus(k as Parameters<typeof tStatus>[0]),
        (k) => tMethod(k as Parameters<typeof tMethod>[0]),
        (k) => tFilters(k as Parameters<typeof tFilters>[0])
      ),
    [tStatus, tMethod, tFilters]
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
        <ListTableCard>
          <Table containerClassName="md:h-full">
            <TableCaption className="sr-only">{tTable("caption")}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">{tTable("createdAt")}</TableHead>
                <TableHead scope="col">{tTable("method")}</TableHead>
                <TableHead scope="col">{tTable("status")}</TableHead>
                <TableHead scope="col">{tTable("deviceType")}</TableHead>
                <TableHead scope="col">{tTable("ip")}</TableHead>
                <TableHead scope="col">{tTable("country")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <LoginHistoryTableRow key={item._id} item={item} />
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
    </ListPageShell>
  );
};

export default LoginHistoryTable;
