// libs
import { getTranslations } from "next-intl/server";
// components
import { Card } from "@/components/ui/card";
import UsageStat from "../../components/UsageStat";
// others
import { USAGE_STATS_MOCK } from "@/mocks/Billing";

const UsageCard = async () => {
  const t = await getTranslations("billing.usage");
  return (
    <Card className="rounded-2xl border p-0" aria-labelledby="usage-title">
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h3
          id="usage-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h3>
        <p className="text-muted-foreground text-sm">
          {t("subtitle", { period: "May 2026", resetDate: "June 1" })}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 px-6 py-5 md:grid-cols-3">
        {USAGE_STATS_MOCK.map((stat) => (
          <UsageStat
            key={stat.key}
            label={t(`stats.${stat.key}`)}
            value={stat.value}
            ratio={stat.ratio}
          />
        ))}
      </div>
    </Card>
  );
};

export default UsageCard;
