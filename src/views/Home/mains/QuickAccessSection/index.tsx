"use client";
// libs
import { useTranslations } from "next-intl";
// components
import QuickAccessCard from "../../components/QuickAccessCard";
import { Skeleton } from "@/components/ui/skeleton";
// others
import useHomeApps from "../../hooks/useHomeApps";

const GRADIENTS = [
  "bg-gradient-to-br from-primary to-primary/60",
  "bg-gradient-to-br from-info to-info/60",
  "bg-gradient-to-br from-warning to-warning/60",
  "bg-gradient-to-br from-success to-success/60"
];

const QuickAccessSection = () => {
  const t = useTranslations("home.quickAccess");
  const { data, isLoading, isError } = useHomeApps();
  const items = (data?.items ?? []).slice(0, 4);
  return (
    <section
      className="flex flex-col gap-4"
      aria-labelledby="quick-access-title"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="quick-access-title"
            className="text-foreground text-xl font-bold"
          >
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
        </div>
      </div>
      {isError ? (
        <p className="text-destructive text-sm" role="alert">
          {t("error")}
        </p>
      ) : isLoading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton
              key={`qa-skeleton-${idx}`}
              className="h-[140px] rounded-xl"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          {t("empty")}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((app, idx) => (
            <QuickAccessCard
              key={app._id}
              name={app.displayName}
              category={app.category}
              iconUrl={app.iconUrl}
              homeUrl={app.homeUrl}
              gradient={GRADIENTS[idx % GRADIENTS.length]}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default QuickAccessSection;
