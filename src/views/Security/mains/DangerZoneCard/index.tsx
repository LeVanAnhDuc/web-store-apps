"use client";

// libs
import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";

const DangerZoneCard = () => {
  const t = useTranslations("security.dangerZone");
  return (
    <Card
      className="border-destructive/40 rounded-2xl border p-0"
      aria-labelledby="security-danger-zone-title"
    >
      <div className="border-destructive/30 flex flex-col gap-1 border-b px-6 py-5">
        <div className="flex items-center gap-2">
          <TriangleAlert
            className="text-destructive size-4"
            aria-hidden="true"
          />
          <h2
            id="security-danger-zone-title"
            className="text-destructive text-base font-semibold"
          >
            {t("title")}
          </h2>
        </div>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="px-6 py-5">
        <div className="bg-destructive/5 border-destructive/30 flex flex-wrap items-center justify-between gap-4 rounded-xl border px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-foreground text-sm font-semibold">
              {t("delete.title")}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {t("delete.description")}
            </p>
          </div>
          <CustomButton variant="destructive" size="sm">
            {t("delete.button")}
          </CustomButton>
        </div>
      </div>
    </Card>
  );
};

export default DangerZoneCard;
