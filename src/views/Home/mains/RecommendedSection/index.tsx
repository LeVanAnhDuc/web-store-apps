"use client";
// libs
import { ArrowRight, Compass } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import RecommendedAppCard from "../../components/RecommendedAppCard";
// others
import useHomeApps from "../../hooks/useHomeApps";
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { ROUTES } = CONSTANTS;

const GRADIENTS = [
  "bg-gradient-to-br from-cream to-cream/60",
  "bg-gradient-to-br from-success/20 to-success/5",
  "bg-gradient-to-br from-destructive/20 to-warning/10",
  "bg-gradient-to-br from-info/20 to-info/5"
];

const RecommendedSection = () => {
  const t = useTranslations("home.recommended");
  const tCTA = useTranslations("home.exploreCTA");
  const tCard = useTranslations("apps.card");
  const router = useRouter();
  const { data, isLoading, isError } = useHomeApps();
  const items = (data?.items ?? []).slice(4, 8);
  return (
    <section
      className="flex flex-col gap-4"
      aria-labelledby="recommended-title"
    >
      <div className="flex items-center justify-between">
        <h2
          id="recommended-title"
          className="text-foreground text-xl font-bold"
        >
          {t("title")}
        </h2>
        <CustomButton
          size="sm"
          variant="ghost"
          onClick={() => router.push(ROUTES.APPS)}
          iconRight={<ArrowRight className="size-3.5" aria-hidden="true" />}
        >
          {t("seeAll")}
        </CustomButton>
      </div>
      {isError ? (
        <p className="text-destructive text-sm" role="alert">
          {t("error")}
        </p>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={`rec-skeleton-${idx}`} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          {t("empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((app, idx) => (
            <RecommendedAppCard
              key={app._id}
              name={app.displayName}
              category={app.category}
              iconUrl={app.iconUrl}
              homeUrl={app.homeUrl}
              gradient={GRADIENTS[idx % GRADIENTS.length]}
              openLabel={tCard("open")}
            />
          ))}
        </div>
      )}
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
