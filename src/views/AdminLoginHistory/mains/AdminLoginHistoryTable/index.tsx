"use client";

// libs
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// types
import type {
  AdminLoginHistoryQueryParams,
  LoginHistoryMethod
} from "@/types/LoginHistory";
// components
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import CustomPagination from "@/components/CustomPagination";
// hooks
import { useAnnounce } from "@/hooks";
// requests
import { getAdminLoginHistory } from "@/requests/loginHistory";
// others
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
  useEffect(() => {
    if (isLoading) announce(tAnnounce("loading"));
  }, [isLoading, announce, tAnnounce]);
  useEffect(() => {
    if (data) announce(tAnnounce("loaded", { total: data.meta?.total ?? 0 }));
  }, [data, announce, tAnnounce]);
  const handleGoToPage = (newPage: number) => {
    announce(tAnnounce("navigating", { page: newPage }));
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", String(newPage));
    router.push(`${pathname}?${next.toString()}`);
  };
  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border p-6">
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={`skeleton-${i}`} className="h-10 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  const items = data?.items ?? [];
  const meta = data?.meta;
  return (
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
              <TableCell
                colSpan={10}
                className="text-muted-foreground py-12 text-center"
              >
                {tTable("empty")}
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
                  <Badge
                    variant={
                      item.status === "success" ? "default" : "destructive"
                    }
                    className="text-xs"
                  >
                    {tStatus(item.status)}
                  </Badge>
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
                    <Badge variant="destructive" className="text-xs">
                      {tTable("anomalyYes")}
                    </Badge>
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
  );
};

export default AdminLoginHistoryTable;
