"use client";

// libs
import { LayoutGrid, List } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import ListPageShell from "@/components/list/ListPageShell";
import ListPageHeader from "@/components/list/ListPageHeader";
import ListToolbar from "@/components/list/ListToolbar";
import ListContent from "@/components/list/ListContent";
import ListPagination from "@/components/list/ListPagination";
import AppCard from "../../components/AppCard";
import AppCardSkeleton from "../../components/AppCardSkeleton";
// hooks
import { useListQuery } from "@/hooks";
import useApps from "../../hooks/useApps";
import useAppCategories from "../../hooks/useAppCategories";
// dataSources
import { buildAppsFilterDefs } from "@/dataSources/Apps";
// others
import { cn } from "@/libs/utils";

const PAGE_SIZE = 12;

const AppsBoardSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
      <AppCardSkeleton key={`skeleton-${idx}`} />
    ))}
  </div>
);

const ViewToggle = ({
  view,
  onViewChange
}: {
  view: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
}) => {
  const t = useTranslations("list");
  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label={t("viewGrid")}
    >
      <CustomButton
        size="icon"
        aria-label={t("viewGrid")}
        aria-pressed={view === "grid"}
        onClick={() => onViewChange("grid")}
        className={cn(
          "size-10",
          view === "grid"
            ? "bg-secondary text-secondary-foreground"
            : "border-border bg-background hover:bg-muted text-muted-foreground border"
        )}
      >
        <LayoutGrid className="size-4" aria-hidden="true" />
      </CustomButton>
      <CustomButton
        size="icon"
        aria-label={t("viewList")}
        aria-pressed={view === "list"}
        onClick={() => onViewChange("list")}
        className={cn(
          "size-10",
          view === "list"
            ? "bg-secondary text-secondary-foreground"
            : "border-border bg-background hover:bg-muted text-muted-foreground border"
        )}
      >
        <List className="size-4" aria-hidden="true" />
      </CustomButton>
    </div>
  );
};

const AppsBoard = () => {
  const t = useTranslations("apps");
  const tToolbar = useTranslations("apps.categories");

  // view is a display preference — kept in local state, not URL
  const [view, setView] = useState<"grid" | "list">("grid");

  const { data: categories = [] } = useAppCategories();

  const categoryOptions = useMemo(
    () => categories.map((cat) => ({ value: cat._id, label: cat.displayName })),
    [categories]
  );

  const filterDefs = useMemo(
    () =>
      buildAppsFilterDefs(categoryOptions, {
        category: tToolbar("groupLabel")
      }),
    [categoryOptions, tToolbar]
  );

  const query = useListQuery(filterDefs);

  const params = {
    page: query.page,
    limit: PAGE_SIZE,
    ...(query.appliedSearch && { search: query.appliedSearch }),
    ...(query.filters.categoryId && { categoryId: query.filters.categoryId })
  };

  const { data, isLoading, isError } = useApps(params);
  const items = data?.items ?? [];
  const meta = data?.meta;

  const hasActiveFilters =
    query.activeFilterCount > 0 || Boolean(query.appliedSearch);

  return (
    <ListPageShell>
      <ListPageHeader title={t("title")} description={t("description")} />
      <ListToolbar
        query={query}
        filterDefs={filterDefs}
        searchPlaceholder={t("search.placeholder")}
        rightSlot={<ViewToggle view={view} onViewChange={setView} />}
      />
      <ListContent
        isLoading={isLoading}
        isEmpty={items.length === 0}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={query.clearFilters}
        skeleton={<AppsBoardSkeleton />}
        emptyTitle={t("empty")}
      >
        <div
          className={cn(
            "grid gap-4",
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          )}
        >
          {isError && (
            <p className="text-destructive col-span-full text-sm" role="alert">
              {t("error")}
            </p>
          )}
          {items.map((app) => (
            <AppCard
              key={app._id}
              id={app._id}
              displayName={app.displayName}
              category={app.category}
              description={app.description}
              iconUrl={app.iconUrl}
              homeUrl={app.homeUrl}
              openLabel={t("card.open")}
            />
          ))}
        </div>
      </ListContent>
      <ListPagination
        page={meta?.page ?? query.page}
        totalPages={meta?.totalPages ?? 1}
        total={meta?.total ?? 0}
        onPageChange={query.setPage}
        loading={isLoading}
      />
    </ListPageShell>
  );
};

export default AppsBoard;
