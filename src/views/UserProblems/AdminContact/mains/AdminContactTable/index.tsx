"use client";

// libs
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
// types
import type { AdminContactQuery } from "@/types/ContactAdmin";
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
import ContactTableSkeleton from "../../components/ContactTableSkeleton";
import AdminContactFilters from "../AdminContactFilters";
// ghosts
import TableLoadingAnnouncer from "@/ghosts/TableLoadingAnnouncer";
import TableLoadedAnnouncer from "@/ghosts/TableLoadedAnnouncer";
// hooks
import { useAnnounce } from "@/hooks";
import useAdminContactList from "../../hooks/useAdminContactList";
// dataSources
import { CONTACT_STATUS_VARIANT } from "@/dataSources/ContactAdmin";
// others
import { useRouter, usePathname } from "@/i18n/navigation";
import CONSTANTS from "@/constants";
import { formatDateShort, isContactStatus, isContactCategory } from "@/utils";

const { ADMIN_CONTACT } = CONSTANTS.ROUTES;
const DEFAULT_PAGE_SIZE = 20;
const TABLE_COLUMN_COUNT = 8;

const AdminContactTable = () => {
  const tTable = useTranslations("contactAdmin.admin.list.table");
  const tStatus = useTranslations("contactAdmin.admin.list.status");
  const tCategory = useTranslations("contactAdmin.form.category");
  const tFilters = useTranslations("contactAdmin.admin.list.filters");
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
    limit: DEFAULT_PAGE_SIZE,
    ...(isContactStatus(statusParam) && { status: statusParam }),
    ...(isContactCategory(categoryParam) && { category: categoryParam }),
    ...(emailParam && { email: emailParam }),
    ...(ticketNumberParam && { ticketNumber: ticketNumberParam }),
    ...(searchParam && { search: searchParam }),
    ...(fromDateParam && { fromDate: fromDateParam }),
    ...(toDateParam && { toDate: toDateParam })
  };

  const { data, isLoading } = useAdminContactList(params);

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

  const items = data?.items ?? [];
  const meta = data?.meta;

  if (isLoading) {
    return (
      <>
        <AdminContactFilters />
        <TableLoadingAnnouncer
          isLoading={isLoading}
          message={tAnnounce("loading")}
        />
        <ContactTableSkeleton />
      </>
    );
  }

  return (
    <>
      <AdminContactFilters />
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
              <TableHead scope="col">{tTable("ticketNumber")}</TableHead>
              <TableHead scope="col">{tTable("email")}</TableHead>
              <TableHead scope="col">{tTable("subject")}</TableHead>
              <TableHead scope="col">{tTable("category")}</TableHead>
              <TableHead scope="col">{tTable("status")}</TableHead>
              <TableHead scope="col">{tTable("attachments")}</TableHead>
              <TableHead scope="col">{tTable("createdAt")}</TableHead>
              <TableHead scope="col">
                <span className="sr-only">{tTable("actions")}</span>
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
                    <CustomBadge
                      variant={CONTACT_STATUS_VARIANT[item.status]}
                      className="text-xs"
                    >
                      {tStatus(item.status)}
                    </CustomBadge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center">
                    {item.attachmentCount > 0 ? item.attachmentCount : "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {formatDateShort(item.createdAt)}
                  </TableCell>
                  <TableCell>
                    <CustomButton
                      variant="ghost"
                      size="sm"
                      iconRight={
                        <ChevronRight className="size-4" aria-hidden="true" />
                      }
                      onClick={() =>
                        router.push(`${ADMIN_CONTACT}/${item._id}`)
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

export default AdminContactTable;
