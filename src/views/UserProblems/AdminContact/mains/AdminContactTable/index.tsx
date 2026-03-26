"use client";

// libs
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// types
import type { AdminContactQuery, ContactStatus } from "@/types/ContactAdmin";
// components
import { Badge } from "@/components/ui/badge";
import CustomButton from "@/components/CustomButton";
// requests
import { getAdminContact } from "@/requests/contactAdmin";
// dataSources
import { CONTACT_STATUS_VARIANT } from "@/dataSources/ContactAdmin";
// others
import CONSTANTS from "@/constants";
import { formatDateShort } from "@/utils";

const { ADMIN_CONTACTS } = CONSTANTS.ROUTES;

const AdminContactTable = () => {
  const tTable = useTranslations("contactAdmin.admin.list.table");
  const tStatus = useTranslations("contactAdmin.admin.list.status");
  const tCategory = useTranslations("contactAdmin.form.category");
  const tPagination = useTranslations("loginHistory.pagination");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? 1);
  const params: AdminContactQuery = {
    page,
    limit: 20,
    ...(searchParams.get("status") && {
      status: searchParams.get("status") as ContactStatus
    }),
    ...(searchParams.get("category") && {
      category: searchParams.get("category") as AdminContactQuery["category"]
    }),
    ...(searchParams.get("email") && { email: searchParams.get("email")! }),
    ...(searchParams.get("ticketNumber") && {
      ticketNumber: searchParams.get("ticketNumber")!
    }),
    ...(searchParams.get("search") && { search: searchParams.get("search")! }),
    ...(searchParams.get("fromDate") && {
      fromDate: searchParams.get("fromDate")!
    }),
    ...(searchParams.get("toDate") && { toDate: searchParams.get("toDate")! })
  };

  const { data, isLoading } = useQuery({
    queryKey: ["AdminContact", params],
    queryFn: () => getAdminContact(params)
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
            <div
              key={`skeleton-${i}`}
              className="bg-muted h-10 animate-pulse rounded-lg"
            />
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
                {tTable("ticketNumber")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("email")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("subject")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("category")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("status")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("attachments")}
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {tTable("createdAt")}
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
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
                  <td className="px-4 py-3 font-mono text-xs font-medium">
                    {item.ticketNumber}
                  </td>
                  <td className="text-muted-foreground px-4 py-3">
                    {item.email || "—"}
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3">
                    {item.subject}
                  </td>
                  <td className="text-muted-foreground px-4 py-3">
                    {tCategory(item.category)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={CONTACT_STATUS_VARIANT[item.status]}
                      className="text-xs"
                    >
                      {tStatus(item.status)}
                    </Badge>
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-center">
                    {item.attachmentCount > 0 ? item.attachmentCount : "—"}
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-xs">
                    {formatDateShort(item.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <CustomButton
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`${ADMIN_CONTACTS}/${item._id}`)
                      }
                    >
                      {tTable("viewDetail")}
                    </CustomButton>
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

export default AdminContactTable;
