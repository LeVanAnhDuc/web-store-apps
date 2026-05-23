"use client";

// libs
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import CustomButton from "@/components/CustomButton";
import InvoiceStatusBadge from "../../components/InvoiceStatusBadge";
// others
import { INVOICES_MOCK } from "@/mocks/Billing";

const BillingHistoryCard = () => {
  const t = useTranslations("billing.history");
  return (
    <Card className="rounded-2xl border p-0" aria-labelledby="history-title">
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h3
          id="history-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h3>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <Table>
        <TableCaption className="sr-only">{t("title")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t("columns.date")}</TableHead>
            <TableHead>{t("columns.description")}</TableHead>
            <TableHead>{t("columns.amount")}</TableHead>
            <TableHead>{t("columns.status")}</TableHead>
            <TableHead className="text-right">
              <span className="sr-only">{t("columns.action")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES_MOCK.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>{inv.date}</TableCell>
              <TableCell>{inv.description}</TableCell>
              <TableCell className="font-medium">{inv.amount}</TableCell>
              <TableCell>
                <InvoiceStatusBadge
                  status={inv.status}
                  label={t(`status.${inv.status}`)}
                />
              </TableCell>
              <TableCell className="text-right">
                <CustomButton
                  variant="outline"
                  size="sm"
                  iconLeft={
                    <Download className="size-3.5" aria-hidden="true" />
                  }
                >
                  {t("buttons.download")}
                </CustomButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default BillingHistoryCard;
