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
import CustomButton from "@/components/CustomButton";
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
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("userId")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("usernameAttempted")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("method")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("status")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("ip")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("country")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("deviceType")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("browser")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("isAnomaly")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("createdAt")}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="text-muted-foreground py-12 text-center"
                >
                  {tTable("empty")}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-muted/50 border-b last:border-0"
                >
                  <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                    {item.userId ?? "—"}
                  </td>
                  <td className="px-4 py-3">{item.usernameAttempted}</td>
                  <td className="px-4 py-3">
                    {tMethod(item.method as LoginHistoryMethod)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        item.status === "success" ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      {tStatus(item.status)}
                    </Badge>
                  </td>
                  <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                    {item.ip}
                  </td>
                  <td className="px-4 py-3">
                    {item.city !== "UNKNOWN"
                      ? `${item.city}, ${item.country}`
                      : item.country}
                  </td>
                  <td className="text-muted-foreground px-4 py-3">
                    {item.deviceType}
                  </td>
                  <td className="text-muted-foreground px-4 py-3">
                    {item.browser}
                  </td>
                  <td className="px-4 py-3">
                    {item.isAnomaly ? (
                      <Badge variant="destructive" className="text-xs">
                        {tTable("anomalyYes")}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        {tTable("anomalyNo")}
                      </span>
                    )}
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-xs">
                    {formatDateTimeShort(item.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-muted-foreground text-sm">
            {tPagination("page")} {meta.page} {tPagination("of")}{" "}
            {meta.totalPages} · {meta.total} {tPagination("results")}
          </p>
          <div className="flex gap-2">
            <CustomButton
              variant="outline"
              size="sm"
              disabled={meta.page <= 1}
              onClick={() => handleGoToPage(meta.page - 1)}
            >
              {tPagination("previous")}
            </CustomButton>
            <CustomButton
              variant="outline"
              size="sm"
              disabled={meta.page >= meta.totalPages}
              onClick={() => handleGoToPage(meta.page + 1)}
            >
              {tPagination("next")}
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLoginHistoryTable;
