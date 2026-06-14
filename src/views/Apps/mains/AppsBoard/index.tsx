"use client";
// libs
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import SearchInput from "@/components/SearchInput";
import CustomPagination from "@/components/CustomPagination";
import AppCard from "../../components/AppCard";
import AppCardSkeleton from "../../components/AppCardSkeleton";
import CategoryFilter from "../../components/CategoryFilter";
// ghosts
import TableLoadingAnnouncer from "@/ghosts/TableLoadingAnnouncer";
import TableLoadedAnnouncer from "@/ghosts/TableLoadedAnnouncer";
// hooks
import { useAnnounce, useDebouncedValue } from "@/hooks";
// others
import useApps from "../../hooks/useApps";
import useAppCategories from "../../hooks/useAppCategories";
import { cn } from "@/libs/utils";

const PAGE_SIZE = 12;

const AppsBoard = () => {
  const t = useTranslations("apps");
  const { announce } = useAnnounce();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const { data: categories } = useAppCategories();
  const debouncedSearch = useDebouncedValue(search, 300);
  const { data, isLoading, isError } = useApps({
    page,
    limit: PAGE_SIZE,
    ...(debouncedSearch.trim() && { search: debouncedSearch.trim() }),
    ...(activeCategoryId && { categoryId: activeCategoryId })
  });
  const items = data?.items ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const total = meta?.total ?? 0;
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleCategoryChange = (id: string | null) => {
    setActiveCategoryId(id);
    setPage(1);
    const label = id
      ? categories?.find((c) => c._id === id)?.displayName
      : t("categories.all");
    if (label) {
      announce(t("announce.categoryChanged", { category: label }));
    }
  };
  const handleViewChange = (mode: "grid" | "list") => {
    setView(mode);
    announce(t("announce.viewModeChanged", { mode: t(`view.${mode}`) }));
  };
  const handlePageChange = (next: number) => {
    setPage(next);
    announce(t("announce.pageChanged", { page: next }));
  };
  return (
    <div className="flex flex-col gap-6">
      <TableLoadingAnnouncer
        isLoading={isLoading}
        message={t("announce.loading")}
      />
      <TableLoadedAnnouncer
        total={meta?.total}
        message={
          meta?.total !== undefined
            ? t("announce.loaded", { total: meta.total })
            : ""
        }
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder={t("search.placeholder")}
            ariaLabel={t("search.placeholder")}
            className="w-72"
          />
        </div>
        <div
          className="flex items-center gap-1.5"
          role="group"
          aria-label={t("view.grid")}
        >
          <CustomButton
            size="icon"
            aria-label={t("view.grid")}
            aria-pressed={view === "grid"}
            onClick={() => handleViewChange("grid")}
            className={cn(
              "size-10",
              view === "grid"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border bg-background hover:bg-muted text-muted-foreground border"
            )}
          >
            <LayoutGrid className="size-4" aria-hidden="true" />
          </CustomButton>
          <CustomButton
            size="icon"
            aria-label={t("view.list")}
            aria-pressed={view === "list"}
            onClick={() => handleViewChange("list")}
            className={cn(
              "size-10",
              view === "list"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border bg-background hover:bg-muted text-muted-foreground border"
            )}
          >
            <List className="size-4" aria-hidden="true" />
          </CustomButton>
        </div>
      </div>
      <CategoryFilter
        categories={categories ?? []}
        activeId={activeCategoryId}
        allLabel={t("categories.all")}
        groupLabel={t("categories.groupLabel")}
        onSelect={handleCategoryChange}
      />
      <div
        className={cn(
          "grid gap-4",
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_, idx) => (
              <AppCardSkeleton key={`skeleton-${idx}`} />
            ))
          : items.map((app) => (
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
      {isError && (
        <p className="text-destructive text-sm" role="alert">
          {t("error")}
        </p>
      )}
      {!isLoading && !isError && items.length === 0 && (
        <p className="text-muted-foreground py-12 text-center text-sm">
          {t("empty")}
        </p>
      )}
      {meta && total > 0 && (
        <nav
          className="flex flex-wrap items-center justify-between gap-3"
          aria-label={t("pagination.next")}
        >
          <span className="text-muted-foreground text-sm font-medium">
            {t("pagination.summary", { shown: items.length, total })}
          </span>
          {totalPages > 1 && (
            <CustomPagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </nav>
      )}
    </div>
  );
};

export default AppsBoard;
