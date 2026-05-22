"use client";

// libs
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// types
import type {
  LoginHistoryQueryParams,
  LoginHistoryMethod
} from "@/types/LoginHistory";
// components
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import CustomPagination from "@/components/CustomPagination";
// hooks
import { useAnnounce } from "@/hooks";
// requests
import { getMyLoginHistory } from "@/requests/loginHistory";
// others
import {
  formatDateTimeShort,
  isLoginHistoryStatus,
  isLoginHistoryMethod
} from "@/utils";
import { cn } from "@/libs/utils";

const LoginHistoryTable = () => {
  const tTable = useTranslations("loginHistory.table");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tHeader = useTranslations("loginHistory.tableHeader");
  const tAnnounce = useTranslations("loginHistory.announce");
  const tEmpty = useTranslations("loginHistory");
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
  const page = Number(searchParams.get("page") ?? 1);
  const params: LoginHistoryQueryParams = {
    page,
    limit: 10,
    ...(isLoginHistoryStatus(statusParam) && { status: statusParam }),
    ...(isLoginHistoryMethod(methodParam) && { method: methodParam }),
    ...(countryParam && { country: countryParam }),
    ...(cityParam && { city: cityParam }),
    ...(fromDateParam && { fromDate: fromDateParam }),
    ...(toDateParam && { toDate: toDateParam })
  };
  const { data, isLoading } = useQuery({
    queryKey: ["loginHistory", params],
    queryFn: () => getMyLoginHistory(params)
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
  const total = meta?.total ?? 0;
  const start = total === 0 ? 0 : (page - 1) * (meta?.limit ?? 10) + 1;
  const end = Math.min(page * (meta?.limit ?? 10), total);
  const totalPages = meta?.totalPages ?? 1;
  const methodColor: Record<LoginHistoryMethod, string> = {
    password: "text-foreground",
    otp: "text-warning-foreground",
    "magic-link": "text-info",
    "forgot-password": "text-muted-foreground"
  };
  return (
    <div className="bg-card flex flex-col overflow-hidden rounded-xl border">
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
        <h2
          id="login-history-table-title"
          className="text-foreground text-base font-semibold"
        >
          {tHeader("title")}
        </h2>
        <span className="text-muted-foreground text-xs" aria-live="polite">
          {tHeader("summary", { start, end, total })}
        </span>
      </div>
      <Table aria-labelledby="login-history-table-title">
        <TableCaption className="sr-only">{tHeader("title")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{tTable("createdAt")}</TableHead>
            <TableHead>{tTable("method")}</TableHead>
            <TableHead>{tTable("status")}</TableHead>
            <TableHead>{tTable("deviceType")}</TableHead>
            <TableHead>{tTable("ip")}</TableHead>
            <TableHead>{tTable("country")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-muted-foreground py-12 text-center"
              >
                {tEmpty("tableEmpty")}
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {formatDateTimeShort(item.createdAt)}
                </TableCell>
                <TableCell
                  className={cn("font-medium", methodColor[item.method])}
                >
                  {tMethod(item.method as LoginHistoryMethod)}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        item.status === "success"
                          ? "bg-success"
                          : "bg-destructive"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "font-medium",
                        item.status === "success"
                          ? "text-success"
                          : "text-destructive"
                      )}
                    >
                      {tStatus(item.status)}
                    </span>
                  </span>
                </TableCell>
                <TableCell>
                  {item.deviceType !== "UNKNOWN"
                    ? `${item.deviceType} · ${item.browser}`
                    : item.browser}
                </TableCell>
                <TableCell className="text-muted-foreground font-mono">
                  {item.ip}
                </TableCell>
                <TableCell>
                  {item.city !== "UNKNOWN"
                    ? `${item.city}, ${item.country}`
                    : item.country}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {meta && totalPages > 1 && (
        <div className="bg-muted/30 border-t px-5 py-3">
          <CustomPagination
            page={page}
            totalPages={totalPages}
            onPageChange={handleGoToPage}
          />
        </div>
      )}
    </div>
  );
};

export default LoginHistoryTable;
