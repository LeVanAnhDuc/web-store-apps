"use client";

// libs
import { useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
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
import ListPageShell from "@/components/list/ListPageShell";
import ListPageHeader from "@/components/list/ListPageHeader";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import ListPagination from "@/components/list/ListPagination";
import ContactTableSkeleton from "../../components/ContactTableSkeleton";
// hooks
import { useListQuery } from "@/hooks";
import useAdminContactList from "../../hooks/useAdminContactList";
// dataSources
import {
  CONTACT_STATUS_VARIANT,
  buildAdminContactFilterDefs
} from "@/dataSources/ContactAdmin";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";
import { formatDateShort, isContactStatus, isContactCategory } from "@/utils";

const { ADMIN_CONTACT } = CONSTANTS.ROUTES;
const DEFAULT_PAGE_SIZE = 20;

const AdminContactTable = () => {
  const tPage = useTranslations("contactAdmin.admin.list");
  const tTable = useTranslations("contactAdmin.admin.list.table");
  const tStatus = useTranslations("contactAdmin.admin.list.status");
  const tCategory = useTranslations("contactAdmin.form.category");
  const tFilters = useTranslations("contactAdmin.admin.list.filters");
  const tList = useTranslations("list");

  const filterDefs = useMemo(
    () =>
      buildAdminContactFilterDefs(
        (k) => tStatus(k as Parameters<typeof tStatus>[0]),
        (k) => tCategory(k as Parameters<typeof tCategory>[0]),
        {
          status: tFilters("status"),
          category: tFilters("category"),
          email: tFilters("email"),
          ticketNumber: tFilters("ticketNumber"),
          dateRange: tList("dateRange.label"),
          emailPh: tFilters("email"),
          ticketPh: tFilters("ticketNumber")
        }
      ),
    [tStatus, tCategory, tFilters, tList]
  );

  const query = useListQuery(filterDefs);

  const params: AdminContactQuery = {
    page: query.page,
    limit: DEFAULT_PAGE_SIZE,
    ...(query.appliedSearch && { search: query.appliedSearch }),
    ...(isContactStatus(query.filters.status) && {
      status: query.filters.status
    }),
    ...(isContactCategory(query.filters.category) && {
      category: query.filters.category
    }),
    ...(query.filters.email && { email: query.filters.email }),
    ...(query.filters.ticketNumber && {
      ticketNumber: query.filters.ticketNumber
    }),
    ...(query.filters.fromDate && { fromDate: query.filters.fromDate }),
    ...(query.filters.toDate && { toDate: query.filters.toDate })
  };

  const { data, isLoading } = useAdminContactList(params);
  const items = data?.items ?? [];
  const meta = data?.meta;

  const hasActiveFilters =
    query.activeFilterCount > 0 || Boolean(query.appliedSearch);

  const router = useRouter();

  return (
    <ListPageShell>
      <ListPageHeader
        title={tPage("title")}
        description={tPage("description")}
      />
      <ListToolbar
        query={query}
        filterDefs={filterDefs}
        searchPlaceholder={tFilters("searchPlaceholder")}
      />
      <ListContent
        isLoading={isLoading}
        isEmpty={items.length === 0}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={query.clearFilters}
        skeleton={<ContactTableSkeleton />}
        emptyTitle={tTable("empty")}
      >
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
              {items.map((item) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </ListContent>
      <ListPagination
        page={meta?.page ?? query.page}
        totalPages={meta?.totalPages ?? 1}
        total={meta?.total ?? 0}
        onPageChange={query.setPage}
        loading={isLoading}
      />
    </ListPageShell>
  );
};

export default AdminContactTable;
