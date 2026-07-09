"use client";

// libs
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
// types
import type { ListColumn, SortOrder } from "@/types/List";
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
import ListTableCard from "../ListTableCard";
import ListSortHeader from "../ListSortHeader";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { alignClass, hideBelowClass } from "@/utils";
import { SORT_ORDER } from "@/constants/list";

const ListTable = <T,>({
  columns,
  rows,
  getRowKey,
  getRowHref,
  rowLabel,
  rowActions,
  actionsLabel,
  caption,
  sortBy,
  sortOrder,
  onSort
}: {
  columns: ListColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  getRowHref?: (row: T) => string;
  rowLabel?: (row: T) => string;
  rowActions?: (row: T) => ReactNode;
  actionsLabel?: string;
  caption?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  onSort?: (id: string, order: SortOrder) => void;
}) => {
  const tList = useTranslations("list");
  const tAnnounce = useTranslations("list.announce");
  const { announce } = useAnnounce();

  const handleSort = (id: string) => {
    const isActive = sortBy === id;
    const nextOrder =
      isActive && sortOrder === SORT_ORDER.ASC
        ? SORT_ORDER.DESC
        : SORT_ORDER.ASC;
    onSort?.(id, nextOrder);
    announce(
      nextOrder === SORT_ORDER.ASC
        ? tAnnounce("sortedAsc")
        : tAnnounce("sortedDesc")
    );
  };

  const isSortActive = (id: string) => sortBy === id && Boolean(sortOrder);

  const ariaSortFor = (col: ListColumn<T>) => {
    if (!col.sortable) return undefined;
    if (!isSortActive(col.id)) return "none" as const;
    return sortOrder === SORT_ORDER.ASC
      ? ("ascending" as const)
      : ("descending" as const);
  };

  return (
    <ListTableCard>
      <Table containerClassName="md:h-full">
        {caption && <TableCaption className="sr-only">{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.id}
                scope="col"
                aria-sort={ariaSortFor(col)}
                style={col.width ? { width: col.width } : undefined}
                className={cn(
                  alignClass(col.align),
                  hideBelowClass(col.hideBelow),
                  col.headerClassName
                )}
              >
                {col.sortable && onSort ? (
                  <ListSortHeader
                    label={
                      col.srOnlyHeader ? (
                        <span className="sr-only">{col.header}</span>
                      ) : (
                        col.header
                      )
                    }
                    active={isSortActive(col.id)}
                    order={isSortActive(col.id) ? sortOrder : undefined}
                    ariaLabel={tList("sortBy", {
                      column:
                        typeof col.header === "string" ? col.header : col.id
                    })}
                    onToggle={() => handleSort(col.id)}
                  />
                ) : col.srOnlyHeader ? (
                  <span className="sr-only">{col.header}</span>
                ) : (
                  col.header
                )}
              </TableHead>
            ))}
            {rowActions && (
              <TableHead scope="col" className="w-12 text-right">
                <span className="sr-only">{actionsLabel}</span>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={getRowKey(row)}
              className={cn("relative", getRowHref && "cursor-pointer")}
            >
              {columns.map((col, colIdx) => (
                <TableCell
                  key={col.id}
                  style={col.width ? { width: col.width } : undefined}
                  className={cn(
                    alignClass(col.align),
                    hideBelowClass(col.hideBelow),
                    col.cellClassName
                  )}
                >
                  {colIdx === 0 && getRowHref && (
                    <Link
                      href={getRowHref(row)}
                      aria-label={rowLabel?.(row)}
                      className="absolute inset-0 z-[1]"
                    />
                  )}
                  {col.cell(row)}
                </TableCell>
              ))}
              {rowActions && (
                <TableCell className="relative z-10 text-right">
                  {rowActions(row)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ListTableCard>
  );
};

export default ListTable;
