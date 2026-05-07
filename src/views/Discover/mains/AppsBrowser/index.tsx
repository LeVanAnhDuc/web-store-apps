"use client";
// libs
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { DiscoverApp, DiscoverCategoryKey } from "@/mocks/Discover";
// components
import CustomButton from "@/components/CustomButton";
import DiscoverAppCard from "../../components/DiscoverAppCard";
// hooks
import useAnnounce from "@/hooks/useAnnounce";
// others
import {
  DISCOVER_CATEGORIES,
  FEATURED_APPS_MOCK,
  MY_APPS_MOCK
} from "@/mocks/Discover";
import { cn } from "@/libs/utils";

const AppsBrowser = () => {
  const t = useTranslations("discover");
  const { announce } = useAnnounce();
  const [active, setActive] = useState<DiscoverCategoryKey>("all");
  const handleSelect = (key: DiscoverCategoryKey) => {
    setActive(key);
    announce(
      t("announce.categoryChanged", { category: t(`categories.${key}`) })
    );
  };
  const filterApps = (apps: DiscoverApp[]) =>
    active === "all" ? apps : apps.filter((app) => app.category === active);
  const featured = filterApps(FEATURED_APPS_MOCK);
  const myApps = filterApps(MY_APPS_MOCK);
  return (
    <div className="flex flex-col gap-8">
      <div
        className="flex flex-wrap gap-2.5"
        role="group"
        aria-label={t("categories.all")}
      >
        {DISCOVER_CATEGORIES.map((key) => {
          const isActive = active === key;
          return (
            <CustomButton
              key={key}
              size="sm"
              onClick={() => handleSelect(key)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-semibold",
                isActive
                  ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-white"
              )}
            >
              {t(`categories.${key}`)}
            </CustomButton>
          );
        })}
      </div>
      <section
        className="flex flex-col gap-4"
        aria-labelledby="discover-featured-title"
      >
        <div className="flex items-center justify-between">
          <h2
            id="discover-featured-title"
            className="text-foreground text-xl font-bold"
          >
            {t("featured.title")}
          </h2>
          <CustomButton
            size="sm"
            variant="ghost"
            iconRight={<ArrowRight className="size-3.5" aria-hidden="true" />}
          >
            {t("featured.seeAll")}
          </CustomButton>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((app) => (
            <DiscoverAppCard
              key={app.id}
              name={app.name}
              category={t(`categories.${app.category}`)}
              description={app.description}
              rating={app.rating}
              icon={app.icon}
              iconColor={app.iconColor}
              iconBg={app.iconBg}
              openLabel={t("card.open")}
            />
          ))}
        </div>
      </section>
      <section
        className="flex flex-col gap-4"
        aria-labelledby="discover-myapps-title"
      >
        <div className="flex items-center justify-between">
          <h2
            id="discover-myapps-title"
            className="text-foreground text-xl font-bold"
          >
            {t("myApps.title")}
          </h2>
          <CustomButton
            size="sm"
            variant="ghost"
            iconRight={<ArrowRight className="size-3.5" aria-hidden="true" />}
          >
            {t("myApps.seeAll")}
          </CustomButton>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {myApps.map((app) => (
            <DiscoverAppCard
              key={app.id}
              name={app.name}
              category={t(`categories.${app.category}`)}
              description={app.description}
              rating={app.rating}
              icon={app.icon}
              iconColor={app.iconColor}
              iconBg={app.iconBg}
              openLabel={t("card.open")}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AppsBrowser;
