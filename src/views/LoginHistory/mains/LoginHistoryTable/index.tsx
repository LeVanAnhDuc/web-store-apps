"use client";
// libs
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import CustomButton from "@/components/CustomButton";
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
  const pageNumbers = (() => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const result: (number | "dots")[] = [1];
    if (page > 3) result.push("dots");
    const middleStart = Math.max(2, page - 1);
    const middleEnd = Math.min(totalPages - 1, page + 1);
    for (let i = middleStart; i <= middleEnd; i += 1) result.push(i);
    if (page < totalPages - 2) result.push("dots");
    result.push(totalPages);
    return result;
  })();
  const methodColor: Record<LoginHistoryMethod, string> = {
    password: "text-indigo-600",
    otp: "text-amber-600",
    "magic-link": "text-purple-600",
    "forgot-password": "text-slate-600"
  };
  return (
    <div className="bg-card flex flex-col overflow-hidden rounded-xl border">
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
        <h2 className="text-foreground text-base font-semibold">
          {tHeader("title")}
        </h2>
        <span className="text-muted-foreground text-xs">
          {tHeader("summary", { start, end, total })}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-y">
              <th className="text-muted-foreground px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase">
                {tTable("createdAt")}
              </th>
              <th className="text-muted-foreground px-3 py-3 text-left text-xs font-semibold tracking-wide uppercase">
                {tTable("method")}
              </th>
              <th className="text-muted-foreground px-3 py-3 text-left text-xs font-semibold tracking-wide uppercase">
                {tTable("status")}
              </th>
              <th className="text-muted-foreground px-3 py-3 text-left text-xs font-semibold tracking-wide uppercase">
                {tTable("deviceType")}
              </th>
              <th className="text-muted-foreground px-3 py-3 text-left text-xs font-semibold tracking-wide uppercase">
                {tTable("ip")}
              </th>
              <th className="text-muted-foreground px-3 py-3 text-left text-xs font-semibold tracking-wide uppercase">
                {tTable("country")}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-muted-foreground py-12 text-center"
                >
                  {tEmpty("tableEmpty")}
                </td>
              </tr>
            ) : (
              items.map((item, idx) => (
                <tr
                  key={item._id}
                  className={cn(
                    "border-b last:border-0",
                    idx % 2 === 1 && "bg-muted/30"
                  )}
                >
                  <td className="text-foreground px-4 py-3.5 text-xs font-medium">
                    {formatDateTimeShort(item.createdAt)}
                  </td>
                  <td
                    className={cn(
                      "px-3 py-3.5 text-xs font-medium",
                      methodColor[item.method]
                    )}
                  >
                    {tMethod(item.method as LoginHistoryMethod)}
                  </td>
                  <td className="px-3 py-3.5 text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          item.status === "success"
                            ? "bg-green-600"
                            : "bg-red-600"
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium",
                          item.status === "success"
                            ? "text-green-600"
                            : "text-red-600"
                        )}
                      >
                        {tStatus(item.status)}
                      </span>
                    </span>
                  </td>
                  <td className="text-foreground px-3 py-3.5 text-xs">
                    {item.deviceType !== "UNKNOWN"
                      ? `${item.deviceType} · ${item.browser}`
                      : item.browser}
                  </td>
                  <td className="text-muted-foreground px-3 py-3.5 font-mono text-xs">
                    {item.ip}
                  </td>
                  <td className="text-foreground px-3 py-3.5 text-xs">
                    {item.city !== "UNKNOWN"
                      ? `${item.city}, ${item.country}`
                      : item.country}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {meta && totalPages > 1 && (
        <div className="bg-muted/30 flex flex-wrap items-center justify-between gap-2 border-t px-5 py-3">
          <span className="text-muted-foreground text-xs font-medium">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <CustomButton
              size="icon-sm"
              variant="outline"
              disabled={page <= 1}
              onClick={() => handleGoToPage(page - 1)}
              aria-label="Previous"
            >
              <ChevronLeft className="size-4" />
            </CustomButton>
            {pageNumbers.map((num, idx) =>
              num === "dots" ? (
                <span
                  key={`dots-${idx}`}
                  className="text-muted-foreground px-1 text-xs"
                >
                  …
                </span>
              ) : (
                <CustomButton
                  key={num}
                  size="icon-sm"
                  onClick={() => handleGoToPage(num)}
                  className={cn(
                    num === page
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border-border bg-background hover:bg-muted text-foreground border"
                  )}
                >
                  {num}
                </CustomButton>
              )
            )}
            <CustomButton
              size="icon-sm"
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => handleGoToPage(page + 1)}
              aria-label="Next"
            >
              <ChevronRight className="size-4" />
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginHistoryTable;
