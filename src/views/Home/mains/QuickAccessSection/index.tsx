// libs
import { getTranslations } from "next-intl/server";
// components
import QuickAccessCard from "../../components/QuickAccessCard";
// others
import { QUICK_ACCESS_MOCK } from "@/mocks/Home";

const QuickAccessSection = async () => {
  const t = await getTranslations("home.quickAccess");
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-lg font-bold">{t("title")}</h2>
          <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {QUICK_ACCESS_MOCK.map((item) => {
          const Icon = item.icon;
          return (
            <QuickAccessCard
              key={item.id}
              name={item.name}
              lastOpened={item.lastOpened}
              icon={<Icon className="size-5 text-white" />}
              gradient={item.gradient}
              lastOpenedLabel={t("lastOpened")}
            />
          );
        })}
      </div>
    </section>
  );
};

export default QuickAccessSection;
