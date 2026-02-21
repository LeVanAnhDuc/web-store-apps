// libs
import { Clock, ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
// components
import CustomButton from "@/components/CustomButton";
import AppCardCompact from "../../components/AppCardCompact";
// mocks
import { APPS_DATA } from "@/mocks/Dashboard";

const RecentlyUsedSection = async () => {
  const t = await getTranslations("dashboard.recentlyUsed");

  const recentlyUsedApps = APPS_DATA.filter((app) => app.lastUsed)
    .sort((a, b) => {
      if (!a.lastUsed || !b.lastUsed) return 0;
      return b.lastUsed.getTime() - a.lastUsed.getTime();
    })
    .slice(0, 5);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="text-muted-foreground size-5" />
          <h2 className="text-foreground text-lg font-semibold">
            {t("title")}
          </h2>
        </div>
        <CustomButton
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          iconRight={<ChevronRight className="size-4" />}
        >
          {t("viewAll")}
        </CustomButton>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
        {recentlyUsedApps.map((app) => (
          <div key={app.id} className="min-w-[200px] lg:min-w-0">
            <AppCardCompact app={app} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyUsedSection;
