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
    <section
      className="flex flex-col gap-4"
      aria-labelledby="recommended-title"
    >
      <div className="flex items-center justify-between">
        <h2
          id="recommended-title"
          className="text-foreground text-lg font-bold"
        >
          {t("title")}
        </h2>
        <CustomButton
          size="sm"
          variant="ghost"
          iconRight={<ArrowRight className="size-3.5" aria-hidden="true" />}
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
              icon={
                <Icon
                  className={`size-10 ${app.iconColor}`}
                  aria-hidden="true"
                />
              }
              gradient={app.gradient}
              installLabel={t("install")}
              freeLabel={t("free")}
            />
          );
        })}
      </div>
      <Card className="from-primary to-primary/90 text-primary-foreground mt-2 flex items-center justify-between gap-4 rounded-2xl border-0 bg-gradient-to-br p-7">
        <div className="flex items-center gap-4">
          <div
            className="bg-primary-foreground/10 flex size-12 items-center justify-center rounded-xl"
            aria-hidden="true"
          >
            <Compass className="text-primary-foreground size-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold">{tCTA("title")}</p>
            <p className="text-primary-foreground/70 text-xs">
              {tCTA("subtitle")}
            </p>
          </div>
        </div>
        <CustomButton
          size="sm"
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          iconRight={<ArrowRight className="size-3.5" aria-hidden="true" />}
        >
          {tCTA("cta")}
        </CustomButton>
      </Card>
    </section>
  );
};

export default RecommendedSection;
