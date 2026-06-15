"use client";
// libs
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { FavoritesSortKey } from "@/types/Apps";
// components
import AppCard from "@/components/AppCard";
import CustomButton from "@/components/CustomButton";
import SearchInput from "@/components/SearchInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
// hooks
import { useAnnounce, useDebouncedValue, useToggleFavorite } from "@/hooks";
// others
import useFavorites from "../../hooks/useFavorites";
import useAppCategories from "@/views/Apps/hooks/useAppCategories";
import { cn } from "@/libs/utils";

const FavoritesGrid = () => {
  const t = useTranslations("favorites");
  const { announce } = useAnnounce();
  const [search, setSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [sort, setSort] = useState<FavoritesSortKey>("recent");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { data: categories } = useAppCategories();
  const { data, isLoading, isError } = useFavorites({
    sort,
    ...(debouncedSearch.trim() && { search: debouncedSearch.trim() }),
    ...(activeCategoryId && { categoryId: activeCategoryId })
  });
  const toggleFavorite = useToggleFavorite();
  const items = data?.items ?? [];
  const categoryOptions = useMemo(
    () => [
      { _id: null as string | null, displayName: t("categories.all") },
      ...(categories ?? [])
    ],
    [categories, t]
  );
  const handleCategory = (id: string | null, label: string) => {
    setActiveCategoryId(id);
    announce(t("announce.categoryChanged", { category: label }));
  };
  const handleSort = (value: FavoritesSortKey) => {
    setSort(value);
    announce(t("announce.sortChanged", { sort: t(`sort.${value}`) }));
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("search.placeholder")}
          ariaLabel={t("search.placeholder")}
          className="w-72"
        />
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={t("categories.groupLabel")}
        >
          {categoryOptions.map((c) => {
            const isActive = activeCategoryId === c._id;
            return (
              <CustomButton
                key={c._id ?? "all"}
                size="sm"
                onClick={() => handleCategory(c._id, c.displayName)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border bg-muted text-muted-foreground hover:bg-muted/70"
                )}
              >
                {c.displayName}
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isError ? (
        <p className="text-destructive text-sm" role="alert">
          {t("error")}
        </p>
      ) : !isLoading && items.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center text-sm">
          {t("empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((app) => (
            <AppCard
              key={app._id}
              id={app._id}
              displayName={app.displayName}
              category={app.category}
              description={app.description}
              iconUrl={app.iconUrl}
              homeUrl={app.homeUrl}
              isFavorite={app.isFavorite}
              openLabel={t("card.open")}
              addFavoriteLabel={t("card.add")}
              removeFavoriteLabel={t("card.remove")}
              togglePending={toggleFavorite.isPending}
              onToggleFavorite={() =>
                toggleFavorite.mutate({
                  appId: app._id,
                  isFavorite: app.isFavorite
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesGrid;
