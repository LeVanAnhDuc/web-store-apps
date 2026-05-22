"use client";

// libs
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// types
import type { AdminContactQuery } from "@/types/ContactAdmin";
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
import CustomButton from "@/components/CustomButton";
import CustomPagination from "@/components/CustomPagination";
// hooks
import { useAnnounce } from "@/hooks";
// requests
import { getAdminContact } from "@/requests/contactAdmin";
// dataSources
import { CONTACT_STATUS_VARIANT } from "@/dataSources/ContactAdmin";
// others
import CONSTANTS from "@/constants";
import { formatDateShort, isContactStatus, isContactCategory } from "@/utils";

const { ADMIN_CONTACTS } = CONSTANTS.ROUTES;

const AdminContactTable = () => {
  const tTable = useTranslations("contactAdmin.admin.list.table");
  const tStatus = useTranslations("contactAdmin.admin.list.status");
  const tCategory = useTranslations("contactAdmin.form.category");
  const tPagination = useTranslations("loginHistory.pagination");
  const tAnnounce = useTranslations("loginHistory.announce");
  const { announce } = useAnnounce();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const statusParam = searchParams.get("status");
  const categoryParam = searchParams.get("category");
  const emailParam = searchParams.get("email");
  const ticketNumberParam = searchParams.get("ticketNumber");
  const searchParam = searchParams.get("search");
  const fromDateParam = searchParams.get("fromDate");
  const toDateParam = searchParams.get("toDate");
  const page = Number(searchParams.get("page") ?? 1);
  const params: AdminContactQuery = {
    page,
    limit: 20,
    ...(isContactStatus(statusParam) && { status: statusParam }),
    ...(isContactCategory(categoryParam) && { category: categoryParam }),
    ...(emailParam && { email: emailParam }),
    ...(ticketNumberParam && { ticketNumber: ticketNumberParam }),
    ...(searchParam && { search: searchParam }),
    ...(fromDateParam && { fromDate: fromDateParam }),
    ...(toDateParam && { toDate: toDateParam })
  };
  const { data, isLoading } = useQuery({
    queryKey: ["AdminContact", params],
    queryFn: () => getAdminContact(params)
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
            <TableHead>{tTable("ticketNumber")}</TableHead>
            <TableHead>{tTable("email")}</TableHead>
            <TableHead>{tTable("subject")}</TableHead>
            <TableHead>{tTable("category")}</TableHead>
            <TableHead>{tTable("status")}</TableHead>
            <TableHead>{tTable("attachments")}</TableHead>
            <TableHead>{tTable("createdAt")}</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-muted-foreground py-12 text-center"
              >
                {tTable("empty")}
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-mono text-xs font-medium">
                  {item.ticketNumber}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.email ?? "—"}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {item.subject}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {tCategory(item.category)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={CONTACT_STATUS_VARIANT[item.status]}
                    className="text-xs"
                  >
                    {tStatus(item.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-center">
                  {item.attachmentCount > 0 ? item.attachmentCount : "—"}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {formatDateShort(item.createdAt)}
                </TableCell>
                <TableCell>
                  <CustomButton
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`${ADMIN_CONTACTS}/${item._id}`)}
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
  );
};

export default AdminContactTable;
