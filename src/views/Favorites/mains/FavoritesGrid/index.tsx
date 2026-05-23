"use client";
// libs
import { ArrowUpDown, ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { FavoriteCategoryKey } from "@/mocks/Favorites";
// components
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import FavoriteAppCard from "../../components/FavoriteAppCard";
// hooks
import useAnnounce from "@/hooks/useAnnounce";
// others
import { FAVORITE_APPS_MOCK, FAVORITE_CATEGORIES } from "@/mocks/Favorites";
import { cn } from "@/libs/utils";

const FavoritesGrid = () => {
  const t = useTranslations("favorites");
  const { announce } = useAnnounce();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FavoriteCategoryKey>("all");
  const [sort, setSort] = useState<"recent" | "name" | "rating">("recent");
  const [removed, setRemoved] = useState<string[]>([]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = FAVORITE_APPS_MOCK.filter((app) => !removed.includes(app.id));
    if (category !== "all")
      list = list.filter((app) => app.category === category);
    if (q) {
      list = list.filter(
        (app) =>
          app.name.toLowerCase().includes(q) ||
          app.description.toLowerCase().includes(q)
      );
    }
    if (sort === "name")
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort, removed]);
  const handleCategory = (key: FavoriteCategoryKey) => {
    setCategory(key);
    announce(
      t("announce.categoryChanged", { category: t(`categories.${key}`) })
    );
  };
  const handleSort = (value: "recent" | "name" | "rating") => {
    setSort(value);
    announce(t("announce.sortChanged", { sort: t(`sort.${value}`) }));
  };
  const handleRemove = (id: string, name: string) => {
    setRemoved((prev) => [...prev, id]);
    announce(t("announce.removed", { name }));
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="border-border bg-background flex h-10 w-72 items-center gap-2 rounded-lg border px-3">
          <span className="sr-only">{t("search.placeholder")}</span>
          <Search className="text-muted-foreground size-4" aria-hidden="true" />
          <CustomInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search.placeholder")}
            className="h-9 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
          />
        </label>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={t("categories.all")}
        >
          {FAVORITE_CATEGORIES.map((key) => {
            const isActive = category === key;
            return (
              <CustomButton
                key={key}
                size="sm"
                onClick={() => handleCategory(key)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border bg-muted text-muted-foreground hover:bg-muted/70"
                )}
              >
                {t(`categories.${key}`)}
              </CustomButton>
            );
          })}
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CustomButton
                size="default"
                variant="outline"
                iconLeft={
                  <ArrowUpDown className="size-3.5" aria-hidden="true" />
                }
                iconRight={
                  <ChevronDown className="size-3.5" aria-hidden="true" />
                }
                className="h-10"
              >
                {t("sort.label", { value: t(`sort.${sort}`) })}
              </CustomButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSort("recent")}>
                {t("sort.recent")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("name")}>
                {t("sort.name")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("rating")}>
                {t("sort.rating")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((app) => (
          <FavoriteAppCard
            key={app.id}
            name={app.name}
            category={t(`categories.${app.category}`)}
            description={app.description}
            rating={app.rating}
            icon={app.icon}
            iconBg={app.iconBg}
            openLabel={t("card.open")}
            reviewsLabel={t("card.reviews", { count: app.reviews })}
            removeLabel={t("card.remove")}
            onRemove={() => handleRemove(app.id, app.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesGrid;
