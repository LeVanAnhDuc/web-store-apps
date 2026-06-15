"use client";
// libs
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import ListPageShell from "@/components/list/ListPageShell";
import ListPageHeader from "@/components/list/ListPageHeader";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import FavoriteAppCard from "../../components/FavoriteAppCard";
// hooks
import { useListQuery } from "@/hooks";
// dataSources
import { buildFavoritesFilterDefs } from "@/dataSources/Favorites";
// others
import { FAVORITE_APPS_MOCK, FAVORITE_CATEGORIES } from "@/mocks/Favorites";
import type { FavoriteCategoryKey } from "@/mocks/Favorites";

const FavoritesGrid = () => {
  const t = useTranslations("favorites");

  const [sort, setSort] = useState<"recent" | "name" | "rating">("recent");
  const [removed, setRemoved] = useState<string[]>([]);

  // Category options derived from FAVORITE_CATEGORIES (exclude "all" — that's the filterDef default)
  const categoryOptions = useMemo(
    () =>
      (
        FAVORITE_CATEGORIES.filter((k) => k !== "all") as Exclude<
          FavoriteCategoryKey,
          "all"
        >[]
      ).map((key) => ({
        value: key,
        label: t(`categories.${key}`)
      })),
    [t]
  );

  const filterDefs = useMemo(
    () =>
      buildFavoritesFilterDefs(categoryOptions, {
        category: t("categories.all")
      }),
    [categoryOptions, t]
  );

  const query = useListQuery(filterDefs);

  // Client-side filtering: use query.search (live value) for instant filtering
  const filtered = useMemo(() => {
    const q = query.search.trim().toLowerCase();
    const categoryFilter = query.filters["category"] as
      | Exclude<FavoriteCategoryKey, "all">
      | undefined;

    let list = FAVORITE_APPS_MOCK.filter((app) => !removed.includes(app.id));

    if (categoryFilter) {
      list = list.filter((app) => app.category === categoryFilter);
    }
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
  }, [query.search, query.filters, sort, removed]);

  const hasActiveFilters = query.activeFilterCount > 0 || Boolean(query.search);

  const handleRemove = (id: string) => {
    setRemoved((prev) => [...prev, id]);
  };

  const SortDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CustomButton
          size="default"
          variant="outline"
          iconLeft={<ArrowUpDown className="size-3.5" aria-hidden="true" />}
          iconRight={<ChevronDown className="size-3.5" aria-hidden="true" />}
          className="h-10"
        >
          {t("sort.label", { value: t(`sort.${sort}`) })}
        </CustomButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setSort("recent")}>
          {t("sort.recent")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSort("name")}>
          {t("sort.name")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSort("rating")}>
          {t("sort.rating")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <ListPageShell>
      <ListPageHeader title={t("title")} description={t("description")} />
      <ListToolbar
        query={query}
        filterDefs={filterDefs}
        searchPlaceholder={t("search.placeholder")}
        rightSlot={SortDropdown}
      />
      <ListContent
        isLoading={false}
        isEmpty={filtered.length === 0}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={query.clearFilters}
        skeleton={<></>}
      >
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
              onRemove={() => handleRemove(app.id)}
            />
          ))}
        </div>
      </ListContent>
    </ListPageShell>
  );
};

export default FavoritesGrid;
