"use client";

// libs
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
// types
import type {
  AdminLoginHistoryQueryParams,
  LoginHistoryMethod
} from "@/types/LoginHistory";
// components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import CustomBadge from "@/components/CustomBadge";
import CustomButton from "@/components/CustomButton";
import ListPageShell from "@/components/list/ListPageShell";
import ListPageHeader from "@/components/list/ListPageHeader";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import ListPagination from "@/components/list/ListPagination";
import LoginHistoryTableSkeleton from "../../components/LoginHistoryTableSkeleton";
import FormatTime from "@/components/FormatTime";
// hooks
import { useListQuery } from "@/hooks";
import useAdminLoginHistory from "../../hooks/useAdminLoginHistory";
// dataSources
import { buildLoginHistoryFilterDefs } from "@/dataSources/LoginHistory";
// others
import { useRouter } from "@/i18n/navigation";
import { isLoginHistoryStatus, isLoginHistoryMethod } from "@/utils";
import CONSTANTS from "@/constants";

const { ADMIN_LOGIN_HISTORY } = CONSTANTS.ROUTES;

const AdminLoginHistoryTable = () => {
  const tAdmin = useTranslations("loginHistory.admin");
  const tTable = useTranslations("loginHistory.table");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tFilters = useTranslations("loginHistory.filters");
  const router = useRouter();

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
    <ListPageShell>
      <ListPageHeader
        title={tAdmin("title")}
        description={tAdmin("description")}
      />
      <ListToolbar query={query} filterDefs={filterDefs} showSearch={false} />
      <ListContent
        isLoading={isLoading}
        isEmpty={items.length === 0}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={query.clearFilters}
        skeleton={<LoginHistoryTableSkeleton />}
        emptyTitle={tTable("empty")}
      >
        <div className="bg-card rounded-xl border">
          <Table>
            <TableCaption className="sr-only">{tTable("caption")}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">{tTable("usernameAttempted")}</TableHead>
                <TableHead scope="col">{tTable("method")}</TableHead>
                <TableHead scope="col">{tTable("status")}</TableHead>
                <TableHead scope="col">{tTable("ipLocation")}</TableHead>
                <TableHead scope="col">{tTable("isAnomaly")}</TableHead>
                <TableHead scope="col">{tTable("createdAt")}</TableHead>
                <TableHead scope="col">
                  <span className="sr-only">{tTable("action")}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.usernameAttempted}</TableCell>
                  <TableCell>
                    {tMethod(item.method as LoginHistoryMethod)}
                  </TableCell>
                  <TableCell>
                    <CustomBadge
                      variant={
                        item.status === "success" ? "success" : "warning"
                      }
                      className="text-xs"
                    >
                      {tStatus(item.status)}
                    </CustomBadge>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground block font-mono text-xs">
                      {item.ip}
                    </span>
                    <span className="text-muted-foreground block text-xs">
                      {item.city !== "UNKNOWN"
                        ? `${item.city}, ${item.country}`
                        : item.country}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.isAnomaly ? (
                      <CustomBadge variant="warning" className="text-xs">
                        {tTable("anomalyYes")}
                      </CustomBadge>
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        {tTable("anomalyNo")}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    <FormatTime value={item.createdAt} variant="datetime" />
                  </TableCell>
                  <TableCell>
                    <CustomButton
                      variant="ghost"
                      size="sm"
                      iconRight={
                        <ChevronRight className="size-4" aria-hidden="true" />
                      }
                      onClick={() =>
                        router.push(`${ADMIN_LOGIN_HISTORY}/${item._id}`)
                      }
                    >
                      {tTable("viewDetail")}
                    </CustomButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
