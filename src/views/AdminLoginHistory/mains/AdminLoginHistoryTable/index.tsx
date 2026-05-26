"use client";

// libs
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
// types
import type {
  AdminLoginHistoryQueryParams,
  LoginHistoryMethod
} from "@/types/LoginHistory";
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
import CustomBadge from "@/components/CustomBadge";
import CustomButton from "@/components/CustomButton";
import CustomPagination from "@/components/CustomPagination";
// ghosts
import TableLoadingAnnouncer from "@/ghosts/TableLoadingAnnouncer";
import TableLoadedAnnouncer from "@/ghosts/TableLoadedAnnouncer";
// hooks
import { useAnnounce } from "@/hooks";
// requests
import { getAdminLoginHistory } from "@/requests/loginHistory";
// others
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  formatDateTimeShort,
  isLoginHistoryStatus,
  isLoginHistoryMethod
} from "@/utils";

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
    limit: 20,
    ...(isLoginHistoryStatus(statusParam) && { status: statusParam }),
    ...(isLoginHistoryMethod(methodParam) && { method: methodParam }),
    ...(countryParam && { country: countryParam }),
    ...(cityParam && { city: cityParam }),
    ...(fromDateParam && { fromDate: fromDateParam }),
    ...(toDateParam && { toDate: toDateParam }),
    ...(userIdParam && { userId: userIdParam }),
    ...(ipParam && { ip: ipParam })
  };
  const { data, isLoading } = useQuery({
    queryKey: ["adminLoginHistory", params],
    queryFn: () => getAdminLoginHistory(params)
  });
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
        <TableLoadingAnnouncer
          isLoading={isLoading}
          message={tAnnounce("loading")}
        />
        <div className="bg-card rounded-xl border p-6">
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={`skeleton-${i}`} className="h-10 rounded-lg" />
            ))}
          </div>
        </div>
      </>
    );
  }
  const items = data?.items ?? [];
  const meta = data?.meta;
  return (
    <>
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
          <TableHeader>
            <TableRow>
              <TableHead>{tTable("userId")}</TableHead>
              <TableHead>{tTable("usernameAttempted")}</TableHead>
              <TableHead>{tTable("method")}</TableHead>
              <TableHead>{tTable("status")}</TableHead>
              <TableHead>{tTable("ip")}</TableHead>
              <TableHead>{tTable("country")}</TableHead>
              <TableHead>{tTable("deviceType")}</TableHead>
              <TableHead>{tTable("browser")}</TableHead>
              <TableHead>{tTable("isAnomaly")}</TableHead>
              <TableHead>{tTable("createdAt")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="py-12 text-center">
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
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {item.userId ?? "—"}
                  </TableCell>
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
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {item.ip}
                  </TableCell>
                  <TableCell>
                    {item.city !== "UNKNOWN"
                      ? `${item.city}, ${item.country}`
                      : item.country}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.deviceType}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.browser}
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
