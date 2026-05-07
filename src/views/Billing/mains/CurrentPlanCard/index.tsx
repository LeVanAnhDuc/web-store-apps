// libs
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
// components
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";

const CurrentPlanCard = async () => {
  const t = await getTranslations("billing.currentPlan");
  const features = t.raw("features") as string[];

  return (
    <Card
      className="rounded-2xl border p-0"
      aria-labelledby="current-plan-title"
    >
      <div className="border-border flex flex-wrap items-start justify-between gap-3 border-b px-6 py-5">
        <div className="flex flex-col gap-1">
          <h2
            id="current-plan-title"
            className="text-foreground text-base font-semibold"
          >
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t("renewsOn", { date: "June 1, 2026" })}
          </p>
        </div>
        <Badge className="bg-primary text-primary-foreground rounded-full px-3 py-1">
          {t("badge")}
        </Badge>
      </div>
      <div className="flex flex-col gap-6 px-6 py-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-foreground text-3xl font-bold">
              {t("price")}
            </span>
            <span className="text-muted-foreground text-sm">
              {t("perMonth")}
            </span>
          </div>
          <p className="text-foreground text-sm font-semibold">
            {t("planName")}
          </p>
          <ul className="mt-1 grid gap-2 sm:grid-cols-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="text-muted-foreground flex items-center gap-2 text-sm"
              >
                <Check className="text-success size-4" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-end gap-2">
          <CustomButton size="sm">{t("buttons.upgrade")}</CustomButton>
          <CustomButton variant="outline" size="sm">
            {t("buttons.cancel")}
          </CustomButton>
        </div>
      </div>
    </Card>
  );
};

export default CurrentPlanCard;
