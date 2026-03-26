"use client";

// libs
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// types
import type {
  LoginHistoryAdminItem,
  AdminLoginHistoryQueryParams
} from "@/types/LoginHistory";
// components
import { Badge } from "@/components/ui/badge";
import CustomButton from "@/components/CustomButton";
// requests
import { getAdminLoginHistory } from "@/requests/loginHistory";
// others
import { formatDateTimeShort } from "@/utils";

const AdminLoginHistoryTable = () => {
  const tTable = useTranslations("loginHistory.table");
  const tStatus = useTranslations("loginHistory.status");
  const tMethod = useTranslations("loginHistory.method");
  const tPagination = useTranslations("loginHistory.pagination");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? 1);
  const params: AdminLoginHistoryQueryParams = {
    page,
    limit: 20,
    ...(searchParams.get("status") && {
      status: searchParams.get("status") as LoginHistoryAdminItem["status"]
    }),
    ...(searchParams.get("method") && {
      method: searchParams.get("method") as LoginHistoryAdminItem["method"]
    }),
    ...(searchParams.get("country") && {
      country: searchParams.get("country")!
    }),
    ...(searchParams.get("city") && { city: searchParams.get("city")! }),
    ...(searchParams.get("fromDate") && {
      fromDate: searchParams.get("fromDate")!
    }),
    ...(searchParams.get("toDate") && { toDate: searchParams.get("toDate")! }),
    ...(searchParams.get("userId") && { userId: searchParams.get("userId")! }),
    ...(searchParams.get("ip") && { ip: searchParams.get("ip")! })
  };

  const { data, isLoading } = useQuery({
    queryKey: ["adminLoginHistory", params],
    queryFn: () => getAdminLoginHistory(params)
  });

  const handleGoToPage = (newPage: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", String(newPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border p-6">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-muted h-10 animate-pulse rounded-lg" />
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
                    {tMethod(item.method as Parameters<typeof tMethod>[0])}
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
                        Yes
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">No</span>
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
