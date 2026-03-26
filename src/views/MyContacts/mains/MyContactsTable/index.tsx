"use client";

// libs
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// types
import type { MyContactsQuery, ContactStatus } from "@/types/ContactAdmin";
// components
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import CustomButton from "@/components/CustomButton";
import { Link } from "@/i18n/navigation";
// hooks
import { useAnnounce } from "@/hooks";
// requests
import { getMyContacts } from "@/requests/contactAdmin";
// dataSources
import { CONTACT_STATUS_VARIANT } from "@/dataSources/ContactAdmin";
// others
import CONSTANTS from "@/constants";
import { formatDateShort } from "@/utils";

const { CONTACT_ADMIN } = CONSTANTS.ROUTES;

const MyContactsTable = () => {
  const tTable = useTranslations("contactAdmin.myContacts.table");
  const tStatus = useTranslations("contactAdmin.admin.list.status");
  const tCategory = useTranslations("contactAdmin.form.category");
  const tPagination = useTranslations("loginHistory.pagination");
  const tAnnounce = useTranslations("loginHistory.announce");
  const t = useTranslations("contactAdmin.myContacts");
  const { announce } = useAnnounce();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? 1);
  const params: MyContactsQuery = { page, limit: 20 };

  const { data, isLoading } = useQuery({
    queryKey: ["myContacts", params],
    queryFn: () => getMyContacts(params)
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

  if (items.length === 0) {
    return (
      <div className="bg-card rounded-xl border p-12 text-center">
        <p className="text-muted-foreground mb-4 text-sm">{tTable("empty")}</p>
        <Link href={CONTACT_ADMIN}>
          <CustomButton size="sm">{t("submitNew")}</CustomButton>
        </Link>
      </div>
    );
  }

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
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-muted/50 border-b last:border-0"
              >
                <td className="px-4 py-3 font-mono text-xs font-medium">
                  {item.ticketNumber}
                </td>
                <td className="max-w-[200px] truncate px-4 py-3">
                  {item.subject}
                </td>
                <td className="text-muted-foreground px-4 py-3">
                  {tCategory(item.category)}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      CONTACT_STATUS_VARIANT[item.status as ContactStatus]
                    }
                    className="text-xs"
                  >
                    {tStatus(item.status as ContactStatus)}
                  </Badge>
                </td>
                <td className="text-muted-foreground px-4 py-3 text-center">
                  {item.attachmentCount > 0 ? item.attachmentCount : "—"}
                </td>
                <td className="text-muted-foreground px-4 py-3 text-xs">
                  {formatDateShort(item.createdAt)}
                </td>
              </tr>
            ))}
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

export default MyContactsTable;
