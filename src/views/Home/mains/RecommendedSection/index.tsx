// libs
import { ArrowRight, Compass } from "lucide-react";
import { getTranslations } from "next-intl/server";
// components
import CustomButton from "@/components/CustomButton";
import { Card } from "@/components/ui/card";
import RecommendedAppCard from "../../components/RecommendedAppCard";
// others
import { RECOMMENDED_APPS_MOCK } from "@/mocks/Home";

const RecommendedSection = async () => {
  const t = await getTranslations("home.recommended");
  const tCTA = await getTranslations("home.exploreCTA");
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-lg font-bold">{t("title")}</h2>
        <CustomButton
          size="sm"
          variant="ghost"
          iconRight={<ArrowRight className="size-3.5" />}
        >
          {t("seeAll")}
        </CustomButton>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RECOMMENDED_APPS_MOCK.map((app) => {
          const Icon = app.icon;
          return (
            <RecommendedAppCard
              key={app.id}
              name={app.name}
              category={app.category}
              rating={app.rating}
              icon={<Icon className={`size-10 ${app.iconColor}`} />}
              gradient={app.gradient}
              installLabel={t("install")}
              freeLabel={t("free")}
            />
          );
        })}
      </div>
      <Card className="mt-2 flex items-center justify-between gap-4 rounded-2xl border-0 bg-gradient-to-br from-slate-900 to-slate-800 p-7 text-white">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
            <Compass className="size-6 text-white" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold">{tCTA("title")}</p>
            <p className="text-xs text-white/70">{tCTA("subtitle")}</p>
          </div>
        </div>
        <CustomButton
          size="sm"
          className="bg-white text-slate-900 hover:bg-white/90"
          iconRight={<ArrowRight className="size-3.5" />}
        >
          {tCTA("cta")}
        </CustomButton>
      </Card>
    </section>
  );
};

export default RecommendedSection;
