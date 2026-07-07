"use client";

// libs
import type { ReactNode } from "react";
// types
import type { ListColumn } from "@/types/List";
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
// others
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { alignClass } from "@/utils";

const ListTable = <T,>({
  columns,
  rows,
  getRowKey,
  getRowHref,
  rowLabel,
  rowActions,
  actionsLabel,
  caption
}: {
  columns: ListColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  getRowHref?: (row: T) => string;
  rowLabel?: (row: T) => string;
  rowActions?: (row: T) => ReactNode;
  actionsLabel?: string;
  caption?: string;
}) => (
  <ListTableCard>
    <Table containerClassName="md:h-full">
      {caption && <TableCaption className="sr-only">{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.id}
              scope="col"
              className={cn(alignClass(col.align), col.headerClassName)}
            >
              {col.srOnlyHeader ? (
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
                className={cn(alignClass(col.align), col.cellClassName)}
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

export default ListTable;
