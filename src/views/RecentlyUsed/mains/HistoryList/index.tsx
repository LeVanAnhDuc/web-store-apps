"use client";
// libs
import { Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { RecentApp, RecentGroupKey } from "@/mocks/RecentlyUsed";
// components
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Badge } from "@/components/ui/badge";
import RecentAppRow from "../../components/RecentAppRow";
// hooks
import useAnnounce from "@/hooks/useAnnounce";
// others
import { RECENT_APPS_MOCK, RECENT_GROUP_DOTS } from "@/mocks/RecentlyUsed";
import { cn } from "@/libs/utils";

const HistoryList = () => {
  const t = useTranslations("recentlyUsed");
  const { announce } = useAnnounce();
  const [search, setSearch] = useState("");
  const [cleared, setCleared] = useState(false);
  const grouped = useMemo(() => {
    if (cleared) return [] as { key: RecentGroupKey; apps: RecentApp[] }[];
    const q = search.trim().toLowerCase();
    const list = q
      ? RECENT_APPS_MOCK.filter(
          (app) =>
            app.name.toLowerCase().includes(q) ||
            app.category.toLowerCase().includes(q)
        )
      : RECENT_APPS_MOCK;
    const order: RecentGroupKey[] = [
      "today",
      "yesterday",
      "thisWeek",
      "earlier"
    ];
    return order
      .map((key) => ({ key, apps: list.filter((app) => app.group === key) }))
      .filter((group) => group.apps.length > 0);
  }, [search, cleared]);
  const handleSearch = (value: string) => {
    setSearch(value);
    const matched = value
      ? RECENT_APPS_MOCK.filter(
          (app) =>
            app.name.toLowerCase().includes(value.toLowerCase()) ||
            app.category.toLowerCase().includes(value.toLowerCase())
        ).length
      : RECENT_APPS_MOCK.length;
    announce(t("announce.searchChanged", { count: matched }));
  };
  const handleClear = () => {
    setCleared(true);
    announce(t("announce.cleared"));
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-sm">{t("description")}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <label className="border-border bg-background flex h-10 w-64 items-center gap-2 rounded-lg border px-3">
            <span className="sr-only">{t("search.placeholder")}</span>
            <Search
              className="text-muted-foreground size-4"
              aria-hidden="true"
            />
            <CustomInput
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t("search.placeholder")}
              className="h-9 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
            />
          </label>
          <CustomButton
            size="default"
            variant="outline"
            iconLeft={<Trash2 className="size-3.5" aria-hidden="true" />}
            onClick={handleClear}
            className="border-border text-destructive hover:text-destructive h-10"
          >
            {t("clear")}
          </CustomButton>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        {grouped.map((group) => (
          <section
            key={group.key}
            className="flex flex-col gap-3"
            aria-labelledby={`recent-group-${group.key}`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "size-2 rounded-full",
                  RECENT_GROUP_DOTS[group.key]
                )}
                aria-hidden="true"
              />
              <h2
                id={`recent-group-${group.key}`}
                className="text-foreground text-base font-bold"
              >
                {t(`groups.${group.key}`)}
              </h2>
              <Badge
                variant="secondary"
                className="bg-muted text-muted-foreground rounded-full border-0 px-2.5 py-0.5 text-[11px] font-semibold"
              >
                {t("groupCount", { count: group.apps.length })}
              </Badge>
            </div>
            <ul className="flex flex-col gap-3">
              {group.apps.map((app) => (
                <li key={app.id}>
                  <RecentAppRow
                    name={app.name}
                    category={app.category}
                    time={app.time}
                    icon={app.icon}
                    iconColor={app.iconColor}
                    iconBg={app.iconBg}
                    openLabel={t("card.open")}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
