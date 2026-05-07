"use client";
// libs
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  LayoutGrid,
  List,
  Search
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import AppManagedCard from "../../components/AppManagedCard";
// hooks
import useAnnounce from "@/hooks/useAnnounce";
// others
import { MANAGED_APPS_MOCK } from "@/mocks/Apps";
import { cn } from "@/libs/utils";

const AppsBoard = () => {
  const t = useTranslations("apps");
  const { announce } = useAnnounce();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return MANAGED_APPS_MOCK;
    return MANAGED_APPS_MOCK.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q)
    );
  }, [search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    announce(t("announce.searchChanged", { count: filtered.length }));
  };
  const handleViewChange = (mode: "grid" | "list") => {
    setView(mode);
    announce(t("announce.viewModeChanged", { mode: t(`view.${mode}`) }));
  };
  const handlePageChange = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
    announce(t("announce.pageChanged", { page: next }));
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <label className="border-border bg-background relative flex h-10 w-72 items-center rounded-lg border px-3">
            <span className="sr-only">{t("search.placeholder")}</span>
            <Search
              className="text-muted-foreground size-4"
              aria-hidden="true"
            />
            <CustomInput
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t("search.placeholder")}
              className="h-9 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
            />
          </label>
          <CustomButton
            size="default"
            variant="outline"
            iconLeft={<Filter className="size-4" aria-hidden="true" />}
            className="h-10"
          >
            {t("search.filter")}
          </CustomButton>
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
                ? "bg-slate-900 text-white hover:bg-slate-800"
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
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "border-border bg-background hover:bg-muted text-muted-foreground border"
            )}
          >
            <List className="size-4" aria-hidden="true" />
          </CustomButton>
        </div>
      </div>
      <div
        className={cn(
          "grid gap-4",
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {paged.map((app) => (
          <AppManagedCard
            key={app.id}
            name={app.name}
            category={app.category}
            description={app.description}
            icon={app.icon}
            iconColor={app.iconColor}
            iconBg={app.iconBg}
            status={app.status}
            statusLabel={t(`status.${app.status}`)}
            views={app.views}
            date={app.date}
            openLabel={t("card.open")}
            menuLabel={t("card.menu")}
          />
        ))}
      </div>
      <nav
        className="flex flex-wrap items-center justify-between gap-3"
        aria-label={t("pagination.next")}
      >
        <span className="text-muted-foreground text-sm font-medium">
          {t("pagination.summary", {
            shown: paged.length,
            total: filtered.length
          })}
        </span>
        <div className="flex items-center gap-1.5">
          <CustomButton
            size="icon-sm"
            variant="outline"
            aria-label={t("pagination.previous")}
            onClick={() => handlePageChange(safePage - 1)}
            disabled={safePage <= 1}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </CustomButton>
          {Array.from({ length: totalPages }).map((_, idx) => {
            const num = idx + 1;
            const isActive = num === safePage;
            return (
              <CustomButton
                key={num}
                size="icon-sm"
                onClick={() => handlePageChange(num)}
                aria-label={`Page ${num}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  isActive
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "border-border bg-background hover:bg-muted text-foreground border"
                )}
              >
                {num}
              </CustomButton>
            );
          })}
          <CustomButton
            size="icon-sm"
            variant="outline"
            aria-label={t("pagination.next")}
            onClick={() => handlePageChange(safePage + 1)}
            disabled={safePage >= totalPages}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </CustomButton>
        </div>
      </nav>
    </div>
  );
};

export default AppsBoard;
