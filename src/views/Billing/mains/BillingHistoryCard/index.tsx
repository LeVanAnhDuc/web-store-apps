"use client";

// libs
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";
import InvoiceStatusBadge from "../../components/InvoiceStatusBadge";
// others
import { INVOICES_MOCK } from "@/mocks/Billing";

const BillingHistoryCard = () => {
  const t = useTranslations("billing.history");

  return (
    <Card className="rounded-2xl border p-0" aria-labelledby="history-title">
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h2
          id="history-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{t("title")}</caption>
          <thead>
            <tr className="bg-muted/40 text-muted-foreground border-border border-b text-[10px] font-semibold tracking-[0.08em] uppercase">
              <th scope="col" className="px-6 py-3">
                {t("columns.date")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("columns.description")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("columns.amount")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("columns.status")}
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                <span className="sr-only">{t("columns.action")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {INVOICES_MOCK.map((inv) => (
              <tr
                key={inv.id}
                className="border-border border-b last:border-b-0"
              >
                <td className="text-foreground px-6 py-4">{inv.date}</td>
                <td className="text-foreground px-6 py-4">{inv.description}</td>
                <td className="text-foreground px-6 py-4 font-medium">
                  {inv.amount}
                </td>
                <td className="px-6 py-4">
                  <InvoiceStatusBadge
                    status={inv.status}
                    label={t(`status.${inv.status}`)}
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <CustomButton
                    variant="outline"
                    size="sm"
                    iconLeft={
                      <Download className="size-3.5" aria-hidden="true" />
                    }
                  >
                    {t("buttons.download")}
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default BillingHistoryCard;
