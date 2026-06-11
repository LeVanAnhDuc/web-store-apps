"use client";

// libs
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
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
import CustomPagination from "@/components/CustomPagination";
import LoginHistoryTableSkeleton from "../../components/LoginHistoryTableSkeleton";
import AdminLoginHistoryFilters from "../AdminLoginHistoryFilters";
// ghosts
import TableLoadingAnnouncer from "@/ghosts/TableLoadingAnnouncer";
import TableLoadedAnnouncer from "@/ghosts/TableLoadedAnnouncer";
// hooks
import { useAnnounce } from "@/hooks";
import useAdminLoginHistory from "../../hooks/useAdminLoginHistory";
// others
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  formatDateTimeShort,
  isLoginHistoryStatus,
  isLoginHistoryMethod
} from "@/utils";
import CONSTANTS from "@/constants";

const { ADMIN_LOGIN_HISTORY } = CONSTANTS.ROUTES;
const DEFAULT_PAGE_SIZE = 20;
const TABLE_COLUMN_COUNT = 7;

const AdminLoginHistoryTable = () => {
  const tTable = useTranslations("loginHistory.table");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tPagination = useTranslations("loginHistory.pagination");
  const tAnnounce = useTranslations("loginHistory.announce");
  const tFilters = useTranslations("loginHistory.filters");
  const { announce } = useAnnounce();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const statusParam = searchParams.get("status");
  const methodParam = searchParams.get("method");
  const countryParam = searchParams.get("country");
  const cityParam = searchParams.get("city");
  const fromDateParam = searchParams.get("fromDate");
  const toDateParam = searchParams.get("toDate");
  const userIdParam = searchParams.get("userId");
  const ipParam = searchParams.get("ip");
  const page = Number(searchParams.get("page") ?? 1);

  const params: AdminLoginHistoryQueryParams = {
    page,
    limit: DEFAULT_PAGE_SIZE,
    ...(isLoginHistoryStatus(statusParam) && { status: statusParam }),
    ...(isLoginHistoryMethod(methodParam) && { method: methodParam }),
    ...(countryParam && { country: countryParam }),
    ...(cityParam && { city: cityParam }),
    ...(fromDateParam && { fromDate: fromDateParam }),
    ...(toDateParam && { toDate: toDateParam }),
    ...(userIdParam && { userId: userIdParam }),
    ...(ipParam && { ip: ipParam })
  };

  const { data, isLoading } = useAdminLoginHistory(params);

  const handleGoToPage = (newPage: number) => {
    announce(tAnnounce("navigating", { page: newPage }));
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", String(newPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  const hasActiveFilters = Array.from(searchParams.keys()).some(
    (key) => key !== "page"
  );
  const handleClearFilters = () => {
    router.push(pathname);
  };

  if (isLoading) {
    return (
      <>
        <AdminLoginHistoryFilters />
        <TableLoadingAnnouncer
          isLoading={isLoading}
          message={tAnnounce("loading")}
        />
        <LoginHistoryTableSkeleton />
      </>
    );
  }

  const items = data?.items ?? [];
  const meta = data?.meta;

  return (
    <>
      <AdminLoginHistoryFilters />
      <TableLoadedAnnouncer
        total={meta?.total}
        message={
          meta?.total !== undefined
            ? tAnnounce("loaded", { total: meta.total })
            : ""
        }
      />
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
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={TABLE_COLUMN_COUNT}
                  className="py-12 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-muted-foreground text-sm">
                      {tTable("empty")}
                    </p>
                    {hasActiveFilters && (
                      <CustomButton
                        variant="outline"
                        size="sm"
                        onClick={handleClearFilters}
                      >
                        {tFilters("clear")}
                      </CustomButton>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
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
                    {formatDateTimeShort(item.createdAt)}
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
              ))
            )}
          </TableBody>
        </Table>
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between gap-2 border-t px-4 py-3">
            <p className="text-muted-foreground text-sm">
              {tPagination("page")} {meta.page} {tPagination("of")}{" "}
              {meta.totalPages} · {meta.total} {tPagination("results")}
            </p>
            <CustomPagination
              page={meta.page}
              totalPages={meta.totalPages}
              onPageChange={handleGoToPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminLoginHistoryTable;
